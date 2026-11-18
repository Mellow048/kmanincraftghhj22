#!/usr/bin/env python3
"""Check the rendered MP4 against the picture/voice clock. Requires FFmpeg/ffprobe and numpy.

Optionally produce still sheets (Pillow) in a scratch folder for a separate visual review.
"""
from __future__ import annotations

import argparse
import hashlib
import itertools
import json
import re
import shutil
import subprocess as sp
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
EDIT = json.loads((HERE / "edit.json").read_text())
CUT = EDIT["cuts"]
FPS, FRAMES = EDIT["fps"], EDIT["frames"]
MIX = ROOT / "public/audio/dishwasher-training-arc/mix.mp3"


def clock_checks():
    marks = list(itertools.chain.from_iterable(EDIT["reps"].values()))
    assert CUT["sink"] == 2 * FPS and EDIT["music"]["openDb"] - EDIT["music"]["referenceDb"] == 7
    assert len(marks) == 33 and marks == sorted(set(marks)) and marks[0] == CUT["sink"]
    assert marks[-1] < FRAMES <= marks[-1] + 10
    captions = json.loads((HERE / "captions.json").read_text())
    breath = [w for w in captions if w["w"] == "HUS"]
    assert [round(w["s"] * FPS) for w in breath] == marks
    assert all(.17 < w["e"] - w["s"] < .21 for w in breath)
    assert captions[-3:] == breath[-3:] and captions[-1]["e"] <= FRAMES / FPS
    voice = {v["id"]: v for v in EDIT["voice"]}
    def end_frames(line):
        return line["at"] + FPS * (sum(b-a for a,b in line["regions"]) / line["tempo"] + line["gap"] * (len(line["regions"]) - 1))
    assert end_frames(voice["boast"]) < EDIT["marks"]["bell"] < voice["hey"]["at"]
    assert voice["almost"]["tempo"] >= 1.5 and end_frames(voice["almost"]) < CUT["mopKitchen"]
    assert end_frames(voice["how"]) < marks[-3], "The question must finish before the counter scrub"
    print(f"Clock: 2.00 s cut, {len(marks)} synchronized HUS marks, deferred bell and chant-only end.")


def main(args):
    clock_checks()
    def ff(*cmd):
        p = sp.run([args.ffmpeg, "-nostdin", "-hide_banner", *cmd], capture_output=True, check=True)
        return p.stdout, p.stderr.decode(errors="replace")

    path = args.video
    metadata = json.loads(sp.check_output([args.ffprobe,"-v","error","-show_streams","-of","json",str(path)]))
    v,a = metadata["streams"]
    assert (v["codec_name"],v["width"],v["height"],v["avg_frame_rate"],v["nb_frames"]) == ("h264",1080,1920,f"{FPS}/1",str(FRAMES)), v
    # CI's Remotion JPEG renderer writes full-range 4:2:0. A local web encode
    # may instead normalize it to limited-range BT.709. Accept tagged, valid 4:2:0.
    colors = (v.get("pix_fmt"),v.get("color_range"),v.get("color_space"))
    assert colors in {("yuvj420p","pc","bt470bg"),("yuv420p","tv","bt709"),("yuv420p","pc","bt470bg")}, v
    print(f"H.264 {v['width']}×{v['height']} / {v['nb_frames']} frames; {colors}.")
    assert (a["codec_name"],a["sample_rate"],a["channels"]) == ("aac","48000",2), a
    assert v["start_pts"] == a["start_pts"] == 0
    assert abs(float(v["duration"]) - FRAMES/FPS) < .001 and abs(float(a["duration"]) - FRAMES/FPS) < .04, a
    raw = ff("-v","error","-xerror","-threads","2","-i",str(path),"-an","-vf","scale=108:192:flags=area","-threads","1","-f","rawvideo","-pix_fmt","gray","-")[0]
    y = np.frombuffer(raw,np.uint8).reshape(-1,192,108)
    assert len(y) == FRAMES and y.mean(axis=(1,2)).min() > 35
    adjacent = np.abs(np.diff(y.astype(np.int16),axis=0)).mean(axis=(1,2))
    assert np.all(adjacent > 0), "Duplicated adjacent frames"
    cut = CUT["sink"]
    assert adjacent[cut-1] > np.max(adjacent[cut-7:cut-1]) * 2 and adjacent[cut-1] > np.max(adjacent[cut:cut+6]) * 2
    print(f"Decoded {FRAMES} unique adjacent frames. First party→sink boundary f{cut}: luma Δ{adjacent[cut-1]:.1f}.")

    def pcm(file):
        return np.frombuffer(ff("-v","error","-i",str(file),"-vn","-ac","1","-ar","8000","-f","f32le","-")[0],"<f4").astype(np.float64)
    encoded, source = map(pcm, (path,MIX))
    windows = [(.5,2.18),(2.20,3.60),(10.38,12.53),(16.72,18.5),(23.4,27.61),(27.73,30.41),
               (32.0,33.5),(36.65,38.54),(39.52,41.391)]
    for start,end in windows:
        x,z = np.round(np.array([start,end])*8000).astype(int)
        offset = min(480,x,len(encoded)-z)
        assert offset >= 0
        w = source[x:z]-source[x:z].mean()
        bank = encoded[x-offset:z+offset]
        n = len(w)
        cumul = np.r_[0.,np.cumsum(bank)]; square = np.r_[0.,np.cumsum(bank*bank)]
        sums = cumul[n:]-cumul[:-n]; scaled = np.sqrt(np.maximum(1e-10,square[n:]-square[:-n]-sums*sums/n))
        r = np.correlate(bank,w,mode="valid") / (np.linalg.norm(w)*scaled+1e-9)
        ms=(int(r.argmax())-offset)/8
        assert abs(ms)<=10 and r.max()>.95,(start,end,ms,r.max())
        print(f"{start:5.2f}–{end:5.2f} s audio: lag {ms:+.3f} ms, correlation {r.max():.5f}")
    _, report = ff("-nostats","-i",str(path),"-vn","-af","ebur128=peak=true","-f","null","-")
    last=report.split("Summary:")[-1]
    lufs=float(re.search(r"\bI:\s*([-\d.]+) LUFS",last)[1])
    peak=float(re.search(r"\bPeak:\s*([-\d.]+) dBFS",last)[1])
    assert -20<lufs<-14 and peak<-.8
    print(f"Mix: {lufs:.1f} LUFS, {peak:.1f} dBTP.")
    print(f"Bytes: {path.stat().st_size}; SHA-256: {hashlib.file_digest(path.open('rb'),'sha256').hexdigest()}")

    if args.sheets:
        from PIL import Image, ImageDraw
        args.sheets.mkdir(parents=True,exist_ok=True)
        groups = {
            "opening":[0,28,59,60,70,101,150,310,364,457],
            "stack-and-job":[504,512,530,546,559,572,622,772,802,826],
            "mop-and-hire":[833,861,875,898,917,946,962,994,1016,1049],
            "ending":[1078,1098,1117,1145,1166,1187,1208,1224,1232,1241],
        }
        # Decode once in presentation order; all sheet samples come from the final upload.
        fs=list(itertools.chain.from_iterable(groups.values()))
        w,h=198,352
        filt="select="+"+".join(f"eq(n\\,{f})" for f in fs)+f",scale={w}:{h}:flags=lanczos"
        raw=ff("-v","error","-threads","2","-i",str(path),"-an","-vf",filt,"-fps_mode","vfr","-threads","1","-f","rawvideo","-pix_fmt","rgb24","-")[0]
        stills=np.frombuffer(raw,np.uint8).reshape(-1,h,w,3)
        assert len(stills)==len(fs)
        lookup={f:a for f,a in zip(fs,stills)}
        for title,frames in groups.items():
            sheet=Image.new("RGB",(5*(w+9)+9,2*(h+27)+8),"#19232e")
            draw=ImageDraw.Draw(sheet)
            for k,f in enumerate(frames):
                x,y=9+(k%5)*(w+9),8+(k//5)*(h+27)
                sheet.paste(Image.fromarray(lookup[f]),(x,y))
                draw.text((x+3,y+h+5),f"{f/FPS:.2f} s / f{f}",fill="#edf2eb")
            sheet.save(args.sheets/f"final-{title}.jpg",quality=92)


if __name__ == "__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--video",type=Path,default=ROOT/"renders/dishwasher-training-arc.mp4")
    parser.add_argument("--sheets",type=Path)
    parser.add_argument("--ffmpeg",default=shutil.which("ffmpeg"))
    parser.add_argument("--ffprobe",default=shutil.which("ffprobe"))
    parser.add_argument("--clock-only",action="store_true")
    args=parser.parse_args()
    if args.clock_only:
        clock_checks()
    else:
        if not args.ffmpeg or not args.ffprobe:
            parser.error("Install ffmpeg/ffprobe or pass their paths")
        main(args)

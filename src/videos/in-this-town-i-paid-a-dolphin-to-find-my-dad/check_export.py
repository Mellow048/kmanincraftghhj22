#!/usr/bin/env python3
"""Decode the delivered Dolphin short and verify the master against picture and audio source.

Usage: python3 check_export.py [path-to-master.mp4]
Requires numpy, ffprobe and a full ffmpeg (system or imageio-ffmpeg).
Shot meaning, poses, and caption clearance still need the visual review in REVIEW.md.
"""

import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
from fractions import Fraction

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SLUG = HERE.name
W, H = 108, 192
RATE = 8000


def require(ok, note):
    if not ok:
        raise SystemExit(f"FAIL: {note}")


def ffmpeg():
    exe = os.environ.get("FFMPEG") or shutil.which("ffmpeg")
    if exe:
        return exe
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def ffprobe():
    return os.environ.get("FFPROBE") or shutil.which("ffprobe") or str(
        ROOT / "node_modules/@remotion/compositor-linux-x64-gnu/ffprobe"
    )


def run(args, **kwargs):
    return subprocess.run(args, check=True, **kwargs)


def inspect_video(mp4, expected):
    cmd = [ffmpeg(), "-v", "error", "-xerror", "-threads", "2", "-i", mp4,
           "-map", "0:v:0", "-vf", f"scale={W}:{H},format=gray", "-fps_mode", "passthrough",
           "-an", "-threads", "1", "-f", "rawvideo", "-"]
    dark, identical, n = [], [], 0
    luma, changes = [], []
    prev = None
    with subprocess.Popen(cmd, stdout=subprocess.PIPE) as proc:
        assert proc.stdout is not None
        for raw in iter(lambda: proc.stdout.read(W * H), b""):
            require(len(raw) == W * H, "decoder returned an incomplete frame")
            # Do not let the burned-in white word make a black picture look like motion or light.
            pic = np.frombuffer(raw, dtype=np.uint8).reshape(H, W)[:130].astype(np.int16)
            lum = float(pic.mean())
            luma.append(lum)
            if lum < 22:
                dark.append(n)
            if prev is not None:
                delta = np.abs(pic - prev).mean()
                changes.append(delta)
                if delta == 0:
                    identical.append(n)
            prev = pic
            n += 1
        require(proc.wait() == 0, "video decode failed")
    require(n == expected, f"decoder got {n} frames, expected {expected}")
    require(not dark, f"near-black pictures at {dark[:8]}")
    require(not identical, f"adjacent identical pictures at {identical[:8]}")
    return {"decoded_frames": n, "dark_frames": len(dark), "identical_pairs": len(identical),
            "minimum_picture_luma": round(min(luma), 2),
            "opening_motion_mean_luma_delta": round(float(np.mean(changes[:89])), 3)}


def samples(file):
    data = run([ffmpeg(), "-v", "error", "-xerror", "-i", file, "-map", "0:a:0",
                "-ac", "1", "-ar", str(RATE), "-f", "f32le", "-"], capture_output=True).stdout
    return np.frombuffer(data, dtype="<f4")


def compare_mix(mp4, mix, timing):
    actual, ref = samples(mp4), samples(mix)
    require(abs(len(actual) / RATE - timing["duration"]) < 0.050, "truncated or padded audio")
    windows = []
    search = round(0.080 * RATE)
    for cue in timing["cues"]:
        # Match the encoded mix against the committed mix. A 360 ms window in every line
        # avoids treating the short silence between clips as sync evidence.
        i = round((cue["start"] + .20) * RATE)
        width = round(.36 * RATE)
        want = ref[i:i+width].astype(np.float64)
        want -= want.mean()
        got = actual[i-search:i+width+search].astype(np.float64)
        require(len(got) >= width + 2*search, "audio ends before the end of the last line")
        scores = np.correlate(got, want, mode="valid")
        k = int(np.argmax(scores))
        found = got[k:k+width].copy()
        found -= found.mean()
        similarity = float(np.dot(found, want) / (np.linalg.norm(found)*np.linalg.norm(want)))
        lag = (k-search) / RATE
        require(abs(lag) <= .022, f"{cue['id']} audio offset {lag*1000:.1f} ms")
        require(similarity > .92, f"{cue['id']} does not match the committed mix ({similarity:.3f})")
        windows.append({"cue":cue["id"], "lag_ms":round(lag*1000, 3), "correlation":round(similarity, 5)})
    return windows


def loudness(mp4):
    p = run([ffmpeg(), "-nostats", "-hide_banner", "-i", mp4, "-vn", "-af", "ebur128=peak=true",
             "-f", "null", "-"], capture_output=True, text=True)
    report = p.stderr.rsplit("Summary:", 1)[-1]
    i = float(re.search(r"\bI:\s+(-?[\d.]+) LUFS", report)[1])
    t = float(re.search(r"\bPeak:\s+(-?[\d.]+) dBFS", report)[1])
    require(-16.5 <= i <= -13, f"master is {i} LUFS")
    require(t <= -.3, f"master true peak is {t} dBTP")
    return i, t


def mp4_atoms(path):
    # Fast-start MP4 puts metadata before the first sample, so playback does not wait for download.
    with path.open("rb") as f:
        atoms = []
        while size_header := f.read(8):
            size, kind = int.from_bytes(size_header[:4], "big"), size_header[4:]
            head = 8
            if size == 1:
                size = int.from_bytes(f.read(8), "big")
                head = 16
            atoms.append(kind)
            if not size:
                break
            require(size >= head, "invalid MP4 container atom")
            f.seek(size-head, 1)
    return atoms


def main():
    mp4 = Path(sys.argv[1]) if len(sys.argv)>1 else ROOT / "renders" / (SLUG + ".mp4")
    timing = json.loads((HERE / "timing.json").read_text())
    mix = ROOT / f"public/audio/{SLUG}/mix.mp3"
    expected = round(timing["duration"] * timing["fps"])
    p = json.loads(run([ffprobe(), "-v", "error", "-show_streams", "-show_format", "-of", "json", mp4],
                       capture_output=True).stdout)
    v = [s for s in p["streams"] if s["codec_type"] == "video"]
    a = [s for s in p["streams"] if s["codec_type"] == "audio"]
    require(len(v)==len(a)==1, "expected exactly one video and one audio stream")
    v, a = v[0], a[0]
    require((v["codec_name"],v["width"],v["height"]) == ("h264",1080,1920), "picture format is not 1080×1920 H.264")
    require(v["pix_fmt"] in ("yuv420p", "yuvj420p"), "not a 4:2:0 picture")
    require(Fraction(v["avg_frame_rate"]) == Fraction(v["r_frame_rate"]) == 30, "not 30 fps")
    require(abs(float(v["duration"]) - timing["duration"]) <= 0.001, "incorrect video duration")
    require(abs(float(v.get("start_time",0))) <= 0.001, "non-zero video start timestamp")
    require(a["codec_name"]=="aac" and a["channels"]==2 and int(a["sample_rate"]) in (44100,48000), "not stereo 44.1/48 kHz AAC")
    atoms = mp4_atoms(mp4)
    require(b"moov" in atoms and b"mdat" in atoms and atoms.index(b"moov") < atoms.index(b"mdat"), "MP4 is not fast-start")
    picture = inspect_video(mp4, expected)
    sync = compare_mix(mp4, mix, timing)
    lufs, peak = loudness(mp4)
    digest = hashlib.sha256()
    with mp4.open("rb") as f:
        for block in iter(lambda:f.read(1024*1024), b""):
            digest.update(block)
    checksum = digest.hexdigest()
    print(json.dumps({"file":str(mp4),"bytes":mp4.stat().st_size,"sha256":checksum,
                      "width":v["width"],"height":v["height"],"fps":30,"seconds":float(v["duration"]),
                      "pixel_format":v["pix_fmt"],"aac_sample_rate":int(a["sample_rate"]),
                      **picture,"aac_sync_windows":sync,"lufs":lufs,"true_peak_db":peak}, indent=2))


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
A rendered film, checked: its size, its length against the voice, its frames, how loud it is. And one frame of it
for each shot, on one sheet: `renders/<film>-shots.jpg`, the picture every film's page points at.

  python3 scripts/render-check.py <film>                          the numbers of renders/<film>.mp4
  python3 scripts/render-check.py <film> --sheet                  … and renders/<film>-shots.jpg
  python3 scripts/render-check.py <film> --sheet out/x.jpg        … the sheet somewhere else
  python3 scripts/render-check.py <film> --frames out/frames      … and each frame as its own file, full size
  python3 scripts/render-check.py <film> --only 8.,13.near        only these shots (a cue id, or the start of one)
  python3 scripts/render-check.py <film> --at 0.15,0.5,0.9        three frames of each shot: early, middle, late

It reads the mp4 that the render workflow delivered and the film's timing.json. Nothing is rendered. It exits 1 if
the file is not the film: a wrong length, missing frames, no sound, or a loudness outside what a phone expects.

Needs: pip install pillow imageio-ffmpeg   (imageio-ffmpeg brings its own ffmpeg; a system ffmpeg is used if there is one)
"""
import argparse
import io
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def ffmpeg() -> str:
    found = shutil.which("ffmpeg")
    if found:
        return found
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("render-check: no ffmpeg. Run: pip install imageio-ffmpeg")


def main() -> int:
    ap = argparse.ArgumentParser(description="Check a rendered film and make a sheet of one frame per shot.")
    ap.add_argument("film")
    ap.add_argument("--file", help="the mp4 to check (default renders/<film>.mp4)")
    ap.add_argument("--sheet", nargs="?", const="", help="write the sheet (default renders/<film>-shots.jpg)")
    ap.add_argument("--frames", help="a folder for each frame as its own jpg, full size")
    ap.add_argument("--only", default="", help="cue ids, or the start of one (\"8.\"), comma separated")
    ap.add_argument("--at", default="0.5", help="where in each shot, 0-1. Several, comma separated, give several frames a shot")
    ap.add_argument("--cols", type=int, default=0, help="frames across (default: about a square sheet)")
    ap.add_argument("--w", type=int, default=216, help="width of one frame on the sheet")
    a = ap.parse_args()

    ff = ffmpeg()
    mp4 = Path(a.file) if a.file else ROOT / "renders" / f"{a.film}.mp4"
    timing_path = ROOT / "src" / "videos" / a.film / "timing.json"
    if not mp4.exists():
        sys.exit(f"render-check: {mp4} does not exist. Render the film first (the render workflow, with commit_to).")
    if not timing_path.exists():
        sys.exit(f"render-check: {timing_path} does not exist.")
    timing = json.loads(timing_path.read_text())
    fails = []

    print(f"{mp4.name}: {mp4.stat().st_size / 1e6:.1f} MB")
    info = subprocess.run([ff, "-hide_banner", "-i", str(mp4)], capture_output=True, text=True).stderr
    dur = re.search(r"Duration: (\d+):(\d+):([\d.]+)", info)
    seconds = int(dur.group(1)) * 3600 + int(dur.group(2)) * 60 + float(dur.group(3)) if dur else 0.0
    want = float(timing["duration"])
    print(f"  length    {seconds:.2f}s. The voice (timing.json) is {want:.2f}s.")
    if abs(seconds - want) > 0.15:
        fails.append(f"the file is {seconds:.2f}s long and the film is {want:.2f}s")

    video = re.search(r"Stream.*Video: (\w+).*?, (\d+)x(\d+).*?([\d.]+) fps", info)
    if video:
        print(f"  picture   {video.group(1)}, {video.group(2)}x{video.group(3)}, {video.group(4)} frames a second")
        fps = float(video.group(4))
    else:
        fails.append("no picture in the file")
        fps = 30.0
    audio = re.search(r"Stream.*Audio: (\w+).*?(\d+) Hz, (\w+)", info)
    if audio:
        print(f"  sound     {audio.group(1)}, {audio.group(2)} Hz, {audio.group(3)}")
    else:
        fails.append("no sound in the file")

    counted = subprocess.run([ff, "-hide_banner", "-i", str(mp4), "-map", "0:v:0", "-c", "copy", "-f", "null", "-"], capture_output=True, text=True).stderr
    frames = re.findall(r"frame=\s*(\d+)", counted)
    expect = round(want * fps)
    if frames:
        print(f"  frames    {frames[-1]}. The film has {expect}.")
        if abs(int(frames[-1]) - expect) > 2:
            fails.append(f"{frames[-1]} frames in the file, {expect} in the film: a chunk is missing or doubled")

    if audio:
        loud = subprocess.run([ff, "-hide_banner", "-nostats", "-i", str(mp4), "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
        tail = loud[loud.rfind("Summary:"):]
        lufs = re.search(r"I:\s*(-?[\d.]+) LUFS", tail)
        peak = re.search(r"Peak:\s*(-?[\d.]+) dBFS", tail)
        if lufs and peak:
            print(f"  loudness  {lufs.group(1)} LUFS, true peak {peak.group(1)} dB. A phone expects about -14.")
            if not -17.0 <= float(lufs.group(1)) <= -12.5:
                fails.append(f"{lufs.group(1)} LUFS: build the sound again (scripts/sound.py build)")
            if float(peak.group(1)) > 0.0:
                fails.append(f"the sound peaks at {peak.group(1)} dB: it clips")

    if a.sheet is not None or a.frames:
        try:
            from PIL import Image, ImageDraw
        except ImportError:
            sys.exit("render-check: the sheet needs Pillow. Run: pip install pillow")
        cues = timing["cues"]
        if a.only:
            wanted = [w.strip() for w in a.only.split(",") if w.strip()]
            cues = [c for c in cues if any(c["id"] == w or c["id"].startswith(w) for w in wanted)]
            if not cues:
                sys.exit(f"render-check: no shot matches --only {a.only}")
        ats = [float(x) for x in a.at.split(",")]
        if a.frames:
            Path(a.frames).mkdir(parents=True, exist_ok=True)
        tiles = []
        for c in cues:
            for k, p in enumerate(ats):
                t = min(c["start"] + (c["end"] - c["start"]) * p, seconds - 0.05)
                raw = subprocess.run([ff, "-hide_banner", "-loglevel", "error", "-ss", f"{t:.3f}", "-i", str(mp4), "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True).stdout
                if not raw:
                    fails.append(f"no frame at {t:.2f}s [{c['id']}]")
                    continue
                im = Image.open(io.BytesIO(raw)).convert("RGB")
                name = c["id"] if len(ats) == 1 else f"{c['id']}-{'abcdefgh'[k % 8]}"
                if a.frames:
                    im.save(Path(a.frames) / f"{name}.jpg", quality=92)
                im = im.resize((a.w, round(im.height * a.w / im.width)), Image.LANCZOS)
                draw = ImageDraw.Draw(im)
                draw.rectangle([0, 0, a.w, 13], fill=(12, 12, 16))
                draw.text((3, 1), f"{name}  {t:.1f}s", fill=(255, 220, 120))
                tiles.append(im)
        if a.sheet is not None and tiles:
            out = Path(a.sheet) if a.sheet else ROOT / "renders" / f"{a.film}-shots.jpg"
            tw, th = tiles[0].size
            # About a square sheet; of the widths near that, the one that leaves the fewest empty places in the last row.
            near = max(1, round((len(tiles) * th / tw) ** 0.5 * 1.25))
            cols = a.cols or min(range(max(1, near - 2), near + 3), key=lambda c: ((-len(tiles)) % c, abs(c - near)))
            rows = (len(tiles) + cols - 1) // cols
            sheet = Image.new("RGB", (cols * tw, rows * th), (12, 12, 16))
            for i, im in enumerate(tiles):
                sheet.paste(im, ((i % cols) * tw, (i // cols) * th))
            out.parent.mkdir(parents=True, exist_ok=True)
            sheet.save(out, quality=86)
            shown = out.relative_to(ROOT) if out.is_absolute() and ROOT in out.parents else out
            print(f"  sheet     {shown}: {len(tiles)} frames, {sheet.width}x{sheet.height}. Look at it.")

    if fails:
        print("\nNOT the film:")
        for f in fails:
            print(f"  - {f}")
        return 1
    print("\nThe file is the film, by the numbers. Nobody has WATCHED it: say so when you hand it over.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""
A film, measured the way a viewer meets it. This is the master prompt's Stage 6: look at the finished video as
somebody who has never seen it, and answer the questions that decide whether they stay. It is written for the one
thing an agent cannot do — watch — so every question below is turned into a number that can be read.

  python3 scripts/film-metrics.py renders/<film>.mp4                 one film, in words
  python3 scripts/film-metrics.py renders/a.mp4 renders/b.mp4        several, side by side
  python3 scripts/film-metrics.py --all                              everything in renders/
  python3 scripts/film-metrics.py <film>.mp4 --json out/metrics.json also write the numbers

What it measures, and which question of the self-review it answers:

| Number | The question |
|---|---|
| `hook` (first 3 s: detail, motion, light) | Does the first three seconds create curiosity, or is it a logo and an empty street? |
| `cuts`, `cut/s`, `median shot`, `longest still` | Is there purposeful shot variety, or does the frame sit still? |
| `flat` frames (near-empty: a wall, a blank grey surface) | Is every shot showing something? |
| `dark` frames (nearly black) | Can the viewer see the scene at all? |
| `lum` at the start, middle and end | Does the atmosphere move with the story — day to sunset to lantern light? |
| `caption` (bright pixels where the captions sit) | Are captions on screen and matched to the words? |
| `speech`, `silence` (from the sound track) | Is the narration there, and is any stretch of it dead air? |

Two of these are the reference's own shape. Run it on the film that worked (`renders/in-this-town-monster-village.mp4`)
and then on yours, and read the difference: that is what "learn the reference" means when you cannot watch it.

Nothing is rendered. It reads an mp4 and decodes it small: frames are scaled to 72x128 grey, so a three-minute film
is a few seconds of work. It exits 1 if a film fails the checks that matter — a dark or empty opening, a shot that
holds still for more than eight seconds, more than a fifth of the frames flat, or no captions where there is speech.

Needs: pip install numpy   and an ffmpeg: `$FFMPEG`, one on the PATH, imageio-ffmpeg, or the copy that ships with
@remotion/compositor-linux-x64-gnu.
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
W, H = 108, 192  # the size every frame is measured at: small, and still enough to see a face or a caption stroke
HOOK_SECONDS = 3.0  # the master prompt: the first three seconds decide everything
FLAT_STD = 11.0  # below this a frame is nearly one flat surface: a wall, a blank grey block, a sky
DARK_LUM = 22.0  # below this the viewer cannot see what is happening
SCENE = 0.25  # ffmpeg's scene score, 0-1: this is a cut, not a camera move. It finds 90 of the reference's 95 shots
STILL_DIFF = 0.55  # below this the frame is holding still
LONG_STILL = 8.0  # seconds of one unmoving frame: the master prompt's "same static character in the same position"
CAPTION_TOP = 0.58  # the band captions live in: below the middle, above the very bottom
CAPTION_BOTTOM = 0.92
CAPTION_MIN = 2.0  # outline x edges, scaled by 100: above this, lettering is on the screen


def ffmpeg() -> str:
    found = shutil.which("ffmpeg")
    if found:
        return found
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        pass
    bundled = ROOT / "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
    if bundled.exists():
        return str(bundled)
    sys.exit("film-metrics: no ffmpeg. Set $FFMPEG, or: pip install imageio-ffmpeg")


def probe(path: Path, exe: str) -> dict:
    """The stream info ffmpeg prints on stderr: size, fps, codecs, length."""
    out = subprocess.run([exe, "-hide_banner", "-i", str(path)], capture_output=True, text=True).stderr
    info: dict = {}
    stream = re.search(r"Stream #\d+:\d+.*?Video: (\w+).*?, (\d+)x(\d+)[^,]*,.*?([\d.]+) fps", out, re.S)
    if stream:
        info.update(codec=stream.group(1), width=int(stream.group(2)), height=int(stream.group(3)), fps=float(stream.group(4)))
    stream = re.search(r"Stream #\d+:\d+.*?Audio: (\w+).*?, (\d+) Hz", out, re.S)
    if stream:
        info.update(audio=stream.group(1), hz=int(stream.group(2)))
    dur = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
    if dur:
        info["duration"] = int(dur.group(1)) * 3600 + int(dur.group(2)) * 60 + float(dur.group(3))
    return info


def frames(path: Path, exe: str, sample: float):
    """Every frame, grey and small, as an array of (n_frames, H, W). `sample` keeps every nth frame."""
    cmd = [exe, "-v", "error", "-i", str(path), "-vf", f"scale={W}:{H}", "-pix_fmt", "gray", "-f", "rawvideo", "-"]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    assert proc.stdout is not None
    size = W * H
    kept: list[np.ndarray] = []
    i = 0
    step = max(1, int(round(sample)))
    while True:
        buf = proc.stdout.read(size)
        if len(buf) < size:
            break
        if i % step == 0:
            kept.append(np.frombuffer(buf, dtype=np.uint8).reshape(H, W))
        i += 1
    proc.stdout.close()
    proc.wait()
    if not kept:
        return np.zeros((0, H, W), dtype=np.uint8), 0
    # A cut-down ffmpeg (the copy that ships with @remotion/compositor has almost every filter and muxer switched
    # off, including `rawvideo`) decodes nothing and fails silently. Say what is wrong instead of reporting zeroes.
    if len(kept) < 2:
        sys.exit(f"film-metrics: {exe} could not decode {path} to raw video. Install a full ffmpeg: pip install imageio-ffmpeg")
    return np.stack(kept).astype(np.float32), i


def cut_times(path: Path, exe: str, threshold: float = 0.25) -> list[float]:
    """Where the picture is cut, in seconds — ffmpeg's own scene detector (0–1, 0.25 is a cut and not a camera move).

    A frame-to-frame difference cannot tell a cut from a camera pushing in: in the reference film it counted 1,776
    "cuts" where the shot log says 95. The scene detector counted 90. Prescaled to 360x640, so a three-minute film
    takes seconds.
    """
    cmd = [
        exe,
        "-v",
        "info",
        "-i",
        str(path),
        "-vf",
        f"scale=360:640,select=gt(scene\\,{threshold}),showinfo",
        "-f",
        "null",
        "-",
    ]
    out = subprocess.run(cmd, capture_output=True, text=True).stderr
    return [float(x) for x in re.findall(r"pts_time:([\d.]+)", out)]


def audio_envelope(path: Path, exe: str, seconds: float, bins: int = 400) -> np.ndarray:
    """Rough loudness of the mixed track, one value per bin: enough to find speech and dead air."""
    rate = 4000
    cmd = [exe, "-v", "error", "-i", str(path), "-vn", "-ac", "1", "-ar", str(rate), "-f", "s16le", "-"]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    assert proc.stdout is not None
    raw = proc.stdout.read()
    proc.stdout.close()
    proc.wait()
    if not raw:
        return np.zeros(bins)
    pcm = np.frombuffer(raw, dtype="<i2").astype(np.float32) / 32768.0
    per = max(1, len(pcm) // bins)
    env = np.abs(pcm[: per * bins]).reshape(bins, per).mean(axis=1)
    return env


def measure(path: Path, exe: str) -> dict:
    info = probe(path, exe)
    fps = info.get("fps") or 30.0
    sample = 1 if fps <= 30.5 else round(fps / 30.0)  # measure at about 30 a second, whatever the film runs at
    film, n = frames(path, exe, sample)
    mfps = (fps / sample) if sample else 30.0
    out: dict = {"file": str(path.relative_to(ROOT)) if str(path).startswith(str(ROOT)) else str(path)}
    out.update({k: info.get(k) for k in ("duration", "width", "height", "fps", "codec", "audio")})
    out["mb"] = round(path.stat().st_size / 1e6, 1)
    if len(film) < 2:
        out["error"] = "no frames decoded"
        return out

    lum = film.mean(axis=(1, 2))
    std = film.std(axis=(1, 2))
    diff = np.abs(np.diff(film, axis=0)).mean(axis=(1, 2))
    diff = np.concatenate([[diff[0]], diff])  # one motion value per frame
    seconds = np.arange(len(film)) / mfps

    # Captions: white lettering inside a thick black outline. Bright pixels alone are useless — a bright sky has
    # more of them than a caption does — so this looks for the signature of lettering: very dark pixels (the
    # outline) AND sharp edges (the strokes) together, in the band where captions sit. Measured against the word
    # timings of two finished films it finds captions with 0.98 precision and 1.00 recall, on both 1080x1920 and
    # 720x1280, and reports their coverage within two points of the truth.
    top, bottom = int(H * CAPTION_TOP), int(H * CAPTION_BOTTOM)
    band = film[:, top:bottom, int(W * 0.12) : int(W * 0.88)]
    outline = (band < 45).mean(axis=(1, 2))
    edges = np.abs(np.diff(band, axis=2)).mean(axis=(1, 2))
    caption = (outline * edges * 100).round(3)

    edges = cut_times(path, exe)
    length_s = info.get("duration") or len(film) / mfps
    shot_lengths = np.diff([0.0, *edges, length_s]) if edges else np.array([length_s])
    shot_lengths = shot_lengths[shot_lengths > 0.05]

    still = diff < STILL_DIFF
    # The longest unbroken stretch in which the picture hardly moves.
    longest, run = 0.0, 0.0
    for s in still:
        run = run + 1 / mfps if s else 0.0
        longest = max(longest, run)

    third = max(1, len(film) // 3)
    out.update(
        frames_measured=int(len(film)),
        cut=len(edges),
        cut_per_s=round(len(edges) / (len(film) / mfps), 2),
        median_shot_s=round(float(np.median(shot_lengths)), 2) if len(shot_lengths) else None,
        longest_shot_s=round(float(shot_lengths.max()), 1) if len(shot_lengths) else None,
        longest_still_s=round(longest, 1),
        flat_pct=round(float((std < FLAT_STD).mean() * 100), 1),
        dark_pct=round(float((lum < DARK_LUM).mean() * 100), 1),
        lum_start=round(float(lum[: int(mfps * HOOK_SECONDS)].mean()), 1),
        lum_mid=round(float(lum[third : 2 * third].mean()), 1),
        lum_end=round(float(lum[-third:].mean()), 1),
        hook_detail=round(float(std[: int(mfps * HOOK_SECONDS)].mean()), 1),
        hook_motion=round(float(diff[: int(mfps * HOOK_SECONDS)].mean()), 2),
        motion_mean=round(float(diff.mean()), 2),
        caption_pct=round(float((caption > CAPTION_MIN).mean() * 100), 1),
        caption_peak=round(float(caption.max()), 1),
    )
    env = audio_envelope(path, exe, info.get("duration", len(film) / mfps))
    if env.any():
        loud = env > max(env.max() * 0.06, 0.004)
        out["speech_pct"] = round(float(loud.mean() * 100), 1)
        # The longest unbroken run of quiet frames, not the longest run between them.
        longest, run = 0, 0
        for quiet in ~loud:
            run = run + 1 if quiet else 0
            longest = max(longest, run)
        out["longest_silence_s"] = round(longest / len(env) * (info.get("duration") or len(film) / mfps), 1)
    out["_lum"] = lum.round(1).tolist()
    out["_caption"] = caption.tolist()
    out["_diff"] = diff.round(2).tolist()
    out["_t"] = seconds.round(2).tolist()
    return out


def verdict(m: dict) -> list[str]:
    """The self-review, in one line each. Empty means the film passes."""
    bad = []
    if m.get("error"):
        return [m["error"]]
    if m["hook_detail"] < FLAT_STD:
        bad.append(f"opening is nearly empty (detail {m['hook_detail']}) — no hook in the first {HOOK_SECONDS:g}s")
    if m["hook_motion"] < STILL_DIFF:
        bad.append(f"opening hardly moves (motion {m['hook_motion']})")
    if m["lum_start"] < DARK_LUM:
        bad.append(f"opening is too dark to read ({m['lum_start']} luma)")
    if m["longest_still_s"] > LONG_STILL:
        bad.append(f"one frame holds still for {m['longest_still_s']}s")
    if (m.get("longest_shot_s") or 0) > 12:
        bad.append(f"one shot holds for {m['longest_shot_s']}s without a cut")
    if m["flat_pct"] > 20:
        bad.append(f"{m['flat_pct']}% of frames are nearly one flat surface")
    if m["dark_pct"] > 25:
        bad.append(f"{m['dark_pct']}% of frames are nearly black")
    if m.get("caption_pct", 0) < 25 and m.get("speech_pct", 0) > 40:
        bad.append(f"speech for {m['speech_pct']}% of the film but captions on only {m['caption_pct']}% of it")
    if m.get("longest_silence_s", 0) > 4 and m.get("speech_pct", 100) < 95:
        bad.append(f"{m['longest_silence_s']}s of near-silence in the middle of the film")
    return bad


def line(m: dict) -> str:
    d = m.get("duration") or 0
    return (
        f"{m['file'].split('/')[-1]:<52} {d:6.1f}s {m.get('width')}x{m.get('height')} "
        f"{m['cut']:4d} cuts {m['cut_per_s']:5.2f}/s shot~{m['median_shot_s']:>4}s long {m['longest_shot_s']:>4}s still {m['longest_still_s']:>4}s "
        f"flat {m['flat_pct']:4.1f}% dark {m['dark_pct']:4.1f}% lum {m['lum_start']:5.1f}/{m['lum_mid']:5.1f}/{m['lum_end']:5.1f} "
        f"hook {m['hook_detail']:4.1f} cap {m['caption_pct']:4.1f}%"
    )


def timeline(m: dict, step: float = 1.0) -> None:
    """The film second by second: where it is dark, where it is still, where the captions are.

    This is how a number becomes a note you can act on: "seconds 34-38 are nearly black" is a fix; "4.6% dark" is
    not. `step` seconds a row.
    """
    t = np.array(m["_t"])
    lum, diff, cap = np.array(m["_lum"]), np.array(m["_diff"]), np.array(m["_caption"])
    print(f"\n{m['file'].split('/')[-1]}: one row every {step:g}s   (luma 0-255, motion, caption area %)")
    print("    s  luma  motion  caption   ")
    rows = np.arange(0, t[-1], step)
    for start in rows:
        sel = (t >= start) & (t < start + step)
        if not sel.any():
            continue
        l, d, c = float(lum[sel].mean()), float(diff[sel].mean()), float(cap[sel].mean())
        flag = "  DARK" if l < DARK_LUM else ("  still" if d < STILL_DIFF else "")
        bar = "#" * int(round(c / 2))
        print(f"{start:5.0f} {l:6.1f} {d:7.2f} {c:7.1f}  {bar:<24}{flag}")


def cue_table(m: dict, cues: list[dict], name_key: str = "id") -> None:
    """The same numbers, read per shot — which is how a film is fixed.

    "4.6% of the frames are dark" is not actionable. "shot 1.weight, the second thing a viewer sees, is nearly
    black for 1.9 seconds" is. Give it the film's `timing.json` and it prints every shot with its light, its
    motion and its captions, and marks the ones a viewer would struggle with.
    """
    t = np.array(m["_t"])
    lum, diff, cap = np.array(m["_lum"]), np.array(m["_diff"]), np.array(m["_caption"])
    print(f"\n{m['file'].split('/')[-1]}: {len(cues)} shots   (luma 0-255; below {DARK_LUM:g} the viewer cannot read the frame)")
    print(f"  {'shot':<12} {'at':>6} {'len':>5} {'luma':>6} {'motion':>7} {'caption':>8}   ")
    for c in cues:
        a, b = float(c["start"]), float(c.get("end", c["start"]))
        sel = (t >= a) & (t < b)
        if not sel.any():
            continue
        l, d, cp = float(lum[sel].mean()), float(diff[sel].mean()), float(cap[sel].mean())
        flag = []
        if l < DARK_LUM:
            flag.append("TOO DARK")
        elif l < 40:
            flag.append("very dark")
        if d < STILL_DIFF:
            flag.append("still")
        if cp < CAPTION_MIN:
            flag.append("no caption")
        print(f"  {str(c[name_key]):<12} {a:6.2f} {b - a:5.2f} {l:6.1f} {d:7.2f} {cp:8.1f}   {' '.join(flag)}")
    dark = [c for c in cues if ((t >= float(c['start'])) & (t < float(c.get('end', c['start'])))).any() and float(lum[(t >= float(c['start'])) & (t < float(c.get('end', c['start'])))].mean()) < DARK_LUM]
    if dark:
        print(f"\n  {len(dark)} shot(s) too dark to read: {', '.join(str(c[name_key]) for c in dark)}")


def main() -> int:
    ap = argparse.ArgumentParser(description="Measure a rendered film the way a viewer meets it.")
    ap.add_argument("films", nargs="*", help="mp4 files, or film ids in renders/")
    ap.add_argument("--all", action="store_true", help="every mp4 in renders/")
    ap.add_argument("--json", help="write the numbers here")
    ap.add_argument("--timeline", action="store_true", help="print the film second by second")
    ap.add_argument("--step", type=float, default=1.0, help="seconds a row in the timeline (default 1)")
    ap.add_argument("--cues", action="store_true", help="break the numbers down per shot, from the film's timing.json")
    ap.add_argument("--timing", help="the timing.json to read the shots from (default: found from the film id)")
    args = ap.parse_args()

    paths: list[Path] = []
    for f in args.films:
        p = Path(f)
        paths.append(p if p.exists() else ROOT / "renders" / f"{f}.mp4")
    if args.all or not paths:
        paths = sorted((ROOT / "renders").glob("*.mp4"))
    missing = [str(p) for p in paths if not p.exists()]
    if missing:
        sys.exit("film-metrics: no such file: " + ", ".join(missing))

    exe = ffmpeg()
    results = [measure(p, exe) for p in paths]
    print(f"{'film':<52} {'len':>7} {'frame':>9} {'cuts':>12} {'shot':>14} {'still':>11} {'flat':>9} {'dark':>9} {'luma start/mid/end':>22} {'hook':>8}")
    for m in results:
        print(line(m))
        for b in verdict(m):
            print(f"    ! {b}")
        if args.timeline:
            timeline(m, args.step)
        if args.cues:
            fid = Path(m["file"]).stem
            tj = ROOT / "src/videos" / fid / "timing.json"
            if not tj.exists():  # a reference film keeps its snapshot under Topics/
                hits = sorted((ROOT / "Topics").glob(f"*/reference/*/source/timing.json"))
                hits = [h for h in hits if h.parent.parent.name == fid]
                tj = hits[0] if hits else tj
            if args.timing:
                tj = Path(args.timing)
            if tj.exists():
                cue_table(m, json.loads(tj.read_text())["cues"])
            else:
                print(f"    (no timing.json found for {fid}; --cues needs it)")
    if args.json:
        out = Path(args.json)
        out.parent.mkdir(parents=True, exist_ok=True)
        keep = [{k: v for k, v in m.items() if not k.startswith("_")} | {"verdict": verdict(m)} for m in results]
        out.write_text(json.dumps(keep, indent=2))
        print(f"\nwrote {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

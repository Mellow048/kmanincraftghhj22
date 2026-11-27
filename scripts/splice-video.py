#!/usr/bin/env python3
"""
Frame-accurate surgical video splicer for ZackCraft Films.

Takes an existing full-resolution master MP4, a list of newly rendered partial frame ranges
(rendered with `remotion render --frames=A-B`), and an audio mix MP3, and produces a
frame-exact spliced 1080x1920 MP4 preserving every untouched frame from the master.

Usage:
  python3 scripts/splice-video.py \
    --master master.mp4 \
    --audio public/audio/<slug>/mix.mp3 \
    --out out/<slug>.mp4 \
    --clip 186-319:clips/seg-0.mov \
    --clip 939-1006:clips/seg-1.mov
"""
import argparse
import os
import subprocess
import sys


def count_frames(ffprobe: str, path: str) -> int:
    out = subprocess.check_output(
        [
            ffprobe,
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-count_packets",
            "-show_entries",
            "stream=nb_read_packets",
            "-of",
            "csv=p=0",
            path,
        ],
        text=True,
    ).strip()
    digits = "".join(ch for ch in out if ch.isdigit())
    if not digits:
        raise RuntimeError(f"Could not count frames in {path!r} (got {out!r})")
    return int(digits)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--master", required=True)
    ap.add_argument("--audio", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--clip", action="append", required=True, help="FROM-TO:PATH (inclusive 0-indexed frame range)")
    ap.add_argument("--ffmpeg", default="ffmpeg")
    ap.add_argument("--ffprobe", default="ffprobe")
    ap.add_argument("--crf", default="18")
    ap.add_argument("--fps", type=int, default=30)
    args = ap.parse_args()

    total_frames = count_frames(args.ffprobe, args.master)
    print(f"Master: {args.master} ({total_frames} frames)")

    clips: list[tuple[int, int, str]] = []
    for spec in args.clip:
        rng, path = spec.split(":", 1)
        a_s, b_s = rng.split("-", 1)
        a, b = int(a_s), int(b_s)
        if not (0 <= a <= b < total_frames):
            raise ValueError(f"Clip range {a}-{b} out of bounds for {total_frames}-frame master")
        expected = b - a + 1
        actual = count_frames(args.ffprobe, path)
        if actual != expected:
            raise RuntimeError(f"Clip {path} ({a}-{b}) has {actual} frames, expected {expected}")
        print(f"  Replace [{a}..{b}] ({expected}f) <- {path}")
        clips.append((a, b, path))

    clips.sort(key=lambda x: x[0])
    for i in range(1, len(clips)):
        if clips[i][0] <= clips[i - 1][1]:
            raise ValueError(f"Overlapping clip ranges: {clips[i-1][:2]} and {clips[i][:2]}")

    # Build ordered timeline of master keep spans + replacement clips
    cmd = [args.ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", args.master]
    for _, _, path in clips:
        cmd.extend(["-i", path])
    audio_idx = 1 + len(clips)
    cmd.extend(["-i", args.audio])

    filter_parts: list[str] = []
    concat_labels: list[str] = []
    seg_idx = 0
    cursor = 0

    for clip_i, (a, b, _) in enumerate(clips):
        if cursor < a:
            lbl = f"v{seg_idx}"
            filter_parts.append(
                f"[0:v]trim=start_frame={cursor}:end_frame={a},setpts=PTS-STARTPTS,format=yuv420p[{lbl}]"
            )
            concat_labels.append(f"[{lbl}]")
            print(f"  Keep    [{cursor}..{a-1}] ({a - cursor}f) <- master")
            seg_idx += 1
        lbl = f"v{seg_idx}"
        in_idx = 1 + clip_i
        filter_parts.append(f"[{in_idx}:v]setpts=PTS-STARTPTS,format=yuv420p[{lbl}]")
        concat_labels.append(f"[{lbl}]")
        seg_idx += 1
        cursor = b + 1

    if cursor < total_frames:
        lbl = f"v{seg_idx}"
        filter_parts.append(
            f"[0:v]trim=start_frame={cursor}:end_frame={total_frames},setpts=PTS-STARTPTS,format=yuv420p[{lbl}]"
        )
        concat_labels.append(f"[{lbl}]")
        print(f"  Keep    [{cursor}..{total_frames-1}] ({total_frames - cursor}f) <- master")
        seg_idx += 1

    duration_s = total_frames / float(args.fps)
    filter_parts.append(f"{''.join(concat_labels)}concat=n={seg_idx}:v=1:a=0[vout]")
    filter_parts.append(f"[{audio_idx}:a]apad,atrim=0:{duration_s:.6f},asetpts=PTS-STARTPTS[aout]")
    filter_complex = ";".join(filter_parts)

    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    cmd.extend(
        [
            "-filter_complex",
            filter_complex,
            "-map",
            "[vout]",
            "-map",
            "[aout]",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            str(args.crf),
            "-r",
            str(args.fps),
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-movflags",
            "+faststart",
            args.out,
        ]
    )

    print(f"Splicing {seg_idx} segments into {args.out} ({total_frames}f @ {args.fps}fps)...")
    subprocess.check_call(cmd)

    out_frames = count_frames(args.ffprobe, args.out)
    if out_frames != total_frames:
        raise RuntimeError(f"Output frame count mismatch: got {out_frames}, expected {total_frames}")
    size_mb = os.path.getsize(args.out) / (1024 * 1024)
    print(f"SUCCESS: {args.out} -> {out_frames} frames ({size_mb:.1f} MB)")


if __name__ == "__main__":
    main()

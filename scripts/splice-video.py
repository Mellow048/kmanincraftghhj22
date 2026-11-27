#!/usr/bin/env python3
"""
Frame-accurate surgical video splicer for ZackCraft Films.

Takes an existing full-resolution master MP4, a list of newly rendered partial frame ranges
(rendered with `remotion render --frames=A-B`), and an audio mix MP3, and produces a
frame-exact spliced 1080x1920 MP4 preserving every untouched frame from the master.

Architecture (low-memory, FFmpeg 4/5/6/7/8/9 compatible):
  1. Verify master frame count and every replacement clip's exact frame count.
  2. Build an ordered timeline of keep spans (from master) + replacement clips.
  3. Normalize each segment independently into a temp directory using identical H.264
     codec / pixel-format / fps / timescale parameters (zero multi-stream split buffering)
     and verify every segment's exact frame count.
  4. Stream-copy concatenate all segments via the concat demuxer while muxing the fresh
     `mix.mp3` audio track trimmed/padded to exact duration.
  5. Verify final output frame count equals master frame count.

Usage:
  python3 scripts/splice-video.py \
    --master master.mp4 \
    --audio public/audio/<slug>/mix.mp3 \
    --out out/<slug>.mp4 \
    --clip 186-319:clips/seg-00_186-319.mov \
    --clip 939-1006:clips/seg-01_939-1006.mov
"""
import argparse
import os
import subprocess
import tempfile


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


def run_cmd(cmd: list[str]) -> None:
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"Command failed (exit {res.returncode}): {' '.join(cmd)}\n{res.stdout}")


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
    print(f"Master: {args.master} ({total_frames} frames)", flush=True)

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
        print(f"  Replace [{a}..{b}] ({expected}f) <- {path}", flush=True)
        clips.append((a, b, path))

    clips.sort(key=lambda x: x[0])
    for i in range(1, len(clips)):
        if clips[i][0] <= clips[i - 1][1]:
            raise ValueError(f"Overlapping clip ranges: {clips[i - 1][:2]} and {clips[i][:2]}")

    # Build ordered timeline of ('keep', start, end_exclusive) and ('clip', start, end_exclusive, path)
    timeline: list[tuple] = []
    cursor = 0
    for a, b, path in clips:
        if cursor < a:
            timeline.append(("keep", cursor, a))
        timeline.append(("clip", a, b + 1, path))
        cursor = b + 1
    if cursor < total_frames:
        timeline.append(("keep", cursor, total_frames))

    common_v = [
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        str(args.crf),
        "-r",
        str(args.fps),
        "-video_track_timescale",
        "15360",
        "-pix_fmt",
        "yuv420p",
    ]

    with tempfile.TemporaryDirectory(prefix="splice-parts-") as tmpdir:
        part_paths: list[str] = []
        for idx, item in enumerate(timeline):
            part_path = os.path.join(tmpdir, f"part-{idx:03d}.mp4")
            kind = item[0]
            start_f, end_f = item[1], item[2]
            expected_f = end_f - start_f
            if kind == "keep":
                print(f"  [{idx:02d}] Keep    [{start_f}..{end_f - 1}] ({expected_f}f) <- master", flush=True)
                vf = f"trim=start_frame={start_f}:end_frame={end_f},setpts=PTS-STARTPTS,format=yuv420p"
                cmd = [args.ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", args.master, "-vf", vf, *common_v, part_path]
            else:
                clip_path = item[3]
                print(f"  [{idx:02d}] Replace [{start_f}..{end_f - 1}] ({expected_f}f) <- {os.path.basename(clip_path)}", flush=True)
                vf = "setpts=PTS-STARTPTS,format=yuv420p"
                cmd = [args.ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", clip_path, "-vf", vf, *common_v, part_path]
            run_cmd(cmd)
            got_f = count_frames(args.ffprobe, part_path)
            if got_f != expected_f:
                raise RuntimeError(f"Part {idx} ({kind} {start_f}..{end_f - 1}) has {got_f} frames, expected {expected_f}")
            part_paths.append(part_path)

        list_txt = os.path.join(tmpdir, "list.txt")
        with open(list_txt, "w") as fh:
            for p in part_paths:
                fh.write(f"file '{p}'\n")

        duration_s = total_frames / float(args.fps)
        os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
        mux_cmd = [
            args.ffmpeg,
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            list_txt,
            "-i",
            args.audio,
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "copy",
            "-af",
            f"apad,atrim=0:{duration_s:.6f},asetpts=PTS-STARTPTS",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-movflags",
            "+faststart",
            args.out,
        ]
        print(f"Concatenating {len(part_paths)} parts + muxing {args.audio} ({duration_s:.3f}s)...", flush=True)
        run_cmd(mux_cmd)

    out_frames = count_frames(args.ffprobe, args.out)
    if out_frames != total_frames:
        raise RuntimeError(f"Output frame count mismatch: got {out_frames}, expected {total_frames}")
    size_mb = os.path.getsize(args.out) / (1024 * 1024)
    print(f"SUCCESS: {args.out} -> {out_frames} frames ({size_mb:.1f} MB)", flush=True)


if __name__ == "__main__":
    main()

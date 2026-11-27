#!/usr/bin/env python3
"""
tts.py — synthesize raw narration clips for a story film from narration.md.

Primary engine (`edge`, default):
  python3 scripts/tts.py <slug> --voice en-US-GuyNeural --rate=+10%
  -> writes public/audio/<slug>/raw/<clip>.mp3

Offline fallback (`kokoro`):
  python3 scripts/tts.py <slug> --engine kokoro --voice am_puck
  -> writes public/audio/<slug>/raw/<clip>.wav

Follow with forced alignment & audio mix:
  uv run --offline --with numpy --with pocketsphinx python scripts/narration.py build <slug> --require-alignment
  python3 scripts/sound.py build <slug>
"""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SCRIPT_DIR)
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

import narration  # noqa: E402

DEFAULT_EDGE_VOICE = "en-US-GuyNeural"
DEFAULT_EDGE_RATE = "+0%"
DEFAULT_KOKORO_VOICE = "am_puck"
DEFAULT_KOKORO_MODEL = os.path.expanduser("~/.cache/hyperframes/tts/models/kokoro-v1.0.onnx")
DEFAULT_KOKORO_VOICES = os.path.expanduser("~/.cache/hyperframes/tts/voices/voices-v1.0.bin")


def resolve_edge_tts() -> list[str]:
    exe = shutil.which("edge-tts") or os.path.expanduser("~/.local/bin/edge-tts")
    if exe and os.path.exists(exe):
        return [exe]
    return [sys.executable, "-m", "edge_tts"]


def synth_edge(text: str, out_path: str, voice: str, rate: str) -> None:
    cmd = [
        *resolve_edge_tts(),
        "--voice",
        voice,
        f"--rate={rate}",
        "--text",
        text,
        "--write-media",
        out_path,
    ]
    subprocess.run(cmd, check=True)


def synth_kokoro(text: str, out_path: str, voice: str, speed: float, model_path: str, voices_path: str) -> None:
    try:
        import soundfile as sf
        from kokoro_onnx import Kokoro
    except ImportError as exc:
        sys.exit(f"Kokoro offline fallback requires kokoro-onnx and soundfile: {exc}")
    if not os.path.exists(model_path) or not os.path.exists(voices_path):
        sys.exit(f"Missing Kokoro model/voices at {model_path} / {voices_path}")
    kokoro = synth_kokoro._cache.get((model_path, voices_path))
    if kokoro is None:
        kokoro = Kokoro(model_path, voices_path)
        synth_kokoro._cache[(model_path, voices_path)] = kokoro
    samples, sr = kokoro.create(text, voice=voice, speed=speed, lang="en-us")
    sf.write(out_path, samples, sr)


synth_kokoro._cache = {}


def main() -> None:
    ap = argparse.ArgumentParser(description="Synthesize raw narration clips from narration.md.")
    ap.add_argument("film", help="Film slug under src/videos/<film>")
    ap.add_argument("--engine", choices=["edge", "kokoro"], default="edge", help="TTS backend (default: edge)")
    ap.add_argument("--voice", default=None, help=f"Voice name (default: {DEFAULT_EDGE_VOICE} for edge, {DEFAULT_KOKORO_VOICE} for kokoro)")
    ap.add_argument("--rate", default=DEFAULT_EDGE_RATE, help=f"Edge-TTS rate adjustment (default: {DEFAULT_EDGE_RATE})")
    ap.add_argument("--speed", type=float, default=1.1, help="Kokoro speaking speed multiplier (default: 1.1)")
    ap.add_argument("--model", default=DEFAULT_KOKORO_MODEL, help="Path to kokoro-v1.0.onnx")
    ap.add_argument("--voices", default=DEFAULT_KOKORO_VOICES, help="Path to voices-v1.0.bin")
    ap.add_argument("--only", default="", help="Comma-separated clip name filter (e.g. 01-hook,02-crisis)")
    ap.add_argument("--skip-existing", action="store_true", help="Skip clips whose output file already exists")
    args = ap.parse_args()

    clips = narration.read_script(args.film)
    only = {s.strip() for s in args.only.split(",") if s.strip()}
    if only:
        clips = [c for c in clips if c["name"] in only]
        if not clips:
            sys.exit(f"No clips matched --only={args.only}")

    raw_dir = os.path.join(ROOT, "public", "audio", args.film, "raw")
    os.makedirs(raw_dir, exist_ok=True)
    voice = args.voice or (DEFAULT_EDGE_VOICE if args.engine == "edge" else DEFAULT_KOKORO_VOICE)
    ext = ".mp3" if args.engine == "edge" else ".wav"

    for clip in clips:
        text = " ".join(c["text"] for c in clip["cues"])
        out_path = os.path.join(raw_dir, clip["name"] + ext)
        if args.skip_existing and os.path.exists(out_path):
            print(f"SKIP {os.path.relpath(out_path, ROOT)}")
            continue
        if args.engine == "edge":
            synth_edge(text, out_path, voice=voice, rate=args.rate)
        else:
            synth_kokoro(text, out_path, voice=voice, speed=args.speed, model_path=args.model, voices_path=args.voices)
        print(f"OK   {os.path.relpath(out_path, ROOT)} ({len(narration.spoken_words(text))} words)")


if __name__ == "__main__":
    main()

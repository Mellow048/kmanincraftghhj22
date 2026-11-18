#!/usr/bin/env python3
"""
dialogue-timing.py — the cut for a film that is mostly silence and a few lines.

A story film is cut to a continuous voice-over (scripts/narration.py). This film is not: it is
eleven beats of action with eight short lines in them, so the picture decides when things happen
and the voice is placed inside it.

`lines.json` is the single source: every scene, every shot and its length, and every line with the
second of its shot that it starts on. This tool turns that into

    public/audio/<film>/narration.mp3   the lines, placed at their seconds, each in its own voice
    src/videos/<film>/timing.json       every shot as a cue, and every spoken word with its time

and `kit.tsx` reads the same lines.json back for the shot lengths, so the picture, the captions and
the sound all come from one file and cannot drift apart.

    python3 scripts/dialogue-timing.py <film>

The voice is `voice-08` for the kid; the other people are the same recording pitched, because one
film has one voice in it. Recordings go in public/audio/<film>/raw/<shot id>.mp3.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys

import numpy as np

try:
    import imageio_ffmpeg

    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:  # pragma: no cover
    FFMPEG = "ffmpeg"

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 44100

# who speaks, and how far the recording is bent. One voice in the film: the friends are the kid
# pitched up a little (young men, talking over music), the club owner pitched down (older, bored).
VOICE = {
    "me": 1.0,
    "friends": 1.09,
    "friend": 1.12,
    "friend2": 1.05,
    "kid": 1.24,
    "owner": 0.9,
}
# How much louder each voice sits. The lines shouted over music have to cut through it.
GAIN = {"me": 0.0, "friends": 1.0, "friend": 1.5, "friend2": 1.5, "kid": 0.5, "owner": 0.0}


def read_pcm(path: str, rate: int = SR) -> np.ndarray:
    out = subprocess.run(
        [FFMPEG, "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(rate), "-"],
        check=True,
        capture_output=True,
    ).stdout
    return np.frombuffer(out, dtype=np.float32).copy()


def trim(x: np.ndarray, floor_db: float = -28.0) -> np.ndarray:
    """Silence off both ends, with 60 ms of air left on each."""
    if x.size == 0:
        return x
    peak = float(np.max(np.abs(x))) or 1.0
    gate = peak * (10 ** (floor_db / 20))
    loud = np.flatnonzero(np.abs(x) > gate)
    if loud.size == 0:
        return x
    pad = int(0.06 * SR)
    a = max(0, loud[0] - pad)
    b = min(x.size, loud[-1] + pad)
    return x[a:b]


def resample(x: np.ndarray, factor: float) -> np.ndarray:
    """Play it back `factor` times faster: shorter, and higher. The same trick a tape does."""
    if abs(factor - 1.0) < 1e-3:
        return x
    n = max(1, int(round(x.size / factor)))
    src = np.linspace(0, x.size - 1, n)
    room = np.arange(x.size)
    return np.interp(src, room, x).astype(np.float32)


SYLLABLE_WEIGHT = {"a": 1, "e": 1, "i": 1, "o": 1, "u": 1, "y": 1}


def syllables(word: str) -> int:
    w = "".join(ch for ch in word.lower() if ch.isalpha())
    if not w:
        return 1
    n = sum(1 for ch in w if ch in SYLLABLE_WEIGHT)
    if w.endswith("e") and n > 1:
        n -= 1
    return max(1, n)


def word_weights(text: str):
    out = []
    for word in text.split():
        w = float(syllables(word)) + 0.45
        if word.endswith(","):
            w += 0.5
        elif word.endswith((".", "?", "!")):
            w += 1.1
        out.append(w)
    return out


def main(film: str, write_voice: bool = True) -> int:
    folder = os.path.join(ROOT, "src", "videos", film)
    sheet = json.load(open(os.path.join(folder, "lines.json"), encoding="utf8"))
    fps = int(sheet.get("fps", 30))
    audio_dir = os.path.join(ROOT, "public", "audio", film)
    raw = os.path.join(audio_dir, "raw")

    # --- the cut: every shot, at its absolute second
    cues = []
    cue_end = {}
    lines = []
    t = 0.0
    for scene in sheet["scenes"]:
        for shot in scene["shots"]:
            dur = float(shot["dur"])
            cue = {"id": shot["id"], "start": round(t, 4), "end": round(t + dur, 4), "scene": scene["id"]}
            cue["text"] = shot.get("line", {}).get("caption") or shot.get("line", {}).get("text", "")
            cues.append(cue)
            cue_end[shot["id"]] = cue["end"]
            if "line" in shot:
                line = dict(shot["line"])
                line["shot"] = shot["id"]
                line["start"] = None if line.get("at") == "end" else round(t + float(line.get("at", 0.0)), 4)
                lines.append(line)
            t += dur
    total = t
    print(f"  {len(cues)} shots, {total:.2f}s")

    # --- the voice
    # a line said more than once (the hush opens and closes the film) is recorded once
    spoken = [(ln["text"], ln["shot"]) for ln in lines]
    track = np.zeros(int(total * SR) + SR, dtype=np.float32)
    words = []
    placed = 0
    for line in lines:
        path = os.path.join(raw, f"{line['shot']}.mp3")
        if not os.path.exists(path):
            twin = next((shot for text, shot in spoken if text == line["text"] and shot != line["shot"]), None)
            alt = os.path.join(raw, f"{twin}.mp3") if twin else None
            if alt and os.path.exists(alt):
                path = alt
            else:
                sys.exit(f"missing recording for [{line['shot']}]: {path}")
        x = trim(read_pcm(path))
        who = line.get("who", "me")
        # `speed` on a line bends that one line further: the hush, hush, hush that opens and closes the film is
        # rattled off twice as fast as it was recorded, because in the meme it is one nervous sound, not a sentence.
        speed = float(line.get("speed", 1.0))
        x = resample(x, VOICE.get(who, 1.0) * speed) * (10 ** (GAIN.get(who, 0.0) / 20))
        # Every line at the same level. The recordings arrive at different loudnesses (one whispered, one shouted
        # over music); without this the quiet ones sit under the music and the loud ones push the limiter.
        loud = x[np.abs(x) > (np.max(np.abs(x)) * 0.08)]
        rms = float(np.sqrt((loud ** 2).mean())) if loud.size else 0.0
        if rms > 1e-4:
            x = x * min(3.0, 0.14 / rms)
        # a short ramp at both ends so a placed clip never clicks
        edge = min(int(0.012 * SR), x.size // 4)
        if edge > 0:
            x[:edge] *= np.linspace(0, 1, edge, dtype=np.float32)
            x[-edge:] *= np.linspace(1, 0, edge, dtype=np.float32)
        if line.get("at") == "end":
            # anchor the words to the cut: the last word lands just before the picture changes, so a line's
            # cue never contains a silent tail for the music to swell into
            shot_end = cue_end[line["shot"]]
            line["start"] = round(max(0.0, shot_end - x.size / SR - 0.02), 4)
        at = int(round(line["start"] * SR))
        if at + x.size > track.size:
            track = np.concatenate([track, np.zeros(at + x.size - track.size + SR, dtype=np.float32)])
        track[at : at + x.size] += x
        placed += 1

        # the words of that line, spread over it: one word on screen at a time
        caption = line.get("caption") or line["text"]
        tokens = caption.split()
        weights = word_weights(caption)
        span = x.size / SR
        unit = span / sum(weights)
        cursor = line["start"] if line["start"] is not None else line["start"]
        for token, weight in zip(tokens, weights):
            words.append({"w": token, "s": round(cursor, 3), "e": round(cursor + unit * weight, 3)})
            cursor += unit * weight
    print(f"  {placed} line(s), {len(words)} caption word(s)")

    if write_voice:
        os.makedirs(audio_dir, exist_ok=True)
        # Normalise, then squeeze the peaks. A dialogue film is mostly silence, so the mix is lifted a long way
        # to reach the loudness target and every peak in the voice rides up with it; a soft knee here means the
        # limiter in scripts/sound.py has nothing left to take off. Same words, same timing, flatter dynamics.
        # Level the voice hard, like a phone video: peak-normalise, then push it into a soft ceiling so the peaks
        # are squashed and the average comes up with them. A dialogue film is mostly silence, so the mix is lifted
        # a long way to reach the loudness target and every peak would ride up with it; after this there is almost
        # nothing for scripts/sound.py's limiter to take off. It also suits the format: a meme is loud.
        peak = float(np.max(np.abs(track))) or 1.0
        x = track / peak
        k = 2.6
        track = np.tanh(x * k) / np.tanh(k)
        # Pull the top off. A phone speaker has no air in it, and the "as heard" level scripts/sound.py measures
        # is weighted towards the highs: a drier voice gives that limiter less to fight without losing a word.
        a = np.exp(-2 * np.pi * 3200 / SR)
        low = np.empty_like(track)
        acc = 0.0
        for i in range(track.size):
            acc = a * acc + (1 - a) * track[i]
            low[i] = acc
        track = low + (track - low) * 0.55
        track = track * (0.62 / (float(np.max(np.abs(track))) or 1.0))
        wav = os.path.join(audio_dir, "narration.wav")
        pcm = np.clip(track * 32767.0, -32768, 32767).astype("<i2")
        import wave

        with wave.open(wav, "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes(pcm.tobytes())
        mp3 = os.path.join(audio_dir, "narration.mp3")
        subprocess.run([FFMPEG, "-y", "-v", "error", "-i", wav, "-b:a", "320k", mp3], check=True)
        os.remove(wav)
        print(f"  wrote {os.path.relpath(mp3, ROOT)}")

    timing = {
        "film": film,
        "fps": fps,
        "duration": round(total, 4),
        "estimated": False,
        "note": "Written by scripts/dialogue-timing.py from lines.json. The picture is the clock; the voice sits inside it.",
        "audio": f"audio/{film}/narration.mp3",
        "cues": cues,
        "words": words,
    }
    out = os.path.join(folder, "timing.json")
    with open(out, "w", encoding="utf8") as f:
        json.dump(timing, f, indent=1)
        f.write("\n")
    print(f"  wrote {os.path.relpath(out, ROOT)}: {len(cues)} cues, {len(words)} words, {total:.2f}s")
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("usage: python3 scripts/dialogue-timing.py <film>")
    sys.exit(main(sys.argv[1], write_voice="--no-voice" not in sys.argv))

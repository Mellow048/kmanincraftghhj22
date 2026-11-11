#!/usr/bin/env python3
"""Procedural, original 20-second sound bed for the Broken Egg reference.

Only Python's standard library is needed. Produce an intermediate WAV in out/:
  python3 Topics/InThisTown/reference\#1/audio/make-bed.py out/monster-egg-bed.wav
  node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg -y -i out/monster-egg-bed.wav \
    -codec:a libmp3lame -b:a 128k public/audio/in-this-town-monster-egg/bed.mp3

The film mixes this quiet track with individually timed spoken clips. Fixed seed
and sample rate give every future agent the same base audio without sound packs.
"""
from array import array
import math
import random
import sys
import wave
from pathlib import Path

SAMPLE_RATE = 44100
SECONDS = 20
TAU = 2 * math.pi


def envelope(t: float, start: float, end: float, attack: float, release: float) -> float:
    if t < start or t > end:
        return 0.0
    return min(1.0, (t - start) / attack, (end - t) / release)


def chime(t: float, start: float, freq: float, amp: float) -> float:
    dt = t - start
    if dt < 0 or dt > 1.6:
        return 0.0
    fade = (1 - math.exp(-dt * 32)) * math.exp(-dt * 2.7)
    return amp * fade * (math.sin(TAU * freq * dt) + 0.35 * math.sin(TAU * freq * 2.003 * dt))


def make(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    rng = random.Random(20261111)
    samples = array("h")
    fire_lp = 0.0
    wind_lp = 0.0

    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        for i in range(SECONDS * SAMPLE_RATE):
            t = i / SAMPLE_RATE
            # An unobtrusive minor ostinato makes way for two warm intervals.
            if t < 7.3:
                root, third, fifth, amount = (110.0, 130.81, 164.81, 0.65)
            elif t < 11.4:
                root, third, fifth, amount = (98.0, 146.83, 196.0, 0.72)
            elif t < 16:
                root, third, fifth, amount = (130.81, 174.61, 261.63, 0.88)
            else:
                root, third, fifth, amount = (130.81, 196.0, 261.63, 1.0)
            # Gentle, imperfect oscillation instead of a recorded synth preset.
            swell = (0.8 + 0.18 * math.sin(t * 2.1)) * amount
            drone = 0.037 * swell * (
                math.sin(TAU * root * t) * 0.65
                + math.sin(TAU * third * t + 0.37) * 0.24
                + math.sin(TAU * fifth * t - 0.52) * 0.18
            )
            airy = 0.008 * math.sin(TAU * (root * 2.002) * t + 0.27 * math.sin(TAU * 0.22 * t))

            # Three tiny confirmations of the creature's earned growth.
            bells = (
                chime(t, 12.45, 392.0, 0.037)
                + chime(t, 15.13, 523.25, 0.049)
                + chime(t, 16.68, 659.25, 0.057)
            )
            # Shell cracks audibly; two dragon blasts have different weights.
            burst1 = envelope(t, 11.0, 13.45, 0.16, 0.4)
            burst2 = envelope(t, 13.55, 15.5, 0.22, 0.43)
            crack = envelope(t, 3.72, 3.9, 0.008, 0.12)
            noise = rng.uniform(-1.0, 1.0)
            fire_lp += (noise - fire_lp) * 0.06
            wind_lp += (noise - wind_lp) * 0.003
            fire = (0.091 * burst1 + 0.124 * burst2) * fire_lp
            shell = crack * (0.039 * noise + 0.06 * math.sin(TAU * 232.0 * (t - 3.72)))
            air = 0.036 * wind_lp
            # Soft footsteps establish the passage from the street to class.
            steps = 0.0
            for strike in (7.62, 8.05, 8.54, 8.95, 9.39, 9.82, 10.28):
                dt = t - strike
                if 0 <= dt < 0.18:
                    steps += 0.075 * math.exp(-dt * 24) * math.sin(TAU * 69 * dt)
            scene = drone + airy + bells + air + fire + shell + steps
            # Widen the bed without moving a single spoken line off centre.
            spread = 0.012 * math.sin(TAU * (root / 2) * t + 0.22)
            end = min(1, max(0, (20 - t) / 0.5))
            left = max(-0.99, min(0.99, end * (scene + spread)))
            right = max(-0.99, min(0.99, end * (scene - spread)))
            samples.extend((int(left * 32767), int(right * 32767)))
            if i % (SAMPLE_RATE * 2) == 0 and i:
                wav.writeframes(samples.tobytes())
                samples = array("h")
        if samples:
            wav.writeframes(samples.tobytes())

    print(f"Created {path} ({SECONDS}s, stereo, {SAMPLE_RATE}Hz)")


if __name__ == "__main__":
    make(Path(sys.argv[1] if len(sys.argv) > 1 else "out/monster-egg-bed.wav"))

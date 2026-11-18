#!/usr/bin/env python3
"""Build the original short score, synchronized foley and word sidecar.

Requires numpy and FFmpeg on PATH (or --ffmpeg /path/to/ffmpeg). No external
sound assets. Run from any directory. Each sample is placed from edit.json;
word offsets are mapped through the very same trims/tempo as the dialogue.
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess as sp
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
EDIT = json.loads((HERE / "edit.json").read_text())
SR = 48000
FPS = EDIT["fps"]
SAMPLES = round(EDIT["frames"] * SR / FPS)
REPS = EDIT["reps"]
CUT = EDIT["cuts"]
MISS = REPS["trial"][-1] + EDIT["firstFlight"]
WIN = REPS["retry"][-1] + EDIT["retryFlight"]
TUG = EDIT["tug"]
RNG = np.random.default_rng(20261118)


def clock(seconds: float) -> np.ndarray:
    return np.arange(round(seconds * SR), dtype=np.float64) / SR


def sample(frames: float) -> int:
    return round(frames * SR / FPS)


def band_noise(seconds: float, lo: float, hi: float) -> np.ndarray:
    n = max(1, round(seconds * SR))
    freqs = np.fft.rfftfreq(n, 1 / SR)
    filt = 1 / np.sqrt((1 + (lo / np.maximum(freqs, 1)) ** 6) * (1 + (freqs / hi) ** 6))
    filt[0] = 0
    s = np.fft.irfft(np.fft.rfft(RNG.standard_normal(n)) * filt, n=n)
    return s / max(1e-5, np.std(s)) * .3


def env(t: np.ndarray, attack: float, decay: float) -> np.ndarray:
    return np.minimum(t / attack, 1) * np.exp(-t / decay)


def pluck(midi: float, seconds: float, decay: float = .128, bright: float = .33) -> np.ndarray:
    t = clock(seconds)
    p = 2 * np.pi * 440 * 2 ** ((midi - 69) / 12) * t
    overtones = .27 * np.sin(2 * p + .36) + .15 * np.sin(3 * p) + .052 * np.sin(5 * p)
    return (np.sin(p) + bright * overtones) * env(t, .008, decay) * .72


def sweep(seconds: float, a: float, b: float, decay: float, strike: float = .003) -> np.ndarray:
    t = clock(seconds)
    phase = 2 * np.pi * (a * t + (b - a) / (2 * seconds) * t ** 2)
    return np.sin(phase) * env(t, strike, decay)


def taper(x: np.ndarray, start: float = .004, end: float = .022) -> np.ndarray:
    x = x.copy()
    ka = min(len(x), round(start * SR))
    kb = min(len(x), round(end * SR))
    if ka:
        x[:ka] *= np.linspace(0, 1, ka).reshape((-1,) + (1,) * (x.ndim - 1))
    if kb:
        x[-kb:] *= np.linspace(1, 0, kb).reshape((-1,) + (1,) * (x.ndim - 1))
    return x


class Mix:
    def __init__(self, ffmpeg: str):
        self.ffmpeg = ffmpeg
        self.score = np.zeros((SAMPLES, 2))
        self.foley = np.zeros_like(self.score)
        self.dialogue = np.zeros_like(self.score)
        self.words: list[dict] = []

    def audio(self, name: str) -> np.ndarray:
        return np.frombuffer(sp.check_output([
            self.ffmpeg, "-v", "error", "-i", str(HERE / "recordings" / f"{name}.wav"),
            "-af", "highpass=f=96,lowpass=f=11700", "-ac", "1", "-ar", str(SR), "-f", "f32le", "-",
        ]), dtype="<f4")

    def tempo(self, x: np.ndarray, speed: float, n: int) -> np.ndarray:
        # Pad before atempo to preserve WSOLA's final partial block. Remove
        # the pad, keeping the edit/caption mapping anchored to the input trim.
        data = np.pad(x, (0, round(.083 * SR))).astype("<f4").tobytes()
        y = np.frombuffer(sp.check_output([
            self.ffmpeg, "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
            "-af", f"atempo={speed:.9f}", "-f", "f32le", "-",
        ], input=data), dtype="<f4")
        return taper(np.pad(y[:n], (0, max(0, n - len(y)))), .004, .013)

    @staticmethod
    def add(lane: np.ndarray, f: float, x: np.ndarray, gain: float, pan: float = 0.) -> None:
        k = sample(f)
        n = min(len(x), SAMPLES - k)
        if n > 0:
            a = (pan + 1) * np.pi / 4
            lane[k:k + n] += taper(x[:n])[:, None] * gain * np.array([np.cos(a), np.sin(a)])[None, :]

    def effect(self, f: float, x: np.ndarray, gain: float, pan: float = 0.) -> None:
        self.add(self.foley, f, x, gain, pan)

    def note(self, f: float, pitch: float, seconds: float, gain: float, pan: float = 0., decay: float = .133) -> None:
        self.add(self.score, f, pluck(pitch, seconds, decay), gain, pan)

    def speech(self) -> None:
        for line in EDIT["voice"]:
            waveform = self.audio(line["file"])
            at = sample(line["at"])
            for a, b in line["regions"]:
                n = round((b - a) * SR / line["tempo"])
                y = self.tempo(waveform[round(a * SR):round(b * SR)], line["tempo"], n)
                self.add(self.dialogue, at * FPS / SR, y, .53 / max(.08, np.max(np.abs(y))), -.04)
                for word, start, end in line["words"]:
                    if a <= start < end <= b:
                        self.words.append({"w": word, "s": round(at / SR + (start - a) / line["tempo"], 4),
                                           "e": round(at / SR + (end - a) / line["tempo"], 4)})
                at += n + round(line["gap"] * SR)
        assert len(self.words) == sum(len(line["words"]) for line in EDIT["voice"])

    def breaths(self) -> None:
        raw = self.audio("huss")
        order = [1, 0, 4, 2, 4, 1, 3, 0, 5, 2, 1, 3, 4, 2, 5]
        frames = [r for group in REPS.values() for r in group]
        assert len(frames) == len(order) and frames == sorted(set(frames))
        for i, (at, take) in enumerate(zip(frames, order)):
            a, b = EDIT["breathRegions"][take]
            x = raw[round(a * SR):round(b * SR)]
            # Detect the intake/syllable edge instead of starting a padded clip
            # on the rep. Leave 4 ms of lead so the consonant stays intact.
            k = 240
            rms = np.sqrt(np.mean(x[:len(x) // k * k].reshape(-1, k) ** 2, axis=1))
            audible = np.flatnonzero(rms > max(.002, .06 * np.max(rms)))
            x = x[max(0, audible[0] * k - 192):min(len(x), (audible[-1] + 2) * k)]
            duration = .295 + (i % 3) * .019
            y = self.tempo(x, len(x) / (duration * SR), round(duration * SR))
            pan = (-.20, -.08, .04, .00, .06)[i // 3]
            self.effect(at, y, (.27 + .014 * (i % 3)) / max(.08, np.max(np.abs(y))), pan)

    def music(self) -> None:
        # A little original D minor training motif. Bass, rim, and a dry pluck.
        def run(start: int, end: int, step: float, tones: list[int], bass: list[int], energy: float) -> None:
            for i, at in enumerate(np.arange(start, end, step)):
                self.note(at, tones[i % len(tones)], .31, .074 * energy, .17 if i % 2 else -.12, .106)
                if i % 2 == 0:
                    self.note(at, bass[(i // 2) % len(bass)], .39, .124 * energy, 0, .171)
                    self.add(self.score, at, sweep(.14, 115, 37, .042), .105 * energy)
                else:
                    self.add(self.score, at, band_noise(.083, 720, 5050) * env(clock(.083), .0015, .032), .145 * energy, -.13)
                self.add(self.score, at + step * .60, band_noise(.056, 3900, 8900) * env(clock(.056), .002, .017), .058 * energy, .25)

        run(2, 35, 13, [62, 65, 69], [38, 41], .88)
        run(41, 86, 13, [64, 67, 69, 65], [38, 45], .46)
        self.note(89, 50, .26, .081, -.25)
        self.note(104, 55, .31, .090, .18)
        run(119, 176, 16, [65, 69, 72, 67], [41, 43, 38], .93)
        run(176, 277, 11.5, [62, 65, 69, 77, 65, 69, 74, 77], [38, 38, 43, 45], .81)
        # Smash into silence at the forehead, not a blanket fade over the line.
        self.score[sample(MISS) - 176:sample(MISS)] *= np.linspace(1, 0, 176)[:, None]
        self.score[sample(MISS):sample(CUT["drills"])] = 0
        run(341, 444, 11.5, [62, 62, 65, 69, 74, 69, 77, 74], [38, 41, 43, 45], 1.21)
        run(448, 510, 11.5, [66, 69, 74, 78, 69, 76], [38, 45, 47], 1.03)
        for i, m in enumerate([74, 78, 81, 86]):
            self.note(WIN + i * 3.2, m, .26, .105, i * .13 - .25)
        self.score[sample(TUG) - 208:sample(TUG)] *= np.linspace(1, 0, 208)[:, None]
        self.score[sample(TUG):] = 0

    def actions(self) -> None:
        def click(f: float, gain: float, pan: float) -> None:
            n = band_noise(.035, 1200, 9800) * env(clock(.035), .00065, .0085)
            self.effect(f, n + .21 * sweep(.035, 2100, 1100, .008), gain, pan)

        for i, at in enumerate(REPS["mouse"]):
            click(at + 1.5, .33, -.28 + i * .07)
            self.effect(at + 3, .65 * pluck(84 + i * 2, .09, .028), .13, .17)
        for at in (80, 95, 108, 169, 181, 194, 204):
            self.effect(at, .54 * sweep(.138, 183, 63, .046) + .45 * band_noise(.138, 155, 780) * env(clock(.138), .008, .040), .105, -.1)
        for i, at in enumerate(REPS["wipe"]):
            t = clock(.31)
            wet = band_noise(.31, 475 + 105 * i, 3600) * env(t, .038, .105) * (1 + .29 * np.sin(t * 183))
            self.effect(at + .6, wet + .22 * sweep(.31, 442, 185, .077, .03), .245, .12)
            self.effect(at + 6, pluck(76 + 2 * i, .125, .048), .054, .21)
        for rounds, delay in ((REPS["trial"], EDIT["firstFlight"]), (REPS["retry"], EDIT["retryFlight"])):
            for i, at in enumerate(rounds):
                self.effect(at + 1, band_noise(.180, 910, 5700) * env(clock(.18), .029, .058), .13, .17)
                if at + delay == MISS:
                    continue
                snap = .78 * sweep(.135, 505 + 60 * i, 168, .029) + .26 * band_noise(.135, 980, 6400) * env(clock(.135), .001, .040)
                self.effect(at + delay, snap, .23, .055)
                self.effect(at + delay + 1.2, pluck(79 + i * 3, .207, .059), .166, .23)
        bonk = .65 * sweep(.204, 283, 102, .064) + .45 * sweep(.204, 729, 312, .019) + .8 * band_noise(.204, 130, 2300) * env(clock(.204), .0007, .039)
        self.effect(MISS, bonk, .555, .085)
        self.effect(MISS + 7.8, sweep(.138, 810, 604, .038, .006), .061, .47)

        click(CUT["drills"], .45, .08)
        self.effect(CUT["drills"], sweep(.182, 207, 72, .056) + band_noise(.182, 630, 4850) * env(clock(.182), .004, .051), .22)
        for i, at in enumerate(REPS["drill"]):
            self.effect(at + 1.2, sweep(.22, 114 + i * 12, 56, .067) + .20 * band_noise(.22, 280, 1750) * env(clock(.22), .009, .053), .174, .04)
        # Paper pushes off, bird makes three back-hops with the whole thing.
        t = clock(.37)
        paper = band_noise(.37, 248, 3850) * env(t, .020, .128) * (.8 + .23 * np.sin(t * 144))
        self.effect(TUG, paper, .50, .38)
        for i, at in enumerate((527, 546, 565)):
            t = clock(.182 if i == 0 else .135)
            dur = len(t) / SR
            cluck = .55 * sweep(dur, 765 - 80 * i, 369 - 38 * i, .043, .009) + .25 * sweep(dur, 1325 - i * 110, 801 - i * 89, .032, .010)
            cluck += .37 * band_noise(dur, 630, 3010) * env(t, .011, .051)
            self.effect(at, cluck, .26, .41)
        for i, at in enumerate((546, 563, 578)):
            self.effect(at, sweep(.163, 198 - i * 13, 71, .038) * .69 + band_noise(.163, 266, 7600) * env(clock(.163), .002, .030), .20 - i * .032, .46)
        for i, at in enumerate((549, 556, 560)):
            click(at, .11, .35 + .03 * i)
        self.effect(580, sweep(.20, 612, 468, .072, .009), .102, .41)

    def write(self, dest: Path) -> None:
        duration = SAMPLES / SR
        self.speech()
        self.breaths()
        self.music()
        self.actions()
        self.effect(0, band_noise(duration, 92, 382), .027, -.24)
        self.effect(0, band_noise(duration, 150, 648), .019, .23)
        # A little room around the voices without smearing the consonants.
        early = np.roll(self.dialogue[:, ::-1], round(.029 * SR), axis=0) * .107
        y = self.score + self.foley + self.dialogue + early
        y = taper(.905 * np.tanh(3.34 * y), .007, .105)
        cap = 10 ** (-1.6 / 20)
        y *= min(1., cap / np.max(np.abs(y)))
        dest.parent.mkdir(parents=True, exist_ok=True)
        temp = dest.with_name(f"{dest.stem}.tmp{dest.suffix}")
        sp.run([self.ffmpeg, "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-",
                "-codec:a", "libmp3lame", "-b:a", "256k", str(temp)], input=y.astype("<f4").tobytes(), check=True)
        temp.replace(dest)
        (HERE / "captions.json").write_text(json.dumps(self.words, indent=2) + "\n")
        windows = self.dialogue.reshape(EDIT["frames"], sample(1), 2)
        rms = np.sqrt(np.mean(windows ** 2, axis=(1, 2)))
        meter = np.minimum(.46, np.maximum(0, 2.75 * np.convolve(rms, [.22, .60, .18], "same") - .033))
        (HERE / "coach-meter.json").write_text(json.dumps(np.round(meter, 3).tolist(), separators=(",", ":")) + "\n")
        print(f"{dest}: {duration:.3f} seconds; {len(self.words)} aligned words, 15 breaths; peak {20*np.log10(np.max(np.abs(y))):.1f} dBFS")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ffmpeg", default=shutil.which("ffmpeg"))
    args = parser.parse_args()
    if not args.ffmpeg:
        parser.error("FFmpeg is required (use --ffmpeg if it is not on PATH)")
    dest = HERE.parents[2] / "public" / "audio" / HERE.name / "mix.mp3"
    Mix(args.ffmpeg).write(dest)


if __name__ == "__main__":
    main()

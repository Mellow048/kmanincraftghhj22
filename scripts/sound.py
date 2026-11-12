#!/usr/bin/env python3
"""
sound.py — the music and the sound effects, made in Python, cut to the voice.

Nothing here is downloaded or sampled. Every note and every noise is computed
with numpy, from a seed, so the same sheet always gives the same track, there is
no licence to check, and a new film never has to build its sound from nothing.

    python3 scripts/sound.py list                 every effect, bed and mood, with one line on each
    python3 scripts/sound.py draft <film>         write a first sound.json from the film's scenes
    python3 scripts/sound.py build <film>         sound.json + narration.mp3  ->  mix.mp3
    python3 scripts/sound.py check <film>         measure the mix again without rebuilding it
    python3 scripts/sound.py demo                 every sound, one after another, for a human to hear

What goes in, per film:

    src/videos/<film>/timing.json        when every word and shot starts (scripts/narration.py)
    src/videos/<film>/sound.json         THE SOUND SHEET: which music, which effect, on which word
    public/audio/<film>/narration.mp3    the voice

What comes out:

    public/audio/<film>/mix.mp3          voice + music + beds + effects. film.tsx plays this file
    src/videos/<film>/sound.lock.json    what the mix was built from; `npm run check` reads it
    out/sound/<film>/timeline.png        the mix as a picture: look at it, since an agent cannot listen
    out/sound/<film>/*.wav               the stems, with --stems

The sheet names times the way the scenes do: by cue and by word, never in
seconds. Rebuild the narration and one `build` moves every sound with it.

    { "cue": "3.hmm", "word": "hmm", "sfx": "pop" }            on the word "hmm" of shot 3.hmm
    { "cue": "8.under", "sfx": "whoosh" }                      on the cut into 8.under
    { "cue": "7.walk", "at": 0.2, "sfx": "step_grass", "repeat": 4, "every": 0.3 }
    { "cue": "13.burn", "sfx": "riser", "dur": 1.6 }           a riser ENDS on its time
    { "cue": "5.stare", "p": 0.5, "sfx": "tick", "trim": -4, "pan": -0.4 }    halfway through, 4 dB quieter, to the left

Every level is in dB AGAINST THE VOICE, as a phone speaker plays it: 0 is as loud as the
voice, -10 is clear, under -18 nobody hears it. `build` measures the result and prints it,
because whoever runs this may not be able to listen. The guide for a topic's films is in
the topic's folder (Topics/InThisTown/SOUND.md).

Needs Python 3.9+, numpy, and ffmpeg (system ffmpeg, or `pip install imageio-ffmpeg`).
`pip install pillow` adds the timeline picture. Rendering a film needs none of this:
the mix is a committed file.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import re
import shutil
import subprocess
import sys

try:
    import numpy as np
except ImportError:  # pragma: no cover
    sys.exit("sound.py needs numpy:  pip install numpy")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
VERSION = 1


# ============================================================================= small maths
def n_of(seconds: float) -> int:
    return max(1, int(round(seconds * SR)))


def t_of(n: int):
    return np.arange(n) / SR


def db(x: float) -> float:
    """Decibels to a gain."""
    return 10.0 ** (x / 20.0)


def to_db(x: float) -> float:
    return 20.0 * math.log10(max(float(x), 1e-12))


def rng_for(*keys) -> np.random.Generator:
    """A random generator that depends only on its keys: same sheet, same sound."""
    seed = int(hashlib.sha1("|".join(str(k) for k in keys).encode()).hexdigest()[:12], 16)
    return np.random.default_rng(seed)


_NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}


def hz(note) -> float:
    """'A4' -> 440.0. Also takes a MIDI number."""
    if isinstance(note, (int, float)):
        return 440.0 * 2.0 ** ((note - 69) / 12.0)
    m = re.fullmatch(r"([A-G])([#b]?)(-?\d)", note)
    if not m:
        raise ValueError(f"not a note: {note!r}")
    semis = _NOTE[m.group(1)] + {"#": 1, "b": -1, "": 0}[m.group(2)] + 12 * (int(m.group(3)) + 1)
    return 440.0 * 2.0 ** ((semis - 69) / 12.0)


def norm(y, peak: float = 1.0):
    """Scale so the loudest sample is `peak`."""
    top = float(np.max(np.abs(y))) if len(y) else 0.0
    return y if top < 1e-9 else y * (peak / top)


def edges(y, fade_in: float = 0.002, fade_out: float = 0.008):
    """Ramp both ends so nothing starts or stops with a click."""
    y = np.array(y, dtype=float, copy=True)
    a = min(len(y), n_of(fade_in))
    b = min(len(y), n_of(fade_out))
    ramp_in = np.linspace(0.0, 1.0, a)
    ramp_out = np.linspace(1.0, 0.0, b)
    if y.ndim == 2:
        ramp_in, ramp_out = ramp_in[:, None], ramp_out[:, None]
    y[:a] *= ramp_in
    y[-b:] *= ramp_out
    return y


def decay(n: int, tau: float):
    return np.exp(-t_of(n) / tau)


def bell(n: int, power: float = 2.0):
    """0 → 1 → 0: the shape of something passing by."""
    return np.sin(np.pi * np.linspace(0.0, 1.0, n)) ** power


def tone(freq, n: int | None = None, phase: float = 0.0):
    """A sine. `freq` is a number of Hz, or an array of Hz (one per sample) for a glide."""
    if np.isscalar(freq):
        return np.sin(2 * np.pi * float(freq) * t_of(n) + phase)
    return np.sin(2 * np.pi * np.cumsum(np.asarray(freq, dtype=float)) / SR + phase)


def fast_len(n: int) -> int:
    """The next length numpy's FFT is quick at: one with no factor but 2, 3 and 5. An awkward length is 20 times slower."""
    best = 1 << max(1, (n - 1).bit_length())
    p5 = 1
    while p5 < best:
        p35 = p5
        while p35 < best:
            x = p35
            while x < n:
                x *= 2
            best = min(best, x)
            p35 *= 3
        p5 *= 5
    return best


def shape(y, gain_of):
    """Multiply the spectrum of `y` by `gain_of(frequencies)`. Mono or stereo; same length out."""
    n = len(y)
    size = fast_len(n)
    g = gain_of(np.fft.rfftfreq(size, 1.0 / SR))
    if y.ndim == 2:
        return np.stack([np.fft.irfft(np.fft.rfft(y[:, c], size) * g, size)[:n] for c in range(y.shape[1])], axis=1)
    return np.fft.irfft(np.fft.rfft(y, size) * g, size)[:n]


def _band_gain(f, lo, hi, order: int = 4):
    g = np.ones_like(f)
    safe = np.maximum(f, 1e-6)
    if lo:
        g = g / np.sqrt(1.0 + (lo / safe) ** (2 * order))
    if hi:
        g = g / np.sqrt(1.0 + (f / hi) ** (2 * order))
    return g


def filt(y, lo: float | None = None, hi: float | None = None, order: int = 4):
    """Keep lo..hi Hz. Zero phase, done on the whole signal at once. Mono or stereo."""
    return shape(y, lambda f: _band_gain(f, lo, hi, order))


def noise(n: int, lo: float, hi: float, rng, tilt: float = 0.0):
    """Noise between lo and hi Hz, loudest sample 1. `tilt` in dB per octave: negative is darker."""
    size = fast_len(max(n, 16))
    spectrum = np.fft.rfft(rng.standard_normal(size))
    f = np.fft.rfftfreq(size, 1.0 / SR)
    g = _band_gain(f, lo, hi)
    if tilt:
        g = g * (np.maximum(f, 20.0) / 1000.0) ** (tilt / 6.02)
    return norm(np.fft.irfft(spectrum * g, size)[:n])


def sweep(n: int, centre, rng, width: float = 0.7, bands: int = 26):
    """Noise whose pitch moves: `centre` is Hz per sample. Used for whooshes and risers."""
    size = fast_len(n)
    spectrum = np.fft.rfft(rng.standard_normal(size))
    f = np.fft.rfftfreq(size, 1.0 / SR)
    centres = np.geomspace(70.0, 13000.0, bands)
    half = (np.log2(13000.0 / 70.0) / (bands - 1)) / 2
    where = np.log2(np.maximum(np.asarray(centre, dtype=float), 20.0))
    out = np.zeros(n)
    for c in centres:
        weight = np.exp(-0.5 * ((where - np.log2(c)) / width) ** 2)
        if weight.max() < 1e-3:
            continue
        # Each band is as wide as its pitch, so without this the top bands would drown the rest in hiss.
        out += np.fft.irfft(spectrum * _band_gain(f, c * 2 ** -half, c * 2**half, 3), size)[:n] * weight / math.sqrt(c)
    return norm(out)


def partials(freq: float, seconds: float, table, attack: float = 0.003, hold: float | None = None):
    """
    A struck or plucked note as a sum of sines. `table` rows are (ratio, level, seconds to fade).
    `hold` damps the note after that many seconds, the way a finger stops a string.
    """
    n = n_of(seconds)
    t = t_of(n)
    y = np.zeros(n)
    for ratio, level, tau in table:
        f = freq * ratio
        if f < SR * 0.45:
            y += level * np.sin(2 * np.pi * f * t) * np.exp(-t / tau)
    if hold is not None and hold < seconds:
        y *= np.where(t > hold, np.exp(-(t - hold) / 0.035), 1.0)
    return edges(y, attack, 0.012)


def place(buf, y, at: float, gain: float = 1.0, pan: float = 0.0):
    """Add `y` (mono or stereo) into the stereo canvas `buf` at `at` seconds. pan: -1 left … 1 right."""
    i = int(round(at * SR))
    if y.ndim == 1:
        angle = (np.clip(pan, -1, 1) + 1) * np.pi / 4
        y = np.stack([y * np.cos(angle), y * np.sin(angle)], axis=1) * math.sqrt(2.0)
    elif pan:
        y = y * np.array([min(1.0, 1 - pan), min(1.0, 1 + pan)])
    if i < 0:
        y, i = y[-i:], 0
    j = min(len(buf), i + len(y))
    if j > i:
        buf[i:j] += y[: j - i] * gain


def convolve(x, ir):
    n = len(x) + len(ir) - 1
    size = fast_len(n)
    return np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[:n]


def reverb(buf, rt60: float = 1.0, wet: float = 0.2, lo: float = 300, hi: float = 6000, seed: int = 7, predelay: float = 0.015):
    """A room: the same sound again, smeared and fading. Stereo in, stereo out, same length."""
    rng = np.random.default_rng(seed)
    n = n_of(rt60 * 1.15)
    t = t_of(n)
    out = buf.copy()
    mid = buf.mean(axis=1)
    d = n_of(predelay)
    for ch in (0, 1):
        ir = filt(rng.standard_normal(n) * np.exp(-6.91 * t / rt60), lo, hi)
        ir /= math.sqrt(float(np.sum(ir**2)))
        tail = convolve(0.5 * (buf[:, ch] + mid), ir)
        out[d:, ch] += wet * tail[: len(buf) - d]
    return out


def tilt_eq(buf, centre: float, gain_db: float, width: float = 0.8):
    """One gentle bump or dip, `width` octaves wide. Used to leave room for the voice."""
    return shape(buf, lambda f: 1.0 + (db(gain_db) - 1.0) * np.exp(-0.5 * ((np.log2(np.maximum(f, 1.0)) - math.log2(centre)) / width) ** 2))


def limit(buf, ceiling_db: float = -1.5, lookahead: float = 0.006, release: float = 0.12):
    """
    Look-ahead limiter: the gain comes down a few milliseconds before a peak arrives and goes
    back up slowly after it, so nothing clips and nothing crackles. Returns the limited signal
    and the gain it used, one value per millisecond.
    """
    block = n_of(0.001)
    k = int(math.ceil(len(buf) / block))
    peak = np.max(np.abs(buf), axis=1)
    peak = np.concatenate([peak, np.zeros(k * block - len(peak))]).reshape(k, block).max(axis=1)
    need = np.minimum(1.0, db(ceiling_db) / np.maximum(peak, 1e-9))
    ahead, behind = int(round(lookahead / 0.001)), 2
    low = need.copy()
    for shift in range(1, ahead + 1):
        low[:-shift] = np.minimum(low[:-shift], need[shift:])
    for shift in range(1, behind + 1):
        low[shift:] = np.minimum(low[shift:], need[:-shift])
    box = 2 * behind + 1
    c = np.cumsum(np.concatenate([[0.0], np.full(behind, low[0]), low, np.full(behind, low[-1])]))
    smooth = (c[box:] - c[:-box]) / box
    alpha = 1.0 - math.exp(-0.001 / release)
    gain = np.empty(k)
    g = 1.0
    for i, floor in enumerate(smooth.tolist()):
        g = min(floor, g + (1.0 - g) * alpha)
        gain[i] = g
    per_sample = np.interp(np.arange(len(buf)), (np.arange(k) + 0.5) * block, gain)
    top = db(ceiling_db)
    return np.clip(buf * per_sample[:, None], -top, top), gain


def heard(y):
    """
    The signal as a phone plays it and an ear notices it: almost nothing below 200 Hz, a little
    more above 2 kHz. Every level in this tool is measured through this, so "12 dB under the
    voice" means under the voice on the speaker the film will be watched on. Mono out.
    """
    def phone(f):
        safe = np.maximum(f, 1e-6)
        g = 1.0 / np.sqrt(1.0 + (200.0 / safe) ** 4)
        g = g * (1.0 + (db(3.0) - 1.0) / (1.0 + (2000.0 / safe) ** 2))
        return g / np.sqrt(1.0 + (f / 10000.0) ** 8)

    return shape(y.mean(axis=1) if y.ndim == 2 else y, phone)


def loudest(weighted, window: float = 0.1):
    """(level, start sample) of the loudest `window` seconds. A sound shorter than the window counts as quieter, as it is to an ear."""
    w = min(len(weighted), n_of(window))
    c = np.concatenate([[0.0], np.cumsum(weighted**2)])
    energy = c[w:] - c[:-w]
    i = int(np.argmax(energy))
    return math.sqrt(max(float(energy[i]), 0.0) / n_of(window)), i


def window_level(csum, a: int, b: int) -> float:
    """RMS between samples a and b, from a running sum of squares."""
    a, b = max(0, a), min(len(csum) - 1, b)
    return math.sqrt(max(float(csum[b] - csum[a]), 0.0) / max(1, b - a)) if b > a else 0.0


def harmonics(y, amount: float = 0.4, lo: float = 160.0, hi: float = 1400.0):
    """Give a low sound some overtones, so a phone speaker that cannot play 60 Hz still plays something."""
    return y + amount * filt(np.tanh(4.0 * norm(y)), lo, hi)


def rms_frames(x, hop: float = 0.02):
    """Loudness over time: one RMS value every `hop` seconds."""
    h = n_of(hop)
    mono = x.mean(axis=1) if x.ndim == 2 else x
    k = len(mono) // h
    if k == 0:
        return np.zeros(1)
    return np.sqrt(np.mean(mono[: k * h].reshape(k, h) ** 2, axis=1))


# ============================================================================= instruments
# Each takes (frequency in Hz, seconds, velocity 0..1) and returns a mono note.


_CLICKS: dict = {}


def struck(y, amount: float, lo: float = 1800.0, hi: float = 7000.0, tau: float = 0.003):
    """
    Add the click of the mallet, the nail or the hammer to a note. Without it a synthesised note is
    all hum and no edge, and a phone speaker, which plays little under 300 Hz, plays almost nothing.
    """
    key = (lo, hi, tau)
    if key not in _CLICKS:
        n = n_of(tau * 5)
        _CLICKS[key] = noise(n, lo, hi, np.random.default_rng(11)) * decay(n, tau)
    c = _CLICKS[key]
    y = y.copy()
    y[: len(c)] += amount * c[: len(y)]
    return y


def marimba(f, sec, vel=0.8, rng=None):
    tau = float(np.clip(0.42 * (261.6 / f) ** 0.6, 0.12, 0.9))
    y = partials(f, max(sec, tau * 3.2), [(1, 1.0, tau), (4.0, 0.3, tau * 0.25), (9.6, 0.1, tau * 0.1)], attack=0.002)
    return struck(y, 0.3, 1500, 6000) * vel


def kalimba(f, sec, vel=0.8, rng=None):
    tau = float(np.clip(0.55 * (440.0 / f) ** 0.4, 0.2, 0.9))
    y = partials(f, max(sec, tau * 3.2), [(1, 1.0, tau), (2.0, 0.1, tau * 0.5), (5.9, 0.18, tau * 0.14)], attack=0.002)
    return struck(y, 0.22, 2500, 8000, 0.002) * vel


def glock(f, sec, vel=0.8, rng=None):
    tau = float(np.clip(0.8 * (1047.0 / f) ** 0.3, 0.3, 1.4))
    y = partials(f, max(sec, tau * 3.4), [(1, 1.0, tau), (2.756, 0.32, tau * 0.5), (5.404, 0.13, tau * 0.25), (8.933, 0.05, tau * 0.12)], attack=0.0015)
    return struck(y, 0.14, 3000, 10000, 0.002) * vel


def pizz(f, sec, vel=0.8, rng=None):
    """A plucked string, short and woody."""
    tau = float(np.clip(0.36 * (196.0 / f) ** 0.5, 0.09, 0.6))
    rows = []
    for k in range(1, 11):
        level = abs(math.sin(k * math.pi * 0.18)) / k**1.1
        rows.append((k, level, tau / (1 + 0.16 * k * k)))
    y = partials(f, max(sec, tau * 3.0), rows, attack=0.002, hold=max(sec, 0.09))
    return struck(norm(y), 0.16, 1200, 5000, 0.004) * vel


def keys(f, sec, vel=0.8, rng=None):
    """A soft electric piano."""
    tau = float(np.clip(1.3 * (261.6 / f) ** 0.35, 0.5, 2.2))
    n_sec = max(sec + 0.25, min(tau * 2.6, sec + 1.6))
    rows = [(1, 1.0, tau), (2, 0.36, tau * 0.7), (3, 0.18, tau * 0.5), (4, 0.1, tau * 0.35), (5, 0.05, tau * 0.25), (8, 0.06, tau * 0.12)]
    y = partials(f, n_sec, rows, attack=0.004, hold=sec + 0.15)
    y *= 1 + 0.035 * np.sin(2 * np.pi * 4.6 * t_of(len(y)))
    return struck(y, 0.1, 1500, 5000, 0.004) * vel


def bass(f, sec, vel=0.8, rng=None):
    y = partials(f, max(sec, 0.3) + 0.12, [(1, 1.0, 0.34), (2, 0.45, 0.2), (3, 0.18, 0.13), (4, 0.06, 0.1)], attack=0.004, hold=sec)
    return y * vel


def pad(f, sec, vel=0.6, rng=None, attack=0.45, release=0.7):
    """A held, soft chord tone. No edge at all: it fades in and out."""
    n = n_of(sec + release)
    t = t_of(n)
    y = np.zeros(n)
    for cents, phase in ((-5, 0.0), (0, 1.7), (6, 3.1)):
        for k, level in ((1, 1.0), (2, 0.38), (3, 0.15), (4, 0.05)):
            fk = f * k * 2 ** (cents / 1200)
            if fk < SR * 0.45:
                y += level * np.sin(2 * np.pi * fk * t + phase * k)
    env = np.ones(n)
    a, r = n_of(min(attack, sec * 0.5)), n_of(release)
    env[:a] = 0.5 - 0.5 * np.cos(np.pi * np.linspace(0, 1, a))
    env[-r:] = 0.5 + 0.5 * np.cos(np.pi * np.linspace(0, 1, r))
    return norm(y * env) * vel * (1 + 0.06 * np.sin(2 * np.pi * 0.17 * t))


def strings(f, sec, vel=0.6, rng=None, tremolo=13.0, depth=0.45, attack=0.12, release=0.3):
    """Bowed strings, shaking: the sound of something about to happen. tremolo=0 for a plain line."""
    n = n_of(sec + release)
    t = t_of(n)
    y = np.zeros(n)
    for cents, phase in ((-7, 0.3), (7, 2.0)):
        for k in range(1, 9):
            fk = f * k * 2 ** (cents / 1200)
            if fk < SR * 0.45:
                y += (1.0 / k**1.25) * np.sin(2 * np.pi * fk * t + phase * k)
    env = np.ones(n)
    a, r = n_of(min(attack, sec * 0.5)), n_of(release)
    env[:a] = np.linspace(0, 1, a) ** 1.5
    env[-r:] = np.linspace(1, 0, r)
    if tremolo:
        env *= 1 - depth * (0.5 + 0.5 * np.sin(2 * np.pi * tremolo * t))
    return norm(y * env) * vel


def kick(vel=0.8, low=54.0, drop=90.0, tau=0.14):
    n = n_of(0.5)
    t = t_of(n)
    y = tone(low + drop * np.exp(-t / 0.028)) * np.exp(-t / tau)
    return edges(norm(harmonics(y, 0.3)), 0.001, 0.02) * vel


def shaker(rng, vel=0.5, tau=0.032):
    n = n_of(0.16)
    env = np.minimum(1.0, t_of(n) / 0.005) * decay(n, tau)
    return noise(n, 5200, 11500, rng) * env * vel


def hat(rng, vel=0.5, tau=0.018):
    n = n_of(0.1)
    return noise(n, 7000, 14000, rng) * decay(n, tau) * vel


def rim(rng, vel=0.5):
    n = n_of(0.09)
    t = t_of(n)
    y = np.sin(2 * np.pi * 1750 * t) * np.exp(-t / 0.011) + 0.5 * np.sin(2 * np.pi * 460 * t) * np.exp(-t / 0.02)
    y += 0.3 * noise(n, 2000, 8000, rng) * np.exp(-t / 0.004)
    return edges(norm(y), 0.0005, 0.01) * vel


def woodblock(vel=0.6, f=880.0):
    n = n_of(0.16)
    t = t_of(n)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.03) + 0.3 * np.sin(2 * np.pi * f * 2.7 * t) * np.exp(-t / 0.012)
    return edges(norm(y), 0.0008, 0.01) * vel


# ============================================================================= sound effects
SFX: dict[str, dict] = {}


def sfx(name: str, about: str, gain: float = -10.0, align: str = "start"):
    """
    Register an effect. `gain` is how loud it is by default, in dB against the voice: its loudest
    tenth of a second, as a phone plays it, against the voice while it is speaking. 0 is as loud
    as the voice. -6 is a big hit, -10 is clear, -14 is quiet, under -18 nobody hears it.
    `align` says which part of the sound sits on the time given: its start, its centre (a whoosh
    on a cut) or its end (a riser into a hit).
    """

    def wrap(fn):
        SFX[name] = {"fn": fn, "about": about, "gain": gain, "align": align}
        return fn

    return wrap


# ---- air: cuts and moves
@sfx("whoosh", "air rushing past: a cut to a new place, a fast camera move", -10, "center")
def _whoosh(rng, dur=0.42, lo=260.0, hi=3600.0, **_):
    n = n_of(dur)
    k = np.sin(np.pi * np.linspace(0, 1, n)) ** 1.5
    return sweep(n, lo * (hi / lo) ** k, rng, 0.85) * bell(n, 2.0)


@sfx("swish", "a short, light whoosh: a quick cut inside a list, a head turning", -12, "center")
def _swish(rng, dur=0.2, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    return sweep(n, 900.0 * (7500.0 / 900.0) ** k, rng, 0.7) * bell(n, 1.6)


@sfx("whoosh_low", "a heavy thing moving: a golem's arm, a bed, a wing", -10, "center")
def _whoosh_low(rng, dur=0.6, **_):
    n = n_of(dur)
    k = np.sin(np.pi * np.linspace(0, 1, n))
    return sweep(n, 90.0 * (900.0 / 90.0) ** k, rng, 0.9) * bell(n, 1.8)


@sfx("zip", "something darting: a fast rise, a dash", -12)
def _zip(rng, dur=0.14, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    y = tone(320.0 * (3200.0 / 320.0) ** k) + 0.4 * sweep(n, 800.0 * 8.0**k, rng, 0.6)
    return norm(y * bell(n, 0.8))


@sfx("gust", "a gust of wind over open ground", -12, "center")
def _gust(rng, dur=1.3, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    centre = 380.0 * 2 ** (0.9 * np.sin(2 * np.pi * (0.7 * k + rng.random())))
    return sweep(n, centre, rng, 0.9) * bell(n, 1.3)


# ---- small things appearing
@sfx("pop", "a thing pops into being: a speech bubble, a sign, an idea", -9)
def _pop(rng, pitch=1.0, **_):
    n = n_of(0.1)
    t = t_of(n)
    f = 420.0 * pitch * (1 + 1.5 * np.minimum(1.0, t / 0.045) ** 0.8)
    return edges(tone(f) * np.exp(-t / 0.028), 0.0012, 0.01)


@sfx("blip", "a small two-note blip: a thought, a glance, a little yes", -11)
def _blip(rng, pitch=1.0, **_):
    n = n_of(0.07)
    a = edges(tone(880.0 * pitch, n) * decay(n, 0.03), 0.001, 0.008)
    b = edges(tone(1318.5 * pitch, n) * decay(n, 0.035), 0.001, 0.008)
    return np.concatenate([a, b])


@sfx("tick", "one dry tick: a clock, a count, a beat of waiting", -12)
def _tick(rng, pitch=1.0, **_):
    n = n_of(0.06)
    t = t_of(n)
    y = np.sin(2 * np.pi * 2100 * pitch * t) * np.exp(-t / 0.007) + 0.5 * np.sin(2 * np.pi * 3300 * pitch * t) * np.exp(-t / 0.004)
    return edges(norm(y), 0.0004, 0.01)


@sfx("ding", "one bright bell note: the right answer, the subscribe line", -9)
def _ding(rng, note="E6", **_):
    return norm(glock(hz(note), 1.3, 1.0))


@sfx("chime", "four bell notes going up: a good thing, a gift", -11)
def _chime(rng, **_):
    out = np.zeros(n_of(1.7))
    for i, note in enumerate(("C6", "E6", "G6", "C7")):
        y = glock(hz(note), 1.0, 0.9 - 0.1 * i)
        out[n_of(0.07 * i) : n_of(0.07 * i) + len(y)] += y[: len(out) - n_of(0.07 * i)]
    return norm(out)


@sfx("sparkle", "a scatter of tiny high notes: something magic, something given", -11)
def _sparkle(rng, dur=0.6, **_):
    out = np.zeros((n_of(dur + 0.7), 2))
    scale = ("C6", "D6", "E6", "G6", "A6", "C7", "D7", "E7")
    for i in range(8):
        y = glock(hz(scale[int(rng.integers(len(scale)))]), 0.5, 0.5 + 0.5 * rng.random())
        place(out, y, dur * (i + rng.random() * 0.6) / 8, 1.0, rng.uniform(-0.7, 0.7))
    return norm(out)


@sfx("plink", "one drop of water, or one small high pluck", -12)
def _plink(rng, pitch=1.0, **_):
    n = n_of(0.16)
    t = t_of(n)
    f = 900.0 * pitch * (1 + 0.9 * np.minimum(1.0, t / 0.03))
    return edges(tone(f) * np.exp(-t / 0.035), 0.001, 0.01)


# ---- bells and metal
@sfx("bell", "the village bell, struck once", -8)
def _bell(rng, f=330.0, ring=1.0, **_):
    rows = [(0.5, 0.6, 3.0), (1.0, 1.0, 2.2), (1.183, 0.7, 1.6), (1.506, 0.35, 1.2), (2.0, 0.8, 1.4), (2.514, 0.3, 0.8), (3.011, 0.25, 0.6), (4.166, 0.15, 0.4)]
    y = partials(f, 3.2 * ring, [(r, a, tau * ring) for r, a, tau in rows], attack=0.001)
    n = n_of(0.03)
    y[:n] += 0.35 * noise(n, 800, 5000, rng) * decay(n, 0.008)
    return norm(y)


@sfx("clank", "iron on iron: a golem moving, a gate, armour", -10)
def _clank(rng, f=380.0, **_):
    rows = [(1.0, 1.0, 0.16), (1.63, 0.7, 0.12), (2.41, 0.5, 0.09), (3.37, 0.35, 0.06), (4.53, 0.2, 0.045)]
    y = partials(f * rng.uniform(0.94, 1.06), 0.5, rows, attack=0.0008)
    n = n_of(0.02)
    y[:n] += 0.5 * noise(n, 1500, 7000, rng) * decay(n, 0.004)
    return norm(y)


# ---- hits
def _thud(low=70.0, drop=80.0, tau=0.1, grit=0.5, rng=None, seconds=0.5):
    n = n_of(seconds)
    t = t_of(n)
    y = tone(low + drop * np.exp(-t / 0.03)) * np.exp(-t / tau)
    y = harmonics(y, 0.8)
    if rng is not None and grit:
        y += grit * noise(n, 60, 520, rng) * np.exp(-t / 0.04)
        y += 0.6 * grit * noise(n, 250, 1400, rng) * np.exp(-t / 0.022)  # the knock: the part of a thud a phone can play
    return edges(norm(y), 0.001, 0.03)


@sfx("thud", "a soft heavy landing: a body, a bed, a sack", -8)
def _sfx_thud(rng, **_):
    return _thud(rng=rng)


@sfx("stomp", "one very heavy footstep: a golem, a giant", -6)
def _stomp(rng, **_):
    y = _thud(58.0, 60.0, 0.15, 0.7, rng, 0.7)
    y[: n_of(0.5)] += 0.18 * _clank(rng)[: n_of(0.5)]
    return norm(y)


@sfx("hit", "a hard hit: a fist through a floor, a door thrown open", -5)
def _hit(rng, **_):
    n = n_of(0.7)
    t = t_of(n)
    y = harmonics(tone(62.0 + 100.0 * np.exp(-t / 0.035)) * np.exp(-t / 0.17), 0.4)
    y += 0.7 * noise(n, 150, 5000, rng, -3) * np.exp(-t / 0.03)
    y += 0.35 * noise(n, 60, 800, rng) * np.exp(-t / 0.16)
    return edges(norm(y), 0.0008, 0.03)


@sfx("boom", "the big one: the reveal. Use it once or twice a film", -2)
def _boom(rng, **_):
    n = n_of(2.4)
    t = t_of(n)
    sub = tone(44.0 + 70.0 * np.exp(-t / 0.07)) * np.exp(-t / 0.55)
    y = sub + 0.5 * filt(np.tanh(3.0 * sub) - sub, 80, 420)  # harmonics, so a phone speaker has something to play
    y += 0.8 * noise(n, 150, 6000, rng, -3) * np.exp(-t / 0.022)
    y += 0.55 * noise(n, 45, 900, rng, -6) * np.exp(-t / 0.42)
    return edges(norm(y), 0.0008, 0.2)


@sfx("drop", "the floor going out from under you: a low note falling away", -8)
def _drop(rng, dur=0.9, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    f = 190.0 * (48.0 / 190.0) ** k
    y = tone(f) + 0.3 * tone(f * 2)
    return edges(norm(harmonics(y * (1 - k) ** 0.7, 0.5)), 0.01, 0.05)


@sfx("riser", "a sound that climbs until something happens. It ENDS on its time", -8, "end")
def _riser(rng, dur=1.6, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    y = sweep(n, 260.0 * (8500.0 / 260.0) ** (k**1.4), rng, 0.8) * k**2.2
    wobble = 1 - 0.5 * k * (0.5 + 0.5 * np.sin(2 * np.pi * np.cumsum(6.0 + 14.0 * k) / SR))
    f = 220.0 * 2 ** (2.0 * k**1.3)
    y += 0.45 * (tone(f) + 0.4 * tone(f * 1.5)) * k**2 * wobble
    return edges(norm(y), 0.05, 0.012)


@sfx("sting", "a dark chord, struck and left to hang: the bad news", -7)
def _sting(rng, **_):
    out = np.zeros(n_of(2.6))
    for note, level in (("A1", 0.9), ("A2", 1.0), ("E3", 0.8), ("C4", 0.7), ("F4", 0.45)):
        y = strings(hz(note), 0.5, level, tremolo=0, attack=0.02, release=1.9)
        out[: len(y)] += y[: len(out)]
    return edges(norm(out), 0.004, 0.3)


@sfx("heartbeat", "one heartbeat, lub-dub: the wait before the thing", -7)
def _heartbeat(rng, **_):
    out = np.zeros(n_of(0.8))
    a = _thud(64.0, 40.0, 0.07, 0.35, rng, 0.4)
    b = _thud(58.0, 30.0, 0.06, 0.3, rng, 0.4) * 0.72
    out[: len(a)] += a
    out[n_of(0.26) : n_of(0.26) + len(b)] += b
    return norm(out)


# ---- funny
@sfx("bonk", "a hollow knock on the head: a plan failing, lightly", -9)
def _bonk(rng, **_):
    return norm(woodblock(1.0, 520.0) + 0.5 * _thud(90.0, 60.0, 0.05, 0, None, 0.16))


@sfx("boing", "a spring: being picked up, bouncing off", -10)
def _boing(rng, dur=0.6, **_):
    n = n_of(dur)
    t = t_of(n)
    wob = 0.13 * np.sin(2 * np.pi * np.cumsum(28.0 - 14.0 * t / dur) / SR) * np.exp(-t / 0.4)
    f = 190.0 * (1 + 0.9 * np.exp(-t / 0.22)) * (1 + wob)
    y = tone(f) + 0.35 * tone(f * 2) + 0.15 * tone(f * 3)
    return edges(norm(y * np.exp(-t / 0.28)), 0.002, 0.03)


@sfx("slide_up", "a slide whistle going up: hope, a jump, a lift", -12)
def _slide_up(rng, dur=0.36, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    f = 420.0 * (1250.0 / 420.0) ** (k**0.8) * (1 + 0.012 * np.sin(2 * np.pi * 7 * k * dur))
    return norm((tone(f) + 0.25 * tone(f * 2)) * bell(n, 0.5))


@sfx("slide_down", "a slide whistle going down: a plan failing, being carried off", -12)
def _slide_down(rng, dur=0.5, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    f = 1150.0 * (300.0 / 1150.0) ** (k**0.9) * (1 + 0.012 * np.sin(2 * np.pi * 7 * k * dur))
    return norm((tone(f) + 0.25 * tone(f * 2)) * bell(n, 0.5))


# ---- eyes, and things made of sticks
@sfx("blink", "a very big eye blinking: the lids come down, meet with a soft tap, and open again. The tap is 0.08 s after its time", -8)
def _blink(rng, dur=0.12, **_):
    """`dur` is how long the lids stay shut. Give it the blink's own `hold`, so the eye opens when the sound does."""
    shut = n_of(0.08)
    opening = n_of(0.1)
    y = np.zeros(shut + n_of(dur) + opening + n_of(0.06))
    k = np.linspace(0.0, 1.0, shut)
    y[:shut] += 0.55 * sweep(shut, 2600.0 * (420.0 / 2600.0) ** k, rng, 0.6) * bell(shut, 0.9)  # down: the pitch falls
    n = n_of(0.09)
    t = t_of(n)
    tap = np.sin(2 * np.pi * 560 * t) * np.exp(-t / 0.016) + 0.6 * np.sin(2 * np.pi * 1340 * t) * np.exp(-t / 0.008)
    tap += 0.5 * noise(n, 900, 4200, rng) * np.exp(-t / 0.006)
    y[shut : shut + n] += norm(tap)
    weight = _thud(120.0, 70.0, 0.045, 0.3, rng, 0.14)  # it is the size of a moon: a little weight under the tap
    y[shut : shut + len(weight)] += 0.3 * weight
    a = shut + n_of(dur)
    k = np.linspace(0.0, 1.0, opening)
    y[a : a + opening] += 0.4 * sweep(opening, 520.0 * (2400.0 / 520.0) ** k, rng, 0.6) * bell(opening, 0.9)  # up again, quieter
    return edges(norm(y), 0.001, 0.02)


@sfx("creak", "dry wood giving under a load: a scarecrow shifting, a neck that is a stick, an old door", -10)
def _creak(rng, dur=0.5, **_):
    n = n_of(dur)
    t = t_of(n)
    # Stick and slip: clicks that come faster as the wood gives, each one ringing in it for a moment.
    rate = 16.0 + 26.0 * (t / dur) ** 1.5 + 3.0 * np.sin(2 * np.pi * 2.3 * t)
    clicks = (np.diff(np.floor(np.cumsum(rate) / SR), prepend=0.0) > 0).astype(float) * rng.uniform(0.6, 1.0, n)
    m = n_of(0.03)
    r = t_of(m)
    f = rng.uniform(820.0, 980.0)
    ring = np.sin(2 * np.pi * f * r) * np.exp(-r / 0.006) + 0.5 * np.sin(2 * np.pi * f * 2.3 * r) * np.exp(-r / 0.004)
    ring += 0.35 * np.sin(2 * np.pi * f * 0.52 * r) * np.exp(-r / 0.009)
    y = convolve(clicks, ring)[:n]
    y += 0.12 * float(np.max(np.abs(y))) * noise(n, 1200, 5200, rng)  # the dry rasp between the clicks
    return edges(norm(y * bell(n, 0.45)), 0.002, 0.03)


@sfx("step_stick", "one step of a thing with sticks for legs: a dry knock, and a little straw after it. A scarecrow walking", -10)
def _step_stick(rng, **_):
    n = n_of(0.2)
    t = t_of(n)
    y = np.zeros(n)
    knock = woodblock(1.0, rng.uniform(360.0, 440.0))  # pitched where a phone can play it; a footstep on planks is not
    y[: len(knock)] += knock
    y += 0.35 * np.sin(2 * np.pi * rng.uniform(170.0, 200.0) * t) * np.exp(-t / 0.03)  # the ground under it
    y += 0.3 * noise(n, 1800, 7000, rng, -2) * np.exp(-(((t - 0.05) / 0.035) ** 2))  # the straw, settling just after
    return edges(norm(y), 0.0008, 0.02)


# ---- feet, hands, blocks
def _grain(rng, lo, hi, tau, n_sec=0.09):
    n = n_of(n_sec)
    return noise(n, lo, hi, rng) * np.minimum(1.0, t_of(n) / 0.003) * decay(n, tau)


@sfx("step_grass", "one footstep on grass", -11)
def _step_grass(rng, **_):
    out = np.zeros(n_of(0.16))
    a = _grain(rng, 700, 6000, 0.03) * rng.uniform(0.8, 1.0)
    b = _grain(rng, 1200, 7000, 0.022) * rng.uniform(0.3, 0.55)
    out[: len(a)] += a
    out[n_of(0.035) : n_of(0.035) + len(b)] += b
    return norm(out)


@sfx("step_wood", "one footstep on planks", -11)
def _step_wood(rng, **_):
    n = n_of(0.14)
    t = t_of(n)
    y = np.sin(2 * np.pi * rng.uniform(150, 195) * t) * np.exp(-t / 0.03)
    y[: n_of(0.09)] += 0.4 * _grain(rng, 900, 3200, 0.009)
    return edges(norm(y), 0.0008, 0.01)


@sfx("step_stone", "one footstep on stone", -11)
def _step_stone(rng, **_):
    n = n_of(0.12)
    t = t_of(n)
    y = 0.5 * np.sin(2 * np.pi * rng.uniform(290, 350) * t) * np.exp(-t / 0.018)
    y[: n_of(0.09)] += _grain(rng, 1800, 7500, 0.011)
    return edges(norm(y), 0.0008, 0.01)


@sfx("dig", "a fist or a shovel into dirt", -8)
def _dig(rng, **_):
    out = np.zeros(n_of(0.34))
    out[: n_of(0.3)] += 0.8 * _thud(78.0, 60.0, 0.06, 0.4, rng, 0.3)
    for i in range(6):
        g = _grain(rng, 400, 3600, rng.uniform(0.008, 0.02), 0.07) * rng.uniform(0.25, 0.7)
        at = n_of(0.006 + 0.028 * i + 0.01 * rng.random())
        out[at : at + len(g)] += g[: len(out) - at]
    return norm(out)


@sfx("break", "a block breaking: four crunches and it is gone", -9)
def _break(rng, **_):
    out = np.zeros(n_of(0.3))
    for i in range(4):
        g = _grain(rng, 500, 4200, 0.011, 0.06) * (0.5 + 0.16 * i)
        at = n_of(0.03 * i)
        out[at : at + len(g)] += g
    tail = edges(tone(250.0, n_of(0.12)) * decay(n_of(0.12), 0.03), 0.001, 0.01)
    out[n_of(0.12) : n_of(0.12) + len(tail)] += 0.7 * tail
    return norm(out)


@sfx("crack", "wood or shell splitting: sharp snaps, then it gives", -8)
def _crack(rng, **_):
    out = np.zeros(n_of(0.4))
    for i in range(5):
        at = n_of(0.02 * i + 0.02 * rng.random())
        n = n_of(0.05)
        t = t_of(n)
        snap = noise(n, 1500, 9000, rng) * np.exp(-t / 0.003) + 0.6 * np.sin(2 * np.pi * rng.uniform(600, 950) * t) * np.exp(-t / 0.008)
        out[at : at + n] += snap * rng.uniform(0.5, 1.0)
    out[n_of(0.05) : n_of(0.05) + n_of(0.3)] += 0.6 * _thud(70.0, 60.0, 0.07, 0.6, rng, 0.3)
    return norm(out)


@sfx("debris", "bits falling and settling after something broke", -12)
def _debris(rng, dur=0.6, **_):
    out = np.zeros((n_of(dur + 0.1), 2))
    for i in range(14):
        k = rng.random() ** 0.7
        g = _grain(rng, 600, 5000, rng.uniform(0.006, 0.016), 0.05) * (1 - 0.7 * k) * rng.uniform(0.4, 1.0)
        place(out, g, dur * k, 1.0, rng.uniform(-0.6, 0.6))
    return norm(out)


@sfx("place", "a block set down, a thing put on a table", -11)
def _place(rng, **_):
    n = n_of(0.12)
    t = t_of(n)
    y = np.sin(2 * np.pi * rng.uniform(220, 260) * t) * np.exp(-t / 0.024)
    y[: n_of(0.09)] += 0.35 * _grain(rng, 1200, 5000, 0.005)
    return edges(norm(y), 0.0008, 0.01)


@sfx("scrape", "something heavy dragged across a floor", -11)
def _scrape(rng, dur=0.9, **_):
    n = n_of(dur)
    t = t_of(n)
    rough = 0.55 + 0.45 * np.sin(2 * np.pi * np.cumsum(17.0 + 5.0 * np.sin(2 * np.pi * 1.3 * t)) / SR) ** 2
    return norm(noise(n, 170, 1600, rng, -3) * rough * bell(n, 0.6))


@sfx("rustle", "cloth moving: a sleeve, a robe, a bag", -12)
def _rustle(rng, dur=0.45, **_):
    n = n_of(dur)
    t = t_of(n)
    swells = 0.2 + np.abs(np.sin(2 * np.pi * rng.uniform(4.5, 7.0) * t + rng.random() * 6))
    return norm(noise(n, 1500, 7500, rng, -2) * swells * bell(n, 0.7))


# ---- fire and people
def _crackles(rng, seconds, rate, lo=1500, hi=7500):
    out = np.zeros(n_of(seconds))
    for _ in range(max(1, int(rng.poisson(rate * seconds)))):
        at = int(rng.integers(0, max(1, len(out) - n_of(0.03))))
        n = n_of(0.03)
        click = noise(n, lo, hi, rng) * decay(n, rng.uniform(0.0012, 0.006)) * min(1.0, rng.lognormal(-1.2, 0.8))
        out[at : at + n] += click
    return out


@sfx("crackle", "half a second of a torch or a small fire, close", -12)
def _crackle(rng, dur=0.6, **_):
    return norm(_crackles(rng, dur, 30) * edges(np.ones(n_of(dur)), 0.02, 0.1))


@sfx("fire_whoosh", "fire catching: a roof going up, a torch swung past", -10, "center")
def _fire_whoosh(rng, dur=0.8, **_):
    n = n_of(dur)
    k = np.sin(np.pi * np.linspace(0, 1, n))
    y = sweep(n, 120.0 * (1400.0 / 120.0) ** k, rng, 1.0) * bell(n, 1.4)
    return norm(y + 0.5 * _crackles(rng, dur, 40) * bell(n, 1.0))


def _walla(rng, seconds, voices=22, lo=450.0, hi=2600.0):
    """People, far enough away that no word survives."""
    n = n_of(seconds)
    t = t_of(n)
    out = np.zeros((n, 2))
    for _ in range(voices):
        c = float(np.exp(rng.uniform(math.log(lo), math.log(hi))))
        talk = np.clip(np.sin(2 * np.pi * rng.uniform(2.6, 5.5) * t + rng.random() * 6) + rng.uniform(-0.2, 0.5), 0, None) ** 1.5
        place(out, noise(n, c / 1.2, c * 1.2, rng) * talk * rng.uniform(0.4, 1.0), 0.0, 1.0, rng.uniform(-0.9, 0.9))
    return out


@sfx("cheer", "a crowd going up all at once", -11)
def _cheer(rng, dur=1.3, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    shape = np.minimum(1.0, k / 0.12) * (1 - k) ** 0.8
    return norm(_walla(rng, dur, 30, 600.0, 3400.0) * shape[:, None])


# ---- money, and numbers: the Explainer topic
def _coin_ping(rng, pitch=1.0, ring=0.22):
    """One small disc of metal struck: two partials that do not agree, and a tick of contact."""
    f = 2350.0 * pitch * rng.uniform(0.97, 1.03)
    y = partials(f, ring * 3.2, [(1.0, 1.0, ring), (2.32, 0.6, ring * 0.7), (3.87, 0.3, ring * 0.4), (0.53, 0.25, ring * 0.5)], attack=0.0008)
    n = n_of(0.012)
    y[:n] += 0.5 * noise(n, 2500, 9000, rng) * decay(n, 0.003)
    return norm(y)


@sfx("coin", "one coin: put down, counted, flipped", -10)
def _coin(rng, pitch=1.0, **_):
    return _coin_ping(rng, pitch)


@sfx("coins", "a handful of coins spilling: a payment, a pile, 'a lot of money'", -10)
def _coins(rng, dur=0.55, **_):
    out = np.zeros((n_of(dur + 0.8), 2))
    count = max(4, int(round(dur * 14)))
    for i in range(count):
        at = dur * (i / count) ** 1.3 + rng.uniform(0.0, 0.03)  # fast at first, then the last few settle
        place(out, _coin_ping(rng, rng.uniform(0.82, 1.3), rng.uniform(0.12, 0.22)), at, rng.uniform(0.5, 1.0), rng.uniform(-0.6, 0.6))
    return norm(out)


@sfx("register", "cha-ching: a sale, a price paid, money made", -8)
def _register(rng, **_):
    out = np.zeros(n_of(1.5))
    clunk = _thud(150.0, 90.0, 0.045, 0.6, rng, 0.2)  # the drawer
    out[: len(clunk)] += 0.7 * clunk
    for at, note, level in ((0.07, "E6", 0.9), (0.2, "B6", 1.0)):  # the bell, twice
        y = glock(hz(note), 1.0, level)
        out[n_of(at) : n_of(at) + len(y)] += y[: len(out) - n_of(at)]
    return norm(out)


@sfx("paper", "a banknote off a pile, a page turned, a tag flipped over", -12)
def _paper(rng, dur=0.22, **_):
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    flutter = 0.55 + 0.45 * np.sin(2 * np.pi * rng.uniform(38, 55) * k * dur) ** 2
    return norm(sweep(n, 2200.0 * (6500.0 / 2200.0) ** k, rng, 0.7) * flutter * bell(n, 0.7))


@sfx("count", "a number running up: ticks that climb. A price rising, a total growing", -11)
def _count(rng, dur=0.8, **_):
    out = np.zeros(n_of(dur + 0.1))
    steps = max(5, int(round(dur * 16)))
    for i in range(steps):
        k = i / (steps - 1)
        y = _tick(rng, pitch=0.7 * 2 ** (1.1 * k))
        at = n_of(dur * k ** 0.85)
        out[at : at + len(y)] += y[: len(out) - at] * (0.6 + 0.4 * k)
    return norm(out)


@sfx("stamp", "a firm thump with a click on top: a price fixed, a rule made, an answer given", -8)
def _stamp(rng, **_):
    y = _thud(180.0, 120.0, 0.055, 0.7, rng, 0.3)
    knock = woodblock(1.0, 620.0)  # the part of a stamp a phone can play
    y[: len(knock)] += 0.6 * knock
    n = n_of(0.03)
    y[:n] += 0.5 * noise(n, 1200, 5000, rng) * decay(n, 0.006)
    return norm(y)


@sfx("buzz", "a flat buzzer: wrong, no, not enough", -10)
def _buzz(rng, dur=0.36, **_):
    n = n_of(dur)
    t = t_of(n)
    y = np.zeros(n)
    for f in (233.0, 240.0):  # two notes that grate; odd harmonics, and high enough for a phone to play
        for k in (1, 3, 5, 7, 9, 11):
            y += np.sin(2 * np.pi * f * k * t) / k
    return edges(norm(y), 0.004, 0.03)


# ---- powers: the What If topic
@sfx("power_up", "a power switching on: bright notes running up, and air rising with them", -9)
def _power_up(rng, dur=0.7, **_):
    out = np.zeros((n_of(dur + 1.0), 2))
    scale = ("C5", "E5", "G5", "B5", "D6", "G6", "B6", "D7")
    for i, note in enumerate(scale):
        place(out, glock(hz(note), 0.6, 0.55 + 0.06 * i), dur * (i / len(scale)) ** 0.8, 1.0, -0.5 + i / (len(scale) - 1))
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    place(out, sweep(n, 500.0 * (5200.0 / 500.0) ** k, rng, 0.6) * k ** 1.5 * 0.5, 0.0)
    return norm(out)


@sfx("power_down", "a power going out: the same notes falling, and the air going with them", -10)
def _power_down(rng, dur=0.7, **_):
    out = np.zeros((n_of(dur + 1.0), 2))
    scale = ("D7", "B6", "G6", "D6", "B5", "G5", "Eb5", "C5")
    for i, note in enumerate(scale):
        place(out, glock(hz(note), 0.5, 0.9 - 0.07 * i), dur * (i / len(scale)) ** 1.2, 1.0, 0.5 - i / (len(scale) - 1))
    n = n_of(dur)
    k = np.linspace(0, 1, n)
    place(out, sweep(n, 4200.0 * (320.0 / 4200.0) ** k, rng, 0.6) * (1 - k) ** 1.2 * 0.5, 0.0)
    return norm(out)


@sfx("glitch", "the world skipping: a moment seen before it happens, a second played twice", -10)
def _glitch(rng, dur=0.4, **_):
    n = n_of(dur)
    out = np.zeros(n)
    slices = max(4, int(round(dur * 20)))
    grain = n // slices
    for i in range(slices):
        if rng.random() < 0.2:
            continue  # a hole: the skip itself
        f = 520.0 * 2 ** (int(rng.integers(0, 6)) * 3 / 12)
        m = int(grain * rng.uniform(0.45, 0.95))
        t = t_of(m)
        y = np.sign(np.sin(2 * np.pi * f * t)) * 0.5 + np.sin(2 * np.pi * f * 2 * t) * 0.5
        out[i * grain : i * grain + m] += edges(y, 0.001, 0.002)
    return norm(filt(out, 300, 6000, 2))


@sfx("splash", "into water: a dive, a jump in a puddle, a bucket emptied", -9)
def _splash(rng, dur=0.7, **_):
    n = n_of(dur)
    t = t_of(n)
    out = np.zeros((n_of(dur + 0.5), 2))
    body = noise(n, 250, 5200, rng, -3) * np.minimum(1.0, t / 0.012) * np.exp(-t / (dur * 0.28))
    place(out, body, 0.0)
    place(out, 0.6 * _thud(110.0, 80.0, 0.07, 0.4, rng, 0.25), 0.0)
    for _ in range(7):  # the drops that come down after
        place(out, _plink(rng, rng.uniform(0.7, 1.5)), rng.uniform(0.12, dur), rng.uniform(0.2, 0.5), rng.uniform(-0.8, 0.8))
    return norm(out)


@sfx("school_bell", "the school bell: a lesson starts, a lesson ends, time is up", -9)
def _school_bell(rng, dur=0.9, **_):
    n = n_of(dur + 0.5)
    out = np.zeros(n)
    strike = partials(1480.0, 0.5, [(1.0, 1.0, 0.09), (2.76, 0.6, 0.06), (5.4, 0.35, 0.04), (0.5, 0.2, 0.08)], attack=0.0008)
    at = 0.0
    while at < dur:  # a hammer on a gong, twenty-four times a second
        a = n_of(at)
        out[a : a + len(strike)] += strike[: n - a] * rng.uniform(0.85, 1.0)
        at += 1 / 24.0
    return edges(norm(out), 0.002, 0.2)


# ============================================================================= beds
# A bed is the air of a place: it runs under a stretch of shots, quietly.
BEDS: dict[str, dict] = {}


def bed(name: str, about: str, gain: float = -26.0):
    """Register a bed. `gain` is its level in dB against the voice, on the same scale as the effects."""

    def wrap(fn):
        BEDS[name] = {"fn": fn, "about": about, "gain": gain}
        return fn

    return wrap


def _slow(rng, n, rate=0.25, depth=0.4):
    """A slow, wandering 1-ish curve, so a bed never sounds like a loop."""
    t = t_of(n)
    y = np.ones(n)
    for _ in range(3):
        y += depth / 3 * np.sin(2 * np.pi * rate * rng.uniform(0.5, 1.7) * t + rng.random() * 6)
    return y


@bed("village", "a village by day: open air and a few birds", -26)
def _bed_village(rng, seconds):
    n = n_of(seconds)
    out = np.zeros((n, 2))
    air = noise(n, 180, 2600, rng, -8) * _slow(rng, n, 0.2, 0.5) * 0.35
    place(out, air, 0.0)
    at = rng.uniform(0.3, 1.2)
    while at < seconds - 0.5:
        base, pan, level = rng.uniform(2600, 4300), rng.uniform(-0.8, 0.8), rng.uniform(0.35, 0.9)
        for i in range(int(rng.integers(2, 6))):
            m = n_of(rng.uniform(0.05, 0.09))
            k = np.linspace(0, 1, m)
            chirp = tone(base * (1 + 0.28 * np.sin(np.pi * k) + 0.1 * k)) * bell(m, 1.2)
            place(out, chirp, at + i * rng.uniform(0.09, 0.13), level, pan)
        at += rng.uniform(1.4, 3.6)
    return out


@bed("night", "night outside: crickets and still air", -27)
def _bed_night(rng, seconds):
    n = n_of(seconds)
    t = t_of(n)
    out = np.zeros((n, 2))
    place(out, noise(n, 120, 1400, rng, -9) * 0.3, 0.0)
    for carrier, pulse, pan in ((4300.0, 31.0, -0.6), (3850.0, 27.0, 0.55)):
        on = (np.sin(2 * np.pi * rng.uniform(0.9, 1.3) * t + rng.random() * 6) > 0.1).astype(float)
        on = np.convolve(on, np.ones(n_of(0.02)) / n_of(0.02), mode="same")
        chirr = np.sin(2 * np.pi * carrier * t) * (0.5 + 0.5 * np.sin(2 * np.pi * pulse * t)) ** 3 * on
        place(out, chirr, 0.0, 0.5, pan)
    return out


@bed("room", "indoors: almost nothing, so the room is not dead silent", -32)
def _bed_room(rng, seconds):
    n = n_of(seconds)
    out = np.zeros((n, 2))
    place(out, noise(n, 90, 900, rng, -9) * _slow(rng, n, 0.15, 0.3), 0.0)
    return out


@bed("cave", "underground: a low rumble and a drip now and then", -24)
def _bed_cave(rng, seconds):
    n = n_of(seconds)
    out = np.zeros((n, 2))
    place(out, noise(n, 35, 220, rng, -4) * _slow(rng, n, 0.3, 0.6), 0.0)
    at = rng.uniform(0.3, 1.0)
    while at < seconds - 0.3:
        place(out, _plink(rng, rng.uniform(0.8, 1.4)), at, 0.5, rng.uniform(-0.7, 0.7))
        at += rng.uniform(1.1, 2.8)
    return reverb(out, 1.6, 0.5, 200, 5000, 11)


@bed("wind", "high open ground: wind", -24)
def _bed_wind(rng, seconds):
    n = n_of(seconds)
    t = t_of(n)
    out = np.zeros((n, 2))
    for pan in (-0.5, 0.5):
        centre = 420.0 * 2 ** (0.8 * np.sin(2 * np.pi * rng.uniform(0.12, 0.22) * t + rng.random() * 6))
        place(out, sweep(n, centre, rng, 0.9) * _slow(rng, n, 0.3, 0.7), 0.0, 0.7, pan)
    return out


@bed("sky", "the open sky between islands: a wide, soft air, and a bird a long way off", -28)
def _bed_sky(rng, seconds):
    n = n_of(seconds)
    t = t_of(n)
    out = np.zeros((n, 2))
    for pan in (-0.6, 0.6):
        centre = 700.0 * 2 ** (0.5 * np.sin(2 * np.pi * rng.uniform(0.07, 0.13) * t + rng.random() * 6))
        place(out, sweep(n, centre, rng, 1.0) * _slow(rng, n, 0.18, 0.5), 0.0, 0.5, pan)
    at = rng.uniform(1.0, 3.0)
    while at < seconds - 0.6:
        base, pan = rng.uniform(2300, 3400), rng.uniform(-0.8, 0.8)
        for i in range(int(rng.integers(2, 4))):
            m = n_of(rng.uniform(0.07, 0.11))
            k = np.linspace(0, 1, m)
            place(out, tone(base * (1 + 0.2 * np.sin(np.pi * k))) * bell(m, 1.2), at + i * rng.uniform(0.12, 0.17), rng.uniform(0.12, 0.3), pan)
        at += rng.uniform(3.5, 7.0)
    return out


@bed("classroom", "a room full of kids keeping quiet: paper, a pencil, a chair that creaks", -29)
def _bed_classroom(rng, seconds):
    n = n_of(seconds)
    out = np.zeros((n, 2))
    place(out, noise(n, 160, 1600, rng, -5) * _slow(rng, n, 0.15, 0.3) * 0.4, 0.0)
    at = rng.uniform(0.2, 0.9)
    while at < seconds - 0.4:
        kind = rng.random()
        pan = rng.uniform(-0.8, 0.8)
        if kind < 0.5:  # a page, a sleeve
            m = n_of(rng.uniform(0.12, 0.3))
            place(out, noise(m, 1800, 7000, rng, -2) * bell(m, 0.8), at, rng.uniform(0.25, 0.55), pan)
        elif kind < 0.85:  # a pencil: three or four small taps
            for i in range(int(rng.integers(2, 5))):
                m = n_of(0.02)
                place(out, noise(m, 2200, 6000, rng) * decay(m, 0.004), at + i * rng.uniform(0.07, 0.12), rng.uniform(0.3, 0.6), pan)
        else:  # a chair
            m = n_of(rng.uniform(0.15, 0.3))
            k = np.linspace(0, 1, m)
            place(out, tone(rng.uniform(260, 420) * (1 + 0.25 * k)) * bell(m, 0.6) * (0.6 + 0.4 * np.sin(2 * np.pi * 31 * k * 0.2) ** 2), at, rng.uniform(0.2, 0.4), pan)
        at += rng.uniform(0.7, 2.2)
    return out


@bed("pool", "an indoor pool: water lapping, and every drip with an echo", -25)
def _bed_pool(rng, seconds):
    n = n_of(seconds)
    t = t_of(n)
    out = np.zeros((n, 2))
    for pan in (-0.5, 0.5):
        lap = 0.5 + 0.5 * np.sin(2 * np.pi * rng.uniform(0.35, 0.6) * t + rng.random() * 6) ** 2
        place(out, noise(n, 300, 3800, rng, -5) * lap * _slow(rng, n, 0.2, 0.4), 0.0, 0.6, pan)
    at = rng.uniform(0.3, 1.0)
    while at < seconds - 0.3:
        place(out, _plink(rng, rng.uniform(0.6, 1.2)), at, 0.45, rng.uniform(-0.8, 0.8))
        at += rng.uniform(0.9, 2.4)
    return reverb(out, 2.2, 0.45, 250, 6000, 13)


@bed("fire", "a big fire near by: roar, crackle and hiss", -22)
def _bed_fire(rng, seconds):
    n = n_of(seconds)
    t = t_of(n)
    out = np.zeros((n, 2))
    flutter = 0.6 + 0.4 * np.sin(2 * np.pi * np.cumsum(7.0 + 3.0 * np.sin(2 * np.pi * 0.7 * t)) / SR) ** 2
    place(out, noise(n, 45, 420, rng, -3) * _slow(rng, n, 0.4, 0.5) * 0.9, 0.0)
    place(out, noise(n, 300, 1500, rng, -4) * flutter * 0.45, 0.0)
    place(out, noise(n, 2000, 7000, rng, -3) * _slow(rng, n, 0.5, 0.6) * 0.12, 0.0)
    for pan in (-0.6, 0.0, 0.6):
        place(out, _crackles(rng, seconds, 9), 0.0, 0.8, pan)
    return out


@bed("crowd", "a crowd some way off: voices, no words", -26)
def _bed_crowd(rng, seconds):
    return _walla(rng, seconds)


# ============================================================================= music
# A mood is a few bars of music that can run for any length. The sheet names one
# for each stretch of the story; a new mood starts on a cut, on its own first beat.
MOODS: dict[str, dict] = {}


def mood(name: str, about: str, bpm: float, trim: float = 0.0):
    def wrap(fn):
        MOODS[name] = {"fn": fn, "about": about, "bpm": bpm, "trim": trim}
        return fn

    return wrap


class Seq:
    """A stereo canvas with a tempo. A beat is a quarter note; a bar is four."""

    def __init__(self, seconds: float, bpm: float, rng, tail: float = 1.6):
        self.seconds = seconds
        self.beat = 60.0 / bpm
        self.bar = 4 * self.beat
        self.bars = int(math.ceil(seconds / self.bar))
        self.rng = rng
        self.buf = np.zeros((n_of(seconds + tail), 2))

    def at(self, bar: int, beat: float) -> float:
        return (bar * 4 + beat) * self.beat

    def play(self, inst, note, bar, beat, beats=1.0, vel=0.7, pan=0.0, **kw):
        """One note. A little loose in time and touch, the way a hand is."""
        when = self.at(bar, beat)
        if when >= self.seconds:
            return
        when += self.rng.uniform(-0.004, 0.004) if when > 0.01 else 0.0
        y = inst(hz(note), beats * self.beat, vel * self.rng.uniform(0.92, 1.05), **kw)
        place(self.buf, y, max(0.0, when), 1.0, pan)

    def hit(self, y, bar, beat, gain=1.0, pan=0.0):
        when = self.at(bar, beat)
        if when < self.seconds:
            place(self.buf, y, when, gain, pan)

    def progress(self, bar: int, beat: float = 0.0) -> float:
        """0 at the start of the section, 1 at its end."""
        return min(1.0, self.at(bar, beat) / max(self.seconds, 1e-6))


@mood("town", "the town as he knew it: bright, busy, curious. Hook and tour", 116)
def _mood_town(seconds, rng):
    s = Seq(seconds, 116, rng)
    voicing = [("C3", ("C4", "E4", "G4", "C5")), ("A2", ("C4", "E4", "A4", "C5")), ("F2", ("C4", "F4", "A4", "C5")), ("G2", ("B3", "D4", "G4", "B4"))]
    fifth = {"C3": "G3", "A2": "E3", "F2": "C3", "G2": "D3"}
    tune = [
        [("E5", 0, 1), ("G5", 1, 0.5), ("E5", 1.5, 0.5), ("C5", 2, 1)],
        [("A5", 0, 1), ("G5", 1, 0.5), ("E5", 1.5, 1.5)],
        [("F5", 0, 1), ("A5", 1, 0.5), ("F5", 1.5, 0.5), ("C5", 2, 1.5)],
        [("D5", 0, 1), ("E5", 1, 0.5), ("D5", 1.5, 0.5), ("B4", 2, 1), ("D5", 3, 1)],
    ]
    order, touch = (0, 1, 2, 3, 2, 1, 2, 1), (0.9, 0.6, 0.7, 0.8, 0.65, 0.55, 0.7, 0.55)
    for b in range(s.bars):
        root, notes = voicing[b % 4]
        for i in range(8):
            s.play(marimba, notes[order[i]], b, i * 0.5, 0.5, 0.62 * touch[i], -0.25 if i % 2 else 0.25)
        for beat, note, length in ((0, root, 1.0), (1.5, root, 0.5), (2, fifth[root], 1.0), (3.5, root, 0.5)):
            s.play(bass, note, b, beat, length, 0.42)
        s.hit(kick(0.4), b, 0)
        s.hit(kick(0.32), b, 2)
        for i in range(8):
            s.hit(shaker(rng, 0.26 if i % 2 == 0 else 0.4), b, i * 0.5, 1.0, -0.35)
        for beat in (1, 3):
            s.hit(rim(rng, 0.3), b, beat, 1.0, 0.3)
        if (b // 4) % 2 == 1:  # the tune comes in on every second time round, so it is not wallpaper
            for note, beat, length in tune[b % 4]:
                s.play(kalimba, note, b, beat, length, 0.56, 0.12)
        s.play(pad, root, b, 0, 4, 0.07)
    return s.buf


@mood("curious", "a question nobody will answer: soft steps and a held breath. The itch, the elder's rule", 100, -1.0)
def _mood_curious(seconds, rng):
    s = Seq(seconds, 100, rng)
    bars = [
        ("A2", "E3", ("C4", "E4", "A4"), "E5"),
        ("G2", "B2", ("B3", "E4", "G4"), "D5"),
        ("F2", "C3", ("A3", "C4", "F4"), "C5"),
        ("E2", "B2", ("G#3", "B3", "E4"), "B4"),
    ]
    for b in range(s.bars):
        root, five, (low, mid, top), answer = bars[b % 4]
        s.play(pizz, root, b, 0, 1, 0.6)
        s.play(pizz, five, b, 2, 1, 0.5)
        for beat, note in ((0.5, low), (1, mid), (1.5, low), (2.5, mid), (3, top), (3.5, mid)):
            s.play(pizz, note, b, beat, 0.4, 0.5, 0.3 if beat < 2 else -0.3)
        s.play(glock, answer, b, 3, 1, 0.34, 0.2)
        s.play(pad, root, b, 0, 4, 0.13)
        s.play(pad, five, b, 0, 4, 0.09)
        for beat in (1, 3):
            s.hit(rim(rng, 0.2), b, beat, 1.0, -0.25)
        for beat in (0.5, 1.5, 2.5, 3.5):
            s.hit(shaker(rng, 0.14), b, beat, 1.0, 0.35)
    return s.buf


@mood("playful", "a plan going wrong, and it is funny: oom-pah and a bouncing tune. The failure", 126)
def _mood_playful(seconds, rng):
    s = Seq(seconds, 126, rng)
    chords = {
        "C": ("C3", "G2", ("E4", "G4", "C5"), [("G5", 0), ("E5", 0.5), ("C5", 1), ("E5", 1.5), ("G5", 2)]),
        "C2": ("C3", "G2", ("E4", "G4", "C5"), [("A5", 0), ("G5", 0.5), ("E5", 1), ("G5", 1.5), ("C6", 2)]),
        "F": ("F2", "C3", ("F4", "A4", "C5"), [("A5", 0), ("F5", 0.5), ("C5", 1), ("F5", 1.5), ("A5", 2)]),
        "G": ("G2", "D3", ("D4", "G4", "B4"), [("B5", 0), ("G5", 0.5), ("D5", 1), ("G5", 1.5), ("B5", 2), ("D6", 2.5)]),
        "Am": ("A2", "E3", ("E4", "A4", "C5"), [("C6", 0), ("A5", 0.5), ("E5", 1), ("A5", 1.5), ("C6", 2)]),
        "Dm": ("D3", "A2", ("F4", "A4", "D5"), [("D6", 0), ("A5", 0.5), ("F5", 1), ("A5", 1.5), ("D6", 2)]),
    }
    order = ("C", "C2", "F", "G", "C", "Am", "Dm", "G")
    for b in range(s.bars):
        root, five, triad, tune = chords[order[b % 8]]
        s.play(pizz, root, b, 0, 0.8, 0.6)
        s.play(pizz, five, b, 2, 0.8, 0.52)
        for beat in (1, 3):
            for note in triad:
                s.play(pizz, note, b, beat, 0.35, 0.4, 0.3)
        for note, beat in tune:
            s.play(marimba, note, b, beat, 0.5, 0.56, -0.2)
        s.hit(kick(0.36), b, 0)
        s.hit(kick(0.3), b, 2)
        for beat in (0.5, 2.5):
            s.hit(woodblock(0.26), b, beat, 1.0, 0.35)
        for i in range(8):
            s.hit(shaker(rng, 0.24 if i % 2 == 0 else 0.36), b, i * 0.5, 1.0, -0.35)
    return s.buf


@mood("sneak", "at night, on tiptoe, doing the forbidden thing: one plucked bass and very little else. The digging", 92, -2.0)
def _mood_sneak(seconds, rng):
    s = Seq(seconds, 92, rng)
    walk = [("A2", "C3", "D3", "E3"), ("A2", "C3", "D3", "D#3"), ("E3", "D3", "C3", "B2"), ("A2", None, "E2", None)]
    plinks = [[("E5", 2.5)], [("A5", 2.5), ("G5", 3.5)], [("C5", 1.5)], [("E5", 2), ("A4", 3)]]
    for b in range(s.bars):
        for beat, note in enumerate(walk[b % 4]):
            if note:
                s.play(pizz, note, b, beat, 0.6, 0.64 if beat == 0 else 0.5)
        for note, beat in plinks[b % 4]:
            s.play(kalimba, note, b, beat, 1, 0.46, 0.4)
            s.play(kalimba, note, b, beat + 0.75, 1, 0.16, -0.5)  # its own echo
        for beat in (1, 3):
            s.hit(hat(rng, 0.18), b, beat, 1.0, 0.3)
        s.play(pad, "A2", b, 0, 4, 0.1)
        s.play(pad, "E3", b, 0, 4, 0.06)
    return s.buf


@mood("tense", "the last steps before the edge: a pulse that will not stop, and strings climbing. It grows the whole way", 132, -1.0)
def _mood_tense(seconds, rng):
    s = Seq(seconds, 132, rng)
    climb = [("A3", "C4", "E4"), ("A3", "C4", "F4"), ("A3", "D4", "F4"), ("B3", "D4", "G#4")]
    top = ["E5", "F5", "A5", "B5"]
    for b in range(s.bars):
        p = s.progress(b)
        level = 0.55 + 0.45 * p
        for i in range(8):
            note = "A2"
            if b % 4 == 3 and i >= 6:
                note = "G2" if i == 6 else "G#2"
            s.play(pizz, note, b, i * 0.5, 0.45, (0.62 if i % 2 == 0 else 0.44) * level)
            s.play(bass, note, b, i * 0.5, 0.35, (0.26 if i % 2 == 0 else 0.16) * level)
        chord = climb[(b // 2) % 4]
        for note in chord:
            s.play(strings, note, b, 0, 4, 0.24 * level, 0.3 if note != chord[0] else -0.3)
        for beat in range(4):
            s.hit(kick(0.24 + 0.22 * p), b, beat)
            s.play(glock, top[(b // 2) % 4], b, beat, 0.5, 0.2 + 0.16 * p, 0.35)
        if p > 0.15:
            for i in range(8):
                s.hit(hat(rng, 0.16 + 0.16 * p), b, i * 0.5, 1.0, -0.3)
    return s.buf


@mood("drone", "seeing nothing, hearing nothing yet: one low note and air. The wait", 60, -3.0)
def _mood_drone(seconds, rng):
    s = Seq(seconds, 60, rng, tail=2.0)
    for note, level, pan in (("A2", 0.5, 0.0), ("E3", 0.36, -0.3), ("A3", 0.3, 0.3), ("E4", 0.14, 0.0)):
        place(s.buf, pad(hz(note), seconds, level, attack=1.2, release=1.6), 0.0, 1.0, pan)
    n = n_of(seconds)
    place(s.buf, noise(n, 1800, 5200, rng, -3) * _slow(rng, n, 0.3, 0.8) * 0.07 * edges(np.ones(n), 0.8, 0.8), 0.0)
    return s.buf


@mood("hope", "he thinks he has found what he was looking for: warm, open, rising. Before the turn", 84, -1.0)
def _mood_hope(seconds, rng):
    s = Seq(seconds, 84, rng)
    bars = [
        (("C3", "G3", "E4"), ("C4", "G4", "E5", "G4"), ("G5", 3.5)),
        (("F2", "C3", "A3"), ("C4", "A4", "F5", "A4"), ("A5", 3.5)),
        (("A2", "E3", "C4"), ("C4", "A4", "E5", "A4"), ("C6", 3.5)),
        (("G2", "D3", "B3"), ("B3", "G4", "D5", "G4"), ("D6", 3.0)),
    ]
    for b in range(s.bars):
        p = s.progress(b)
        low, arp, (spark, when) = bars[b % 4]
        for note in low:
            s.play(pad, note, b, 0, 4, 0.22 + 0.08 * p)
        s.play(bass, low[0], b, 0, 2, 0.36)
        for beat, note in enumerate(arp):
            s.play(keys, note, b, beat, 1, 0.55 + 0.1 * p, -0.2 if beat % 2 else 0.2)
            s.play(keys, arp[(beat + 2) % 4], b, beat + 0.5, 0.5, 0.28, 0.2 if beat % 2 else -0.2)
        s.play(glock, spark, b, when, 1, 0.36, 0.3)
        s.hit(kick(0.24), b, 0)
        for i in range(8):
            s.hit(shaker(rng, 0.14 if i % 2 == 0 else 0.2), b, i * 0.5, 1.0, -0.3)
    return s.buf


@mood("explain", "facts, one after another: a steady light step, soft chords, and a two-note question that keeps being asked. The body of an explainer", 104, -1.0)
def _mood_explain(seconds, rng):
    s = Seq(seconds, 104, rng)
    bars = [
        ("F2", "C3", ("A3", "C4", "F4"), ("A5", "C6")),
        ("C3", "G3", ("G3", "C4", "E4"), ("G5", "C6")),
        ("G2", "D3", ("G3", "B3", "D4"), ("B5", "D6")),
        ("A2", "E3", ("A3", "C4", "E4"), ("C6", "E6")),
    ]
    for b in range(s.bars):
        root, five, chord, (ask, again) = bars[b % 4]
        # The step: a plucked bass on one and three, with the fifth between.
        s.play(pizz, root, b, 0, 1, 0.6)
        s.play(pizz, five, b, 1.5, 0.5, 0.42)
        s.play(pizz, root, b, 2, 1, 0.52)
        s.play(pizz, five, b, 3.5, 0.5, 0.4)
        # Soft chords, off the beat, so there is room under them for a voice.
        for beat in (0.5, 2.5):
            for i, note in enumerate(chord):
                s.play(keys, note, b, beat, 1.0, 0.34, (-0.3, 0.0, 0.3)[i])
        # The question: two notes going up, at the end of every second bar.
        if b % 2 == 1:
            s.play(glock, ask, b, 3, 0.5, 0.3, 0.25)
            s.play(glock, again, b, 3.5, 0.5, 0.34, 0.25)
        s.play(pad, root, b, 0, 4, 0.08)
        s.hit(kick(0.3), b, 0)
        s.hit(kick(0.22), b, 2)
        for i in range(8):
            s.hit(shaker(rng, 0.14 if i % 2 == 0 else 0.24), b, i * 0.5, 1.0, -0.35)
        s.hit(rim(rng, 0.22), b, 1, 1.0, 0.3)
        s.hit(rim(rng, 0.26), b, 3, 1.0, 0.3)
    return s.buf


@mood("wonder", "a power is new and it is wonderful: bright notes running up, bubbling, weightless. The fun before the price", 120, -1.0)
def _mood_wonder(seconds, rng):
    s = Seq(seconds, 120, rng)
    bars = [
        ("D3", ("D4", "F#4", "A4", "D5", "F#5", "A5")),
        ("A2", ("C#4", "E4", "A4", "C#5", "E5", "A5")),
        ("B2", ("D4", "F#4", "B4", "D5", "F#5", "B5")),
        ("G2", ("D4", "G4", "B4", "D5", "G5", "B5")),
    ]
    order = (0, 1, 2, 3, 4, 5, 4, 3)
    for b in range(s.bars):
        p = s.progress(b)
        root, notes = bars[b % 4]
        # Notes running up and half way back, twice a bar: the bubbling.
        for i in range(8):
            s.play(kalimba, notes[order[i]], b, i * 0.5, 0.5, 0.5 + 0.1 * p, -0.3 if i % 2 else 0.3)
        # A bell on top of each climb, a little later each bar.
        s.play(glock, notes[5], b, 2.5, 1, 0.3, 0.2)
        if b % 2 == 1:
            s.play(glock, notes[4], b, 3.5, 0.5, 0.26, -0.2)
        s.play(bass, root, b, 0, 1.5, 0.4)
        s.play(bass, root, b, 2, 1.5, 0.34)
        s.play(pad, root, b, 0, 4, 0.1)
        s.play(pad, notes[2], b, 0, 4, 0.07)
        for beat in range(4):
            s.hit(kick(0.2 + 0.06 * p), b, beat)
        for i in range(8):
            s.hit(shaker(rng, 0.14 if i % 2 == 0 else 0.26), b, i * 0.5, 1.0, -0.35)
    return s.buf


@mood("dark", "the truth, and it is bad: a low note that does not move, and a slow heavy step. The reveal", 60, -1.0)
def _mood_dark(seconds, rng):
    s = Seq(seconds, 60, rng, tail=2.4)
    for note, level, pan in (("A2", 0.5, 0.0), ("E3", 0.4, -0.25), ("A3", 0.3, 0.25), ("C4", 0.22, 0.0)):
        place(s.buf, strings(hz(note), seconds, level, tremolo=0, attack=0.25, release=1.8), 0.0, 1.0, pan)
    place(s.buf, strings(hz("E5"), seconds, 0.12, tremolo=11, depth=0.7, attack=0.8, release=1.5), 0.0, 1.0, 0.4)
    lines = [[("A2", 0, 0.9), ("E3", 1.5, 0.5), ("F3", 2, 0.6), ("E3", 3, 0.45)], [("A2", 0, 0.9), ("C3", 1.5, 0.5), ("B2", 2, 0.6), ("A2", 3, 0.45)]]
    for b in range(s.bars):
        for note, beat, vel in lines[b % 2]:
            s.play(keys, note, b, beat, 1.4, vel * 0.8)
        s.hit(kick(0.4, 50.0, 55.0, 0.24), b, 0)
        s.hit(kick(0.26, 50.0, 55.0, 0.2), b, 2)
        if b % 2 == 1:
            s.play(glock, "E6", b, 2.5, 2, 0.16, -0.35)  # one high cold note over the low ones
    return s.buf


@mood("sad", "understanding it, too late: slow broken chords and four notes of a tune. The truth sinking in", 72, -1.0)
def _mood_sad(seconds, rng):
    s = Seq(seconds, 72, rng, tail=2.2)
    bars = [
        (("A2", "E3", "A3", "C4", "E4", "C4"), [("E5", 0, 2), ("D5", 2, 1), ("C5", 3, 1)]),
        (("F2", "C3", "F3", "A3", "C4", "A3"), [("C5", 0, 2), ("A4", 2, 2)]),
        (("C3", "G3", "C4", "E4", "G4", "E4"), [("E5", 0, 2), ("G5", 2, 2)]),
        (("G2", "D3", "G3", "B3", "D4", "B3"), [("D5", 0, 3)]),
    ]
    for b in range(s.bars):
        broken, tune = bars[b % 4]
        for beat, note in zip((0, 0.5, 1, 1.5, 2, 3), broken):
            s.play(keys, note, b, beat, 1.5, 0.55 if beat == 0 else 0.36, -0.15)
        for note, beat, length in tune:
            s.play(glock, note, b, beat, length, 0.3, 0.25)
            s.play(keys, note, b, beat, length, 0.34, 0.25)
        s.play(pad, broken[0], b, 0, 4, 0.14)
        s.play(pad, broken[2], b, 0, 4, 0.09)
    return s.buf


@mood("none", "no music. Silence is a sound too: use it for the second before the reveal", 60)
def _mood_none(seconds, rng):
    return np.zeros((n_of(seconds), 2))


# ============================================================================= files
def ffmpeg_exe() -> str:
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        sys.exit("ffmpeg not found. Install ffmpeg, or:  pip install imageio-ffmpeg")


def decode(path: str):
    """Any audio file -> mono float samples at SR."""
    raw = subprocess.run([ffmpeg_exe(), "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True)
    if raw.returncode != 0:
        sys.exit(f"ffmpeg could not read {path}: {raw.stderr.decode(errors='replace')[:300]}")
    return np.frombuffer(raw.stdout, dtype="<f4").astype(float)


def encode(buf, path: str):
    """Stereo float samples -> mp3 (or wav, by extension)."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    codec = ["-c:a", "pcm_s16le"] if path.endswith(".wav") else ["-b:a", "192k"]
    data = np.clip(buf, -1.0, 1.0).astype("<f4").tobytes()
    run = subprocess.run([ffmpeg_exe(), "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", *codec, path], input=data, capture_output=True)
    if run.returncode != 0:
        sys.exit(f"ffmpeg could not write {path}: {run.stderr.decode(errors='replace')[:300]}")


def _read_meter(text: str):
    text = text[text.rfind("Summary:") :] if "Summary:" in text else ""
    lufs = re.search(r"I:\s*(-?[\d.]+) LUFS", text)
    peak = re.search(r"Peak:\s*(-?[\d.]+) dBFS", text)
    return (float(lufs.group(1)) if lufs else None, float(peak.group(1)) if peak else None)


def loudness(path: str):
    """(integrated LUFS, true peak dB) of a file, as the broadcast meter (EBU R128) reads it."""
    run = subprocess.run([ffmpeg_exe(), "-nostats", "-i", path, "-filter_complex", "ebur128=peak=true", "-f", "null", "-"], capture_output=True)
    return _read_meter(run.stderr.decode(errors="replace"))


def lufs_of(buf):
    """The same meter, for stereo samples in memory."""
    data = np.clip(buf, -4.0, 4.0).astype("<f4").tobytes()
    run = subprocess.run([ffmpeg_exe(), "-nostats", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-filter_complex", "ebur128=peak=true", "-f", "null", "-"], input=data, capture_output=True)
    return _read_meter(run.stderr.decode(errors="replace"))


def text_hash(path: str) -> str:
    """Hash of a text file that does not change when git changes its line endings."""
    with open(path, encoding="utf8") as fh:
        return hashlib.sha1(fh.read().replace("\r\n", "\n").strip().encode("utf8")).hexdigest()


def file_hash(path: str) -> str:
    with open(path, "rb") as fh:
        return hashlib.sha1(fh.read()).hexdigest()


def paths(film: str) -> dict:
    video = os.path.join(ROOT, "src", "videos", film)
    audio = os.path.join(ROOT, "public", "audio", film)
    return {
        "video": video,
        "timing": os.path.join(video, "timing.json"),
        "sheet": os.path.join(video, "sound.json"),
        "lock": os.path.join(video, "sound.lock.json"),
        "voice": os.path.join(audio, "narration.mp3"),
        "mix": os.path.join(audio, "mix.mp3"),
        "out": os.path.join(ROOT, "out", "sound", film),
    }


def rel(path: str) -> str:
    return os.path.relpath(path, ROOT).replace(os.sep, "/")


def load(film: str):
    p = paths(film)
    if not os.path.exists(p["timing"]):
        sys.exit(f"No {rel(p['timing'])}. Build the narration first: python3 scripts/narration.py build {film}")
    with open(p["timing"], encoding="utf8") as fh:
        timing = json.load(fh)
    return p, timing


# ============================================================================= the sheet
def _bare(word: str) -> str:
    return re.sub(r"[^a-z']", "", word.lower())


class Clock:
    """Turns "cue 3.hmm, word hmm" into seconds, exactly as `wordAt` does in a scene."""

    def __init__(self, timing: dict):
        self.cues = {c["id"]: c for c in timing["cues"]}
        self.order = [c["id"] for c in timing["cues"]]
        self.words = timing["words"]
        self.duration = float(timing["duration"])

    def cue(self, cue_id: str) -> dict:
        if cue_id not in self.cues:
            near = [c for c in self.order if c.split(".")[0] == str(cue_id).split(".")[0]]
            raise SheetError(f'no cue "{cue_id}" in timing.json' + (f" (scene {str(cue_id).split('.')[0]} has: {', '.join(near)})" if near else ""))
        return self.cues[cue_id]

    def when(self, entry: dict) -> float:
        cue = self.cue(entry["cue"])
        t = cue["start"]
        if "word" in entry:
            want, nth, seen = _bare(entry["word"]), int(entry.get("nth", 0)), 0
            found = None
            for w in self.words:
                if w["s"] < cue["start"] - 0.05 or w["s"] >= cue["end"]:
                    continue
                if _bare(w["w"]) == want:
                    if seen == nth:
                        found = w["s"]
                        break
                    seen += 1
            if found is None:
                raise SheetError(f'cue "{entry["cue"]}" has no word "{entry["word"]}" (#{nth}). Its words: {cue["text"]}')
            t = found
        if "p" in entry:
            t = cue["start"] + float(entry["p"]) * (cue["end"] - cue["start"])
        return t + float(entry.get("at", 0.0))


class SheetError(Exception):
    pass


def read_sheet(p: dict, clock: Clock) -> dict:
    if not os.path.exists(p["sheet"]):
        sys.exit(f"No {rel(p['sheet'])}. Start one with: python3 scripts/sound.py draft {os.path.basename(p['video'])}")
    with open(p["sheet"], encoding="utf8") as fh:
        try:
            sheet = json.load(fh)
        except json.JSONDecodeError as error:
            sys.exit(f"{rel(p['sheet'])} is not valid JSON: {error}")
    problems = []

    music = sheet.get("music", {})
    sections = []
    for i, part in enumerate(music.get("sections", [])):
        try:
            if part.get("mood") not in MOODS:
                raise SheetError(f'unknown mood "{part.get("mood")}". Moods: {", ".join(MOODS)}')
            sections.append({**part, "t": clock.cue(part["from"])["start"] + float(part.get("at", 0.0))})
        except (SheetError, KeyError) as error:
            problems.append(f"music.sections[{i}]: {error}")
    for a, b in zip(sections, sections[1:]):
        if b["t"] <= a["t"]:
            problems.append(f'music: section "{b["from"]}" does not come after "{a["from"]}"')
    if sections and sections[0]["t"] > 0.01:
        problems.append(f'music: the first section must start on the first cue ("{clock.order[0]}"). Use mood "none" for silence.')

    beds = []
    for i, part in enumerate(sheet.get("beds", [])):
        try:
            if part.get("bed") not in BEDS:
                raise SheetError(f'unknown bed "{part.get("bed")}". Beds: {", ".join(BEDS)}')
            start = clock.cue(part["from"])["start"]
            end = clock.cue(part.get("to", part["from"]))["end"]
            if end <= start:
                raise SheetError(f'"to" ({part.get("to")}) is before "from" ({part["from"]})')
            beds.append({**part, "t": start, "end": end})
        except (SheetError, KeyError) as error:
            problems.append(f"beds[{i}]: {error}")

    effects = []
    for i, part in enumerate(sheet.get("sfx", [])):
        try:
            if part.get("sfx") not in SFX:
                raise SheetError(f'unknown sfx "{part.get("sfx")}". Run: python3 scripts/sound.py list')
            t = clock.when(part)
            for k in range(int(part.get("repeat", 1))):
                one = {**part, "t": t + k * float(part.get("every", 0.3)), "n": k, "i": i}
                if "pitchStep" in part:
                    one["pitch"] = float(part.get("pitch", 1.0)) * float(part["pitchStep"]) ** k
                effects.append(one)
        except (SheetError, KeyError) as error:
            problems.append(f"sfx[{i}] ({part.get('cue', '?')}): {error}")

    if problems:
        sys.exit(f"{rel(p['sheet'])} has {len(problems)} problem(s):\n  " + "\n  ".join(problems))
    return {"music": music, "sections": sections, "beds": beds, "sfx": effects, "raw": sheet}


# ============================================================================= the mix
# The voice arrives from narration.py at about -14.4 LUFS (as a mono file played on two speakers). The mix keeps
# it there: raising it further only presses it against the limiter. The topic's reference video measures -13.6.
TARGET_LUFS = -14.5
TRUE_PEAK_DB = -0.5  # the finished file never reads higher than this on a true-peak meter (the voice alone reads -0.5)
BRIGHTEN_DB = 8.0  # how much the music bus is lifted above 1 kHz
BURIED_DB = 0.0  # an effect that is not even level with the music and beds under it cannot be heard
COVERED_DB = 3.0  # the voice must be this far over everything else in every half second it speaks


def voice_levels(voice):
    """The voice, measured once: as heard; its level while speaking; which 20 ms frames are speech; the loudest it gets."""
    as_heard = heard(voice)
    frames = rms_frames(as_heard, 0.02)
    speaking = frames > np.percentile(frames, 95) * 0.1
    level = math.sqrt(float(np.mean(frames[speaking] ** 2)))
    return {"heard": as_heard, "level": level, "speaking": speaking, "peak": float(np.percentile(np.abs(voice), 99.99))}


def render(film: str, clock: Clock, sheet: dict, vox: dict):
    """
    Build the music, the beds and the effects. All stereo, all exactly as long as the film, and
    all set against the voice: `gain` on anything is dB against the voice as it speaks.
    """
    total = n_of(clock.duration)
    v_level, speaking, v_peak = vox["level"], vox["speaking"], vox["peak"]

    # ---- music: one mood per section, each starting on its own first beat, on a cut
    music = np.zeros((total + SR * 3, 2))
    sections = sheet["sections"]
    music_gain = float(sheet["music"].get("gain", -16.0))
    for i, part in enumerate(sections):
        end = sections[i + 1]["t"] if i + 1 < len(sections) else clock.duration
        spec = MOODS[part["mood"]]
        if part["mood"] == "none" or end - part["t"] < 0.05:
            continue
        seconds = end - part["t"]
        y = spec["fn"](seconds, rng_for(film, "music", i, part["mood"]))
        # Sums of sines are all hum and no air. Lift everything over about 1 kHz, as an instrument's body would.
        y = shape(y, lambda f: 1.0 + (db(BRIGHTEN_DB) - 1.0) / (1.0 + (900.0 / np.maximum(f, 1.0)) ** 2))
        frames = rms_frames(heard(y[: n_of(seconds)]), 0.05)
        level = math.sqrt(float(np.mean(frames[frames > frames.max() * 0.05] ** 2))) if frames.max() > 0 else 1.0
        y = y * (v_level * db(music_gain + spec["trim"] + float(part.get("gain", 0.0))) / max(level, 1e-9))
        # It stops just after the next section starts: a quick fade, so two moods never play over each other for long.
        last = i + 1 == len(sections)
        keep = min(len(y), n_of(seconds + (0.0 if last else 0.5)))
        y = y[:keep].copy()
        out = min(keep, n_of(0.5 if last else 0.45))  # the last section fades with the film
        y[-out:] *= np.linspace(1.0, 0.0, out)[:, None] ** 1.5
        y[: n_of(0.012)] *= np.linspace(0.0, 1.0, n_of(0.012))[:, None]
        place(music, y, part["t"])
    music = reverb(music, 1.1, 0.16, 300, 6000, 3)[:total]
    music = filt(music, 60, 13000, 2)
    music = tilt_eq(music, 2200.0, -3.0, 0.9)  # a pocket where the voice lives
    # The music steps back a little while the voice is speaking, and comes up in a real pause.
    duck = float(sheet["music"].get("duck", 2.0))
    smooth = np.convolve(speaking.astype(float), np.ones(35) / 35, mode="same")
    curve = np.interp(np.arange(total) / SR, (np.arange(len(smooth)) + 0.5) * 0.02, smooth)
    music = music * db(-duck * curve)[:, None]

    # ---- beds: the air of each place
    beds = np.zeros((total, 2))
    for i, part in enumerate(sheet["beds"]):
        spec = BEDS[part["bed"]]
        seconds = part["end"] - part["t"]
        y = spec["fn"](rng_for(film, "bed", i, part["bed"]), seconds + 0.3)
        level = math.sqrt(float(np.mean(heard(y) ** 2))) or 1.0
        gain = float(part.get("gain", spec["gain"])) + float(part.get("trim", 0.0))
        y = edges(y * (v_level * db(gain) / level), min(0.25, seconds / 3), min(0.3, seconds / 3))
        place(beds, y, part["t"] - 0.05)
    beds = beds * db(float(sheet["raw"].get("bedsGain", 0.0)))

    # ---- effects: each one measured, set against the voice, and put on its word
    effects = np.zeros((total + SR * 3, 2))
    placed = []
    all_gain = float(sheet["raw"].get("sfxGain", 0.0))
    for part in sheet["sfx"]:
        spec = SFX[part["sfx"]]
        params = {k: v for k, v in part.items() if k in ("dur", "pitch", "note", "f", "ring", "lo", "hi")}
        y = edges(norm(spec["fn"](rng_for(film, "sfx", part["i"], part["n"], part["sfx"]), **params)), 0.0004, 0.02)
        as_heard, offset = loudest(heard(y))
        whole, _ = loudest(y.mean(axis=1) if y.ndim == 2 else y)
        # A thud is mostly below what a phone plays. Measured only "as heard" it would be turned up until it
        # shook a pair of headphones, so its whole level counts too, 4 dB down.
        level = max(as_heard, whole * db(-4.0))
        gain = float(part.get("gain", spec["gain"])) + float(part.get("trim", 0.0)) + all_gain
        scale = v_level * db(gain) / max(level, 1e-9)
        capped = False
        if scale > v_peak * db(-1.0):  # never a louder sample than the voice's own loudest
            scale, capped = v_peak * db(-1.0), True
        seconds = len(y) / SR
        align = part.get("align", spec["align"])
        start = part["t"] - (seconds if align == "end" else seconds / 2 if align == "center" else 0.0)
        place(effects, y, start, scale, float(part.get("pan", 0.0)))
        placed.append({
            "t": part["t"], "start": max(0.0, start), "seconds": seconds, "sfx": part["sfx"], "cue": part["cue"], "gain": gain,
            "capped": capped, "level": as_heard * scale, "loudAt": max(0.0, start) + offset / SR,
        })
    effects = filt(reverb(effects, 0.8, 0.1, 350, 7000, 5)[:total], 45, None, 2)
    return music, beds, effects, placed


def measure(clock: Clock, vox: dict, music, beds, effects, placed):
    """Numbers an agent can read in place of listening. Every level is 'as heard' (see `heard`)."""

    def cue_at(t):
        for cue_id in clock.order:
            c = clock.cues[cue_id]
            if c["start"] <= t < c["end"]:
                return cue_id
        return clock.order[-1]

    v, v_level, speaking = vox["heard"], vox["level"], vox["speaking"]
    music_heard, beds_heard, fx = heard(music), heard(beds), heard(effects)
    under = music_heard + beds_heard
    hop = n_of(0.02)
    k = min(len(speaking), len(v) // hop)
    square = lambda x: (x[: k * hop].reshape(k, hop) ** 2).sum(axis=1)  # noqa: E731
    ev, eo = square(v), square(under + fx)

    # The words against everything else, half a second at a time, counting only the moments he is speaking.
    margins = []
    for a in range(0, k - 25, 12):
        on = speaking[a : a + 25]
        if on.sum() < 8:
            continue
        margins.append((10 * math.log10(max(ev[a : a + 25][on].sum(), 1e-12) / max(eo[a : a + 25][on].sum(), 1e-12)), a * 0.02))
    worst = []
    for m, t in sorted(margins):  # the worst half seconds, without counting one moment twice
        if all(abs(t - other) >= 0.5 for _, other in worst):
            worst.append((m, t))
        if len(worst) == 6:
            break

    def sounding(t):
        return sorted({e["sfx"] for e in placed if e["start"] < t + 0.5 and e["start"] + e["seconds"] > t})

    # Each effect against what is under it at that instant.
    c_under = np.concatenate([[0.0], np.cumsum(under**2)])
    w = n_of(0.1)
    for e in placed:
        a = int(e["loudAt"] * SR)
        e["overDb"] = round(to_db(e["level"]) - to_db(window_level(c_under, a, a + w)), 1)
        e["cueAt"] = cue_at(e["t"])
    buried = [e for e in placed if e["overDb"] < BURIED_DB]

    music_frames = rms_frames(music_heard, 0.05)
    music_on = music_frames > max(music_frames.max() * 0.05, 1e-7)
    m_speaking = np.repeat(speaking, 5)[::2][: len(music_frames)]  # 20 ms frames onto 50 ms frames
    m_speaking = np.concatenate([m_speaking, np.zeros(len(music_frames) - len(m_speaking), dtype=bool)])
    both = music_on & m_speaking
    music_level = math.sqrt(float(np.mean(music_frames[both] ** 2))) if both.any() else 0.0
    bed_frames = rms_frames(beds_heard, 0.05)
    bed_on = bed_frames > 1e-7
    bed_level = math.sqrt(float(np.mean(bed_frames[bed_on] ** 2))) if bed_on.any() else 0.0

    times = sorted(e["t"] for e in placed)
    gaps = [(b - a, a) for a, b in zip([0.0] + times, times + [clock.duration])]
    longest = max(gaps) if gaps else (clock.duration, 0.0)
    return {
        "musicUnderVoiceDb": round(to_db(v_level) - to_db(music_level), 1) if music_level else None,
        "secondsWithoutMusic": round(float(np.sum(~music_on)) * 0.05, 1),
        "bedsUnderVoiceDb": round(to_db(v_level) - to_db(bed_level), 1) if bed_level else None,
        "sfx": len(placed),
        "sfxPerMinute": round(len(placed) * 60.0 / clock.duration, 1),
        "sfxKinds": len({e["sfx"] for e in placed}),
        "longestGapSeconds": round(longest[0], 1),
        "longestGapAt": round(longest[1], 1),
        "sfxBuried": len(buried),
        "voiceOverRestMedianDb": round(float(np.median([m for m, _ in margins])), 1) if margins else None,
        "voiceOverRestWorstDb": round(worst[0][0], 1) if worst else None,
        "voiceOverRestWorst": [{"db": round(m, 1), "t": round(t, 1), "cue": cue_at(t), "sounding": sounding(t)} for m, t in worst],
    }


def timeline(path: str, clock: Clock, voice, music, beds, effects, placed, sheet):
    """The mix as a picture: voice, music, beds and every effect, against the cuts."""
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        return None
    per_row = 30.0
    rows = int(math.ceil(clock.duration / per_row))
    width, row_h, left = 2400, 300, 16
    scale = (width - 2 * left) / per_row
    img = Image.new("RGB", (width, rows * row_h + 20), "#14161c")
    d = ImageDraw.Draw(img)
    hop = 0.02
    tracks = [(voice, "#f2f2f2", 78, 34, "voice"), (music, "#5aa9ff", 150, 30, "music"), (beds, "#62c370", 196, 14, "beds"), (effects, "#ffb347", 244, 30, "sfx")]
    envs = [(rms_frames(x, hop), colour, mid, half, name) for x, colour, mid, half, name in tracks]
    top_voice = max(float(envs[0][0].max()), 1e-9)
    for r in range(rows):
        y0 = r * row_h + 10
        t0 = r * per_row
        for cue_id in clock.order:
            c = clock.cues[cue_id]
            if t0 <= c["start"] < t0 + per_row:
                x = left + (c["start"] - t0) * scale
                new_scene = cue_id.split(".")[1:] and clock.order.index(cue_id) > 0 and clock.order[clock.order.index(cue_id) - 1].split(".")[0] != cue_id.split(".")[0]
                d.line([(x, y0 + 26), (x, y0 + row_h - 12)], fill="#5b6070" if new_scene else "#2c303b", width=2 if new_scene else 1)
                d.text((x + 2, y0 + 12 + 10 * (clock.order.index(cue_id) % 2)), cue_id, fill="#9aa0b0")
        for s in range(int(t0), int(min(t0 + per_row, clock.duration)) + 1):
            x = left + (s - t0) * scale
            d.line([(x, y0), (x, y0 + (8 if s % 5 == 0 else 4))], fill="#9aa0b0")
            if s % 5 == 0:
                d.text((x + 3, y0 - 2), f"{s}s", fill="#9aa0b0")
        for env, colour, mid, half, name in envs:
            ref = top_voice if name == "voice" else top_voice * 0.5
            a, b = int(t0 / hop), min(len(env), int((t0 + per_row) / hop))
            for i in range(a, b):
                x = left + (i * hop - t0) * scale
                h = min(half, half * (env[i] / ref) ** 0.6)
                if h >= 0.5:
                    d.line([(x, y0 + mid - h), (x, y0 + mid + h)], fill=colour)
            d.text((left, y0 + mid - half - 11), name, fill=colour)
        for part in sheet["sections"]:
            if t0 <= part["t"] < t0 + per_row:
                x = left + (part["t"] - t0) * scale
                d.rectangle([x, y0 + 112, x + 7 * len(part["mood"]) + 8, y0 + 124], fill="#1d3a5c")
                d.text((x + 4, y0 + 112), part["mood"], fill="#cfe6ff")
        for part in sheet["beds"]:
            if part["t"] < t0 + per_row and part["end"] > t0:
                x1 = left + (max(part["t"], t0) - t0) * scale
                x2 = left + (min(part["end"], t0 + per_row) - t0) * scale
                d.line([(x1, y0 + 214), (x2 - 3, y0 + 214)], fill="#62c370", width=2)
                d.text((x1 + 3, y0 + 215), part["bed"], fill="#a8e0b0")
        lane = 0
        for e in sorted(placed, key=lambda e: e["t"]):
            if t0 <= e["t"] < t0 + per_row:
                x = left + (e["t"] - t0) * scale
                d.line([(x, y0 + 262), (x, y0 + 268 + 10 * (lane % 3))], fill="#ffb347")
                d.text((x + 2, y0 + 264 + 10 * (lane % 3)), e["sfx"], fill="#ffd9a0")
                lane += 1
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    return path


def master(mix, ceiling_db: float):
    """Bring the whole mix to the target loudness, and hold every peak under the ceiling."""
    before, _ = lufs_of(mix)
    if before is None:
        out, gain = limit(mix, ceiling_db)
        return out, 0.0, gain
    lift = TARGET_LUFS - before
    out, gain = limit(mix * db(lift), ceiling_db)
    after, _ = lufs_of(out)
    if after is not None and abs(TARGET_LUFS - after) > 0.15:  # the limiter took a little off: put it back, once
        lift += TARGET_LUFS - after
        out, gain = limit(mix * db(lift), ceiling_db)
    tail = n_of(0.05)
    out[-tail:] *= np.linspace(1.0, 0.0, tail)[:, None]
    return out, lift, gain


def effects_table(path: str, placed):
    """Every effect, and how far it stands over the music and beds under it."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf8") as fh:
        fh.write("gain: dB against the voice.  over: dB over the music and beds playing under it; under 0 it cannot be heard.\n\n")
        fh.write("   time  cue          effect        gain    over\n")
        for e in sorted(placed, key=lambda e: e["t"]):
            flag = "  BURIED" if e["overDb"] < BURIED_DB else "  faint" if e["overDb"] < BURIED_DB + 3 else ""
            fh.write(f"{e['t']:7.2f}  {e['cueAt']:<12} {e['sfx']:<12} {e['gain']:5.0f}  {e['overDb']:+6.1f}{' (held at the peak cap)' if e['capped'] else ''}{flag}\n")


def report(film: str, m: dict, placed, lufs, peak, lift: float, gain) -> list[str]:
    """Print the numbers. Returns the list of failures."""
    fails = []
    print(f"\n{film}: the mix, in numbers. Levels are as a phone plays them, against the voice.")
    if m["musicUnderVoiceDb"] is None:
        print("  music      none")
    else:
        print(f"  music      {m['musicUnderVoiceDb']:.1f} dB under the voice while it speaks. No music for {m['secondsWithoutMusic']:.1f}s of the film.")
    if m["bedsUnderVoiceDb"] is not None:
        print(f"  beds       {m['bedsUnderVoiceDb']:.1f} dB under the voice")
    print(f"  effects    {m['sfx']} ({m['sfxPerMinute']:.0f} a minute, {m['sfxKinds']} kinds). Longest stretch with none: {m['longestGapSeconds']:.1f}s, from {m['longestGapAt']:.1f}s.")
    buried = sorted((e for e in placed if e["overDb"] < BURIED_DB), key=lambda e: e["overDb"])
    if buried:
        print(f"             {len(buried)} cannot be heard: they are under the music and the beds. Raise them (\"trim\": 3) or cut them:")
        for e in buried[:10]:
            print(f"               {e['t']:6.1f}s [{e['cueAt']}] {e['sfx']}: {abs(e['overDb']):.1f} dB under")
    if m["voiceOverRestMedianDb"] is not None:
        print(f"  the words  the voice is {m['voiceOverRestMedianDb']:.1f} dB over everything else (median). The worst half seconds:")
        for w in m["voiceOverRestWorst"][:5]:
            print(f"               {w['db']:5.1f} dB at {w['t']:5.1f}s [{w['cue']}]  {', '.join(w['sounding'])}")
        if m["voiceOverRestWorstDb"] < COVERED_DB:
            w = m["voiceOverRestWorst"][0]
            fails.append(f"at {w['t']}s [{w['cue']}] the words are covered: the voice is only {w['db']} dB over the rest ({', '.join(w['sounding']) or 'music'}). Turn that down, or move it off the words.")
        if m["voiceOverRestMedianDb"] < 10.0:
            fails.append(f"the voice is only {m['voiceOverRestMedianDb']} dB over the rest on average. Turn the music down (music.gain).")
    if lufs is not None:
        cut = abs(to_db(float(gain.min())))
        busy = 100.0 * float(np.mean(gain < db(-1.0)))
        print(f"  the file   {lufs:.1f} LUFS, true peak {peak:.1f} dB. Raised {lift:+.1f} dB; the limiter took off at most {cut:.1f} dB, and over 1 dB for {busy:.1f}% of the film.")
        if peak is not None and peak > TRUE_PEAK_DB + 0.5:
            fails.append(f"the file peaks at {peak:.1f} dB: too close to clipping")
        if cut > 8.0:
            fails.append(f"the limiter is taking {cut:.1f} dB off somewhere: something is far too loud")
    return fails


def stale(p: dict) -> list[str]:
    """What has changed since the mix was built, according to sound.lock.json."""
    if not os.path.exists(p["lock"]):
        return ["there is no sound.lock.json"]
    with open(p["lock"], encoding="utf8") as fh:
        lock = json.load(fh)
    changed = []
    for name, path, fn in (("timing.json", p["timing"], text_hash), ("sound.json", p["sheet"], text_hash), ("narration.mp3", p["voice"], file_hash)):
        if lock.get("built_from", {}).get(name) != fn(path):
            changed.append(f"{name} changed after the mix was built")
    if not os.path.exists(p["mix"]):
        changed.append("mix.mp3 is missing")
    elif lock.get("mix_sha1") != file_hash(p["mix"]):
        changed.append("mix.mp3 is not the file the lock describes")
    return changed


def build(film: str, stems: bool, check_only: bool = False) -> int:
    p, timing = load(film)
    clock = Clock(timing)
    sheet = read_sheet(p, clock)
    if not os.path.exists(p["voice"]):
        sys.exit(f"No {rel(p['voice'])}. Record the voice and run: python3 scripts/narration.py build {film}")
    total = n_of(clock.duration)
    voice_mono = decode(p["voice"])
    voice_mono = np.concatenate([voice_mono, np.zeros(max(0, total - len(voice_mono)))])[:total]
    voice = np.stack([voice_mono, voice_mono], axis=1)

    vox = voice_levels(voice)
    music, beds, effects, placed = render(film, clock, sheet, vox)
    m = measure(clock, vox, music, beds, effects, placed)
    unmastered = voice + music + beds + effects

    if check_only:
        _, lift, gain = master(unmastered, -2.0)
        lufs, peak = loudness(p["mix"]) if os.path.exists(p["mix"]) else (None, None)
        fails = report(film, m, placed, lufs, peak, lift, gain) + stale(p)
    else:
        # mp3 puts back a little of what a limiter takes off, so the ceiling comes down until the file itself reads right.
        ceiling = -2.0
        for _ in range(4):
            mix, lift, gain = master(unmastered, ceiling)
            encode(mix, p["mix"])
            lufs, peak = loudness(p["mix"])
            if peak is None or peak <= TRUE_PEAK_DB:
                break
            ceiling -= peak - TRUE_PEAK_DB + 0.1
        fails = report(film, m, placed, lufs, peak, lift, gain)
        lock = {
            "tool": f"scripts/sound.py v{VERSION}",
            "film": film,
            "mix": rel(p["mix"]),
            "seconds": round(clock.duration, 4),
            "built_from": {"timing.json": text_hash(p["timing"]), "sound.json": text_hash(p["sheet"]), "narration.mp3": file_hash(p["voice"])},
            "mix_sha1": file_hash(p["mix"]),
            "music_sections": [{"from": s["from"], "mood": s["mood"], "at": round(s["t"], 2)} for s in sheet["sections"]],
            "beds": len(sheet["beds"]),
            "measured": {**m, "lufs": lufs, "truePeakDb": peak, "limiterMaxDb": round(abs(to_db(float(gain.min()))), 1)},
            "failures": fails,
        }
        with open(p["lock"], "w", encoding="utf8") as fh:
            json.dump(lock, fh, indent=2)
            fh.write("\n")
        print(f"\n  wrote {rel(p['mix'])}  ({os.path.getsize(p['mix']) / 1e6:.1f} MB)\n  wrote {rel(p['lock'])}")
        if stems:
            for name, x in (("voice", voice), ("music", music), ("beds", beds), ("sfx", effects)):
                encode(x * db(lift), os.path.join(p["out"], f"{name}.wav"))
            print(f"  wrote stems to {rel(p['out'])}/")
    effects_table(os.path.join(p["out"], "effects.txt"), placed)
    print(f"  wrote {rel(os.path.join(p['out'], 'effects.txt'))}: every effect, and whether it can be heard")
    picture = timeline(os.path.join(p["out"], "timeline.png"), clock, voice, music, beds, effects, placed, sheet)
    if picture:
        print(f"  wrote {rel(picture)}: the mix as a picture. Look at it")
    if fails:
        print("\nFAIL")
        for line in fails:
            print(f"  ✗ {line}")
        return 1
    print("\nOK by the numbers. Nobody has LISTENED to this: an agent cannot. Say so when you hand the film over.")
    return 0


# ============================================================================= draft
def scene_table(video_dir: str) -> dict:
    """cue id -> (zone, look), read from the scene files as text."""
    table = {}
    for name in sorted(os.listdir(video_dir)):
        if not re.fullmatch(r"scene\d+\.tsx", name):
            continue
        with open(os.path.join(video_dir, name), encoding="utf8") as fh:
            src = fh.read()
        parts = re.split(r'\bcue:\s*"([^"]+)"', src)
        for i in range(1, len(parts) - 1, 2):
            body = parts[i + 1]
            zone = re.search(r'\bzone:\s*"([^"]+)"', body)
            look = re.search(r'\blook:\s*"([^"]+)"', body)
            table[parts[i]] = (zone.group(1) if zone else None, look.group(1) if look else None)
    return table


def topic_sound(video_dir: str) -> dict:
    """The `sound` block of the film's topic.json, if the film names a topic. `guide` is the topic's page on sound."""
    film_file = os.path.join(video_dir, "film.tsx")
    if not os.path.exists(film_file):
        return {}
    with open(film_file, encoding="utf8") as fh:
        m = re.search(r'\btopic:\s*"([^"]+)"', fh.read())
    topics = os.path.join(ROOT, "Topics")
    if not m or not os.path.isdir(topics):
        return {}
    for folder in os.listdir(topics):
        path = os.path.join(topics, folder, "topic.json")
        if os.path.exists(path):
            with open(path, encoding="utf8") as fh:
                topic = json.load(fh)
            if topic.get("id") == m.group(1):
                return topic.get("sound", {})
    return {}


def draft(film: str, force: bool) -> int:
    p, timing = load(film)
    if os.path.exists(p["sheet"]) and not force:
        sys.exit(f"{rel(p['sheet'])} exists. Edit it, or pass --force to start again.")
    clock = Clock(timing)
    table = scene_table(p["video"])
    rules = topic_sound(p["video"])
    by_look, by_zone = rules.get("bedForLook", {}), rules.get("bedForZone", {})
    guide = f"Read {rules['guide']} first." if rules.get("guide") else "The format is at the top of scripts/sound.py."

    beds, run = [], None
    for cue_id in clock.order:
        zone, look = table.get(cue_id, (None, None))
        name = by_look.get(look) or by_zone.get((zone or "").split("+")[0]) or rules.get("bedDefault")
        if run and run["bed"] == name:
            run["to"] = cue_id
            continue
        run = {"from": cue_id, "to": cue_id, "bed": name} if name else None
        if run:
            beds.append(run)

    effects, last_scene = [], None
    for cue_id in clock.order:
        scene = cue_id.split(".")[0]
        if last_scene is not None and scene != last_scene:
            effects.append({"cue": cue_id, "sfx": "whoosh", "why": f"scene {scene} starts: a new place or a new time"})
        last_scene = scene
    effects.append({"cue": clock.order[-1], "sfx": "ding", "why": "the subscribe line"})

    sheet = {
        "film": film,
        "README": f"The sound sheet. {guide} Times are cues and words, never seconds. Then: python3 scripts/sound.py build {film}",
        "music": {
            "gain": -16,
            "sections": [{"from": clock.order[0], "mood": rules.get("moodDefault", "town") if rules.get("moodDefault", "town") in MOODS else "town", "why": "TODO: one section per act. `python3 scripts/sound.py list` shows the moods."}],
        },
        "beds": beds,
        "sfx": effects,
    }
    with open(p["sheet"], "w", encoding="utf8") as fh:
        json.dump(sheet, fh, indent=2)
        fh.write("\n")
    print(f"Wrote {rel(p['sheet'])}: 1 music section, {len(beds)} beds from the zones, {len(effects)} effects on the scene changes.")
    print("It is a start, not a soundtrack. Add the music sections act by act, and an effect for every thing that")
    print(f"happens on screen. {guide} Then: python3 scripts/sound.py build {film}")
    return 0


# ============================================================================= list and demo
def listing() -> int:
    print("MUSIC MOODS  (sound.json: music.sections[].mood)")
    for name, spec in MOODS.items():
        print(f"  {name:<12} {spec['about']}")
    print("\nBEDS  (sound.json: beds[].bed)   the air of a place, under a run of shots. dB is against the voice")
    for name, spec in BEDS.items():
        print(f"  {name:<12} {spec['gain']:>4.0f} dB  {spec['about']}")
    print("\nEFFECTS  (sound.json: sfx[].sfx)   dB is against the voice: 0 is as loud as the voice, -10 is clear, under -18 is lost")
    for name, spec in SFX.items():
        where = {"start": "", "center": "  [centred on its time]", "end": "  [ends on its time]"}[spec["align"]]
        print(f"  {name:<12} {spec['gain']:>4.0f} dB  {spec['about']}{where}")
    print(f"\n{len(MOODS)} moods, {len(BEDS)} beds, {len(SFX)} effects.")
    return 0


def demo() -> int:
    """Every sound in one file, with an index, so a person can listen to the whole library in two minutes."""
    out_dir = os.path.join(ROOT, "out", "sound", "demo")
    os.makedirs(out_dir, exist_ok=True)
    pieces, index, t = [], [], 0.0

    def add(label, y, gain_db):
        nonlocal t
        if y.ndim == 1:
            y = np.stack([y, y], axis=1)
        y = norm(y) * db(gain_db)
        index.append(f"{int(t // 60)}:{t % 60:04.1f}  {label}")
        pieces.append(y)
        pieces.append(np.zeros((n_of(0.35), 2)))
        t += len(y) / SR + 0.35

    for name, spec in MOODS.items():
        if name == "none":
            continue
        y = spec["fn"](8.0, rng_for("demo", name))
        add(f"mood   {name}", reverb(y[: n_of(8.6)], 1.1, 0.16), -9)
    for name, spec in BEDS.items():
        add(f"bed    {name}", edges(spec["fn"](rng_for("demo", name), 4.0), 0.2, 0.3), -14)
    for name, spec in SFX.items():
        y = spec["fn"](rng_for("demo", name))
        if y.ndim == 1:
            y = np.stack([y, y], axis=1)
        add(f"sfx    {name}", reverb(np.concatenate([y, np.zeros((n_of(0.5), 2))]), 0.8, 0.1), -6)
    encode(np.concatenate(pieces), os.path.join(out_dir, "library.mp3"))
    with open(os.path.join(out_dir, "library.txt"), "w", encoding="utf8") as fh:
        fh.write("\n".join(index) + "\n")
    print(f"Wrote out/sound/demo/library.mp3 ({t:.0f}s) and library.txt, its index.")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Music and sound effects for story films, made in Python.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("list")
    sub.add_parser("demo")
    d = sub.add_parser("draft")
    d.add_argument("film")
    d.add_argument("--force", action="store_true")
    b = sub.add_parser("build")
    b.add_argument("film")
    b.add_argument("--stems", action="store_true", help="also write voice, music, beds and sfx as wav files in out/sound/<film>/")
    c = sub.add_parser("check")
    c.add_argument("film")
    args = ap.parse_args()
    if args.cmd == "list":
        return listing()
    if args.cmd == "demo":
        return demo()
    if args.cmd == "draft":
        return draft(args.film, args.force)
    if args.cmd == "build":
        return build(args.film, args.stems)
    return build(args.film, False, check_only=True)


if __name__ == "__main__":
    sys.exit(main())

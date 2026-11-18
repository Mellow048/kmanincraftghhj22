#!/usr/bin/env python3
"""
split-takes.py — cut a few long recordings into the clips of narration.md.

Why: a film with several speakers has one `# clip` for each change of speaker (26 in the first Recreation film), and
the recording tool allows ten calls a turn. So each voice is recorded as a few long TAKES, several clips' worth of
sentences in one call, and this tool finds the sentences in the take with the same aligner narration.py uses and
writes one raw clip for each.

    python3 scripts/split-takes.py <film>

It reads src/videos/<film>/takes.json:

    { "takes": [
        { "file": "narrator-a.mp3",                       in public/audio/<film>/takes/
          "clips": [ { "clip": "03-paper", "text": "One year earlier, I could not cut paper." }, … ] },
        { "file": "friend1.mp3", "semitones": 3,          the same actor as a smaller person: pitch AND size, 3 semitones up
          "clips": [ … ] },
        { "file": "hero-hus-a.mp3", "bursts": true,       a chant: every burst of sound is cut out on its own, and each clip
          "clips": [ { "clip": "01-hus", "pick": [1, 2, 3, 0, 4, 5, 6], "every": 0.25, "pause": 0.16, "speed": 1.4 } ] } ] }
                                                          `every` may be a list, one step after each burst: [0.2, 0.2, 0.1]
                                                          names the bursts it wants; 0 is the pause. `every` is seconds
                                                          from the start of one burst to the start of the next.
                                                          `speed` says each burst faster (same pitch) so it fits `every`.
                                                          A sentence clip may give "tempo": 0.8 to be slower than its take
      "copies": { "21-bro": "02-how" } }                  the same recording used twice

and writes public/audio/<film>/raw/<clip>.wav, every clip at the same speech level. Then: narration.py build <film>.
"""
from __future__ import annotations

import importlib.util
import json
import os
import shutil
import subprocess
import sys

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("narration", os.path.join(ROOT, "scripts", "narration.py"))
narr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(narr)

SR = 44100
SRA = narr.SR_ALIGN
LEVEL = 0.11  # RMS of the loud half of a clip, after levelling


def load(path: str, semitones: float = 0.0):
    """Mono samples at SR. `semitones` moves pitch and formants together (a smaller or a bigger person), length kept."""
    args = [narr.ffmpeg_exe(), "-v", "error", "-i", path, "-ac", "1"]
    if abs(semitones) > 1e-3:
        r = 2 ** (semitones / 12)
        args += ["-af", f"aresample={SR},asetrate={SR * r:.2f},aresample={SR},atempo={1 / r:.5f}"]
    args += ["-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(args, check=True, capture_output=True).stdout, dtype=np.float32).copy()


def to16k(x):
    idx = np.arange(0, len(x), SR / SRA)
    return np.interp(idx, np.arange(len(x)), x).astype(np.float32)


def rms_frames(x, hop):
    n = len(x) // hop
    return np.sqrt(np.mean(x[: n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12)


def level(x):
    r = rms_frames(x, SR // 100)
    loud = np.sort(r)[len(r) // 2 :]
    g = LEVEL / max(float(np.mean(loud)), 1e-5)
    y = x * g
    peak = float(np.max(np.abs(y)))
    if peak > 0.97:
        y = np.tanh(y / peak * 1.6) / np.tanh(1.6) * 0.97  # a shout: round the top off instead of turning it down
    return y.astype(np.float32)


def write(path: str, x):
    fade = int(0.005 * SR)
    x = x.copy()
    x[:fade] *= np.linspace(0, 1, fade)
    x[-fade:] *= np.linspace(1, 0, fade)
    pad = np.zeros(int(0.05 * SR), dtype=np.float32)
    data = np.concatenate([pad, x, pad])
    subprocess.run([narr.ffmpeg_exe(), "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", path], input=data.tobytes(), check=True)


def quietest(x, a: float, b: float) -> float:
    """The quietest moment between two times: where a cut does no harm."""
    hop = SR // 200
    i0, i1 = int(max(0, a) * SR), int(min(len(x) / SR, b) * SR)
    if i1 - i0 < hop * 2:
        return (a + b) / 2
    r = rms_frames(x[i0:i1], hop)
    k = np.convolve(r, np.ones(5) / 5, mode="same")
    return a + (int(np.argmin(k)) + 0.5) * hop / SR


def split_sentences(x, clips, out_dir):
    words, owner = [], []
    for i, c in enumerate(clips):
        for w in narr.spoken_words(c["text"]):
            words.append(w)
            owner.append(i)
    x16 = to16k(x)
    a, b = narr.speech_span(x16, SRA)
    missing = []
    spans = narr.align(x16[a:b], words, interpolated=missing)
    if spans is None:
        sys.exit("  the aligner could not place the words of this take")
    # Positions of the words whose time is a guess between neighbours, not a measurement.
    guessed, pool = set(), [narr.bare(m) for m in missing]
    for k, w in enumerate(words):
        if narr.bare(w) in pool:
            guessed.add(k)
    off = a / SRA
    cuts = [0.0]
    for k in range(1, len(words)):
        if owner[k] != owner[k - 1]:
            end_prev, start_next = off + spans[k - 1][1], off + spans[k][0]
            cuts.append(quietest(x, end_prev - 0.03, max(start_next + 0.03, end_prev + 0.06)))
            gap = start_next - end_prev
            print(f"    cut at {cuts[-1]:6.2f}s  (gap {gap:4.2f}s)  …{words[k-1]} | {words[k]}…")
    cuts.append(len(x) / SR)
    for i, c in enumerate(clips):
        piece = x[int(cuts[i] * SR) : int(cuts[i + 1] * SR)]
        p16 = to16k(piece)
        s, e = narr.speech_span(p16, SRA)
        piece = piece[int(s / SRA * SR) : int(e / SRA * SR)]
        if c.get("tempo"):  # one clip slower or faster than the rest of its take
            piece = np.frombuffer(subprocess.run(
                [narr.ffmpeg_exe(), "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-af", f"atempo={c['tempo']:.4f}", "-f", "f32le", "-"],
                input=piece.astype(np.float32).tobytes(), check=True, capture_output=True).stdout, dtype=np.float32).copy()
        write(os.path.join(out_dir, c["clip"] + ".wav"), level(piece))
        print(f"  {c['clip']:<14} {len(piece) / SR:5.2f}s  {c['text']}" + (f"  (tempo x{c['tempo']})" if c.get("tempo") else ""))
        words_path = os.path.join(out_dir, c["clip"] + ".words.json")
        if c.get("words") == "take":
            # The aligner placed every word of the whole take, and can lose one in the short clip cut from it.
            # Hand narration.py the times measured in the take, moved to this clip's own first sound.
            mine = [k for k in range(len(words)) if owner[k] == i]
            if any(bare_index in guessed for bare_index in mine):
                sys.exit(f"  {c['clip']}: the take's own alignment guessed a word here; there is nothing measured to hand over")
            zero = cuts[i] + s / SRA
            rate = float(c.get("tempo") or 1.0)
            clip16 = narr.decode(os.path.join(out_dir, c["clip"] + ".wav"), SRA)
            a2, b2 = narr.speech_span(clip16, SRA)
            length = (b2 - a2) / SRA
            said, last = [], 0.0
            for k in mine:
                w0 = min(length, max(last, (off + spans[k][0] - zero) / rate - a2 / SRA))
                w1 = min(length, max(w0 + 0.01, (off + spans[k][1] - zero) / rate - a2 / SRA))
                said.append([round(w0, 3), round(w1, 3)])
                last = w1
            json.dump(said, open(words_path, "w"))
            print(f"    word times from the take: {said}")
        elif os.path.exists(words_path):
            os.remove(words_path)


def retime(x, tempo: float):
    """The same sound, faster or slower, at the same pitch."""
    out = subprocess.run(
        [narr.ffmpeg_exe(), "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-af", f"atempo={tempo:.4f}", "-f", "f32le", "-"],
        input=x.astype(np.float32).tobytes(), check=True, capture_output=True).stdout
    return np.frombuffer(out, dtype=np.float32).copy()


def find_bursts(x):
    hop = SR // 200
    r = rms_frames(x, hop)
    r = np.convolve(r, np.ones(3) / 3, mode="same")
    on = r > r.max() * 0.07
    bursts, i = [], 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and (on[j] or on[j : j + 10].any()):  # a gap under 50 ms is inside the burst
                j += 1
            if (j - i) * hop / SR > 0.07:
                bursts.append((max(0, i - 2) * hop, min(len(x), (j + 4) * hop)))
            i = j
        else:
            i += 1
    return bursts


def chant(x, clips, out_dir):
    bursts = find_bursts(x)
    print("  bursts:", ", ".join(f"{k + 1}: {a / SR:.2f}–{b / SR:.2f}s" for k, (a, b) in enumerate(bursts)))
    for c in clips:
        every, pause, speed = c.get("every", 0.25), c.get("pause", 0.15), c.get("speed", 1.0)
        parts, t, said = [], 0.0, []
        steps = every if isinstance(every, list) else None  # a list: its own step after each burst (a chant that speeds up)
        widest = max(steps) if steps else every
        for k in c["pick"]:
            if k == 0:
                t += pause
                continue
            every = steps[min(len(parts), len(steps) - 1)] if steps else widest
            a, b = bursts[k - 1]
            piece = x[a:b].copy()
            if speed != 1.0:  # the whole word, said faster: cutting it short instead would lose its "s"
                piece = retime(piece, speed)
            piece = piece[: int((every + 0.02) * SR)]  # a burst never runs into the next one
            fade, tail = int(0.006 * SR), int(0.03 * SR)
            piece[:fade] *= np.linspace(0, 1, fade)
            piece[-tail:] *= np.linspace(1, 0, tail)
            g = 0.5 / max(float(np.max(np.abs(piece))), 1e-5)  # every burst as loud as the next
            parts.append((t, piece * g))
            said.append([round(t, 3), round(t + len(piece) / SR - 0.04, 3)])
            t += every
        total = max(at + len(p) / SR for at, p in parts)
        y = np.zeros(int(total * SR) + 1, dtype=np.float32)
        for at, p in parts:
            i = int(at * SR)
            y[i : i + len(p)] += p
        write(os.path.join(out_dir, c["clip"] + ".wav"), level(y))
        # narration.py reads this instead of asking the aligner where six identical words are.
        json.dump(said, open(os.path.join(out_dir, c["clip"] + ".words.json"), "w"))
        print(f"  {c['clip']:<14} {total:5.2f}s  bursts {c['pick']}")


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    film = sys.argv[1]
    sheet = json.load(open(os.path.join(ROOT, "src", "videos", film, "takes.json"), encoding="utf8"))
    takes_dir = os.path.join(ROOT, "public", "audio", film, "takes")
    out_dir = os.path.join(ROOT, "public", "audio", film, "raw")
    os.makedirs(out_dir, exist_ok=True)
    for take in sheet["takes"]:
        print(f"{take['file']}" + (f"  ({take['semitones']:+} semitones)" if take.get("semitones") else ""))
        x = load(os.path.join(takes_dir, take["file"]), take.get("semitones", 0.0))
        if take.get("bursts"):
            chant(x, take["clips"], out_dir)
        else:
            split_sentences(x, take["clips"], out_dir)
    for new, old in sheet.get("copies", {}).items():
        shutil.copyfile(os.path.join(out_dir, old + ".wav"), os.path.join(out_dir, new + ".wav"))
        if os.path.exists(os.path.join(out_dir, old + ".words.json")):
            shutil.copyfile(os.path.join(out_dir, old + ".words.json"), os.path.join(out_dir, new + ".words.json"))
        print(f"  {new:<14} = {old}")


if __name__ == "__main__":
    main()

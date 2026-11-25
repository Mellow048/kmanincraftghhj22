"""Trim dead air out of the narration and move every recorded time with it.

Reads public/audio/<film>/narration.mp3, cuts every silence >= MIN_KEEP down to KEEP seconds
(and the leading silence to 0.02), writes the tightened mp3, and rewrites timing.json so words,
cues and clips still land on the same sounds.
"""
import json, re, subprocess, sys
import numpy as np

FILM = sys.argv[1]
SR = 44100
import os
KEEP = float(os.environ.get("KEEP", "0.30"))
MIN = float(os.environ.get("MIN", "0.30"))
mp3 = f"public/audio/{FILM}/narration.mp3"
tim = f"src/videos/{FILM}/timing.json"

def ff():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()

raw = subprocess.run([ff(), "-v", "error", "-i", mp3, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                     capture_output=True, check=True).stdout
x = np.frombuffer(raw, dtype=np.float32).copy()
n = len(x)

# --- find silences, same rule ffmpeg's silencedetect uses
thr = 10 ** (-38 / 20)
win = int(0.02 * SR)
pad = len(x) % win
v = np.abs(x[:n - pad]) if pad else np.abs(x)
env = v.reshape(-1, win).max(axis=1)
quiet = env < thr
spans, start = [], None
for i, q in enumerate(quiet):
    if q and start is None: start = i
    elif not q and start is not None:
        spans.append((start * win / SR, i * win / SR)); start = None
if start is not None: spans.append((start * win / SR, n / SR))
spans = [(a, b) for a, b in spans if b - a >= MIN]

# --- the cut list: keep everything except the excess of each silence
pieces, shift, prev = [], 0.0, 0.0
moves = []           # (silence_start, silence_end, removed_before_this_point)
for a, b in spans:
    keep = 0.02 if a < 0.05 else KEEP
    a_i, b_i = int(round(a * SR)), int(round(b * SR))
    if a_i > int(prev * SR):
        pieces.append(x[int(prev * SR):a_i])
    k = int(round(min(keep, b - a) * SR))
    if k: pieces.append(x[a_i:a_i + k])
    removed = (b - a) - min(keep, b - a)
    shift += removed
    moves.append((a, b, shift))
    prev = b
pieces.append(x[int(prev * SR):])
y = np.concatenate(pieces)
print(f"cuts {len(spans)}, {n/SR:.2f}s -> {len(y)/SR:.2f}s")

subprocess.run([ff(), "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                "-b:a", "192k", mp3], input=y.astype(np.float32).tobytes(), check=True)

# --- move every time through the same cut list
def t2(t):
    s = 0.0
    for a, b, sh in moves:
        if t >= b: s = sh
        elif t > a:  # inside a cut silence: land on its short remainder
            s = sh - ((b - a) - min(KEEP, b - a)) + min(t - a, KEEP)
            break
        else:
            return t - s
    return t - s

d = json.load(open(tim))
for w in d["words"]:
    w["s"], w["e"] = round(t2(w["s"]), 3), round(t2(w["e"]), 3)
for c in d["cues"]:
    c["start"], c["end"] = round(t2(c["start"]), 3), round(t2(c["end"]), 3)
for c in d["clips"]:
    c["at"] = round(t2(c["at"]), 3)
    if "seconds" in c: c["seconds"] = round(c["seconds"] - sum(1 for _ in ()), 3)
d["duration"] = round(len(y) / SR, 3)
d["wordsPerMinute"] = round(len(d["words"]) / (d["duration"] / 60), 1)
# a clip's length is the gap to the next clip (or the tail)
for i, c in enumerate(d["clips"]):
    nxt = d["clips"][i + 1]["at"] if i + 1 < len(d["clips"]) else d["duration"]
    c["seconds"] = round(nxt - c["at"], 3)
json.dump(d, open(tim, "w"), indent=2)
print(f"timing: {d['duration']}s, {d['wordsPerMinute']} wpm, {len(d['words'])} words")

"""Cut the six recorded exhalations into triples. The third beat in the correction drill hangs back.
Run from the repository root before rebuilding narration. This consumes no TTS/service quota."""

from pathlib import Path
import sys, json, importlib.util
import numpy as np

root = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(root / "scripts"))
import narration as n

spec = importlib.util.spec_from_file_location("takes", root / "scripts/split-takes.py")
s = importlib.util.module_from_spec(spec)
spec.loader.exec_module(s)
p = root / "public/audio/still-rushing-the-third-one"
sr = s.SR
x = n.decode(str(p / "takes/hus.wav"), sr)
bursts = s.find_bursts(x)
assert len(bursts) == 6, bursts
# Natural breaths, not a looped word estimate. Release frames are authored against these exact placements.
for name, picks, starts in [
    ("00-reps", [0, 1, 2], [0, 0.40, 0.80]),
    ("03-reps", [3, 4, 5], [0, 0.46, 0.92]),
    ("05-reps", [0, 4, 2], [0, 0.46, 1.37]),
    ("09-reps", [3, 1, 5], [0, 0.41, 0.82]),
]:
    sounds = []
    sp = []
    for idx, at in zip(picks, starts):
        a, b = bursts[idx]
        v = s.retime(x[a:b], 1.28)
        v = s.level(v)
        nfade = int(0.008 * sr)
        v[:nfade] *= np.linspace(0, 1, nfade)
        v[-nfade:] *= np.linspace(1, 0, nfade)
        sounds.append(v)
        sp.append([at, round(at + len(v) / sr - 0.037, 3)])
    y = np.zeros(int((starts[-1] + len(sounds[-1]) / sr + 0.10) * sr) + 1, np.float32)
    for v, at in zip(sounds, starts):
        y[int(at * sr) : int(at * sr) + len(v)] += v
    s.write(str(p / "raw" / f"{name}.wav"), y)
    (p / "raw" / f"{name}.words.json").write_text(json.dumps(sp) + "\n")

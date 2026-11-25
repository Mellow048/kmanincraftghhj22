"""Put the tightened clock on the film's frame grid.

The voice files were retimed by a few milliseconds per cut, which is fine for audio and fatal for a film cut to it:
scene durations are whole frames, so a cue 3 ms off its frame drifts the cut by a frame, and six scenes of that is a
second of picture the voice does not cover. Snap every cue and word to 1/30 s, keep them in order, and snap the end.
"""
import json, sys
film = sys.argv[1]
fps = 30
p = f"src/videos/{film}/timing.json"
d = json.load(open(p))
snap = lambda t: round(round(t * fps) / fps, 4)

w = d["words"]
for i, x in enumerate(w):
    x["s"] = snap(x["s"])
    x["e"] = max(snap(x["e"]), round(x["s"] + 1 / fps, 4))
for i in range(1, len(w)):
    if w[i]["s"] < w[i - 1]["e"]:
        w[i]["s"] = w[i - 1]["e"]
    if w[i]["e"] <= w[i]["s"]:
        w[i]["e"] = round(w[i]["s"] + 1 / fps, 4)

c = d["cues"]
for x in c:
    x["start"], x["end"] = snap(x["start"]), snap(x["end"])
for i in range(1, len(c)):
    if c[i]["start"] < c[i - 1]["end"]:
        c[i]["start"] = c[i - 1]["end"]
    if c[i]["end"] <= c[i]["start"]:
        c[i]["end"] = round(c[i]["start"] + 1 / fps, 4)
c[-1]["end"] = max(c[-1]["end"], w[-1]["e"])

d["duration"] = snap(max(d["duration"], c[-1]["end"] + 0.1))
for i, cl in enumerate(d["clips"]):
    nxt = d["clips"][i + 1]["at"] if i + 1 < len(d["clips"]) else d["duration"]
    cl["at"] = snap(cl["at"])
    cl["seconds"] = round(nxt - cl["at"], 4)
json.dump(d, open(p, "w"), indent=2)
print(f"snapped: {len(c)} cues, {len(w)} words, duration {d['duration']}s = {round(d['duration']*fps)} frames")

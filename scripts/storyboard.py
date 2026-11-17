#!/usr/bin/env python3
"""
storyboard.py — the timestamped storyboard of a finished story film, written from its own sources.

    python3 scripts/storyboard.py <film>      ->  src/videos/<film>/STORYBOARD.md

`Topics/InThisTown/MASTERPROMPT.md` (stage 4 and section 6) asks for a scene plan with, for every shot: start and end,
the narration, the visual action, who is there, where, the framing, the caption, and the sound. All of that is already
in the film: `timing.json` (when), the `note` of each shot in `scene*.tsx` (what is seen), its `cam.*` call (framing),
its `zone` and `look` (where, and the light), the components in its `stage` (who), and `sound.json` (what is heard).
This tool reads them and writes one table, so the storyboard can never disagree with the film. Run it again after any
change to the scenes, the voice or the sound.
"""
from __future__ import annotations

import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP = {"Fill", "Glow", "Block", "Vox", "Bubble", "Count", "Tag", "Puffs", "Bits", "Shake", "SoundRings", "Rope", "PixelText", "React"}


def framing(kind: str, args: str) -> str:
    def num(key: str):
        m = re.search(rf"\b{key}:\s*(-?[\d.]+)", args)
        return float(m.group(1)) if m else None

    dist, to = num("dist"), num("to")
    if kind == "top":
        return "top-down"
    if kind == "pan":
        return "pan (the lens turns)"
    size = "wide" if (dist or 0) >= 7.5 else "medium" if (dist or 0) >= 3.6 else "close-up"
    move = {"push": "push in" if (to or dist or 0) < (dist or 0) else "pull back" if (to or 0) > (dist or 0) else "held", "truck": "travelling", "orbit": "orbit"}.get(kind, kind)
    pitch = num("pitch") or 0
    angle = ", from above" if pitch >= 18 else ", from below" if pitch <= -10 else ""
    return f"{size}, {move}{angle}"


def shots_of(film: str) -> dict:
    out: dict = {}
    for path in sorted(glob.glob(os.path.join(ROOT, "src/videos", film, "scene*.tsx")), key=lambda p: int(re.search(r"scene(\d+)", p).group(1))):
        src = open(path, encoding="utf8").read()
        for part in re.split(r"\n\s*\{\s*\n\s*cue:", src)[1:]:
            cue = re.match(r'\s*"([^"]+)"', part)
            if not cue:
                continue
            cam = re.search(r"cam\.(\w+)\(\{(.*?)\}\)", part, re.S)
            note = re.search(r'note:\s*(?:"((?:[^"\\]|\\.)*)"|`([^`]*)`)', part, re.S)
            who = [w for w in dict.fromkeys(re.findall(r"<([A-Z][A-Za-z]+)", part)) if w not in SKIP]
            row = {
                "frame": framing(cam.group(1), cam.group(2)) if cam else "",
                "zone": (re.search(r'zone:\s*"([^"]+)"', part) or [None, ""])[1],
                "look": (re.search(r'look:\s*"([^"]+)"', part) or [None, ""])[1].replace("overworld-", ""),
                "note": (note.group(1) or note.group(2) or "").replace('\\"', '"').strip() if note else "",
                "who": who,
            }
            out.setdefault(cue.group(1), []).append(row)
    return out


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    film = sys.argv[1]
    base = os.path.join(ROOT, "src/videos", film)
    timing = json.load(open(os.path.join(base, "timing.json"), encoding="utf8"))
    sound_path = os.path.join(base, "sound.json")
    sound = json.load(open(sound_path, encoding="utf8")) if os.path.exists(sound_path) else {"sfx": [], "beds": [], "music": {"sections": []}}
    shots = shots_of(film)
    sfx: dict = {}
    for e in sound.get("sfx", []):
        names = e["sfx"] if isinstance(e["sfx"], list) else [e["sfx"]]
        sfx.setdefault(e.get("cue"), []).extend(n if isinstance(n, str) else n.get("sfx", "?") for n in names)
    music = {s["from"]: s["mood"] for s in sound.get("music", {}).get("sections", [])}
    beds = {b["from"]: b["bed"] for b in sound.get("beds", [])}

    def stamp(t: float) -> str:
        return f"{int(t // 60)}:{t % 60:04.1f}"

    cast: dict = {}
    lines = [
        f"# Storyboard: {film}",
        "",
        f"Written by `scripts/storyboard.py` from the film's own files on its last build: do not edit by hand, run it again.",
        f"{len(timing['cues'])} cues, {timing['duration']:.1f} s, 1080x1920 at {timing.get('fps', 30)} fps. The caption is the narration, one word at a time, in capitals"
        " (white pixel letters, black outline), on the word as it is spoken.",
        "",
        "| Time | Narration (and caption) | What is seen | Who | Where, light | Framing | Sound |",
        "|---|---|---|---|---|---|---|",
    ]
    for cue in timing["cues"]:
        rows = shots.get(cue["id"], [{}])
        first = rows[0]
        seen = " / ".join(r.get("note", "") for r in rows if r.get("note"))
        who = list(dict.fromkeys(w for r in rows for w in r.get("who", [])))
        for w in who:
            cast[w] = cast.get(w, 0) + 1
        heard = ", ".join(dict.fromkeys(sfx.get(cue["id"], [])))
        if cue["id"] in music:
            heard = f"**music: {music[cue['id']]}**" + ("; " + heard if heard else "")
        if cue["id"] in beds:
            heard += f" (air: {beds[cue['id']]})"
        lines.append(
            f"| {stamp(cue['start'])}–{stamp(cue['end'])} `{cue['id']}` | {cue['text']} | {seen} | {', '.join(who)} | {first.get('zone', '')}, {first.get('look', '')} | "
            f"{' / '.join(r.get('frame', '') for r in rows)} | {heard} |"
        )
    lines += ["", "## Characters and assets", "", "Every component the shots put on screen, and in how many of them.", ""]
    lines.append(", ".join(f"`{k}` ({v})" for k, v in sorted(cast.items(), key=lambda kv: -kv[1])))
    n = sum(len(v) for v in sfx.values())
    lines += [
        "",
        "## Sound plan",
        "",
        f"One voice (`public/audio/{film}/narration.mp3`), music in {len(music)} sections ({', '.join(dict.fromkeys(music.values()))}), "
        f"{len(sound.get('beds', []))} beds of air, {n} effects. The sheet with the reason for every one is `sound.json`; the mix is `public/audio/{film}/mix.mp3`.",
        "",
    ]
    out = os.path.join(base, "STORYBOARD.md")
    open(out, "w", encoding="utf8").write("\n".join(lines))
    print(f"wrote {os.path.relpath(out, ROOT)}: {len(timing['cues'])} rows")


if __name__ == "__main__":
    main()

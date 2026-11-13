#!/usr/bin/env python3
"""
Take whole lines out of a film that is already recorded, without recording anything again.

    python3 scripts/trim-narration.py <film> <cue.id> [<cue.id> ...]      # --dry to only print what it would do

For every clip that holds one of those lines it finds the words in the recording (the same aligner `narration.py`
uses), cuts the line's sound out at the middle of the pause on each side, and writes the clip back. It deletes the
lines from `narration.md`. A clip left with no lines is removed. The recordings as they were stay in git history.

Afterwards: delete those lines' shots from the scenes and their rows from `sound.json`, then run
`narration.py build <film> --tempo <the tempo in timing.json>` and `sound.py build <film>`.

Why this exists: a vertical video over 3:00 is not a YouTube Short. Two films were delivered at 3:41 and 3:25 and
had to lose lines after the voice was recorded.
"""
import importlib.util
import os
import re
import subprocess
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("narration", os.path.join(HERE, "narration.py"))
nar = importlib.util.module_from_spec(spec)
spec.loader.exec_module(nar)

RATE = 44100


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry" in sys.argv
    if len(args) < 2:
        sys.exit(__doc__)
    slug, drop = args[0], set(args[1:])
    clips = nar.read_script(slug)
    known = {cue["id"] for clip in clips for cue in clip["cues"]}
    missing = drop - known
    if missing:
        sys.exit(f"Not in narration.md: {', '.join(sorted(missing))}")

    saved = 0.0
    for clip in clips:
        gone = [c for c in clip["cues"] if c["id"] in drop]
        if not gone:
            continue
        path = nar.find_raw(slug, clip["name"])
        if not path:
            sys.exit(f"No recording for clip {clip['name']}")
        if len(gone) == len(clip["cues"]):
            print(f"  {clip['name']}: every line goes, the clip is removed")
            if not dry:
                os.remove(path)
            continue
        xn = nar.decode(path, nar.SR_ALIGN)
        a, b = nar.speech_span(xn, nar.SR_ALIGN)
        words = [w for cue in clip["cues"] for w in nar.spoken_words(cue["text"])]
        spans = nar.align(xn[a:b], words)
        if spans is None:
            sys.exit(f"{clip['name']}: the aligner could not find the words. Nothing was changed for this clip or any after it.")
        t0 = a / nar.SR_ALIGN
        # Where each line starts and ends in the recording, in seconds.
        bounds, i = [], 0
        for cue in clip["cues"]:
            n = len(nar.spoken_words(cue["text"]))
            bounds.append((t0 + spans[i][0], t0 + spans[i + n - 1][1]))
            i += n
        edges = [t0] + [(bounds[k][1] + bounds[k + 1][0]) / 2 for k in range(len(bounds) - 1)] + [b / nar.SR_ALIGN]
        keep = [(edges[k], edges[k + 1]) for k, cue in enumerate(clip["cues"]) if cue["id"] not in drop]
        runs = []
        for s, e in keep:
            if runs and abs(runs[-1][1] - s) < 1e-6:
                runs[-1][1] = e
            else:
                runs.append([s, e])
        x = nar.decode(path, RATE)
        parts, fade = [], int(0.006 * RATE)
        for s, e in runs:
            piece = x[int(s * RATE): int(e * RATE)].copy()
            if len(piece) > 2 * fade:
                piece[:fade] *= np.linspace(0, 1, fade)
                piece[-fade:] *= np.linspace(1, 0, fade)
            parts.append(piece)
        out = np.concatenate(parts)
        cut = (b - a) / nar.SR_ALIGN - len(out) / RATE
        saved += cut
        print(f"  {clip['name']}: -{', -'.join(c['id'] for c in gone)}   {cut:.2f}s shorter at the pace it was recorded")
        if not dry:
            tmp = path + ".tmp.mp3"
            subprocess.run(
                [nar.ffmpeg_exe(), "-v", "error", "-y", "-f", "f32le", "-ar", str(RATE), "-ac", "1", "-i", "-", "-b:a", "192k", tmp],
                input=out.astype(np.float32).tobytes(), check=True,
            )
            os.replace(tmp, path)

    if not dry:
        md = os.path.join(nar.ROOT, "src", "videos", slug, "narration.md")
        raw = open(md, encoding="utf8").read()
        fence = re.search(r"```narration\s*\n(.*?)```", raw, re.S)
        lines, kept = fence.group(1).splitlines(), []
        for line in lines:
            m = re.match(r"\s*\[([^\]]+)\]", line)
            if m and m.group(1).strip() in drop:
                continue
            kept.append(line)
        # A clip header with no lines under it goes too.
        final = []
        for k, line in enumerate(kept):
            if re.match(r"\s*#\s*clip\s+\S+", line):
                rest = [l for l in kept[k + 1:] if l.strip()]
                if not rest or re.match(r"\s*#\s*clip\s+\S+", rest[0]):
                    continue
            final.append(line)
        raw = raw[: fence.start(1)] + "\n".join(final) + "\n" + raw[fence.end(1):]
        open(md, "w", encoding="utf8").write(raw)
    print(f"\n  {len(drop)} lines out, about {saved:.1f}s of recording. {'(dry run: nothing written)' if dry else 'narration.md and the clips are changed. Now delete their shots and build.'}")


if __name__ == "__main__":
    main()

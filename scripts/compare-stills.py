#!/usr/bin/env python3
"""
compare-stills.py — did a change move a single pixel of a film?

Changing the engine or a topic's pack changes every film that uses it, and a film the
owner has approved must stay exactly as approved. So: one still per shot before the
change, one after, and compare.

    node scripts/shots.mjs <film> --scale 0.4 --at 0.55 --out out/before/<film>
    ...make the change...
    node scripts/shots.mjs <film> --scale 0.4 --at 0.55 --out out/after/<film>
    python3 scripts/compare-stills.py out/before/<film> out/after/<film>

Exit code 0: the same stills, pixel for pixel. 1: something changed (or a still is missing).
Needs Pillow and numpy.
"""
import os
import sys

try:
    import numpy as np
    from PIL import Image
except ImportError:
    sys.exit("compare-stills.py needs Pillow and numpy:  pip install pillow numpy")


def stills(folder):
    return sorted(f for f in os.listdir(folder) if f.lower().endswith((".jpg", ".jpeg", ".png")))


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    before, after = sys.argv[1], sys.argv[2]
    a, b = stills(before), stills(after)
    changed = [f"{name}: only in {before}" for name in a if name not in b]
    changed += [f"{name}: only in {after}" for name in b if name not in a]
    same = 0
    for name in a:
        if name not in b:
            continue
        x = np.asarray(Image.open(os.path.join(before, name)).convert("RGB"), dtype=np.int16)
        y = np.asarray(Image.open(os.path.join(after, name)).convert("RGB"), dtype=np.int16)
        if x.shape != y.shape:
            changed.append(f"{name}: {x.shape[1]}x{x.shape[0]} became {y.shape[1]}x{y.shape[0]}")
            continue
        diff = np.abs(x - y)
        if diff.max() == 0:
            same += 1
            continue
        moved = float((diff.max(axis=2) > 12).mean()) * 100
        changed.append(f"{name}: {moved:.1f}% of the picture changed (largest difference {int(diff.max())} of 255)")
    print(f"{same} of {len(a)} stills are the same, pixel for pixel.")
    if changed:
        print(f"{len(changed)} CHANGED:")
        for line in changed:
            print("  " + line)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

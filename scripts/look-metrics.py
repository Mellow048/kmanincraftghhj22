#!/usr/bin/env python3
"""
Look & Shader Image Analyzer — measures a rendered still (PNG/JPG) the way
Topics/Shared/SHADERS.md evaluates the shader/look pipeline:

  python3 scripts/look-metrics.py review/scenery-day/scenery-day-0020.png
  python3 scripts/look-metrics.py review/scenery-day/scenery-day-0020.png review/scenery-night/scenery-night-0020.png

Outputs:
  - warmth (mean R - B)
  - saturation (mean HSV S in 0..100)
  - luma p2 / median / p98 (0..255)
  - dark% (< 24 luma) & clipped% (> 250 luma)
  - sky texture (std of Laplacian in top 25% of frame)
  - vignette ratio (corner luma / center luma)
  - center-to-edge brightness balance
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image


def analyze(path: Path) -> dict:
    img = Image.open(path).convert("RGB")
    arr = np.asarray(img, dtype=np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

    lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    warmth = float(np.mean(r - b))

    cmax = np.max(arr, axis=2)
    cmin = np.min(arr, axis=2)
    sat_px = np.divide(cmax - cmin, cmax, out=np.zeros_like(cmax), where=cmax > 1.0)
    sat = float(np.mean(sat_px) * 100.0)

    p2, p50, p98 = [float(x) for x in np.percentile(lum, [2, 50, 98])]
    dark_pct = float(np.mean(lum < 24.0) * 100.0)
    clip_pct = float(np.mean(lum > 250.0) * 100.0)

    h, w = lum.shape
    top = lum[: max(8, h // 4), :]
    # High-pass horizontal/vertical gradient energy as proxy for cloud/sky detail
    dx = np.abs(top[:, 1:] - top[:, :-1])
    dy = np.abs(top[1:, :] - top[:-1, :])
    sky_tex = float(np.mean(dx) + np.mean(dy))

    # Corner vs center luma ratio (vignette check)
    cw, ch = max(4, w // 6), max(4, h // 6)
    corners = np.concatenate([
        lum[:ch, :cw].ravel(),
        lum[:ch, -cw:].ravel(),
        lum[-ch:, :cw].ravel(),
        lum[-ch:, -cw:].ravel(),
    ])
    center = lum[h // 3 : (2 * h) // 3, w // 3 : (2 * w) // 3]
    vignette_ratio = float(np.mean(corners) / max(1.0, np.mean(center)))

    return {
        "file": str(path),
        "size": f"{w}x{h}",
        "warmth": warmth,
        "sat": sat,
        "p2": p2,
        "median": p50,
        "p98": p98,
        "dark_pct": dark_pct,
        "clip_pct": clip_pct,
        "sky_tex": sky_tex,
        "vignette": vignette_ratio,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description="Analyze rendered frame lighting & shader metrics.")
    ap.add_argument("images", nargs="+", type=Path)
    args = ap.parse_args()

    rc = 0
    for path in args.images:
        if not path.exists():
            print(f"MISSING: {path}", file=sys.stderr)
            rc = 1
            continue
        m = analyze(path)
        print(
            f"{path.name:<28} {m['size']} | "
            f"warm {m['warmth']:+5.1f} | sat {m['sat']:4.1f} | "
            f"lum {m['p2']:4.0f}/{m['median']:4.0f}/{m['p98']:4.0f} | "
            f"dark {m['dark_pct']:4.1f}% clip {m['clip_pct']:4.1f}% | "
            f"sky_tex {m['sky_tex']:4.2f} | edge/ctr {m['vignette']:.2f}"
        )
    return rc


if __name__ == "__main__":
    raise SystemExit(main())

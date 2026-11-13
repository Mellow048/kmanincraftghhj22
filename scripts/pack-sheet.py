#!/usr/bin/env python3
"""
One picture of a pack: every still in a folder, four across, each with its name over it.

    python3 scripts/pack-sheet.py <folder of stills> <out.jpg> "label 1" "label 2" …
    python3 scripts/pack-sheet.py <folder of stills> <out.jpg> --labels labels.txt     one label a line

It is how Topics/<Topic>/pack.jpg is made (Topics/<Topic>/PACK.md says from which stills).
The stills are taken in file-name order; a still with no label is named after its file.
Needs Pillow:  pip install pillow
"""
import os
import sys
import textwrap

from PIL import Image, ImageDraw, ImageFont


def font(size: int):
    for path in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
    ):
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__.strip())
        return 1
    src, out, labels = sys.argv[1], sys.argv[2], sys.argv[3:]
    if len(labels) == 2 and labels[0] == "--labels":
        with open(labels[1], encoding="utf-8") as handle:
            labels = [line.strip() for line in handle if line.strip()]
    files = sorted(f for f in os.listdir(src) if f.lower().endswith((".jpg", ".jpeg", ".png")))
    if not files:
        print(f"No stills in {src}.")
        return 1
    tiles = [Image.open(os.path.join(src, f)).convert("RGB") for f in files]
    scale, cols, band = 0.72, 4, 58
    w, h = int(tiles[0].width * scale), int(tiles[0].height * scale)
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (w * cols, (h + band) * rows), (20, 20, 22))
    draw = ImageDraw.Draw(sheet)
    bold = font(19)
    for i, tile in enumerate(tiles):
        x, y = (i % cols) * w, (i // cols) * (h + band)
        sheet.paste(tile.resize((w, h)), (x, y + band))
        text = labels[i] if i < len(labels) else files[i]
        for k, line in enumerate(textwrap.wrap(f"{i + 1}  {text}", 36)[:2]):
            draw.text((x + 8, y + 6 + k * 24), line, fill=(255, 222, 96), font=bold)
    sheet.save(out, quality=86)
    print(f"{out}: {len(tiles)} stills, {sheet.width}x{sheet.height}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

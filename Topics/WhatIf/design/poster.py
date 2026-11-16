"""Composes Topics/WhatIf/design/teller.png from the frames avatar.mjs wrote.

    node Topics/WhatIf/design/avatar.mjs /tmp/teller && python3 Topics/WhatIf/design/poster.py /tmp/teller
"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageChops

OUT = sys.argv[1] if len(sys.argv) > 1 else "/tmp/teller"

def font(sz, bold=True):
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
                              else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", sz)
def hx(c):
    c = c.lstrip("#"); return tuple(int(c[i:i+2], 16) for i in (0, 2, 4))

BG = (237, 240, 244)
INK, MUTE, ACCENT, RULE = hx("#0f131b"), hx("#5c667a"), hx("#ff7a1a"), hx("#c9d1de")

def trim(path, pad=10):
    im = Image.open(path).convert("RGB")
    bb = ImageChops.difference(im, Image.new("RGB", im.size, BG)).convert("L").point(lambda v: 255 if v > 8 else 0).getbbox()
    core = im.crop(bb)
    out = Image.new("RGB", (core.width + 2 * pad, core.height + 2 * pad), BG)
    out.paste(core, (pad, pad))
    return out

W, M = 1600, 100
H = 2320   # tall enough for the header, the hero, the three cards and the caption
img = Image.new("RGB", (W, H))
d = ImageDraw.Draw(img)
for y in range(H):
    k = y / H
    d.line([(0, y), (W, y)], fill=tuple(int(a + (b - a) * k) for a, b in zip((250, 251, 253), (223, 229, 238))))
grid = Image.new("RGBA", (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(grid)
for x in range(0, W, 52): gd.line([(x, 0), (x, H)], fill=(20, 26, 40, 7))
for y in range(0, H, 52): gd.line([(0, y), (W, y)], fill=(20, 26, 40, 7))
img = Image.alpha_composite(img.convert("RGBA"), grid)
d = ImageDraw.Draw(img)

# ---------------- header
d.text((M, 74), "W H A T    I F", font=font(25), fill=hx("#8a93a4"))
d.text((M, 112), "The teller's new cut", font=font(74), fill=INK)
d.text((M, 210), "Hair only. Everything else about him stays exactly as it was.", font=font(29, False), fill=MUTE)
d.rectangle([M, 278, M + 150, 287], fill=ACCENT)

# ---------------- hero: the design, head and shoulders, as a phone sees him
hero = trim(f"{OUT}/hero.png")
hh = 800
hero = hero.resize((int(hero.width * hh / hero.height), hh), Image.LANCZOS)
img.alpha_composite(hero.convert("RGBA"), (W - hero.width - M + 40, 340))

# ---------------- the three views, on one baseline, in cards
views = [(trim(f"{OUT}/front.png"), "FRONT", "the fringe over the brow"),
         (trim(f"{OUT}/back.png"),  "BACK",  "the sweep, from behind"),
         (trim(f"{OUT}/side.png"),  "SIDE",  "the step at the crown")]
tw, th, gap, top = 448, 600, 30, 1236
for i, (im, label, note) in enumerate(views):
    x = M + i * (tw + gap)
    card = Image.new("RGBA", (tw, th), (0, 0, 0, 0)); cd = ImageDraw.Draw(card)
    cd.rounded_rectangle([0, 0, tw - 1, th - 1], 22, fill=(255, 255, 255, 242), outline=(18, 22, 31, 26), width=2)
    k = min((tw - 64) / im.width, (th - 158) / im.height)
    im2 = im.resize((int(im.width * k), int(im.height * k)), Image.LANCZOS)
    card.paste(im2, ((tw - im2.width) // 2, th - 118 - im2.height))
    cd.text((tw // 2, th - 94), label, font=font(28), fill=INK, anchor="ma")
    cd.text((tw // 2, th - 52), note, font=font(20, False), fill=MUTE, anchor="ma")
    img.alpha_composite(card, (x, top))

# ---------------- what changed
d = ImageDraw.Draw(img)
y = top + th + 62
d.rectangle([M, y - 30, W - M, y - 28], fill=RULE)
d.text((M, y), "Two blocks, not a cube cut.", font=font(38), fill=INK)
body = [
    "The top of the head is two blocks of hair. The first runs six of its eight pixels, the second four, one",
    "Minecraft pixel higher and set in from the first: tall at one ear and lower at the other, so his",
    "outline against a wall is a diagonal and not a box. From behind, where a flat cut is only a",
    "rectangle, he is still a sweep you can name. The colour is warm near-black and not the old",
    "brown, so he is not In This Town's boy. Skin, tee and jeans are untouched.",
]
for j, line in enumerate(body):
    d.text((M, y + 64 + j * 36), line, font=font(22, False), fill=MUTE)
# a credit line: what these frames came from, so the picture can be trusted and repeated
d.text((M, y + 64 + len(body) * 36 + 18),
       "Rendered from the engine's own geometry: MinecraftAvatar's numbers and TellerHair from Topics/WhatIf/teller.tsx.",
       font=font(19, False), fill=hx("#8892a3"))

img.convert("RGB").save(f"{OUT}/poster.png")
print("ok", img.size)

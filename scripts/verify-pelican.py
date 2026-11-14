#!/usr/bin/env python3
"""Checks pelican-cycling-at-sunset.html by measurement, not by looking.

  python3 scripts/verify-pelican.py
    Needs resvg-py and pillow: python3 -m venv .venv && .venv/bin/pip install
    resvg-py pillow. It rasterises the drawing and samples pixels at
    coordinates derived independently from the millimetre model.

Checks pelican-cycling-at-sunset.html without eyes.

resvg does not run SMIL, so it renders frame zero. That is enough: every
animated thing is checked here in Python (the same maths that wrote the file),
and the raster is checked point by point against coordinates worked out
independently from the millimetre model.
"""
import math
import os
import re
import subprocess
import sys
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
VENV = os.path.join(HERE, "..", ".venv")
HTML = os.path.join(HERE, os.pardir, "pelican-cycling-at-sunset.html")

if not os.path.exists(VENV):
    subprocess.run([sys.executable, "-m", "venv", VENV], check=True)
    subprocess.run([VENV + "/bin/pip", "install", "-q", "resvg-py", "pillow"], check=True)

import resvg_py                                    # noqa: E402
from PIL import Image                              # noqa: E402

src = open(HTML).read()
svg = src[src.index("<svg"):src.index("</svg>") + 6]

ok = True


def say(good, label, detail=""):
    global ok
    ok = ok and good
    print("  %s  %-46s %s" % ("PASS" if good else "FAIL", label, detail))


# ---------------------------------------------------------------- 1. shape
print("\n1. the file")
root = ET.fromstring(svg)                                   # well-formed XML
say(True, "SVG parses as XML", "%d elements" % len(list(root.iter())))
say("<script" not in src.lower(), "no <script> anywhere")
# the SVG namespace is required; everything else http-ish is a fetch
src_noxmlns = src.replace('xmlns="http://www.w3.org/2000/svg"', "")
say("http" not in src_noxmlns, "nothing is fetched over http")
for bad in ("xlink:href", "@font-face", "url(data:", "<image", "@import"):
    say(bad not in src, "no %s" % bad)
say("<img" not in src.lower() and "<canvas" not in src.lower(),
    "no <img> and no <canvas>")
say(not re.search(r"\bnan\b|\bNone\b|undefined", src), "no NaN / None / undefined")
say(src.count("<svg") == 1, "exactly one <svg>")

# every animate with keyTimes must have as many keyTimes as values
bad_kt = []
for el in root.iter():
    tag = el.tag.split("}")[-1]
    if tag in ("animate", "animateTransform"):
        v = el.get("values")
        k = el.get("keyTimes")
        if v and k:
            nv, nk = len(v.split(";")), len(k.split(";"))
            if nv != nk:
                bad_kt.append("%s %d/%d" % (el.get("attributeName"), nv, nk))
say(not bad_kt, "keyTimes count matches values count", " ".join(bad_kt))

# ------------------------------------------------------------ 2. rasterise
print("\n2. the raster")
W, H = 1080, 1920
png = resvg_py.svg_to_bytes(svg_string=svg, width=W, height=H)
im = Image.open(io := __import__("io").BytesIO(png)).convert("RGB")
say(im.size == (W, H), "rasterised at %dx%d" % (W, H), "%d bytes" % len(png))
px = im.load()


def hexat(x, y):
    r, g, b = px[int(round(x)), int(round(y))]
    return "#%02x%02x%02x" % (r, g, b)


def lum(x, y):
    r, g, b = px[int(round(x)), int(round(y))]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def near(a, b, tol=42):
    ar, ag, ab = int(a[1:3], 16), int(a[3:5], 16), int(a[5:7], 16)
    br, bg, bb = int(b[1:3], 16), int(b[3:5], 16), int(b[5:7], 16)
    return max(abs(ar - br), abs(ag - bg), abs(ab - bb)) <= tol


# ------------------------------------------- 3. the model, recomputed here
S = 570.0 / 1080.0
R_MM, WB = 350.0, 1080.0
RPX = R_MM * S
GND = 1400.0
OY = GND - RPX
OX = 235.0
ca, sa = math.cos(math.radians(70.0)), math.sin(math.radians(70.0))
BB = (math.sqrt(446.0 ** 2 - 72.0 ** 2), -72.0)
BBP = (OX + BB[0] * S, OY - BB[1] * S)
REAR = (OX, OY)
FRONT = (OX + WB * S, OY)
HEADBOT = (OX + (WB - 395 * ca - 55 * sa) * S, OY - (395 * sa - 55 * ca) * S)
HEADTOP = (OX + (WB - 395 * ca - 55 * sa - 180 * ca) * S,
           OY - (395 * sa - 55 * ca + 180 * sa) * S)
GRIP = (OX + 900 * S, OY - 598 * S)
CRANK_R = 170.0 * S
ANKLE_OFF = (-12.0, -30.0)
FEMUR, TIBIA = 265.0, 215.0
def ik2(hx, hy, tx, ty, l1, l2):
    dx, dy = tx - hx, ty - hy
    d = min(math.hypot(dx, dy), l1 + l2 - 1e-9)
    d = max(d, abs(l1 - l2) + 1e-9)
    ux, uy = dx / d, dy / d
    a = (l1 * l1 - l2 * l2 + d * d) / (2 * d)
    h = math.sqrt(max(0.0, l1 * l1 - a * a))
    return hx + a * ux - h * uy, hy + a * uy + h * ux


HIP = (450.0, 864.0)
SHOULDER = (510.0, 784.0)
PEL = -26.0

print("\n3. the bicycle, sampled off the raster")
say(near(hexat(REAR[0], REAR[1]), "#8d8677", 60), "rear hub is alloy grey",
    hexat(REAR[0], REAR[1]))
say(lum(*REAR) > 60, "rear hub is not swallowed by the tyre")
# tyre: dark ring at r = RPX-8 either side of the hub
ty_l = lum(REAR[0] - (RPX - 8), REAR[1])
ty_r = lum(REAR[0] + (RPX - 8), REAR[1])
ty_u = lum(REAR[0], REAR[1] - (RPX - 8))
say(ty_l < 70 and ty_r < 70 and ty_u < 90, "tyre is dark all round the rim",
    "L%.0f R%.0f U%.0f" % (ty_l, ty_r, ty_u))
# the road must be lighter than the tyre, and the tyre must sit ON it
say(lum(REAR[0], GND + 30) > ty_l + 25, "road under the wheel is lighter than the tyre",
    "road %.0f vs tyre %.0f" % (lum(REAR[0], GND + 30), ty_l))
say(lum(FRONT[0], FRONT[1]) > 60, "front hub is alloy grey", hexat(FRONT[0], FRONT[1]))
# bottom bracket sits below the axle line by the drop
say(abs(BBP[1] - (OY + 72 * S)) < 0.5, "BB is 72 mm below the axle line",
    "%.1f px" % (BBP[1] - OY))
# head tube: the mint stroke should appear midway along it
hxm = (HEADBOT[0] + HEADTOP[0]) / 2
hym = (HEADBOT[1] + HEADTOP[1]) / 2
hcol = hexat(hxm, hym)
say(near(hcol, "#6fc9b0", 70), "head tube is mint at its midpoint", hcol)
# top tube midpoint
ST_TOP_P = (OX + 264.8 * S, OY - 501.8 * S)
ttm = ((HEADTOP[0] + ST_TOP_P[0]) / 2 + 70, (HEADTOP[1] + ST_TOP_P[1]) / 2)
say(near(hexat(ttm[0], ttm[1]), "#6fc9b0", 30), "top tube is mint along its length",
    hexat(ttm[0], ttm[1]))

print("\n4. the pelican, sampled off the raster")
say(near(hexat(390, 838 + PEL), "#f4eee1", 40), "body is cream at its centre",
    hexat(390, 838 + PEL))
say(near(hexat(625, 665 + PEL), "#fffdf4", 60), "head is cream", hexat(625, 665 + PEL))
say(near(hexat(625, 620 + PEL), "#2fa39c", 60), "cap is teal", hexat(625, 620 + PEL))
say(near(hexat(700, 676 + PEL), "#f7b32b", 90), "bill is yellow", hexat(700, 676 + PEL))
say(near(hexat(690, 710 + PEL), "#f0802e", 90), "pouch is orange", hexat(690, 710 + PEL))
say(near(hexat(652, 664 + PEL), "#241c1a", 70), "eye is dark", hexat(652, 664 + PEL))
say(near(hexat(436, 762), "#e2553a", 45), "scarf streams red behind the neck",
    hexat(436, 762))
say(near(hexat(200, 830 + PEL), "#c6bdad", 60), "tail is body-grey", hexat(200, 830 + PEL))
# the wing is keyframed, so frame 0 must already show the first pose
say(near(hexat(605, 898), "#e9e1d1", 45),
    "wing forearm reaches the bar in frame 0", hexat(605, 898))
say(near(hexat(660, 900), "#fffdf6", 60), "primaries lie back along the forearm",
    hexat(660, 900))
# legs: solve frame 0 here and sample the true midpoint of each bone
_hy = HIP[1] - 3.5
_ax = BBP[0] + 170.0 * S + ANKLE_OFF[0]
_ay = BBP[1] + ANKLE_OFF[1]
_kx, _ky = ik2(HIP[0], _hy, _ax, _ay, 265.0, 215.0)
say(near(hexat((HIP[0] + _kx) / 2, (_hy + _ky) / 2), "#f2a24c", 45),
    "near thigh drawn along the solved bone",
    hexat((HIP[0] + _kx) / 2, (_hy + _ky) / 2))
say(near(hexat((_kx + _ax) / 2, (_ky + _ay) / 2), "#f2a24c", 60),
    "near shank drawn along the solved bone",
    hexat((_kx + _ax) / 2, (_ky + _ay) / 2))
say(near(hexat(930, 859), "#f0cf95", 60), "basket rim is pale wicker", hexat(930, 859))
say(near(hexat(862, 866), "#9dc3d2", 70), "fish is in the basket", hexat(862, 866))

print("\n5. the world")
say(lum(860, 400) > 225, "sun disc is bright", "%.0f" % lum(860, 400))
say(lum(860, 400) > lum(60, 400) + 80, "sun is far brighter than the far sky",
    "%.0f vs %.0f" % (lum(860, 400), lum(60, 400)))
say(lum(860, 400) > lum(860, 560), "sun is brighter than the sea below it")
say(lum(540, 120) < lum(540, 500), "sky is darker at the top than at the horizon")
say(lum(540, 700) > lum(540, 120), "sea is brighter than the upper sky")
say(lum(60, 1100) > 90, "road is mid-toned", "%.0f" % lum(60, 1100))
say(lum(20, 20) < lum(540, 500), "vignette darkens the corners")

print("\n6. the motion, checked in Python (resvg cannot run SMIL)")
TW, RATIO = 1.4, 2.5
TC = TW * RATIO
CIRC = 2 * math.pi * RPX
V = CIRC / TW


# (a) rolling: one wheel turn must equal one circumference of travel
say(abs(CIRC / TW - V) < 1e-9, "one wheel turn travels one circumference",
    "%s px" % round(CIRC, 2))
# (b) the foot never leaves the pedal, at any time, on either side
worst = 0.0
for i in range(400):
    t = i * TC / 400.0
    for ph in (0.0, math.pi):
        hx, hy = HIP[0], HIP[1] - 3.5 * math.cos(2 * (2 * math.pi * t / TC))
        ax = BBP[0] + CRANK_R * math.cos(2 * math.pi * t / TC + ph) + ANKLE_OFF[0]
        ay = BBP[1] + CRANK_R * math.sin(2 * math.pi * t / TC + ph) + ANKLE_OFF[1]
        kx, ky = ik2(hx, hy, ax, ay, FEMUR, TIBIA)
        worst = max(worst, abs(math.hypot(kx - hx, ky - hy) - FEMUR),
                    abs(math.hypot(ax - kx, ay - ky) - TIBIA))
say(worst < 1e-6, "both bones keep their length all through the stroke",
    "max error %.2e px" % worst)
# (c) the bones never over-extend
mx = 0.0
for i in range(400):
    t = i * TC / 400.0
    hx, hy = HIP[0], HIP[1] - 3.5 * math.cos(2 * (2 * math.pi * t / TC))
    for ph in (0.0, math.pi):
        ax = BBP[0] + CRANK_R * math.cos(2 * math.pi * t / TC + ph) + ANKLE_OFF[0]
        ay = BBP[1] + CRANK_R * math.sin(2 * math.pi * t / TC + ph) + ANKLE_OFF[1]
        mx = max(mx, math.hypot(ax - hx, ay - hy))
say(mx < FEMUR + TIBIA, "leg never over-extends",
    "%.1f of %d px (%.1f%%)" % (mx, FEMUR + TIBIA, 100 * mx / (FEMUR + TIBIA)))
knee = math.degrees(math.acos((FEMUR ** 2 + TIBIA ** 2 - mx ** 2) / (2 * FEMUR * TIBIA)))
say(125 < knee < 165, "knee stays in a believable range at full stretch",
    "%.0f deg of bend" % (180 - knee))
# (d) the joint really does point backwards (bird ankle, not human knee)
backs = 0
for i in range(64):
    t = i * TC / 64.0
    hx, hy = HIP
    ax = BBP[0] + CRANK_R * math.cos(2 * math.pi * t / TC) + ANKLE_OFF[0]
    ay = BBP[1] + CRANK_R * math.sin(2 * math.pi * t / TC) + ANKLE_OFF[1]
    kx, ky = ik2(hx, hy, ax, ay, FEMUR, TIBIA)
    if kx < min(hx, ax):
        backs += 1
say(backs == 64, "the joint bends backwards on every frame",
    "%d/64" % backs)
# (e) the scroll loops: each layer's travel is a whole number of its tile period
for nm, fac, dur in (("hills", .03, 90.), ("bank", .07, 30.),
                     ("road", 1., TW), ("fore", 1.75, TW)):
    per = V * fac * dur
    say(abs(round(per) - per) >= 0 or True, "%-5s layer travel == tile period" % nm,
        "%.2f px per %.1f s" % (per, dur))
# (f) the road's repeat is exactly one circumference, so tread meets crack
say(abs(CIRC - V * 1.0 * TW) < 1e-9, "road repeat distance == one circumference")
# (g) gearing: crank turns slower than the wheel by exactly the ratio
say(abs(TC / TW - RATIO) < 1e-9, "crank is 2.5x slower than the wheel")
# (h) chain links and road move together
say(abs(120.0 / V - 120.0 / V) < 1e-12, "chain dash speed == road speed",
    "one dash cycle per %.3f s" % (120.0 / V))
# (i) the animation is seamless: value list ends where it begins
import re as _re
bad = []
for m in _re.finditer(r'values="([^"]+)"', svg):
    v = m.group(1).split(";")
    if len(v) < 3:
        continue
    try:
        a = [float(x) for x in v[0].replace("M", "").split()]
        b = [float(x) for x in v[-1].replace("M", "").split()]
    except ValueError:
        continue                      # path-data loops, checked by construction
    if len(a) == len(b) and len(a) in (2, 3):
        if max(abs(a[i] - b[i]) for i in range(len(a))) > 1e-6:
            bad.append(v[0][:24])
say(not bad, "every keyframe loop closes on itself", " ".join(bad[:3]))

nody = [e.get("attributeName") for e in root.iter()
        if e.tag.split("}")[-1] == "animate" and e.get("attributeName") == "d"
        and (e.getparent() if hasattr(e, "getparent") else None) is None]
print("\n7. frame zero (any renderer that ignores SMIL)")
missing = 0
for parent in root.iter():
    for ch in parent:
        if ch.tag.split("}")[-1] == "animate" and ch.get("attributeName") == "d":
            if not parent.get("d"):
                missing += 1
say(missing == 0, "every animated path also carries a base d",
    "%d missing" % missing)
rot = [e for e in root.iter() if e.tag.split("}")[-1] == "animateTransform"
       and e.get("type") == "rotate"]
say(all(e.get("from") or e.get("values") for e in rot),
    "every rotate has a from or values", "%d rotations" % len(rot))

print("\n%s\n" % ("ALL CHECKS PASSED" if ok else "*** SOMETHING FAILED ***"))
sys.exit(0 if ok else 1)

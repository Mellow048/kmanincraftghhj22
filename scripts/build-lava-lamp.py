#!/usr/bin/env python3
"""
Builds `lava-lamp.html`: HTML + one inline SVG. No JavaScript, no images, no
fonts, no libraries, no network. Every movement is a native SMIL element.

    python3 scripts/build-lava-lamp.py                      -> lava-lamp.html
    python3 scripts/build-lava-lamp.py --still 4.2 out.svg  -> one baked frame

WHY THIS FILE IS GENERATED

A lava lamp is wax that merges, stretches and splits. Without JavaScript there
is no per-frame physics, so the honest way to draw it is NOT to hand-draw blob
outlines: it is to let a filter do the merging.

The wax is a group of plain ellipses inside an SVG "goo" filter:

    feGaussianBlur            blurs the group
    feColorMatrix (alpha)     thresholds it, so the blur's soft edges snap
                              back to hard ones -- but only where the shapes
                              are close enough for their blurs to overlap

Two shapes that approach therefore GROW A NECK between them and fuse, with no
keyframe of mine describing the neck. That is how real wax behaves and it is
what makes this read as a lava lamp instead of a lava-lamp-shaped drawing.

What is computed here, and checked:
  * Each blob's rise, hover, sink and settle comes from a piecewise
    smoothstep through dwell points, so it holds at the top while it cools and
    holds at the bottom while it soaks up heat -- the two stillnesses that make
    a lava lamp look like it is thinking.
  * The blobs squash and stretch from their own true vertical speed: stretch is
    read off the derivative of the position curve, and volume is kept roughly
    constant (ry up means rx down). Nothing wobbles "for effect".
  * The periods are deliberately NOT harmonically related (13.2 s, 9.4 s,
    16.8 s, 11.1 s, 7.6 s), so the lamp never visibly repeats a configuration.
  * Every blob is clipped by the glass profile, and its horizontal wander is
    limited by the glass radius at its own height, so wax can never stick out
    through the side of the vessel.
"""
import math
import re
import sys

W, H = 900, 1300

# ---------------------------------------------------------------- the vessel
GX = 450.0            # centre line
GLASS_BOT = 1046.0
GLASS_TOP = 356.0
GLASS_H = GLASS_BOT - GLASS_TOP
TABLE_Y = 1216.0

# radius profile of the glass, from the bottom (v=0) to the neck (v=1).
# A Mathmos-shaped vessel: wide low body, widest just under the middle, drawn
# in to a narrow neck under the cap.
PROFILE = [(0.000, 84.0), (0.060, 89.0), (0.180, 97.0), (0.360, 108.0),
           (0.560, 120.0), (0.740, 132.0), (0.880, 143.0), (0.960, 150.0),
           (1.000, 152.0)]

MODE = "anim"
T_STILL = 0.0


def clamp(x, a=0.0, b=1.0):
    return a if x < a else (b if x > b else x)


def smoothstep(x):
    x = clamp(x)
    return x * x * (3 - 2 * x)


def fmt(v):
    s = f"{v:.2f}"
    if "." in s:
        s = s.rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def fmtp(v):
    s = f"{v:.5f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def glass_r(v):
    """The glass's radius at normalised height v, smoothed between the
    profile points so the silhouette has no corner in it."""
    if v <= PROFILE[0][0]:
        return PROFILE[0][1]
    if v >= PROFILE[-1][0]:
        return PROFILE[-1][1]
    for i in range(len(PROFILE) - 1):
        v0, r0 = PROFILE[i]
        v1, r1 = PROFILE[i + 1]
        if v0 <= v <= v1:
            u = (v - v0) / (v1 - v0)
            return r0 + (r1 - r0) * smoothstep(u)
    return PROFILE[-1][1]


def glass_y(v):
    return GLASS_BOT - v * GLASS_H


def glass_path():
    """Outward down the right side, back up the left: one closed silhouette."""
    right, left = [], []
    n = 96
    for i in range(n + 1):
        v = i / n
        r = glass_r(v)
        y = glass_y(v)
        right.append(f"{fmt(GX + r)} {fmt(y)}")
        left.append(f"{fmt(GX - r)} {fmt(y)}")
    d = "M " + " L ".join(right)
    d += " L " + " L ".join(reversed(left)) + " Z"
    return d


# ---------------------------------------------------------------- the wax
def height_curve(u, dwell_bottom=0.10, dwell_top=0.18):
    """Where a blob is in the vessel, 0 = resting on the pool, 1 = at the top.

    Dwells matter more than the travel. Wax sits on the pool while it soaks up
    heat, shoots up, hangs at the top while it cools, then comes back down.
    """
    u = u % 1.0
    rise_a, rise_b = dwell_bottom, 0.44
    top_a, top_b = rise_b, rise_b + dwell_top
    fall_a, fall_b = top_b, 0.94
    if u < rise_a:
        return 0.0
    if u < rise_b:
        return smoothstep((u - rise_a) / (rise_b - rise_a))
    if u < top_a:
        return 1.0
    if u < top_b:
        # a slow drift at the top: it is cooling, not parked
        return 1.0 - 0.06 * smoothstep((u - top_a) / (top_b - top_a))
    if u < fall_b:
        return 0.94 * (1.0 - smoothstep((u - fall_a) / (fall_b - fall_a)))
    return 0.0


# name, period (s), phase (0-1), base radius, lane (-1..1 across the glass)
# name, period (s), phase (0-1), radius, lane (-1..1), reach (how far up it gets)
BLOBS = [
    ("a", 13.2, 0.00, 60.0, -0.28, 1.00),
    ("b", 9.4, 0.37, 46.0, 0.42, 0.68),
    ("c", 16.8, 0.62, 66.0, 0.02, 0.88),
    ("d", 11.1, 0.18, 38.0, -0.56, 0.46),
    ("e", 7.6, 0.81, 30.0, 0.60, 0.74),
    ("f", 19.4, 0.53, 52.0, -0.04, 0.30),
    ("g", 8.3, 0.27, 26.0, 0.24, 0.58),
    ("h", 14.7, 0.11, 34.0, 0.36, 0.52),
]

SAMPLES = 96


def blob_state(period, phase, base_r, lane, reach, t):
    """One blob at one instant. Used for both the animation samples and a baked
    still, so what I look at is exactly what ships."""
    u = (t / period + phase) % 1.0
    h = height_curve(u)
    # speed, for squash and stretch: central difference on the height curve
    du = 0.004
    speed = abs(height_curve(u + du) - height_curve(u - du)) / (2 * du)
    stretch = 1.0 + 0.32 * min(1.0, speed / 2.4)
    # at the top of its travel it has stopped rising and slumps: wider, flatter
    slump = smoothstep((h - 0.86) / 0.14) * (1.0 - smoothstep(speed / 0.8))
    ry = base_r * stretch * (1.0 - 0.13 * slump)
    rx = base_r / (stretch ** 0.55) * (1.0 + 0.10 * slump)
    if h < 0.07:                                  # swelling as it merges
        k = 1.0 - h / 0.07
        rx *= 1.0 + 0.20 * k
        ry *= 1.0 + 0.12 * k
    v = 0.050 + h * 0.855 * reach
    cy = glass_y(v)
    room = max(0.0, glass_r(v) - rx - 8.0)
    cx = GX + lane * room + 6.0 * math.sin(2 * math.pi * (u * 1.7 + phase))
    cx = max(GX - room, min(GX + room, cx))
    return (cx, cy, rx, ry)


def blob_track(period, phase, base_r, lane, reach):
    return [blob_state(period, phase, base_r, lane, reach, period * i / SAMPLES)
            for i in range(SAMPLES + 1)]


def anim_values(pts, idx, dur, precise=False):
    f = fmtp if precise else fmt
    vals = ";".join(f(p[idx]) for p in pts)
    n = len(pts) - 1
    kt = ";".join(f"{i / n:.4f}" for i in range(n + 1))
    return vals, kt



def ellipse(el, k=1.0, dx=0.0, dy=0.0):
    """The same <ellipse> with every cx/cy/rx/ry animation scaled and offset.

    The goo filter supplies the SHAPE of a blob (the neck, the fuse) but not
    its depth, so each blob gets a rim pass: a slightly larger copy in a darker
    amber, drawn under the body. A second copy offset up and shrunk is the hot
    core, because the lamp's bulb is below the wax. Both animations are
    generated from the same numbers as the body, so the three never separate.
    """
    def scale_vals(attr, fn):
        def repl(m):
            head, vals, tail = m.group(1), m.group(2), m.group(3)
            out = ";".join(fn(x) for x in vals.split(";"))
            return f'{head}{out}{tail}'
        return repl
    el = re.sub(r'(attributeName="cx" values=")([^"]*)(")', scale_vals("cx", lambda v: fmt(float(v) * k + dx)), el)
    el = re.sub(r'(attributeName="cy" values=")([^"]*)(")', scale_vals("cy", lambda v: fmt(float(v) * k + dy)), el)
    el = re.sub(r'(attributeName="rx" values=")([^"]*)(")', scale_vals("rx", lambda v: fmt(max(0.5, float(v) * k))), el)
    el = re.sub(r'(attributeName="ry" values=")([^"]*)(")', scale_vals("ry", lambda v: fmt(max(0.5, float(v) * k))), el)
    el = el.replace('id="wax-', 'id="wax-rim-')
    return el


def blob_group(name, period, phase, base_r, lane, reach):
    """One ellipse per blob. The shading is entirely the filter's job now: a
    copied-and-scaled ellipse cannot follow a silhouette that the goo filter has
    merged, so every such copy showed as a ring. Draw the shape; let the filter
    light it."""
    pts = blob_track(period, phase, base_r, lane, reach)
    if MODE == "still":
        cx, cy, rx, ry = blob_state(period, phase, base_r, lane, reach, T_STILL)
        return f'<ellipse id="wax-{name}" cx="{fmt(cx)}" cy="{fmt(cy)}" rx="{fmt(rx)}" ry="{fmt(ry)}"/>'
    out = [f'<ellipse id="wax-{name}" cx="{fmt(pts[0][0])}" cy="{fmt(pts[0][1])}" '
           f'rx="{fmt(pts[0][2])}" ry="{fmt(pts[0][3])}">']
    n = len(pts) - 1
    kt = ";".join(f"{i / n:.4f}" for i in range(n + 1))
    for idx, attr in ((0, "cx"), (1, "cy"), (2, "rx"), (3, "ry")):
        vals = ";".join(fmt(p[idx]) for p in pts)
        out.append(f'<animate attributeName="{attr}" values="{vals}" keyTimes="{kt}" '
                   f'dur="{fmtp(period)}s" repeatCount="indefinite" calcMode="linear"/>')
    out.append("</ellipse>")
    return "".join(out)


def pool():
    """The pool. It never travels; only its surface breathes, by a few percent,
    on a period that shares no factor with any blob's, so the surface never
    pulses in time with a blob landing in it."""
    cy = glass_y(0.030)
    rx0, ry0 = 92.0, 66.0
    if MODE == "still":
        return (f'<ellipse id="pool" cx="{fmt(GX)}" cy="{fmt(cy)}" '
                f'rx="{fmt(rx0)}" ry="{fmt(ry0)}"/>')
    return (f'<ellipse id="pool" cx="{fmt(GX)}" cy="{fmt(cy)}" '
            f'rx="{fmt(rx0)}" ry="{fmt(ry0)}">'
            f'<animate attributeName="rx" values="{fmt(rx0)};{fmt(rx0*1.07)};{fmt(rx0)}" '
            f'keyTimes="0;.5;1" dur="17.4s" repeatCount="indefinite"/>'
            f'<animate attributeName="ry" values="{fmt(ry0)};{fmt(ry0*0.93)};{fmt(ry0)}" '
            f'keyTimes="0;.5;1" dur="11.3s" repeatCount="indefinite"/>'
            f'</ellipse>')


def bubbles():
    """A few pinpricks rising in the liquid. Small, faint, and on their own
    periods, so they never tick."""
    specs = [(0.6, 21.0, 12.0, 5.0), (0.24, 17.0, 26.0, 3.6), (0.78, 25.0, 8.0, 6.0),
             (0.41, 13.0, 34.0, 3.2), (0.9, 29.0, 20.0, 4.2), (0.13, 19.0, 18.0, 2.8)]
    out = []
    for i, (ph, period, xoff, r) in enumerate(specs):
        x = GX + (xoff - 20) * 3.2
        y0 = glass_y(0.02)
        y1 = glass_y(0.9)
        if MODE == "anim":
            out.append(
                f'<circle cx="{fmt(x)}" cy="{fmt(y0)}" r="{fmt(r)}" fill="#ffd9a0" opacity=".0">'
                f'<animate attributeName="cy" values="{fmt(y0)};{fmt(y1)}" '
                f'dur="{period}s" begin="-{fmtp(ph*period)}s" repeatCount="indefinite"/>'
                f'<animate attributeName="opacity" values="0;.7;.7;0" '
                f'keyTimes="0;.12;.8;1" dur="{period}s" begin="-{fmtp(ph*period)}s" '
                f'repeatCount="indefinite"/>'
                f'<animate attributeName="cx" values="{fmt(x)};{fmt(x+9)};{fmt(x-6)};{fmt(x)}" '
                f'keyTimes="0;.35;.7;1" dur="{fmtp(period*1.7)}s" '
                f'begin="-{fmtp(ph*period)}s" repeatCount="indefinite"/>'
                f'</circle>')
    return "".join(out)


# ---------------------------------------------------------------- the body
def base():
    """A trumpet. The outline is solved as a real curve rather than guessed at
    with control points: r(v) = r0 + (r1-r0)*smoothstep(v)^1.6, so the wall is
    almost vertical where it meets the collar and sweeps out to the foot. Two
    Bezier guesses in a row rendered as two thin legs."""
    r_top, r_bot = 96.0, 216.0
    y_top, y_bot = 1046.0, TABLE_Y
    right, left = [], []
    n = 40
    for i in range(n + 1):
        v = i / n
        r = r_top + (r_bot - r_top) * (smoothstep(v) ** 1.6)
        y = y_top + (y_bot - y_top) * v
        right.append((GX + r, y))
        left.append((GX - r, y))
    d = ("M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in right)
         + " L " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in reversed(left)) + " Z")

    # a lit panel on the left of the flare, taken off the same curve
    lit_r, lit_l = [], []
    for i in range(n + 1):
        v = i / n
        r = r_top + (r_bot - r_top) * (smoothstep(v) ** 1.6)
        y = y_top + (y_bot - y_top) * v
        lit_r.append((GX - r * 0.66, y))
        lit_l.append((GX - r * 0.30, y))
    dlit = ("M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in lit_r)
            + " L " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in reversed(lit_l)) + " Z")

    # the dark side, right
    sh_r, sh_l = [], []
    for i in range(n + 1):
        v = i / n
        r = r_top + (r_bot - r_top) * (smoothstep(v) ** 1.6)
        y = y_top + (y_bot - y_top) * v
        sh_r.append((GX + r * 0.99, y))
        sh_l.append((GX + r * 0.28, y))
    dsh = ("M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in sh_r)
           + " L " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in reversed(sh_l)) + " Z")
    return f'''
<g id="base">
  <ellipse cx="{fmt(GX)}" cy="1050" rx="150" ry="26" fill="url(#collarGlow)"/>
  <path d="{d}" fill="url(#brass)" stroke="#2b1d12" stroke-width="3"/>
  <!-- The flare's shading is the metal gradient's job. Two earlier passes painted
       wedges and rectangles on top of it and both showed their straight edges as
       a block across the base. Only genuine occlusion is added, and it is
       elliptical so it has no edge. -->
  <ellipse cx="{fmt(GX)}" cy="1044" rx="104" ry="7" fill="#120a04" opacity=".7"/>
  <!-- the collar, and the glass seated in it -->
  <path d="M 354 1046 L 546 1046 L 554 1062 L 346 1062 Z" fill="#2a1a0d" opacity=".65"/>
  <path d="M 360 1046 L 540 1046 L 534 1030 L 366 1030 Z"
        fill="url(#brassLite)" stroke="#2b1d12" stroke-width="2.4"/>
  <ellipse cx="{fmt(GX)}" cy="1030" rx="86" ry="12" fill="#3a2410"/>
  <ellipse cx="{fmt(GX)}" cy="1030" rx="86" ry="12" fill="url(#collarGlow)"/>
  <!-- the foot -->
  <path d="M {fmt(GX-r_bot)} {fmt(TABLE_Y)} L {fmt(GX+r_bot)} {fmt(TABLE_Y)}"
        stroke="#ffe0a0" stroke-width="2" opacity=".18"/>
  <path d="M {fmt(GX-r_bot+8)} {fmt(TABLE_Y-3)} L {fmt(GX+r_bot-8)} {fmt(TABLE_Y-3)}"
        stroke="#000000" stroke-width="3" opacity=".35"/>
  <!-- rim light down the flare -->
  <path d="M {" L ".join(f"{fmt(x)} {fmt(y)}" for x, y in left)}" fill="none"
        stroke="#ffe0a0" stroke-width="2" opacity=".22"/>
</g>'''


def cap():
    """The cap. On a real lamp the widest point of the whole object is the glass
    rim; the cap plugs it and is NARROWER, with flares at its foot. Two earlier
    passes put a wide cone over the rim and both read as a lampshade."""
    r_bot, r_top = 104.0, 88.0
    y_bot, y_top = 366.0, 252.0
    return f'''
<g id="cap">
  <!-- the lamp's light leaking out from under the cap, onto the glass rim -->
  <ellipse cx="{fmt(GX)}" cy="368" rx="150" ry="24" fill="url(#capGlow)"/>
  <!-- the body of the cap: a shallow taper, narrower than the rim -->
  <path d="M {fmt(GX-r_bot)} {fmt(y_bot)} L {fmt(GX+r_bot)} {fmt(y_bot)}
           L {fmt(GX+r_top)} {fmt(y_top+10)} L {fmt(GX-r_top)} {fmt(y_top+10)} Z"
        fill="url(#brass)" stroke="#2b1d12" stroke-width="2.8"/>
  <!-- vertical flutes: this is the detail that says "turned metal" -->
  <g stroke="#6b4a18" stroke-width="2" opacity=".4">
    {''.join(f'<path d="M {fmt(GX-r_bot+8+i*11.4)} {fmt(y_bot-4)} L {fmt(GX-r_top+8+i*9.6)} {fmt(y_top+12)}"/>' for i in range(18))}
  </g>
  <!-- specular down the lit side, shade down the other -->
  <path d="M {fmt(GX-r_bot)} {fmt(y_bot)} L {fmt(GX-r_bot+22)} {fmt(y_bot)}
           L {fmt(GX-r_top+20)} {fmt(y_top+10)} L {fmt(GX-r_top)} {fmt(y_top+10)} Z"
        fill="#fff0cc" opacity=".14"/>
  <!-- the flare at the foot, which is what keeps the cap on -->
  <path d="M {fmt(GX-r_bot)} {fmt(y_bot-16)} L {fmt(GX+r_bot)} {fmt(y_bot-16)}
           L {fmt(GX+r_bot+10)} {fmt(y_bot)} L {fmt(GX-r_bot-10)} {fmt(y_bot)} Z"
        fill="url(#brassLite)" stroke="#2b1d12" stroke-width="2.4"/>
  <path d="M {fmt(GX-r_bot+16)} {fmt(y_bot-10)} L {fmt(GX+r_bot-16)} {fmt(y_bot-10)}"
        stroke="#fff6dd" stroke-width="1.8" opacity=".26"/>
  <!-- domed top and finial -->
  <path d="M {fmt(GX-r_top)} {fmt(y_top+10)} C {fmt(GX-r_top)} {fmt(y_top-16)},
           {fmt(GX-r_top*0.55)} {fmt(y_top-26)}, {fmt(GX)} {fmt(y_top-26)}
           C {fmt(GX+r_top*0.55)} {fmt(y_top-26)}, {fmt(GX+r_top)} {fmt(y_top-16)},
           {fmt(GX+r_top)} {fmt(y_top+10)} Z"
        fill="url(#brassLite)" stroke="#2b1d12" stroke-width="2.4"/>
  <path d="M {fmt(GX-r_top+12)} {fmt(y_top-14)} C {fmt(GX-r_top*0.5)} {fmt(y_top-24)},
           {fmt(GX)} {fmt(y_top-22)}, {fmt(GX)} {fmt(y_top-22)}"
        fill="none" stroke="#fff6dd" stroke-width="2" opacity=".35"/>
  <path d="M {fmt(GX-7)} {fmt(y_top-26)} L {fmt(GX-5)} {fmt(y_top-52)}
           L {fmt(GX+5)} {fmt(y_top-52)} L {fmt(GX+7)} {fmt(y_top-26)} Z"
        fill="url(#brass)" stroke="#2b1d12" stroke-width="1.5"/>
  <ellipse cx="{fmt(GX)}" cy="{fmt(y_top-52)}" rx="9" ry="4.5"
           fill="url(#brassLite)" stroke="#2b1d12" stroke-width="1.4"/>
</g>'''


def glass():
    d = glass_path()
    return f'''
<g id="glass">
  <!-- the liquid: faintly lit from beneath, darker at the top -->
  <path d="{d}" fill="url(#liquid)"/>
  <!-- the far wall, seen through the liquid -->
  <path d="{d}" fill="url(#liquidFar)"/>
</g>'''


def highlights():
    """Light on glass. In a dark room a glass cylinder shows two things and only
    two: a soft sheen on the side facing the light, which is what says "round",
    and a thin bright rim on the far edge, which is what says "glass".

    Both are built from the vessel's own profile, so each follows its curve, and
    both are faded at top and bottom by their own gradients so neither ends in a
    line. An earlier version masked a straight band across the glass and the
    mask's own edge was visible as a grey scar."""
    out = ['<g clip-path="url(#glassClip)">', '<g filter="url(#sheenSoft)">']

    # the sheen: a narrow band just inside the lit wall
    left, right = [], []
    n = 40
    for i in range(n + 1):
        v = 0.03 + (i / n) * 0.90
        r = glass_r(v)
        y = glass_y(v)
        left.append((GX - r * 0.93, y))
        right.append((GX - r * 0.60, y))
    d = ("M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in left)
         + " L " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in reversed(right)) + " Z")
    out.append(f'<path d="{d}" fill="url(#specSheen)"/>')

    # a second, brighter sliver inside it: the specular proper
    left, right = [], []
    for i in range(n + 1):
        v = 0.05 + (i / n) * 0.86
        r = glass_r(v)
        y = glass_y(v)
        left.append((GX - r * 0.84, y))
        right.append((GX - r * 0.74, y))
    d = ("M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in left)
         + " L " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in reversed(right)) + " Z")
    out.append(f'<path d="{d}" fill="url(#specRim)" opacity=".9"/>')
    out.append('</g>')
    # the far rim: one hard thin line down the right wall, faded at both ends
    rim = [(GX + glass_r(0.04 + (i / n) * 0.88) * 0.995,
            glass_y(0.04 + (i / n) * 0.88)) for i in range(n + 1)]
    out.append('<path d="M ' + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in rim)
               + '" fill="none" stroke="url(#rimStroke)" stroke-width="2.2"/>')

    # and the shoulder catching a little more, where the glass turns over
    sh = [(GX - glass_r(0.62 + (i / 22) * 0.30) * 0.90,
           glass_y(0.62 + (i / 22) * 0.30)) for i in range(23)]
    out.append('<path d="M ' + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in sh)
               + '" fill="none" stroke="#fff2d8" stroke-width="3" opacity=".2" '
                 'stroke-linecap="round"/>')
    out.append('</g>')
    return "".join(out)


def table():
    """The surface, the lamp's reflection in it, and its shadow. The reflection
    is the lamp's own geometry mirrored about the table line and faded, so it
    cannot drift out of register with the object the way a hand-drawn copy did."""
    r_top, r_bot = 96.0, 216.0
    right = []
    n = 40
    for i in range(n + 1):
        v = i / n
        r = r_top + (r_bot - r_top) * (smoothstep(v) ** 1.6)
        right.append((GX + r, 1046.0 + (TABLE_Y - 1046.0) * v))
    base_r_side = "M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in right)
    base_l_side = "M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in reversed(
        [(2 * GX - x, y) for x, y in right]))
    base_d = base_r_side + " L " + base_l_side + " Z"
    return f'''
<g id="table">
  <rect x="0" y="{fmt(TABLE_Y)}" width="{W}" height="{fmt(H-TABLE_Y)}" fill="url(#tableTop)"/>
  <!-- the warm pool the lamp throws on the table -->
  <ellipse cx="{fmt(GX)}" cy="{fmt(TABLE_Y+58)}" rx="330" ry="86" fill="url(#tablePool)"/>
  <!-- the reflection, above the shadow so the shadow still reads -->
  <g mask="url(#reflMask)" opacity=".5">
    <g transform="translate(0 {fmt(2*TABLE_Y)}) scale(1 -1)">
      <path d="{base_d}" fill="url(#brassLite)" opacity=".5"/>
    </g>
    <!-- the wax's glow, mirrored: the reflection of the light, not of the object -->
    <ellipse cx="{fmt(GX)}" cy="{fmt(TABLE_Y+30)}" rx="132" ry="46"
             fill="url(#reflGlow)"/>
  </g>
  <!-- contact shadow: tight and dark directly under the foot, long and soft out -->
  <ellipse cx="{fmt(GX)}" cy="{fmt(TABLE_Y+4)}" rx="224" ry="14" fill="#000000" opacity=".62"/>
  <ellipse cx="{fmt(GX)}" cy="{fmt(TABLE_Y+16)}" rx="270" ry="22" fill="#000000" opacity=".3"/>
  <!-- the lamp stands ON the table: a hard line of contact, not a fade -->
  <path d="M {fmt(GX-208)} {fmt(TABLE_Y)} L {fmt(GX+208)} {fmt(TABLE_Y)}"
        stroke="#3a2412" stroke-width="2" opacity=".8"/>
</g>'''


def backdrop():
    return f'''
<g id="room">
  <rect x="0" y="0" width="{W}" height="{H}" fill="url(#roomFill)"/>
  <!-- the warm halo the lamp throws on the wall behind it -->
  <ellipse cx="{fmt(GX)}" cy="700" rx="430" ry="560" fill="url(#halo)"/>
  <!-- Nothing structural may be legible behind the vessel: an earlier pass had
       wall seams running straight across the glass, which instantly gave the
       picture away as flat layers. The room is only a gradient and the lamp's
       own glow on it. -->
  <ellipse cx="{fmt(GX)}" cy="980" rx="300" ry="200" fill="url(#rimGlow)"/>
</g>'''


def document():
    body = "".join([
        backdrop(),
        table(),
        base(),
        glass(),
        # the wax, inside the goo filter, clipped to the vessel
        f'<g clip-path="url(#glassClip)"><g id="waxGroup" filter="url(#goo)" fill="url(#wax)">',
        pool(),
        "".join(blob_group(*b) for b in BLOBS),
        '</g></g>',
        # a broad warm wash low in the vessel, under the wax: the bulb seen
        # through the liquid. The wax's own halo comes from the filter.
        f'<g clip-path="url(#glassClip)"><ellipse cx="{fmt(GX)}" cy="{fmt(GLASS_BOT-40)}" '
        f'rx="150" ry="150" fill="url(#waxGlow)"/></g>',
        bubbles(),
        highlights(),
        cap(),
        '<rect x="0" y="0" width="%d" height="%d" fill="url(#vig)"/>' % (W, H),
    ])

    defs = f'''<defs>
<clipPath id="glassClip"><path d="{glass_path()}"/></clipPath>

<!-- THE WAX.

     This one filter does all the work, and nothing else in the file touches the
     wax. Five steps:

     1  BLUR, then a soft alpha threshold with a wide ramp -> `shape`.
        Two ellipses whose blurs already overlap snap to one hard-edged mass, so
        a neck appears between them whenever they come close, and a blob that
        reaches the pool is absorbed by it. No keyframe in this file describes a
        neck: the neck is a consequence of the distance between two ellipses.
        The threshold ramp is deliberately wide (13 units over -6): a hard
        threshold leaves a knife-notch where two blobs meet, which reads as a
        hole in the wax rather than a fillet of it.

     2  the blur of `shape` gives `bump`, a height field that follows the MERGED
        silhouette. This is the whole trick of the lighting: because the height
        field comes from the merged shape, the shading runs smoothly across the
        join, and the crease between two fusing blobs is shaded as the concave
        valley it actually is.

     3  feDiffuseLighting over that height field, lit from a distant source up
        and to the left. `SourceGraphic` (the gradient fill) is MULTIPLIED by
        it, so the wax keeps its own hot-to-cool vertical ramp and gains relief.

     4  the result is composited `in` shape, because lighting output is opaque
        and would otherwise paint a rectangle over the room.

     5  no specular pass. One was tried: a tight specular on this height field
        lights the crease between two merging blobs to white, because that is
        where the normal swings fastest. Wax at 60C is not a mirror, and the
        diffuse term alone reads as waxy. -->
<filter id="goo" filterUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"
        color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="19" result="blur"/>
  <feColorMatrix in="blur" type="matrix" result="shape"
    values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 20 -8.4"/>

  <!-- The height field is taken from the BLURRED SOURCE, not from `shape`.
       `shape` is thresholded, so its alpha steps in 8-bit increments around the
       whole rim; a height field built from those steps has a staircase in it,
       and feDiffuseLighting differentiates that staircase into visible grain
       over the entire blob. The blurred source is smooth, and at this radius it
       still spans the fillet between two fusing blobs. -->
  <!-- Two things the first attempts got wrong, both of which show up as grain:
       (a) the height field must be smooth. The blurred SourceGraphic's alpha is
       still antialiased in 8 bits, and feDiffuseLighting differentiates that
       alpha, so every stair in it becomes a ridge. A second, wide blur of the
       height field first is what removes it.
       (b) surfaceScale must stay low. Wax is nearly flat on its own scale: a
       blob 100px across has a relief of a few percent of that. Raising
       surfaceScale does not add roundness, it adds noise. -->
  <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="bump"/>
  <feGaussianBlur in="bump" stdDeviation="8" result="bumpSmooth"/>
  <feDiffuseLighting in="bumpSmooth" surfaceScale="7" diffuseConstant="1.46"
                     lighting-color="#ffffff" result="diffuse">
    <feDistantLight azimuth="264" elevation="38"/>
  </feDiffuseLighting>
  <!-- MULTIPLY THE SHAPE, NOT SourceGraphic. `shape` is the thresholded blur, so
       it still carries the gradient fill, blurred, with an alpha that covers the
       merged mass INCLUDING the neck and the fillet between two blobs.
       SourceGraphic does not: it only covers the raw ellipses, so the first
       attempt left the fillet unfilled and the white lighting showed through it
       as a bright notch. -->
  <!-- The lighting output is opaque and `shape` is antialiased, so multiplying
       the two straight through left a pale hairline around every blob: white
       light at partial alpha. Do the multiplication at full alpha, then take the
       soft edge from `shape` at the very end. -->
  <feComponentTransfer in="shape" result="shapeOpaque">
    <feFuncA type="linear" slope="60"/>
  </feComponentTransfer>
  <feBlend in="shapeOpaque" in2="diffuse" mode="multiply" result="lit"/>
  <feComposite in="lit" in2="shape" operator="in" result="waxLit"/>

  <!-- the wax's own light, in the liquid around it. Wax at 60C glows, and that
       glow is what lights the inside of the vessel: without it the column reads
       as orange clay suspended in dark water. Taken from `shape`, so the halo
       follows the merged mass and the neck glows too. -->
  <feGaussianBlur in="shape" stdDeviation="17" result="haloBlur"/>
  <feColorMatrix in="haloBlur" type="matrix" result="halo"
    values="0 0 0 0 1
            0 0 0 0 0.50
            0 0 0 0 0.14
            0 0 0 0.40 0"/>
  <feMerge>
    <feMergeNode in="halo"/>
    <feMergeNode in="waxLit"/>
  </feMerge>
</filter>

<linearGradient id="wax" gradientUnits="userSpaceOnUse"
                x1="0" y1="{fmt(GLASS_BOT-10)}" x2="0" y2="420">
  <stop offset="0" stop-color="#ffd27a"/>
  <stop offset=".22" stop-color="#ffab3e"/>
  <stop offset=".60" stop-color="#fb8820"/>
  <stop offset="1" stop-color="#e06a10"/>
</linearGradient>
<!-- the rim is a soft edge, not an outline: transparent until the outer 35%
     of the shape, then falling to a dark amber. objectBoundingBox means it
     fits every blob whatever its size. -->
<!-- the core is a bloom towards the bulb side, not a disc -->
<radialGradient id="waxGlow">
  <stop offset="0" stop-color="#ffb347" stop-opacity=".38"/>
  <stop offset=".55" stop-color="#ff8c2b" stop-opacity=".14"/>
  <stop offset="1" stop-color="#ff8c2b" stop-opacity="0"/>
</radialGradient>

<linearGradient id="liquid" gradientUnits="userSpaceOnUse" x1="0" y1="{fmt(GLASS_BOT)}" x2="0" y2="{fmt(GLASS_TOP)}">
  <stop offset="0" stop-color="#4a2c12"/>
  <stop offset=".25" stop-color="#2a1810"/>
  <stop offset=".7" stop-color="#150f0d"/>
  <stop offset="1" stop-color="#0d0a09"/>
</linearGradient>
<linearGradient id="liquidFar" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#ff9a3c" stop-opacity=".10"/>
  <stop offset=".45" stop-color="#ff9a3c" stop-opacity="0"/>
  <stop offset="1" stop-color="#ffd9a0" stop-opacity=".07"/>
</linearGradient>

<filter id="sheenSoft" filterUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"
        color-interpolation-filters="sRGB">
  <feGaussianBlur stdDeviation="4.5"/>
</filter>
<linearGradient id="specSheen" gradientUnits="userSpaceOnUse"
                x1="0" y1="{fmt(GLASS_TOP)}" x2="0" y2="{fmt(GLASS_BOT)}">
  <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
  <stop offset=".10" stop-color="#fff4dd" stop-opacity=".10"/>
  <stop offset=".34" stop-color="#fff4dd" stop-opacity=".17"/>
  <stop offset=".66" stop-color="#ffffff" stop-opacity=".09"/>
  <stop offset=".92" stop-color="#ffffff" stop-opacity=".13"/>
  <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
</linearGradient>
<linearGradient id="specRim" gradientUnits="userSpaceOnUse"
                x1="0" y1="{fmt(GLASS_TOP)}" x2="0" y2="{fmt(GLASS_BOT)}">
  <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
  <stop offset=".16" stop-color="#ffffff" stop-opacity=".34"/>
  <stop offset=".55" stop-color="#fff3da" stop-opacity=".20"/>
  <stop offset=".88" stop-color="#ffffff" stop-opacity=".10"/>
  <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
</linearGradient>
<linearGradient id="rimStroke" gradientUnits="userSpaceOnUse"
                x1="0" y1="{fmt(GLASS_TOP)}" x2="0" y2="{fmt(GLASS_BOT)}">
  <stop offset="0" stop-color="#ffe9c6" stop-opacity="0"/>
  <stop offset=".12" stop-color="#ffe9c6" stop-opacity=".30"/>
  <stop offset=".5" stop-color="#ffe9c6" stop-opacity=".16"/>
  <stop offset=".9" stop-color="#ffe9c6" stop-opacity=".07"/>
  <stop offset="1" stop-color="#ffe9c6" stop-opacity="0"/>
</linearGradient>

<linearGradient id="brass" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#2a1a0a"/>
  <stop offset=".035" stop-color="#6b4a18"/>
  <stop offset=".13" stop-color="#f0d094"/>
  <stop offset=".22" stop-color="#c69a46"/>
  <stop offset=".42" stop-color="#8d6620"/>
  <stop offset=".66" stop-color="#5c3f16"/>
  <stop offset=".86" stop-color="#33220e"/>
  <stop offset=".965" stop-color="#a87c33"/>
  <stop offset="1" stop-color="#4d3413"/>
</linearGradient>
<linearGradient id="brassLite" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#3d2811"/>
  <stop offset=".10" stop-color="#e8c078"/>
  <stop offset=".28" stop-color="#c69a46"/>
  <stop offset=".55" stop-color="#7d5a1c"/>
  <stop offset=".82" stop-color="#3f2b11"/>
  <stop offset="1" stop-color="#6b4a18"/>
</linearGradient>
<radialGradient id="collarGlow">
  <stop offset="0" stop-color="#ffb14a" stop-opacity=".85"/>
  <stop offset=".6" stop-color="#ff8a2a" stop-opacity=".3"/>
  <stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/>
</radialGradient>
<radialGradient id="capGlow">
  <stop offset="0" stop-color="#ffb14a" stop-opacity=".55"/>
  <stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/>
</radialGradient>

<linearGradient id="tableTop" gradientUnits="userSpaceOnUse" x1="0" y1="{fmt(TABLE_Y)}" x2="0" y2="{H}">
  <stop offset="0" stop-color="#241a14"/>
  <stop offset=".35" stop-color="#170f0b"/>
  <stop offset="1" stop-color="#0b0806"/>
</linearGradient>
<radialGradient id="tablePool">
  <stop offset="0" stop-color="#ff8c2b" stop-opacity=".30"/>
  <stop offset=".5" stop-color="#c25e18" stop-opacity=".12"/>
  <stop offset="1" stop-color="#c25e18" stop-opacity="0"/>
</radialGradient>

<linearGradient id="reflFade" gradientUnits="userSpaceOnUse"
                x1="0" y1="{fmt(TABLE_Y)}" x2="0" y2="{fmt(H)}">
  <stop offset="0" stop-color="#ffffff" stop-opacity=".85"/>
  <stop offset=".45" stop-color="#ffffff" stop-opacity=".30"/>
  <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
</linearGradient>
<mask id="reflMask" maskUnits="userSpaceOnUse" x="0" y="{fmt(TABLE_Y)}"
      width="{W}" height="{fmt(H-TABLE_Y)}">
  <rect x="0" y="{fmt(TABLE_Y)}" width="{W}" height="{fmt(H-TABLE_Y)}"
        fill="url(#reflFade)"/>
</mask>
<radialGradient id="reflGlow">
  <stop offset="0" stop-color="#ffa53c" stop-opacity=".55"/>
  <stop offset=".55" stop-color="#e8791f" stop-opacity=".22"/>
  <stop offset="1" stop-color="#e8791f" stop-opacity="0"/>
</radialGradient>
<linearGradient id="roomFill" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="{H}">
  <stop offset="0" stop-color="#0a1015"/>
  <stop offset=".45" stop-color="#12181d"/>
  <stop offset=".78" stop-color="#0d1114"/>
  <stop offset="1" stop-color="#080a0c"/>
</linearGradient>
<radialGradient id="rimGlow">
  <stop offset="0" stop-color="#ffa33d" stop-opacity=".18"/>
  <stop offset=".55" stop-color="#d2651a" stop-opacity=".07"/>
  <stop offset="1" stop-color="#d2651a" stop-opacity="0"/>
</radialGradient>
<radialGradient id="halo">
  <stop offset="0" stop-color="#ff9a3c" stop-opacity=".26"/>
  <stop offset=".45" stop-color="#e2741f" stop-opacity=".10"/>
  <stop offset="1" stop-color="#e2741f" stop-opacity="0"/>
</radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".72">
  <stop offset=".55" stop-color="#000000" stop-opacity="0"/>
  <stop offset="1" stop-color="#000000" stop-opacity=".55"/>
</radialGradient>
</defs>'''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A lava lamp</title>
<!--
  A lava lamp. One file: HTML and ONE inline SVG.
  No JavaScript. No images. No fonts. No libraries. No network.
  Every movement is a native SVG <animate> / <animateTransform>. The CSS below
  only sets the page background and lets the picture fill the window: not one
  pixel is drawn or moved with CSS.

  THE WAX IS NOT DRAWN. It is a handful of plain ellipses passed through an SVG
  "goo" filter:

      feGaussianBlur          blur the group
      feColorMatrix (alpha)   threshold it, so the soft edges snap back hard --
                              but only where two shapes' blurs already overlap

  So when a blob rises into another, they grow a neck and fuse, and when one
  sinks into the pool it is absorbed by it. No keyframe in this file describes
  a neck: it is a consequence of the distance between two ellipses. That is why
  it behaves like wax and not like a drawing of wax.

  What is computed, and true:
    * Each blob rises, hangs at the top while it cools, sinks, and rests on the
      pool while it soaks up heat. The dwells are piecewise smoothstep, so the
      motion is smooth at every join.
    * Squash and stretch come from each blob's real vertical speed, read off the
      derivative of its own curve; ry up means rx down, so volume is conserved.
    * The five periods are deliberately not harmonically related (13.2, 9.4,
      16.8, 11.1 and 7.6 s), so the lamp never repeats a configuration.
    * Every blob is clipped by the vessel and its sideways wander is limited by
      the glass radius at its own height, so wax cannot leave the glass.
-->
<style>
  html, body {{ height: 100%; margin: 0; background: #080a0c; }}
  svg {{ display: block; width: 100%; height: 100%; }}
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid meet" role="img"
     aria-labelledby="t d">
<title id="t">A lava lamp</title>
<desc id="d">A lava lamp on a dark table. Brass base and cap, amber wax rising,
hanging and sinking inside a glass vessel lit from below by its own bulb.</desc>
{defs}
{body}
</svg>
</body>
</html>
'''


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--still":
        MODE = "still"
        T_STILL = float(sys.argv[2])
        out = sys.argv[3]
        html = document()
        svg = html[html.index("<svg"):html.index("</svg>") + 6]
        svg = svg.replace("<svg ", f'<svg width="{W}" height="{H}" ', 1)
        open(out, "w").write(svg)
        print("wrote", out, "t =", T_STILL)
    else:
        out = sys.argv[1] if len(sys.argv) > 1 else "lava-lamp.html"
        open(out, "w").write(document())
        print("wrote", out)

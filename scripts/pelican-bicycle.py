#!/usr/bin/env python3
"""
Generator for pelican-riding-a-bicycle.html.

The delivered artifact is a single self-contained HTML file (inline SVG + SMIL,
no JavaScript). The pedal cycle and the legs are not eyeballed: this script
solves a two-link IK for the pelican's legs across the whole crank rev and
emits the resulting poses as SMIL `values` lists, so the feet stay planted on
the pedals at all times.

Geometry contract (screen coords, y grows downward, angles clockwise from +x):
  rear wheel  A = (298, 1152)   front wheel B = (586, 1152)   r = 48
  bottom brg  C = (366, 1147)   crank length 26   36T ring, 24T cog
  wheel rev   2.1 s   crank rev 3.15 s   (ratio 3:2, as geared)
  deck scrolls exactly one tyre circumference (2*pi*48) per wheel rev,
  so the tyre never slips against the planks.
"""
import math

# ---------------------------------------------------------------- geometry --
A = (298.0, 1152.0)          # rear axle
B = (586.0, 1152.0)          # front axle
C = (366.0, 1147.0)          # bottom bracket
R_WHEEL = 48.0
R_RING  = 26.0               # chainring, 36 teeth
R_COG   = 17.333             # cog, 24 teeth (26 * 24/36)
CRANK   = 26.0               # crank length
T_WHEEL = 2.1                # s per wheel revolution
T_CRANK = 3.15               # s per crank revolution (36/24 = 1.5)
CIRC    = 2 * math.pi * R_WHEEL

NEAR_HIP = (346.0, 966.0)
FAR_HIP  = (330.0, 970.0)
L1, L2   = 108.0, 112.0      # thigh, shin

def p(x, y):
    return f"{x:.2f},{y:.2f}"

def polar(c, r, deg):
    rad = math.radians(deg)
    return (c[0] + r * math.cos(rad), c[1] + r * math.sin(rad))

def ik(hip, foot):
    """Two-bone IK. Knee resolves toward +x (forward). Returns (knee, foot)."""
    hx, hy = hip; fx, fy = foot
    dx, dy = fx - hx, fy - hy
    d = math.hypot(dx, dy)
    d = min(max(d, abs(L1 - L2) + 0.01, 1e-6), L1 + L2 - 0.01)
    # rescale foot if clamped (practically never)
    ux, uy = dx / (math.hypot(dx, dy) or 1), dy / (math.hypot(dx, dy) or 1)
    fx, fy = hx + ux * d, hy + uy * d
    a = (L1 * L1 - L2 * L2 + d * d) / (2 * d)
    h = math.sqrt(max(L1 * L1 - a * a, 0.0))
    mx, my = hx + a * ux, hy + a * uy
    px, py = -uy, ux
    k1 = (mx + h * px, my + h * py)
    k2 = (mx - h * px, my - h * py)
    knee = k1 if k1[0] >= k2[0] else k2
    return knee, (fx, fy)

def bob_at(t, t_crank=T_CRANK, amp=5.5, phase=0.9):
    return amp * math.sin(4 * math.pi * t / t_crank + phase)

def keyframes(n=25):
    """Sample one full crank revolution. Returns (near_leg_d, far_leg_d,
    near_foot_xy, far_foot_xy, bob_vals, rock_vals, pedal_near_deg_list)."""
    near_d, far_d = [], []
    near_foot, far_foot = [], []
    bob_vals, rock_vals = [], []
    key_times = []
    for i in range(n + 1):
        f = i / n
        t = f * T_CRANK
        phi = -65.0 + 360.0 * f          # near crank angle, clockwise from +x
        bob = bob_at(t)
        rock = 1.7 * math.sin(4 * math.pi * t / T_CRANK + 0.9 + math.pi)
        for (hip, off, acc) in ((NEAR_HIP, 0.0, near_d), (FAR_HIP, 180.0, far_d)):
            a = math.radians(phi + off)
            foot = (C[0] + CRANK * math.cos(a), C[1] + CRANK * math.sin(a))
            hip_b = (hip[0], hip[1] + bob)
            knee, foot = ik(hip_b, foot)
            acc.append(f"M{p(*hip_b)} L{p(*knee)} L{p(*foot)}")
            (near_foot if off == 0.0 else far_foot).append(p(*foot))
        bob_vals.append(f"0,{bob:.2f}")
        rock_vals.append(f"{rock:.3f},360,890")
        key_times.append(f"{f:.4f}")
    return near_d, far_d, near_foot, far_foot, bob_vals, rock_vals, key_times

def chain_tangents():
    """External tangents between chainring (C, R_RING) and cog (A, R_COG)."""
    dx, dy = A[0] - C[0], A[1] - C[1]
    d = math.hypot(dx, dy)
    ux, uy = dx / d, dy / d
    beta = math.acos((R_RING - R_COG) / d)      # tilt of the tangent normal from u
    res = []
    for sign in (+1, -1):
        ca, sa = math.cos(sign * beta), math.sin(sign * beta)
        nx, ny = ux * ca - uy * sa, ux * sa + uy * ca
        res.append(((C[0] + R_RING * nx, C[1] + R_RING * ny),
                    (A[0] + R_COG * nx,   A[1] + R_COG * ny)))
    return res

def spokes(cx, cy, r_in, r_out, n=16):
    segs = []
    for i in range(n):
        deg = i * (360.0 / n)
        x1, y1 = polar((cx, cy), r_in, deg)
        x2, y2 = polar((cx, cy), r_out, deg)
        segs.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}"/>')
    return "\n      ".join(segs)

def arc_path(c, r, a0, a1):
    """Arc from angle a0 to a1 (clockwise, degrees)."""
    x0, y0 = polar(c, r, a0); x1, y1 = polar(c, r, a1)
    large = 1 if abs(a1 - a0) > 180 else 0
    return f"M{x0:.1f},{y0:.1f} A{r},{r} 0 {large} 1 {x1:.1f},{y1:.1f}"


near_d, far_d, near_foot, far_foot, bob_vals, rock_vals, key_times = keyframes(25)
TAN = chain_tangents()
spokes_rear  = spokes(A[0], A[1], 6, 42)
spokes_front = spokes(B[0], B[1], 6, 42)

def glitter_rows():
    import random
    random.seed(11)
    out, y, i = [], 789.0, 0
    while y < 997:
        w = 22 + (y - 789) * 0.34
        jit = random.uniform(-12, 12)
        x = 470 + jit - w / 2
        o = random.uniform(0.32, 0.78)
        dur = random.uniform(2.2, 4.3)
        beg = -random.uniform(0, dur)
        out.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="3.4" rx="1.7" fill="#ffdcaa" opacity="{o:.2f}">'
                   f'<animate attributeName="opacity" values="{o:.2f};{max(o-0.4,0.08):.2f};{min(o+0.18,0.95):.2f};{o:.2f}" dur="{dur:.2f}s" begin="{beg:.2f}s" repeatCount="indefinite"/></rect>')
        y += 12.5
        i += 1
    return "\n    ".join(out)

def deck_seams():
    out = []
    bands = [(1010, 1043, 0.55), (1048, 1093, 0.5), (1098, 1148, 0.45), (1153, 1208, 0.4)]
    for r, (y0, y1, op) in enumerate(bands):
        x = -292 + r * 47.0
        while x < 1030:
            out.append(f'<line x1="{x:.1f}" y1="{y0}" x2="{x:.1f}" y2="{y1}" stroke="#4a2c17" stroke-width="3" opacity="{op}"/>')
            x += 100.53
    return "\n      ".join(out)

def railing_posts():
    out, x = [], -100.0
    while x < 950:
        out.append(f'<rect x="{x:.1f}" y="912" width="9" height="90" rx="4.5" fill="#22333d"/>')
        out.append(f'<circle cx="{x+4.5:.1f}" cy="912" r="5.6" fill="#2c414d"/>')
        out.append(f'<rect x="{x+6.6:.1f}" y="918" width="1.6" height="78" fill="#ffc98a" opacity="0.3"/>')
        x += 150.795
    return "\n      ".join(out)

def deck_bollards():
    out = []
    for x in (60.0, 361.59, 663.18, 964.77):
        out.append(f'<path d="M{x-13:.1f},1280 L{x-13:.1f},1249 A13,13 0 0 1 {x+13:.1f},1249 L{x+13:.1f},1280 Z" fill="#1d2c34"/>')
        out.append(f'<path d="M{x+6.5:.1f},1252 A13,13 0 0 1 {x+13:.1f},1251 L{x+13:.1f},1280 L{x+10.5:.1f},1280 L{x+10.5:.1f},1253 Z" fill="#ffc98a" opacity="0.28"/>')
    return "\n      ".join(out)

CHAIN_TOP = TAN[0]; CHAIN_BOT = TAN[1]
def chain_path():
    # pick the pair whose y is smaller as the top run
    a, b = CHAIN_TOP, CHAIN_BOT
    top = a if (a[0][1] + a[1][1]) < (b[0][1] + b[1][1]) else b
    bot = b if top is a else a
    (c0, a0) = top
    (c1, a1) = bot
    return (f"M{c0[0]:.1f},{c0[1]:.1f} L{a0[0]:.1f},{a0[1]:.1f} "
            f"M{a1[0]:.1f},{a1[1]:.1f} L{c1[0]:.1f},{c1[1]:.1f}")

chain_d = chain_path()

HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A Pelican Riding a Bicycle</title>
<!--
  A pelican riding a bicycle. One inline SVG, no JavaScript, no images, no
  fonts, no libraries. All motion is native SVG (<animate>, <animateTransform>).

  The ride is geared, not decorative:
    · 700c wheels (r = 48 units, 1 unit ≈ 25 mm), a 36-tooth chainring and a
      24-tooth cog, so the wheels turn once per 2.1 s and the cranks once per
      3.15 s — the 3:2 ratio a 36/24 gear gives.
    · The promenade scrolls exactly one tyre circumference (2·π·48) per wheel
      revolution: the tyre never slips on the planks. The railing behind runs
      at half that speed for parallax.
    · The pelican's legs are solved two-link IK (thigh 108, shin 112), keyframed
      25 times across the crank revolution. Each Webbed foot is planted on its
      pedal for every keyframe — the feet are never guessed where they are.
    · Body bob and neck rock run at twice crank frequency (once per power
      stroke), phase-shifted against each other.
    · You are here: a golden-hour promenade, a lighthouse on the point, two
      fish in the basket, "FRESH FISH" painted on the wicker.

  Made for this repository's owner. The build script that wrote this file is
  scripts/pelican-bicycle.py; the shipped file needs nothing but a browser.
-->
<style>
  html, body { height: 100%; margin: 0; }
  body {
    display: grid;
    place-items: center;
    background: radial-gradient(130% 105% at 50% 38%, #17323f 0%, #0b1a23 78%);
    overflow: hidden;
  }
  svg { display: block; width: 100vw; height: 100vh; }
  .plate { fill: #0b1a23; }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1280" preserveAspectRatio="xMidYMid meet" role="img"
     aria-label="A white pelican with a red scarf pedals a vintage red bicycle along a golden-hour promenade; its basket carries fresh fish.">
  <defs>
    <linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="780">
      <stop offset="0" stop-color="#4e9cc3"/>
      <stop offset="0.34" stop-color="#86bccd"/>
      <stop offset="0.62" stop-color="#dccf9e"/>
      <stop offset="0.83" stop-color="#ffc07a"/>
      <stop offset="1" stop-color="#ffab66"/>
    </linearGradient>
    <linearGradient id="sea" gradientUnits="userSpaceOnUse" x1="0" y1="780" x2="0" y2="1002">
      <stop offset="0" stop-color="#ffd09a"/>
      <stop offset="0.16" stop-color="#d8a276"/>
      <stop offset="0.38" stop-color="#8e7f74"/>
      <stop offset="0.62" stop-color="#3f5d6b"/>
      <stop offset="0.85" stop-color="#244356"/>
      <stop offset="1" stop-color="#1a3346"/>
    </linearGradient>
    <radialGradient id="sunCore">
      <stop offset="0" stop-color="#fff7d8"/>
      <stop offset="0.55" stop-color="#ffd98a"/>
      <stop offset="1" stop-color="#ffb45e"/>
    </radialGradient>
    <radialGradient id="sunGlow">
      <stop offset="0" stop-color="#ffe3a6" stop-opacity="0.85"/>
      <stop offset="0.45" stop-color="#ffcf94" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#ffcf94" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="seaSunPath">
      <stop offset="0" stop-color="#ffd9a0" stop-opacity="0.55"/>
      <stop offset="0.6" stop-color="#ffc98a" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#ffc98a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="deck" gradientUnits="userSpaceOnUse" x1="0" y1="1002" x2="0" y2="1280">
      <stop offset="0" stop-color="#d8a568"/>
      <stop offset="0.18" stop-color="#c1915a"/>
      <stop offset="0.45" stop-color="#a5743f"/>
      <stop offset="0.75" stop-color="#85602f"/>
      <stop offset="1" stop-color="#5f3d20"/>
    </linearGradient>
    <linearGradient id="bodyGrad" gradientUnits="userSpaceOnUse" x1="0" y1="850" x2="0" y2="1000">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.62" stop-color="#f5f2e9"/>
      <stop offset="1" stop-color="#dedacd"/>
    </linearGradient>
    <linearGradient id="pouchGrad" gradientUnits="userSpaceOnUse" x1="468" y1="790" x2="540" y2="862">
      <stop offset="0" stop-color="#f8c48d"/>
      <stop offset="0.55" stop-color="#eda567"/>
      <stop offset="1" stop-color="#d87f44"/>
    </linearGradient>
    <linearGradient id="billGrad" gradientUnits="userSpaceOnUse" x1="466" y1="768" x2="596" y2="806">
      <stop offset="0" stop-color="#f4b95c"/>
      <stop offset="0.6" stop-color="#e8933f"/>
      <stop offset="1" stop-color="#c96a2e"/>
    </linearGradient>
    <radialGradient id="lampGlow">
      <stop offset="0" stop-color="#fff0bc" stop-opacity="0.95"/>
      <stop offset="0.4" stop-color="#ffd98a" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#ffd98a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="brass">
      <stop offset="0" stop-color="#ffe9a8"/>
      <stop offset="0.55" stop-color="#d4a94e"/>
      <stop offset="1" stop-color="#8a6a24"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.44" r="0.78">
      <stop offset="0" stop-color="#000000" stop-opacity="0"/>
      <stop offset="0.68" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#060b12" stop-opacity="0.46"/>
    </radialGradient>
    <linearGradient id="beamGrad" gradientUnits="userSpaceOnUse" x1="123" y1="592" x2="383" y2="592">
      <stop offset="0" stop-color="#fff3c8" stop-opacity="0.75"/>
      <stop offset="0.5" stop-color="#fff3c8" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#fff3c8" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="topGrade" cx="0.5" cy="0" r="1.1">
      <stop offset="0" stop-color="#ffcf96" stop-opacity="0.16"/>
      <stop offset="0.45" stop-color="#ffcf96" stop-opacity="0"/>
    </radialGradient>
  </defs>
"""

HTML += r"""
  <!-- =======================  SKY  ======================= -->
  <rect x="0" y="0" width="720" height="780" fill="url(#sky)"/>
  <rect x="0" y="0" width="720" height="1280" fill="url(#topGrade)"/>

  <!-- sun glow and sun, dipping into the sea -->
  <circle cx="470" cy="742" r="238" fill="url(#sunGlow)"/>
  <circle cx="470" cy="742" r="102" fill="url(#sunCore)"/>

  <!-- clouds, looped seamlessly across a 720-unit wrap -->
  <g opacity="0.96">
    <animateTransform attributeName="transform" type="translate" values="0,0; -720,0" dur="170s" repeatCount="indefinite"/>
    <g fill="#ffedcf">
      <ellipse cx="96" cy="212" rx="64" ry="15"/><ellipse cx="140" cy="200" rx="42" ry="13"/><ellipse cx="66" cy="202" rx="26" ry="11"/>
      <ellipse cx="420" cy="124" rx="76" ry="17"/><ellipse cx="476" cy="110" rx="44" ry="14"/><ellipse cx="372" cy="112" rx="26" ry="11"/>
      <ellipse cx="648" cy="342" rx="56" ry="12"/><ellipse cx="694" cy="332" rx="30" ry="10"/>
      <ellipse cx="816" cy="212" rx="64" ry="15"/><ellipse cx="860" cy="200" rx="42" ry="13"/><ellipse cx="786" cy="202" rx="26" ry="11"/>
      <ellipse cx="1140" cy="124" rx="76" ry="17"/><ellipse cx="1196" cy="110" rx="44" ry="14"/><ellipse cx="1092" cy="112" rx="26" ry="11"/>
      <ellipse cx="1368" cy="342" rx="56" ry="12"/><ellipse cx="1414" cy="332" rx="30" ry="10"/>
    </g>
    <g fill="#e9b78d" opacity="0.75">
      <ellipse cx="110" cy="220" rx="58" ry="7"/>
      <ellipse cx="434" cy="131" rx="66" ry="7.5"/>
      <ellipse cx="654" cy="348" rx="48" ry="6"/>
      <ellipse cx="830" cy="220" rx="58" ry="7"/>
      <ellipse cx="1154" cy="131" rx="66" ry="7.5"/>
      <ellipse cx="1374" cy="348" rx="48" ry="6"/>
    </g>
  </g>

  <!-- headlands and the lighthouse on the point -->
  <path d="M0,780 L0,708 Q58,668 112,704 Q168,662 216,726 L216,780 Z" fill="#1f3a4d"/>
  <path d="M720,780 L720,724 Q678,700 642,738 L626,780 Z" fill="#1f3a4d"/>
  <g>
    <path d="M110,714 L114,606 L134,606 L138,714 Z" fill="#d8d2c2"/>
    <path d="M112,668 L136,668 L136,682 L112,682 Z" fill="#b03a28"/>
    <path d="M114,634 L134,634 L134,644 L114,644 Z" fill="#b03a28"/>
    <path d="M110,606 L138,606 L134,592 L114,592 Z" fill="#101d29"/>
    <circle cx="124" cy="600" r="4.6" fill="#ffe9a4"/>
    <path d="M126.5,596.4 Q138,595 144.6,600 L126.5,603.6 Z" fill="#ffe9a4" opacity="0.85"/>
    <g opacity="0.55">
      <animateTransform attributeName="transform" type="rotate" values="0,124,600; 360,124,600" dur="11s" repeatCount="indefinite"/>
      <path d="M124,600 L384,568 L384,632 Z" fill="url(#beamGrad)"/>
    </g>
  </g>

  <!-- a sailboat out in the glitter, bobbing gently -->
  <g>
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-4; 0,0" dur="4.4s" repeatCount="indefinite"/>
    <path d="M262,756 L302,756 L296,766 L268,766 Z" fill="#26221e"/>
    <path d="M282,724 L282,754 L262,754 Z" fill="#f3ecdc"/>
    <path d="M286,730 L286,754 L300,754 Z" fill="#e2d9c6"/>
  </g>

  <!-- gulls -->
  <g stroke="#22343f" stroke-width="2.4" fill="none" stroke-linecap="round">
    <path d="M356,636 Q364,628 372,636 Q380,628 388,636">
      <animate attributeName="d" values="M356,636 Q364,628 372,636 Q380,628 388,636;M356,636 Q364,641 372,636 Q380,641 388,636;M356,636 Q364,628 372,636 Q380,628 388,636" dur="1.15s" repeatCount="indefinite"/>
    </path>
    <path d="M512,566 Q519,559 526,566 Q533,559 540,566">
      <animate attributeName="d" values="M512,566 Q519,559 526,566 Q533,559 540,566;M512,566 Q519,570.5 526,566 Q533,570.5 540,566;M512,566 Q519,559 526,566 Q533,559 540,566" dur="0.95s" begin="-0.4s" repeatCount="indefinite"/>
    </path>
  </g>

  <!-- =======================  SEA  ======================= -->
  <rect x="0" y="780" width="720" height="222" fill="url(#sea)"/>
  <rect x="0" y="779.2" width="720" height="2.2" fill="#ffe6b4" opacity="0.9"/>
  <ellipse cx="470" cy="866" rx="150" ry="92" fill="url(#seaSunPath)"/>
    @GLITTER@
  <!-- slow swell streaks -->
  <g fill="#ffe9c8" opacity="0.9">
    <animateTransform attributeName="transform" type="translate" values="0,0; -720,0" dur="34s" repeatCount="indefinite"/>
    <rect x="60" y="822" width="210" height="3" rx="1.5" opacity="0.14"/>
    <rect x="330" y="852" width="280" height="3.4" rx="1.7" opacity="0.12"/>
    <rect x="620" y="818" width="190" height="3" rx="1.5" opacity="0.13"/>
    <rect x="140" y="906" width="250" height="3.6" rx="1.8" opacity="0.1"/>
    <rect x="520" y="940" width="230" height="3.8" rx="1.9" opacity="0.09"/>
    <rect x="780" y="822" width="210" height="3" rx="1.5" opacity="0.14"/>
    <rect x="1050" y="852" width="280" height="3.4" rx="1.7" opacity="0.12"/>
    <rect x="1340" y="818" width="190" height="3" rx="1.5" opacity="0.13"/>
    <rect x="860" y="906" width="250" height="3.6" rx="1.8" opacity="0.1"/>
    <rect x="1240" y="940" width="230" height="3.8" rx="1.9" opacity="0.09"/>
  </g>
"""

HTML += r"""
  <!-- ============  RAILING (half speed: parallax)  ============ -->
  <g>
    <rect x="-160" y="903" width="1040" height="14" rx="7" fill="#263b46"/>
    <rect x="-160" y="902" width="1040" height="2.4" fill="#ffc98a" opacity="0.55"/>
    <rect x="-160" y="956" width="1040" height="7" fill="#2c414d"/>
    <g>
      <animateTransform attributeName="transform" type="translate" values="0,0; -150.795,0" dur="2.1s" repeatCount="indefinite"/>
      @RAILING_POSTS@
    </g>
  </g>

  <!-- ===================  DECK (wheel-matched)  =================== -->
  <rect x="0" y="1002" width="720" height="278" fill="url(#deck)"/>
  <rect x="0" y="1001" width="720" height="3.4" fill="#e8c188" opacity="0.5"/>
  <line x1="0" y1="1045" x2="720" y2="1045" stroke="#5d3a20" stroke-width="2.4" opacity="0.6"/>
  <line x1="0" y1="1047.6" x2="720" y2="1047.6" stroke="#e8c188" stroke-width="1" opacity="0.25"/>
  <line x1="0" y1="1095" x2="720" y2="1095" stroke="#5d3a20" stroke-width="2.4" opacity="0.55"/>
  <line x1="0" y1="1097.6" x2="720" y2="1097.6" stroke="#e8c188" stroke-width="1" opacity="0.22"/>
  <line x1="0" y1="1150" x2="720" y2="1150" stroke="#5d3a20" stroke-width="2.6" opacity="0.6"/>
  <line x1="0" y1="1152.8" x2="720" y2="1152.8" stroke="#e8c188" stroke-width="1.1" opacity="0.25"/>
  <line x1="0" y1="1210" x2="720" y2="1210" stroke="#4a2c17" stroke-width="3" opacity="0.6"/>
  <!-- plank end-seams + mooring bollards: exactly one wheel circumference per loop -->
  <g>
    <animateTransform attributeName="transform" type="translate" values="0,0; -301.59,0" dur="2.1s" repeatCount="indefinite"/>
      @DECK_SEAMS@
      @BOLLARDS@
  </g>

  <!-- warm pool thrown by the headlamp onto the planks -->
  <ellipse cx="598" cy="1224" rx="152" ry="13" fill="#ffd98a" opacity="0.14"/>

  <!-- bicycle's shadow -->
  <ellipse cx="442" cy="1218" rx="238" ry="13" fill="#241305" opacity="0.45"/>

  <!-- ===================  WHEELS  =================== -->
  <!-- rear wheel -->
  <g>
    <circle cx="298" cy="1152" r="48" fill="none" stroke="#2b2622" stroke-width="9"/>
    <circle cx="298" cy="1152" r="41.6" fill="none" stroke="#efe9da" stroke-width="5.2"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" values="0,298,1152; 360,298,1152" dur="2.1s" repeatCount="indefinite"/>
      <g stroke="#d8d2c4" stroke-width="2.3" opacity="0.95">
      @SPOKES_REAR@
      </g>
      <circle cx="298" cy="1152" r="33" fill="none" stroke="#8f8a7c" stroke-width="1.4" opacity="0.7" stroke-dasharray="2 30.5"/>
      <circle cx="298" cy="1116" r="2.6" fill="#ff9c2e" stroke="#7a3c00" stroke-width="0.7"/>
    </g>
    <circle cx="298" cy="1152" r="6.2" fill="url(#brass)" stroke="#4a3810" stroke-width="1.2"/>
  </g>
  <!-- front wheel -->
  <g>
    <circle cx="586" cy="1152" r="48" fill="none" stroke="#2b2622" stroke-width="9"/>
    <circle cx="586" cy="1152" r="41.6" fill="none" stroke="#efe9da" stroke-width="5.2"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" values="0,586,1152; 360,586,1152" dur="2.1s" repeatCount="indefinite"/>
      <g stroke="#d8d2c4" stroke-width="2.3" opacity="0.95">
      @SPOKES_FRONT@
      </g>
      <circle cx="586" cy="1152" r="33" fill="none" stroke="#8f8a7c" stroke-width="1.4" opacity="0.7" stroke-dasharray="2 30.5"/>
      <circle cx="586" cy="1116" r="2.6" fill="#ff9c2e" stroke="#7a3c00" stroke-width="0.7"/>
    </g>
    <circle cx="586" cy="1152" r="6.2" fill="url(#brass)" stroke="#4a3810" stroke-width="1.2"/>
  </g>

  <!-- ============  FAR LEG (behind the frame)  ============ -->
  <path fill="none" stroke="#b0541c" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
    <animate attributeName="d" calcMode="linear" keyTimes="@KEYTIMES@"
             values="@FAR_D@" dur="3.15s" repeatCount="indefinite"/>
  </path>
  <g opacity="0.85">
    <animateTransform attributeName="transform" type="translate" calcMode="linear" keyTimes="@KEYTIMES@"
                      values="@FAR_FOOT@" dur="3.15s" repeatCount="indefinite"/>
    <path d="M-6.2,-2.1 L13.4,-4.4 L8.6,-0.2 L14.6,3.4 L-3.4,4.1 Q-8,1.2 -6.2,-2.1 Z" fill="#b0541c"/>
  </g>
"""

HTML += r"""
  <!-- =============  DRIVETRAIN: 36/24, one chain ============= -->
  <circle cx="298" cy="1152" r="17.3" fill="none" stroke="#3a332e" stroke-width="7" stroke-dasharray="3.4 3.03"/>
  <circle cx="298" cy="1152" r="12.4" fill="#241f1b"/>
  <path d="@CHAIN_D@" fill="none" stroke="#26211d" stroke-width="4.6"
        stroke-dasharray="6.4 6.7" stroke-dashoffset="0" stroke-linejoin="round">
    <animate attributeName="stroke-dashoffset" values="0; -131" dur="2.5s" repeatCount="indefinite"/>
  </path>
  <!-- chainring rides with the crank -->
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-65,366,1147; 295,366,1147" dur="3.15s" repeatCount="indefinite"/>
    <circle cx="366" cy="1147" r="26" fill="none" stroke="#b9b3a4" stroke-width="7.2" stroke-dasharray="4.54 2.27"/>
    <circle cx="366" cy="1147" r="19.4" fill="none" stroke="#8f8a7c" stroke-width="2.6"/>
    <circle cx="366" cy="1147" r="5.2" fill="#241f1b"/>
    <line x1="366" y1="1147" x2="385.5" y2="1128" stroke="#8f8a7c" stroke-width="4"/>
    <line x1="366" y1="1147" x2="372.2" y2="1172.6" stroke="#8f8a7c" stroke-width="4"/>
    <line x1="366" y1="1147" x2="341.6" y2="1155.4" stroke="#8f8a7c" stroke-width="4"/>
  </g>
  <!-- vintage chainguard over the top run -->
  <path d="@CHAINGUARD@" fill="none" stroke="#efe3c2" stroke-width="12.5" stroke-linecap="round" opacity="0.98"/>
  <path d="@CHAINGUARD@" fill="none" stroke="#c9b98d" stroke-width="1.6" stroke-linecap="round" opacity="0.8"/>

  <!-- ===================  FRAME =================== -->
  <g stroke-linecap="round" stroke-linejoin="round">
    <!-- pass 1: dark outline -->
    <g stroke="#571c0e">
      <line x1="298" y1="1152" x2="366" y2="1147" stroke-width="9.5"/>
      <line x1="298" y1="1152" x2="338" y2="1010" stroke-width="8.5"/>
      <line x1="366" y1="1147" x2="338" y2="1010" stroke-width="12.5"/>
      <line x1="338" y1="1010" x2="544" y2="1010" stroke-width="12.5"/>
      <line x1="366" y1="1147" x2="566" y2="1085" stroke-width="12.5"/>
      <line x1="544" y1="1010" x2="566" y2="1085" stroke-width="16.5"/>
      <line x1="566" y1="1085" x2="586" y2="1152" stroke-width="9.5"/>
    </g>
    <!-- pass 2: red paint -->
    <g stroke="#cd3f20">
      <line x1="298" y1="1152" x2="366" y2="1147" stroke-width="5.5"/>
      <line x1="298" y1="1152" x2="338" y2="1010" stroke-width="5"/>
      <line x1="366" y1="1147" x2="338" y2="1010" stroke-width="8"/>
      <line x1="338" y1="1010" x2="544" y2="1010" stroke-width="8"/>
      <line x1="366" y1="1147" x2="566" y2="1085" stroke-width="8"/>
    </g>
    <g stroke="#b93a1e">
      <line x1="544" y1="1010" x2="566" y2="1085" stroke-width="12"/>
      <line x1="566" y1="1085" x2="586" y2="1152" stroke-width="5.5"/>
    </g>
    <!-- sunlit top-edge highlight on the top tube -->
    <line x1="342" y1="1007.4" x2="540" y2="1007.4" stroke="#ff9a5c" stroke-width="1.7" opacity="0.85"/>
  </g>

  <!-- fenders -->
  <path d="@FENDER_REAR@" fill="none" stroke="#cd3f20" stroke-width="7.4" stroke-linecap="round"/>
  <path d="@FENDER_FRONT@" fill="none" stroke="#cd3f20" stroke-width="7.4" stroke-linecap="round"/>
  <path d="@FENDER_REAR@" fill="none" stroke="#ff8a50" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>
  <path d="@FENDER_FRONT@" fill="none" stroke="#ff8a50" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>
  <line x1="298" y1="1152" x2="250" y2="1118" stroke="#571c0e" stroke-width="2.6"/>
  <line x1="586" y1="1152" x2="628" y2="1116" stroke="#571c0e" stroke-width="2.6"/>

  <!-- =============  FAR CRANK + PEDAL (180° out)  ============= -->
  <g opacity="0.8">
    <g>
      <animateTransform attributeName="transform" type="rotate" values="115,366,1147; 475,366,1147" dur="3.15s" repeatCount="indefinite"/>
      <line x1="366" y1="1147" x2="392" y2="1147" stroke="#3a332e" stroke-width="7" stroke-linecap="round"/>
      <g transform="translate(392,1147)">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-115,0,0; -475,0,0" dur="3.15s" repeatCount="indefinite"/>
          <rect x="-9" y="-3.2" width="18" height="6.4" rx="3.2" fill="#241f1b"/>
        </g>
      </g>
    </g>
  </g>

  <!-- =============  NEAR CRANK + PEDAL  ============= -->
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-65,366,1147; 295,366,1147" dur="3.15s" repeatCount="indefinite"/>
    <line x1="366" y1="1147" x2="392" y2="1147" stroke="#241f1b" stroke-width="8" stroke-linecap="round"/>
    <line x1="372" y1="1144" x2="388" y2="1144" stroke="#8f8a7c" stroke-width="2" stroke-linecap="round"/>
    <g transform="translate(392,1147)">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="65,0,0; -295,0,0" dur="3.15s" repeatCount="indefinite"/>
        <rect x="-10.5" y="-3.6" width="21" height="7.2" rx="3.6" fill="#33291f" stroke="#171310" stroke-width="1"/>
        <rect x="-2.4" y="-3.6" width="4.8" height="7.2" fill="#ff9c2e" opacity="0.9"/>
      </g>
    </g>
  </g>

  <!-- =============  NEAR LEG (in front of everything)  ============= -->
  <path fill="none" stroke="#e2691e" stroke-width="7.6" stroke-linecap="round" stroke-linejoin="round">
    <animate attributeName="d" calcMode="linear" keyTimes="@KEYTIMES@"
             values="@NEAR_D@" dur="3.15s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" calcMode="linear" keyTimes="@KEYTIMES@"
                      values="@NEAR_FOOT@" dur="3.15s" repeatCount="indefinite"/>
    <path d="M-6.8,-2.3 L14.8,-4.8 L9.4,-0.2 L16,3.8 L-3.8,4.4 Q-8.8,1.3 -6.8,-2.3 Z" fill="#e2691e" stroke="#b34c12" stroke-width="1" stroke-linejoin="round"/>
  </g>
"""

HTML += r"""
  <!-- ============  SADDLE (the bike does not bob)  ============ -->
  <line x1="338" y1="1010" x2="334" y2="986" stroke="#8f8a7c" stroke-width="5.2"/>
  <path d="M312,987 Q314,975 330,974 L356,974 Q374,975 375,985 Q350,993 322,991 Z" fill="#4a2c14" stroke="#2a1a0c" stroke-width="1.4"/>
  <path d="M318,982.5 L368,982.5" stroke="#7a5230" stroke-width="1.6" opacity="0.9"/>
  <circle cx="330" cy="987.5" r="1.15" fill="#d8b25a"/><circle cx="344" cy="988" r="1.15" fill="#d8b25a"/><circle cx="358" cy="986.5" r="1.15" fill="#d8b25a"/>

  <!-- ============  HANDLEBAR, GRIPS, BELL, LAMP  ============ -->
  <line x1="544" y1="1012" x2="551" y2="954" stroke="#2f2a26" stroke-width="6.4" stroke-linecap="round"/>
  <path d="M551,954 Q552,942 541,941 Q505,937 477,953" fill="none" stroke="#2f2a26" stroke-width="7.6" stroke-linecap="round"/>
  <path d="M498,944.5 C489,947.6 482.5,951.3 474,956.5" fill="none" stroke="#efe3c2" stroke-width="12" stroke-linecap="round"/>
  <circle cx="471.5" cy="957.6" r="3.4" fill="#7a4a22"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" calcMode="linear"
      values="0,533,946; 0,533,946; 17,533,946; -13,533,946; 9,533,946; -5,533,946; 0,533,946; 0,533,946"
      keyTimes="0; 0.70; 0.76; 0.82; 0.88; 0.93; 0.97; 1" dur="6s" repeatCount="indefinite"/>
    <path d="M523.5,946 A9.5,7.4 0 0 1 542.5,946 Z" fill="url(#brass)" stroke="#6a4a14" stroke-width="1.1"/>
    <line x1="523" y1="946.6" x2="543" y2="946.6" stroke="#6a4a14" stroke-width="1.6"/>
    <line x1="543" y1="942" x2="549.5" y2="938.5" stroke="#3a332e" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="550.6" cy="937.8" r="1.7" fill="#171310"/>
  </g>
  <!-- headlamp on the fork crown -->
  <line x1="572" y1="1096" x2="579" y2="1108" stroke="#22262c" stroke-width="3.2"/>
  <circle cx="582" cy="1114" r="14.5" fill="url(#lampGlow)" opacity="0.85">
    <animate attributeName="opacity" values="0.85;0.68;0.9;0.74;0.85" dur="3.3s" repeatCount="indefinite"/>
  </circle>
  <rect x="573.5" y="1104" width="17" height="11" rx="5.5" fill="#22262c" stroke="#10151b" stroke-width="1.2"/>
  <circle cx="588.5" cy="1109.5" r="4.1" fill="#ffe6a8" stroke="#c9a24a" stroke-width="0.9"/>

  <!-- ============  BASKET WITH THE CATCH  ============ -->
  <path d="M572,1006 L652,1006 L643.5,1076 L580.5,1076 Z" fill="#b07a3f" stroke="#7d5226" stroke-width="3" stroke-linejoin="round"/>
  <g stroke="#8a5a2a" stroke-width="2" opacity="0.85">
    <line x1="575.5" y1="1023" x2="648.5" y2="1023"/>
    <line x1="578" y1="1039" x2="646" y2="1039"/>
    <line x1="580" y1="1054" x2="643.8" y2="1054"/>
    <line x1="582.5" y1="1067" x2="641.5" y2="1067"/>
  </g>
  <g stroke="#7d5226" stroke-width="2" opacity="0.8">
    <line x1="594" y1="1008" x2="591" y2="1074"/>
    <line x1="612" y1="1008" x2="612" y2="1074"/>
    <line x1="630" y1="1008" x2="633" y2="1074"/>
  </g>
  <text x="612" y="1051.5" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace"
        font-size="12.5" letter-spacing="1.6" fill="#f7ecc9" opacity="0.95">FRESH</text>
  <text x="612" y="1065.5" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace"
        font-size="12.5" letter-spacing="2.6" fill="#f7ecc9" opacity="0.95">FISH</text>
  <!-- today's catch, heads up -->
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-9,601,1004; 11,601,1004; -9,601,1004" dur="0.9s" repeatCount="indefinite"/>
    <ellipse cx="597" cy="972" rx="10.5" ry="17" fill="#7fb7c9" stroke="#4d7f8f" stroke-width="1.4"/>
    <path d="M597,951 L587,932 L600,940 L603,926 L608,945 Z" fill="#5d93a6" stroke="#4d7f8f" stroke-width="1.1" stroke-linejoin="round"/>
    <circle cx="593.4" cy="966" r="1.6" fill="#122028"/>
    <path d="M591,980 Q600,984 606,979" stroke="#4d7f8f" stroke-width="1.2" fill="none"/>
  </g>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="13,628,1005; -8,628,1005; 13,628,1005" dur="1.13s" begin="-0.5s" repeatCount="indefinite"/>
    <ellipse cx="631" cy="975" rx="9.5" ry="15.5" fill="#d9885a" stroke="#96562e" stroke-width="1.4"/>
    <path d="M631,956 L641,938 L640,954 L651,946 L640,966 Z" fill="#b4603a" stroke="#96562e" stroke-width="1.1" stroke-linejoin="round"/>
    <circle cx="627.4" cy="970" r="1.5" fill="#241109"/>
    <path d="M624,984 Q632,988 639,983" stroke="#96562e" stroke-width="1.1" fill="none"/>
  </g>
  <ellipse cx="612" cy="1006" rx="39" ry="5" fill="#38220f" opacity="0.9"/>
  <path d="M572,1006 A40,7 0 0 0 652,1006" fill="none" stroke="#8a5a2a" stroke-width="3.4"/>

  <!-- ============  THE PELICAN  ============ -->
  <g>
    <animateTransform attributeName="transform" type="translate" calcMode="linear" keyTimes="@KEYTIMES@"
                      values="@BOB@" dur="3.15s" repeatCount="indefinite"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" calcMode="linear" keyTimes="@KEYTIMES@"
                        values="@ROCK@" dur="3.15s" repeatCount="indefinite"/>
      <!-- tail plumes -->
      <path d="M262,914 L222,858 Q266,862 286,886 Z" fill="#f6f3e9" stroke="#d8d3c2" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M272,926 L240,878 Q278,884 294,902 Z" fill="#efece0" stroke="#d8d3c2" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M252,902 L234,842 Q272,852 282,878 Z" fill="#fbf9f0" stroke="#d8d3c2" stroke-width="1.5" stroke-linejoin="round"/>
      <!-- body -->
      <path d="M250,946 C244,884 296,852 356,854 C414,856 448,890 448,934 C448,972 414,994 352,996 C292,998 256,986 250,946 Z"
            fill="url(#bodyGrad)" stroke="#d5d0c0" stroke-width="2"/>
      <path d="M268,890 C302,864 356,857 402,870" fill="none" stroke="#ffdcae" stroke-width="2.6" opacity="0.8"/>
      <!-- folded wing on the flank -->
      <path d="M298,884 C266,900 258,938 276,962 C330,968 386,944 402,900 C362,878 330,877 298,884 Z"
            fill="#e8e4d6" stroke="#c9c4b2" stroke-width="1.6"/>
      <path d="M284,920 C312,924 340,918 366,902" fill="none" stroke="#c9c4b2" stroke-width="1.6"/>
      <path d="M288,938 C316,942 342,936 366,920" fill="none" stroke="#c9c4b2" stroke-width="1.6"/>
      <path d="M300,954 C322,956 342,950 360,938" fill="none" stroke="#c9c4b2" stroke-width="1.4"/>
      <path d="M300,946 Q322,956 344,949" fill="none" stroke="#d8d3c2" stroke-width="2"/>
      <!-- near wing, stretched to the grip -->
      <path d="M404,872 C436,880 458,902 466,928 C469,940 472,948 479,954 L462,962 C448,936 428,910 394,891 Z"
            fill="#f6f3e9" stroke="#d8d3c2" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M398,888 C424,898 446,918 460,942" fill="none" stroke="#ded9cb" stroke-width="2.2"/>
      <g stroke="#f6f3e9" stroke-width="5.2" stroke-linecap="round">
        <line x1="458" y1="930" x2="478" y2="944"/>
        <line x1="462" y1="939" x2="482" y2="952"/>
        <line x1="463" y1="948" x2="480" y2="960"/>
      </g>
      <g stroke="#cfc9b8" stroke-width="2.2" stroke-linecap="round">
        <line x1="472" y1="941" x2="478" y2="945"/>
        <line x1="476" y1="949" x2="482" y2="953"/>
        <line x1="474" y1="956" x2="480" y2="960"/>
      </g>
"""

HTML += r"""
      <!-- neck -->
      <path d="M396,884 C398,836 414,806 438,786 L470,802 C448,828 436,856 436,892 Z"
            fill="url(#bodyGrad)"/>
      <path d="M414,868 C416,836 428,812 448,796" fill="none" stroke="#e3ded0" stroke-width="3" stroke-linecap="round"/>
      <!-- scarf: knot plus two fluttering ends -->
      <path fill="#d2402f" stroke="#a52a1e" stroke-width="1.3" stroke-linejoin="round"
            d="M411,873 C378,866 348,870 318,886 C314,892 315,899 322,901 C351,885 382,880 413,883 Z">
        <animate attributeName="d" values="M411,873 C378,866 348,870 318,886 C314,892 315,899 322,901 C351,885 382,880 413,883 Z;M411,873 C376,870 344,878 314,898 C311,904 313,910 320,911 C350,890 381,885 413,883 Z;M411,873 C380,862 350,862 322,874 C318,880 320,887 327,888 C355,872 384,872 413,883 Z;M411,873 C376,870 344,878 314,898 C311,904 313,910 320,911 C350,890 381,885 413,883 Z;M411,873 C378,866 348,870 318,886 C314,892 315,899 322,901 C351,885 382,880 413,883 Z" dur="1.3s" repeatCount="indefinite"/>
      </path>
      <path fill="#c03a26" stroke="#a52a1e" stroke-width="1.3" stroke-linejoin="round"
            d="M415,881 C392,884 368,895 348,913 C345,918 347,923 353,923 C375,905 397,895 418,888 Z">
        <animate attributeName="d" values="M415,881 C392,884 368,895 348,913 C345,918 347,923 353,923 C375,905 397,895 418,888 Z;M415,881 C390,878 362,882 334,896 C331,901 333,907 340,908 C370,892 398,887 418,888 Z;M415,881 C394,887 372,901 354,921 C352,926 354,930 360,930 C381,908 400,897 418,888 Z;M415,881 C390,878 362,882 334,896 C331,901 333,907 340,908 C370,892 398,887 418,888 Z;M415,881 C392,884 368,895 348,913 C345,918 347,923 353,923 C375,905 397,895 418,888 Z" dur="1.65s" begin="-0.8s" repeatCount="indefinite"/>
      </path>
      <circle cx="417" cy="877" r="8.6" fill="#d2402f" stroke="#a52a1e" stroke-width="1.6"/>
      <circle cx="414.4" cy="874" r="2.3" fill="#e8604c" opacity="0.9"/>
      <!-- head -->
      <path d="M416,752 L406,733 L426,744 Z" fill="#f5f2e9" stroke="#d5d0c0" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M430,742 L424,722 L443,737 Z" fill="#f5f2e9" stroke="#d5d0c0" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M408,800 C404,762 424,738 450,737 C478,736 493,762 489,797 C470,808 430,810 408,800 Z"
            fill="url(#bodyGrad)" stroke="#d5d0c0" stroke-width="1.6"/>
      <path d="M413,762 C424,746 444,740 464,744" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.85" stroke-linecap="round"/>
      <!-- the calm, unimpressed eye -->
      <g transform="translate(457,774)">
        <g>
          <animateTransform attributeName="transform" type="scale" calcMode="linear" values="1,1; 1,1; 1,0.1; 1,1; 1,1" keyTimes="0; 0.42; 0.47; 0.52; 1" dur="4.8s" repeatCount="indefinite"/>
          <circle r="5.3" fill="#2a211c"/>
          <circle cx="1.7" cy="-1.7" r="1.55" fill="#ffffff"/>
        </g>
      </g>
      <path d="M442,765 Q454,761 468,766" fill="none" stroke="#b9b4a2" stroke-width="2.4" stroke-linecap="round"/>
      <!-- the famous pouch -->
      <path d="M462,786 C455,838 488,865 532,855 C553,850 565,828 567,803 C540,812 498,801 462,786 Z"
            fill="url(#pouchGrad)" stroke="#c97a45" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M486,817 C502,838 526,845 548,837" fill="none" stroke="#c97a45" stroke-width="1.6" opacity="0.75" stroke-linecap="round"/>
      <path d="M476,803 C497,826 527,833 553,823" fill="none" stroke="#c97a45" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>
      <!-- upper bill: long, decurved, with the nail at the tip -->
      <path d="M462,770 C505,775 545,785 586,797 C600,800 601,809 591,812 C566,815 511,806 466,791 Z"
            fill="url(#billGrad)" stroke="#b85a24" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M470,776 C508,781 545,790 580,801" fill="none" stroke="#c65a2c" stroke-width="1.7" opacity="0.85" stroke-linecap="round"/>
      <path d="M480,779 l6.5,1.8" stroke="#a34a22" stroke-width="2" opacity="0.9" stroke-linecap="round"/>
      <path d="M578,793 C592,796 601,802 597,812 C588,808 577,806 568,804 Z" fill="#8a3f1c" opacity="0.92" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- axle nuts, outermost hardware -->
  <circle cx="298" cy="1152" r="3.7" fill="url(#brass)" stroke="#3a2c0c" stroke-width="1"/>
  <circle cx="298" cy="1152" r="1.2" fill="#241f1b"/>
  <circle cx="586" cy="1152" r="3.7" fill="url(#brass)" stroke="#3a2c0c" stroke-width="1"/>
  <circle cx="586" cy="1152" r="1.2" fill="#241f1b"/>

  <!-- ============  GRADE  ============ -->
  <rect x="0" y="0" width="720" height="1280" fill="url(#vignette)" pointer-events="none"/>
</svg>
</body>
</html>
"""

import math as _math

replacements = {
    "@GLITTER@": glitter_rows(),
    "@RAILING_POSTS@": railing_posts(),
    "@DECK_SEAMS@": deck_seams(),
    "@BOLLARDS@": deck_bollards(),
    "@SPOKES_REAR@": spokes_rear,
    "@SPOKES_FRONT@": spokes_front,
    "@NEAR_D@": "; ".join(near_d),
    "@FAR_D@": "; ".join(far_d),
    "@NEAR_FOOT@": "; ".join(near_foot),
    "@FAR_FOOT@": "; ".join(far_foot),
    "@KEYTIMES@": ";".join(key_times),
    "@BOB@": "; ".join(bob_vals),
    "@ROCK@": "; ".join(rock_vals),
    "@CHAIN_D@": chain_d,
    "@CHAINGUARD@": arc_path(C, 33, 175, 365),
    "@FENDER_REAR@": arc_path(A, 58, 163, 337),
    "@FENDER_FRONT@": arc_path(B, 58, 197, 373),
}

for token, value in replacements.items():
    HTML = HTML.replace(token, value)

import re
leftover = sorted(set(re.findall(r"@[A-Z_]+@", HTML)))
assert not leftover, f"unreplaced tokens: {leftover}"

out_path = "pelican-riding-a-bicycle.html"
with open(out_path, "w") as f:
    f.write(HTML)
print(f"wrote {out_path}: {len(HTML)} bytes")

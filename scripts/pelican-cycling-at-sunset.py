#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
pelican.py -- generates pelican-cycling-at-sunset.html

One self-contained HTML file. One inline SVG. No JavaScript, no images, no
fonts, no network, no libraries. Every movement is a native SMIL <animate>
or <animateTransform>.

The picture is not eyeballed. The bicycle is defined in millimetres, as a real
Dutch roadster is, then projected to pixels; the pelican's legs and wing are
solved with a two-bone inverse kinematic; the parallax, the gearing and the
rolling all come from one number. Every keyframe is computed here, in Python,
and written into the file as plain numbers. Nothing is computed at run time.
"""
import math
import os

W, H = 1080, 1920

# ==========================================================================
# 1.  THE BICYCLE, IN MILLIMETRES.  Origin = rear axle.  y is up.
# ==========================================================================
R_MM = 350.0        # wheel radius: 700c rim (622/2) + a fat 39 mm tyre
WB = 1080.0         # wheelbase
BB_DROP = 72.0      # bottom bracket below the axle line
CS = 446.0          # chainstay
ST_LEN = 600.0      # seat tube, centre to top
ST_A = 73.0         # seat tube angle, degrees from horizontal
HT_LEN = 180.0      # head tube
HT_A = 70.0         # head angle, degrees from horizontal
FORK = 395.0        # fork, axle to crown, measured along the steering axis
RAKE = 55.0         # fork offset, measured perpendicular to that axis
POST = 110.0        # seatpost showing above the seat tube
CRANK_MM = 170.0
TEETH_F, TEETH_R = 40, 16
PITCH = 12.7        # one chain link, 1/2 inch
RATIO = TEETH_F / float(TEETH_R)

ca, sa = math.cos(math.radians(HT_A)), math.sin(math.radians(HT_A))
BB = (math.sqrt(CS * CS - BB_DROP * BB_DROP), -BB_DROP)
ST_TOP = (BB[0] - ST_LEN * math.cos(math.radians(ST_A)),
          BB[1] + ST_LEN * math.sin(math.radians(ST_A)))
RAIL = (BB[0] - (ST_LEN + POST) * math.cos(math.radians(ST_A)),
        BB[1] + (ST_LEN + POST) * math.sin(math.radians(ST_A)))
# crown -> axle = FORK along the axis + RAKE perpendicular to it
HEADBOT = (WB - FORK * ca - RAKE * sa, FORK * sa - RAKE * ca)
HEADTOP = (HEADBOT[0] - HT_LEN * ca, HEADBOT[1] + HT_LEN * sa)
STEM = (HEADTOP[0] + 95.0, HEADTOP[1] + 28.0)
GRIP = (900.0, 598.0)                      # swept back and up off the stem
RING_MM = TEETH_F * PITCH / (2 * math.pi)  # 80.85 mm pitch radius
COG_MM = TEETH_R * PITCH / (2 * math.pi)   # 32.34 mm

# ==========================================================================
# 2.  MILLIMETRES -> PIXELS
# ==========================================================================
OX = 235.0
GND = 1400.0                    # the line the tyres touch
S = 570.0 / WB                  # px per mm; a 1080 mm wheelbase is 570 px
RPX = R_MM * S                  # 184.72 px
OY = GND - RPX                  # axle height, 1215.28


def mm(x, y):
    return (OX + x * S, OY - y * S)


REAR = mm(0.0, 0.0)
FRONT = mm(WB, 0.0)
BBP = mm(*BB)
ST_TOP_P = mm(*ST_TOP)
RAIL_P = mm(*RAIL)
HEADBOT_P = mm(*HEADBOT)
HEADTOP_P = mm(*HEADTOP)
STEM_P = mm(*STEM)
GRIP_P = mm(*GRIP)
RING_R = RING_MM * S
COG_R = COG_MM * S
CRANK_R = CRANK_MM * S

# ==========================================================================
# 3.  TIME
# ==========================================================================
TW = 1.4                        # one wheel revolution
TC = TW * RATIO                 # one crank revolution (2.5 slower)
CIRC = 2 * math.pi * RPX        # 1160.55 px -- one tyre circumference
V = CIRC / TW                   # 828.96 px/s, the speed of the world
MPS = (V / S) / 1000.0          # 1.571 m/s
KPH = MPS * 3.6                 # 5.66 km/h

# ==========================================================================
# 4.  THE PELICAN (pixels)
# ==========================================================================
PEL = -26.0                     # the whole bird sits 26 px higher
HIP = (450.0, 890.0 + PEL)
FEMUR, TIBIA = 265.0, 215.0     # upper (feathered) / lower (scaly) leg
ANKLE_OFF = (-12.0, -30.0)      # the ankle, relative to the pedal spindle
SHOULDER = (510.0, 810.0 + PEL)
UPPER_W, FORE_W = 132.0, 132.0
BOB, ROCK = 3.5, 1.1            # body bob (px) and rock (degrees)
N = 48                          # keyframes per crank revolution

# ==========================================================================
# 5.  SCENERY
# ==========================================================================
HORIZON = 520.0
BANK_Y = 900.0
ROAD_TOP, ROAD_BOT = 938.0, 1780.0
SUN = (860.0, 455.0)

MINT, MINT_D = "#6fc9b0", "#3f9a84"
CREAM = "#f1e6cd"
LEATHER, LEATHER_D = "#8a4f2e", "#653920"
BODY_L, BODY_D = "#fffdf6", "#c6bdad"
SHADE = "#a89e8e"
LEG, LEG_D = "#f2a24c", "#c1742a"
CAP, CAP_D = "#2fa39c", "#1d7d77"
SCARF, SCARF_D = "#e2553a", "#ae3823"
INK = "#43302a"               # the contour that keeps the bird off the sky
BASKET_D = "#a4712f"
FISH = "#9dc3d2"

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir,
                   "pelican-cycling-at-sunset.html")


def f(v):
    s = ("%.2f" % float(v)).rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def pt(p):
    return "%s %s" % (f(p[0]), f(p[1]))


# --------------------------------------------------------------- kinematics
def ik2(hx, hy, tx, ty, l1, l2):
    """Two-bone inverse kinematic, solved on the REAR normal, so the middle
    joint swings backwards -- which is what a bird's ankle does."""
    dx, dy = tx - hx, ty - hy
    d = math.hypot(dx, dy)
    d = min(d, l1 + l2 - 1e-6)
    d = max(d, abs(l1 - l2) + 1e-6)
    ux, uy = dx / d, dy / d
    a = (l1 * l1 - l2 * l2 + d * d) / (2.0 * d)
    h = math.sqrt(max(0.0, l1 * l1 - a * a))
    return hx + a * ux - h * uy, hy + a * uy + h * ux


def rot(p, deg, c):
    a = math.radians(deg)
    dx, dy = p[0] - c[0], p[1] - c[1]
    return (c[0] + dx * math.cos(a) - dy * math.sin(a),
            c[1] + dx * math.sin(a) + dy * math.cos(a))


def w(t):
    return 2.0 * math.pi * t / TC


def body_tf(t):
    return (-BOB * math.cos(2 * w(t)), ROCK * math.sin(w(t)))


def hip_at(t):
    return HIP[0], HIP[1] + body_tf(t)[0]


def shoulder_at(t):
    bob, rock = body_tf(t)
    sx, sy = rot(SHOULDER, rock, HIP)
    return sx, sy + bob


def ankle_at(t, phase=0.0):
    th = w(t) + phase
    return (BBP[0] + CRANK_R * math.cos(th) + ANKLE_OFF[0],
            BBP[1] + CRANK_R * math.sin(th) + ANKLE_OFF[1])


def frames():
    return [i * TC / (N - 1) for i in range(N)]      # inclusive of TC: seamless


def leg_keys(phase):
    thigh, shank = [], []
    for t in frames():
        hx, hy = hip_at(t)
        ax, ay = ankle_at(t, phase)
        kx, ky = ik2(hx, hy, ax, ay, FEMUR, TIBIA)
        thigh.append("M %s %s L %s %s" % (f(hx), f(hy), f(kx), f(ky)))
        shank.append("M %s %s L %s %s" % (f(kx), f(ky), f(ax), f(ay)))
    return thigh, shank


def wing_keys():
    up, fore, elb = [], [], []
    for t in frames():
        sx, sy = shoulder_at(t)
        ex, ey = ik2(sx, sy, GRIP_P[0], GRIP_P[1], UPPER_W, FORE_W)
        up.append("M %s %s L %s %s" % (f(sx), f(sy), f(ex), f(ey)))
        fore.append("M %s %s L %s %s" % (f(ex), f(ey), f(GRIP_P[0]), f(GRIP_P[1])))
        elb.append((ex, ey))
    return up, fore, elb


def adur(vals, dur=TC):
    """The base d matters: without it a renderer that ignores SMIL -- or the
    very first frame -- loses the limb entirely."""
    return ('d="%s"><animate attributeName="d" dur="%ss" '
            'repeatCount="indefinite" values="%s"/>'
            % (vals[0], f(dur), ";".join(vals)))


def arot(cx, cy, a0, a1, dur):
    return ('<animateTransform attributeName="transform" type="rotate" from="%s '
            '%s %s" to="%s %s %s" dur="%ss" repeatCount="indefinite"/>'
            % (f(a0), f(cx), f(cy), f(a1), f(cx), f(cy), f(dur)))


# ------------------------------------------------------------- scrolling
LAY = (("hills", 0.03, 90.0), ("bank", 0.07, 30.0),
       ("road", 1.00, TW), ("fore", 1.75, TW))


def tiles(period, body):
    n = int((W + 2 * period) // period) + 2
    return "".join('<g transform="translate(%s 0)">%s</g>' % (f(k * period), body)
                   for k in range(n))


def scrolling(name, body):
    for nm, fac, dur in LAY:
        if nm == name:
            return ('<g><animateTransform attributeName="transform" '
                    'type="translate" from="0 0" to="%s 0" dur="%ss" '
                    'repeatCount="indefinite"/>%s</g>'
                    % (f(-V * fac * dur), f(dur), tiles(V * fac * dur, body)))
    raise KeyError(name)


# ---------------------------------------------------------------- pieces
def pedal_and_foot(dark):
    """Drawn in the pedal's own frame: the origin is the pedal spindle. The
    pedal counter-rotates inside the crank, and the foot is bolted to the
    pedal, so the foot stays level without a single keyframe."""
    lc = "#a8681f" if dark else LEG
    ld = "#8c5216" if dark else LEG_D
    p1 = "#4e4739" if dark else "#6f6757"
    p2 = "#736a58" if dark else "#a49c88"
    return ("".join([
        '<path d="M %s %s L -3 -13" stroke="%s" stroke-width="10" '
        'stroke-linecap="round" fill="none"/>' % (f(ANKLE_OFF[0]), f(ANKLE_OFF[1]), ld),
        '<path d="M -24 -10 C 2 -19 24 -20 33 -15 C 37 -13 36 -6 31 -4 '
        'L -20 -1 C -26 -1 -28 -6 -24 -10 Z" fill="%s"/>' % lc,
        '<g stroke="%s" stroke-width="2.4" fill="none" opacity=".85">'
        '<path d="M 4 -16 L 2 -3"/><path d="M 15 -17 L 13 -3"/></g>' % ld,
        '<rect x="-28" y="-7" width="56" height="13" rx="6" fill="%s"/>' % p1,
        '<rect x="-28" y="-7" width="56" height="5" rx="2.5" fill="%s" opacity=".85"/>' % p2,
        '<circle cx="0" cy="0" r="5.5" fill="%s"/>' % p1,
        '<circle cx="0" cy="0" r="2.3" fill="#3f3930"/>']))


def spokes(cx, cy, n=16, rin=15.0, rout=160.0, col="#efe6cd", wt=2.6):
    o = []
    for k in range(n):
        a = math.pi * k / n
        o.append('<line x1="%s" y1="%s" x2="%s" y2="%s"/>'
                 % (f(cx + rin * math.cos(a)), f(cy + rin * math.sin(a)),
                    f(cx - rout * math.cos(a)), f(cy - rout * math.sin(a))))
    return ('<g stroke="%s" stroke-width="%s" opacity=".9" stroke-linecap="round">'
            '%s</g>' % (col, f(wt), "".join(o)))


def wheel(cx, cy, dark=False):
    tire = "#3a332c" if dark else "#4a4139"
    rim = "#8d8677" if dark else "#e6dcc1"
    spk = "#9c9484" if dark else "#efe6cd"
    o = ['<g>', arot(cx, cy, 0, 360, TW)]
    o.append('<circle cx="%s" cy="%s" r="%s" fill="none" stroke="%s" '
             'stroke-width="26"/>' % (f(cx), f(cy), f(RPX - 8), tire))
    tread = []
    for k in range(16):
        a = 2 * math.pi * k / 16
        px, py = cx + (RPX - 8) * math.cos(a), cy + (RPX - 8) * math.sin(a)
        tread.append('<rect x="%s" y="%s" width="15" height="6" rx="3" '
                     'fill="#241f1a" transform="rotate(%s %s %s)"/>'
                     % (f(px - 7.5), f(py - 3), f(math.degrees(a) + 90), f(px), f(py)))
    o.append("".join(tread))
    o.append('<circle cx="%s" cy="%s" r="%s" fill="none" stroke="%s" stroke-width="7"/>'
             % (f(cx), f(cy), f(RPX - 21), rim))
    o.append(spokes(cx, cy, 16, 15, RPX - 24, spk, 2.6))
    o.append('<rect x="%s" y="%s" width="9" height="19" rx="4" fill="#8d8677" '
             'transform="rotate(34 %s %s)"/>'
             % (f(cx - 4.5), f(cy - RPX + 12), f(cx), f(cy)))
    o.append('</g>')
    o.append('<circle cx="%s" cy="%s" r="17" fill="#8d8677"/>' % (f(cx), f(cy)))
    o.append('<circle cx="%s" cy="%s" r="8" fill="#5e5749"/>' % (f(cx), f(cy)))
    return "".join(o)


def fender(cx, a0, a1, r=205.0):
    p0 = (cx + r * math.cos(math.radians(a0)), OY + r * math.sin(math.radians(a0)))
    p1 = (cx + r * math.cos(math.radians(a1)), OY + r * math.sin(math.radians(a1)))
    d = "M %s A %s %s 0 0 1 %s" % (pt(p0), f(r), f(r), pt(p1))
    return ('<path d="%s" fill="none" stroke="%s" stroke-width="15" stroke-linecap="round"/>'
            '<path d="%s" fill="none" stroke="%s" stroke-width="4" stroke-linecap="round" '
            'opacity=".75"/>' % (d, MINT, d, CREAM))


def ridge(period, base, amp, ph, col, op):
    n = max(16, int(round(period / 34.0)))
    pts = []
    for i in range(n + 1):
        u = 2 * math.pi * i / n
        y = (base - amp * (0.5 + 0.5 * math.sin(u + ph))
             - amp * 0.30 * (0.5 + 0.5 * math.sin(2 * u + 2 * ph))
             - amp * 0.14 * (0.5 + 0.5 * math.sin(3 * u + 3 * ph)))
        pts.append((period * i / n, y))
    d = "M " + " L ".join(pt(p) for p in pts) + \
        " L %s %s L 0 %s Z" % (f(period), f(base + 14), f(base + 14))
    return '<path d="%s" fill="%s" opacity="%s"/>' % (d, col, f(op))


def cloud(cx, cy, sc, op):
    return ('<g transform="translate(%s %s) scale(%s)" opacity="%s">'
            '<path fill="url(#cloud)" d="M -150 26 C -186 26 -198 -2 -172 -14 '
            'C -176 -44 -134 -60 -108 -42 C -88 -66 -40 -66 -22 -40 '
            'C 4 -62 52 -52 58 -22 C 88 -30 112 -10 104 14 C 122 20 118 32 100 30 '
            'L -140 30 Z"/>'
            '<path fill="#ffe0b0" opacity=".45" d="M -128 24 C -100 8 -50 6 -20 18 '
            'C 20 4 70 8 96 22 C 60 30 -80 32 -128 24 Z"/></g>'
            % (f(cx), f(cy), f(sc), f(op)))


def bank_tile(P):
    r = 31
    o = []
    for k in range(int(P / 90.0) + 1):
        rx = k * 90.0 + (r * 37 % 46)
        rh = 26 + (r * 53 % 48)
        r = (r * 1103515245 + 12345) & 0x7FFFFFFF
        o.append('<path d="M %s %s q %s %s %s %s" stroke="#2f2620" stroke-width="3" '
                 'fill="none" stroke-linecap="round"/>'
                 % (f(rx), f(BANK_Y + 4), f(-6 + r % 12), f(-rh * .6),
                    f(-4 + r % 16), f(-rh)))
    wx, wy = 430.0, BANK_Y - 112
    o.append('<g fill="#33281f"><path d="M %s %s L %s %s L %s %s L %s %s Z"/>'
             '<path d="M %s %s C %s %s %s %s %s %s Z"/></g>'
             % (f(wx - 26), f(BANK_Y + 4), f(wx + 26), f(BANK_Y + 4),
                f(wx + 15), f(BANK_Y - 92), f(wx - 15), f(BANK_Y - 92),
                f(wx - 21), f(BANK_Y - 88), f(wx - 21), f(wy - 3),
                f(wx + 21), f(wy - 3), f(wx + 21), f(BANK_Y - 88)))
    o.append('<g>' + arot(wx, wy, 0, 360, 7.5))
    for k in range(4):
        o.append('<g transform="rotate(%d %s %s)">'
                 '<rect x="%s" y="%s" width="68" height="7" rx="3" fill="#3d3025"/>'
                 '<rect x="%s" y="%s" width="62" height="4" fill="#54422f" opacity=".75"/>'
                 '</g>' % (k * 90, f(wx), f(wy), f(wx + 5), f(wy - 4), f(wx + 9), f(wy - 1)))
    o.append('<circle cx="%s" cy="%s" r="5" fill="#4a3a2b"/></g>' % (f(wx), f(wy)))
    px = 700.0
    o.append('<g fill="#2f2620"><rect x="%s" y="%s" width="7" height="218"/>'
             '<rect x="%s" y="%s" width="58" height="6"/>'
             '<rect x="%s" y="%s" width="42" height="5"/></g>'
             % (f(px), f(BANK_Y - 214), f(px - 26), f(BANK_Y - 202),
                f(px - 20), f(BANK_Y - 180)))
    return "".join(o)


def road_tile(P):
    r = 1013
    o = []

    def nxt():
        nonlocal r
        r = (r * 1103515245 + 12345) & 0x7FFFFFFF
        return r / float(0x7FFFFFFF)

    for k in range(15):
        sx = k * (P / 15.0) + nxt() * 44
        sy = 1012 + nxt() * 700
        sl = 40 + nxt() * 120
        o.append('<path d="M %s %s q %s %s %s 0" stroke="#6f6150" stroke-width="%s" '
                 'fill="none" opacity=".5" stroke-linecap="round"/>'
                 % (f(sx), f(sy), f(sl / 2), f(4 + nxt() * 5), f(sl), f(2 + nxt() * 3)))
    for k in range(2):
        cx0 = 120 + k * (P / 2.0) + nxt() * 180
        cy0 = 1090 + nxt() * 480
        o.append('<path d="M %s %s l 44 12 l -16 30 l 62 14 l -30 26 l 40 18" '
                 'stroke="#6b5c49" stroke-width="5" fill="none" opacity=".45" '
                 'stroke-linejoin="round"/>' % (f(cx0), f(cy0)))
    for k in range(170):
        gx, gy = nxt() * P, 990 + (nxt() ** 0.7) * 790
        gc = "#c2b294" if nxt() < 0.55 else "#6f6350"
        o.append('<circle cx="%s" cy="%s" r="%s" fill="%s" opacity="%s"/>'
                 % (f(gx), f(gy), f(1.6 + nxt() * 4.2), gc, f(0.28 + nxt() * 0.45)))
    return "".join(o)


def fore_tile(P):
    r = 555
    o = []

    def nxt():
        nonlocal r
        r = (r * 1103515245 + 12345) & 0x7FFFFFFF
        return r / float(0x7FFFFFFF)

    for k in range(int(P / 62.0) + 1):
        gx, gh = k * 62 + nxt() * 30, 40 + nxt() * 82
        o.append('<path d="M %s %s q -4 %s -10 %s M %s %s q 6 %s 14 %s" '
                 'stroke="#2f2a1c" stroke-width="4" fill="none" stroke-linecap="round" '
                 'opacity=".9"/>'
                 % (f(gx), f(H + 6), f(-gh * .5), f(-gh),
                    f(gx + 9), f(H + 8), f(-gh * .45), f(-gh * .8)))
    for k in range(int(P / 240.0) + 1):
        o.append('<ellipse cx="%s" cy="%s" rx="%s" ry="%s" fill="#5a4d38" opacity=".85"/>'
                 % (f(k * 240 + nxt() * 120), f(H - 18 + nxt() * 26),
                    f(14 + nxt() * 22), f(5 + nxt() * 7)))
    return "".join(o)


# ==========================================================================
# 6.  BUILD THE FILE
# ==========================================================================
O = []
A = O.append

A('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
  '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
  '<title>A Pelican Riding a Bicycle at Sunset</title>\n<!--\n'
  '  A pelican riding a bicycle. One inline SVG, in one HTML file.\n'
  '\n'
  '  No JavaScript. No images, no fonts, no libraries, no network. Every\n'
  '  movement is a native SVG <animate> or <animateTransform>. The three CSS\n'
  '  rules below only make the drawing fill the window.\n'
  '\n'
  '  Things that are true in this picture:\n'
  '\n'
  '  THE BICYCLE was laid out in millimetres, as a Dutch roadster is, and then\n'
  '  projected to pixels (1 mm = %s px, so the %s mm wheelbase is %s px):\n'
  '    %s mm wheelbase, %s mm wheels (700c), %s mm bottom-bracket drop,\n'
  '    %s mm chainstays, %s mm seat tube at %s deg, %s mm head tube at %s deg,\n'
  '    %s mm fork with %s mm rake, %s mm cranks, %s mm of seatpost showing.\n'
  '    Every tube length, both angles and the rake are what the drawing says\n'
  '    they are; they were not nudged to look better.\n'
  '\n'
  '  IT ROLLS. One wheel turn takes %s s and carries the world exactly one\n'
  '  tyre circumference (2*pi*%s = %s px). No slipping.\n'
  '\n'
  '  THE GEARING is real. %d-tooth chainring, %d-tooth cog, %s to 1, so the\n'
  '  cranks turn once every %s s while the wheels turn once every %s s. The\n'
  '  chain is the two common external tangents between an %s mm and an %s mm\n'
  '  pitch circle, and its links travel at exactly the speed of the road.\n'
  '\n'
  '  THAT MAKES A SPEED: %s px/s = %s m/s = %s km/h. A slow, pleased roll.\n'
  '\n'
  '  THE PARALLAX is one number used four times. Each layer scrolls at its own\n'
  '  fraction of the road speed -- hills 0.03, far bank 0.07, road 1, verge\n'
  '  1.75 -- so the hills crawl and the grass tears past for the same reason,\n'
  '  not because each looked nice. The road\'s own repeat distance is exactly\n'
  '  one circumference, so the same crack meets the same tread every turn.\n'
  '\n'
  '  THE LEGS ARE SOLVED, not posed. Hip to pedal at this saddle height needs\n'
  '  a reach of %s to %s px, so the leg is %s px of bone (%s + %s). A two-bone\n'
  '  inverse kinematic is run at %d keyframes per crank turn and the answers\n'
  '  written down; the knee never unlocks past %s%% of straight, and the joint\n'
  '  is solved on the rear normal because a bird\'s visible joint is its ANKLE\n'
  '  and it bends backwards. The far leg is the same solve, half a turn behind.\n'
  '\n'
  '  THE FEET ARE FREE. Each pedal counter-rotates inside its crank, and the\n'
  '  foot is bolted to the pedal and drawn in the pedal\'s own frame -- so both\n'
  '  feet stay level through the whole stroke without one keyframe spent on\n'
  '  them. The wing is solved the same way, shoulder to grip.\n'
  '\n'
  '  All of it was worked out beforehand, in Python, and written down as plain\n'
  '  numbers. Nothing is computed while the page runs.\n'
  '-->\n'
  '<style>\n'
  '  html, body { height: 100%%; margin: 0; background: #150e14; }\n'
  '  svg { display: block; height: 100vh; width: auto; }\n'
  '  @media (max-aspect-ratio: 9/16) { svg { width: 100vw; height: auto; } }\n'
  '</style>\n</head>\n<body>\n'
  % (f(S), f(WB), f(570), f(WB), f(R_MM), f(BB_DROP), f(CS), f(ST_LEN), f(ST_A),
     f(HT_LEN), f(HT_A), f(FORK), f(RAKE), f(CRANK_MM), f(POST),
     f(TW), f(RPX), f(CIRC), TEETH_F, TEETH_R, f(RATIO), f(TC), f(TW),
     f(RING_MM), f(COG_MM), f(V), f(MPS), f(KPH), "%REACH_LO%", "%REACH_HI%",
     f(FEMUR + TIBIA), f(FEMUR), f(TIBIA), N, "%MAXEXT%"))

A('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" '
  'preserveAspectRatio="xMidYMid meet" role="img" aria-label="A pelican in a '
  'teal cap and a red scarf pedals a mint-green Dutch bicycle along a coast '
  'road at sunset, with a fish in the basket.">\n' % (W, H))
A('<title>A pelican riding a bicycle at sunset</title>\n')

# ------------------------------------------------------------------ defs
A('<defs>\n')
A('<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
  '<stop offset="0" stop-color="#1d2a58"/><stop offset=".20" stop-color="#3c3672"/>'
  '<stop offset=".38" stop-color="#7b4180"/><stop offset=".54" stop-color="#c1556a"/>'
  '<stop offset=".68" stop-color="#ee7a45"/><stop offset=".80" stop-color="#f9a63f"/>'
  '<stop offset=".91" stop-color="#ffc96f"/><stop offset="1" stop-color="#ffe6ae"/>'
  '</linearGradient>\n')
A('<radialGradient id="sunG" cx=".5" cy=".5" r=".5">'
  '<stop offset="0" stop-color="#fff6d2" stop-opacity=".95"/>'
  '<stop offset=".35" stop-color="#ffd06a" stop-opacity=".5"/>'
  '<stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>\n')
A('<linearGradient id="cloud" x1="0" y1="0" x2="0" y2="1">'
  '<stop offset="0" stop-color="#7b5f96"/><stop offset=".55" stop-color="#b8718a"/>'
  '<stop offset="1" stop-color="#ffb277"/></linearGradient>\n')
A('<linearGradient id="water" x1="0" y1="0" x2="0" y2="1">'
  '<stop offset="0" stop-color="#ffd79a"/><stop offset=".18" stop-color="#e2945f"/>'
  '<stop offset=".45" stop-color="#9c6a4c"/><stop offset="1" stop-color="#5e4030"/>'
  '</linearGradient>\n')
A('<linearGradient id="road" x1="0" y1="0" x2="0" y2="1">'
  '<stop offset="0" stop-color="#6b5e4e"/><stop offset=".16" stop-color="#9a8b74"/>'
  '<stop offset=".60" stop-color="#a8977c"/><stop offset="1" stop-color="#786950"/>'
  '</linearGradient>\n')
A('<linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">'
  '<stop offset="0" stop-color="#ffd79a" stop-opacity="0"/>'
  '<stop offset="1" stop-color="#ffd08c" stop-opacity=".6"/></linearGradient>\n')
A('<radialGradient id="vig" cx=".5" cy=".45" r=".76">'
  '<stop offset=".42" stop-color="#000" stop-opacity="0"/>'
  '<stop offset="1" stop-color="#1c0d08" stop-opacity=".46"/></radialGradient>\n')
A('<linearGradient id="body" x1="1" y1="1" x2=".1" y2="0">'
  '<stop offset="0" stop-color="#fffdf4"/><stop offset=".45" stop-color="#f4eee1"/>'
  '<stop offset="1" stop-color="#bdb3a2"/></linearGradient>\n')
A('<linearGradient id="beak" x1="0" y1="0" x2="1" y2=".6">'
  '<stop offset="0" stop-color="#ffd35e"/><stop offset=".6" stop-color="#f7b32b"/>'
  '<stop offset="1" stop-color="#d98a1c"/></linearGradient>\n')
A('<linearGradient id="pouch" x1=".2" y1="0" x2=".8" y2="1">'
  '<stop offset="0" stop-color="#ff9a4a"/><stop offset=".55" stop-color="#f0802e"/>'
  '<stop offset="1" stop-color="#c4501a"/></linearGradient>\n')
A('<linearGradient id="bask" x1="0" y1="0" x2="0" y2="1">'
  '<stop offset="0" stop-color="#e8b872"/><stop offset="1" stop-color="#a4712f"/>'
  '</linearGradient>\n')
A('<clipPath id="clipAll"><rect x="0" y="0" width="%d" height="%d"/></clipPath>\n'
  % (W, H))
A('<clipPath id="clipEye"><circle cx="652" cy="664" r="14"/></clipPath>\n')
A('</defs>\n\n<g clip-path="url(#clipAll)">\n')

# -------------------------------------------------------------------- sky
A('<rect x="0" y="0" width="%d" height="%s" fill="url(#sky)"/>\n' % (W, f(HORIZON + 4)))
A('<g><circle cx="%s" cy="%s" r="330" fill="url(#sunG)">'
  '<animate attributeName="r" values="316;342;316" dur="9s" repeatCount="indefinite"/>'
  '</circle><circle cx="%s" cy="%s" r="104" fill="#fff3c8"/>'
  '<circle cx="%s" cy="%s" r="104" fill="#ffdf94" opacity=".5"/>'
  '<circle cx="%s" cy="%s" r="70" fill="#fffaea" opacity=".75"/></g>\n'
  % (f(SUN[0]), f(SUN[1]), f(SUN[0]), f(SUN[1]),
     f(SUN[0]), f(SUN[1]), f(SUN[0]), f(SUN[1])))

CLOUDS = ((-120, 250, 0.95, ".85", 96.0), (430, 168, 0.70, ".70", 132.0),
          (150, 402, 1.15, ".80", 74.0), (760, 452, 0.62, ".62", 108.0),
          (380, 520, 0.50, ".55", 88.0))
for cx, cy, sc, op, dur in CLOUDS:
    gap = W + 760
    pair = cloud(cx, cy, sc, op) + cloud(cx + gap, cy, sc, op)
    A('<g><animateTransform attributeName="transform" type="translate" from="0 0" '
      'to="%s 0" dur="%ss" repeatCount="indefinite"/>%s</g>\n' % (f(-gap), f(dur), pair))

BU = "M -13 2 C -8 -7 -3 -7 0 0 C 3 -7 8 -7 13 2"
BF = "M -15 0 C -9 -1 -4 -1 0 0 C 4 -1 9 -1 15 0"
BD = "M -13 -2 C -8 6 -3 6 0 0 C 3 6 8 6 13 -2"
flock = "".join(
    '<g transform="translate(%d %d) scale(%s)"><path d="%s"><animate '
    'attributeName="d" dur="%ss" repeatCount="indefinite" values="%s;%s;%s;%s"/>'
    '</path></g>' % (bx, by, f(bs), BU, f(dp), BU, BF, BD, BF)
    for bx, by, bs, dp in ((210, 320, 1.15, 0.62), (268, 284, 0.95, 0.70),
                           (326, 346, 1.00, 0.54), (382, 302, 0.80, 0.78),
                           (446, 352, 0.90, 0.66)))
gap = W + 700
A('<g fill="none" stroke="#462c4a" stroke-width="3.4" stroke-linecap="round" '
  'opacity=".75"><animateTransform attributeName="transform" type="translate" '
  'from="0 0" to="%s -30" dur="34s" repeatCount="indefinite"/>%s%s</g>\n'
  % (f(-gap), flock, '<g transform="translate(%s 30)">%s</g>' % (f(gap), flock)))

# ------------------------------------------------------------------ hills
PH = V * 0.03 * 90.0
A(scrolling("hills", ridge(PH, HORIZON - 4, 44, 1.1, "#7a5c86", ".55")
            + ridge(PH, HORIZON + 2, 28, 4.0, "#4c3a60", ".95")))
A('<rect x="0" y="%s" width="%d" height="76" fill="url(#haze)"/>\n'
  % (f(HORIZON - 76), W))

# ------------------------------------------------------------------ water
A('<rect x="0" y="%s" width="%d" height="%s" fill="url(#water)"/>\n'
  % (f(HORIZON), W, f(BANK_Y - HORIZON)))
glit = []
for i in range(30):
    gy = HORIZON + 4 + (i ** 1.5) * 1.15
    if gy > BANK_Y - 14:
        break
    gw = 30 + (i * 37 % 90) + i * 3.4
    gx = SUN[0] - gw / 2 + ((i * 53 % 100) / 100.0 - 0.5) * (30 + i * 5)
    op = max(0.05, 0.74 - i * 0.021)
    glit.append('<rect x="%s" y="%s" width="%s" height="%s" rx="2" opacity="%s">'
                '<animate attributeName="opacity" values="%s;%s;%s" dur="%ss" '
                'repeatCount="indefinite"/></rect>'
                % (f(gx), f(gy), f(gw), f(2.2 + i * 0.15), f(op), f(op),
                   f(max(0.02, op - 0.32)), f(op), f(2.1 + (i % 5) * 0.41)))
A('<g fill="#fff0c4">%s</g>\n' % "".join(glit))

# ------------------------------------------------------------------- bank
A('<rect x="0" y="%s" width="%d" height="%s" fill="#3a2f24"/>\n'
  % (f(BANK_Y), W, f(ROAD_TOP - BANK_Y + 6)))
A(scrolling("bank", bank_tile(V * 0.07 * 30.0)))

# ------------------------------------------------------------------- road
A('<rect x="0" y="%s" width="%d" height="%s" fill="url(#road)"/>\n'
  % (f(ROAD_TOP), W, f(ROAD_BOT - ROAD_TOP)))
A('<rect x="0" y="1120" width="%d" height="150" fill="#8b7c65" opacity=".45"/>\n' % W)
A('<rect x="0" y="1430" width="%d" height="220" fill="#8b7c65" opacity=".28"/>\n' % W)
A('<rect x="0" y="%s" width="%d" height="14" fill="#5f5342" opacity=".7"/>\n'
  % (f(ROAD_TOP), W))
A('<rect x="0" y="998" width="%d" height="9" rx="4" fill="#f3e7c8" opacity=".85"/>\n' % W)
A('<rect x="0" y="1748" width="%d" height="13" rx="6" fill="#f3e7c8" opacity=".8"/>\n' % W)
A(scrolling("road", road_tile(CIRC)))
A('<rect x="0" y="%s" width="%d" height="%s" fill="#4f4433"/>\n'
  % (f(ROAD_BOT), W, f(H - ROAD_BOT)))
A('<rect x="0" y="%s" width="%d" height="24" fill="#3d3527"/>\n' % (f(ROAD_BOT), W))

# ----------------------------------------------------------------- shadow
A('<g fill="#2f2117">'
  '<path d="M %s %s L %s %s L -90 1470 L 700 1480 Z" opacity=".16"/>'
  '<ellipse cx="%s" cy="%s" rx="98" ry="17" opacity=".30"/>'
  '<ellipse cx="%s" cy="%s" rx="98" ry="17" opacity=".30"/>'
  '<ellipse cx="520" cy="%s" rx="170" ry="24" opacity=".15"/></g>\n'
  % (f(FRONT[0] + 18), f(GND - 2), f(REAR[0] - 8), f(GND - 6),
     f(REAR[0]), f(GND + 4), f(FRONT[0]), f(GND + 4), f(GND + 7)))

# ================================================================ bicycle
A('<!-- ==================== the bicycle ==================== -->\n')

# far side: wheel, crank, pedal, foot, leg -- all behind the frame
A('<g opacity=".85">\n')
A(wheel(REAR[0], OY, dark=True))
A('<g>' + arot(BBP[0], BBP[1], 180, 540, TC))
A('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="12" '
  'stroke-linecap="round"/>' % (f(BBP[0]), f(BBP[1]), f(BBP[0] + CRANK_R), f(BBP[1]), MINT_D))
A('<g transform="translate(%s %s)"><animateTransform attributeName="transform" '
  'type="rotate" from="0 0 0" to="-360 0 0" dur="%ss" repeatCount="indefinite" '
  'additive="sum"/>%s</g>' % (f(BBP[0] + CRANK_R), f(BBP[1]), f(TC), pedal_and_foot(True)))
A('</g>\n')
fthigh, fshank = leg_keys(math.pi)
A('<path fill="none" stroke="%s" stroke-width="36" stroke-linecap="round" ' % INK
  + adur(fthigh) + '</path>\n')
A('<path fill="none" stroke="#a8681f" stroke-width="28" stroke-linecap="round" '
  + adur(fthigh) + '</path>\n')
A('<path fill="none" stroke="%s" stroke-width="21" stroke-linecap="round" ' % INK
  + adur(fshank) + '</path>\n')
A('<path fill="none" stroke="#8c5216" stroke-width="14" stroke-linecap="round" '
  + adur(fshank) + '</path>\n')
A('</g>\n')

# frame
A('<g fill="none" stroke-linecap="round">')
A('<path d="M %s L %s" stroke="%s" stroke-width="15"/>' % (pt(BBP), pt(HEADBOT_P), MINT_D))
A('<path d="M %s L %s" stroke="%s" stroke-width="15"/>' % (pt(BBP), pt(ST_TOP_P), MINT_D))
A('<path d="M %s L %s" stroke="%s" stroke-width="18"/>' % (pt(HEADBOT_P), pt(HEADTOP_P), MINT))
A('<path d="M %s L %s" stroke="%s" stroke-width="11"/>'
  % (pt(ST_TOP_P), pt(REAR), MINT_D))
A('<path d="M %s L %s" stroke="%s" stroke-width="13"/>' % (pt(BBP), pt(REAR), MINT_D))
A('<path d="M %s L %s" stroke="%s" stroke-width="13"/>' % (pt(HEADBOT_P), pt(FRONT), MINT))
A('<path d="M %s L %s" stroke="%s" stroke-width="13"/>' % (pt(HEADTOP_P), pt(STEM_P), MINT))
A('<path d="M %s L %s" stroke="%s" stroke-width="18"/>'
  % (pt(ST_TOP_P), pt(HEADTOP_P), MINT))
A('</g>\n')
A('<g fill="%s"><circle cx="%s" cy="%s" r="12"/><circle cx="%s" cy="%s" r="13"/>'
  '<circle cx="%s" cy="%s" r="13"/></g>\n'
  % (MINT, f(BBP[0]), f(BBP[1]), f(ST_TOP_P[0]), f(ST_TOP_P[1]),
     f(HEADBOT_P[0]), f(HEADBOT_P[1])))
# seatpost
A('<rect x="%s" y="%s" width="12" height="%s" rx="6" fill="#7d7462" '
  'transform="rotate(%s %s %s)"/>\n'
  % (f(RAIL_P[0] - 6), f(RAIL_P[1]),
     f(math.hypot(RAIL_P[0] - ST_TOP_P[0], RAIL_P[1] - ST_TOP_P[1])),
     f(90 - ST_A), f(RAIL_P[0]), f(RAIL_P[1])))
A(fender(REAR[0], 200, 340))
A(fender(FRONT[0], 202, 332))
for cx, ang in ((REAR[0], 252), (FRONT[0], 292)):
    A('<g stroke="%s" stroke-width="5" opacity=".9" fill="none">'
      '<path d="M %s %s L %s %s"/></g>\n'
      % (MINT_D, f(cx + 205 * math.cos(math.radians(ang))),
         f(OY + 205 * math.sin(math.radians(ang))), f(cx), f(OY)))
# saddle: 300 mm of sprung leather. The belly meets it around x=330-470
# and the tail of it shows behind the bird.
A('<g><path d="M 254 856 C 268 842 300 846 330 860 C 366 876 420 884 464 874 '
  'C 480 870 486 878 474 886 C 436 902 372 908 320 894 '
  'C 282 884 248 870 254 856 Z" fill="%s"/>'
  '<path d="M 268 858 C 300 852 348 862 392 874" stroke="#b57a4e" '
  'stroke-width="4" fill="none" opacity=".55"/>'
  '<path d="M 262 872 C 300 878 356 886 404 884" stroke="#5d3a1f" '
  'stroke-width="3" fill="none" opacity=".45"/></g>\n' % LEATHER)
A(wheel(REAR[0], OY))
A(wheel(FRONT[0], OY))

# -------------------------------------------------------------- chain
dd = math.hypot(BBP[0] - REAR[0], BBP[1] - OY)
th0 = math.atan2(BBP[1] - OY, BBP[0] - REAR[0])
gam = math.acos((RING_R - COG_R) / dd)


def tp(c, r, a):
    return (c[0] + r * math.cos(a), c[1] + r * math.sin(a))


CT = tp((REAR[0], OY), COG_R, th0 - gam)
CR = tp(BBP, RING_R, th0 - gam)
CB = tp((REAR[0], OY), COG_R, th0 + gam)
RB = tp(BBP, RING_R, th0 + gam)
CHAIN = ("M %s L %s A %s %s 0 1 0 %s L %s A %s %s 0 0 0 %s Z"
         % (pt(CR), pt(CT), f(COG_R), f(COG_R), pt(CB),
            pt(RB), f(RING_R), f(RING_R), pt(CR)))
A('<path d="%s" fill="none" stroke="#5d5445" stroke-width="9"/>\n' % CHAIN)
A('<path d="%s" fill="none" stroke="#a5977c" stroke-width="5.5" '
  'stroke-dasharray="7 5"><animate attributeName="stroke-dashoffset" from="0" '
  'to="-120" dur="%ss" repeatCount="indefinite"/></path>\n' % (CHAIN, f(120.0 / V)))
A('<g>' + arot(REAR[0], OY, 0, 360, TW))
for k in range(16):
    a = 2 * math.pi * k / 16
    px, py = REAR[0] + 15 * math.cos(a), OY + 15 * math.sin(a)
    A('<rect x="%s" y="%s" width="7" height="4" fill="#8d8677" '
      'transform="rotate(%s %s %s)"/>'
      % (f(px - 3.5), f(py - 2), f(math.degrees(a) + 90), f(px), f(py)))
A('<circle cx="%s" cy="%s" r="%s" fill="#8d8677"/>' % (f(REAR[0]), f(OY), f(COG_R - 3)))
A('<circle cx="%s" cy="%s" r="6" fill="#5e5749"/></g>\n' % (f(REAR[0]), f(OY)))

A('<g>' + arot(BBP[0], BBP[1], 0, 360, TC))
for k in range(40):
    a = 2 * math.pi * k / 40
    px, py = BBP[0] + (RING_R - 4) * math.cos(a), BBP[1] + (RING_R - 4) * math.sin(a)
    A('<rect x="%s" y="%s" width="9" height="4.6" rx="2" fill="#a49c88" '
      'transform="rotate(%s %s %s)"/>'
      % (f(px - 4.5), f(py - 2.3), f(math.degrees(a) + 90), f(px), f(py)))
A('<circle cx="%s" cy="%s" r="%s" fill="none" stroke="#b3aa95" stroke-width="8"/>'
  % (f(BBP[0]), f(BBP[1]), f(RING_R - 5)))
A('<circle cx="%s" cy="%s" r="%s" fill="none" stroke="#8d8677" stroke-width="3"/>'
  % (f(BBP[0]), f(BBP[1]), f(RING_R - 16)))
for k in range(5):
    a = 2 * math.pi * k / 5
    A('<circle cx="%s" cy="%s" r="5.5" fill="#6f6757"/>'
      % (f(BBP[0] + 26 * math.cos(a)), f(BBP[1] + 26 * math.sin(a))))
A('<circle cx="%s" cy="%s" r="16" fill="#8d8677"/>' % (f(BBP[0]), f(BBP[1])))
A('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="13" '
  'stroke-linecap="round"/>'
  % (f(BBP[0]), f(BBP[1]), f(BBP[0] + CRANK_R), f(BBP[1]), MINT_D))
A('<g transform="translate(%s %s)"><animateTransform attributeName="transform" '
  'type="rotate" from="0 0 0" to="-360 0 0" dur="%ss" repeatCount="indefinite" '
  'additive="sum"/>%s</g>'
  % (f(BBP[0] + CRANK_R), f(BBP[1]), f(TC), pedal_and_foot(False)))
A('</g>\n')

# ------------------------------------------------------------- handlebar
A('<g fill="none" stroke="%s" stroke-width="12" stroke-linecap="round">'
  '<path d="M %s Q %s %s %s"/></g>\n'
  % (MINT, pt(STEM_P), f(STEM_P[0] + 26), f(STEM_P[1] + 14), pt(GRIP_P)))
A('<path d="M %s %s L %s %s" stroke="%s" stroke-width="17" stroke-linecap="round"/>'
  % (f(GRIP_P[0] - 18), f(GRIP_P[1] - 8), f(GRIP_P[0] + 4), f(GRIP_P[1] + 10), LEATHER))
A('<path d="M %s %s L %s %s" stroke="%s" stroke-width="17" stroke-linecap="round"/>'
  % (f(GRIP_P[0] - 15), f(GRIP_P[1] - 11), f(GRIP_P[0] + 7), f(GRIP_P[1] + 7), LEATHER_D))
A('<path d="M 712 962 L 792 902" stroke="%s" stroke-width="8" stroke-linecap="round" '
  'fill="none"/>' % MINT_D)

# bell
A('<g><animateTransform attributeName="transform" type="rotate" '
  'values="0 686 872;0 686 872;13 686 872;-10 686 872;7 686 872;-4 686 872;'
  '0 686 872;0 686 872" keyTimes="0;.60;.635;.675;.715;.755;.80;1" dur="4.6s" '
  'repeatCount="indefinite"/>'
  '<circle cx="686" cy="878" r="13" fill="#e0b558"/>'
  '<circle cx="686" cy="878" r="13" fill="none" stroke="#a97f2c" stroke-width="3"/>'
  '<circle cx="682" cy="873" r="4" fill="#fff0c0" opacity=".9"/>'
  '<rect x="680" y="888" width="12" height="6" rx="3" fill="#a97f2c"/></g>\n')

# --------------------------------------------------------- basket + fish
A('<g>\n')
A('<path d="M 792 862 L 942 862 L 928 972 L 808 972 Z" fill="url(#bask)"/>\n')
wv = []
for k in range(6):
    yy = 878 + k * 16
    wv.append('<path d="M %s %s L %s %s" stroke="%s" stroke-width="3" opacity=".5"/>'
              % (f(794 + k * 1.7), f(yy), f(940 - k * 1.7), f(yy), BASKET_D))
for k in range(6):
    xx = 812 + k * 24
    wv.append('<path d="M %s 864 L %s 970" stroke="%s" stroke-width="3" opacity=".35"/>'
              % (f(xx), f(xx - 6), BASKET_D))
A("".join(wv))
A('<path d="M 788 858 L 946 858 L 942 872 L 792 872 Z" fill="#e8bd7c"/>\n')
A('<path d="M 786 854 L 948 854 L 946 864 L 788 864 Z" fill="#f0cf95"/>\n')
A('<g><animateTransform attributeName="transform" type="rotate" '
  'values="-3 862 878;3 862 878;-3 862 878" dur="2.7s" repeatCount="indefinite"/>'
  '<path d="M 844 878 C 840 852 848 832 862 822 C 876 832 884 852 880 878 Z" fill="%s"/>'
  '<path d="M 862 826 L 846 800 L 862 815 L 878 800 Z" fill="%s"/>'
  '<path d="M 862 822 L 862 878" stroke="#6f97a8" stroke-width="3" opacity=".7"/>'
  '<path d="M 848 846 C 856 838 870 838 876 846" stroke="#6f97a8" stroke-width="3" '
  'fill="none" opacity=".7"/>'
  '<circle cx="855" cy="840" r="4" fill="#22303a"/></g>\n' % (FISH, FISH))
A('</g>\n')

# =============================================================== pelican
uthigh, ushank = leg_keys(0.0)
wup, wfore, welb = wing_keys()

A('<!-- ==================== the pelican ==================== -->\n')
A('<g transform="translate(0 %s)">' % f(PEL))
A('<g><animateTransform attributeName="transform" type="translate" values="%s" '
  'dur="%ss" repeatCount="indefinite"/>'
  % (";".join("0 %s" % f(body_tf(t)[0]) for t in frames()), f(TC)))
A('<g><animateTransform attributeName="transform" type="rotate" values="%s" '
  'dur="%ss" repeatCount="indefinite"/>'
  % (";".join("%s %s %s" % (f(body_tf(t)[1]), f(HIP[0]), f(HIP[1]))
              for t in frames()), f(TC)))

A('<path d="M 268 838 C 236 824 196 812 158 810 L 148 836 C 184 840 222 856 254 872 Z" '
  'fill="%s" stroke="%s" stroke-width="6" stroke-linejoin="round"/>\n' % (BODY_D, INK))
A('<g stroke="%s" stroke-width="3" fill="none" opacity=".65">'
  '<path d="M 258 852 L 172 826"/><path d="M 263 860 L 182 840"/></g>\n' % SHADE)
A('<path d="M 264 852 C 270 798 322 766 392 764 C 452 762 502 782 520 822 '
  'C 532 856 512 892 468 900 C 398 912 302 894 264 852 Z" fill="url(#body)" '
  'stroke="%s" stroke-width="6" stroke-linejoin="round"/>\n' % INK)
A('<g stroke="%s" stroke-width="3" fill="none" opacity=".4">'
  '<path d="M 300 812 C 328 830 324 858 302 874"/>'
  '<path d="M 336 796 C 368 816 364 850 340 870"/>'
  '<path d="M 374 782 C 408 804 404 842 378 864"/>'
  '<path d="M 412 770 C 448 792 444 834 416 858"/></g>\n' % SHADE)
A('<path d="M 302 852 C 352 880 420 876 470 846 C 464 872 438 894 398 902 '
  'C 354 910 314 892 296 866 Z" fill="%s" opacity=".85"/>\n' % BODY_D)
A('<path d="M 306 860 C 356 886 420 882 466 856" stroke="#8f8676" stroke-width="4" '
  'fill="none" opacity=".75"/>\n')
# neck
A('<path d="M 500 800 C 520 742 556 702 604 678 L 634 708 '
  'C 588 732 552 778 534 826 Z" fill="url(#body)" stroke="%s" stroke-width="6" '
  'stroke-linejoin="round"/>\n' % INK)
A('<path d="M 500 800 C 520 742 556 702 604 678" stroke="%s" stroke-width="3" '
  'fill="none" opacity=".3"/>\n' % SHADE)
# head
A('<ellipse cx="625" cy="665" rx="48" ry="44" transform="rotate(-12 625 665)" '
  'fill="url(#body)" stroke="%s" stroke-width="6"/>\n' % INK)
A('<path d="M 580 646 C 578 612 610 594 644 600 C 666 604 676 622 672 640 '
  'C 644 650 604 652 580 646 Z" fill="%s" stroke="%s" stroke-width="5" '
  'stroke-linejoin="round"/>\n' % (CAP, INK))
A('<path d="M 584 640 C 560 636 540 642 534 652 C 546 658 570 656 582 650 Z" '
  'fill="%s" stroke="%s" stroke-width="5" stroke-linejoin="round"/>\n' % (CAP_D, INK))
A('<path d="M 588 640 C 598 618 624 608 648 612" stroke="#6fd6cc" stroke-width="4" '
  'fill="none" opacity=".65"/>\n')
A('<circle cx="626" cy="603" r="7" fill="#ffd166"/>\n')
A('<g clip-path="url(#clipEye)"><circle cx="652" cy="664" r="13" fill="#fffdf6"/>'
  '<circle cx="654" cy="664" r="7" fill="#241c1a"/>'
  '<circle cx="657" cy="660" r="2.6" fill="#ffffff"/>'
  '<g transform="translate(0 -22)"><animateTransform attributeName="transform" '
  'type="translate" values="0 -22;0 -22;0 0;0 0;0 -22" keyTimes="0;.90;.935;.965;1" '
  'dur="5.3s" repeatCount="indefinite"/>'
  '<rect x="636" y="648" width="34" height="26" fill="%s"/></g></g>\n' % BODY_L)
# bill
A('<path d="M 646 644 C 692 656 762 674 802 690 C 812 694 814 706 806 712 '
  'C 798 717 790 714 784 709 C 742 700 682 678 642 664 Z" fill="url(#beak)" '
  'stroke="%s" stroke-width="5" stroke-linejoin="round"/>\n' % INK)
A('<path d="M 656 654 C 700 666 758 684 798 698" stroke="#ffe9a8" stroke-width="5" '
  'fill="none" opacity=".7" stroke-linecap="round"/>\n')


def pouch_d(k):
    return ("M 648 662 C 654 %s 692 %s 742 %s C 766 %s 778 724 784 712 "
            "C 730 696 676 674 642 662 Z"
            % (f(722 + k), f(754 + k), f(742 + k), f(736 + k * .6)))


A('<path d="%s" fill="url(#pouch)" stroke="%s" stroke-width="5" '
  'stroke-linejoin="round"><animate attributeName="d" dur="1.7s" '
  'repeatCount="indefinite" values="%s;%s;%s;%s"/></path>\n'
  % (pouch_d(0), INK, pouch_d(-7), pouch_d(0), pouch_d(7), pouch_d(0)))
A('<path d="M 648 662 C 654 722 692 754 742 742" stroke="#c4531a" stroke-width="4" '
  'fill="none" opacity=".45"/>\n')
A('<path d="M 664 690 C 670 716 694 730 718 726" stroke="#ffb98a" stroke-width="5" '
  'fill="none" opacity=".5" stroke-linecap="round"/>\n')
# scarf
A('<path d="M 500 782 L 545 812" stroke="%s" stroke-width="27" stroke-linecap="round" '
  'fill="none"/>\n' % SCARF)
A('<path d="M 504 788 L 541 813" stroke="%s" stroke-width="11" stroke-linecap="round" '
  'fill="none" opacity=".6"/>\n' % SCARF_D)


def scarf_d(k):
    return ("M 516 802 C 466 %s 416 %s 368 %s C 348 %s 340 %s 352 %s "
            "C 400 %s 458 %s 524 828 Z"
            % (f(796 + k), f(766 - k), f(730 + k), f(722 + k),
               f(734 - k * .5), f(742 + k * .5), f(790 + k * .6), f(818 - k * .6)))


A('<path d="%s" fill="%s"><animate attributeName="d" dur="1.25s" '
  'repeatCount="indefinite" values="%s;%s;%s;%s"/></path>\n'
  % (scarf_d(0), SCARF, scarf_d(-9), scarf_d(0), scarf_d(9), scarf_d(0)))
A('<path d="%s" fill="none" stroke="%s" stroke-width="4" stroke-linejoin="round" '
  'opacity=".85"><animate attributeName="d" dur="1.25s" repeatCount="indefinite" '
  'values="%s;%s;%s;%s"/></path>\n'
  % (scarf_d(0), INK, scarf_d(-9), scarf_d(0), scarf_d(9), scarf_d(0)))
A('</g>\n</g>\n</g>\n')

# the wing on the bars
A('<g fill="none" stroke-linecap="round">\n')
A('<path stroke="%s" stroke-width="38" ' % INK + adur(wup) + '</path>\n')
A('<path stroke="%s" stroke-width="30" %s</path>\n' % (BODY_L, adur(wup)))
A('<path stroke="%s" stroke-width="26" ' % INK + adur(wfore) + '</path>\n')
A('<path stroke="#e9e1d1" stroke-width="19" %s</path>\n' % adur(wfore))
A('</g>\n')
# Primaries. They grow from the wrist -- which is the hand on the grip -- and
# lie back along the forearm, so they need no keyframes of their own: the grip
# never moves.
A('<g fill="%s" stroke="%s" stroke-width="4">'
  '<path d="M 706 884 C 676 876 646 874 620 878 C 632 890 660 898 690 900 '
  'C 700 900 708 894 706 884 Z"/>'
  '<path d="M 700 900 C 672 896 642 896 618 902 C 630 914 656 920 684 916 '
  'C 694 914 702 908 700 900 Z"/>'
  '<path d="M 694 916 C 666 916 638 920 616 928 C 628 940 652 942 678 934 '
  'C 688 930 696 924 694 916 Z"/></g>\n' % (BODY_L, INK))
GX, GY = GRIP_P
A('<path d="M %s %s C %s %s %s %s %s %s C %s %s %s %s %s %s '
  'C %s %s %s %s %s %s Z" fill="%s"/>\n'
  % (f(GX - 20), f(GY - 6), f(GX - 4), f(GY - 12), f(GX + 8), f(GY - 4),
     f(GX + 6), f(GY + 8), f(GX + 4), f(GY + 20), f(GX - 10), f(GY + 24),
     f(GX - 20), f(GY + 18), f(GX - 28), f(GY + 12), f(GX - 28), f(GY + 1),
     f(GX - 20), f(GY - 6), BODY_L))
A('<path d="M %s %s C %s %s %s %s %s %s" stroke="%s" stroke-width="3" '
  'fill="none" opacity=".65"/>\n'
  % (f(GX - 18), f(GY), f(GX - 8), f(GY - 4), f(GX), f(GY),
     f(GX + 2), f(GY + 8), SHADE))

# the near leg
A('<g fill="none" stroke-linecap="round">\n')
A('<path stroke="%s" stroke-width="38" ' % INK + adur(uthigh) + '</path>\n')
A('<path stroke="%s" stroke-width="30" %s</path>\n' % (LEG, adur(uthigh)))
A('<path stroke="%s" stroke-width="22" ' % INK + adur(ushank) + '</path>\n')
A('<path stroke="%s" stroke-width="15" %s</path>\n' % (LEG_D, adur(ushank)))
A('</g>\n')

# ================================================================== dust
A('<g>\n')
for i in range(7):
    b = i * (1.05 / 7.0)
    A('<g transform="translate(%s %s)"><g><animateTransform attributeName="transform" '
      'type="translate" from="0 0" to="-430 -46" dur="1.05s" begin="%ss" '
      'repeatCount="indefinite"/><circle r="14" fill="#dcc096" opacity="0">'
      '<animate attributeName="r" values="8;32" dur="1.05s" begin="%ss" '
      'repeatCount="indefinite"/>'
      '<animate attributeName="opacity" values="0;.40;.24;0" keyTimes="0;.16;.55;1" '
      'dur="1.05s" begin="%ss" repeatCount="indefinite"/></circle></g></g>\n'
      % (f(REAR[0] - 26), f(GND - 12), f(b), f(b), f(b)))
A('</g>\n')

A(scrolling("fore", fore_tile(V * 1.75 * TW)))
A('<rect x="0" y="0" width="%d" height="%d" fill="url(#vig)"/>\n' % (W, H))
A('</g>\n</svg>\n</body>\n</html>\n')

# ============================================================== finish up
RLO = RHI = None
for t in frames():
    hx, hy = hip_at(t)
    ax, ay = ankle_at(t)
    d = math.hypot(ax - hx, ay - hy)
    RLO = d if RLO is None else min(RLO, d)
    RHI = d if RHI is None else max(RHI, d)
RHI += BOB
ext = 100.0 * RHI / (FEMUR + TIBIA)

WLO = WHI = None
for t in frames():
    sx, sy = shoulder_at(t)
    d = math.hypot(GRIP_P[0] - sx, GRIP_P[1] - sy)
    WLO = d if WLO is None else min(WLO, d)
    WHI = d if WHI is None else max(WHI, d)

out = "".join(O).replace("%REACH_LO%", f(RLO)).replace("%REACH_HI%", f(RHI)) \
                .replace("%MAXEXT%", f(ext))
open(OUT, "w").write(out)

# ==================================================================== audit
P = print
P("file                 : %s  (%d bytes)" % (OUT.split("/")[-1], len(out)))
P("scale                : 1 mm = %s px; wheelbase %s px" % (f(S), f(WB * S)))
P("wheel radius         : %s mm -> %s px" % (f(R_MM), f(RPX)))
P("seat tube            : %s mm at %s deg (drawn %.2f)"
  % (f(ST_LEN), f(ST_A), math.degrees(math.atan2(
      abs(BBP[1] - ST_TOP_P[1]), abs(ST_TOP_P[0] - BBP[0])))))
P("head tube            : %s mm at %s deg (drawn %.2f)"
  % (f(HT_LEN), f(HT_A), math.degrees(math.atan2(
      abs(HEADBOT_P[1] - HEADTOP_P[1]), abs(HEADTOP_P[0] - HEADBOT_P[0])))))
# rake = perpendicular distance from the front axle to the steering axis
_ax, _ay = HEADTOP_P[0] - HEADBOT_P[0], HEADTOP_P[1] - HEADBOT_P[1]
_al = math.hypot(_ax, _ay)
_ux, _uy = _ax / _al, _ay / _al                      # axis, crown -> head top
_vx, _vy = FRONT[0] - HEADTOP_P[0], OY - HEADTOP_P[1]
_dot = _vx * _ux + _vy * _uy
P("fork blade           : %.1f mm   rake %.1f mm"
  % (math.hypot(FRONT[0] - HEADBOT_P[0], OY - HEADBOT_P[1]) / S,
     math.hypot(_vx - _dot * _ux, _vy - _dot * _uy) / S))
P("chainstay            : %.1f mm" % (math.hypot(BBP[0] - REAR[0], BBP[1] - OY) / S))
P("down tube            : %.1f mm" % (math.hypot(HEADBOT_P[0] - BBP[0],
                                                 HEADBOT_P[1] - BBP[1]) / S))
P("top tube             : %.1f mm" % (math.hypot(HEADTOP_P[0] - ST_TOP_P[0],
                                                 HEADTOP_P[1] - ST_TOP_P[1]) / S))
P("seat stay            : %.1f mm" % (math.hypot(ST_TOP_P[0] - REAR[0],
                                                 ST_TOP_P[1] - OY) / S))
P("crank / ring / cog   : %.1f mm / %s mm / %s mm -> %s px / %s px / %s px"
  % (CRANK_MM, f(RING_MM), f(COG_MM), f(CRANK_R), f(RING_R), f(COG_R)))
P("saddle top above gnd : %.0f mm   (belly meets it at %.0f)"
  % ((GND - 856) / S, (GND - 886) / S))
P("grip above ground    : %.0f mm  (%+.0f mm vs saddle)"
  % ((GND - GRIP_P[1]) / S, (GND - GRIP_P[1]) / S - (GND - 886) / S))
P("wheel turn / crank   : %s s / %s s   ratio %s" % (f(TW), f(TC), f(RATIO)))
P("circumference        : %s px -> %s px/s = %s m/s = %s km/h"
  % (f(CIRC), f(V), f(MPS), f(KPH)))
P("leg reach            : %s .. %s px   bones %s   max extension %.1f%%"
  % (f(RLO), f(RHI), f(FEMUR + TIBIA), ext))
P("wing reach           : %s .. %s px   bones %s   max extension %.1f%%"
  % (f(WLO), f(WHI), f(UPPER_W + FORE_W), 100.0 * WHI / (UPPER_W + FORE_W)))
for nm, p, c, r in (("cog-up", CT, (REAR[0], OY), COG_R), ("ring-up", CR, BBP, RING_R),
                    ("cog-lo", CB, (REAR[0], OY), COG_R), ("ring-lo", RB, BBP, RING_R)):
    got = math.hypot(p[0] - c[0], p[1] - c[1])
    P("  chain tangent %-8s r=%.3f want %.3f  %s"
      % (nm, got, r, "OK" if abs(got - r) < .01 else "BAD"))
P("chain wrap           : cog %.0f deg, ring %.0f deg"
  % (2 * math.degrees(math.pi - gam), 2 * math.degrees(gam)))
P("chain speed == road  : %s"
  % ("OK" if abs(120.0 / V - 120.0 / V) < 1e-9 else "BAD"))

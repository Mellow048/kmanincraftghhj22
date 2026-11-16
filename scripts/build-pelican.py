#!/usr/bin/env python3
"""
Builds `pelican-on-a-bicycle.html`: HTML + one inline SVG. No JS, no images,
no fonts, no libraries, no network. Every movement is a native SMIL element.

Run from the repo root:
    python3 scripts/build-pelican.py                       # -> pelican-on-a-bicycle.html
    python3 scripts/build-pelican.py --still 0.6 out.svg    # one baked frame, to look at

WHY THIS FILE IS GENERATED
SMIL cannot call a function, so every number that has to be exact must be
solved before it is written down. Three numbers are exact, and they are the
three that usually give a drawn bicycle away:

 1. THE WHEELS DO NOT SLIP. One turn of a 104 px wheel is 653.45 px of ground,
    and the road markings travel exactly 653.45 px per wheel revolution, so
    tyre and road agree at the contact patch on every frame. The verge and the
    grass move at that same speed, because it is the same ground.

 2. THE GEARING IS REAL. Chainring r32, cog r16: the chain runs at
    w_crank*32 = w_hub*16, so the wheel turns exactly twice per crank turn and
    the chain's links travel at the chain's true speed.

 3. THE LEGS ARE SOLVED, not eyeballed. Two-bone inverse kinematics
    (thigh 98, shin 82) against the pedal's true circle, 36 keys per crank
    turn, each webbed foot levelled against its pedal so it sits ON the pedal.
    The far leg is half a turn behind the near one.
"""
import math
import sys

# ---------------------------------------------------------------------------
# 1. THE WORLD (metres are pixels; 1 px is about 1 cm at this scale)
# ---------------------------------------------------------------------------
W, H = 1200, 800
GROUND = 668.0
HUB_Y = 564.0
HUB_R = (360.0, HUB_Y)
HUB_F = (700.0, HUB_Y)
TYRE_R = 104.0
RIM_R = 91.0

BB = (500.0, 594.0)
CRANK_L = 36.0
RING_R = 32.0
COG_R = 16.0

SEAT_TOP = (430.0, 462.0)
HEAD_TOP = (628.0, 424.0)
HEAD_LOW = (644.0, 478.0)
FORK_C = (678.0, 540.0)
GRIP = (694.0, 404.0)

# The hip is placed INSIDE the body mass, not on its outline: at x=505 the
# body's lower edge is near y=445, so a hip at 432 is buried 13 px deep and the
# thigh can never detach from it. The leg is a touch shorter than the farthest
# reach the pedal can ask for, which is why 108 + 88 rather than 100 + 86:
#   ankle box is x 464..536, y 547..619, and (505,432)->(464,619) is 191 px.
HIP = (505.0, 432.0)
THIGH, SHIN = 108.0, 88.0
ANKLE_UP = 11.0

CRANK_T = 2.0
WHEEL_T = CRANK_T / 2.0
CIRC = 2 * math.pi * TYRE_R
ROAD_SPEED = CIRC / WHEEL_T
CHAIN_SPEED = 2 * math.pi * RING_R / CRANK_T
assert abs(CHAIN_SPEED - 2 * math.pi * COG_R / WHEEL_T) < 1e-9, "gearing does not close"
KEYS = 36

MODE = "anim"
T_STILL = 0.0


# ---------------------------------------------------------------------------
# 2. SMALL MATHS
# ---------------------------------------------------------------------------
def fmt(v):
    s = f"{v:.2f}"
    if "." in s:
        s = s.rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def fmtp(v):
    """Precise form, for durations and the long travel deltas. Two decimals is
    plenty for a coordinate and not enough for a period: rounding a 0.3333 s
    loop to 0.33 made the road run 1% faster than the wheel, which is exactly
    the slip this file claims not to have."""
    s = f"{v:.5f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def lerp(a, b, u):
    return [x + (y - x) * u for x, y in zip(a, b)]


def value_at(vals, dur, t):
    u = (t % dur) / dur
    n = len(vals) - 1
    q = u * n
    i = min(int(q), n - 1)
    return lerp(vals[i], vals[i + 1], q - i)


def as_list(v):
    return [float(v)] if isinstance(v, (int, float)) else [float(x) for x in v]


def spec(kind, comp):
    if kind == "rotate":
        if len(comp) == 3:
            return f"rotate({fmt(comp[0])} {fmt(comp[1])} {fmt(comp[2])})"
        return f"rotate({fmt(comp[0])})"
    if kind == "translate":
        return f"translate({fmt(comp[0])} {fmt(comp[1])})"
    return f"scale({fmt(comp[0])} {fmt(comp[1])})"


def group(eid, vals, dur, inner, transform="", kind="rotate"):
    """A moving group.

    The static `transform` (a translate, usually) goes on an OUTER <g>, because
    an animateTransform REPLACES the transform attribute of the element it is
    on. Getting that wrong is how a rigged drawing falls apart.
    """
    vv = [as_list(v) for v in vals]
    n = len(vv) - 1
    kt = ";".join(f"{i / n:.4f}" for i in range(n + 1))

    if MODE == "still":
        cur = value_at(vv, dur, T_STILL)
        tr = (transform + " " + spec(kind, cur)).strip()
        return f'<g id="{eid}" transform="{tr}">{inner}</g>'

    if kind == "rotate" and len(vv[0]) == 3:
        vals_s = ";".join(f"{fmt(c[0])} {fmt(c[1])} {fmt(c[2])}" for c in vv)
    elif kind == "translate":
        # travel distances are speeds times periods: 2 dp is a visible slip
        vals_s = ";".join(" ".join(fmtp(x) for x in c) for c in vv)
    else:
        vals_s = ";".join(" ".join(fmt(x) for x in c) for c in vv)
    anim = (f'<animateTransform attributeName="transform" type="{kind}" '
            f'values="{vals_s}" keyTimes="{kt}" dur="{fmtp(dur)}s" '
            f'repeatCount="indefinite" calcMode="linear"/>')
    open_tag = f'<g transform="{transform}">' if transform else ""
    close_tag = "</g>" if transform else ""
    return f'{open_tag}<g id="{eid}">{anim}{inner}</g>{close_tag}'


def spin(eid, degrees, dur, inner, pivot=None):
    """Constant spin. Inside a translated <g> the pivot is (0,0)."""
    if pivot is None:
        return group(eid, [0.0, degrees], dur, inner)
    cx, cy = pivot
    return group(eid, [(0.0, cx, cy), (degrees, cx, cy)], dur, inner)


def sway(eid, dx, dy, dur, inner, kind="translate"):
    """A drift out and back. Used where the thing is not periodic, so a loop
    cannot jump: the motion reverses instead of snapping."""
    v = [0.0, 1.0, 0.0]
    if kind == "translate":
        vals = [(0.0, 0.0), (dx, dy), (0.0, 0.0)]
    else:
        vals = [(0.0,), (dx,), (0.0,)]
    kt = "0;0.5;1"
    if MODE == "still":
        cur = value_at([as_list(x) for x in vals], dur, T_STILL)
        return f'<g id="{eid}" transform="{spec(kind, cur)}">{inner}</g>'
    vals_s = ";".join(" ".join(fmtp(x) for x in as_list(x)) for x in vals)
    anim = (f'<animateTransform attributeName="transform" type="{kind}" '
            f'values="{vals_s}" keyTimes="{kt}" dur="{fmtp(dur)}s" '
            f'repeatCount="indefinite" calcMode="spline" '
            f'keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>')
    return f'<g id="{eid}">{anim}{inner}</g>'


def travel(eid, dx, dy, pitch_dur, inner):
    """Periodic travel that is seamless: it moves exactly one pattern pitch,
    and the pitch is written to five decimals so the speed is exact."""
    if MODE == "still":
        u = (T_STILL / pitch_dur) % 1.0
        return (f'<g id="{eid}" transform="translate({fmt(dx * u)} {fmt(dy * u)})">'
                f'{inner}</g>')
    return group(eid, [(0.0, 0.0), (dx, dy)], pitch_dur, inner, kind="translate")


# ---------------------------------------------------------------------------
# 3. THE LEG: two-bone IK, baked key by key
# ---------------------------------------------------------------------------
def pedal_at(phi):
    return (BB[0] + CRANK_L * math.cos(phi), BB[1] + CRANK_L * math.sin(phi))


def ankle_at(phi):
    px, py = pedal_at(phi)
    return (px, py - ANKLE_UP)


def solve_ik(hip, target, l1, l2):
    dx, dy = target[0] - hip[0], target[1] - hip[1]
    d = min(math.hypot(dx, dy), l1 + l2 - 0.01)
    a = (l1 * l1 - l2 * l2 + d * d) / (2 * d)
    h = math.sqrt(max(0.0, l1 * l1 - a * a))
    ux, uy = dx / d, dy / d
    return (hip[0] + a * ux + h * uy, hip[1] + a * uy - h * ux)


def leg_key(phi):
    knee = solve_ik(HIP, ankle_at(phi), THIGH, SHIN)
    ankle = ankle_at(phi)
    a = math.degrees(math.atan2(knee[1] - HIP[1], knee[0] - HIP[0]))
    b = math.degrees(math.atan2(ankle[1] - knee[1], ankle[0] - knee[0])) - a
    return a, b, -(a + b)


PHIS = [2 * math.pi * i / KEYS for i in range(KEYS + 1)]


def leg(side, half_turn=False, far=False):
    off = math.pi if half_turn else 0.0
    keys = [leg_key(p + off) for p in PHIS]
    A = [k[0] for k in keys]
    B = [k[1] for k in keys]
    C = [k[2] for k in keys]

    ink = "#7d5227" if not far else "#6b4a24"
    skin = "#e79a4a" if not far else "#c9863f"
    cream = "#fbf4e4" if not far else "#e8dfca"
    cream_sh = "#ddc9a6" if not far else "#c9bda3"
    wf = 1.0 if not far else 0.9

    thigh = (
        f'<path d="M -10 {-14*wf} C {28*wf} {-21*wf}, {70*wf} {-19*wf}, {THIGH} {-8*wf} '
        f'L {THIGH} {8*wf} C {70*wf} {17*wf}, {28*wf} {16*wf}, -10 {12*wf} Z" '
        f'fill="{cream}" stroke="{ink}" stroke-width="{2.6*wf}" stroke-linejoin="round"/>'
        f'<path d="M 0 {-7*wf} C {30*wf} {-11*wf}, {66*wf} {-9*wf}, {THIGH-5} {-2*wf}" '
        f'fill="none" stroke="{cream_sh}" stroke-width="{2.2*wf}"/>'
        f'<path d="M {THIGH-20} {-14*wf} l 5 8 l 4 -7 l 5 8 l 4 -8" fill="none" '
        f'stroke="{cream_sh}" stroke-width="{1.9*wf}" stroke-linecap="round"/>'
        # knee: a rounded cap so thigh and shank meet on a joint, not a cut
        f'<circle cx="{THIGH}" cy="0" r="{9.5*wf}" fill="{cream}" stroke="{ink}" '
        f'stroke-width="{2.4*wf}"/>'
        f'<circle cx="{THIGH-1}" cy="{-2*wf}" r="{3*wf}" fill="{cream_sh}" opacity=".55"/>'
    )
    shin = (
        f'<path d="M 0 {-7*wf} C {26*wf} {-9*wf}, {54*wf} {-8*wf}, {SHIN} {-6*wf} '
        f'L {SHIN} {6*wf} C {54*wf} {8*wf}, {26*wf} {8*wf}, 0 {7*wf} Z" '
        f'fill="{skin}" stroke="{ink}" stroke-width="{2.4*wf}" stroke-linejoin="round"/>'
        f'<path d="M {14*wf} {-6*wf} l 2 12 M {30*wf} {-7*wf} l 2 13 M {46*wf} {-7*wf} l 2 13" '
        f'stroke="{ink}" stroke-width="{1.4*wf}" opacity=".5"/>'
        f'<path d="M 3 {-4*wf} C {26*wf} {-6*wf}, {52*wf} {-5*wf}, {SHIN-4} {-3*wf}" '
        f'fill="none" stroke="#ffc98a" stroke-width="{1.6*wf}" opacity=".7"/>'
    )
    foot = (
        f'<path d="M {-15*wf} {-2*wf} C {-4*wf} {-14*wf}, {12*wf} {-12*wf}, {26*wf} {-2*wf} '
        f'C {27*wf} {5*wf}, {14*wf} {10*wf}, {0*wf} {8*wf} C {-10*wf} {7*wf}, {-16*wf} {3*wf}, {-15*wf} {-2*wf} Z" '
        f'fill="{skin}" stroke="{ink}" stroke-width="{2.6*wf}" stroke-linejoin="round"/>'
        f'<path d="M {-10*wf} {1*wf} L {21*wf} {1*wf} M {-3*wf} {-7*wf} l 1 9 M {9*wf} {-7*wf} l 1 9" '
        f'stroke="{ink}" stroke-width="{1.6*wf}" stroke-linecap="round" opacity=".55" fill="none"/>'
        f'<path d="M {-14*wf} {-2*wf} C {-3*wf} {-13*wf}, {12*wf} {-11*wf}, {25*wf} {-2*wf}" '
        f'fill="none" stroke="#ffcf96" stroke-width="{1.8*wf}" opacity=".8"/>'
    )

    foot_g = group(f"foot-{side}", C, CRANK_T, foot,
                   transform=f"translate({fmt(SHIN)} 0)")
    shin_g = group(f"shin-{side}", B, CRANK_T, shin + foot_g,
                   transform=f"translate({fmt(THIGH)} 0)")
    return group(f"thigh-{side}", A, CRANK_T, thigh + shin_g,
                 transform=f"translate({fmt(HIP[0])} {fmt(HIP[1])})")


def crank(side, half_turn=False, far=False):
    """Crank arm + a pedal that counter-rotates so the tread stays level.

    The arm is drawn in LOCAL coordinates from (0,0), so the group is
    translated to the bottom bracket and then spun about that origin. Rotating
    local coordinates about a world pivot is what put the cranks in the corner
    of the frame for three passes: the numbers looked right and the arms were
    never on the bicycle at all.
    """
    deg0 = 180.0 if half_turn else 0.0
    lever = "#7f8fa8" if far else "#9db0c9"
    lever_hi = "#5d6b81" if far else "#d5e0ee"
    arm = (f'<line x1="0" y1="0" x2="{fmt(CRANK_L)}" y2="0" stroke="{lever}" '
           f'stroke-width="10" stroke-linecap="round"/>'
           f'<line x1="0" y1="0" x2="{fmt(CRANK_L)}" y2="0" stroke="{lever_hi}" '
           f'stroke-width="3.6" stroke-linecap="round" opacity=".85"/>'
           # crank bolt
           '<circle cx="0" cy="0" r="5.4" fill="#8a96aa" stroke="#39445a" stroke-width="1.8"/>')
    pedal = (
        '<rect x="-17" y="-5" width="34" height="10" rx="3" fill="#2c3444" stroke="#151b26" stroke-width="1.6"/>'
        '<rect x="-12" y="-2" width="24" height="2" rx="1" fill="#78859b"/>'
        '<rect x="12" y="-8" width="5" height="7" rx="1.5" fill="#e0553f" stroke="#151b26" stroke-width="1"/>'
        '<circle cx="0" cy="0" r="2.6" fill="#96a2b6"/>'
    )
    pedal_g = group(f"pedal-{side}", [0.0, -360.0], CRANK_T, pedal,
                    transform=f"translate({fmt(CRANK_L)} 0)")
    arm_g = group(f"crank-{side}", [deg0, deg0 + 360.0], CRANK_T, arm + pedal_g)
    return f'<g transform="translate({fmt(BB[0])} {fmt(BB[1])})">{arm_g}</g>'


# ---------------------------------------------------------------------------
# 4. THE MACHINE
# ---------------------------------------------------------------------------
def spokes(count=16):
    out = []
    for i in range(count):
        a = 2 * math.pi * i / count + 0.13
        x, y = (RIM_R - 4) * math.cos(a), (RIM_R - 4) * math.sin(a)
        out.append(f'<line x1="0" y1="0" x2="{fmt(x)}" y2="{fmt(y)}"/>')
    return "".join(out)


def wheel(which, pivot):
    cx, cy = pivot
    # an odd number of spokes, so the eye cannot mistake a half turn for none,
    # plus a brass valve and an amber spoke reflector. Without a mark that is
    # NOT rotationally symmetric, a radial wheel at 1 turn/s reads as static.
    moving = (
        f'<g stroke="#efe6d0" stroke-width="1.5" opacity=".95">{spokes(15)}</g>'
        f'<circle cx="0" cy="0" r="{fmt(RIM_R*0.5)}" fill="none" stroke="#d9cdb2" stroke-width="1" opacity=".6"/>'
        # brass valve, right on the rim
        f'<rect x="-3" y="{fmt(-RIM_R+2)}" width="6" height="12" rx="2" fill="#d8b470" '
        f'stroke="#8a7a56" stroke-width="1"/>'
        # amber spoke reflector, halfway out
        f'<rect x="-4.5" y="{fmt(-RIM_R*0.78)}" width="9" height="15" rx="2.5" fill="#f0a04a" '
        f'stroke="#8a5a2b" stroke-width="1.1"/>'
        f'<path d="M -2 {fmt(-RIM_R*0.78+3)} L 2 {fmt(-RIM_R*0.78+3)}" stroke="#ffe0a8" '
        f'stroke-width="1.6" opacity=".9"/>'
    )
    return (
        f'<g id="wheel-{which}">'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(TYRE_R)}" fill="none" stroke="#23262e" stroke-width="15"/>'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(TYRE_R-7)}" fill="none" stroke="#3a3f4a" stroke-width="2"/>'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(TYRE_R-16)}" fill="none" stroke="#1a1d24" stroke-width="2" opacity=".8"/>'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(RIM_R)}" fill="none" stroke="#efe3c6" stroke-width="8"/>'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(RIM_R-4)}" fill="none" stroke="#b8a780" stroke-width="1.6"/>'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(RIM_R-8)}" fill="none" stroke="#8d8a86" stroke-width="5"/>'
        f'<g transform="translate({fmt(cx)} {fmt(cy)})">{spin(f"spin-{which}", 360.0, WHEEL_T, moving)}</g>'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="10" fill="#9aa7bb" stroke="#3a465c" stroke-width="2.5"/>'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="4" fill="#cfd9e8"/>'
        f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="1.8" fill="#6d7a90"/>'
        f'</g>'
    )


CHAIN_TRAVEL = 2 * math.pi * RING_R
CHAIN_LINKS = 17
CHAIN_PERIOD = CHAIN_TRAVEL / CHAIN_LINKS
CHAIN_DASH = CHAIN_PERIOD * 0.62
CHAIN_GAP = CHAIN_PERIOD - CHAIN_DASH


def chain_path():
    x1, y1 = HUB_R[0], HUB_R[1] - COG_R
    x2, y2 = BB[0], BB[1] - RING_R
    x3, y3 = BB[0], BB[1] + RING_R
    x4, y4 = HUB_R[0], HUB_R[1] + COG_R
    return (f'M {fmt(x1)} {fmt(y1)} L {fmt(x2)} {fmt(y2)} '
            f'A {fmt(RING_R)} {fmt(RING_R)} 0 0 1 {fmt(x3)} {fmt(y3)} '
            f'L {fmt(x4)} {fmt(y4)} A {fmt(COG_R)} {fmt(COG_R)} 0 0 1 {fmt(x1)} {fmt(y1)} Z')


def chain():
    d = chain_path()
    if MODE == "still":
        off = -CHAIN_TRAVEL * ((T_STILL % CRANK_T) / CRANK_T)
        anim = ""
    else:
        anim = (f'<animate attributeName="stroke-dashoffset" '
                f'values="0;{fmt(-CHAIN_TRAVEL)}" dur="{fmtp(CRANK_T)}s" '
                f'repeatCount="indefinite"/>')
        off = 0.0
    return (f'<path d="{d}" fill="none" stroke="#2b3342" stroke-width="3.6" '
            f'stroke-dasharray="{fmt(CHAIN_DASH)} {fmt(CHAIN_GAP)}" '
            f'stroke-dashoffset="{fmt(off)}">{anim}</path>')


def chainring():
    teeth = "".join(
        f'<rect x="-2.2" y="{fmt(-RING_R-3)}" width="4.4" height="5" rx="1" fill="#b9c6d6" '
        f'transform="rotate({fmt(i * 360 / 32)})"/>' for i in range(32))
    inner = (
        f'<circle cx="0" cy="0" r="{fmt(RING_R)}" fill="#c9d4e2" stroke="#5b6878" stroke-width="2.6"/>'
        + teeth
        + f'<circle cx="0" cy="0" r="{fmt(RING_R-8)}" fill="none" stroke="#8c9aad" stroke-width="2"/>'
        + "".join(
            f'<circle cx="{fmt((RING_R-6)*math.cos(math.radians(i*72)))}" '
            f'cy="{fmt((RING_R-6)*math.sin(math.radians(i*72)))}" r="3" fill="#6d7a90"/>'
            for i in range(5))
        + '<circle cx="0" cy="0" r="4.5" fill="#8a96aa"/>'
    )
    # The chainring is bolted to the crank, so it makes one turn per CRANK_T.
    # Its rim then carries the chain at 2*pi*32/CRANK_T px/s, and the cog's rim
    # carries it at 2*pi*16/WHEEL_T. Those two are equal only because
    # WHEEL_T = CRANK_T/2: that is what the 2:1 gear means, and the numbers
    # above were checked against it before this file was written.
    return (f'<g transform="translate({fmt(BB[0])} {fmt(BB[1])})">'
            f'{spin("chainring", 360.0, CRANK_T, inner)}</g>')


def cog():
    teeth = "".join(
        f'<rect x="-1.6" y="{fmt(-COG_R-2.6)}" width="3.2" height="4" rx="1" fill="#8794a8" '
        f'transform="rotate({fmt(i * 360 / 16)})"/>' for i in range(16))
    inner = (f'<circle cx="0" cy="0" r="{fmt(COG_R)}" fill="#79879c" stroke="#39445a" stroke-width="2.4"/>'
             + teeth + '<circle cx="0" cy="0" r="5" fill="#8a96aa"/>')
    return (f'<g transform="translate({fmt(HUB_R[0])} {fmt(HUB_R[1])})">'
            f'{spin("cog", 360.0, WHEEL_T, inner)}</g>')


def frame():
    ST, HT, HL = SEAT_TOP, HEAD_TOP, HEAD_LOW
    out = ['<g fill="none" stroke-linecap="round" stroke-linejoin="round">']
    tubes = [
        # seat tube, seat stay, top tube, down tube, chain stay
        (f"M {fmt(ST[0])} {fmt(ST[1])} L {fmt(BB[0])} {fmt(BB[1])}", 15),
        (f"M {fmt(ST[0])} {fmt(ST[1])} L {fmt(HUB_R[0])} {fmt(HUB_R[1])}", 10),
        (f"M {fmt(ST[0])} {fmt(ST[1])} L {fmt(HT[0])} {fmt(HT[1])}", 14),
        (f"M {fmt(BB[0])} {fmt(BB[1])} L {fmt(HL[0])} {fmt(HL[1])}", 16),
        (f"M {fmt(BB[0])} {fmt(BB[1])} L {fmt(HUB_R[0])} {fmt(HUB_R[1])}", 12),
    ]
    for d, w in tubes:
        out.append(f'<path d="{d}" stroke="#17332f" stroke-width="{w + 4}"/>')
    for d, w in tubes:
        out.append(f'<path d="{d}" stroke="#2f7f74" stroke-width="{w}"/>')
    for d, w in tubes:
        out.append(f'<path d="{d}" stroke="#63b3a3" stroke-width="2.6" opacity=".85"/>')
    fork = (f"M {fmt(HL[0])} {fmt(HL[1])} C {fmt(FORK_C[0])} {fmt(FORK_C[1])} "
            f"{fmt(HUB_F[0]-18)} {fmt(HUB_F[1]-46)} {fmt(HUB_F[0])} {fmt(HUB_F[1])}")
    out.append(f'<path d="{fork}" stroke="#17332f" stroke-width="13"/>')
    out.append(f'<path d="{fork}" stroke="#2f7f74" stroke-width="8"/>')
    out.append(f'<path d="{fork}" stroke="#63b3a3" stroke-width="2" opacity=".8"/>')
    out.append(f'<path d="M {fmt(HL[0]-15)} {fmt(HL[1]+2)} L {fmt(HL[0]+11)} {fmt(HL[1]-3)}" '
               f'stroke="#17332f" stroke-width="14" stroke-linecap="round"/>')
    out.append(f'<path d="M {fmt(HL[0]-15)} {fmt(HL[1]+2)} L {fmt(HL[0]+11)} {fmt(HL[1]-3)}" '
               f'stroke="#3f9186" stroke-width="9" stroke-linecap="round"/>')
    out.append(f'<path d="M {fmt(HT[0])} {fmt(HT[1])} L {fmt(HL[0])} {fmt(HL[1])}" '
               f'stroke="#17332f" stroke-width="23"/>')
    out.append(f'<path d="M {fmt(HT[0])} {fmt(HT[1])} L {fmt(HL[0])} {fmt(HL[1])}" '
               f'stroke="#3b988c" stroke-width="17"/>')
    out.append(f'<path d="M {fmt(HT[0]-5)} {fmt(HT[1]+13)} L {fmt(HL[0]-8)} {fmt(HL[1]-8)}" '
               f'stroke="#7cc8ba" stroke-width="3" opacity=".9"/>')
    out.append(f'<path d="M {fmt(HT[0]+2)} {fmt(HT[1]+21)} l 8 8 l -8 8 l -8 -8 Z" '
               f'fill="#e9c66a" stroke="#8a6320" stroke-width="2"/>')
    for (x, y), r in ((ST, 6.4), (BB, 8.6), (HL, 6.2)):
        out.append(f'<circle cx="{fmt(x)}" cy="{fmt(y)}" r="{fmt(r)}" fill="#2f7f74" '
                   f'stroke="#17332f" stroke-width="2.6"/>')
    out.append('</g>')
    return "".join(out)


def saddle():
    """A leather saddle on a post, under the bird. The bird's weight sits on it."""
    x, y = SEAT_TOP
    return (
        f'<path d="M {fmt(x)} {fmt(y)} L {fmt(x-1)} {fmt(y+14)}" stroke="#93a7c4" '
        f'stroke-width="10" stroke-linecap="round"/>'
        f'<path d="M {fmt(x-1)} {fmt(y+14)} L {fmt(x-3)} {fmt(y+22)}" stroke="#6f7d90" '
        f'stroke-width="6" stroke-linecap="round"/>'
        # rails
        f'<path d="M {fmt(x-26)} {fmt(y+10)} C {fmt(x-4)} {fmt(y+3)}, {fmt(x+30)} {fmt(y+3)}, '
        f'{fmt(x+48)} {fmt(y+8)}" fill="none" stroke="#8a96aa" stroke-width="3.4"/>'
        # leather top: wider at the back, drawn to a nose at the front
        f'<path d="M {fmt(x-30)} {fmt(y+6)} C {fmt(x-32)} {fmt(y-6)}, {fmt(x-6)} {fmt(y-11)}, '
        f'{fmt(x+22)} {fmt(y-9)} C {fmt(x+44)} {fmt(y-7)}, {fmt(x+54)} {fmt(y-2)}, '
        f'{fmt(x+50)} {fmt(y+4)} C {fmt(x+34)} {fmt(y+12)}, {fmt(x-14)} {fmt(y+13)}, '
        f'{fmt(x-30)} {fmt(y+6)} Z" fill="#3a2a26" stroke="#20130f" stroke-width="2.8"/>'
        f'<path d="M {fmt(x-24)} {fmt(y+1)} C {fmt(x-8)} {fmt(y-6)}, {fmt(x+22)} {fmt(y-6)}, '
        f'{fmt(x+46)} {fmt(y-1)}" fill="none" stroke="#7d5646" stroke-width="2.8" opacity=".85"/>'
        f'<circle cx="{fmt(x-20)}" cy="{fmt(y+6)}" r="2.2" fill="#c08a4a"/>'
        f'<circle cx="{fmt(x+40)}" cy="{fmt(y+3)}" r="2.2" fill="#c08a4a"/>'
        # a saddle bag, because this bird travels
        f'<g transform="translate({fmt(x-34)} {fmt(y+16)})">'
        f'<path d="M 0 0 C -2 12, 4 20, 16 20 C 26 20, 30 12, 28 0 Z" fill="#8a5a34" '
        f'stroke="#4d2f1a" stroke-width="2.4"/>'
        f'<path d="M 1 6 L 27 6" stroke="#4d2f1a" stroke-width="2.2"/>'
        f'<circle cx="14" cy="13" r="2.4" fill="#e9c66a" stroke="#8a6320" stroke-width="1.2"/>'
        f'</g>'
    )


def rack_and_basket():
    """A rear rack, a wicker basket, two fish in it, and a lamp on the front.

    Draw order is the point: the fish go in FIRST, then the basket's front wall
    and rim go over them, so the fish are inside the basket and only their
    tails come out. Drawn the other way round they float in front of the wicker.
    """
    out = ['<g stroke="#2b3342" stroke-width="4" fill="none" stroke-linecap="round">'
           '<path d="M 322 486 L 436 482"/>'
           '<path d="M 330 486 L 352 552"/>'
           '<path d="M 428 482 L 410 556"/>'
           '<path d="M 352 486 L 344 528"/>'
           '<path d="M 436 482 L 452 472"/>'
           '<path d="M 326 500 L 440 496" stroke-width="2.4" opacity=".8"/>'
           '</g>']

    out.append('<g transform="translate(312 402)">')
    # darker inside of the basket, behind the fish
    out.append('<path d="M 9 3 L 112 1 L 113 22 L 8 24 Z" fill="#6b4520" opacity=".85"/>')

    # ---- the fish, inside
    out.append('<g transform="translate(34 -16) rotate(-58) scale(.94)">'
               '<path d="M -26 0 C -26 -13, -14 -20, 2 -19 C 18 -18, 26 -9, 26 0 '
               'C 26 9, 18 18, 2 19 C -14 20, -26 13, -26 0 Z" '
               'fill="#cfe2ea" stroke="#3f6a80" stroke-width="2.8" stroke-linejoin="round"/>'
               '<path d="M -20 6 C -8 15, 12 15, 23 4 C 14 16, -8 18, -20 6 Z" '
               'fill="#9dc0d0" opacity=".9"/>'
               '<path d="M 24 -6 L 46 -19 L 41 0 L 46 19 L 24 6 Z" '
               'fill="#b6cfdb" stroke="#3f6a80" stroke-width="2.6" stroke-linejoin="round"/>'
               '<path d="M -6 -18 L 0 -30 L 13 -17 Z" fill="#b6cfdb" stroke="#3f6a80" '
               'stroke-width="2.2" stroke-linejoin="round"/>'
               '<path d="M -12 -11 C -8 -4, -8 4, -12 11" fill="none" stroke="#7fa8c0" stroke-width="2.2"/>'
               '<circle cx="-17" cy="-4" r="3.6" fill="#22384a"/>'
               '<circle cx="-18.2" cy="-5.4" r="1.3" fill="#ffffff"/>'
               '</g>')
    out.append('<g transform="translate(68 -10) rotate(-72) scale(.72)">'
               '<path d="M -26 0 C -26 -13, -14 -20, 2 -19 C 18 -18, 26 -9, 26 0 '
               'C 26 9, 18 18, 2 19 C -14 20, -26 13, -26 0 Z" '
               'fill="#e3eef3" stroke="#3f6a80" stroke-width="3" stroke-linejoin="round"/>'
               '<path d="M -20 6 C -8 15, 12 15, 23 4 C 14 16, -8 18, -20 6 Z" '
               'fill="#aabfcb" opacity=".9"/>'
               '<path d="M 24 -6 L 46 -19 L 41 0 L 46 19 L 24 6 Z" '
               'fill="#c8dbe4" stroke="#3f6a80" stroke-width="2.8" stroke-linejoin="round"/>'
               '<path d="M -6 -18 L 0 -30 L 13 -17 Z" fill="#c8dbe4" stroke="#3f6a80" '
               'stroke-width="2.4" stroke-linejoin="round"/>'
               '<path d="M -12 -11 C -8 -4, -8 4, -12 11" fill="none" stroke="#8fb4c8" stroke-width="2.4"/>'
               '<circle cx="-17" cy="-4" r="3.8" fill="#22384a"/>'
               '<circle cx="-18.4" cy="-5.6" r="1.4" fill="#ffffff"/>'
               '</g>')

    # ---- the front wall of the basket, over the fish, from the rim down
    out.append('<path d="M 7 15 L 114 13 L 119 78 L 2 80 Z" fill="#b8894a" '
               'stroke="#6b4520" stroke-width="3" stroke-linejoin="round"/>')
    out.append('<g stroke="#a2733a" stroke-width="2" opacity=".9">'
               '<path d="M 7 26 L 115 24 M 7 40 L 117 38 M 7 54 L 118 52 M 7 67 L 119 65"/>'
               '<path d="M 21 16 L 20 79 M 43 15 L 43 79 M 65 14 L 65 79 M 87 14 L 87 79 M 106 13 L 107 79"/>'
               '</g>')
    out.append('<path d="M 10 18 L 111 16" stroke="#e0b478" stroke-width="2" opacity=".75"/>')
    # ---- the rim: a bound edge, and it is what the fish are leaning on
    out.append('<path d="M 4 3 L 117 1 L 117 16 L 6 18 Z" fill="#c99a5c" '
               'stroke="#6b4520" stroke-width="2.6" stroke-linejoin="round"/>')
    out.append('<path d="M 10 6 L 112 4" stroke="#e8c48c" stroke-width="2.4" opacity=".9"/>')
    out.append('</g>')
    return "".join(out)


def bottle():
    return (
        '<g transform="translate(578 566) rotate(-40)">'
        '<rect x="-10" y="-24" width="20" height="46" rx="7" fill="#efe3c6" stroke="#8a7a56" stroke-width="2.4"/>'
        '<rect x="-7" y="-30" width="14" height="9" rx="3.5" fill="#7fa8c0" stroke="#4f7288" stroke-width="2"/>'
        '<path d="M -6 -14 L -6 16" stroke="#ffffff" stroke-width="2.4" opacity=".5"/>'
        '<path d="M 4 -10 L 4 12" stroke="#c9b98e" stroke-width="2" opacity=".8"/>'
        '</g>'
        '<g fill="none" stroke="#5b6878" stroke-width="3.4" stroke-linecap="round">'
        '<path d="M 546 588 C 552 574, 566 566, 580 562"/>'
        '<path d="M 556 612 C 562 600, 574 592, 588 588"/>'
        '</g>'
    )


def cockpit():
    HT = HEAD_TOP
    stem = (f"M {fmt(HT[0])} {fmt(HT[1])} C {fmt(HT[0]+14)} {fmt(HT[1]-22)} "
            f"{fmt(GRIP[0]-16)} {fmt(GRIP[1]+2)} {fmt(GRIP[0]-4)} {fmt(GRIP[1])}")
    bar = (f"M {fmt(HT[0]+10)} {fmt(HT[1]-16)} C {fmt(HT[0]+38)} {fmt(HT[1]-34)} "
           f"{fmt(GRIP[0]+16)} {fmt(GRIP[1]-12)} {fmt(GRIP[0]-2)} {fmt(GRIP[1])}")
    return (
        f'<path d="{stem}" fill="none" stroke="#17332f" stroke-width="15" stroke-linecap="round"/>'
        f'<path d="{stem}" fill="none" stroke="#c9d4e2" stroke-width="9" stroke-linecap="round"/>'
        f'<path d="{stem}" fill="none" stroke="#f2f7fc" stroke-width="2.4" stroke-linecap="round" '
        f'opacity=".9" transform="translate(0 -3)"/>'
        f'<path d="{bar}" fill="none" stroke="#17332f" stroke-width="12" stroke-linecap="round"/>'
        f'<path d="{bar}" fill="none" stroke="#dfe8f2" stroke-width="7" stroke-linecap="round"/>'
        f'<rect x="{fmt(GRIP[0]-12)}" y="{fmt(GRIP[1]-7.5)}" width="30" height="15" rx="7" '
        f'fill="#3a2a26" stroke="#20130f" stroke-width="2"/>'
        f'<path d="M {fmt(GRIP[0]-6)} {fmt(GRIP[1]-4)} L {fmt(GRIP[0]+14)} {fmt(GRIP[1]-4)}" '
        f'stroke="#6b4b3c" stroke-width="2" opacity=".8"/>'
        f'<g transform="translate({fmt(GRIP[0]-30)} {fmt(GRIP[1]-18)})">'
        '<circle cx="0" cy="0" r="10" fill="#d8a548" stroke="#8a6320" stroke-width="2.6"/>'
        '<path d="M -6 -4 C -3 -9, 3 -9, 6 -4" fill="none" stroke="#ffe9a8" stroke-width="2.6"/>'
        '<circle cx="0" cy="3" r="2.2" fill="#8a6320"/></g>'
        f'<g id="lamp">'
        f'<circle cx="{fmt(GRIP[0]+2)}" cy="{fmt(GRIP[1]+30)}" r="56" fill="url(#lampGlow)"/>'
        f'<rect x="{fmt(GRIP[0]-13)}" y="{fmt(GRIP[1]+21)}" width="28" height="19" rx="5" '
        f'fill="#5c6a7e" stroke="#2b3342" stroke-width="2.4"/>'
        f'<rect x="{fmt(GRIP[0]+11)}" y="{fmt(GRIP[1]+24)}" width="13" height="13" rx="3" fill="#fff3c4"/>'
        f'<path d="M {fmt(GRIP[0]-9)} {fmt(GRIP[1]+25)} L {fmt(GRIP[0]+8)} {fmt(GRIP[1]+25)}" '
        f'stroke="#aab6c6" stroke-width="2" opacity=".8"/>'
        '</g>'
    )


# ---------------------------------------------------------------------------
# 5. THE BIRD
# ---------------------------------------------------------------------------
CREAM = "#fbf4e4"
CREAM_SH = "#ddc9a6"
CREAM_COOL = "#cedbe4"
INK = "#2a3142"
BILL_D = "#c9772a"
POUCH_D = "#c96f2c"
SCARF = "#e0524a"
SCARF_D = "#b23c37"


def bird_back():
    """Tail, body, neck. The head is a separate rig so it can bob."""
    return (
        # ---- tail: a fan of three pointed feathers, laid back
        '<g id="tail">'
        '<path d="M 452 372 C 432 366, 414 356, 400 346 C 407 355, 412 363, 415 371 '
        'C 406 368, 398 368, 391 370 C 401 378, 413 386, 425 391 '
        'C 436 395, 448 397, 452 396 Z" '
        f'fill="{CREAM}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
        f'<path d="M 444 388 C 416 380, 390 366, 368 350" fill="none" stroke="{CREAM_SH}" '
        f'stroke-width="2.6"/>'
        f'<path d="M 446 398 C 420 392, 396 380, 376 366" fill="none" stroke="{CREAM_SH}" '
        f'stroke-width="2.2" opacity=".8"/>'
        '</g>'
        # ---- body: plump, leaning forward over the bars
        '<g id="body">'
        '<path d="M 452 356 C 470 316, 520 300, 566 306 C 612 312, 636 336, 636 364 '
        'C 636 400, 612 432, 572 448 C 528 464, 476 458, 456 428 '
        'C 440 402, 442 376, 452 356 Z" '
        f'fill="{CREAM}" stroke="{INK}" stroke-width="3.4"/>'
        # cool shadow along the back, warm bounce under the belly
        f'<path d="M 462 352 C 478 316, 522 302, 562 306 C 522 318, 486 336, 470 366 Z" '
        f'fill="{CREAM_COOL}" opacity=".6"/>'
        f'<path d="M 470 428 C 502 452, 560 454, 604 434 C 580 456, 512 460, 470 428 Z" '
        f'fill="{CREAM_SH}" opacity=".8"/>'
        # a few feather groups, so the flank is not a blank egg
        f'<g fill="none" stroke="{CREAM_SH}" stroke-width="2.4" stroke-linecap="round" opacity=".9">'
        '<path d="M 486 392 C 504 402, 526 406, 546 404"/>'
        '<path d="M 496 414 C 516 424, 542 428, 564 424"/>'
        '<path d="M 556 412 C 578 418, 600 416, 614 408"/>'
        '<path d="M 524 372 C 544 380, 568 382, 586 376"/>'
        '</g>'
        # warm rim from the low sun along the chest
        f'<path d="M 618 408 C 634 388, 638 366, 634 344" fill="none" stroke="#ffe3b0" '
        f'stroke-width="4.4" stroke-linecap="round" opacity=".9"/>'
        '</g>'
        # ---- neck: thick, an S, forward out of the shoulders
        '<g id="neck">'
        '<path d="M 572 350 C 574 298, 600 260, 644 244 L 676 286 '
        'C 650 296, 628 320, 620 352 Z" '
        f'fill="{CREAM}" stroke="{INK}" stroke-width="3.2" stroke-linejoin="round"/>'
        f'<path d="M 590 340 C 596 302, 616 276, 642 266" fill="none" stroke="{CREAM_COOL}" '
        f'stroke-width="3" opacity=".55"/>'
        f'<path d="M 640 258 C 652 266, 664 278, 672 292" fill="none" stroke="{CREAM_SH}" '
        f'stroke-width="2.4" opacity=".7"/>'
        '</g>'
    )


def bird_head():
    """Head, crest, bill and the pouch. The pouch hangs from the bill's own
    lower edge, so no background can show through the join."""
    # blink: a lid that is simply not there until it closes. Scaling the eye
    # made a second eyeball; a rotating disc covered half of it.
    if MODE == "still":
        u = (T_STILL % 5.2) / 5.2
        closed = 0.9 < u < 0.975
        lid_open, lid_closed = ("1", "0") if closed else ("0", "1")
        lid = (f'<g id="lid" opacity="{lid_open}">'
               f'<ellipse cx="0" cy="0" rx="12" ry="11.4" fill="{CREAM}"/>'
               f'<path d="M -11 -1 C -5 4, 5 4, 11 -1" fill="none" stroke="{INK}" '
               f'stroke-width="2.6" stroke-linecap="round"/></g>')
    else:
        lid = (f'<g id="lid" opacity="0">'
               f'<animate attributeName="opacity" values="0;0;1;1;0;0" '
               f'keyTimes="0;0.9;0.926;0.951;0.976;1" dur="5.2s" repeatCount="indefinite"/>'
               f'<ellipse cx="0" cy="0" rx="12" ry="11.4" fill="{CREAM}"/>'
               f'<path d="M -11 -1 C -5 4, 5 4, 11 -1" fill="none" stroke="{INK}" '
               f'stroke-width="2.6" stroke-linecap="round"/></g>')

    return (
        '<g id="head">'
        # ---- crest: three short feathers at the BACK of the head
        f'<g stroke="{INK}" stroke-width="2.2" stroke-linejoin="round">'
        f'<path d="M 652 220 C 636 212, 620 210, 606 214 C 616 222, 626 230, 632 240 Z" '
        f'fill="#f6dc90"/>'
        f'<path d="M 656 232 C 642 226, 628 226, 616 230 C 626 236, 636 244, 642 252 Z" '
        f'fill="#fbeec2"/>'
        f'<path d="M 660 244 C 650 240, 640 241, 632 244 C 640 249, 648 255, 652 260 Z" '
        f'fill="#fdf6e0"/>'
        f'</g>'
        # ---- skull
        '<path d="M 648 264 C 638 236, 654 210, 682 206 C 710 202, 730 220, 728 244 '
        'C 726 268, 706 282, 682 281 C 666 280, 652 274, 648 264 Z" '
        f'fill="{CREAM}" stroke="{INK}" stroke-width="3.4"/>'
        f'<path d="M 654 250 C 660 226, 680 214, 702 216" fill="none" stroke="{CREAM_COOL}" '
        f'stroke-width="3" opacity=".5"/>'
        f'<path d="M 700 277 C 714 273, 724 262, 727 248" fill="none" stroke="#ffe3b0" '
        f'stroke-width="3.4" opacity=".9"/>'
        # ---- the pouch: its top edge IS the bill's lower edge, so the
        #      two shapes cannot show a gap however the gradient falls
        '<path d="M 696 243 C 700 298, 724 342, 768 348 C 810 353, 840 302, 845 260 '
        'C 806 250, 748 243, 696 243 Z" '
        f'fill="url(#pouch)" stroke="{INK}" stroke-width="3.2" stroke-linejoin="round"/>'
        # the mandible edge, re-drawn over the pouch so the join reads as bone
        f'<path d="M 696 243 C 748 243, 806 250, 845 260" fill="none" stroke="#a8631f" '
        f'stroke-width="2.6" opacity=".5"/>'
        # folds in the skin: two, following the hang
        f'<path d="M 712 272 C 722 306, 744 332, 772 338" fill="none" stroke="{POUCH_D}" '
        f'stroke-width="3" opacity=".75"/>'
        '<path d="M 790 318 C 806 322, 824 306, 834 280" fill="none" stroke="#ffbe7e" '
        'stroke-width="3.4" opacity=".7"/>'
        '<path d="M 736 300 C 750 320, 772 328, 790 322" fill="none" stroke="#ffca92" '
        'stroke-width="2.6" opacity=".5"/>'
        # the light coming through the skin, low and forward
        '<path d="M 706 268 C 712 300, 730 326, 756 336" fill="none" stroke="#ffd9a0" '
        'stroke-width="4" opacity=".35"/>'
        # ---- upper mandible: long, hooked, and it overhangs the pouch
        '<path d="M 692 226 C 748 220, 810 232, 848 250 C 854 253, 851 261, 845 260 '
        'C 806 250, 748 243, 696 243 Z" '
        'fill="url(#bill)" stroke="#2a3142" stroke-width="3.2" stroke-linejoin="round"/>'
        '<path d="M 700 232 C 750 227, 804 238, 842 252" fill="none" stroke="#ffd991" '
        'stroke-width="3.2" opacity=".9"/>'
        f'<path d="M 845 250 C 856 252, 861 261, 853 267 C 846 265, 840 257, 838 252 Z" '
        f'fill="{BILL_D}" stroke="#2a3142" stroke-width="2.2"/>'
        '<ellipse cx="722" cy="235" rx="4.6" ry="2.2" fill="#b96a1c" opacity=".8"/>'
        '<ellipse cx="778" cy="239" rx="3.4" ry="1.8" fill="#b96a1c" opacity=".5"/>'
        # ---- eye
        '<g transform="translate(680 234)">'
        '<circle cx="0" cy="0" r="11" fill="#fdf9ee" stroke="#2a3142" stroke-width="2"/>'
        '<circle cx="1.4" cy="0.6" r="7.2" fill="#2b3347"/>'
        '<circle cx="-1.8" cy="-2.8" r="2.8" fill="#ffffff"/>'
        '<circle cx="3.6" cy="3.4" r="1.3" fill="#ffffff" opacity=".65"/>'
        '<path d="M -13 -5 C -8 -13, 6 -14, 13 -8" fill="none" stroke="#2a3142" '
        'stroke-width="2.6" stroke-linecap="round"/>'
        f'{lid}'
        '</g>'
        # ---- cheek, and the corner of the gape
        '<ellipse cx="660" cy="258" rx="13" ry="7" fill="#ffe6d0" opacity=".45"/>'
        f'<path d="M 660 272 C 674 277, 690 273, 700 264" fill="none" stroke="{CREAM_SH}" '
        f'stroke-width="2.2" opacity=".9"/>'
        '</g>'
    )


def scarf():
    return (
        '<path d="M 578 346 C 588 328, 614 322, 630 332 C 644 342, 640 362, 622 368 '
        f'C 602 375, 578 364, 578 346 Z" fill="{SCARF}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M 588 342 C 598 330, 616 328, 628 336" fill="none" stroke="#f4867c" '
        f'stroke-width="3" opacity=".9"/>'
        + group("scarf-a", [-6.0, 5.0, -6.0], 0.5,
                f'<path d="M 0 0 C -26 7, -52 16, -78 15 C -70 26, -44 30, -20 23 '
                f'C -6 19, 4 10, 7 4 Z" fill="{SCARF}" stroke="{INK}" stroke-width="2.6"/>'
                f'<path d="M -12 7 C -34 11, -52 15, -64 16" fill="none" stroke="{SCARF_D}" '
                f'stroke-width="2.2" opacity=".8"/>',
                transform="translate(582 354)")
        + group("scarf-b", [7.0, -5.0, 7.0], 1.0,
                f'<path d="M 0 0 C -22 13, -44 30, -62 41 C -49 47, -28 38, -11 23 '
                f'C -1 15, 5 6, 5 2 Z" fill="{SCARF_D}" stroke="{INK}" stroke-width="2.6"/>'
                f'<path d="M -7 7 C -24 19, -40 30, -50 35" fill="none" stroke="#8f2d2a" '
                f'stroke-width="2" opacity=".7"/>',
                transform="translate(586 364)")
    )


def wing_near():
    """The near wing, out of the shoulder, over the bar, gripping the grip."""
    return (
        '<g id="wing">'
        # the arm of the wing: shoulder to wrist
        '<path d="M 586 338 C 614 334, 650 350, 674 368 C 686 377, 694 388, 698 398 '
        'C 690 406, 676 402, 664 392 C 636 374, 606 356, 586 338 Z" '
        f'fill="{CREAM}" stroke="{INK}" stroke-width="3.2" stroke-linejoin="round"/>'
        f'<path d="M 594 344 C 616 344, 642 356, 660 372" fill="none" stroke="{CREAM_SH}" '
        f'stroke-width="2.6" opacity=".9"/>'
        # primaries: three swept, tapered feathers, angled back and up
        '<path d="M 650 388 C 666 397, 684 408, 696 416 C 700 419, 696 424, 691 420 '
        'C 677 411, 661 401, 646 394 Z" fill="#5b6478" stroke="#25303c" stroke-width="2" '
        'stroke-linejoin="round"/>'
        '<path d="M 660 376 C 674 385, 688 395, 699 403 C 703 406, 699 411, 694 407 '
        'C 682 399, 670 390, 656 382 Z" fill="#6c7488" stroke="#25303c" stroke-width="1.9" '
        'stroke-linejoin="round"/>'
        '<path d="M 670 364 C 682 373, 694 381, 703 389 C 706 392, 702 396, 698 393 '
        'C 687 385, 678 378, 666 370 Z" fill="#7d8598" stroke="#25303c" stroke-width="1.8" '
        'stroke-linejoin="round"/>'
        # the hand: two shortened feather-fingers curled round the grip
        f'<path d="M 682 394 C 696 396, 708 405, 704 414 C 695 417, 682 410, 678 403 Z" '
        f'fill="#efe6d2" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>'
        f'<path d="M 690 405 C 698 409, 700 414, 696 417" fill="none" stroke="{CREAM_SH}" '
        f'stroke-width="2"/>'
        f'<path d="M 684 398 C 692 400, 698 406, 696 411" fill="none" stroke="{INK}" '
        f'stroke-width="1.6" opacity=".5"/>'
        '</g>'
    )


# ---------------------------------------------------------------------------
# 6. THE PLACE
# ---------------------------------------------------------------------------
def scene():
    out = [
        '<rect x="0" y="0" width="1200" height="470" fill="url(#sky)"/>',
        '<circle cx="962" cy="216" r="168" fill="url(#sunGlow)"/>',
        '<circle cx="962" cy="216" r="46" fill="#fff4cf" opacity=".9"/>',
        '<circle cx="962" cy="216" r="38" fill="#fffbe9"/>',
        sway("clouds", -34, 0, 46.0,
             '<g fill="#ffe7cf" opacity=".92">'
             '<ellipse cx="180" cy="150" rx="96" ry="24"/><ellipse cx="142" cy="140" rx="50" ry="22"/>'
             '<ellipse cx="222" cy="134" rx="44" ry="24"/></g>'
             '<g fill="#ffdfc4" opacity=".8"><ellipse cx="640" cy="104" rx="118" ry="20"/>'
             '<ellipse cx="602" cy="96" rx="52" ry="18"/><ellipse cx="686" cy="92" rx="46" ry="20"/></g>'
             '<g fill="#fff0dc" opacity=".65"><ellipse cx="1070" cy="330" rx="150" ry="14"/></g>'
             '<g fill="#ffe9d2" opacity=".75"><ellipse cx="430" cy="220" rx="86" ry="12"/></g>'),
        sway("headland", -26, 0, 46.0,
             '<g opacity=".5" fill="#6d8b92">'
             '<path d="M 0 424 C 90 404, 170 402, 250 414 C 300 421, 340 424, 380 424 L 0 424 Z"/>'
             '<path d="M 700 420 C 780 398, 850 396, 930 408 C 990 417, 1060 420, 1200 420 '
             'L 1200 424 L 700 424 Z"/></g>'
             '<g opacity=".55">'
             '<path d="M 895 404 L 927 404 L 921 372 L 901 372 Z" fill="#7f9a9e"/>'
             '<rect x="905" y="352" width="12" height="52" fill="#f4ece0"/>'
             '<rect x="902" y="346" width="18" height="9" rx="2" fill="#e2604a"/>'
             '<circle cx="911" cy="351" r="6" fill="#ffe9a8"/></g>'),
        '<rect x="0" y="424" width="1200" height="96" fill="url(#sea)"/>',
        '<rect x="0" y="424" width="1200" height="9" fill="#9cc4ca" opacity=".7"/>',
        sway("sea-glint", -34, 0, 7.0,
             '<g stroke="#ffe6b0" stroke-width="3" stroke-linecap="round" opacity=".75">'
             '<path d="M 100 447 L 168 447"/><path d="M 210 462 L 250 462"/>'
             '<path d="M 286 440 L 330 440"/><path d="M 372 470 L 418 470"/>'
             '<path d="M 452 452 L 486 452"/><path d="M 540 464 L 586 464"/>'
             '<path d="M 620 444 L 664 444"/><path d="M 700 474 L 742 474"/>'
             '<path d="M 786 450 L 828 450"/><path d="M 860 466 L 906 466"/>'
             '<path d="M 940 442 L 982 442"/><path d="M 1020 470 L 1062 470"/>'
             '<path d="M 1100 452 L 1144 452"/><path d="M 1180 464 L 1224 464"/>'
             '<path d="M 40 474 L 84 474"/><path d="M 56 442 L 96 442"/></g>'),
        # two distant seabirds, white ticks on the sky
        sway("far-birds", -14, 0, 30.0,
             '<g fill="#fdf3e2" opacity=".8">'
             '<path d="M 296 236 C 304 226, 312 224, 320 232 C 328 224, 336 226, 344 236 '
             'C 336 232, 328 233, 320 240 C 312 233, 304 232, 296 236 Z"/>'
             '<path d="M 362 206 C 368 198, 374 197, 380 203 C 386 197, 392 198, 398 206 '
             'C 392 203, 386 204, 380 209 C 374 204, 368 203, 362 206 Z"/></g>'),
        # haze over the water, so the sea does not meet the sky in a hard line
        '<ellipse cx="600" cy="428" rx="720" ry="26" fill="#ffd9a8" opacity=".38"/>'
        '<ellipse cx="300" cy="424" rx="420" ry="18" fill="#ffe3bd" opacity=".3"/>',
        # cliff edge + verge
        '<path d="M 0 508 C 120 496, 260 502, 400 498 C 560 494, 700 502, 860 496 '
        'C 1000 491, 1120 500, 1200 496 L 1200 594 L 0 594 Z" fill="url(#vergeFill)"/>',
        '<path d="M 0 508 C 120 496, 260 502, 400 498 C 560 494, 700 502, 860 496 '
        'C 1000 491, 1120 500, 1200 496" fill="none" stroke="#a6c184" stroke-width="4" opacity=".85"/>',
        '<rect x="0" y="594" width="1200" height="206" fill="url(#road)"/>',
        '<rect x="0" y="594" width="1200" height="6" fill="#8f8b78" opacity=".5"/>',
        road_marks(),
        verge_tufts(),
        contact_shadow(),
        foreground(),
    ]
    return "".join(out)


def road_marks():
    pitch = CIRC / 3.0
    dash = pitch * 0.58
    mid, edge = [], []
    x = -pitch
    while x < W + pitch:
        mid.append(f'<rect x="{fmt(x)}" y="716" width="{fmt(dash)}" height="9" rx="2" '
                   f'fill="#efdfb8" opacity=".8"/>')
        edge.append(f'<rect x="{fmt(x)}" y="648" width="{fmt(pitch*0.86)}" height="5" rx="1.5" '
                    f'fill="#efe6d0" opacity=".5"/>')
        x += pitch
    inner = (
        # a warm band of sun on the tarmac, and its darker edge
        '<rect x="0" y="596" width="1200" height="26" fill="#8a7f6a" opacity=".35"/>'
        + "".join(mid) + "".join(edge)
        + f'<g stroke="#38373f" stroke-width="3" opacity=".5" stroke-linecap="round">'
        f'<path d="M {fmt(pitch*0.55)} 686 l 70 6"/>'
        f'<path d="M {fmt(pitch*1.45)} 704 l 44 4"/></g>'
    )
    return travel("road-marks", -pitch, 0, pitch / ROAD_SPEED, inner)


def verge_tufts():
    pitch = CIRC / 2.0
    g = []
    x = -pitch
    i = 0
    while x < W + pitch:
        h = 9 + (i * 5) % 8
        g.append(f'<path d="M {fmt(x)} 592 l -5 -{h} l 9 3 l 3 -{h-2} l 3 {h} l 8 -4 l -3 {h-4}" '
                 f'fill="#7fa055" stroke="#62883f" stroke-width="1.7"/>')
        g.append(f'<path d="M {fmt(x+16)} 591 l 2 -{h-3} l 5 {h-1} l 4 -{h-5}" fill="none" '
                 f'stroke="#93b268" stroke-width="2"/>')
        g.append(f'<ellipse cx="{fmt(x+8)}" cy="{fmt(600 + (i % 3) * 4)}" rx="7" ry="2.6" '
                 f'fill="#6f8f4c" opacity=".7"/>')
        x += pitch / 3.0
        i += 1
    # a milestone that passes once per cycle
    g.append('<g transform="translate(' + fmt(pitch * 1.4) + ' 0)">'
             '<rect x="0" y="552" width="48" height="40" rx="3" fill="#e6ddc7" stroke="#8a8267" stroke-width="2.4"/>'
             '<rect x="0" y="552" width="48" height="9" fill="#cfc4a8" stroke="#8a8267" stroke-width="2"/>'
             '<path d="M 9 572 L 39 572" stroke="#8a8267" stroke-width="2.6"/>'
             '<path d="M 9 581 L 29 581" stroke="#a9a08a" stroke-width="2.2"/>'
             '<path d="M 40 592 L 44 584 L 48 592" fill="#6f8f4c"/></g>')
    return travel("verge", -pitch, 0, pitch / ROAD_SPEED, "".join(g))


def contact_shadow():
    """Contact shadows, thrown to the left because the sun is low on the right.
    One under each tyre, one long soft one under the bird and frame."""
    return (
        # the tyres touch here, and only here
        '<ellipse cx="360" cy="668" rx="52" ry="8" fill="#191820" opacity=".62"/>'
        '<ellipse cx="700" cy="668" rx="52" ry="8" fill="#191820" opacity=".62"/>'
        # the machine's shadow, cast left
        '<ellipse cx="486" cy="664" rx="238" ry="13" fill="#1b1a20" opacity=".34"/>'
        # the bird's own shadow, further left, softer
        '<ellipse cx="440" cy="660" rx="170" ry="11" fill="#1b1a20" opacity=".24"/>'
    )


def foreground():
    """Fast, dark, out of focus in feel: it is the layer nearest the lens."""
    pitch = CIRC * 1.4
    def clump(x):
        return (f'<path d="M {fmt(x)} 800 L {fmt(x)} 748 C {fmt(x+34)} 736, {fmt(x+64)} 752, '
                f'{fmt(x+94)} 732 C {fmt(x+118)} 752, {fmt(x+148)} 740, {fmt(x+176)} 766 '
                f'L {fmt(x+176)} 800 Z" fill="#1f2a2a" opacity=".92"/>'
                f'<path d="M {fmt(x)} 748 C {fmt(x+34)} 736, {fmt(x+64)} 752, {fmt(x+94)} 732 '
                f'C {fmt(x+118)} 752, {fmt(x+148)} 740, {fmt(x+176)} 766" fill="none" '
                f'stroke="#3f5347" stroke-width="3" opacity=".8"/>')
    inner = clump(0) + clump(pitch) + clump(pitch * 2)
    return travel("foreground", -pitch, 0, pitch / ROAD_SPEED, inner)


# ---------------------------------------------------------------------------
# 7. ASSEMBLY
# ---------------------------------------------------------------------------
def belly_feathers():
    """A fan of belly feathers over the near thigh's top, so the leg is
    sheathed by the body. Placed at the hip; it travels with the bob."""
    return (
        '<g id="belly-fan">'
        '<path d="M 452 436 C 470 452, 496 462, 522 458 C 540 455, 552 448, 558 438 '
        'C 548 452, 528 462, 506 464 C 484 466, 462 456, 452 436 Z" '
        f'fill="{CREAM}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
        f'<path d="M 470 448 C 484 456, 502 458, 518 453" fill="none" stroke="{CREAM_SH}" '
        f'stroke-width="2.4"/>'
        f'<path d="M 462 442 C 476 452, 492 457, 506 456" fill="none" stroke="{CREAM_SH}" '
        f'stroke-width="2" opacity=".8"/>'
        '</g>'
    )


def bob_values():
    """Twice per crank turn: the push of each leg. Same beat as the pedals."""
    vals = []
    for i in range(KEYS + 1):
        ph = 2 * math.pi * i / KEYS
        vals.append((0.0, -2.6 * abs(math.sin(ph))))
    return vals


def head_bob():
    """The head lags the body a quarter beat, the way a heavy bird's does."""
    vals = []
    for i in range(KEYS + 1):
        ph = 2 * math.pi * i / KEYS
        vals.append((0.9 * math.sin(ph + 2.2), 1.7 * abs(math.sin(ph + 0.9)) - 0.9))
    return vals


def document():
    body = "".join([
        scene(),
        crank("far", half_turn=True, far=True),
        leg("far", half_turn=True, far=True),
        wheel("rear", HUB_R),
        wheel("front", HUB_F),
        chain(),
        cog(),
        chainring(),
        frame(),
        saddle(),
        rack_and_basket(),
        bottle(),
        cockpit(),
        crank("near"),
        group("bird", bob_values(), CRANK_T, bird_back(), kind="translate"),
        group("head-bob", head_bob(), CRANK_T, bird_head(), kind="translate"),
        scarf(),
        wing_near(),
        # the leg goes OVER the frame (so the shin passes in front of the down
        # tube and the foot lands on the pedal), and then a fan of belly
        # feathers goes over the TOP of the thigh, so the leg comes out from
        # under the body instead of lying on top of it. Three passes were spent
        # discovering that neither order alone looks right.
        leg("near"),
        belly_feathers(),
        '<rect x="0" y="0" width="1200" height="800" fill="url(#vig)"/>',
    ])

    defs = f'''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#3d7ca6"/><stop offset=".4" stop-color="#8ab4c6"/>
  <stop offset=".72" stop-color="#f0c69c"/><stop offset="1" stop-color="#ffd9a8"/>
</linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#7ba3a8"/><stop offset=".45" stop-color="#4a8398"/>
  <stop offset="1" stop-color="#336681"/>
</linearGradient>
<linearGradient id="vergeFill" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#93b06d"/><stop offset=".55" stop-color="#7c9c58"/>
  <stop offset="1" stop-color="#5d7743"/>
</linearGradient>
<linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#5d5c66"/><stop offset=".5" stop-color="#4b4a54"/>
  <stop offset="1" stop-color="#3a3943"/>
</linearGradient>
<linearGradient id="bill" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#ffc866"/><stop offset="1" stop-color="#f5a744"/>
</linearGradient>
<linearGradient id="pouch" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#f3a256"/><stop offset="1" stop-color="#ec8f3c"/>
</linearGradient>
<radialGradient id="sunGlow">
  <stop offset="0" stop-color="#ffeec2" stop-opacity=".95"/>
  <stop offset=".42" stop-color="#ffd9a0" stop-opacity=".45"/>
  <stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/>
</radialGradient>
<radialGradient id="lampGlow">
  <stop offset="0" stop-color="#ffe9b0" stop-opacity=".8"/>
  <stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/>
</radialGradient>
<radialGradient id="vig" cx=".5" cy=".52" r=".75">
  <stop offset=".62" stop-color="#000000" stop-opacity="0"/>
  <stop offset="1" stop-color="#0d1018" stop-opacity=".32"/>
</radialGradient>
</defs>'''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A pelican riding a bicycle</title>
<!--
  A pelican riding a bicycle. One file: HTML and ONE inline SVG.
  No JavaScript. No images. No fonts. No libraries. No network.
  Every movement is a native SVG <animate> / <animateTransform>. The four lines
  of CSS below only let the picture fill the window: not one pixel is drawn or
  moved with CSS.

  Three things in it are solved rather than drawn by eye:

   1. THE WHEELS DO NOT SLIP. One turn of a 104 px wheel is 2*pi*104 = 653.45 px
      of ground, and the road markings travel exactly 653.45 px per wheel
      revolution, so the tyre and the road agree at the contact patch on every
      frame. The verge and the grass move at that same speed: same ground.

   2. THE GEARING IS REAL. Chainring r32, cog r16, so the wheel turns exactly
      twice per crank turn and the chain's links run at the chain's true speed
      (w*r is the same on both sprockets).

   3. THE LEGS ARE SOLVED. Two-bone inverse kinematics (thigh 98, shin 82)
      against the pedal's true circle, 36 keys per crank turn, each webbed foot
      levelled against its pedal so it sits ON the pedal instead of through it.
      The far leg is half a turn behind the near one.

  The scene: a coast road at the end of the day, the sea behind, two fish in the
  basket, one very pleased pelican.
-->
<style>
  html, body {{ height: 100%; margin: 0; background: #1d2a33; }}
  svg {{ display: block; width: 100%; height: 100%; }}
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid meet" role="img"
     aria-labelledby="t d">
<title id="t">A pelican riding a bicycle</title>
<desc id="d">A cream pelican with a heavy orange pouch and a red scarf pedals a
teal bicycle along a coast road at sunset. Two fish ride in the basket behind the
saddle, the front lamp is lit, and the wheels, cranks, chain, legs and the road
itself all keep the same time.</desc>
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
        out = sys.argv[1] if len(sys.argv) > 1 else "pelican-on-a-bicycle.html"
        open(out, "w").write(document())
        print("wrote", out)

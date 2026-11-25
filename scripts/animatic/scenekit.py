"""Scene kit for the InThisTown animatic: blocky Minecraft-flat drawing on a 720x1280 canvas.

Everything is drawn in world units through a camera, supersampled 2x, with an additive
lightmap at quarter resolution so lava/glowstone read as light and not as paint.
"""
import math
import random

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFont

W, H = 720, 1280
S = 2                       # supersample
CW, CH = W * S, H * S
LW, LH = 180, 320           # lightmap cells (W/4, H/4)
LF = 4.0                    # lightmap divisor

FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
_fonts = {}


def font(size):
    size = max(6, int(size))
    f = _fonts.get(size)
    if f is None:
        f = ImageFont.truetype(FONT_PATH, size)
        _fonts[size] = f
    return f


def clamp(v, a=0, b=255):
    return a if v < a else b if v > b else v


def mix(a, b, t):
    t = 0.0 if t < 0 else 1.0 if t > 1 else t
    return (int(clamp(a[0] + (b[0] - a[0]) * t)), int(clamp(a[1] + (b[1] - a[1]) * t)),
            int(clamp(a[2] + (b[2] - a[2]) * t)))


def shade(c, k):
    return (int(clamp(c[0] * k)), int(clamp(c[1] * k)), int(clamp(c[2] * k)))


def ease(t):
    return t * t * (3 - 2 * t)


def ease_out(t):
    return 1 - (1 - t) ** 2.6


def ease_in(t):
    return t ** 2.6


# ---------------------------------------------------------------- palettes

NET = dict(
    sky_top=(20, 6, 10),
    sky_mid=(74, 18, 25),
    sky_low=(150, 48, 20),
    rack_a=(62, 27, 29),
    rack_b=(80, 36, 35),
    rack_c=(45, 18, 20),
    rack_d=(96, 46, 40),
    basalt=(40, 37, 44),
    black=(24, 22, 28),
    black_hi=(40, 38, 46),
    lava=(255, 236, 150),
    lava_mid=(255, 146, 32),
    lava_low=(196, 54, 8),
    glow=(255, 198, 104),
    glow_hot=(255, 246, 210),
    gold=(244, 196, 74),
    smoke=(38, 16, 18),
    bone=(226, 216, 198),
    iron=(120, 122, 130),
)

OVR = dict(
    sky_top=(5, 8, 22),
    sky_mid=(16, 28, 62),
    sky_low=(48, 66, 108),
    grass=(52, 104, 50),
    grass_dark=(32, 70, 34),
    dirt=(74, 54, 38),
    stone=(96, 96, 104),
    house=(52, 40, 34),
    roof=(96, 52, 40),
    window=(255, 214, 130),
    moon=(238, 240, 226),
)

KID = dict(skin=(230, 186, 146), skin_d=(196, 150, 114), shirt=(46, 158, 166),
           shirt_d=(28, 118, 128), legs=(48, 66, 104), legs_d=(34, 48, 78),
           hair=(56, 36, 24), shoe=(56, 44, 42))
MUM = dict(skin=(222, 172, 132), skin_d=(186, 136, 100), shirt=(150, 74, 96),
           shirt_d=(114, 50, 72), legs=(70, 48, 58), legs_d=(50, 34, 42),
           hair=(76, 40, 28), shoe=(46, 36, 34))
DAD = dict(skin=(214, 168, 128), skin_d=(180, 132, 96), shirt=(104, 112, 62),
           shirt_d=(78, 84, 44), legs=(62, 58, 46), legs_d=(44, 42, 34),
           hair=(44, 30, 22), shoe=(44, 36, 34))
WICK = dict(skin=(206, 190, 168), skin_d=(172, 156, 136), shirt=(84, 76, 96),
            shirt_d=(60, 54, 72), legs=(58, 52, 66), legs_d=(42, 38, 50),
            hair=(214, 212, 204), shoe=(52, 46, 50))
BAKER = dict(skin=(228, 180, 140), skin_d=(192, 144, 108), shirt=(232, 226, 214),
             shirt_d=(190, 184, 172), legs=(90, 78, 66), legs_d=(66, 56, 48),
             hair=(70, 46, 30), shoe=(50, 42, 40))
CROWD = [
    dict(skin=(216, 172, 132), skin_d=(180, 136, 100), shirt=(96, 74, 106),
         shirt_d=(72, 54, 80), legs=(58, 50, 46), legs_d=(42, 36, 34),
         hair=(50, 36, 26), shoe=(44, 38, 34)),
    dict(skin=(198, 156, 120), skin_d=(164, 124, 90), shirt=(120, 96, 66),
         shirt_d=(92, 72, 48), legs=(52, 48, 44), legs_d=(38, 34, 32),
         hair=(64, 44, 30), shoe=(42, 36, 32)),
    dict(skin=(228, 186, 148), skin_d=(192, 150, 112), shirt=(74, 92, 108),
         shirt_d=(54, 70, 84), legs=(60, 54, 50), legs_d=(44, 40, 36),
         hair=(36, 28, 22), shoe=(46, 40, 36)),
    dict(skin=(186, 146, 112), skin_d=(154, 118, 86), shirt=(104, 84, 92),
         shirt_d=(78, 62, 70), legs=(50, 46, 44), legs_d=(36, 34, 32),
         hair=(74, 52, 34), shoe=(40, 34, 32)),
]


# ---------------------------------------------------------------- camera + scene

class Cam:
    def __init__(self, x=0.0, y=0.0, z=1.0):
        self.x, self.y, self.z = float(x), float(y), float(z)

    def project(self, x, y):
        return (((x - self.x) * self.z + W * 0.5) * S,
                ((y - self.y) * self.z + H * 0.5) * S)


def cam_at(*keys):
    """keys: (u, x, y, z) tuples, linearly interpolated."""
    def f(u):
        if u <= keys[0][0]:
            return Cam(keys[0][1], keys[0][2], keys[0][3])
        for a, b in zip(keys, keys[1:]):
            if u <= b[0]:
                k = (u - a[0]) / max(1e-6, b[0] - a[0])
                k = ease(k)
                return Cam(a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k, a[3] + (b[3] - a[3]) * k)
        return Cam(keys[-1][1], keys[-1][2], keys[-1][3])
    return f


class Scene:
    def __init__(self, img, draw, light, ld, cam):
        self.img = img
        self.d = draw
        self.light = light
        self.ld = ld
        self.cam = cam

    # -- projection
    def P(self, x, y):
        return self.cam.project(x, y)

    def sx(self, w):
        return w * self.cam.z * S

    # -- primitives (world coords)
    def rect(self, x, y, w, h, col):
        x0, y0 = self.P(x, y)
        x1, y1 = self.P(x + w, y + h)
        if x1 < 0 or x0 > CW or y1 < 0 or y0 > CH:
            return
        self.d.rectangle([x0, y0, x1 - 1, y1 - 1], fill=col)

    def rects(self, x, y, w, h, col):
        self.rect(x, y, w, h, col)

    def poly(self, pts, col):
        p = [self.P(x, y) for x, y in pts]
        self.d.polygon(p, fill=col)

    def line(self, pts, col, wid=2):
        p = [self.P(x, y) for x, y in pts]
        self.d.line(p, fill=col, width=max(1, int(wid * self.cam.z * S)), joint="curve")

    def circle(self, x, y, r, col):
        cx, cy = self.P(x, y)
        r *= self.cam.z * S
        if cx + r < 0 or cx - r > CW or cy + r < 0 or cy - r > CH:
            return
        self.d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)

    def ellipse(self, x, y, rx, ry, col):
        cx, cy = self.P(x, y)
        rx *= self.cam.z * S
        ry *= self.cam.z * S
        self.d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=col)

    def glow(self, x, y, r, col, k=1.0):
        sx, sy = self.cam.project(x, y)
        sx /= LF
        sy /= LF
        rr = r * self.cam.z * S / LF
        if sx + rr < 0 or sx - rr > LW or sy + rr < 0 or sy - rr > LH:
            return
        k = min(1.0, k) * 0.55
        c = shade(col, k)
        # three nested ellipses approximate a soft falloff
        for f, kk in ((1.0, 0.45), (0.62, 0.75), (0.32, 1.0)):
            cc = shade(c, kk)
            r2 = rr * f
            self.ld.ellipse([sx - r2, sy - r2 * 0.85, sx + r2, sy + r2 * 0.85], fill=cc)

    # -- text in world coords
    def text(self, x, y, s, size, col, anchor="mm"):
        px, py = self.P(x, y)
        self.d.text((px, py), s, font=font(size * self.cam.z * S), fill=col, anchor=anchor)

    def text_screen(self, x, y, s, size, col, anchor="mm"):
        self.d.text((x * S, y * S), s, font=font(size * S), fill=col, anchor=anchor)

    # -- shading helpers
    def seg(self, x1, y1, x2, y2, wid, col):
        self.line([(x1, y1), (x2, y2)], col, wid)


def backdrops():
    """vertical gradient columns, cached at full res"""
    cache = {}

    def grad(name, top, mid, low, split=0.45):
        key = (name, top, mid, low, split)
        if key in cache:
            return cache[key]
        col = np.zeros((CH, 3), dtype=np.uint8)
        ys = np.linspace(0, 1, CH)
        for i, v in enumerate(ys):
            if v < split:
                c = mix(top, mid, v / split)
            else:
                c = mix(mid, low, (v - split) / (1 - split))
            col[i] = c
        im = Image.fromarray(np.repeat(col[:, None, :], CW, axis=1))
        cache[key] = im
        return im
    return grad


grad = backdrops()


def vignette():
    y = np.linspace(-1, 1, CH)[:, None]
    x = np.linspace(-1, 1, CW)[None, :]
    r = np.sqrt((x * 0.82) ** 2 + (y * 0.62) ** 2)
    k = np.clip(1.02 - 0.42 * r ** 2.1, 0.32, 1.0)
    a = np.repeat((k * 255)[:, :, None], 3, axis=2).astype(np.uint8)
    return Image.fromarray(a)


VIG = vignette()


def post(img, light):
    li = light.resize((CW, CH), Image.BICUBIC)
    img = ImageChops.add(img, li)
    img = ImageChops.multiply(img, VIG)
    small = img.resize((W, H), Image.LANCZOS)
    return small


def smoke(sc, t, y0, y1, col, n=7, seed=3, alpha=1.0, sp=26):
    rnd = random.Random(seed)
    for i in range(n):
        bx = rnd.uniform(-900, 900)
        by = rnd.uniform(y0, y1)
        r = rnd.uniform(36, 110)
        drift = (t * sp * rnd.uniform(0.4, 1.4) + bx) % 2000 - 1000
        c = shade(col, rnd.uniform(0.7, 1.15) * alpha)
        sc.ellipse(drift, by, r, r * 0.45, c)


# ---------------------------------------------------------------- blocks

def rack(sc, x, y, w, h, t=0, col=None, seed=1, block=40, noise=True):
    """netherrack slab with block texture"""
    base = col or NET["rack_a"]
    sc.rect(x, y, w, h, base)
    if not noise:
        return
    rnd = random.Random(seed)
    bw = block
    cols = max(1, int(w / bw))
    rows = max(1, int(h / bw))
    step = 1 if cols * rows <= 900 else 2
    for cy in range(0, rows, step):
        for cx in range(0, cols, step):
            k = rnd.choice([-0.15, -0.08, 0.05, 0.1, 0.02])
            sc.rect(x + cx * bw + 1, y + cy * bw + 1, bw * step - 2, bw * step - 2, shade(base, 1 + k))


def glowblock(sc, x, y, s, t=0, pulse=0.0):
    k = 1.0 + pulse * math.sin(t * 2.4)
    sc.rect(x, y, s, s, shade(NET["glow"], 0.86))
    sc.rect(x + s * 0.12, y + s * 0.12, s * 0.76, s * 0.76, NET["glow_hot"])
    sc.rect(x + s * 0.3, y + s * 0.3, s * 0.4, s * 0.4, (255, 252, 236))
    sc.glow(x + s / 2, y + s / 2, s * 2.6 * k, NET["glow"], 0.5)


def lava(sc, x, y, w, h, t, bright=1.0, glow_k=1.0):
    """molten surface: wavy horizontal bands of hot crust"""
    sc.rect(x, y, w, h, shade(NET["lava_low"], bright))
    bands = max(4, int(h / 22))
    for i in range(bands):
        f = i / bands
        yy = y + 4 + f * (h - 8)
        amp = 3.5 + 2.0 * math.sin(i * 1.3)
        pts_top, pts_bot = [], []
        for k in range(0, 33):
            kk = k / 32.0
            xx = x + w * kk
            ph = t * 2.0 + i * 1.9 + kk * 5.0
            pts_top.append((xx, yy + math.sin(ph) * amp))
            pts_bot.append((xx, yy + h / bands * 1.15 + math.sin(ph + 1.1) * amp))
        col = mix(NET["lava_mid"], NET["lava"], (1 - f) ** 1.6) if i % 2 == 0 else \
              mix(NET["lava_low"], NET["lava_mid"], 0.85)
        sc.poly(pts_top + pts_bot[::-1], shade(col, bright))
    sc.glow(x + w / 2, y + h * 0.45, max(w, h) * 0.55, NET["lava_mid"], 0.55 * glow_k)
    sc.glow(x + w / 2, y + h * 0.4, max(w, h) * 0.28, NET["lava"], 0.6 * glow_k)


def bubble(sc, x, y, r, t, ph=0.0):
    k = (t * 1.3 + ph) % 1.0
    rr = r * math.sin(k * math.pi)
    sc.circle(x, y - k * r * 2.2, rr * 0.8, NET["lava"])
    sc.glow(x, y - k * r * 2.2, rr * 3.5, NET["lava_mid"], 0.6)


# ---------------------------------------------------------------- characters

def dim(c, k):
    d = dict(c)
    for key in ("skin", "skin_d", "shirt", "shirt_d", "legs", "legs_d", "hair", "shoe"):
        if key in d:
            d[key] = shade(d[key], k)
    return d


def person(sc, x, y, h, c, t=0.0, pose="stand", face=1, walk=0.0, arm_l=None, arm_r=None,
           rim=None, rimk=1.0, lean=0.0):
    """Blocky figure, feet at (x,y). h = total height in world units. face=+-1."""
    if pose == "lie":
        return person_lie(sc, x, y, h, c, t, face)
    if pose == "sit":
        return person_sit(sc, x, y, h, c, t)

    hd = h * 0.30
    body = h * 0.36
    leg = h * 0.34
    w = h * 0.34
    by = y - leg
    ty = by - body
    hy = ty - hd
    sw = w * 0.30

    swing = math.sin(walk) * (h * 0.10) if walk else 0.0

    # shadow on the floor
    sc.ellipse(x, y + h * 0.01, w * 0.62, h * 0.045, (0, 0, 0) if False else (26, 12, 12))

    # legs
    sc.line([(x - w * 0.20, by), (x - w * 0.20 + swing, y)], c["legs_d"], sw)
    sc.line([(x + w * 0.20, by), (x + w * 0.20 - swing, y)], c["legs"], sw)
    sc.rect(x - w * 0.30, y - h * 0.03, w * 0.26, h * 0.03, c["shoe"])
    sc.rect(x + w * 0.04, y - h * 0.03, w * 0.26, h * 0.03, c["shoe"])

    # torso
    sc.rect(x - w / 2, ty, w, body, c["shirt"])
    sc.rect(x - w / 2, ty, w * 0.32, body, c["shirt_d"])
    sc.rect(x + w / 2 - w * 0.08, ty, w * 0.08, body, shade(c["shirt"], 1.25))

    # arms
    al = arm_l if arm_l is not None else (x - w * 0.52, by + h * 0.02)
    ar = arm_r if arm_r is not None else (x + w * 0.52, by + h * 0.02)
    sc.line([(x - w * 0.36, ty + body * 0.12), al], c["shirt_d"], sw)
    sc.line([(x + w * 0.36, ty + body * 0.12), ar], c["shirt"], sw)
    sc.circle(al[0], al[1], sw * 0.62, c["skin_d"])
    sc.circle(ar[0], ar[1], sw * 0.62, c["skin"])

    # head
    sc.rect(x - w * 0.44, hy, w * 0.88, hd, c["skin"])
    sc.rect(x - w * 0.44, hy, w * 0.26, hd, c["skin_d"])
    sc.rect(x - w * 0.46, hy - hd * 0.10, w * 0.92, hd * 0.44, c["hair"])
    ey = hy + hd * 0.56
    ex = w * 0.17
    sc.rect(x - ex - w * 0.07 + face * w * 0.03, ey, w * 0.11, hd * 0.16, (34, 26, 28))
    sc.rect(x + ex - w * 0.07 + face * w * 0.03, ey, w * 0.11, hd * 0.16, (34, 26, 28))

    if rim:
        r = shade(rim, rimk)
        sc.rect(x - w * 0.46, hy - hd * 0.10, w * 0.92, h * 0.012, r)
        sc.rect(x + w * 0.44, hy, w * 0.02, hd, shade(r, 0.8))
        sc.rect(x - w * 0.5, ty, w, h * 0.011, shade(r, 0.9))
        sc.rect(x + w * 0.5 - w * 0.02, ty, w * 0.02, body, shade(r, 0.7))
    return (x, ty, hy, w, hd)


def person_lie(sc, x, y, h, c, t=0.0, face=1, lift=0.0, rim=None, rimk=1.0):
    """on his back: feet at x, head at x+face*h*0.58"""
    hd = h * 0.26
    body = h * 0.36
    leg = h * 0.38
    t_ = h * 0.30
    cy = y - h * 0.10 - lift
    hx = x + face * (leg + body)

    # legs
    sc.rect(min(x, x + face * leg), cy - t_ * 0.20, leg, t_ * 0.40, c["legs"])
    sc.rect(min(x, x + face * leg), cy - t_ * 0.20, leg * 0.3, t_ * 0.40, c["legs_d"])
    sc.rect(min(x, x + face * leg), cy - t_ * 0.20, leg, t_ * 0.10, shade(c["legs"], 1.2))
    # torso
    sc.rect(min(hx - face * body, hx), cy - t_ * 0.26, body, t_ * 0.52, c["shirt"])
    sc.rect(min(hx - face * body, hx), cy + t_ * 0.14, body, t_ * 0.12, shade(c["shirt"], 1.18))
    # folded arms
    sc.rect(min(hx - face * body * 0.55, hx), cy - t_ * 0.34, body * 0.65, t_ * 0.12, c["skin"])
    # head
    sc.rect(min(hx, hx + face * hd), cy - t_ * 0.5, hd, t_ * 0.98, c["skin"])
    sc.rect(min(hx, hx + face * hd), cy + t_ * 0.2, hd, t_ * 0.28, c["skin_d"])
    sc.rect(min(hx, hx + face * hd), cy - t_ * 0.5, hd * 0.34, t_ * 0.98, c["hair"])
    # eyes up to us
    ey = cy - t_ * 0.16
    sc.rect(min(hx + face * hd * 0.6, hx + face * hd * 0.85), ey, hd * 0.2, t_ * 0.11, (34, 26, 28))
    sc.rect(min(hx + face * hd * 0.2, hx + face * hd * 0.45), ey, hd * 0.2, t_ * 0.11, (34, 26, 28))
    if rim:
        r = shade(rim, rimk)
        sc.rect(min(hx, hx + face * hd), cy - t_ * 0.5, hd, h * 0.008, r)
        sc.rect(min(hx - face * body, hx), cy - t_ * 0.26, body, h * 0.008, shade(r, 0.85))
    return cy


def person_sit(sc, x, y, h, c, t=0.0):
    hd = h * 0.26
    body = h * 0.38
    w = h * 0.30
    cy = y - h * 0.22
    sc.rect(x - w * 0.5, y - h * 0.14, w, h * 0.14, c["legs"])
    sc.rect(x - w * 0.5, y - h * 0.42, w, body * 0.86, c["shirt"])
    sc.rect(x - w * 0.5, y - h * 0.42, w * 0.34, body * 0.86, c["shirt_d"])
    sc.rect(x - w * 0.44, y - h * 0.42 - hd, w * 0.88, hd, c["skin"])
    sc.rect(x - w * 0.44, y - h * 0.42 - hd, w * 0.24, hd, c["skin_d"])
    sc.rect(x - w * 0.46, y - h * 0.42 - hd * 1.12, w * 0.92, hd * 0.46, c["hair"])
    ey = y - h * 0.42 - hd * 0.42
    sc.rect(x - w * 0.2, ey, w * 0.12, hd * 0.13, (30, 26, 30))
    sc.rect(x + w * 0.08, ey, w * 0.12, hd * 0.13, (30, 26, 30))
    return (x - w * 0.44, y - h * 0.42 - hd, w * 0.88, hd)


def bucket(sc, x, y, s, t=0.0, fill=True):
    sc.poly([(x - s * 0.5, y), (x + s * 0.5, y), (x + s * 0.38, y + s * 1.1),
             (x - s * 0.38, y + s * 1.1)], (128, 132, 140))
    sc.poly([(x - s * 0.5, y), (x + s * 0.5, y), (x + s * 0.48, y + s * 0.28),
             (x - s * 0.48, y + s * 0.28)], (156, 160, 168))
    if fill:
        k = 0.9 + 0.1 * math.sin(t * 3)
        sc.poly([(x - s * 0.44, y + s * 0.05), (x + s * 0.44, y + s * 0.05),
                 (x + s * 0.36, y + s * 0.26), (x - s * 0.36, y + s * 0.26)],
                shade(NET["lava_mid"], k))
        sc.glow(x, y + s * 0.15, s * 1.9, NET["lava_mid"], 0.75)


def mushroom(sc, x, y, s, hue=(150, 72, 62), t=0.0):
    sc.rect(x - s * 0.12, y - s * 0.9, s * 0.24, s * 0.9, (210, 196, 176))
    sc.ellipse(x, y - s * 0.95, s * 0.55, s * 0.3, hue)
    sc.ellipse(x - s * 0.12, y - s * 0.99, s * 0.16, s * 0.1, shade(hue, 1.35))
    sc.rect(x - s * 0.06, y - s * 0.45, s * 0.12, s * 0.08, shade(hue, 0.7))


def bell(sc, x, y, s, t=0.0, ring=0.0):
    ang = math.sin(t * 9) * ring * 0.18
    cx = x + math.sin(ang) * s * 0.1
    sc.poly([(cx - s * 0.55, y), (cx + s * 0.55, y), (cx + s * 0.34, y - s * 0.9),
             (cx - s * 0.34, y - s * 0.9)], (186, 146, 66))
    sc.poly([(cx - s * 0.55, y), (cx + s * 0.02, y), (cx + s * 0.02, y - s * 0.9),
             (cx - s * 0.34, y - s * 0.9)], (214, 176, 84))
    sc.rect(cx - s * 0.36, y - s * 1.05, s * 0.72, s * 0.16, (150, 114, 52))
    sc.rect(cx - s * 0.1, y - s * 1.3, s * 0.2, s * 0.28, (110, 88, 44))
    sc.circle(cx, y + s * 0.06, s * 0.13, (120, 96, 44))


def bedpiece(sc, x, y, w, h, burnt=0.0, blanket=(196, 58, 52), t=0.0, glow_k=0.0):
    """bed seen from the side: legs, frame, blanket, pillow"""
    fr = mix((150, 112, 66), (56, 40, 34), burnt)
    sc.rect(x, y - h * 0.16, w, h * 0.16, fr)
    sc.rect(x + w * 0.02, y, w * 0.06, h * 0.22, shade(fr, 0.8))
    sc.rect(x + w * 0.9, y, w * 0.06, h * 0.22, shade(fr, 0.8))
    bl = mix(blanket, (48, 30, 30), burnt)
    sc.rect(x + w * 0.03, y - h * 0.34, w * 0.94, h * 0.2, bl)
    sc.rect(x + w * 0.03, y - h * 0.34, w * 0.94, h * 0.06, shade(bl, 1.2))
    sc.rect(x + w * 0.72, y - h * 0.52, w * 0.22, h * 0.18, mix((228, 224, 208), (66, 56, 50), burnt))
    if burnt > 0:
        rnd = random.Random(9)
        for i in range(7):
            bx = x + rnd.uniform(0.06, 0.9) * w
            sc.ellipse(bx, y - h * (0.2 + rnd.uniform(0, 0.2)), w * 0.05, h * 0.05, (26, 20, 20))
    if glow_k:
        sc.glow(x + w / 2, y - h * 0.3, w * 0.5, (255, 140, 60), glow_k)


def portal_frame(sc, x, y, w, h, lit=0.0, t=0.0):
    """black stone frame with gold flecks; lit>0 shows purple"""
    bw = w * 0.13
    col = NET["black"]
    sc.rect(x, y, w, bw, col)
    sc.rect(x, y + h - bw, w, bw, col)
    sc.rect(x, y, bw, h, col)
    sc.rect(x + w - bw, y, bw, h, col)
    rnd = random.Random(21)
    for i in range(14):
        gx = x + rnd.uniform(0, 1) * w
        gy = y + rnd.choice([0, 1]) * (h - bw) + rnd.uniform(0, bw * 0.7)
        sc.rect(gx, gy, bw * 0.22, bw * 0.18, NET["gold"])
    for i in range(8):
        gx = x + rnd.choice([0, 1]) * (w - bw) + rnd.uniform(0, bw * 0.6)
        gy = y + rnd.uniform(0.1, 0.9) * h
        sc.rect(gx, gy, bw * 0.2, bw * 0.16, shade(NET["gold"], 0.85))
    if lit > 0:
        for i in range(4):
            k = (t * 0.5 + i * 0.25) % 1.0
            c = mix((120, 40, 150), (210, 150, 255), k)
            sc.rect(x + bw, y + bw, w - 2 * bw, h - 2 * bw, shade(c, 0.5 + 0.5 * lit))
        sc.glow(x + w / 2, y + h / 2, w * 0.9, (150, 70, 200), 0.9 * lit)


def chain(sc, x1, y1, x2, y2, n=6, col=NET["iron"]):
    for i in range(n):
        k = i / max(1, n - 1)
        cx = x1 + (x2 - x1) * k
        cy = y1 + (y2 - y1) * k + math.sin(k * 3.1) * 8
        sc.ellipse(cx, cy, 7, 5, col)


def chalk_marks(sc, x, y, n, w=6, h=26, gap=9, col=(226, 220, 206), per_row=14):
    for i in range(n):
        row = i // per_row
        col_i = i % per_row
        mx = x + col_i * (w + gap)
        my = y + row * (h + 8)
        sc.rect(mx, my, w, h, shade(col, 0.92 + 0.08 * ((i * 7) % 3)))


def shed(sc, x, y, w, h, t=0.0, ruin=0.0, wobble=0.0):
    """wooden shed, side view; ruin 0..1"""
    wood = mix((124, 88, 58), (44, 34, 30), ruin)
    sc.rect(x, y - h, w, h, wood)
    for i in range(5):
        sc.rect(x + i * w / 5, y - h, 2, h, shade(wood, 0.82))
    sc.poly([(x - w * 0.08, y - h), (x + w * 1.08, y - h), (x + w * 0.5, y - h * 1.42)], mix((84, 52, 36), (30, 24, 22), ruin))
    sc.rect(x + w * 0.34, y - h * 0.62, w * 0.3, h * 0.62, mix((36, 28, 26), (20, 16, 16), ruin))
    if ruin < 0.6:
        sc.rect(x + w * 0.08, y - h * 0.8, w * 0.2, h * 0.26, (255, 196, 110))
        sc.glow(x + w * 0.18, y - h * 0.67, w * 0.35, (255, 190, 110), 0.6 * (1 - ruin))
    if ruin > 0.2:
        rnd = random.Random(4)
        for i in range(int(10 * ruin)):
            sc.rect(x + rnd.uniform(-w * 0.1, w * 1.1), y - h * rnd.uniform(0, 1), w * 0.1, h * 0.1,
                    (34, 26, 24))


def smoke_puff(sc, x, y, r, col, k=1.0):
    for i in range(3):
        sc.ellipse(x + i * r * 0.3, y - i * r * 0.2, r * (1 - i * 0.2), r * 0.8 * (1 - i * 0.2),
                   shade(col, k * (1 - i * 0.16)))


def crowd(sc, x0, x1, y, h, t, walk_speed=60.0, seed=2, n=None, face=1, look_down=False):
    rnd = random.Random(seed)
    n = n or max(3, int((x1 - x0) / 55))
    for i in range(n):
        bx = x0 + (x1 - x0) * (i + 0.5) / n + rnd.uniform(-14, 14)
        bx = x0 + ((bx - x0 + t * walk_speed * rnd.uniform(0.8, 1.2)) % (x1 - x0))
        c = CROWD[rnd.randrange(len(CROWD))]
        hh = h * rnd.uniform(0.92, 1.06)
        walk = t * 7 + i
        person(sc, bx, y, hh, c, t, "stand", face, walk=max(0.0, math.sin(walk)) * 0.6)
        if look_down:
            pass


def groundline(sc, y, col=NET["rack_c"]):
    sc.rect(-2000, y, 4000, 2000, col)

"""A tiny box renderer: Minecraft-shaped geometry, flat shading, lava lights.

No GPU, no browser: boxes -> faces -> painter's algorithm -> PIL polygons.
World axes: +X right, +Y up, +Z toward the viewer. One block = 1.0 unit.
"""
import math

import numpy as np
from PIL import Image, ImageChops, ImageDraw

import scenekit as K

W, H = 720, 1280
S = 2
CW, CH = W * S, H * S

# ---------------------------------------------------------------- palettes

NET = dict(
    rock=(74, 32, 32), rock2=(88, 40, 38), rock3=(58, 25, 26),
    floor=(86, 42, 40), floor2=(70, 32, 32),
    basalt=(44, 42, 52), black=(30, 27, 34),
    lava=(255, 170, 44), lava_hot=(255, 224, 128),
    glow=(214, 168, 86),
    gold=(240, 196, 76),
    wood=(126, 88, 54), wood_d=(96, 64, 40),
    cloth=(196, 58, 52), cloth_d=(150, 40, 40),
    iron=(120, 124, 132),
    bone=(226, 218, 200),
)

OVR = dict(
    grass=(64, 122, 58), grass2=(52, 104, 48), dirt=(92, 66, 44),
    trunk=(88, 62, 40), leaf=(48, 104, 52), stone=(120, 120, 126),
    wall=(184, 168, 148), roof=(140, 72, 56), window=(255, 216, 140),
)

SKIN = (232, 188, 148)
SKIN_D = (198, 154, 120)

KID = dict(skin=SKIN, shirt=(52, 168, 176), pants=(52, 70, 108), hair=(60, 40, 26),
           shoe=(58, 46, 44))
MUM = dict(skin=(226, 176, 138), shirt=(156, 78, 100), pants=(74, 52, 62),
           hair=(84, 46, 32), shoe=(48, 38, 36))
DAD = dict(skin=(218, 172, 132), shirt=(108, 118, 66), pants=(66, 60, 48),
           hair=(48, 32, 24), shoe=(46, 38, 34))
WICK = dict(skin=(210, 194, 174), shirt=(88, 80, 100), pants=(60, 54, 68),
            hair=(216, 214, 206), shoe=(52, 48, 52))
BAKER = dict(skin=(232, 184, 144), shirt=(234, 228, 216), pants=(94, 82, 70),
             hair=(74, 48, 32), shoe=(52, 44, 42))
CROWD = [
    dict(skin=(220, 176, 136), shirt=(100, 78, 110), pants=(62, 54, 50), hair=(52, 38, 28),
         shoe=(46, 40, 36)),
    dict(skin=(202, 160, 124), shirt=(124, 100, 70), pants=(56, 52, 48), hair=(66, 46, 32),
         shoe=(44, 38, 34)),
    dict(skin=(232, 190, 152), shirt=(78, 96, 112), pants=(64, 58, 54), hair=(38, 30, 24),
         shoe=(48, 42, 38)),
    dict(skin=(190, 150, 116), shirt=(108, 88, 96), pants=(54, 50, 48), hair=(76, 54, 36),
         shoe=(42, 36, 34)),
]


def rot_y(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]], float)


def rot_x(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[1, 0, 0], [0, c, -s], [0, s, c]], float)


def rot_z(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]], float)


def mix(a, b, t):
    t = 0.0 if t < 0 else 1.0 if t > 1 else t
    return (int(a[0] + (b[0] - a[0]) * t), int(a[1] + (b[1] - a[1]) * t),
            int(a[2] + (b[2] - a[2]) * t))


def shade(c, k):
    return (min(255, max(0, int(c[0] * k))), min(255, max(0, int(c[1] * k))),
            min(255, max(0, int(c[2] * k))))


class Cam:
    def __init__(self, pos, target, fov=56.0, roll=0.0):
        self.pos = np.array(pos, float)
        f = np.array(target, float) - self.pos
        f /= np.linalg.norm(f)
        up = np.array([0.0, 1.0, 0.0])
        if abs(float(np.dot(f, up))) > 0.999:
            up = np.array([0.0, 0.0, -1.0])
        r = np.cross(f, up)
        r /= np.linalg.norm(r)
        u = np.cross(r, f)
        if roll:
            c, s = math.cos(roll), math.sin(roll)
            r, u = r * c + u * s, u * c - r * s
        self.fwd, self.right, self.up = f, r, u
        self.f = (H * 0.5) / math.tan(math.radians(fov) * 0.5) * S
        self.cx, self.cy = CW * 0.5, CH * 0.5

    def view(self, p):
        d = p - self.pos
        return np.array([float(np.dot(d, self.right)), float(np.dot(d, self.up)),
                         float(np.dot(d, self.fwd))])

    def project(self, p):
        v = self.view(p)
        z = v[2]
        if z < 0.05:
            return None
        return (self.cx + v[0] * self.f / z, self.cy - v[1] * self.f / z)


class Light:
    def __init__(self, pos, color=(255, 168, 76), k=1.0, r=6.0):
        self.pos = np.array(pos, float)
        self.color = color
        self.k = k
        self.r = r


class Scene:
    def __init__(self, cam, lights=None, sun=0.42, ambient=0.44, lightmap=None, ld=None):
        self.cam = cam
        self.lights = lights or []
        self.sun = sun
        self.ambient = ambient
        self.faces = []
        self.glow = []          # (world pos, radius, color, k)
        self.lightmap = lightmap
        self.ld = ld
        self.sun_dir = np.array([0.35, 0.86, 0.38])
        self.sun_dir /= np.linalg.norm(self.sun_dir)

    # ---------------------------------------------------------- lighting
    def _intensity(self, p, n):
        v = np.array(self.cam.pos) - p
        v /= max(1e-6, np.linalg.norm(v))
        i = self.ambient + self.sun * max(0.0, float(np.dot(n, self.sun_dir)))
        for L in self.lights:
            d = L.pos - p
            dist = float(np.linalg.norm(d))
            if dist < 1e-4:
                continue
            lam = max(0.0, float(np.dot(n, d / dist)))
            fall = 1.0 / (1.0 + (dist / L.r) ** 2)
            i += L.k * lam * fall
        return i

    def box(self, center, size, col, rot=None, emissive=0.0, cull=True, ground_shadow=False):
        c = np.array(center, float)
        s = np.array(size, float) * 0.5
        if rot is None:
            corners = []
            for dz in (-1, 1):
                for dy in (-1, 1):
                    for dx in (-1, 1):
                        corners.append(c + np.array([dx * s[0], dy * s[1], dz * s[2]]))
            corners = np.array(corners)
        else:
            base = np.array([[dx * s[0], dy * s[1], dz * s[2]]
                             for dz in (-1, 1) for dy in (-1, 1) for dx in (-1, 1)])
            corners = (base @ np.array(rot).T) + c
        # index: 0(-x,-y,-z) 1(+x,-y,-z) 2(-x,+y,-z) 3(+x,+y,-z)
        #        4(-x,-y,+z) 5(+x,-y,+z) 6(-x,+y,+z) 7(+x,+y,+z)
        F = [(0, 1, 3, 2, (0, 0, -1)), (5, 4, 6, 7, (0, 0, 1)),
             (4, 0, 2, 6, (-1, 0, 0)), (1, 5, 7, 3, (1, 0, 0)),
             (2, 3, 7, 6, (0, 1, 0)), (4, 5, 1, 0, (0, -1, 0))]
        R = np.array(rot) if rot is not None else None
        for (a, b, d_, e_, nrm) in F:
            n = np.array(nrm, float)
            if R is not None:
                n = R @ n
            pts = [corners[a], corners[b], corners[d_], corners[e_]]
            cen = (pts[0] + pts[1] + pts[2] + pts[3]) / 4.0
            if cull:
                to_cam = np.array(self.cam.pos) - cen
                if float(np.dot(n, to_cam)) <= 0:
                    continue
            if emissive >= 1.0:
                cc = shade(col, 1.0)
            else:
                k = self._intensity(cen, n)
                k = self.ambient * 0.6 + k * 0.9
                cc = shade(col, min(2.6, k))
                if emissive > 0:
                    cc = mix(cc, col, emissive)
            self._poly(pts, cc)

    def _poly(self, pts, col):
        self.faces.append((tuple(float(v) for v in pts[0]), tuple(float(v) for v in pts[1]),
                          tuple(float(v) for v in pts[2]), tuple(float(v) for v in pts[3]), col))

    def add_glow(self, p, r, col, k=1.0):
        self.glow.append((np.array(p, float), r, col, k))

    # ---------------------------------------------------------- output
    def dolly(self, k):
        self.cam.pos = self.cam.pos + self.cam.fwd * float(k)

    def draw(self, img):
        d = ImageDraw.Draw(img)
        cam = self.cam
        out = []
        for (p0, p1, p2, p3, col) in self.faces:
            vs = []
            ok = True
            for p in (p0, p1, p2, p3):
                v = cam.view(np.array(p))
                if v[2] < 0.08:
                    ok = False
                    break
                vs.append((cam.cx + v[0] * cam.f / v[2], cam.cy - v[1] * cam.f / v[2], v[2]))
            if not ok:
                continue
            xs = [v[0] for v in vs]
            ys = [v[1] for v in vs]
            if max(xs) < -4 or min(xs) > CW + 4 or max(ys) < -4 or min(ys) > CH + 4:
                continue
            depth = sum(v[2] for v in vs) / 4.0
            out.append((depth, [(v[0], v[1]) for v in vs], col))
        out.sort(key=lambda f: -f[0])
        for _d, pts, col in out:
            d.polygon(pts, fill=col)
        # glow onto the lightmap
        for (p, r, col, k) in self.glow:
            v = self.cam.view(p)
            if v[2] < 0.1:
                continue
            sx = (self.cam.cx + v[0] * self.cam.f / v[2]) / K.LF
            sy = (self.cam.cy - v[1] * self.cam.f / v[2]) / K.LF
            rr = r * self.cam.f / v[2] / K.LF
            if sx + rr < 0 or sx - rr > K.LW or sy + rr < 0 or sy - rr > K.LH:
                continue
            c = shade(col, min(1.0, k) * 0.5)
            for f, kk in ((1.0, 0.4), (0.6, 0.72), (0.3, 1.0)):
                cc = shade(c, kk)
                r2 = rr * f
                self.ld.ellipse([sx - r2, sy - r2, sx + r2, sy + r2 * 0.9], fill=cc)
        return img


# ---------------------------------------------------------------- builders

def blocks(sc, x0, y0, z0, nx, ny, nz, col, seed=1, var=0.1, size=1.0, skip=None):
    """a slab of unit blocks; skip(x,y,z) -> True to leave a hole"""
    rnd = np.random.RandomState(seed)
    for iy in range(ny):
        for iz in range(nz):
            for ix in range(nx):
                if skip and skip(ix, iy, iz):
                    continue
                k = 1.0 + rnd.uniform(-var, var)
                sc.box((x0 + ix * size + size / 2, y0 + iy * size + size / 2,
                        z0 + iz * size + size / 2),
                       (size, size, size), shade(col, k), cull=True)


def guy(sc, x, y, z, yaw=0.0, h=1.8, c=None, pose="stand", t=0.0, walk=0.0,
        arml=None, armr=None, head_pitch=0.0, sit=False):
    """Minecraft-proportioned figure: head .26h, torso .38h, legs .36h"""
    c = c or KID
    R = rot_y(yaw)
    hd = h * 0.26
    body = h * 0.38
    leg = h * 0.36
    w = h * 0.30
    hip = np.array([x, y + leg, z])
    base = np.array([x, y, z])

    def put(local, size, col, rot=None):
        p = hip + R @ np.array(local, float)
        sc.box(p, size, col, (R @ rot) if rot is not None else R)

    swing = math.sin(walk) * 0.5 if walk else 0.0
    # legs
    for side, sg in ((-1, 1), (1, -1)):
        a = swing * sg
        lx = side * w * 0.22
        piv = np.array([lx, 0, 0])
        rr = rot_x(-a)
        put((lx, -leg / 2, 0), (w * 0.34, leg, w * 0.36), c["pants"], rr)
        foot = rr @ np.array([0, -leg / 2, 0])
        put((lx + foot[0], -leg + foot[1] + 0.05, foot[2] + 0.06),
            (w * 0.36, h * 0.05, w * 0.44), c["shoe"], rr)
    # torso
    put((0, body / 2, 0), (w, body, w * 0.52), c["shirt"])
    put((0, body * 0.82, -w * 0.26), (w * 1.02, body * 0.2, w * 0.04), shade(c["shirt"], 0.9))
    # arms
    for side in (-1, 1):
        ang = None
        if side == -1:
            ang = arml
        else:
            ang = armr
        sh = np.array([side * w * 0.6, body, 0])
        a = math.sin(walk) * 0.4 * side if walk else 0.0
        if ang is not None:
            a = ang
        rr = rot_x(-a)
        limb_len = body * 1.0
        off = rr @ np.array([0, -limb_len / 2, 0])
        put((sh[0], sh[1] + off[1] - h * 0.02, sh[2] + off[2]),
            (w * 0.30, limb_len, w * 0.32), shade(c["shirt"], 0.86 if side < 0 else 0.72), rr)
        tip = sh + rr @ np.array([0, -limb_len, 0])
        put((tip[0], tip[1] - h * 0.02, tip[2]), (w * 0.30, h * 0.07, w * 0.32), c["skin"], rr)
    # head
    hp = rot_x(head_pitch)
    put((0, body + hd / 2, 0), (w * 0.92, hd, w * 0.9), c["skin"], hp)
    put((0, body + hd * 0.86, 0), (w * 0.96, hd * 0.34, w * 0.94), c["hair"], hp)
    # eyes
    for side in (-1, 1):
        put((side * w * 0.22, body + hd * 0.56, w * 0.47), (w * 0.17, hd * 0.18, 0.04),
            (36, 28, 30), None)
    return hip


def guy_lie(sc, x, y, z, yaw=0.0, h=1.8, c=None, t=0.0, pitch=0.0):
    """lying on his back: head toward +X, feet toward -X, so a front camera reads him side-on"""
    c = c or KID
    R = rot_y(yaw + 1.5707963)
    w = h * 0.30
    hd = h * 0.26
    body = h * 0.38
    leg = h * 0.36

    def put(local, size, col, rot=None):
        p = np.array([x, y, z], float) + R @ np.array(local, float)
        sc.box(p, size, col, (R @ rot) if rot is not None else R)

    # torso
    put((0, w * 0.22, 0.0), (w * 0.94, w * 0.44, body), c["shirt"])
    put((0, w * 0.46, 0.0), (w * 0.62, w * 0.06, body * 0.9), shade(c["shirt"], 1.16))
    # legs, apart
    for side in (-1, 1):
        put((side * w * 0.26, w * 0.20, -(leg / 2) - body * 0.05),
            (w * 0.34, w * 0.40, leg), c["pants"])
        put((side * w * 0.26, w * 0.22, -leg - body * 0.05),
            (w * 0.36, w * 0.34, h * 0.06), c["shoe"])
    # arms out to the sides
    for side in (-1, 1):
        put((side * (w * 0.47 + w * 0.3), w * 0.18, body * 0.28),
            (w * 0.62, w * 0.30, w * 0.30), c["skin"])
    # head, face up
    put((0, w * 0.26, body / 2 + hd / 2), (w * 0.92, w * 0.92, hd), c["skin"])
    put((0, w * 0.26, body / 2 + hd * 0.86), (w * 0.96, w * 0.96, hd * 0.34), c["hair"])
    # eyes on the top face so the camera reads them from above
    for side in (-1, 1):
        put((side * w * 0.22, w * 0.73, body / 2 + hd * 0.52),
            (w * 0.19, 0.03, hd * 0.22), (36, 28, 30))


def guy_sit(sc, x, y, z, yaw=0.0, h=1.8, c=None, t=0.0):
    c = c or WICK
    R = rot_y(yaw)
    hd = h * 0.26
    body = h * 0.38
    w = h * 0.30

    def put(local, size, col, rot=None):
        p = np.array([x, y, z], float) + R @ np.array(local, float)
        sc.box(p, size, col, (R @ rot) if rot is not None else R)

    put((0, w * 0.2, 0), (w * 1.5, w * 0.4, body * 0.9), c["pants"])
    put((0, w * 0.4 + body / 2, body * 0.1), (w, body, w * 0.52), c["shirt"])
    for side in (-1, 1):
        put((side * w * 0.6, w * 0.4 + body * 0.6, 0), (w * 0.3, body * 0.9, w * 0.32), c["shirt"])
    put((0, w * 0.4 + body + hd / 2, body * 0.14), (w * 0.92, hd, w * 0.9), c["skin"])
    put((0, w * 0.4 + body + hd * 0.86, body * 0.14), (w * 0.96, hd * 0.34, w * 0.94), c["hair"])
    for side in (-1, 1):
        put((side * w * 0.22, w * 0.4 + body + hd * 0.58, body * 0.14 + w * 0.44),
            (w * 0.16, hd * 0.16, 0.02), (36, 28, 30))


# ---------------------------------------------------------------- props

def bucket(sc, x, y, z, s=0.42, t=0.0, lava_col=NET["lava"]):
    sc.box((x, y + s / 2, z), (s, s, s), (128, 132, 140))
    sc.box((x, y + s * 0.94, z), (s * 1.06, s * 0.16, s * 1.06), (150, 154, 162))
    sc.box((x, y + s * 1.02, z), (s * 0.82, s * 0.1, s * 0.82), lava_col, emissive=0.7)
    sc.add_glow((x, y + s * 1.1, z), s * 3.2, lava_col, 0.8)


def mushroom(sc, x, y, z, s=0.5, cap=(158, 80, 68)):
    sc.box((x, y + s * 0.4, z), (s * 0.22, s * 0.8, s * 0.22), (208, 194, 174))
    sc.box((x, y + s * 0.86, z), (s * 0.9, s * 0.3, s * 0.9), cap)


def bed(sc, x, y, z, yaw=0.0, burnt=0.0, pillow=True):
    R = rot_y(yaw)
    wood = mix(NET["wood"], (52, 38, 30), burnt)
    cloth = mix(NET["cloth"], (56, 34, 34), burnt)

    def put(local, size, col, em=0.0):
        p = np.array([x, y, z], float) + R @ np.array(local, float)
        sc.box(p, size, col, R, emissive=em)

    put((0, 0.32, 0), (1.9, 0.22, 1.0), wood)
    for sx in (-1, 1):
        for sz in (-1, 1):
            put((sx * 0.82, 0.11, sz * 0.4), (0.16, 0.22, 0.16), shade(wood, 0.8))
    put((0, 0.52, 0.02), (1.84, 0.24, 0.94), cloth)
    put((0, 0.64, 0.02), (1.84, 0.06, 0.94), shade(cloth, 1.18))
    if pillow:
        put((0, 0.66, 0.34), (0.46, 0.16, 0.8), mix((230, 226, 210), (70, 58, 52), burnt))
    if burnt > 0.2:
        put((-0.5, 0.6, -0.1), (0.3, 0.2, 0.3), (30, 24, 24))
        put((0.55, 0.58, 0.2), (0.24, 0.18, 0.24), (30, 24, 24))


def bell(sc, x, y, z, s=0.8, t=0.0, ring=0.0):
    sway = math.sin(t * 10) * ring * 0.12
    R = rot_z(sway)
    sc.box((x, y + s * 0.9, z), (s * 0.5, s * 0.5, s * 0.5), (150, 118, 56), R)
    sc.box((x, y + s * 0.45, z), (s, s * 0.5, s), (186, 148, 70), R)
    sc.box((x, y + s * 0.1, z), (s * 1.2, s * 0.2, s * 1.2), (206, 166, 80), R)
    sc.box((x, y + s * 1.35, z), (s * 0.16, s * 0.6, s * 0.16), (110, 88, 44))
    sc.add_glow((x, y + s * 0.7, z), s * 2.4, (255, 200, 120), 0.35)


def portal(sc, x, y, z, w=2.6, h=4.4, yaw=0.0, lit=0.0, t=0.0):
    R = rot_y(yaw)
    bx = 0.42

    def put(local, size, col, em=0.0):
        p = np.array([x, y, z], float) + R @ np.array(local, float)
        sc.box(p, size, col, R, emissive=em)

    put((0, h - bx / 2, 0), (w, bx, bx), NET["black"])
    put((-w / 2 + bx / 2, h / 2, 0), (bx, h, bx), NET["black"])
    put((w / 2 - bx / 2, h / 2, 0), (bx, h, bx), NET["black"])
    put((-w / 2 + bx * 0.7, h * 0.78, 0.02), (bx * 0.5, bx * 0.4, 0.1), NET["gold"])
    put((w / 2 - bx * 0.8, h * 0.34, 0.02), (bx * 0.5, bx * 0.4, 0.1), NET["gold"])
    put((-w / 2 + bx * 0.8, h * 0.42, 0.02), (bx * 0.4, bx * 0.4, 0.1), NET["gold"])
    if lit > 0:
        col = mix((70, 26, 96), (196, 132, 255), 0.5 + 0.5 * math.sin(t * 2))
        put((0, h / 2, 0), (w - bx * 2, h - bx, 0.1), col, em=0.85)
        sc.add_glow((x, y + h / 2, z + 0.4), w * 1.5, (160, 80, 220), 0.85 * lit)


def flint(sc, x, y, z, s=0.4):
    sc.box((x, y, z), (s, s * 0.5, s * 0.7), (104, 104, 116))
    sc.box((x + s * 0.4, y + s * 0.4, z), (s * 1.1, s * 0.16, s * 0.3), (156, 156, 162))


def chalk_wall(sc, x0, y0, z, nx, ny, seed=5):
    rnd = np.random.RandomState(seed)
    for i in range(nx):
        for j in range(ny):
            if rnd.rand() < 0.35:
                continue
            sc.box((x0 + i * 0.34, y0 + j * 0.5, z), (0.06, 0.26, 0.02), (222, 216, 198))


def smoke_puffs(sc, x, y, z, t, n=5, col=(64, 30, 30), spread=1.4, seed=1):
    rnd = np.random.RandomState(seed)
    for i in range(n):
        k = (t * 0.35 + i / n) % 1.0
        sc.box((x + rnd.uniform(-spread, spread) * (0.4 + k),
                y + k * 2.2,
                z + rnd.uniform(-spread, spread) * (0.4 + k)),
               (0.5 + k * 0.9, 0.4 + k * 0.7, 0.5 + k * 0.9),
               shade(col, 1.0 - k * 0.35))

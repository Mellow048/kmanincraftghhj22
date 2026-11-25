"""The film, in boxes: 47 shots for 'In This Town, Nobody Has Ever Slept'.

Sets are built in world units (1 = one Minecraft block). The floor is y=0.
Each shot receives (sc, t, u, dur) and has already been given a camera.
"""
import math
import random

import numpy as np

import boxkit as B
from boxkit import (NET, OVR, KID, MUM, DAD, WICK, BAKER, CROWD, Cam, Light,
                    shade, mix, rot_y, rot_x, rot_z, guy, guy_lie, guy_sit,
                    blocks, bucket, mushroom, bed, bell, portal, flint,
                    chalk_wall, smoke_puffs)

WARM = (255, 168, 90)
LAVA_C = (255, 150, 56)


def lerp(a, b, t):
    return a + (b - a) * max(0.0, min(1.0, t))


def eio(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


# ------------------------------------------------------------------ sets

def lava_floor(sc, t, x0=-12, x1=12, z0=-3.0, z1=-1.6, col=LAVA_C, k=1.0):
    n = int((x1 - x0))
    for i in range(n):
        x = x0 + i + 0.5
        wob = math.sin(t * 1.6 + i * 0.7) * 0.06
        heat = 0.35 + 0.3 * math.sin(t * 2 + i * 0.9)
        sc.box((x, 0.06 + wob, (z0 + z1) / 2), (0.94, 0.12, z1 - z0),
               mix((196, 62, 12), col, heat), emissive=0.55)
        if i % 3 == 0:
            sc.add_glow((x, 0.35, (z0 + z1) / 2), 2.6, (255, 140, 50), 0.4 * k)


def tiles(sc, t, x0, x1, z0, z1, col, col2, seed=1, y=0.0, h=1.0, var=0.08):
    rnd = np.random.RandomState(seed)
    for z in range(int(z0), int(z1)):
        for x in range(int(x0), int(x1)):
            c = col if (x + z) % 2 else col2
            c = shade(c, 1.0 + rnd.uniform(-var, var))
            sc.box((x + 0.5, y - h / 2, z + 0.5), (1, h, 1), c)


def wall_slab(sc, t, z, x0=-12, x1=12, y0=0, y1=7, col=None, seed=2, holes=(), size=1.0):
    rnd = np.random.RandomState(seed)
    col = col or NET["rock"]
    for iy in range(int(y0), int(y1)):
        for ix in range(int(x0), int(x1)):
            if any(hx <= ix < hx + hw and hy <= iy < hy + hh for (hx, hy, hw, hh) in holes):
                continue
            c = shade(col, 1.0 + rnd.uniform(-0.1, 0.12))
            sc.box((ix + 0.5, iy + 0.5, z), (1, 1, 1), c)


def doorway(sc, t, x, z, w=1.4, h=2.6, k=1.0, seed=0):
    """a lit opening in the back wall"""
    fl = 0.75 + 0.25 * math.sin(t * 1.7 + seed)
    sc.box((x, h / 2, z + 0.4), (w, h, 0.2), mix((150, 54, 16), (255, 178, 92), fl * k),
           emissive=0.55)
    sc.add_glow((x, h * 0.45, z + 1.0), 3.2, (255, 160, 80), 0.5 * k)


def lamp(sc, t, x, y, z, s=0.7, k=1.0):
    sc.box((x, y - 0.5, z), (0.1, 1.0, 0.1), (60, 40, 34))
    sc.box((x, y, z), (s, s, s), (255, 226, 150), emissive=1.0)
    sc.add_glow((x, y, z), 5.5, (255, 200, 120), 0.75 * k)


def street(sc, t, lamps=(-3.4, 2.2), doors=(-7.5, -2.0, 4.5), z_back=-13, k=1.0,
           track=True, seed=3):
    sc.lights = []
    tiles(sc, t, -12, 12, -13, 3, NET["floor"], NET["floor2"], seed=seed)
    wall_slab(sc, t, z_back - 0.5, -12, 12, 0, 7, NET["rock"], seed=seed + 1,
              holes=[(int(d + 2.5 - 0.9), 0, 2, 3) for d in doors])
    for d in doors:
        doorway(sc, t, d, z_back, 1.6, 2.8, 1.0, seed=int(d))
        sc.lights.append(Light((d, 1.6, z_back + 1.2), WARM, 0.55, 4.0))
    for i, x in enumerate(lamps):
        lamp(sc, t, x, 4.6, z_back + 4.5, 0.8, k)
        sc.lights.append(Light((x, 4.2, z_back + 4.5), (255, 205, 130), 1.15, 6.0))
    if track:
        lava_floor(sc, t, -14, 14, z_back + 1.2, z_back + 2.8, k=k)
        sc.lights.append(Light((0, 0.7, z_back + 2.0), LAVA_C, 1.15, 7.0))
    sc.lights.append(Light((0.0, 2.4, -1.0), (255, 180, 120), 0.5, 7.5))


def cellar(sc, t, k=1.0, seed=41):
    sc.lights = []
    tiles(sc, t, -8, 8, -10, 2, shade(NET["floor"], 0.6), shade(NET["floor2"], 0.55), seed=seed)
    wall_slab(sc, t, -10.5, -8, 8, 0, 7, shade(NET["rock"], 0.62), seed=seed + 1)
    lamp(sc, t, 2.0, 3.4, -7.0, 0.6, k)
    sc.lights.append(Light((2.0, 3.2, -7.0), (255, 195, 120), 1.35, 7.5))
    sc.lights.append(Light((0.0, 2.2, -1.5), (255, 170, 110), 0.55, 6.0))


def cave_room(sc, t, lava=True, k=1.0, seed=61):
    sc.lights = []
    tiles(sc, t, -10, 10, -14, 3, shade(NET["floor"], 0.72), shade(NET["floor2"], 0.66), seed=seed)
    wall_slab(sc, t, -14.5, -10, 10, 0, 8, shade(NET["rock"], 0.72), seed=seed + 1)
    sc.lights.append(Light((0.0, 2.6, -2.0), (255, 175, 115), 0.7, 7.0))
    if lava:
        lava_floor(sc, t, -10, 10, -4.4, -2.8, k=k * 0.8)
        sc.lights.append(Light((0, 0.6, -3.6), LAVA_C, 1.0, 5.2))


def overworld(sc, t, night=1.0, seed=81, houses=7, x0=-9.0):
    sc.lights = []
    tiles(sc, t, -14, 14, -16, 3, mix(OVR["grass"], OVR["grass2"], 0.3), OVR["grass2"],
          seed=seed, y=0.0, h=1.0)
    for i in range(houses):
        hx = x0 + i * 2.45
        hz = -8 - (i % 3) * 1.4
        hh = 2.2 + (i % 3) * 0.5
        sc.box((hx, hh / 2, hz), (1.9, hh, 1.9), OVR["wall"])
        sc.box((hx, hh + 0.32, hz), (2.2, 0.64, 2.2), OVR["roof"])
        sc.box((hx, hh + 0.72, hz), (1.4, 0.3, 1.4), OVR["roof"])
        sc.box((hx - 0.45, hh * 0.55, hz + 1.0), (0.5, 0.5, 0.12),
               OVR["window"], emissive=0.75 - night * 0.25)
        sc.add_glow((hx - 0.45, hh * 0.55, hz + 1.2), 1.8, (255, 210, 140), 0.4)
        sc.lights.append(Light((hx - 0.4, hh * 0.55, hz + 1.4), (255, 200, 130),
                               0.35 * (1 - night * 0.4), 2.4))


def press(sc, t, z, n, x0, x1, h=1.75, k=1.0, seed=3, speed=0.9, face=1):
    rnd = random.Random(seed)
    span = x1 - x0
    for i in range(n):
        base = rnd.uniform(0, span)
        dirn = 1 if rnd.random() > 0.3 else -1
        x = x0 + ((base + dirn * t * speed * rnd.uniform(0.7, 1.2)) % span)
        c = CROWD[rnd.randrange(len(CROWD))]
        c = dict(c)
        for key in ("skin", "shirt", "pants", "hair", "shoe"):
            c[key] = shade(c[key], k)
        guy(sc, x, 0, z + rnd.uniform(-0.4, 0.4), yaw=(1.57 * dirn) + rnd.uniform(-0.2, 0.2),
            h=h * rnd.uniform(0.92, 1.05), c=c, walk=t * 6.5 + i * 1.1)


def strider(sc, t, x, z, s=1.6, face=1, lick=0.0):
    body = (188, 84, 88)
    for i, dx in enumerate((-0.55, -0.3, 0.3, 0.55)):
        sc.box((x + dx * s, 0.5 * s, z), (0.16, 1.0, 0.16), shade(body, 0.7))
    sc.box((x, 1.05 * s, z), (1.25 * s, 0.55, 0.55), body)
    sc.box((x, 1.3 * s, z), (1.0 * s, 0.14, 0.5), shade(body, 1.15))
    hx = x + face * 0.7 * s
    sc.box((hx, 1.35 * s, z), (0.3, 0.6, 0.36), shade(body, 1.05))
    sc.box((hx + face * 0.1, 1.5 * s, z), (0.34, 0.22, 0.3), shade(body, 1.2))
    if lick:
        sc.box((hx + face * (0.3 + 0.18 * lick), 1.24 * s, z), (0.3 + 0.2 * lick, 0.09, 0.12),
               (222, 112, 122))


def hand_box(sc, x, y, z, s=0.5, col=(222, 176, 140)):
    sc.box((x, y, z), (s, s * 0.7, s * 1.4), col)
    for i in range(4):
        sc.box((x, y, z + (i - 1.5) * s * 0.4), (s * 0.8, s * 0.5, s * 0.2), shade(col, 0.95))


def soup_pot(sc, t, x, z, s=0.9):
    sc.box((x, 0.45, z), (s, 0.9, s), (62, 60, 66))
    sc.box((x, 0.92, z), (s * 0.86, 0.1, s * 0.86), (150, 96, 60), emissive=0.2)


def bowl(sc, x, z, s=0.4):
    sc.box((x, 0.1, z), (s, 0.2, s), (176, 172, 164))
    sc.box((x, 0.2, z), (s * 0.7, 0.06, s * 0.7), (96, 78, 68))


def bed_carry(sc, x, y, z, h, yaw=0.0):
    sc.box((x, y, z), (1.9, 0.22, 0.9), NET["wood"], rot_y(yaw))
    sc.box((x, y + 0.18, z), (1.8, 0.22, 0.86), NET["cloth"], rot_y(yaw))


# ------------------------------------------------------------------ shots

def hook_ground(sc, t, u, dur):
    street(sc, t, lamps=(-4.0, 2.4), doors=(-8.0, -1.5, 5.0))
    B.guy_lie(sc, 0.2, 0, -3.2, yaw=0.12, h=1.5, c=KID)
    # the passers, close to the lens
    B.guy(sc, -2.3, 0, 0.4, yaw=1.4, h=1.85, c=CROWD[1], walk=t * 8)
    B.guy(sc, 2.6, 0, -0.2, yaw=-1.5, h=1.9, c=CROWD[2], walk=t * 7)
    bucket(sc, -1.5, 1.1, 0.1, 0.34)
    sc.cam = B.Cam((0.2, lerp(0.55, 0.95, eio(u)), 1.9),
                   (0.2, 0.75, -4.2), fov=64)


def hook_town(sc, t, u, dur):
    street(sc, t, lamps=(-6.0, -0.5, 5.0), doors=(-9.0, -3.0, 3.5, 8.0), z_back=-16)
    press(sc, t, -9.0, 9, -10, 10, 1.8, 0.85, 11, 1.1)
    press(sc, t + 2, -6.0, 8, -10, 10, 1.8, 0.95, 13, 0.8)
    press(sc, t + 4, -3.0, 6, -9, 9, 1.8, 1.0, 17, 0.6)
    for i in range(4):
        bucket(sc, -7 + i * 4.4, 1.5, -5.5 + (i % 2), 0.32)
    sc.cam = B.Cam((0, lerp(1.9, 4.4, eio(u)), lerp(3.0, 5.2, eio(u))),
                   (0, lerp(1.4, 0.9, eio(u)), -12.0), fov=60)


def cellar_gate(sc, t, u, dur):
    cellar(sc, t)
    # gate
    for i in range(7):
        sc.box((-2.1 + i * 0.7, 1.7, -4.4), (0.12, 3.4, 0.12), NET["iron"])
    sc.box((0, 3.3, -4.4), (4.3, 0.14, 0.14), (86, 88, 96))
    sc.box((0, 1.2, -4.4), (4.3, 0.12, 0.12), (86, 88, 96))
    B.bed(sc, 0.2, 0, -6.2, yaw=0.0, burnt=0.2)
    # chain across
    for i in range(8):
        sc.box((-2.0 + i * 0.55, 2.2 - abs(i - 3.5) * 0.13, -4.25), (0.3, 0.16, 0.1), (150, 152, 160))
    sc.box((0.1, 2.0, -4.2), (0.5, 0.6, 0.18), (78, 70, 64))
    sc.add_glow((0, 1.8, -4.0), 3.4, (255, 170, 90), 0.4)
    sc.cam = B.Cam((0.1, lerp(1.5, 1.35, u), lerp(-1.4, -0.9, u)), (0.1, 1.5, -4.6), fov=52)


def aim(sc, t, u, dur):
    street(sc, t, lamps=(-3.2, 3.0), doors=(-6.5, 3.5))
    B.guy_lie(sc, -0.2, 0, -3.4, yaw=0.35, h=1.5, c=KID)
    sc.cam = B.Cam((0.9, lerp(2.4, 2.1, eio(u)), -0.6), (-0.2, 0.35, -3.6), fov=56)


def me(sc, t, u, dur):
    street(sc, t, lamps=(-3.6, 2.6), doors=(-8.0, -2.0, 4.0))
    B.guy_lie(sc, 0, 0, -2.6, yaw=0.2, h=1.5, c=KID)
    press(sc, t, -1.4, 5, -6, 6, 1.8, 1.0, 21, 1.2)
    press(sc, t + 1, -5.0, 4, -6, 6, 1.8, 0.8, 23, 0.8)
    sc.cam = B.Cam((0, lerp(1.4, 1.15, u), lerp(0.4, 1.0, u)), (0, 0.8, -3.4), fov=58)


def mum_dad(sc, t, u, dur):
    street(sc, t, lamps=(-4.2, 2.8), doors=(-8.5, 4.0))
    B.guy(sc, -0.95, 0, -4.0, yaw=0.25, h=1.85, c=MUM, arml=-0.5)
    bucket(sc, -1.62, 0.95, -3.9, 0.44)
    sc.add_glow((-1.62, 1.3, -3.9), 2.2, LAVA_C, 0.5)
    B.guy(sc, 0.95, 0, -4.3, yaw=-0.2, h=1.88, c=DAD)
    for i in range(3):
        mushroom(sc, 0.6 + i * 0.36, 1.95, -4.2, 0.34, (166, 82, 70))
    sc.box((0.95, 1.86, -4.2), (1.1, 0.16, 0.6), (150, 112, 62))
    sc.cam = B.Cam((0, lerp(1.35, 1.5, u), lerp(1.0, 0.2, u)), (0, 1.15, -4.2), fov=54)


def mum_point(sc, t, u, dur):
    street(sc, t, lamps=(-3.0, 3.2), doors=(-7.0, 4.5))
    B.guy(sc, -0.9, 0, -3.4, yaw=0.15, h=1.88, c=MUM, arml=1.35)
    B.guy(sc, 0.85, 0, -4.2, yaw=-0.2, h=1.5, c=KID)
    sc.cam = B.Cam((0.2, lerp(1.5, 1.25, eio(u)), lerp(0.8, 0.2, eio(u))),
                   (-0.5, lerp(1.1, 0.45, eio(u)), -3.6), fov=54)


def why(sc, t, u, dur):
    cellar(sc, t, 0.9)
    for i in range(7):
        sc.box((-2.1 + i * 0.7, 1.7, -4.4), (0.12, 3.4, 0.12), NET["iron"])
    for i in range(8):
        sc.box((-2.0 + i * 0.55, 2.3 - abs(i - 3.5) * 0.14, -4.24), (0.3, 0.16, 0.1), (156, 158, 166))
    sc.box((0.15, 2.0, -4.2), (0.5, 0.6, 0.2), (82, 74, 66))
    hand_box(sc, 0.85 + math.sin(t * 1.2) * 0.05, 1.95, -3.75, 0.55, (216, 170, 130))
    sc.cam = B.Cam((0.2, 2.05, lerp(-2.5, -2.1, u)), (0.3, 2.0, -4.3), fov=48)


def rows(sc, t, u, dur):
    sc.lights = []
    tiles(sc, t, -10, 10, -13, 3, shade(NET["floor"], 0.7), shade(NET["floor2"], 0.64), seed=31)
    wall_slab(sc, t, -13.5, -10, 10, 0, 8, shade(NET["rock"], 0.6), seed=32)
    for i in range(3):
        lamp(sc, t, -5.5 + i * 5.5, 4.4, -9.0, 0.8)
        sc.lights.append(Light((-5.5 + i * 5.5, 4.2, -9.0), (255, 200, 120), 1.1, 6.0))
    for row in range(3):
        zz = -9.0 + row * 2.6
        sc.box((0, 0.9, zz), (17, 0.3, 0.9), shade(NET["wood_d"], 0.9))
        for i in range(17):
            mushroom(sc, -8 + i * 1.0, 1.05, zz, 0.7, (154 + row * 12, 78, 68))
        sc.box((0, 0.05, zz), (17, 0.1, 1.2), shade(NET["floor"], 0.7))
    B.guy(sc, 2.0, 0, -4.0, yaw=0.15, h=1.5, c=KID)
    sc.cam = B.Cam((-1.2, lerp(1.7, 1.5, u), lerp(2.6, 1.2, eio(u))),
                   (0.4, 1.1, -7.0), fov=58)


def lava_up(sc, t, u, dur):
    street(sc, t, lamps=(-5.0, 3.0), doors=(-9.0, 5.5), track=False)
    lava_floor(sc, t, -12, 12, -3.4, -1.2, k=1.2)
    sc.lights.append(Light((0, 0.6, -2.4), LAVA_C, 1.2, 5.0))
    for i in range(5):
        x = -3.4 + i * 1.7
        guy(sc, x, 0, -5.0 + (i % 2) * 0.5, yaw=0.1, h=1.78,
            c=dict(CROWD[i % 4]), arml=-0.7, walk=t * 4 + i)
        bucket(sc, x - 0.55, 0.9, -5.0 + (i % 2) * 0.5, 0.36)
    sc.cam = B.Cam((0.2, 1.45, lerp(1.6, 0.6, u)), (0, 1.1, -5.2), fov=56)


def water(sc, t, u, dur):
    street(sc, t, lamps=(-3.0, 2.6), doors=(-7.5,))
    B.guy(sc, 1.5, 0, -3.6, yaw=-0.3, h=1.5, c=KID)
    sc.box((-0.5, 1.2, -2.9), (0.42, 0.42, 0.42), (140, 144, 152), rot_x(0.8))
    for i in range(10):
        k = (t * 1.4 + i * 0.1) % 1.0
        sc.box((-0.42, 1.05 - k * 0.85, -2.85), (0.1, 0.14, 0.1), (120, 186, 224), emissive=0.2)
    for i in range(9):
        k = (t * 0.45 + i * 0.11) % 1.0
        r = 0.24 + k * 0.6
        sc.box((-0.42 + math.sin(i * 2.3) * 0.3, 0.2 + k * 1.2, -2.8 + math.cos(i) * 0.3),
               (r, r * 0.8, r), mix((236, 232, 226), (120, 92, 88), k), emissive=0.1)
    sc.cam = B.Cam((0.4, lerp(1.5, 1.75, u), -1.6), (-0.3, 1.0, -3.0), fov=54)


def marks(sc, t, u, dur):
    sc.lights = []
    tiles(sc, t, -8, 8, -9, 3, shade(NET["floor"], 0.72), shade(NET["floor2"], 0.66), seed=51)
    wall_slab(sc, t, -9.5, -14, 14, 0, 7, shade(NET["rock"], 0.66), seed=52)
    sc.lights.append(Light((0, 3.4, -6.0), (255, 190, 110), 1.0, 6.0))
    for row in range(6):
        chalk_wall(sc, -13, 0.4 + row * 0.62, -8.9, 34, 1, seed=row)
    B.guy(sc, 1.4, 0, -6.4, yaw=0.4, h=1.5, c=KID, arml=-2.2)
    sc.cam = B.Cam((lerp(-2.2, 2.6, eio(u)), 1.5, -4.4), (lerp(-2.6, 2.2, eio(u)), 1.5, -9.0), fov=52)


def lie_street(sc, t, u, dur):
    street(sc, t, lamps=(-3.4, 2.4), doors=(-7.5, 3.0))
    B.guy_lie(sc, 0, 0, -3.0, yaw=0.1, h=1.5, c=KID)
    press(sc, t, -1.6, 4, -5, 5, 1.8, 0.95, 61, 1.1)
    press(sc, t + 2, -5.6, 3, -5, 5, 1.8, 0.75, 63, 0.7)
    sc.cam = B.Cam((0, lerp(1.3, 1.05, u), lerp(0.9, 1.4, u)), (0, 0.7, -3.4), fov=58)


def want(sc, t, u, dur):
    street(sc, t, lamps=(-4.6, 0.0, 4.4), doors=(-9.0, 4.0))
    B.guy_lie(sc, 0, 0, -3.2, yaw=0.0, h=1.55, c=KID)
    sc.cam = B.Cam((0.0, lerp(1.9, 1.55, eio(u)), lerp(0.6, 1.2, eio(u))),
                   (0, 1.5, -6.5), fov=60)


def tried(sc, t, u, dur):
    street(sc, t, lamps=(-3.6, 2.6), doors=(-8.0, 3.5))
    B.guy(sc, 0, 0, -3.6, yaw=0.0, h=1.5, c=KID,
          arml=lerp(-0.4, -2.4, (math.sin(t * 5) + 1) / 2), armr=lerp(-0.4, -2.4, (math.cos(t * 5) + 1) / 2))
    press(sc, t, -6.0, 4, -6, 6, 1.8, 0.9, 65, 1.0)
    sc.cam = B.Cam((0, 1.35, 0.6), (0, 1.1, -4.0), fov=56)


def square(sc, t, u, dur):
    street(sc, t, lamps=(-4.0, 3.0), doors=(-8.5, 4.5))
    B.guy_lie(sc, 0, 0, -2.8, yaw=0.1, h=1.5, c=KID)
    press(sc, t, -1.2, 6, -6, 6, 1.8, 1.0, 67, 1.4)
    press(sc, t + 1, -5.0, 5, -6, 6, 1.8, 0.8, 69, 1.0)
    sc.cam = B.Cam((0, 1.25, 1.2), (0, 0.6, -3.2), fov=60)


def lick(sc, t, u, dur):
    sc.lights = []
    tiles(sc, t, -9, 9, -12, 3, shade(NET["floor"], 0.7), shade(NET["floor2"], 0.64), seed=71)
    wall_slab(sc, t, -12.5, -9, 9, 0, 8, shade(NET["rock"], 0.6), seed=72)
    lava_floor(sc, t, -9, 9, -3.6, -1.8, k=1.2)
    sc.lights.append(Light((0, 0.7, -2.6), LAVA_C, 1.15, 4.8))
    B.guy_lie(sc, 0.6, 0, -2.6, yaw=0.25, h=1.5, c=KID)
    strider(sc, t, -1.3, -2.2, 1.3, 1, lick=min(1.0, u * 1.5))
    sc.cam = B.Cam((0.9, lerp(1.2, 1.0, u), lerp(0.4, -0.2, u)), (-0.4, 0.75, -2.6), fov=54)


def wool(sc, t, u, dur):
    street(sc, t, lamps=(-4.0, 2.8), doors=(-8.5, 4.0))
    for i in range(7):
        sc.box((-3.0 + i * 1.0, 0.6, -5.2), (0.12, 1.2, 0.12), (104, 72, 46))
    sc.box((-0.0, 1.15, -5.2), (6.2, 0.12, 0.12), (116, 80, 50))
    sc.box((-0.0, 0.62, -5.2), (6.2, 0.1, 0.1), (116, 80, 50))
    sc.box((3.0, 1.6, -4.2), (1.5, 0.8, 0.16), (212, 182, 138))
    sc.box((3.0, 2.05, -4.2), (1.7, 0.12, 0.2), (150, 112, 66))
    B.guy(sc, 0.6, 0, -3.4, yaw=-0.4, h=1.5, c=KID, arml=-1.1)
    sc.box((0.1, 1.1, -3.2), (1.0, 0.16, 0.3), (152, 112, 66))
    sc.cam = B.Cam((0.4, lerp(1.4, 1.2, u), lerp(1.0, 0.2, u)), (0.9, 1.0, -4.6), fov=56)


def fake_bed(sc, t, u, dur):
    street(sc, t, lamps=(-3.4, 2.6), doors=(-7.5, 3.5))
    sc.box((0.4, 0.35, -3.4), (1.9, 0.22, 0.9), NET["wood"])
    sc.box((0.4, 0.5, -3.4), (1.8, 0.22, 0.86), NET["cloth"])
    for i in range(3):
        sc.box((-1.6 + i * 0.5, 0.06, -2.5), (0.9, 0.1, 0.35), (152, 112, 66))
    B.guy(sc, -1.8, 0, -3.6, yaw=-0.9, h=1.5, c=KID, arml=-0.9, armr=-1.2)
    sc.cam = B.Cam((0.2, lerp(1.5, 1.25, u), lerp(0.4, -0.2, u)), (0.2, 0.8, -3.4), fov=56)


def safe(sc, t, u, dur):
    street(sc, t, lamps=(-3.4, 2.6), doors=(-8.0, 4.0))
    sc.box((-0.6, 0.35, -3.2), (1.9, 0.22, 0.9), NET["wood"])
    sc.box((-0.6, 0.5, -3.2), (1.8, 0.22, 0.86), NET["cloth"])
    B.guy(sc, 1.5, 0, -3.6, yaw=-0.6, h=1.5, c=KID, arml=-1.6, armr=-1.6)
    press(sc, t, -6.0, 3, -5, 5, 1.8, 0.85, 73, 0.8)
    sc.cam = B.Cam((0.3, lerp(1.5, 1.3, u), lerp(0.9, 0.3, u)), (0.2, 0.9, -3.4), fov=56)


def cellar_bed(sc, t, u, dur):
    cellar(sc, t, 1.0)
    B.bed(sc, -0.4, 0, -4.6, yaw=0.1, burnt=0.55)
    for i in range(6):
        sc.box((-1.6 + i * 0.62, 1.5 - abs(i - 2.5) * 0.12, -4.2), (0.3, 0.16, 0.1), (150, 152, 160))
    sc.box((2.6, 3.2, -8.0), (0.5, 0.5, 0.5), (255, 226, 150), emissive=1.0)
    sc.add_glow((2.6, 3.2, -8.0), 4.0, (255, 200, 120), 0.5)
    B.guy(sc, 1.6, 0, -3.6, yaw=-0.5, h=1.5, c=KID, arml=-0.6)
    sc.cam = B.Cam((0.5, lerp(1.4, 1.2, u), lerp(0.2, -0.6, u)), (-0.2, 0.6, -4.6), fov=56)


def carry(sc, t, u, dur):
    street(sc, t, lamps=(-4.0, 2.6), doors=(-8.0, 4.0))
    bed_carry(sc, 0, 2.05, -3.6, 1.6)
    B.guy(sc, 0, 0, -3.6, yaw=0.1, h=1.5, c=KID, arml=-2.7, armr=-2.7)
    press(sc, t, -1.8, 5, -6, 6, 1.8, 1.0, 75, 0.7)
    press(sc, t + 1, -6.0, 4, -6, 6, 1.8, 0.8, 77, 0.5)
    sc.cam = B.Cam((0.6, 1.35, lerp(1.4, 0.4, u)), (0, 1.2, -3.8), fov=56)


def watch(sc, t, u, dur):
    street(sc, t, lamps=(-4.0, 2.8), doors=(-8.0, 4.0))
    B.bed(sc, -0.9, 0, -3.4, yaw=0.0, burnt=0.4)
    B.guy(sc, 0.9, 0, -3.2, yaw=-0.7, h=1.5, c=KID, arml=-1.9, armr=-1.9 + math.sin(t * 5) * 0.2)
    press(sc, t, -2.2, 6, -6, 6, 1.8, 1.0, 79, 0.35)
    press(sc, t, -6.0, 5, -6, 6, 1.8, 0.8, 81, 0.3)
    sc.cam = B.Cam((0.3, lerp(1.3, 1.45, u), lerp(1.2, 0.5, u)), (0, 1.0, -3.6), fov=56)


def lie_down(sc, t, u, dur):
    street(sc, t, lamps=(-3.8, 2.6), doors=(-8.0, 4.0))
    B.bed(sc, -0.5, 0, -3.4, yaw=0.0, burnt=0.4)
    B.guy_lie(sc, -0.5, 0.62, -3.05, yaw=0.0, h=1.5, c=KID)
    press(sc, t, -2.0, 6, -6, 6, 1.8, 0.95, 83, 0.25)
    sc.cam = B.Cam((0.2, lerp(1.6, 1.3, u), lerp(1.4, 0.6, u)), (-0.4, 0.85, -3.4), fov=54)


def boom(sc, t, u, dur):
    street(sc, t, lamps=(-3.8, 2.6), doors=(-8.0, 4.0))
    B.bed(sc, -0.4, 0, -3.2, yaw=0.0, burnt=0.4)
    B.guy_lie(sc, -0.4, 0.62, -2.9, yaw=0.0, h=1.5, c=KID)
    press(sc, t, -2.4, 6, -6, 6, 1.8, 0.95, 85, 0.12)
    z = lerp(1.4, 0.15, eio(u))
    sc.cam = B.Cam((0.1, 1.35, z), (-0.4, 0.75, -3.2), fov=52)
    if u > 0.86:
        k = (u - 0.86) / 0.14
        sc.box((0, 1.0, -2.4), (14, 10, 0.2), mix((180, 90, 40), (255, 250, 226), k), emissive=1.0)


def roof(sc, t, u, dur):
    rnd = random.Random(5)
    sh = math.sin(u * 70) * 0.10 * max(0.0, 1 - u * 1.6)
    street(sc, t, lamps=(-4.0, 2.8), doors=(-8.0, 4.0), track=False)
    # the shed
    sc.box((1.4, 1.1, -5.0), (2.6, 2.2, 2.4), (128, 90, 58))
    sc.box((1.4, 2.4, -5.0), (3.0, 0.5, 2.8), (92, 56, 40))
    sc.box((0.8, 0.85, -3.8), (0.7, 1.7, 0.14), (44, 32, 28))
    # debris
    if u > 0.12:
        k = min(1.0, (u - 0.12) / 0.6)
        for i in range(16):
            bx = 1.4 + rnd.uniform(-3, 3) * k
            by = 1.4 + rnd.uniform(0.2, 3.4) * k - k * k * 1.1
            bz = -5.0 + rnd.uniform(-1.6, 2.4) * k
            s = 0.55 * (1 - k * 0.4)
            sc.box((bx, by, bz), (s, s, s), shade((128, 90, 58), rnd.uniform(0.7, 1.1)),
                   rot_x(t * 2 + i))
        for i in range(6):
            rr = 0.8 + i * 0.5 + k * 1.6
            sc.box((1.4, 1.6 + i * 0.5, -5.0), (rr, rr * 0.7, rr),
                   shade((110, 62, 46), 1.0 - 0.4 * k))
        sc.add_glow((1.4, 2.0, -5.0), 8.0, (255, 190, 120), 0.9)
    sc.cam = B.Cam((sh, 1.9 + sh * 0.6, 2.6), (0.9, 1.2, -4.6), fov=58)
    flash = max(0.0, 1.0 - u * 4.0)
    if flash > 0:
        sc.box((0, 3.0, 3.2), (26, 20, 0.2), mix((255, 255, 255), (255, 236, 200), 1 - flash),
               emissive=1.0)


def ash(sc, t, u, dur):
    sc.lights = []
    tiles(sc, t, -9, 9, -11, 3, shade((58, 40, 36), 1.0), shade((50, 34, 32), 1.0), seed=91)
    wall_slab(sc, t, -11.5, -9, 9, 0, 7, shade((54, 36, 34), 1.0), seed=92)
    sc.lights.append(Light((0, 2.6, -5.0), (255, 150, 90), 0.8, 5.0))
    for i in range(24):
        rnd = random.Random(i)
        sc.box((rnd.uniform(-5, 5), 0.3 + rnd.uniform(0, 2.6) + ((t * 0.4 + i * 0.1) % 1.0) * -1.2,
                rnd.uniform(-6, 1)), (0.1, 0.1, 0.1), (120, 96, 82))
    B.guy(sc, 0, 0, -3.4, yaw=0.0, h=1.5, c=KID)
    hand_box(sc, -0.78, 1.15, -3.05, 0.5, (206, 160, 122))
    hand_box(sc, 0.78, 1.15, -3.05, 0.5, (206, 160, 122))
    sc.cam = B.Cam((0.1, lerp(1.5, 1.3, u), lerp(1.2, 0.5, u)), (0, 1.05, -3.6), fov=54)


def gone(sc, t, u, dur):
    sc.lights = []
    tiles(sc, t, -9, 9, -11, 3, shade((56, 40, 36), 1.0), shade((48, 34, 32), 1.0), seed=93)
    wall_slab(sc, t, -11.5, -9, 9, 0, 7, shade((52, 34, 32), 1.0), seed=94)
    sc.lights.append(Light((0, 2.4, -4.0), (255, 150, 90), 0.7, 5.0))
    for i in range(9):
        sc.box((-3.4 + i * 0.5, 0.25 + (i % 3) * 0.2, -4.6 + (i % 4) * 0.5),
               (0.5, 0.3, 0.5), shade((78, 56, 44), 0.9))
    soup_pot(sc, t, 1.8, -3.4, 1.0)
    sc.box((1.8, 0.06, -2.4), (2.2, 0.06, 1.4), (70, 50, 42))
    B.guy(sc, 0.2, 0, -3.2, yaw=0.2, h=1.5, c=KID)
    sc.cam = B.Cam((0.2, lerp(1.5, 1.2, u), lerp(1.6, 0.6, u)), (0.2, 0.9, -3.8), fov=56)


def cold(sc, t, u, dur):
    sc.lights = []
    tiles(sc, t, -10, 10, -13, 4, shade((54, 38, 34), 1.0), shade((46, 32, 30), 1.0), seed=95)
    wall_slab(sc, t, -13.5, -10, 10, 0, 7, shade((52, 36, 34), 1.0), seed=96)
    sc.lights.append(Light((0, 3.0, -6.0), (255, 160, 100), 1.0, 7.0))
    for row in range(3):
        for i in range(6):
            x = -5.0 + i * 2.0 + (row % 2) * 0.7
            z = -4.0 - row * 2.2
            c = dict(CROWD[(i + row) % 4])
            for key in ("skin", "shirt", "pants", "hair", "shoe"):
                c[key] = shade(c[key], 0.82 - row * 0.06)
            guy(sc, x, 0, z, yaw=0.15, h=1.78, c=c)
            bowl(sc, x - 0.55, z + 0.35)
    B.guy(sc, 0.4, 0, -2.4, yaw=0.15, h=1.5, c=KID)
    sc.cam = B.Cam((0.4, lerp(1.5, 1.3, u), lerp(1.4, 0.6, u)), (0.2, 1.0, -4.6), fov=56)


def job(sc, t, u, dur):
    sc.lights = []
    tiles(sc, t, -8, 8, -16, 4, shade((48, 22, 22), 1.0), shade((42, 19, 19), 1.0), seed=97)
    for z in range(-16, 4, 2):
        for x in (-7.5, 7.5):
            sc.box((x, 2.0, z + 0.5), (1, 4, 1), shade((40, 20, 20), 1.0))
    sc.box((0, 4.3, -6), (16, 1, 22), shade((34, 16, 16), 1.0))
    lava_floor(sc, t, -6, 6, -6.0, -4.4, k=1.3)
    sc.lights.append(Light((0, 0.7, -5.2), LAVA_C, 1.25, 6.0))
    B.guy(sc, -0.6, 0, -3.2, yaw=0.15, h=1.5, c=KID, arml=-0.8)
    bucket(sc, -1.5, 0.85, -3.2, 0.4)
    sc.cam = B.Cam((0.2, lerp(1.4, 1.2, u), lerp(0.6, -0.4, u)), (-0.4, 0.9, -4.4), fov=56)


def frame_portal(sc, t, u, dur, lit=0.0):
    cave_room(sc, t, lava=False, k=0.8)
    portal(sc, 0, 0, -7.0, 2.6, 4.4, 0.0, lit=lit, t=t)
    sc.box((0, 0.02, -3.4), (2.6, 0.06, 1.0), (74, 64, 62))
    B.guy(sc, 2.2, 0, -3.4, yaw=-0.5, h=1.5, c=KID)
    sc.cam = B.Cam((0.6, lerp(1.6, 1.4, u), lerp(1.8, 0.6, u)), (0.2, 1.6, -6.6), fov=56)


def frame_shot(sc, t, u, dur):
    frame_portal(sc, t, u, dur, 0.0)


def list_shot(sc, t, u, dur):
    idx = min(3, int(u * 4))
    v = (u * 4) - idx
    if idx == 0:
        water(sc, t, v, dur)
    elif idx == 1:
        marks(sc, t, v * 0.35, dur)
    elif idx == 2:
        cellar_bed(sc, t, 0.3 + v * 0.2, dur)
    else:
        frame_portal(sc, t, 0.2 + v * 0.2, dur, 0.0)


def wick_sit(sc, t, u, dur):
    cave_room(sc, t, lava=False, k=0.85)
    guy_sit(sc, -0.3, 0, -4.2, yaw=0.1, h=1.8, c=WICK)
    B.guy(sc, 1.9, 0, -3.8, yaw=-0.6, h=1.5, c=KID)
    sc.box((-4.6, 3.1, -8.0), (0.6, 0.6, 0.6), (255, 226, 150), emissive=1.0)
    sc.add_glow((-4.6, 3.1, -8.0), 5.0, (255, 200, 120), 0.55)
    sc.lights.append(Light((-4.6, 3.0, -8.0), (255, 200, 130), 0.9, 6.0))
    sc.cam = B.Cam((0.4, lerp(1.4, 1.2, u), lerp(0.8, 0.1, u)), (-0.1, 0.9, -4.2), fov=54)


def wick_face(sc, t, u, dur):
    cave_room(sc, t, lava=False, k=0.8)
    guy_sit(sc, -0.2, 0, -4.4, yaw=0.05, h=1.8, c=WICK)
    sc.lights.append(Light((-0.6, 1.6, -2.4), (255, 170, 100), 0.9, 3.0))
    sc.cam = B.Cam((0.05, lerp(1.45, 1.4, u), lerp(-1.9, -1.5, u)), (-0.15, 1.25, -4.4), fov=46)


def sky_memory(sc, t, u, dur):
    night = eio(u)
    sc.lights = []
    tiles(sc, t, -10, 10, -12, 3, OVR["grass"], OVR["grass2"], seed=101)
    portal(sc, 0, 0, -6.5, 2.6, 4.2, 0.0, lit=1.0, t=t)
    for i in range(5):
        sc.box((-5 + i * 2.4, 0.6, -3.0), (0.18, 1.2, 0.18), OVR["trunk"])
        sc.box((-5 + i * 2.4, 1.5, -3.0), (1.0, 0.8, 1.0), OVR["leaf"])
    sc.cam = B.Cam((0, lerp(1.7, 1.3, u), lerp(1.6, -0.6, u)), (0, 1.6, -5.6), fov=56)
    sc.sky = (mix((96, 130, 186), (8, 11, 30), night),
              mix((176, 198, 226), (20, 28, 62), night),
              mix((236, 208, 176), (46, 60, 100), night))


def door_out(sc, t, u, dur):
    sc.lights = []
    tiles(sc, t, -10, 10, -12, 3, shade(OVR["grass2"], 0.6), shade(OVR["grass2"], 0.5), seed=103)
    dim = max(0.0, 1 - u * 1.5)
    portal(sc, -0.6, 0, -6.5, 2.6, 4.2, 0.0, lit=dim, t=t)
    fx = 1.6 + u * 2.4
    sc.box((fx, 0.9, -4.2 - u * 3.0), (0.5, 1.8, 0.35), (26, 24, 34))
    sc.box((fx, 1.95, -4.2 - u * 3.0), (0.42, 0.45, 0.4), (30, 26, 38))
    sc.cam = B.Cam((0.2, 1.7, 1.4), (0.2, 1.6, -6.0), fov=54)
    sc.sky = (mix((30, 32, 48), (5, 6, 12), eio(u)), mix((52, 56, 78), (9, 11, 22), eio(u)),
              mix((70, 70, 88), (14, 16, 30), eio(u)))


def short(sc, t, u, dur):
    cave_room(sc, t, lava=False, k=0.75)
    portal(sc, -0.4, 0, -7.0, 2.6, 4.4, 0.0, lit=0.0, t=t)
    for row in range(5):
        chalk_wall(sc, -7.6, 0.5 + row * 0.7, -6.6, 16, 1, seed=row + 20)
    guy_sit(sc, 1.8, 0, -4.4, yaw=-0.5, h=1.75, c=WICK)
    sc.cam = B.Cam((lerp(0.4, -0.8, eio(u)), 1.6, lerp(1.2, 0.2, eio(u))), (-0.4, 1.7, -6.8), fov=56)


def reason(sc, t, u, dur):
    sc.lights = []
    street(sc, t, lamps=(-6.0, 0.0, 6.0), doors=(-9.0, -3.0, 3.0, 9.0), z_back=-16, track=False)
    lava_floor(sc, t, -12, 12, -3.0, -1.4, k=1.0)
    sc.lights.append(Light((0, 0.6, -2.2), LAVA_C, 0.9, 5.0))
    press(sc, t, -8.0, 8, -10, 10, 1.75, 0.5, 111, 0.4)
    sc.cam = B.Cam((0, lerp(2.2, 3.6, eio(u)), lerp(2.0, 4.0, eio(u))),
                   (0, 1.2, -11.0), fov=58)


def flint_shot(sc, t, u, dur):
    cave_room(sc, t, lava=False, k=0.85)
    guy_sit(sc, -1.4, 0, -4.4, yaw=0.4, h=1.8, c=WICK)
    sc.lights.append(Light((-0.8, 1.5, -3.0), (255, 170, 100), 0.9, 3.0))
    sc.box((-0.35, 1.15, -3.4), (0.5, 0.34, 0.9), WICK["skin"])
    flint(sc, 0.35, 1.18, -3.3, 0.3)
    hand_box(sc, 0.72, 1.12, -3.2, 0.34, WICK["skin"])
    sc.cam = B.Cam((0.1, lerp(1.35, 1.3, u), lerp(-1.5, -1.1, u)), (0.05, 1.15, -3.4), fov=48)


def lit_shot(sc, t, u, dur):
    cave_room(sc, t, lava=False, k=0.8)
    lit = min(1.0, u * 1.6)
    portal(sc, 0, 0, -7.0, 2.6, 4.4, 0.0, lit=lit, t=t)
    if u < 0.45:
        hand_box(sc, 0.9, 1.2, -2.6, 0.4, KID["skin"])
        flint(sc, 1.2, 1.2, -2.6, 0.26)
        for i in range(6):
            ang = i * 1.05 + t * 3
            k = max(0.0, 1 - abs(u - 0.3) * 3.2)
            sc.box((1.05 + math.cos(ang) * 0.24 * k, 1.15 + math.sin(ang) * 0.24 * k, -2.7),
                   (0.07, 0.07, 0.07), (255, 240, 190), emissive=1.0)
    else:
        k = (u - 0.45) / 0.55
        B.guy(sc, -0.2, 0, lerp(-3.2, -5.2, k), yaw=0.0, h=1.5, c=KID)
    sc.cam = B.Cam((0.3, lerp(1.7, 1.5, u), lerp(1.4, 0.4, u)), (0, 1.7, -6.8), fov=54)


def other_sky(sc, t, u, dur):
    night = eio(u)
    sc.lights = []
    tiles(sc, t, -10, 10, -14, 3, OVR["grass"], OVR["grass2"], seed=121)
    for i in range(6):
        sc.box((-6 + i * 2.4, 1.1, -7.0), (0.2, 2.2, 0.2), OVR["trunk"])
        sc.box((-6 + i * 2.4, 2.5, -7.0), (1.4, 1.2, 1.4), shade(OVR["leaf"], 1 - night * 0.4))
    B.guy(sc, 0, 0, -3.0, yaw=0.0, h=1.55, c=KID)
    sc.cam = B.Cam((0.4, lerp(2.0, 1.6, u), lerp(1.4, 0.2, u)), (0, 1.6, -6.0), fov=58)
    sc.sky = (mix((92, 122, 176), (6, 9, 24), night), mix((172, 190, 218), (18, 26, 58), night),
              mix((230, 200, 172), (40, 54, 92), night))


def asleep(sc, t, u, dur):
    sc.lights = []
    overworld(sc, t, night=1.0, seed=131, houses=6, x0=-8.0)
    for i in range(6):
        guy_lie(sc, -8.0 + i * 2.45, 0.0, -6.4, yaw=0.0, h=1.1, c=CROWD[i % 4])
    B.guy(sc, 0.4, 0, -2.6, yaw=0.1, h=1.5, c=KID)
    sc.cam = B.Cam((0.6, lerp(1.7, 1.4, u), lerp(1.8, 0.6, u)), (0, 1.4, -6.0), fov=56)
    sc.sky = ((6, 9, 26), (16, 24, 54), (54, 70, 104))


def best(sc, t, u, dur):
    sc.lights = []
    overworld(sc, t, night=1.0, seed=133, houses=8, x0=-9.6)
    B.guy(sc, 0, 0, -2.8, yaw=0.0, h=1.5, c=KID)
    sc.cam = B.Cam((0, lerp(2.6, 3.4, eio(u)), lerp(2.4, 3.6, eio(u))), (0, 1.4, -8.0), fov=58)
    sc.sky = ((5, 8, 24), (14, 22, 50), (48, 64, 98))


def night_back(sc, t, u, dur):
    sc.lights = []
    street(sc, t, lamps=(-5.0, 3.0), doors=(-9.0, 5.0), z_back=-14, k=0.55)
    B.guy_lie(sc, 0, 0, -3.0, yaw=0.05, h=1.5, c=KID)
    sc.cam = B.Cam((0.2, lerp(1.5, 1.2, u), lerp(1.2, 0.4, u)), (0, 0.8, -4.0), fov=56)


def wick_lie(sc, t, u, dur):
    sc.lights = []
    street(sc, t, lamps=(-5.0, 3.0), doors=(-9.0, 5.0), z_back=-14, k=0.6)
    B.guy_lie(sc, 0.5, 0, -3.0, yaw=0.05, h=1.5, c=KID)
    B.guy_lie(sc, -1.5, 0, -2.7, yaw=-0.05, h=1.75, c=WICK)
    sc.cam = B.Cam((0.3, lerp(1.6, 1.2, u), lerp(1.6, 1.0, u)), (-0.2, 0.7, -3.4), fov=56)


def mum_lie(sc, t, u, dur):
    sc.lights = []
    street(sc, t, lamps=(-5.0, 3.5), doors=(-9.0, 5.0), z_back=-14, k=0.6)
    B.guy_lie(sc, 0.8, 0, -3.2, yaw=0.05, h=1.5, c=KID)
    B.guy_lie(sc, -0.9, 0, -2.9, yaw=-0.05, h=1.75, c=WICK)
    B.guy_lie(sc, 3.0, 0, -3.6, yaw=0.1, h=1.7, c=MUM)
    bucket(sc, 4.2, 0.1, -3.5, 0.42)
    sc.add_glow((4.2, 0.5, -3.5), 2.4, LAVA_C, 0.6)
    sc.cam = B.Cam((0.8, lerp(1.9, 1.4, u), lerp(2.2, 1.4, u)), (0.8, 0.6, -3.4), fov=58)


def hundred(sc, t, u, dur):
    sc.lights = []
    street(sc, t, lamps=(-6.0, 0.0, 6.0), doors=(-10.0, -2.0, 6.0), z_back=-16, k=0.7)
    B.guy(sc, 0, 0, -3.0, yaw=0.15, h=1.8, c=BAKER)
    for row in range(3):
        for i in range(5):
            x = -4.0 + i * 2.2 + (row % 2) * 1.1
            z = -6.2 - row * 2.4
            c = dict(CROWD[(i + row) % 4])
            for key in ("skin", "shirt", "pants", "hair", "shoe"):
                c[key] = shade(c[key], 0.95 - row * 0.08)
            guy_lie(sc, x, 0, z, yaw=0.03, h=1.7, c=c)
    sc.cam = B.Cam((0, lerp(2.0, 3.4, eio(u)), lerp(2.2, 3.4, eio(u))), (0, 0.7, -7.0), fov=56)


def stopped(sc, t, u, dur):
    sc.lights = []
    street(sc, t, lamps=(-6.0, 0.0, 6.0), doors=(-10.0, -2.0, 6.0), z_back=-18, k=0.65)
    for row in range(4):
        for i in range(6):
            x = -6.0 + i * 2.1 + (row % 2) * 1.0
            z = -5.0 - row * 2.3
            c = dict(CROWD[(i * 3 + row) % 4])
            for key in ("skin", "shirt", "pants", "hair", "shoe"):
                c[key] = shade(c[key], 1.0 - row * 0.06)
            guy_lie(sc, x, 0, z, yaw=0.02, h=1.7, c=c)
    sc.cam = B.Cam((0, lerp(3.0, 4.6, eio(u)), lerp(1.8, 2.8, eio(u))), (0, 0.6, -8.5), fov=58)


def button(sc, t, u, dur):
    sc.lights = []
    street(sc, t, lamps=(-4.0, 3.0), doors=(-8.0, 4.5), z_back=-14, k=0.8)
    B.guy_lie(sc, -0.4, 0, -3.2, yaw=0.1, h=1.55, c=KID)
    bell(sc, 2.4, 1.1, -4.6, 0.9, t, ring=1.0 if u > 0.3 else 0.0)
    sc.cam = B.Cam((0.3, lerp(1.6, 1.35, u), lerp(1.6, 0.9, u)), (0.3, 0.9, -3.6), fov=56)

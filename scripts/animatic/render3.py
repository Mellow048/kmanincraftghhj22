#!/usr/bin/env python3
"""Render the animatic MP4 (or contact sheets of its stills).

  python3 scripts/animatic/render3.py --sheets
  python3 scripts/animatic/render3.py --mp4
"""
import argparse
import gc
import os
import subprocess
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import numpy as np
from PIL import Image, ImageChops, ImageDraw

import boxkit as B
import scenekit as K
import shots3 as SH

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SLUG = "in-this-town-nobody-has-ever-slept"
FFMPEG = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v9.0.2"
FPS = 30

TIMELINE = [
    (0.00, 1.35, SH.hook_ground),
    (1.35, 3.00, SH.hook_town),
    (3.00, 4.86, SH.cellar_gate),
    (4.86, 6.11, SH.aim),
    (6.11, 8.02, SH.me),
    (8.02, 10.57, SH.mum_dad),
    (10.57, 13.38, SH.mum_point),
    (13.38, 14.52, SH.why),
    (14.52, 17.12, SH.rows),
    (17.12, 19.39, SH.lava_up),
    (19.39, 22.51, SH.water),
    (22.51, 25.05, SH.marks),
    (25.05, 26.93, SH.lie_street),
    (26.93, 29.16, SH.want),
    (29.16, 30.85, SH.tried),
    (30.85, 34.60, SH.square),
    (34.60, 36.17, SH.lick),
    (36.17, 38.77, SH.wool),
    (38.77, 41.61, SH.fake_bed),
    (41.61, 44.45, SH.safe),
    (44.45, 47.23, SH.cellar_bed),
    (47.23, 49.77, SH.carry),
    (49.77, 51.52, SH.watch),
    (51.52, 52.71, SH.lie_down),
    (52.71, 55.15, SH.boom),
    (55.15, 57.34, SH.roof),
    (57.34, 60.22, SH.ash),
    (60.22, 62.10, SH.gone),
    (62.10, 64.74, SH.cold),
    (64.74, 67.41, SH.job),
    (67.41, 71.11, SH.frame_shot),
    (71.11, 74.88, SH.list_shot),
    (74.88, 77.89, SH.wick_sit),
    (77.89, 79.97, SH.wick_face),
    (79.97, 82.14, SH.sky_memory),
    (82.14, 85.04, SH.door_out),
    (85.04, 87.29, SH.short),
    (87.29, 90.19, SH.reason),
    (90.19, 92.89, SH.flint_shot),
    (92.89, 94.42, SH.lit_shot),
    (94.42, 97.42, SH.other_sky),
    (97.42, 100.40, SH.asleep),
    (100.40, 103.73, SH.best),
    (103.73, 105.50, SH.night_back),
    (105.50, 106.92, SH.wick_lie),
    (106.92, 109.53, SH.mum_lie),
    (109.53, 111.53, SH.hundred),
    (111.53, 114.13, SH.stopped),
    (114.13, 116.57, SH.button),
]

DAY = ((96, 130, 186), (176, 198, 226), (236, 208, 176))
NIGHT = ((6, 9, 26), (16, 24, 54), (54, 70, 104))
DUSK = ((30, 32, 48), (52, 56, 78), (70, 70, 88))
NETHER = ((22, 7, 11), (68, 17, 24), (140, 44, 20))


def lerpc(a, b, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def sky_for(fn, u):
    if fn is SH.sky_memory or fn is SH.other_sky:
        t = u * u * (3 - 2 * u)
        return (lerpc(DAY[0], NIGHT[0], t), lerpc(DAY[1], NIGHT[1], t), lerpc(DAY[2], NIGHT[2], t)), t
    if fn is SH.asleep or fn is SH.best:
        return NIGHT, 1.0
    if fn is SH.door_out:
        return (lerpc(DUSK[0], NIGHT[0], u), lerpc(DUSK[1], NIGHT[1], u),
                lerpc(DUSK[2], NIGHT[2], u)), 1.0
    return NETHER, 0.0


ZOOM = {
    "hook_town": 1.02, "reason": 1.02, "hundred": 1.06, "stopped": 1.02, "best": 1.04,
    "asleep": 1.12, "other_sky": 1.08, "sky_memory": 1.06, "marks": 1.10, "rows": 1.06,
    "cold": 1.08, "mum_lie": 1.10, "wick_lie": 1.14, "carry": 1.10, "job": 1.12,
}
CENTER_Y = 0.50
DOLLY = {'hook_town': 0.0, 'reason': 0.1, 'hundred': 0.15, 'stopped': 0.1, 'best': 0.2,
         'why': -1.1, 'water': -1.1, 'lick': -0.9, 'flint_shot': -0.9, 'wick_face': -0.6,
         'aim': 0.1, 'marks': 0.2, 'rows': 0.1, 'cold': 0.15, 'asleep': 0.2, 'other_sky': 0.15}


def finish(img, light, zoom):
    li = light.resize((K.CW, K.CH), Image.BICUBIC)
    img = ImageChops.add(img, li)
    cw, ch = K.CW / zoom, K.CH / zoom
    cx, cy = K.CW * 0.5, K.CH * CENTER_Y
    box = (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2)
    img = img.crop(box)
    img = ImageChops.multiply(img, K.VIG.crop(box))
    return img.resize((K.W, K.H), Image.LANCZOS)


def render_frame(t, table):
    row = table[0]
    for r in table:
        if t < r[1]:
            row = r
            break
    else:
        row = table[-1]
    a, b, fn = row
    u = min(1.0, max(0.0, (t - a) / max(1e-4, b - a)))
    sky, night = sky_for(fn, u)
    img = K.grad("sky%s" % (sky,), sky[0], sky[1], sky[2], 0.62).copy()
    if night > 0.05:
        d0 = ImageDraw.Draw(img)
        rnd = np.random.RandomState(7)
        for i in range(120):
            x = rnd.uniform(0, K.CW)
            y = rnd.uniform(0, K.CH * 0.55)
            r = rnd.uniform(1.2, 2.6) * K.S
            c = 210 + int(rnd.uniform(0, 45))
            d0.ellipse([x - r, y - r, x + r, y + r], fill=(c, c, min(255, c + 8)))
    light = Image.new("RGB", (K.LW, K.LH), (0, 0, 0))
    ld = ImageDraw.Draw(light)
    sc = B.Scene(B.Cam((0, 1.6, 3), (0, 1.4, 0), 56), [], lightmap=light, ld=ld)
    fn(sc, t - a, u, b - a)
    sc.dolly(DOLLY.get(fn.__name__, 0.25))
    sc.draw(img)
    return finish(img, light, ZOOM.get(fn.__name__, 1.06))


def sheets(table):
    os.makedirs("/tmp/at", exist_ok=True)
    cells = []
    for (a, b, fn) in table:
        t = a + (b - a) * 0.62
        cells.append((fn.__name__, render_frame(t, table).resize((180, 320), Image.LANCZOS)))
    per = 24
    for s in range(0, len(cells), per):
        chunk = cells[s:s + per]
        sheet = Image.new("RGB", (180 * 4, 320 * 6), (0, 0, 0))
        for i, (name, im) in enumerate(chunk):
            sheet.paste(im, ((i % 4) * 180, (i // 4) * 320))
        p = "/tmp/at/s3_%d.jpg" % (s // per)
        sheet.save(p, quality=88)
        print(p, len(chunk))


def seg(table, out, f0, f1):
    raw = subprocess.Popen(
        [FFMPEG, "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
         "-s", "%dx%d" % (K.W, K.H), "-r", str(FPS), "-i", "-",
         "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
         "-profile:v", "high", "-level", "4.1", out], stdin=subprocess.PIPE)
    t0 = time.time()
    for i in range(f0, f0 + f1):
        raw.stdin.write(render_frame(i / FPS, table).tobytes())
        if (i - f0) % 120 == 0:
            el = time.time() - t0
            print("frame %4d/%d  %.0f%%  %.1f fps" % (i - f0, f1, 100.0 * (i - f0) / f1,
                                                      (i - f0) / max(0.01, el)), flush=True)
        if (i - f0) % 250 == 0:
            gc.collect()
    raw.stdin.close()
    raw.wait()
    print("segment done %.1f min -> %s" % ((time.time() - t0) / 60, out), flush=True)


def mux(total, parts, out):
    subprocess.run(
        [FFMPEG, "-v", "error", "-y"] + sum([["-i", p] for p in parts], []) +
        ["-i", os.path.join(ROOT, "public/audio", SLUG, "narration.mp3"),
         "-i", os.path.join(ROOT, "Topics/InThisTown/InThisTownMusic.aac"),
         "-filter_complex",
         "[0:v]concat=n=%d:v=1:a=0[v];"
         "[%d:a]aresample=48000,volume=1.0[a1];"
         "[%d:a]aresample=48000,atrim=0:%f,asetpts=N/SR/TB,volume=0.15,"
         "afade=t=in:st=0:d=2,afade=t=out:st=%f:d=2.5[a2];"
         "[a1][a2]amix=inputs=2:duration=first:dropout_transition=0,alimiter=limit=0.95[aout]"
         % (len(parts), len(parts), len(parts) + 1, total, max(0.1, total - 2.5)),
         "-map", "[v]", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
         "-ar", "48000", "-movflags", "+faststart", "-shortest", out], check=True)
    print("muxed ->", out)


def mp4(table, out):
    total = table[-1][1]
    raw = subprocess.Popen(
        [FFMPEG, "-v", "error", "-y",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "%dx%d" % (K.W, K.H), "-r", str(FPS),
         "-i", "-",
         "-i", os.path.join(ROOT, "public/audio", SLUG, "narration.mp3"),
         "-i", os.path.join(ROOT, "Topics/InThisTown/InThisTownMusic.aac"),
         "-filter_complex",
         "[1:a]aresample=48000,volume=1.0[a1];"
         "[2:a]aresample=48000,atrim=0:%f,asetpts=N/SR/TB,volume=0.15,"
         "afade=t=in:st=0:d=2,afade=t=out:st=%f:d=2.5[a2];"
         "[a1][a2]amix=inputs=2:duration=first:dropout_transition=0,"
         "alimiter=limit=0.95[aout]" % (total, max(0.1, total - 2.5)),
         "-map", "0:v", "-map", "[aout]",
         "-c:v", "libx264", "-preset", "medium", "-crf", "20",
         "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.1",
         "-c:a", "aac", "-b:a", "160k", "-ar", "48000",
         "-movflags", "+faststart", "-shortest", out],
        stdin=subprocess.PIPE)
    frames = int(round(total * FPS))
    t0 = time.time()
    for i in range(frames):
        im = render_frame(i / FPS, table)
        raw.stdin.write(im.tobytes())
        if i % 120 == 0:
            el = time.time() - t0
            fps = i / max(0.01, el)
            print("frame %4d/%d  %.0f%%  %.1f fps  eta %.1f min"
                  % (i, frames, 100.0 * i / frames, fps, (frames - i) / max(0.1, fps) / 60),
                  flush=True)
    raw.stdin.close()
    raw.wait()
    print("done in %.1f min -> %s" % ((time.time() - t0) / 60, out))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sheets", action="store_true")
    ap.add_argument("--mp4", action="store_true")
    ap.add_argument("--seg", nargs=2, type=int, metavar=("FROM", "TO"))
    ap.add_argument("--mux", action="store_true")
    a = ap.parse_args()
    table = TIMELINE
    if a.sheets:
        sheets(table)
    total = table[-1][1]
    frames = int(round(total * FPS))
    if a.seg:
        f0, f1 = a.seg
        seg(table, "/tmp/at/seg%d.mp4" % f0, f0, min(f1, frames) - f0)
    if a.mux:
        parts = ["/tmp/at/seg0.mp4", "/tmp/at/seg%d.mp4" % (frames // 2)]
        mux(total, parts, os.path.join(ROOT, "renders", SLUG + ".mp4"))
    if a.mp4:
        out = os.path.join(ROOT, "renders", SLUG + ".mp4")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        mp4(table, out)


if __name__ == "__main__":
    main()

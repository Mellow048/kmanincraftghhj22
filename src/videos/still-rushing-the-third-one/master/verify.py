"""Check this Short's baked practice, then (optionally) the *decoded deliverable*.

Usage: python3 master/verify.py BAKED_DIRECTORY [MASTER.mp4]
Geometry in frame is not a substitute for looking at contact and occlusion. See the review.
"""

import argparse
import json
import math
import os
from pathlib import Path
import shutil
import subprocess

import numpy as np

FILM = Path(__file__).resolve().parents[1]
ROOT = FILM.parents[2]
DRILLS = ("1.trial", "3.reps", "5.drill", "7.echo")
CORE = np.array(
    [0xCC, 0x8A, 0x45]
)  # one toasted centre per kernel, including the ones resting in tubs


def check_bake(bake):
    db = json.loads((bake / "frames.json").read_text())
    timing = json.loads((FILM / "timing.json").read_text())
    score = json.loads((FILM / "sound.json").read_text())
    frames, fps = db["frames"], db["fps"]
    assert timing["wordTiming"] == "aligned"
    assert [f["n"] for f in frames] == list(range(db["total"]))
    assert round(timing["duration"] * fps) == len(frames)
    with (bake / "acting.bin").open("rb") as inst:

        def centres(f):
            inst.seek(f["byte"])
            a = np.frombuffer(inst.read(80 * f["count"]), "<f4").reshape(-1, 20)
            return a[(np.round(a[:, 16:19] * 255) == CORE).all(axis=1), 12:15]

        for cue in DRILLS:
            c = next(c for c in timing["cues"] if c["id"] == cue)
            words = [w for w in timing["words"] if c["start"] <= w["s"] < c["end"]]
            assert [w["w"].rstrip("!").upper() for w in words] == ["HUS"] * 3
            release = [
                e["at"] for e in score["sfx"] if e["cue"] == cue and e["sfx"] == "zip"
            ]
            contact = [
                e["at"]
                for e in score["sfx"]
                if e["cue"] == cue and e["sfx"] in ("plink", "bonk")
            ]
            assert len(release) == len(contact) == 3
            in_picture = []
            for w, r, h in zip(words, release, contact):
                assert (
                    abs(c["start"] + r - w["s"]) < 0.001
                )  # the sound and the flick use the same breath
                a = math.ceil(w["s"] * fps - 1e-7)
                b = round((w["s"] + 0.5 * (h - r)) * fps)
                assert all(f["cue"] == cue for f in frames[a : b + 1])
                assert frames[a]["cap"] and frames[a]["cap"][0] == "HUS"
                start, mid = centres(frames[a]), centres(frames[b])
                # Exclude static popcorn and the tub's small bob. Find actual displaced kernels, not camera motion.
                airborne = mid[
                    np.linalg.norm(mid[:, None] - start[None, :], axis=2).min(axis=1)
                    > 0.16
                ]
                vp = np.asarray(frames[b]["vp"]).reshape(4, 4, order="F")
                clip = np.c_[airborne, np.ones(len(airborne))] @ vp.T
                ndc = clip[:, :3] / clip[:, 3:4]
                visible = ((abs(ndc) < 1).all(axis=1) & (clip[:, 3] > 0)).sum()
                assert visible >= (3 if cue == "7.echo" else 1), (cue, w["s"], visible)
                in_picture.append(int(visible))
            if cue == "5.drill":
                assert release[2] - release[1] > 1.7 * (release[1] - release[0])
            print(
                f"{cue}: releases {[w['s'] for w in words]}s; displaced kernels inside the lens {in_picture}"
            )
    return db


def check_mux(master, db):
    import imageio_ffmpeg

    ff = imageio_ffmpeg.get_ffmpeg_exe()
    compositor = ROOT / "node_modules/@remotion/compositor-linux-x64-gnu"
    fp = shutil.which("ffprobe") or str(compositor / "ffprobe")
    env = dict(
        os.environ,
        LD_LIBRARY_PATH=os.pathsep.join(
            [str(compositor), os.getenv("LD_LIBRARY_PATH", "")]
        ),
    )
    data = json.loads(
        subprocess.check_output(
            [
                fp,
                "-v",
                "error",
                "-count_frames",
                "-show_streams",
                "-of",
                "json",
                str(master),
            ],
            env=env,
        )
    )
    (v,) = (s for s in data["streams"] if s["codec_type"] == "video")
    (a,) = (s for s in data["streams"] if s["codec_type"] == "audio")
    assert (
        v["width"],
        v["height"],
        v["avg_frame_rate"],
        v["codec_name"],
        v["pix_fmt"],
    ) == (1080, 1920, "30/1", "h264", "yuv420p")
    assert int(v["nb_read_frames"]) == db["total"]
    assert (a["codec_name"], a["sample_rate"], a["channels"]) == ("aac", "48000", 2)
    assert abs(float(v["duration"]) - float(a["duration"])) < 1 / db["fps"]
    print(
        f"Decoded {v['nb_read_frames']} H.264 frames; {v['duration']}s video, {a['duration']}s AAC stereo."
    )

    sr = 8000

    def mono(path):
        return np.frombuffer(
            subprocess.check_output(
                [
                    ff,
                    "-v",
                    "error",
                    "-i",
                    str(path),
                    "-map",
                    "0:a:0",
                    "-ac",
                    "1",
                    "-ar",
                    str(sr),
                    "-f",
                    "f32le",
                    "-",
                ]
            ),
            "<f4",
        )

    ref = mono(ROOT / "public/audio" / FILM.name / "mix.mp3")
    out = mono(master)
    pad = sr // 10
    for sec in (0.24, 30.15, 52.3, 64.05, 83.44):
        at = round(sec * sr)
        window = ref[at - pad : at + sr + pad]
        cue = out[at : at + sr]
        # Cross-correlation in a ±100 ms window, not just two files reporting the same duration.
        dot = np.correlate(window, cue, mode="valid")
        energy = np.cumsum(np.r_[0.0, window.astype("f8") ** 2])
        corr = dot / np.sqrt((energy[sr:] - energy[:-sr]) * np.dot(cue, cue))
        hit = int(np.argmax(corr))
        print(
            f"{sec:5.2f}s: mix correlation {corr[hit]:.5f}, offset {(hit - pad) / sr * 1000:+.2f} ms"
        )
        assert corr[hit] > 0.985 and abs(hit - pad) < sr / db["fps"], (
            sec,
            hit,
            corr[hit],
        )


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("bake", type=Path)
    p.add_argument("master", type=Path, nargs="?")
    args = p.parse_args()
    db = check_bake(args.bake)
    if args.master:
        check_mux(args.master, db)

#!/usr/bin/env python3
"""Build the InThisTown narration spine from the recorded clips.

Measured, not estimated: every clip start in the output is the real sample offset of that
clip in the joined track, and every cue start is that plus a share of the clip's real
duration by word weight. Writes a wav, an mp3, and a cue table.

Usage: python3 scripts/animatic_audio.py <slug>
"""
import json
import math
import os
import subprocess
import sys
import wave

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FFMPEG = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v9.0.2"
SR = 44100
TEMPO = 1.27
PAD = 0.03  # seconds of room kept either side of the speech after trimming

# clip -> (wait before this clip, cues)
SCRIPT = [
    ("01-hook", 0.0, [
        ("1.work", "In this town, everybody works. Nobody has ever slept."),
        ("1.bed", "One bed is locked in the cellar."),
        ("1.aim", "I want to sleep on it."),
    ]),
    ("02-who", 0.3, [
        ("2.me", "Except me. I stop all the time."),
        ("2.mum", "My mum carries lava. My dad grows the mushrooms."),
        ("2.door", "I asked where we came from. She pointed at the floor."),
        ("2.why", "Nobody would say why."),
    ]),
    ("03-life", 0.3, [
        ("3.rows", "We grow mushrooms in rows under the glowstone."),
        ("3.lava", "We carry the lava up from the lake in buckets."),
        ("3.water", "We have never seen water. It steamed on the stones and was gone."),
        ("3.marks", "We count the shifts in chalk. Four thousand of them."),
        ("3.lie", "Nobody here has ever lain down but me."),
        ("3.want", "All I have ever wanted was one night's sleep."),
    ]),
    ("04-tries", 0.3, [
        ("4.tried", "So I tried everything."),
        ("4.square", "I lay down in the square. Four hundred people walked over me."),
        ("4.lick", "A strider licked my face."),
        ("4.wool", "I tried to build a bed. There are no sheep."),
        ("4.fake", "So I made one out of planks and a red blanket."),
        ("4.safe", "Nothing happened. So I thought beds were safe."),
    ]),
    ("05-bed", 0.3, [
        ("5.cellar", "So I took the cellar one. It was half burnt."),
        ("5.crowd", "I carried it out in front of the whole town."),
        ("5.watch", "\"Watch,\" I said. \"This is sleeping.\""),
        ("5.lie", "And I lay down on it."),
        ("5.boom", "I did not know yet that beds explode here."),
        ("5.roof", "The roof went up, and the shed with it."),
    ]),
    ("06-price", 0.4, [
        ("6.ash", "I woke up in the ash with hands on my collar."),
        ("6.soup", "The shed was gone. So was the soup."),
        ("6.cold", "Two hundred people ate cold soup because of me."),
        ("6.job", "For a month I carried lava under the town, alone."),
    ]),
    ("07-door", 0.0, [
        ("7.frame", "I found a black stone frame, and a hole shaped like a bed."),
        ("7.list", "I said it back: the steam, the marks, the burnt bed, the door."),
        ("7.wick", "Old Wick was sitting on the floor. Nobody sits."),
    ]),
    ("08-reveal", 0.0, [
        ("8.boy", "He said this town used to have a morning."),
        ("8.sky", "A sky that went dark, and a door onto grass."),
        ("8.out", "The door went out the night his father did not come back."),
        ("8.short", "It had not been lit in four thousand shifts."),
        ("8.reason", "We were not a town that never slept. We had forgotten how."),
    ]),
    ("09-other-side", 0.5, [
        ("9.flint", "He gave me his flint, kept since he was a boy."),
        ("9.lit", "I lit it, and I stepped through."),
        ("9.sky", "The sky went dark on its own, without anybody doing anything."),
        ("9.asleep", "There was a village under it, and everybody in it was asleep."),
        ("9.best", "Nobody was working. It was the most beautiful thing I had ever seen."),
    ]),
    ("10-back", 0.0, [
        ("10.night", "That night I lay down in the street."),
        ("10.wick", "Old Wick lay down next to me."),
        ("10.mum", "My mum lay down too. She was still holding the bucket."),
        ("10.bex", "Then the baker. Then four hundred people."),
        ("10.stopped", "Not one of us was asleep. Every one of us had stopped."),
    ]),
    ("11-button", 0.0, [
        ("11.sub", "Like and subscribe. I am not getting up for the bell."),
    ]),
]


def decode(path):
    raw = subprocess.run(
        [FFMPEG, "-v", "error", "-i", path, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
        check=True, stdout=subprocess.PIPE).stdout
    return np.frombuffer(raw, dtype="<i2").astype(np.float32) / 32768.0


def write_wav(path, mono):
    pcm = np.clip(mono, -1.0, 1.0)
    pcm = (pcm * 32767.0).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def trim(mono):
    if mono.size == 0:
        return mono
    peak = float(np.max(np.abs(mono)))
    if peak <= 0:
        return mono
    thresh = peak * 0.02
    loud = np.flatnonzero(np.abs(mono) > thresh)
    if loud.size == 0:
        return mono
    a = max(0, loud[0] - int(PAD * SR))
    b = min(mono.size, loud[-1] + int(PAD * SR))
    return mono[a:b]


def tempo(mono, tmpdir, tag):
    src = os.path.join(tmpdir, tag + "-raw.wav")
    dst = os.path.join(tmpdir, tag + "-tempo.wav")
    write_wav(src, mono)
    subprocess.run([FFMPEG, "-v", "error", "-y", "-i", src,
                    "-filter:a", "atempo=%.4f" % TEMPO, dst], check=True)
    return decode(dst)


def word_weight(word):
    w = word.strip(".,;:!?\"'")
    return max(1.0, len(w) * 0.85 + 0.6)


def main():
    slug = sys.argv[1] if len(sys.argv) > 1 else "in-this-town-nobody-has-ever-slept"
    base = os.path.join(ROOT, "public", "audio", slug)
    raw = os.path.join(base, "raw")
    tmpdir = "/tmp/animatic-audio"
    os.makedirs(tmpdir, exist_ok=True)

    pieces = []
    clip_spans = []
    cursor = 0.0
    for name, wait, cues in SCRIPT:
        if wait:
            pieces.append(np.zeros(int(round(wait * SR)), dtype=np.float32))
            cursor += wait
        clip = tempo(trim(decode(os.path.join(raw, name + ".mp3"))), tmpdir, name)
        dur = clip.size / SR
        clip_spans.append({"clip": name, "start": round(cursor, 4), "end": round(cursor + dur, 4)})
        pieces.append(clip)
        cursor += dur

    master = np.concatenate(pieces)
    total = master.size / SR

    # cue times: real clip span, split by word weight
    cue_rows = []
    for (name, _wait, cues), span in zip(SCRIPT, clip_spans):
        span_dur = span["end"] - span["start"]
        weights = [sum(word_weight(w) for w in text.split()) for _id, text in cues]
        tot = sum(weights) or 1.0
        t = span["start"]
        for (cid, text), wgt in zip(cues, weights):
            d = span_dur * wgt / tot
            cue_rows.append({"id": cid, "start": round(t, 4), "end": round(t + d, 4), "text": text})
            t += d

    wav_path = os.path.join(base, "narration.wav")
    mp3_path = os.path.join(base, "narration.mp3")
    write_wav(wav_path, master)
    subprocess.run([FFMPEG, "-v", "error", "-y", "-i", wav_path, "-c:a", "libmp3lame",
                    "-b:a", "192k", mp3_path], check=True)

    words = sum(len(text.split()) for _n, _w, cs in SCRIPT for _cid, text in cs)
    table = {
        "film": slug,
        "fps": 30,
        "duration": round(total, 4),
        "estimated": False,
        "wordTiming": "clip-measured, word-weighted inside clip",
        "tempo": TEMPO,
        "wordsPerMinute": round(words / (sum(s["end"] - s["start"] for s in clip_spans) / 60.0), 1),
        "words": words,
        "audio": os.path.relpath(mp3_path, ROOT),
        "clips": clip_spans,
        "cues": cue_rows,
    }
    with open(os.path.join(base, "timing-measured.json"), "w") as f:
        json.dump(table, f, indent=1)
    with open(os.path.join(base, "timing-draft.json"), "w") as f:
        json.dump({"clips": [s["clip"] for s in clip_spans],
                   "starts": [s["start"] for s in clip_spans],
                   "ends": [s["end"] for s in clip_spans],
                   "total": round(total, 4), "words": words}, f, indent=1)

    print("total %.2f s  %.0f:%05.2f  %d words  %d cues  %.0f wpm"
          % (total, total // 60, total % 60, words, len(cue_rows), table["wordsPerMinute"]))
    for s in clip_spans:
        print("  %-14s %7.2f -> %7.2f  (%.2f s)" % (s["clip"], s["start"], s["end"], s["end"] - s["start"]))
    for c in cue_rows:
        print("  %-12s %6.2f %6.2f  %s" % (c["id"], c["start"], c["end"], c["text"]))


if __name__ == "__main__":
    main()

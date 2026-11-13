#!/usr/bin/env python3
"""
narration.py — the voice is the clock.

A story film (see src/engine/story.tsx) is cut to its narration. This tool reads
the script, measures the recorded voice, and writes the two files the film needs:

    public/audio/<film>/narration.mp3     one tight voice track
    src/videos/<film>/timing.json         when every word and every shot starts

    python3 scripts/narration.py clips <film>        list the clips to record
    python3 scripts/narration.py build <film>        measure the recordings
    python3 scripts/narration.py build <film> --estimate   no audio yet: guess from words per minute

The script lives in src/videos/<film>/narration.md, inside a ```narration block:

    # clip 01-hook                 <- one recording (one text-to-speech call)
    [1.me]   In this town,         <- one SHOT: the words spoken while it is on screen
    [1.eggs] every kid got a monster egg on their tenth birthday.

Record each clip to public/audio/<film>/raw/<clip>.mp3 (or .wav), then build.

Needs Python 3.9+, numpy, and ffmpeg (system ffmpeg, or `pip install imageio-ffmpeg`).
Word-accurate timing needs `pip install pocketsphinx`; without it the tool spreads
the words across each clip by syllable count and says so.
"""
from __future__ import annotations

import argparse
import json
import math
import os
import re
import shutil
import subprocess
import sys

try:
    import numpy as np
except ImportError:  # pragma: no cover
    sys.exit("narration.py needs numpy:  pip install numpy")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR_ALIGN = 16000
SR_OUT = 44100


# ----------------------------------------------------------------------------- script
def read_script(slug: str):
    path = os.path.join(ROOT, "src", "videos", slug, "narration.md")
    if not os.path.exists(path):
        sys.exit(f"No script at {os.path.relpath(path, ROOT)}")
    raw = open(path, encoding="utf8").read()
    fence = re.search(r"```narration\s*\n(.*?)```", raw, re.S)
    if not fence:
        sys.exit("narration.md has no ```narration block.")
    clips, current, seen = [], None, set()
    for line in fence.group(1).splitlines():
        line = line.strip()
        if not line:
            continue
        m = re.match(r"#\s*clip\s+(\S+)", line)
        if m:
            current = {"name": m.group(1), "cues": []}
            clips.append(current)
            continue
        if line.startswith("#") or line.startswith(">"):
            continue
        m = re.match(r"\[([^\]]+)\]\s*(.+)$", line)
        if not m:
            sys.exit(f"Cannot read this script line (expected `[cue.id] words`): {line}")
        if current is None:
            sys.exit("The first line of the narration block must be `# clip <name>`.")
        cue_id, text = m.group(1).strip(), m.group(2).strip()
        if cue_id in seen:
            sys.exit(f"Cue id used twice: {cue_id}")
        seen.add(cue_id)
        current["cues"].append({"id": cue_id, "text": text})
    clips = [c for c in clips if c["cues"]]
    if not clips:
        sys.exit("The narration block has no lines.")
    return clips


def spoken_words(text: str):
    """The words as they are said: split on spaces, punctuation stays attached for the pause model."""
    return [w for w in text.split() if re.search(r"[A-Za-z0-9]", w)]


def bare(word: str) -> str:
    return re.sub(r"[^a-z0-9']", "", word.lower()).strip("'")


def syllables(word: str) -> int:
    w = re.sub(r"[^a-z]", "", word.lower())
    if not w:
        return 1
    w = re.sub(r"(?:es|ed|e)$", "", w) or w
    return max(1, len(re.findall(r"[aeiouy]+", w)))


def weight(word: str) -> float:
    """Relative time a word takes, including the pause its punctuation asks for."""
    pause = 0.0
    if re.search(r"[.!?][\"”']?$", word):
        pause = 1.6
    elif re.search(r"[,;:][\"”']?$", word):
        pause = 0.7
    return syllables(word) + 0.35 + pause


# ----------------------------------------------------------------------------- audio
def ffmpeg_exe() -> str:
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("ffmpeg not found. Install ffmpeg, or:  pip install imageio-ffmpeg")


def decode(path: str, rate: int, tempo: float = 1.0, start=None, end=None):
    """Mono float samples. Optionally keep only [start, end] seconds, then change the tempo (pitch is kept)."""
    filters = []
    if start is not None and end is not None:
        filters += [f"atrim=start={start:.4f}:end={end:.4f}", "asetpts=PTS-STARTPTS"]
    if abs(tempo - 1.0) > 1e-3:
        filters.append(f"atempo={tempo:.4f}")
    args = [ffmpeg_exe(), "-v", "error", "-i", path, "-ac", "1", "-ar", str(rate)]
    if filters:
        args += ["-af", ",".join(filters)]
    args += ["-f", "f32le", "-"]
    out = subprocess.run(args, check=True, capture_output=True).stdout
    return np.frombuffer(out, dtype=np.float32).copy()


def speech_span(x, rate: int):
    """First and last sample that carry voice."""
    hop = rate // 100
    n = len(x) // hop
    if n == 0:
        return 0, len(x)
    rms = np.sqrt(np.mean(x[: n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12)
    floor = max(rms.max() * 10 ** (-38 / 20), 10 ** (-52 / 20))
    loud = np.where(rms > floor)[0]
    if len(loud) == 0:
        return 0, len(x)
    a = max(0, (loud[0] - 3) * hop)
    b = min(len(x), (loud[-1] + 6) * hop)
    return int(a), int(b)


def find_raw(slug: str, clip: str):
    base = os.path.join(ROOT, "public", "audio", slug, "raw")
    for ext in (".mp3", ".wav", ".m4a", ".ogg", ".flac"):
        p = os.path.join(base, clip + ext)
        if os.path.exists(p):
            return p
    return None


# ----------------------------------------------------------------------------- alignment
# Words the aligner's dictionary lacks, in its own phones. Without them a whole clip is timed by guesswork and the
# captions drift off the voice. Add a word here when `build` says it does not know it.
SAY = {
    "creeper": "K R IY P ER",
    "creepers": "K R IY P ER Z",
    "enderman": "EH N D ER M AE N",
    "endermen": "EH N D ER M EH N",
    "bonked": "B AA NG K T",
    "chestplate": "CH EH S T P L EY T",
    "hideout": "HH AY D AW T",
    "dodgeballs": "D AA JH B AO L Z",
    "massager": "M AH S AA ZH ER",
}

def align(pcm16k, words):
    """[(start, end)] in seconds for each word, or None if the aligner cannot do it."""
    try:
        from pocketsphinx import Decoder
    except ImportError:
        return None
    # Wide beams: this is not recognition. The words are known; only their times are wanted.
    decoder = Decoder(samprate=SR_ALIGN, beam=1e-120, wbeam=1e-90, pbeam=1e-120)
    tokens = []
    for w in words:
        t = bare(w)
        if decoder.lookup_word(t) is None:
            base = re.sub(r"(?:'s|s)$", "", t)
            phones = decoder.lookup_word(base) if base != t else None
            if phones is None and t in SAY:
                decoder.add_word(t, SAY[t], True)
                tokens.append(t)
                continue
            if phones is None:
                print(f"    aligner does not know the word '{t}'; this clip falls back to an estimate")
                return None
            decoder.add_word(t, phones + (" S" if phones.split()[-1] in ("P", "T", "K", "F", "TH") else " Z"), True)
        tokens.append(t)
    # Air before and after: the aligner cannot finish the last word if the sound stops with it.
    pad = 0.3
    air = (np.arange(int(pad * SR_ALIGN)) % 7 - 3).astype(np.float32) * 1e-5
    pcm = np.concatenate([air, np.clip(pcm16k, -1, 1), air])
    try:
        decoder.set_align_text(" ".join(tokens))
        decoder.start_utt()
        decoder.process_raw((pcm * 32767).astype(np.int16).tobytes(), full_utt=True)
        decoder.end_utt()
        segs = [(s.word, s.start_frame / 100.0 - pad, (s.end_frame + 1) / 100.0 - pad) for s in decoder.seg()]
    except Exception as error:  # the aligner raises on audio it cannot fit to the text
        print(f"    aligner failed ({error}); this clip falls back to an estimate")
        return None
    length = len(pcm16k) / SR_ALIGN
    found = [(re.sub(r"\(\d+\)$", "", w), max(0.0, a), min(length, b)) for (w, a, b) in segs if not w.startswith("<")]
    if [w for w, _, _ in found] == tokens:
        return [(a, b) for _, a, b in found]

    # A word or two went missing. Keep every word that was found and share the holes between the rest.
    import difflib

    spans = [None] * len(tokens)
    for block in difflib.SequenceMatcher(a=tokens, b=[w for w, _, _ in found], autojunk=False).get_matching_blocks():
        for k in range(block.size):
            spans[block.a + k] = (found[block.b + k][1], found[block.b + k][2])
    missing = sum(1 for x in spans if x is None)
    if missing > max(2, len(tokens) // 10):
        print(f"    aligner lost {missing} of {len(tokens)} words; this clip falls back to an estimate")
        return None
    i = 0
    while i < len(spans):
        if spans[i] is not None:
            i += 1
            continue
        j = i
        while j < len(spans) and spans[j] is None:
            j += 1
        left = spans[i - 1][1] if i > 0 else 0.0
        right = spans[j][0] if j < len(spans) else length
        step = (right - left) / (j - i)
        for k in range(i, j):
            spans[k] = (left + step * (k - i), left + step * (k - i + 1))
        i = j
    print(f"    aligner lost {missing} word(s); their times are shared out between their neighbours")
    return spans


def spread(words, start: float, end: float):
    """No aligner: share the clip between the words by syllables and punctuation."""
    weights = [weight(w) for w in words]
    total = sum(weights)
    spans, t = [], start
    for w, wt in zip(words, weights):
        d = (end - start) * wt / total
        said = d * (syllables(w) + 0.35) / wt
        spans.append((t, t + said))
        t += d
    return spans


# ----------------------------------------------------------------------------- build
def build(slug: str, wpm: float, tempo_arg: str, gap: float, estimate: bool, fps: int, tail: float, lead: float):
    clips = read_script(slug)
    all_cues = [cue for clip in clips for cue in clip["cues"]]
    n_words = sum(len(spoken_words(c["text"])) for c in all_cues)

    words_out, cue_first_word, clip_info = [], [], []
    measured = False

    if estimate:
        t = 0.0
        per_weight = None
        total_weight = sum(weight(w) for c in all_cues for w in spoken_words(c["text"]))
        per_weight = (n_words / wpm * 60.0) / total_weight
        for clip in clips:
            for cue in clip["cues"]:
                cue_first_word.append(len(words_out))
                for w in spoken_words(cue["text"]):
                    d = weight(w) * per_weight
                    said = (syllables(w) + 0.35) * per_weight
                    words_out.append({"w": w, "s": t, "e": t + said})
                    t += d
        tempo = 1.0
        audio_rel = None
    else:
        raws = []
        for clip in clips:
            p = find_raw(slug, clip["name"])
            if not p:
                sys.exit(f"Missing recording for clip {clip['name']}: public/audio/{slug}/raw/{clip['name']}.mp3")
            raws.append(p)
        # Pass 1: natural pace, to choose one tempo for the whole film.
        natural = 0.0
        for p in raws:
            x = decode(p, SR_ALIGN)
            a, b = speech_span(x, SR_ALIGN)
            natural += (b - a) / SR_ALIGN
        natural_wpm = n_words / natural * 60.0
        tempo = 1.0 if tempo_arg == "1" else (float(tempo_arg) if tempo_arg != "auto" else min(1.6, max(1.0, wpm / natural_wpm)))
        print(f"  voice as recorded: {natural_wpm:.0f} words/min over {natural:.1f}s  ->  tempo x{tempo:.3f}")

        # Pass 2: find each word at the pace it was recorded (the aligner was trained on natural speech),
        # then speed the clip up. A tempo change moves every word time by the same factor.
        track, t = [], 0.0
        for clip, p in zip(clips, raws):
            xn = decode(p, SR_ALIGN)
            a, b = speech_span(xn, SR_ALIGN)
            natural_dur = (b - a) / SR_ALIGN
            clip_words = [w for cue in clip["cues"] for w in spoken_words(cue["text"])]
            spans = align(xn[a:b], clip_words)
            xo = decode(p, SR_OUT, tempo, start=a / SR_ALIGN, end=b / SR_ALIGN)
            dur = len(xo) / SR_OUT
            how = "aligned"
            if spans is None:
                spans = spread(clip_words, 0.0, dur)
                how = "estimated"
            else:
                k = dur / natural_dur  # what the tempo filter really did, measured
                spans = [(s0 * k, e0 * k) for s0, e0 in spans]
                measured = True
            i = 0
            for cue in clip["cues"]:
                cue_first_word.append(len(words_out))
                for w in spoken_words(cue["text"]):
                    s, e = spans[i]
                    words_out.append({"w": w, "s": t + s, "e": t + e})
                    i += 1
            clip_info.append({"name": clip["name"], "at": round(t, 3), "seconds": round(dur, 3), "timing": how})
            print(f"  {clip['name']:<14} {dur:6.2f}s  {len(clip_words):3d} words  {how}")
            fade = int(0.004 * SR_OUT)
            xo[:fade] *= np.linspace(0, 1, fade)
            xo[-fade:] *= np.linspace(1, 0, fade)
            track.append(xo)
            track.append(np.zeros(int(gap * SR_OUT), dtype=np.float32))
            t += dur + gap
        audio = np.concatenate(track[:-1])
        peak = float(np.max(np.abs(audio))) or 1.0
        audio = audio / peak * 0.89
        out_dir = os.path.join(ROOT, "public", "audio", slug)
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "narration.mp3")
        subprocess.run(
            [ffmpeg_exe(), "-v", "error", "-y", "-f", "f32le", "-ar", str(SR_OUT), "-ac", "1", "-i", "-",
             "-af", "loudnorm=I=-15:TP=-1.5:LRA=9", "-ar", str(SR_OUT), "-b:a", "160k", out_path],
            input=audio.astype(np.float32).tobytes(), check=True,
        )
        audio_rel = f"audio/{slug}/narration.mp3"

    # Cuts land a hair before the first word of each line, on a frame boundary.
    q = lambda x: round(x * fps) / fps
    starts = []
    for k, wi in enumerate(cue_first_word):
        if k == 0:
            starts.append(0.0)
            continue
        prev_end = words_out[wi - 1]["e"]
        s = words_out[wi]["s"]
        cut = max(s - lead, prev_end + (s - prev_end) * 0.5) if s > prev_end else s
        starts.append(max(q(cut), starts[-1] + 2 / fps))
    end = q(words_out[-1]["e"] + tail)
    cues = []
    for k, cue in enumerate(all_cues):
        cues.append({"id": cue["id"], "start": round(starts[k], 4), "end": round(starts[k + 1] if k + 1 < len(starts) else end, 4), "text": cue["text"]})

    timing = {
        "film": slug,
        "fps": fps,
        "duration": round(end, 4),
        "estimated": not measured,
        "tempo": round(tempo, 4),
        "wordsPerMinute": round(n_words / words_out[-1]["e"] * 60.0, 1),
        "audio": audio_rel,
        "clips": clip_info,
        "cues": cues,
        "words": [{"w": w["w"], "s": round(w["s"], 3), "e": round(w["e"], 3)} for w in words_out],
    }
    out = os.path.join(ROOT, "src", "videos", slug, "timing.json")
    with open(out, "w", encoding="utf8") as f:
        json.dump(timing, f, indent=1, ensure_ascii=False)
        f.write("\n")

    durs = sorted(c["end"] - c["start"] for c in cues)
    print(f"\n  {len(cues)} shots, {n_words} words, {end:.1f}s, {timing['wordsPerMinute']:.0f} words/min"
          f"{' (ESTIMATED: no audio measured)' if not measured else ''}")
    print(f"  shot length: shortest {durs[0]:.2f}s, median {durs[len(durs)//2]:.2f}s, longest {durs[-1]:.2f}s")
    long = [c for c in cues if c["end"] - c["start"] > 6.0]
    for c in long:
        print(f"  ! {c['id']} runs {c['end']-c['start']:.1f}s — split the line into two shots")
    print(f"  wrote {os.path.relpath(out, ROOT)}" + (f" and public/{audio_rel}" if audio_rel else ""))


def list_clips(slug: str):
    clips = read_script(slug)
    total = 0
    for clip in clips:
        text = " ".join(cue["text"] for cue in clip["cues"])
        total += len(text)
        have = "recorded" if find_raw(slug, clip["name"]) else "NOT recorded"
        print(f"\n--- {clip['name']}  ({len(text)} characters, {len(spoken_words(text))} words, {have})")
        print(f"    save as public/audio/{slug}/raw/{clip['name']}.mp3")
        print(text)
    print(f"\n{len(clips)} clips, {total} characters.")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Narration timing for story films.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("clips"); c.add_argument("film")
    b = sub.add_parser("build"); b.add_argument("film")
    b.add_argument("--wpm", type=float, default=255.0, help="target pace; the voice is sped up to reach it (default 255)")
    b.add_argument("--tempo", default="auto", help="'auto' (reach --wpm, at most x1.6), or a number such as 1.3")
    b.add_argument("--gap", type=float, default=0.08, help="seconds of air between two clips (default 0.08)")
    b.add_argument("--estimate", action="store_true", help="no recordings yet: time the words from --wpm alone")
    b.add_argument("--fps", type=int, default=30)
    b.add_argument("--tail", type=float, default=0.5, help="seconds held after the last word")
    b.add_argument("--lead", type=float, default=0.06, help="how far before a line's first word its shot cuts in")
    args = ap.parse_args()
    if args.cmd == "clips":
        list_clips(args.film)
    else:
        build(args.film, args.wpm, args.tempo, args.gap, args.estimate, args.fps, args.tail, args.lead)

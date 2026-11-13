# The reference film: "What If You Could See Who Had a Crush on You"

This is what a finished film of this topic looks like and sounds like. It is the topic's first film and its
reference: nobody sent a video to measure, the owner asked us to make the reference ourselves ("you are the one
making that reference!"). He approved its script on 2026-11-13 ("yesboth"), watched the finished film the same day,
and said of it and of the first explainer together:

> "okay i love both really, this can be uploaded too!"
>
> "i like how you made these!"

## Where everything is

In this folder:

| File | What it is |
|---|---|
| `contact-sheet-one-frame-per-shot.jpg` | One frame of the delivered film for each of the 55 shots, with its cue and its time. **Read this first** |
| [`shot-log.md`](shot-log.md) | Every shot: when, how long, the words, the place, the camera, and why this picture |
| `source/narration.md` | The script: the premise in four sentences, the rule of the power and its limit, the price, what is planted and where it pays off, and the faults that were left in |
| `source/scene1.tsx` … `scene14.tsx` | The shots, one file for each beat |
| `source/kit.tsx` | How a film uses the pack: its teller, the two or three people it is about, its map of places, and `joHeart`, the one function that keeps the story honest |
| `source/world.tsx` | Six places laid out in zones |
| `source/sound.json` | The sound sheet: 321 sounds |
| `source/film.tsx`, `timing.json`, `sound.lock.json` | The film's definition, the voice measured word by word, and the numbers of the mix |

The film itself is not copied into this folder: it is `renders/what-if-you-could-see-who-had-a-crush-on-you.mp4`
(720×1280, 45 MB, with its sound). The 1080×1920 master is the asset of release `render-44`.

`source/` is a snapshot to read: it is not compiled and nothing imports it. The film that renders lives in
`src/videos/what-if-you-could-see-who-had-a-crush-on-you/`, and its voice and mix in
`public/audio/what-if-you-could-see-who-had-a-crush-on-you/`. An approved film does not change, so the two are the
same; if they ever differ, the one in `src/videos/` is the film.

## Its shape, measured

55 shots, 479 words, 1:53.6 (113.6 s), 254 words a minute. Fourteen beats: the beat sheet in
[`../../SCRIPT.md`](../../SCRIPT.md) is this table.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | The question | 0:00.0 | 3.0 | 15 | 2 |
| 2 | The day it came | 0:03.0 | 8.2 | 34 | 4 |
| 3 | The rule | 0:11.1 | 10.2 | 46 | 5 |
| 4 | The fun | 0:21.3 | 10.6 | 40 | 4 |
| 5 | The wish | 0:31.9 | 6.5 | 29 | 3 |
| 6 | The plant (Jo) | 0:38.4 | 8.1 | 37 | 4 |
| 7 | The first try | 0:46.5 | 7.8 | 34 | 4 |
| 8 | The second try | 0:54.3 | 10.2 | 43 | 5 |
| 9 | The friend, and the price | 1:04.5 | 6.3 | 26 | 3 |
| 10 | The edge (Friday) | 1:10.7 | 12.6 | 50 | 6 |
| 11 | The act (the ask) | 1:23.3 | 3.5 | 15 | 3 |
| 12 | The wait (the answer he wanted) | 1:26.8 | 5.1 | 22 | 3 |
| 13 | The reveal | 1:31.9 | 13.7 | 59 | 6 |
| 14 | The button (the old way) | 1:45.6 | 8.0 | 29 | 3 |

- **In thirds:** the power, the fun, the wish and the plant (beats 1–6) take 41% of the film; the two tries and
  the price (7–9) 21%; the edge, the act and the answer (10–14) 38%.
- **Shots:** the median holds 1.97 s, the shortest 0.90 s, the longest 3.50 s. 1 is under a second and 4 are over
  three. About 8.7 words to a picture.
- **Camera:** 45 of the 55 shots are a `cam.push`; the rest are 2 trucks, 1 orbit, 1 top shot and 6 moves set by
  hand. Every shot moves.
- **Places:** the gym and its yard 16 shots, the classroom 14, the hall 11, the lunch room 7, the kitchen 4, his
  room 3.
- **The longest beats** are the reveal (59 words), the edge (50) and the rule (46), in that order.
- **Who speaks:** one teller, first person, past tense. One other person says three words (Jo, 9.ask).
- **The first line and the last:** "What if you could see who had a crush on you?" and "Subscribe, and I will tell
  you what she threw at me."

## Its sound, measured

Built by `scripts/sound.py` from `sound.json`. The agent that made it could not listen; these are the numbers of
the mix in the film the owner then approved.

| | |
|---|---|
| Music | 8 sections and one silence: `wonder` → `curious` → `playful` → `curious` → `tense` → `hope` → (silence) → `sad` → `hope` |
| Music under the voice | 18.6 dB. 2.3 s of the film has no music, before the reveal |
| The air of each place | 18 beds, 28.4 dB under the voice |
| Sound effects | 321, of 39 kinds: 170 a minute. The longest stretch without one is 2.1 s |
| The voice over everything else | 12.8 dB on the median; 3.7 dB in the worst half second |
| The file | -14.9 LUFS, true peak -0.8 dB (the delivered mp4: -15.0 LUFS, -0.3 dB) |

How it is put together (one sound for the power, one note for the heart that matters, the cause of a swelling heart
in one ear) is written down in [`../../SOUND.md`](../../SOUND.md), "How the first film does it".

## What was hard

The picture took several passes of stills, and one more after the first render. What they found is
[`../../SHOTS.md`](../../SHOTS.md) §5, so that the next film does not find it again: who stands between the lens and
a face, what a sign does when it is as big as a door, words in the picture, night, a mirror. Two things no still
showed and only the frames of the rendered film did: runners who were black against a lit door (10.dance), and
whether the sound was in step with the picture. Check every render with `python3 scripts/render-check.py <film>
--sheet`.

The faults that were seen and kept are listed in `source/narration.md`, "What was left in". The owner watched the
film with them in it.

## How to use it

- **Build like it.** The same order of work, the same kind of shot, the same density of cuts and sounds. When a
  number of yours is far from a number on this page, look at why.
- **Use its parts.** They are in the pack ([`../../PACK.md`](../../PACK.md)). Do not rebuild a classroom, a lunch
  room or a classmate.
- **Keep its one rule about a power:** the look of the power never changes, and what it shows changes only when
  the thing it is about changes. In this film that is one function of a distance (`joHeart`). No sign swells on a
  word.
- **Never retell it.** No premise, sentence, joke or twist of this film goes into another: not a heart over a
  head, not the biggest heart in school, not the eraser, not the dog who said yes, not the card and the dance, not
  "over my shoulder", not "out loud". A new film borrows the shape and nothing else.
- **It does not change.** If you touch the engine or the pack, prove with `scripts/compare-stills.py` that every
  still of this film is the same as before.

# The reference film: "In This Town, Everyone Had the Same Face Except Me"

This is what a finished film of this topic looks like and sounds like. The owner approved the picture ("everything
is perfect top to bottom", "i like the assets") and then the film with its sound, and made it the reference:

> "yes its good put it as the topic's reference"

The treehouse video in [`../treehouse/`](../treehouse/README.md) is where the **format** came from: a Roblox video,
studied and never copied. This film is our own, in Minecraft blocks, and it is the one to build like.

## Where everything is

In this folder:

| File | What it is |
|---|---|
| `in-this-town-same-face.mp4` | The film as delivered: 720×1280, 1:45, with its sound. A copy of `renders/in-this-town-same-face.mp4`. The 1080×1920 master is the asset of release `render-15` |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of that file for each of the 57 shots, with its number, its cue and its time. **Read this first** |
| [`shot-log.md`](shot-log.md) | Every shot: when, how long, the words, the place, the camera, and why this picture |
| `source/narration.md` | The script, with what is planted and where it pays off |
| `source/scene1.tsx` … `scene14.tsx` | The shots, one file for each beat |
| `source/kit.tsx` | How a film uses the pack: its teller, its map of places, and nothing a second film could use |
| `source/world.tsx` | A town laid out in zones |
| `source/sound.json` | The sound sheet |
| `source/film.tsx`, `timing.json`, `sound.lock.json` | The film's definition, the voice measured word by word, and the numbers of the mix |

`source/` is a snapshot to read: it is not compiled and nothing imports it. The film that renders lives in
`src/videos/in-this-town-same-face/`, and its voice and mix in `public/audio/in-this-town-same-face/`. An approved
film does not change, so the two are the same; if they ever differ, the one in `src/videos/` is the film.

Its people, places and things are in the pack, for the next film: [`../../PACK.md`](../../PACK.md). The other films
the owner approved are beside this one: [`../README.md`](../README.md).

## Its shape, measured

57 shots, 441 words, 1:44.7 (104.7 s), 254 words a minute. This is the topic's **short cut**
(`cut: "short"`): 14 of the 18 beats in `SCRIPT.md`.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Hook | 0:00.0 | 2.6 | 10 | 2 |
| 2 | Three mysteries | 0:02.6 | 5.7 | 27 | 3 |
| 3 | The tour | 0:08.3 | 15.2 | 60 | 8 |
| 4 | The itch | 0:23.6 | 2.4 | 11 | 2 |
| 5 | The oldest villager | 0:26.0 | 8.7 | 37 | 4 |
| 6 | The decision | 0:34.7 | 3.3 | 16 | 2 |
| 7 | He walks up the hill | 0:38.0 | 9.0 | 39 | 5 |
| 8 | He goes under it | 0:47.0 | 5.7 | 25 | 3 |
| 9 | The friend | 0:52.7 | 5.6 | 23 | 3 |
| 10 | The edge | 0:58.3 | 9.5 | 36 | 5 |
| 11 | The other side | 1:07.7 | 10.4 | 36 | 6 |
| 12 | Far from home | 1:18.1 | 6.3 | 28 | 4 |
| 13 | What the hands were doing | 1:24.4 | 13.5 | 64 | 7 |
| 14 | The wave | 1:38.0 | 6.7 | 29 | 3 |

- **In thirds:** the world and the question (beats 1–6) take 36% of the film, the attempts and the friend
  (7–9) 19%, the act and the answer (10–14) 44%.
- **Shots:** the median holds 1.70 s, the shortest 0.77 s, the longest 3.17 s. 3 are under a second and 1 is
  over three. About 7.7 words to a picture.
- **Camera:** 42 of the 57 shots are a `cam.push`; the rest are 3 orbits, 3 trucks, 2 pans and 7 moves set
  by hand. Every shot moves.
- **Before second 12:** "nobody" is said three times, and the tour has begun.

## Its sound, measured

Built by `scripts/sound.py` from `sound.json`. The agent that made it could not listen; these are the numbers of
the mix in the film the owner then approved.

| | |
|---|---|
| Music | 11 sections, one of them silence: `town` → `curious` → `playful` → `sneak` → `tense` → `drone` → `hope` → `none` → `dark` → `sad` → `dark` |
| Music under the voice | 18.6 dB. 4.5 s of the film has no music, before the reveal |
| The air of each place | 14 beds, 24.0 dB under the voice |
| Sound effects | 141, of 35 kinds: 81 a minute. The longest stretch without one is 3.9 s |
| The voice over everything else | 14.2 dB on the median; 5.7 dB in the worst half second |
| The file | -14.8 LUFS, true peak -1.4 dB |

## How to use it

- **Build like it.** The same order of work, the same kind of shot, the same density of cuts and sounds. When a
  number of yours is far from a number on this page, look at why.
- **Use its parts.** They are in the pack. Do not rebuild a villager or a house.
- **Never retell it.** No premise, sentence, joke or twist of this film goes into another: not the one face, not
  the hill, not the tunnel, not "hmm", not the wave. A new film borrows the shape and nothing else.
- **It does not change.** If you touch the engine or the pack, prove with `scripts/compare-stills.py` that every
  still of this film is the same as before.

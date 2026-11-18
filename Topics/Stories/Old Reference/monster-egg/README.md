# Reference: "In This Town: The Monster Egg"

**The long cut.** The first full film of this topic: 18 beats, 93 shots, 746 words, 2:56.7. A kid will not throw away
his cracked monster egg, hatches it in the lava lake no kid may visit, and learns too late why the town never keeps
one.

The owner, 2026-11-13, on the films this agent had built for him, this one among them: **"every single one u made is
good"**. He asked for its source and its mp4 to be kept here, "so that other agents know how to make a good short".

> **It has a voice and no other sound.** It was made before the sound rule. `topic.json` excuses it by name
> (`sound.voiceOnly`); no other film is excused, and `npm run check` fails a new film without a mix. For music and
> effects open [`../same-face/`](../same-face/README.md), [`../nobody-looked-at-the-moon/`](../nobody-looked-at-the-moon/README.md)
> or [`../superpower-at-18/`](../superpower-at-18/README.md). Its sound sheet is not written yet; writing it is a job
> the owner has to ask for.

## Where everything is

| File | What it is |
|---|---|
| `in-this-town-monster-egg.mp4` | The film as delivered: 720×1280, 2:57, with the voice. A copy of `renders/in-this-town-monster-egg.mp4`. The 1080×1920 master is the asset of release `render-12` |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of that file for each of the 93 shots, with its number, its cue and its time. **Read this first** |
| [`shot-log.md`](shot-log.md) | Every shot: when, how long, the words, the place and its light, the camera, and why this picture |
| `source/narration.md` | The script, and the table of what is planted and where it pays off |
| `source/scene1.tsx` … `scene18.tsx` | The shots, one file for each beat |
| `source/kit.tsx` | The teller, the map of places, and how the film takes its parts from the pack |
| `source/world.tsx` | One world in three zones: the town, the bedroom, the lake |
| `source/film.tsx`, `source/timing.json` | The film's definition, and the voice measured word by word |

`source/` is a snapshot to read: it is not compiled and nothing imports it. The film that renders lives in
`src/videos/in-this-town-monster-egg/`.

This film replaced a rejected one: [`../monster-egg-v1/`](../monster-egg-v1/README.md), 20 seconds, one drifting
camera, 41 words. Read the two side by side.

## What to open it for

- **All 18 beats of [`SCRIPT.md`](../../SCRIPT.md), in order.** The other long film here is a story the owner
  outlined himself; this one follows the beat sheet line by line. The short cut drops beats 5, 6, 11 and 12 (the
  adults, the tease, the price, the packing: 34 seconds here). This is what they look like when they are kept.
- **Three places in one world.** `source/world.tsx` holds a town, a bedroom and a lava lake as `<Zone>`s, and a wall
  that belongs to two of them. Each shot names its zone and, when the light is not daylight, its look:
  `overworld-night` in the bedroom, with the friend, and at the lake once it has gone dark; `lava-shore` at the lake
  while it burns; `overworld-storm` from the moment the mother arrives. 66 shots play in the town, 15 at the lake,
  11 in the bedroom, and one sees the town and the lake together.
- **Creatures.** The egg, the worm, the dragon, the phoenix, the stone golem and the mother were built for this
  film and are now in the pack (`creatures.tsx`; the table is in [`../../PACK.md`](../../PACK.md)). Use them from
  there. Do not rebuild them.
- **What is planted, and where it pays off.** Eight things, in a table at the top of `source/narration.md`. The
  tapping that stops in the light (beat 6) is a baby calling (beat 17). Write that table before you write a line.

## Its shape, measured

93 shots, 746 words, 2:56.7 (176.7 s), 254 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Hook | 0:00.0 | 3.0 | 13 | 2 |
| 2 | Three mysteries | 0:03.0 | 9.7 | 42 | 4 |
| 3 | The tour | 0:12.7 | 19.1 | 74 | 11 |
| 4 | The itch | 0:31.8 | 6.0 | 27 | 3 |
| 5 | The adults say no | 0:37.8 | 7.1 | 37 | 4 |
| 6 | The tease | 0:44.9 | 8.9 | 36 | 4 |
| 7 | The oldest woman | 0:53.8 | 10.2 | 43 | 4 |
| 8 | The decision | 1:04.0 | 7.4 | 30 | 4 |
| 9 | Attempt one | 1:11.4 | 10.0 | 44 | 6 |
| 10 | Attempt two | 1:21.4 | 14.1 | 57 | 7 |
| 11 | The price | 1:35.5 | 10.4 | 47 | 5 |
| 12 | Packing | 1:45.9 | 7.7 | 29 | 3 |
| 13 | The friend | 1:53.6 | 6.5 | 30 | 3 |
| 14 | The edge | 2:00.1 | 17.3 | 79 | 10 |
| 15 | The fall | 2:17.4 | 13.4 | 53 | 8 |
| 16 | The sound | 2:30.8 | 10.0 | 39 | 6 |
| 17 | The mother | 2:40.8 | 14.0 | 61 | 8 |
| 18 | The button | 2:54.8 | 1.8 | 5 | 1 |

- **In thirds:** the world and the question (beats 1–8) take 40% of the film, the attempts, the price and the
  friend (9–13) 28%, the act and the answer (14–18) 32%.
- **The two longest beats are the tour and the edge.** The tour has the most pictures (11 in 19 seconds). The edge
  has the most words of any beat (79): the film slows down just before he does it.
- **Shots:** the median holds 1.87 s, the shortest 0.53 s, the longest 4.10 s. 8 are under a second and 6 are
  over three. About 8.0 words to a picture.
- **Camera:** 68 of the 93 shots are a `cam.push`; the rest are 8 orbits, 7 trucks, 7 shots from straight above
  (`cam.top`) and 3 pans. Every shot moves.
- **The button is one shot and five words**, 1.8 seconds, and the film is over.

## What was hard, so you do not find it out again

All of these got past the type check, `npm run check` and the first reading of the stills. The first two were
found by **watching a small draft render**: a still is one moment of a shot, and a film is all of them.

- **A flame near a face burns the face out.** In `6.torch` and `6.gone` he holds a torch out to the egg. With
  `light={7}` his face was white. The film uses `light={2.2}` (`WithTorch`, in `source/scene6.tsx`).
- **A big creature seen from behind is a grey wall.** In `14.kids` the golem that carries a sleeping kid to school
  was first seen from the back. It is now side on, under the SCHOOL sign, with the kid in its arms: the picture has
  to show the thing the words name.
- **What he carries can hide him.** In `16.sound` and `16.home` the worm in his arms covered the teller's face.
  Look at the face in every shot where somebody holds something.
- **A three-minute film is rendered in pieces.** `scripts/render-plan.mjs` cuts a film into chunks of about nine
  seconds, twenty at most, and `.github/workflows/render.yml` renders them side by side and joins them. Its `scale`
  input makes a small draft. The render policy is in `AGENTS.md`, section 9.

## How to use it

- **Build like it**, when the owner asks for a film of two to three minutes. For one to two minutes, build like
  [`../same-face/`](../same-face/README.md).
- **Add the sound it does not have.** A film of this topic is not finished with only a voice
  ([`../../SOUND.md`](../../SOUND.md)).
- **Never retell it.** No egg, no rank sign, no lava lake, no mother, no "tap, tap, tap" in another film. A new film
  borrows the shape and nothing else.
- **It does not change.** If you touch the engine or the pack, prove with `scripts/compare-stills.py` that every
  still of this film is the same as before.

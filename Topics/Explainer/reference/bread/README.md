# The reference film: "Why Does Bread Cost More Every Year"

This is what a finished film of this topic looks like and sounds like. It is the topic's first film and its
reference: nobody sent a video to measure, the owner asked us to make the reference ourselves ("you are the one
making that reference!"; his subjects: "money lessons, what inflation is"). He approved its script on 2026-11-13
("yesboth"), watched the finished film the same day, and said of it and of the first "What if" film together:

> "okay i love both really, this can be uploaded too!"
>
> "i like how you made these!"

## Where everything is

In this folder:

| File | What it is |
|---|---|
| `contact-sheet-one-frame-per-stop.jpg` | One frame of the delivered film for each of the 19 stops, with its cue and its time. **Read this first** |
| [`shot-log.md`](shot-log.md) | Every stop: when, how long the camera has for it, the words, where it flies to, and why this picture |
| `source/narration.md` | The script: the question, the answer in one sentence, the thing everybody knows, what each line SHOWS, what changed between the draft and the film and why, the claims and where each came from, and the faults that were left in |
| `source/scene1.tsx` … `scene7.tsx` | One file for each beat: its exhibit (`ExhibitN`) and its part of the flight |
| `source/kit.tsx` | The five islands, the route (`STOPS`), the shop, the rack, and the reasons for each framing |
| `source/parts.tsx` | Nine parts the pack lacked: an oven, a loaf that comes apart, a price too long for a tag, a balloon and more |
| `source/world.tsx` | The islands, and every exhibit mounted for the whole film |
| `source/sound.json` | The sound sheet: 99 sounds |
| `source/film.tsx`, `timing.json`, `sound.lock.json` | The film's definition (`unbroken(...)`), the voice measured word by word, and the numbers of the mix |

The film itself is not copied into this folder: it is `renders/why-does-bread-cost-more-every-year.mp4`
(1080×1920, 37 MB, with its sound).

`source/` is a snapshot to read: it is not compiled and nothing imports it. The film that renders lives in
`src/videos/why-does-bread-cost-more-every-year/`, and its voice and mix in
`public/audio/why-does-bread-cost-more-every-year/`. An approved film does not change, so the two are the same; if
they ever differ, the one in `src/videos/` is the film.

## Its shape, measured

19 stops, 182 words, 49.2 s, 224 words a minute. **One camera, no cut:** the whole film is one flight over five
islands. Seven beats: the beat sheet in [`../../SCRIPT.md`](../../SCRIPT.md) is this table.

| # | Beat | Starts | Seconds | Words | Stops |
|---|---|---|---|---|---|
| 1 | The question | 0:00.0 | 1.6 | 7 | 1 |
| 2 | The thing you know (one loaf, two coins) | 0:01.6 | 2.0 | 7 | 1 |
| 3 | It was not always so | 0:03.6 | 5.0 | 19 | 2 |
| 4 | The cause, step by step (a tiny village) | 0:08.6 | 16.6 | 61 | 7 |
| 5 | The part you did not know (the real world, and Germany in 1923) | 0:25.2 | 14.8 | 54 | 5 |
| 6 | The answer | 0:40.0 | 3.8 | 14 | 1 |
| 7 | You (your chest), and the subscribe line | 0:43.8 | 5.4 | 20 | 2 |

- **Stops:** the camera has 2.43 s for a thing on the median, 1.63 s for the shortest and 4.00 s for the longest.
  About 9.6 words to a stop.
- **Hard cuts:** none. `film.tsx` calls `unbroken(film.scenes)`, which would throw if the camera jumped.
- **How a move is timed against the sentence:** the camera leaves as the line begins and is at rest before the
  noun. The default flight (`flight.tsx`) takes 0.5–1.2 s, by distance, and never more than 55% of the line. Five of
  the nineteen stops set their own: 0.85 s for the opening move in to the kid (1.ask), 0.62 s for the pull back to
  both stalls (3.same), 1.55 s for the fall to 1923 (5.germany), 1.4 s for the climb home (6.answer), and 2.1 s for
  the one line that is two sentences (4.nobody), so that the camera pushes in through the first and has landed for
  the second.
- **The cause takes a third of the film** (beat 4: 34%), and the surprise comes at 34 seconds of 49.
- **Who is on screen:** a narrator who is never seen, talking to "you". "You" is one kid in a loud shirt, and it
  happens to him. He is in the first frame and the last.
- **How numbers are shown:** every number is a number of coins for one loaf: a tag on the loaf, coins under it, a
  stack on a roof, a price that unrolls down a plinth. No chart, no slide.
- **Captions:** one word at a time, at 72% of the height. The caption decides the framing: nothing that has to be
  read is put behind it.
- **The first line and the last:** "Why does bread cost more every year?" and "So subscribe now. It still costs
  nothing."

## Its sound, measured

Built by `scripts/sound.py` from `sound.json`. The agent that made it could not listen; these are the numbers of
the mix in the film the owner then approved.

| | |
|---|---|
| Music | 5 sections: `curious` → `explain` → `town` → `tense` → `hope` |
| Music under the voice | 18.2 dB. No stretch without music |
| The air of each place | 5 beds, 26.3 dB under the voice |
| Sound effects | 99, of 26 kinds: 121 a minute. The longest stretch without one is 2.1 s |
| The voice over everything else | 12.8 dB on the median; 5.5 dB in the worst half second |
| The file | -14.8 LUFS, true peak -1.3 dB |

## What was hard

- **The pack was made before the film**, and the film found out what it lacked. Nine parts were built in the
  film's own `parts.tsx` ([`../../PACK.md`](../../PACK.md), "Parts built for the first film").
- **Six pictures changed between the approved draft and the film**, and the words did not. `source/narration.md`
  has the table: time became height, ten tags became one, a chart became a stack, a signpost became a balloon.
- **The caption sits at 72% of the height**, and two close frames had a villager between the lens and the exhibit.
  The framing lessons are in [`../README.md`](../README.md) and in [`../../SHOTS.md`](../../SHOTS.md).
- **The voice is slower than a story's**: 224 words a minute against 254. The timing must be rebuilt with
  `--wpm 225` or every stop moves.

The faults that were seen and kept are listed in `source/narration.md`, "What was left in". The owner watched the
film with them in it.

## How to use it

- **Build like it.** One question, one thing everybody knows, one island for each idea, one flight. When a number
  of yours is far from a number on this page, look at why.
- **Use its parts.** The pack is in [`../../PACK.md`](../../PACK.md).
- **Every claim has a source.** `source/narration.md` lists each one, the page it came from and the day it was
  read. Do the same.
- **Never retell it.** No sentence, picture or joke of this film goes into another: not the loaf and its coins,
  not the tiny village, not the balloon, not the German loaf, not "it still costs nothing". A new film borrows the
  shape and nothing else.
- **It does not change.** If you touch the engine or the pack, prove with `scripts/compare-stills.py` that every
  still of this film is the same as before.

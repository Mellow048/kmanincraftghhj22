# The reference folder: what a good film of this topic is

Open this before you write a film of this topic. Each folder here is a film of ours that the owner approved, with
its **source code**, a log of every stop and a contact sheet.

## Films the owner approved: build like these

| Folder | Film | Size | The owner said | Open it for |
|---|---|---|---|---|
| [`bread/`](bread/README.md) | *Why Does Bread Cost More Every Year* | 0:49, 7 beats, 19 stops, 182 words. One flight over five islands, no cut. Full sound | "okay i love both really, this can be uploaded too!"; "i like how you made these!" | **Everything. This is the topic's reference film** (`reference` in `topic.json`). The beat sheet in `SCRIPT.md` carries its numbers. Its mp4 is `renders/why-does-bread-cost-more-every-year.mp4` |

## How this topic got its reference

The topic was built before its reference, on the owner's instruction ("reference which we will do later once youre
done"). Asked for a reference video (2026-11-12), he answered: **"you are the one making that reference!"** So the
reference is our own first film. He approved its script ("yesboth"), then the finished film (2026-11-13). Until
then every number of the topic was a first setting; the film was built to those numbers and sits inside every one
of them, so none had to change.

What the film taught (each is in its `kit.tsx` or `narration.md`, with its reason):

- **The caption decides the framing.** It sits at 72% of the height. A stop that looks 2.2 m up at a 5.6 m rack from
  9 to 10 m puts the caption on the plank cabinet under the loaves; from 7.6 m it lay across a row of them.
- **Nobody stands between the lens and the exhibit.** The village had four villagers; two of them were in front of
  one close frame or another, and they were taken out. The two who are left stand at the rack's posts.
- **A long line is one slow move.** "Nobody can buy any more bread than before. Each coin just buys less." is one
  line and 3.9 seconds: the flight is given `travel: 2.1`, so it pushes in for the whole first sentence and lands
  for the second.
- **Dark writing on a pale board is written in cubes** (`Figure`), not in `PixelText`: that font carries a black
  edge, and "10" came out as two blobs.
- **Leave the right-hand edge and the bottom fifth to the phone.** The like and comment buttons sit on the right
  from the middle down, and the channel's name along the bottom.
- **A picture may change after the script is approved; a word may not.** Six pictures of the reference changed
  between the draft and the film. Its `narration.md` says which, and why.

## What is in a film's folder

| File | What it is |
|---|---|
| `README.md` | What the owner said, what the film is good for, its shape and its sound in numbers, and what was hard |
| `contact-sheet-*.jpg` | The film as one picture. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every stop on one page: when it starts, how long the camera has for it, the words, where it flies to, and why this picture for these words |
| `source/` | A **snapshot** of the film's source: `narration.md` (with the claims and where each came from), `timing.json`, `kit.tsx`, `world.tsx`, one `sceneN.tsx` for each beat, `film.tsx`, `sound.json` |

The mp4 is not copied here: it is in `renders/`, and each page names it. `source/` is a copy to read. It is not
compiled (`tsconfig.json` leaves out `Topics/**/reference`) and nothing imports it. **The film that renders lives
in `src/videos/<film id>/`.** An approved film does not change, so the two are the same; if they ever differ, the
one in `src/videos/` is the film.

## How to use them

1. **Read the contact sheet, then the shot log, then `source/narration.md`.** That is the whole film in five minutes.
2. **Open one beat in `source/`** next to its row in the shot log, and see how a line of script became an exhibit
   and a stop of the flight.
3. **Build like them.** One question, one thing everybody knows, one island for each idea, one flight.
4. **Never retell them.** No sentence, picture or joke of a finished film goes into a new one.
5. **They do not change.** If you touch the engine or the pack, prove with `scripts/compare-stills.py` that the
   stills of every finished film are the same as before.

## Adding a film to this folder

Do it when the owner has approved a **finished** film. Not before: a film he has not seen with its sound is not a
model.

```bash
FILM=<the film's id>
DIR=Topics/Explainer/reference/<name>
mkdir -p $DIR/source
cp src/videos/$FILM/* $DIR/source/                              # the snapshot
cp renders/$FILM-shots.jpg $DIR/contact-sheet-one-frame-per-stop.jpg
node scripts/shot-log.mjs $FILM --out $DIR/shot-log.md          # every stop, on one page
node scripts/shot-log.mjs $FILM --shape                         # the beat table and the numbers, for the README
diff -rq src/videos/$FILM $DIR/source                           # prints nothing when the snapshot is the film
```

Then write `README.md` the way [`bread/README.md`](bread/README.md) is written: the owner's own words, the output
of `--shape`, the numbers of the sound (`src/videos/$FILM/sound.lock.json`, under `measured`), and what was hard.
Add a row to the table at the top of this page and to `models` in [`../topic.json`](../topic.json).
`renders/$FILM-shots.jpg` is made by `python3 scripts/render-check.py $FILM --sheet`.

## If the owner sends a video to measure

A reference can also be a real video he chose (for this topic, a Zack D Films short or one like it). Put it in
`reference/<name>/` with a `README.md` (where it came from, what he said about it), and measure it before changing a
rule:

| Measure | Goes into |
|---|---|
| Length in seconds; words; words a minute | `film.seconds`, `film.words`, `film.wordsPerMinute` in `topic.json` |
| How long the camera rests on each thing (median, shortest, longest) | `film.shotSeconds`, `film.medianShotSeconds` |
| Hard cuts against continuous moves, and what each cut was for | `camera.maxHardCuts`, and `SHOTS.md` |
| How a move is timed against the sentence: does the camera arrive before the noun, or on it? | The default `travel` in `flight.tsx`, and `SHOTS.md` |
| The beats of the script, with seconds and words for each | The beat sheet in `SCRIPT.md` |
| Who is on screen: a narrator only, or a character things happen to? | "One person it happens to" in `README.md` |
| How numbers are shown | `PACK.md`, and rule 5 in `README.md` |
| Captions: are there any, how many words at a time, where | `film.captions`, and the `captions` line of the starter |
| Sound: is there music, how many sections, effects a minute, loudness | `sound` in `topic.json`, and `SOUND.md` |

Keep the evidence beside the numbers: a transcript, a shot log, contact sheets
(`Topics/InThisTown/reference/treehouse/` shows what a measured video looks like). Study a reference. Never copy it:
no sentence, no asset, no joke.

# The reference folder: what a good film of this topic is

Open this before you write a film of this topic. Each folder here is a film of ours that the owner approved, with
its **source code**, a log of every shot and a contact sheet.

## Films the owner approved: build like these

| Folder | Film | Size | The owner said | Open it for |
|---|---|---|---|---|
| [`crush/`](crush/README.md) | *What If You Could See Who Had a Crush on You* | 1:54, 14 beats, 55 shots, 479 words. Six places, day and night. Full sound | "okay i love both really, this can be uploaded too!"; "i like how you made these!" | **Everything. This is the topic's reference film** (`reference` in `topic.json`). The beat sheet in `SCRIPT.md` is this film, measured. Its mp4 is `renders/what-if-you-could-see-who-had-a-crush-on-you.mp4` |

## How this topic got its reference

The topic was built before its reference, on the owner's instruction ("reference which we will do later once youre
done"). Asked for a reference video (2026-11-12), he answered: **"you are the one making that reference!"** So the
reference is our own first film. He approved its script ("yesboth"), then the finished film (2026-11-13). Until
then every number of the topic was In This Town's; the film was built to those numbers and sits inside every one of
them, so none had to change. What the film did change is written into the playbooks:

- **The story**: the beat sheet in [`../SCRIPT.md`](../SCRIPT.md) is the film's fourteen beats, with its seconds,
  words and shots.
- **The picture**: [`../SHOTS.md`](../SHOTS.md) §5. Who stands between the lens and a face, what a sign does when
  it is big, words in the picture, night.
- **The sound**: [`../SOUND.md`](../SOUND.md), "How the first film does it". One sound for the power, one note for
  the heart that matters, the cause of a swelling heart in one ear.
- **The pack**: the kitchen, the lunch room, the gym and its gate, a dog, a card, a tie and seven more things were
  built for it and are in the pack now ([`../PACK.md`](../PACK.md)).
- **The story's own rule**: a sign changes size only when the one it is for moves, by one function of the distance
  (`joHeart` in the film's `kit.tsx`). The twist is on screen from the first second because of it.

## What is in a film's folder

| File | What it is |
|---|---|
| `README.md` | What the owner said, what the film is good for, its shape and its sound in numbers, and what was hard |
| `contact-sheet-*.jpg` | The film as one picture. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every shot on one page: when it starts, how long it holds, the words, the place, the camera, and why this picture for these words |
| `source/` | A **snapshot** of the film's source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, one `sceneN.tsx` for each beat, `film.tsx`, `sound.json` |

The mp4 is not copied here: it is in `renders/`, and each page names it. `source/` is a copy to read. It is not
compiled (`tsconfig.json` leaves out `Topics/**/reference`) and nothing imports it. **The film that renders lives
in `src/videos/<film id>/`.** An approved film does not change, so the two are the same; if they ever differ, the
one in `src/videos/` is the film.

## How to use them

1. **Read the contact sheet, then the shot log, then `source/narration.md`.** That is the whole film in ten minutes.
2. **Open one beat in `source/`** next to its row in the shot log, and see how a line of script became a camera
   move, a `note` and a `stage`.
3. **Build like them.** The same order of work, the same kind of shot, the same density of cuts and sounds.
4. **Never retell them.** No premise, sentence, joke or twist of a finished film goes into a new one.
5. **They do not change.** If you touch the engine or the pack, prove with `scripts/compare-stills.py` that the
   stills of every finished film are the same as before.

## Adding a film to this folder

Do it when the owner has approved a **finished** film. Not before: a film he has not seen with its sound is not a
model.

```bash
FILM=what-if-<name>                 # the film's id
DIR=Topics/WhatIf/reference/<name>
mkdir -p $DIR/source
cp src/videos/$FILM/* $DIR/source/                              # the snapshot
cp renders/$FILM-shots.jpg $DIR/contact-sheet-one-frame-per-shot.jpg
node scripts/shot-log.mjs $FILM --out $DIR/shot-log.md          # every shot, on one page
node scripts/shot-log.mjs $FILM --shape                         # the beat table and the numbers, for the README
diff -rq src/videos/$FILM $DIR/source                           # prints nothing when the snapshot is the film
```

Then write `README.md` the way [`crush/README.md`](crush/README.md) is written: the owner's own words, the output
of `--shape`, the numbers of the sound (`src/videos/$FILM/sound.lock.json`, under `measured`), and what was hard.
Add a row to the table at the top of this page and to `models` in [`../topic.json`](../topic.json).
`renders/$FILM-shots.jpg` is made by `python3 scripts/render-check.py $FILM --sheet`.

## If the owner sends a video to measure

A reference can also be a real "What if" video he chose. Put it in `reference/<name>/` with a `README.md` (where it
came from, what he said about it), and measure it before changing a rule:

| Measure | Goes into |
|---|---|
| Length in seconds; words; words a minute | `film.seconds`, `film.words`, `film.wordsPerMinute` in `topic.json` |
| Seconds per shot (median, shortest, longest); number of shots | `film.shotSeconds`, `film.medianShotSeconds` |
| The beats, with the second each starts and its words | The beat sheet in `SCRIPT.md` |
| Who tells it: "I" or "you"? Past or present? | "The rules of a line" in `SCRIPT.md`, and rule 1 in `README.md` |
| How the power is shown, and whether its look ever changes | `SHOTS.md` §1, and `powers.tsx` |
| Where it is set | `school.tsx`, and the zones of the starter |
| The first line and the last line, word for word | `film.opensWith`, `film.lastLineContains` |
| Sound: music sections, effects a minute, loudness | `sound` in `topic.json`, and `SOUND.md` |

Keep the evidence beside the numbers: a transcript, a shot log, contact sheets
(`Topics/InThisTown/reference/treehouse/` shows what a measured video looks like). Study a reference. Never copy it:
no premise, no sentence, no asset, no twist.

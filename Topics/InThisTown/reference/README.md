# The reference folder: what a good film of this topic is

Open this before you write a film of this topic. Nine folders here are films of ours that the owner approved, each
with its **source code** and its **mp4**. **For a fight or a chase, open [`robot-at-18/`](robot-at-18/README.md)
first.** Two are attempts he rejected. One is the video the format came from.

The owner, 2026-11-13, when he asked for the films to be kept here:

> "every single one u made is good, put them into the reference + the mp4 in main branch so that other agents know
> how to make a good short"

And again that night, after the robot film's fight:

> "make the other shorts that u made go into the reference including this robot short. source code + mp4 so other
> agents can see how to make a good fight scenes!"

## Films the owner approved: build like these

| Folder | Film | Size | The owner said | Open it for |
|---|---|---|---|---|
| [`same-face/`](same-face/README.md) | *In This Town, Everyone Had the Same Face Except Me* | Short cut. 1:45, 14 beats, 57 shots, 441 words. Day. Full sound | "everything is perfect top to bottom"; "yes its good put it as the topic's reference" | **Everything. This is the topic's reference film** (`reference` in `topic.json`). Start here |
| [`nobody-looked-at-the-moon/`](nobody-looked-at-the-moon/README.md) | *In This Town, Nobody Looked at the Moon* | Short cut. 1:52, 14 beats, 63 shots, 471 words. Night. Full sound | "every single one u made is good" | A film at **night**. How a rejected 20-second idea became a real film. The densest sound sheet (127 effects a minute) and what had to be cut from it to keep the words clear |
| [`monster-egg/`](monster-egg/README.md) | *In This Town: The Monster Egg* | Full film. 2:57, 18 beats, 93 shots, 746 words. Day, night and a lava lake | "every single one u made is good" | The **long cut**: all 18 beats of `SCRIPT.md`, and three places in one world. **It has a voice and no other sound.** Do not copy that |
| [`superpower-at-18/`](superpower-at-18/README.md) | *In This Town, Everyone Got a Superpower at 18* (part one) | Full film. 2:48, 18 beats, 90 shots, 710 words. Full sound | "wow i love it, i love how u made the short" | The long cut **with** sound. A story the owner outlined himself, and the ending he threw out first |
| [`superpower-at-18-part-2/`](superpower-at-18-part-2/README.md) | *In This Town, Everyone Got a Superpower at 18, Part 2* | Full film. 2:49, 18 beats, 83 shots, 713 words. Full sound, the owner's music track | "a banger and a massive upgrade! i totally felt like i was watching peak!" | **Fast action.** Why its first render was rejected (no motion, "it just teleports to B") and the eight things that fixed it. A sequel that picks up on the second part one stopped |
| [`monster-village/`](monster-village/README.md) | *In This Town, I Live in a Monster Village* (part one) | Full film. 2:55, 74 shots, 713 words (trimmed from 3:41 to be a Short). Day and night. Full sound | "i liked the superhero and this one" | **Monsters as a family**, night scenes, a battle with a crowd. Its mp4 is in the folder |
| [`monster-village-part-2/`](monster-village-part-2/README.md) | *In This Town, I Live in a Monster Village, Part 2* | Middle cut. 2:08, 54 shots. Full sound | "pretty good", then "perfect" | **A sequel on a reused world**, built from the owner's own outline. Framing for a narrow phone frame; replacing one shot without a full render. Its mp4 is in the folder |
| [`monster-village-part-3/`](monster-village-part-3/README.md) | *In This Town, I Live in a Monster Village, Part 3* | Middle cut. 2:21, 70 shots on 57 lines. Full sound | Not yet seen | **The first film made to `OWNER.md`**: the premise in frame one, an environment shot, a travelling shot and an odd angle in every scene. A prop as a character (dad's arm); a silence on purpose; pillagers and the mansion. Its mp4 is in the folder |
| [`robot-at-18/`](robot-at-18/README.md) | *In This Town, Everyone Gets a Robot at 18* | Full film. 2:54, 86 shots, 697 words (trimmed from 3:25 to be a Short). Sunset forest and sky. Full sound | "now thats MUCH better! 8.8/10 fight scene great job lad" | **A fight.** Sword against a kid in a suit, on the ground and in the air: posed bodies, hit-freezes, cuts inside a line, flying poses. Two rejected fights and what was wrong with each. A sheet of the whole fight at five frames a second |
| [`pumpkin-heads/`](pumpkin-heads/README.md) | *In This Town, Everyone Wore a Pumpkin on Their Head* | Short cut. 1:56, 14 beats, 58 shots, 490 words. Day and night. Full sound | He approved the script and asked for another ending | A second **short cut** with sound; a teller whose face is a carved pumpkin; an ending that is a picture and not a punchline |

All of them use the same pack
([`../PACK.md`](../PACK.md)), the same engine and the same checks.

## Three minutes is the wall

A vertical video over 3:00 is not a YouTube Short: YouTube files it as a long video. Two films here were delivered
at 3:41 and 3:25 and had to be cut down afterwards. `topic.json` now stops a film at 2:58 and has no longer cut.
If a finished film has to lose lines, `python3 scripts/trim-narration.py <film> <cue.id> …` cuts them out of the
recorded clips and the script; then delete their shots and their rows in `sound.json`, and build again. Look at
both sides of every join on stills: if the line that went was the one in which somebody arrived, they now teleport.

## What is in a film's folder

| File | What it is |
|---|---|
| `README.md` | What the owner said, what the film is good for, its shape and its sound in numbers, and what was hard |
| `<film id>.mp4` | The film as delivered (720×1280 for the older films, 1080×1920 for the newer), with its sound. A copy of `renders/<film id>.mp4`. The 1080×1920 master is a release asset of the repository; each page names the release |
| `contact-sheet-*.jpg` | The film as one picture. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every shot on one page: when it starts, how long it holds, the words, the place, the camera, and why this picture for these words |
| `source/` | A **snapshot** of the film's source: `narration.md` (the script, with what is planted and where it pays off), `timing.json`, `kit.tsx`, `world.tsx`, one `sceneN.tsx` for each beat, `film.tsx`, and `sound.json` if the film has sound |

`source/` is a copy to read. It is not compiled (`tsconfig.json` leaves out `Topics/**/reference`) and nothing
imports it, so its `import` lines point at folders that are not beside it. **The film that renders lives in
`src/videos/<film id>/`.** An approved film does not change, so the two are the same; if they ever differ, the one
in `src/videos/` is the film.

## How to use them

1. **Read the contact sheet, then the shot log, then `source/narration.md`.** That is the whole film in ten minutes.
2. **Open one beat in `source/`** next to its row in the shot log, and see how a line of script became a camera
   move, a `note` and a `stage`. Then open `source/kit.tsx` to see how little a film builds for itself: its teller,
   its map of places, and what no other film could use. Everything else comes from the pack.
3. **Build like them.** The same order of work, the same kind of shot, the same density of cuts and sounds. When a
   number of yours is far from theirs, look at why.
4. **Never retell them.** No premise, sentence, joke or twist of a finished film goes into a new one. A new film
   borrows the shape and nothing else.
5. **They do not change.** If you touch the engine or the pack, prove with `scripts/compare-stills.py` that the
   stills of every finished film are the same as before ([`../PACK.md`](../PACK.md), "Adding to the pack").

## Where the format came from

[`treehouse/`](treehouse/README.md): "In This Town, Everyone Lived In A Treehouse", a Roblox video by someone else
that the owner supplied. Its transcript, a shot log and contact sheets. It was studied for its shape and never
copied. `SCRIPT.md` and `SHOTS.md` are built on it.

## What the owner rejected: read these as warnings

| Folder | What it was | Why it was rejected |
|---|---|---|
| [`monster-egg-v1/`](monster-egg-v1/README.md) | The first Monster Egg: 20 seconds, one drifting camera, 41 words | Weak narration, nothing moved, a dull first shot, a rushed ending. [`monster-egg/`](monster-egg/README.md) is the film that replaced it |
| [`moon-20-seconds/`](moon-20-seconds/README.md) | *Never Look at the Moon*: 19.6 seconds | "it wasnt really what i wanted". [`nobody-looked-at-the-moon/`](nobody-looked-at-the-moon/README.md) is the same idea made as a film of this topic |

Each rejected film has an approved film beside it that tells the same idea. Read a pair side by side to see the
difference between a premise and a film.

## Adding a film to this folder

Do it when the owner has approved a **finished** film and asks for it to be kept. Not before: a film he has not
seen with its sound is not a model.

```bash
FILM=in-this-town-<name>            # the film's id
DIR=Topics/InThisTown/reference/<name>
mkdir -p $DIR/source
cp src/videos/$FILM/* $DIR/source/                              # the snapshot
cp renders/$FILM.mp4 $DIR/                                      # the film as delivered
cp renders/$FILM-shots.jpg $DIR/contact-sheet-one-frame-per-shot.jpg
node scripts/shot-log.mjs $FILM --out $DIR/shot-log.md          # every shot, on one page
node scripts/shot-log.mjs $FILM --shape                         # the beat table and the numbers, for the README
```

Then write `README.md`: the owner's own words about the film, what to open it for, the output of `--shape`, the
numbers of the sound (they are in `src/videos/$FILM/sound.lock.json`, under `measured`), and what was hard. Add a
row to the table at the top of this page, to the table in [`../README.md`](../README.md), and to `models` in
[`../topic.json`](../topic.json).

`renders/$FILM-shots.jpg` is one frame of the delivered mp4 for each shot: `python3 scripts/render-check.py $FILM
--sheet` makes it. A sheet of one frame every two seconds does the same job, and ffmpeg makes it in one line (60
frames here; change `tile` to fit the film's length):

```bash
ffmpeg -i renders/$FILM.mp4 -vf "fps=1/2,scale=180:-1,tile=10x6" -frames:v 1 -q:v 3 $DIR/contact-sheet-every-2-seconds.jpg
```

With no ffmpeg installed: `pip install imageio-ffmpeg`, and the program is at
`python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"`.

**Check the copy before you commit it:** `diff -rq src/videos/$FILM $DIR/source` prints nothing when the snapshot
is the film.

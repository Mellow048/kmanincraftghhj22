# Reference: "In This Town, I Have Never Seen My Mum's Face"

**The owner on the script, 2026-11-16: "i like that one, another banger idea! go ahead lad make that mp4".**

**The owner on the finished film, 2026-11-16: "i like it but it was kinda similar to the creeper one as a cat it might
get me in trouble of reused content, anyways give me more ideas lad and before u give me ideas, put the enderman
skins and other stuff as a template and put the source code + mp4 into the reference for other agents to see."**

So this page is two things: a film he liked, to build like; and **a warning about what not to tell again**. Read
"Too close to the creeper film" below before pitching him anything.

It is idea 4 of [`../../outlines/ideas-2026-11-15.md`](../../outlines/ideas-2026-11-15.md), made to the recipe that
came out of the study of Monster Village part 1 ([`../monster-village/README.md`](../monster-village/README.md), "Why
this one travelled"). The endermen built for it are in the pack: [`../../endertown.tsx`](../../endertown.tsx), listed
in [`../../PACK.md`](../../PACK.md) under "The enderman town".

| File | What it is |
|---|---|
| `in-this-town-i-have-never-seen-my-mums-face.mp4` | **The film as delivered**: 1080×1920, 1:46, full sound. A copy of `renders/in-this-town-i-have-never-seen-my-mums-face.mp4` |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of the mp4 for each of its 52 shots. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every shot: when it starts, how long it holds, the words, the place, the camera, and why this picture |
| `source/` | A **snapshot** of the source: `narration.md` (the script, the recipe steps it follows, its plants and pay-offs), `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene6.tsx`, `film.tsx`, `sound.json`, `sound.lock.json` |

The film that renders lives in `src/videos/in-this-town-i-have-never-seen-my-mums-face/`. Its recorded clips are in
`public/audio/in-this-town-i-have-never-seen-my-mums-face/raw/`.

## The story, and whose it is

The agent's, from the recipe; he chose it and approved the script. A kid lives in a town of endermen. He has never
seen his mum's face, because if he looks her in the eyes she screams, and "she cannot help it". He knows her by her
knees. He tries a puddle, his fingers, looking from behind; he draws her as two purple dots and has to guess the
rest. Then six players come at night for ender pearls, with carved pumpkins on their heads, stare straight at his
dad, and nobody screams: "that is the trick". He is small and cannot fight six players, "but a pumpkin has very small
eye holes": he runs up behind them and knocks the pumpkins off. Now six players are staring at a whole town with
nothing on their heads. The town screams; the players run. He picks up a pumpkin, puts it on, walks home, finds her
knees and looks up: "My mum has purple eyes. And she was already looking at me."

## Too close to the creeper film

He saw it at once, and he is right. Set this film beside
[`../everyone-runs-away-from-me/`](../everyone-runs-away-from-me/README.md), made the day before:

| | The creeper film | This film |
|---|---|---|
| The teller | The one odd kid (a cat) in a town of one famous mob | The one odd kid (a human) in a town of one famous mob |
| The family | A mob mum in a pink bow, a mob dad in a straw hat; they found him as a baby | The same, bow and hat and all |
| What he wants | To be close to his mum once (a hug) | To be close to his mum once (a look) |
| Beat 3 | "So I tried everything": three tries that fail | "So I tried everything": three tries that fail |
| The danger | Six players, at night, for the mob's drop (gunpowder) | Six players, at night, for the mob's drop (pearls) |
| The turn | "I am small. I cannot fight six players. But …": the thing that spoiled his life saves the town | The same sentence, the same turn |
| The end | A quiet moment with mum, three pictures of "now", a subscribe joke about the mob | The same |
| The cut | 6 beats, 50 shots, 1:40, each beat within a second of this film's | 6 beats, 52 shots, 1:46 |

Only the mob and its facts changed. The second film was written by filling in the first one's outline, and the first
six ideas were all written from one recipe, so four of them have this shape too.

**What to do about it** (also in [`../../OWNER.md`](../../OWNER.md) §5 and
[`../../outlines/ideas-2026-11-16.md`](../../outlines/ideas-2026-11-16.md)):

- **Never fill in a finished film's outline.** Before pitching, write six words for the idea and for each of his last
  two films: who tells it, where, what goes wrong, what the player is, how it ends, how it feels. More than two the
  same as either film, and it is not a new idea.
- The recipe from Monster Village is about the **first fifteen seconds and the pull of the story** (a thing every
  player knows, doing the wrong thing; "I"; somebody to care about; true facts; a rule that looks unkind and is love;
  clues said back). It does not say "a kid, a mob mum and dad, six players at night". Keep the first; change the
  second every time.
- This film and the creeper film both left out what Monster Village part 1 has most of: **a secret, clues, and a
  truth the teller had wrong**. That is the part to bring back.
- The pack parts are parts. An enderman, a pumpkin, the rain, a kitchen can be in any film.

## What it is good for

- **Script first, done right.** He was sent the script and its recorded voice, said yes in one message, and not one
  line changed after. Nothing was rebuilt. `source/narration.md` is that script.
- **A reveal that is a picture, and silence.** The whole film asks one question (what does she look like?) and
  answers it at 1:29, in `7.eyes`: her face, close, and the first half second has no music, no effect and no words.
  The sound sheet's section from `6.up` has mood `none`. **If a film has one thing to show, do not show it early and
  do not talk over it.**
- **Seven plants, seven pay-offs**, listed in `source/narration.md`: the knees (`2.knees` → `6.knees`), the family
  photo where he looks at his shoes (`2.photo` → `8.photo`), the kitchen dad carried away (`2.kitchen` →
  `8.kitchen`), the drawing with two purple dots (`3.drew` → `7.eyes`), the scream (`1.scream` → `5.scream`).
- **True Minecraft facts as the jokes and as the plot**: look an enderman in the eyes and it screams; a carved
  pumpkin hides your eyes from it; a pumpkin leaves you two small holes to see through; endermen carry blocks off,
  teleport, and will not stand in rain; players hunt them for pearls. The ending is the second fact used by the kid.
- **A kid among people 2.9 m tall, in a tall frame.** His eyes are at 1.22 m: her knees. Most of the film is shot at
  his height, so the endermen are legs, and the one tilt up (`6.up`, `7.eyes`) is the pay-off.
- **A point-of-view shot through a mask** (`5.holes`): `PumpkinView` is black with two small holes, and the kid
  walks past the holes without being seen.
- **Things the picture added to the script**: she looks at him whenever he looks away (from `1.face` on, so "I think
  she always was" is true of every shot); the pink bands on her knees; the photos as polaroids (`PhotoBorder`); dad
  teleporting to the lens on the last line.
- **One crowd component, directed by numbers.** `EnderCrowd` (in the film: `Enders`) takes where they stand, then
  `jaw` and `shake` (they scream), `hold` and `drop` (they carry blocks; they let go), `outAt` (each teleports away
  at its own second).

## Shape

52 shots, 413 words, 1:45.6 (105.6 s), 236 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Never seen her face | 0:00.0 | 12.8 | 44 | 6 |
| 2 | By her knees | 0:12.8 | 20.4 | 77 | 9 |
| 3 | Everything | 0:33.2 | 14.8 | 63 | 8 |
| 4 | Pumpkins | 0:48.0 | 17.8 | 67 | 8 |
| 5 | All six | 1:05.8 | 15.5 | 64 | 9 |
| 6 | Looking up | 1:21.3 | 24.3 | 98 | 12 |

- Shots: the median holds 1.97 s, the shortest 1.07 s, the longest 4.07 s. 0 are under a second and 4 are over three. About 7.9 words to a picture.
- Camera: 47 `cam.push`, 4 `cam.truck`, 1 `cam.pan`.
- Places: town 50 shots, photo 2.

The voice (`voice-03`) runs at x1.47 with 0.3 to 0.7 s of silence before each clip; the 0.7 is before "My mum has
purple eyes". Two looks in one zone: day, and night for the players.

## Sound, measured

182 effects (103 a minute, 33 kinds), none buried, the longest stretch with none 2.4 s. Three beds. Music 18.3 dB
under the voice; 2.8 s of the film have no music, on purpose (`6.up` into `7.eyes`). The voice is 14.0 dB over
everything else (median). The mp4 measures −15.4 LUFS, true peak −0.8 dB.

**The sound kit has no scream and no teleport.** A scream is a high `buzz` (`pitch` 1.4 to 1.9). A teleport is
`glitch`. A pumpkin coming off a head is a `bonk`. The viewer is taught the first two in the first six seconds
(`1.ender`, `1.scream`), so that by `5.scream` they mean something. The `README` field of `source/sound.json` says
so. He heard the film with these and did not object.

## What went wrong on the way

- **The second film of a shape.** See above. It cost nothing in the build and it is the one thing he marked.
- **An enderman does not fit a tall frame with a kid.** It took two rounds of stills to get every shot to hold both:
  the first stagings cut heads off by accident or lost the second person off the side (`4.stare`: dad and the `?`
  over him were out of frame). What worked: put the kid nearer the lens than the enderman, shoot from his height,
  and let the enderman be legs unless its face is the point.
- **A scarf on an enderman who bends down hangs in front of its face like a tongue.** Mum has a bow and knee bands
  instead.
- **The aligner did not know some words** and they were added to `SAY` in `scripts/narration.py`. Read the build
  output for "estimated".
- **Pack parts were built in the film first** and moved to the pack after he approved it. The move was checked with
  two stills of every shot, before and after: 104 of 104 the same, pixel for pixel. `source/kit.tsx` is the kit
  after the move, so it shows a film using the pack under short names (`Mum`, `Enders`, `Hunter`).

## What nobody has checked

No agent has listened to the mix or watched the film move: the numbers were measured, and one or two frames of each
shot were looked at. The owner has seen and heard the finished film and named one fault (the likeness). Things he was
asked to listen and look for and did not mention: whether a `buzz` reads as a scream, whether the black of
`PumpkinView` reads as "inside a pumpkin", and whether the night scenes are bright enough on a phone. Views and
stayed-to-watch for this film and for the creeper film are not known.

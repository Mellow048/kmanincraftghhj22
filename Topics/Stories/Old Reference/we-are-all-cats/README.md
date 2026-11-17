# Reference: "In This Town, We Are All Cats"

**The owner on the finished film, 2026-11-15: "this is actually really funny, i love this please put it in the
reference in the main branch, and for the cat and dog skins please put it on the templates for other agents to use if
i want something new".**

It is his own story, built from his outline without a script review, and the first render was the one he approved.
The cats and dogs built for it are now in the pack: [`../../catsdogs.tsx`](../../catsdogs.tsx), listed in
[`../../PACK.md`](../../PACK.md) under "Cats and dogs".

| File | What it is |
|---|---|
| `in-this-town-we-are-all-cats.mp4` | **The film as delivered**: 1080×1920, 1:23, full sound. A copy of `renders/in-this-town-we-are-all-cats.mp4` |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of the mp4 for each of its 42 shots. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every shot: when it starts, how long it holds, the words, the place, the camera, and why this picture |
| `source/` | A **snapshot** of the source: `narration.md` (his outline word for word, and what was added to it), `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene6.tsx`, `film.tsx`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-we-are-all-cats/`. Its recorded clips are in
`public/audio/in-this-town-we-are-all-cats/raw/`.

## The story, and whose it is

His, start to finish. The outline is quoted word for word at the top of `source/narration.md`: a village of cats
and a village of dogs that are one village with a line down the middle; every day they fight, "but not physically",
the cats with fur and "that iconic cat fighting pose", the dogs by barking; the cats grow tired of it and take the
line away at night; in the morning nobody knows where to bark or what is theirs; they approach each other quietly;
in time they are friends.

Every step of that is in the film, in his order and mostly in his words. The eight small things the agent added
(lunch, the grandmas, grass on the golems' feet, the sniff, the bone for a fish, the last block as a pillow) are
listed in `source/narration.md`. He was told which they were when the film was handed over, and asked for
nothing to be taken out.

## What it is good for

- **A whole story in one film.** He asked for it ("this short has no parts just whole short"), so it has no
  cliffhanger and no "part two", which is an exception to the series rule in [`../../OWNER.md`](../../OWNER.md).
  The last line still has "subscribe" in it and still belongs to the story: "Like and subscribe, from both sides of
  the village." **Use this film when he asks for a story that ends.**
- **Funny (his word).** Where the jokes are: a fight in which nobody touches anybody
  (`3.paws` "Not with our paws"); a list that ends on the wrong thing (`3.lunch` "Then everybody went home for
  lunch"); time told through somebody small (`4.grandma`, `4.grass`: the golems stood so long that grass grew over
  their feet); a hero whose reasons are petty (`4.back`: his back hurts and his fur will not go down); and the plain
  thing two animals would do (`6.sniff`). None is a punchline said to the camera. Each is a picture.
- **The same three bodies, as something else.** The player, the villager and the iron golem, each as a cat and as a
  dog: ears, whiskers, a snout, a tail, a collar. That is the whole cast, and the premise is told by pointing at
  them one at a time (`1.cats` to `1.me`, then `2.dogs` and `2.all`). They are pack parts now.
- **One prop carried through the film.** The line is white blocks (`2.line`), so it can be taken away block by block
  (`5.took`); he carries the last one home (`5.last`); it ends as a pillow for a cat and a dog (`7.block`).
- **Two crowds from one component.** `Side` in `source/kit.tsx` draws a whole side of the village at the line (twelve
  people, the kid, the golem) and takes what they are doing as numbers: `puff`, `arch`, `side`, `sag`, `bark`, `walk`,
  `away`, `search`. `Mixed` is everybody once nobody has a side. Scenes leave people out by index (`skip`) when a shot
  needs the room.
- **A small world.** One zone, 42 shots: one street, a well, and a line. The film leaves the close-up by going up
  (`cam.top` in `2.sides`, `6.gone`, `7.block`) and along the line (`cam.truck`), not by going somewhere else.
- **Who is who from far off.** Cats wear warm colours and dogs cool ones; the teller is the one red shirt, the dog
  kid the one blue.

## Shape

42 shots, 342 words, 1:23.1 (83.1 s), 248 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Cats, and a line | 0:00.0 | 16.8 | 65 | 10 |
| 2 | Every day at noon | 0:16.8 | 13.7 | 50 | 6 |
| 3 | On and on | 0:30.5 | 11.9 | 54 | 5 |
| 4 | That night | 0:42.4 | 8.4 | 35 | 4 |
| 5 | No line | 0:50.8 | 13.6 | 55 | 8 |
| 6 | No sides | 1:04.4 | 18.7 | 83 | 9 |

- Shots: the median holds 1.97 s, the shortest 0.87 s, the longest 3.80 s. 2 are under a second and 2 are over three. About 8.1 words to a picture.
- Camera: 20 `cam.push`, 10 `cam.orbit`, 7 `cam.truck`, 3 `cam.pan`, 2 `cam.top`.
- Places: village 42 shots.

Six beats, not fourteen: his outline has six steps, and a story that ends in one film does not need the rest. The
voice runs at x1.45 with 0.3 s of silence before each beat.

## Sound, measured

177 effects (128 a minute, 28 kinds), the longest stretch with none 1.9 s. Music 18.5 dB under the voice, 1.6 s of
the film without music (on purpose, at `6.quiet`). The voice is 14.7 dB over everything else (median; the worst half
second 5.0 dB, a chime at `7.noline`). −15.4 LUFS, true peak −1.5 dB.

**The sound kit has no bark and no hiss.** A bark is `bonk` at `pitch` 0.75, repeated every 0.17 s (0.5 for the
golem, 0.9 for a happy one). A hiss is `gust` at `pitch` 1.6, `dur` 0.4. The `README` field of `source/sound.json`
says so. He heard the film with these and did not object; a real bark and hiss in the kit would still be better.

## What went wrong on the way

- **A still at one moment misleads when people are walking.** Three shots looked clean at one time and had a walker
  filling the lens at another (`2.not`, `4.grandma`, `2.all`). Shoot every crowded shot at two moments:
  `node scripts/shots.mjs <film> --at 0.3,0.85`.
- **The engine's `sleep` and `lie` clips lie at bed height.** On grass the body floats. Put the figure at y ≈ −0.31
  and patch the pose (`FLOOR` and `propped()` in `source/scene6.tsx`, `posed()` in `source/kit.tsx`).
- **Two golems and two crowds in one tall frame is a wall.** `3.golems` lost both crowds and moved in; the golems
  stand 1.12 m from the line so that they are nose to nose when they lean.
- **`cam.truck` with the default ease runs ahead of a walker.** Give it `ease: "linear"`.
- **Seven effects could not be heard under the music** on the first build; each was raised by 2 to 5 dB.
- **A pack part was built in the film first.** The cats and dogs were written in this film's `kit.tsx` and moved to
  the pack after he approved it. The move was checked with 84 stills (every shot at two moments), before and after:
  the same, pixel for pixel. `source/kit.tsx` is the kit after the move, so it shows a film using them.

## What nobody has checked

No agent has listened to the mix or watched the film move: the numbers were measured, and one frame of each shot was
looked at. The owner has seen and heard the finished film. One weak spot he did not name: in `2.not` a dog walks
close to the lens and its body fills half the frame for a moment.

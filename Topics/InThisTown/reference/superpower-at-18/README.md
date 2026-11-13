# Reference: "In This Town, Everyone Got a Superpower at 18" (part one)

**A film the owner approved.** His words on seeing it: "wow i love it, i love how u made the short". He asked for it
to be kept here so that the next agent can see what a short he likes looks like. The other two folders beside the
treehouse are warnings; this one is a target.

| File | What it is |
|---|---|
| `in-this-town-superpower-at-18.mp4` | The film as delivered: 1080×1920, 2:48, long cut, 90 shots |
| `contact-sheet-every-2-seconds.jpg` | One frame every two seconds, all 84, on one sheet |
| `source/` | A **snapshot** of the film's source on the day it was approved: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene18.tsx`, `film.tsx`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-superpower-at-18/`. `source/` here is a copy to read; it is
not compiled (`tsconfig.json` excludes `Topics/**/reference`) and nothing imports it. If the two ever differ, the one
in `src/videos/` is the film.

## What the owner asked for, and what he threw out

The story is his own outline. Read `source/narration.md` for the words.

- Everyone gets a power at eighteen, and most are useless. Twins: the teller in **red**, his brother in **black**,
  the same model with a different shirt. The brother hurts animals and laughs; the father takes him away and does
  not come back. The teller's power looks like nothing (one daisy), and he hates it.
- The brother comes back and burns the town. His power is **taking powers**. The teller, thrown into the mud, finds
  grass under his hands: his power is **life**. "I know how to beat you." Cliffhanger, and "like and subscribe for
  part two".

**The first draft was rejected**, and the reason is the most useful thing in this folder. In draft one a small rain
cloud put out the brother's fire and the father came home. The owner: *"the ending was disappointing… make their
powers actually look good not just 'HA I have fire!' then removed it, I need something like a realization."*

What that means for the next film:

1. **A power is shown, not announced.** The brother's power is never explained before we see it: Bo jumps at him,
   is caught, green lights leave Bo and go into the black shirt, Bo's robe goes grey, and then the brother does
   Bo's jump (`source/scene15.tsx`). Only then does the narrator name it.
2. **The turn is a realisation, not a rescue.** Nobody arrives to save him. He looks at his own hands
   (`source/scene17.tsx`): mud, then grass, then the same daisy as the day of the bell, then the pig's burnt ear.
3. **Plant it early.** The daisy at the bell (scene 9) and the grass that is "always greener where I slept"
   (`10.grass`) are the same power the film ends on. So is the mother's one sock (scene 2, then `13.sock`).
4. **Do not tidy up.** The father is never explained ("He only smiled"). Part one stops while it is still climbing.
5. **Useless powers are the jokes, and they pay off.** Bo's jump is funny in scene 7 and is the thing stolen in
   scene 15. Tip's "north" is a nuisance until the fire comes from the north.

## What was hard, so you do not find it out again

- **Stills first.** Typecheck and `npm run check` passed with a third of the shots framed wrongly. Every round of
  stills found faults: faces cropped at the eyes, a camera inside a wall, the hero out of frame while he flew.
- **`faceOf` and `chestOf` in the pack are a child's height.** For a grown player use the film's own
  (`source/kit.tsx`), or every close-up is aimed at the chest.
- **A row of four people does not fit a 9:16 frame at 4 m.** Keep them inside 2.2 m and stand back 6–7 m.
- **Fire washes out to pale yellow** if a block is both lit and emissive. The blast and the hand flame here use a
  black base colour with the fire colour as `emissive` at 1 (`Burst`, `Flame` in `source/kit.tsx`).
- **`Blaze` `size` is the size of each cube**, not of the fire. 5 fills the screen with one cube; use 1.3–1.5 and
  several of them.
- **Sound that lands on the last word of a line covers the next line.** The `boom` on "life" had to come down 6 dB.
- Nobody has listened to the mix with ears: it passed the numbers only.

Part two is made and approved: see [`../superpower-at-18-part-2/`](../superpower-at-18-part-2/README.md).

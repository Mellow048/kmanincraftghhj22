# Reference #1 — The Broken Egg

**Title:** In This Town, Everyone Gets a Monster Egg. Mine Was Broken.  
**Runtime:** 20.0 seconds · 30 fps · vertical 720 × 1280 reference render.  
**Story in one sentence:** The kid mocked for hatching a worm discovers it can eat monster fire, and the classmates who laughed end up standing behind him when it becomes their protector.

The two higher-status companions are the boy's **best friend with a dragon** and **sister with a phoenix**. Their monster ranks are visibly higher from the outset. The worm's ranks progress **1 → 100 → 10,000 → ∞**; it grows *because it protects people*, not because a number appears.

## Director's beat sheet (written before the code)

| # | Time | Beat / narration | What the camera sees | Why the camera moves |
|---|---|---|---|---|
| 1 | 0.0–3.8 | **The crack.** “In this town, every kid gets an egg.” | Already close on the hero's *broken* egg in front of his house; an AGE 10 / MONSTER DAY sign and a small rank post provide context. He looks down, not at the camera. | Ease away from the crack so the kid and the conspicuous empty space beside him become visible. The wrong egg is the hook, not an establishing pan. |
| 2 | 3.8–7.3 | **The comparison.** “Mine is broken. I get a worm.” | The worm wriggles out. Ahead on the same street, the best friend's dragon and the sister's phoenix glow above their higher rank plates; their silhouettes dwarf it. | Track from the little egg towards the school. Parallax between the tiny worm, houses, and the big pets makes the status gap legible. |
| 3 | 7.3–11.4 | **The rejection.** “At school, they laugh at us.” | The same group enters the open school door. The dragon guards the hall; the hero carries his worm through. The rival turns away. A first flame threatens a student beyond the classroom door. | One unbroken flight across the street, through the school entrance and into the classroom: geography, not a teleport. The threat enters the new space before the camera. |
| 4 | 11.4–16.0 | **Two discoveries.** “Then it eats the dragon's fire.” / “It grows when it saves them.” | The tiny worm consumes the first blast: rank **100**. It curls around the formerly dismissive kid and stops a larger, hotter blast: rank **10,000**. The face and colours remain recognizable. | A slow side-step and push lets the first growth read, then reveals the rescued classmate behind its body. The second change is earned by a second, harder action. |
| 5 | 16.0–20.0 | **The new team.** “Now they stand beside us.” | The worm rears up as a luminous guardian. A physical infinity glyph lights over the class rank board. The friend and sister join the hero on the same side of the frame; their creatures lower their heads. | Push in and tilt up just enough to hold the worm and ∞ together. Finish on the people who now choose to stand with the kid, not on a faceless statistic. |

**Voice rule:** one first-person teller, present tense, short spoken lines. The long example hook in the topic brief is *not* spoken verbatim; it would consume most of a 20-second film. The extra context is in the image and rank signs. Each line starts when its subject becomes visible. Silence makes space for the fire and the final decision.

## Where the files live

- `src/videos/in-this-town-monster-egg/` — canonical live film source, registered in `src/registry.ts`.
- `Topics/InThisTown/maps/` and `Topics/InThisTown/creatures.tsx` — shared topic kit used by the film; maps are mounted once in `world.tsx`.
- `source/` — **frozen, portable copy** of the film source and shared topic kit, preserving the repository-relative paths. Copy its `src/` and `Topics/` folders into a checkout of this framework, register the film, and run `npm run typecheck && npm run check`. The source copy is a reference snapshot, not a second registered composition.
- `audio/` — copy of the exact voice clips and effects used for the MP4; the live composition reads them from `public/audio/in-this-town-monster-egg/`.
- `monster-egg.mp4` — rendered vertical reference film. Temporary diagnostic stills belong in ignored `out/`, not here.

### Reproduction

From the repository root, after dependencies are installed:

```bash
npm ci
npm run typecheck && npm run check
npm run still -- in-this-town-monster-egg out/hook.png --frame=0   # permission required
npm run render -- in-this-town-monster-egg out/monster-egg.mp4     # permission required
```

`source/` contains the source to **study or copy**, while the root's `src/videos/` is what Remotion actually imports. Do not edit both copies by hand. Make changes to the live film and refresh the reference snapshot before publishing a new MP4.

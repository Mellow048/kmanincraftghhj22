# Reference #1 — In This Town, Everyone Gets a Monster Egg. Mine Was Broken.

**Runtime:** 20.0 seconds · 30 fps · vertical 720 × 1280 reference film.  
**One-sentence story:** The kid mocked for hatching a worm discovers it can eat monster fire; when it shields the boy who snubbed him, that boy comes back to stand beside him.

At age ten, children in this town receive monster eggs. His best friend gets a **legendary dragon** (rank 1M); his sister gets a **phoenix** (rank 10K). His own egg is cracked and hatches a **worm** (rank 1). The worm's visible steps are **1 → 100 → 10,000 → ∞**: the first rank is a discovery, the second an act of protection, the last a transformation witnessed by the other kids. It keeps its green, blocky face at every size. The friend first rejects the kid and later deliberately crosses over to stand by him.

## Director's beat sheet — a shot must change the story

| # | Time | Narration | What must read *without* narration | Why the camera moves |
|---|---|---|---|---|
| 1 | 0.0–3.8 | “At ten, we each get an egg.” / “Mine is broken.” | Start **on the jagged crack**, not a title. Pull out to reveal a lonely kid, the rank-1 stand and the lived-in street in front of his house. | The retreat trades the wrong egg for the person it disappoints. Foreground shell, roadside car, house windows and the school farther away provide depth. |
| 2 | 3.8–7.3 | “My friend's dragon. My sister's phoenix. My worm.” | The shell opens. His small green companion is dwarfed by a purple winged dragon and an orange phoenix with much higher **physical rank plates**. The friend points; the kid is left behind. | Track along the street with shell and worm close, the other kids and pets farther down the same road. Keep dragon and phoenix apart from their owners, not attached to their heads. |
| 3 | 7.3–11.4 | “My friend won't sit with me.” | The friends move away. The little worm follows its kid across the school threshold, down the hall, **past a connected bathroom**, through the second real doorway and into the classroom. The dragon breathes a first tongue of fire. | A single continuous travel proves the neighborhood, hall and class are one place. The school entrance and classroom door have real openings, not cuts through walls. |
| 4 | 11.4–16.0 | “Then it eats his fire.” / “It saves him from the next blast.” | The worm consumes the first fire: **100**. A second, stronger blast is aimed at the very friend who rejected it. It moves between them; only **after** that rescue does the sign show **10,000**. | Ease back as it grows, rather than letting the glow fill the lens. Keep the endangered boy, the source of the flame, the worm and the changing school board in a legible geography. |
| 5 | 16.0–20.0 | “Now he stands by me.” | The same worm rises into a gentle guardian. **∞** lights up on the blackboard. The friend and sister step *in front* of it to the hero's side; even their great pets bow. | A tiny retreat leaves room for the original rejecter to cross the frame. The last image pays off the abandoned child rather than ending on a number alone. |

**Voice:** one first-person teller, one tense, plain 3–10 word thoughts. The hook's long premise is *not* spoken verbatim; the crack, school AGE 10 sign and physical egg display supply the rest. Silence between the lines gives the fire and reunion room. All seven timed lines and the sound bed are documented in [`audio/README.md`](audio/README.md). There are no external Roblox models or assets.

## Files and how to reuse them

- `monster-egg.mp4` — **actual rendered short**, with narration, original effects and music; H.264 720 × 1280, 30 fps. This file is the study reference, not a storyboard or a still image.
- `source/` — frozen copy of the film code and its shared kit, including required engine extensions, registry and the precise audio files, with **repository-relative paths**. See `source/README.md`. Edit the canonical files first; refresh the snapshot from them before releasing a new MP4.
- `audio/` — separately browsable exact MP3s used in this video plus the deterministic Python source for the original bed.
- `src/videos/in-this-town-monster-egg/` — **live implementation** registered in `src/registry.ts` (do not register the frozen duplicate).
- `Topics/InThisTown/maps/` and `Topics/InThisTown/creatures.tsx` — pasteable neighborhood, connected school/restroom and common monster props. The map is mounted **once** in `world.tsx`, never once per scene.

### Reproduce in a checkout of this framework

```bash
npm ci
npm run typecheck && npm run check
npm run still -- in-this-town-monster-egg out/hook.png --frame=0 --gl=swangle
npm run render -- in-this-town-monster-egg out/monster-egg.mp4 --codec=h264 --crf=20 --gl=swangle
```

Run rendering only after the requesting user has approved it (the reference film here was expressly requested). A compatible Chrome/Remotion browser runtime is needed locally. On a machine without one, the `render.yml` GitHub Action can render this composition from the **current branch** and, with `commit_to=Topics/InThisTown/reference#1/monster-egg.mp4`, commit the MP4 back to that branch. Temporary diagnostic frames live in ignored `out/` and must be removed from `reference#1/review/` before delivery.

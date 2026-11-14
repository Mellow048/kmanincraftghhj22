# Reference: "In This Town, I Live in a Monster Village, Part 3"

**Reworked 2026-11-14 after his review** (see the log in [`OWNER.md`](../../OWNER.md)): the arm hides behind a tree, not in the well; one light through the evening; the skull and the arm are seen going back on; the castle has country round it (`Country` in `world.tsx`); the reach is from the front; a longer mansion ending (`scene6.tsx`). The text below describes the first delivery where it differs.

**Not yet seen by the owner** (delivered 2026-11-15). It is **his own outline, beat for beat**
([`../../outlines/monster-village-part-3.md`](../../outlines/monster-village-part-3.md)), plus the mansion scene he
added after reading the script. It is also the **first film made to [`OWNER.md`](../../OWNER.md)**: the premise in the
first second, and no two shots in a row alike. Read [`../monster-village-part-2/`](../monster-village-part-2/README.md) first.

| File | What it is |
|---|---|
| `in-this-town-monster-village-part-3.mp4` | **The film as delivered**: 1080×1920, 2:36, reworked 2026-11-14, full sound. A copy of `renders/in-this-town-monster-village-part-3.mp4` |
| `source/` | A **snapshot** of the source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene6.tsx`, `film.tsx`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-monster-village-part-3/`. Its kit re-exports part two's, and
its world is part two's plus `castle`, `mansion` and `mhall` (the pack's `Mansion`, `DarkOakForest`, `MansionHall`).

## What it is good for

- **Rule A, done.** Frame one is a skeleton's arm standing on its elbow in the grass in front of the lens, with the
  boy small behind it (`scene1.tsx`, `1.town`). Not the village. The line it sits under is the series' premise.
- **Rule B, done.** Each scene has an environment shot, a travelling shot and an odd angle. Examples: straight down
  on the sword and the helmet (`1.found`); the lens chasing the arm down the road an inch off the ground (`3.crawl`);
  from the floor up at dad with his skull on his ribs (`4.look`, second half); inside the sack (`8.dark`); what he
  sees through his own eyelids (`8.blink`); up the side of a tower (`8.towers`); what the chief sees (`10.chief`).
- **A line cut into two or three shots** with `cut:` so a long line is not one long look (`7.plan` is four).
- **Silence on purpose.** The owner asked for "narration stop here and make them move like they are discussing",
  the camera going into a dark block, and a cut out of it. `scene4.tsx`: `# clip 08-cell wait 3.0` in the script
  puts three silent seconds inside `7.plan`; the last shot pushes into the teacher's back with a `Black` block that
  grows to fill the frame; `8.dark` opens on black.
- **A prop that is a character.** `Arm` in `kit.tsx` (crawl, rear, talk, finger, turn) and `heldAt` to put its elbow
  in a hand or a socket; the pack's `Skeleton` took `noArm`, `raise`, `headDrop` for it.
- **New pack parts in use**: `Pillager`, `MansionHall`, `Mansion`, `DarkOakForest`, `IronGolem`, `Villager`.

## What the stills showed, and the rule behind each fix

- **A camera in a room with a roof is under the roof.** Three shots were framed from above the hideout's ceiling
  (5.2 m) and rendered as a plank. A top shot indoors is `height` under the ceiling and a wide `fov` (74).
- **A tree is fatter than its position.** Orbiting a thing at the foot of a trunk put the trunk across the lens. Shoot
  it from the side the thing is on, and light it: dusk under a tree is black.
- **Which way is he facing?** `rotationY = toward(a, b)` faces from a to b; the camera's `yaw` for his face is the
  same angle in degrees. One close-up was of the back of his head.
- **An arm held up to a face hides the face** from the arm's side. Shoot from the other shoulder.
- **Still a narrow frame.** Two people shaking hands 1.6 m apart did not fit; 1.15 m apart, at 22 degrees, they do.
  A sign 2 m wide does not fit at 3 m; scale it to the frame.
- **Arms through bars do not read** from an avatar's `reach`. Draw the arm (`ArmOut` in `scene5.tsx`).
- **A doorway the pack draws dark hides a door that opens inwards.** The shot draws its own door, sliding open a crack.

## What is not known

Nobody has listened to the mix: an agent cannot. The last three fixes (the arms through the bars, the door, the
tree shot) were not seen on stills before the render.

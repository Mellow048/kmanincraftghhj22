# Reference: "In This Town, the Fastest Kid Wins" (part 1)

**Not yet seen by the owner** (delivered 2026-11-15). It is **his own outline**
([`../../outlines/README.md`](../../outlines/README.md), "The race"), beat for beat and in his order. The script was
written while he was away, so he has not read it: what the agent added to his outline is listed at the top of
`source/narration.md` (the baby as one runner who keeps winning, the empty shelf, the pond and the bush as what the
first two buttons do, dad's sign).

| File | What it is |
|---|---|
| `in-this-town-the-fastest-kid-wins.mp4` | **The film as delivered**: 1080×1920, 2:03, 67 shots on 50 lines, full sound. A copy of `renders/in-this-town-the-fastest-kid-wins.mp4` |
| `source/` | A **snapshot** of the source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene4.tsx`, `film.tsx`, `sound.json`, and `sound.gen.py`, the script that wrote the sound sheet |

The film that renders lives in `src/videos/in-this-town-the-fastest-kid-wins/`.

## What it is good for

- **Rule A** ([`OWNER.md`](../../OWNER.md)): frame one is the gold cup, big, and the town running past it. The same
  cup at the same size comes back in the last ten seconds.
- **A race in four places.** `world.tsx` has one zone per stretch (`river`, `desert`, `oak`, `finish`), each with the
  track along z = 2, so one component (`Stretch` in `scene4.tsx`, `Field` in `kit.tsx`) stages every stretch: him,
  the twenty others strung out in front and behind, and his place on a card over his head.
- **A running shot that keeps him in frame.** `cam.truck` moves the lens by `by` over the shot, however long the shot
  is. So the runner's place is `x0 + by * p` (`p` from the second argument of `stage`), never `x0 + speed * t`: with a
  `cut:` the shot is shorter than its line and the lens leaves him behind. Five shots were empty for this reason.
- **Shoes.** `MinecraftAvatar` now takes `shoes` (a colour) and `shoeGlow`. `ShoePair` in `kit.tsx` is the pair as a
  prop, with three buttons on the side and `on` for the one that is lit.
- **"The world in slow motion"** as three still shots (a stride that does not finish, one leaf, one bird: `scene3.tsx`
  `5.slow`, `5.leaf`, `5.bird`), then the same thing from outside at real speed (`5.real`).
- **A villager with a hand**: `Witch` in `kit.tsx` adds a hat and one arm (`wave`, `give`) to the pack's `Villager`.

## What the stills showed

- **Light on a small red thing turns it into a pink blob.** Emissive above about 0.4 and a point light a hand away
  wiped out the shoes in three shots. Keep the glow low and light the scene, not the prop.
- **A board has to fit a phone**: the frame is about 0.4 × distance wide. "RACE: 7 DAYS" did not fit; "7 DAYS" does.
- **Do not push while a stills run is going.** Its last step pushes the frames; a push in between made it fail twice
  (ten minutes each). `stills.yml` now pulls first, but wait anyway.
- **The sound key is `at`, not `offset`** ([`../../SOUND.md`](../../SOUND.md)). `offset` is ignored without a word.

## What nobody has checked

Nobody has listened to the mix. The whole film was read as stills once (67 frames) and the changed shots a second
time; after the last fixes only ten frames of the finished film were looked at. `cam.truck` eases in and out by
default: a running shot needs `ease: "linear"` after it, or the runner drifts out of frame at both ends.

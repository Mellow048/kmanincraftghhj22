# Reference: "In This Town, I Live in a Monster Village, Part 4"

**Second version, 2026-11-15. The owner REJECTED the first (he stopped at 1:05: see `../../OWNER.md`); this is the rework. He has not reviewed this one.** His outline and his changes, word for word, are in
[`../../outlines/monster-village-part-4.md`](../../outlines/monster-village-part-4.md), with what the agent added.
Read [`../monster-village-part-3/`](../monster-village-part-3/README.md) first.

| File | What it is |
|---|---|
| `in-this-town-monster-village-part-4.mp4` | **The film as delivered**: 1080×1920, 2:49.5, 68 lines, 81 shots, full sound. A copy of `renders/in-this-town-monster-village-part-4.mp4` |
| `source/` | A **snapshot** of the source: `narration.md`, `timing.json`, `kit.tsx`, `shared.tsx`, `world.tsx`, `scene1.tsx` … `scene4.tsx`, `film.tsx`, `sound.gen.py`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-monster-village-part-4/`. Its kit re-exports part three's.
Its world is new and all night: `fort` (the castle village with a gap in the east wall, filled by `WallPlug` before
the TNT), `room`, `out`, `horde` and `hallway`.

## What it is good for

- **`Yard` in `shared.tsx`**: one component says where the story has got to (wall whole or not, windows lit, cage
  door, where the teller is). Every castle shot draws it, so nothing is forgotten between shots.
- **The spyglass**: `spyglassPose` + `Spyglass` at `spyglassAt` (he holds it with both arms), and `SpyMask` /
  `spyLook` for what it sees. All in the pack now (`../../siege.tsx`).
- **The hook** (1.town): two seconds of the fight from later in the night, then the boy at his bars.
- **Through the guard's eyes** (3.slow, 3.bam): the jumpscare is aimed at the viewer.
- **The fight** (5.clash, 5.again): one cut per blow, shot from above the cage roofs.
- **`Battle` in `shared.tsx`**: eight fights in the yard that all move (duel, shoot, pounce, chase).
- **The two jokes he asked for**: the man falling off the tower behind the teller (5.fell: the camera is low and to
  one side of the cage, so the tower top shows over the cage roof), and "4 MINUTES EARLIER" (6.earlier: `TopCard`,
  no voice, no track, a march made of effects on the enderman's steps).
- **The siege pieces moved to the pack** (`Topics/Stories/siege.tsx`, table in `PACK.md`): `Horde`, `WatchTower`,
  `Ravager`, `Vex`, `Witch`, `TNT`, `Boom`, `Key`, `Bush`, `Spyglass`, `SpyMask`, `LitWindow`, `Web`. `HordeBlocks`
  (grey boxes for a crowd) is gone: he called it cheap. `CageDoor` stays in the kit: it knows where the cage is.

## What went wrong on the way (do not repeat)

- **A phone frame is narrow.** At fov 40 the picture is only about 0.41 × the distance wide: at 5.6 m that is 2.3 m.
  Two people 3 m apart do not fit side on. Shoot along the line between them (over a shoulder), or stand further off.
- Lantern posts, crates and cage roofs get in front of low cameras. Look at a still of every shot.
- A hut stands where the golem and the ravager "go through a house": the world cannot break it, so smoke and
  stones cover the hit and the two are taken out of the picture. The hut is still standing in later shots.

- **The first version passed every check and he still stopped watching.** A tower that was a solid block, a man
  "holding" a spyglass with his arms at his sides, boxes for a crowd, a jaw that was a painted line, a fight that was
  one wide shot through cage bars. None of that is out of frame, so a framing check does not find it.
- A golem is 6 m tall and white. A camera nearer than 9 m to it shows a white wall.

## What nobody has checked

Nobody has listened to the mix: an agent cannot. The march under "4 minutes earlier" is built from thuds, knocks,
plinks and slide whistles, because the sound tool has one music track (the owner's) and cannot play a second tune.

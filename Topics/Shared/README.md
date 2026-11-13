# Shared parts

What more than one topic builds from. **This folder is not a topic**: it has no `topic.json`, no rules and no
starter, and no film declares it. It exists so that a new topic does not copy a helper out of another topic's
folder, and does not reach into one either.

A film never imports from here. Its topic's pack passes these on (`Topics/<Topic>/index.ts`), the film's
`kit.tsx` passes the pack on, and a scene imports only from `"./kit"`.

## Written for every topic

| File | What | Use it for |
|---|---|---|
| `voxel.tsx` | `Voxels` (`rows` of `#`), `Figure` (`text`), `Icon` (`kind`) | Numbers, signs and small pictures built from cubes, standing in the world. `Figure` writes digits, capitals and `$ % + = : / × < > # * ↑ ↓ → ← ♥`. `Icon` has sixteen kinds: heart star bolt bang question check cross up down eye clock skull coin gem drop crown. Give one an `outline` when it has to read against a pale wall or the sky, and a `glow` at night |
| `clock.ts` | `filmClock(timing)` → `clock.useSince(cue, word)`, `clock.at(cue, word)`, `clock.end(cue)` | "How long ago was this word said?", in seconds of the whole film. For anything that stays on screen across more than one line. Call `useSince` in the world, or in a component the world mounts; never inside a shot's `stage` |

## Passed on from In This Town

These were born in [`Topics/InThisTown`](../InThisTown/PACK.md) and are not about a town. They still live in that
topic's pack, unchanged, because its finished films are built on them. `index.ts` here only passes them on.

| From | Names |
|---|---|
| `staging.ts` | `wordClock`, `pop`, `ramp`, `ease`, `jolt`, `ahead`, `beside`, `faceOf`, `chestOf`, `NORTH` `EAST` `SOUTH` `WEST`, `DEG`, `KID` |
| `players.tsx` | `Player`, `PLAYERS`: twelve people, no two alike |
| `villagers.tsx` | `Villager`, `ROBE`, `ADULT`, `CHILD`, `villagerFace`, `villagerChest` |
| `places.tsx` | `Hut`, `Stall`, `LampPost`, `Room` |
| `things.tsx` | `Bubble`, `Bits`, `BedBox` |
| `creatures.tsx` | `Puffs`, `SoundRings`, `SubscribeSign` |

## Rules

1. A part belongs here when two topics use it and it is about neither.
2. To move a part here for real (out of In This Town's files), take stills of that topic's finished films before
   and after, and prove that not a pixel moved: `python3 scripts/compare-stills.py out/before/<film> out/after/<film>`.
3. Nothing here knows about any film or any topic's places. A part takes a `position`; a part that moves takes seconds.

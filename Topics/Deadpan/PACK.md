# The pack: what a Deadpan film is built from

**Almost nothing here is new.** The blocky people, monsters, places and staging maths in `Topics/Stories` are exactly
what a deadpan short needs, they are already approved by the owner, and they cost nothing to reuse. This topic
re-exports that pack through [`index.ts`](index.ts), so a film imports from one place and never reaches into a
sibling topic directly.

```ts
import { Hero, Villager, Pillager, Mansion, Creeper, IronGolem } from "../../../Topics/Deadpan";
```

The full catalogue with pictures is [`../Stories/PACK.md`](../Stories/PACK.md). Do not copy parts into this folder to
change them; if a part needs a variant, extend it here and say why.

## The cast, mapped to the genre

| In a Deadpan film | Use | Why it works |
|---|---|---|
| The narrator ("I") | `Hero` from a film's own `kit.tsx`, built on `Player` | One loud colour, so the phone finds him in a crowd |
| Clerks, landlords, auditors, customers | `Villager`, `VillagerCrowd` | They have no eyes, so a deadpan boss is free |
| Debt collectors, enforcers, the law | `Pillager`, `Ravager` | A raid that files paperwork |
| The monster that is normal here | `Creeper`, `Enderman`, `Skeleton`, `Slime`, `Blaze`, `Vex` | A mob as a housemate or a co-worker is the joke in one frame |
| Muscle for a sight gag | `IronGolem`, `CatDogGolem` | Slow, huge, obedient — good for top-down geometry |
| The town, the street, the estate | `Hut`, `Well`, `WatchTower`, `LanternPost`, `Fence`, `Stall`, `SchoolDesk` | A normal place that takes the rule seriously |
| Somewhere a rule gets enforced | `Mansion`, `MansionHall`, `LongTable`, `Room`, `KitchenCounter` | A council chamber, an office, a courtroom |
| Night, weather, scale | `NightFill`, `Moon`, `Moonlight`, `Rain`, `Stars`, `ForestEdge`, `Pine` | A deadline that arrives at night |
| Props that carry a plot | `Bubble`, `Boom`, `Smoke`, `Puffs`, `PixelHeart`, `SoundRings`, `Bucket`, `Key`, `PhotoBorder`, `SubscribeSign` | Chekhov's gun, and the button |

Staging maths (`staging.ts`: `A()`, `SEAT`, zone helpers) and the caption/clock helpers come with the pack.

## What this topic has that Stories does not

| Thing | Where | Notes |
|---|---|---|
| The comic-face set | `src/engine/face.ts` | `blank`, `smug`, `surprised`, `angry`, `crying`, `dizzy`, `hollow` are the useful ones here |

## What you will have to build, film by film

Keep these in the film's own folder until a second film needs the same thing; then move it here.

- **Modern places the Minecraft pack has never had:** a flat, a stairwell, an office, a shop counter with a till, a bus
  stop, a car park. Build them like any other set — `Vox` and `Block`, real 3D, lit — not as painted backdrops.
- **Props with text you can read:** a bill, a receipt, a contract, a sticky note, a timer, a label on a box. Use
  `PixelText` on a `Block`. The camera will crash-zoom on these, so they must be legible at 1080 wide.
- **Comic symbols:** `?`, `Z`, `!`, tears — see [`SHOTS.md`](SHOTS.md), section 3.
- **The VHS overlay and speed lines:** full-frame devices; build once, reuse.
- **A phone UI:** a 3D panel, not a 2D overlay (the engine has no 2D layer).

## House rules

1. **Use the pack before you build.** Nine times out of ten the part exists.
2. **Do not restyle it.** The owner approved these as they look.
3. **A new part goes in the film first**, and moves here only when a second film needs it.
4. **Every part must read at phone size** — silhouette first, colour second, detail third.

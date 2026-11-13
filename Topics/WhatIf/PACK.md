# The What If pack

Everything a film of this topic is built from. One import:

```ts
import { Classroom, Overhead, Echo, Classmate } from "../../../Topics/WhatIf";
```

A film's `kit.tsx` imports from the pack and passes the names on, so its scenes import only from `"./kit"`.

![Every part of the pack](pack.jpg)

> **Not yet approved in a film.** Every part here has been rendered and looked at. The topic's first film uses
> all of them except six of the seven looks of a power (`Echo`, `Aura`, `Swirl`, `Streaks`, `Countdown`, `Beam`:
> its power is a heart over a head, `Overhead`) and a `Chalkboard` on its own
> (`src/videos/what-if-you-could-see-who-had-a-crush-on-you/`, one frame of each of its shots:
> [`renders/what-if-you-could-see-who-had-a-crush-on-you-shots.jpg`](../../renders/what-if-you-could-see-who-had-a-crush-on-you-shots.jpg)).
> The owner has not given his verdict on that film yet: it decides what stays. The parts passed on from In This
> Town are the exception: those come from approved films.
>
> The picture above is the sheet of the school, the powers and the cast. The places and the things further down
> were built for the first film and are not on the sheet: look at them in the film's frames.

1 unit = 1 metre. A kid is 1.44 m tall (`scale={KID}`), a grown-up 1.8 m. People stand with their feet on
`position` and face +Z (south) at `rotationY` 0; `NORTH`, `EAST`, `SOUTH`, `WEST` are the four facings.
Everything is deterministic: a part that moves is given seconds (`t`), never a clock of its own.

## The school — `school.tsx` (pictures 1–5)

| Part | Props | Use it for |
|---|---|---|
| `Classroom` | `at` (the middle of its floor), `board`, `boardSub` (words on the board), `night`, `doorOpen` 0–1, `books` | Where a kid with a power is seen by everybody he knows. Nine desks, a board, windows on the west wall, a door on the east. 9.4 × 8 m, 3.6 high |
| `classroom(at)` | → `seat(col, row)`, `face(col, row)`, `desk(col, row)`, `teacher`, `board`, `door`, `aisle`, `at(x, y, z)` | The places in a classroom. Column 0 is by the windows; row 0 is the front. Never type a desk's numbers twice |
| `SchoolHall` | `at` (the middle of its floor), `length`, `sign` | A hallway of lockers, with two classroom doors and EXIT doors at both ends. It runs west to east; 4 m deep |
| `Desk` | `position`, `book` (a colour, or none) | One desk and its chair, for a kid |
| `Chalkboard` | `position` (its middle), `text`, `sub`, `width` | A board with one or two words on it, anywhere |

The south wall of `Classroom` and of `SchoolHall` is **one-sided**: a lens inside sees a wall, a lens behind it
sees straight through. [`SHOTS.md`](SHOTS.md) §2 says how to use it.

## How a power is shown — `powers.tsx` (pictures 1, 6–8)

Give a power ONE of these in its first shot and never change it ([`SHOTS.md`](SHOTS.md) §1). Every part takes
seconds (`t`) and is still when `t` is still: pass the shot's `t`, or `t - wordAt(cue, word)`.

| Part | Props | Use it for |
|---|---|---|
| `Overhead` | `over` (the person's FEET), `kind` (an icon) or `text`, `t`, `tall`, `size`, `color`, `rotationY`, `spin`, `fade` 0–1, `steady` | What only the teller can see about somebody: a heart, a skull, a clock, a number. Pops in as `t` passes 0. `tall` is the person's height (1.44 a kid, 1.34 a seated kid, 1.8 a grown-up). `steady`: it is its own light and takes almost none of the room's. Set it at night near a lamp, where a sign is white next to the lantern and maroon a metre away |
| `Aura` | `position` (the feet), `t`, `power` 0–1, `color`, `tall` | The power is ON. A ring of bright cubes round a body |
| `Swirl` | `position` (the feet), `t` (seconds since it began), `seconds`, `color` | The power arriving, once. A spiral that climbs and is gone |
| `Echo` | `position`, `rotationY`, `walk` (metres), `reach` 0–1, `lean`, `color`, `opacity` | A see-through copy of a person in one colour: five seconds from now, a memory, somebody who is not there |
| `Streaks` | `position` (the middle of the mover), `heading`, `t`, `speed` 0–1, `color` | Speed. Lines trailing behind something fast. Stage it against something dark |
| `Countdown` | `position`, `t`, `from`, `every`, `height`, `rotationY` | A number in the air counting down to 0. The last number turns red |
| `Beam` | `from`, `to`, `grow` 0–1, `color`, `width` | A line of light between two people, or from him to a thing |

**A sign's size is the story.** In the first film a heart is 0.13 m when it is "tiny" and 2.2 m when it is as big
as a heart gets. Three things break at the big end, and all three were found in stills:

- Its glow is capped: the glow behind a heart the size of a door used to white out the frame.
- From closer than about its own size, or from under it, a sign is a flat slab of its colour, or its dark rim. Do
  not draw it in that shot: put a `pointLight` of its colour where it would be, and its light is on the faces.
- It needs something darker than itself behind it. The walls of every set in `places.tsx` are dark for that reason.

## Where the story goes — `places.tsx`

Each set has a function that says where things are in it, the way `classroom(at)` does. The kitchen and the lunch
room have **no south wall**: that is where the camera lives. The gym has four walls and a real door.

| Part | Props | Use it for |
|---|---|---|
| `Kitchen` | `at` (the middle of the floor), `image` | Breakfast at home: a counter, a stove and a window on the north wall, a table, the door to the hall in the east wall, a tall mirror on the west wall. 7 × 6 m, 3.2 high. `image` is the copy drawn inside a `Reflection` |
| `kitchen(at)` | → `stove`, `chair`, `table`, `door`, `bowl`, `mirror`, `glass`, `at(x, y, z)` | The places in it. `mirror` is the floor in front of the glass: stand there facing WEST |
| `Reflection` | `glass` (the x of the mirror), children | What a mirror shows: its children are drawn again on the far side of the wall, flipped. A true reflection from any angle. Draw the same things outside it too: this is only the copy |
| `LunchRoom` | `at`, `sign` | A serving counter on the north wall, four long tables with benches, windows on the west. 12 × 11 m, and only 3.5 high: something can touch the ceiling |
| `lunchRoom(at)` | → `line(i)`, `seat(table, "n" or "s", k)`, `top(table, k, across)`, `cook`, `at(x, y, z)` | The line along the counter faces WEST; place 0 is the one being served. The north bench faces the lens |
| `Gym` | `at`, `night`, `dance`, `banner` | A gym 16 × 20 m and 6 high, a yard, a path of 14 m to the school gate, the street and houses beyond. `dance`: a mirror ball, coloured lamps (none pink or red), flags, balloons, a drinks table, DANCE over the door. `night`: dark windows, the lamp at the gate lit |
| `gym(at)` | → `lights`, `door`, `drinks`, `gate`, `lamp`, `street`, `at(x, y, z)` | `lights` is the middle of the floor, in the one white beam. `lamp` is under the lantern, just inside the gate |

A film switches `night` and `dance` from the look of the shot that is on screen (`world.tsx` of the first film
shows how), so one gym is a gym class by day and a dance at night.

## The small things — `things.tsx`

Nothing here is pink: a power's colour is on no prop ([`SHOTS.md`](SHOTS.md) §1).

| Part | Props | Use it for |
|---|---|---|
| `Dog` | `position`, `rotationY`, `pose` (`stand`, `sit`, `eat`), `wag`, `walked` (metres: the legs trot), `headPitch`, `headYaw`, `headTilt`, `bark` | A dog, knee-high to a kid. It can have a sign over it too |
| `DogBowl` | `position`, `full` | Its dinner |
| `Tray` | `position`, `rotationY`, `empty` | A lunch tray with a plate, a carton and an apple. Carry it with `arms="hold"` |
| `Cup` | `position`, `drink` | A paper cup |
| `Sandwich`, `Cookie` | `position`, `rotation`, `scale` | Half a sandwich; one cookie |
| `CookieStack` | `position` (the table under it), `count` | A pile of cookies that grows: a fraction pops the top one in |
| `Eraser` | `position`, `rotation`, `scale` | White with a blue sleeve. Small enough to throw |
| `Card` | `position`, `rotation`, `text`, `written`, `scale`, `ink` | A card with ONE short word on it in letters a phone can read. `written` is how many letters are on it yet. `ink`: under a lamp, close up, use a darker one than it comes with |
| `Tie` | `position` (the wearer's FEET), `rotationY`, `scale`, `reach`, `swing`, `sway` | A tie on somebody. `reach` 0.56 ends at the belt of the man it belongs to; 0.25 at the knees of the kid who borrowed it |

To put a thing in somebody's hands without doing the sums twice, the first film's `kit.tsx` has
`<Held by={feet} facing={rotationY} out up side>`.

## The people round him — `cast.tsx` (pictures 2–6)

| Part | Props | Use it for |
|---|---|---|
| `Classmate` | `who` (0–11), and every avatar prop: `position`, `rotationY`, `animation`, `face`, `headPitch`, `lookAt`… | One of the class. Twelve looks, no two alike, none in a colour loud enough to be taken for a lead |
| `KIDS` | | The twelve looks, if a film needs to dress somebody like one of them |
| `Teacher` | every avatar prop | A grown-up, a head taller than the class |

**Not in the pack: the teller, the best friend, the one the story is about.** Every film dresses its own in its
`kit.tsx` (the starter has `Hero` and `Friend`): the teller in one loud colour that nobody else wears.

Faces for a kid: `smile grin laugh frown uneasy brave fear wow ouch calm`. Change the face on the cut.

## Shared with the other topics — [`Topics/Shared`](../Shared/README.md)

| Part | Use it for |
|---|---|
| `Icon` (`kind`, `height`, `color`, `outline`, `glow`, `lit`) | One small picture in cubes: heart star bolt bang question check cross up down eye clock skull coin gem drop crown |
| `Figure` (`text`, `height`, `color`, `outline`, `glow`, `lit`) | A number or a short word in cubes. **Words that have to be read in the picture are written with this**, never painted: two short lines of three letters read on a phone where painted text is a blot |
| `Voxels` (`rows`) | Any picture you draw yourself, in rows of `#`: the look of a power the pack does not have |
| `wordClock(timing)` → `wordAt(cue, word)` | Seconds into its shot at which a word is said |
| `pop`, `ramp`, `ease`, `jolt`, `ahead`, `beside`, `faceOf`, `chestOf` | Staging, from In This Town |
| `Room`, `BedBox` | The teller's room at home |
| `Hut`, `LampPost`, `Player`, `Fence` | A street outside, and twelve more people |
| `Bubble`, `Bits`, `Puffs`, `SoundRings` | A speech bubble; bits that fly when something breaks; dust; rings of sound |
| `SubscribeSign` | The red sign every film of the channel ends on |

[The In This Town pack](../InThisTown/PACK.md) describes each of the parts that came from it.

## Adding a part

1. Build it in the film first, in its `kit.tsx`. A part goes into the pack when a second film could use it.
2. Put it in the file it belongs to, with a comment that says what `position` is and what it is FOR.
3. It takes a `position` (or `at`), so it does not know where any film's school is. If it moves, it takes seconds.
4. Add its row to the table above, and add it to the sheet (below).
5. If you change a part that a finished film uses, prove the film did not change:
   `python3 scripts/compare-stills.py out/before/<film> out/after/<film>`.

## Rebuilding the sheet

`pack.jpg` is eight stills of a film that exists only to show the parts. Its source is in [`sheet/`](sheet/):
one shot for each picture (`scene1.tsx`), and the name over each (`labels.txt`). To add a part, put it in a shot
there, or add a shot and a line of `narration.md` and of `labels.txt`. Then:

```bash
npm run new -- "Pack Sheet" --topic what-if
cp Topics/WhatIf/sheet/*.tsx Topics/WhatIf/sheet/narration.md src/videos/pack-sheet/
#   delete the `captions:` line from src/videos/pack-sheet/film.tsx, so the stills have no words on them
python3 scripts/narration.py build pack-sheet --estimate
npm run shots -- pack-sheet --at 0.6 --out out/pack-what-if
python3 scripts/pack-sheet.py out/pack-what-if Topics/WhatIf/pack.jpg --labels Topics/WhatIf/sheet/labels.txt
#   then delete src/videos/pack-sheet/ and take its two lines out of src/registry.ts
```

`sheet/` is left out of the type check, like `template/`: its imports only resolve inside `src/videos/`.

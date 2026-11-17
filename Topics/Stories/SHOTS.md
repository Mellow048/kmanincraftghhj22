# The flight: how an explainer is shot

> **Provisional.** The camera grammar is the framework's own and is not provisional. The numbers on this page
> (how long a flight takes, how far apart the islands are) are a first setting until a reference is measured
> ([`reference/`](reference/README.md)).

The camera of an explainer never cuts. It leaves one thing, crosses the space to the next, and comes to rest on it
while the narrator is still saying its name. That is the Zack D grammar the whole framework started from
([`docs/CAMERA-BIBLE.md`](../../docs/CAMERA-BIBLE.md)): one continuous world, and a camera that never teleports.

What this topic adds is the **clock**. A base film types the time of every move by hand. Here the recorded voice
is the clock, as in every narrated film: one line of `narration.md`, one place the camera comes to rest.

## 1. Stops, and the route

A **stop** is a framing: what the lens looks at, from how far, from which side.

```ts
stop(lookAt, metres, yaw°, pitch°, fov°)
```

- `yaw` 0 stands on the +z side of the thing (its front), 90 on its +x side, 180 behind it.
- `pitch` 10 looks down a little; −5 looks up, from below.
- `fov` 40–46 is the house lens.

A film names its stops once, in `kit.tsx`. Together they are its **route**:

```ts
export const STOPS = {
  open: stop(on(PLACE.ask, 0, 1.2, 0), 11.5, 14, 18, 46),   // the whole island, small in the sky
  sam: stop([SAM[0], 1.25, SAM[2]], 4.2, 20, 3, 40),        // one person, head to knee
  loaf: stop([LOAF[0], LOAF[1] + 0.7, LOAF[2]], 3.6, -14, 10, 40),   // the loaf, and its price over it
  mint: stop([MINT[0], MINT[1] + 1.0, MINT[2]], 5.2, -24, 14, 42),
};
```

A scene is a list of lines and the stop each one lands on:

```ts
export const scene2 = flightScene(timing, {
  id: "scene2",
  title: "One loaf, one emerald",
  from: STOPS.sam,                       // the LAST stop of the scene before this one
  shots: [
    { cue: "2.loaf", to: STOPS.loaf, note: "The one thing everybody knows the price of…" },
    { cue: "4.mint", to: STOPS.mint, lift: 3, note: "Up and over to the machine…" },
  ],
});
```

For each line the camera flies to its stop, arriving a little short of it, and then keeps creeping in for the rest
of the line. It is never still.

| Field | What it does | Default |
|---|---|---|
| `to` | The stop this line lands on | required |
| `travel` | Seconds the flight takes | By distance: 0.5–1.2 s. Never more than 55% of the line |
| `lift` | Metres to rise over the straight line, at the middle of the flight | A tenth of the distance, at most 3. `0` flies straight |
| `via` | Points to fly through: round a tree, over a roof, down a chimney | none |
| `drift` | Metres the camera keeps creeping in after it arrives | 6% of the stop's distance, at most 0.6 |
| `cut` | A hard cut to this stop, not a flight | `false`. At most 2 a film |
| `note` | Why this picture, for these words. At least 24 characters | required |

**Two lines about one thing are two stops.** The camera has to keep moving, so the second line goes somewhere:
closer, round to the other side, onto the price. `near` makes the second stop from the first:

```ts
tag: near(STOPS.loaf, { closer: 1.3, turn: 25, on: [LOAF[0] + 0.1, LOAF[1] + 1.0, LOAF[2]] })
```

`flightScene` throws if a line would leave the camera where it already is.

## 2. The promise is checked

`film.tsx` ends with:

```ts
unbroken(film.scenes, { maxCuts: 2 });
```

It throws, naming the line, if a shot does not begin where the one before it ended (6 cm, 0.75° of lens: the limits
`npm run check` uses on a base film). The usual cause is a scene whose `from` is not the last stop of the scene
before it. `npm run check` fails a film of this topic whose `film.tsx` does not make that call, whose scenes are
not built with `flightScene`, or which declares more than two cuts.

**When a cut is right.** A cut is for a jump no camera could fly: inside the vault, a hundred years ago, the size
of a grain of flour. Say why in the note. A cut to save the trouble of staging a flight is not a reason.

## 3. What the camera looks at is not in the shot

In a film of hard cuts, a shot's `stage` appears on the cut and is gone on the next. That cannot work here: a
camera that flies away from a thing still sees it, and it sees the next thing before it gets there.

So **everything an explainer shows lives in the world for the whole film**, and is driven by the film's clock:

```tsx
export const Exhibit2: React.FC = () => {
  const price = clock.useSince("2.loaf", "price");   // negative until "price" is said, then seconds since
  return (
    <>
      <Bread position={LOAF} scale={2} />
      <PriceTag text="1" position={…} scale={pop(price, 0)} />
    </>
  );
};
```

- A scene file holds an `ExhibitN` (what the beat shows) and a `sceneN` (where the camera goes).
- `world.tsx` mounts every exhibit, next to the islands they stand on.
- An exhibit **waits in its first state** until its word, and **keeps its last state** afterwards. The tag is not
  there before "price"; it is still there when the camera flies back past it thirty seconds later.
- `clock.useSince(cue, word)` is the only clock an exhibit needs. `pop`, `ramp`, `ease` and `jolt` turn it into
  movement.
- Something else on the island should already be moving when the camera arrives: the machine printing, a villager
  walking. An island that only starts when it is looked at feels like a stage set.

## 4. One island, one idea

The world of an explainer is a few floating islands in one sky ([`PACK.md`](PACK.md): `Island`).

- **One idea on each.** An island has an edge, so the frame has an edge.
- **In the order the film visits them**, 14–17 blocks apart: far enough for sky between two ideas, near enough for
  a flight of about a second.
- **Change the height.** An island a block or two higher makes the flight climb. Climb towards the cause, and come
  down for the answer.
- **A bridge joins two ideas that are joined** ("so the baker pays more"). Sky separates two that are not.
- **Go back.** The answer is shown on the first island, changed. The camera flying home is the film saying "and
  that is why".
- Every island the lens rests on needs its atmosphere: a `LightPool` and `Dust` at least, and one `GodRay` and one
  `Glow` in the film (`npm run check` wants all four in `world.tsx`).

## 5. A tall frame is a slit

The frame is 9 wide and 16 high. At a distance of `d` metres it shows only `0.41 × d` metres across at fov 40
(`0.43 × d` at 42, `0.48 × d` at 46), and almost twice that from top to bottom.

- **Stack, never line up.** Three things side by side need 7 metres of distance and turn small. Put them at three
  depths and three heights: the stack on the ground in front, the bag behind it, the chest behind and above that.
- **Hang numbers above things.** A tag over the loaf, a figure over the bar, an arrow over the scales.
- Keep the thing a line is about in the middle 60% of the height: the caption sits at 72%.

Stops that work, measured on the pack's own sheet (`pack.jpg`):

| The subject | Stop |
|---|---|
| A whole island, small in the sky | 11–12.5 m, pitch 6–18, fov 46 |
| A grown-up, head to knee | look at y = 1.25, 4.2 m, pitch 3, fov 40 |
| One thing on a plinth, with its tag hanging over it | look 0.7 m over the plinth, 3.6 m, pitch 10, fov 40 |
| Small things on the ground: coins, notes, a bag, a chest | 3.7–4.0 m, pitch 13–20, fov 40 |
| The printer | 3.7 m, pitch 14, fov 40 |
| A chart 2.4 m tall, with its tags over it | 6.0 m, pitch 5, fov 42 |
| The scales, with an arrow over each pan | 5.6 m, pitch 6, fov 42 |

## 6. When the thing is in the frame

The flight starts as the line starts and takes half a second to a second. So for the first few words of a line the
camera is still on its way.

- Write lines whose first two words can travel: "So the baker…", "And when there is more…". The noun comes after
  them, and by then the thing is in the frame. ([`SCRIPT.md`](SCRIPT.md))
- Hang the action on the word, not on the cut: `clock.useSince("4.flour", "flour")`.
- For a short line (under 1.5 s), put its stop near the last one: a `near`, not another island.
- Review with two stills a stop: `npm run shots -- <film> --at 0.2,0.9`. At 0.9 the camera has come to rest: is
  the thing readable? At 0.2 it is in the air: does the frame still make sense?

## 7. Notes

Every stop has a `note`: why this picture, for these words. "Fly to the mint" is the mechanic. "Up and over to the
machine, because the cause is higher up and further back than the loaf: you have to go and look for it" is a
reason.

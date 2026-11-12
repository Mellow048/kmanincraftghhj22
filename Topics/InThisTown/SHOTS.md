# Shooting an "In This Town" film

What the reference video does with the picture, measured, and how we do the same in Minecraft blocks.
The evidence is in [`reference/treehouse/`](reference/treehouse/README.md): look at the contact sheets before you
read on.

## 1. What was measured

| | |
|---|---|
| Length | 166.5 s |
| Shots | 87 (about 31 cuts a minute) |
| Shot length | Half are under 1.73 s. Mean 1.91 s. Shortest 0.4 s, longest 5.8 s |
| Under 1 s | 16 shots: flashes inside a list ("houses", "bridges") and reaction faces |
| 1–3 s | 59 shots: the normal shot |
| Over 4 s | 4 shots: the look down into the cloud, the old man's stare, the bed, the bag |
| Words per shot | About 8 |
| The teller on screen | In a little over half the shots |
| Captions | One word at a time, every word, about 72% of the way down the frame |

## 2. What the picture does

**It shows the noun.** The cut lands on the word. "Barrels" is a shot of barrels. "Fruits" is a hand on a fruit.
"Rope bridges" is a rope bridge. In the tour there are 15 shots in 23 seconds, one per thing named.

**It keeps coming back to the teller.** After two or three things, his face. He is how the viewer knows what to
feel about them. He is almost always centred, waist up, looking near the lens.

**The face changes on the cut.** The original swaps flat face pictures: bored, glaring, happy, nervous, asleep,
screaming. There is no lip sync and nobody misses it. A new face with a new shot reads as a new thought.

**Every shot moves.** A slow push in. A pull back. A small arc around a head. A pan along a bridge. The bodies barely
move: an arm scratching a head, a wave. The camera carries the energy, and it never stops.

**The long shots are the held breaths.** Four shots run over four seconds, and each is a moment of waiting: staring
into the cloud, the old man deciding what to say, lying awake, the packed bag. Each still moves: the bed shot
rotates, the bag shot pulls back.

**Lists get flashes.** "Hundreds of wooden houses" is two shots of half a second each.

**Top-down for things on the floor.** The bed and the bag are both shot straight down.

**Colour tells the three acts apart.** Bright blue sky and warm wood for the town. Flat white for the fall. Night blue
and orange fire for the truth. The viewer can tell where they are in the story from one frame.

**The ending is five quick pictures.** His face drops. The dead city, wide. The sign, from behind. His horror, close
and low. The bright town again for one second. Then the subscribe sign, straight to camera, and out.

## 3. Our rules

`topic.json` holds the numbers that `npm run check` enforces.

1. **One script line, one shot.** The line names what the shot shows. 5–12 words is normal; over 18 is two shots.
2. **Median shot between 1.4 and 2.3 seconds.** No shot over 6. Use a 4–6 second shot three or four times, for waiting.
3. **Every shot moves**, and moves one way. Use a camera recipe (section 5).
4. **Come back to the teller** at least every third shot.
5. **Change the face on the cut**, not during the shot.
6. **Fill the frame.** A person is a medium shot unless the place is the point. Lens 30–46°. Never the 76–88° of
   version 1, which made everyone small.
7. **One colour world per act.** Set `look` on the shot when the act changes.
8. **Wides are for two jobs only:** to show the town at the start, and to show the truth at the end.
9. **Captions are the engine's.** Do not draw text over the picture in a scene.

## 4. From Roblox to Minecraft

| The original | Ours |
|---|---|
| Blocky R6 figure, arm loops of two keyframes | `MinecraftAvatar` clips: `idle`, `talk`, `walk`, `run`, `reach`, `reachUp`, `point`, `wave`, `sit`, `lie`, `sleep`, `scared`, `panic`, `cower`, `crouch`, `peek`, `lookAround`, `jump`, `fall`, `leanOver` (over the rim of a well), `push` (something heavy) |
| Six face pictures | The `face` prop. Bored → `neutral`. Glare → `angry`. Happy → `happy`. Nervous → `worried`. Asleep → `sleepy`. Scream → `scared` or `surprised` |
| Hair meshes and printed shirts | Block colours: `skin`, `hair`, and `colors={{ torso, arms, legs }}`. One loud colour per character, so a phone can tell them apart |
| Roblox props | `Block`, `Sign`, the creatures in this folder. A prop used by more than one film goes in `src/engine/` |
| Skybox and sun | `look: "overworld-day"`. Night is `"overworld-night"` (an even blue), or `"lantern-night"` (nearly black: the lamps in the world light it; see "A film at night" in `PACK.md`) |
| Three places | `<Zone name="…">` groups in `world.tsx`. A shot sets `zone` and the others are not drawn |
| Captions: bold lowercase, white with a black edge | Engine captions: pixel capitals, white with a black edge, same height on the frame, a small pop on each word |
| A fast male voice | One recorded narrator, sped up by `scripts/narration.py` to the pace in `topic.json` |
| A grey square sliding under the cloud | The same trick: one dark `Block` under a `FogCard`. Cheap is fine if it reads |
| Camera behind the sign, so no text is needed | The same, or a real `Sign`: ours can carry text |
| The "SUBCRIBE" plaque | A `Sign` held to camera. Spell it correctly |

## 5. Camera recipes

`cam` (from `src/engine`) turns a director's sentence into a move. Spread one into each shot.

```tsx
{
  cue: "3.bakery",
  ...cam.push({ on: [4, 1.2, -2], dist: 3.4, to: 2.6, yaw: 25, pitch: 6 }),
  look: "overworld-day",
  zone: "town",
  note: "The word is 'bakery': the dragon lights the oven and the baker does not even look up.",
  stage: (t) => <Bakery fire={t} />,
},
```

| Recipe | What it is | Use it for |
|---|---|---|
| `cam.push` | Dolly in (`to` smaller than `dist`) or pull out | Almost everything. Faces, objects, reveals |
| `cam.orbit` | Swing around the subject from `yaw` to `yawTo` | A thought, a decision, a reveal of what is behind someone |
| `cam.pan` | Camera fixed, the look sweeps from `on` to `onTo` | Along a row, from a face to what it sees |
| `cam.truck` | Camera and look slide together | Beside a walker |
| `cam.top` | Straight down, with an optional `spin` | A bed, a bag, a thing on the ground |

`yaw` is where the camera stands: 0 is in front of an actor whose `rotationY` is 0, 90 is at their left hand side
(+X), 180 is behind. `pitch` is height: positive looks down, negative looks up.

## 6. The frame is a slit

A 9:16 frame with a 40° lens sees **23° across and 40° up and down**. At three metres that is a picture 1.2 m wide
and 2.2 m tall: one person, and nothing beside them. Every framing mistake in the first film came from forgetting it.

**Stack, do not line up.** Two things go in a tall frame one above the other:

- **By depth.** The near thing low in the frame, the far thing over it. Egg at the bottom, his face above it. A kid in
  front, a golem's head over his shoulder. Raise the camera and tilt down (`pitch` 15–30) to spread depth up the frame.
- **By height.** Put one of them on something. The oldest woman sits on a raised porch so she is above the kid she
  talks to. The best friend sits on his dragon.
- **From above.** `cam.top` turns a floor into a tall picture: the bed, the bag, the well, four dragons round an egg.

**Keep the near person off the lens axis.** Someone 1.5 m from the lens covers half the frame. Over a shoulder means
the shoulder is at the *edge*, or the camera is above the head looking down.

**Check what is straight behind a close face.** It will look like it is growing out of the head.

Distances that worked, measured on the finished film. `on` is the look point; a kid here is 1.44 m tall (scale 0.8),
an adult 1.8 m.

| Shot | `on` | `dist` → `to` | `fov` | Example |
|---|---|---|---|---|
| Kid's face | face, y 1.2 | 1.9 → 1.4 | 36 | `9.not`, `4.but` |
| Kid, waist up, holding something | chest, y 1.0 | 2.1 → 1.6 | 38–40 | `5.hold`, `1.eggs` |
| Kid, whole body | y 1.0 | 2.4 → 1.9 | 40 | `1.me`, `8.decide` |
| Adult's face | face, y 1.85 | 1.8 → 1.3 | 36 | `7.stare` |
| A thing in the hands | the thing | 1.6 → 1.2, pitch 30 | 38 | `4.broken` |
| A thing on a table or the ground | the thing | 1.4 → 1.0 | 36–38 | `8.alive`, `15.split` |
| Two people, in profile | between them | 4.7 → 4.2 | 40 | `7.ask` |
| A dragon and its rider | between them | 5.0 → 4.2 | 40 | `3.friend` |
| A golem | its chest, y 2.0 | 5.6, low | 42 | `3.golem` |
| Straight down on a bed | the bed | height 3.6 → 2.9 | 44 | `6.bed` |
| The street from above | the middle of it | 27 → 21, pitch 21 | 50 | `3.town` |
| Something bigger than the town | its middle | 46 → 41, low | 56 | `17.land` |

## 7. Faces

The face changes on the cut, and it is how the viewer knows what to feel. For a kid use the story set:
`smile` `grin` `laugh` `frown` `uneasy` `brave` `fear` `wow` `ouch` `calm` (eyes shut). The older names
(`worried`, `angry`, `sad`, …) were drawn for the horror films: a heavy brow that reads as a threat on a child.

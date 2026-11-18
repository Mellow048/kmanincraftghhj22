# Shooting a Deadpan film

The picture is where this topic differs most from Stories. A Stories film is allowed to breathe; a Deadpan film is a
machine gun with a straight face. Everything below is the brief's camera grammar, mapped onto what the engine already
does — **use the function that exists, build only what is missing.**

The numbers `npm run check` enforces are in [`topic.json`](topic.json): 95–115 shots, 0.8–1.4 s a shot, median under
1.6 s, nothing over 3.2 s.

## 1. One action, one angle

Every noun, verb and clause gets its own shot. A three-clause sentence is three shots:

```
"I put the keys in my pocket. (shot) So he took my pocket. (shot) Legally. (shot)"
```

- One line of narration is never one shot in this topic. It is **one to three**, cut on the noun.
- A shot is 0.8–1.4 s. If a shot needs longer, it is two shots.
- Never cut on a cut that looks the same. Alternate distances: wide → face → prop → face → overhead.
- `storyScene` gives one shot per cue; a cue that carries three angles is written as `scene1a.tsx`, `scene1b.tsx`
  with the same cue split by `at` — see how `in-this-town-robot-at-18` cut inside a line (`scene6.tsx`).

## 2. Expression snaps, never lip-sync

Faces are decals; they change on the cut, not during it.

- Set `face` per shot. The engine has 26 (`FaceName`): use `blank` for deadpan, `surprised` for bug-eyes,
  `smug` for the antagonist, `angry`, `crying`, `dizzy`, `hollow`, `hurt`, `fear`, `wow`, `sleepy`.
- **Deadpan is a face too.** The narrator's default is `blank` or `calm`; a panic shot only reads as panic because the
  previous shot was flat.
- Never animate a face sliding in. A two-frame pop on the cut is the whole effect.
- Missing: extra comic decals (sweat drop, red rage, waterfall tears). If a film needs one, add a `FaceName` in
  `src/engine/face.ts` — it is a 16×16 bit table, not an image — and use it across films.

## 3. Floating comic symbols (build per film)

A small device, the way the doorway film built its doorway: `PixelText` (or a cube) floating in 3D space, snapped on
and off with the shot.

| Symbol | When | How |
|---|---|---|
| `?` | confusion, a rule nobody explains | one yellow glyph, 0.2 m, beside the head |
| `Z Z Z` | sleep, boredom, a meeting | three, rising, each smaller |
| `!` | a knock, a fine, a bill | red, dead centre for 0.3 s |
| tears | the button ending | two blue cubes under the eyes |

Rules: it exists in the world (it obeys the camera, it is lit), it lasts one shot, and it never appears on the
narrator's deadpan face. Symbols are for the *other* characters.

## 4. Shot-reverse-shot reaction loop

The engine's default rhythm for a confrontation:

1. MCU narrator, deadpan (`blank`), 1.0 s.
2. MCU antagonist, smug or angry, 0.9 s.
3. Bystander, one shot, 0.8 s, no line of narration of its own.
4. Back to the narrator, now slightly worse off.

Repeat with a new detail each loop; never repeat a loop with the same information.

## 5. Crash zooms

The punchline shot. `cam.push` from a medium to a face or a readable prop, ending the *sentence* on the close-up.

```ts
...cam.push({ on: A("shop", 0, 1.35, 0.4), dist: 3.0, to: 0.9, yaw: 8, pitch: 3, fov: 44, fovTo: 30 }),
```

- Ends on the prop: a timer, a note, a label, a receipt, a number on a door.
- One per 20 s. A crash zoom on everything is a zoom on nothing.
- The prop must be legible at 1080×1920 without captions.

## 6. Following a thrown or dropped thing

`cam.pan` moves the look point from A to B while the camera stays put; `cam.truck` slides the camera sideways. Use
`pan` for a prop crossing the room, `truck` for a gaze that whips to a new speaker.

```ts
...cam.pan({ from: A("kitchen", -2.2, 1.5, 1.8), on: A("kitchen", 0.4, 1.2, 0.2), onTo: A("kitchen", 2.4, 0.9, -1.4), fov: 42 }),
```

`ease: "linear"` when the thing is actually flying; `inOutCubic` when the camera is only looking.

## 7. Shake, jolts and whip pans

Already in the engine; do not fake it with a moving set.

- `handheld: 0.008–0.02` on **every** shot of this topic. That is the "never static" of the brief.
- `shake: 0.02–0.05` for a sustained rumble (a truck outside, a crowd).
- `impacts: [{ at: 0.6, amp: 0.09 }]` for a knock, a shout, a sneeze, a door. The impulse is timed inside the shot,
  not on the cut.
- A whip pan is `cam.pan` with a short travel and `ease: "inSine"`, plus `shake` on the landing. Directional motion
  blur is **not** implemented: if a film needs it, it is a post effect in `src/engine/shaders.tsx`, not a scene.

## 8. Angles for scale

- **Low angle:** `pitch: -12` to `-20`, aimed at a landlord, a banker, an auditor, a wall of a building. The subject
  fills the top of the 9:16 frame and the sky is behind them.
- **Top-down:** `cam.top({ on, height, to, spin })` cuts straight overhead. Use it for group geometry — a crowd in a
  circle passing cash, a family in one bed — and cut to it from a face, never from another wide.
- **Roll:** `roll: 0.08` on a shot where the world is wrong. Use it twice a film at most.

## 9. POV, phones and chases

- **POV prop insert:** camera at eye height looking down at hands; `pitch: -30`, `dist: 0.6`. The object must be
  modelled (a bill, a key, a phone).
- **Phone UI:** a thin 3D panel at 1.5 m, screen made of `Block`s and `PixelText`; the camera pushes into it. It is
  geometry, not a 2D overlay — the engine has no 2D layer.
- **Snorricam chase:** the camera parented in front of a running character, `cam.truck` with `ease: "linear"`, plus
  `shake` — the engine can do the lock; white radial speed lines around the edge are a **new device** (build as a
  ring of thin white bars behind the camera, or a post effect).
- **VHS flashback:** a full-frame overlay device: scanlines (thin dark bars), `PLAY ▶` and a timestamp in the corner,
  a slight desaturation on the shot. Build it once in this topic and reuse it across films.

## 10. The frame is a phone

- Faces and props live in the **upper 70%**. Captions own the bottom third.
- A person is a medium close-up by default; the environment is a choice, not a habit.
- Shoot *along* a room, not across it, or the wall eats the frame.
- Lens 30–46°. Under 30 is a cartoon squeeze; over 50 makes people small in a vertical frame.

## 11. Captions

One word at a time, lower third, sentence case — **the engine's captions, unchanged**. White letters, black edge, a
two-frame pop on the cut. This topic does not restyle them: the caption design is shared by every film in the
project, and it is in every short the owner has approved.

```ts
captions: { words: timing.words, y: 0.78, letterCase: "lower" },
```

## 12. The read-back

Print a frame sheet of every shot and look for these, in this order:

1. Two shots in a row that look the same → cut one.
2. A face that is not readable at phone size → get closer.
3. A prop the narration names but the frame does not show → the shot is wrong.
4. A held shot → split it.
5. A shot with no handheld drift → it is a photograph, not a film.

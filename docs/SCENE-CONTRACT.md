# SCENE CONTRACT

The exact API for a film. If you follow this, scenes can be yanked out, fixed and re-ordered without breaking the world.

Read `AGENTS.md`, `docs/CAMERA-BIBLE.md` and `docs/STYLE.md` first.

---

## 1. Folder

```
src/videos/<slug>/
  world.tsx
  actors.tsx
  characters.tsx   optional duo + extra cast (copied from templates/cast)
  scene1.tsx
  scene2.tsx
  ...
  film.tsx
```

`<slug>` is the kebab-case title, e.g. `the-schedule`.

---

## 2. `film.tsx`

```tsx
import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";

export const film = defineFilm({
  id: "the-schedule",
  title: "The Schedule",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "hospital-night",
  post: { exposure: 1.18, bloom: 1.35 },
  fadeIn: 0.5,
  fadeOut: 0.8,
  World,
  scenes: [scene1, scene2],
});
```

| Field | Required | Notes |
|---|---|---|
| `id` | yes | kebab-case, same as folder/registry; used by Remotion |
| `title` | yes | human title |
| `fps` | no | default 30; use 30 |
| `width`/`height` | no | default 1080×1920; keep vertical |
| `look` | no | one of the presets in `src/engine/Look.tsx` |
| `post` | no | `{ exposure, bloom }` only. No postprocessing package. |
| `audio` | no | one music/voice track from `public/` via `{ src, volume? }` |
| `audioCues` | no | timed voice/SFX clips from `public/`: `{ src, at, duration?, volume? }[]`, where `at` and `duration` are seconds |
| `fadeIn`/`fadeOut` | no | seconds; the only 2D event allowed |
| `World` | yes | mounted once for the whole film |
| `scenes` | yes | ordered beats; total = sum of durations |

### Film rules

- One `World` per film. It is mounted once.
- One `ThreeCanvas` per film. `defineFilm` owns it.
- Do not add a second canvas, a 2D overlay or an HTML layer.
- `post.bloom` scales the 3D glow cards. It is not a screen-space bloom.
- `audioCues` are sound only, scheduled outside the 3D canvas. Example: `{ src: "audio/scene1.mp3", at: 0.15, duration: 2.7, volume: 1 }`. File paths are relative to `public/`. A cue with no duration plays until its file ends; a duration can keep a spoken line inside its beat.
- If you change `post`, do not re-add `@react-three/postprocessing`; it breaks under software WebGL.

---

## 3. `world.tsx`

```tsx
export const World: React.FC = () => (
  <group>
    {/* floor, walls, ceiling, openings, props, lights, atmosphere */}
  </group>
);
```

### World owns
- Floor, walls, ceiling, baseboards, trim, seams, vents.
- Door frames, doors, windows, locks, signs, clocks.
- Beds, lockers, monitors, gurneys, chairs, curtains.
- Global lights and practicals.
- God rays, light pools, glow cards, dust, fog.

### World does not own
- The hero actor's performance (that is the scene).
- Scene-specific reveals or props that appear only in one beat (put them in the scene, but keep the set consistent).
- The camera. The camera is per scene.

### Coordinates
- 1 unit = 1 metre.
- Floor at `y = 0`.
- `MinecraftAvatar` position is the feet/ground point.
- `rotationY = 0` faces +Z.
- Write the room bounds and door/hall coordinates in a comment at the top of `world.tsx`. Future scenes depend on them.

### World checklist
- [ ] At least 3 light sources with different jobs.
- [ ] At least one `GodRay`, `LightPool`, `Glow` and `Dust`.
- [ ] Every door has a `DoorFrame`.
- [ ] Every window has a sill/curtain/light.
- [ ] Every bed is a `Bed` with bedding, not a box.
- [ ] Wall seams, vents, posters or signage break up long walls.
- [ ] The world edge is hidden by fog, a wall or a window.
- [ ] The camera path does not pass through geometry.

---

## 4. `sceneN.tsx`

```tsx
import { clamp01, defineScene, smoothstep, useTime } from "../../engine";
import { Kid } from "./actors";

export const scene1 = defineScene({
  id: "scene1",
  title: "The Room",
  duration: 4.0,
  shots: [
    {
      at: 0,
      dur: 4.0,
      from: [1.62, 1.98, 2.48],
      to: [0.86, 1.62, 1.78],
      target: [-1.72, 1.24, -0.88],
      targetTo: [-1.8, 1.38, -0.72],
      fov: 52,
      fovTo: 44,
      ease: "inOutSine",
      note: "Push in on the boy so the empty half of the bed becomes the second character.",
    },
  ],
  Component: () => (
    <>
      <Kid headYaw={-0.1} headPitch={0.22} />
    </>
  ),
});
```

### Scene rules
- `id` is unique inside the film: `scene1`, `scene2`, ...
- `duration` is seconds. It must equal the sum of `shot.dur`.
- `shots` is ordered by `at`.
- Every shot has a `note` with the story reason.
- `Component` is the performance. It uses `useTime()` (scene-local seconds).
- Do not use `useCurrentFrame()` inside a scene sequence. Use `useTime()`.
- Use `useFilmTime()` only outside sequences (e.g. a global overlay, which you should not have).

### Shot fields

| Field | Required | Meaning |
|---|---|---|
| `at` | yes | start time inside the scene, seconds |
| `dur` | yes | shot length, seconds |
| `from` | yes | camera start position `[x, y, z]` |
| `to` | no | camera end position; omit for locked-off |
| `path` | no | multi-point flight path; overrides `to` |
| `target` | yes | look-at point at the start |
| `targetTo` | no | look-at point at the end |
| `targetPath` | no | multi-point look path |
| `fov` | no | vertical FOV, default 38 |
| `fovTo` | no | FOV at the end |
| `ease` | no | `linear`, `inOutSine`, `inOutCubic`, `outCubic`, etc. |
| `arc` | no | sideways bow for an orbit; ignored when `path` is set |
| `shake` | no | handheld noise, 0.005–0.03 |
| `roll` | no | camera roll, radians; keep tiny |
| `aim` | no | raise/lower the look point for headroom |
| `note` | yes | why the shot exists; not a mechanic description |

### Shot length rules
- 1.2–5.0 seconds normally.
- A shot longer than 5.0 seconds is allowed only if it is a continuous `path` move (5–7s).
- A static/locked shot longer than 2 seconds is a red flag.
- Every scene needs motion. `npm run check` enforces the mechanical part.

---

## 5. Camera continuity

The camera is a physical object. Across scene files:

```
scene N: to = [x, y, z], targetTo = [x, y, z], fovTo = F
scene N+1: from = [x, y, z], target = [x, y, z], fov = F
```

Copy the values exactly. If you intentionally cut, make the cut motivated and write it in the shot note. A silent teleport is the most common failure in this framework.

Use `path`/`targetPath` for a fly-through. The path is sampled with Catmull-Rom; keep points inside the world and away from walls. A path through a doorway needs a point just before and just after the threshold.

---

## 6. Actor contract

```tsx
<MinecraftAvatar
  position={[x, 0, z]}      // feet on the floor
  rotationY={Math.PI}       // 0 faces +Z
  scale={1.12}
  animation="walk"
  animSpeed={0.65}
  phase={-0.7}
  face="hollow"
  skin="#171d2a"
  hair="#0a0e16"
  outfit="shadow"
  faceGlow={0.85}
  rim={0.5}
  headPitch={0.1}
  blink
/>
```

Secondary motion is automatic: the chest breathes, the hips shift weight when
idle, and the eyes dart. Damp it with `breath={0.5}` / `weightShift={0}` and
disable the darts with `saccade={false}`. Walking actors should take their head
yaw from `useWalkPath().headYaw`, not a hand-authored constant.

- `position` is the ground/feet point, not the centre.
- `rotationY=0` faces +Z; `Math.PI` faces the camera if the camera is at lower Z.
- Sitting: the hips must land on the bed. Use the `sit` pose and set the bed/seat height in `actors.tsx`.
- Walking: use `walk` with `animSpeed` and `phase` so the feet do not slide. If the actor moves in the scene, match the distance to the cycle.
- Faces: only 8×8 maps from `src/engine/face.ts`. `hollow` is the glowing-eye face.
- `rim` adds a cool self-light to the body; it no longer overwrites the face glow (fixed in the engine).
- `faceGlow` makes the eye pixels emissive. Add `Glow` sprites at the eyes only if the close-up needs a bloom halo.

---

## 7. Determinism

Remotion renders frames out of order. Every frame must be a pure function of `frame`.

- Use `useCurrentFrame()` / `useTime()`; never `Date.now()`.
- Never use `Math.random()` in a component. Use `mulberry32`/`hashString` from the engine, or a fixed `seed` prop.
- No `useState` that changes over time. No `useEffect` that advances an animation. No timers.
- No network requests, no external images, no video textures.
- Textures are procedural canvas textures; keep `NearestFilter`.

---

## 8. Adding a prop

If the set needs something new:

1. Add it to `src/engine/props.tsx` (or `fx.tsx` for atmosphere).
2. Export it from `src/engine/index.ts`.
3. Use it in `world.tsx`.
4. Document it in `docs/STYLE.md` if it is reusable.

Do not create a one-off `BoxThatIsTotallyABed` in a scene folder. The next film will need the same bed.

---

## 9. Scene checklist

- [ ] `id`, `title`, `duration`, `shots`, `Component`.
- [ ] Shot durations sum to `duration`.
- [ ] Every shot has a `note` longer than a mechanic label.
- [ ] At least one camera or actor move.
- [ ] Starts where the previous scene ended.
- [ ] The narration line matches the image.
- [ ] The hero frame has foreground/midground/background.
- [ ] The face is readable at 9:16.
- [ ] No 2D overlays.
- [ ] `npm run typecheck` and `npm run check` pass.

---

## 10. Minimal scene with a cut

```tsx
export const scene2 = defineScene({
  id: "scene2",
  title: "The Timetable",
  duration: 3.6,
  shots: [
    {
      at: 0,
      dur: 1.9,
      from: [0.5, 1.98, 0.9],
      to: [-0.9, 2.0, -1.3],
      target: [-1.8, 1.95, -2.94],
      fov: 42,
      fovTo: 34,
      ease: "inOutCubic",
      note: "Insert: the only object in the room that pretends tomorrow will be normal.",
    },
    {
      at: 1.9,
      dur: 1.7,
      from: [-0.7, 1.5, 0.4],
      to: [-1.0, 1.46, 0.0],
      target: [-1.8, 1.37, -0.72],
      fov: 34,
      ease: "inOutSine",
      note: "Cut on his breath. He is not looking at the chart; the move keeps closing in.",
    },
  ],
  Component: () => <Kid headPitch={0.26} />,
});
```

Two shots, one motivated cut, both under 5 seconds. This is the normal shape. The fly-through is the exception, not the default.

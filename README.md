# ZackCraft Films

A Minecraft-native, Zack D Films-style **3D vertical short** framework.

One folder per video. One TSX file per scene. One shared `world.tsx`. One camera that never teleports. Hook-first narration, detailed sets, three-light cinematography, god rays, dust, light pools and pixel faces — built with Remotion, React Three Fiber and Three.js.

This is not a template for "a Minecraft video". It is a director's framework with a working 20-second demo, a camera bible, a style bible, a scene contract and a lint script that fails lazy work.

---

## The demo

`src/videos/the-schedule/` — **The Schedule**, 20.2s, 9:16, 30fps.

A boy alone in a night ward. The timetable says he is alone until morning. The hallway light comes on. One unbroken camera move leaves the room, crosses the threshold and reveals what was already standing in the hall.

| Beat | Scene | Time | Camera |
|---|---|---|---|
| The Room | `scene1.tsx` | 0–4.0 | Slow push from the door corner |
| The Timetable | `scene2.tsx` | 4.0–7.6 | Insert, then cut to his face |
| The Sound | `scene3.tsx` | 7.6–11.0 | Hold, then pan to the open door |
| Through the Door | `scene4.tsx` | 11.0–17.0 | One continuous fly-through |
| It Sees Him | `scene5.tsx` | 17.0–20.2 | Close push, one step |

The demo is intentionally a complete film, not a blockout: detailed room and hallway, procedural textures, pixel faces, 8 animation clips, warm practicals, cold moonlight, god rays, dust, fog, light pools, contact shadows and a figure with a rim light.

---

## Quick start

```bash
npm install
npm run dev          # Remotion Studio
```

Open the `the-schedule` composition. Scrub it. Then read `AGENTS.md` before making your own.

> **Render policy:** do not render on the user's laptop unless they explicitly ask. `npm run typecheck` and `npm run check` are always safe. Rendering is CPU/GPU-heavy.

---

## Make a new film

```bash
npm run new -- "The Title"
```

This copies `templates/video/` into `src/videos/the-title/` and adds it to `src/registry.ts`. It creates:

```
src/videos/the-title/
  world.tsx       the set, lights, atmosphere
  actors.tsx      shared cast defaults
  characters.tsx  two-lead duo + reusable extra cast
  narration.md    the spoken lines, linted by npm run check
  scene1.tsx      the first beat
  film.tsx        metadata + scene order
```

Then:

1. Read `AGENTS.md`, `docs/NARRATION-RULES.md`, `docs/CAMERA-BIBLE.md`, `docs/STYLE.md`, `docs/SCENE-CONTRACT.md`, `docs/NARRATION.md`.
2. Write the beat sheet before the code.
3. Build `world.tsx` first: architecture, props, three lights, `GodRay`, `LightPool`, `Glow`, `Dust`.
4. Build the actors and scenes. For a story film, start from `characters.tsx` and cast a duo. Copy `scene1.tsx` for each beat.
5. Match every scene boundary exactly: `to` → next `from`, `targetTo` → next `target`, `fovTo` → next `fov`.
6. Run `npm run typecheck && npm run check`.
7. Ask for permission before rendering.

---

## The rules

The full contract is in `AGENTS.md`. The short version:

- **Strictly 3D.** No HTML, images, CSS cards, 2D overlays or screen-space postprocessing. Text lives on 3D signs. Fades are the only 2D event.
- **One world.** `World` is mounted once per film. Scenes are Remotion sequences, not separate canvases.
- **The camera never teleports.** Copy the exact end values into the next scene's start.
- **Hook in 1.5s.** The first line and the first image arrive together.
- **Talk like a person.** One teller, plain words, 3–10 words a line. No action lists, no wise-old-man voice, no AI summaries. See `docs/NARRATION-RULES.md`.
- **Motion in every scene.** A new view every 4–5s; a continuous path move may run 5–7s.
- **Cuts are earned.** 3–5 shots in a 20s film. No cut spam.
- **Detailed sets.** A box is not a door, a bed or a locker. Use the engine props and add hardware, trim, seams, vents, signs, bedding and light spill.
- **Three lights minimum.** Key, practical, rim/kicker. Plus `GodRay`, `LightPool`, `Glow`, `Dust`, `FogCard`.
- **8×8 pixel faces.** Never realistic. `hollow` is the glowing-eye face.
- **~20s.** Hard ceiling 21s. One idea, one turn, one button.

`npm run check` enforces the mechanical parts. It cannot enforce taste. A human must look at the frames.

---

## Project structure

```
src/
  engine/
    anim.ts            walk, run, jump, sit, lie, sleep, idle, talk, scared,
                       panic, point, wave, crouch, reach, fall, collapse, lookAround
    Camera.tsx         shot interpolation, Catmull-Rom paths, shake, fov
    defineFilm.tsx     film/scene composition, fades, GlowProvider
    face.ts            8×8 face maps + side-of-head hair texture
    fx.tsx             GodRay, LightPool, Glow, Dust, FogCard, ContactShadow
    Look.tsx           6 lighting presets, exposure, flicker
    MinecraftAvatar.tsx  classic 1.8m rig, knee joints, outfits, face glow
    props.tsx          Bed, Door, DoorFrame, Sign, WindowUnit, CeilingLight,
                       Locker, Monitor, Carpet, WallClock
    textures.ts        procedural canvas textures, NearestFilter
    types.ts           Shot, SceneDef, FilmConfig, PostSettings
  videos/
    the-schedule/      the demo film
      world.tsx
      actors.tsx
      scene1.tsx … scene5.tsx
      film.tsx
  registry.ts          every film, registered for Remotion
  Root.tsx             maps FILMS to Remotion compositions
  index.ts             registerRoot

templates/video/       copy-paste starter set
scripts/new-video.mjs  scaffold + registry
scripts/check-films.mjs director lint
docs/                  camera, style, scene contract, narration
AGENTS.md              the director's contract
```

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Remotion Studio |
| `npm run new -- "Title"` | Scaffold a film and register it |
| `npm run typecheck` | TypeScript |
| `npm run check` | Shot/scene/world contract lint |
| `npm run still -- <id> out/frame.png --frame=N` | Render one still (permission only) |
| `npm run render -- <id> out/<id>.mp4` | Render the film (permission only) |
| `npm run compositions` | List Remotion compositions |
| `npm run bundle` | Bundle the Remotion project |

---

## How it works

### One canvas, one world

`defineFilm` renders a single `<ThreeCanvas>` with:

- the lighting preset (`Look`);
- `World` mounted once;
- one `<Sequence layout="none">` per scene;
- a `GlowProvider` that scales every 3D glow card by `post.bloom`;
- fades in/out.

A scene is just a shot list plus a `Component`. It does not own the room.

### The camera

`Camera` interpolates `from` → `to` (or a Catmull-Rom `path`), `target` → `targetTo` (or `targetPath`), `fov` → `fovTo`, with easing, optional arc, roll and handheld shake. Every shot has a `note` that explains why it exists.

### The look

`Look.tsx` has six presets: `hospital-night`, `hallway-night`, `forest-night`, `street-day`, `warm-room`, `void`. Each has a background, fog, ambient/hemisphere, a shadow-casting key and 2–3 fills. The world adds practicals and atmosphere.

`PostSettings` is only `{ exposure?, bloom? }`. The bloom look is made from 3D additive glow cards, not a screen-space pass. **Do not re-add `@react-three/postprocessing`** — it produced black frames under Remotion + software WebGL.

### The actors

`MinecraftAvatar` is a classic 1.8m Minecraft rig with split thighs/shins and knee joints (so sitting is not a plank), procedural pixel textures, six outfit presets, 8×8 face maps, face glow, rim light and head/hand animation. `position` is the feet/ground point. `rotationY=0` faces +Z. 1 unit = 1 metre.

Story films also get `characters.tsx`, a ready-made duo + extra cast. The two leads contrast in want, status, silhouette, palette and posture. The extra keeps the same face and body while you change skin, hair and outfit. See `templates/cast/README.md`.

---

## Docs

- `AGENTS.md` — hard rules, workflow, review gate, render policy, anti-lazy table.
- `docs/CAMERA-BIBLE.md` — Zack D camera grammar for 9:16 Minecraft: shot types, moves, framing, cuts, continuity, worked example.
- `docs/STYLE.md` — palette, three-light recipe, materials, detail hierarchy, copy-paste scenery recipes.
- `docs/SCENE-CONTRACT.md` — exact `film.tsx` / `world.tsx` / `sceneN.tsx` API.
- `docs/NARRATION-RULES.md` — the voice contract: plain words, one teller, no robotic narration.
- `docs/NARRATION.md` — hook-first writing, 20-second beat map, line bank, sync.
- `templates/cast/README.md` — how to cast a two-lead duo and repeat an extra.

---

## Troubleshooting

### Black frames
Do not add `@react-three/postprocessing`. The framework uses glow cards. The Remotion config forces the `swangle` renderer for headless software WebGL. If a frame is black, check that you did not add a screen-space effect or a texture/network dependency.

### A scene is a still
`npm run check` fails shots with no `to`/`path`/`targetTo`/`targetPath`/`shake`/`arc` and static scenes. Add a push, a track or a head turn.

### A door looks like a box
Use `Door` + `DoorFrame` + handle + threshold + sign + light spill. `npm run check` fails a `<Door>` without a `<DoorFrame>`.

### A bed looks like a slab
Use `Bed` with `sheet` and `blanket`, add a pillow/folded sheet, an IV stand, a monitor and a `ContactShadow`. `npm run check` fails a `Bed` without bedding.

### The hallway is a tube
Add seams every ~2m, a handrail/vent, side doors with frames, posters, a gurney, a ceiling beam, an end window and a `FogCard`.

### The figure is a black rectangle
Give it charcoal albedo (`skin="#171d2a"`, `outfit="shadow"`), `rim={0.5}`, a back halo (`Glow` behind the head), eye glints and a 3/4 camera angle. Never a flat-on frontal close-up for long.

---

## Render in the cloud (GitHub Actions)

Rendering stays off the user's laptop. The `Render short` workflow runs on a
GitHub-hosted runner, uploads the MP4 as an artifact and attaches it to a
GitHub Release.

1. Push the workflow to `main`.
2. Open **Actions → Render short → Run workflow**.
3. Composition: `the-hallway` (or `the-schedule`).
4. Wait for the run. The MP4 is in the run artifact and in **Releases**.

```bash
gh workflow run render.yml -f composition=the-hallway
gh run watch
```

The workflow uses `npm ci`, Remotion's `swangle` software WebGL renderer and
2 concurrent frames. It does not need a GPU or any secrets beyond the built-in
`GITHUB_TOKEN`.

---

## Publishing

The project is ready to push as a public framework:

```bash
git init -b main
git add .
git commit -m "ZackCraft Films: Minecraft 3D vertical short framework"
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

`node_modules/`, `out/` and rendered videos are ignored. The source, docs, templates and demo film are the product.

---

## License

MIT for the framework code. The demo film and its characters are an original example; replace them with your own story.

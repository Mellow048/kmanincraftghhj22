# AGENTS.md — The Director's Contract

## 0. First: which kind of film were you asked for?

This framework makes more than one kind of video. **Decide which one before you read another rule or write a line of
code.** A film built to the wrong rules cannot be fixed afterwards. It is thrown away, and that has happened twice.

| The request… | It is | Read | Start with |
|---|---|---|---|
| says "In This Town"; or tells a story that begins "In this town, …"; or asks for a storytime, a narrated story of a minute or more, or a film "like Same Face", "like the monster egg" or "like the treehouse video" | The topic **In This Town** | [`Topics/InThisTown/README.md`](Topics/InThisTown/README.md) and what it lists. From this file, only sections 9–11 | `npm run new -- "In This Town, …" --topic in-this-town` |
| asks to explain one thing: "Explain …", "What is …", "Why does …", "How does … work", a money lesson, inflation; or asks a "What if …" that is answered with facts | The topic **Explainer** (provisional) | [`Topics/Explainer/README.md`](Topics/Explainer/README.md) and what it lists. From this file, sections 9–11, and rule 3: the camera never teleports | `npm run new -- "Why Bread Costs More" --topic explainer` |
| says "What if you could …"; or tells the story of a kid who gets a power | The topic **What If** (provisional) | [`Topics/WhatIf/README.md`](Topics/WhatIf/README.md) and what it lists. From this file, only sections 9–11 | `npm run new -- "What If You Could …" --topic what-if` |
| names another folder in `Topics/` | That topic | [`Topics/README.md`](Topics/README.md), then the topic's `README.md` | `npm run new -- "…" --topic <id>` |
| asks for a 20-second short, or for none of the above | The **base film** | This file, from "The base film" down | `npm run new -- "The Title"` |
| could be either | | | Ask the owner one question. Do not guess |

**"In This Town" is the name of a format, not a title.** It runs one to three minutes. One kid tells it in the past
tense. It cuts about every two seconds to a recorded voice, captions every word, has music and sound effects, and ends
on a twist that was planted in the first minute. A 20-second film with that name is not a short version of it. The
short version is the topic's own `cut: "short"`: one to two minutes.

**Explainer and What If are PROVISIONAL.** The owner asked for them before their references. Their rules, packs,
starters and sounds are in place and `npm run check` holds a film to their numbers, but no number is measured from
a real video yet, and no film of either has been approved. When the owner supplies a reference, measure it and
correct the topic before building: `Topics/<Folder>/reference/README.md` says how. An Explainer is not a story: its
camera does not cut. It flies from one thing to the next (`flightScene`), which is this file's rule 3 driven by a
recorded voice.

What a topic gives a film, that the base does not:

| | Where |
|---|---|
| Its own rules, and the numbers the lint enforces | `Topics/<Folder>/README.md`, its playbooks, `topic.json` |
| A reference film: a finished film of ours that the owner approved and chose, to build like | `reference` in `topic.json`, and its page in `Topics/<Folder>/reference/` |
| A pack of approved people, places and things | `Topics/<Folder>/PACK.md` |
| A starter film | `Topics/<Folder>/template/`, through `npm run new -- "…" --topic <id>` |
| Music and sound effects | `scripts/sound.py`, and the topic's `SOUND.md` |

### The framework refuses the wrong kind of film

- `npm run new` will not scaffold a title that opens the way a topic opens ("In This Town …", "What If …") without
  `--topic`.
- `npm run check` fails a film with no `topic` whose title or first narration line opens that way, or whose
  `film.tsx` names the format.
- `npm run check` holds a film that declares a topic to that topic's numbers: length, words, cut rate, captions, first
  and last line, and sound.
- `npm run check` fails a topic film that is under the topic's floor once its voice is recorded or its last line has
  a shot. For In This Town the floor is 60 seconds and 250 words. Declaring the topic on a 20-second film does not
  make it one.
- The render workflow runs `npm run check` first. A film that fails is not rendered.

Do not get past a refusal by renaming the film, rewording its first line, deleting the `topic` line, or writing an
excuse into `topic.json`. The excuses there (`sound.voiceOnly`, a new `cut`) are the owner's to give. If you think a
check is wrong, say so and ask.

### Five things that hold for every topic film

1. **The owner approves the script before anything is built.** Ideas, then the script, then stop and wait.
2. **Build from the topic's pack and its starter.** Do not rebuild a villager, a house or a helper that already exists.
3. **The film has sound**: music that changes with the story, and a sound effect for each thing that happens. A film
   with only a voice is not finished.
4. **An approved film does not change.** If you touch the engine or a pack, prove that the finished films' stills are the
   same before and after: `scripts/compare-stills.py`.
5. **Copy how the reference film is built. Never copy its story**, its sentences or its twist. A provisional topic
   has no reference film yet: its `README.md` names the finished film to learn the building from.

### If the topic's folder is not there

If the request names a topic and your checkout has no `Topics/<Folder>/`, **stop**. You are on an old copy of the
framework, where the only rules are the 20-second ones. Start again from the current `main`. That is how the second
rejected film was made: [`Topics/InThisTown/reference/moon-20-seconds/`](Topics/InThisTown/reference/moon-20-seconds/README.md).

### Which rules of this file a topic film still follows

- A film that says `topic: "<id>"` in `defineFilm` follows that topic's `README.md` wherever it differs from this file.
- A film with no `topic` follows this file unchanged.
- These always apply, topic or not: strictly 3D (rule 9), detailed lit sets (rules 10–11), shot notes (section 5),
  the render policy (section 9), API discipline (section 10).

---

## The base film: the 20-second short

Everything from here to the end describes the **base format**. Come here only if section 0 sent you.

You are not filling TSX with props. You are directing a 20-second Minecraft short that a stranger will watch on a phone, with the sound off, and still understand.

This is the hard contract. Read it before touching a base film. Then read:

1. `docs/CAMERA-BIBLE.md` — the Zack D camera grammar, translated to 9:16 Minecraft.
2. `docs/STYLE.md` — the lighting, palette and copy-paste scenery recipes.
3. `docs/SCENE-CONTRACT.md` — the exact scene/shot/world API.
4. `docs/NARRATION-RULES.md` — the voice contract: plain words, one teller, no robotic narration.
5. `docs/NARRATION.md` — hook-first writing and the 20-second beat map.

If a rule here conflicts with a clever idea, the rule wins. If the idea is genuinely better, change the rule in this file first, then build it.

---

## 1. The thirteen hard rules

### 1. One film = one folder = one continuous world
Every video lives in `src/videos/<slug>/` and contains `world.tsx`, `film.tsx`, and one TSX file per scene. The world is mounted once for the whole film by `defineFilm`. Scenes are Remotion `<Sequence layout="none">` children. Do not create a new `<ThreeCanvas>` per scene. Do not duplicate the room in two scene files.

### 2. One scene file = one beat, owned by one director
A scene file may be yanked out and fixed without touching the other scenes. It owns its actors, performance, local timing and shot list. It must not own the walls, the bed, the hallway or the global lighting. Those live in `world.tsx`.

### 3. The camera never teleports
Scene N's first shot must start at the exact position, target and FOV where scene N-1 ended. Copy the numbers. If you want a cut, make it a motivated cut inside one scene, not a silent teleport between files. `npm run check` now prints a warning for any boundary jump over 6cm / 0.75°; treat every line as a bug you meant to fix or a cheat you can justify out loud.

### 4. Hook in the first 1.5 seconds
Open on the disturbing image, the question, or the line that makes a thumb stop. No logos. No walking into frame from a empty room. No "welcome back". The viewer must know what is wrong before they know why.

### 5. The narration and the image say the same thing
If the voice says "the door was open", the door is in frame and visibly open. If the voice says "it was already inside", the reveal is inside. Never write a line the shot does not pay off. Never let the camera show something the narration is not ready to name.

### 6. Motion in every scene
A scene with a locked camera and a static actor is a still image with a timer. At least one of these must be true in every scene:

- the camera pushes, pulls, tracks, arcs or flies;
- the actor walks, sits, turns, breathes, shivers or reaches;
- a light flickers, a curtain moves, dust drifts, fog rolls, a monitor scans.

A locked-off insert is allowed for at most ~1.5 seconds and must be surrounded by movement.

### 7. A new view every 4–5 seconds, maximum
The audience must feel the camera change before they get bored. Move the camera, change the subject, or cut on a motivated beat within 5 seconds. A continuous fly-through may run 5–7 seconds if it has a real `path` and keeps revealing new space. A static shot may never run 5 seconds.

### 8. Cuts are earned
No cut spam. A 20-second short should usually have 3–5 shots total, not 20. Cut only when:

- a new object must be seen (insert);
- a reaction lands (face);
- a door/threshold is crossed;
- the audience has just learned something and needs to see its consequence.

Do not cut on every line of narration. Do not use a cut to hide a camera move you were too lazy to stage.

### 9. Strictly 3D
No HTML overlays, no `<div>`, no `<img>`, no CSS cards, no 2D stickers, no fake UI, no screen-space postprocessing package. The only 2D event allowed is a black fade handled by `defineFilm`.

Text lives on 3D signs (`Sign`). Glows are 3D sprites/cards (`Glow`, `LightPool`, `GodRay`). Faces are textures on the 3D head. If you are about to add a 2D layer, build the object in the world instead.

**Never add `@react-three/postprocessing` back.** It produced black frames under Remotion + software WebGL. The bloom look is `post.bloom` scaling the 3D glow cards. This is not a suggestion.

### 10. Detailed sets, not blockout boxes
A box is not a door. A box is not a bed. A box is not a locker. Use the engine props:

- door → `Door` + `DoorFrame` + handle + sign + threshold + light spill
- bed → `Bed` + mattress + pillow + folded sheet + frame + IV stand + monitor
- window → `WindowUnit` + sill + curtains + moonlight + god rays + light pool
- storage → `Locker` with doors, vents and handles
- wall → panels, seams, baseboards, vents, posters, clocks, conduits

A room with four walls, one bed and one light is a blockout. It is not done. Add the things a real place accumulates: scuffs, signage, cables, a chair, a bin, a curtain, a stain, a notice board, a mop bucket, a gurney.

### 11. Light like a film, not like a model viewer
Every scene needs at least three light sources with different jobs:

1. **Key** — directional moon/window/sun, casts the main shadow.
2. **Practical** — the visible lamp, monitor, sign or ceiling panel that motivates the light.
3. **Rim/kicker** — a cool or warm edge behind the subject so the silhouette separates from the wall.

Add at least one of each: a `GodRay`, a `LightPool`, a `Glow`, and `Dust` in the world. Add `FogCard` where depth needs softening. No flat ambient-only rooms. No pure-black monsters with no rim. No blown-out windows with no falloff.

### 12. The short is ~20 seconds, not a scene from a feature
Target 18–20 seconds. Hard ceiling 21 seconds. 4–7 scenes. One idea, one turn, one button. If you cannot say the story in one sentence, cut it.

### 13. The voice sounds like a person, not a summary
Write every line the way you would say it to a 9-year-old. One teller, one tense. Short, concrete sentences. No action lists ("he stands, he walks, he opens the door"), no wise-old-man cadence ("and so it came to pass"), no fancy analogies, no AI-summary lines ("this wasn't just a door, it was a warning"). The image shows the action; the voice says what it means, what it costs, or what happens next. Read `docs/NARRATION-RULES.md` before writing a word.

---

## 2. The 20-second shape

| Time | Beat | Job | Camera |
|---|---|---|---|
| 0.0–1.5 | Hook | The wrong image, the question, the threat | Already moving; close or unusual |
| 1.5–5.0 | Context | Who, where, what is normal | Establish the room; one push or pull |
| 5.0–9.0 | Turn | The detail that changes the meaning | Insert or reaction; cut only on a beat |
| 9.0–16.0 | Reveal | The thing the hook promised | Continuous fly-through or slow push; no cut |
| 16.0–20.0 | Button | The consequence; end before it reaches us | Close-up, tiny push, shake, cut to black |

The hook is not a title card. The hook is the image that makes the viewer ask "what happened?" The button is not an explanation. The button is the line or image that makes the last 19 seconds mean something else.

---

## 3. The work loop

### Step 1 — Write the beat sheet before the code
Fill this in for the film:

| # | Seconds | Scene title | Narration | What the camera sees | Why the camera moves |
|---|---|---|---|---|---|
| 1 | 0.0–3.6 | The Room | "He thought he was alone." | Boy on bed, blue room, open door behind him | Push in so the room closes around him |
| 2 | ... | ... | ... | ... | ... |

If a row has no "why", the shot is not ready.

Write the narration in the same table. Read `docs/NARRATION-RULES.md` first: one teller, one tense, plain words, 3–10 words a line, no play-by-play.

### Step 2 — Scaffold
```bash
npm run new -- "The Title"
```

This creates `src/videos/the-title/` from `templates/video/` and registers it in `src/registry.ts`. It does not write the film for you. A title that opens the way a topic opens ("In This Town …") is refused: go back to section 0.

### Step 3 — Build the world first
Before actors, build `world.tsx`:

1. Block the floor, walls, ceiling and openings. Keep a coordinate comment at the top.
2. Add the architectural detail: baseboards, door frames, window sills, wall seams, ceiling beams, vents, thresholds.
3. Add the furniture as real props, not boxes.
4. Add the light sources and the practicals that motivate them.
5. Add atmosphere: god rays, light pools, dust, fog, contact shadows.
6. Walk the camera path mentally. If the camera passes through a wall, move the wall or the path.

### Step 4 — Build the actors
Keep shared defaults in `actors.tsx` so the kid's height, skin, hair and outfit never drift. The `position` of `MinecraftAvatar` is the feet/ground point. `rotationY=0` faces +Z. 1 unit = 1 metre. A sitting pose must put the hips on the bed, not float above it.

A character is more than a clip:

- `blink` gives deterministic blinks.
- Breathing and idle weight shift are on by default; dial them with `breath` and `weightShift`.
- Eye darts are on by default; `saccade={false}` for a dead stare, or pin a look with `gaze={-1 | 0 | 1}`.
- `useWalkPath` returns `headYaw`; pass it to the avatar so the head leads a turn.
- `focalLength={35}` on a shot is the same as `fov={38}`, but easier to reason about.

#### Cast a duo, not a crowd

Story films start from `characters.tsx` (copied from `templates/cast/`). It gives you two leads and a reusable `Extra`.

- The two leads must contrast in at least three ways: want, status, silhouette, palette, posture.
- The extra shares the same face and body but changes skin, hair and outfit. Use it for crowds and background roles.
- Never give an extra a want, a close-up or a line. If an extra starts to matter, promote them to a lead.
- Pick a preset (`noobVsPro`, `richVsPoor`, `bullyVsNerd`) or write your own. Read `templates/cast/README.md`.

### Step 5 — Build the scenes
Each scene:

1. Has a `duration` in seconds.
2. Has a `shots` array where every shot has `at`, `dur`, `from`, `target`, `fov`, `ease` and a real `note`.
3. Has a `Component` that animates the actors with `useTime()`.
4. Starts where the previous scene ended.
5. Shows the thing the narration is saying.

### Step 6 — Verify without burning renders
```bash
npm run typecheck
npm run check
```

Fix every error. `check` verifies shot length, notes, 3D-only content, scene totals and mandatory atmosphere. It cannot verify camera continuity or that the shot is beautiful. You still have to look.

### Step 7 — Render only with permission
**Do not render on the user's laptop.** Rendering is CPU/GPU-heavy and the user has asked you not to. Run `typecheck` and `check` locally. Ask for permission before running `remotion still` or `remotion render`. When allowed, render a handful of diagnostic stills (hook, mid, reveal, last frame), not a full video on every iteration.

### Step 8 — Review like a director
Look at the stills at phone size. Ask:

- Can I tell what the story is without sound?
- Is the subject separated from the background?
- Is there a foreground, a midground and a background?
- Is the frame a blockout or a place?
- Does the camera move have a reason?
- Is the face readable at 9:16?
- Is the light doing at least three jobs?
- Is the last frame a button, not a shrug?

If any answer is no, fix it before calling it done.

---

## 4. Folder contract

```
src/videos/<slug>/
  world.tsx       the set: geometry, lights, atmosphere, static props
  actors.tsx      shared cast defaults (optional but recommended)
  characters.tsx  duo + extra cast template (optional; copied by npm run new)
  scene1.tsx      beat 1: shots + performance
  scene2.tsx      beat 2
  ...
  film.tsx        metadata, look, post, World, scene order
```

A narrated topic film (see `docs/STORY-FILMS.md`) adds these to the same folder:

```
  narration.md      the script: one [cue] line per shot
  timing.json       when each word is said. Written by scripts/narration.py; never edited by hand
  kit.tsx           passes on the topic's pack, and adds this film's own cast and places (replaces actors.tsx)
  sound.json        the sound sheet: which music, which effect, on which word
  sound.lock.json   what the mix was built from. Written by scripts/sound.py; never edited by hand
```

Its voice and its mix live in `public/audio/<slug>/` (`narration.mp3`, `mix.mp3`).

`src/engine/` is the shared toolbox. Do not fork a prop into a video folder because it is "faster". Add the prop to `src/engine/props.tsx`, export it from `src/engine/index.ts`, then use it everywhere. Consistency is the product.

---

## 5. Shot notes: the difference between directing and decorating

Good notes name the story reason, the subject and the change:

- "Push in on the boy so the empty half of the bed becomes the second character."
- "Cut on the intake of breath. The chart is in focus; he is not."
- "Leave his face, sweep across the room and land on the open door. The pan is his glance."
- "One unbroken flight through the doorway. The hallway is the same physical world, so the reveal does not cheat."

Bad notes describe the mechanic:

- "Camera moves from A to B."
- "Push in."
- "Cool shot."
- "Establishing."

A bad note is a warning that the shot has no reason to exist.

---

## 6. Lighting recipe (copy this)

```tsx
{/* 1. key: cold moon through the window, the only shadow-caster */}
<directionalLight
  color="#a9c9ff"
  intensity={2.6}
  position={[7, 5, 1.5]}
  castShadow
  shadow-mapSize={[2048, 2048]}
/>

{/* 2. practical: the warm ceiling panel / lamp the audience can see */}
<CeilingLight
  position={[1.55, 2.9, 2.45]}
  size={[0.34, 0.14]}
  color="#ffe9c9"
  lightColor="#ffdfae"
  intensity={3.8}
  flicker={FLICKER}
/>

{/* 3. rim/kicker: cold edge behind the subject */}
<pointLight position={[0.82, 1.62, 9.58]} color="#8fb6ee" intensity={7} distance={2.2} decay={2} />

{/* 4. atmosphere: visible volume + a pool where the light lands */}
<GodRay position={[1.55, 1.35, 0.15]} rotation={[0, 0.12, -1.02]} width={0.9} height={4.6} color="#a9c9ff" opacity={0.1} />
<LightPool position={[1.5, 0.015, 0.3]} width={2.8} depth={2.2} color="#5f8fd6" opacity={0.22} />
<Dust position={[0, 1.45, 0]} area={[4.6, 2.6, 5.2]} count={150} size={0.026} color="#bcd8ff" opacity={0.3} seed={4} />
```

Keep shadows on the key only. Point lights are expensive; use 4–7, not 20. A glow card is cheaper than another light. If the frame is flat, add a rim and a pool before adding another ambient.

---

## 7. The anti-lazy table

| Lazy move | What it looks like | Do this instead |
|---|---|---|
| Box called a door | A flat coloured rectangle in a wall | `DoorFrame` + `Door` + handle + sign + threshold + light spill |
| Box called a bed | A slab with a white top | `Bed` + pillow + folded sheet + frame + IV stand + monitor + contact shadow |
| Empty hallway | A long tube with one light | Runner carpet, wall seams, vents, posters, side doors, gurney, end window, dust |
| One ceiling light | Flat orange room | Moon key + warm practical + cool rim + window pool + god rays |
| Static camera | A still with a timer | Slow push, lateral track, or a motivated cut every 4–5s |
| Cut every line | Music-video strobing | 3–5 shots total; one continuous fly-through for the reveal |
| Generic face | A realistic face texture | 8×8 pixel map; use `worried`, `scared`, `hollow` |
| Black monster | A featureless silhouette | Dark charcoal albedo + rim/kicker + eye glints + back halo |
| Empty walls | Clean planes | Baseboards, seams, vents, signs, clocks, posters, scuffs |
| 2D title card | HTML text over the canvas | 3D `Sign` or a diegetic object in the set |
| "He does this. She does that." | A play-by-play of the shot list | Say what the action means or what it costs |
| Wise-old-man voice | "And so it came to pass..." | "He opened the door." |
| "Good enough" | A blockout with a fade | One more detail pass on the hero frame; then check the next |

---

## 8. Review gate

This is the gate for a **base film**. A topic film's gate is `npm run check` and the work order in its topic's `README.md`.

A film is not done until all of these are true:

- [ ] Hook lands in the first 1.5 seconds.
- [ ] The narration and the image say the same thing.
- [ ] Every narration line passes the 9-year-old test: one teller, plain words, no action list, no banned phrase.
- [ ] Every scene has camera or actor motion.
- [ ] No view is static for more than 5 seconds; a longer shot is a real path move.
- [ ] No more than 5 shots in a 20-second film.
- [ ] Scene N starts exactly where scene N-1 ended.
- [ ] At least 3 light sources with different jobs.
- [ ] At least one `GodRay`, `LightPool`, `Glow` and `Dust` in the world.
- [ ] Every door has a frame; every bed is a bed; every window has a sill/curtain/light.
- [ ] Foreground, midground and background are all doing work.
- [ ] Faces are 8×8 pixel maps, never realistic.
- [ ] The two leads contrast; extras are background, not leads.
- [ ] No 2D overlays, HTML, images or postprocessing.
- [ ] Total runtime ≤ 21 seconds.
- [ ] `npm run typecheck` passes.
- [ ] `npm run check` passes.
- [ ] The last frame is a button.
- [ ] A human has looked at the frames and approved them.

---

## 9. Render policy

- **Never render on the user's laptop unless they explicitly ask.**
- `npm run typecheck` and `npm run check` are always allowed.
- A render is a review tool, not a build step. Render 3–5 stills, not the whole film, until the shots are locked.
- If rendering is approved, use `npm run still -- <composition> <output> --frame=N` and `npm run render -- <composition> <output>`.
- Delete or ignore `out/` artifacts; they are not source.
- Do not add a dependency that requires a browser download or a cloud key unless the user approves it.

---

## 10. API discipline

The user pays for every tool call. Work in batches:

- Read the smallest relevant slice, not the whole repo.
- Write related files in one shell/Python batch.
- Do not re-render to check a text change.
- Do not re-read a file you just wrote.
- Ask one precise question instead of guessing five times.
- If a render is blocked, finish the docs, templates and checks; do not stall.

---

## 11. Commands

```bash
npm install                 # once
npm run dev                 # Remotion Studio
npm run new -- "The Title"  # scaffold a base film folder + registry entry
npm run new -- "In This Town, …" --topic in-this-town   # scaffold a topic film from the topic's own starter
npm run new -- "Why Bread Costs More" --topic explainer # …an explainer: one question, a camera that flies
npm run new -- "What If You Could …" --topic what-if    # …a "What if" story: a kid and one power
npm run typecheck           # TypeScript
npm run check               # director/contract lint
npm run still -- the-title out/frame.png --frame=0
npm run render -- the-title out/the-title.mp4

# narrated topic films (docs/STORY-FILMS.md)
python3 scripts/narration.py build the-title    # recordings → narration.mp3 + timing.json
npm run shots -- the-title --only 3.            # one still per shot: the review tool for 90-shot films
python3 scripts/sound.py draft the-title        # a first sound.json
python3 scripts/sound.py build the-title        # sound.json + the voice → mix.mp3, and a report to read
python3 scripts/compare-stills.py out/before/x out/after/x   # did a shared change move a pixel of a finished film?
```

`npm run still`, `npm run shots` and `npm run render` are **permission-only** on the user's machine.

---

## 12. Definition of done

The film is done when a stranger can watch it muted and still say:

> "A kid was alone in a hospital, the hallway light came on, he looked, and something was already standing there."

If they cannot, the film is not done — no matter how many props are in the room.

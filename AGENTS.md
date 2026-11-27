# AGENTS.md — Director's Contract (Remaster v3)

> **REMASTER v4 MANDATORY:** Before writing or rendering any Short, read [`docs/CRITIQUE-V4-QUALITY-GATES.md`](docs/CRITIQUE-V4-QUALITY-GATES.md) (natural `+0%` TTS + `0.42s` breath gaps, louder BGM `-12`/`-13`, 9:16-safe `dist >= 6.0` unclipped framing, continuous A→B motion, background crowds, zero ServerLore scoreboards).


Keep this simple: **you do NOT need to read 20 docs before starting.** Read this file, pick the matching topic below, read that topic's `README.md`, and open **one** approved reference film if you need a structural example.

## 1. Pick the Film Type First

| Request | Topic | Read ONLY | Scaffold Command |
|---|---|---|---|
| "In This Town…" | `in-this-town` | `Topics/InThisTown/README.md` | `npm run new -- "In This Town, …" --topic in-this-town` |
| "Explain …", "What is …", "Why does …" | `explainer` | `Topics/Explainer/README.md` | `npm run new -- "…" --topic explainer` |
| Wholesome SMP legend / Owner rescue | `server-lore` | `Topics/ServerLore/README.md` | `npm run new -- "…" --topic server-lore` |
| First-person story (any world) | `stories` | `Topics/Stories/README.md` | `npm run new -- "…" --topic stories` |
| Literal mundane rule, deadpan escalation | `deadpan` | `Topics/Deadpan/README.md` | `npm run new -- "…" --topic deadpan` |
| "What if you could …" | `what-if` | `Topics/WhatIf/README.md` | `npm run new -- "What If …" --topic what-if` |
| 20-second silent short (no topic) | base film | `docs/BASE-20S.md` | `npm run new -- "The Title"` |

If unsure which type, ask the owner one short question. Always get owner approval on the script before building scenes.

## 2. The 7 Non-Negotiable Rules (Unified Source of Truth)

### 1. Shoot the FRONT of characters — never their backs
* Default to **`cam.front({ actor, facing: rotY })`** for single characters and **`cam.twoShot({ a, b, facing })`** for pairs or actor + 3D sign. Both compute `yaw` from the actor's `rotationY` so you automatically get a clean 3/4 front hero angle.
* **Never shoot the back of a character's head** unless the story genuinely requires a behind/POV/follow shot (and state `"behind"`, `"OTS"`, or `"POV"` in `note`). `rehearse` flags accidental back-of-head shots.

### 2. Stop over-zooming in 9:16 (keep text & props in frame)
A 9:16 phone frame is a narrow vertical slit (`width = height * 9/16`). Zooming too close crops out 3D signs, `ChatToast`, and second characters.
* **1–2 character story shots:** `dist: 4.4–6.2m`, `fov: 42–48°` (the exact range of your 20k+ hits).
* **Wide / establishing / crowd shots:** `dist: 8.5–15m`, `fov: 46–50°`.
* **Tight close-ups (`dist: 2.6–3.4m, fov: 38–40°`):** ONLY for a single face reaction or small hand/floor clue — never for two people or 3D text boards.
* Use **`cam.fitWidth(widthMetres, fov)`** or **`cam.twoShot(...)`** whenever 3D text or two actors share the frame.

### 3. Keep the camera simple (20k-Hit Formula)
* **75–85% of your shots should be `cam.push`, `cam.front`, `cam.twoShot`, or `cam.truck`.**
* Reserve `cam.orbit`, `cam.crane`, `cam.whip` (`<= 0.85s`), and `cam.dollyZoom` for genuine reveals (keep them under ~20% of total shots).
* **Do NOT blanket-apply `screenOffset`** to every shot. Use `screenOffset: [0, 0.08]` only on tight close-ups where captions at `y = 0.72` would overlap the face.
* Every non-locked shot needs real travel (`>= 0.5m` push/truck or `>= 15°` orbit; `inOutSine` default, `linear` on `cam.truck`). Use `locked: true` for intentional photograph holds.

### 4. Make characters ACT on the words (zero stiff mannequins)
* **Every shot should feel alive and entertaining.** Passing `animation="sit" time={t}` or `animation="lookAround" time={t}` alone is a static mannequin and **fails** `rehearse`.
* Time reactions, head turns (`headYaw` / `headPitch` / `lookAt`), face swaps, `hop()`, `jolt()`, `pop()`, and 3D sight-gags (`<FloatingNumber>`, `<ChatToast>`, `<Bits>`, `<Puffs>`) to spoken words via **`wordAt(cue, word)`** (aim for `>= 0.5` word-synced beats per shot, like the 20k+ hits).
* **Walking:** Always use `walkSegment(a, b, t, start, end, { endYaw })`, `stride(a, b, p)`, or `blockedRoute(...)` so `animDistance` drives the legs and feet face the direction of travel (`animation="walk"` without `animDistance` falls back to `idle`).
* **Cartoon slapstick is welcome:** Jumps, recoils, and hops (`hop()`) are allowed — just don't slide a flat-footed standing pose across the floor.

### 5. Zero floating, zero phasing, zero blocked cameras
* **Lying & sleeping (`animation="lie"` / `"sleep"`):** Rests flush on `position[1]`. Put the actor at `position={[x, bedTopY, z]}` on a bed or `[x, 0, z]` on the floor — **never** add `+0.55` on top of a bed.
* **No phasing:** Keep actors `>= 0.5m` apart (unless `animation="hug"`) and outside solid `<Hut />` / `<Vox />` walls (`z >= wallZ + 0.35` for exterior staging).
* **Clear sightlines:** Never park another actor, `<LampPost>`, `<Tree>`, or wall pillar between `camera.from` and `camera.target`. `rehearse` catches actor-blocking-lens, back-of-head, over-zoom, and wall/actor phasing automatically.

### 6. Unified Technical Spec
* **Strict Shorts ceiling:** Every film is **`<= 178s` (`2:58`)**. Never exceed 3:00.
* **Pacing:** Median shot **`1.4–1.8s`**. Hook spoken and visually proven in `< 1.5s` (bright Frame 1, `lum >= 95`, subject at `dist <= 8.5m`, no dark/empty openers).
* **Shaders & lighting:** Always enable `post: { shaders: "vibrant-day" }` (day), `"warm-sunset"` (golden), or `"moonlight"` (readable night, `< 2%` dark frames). Strictly 3D — no 2D HTML overlays or `@react-three/postprocessing`.
* **Captions:** `captions: { words: timing.words, y: 0.72, motion: "on-beat", dangerWords: [...], highlightWords: [...] }`.
* **Voice & sound (FREE `edge-tts` ONLY — NEVER ElevenLabs):** Run `python3 scripts/tts.py <id> --voice en-US-GuyNeural --rate=+10%` (free `edge-tts`, offline fallback `--engine kokoro`; see `docs/VOICE-AND-TTS.md`). Every finished film has music + foley built via `scripts/sound.py`.

### 7. Story Spine & Workflow
1. **Hook -> Escalation -> Emotional Twist -> Payoff -> CTA last.** Every spoken noun/verb must appear on screen (`wordAt` + intra-line `cut:` splits for lists).
2. **Never modify approved finished films.** If touching shared engine/pack files, verify with `scripts/compare-stills.py`.
3. **Never render on the user's laptop without permission.** Always run `typecheck`, `check`, and `rehearse` locally first.

## 3. Commands

```bash
npm run typecheck                           # TypeScript check
npm run check                               # Contract & topic lint
npm run rehearse -- <film-id> --final       # Camera, motion, framing, phasing & audio gate
python3 scripts/tts.py <id> --voice en-US-GuyNeural --rate=+10%  # FREE edge-tts (never ElevenLabs)
python3 scripts/narration.py build <id> --require-alignment
python3 scripts/sound.py draft <id> && python3 scripts/sound.py build <id>
# Permission-only on user's machine:
npm run shots -- <id> --only 1.             # Diagnostic stills
npm run render -- <id> out/<id>.mp4
```

*Optional deep dives (only open when needed): `docs/VOICE-AND-TTS.md`, `docs/CAMERA-BIBLE.md`, `docs/DIRECTING.md`, `docs/REMASTER-V3-CHANGELOG.md`, `20k-hits/README.md`.*

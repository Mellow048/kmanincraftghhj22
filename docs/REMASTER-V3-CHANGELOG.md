# Remaster v3 Changelog — Motion, Camera, Grounding & Token Diet

Remaster v3 keeps all Remaster v2 visual/shader upgrades (`vibrant-day`, horizon clouds, crisp pixel filtering, `<Water />`, `<EmberDrift />`) while fixing the regressions that caused stiff acting, back-of-head framing, 9:16 over-zooming, floating lie/sleep poses, phasing, and 60k-token startup doc bloat.

## 1. Engine Fixes (`src/engine/`)
* **Fixed floating when lying down / sleeping (`src/engine/anim.ts`):** Changed `lie` and `sleep` `bodyY` from `-0.125` (accidentally copied from `sit`, which left characters floating `~0.44m` in midair) to `-0.45` (`-8 * PX`), so the back of the head/body rests flush on `position[1]` (floor `y = 0` or bed mattress top).
* **Facing-aware & 9:16-safe camera helpers (`src/engine/cam.ts`):**
  * Added `cam.front({ actor, facing, ... })` — computes `yaw` directly from the actor's `rotationY` for a clean 3/4 front hero angle (`dist: 4.6 -> 3.9, fov: 44`), preventing accidental back-of-head shots.
  * Added `cam.twoShot({ a, b, facing, ... })` and `cam.fitWidth(widthMetres, fov, fillRatio)` — automatically calculates safe 9:16 framing distance so two actors or 3D text/signs never get cropped off the narrow horizontal edges.
  * Widened `cam.ots` defaults (`back: 2.35`, `lat: 0.85`, `height: 0.22`, `fov: 44`) so the foreground speaker stops blocking the listener in 9:16.
* **Missing `animDistance` warning (`src/engine/MinecraftAvatar.tsx`):** Logs a clear one-time console warning when `animation="walk" | "run" | "creep" | "stagger"` is used without `animDistance` instead of silently freezing into `idle`.

## 2. Rehearsal & Direction Gate Fixes (`scripts/direction-report.mjs`)
* **Closed the `time={t}` mannequin loophole:** Removed passive poses (`sit`, `lookAround`, `hold`, `crouch`, `lean`, `leanOver`) from `ACTING_ANIMS` so static sitting/looking-around characters with `time={t}` can no longer pass as real acting without animating head aim, face, props, or movement.
* **Fixed cartoon hop false-positives:** Uses peak vertical excursion (`peakVert`) instead of `|y_end - y_start|`, so `hop()` arcs and slapstick recoils that land back at `y = 0` are no longer misflagged as floor slides.
* **Added 4 new modern-film checks:**
  1. **Back-of-character detector:** Flags shots where all framed foreground actors face away from the camera (`dot < -0.55`) unless `note` explicitly justifies a behind/OTS/POV shot.
  2. **Character-blocking-camera detector:** Flags any actor standing on the `[camera -> target]` sightline.
  3. **9:16 over-zoom detector:** Flags shots with `>= 2` actors or 3D text/sign props when frame width `hSpan < 1.15m` (`dist < 2.8m`).
  4. **Actor-vs-Actor & Actor-vs-World phasing detector:** Flags overlapping actors (`< 0.30m`) and actors placed inside solid `World` `<Vox>`/`<Block>` walls.
* **Added orbit-spam `LOOK` warning:** Warns if `> 40%` of shots in an 8+ shot film use orbits (20k+ hits use ~75–85% `cam.push`/`cam.front`).

## 3. Token Diet & Zero-Contradiction Docs
* **Cut mandatory startup reading by >95%:** Replaced the 20-file / ~60,000-token startup gate in `AGENTS.md` with a ~110-line single source of truth, moved the legacy 20-second silent-short rules to `docs/BASE-20S.md`, and streamlined `CLAUDE.md` and `GEMINI.md`.
* **Unified contradicting specs:** Canonicalized caption height (`y: 0.72`), 1–2 person story distance (`4.4–6.2m`, `fov: 42–48°`), `cam.push`/`cam.front` default workhorse, and opt-in-only `screenOffset`.

## 4. ServerLore & Explainer Reference-Grade Upgrades (v3.5)
* **ServerLore (`Topics/ServerLore/`):**
  * Added live `typing?: number` typewriter effect to `ServerChatBox`, plus `OpenBookPage` (parchment `Page 1 of 1` typewriter), `ChestGridUI` (27-slot filling Minecraft chest GUI), and `BedroomSet` (bed mattress at `y = 0.56` for flush `animation="sleep"`).
  * Made `ServerNameTag` and `BadgePop` auto-billboard toward the active camera when `rotationY` is omitted.
  * Rebuilt `Topics/ServerLore/template/scene1.tsx` (fixed `tsc` compile error on `cam.push`, eliminated back-of-head angles and `DeskSetup` chair phasing, switched to `cam.front` / `cam.twoShot` + `y: 0.72` captions) and re-enabled `server-lore` in `tests/direction.test.mjs`.
  * Condensed `Topics/ServerLore/README.md` into a concise ~45-line Visual Playbook.
* **Explainer (`Topics/Explainer/`):**
  * Added 6 physical 3D visual-metaphor props in `Topics/Explainer/props.tsx`: `PriceBillboard`, `ShopStall` (counter + torches + spinning Pickaxe + billboard), `CommandBoard` (typewriter console), `EmeraldFountain`, `FloatingItemPyramid`, and `OrbitingItemRing`.
  * Made `NameTag` auto-billboard toward the camera when `rotationY` is omitted.
  * Rebuilt `Topics/Explainer/template/scene1.tsx` around physical metaphors + seamless Frame-0 loop + `cam.twoShot` (`y: 0.72` captions) and condensed `Topics/Explainer/README.md` into a concise ~35-line Visual Metaphor Playbook.

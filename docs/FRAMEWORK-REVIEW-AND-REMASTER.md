# Framework Review & Remaster v2 Changelog

This document summarizes our technical review of `Mellow048/kmanincraftghhj22` (`origin/main`), the visual and structural issues identified, and every improvement delivered in **Remaster v2** (`remaster-v2`).

---

## Part 1: Honest Technical Audit of v1 (`origin/main`)

### Issue 1: Night Scenes Crushed Blacks Unreadably on Phones (`59.3%` dark pixels)
Inspecting `review/scenery-night/scenery-night-0020.png` visually and via `scripts/look-metrics.py` revealed:
```text
scenery-night-0020.png 1080x1920 | warm -11.3 | sat 62.5 | lum 0/19/98 | dark 59.3% clip 0.0% | sky_tex 1.44 | edge/ctr 0.45
```
Almost **60% of the frame dropped below luma 24**, with `p2 = 0` and median luma = `19`. On a phone in daylight or YouTube Shorts feed, that looks like an unreadable black rectangle — directly explaining why dark night-openers like *Monster Village Part 2* underperformed bright daylight Shorts.

### Issue 2: 9:16 Aspect-Ratio Vignette Bug & Dead Horizon Sky in `shaders.tsx`
- **`GRADE_SHADER` vignette used isotropic `uv - 0.5`** on a `1080x1920` (`9:16`) canvas, compressing the vignette horizontally/vertically unevenly and darkening corners (`vignette: 0.22`).
- **`SKY_FRAG` faded clouds out below `h = 0.06..0.40`** (`smoothstep(0.06, 0.40, h)`), which meant eye-level vertical camera shots looking across `h = 0.02..0.25` saw almost a flat washed sky (`sky_tex 2.00` in `scenery-day-0020.png` vs `7.2` target noted in `Topics/Shared/SHADERS.md`).

### Issue 3: Inconsistent Shader Adoption & Outdated Docs
- `Monster Village Part 1` enabled `post: { shaders: true }`, whereas **`Creeper Parents`, `Enderman Parents`, `Same Face`, and `Monster Village Part 2` did NOT enable `post.shaders` at all**, giving them flat linear ambient lighting instead of sky dome + bloom + split-tone grading.
- Meanwhile, `README.md` still described an obsolete v1 engine (`"Look.tsx has six presets... PostSettings is only { exposure?, bloom? }"`), and `Topics/Shared/SHADERS.md` documented `scripts/look-metrics.py` even though the script didn't exist in `scripts/`.

### Issue 4: Texture Mipmap Blurring & Missing Core Visual Building Blocks
- `src/engine/textures.ts` set `tex.minFilter = THREE.NearestMipmapLinearFilter`, which subtly softened oblique block textures instead of keeping crisp blocky pixel art at every angle.
- The engine had `<Vox>` for `lava`, `<Dust>`, and `<Glow>`, **but lacked animated `<Water />` blocks, rising `<EmberDrift />` sparks, customizable `rimColor`/`hairLayer` on avatars, caption highlight colors, and ergonomic camera helpers** (`whip`, `dollyZoom`, `crane`, `ots`, `screenOffset`, `fitHeight`).

### Issue 5: Repo Bloat (~100 `arena/*` branches & 4 GB+ MP4 History)
`origin` accumulated nearly **100 stale branches** (mostly `arena/*` renders/experiments) and over 4 GB of historical rendered MP4s in git history, slowing down fresh clones and agent workflows.

---

## Part 2: What Remaster v2 Upgrades

### A. Shader & Lighting Upgrade (`src/engine/shaders.tsx`, `src/engine/Look.tsx`, `src/engine/types.ts`)
- **Fixed 9:16 aspect-corrected vignette** using `uTexel.y / uTexel.x` with softer default edge (`0.10`).
- **Horizon-visible clouds & sunlight scatter:** adjusted `SKY_FRAG` threshold (`smoothstep(0.015, 0.24, h)`) + second high-frequency noise octave so eye-level vertical cameras frame rich Minecraft clouds and golden Mie scattering.
- **Perceptual `uVibrance` + sapphire shadow lift:** brings out grass/stone/skin colors cleanly without neon clipping, and lifts dark shadows into crisp slate-blue (`0.96, 1.00, 1.08` tint) so night climaxes remain readable on phones.
- **5 Named Shader Presets (`ShaderPreset`):** `"cinematic"`, `"vibrant-day"`, `"warm-sunset"`, `"moonlight"`, `"horror-noir"` — usable directly as `post: { shaders: "vibrant-day" }` or combined with overrides (`{ preset: "vibrant-day", warmth: 0.7 }`).
- **New `overworld-golden` Look + Brighter Night/Day Balance** in `Look.tsx` (`overworld-day`, `overworld-night`, `lantern-night`, `overworld-sunset`, `overworld-storm`).

### B. Camera Choreography Upgrade (`src/engine/Camera.tsx`, `src/engine/cam.ts`, `src/engine/math.ts`)
- **`Shot.screenOffset?: [number, number]`:** shifts target projection orthogonally right/up in camera space so subjects sit naturally on rule-of-thirds intersections or above the `y = 0.72` caption zone.
- **5 new `cam.*` builders:**
  - `cam.fitHeight(heightMetres, fov, fillRatio)` — exact phone-height framing distance calculator.
  - `cam.whip({ from, on, onTo, fov, fovTo })` — fast `outExpo` reaction/reveal snap.
  - `cam.dollyZoom({ on, dist, to, yaw, pitch, fov, screenOffset })` — compensating FOV Vertigo/dread trombone zoom.
  - `cam.crane({ on, onTo, dist, toDist, yaw, fromPitch, toPitch, fov, screenOffset })` — low-to-high scale reveal.
  - `cam.ots({ speaker, listener, side, back, push, height, fov })` — instant over-the-shoulder dialogue framing.
- **New easings & math (`src/engine/math.ts`):** `inOutExpo`, `inBack`, `inOutBack`, `snap`, `degToRad`, `radToDeg`, and channel-clamped `shade()`.

### C. Core World, Rig & Caption Polish (`textures.ts`, `blocks.tsx`, `fx.tsx`, `MinecraftAvatar.tsx`, `Captions.tsx`)
- **Crisp pixel filtering:** `minFilter = THREE.NearestFilter`, `generateMipmaps = false` in `src/engine/textures.ts`.
- **Animated `<Water />` (`blocks.tsx`) + `"water"` block kind (`textures.ts`):** deterministic `useFilmTime()` UV ripple + specular surface sheen.
- **`<EmberDrift />` (`fx.tsx`):** deterministic rising warm sparks for torches, blacksmiths, lava, and climactic night battles.
- **`MinecraftAvatar` upgrades (`MinecraftAvatar.tsx`):** `rimColor` (custom colored rim silhouettes for Creepers, Endermen, Phantoms, Void) + optional `hairLayer` (3D outer head cap for close-ups).
- **Gold Caption Accents (`Captions.tsx`):** optional `highlightWords` & `accentColor` (default `#ffd84d`) uniform inside the native WebGL quad shader — zero 2D HTML overlays, preserving crisp black outlines.

### D. Tools, Archive & Tests
- **Implemented `scripts/look-metrics.py`:** measures warmth, saturation, luma `p2/p50/p98`, dark %, clip %, sky texture, and edge/center vignette ratio on rendered stills.
- **Preserved 20k+ Hit Archive (`20k-hits/`):** complete source snapshots, contact sheets, shot logs, per-video `ANALYSIS.md`, and links to the 3 × 20k+ MP4s.
- **Added Remaster v2 unit tests (`tests/direction.test.mjs`)** covering `cam.*`, `screenOffset`, and `resolveShaders()`.

---

## Part 3: How to Replace `main` & Safely Clean Up the ~100 Old Branches

Nothing on `origin/main` or the `arena/*` branches has been deleted automatically. Once you review `remaster-v2` on GitHub:

### 1. Promote `remaster-v2` to `main` (Safest PR / Fast-Forward Option)
```bash
# Option A: Open & merge PR from remaster-v2 -> main on GitHub, OR run locally:
git checkout main
git merge --ff-only remaster-v2   # or git reset --hard origin/remaster-v2
git push origin main
```

### 2. Inspect & Bulk-Delete Old `arena/*` Branches (After Checking None Hold Unmerged Work)
```bash
# Preview every remote branch that would be deleted:
git branch -r | grep 'origin/arena/'

# Delete all merged remote arena/* branches safely (skip anything unmerged):
git branch -r --merged origin/main | grep 'origin/arena/' | sed 's|origin/||' | xargs -r -n 1 git push origin --delete

# Or, if you intentionally want to wipe ALL arena/* branches (keeps repo under branch limits):
git ls-remote --heads origin 'refs/heads/arena/*' | awk '{print $2}' | sed 's|refs/heads/||' | xargs -r -n 20 git push origin --delete
```
*(After bulk-deleting remote branches, run `git fetch --prune` locally so `git branch -r` updates immediately.)*

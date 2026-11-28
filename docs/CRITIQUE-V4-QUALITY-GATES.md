# Remaster v4 — Owner Critique & Mandatory Quality Gates

> **READ THIS BEFORE BUILDING OR RENDERING ANY SHORT.**
> These rules come directly from side-by-side reviews comparing rendered Shorts against our 3 viral reference videos (`Explainer Reference.mp4`, `InThisTown Reference.mp4`, `ServerLore Reference.mp4`). Violating any of these keeps videos stuck at 1–2k views.

---

## 1. TTS Speed & Natural Breath Pauses (CRITICAL)
- **NEVER rush the voice.** Fast `+10%` / `+14%` TTS with zero pauses turns the video into an unreadable wall of sound where viewers cannot digest the twist or explanation.
- **Default Edge-TTS rates (`scripts/tts.py`):**
  - **Explainer**: `--rate=+0%` (clear, conversational, ~185–205 WPM)
  - **ServerLore**: `--rate=-2%` to `+0%` (warm, unhurried storytelling, ~175–195 WPM)
  - **InThisTown**: `--rate=+2%` to `+3%` (energetic & punchy, NOT frantic, ~205–220 WPM)
- **Mandatory breath pauses (`scripts/narration.py`):**
  - Default `--gap` between `# clip` beats is **`0.42s`** (roughly half a second of air so each beat lands).
  - For major twists, reveals, or questions, add `wait 0.5` on the `# clip` header (e.g., `# clip 04-reveal wait 0.5`).

---

## 2. Background Music Volume & Instant Start
- **Explainer (`Topics/Explainer/explainer_bgm_loop.wav`)**: Use `gain: -13` (NOT `-19`, which is barely audible on phone speakers).
- **InThisTown (`Topics/InThisTown/InThisTownMusic.aac`)**: Use `gain: -13` (NOT `-16`).
- **ServerLore (`Topics/ServerLore/up_happy.m4a` / `up_sad.m4a`)**: Use `gain: -12` and **`"trackFrom": 2.5`** on `up_happy.m4a` so music hits at **0:00.0** with zero silent intro lag.

---

## 3. 9:16 Camera Framing, Unclipped Text & Active Camera Movement
- **STOP over-zooming!** In 9:16 vertical video (`fov: 44`), horizontal FOV is only ~24°. At `dist: 4.4`, the entire screen width is under 1.9m—so signs, `BarChart`, `FloatingNumber`, and `ChatToast` get chopped off the left/right edges.
- **9:16 Safe Camera Distances:**
  - Solo front shot (`cam.front`): **`dist: 6.0–6.8`**, `to: dist - 1.0`
  - Two-shot (`cam.twoShot`): **`dist: 6.6–7.8`**, `to: dist - 1.1`
  - Wide / crowd / street / chart (`cam.push` / `cam.truck` / `cam.orbit`): **`dist: 6.8–9.0`**
- **NO lazy static cameras:** Every shot must have noticeable, purposeful camera travel—side-trucks tracking walking characters, orbits around props/statues, low-angle tilts up at tall threats, or dynamic push-ins.
- **3D Text Safety:** Keep `FloatingNumber` short (`<= 8` chars, `height <= 0.52`) and `ChatToast` concise (`<= 24` chars, auto-clamped width) so zero letters ever clip off the phone screen.

---

## 4. Continuous A → B Motion (NO Teleporting!)
- **NEVER cut from character at Point A straight to Point B without showing them travel.**
  - If a character walks from their house to a shop, show them **physically walking along the path** (`animation="walk" animDistance={...}`) with a tracking `cam.truck`!
  - If a villain buys out or destroys a stall, show them **walking up and swinging/pushing**, not standing still while props disappear!
  - If a creature/firefly flies or chases shadows, animate the full arc from start to destination.

---

## 5. Scene Variety, Background Crowds & No Scoreboard Clutter
- **STOP reusing one flat wall for 70% of the video!** Every Short needs **at least 4–6 distinct visual setups/angles** (e.g., wide street, alley/woods edge, house doorway, plaza/square, interior room/classroom, high-angle overview, low-angle hero/villain shot).
- **Fill the world with background characters!** Never leave an entire town or server with only 2 people standing on empty cobbles. Place walking/reacting background villagers/players (`ExplainerCrowd`, `ServerPlayer`, `Player`) in streets and squares so the world feels alive like the viral references.
- **NO ScoreboardWall in ServerLore:** Never add scoreboard walls to ServerLore worlds or scenes.

---

## 6. Fast, Clear 8-Second Hook & Emotion-Matched Faces
- **InThisTown / ServerLore Hook (0–8s):** Throw the core visual rule/weirdness at the viewer within the first 8 seconds using **clear, lively visual storytelling** (not frantic unreadable TTS).
- **Match `face` to emotion:** Always verify `face` matches the scene—never leave a character smiling (`smile`/`grin`) when they are being laughed at (`sad`/`crying`/`uneasy`) or furious (`angry`).
- **Font glyph safety (`pixelfont.ts`):** All common punctuation (`=`, `/`, `'`, `$`, `%`, `(`, `)`, `+`, `-`, `:`, `!`, `?`) must render cleanly—never `?` fallback boxes.

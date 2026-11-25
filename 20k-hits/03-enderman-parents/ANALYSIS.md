# Hit #03: Enderman Parents (`in-this-town-i-have-never-seen-my-mums-face`)

- **Length:** `105.6s` (1:45 — `cut: "short"`)
- **Metrics (`scripts/film-metrics.py`):**
  - Resolution & pacing: `1080x1920`, **50 cuts** (`0.47/s`), median shot **2.03s**, longest shot **4.5s**, longest still **0.7s**
  - Visual readability: **0.0% flat frames**, **2.4% dark frames**, **99.9% caption coverage**
  - Brightness arc (`lum` start / mid / end): **121.6 -> 93.0 -> 86.8**
  - Opening 3s visual activity (`hook`): **67.7** (highest opening visual hook of all 3 hits)
- **Preserved files in this folder:**
  - Source code: [`source/`](source/) (`film.tsx`, `kit.tsx`, `world.tsx`, `scene1.tsx`–`scene6.tsx`, `narration.md`, `timing.json`, `sound.json`, `sound.lock.json`)
  - Visual sheet: [`contact-sheet-one-frame-per-shot.jpg`](contact-sheet-one-frame-per-shot.jpg)
  - Shot breakdown: [`shot-log.md`](shot-log.md)
  - Video: [`video.mp4`](video.mp4)

---

## Why This Video Hit 20k+ Views

### 1. Highest Hook Curiosity Question (`hook: 67.7`)
The title and opening beat hit a deep, human mystery expressed purely through Minecraft lore: *"I have never seen my mum's face."*
Even before the narration finishes sentence 2, any Minecraft fan knows *why* an Enderman mother can't let her child look at her eyes—and yet wants to see how the kid interprets it and how it resolves.

### 2. Towering Scale + Purple-Particle Contrast in 9:16
An Enderman is **~2.9m tall** next to a small kid (`~1.05m`), which fills the **9:16 vertical frame** naturally! Instead of wasting the upper 40% of the vertical phone screen on empty ceiling, a towering purple-eyed parent and a small kid looking down create natural vertical tension in every frame.
*(In Remaster v2, `cam.fitHeight(2.9, 42, 0.72)` and `cam.crane` bake this vertical height reveal directly into the camera kit.)*

### 3. Real Enderman Mechanics Driving Visual Gags & Climax
- **Dad carries random single grass/flower blocks home** as clumsy gifts.
- **No eye contact -> carved pumpkin gag / looking at shoes** (misread by outsiders as rudeness or coldness).
- **Water hurts Endermen** (`Water` + rain danger) vs **Ender Pearl hunters** raiding at night (`93.0 -> 86.8` luma shift).
- **Emotional climax:** Under threat, eye contact + sacrifice pay off the planted pumpkin / gaze motif from minute 0.

### 4. Critical Warning From Owner Feedback
Read [`Topics/InThisTown/reference/never-seen-my-mums-face/README.md`](../../Topics/InThisTown/reference/never-seen-my-mums-face/README.md): the owner noted that *Enderman Parents* followed the 6-scene skeleton and climax beat of *Creeper Parents* very closely (raising **YouTube reused-content / repetitive-formula risk** if copied blindly a 3rd time).
The fact that **both** hit 20k proves the audience loves **Iconic Mob Family + Game Mechanic + Emotional Twist** — so future Shorts must keep those core pillars while **changing the plot spine, obstacle, setting, and climax** (see [`docs/VIRAL-SHORTS-BLUEPRINT.md`](../../docs/VIRAL-SHORTS-BLUEPRINT.md)).

# Hit #02: Creeper Parents (`in-this-town-everyone-runs-away-from-me`)

- **Length:** `100.4s` (1:40 — fast `cut: "short"` sweet spot)
- **Metrics (`scripts/film-metrics.py`):**
  - Resolution & pacing: `1080x1920`, **48 cuts** (`0.48/s`), median shot **2.03s**, longest shot **4.1s**, longest still **0.3s**
  - Visual readability: **0.0% flat frames**, **0.0% dark frames**, **100.0% caption coverage**
  - Brightness arc (`lum` start / mid / end): **152.5 -> 102.0 -> 118.9** (loudest daytime colour in the entire catalog)
  - Opening 3s visual activity (`hook`): **44.4**
- **Preserved files in this folder:**
  - Source code: [`source/`](source/) (`film.tsx`, `kit.tsx`, `world.tsx`, `scene1.tsx`–`scene6.tsx`, `narration.md`, `timing.json`, `sound.json`, `sound.lock.json`)
  - Visual sheet: [`contact-sheet-one-frame-per-shot.jpg`](contact-sheet-one-frame-per-shot.jpg)
  - Shot breakdown: [`shot-log.md`](shot-log.md)
  - Video: [`video.mp4`](video.mp4)

---

## Why This Video Hit 20k+ Views

### 1. Instant Concept in 2 Sentences + Neon Green Thumb-Stop
Line 1 opens directly in bright `152.5`-luma daylight (`overworld-day`): *"My mum is a creeper. My dad is a creeper."*
On frame 1 (`contact-sheet-one-frame-per-shot.jpg`), **bright Creeper green against blue sky + village grass** pops off the phone screen like a thumbnail. Viewers instantly get the comedy: *"How do two ticking time-bombs with no arms raise a regular Minecraft kid?"*

### 2. High-Speed Cut Rhythm (`2.03s` Median, `0.3s` Max Still)
With **48 cuts in 100 seconds** (`0.48 cuts/s`), zero shot drags past `4.1s` and zero hold lasts more than `0.3s`. Every 2 seconds brings either a physical comedy sight-gag or a real Minecraft rule:
- Creepers **cannot hug without hissing / flashing white** (`scene2`–`scene3`).
- Creepers are **terrified of cats** — shown hilariously as a domestic house-problem.
- Locked bedrooms / staying across the kitchen table looks like cold rejection at first.

### 3. The "Mean Rule -> Protective Love" Reversal
The emotional engine of both *Creeper Parents* and *Enderman Parents*:
- **Setup (0:00–0:45):** Parents act weird and distant; kid thinks they are ashamed or cold; classmates/players mock or hunt drops.
- **Turn & Climax (0:45–1:25):** Armed Minecraft players raid at night for **gunpowder** (`102.0` luma dusk/night contrast), and the parents step between their child and diamond swords—willing to detonate if forced, not because they hate the kid, but to keep him alive.
- **Payoff (1:25–1:40):** Every weird "rejection" rule flips into quiet sacrifice and unconditional love (`118.9` warm lantern/morning resolution).

### 4. Technical Catch — Imagine This Script With Remastered Shaders
Notice in [`source/film.tsx`](source/film.tsx) that `Creeper Parents` didn't even have `post: { shaders: true }` enabled yet — it succeeded purely on **brightness (`0.0% dark`), pacing (`2.03s`), iconic mob mechanics, and emotional reversal**! With Remaster v2 shaders + horizon clouds + `highlightWords` captions, this exact pacing architecture gets noticeably richer visuals on top of the proven retention spine.

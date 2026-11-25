# Hit #01: Monster Village Part 1 (`in-this-town-monster-village`)

- **Length:** `175.0s` (2:55 — just inside the strict 178s Shorts ceiling)
- **Metrics (`scripts/film-metrics.py`):**
  - Resolution & pacing: `1080x1920`, **67 cuts** (`0.38/s`), median shot **2.55s**, longest shot **6.4s**, longest still **0.5s**
  - Visual readability: **0.0% flat frames**, **0.2% dark frames**, **100.0% caption coverage**
  - Brightness arc (`lum` start / mid / end): **101.0 -> 68.7 -> 72.7** (bright cobblestone morning -> darker siege storm -> warm lantern hideout)
  - Opening 3s visual activity (`hook`): **66.5**
- **Preserved files in this folder:**
  - Source code: [`source/`](source/) (`film.tsx`, `kit.tsx`, `world.tsx`, `scene1.tsx`–`scene10.tsx`, `narration.md`, `timing.json`, `sound.json`, `sound.lock.json`)
  - Visual sheets: [`contact-sheet-every-5-seconds.jpg`](contact-sheet-every-5-seconds.jpg), [`reading-frames.jpg`](reading-frames.jpg)
  - Shot breakdown: [`shot-log.md`](shot-log.md)
  - Video: [`video.mp4`](video.mp4)

---

## Why This Video Hit 20k+ Views

### 1. Frame-1 Contrast + Immediate Recognizability
Open [`reading-frames.jpg`](reading-frames.jpg) or [`contact-sheet-every-5-seconds.jpg`](contact-sheet-every-5-seconds.jpg). On the very first frame, the viewer sees **sunlit cobblestone**, crisp blocky shaders (`post: { shaders: true }` enabled in [`source/film.tsx`](source/film.tsx)), a **small human kid** next to **iconic Minecraft hostile mobs (Zombie, Skeleton)** who are smiling and living peacefully as neighbours in broad daylight. Zero logo, zero black fade, zero throat-clearing.

### 2. Every Beat Exploits Real Minecraft Rules
Viewers do not need any exposition because every joke and plot turn uses rules burned into every Minecraft player's brain:
- Skeletons & Zombies **burn in sunlight** -> here they live under awning shade and village umbrellas while trading baked potatoes.
- Players normally **hunt mobs for XP & drops** -> here the normal-looking Minecraft Player (`Mo`) becomes the terrifying antagonist/threat at the gate.
- Monster "weaknesses" become warm slice-of-life comedy before turning deadly serious when the gate breaks.

### 3. Visual Act Progression (`101.0 -> 68.7 -> 72.7` luma)
Even with sound muted, the lighting literally tells the story:
1. **Bright sunlit plaza** (`scene1`–`scene3`): funny monster-neighbour premise.
2. **Cooling dusk & siege** (`scene4`–`scene7`): tension spikes as human players arrive.
3. **Warm lantern shelter** (`scene8`–`scene10`): sacrifice, diary/cloak reveal, and emotional hook.

### 4. Why Sequels Dropped Off (Even in the Same Town)
*Monster Village Part 1* works as a **100% self-contained story** on someone's cold Shorts feed. Later Parts (like Part 2, which opened at `0.0s` inside a dark `overworld-night` pig farm hideout without `post.shaders` enabled) demanded prior plot knowledge and failed the 1-second daylight thumb-stop test.

---

## Key Craft Lessons to Copy (and What to Improve in Remaster v2)

- **Copy:** `post: { shaders: true }`, bright Frame-1 mob/human contrast, ~2.0–2.5s median shot length, silent visual clarity (`0.0%` flat, `0.2%` dark), and turning **Players** into the threat protecting **Monsters**.
- **Upgrade with Remaster v2:** Combine this narrative arc with `cam.ots` on conversations, `screenOffset: [0, 0.12]` so captions (`y: 0.72`) never crowd waist/chest details, and `highlightWords` on key emotional nouns (`BAKED`, `BURN`, `SAVE`, `HUMAN`).

# Viral Shorts Blueprint — How to Consistently Hit 20k+ Views

Read [`WHY-THE-3-HITS-BLEW-UP.md`](WHY-THE-3-HITS-BLEW-UP.md) first, then follow this production checklist on every new Short. Never skip Step 1 (Premise Gate) or Step 6 (Visual Audit).

---

## 1. The 5-Question Premise Gate (Before Writing Any Code)

If any answer below is **No**, rewrite the premise before opening `narration.md`:

1. **Instant Frame-1 Recognition:** Does Frame 1 (`t = 0.0s`) show an iconic Minecraft mob/item/block in **bright daylight (`lum >= 95`)** doing something emotionally surprising? *(Bad: generic brown Steve villagers or a dark room at 0.0s.)*
2. **Real Minecraft Lore Engine:** Does the plot hinge on a **vanilla Minecraft mechanic** every viewer already knows without explanation (sunlight burning, creepers fearing cats, water hurting endermen, iron golems giving poppies, piglins loving gold, wolves taming with bones, wardens blind to crouching)?
3. **One-Sentence Hook Question:** Can a kid summarize the opening 2 lines in a way that begs a question?
   - *Good:* `"I have never seen my mum's face."`
   - *Good:* `"My mum is a creeper. My dad is a creeper. And everyone in town runs from us."`
   - *Bad:* `"Every morning in Oakhaven, people wore grey coats because the mayor made a law."`
4. **Emotional Flip (Not Just a Joke or Just Horror):** Does a seemingly strange/strict/scary behavior flip into **love, sacrifice, loyalty, or belonging** by the climax?
5. **100% Standalone:** Can someone who has never heard of your channel understand every beat from 0:00 to 1:45 without needing `"Part 1"`?

---

## 2. Target Pacing & Technical Targets (`film-metrics.py`)

Match the exact sweet spot measured across all three 20k+ hits (`cut: "short"` 95–115s, or `cut: "long"` <= 178s strict Shorts ceiling):

| Metric | Target Range (20k+ Sweet Spot) | Hard Red Flag (Do Not Ship) |
|---|---|---|
| Runtime | **95s–115s** (`short`) or **150s–176s** (`long`) | `>= 179s` (YouTube stops treating it as a Short!) |
| Median shot duration | **1.4s–1.8s** (`0.55–0.65 cuts/s`) | `> 2.6s` median or two static talking-head shots in a row |
| Longest unbroken still | **<= 0.7s** (`camera` always moving slightly) | `> 1.5s` freeze without deliberate photograph beat |
| Opening luma (first 3s) | **100–160** (`overworld-day` or `overworld-golden`) | `< 75` luma on frame 1 (dark/night open) |
| Dark frames (`lum < 24`) | **0.0%–2.0%** (even in night towns — light the streets!) | `> 10%` dark frames (phone viewers scroll past black mud) |
| Flat frames | **0.0%** | `> 2%` flat walls/void |
| Caption coverage | **95%–100%** (`y: 0.67`, `motion: "on-beat"`) | Monochrome low captions or missing `dangerWords` / `highlightWords` |

---

## 3. Writing Fresh, Non-Duplicate Story Spines (Never Copy *Creeper* -> *Enderman* Twice)

The owner warned in [`never-seen-my-mums-face/README.md`](../Topics/InThisTown/reference/never-seen-my-mums-face/README.md) against reusing the exact same beat-for-beat outline (*parent habit -> kid bullied -> night raiders -> sacrifice*). Rotate between **different narrative engines**:

### Engine A: **The Misunderstood Protector** (Villager/Mob Mystery)
- *Example Concept — "My Iron Golem Dad Never Sleeps":* A rusty Iron Golem silently places poppies on a kid's windowsill every morning and stares motionless at the fence. The kid thinks he's broken hardware — until a Ravager/Pillager raid hits and the kid finds scratch marks from battles fought every single night while the town slept. (Twist is discovered **before** a big dramatic fight, via physical clues.)

### Engine B: **The Forbidden Ability / Cost** (Comedic Escalation -> Heart)
- *Example Concept — "I Was Born a Skeleton Who Doesn't Burn":* Every Skeleton in his family hides indoors until 7 PM wearing leather helmets. He steps outside at noon cleanly — making him the family's delivery runner and daytime scout — until a thunderstorm hits and he realizes *why* Skeletons stay afraid of bright days (Lightning -> Skeleton Trap / Charged danger, or Stray freeze).

### Engine C: **The Reverse Rescue** (Kid Saves the Monster)
- Instead of the parent rescuing the kid at the end, **the human/player kid uses human mechanics** (milk bucket, splash potion, name tag, boat, pumpkin, golden apple) to save an infected/trapped mob friend or parent (*"Nobody knew why the Zombie at our gate only held a wooden sword — until I saw the Name Tag still clipped to his pocket"* — Zombie Villager cured with Weakness + Golden Apple!).

### Engine D: **The Shared Secret** (2-Player Discovery)
- *Example Concept — "The Warden in Our Basement Isn't Blind — He Just Listens to One Song":* Not a town raid at all — an acoustic Wool/Sculk puzzle where silence vs music blocks (`NoteBlock`) turns a terrifying boss mob into a lonely guardian waiting for its missing Allay/friend.

### Engine E: **The Comedic Job Disaster** (1:30 Pure Escalation)
- *Example Concept — "I Hired a Piglin as My Shopkeeper":* Pure vanilla Nether barter comedy — Piglin ignores emeralds/diamonds, steals any player's gold boots right off their feet, opens a portal inside the bakery, until a Hoglin charges through the street and only the Piglin's gold barter weapon saves the store.

---

## 4. Camera, Framing & Visual + Motion Rules (ZERO SLIDESHOWS — Read [`docs/VIRAL-DIRECTION-MANUAL.md`](VIRAL-DIRECTION-MANUAL.md))

**VISUALS + MOTION IS A MUST:** Do NOT build pretty static PNG slides where characters stand still in `"idle"` or move only 1 inch!
- **Visual-Verbal Lockstep (`wordAt` + `cut:`):** Every spoken noun and verb MUST be physically depicted on screen right as the narrator says it (if the script says *"rods, a jetty, one boat"*, show the flexing fishing rods + lines, the plank jetty, and the rocking boat — never just someone walking!). Use `cut:` splits whenever 2–3 distinct objects appear in one line.
- **Architectural & Environmental Proof (Never Bare Walls):** Prove wealth/status/danger visually in the 3D set (a sunlit Quartz/Gold **Mansion** behind *"the rich on top"*, open lit huts/markets for thieves — NEVER bare stone walls or empty grass edges). Keep all exterior staging strictly outside solid `<Hut />` walls (`z >= wallZ + 0.35`).
- **Real Body Displacement (`>= 1.0m–2.8m`) & Bold Camera Flow (`inOutSine` / `linear` / `outExpo`):** Never translate actors `0.25m` ("1 inch") or place hook cameras `22m` away from `1.4m` kids. Use `>= 0.9m` dolly/crane or `>= 25°` orbit with lively background crowds and atmospheric FX.

Use the upgraded tools in `src/engine/` on every new film:

1. **Always turn on shaders cleanly:**
   - Bright day: `look: "overworld-day"` + `post: { shaders: "vibrant-day" }` (or `post: { shaders: true }`)
   - Warm/emotional afternoon: `look: "overworld-golden"` + `post: { shaders: "warm-sunset" }`
   - Night danger without black crush: `look: "lantern-night"` (or `overworld-night`) + `post: { shaders: "moonlight" }` (or `"horror-noir"`)
2. **Use `screenOffset` on talking & close shots:**
   - Captions sit at `y = 0.72` (lower third). Set `screenOffset: [0, 0.10]` or `[0, 0.14]` on medium/close shots so faces sit cleanly in the **upper third** and never collide with big pixel captions!
3. **Break static symmetry with `cam` recipes:**
   - `cam.crane(...)` to establish height gaps (kid at `1.05m` looking up at a `2.9m` Enderman or `2.7m` Iron Golem).
   - `cam.ots(...)` for two-person conversations instead of flat frontal ping-pong cuts.
   - `cam.whip(...)` (`0.3–0.45s` `outExpo`) for comedy reactions (cutting cleanly when someone drops an item or a cat hisses).
   - `cam.dollyZoom(...)` on a single 1.5–2.0s moment of realization or dread.
   - `cam.fitHeight(height, fov, fillRatio)` so tall/short characters are never accidentally cropped.
4. **Add life & sight-gags to every funny/high-stakes line (see `COMPETITOR-STUDY-NEVER-WALK-ALONE.md`):**
   - Never let two narration beats stand around on the same empty street. Give comedic facts a **0.8s–1.8s visual cutaway** and use the built-in 3D props:
   - `<FloatingNumber text="212" color="#ff4f42" />` for big stakes, tolls, or countdowns over a chase.
   - `<ChatToast sender="Dad" text="rails broken, walking" />` for in-world Minecraft chat storytelling.
   - `<Chicken scarf="#d62828" flap={1} />` for cute animal mascots / slow-fall gags.
   - Use animated `<Water />` blocks in town wells, rivers, or moats (`src/engine/blocks.tsx`).
   - Place `<EmberDrift />` near torches, campfires, smithies, or boss fights (`src/engine/fx.tsx`).
   - Put `hairLayer` and `rimColor` on key characters (`src/engine/MinecraftAvatar.tsx`) so silhouettes pop cleanly off night/forest backgrounds.
5. **Punch danger & hero caption nouns with `dangerWords` + `highlightWords`:**
   - Pass `captions: { words: timing.words, y: 0.67, motion: "on-beat", dangerWords: ["ALONE", "100", "BROKE", "GONE"], highlightWords: ["CREEPER", "SAVE", "GOLD"] }` so crisis words flash coral-red (`#ff4f42`) and hero words flash gold (`#ffd84d`).

---

## 5. Mandatory Voice, TTS & Sound Rules ([`docs/VOICE-AND-TTS.md`](VOICE-AND-TTS.md))

1. **Mandatory TTS Voice Profile (Ignore Older Notes):** **Male, Natural American / No Accent, Energetic, Young / Not Old, Not Too Serious**. Always audition 1 test sentence first and reject flat/old/accented voices (`docs/VOICE-AND-TTS.md`).
2. **Hook line spoken within `0.0s–0.3s`** — zero breath gap before word 1.
3. **Every cut on a stressed word or reaction beat**, keeping median shot around **`1.4s–1.8s`** (`~0.55–0.65 cuts/s`).
4. **Audible contrast:** quiet ambient bed + crisp foley (footsteps, hiss, portal hum, sword swing, door latch) synced in `sound.json` so muted vs unmuted both tell the story cleanly.
5. **Ending button:** leave 0.6s–1.2s of warm music sustain + final emotional image (no abrupt audio chop mid-word, no `"LIKE AND SUBSCRIBE"` banner pasted across the climax; tie ending line cleanly to `"and that's why"` loop if applicable).

# Viral Direction, Hook, Retention & Payoff Manual (Optional Deep Dive)

> **Optional reference.** `AGENTS.md` already contains the core rules. Open this only if you want deeper narrative or staging examples.

This guide defines BOTH the **Story Retention Engine** (Hook → Escalation → Payoff) AND the **3D Execution Rules** that separate **1k-view PowerPoint flops** from **20k+–100k+ YouTube Shorts** (`Monster Village Part 1`, `Creeper Parents`, `Enderman Parents`, `Bread/Minimum Wage Explainers`, and `Never Walk Alone`).

If a Short looks pretty in a single static PNG but plays stiffly on a phone, hides behind a flat wall, or explains instead of showing, **viewers swipe away in 1.5 seconds**.

---

## Part 1: Hook, Retention & Payoff Architecture (Narrative Engine)

### 1. The Hook Contract (0:00–0:03 / Frame 15 Test)
A cold YouTube Shorts viewer decides in **0.5 to 1.2 seconds**. Never burn Frame 1 on empty establishing scenery, distant specks (`dist > 10m`), or slow throat-clearing.
- **Spoken Hook = Concrete Contradiction or Question in `< 1.5s`:**
  - *In This Town / Stories / WhatIf*: State an impossible visual fact immediately (`"My mum is an enderman. I have never seen her face."`, `"In this town, my family stole things."`, `"What if you could..."`). Zero greeting, zero "once upon a time".
  - *Explainer*: Start in the **climax problem** (`1.hook`, e.g., Printer spewing cash while Bread jumps `1 -> 100`) saying `"<Topic>, explained using Minecraft."` before jumping to Day 1.
- **Visual Frame-1 Proof (`lum >= 95`, Clear Subject, Real Motion):**
  - Frame 1 (`t = 0.0s–0.5s`) MUST be **bright**, have the hero/subject cleanly readable at **45%–80% of phone height** (`dist: 2.5m–6.5m`), and **already be in motion** on Frame 1.
  - **Architectural Proof Inside the Hook:** Whatever claim the hook makes MUST be proved visibly right in the set (`"Up there, the rich live"` → sunlit multi-story Quartz & Gold **Mansion**, NEVER a flat stone wall; `"My family stole things"` → dashing out of a lit town market carrying a stolen `Sword` & `CookedChicken` with an angry villager chasing, NEVER empty green grass).

### 2. The Mid-Roll Retention Engine (0:03 → Climax)
Great hooks fail if viewers swipe out at 0:15 or 0:38 when shots feel repetitive.
- **New Situation / Visual Escalation Every 7–9 Seconds:**
  - *Full cut (`150–176s`)*: **20–24 distinct situations/locations**. *Short cut / Explainer (`60–118s`)*: **10–15 distinct beats**.
  - Never trap the camera in one corner/room for 20+ seconds (`world.tsx` `<Zone>` switches: town square → jetty → cottage → cliff steps → mountain top; or bakery → council hall → emerald mine → history plaza).
- **Open-Loop Stacking (Answer 1 Question, Plant the Next):**
  - Before resolving the current curiosity (*"How does he buy the town back?"*), plant the next ticking stake (*"I stole the one thing that wasn't for sale — a gift"* or *"Mum got sick and the cure costs 8 gold"*).
- **Visual-Verbal Lockstep (`wordAt` + `cut:`):**
  - Every concrete noun or verb spoken by the narrator **MUST be physically depicted on screen on that exact word**.
  - If the line rapidly lists 2–3 distinct items (*"Down here: rods, a jetty, one boat"*), **split the line with intra-cue `cut:` sub-shots** timed to `wordAt` so each named prop owns its cut instead of showing a generic walk!
- **Fast Cut & Zero Static Holds:**
  - Target median shot duration **`1.4s–1.8s`**, longest unbroken still **`<= 0.7s`**, and keep voice brisk (`235–265 WPM` with tight `0.0s–0.3s` gaps cleanly cut).

### 3. The Payoff & Loop Contract (Final 15–20 Seconds)
A Twist/Payoff only hits hard if it **flips what the viewer saw in the first 30 seconds** — shown visually, not just lectured in narration.
- **Plant 3–7 Physical Clues Early → Pay Them Off With Flipped Meaning:**
  - *Enderman Parents*: Mum always staring down at his shoes (`1.face`) + wearing pink knee bands (`2.knees`) + dad carrying kitchen counter → flips at `7.eyes` when we look up and see she was already smiling warmly with a pumpkin on.
  - *Mountain (`we-live-at-the-bottom`)*: Saving for 11 years in `THE TOP` jar + 9,000 steps + keeper rejecting emeralds at the gate → flips when the bottom townsfolk fish all night together and trade a year's catch (`"The top did not save my mum. The bottom did"`) and peel the `THE TOP` label off the full jar!
  - *Fox (`my-family-stole-things`)*: Drop-item-for-food fox rule (`2.carry`) + berries under every item in the den (`11.count`) + Iron Golem giving the flower (`6.gave`) → flips into Teller placing a berry in the second empty cup (`13.berry`) while Sister walks cleanly with empty jaws!
- **Earn the Climax With a Deliberate Pause (`0.35s–0.65s` Breath):**
  - Let the key reveal frame land right before the climax word with quiet room/music breath so the twist hits emotionally (never rush important reveals under overlapping SFX clutter).
- **Story-Locked Ending Button & Loop / CTA Last:**
  - Show the transformed relationship/prop first (*the payoff image*).
  - Put the Subscribe ask on the final 1–2s line **inside the story's own open curiosity** (`"Subscribe before I find out what he wants for the sword"`, `"Subscribe, and cast one more line"`) — OR for Explainers, end mid-clause looping straight back into the exact Frame-0 climax camera (`1.hook` === `8.loop`). Never slap big 2D "SUBSCRIBE" banners over the emotional climax.

---

## Part 2: Non-Negotiable 3D Camera & Staging Laws

### Law 1 — NEVER BURY PROPS OR CAMERAS INSIDE SOLID WALLS
Check every `<Hut />`, `<Mansion />`, and `<Vox />` volume before choosing coordinates:
- `<Hut at={[hx, 0, hz]} w={w} d={d} h={h} />` is a **SOLID filled cube spanning `z = hz` back to `z = hz - d`**.
- Putting clues, floor outlines, or camera arcs at `z < hz` buries them **INSIDE A SOLID WALL**! Always stage exterior action, steps, and windowsill props strictly in front (`z >= hz + 0.26`), keeping cameras on `+Z`.

### Law 2 — NEVER SLIDE STANDING ACTORS OR WALK SIDEWAYS
"Fake movement" (`0.2m` floor slides while waving/shrugging/talking, or walking sideways `rotationY=EAST` while translating along `-Z` just to face the camera) ruins 3D craft immediately (compare `Monster Village Part 1`, `Creeper Parents`, and `Enderman Parents`):
- **Standing acting stays PLANTED:** Characters talking, shrugging, crying, waving, leaning, or pointing keep fixed feet `[x, y, z]` and act with `animation` (`talk`, `wave`, `shrug`, `cower`, `lean`, `lookAround`, `cheer`), `headPitch`/`headYaw`/`lookAt`, `face`, and props/tears/hearts — NEVER slide their `[x, y, z]` across the floor while standing!
- **Walking faces direction of travel:** When an actor actually walks or runs (`>= 0.9m` of real ground), `rotationY` MUST align with `atan2(dx, dz)`. Use `walkSegment(a, b, t, start, end, { endYaw })` so feet always point forward during travel and turn toward camera ONLY after coming to a stop.

### Law 3 — CINEMATIC FRAMING (NEVER OVER-ZOOM OR CLIP PROPS)
Follow the exact proven 9:16 lens grammar of `Monster Village Part 1` (`dist median 4.6m, fov 42°`), `Creeper Parents` (`dist 4.6m, fov 44°`), and `Enderman Parents` (`dist 5.6m, fov 46°`):
- **Normal 1–2 Person Story Shots:** **`dist: 4.4m–6.4m`**, **`fov: 42°–48°`** so characters are readable head-to-toe AND the environment/background proof fills the frame cleanly!
- **Establishing / Multi-Desk / Bridge / Crowd Shots:** **`dist: 8.5m–16.0m`**, **`fov: 46°–50°`**.
- **Close-Ups (`dist: 2.6m–3.5m, fov: 38°–40°`):** Reserve strictly for tight face reactions, signs, chests, clocks, or hand details — NEVER shoot whole rooms, multi-character dialogue, or bridges at `dist < 3.8m` (`fov 36°` = 0.8m slit!).
- **Line-of-Sight Clearance:** Check that NO `LampPost`, `Torch`, `Tree`, beam, or foreground shoulder intersects the `[eye -> target]` ray!
- **Smooth Camera Flow (`inOutSine` / `linear` / `outExpo`):** Default to `"inOutSine"` (`cam.push`, `cam.orbit`, `cam.pan`, `cam.crane`, `cam.ots`, `cam.top`); `"linear"` on `cam.truck`; `"outExpo"` only on `cam.whip <= 0.85s`. Avoid unnecessary large `screenOffset` pushing subjects against frame edges or pillars.

### Law 4 — OPENING 15 SECONDS AUDIT CHECKLIST (CHUNK 00 + CHUNK 01)
Before committing or dispatching a GitHub render:
1. **Frame 15 (`0.5s`):** Bright (`lum >= 95`), unmistakable Minecraft hook, subject filling 45–80% of screen height (`dist <= 8m`), real motion + clear visual proof in set.
2. **Literal Props on Every Spoken Noun:** Trace `0s–15s` cues line by line — if narration says *"boy", "berries", "sword", "rods", "jetty", "boat", "mansion"*, verify each prop/actor exists inside the camera frustum at that timestamp.
3. **Zero Solid-Box Clipping:** Check `from/to` and props against every `<Hut>` and terrain box.
4. **Joined MP4 Only:** Wait for `.github/workflows/render.yml` (`deliver` job cleans intermediate `chunk-*` artifacts) and link the single joined `.mp4` Release.

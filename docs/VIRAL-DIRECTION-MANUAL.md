# Viral Direction & Retention Manual (Read Before Staging Any Shot)

This guide translates the exact difference between **1k-view PowerPoint flops** and **20k+–100k+ YouTube Shorts** (`Monster Village Part 1`, `Creeper Parents`, `Enderman Parents`, `Bread/Minimum Wage Explainers`, and `Never Walk Alone`).

If a Short looks pretty in a single static PNG but plays stiffly on a phone, **it fails retention in the first 3 seconds**.

---

## 1. The 5 Non-Negotiable Retention Laws

### Law 1 — VISUAL-VERBAL LOCKSTEP ("Say It -> Show It On Screen")
Every concrete noun or action verb spoken by the narrator **MUST be physically visible inside the camera frame at that exact second (`wordAt`)**:
- If the voice says *"rods, a jetty, one boat"*, the camera MUST show **actual fishing rods flexing with lines in the water, the wooden plank jetty, and the rocky oak boat** — NEVER a kid walking past huts while the narrator lists objects that aren't even in focus!
- If the voice says *"a boy left berries on our sill"*, the **Boy MUST actually walk up / reach onto the sill holding berries** — NEVER empty air over a sill cup!
- If the voice says *"he was buying back what we took"*, the camera MUST show **the actual stolen item (sword / chicken / helmet) being traded beside the berries**.

### Law 2 — ARCHITECTURAL & ENVIRONMENTAL PROOF ("Prove Status With The Set")
Never force the viewer to *imagine* a premise when you can *show* it:
- **"Up there, the rich live"**: Never show rich kids standing on a bare cobble shelf in front of a naked grey stone wall! Build a **sunlit multi-story Quartz & Gold Mansion (`RichMansion`)** with warm arched windows, gold pillars, banners, carpets, and balcony rails in full sun towering above the shadowed poor town below.
- **"In this town, my family stole things"**: Never open in empty grass at the edge of the world (`x = -31`) away from the houses! Put the family right in the **lit village street**, dashing out of market stalls / open doors carrying stolen loot while villagers react!
- **Multi-Location Variety (No Single-Room Fatigue)**: Change sets cleanly every 8–15 seconds (`<Zone name="...">`): town street -> jetty -> inside cottage -> cliff ladder -> mountain gate -> dark oak forest -> bakery -> treasury -> mine. Never trap an entire Explainer or Story inside one stationary corner.

### Law 3 — NEVER BURY PROPS OR CAMERAS INSIDE SOLID WALLS
Check every `<Hut />`, `<Mansion />`, and `<Vox />` volume before setting camera coordinates:
- A standard `<Hut at={[hx, 0, hz]} w={w} d={d} h={h} />` is a **SOLID filled cube from `z = hz` back to `z = hz - d`** (height `0..h`).
- Putting props, dust outlines, or camera arcs at `z < hz` puts them **INSIDE A SOLID WALL**!
- Always stage exterior action, porches, steps, and flower sills strictly in front of the wall (`z >= hz + 0.35`), and place the camera outside (`yaw` in `-75..+75` on `+Z`).

### Law 4 — REAL PHYSICAL MOTION ("Move Bodies, Not 1 Inch")
"Move 1 inch and call it a day" destroys retention and reads like PowerPoint / Season-3 freeze-frame anime:
- **Walks & Dashing (`1.0m–3.5m+`)**: Walking characters must cross real ground (`>= 1.0m` per shot; `1.8m–3.2m` in chases/hauls) using `animDistance` or `route(p)` so feet step cleanly without skating.
- **Big Whole-Body Acting**: Characters don't stay frozen in `"idle"`. Use anticipation -> action -> settle (`reachUp`, `point`, `shrug`, `cower`, `panic`, `run`, `jump`, `sitDown`) triggered on `wordAt(cue, verb)` — plus secondary background motion (villagers hauling baskets, crowds bolting, boats rocking on water, EmberDrift, Dust, flickering lanterns).
- **Phone-Sized Subject Readability**: Use `cam.fitHeight(...)`! Unless shooting a deliberate wide town/mountain establish (`dist: 9–14`), keep lead characters at **`dist: 2.2m–5.8m`** (`fov: 36–46`) so faces, arms, and held props occupy 45–80% of the vertical 9:16 slit. Never park the camera `22m` away from a `1.4m` kid in the opening hook!

### Law 5 — SMOOTH CINEMATIC CAMERA FLOW (NO STALLING / NO MICRO-CRAWLS)
Restore the signature flow of *Enderman Parents* and *Creeper Parents*:
- **Use `"inOutSine"` (the `cam.push`, `cam.orbit`, `cam.pan`, `cam.crane`, `cam.ots` default)** for expressive glides, **`"linear"`** on `cam.truck` to match walking/running actors smoothly, and **`"outExpo"`** on `cam.whip` for crisp comedic/reaction snaps! Never default ordinary dollies to `outSine`, which dumps speed early and makes the back half of a shot stall.
- **Substantial Travel**: Aim for **`>= 0.9m–2.2m` dolly/crane**, **`>= 25°–45°` orbit/pan**, or **`>= 1.4m–3.0m` lateral truck**.
- **Use `screenOffset` Intentionally**: Set `screenOffset: [0, 0.08]` on character medium/close shots so faces clear bottom captions cleanly, **but NEVER apply downward aim/high positive pitch when looking up at tall landmarks** (mountain peaks, mansions, trees, iron golems), or you will point down into the dirt and crop the landmark off-screen!

---

## 2. Opening 15 Seconds Audit Checklist (Chunk 00 + Chunk 01)

Pause mentally on **t = 0.5s (Frame 15)**, **t = 3.0s**, **t = 8.0s**, and **t = 15.0s** before shipping:

1. **Frame 15 (0.5s)**: Is it bright (`lum >= 95`), unmistakable, and already moving? Does a cold viewer with **sound OFF** immediately understand *"who is weird/poor/rich/stealing and what happens next"*?
2. **Every Hook Claim Has Visual Proof**: Mentioned wealth -> **Mansion/Gold** behind them. Mentioned poverty -> **broken gear/wet planks/shadow**. Mentioned thieving -> **stealing in action** (`Sword` / `CookedChicken` / villager reacting).
3. **Every Listed Noun Gets Its Beat**: If a line lists *"rods, a jetty, one boat"*, verify in TSX that `<Rod /> + <Line />`, the plank jetty planks/posts, AND a detailed `<Boat />` are all right inside the camera frustum — use a fast **`cut:` split** inside one cue whenever a line rapidly names 2–3 distinct things!
4. **No Camera Occlusion**: Mentally verify `[from -> to]` never dips below `y = 0.25` and never crosses any `Hut`, `Mountain`, or `Wall` box.
5. **Single Joined MP4 Delivery**: Wait for `.github/workflows/render.yml` `deliver` job so the owner gets the **single joined `.mp4`** directly — never hand them raw chunk files.

# Remaster v5 — Hard-Enforced Reference-Grade Direction Standard

> **THIS IS ENFORCED BY CODE (`scripts/direction-report.mjs`), NOT JUST ADVICE.**
> `npm run rehearse -- <slug> --final` will **HARD FAIL** any film that violates the camera-motion, multi-angle staging, or A→B locomotion gates below.

---

## 1. STOP Staring at One Flat Wall (Multi-Axis Staging Gate)
- **Hard Gate in `scripts/direction-report.mjs`:**
  - **Max 4 consecutive shots** may share the same camera yaw (`±22°`) in the same zone.
  - **Max 70% of all shots** in a film may stare in the same `±25°` yaw direction.
- **How to build worlds like the viral references (`InThisTown Reference`, `Explainer Reference`, `ServerLore Reference`):**
  - Drop `<VillageStreet position={[0, 0, 0]} night={false} />` (exported from `Topics/InThisTown`) into your `world.tsx`! It builds a **56m-long village street** with varied brick/oak/stone houses on BOTH sides (`x = ±8.2`), narrow dark alleys, sidewalks, and a hill at the far end.
  - Shoot from **at least 4 distinct camera axes**:
    1. Down the street (`cam.streetOverview` / `cam.track`)
    2. Reverse / cross-street (`yaw: ±75°` to `±110°` looking across the road or into an alley)
    3. Dramatic low-angle upward tilt (`cam.heroLow`) for tall monsters, statues, or villains
    4. Interiors / doorways / high windows looking down (`pitch: 24°` to `35°`)
  - **Hut prop reminder:** `Hut` takes `wall="planks" | "brick" | "stoneBrick" | "cobble"` and **`tint="#hexcolor"`** (never pass a hex color to `wall`).

---

## 2. REAL Camera Motion (No Lazy Frozen Cameras Gate)
- **Hard Gate in `scripts/direction-report.mjs`:**
  - Any non-locked shot with camera travel `< 1.0m` AND look-angle sweep `< 8°` is flagged as **lazy**. If `> 35%` of shots are lazy, the film **HARD FAILS**.
- **Use the new v5 cinematic camera helpers (`src/engine/cam.ts`):**
  - `cam.track({ from, to, sideDist: 5.8, lead: 1.8 })` — glides alongside a walking/running character down a street.
  - `cam.sweep({ on, dist: 6.4, fromYaw: -18, toYaw: 16 })` — 34° parallax orbit sweep shifting background houses & sky.
  - `cam.heroLow({ on, dist: 6.2, yaw: -12 })` — low-angle upward tilt (`-12° -> -4°`).
  - `cam.streetOverview({ from, to, height: 6.5 })` — high crane sweeping down a village street.

---

## 3. Continuous A → B Locomotion & Zero Clone Characters
- **Hard Gate in `scripts/direction-report.mjs`:**
  - At least **20% of shots** must show real A→B actor locomotion (actors physically moving `>= 0.45m` across space with `walk`/`run` + `animDistance`), never standing glued to `[0, 0, 0]` waving arms.
- **Zero Clones (`Topics/Explainer/cast.tsx`):**
  - `CitizenLead` now supports **`variant="leo" | "sam" | "alex" | "maya" | "builder"`** — give every citizen in a scene a distinct variant so two characters NEVER look identical.

---

## 4. Natural TTS Pacing, Breath Pauses & Reliable Forced Alignment
- **Free Edge-TTS only (`scripts/tts.py`, `.github/workflows/tts.yml`):**
  - Default rate is **`+0%`** (Explainer `+0%`, ServerLore `-2%` to `+0%`, InThisTown `+3%`).
  - Default `--gap` between `# clip` beats is **`0.35s–0.42s`** (passed via `tts.yml` `gap` input).
  - `scripts/narration.py` includes automatic **`beam=1e-80` PocketSphinx fallback** and **em-dash (`—`) word splitting** so trailing words never collapse under natural speech rates.
- **Audible, Instant-Start BGM:**
  - Explainer: `gain: -13` | InThisTown: `gain: -13` | ServerLore: `gain: -12` with `trackFrom: 2.5`.
- **Unclipped 3D Text & Full Pixel Font:**
  - Both `FloatingNumber` and `ChatToast` auto-clamp width for 9:16 phone framing, and `pixelfont.ts` includes `=`, `/`, `$`, `(`, `)`, `#`, `&`, `—`.
- **Zero Scoreboards in ServerLore:** Never place `ScoreboardWall` in ServerLore worlds or scenes.


---

## 5. One-Shot 1:1 Reference Blueprints (Copy This Architecture)

| Topic | World Base | Signature 1:1 Reference Props | Camera Mix |
|-------|------------|-------------------------------|------------|
| **InThisTown** | `<VillageStreet />` + interior room + woods/tracks | `Hut` (`wall` + `tint`), `Bell`, `LampPost`, `Player` crowds, `SubscribeSign` | `cam.streetOverview` (hook/crowd) + `cam.track` (walking) + `cam.heroLow` (threat) + reverse/alley angles |
| **ServerLore** | `<VillageStreet />` (zero ScoreboardWall!) + `DeskSetup` (IRL) + `ClassroomRoom` / `HospitalCorridor` | `BadgePop` (`?`, `!`), `ServerChatBox`, `ChestGridUI`, `OpenBookPage`, `OpeningChest`, `TearDrops`, `FloatingHeart`, `Clock3AM` | `cam.track` + `cam.sweep` + warm golden payoff crane (NO ScoreboardWall ever!) |
| **Explainer** | `<VillageStreet />` + council hall + real-world stage | `CitizenLead` (`variant="leo"\|"sam"\|"alex"\|"maya"\|"builder"`), `EliteLead`, `ShopStall`, `CommandBoard`, `MoneyPrinter`, `EmeraldFountain`, `FloatingItemPyramid`, `BarChart`, `Balance` | `cam.track` (walking to stall) + `cam.sweep` (statue/chart) + seamless Frame-0 loop |

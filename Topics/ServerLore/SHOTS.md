# Directing & Camera Playbook (`SHOTS.md`)

> Combines **50k SMP storytelling density (`1.2–2.2s` cuts, 3D nametags & chat, IRL cutaways)** with our framework's **shaders + smooth `inOutSine` moving cameras** ([`docs/VIRAL-DIRECTION-MANUAL.md`](../../docs/VIRAL-DIRECTION-MANUAL.md)).

**NEVER fall into static slideshows or 1-inch stiff nudges.** Every cut must earn attention like our best approved shorts while delivering the clean readability that got those two reference channels 50k views every upload.

---

## 1. Visual Rules That Keep Viewers Locked

1. **Frame-0 Proof Inside 8m (NEVER > 11m Empty Wide):** Open tightly (`dist: 3.4–6.5`) on the hook object + character + timestamp/counter (`ScoreboardWall` reading `47`, `Clock3AM` flashing `3:00 AM`, open chest in night torchlight).
2. **Every Actor Has Real Physical Motion (`>= 1.0m` or dynamic gesture):**
   - Walking players translate continuously (`lerpVec3` + `animDistance={walk * step}` + subtle head glances with `lookAt`).
   - Reactions happen ON the exact spoken word (`const popWord = wordAt("2.mock", "laughed");`, popping `<Badge kind="!" />`, opening chest lid, flipping lamps cyan/gold).
   - Never freeze actors in idle when the script describes action (pouring lava, sneaking, dropping chests, crafting redstone).
3. **Zero Empty Stone-Wall Backgrounds:**
   - Behind every character sits either **live Minecraft depth** (cottages, lanterns, trees, town plaza, Deep Dark pillars, other players reacting behind them) OR a dressed **IRL set** (`DeskSetup` with dual monitors & glowing keyboard, `HospitalCorridor` with lockers/beds, `ClassroomRoom` with desks & chalkboard).
   - Never stand actors flat against bare gray stone walls (`Mansion/Rich` must look rich; `Deep Dark` must pulse with cyan Sculk tendrils; `IRL Bedroom` needs glowing monitor, bed, lamp, poster).

---

## 2. Smooth `inOutSine` Camera Choreography

All `cam.*` builders in `src/engine/cam.ts` default to smooth **`inOutSine`** easing. Vary camera types continuously across cuts — **never put two identical angles back-to-back**:

- **Opening Hook (`cam.push` or `cam.orbit`):** Start medium-tight (`dist: 4.4 -> 3.0`, `yaw: -16 -> 12`) onto the weird event + player + floating counter/timestamp.
- **Public Shaming / Scoreboard (`cam.crane`):** Start low behind the bullied player's shoulder (`dist: 4.0`, `pitch: -6 -> 16`) rising smoothly to reveal the towering `ScoreboardWall` and snickering crowd behind them.
- **IRL Cutaway Transition (`cam.push` -> desk/hallway):** Hard cut across zones (`zone: "irl"`) pushing softly (`dist: 3.6 -> 2.4`) onto the real-world screen or crying character (`TearDrops`) under warm desk lamp light vs cool hospital fluorescents.
- **Cruel Sabotage (`cam.whip` / low tight `cam.push`):** Quick lateral swing or tight insert on the chest catching fire / lava pit / creeper sneaking up right behind the player!
- **Community Rally Montage (`cam.truck` + `cut:`):** Track laterally along 6–12 players sprinting down the torchlit path (`dist: 5.5`, lateral travel `>= 2.2m`) cutting every `1.1–1.6s` to mining Deep Dark Sculk, laying Redstone Dust lines, and filling chests!
- **Payoff Reveal (`cam.orbit`):** Sweeping 30–40° hero orbit (`dist: 4.6 -> 3.2`) as dark cottage walls burst into golden `RedstoneLamp` glow + cyan Sculk rings + swirling `FloatingHeart` particles and the `ScoreboardWall` resets to `0`.

---

## 3. Clean 3D UI Layering (Zero HTML Overlays)

All Minecraft HUD elements are **true 3D geometry** mounted inside `<scene>` (never HTML `<div>`s):
- **Above Heads:** `<ServerPlayer nameTag="Anna" badge={hit ? "!" : undefined} />` — stays crisp at ~`2.25m` above feet with `nameTagYaw` angled toward the camera!
- **Bottom/Side Chat:** `<ServerChatBox lines={...} position={...} />` placed in world space or offset cleanly in the upper 55% so it **NEVER collides with bottom captions (`y: 0.67`)**.
- **In-World Readables:** `<Clock3AM time="3:00 AM" />`, `<ScoreboardWall title="CREEPER DEATHS" rows={[...]} />`, `<Sign text="GRIEFER" />`.

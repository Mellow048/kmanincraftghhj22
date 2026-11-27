# Small-Model 1-Page Cheatsheet (One-Shot Reference-Grade Shorts)

Follow these **5 copy-paste recipes** to pass every `rehearse --final` hard gate on your very first try across **InThisTown**, **ServerLore**, and **Explainer**.

---

## Recipe 1 — Multi-Angle World (NEVER Build One Flat Wall)
Drop `<VillageStreet />` into `world.tsx` (already exported in `./kit` for all 3 topics):
```tsx
<Zone name="town">
  <VillageStreet position={[0, 0, 0]} night={false} />
</Zone>
```
*(Add a 2nd `<Zone name="room">` or `<Zone name="irl">` for interiors. In ServerLore, NEVER add `ScoreboardWall`.)*

---

## Recipe 2 — Zero-Math Walking (`moveBetween` — Zero Sliding or Walk-Freeze)
Never hand-calculate `rotationY` or `animDistance`. Use `moveBetween(from, to, t, startSec, endSec)`:
```tsx
const walk = moveBetween([-3, 0, 4], [2, 0, -4], t, 0, 1.4);
<Hero
  position={walk.position}
  rotationY={walk.rotationY}
  animation={walk.moving ? "walk" : "wave"}
  animDistance={walk.animDistance}
  face="grin"
  time={t}
/>
```
Use `moveBetween` in at least **25% of shots** so characters physically travel A → B.

---

## Recipe 3 — Active Multi-Axis Cameras (Rotate Angles Every 2–3 Shots)
Never use the same yaw 5 shots in a row, and never use tiny `<1m` moves. Mix these 4 helpers:
```tsx
...cam.streetOverview({ from: [0, 0, 14], to: [0, 0, 4], height: 6.5 })        // High crane hook/crowd
...cam.track({ from: [-3, 0, 4], to: [2, 0, -4], sideDist: 5.8, lead: 1.8 })   // Track walking actor
...cam.sweep({ on: [0, 1.4, 0], dist: 6.4, fromYaw: -20, toYaw: 18 })          // 38° parallax reveal
...cam.heroLow({ on: [0, 0, 0], dist: 6.2, yaw: -12 })                         // Dramatic low tilt
```
*(For `Hut`, pass `wall="planks" | "brick" | "stoneBrick"` and `tint="#hex"`.)*

---

## Recipe 4 — Zero Clone Characters (Explainer)
Give every `CitizenLead` in a scene a different `variant`:
```tsx
<CitizenLead variant="leo" nameTag="Leo" position={[-1.4, 0, 1]} animation="wave" face="grin" time={t} />
<CitizenLead variant="sam" nameTag="Sam" position={[1.4, 0, 1]} animation="point" face="smile" time={t} />
```
*(Variants: `"leo" | "sam" | "alex" | "maya" | "builder"`. Explainer also includes `<MoneyPrinter />`, `<CommandBoard />`, `<ShopStall />`, `<BarChart />`, `<Balance />`.)*

---

## Recipe 5 — 1-Command Free TTS, Breath Pauses & Audio Mix
**NEVER use ElevenLabs.** Always use free `edge-tts` (`--rate=+0%` Explainer, `-2%` ServerLore, `+3%` InThisTown):
```bash
python3 scripts/tts.py <slug> --voice en-US-GuyNeural --rate=+0%
python3 scripts/narration.py build <slug> --require-alignment --gap 0.42
python3 scripts/sound.py draft <slug> --force
python3 scripts/sound.py build <slug>
```
Then add `audio: { src: "audio/<slug>/mix.mp3" },` inside `defineFilm({...})` in `src/videos/<slug>/film.tsx`, and run:
```bash
npm run typecheck && npm run check && npm run test:direction && npm run rehearse -- <slug> --final
```

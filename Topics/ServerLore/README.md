# Server Lore — Wholesome SMP Playbook (Remaster v3.5)

Build emotional, high-retention 3rd-person Minecraft SMP Shorts (`65–110s`) inspired by the 3 AM Mom / misunderstood-player formula: **mystery hook -> cruel misunderstanding -> IRL human secret -> heartbreak -> Owner `!` rally -> whole-server Minecraft redemption -> story-tied CTA**.

Start with:
```bash
npm run new -- "The Player Who…" --topic server-lore
```

## 1. Visual & Storytelling Formula (Beat the Reference)
1. **Always show FACES, never backs:** Use `cam.front({ actor, facing: rotY })` and `cam.twoShot({ a, b, facing })`. In IRL PC desk scenes (`DeskSetup`), place the camera at the **front-side of the monitor** looking into the character's face — NEVER behind their chair!
2. **Tell half the story through 3D SMP UI & Props (`Topics/ServerLore/props.tsx`):**
   * **`ServerChatBox`** with **`typing={ramp(t, 0.1, 0.9)}`** — live typewriter join/chat/whisper messages (`Anna joined the game`, `<Efe> griefer caught`, `You whisper to Leo: hey buddy, you ok?`).
   * **`OpeningChest`** + **`ChestGridUI`** (`filled={Math.round(ramp(t, 0.1, 1.0) * 27)}`) — open the chest lid, then pop the 27-slot Minecraft chest GUI filling up slot-by-slot for the payoff!
   * **`OpenBookPage`** (`progress={ramp(t, 0.1, 0.9)}`) — parchment `Page 1 of 1` with live typewriter note text.
   * **`Clock3AM`** — flip `2:59 AM` -> `3:00 AM` on the exact spoken word (`wordAt`).
   * **`BadgePop`** (`"!"`, `"?"`, `"heart"`, `"broken"`) & **`TearDrops`** (`tears={1}`) & **`FloatingHeart`** — nametags and badges auto-face the camera automatically.
3. **Clean IRL Cutaways (`Topics/ServerLore/places.tsx`):**
   * **`HospitalCorridor`** — character walks **toward** camera (`rotationY={0}`, front view!).
   * **`BedroomSet`** — bed mattress top sits at `y = 0.56`; place sleeping character at `position={[bedX, 0.56, bedZ]}` with `animation="sleep"` (rests flush, zero floating!).
   * **`DeskSetup`** — chair seat sits at `z + 0.82`; keep seated actor at `z + 0.78` facing the monitor, and shoot from the **front-side (`yaw ≈ 140°` or `cam.front`)** so both screen and face read cleanly!
4. **Camera & Pacing:**
   * **75–85% `cam.front` / `cam.push` / `cam.twoShot` / `cam.truck`** at `dist: 4.4–6.2m, fov: 44–46°` (plus `dist: 10–14m` high-angle wides for whole-server torch rallies).
   * Cut every **`1.4–1.8s`**, switch day/night `look` cleanly on time-lapse beats (`overworld-night` / `lantern-night` -> `overworld-day`), and never blanket-apply `screenOffset`.
5. **Dual-Track Up Audio (`Topics/ServerLore/SOUND.md`):**
   * Switch cleanly between `up_happy.m4a` (`0:02+`) for mystery/rally/payoff and `up_sad.m4a` for the IRL secret & heartbreak beat.

**Before writing the script:** Read [`REFERENCE-SCRIPTS.md`](REFERENCE-SCRIPTS.md) — plain 9-year-old English, short `So / But / And / Because` sentences (~250 words), zero wise-old-man analogies.

*Optional deep dives: `Topics/ServerLore/SOUND.md`, `Topics/ServerLore/PACK.md`, `Topics/ServerLore/SCRIPT.md`.*

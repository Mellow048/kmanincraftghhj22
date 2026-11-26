# Server Lore — Wholesome 50k+ SMP Storytelling

Emotional, high-retention third-person Minecraft SMP stories (`65–110s` Shorts) built around a **misunderstood player**, a **real-world human secret**, a **cruel breaking point**, and a **whole-server Minecraft-engineered redemption** — underscored by dynamically switched **Up Happy (`0:02+`, boosted)** and **Up Sad (boosted)** themes.

It combines:
1. **The 50k Reference Formula** ([`reference/3am-mom/`](reference/3am-mom/README.md) & [`reference/deaf-creeper/`](reference/deaf-creeper/README.md)): 7-beat mystery -> real-world cutaway -> heartbreak -> Owner `!` rally -> clever Minecraft mechanics -> counter/chest callback -> story-tied CTA.
2. **Our Framework's Visual Quality & Shaders**: grounded multi-part 3D SMP & IRL sets, volumetric god rays, bloom, floating 3D player nametags, crisp 3D server chat boxes, sculk/redstone lighting, and crying/heart particles (zero flat HTML overlays).
3. **Old-Framework Smooth `inOutSine` Camera Choreography** ([`docs/VIRAL-DIRECTION-MANUAL.md`](../../docs/VIRAL-DIRECTION-MANUAL.md)): sweeping `cam.push`, `cam.orbit`, `cam.crane`, `cam.truck`, and `cam.ots` moves with zero static slides or 1-inch actor nudges.

---

## Start Here

```bash
npm run new -- "The Player Who Built Only Half A Bridge" --topic server-lore
```

This creates a ready-to-build film folder from [`template/`](template/) wired to [`Topics/ServerLore`](index.ts) with [`up_happy.m4a`](up_happy.m4a) + [`up_sad.m4a`](up_sad.m4a) multi-track switching configured.

---

## Read in Order Before Writing a Word

1. **[`docs/VIRAL-DIRECTION-MANUAL.md`](../../docs/VIRAL-DIRECTION-MANUAL.md)** — Mandatory camera travel, `inOutSine` motion, visual-verbal lockstep, and retention/payoff contract.
2. **References ([`3am-mom/`](reference/3am-mom/README.md), [`deaf-creeper/`](reference/deaf-creeper/README.md))** — Forensics + contact sheets + transcripts explaining why both format anchors clear 50k+ views reliably.
3. **[`SCRIPT.md`](SCRIPT.md)** — The 7-beat Wholesome SMP Lore spine, open-loop teaser timing (`0:07–0:11`), and how to invent an original scenario without cloning the references.
4. **[`SHOTS.md`](SHOTS.md)** — Mixing fast `1.5–1.9s` cuts (`cut:`), 3D SMP UI beats (nametags, chat, scoreboards), IRL cutaways, and bold moving cameras.
5. **[`PACK.md`](PACK.md)** — Every ready-to-use 3D cast member, IRL environment (`HospitalCorridor`, `ClassroomRoom`, `DeskSetup`), and SMP prop (`ServerChatBox`, `ScoreboardWall`, `OpeningChest`, `SculkSensor`, `RedstoneLamp`, `Clock3AM`).
6. **[`SOUND.md`](SOUND.md)** — Exact setup for **Happy Up (`up_happy.m4a`, starts at `0:02`, boosted)** vs **Sad Up (`up_sad.m4a`, boosted)** switching inside `sound.json`.

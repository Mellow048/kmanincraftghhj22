# Reference: "Tariffs Explained Using Minecraft"

**The owner on the finished film (v8), 2026-11-27: "Love your work, Please put them into the reference with their source code and mp4, i actually liked this alot. this is the first agent that made awesome shorts."**

This is the **first owner-approved Explainer reference film with complete source code and rendered MP4** in `Topics/Explainer/reference/`. Open this alongside [`../napoleon/`](../napoleon/README.md) and [`../minimum-wage/`](../minimum-wage/README.md) before building a new Explainer Short.

| File | What it is |
|---|---|
| `tariffs-explained-using-minecraft.mp4` | **The film as delivered**: 1080×1920 @ 30 fps, 1:22.6, full sound (copy of `renders/tariffs-explained-using-minecraft.mp4`; full-quality release asset: `render-327`) |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of the mp4 for each of its 44 shots. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every shot: start time, hold length, spoken line, zone, camera recipe, and why this picture |
| `source/` | A **snapshot** of the film's source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene4.tsx`, `film.tsx`, `sound.json`, `sound.lock.json` |

The film that renders lives in `src/videos/tariffs-explained-using-minecraft/`. Its recorded voice clips are in `public/audio/tariffs-explained-using-minecraft/raw/`.

## The concept & story

Explains tariffs and trade wars in 82 seconds using two separate Minecraft islands — **Red Island** (bakers) and **Blue Island** (swordsmiths) — linked across an ocean strait by a single oak bridge. Everyday player **Felint** wants a diamond sword: Red smith Sam charges 12 emeralds, while Blue smith Alex sells the same sword for 5. Everyone crosses the bridge until Sam begs Red Mayor **Sterling** to stop the cheap imports. Sterling slams a red `+10 TARIFF` border gate across the bridge, forcing Alex's sword from 5 to 15 emeralds so Felint buys Sam's 12-emerald sword instead. The twist: Alex still keeps 5, **Felint** pays the higher price (`BEFORE: 5` vs `AFTER: 12` comparison chests). Blue Mayor **Cobalt** retaliates with a blue bread tariff, locking both ends of the bridge in a trade war that hurts Red baker Maya and spikes prices everywhere — wrapping cleanly into a 3-point summary and a **Frame-0 seamless loop** (`"And that is how a five emerald sword..."` → `"Tariffs, explained using Minecraft."`).

## What it is good for

- **True Frame-0 seamless loop (`LOOP_CAM` + `loopClimaxStage`).** Shot `1.hook` and final shot `5.loop` share the exact camera and climax stage so YouTube Shorts loops invisibly.
- **Concrete spatial geography for an abstract economic rule.** Red Island and Blue Island are genuinely separate landmasses across open water connected by one oak bridge (`world.tsx`, zone `bridge`), making imports, border taxes, and retaliatory trade wars immediately legible without walls of text.
- **Crystal-clear 3D readouts with zero clipping or glare.** Elevated `StandingRuleSign` (never submerged in ground), dark `StoneBillboard` price boards (`12 EMERALDS` / `15 EMERALDS`) mounted above `SwordShop`, wide `CompareChestPair` (`BEFORE: 5` vs `AFTER: 12`), and balanced `overworld-golden` lighting on `4.baker` (zero white sun washout).
- **Consistent relatable protagonist (`Felint`) vs contrasting elites (`Sterling`, `Cobalt`).** Follows the 2-lead contrast rule across every beat with lively physical acting in 44/44 shots.

## Shape

44 shots, 325 words, 1:22.6 (82.6 s), 238 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Two Islands & Cheap Trade | 0:00.0 | 27.6 | 102 | 14 |
| 2 | The +10 Border Tariff | 0:27.6 | 15.5 | 68 | 9 |
| 3 | Who Really Pays & Trade War | 0:43.1 | 19.9 | 76 | 10 |
| 4 | 3 Effects & Seamless Loop | 1:03.0 | 19.6 | 79 | 11 |

- Shots: median 1.88 s, shortest 1.13 s, longest 2.70 s. 0 under 1 s, 0 over 3 s. ~7.4 words per shot.
- Camera: 23 `cam.sweep`, 5 `cam.track`, 5 `cam.frameDuo`, 5 `cam.heroLow`, 2 custom `LOOP_CAM`, 2 `cam.front`, 1 `cam.streetOverview`, 1 `cam.top`.
- Places: `bridge` 21, `red` 17, `blue` 6 shots.

## Sound, measured

- Music (`Topics/Explainer/explainer_bgm_loop.wav`, `gain: -15.4`): **17.3 dB** under the voice while speaking (inside `[17, 25]` gate), continuous throughout (`0.2 s` without music).
- Beds: **26.2 dB** under the voice (village / wind).
- Effects: **93** effects (67.6/min), **0 buried**.
- Voice clarity: median **15.4 dB** over everything else (worst half-second 6.9 dB).
- Master: **−14.7 LUFS**, true peak **−2.4 dB**, limiter 0.0 dB.

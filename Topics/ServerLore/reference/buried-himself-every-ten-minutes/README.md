# Reference: "The Player Who Buried Himself Every Ten Minutes"

**The owner on the finished film (v8), 2026-11-27: "Love your work, Please put them into the reference with their source code and mp4, i actually liked this alot. this is the first agent that made awesome shorts."**

This is the **first owner-approved Server Lore reference film with complete source code and rendered MP4** in `Topics/ServerLore/reference/`. Open this alongside [`../3am-mom/`](../3am-mom/README.md) and [`../deaf-creeper/`](../deaf-creeper/README.md) before building a new Server Lore Short.

| File | What it is |
|---|---|
| `the-player-who-buried-himself-every-ten-minutes.mp4` | **The film as delivered**: 1080×1920 @ 30 fps, 1:22.1, full sound (copy of `renders/the-player-who-buried-himself-every-ten-minutes.mp4`; full-quality release asset: `render-328`) |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of the mp4 for each of its 42 shots. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every shot: start time, hold length, spoken line, zone, camera recipe, and why this picture |
| `source/` | A **snapshot** of the film's source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene4.tsx`, `film.tsx`, `sound.json`, `sound.lock.json` |

The film that renders lives in `src/videos/the-player-who-buried-himself-every-ten-minutes/`. Its recorded voice clips are in `public/audio/the-player-who-buried-himself-every-ten-minutes/raw/`.

## The story

Every ten minutes on a Minecraft SMP, a player named **Milo** suddenly digs three blocks straight down and seals dirt over his head — mid-boss-fight, mid-tree-chop, mid-raid — standing frozen for three minutes before digging back out and apologizing in chat. Other players mock him as "Dirt Boy," and one night a bully stalks him into the woods and pours lava straight down over his dirt hole, burning all his diamond gear until Milo types `"sorry guys"` and logs off. Then we see the IRL truth: Milo's mom works late night shifts, and his baby sister wakes up crying in the crib beside his desk every ten minutes. He buries himself underground so night mobs won't kill him while he runs to rock her back to sleep. The Server Owner checks Milo's cabin chest, finds a signed book explaining everything, and pings twenty players at midnight. All night they build warm lantern-lit oak **Safe Booths** every fifty blocks with iron doors, friendly **Iron Golems**, and `"SAFE FOR MILO"` signs. When Milo logs back in the next evening, the whole server welcomes him home with flowers, fresh gear, floating hearts, and an apology from the bully.

## What it is good for

- **6 distinct grounded environments matching EVERY spoken noun (`world.tsx`).** Never fakes a forest, boss fight, or underground shelter on a generic street:
  1. `forest` — elevated oak meadow (`y = 2.0`) with a **genuine carved 1.36×1.36×2.0 m sunken dirt shaft**, flush grass-top `ShaftCap`, molten lava pour stream (`3.pour`), and notched choppable oak tree + swinging voxel `IronAxe` (`2.wood`).
  2. `dungeon` — torch-lit stonebrick boss arena with lava channels, carved floor pit, diamond-sword teammates, and a 3.2 m flaming `DungeonBoss` (`1.mid`, `2.raid`).
  3. `burrow` — true **underground ant-farm cutaway** showing Milo safe inside a torch-lit dirt cave directly beneath solid grass while green `NightZombie` mobs prowl overhead (`2.still`, `4.safe`).
  4. `smp` — Z-fighting-free village street with glowing oak/glass `SafeBooth`s and full-frame friendly `FriendlyGolem` guards holding red poppies (`6.build`–`6.cta`).
  5. `irl` — spacious moonlit bedroom framing Milo, PC `DeskSetup`, Mom, and `BabyCrib` without cropping limbs (`4.desk`–`4.sad`).
  6. `cabin` — cozy oak interior with a centered, fully unclipped `OpenBookPage` (`5.read`, `5.note`).
- **Zero overlapping 3D-text / HUD collisions.** Each beat uses one crisp HUD banner, clock, or chat toast cleanly separated from 3D world props.
- **Dual-track Up emotional score.** Seamless switch from `up_happy.m4a` (`trackFrom: 2.5`) → `up_sad.m4a` on `3.lava` → deliberate 3.1 s emotional silence on `5.read` → triumphant return of `up_happy.m4a` on `5.ping`.

## Shape

42 shots, 302 words, 1:22.1 (82.1 s), 222 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | The Dirt Boy Mystery | 0:00.0 | 23.3 | 85 | 12 |
| 2 | Lava Over The Dirt Pit | 0:23.3 | 11.5 | 43 | 6 |
| 3 | Behind The Screen & The Owner's Discovery | 0:34.7 | 24.2 | 92 | 13 |
| 4 | Safe Spots For Milo | 0:59.0 | 23.1 | 82 | 11 |

- Shots: median 1.95 s, shortest 1.00 s, longest 2.43 s. 0 under 1 s, 0 over 3 s. ~7.2 words per shot.
- Camera: 28 `cam.sweep`, 4 `cam.frameDuo`, 3 `cam.front`, 3 `cam.streetOverview`, 3 `cam.track`, 1 `cam.heroLow`.
- Places: `smp` 16, `forest` 12, `irl` 6, `cabin` 4, `dungeon` 2, `burrow` 2 shots.

## Sound, measured

- Music (`Topics/ServerLore/up_happy.m4a` & `up_sad.m4a`, `gain: -12.8`): **14.2 dB** under the voice while speaking (inside `[11, 22]` gate), `3.1 s` deliberate emotional silence on `5.read`.
- Beds: **27.0 dB** under the voice (village / night / room).
- Effects: **75** effects (54.8/min), **0 buried**.
- Voice clarity: median **12.7 dB** over everything else (worst half-second 4.4 dB).
- Master: **−14.8 LUFS**, true peak **−2.3 dB**, limiter 0.5 dB max (0.0% > 1 dB).

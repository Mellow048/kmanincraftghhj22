# Reference: "In This Town, Nobody Wears Gold"

**The owner on the finished film (v8), 2026-11-27: "Love your work, Please put them into the reference with their source code and mp4, i actually liked this alot. this is the first agent that made awesome shorts."**

Built from scratch on the Remaster v8 standard with Arena TTS (`voice-02`), Z-fighting-free multi-zone staging, distinct villain costume silhouettes (`MayorHatAndMustache`), real 3D gold armor boots (`boots="gold"` on `MinecraftAvatar`), and tighter self-discovery storytelling where the protagonist discovers the Piglin loophole himself rather than being told.

| File | What it is |
|---|---|
| `in-this-town-nobody-wears-gold.mp4` | **The film as delivered**: 1080×1920 @ 30 fps, 1:43.2, full sound (copy of `renders/in-this-town-nobody-wears-gold.mp4`; full-quality release asset: `render-326`) |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of the mp4 for each of its 46 shots. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every shot: start time, hold length, spoken line, zone, camera recipe, and why this picture |
| `source/` | A **snapshot** of the film's source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene4.tsx`, `film.tsx`, `sound.json`, `sound.lock.json` |

The film that renders lives in `src/videos/in-this-town-nobody-wears-gold/`. Its recorded voice clips are in `public/audio/in-this-town-nobody-wears-gold/raw/`.

## The story

In a town next to a giant Nether Portal, wearing gold is banned because Piglins raid the town. Residents bolt from yellow dandelions, fire bakers over golden carrots, and paint yellow signs grey. Toby finds a dented gold helmet at a mine and wears it anyway. Mayor Vance calls gold "cursed," locks all gold inside his brick vault, and gouges terrified villagers 50 to 100 emeralds for iron armor. One dusk near the portal, a Piglin walks right past Toby without attacking — Toby discovers the vanilla Minecraft rule himself: Piglins ignore anyone wearing gold and barter for gold ingots. When twelve Piglins raid at night and Vance locks his vault demanding 200 emeralds, Toby walks calmly through the horde, throws the vault lever, and rains gold bars into the plaza. The Piglins drop their swords and toss Ender Pearls; Mayor Vance runs six blocks in his iron suit; and the whole town puts on real 3D gold boots to walk into the pines and bring back twenty missing neighbors — including Toby's Grandpa.

## What it is good for

- **True Minecraft mechanic as the plot twist & payoff.** Piglins attack players with zero gold armor, ignore anyone wearing even one piece of gold, and barter Ender Pearls for tossed gold ingots. Every sight gag and climax beat flows directly from this mechanic.
- **Self-discovery & explicit villain motive.** Toby proves the rule himself (`4.clue`, `4.sniff`) while Mayor Vance's iron-armor scam (`4.locked`–`4.hundred`) gives the town's anti-gold rule a clear economic reason.
- **Unmistakable character silhouettes.** Mayor Vance wears a custom black top hat and white mustache (`MayorHatAndMustache`); Toby wears a custom 3D gold helmet; the finale puts real 3D gold armor boots (`boots="gold"`) on Toby, Grandpa, and townsfolk.
- **Three clean Z-fighting-free zones (`village`, `vault`, `pines`).** Uses `VillageStreet` + elevated stone vault plaza + cleared pine clearing with camera-facing 3D numbers (`+100` in `6.rain`) and crisp non-overlapping HUD banners.
- **Wider 9:16 framing & multi-axis camera choreography.** Uses `cam.sweep`, `cam.frameDuo`, `cam.track`, `cam.streetOverview`, `cam.heroLow`, `cam.front`, and `cam.top` so crowds, vaults, and two-shots fit cleanly inside vertical mobile margins.

## Shape

46 shots, 420 words, 1:43.2 (103.2 s), 245 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Nobody Wears Gold | 0:00.0 | 20.8 | 81 | 10 |
| 2 | Toby's Helmet, Vance's Scam & The Discovery | 0:20.8 | 31.0 | 127 | 13 |
| 3 | Sunset Raid & The Vault Breakthrough | 0:51.8 | 28.6 | 120 | 13 |
| 4 | Barter Miracle & Grandpa's Return | 1:20.4 | 22.8 | 92 | 10 |

- Shots: median 2.22 s, shortest 1.47 s, longest 3.50 s. 0 under 1 s, 2 over 3 s. ~9.1 words per shot.
- Camera: 14 `cam.sweep`, 12 `cam.frameDuo`, 7 `cam.track`, 4 `cam.streetOverview`, 4 `cam.heroLow`, 4 `cam.front`, 1 `cam.top`.
- Places: `village` 25, `vault` 15, `pines` 6 shots.

## Sound, measured

- Music (`Topics/InThisTown/InThisTownMusic.aac`, `gain: -13.2`): **15.4 dB** under the voice while speaking (inside `[15, 24]` gate), `1.5 s` brief dramatic silence on `6.wait`.
- Beds: **26.4 dB** under the voice (village / wind / fire / night).
- Effects: **121** effects (70.3/min), **0 buried**.
- Voice clarity: median **13.6 dB** over everything else (worst half-second 4.7 dB).
- Master: **−14.7 LUFS**, true peak **−2.3 dB**, limiter 0.0 dB.

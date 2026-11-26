# Explainer (Remastered v2) — Dual-Character Story Explainers

> **MEASURED FROM REFERENCE (`Napoleon, explained using Minecraft`).**  
> Read **[`STUDY-NAPOLEON-EXPLAINER.md`](STUDY-NAPOLEON-EXPLAINER.md)** and **[`reference/napoleon/README.md`](reference/napoleon/README.md)** before writing a single word or placing a single block.

An Explainer breaks down a big history, money, power, or real-world concept (`"<Topic>, explained using Minecraft."`) in **55–110 seconds** through **two contrasting channel leads**, **rich multi-part Minecraft builds**, **fast `~1.5s` story cuts (`storyScene`)**, and a **seamless loop ending**.

---

## Start here

```bash
npm run new -- "Inflation Explained Using Minecraft" --topic explainer
```

That gives you a complete remastered starter from [`template/`](template/): our 2 channel leads (`CitizenLead` + `EliteLead`), multi-zone grounded sets (`<Zone name="hall">`, `<Zone name="square">`), detailed composite props, fast `storyScene` camera recipes (`cam.*`), and loop-ready script scaffolding.

---

## Read in this order

1. **[`STUDY-NAPOLEON-EXPLAINER.md`](STUDY-NAPOLEON-EXPLAINER.md)** & **[`docs/VIRAL-DIRECTION-MANUAL.md`](../../docs/VIRAL-DIRECTION-MANUAL.md)** — Forensic breakdown of the references (`Napoleon` `80.9s`/`44 cuts` + `Minimum Wage` `78.8s`/`36 cuts`), the Hook/Retention/Payoff engine, Visual-Verbal Lockstep, and anti-box quality rules.
2. **[`reference/napoleon/README.md`](reference/napoleon/README.md)** & **[`reference/minimum-wage/README.md`](reference/minimum-wage/README.md)** — Full transcripts, contact sheets, and measured telemetry.
3. **[`SCRIPT.md`](SCRIPT.md)** — How to write an 8-beat looping explainer script with 2 contrasting characters.
4. **[`SHOTS.md`](SHOTS.md)** — Fast story-cut cinematography (`storyScene`, `cam.*`, `cut:` sub-shots, motion in every frame).
5. **[`PACK.md`](PACK.md)** — `CitizenLead`, `EliteLead`, `Official`, `ExplainerCrowd`, detailed composite props (`props.tsx`), money, charts, and goods.
6. **[`SOUND.md`](SOUND.md)** — **Mandatory BGM (`Topics/Explainer/explainer_bgm_loop.wav` at `gain: -19`, NEVER overpowering voice)** + `scripts/sound.py`.
7. **[`docs/VOICE-AND-TTS.md`](../../docs/VOICE-AND-TTS.md)** — Mandatory young energetic American male TTS standard.

---

## What makes our Remastered Explainer win

1. **Separate Channel Brand (`cast.tsx`) — NEVER `InThisTown` Default Characters:**  
   Explainers live on their own channel. Always cast our two custom mascot leads:
   - **`CitizenLead` (Miles)** — relatable struggling worker / citizen who suffers or makes the mistake.
   - **`EliteLead` (Sterling)** — rich, put-together, confident authority (`pres`, `general`, `tycoon`).
   *Never reuse `InThisTown`'s orange/teal Hero or `Villager` clones as your leads.*
2. **Cold-Open Climax + Seamless Loop Payoff:**  
   Start Frame 0 in the climax moment saying `"<Concept>, explained using Minecraft."` End mid-clause (`"...then voted to crown Sterling, and that's"`) cutting straight back into the exact Frame-0 climax composition.
3. **Zero Lazy Single-Box Props (`props.tsx`):**  
   Viewers never guess what a block represents. Use `DetailedBookshelf` (individual books + pages), `RuleBoard` (`chaos` vs `order`), `Lectern` + `OpenBook`, `RoyalThrone`, `Crown` + `CrownCushion`, `BallotBox`, `StoneBillboard`, `ChatToast`, `CoinStack`, `BreadShelf`.
4. **Fast Story Cuts (`1.1s–1.9s` median, `storyScene`):**  
   Never hold a frozen talking-head or drift slowly for 6 seconds. Use `cam.push`, `cam.orbit`, `cam.whip`, `cam.crane`, `cam.ots`, and split long lines with `cut:` so every noun/number lands on a visual cut.
5. **Show Real-World Stakes in 3D:**  
   Add `FloatingNumber` popups, `<ChatToast>` server poll/chat boxes (`[Vote] YES: 99%`), and `<StoneBillboard text="1799" />` architectural date/stat placards.
6. **Mandatory Bright Readability & Dual-Color Captions:**  
   Keep luma `>= 90` even indoors (`LightPool`, torches, `GodRay`), `post: { shaders: true }`, `y: 0.67`, `dangerWords` (red) + `highlightWords` (gold).

---

## Work order

1. `npm run new -- "…" --topic explainer`
2. Write the 8-beat loopable script in `narration.md` using [`SCRIPT.md`](SCRIPT.md). Pick `CitizenLead`'s flaw/need and `EliteLead`'s power move.
3. Run `python3 scripts/narration.py build <film> --estimate` and verify `55–110s` pacing (`205–255 WPM`). Record using [`docs/VOICE-AND-TTS.md`](../../docs/VOICE-AND-TTS.md), then rebuild without `--estimate`.
4. Build grounded `<Zone>` sets in `world.tsx` (`hall`, `square`, `vault`, etc.) using multi-part props from [`PACK.md`](PACK.md) + `GodRay`, `LightPool`, `Glow`, `Dust`.
5. Direct `scene1.tsx`, `scene2.tsx`… with `storyScene` + `cam.*` + intra-line `cut:` switches (`1.1s–1.9s` median cut). Animate every character and prop on the spoken word (`wordAt`).
6. Wire sound (`python3 scripts/sound.py draft <film>` -> `build <film>`) -> `npm run typecheck && npm run test:direction && npm run check`.
7. Inspect still frames with `npm run shots` + `python3 scripts/look-metrics.py` before final render.

*(Legacy note: `flight.tsx` remains exported in `index.ts` only for backward compatibility with archived film `what-is-a-dictator`. Do NOT use `flightScene` for new Explainer films.)*

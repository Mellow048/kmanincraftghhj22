# Explainer — Visual Metaphor Playbook (Remaster v3.5)

Explain one big money, economics, history, or systems concept (`"<Topic>, explained using Minecraft."`) in **55–100 seconds** using **physical 3D visual metaphors on every single line**, **two contrasting leads (`CitizenLead` + `EliteLead`)**, **fast `1.3–1.8s` cuts**, and a **seamless Frame-0 loop**.

Start with:
```bash
npm run new -- "Inflation Explained Using Minecraft" --topic explainer
```

## 1. Visual Metaphor Formula (Zero Stiff Talking Heads)
**Every sentence MUST have a physical 3D gag or metaphor moving on screen** — never just two characters standing in place explaining:
* **Prices & Markets:** **`ShopStall`** (wooden counter + torches + spinning floating Pickaxe + **`PriceBillboard`**) — flip `price` (`10 -> 20`) on the exact `wordAt` with `<Puffs>` + `<Bits>`!
* **Saving & Progress:** **`FloatingItemPyramid`** (`count={1..10}`) floating above `CitizenLead`'s head while they mine/work and a day sign (`MON -> WED -> SUN`) flips behind them.
* **Printing / Spawning Money:** **`CommandBoard`** (`> /give @mods emerald 1000`, `progress={ramp(t, 0, 0.7)}`) + **`EmeraldFountain`** (`t={t - burstWord}`) raining spinning emeralds everywhere + **`Printer`** spitting green bills!
* **Purchasing Power & Trade-offs:** **`Balance`** (3D tipping wooden scale comparing 10 emeralds vs 1 pickaxe) and **`OrbitingItemRing`** (10 emeralds orbiting in front of `CitizenLead`).
* **Rules, Votes & Institutions:** **`RuleBoard`** (`chaos` vs `order`), **`BallotBox`**, **`DetailedBookshelf`**, **`CouncilTable`**, **`StoneBillboard`**, **`ChatToast`**, **`FloatingNumber`**.
* **Distinct Channel Cast (`Topics/Explainer/cast.tsx`):** Always use **`CitizenLead`** (everyday saver/worker) and **`EliteLead`** (`pres` / `general` / `tycoon`) + **`Official`** + **`ExplainerCrowd`** (workers with hard hats actively walking/building). Nametags auto-face the camera automatically.

## 2. Camera, Framing & Seamless Loop
* **Front-facing & 9:16-safe:** Use **`cam.front({ actor, facing })`** and **`cam.twoShot({ a, b, facing })`** at `dist: 4.6–6.5m, fov: 44–46°` so giant signs (`PriceBillboard`, `CommandBoard`), floating emerald pyramids, and both characters NEVER get cropped off the narrow 9:16 edges.
* **75–85% `cam.push` / `cam.front` / `cam.twoShot` / `cam.truck`.** Avoid dizzying orbits and do not blanket-apply `screenOffset`.
* **Cold-Open -> Seamless Loop:** Open Frame 0 on the signature visual (`ShopStall` + `10` emeralds + `"<Topic>, explained using Minecraft."`). End mid-clause (`"And that's..."`) on the **exact same Frame-0 camera and stage** so YouTube Shorts loops seamlessly.
* **Captions & Audio (`Topics/Explainer/SOUND.md`):** `y: 0.72`, `motion: "on-beat"`, `dangerWords` + `highlightWords`. Always use `Topics/Explainer/explainer_bgm_loop.wav` at quiet `gain: -19` (`musicUnderVoiceDb: [17, 25]`) so BGM never overpowers the voice.

*Optional deep dives: `Topics/Explainer/SOUND.md`, `Topics/Explainer/PACK.md`, `Topics/Explainer/SCRIPT.md`.*

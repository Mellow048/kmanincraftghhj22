# Explainer — Reference Folder

Open this before building a new Explainer Short. The first entry is our own finished film approved by the owner, complete with its **source code**, **rendered MP4**, **one-frame-per-shot contact sheet**, and **shot log**. The two external studies below it define the channel pacing and 2-lead contrast format.

The owner, 2026-11-27, on our approved reference batch:

> "Love your work, Please put them into the reference with their source code and mp4, i actually liked this alot. this is the first agent that made awesome shorts."

## Our approved Explainer film (source code + MP4)

| Folder | Film | Size | The owner said | Open it for |
|---|---|---|---|---|
| [`tariffs-explained/`](tariffs-explained/README.md) | *Tariffs Explained Using Minecraft* | 1:22.6, 44 shots, 325 words, 238 WPM. 3 zones. Continuous BGM + 0 buried SFX | "Love your work, Please put them into the reference with their source code and mp4, i actually liked this alot." (2026-11-27) | **Full implementation reference (`source/` + MP4 + contact sheet + shot log).** True Frame-0 seamless loop (`LOOP_CAM` + `loopClimaxStage`), separate Red & Blue Islands across an ocean bridge, `StoneBillboard` shop price readouts, elevated `StandingRuleSign`, twin `CompareChestPair` (`BEFORE: 5` vs `AFTER: 12`), balanced `overworld-golden` lighting, and consistent `Felint` vs `Sterling`/`Cobalt` cast |

## External channel studies (pacing & structure)

| Folder | Study | Open it for |
|---|---|---|
| [`napoleon/`](napoleon/README.md) | Napoleon Explained study | Target pacing, 2-lead contrast, composite props, and seamless loop payoff |
| [`minimum-wage/`](minimum-wage/README.md) | Minimum Wage study | 3-option visual breakdown, twin before/after chests, balanced trade-off dilemma loop |

`source/` inside `tariffs-explained/` is a snapshot to read (excluded by `tsconfig.json`). **The film that renders lives in `src/videos/tariffs-explained-using-minecraft/`.** Never copy a reference film's topic or script — borrow the spatial clarity, prop craft, and pacing for a new concept.

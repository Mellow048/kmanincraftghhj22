# 20k+ Views Hit Archive — Preserved Videos, Source Code & Breakdown

Out of 40+ Shorts built in this framework, **three broke cleanly past 20,000+ views** while most others plateaued around **1,500–2,000 views**. This directory permanently preserves the **source code, timing data, sound specs, shot logs, contact sheets, and video links** for those three winners so every future AI agent and human director can study *what actually worked on real viewers*.

---

## The Three 20k+ Hit Films

| # | YouTube / Owner Name | Film ID & Folder | Length | Cuts & Pacing | Avg Lum (Start/Mid/End) | Source Snapshot | Video File | Breakdown |
|---|---|---|---|---|---|---|---|---|
| 01 | **Monster Village Part 1** | `in-this-town-monster-village` | **175.0s** (2:55) | 67 cuts (`0.38/s`), median **2.55s**, longest **6.4s**, still **0.5s** | **101.0 / 68.7 / 72.7** (Day → Storm/Night → Lantern) | [`01-monster-village-part-1/source/`](01-monster-village-part-1/source/) | [`video.mp4`](01-monster-village-part-1/video.mp4) → [`in-this-town-monster-village.mp4`](../Topics/InThisTown/reference/monster-village/in-this-town-monster-village.mp4) | [`ANALYSIS.md`](01-monster-village-part-1/ANALYSIS.md) |
| 02 | **Creeper Parents** | `in-this-town-everyone-runs-away-from-me` | **100.4s** (1:40) | 48 cuts (`0.48/s`), median **2.03s**, longest **4.1s**, still **0.3s** | **152.5 / 102.0 / 118.9** (Bright Daylight → Torch Porch) | [`02-creeper-parents/source/`](02-creeper-parents/source/) | [`video.mp4`](02-creeper-parents/video.mp4) → [`in-this-town-everyone-runs-away-from-me.mp4`](../Topics/InThisTown/reference/everyone-runs-away-from-me/in-this-town-everyone-runs-away-from-me.mp4) | [`ANALYSIS.md`](02-creeper-parents/ANALYSIS.md) |
| 03 | **Enderman Parents** | `in-this-town-i-have-never-seen-my-mums-face` | **105.6s** (1:45) | 50 cuts (`0.47/s`), median **2.03s**, longest **4.5s**, still **0.7s** | **121.6 / 93.0 / 86.8** (Daylight → Night Climax) | [`03-enderman-parents/source/`](03-enderman-parents/source/) | [`video.mp4`](03-enderman-parents/video.mp4) → [`in-this-town-i-have-never-seen-my-mums-face.mp4`](../Topics/InThisTown/reference/never-seen-my-mums-face/in-this-town-i-have-never-seen-my-mums-face.mp4) | [`ANALYSIS.md`](03-enderman-parents/ANALYSIS.md) |

> **Important measurement notes (from `scripts/film-metrics.py`):**
> - All three have **0.0% flat frames**, **>= 99.9% caption coverage** (`100.0%`, `100.0%`, `99.9%`), **<= 2.4% dark frames** (`0.2%`, `0.0%`, `2.4%`), and high first-3-second visual hook motion (`hook`: **66.5**, **44.4**, **67.7**).
> - Note on storage: each `video.mp4` here is a symlink to the canonical `.mp4` in [`Topics/InThisTown/reference/`](../Topics/InThisTown/reference/) so Git stays clean without duplicating 222 MB of video blobs.

---

## Read These Playbooks Before Making Any New Short

1. **[`docs/WHY-THE-3-HITS-BLEW-UP.md`](../docs/WHY-THE-3-HITS-BLEW-UP.md)** — Deep forensic comparison showing why these three crossed 20k views while dark/sequel/generic-villager Shorts capped out at 1.5k–2k.
2. **[`docs/VIRAL-SHORTS-BLUEPRINT.md`](../docs/VIRAL-SHORTS-BLUEPRINT.md)** — The repeatable 20k+ formula, 6-beat emotional misread curve, hook checklist, and original non-duplicate Minecraft mob concepts.
3. **[`docs/FRAMEWORK-REVIEW-AND-REMASTER.md`](../docs/FRAMEWORK-REVIEW-AND-REMASTER.md)** — Technical flaws found in the v1 framework and the Remaster v2 engine, camera, and shader upgrades.

# Start Here: Read `AGENTS.md`
> **SMALL MODELS START HERE:** Read [`SMALL-MODEL-CHEATSHEET.md`](SMALL-MODEL-CHEATSHEET.md) (5 copy-paste recipes: `<VillageStreet />`, `moveBetween()`, `cam.track/sweep/heroLow`, `CitizenLead variant`, and 1-command `sound.py draft`).

> **REMASTER v5 HARD GATES:** Read [`docs/REMASTER-V5-REFERENCE-STANDARD.md`](docs/REMASTER-V5-REFERENCE-STANDARD.md) — `direction-report.mjs` now HARD FAILS wall-spam (>4 same-axis shots), lazy cameras (<1m travel), and static mannequin staging (<20% A→B locomotion). Use `<VillageStreet>`, `cam.track`, `cam.sweep`, `cam.heroLow`, `cam.streetOverview`, and `CitizenLead variant`.


> **REMASTER v4 MANDATORY:** Before writing or rendering any Short, read [`docs/CRITIQUE-V4-QUALITY-GATES.md`](docs/CRITIQUE-V4-QUALITY-GATES.md) (natural `+0%` TTS + `0.42s` breath gaps, louder BGM `-12`/`-13`, 9:16-safe `dist >= 6.0` unclipped framing, continuous A→B motion, background crowds, zero ServerLore scoreboards).


Read [`AGENTS.md`](AGENTS.md) (~110 lines) first — it is the single source of truth for topic routing, camera framing (`cam.front` / `cam.twoShot`), character motion (`wordAt` + `walkSegment`), grounding/phasing rules, and verification commands.

Do **not** read every doc in `docs/` or `20k-hits/` upfront. Pick the film's topic from `AGENTS.md`, read only that topic's `README.md`, and open **one** approved reference film if you need an example.

> **Code-only mirror:** Reference MP4s, narration, and binary media are not committed here. Run `bash scripts/restore-assets.sh --with-references` if you need them (see `CODE_ONLY.md`).

Always run `npm run typecheck`, `npm run check`, and `npm run rehearse -- <film-id> --final` before calling a film ready.

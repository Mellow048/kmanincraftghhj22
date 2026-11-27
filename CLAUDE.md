# Start Here: Read `AGENTS.md`

Read [`AGENTS.md`](AGENTS.md) (~110 lines) first — it is the single source of truth for topic routing, camera framing (`cam.front` / `cam.twoShot`), character motion (`wordAt` + `walkSegment`), grounding/phasing rules, and verification commands.

Do **not** read every doc in `docs/` or `20k-hits/` upfront. Pick the film's topic from `AGENTS.md`, read only that topic's `README.md`, and open **one** approved reference film if you need an example.

Always run `npm run typecheck`, `npm run check`, and `npm run rehearse -- <film-id> --final` before calling a film ready.

# Read `MASTERPROMPT-01.md` first, then `AGENTS.md`

**`MASTERPROMPT-01.md` is the owner's standing brief** (2026-11-11, the day Monster Village Part 1 passed 15,000
views). Read it at the start of every turn that touches a film. It is where the hook-in-three-seconds rule, the
seven-beat spine, the shot-variety and caption rules, the "readable with the sound off" test, the CTA-after-payoff
rule and the self-review checklist live.

Then `AGENTS.md`, the contract for this repository, which opens with the one question that decides everything else:
**which kind of film were you asked for?**

- "In This Town", a story that begins "In this town, …"
  → the topic in `Topics/InThisTown/`. Start with `npm run new -- "In This Town, …" --topic in-this-town`.
- "Explain …", "What is …", "Why does …", a money lesson, inflation
  → `Topics/Explainer/`, `--topic explainer` (continuous camera).
- A first-person story in any world → `--topic stories`; a deadpan escalating joke → `--topic deadpan`.
- "What if you could …", the story of a kid who gets a power
  → the topic in `Topics/WhatIf/`. Start with `npm run new -- "What If …" --topic what-if`.
- A 20-second short → the base film. Start with `npm run new -- "The Title"`.
- Not sure → ask the owner one question.

A 20-second film called "In This Town" has been built twice and rejected twice. `npm run new` and `npm run check`
now refuse it.

**Before you build a topic film, open the films the owner approved.** They are kept with their source code and their
mp4 in `Topics/InThisTown/reference/` (`README.md` there lists the films and what each is for). Copy how they
are built. Never copy what they tell.

For narrated films follow [the directing pass](docs/DIRECTING.md): reference, marks, word clock, rehearsal, then picture and sound.

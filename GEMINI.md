# Read `AGENTS.md` first

It is the contract for this repository, and it opens with the one question that decides everything else:
**which kind of film were you asked for?**

- "In This Town", a story that begins "In this town, …", a storytime, a narrated story of a minute or more
  → the topic in `Topics/InThisTown/`. Start with `npm run new -- "In This Town, …" --topic in-this-town`.
- "Explain …", "What is …", "Why does …", a money lesson, inflation
  → the topic in `Topics/Explainer/` (provisional). Start with `npm run new -- "…" --topic explainer`.
- "What if you could …", the story of a kid who gets a power
  → the topic in `Topics/WhatIf/` (provisional). Start with `npm run new -- "What If …" --topic what-if`.
- A 20-second short → the base film. Start with `npm run new -- "The Title"`.
- Not sure → ask the owner one question.

A 20-second film called "In This Town" has been built twice and rejected twice. `npm run new` and `npm run check`
now refuse it.

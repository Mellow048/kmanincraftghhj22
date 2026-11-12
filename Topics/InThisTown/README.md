# In This Town — Minecraft storytime

A kid tells you about the strange town he grew up in, the one rule nobody would explain, and what happened when he
broke it. Two to three minutes. First person, a fast voice with no pauses, a new picture about every two seconds, one
word of caption at a time, and a last line that turns the first line upside down.

The format is modelled on one Roblox video the owner supplied, "In This Town, Everyone Lived In A Treehouse"
([`reference/treehouse/`](reference/treehouse/README.md)). We make the same **kind** of video out of Minecraft blocks.
We do not copy its story, its sentences or any Roblox asset.

## Read in this order

1. This page.
2. [`SCRIPT.md`](SCRIPT.md) — how the story is written. This is where version 1 failed.
3. [`SHOTS.md`](SHOTS.md) — how it is cut and shot, and how each Roblox trick becomes a Minecraft one.
4. [`docs/STORY-FILMS.md`](../../docs/STORY-FILMS.md) — the engine side: script → voice → timing → shots → captions.
5. [`reference/monster-egg-v1/`](reference/monster-egg-v1/README.md) — one page on the attempt the owner rejected.

## What changes from the base rules

These apply to a film that declares `topic: "in-this-town"`, and to nothing else.

| Base rule (`AGENTS.md`) | In This Town |
|---|---|
| 18–20 s, ceiling 21 s | 150–178 s. Never over 180 s, the limit for a Short |
| 4–7 scenes, 3–5 shots per 20 s | About 18 beats and 80–95 shots. A cut about every 2 s (median 1.4–2.3 s). No shot over 6 s |
| No camera teleports; a scene starts where the last one ended | Hard cuts are the language. Cut on the noun |
| Narration in the present tense, 3–10 words a line, 4–7 lines | Past tense, first person, full sentences. 640–770 words at 235–268 words a minute. No pauses |
| No overlays; text only on 3D signs | One-word captions, drawn by the engine (`captions` in `defineFilm`). Scenes still add no overlays of their own |
| Hook in the first 1.5 s | The first three words are "In this town," over the teller's face |
| The last line is a button, not a moral | The last line is the twist, then a 4–6 word "Subscribe …" line that belongs to the story |
| One world, mounted once | One world, split into zones. Each shot names its zone |

Everything else in `AGENTS.md` still holds: one folder per film, real 3D sets, something moving in every shot, the
picture shows what the voice says, deterministic code, atmosphere in the world, and the render policy.

## What makes this kind of video work

The evidence for each line is in `SCRIPT.md` and `SHOTS.md`.

1. **The title is the first sentence.** "In this town," plus one impossible fact, said over the teller's face.
2. **Questions before answers.** Three open questions in the first 11 seconds.
3. **A tour before a problem.** 23 seconds of how the town lives, all of it things you can point a camera at.
4. **The wish is a question.** "What was down there?" The viewer stays to get the answer, not to see a goal reached.
5. **The answer is planted.** The teller asks, out loud, the question whose answer is the twist, 90 seconds early.
6. **Try, fail, try again.** One cheap funny failure, then one attempt that works.
7. **Slow down at the edge.** The moment before the act gets the most words of any beat after the tour.
8. **Picture, then explanation.** The reveal is one short sentence about what he saw. The reason comes second.
9. **A new picture every two seconds.** 87 shots, 8 words each. Every shot is moving.
10. **The ending rewrites the beginning.** The prison was a shelter. Then four words, and it is over.

## Work order

1. Write the premise as four sentences: *In this town, X. Nobody would explain rule Y. I broke it. Y was really Z.*
   If Z does not change what X means, you do not have a story yet.
2. Write `src/videos/<film>/narration.md` to the 18-beat sheet in `SCRIPT.md`. One line of script per shot.
3. `python3 scripts/narration.py build <film> --estimate`. Fix length and rhythm now, while it is only text.
4. **Get the script approved by the owner before anything is built.** Then record one clip per `# clip` line and
   run `build` again without `--estimate`.
5. Build the world in zones, then the cast, then the scenes: one `sceneN.tsx` per beat, one shot per script line.
   Each shot has a `cam.*` move, a `note` and a `stage`.
6. `npm run typecheck && npm run check`.
7. One still per shot (`npm run shots -- <film>`), read as a contact sheet, fixed, and looked at again. Expect
   three or four passes. Then the render. The render policy in `AGENTS.md` applies.

## What is in this folder

| | |
|---|---|
| `topic.json` | The numbers `npm run check` enforces for this topic |
| `SCRIPT.md`, `SHOTS.md` | The two playbooks |
| `reference/treehouse/` | The model video, its transcript, a shot log and contact sheets |
| `reference/monster-egg-v1/` | The rejected first attempt, as a warning |
| `creatures.tsx` | The monsters, built from boxes: egg, worm, dragon, phoenix, golem, the mother, chicken, rank sign, fire, smoke, sound rings. Shared by this topic's films |

Films live in `src/videos/`. The first one is `in-this-town-monster-egg`: 93 shots, 2:57. Read its `world.tsx` for
how a town is laid out in zones, its `kit.tsx` for the cast and helpers, and any `sceneN.tsx` for what a shot looks
like. The street and school that version 1 kept in a `maps/` folder here were removed; the town now lives with the film.

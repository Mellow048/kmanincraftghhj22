# Explainer — one question, answered in under a minute

A narrator asks one question a nine-year-old would ask ("Why does bread cost more every year?"), and answers it
with things you can point a camera at. Thirty to sixty seconds. Every sentence is shown, literally, as it is said.
And the camera never cuts: it **flies** from each thing to the next, through one small world in the sky.

The subjects the owner named for this topic: money lessons, and what inflation is.

> **PROVISIONAL.** The owner asked for this topic to be built before its reference: "reference which we will do
> later once youre done". So nothing here is measured from a real video yet. The camera is the framework's own
> (`docs/CAMERA-BIBLE.md`); the voice, the captions and the sound are the story pipeline's
> (`docs/STORY-FILMS.md`); the numbers in [`topic.json`](topic.json) are a first setting, so that `npm run check`
> has something to hold a film to. **The reference will be our own first film** (the owner, asked for a video:
> "you are the one making that reference!"): `src/videos/why-does-bread-cost-more-every-year/`. He approved its
> script on 2026-11-13 ("yesboth") and its voice is recorded; its picture and its sound are not built yet. When the
> finished film is approved, measure it and correct this folder
> ([`reference/`](reference/README.md) says how). No film of this topic has been approved yet.

## Start here

```bash
npm run new -- "Why Bread Costs More" --topic explainer
```

That gives you a film folder made from this topic's starter ([`template/`](template/)): a script page to fill in, a
`kit.tsx` wired to the pack, two islands, and one scene whose camera already flies between two stops. It does not
give you an explanation.

## Which kind of film is it?

| The request | It is |
|---|---|
| "Explain …", "What is …", "Why does …", "How does … work", a money lesson, inflation | **This topic** |
| "What if the sun went out?", answered with facts about what would happen | **This topic.** It is an explanation with "what if" in the title. Pass `--topic explainer` |
| "What if you could …", a kid who gets a power and what happened to him | [`Topics/WhatIf`](../WhatIf/README.md). That is a story |
| "In this town, …" | [`Topics/InThisTown`](../InThisTown/README.md) |

If you cannot tell whether a "what if" is a story or an explanation, ask the owner one question.

## Read in this order

1. This page.
2. [`SCRIPT.md`](SCRIPT.md) — how an explanation is written: one question, one answer, one idea a line.
3. [`SHOTS.md`](SHOTS.md) — the flight: stops, islands, and why nothing an explainer shows lives in a shot.
4. [`PACK.md`](PACK.md) — what already exists: the stage, money, charts you can stand next to, goods.
5. [`SOUND.md`](SOUND.md) — the sounds of money and of numbers, and what differs from a story film's sound.
6. [`docs/STORY-FILMS.md`](../../docs/STORY-FILMS.md) — the engine side: script → voice → timing → picture → captions → sound.
7. [`docs/CAMERA-BIBLE.md`](../../docs/CAMERA-BIBLE.md) — the camera grammar this topic flies by.

## What changes from the base rules

These apply to a film that declares `topic: "explainer"`, and to nothing else.

| Base rule (`AGENTS.md`) | Explainer |
|---|---|
| 18–20 s, ceiling 21 s | 30–58 s. Never over 60 s. (`cut: "long"`: 60–118 s, never over 120 s) |
| Times of a camera move are typed by hand (`at`, `dur`) | The recorded voice is the clock. Each line of `narration.md` is one **stop**, and the camera flies to it as the line begins (`flightScene`) |
| The camera never teleports; `npm run check` warns about a jump | The same promise, enforced: `film.tsx` calls `unbroken(film.scenes)`, which throws if the camera jumps. At most 2 declared hard cuts a film |
| 3–5 shots in 20 s | One stop for each line: about 12–25 in a film. A new stop every 2–4 s (median 1.8–4.0 s). Nothing rests over 7 s |
| A scene owns its actors and its performance | A scene owns its **exhibit** (`ExhibitN`) and its route. The exhibit is mounted by `world.tsx` for the whole film and driven by the film's clock, because a camera that flies away from a thing still sees it |
| Narration optional, 4–7 lines, no recorded voice | A recorded narrator, present tense, talking to "you". 110–250 words. One idea a line |
| No overlays; text only on 3D signs | One-word captions, drawn by the engine. And every number is a **thing in the world**: a tag, a bar, a stack (`PACK.md`) |
| "Music: low drone, one pulse" | Music in three or more sections, the air of the place, and 40 or more sound effects a minute, built by `scripts/sound.py` from the film's `sound.json` |
| The last frame is a button | The last line is the subscribe line, and it belongs to the explanation |
| Started from `templates/video/` | Started from this topic's `template/`, and built from its pack |

Everything else in `AGENTS.md` still holds: one folder per film, real 3D sets, the picture shows what the voice
says, deterministic code, atmosphere in the world, and the render policy.

## What makes an explanation work

These are the rules this folder is built on. They are a first setting, like the numbers, until a reference is measured.

1. **One question.** The title is the question. The film ends when it is answered.
2. **One thing everybody knows.** A loaf of bread and its price. Every later number is measured against it.
3. **One person it happens to.** Sam. Whatever is explained happens to Sam, so the viewer has somebody to be.
4. **One idea a line, one stop a line.** If a line has two things in it, it is two lines.
5. **A number is a thing.** Never a slide. A price is a tag on the loaf. "It doubled" is a bar that grows past Sam's head.
6. **Show it on the word.** The tag pops on "price". The bar grows on "doubled". Not a second before or after.
7. **The camera never lets go.** It flies from one thing to the next, so the viewer sees how the ideas are joined.
8. **The surprising part comes late.** The cause everybody knows first; the part they do not know just before the end.
9. **End on the viewer.** The last picture is what this means for them, and then the subscribe line.

## Work order

1. `npm run new -- "…" --topic explainer`.
2. Write the question, and the answer in ONE sentence a nine-year-old could repeat. If you cannot, you cannot
   explain it yet: read more first.
3. Write `src/videos/<film>/narration.md` to the beat sheet in `SCRIPT.md`. One line of script per stop. Fill in the
   table of what each line SHOWS before you write the lines.
4. `python3 scripts/narration.py build <film> --estimate`. Fix length and rhythm now, while it is only text.
5. **Get the script approved by the owner before anything is built.** Then record one clip per `# clip` line and
   run `build` again without `--estimate`.
6. Lay out the islands in `kit.tsx` (`PLACE`) and `world.tsx`, one for each idea, with the pack's parts. Name the
   route (`STOPS`). Then the scenes: one `sceneN.tsx` per beat, each with its `ExhibitN` and its flight.
7. `npm run typecheck && npm run check`.
8. One still per stop (`npm run shots -- <film> --at 0.9`: the frame the camera comes to rest on), read as a
   contact sheet, fixed, and looked at again. Then `--at 0.2` for where it is in mid-flight.
9. **The sound** ([`SOUND.md`](SOUND.md)): `python3 scripts/sound.py draft <film>`, write the sheet stop by stop,
   `python3 scripts/sound.py build <film>`, read the report, and point `film.tsx` at the mix.
10. `npm run typecheck && npm run check` again, then the render. The render policy in `AGENTS.md` applies.
11. Hand it over with what you could not judge: the sound was measured, not heard.

`npm run check` tells you where you are at every step: which script line has no stop yet, whether the timing is
still an estimate, and whether the mix is older than the script.

## What is in this folder

| | |
|---|---|
| `topic.json` | The numbers `npm run check` enforces for this topic, its camera rule, the limits of the sound. `state: "PROVISIONAL"` until a reference is measured |
| `SCRIPT.md`, `SHOTS.md`, `SOUND.md` | The three playbooks: the explanation, the flight, the sound |
| `PACK.md`, `pack.jpg` | The catalogue of the pack |
| `index.ts` | The pack, from one import: `import { Island, Coin, flightScene } from "../../../Topics/Explainer"` |
| `flight.tsx` | The camera: `stop`, `near`, `flightScene`, `unbroken` |
| `stage.tsx` | Island, Sun, Plinth, Signpost, Bridge |
| `money.tsx` | Coin, CoinStack, CoinPile, Bill, BillStack, MoneyBag, Chest, Printer |
| `charts.tsx` | PriceTag, Bar, BarChart, Arrow, Balance |
| `goods.tsx` | Bread, Apple, Crate, BreadShelf |
| `template/` | The starter film that `npm run new -- … --topic explainer` copies |
| `sheet/` | The source of `pack.jpg`: a film that only shows the parts. `PACK.md` says how to rebuild it |
| `reference/` | Empty until the topic's first film is approved: the owner asked us to make the reference ourselves. What to do when it is |

Parts used by more than one topic (numbers and icons in cubes, the film's clock, twelve people, the villagers and
their houses, the red "Subscribe" sign) are in [`Topics/Shared`](../Shared/README.md) and are passed on by this pack.

Films live in `src/videos/`. A film's own `kit.tsx` holds only what belongs to that one explanation: its route, its
islands, its Sam. Anything new that a second film could use goes into the pack ([`PACK.md`](PACK.md) says how).

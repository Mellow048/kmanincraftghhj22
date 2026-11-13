# What If — a kid, one impossible power, and what it cost

"What if you could see who has a crush on you?" "What if you could see five seconds into the future?" "What if you
could swim faster than anyone else?" The title is the question. Then a kid tells you what happened when it came
true for him: how it worked, what he used it for, and the thing about it he found out too late. One to two
minutes. First person, a fast voice with no pauses, a new picture about every two seconds, one word of caption at
a time, music and sound effects under all of it, and a last line that turns the question upside down.

**It is a story, built the way an "In This Town" film is built.** The owner: "its a story just like the InThisTown
it has the same camera technique". Hard cuts, one shot for each line of the script, the same pipeline, the same
sound. What is its own: the opening, the shape of the story, a school to tell it in, and the parts that SHOW a
power.

> **The reference is our own first film.** The owner asked for this topic before its reference, and then for us to
> make the reference ourselves ("you are the one making that reference!"). The film is
> `src/videos/what-if-you-could-see-who-had-a-crush-on-you/` (1:54, 14 beats, 55 shots, 479 words, full sound). He
> approved it on 2026-11-13: "okay i love both really, this can be uploaded too!", "i like how you made these!".
> It is measured, and it is kept with its source, a log of every shot and a contact sheet in
> [`reference/crush/`](reference/crush/README.md). The numbers in [`topic.json`](topic.json) were borrowed from In
> This Town's short cut before the film existed; the film was built to them and sits inside every one, so they
> stand. The beat sheet in [`SCRIPT.md`](SCRIPT.md) is now the film's own. **Open the reference before you build.**

**It is never a 20-second short.** A film with this opening that is built to the base rules is the mistake In This
Town made twice. `npm run new` refuses a title that starts "What if" without `--topic`, and `npm run check` fails a
film that opens that way and declares no topic.

## Start here

```bash
npm run new -- "What If You Could See Who Has a Crush on You" --topic what-if
```

That gives you a film folder made from this topic's starter ([`template/`](template/)): a script page to fill in, a
`kit.tsx` wired to the pack, a school in three zones, and one scene with two shots that already render. It does
not give you a story.

## Which kind of film is it?

| The request | It is |
|---|---|
| "What if you could …", "What if I …": a kid gets a power, and tells what happened | **This topic** |
| "What if the sun went out?", answered with facts | [`Topics/Explainer`](../Explainer/README.md): an explanation with "what if" in its title. Pass `--topic explainer` |
| "In this town, …": a place with a rule nobody explains | [`Topics/InThisTown`](../InThisTown/README.md) |

If you cannot tell whether a "what if" is a story or an explanation, ask the owner one question.

## Read in this order

1. This page.
2. [`SCRIPT.md`](SCRIPT.md) — how a power story is written: the rule of the power, its limit, its price.
3. [`SHOTS.md`](SHOTS.md) — how a power is SHOWN, and how to shoot a classroom in a tall frame. The rest of the
   camera is In This Town's: [`../InThisTown/SHOTS.md`](../InThisTown/SHOTS.md).
4. [`PACK.md`](PACK.md) — what already exists: a school, the signs of a power, a class of kids.
5. [`SOUND.md`](SOUND.md) — the sounds of a power, and the rest by reference to In This Town's sound.
6. [`docs/STORY-FILMS.md`](../../docs/STORY-FILMS.md) — the engine side: script → voice → timing → shots → captions → sound.
7. The reference film, to see what "built" means: [`reference/crush/`](reference/crush/README.md). Its contact
   sheet first, then its shot log, then `source/` (its `kit.tsx`, `world.tsx`, fourteen scenes and `sound.json`).
   Copy how it is BUILT. Never copy what it tells.

## What changes from the base rules

These apply to a film that declares `topic: "what-if"`, and to nothing else. They are In This Town's changes, with
this topic's own opening.

| Base rule (`AGENTS.md`) | What If |
|---|---|
| 18–20 s, ceiling 21 s | 60–118 s. Never over 120 s. Never under 60 s or 250 words. (`cut: "long"`: 150–178 s, never over 180 s) |
| 4–7 scenes, 3–5 shots per 20 s | About 14 beats and 35–65 shots. A cut about every 2 s (median 1.4–2.3 s). No shot over 6 s |
| No camera teleports | Hard cuts are the language. Cut on the noun |
| Narration in the present tense, 3–10 words a line | Past tense, first person, full sentences. 250–520 words at 235–268 words a minute. No pauses |
| No overlays; text only on 3D signs | One-word captions, drawn by the engine. Scenes add no overlays of their own |
| Hook in the first 1.5 s | The first words are "What if", over ONE picture of the power at work |
| The last line is a button | The last line is the twist, then a 4–6 word "Subscribe …" line that belongs to the story |
| One world, mounted once | One world, split into zones. Each shot names its zone |
| "Music: low drone, one pulse" | Music in five or more sections, the air of each place, 40 or more sound effects a minute, built by `scripts/sound.py` |
| Started from `templates/video/` | Started from this topic's `template/`, and built from its pack |

Everything else in `AGENTS.md` still holds: one folder per film, real 3D sets, something moving in every shot, the
picture shows what the voice says, deterministic code, atmosphere in the world, and the render policy.

## What makes this kind of story work

Each of these held in the reference film. The reasons are in `SCRIPT.md`.

1. **The title is the first sentence.** "What if you could …?", over one picture of the power. Then: "One morning, I could."
2. **The power has one rule, and one limit.** The viewer can say both after fifteen seconds. The limit is where the story turns.
3. **The power has ONE look.** A heart over a head. A see-through copy that does things five seconds early. It is
   set in the first shot and it never changes: after ten seconds the look IS the power.
4. **Fun first.** Three quick wins, each bigger. All of them things you can point a camera at.
5. **The wish is a question.** Not "I wanted to win". "Who liked ME?" The viewer stays to get the answer.
6. **The answer is planted.** One thing that does not fit, said out loud and waved away, a minute before it matters.
7. **Try, fail, try again.** One cheap funny failure, then one use that works, and costs something.
8. **Slow down at the edge.** The moment before the one big use gets the most words of any beat but the reveal.
9. **Picture, then explanation.** The reveal is one short sentence about what he saw. The reason comes second.
10. **The ending answers the title.** "What if you could?" Then you would know this. Then four words, and it is over.

## Work order

1. `npm run new -- "What If …" --topic what-if`.
2. Write the premise as four sentences: *What if I could X. I used it for Y. It worked, until Z. What it was really
   doing was W.* And the rule of the power in one line: what it does, and the one thing it cannot do. If W does not
   change what X means, you do not have a story yet.
3. Write `src/videos/<film>/narration.md` to the beat sheet in `SCRIPT.md` (14 beats). One line of script per shot.
4. `python3 scripts/narration.py build <film> --estimate`. Fix length and rhythm now, while it is only text.
5. **Get the script approved by the owner before anything is built.** Then record one clip per `# clip` line and
   run `build` again without `--estimate`.
6. Lay out the places in zones in `world.tsx` with the pack's school, and build the one new place this story needs
   (the pool, the roof, the bus). Decide the LOOK of the power, from `PACK.md` or new. Then the scenes: one
   `sceneN.tsx` per beat, one shot per script line, cast from the pack through `kit.tsx`. Each shot has a `cam.*`
   move, a `zone`, a `note` and a `stage`.
7. `npm run typecheck && npm run check`.
8. One still per shot (`npm run shots -- <film>`), read as a contact sheet, fixed, and looked at again. Expect
   three or four passes: the first film took five. [`SHOTS.md`](SHOTS.md) §5 lists what they found, so that the
   next film does not find it again.
9. **The sound** ([`SOUND.md`](SOUND.md)): `python3 scripts/sound.py draft <film>`, write the sheet shot by shot,
   `python3 scripts/sound.py build <film>`, read the report, and point `film.tsx` at the mix.
10. `npm run typecheck && npm run check` again, then the render. The render policy in `AGENTS.md` applies.
11. Hand it over with what you could not judge: the sound was measured, not heard.

## What is in this folder

| | |
|---|---|
| `topic.json` | The numbers `npm run check` enforces for this topic and its long cut, the limits of the sound. `state: "MEASURED"`: `reference` names the film, `measuredFromReference` its numbers |
| `SCRIPT.md`, `SHOTS.md`, `SOUND.md` | The three playbooks: the story, the picture, the sound |
| `PACK.md`, `pack.jpg` | The catalogue of the pack |
| `index.ts` | The pack, from one import: `import { Classroom, Overhead, Echo } from "../../../Topics/WhatIf"` |
| `school.tsx` | Classroom, Desk, Chalkboard, SchoolHall, and `classroom(at)` for the places in one |
| `places.tsx` | Kitchen (with a mirror that reflects), LunchRoom, Gym (by day, and dressed for a dance at night, with a yard, a gate and a street), and a function for the places in each |
| `things.tsx` | Dog, DogBowl, Tray, Cup, Sandwich, Cookie, CookieStack, Eraser, Card, Tie |
| `powers.tsx` | Overhead, Aura, Echo, Streaks, Swirl, Countdown, Beam |
| `cast.tsx` | Twelve classmates, and a teacher |
| `template/` | The starter film that `npm run new -- … --topic what-if` copies |
| `sheet/` | The source of `pack.jpg`: a film that only shows the parts. `PACK.md` says how to rebuild it |
| `reference/` | The films of this topic that the owner approved, each with its source, a log of every shot and a contact sheet. The first is the reference film |

Parts used by more than one topic (numbers and icons in cubes, staging, a kid's bedroom, a village street, the red
"Subscribe" sign) are in [`Topics/Shared`](../Shared/README.md) and are passed on by this pack.

Films live in `src/videos/`. A film's own `kit.tsx` holds only what belongs to that one story: its teller, the two
or three people it is about, its map of places. Anything new that a second film could use goes into the pack.

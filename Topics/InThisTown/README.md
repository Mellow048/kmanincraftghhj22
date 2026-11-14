# In This Town — Minecraft storytime

A kid tells you about the strange town he grew up in, the one rule nobody would explain, and what happened when he
broke it. One to three minutes. First person, a fast voice with no pauses, a new picture about every two seconds, one
word of caption at a time, music and sound effects under all of it, and a last line that turns the first line upside
down.

**It is never a 20-second short.** A film that carries this name and is built to the base rules has been rejected
twice ([`reference/moon-20-seconds/`](reference/moon-20-seconds/README.md),
[`reference/monster-egg-v1/`](reference/monster-egg-v1/README.md)). `npm run check` now fails one.

The format is modelled on one Roblox video the owner supplied, "In This Town, Everyone Lived In A Treehouse"
([`reference/treehouse/`](reference/treehouse/README.md)). We make the same **kind** of video out of Minecraft blocks.
We do not copy its story, its sentences or any Roblox asset.

## Start here

```bash
npm run new -- "In This Town, Nobody Rang the Bell" --topic in-this-town
```

That gives you a film folder made from this topic's starter ([`template/`](template/)): a script page to fill in, a
`kit.tsx` wired to the pack, a town to change, and one scene with two shots that already render. It does not give
you a story.

## The reference film, and the other films the owner approved

**`in-this-town-same-face`, "In This Town, Everyone Had the Same Face Except Me".** The owner on the picture:
"everything is perfect top to bottom", "i like the assets". On the finished film with its sound: "yes its good put it
as the topic's reference". Open it before you write anything, and build like it.

Its page is [`reference/same-face/`](reference/same-face/README.md): the film itself, its source, its shape measured
beat by beat, its sound in numbers, and a log of all 57 shots with the reason for each.

**Every film the owner approved is kept in [`reference/`](reference/README.md), with its source code and its mp4**
("so that other agents know how to make a good short"). Each folder there holds the film, one picture of all its
shots, a log of every shot, a snapshot of its source, and a page on what it is good for and what was hard.

| Film | The owner said | Use it for |
|---|---|---|
| [`reference/same-face/`](reference/same-face/README.md): `in-this-town-same-face` (short cut: 14 beats, 57 shots, 441 words, 1:45). **The reference** | "yes its good put it as the topic's reference" | **Everything.** `narration.md` for the shape of a script. `kit.tsx` for how a film uses the pack. `world.tsx` for a town in zones. Any `sceneN.tsx` for what a shot is. `sound.json` for the sound |
| [`reference/nobody-looked-at-the-moon/`](reference/nobody-looked-at-the-moon/README.md): `in-this-town-nobody-looked-at-the-moon` (short cut: 14 beats, 63 shots, 471 words, 1:52) | "every single one u made is good" | A film at NIGHT: a town in warm lantern light, cold moonlight that lies on one place at a time and moves like a character (`skyAt()` in its `kit.tsx`), and every part under "Fields and night" in [`PACK.md`](PACK.md). A remake of a rejected 20-second film. The densest sound sheet, and what was cut from it |
| [`reference/monster-egg/`](reference/monster-egg/README.md): `in-this-town-monster-egg` (full film: 18 beats, 93 shots, 746 words, 2:57) | "every single one u made is good" | The long cut: how 18 beats are spread over three minutes, and three places in one world. **It has a voice and no other sound**, because it was made before the sound rule. Do not copy that |
| [`reference/superpower-at-18/`](reference/superpower-at-18/README.md): `in-this-town-superpower-at-18` (full film: 18 beats, 90 shots, 710 words, 2:48) | "wow i love it, i love how u made the short" | The long cut WITH sound, and a story the owner outlined himself. Its page says what he rejected on the way |
| [`reference/pumpkin-heads/`](reference/pumpkin-heads/README.md): `in-this-town-pumpkin-heads` (short cut: 14 beats, 58 shots, 490 words, 1:56) | He approved the script and asked for another ending; its `narration.md` says which | A second short cut with sound, and an ending that is not the subscribe sign held to camera |
| [`reference/robot-at-18/`](reference/robot-at-18/README.md): `in-this-town-robot-at-18` (full film: 86 shots, 697 words, 2:54) | "now thats MUCH better! 8.8/10 fight scene great job lad" | **A FIGHT.** `scene6.tsx` and `fight.tsx`: bodies posed joint by joint, hit-freezes, cuts inside a line, flying poses, and the two fights he rejected first |

Copy how they are **built**. Never copy what they **tell**: no premise, sentence, joke or twist from a finished film
goes into a new one.

The films that render live in `src/videos/<film>/`, and their delivered mp4s in `renders/`. What is in `reference/`
is a copy of both, kept beside the page that explains it.

The treehouse video in `reference/treehouse/` is where the format came from. It is a Roblox video by someone else,
studied for its shape. The reference film is ours.

## Read in this order

1. This page, then [`reference/README.md`](reference/README.md): which films the owner approved, and what each is
   for. Then the reference film's page, [`reference/same-face/`](reference/same-face/README.md), its contact sheet and
   its shot log.
0. [`OWNER.md`](OWNER.md) — what the owner likes, what reviews said, and the rules that came out of them. It wins over the playbooks.
2. [`SCRIPT.md`](SCRIPT.md) — how the story is written. This is where version 1 failed.
3. [`SHOTS.md`](SHOTS.md) — how it is cut and shot, and how each Roblox trick becomes a Minecraft one.
4. [`PACK.md`](PACK.md) — the people, places and things that already exist. One picture, one table for each file.
5. [`SOUND.md`](SOUND.md) — the music, the air and the effects, and how to write the sound sheet.
6. [`docs/STORY-FILMS.md`](../../docs/STORY-FILMS.md) — the engine side: script → voice → timing → shots → captions → sound.
7. [`reference/monster-egg-v1/`](reference/monster-egg-v1/README.md) and
   [`reference/moon-20-seconds/`](reference/moon-20-seconds/README.md) — one page each on the attempts the owner rejected.
   Each has an approved film beside it that tells the same idea.
8. The page of the approved film nearest to yours: night ([`reference/nobody-looked-at-the-moon/`](reference/nobody-looked-at-the-moon/README.md)),
   the long cut ([`reference/monster-egg/`](reference/monster-egg/README.md)), or the long cut with sound and the
   ending the owner threw out first ([`reference/superpower-at-18/`](reference/superpower-at-18/README.md)).
9. [`reference/superpower-at-18-part-2/`](reference/superpower-at-18-part-2/README.md) — the film the owner rated highest
   ("a banger… peak"), its source, and why its first render was rejected: motion and pace. Read it before any action scene.
10. [`reference/robot-at-18/`](reference/robot-at-18/README.md) — **the fight** the owner scored 8.8/10, after he rejected
    two ("it's like I'm watching a png fight another png"). Read it, and its five-frames-a-second sheet, before any fight.

## What changes from the base rules

These apply to a film that declares `topic: "in-this-town"`, and to nothing else.

| Base rule (`AGENTS.md`) | In This Town |
|---|---|
| 18–20 s, ceiling 21 s | 150–176 s. **Never over 178 s: a strict rule.** Over 3:00 YouTube does not treat it as a Short |
| 4–7 scenes, 3–5 shots per 20 s | About 18 beats and 80–95 shots. A cut about every 2 s (median 1.4–2.3 s). No shot over 6 s |
| No camera teleports; a scene starts where the last one ended | Hard cuts are the language. Cut on the noun |
| Narration in the present tense, 3–10 words a line, 4–7 lines | Past tense, first person, full sentences. 640–770 words at 235–268 words a minute. No pauses |
| No overlays; text only on 3D signs | One-word captions, drawn by the engine (`captions` in `defineFilm`). Scenes still add no overlays of their own |
| Hook in the first 1.5 s | The first three words are "In this town," over the teller's face |
| The last line is a button, not a moral | The last line is the twist, then a 4–6 word "Subscribe …" line that belongs to the story |
| One world, mounted once | One world, split into zones. Each shot names its zone |
| "Music: low drone, one pulse"; a hit on the reveal | The owner's own track under the whole film ([`InThisTownMusic.aac`](InThisTownMusic.aac)), the air of each place, and 40 or more sound effects a minute. All of it mixed by `scripts/sound.py` from the film's `sound.json` |
| Started from `templates/video/` | Started from this topic's `template/`, and built from its pack |

Everything else in `AGENTS.md` still holds: one folder per film, real 3D sets, something moving in every shot, the
picture shows what the voice says, deterministic code, atmosphere in the world, and the render policy.

## The short cut: one to two minutes

The owner may ask for a shorter film ("keep it short like 1 min to 2 minute max"). That is a **cut** of this topic,
not a different topic. A film takes it by adding one line to `defineFilm`, next to `topic`:

```ts
topic: "in-this-town",
cut: "short",
```

`npm run check` then holds the film to `cuts.short` in `topic.json` in place of the topic's length and word count.
Nothing else changes.

| | Full film | Short cut |
|---|---|---|
| Length | 150–176 s, **never over 178 s** (strict rule) | 60–118 s, **never over 120 s** |
| Words | 640–770 | 250–520 |
| The floor, for both | Never under 60 s or 250 words. Under that it is not a short film of this topic; it is a different kind of video, and `npm run check` fails it | the same |
| Beats | 18 | About 14 |
| Shots | 80–95 | 35–65 |
| Pace, shot length, captions, first line, last line | as in the table above | the same |

What to keep, and what to drop from the 18 beats of `SCRIPT.md`:

- **Keep:** the hook, the mysteries, the tour, the itch, the elder's rule, the decision with its planted question,
  one funny failure, one success, the friend, the edge, the act, the wait, the reveal, the button.
- **Drop first:** the adults' sensible reasons (beat 5), the tease (6), the price (11), the packing (12), and the
  friend's two lines of dialogue (13: he can act instead of speak).
- **Do not drop:** anything that is paid back at the end. A short cut has less room, so every planted thing has to
  come back. Write the table of what is planted and where it pays off before you cut a line.

The tour and the edge shrink in words, not in number of pictures: they are where the film is fastest.

The first film in this cut is `in-this-town-same-face`: 14 beats, 57 shots, 441 words, 1:45.

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

1. `npm run new -- "In This Town, …" --topic in-this-town`.
2. Write the premise as four sentences: *In this town, X. Nobody would explain rule Y. I broke it. Y was really Z.*
   If Z does not change what X means, you do not have a story yet.
3. Write `src/videos/<film>/narration.md` to the beat sheet in `SCRIPT.md` (18 beats, or about 14 for the short
   cut). One line of script per shot.
4. `python3 scripts/narration.py build <film> --estimate`. Fix length and rhythm now, while it is only text.
5. **Get the script approved by the owner before anything is built.** Then record one clip per `# clip` line and
   run `build` again without `--estimate`.
6. Lay out the town in zones in `world.tsx` with the pack's places, and build the one new place this story needs.
   Then the scenes: one `sceneN.tsx` per beat, one shot per script line, cast from the pack through `kit.tsx`.
   Each shot has a `cam.*` move, a `note` and a `stage`.
7. `npm run typecheck && npm run check`.
8. One still per shot (`npm run shots -- <film>`), read as a contact sheet, fixed, and looked at again. Expect
   three or four passes.
9. **The sound** ([`SOUND.md`](SOUND.md)): `python3 scripts/sound.py draft <film>`, write the sheet shot by shot,
   `python3 scripts/sound.py build <film>`, read the report, and point `film.tsx` at the mix.
10. `npm run typecheck && npm run check` again, then the render. The render policy in `AGENTS.md` applies.
11. Hand it over with what you could not judge: the sound was measured, not heard.

`npm run check` tells you where you are at every step: which script line has no shot yet, whether the timing is
still an estimate, and whether the mix is older than the script.

## What is in this folder

| | |
|---|---|
| `topic.json` | The numbers `npm run check` enforces for this topic and its short cut, the limits of the sound, the reference film and the other finished films |
| `SCRIPT.md`, `SHOTS.md`, `SOUND.md` | The three playbooks: the story, the picture, the sound |
| `PACK.md`, `pack.jpg`, `pack-night.jpg` | The catalogue of the pack, and one still for each part |
| `index.ts` | The pack, from one import: `import { Villager, Hut, pop } from "../../../Topics/InThisTown"` |
| `staging.ts` | When a word is said, how a thing pops in, where "in front of him" is, how to climb a hill |
| `villagers.tsx` | The villager, the iron golem, the poppy |
| `players.tsx` | Twelve players, no two alike, and the pumpkin head |
| `things.tsx` | Speech bubble, bed, hole, flying bits, smoke of three kinds, a burning roof, firelight; a wide straw hat, a bucket, a lantern |
| `places.tsx` | House (new, burned out, on fire, lit, door open), bell, well and its lid, stall, lamp post, lantern post, lantern line, fence, stepped hill, bedroom, tunnel |
| `creatures.tsx` | Egg, worm, dragon, phoenix, stone golem, the mother, chicken, rank sign, fire, puffs, sound rings, and the red "Subscribe" sign every film ends on |
| `fields.tsx` | What lies round the town and over it at night: wheat, scarecrows that stand and walk, pines and the edge of a forest, a moon, moonlight that falls on one place, stars |
| `template/` | The starter film that `npm run new -- … --topic in-this-town` copies |
| `reference/README.md` | **Start here for examples**: every film the owner approved, what each is for, and how to add one |
| `reference/same-face/` | **The reference film**: the mp4, its source, its shape and its sound measured, and a log of every shot |
| `reference/nobody-looked-at-the-moon/`, `reference/monster-egg/`, `reference/superpower-at-18/` | **Three more films the owner approved**, each with its mp4, its source, a log of every shot, and what was hard |
| `reference/treehouse/` | The video the format came from, its transcript, a shot log and contact sheets |
| `reference/monster-egg-v1/`, `reference/moon-20-seconds/` | The two rejected attempts, as warnings |
| `reference/robot-at-18/` | **The fight reference**, with its mp4 and source: `scene6.tsx` is the fight, `fight.tsx` the poses, moves and hit effects |
| `reference/pumpkin-heads/`, `reference/monster-village/`, `reference/monster-village-part-2/` | **Three more approved films**, each with its mp4, its source and a shot log |
| `reference/superpower-at-18-part-2/` | **The owner's favourite so far**, with its mp4 and source: how to stage fast action and show the process |
| `monsters.tsx` | The people of a monster village: zombie, skeleton, creeper, spider, enderman, slime. All of them can act |
| `InThisTownMusic.aac` | **The background music of every In This Town short.** The owner added it on 2026-11-13: "the music is used thats the new backround music for the in this town shorts". 3:36, stereo. A film's `sound.json` names it (`"track"` in `music`) and `scripts/sound.py` mixes it under the voice ([`SOUND.md`](SOUND.md), section 3). Superpower part 2 was the first to play it. The four films finished before that day keep the music they were approved with |

Films live in `src/videos/`. A film's own `kit.tsx` holds only what belongs to that one story: its teller, its map
of places, and anything no other film could use. Everything else comes from the pack, and anything new that a second
film could use goes into the pack ([`PACK.md`](PACK.md) says how).

# Deadpan — Minecraft, played completely straight

One everyday rule, taken literally, in a world where everybody treats it as normal. The teller is an ordinary
person — a renter, a delivery driver, a kid with a paper round — and the joke is never the strangeness. The joke is
how much it costs, and how calmly he reports it.

```text
I owed my landlord four hundred dollars.
So he moved in. (beat)
He took the bed. I took the floor. He said it was fair.
```

That is the whole topic in three lines: a mundane fact, a consequence that is absurd, and a narrator who will not
call it absurd. This is the **Roblox deadpan-surrealist escalation** format the owner brought on 2026-11-12
([`reference/OWNER-BRIEF.md`](reference/OWNER-BRIEF.md)), built with our own premises, in Minecraft blocks.

**This is not Stories.** A Stories film is a story you feel: a rule, a cost, a turn, a payoff. A Deadpan film is a
**joke that escalates**: the same craft floor, but the engine is comic, the pace is faster, and the last line is a
button rather than a revelation. Do not bring a Deadpan premise to the Stories topic or the other way round.

## The contract, in one screen

| | A Deadpan film |
|---|---|
| Length | 1:40–2:12 (340–420 words). Never over 2:58: over 3:00 YouTube does not call it a Short |
| Cuts | **95–115.** 0.8–1.4 s a shot. Nothing static, nothing held |
| Voice | First person, past tense, flat. Short active sentences (5–14 words). Exact numbers, days, prices |
| Captions | One word at a time, lower third, in the engine's own design |
| Music | Light, comic, under everything. A hit on every snap, knock and zoom |
| Ending | The goal succeeds, then one ironic line that loops the premise back on itself |

## The six beats (full detail in [`SCRIPT.md`](SCRIPT.md))

1. **Hook, mid-action** — a mundane act, an absurd reaction, no greeting. Two sentences.
2. **The rule and the stakes** — the law of this world, stated plainly, plus **one physical detail** (the thing that
   will win it at the end).
3. **The ladder** — 5–7 stages, each worse, each with a time or count anchor ("By Friday…", "Delivery 998").
4. **The pivot** — "So that was it. … So how do you beat that? I simply …" — the planted detail comes back.
5. **The loophole** — the antagonist's own rule or reflex is turned against them.
6. **The button** — it worked, and here is the cost of it working.

## Work order

1. Find the rule. An idiom, a game, a shop policy, a superstition — something a child knows and an adult obeys.
2. Write the premise as one line: *"<Mundane rule> is literal. I broke it, or it happened to me. It cost <exact
   number>."* If the number is not exact, it is not this topic.
3. Fill the beat sheet in [`SCRIPT.md`](SCRIPT.md). Count the words; 340–420.
4. `python3 scripts/narration.py build <film> --estimate` and cut it to length before recording a single line.
5. Record with `voice-08`, one clip per `# clip` line, then `build` again.
6. Build the film: the camera language is in [`SHOTS.md`](SHOTS.md); the sound in [`SOUND.md`](SOUND.md); the parts
   you can reuse are in [`PACK.md`](PACK.md).
7. `./node_modules/.bin/tsc --noEmit`, `npm run check`, the render, then watch a frame sheet before handing it over.

## What already exists, and what you build

The engine is further along than the brief assumes. Check before you write code:

| The brief asks for | Where it already is |
|---|---|
| Blocky people, swappable faces snapped per beat | `MinecraftAvatar` + `FaceName` (26 faces, incl. `angry`, `smug`, `surprised`, `crying`, `dizzy`, `hollow`, `blank`) — set `face` per shot, no lip-sync |
| One-word captions | `captions` in `defineFilm` — the shared design, unchanged |
| Handheld drift on every frame | `handheld` on a shot (0.005–0.03 m) |
| Camera jolts on knocks and impacts | `shake`, and timed `impacts` |
| Crash zooms, whip pans, prop tracking, low angles, top-downs | `cam.push`, `cam.pan`, `cam.truck`, `cam.orbit`, `cam.top`, `pitch` below zero |
| Music and a hit for each thing | `scripts/sound.py` + a `sound.json` sheet ([`SOUND.md`](SOUND.md)) |

What does **not** exist yet, and is built per film in the film's `kit.tsx`:

- floating comic symbols (`?`, `Z`, `!`, tears, sweat) — a small `Comic` device over `PixelText`;
- white radial speed lines for a chase, and directional motion blur for a whip pan;
- the VHS overlay (`PLAY ▶`, scanlines, timestamp);
- phone UI (a 3D panel with a call or text on it);
- anything modern the story needs that the Minecraft pack has never had: cars, apartment blocks, offices, tills.

## What is in this folder

| File | What it is |
|---|---|
| [`SCRIPT.md`](SCRIPT.md) | The owner's ideation formula, the sentence rules, the six beats, the pivot pattern, the checklist |
| [`SHOTS.md`](SHOTS.md) | The camera and edit grammar: micro-cuts, snaps, crash zooms, tracking, shakes, angles, framing, captions |
| [`SOUND.md`](SOUND.md) | How the mix is made, and the extra rule for a comic film: a hit on every snap |
| [`PACK.md`](PACK.md) | What to reuse from `Topics/Stories` (people, monsters, places, staging) and what to build |
| [`topic.json`](topic.json) | The numbers `npm run check` enforces |
| [`reference/OWNER-BRIEF.md`](reference/OWNER-BRIEF.md) | The brief this topic came from, word for word, and what it means for us |

`index.ts` re-exports the Stories pack, so a film of this topic imports everything from one place:

```ts
import { Hero, Villager, Pillager, Mansion } from "../../../Topics/Deadpan";
```

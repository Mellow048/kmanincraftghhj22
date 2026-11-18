# Recreation

**Approved HUS film: [That’s Me. The Elbow. — MP4, source and shot sheet](Hus%20hus%20reference/README.md).** Study how the chant marks individual movements and how the last joke works with the sound off. The 77.50 s cut has 49 setups and 242 spoken words. The ranges in `topic.json` are working limits, not a requirement to match one film.

A real-life story from a meme, **recreated with block people in a block town**. The owner's words: "its IRL coated
with minecraft. No nether, no mc shenanigans. its a recreation cmon."

The owner’s originating format is *The Guy Who Never Went to Parties*: somebody skips parties to train one ordinary skill, far too seriously, and the friends who laughed need it at the end. His cook script is in [`reference/OWNER-SCRIPT.md`](reference/OWNER-SCRIPT.md); our first build was the [barber](../../src/videos/the-barber-who-never-went-to-parties/), which was built without his review. The party / job / reunion beat sheet below records that version; it is not a required plot. The approved Elbow reference instead turns an awkward family photo into a different final joke. Learn its action-to-chant and visual payoff, not its photo gag. Pitch a fresh real-life skill and consequence; after selection, get script approval before recording or building.

## The meme

| What | What it is | Source |
|---|---|---|
| "While they're out partying btw" | A TikTok and Reels trend: show a skill under that caption, the joke being that you perfected it while everybody else was out partying. Big from August to October 2026; a Roblox clip under the caption took 8.5 million views in a week | https://knowyourmeme.com/memes/while-they-are-out-partying |
| Where it comes from | The 2016 line "While you were partying, I studied the blade": somebody deadly serious about something nobody asked for | same page |
| "Huss huss huss" | The sound of somebody panting while going flat out. From the Huss Valley meme (July 2026). It is breath, not a battle cry | https://meme.com/memes/huss-valley |
| The Roblox version | Grind clips with "huss huss huss" over them and "while they're out partying btw" as the caption | https://www.tiktok.com/discover/paying-basketball-while-they-are-parting-huss-huss-eobloc |

The meme spells it HUSS. The owner spells it HUS, and so do the captions. The voice is given "Huss" to read.

## The rules

| | Rule | Where it came from |
|---|---|---|
| 1 | **Real life, in blocks.** A house, a street, a television, a shop, a job. Nothing from the game: no Nether, no lava, no mobs, no crafting, no game mechanics, no Minecraft jokes | The owner, on the first draft |
| 2 | **Our own lines.** Only "Training." and "HUS HUS HUS!" are fixed: they are the meme | The owner, on the first draft |
| 3 | **The main thing on frame one.** The skill at full speed, then its result by second two, with a line of block text that says the premise for a viewer with the sound off. No face, no title, no narration first | The owner: "no one is going to stay and listen, throw the main thing at the start" |
| 4 | **The hook asks, the last scene answers.** Somebody asks how; the rewind cuts off the answer; the answer is "Training." | Ours |
| 5 | **He never finds it funny.** The narrator is as serious as a sports documentary. The skill is small and the dedication is far too big | The meme |
| 6 | **HUS is breath.** One HUS for one move of the skill, said by him, out of breath. **Every time the skill is done on screen, the chant is there** (the owner, 2026-11-18: on Dad, on every head in the shop, and a montage of nothing else) | The meme, and the owner |
| 7 | **The friends need the skill**, for the party itself. The reunion is not a coincidence | Ours |
| 8 | **The last sound is the chant**, so the film loops into its own first frame | Ours |

## The seven scenes

This is the owner-origin party / job / reunion example, not a fixed beat sheet for every Recreation story. Keep the current numerical, caption and voice-gap rules below, and use the approved reference for how to show the action.

| | Scene | Seconds | What it must do |
|---|---|---|---|
| 1 | The hook | 0–5 | The skill, the result, "HOW?!", the rewind |
| 2 | Every night was a party | 5–16 | The party across the street; two friends at his door, in capitals; he does not go |
| 3 | The dream | 16–25 | He sees it done on television and picks up the tool |
| 4 | The first failure | 25–40 | On somebody who did not ask. His own catchphrase. The narrator says how bad it was, with a fact |
| 5 | The training | 40–68 | Slow, then the chant; four or more failures; the caption WHILE THEY'RE OUT PARTYING BTW once; time passing; the first victim trusts him again |
| 6 | The job | 68–86 | The busiest place in town on its worst day; he is calm; a run of fast cuts; the boss drops something |
| 7 | The reunion | 86–110 | The friends need him; the hook again; "Training."; a second of silence; the chant; he still does not go |

## What changes from the base rules

| | Base (`AGENTS.md`) | This topic |
|---|---|---|
| Length | 20 seconds | 75–120 seconds. The first film was 97 s; the owner asked for the voice 1.1 times faster and the waits out, and the second cut is 80 s |
| Clock | Typed seconds | The recorded voices (`docs/STORY-FILMS.md`): `narration.md` → clips → `timing.json` |
| Voices | One | **Three people, one actor, for now.** The narrator and the main character are the same person and the same voice (`voice-03`). The two friends should each have a voice of their own; in the first film only `voice-03` could be recorded, so both friends are `voice-03` shifted in pitch (+3 and −3.5 semitones, `takes.json`). Register two more voices with the owner and re-record the friends when he is there to choose them. One `# clip` per change of speaker. The recording tool allows about ten calls a turn, so each voice is recorded as a few long takes and cut into its clips by `scripts/split-takes.py` (`takes.json` says where; the chant's speed is set there too) |
| Words | Over every shot | Over most of the film. Action with no words is held open with `wait` on the next clip and cut into pictures with `cut:`. **No stretch without a voice runs over 1.9 seconds** (the owner on the first film, 2026-11-18: "remove pretty long pauses"), and most are under 1 |
| One picture | 1.5–4 s | **Never over 3 seconds**; under 1 second in the fast runs |
| Text on screen | None | Captions for every spoken word, and block text built in the scene (`PixelText`) for signs and for the two meme lines |
| Music | One written mood | A mood for each turn of the story, written by `scripts/sound.py`. Two were written for this topic: `party` for the house across the street, `grind` for the chant, the training and the job. No music under "Training." and none under the rewind. One `snip` for every HUS; `rewind`, `clippers` and `hair` are in the effect list too |
| Shaders | Off | On: `post: { shaders: true }` (the owner, 2026-11-17, for every new film) |

## Work order

1. Pitch the idea in the owner's layout (title, target duration, theme, seven scenes). Write the selected script for approval before recording or building anything.
2. `npm run new -- "<Title>" --topic recreation` ([`SCRIPT.md`](SCRIPT.md) and [`SHOTS.md`](SHOTS.md), which it names, are the short forms of this page)
3. `narration.md`, the voices, `scripts/narration.py build <film> --tempo 1.3`
4. `kit.tsx` (people, things), `world.tsx` (places), one scene file per scene.
5. Stills of every picture, on contact sheets. Fix. Again.
6. `sound.json`, `scripts/sound.py build <film>`
7. `scripts/storyboard.py <film>`, `npm run check`, `REVIEW.md`
8. Render, look at frames of the mp4, merge.

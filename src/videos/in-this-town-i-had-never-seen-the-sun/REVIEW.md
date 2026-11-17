# Review against the master prompt: In This Town, I Had Never Seen the Sun

Reviewed 2026-11-17 against `Topics/InThisTown/MASTERPROMPT.md`. This file is the eleven things its section 6 asks
for; where one of them already lives in another file, it points there.

| # | Asked for | Where |
|---|---|---|
| 1 | Title | **In This Town, I Had Never Seen the Sun** |
| 2 | Premise, one sentence | A zombie kid who has never seen the sun walks out under a found helmet, is caught in a pond at noon when it breaks, and is let out by the rain his grandpa always called the good weather. |
| 3 | Three hooks and the one chosen | `narration.md`, "Three hooks, and the one chosen" (hook C) |
| 4 | Complete narration | `narration.md` (72 lines, 587 words, five clips) |
| 5 | Timestamped storyboard | `STORYBOARD.md` (written from the film's own files by `scripts/storyboard.py`) |
| 6 | Characters and assets | `STORYBOARD.md`, last sections; built in `kit.tsx` and `world.tsx` |
| 7 | Caption track | The narration itself, one word at a time: `timing.json` → `words` |
| 8 | Sound plan | `sound.json` (278 entries, each with its reason; 26 music sections on the owner's track; 29 beds) |
| 9 | Rendered video | `renders/in-this-town-i-had-never-seen-the-sun.mp4` (1080x1920, 30 fps, 2:14) |
| 10 | Self-review | Below |
| 11 | Remaining weaknesses | Below |

## The concept (stage 1)

| | |
|---|---|
| Main character | A zombie kid with a yellow scarf, who tells it afterwards |
| Audience | Minecraft players 8–16: every one of them has watched a zombie burn at sunrise, and seen one in a helmet that did not |
| Conflict | He wants to see the sun once. The sun sets him on fire, and the town's rule is not to look |
| Appeal | The first film of the series told by the monster. One minute of blue, then a cut to full colour |
| Unexpected development | The hat has a clock on it that nobody told him about. And the day town has the same rule about the night |
| Payoff | The rain lets him out of the pond: the "good weather" grandpa was laughed at for. The two kids meet when the sky is pink |

## The shaders

This is the first In This Town film built with `post: { shaders: true }` (the owner, 2026-11-17: "use the shaders …
from now on, so that the videos get good shader quality"). `Topics/Stories/` has no shader code of its own: the chain
is the engine's (`src/engine/shaders.tsx`, explained in `Topics/Shared/SHADERS.md`), and that is what is switched on.
It gives the painted sky with a sun in it, bloom, tone mapping and the grade. The template of the topic now has the
line, and `Topics/InThisTown/PACK.md` ("With the shaders on") has what it changed for staging.

Two things were added to shared code, both additive, so no finished film changes: the look `overworld-rain` in
`src/engine/Look.tsx` (grey rain by day), and `headwear` on `Zombie` in `Topics/InThisTown/monsters.tsx`.

## Self-review (stage 6)

| Question | Answer |
|---|---|
| Do the first three seconds create curiosity? | Yes. In the first half second: a dark room, a blade of gold light through a door, a zombie kid putting a finger in it, and smoke. By 3 s: grown-ups in blindfolds. |
| Is the premise understandable at once? | Yes: it is the title line, and the picture shows the wish and its price while it is said. |
| Does every scene contribute? | Yes. The line under the door, grandpa's rain, the rule and "they did not say for how long" are all paid off. |
| Is the middle engaging? | The cut to colour is at 40%. From 49% to 64% a bar hangs over his head and only goes down. The hat breaks at 64%. |
| Does it get more interesting? | A wish → a failure → a hat → a day → a clock → the pond → the rain → the other town's rule. |
| Characters consistent? | Kid: yellow scarf, soot after the fire. Grandpa: purple shirt, white beard, the same shirt when young. Villager kid: red robe, and the bone from 6.bread to 9.sub. |
| Captions accurate? | They are the narration's own words, timed by the aligner. |
| Narration intelligible? | Measured only: the voice is 13.0 dB over everything else (worst half second 4.6 dB). **Nobody has listened.** |
| Does the ending deliver on the opening? | Yes: "I wanted to see it. Just once." ends as "He showed me the sun. I showed him the moon." |
| Filler? | None found. 2:14, median shot 1.90 s. |
| Works alone? | Yes. The last line hooks a second part (his dad followed him) without needing it. |

## What the review passes changed

- **Pass 1, on 28 stills of the first scene:** a lamp bloomed to a white blob; two "pink sky" shots read as plain day
  and were rebuilt on the night look with a pink side light; a three-word bubble could not be read.
- **Pass 2, on 72 stills:** every bubble was switched to the dark one (the white one blooms, and its letters close up).
  The wear bar was made smaller and given a frame. Rain was given its own grey look. About 30 shots were reframed:
  the kid was out of frame in his own bed, both kids were cut by the edges in the two-shots, the pond shot had
  neither of them in it, the sun was outside the frame in "there it was", and the last hook showed only a back.
- **Pass 3 and 4, on 18 stills:** a flower in front of the lens, the scream bubble behind his head, a doorway bloomed
  to white, two heads below the frame.

## Remaining weaknesses

- **The sound has been measured and never listened to.** There is no rain sound in the tool: rain here is a small
  fire's crackle pitched up, with single drops over it. It may not sound like rain.
- **The owner did not review the script** (he said "yes go" to the idea, and "keep going" after the first film).
- The title is close to the earlier *Nobody Looked at the Moon*. The other title considered was *In This Town, We
  Went to Bed at Sunrise*.
- `2.bad` and `8.dark` are the same board on purpose (sun crossed out, moon crossed out), and `8.same` shows it a
  third time. The moon on the board is a pale square and is weaker than the sun.
- `2.floor` is dark: a shape on the floor and a line of gold.
- `1.bed` and `3.that`: he is small in the frame, in the corner where the bed is.
- `9.dad`: his dad is a dark slab down one side of the frame. It reads as "someone is behind them", not as his dad
  until the next shot.
- `9.grandpa` is as dark as a dusk, though it is said to be day.
- `6.town`: the two heads behind the hay are in the bottom tenth of the frame.

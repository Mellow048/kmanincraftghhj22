# Reference: "In This Town, Every Kid Got an Iron Golem" (part 1)

**The owner on the finished film, 2026-11-15: "pretty nice", then "this is a good short", and he asked for it to be
kept here: "souce code + mp4 put it in there for other agents to see how to make a good short".**

It took six renders. He liked the third ("i like this one but change the story a bit"), called the fourth worse ("it
got worse ngl"), the fifth too slow, and approved the sixth. **What changed between the one he rejected and the one he
approved is the most useful thing on this page**: see "Pace" and "The reason, in full sentences" below.

| File | What it is |
|---|---|
| `in-this-town-every-kid-got-an-iron-golem.mp4` | **The film as delivered**: 720×1280, 2:13, full sound. A copy of `renders/in-this-town-every-kid-got-an-iron-golem.mp4` |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of the mp4 for each of its 61 shots. An agent cannot watch a video: **read this first** |
| `shot-log.md` | Every shot: when it starts, how long it holds, the words, the place, the camera, and why this picture |
| `source/` | A **snapshot** of the source: `narration.md` (with the history of all three drafts), `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene14.tsx`, `film.tsx`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-every-kid-got-an-iron-golem/`. Its recorded clips are in
`public/audio/in-this-town-every-kid-got-an-iron-golem/raw/`.

## The story, and whose it is

He had no outline ("give me idea, i dunno what to say ngl"). He turned down five ideas that were one odd thing
happening to one kid, and chose from six shaped like the other films: **a rule for the whole town, and the teller is
the one it went wrong for.** "Every kid got an iron golem at ten. Mine was made of snow." After the third render he
added the back story himself, to close a plot hole: the gate lights once a year, piglins come out, the golems throw
them back; the year the teller turns ten, it is not piglins.

## What it is good for

- **Pace.** 234 words a minute (the voice at x1.47) with a quarter to three quarters of a second of silence before
  each new step of the story. He rejected 249 with no air ("too fast no time to digest even half a second") and then
  220 with up to a second of air ("u turned it down too much"). The silences are `# clip <name> wait <seconds>` in
  `source/narration.md`: the longest sit before the gate lights (0.5), before the first snowball (0.6) and before
  "Then it was quiet" (0.7). **To make room for the pauses the film moved up a cut** (`cut: "middle"` in `film.tsx`,
  2:13) instead of being squeezed into the short cut by speed.
- **The reason, in full sentences.** Beat 2 opens with five lines that carry their own "why", one shot each
  (`scene2.tsx`, `2.why` to `2.need`): there is a gate; once a year it lights and piglins come out to attack; so we
  needed our golems to defeat them; and throw them back in; that is why every kid got a golem at ten. The draft he
  rejected said the same thing in three fragments ("Piglins came out. The golems threw them back in."), and he could
  not follow it. The fourth line is close to his own words.
- **The turn is the usual thing going wrong.** Beat 8 first shows the year going as every year goes (the gate lights
  on time, twenty golems march up, the town cheers), and only then "But this time, it was not piglins". The thing
  that comes out is never named.
- **One prop that pays off.** The umbrella is a joke in beat 3 (he walks behind his golem with it all summer) and the
  only thing he has in beat 11. `HeldUmbrella` in `kit.tsx`; shut, it is carried upright by the leg.
- **A character that gets smaller.** `SnowGolem` takes a size; in beat 11 every hit takes him down ("Up to my chin.
  Then my belt."), and the camera drops with him.
- **Clips cut at their pauses.** The seven recorded clips were cut into twelve at the middle of their own pauses, so
  waits could go between story steps without recording again. Only the new opening was recorded (`02-why`). A whole
  beat in one clip cannot be given air later: **record one clip for each step of the story from the start.**
- **A film-only monster.** `Piglin` and `FireMob` live in this film's `kit.tsx`, not in the pack.

## Shape

61 shots, 516 words, 2:12.7 (132.7 s), 234 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Hook | 0:00.0 | 3.5 | 16 | 2 |
| 2 | The rule | 0:03.5 | 23.6 | 91 | 9 |
| 3 | Theirs and mine | 0:27.1 | 15.4 | 61 | 9 |
| 4 | A house, a bucket | 0:42.5 | 3.0 | 13 | 2 |
| 5 | The strength contest | 0:45.5 | 12.6 | 55 | 6 |
| 6 | A real golem | 0:58.1 | 6.5 | 28 | 3 |
| 7 | Facing the gate | 1:04.6 | 5.7 | 21 | 2 |
| 8 | The gate lit up | 1:10.2 | 9.2 | 36 | 4 |
| 9 | Twenty, twelve, five | 1:19.4 | 11.8 | 43 | 6 |
| 10 | One snowball | 1:31.2 | 7.5 | 29 | 4 |
| 11 | Fire melts snow | 1:38.7 | 19.5 | 71 | 7 |
| 12 | A pumpkin and a puddle | 1:58.2 | 5.6 | 22 | 3 |
| 13 | Something cold | 2:03.8 | 6.7 | 24 | 3 |
| 14 | Part two | 2:10.5 | 2.2 | 6 | 1 |

- Shots: the median holds 2.23 s, the shortest 0.93 s, the longest 3.50 s. About 8.5 words to a picture.
- Camera: 49 `cam.push`, 7 `cam.pan`, 2 `cam.orbit`, 2 `cam.truck`, 1 `cam.top`.
- Places: village 57 shots, room 4.

Beat 2 is long for this topic (23.6 s, 91 words): it holds the reason for the rule as well as the rule. He asked for
that.

## Sound, measured

284 effects (128 a minute, 41 kinds), the longest stretch with none 2.4 s. Music 18.0 dB under the voice, 3.6 s of
the film without music. The voice is 13.3 dB over everything else (median; the worst half second 4.2 dB, at "They all
turned on him at once"). −15.2 LUFS, true peak −1.2 dB.

## What went wrong on the way

- **One clip was recorded 16 dB quieter than the rest**, the last line, and he heard it ("the ending why did the tts
  get weaker in volume"). The build sets the peak of the whole voice track and does not level one clip against
  another. **Measure the speech level of every recorded clip before building; keep them within about 1 dB.**
- **Length bought with speed.** The fourth render fitted three new lines into the short cut by speeding the voice up.
  He called it worse than the one before.
- **An effect on the last spoken words covers them** (`ding`, `chime`, `sting`): `sound.py build` fails. Put it after
  the word (`at` 0.25 to 0.45) and turn it down.
- **Every re-timing buries a few effects** under the music ("cannot be heard" fails `npm run check`). Raise each by
  its shortfall plus about 2 dB.
- **A camera pitched down from a low aim point goes under the ground**: keep `on.y − dist × sin(pitch)` above 0.3.
- **A low close shot must cut a person at the waist, not through the face**; a sad face seen from below reads as big
  black brows (use `"frown"`).
- **A fight shot in front of a lit gate** washed the far figures pink and stacked them on each other. The fight was
  moved a block away from the gate and cut down to three bodies: a golem, the piglin it lifts, the piglin that runs.

## What nobody has checked

No agent has listened to the mix: every number above was measured, not heard. The owner has heard and seen the
finished film. Two weak spots he did not name: the first second of `13.gate` is dark, and in `13.snow` the caption
crosses the pumpkin.

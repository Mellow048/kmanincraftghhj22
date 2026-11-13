# Reference: "In This Town, Nobody Looked at the Moon"

**A film at night, and a remake.** The short cut: 14 beats, 63 shots, 471 words, 1:51.7. A kid in a village that lives
by night and never looks up sneaks a look at the moon in the water of the well, and learns that the moon is an eye,
and that every second it spends looking at him, the scarecrows walk.

What the owner said, in the order he said it:

| When | His words |
|---|---|
| On the 20-second film this one replaces | "it wasnt really what i wanted … maybe put it in a village where you woke up with the moon and stuff" |
| On the script, 2026-11-11 | "yes go i trust you on making it" |
| On the stills, one for each shot, before the film was rendered | "i already saw the jpg storyboard u made and im looking forward to it!" |
| On the finished film, 2026-11-13 | "every single one u made is good" |

He asked for its source and its mp4 to be kept here, "so that other agents know how to make a good short".

## Where everything is

| File | What it is |
|---|---|
| `in-this-town-nobody-looked-at-the-moon.mp4` | The film as delivered: 720×1280, 1:52, with its sound. A copy of `renders/in-this-town-nobody-looked-at-the-moon.mp4`. The 1080×1920 master is the asset of release `render-24` |
| `contact-sheet-one-frame-per-shot.jpg` | One frame of that file for each of the 63 shots, with its number, its cue and its time. **Read this first** |
| [`shot-log.md`](shot-log.md) | Every shot: when, how long, the words, the place, the camera, and why this picture |
| `source/narration.md` | The script. The premise in four sentences, what is planted and where it pays off, what was put to the owner with the draft, and where each line of the 20-second version went |
| `source/scene1.tsx` … `scene14.tsx` | The shots, one file for each beat |
| `source/kit.tsx` | The teller and his hat, the map of places, and `skyAt()`: the one function that says where the moon is and what it is looking at in every shot |
| `source/world.tsx` | The town at night, the wheat round it, the forest behind the wheat |
| `source/sound.json` | The sound sheet: 14 music sections, each with the reason for it, 9 beds, 237 effects |
| `source/film.tsx`, `timing.json`, `sound.lock.json` | The film's definition, the voice measured word by word, and the numbers of the mix |

`source/` is a snapshot to read: it is not compiled and nothing imports it. The film that renders lives in
`src/videos/in-this-town-nobody-looked-at-the-moon/`. The voice and the mix are in
`public/audio/in-this-town-nobody-looked-at-the-moon/`.

## What to open it for

- **A film at night.** The look is `lantern-night`: the night is nearly black, the town is lit warm by its own
  lanterns, and the moonlight is cold and lies on **one place at a time**. It starts on the wheat, comes into town
  when the moon finds him, and goes back. The parts are in the pack (`fields.tsx`, and the lanterns, hat, bucket,
  well lid and fence); the catalogue is [`../../PACK.md`](../../PACK.md), "Fields and night", with a sheet of them
  in [`../../pack-night.jpg`](../../pack-night.jpg).
- **One place that directs the whole world.** In this story the world changes from shot to shot: where the moon
  is, whether it is an eye yet, what it stares at, which doors are open, how far the lid has been pushed, how near
  the scarecrows have come. `skyAt(cue, t)` in `source/kit.tsx` answers all of that for any moment of the film, the
  world draws it, and **the scenes stage only people**. No shot sets the moon by hand, so no two shots disagree.
- **A remake.** [`../moon-20-seconds/`](../moon-20-seconds/README.md) is the same idea in 19.6 seconds, and the
  owner did not want it. All six of its lines are still in this film. What is new is what twenty seconds had no
  room for: the town, the tour, the reason for the rule, and what breaking it costs.
- **How a script is put to the owner.** `source/narration.md` opens with the premise in four sentences, one
  sentence for the whole film, the table of what is planted, and the questions he was asked with the draft.
  Nothing was built before he answered.
- **Things planted in the picture and never said.** In each wide shot of the fields one scarecrow stands a little
  nearer than in the one before, and the iron golem walks its rounds between the town and the wheat. Nobody
  mentions either until the end.
- **A dense sound sheet.** 127 effects a minute, the most of any film here, and still every word clear. What had
  to be cut for that is listed below.

## Its shape, measured

63 shots, 471 words, 1:51.7 (111.7 s), 254 words a minute. The same cut as Same Face, and nearly the same shape.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Hook | 0:00.0 | 3.6 | 17 | 2 |
| 2 | Three things nobody knew | 0:03.6 | 6.1 | 25 | 3 |
| 3 | The tour | 0:09.7 | 16.0 | 68 | 9 |
| 4 | The itch | 0:25.7 | 2.9 | 14 | 2 |
| 5 | The bell ringer | 0:28.6 | 7.6 | 30 | 4 |
| 6 | The decision | 0:36.2 | 3.2 | 13 | 2 |
| 7 | The hat and the bucket | 0:39.4 | 8.0 | 34 | 5 |
| 8 | The lid | 0:47.4 | 8.3 | 34 | 4 |
| 9 | The friend | 0:55.7 | 4.8 | 22 | 3 |
| 10 | The edge | 1:00.5 | 9.4 | 33 | 6 |
| 11 | The eye | 1:09.9 | 14.8 | 61 | 8 |
| 12 | The wait | 1:24.7 | 5.2 | 24 | 3 |
| 13 | The reveal | 1:29.8 | 14.1 | 67 | 8 |
| 14 | The button | 1:43.9 | 7.8 | 29 | 4 |

- **In thirds:** the world and the question (beats 1–6) take 35% of the film, the attempts and the friend (7–9)
  19%, the act and the answer (10–14) 46%. Same Face is 36, 19 and 44.
- **Shots:** the median holds 1.73 s, the shortest 0.77 s, the longest 3.23 s. 7 are under a second and 2 are
  over three. About 7.5 words to a picture.
- **Camera:** 53 of the 63 shots are a `cam.push`; the rest are 4 trucks, 3 shots from straight above (`cam.top`)
  and 3 pans. Every shot moves.
- **Places:** 58 shots name the zone `village`, which draws the fields round the town as well. 5 name `fields`: out
  in the wheat, with the town left out.

## Its sound, measured

Built by `scripts/sound.py` from `source/sound.json`. The agent that made it could not listen; these are the numbers
of the mix in the film the owner then approved.

| | |
|---|---|
| Music | 14 sections, two of them silence: `town` → `curious` → `playful` → `sneak` → `curious` → `tense` → `none` → `dark` → `hope` → `none` → `dark` → `sad` → `drone` → `dark`. Each has a `why` in the sheet |
| Music under the voice | 18.9 dB. 6.6 s of the film has no music: when he first sees the moon in the water, and when the wheat behind him goes dark |
| The air of each place | 9 beds, 24.6 dB under the voice |
| Sound effects | 237, of 34 kinds: 127 a minute. The longest stretch without one is 1.8 s |
| The voice over everything else | 12.7 dB on the median; 4.0 dB in the worst half second (the limit is 3) |
| The file | −14.9 LUFS, true peak −1.3 dB |
| The delivered mp4 | Its sound sits 0.0 ms from `mix.mp3`. −15.0 LUFS, true peak −1.2 dB |

## What was hard: the picture

The seven lessons are in [`../../PACK.md`](../../PACK.md), "A film at night". Three of them, each found on a still
and on nothing else:

- **A face needs a lamp on the camera's side.** Looking down a lit street, every lamp is behind the person and the
  face is a black square. Stand a `Lantern` with a real `light`, low, just beside the lens.
- **A hat as wide as a door hides the face from above.** Put the lens under the chin and look up. That is also why
  nobody in this town sees the moon, so the film uses it.
- **Anything on the line from the lens to the moon covers the moon:** a roof, a line of lanterns, a head.

And two about the work:

- **Every shot was looked at as a still, and many were shot again,** before the film was rendered. The type check
  and `npm run check` pass on a black face and on a moon behind a roof. Only a picture shows them.
- **Every finished film was proved unchanged.** This film added parts to the pack, and to the engine a look
  (`lantern-night`), two clips (`leanOver`, `push`) and a place on the head for a hat (`head`). Stills of the other
  finished films before and after are the same pixel for pixel (`scripts/compare-stills.py`). Old defaults were
  kept: a new prop that is not given changes nothing.

## What was hard: the sound

The sheet took four rounds to pass the limits. What failed, and what fixed it:

- **The last word of a sentence is quiet:** 9–13 dB under the voice's own level ("one.", "there.", "to look.",
  "night."). An effect or a fill of the music that lands on it covers it. Put the effect on a loud word early in
  the line (`word`), not on the end of it.
- **A `sting` hangs** for over a second at nearly full level. Under the next line it covers the words. Shorten it
  with `dur`, or use it where a pause follows. A `boom` drops 10 dB every quarter second and is not the problem.
- **Effects inside the same quarter second bury each other.** Three doors shut on three `hit`s, and only the first
  could be heard. Use one, on the loud word.
- **Turning an effect down to save the words can bury the effect**, which fails the other limit. Cut it.
- **When a quiet line end still fails with the effects gone, the music is what is left.** Lower that one section's
  `gain` (−4.5 dB on `12.walk`), not the whole film's.
- **The `town` mood has loud fills.** They landed on the ends of sentences, so that section runs 2 dB down.
- **An effect placed by guess misses the picture.** The scene already hangs the action on a word with `wordAt`.
  Read the scene, and give the effect the same cue and word.
- **Read `out/sound/<film>/effects.txt`,** not the timeline picture. It lists every effect and how far it stands
  over what plays under it.

What was cut or turned down to pass. If a moment of this film sounds thin, look here first:

| | |
|---|---|
| Removed | The `sting` on `12.walk`. The `swish` on `3.eyes`. The `rustle` on `3.golem`. Two of the three `hit`s on `11.light` (the doors). Two of the three steps on `13.never` |
| Turned down | The wind bed from `12.dark` to `13.awake`, −3 dB. `13.never` `creak` −2, cut to 0.3 s. `3.golem` `clank` −1. `6.decide` `rustle` −3. `7.tip` `riser` −8. `7.knock` `clank` −1. `11.eye` `sting` −1. `11.light` `whoosh_low` −2, `sparkle` −1, `step_stone` −3 |
| Faint, and left in | 13 effects stand less than 3 dB over what plays under them. The weakest: the `heartbeat` at 1:09.1 (`10.lean`), a `step_stone` at 1:24.1 (`11.light`), a `swish` at 0:52.5 (`8.nobody`) |

Three sounds were added to `scripts/sound.py` for this film, and any film may use them: `blink`, `creak` and
`step_stick`.

## How to use it

- **Build like it** when the story plays at night, or when the world itself changes from shot to shot.
- **Use its parts.** They are in the pack. Do not rebuild a scarecrow or a lantern.
- **Never retell it.** No moon that is an eye, no rule about looking up, no well lid, no scarecrows that walk when
  nobody watches, no "one blink at a time" in another film. A new film borrows the shape and nothing else.
- **It does not change.** If you touch the engine or the pack, prove with `scripts/compare-stills.py` that every
  still of this film is the same as before.

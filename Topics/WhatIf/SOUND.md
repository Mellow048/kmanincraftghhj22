# The sound of a "What if" film

> **Provisional.** The limits in `topic.json` (`sound`) are In This Town's, unchanged, until a "What if"
> reference is measured.

A "What if" film is never voice only. Under the voice there is music that changes with the story, the air of each
place, and a sound for each thing that happens.

**The tool, the sheet, the method and the limits are In This Town's.** Read
[`../InThisTown/SOUND.md`](../InThisTown/SOUND.md) first: how `scripts/sound.py` works, how a `sound.json` is
written shot by shot, how levels are set against the voice, and why an agent has to say that the sound was
measured and never heard. This page is only what a story about a power adds.

```bash
python3 scripts/sound.py list            # every mood, bed and effect
python3 scripts/sound.py draft <film>    # a first sound.json: a bed for each zone, the `wonder` mood, a whoosh on each new place
python3 scripts/sound.py build <film>    # sound.json + narration.mp3 → public/audio/<film>/mix.mp3, and a report to read
```

## Music: one mood for each part of the story

| Script beats ([`SCRIPT.md`](SCRIPT.md)) | What is happening | Mood |
|---|---|---|
| 1–4: the question, the day it came, the rule, the fun | A power is new, and it is wonderful | **`wonder`**: bright notes running up, bubbling, weightless |
| 5–6: the wish, the plant | A question he wants answered, and a thing that does not fit | `curious` |
| 7: the first try fails | It is funny | `playful` |
| 8–9: the second try, the friend | It works, and something is a little wrong | `sneak` if it is secret; `curious` again if it is not |
| 10: the edge | The last steps. It grows the whole way | `tense` |
| 11–12: the act, the wait | He thinks it worked. The music believes him: it is as wrong as he is | `hope` |
| The second before the reveal | Nothing, and a `riser` through it | `none` |
| 13: the reveal | The truth. Bad: `dark`. Only sad: `sad` | `dark` or `sad` |
| 14: the button | Stay where you are. Never turn cheerful for the subscribe line | the same |

`wonder` was written for this topic. It is the sound of the fun, so it must stop when the fun does: the first bar
of `curious` at beat 5 is the story saying "but".

## Effects: the sounds of a power

These were added for this topic. `python3 scripts/sound.py list` has all of them, with the story sounds.

| On screen | Effect |
|---|---|
| The power switches on: an `Aura` lights, a `Swirl` climbs | `power_up` |
| The power goes out, or fails | `power_down` |
| The world skips: an `Echo` appears, a moment is seen before it happens | `glitch` |
| A sign pops over a head (`Overhead`) | `pop`. The one that matters: `ding` |
| A `Countdown` | `tick` on each number (`"repeat"`, `"every"`: the countdown's own `every`), and a `ding` or a `buzz` on zero |
| Speed (`Streaks`) | `whoosh` or `zip`, centred on the pass |
| A `Beam` | `sparkle` as it grows |
| The lesson starts, the lesson ends, time is up | `school_bell` |
| Wrong; caught; "no" | `buzz` |
| Into the water | `splash` |
| Feet in a school | `step_wood` in a classroom, `step_stone` in the hall |
| The reveal | `boom`. Once in a film, twice at most |

**Give the power its own sound, and keep it**, the way it has its own look ([`SHOTS.md`](SHOTS.md) §1). If a heart
pops with a `pop` the first time, every heart pops with that `pop`, at that `pitch`. After ten seconds the viewer
hears the power before they see it, and at the reveal the same sound means something else.

## Beds

`draft` chooses a bed from each shot's zone (`bedForZone` in `topic.json`).

| Bed | Where |
|---|---|
| `classroom` | The classroom and the hall: a room full of kids keeping quiet. Paper, a pencil, a chair that creaks |
| `pool` | An indoor pool: water lapping, and every drip with an echo |
| `room` | His room at home |
| `village`, `wind`, `night` | A street or a yard; a roof; anywhere after dark |

## Before the film is handed over

- `python3 scripts/sound.py build <film>` ends with "OK by the numbers", and `npm run check` passes.
- You have read the report: the worst half seconds for the words, and `out/sound/<film>/effects.txt`.
- You say, in plain words, that the sound was **measured and never listened to**, and you ask the owner to listen
  once on a phone speaker.

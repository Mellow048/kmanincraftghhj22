# The sound of an explainer

> **Provisional.** The limits in `topic.json` (`sound`) are a first setting until a reference is measured.

An explainer is never voice only. Under the voice there is music that changes as the explanation moves, the air of
the place, and a sound for each thing that appears, grows, pays or breaks.

**The tool, the sheet and the method are the same as for every narrated film.** Read
[`Topics/InThisTown/SOUND.md`](../InThisTown/SOUND.md) first: it says how `scripts/sound.py` works, how a
`sound.json` is written, how levels are set against the voice, and why an agent has to say that the sound was
measured and never heard. This page is only what is different here.

```bash
python3 scripts/sound.py list            # every mood, bed and effect
python3 scripts/sound.py draft <film>    # a first sound.json: the `sky` bed, the `explain` mood, a whoosh on each new beat
python3 scripts/sound.py build <film>    # sound.json + narration.mp3 → public/audio/<film>/mix.mp3, and a report to read
```

## What differs from a story film

| | A story film (In This Town) | An explainer |
|---|---|---|
| Music sections | At least 5 | At least 3 (`minMusicSections`). A film is under a minute |
| Silence | Up to 8 s: a held breath before the reveal | Up to 4 s. An explanation has no reveal to hold a breath for |
| A whoosh | On a cut to a new place | **On a flight.** The camera does not cut, so the whoosh is the journey: centre it on the first half second of the line, and make it as long as the flight (`"dur"`) |
| An effect belongs to | What happens in the shot | What happens **on the word**: the tag pops on "price", so the `pop` is on `"word": "price"` |
| Effects a minute | At least 40 | The same |

## Music: one mood for each part of the explanation

| Beats ([`SCRIPT.md`](SCRIPT.md)) | What is happening | Mood |
|---|---|---|
| 1–3: the question, the thing you know, it was not always so | Something ordinary, and a question about it | `curious`, or `town` if the film opens busy |
| 4: the cause, step by step | Facts, one after another | **`explain`**: a steady light step, soft chords, a two-note question that keeps being asked |
| 5: the part you did not know | It turns | `tense` if it is bad news, `playful` if it is absurd |
| 6: the answer | Now it makes sense | `hope` |
| 7: you, and the subscribe line | Stay in the mood of the answer. Never a new tune for the last three seconds | the same |

Change the music on the line where the explanation changes direction, not on a round number of seconds.

## Effects: the sounds of money and of numbers

These were added for this topic. `python3 scripts/sound.py list` has all of them, with the story sounds.

| On screen | Effect |
|---|---|
| A coin put down, counted, flipped | `coin` (`"pitch"` 0.8–1.3; a count going up: `"repeat"` with `"pitchStep": 1.06`) |
| A handful of coins: a payment, a pile | `coins` (`"dur"`) |
| A sale, a price paid | `register` |
| A banknote off a pile, a tag flipped over | `paper` |
| The printer printing | `paper`, `"repeat"` at the rate the notes come out (read it from the exhibit: `out={t * 3}` is three a second) |
| A number running up: a price rising, a bar growing | `count` (`"dur"`: as long as the bar takes to grow) |
| A price fixed, a rule made, the answer given | `stamp` |
| Wrong, not enough, "no" | `buzz` |
| A tag, a figure or an icon popping in | `pop`. The right answer: `ding` |
| An arrow growing up; growing down | `slide_up`; `slide_down` |
| The scales tipping; a chest opening | `creak`, then `thud` as the pan lands |
| A flight between islands | `whoosh` (`"dur"` 0.6–1.2), or `gust` for a long climb |
| Something heavy arriving | `thud`, `stomp` |

The rules of the story films still hold: one sound for each kind of thing, and keep it; put it on the word;
quiet beats loud; nothing goes six seconds without an effect.

## Beds

| Bed | Where |
|---|---|
| `sky` | **The default here**: the open sky between islands. A wide soft air, and a bird a long way off |
| `village` | An island with a street or a market on it |
| `room`, `cave` | Inside the bank, down the mine: wherever a declared cut goes indoors |

## Before the film is handed over

- `python3 scripts/sound.py build <film>` ends with "OK by the numbers", and `npm run check` passes.
- You have read the report: the worst half seconds for the words, and `out/sound/<film>/effects.txt`.
- You say, in plain words, that the sound was **measured and never listened to**, and you ask the owner to listen
  once on a phone speaker.

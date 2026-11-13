# The sound of an "In This Town" film

A film of this topic is never voice only. Under the voice there is **music that changes when the story does**, the
**air of the place** the shot is in, and a **sound effect for each thing that happens on screen**: about eighty a
minute in the reference film.

All of it is made in Python by `scripts/sound.py`. Nothing is downloaded, sampled or licensed: every note and every
noise is computed from a seed, so the same sheet always gives the same track.

The reference is the sheet of the topic's reference film, `src/videos/in-this-town-same-face/sound.json`. Read it next to the film's `narration.md` before you
write a sheet of your own: 11 music sections (one of them silence), 14 beds, 141 effects of 35 kinds, in 1:45.

## 1. When, and with what

Sound is the **last** step, after the voice is recorded and every shot exists. An effect belongs to something the
picture does, so there is nothing to put it on before the picture is there.

```bash
python3 scripts/sound.py list            # every mood, bed and effect, one line each
python3 scripts/sound.py draft <film>    # a first sound.json: beds from the zones, a whoosh on each scene change
#   …write the sheet (sections 2–5)…
python3 scripts/sound.py build <film>    # sound.json + narration.mp3 → public/audio/<film>/mix.mp3, and a report
python3 scripts/sound.py check <film>    # measure the mix again without rebuilding it
```

Then point the film at the mix, in `film.tsx`:

```ts
audio: { src: "audio/<film>/mix.mp3" },
```

| File | What it is | Commit it? |
|---|---|---|
| `src/videos/<film>/sound.json` | **The sound sheet.** The only file you write | yes |
| `public/audio/<film>/mix.mp3` | Voice + music + beds + effects. The file the film plays | yes |
| `src/videos/<film>/sound.lock.json` | What the mix was built from, and what it measured. `npm run check` reads it | yes |
| `public/audio/<film>/narration.mp3` | The voice alone. The mix is built from it; never edit it | yes (it already is) |
| `out/sound/<film>/` | `timeline.png`, `effects.txt`, and the stems with `--stems` | no (`out/` is ignored) |

Needs Python 3.9+, `numpy`, and ffmpeg (or `pip install imageio-ffmpeg`). `pip install pillow` adds the timeline
picture. Rendering needs none of it: the mix is a committed file, and the lint only compares hashes.

**Change a word, a cut or a sound → run `build` again.** The sheet names cues and words, never seconds, so every
sound moves with the voice. `npm run check` fails a film whose mix is older than its script, its timing or its sheet.

## 2. The sheet

```json
{
  "film": "in-this-town-same-face",
  "music": {
    "gain": -16,
    "sections": [
      { "from": "1.face", "mood": "town", "why": "Hook, mysteries and tour: the town as he knew it." },
      { "from": "5.ask", "mood": "curious", "why": "He asks, and gets a rule and no reason." }
    ]
  },
  "beds": [
    { "from": "1.face", "to": "7.laugh", "bed": "village" },
    { "from": "8.night", "to": "8.night", "bed": "cave" }
  ],
  "sfx": [
    { "cue": "1.me", "sfx": "whoosh", "why": "The cut in to the one face that is different." },
    { "cue": "1.me", "word": "me", "sfx": "pop", "why": "'Except me': the hook lands." },
    { "cue": "3.nose", "word": "nose", "at": 0.6, "sfx": "swish", "why": "The camera swings round to the front." },
    { "cue": "7.golem", "at": 0.51, "sfx": "stomp", "repeat": 3, "every": 1.03, "trim": -1, "why": "The golem's footfalls." }
  ]
}
```

**When a sound plays.** The same way a scene says when a thing happens:

| Fields | The time |
|---|---|
| `"cue": "8.under"` | The cut into that shot |
| `"cue": "3.hmm", "word": "hmm"` | When that word is said in that shot. `"nth": 1` is its second time |
| `"cue": "2.hill", "p": 0.5` | Halfway through the shot (`p` runs 0 → 1) |
| any of the above, plus `"at": 0.6` | 0.6 seconds later. Negative is earlier |

**Music.** `sections` is a list of `{ from, mood, why }`. Each runs from its cue to the next section's cue, starts on
its own first beat, and fades as the next one starts. The first must start on the film's first cue. `gain` on the
music is its level under the voice (default −16); `gain` on one section moves that section up or down from there.

**Beds.** `{ from, to, bed }`: the air of a place, from the cut into `from` to the end of `to`. `trim` makes one
louder or quieter. Two beds may overlap: the `crowd` is heard over the `fire` before the crowd is seen.

**Effects.** `{ cue, sfx }` and what you need of:

| Field | What it does |
|---|---|
| `trim` | Louder or quieter than the effect's own level, in dB. **Use this one** |
| `gain` | Sets the level outright, in dB against the voice (section 5) |
| `pan` | −1 left … 1 right. Put a sound where its thing is in the frame |
| `repeat`, `every` | The same sound `repeat` times, `every` seconds apart: footsteps, digging, a heartbeat |
| `pitchStep` | With `repeat`: each one is this much higher (1.06) or lower (0.94). A count going up |
| `pitch` | 0.75 is lower, 1.3 higher. For `pop`, `blip`, `tick`, `plink` |
| `dur` | Seconds, for the sounds that stretch: the whooshes, `gust`, `zip`, `riser`, `scrape`, `rustle`, `sparkle`, `boing`, the slides, `drop`, `debris`, `crackle`, `cheer` |
| `note`, `f`, `ring` | `ding` takes a `note` (`"E6"`); `bell` and `clank` take a frequency `f` in Hz; `bell` takes `ring`, how long it rings |
| `align` | `start`, `center` or `end`: which part of the sound sits on the time. Each effect has its own default |
| `why` | One line: what in the picture makes this sound. Write it for every effect that is not a plain cut |

A whoosh is **centred** on its time, so it straddles the cut. A `riser` **ends** on its time: give it the cue of the
thing it rises into.

## 3. Music: one mood for each part of the story

The music is not a loop under the film. It changes on a cut, when the story turns, and each change says something.
The reference film has eleven sections, one of them silence; the lint wants at least five that play.

| Script beats (`SCRIPT.md`) | What is happening | Mood |
|---|---|---|
| 1–3: hook, mysteries, tour | The town as he knew it | `town` |
| 4–8: the itch, the adults, the tease, the elder, the decision | A question nobody will answer | `curious` |
| 9: the first try fails | It is funny | `playful` |
| 10–13: the second try, the price, packing, the friend | Secret work, at night | `sneak` |
| 14: the edge | The last steps. It grows the whole way | `tense` |
| 15–16: the act, the wait | He sees nothing yet | `drone` |
| …if he thinks he has found something good | The music believes him. It is as wrong as he is | `hope` |
| The second before the reveal | Nothing | `none` |
| 17: the reveal | The truth, and it is bad | `dark` |
| 17: he understands | Too late | `sad` |
| 18: the button | Stay where you are. Never turn cheerful for the subscribe line | `dark` or `sad` |

- **Change the music on the cut where the picture changes colour or place.** In the reference film the picture goes from
  daylight to smoke at `11.smoke`, and the music goes from a pulse to one low note on the same frame.
- **Silence is a sound.** `none` for the one to four seconds before the reveal, with a `riser` through it, and the
  `boom` on the reveal's first word. The lint allows eight seconds of silence in a whole film: it is one held breath,
  not a way to skip writing music.
- **The music may be wrong on purpose.** `hope` under the strangers, because he believes they are friends. That is
  what makes `dark` land.
- No mood fits? Add one to `scripts/sound.py` (section 7). Do not leave a part of the film on the wrong one.

## 4. Effects: one for each thing that happens

Go through the film shot by shot with the stills open (`npm run shots -- <film>`) and ask of every shot: **what
moves, appears, lands, breaks, or is named?** Each answer is an effect.

| On screen | Effect |
|---|---|
| A cut to a new place or time (every scene change) | `whoosh` |
| A quick cut inside a list; a head turning | `swish` |
| Something big moving: a golem's arm, a wing, a slow push on a house | `whoosh_low` |
| A speech bubble, a sign, a thing that pops into being | `pop` |
| A glance, a nod, a small thought | `blip`, `tick` |
| Something good, given or magic | `chime`, `sparkle`, `ding` |
| Feet | `step_grass`, `step_wood`, `step_stone`, and `stomp` for a giant |
| Hands at work | `dig`, `break`, `crack`, `place`, `scrape`, `debris` |
| A body landing; a fist through a floor | `thud`, `hit` |
| Cloth, sleeves, a bag | `rustle` |
| A plan failing, lightly | `bonk`, `boing`, `slide_down` |
| Hope, a jump, a lift | `slide_up`, `zip` |
| Fire | `crackle`, `fire_whoosh` (and the `fire` bed) |
| A crowd | `cheer` (and the `crowd` bed) |
| Open high ground | `gust` (and the `wind` bed) |
| Waiting for the thing | `heartbeat`, `tick`, `riser` |
| Bad news | `sting`, `drop` |
| **The reveal** | `boom`. Once in a film, twice at most |

Rules that come from building the reference film:

1. **Put the sound on the word that names the thing**, not on the cut: `"word": "nose"`, and the nose wags and
   boings together. The scene already hangs the action on that word with `wordAt`; use the same cue and word.
2. **Feet and fists follow the animation, not a guess.** Read the scene: if the legs are at full stride at 0.51 s,
   1.54 s and 2.57 s, that is `"at": 0.51, "repeat": 3, "every": 1.03`. Footsteps that miss the feet are worse than
   none.
3. **Give each kind of thing its own sound, and keep it.** In the reference film every bubble pops, every villager rustles,
   wind is the hill. The viewer learns it in ten seconds, and after that the sound alone tells them what they see.
4. **Plant a sound the way the script plants a question.** The town bell rings on the first frame, again when he
   looks back from the hill, and a third time when he understands. A crackle under "burned" in the first ten
   seconds comes back under the same house at the end. Write in `why` where a sound returns.
5. **Use the width.** `pan` a sound to the side its thing is on. Leave the middle to the voice.
6. **Nothing goes six seconds without an effect**, and the film has at least forty a minute. Both are lint
   failures. A shot with no sound in it is usually a shot where nothing moves: fix the shot.
7. **Quiet beats loud.** Most effects sit 9–12 dB under the voice. If everything is a `hit`, nothing is.

## 5. Levels: everything is measured against the voice

Every level in the sheet and in the report is in **dB against the voice while it is speaking, as a phone speaker
plays it** (almost nothing under 200 Hz, a little extra over 2 kHz).

| Level | How it sounds |
|---|---|
| 0 | As loud as the voice |
| −5 | A hard hit |
| −10 | Clear. Most effects |
| −14 | Quiet, in the background |
| under −18 | Nobody hears it |

`build` sets each effect to its level by its loudest tenth of a second, so a short tick and a long whoosh with the
same number sound equally loud. Use `trim` to move one up or down a few dB. Leave `music.gain` near −16.

What `build` reports, and what `npm run check` then holds the film to (`sound` in `topic.json`):

| Measured | Limit | If it fails |
|---|---|---|
| Music sections | at least 5 | The music is a loop. Section 3 |
| Music under the voice | 15–24 dB | Move `music.gain` |
| Film with no music | at most 8 s | Too much `none` |
| Effects | at least 40 a minute | Section 4 |
| Longest stretch with no effect | at most 6 s | The report says where it starts |
| Effects that cannot be heard under the music | none | Raise them with `trim`, or cut them |
| The voice over everything else, in any half second it speaks | at least 3 dB | The report names the cue and the sounds. Lower those, or move them off the word with `at` |
| The same, on the median | at least 10 dB | Lower `music.gain` or `sfxGain` |
| Loudness of the file | −16.5 to −13 LUFS | It is set by the tool; a failure means the voice file is wrong |
| True peak | −0.3 dB or under | The same |

`"sfxGain"` and `"bedsGain"` at the top of the sheet move every effect or every bed at once.

## 6. You cannot hear it. Say so

An agent builds this without ears. `build` therefore prints what a listener would notice, and writes two files to
read in its place:

- **The report.** The worst half seconds for the words, with the cue and the sounds playing there. Read all six.
- `out/sound/<film>/effects.txt`: every effect, when it plays, its level, and how far it stands over the music
  under it. An effect at 0 dB over the music is buried.
- `out/sound/<film>/timeline.png`: the voice, the music, the beds and the effects as four tracks against the cuts.
- `--stems` adds `voice.wav`, `music.wav`, `beds.wav` and `sfx.wav` for anyone who wants to listen to one layer.

The numbers say whether the words are covered and whether anything is lost. They cannot say whether the music is
**pleasant**, whether a boing is **funny**, or whether the bell sounds like a bell. So:

- When you hand the film over, say plainly that the sound was **measured and never listened to**, and ask the
  owner to listen once on a phone speaker.
- `python3 scripts/sound.py demo` writes `out/sound/demo/library.mp3`, every mood, bed and effect in three minutes,
  with an index. Offer it when the owner wants to choose or reject sounds.
- When the owner says a sound is wrong, fix the **sound** in `scripts/sound.py`, not one film's sheet. Every film
  gets the fix on its next build.

## 7. Adding a sound

A sound is a Python function in `scripts/sound.py` that returns samples, registered with one line:

```python
@sfx("bonk", "a hollow knock on the head: a plan failing, lightly", -9)
def _bonk(rng, **_):
    ...
```

- Computed only: `numpy`, the helpers at the top of the file, and the `rng` it is given. No files, no downloads.
- The one-line description says **when to use it**, not how it is made. It is what `list` prints.
- The number is its level against the voice (section 5). `align` is `"start"`, `"center"` or `"end"`.
- A mood is `@mood(name, about, bpm)` and a function of `(seconds, rng)`; a bed is `@bed(name, about, level)`.
- Rebuild every film that has a sheet and read each report. A changed sound changes all of them.

## 8. What went wrong while this was built

| What happened | Why | What the tool does now |
|---|---|---|
| Pure tones far too loud, low thuds missing | Levels were set by peak | Levels are set as heard, against the voice |
| The music was a dull hum | Sums of sines have nothing over 1 kHz | Struck notes get a click, there are shakers, and each section is lifted over 1 kHz |
| Thuds, stomps and the boom vanished on a phone | They lived under 200 Hz | They are pitched higher and given overtones and a knock |
| The limiter worked all the time | The mix was pushed to −14 LUFS; the voice alone is already −14.4 | The target is −14.5. Do not raise it |
| Footsteps that did not match the feet | They were spaced by guess | Read the animation (section 4, rule 2) |
| The last note cut off with the film | The final section had a 60 ms fade | It fades over half a second |

**What a dense sheet runs into.** The moon film has 127 effects a minute, and its sheet took four rounds to pass
the limits. What failed and what fixed it is on its page,
[`reference/nobody-looked-at-the-moon/`](reference/nobody-looked-at-the-moon/README.md), under "What was hard: the
sound". The short form: the last word of a sentence is 9–13 dB quieter than the rest of it, so put an effect on a
loud word early in the line; a `sting` hangs for over a second; effects inside the same quarter second bury each
other; and when a quiet line end still fails with the effects gone, lower that one music section's `gain`.

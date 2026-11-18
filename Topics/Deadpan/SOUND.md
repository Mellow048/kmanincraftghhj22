# The sound of a Deadpan film

The tool, the sheet format and the levels are the ones the whole project uses: read
[`../../docs/STORY-FILMS.md`](../../docs/STORY-FILMS.md) and the sound guide of the topic that built the tool
([`../Stories/SOUND.md`](../Stories/SOUND.md)). This page only adds what is different for a comic film.

```bash
python3 scripts/sound.py draft <film>      # writes a starting sound.json
# fill the sheet in, shot by shot
python3 scripts/sound.py build <film>      # mixes, measures, and writes mix.mp3 + the report
```

## What is different here

1. **A hit on every snap.** A Deadpan cut is a beat. Where a Stories film puts a hit on the reveal, this topic puts a
   short effect on most shots: a click, a tick, a knock, a coin, a whoosh, a zoom-in whine. The check's floor is 55
   effects a minute for this topic (Stories asks 40) because the cut rate is nearly double.
2. **The music is light and comic, and it never stops.** The Stories track (`Topics/Stories/InThisTownMusic.aac`)
   works; so does a brighter mix of the tool's own moods. What does not work is a dramatic drone: the joke reads as a
   threat and the deadpan collapses.
3. **Silence is a punchline tool.** One shot of true silence, right before the crash zoom or right before the button,
   is worth more here than in a story film. The check allows one gap of up to 6 s; spend it on purpose.
4. **The mix stays under the voice.** The narration is flat and quiet by design — it is the one calm thing in the
   film — so nothing may sit on top of it. Same limits as every film: −15 to −24 dB under the voice for music, no
   buried effects, −16.5 to −13 LUFS, true peak under −0.3 dB.
5. **A zoom has a sound.** Every crash zoom gets a short rising whine under it, every top-down cut gets a swoop. It is
   the cheapest way to make the camera grammar audible.

## The sheet, in this topic's shape

Music sections follow the beats, not the clock:

| Section | Starts | Mood | Why |
|---|---|---|---|
| 1 | hook | `playful` | The joke is already running when the film starts |
| 2 | the rule | `curious` | A half-step of mystery under a plain sentence |
| 3 | the ladder | `playful`, faster | Each stage gets a new section or a new effect layer |
| 4 | the pivot | `curious` | Everything drops to one instrument for the realisation |
| 5 | the loophole | `triumph` | Short. It is a trick, not a victory parade |
| 6 | the button | `playful` | The last joke lands in the same music the film opened with |

Beds: whatever the place is (`room`, `street`, `forest`) — the tool's list is in the Stories sound guide.

## You cannot hear it

Nobody in this loop can listen. The tool measures loudness, gaps and buried effects and prints a report; read it and
say in the hand-over that the sound was measured, not heard. Never claim a film "sounds great".

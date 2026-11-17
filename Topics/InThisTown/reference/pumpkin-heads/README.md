# Reference: "In This Town, Everyone Wore a Pumpkin on Their Head"

**Approved by the owner.** He approved the script, asked for one change, a new ending, and accepted the film with
it. It is here because he asked for every short to be kept as a reference (2026-11-13: "make the other shorts that
u made go into the reference … source code + mp4").

| File | What it is |
|---|---|
| `in-this-town-pumpkin-heads.mp4` | **The film as delivered**: 1080×1920, 1:56, full sound. A copy of `renders/in-this-town-pumpkin-heads.mp4` |
| `contact-sheet-every-2-seconds.jpg` | One frame every two seconds, on one sheet. Read this first |
| `shot-log.md` | Every shot on one page |
| `source/` | A **snapshot** of the source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene14.tsx`, `film.tsx`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-pumpkin-heads/`.

## What it is good for

- **The short cut, under two minutes**, with full sound: 14 of the topic's 18 beats (`source/narration.md` says
  which were dropped and why).
- **A teller with no face.** His head is a carved pumpkin until `10.off`; the carving changes on the cut, the way a
  face would. His real face is first seen at `11.face`.
- **A slow creep, not a fight.** The tall things beside the houses are never named and barely move. For action,
  open [`../robot-at-18/`](../robot-at-18/README.md) and
  [`../superpower-at-18-part-2/`](../superpower-at-18-part-2/README.md) instead.
- **An ending that is a picture.** The owner threw out a spoken punchline ("Subscribe before I blink") and asked
  for night turning to day, the town searching, and the pumpkin on the ground without him.

## Its shape

58 shots, 490 words, 1:56.1 (116.1 s), 254 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | Everyone wore a pumpkin | 0:00.0 | 3.9 | 15 | 2 |
| 2 | Nobody knew | 0:03.9 | 5.4 | 26 | 3 |
| 3 | How we lived | 0:09.3 | 14.6 | 60 | 6 |
| 4 | I had never seen my face | 0:23.9 | 4.5 | 18 | 3 |
| 5 | That is all I was ever told | 0:28.4 | 9.3 | 42 | 4 |
| 6 | Hiding from whom | 0:37.7 | 5.6 | 23 | 3 |
| 7 | Twenty hands | 0:43.3 | 11.8 | 52 | 5 |
| 8 | A night with a full moon | 0:55.1 | 4.4 | 22 | 2 |
| 9 | She shook her pumpkin | 0:59.5 | 4.8 | 20 | 3 |
| 10 | I pulled it off | 1:04.3 | 14.7 | 61 | 7 |
| 11 | There I was in the water | 1:19.0 | 9.3 | 38 | 4 |
| 12 | Behind my reflection | 1:28.3 | 2.9 | 14 | 1 |
| 13 | One beside every house | 1:31.1 | 12.1 | 51 | 6 |
| 14 | Neither have I | 1:43.2 | 12.9 | 48 | 9 |

- Shots: the median holds 1.90 s, the shortest 0.87 s, the longest 3.53 s. 3 are under a second and 4 are over three. About 8.4 words to a picture.
- Camera: 42 `cam.push`, 6 `cam.top`, 4 `cam.truck`, 4 set by hand, 2 `cam.orbit`.
- Places: village 54, room 4 shots.

## Its sound, measured (`source/sound.lock.json`)

Music 18.3 dB under the voice, beds 26.2 dB under. 214 effects, 111 a minute, 35 kinds; none buried. The voice is
14.5 dB over everything else (median), 5.2 dB at the worst half second. No agent has listened to it.

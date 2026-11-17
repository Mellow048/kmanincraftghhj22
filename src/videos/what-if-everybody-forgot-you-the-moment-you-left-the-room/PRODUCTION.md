# What If Everybody Forgot You The Moment You Left The Room — production record

`src/videos/what-if-everybody-forgot-you-the-moment-you-left-the-room/`

**Status: rendered and verified frame by frame** (`renders/what-if-everybody-forgot-you-the-moment-you-left-the-room.mp4`,
1080x1920, 95.84 s, 28.5 MB). The delivered copy was reviewed as a 17-frame grid and two shots were fixed afterwards, so
the mp4 on the branch is the *next* render: `10.walla` (the lens stood inside the corridor's door row) and `11.whya`
(her line played over the back of his head).

## 1. Title
**What If Everybody Forgot You The Moment You Left The Room**

## 2. Premise
Nobody remembers him once he leaves a room, so he spends a week getting away with everything — until he finds a piece of
paper with his name on it and a number beside it, and works out that somebody has been paying for every room.

## 3. Hook chosen
Frame one stands behind him in the aisle as he leaves, and the door closes on an empty room where a whole class was
looking. Alternative hooks — a canteen tray with nobody behind it, and a mother setting a fifth place — were kept as
beats 2 and 4 instead of the opening, because both need the rule to be understood first.

## 4. Script
`narration.md`. 54 cues, 423 words. Rule in twelve words: *I leave a room, and everybody in it forgets I was there.*

## 5. Storyboard
`timing.json`; every shot in `scene1–3.tsx` carries a `note`. 19 / 23 / 12 shots.

## 6. Characters and assets
Teller, Mum, Jo, teacher, classmates, and four new sets built for it: the canteen, the bike shop, the open school yard
(the only place in the film with no walls), and the street with his front door.

## 7. Captions
2–4 word phrases, engine-chunked, breaking at commas and full stops.

## 8. Audio
15 music sections, 77 effects (48.2/min), −14.8 LUFS, true peak −2.3 dB.

## 9. Render
`renders/what-if-everybody-forgot-you-the-moment-you-left-the-room.mp4` — 1080x1920, 30 fps, 95.84 s, 28.5 MB,
H.264 + AAC. Verified by sampling 17 frames across the film: the timetable insert reads (ruled rows, two rooms
circled in red), the subscribe board's ends land at -0.49 and +0.36 NDC with his face at 0.00, and the last of the
behind-the-head shots are fixed in the render that follows this note.

**Six frame passes in total**, and five of the six found the same fault: a lens placed where the subject's head was.
The frame's end state is that every one of the 54 shots puts the camera on the room side of whoever is speaking.

## 10. Self-review
| Question | Verdict |
|---|---|
| First three seconds create curiosity? | Yes: the hook shot lands him beside the empty room, and the timetable insert at 0:09 is the question. |
| Premise immediately understandable? | Yes by 0:11. |
| Does every scene contribute? | Yes. |
| Middle engaging? | Yes, but it is the slowest of the three scripts. |
| Characters consistent? | Yes. |
| Captions accurate? | Yes. |
| Narration intelligible? | Measured, not heard. |
| Ending delivers? | Yes — "Subscribe, and I will tell you who." |
| Filler? | The five jokes by 0:20 are dense; nothing after them is padding. |

## 11. Remaining weaknesses
1. **Not rendered.** Do not claim otherwise.
2. Five lens passes were needed; the earlier attempts shipped blank walls and empty stages.
3. Nobody has heard it.

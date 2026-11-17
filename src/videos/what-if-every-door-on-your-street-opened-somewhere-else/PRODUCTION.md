# What If Every Door On Your Street Opened Somewhere Else — production record

`src/videos/what-if-every-door-on-your-street-opened-somewhere-else/`

**Status: built, passing every check, sound built, NOT rendered.** Frames reviewed once; the render is the next step.

## 1. Title
**What If Every Door On Your Street Opened Somewhere Else**

## 2. Premise
Every door on his street opens onto somewhere else at night, and he learns the whole map by heart — until he finds a
hallway with his own handwriting on the wall and a tally that has outgrown his own, and works out that his mother has
been walking the long way for a month so she would know where he had got to.

## 3. Hook chosen
Frame one: night, one street, his own front door standing open onto a tiled school floor that has no business being
there, and the neighbour's wardrobe on the pavement. The picture asks the question before the voice does.

The three alternatives, and why two were dropped:
| Opening | What it was | Why |
|---|---|---|
| **His door open on a school floor (chosen)** | The power is already working in frame one, on a street everybody recognises | Nothing to explain: a door and the wrong room behind it |
| The blue door alone, closed, in the dark | A colour and a dare | Suspense without information: it asks a question the film answers 23 s later |
| The palm with the measurements already on it | The map, close | A prop before a person: no room in the frame for a face, and the rule is not yet understood |

## 4. Script
`narration.md`. 49 cues, 517 words. 116.6 s. Rule in twelve words: **the door you pick decides where you come out.**

The limit: it works on doors on his street, and only at night. In daylight every door is just a door.
The price: every shortcut costs somebody else. Every door he takes, his mother walks the long way round; the woman at
the front of the shop queue lets everybody past, at nine at night and still there at six the next evening.

## 5. Storyboard
`timing.json`; every shot in `scene1–3.tsx` carries a `note`. 22 / 21 / 6 shots. Median shot 2.47 s, longest 3.47 s.

| Act | Cues | Seconds | Beat |
|---|---|---|---|
| Hook | `1.if`–`1.one` | 0–10.7 | The door open on the wrong room, and the map on his palm |
| Setup + five jokes | `2.fridge`–`2.pizza` | 10.7–34.2 | Fridge→school, the neighbour's wardrobe, the dare and the pool, dad and the wall, the pizza |
| The month | `3.map`–`4.didnt` | 34.2–51.4 | The tally, "best month of my life", and the door that sticks |
| The door that will not | `5.one`–`7.went` | 51.4–72.5 | The hallway with no windows, and the woman at the front of the queue |
| The wall | `8.wall`–`10.mine` | 72.5–101.0 | His own handwriting, older and higher: his mother's height |
| The reveal | `11.count`–`12.sub` | 101.0–116.6 | The tally, his own bedroom from the outside, and his mother sitting down |

## 6. Characters and assets
Teller, his mother, his father, the neighbour, the woman in the queue, a friend, and six sets built for it: the street
at night (seven houses, a street lamp, the back door and the wall behind it), the kitchen at home, the classroom he
comes out of the fridge into, the corner shop and its pavement queue, the deep end of the pool, and the hallway behind
the stuck door. His bedroom is built once and placed twice: behind his own front door at the start, and through the
hall's doorway at the end.

## 7. Captions
2–4 word phrases, engine-chunked, breaking at commas and full stops. 517 words on screen, matching the voice.

## 8. Audio
12 music sections, 14 beds, 79 effects (40.6/min), −14.8 LUFS, true peak −2.3 dB. Music 18.7 dB under the voice;
the voice 16.3 dB over the rest, worst half-second 5.0 dB (at 113.8 s, on "where he had got to").

## 9. Render
**None yet.**

## 10. Self-review
| Question | Verdict |
|---|---|
| First three seconds create curiosity? | Yes: one door, the wrong room behind it, and a stranger's wardrobe on the pavement. |
| Premise immediately understandable? | Yes by 0:02, and the rule is out loud by 0:10. |
| Does every scene contribute? | Yes; the five jokes set the tone, the month earns the fall, the queue and the wall are the turn. |
| Middle engaging? | The strongest of the four scripts: five jokes in nine seconds, then a clock. |
| Characters consistent? | Yes: one boy's orange across all four films, one mother, one coat on the woman in the queue. |
| Captions accurate? | Yes, generated from the voice's own timing. |
| Narration intelligible? | Measured, not heard. |
| Ending delivers? | Yes — the stuck door is his own, and "Subscribe, and I will tell you where she walked to." |
| Filler? | None: 116.6 s for 517 words. |

## 11. Remaining weaknesses
- The hallway is deliberately the plainest set in the film; at 1.4 m wide it is one wall and a light. It is meant to
  be, but it is the one zone with no second subject in frame.
- 11.room is filmed through a doorway from the hall, so the frame has a dark border on three sides by design. If it
  reads as a mistake rather than a point of view, it needs the doorway widened, not the shot re-framed.
- Nobody has listened to the mix. The numbers are good; an agent cannot hear.

## 12. What the camera passes cost, and what they taught
The film took five renders. Four of them were fixing things that a projection solve would have caught in ten
seconds, and each one is now written into the shot where it happened:

- **`H()` IS THE HALL'S ORIGIN, NOT THE BEDROOM'S.** The bedroom is built at `H(0,0,5.1)`, so its interior
  z 0..3 is hall z 5.1..8.1 and the tally wall is at 8.1. Three shots were written with the room's own numbers and
  played 120 m away in empty world -- which read, for two rounds, as a lighting problem. It was not: there was
  nothing in frame to light. `zone` only toggles visibility; it does not move the camera.
- **A decal is not a lamp.** The canteen in film three carried a `LightPool` and no point light, and a `LightPool`
  is a light-coloured rectangle on the floor. A sealed alley in this film had neither, and two walls 0.9 m apart,
  so the only possible frame was black. `2.dad` now has both walls cut down to 2.6 and 3.6 m -- open to the sky --
  plus a sodium service lamp outside the mouth of the alley.
- **`126.10` is not `1.26`.** `11.room` had a decimal point in the wrong place and put the lens 126 m in the air.
  It rendered as the black inside of a ceiling for a whole render cycle.
- **The subject has to be in frame, not behind the actor.** `3.tally` and `11.count` were aimed at the wall with
  the boy standing in front of the marks, which is exactly the thing the shot exists to show. He now stands to the
  right of frame with his hand up at the plaster.

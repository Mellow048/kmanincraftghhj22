# What If You Could Hear The Last Thing A Place Remembered — production record

`src/videos/what-if-you-could-hear-the-last-thing-a-place-remembered/`

**Status: built, every check green, voice recorded and word-aligned, sound built. NOT yet looked at frame by frame, NOT rendered.**

## 1. Title
**What If You Could Hear The Last Thing A Place Remembered**

## 2. Premise
He touches a wall and hears the last sentence ever said in front of it — a bench that says OW, a classroom that gives
a teacher's worst joke back, a bus stop repeating one line for a year. One surface will not answer him at all. He
spends a week listening to what people really think of him, then hears his own name in his mother's voice in a gym
she has never been in, and finds out that every wall he emptied was a sentence he had taken — including the one his
father had been saying to a sink every morning for nineteen years, to a son who was never up early enough to be in
the room.

## 3. Hook chosen
Frame one: his palm flat on the glass of a bus shelter at midnight, with the whole street empty behind him. The power
is already in use before it is named, and the shot is at his hand rather than his face, so the audience asks what he
is listening to.

| Opening | What it was | Why |
|---|---|---|
| **The palm on the shelter glass (chosen)** | The power working in frame one, on an ordinary street | It shows the rule before the voice states it: hand on surface, answer |
| The empty street wide, then in | A place before a person | A lovely shot, but it asks "where is this" instead of "what is he doing" |
| The bench that says OW | The best joke first | It spends the film's funniest beat at 0:02, and it needs the rule to have already landed |

## 4. Script
`narration.md`. 43 cues, 407 words, 96.7 s. Rule in twelve words: **I touch a wall, and I hear the last thing it
heard.**

- The limit: one sentence a wall, the last one said in front of it, and it plays once. Touch it again and it is
  silent, because he took the first one.
- The price: he is not listening to the past. He is spending it. Every wall he likes is a sentence that is gone.

The five jokes before 0:20 are the bench, the classroom, the bus stop (twice), the gym that says nothing, and the
bathroom that says *you look nice* in his mother's voice. He says the misread out loud at `5.thought`: *"I thought
walls remembered the important things."* The correction is the thesis: **they remember the last thing.**

## 5. Storyboard
`timing.json`; every shot in `scene1–6.tsx` carries a `note`. 43 shots. Median 2.27 s, shortest 1.53 s.

| Scene | Cues | Seconds | Beat |
|---|---|---|---|
| 1 One sentence, then nothing | `1.if`–`1.one` | 0.0–11.8 | The shelter at midnight, the rule, and the glass going quiet |
| 2 The five walls | `2.bench`–`2.mirrorb` | 11.8–32.4 | The jokes, and the one that lands on him instead of on the world |
| 3 Best-informed person in town | `3.week`–`3.still` | 32.4–50.4 | The week he is winning, the list, his dad at the sink, and hands that stop touching |
| 4 The wall with no windows | `4.one`–`5.instead` | 50.4–65.8 | The silent wall says his name, in his mother's voice, before he was born |
| 5 What it was actually doing | `6.comeback`–`7.wait` | 65.8–79.4 | The bill: the bench is spent, the list has a line he did not write, his own wall is holding |
| 6 Your turn | `8.morning`–`10.sub` | 79.4–96.7 | The kitchen, the sentence his dad said to a sink, and the button |

**The rule is a shape before it is a sentence.** Every wall answers at 1.15–1.30 m — a hand held out without looking
— and always with the same effect (`Rings`, scene1): three pale squares, once, on a word. A shot with no rings in it
is a wall that has nothing left, which is how the last act says "gone" without anybody saying it.

**Charges are paid in the same frame they were incurred.** `6.comeback` re-uses the exact lens of `2.bench` (on
S(−4.20, 1.05, 0.55), 3.05→2.55, yaw 22, fov 44) so the bench reads as a receipt. `6.mine` re-uses the top-down
lens of `3.tally`. The list is one prop, drawn twice, one line longer the second time.

## 6. Characters and assets
The teller; his mother (`Mum`, #7a4a6a, 0.94 scale); his dad (`Dad`, #3f5f6a); a best friend (`Friend`, #2fb5a8); an
adult in the corridor. Seven zones, five built for this film: the street at midnight (shelter with a lit timetable,
shop, bench, lamp, bus roundel), the kitchen (pack `Kitchen`), the classroom (pack `Classroom`), the gym (bare west
wall, wall bars, mats, fluorescent strips), and the bathroom (tiles, mirror, basin, toothbrushes). The corridor and
bedroom zones came from the template for the list sequence.

**The teller is warm against cold rooms.** His tee is the only saturated colour in the gym, the bathroom and the
midnight street, so a phone can find him in a wide shot.

## 7. Captions
2–4 word phrases, engine-chunked at commas and full stops; 407 words, matching the voice, `y: 0.72`.

## 8. Audio
Recorded with one voice, six clips, at 198 words/min as recorded and tempo ×1.290 to 254. Every clip is
**word-aligned by the aligner, not spread by syllable count** (it needed a pronunciation entry for "best-informed").

12 music sections that turn with the story: `wonder` (the rule) → `playful` (the jokes) → `curious` (winning) →
`sneak` (dad at the sink) → `tense` (he stops touching) → `dark` (the silent wall) → `sad` (the misread) → `curious`
(the bill) → **`none`** (the one wall that never answered) → `hope` (the kitchen) → `sad` (the reveal and the button).
15 beds, 96 effects at 59.6/min, −14.8 LUFS, true peak −2.2 dB. Music 18.6 dB under the voice; the voice 16.2 dB over
everything else, worst half-second 5.2 dB.

**The power's sound is one sound.** `glitch` at pitch 1.0 for every wall, every time, so the viewer hears the answer
before they see it. A wall that has been spent does not make it. At `4.touch` the same sound arrives pitched **up**
and pointed into him instead of out of the wall. Sound was measured, never heard: an agent cannot listen.

## 9. Render
**None yet.** Stills for 12 shots requested on `83566cb` before the render.

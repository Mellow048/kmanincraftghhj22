# Narration — In This Town, Nobody Made a Sound

**Status: BUILT ON THE OWNER'S WORD.** The owner overrode the script gate ("if you dont even have the mp4 yet please
GO"), so the script went straight to voice and picture without a second approval stop. The owner still reviews the
finished film.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word, and read the script of the
reference film, `src/videos/in-this-town-same-face/narration.md`, to see what a finished one looks like. This copies
its SHAPE, never its story.

**The premise, in four sentences.** In this town, nobody made a sound: wool on the floors, a school in signs, and a
bell nobody was allowed to ring. I was the only one who made noise, because I hiccupped, and I thought the town was
quiet for me. Then I found my grandmother ringing the forbidden bell at night, and she told me the truth: something
under the town is listening, and quiet is what it hears when we are gone. So I rang the bell too, and it answered.

**One sentence:** A boy who cannot stop hiccupping in a town that refuses to make noise discovers the silence was
never for him — it was the town telling something underground that it was still alive — and he takes his turn at the
bell.

- One teller, first person, past tense. Fast and plain, about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun, 4–12 words.
- Each `# clip` is one recording. Record it to `public/audio/in-this-town-nobody-made-a-sound/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build in-this-town-nobody-made-a-sound --require-alignment`.
- The first line starts "In this town". The last line is the subscribe line, and it answers the bell.
- This is the short cut: 250–520 words, one to two minutes (`cut: "short"` in film.tsx).

**Two reversals, both planted before they pay.**
1. "I thought the town was quiet because of me" (5.think) → "You are not the problem. You are the only one it hears."
   (8.wrong, 8.only). Planted by the hiccup in the first four seconds and the stopped street in 1.hiccup.
2. "I thought quiet kept us safe" (9.think2) → "Quiet sounds like nothing, and nothing sounds like gone" (9.actually).
   Planted by the black blanket on the bell (3.blanket) and the rule nobody would explain (3.never, 7.wake).

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| The hiccup, every single day (1.hiccup) | "I still hiccup. Nobody minds anymore." (13.hiccup) |
| Wool on the floors, no sound of steps (2.wool, 2.steps) | "You could hear the wool." (10.quiet) |
| The bell wrapped in a black blanket, never rung (3.blanket, 3.never) | She rings it every night (6.ring) |
| "Somebody under this town listens" (7.below) | One low note answers (12.low) |
| The grandmother's finger on her lips (3.why) | She is the one who breaks the rule (6.grand, 6.ring) |
| He does not lift the bell himself (10.mine) | "Answer it back" (14.answer), and the sign lands last (14.sub) |

```narration
# clip 01-hook
[1.town]      In this town, nobody made a sound.
[1.me]        Nobody but me.
[1.kid]       I was the kid who could not help it.
[1.hiccup]    Hiccup. And the whole street stopped.

# clip 02-town
[2.wool]      The floors were covered in wool.
[2.steps]     You could walk anywhere and hear nothing.
[2.signs]     The school was in signs. Nobody talked. Nobody hummed.
[2.noon]      And at noon, everybody went to bed.

# clip 03-grandmother
[3.grand]     My grandmother kept the town bell.
[3.blanket]   It was wrapped in a black blanket, up in the tower.
[3.never]     Nobody was allowed to ring it. Not once. Not ever.
[3.why]       I asked her why. She put one finger on her lips.

# clip 04-problem
[4.only]      So I was the only sound in the whole town.
[4.try]       I tried to stop. I held my breath.
[4.bad]       I turned blue. I fell over.
[4.again]     And I hiccupped again, on the floor, in the wool.
[5.think]     I thought the town was quiet because of me.
[5.sorry]     Everyone was being careful, for me.
[5.hate]      I hated it. I hated my own chest.

# clip 05-night
[6.door]      Then one night, the tower door was open.
[6.up]        I climbed the stairs.
[6.grand]     It was my grandmother.
[6.ring]      And she was ringing the bell.

# clip 06-ask
[7.ask]       I said: you told me nobody rings it.
[7.for]       She said: I ring it every night. For the thing below.
[7.below]     Something under this town is listening.
[7.wake]      If it stops hearing us, it wakes up.
[8.wrong]     You are not the problem, she said.
[8.only]      You are the only one it hears.
[8.purpose]   The town was never quiet because of me.
[8.quiet]     The town was quiet on purpose.

# clip 07-rule
[9.think2]    I thought quiet kept us safe.
[9.actually]  But quiet sounds like nothing.
[9.gone]      And nothing sounds like gone.
[9.bell2]     The bell was the town saying: still here.
[10.mine]     So one night, she let me hold the rope.
[10.breath]   I held my breath. The whole town held theirs.
[10.wool]     You could hear the wool.

# clip 08-ring
[11.loud]     And I rang it. Loud.
[11.one]      One. Two. Three.
[11.answer]   And something under the town answered.
[12.low]      One low note, under the ground.
[12.not]      Not angry.
[12.lonely]   Lonely.
[12.still]    The whole town stood still.

# clip 09-now
[13.now]      Now the bell rings every night. I take a turn.
[13.town]     And the town is still quiet.
[13.diff]     But it is a different kind of quiet.
[13.hiccup]   I still hiccup. Nobody minds anymore.
[14.answer]   And if you hear a bell tonight, answer it back.
[14.sub]      Like and subscribe.
```

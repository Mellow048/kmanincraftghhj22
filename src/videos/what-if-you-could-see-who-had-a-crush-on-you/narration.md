# Narration — What If You Could See Who Had a Crush on You

**Status: BUILT and RENDERED. Waiting for the owner to watch it.** The owner approved this script on 2026-11-13
("yesboth", to the two scripts that were put to him together). The six clips are recorded with `voice-00`
(`public/audio/what-if-you-could-see-who-had-a-crush-on-you/raw/`) and the film is timed to them (`timing.json`):
1:53.6 at 254 words a minute. The picture (55 shots in six places) and the sound (`sound.json`: 321 sounds) are
built. Changing a word now means recording that clip again and rebuilding the timing.

**Delivered 2026-11-13** as render 44: 1080×1920, 3409 frames, 1:53.6. The master is the release asset
(`render-44`, 62 MB); `renders/what-if-you-could-see-who-had-a-crush-on-you.mp4` is a 720×1280 copy that fits in
the repository, and `renders/what-if-you-could-see-who-had-a-crush-on-you-shots.jpg` is one frame of it per shot.
Measured on the delivered file (`python3 scripts/render-check.py what-if-you-could-see-who-had-a-crush-on-you`): the
sound sits 0.0 ms from `mix.mp3`, −15.0 LUFS, true peak −0.3 dB. **Nobody has listened to the sound: an agent
cannot.**

Topic: `Topics/WhatIf`. Read `Topics/WhatIf/SCRIPT.md` before changing a word. **This film is meant to become the
topic's reference** (the owner: "you are the one making that reference!"): once he approves it, it is measured and
the provisional numbers of the topic are corrected from it (`Topics/WhatIf/reference/README.md`).

**The premise, in four sentences.** What if I could see a heart over anybody who liked somebody. I used it to find
out whether Mia, the girl by the window, liked me. It worked: her heart grew every time I came close, until the
night I asked her to dance and saw that it was growing for the boy standing behind me. What the power had really
been showing me, since the first morning, was my best friend Jo: hers was "the biggest heart in the school" only
because I had never once seen it from far away.

**One sentence:** A kid who can see everybody's crush spends a week chasing the wrong heart, and finds out that the
one heart that was for him looked big for the same reason he never noticed it: it was always right behind him.

**The rule of the power, in one line a viewer could repeat:** A heart floats over anybody who likes somebody, and it
grows when the one it is for comes close. **It never says who it is for**, and he cannot see his own.

**The price.** To read one heart he stops looking at his friend. The first thing the power costs him is a lunch
with Jo; the second is Jo walking home the other way.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun. 5–12 words.
- Each `# clip` is one recording. Record it to `public/audio/what-if-you-could-see-who-had-a-crush-on-you/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build what-if-you-could-see-who-had-a-crush-on-you`.
- The first line is the question, and it starts "What if". The last line is the subscribe line.
- Only one other person speaks: Jo, three words (9.ask). Mia never says a word. Nobody explains the power.
- The power has ONE look in the whole film: a pink heart over a head (`Overhead`), small or big.

**Length.** 479 words in 55 lines. As recorded: 1:53.6 (113.6 seconds) at 254 words a minute (the limits are 60–118
seconds, 250–520 words).

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "When my dad walked in, it doubled" (2.dad); "A heart grew when the one it was for came close" (3.grew) | "I took one step, and it grew" (13.step) |
| "But a heart never said who it was for. I had to watch what made it grow" (3.never, 3.guess) | He guessed, and guessed wrong: "She was looking over my shoulder" (13.over) |
| "I could not see my own" (2.mirror) | The last picture of the film: a heart over HIS head, which only we can see, growing as he walks up to Jo (14.loud) |
| "Her heart was the biggest in the whole school" (6.biggest) | "It had never been big. It had only ever been near me" (13.near) |
| "She threw an eraser at my head" (6.eraser) | "I will tell you what she threw at me" (14.sub) |
| "Her heart did not move at all" (7.laugh): Leo is not in the room | "Her heart grew until it touched the ceiling" (8.ceiling): Leo is behind him in the line. Named at last in 13.leo |
| "I practised on my dog. He said yes" (10.dog), after "Even my dog had one. For his dinner" (2.dog) | A joke that is told twice, so the dance has something to lose |

Planted in the picture only, never in the words:

- **In every classroom shot of his face, Jo's heart is in the frame behind his head**, huge. The viewer can see it
  for a minute before he does. He never turns round.
- **Leo** (tall, green shirt) is on screen three times before he is named: two desks from Mia (5.small), right
  behind the teller in the lunch line (8.line, 8.ceiling), and walking in with two cups (12.grew).
- In the one wide shot where Jo is far from him (8.apart, across the lunch room), **her heart is small**. Nobody
  says so.

**Sentences of six words or fewer** (they should carry the plot on their own): One morning, I could. · I could not
see my own. · I watched it the whole way. · I did not watch the door. · It had to be for me. · I forgot to save Jo a
seat. · Will you dance with me? · Her heart shook. · She was looking over my shoulder. · It had never been big. ·
Out loud.

**What was put to the owner with the draft, and how it was settled.** He answered "yesboth", so each point stands
as proposed: this is the story, this is the title, the ending does not say what Jo answers, and the voice is
`voice-00`.

1. The story: is this the "What if" you want as the topic's reference? Two others were considered and are one line
   each at the bottom of this page.
2. The title: *What If You Could See Who Had a Crush on You?*
3. The ending does not say what Jo answers. The last line promises to ("Subscribe, and I will tell you what she
   threw at me"). Say so if you would rather it ended on her answer.
4. The voice: `voice-00`, as in the In This Town films, unless you want another for this topic.

**What was built for this film, and is in the pack now** (`Topics/WhatIf/places.tsx`, `things.tsx`): a kitchen at
breakfast with a mirror that reflects, a dog and its bowl, a lunch room with a line, a gym that is dressed for a
dance at night, the school gate and the street outside it, an eraser, a card, a tie, a tray, a cup, a sandwich,
cookies. The classroom, the hall, the classmates, the teachers and the heart were in the pack already.

**How the picture keeps the story honest** (the film's `kit.tsx`):

- Jo's heart is never given a size by hand. It is `joHeart(metres between her and him)` in every shot she is in:
  0.95 m when she is at the next desk, 0.42 m at four metres, 0.13 m from the gate. So "the biggest heart in the
  school" is on screen from the first second, and it is small in the one wide shot where she sits across the lunch
  room (8.apart), a minute before he works it out.
- Mia's heart is small except on two occasions, and on both Leo is walking up behind the teller: the lunch line
  (scene 8) and the dance (scene 12). Leo is not in the room when the teller walks past her desk (scene 7), and her
  heart does not move.
- A heart changes size only when the one it is for moves. No heart swells on a word.

**What was left in.** Seen in the stills and kept, because the fix cost more than the fault:

| Shot | What is there |
|---|---|
| 2.mirror | His own shoulder is a dark block on the right edge: the lens looks past it into the glass |
| 3.grew | The waving arm of the boy who walks up leaves the right edge of the frame |
| 6.jo, 6.lucky | Jo's heart is cut by the top of the frame. It is the biggest in the school: it does not fit, and it should not |
| 7.walk | Mia's fair head is a large pale block on the left of the frame |
| 10.card | In the first frames his head is a small dark shape at the bottom, under the card |
| 11.card | The card is half behind Mia's hair. It was read, whole, in the shot before |
| 13.over | The back of his head is a dark strip on the right edge: the lens is behind his shoulder, as the line says |

```narration
# clip 01-hook
[1.what]      What if you could see who had a crush on you?
[1.me]        One morning, I could.
[2.mom]       At breakfast, a pink heart floated over my mom.
[2.dad]       When my dad walked in, it doubled.
[2.dog]       Even my dog had one. For his dinner.
[2.mirror]    I checked the mirror. I could not see my own.

# clip 02-rule
[3.school]    At school, the hearts were everywhere.
[3.grew]      A heart grew when the one it was for came close.
[3.teacher]   My math teacher's filled the room when the gym teacher walked past.
[3.never]     But a heart never said who it was for.
[3.guess]     I had to watch what made it grow.
[4.ben]       I told Ben that Lily's heart doubled whenever he sat down.
[4.lunch]     By lunch they were sharing a sandwich.
[4.cookie]    By Wednesday, kids were paying me one cookie a question.
[4.hands]     By Friday, the math teacher and the gym teacher were holding hands.

# clip 03-wish
[5.mia]       But the only heart I cared about was Mia's.
[5.small]     She sat by the window, and her heart was always small.
[5.forme]     Could it be for me? I had to know.
[6.jo]        My best friend Jo sat behind me in every class.
[6.biggest]   Her heart was the biggest in the whole school.
[6.lucky]     I told her, whoever he is, he is one lucky guy.
[6.eraser]    She threw an eraser at my head.

# clip 04-tries
[7.walk]      So I walked past Mia's desk to see if her heart would grow.
[7.watch]     I watched it the whole way.
[7.door]      I did not watch the door.
[7.laugh]     Everybody laughed. Her heart did not move at all.
[8.line]      Then, in the lunch line, I got the spot right behind her.
[8.ceiling]   Her heart grew until it touched the ceiling.
[8.mine]      It had to be for me.
[8.seat]      I forgot to save Jo a seat.
[8.apart]     It was the first lunch we had ever eaten apart.

# clip 05-edge
[9.smile]     Jo asked why I kept smiling at nothing.
[9.ask]       I told her about Mia. She said, then ask her.
[9.home]      That day, she walked home the other way.
[10.dance]    The school dance was on Friday night.
[10.card]     I wrote my question on a card.
[10.dog]      I practised on my dog. He said yes.
[10.tie]      I wore my dad's tie. It reached my knees.
[10.lights]   Mia stood under the lights. Her heart was small. Not for long.
[10.jo]       Jo had said she was not coming.

# clip 06-reveal
[11.walk]     I walked across the gym.
[11.card]     I held out the card.
[11.ask]      Will you dance with me?
[12.shook]    Her heart shook.
[12.grew]     Then it grew, bigger than I had ever seen one grow.
[12.sure]     I had never been so sure of anything.
[13.over]     She was looking over my shoulder.
[13.leo]      Leo was right behind me. Just like in the lunch line.
[13.biggest]  Then I thought about the biggest heart in school.
[13.gate]     Jo was out by the gate, a long way off. Her heart was tiny.
[13.step]     I took one step, and it grew.
[13.near]     It had never been big. It had only ever been near me.
[14.gone]     The next morning, every heart was gone.
[14.loud]     So I had to ask Jo the old way. Out loud.
[14.sub]      Subscribe, and I will tell you what she threw at me.
```

## The two ideas that were not written

- **What if you could hear what everybody was thinking?** He hears the whole school, except one girl. He decides
  she has nothing in her head. She is the only other one who can hear, and she has been hearing him all year.
- **What if you could stop time?** He stops it for naps, for tests, for the last slice. But he keeps growing while
  the world waits, and by spring he is a head taller than his class, and his best friend is still nine.

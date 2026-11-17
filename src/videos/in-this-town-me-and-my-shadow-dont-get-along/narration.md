# Narration — In This Town, Me and My Shadow Don't Get Along

**Status: DRAFT 1, for the owner to read. Not approved, not recorded.** Nothing is built until the owner approves
the script. 62 shots, 489 words, 115.4 seconds estimated at 256 words a minute, median shot 1.80 s.

It keeps his outline in his order: classroom, hallway, cafeteria, prom; the shadow fearless and the boy scared; the
best friend fed up; the night something is different; the ask; the yes; the shadow joining him again. What the
agent added, and he may strike: the old janitor who says the rule without a reason, the "three steps" running joke,
and the needle line "Is your shadow going to ask me?".

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before writing a word, and read the script of the
reference film, `src/videos/in-this-town-same-face/narration.md`, to see what a finished one looks like. Copy its SHAPE,
never its story.

**The owner's outline, word for word (2026-11-12).** "how about in this town me and my shadow dont work well. (its like
it has its own mind) setting is classroom, classroom hallways, cafeteria and prom. his shadow is the one with no fear,
while him he is scared for his life. He has a bestfriend who is tired of us babbling about our crush, but we are a
scardy cat towards her, That night, something felt different then we woke up my shadow is moving?!. so yeah make a
story about that, a simple one shot short with no part 2 or 3 the goal in the end is to ask her out, and she suddenly
said yes then the shadow started following you like it become one with you again you are happy. Then insted of like and
sub for part blah blah, make it Like the video if you.. hmm something that motivates people who also have expreince
with that etc etc."

**The premise, in four sentences.** In this town every shadow copies its owner, and mine does whatever it likes: it
answers in class, walks the hallway on the wall, and takes things I am too scared to ask for. Nobody would explain why
it is only mine. It is not brave, it is me with the fear taken out, and I cannot ask one girl out while it does
everything. On prom night I ask her myself, my shadow steps back onto the floor under my shoes, and she says yes.

**One sentence:** A boy whose shadow does all his brave living finds out the shadow was never a separate creature: it
was his own courage, waiting for him to use it.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun.
- Each `# clip` is one recording. Record it to `public/audio/in-this-town-me-and-my-shadow-dont-get-along/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build in-this-town-me-and-my-shadow-dont-get-along`.
- The first line starts "In this town". **The last line is not the subscribe line**: the owner asked for a one-shot
  with no part two, ending on a line that speaks to people who lived it ("Like this video if you had to borrow your
  courage before it became yours"). That is his exception to the topic's `lastLineContains`, recorded in
  `Topics/InThisTown/topic.json`.
- This is the short cut: 14 beats, 250–520 words, one to two minutes (`cut: "short"` in film.tsx).
- The whole film is one school and one prom: classroom, hallway, cafeteria, gym. Four places, no more.
- Shadow is not a separate creature with a face. It is a dark copy of the boy on the floor and the walls, and it moves
  on its own until the last beat. When it "becomes one with him" it slides under his shoes and stops moving alone.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "Mine had a mind of its own" (1.own) | It never had a mind of its own: it had his (14.real, 14.mine) |
| It is not scared of anything; he is scared of everything (1.brave, 1.me) | It is the part of him with the fear taken out (14.part) |
| The janitor: "you keep letting it do the brave parts" (7.ans) | He stops letting it, and it goes back under his shoes (12.floor) |
| "Whose shadow is it, if it does all the living?" (8.q) | He answers it on the dance floor by living it himself (12.ask) |
| The pencil case, the bread roll, "three steps" (5.quote, 6.prac, 9.steps) | The last try is not a practice: he says it out loud to her (12.ask) |
| It moves like a copy only when he moves (3.class, 13.follow) | After the yes it copies him exactly, on the floor (13.follow) |

```narration
# clip 01-hook
[1.copy]     In this town, everybody's shadow copies them.
[1.own]      Mine had a mind of its own.
[1.brave]    It was not scared of anything.
[1.me]       I was scared of everything.

# clip 02-world
[2.rule]     A shadow belongs under your shoes.
[2.mine]     Mine went up walls and into rooms without me.
[2.why]      Nobody knew why. Not even the doctor.
[2.only]     I was the only one like this.
[3.class]    In class, my shadow stood up and answered the questions.
[3.mark]     It got a better mark than me.
[3.hall]     In the hallway it walked the wall and waved at the principal.
[3.lunch]    At lunch it took the last pudding.
[3.cook]     The cook shouted. My shadow blew her a kiss.
[3.good]     It was a good life. The best part of me was not me.

# clip 03-her
[4.one]      But one thing it could not do.
[4.her]      Her. Just her.
[4.stop]     I could not say hi. My legs stopped.
[5.friend]   My best friend was tired of hearing about her.
[5.quote]    "You have described her pencil case twice today."
[5.cat]      "It has a cat on it."
[5.ask]      "Ask her."

# clip 04-tease
[6.prac]     So I practised on a bread roll.
[6.quote]    "Do you want to—"
[6.walk]     My shadow stood up and walked to her table without me.
[6.laugh]    She laughed. I was under the table. Being replaced is worse.
[7.jan]      The old janitor had seen it before.
[7.why]      "Why does mine never stay where I put it?"
[7.ans]      "Because you keep letting it do the brave parts."
[7.mop]      Then he walked off.

# clip 05-night
[8.night]    That night I could not sleep.
[8.wall]     My shadow was on the wall, doing push-ups.
[8.q]        Whose shadow is it, if it does all the living?
[8.dec]      Prom was on Friday. So I decided. I would ask her. Me. Not it.

# clip 06-prom
[9.night]    Prom night. Loud music. Shoes too tight.
[9.mirror]   In the mirror I practised. My shadow said it perfectly.
[9.steps]    I got three steps across the floor.
[9.plant]    Then I was behind a plant, hiding.
[9.found]    My friend found me. "Three steps. That is a record."

# clip 07-push
[10.legs]    Then my legs started walking without me.
[10.push]    My shadow was behind me, pushing.
[10.her]     She was under the lights, waiting.
[10.mouth]   I opened my mouth. Nothing came out.
[11.hand]    My shadow put out its hand instead of me.
[11.past]    She looked right past it. At me.
[11.q]       "Is your shadow going to ask me?"
[11.stop]    The music stopped. Even my shadow stopped.

# clip 08-ask
[12.knees]   My knees shook so hard my shoelaces moved.
[12.breath]  I took one breath.
[12.ask]     "Do you want to dance with me?"
[12.voice]   My voice. Cracked and quiet and mine.
[12.still]   My shadow went still.
[12.floor]   It stepped onto the floor and slid under my shoes.

# clip 09-yes
[13.yes]     She said yes.
[13.follow]  Then she took my hand, and my shadow followed on the floor.
[13.dance]   We danced like a badly drawn puppet. I did not care.
[13.friend]  My friend cried in the corner. She blames the smoke machine.

# clip 10-reveal
[14.real]    My shadow never had a mind of its own.
[14.mine]    It had my mind.
[14.part]    It was the part of me that was not scared, doing what I wanted.
[14.now]     She is asleep on my shoulder. My shadow is on the floor.
[14.together] Both of us are where we belong.
[15.like]    Like this video if you had to borrow your courage before it became yours.
```

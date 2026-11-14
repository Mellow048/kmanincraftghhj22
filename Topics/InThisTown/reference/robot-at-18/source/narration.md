# Narration — In This Town, Everyone Gets a Robot at 18

**Status: the owner approved this script** ("i approve just change the heavy attack into a katana"). The story is
his outline, beat for beat: a robot at eighteen, mum's butler and dad's foot massager, the friends' good robots, the
useless head, the classroom, the bully with the arms and the nerd with the glasses, the button, the suit, the
forest, the old man, the katana, the cannon, the shield, and who the old man is.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word.

**Length: 2:54.** It was first delivered at 3:25. A vertical video over 3:00 is not a YouTube Short, so on 2026-11-13 the
owner had it trimmed: 13 lines were taken out of the recordings with `scripts/trim-narration.py`, none of them in the fight.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**. Each `# clip` is one recording, saved to
  `public/audio/in-this-town-robot-at-18/raw/<clip>.mp3`; then
  `python3 scripts/narration.py build in-this-town-robot-at-18`.
- The teller wears a RED hoodie. Nora (shield) wears teal, Brick (arms) wears black, Pip (glasses) wears green.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "Nora got a shield robot. Nothing gets through it." (3.nora) | She blocks the cannon (14.blast) |
| "Just a head." (4.just) | "It was never a broken robot. It was a suit." (9.suit) |
| "I sat down again." (7.sat) | The suit; part two |
| "Somebody had followed me from school" (14.follow) | Nora slides in with the shield (14.slide) |
| "They took it away from him" (15.took) | "That is the same robot as his." (15.same); part two |

```narration
# clip 01-hook
[1.town]     In this town, the day you turn eighteen, you get your own robot.
[1.crate]    Nobody picks. A crate lands on your doorstep, and whatever is inside is yours for life.
[2.mum]      My mum got a butler. He has poured her tea every morning for twenty years.
[2.dad]      My dad got a foot massager.

# clip 02-friends
[3.friends]  Then my friends turned eighteen, one by one.
[3.hand]     One got a floating hand that follows him around and carries his bag.
[3.nora]     And Nora got a shield robot. Nothing gets through it. Not even dodgeballs.
[4.turn]     Then it was my turn. My crate was very small.
[4.open]     I opened it. Inside was a head.
[4.just]     Just a head. One robot head, no body, no arms, no instructions.
[4.tuesday]  Dad said, "Maybe the body is coming on Tuesday." It was not.

# clip 03-class
[5.school]   I took it to school anyway. That was a mistake.
[5.talk]     "Does it talk?" No. "Does it walk?" It is a head.
[5.laugh]    The whole class laughed. Even the floating hand slapped a desk.
[5.home]     I smiled. I went home. I was not smiling at home.

# clip 04-bully
[6.lunch]    Then one day, at lunch, somebody got picked on.
[6.brick]    Brick has a robot he wears: two giant metal arms.
[6.pip]      Pip has a robot too. It is a pair of glasses that knows everything.
[6.lift]     Brick lifted him up by the backpack, with one finger.
[7.stood]    I felt bad for him. So I stood up.
[7.down]     I said, "Put him down."
[7.looked]   Brick looked at me. Then he looked at what was in my hands.
[7.head]     I looked too. I was holding a head.
[7.sat]      I sat down again.

# clip 05-suit
[8.night]    That night I put the head on my desk and stared at it.
[8.how]      How do you use a head?
[8.button]   And there, at the back, under the dust, was one small button.
[8.press]    I pressed it.
[9.opened]   The head opened, like a helmet.
[9.on]       So I put it on.
[9.metal]    Metal ran down my neck. Over my arms. Down my legs. All the way to my toes.
[9.suit]     It was never a broken robot. It was a suit.

# clip 06-forest
[10.forest]  I went to the forest, where nobody could see me fall over.
[10.beam]    I held out my hand, and a beam of light cut a tree in half.
[10.feet]    Then my feet lit up, and I was flying.
[10.badly]   Badly. But flying.
[11.saw]     Then I saw somebody below me, between the trees.
[11.old]     An old man, alone, with his legs shaking.
[11.lost]    I thought he was lost. I thought he needed help.
[11.landed]  So I landed, and I walked over to him.

# clip 07a-suit
[12.suit]    In half a second, he was not an old man. He was wearing a suit too.
[12.katana]  A katana slid out of his arm, and he jumped at me.
[12.duck]    My helmet said one word: "Duck."
# clip 07b-ducked wait 0.5
[12.ducked]  I ducked. The blade went over my head and into a tree.
# clip 07c-again wait 1.0
[12.again]   He spun around and tried again. And again. And again.
[12.back]    I went backwards so fast I ran out of forest.
[12.up]      So I went up.
# clip 07d-chase wait 0.8
[12.follow]  He looked up at me. Then his feet lit up too.
[12.chase]   He chased me over the trees, and he was a lot better at flying than I was.
# clip 07e-dodge wait 0.6
[12.dodge]   I went left. He went left. I went up. He was already there.
# clip 07f-beam wait 0.9
[12.beam]    I threw a beam of light at him. He cut it in two.
# clip 07g-swat wait 1.0
[12.swat]    Then he bumped me out of the sky, and down I went.
# clip 07h-hole wait 1.0
[12.hole]    I landed so hard I made a hole shaped like me.
# clip 08a-cannon wait 0.6
[13.cannon]  His other arm folded open into a cannon.
[13.fired]   He pointed it at me, and it lit up.
[13.reboot]  I tried to get up. My suit said, "Rebooting. Please wait."
# clip 08b-bush wait 0.5
[14.bush]    Then somebody jumped out of the bush. It was Nora.
# clip 08c-shield wait 0.3
[14.slide]   She slid in front of me and threw her shield open.
[14.blast]   The blast hit it and went straight up into the sky.
[14.push]    It pushed her back, one step, then two. But nothing got through.
[14.gone]    The old man looked at her. He looked at me. And then he was gone.
# clip 09-end
[15.who]     I said, "Who was that? Why me?"
[15.threw]   She said, "That is the one this town threw out."
[15.broke]   "He got his robot at eighteen, like everybody. He used it to break things."
[15.took]    "They took it away from him, a long time ago."
[15.helmet]  Then she looked at my helmet, and she went white.
[15.same]    "No way. That is the same robot as his."
# clip 10-sub wait 1.0
[15.sub]     Like and subscribe for part two.
```

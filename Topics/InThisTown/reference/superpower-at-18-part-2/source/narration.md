# Narration — In This Town, Everyone Got a Superpower at 18, Part 2

**Status: APPROVED by the owner ("awesome cant wait for the mp4"). Do not change a line.** The story is the owner's own
outline, beat for beat. No shot is built until he approves the script.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word. Part one is
`src/videos/in-this-town-superpower-at-18/` (and `Topics/InThisTown/reference/superpower-at-18/`): same town, same
cast, same voice. This film starts on the second part one stopped.

**Length: the long cut**, like part one. `film.tsx` has no `cut` line.

**The owner's outline.** While the teller is getting up, Tip (the friend who brags about north) jumps the brother, and
is flung too. The teller acts fast: both arms in the mud, a green glow, roots chase the falling friend, and a giant leaf
catches him. He is exhausted, and confused that he could do this all along. The brother points; his fingertip glows red
and fires lava; the teller dodges by growing a tree under his feet. The brother flies; the teller glides away on a leaf
wing; the brother stops, makes a white-hot fire sniper shot, and shoots the wing. He falls, not far, and finds he has led
his brother to the villagers, his friends and his mother: a bad plan. The brother makes a lava wall and pushes it at
them. With no other choice the teller raises a finger and closes his eyes (**the camera closes its eyes too**). He opens
them: the lava wall is a GRASS wall. He pushes it back, and it grows rose thorns. The brother does not react in time and
is dizzy. The teller sprints; everything goes slow motion; he thinks "Brother, why did you choose this path? I do not
see you as my enemy, but my brother." The brother kneels, looks up, looks down: "You win. Do it." The teller raises his
hand, and offers it, smiling: "Let's go back the way it was, okay?" The brother expects worse and believes he cannot be
forgiven. He is shown he is wrong. He shakes the hand. **"1 week later" on the screen**: he gives the stolen powers
back, the two of them fix the houses, happy ending.

Added by the agent, for the owner to keep or cut: Tip's "north" jokes; "A power that gives life could take one"
(the owner's own thought, used as the held breath before the hand); the pigs; the four plates, with **three** used
(the father is still not explained, as in part one); the daisy at the brother's door.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**. Each `# clip` is one recording, saved to
  `public/audio/in-this-town-superpower-at-18-part-2/raw/<clip>.mp3`; then
  `python3 scripts/narration.py build in-this-town-superpower-at-18-part-2`.
- The teller wears RED. His brother wears BLACK. Same model; only the shirt differs.

What part one planted, and where this pays it off:

| Planted in part one | Pays off here |
|---|---|
| The brother offers a hand; "I got up by myself" (12.hand, 12.up) | The teller offers his hand, and it is taken (15.open, 16.shook) |
| Tip's north (7.tip, 7.told) | 2.north (once; the owner cut the second north joke) |
| Bo's jump is taken (15.light) | It is given back (17.bo) |
| He kicked the pigs (3.pigs) | He says sorry to them (17.pigs) |
| The four plates (5.plates) | Three are used (18.three). The fourth is still the father's |
| One daisy (9.daisy) | One daisy at the brother's door (18.daisy) |

```narration
# clip 01-recap
[1.town]     In this town, everyone got a superpower at eighteen.
[1.mine]     Mine was one daisy. I hated it.
[1.his]      My twin brother's was taking other people's powers.
[1.back]     He came back with a hundred of them, and he burned my town.
[1.life]     Then I found out what the daisy was. My power was life.
[1.know]     So I told him, "I know how to beat you."
[2.lie]      That was a lie. I had no idea.
[2.up]       I was still getting up out of the mud

# clip 02-tip
[2.tip]      when Tip ran at him. Tip, whose whole power was knowing which way was north.
[2.look]     My brother looked him in the face.
[2.fling]    And flicked him, too.
[2.north]    Tip went up over the rooftops, shouting, "North! I am going north!"
[3.fast]     I did not think. I put both arms into the mud.
[3.green]    They glowed green.
[3.roots]    Roots came out of the ground and raced after him,
[3.chase]    over the pig pen, over the well, faster than he fell.
[3.leaf]     And just before he hit the road, the roots grew one giant leaf.
[3.catch]    Tip landed in it like a baby in a blanket.

# clip 03-lava
[4.tired]    Then my knees gave out.
[4.big]      A leaf that big takes a lot out of you.
[4.along]    And I could do that the whole time? Nobody told me.
[5.point]    My brother pointed at me.
[5.red]      The tip of his finger glowed red.
[5.lava]     Lava came out of it.
[5.tree]     I grew a tree under my own feet, and it threw me out of the way.
[5.breath]   I got one breath.

# clip 04-wing
[6.fly]      Then he was flying. Of course he could fly.
[6.wing]     So I grew a leaf across my back, as wide as a door,
[6.glide]    and I jumped, and the wind took me.
[6.me]       I was gliding. Me. The daisy boy.
[7.stop]     He stopped chasing me.
[7.aim]      He held out one arm, shut one eye, and made a spear of fire. White hot.
[7.shot]     It went through my wing like paper.
[7.fell]     I fell. Luckily, not far.

# clip 05-wall
[8.land]     I landed in the square, and I looked up.
[8.them]     My mother. Bo. Mira. Tip. Half the town, hiding behind the well.
[8.led]      I had led him straight to everyone I loved.
[8.plan]     Bo said, "Was that the plan?" It was not a plan.
[9.wall]     Far down the street, my brother raised both hands,
[9.lava]     and a wall of lava came up out of the road.
[9.high]     As high as the bell.
[9.push]     He pushed it towards us.
[10.none]    I had no leaf for that. No tree. No idea.
[10.finger]  So I raised one finger.
[10.eyes]    And I closed my eyes.
[10.heat]    I felt the heat on my face.
[10.cool]    Then I did not.
[10.open]    I opened them.

# clip 06-grass
[11.grass]   The wall of lava was a wall of grass.
[11.how]     Do not ask me how. I still do not know.
[11.mine]    But it was mine now.
[12.push]    So I pushed it back.
[12.thorns]  And as it went, it grew roses. Then it grew the thorns.
[12.late]    My brother had a hundred powers, and not one second to pick one.
[12.hit]     It hit him like a garden falling off a roof.
[12.dizzy]   He stood there, swaying, with a rose in his hair.
[13.chance]  This was my chance. I ran at him.
[13.slow]    And everything went slow.
[13.thought] I thought: Brother. Why did you choose this path?
[13.enemy]   I do not see an enemy.
[13.brother] I see my brother.

# clip 07-hand
[14.kneel]   He was so dizzy that he went down on his knees.
[14.up]      He looked up at me.
[14.down]    Then he looked down, and he said,
[14.win]     "You win. Do it."
[15.hand]    I raised my hand.
[15.take]    A power that gives life could take one. He knew it. So did I.
[15.open]    I opened it, and I held it out.
[15.smile]   And I smiled, and I said, "Let's go back to the way it was. Okay?"
[16.worse]   He looked at me like he was waiting for something worse.
[16.believe] He believed he could not be forgiven.
[16.wrong]   He was wrong, and I stood there until he knew it.
[16.look]    He looked at my hand.
[16.shook]   And he shook it.

# clip 08-week
[17.week]    One week later.
[17.gave]    My brother walked from village to village, and gave every power back.
[17.bo]      Bo got his jump. He has not stopped since.
[17.fix]     And the two of us fixed every house we broke. He carries. I grow the wood.
[17.pigs]    He says sorry to the pigs every morning. The pigs are thinking about it.
[18.plates]  That night, my mother set four plates.
[18.three]   And for the first time in ten years, three of us sat down.
[18.daisy]   Outside his door, there is one small daisy. I did not put it there.
[18.sub]     Like and subscribe for more.
```

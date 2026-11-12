# Narration — In This Town, Everyone Got a Superpower at 18

**Status: DRAFT 2, recorded so the owner can hear it. The script is NOT approved yet.** The story is the owner's.
Draft 1 ended with a rain cloud putting the brother out and the father coming home; the owner: "the ending was
disappointing... make their powers actually look good... I need something like a realization". Draft 2 is the owner's
outline: he hates his power and never uses it; he wakes to chaos; his house explodes; his brother offers a hand and a
place in his kingdom; he sees his mother far off, pushes his brother, and the brother does not move; the brother's
power is taking powers; he is flung, feels nothing, sees grass and a flower under his hands, "Did I do this?", and
understands his power is life. It ends on a cliffhanger. Nobody has listened to the recording: the agent cannot hear
audio. No shot is built until the owner approves the script.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word. Copy the SHAPE of the model,
`src/videos/in-this-town-same-face/narration.md`, never its story.

**Length: the long cut, two and a half to three minutes** (the owner: "make this at least 2 minutes so that it feels
complete"). `film.tsx` has no `cut` line.

**The premise, in four sentences.** In this town everyone gets a superpower at eighteen, and every one of them is
small. My twin brother, who hurt animals and laughed, was taken away at eight to be taught kindness, and my father never
came back with him. At eighteen I got one daisy, hated it, and never used it; my brother, over the hills, got the power
to take other people's powers, and came back with a village's worth. Thrown into the mud and waiting for the end, I
find grass under my hands: my power was never a flower, it was life.

**One sentence:** He can take a hundred powers and every one of them only breaks things; mine is the only one that makes.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**. Each `# clip` is one recording, saved to
  `public/audio/in-this-town-superpower-at-18/raw/<clip>.mp3`; then
  `python3 scripts/narration.py build in-this-town-superpower-at-18`.
- The teller wears RED. His brother wears BLACK. They are the same model; only the shirt differs.
- Mother, father and the three friends (Bo, Mira, Tip) are villagers.
- It is part one. It ends on "I know how to beat you", not on the fight.

The powers:

| Who | Power | What it does in the story |
|---|---|---|
| Mother | Finds any lost sock | She is still holding one when he sees her (13.sock) |
| The oldest man | Breathes underwater for two seconds | Nothing |
| Bo | Jumps one block higher than anyone | He jumps at the brother, and the brother takes it (15.bo to 15.jumped). That is how we SEE what the brother's power is |
| Mira | Makes bread warm again | Envied (10.them) |
| Tip | Always knows which way is north | "It came from the north!" (11.tip) |
| The brother | Takes powers by touch. He arrives with fire, explosions and strength, all taken | The threat |
| Me | Life. It looks like one daisy | Grass where he sleeps (10.grass), no pain when thrown (17.nothing), grass under his hands (17.mud), the pig's ear (17.pig) |

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| He kicked the pigs and laughed (3.pigs) | He talks to people the way he talked to the pigs (13.pigs); a pig is the first thing healed (17.pig) |
| "What would the bell give a boy who kicked pigs?" (8.plant) | The power to take (15.took) |
| One daisy (9.daisy) | One daisy in the mud (17.daisy) |
| The grass was greener where I slept (10.grass) | The mud is grass where his hands were (17.mud) |
| "I will be back soon" (4.soon); the four plates (5.plates) | Not paid off. "He only smiled" (13.father). It is part two's question |
| Bo could jump (7.jump) | It is taken in front of him (15.light, 15.jumped) |

```narration
# clip 01-hook
[1.town]     In this town, everyone got a superpower
[1.day]      on the day they turned eighteen.
[1.bell]     The bell rang once, and you had one.
[2.who]      Nobody knew who handed them out.
[2.good]     And nobody got a good one.
[2.mother]   My mother could find any lost sock.
[2.socks]    Only socks.
[2.old]      The oldest man could breathe underwater.
[2.two]      For two seconds.
[3.twins]    I was born on the same day as my brother.
[3.shirts]   I wore red. He wore black.
[3.pigs]     He also kicked the pigs.
[3.sheep]    He pushed the sheep into the pond, and he laughed.
[3.me]       I pulled them out. He laughed at that too.

# clip 02-father
[4.father]   One morning, my father took him by the hand.
[4.village]  He said a village over the hills could teach a boy to be kind.
[4.soon]     He said, "I will be back soon."
[4.road]     I watched them go until the black shirt was a dot.
[5.wait]     I waited at the gate that night.
[5.next]     And the next night.
[5.winter]   Then it was winter.
[5.ten]      Then it was ten winters.
[5.forgot]   After a while, I forgot what he looked like.
[5.plates]   But every night, my mother set four plates.

# clip 03-growing
[6.help]     So I grew up helping.
[6.water]    I carried my mother's water.
[6.roof]     I fixed the baker's roof.
[6.friends]  And I had three friends: Bo, Mira, and Tip.
[6.good]     It was actually a pretty good life.
[7.bo]       Bo turned eighteen first. The bell rang.
[7.jump]     He could jump one block higher than anyone else.
[7.mira]     Mira could make any bread warm again, just by touching it.
[7.tip]      Tip always knew which way was north.
[7.told]     He told us. Constantly.

# clip 04-mine
[8.plant]    Somewhere over the hills, my brother was turning eighteen too.
[8.what]     What would the bell give a boy who kicked pigs?
[9.bell]     In the morning the bell rang, and the whole town watched.
[9.nothing]  For a second, nothing happened.
[9.daisy]    Then one small daisy came up next to my foot.
[9.that]     That was it. That was my power.
[9.town]     The town laughed for a week.
[10.hate]    I hated it.
[10.them]    Bo could jump. Mira had warm hands. Even Tip had north.
[10.me]      I had a flower.
[10.envy]    Every evening they showed off at the bell. I went home early.
[10.never]   So I never used it. Not once.
[10.grass]   I never noticed that the grass was always greener where I slept.

# clip 05-chaos
[11.woke]    Then one morning, I woke up to screaming.
[11.street]  The street was full of smoke.
[11.tip]     Tip ran past shouting, "North! It came from the north!"
[11.mom]     Where was my mother? What was happening?
[11.boom]    I got to the door, and my house exploded.
[11.ground]  I landed on my back in the road.
[12.smoke]   Someone was standing in the smoke.
[12.shirt]   A black shirt.
[12.brother] My brother. Eighteen, and smiling.
[12.hand]    He held out his hand to help me up.
[12.up]      I got up by myself.

# clip 06-offer
[13.king]    He said, "I have a kingdom now, over the hills."
[13.want]    "Everyone in it does what I say. I want my brother beside me."
[13.pigs]    He said it the way he used to talk to the pigs.
[13.father]  I asked where our father was. He only smiled.
[13.behind]  I looked behind me.
[13.roofs]   Every roof was burning. Everyone I knew was running.
[13.mother]  And then I saw her. My mother, far down the road, looking at me.
[13.sock]    She was still holding one sock.
[14.anger]   Something in my chest went hot.
[14.push]    I pushed him as hard as I could.
[14.inch]    He did not move an inch.

# clip 07-power
[15.bo]      Then Bo jumped at him, one block higher than anyone.
[15.caught]  My brother caught him by the arm.
[15.light]   Bo's jump went out of him like a light.
[15.jumped]  And my brother jumped. One block higher.
[15.saw]     That was when I saw it.
[15.not]     His power was not fire. It was not explosions. It was not strength.
[15.took]    His power was taking powers. A whole village of them.
[15.scared]  I was not angry any more. I was scared.
[16.flick]   He flicked me with one finger.
[16.flew]    I flew over the well, over the bell, and into the mud by the pig pen.

# clip 08-life
[17.nothing] It should have broken everything. I felt nothing.
[17.wait]    He walked towards me, slowly. I waited for the end.
[17.hands]   Then I saw my hands.
[17.mud]     I lifted them. Where they had been, the mud was grass.
[17.daisy]   With one daisy in it.
[17.did]     "Did I do this?"
[17.pig]     The pig beside me had a burned ear. I touched it. The ear grew back.
[18.life]    My power was never a flower. My power was life.
[18.break]   He had a hundred powers, and all of them could only break.
[18.know]    I stood up, and I said, "I know how to beat you."
[18.sub]     Like and subscribe for part two.
```

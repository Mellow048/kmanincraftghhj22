# Narration — In This Town, I Live in a Monster Village

**Status: the owner asked for the mp4 on the outline** ("make the main character be friend with him since their both
humans, they must have something in common and do the big reveal in the ending. then make the mp4").

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word.

**Length: the extended cut** (`cut: "extended"` in `film.tsx`; `Topics/InThisTown/topic.json` → `cuts.extended`). The owner asked for a longer ending after the first render: an ambush, the village accepting Mo, a second army, and Mo staying behind alone in iron armour. He also asked for a school and for more than one monster of each kind.

**The owner's outline.** The teller lives in a village of monsters: zombies, skeletons, a creeper, an enderman, a
spider, a slime (the pack's `monsters.tsx`). He is the only human. One villager, a zombie in a straw hat with a scarf
pulled up, becomes his friend; the two have things in common. The ending is the big reveal: "I'm human too."

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**. Each `# clip` is one recording, saved to
  `public/audio/in-this-town-monster-village/raw/<clip>.mp3`; then
  `python3 scripts/narration.py build in-this-town-monster-village`.
- The teller wears YELLOW. Mo is the zombie in the straw hat and the red scarf.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| The sun burns monsters; it does not burn the teller (3.sun, 3.me) | Mo sits in the sun: "It is the hat" (5.burn); 17.list |
| Grey stew he cannot eat (3.stew) | Mo's bread (5.bread, 5.eat); 17.list |
| He cannot see in the dark (3.dark) | Mo's lantern (6.lamp); 17.list |
| Mo looks at him a bit too long (4.stare, 4.think) | Why he was looking (17.why, 17.basket) |
| The basket (1.me) | Who carried it (17.basket) |
| The door locked from outside (7.lock, 7.weak) | The ring, facing out (9.ring, 9.out) |
| Hiss the creeper wants hugs (2.hiss) | Hiss trying not to go off (11.hiss) |
| "The only one of me there was" (3.one) | "I am human too" (16.say) |

```narration
# clip 01-hook
[1.town]     In this town, I was the only one who was not a monster.
[1.mum]      My mum was a zombie.
[1.dad]      My dad was a skeleton.
[1.me]       And I was a boy they found in a basket.
[2.hiss]     Our neighbour Hiss was a creeper. He loved hugs. Nobody wanted one.
[2.post]     The postman was an enderman. You could not look at him,
[2.sign]     so we all signed for our parcels with our eyes shut.
[2.bus]      The school bus was a slime. You got in. You got out wet.
[2.school]   School was me, some zombies, and two creepers.
[2.board]    The teacher was an enderman. So nobody ever looked at the board.

# clip 02-different
[3.sun]      Every monster stayed out of the sun. The sun burned them.
[3.me]       It did not burn me. So I played outside alone.
[3.stew]     They ate grey stew. I could not even smell it.
[3.dark]     They could see in the dark. I walked into doors.
[3.one]      I was the only one of me there was.
[4.mo]       Then there was Mo.
[4.hat]      Mo was a zombie with a straw hat, and a scarf up to his nose.
[4.alone]    He lived by himself at the end of the street, and he never said a word.
[4.stare]    He just looked at me. A bit too long.
[4.think]    I thought he did not like humans.

# clip 03-bread
[5.wall]     One day I was on the wall, in the sun, hiding my stew in a bush.
[5.sat]      Mo sat down next to me. In the sun.
[5.burn]     He did not burn. "It is the hat," he said.
[5.bread]    Then he took out a loaf of bread, and broke it in half.
[5.eat]      No zombie eats bread. I did not ask. I was too hungry.
[6.every]    After that, we sat on that wall every day.
[6.lamp]     He could not see in the dark either. He carried a lantern, like me.
[6.cold]     He got cold at night, like me.
[6.sneeze]   He even sneezed. Monsters do not sneeze.
[6.fish]     He showed me how to fish, and how to whistle,
[6.laugh]    and I showed him how to laugh, which he had forgotten.
[6.like]     He was the only monster who was like me. I never asked myself why.

# clip 04-lock
[7.sunset]   There was one rule. At sunset, the whole village walked me home.
[7.lock]     Then they locked my door. From the outside.
[7.weak]     I thought it was because I was the weak one.
[7.mo]       Even Mo stood there and watched them do it.
[8.night]    One night, I had had enough.
[8.window]   I went out of the window.
[8.see]      I wanted to see what they did without me.
[8.nothing]  They were not doing anything.

# clip 05-ring
[9.ring]     They were standing in a ring around my house. All of them.
[9.out]      And they were facing out.
[9.every]    They did it every night. They had done it since the basket.
[9.hill]     Then I saw why. There were torches on the hill.
[10.players] Players. With swords.
[10.clear]   They had come to clear the village.
[10.shout]   "Monsters!" one shouted. "Get them all!"
[11.charge]  They came down the hill fast.
[11.dad]     My dad lost an arm, picked it up, and bonked a man with it.
[11.bus]     The bus sat on three of them.
[11.post]    The postman put one at the top of a tree.
[11.hiss]    And Hiss shook, and went white, trying so hard not to go off.
[11.losing]  Nobody was hurt. And we were losing.

# clip 06-run
[12.mum]     Then they knocked my mum over in the dirt.
[12.think]   And I thought: they are players. I look like a player.
[12.only]    I was the only thing in that village they would not touch.
[13.ran]     So I ran. Under a sword, over the bus, through my dad's legs,
[13.front]   and I stood in front of my mum with my arms out.
[13.stop]    "Stop! I live here! This is my family!"
[14.quiet]   It went quiet. A big player looked down at me.
[14.trick]   "It is a trick," he said. "It is one of them, dressed up."
[14.sword]   And he lifted his sword.
[14.eyes]    I shut my eyes.

# clip 07-reveal
[15.clang]   It did not land.
[15.mo]      Mo was there. He had caught the sword in his bare hand.
[15.red]     And his hand was bleeding. Red.
[15.zombie]  Zombies do not bleed red.
[16.scarf]   He pulled the scarf down.
[16.paint]   He wiped his cheek with his sleeve, and the green came off.
[16.skin]    There was skin under it. Skin like mine.
[16.say]     "Do not look so surprised," he said. "I am human too."

# clip 08-end
[17.list]    The bread. The lantern. The sneeze. The sun.
[17.why]     He had not been looking at me because he hated humans.
[17.basket]  "Who do you think carried the basket here?" he said.
[18.player]  The big player took one step back. He knew that face.
[18.you]     "You," he said. "The player who ran away to live with monsters."
[18.hunt]    They had not come for the village. They had come for him.

# clip 09-ambush
[19.look]    Every player was staring at Mo. Not one of them looked behind.
[19.tap]     My dad tapped one on the shoulder. With the arm he was not wearing.
[19.bus]     The bus rolled through the rest like a bowling ball.
[19.hiss]    And Hiss only had to say one word. "Hug."
[19.run]     They dropped their swords and ran for the hill.

# clip 10-accept
[20.gather]  Then the whole village came out. Every zombie. Every skeleton. Every kid from my school.
[20.mo]      Mo stood in the middle, with his hat in his hands. He did not look up.
[20.fear]    He had lied to them for years. He thought they would hate him too.
[20.mum]     My mum walked up to him. And put the hat back on his head.
[20.knew]    "We always knew," she said. "Zombies do not eat bread."

# clip 11-army
[21.boom]    Then something blew up in the forest.
[21.army]    Players. Not ten of them. Hundreds, pouring out of the trees.
[21.order]   "Run," Mo said. "East, past the pond. I dug a hideout for you, years ago."
[21.ran]     So we ran. Everybody ran.

# clip 12-alone
[22.back]    At the last house, I looked back. Mo was not with us.
[22.alone]   He was standing in the street. Alone.
[22.armor]   He put on an iron helmet. An iron chestplate. And he drew a sword.
[22.sub]     Like and subscribe for part two.
```

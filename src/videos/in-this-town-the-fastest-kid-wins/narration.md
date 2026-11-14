# Narration — In This Town, the Fastest Kid Wins (part 1)

**Rework 2026-11-14 (his review).** Part 1 ends at the rivers in second place, with the same shoes on the winner: all his. Added by the agent: the race has four stages with a rest camp after each; stage one runs the village road, the wheat fields and a birch wood; the trophy waits at the end of stage four.

**Status: the owner's own outline (2026-11-14), reworked to his review of the first cut: part 1 now ENDS AT THE RIVERS, the end of
the first of four stages. The runner in black is first there, the teller is second, he celebrates, sits down to wait, and sees the shoes.** His outline is kept word for word in `Topics/InThisTown/outlines/README.md`; every beat
of it is here, in his order, and his lines are kept ("Do you want to win?", "3, 2, 1, GO!", the places 15th, 11th,
9th, 6th, 2nd). Part 1 of at least three: stage one only. His words for the new end: "2nd place but it was okay", "sat down happy waiting
for others", "has the same SHOES!?!?", one second, then the subscribe line. Added by the agent: the race has four stages with a
rest camp after each (his "every biome you can rest and wait for others"); the wheat fields and the birch wood on the way to the rivers.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/OWNER.md` and `SCRIPT.md` before changing a word.

- One teller, first person, past tense. Fast and plain: about 250 words a minute, no gaps.
- Each `[cue]` line is **one shot**. Each `# clip` is one recording, saved to
  `public/audio/in-this-town-the-fastest-kid-wins/raw/<clip>.mp3`; then
  `python3 scripts/narration.py build in-this-town-the-fastest-kid-wins`.
- The teller wears YELLOW. He is eighteen and small for it.
- What the agent added, to be shown to the owner: the baby villager is one runner who keeps beating him (his line
  was "even a baby villager can out pace me"); the empty shelf (his "trophy for your parents to be proud"); the pond
  and the bush as what the first two buttons do; mum, dad and dad's sign at the start line.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "A baby villager could beat me" (1.baby) | He passes the baby in the forest and waves (8.six) |
| The empty shelf (1.now) | "Yes," I said (3.yes); the trophy waits at the end of stage four, in a later part |
| "I am just trying to get rid of them" (4.free) | The runner in first place has the same shoes (8.same) |
| Three buttons (6.off) | The third is just right (6.right); part two: what the others do |

```narration
# clip 01-hook
[1.town]     In this town, the fastest kid wins a trophy. Every single year.
[1.slow]     And I was the slowest kid in town.
[1.baby]     A baby villager could beat me. One did. Twice.
[1.want]     I had wanted that trophy since I was ten years old.
[1.now]      Now I was eighteen. And my shelf was still empty.

# clip 02-train
[2.train]    So I trained. Every single day.
[2.hill]     I ran up the hill. I ran round the pond.
[2.push]     I did push ups. I did one.
[2.sweat]    I sweated so much that the chickens moved away from me.
[2.fail]     And every single day, I lost. To the same baby.
[2.week]     The race was one week away. I had to get fast, and I had to do it quickly.

# clip 03-forest
[3.night]    That night, I could not sleep.
[3.forest]   So I went out to the forest, alone, and I trained in the dark.
[3.tired]    I ran until my legs gave up. Then I lay down in the leaves.
[3.witch]    That is when I saw her. A witch, behind a tree, waving at me.
[3.win]      "Do you want to win?" she said.
[3.yes]      I thought about my mum, and my dad, and that empty shelf. "Yes," I said.

# clip 04-shoes
[4.shoes]    She took out a pair of shoes.
[4.money]    "But I have no money," I said.
[4.free]     "No worries," said the witch. "I am just trying to get rid of them."
[4.hmm]      That should have worried me. It did not.
[4.stump]    I sat down on a tree stump, and I put them on.
[4.gone]     When I looked up, the witch was gone.
[4.love]     I did not care. I loved my new shoes.

# clip 05-light
[5.run]      So I ran.
[5.slow]     And the whole world slowed down.
[5.leaf]     A leaf hung in the air, right in front of my nose.
[5.bird]     A bird hung in the sky with its wings open.
[5.real]     But the world was not slow. I was fast. I was running at the speed of light!
[5.pond]     I ran across the pond. On top of it.
[5.cheat]    Then I stopped. This was cheating. And everybody would know.

# clip 06-buttons
[6.off]      So I took the shoes off. And on the side of one, I saw three buttons.
[6.one]      The first one was on. It said, light speed.
[6.two]      I pressed the second one, and I ran. It was still much too fast. I went through a bush.
[6.three]    So I pressed the third one, and I ran again.
[6.right]    Fast. But not too fast. It was perfect. Nobody would suspect a thing.

# clip 07-race
[7.week]     One week later, I was on the start line.
[7.long]     It was a long race, in four parts. Out of the village, and over to the rivers.
[7.far]      Then across the desert, through the dark oak forest, and into the next village.
[7.rest]     After every part, you could rest, and wait for the others.
[7.twenty]   There were twenty other runners. Players, villagers, and that baby.
[7.sign]     My mum and dad were there. My dad had made a sign.
[7.count]    Three. Two. One. Go!

# clip 08-places
[8.fifteen]  On the village road, I was in fifteenth place.
[8.eleven]   In the wheat fields, I was eleventh. Then ninth.
[8.six]      In the birch wood, I was sixth. I went past the baby. I waved.
[8.two]      Then I was second! I could see the rivers. I could see the finish flag.
[8.one]      There was only one runner in front of me. And I could not catch him.
[8.line]     He went over the line first. I was second.
[8.cele]     Second! I had never been second at anything. I jumped. I danced.
[8.okay]     It was not first. But it was okay.
[8.sit]      So I sat down by the river, happy, and I waited for the others.
[8.look]     The winner sat down too. I looked at his feet.
[8.same]     He was wearing the same shoes.

# clip 09-sub wait 1.0
[9.sub]      Like and subscribe for part two.
```

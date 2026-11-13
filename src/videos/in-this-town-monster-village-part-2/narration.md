# Narration — In This Town, I Live in a Monster Village, Part 2

**Status: the owner approved this script** ("yes perfect script, now go make the mp4"). The story is his outline:
the hideout that looks like mud, dad falling through it, the doubt ("maybe this is a trap"), the players searching the
wrecked pig farm, Mo's diary ("I love my monsters"), and the boy going back alone to find Mo's sword and helmet.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word.

**Length: the medium cut** (`cut: "medium"` in `film.tsx`; `Topics/InThisTown/topic.json` → `cuts.medium`): the
approved script is longer than the short cut and shorter than the long one, and it is not to be padded or trimmed.

Follows `src/videos/in-this-town-monster-village` (part one) and uses its people, its village and its kit.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**. Each `# clip` is one recording, saved to
  `public/audio/in-this-town-monster-village-part-2/raw/<clip>.mp3`; then
  `python3 scripts/narration.py build in-this-town-monster-village-part-2`.
- The teller wears YELLOW. Mo is the man in the straw hat, the red scarf and, at the end of part one, iron.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "All we found was a wrecked pig farm" (1.farm) | The door painted like mud (2.door); "there were the pigs" (3.animals); the players see only a wrecked pig farm (5.farm, 5.left) |
| Dad's arm comes off (part one) | "With both arms, for once" (2.wave); his arm comes away with the boy (7.arm) |
| "Where is Mo?" (3.hiss) | "I had only one thing in my head" (7.head); the sword and the helmet (7.sword, 7.gone) |
| "Maybe this is a trap" (4.trap) | "I love my monsters" (6.love); "I was wrong" (6.wrong) |
| The enderman teacher (part one, 2.board) | He is the one who doubts, and the one who takes it back |

```narration
# clip 01-hook
[1.town]     In this town, I was the only one who was not a monster.
[1.left]     And we had just left my only human friend behind.
[1.ran]      Mo told us to run east, past the pond. So we ran.
[1.farm]     He said there was a hideout. All we found was a wrecked pig farm.
[1.mud]      Broken fence. No pigs. And mud. A lot of mud.

# clip 02-fall
[2.nothing]  "There is nothing here," said my mum.
[2.step]     Then my dad took one more step, and the mud ate him.
[2.hole]     We all looked down the hole.
[2.wave]     He was waving up at us. With both arms, for once.
[2.door]     It was not mud. It was a door, painted to look like mud.

# clip 03-hideout
[3.room]     Under it was a room as big as the village square.
[3.floor]    The floor was wood. There was a well of clean water.
[3.food]     There were shelves of food, right up to the roof.
[3.animals]  There were chickens. There were cows. There were the pigs.
[3.cheer]    Everybody cheered. The bus jumped in the well.
[3.hiss]     Then Hiss looked around, and said two words. "Where is Mo?"
[3.knew]     I looked down at my feet. I did not have to say it. They already knew.

# clip 04-doubt
[4.ender]    Then one enderman spoke. The teacher.
[4.trap]     "Maybe this is a trap," he said.
[4.why]      "Why would a player give himself up for monsters?"
[4.hole]     "Maybe he wanted us all in one hole. So they could get rid of us all at once."
[4.silent]   I did not say a thing.
[4.think]    And one by one, everybody started to think it.
[4.looks]    My mum looked at the door. My dad looked at the food. Hiss started to hiss.

# clip 05-players
[5.boots]    Then we heard them. Boots. Right above us.
[5.lid]      I climbed the ladder, pushed mud over the lid, and pulled the door shut.
[5.farm]     From outside, it was only a wrecked pig farm again.
[5.breath]   We held our breath. The skeletons held their bones.
[5.looked]   They looked. And they looked. And they looked.
[5.stood]    One of them stood on the door. The door did not move.
[5.left]     "Nothing here but mud," he said. And they left.
[5.sigh]     Forty monsters sighed at the same time.

# clip 06-diary
[6.explore]  After that, we explored. It was clean. It was warm. It was cosy.
[6.rooms]    There was a room for every family, with the name on the door.
[6.last]     The last door had no name. It was Mo's room.
[6.bed]      A bed. A spare straw hat. And a diary, on the pillow.
[6.open]     I opened it. Every page said the same thing.
[6.love]     "I love my monsters."
[6.smile]    I smiled. Then I turned round.
[6.behind]   The whole village was standing behind me, reading over my shoulder.
[6.wrong]    The enderman looked at the floor. "I was wrong," he said.
[6.liked]    "Maybe he really did like us."

# clip 07-out
[7.ladder]   I went up the ladder and lifted the lid. Nobody was there.
[7.grab]     I climbed out. My dad grabbed for me.
[7.arm]      He got my shirt. I got away. His arm came with me.
[7.head]     I had only one thing in my head. Where is Mo?
[7.ran]      I ran, and I ran.
[7.tree]     Then I saw players on the road, and I hid behind a tree.
[7.houses]   So I went through the houses instead. In one door, out the window, into the next.
[7.street]   House by house, all the way back to my street.
[7.ground]   And there, in the middle of it, on the ground.
[7.sword]    Mo's sword. And Mo's helmet.
[7.gone]     Mo was not there.
[7.sub]      Like and subscribe for part three.
```

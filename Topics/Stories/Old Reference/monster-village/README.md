# Reference: "In This Town, I Live in a Monster Village" (part one)

**Approved by the owner** ("i liked the superhero and this one"), and kept here at his request with its source, so
the next agent can build like it. A boy is the only human in a village of monsters who are his family; the one
player who watches him, Mo, turns out to have been guarding them all along.

| File | What it is |
|---|---|
| `in-this-town-monster-village.mp4` | **The film as delivered**: 1080×1920, 2:55, 74 shots, full sound. A copy of `renders/in-this-town-monster-village.mp4` |
| `contact-sheet-every-5-seconds.jpg` | One frame every five seconds, on one sheet. An agent cannot watch a video: read this first |
| `shot-log.md` | Every shot on one page: start, length, words, place, camera, and why this picture |
| `source/` | A **snapshot** of the source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene10.tsx`, `film.tsx`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-monster-village/`. `source/` is a copy to read; it is not
compiled and nothing imports it.

## Cut down to a Short on 2026-11-13

It was delivered at 3:41 as an "extended cut" the topic used to allow. **A vertical video over 3:00 is not a
YouTube Short**: YouTube filed it as a long video, and the owner asked for it to be trimmed. 21 lines came out
(the postman, the school, the stew, walking into doors, fishing and laughing, Dad's arm, the bus in the fight and in
the ambush, and a few single lines), with no new recording: `scripts/trim-narration.py` cuts lines out of the
recorded clips. It is now 2:55, 74 shots, 713 words. The extended cut no longer exists in `topic.json`.
The 3:41 version is in git history (`renders/in-this-town-monster-village.mp4` before this date).

## Why this one travelled: a study (2026-11-15)

The owner, 2026-11-15: "that video got me like.. 5k views on shorts … i have no idea what i did there, and i have no
idea why people loved it and youtube kept pushing it, so i need you to study that short and make a similar one". His
other films sat at about 1.3k.

**What this is and is not.** It is one film against the rest, read from its script, its shots and its first frames.
Nobody here has seen his analytics, so every point below is a reasoned guess, not a measurement. What can be said for
certain is what this film has that the 1.3k films do not.

**It is not the pace.** The first fifteen seconds hold 7 shots and 69 words, the same as every other film of the topic
(6 to 10 shots, 59 to 83 words). So the difference is in what is shown and said.

| # | What this film does | What the 1.3k films do |
|---|---|---|
| 1 | **Frame one is the most famous things in Minecraft, with a kid, doing the wrong thing**: a boy waves and a zombie, a skeleton, a creeper and an enderman pop up behind him, friendly, in daylight. Anybody who has played knows all four on sight, and knows they should be attacking | A kid in a town: nothing a scrolling viewer knows on sight. "Stayed to watch" on a Short is the share who did not swipe away, and that is decided in the first second or two |
| 2 | **Line one is about "I"**: "I was the only one who was not a monster." The teller is the odd one, and he is alone | Line one is about the town's rule ("everyone got a superpower"); the teller arrives later |
| 3 | **A family in five seconds**: "My mum was a zombie. My dad was a skeleton. And I was a boy they found in a basket." Three shots of about a second each. Somebody to care about, and a question (whose basket?) | The first lines are three "nobody knew"s: questions about a place |
| 4 | **Two jokes in the first thirteen seconds**, each a famous mob with one habit: the creeper who wants a hug, the slime that is the school bus | The first joke comes later, or is about the rule |
| 5 | **The game turned inside out**: the monsters are home and the *players* are the raid ("Players. With swords."). The viewer is a player | The danger is something made up for the film |
| 6 | **Twice the teller thinks the worst and the truth is love**: Mo stares ("I thought he did not like humans"); the door is locked from outside ("because I was the weak one"). Then the ring, facing out, "since the basket" | One mystery, answered once, near the end |
| 7 | **From 0:57 on, something is answered or goes wrong about every ten seconds**: the ring (1:01), the torches (1:07), players (1:10), mum knocked down (1:20), he runs in (1:25), the sword caught (1:40), red blood (1:45), "I am human too" (1:53), the basket (2:01), they came for him (2:09), "Hug" (2:15), "We always knew" (2:28), the army (2:33), Mo alone (2:45) | Longer stretches of doing between the turns |
| 8 | **Four clues, said back as a list** ("The bread. The lantern. The sneeze. The sun."): a viewer who caught them feels clever, and one who did not watches again | Clues are fewer, or not named back |
| 9 | **Named people who come back** (Hiss, Mo, dad's arm), so a part two has something to be about | |

### The recipe, for the next ones

1. **Frame one**: a mob every player knows, a kid, and one thing wrong for that mob, in bright light. Pause on frame
   15 with no sound: would a ten-year-old who plays Minecraft know what is odd?
2. **Line one**: "In this town, I was the only one who …". The teller is the odd one out.
3. **Seconds 3 to 6**: mum, dad, and where he came from. One short line and one shot each.
4. **Seconds 6 to 13**: two neighbours, each a famous mob with one funny habit.
5. **By 0:30, a friend who is like him**, with three or four small clues that he is not what he looks like.
6. **By 0:50, one rule that looks unkind.** The teller says why he thinks they do it. He is wrong, and the truth is that
   they love him.
7. **At about 40%, the thing from the game that the viewer usually IS** (players, an iron golem, a hero) arrives as
   the danger.
8. **At about half, the teller, who is small, stands in front of his family.**
9. **At about two thirds, the friend's secret**, and the clues said back as a list.
10. **From the first minute on, a turn every ten seconds.** Then something bigger, somebody left behind, and part two.
11. Use **true Minecraft facts** as the jokes and the turns (the sun burns zombies; no zombie eats bread). Players know
    them, and being right about one is a reason to comment.

Ask him for the retention graph of this film if he can share it: where the line drops is worth more than this page.

## What it is good for

- **Monsters as people.** Every monster comes from the pack (`Topics/Stories/monsters.tsx`) and is given a name
  and one habit in `source/kit.tsx`: `Mum` (zombie, pink bow), `Dad` (skeleton whose arm comes off), `Hiss` (the
  creeper who wants a hug), `Postman` (enderman), `Bus` (a slime the children ride). `Folk` and `Crowd` fill a
  street with the rest.
- **A film that fills the long cut.** 2:55, just under the three minutes a Short may run. It was first made longer
  than that; see the next section.
- **Night.** Every face at night has a `Fill` light on the camera's side; speech bubbles at night take `dark`.
  Light iron blows out at night: use `#a9b3c0`.
- **A plant that pays off twice.** Mo's bread ("Zombies do not eat bread") and dad's loose arm both come back in
  the ending, and again in part two.

## What was hard

- Version one ended too soon. Version two added the ambush, the army from the forest and Mo staying behind
  (`source/scene9.tsx`, `source/scene10.tsx`).
- The well and its posts near x ≈ −5 block cameras that look along the street; keep the yaw 30° off the street.
- The market hall's posts and roof block cameras under it.
- Subtitles lagged where the aligner did not know a word; `SAY` in `scripts/narration.py` gives it the sounds.

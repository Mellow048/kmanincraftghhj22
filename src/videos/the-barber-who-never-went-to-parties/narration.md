# The Barber Who Never Went to Parties — script

**Status: built without a script review.** The owner, 2026-11-18, on the idea: "go i wont review it, im busy. Make
sure you do this rigth". The idea, his three corrections and the meme are in `Topics/Recreation/`.

A real-life story in blocks: a boy skips every party to learn to cut hair. One thing from the game would break it,
so there is none.

## Who speaks

| Speaker | Voice | Lines |
|---|---|---|
| The narrator, and the barber when he speaks out loud | `voice-03`, as recorded. They are one person | Everything not below; `HUS HUS HUS`, `THAT'S FIXABLE!`, `Training.` |
| Friend 1 (the loud one, green hair) | `voice-03`, three semitones up | `05-friday`, `18-help`, `20-wait`, `24-coming` |
| Friend 2 (the big one, who gets the haircut) | `voice-03`, three and a half semitones down | `02-how`, `06-who`, `19-please`, `21-bro` |

`voice-07` and `voice-06` were picked for the friends and the recording tool did not know them in this session; asking
the owner to pick voices again would have stopped the build, and he had said he was busy. So the friends are the
narrator's voice, moved. **If the owner wants real second and third voices: record `friend1` and `friend2` again
(the two texts are in `takes.json`), drop the `semitones`, and run the three commands below.**

## How it is recorded

Thirty-six clips and four speakers, and the recording tool allows ten calls a turn. So each voice is recorded as a few
long takes (`public/audio/<film>/takes/`), and `scripts/split-takes.py` cuts them into the clips with the aligner.
`takes.json` says which sentences of which take are which clip. "HUS" is given to the voice as "Huss!"; the tool cuts
every "huss" out and lays them back at chant speed.

```bash
python3 scripts/split-takes.py the-barber-who-never-went-to-parties
python3 scripts/narration.py build the-barber-who-never-went-to-parties --tempo 1.43 --tail 1.7
python3 scripts/sound.py build the-barber-who-never-went-to-parties
```

`wait` on a clip line is silence before it: that is where the action with no words over it happens. Each such stretch
is cut into several pictures in the scene files (`cut:`).

## The script

```narration
# clip 01-hus
[1.hus] HUS HUS HUS! HUS HUS HUS!
# clip 02-how wait 0.7
[1.how] BRO. HOW?!

# clip 03-paper wait 1.0
[2.paper] One year earlier, I could not cut paper.
# clip 04-party wait 0.25
[2.party] In this town, every night was a party.
[2.door] And every night, my friends knocked on my door.
# clip 05-friday wait 0.2
[2.friday] DUDE! IT'S FRIDAY!
[2.whole] THE WHOLE TOWN IS OVER THERE!
# clip 06-who wait 0.1
[2.who] WHO STAYS HOME ON A FRIDAY?!
[2.weird] YOU'RE BEING WEIRD AGAIN!

# clip 07-tv wait 0.7
[3.tv] I had seen a barber on TV
[3.cry] make a grown man cry with one haircut.
[3.happy] Happy tears.
[3.wanted] I wanted to do that.
# clip 07b-dadhus wait 1.7
[3.hus] HUS HUS HUS!

# clip 08-okay wait 0.6
[4.okay] OKAY! OKAY!
[4.fixable] THAT'S FIXABLE!
# clip 09-not wait 1.0
[4.not] It was not fixable.
[4.hat] Dad wore a hat until spring.

# clip 10-hus2 wait 1.35
[5.hus] HUS HUS HUS! HUS HUS HUS!
# clip 11-while wait 1.15
[5.while] While my friends were out dancing,
[5.cutting] I was cutting.
# clip 12-mops wait 0.3
[5.mops] I went through hundreds of mops,
[5.combs] thousands of combs,
[5.dog] and one very patient dog.
# clip 12a-m1 wait 0.45
[5.m1] HUS HUS HUS!
# clip 12b-m2 wait 0.06
[5.m2] HUS HUS HUS!
# clip 12c-m3 wait 0.06
[5.m3] HUS HUS HUS!
# clip 12d-m4 wait 0.06
[5.m4] HUS HUS HUS!
# clip 12e-m5 wait 0.06
[5.m5] HUS HUS HUS HUS HUS HUS!
# clip 12f-m6 wait 0.1
[5.m6] HUS HUS HUS!
# clip 13-fix2 wait 0.55
[5.fixable] THAT'S FIXABLE!
# clip 14-spring wait 0.95
[5.spring] Spring came.
[5.sat] And Dad sat back down in the chair.
# clip 14b-dadhus2 wait 0.7
[5.dadhus] HUS HUS HUS!

# clip 15-busiest wait 0.7
[6.busiest] Then the busiest barbershop in town
[6.sign] put a sign in the window.
# clip 16-saturday wait 0.3
[6.saturday] It was a Saturday.
[6.line] The line went around the block.
[6.beard] One man had grown a beard waiting.
# clip 16b-shophus wait 1.3
[6.hus] HUS HUS HUS! HUS HUS HUS! HUS HUS HUS!
# clip 17-forty wait 0.8
[6.forty] I cut forty heads before lunch.

# clip 18-help wait 0.25
[7.help] HELP! THE PARTY STARTS IN AN HOUR,
[7.look] AND LOOK AT HIM!
# clip 19-please wait 0.12
[7.please] PLEASE! IS THIS FIXABLE?!
# clip 20-wait wait 0.6
[7.wait] WAIT.
[7.weirdone] IT'S THE WEIRD ONE!
# clip 20b-hus wait 0.6
[7.hus1] HUS HUS HUS! HUS HUS HUS!
# clip 21-bro wait 0.65
[7.bro] BRO. HOW?!
# clip 22-training wait 0.6
[7.training] Training.
# clip 23-hus3 wait 0.75
[7.hus] HUS HUS HUS! HUS HUS HUS!
# clip 24-coming wait 0.6
[7.coming] YOU COMING?!
# clip 25-no wait 0.45
[7.no] No.
# clip 26-end wait 1.3
[7.end] HUS HUS HUS HUS HUS HUS!
```

## What each scene is for

| Scene | Lines | What happens with no words over it |
|---|---|---|
| 1. The hook | `1.hus`, `1.how` | Frame one: the worst hair in town in a barber chair, the scissors already a blur, block text HE NEVER WENT TO A SINGLE PARTY. The cape comes off on a perfect haircut. He opens his mouth to answer and the film rewinds |
| 2. Every night was a party | `2.paper` – `2.weird` | Safety scissors and a sheet of paper. The house across the street, flashing. Two friends at his door. The door shuts |
| 3. The dream | `3.tv` – `3.hus` | The barber on television; the man in the chair cries. The kitchen scissors out of the drawer, held up. He rises behind Dad's armchair, and the chant is heard for the first time in the story: three HUS, a strip down the middle, Dad's eyes open |
| 4. The first failure | `4.okay` – `4.hat` | Dad feels the top of his head and turns round. Dad at dinner in a woolly hat. The garage, and a mop |
| 5. The training | `5.hus` – `5.dadhus` | The chant on the mop; four strings left. Block text WHILE THEY'RE OUT PARTYING BTW. **The montage, which is only the chant:** the dog, the hedge, a shop dummy, a mop, six heads on one post, and his own fringe, too short. A cap. The calendar. Dad takes the hat off, sits down, and gets the chant again: this time it is right |
| 6. The job | `6.busiest` – `6.forty` | HELP WANTED. The queue, the man with the beard, three barbers in trouble. He clicks the scissors twice. Nine HUS, three heads. The owner shin deep in hair; he drops his comb. The door bangs open |
| 7. The reunion | `7.help` – `7.end` | The friends, one with the hair from frame one. He pats the chair. Six HUS. "Training." A second with no sound at all. Six HUS on the other friend. "YOU COMING?!" "No." Two blank faces. The mop in the chair, the scissors go up, the last chant, and the last picture held under the meme's line |

## Planted, and paid

| Planted | Paid |
|---|---|
| The wrecked hair of frame one | It is Friend 2's, and the hook is the reunion seen early |
| "BRO. HOW?!" and the open mouth | "Training." |
| "YOU'RE BEING WEIRD AGAIN!" | "WAIT. IT'S THE WEIRD ONE!" |
| "THAT'S FIXABLE!" on Dad, and again on his own fringe | "PLEASE! IS THIS FIXABLE?!" And this time it is |
| Dad's hat | Dad takes it off and sits back down in the chair |
| The mop | The last picture, and the last sound, which is the first sound of the film |
| The knock on his door every night | "YOU COMING?!" in the last scene, and for the first time we hear his answer: "No." |

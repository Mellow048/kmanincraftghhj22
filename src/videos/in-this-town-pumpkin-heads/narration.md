# Narration — In This Town, Everyone Wore a Pumpkin on Their Head

**Status: DRAFT 1, recorded so the owner can hear it. The script is NOT approved yet.** Recorded with `voice-00`
(the voice the owner picked) as six clips; built to 115.9 seconds (1:55.9) at 244 words a minute, 53 shots, median
shot 2.13 s. Nobody has listened to it: the agent cannot hear audio. No shot is built until the owner approves the script.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word, and read the model,
`src/videos/in-this-town-same-face/narration.md`, to see what a finished one looks like. Copy its SHAPE, never its story.

**Length: one to two minutes, two minutes at most** (the owner: "the video must be 1 minute to 2 minutes max").
`film.tsx` says `cut: "short"`.

**The premise, in four sentences.** In this town, everyone wore a pumpkin on their head, all day, even in bed. Nobody
would explain why we could never take them off. One night I knelt at the well and took mine off to see my own face.
Tall dark things had always stood beside our houses at night, and the pumpkins were the only reason they had never
found us: they cannot find you until you look at them.

**One sentence:** A kid who has never seen his own face takes off his pumpkin to look, and learns the town was never
hiding its faces. It was hiding its eyes.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun.
- Each `# clip` is one recording. Record it to `public/audio/in-this-town-pumpkin-heads/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build in-this-town-pumpkin-heads`.
- The first line starts "In this town". The last line is the subscribe line.
- The teller's face is a carved pumpkin until 10.off. The carving changes on the cut, the way a face does.
  His real face is seen for the first time at 11.face.
- The tall things are never named.

**This is a 14-beat cut of the topic's 18-beat sheet.** Kept: hook, mysteries, tour, itch, the elder's rule, the
decision with its planted question, one funny failure, one success, the friend, the edge, the act, the wait, the
reveal, the button. Dropped: the adults' sensible reasons, the tease, the price, the packing, the friend's dialogue
(she knocks and shakes her head).

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "Even in bed" (1.bed) | Every one of them is facing a window (13.windows) |
| "Nobody knew what their own mother looked like" (2.mother); "I had never seen my own face" (4.wish) | He sees it in the well (11.face) |
| The golem never looks up from the ground (3.ground, 10.golem) | It knew where not to look (13.find) |
| "We keep them on. That is all I was ever told" (5.rule) | The rule finally has a reason (13.eyes) |
| "Who was a whole town hiding its face from?" (6.plant) | Not its face. Its eyes (13.eyes) |
| The well shows him only a pumpkin (7.back) | The well shows him his face, and what is behind it (11.face, 12.behind) |
| Knocking twice is hello (3.knock) | His friend knocks twice on the glass (9.knock) |
| "Through two small holes, at night, I could hardly see a thing" (10.holes) | Why nobody had ever seen them (13.always) |

```narration
# clip 01-hook
[1.town]     In this town, everyone wore a pumpkin on their head.
[1.bed]      All day. Even in bed.
[2.who]      Nobody knew who had started it.
[2.mother]   Nobody knew what their own mother looked like.
[2.why]      And nobody would tell me why we could never take them off.

# clip 02-tour
[3.soup]     We ate soup through the mouth hole, with a very long spoon.
[3.shoes]    We told each other apart by our shoes.
[3.knock]    And we said hello by knocking twice on each other's heads.
[3.carve]    Every autumn, the oldest woman carved a new pumpkin for every baby.
[3.golem]    An iron golem walked the street all night,
[3.ground]   and it never once looked up from the ground.
[4.liked]    I liked it there, mostly.
[4.wish]     But I had never seen my own face.
[4.what]     What did I look like?

# clip 03-elder
[5.ask]      So I asked the oldest woman, the one who had carved mine.
[5.tap]      She tapped her pumpkin for a long time.
[5.rule]     Then she said, "We keep them on. That is all I was ever told."
[5.away]     And she went inside and shut the door.
[6.sleep]    That night, I could not sleep.
[6.plant]    Who was a whole town hiding its face from?
[6.decide]   I decided to take mine off and see.

# clip 04-attempts
[7.well]     The next morning, I leaned over the well to find my reflection.
[7.back]     A pumpkin looked back.
[7.lift]     So I grabbed mine with both hands and started to lift.
[7.hands]    I got it as far as my chin. Then twenty hands pushed it back down.
[7.rope]     My mother tied it on with rope for a week.
[8.moon]     So I waited for a night with a full moon,
[8.window]   when the whole town was asleep, and climbed out of my window.
[9.friend]   My best friend was standing at her window.
[9.knock]    She knocked twice on the glass.
[9.shook]    Then she shook her pumpkin. No.

# clip 05-edge
[10.street]  The street was empty and very quiet.
[10.golem]   The golem walked past me with its eyes on its feet.
[10.holes]   Through two small holes, at night, I could hardly see a thing.
[10.look]    I looked back at the houses one more time.
[10.asleep]  Every window was dark. Every pumpkin was asleep.
[10.knelt]   Then I knelt at the well, took a deep breath,
[10.off]     and pulled it off.
[11.air]     For a second, all I felt was cold air on my cheeks.
[11.face]    Then the moon came out, and there I was in the water.
[11.nose]    A nose. Two eyes. A chin.
[11.smile]   I had a face, and it was smiling.

# clip 06-reveal
[12.behind]  I was about to laugh when I saw what was standing behind my reflection.
[13.tall]    It was tall, and thin, and darker than the night.
[13.every]   There was one beside every house,
[13.windows] and every one of them was facing a window.
[13.always]  They had always been there.
[13.eyes]    The pumpkins were never hiding our faces. They were hiding our eyes.
[13.find]    They cannot find you until you look at them.
[14.looked]  And I had just looked.
[14.turned]  One by one, every head turned to me.
[14.still]   The closest one has not moved yet. Neither have I.
[14.sub]     Subscribe before I blink.
```

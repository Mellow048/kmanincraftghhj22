# Narration — In This Town, Every Kid Got an Iron Golem (part 1)

**Status: draft 3 (2026-11-15), RECORDED and built: 132.7 seconds, 516 words, 234 words a minute (x1.47), the MIDDLE
cut.** First built at 220 words a minute with waits up to 0.9 s: the owner found that too slow ("speed it up abit, u
turned it down too much"), so the pace and the waits now sit between that and draft 2. He also heard the last line
drop in volume: clip `13-sub` was recorded 16 dB quieter than the rest; it and two others (`01-hook`, `11-puddle`)
were raised to the level of the others, by gain only.
The owner on the build of draft 2: "it got worse ngl", "the video is too fast no time to digest even half a second",
and the three clipped lines about the piglins did not explain themselves ("every year we needed golems to defeat the
piglins from coming back", "thats a much better line"). So: the opening is five full lines (`2.why` to `2.need`, clip
`02-why`, new recording, `voice-03`); the voice is slower (x1.40, was x1.53); and every clip after the first waits half
a second to a second before it starts. The other twelve clips are the draft 2 recordings cut at their own pauses, not
recorded again. What follows is the history of draft 2.

**Draft 2, the owner's own change to the story (2026-11-15, see below), recorded and built.** Draft 1 was
approved by him the same day ("okay go get the mp4, but first let me hear the tts"). Seven clips with `voice-03`, the
voice he picked himself after turning down three pairs ("please just do a natural american voice, male, no accent, not
old, not too much serious"). Built to 117.2 seconds at 249 words a minute; the voice is sped up 1.53 times, as in every
film of the topic. The agent cannot hear it. He has not read the new lines: they are his outline in the agent's words.

The idea is the owner's pick (2026-11-15, "i like 4, lets do 4") from a list the agent offered: *"In this town, every
kid got an iron golem at ten. Mine was made of snow. Theirs lift carts. His throws snowballs and melts at noon, so he
carries an umbrella for it. Then fire comes to town, and iron cannot stop fire, but snow can."* Everything past those
four sentences is the agent's and is his to change.

**Changed by the owner 2026-11-15, after he saw the film** ("i like this one but change the story, make it like yeah
everyone have a golem, the portal lit every year, usually its always piglins coming out, golems took them out. so this
year when we turned 10 the portal lit, it wasnt the piglins anymore. add that in to remove plot holes"). Draft 2: the
gate is no secret any more. It lights once a year, piglins come out, and the golems throw them back in (2.why, 2.pigs,
2.gate, new). The year he turns ten it lights on time, the golems march up as always (the march now comes BEFORE the
thing comes out, as `8.march`), and it is not piglins (8.out). Clips 01 and 04 were recorded again with `voice-03`;
the other five are the first recordings. 59 shots now.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/OWNER.md` and `SCRIPT.md` before changing a word.

**The premise, in four sentences.** In this town, every kid got an iron golem at ten, and mine was made of snow.
The town needed golems: once a year the gate on the hill lit up, piglins came out, and the golems threw them back
in. The year he turned ten the gate lit on time, but what came out was made of fire and could fly, and iron could not
reach it. Snow could: the only golem that worked was the one everybody laughed at.

**One sentence:** A boy is ashamed of his snow golem in a town of iron ones, until fire comes out of the old gate, the
iron golems go down one by one, and the snow golem puts the fire out and melts doing it.

- One teller, first person, past tense. Fast and plain: about 255 words a minute. Three silences, on purpose: the
  `wait` on a clip.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen.
- Each `# clip` is one recording. Record it to `public/audio/in-this-town-every-kid-got-an-iron-golem/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build in-this-town-every-kid-got-an-iron-golem`.
- This is the short cut: 14 beats, 250–520 words, one to two minutes (`cut: "short"` in film.tsx).

**Told to the owner with this draft:**

1. The golem has a name, Puddle. `SCRIPT.md` says roles only, no names; the owner's own films have Mo and Hiss, and
   the name is the last joke of the film (12.name). Without it, 3.name and 12.name go and 12.left ends the beat.
2. The fire things are never named. On screen they are blazes, and the gate is a nether portal: in the game a
   snowball really does hurt a blaze, and an iron golem cannot reach one.
3. Part one ends with the golem melted, the gate open again, and snow starting to fall. Part two is the snow.

**To build that is not in the pack yet:** the snow golem (two snow blocks, a carved pumpkin, stick arms that come
off, a size that shrinks), the blaze, the gate, the umbrella, a boulder.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| The gate lights once a year, piglins come out, the golems throw them back in (2.why, 2.pigs, 2.gate) | The gate lights on time (8.night), the golems march and the town cheers (8.march). It is not piglins (8.out) |
| Every night the iron golems face the gate; Puddle faces him (7.face, 7.puddle) | Puddle is the one who fights for him (10.puddle) |
| Mine threw snowballs, at birds, the baker, me (3.mine, 3.at) | One snowball (10.ball). He did not miss (11.last) |
| He melts at noon; the umbrella (3.noon, 3.umbrella) | Fire melts snow (11.fire). The umbrella over him (11.umbrella) |
| I called him Puddle (3.name) | A pumpkin and a puddle (12.left, 12.name) |
| "I wanted a real golem"; he heard every word (6.want, 6.heard) | Picture only: nobody says it |
| It was snowing the day he was built (2.dad) | It was starting to snow (13.snow) |

```narration
# clip 01-hook
[1.town]     In this town, every kid got an iron golem at ten.
[1.me]       Mine was made of snow.

# clip 02-why wait 0.35
[2.why]      On the hill over our town stood an old black gate.
[2.lit]      Once a year, it lit up, and piglins came out to attack our town.
[2.fight]    So every year, we needed our golems to defeat the piglins,
[2.gate]     and throw every one of them back in.
[2.need]     That is why every kid got a golem at ten.

# clip 03-birthday wait 0.35
[2.build]    On your tenth birthday, you got four iron blocks and a pumpkin.
[2.ran]      The year I turned ten, the iron ran out.
[2.dad]      So my dad looked outside. It was snowing.
[2.snow]     Two blocks of snow. One pumpkin. Happy birthday.

# clip 04-tour wait 0.35
[3.carts]    Iron golems pulled the carts.
[3.cows]     They carried the cows home.
[3.roof]     One held up a roof while the builder ate lunch.
[3.mine]     Mine threw snowballs.
[3.at]       At birds. At the baker. At me.
[3.trail]    He left snow in the kitchen.
[3.noon]     And every day at noon, he melted.
[3.umbrella] So I walked behind him with an umbrella. All summer.
[3.name]     I called him Puddle. You can guess why.
[4.house]    The other golems could lift a house.
[4.bucket]   Puddle could not lift a bucket.

# clip 05-contest wait 0.35
[5.day]      Once a year, the golems had a strength contest.
[5.rock]     The first golem lifted a boulder. The second lifted the first golem.
[5.turn]     Then it was Puddle's turn.
[5.arm]      He picked up the rock. His arm came off.
[5.other]    He picked it up with his other arm. That one came off too.
[5.last]     We came last. A chicken beat us.

# clip 06-night wait 0.45
[6.want]     That night, I told my dad I wanted a real golem.
[6.dad]      He said, "Snow is all we had."
[6.heard]    Puddle was standing right behind me. He heard every word.
[7.face]     Every night, every iron golem turned to face the black gate.
[7.puddle]   Only Puddle faced the other way. He was watching me.

# clip 07-gate wait 0.5
[8.night]    That year, the gate lit up right on time.
[8.march]    Twenty iron golems marched up the hill. We cheered.

# clip 08-fire wait 0.45
[8.out]      But this time, it was not piglins. It was on fire, and it could fly.
[8.more]     Then ten more.
[9.reach]    Iron golems could not fly. These things could.
[9.red]      The fire came down on them. The iron went red.
[9.count]    Twenty golems. Then twelve. Then five.
[9.sat]      The last one sat down in the road.
[9.roofs]    Then the roofs caught fire.
[9.end]      I thought our town was finished.

# clip 09-snowball wait 0.6
[10.ball]    Then one snowball flew across the square.
[10.hit]     It hit one in the face. It went out, like a candle.
[10.look]    Everyone turned around.
[10.puddle]  It was Puddle. And he had more.
[11.throw]   He threw. One went out. He threw. Two more.
[11.fire]    They all turned on him at once. Fire melts snow.
[11.small]   Every hit made him smaller. Up to my chin. Then my belt.

# clip 10-umbrella wait 0.25
[11.umbrella] So I did the only thing I knew. I opened the umbrella.
[11.held]    I held it over him. It caught fire. I kept holding it.
[11.knee]    He was at my knee now. Still throwing.
[11.last]    One left. One snowball. He did not miss.

# clip 11-puddle wait 0.7
[12.quiet]   Then it was quiet.
[12.left]    I looked down. There was a pumpkin, and a puddle.
[12.name]    I had named him that as a joke.

# clip 12-again wait 0.5
[13.gate]    On the hill, the gate lit up again. Something bigger was coming.
[13.nose]    Then something cold landed on my nose.
[13.snow]    It was starting to snow.

# clip 13-sub wait 0.45
[14.sub]     Like and subscribe for part two.
```

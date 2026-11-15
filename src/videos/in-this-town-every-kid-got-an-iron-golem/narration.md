# Narration — In This Town, Every Kid Got an Iron Golem (part 1)

**Status: DRAFT 1. Not approved, not recorded.** Nothing is built until the owner approves the script.

The idea is the owner's pick (2026-11-15, "i like 4, lets do 4") from a list the agent offered: *"In this town, every
kid got an iron golem at ten. Mine was made of snow. Theirs lift carts. His throws snowballs and melts at noon, so he
carries an umbrella for it. Then fire comes to town, and iron cannot stop fire, but snow can."* Everything past those
four sentences is the agent's and is his to change.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/OWNER.md` and `SCRIPT.md` before changing a word.

**The premise, in four sentences.** In this town, every kid got an iron golem at ten, and mine was made of snow.
Nobody would say why a small town needed so many golems, or what the black gate on the hill was. One night the gate
lit up and things made of fire flew out of it, and iron could not reach them. Snow could: the golems were never
presents, they were a guard, and the only one that worked was the one everybody laughed at.

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
| Nobody knew why a small town needed so many golems (2.why); nobody went near the gate (2.gate) | The gate lights up (8.night). The golems march (9.march) |
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
[2.why]      Nobody knew why a small town needed so many golems.
[2.gate]     And nobody went near the old black gate on the hill.
[2.build]    On your tenth birthday, you got four iron blocks and a pumpkin.
[2.ran]      The year I turned ten, the iron ran out.
[2.dad]      So my dad looked outside. It was snowing.
[2.snow]     Two blocks of snow. One pumpkin. Happy birthday.

# clip 02-tour
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

# clip 03-contest
[5.day]      Once a year, the golems had a strength contest.
[5.rock]     The first golem lifted a boulder. The second lifted the first golem.
[5.turn]     Then it was Puddle's turn.
[5.arm]      He picked up the rock. His arm came off.
[5.other]    He picked it up with his other arm. That one came off too.
[5.last]     We came last. A chicken beat us.
[6.want]     That night, I told my dad I wanted a real golem.
[6.dad]      He said, "Snow is all we had."
[6.heard]    Puddle was standing right behind me. He heard every word.
[7.face]     Every night, every iron golem turned to face the black gate.
[7.puddle]   Only Puddle faced the other way. He was watching me.

# clip 04-gate wait 0.4
[8.night]    Then one night, the gate lit up purple.
[8.out]      Something came out. It was on fire, and it could fly.
[8.more]     Then ten more.
[9.march]    Twenty iron golems marched up the hill. We cheered.
[9.reach]    But iron golems could not fly, and these things could.
[9.red]      The fire came down on them. The iron went red.
[9.count]    Twenty golems. Then twelve. Then five.
[9.sat]      The last one sat down in the road.
[9.roofs]    Then the roofs caught fire.
[9.end]      I thought our town was finished.

# clip 05-snowball wait 0.7
[10.ball]    Then one snowball flew across the square.
[10.hit]     It hit one in the face. It went out, like a candle.
[10.look]    Everyone turned around.
[10.puddle]  It was Puddle. And he had more.
[11.throw]   He threw. One went out. He threw. Two more.
[11.fire]    They all turned on him at once. Fire melts snow.
[11.small]   Every hit made him smaller. Up to my chin. Then my belt.
[11.umbrella] So I did the only thing I knew. I opened the umbrella.
[11.held]    I held it over him. It caught fire. I kept holding it.
[11.knee]    He was at my knee now. Still throwing.
[11.last]    One left. One snowball. He did not miss.

# clip 06-puddle wait 0.7
[12.quiet]   Then it was quiet.
[12.left]    I looked down. There was a pumpkin, and a puddle.
[12.name]    I had named him that as a joke.
[13.gate]    On the hill, the gate lit up again. Something bigger was coming.
[13.nose]    Then something cold landed on my nose.
[13.snow]    It was starting to snow.

# clip 07-sub wait 0.6
[14.sub]     Like and subscribe for part two.
```

# Narration — In This Town, I Killed Our Protector

**Status: DRAFT (draft 2). Not approved, not recorded.** Nothing is built until the owner approves this script.

Topic: `Topics/InThisTown`. His outline, in his order, with his lines kept ("I got the zombie", "I got the skeleton",
"there was a creeper behind the golem", "they both exploded", "I see a rose", the rose put near the well, the sleep,
the golem alive the next day).

**Draft 2 changed the opening, on his note:** *"the hook sounds boring… try putting the main thing first then
explain."* The main thing is not that the golem gave flowers. It is that he killed it, and the town had it back by
morning. So sentence one is the confession, sentence two is the impossible fact, sentence three is the question, and
the film spends the rest of its time answering it. Nothing else in the film moved.

**The premise, in four sentences.** In this town, I killed our protector. The whole town rebuilt it in one night, and
nobody would tell me what they used. I did it because I was proud of two kills and never looked behind it. What they
used was every pot and anvil in the town, and the well — because the well gives back what you put in it, and the
flowers on that well were never the golem's.

**One sentence:** A boy's pride gets his town's protector blown up, and the town rebuilds it overnight out of the only
iron it owns, from a well that has been handing the town its own dead back one flower at a time.

## The answer: how, and why

- **How.** The well. Anything put into that well comes back in the shape it was given. The whole village carried every
  piece of iron they owned to the well in the night — the anvil, the pots, the hooks, the fence — and it came back a
  golem, because a golem is the shape this town knows. His father's saying, in the tour: *iron remembers the shape you
  give it.*
- **Why.** Two reasons, and only one of them is kind. They were afraid: the wall was open and there was one protector
  for four hundred people. And the well only gives back what has been given to it — so the iron went in, and the rose
  he left on the rim went in with it, and told it what to be.
- **The sting.** Every flower on that well is somebody the town has lost. The golem has been taking one off the well
  every morning and handing it to a child, and the child takes it and smiles. It has been giving the town its own
  grief back, one flower a day, for as long as anyone remembers. *Our golem gave us flowers* is the lie the town tells
  itself. They were never its flowers.
- **The rule.** Never keep one. Nobody in town ever has. He is about to, and that is where the film stops.

## What the agent added to his outline

1. **The hook is the crime, then the impossibility, then the question** (1.killed, 1.back, 1.what). His outline opens
   on a protector that works; that is a fact, not a reason to watch. The plan of the film is now: he tells you it came
   back before he tells you how it died.
2. **The well is the engine.** He had the rose put "near the well", so the well became the place things come back
   from. The flowers on its rim are the dead.
3. **The golem takes its flower off the well** every morning (shown in the tour, never explained).
4. **The oldest rule**, and the oldest woman who will not explain it — one line, no reason, then she walks away.
5. **The father's saying**: iron remembers the shape you give it. Planted in the tour, paid off by the rebuild.
6. **The reason he never shouts**: pride, not cowardice. He is looking at what he did, not at what is behind it.
7. **The village's iron is in the tour**: an anvil, a pot, a bucket with a hole in it. So the morning reveal is a
   count of things the audience has already seen, not a new idea.
8. **The button**: the golem holds out the same rose, and he is about to break the one rule in town.

His plot, his order, his lines. No premise, sentence or joke is taken from any finished film.

## What is planted, and where it pays off

| Planted | Pays off |
|---|---|
| "I killed our protector" (1.killed) | The creeper he never warned it about (8); the ash (10) |
| "The whole town rebuilt it in one night" (1.back) | The empty hooks, the missing pot, all the iron in the square (14) |
| "Nobody would tell me what they used" (1.what) | The iron, and the well (14.iron, 14.giveback) |
| It takes one flower off the well every morning (3.take) | The flowers were the town's dead (14.flowers, 14.ours) |
| "Iron remembers the shape you give it" (3.remember) | The anvil, the pot, the bucket come back as a golem (14.built) |
| The anvil, the pot, the bucket with a hole (3.anvil, 3.bucket) | Empty hooks, no pot, all the iron in the square (14.hooks, 14.pot, 14.iron) |
| The well's lid is never on (3.lid) | The well is the door things come back through (14.giveback) |
| "Never keep a golem's flower" (2.keep, 5.say) | The rose held out to him, and the last line (14.mine, 14.sub) |
| He wants the golem to need him (4.need) | He gets his wish, and it costs the golem its life (7–9) |
| His pride over the two kills (7.proud) | He never looks behind it; the creeper (8) |

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun. 5–12 words.
- Each `# clip` is one recording, saved to `public/audio/in-this-town-i-killed-our-protector/raw/<clip>.mp3`, then
  `python3 scripts/narration.py build in-this-town-i-killed-our-protector`.
- The teller wears one loud colour nobody else in the film wears.
- This is the short cut (`cut: "short"`): 14 beats, 250–520 words, one to two minutes.

```narration
# clip 01-hook
[1.killed]  In this town, I killed our protector.
[1.back]    The whole town rebuilt it in one night.
[1.what]    Nobody would tell me what they used.

# clip 02-mysteries
[2.sleep]   Nobody had ever seen it sleep.
[2.break]   Nobody had ever seen it break. Until me.
[2.well]    And nobody would say why the well was full of flowers.
[2.rule]    The oldest rule in town was about those flowers.
[2.keep]    Never keep one.

# clip 03-tour
[3.wall]     It walked the wall all night.
[3.gate]     At dawn, it stood at the gate.
[3.take]     Then it took one flower off the well,
[3.child]    and gave it to a child.
[3.none]     Nobody asked how. Nobody asked why.
[3.lid]      The well had a stone lid. It was never on.
[3.anvil]    The blacksmith had an anvil. My mother had a pot.
[3.bucket]   My father had a bucket with a hole in it.
[3.remember] He said iron remembers the shape you give it.
[3.good]     It was a good life. Nobody had been hurt in years.

# clip 04-itch
[4.protect] But the golem protected all of us.
[4.need]    I wanted it to need me.

# clip 05-elder
[5.ask]     So I asked the oldest woman in town why.
[5.say]     "Never keep a golem's flower," she said.
[5.again]   I asked her again.
[5.walk]    She walked away.

# clip 06-night
[6.bell]    Then one night, the bell rang.
[6.wall]    Something was on the wall.

# clip 07-sword
[7.sword]    I grabbed my father's diamond sword.
[7.zombie]   I got the zombie.
[7.skeleton] I got the skeleton.
[7.proud]    I was so proud of myself that I forgot to look behind it.

# clip 08-creeper
[8.behind]  There was a creeper behind the golem.
[8.shout]   I should have shouted.
[8.stood]   I just stood there.

# clip 09-boom
[9.boom]    It exploded.
[9.dust]    When the dust settled, the golem was gone.

# clip 10-ash
[10.finish] We finished the monsters.
[10.walk]   I walked to where it fell.
[10.rose]   In the ash was a rose.

# clip 11-well
[11.pick]  I picked it up. It was still warm.
[11.put]   I put it on the well, with all the others.
[11.letgo] The rule said never keep it. So I let it go.

# clip 12-bed
[12.home]  I went home.
[12.bed]   I lay on my bed and did not sleep.

# clip 13-morning
[13.light]  In the morning, the sun came in.
[13.square] I went to the square.
[13.there]  It was standing there.

# clip 14-truth
[14.hooks]    The hooks in the smithy were empty.
[14.pot]      My mother's pot was gone from the kitchen.
[14.iron]     Every piece of iron in this town was in the square.
[14.built]    In the night, the whole village had built it again.
[14.afraid]   Not because they loved it. Because they were afraid.
[14.giveback] And because the well gives back what you put in it.
[14.flowers]  Every flower on that well was somebody we had lost.
[14.ours]     The golem had been handing us our own flowers.
[14.held]     Then it held one out to me.
[14.mine]     It was mine. The rose I had left on the well.
[14.sub]      Subscribe before I keep it.
```

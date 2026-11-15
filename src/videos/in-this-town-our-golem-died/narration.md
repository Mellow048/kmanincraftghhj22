# Narration — In This Town, Our Golem Died

**Status: DRAFT 4 — restructured on the owner's note after the first render.** His words on the render: *"it lacked
retention, its slow paced, no motion just pngs… get rid of that 'nobody knows' 3x on the start, just head to the main
topic asap."*

Topic: `Topics/InThisTown`. His outline, his plot points, his lines ("I got the zombie", "I got the skeleton", "there
was a creeper behind the golem", "it exploded", the rose, the rose put on the well, the sleep, the golem alive the
next day).

**What changed in draft 4, and why.**

- **The five "nobody" lines at the start are gone.** Draft 3 opened with a hook and then five facts nobody knew
  (never sleeps, never breaks, the well's flowers, the oldest rule, never keep one). One of them said the same thing
  as the line before it, and the film did not have a story yet. The film now says *how it died* at four seconds.
- **The night the monsters came is beat two**, not beat seven. The death is the main thing the film is about, and it
  was arriving at 42 seconds. It now starts at 4.6.
- **The tour is now a memory, and it comes after the death**, where the audience wants to know what the town had to
  build it back out of. Same shots, same lines, new place in the order. "It was a good life" hurts where it is now.
- **The rule comes after he picks the rose up**, so "never keep a golem's flower" is an answer to something he is
  holding, and "so I let it go" refers to a rule the audience heard thirty seconds ago instead of a minute.
- **The "nobody" in the tour is gone too**: "the town had not lost anyone since it came".

**The premise, in four sentences.** In this town, our protector was an iron golem. One night the monsters came, and a
creeper took it apart while I stood too far away with my father's sword. The next morning it was standing at the gate,
rebuilt in the night out of every piece of iron the town owned. And the well it came out of has been handing this town
its own dead back, one flower at a time, for as long as anyone remembers.

## The answer: how, and why

- **How.** The well. Anything put into that well comes back in the shape it was given. The village carried every piece
  of iron it owned to the well in the night — the anvil, the pots, the hooks, the bucket — and it came back a golem,
  because a golem is the shape this town knows. His father's saying: *iron remembers the shape you give it.*
- **Why.** Two reasons, only one of them kind. They were afraid: the wall was open and there was one protector for
  four hundred people. And the well gives back what has been given to it — so the iron went in, and the rose he left
  on the rim went in with it, and told it what to be.
- **The sting.** Every flower on that well is somebody the town has lost. The golem has been taking one off the well
  every morning and handing it to a child. It has been giving the town its own grief back, one flower a day, for as
  long as anyone remembers. *Our golem gave us flowers* is the lie the town tells itself.
- **The rule.** Never keep one. Nobody in town ever has. He is about to.

## What is planted, and where it pays off

| Planted | Pays off |
|---|---|
| The golem takes one flower off the well every morning and gives it to a child (3.take, 3.child) | Every flower was somebody they had lost, and it was handing them back (14.flowers, 14.ours) |
| The anvil, the pot, the bucket (3.anvil, 3.bucket) | Empty hooks, no pot, all the iron in the square (14.hooks, 14.pot, 14.iron) |
| "Iron remembers the shape you give it" (3.remember) | The town rebuilt it out of its own iron (14.built) |
| The well is what things come back through (14.giveback) | The rose he left on the rim is the one held out to him (14.mine) |
| He wants the golem to need him (4.need) | He gets his wish and cannot save it (7.zombie, 9.boom) |
| His pride over the two kills (7.proud) | The creeper is behind the golem while he is grinning (8.behind) |
| "Never keep a golem's flower" (5.say) | The last line, with the rose in his hand (14.sub) |

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun. 5–12 words.
- Each `# clip` is one recording, saved to `public/audio/in-this-town-our-golem-died/raw/<clip>.mp3`, then
  `python3 scripts/narration.py build in-this-town-our-golem-died`.
- The teller wears one loud colour nobody else in the film wears.
- This is the short cut (`cut: "short"`).

```narration
# clip 01-hook
[1.died]    In this town, our golem died.
[1.back]    The next morning, it came back.
[1.how]     Nobody would tell me how.

# clip 02-night
[6.bell]     Then one night, the bell rang.
[6.wall]     Something was on the wall.
[7.sword]    I grabbed my father's diamond sword.
[7.zombie]   I got the zombie.
[7.skeleton] I got the skeleton.
[7.proud]    I was so proud of myself that I forgot to look behind it.
[8.behind]   There was a creeper behind the golem.
[8.shout]    I should have shouted.
[8.late]     But I was too far away, and it was too late.
[9.boom]     It exploded.

# clip 03-ash-rule
[9.dust]     When the dust settled, our protector was gone.
[10.finish]  We finished the monsters.
[10.walk]    I walked to where it fell.
[10.rose]    In the ash was a rose.
[11.pick]    I picked it up. It was still warm.
[5.ask]      So I took it to the oldest woman in town.
[5.say]      "Never keep a golem's flower," she said.
[5.again]    I asked her again.
[5.walk]     She walked away.

# clip 04-memory
[3.wall]     It had guarded that wall since before I was born.
[3.take]     Every morning it took one flower off the well,
[3.child]    and gave it to a child.
[3.anvil]    The blacksmith had an anvil. My mother had a pot.
[3.bucket]   My father had a bucket with a hole in it.
[3.remember] He said iron remembers the shape you give it.
[3.good]     It was a good life. The town had not lost anyone since it came.
[4.protect]  But the golem protected all of us.
[4.need]     I wanted it to need me.

# clip 05-morning
[11.put]     I put the rose on the well, with all the others.
[11.letgo]   The rule said never keep it. So I let it go.
[12.home]    I went home.
[12.bed]     I lay on my bed and did not sleep.
[13.light]   In the morning, the sun came in.
[13.square]  I went to the square.
[13.there]   It was standing there.
[14.hooks]   The hooks on the wall were empty.
[14.pot]     My mother's pot was gone from the kitchen.
[14.iron]    Every piece of iron in this town was in the square.
[14.built]   In the night, the whole village had built it again.
[14.afraid]  Not because they loved it. Because they were afraid.
[14.giveback] And because the well gives back what you put in it.
[14.flowers] Every flower on that well was somebody we had lost.
[14.ours]    The golem had been handing us our own flowers.
[14.held]    Then it held one out to me.
[14.mine]    It was mine. The rose I had left on the well.
[14.sub]     Subscribe before I keep it.
```

# Narration — In This Town, Everyone Could Sell Their Feelings

**Status: DRAFT — awaiting owner approval to record. Chosen: Option A (fear standing at the stand watching the road).**

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word, and read the script of the reference film, `src/videos/in-this-town-same-face/narration.md`, to see what a finished one looks like. Copy its SHAPE, never its story.

**The premise, in four sentences.** In this town, everyone could sell a feeling at the witch's shop — put on the humming helmet, and it dropped into glass with a *plink*. Nobody knew where the feelings went, only that you could never buy them back for the same price. I sold my fear to finally open my lemonade stand and sold out by noon. At close I saw my fear standing at my stand when I wasn't there — yellow, small, watching the road I never watched — and learned fear was the lookout I left behind.

**One sentence:** A kid who sells his fear to chase a dream learns fear wasn't stopping him — it was standing watch for him.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun. 5–12 words.
- Each `# clip` is one recording. Record it to `public/audio/in-this-town-everyone-could-sell-their-feelings/raw/<clip>.mp3`, then run `python3 scripts/narration.py build in-this-town-everyone-could-sell-their-feelings`.
- The first line starts "In this town". The last line is the subscribe line.
- This is the short cut: 14 beats, 250–520 words, one to two minutes (`cut: "short"` in film.tsx).

What is planted, and where it pays off (fill this in BEFORE writing lines; a twist nobody planted is a cheat):

| Planted | Pays off |
|---|---|
| One humming helmet, shelves of empty glass (3.shop) + *plink* on every sale (3.anger, 7.plink) | My yellow fear *plinks* too — then stands alone later (11.stand) |
| Neighbor's anger → calm smile over spilled soup (3.calm) | I get calm-cold, not calm-kind — I don't check the road (10.hands) |
| Rich man sold everything, just stared at coins, copied us a second late (3.greedy, 3.mimic) | No one left to copy — still staring when fire rolls (12.greedy2), warning what I almost become |
| Golem left his lonely (3.golem) | Lonely is the one feeling the witch never shelves — she keeps it |
| Witch: "fear keeps you alive" (5.hmm) | Fear *was* keeping me alive, at my stand (12.watching) |
| Lemonade dream + freeze (4.dream) | Rush + cart + I keep pouring with both hands (10.hands) |
| Friend: "you don't look before you cross anymore" (9.worry) | She pulls the cart, shaking *with* me (14.waved) — she kept hers |

The lines below replace the placeholders. Cue ids are `<beat>.<word>`: `3.bell`, `13.truth`.

```narration
# clip 01-hook
[1.town]     In this town, everyone could sell a feeling.
[1.me]       Except me. I was too scared to try.
[2.from]     Nobody knew where the feelings went.
[2.witch]    Nobody knew why the witch never left her shop.
[2.price]    And nobody knew why the richest man never smiled.

# clip 02-tour
[3.shop]     The witch's shop had one humming helmet and shelves of empty glass.
[3.anger]    My neighbor sold his anger. It dropped with a plink and he never shouted again.
[3.calm]     The next morning his kid spilled soup on his shoes and he just smiled.
[3.sad]      My friend sold her sadness. It fell blue and she laughed when rain ruined her drawings.
[3.shy]      The shy boy sold his shyness and waved at the whole square the next day.
[3.greedy]   One man sold everything and just stared at his coins.
[3.mimic]    He copied how we sat, how we smiled — a second late.
[3.golem]    Even the iron golem left a bottle — his lonely — and stood taller.
[4.good]     It was a good life, honestly.
[4.dream]    But I dreamed of a lemonade stand and froze every time someone looked.

# clip 03-elder
[5.ask]      So I asked the witch if fear was for sale.
[5.look]     She looked at my hands for a long time.
[5.hmm]      Then she said, fear keeps you alive.
[5.rule]     It meant: don't sell the one that keeps you alive.
[6.plant]    What did fear have to do with lemonade?
[6.decide]   I decided to sell it anyway.

# clip 04-attempts
[7.helmet]   The next morning I sat under the humming helmet.
[7.plink]    My fear dropped with a plink — yellow — and I didn't flinch.
[7.home]     I carried the bottle to her shelf and walked home light.
[7.laugh]    The whole square hummed that day and I hummed with them.
[8.stand]    Every morning I built my stand and never looked for traffic.
[8.line]     Every day I shouted louder and never counted change right.
[8.money]    I sold out by noon and felt nothing.
[9.friend]   My best friend was waiting by my stand that night.
[9.worry]    She said, you don't look before you cross anymore.
[9.sleeves]  I said, I don't have to.

# clip 05-edge
[10.rush]    The rush came just before close.
[10.line]    A line for lemonade, a cart rolling behind me, and I felt nothing.
[10.hands]   I kept pouring with both hands.
[10.lean]    I leaned over the counter and didn't hear the wheels.
[11.stand]   Then I saw my fear standing at my stand.
[11.yellow]  Yellow, small, watching the road I never watched.
[11.caught]  It didn't wave. It just stared at the cart and shook.
[11.cold]    And for the first time that week I felt cold.

# clip 06-reveal
[12.clear]   When the cart cleared the corner I saw what my fear had been doing.
[12.watching] It had been watching the road while I poured.
[12.never]   No one had taken it. I had left it there.
[12.held]    The witch had just been holding it still.
[12.greedy2] And the rich man was still staring — he had no one left to copy.
[13.known]   My town had always known which feeling to keep.
[13.hoped]   They just hoped I would learn before I needed it.
[14.seen]    Then my friend pulled the cart and it stopped an inch from my stand.
[14.waved]   She was shaking. I was finally shaking with her.
[14.sub]     Subscribe before you sell the feeling that keeps you alive.
```

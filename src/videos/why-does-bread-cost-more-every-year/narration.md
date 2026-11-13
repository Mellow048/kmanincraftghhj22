# Narration — Why Does Bread Cost More Every Year

**Status: APPROVED and RECORDED. The picture and the sound are not built yet.** The owner approved this script on
2026-11-13 ("yesboth", to the two scripts that were put to him together). The three clips are recorded with
`voice-00` (`public/audio/why-does-bread-cost-more-every-year/raw/`) and the film's clock is measured from them
(`timing.json`): 49.2 seconds. Only the starter's two shots exist. Changing a word now means recording that clip
again and rebuilding the timing.

**Rebuild the timing with `--wpm 225`**, or every stop of the film moves:
`python3 scripts/narration.py build why-does-bread-cost-more-every-year --wpm 225`. An explanation is read slower
than a story (224 words a minute here; the story films run at 254).

Topic: `Topics/Explainer`. Read `Topics/Explainer/SCRIPT.md` before changing a word. **This film is meant to become
the topic's reference** (the owner: "you are the one making that reference!"; his subjects: "money lessons, what
inflation is"): once he approves it, it is measured and the provisional numbers of the topic are corrected from it
(`Topics/Explainer/reference/README.md`).

**The question:** Why does bread cost more every year?

**The answer, in one sentence a nine-year-old could repeat:** There is more money every year but not much more
bread, so each coin buys a little less.

**The thing everybody knows:** one loaf of bread, and its price in coins. Every number in the film is a number of
coins for one loaf.

- A narrator, present tense, talking to "you". On screen "you" is one kid in a loud shirt; it all happens to him.
- Each `[cue]` line is **one stop of the camera**: the words heard while it flies to a thing and rests on it.
  The camera never cuts: the whole film is one flight over five floating islands.
- Each `# clip` is one recording. Record it to `public/audio/why-does-bread-cost-more-every-year/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build why-does-bread-cost-more-every-year`.
- The word "inflation" is said once, late (5.name), as the name of what the viewer has just watched.
- The last line is the subscribe line, and it is part of the explanation.

**Length.** 182 words in 19 lines. As recorded: 49.2 seconds at 224 words a minute (the limits are 30–58 seconds,
110–250 words, 200–268 words a minute).

What each line SHOWS, as built. (The words are the ones the owner approved. Six pictures changed between the draft
and the film; the last column of the second table says why.)

| Line | Island | The picture |
|---|---|---|
| 1.ask | Today | You at the baker's stall, shrugging, a question mark over your head. The loaf's price tag has its back to us |
| 2.loaf | Today | The loaf, close. The tag swings round on "costs": **2**. Two coins land under the loaf, one on "two" and one on "coins" |
| 3.mom | Then | Over the edge of the island and DOWN to the island under it: the same stall, the same loaf, a girl in your shirt. Her tag swings round on "cost": **1**, and one coin lands |
| 3.same | Both | Back until both stalls are in one frame, "then" below and "today" above. The two loaves hop together, the two ovens flare together, the two tags swell, and an arrow grows from the 1 up to the 2 |
| 4.village | The village | Down and west to a tiny island: three huts, a baker, a farmer who buys from him, and one empty rack between them |
| 4.ten | The village | Square on to the rack. Ten loaves pop on to it, two across and five up; ten coins drop in two rows at its foot |
| 4.one | The village | Each coin flies up and lands under its own loaf. One big tag over the rack pops: **1** |
| 4.more | The village | Ten more coins fall out of the sky and land where the first ten waited. The farmer looks up |
| 4.still | The village | The baker, close. He counts the rack with his head, each loaf hopping as he gets to it, and says what he finds: **10** |
| 4.two | The village | The ten new coins fly up; every first coin makes room. Two coins under each loaf, and the tag spins round as **2** |
| 4.nobody | The village | One slow push in, from the whole rack to eight of its loaves. On the way the farmer and the baker shake their heads. On "buys less" every loaf comes apart down the middle and its two coins move out with the halves: half a loaf over each coin |
| 5.real | The real world | Up and out to the biggest island: a mint and a bakery, and a stage with a printer and an oven on it. What they make is stacked on their roofs |
| 5.faster | The real world | The race. Bundles of notes hop on to the printer's stack, loaves hop on to the oven's: two stacks that start level, and the money pulls ahead |
| 5.name | The real world | A loaf in front of the stage, its price hanging under a red balloon. A step up on each "year": 3, 4, 5. On the last word the balloon swells, with **INFLATION** written on it |
| 5.germany | Germany, 1923 | A hundred years DOWN: a grey island far below the two stalls, a printer as big as a house with "1923" over it, and notes pouring off the edge into the clouds |
| 5.billion | Germany, 1923 | One loaf on a tall plinth. Its price unrolls down the plinth a row at a time: **200 ,000 ,000 ,000**. Beside it, a man with a wheelbarrow of notes |
| 6.answer | Today | Home: up past "then" to the first stall. The loaf has not changed. Coins pile up beside it on "more money"; on "buys less" it comes apart, and each of its two coins moves out under its own half |
| 7.chest | Today | Your chest by your own door, open, full. Beside it, the bread those coins would buy: the stack loses three loaves, and not one coin leaves the chest |
| 7.sub | Today | You jump clear of the chest with the red subscribe sign over your head, and the tag on it swings round: **0** |

What changed from the draft, and why:

| In the draft | In the film | Why |
|---|---|---|
| "Thirty years ago" was an older island beside today's, reached along a bridge | It hangs BELOW today's. Germany, 1923 is far below both | Time became height: down is earlier, up is later and dearer. The arrow from 1 to 2 points up, the flight to 1923 is the longest fall, and the flight home rises past your mom's stall |
| Ten tags on the shelf, flipping from 1 to 2 | One big tag over the rack; the price of each loaf is the coins standing under it | Ten tags were too small to read in a tall frame. One coin under a loaf, then two, IS the price, and it needs no reading |
| The villagers walk away with one loaf each | The loaves come apart: half a loaf over each coin | "Each coin just buys less" is the sentence. A loaf in two halves over two coins says it in one picture, and the answer (6.answer) can repeat it |
| Two bars beside the printer and the oven | What the machines make is stacked on their own roofs | A bar is a chart. A stack of notes beside a stack of loaves is the thing itself |
| A signpost rises: INFLATION | The price hangs under a balloon, and the word is on the balloon | Inflation is something being blown up. The picture is the meaning of the word |
| At the answer, one coin buys the loaf, then three quarters, then half | The loaf comes apart in two, as the village's did | One device for "buys less", used twice, so the second time needs no explaining |

## The claims, and where each came from

An explainer that is wrong is worse than none. Every factual claim of the script is listed here. The Minneapolis
table, the Federal Reserve Education page (its full transcript) and the Wiener Holocaust Library page were read in
full on 2026-11-13, before the film was delivered, and each says what this table says it does: the index is 156.9
for 1996 and 333.2 (an estimate) for 2026; the only falls since 1955 are 1955 and 2009; "By the autumn of 1923 a
loaf of bread cost 200,000,000,000 marks". The USAFacts page was read only as the excerpt a search returned; the
claim it is listed for stands on the Federal Reserve page alone.

| Line | Claim | Source |
|---|---|---|
| 3.mom | Thirty years ago things cost about half of what they cost today. True for the United States: the consumer price index was 156.9 in 1996 and is about 333 in 2026, which is 2.1 times | Federal Reserve Bank of Minneapolis, "Consumer Price Index, 1913–": https://www.minneapolisfed.org/about-us/monetary-policy/inflation-calculator/consumer-price-index-1913- |
| 4.village … 4.nobody | Twice the money and the same bread gives twice the price, and nobody richer. This is a thought experiment, not a fact about a place: the picture behind "too much money chasing too few goods" | Federal Reserve Education, "Inflation": https://www.federalreserveeducation.org/teaching-resources/economics/inflation/inflation |
| 5.faster | Prices rise when the amount of money grows faster than the amount of goods | The same page ("if the money supply increases too quickly, the supply of goods and services might not keep up"), and USAFacts, "What is the money supply, and how does it relate to inflation?": https://usafacts.org/articles/what-is-the-money-supply-and-how-does-it-relate-to-inflation-and-the-federal-reserve/ |
| 5.name | A general, lasting rise of prices is called inflation; in the United States prices have risen in every year from 1956 on but one (2009; 1955 was the last fall before it) | Federal Reserve Education (the definition); the Minneapolis table (the years) |
| 5.germany, 5.billion | Germany printed money in 1922–23 until a loaf of bread cost 200,000,000,000 marks in the autumn of 1923 | The Holocaust Explained (The Wiener Holocaust Library), "Hyperinflation and the invasion of the Ruhr": https://www.theholocaustexplained.org/the-nazi-rise-to-power/the-weimar-republic/invasion-of-the-ruhr/ |
| 7.chest | Money that is kept buys a little less each year | Federal Reserve Education: "A 2 percent annual inflation rate means that, on average, a dollar buys 2 percent fewer goods and services than it did the year before" |

**What the film leaves out, on purpose.** It answers "every year", the slow rise, and the cause of that is money.
It does not say that prices also jump when a thing gets scarce (a bad harvest, a war), that wages usually rise
too, or that central banks aim for a little inflation (about two percent a year) and call it healthy. Each of
those is its own film. Nothing in this one contradicts them.

**What was put to the owner with the draft, and how it was settled.** He answered "yesboth", so each point stands
as proposed: the subject is inflation through the price of bread, the German loaf stays, and the voice is
`voice-00`.

1. The subject: inflation, through the price of bread. Two other first films were considered and are one line each
   at the bottom of this page.
2. The German loaf (5.germany, 5.billion). It is the surprise of the film and it is true, but it names a real
   country and a real year. Without it the film is nine seconds shorter and has no surprise.
3. The voice: `voice-00`, as in the In This Town films, or another voice for explainers.

**What was built for it, and where it lives.** The pack was made before its first film, and this film found out
what it lacked: an oven, a loaf that comes apart, a price too long for a tag, a balloon, a speech bubble that says
a number, a wheelbarrow and its heap of notes, notes falling off an island, a bundle of notes for a tall stack.
They are in this film's `parts.tsx`,
built so that they can move into the pack unchanged once the owner has approved the film
(`Topics/Explainer/PACK.md`, "Adding a part"). In `kit.tsx`, because they are this film's own: the five islands,
the route, the shop (the same on "today" and "then") and the village's rack.

```narration
# clip 01-question
[1.ask]       Why does bread cost more every year?
[2.loaf]      Today, a loaf costs you two coins.
[3.mom]       When your mom was your age, the same loaf cost one.
[3.same]      Same bread. Same oven. Only the price moved.

# clip 02-village
[4.village]   To see why, picture a tiny village.
[4.ten]       It has ten loaves of bread, and ten coins to buy them with.
[4.one]       So each loaf sells for one coin.
[4.more]      Now hand the village ten more coins.
[4.still]     The baker still has only ten loaves,
[4.two]       so each loaf now sells for two.
[4.nobody]    Nobody can buy any more bread than before. Each coin just buys less.

# clip 03-real
[5.real]      The real world does the same thing, only slowly.
[5.faster]    New money is made a little faster than new bread is baked.
[5.name]      So year after year, prices creep up. That creep is called inflation.
[5.germany]   A hundred years ago, Germany printed money far too fast.
[5.billion]   By the end, one loaf of bread cost two hundred billion.
[6.answer]    So your bread never changed. There is more money, and each coin buys less.
[7.chest]     Which means the coins in your chest buy a little less every year.
[7.sub]       So subscribe now. It still costs nothing.
```

## The two ideas that were not written

- **Why can we not just print more money?** The same village, asked from the other end: everybody is handed a
  bag of coins, and the next morning the baker has changed every tag.
- **Where does your money go when you put it in a bank?** It does not sit there. The bank lends it to the baker
  for a new oven, the baker pays to borrow it, and a little of that comes back to you.

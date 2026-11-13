# Writing a "What if" story

> The beat sheet below is the topic's reference film, measured: *What If You Could See Who Had a Crush on You*
> ([`reference/crush/`](reference/crush/README.md)). It began as the fourteen beats of In This Town's short cut
> ([`../InThisTown/SCRIPT.md`](../InThisTown/SCRIPT.md)), re-cast for a story about a power, and the film kept all
> fourteen. Read In This Town's page too: how a line is written, and why, is the same.

A "What if" story is a wish that comes true and then shows its other side. The title asks the question. The film
is one kid's answer to it.

## Before a line is written

Write these at the top of `narration.md`. They are what the owner approves first.

1. **The premise, in four sentences.** *What if I could X. I used it for Y. It worked, until Z. What it was really
   doing was W.*
2. **The rule of the power, in one line**: what it does, and **the one thing it cannot do**. "I could see a heart
   over anybody who liked somebody. I could not see who the heart was FOR." The limit is not a detail. It is where
   the story turns, so choose it before anything else.
3. **The price.** What using the power takes from him, or shows him, that he did not want. A power with no price
   is a list of wins, and the film has no ending.
4. **The table of what is planted and where it pays off.** A twist nobody planted is a cheat.

The test: does W change what X means? If "What if I could see who had a crush on me" ends with "and then I knew
who had a crush on me", there is no story yet. The ending has to answer the title with something the title did
not expect.

## The beat sheet

Fourteen beats, 250–520 words, 60–118 seconds, 35–65 shots. One line is one shot. **From**, **Words** and
**Shots** are the reference film's own (479 words, 55 shots, 1:53.6): a size to aim at, not a rule.

| # | Beat | From | Words | Shots | What it does | In the reference film |
|---|---|---|---|---|---|---|
| 1 | The question | 0:00 | 15 | 2 | The title, said over ONE picture of the power at work. Then: "One morning, I could." | A girl with a heart over her head waves at the lens; then the boy who can see it |
| 2 | The day it came | 0:03 | 34 | 4 | How it arrived, in one or two lines. No reason: nobody needs one. One question is left open | Breakfast: a heart over his mom that doubles when his dad walks in, one over the dog, none in the mirror |
| 3 | The rule | 0:11 | 46 | 5 | What it does, shown three times, fast. And the one thing it cannot do, shown once, lightly | A heart grows when the one it is for comes close. It never says who that is |
| 4 | The fun | 0:21 | 40 | 4 | Three wins, each bigger than the last. The best part of having it | A sandwich shared, a cookie a question, two teachers holding hands |
| 5 | The wish | 0:32 | 29 | 3 | The one thing he really wants it for. It is a question | "Could it be for me? I had to know." |
| 6 | The plant | 0:38 | 37 | 4 | One thing that does not fit. He says it out loud and waves it away. It is the answer, a minute early | His best friend's heart is the biggest in school. "Whoever he is, he is one lucky guy." |
| 7 | The first try | 0:47 | 34 | 4 | He uses it for the wish, and it goes wrong in a way that is funny | He watches her heart and walks into a door |
| 8 | The second try | 0:54 | 43 | 5 | He uses it harder, and it works. Something small is lost, and he does not notice | Her heart touches the ceiling. He forgets to save his friend a seat |
| 9 | The friend | 1:05 | 26 | 3 | The one person who sees what it is doing to him. One line, or none: the friend can act | "Then ask her." She walks home the other way |
| 10 | The edge | 1:11 | 50 | 6 | The moment before the one big use. Slow down: the most words of any beat but the reveal | The dance: a card, a dog to practise on, his dad's tie |
| 11 | The act | 1:23 | 15 | 3 | He does it. Short lines | "Will you dance with me?" |
| 12 | The wait | 1:27 | 22 | 3 | It seems to have worked. The music believes him | Her heart grows bigger than any he has seen |
| 13 | The reveal | 1:32 | 59 | 6 | What he sees, in one short sentence. Then why: the limit from beat 3, and the plant from beat 6 | She is looking over his shoulder. Then the gate, one step, and what "biggest" had meant |
| 14 | The button | 1:46 | 29 | 3 | What he does now. The title's question, answered. Then the subscribe line, which belongs to the story | The hearts are gone, so he has to ask out loud |

The world and the question (1–6) took 41% of the reference, the tries and the price (7–9) 21%, the edge and the
answer (10–14) 38%. A shorter film drops the wait (12), merges the day it came (2) into the hook, and gives the fun
(4) two wins. Never drop the rule (3), the plant (6) or the edge (10).

## The rules of a line

They are In This Town's ([`../InThisTown/SCRIPT.md`](../InThisTown/SCRIPT.md)); the ones that matter most:

- **First person, past tense, one teller.** "I", not "you", after the first line. The title may say "you"; the
  story is his.
- **The first line starts "What if".** `npm run check` holds a film to it. The last line contains "subscribe".
- **5–12 words a line; cut on the noun.** Over 18 words is two shots: split it.
- **About 255 words a minute, no pauses.** Short sentences. Say it the way you would tell a friend.
- **The picture shows the action; the voice says what it meant.** Never "I walked in, I sat down, I looked up".
- **Plain words.** No word a nine-year-old would have to ask about. `npm run check` lists the banned ones.
- **Spell numbers out**, so the voice and the captions agree.
- **The power is never explained.** Where it came from does not matter and is never said. What it DOES is said
  once and shown three times.
- **Nobody learns a lesson out loud.** The last line is what he does, not what he understands.

## Powers, and the question each one is really asking

Not stories: the owner approves those. These are the kinds of limit and price that make a power into one.

| A power that… | Its limit is usually | Its price is usually |
|---|---|---|
| shows you something about people (who likes whom, who is lying, how long they have) | It shows the fact and not the reason, or not who it is about | You know a thing you cannot say, about somebody you love |
| shows you what is coming | It shows what, never why; or it shows only what YOU will see | You stop choosing. Or the thing you saw happens because you tried to stop it |
| makes you the best at one thing | It is only that one thing | Winning stops meaning anything. Or the others stop playing |
| lets you undo, hide or change something | It works once, or a little less each time | The thing you changed was holding something else up |

## What the engine needs

```narration
# clip 01-hook
[1.what]     What if you could see who had a crush on you?
[1.me]       One morning, I could.
```

- Each `[cue]` line is one shot. Its id is `<beat>.<word>`: `3.heart`, `13.truth`.
- Each `# clip` is one recording, 6–12 lines. Record it to `public/audio/<film>/raw/<clip>.mp3`.
- `python3 scripts/narration.py build <film> --estimate` times the script from its word count. Without
  `--estimate` it measures the recordings.

## Before it goes to the owner

- [ ] The four-sentence premise is at the top, and W changes what X means.
- [ ] The rule of the power is one line, with its limit. A viewer could repeat both.
- [ ] The limit is SHOWN in beat 3, lightly, and is the hinge of beat 13.
- [ ] The plant in beat 6 is said out loud, and pays off in beat 13. The table is filled in.
- [ ] The edge (10) is the longest beat but the reveal.
- [ ] The first line starts "What if". The last line is the subscribe line and belongs to the story.
- [ ] 250–520 words. No line over 18 words. No pauses written in.
- [ ] No premise, sentence, joke or twist from a finished film of any topic.

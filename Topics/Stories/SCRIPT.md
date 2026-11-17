# Writing an explainer

> **Provisional.** This beat sheet is a first setting. It has not been measured against a reference yet
> ([`reference/`](reference/README.md)). When one arrives, its beats replace these.

An explainer is one question and one answer. It is the hardest kind of script to write short, because the writer
knows too much. The method below is how to throw things away.

## Before a line is written

Write these three things at the top of `narration.md`. If you cannot, stop and read more about the subject.

1. **The question**, the way a nine-year-old would ask it. "Why does bread cost more every year?" Not "What is inflation?"
2. **The answer, in one sentence the same child could repeat.** "There is more money than there used to be, so each
   coin buys less."
3. **The thing everybody knows.** One object with a price the viewer already has in their head: a loaf of bread.
   Every number in the film is measured against it.

Then fill in the table of what each line SHOWS. A line with nothing to point a camera at is a line to cut.

## The beat sheet

About 12–25 lines, 110–250 words, 30–58 seconds. One line is one stop of the camera.

| # | Beat | Lines | What it does | The picture |
|---|---|---|---|---|
| 1 | The question | 1 | The title, said. Ten words or fewer | The person it is a problem for, and the thing |
| 2 | The thing you know | 1–2 | One loaf, one price. The anchor | The thing alone, and its price appearing on the word |
| 3 | It was not always so | 1–2 | The same thing, earlier or elsewhere, at another price. Now there is something to explain | The same thing, a second time, with another tag |
| 4 | The cause, step by step | 3–6 | One idea a line. Each line starts from the last one's ending: "so", "and then", "which means" | One island for each idea, joined by a bridge when the ideas are joined |
| 5 | The part you did not know | 1–3 | The surprising consequence. The reason the film is worth watching | The biggest picture of the film: the scales tip, the bar passes his head |
| 6 | The answer | 1 | The one sentence from the top of the page, nearly word for word | Back to the thing you know, changed |
| 7 | You | 1–2 | What it means for the viewer. Then the subscribe line, which belongs to the explanation | The person again, with the thing; then the red sign |

## The rules of a line

- **Present tense, to "you".** "You buy a loaf." Or about Sam: "Sam buys a loaf." Pick one for the film and keep it.
- **6–14 words.** Over 18 is two stops: split it. `npm run check` says which lines are too long.
- **One idea a line.** "The baker pays more for flour, so he charges more for bread" is two lines.
- **One number at a time, and round.** "Twice as much", not "a 97% increase". Spell numbers out, so the voice and the
  captions agree.
- **No word that needs explaining.** If the word is the subject ("inflation"), say it once, late, as the NAME of what
  the viewer has just watched. Never open with it.
- **The first two words of a line may travel.** The camera takes about a second to reach the next thing. Start a line
  with "So", "And when", "Which means", and put the noun after them, so that the thing is in the frame when it is named.
- **Compare with things, not with ideas.** "Like a pizza cut into more slices" works only if the pizza is built and
  shown. If it will not be shown, do not say it.
- **No questions to the viewer after the first line**, no "but wait", no "here's the thing". Say the next fact.
- **Every claim is true.** An explainer that is wrong is worse than none. If a fact is disputed, leave it out or say
  who says so. When a film is handed over, list the claims it makes and where each came from.

## What the engine needs

```narration
# clip 01-question
[1.ask]      Why does a loaf of bread cost more every year?
[2.loaf]     Here is one loaf, and here is its price.
```

- Each `[cue]` line is one stop. Its id is `<beat>.<word>`: `4.flour`, `5.twice`.
- Each `# clip` is one recording, 3–8 lines. Record it to `public/audio/<film>/raw/<clip>.mp3`.
- `python3 scripts/narration.py build <film> --estimate` times the script from its word count. Without
  `--estimate` it measures the recordings.
- The last line contains "subscribe".

## Before it goes to the owner

- [ ] The question is in the first line, and the film answers that question and no other.
- [ ] The answer at the top of the page is in the script, nearly word for word, in beat 6.
- [ ] Every line has a picture in the table, and no picture is "Sam talks".
- [ ] No line has two ideas. No line is over 18 words.
- [ ] Every number is round, spelled out, and measured against the thing you know.
- [ ] Read it aloud. Every sentence could be said to a nine-year-old without stopping to explain a word.
- [ ] The claims are listed, with where each came from.

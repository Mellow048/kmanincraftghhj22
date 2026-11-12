# Narration — __TITLE__

**Status: DRAFT. Not approved, not recorded.** Nothing is built until the owner approves the script.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before writing a word, and read the model,
`src/videos/in-this-town-same-face/narration.md`, to see what a finished one looks like. Copy its SHAPE, never its story.

**The premise, in four sentences.** TODO. In this town, … . Nobody would explain … . I … . On the other side … .

**One sentence:** TODO.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun. 5–12 words.
- Each `# clip` is one recording. Record it to `public/audio/__ID__/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build __ID__`.
- The first line starts "In this town". The last line is the subscribe line.
- This is the short cut: 14 beats, 250–520 words, one to two minutes (`cut: "short"` in film.tsx).

What is planted, and where it pays off (fill this in BEFORE writing lines; a twist nobody planted is a cheat):

| Planted | Pays off |
|---|---|
| TODO | TODO |

The lines below are placeholders. Replace all of them. Cue ids are `<beat>.<word>`: `3.bell`, `13.truth`.

```narration
# clip 01-hook
[1.town]     In this town, everyone did one strange thing
[1.me]       except me.

# clip 02-button
[14.sub]     Subscribe before I find out why.
```

# What not to do: "Never Look at the Moon", a 20-second film called "In This Town"

`contact-sheet.jpg` is six frames of a film another agent built when the owner asked for an "In This Town" video.
It is a base-format short: 19.6 seconds, one bedroom, one continuous camera, six lines. Its header says
*"In This Town", episode 1*. The owner rejected it. The source is on branch `arena/de570a3a-kmanincraftghhj22`
(`src/videos/never-look-at-the-moon/`).

This is the **second** time it happened. The first is [`../monster-egg-v1/`](../monster-egg-v1/README.md).

It is not a bad 20-second short. It is the wrong kind of video:

| | The model: `in-this-town-same-face` | Never Look at the Moon |
|---|---|---|
| Length | 104.7 s (the short cut: 60–118 s) | 19.6 s |
| Cuts | 56. A new picture every 1.7 s | **0.** "One room, one continuous camera, five beats, no cuts" |
| Words | 441, past tense, full sentences, 254 a minute | 30, present tense, six lines |
| The town | A tour of how everybody lives, in eight pictures: the noses, the sleeves, "hmm", the golem, the flowers | Never seen. One bedroom and a window |
| The rule | "Never climb that hill": asked about, broken twice, and explained by what is behind the hill | Stated in line 1 and never explained |
| The ending | Answers the three questions of the first ten seconds, and changes what "except me" meant | "Now it knows where I sleep": a scare, not an answer |
| Captions | Every word | None |
| Sound | Music in eleven sections, 141 effects, built by `scripts/sound.py` from a sheet | A drone and one boom: loose MP3 files placed by the second |
| `topic: "in-this-town"` | yes | no |

## Why it happened

The branch it was built on has no `Topics/` folder, and its `AGENTS.md` does not contain the word "topic": it was
started from a copy of the framework from before this topic existed. The only rules that agent could read said
"you are directing a 20-second Minecraft short", and it obeyed them well. All it had of the format was its name.

## What stops it now

1. `AGENTS.md` opens with the question "which kind of film is this?", before any rule about 20 seconds.
2. `npm run new` refuses a title that opens "In This Town" unless it is given `--topic in-this-town`, and with it
   the film starts from the topic's own starter (`../../template/`), not from the 20-second template.
3. `npm run check` fails a film with no `topic` whose title or narration opens "In this town", or whose `film.tsx`
   names the format. This film fails on two of the three.
4. `npm run check` holds a film that does declare the topic to the topic's cut rate, captions, first and last line,
   and sound, and fails one under the topic's floor of 60 seconds and 250 words. Writing `topic: "in-this-town"` on
   this film would not have saved it: it is 19.6 seconds and 30 words.
5. The render workflow runs the check first, so a film that fails cannot be rendered.

None of that helps an agent working on an **old copy** of the repo. If you were asked for an "In This Town" film
and this folder is not in your checkout, stop and start from the current `main`.

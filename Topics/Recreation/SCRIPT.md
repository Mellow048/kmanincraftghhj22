# Recreation: the script

The script of a Recreation film is written to the seven scenes in [`README.md`](README.md#the-seven-scenes), under
the eight rules above them. This page is the checklist to hold a draft against.

| | The draft must | Why |
|---|---|---|
| 1 | Open on the skill at full speed, with the chant, and show its result inside two seconds | Rule 3. The first draft of the first film opened on a face and was rejected |
| 2 | Have somebody ask "how?" in the hook, and cut the answer off with the rewind | Rule 4 |
| 3 | Be about real life: a house, a street, a job. Nothing from the game | Rule 1 |
| 4 | Use our own lines. Only "Training." and "HUS HUS HUS!" are fixed | Rule 2 |
| 5 | Give the hero one catchphrase in the first failure, and have somebody else say it to him in the last scene | It is what makes the reunion pay |
| 6 | Give the friends a name for him, said as an insult in scene 2 and with respect in scene 7 | The same |
| 7 | Count the training in things, not in time: hundreds of this, thousands of that, and one living victim | A picture for every number |
| 8 | Leave about half the film without words, as `wait` on the next clip | The pictures carry it; the voice only says what cannot be seen |
| 9 | End on the chant | Rule 8: the last sound is the first |
| 10 | Come to 90–120 seconds at `--tempo 1.3`, with no line over 12 words | `topic.json` |

The chant is said fast. It is recorded as one long take and cut by `scripts/split-takes.py`; `speed` in the film's
`takes.json` sets how fast each chant plays (the first film: 1.7 and 1.8). Shortening the gap alone clips the words.

The model: `src/videos/the-barber-who-never-went-to-parties/narration.md`.

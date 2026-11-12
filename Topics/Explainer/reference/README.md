# Reference — nothing here yet

This topic was built before its reference, on the owner's instruction: "reference which we will do later once
youre done". Until a reference is here, everything in this topic is a first setting: see the note at the top of
[`../README.md`](../README.md) and the `provisional` block in [`../topic.json`](../topic.json).

## When the owner supplies a reference

A reference is a real video the owner chose (for this topic, a Zack D Films short or one like it), or a finished
film of ours that the owner approved. Do this, in this order, before changing a rule:

1. Put it in `reference/<name>/` with a `README.md`: where it came from, and what the owner said about it.
2. **Measure it.** A rule with no number behind it is a guess. Write the numbers on its page:

   | Measure | Goes into |
   |---|---|
   | Length in seconds; words; words a minute | `film.seconds`, `film.words`, `film.wordsPerMinute` in `topic.json` |
   | How long the camera rests on each thing (median, shortest, longest) | `film.shotSeconds`, `film.medianShotSeconds` |
   | Hard cuts against continuous moves, and what each cut was for | `camera.maxHardCuts`, and `SHOTS.md` |
   | How a move is timed against the sentence: does the camera arrive before the noun, or on it? | The default `travel` in `flight.tsx`, and `SHOTS.md` |
   | The beats of the script, with seconds and words for each | The beat sheet in `SCRIPT.md` |
   | Who is on screen: a narrator only, or a character things happen to? | "One person it happens to" in `README.md` |
   | How numbers are shown | `PACK.md`, and rule 5 in `README.md` |
   | Captions: are there any, how many words at a time, where | `film.captions`, and the `captions` line of the starter |
   | Sound: is there music, how many sections, effects a minute, loudness | `sound` in `topic.json`, and `SOUND.md` |

3. Keep the evidence beside the numbers: a transcript, a shot log, contact sheets. The page of the treehouse video
   in `Topics/InThisTown/reference/treehouse/` shows what a measured reference looks like.
4. Replace every number and every rule the reference disagrees with. Then delete the `provisional` block from
   `topic.json`, set `state` to `"MEASURED"`, and take the PROVISIONAL note off the top of `README.md`.
5. Study a reference. Never copy it: no sentence, no asset, no joke.

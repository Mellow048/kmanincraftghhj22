# Reference — nothing here yet

This topic was built before its reference, on the owner's instruction: "reference which we will do later once
youre done". Until a reference is here, everything in this topic is a first setting: see the note at the top of
[`../README.md`](../README.md) and the `provisional` block in [`../topic.json`](../topic.json).

## The owner's decision: we make the reference ourselves

Asked for a reference video (2026-11-12), the owner answered: **"you are the one making that reference!"** Nobody is
going to send a video. The reference of this topic will be **our own first film of it**, once he has approved it:

    src/videos/why-does-bread-cost-more-every-year/        "Why Does Bread Cost More Every Year"

He approved its script on 2026-11-13 ("yesboth"). The film is built: 49.2 seconds, 19 lines, one camera that
never cuts, rendered to `renders/why-does-bread-cost-more-every-year.mp4`. **He has not watched it yet.** Its sound
was measured and never listened to: an agent cannot hear. When he approves the film, do the steps below with it,
exactly as for a video somebody sent, and keep it here with its source and its mp4, the way
[`Topics/InThisTown/reference/`](../../InThisTown/reference/README.md) keeps its films. If he asks for changes,
make them first: only an approved film is a reference.

What the film already taught, before any measuring (each is in the film's `kit.tsx` or `narration.md`, with its reason):

- **The caption decides the framing.** It sits at 72% of the height. A stop that looks 2.2 m up at a 5.6 m rack from
  9 to 10 m puts the caption on the plank cabinet under the loaves; from 7.6 m it lay across a row of them.
- **Nobody stands between the lens and the exhibit.** The village had four villagers; two of them were in front of
  one close frame or another, and they were taken out. The two who are left stand at the rack's posts.
- **A long line is one slow move.** "Nobody can buy any more bread than before. Each coin just buys less." is one
  line and 3.9 seconds: the flight is given `travel: 2.1`, so it pushes in for the whole first sentence and lands
  for the second.
- **Dark writing on a pale board is written in cubes** (`Figure`), not in `PixelText`: that font carries a black
  edge, and "10" came out as two blobs.
- **Leave the right-hand edge and the bottom fifth to the phone.** The like and comment buttons sit on the right
  from the middle down, and the channel's name along the bottom.

## When the reference exists

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

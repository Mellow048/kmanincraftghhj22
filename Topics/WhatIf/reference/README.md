# Reference — nothing here yet

This topic was built before its reference, on the owner's instruction: "reference which we will do later once
youre done". Until a reference is here, every number in this topic is In This Town's, and the beat sheet is In
This Town's re-cast for a power: see the note at the top of [`../README.md`](../README.md) and the `provisional`
block in [`../topic.json`](../topic.json).

## The owner's decision: we make the reference ourselves

Asked for a reference video (2026-11-12), the owner answered: **"you are the one making that reference!"** Nobody is
going to send a video. The reference of this topic will be **our own first film of it**, once he has approved it:

    src/videos/what-if-you-could-see-who-had-a-crush-on-you/        "What If You Could See Who Had a Crush on You"

He approved its script on 2026-11-13 ("yesboth"). Its voice is recorded and its clock is measured (`narration.md`
and `timing.json` in that folder); its picture and its sound are not built yet. When the finished film is approved,
do the steps below with it, exactly as for a video somebody sent.

## When the reference exists

A reference is a real "What if" video the owner chose, or a finished film of ours that the owner approved. Do
this, in this order, before changing a rule:

1. Put it in `reference/<name>/` with a `README.md`: where it came from, and what the owner said about it.
2. **Measure it.** A rule with no number behind it is a guess. Write the numbers on its page:

   | Measure | Goes into |
   |---|---|
   | Length in seconds; words; words a minute | `film.seconds`, `film.words`, `film.wordsPerMinute` in `topic.json` |
   | Seconds per shot (median, shortest, longest); number of shots | `film.shotSeconds`, `film.medianShotSeconds` |
   | The beats, with the second each starts and its words | The beat sheet in `SCRIPT.md` |
   | Who tells it: "I" or "you"? Past or present? | "The rules of a line" in `SCRIPT.md`, and rule 1 in `README.md` |
   | How the power is shown, and whether its look ever changes | `SHOTS.md` §1, and `powers.tsx` |
   | Where it is set | `school.tsx`, and the zones of the starter |
   | The first line and the last line, word for word | `film.opensWith`, `film.lastLineContains` |
   | Sound: music sections, effects a minute, loudness | `sound` in `topic.json`, and `SOUND.md` |

3. Keep the evidence beside the numbers: a transcript, a shot log, contact sheets. The page of the treehouse video
   in `Topics/InThisTown/reference/treehouse/` shows what a measured reference looks like.
4. Replace every number and every rule the reference disagrees with. Then delete the `provisional` block from
   `topic.json`, set `state` to `"MEASURED"`, and take the PROVISIONAL note off the top of `README.md`.
5. Study a reference. Never copy it: no premise, no sentence, no asset, no twist.

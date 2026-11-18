# Review against the master prompt: In This Town, My Brother Got Bitten

Reviewed 2026-11-17 against `Topics/InThisTown/MASTERPROMPT.md`. This file is the eleven things its section 6 asks
for; where one of them already lives in another file, it points there.

| # | Asked for | Where |
|---|---|---|
| 1 | Title | **In This Town, My Brother Got Bitten** |
| 2 | Premise, one sentence | A kid's big brother is bitten saving him, and the kid finds out that the barred room under the house is not a cell: it is where half the town was cured. |
| 3 | Three hooks and the one chosen | `narration.md`, "Three hooks, and the one chosen" (hook C) |
| 4 | Complete narration | `narration.md` (72 lines, 528 words, five clips) |
| 5 | Timestamped storyboard | `STORYBOARD.md` (written from the film's own files by `scripts/storyboard.py`) |
| 6 | Characters and assets | `STORYBOARD.md`, last sections; built in `kit.tsx` and `world.tsx` |
| 7 | Caption track | The narration itself, one word at a time: `timing.json` → `words` |
| 8 | Sound plan | `sound.json` (261 effects, each with its reason; 19 music sections; 21 beds) |
| 9 | Rendered video | `renders/in-this-town-my-brother-got-bitten.mp4` (1080x1920, 30 fps, 2:04) |
| 10 | Self-review | Below |
| 11 | Remaining weaknesses | Below |

## The concept (stage 1)

| | |
|---|---|
| Main character | A village kid in an orange robe, about eight, who tells it afterwards |
| Audience | Minecraft players 8–16: every one of them has cured a zombie villager or meant to |
| Conflict | The town's rule says his brother is gone. He is under the floor, and the kid has nothing that works |
| Appeal | A big brother who still does the two knocks through the wall, green |
| Unexpected development | The cellar was built for this. Dad has the cure, because it was once done for him, and for half the town |
| Payoff | "Is there any bread?" Two knocks on the wall again. And something under the floor knocks back |

## Self-review (stage 6), on 72 frames taken from the rendered mp4

| Question | Answer |
|---|---|
| Do the first three seconds create curiosity? | Yes. In the first second: the kid, his brother beside him, a red burst on the arm, the brother green, a "!" over the kid. By 3 s the town has turned its back. |
| Is the premise understandable at once? | Yes: it is the title line, and the picture shows it while it is said. |
| Does every scene contribute? | Yes. Every thing shown in beat 2 (the priest's price, the hat, the barred room, the apple in the window) is paid off in beat 8. |
| Is the middle engaging? | The kid's two wrong cures (bread, the pink potion that hurts him) sit at 40–50%; dad comes down at 60%. |
| Does it get more interesting? | Yes: a rule → a secret under the floor → a kid failing alone → dad knows → the whole town knows. |
| Characters consistent? | Yes. Kid: orange. Brother: blue, with the torn sleeve kept after the cure. Dad: brown. The wooden sword goes kid → brother → back through the bars. |
| Captions accurate? | They are the narration's own words, timed by the aligner. |
| Narration intelligible? | Measured only: the voice is 12.8 dB over everything else (worst half second 5.1 dB). **Nobody has listened.** |
| Does the ending deliver on the opening? | Yes: "he still knocked twice" in line four is the last thing he does, cured. |
| Filler? | None found. 2:04, median shot 1.63 s. |
| Works alone? | Yes. |

## What the review passes changed

- **Pass 1, on 72 stills:** 22 shots restaged whole and about 14 adjusted. The cell had no floor line; faces were lost
  behind bars; several bubbles were out of frame.
- **Pass 2, on 21 shots:** the bite in the first shot was tied to the spoken word and came at 1.3 s. It is now fixed at
  0.45 s so that Rule A holds. The torn sleeve was floating beside the arm. The sun on the stairs was not readable.
- **Pass 3, on the stills and then the rendered film:** the "BAD KIDS?" and "?" bubbles were behind bars; the subscribe
  sign was cut by the frame edge; the pink bottle sat in front of the kid's mouth and read as a tongue; the second
  KNOCK ran off the right edge. All four fixed, and the film rendered again.

## Remaining weaknesses

- **The sound has been measured and never listened to.** 155 effects a minute is at the top of what the earlier films use.
- `2.rule` and `2.gate` are almost the same frame of the gate, one after the other (Rule B). The second has the green
  villager walking out, which is the only difference.
- `5.grey` and `6.bars` are weak frames: a wall and a window, and bars with a bed.
- `7.sun`: the light comes down the stairs and the kid is not in the frame.
- `4.bed`: the bed post cuts the frame in two.
- The cellar is dark in the last shot; the sign and the two eyes carry it.
- A zombie villager with his arms out of the sleeves is new to the pack (`arms`, `eyes` on `Villager`). It is noted in
  `PACK.md`.
- The owner did not review the script (he said "yes go" to the idea).

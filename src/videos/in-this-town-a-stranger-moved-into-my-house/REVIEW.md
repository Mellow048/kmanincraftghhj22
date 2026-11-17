# Review against the master prompt: In This Town, a Stranger Moved Into My House

Reviewed 2026-11-17 against `Topics/InThisTown/MASTERPROMPT.md` (read it first). This file is the eleven things its
section 6 asks for; where one of them already lives in another file, it points there.

| # | Asked for | Where |
|---|---|---|
| 1 | Title | **In This Town, a Stranger Moved Into My House** |
| 2 | Premise, one sentence | A villager lists everything a rude stranger has done to his town and gets every reason wrong, until a raid shows what the bell, the wall and the hole were for. |
| 3 | Three hooks and the one chosen | Below |
| 4 | Complete narration | `narration.md` (the script, clip by clip, with the reason for each beat) |
| 5 | Timestamped storyboard | `STORYBOARD.md` (written from the film's own files by `scripts/storyboard.py`) |
| 6 | Characters and assets | `STORYBOARD.md`, last sections; built in `kit.tsx` and `world.tsx` |
| 7 | Caption track | The narration itself, one word at a time: `timing.json` → `words` |
| 8 | Sound plan | `sound.json` (every effect with its reason), summary in `STORYBOARD.md` |
| 9 | Rendered video | `renders/in-this-town-a-stranger-moved-into-my-house.mp4` (1080x1920, 30 fps, 2:12) |
| 10 | Self-review | Below |
| 11 | Remaining weaknesses | Below |

## The concept (stage 1)

| | |
|---|---|
| Main character | A librarian villager in a red cap, sure of himself and wrong |
| Audience | Minecraft players 8–16: the stranger is them, doing what they do in every village |
| Conflict | He wants the stranger gone; then the raid comes |
| Appeal | The viewer is ahead of the teller in every line ("Clearly, …") |
| Unexpected development | The stranger built the town and cured the teller: it was his house first |
| Payoff | "I moved into his." And: "He still has my bed." |

## Three hooks (stage 2)

| # | What is seen | What is said | The question it leaves |
|---|---|---|---|
| 1 | A villager stands in his own bedroom; a player is asleep in his bed, snoring Z's | "In this town, a stranger moved into my house. He did not knock." | Who is he and why does the villager put up with it? |
| 2 | A villager dropped into a hole in the floor, looking up at a player | "He put me in a hole. Clearly, he is rude." | Why a hole? |
| 3 | Night, a horn, torches; a grey beast at the gate | "The night the horn blew, I knew whose fault it was." | Was it? |

**Chosen:** Hook 1. The first frame already has both of them in it and the wrong thing happening, and it is the title line.

## Self-review (stage 6), on frames taken from the rendered mp4

| Question | Answer |
|---|---|
| Do the first three seconds create curiosity? | Yes. Frame one: a stranger asleep in the teller's bed, and the teller looking at us. |
| Is the premise understandable at once? | Yes. |
| Does every scene contribute? | Yes: each complaint (bell, wall, hole, desks) is a thing the raid then needs. |
| Is the middle engaging? | The horn blows at about 45%; the light goes from day to night with torches for the raid. |
| Does it get more interesting? | Yes: complaints → raid → saved by the complaints → who he really is. |
| Characters consistent? | Yes: one teller (red cap, white robe), one stranger (cyan shirt). |
| Captions accurate? | They are the narration's own words, timed by the aligner. |
| Narration intelligible? | Measured only: the voice is 13.2 dB over everything else. Nobody has listened. |
| Does the ending deliver on the opening? | Yes: "moved into my house" becomes "I moved into his". |
| Filler? | None found. 2:12. |
| Works alone? | Yes. |

## What this review changed

- The committed mp4 was 720x1280. **Rendered again at 1080x1920.**
- No picture change.

## Remaining weaknesses

- **The sound has been measured and never listened to.**
- Two shots (`5.keep`, `7.him`) were changed late and seen only in the final frames, not on stills.
- The teller's own room is returned to several times; each time the angle changes, but it is the same room.
- The owner did not review the script (automatic mode).

## Second pass, 2026-11-17: every shot looked at again, and the first two seconds rebuilt

The owner asked for every frame and every script to be checked again, and for the master prompt and the Monster Village study (`Topics/InThisTown/reference/monster-village/README.md`) to be applied. Monster Village changes its picture eleven times in its first two seconds, round a teller who looks at us.

- **Looked at:** one frame of every one of the 75 shots, from the mp4. No broken shot. `5.dark` and `8.lunch` are dark; readable, not pretty.
- **Hook, before:** one finished picture held for two seconds. Only the Zs moved.
- **Hook, now:** the lens is closer, and something arrives about every 0.3 s: a Z, his pickaxe against the bed, a question mark over the villager, a loaf on the blanket, a block of dirt on the floor, another on top, more Zs, and a ! as the villager looks at us. Each has its own sound (258 effects, was 254).
- **Script against the benchmark:** "I", other people speak, a wrong guess, a clue list, an open ending. Parts are in the present tense; the benchmark is all past. Not changed: it would mean recording the voice again.
- **Still true:** nobody has listened to the mix.

## Third pass, 2026-11-17: "perfect the five like Monster Village"

- **Picture:** `8.lunch`, the moment he stops being green, was the darkest face in the film. It has a warm light on it now.
- **Sound:** every effect is 1 dB quieter, and the 7 that this would have buried were put back. The voice is 13.8 dB over everything else on the median (was 13.2; Monster Village is 14.1).
- **Script:** not changed. The town's habits are told in the present ("we say hmm") and what the stranger did in the past; that is a frame, not a slip.
- Rendered again at 1080x1920 and checked on frames of the file.

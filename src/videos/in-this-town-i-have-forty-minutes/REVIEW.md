# Review against the master prompt: In This Town, I Have Forty Minutes

Reviewed 2026-11-17 against `Topics/InThisTown/MASTERPROMPT.md` (read it first). This file is the eleven things its
section 6 asks for; where one of them already lives in another file, it points there.

| # | Asked for | Where |
|---|---|---|
| 1 | Title | **In This Town, I Have Forty Minutes** |
| 2 | Premise, one sentence | The wandering trader has forty minutes in every town before he vanishes, has been to nine hundred towns, and has never sold a thing. |
| 3 | Three hooks and the one chosen | Below |
| 4 | Complete narration | `narration.md` (the script, clip by clip, with the reason for each beat) |
| 5 | Timestamped storyboard | `STORYBOARD.md` (written from the film's own files by `scripts/storyboard.py`) |
| 6 | Characters and assets | `STORYBOARD.md`, last sections; built in `kit.tsx` and `world.tsx` |
| 7 | Caption track | The narration itself, one word at a time: `timing.json` → `words` |
| 8 | Sound plan | `sound.json` (every effect with its reason), summary in `STORYBOARD.md` |
| 9 | Rendered video | `renders/in-this-town-i-have-forty-minutes.mp4` (1080x1920, 30 fps, 1:52) |
| 10 | Self-review | Below |
| 11 | Remaining weaknesses | Below |

## The concept (stage 1)

| | |
|---|---|
| Main character | The wandering trader: blue hooded robe, two llamas, a clock over his head. He is wrong about why nobody buys ("I think my prices are too low") |
| Audience | Minecraft players 8–16: every one of them has walked past him, and most have taken his leads |
| Conflict | One sale before the clock says zero, in a town where everybody sells and nobody buys |
| Appeal | Being ignored and staying cheerful; a kid's kindness; a present for a mum |
| Unexpected development | His first emerald is worth more spent than kept: he buys a loaf, and the one emerald goes round the whole town |
| Payoff | Two sales, every window lit, and zero. Then a new town, forty minutes, and one emerald |

## Three hooks (stage 2)

| # | What is seen | What is said | The question it leaves |
|---|---|---|---|
| 1 | The trader beside a little stall with two llamas; over his head a clock, 40:00, already counting down; a town walks past him | "In this town, I have forty minutes." | Forty minutes until what? |
| 2 | Night. A clock floats over nothing at 3:00. A kid with a torch pulls at the air under it | "At three minutes, somebody pulled my robe." | Who is invisible, and what happens at zero? |
| 3 | A player walks away with two llamas on leads; the trader holds out his sleeves for payment | "He took the llamas. He did not pay. I think he forgot." | Will he get them back? |

**Chosen:** Hook 1. It is the title line, the clock is a reason to stay to the end from the first frame, and it is the picture every player knows. Hook 2 is the turn and hook 3 is the middle.

## Self-review (stage 6), on frames taken from the rendered mp4

Sixteen frames were pulled from the mp4 (1 s to 110 s) and looked at, after two passes on stills of every shot.

| Question | Answer |
|---|---|
| Do the first three seconds create curiosity? | Yes: frame one is the trader, his llamas and a clock at 39:59 that is already running. |
| Is the premise understandable at once? | Yes: the clock is over his head in every shot he is in. |
| Does every scene contribute? | Yes. The dead bush of `2.bush` is the thing sold in `6.*` and the last picture in `8.*`; the llamas taken in `4.*` are the part-two hook. |
| Is the middle engaging? | The only real customer takes the llamas at 46 s (41%), and the sun goes down on it. |
| Does it get more interesting? | Yes: a shop nobody wants → a town of salesmen → robbed → invisible at night with nine minutes → a kid → the emerald goes round → zero. |
| Characters consistent? | Yes: blue hood and gold band, the clock, the kid in yellow, the mum in red, the fisherman in teal. |
| Captions accurate? | They are the narration's own words, one at a time. |
| Narration intelligible? | Measured only: the voice is 15.8 dB over everything else (median), 4.5 dB in the worst half second (104 s). Nobody has listened. |
| Does the ending deliver on the opening? | Yes: 40:00 in a new town, and this time he has one emerald. |
| Filler? | None found. 1:52. |
| Works alone? | Yes. The last line ("I am going to buy my llamas back") is a second story, not a missing end. |

## What the staging passes changed

- **Two people at a stall:** from the side one of them always sat on the frame edge. The customer now stands a block out from the counter and the lens aims near the shop, further back.
- **Two blue robes** in one frame read as one person: the fisherman is teal.
- **Carried things** (the loaf, the emerald) hung over the face: lowered below the nose.
- **Night:** the trader far from the lens was a black shape. The night shots are closer, with one warm light, and the windows are dark until the emerald goes round (`7.lights`), so the town lighting up is seen.
- Every shot is written out in its scene file (the check refuses shots built by a helper).

## Remaining weaknesses

- **The sound has been measured and never listened to.** 212 effects (114 a minute), the owner's track under all of it, -15.3 LUFS.
- **The Minecraft facts are from memory**; the wiki could not be opened from the sandbox. They are: the trader stays forty minutes (in the game it is 40 to 60); he comes with two llamas on leads; he drinks a potion of invisibility at night; he sells saplings, slime balls, fish in buckets and dead bushes for emeralds. "Five emeralds for everything" and "nine hundred towns" are the story's own.
- The clock is a floating sign, which the game does not have. It is the film's one invention, and it is on screen from frame one so nobody has to be told.
- In the game he does not buy anything. Here he buys one loaf; that is the twist, and a fan may say so.
- It is one square for most of the film (the field at the start, the dark road and the new town are the other places).
- The owner did not review the script (automatic mode).

## Second pass, 2026-11-17: every shot looked at again, and the first two seconds rebuilt

The owner asked for every frame and every script to be checked again, and for the master prompt and the Monster Village study (`Topics/InThisTown/reference/monster-village/README.md`) to be applied. Monster Village changes its picture eleven times in its first two seconds, round a teller who looks at us.

- **Looked at:** one frame of every one of the 54 shots, from the mp4. No broken shot. Two clock close-ups near 70–78 s are alike.
- **Hook, before:** one held picture; only the clock changed.
- **Hook, now:** the trader hops in under his clock, a llama pops up at one shoulder, then the other, his shop lands at his elbow, and a villager walks past at the edge of the frame. Each has its own sound. The lens is closer.
- **Sound:** two effects that the new mix buried were cut (`2.bush` creak, `3.town` coins): 213 effects.
- **Script against the benchmark:** "I", other people speak, a wrong guess, the emerald's trip said back as a list, an open ending. Not changed.
- **Still true:** the trader facts are from memory. Nobody has listened to the mix.

## Third pass, 2026-11-17: "perfect the five like Monster Village"

- **Picture:** `7.tell` and `7.two` were the same close-up twice with one shot between them. `7.two` is now from low at his other side, looking up past the emerald in his sleeves to the red clock.
- **Script and sound:** not changed. The voice was already 15.8 dB over everything else (Monster Village is 14.1). "I have forty minutes" is a frame in the present; what happened in the town is told in the past.
- Rendered again at 1080x1920 and checked on frames of the file.

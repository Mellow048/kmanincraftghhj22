# Review against the master prompt: In This Town, Being Scared Is My Job

Reviewed 2026-11-17 against `Topics/InThisTown/MASTERPROMPT.md` (read it first). This file is the eleven things its
section 6 asks for; where one of them already lives in another file, it points there.

| # | Asked for | Where |
|---|---|---|
| 1 | Title | **In This Town, Being Scared Is My Job** |
| 2 | Premise, one sentence | A villager whose job is to scream at the zombie outside his window makes friends with the zombie, and finds out what the job was for. |
| 3 | Three hooks and the one chosen | Below |
| 4 | Complete narration | `narration.md` (the script, clip by clip, with the reason for each beat) |
| 5 | Timestamped storyboard | `STORYBOARD.md` (written from the film's own files by `scripts/storyboard.py`) |
| 6 | Characters and assets | `STORYBOARD.md`, last sections; built in `kit.tsx` and `world.tsx` |
| 7 | Caption track | The narration itself, one word at a time: `timing.json` → `words` |
| 8 | Sound plan | `sound.json` (every effect with its reason), summary in `STORYBOARD.md` |
| 9 | Rendered video | `renders/in-this-town-being-scared-is-my-job.mp4` (1080x1920, 30 fps, 2:23) |
| 10 | Self-review | Below |
| 11 | Remaining weaknesses | Below |

## The concept (stage 1)

| | |
|---|---|
| Main character | A villager in a yellow hard hat, who thinks an iron farm is a town and he is staff |
| Audience | Minecraft players 8–16: every one of them has built this machine |
| Conflict | No scream, no iron: the boss comes up with a new zombie and a bucket of lava for the old one |
| Appeal | A friendship through glass (waving, tic tac toe, "urr"); the viewer knows where the iron men go |
| Unexpected development | He screams for real, for Kevin, and the iron man that appears takes their side |
| Payoff | "We were not the staff. We were the machine." Then the edge, at night, and a bed lighting up far below |

## Three hooks (stage 2)

| # | What is seen | What is said | The question it leaves |
|---|---|---|---|
| 1 | A villager in a glass box in the sky screams AAAH! at a zombie in a boat with a name tag, then calmly looks at us | "In this town, being scared is my job." | Why is that a job, and why is the zombie called Kevin? |
| 2 | An iron man pops out of the air, takes one step, and water carries him off | "When we are scared enough, an iron man pops out of the air." | Where does the water go? |
| 3 | A player holds a bucket of lava over a zombie who is waving | "And for Kevin, he had a bucket." | Will he do it? |

**Chosen:** Hook 1. It has the odd job, the odd pair and the name tag in one frame, and it is the title line. Hooks 2 and 3 are the setup and the crisis.

## Self-review (stage 6), on frames taken from the rendered mp4

| Question | Answer |
|---|---|
| Do the first three seconds create curiosity? | Yes: a scream bubble at a zombie who does not react, in a glass room in the sky. |
| Is the premise understandable at once? | Yes. |
| Does every scene contribute? | Yes: Gary's sleep-scream and Barb's count both come back as plot (`5.eep`, `6.barb`, `7.count`). |
| Is the middle engaging? | The boss looks up at 57 s (40%) and comes back with the rope and the bucket. |
| Does it get more interesting? | Yes: job → friend → no iron → the boss → the real scream → the fire → the edge. |
| Characters consistent? | Yes: hard hat, nightcap (Gary), grey bun (Barb), Kevin's red scarf and tag, the boss's red shirt. |
| Captions accurate? | They are the narration's own words. "urr" and "eep" were taught to the aligner so they land on time. |
| Narration intelligible? | Measured only: the voice is 13.4 dB over everything else. Nobody has listened. |
| Does the ending deliver on the opening? | Yes: "my job" in line one, "it was never a job" at the turn. |
| Filler? | None found. 2:23. |
| Works alone? | Yes. |

## What this review changed

- **Light (master prompt 2G):** it was daylight from start to finish. Now: day for the ordinary life and the crisis, sunset from "Then it was just us", night with two torches for the edge of town, so the bed lighting up below is the brightest thing in the film.
- **Captions over faces (2F):** five close-ups were reframed so the face sits above the caption.
- **The last look down:** from 60 blocks the night fog made the bed a grey smudge; the lens now goes down to it.
- Rendered at 1080x1920.

## Remaining weaknesses

- **The sound has been measured and never listened to.**
- It all happens on one stone platform. The reference has streets and houses. Under the floor, the ground far below and the dusk and night at the end are the variety there is.
- Kevin's name tag is cut by the frame edge in a few over-the-shoulder shots.
- The owner did not review the script (automatic mode).

## Second pass, 2026-11-17: every shot looked at again, and the first two seconds rebuilt

The owner asked for every frame and every script to be checked again, and for the master prompt and the Monster Village study (`Topics/InThisTown/reference/monster-village/README.md`) to be applied. Monster Village changes its picture eleven times in its first two seconds, round a teller who looks at us.

- **Looked at:** one frame of every one of the 71 shots, from the mp4. No broken shot.
- **Hook, before:** one held picture from the side: the teller small and in profile, the scream bubble gone by 1.5 s.
- **Hook, now:** the lens is in front and closer, and the teller faces it. He hops and screams; KEVIN lands over the zombie; the neighbours' screams pop left and right; an iron man pops out of the air behind the glass, then another, so the reason for the screaming is in the picture before he explains it; the scream stops dead and both he and Kevin look at us. 247 effects, was 242.
- **Script against the benchmark:** it is told in the present tense until the boss arrives. The benchmark is past tense throughout. Not changed: it would mean recording the voice again. Say if you want that.
- **Still true:** one stone platform and a blue sky for most of the film; the least varied of the five to look at. Nobody has listened to the mix.

## Third pass, 2026-11-17: "perfect the five like Monster Village"

- **Script and voice:** the first clip (`1.job` to `3.barb`, 29 lines) was told in the present tense. Monster Village is told in the past from its first word. The clip was written again in the past tense and recorded again with the same voice: "In this town, being scared was my job." Two lines gained from it: "I thought it meant good morning" is now a wrong guess said out loud, which `5.bye` answers; and "So one morning, I looked at Kevin, and I opened my mouth, and nothing came out" is an event, where it used to be a habit. The other two clips are the old recordings. The new take is a little slower than the old one, so the whole voice runs at tempo 1.42 (was 1.38) to keep the pace: 144.5 s, 240 words a minute.
- **Picture:** shot two, `1.zombie` ("There was a zombie outside my window"), had the teller's back over half the frame and Kevin behind it. The lens moved: Kevin and his tag fill the frame and the hard hat is a strip at the edge. Every shot of the new clip whose length changed was looked at again at three moments.
- **Sound:** rebuilt on the new timing; every effect 1 dB quieter and the buried ones put back. The voice is 14.2 dB over everything else on the median (was 13.4; Monster Village is 14.1).
- **Still true:** one stone platform under a blue sky. `6.real` still says "I have screamed every day for two years" (old recording). Nobody has listened: in particular nobody has heard whether the new first clip and the two old ones sound like one take.
- Rendered again at 1080x1920 and checked on frames of the file.

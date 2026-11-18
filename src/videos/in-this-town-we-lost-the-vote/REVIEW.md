# Review against the master prompt: In This Town, We Lost the Vote

Reviewed 2026-11-17 against `Topics/InThisTown/MASTERPROMPT.md` (read it first). This file is the eleven things its
section 6 asks for; where one of them already lives in another file, it points there.

| # | Asked for | Where |
|---|---|---|
| 1 | Title | **In This Town, We Lost the Vote** |
| 2 | Premise, one sentence | The mobs that lost the Mob Vote all live in one town, and every morning every one of them checks the mail, because once a letter came. |
| 3 | Three hooks and the one chosen | Below |
| 4 | Complete narration | `narration.md` (the script, clip by clip, with the list of lines that lean on a fact) |
| 5 | Timestamped storyboard | `STORYBOARD.md` (written from the film's own files by `scripts/storyboard.py`) |
| 6 | Characters and assets | `STORYBOARD.md`, last sections; built in `kit.tsx` and `world.tsx` |
| 7 | Caption track | The narration itself, one word at a time: `timing.json` → `words` |
| 8 | Sound plan | `sound.json` (every effect with its reason), summary in `STORYBOARD.md` |
| 9 | Rendered video | `renders/in-this-town-we-lost-the-vote.mp4` (1080x1920, 30 fps, 1:39) |
| 10 | Self-review | Below |
| 11 | Remaining weaknesses | Below |

## The concept (stage 1)

| | |
|---|---|
| Main character | A yellow cow with flowers on. She tells it, flat and proud: "I lost to a squid" |
| Audience | Minecraft players 8–16. Fans know every face in the town; everybody else knows what not being picked is |
| Conflict | She wants a letter. Her best friend got one and left; then the stage is taken away and there will be no more votes |
| Appeal | Not being picked; a friend who gets out; hoping anyway; finding out you were wanted |
| Unexpected development | The friend comes back with a chest: every vote they ever got. "They could only pick one" |
| Payoff | Morning. She checks the mail like every morning, and her flag is up |

## Three hooks (stage 2)

| # | What is seen | What is said | The question it leaves |
|---|---|---|---|
| 1 | A yellow cow with flowers on her back looks at us. Behind her a street of strange creatures, each with a red LOST plate over its head | "In this town, everybody lost a vote." | What vote, and who are they? |
| 2 | A row of mailboxes at dawn. One red flag goes up by itself | "One time, a letter came." | For whom, and what did it say? |
| 3 | A golem made of copper, green all over, as still as a statue, with a bird on his head | "He stood so still, he went green." | Is he alive? |

**Chosen:** Hook 1. It is the title line, and a viewer who has never heard of the vote still gets it from the picture: everybody here has a LOST plate. "I am a cow with flowers on. I lost to a squid." is the joke that keeps him. Hook 2 is the objective and hook 3 is the middle.

## Self-review (stage 6), on frames taken from the rendered mp4

Twenty-six frames were pulled from the mp4 (0.5 s to 98 s) and looked at, after three passes on stills of every shot at two moments each. The mp4 is 1080x1920, 30 fps, 1:39, 64 MB. Light: day, stage lights, day, sunset at the gate, night with lanterns, a grey wet morning, night again, a bright morning.

| Question | Answer |
|---|---|
| Do the first three seconds create curiosity? | Yes: a yellow cow, a street of creatures nobody has seen in the game, and LOST over every head. By 4 s she has lost to a squid. |
| Is the premise understandable at once? | Yes for a fan. A viewer who does not know the vote gets "a town of losers" from the plates and the stage by 10 s. |
| Does every scene contribute? | Yes. The button he presses for fun (`3.friend`) is the gate button (`3.button`, `6.press`, `6.left`); the flower the stone one holds (`2.stone`) becomes the stack of votes (`6.hold`); the morning drill (`2.mail`) comes back empty (`5.dark`). |
| Is the middle engaging? | Her friend's flag goes up at 39 s (40%) and he walks out of the gate at sunset. |
| Does it get more interesting? | Yes: who they are → the letter → she tries to look real → the stage is taken away → the chest → her flag. |
| Characters consistent? | Yes: each is one colour and one shape (yellow cow, blue hood, green bush, barrel, grey stone with a red cloak, blue crab, penguin, orange golem), and each mailbox has its owner's colour on it. |
| Captions accurate? | They are the narration's own words, one at a time. |
| Narration intelligible? | Measured only: the voice is 14.8 dB over everything else (median), 5.5 dB in the worst half second. Nobody has listened. |
| Does the ending deliver on the opening? | Yes: "everybody lost" in line one; "We did not lose because nobody wanted us" at the turn; her flag at the end. |
| Filler? | None found. 1:39, the shortest of the five. |
| Works alone? | Yes. The unopened letter is the part-two hook, not a missing end. |

## What the staging passes changed

- **The cow is long.** Standing between the lens and a neighbour she covered him. In every two-shot she now stands beside or behind the neighbour, never in front.
- **Night was blown out**: lantern, fill and a moonlight all at once turned her white. The lantern is a third as strong and the fills are under half.
- **Mailbox close-ups** were shot from the north, which is the shadow side, and the flag was behind the box. They are shot from the south-west now, and the flag of a west-side box is on the south side.
- **The ring round the chest**: the bush stood between the lens and the chest. The side toward the lens is left open.
- **The chest** was the golem's own orange and vanished against him: it is darker, with green edges.
- Sad eyebrows were tilted the angry way round.
- The golem had his back to the lens when he pressed her nose.

## Remaining weaknesses

- **The sound has been measured and never listened to.** 224 effects (136 a minute), the owner's track under all of it, -15.2 LUFS.
- **The Minecraft facts are from memory**; the wiki could not be opened from the sandbox. No year and no real name is said, so a wrong date cannot be heard. The lines that lean on a fact are listed at the end of `narration.md`: the glow squid beat the flower cow and the ice thrower; the bush and the copper golem lost together; the hide-and-seek one and the little stone golem lost together; the crab and the penguin lost to the armadillo; the votes were ended; the copper golem was added four years after he lost, goes green, and carries things between chests. **Please check these before upload: a fan will.**
- **None of the cast is copied from the game's art.** They are built from blocks from memory of the vote trailers. A fan will know the cow, the copper golem and the squid at once; the bush, the hider (a barrel with two eyes) and the stone one are looser.
- Only the squid's own vote is shown as a stage. The film says "every year, three of us"; in the real votes the number changed.
- A viewer who has never heard of the Mob Vote may not feel the ending as strongly. The film is the "wild one" of the five for that reason.
- The stage flashback and the storeroom are short (four shots and one); most of the film is the one street, shot from both ends and from above.
- The owner did not review the script (automatic mode).

## Second pass, 2026-11-17: every shot looked at again, and the first two seconds rebuilt

The owner asked for every frame and every script to be checked again, and for the master prompt and the Monster Village study (`Topics/InThisTown/reference/monster-village/README.md`) to be applied. Monster Village changes its picture eleven times in its first two seconds, round a teller who looks at us.

- **Looked at:** one frame of every one of the 48 shots, from the mp4. No broken shot.
- **Hook:** not changed. It was already the closest of the five to the benchmark: the cow faces the lens and a LOST plate pops over a head every 0.12 s for the first second. The mp4 is the one rendered before.
- **Script against the benchmark:** past tense, "I", a wrong guess ("We thought that was the end of him"), her own try fails, a second and bigger truth, an open ending. Thinner than the benchmark in two places: nobody but the letter speaks, and no clues are said back as a list.
- **Still true:** the Mob Vote facts and the cast are from memory. Nobody has listened to the mix.

## Third pass, 2026-11-17: "perfect the five like Monster Village"

- **Nothing changed in this pass, and the mp4 is the one rendered before.** Its first two seconds already build the way the reference's do, its script is in the past tense, its voice is 14.8 dB over everything else (Monster Village is 14.1), and all 48 shots were looked at again in the second pass.
- Where it is still thinner than the reference: nobody speaks but the letter. Changing that means recording it again; ask first.

# MASTERPROMPT-01 review — our films, measured against the brief

*2026-11-11. The owner's news: Monster Village Part 1 passed 15,000 views. The brief is now
[`MASTERPROMPT-01.md`](MASTERPROMPT-01.md) on this branch, and `AGENTS.md`, `CLAUDE.md` and `GEMINI.md` point at it
first. This page is the brief's Stage 6 — the finished films reviewed as a viewer meets them — and the record of
what the review changed.*

**One limitation, stated up front.** The agent that wrote this review could not see images this session: every
`read_file` on a still came back "no vision capabilities". So no frame was judged by looking at it. Instead every
question in the brief's self-review was turned into a number, with a tool built for it
([`scripts/film-metrics.py`](scripts/film-metrics.py)) and calibrated against the reference film itself. Where a
judgement below is about how something *looks*, it is a measurement, and it says so. Nobody has **listened** to
either mix: an agent cannot. Both need one human pass with sound on.

## The reference, in the same numbers

Monster Village Part 1 (221 s, 720×1280) — the film that worked:

| shots | median shot | longest shot | luma start / middle / end | opening detail | opening motion | flat frames | black frames |
|---|---|---|---|---|---|---|---|
| 89 | 2.33 s | 6.4 s | 101 / 62 / 75 (day → dark → lantern light) | 65.3 | 3.41 | 0 % | 0 % |

Everything below is read against that row.

## What the review found and changed

| Film | What the numbers said | What was done |
|---|---|---|
| *What If Every Lie Added a Netherite Block?* | The **second shot of the film measured 24.6 luma out of 255** — a black screen two seconds in, in the hook. Five more shots in the escalation sat at 26–37. And one effect left the voice only **3.3 dB** above the mix at 42 s. | `CloseKey`, `StreetFill` and `NightWash` added to the film's kit; seven shots lit and three re-framed; five effects trimmed and the mix rebuilt. Re-rendered: **no shot is below 40 luma now** (was six below 37), black frames 4.6 % → 1.5 %, opening detail 70.1 → 74.8, worst voice-over-mix 3.3 → 4.7 dB. |
| *What If I Could Hear What Blocks Remember?* | Four shots in the night stretch had **half of every frame below 10 luma** (10.dark 18.4, 10.last 17.2). The opening moved at **1.94** against the reference's 3.41 and carried less detail (38.9 vs 65.3). | `NightGym` added to the film's kit; nine shots lit, the opening widened (5.8 m → 7.4 m) and driven in to 4.9 m. Re-rendered: **no shot is below 22 luma now** (was two at 18 and 17), black frames 3.6 % → 0 %, opening motion 1.94 → 4.94 and detail 38.9 → 48.7. |

Both films are under the brief's 175 s ceiling, both are 1080×1920@30, both put the subscribe line **after** the
payoff, and both caption 99.8 % of their runtime from the recorded words.

---

# Film 1 — What If Every Lie Added a Netherite Block?

**1. Title.** What If Every Lie Added a Netherite Block?

**2. Premise.** Every deliberate lie drops one invisible Netherite block into the liar's pack with real weight;
the boy lies his way through a broken parade lantern until the weight puts him on his knees in a storm, and the
only thing that lifts it is telling his best friend the truth — and admitting he cannot fix it alone.

**3. Three hooks, and the one used.**

| # | Opening | What appears | The question it makes | Verdict |
|---|---|---|---|---|
| A **(used)** | The power already at work | A dark Netherite cube lands in the pack behind the teller as a storm swings the parade lantern; his friend sees the lantern, not the cube. Then: "One block made my knees buckle." | What is happening to him, and why can nobody else see it? | **Selected.** It obeys the brief exactly: no logo, no greeting, the impossible thing is on screen inside the first second, and the cost is stated in the second line. |
| B | Cold open on the consequence | The boy already on his knees in the rain, five cubes deep, then cut back four hours | How did he end up here? | Strong, but it spends the first shot on a scene the viewer cannot yet care about, and it hides the rule behind a flashback. |
| C | The rule, told straight | Two friends building the lantern, a voice stating the rule over it | What happens when he lies? | The safest and the weakest: ordinary Minecraft for two seconds before anything is at stake. |

**4. Script.** [`src/videos/what-if-every-lie-added-a-netherite-block/narration.md`](src/videos/what-if-every-lie-added-a-netherite-block/narration.md)
— 358 words, 91.1 s, ~237 words a minute, recorded in five clips. The seven beats are all present: hook (1),
setup (2), objective (5 — "I wanted our lantern to win the blue ribbon"), complication (6 — the switch snaps and he
denies it), escalation (7–9 — four more lies, four more blocks), twist and turn (10–11 — the storm, the friend
holding the rope alone, the shouted admission), payoff (12–13 — the last three blocks go, they repair it together,
the street cheers).

**5. Storyboard.** `node scripts/shot-log.mjs what-if-every-lie-added-a-netherite-block --out out/review/what-if-every-lie-added-a-netherite-block/shot-log.md`
(written to `out/`, which git ignores) — 48 shots in 14 beats, each with its start, its hold, the words over it, the place, the camera move and why this
picture for these words. Median shot 1.83 s.

**6. Characters and assets.** The teller (`Hero`, orange tee, dark trousers, 1.44 m kid scale); the best friend
(`Friend`, teal tee); `ParadeFloat` (the cart, with the blue ribbon they want to win); `ParadeLantern` (2.6 m tall,
with the redstone switch that turns from green to red); `NetheritePack` (up to five cubes, visible to the viewer
and the teller only); the parade street, the school gate, rain and lightning. Lighting added by this review:
`CloseKey`, `StreetFill`, `NightWash`.

**7. Captions.** Engine-generated, one word at a time, from `timing.json` — so they cannot drift from the recorded
voice. Measured on the delivered file: **99.8 % of the film has lettering on screen**, against
98.0 % of it that has speech. Uppercase pixel face, white with a black outline, placed low so it clears
the faces.

**8. Sound.** Six music sections (tense 0:00 → wonder 4.2 → curious 23.6 → sneak 28.1 → tense 55.4 → hope 64.6),
five room beds, 74 effects (48.8 a minute). Music 19 dB under the voice, beds 24.6 dB under, −14.7 LUFS, true peak
−2.2 dB. The voice sits **15.4 dB** above everything else (median); the worst half-second was **3.3 dB** before this
review — five effects were trimmed (`7.blocks` scrape −5, `3.truth` power_down −5, `10.danger` heartbeat and drop
−4, `11.spare` power_down −4), and it is now **4.7 dB**, with no effect buried under the music.

**9. Rendered file.** `renders/what-if-every-lie-added-a-netherite-block.mp4` — 59 MB, h264 + AAC, 1080×1920,
30 fps, 2732 frames, 91.1 s. Verified with ffprobe.

**10. Self-review.**

| The brief's question | The answer |
|---|---|
| Do the first three seconds create curiosity? | Yes, and they now stay visible: the opening shot measures **74.8** detail (reference 65.3) with 3.0 motion with the cube landing on the word. The old second shot — a black frame at 2.3 s — is gone (24.6 → 68.7 luma). |
| Is the premise immediately understandable? | The rule is stated and shown at once (3.rule, 8.3 s) and the cost is shown before any lie is told (3.danger). |
| Does every scene contribute? | 48 shots, 14 beats, no detour: each lie adds a cube, each cube costs movement. |
| Is the middle engaging? | The run from 39 s (the invented spare) to 66 s (the shouted admission) is the densest part: seven cuts, the storm, the weight. It was also the darkest — now lit. |
| Does it become increasingly interesting? | Stakes are numerical and climb: 1 cube → 5 → he cannot breathe → he cannot stand. |
| Are characters consistent? | One cast, one street, one lantern, one pack, all from the film's own kit. |
| Are captions accurate? | Generated from the words actually recorded; measured above. |
| Is the narration intelligible? | Yes by measurement: 15.4 dB median over the mix, worst moment 4.7 dB. Not yet confirmed by a human ear. |
| Does the ending deliver on the opening? | The opening asks what the weight does; the ending is the weight leaving, the lantern lit crooked, and the empty pack set down beside it. |
| Is there filler? | No. 91 s, no padding to reach a length. |
| Does it work alone? | Yes. It is written as a standalone story with its own hook, rule, price and payoff. |
| Is the CTA in the right place? | Yes: the story ends at 86.7 s (the empty pack beside the lantern); the subscribe line runs 88.4–91.1 s, after the payoff. |

**11. Remaining weaknesses.**
- The storm is still the darkest stretch: `10.storm` 40.7, `10.run` 45.1, `13.light` 46.7, against a film median of
  about 100. Inside those shots the lightning gap drops further still (one frame of `10.run` measures 17). That is
  the reference's own range for a night shot — its darkest is 31 — but on a dim phone the storm is the hardest
  thing to read, and it is where the story peaks.
- `13.light`, the payoff, is bright in the middle and black at the edges: it reads as a lantern in the dark, which
  is the intent, but it is the one shot I would lift again if the owner wants more.
- Worst voice-over-mix moment is 4.7 dB at 14.4 s (a `power_down` under "cleared"), down from 3.3 dB at 42 s before
  this pass. Audible, but still the tightest half-second in the film.
- 1.5 % of frames are still under 22 luma, all of them in the storm.
- Nobody has listened to it. The numbers say the words are clear; only the owner can say they *sound* right.

---

# Film 2 — What If I Could Hear What Blocks Remember?

**1. Title.** What If I Could Hear What Blocks Remember?

**2. Premise.** A boy can touch any block and hear the last phrase it heard — but never who said it — and he uses
it to find out why his best friend has gone quiet, until he mistakes a rehearsed goodbye for a real one.

**3. Three hooks, and the one used.**

| # | Opening | What appears | The question it makes | Verdict |
|---|---|---|---|---|
| A **(used)** | The impossible thing, unlabelled | An ordinary gym brick pulses blue and whispers "I can't stay"; the boy's fingertips are on it | Who said that, and when? | **Selected.** A wall says the one sentence the narrator fears. The power, the mystery and the danger arrive in the same two seconds. |
| B | The friend going quiet | Eli with his script, not looking up, in a bright corridor | Why has he gone quiet? | Human and warm, but it opens on an ordinary scene and withholds the power for a shot — the brief's first rule is to show the unusual thing first. |
| C | The mistake first | The boy running through the school at night, chasing whispers | What is he chasing? | Energetic, but it asks the viewer to care about a chase before they know the rule. |

**4. Script.** [`src/videos/what-if-i-could-hear-what-blocks-remember/narration.md`](src/videos/what-if-i-could-hear-what-blocks-remember/narration.md)
— 415 words, 98.6 s, ~254 words a minute. The plant and payoff are the story: Eli carries a script and says "it's
just a play" (planted 4.5 s, paid off 93.7 s), the gym wall repeats "I can't stay" (the first line Eli rehearsed),
and the power can never say who spoke.

**5. Storyboard.** `node scripts/shot-log.mjs what-if-i-could-hear-what-blocks-remember --out out/review/what-if-i-could-hear-what-blocks-remember/shot-log.md`
(written to `out/`, which git ignores) — 58 shots in 14 beats. Median shot 1.7 s.

**6. Characters and assets.** The teller (`Hero`), Eli (`Friend`), the pack's shared school set (`Classroom`,
`SchoolHall`, `Gym`, `LunchRoom`), `Classmate` crowd figures, the play script, the echo rings (`EchoTrace`) and the
subscribe sign. Lighting added by this review: `NightGym` (corridor light and stage spill).

**7. Captions.** One word at a time, from `timing.json`. Measured on the delivered file: **99.8 %** of the film has
lettering on screen; the words themselves cover 98.0 % of it. Same face and placement as film 1.

**8. Sound.** Six music sections, five beds, 105 effects (63.9 a minute — the densest sheet we have). Music 19 dB
under the voice, beds 29.9 dB under, −14.8 LUFS, true peak −2.5 dB. Voice **16.2 dB** over the rest (median),
worst moment **6.0 dB** at 96.0 s, under the cheer and the ding of the last beat.

**9. Rendered file.** `renders/what-if-i-could-hear-what-blocks-remember.mp4` — 57.3 MB, h264 + AAC, 1080×1920,
30 fps, 2957 frames, 98.6 s. Verified with ffprobe.

**10. Self-review.**

| The brief's question | The answer |
|---|---|
| Do the first three seconds create curiosity? | Yes, and after this pass the opening carries more: the shot was widened from 5.8 m to 7.4 m and driven in to 4.9 m across the line (detail **48.7**, was 38.9; motion **4.94**, was 1.94 — the reference is 65.3 / 3.41). |
| Is the premise immediately understandable? | Yes: touch a block, hear a phrase, never a speaker. Stated by 18 s. |
| Does every scene contribute? | 58 shots, each one a step toward or away from the truth about Eli. |
| Is the middle engaging? | The gym-night stretch (49–71 s) is the emotional centre — and the part that was invisible. It is now lit (`NightGym` in nine shots: 10.dark 18 → 50 luma, 10.last 17 → 33, 10.choice 25 → 47). |
| Does it become increasingly interesting? | Every echo narrows the wrong answer, and the mistake gets more expensive. |
| Are characters consistent? | One cast, one school, one script, one echo look from first shot to last. |
| Are captions accurate? | Generated from the recorded words; 99.8 % coverage measured on the file. |
| Is the narration intelligible? | 16.2 dB median over the mix; worst 6.0 dB. Not yet heard by a human. |
| Does the ending deliver on the opening? | The wall's "I can't stay" is answered at 93.7 s: they act the goodbye together, and the final echo sounds like laughter. |
| Is there filler? | No. 98.6 s, cut at ~254 words a minute with no padding. |
| Does it work alone? | Yes — no previous part is needed. |
| Is the CTA in the right place? | Yes: the story resolves at 96.4 s ("the final echo sounded like laughter"), the subscribe line runs 96.4–98.6 s. |

**11. Remaining weaknesses.**
- `10.last` (31.4 luma) is still the darkest shot in the film — rings blooming from a brick in a gym with the
  lights out — and the whole gym-night stretch (49–79 s) sits at 31–70 against a film opening at 107. The
  reference's own night shot measures 31, so this is in range, and no shot is now below the 22 luma floor. But it
  is the dimmest eleven seconds we have delivered.
- The opening was re-framed and re-measured shot by shot, not watched. Motion is 4.94 against 1.94 before and the
  reference's 3.41; detail 48.7 against 38.9 before and the reference's 65.3. It is better by the numbers; whether
  it now *reads* as the hook needs the owner's eyes.
- 105 effects a minute is dense. The sheet was trimmed once already (13 cues), but at 63.9 a minute it is the
  busiest mix in the repository and the most likely to feel cluttered to a human ear.
- The ending darkens: luma 107 at the start, 61 at the end, because the last three beats are played at night under
  the stage lights. Unlike the Netherite film, the payoff here is the darkest part of the film.
- Nobody has listened to it.

---

## Every film in `renders/`, measured the same way

| film | length | cuts | median shot | longest shot | luma start / mid / end | opening detail | black frames | captions |
|---|---|---|---|---|---|---|---|---|
| in-this-town-monster-village | 221s | 89 (0.40/s) | 2.33s | 6.4s | 101 / 63 / 75 | 66.4 | 0.0% | 100.0% |
| in-this-town-monster-village-part-2 | 128s | 43 (0.34/s) | 2.62s | 9.3s | 78 / 88 / 90 | 64.6 | 0.0% | 99.9% |
| in-this-town-same-face | 105s | 53 (0.51/s) | 1.73s | 7.1s | 106 / 122 / 97 | 52.2 | 0.0% | 100.0% |
| in-this-town-nobody-looked-at-the-moon | 112s | 57 (0.51/s) | 1.92s | 4.6s | 84 / 93 / 74 | 63.4 | 0.4% | 100.0% |
| in-this-town-monster-egg | 177s | 89 (0.50/s) | 1.88s | 4.5s | 119 / 100 / 84 | 52.4 | 1.4% | 100.0% |
| in-this-town-superpower-at-18 | 168s | 87 (0.52/s) | 1.81s | 3.3s | 117 / 80 / 67 | 58.1 | 0.0% | 100.0% |
| in-this-town-superpower-at-18-part-2 | 169s | 69 (0.41/s) | 2.28s | 7.9s | 105 / 80 / 95 | 52.6 | 0.5% | 100.0% |
| in-this-town-pumpkin-heads | 116s | 49 (0.42/s) | 1.97s | 11.6s | 104 / 71 / 76 | 59.9 | 3.6% | 100.0% |
| what-if-you-could-see-who-had-a-crush-on-you | 114s | 54 (0.48/s) | 1.97s | 5.6s | 124 / 143 / 124 | 71.6 | 0.0% | 100.0% |
| what-if-every-lie-added-a-netherite-block | 91s | 48 (0.53/s) | 1.8s | 4.6s | 95 / 84 / 91 | 74.8 | 1.5% | 99.8% |
| what-if-i-could-hear-what-blocks-remember | 99s | 56 (0.57/s) | 1.7s | 4.9s | 107 / 93 / 61 | 48.7 | 0.0% | 99.7% |
| why-does-bread-cost-more-every-year | 49s | 0 (0.00/s) | 49.2s | 49.2s | 127 / 117 / 116 | 54.6 | 0.0% | 100.0% |
| what-is-a-dictator | 54s | 0 (0.00/s) | 53.73s | 53.7s | 122 / 122 / 126 | 45.0 | 0.0% | 100.0% |

`why-does-bread-cost-more-every-year.mp4` is the Stories reference: by the contract in `AGENTS.md` its camera
flies and does not cut, so "one shot holds for 49 s" is the design, not a fault.

## What this review could not check

- **Nothing here was seen.** Every visual judgement is a number from `scripts/film-metrics.py`: luma, detail,
  motion, caption signature, cut rate. A frame can be well-lit and badly composed; the tool cannot tell.
- **Nothing here was heard.** Loudness, the voice-over-mix margin and the audibility of every effect are measured
  in `sound.lock.json` and `out/sound/<film>/effects.txt`. Whether the mix *sounds* good is the owner's call.
- Watch-time, retention and swipe-away are not in any file here. The reference's 15,000 views and 81 % stayed-to-
  watch are the owner's numbers, and nothing in this repository predicts them.

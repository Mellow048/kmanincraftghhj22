# The tree video, studied

*2026-11-11. The owner: "go to explainer topic in the main branch, Rename it 'Stories' … study everything in it …
watch the video in frames, study the pictures, study the transcribed script txt." This is that study. The topic was
renamed `Topics/Explainer` → `Topics/Stories` in the same pass.*

**How this was studied, and what that limits.** The agent writing this cannot see images this session — every
`read_file` on a frame came back "no vision capabilities". So the video was not watched with eyes. It was taken
apart instead:

| What | How |
|---|---|
| the picture | decoded frame by frame with `scripts/film-metrics.py` — cuts, shot lengths, light, motion, stillness, captions, colour temperature |
| the frames | 67 frames extracted, one a second (`contact-sheet-one-frame-per-second.jpg` here), each one measured |
| the sound | the mixed track's envelope second by second, to test the ReadME's claim about the music dropping at 00:45 |
| the words | `Transcribed video (study this script)`, 230 words with timings, turned into a `timing.json` so the picture could be measured per act |
| the shot list | the owner's own `ReadME` — a video-to-text breakdown with sets, characters and a chronological timeline |

So: everything below about *structure, pace, light and sound* is measured and can be trusted. Everything about
*what is in the frame* comes from the ReadME, not from my eyes, and is marked as such. The four screenshots are in
this folder for the owner, who can see them.

## 1. What it is

| | |
|---|---|
| Title | *His Dad Kept Punching The Same Tree For An HOUR..* |
| Length | 67.0 s |
| File as downloaded | 720×1280, 60 fps, h264 + AAC 44.1 kHz stereo, 25 MB, ~3 Mb/s **(the ReadME says 1080×1920; the file is 720×1280)** |
| Words | 230 → **206 words a minute** |
| Cuts | 37, one every 1.8 s (median shot 1.79 s), **longest shot 3.5 s**, longest unmoving moment 0.5 s |
| Light | 66.9 at the start → 98.0 in the middle → 97.1 at the end. **Nothing flat (0 %), nothing black (0 %)** |
| Captions | lettering on screen for **97.8 %** of the film |
| Colour | warm: mean R 118, G 95, B 37 — **R sits 80 above B** |
| Story | A dad who has never played a game promises his son a house, punches one tree for an hour without breaking it because nobody told him to hold the button, refuses help out of guilt, and is saved by the son teaching him. They build it together. |

## 2. The nine acts, measured

Times are the ReadME's; the numbers are mine.

| Act | Time | What the ReadME says is on screen | Luma | Motion | Caption density |
|---|---|---|---|---|---|
| 1 hook | 0:00–0:09 | 1 s cuts — profile, high angle with crafting table, macro bark — as Dad clicks the oak and the cracks reset | 77.6 | 3.59 | 276 (densest: seven caption pops in nine seconds) |
| 2 reaction | 0:10–0:14 | Tom laughing on the bench; Dad hunched at the PC | 98.1 | 5.06 | 83 |
| 3 catch-22 | 0:15–0:21 | Dad under a pixel `?`, shrugging by the chest, axe over the crafting grid | 95.3 | 5.46 | 106 |
| 4 refusal & flashback | 0:22–0:32 | He refuses Tom's help; bench flashback, Dad yawns and slumps in guilt | 95.3 | 3.51 | 91 |
| 5 promise | 0:33–0:37 | Starry window; "this weekend I'll build you a house"; Tom cheers | 104.5 | 3.70 | 73 |
| 6 grind | 0:38–0:46 | Day sky; he sits at the PC, walks to the tree, rapid-cut single clicks, no logs | 95.4 | 6.05 | 71 |
| 7 low point | 0:47–0:50 | Music cuts out. Tom frowns; "Sorry, Tom."; Dad covers his face | 105.3 | 3.95 | **42 (sparsest — the film goes quiet with him)** |
| 8 rescue | 0:51–0:55 | Tom runs over: "Dad! Don't click it. Just hold it down." | 99.2 | 4.69 | 47 |
| 9 payoff & CTA | 0:56–1:07 | Cracks, the log pops, the cottage, both turn to look, Subscribe pill clicks to ✓ | 95.0 | 5.07 | 62 |

Two things the numbers show that a description cannot: the **hook is the darkest act** (77.6 against a 95–105
body — the film opens in the shade of the forest and comes up into light), and the **caption density falls by two
thirds at the low point** (276 → 42): the words thin out exactly where the music does, so the defeat is carried by
the picture.

## 3. The sound

The ReadME describes muted synth pulse → warm strings (0:22) → **silence at 0:45** → soaring strings (0:51). The
mixed track's loudness by second dips to 0.61 at 45 s against 0.74 either side, then rises to 0.79 and 0.82 at
51–52 s. The voice dominates the measurement so the dip is only about 15 %, but it is there, and it lands on the
beat the ReadME names. **I have not listened to it** — this is an envelope, not an ear.

## 4. How it compares with what we already have

| | **Tree video** (67 s) | Monster Village Part 1 (221 s, 15 k views) | Our Netherite film (91 s) | Our Blocks film (99 s) |
|---|---|---|---|---|
| words a minute | **206** | 253 | 237 | 254 |
| cuts a second | 0.55 | 0.40 | 0.53 | 0.57 |
| median shot | 1.79 s | 2.33 s | 1.80 s | 1.70 s |
| longest shot | **3.5 s** | 6.4 s | 4.6 s | 4.9 s |
| longest still moment | 0.5 s | 0.5 s | 0.8 s | 0.6 s |
| luma start / middle / end | 67 / 98 / 97 | 101 / 63 / 75 | 95 / 84 / 91 | 94 / 89 / 57 |
| warmth (R − B) | **+80** | +10 | +54 | +21 |
| captions | 97.8 % | 100 % | 99.8 % | 99.8 % |
| flat / black frames | 0 % / 0 % | 0 % / 0 % | 0.1 % / 1.5 % | 0 % / 1.5 % |

Read across the rows: our cut rate and our caption coverage already match it. **Three things do not.**

1. **Warmth.** This film is +80 R over B; Monster Village is +10 and ours are +54 and +21. It is not a story told
   in flat Minecraft daylight — it is told in warm shader light, and the warmth *rises with the feeling*: +53 in
   the hook, +96 at the low point, +104 at the rescue.
2. **No shot is allowed to last.** Longest shot 3.5 s in 67 seconds. Ours hold 4.6 and 4.9 s.
3. **It is slower-spoken than we are.** 206 words a minute against our 237–254 and Monster Village's 253. The
   story breathes; the pictures carry more of it.

And one thing it has that we have never built: **in-world dialogue as dark translucent nametag boxes above the
speaker** (the ReadME, acts 5, 7 and 8), separate from the caption track. Our `Bubble` is a phrase bubble; this is
a subtler thing, a name plate over a block rig.

## 5. The storytelling blueprint

Straight from the ReadME, and it is the same seven beats the master prompt asks for:

- **Hook (0:00–0:14).** An impossible premise (*one tree, one hour*) tied at once to a human stake (*a promise to
  his son*), and the mechanism explained immediately (clicking resets the cracks) so the viewer trusts the film.
- **Middle (0:15–0:50).** The plot holes are sealed before anyone can ask them: no wood, so no axe; he refuses
  help. At 0:22 it turns from comedy to heart — warm strings, a starry-night flashback, the guilt. At 0:45 the
  music cuts entirely so the defeat lands.
- **Payoff (0:51–1:07).** The son reverses the roles and teaches the father; the log pops; the goal is *upgraded*
  (a house built together, not alone); the Subscribe pill clicks in over the peak.

The transferable rules, in one line each:

1. State the impossible thing and the human stake in the first two seconds, then show *how* it works.
2. Seal the obvious objection before the viewer can ask it (no wood → no axe).
3. One turn from comedy to feeling, marked by music, at roughly a third of the way in.
4. Take the music out entirely for the defeat.
5. Let the person who was laughed at become the one who saves it.
6. Upgrade the goal at the end — not "he got what he wanted" but "they got more, together".
7. Put the CTA on the peak, never over the story.

## 6. What this means for the Stories topic — three decisions I have NOT made

The topic is renamed and this material is in place. What it *becomes* is the owner's call:

1. **The camera.** `topic.json` still says this topic's camera is `flightScene` — it flies and never cuts, which is
   right for *Why does bread cost more* and wrong for a story that cuts every 1.8 s. Should Stories move to the
   story camera (`storyScene`), with the two existing films keeping the flight, or should there be two cameras in
   one topic?
2. **The numbers.** If Stories is to make films like this one, the floors should come from it: roughly 60–120 s,
   ~200–230 words a minute, no shot longer than about 4 s, and a warm look. Today the topic still carries the
   Explainer's numbers (30–60 s, 224 wpm, no cuts).
3. **The two existing films.** `why-does-bread-cost-more-every-year` and `what-is-a-dictator` now declare
   `topic: "stories"`, because the id they had no longer exists. They are question-and-answer films. Keep them
   here, or split the old Explainer back out?

Nothing else was changed: the pack, the starter, the sounds and the two finished films all still work — typecheck
and `npm run check` pass.

## 7. What is in this folder

| File | What it is |
|---|---|
| `His Dad Kept Punching The Same Tree For An HOUR...mp4` | the reference, as supplied (720×1280, 60 fps, 67 s) |
| `ReadME` | the owner's video-to-text breakdown: specs, characters, sets, nine-act timeline, why it works |
| `Transcribed video (study this script)` | the narration, word-timed, 230 words |
| `Screenshot_2026-11-17_13-2*.png` | the four frames the owner picked out |
| `contact-sheet-one-frame-per-second.jpg` | all 67 seconds, one frame a second, in order — the film as one picture |
| `timing.json` | the nine acts and the 230 words, in our own shape, so `scripts/film-metrics.py --cues` can measure this film per act the way it measures ours |
| `STUDY.md` | this page |

To measure it again:

```bash
pip install numpy imageio-ffmpeg
python3 scripts/film-metrics.py "Topics/Stories/reference for new topic/His Dad Kept Punching The Same Tree For An HOUR...mp4" --cues --timing "Topics/Stories/reference for new topic/timing.json"
```

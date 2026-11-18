# Still Rushing the Third One

**Premise:** A kid trains for forty-seven days to catch three pieces of popcorn and win the only cinema seat that doesn’t fold up. His friend gets more use out of his notebook than out of his technique.

**Production files:** [full narration](narration.md) · [46-shot storyboard with timestamps](STORYBOARD.md) · [228 measured word beats](timing.json) · [phrase-level SRT](captions.srt) · [score and foley](sound.json) · [mix measurements](sound.lock.json) · [master rebuild](master/README.md).

## Opening choices

| Opening | First picture and line | Question it leaves |
|---|---|---|
| **Selected: the actual rep** | Popcorn in a raised hand under a three-lamp **POPCORN DRILL** board. “HUS HUS HUS!” Two green lamps. The last goes red as the kernel hits his forehead. | Why does he take a miss this seriously? You already know what success and failure look like. |
| The prize | A gold seat roped off in an otherwise ordinary cinema. “Our cinema had one gold seat.” | What would it take to get it? Clear stakes, but no skill or person in the opening picture. |
| The evidence | Bea spots a spiral-bound notebook: “Day forty seven. Still rushing the third one.” | What on earth is he practising? A good insert, but it explains the dedication before we see how small the task is. |

## Cast, objects and changes of scene

| Time | Action to read without the voice | Sound decision |
|---|---|---|
| 0:00–0:12 · front row | Kid in teal and a gold sweatband. Bea in pink with glasses. Third kernel → forehead → striped bucket; she moves her drink, then sees the actual notebook entry. | Three recorded exhalations, each with a release and a contact. The third contact is a bonk, not a successful catch. |
| 0:12–0:22 · Rialto | The velvet rope and **3 CATCHES / 1 YEAR** sign turn a gold seat into a prize. An ordinary seat folds the kid up. | A little fanfare for the chair; the creak undercuts it. |
| 0:22–0:32 · street → kitchen | His friends go out under the marquee. A phone on a stand records his kitchen practice. Sink, butter and clock are all in throwing range. | The street's party music cuts to the drill. |
| 0:32–0:44 · evidence | Sink insert, butter insert, kernel stuck to the clock. Bea's pencil puts space before the third dot. No one laughs at his “almost.” | Water and clock transients, then ticking and paper instead of another victory sting. |
| 0:44–0:54 · correction | A side angle shows his hand going back into the bucket **while the piece is still in the air**. On the next set the hand stays up. | The first two breaths in the corrected set are 0.46 s apart. The third waits 0.91 s. |
| 0:54–1:05 · sold-out final | Usher raises the rope; bucket goes on the floor. Two green lamps, an open hand, then a third green lamp. | **No HUS during the contest.** The score steps out for the final piece; its catch lands on “down.” |
| 1:05–1:25 · two seats, three rows | Bea's cushion snaps up. She steps aside while he folds the Day 47 book and wedges it beneath the cushion. Two usable seats. Then three rows of guests start the same drill; the novice in front repeats the forehead miss. | Seat hinge, paper, quiet under “Training,” then the audience's three recorded breaths. Cool screen light replaces the house look. No CTA over the loop. |

The block cast, elbow/wrist poses, popcorn lobes, tubs, notebook hinge, velvet chairs, lit signs and rooms are authored geometry. The reference is a **delivery and timing reference**; there is no copied basketball footage, voice or music. The crowd is one cast of five guests per row, staged at three heights, with different hair, hats and coats. One narrator owns the story. Bea has no fake dubbed dialogue.

## What changed after looking at the picture

- The opening needed to read on mute. Added the practice board and result lamps, made the kernels cream-coloured clusters rather than butter cubes, and gave each mouth catch a real contact frame. Shortened the ricochet so it actually reaches the tub **before the cut**.
- Reframed the clock to get a foreground head out of the way. Moved the butter dish clear of the thrower's silhouette, and cut from the sink to the butter rather than trying to show both landings behind his shoulder.
- Wrote the literal entry **DAY 47 / STILL RUSHING THE THIRD ONE** on the book. In the later insert the upper leaf rotates at the spine; cream page edges remain visible between teal covers. Bea steps out of the way so the low shot shows both book and cushion.
- Lowered the final audience lens so the foreground guest's face and the flying pieces clear the caption. There is a moving kernel in frame on **all twelve** recorded HUS releases; it is not a chant laid over a reaction shot.

### Reference transfer, not a plot transplant

[Monster Village Part 1](../../../Topics/InThisTown/reference/monster-village/NEW-SHORT.md) first makes an assembly of faces seem like a threat, then shows their backs and changes the meaning of the group. Here the front view suggests *bad aim*; only the side view at **0:46** shows the premature reach. In the final drill he keeps the hand up through the extra beat. The proof to look for is the space between palm, bucket and airborne kernel, not the number of cuts.

## Picture and sound checks

The generic stage sampler reports two `LOOK` advisories: it sees `<Action cue=… t=…>`, not the child's moving matrices. The full bake **did** execute the acting for all 2,552 frames. The film-specific check measures moving kernel centres independently of camera motion. The phone-sized still review checks contacts and occlusion that this geometric check cannot see.

| Practice | Measured release times (seconds from frame zero) | Mid-flight check |
|---|---|---|
| Opening | 0.00, 0.40, 0.80 | One moving piece each; mouth, mouth, brow, bucket. |
| Kitchen | 30.00, 30.46, 30.92 | One moving piece each; three different physical targets. |
| Corrected | 52.15, 52.61, 53.52 | One moving piece each; longer gap before number three. |
| Audience | 83.27, 83.68, 84.09 | Six displaced kernel centres inside the lens on each sampled apex, across the three rows. |

The mix has 14 scored sections, two explicit music rests, four beds and 108 effects. Measured at **−14.8 LUFS / −2.9 dBTP**; narration is 16.1 dB above the rest at the median, 5.3 dB at the tightest measured moment. Audio was checked against the recording and levels, **not auditioned here on speakers**.

### Delivery measurements

**[Finished MP4](../../../renders/still-rushing-the-third-one.mp4)** · **[46 frames from the encoded master](../../../renders/still-rushing-the-third-one-shots.jpg)**

- Decoded **2,552 / 2,552 frames**, 1080×1920 at 30 fps, H.264/4:2:0, BT.709, AAC stereo at 48 kHz. Both streams last **85.066667 s**. File size: 48,447,972 bytes. SHA-256: `6d11c4edb0aa318e2e8096bf44397c7f5097c3c4e624f74f9eecfe65b09234d0`.
- Inspected samples from every shot of the *encoded MP4*, including the catch/ricochet, early reach, delayed third rep, folded notebook and audience. Of 114 selected frames, 95 had an active caption. At phone size the predicted interior white strokes and black outlines matched the encoded image at every sampled interior mask pixel (not a whole-image equality claim).
- The twelve raw recorded exhalations correlate with the narration at ≥.993 in the measured windows; the source WAVs have about 20 ms of onset trim. The **muxed mix** matched the finished mix at 0.24 / 30.15 / 52.30 / 64.05 / 83.44 s: correlations .99980–.99994, **0 ms offset** at an 8 kHz measurement rate. This checks drift at five locations, not subjective delivery.
- The repository picture meter detected 45 cuts, no near-black or flat frames, longest still 0.5 s. Mean luma at start / middle / end: 94 / 141 / 93. `npm run typecheck`, `npm run check` (42 films), the nine direction tests and final rehearsal passed. No timed picture, recording, caption, or topic limit was replaced to pass a check.

### Limits

- In the wide kitchen triple the light popcorn is small against the cream tiles. The closer sink, butter and clock shots are intentionally part of the joke, not a substitute for doing the throws.
- At 85 seconds the story is shorter than Recreation's provisional 90–120 s target (inside its hard limits). It ends on the echo instead of padding out another party. This is a different story from the barber template; nobody asks for a haircut or wins a basketball game.
- This is a production review, not an audience result. No retention, view count or phone-speaker listening result is claimed.

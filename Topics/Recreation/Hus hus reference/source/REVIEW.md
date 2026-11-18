# Picture lock · That’s Me. The Elbow.

**[Download the movie from GitHub](https://github.com/Mellow048/kmanincraftghhj22/releases/download/render-238/thats-me-the-elbow.mp4)** · [49-shot sheet, decoded from the MP4](../shots.jpg) · [Storyboard and sound cues](STORYBOARD.md)

[Render 238](https://github.com/Mellow048/kmanincraftghhj22/actions/runs/44296230888) used the registered Recreation composition at `88c50ef`. The checked file is [the bot’s committed copy](https://github.com/Mellow048/kmanincraftghhj22/blob/6f8495bd22224b8e94ffa04190b904cc26b0481c/renders/thats-me-the-elbow.mp4). No substitute cast, hand-drawn movie frames or second video renderer.

## What read on the finished picture

Inspected a frame from every setup and the moments inside the gags, including a phone-size pass with the subtitle band covered. Frame numbers below are zero-based.

| Job borrowed from [Monster Village Part 1](../../../InThisTown/reference/monster-village/NEW-SHORT.md) | Different choice here | Encoded evidence |
|---|---|---|
| Let the first phrase change what the viewer sees (Part 1, 0:00–0:02.73). | Instead of a kid gradually surrounded by family, a family photograph is missing the kid who’s narrating. | **F0 → F18 → F28 → F70:** arms in motion, the group squeezing in, then paper in plum sleeves. Look inside its left border: a single wedge of cobalt. No face in blue. |
| A second view changes what an object means (Part 1’s barred door / reverse, 0:53–1:04). | The “best picture of me” really is an excellent picture of *one* person. The second look is about the friends he erased. | **F972 / F1118:** the smile fills the first close-up; the wider print has two ears on each side and no other friend’s eyes. The ears can start to peek in before he says what they are. He stops training for speed alone. |
| Let a family member settle the question with a gesture (Mum returning the hat, 2:23–2:33). | Gran doesn't tell him what he learned. She changes the photograph she keeps. | **F1987 → F2028 → F2093:** the big old print comes down, the mint patch is briefly empty, and the magnet now holds five distinct faces round the cake. |

- **Practice is action.** In the first triple, F91 is the press, F102 the vault over the sofa arm and F113 the landing on the X. Eight triples, 24 breaths. At the birthday the final adjustments are duck / sidestep / straighten. The coat, glasses and hat have already taught the viewer how to read that movement.
- **Both payoffs land.** The family is on the fridge *before* the couple speaks. F2199 shows two people holding hands. F2267, F2279 and F2287 show the trained response to their request. In **F2324**, the hands are still joined and he is grinning between them. The last 32 frames are the print, not a CTA or an explanation.
- **Changes made at rehearsal:** turned the insert lens to the button side after the kid’s head hid the press; turned off the living-room party-window glare that washed out the landing; separated both ear pairs; tested the photos as paper on the refrigerator, not just as standalone images. The cast never changed to solve a framing issue.

## Delivery checks

| Check | Result |
|---|---|
| File | **44,029,148 bytes**, H.264 yuv420p, **1080×1920**, nominal **30 fps**; stereo AAC, **48 kHz**. SHA-256 `2863331993151ddc90792039cda42349615e6d93448d5956770c372fcb7a465a`. |
| Timeline | **2,325/2,325 frames decoded** in order; 77.50 s story clock. Video duration 77.501875 s and audio 77.502 s in the joined MP4. Maximum frame timestamp deviation from `frame / 30` was 2.23 ms, including the eight chunk boundaries. |
| Picture | 7 scenes / 49 setups / 39 narration cues. 337 output frames extracted for the sheet, action probes and caption checks. The repository image metrics found 0% near-black/flat frames, longest near-still 0.3 s; first/middle/end mean luma 144 / 135 / 113. |
| Word clock | 17 aligned clips / **242 words**; none estimated. The [SRT](captions.srt) carries the same words grouped by phrase. At a sample inside **each word**, the expected white glyph and black outline cell centres matched the decoded caption. The direct question is a recorded pickup, not a rewritten subtitle. |
| Chant and mux | All 24 breath excerpts matched their place in the narration (minimum normalized correlation .9878, within one video frame of the cue). At 25 windows, including both sides of each join, the decoded soundtrack matched the mix at **0 ms offset** on a 12 kHz mono clock (correlation .99948–.99999). |
| Mix | [Locked mix](sound.lock.json): −14.8 LUFS, −2.2 dB true peak, music 18.3 dB below speech. 94 effects; zero measured as buried. The voice was 17.1 dB above the rest at the median, 5.1 dB at the worst half-second. |
| Build | Typecheck, 43-film contract check, all 9 direction tests, final rehearsal and the GitHub render passed. This branch's early 90–120 s Recreation target gives a **non-failing** length note; the film is not padded to meet it. |

**Limitations:** the crown of a head and two brow pixels are deliberately tiny in the second failed test. The sleeve also briefly overlaps the practice glasses while they go on; the wider chair shot shows the glasses and hat together. Audio timing and levels were checked instrumentally, not by a human listening pass. No audience-retention result is known.

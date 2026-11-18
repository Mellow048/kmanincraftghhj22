# Final review — Popcorn Training Arc

**Delivery:** [`renders/popcorn-training-arc.mp4`](../../../renders/popcorn-training-arc.mp4) — 19.6 s, 588 frames, 1080 × 1920 at 30 fps. H.264, 4:2:0 BT.709, stereo AAC at 48 kHz, 22.24 MiB. The final MP4 is included on this branch because the GitHub release upload endpoint was unreachable. [Edit notes](EDIT.md) record the hook alternatives, complete script, storyboard, asset and sound plans, Monster Village reference transfer, and upload tests.

## Read it with the sound off

| Check from the encoded file | Result |
| --- | --- |
| **0.00–1.13 s · hook** | Mouse, stopwatch and skeleton are legible together on frame zero. By frames 8, 21 and 34 the mouse has changed sides and its light row reads one, two, three. We leave the shot only after the visual rule has been established. |
| **3.73–5.40 s · repetition with a change** | The same right arm sweeps a sponge instead of a mouse; the plate loses its marks. The coach and uninterrupted counter keep the next station in the same place. The motion is small, so the higher angle matters. |
| **7.27–11.37 s · cause and consequence** | The first two kernels reach the mouth and set two green lights. At frame 278 (9.27 s) the next kernel visibly meets the forehead, the third light goes red, and frames 285 and 311 show the recoil and forehead rub. The chicken has already entered the edge of the frame. |
| **11.37–14.73 s · escalation** | Cut on the same boy, now in a red headband under **DAY 1: POPCORN TRAINING**. His upper body drives upward with the kernel on each breath. The last `ALMOST` word has a brief readable hold across the cut, below the new sign. |
| **15.00–19.60 s · payoff** | The mouth catches and third green light make the win explicit before both arms go up. The chicken has its beak on the rim at the grab, then is visibly carrying the whole tilted carton as kernels spill. At frame 587 the boy is looking back; the empty spot and carton are both in shot. No CTA or explanation covers the button. |

The first proof hid part of the mouse behind a score panel, cut off the practice hand, and cropped the chicken on the payoff. The final puts the panel alongside the mouse, leaves room for the held kernel, and follows the carton farther right. There is one hard cut at 11.37 s, not one cut per breath.

## Media and sync

- `npm run typecheck` and `npm run check` passed. The film's four scene ranges butt-join on the 588-frame clock; the deliberate reset is inside scene 3.
- Decoded all 588 frames of the delivery MP4. No black frames and no identical adjacent frames in the 108 × 192 luma check. Frame 341 is the largest decoded frame change, as intended.
- All **15 HUSS** starts are keyed to actual reps. In the pre-encode foley lane their 5 ms RMS-threshold onsets are 10–30 ms after the rep marks (less than one frame at 30 fps). No HUSS plays over walking, the reaction, or the theft.
- Forced alignment on the prepared dialogue lane puts all eight caption onsets within 18 ms of their authored timings. The score lane is silent after the bonk until the reset, and after the grab to the end. The MP4 audio agrees with the shipped mix at 0 ms measured lag in six sampled windows; integrated loudness is −16.7 LUFS, true peak −1.6 dBTP.

**Remaining uncertainty:** These are checks of decoded frames, timing and audio signals, not a blind audience test or a prediction of reach. The chicken's setup is intentionally peripheral. If fresh viewers don't spot why the bird was waiting there, test slightly earlier framing on its look at the carton before adding any dialogue. Evaluate the view/swipe split and the retention curve separately.

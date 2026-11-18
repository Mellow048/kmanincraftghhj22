# One Cake, No Brakes — export review

**[Download the 1080 × 1920 MP4](https://github.com/Mellow048/kmanincraftghhj22/releases/download/render-241/one-cake-no-brakes.mp4)** · [Pinned copy](https://raw.githubusercontent.com/Mellow048/kmanincraftghhj22/5a8786032db482b465e4eacdb57c9275595187d5/renders/one-cake-no-brakes.mp4)

Finn takes a runaway minecart to Slime’s birthday and delivers the cake without getting to stop for a slice. [GitHub render 241](https://github.com/Mellow048/kmanincraftghhj22/actions/runs/44313808260) rendered build `7ccd440` at scale 1 in three chunks. The [edit board](EDIT.md) has the hook alternatives, storyboard, cast and Foley plan; see the [spoken cut](narration.md) and [caption timing](captions.json) for the dialogue and exertion cues.

## Picture review (decoded from the delivered MP4)

| Time | What reads without dialogue |
| --- | --- |
| **0.00–3.87 s** | f0 opens mid-descent with the tilted tray out over the cart and no titles. f5/f12/f39 show “ONE / CAKE / EASY.” As the cart rounds the bend, the tray slips and Finn leans into the first grip (f78 → f86 → f116). |
| **5.83–7.30 s** | f175/f190/f198/f219 show the level ride, rising cart and tilted cake, then the tray level again. The wheels and trestle remain in view through the bump. |
| **8.43–16.33 s** | The camera arcs behind the cart to reveal the BIRTHDAY arch, a bow-wearing Slime and an empty stand. Then the camera comes beside the cart again near the table. The same rail motion carries through the reveal; there's no reset between saves. |
| **16.97–17.50 s** | The reaching HUS starts at f509. f515 shows the tray beside and above the stand; f520 shows it seated on the stand, and f522/f524 show Finn separating from it as he passes. No cut hides contact. The next view keeps the cake on the table behind him. |
| **17.67–19.20 s** | f541/f545 show Skeleton bringing the emerald over the cart wall. f548/f551 show it clear of the hand, f558/f562 inside the cart. Finn rolls away empty-handed except for the tip. By f575 the rail is clear and the cake is still on the table. The clink and a short wheel tail lead straight into the end; no outro or CTA. |

Finn keeps the same face and gaze during his opening line; only the mouth aperture is speech-driven. The friends never speak. The chase is readable with the sound off: the slipping object, the destination, the placement and the tip all have observable changes. Slime is small in the approach and brushes across the foreground at the start of the reach; the tray and stand are clear before they meet. This is a frame-sample and signal review, not an audience test or a human playback sign-off.

## Export and sound

- **19.20 s / 576 frames**, **1080 × 1920 at 30 fps**, H.264 high profile, limited-range `yuv420p`, stereo AAC 48 kHz. Faststart (`moov` before `mdat`). All frames decode; no black or repeated adjacent frames in the luma check. Maximum picture timestamp error **0.958 ms**.
- Finn’s existing `voice-00` says only “One cake. Easy.” Forced alignment of the export places starts at **0.11 / 0.30 / 1.01 s** (within 9 ms of the source-derived caption starts before frame quantization). Three HUS cues start at **f86 / f198 / f509**; the breath envelopes rise within one frame of those marks. The bed dips for the voice and breath hits and clears before the tray contact (f520); cart Foley and the emerald clink at **f558 / 18.60 s** close the edit.
- Five windows in the AAC (line, catch, bump, reach, tip) have **0 ms measured lag** against the authored mix at the 8 kHz check rate, with **0.99959–0.99984** waveform correlation. The MP4 measures **−18.3 LUFS / −3.9 dBTP**.
- `npm run typecheck`, `npm run check`, and `check_export.py` passed. Release and branch copy are byte-identical: **31,599,301 bytes**, SHA-256 `e9fb786923164043332e972807cf961ffddfb56b231a6f161781f757fcb9efd9`, GitHub blob `831d8ff0a45c44eb21e1705f5c9fd4e878ff22f9`.

To reproduce the media check, run `python3 src/videos/one-cake-no-brakes/check_export.py --sheets /tmp/cake-export-review` with NumPy, Pillow, FFmpeg and FFprobe available. Explicit binary paths can be supplied with `--ffmpeg` and `--ffprobe`.

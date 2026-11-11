# Reference #1 audio — exact tracks used by the MP4

The seven voice clips share the same user-selected narrator. They are authored as a first-person child telling a friend what happens, not as dialogue between actors. The music/foley bed is entirely procedural and original; run `make-bed.py` to rebuild it with Python's standard library, then use the repository's bundled Remotion ffmpeg to encode the WAV. No stock music or external asset URLs are needed.

| Film time | File | Spoken line / purpose |
|---:|---|---|
| 0.04 s | `01-rule.mp3` | “At ten, we each get an egg.” |
| 2.51 s | `02-broken.mp3` | “Mine is broken.” |
| 4.02 s | `03-comparison-short.mp3` | “My friend's dragon. My sister's phoenix. My worm.” |
| 8.43 s | `05-rejection.mp3` | “My friend won't sit with me.” |
| 11.45 s | `06-fire.mp3` | “Then it eats his fire.” |
| 13.68 s | `07-rescue.mp3` | “It saves him from the next blast.” |
| 17.20 s | `08-stands.mp3` | “Now he stands by me.” |
| 0–20 s | `bed.mp3` | Low evolving chord, shell tick, footsteps, two fire whooshes, three growth chimes. |

`film.tsx` schedules these files relative to `public/` using `audio` and `audioCues`. The files in this folder are identical copies of `public/audio/in-this-town-monster-egg/`. For a fresh checkout, copy this folder's MP3s into that public path before rendering. These short recorded voice clips are the input audio; `make-bed.py` reproduces only the instrumental and effects bed.

To rebuild just the sound bed from source:

```bash
python3 'Topics/InThisTown/reference#1/audio/make-bed.py' out/monster-egg-bed.wav
node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg -y \
  -i out/monster-egg-bed.wav -codec:a libmp3lame -b:a 128k \
  public/audio/in-this-town-monster-egg/bed.mp3
```

The intermediate WAV belongs in ignored `out/`, not Git. The voice remains intelligible when the bed is mixed below it; the egg, characters, fire, rank changes, and reunion must also make sense with the soundtrack muted.

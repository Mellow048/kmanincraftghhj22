# Five Seconds — production and delivery

## Source ready for full-HD render

Approved Draft 2 plus the separately approved kid-friendly trip counter. The authoritative narration and both readable/cue proposal copies match exactly; see `script-integrity.json`. No age, cooldown, superspeed, teleport, CTA or sequel promise was added.

**674 words · 18 scenes · 91 shots · 161.6 s · 4,848 frames · 1080×1920 at 30 fps.** Nine original `voice-00` clips, all aligned. The final line is **“The prince of our village.”** Picture ends on the boy's reaction; frames **4833–4847** are black (161.1 s onward).

## Audio

- `audio/in-this-town-five-seconds/mix.mp3` is wired into `film.tsx`.
- Music input: the exact `Topics/InThisTown/InThisTownMusic.aac`; SHA256 `5adf61371ab3f4fe5c1eff93bfa15ef940a7be3f9888da5807cececf2fafaca3`.
- Recorded track only, no procedural music fallback. Section labels control its levels; they do not generate substitute music.
- `sound.lock.json`: 23 sections, 13 beds, 228 effects / 84.7 per minute, zero buried effects. Music 19.9 dB below voice; median voice/rest margin 17.3 dB, worst 4.4 dB. Mix −14.7 LUFS / −2.3 dB true peak.
- The seven stops mute diegetic ambience for the same 150 frames. The score and the moving hero's actions are not the stopped world's clock.
- **Limitation:** audio was measured, aligned and hashed, not subjectively listened to. Do not describe these checks as a listening review.

## Timing and movement

`timeline.ts` defines these half-open frame intervals; every one has length 150:

| Stop | First frozen frame | First resumed frame |
|---|---:|---:|
| Classroom opening | 0 | 150 |
| Glass | 923 | 1073 |
| Touch/release | 1093 | 1243 |
| Chalk | 1261 | 1411 |
| Locker | 1847 | 1997 |
| Elder/arrow | 2679 | 2829 |
| Final counter | 4171 | 4321 |

The global performance time is quantized to rendered frames before a stage consumes it. `WorldClock` resets only its descendants' Remotion Sequence offset before applying the frozen global clock, avoiding late-scene clamping. The isolated runtime fixture has rendered all 4,848 frames with world/stage/shot-clock assertions. Do not replace that proof with narration durations or silent holds.

The action modules share routes across cuts, including sleeve contact and pulling the friend, collar contact and dragging over the sill, projectiles, rock pickup/carry/placement/sidestep, toe contact/stumble/spin/back landing, and the two-hand rabbit transfer. Per-frame root samples reject teleports; untouched stranger/rabbit poses, the arrow and locker door are checked during their stops. Sequential action/boundary stills were viewed, in addition to all 91 shot midpoints and targeted framing/contact revisions. This is source/state and sequential-frame review, not a real-time playback claim.

## Legacy protection

`legacy-regression.json`: 14/14 stills pixel-identical, at frames 0 and 1240 in Same Face, Monster Egg, Pumpkin Heads, Superpower at 18, Part 2, Nobody Looked at the Moon, and Freeze Bell. These are sampled regression frames, not an all-frame comparison.

Freeze Bell's source, audio and master are unchanged against `aa2fb0f`; master SHA256 remains `03b91639e3e63c7a22271c1ef8f667936ccf111a374dd6279d313cff311fa8f2`. No old mix was rebuilt. Legacy v1 soundtrack locks are preserved and explicitly not retroactively certified for track-byte identity.

## Rebuild and QA

```bash
# Only this timing builder preserves both production silent holds and the ending tail:
PYTHONPATH="$PWD/out/film-tools" python3 scripts/five-seconds-timing.py
python3 src/videos/in-this-town-five-seconds/write-scenes.py
python3 src/videos/in-this-town-five-seconds/write-sound.py
PYTHONPATH="$PWD/out/film-tools" python3 scripts/sound.py build in-this-town-five-seconds --stems
npm run typecheck && npm run check
node --test scripts/check-story-ending.test.mjs scripts/check-music-track.test.mjs
REMOTION_CHROME=/tmp/chromium node scripts/five-seconds-audit.mjs --clocks
```

In this sandbox Chromium also needs the previously provisioned `out/pelican-qa/runtime/lib` and `/tmp` in `LD_LIBRARY_PATH`. The tools under `out/` are transient; normal installations can use Remotion's Chrome and ordinary Python dependencies.

Full-HD delivery is pending. Record the actual source commit, Actions run, release/master digest, decoded frame count, encoded soundtrack comparison and final black frames here after the render, not beforehand.

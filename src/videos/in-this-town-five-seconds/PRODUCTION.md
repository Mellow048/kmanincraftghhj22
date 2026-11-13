# Five Seconds — production and delivery

## Current status — full V2 rendered and verified for owner review

The owner rejected V1's feel, then approved the **15.7-second motion/background proof**: “okay i like this kind of motion and detail in the backround! go ahead”. That authorizes the full revision; it is not acceptance of an unseen full V2. The approved story, all nine original voice-00 recordings, exact supplied AAC and 161.6-second full-film scope remain unchanged.

Full performance integration is now in the source: ordinary interactions, locker clearance, elder/door rescue, bedroom/window, chase, rock placement/sidestep, stumble/spin/back landing and supported rabbit transfer. See **`V2-REVIEW.md`** for current scope, tests and delivery status, and `MOTION-REVISION.md` for the approved proof history. `renders/in-this-town-five-seconds.mp4` remains V1; the full revision is **`renders/in-this-town-five-seconds-v2.mp4`**. Freeze Bell and the proof are retained unchanged.

The V2 master is **1080×1920 / 30 fps / 161.6 seconds**, 87,257,811 bytes, SHA256 `44919df07668ea21b63c0d90e21c1f7b1b21d640ebff33826659bf0682b1a64b`. Run `43391756533` succeeded from `17811ef`. All-frame encoded timing/decode, seven exact stops, soundtrack identity/alignment and 31 final encoded-image review sheets are complete. See `v2-delivery-qa.json`; verified-file release publication is pending. This is not a subjective listening or artistic-acceptance claim.

**Everything below is V1 delivery history**, not artistic acceptance or certification of the revised source. V2 reports use the `v2-` prefix so old measurements are not silently represented as current.

## V1 — full-HD master delivered and technically verified

Approved Draft 2 plus the separately approved kid-friendly trip counter. The authoritative narration and both readable/cue proposal copies match exactly; see `script-integrity.json`. No age, cooldown, superspeed, teleport, CTA or sequel promise was added.

**674 words · 18 scenes · 91 shots · 161.6 s · 4,848 frames · 1080×1920 at 30 fps.** Nine original `voice-00` clips, all aligned. The final line is **“The prince of our village.”** Picture ends on the boy's reaction; frames **4833–4847** are black (161.1 s onward).

## V1 audio

- `audio/in-this-town-five-seconds/mix.mp3` is wired into `film.tsx`.
- Music input: the exact `Topics/InThisTown/InThisTownMusic.aac`; SHA256 `5adf61371ab3f4fe5c1eff93bfa15ef940a7be3f9888da5807cececf2fafaca3`.
- Recorded track only, no procedural music fallback. Section labels control its levels; they do not generate substitute music.
- `sound.lock.json`: 23 sections, 13 beds, 228 effects / 84.7 per minute, zero buried effects. Music 19.9 dB below voice; median voice/rest margin 17.3 dB, worst 4.4 dB. Mix −14.7 LUFS / −2.3 dB true peak.
- The seven stops mute diegetic ambience for the same 150 frames. The score and the moving hero's actions are not the stopped world's clock.
- **Limitation:** audio was measured, aligned and hashed, not subjectively listened to. Do not describe these checks as a listening review.

## V1 timing and movement

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

## V1 legacy protection

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
PYTHONPATH="$PWD/out/film-tools" python3 -m unittest discover -s scripts -p 'test_sound_inputs.py' -v
REMOTION_CHROME=/tmp/chromium node scripts/five-seconds-audit.mjs --clocks
```

In this sandbox Chromium also needs the previously provisioned `out/pelican-qa/runtime/lib` and `/tmp` in `LD_LIBRARY_PATH`. The tools under `out/` are transient; normal installations can use Remotion's Chrome and ordinary Python dependencies.

## V1 verified encoded master

- File: `renders/in-this-town-five-seconds.mp4`, **75,535,985 bytes**.
- SHA256: `ada21dde26a3c2e198abb51c8684da1f868356023cdbed4db8f83cc4d259568d`.
- Render source: `4f2e9be6e216f02cf7c59098d266f9d15ca995de`.
- [Render run 43365245351](https://github.com/Mellow048/kmanincraftghhj22/actions/runs/43365245351): all 20 jobs succeeded (planning, 18 chunks, delivery). Initial branch delivery: `e76bac4`.
- H.264 / yuv420p / **1080×1920 / constant 30 fps**, 4,848 decoded frames. Video duration **161.600 s**; AAC 48 kHz stereo, audio/container duration 161.601 s (one millisecond of codec/container padding).
- Every decoded video PTS checked against its frame number; all seven 150-frame stop intervals are exactly five seconds on the encoded video clock. Frames 4833–4847 are the intentional black tail, with frame 4832 still showing the reaction. No other black frames or whole-picture freeze over 0.8 s; zero full-decode errors; fast-start MP4.
- Encoded soundtrack vs the authored mix: **0 ms lag**, 0.999866 correlation overall, minimum 0.999736 across five-second windows, minimum 0.999617 across all 17 chunk joins. Encoded **−14.77 LUFS / −2.36 dB true peak**.
- **91 encoded midpoints and 111 encoded action/boundary samples were viewed**, across all 16 generated sheets, after the last choreography/camera changes. Preparation, movement, handoffs, projectiles, foot/rock contact, spin/back landing, rabbit lift and the prince/black ending were inspected. See `action-review-frames.json` and `delivery-qa.json`. This remains sequential-frame review, not real-time playback or listening.
- TypeScript and the film contract pass. **13 Node + 11 Python tests pass**; the recorded-track fingerprint, missing input, legacy behavior, ambience-only five-second gates and their invalid inputs are covered. `audio-input-audit.json` additionally verifies the actual rendered stems against the supplied music and approved narration; all seven ambience intervals are zero.

### Timestamp-only correction

The joined Actions file had a maximum 1.917 ms deviation from the 30 fps grid (millisecond chunk timestamps). Rather than waive the exact timing requirement, it was remuxed losslessly with FFmpeg 9.0.2 and the `setts` bitstream filter. **All 4,848 H.264 and 7,576 AAC packet payloads are bit-identical before/after**; no picture or audio was re-encoded. Original render digest: `325fa918152337d94a8533eb988ea3da6861c91fd26bd0ae2e3324d87c95356f`. See `timestamp-normalization.json`.

```bash
ffmpeg -i original-render-31.mp4 -map 0 -c copy \
  -bsf:v 'setts=prescale=1:time_base=1/30000:pts=round(PTS*TB*30)*1000:dts=round(DTS*TB*30)*1000:duration=1000' \
  -video_track_timescale 30000 -movflags +faststart normalized.mp4
PYTHONPATH="$PWD/out/film-tools" python3 scripts/check-five-seconds-delivery.py renders/in-this-town-five-seconds.mp4 master
```

The `prescale` form above is for FFmpeg 9; do not apply its timestamp expression blindly to an older filter version. This correction is scoped to the new film, not the delivered Freeze Bell master.

Release destination: [render-31](https://github.com/Mellow048/kmanincraftghhj22/releases/tag/render-31). Direct upload from the sandbox could not reach `uploads.github.com`; the `publish_release` mode of the existing render workflow publishes only a committed MP4 whose passing QA digest and source match the existing release. Normal rendering is unchanged when that option is empty. **Publication confirmed:** [verified-file run 43368636167](https://github.com/Mellow048/kmanincraftghhj22/actions/runs/43368636167) succeeded from `1cbdce590e81fad8e8e7a306cbfad4a205e9a7d3`. Release asset `742326227` has the same final SHA256 and byte count as the local master. [Download the full-HD MP4](https://github.com/Mellow048/kmanincraftghhj22/releases/download/render-31/in-this-town-five-seconds.mp4). The original Actions artifact is the pre-normalization container; use this verified release/repository master.

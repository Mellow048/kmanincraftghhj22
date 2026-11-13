# Five Seconds — full motion revision V2

## Scope and approval

The owner approved the **15.7-second motion/background proof** and authorized the full continuation: “okay i like this kind of motion and detail in the backround! go ahead”. That is not approval of an unseen full V2. The prior 161.6-second V1 is retained, not overwritten. Neither film is promoted to an official reference.

The full composition remains **1080×1920, 30 fps, 4,848 frames / 161.6 seconds**, with the same 674 spoken words, 91 cues, 18 beats, nine original `voice-00` recordings, supplied `Topics/InThisTown/InThisTownMusic.aac`, seven exact five-second stops, approved rock-trip counter, and prince → reaction → black ending. No age, cooldown, exhaustion, superspeed, teleport, face hit, CTA or sequel line has been added.

## Performance changes

- **Ordinary life:** the approved curtain, bowl, bread and hinged-book performances remain. New hand-led glass release, book touch/release, feeding and shoelace reactions; mixed classroom seating/facing and a teacher's chalk wind-up/throw/recovery.
- **Locker:** the blue panel first stops near the villager's nose. The hero touches and opens the door, releases it to wait, steps into the opening, grips the joined sleeves, and pulls his friend forward through the opening before moving left. This replaced a diagonal route that clipped the locker. The book is picked up into the real palm, laid on the friend's sleeves, released, and followed by visible steps aside. The door resumes its closing swing only when time returns.
- **Night rescue:** raised/drawn bow and string release; arrow flight; collar contact and backward steps drag the elder fully over the sill. The boot remains on the inward-opening door throughout its closing arc, then retracts. The arrow resumes into the closed door. Elder rise and carrot handoff share the actual rig contacts.
- **Bedroom:** mother checks the offered sleeve, walks to the window, closes the tracked lower sash with her joined sleeves, then withdraws. The boy wakes, rises, crosses from the bed to the window and later leaves through the actual doorway.
- **Rabbit/chase:** stranger bends, casts frost and scoops the supported rabbit; distance-driven runners and wind-up/extension/recovery for thrown ice. Impact debris and the broken wall are physical set changes. The hero bends to the rock, carries it around the man, sets it down and steps clear. Toe contact leads into stumble, spin and back landing. Rabbit transfer is supported by the old palm and then both new palms. The boy steps backward to give the man room to rise before recognition.
- **Backgrounds:** top-hung curtains and cloth settling, window tracks/handle, bedroom furniture and floor, hallway/classroom clutter, street curbs, planters, hanging signs, fences and trees. All frozen-world clocks remain held; a live `lookAt` on the watching mother is also clamped during the counter.

`performance.ts` provides film-local planted-foot, step, reach and palm math; `home-motion.ts`, `school-motion.ts`, `rescue-motion.ts` and `chase-motion.ts` own continuous performances. Cuts do not restart them. `write-scenes.py` remains the authoritative camera/shot generator.

## Review provenance

1. Twenty staging stills and 89 story stills were reviewed first. They exposed blocked or excessively tight locker, classroom, arrow, window, rock and recovery angles. Those early sheets do **not** certify the later corrected source.
2. Successive targeted framing checks re-rendered the affected views. The final angles show mixed classroom faces, the nose/door gap, sash contacts, the rock under the hand, the caught toe and the man's recovery.
3. Original-speed encoded excerpts cover locker, rescue, counter/trip/rabbit/recovery. Their decoded temporal samples are checked for preparation, travel, contact and recovery, not just the cue midpoint. The first locker sequence exposed the clearance issue and is superseded by the hand-opened-door version.
4. Full encoded-master QA and its final review are recorded below only after the master exists. The original short proof is not rerendered unnecessarily and is not substituted for the full film.

**Review boundary:** the agent can inspect source states, measurements and sequential decoded images. This is not subjective listening or a claim to have watched real-time playback. The owner judges whether the completed film feels entertaining.

## Audio

Effects follow the actual motion anchors exported by `scripts/five-seconds-action-anchors.mjs`; the successful narration is not regenerated. The exact supplied AAC remains the only music input. Latest authored mix: **272 effects / 32 kinds**, 23 recorded-track level sections, 13 ambience beds and seven 150-frame ambience mutes. Numeric report: **−14.8 LUFS, −2.2 dB true peak**, median voice/rest margin **17.2 dB**, worst **4.3 dB**; zero effects buried below music/beds (some deliberately faint footsteps remain). Maximum limiter reduction is 0.6 dB. These are signal measurements, not listening approval.

`check-five-seconds-inputs.py` verifies the approved story/timing and all nine original recording hashes, current mix inputs, exact AAC, preserved V1/proof/Freeze Bell masters, decoded voice/music stems and native-PCM silence for all seven ambience holds. Native PCM matters: a resampling filter can smear a resumed sample across an otherwise exact mute boundary.

## Validation and delivery status

Pre-render checks are complete: **36 Node tests, 11 Python tests, typecheck and film contract pass**. The browser fixture passes **4,848/4,848** frame/scene/shot clocks, **12** actual contact sequences and **13** frozen-state checks. Fresh before/after rendering against isolated `cc8ed55` source gives **18/18 pixel-identical samples**: 16 views in seven existing films, plus two explicit default Skeleton-bow states. Freeze Bell source/audio/master and the accepted short proof remain unchanged.

All **189 temporal samples** from the corrected locker, rescue and counter/fall/recovery clips were viewed across 14 sheets. The first locker clip was superseded, not counted as clearance of the corrected exit. See `v2-preflight.json`, `v2-model-audit.json`, `v2-clock-audit.json`, `v2-legacy-regression.json` and `v2-input-audit.json`.

The **full-resolution master render and its final encoded QA are next**. Historical V1 and short-proof reports retain their names and meaning; full-revision reports use the `v2-` prefix. Passing measurements are not artistic acceptance.

## Reproduce this revision (do not rebuild narration)

```bash
python3 src/videos/in-this-town-five-seconds/write-scenes.py
python3 src/videos/in-this-town-five-seconds/write-sound.py
python3 scripts/sound.py build in-this-town-five-seconds --stems
npm run typecheck && npm run check
node --test scripts/check-story-ending.test.mjs scripts/check-music-track.test.mjs \
  scripts/five-seconds-domestic.test.mjs scripts/five-seconds-choreography.test.mjs
python3 -m unittest discover -s scripts -p 'test_sound_inputs.py' -v
python3 scripts/check-five-seconds-inputs.py
node scripts/five-seconds-audit.mjs --clocks
REVIEW_PASS=motion-clips node scripts/five-seconds-v2-review.mjs --clips
python3 scripts/five-seconds-v2-clips-review.py
# REGRESSION_BASELINE names an isolated source snapshot of cc8ed55, never another branch.
REGRESSION_BASELINE=/path/to/snapshot node scripts/five-seconds-v2-regression.mjs
# Compare each before/after folder with scripts/compare-stills.py.
# Final master, after rendering:
QA_OUTPUT=out/five-seconds/full-v2/delivery \
MODEL_AUDIT=src/videos/in-this-town-five-seconds/v2-model-audit.json \
ACTION_FRAMES=src/videos/in-this-town-five-seconds/v2-action-review-frames.json \
python3 scripts/check-five-seconds-delivery.py renders/in-this-town-five-seconds-v2.mp4 master
```

Sandbox rendering uses `REMOTION_CHROME=/tmp/chromium` and `LD_LIBRARY_PATH="$PWD/out/pelican-qa/runtime/lib:/tmp"`; Python analysis uses `PYTHONPATH="$PWD/out/film-tools"` and `OPENBLAS_NUM_THREADS=1`. Large diagnostic intermediates remain in ignored `out/`. A source snapshot for regression is not a switched or newly created Git branch.

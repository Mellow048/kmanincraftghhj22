# Five Seconds — motion revision, not another technical sign-off

## Why this pass exists

After the first MP4, the owner said: **“it lacks motion and visuals need improving like the curtains one and other stuff.. it just felt like it wasnt entertaining”.** V1's timing checks and still reviews did not make its performances engaging. V1 is delivered, but its picture is **not artistically approved** and it is not an official reference.

The assistant committed to a short motion preview before another full-length render. The approved script is not up for reapproval. This proof does not replace or shorten the 161.6-second film.

## The preview

`renders/previews/five-seconds-motion-v2.mp4` contains three excerpts of the **actual full-film composition**, at 720×1280 / 30 fps. There is no separate, better-looking mock scene and no footage speed-up.

| Passage | Source frames, inclusive | What changes on screen |
|---|---:|---|
| Origin question → curtains | 270–428 | The question gets an anticipatory shrug; mother turns, walks to the window, settles her feet, reaches the cord, pulls, releases. Properly rail-hung panels meet, sway and settle; window light diminishes. |
| Glass confession → bowl → warning | 1437–1569 | Bowl movement comes from the joined sleeves. She stops washing, lowers it onto the counter, releases it, turns toward him, then leans into the warning. |
| Whole loaf → math | 2125–2303 | A sleeve-led push keeps the loaf on the wood; he reaches to meet it, then withdraws. His real hand opens the hinged book cover; the revealed exercise and his nod pay off the friend's explanation. |

Total: **471 frames / 15.7 seconds**. Excerpts cut only between completed lines; 8 ms audio edge fades avoid clicks. The renderer uses the existing original voice-00 narration and the supplied InThisTownMusic.aac; no narration was regenerated. Effects were retimed for the new footsteps, cloth pull, bread push and book opening.

The preview is rendered and presented for feedback. All 471 frames decode at constant 30 fps; its soundtrack matches the same original-mix excerpts at 0.999879 zero-lag correlation. All 82 encoded temporal samples across the three review sheets were viewed. The preview's encoded checks and source hashes are in `motion-preview.json`; the 20 Node / 11 Python test results and 14 sampled legacy comparisons are recorded separately in `motion-preview-checks.json`. **The owner approved this motion/background direction:** “okay i like this kind of motion and detail in the backround! go ahead”. The full-film revision and render are now authorized. Do not call the full visual revision finished because this file renders.

## What was rebuilt for the approved short proof

- `domestic-motion.ts` owns continuous curtain, bowl and lunch performances across camera cuts. Contact positions come from the actual rig transform, rather than an independent prop tween.
- Villagers remain villagers: same face, long nose and joined sleeves. Optional `foldedArms`, `bodyBob`, `bodyRoll` and `walkAmount` enable authored reach, bow and planted-foot recovery. No fingers or player arms were substituted.
- `Curtains` gains **opt-in** `topHung` and `flutter`. Old geometry remains the default. The corrected panels are attached to the rail, with rings, a continuous folded surface and hem. Five Seconds supplies the cord endpoints and word-timed cloth response.
- Additive pack parts: `Cord` and `HingedBook`. The old `Book` remains unchanged.
- Kitchen framing keeps the walk and sleeve/cord contact visible. The lunch set is enclosed and dressed for the new side angles, instead of exposing a blue void; benches have supports. Camera changes are retained in `write-scenes.py`, not only in generated files.
- `write-sound.py` still reads the same source timing and supplied track. The revised mix has 238 effects, 23 supplied-track gain sections, 13 beds and the unchanged seven ambience mutes. Numerical mix report: −14.7 LUFS, −2.3 dB true peak, worst voice margin 4.4 dB, zero buried effects after the targeted footstep correction. This is not a listening claim.

## Review discipline for this pass

The first diagnostic frames caught a walk hidden behind the boy, unfinished scenery exposed by the new lunch angle, and over-deep leans. These were corrected. The first encoded temporal review then caught the boy's head obscuring the friend during his wish; that angle was moved. The preview begins after the rounded cue boundary so it does not flash a frame of the preceding adoption memory.

Seven new tests check continuous walking, actual sleeve/cord and sleeve/bowl contact, tabletop loaf height/contact, released prop stability, and the real left/right hand transforms at the loaf and hinged cover. These checks are **not** a measure of entertainment. Sequential encoded frames are reviewed as a visibility aid; the agent has not performed subjective real-time playback or listening. The owner gets the MP4 to judge the feel.

The 14 existing-film before/after stills (frames 0 and 1240 in seven films, including Part 2 and Freeze Bell) remain pixel-identical after the shared opt-in extensions. This is a sampled regression, not an all-frame claim. Freeze Bell's source, audio and master are unchanged. The V1 Five Seconds master and release are also retained, not silently replaced by a preview.

## Full-film continuation — authorized

The full performance integration and current review evidence are now documented in **`V2-REVIEW.md`**. The proof-specific counts above stay historical; they are not the new mix or full-film QA.

- Carry the agreed performance style across the rest of the full film: opening, classroom/chalk, locker rescue, elder rescue, bedroom/window, chase, impacts, rock placement/sidestep, trip/fall and rabbit transfer.
- Recheck every revised action in sequence at its actual pacing, not only at a midpoint. Revisit physical contacts, eye lines and reaction holds; do not solve weak acting with extra camera shake.
- Retiming of remaining effects must follow the revised action, without changing approved words or five-second intervals.
- The full-film 1080×1920 render and new encoded review were completed **after** the short proof. The separate result is `renders/in-this-town-five-seconds-v2.mp4`; see `V2-REVIEW.md` and `v2-delivery-qa.json`. The original `renders/in-this-town-five-seconds.mp4` remains V1. The owner has not yet accepted the full V2 picture.

## Reproduce the proof

```bash
npm run typecheck && npm run check
node --test scripts/check-story-ending.test.mjs scripts/check-music-track.test.mjs scripts/five-seconds-domestic.test.mjs
python3 -m unittest discover -s scripts -p 'test_sound_inputs.py' -v
node scripts/five-seconds-motion-preview.mjs --stills # diagnostic views only
node scripts/five-seconds-motion-preview.mjs          # three actual-film excerpts, concurrency 2
python3 scripts/five-seconds-preview-assemble.py      # joins, decodes, checks PTS and extracts temporal sheets
```

In this sandbox add `REMOTION_CHROME=/tmp/chromium`, `LD_LIBRARY_PATH="$PWD/out/pelican-qa/runtime/lib:/tmp"` for rendering, and `PYTHONPATH="$PWD/out/film-tools"` for Python image/audio analysis. Diagnostic intermediates stay under ignored `out/`. Do not rerun narration or any Freeze Bell generator.

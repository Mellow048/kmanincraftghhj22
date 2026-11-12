# Freeze Bell — production record

**Narration, pictures and sound are built and checked. The final cloud render is next; no finished MP4 has been delivered yet.**

## Approval and source

- The owner approved the script and production, selected English narrator **`voice-00`**, and asked to continue after the temporary recording allowance blocker. That blocker is resolved. Do not audition another voice or regenerate the recordings unnecessarily.
- The spoken script in `narration.md` is unchanged: **697 words, 18 beats, 82 shots, 9 recording groups**.
- Approved narration-block SHA-256: `46e51b9c116ffe6730e4f672abe451a08fc07d70440c73baedc31cc62ef63c5e`.
- Framework base: `main` at `74296927c66583a7903dc26671e1283d5df32957`, merged into active branch `arena/90c86f33-kmanincraftghhj22`. Existing engine, approved pack models and reference-film sources remain unchanged.

## Measured narration and cut

All nine `voice-00` recordings exist in `public/audio/in-this-town-freeze-bell/raw/`. The first recording was reused; the eight remaining clips were recorded after the owner's continuation. No recording has been listened to by this agent.

The real build was run **without `--estimate`**:

```sh
PYTHONPATH="$PWD/out/film-tools" python3 scripts/narration.py build in-this-town-freeze-bell
```

| Measurement | Result |
|---|---|
| Composition | 1080 × 1920, 30 fps |
| Duration | **165.1333 seconds** (about 2:45.1), 4,954 frames |
| Voice | One selected narrator, `voice-00`, across all 9 recordings |
| Speaking rate | 254 WPM; build tempo 1.3885 |
| Timing | `estimated: false`; all 9 clips `aligned` |
| Words | 697; positive, ordered, nonoverlapping word intervals |
| Shots | 82 contiguous cues across 18 scenes |
| Shot duration | 0.70–5.033 seconds; median 1.90 seconds |
| Word gaps | Six over 0.5 seconds; longest 0.6 seconds |

`timing.json` is generated, not hand-edited. `narration.mp3` is the assembled voice-only source; `film.tsx` plays the **finished mix**, `audio/in-this-town-freeze-bell/mix.mp3`.

The earlier 164.3-second estimated clock was retained only as ignored scratch review data. The two shot-duration changes of at least 0.45 seconds were `9.bury` (now 1.80 s, −0.467 s) and `12.pack` (now 5.033 s, +1.00 s). Both were rechecked on the measured clock.

## Pictures and continuity

All 82 shots are implemented in `scene1.tsx`–`scene18.tsx` and registered in `film.tsx`.

- One inhabited village, the kid's room, the passage behind the scenery, the outside shelf, and the giant bedroom. The reveal uses the **same Village component**, not a second miniature replica.
- New reusable props are additive in `Topics/InThisTown/everyday.tsx`, exported and catalogued by the topic. They are **not yet owner-reviewed**.
- Multiple estimated-clock picture passes repaired ground contact, blocked faces, the dark pocket behind the boards, outside lighting, the lid's rope fastening and moving hinge straps, and the empty stool's visibility.
- **Measured-clock review:** rendered and viewed **all 82 midpoint stills** at 270 × 480, plus **26 paired 10%/90% frames** for freeze/restart, hay fall and burial, packing, crawl, rope jerk, torch/light change, screw climb, lid replay/closure, hand shadow and ending.
- The earlier half-scale box/boy/rope reveal frames and six final mechanism endpoints were also viewed. Final delivery still requires checking the encoded MP4; these stills are not a substitute for playback or owner approval.
- A separate Three.js transform check placed the right lid rail inside the giant's terminal block-hand region at the held pose. The rail point maps to approximately `[0.0086, -0.6309, -0.0553]` in arm-local coordinates, inside the distal `y=-0.675…-0.5625` region. This verifies contact geometrically, not merely from the camera's apparent overlap. The approved Player model was not modified.

### Continuity contract

1. **People choose to freeze.** Performer clocks hold; the camera, dust, loose objects and moving shadows do not. Baskets remain in hands.
2. **Two apertures.** The high rope slot is at x=0; the kid's loose-board opening is at x=4. The return loop runs beside the opening and back to the lid. Close passage coverage is rebased to z=130.
3. **One village, one shelf.** Shelf surface and town floor are y=0. Jar, screw and exit share that surface; the screw head top is y=2.49.
4. **Two strikes, not three.** `17.rope` replays the opening already heard at `15.ring`. `17.second` advances to the present closure. Neither `17.box` nor `17.boy` adds a strike; neither does the subscribe sign.
5. **The same captive.** Player look 3 throughout: turquoise clothes, dark face and hair. He stays under the inverted jar. The extra bun is for him.
6. **Closed does not mean safe outside.** The teller remains on the shelf when the case closes. His rescue attempt motivates the last approaching hand. End before contact.
7. **No shared redesign.** Giant: approved Player look 8 at 32× scale. The final large hand insert matches its red sleeve and skin. The other named performances use approved Player looks; Villager arms stay folded.

## Built sound

`sound.json` is an authored cue/word-based sheet; `sound.lock.json` and `mix.mp3` are generated by `scripts/sound.py`. The sound tool and topic limits were not changed.

- **12 music sections:** 11 playing sections and one deliberate silence before the reveal. Daylight town → curiosity → blue-night drone → comic hay failure → secret work → tense last look → passage drone → held breath → dark reveal → recognition → final danger.
- **12 beds:** village, room, night and restrained crowd air, matching the locations and pauses in the town's routine.
- **160 effects of 26 kinds**, justified across every cue. Packing nouns have separate effects; gait footsteps use the scene's actual travel/stride phase rather than guessed intervals.
- The 460 Hz, 0.85-second bell and scrape character recur with the lid. The reveal replay is explicitly marked. The unseen child's breath is low air, not an unrelated monster roar.
- The first build had one buried hay-landing thud. Raising that effect by 3 dB fixed it; no checks were bypassed.

| Final mix measurement | Result |
|---|---|
| Music below speaking voice | 18.7 dB |
| Beds below voice | 27.8 dB |
| Effects per minute | 58.1 |
| Longest effect gap | 3.3 s, starting at 114.5 s |
| Buried effects | **0** |
| Voice above everything else, median | 16.4 dB |
| Voice above everything else, worst speaking half-second | 4.6 dB |
| Music silence, measured | 6.7 s |
| Loudness | **−14.7 LUFS** |
| True peak | **−2.7 dB** |
| Limiter attenuation | 0.0 dB maximum |

All six worst speaking windows were inspected in the report: 25.4 s (`3.second`, bell/rustle, 4.6 dB); 107.5 s (`13.reply`, plink/rustle, 5.2); 154.8 s (`17.second`, bell/thud, 5.2); 24.2 s (`3.second`, bell, 6.9); 127.2 s (`14.scrape`, scrape, 7.4); 72.2 s (`9.lean`, debris/slide/thud, 8.4). All exceed the 3 dB minimum.

The effects report and four-track timeline were inspected; stems are available as ignored scratch files. **Sound was measured, never listened to.** Numbers cannot judge whether the voice delivery or synthesized music/effects are pleasant. Ask the owner for one phone-speaker listen on handoff.

## Checks and regression scope

- `npm run typecheck`, `npm run check`, and `git diff --check` pass with the **measured narration and wired mix**. Freeze Bell has no unfinished-timing or sound warning. Existing base-film camera warnings and Monster Egg's pre-existing voice-only exception are unrelated.
- Existing engine, six existing pack modules, and both model-film folders have a clean source diff against the studied `origin/main`.
- Sampled before/after renders were pixel-identical at scale 0.25: Same Face frames 0/1240 and Monster Egg frames 0/4600. This is **four sampled frames**, not a full per-shot regression sweep.
- Picture review and numerical audio checks are not an owner approval or a listening review.

## Remaining delivery work

1. Commit/push this production only to the active Arena branch.
2. Dispatch `.github/workflows/render.yml` for `in-this-town-freeze-bell`, **scale 1**. The existing workflow renders on GitHub, never on the owner's laptop, and joins H.264 chunks with an AAC stereo track.
3. Retrieve and probe the actual rendered MP4: dimensions, frame count/rate, duration, codecs, audio presence, decoding and representative frames. Keep the full-quality release master separate from any size-limited branch copy.
4. Present the actual film, not a contact sheet, silent animatic, script or reference film. State clearly if a downloadable branch copy was re-encoded, and link the full-resolution master.
5. Disclose that sound was measured, not heard, and ask for a phone-speaker listen. Update this record with the actual render run and final probe results.

## Reproducing checks

```sh
npm run typecheck && npm run check
PYTHONPATH="$PWD/out/film-tools" python3 scripts/sound.py check in-this-town-freeze-bell
LD_LIBRARY_PATH="$PWD/out/pelican-qa/runtime/lib:${LD_LIBRARY_PATH:-}" \
  node scripts/shots.mjs in-this-town-freeze-bell \
  --scale 0.25 --out out/freeze-bell/measured-midpoints --chrome /tmp/chromium
```

Runtime helpers and diagnostic outputs in `out/` are ignored, not deliverables, and may need restoring. Persistent source, raw recordings, generated narration/timing, sound sheet/lock and mix live in the film and `public/audio/` folders.

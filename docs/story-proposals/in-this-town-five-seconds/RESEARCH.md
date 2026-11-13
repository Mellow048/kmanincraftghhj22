# Five-second time stop — research and integration handoff

**Historical research handoff; superseded stage:** the owner has now approved Draft 2 and production has started. See `PRODUCTION-STATUS.md` for the current blocker. The research below records the pre-approval state.

**Stage at the time of this research: script approval only.** `narration.md` is the authoritative proposed spoken text; `SCRIPT-FOR-APPROVAL.md` is its readable copy. No new film is registered, recorded, mixed or built. The owner could not see the previously presented file, so the full script must also be pasted directly into chat. Research permission is not script approval.

**Confirmed production choices:** the existing **`voice-00`** and **`Topics/InThisTown/InThisTownMusic.aac`**, explicitly reconfirmed by the owner. No replacement voice or generated score. The touch/release convention and prince/no-CTA ending still need approval with the script.

## Framework refresh and reference location

- Working branch remains `arena/90c86f33-kmanincraftghhj22`, HEAD `aa2fb0f95ecc2bd613568186f5a3aa2a134d54d3`.
- Last verified main: **`deabadc5cf505e021f1dff6f314361632edc18a6`**, still unmerged. Repeated successful main fetches and an API inventory did not find Part 2 there.
- Reviewed all **54 Markdown paths on that main snapshot**: 34 full current texts, six complete deltas against previously read text, one verified identical copy, and 13 Git blobs unchanged from the completed `74296927c66583a7903dc26671e1283d5df32957` review. `reference-review.json` records the method/hash for each; this is not a claim of 54 fresh full rereads.
- Part 2 was subsequently located through GitHub releases and workflow runs. Its approved reference is on **`arena/e0330cc3-kmanincraftghhj22`**, at **`cda5695dc2b9b7f758bcf9c0abfa2c2b347a877f`**. This commit was fetched by SHA for **read-only study**; the working branch was not switched, and nothing was merged from it.
- The Part 2 reference was added by commit `cda5695` ("Reference: Superpower part 2 (approved): mp4, source snapshot, contact sheets, what fixed the pace"). Its rendering source is **`6b928a4f1ab7fe3f4fcd37630c37cee2fe00721b`**, successful run **`43338299309`**, release **render-27**. All **25 reference/source files are Git-blob-identical to that rendering source**.
- Scratch snapshots: `out/main-study-deabadc/` and `out/five-seconds/part-2-study/snapshot/`. `out/` can disappear; recover the source with `git show <commit>:<path>`.
- New main includes WhatIf and Explainer topics. This request remains **InThisTown**; borrowing school assets does not change its topic.

## Part 1 study — retained, not confused with Part 2

Read its README, narration, film, kit, world, all 18 scene sources, timing, sound sheet and sound lock. Viewed its 84-frame contact sheet, 18 focused frames extracted from the archived MP4, and subsequently **all 90 shot midpoints in six further sheets**, with all 90 scene notes reread. Verified all 25 reference/source files match the live Part 1 source on main.

Reference timing: 90 shots, 168.1333 s, median shot 1.76665 s, maximum 3.4 s. Archived MP4: **720×1280, 30 fps, 168.149 s**, despite the README's 1080 claim. These were sampled visual reviews, not full-motion playback or listening.

Useful craft: show the power before naming it; plant small observable details before a revelation; win through the established ability rather than a convenient rescue. The owner rejected the unearned rain-cloud/father-home ending. Our chalk mistake, neighbor/rabbit and mother's secrecy are original plants for the user's specified confrontation, not borrowed plot or dialogue.

## Part 2 study — completed for the latest request

Read **the approved reference README and narration, film, kit, world, all 18 scene sources**, and inspected timing plus the complete sound-sheet entries and lock. Also read the framework documentation changes and the file-backed music implementation. The reference's kit re-exports Part 1's cast; do not accidentally recolor that cast or Freeze Bell when building the new film.

Visual review:
- Viewed the supplied **84-frame every-two-seconds contact sheet**.
- Viewed the supplied **60-frame, five-frames-per-second action sheet (28.0–39.8 s)**: Tip airborne, hero's lunge/arm plunge, roots advancing through town, leaf forming underneath him.
- Extracted and viewed **18 additional word-timed frames** from the approved archived MP4: tree launch/airborne recovery; fire spear approaching/passing through the wing; crash/ground contact/bounce/skid; moving hedge impact. Scratch evidence: `out/five-seconds/part-2-study/motion-focus/{focus-1.jpg,focus-2.jpg,manifest.json}`.
- **Not full-motion playback and not audio listening.** A passing still or numerical check alone cannot establish pace. The reference README itself explicitly records that the owner supplied the motion/listening review.

Media/version caveat: downloading the 132,938,804-byte full-HD release via `gh release download` failed on its release-asset-host redirect. No full-HD-download claim is made. The approved MP4 committed alongside the reference was successfully extracted through Git: **42,416,246 bytes, 720×1280, 30 fps, 5,066 frames, 168.878 s container duration**, AAC stereo 48 kHz. The reference README says 1080×1920, but that describes the full-HD render, not this re-encoded archive. The new film's delivery target remains **1080×1920 at 30 fps**.

Measured/source timing: **713 words, 83 shots, 18 beats, eight clips, 168.8667 s, 254.1 WPM**, tempo 1.3283; median shot 1.9 s, longest 4.6666 s. Overall timing is audio-backed, but `02-tip` is marked **estimated** at the per-clip word-timing level; the other seven are aligned. Do not treat every word anchor as measured.

Sound sheet: 21 music sections, nine beds, 175 SFX entries expanding to 199 events. The lock reports 35 kinds, 3.1 s maximum event gap, zero buried events/failures, -14.8 LUFS/-2.2 dB true peak. These are recorded measurements, not our listening judgment. It uses the owner's exact AAC through `music.track`, and cuts it for the closed-eyes section.

### What Part 2 specifically changes about our staging plan

The owner rejected the first render because it teleported between poses, lacked urgency, omitted the narrated arm plunge, grew the roots too slowly, failed to bounce after the tree launch, ran Tip through the well, and repeated a joke. The accepted revision provides concrete source examples:

1. **Preparation → movement → impact → recovery.** `scene2` winds up the flick; `scene3`/`Plunger` shows the lunge and both arms driven into mud. Following the subsequently approved trip revision, our rock must be picked up visibly, carried along a continuous route, set in the running path with visible hand contact/release, and followed by a visible sidestep. The man's fall needs a stumble and ground contact, not a cut to a prone pose.
2. **Words and actions share anchors.** `wordAt("3.fast", "arms")`, `wordAt("5.tree", "grew")`, and `wordAt("7.shot", "through")` drive action, particles, impacts and sound. Use real narration timing for our new film; do not turn estimated cue fractions into claimed exact synchronization.
3. **Fast is not teleportation.** Roots accelerate (`p * p`) and pass landmarks with a following camera, debris and speed streaks. Ice should launch and cross space at speed before stopping; after the stop, world movement resumes along those same trajectories.
4. **Momentum is visible.** The tree rises in 0.22 s and the helper `tossed` produces overshoot and two bounces. Leaf catch and crash landing also have follow-through. Use appropriate physical reactions, not that film's plants or life-power mechanics.
5. **Geography and framing matter.** The revised run skirts the well. Our routes must miss lockers, gates and walls; stage the final counter within roughly two metres so five seconds is credible. Part 2 warns that side-by-side actors need portrait framing space, wings can occlude their owner, and nearby green lights wash out faces.
6. **Contrast, not constant shaking.** Impact camera moves reinforce hits; small chase shake and quiet facial motion keep life in normal time. For this story, stopped backgrounds must truly stop. The active hero moving against motionless objects supplies the contrast.
7. **Review the intervals.** Inspect wind-up, travel, contact and recovery within each action, not just one midpoint. Still review does not replace actual motion playback when available.

Draft 2 adds these nonspoken staging requirements. Its sole spoken revision from Draft 1 is **"One afternoon" → "One morning"** at the locker, fixing the chronology before lunch. No cooldown, exhaustion cost, numeric age, extra power, subplot or sequel promise was added.

## Existing pack and music implementation

- `Topics/WhatIf/school.tsx` was read fully. SchoolHall defaults to 16×4×3.4 m; Classroom to 9.4×8×3.6 m. Keep the lens inside solid sidewalls/below the ceiling. Layout helpers assume scale-0.8 children; the proposed 0.95 teen needs actual face-height checks.
- `Topics/WhatIf/powers.tsx` was read fully. A future-echo effect is not a time stop.
- InThisTown player `who=0` is bearded; use clothing overrides for the white-clothed man. The friend and mother remain villagers.
- No Rabbit, Zombie or Skeleton export was found in the main pack export search. Check reusable primitives/components before implementing new ones after approval.
- Supplied music: **3,619,780 bytes, stereo AAC, 44.1 kHz, approximately 215.715 s**, SHA256 `5adf61371ab3f4fe5c1eff93bfa15ef940a7be3f9888da5807cececf2fafaca3`. Main's upload commit says **"Use this everytime"**, now explicitly reconfirmed by the user. Not listened to during this study.
- **Correction to the earlier handoff:** deabadc main and this working branch lack file-backed music, but the now-located **Part 2 branch already implements it** in `scripts/sound.py` (`decode_stereo`, `track_music`, and the `music.track` selection in `render`). Its SOUND.md documents `track`, optional `trackFrom`, section gain/silence, looping, voice-relative leveling and ducking. Reuse/adapt this opt-in approach rather than start from a procedural-only assumption.
- Before production integration, add/test a music-file hash in the lock/staleness check; the Part 2 lock currently hashes timing, sound sheet and narration, but not the track bytes. Test default procedural behavior and file-backed sections without changing finished mixes. Do not silently substitute a generated score.

## Historical integration plan — subsequently completed in production

Refresh main before building, on the same active branch. Main overlap paths include `Topics/InThisTown/{PACK.md,README.md,index.ts,topic.json}`, `docs/STORY-FILMS.md`, `scripts/check-story-film.mjs`, `src/engine/types.ts`, and `src/registry.ts`.

**Do not copy the Part 2 branch's entire older framework over main.** A two-dot tree comparison includes unrelated absences/regressions because of different branch ancestry. Its common-base diff identifies the targeted music additions; port or merge deliberately, preserving newer main assets and this branch's completed film.

Preserve Freeze Bell's registry entry, exact scoped ending exception, six ending tests, optional/default-off `cutToBlackAt`, recordings, mix and delivered master. Its praise does not authorize promoting it as an official reference. Do not rerender it. The new prince ending requires its own approval and separately scoped configuration.

Incoming main engine changes already inspected include additive `lantern-night`, optional avatar head accessory, `leanOver`/`push`, wheat texture and look typing. Shared asset integration still needs regression review. No post-merge success is claimed: neither main nor Part 2 is merged here.

## Text-only validation and approval gate

The unchanged `scripts/narration.py` estimator runs with an isolated scratch `ROOT` under `out/five-seconds/script-estimate/`, not a production registration. Draft 2 retains **674 words, 91 proposed shots, 18 beats, nine clips, about 2:39 estimated**. `script-check.json` is the current machine-readable record, with the new spoken hash. The readable approval script is checked word-for-word against the canonical cues.

The final spoken line remains **"The prince of our village."** No CTA or sequel promise is included. The user must approve the exact script and the proposed touch/release behavior before any voice generation or build.

The text estimate does **not** validate the **150-frame / five-second** action windows. Actual narration timing, continuous geometry, cameras, sound, motion and encoded delivery require later work. If the words cannot fit a clear five-second stop, revise and reapprove rather than silently stretching time. The obsolete cooldown/age-16 scratch draft was deleted and must not return.

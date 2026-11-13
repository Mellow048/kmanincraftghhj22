# Five Seconds — production status

## Approved, assembled and mixed

The owner approved Draft 2 and then the exact trip replacement: **“okay this seems more kid friendly go ahead and do the mp4.”** No further approval is outstanding. The rejected face-hit recording is superseded, not pending. All nine `voice-00` originals, including the approved clip 08, are present and aligned; the successful originals were not regenerated.

Authoritative narration: `src/videos/in-this-town-five-seconds/narration.md`.

- Spoken text SHA256: `e3f31d5c18859fb8f573edc246b9d1a79c4ecf157a77b869f23768f823e8bb15`.
- Production: **674 words, 18 scenes, 91 shots, 161.6 seconds / 4,848 frames at 30 fps; 1080×1920**. This is the default full-film profile, not a short cut.
- The proposal cues, readable approval copy, production cues and timing texts match exactly. Two silent holds (32 and 12 frames) and an 18-frame visual tail add no spoken wording or new mechanics.
- Music: exact `Topics/InThisTown/InThisTownMusic.aac`, SHA256 `5adf61371ab3f4fe5c1eff93bfa15ef940a7be3f9888da5807cececf2fafaca3`. The v2 sound lock checks the track bytes, not only its pathname. No procedural replacement is used.
- Sound: 23 recorded-track gain sections, 13 ambience beds, 228 action effects; seven five-second ambience mutes. Numerical mix checks pass: −14.7 LUFS, −2.3 dB true peak, zero buried effects, worst voice/rest margin 4.4 dB. This is **not** a subjective listening review.
- A separate exact prince-ending exception is installed and tested. Freeze Bell's scoped exception is unchanged. No CTA, sequel promise, age or cooldown was added.

## Picture and continuity checks completed

91 shot midpoints, then 111 action/boundary samples and targeted follow-up frames were rendered and inspected. Corrections included contact/foot-to-rock placement, the boy's path around the frozen man, rabbit pickup/support, foreground obstructions, the recognition face, and the hovering/released book.

The runtime audit renders all **4,848 frames** of an isolated Remotion clock fixture using the production scene/cue boundaries and `WorldClock`. World and stage clocks agree through all 91 cuts, and each of the seven stops contains exactly **150 active frames**. This caught and corrected both sub-frame cue rounding and Remotion Freeze's sequence-offset/clamping behavior in later scenes. Source-state assertions also hold the stranger/rabbit pose, arrow and locker door; the hero's and rescued actors' roots are sampled every frame for continuity. These checks plus sequential stills are not a claim of real-time playback.

The shared avatar extension is opt-in. Fourteen comparison stills (frames 0 and 1240 in seven existing films) are pixel-identical before/after. Freeze Bell source/audio/master have an empty diff against the prior delivered branch tip; its master SHA256 is unchanged.

## Framework/reference provenance

Current main `011c7eefa3dbb73b9343336360cd8a3f0d952899` was merged on this same branch as `db377f1`. The 33 changed/new Markdown paths are covered by the complete 11-chunk refresh; see the production `framework-review.json`. This supersedes the older unmerged-main notes.

Part 2 was studied from actual source and sequential frames: reference `cda5695dc2b9b7f758bcf9c0abfa2c2b347a877f`, render source `6b928a4f1ab7fe3f4fcd37630c37cee2fe00721b`. The craft study did not authorize copying its plot, and the new film is not promoted as an official reference.

## Delivery

The full-HD encoded master still needs rendering and container/audio/ending checks. The live delivery record is `src/videos/in-this-town-five-seconds/PRODUCTION.md`; update it with the source commit, render run and verified MP4 when delivery completes. Do not describe the finished master as delivered until those steps succeed.

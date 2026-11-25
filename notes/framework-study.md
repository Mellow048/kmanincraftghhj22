# Framework study — In This Town owner's pass

Study of the repository's markdown, top to bottom. 294 `.md` files, 2,682,611 bytes (excl. `node_modules`/`.git`).
This file is the running digest: what the framework *is*, what the owner *wants*, and what is left to read.

---

## 1. How the rules stack

1. `MASTERPROMPT-01.md` (root) — the owner's standing brief. Decides whether a film holds a viewer.
2. `AGENTS.md` — the director's contract. Section 0 decides **which kind of film**; its mandatory startup gate
   demands `20k-hits/` (all three hits + sources), `docs/WHY-THE-3-HITS-BLEW-UP.md`,
   `docs/COMPETITOR-STUDY-NEVER-WALK-ALONE.md`, `docs/VOICE-AND-TTS.md`, `docs/VIRAL-SHORTS-BLUEPRINT.md`,
   `docs/FRAMEWORK-REVIEW-AND-REMASTER.md` before any pitch, voice, script line or shot.
3. `Topics/README.md` — a **topic** is one kind of video; the topic's own `README.md` + `topic.json` override the
   base **for that film only** (`topic: "<id>"` in `defineFilm`). `npm run check` lints against the topic.
4. `docs/` — the craft: `CAMERA-BIBLE`, `STYLE`, `SCENE-CONTRACT`, `NARRATION`, `NARRATION-RULES`,
   `STORY-FILMS` (the narrated pipeline), `DIRECTING` (reference → marks → word clock → rehearsal → review).
5. Playbooks per topic: `SCRIPT.md` (words), `SHOTS.md` (pictures), `SOUND.md` (sound), `PACK.md` (parts),
   `OWNER.md` (the owner's taste, which **wins over the playbooks**), `reference/` (approved films).

## 2. The pipeline (narrated films — In This Town, Stories, What If, Deadpan)

```
premise (4 sentences) → narration.md (one line = one shot, one # clip = one recording)
  → narration.py build --estimate (length/rhythm while it is only text)
  → OWNER APPROVES THE SCRIPT            ← hard stop, unless he declares "automatic mode"
  → record clips → narration.py build --require-alignment → timing.json (word clock)
  → world.tsx (zones) → sceneN.tsx (cue + cam.* + look + zone + note + stage)
  → typecheck + check → shots.mjs contact sheet (3–4 passes)
  → sound.py draft → write sheet → sound.py build (mix.mp3 + lock + report)
  → render (GitHub Actions only, never the owner's laptop) → REVIEW.md + hand over as "measured, not heard"
```

Explainer differs: `flightScene`, the camera flies and does not cut (`unbroken` guard), `maxHardCuts: 2`.

## 3. In This Town, as a contract

- 1080×1920, one teller, first person, **past** tense, first three words "In this town," over the face.
- Full film 150–176 s / 640–770 words / ~18 beats / 80–95 shots. Short cut 60–118 s / 250–520 words / ~14 beats
  / 35–65 shots. Middle cut 118–150 s. **Hard ceiling 178 s** (2:58) — over 3:00 it is not a Short; floor 60 s
  and 250 words or `check` fails.
- Pace 235–268 wpm (approved working point 234 with 0.25–0.7 s of air before each new story step; 249 rejected as
  too fast, 220 as too slow). Median shot 1.4–2.3 s, none over 6 s, max 18 words a shot.
- Hard cuts on the noun are the language — no camera continuity needed (opposite of the base format).
- One-word engine captions; last line contains "subscribe" (one named exception: "like this video").
- Sound: the owner's own track `Topics/InThisTown/InThisTownMusic.aac` at gain −16 under the whole film, plus
  ≥40 effects a minute, ≤6 s without one, voice ≥3 dB over everything in its worst half second (≥10 dB median).
- Pack parts are approved as they look — never rebuild or restyle; a change must leave every finished film's
  stills pixel-identical (`compare-stills.py`).

## 4. The two owner rules that changed everything (OWNER.md §A, §B)

- **A — premise on screen in the first second:** shot one is the strange thing *with the person it is strange for*;
  something moves within half a second; test at frame 15, muted.
- **B — no two shots in a row look alike:** differ in ≥2 of size / height / side / movement; every scene needs an
  environment shot, a travelling shot and an odd angle; never >2 face close-ups running; cut on a movement or a
  word and carry something across the cut.

## 5. What the 20k+ hits and the 5k competitor prove (docs/)

- Frame 1 bright (lum ≥ 95), a famous mob doing something wrong, motion in the first 3 s (`hook` ≥ 44).
- Every joke and turn is a **real vanilla mechanic** the viewer already knows.
- The engine of the middle: **the viewer is ahead of the teller** ("I thought…", said out loud and wrong).
- Powerful curve: weird rule → it was protective love; players (the viewer) are the raid.
- Fastest cut rate wins the scroll fight (median ~1.47–1.5 s for the competitor vs 2.0–2.55 for ours), 0–2 % dark
  frames, dual-colour captions (danger `#ff4f42`, hero `#ffd84d`) at y≈0.67.
- Standalone only: part-twos lose the cold feed. And do not re-pour the same outline into a new mob — the owner
  called it "reused content" on the enderman film.

## 6. Story craft (SCRIPT.md, from the treehouse transcript)

Title = sentence one. Three open questions before 0:12. Tour = only things a camera can point at, lists of three.
Wish = ≤5-word question. A rule with no reason, from the one who should know ("All I remember is that we were told
never to go down" + walks away). The twist asked aloud ~90 s early. One cheap funny failure, then one success.
Baggage packed instead of a courage speech. Slow down at the edge, look back at the tour, three small body actions.
Reveal = long delay → picture sentence → reason → stop; the reason rewrites sentence one. Then "Subscribe …" ≤7 words
that only this story could say.

## 7. Sound, in one paragraph

`sound.json` names times by cue and word (never seconds), so it moves with the re-recorded voice. `at` is the only
offset key (`offset` is silently ignored — four delivered films carry that bug). Beds per place; whoosh per scene
change; the effect goes on the word that names the thing; feet follow the animation; the reveal gets one `boom`;
silence (mood `none`) is one held breath before the reveal, ≤8 s in a film. Levels are dB against the voice as a
phone plays it. Nothing is heard by an agent: read `effects.txt` + the report, and say so on hand-over.

## 8. Reading status (coverage ledger)

Read in full: `AGENTS.md`, `CLAUDE.md`/`GEMINI.md` (identical), `README.md`, `MASTERPROMPT-01.md`,
`Topics/MASTERPROMPT-01.md`, `MASTERPROMPT-01-REVIEW.md`, all 12 `docs/*.md`, `Topics/README.md`,
`Topics/Shared/README.md`, `Topics/Shared/SHADERS.md`, `20k-hits/README.md` + 3 `ANALYSIS.md` + 3
`source/narration.md`, `Topics/InThisTown/{README,SCRIPT,SHOTS,SOUND,PACK,OWNER,MASTERPROMPT,WHY-IT-WORKED}.md`,
`topic.json`, `template/narration.md`, `reference/README.md` + every reference `README.md`
(same-face, iron-golem, robot-at-18, everyone-runs-away-from-me, monster-village + NEW-SHORT, never-seen-my-mums-face,
nobody-looked-at-the-moon, monster-egg, monster-egg-v1, superpower-at-18, superpower-at-18-part-2, pumpkin-heads,
we-are-all-cats, monster-village-part-2/3/4, the-fastest-kid-wins, helmet-kid, treehouse, moon-20-seconds),
`outlines/README.md`, `outlines/ideas-2026-11-15.md`, `outlines/ideas-2026-11-16.md` (head),
`src/videos/in-this-town-we-lost-the-vote/REVIEW.md`, heads of the five other topic `README.md`s.

Verified identical rather than re-read: `20k-hits/*/shot-log.md` == `Topics/InThisTown/reference/*/shot-log.md`;
`Topics/Stories/Old Reference/**` == the same films with `Stories` paths (diff shows only path strings);
`src/videos/<film>/narration.md` == `reference/<film>/source/narration.md` for the approved films.

Read as structured digests (all rows, timestamps dropped): `reference/same-face/shot-log.md`,
`reference/monster-village/shot-log.md`.

Also read since the first pass: `outlines/ideas-2026-11-17.md` (five pitches, no player in any of them),
`outlines/{helmet-kid,me-and-my-shadow,race-part-2}.md` (owner outlines verbatim + drafts).

**Still to read:** `Topics/InThisTown/outlines/` (ideas-11-16 tail, helmet-kid-part-2, monster-village-part-3/4,
robot-at-18-part-2), the 10 remaining `reference/*/shot-log.md`,
`reference/treehouse/{transcript,roblox-builder-prompt,shot-log}.md`, `Topics/Stories/**` (README, PACK, OWNER,
SCRIPT, SHOTS, SOUND, WHY-IT-WORKED, IDEAS, REFERENCE-STUDY, reference for new topic/STUDY, reference/bread,
reference/README, sheet, template, outlines), `Topics/WhatIf/**`, `Topics/Explainer/**`, `Topics/Deadpan/**`,
`Topics/Recreation/**`, the 7 `src/videos/*/REVIEW.md` + `STORYBOARD.md` sets, `drafts/**` (6), `templates/**` (3),
`review/framework-remaster/README.md`, `src/videos/*/narration.md` for films with no reference page
(a-stranger-moved-into-my-house, being-scared-is-my-job, everyone-swims-except-me, i-was-a-spy-for-the-villagers,
the-fastest-kid-wins-part-2, monster-village-4 etc.), `src/videos/thats-me-the-elbow/*`, `still-rushing-the-third-one/*`.

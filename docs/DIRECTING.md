# Direct the short, not the camera rig

Read the [owner's brief](../MASTERPROMPT-01.md) and the chosen topic first. For **In This Town**, the [owner's notes](../Topics/InThisTown/OWNER.md) and [reference index](../Topics/InThisTown/reference/README.md) are the standard. That index also labels rejected versions, origins and work not yet approved. A folder in `reference/` isn't itself an endorsement.

## Before the script: pick the comparison

Using Monster Village Part 1? Use the [director’s readme and transfer card](../Topics/InThisTown/reference/monster-village/NEW-SHORT.md) at pitch and again at picture review.

Open the actual reference, its shot log and the corresponding scene. Write down **one thing the audience can see** and **where your film needs to do that job**. Don't import its plot. Keep the owner's idea/script/voice approval stops.

| If the problem is… | Study this | Decision it should change |
|---|---|---|
| “I don't know what I'm watching” | [Same Face](../Topics/InThisTown/reference/same-face/README.md), then [Monster Village](../Topics/InThisTown/reference/monster-village/README.md) | Put the exception and the rule in one vertical picture. In *Same Face* the kid reads against the repeated faces behind him. In *Monster Village* the monsters become *his family*, not a catalogue of mobs. What is already happening on frame 15 of yours? |
| “It looks like PNGs” | [Superpower Part 2](../Topics/InThisTown/reference/superpower-at-18-part-2/README.md) (the roots sequence); [Robot at 18](../Topics/InThisTown/reference/robot-at-18/README.md) (inside the action) | Show the wind-up, the distance crossed, the event and the consequence. The first and last pose separated by a cut are **not** the act. Give the witness a reaction. |
| “It drags, even with fast cuts” | [Iron Golem](../Topics/InThisTown/reference/iron-golem/README.md) | Let a spoken reason have its own picture; let a planted prop come back with a different meaning. A deliberate silence before a reveal is not dead time if the image keeps telling it. Payoff first, CTA after. |
| “The lighting went missing” | [Nobody Looked at the Moon](../Topics/InThisTown/reference/nobody-looked-at-the-moon/README.md) and the [shader guide](../Topics/Shared/SHADERS.md) | Separate the face, the clue and the background. Light the thing we should notice. A grading pass cannot rescue a black face or a white sleeve blown out by a point light. |

## Stage the verb, then place the lens

For each beat, name the **cue/word**, who starts the action, what changes on screen, and who sees the result. In the town starter (`scene1.tsx`, `marks.ts`, `world.tsx`) a reaching hand makes a flower recoil, the kid walks around the table, and a reverse shows the flower bend the other way. It is a disposable rehearsal, **not** a finished hook, a reusable premise or a shot quota. [See the diagnostic frames](../review/framework-remaster/starter.jpg).

- Block in metres on the real set. Share origin, dimensions and floor height between `world.tsx` and the marks. Pass the zone's solid boxes to `blockedRoute(label, marks, solids, {radius, height})` **outside** the stage callback. It checks complete straight segments, not just endpoints. A mark on the floor/tabletop is contact; a leg of the route through the table or wall throws with its name. Leave clearance for scaled bodies, door jambs, carried props and the lens.
- Spread **that same route** into `<Hero {...route(p)} animation="walk" plantFeet />`: position, facing and metres travelled stay together. `plantFeet` adjusts hip height to put the lowest shin or shoe on the actor's local floor. Don't ground a jump or a seat this way. For a doorway use separate solids for posts and lintel, not one sealed wall; for multiple floors use the correct height. It isn't a physics engine. It cannot see unlisted scenery, swinging limbs, another moving actor or a spline you drew instead of the checked route. Inspect those contacts from the side.
- Shoot **relationships**, not a recipe list. Keep the hand and the thing it reaches for inside the *phone* frame. Track feet past a stationary landmark to show travel. Reverse for the reaction without teleporting either participant. An orbit with no reveal is decoration; three pushes can be three distinct pictures. Compare adjacent shots by subject, size, side, height, screen direction and what information is new. Keep Explainer's continuous flight instead of imposing hard cuts on it.
- Tie the reach, glance, recoil or object transfer to `wordAt(cue, word)`. For a cut inside a line, subtract its `cut` offset from cue-local seconds. Parent held items to the hand; show the handoff. For a photograph or a held breath, a locked camera can be exactly right: use `locked: true` and say why in `note`. A nominal move with identical endpoints is a delivery issue on new cut-based films. Clock noise, idle sway and handheld wobble do not tell a story on their own.

## Captions, sound and shaders

1. `python3 scripts/narration.py build <film> --estimate` is for layout **only**. Once recorded, use `python3 scripts/narration.py build <film> --require-alignment` (NumPy, ffmpeg and PocketSphinx). If the aligner misses a word, fix the pronunciation, transcript or clip. Strict mode stops before replacing the track/clock; don't shift the entire caption track to hide one bad clip. `--lead` changes **cuts**, not word onsets.
2. New builds record `wordTiming` and each clip's method. A legacy `estimated: false` can still contain a guessed clip. New starters use `captions: { words: timing.words, y: 0.72, motion: "on-beat" }`: one outlined word, nearest onset frame, a short scale/lift accent, then release for silence. Competing onsets each get a frame; no words are dropped. Don't key captions off scene time, CSS or a fresh transcription of the mix. Rebuild the mix after any voice/timing change.
3. New narrated films start with `post: { shaders: true }`. The outdoor sky comes from the look; the post chain adds bloom → output transform → shafts/grade. `post.bloom` alone controls glow props, **not** this chain. Keep the ink around letters legible, the lead's colour distinct, and light sources brighter than ordinary surfaces. Start by adjusting the set, key and practicals; don't turn an approved old film into a shader test.

## Rehearse cheaply; review the actual delivery

```sh
npm run typecheck && npm run check       # all sources, script contracts and sound locks
npm run rehearse -- <film>               # real camera data and stage JSX, no browser or render
npm run rehearse -- <film> --final       # also reject unfinished voice, cut, mix or new-look setup
```

`ERROR` is a broken clock/contract. `DRAFT` means a work print can be rehearsed, not signed off. `LOOK` names a cue and frame to inspect. Five samples of unchanged props might drive a child rig with its own clock. Changing props might all be off screen. Neither is a retention score. The render workflows use `--pre-render`: unfinished cuts fail. An otherwise complete legacy recording with mixed clip timings gets a `LOOK` rather than a forced remix; remastered starters/new timing files do not get this exception. An explicit `--final` is strict on any narrated film. An untouched archive keeps its caption style. If you rebuild its clock with this pipeline, the new cut must also use `on-beat` captions and the shader chain for delivery. After changing the framework, run `npm run test:direction`; it also scaffolds the narrated topic starters in a temporary directory.

**With render permission** (never burn the owner's laptop): use `npm run shots -- <film> --only 1. --at 0.1,0.5,0.9`, or `--frames 42,43,47` for exact film frames. Inspect at phone size: frame 0/15, neighbouring cuts, and 3–5 frames **inside** each important action. Can you point to the approaching hand, the instant of change, the feet on the ground and the reaction? Does a wall hide the face or sever a carried item? Fix the mark or lens, then recheck the same frames.

Finally play the **rendered MP4** at speed, first muted, then with sound. Check consonant/word onsets in the opening, a fast line, a clip join and the last beat. Listen for buried speech, wrong effects and audio offsets. Record the reference, cue/frame, fault, fix and what you actually watched/heard in the film's review. If playback or listening wasn't possible, say so; a hash, timing report or contact sheet isn't a listen. The owner's approval and actual audience analytics are separate from all these checks.

# Framework review · 18 November 2026

[Phone-frame study](starter.jpg) · [How to direct the next short](../../docs/DIRECTING.md)

**Picture.** The first tile is from the approved *Same Face* MP4 at 1.0 s. The second is the previous starter's staging at frame 15 (not an old delivered movie). The remaining tiles are actual Remotion/Three frames from an isolated generated town starter at 432 × 768, 30 fps, in software WebGL. No generated illustration stands in for a frame.

- The first reverse lost the bent flower at the left edge and cut the boy's face on the right. The wider three-quarter reverse keeps both. The blue shirt and bare arm separate the gesture from the wooden set.
- At frames 43 and 47 the **same** word, FLINCHED, goes from its entry accent to its resting size as the stem recoils. The pot stays planted. The starter has estimated timing, not a recorded performance.
- The high tracking shot gives the feet room **above** the captions. The walk uses the checked route around the table and grounds the lower shin/shoe, rather than moving a posed figure across the frame.
- A shader-off control at frame 43 still rendered a scene. With the composer enabled the output changed, the torch bloomed and the caption outline remained readable. This is not a benchmark or a claim about every night scene.

**Clock.** In a temporary film, the real aligner and encoder processed copies of the first two *Same Face* clips (108 words). An unknown word in the **second** test clip caused `--require-alignment` to fail; both previously built files retained their SHA-256 hashes. The ordinary build on that same input reported `wordTiming: partial` and the two clip methods `aligned`, `estimated`. No production voice or sound lock was rebuilt.

**Compatibility.** All five narrated topic IDs were scaffolded and the generated TSX typechecked, including the shared Stories/Deadpan starter. On the 40 film sources in this checkout, the workflow preflight passed 37. It refused two estimated clocks (the shadow and smell-a-lie films) and exposed a skipped cue run before `9.like` in the unregistered talk-count film. An explicit `--final` audit passed 33: four more legacy films have a guessed clip despite `estimated: false`. Those four can reproduce their existing cut without silently being called newly aligned. The approved family-photo hold is a review note, not a reason to change the shot.

**Limit.** No full short was rendered or listened to for this framework change. These are staging, alignment and compatibility checks, not evidence of a new retention rate. Judge the next finished short on actual playback, with and without sound.

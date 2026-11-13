# Reference: "In This Town, Everyone Got a Superpower at 18, Part 2"

**The second film the owner approved, and the one he rated highest.** His words: "a banger and a massive upgrade! i
totally felt like i was watching peak!" He asked for it to be kept here, source and mp4, so the next agent can follow
it. Read [`../superpower-at-18/`](../superpower-at-18/README.md) first for the story rules; this page is about
**motion and pace**, which is what part two had to learn.

| File | What it is |
|---|---|
| `in-this-town-superpower-at-18-part-2.mp4` | The film as delivered: 1080×1920, 2:49, long cut, 83 shots |
| `contact-sheet-every-2-seconds.jpg` | One frame every two seconds, all 84, on one sheet |
| `action-28s-to-40s-five-frames-a-second.jpg` | Twelve seconds of the roots sequence at five frames a second: what "showing the process" looks like |
| `source/` | A **snapshot** of the source on the day it was approved: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene18.tsx`, `film.tsx`, `sound.json`, `sound.lock.json` |

The film that renders lives in `src/videos/in-this-town-superpower-at-18-part-2/`. `source/` is a copy to read; it is
not compiled and nothing imports it. `source/kit.tsx` re-exports part one's kit, so read it beside
`../superpower-at-18/source/kit.tsx`. The music is the owner's own track, `Topics/InThisTown/InThisTownMusic.aac`,
played through `"track"` in `source/sound.json` (see `../../SOUND.md`).

## The first render was rejected. This is why

The first render passed typecheck, `npm run check` and two rounds of stills, and the owner stopped watching at 54
seconds. His notes, nearly word for word:

- "It lacks motion. It feels like point A to point B without showing the process; it just teleports to B."
- "Not fast paced enough. Part 2 is where he acts FAST." He expected viewers to leave at ten seconds.
- "The narrator says he put both arms into the mud, but the video does not show it."
- "The roots must be fast, because Tip is falling."
- "When the tree grows, he should bounce a bit; the growth must feel fast."
- Tip ran straight through the well.
- A joke used twice ("that way is still north") is old the second time. It was cut and the clip re-recorded.

**Stills cannot see any of this.** A still shows one frame; every one of those faults is between frames.

## What fixed it

1. **Show the in-between.** Every action is wind-up, act, result, inside the shot. He looks up, lunges, throws both
   arms over his head, and drives them down on the word "arms" (`3.fast` in `source/scene3.tsx`, `Plunger` in
   `source/kit.tsx`). The brother draws his finger back before the flick (`2.fling`). Nothing is simply somewhere new
   after a cut.
2. **If the narrator says it, the frame shows it, on the word.** Time the act with `wordAt(cue, word)`, not with a
   fraction of the shot.
3. **Speed is acceleration plus something to measure it against.** The roots start slow and leave (`k` goes with
   `p * p`), smash through the pen fence, and the chase camera runs flat out just behind their front with the well
   and the houses going past (`3.roots`, `3.chase`). `Streaks` (speed lines) and repeating `Bits` of dirt at the
   front do the rest.
4. **Fast things overshoot and bounce.** The oak is fully grown in 0.22 s, then wobbles; he is thrown above it, comes
   down and bounces twice (`5.tree`, helper `tossed`). The leaf sags, throws Tip up, and catches him again
   (`3.catch`). The crash landing is a hit, a bounce and a skid (`7.fell`).
5. **The camera takes the hit.** `impacts: [{ at, amp, dur }]` on every blow, timed to the same word as the act;
   `shake` 0.015–0.035 on chases; `handheld` on quiet close-ups so nothing is ever dead still.
6. **Walk the path on the map before you stage it.** Tip's run was moved to the south edge of the square, clear of
   the well at `PLACE.well`. Check every route against prop positions.
7. **Review action at several frames a shot.** Ask the stills workflow for three to five frames across each action
   shot (wind-up, act, result), not one. That is how the missing Tip after the flick and the hero sliding out of
   frame were found.
8. **The recap earns the first ten seconds.** Six shots in fifteen seconds, each with one hit: the bell, the daisy,
   the stolen lights, the house going up, the grass, "I know how to beat you".

## Traps met on the way

- A green point light half a metre from a face turns the skin white. `Garden` takes `light` so close-ups can turn
  it down (`4.big`, `4.along`).
- Two people side by side need the camera 4.5 m back or more at fov 42, or both are cut by the frame edges.
- A wing seen from behind hides the person wearing it: put the camera in front (`6.wing`).
- After a sound sheet or script change, run `sound.py build` again; effects are named by cue and word, so they move
  with the narration.
- Nobody has listened to the mix with ears or watched the film in motion on the agent side: the owner did both.

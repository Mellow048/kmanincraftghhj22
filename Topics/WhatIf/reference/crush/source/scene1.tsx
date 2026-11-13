import { cam, storyScene } from "../../engine";
import { Heart, Hero, Jo, NORTH, SOUTH, faceOf, hall, mix, ramp, timing, wordAt } from "./kit";

const SEE = wordAt("1.what", "see");
const YOU = wordAt("1.what", "you", 1);

/** Jo's locker, and where he stands looking at her. The film ends on this spot too (scene14). */
export const HER_LOCKER = hall(1.5, 0, -0.9);
export const HIS_SPOT = hall(1.9, 0, 1.0);

/**
 * HOOK. The question is the title, said over ONE picture of the power at work. Then the teller.
 *
 * One scene file per BEAT of the script (Topics/WhatIf/SCRIPT.md); one shot per LINE of narration.md.
 * Every shot needs: a `cue` (the id of its line), a camera that MOVES (a `cam.*` recipe), a `zone`,
 * a `note` that says why this picture for these words, and a `stage`.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.what",
      ...cam.push({ on: hall(1.5, 1.43, -0.9), dist: 4.0, to: 3.15, yaw: 5, pitch: 3, fov: 40 }),
      zone: "hall",
      note: "The question is asked of YOU, so the lens is you: a girl at her locker looks straight at it, and on 'see' a pink heart pops over her head. The lens walks up to her and the heart grows: the rule of the power, before a word of it. It is Jo, and it is the answer to the film, in its first second. Nobody is told.",
      stage: (t, { p }) => (
        <>
          <Jo position={HER_LOCKER} rotationY={SOUTH + 0.1} animation={t > YOU - 0.2 ? "wave" : "idle"} face={t > SEE + 0.15 ? "grin" : "smile"} gaze={0} />
          <Heart over={HER_LOCKER} size={mix([0.46, 0, 0], [0.72, 0, 0], ramp(p, 0.1, 1))[0]} t={t - SEE} yaw={5} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: faceOf(HIS_SPOT), dist: 1.95, to: 1.55, yaw: 176, pitch: 2, fov: 36 }),
      zone: "hall",
      note: "The reverse: the one she was waving at, and the only one who can see it. A new face on the cut: his eyes go up to where the heart is, and he grins.",
      stage: (t) => <Hero position={HIS_SPOT} rotationY={NORTH} animation="idle" face={t > 0.55 ? "grin" : "wow"} headPitch={-0.16} gaze={0} />,
    },
  ],
});

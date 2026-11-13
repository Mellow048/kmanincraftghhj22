import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { HAT_BACK, Hero, ROBE, Walker, ease, faceOf, ramp, timing, wordAt } from "./kit";

const HOW = wordAt("6.plant", "how");
const LOOK = wordAt("6.decide", "look");

/** He stands at the top of the square. Over his shoulder is the lane, and at the end of the lane, the wheat. */
const ME: Vec3 = [-0.37, 0, -2.6];

/** THE DECISION. He laughs at the rule, and behind him the thing the rule is for stands a little nearer. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The decision",
  shots: [
    {
      cue: "6.plant",
      ...cam.push({ on: [-0.5, 1.0, -2.6], dist: 2.6, to: 2.15, yaw: -2, pitch: -6, fov: 42 }),
      zone: "village",
      note: "'How could a moon catch anybody?': him, to us, shrugging at the whole idea. Over his shoulder, up the lane, the wheat: and one scarecrow by the track that was not that near the last time we looked.",
      stage: (t) => (
        <>
          <Hero position={ME} animation="idle" blendTo="shrug" blend={1 - ease(ramp(t, HOW - 0.15, HOW + 0.15))} face={t < HOW ? "smile" : "grin"} gaze={0} />
          <Walker from={[1.9, 0, -9.5]} to={[2.1, 0, -3]} t={t + 0.4} speed={0.8} robe={ROBE.white} phase={1.9} />
        </>
      ),
    },
    {
      cue: "6.decide",
      ...cam.push({ on: faceOf(ME), dist: 1.8, to: 1.45, yaw: 6, pitch: -10, fov: 38 }),
      zone: "village",
      note: "'So I decided to look': his face, close, from below. The grin goes and something braver comes. On 'look' his hand finds the brim of his hat.",
      stage: (t) => {
        const k = ease(ramp(t, LOOK - 0.3, LOOK + 0.05));
        return <Hero position={ME} animation="idle" blendTo="reachUp" blend={1 - k} face="brave" gaze={0} hatTilt={HAT_BACK - 0.08 * k} />;
      },
    },
  ],
});

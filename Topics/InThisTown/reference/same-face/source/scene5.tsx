import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, DEG, Hero, NORTH, ROBE, SOUTH, Villager, ease, pop, ramp, timing, wordAt } from "./kit";

/** She stands at the front of her porch, half a block up. He stands on the path below; for the hands, on her step. */
const ELDER: Vec3 = [-10, 0.5, -3.8];
const ME: Vec3 = [-10, 0, -2.72];
const ON_STEP: Vec3 = [-10, 0.24, -3.05];
const HER_FACE: Vec3 = [-10, 2.03, -3.75];
const HMM = wordAt("5.hmm", "hmm");

/** THE RULE. The one who found him looks at his hands, and all she will say is: not that hill. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The oldest villager",
  shots: [
    {
      cue: "5.ask",
      ...cam.push({ on: [-10, 1.3, -3.26], dist: 3.7, to: 3.2, yaw: 35, pitch: -3, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Past his shoulder: the oldest villager up on her porch, looking down her nose at him, and him below, asking with both arms. A diagonal that fills a tall frame.",
      stage: () => (
        <>
          <Villager position={ELDER} rotationY={SOUTH} robe={ROBE.elder} lookAt={[ME[0], 1.2, ME[2]]} phase={2.2} />
          <Hero position={ME} rotationY={NORTH} animation="talk" face="smile" lookAt={HER_FACE} />
        </>
      ),
    },
    {
      cue: "5.stare",
      ...cam.push({ on: [-10, 1.98, -3.8], dist: 3.6, to: 3.1, yaw: 4, pitch: -6, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "'She looked at my hands for a long time': from behind his head, a long lens. His two hands held up, one on each side of the frame, and her face between them, going slowly from one hand to the other.",
      stage: (t, { p }) => (
        <>
          <Villager position={ELDER} rotationY={SOUTH} robe={ROBE.elder} lookAt={[-10 + 0.34 * (ease(ramp(p, 0.2, 0.75)) * 2 - 1), 1.45, ON_STEP[2]]} phase={2.2} />
          <Hero position={ON_STEP} rotationY={NORTH} animation="lift" face="smile" />
        </>
      ),
    },
    {
      cue: "5.hmm",
      ...cam.orbit({ on: [-10, 2.08, -3.8], dist: 3.9, distTo: 3.5, yaw: -24, yawTo: 8, pitch: -3, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "A 'hmm' he has never heard: the bubble is dark and it shakes. Then her head comes up and turns east, to the hill, before she has said what it means.",
      stage: (t) => (
        <>
          <Villager
            position={ELDER}
            rotationY={SOUTH}
            robe={ROBE.elder}
            hmm={ramp(t, HMM - 0.05, HMM + 0.1) * (1 - ramp(t, HMM + 0.6, HMM + 0.9)) * 0.6}
            nod={0.42 * (1 - ramp(t, HMM + 0.5, HMM + 1.1))}
            turn={0.95 * ramp(t, HMM + 0.7, HMM + 1.5)}
            phase={2.2}
          />
          <Bubble text="HMM" position={[-9.9, 2.84, -3.75]} rotationY={-8 * DEG} scale={pop(t, HMM)} dark tilt={Math.sin(t * 31) * 0.05} tail={-1} />
        </>
      ),
    },
    {
      cue: "5.rule",
      ...cam.push({ on: [42.5, 7.2, -4], dist: 18.5, to: 14.5, yaw: -62, pitch: -19, fov: 52 }),
      zone: "village",
      look: "overworld-day",
      note: "'Never climb that hill': the hill from its foot, pushed in on from below so it stands over us, step on step. The rule, as a wall.",
      stage: () => null,
    },
  ],
});

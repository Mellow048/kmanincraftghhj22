import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, ramp, ease } from "./kit";

const ELDER: Vec3 = [-10, 0.5, -3.8];
const ME: Vec3 = [-10, 0, -2.72];
const ON_STEP: Vec3 = [-10, 0.24, -3.05];
const HMMM = wordAt("5.hmm", "fear");

/** WITCH'S WARNING — fear keeps you alive. The rule with no explanation until it's too late. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The witch's warning",
  shots: [
    {
      cue: "5.ask",
      ...cam.push({ on: [-10, 1.3, -3.26], dist: 3.7, to: 3.2, yaw: 35, pitch: -3, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Past his shoulder: witch up on porch looking down, him below asking with both hands up.",
      stage: () => (
        <>
          <Villager position={ELDER} rotationY={0} robe={ROBE.elder} lookAt={[ME[0], 1.2, ME[2]]} phase={2.2} />
          <Hero position={ME} rotationY={Math.PI} animation="talk" face="grin" lookAt={[-10, 2.0, -3.8]} />
        </>
      ),
    },
    {
      cue: "5.look",
      ...cam.push({ on: [-10, 2.0, -3.8], dist: 3.4, to: 3.0, yaw: 6, pitch: -6, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "'She looked at my hands for a long time': from behind his head, his hands out either side of frame, her face slowly panning between them.",
      stage: (t, { p }) => (
        <>
          <Villager position={ELDER} rotationY={0} robe={ROBE.elder} lookAt={[-10 + 0.34 * (ease(ramp(p, 0.2, 0.75)) * 2 - 1), 1.15, ON_STEP[2]]} phase={2.2} />
          <Hero position={ON_STEP} rotationY={Math.PI} animation="lift" face="uneasy" />
        </>
      ),
    },
    {
      cue: "5.hmm",
      ...cam.push({ on: [-10, 1.95, -3.4], dist: 2.0, to: 1.65, yaw: -12, pitch: 2, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'Fear keeps you alive': close on witch, mouth barely moving, eyes steady — the one line she will give him.",
      stage: (t) => (
        <>
          <Villager position={ELDER} rotationY={0} robe={ROBE.elder} phase={2.2} nod={0.08 * Math.sin(t * 1.2)} />
        </>
      ),
    },
    {
      cue: "5.rule",
      ...cam.push({ on: faceOf([-10, 0.5, -3.8]), dist: 1.9, to: 1.5, yaw: -8, pitch: -2, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "Translation shot: his face as he hears what she means — 'don't sell the one that keeps you alive' — and misunderstands it.",
      stage: () => <Hero position={[-9.9, 0, -2.0]} rotationY={0.6} animation="idle" face="frown" gaze={0} headPitch={0.18} />,
    },
  ],
});

import { faceOf } from "./kit";

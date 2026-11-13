import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Brother, DAY, Dad, Hero, NORTH, PLACE, SOUTH, ZONE, timing, villagerFace, waddle, stride } from "./kit";

const G = PLACE.gate;
const AT_GATE: Vec3 = [G[0] - 0.3, 0, G[2] + 0.9];

/** THE FATHER TAKES HIM AWAY. "I will be back soon." */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "I will be back soon",
  shots: [
    {
      cue: "4.father",
      ...cam.push({ on: [4.9, 0.95, -4.4], dist: 4.2, to: 3.5, yaw: 172, pitch: 4, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "Morning. His father, in the brown robe, walks towards us up the road with the boy in black close at his side, scowling at the ground. Far behind them, small, the boy in red watches.",
      stage: (t, { p }) => (
        <>
          <Dad {...waddle([4.5, 0, -1.6], [4.5, 0, -3.4], p)} />
          <Brother kid {...stride([5.3, 0, -1.7], [5.3, 0, -3.5], p)} animation="walk" face="angry" headPitch={0.3} />
          <Hero kid position={[5.6, 0, 1.6]} rotationY={NORTH} animation="idle" face="worried" />
        </>
      ),
    },
    {
      cue: "4.village",
      from: [5, 1.7, -11],
      to: [5, 2.3, -14],
      target: [5, 5, -45],
      fov: 44,
      ease: "inOutSine",
      zone: ZONE.day,
      look: DAY,
      note: "What he is pointing at: the road running north out of the gate, and the green hills it goes over. Somewhere behind them is a village that can teach a boy to be kind.",
      stage: () => null,
    },
    {
      cue: "4.soon",
      ...cam.push({ on: villagerFace(AT_GATE), dist: 2.4, to: 1.8, yaw: 8, pitch: -2, fov: 36 }),
      zone: ZONE.day,
      look: DAY,
      note: "His father under the gate, turned back to us to say it. The boy in black stands beside him, already looking the other way.",
      stage: () => (
        <>
          <Dad position={AT_GATE} rotationY={SOUTH} hmm={1} nod={0.12} />
          <Brother kid position={[AT_GATE[0] + 0.85, 0, AT_GATE[2] - 0.2]} rotationY={NORTH} animation="idle" />
        </>
      ),
    },
    {
      cue: "4.road",
      ...cam.push({ on: [5, 1.3, -14], dist: 8.6, to: 8.0, yaw: 3, pitch: 5, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "From behind the boy in red at the gate: two figures going away up the long road, getting smaller, until the black shirt is a dot.",
      stage: (t, { p }) => (
        <>
          <Hero kid position={[5.2, 0, -6.6]} rotationY={NORTH} animation="idle" />
          <Dad {...waddle([4.6, 0, -20], [4.6, 0, -27], p)} />
          <Brother kid {...stride([5.4, 0, -20.2], [5.4, 0, -27.2], p)} animation="walk" />
        </>
      ),
    },
  ],
});

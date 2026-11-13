import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, EAST, Hero, IronGolem, KID, NORTH, PLACE, Poppy, ROBE, SOUTH, Villager, WEST, climb, pop, ramp, stepAt, timing, wordAt } from "./kit";

const HMM = wordAt("7.laugh", "hmm");
const POST = PLACE.post;
/** Where the golem stands to hand over the flower, and where he stands to take it. */
const GIVER: Vec3 = [1.5, 0, 0.7];
const TAKER: Vec3 = [2.45, 0, 2.5];

/** The ring of neighbours round him: [x, z, robe, phase]. Tall, not wide: it is seen from above. */
const RING: Array<[number, number, string, number]> = [
  [-0.82, 3.5, ROBE.brown, 0.3],
  [0.82, 3.5, ROBE.white, 1.9],
  [-0.95, 1.95, ROBE.blue, 3.4],
  [0.95, 1.95, ROBE.farmer, 2.7],
  [-0.55, 0.5, ROBE.red, 0.9],
  [0.55, 0.5, ROBE.elder, 2.2],
];
const CENTRE: Vec3 = [0, 0, 2.1];

/** ATTEMPT ONE. He just walks up it. The golem carries him home under one arm, and the town has its one word ready. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "He walks up the hill",
  shots: [
    {
      cue: "7.walk",
      ...cam.push({ on: [35.9, 3.9, 0], dist: 6.6, to: 5.5, yaw: -90, pitch: -15, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'I just walked up the hill': from the valley floor, behind him. He hops up it one block at a time, small against the whole green slope.",
      stage: (t, { p }) => <Hero position={climb(0, 4, p)} rotationY={EAST} animation="run" animDistance={p * 5} face="grin" />,
    },
    {
      cue: "7.half",
      ...cam.push({ on: [39.3, 6.9, 0.25], dist: 5.9, to: 5.3, yaw: 90, pitch: 47, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'I got halfway': from above, his grin coming up the slope at us, and right behind him the iron golem, with both arms already out.",
      stage: (t, { p }) => (
        <>
          <Hero position={climb(5, 1, p * 0.5)} rotationY={EAST} animation="run" animDistance={p * 2} face="grin" gaze={0} />
          <IronGolem position={stepAt(4, 0.55)} rotationY={EAST} armR={-1.25 - p * 0.2} armL={-1.25 - p * 0.2} headPitch={-0.3} />
        </>
      ),
    },
    {
      cue: "7.golem",
      ...cam.truck({ on: [22, 1.45, 2.3], dist: 4.5, yaw: 8, pitch: 3, by: [-3.4, 0, 0], fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'Tucked me under its arm, carried me home': side on, travelling with them. He is a plank under one iron arm, legs still going. The neighbours watch him pass.",
      stage: (t, { p }) => {
        const x = 22 - 3.4 * p;
        return (
          <>
            <IronGolem position={[x, 0, 2]} rotationY={WEST} walk={3.4 * p} armR={-0.42} />
            {/* Horizontal, head first, face to the lens. */}
            <group position={[x + 0.74 * KID + 0.1, 1.3, 2.86]} rotation={[0, 0, Math.PI / 2]}>
              <Hero animation="run" face="frown" gaze={0} />
            </group>
            <Villager position={[19.8, 0, 0.2]} rotationY={SOUTH} robe={ROBE.white} lookAt={[x, 1.4, 2.6]} phase={1.9} />
            <Villager position={[17.4, 0, 0.5]} rotationY={SOUTH} robe={ROBE.brown} lookAt={[x, 1.4, 2.6]} phase={0.3} />
            <Villager position={[22.6, 0, 0.1]} rotationY={SOUTH} robe={ROBE.blue} lookAt={[x, 1.4, 2.6]} phase={3.4} />
          </>
        );
      },
    },
    {
      cue: "7.flower",
      ...cam.push({ on: [2.4, 1.08, 2.3], dist: 2.7, to: 2.3, yaw: 128, pitch: 10, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'And gave me a flower': over the iron arm, the poppy held out to him, and his face, which is not grateful.",
      stage: () => (
        <>
          <IronGolem position={GIVER} rotationY={SOUTH} bow={0.42} armR={-0.92} headPitch={0.35} flower />
          <Hero position={TAKER} rotationY={NORTH} animation="idle" face="frown" headPitch={0.1} gaze={0} />
        </>
      ),
    },
    {
      cue: "7.laugh",
      ...cam.push({ on: [0, 1.25, 2.0], dist: 6.2, to: 7.2, yaw: 0, pitch: 40, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'The whole town said hmm at me for a week': from above, him in the middle holding the flower, and a ring of neighbours whose HMMs go off one after another.",
      stage: (t) => (
        <>
          <Hero position={CENTRE} animation="idle" face="frown" gaze={0}>
            <Poppy position={[0, -0.04, 0.09]} />
          </Hero>
          {RING.map(([x, z, robe, phase], i) => {
            const at = HMM - 0.35 + i * 0.16;
            return (
              <group key={i}>
                <Villager position={[x, 0, z]} robe={robe} lookAt={[CENTRE[0], 1.2, CENTRE[2]]} hmm={ramp(t, at - 0.05, at + 0.1)} phase={phase} />
                <Bubble text="HMM" position={[x * 0.78, 2.42, z + 0.1]} scale={pop(t, at) * 0.9} tail={x < 0 ? -1 : 1} />
              </group>
            );
          })}
          <IronGolem position={POST} rotationY={WEST} headYaw={0.3} />
        </>
      ),
    },
  ],
});

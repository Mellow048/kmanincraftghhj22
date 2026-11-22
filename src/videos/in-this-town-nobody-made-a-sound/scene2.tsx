import { Block, cam, storyScene } from "../../engine";
import { EAST, Hero, NORTH, PLACE, SOUTH, Town, WEST, ease, ramp, timing, wordAt } from "./kit";
import { WOOL } from "./marks";

const ON_SIGN = wordAt("2.signs", "signs");
const ASLEEP = wordAt("2.noon", "noon");

/** A teacher at the boards: no voice, just a stick on a sign while six kids sit on the wool. */
const Lesson = ({ t }: { t: number }) => (
  <>
    <Town position={[-10.4, WOOL, -1.0]} rotationY={NORTH} lean={-0.06} />
    <Block position={[-10.4, WOOL + 1.34, -0.55]} size={[0.06, 0.9, 0.06]} rotation={[0, 0, -0.5 + 0.06 * Math.sin(t * 2.2)]} color="#c9a468" />
    {[
      [-12.6, 1.9],
      [-11.4, 2.2],
      [-9.9, 1.8],
      [-8.6, 2.3],
      [-7.4, 1.9],
    ].map(([x, z], i) => (
      <Town key={i} position={[x, WOOL, z]} rotationY={NORTH + 0.12} kid nod={0.06 + 0.02 * Math.sin(t * 1.4 + i)} />
    ))}
  </>
);

/** The town going to bed at noon: wool pulled up over everybody, in a row. */
const Noon = ({ t }: { t: number }) => (
  <>
    {[
      [-7.4, 5.4],
      [-3.9, 5.9],
      [-0.2, 5.2],
      [3.4, 6.1],
      [7.1, 5.5],
    ].map(([x, z], i) => (
      <Block key={i} position={[x, WOOL + 0.36 + 0.02 * Math.sin(t * 1.1 + i), z]} size={[2.0, 0.16, 0.66]} color="#f4edda" roughness={1} />
    ))}
    <Town position={[5.4, WOOL, 4.4]} rotationY={SOUTH + 0.3} lean={ease(ramp(t, ASLEEP - 0.3, ASLEEP + 0.6)) * 0.4} strain={0.4} />
  </>
);

/**
 * THE TOWN'S MACHINERY. Wool on every floor, a school that is only signs, and a whole town asleep in the middle
 * of the day. Three pictures build the rule before anybody explains it.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Wool, signs, noon",
  shots: [
    {
      cue: "2.wool",
      ...cam.push({ on: [0.6, 0.42, 2.4], dist: 3.1, to: 2.2, yaw: 8, pitch: 21, fov: 44 }),
      zone: "street",
      look: "overworld-day",
      note: "The wool, close and low, with his feet walking over it: the floor of the town is the thing keeping it quiet. The lens settles onto the pile.",
      stage: (t) => (
        <>
          <Hero
            position={[0.2 + t * 0.5, WOOL, 2.6]}
            rotationY={EAST}
            animation="walk"
            animDistance={t * 0.5}
            plantFeet
            time={t}
            face="uneasy"
            headPitch={0.16}
          />
          <Block position={[-1.6, WOOL + 0.05, 1.9]} size={[1.5, 0.1, 1.2]} color="#e2d8c0" roughness={1} />
        </>
      ),
    },
    {
      cue: "2.steps",
      ...cam.truck({ on: [0, 1.05, 2.6], by: [3.6, 0, 0], dist: 3.4, yaw: -64, pitch: 3, fov: 40 }),
      zone: "street",
      look: "overworld-day",
      note: "A villager walks the length of the street and the lens goes with him, at the level of his knees: the wool eats every step.",
      stage: (t) => (
        <Town position={[-2.4 + t * 1.5, WOOL, 2.5]} rotationY={EAST} walk={t * 1.5} nod={0.04} />
      ),
    },
    {
      cue: "2.signs",
      ...cam.pan({ from: [-14.6, 1.5, 1.2], on: [-11, 1.2, -2.4], onTo: [-8.4, 1.2, -2.4], fov: 42 }),
      zone: "street",
      look: "overworld-day",
      note: "The school is five boards and a teacher with a stick: 'quiet', 'shh', 'no noise', 'sit still', 'listen'. The lens slides along the lesson, left to right.",
      stage: (t) => <Lesson t={t} />,
    },
    {
      cue: "2.noon",
      ...cam.orbit({ on: [0, 1.1, 5.6], dist: 7.4, distTo: 6.2, yaw: 18, yawTo: 32, pitch: 17, fov: 46 }),
      zone: "street",
      look: "overworld-day",
      note: "Noon: the street's beds are rows of wool with people under them, and the one villager still up is pulling his blanket over his nose.",
      stage: (t) => <Noon t={t} />,
    },
  ],
});

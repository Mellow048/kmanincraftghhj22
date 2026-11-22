import { Block, cam, storyScene } from "../../engine";
import { EAST, Granny, Hero, HungBell, NORTH, PLACE, Rope, SOUTH, Town, WEST, ease, ramp, timing, villagerFace, wordAt } from "./kit";
import { WOOL } from "./marks";

const HER = PLACE.grannyAt;
const BELL = PLACE.bellAt;
const UP = wordAt("3.blanket", "tower");
const LIPS = wordAt("3.why", "lips");

/** The bell, under a black blanket, on its beam. */
const Covered = () => (
  <>
    <HungBell at={BELL} blanket={1} />
    <Rope at={PLACE.ropeFoot} from={5.86} to={3.4} />
  </>
);

/**
 * THE RULE. Who keeps the bell, what it looks like under its blanket, how it is tied so that nobody can ring it,
 * and the finger on the lips that is the only answer the town gives a child.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "My grandmother kept the bell",
  shots: [
    {
      cue: "3.grand",
      ...cam.push({ on: [PLACE.towerFoot[0], 1.5, PLACE.towerFoot[2]], dist: 4.6, to: 3.5, yaw: 20, pitch: 4, fov: 40 }),
      zone: "street",
      look: "overworld-day",
      note: "She is the only person in the street who ever looks up: her feet in the wool at the tower's step, her whole face turned to the top of the tower. The lens comes in behind her shoulder.",
      stage: (t) => (
        <>
          <Granny position={[PLACE.towerFoot[0] - 0.3, WOOL, PLACE.towerFoot[2]]} rotationY={NORTH - 0.12} nod={-0.36} turn={0.04 * Math.sin(t)} />
          <Hero position={[PLACE.towerFoot[0] + 1.5, WOOL, PLACE.towerFoot[2] + 0.6]} rotationY={NORTH + 0.2} animation="idle" face="uneasy" headPitch={-0.3} />
          <Town position={[PLACE.towerFoot[0] - 3.4, WOOL, PLACE.towerFoot[2] + 1.4]} rotationY={EAST} walk={t * 0.2} nod={0.1} />
        </>
      ),
    },
    {
      cue: "3.blanket",
      ...cam.orbit({ on: [BELL[0], BELL[1] - 0.6, BELL[2]], dist: 5.4, distTo: 4.7, yaw: 22, yawTo: -4, pitch: 2, fov: 38 }),
      zone: "tower",
      look: "overworld-day",
      note: "The bell in the tower, and every square metre of it under a black blanket, with the rope hanging out from underneath like a dropped thread. On 'tower' the lens lifts to the beam.",
      stage: (t) => (
        <>
          <Covered />
          <Block position={[BELL[0] - 1.4, PLACE.towerIn + 1.9, BELL[2] + 1.2]} size={[0.1, 0.1, 0.1]} color="#0f0e13" />
          <Granny position={[BELL[0] + 1.3, PLACE.towerIn, BELL[2] + 1.4]} rotationY={WEST + 0.3} nod={0.05 + 0.02 * Math.sin(t * 1.3)} />
        </>
      ),
    },
    {
      cue: "3.never",
      ...cam.truck({ on: [BELL[0], PLACE.towerIn + 0.9, BELL[2] + 0.1], by: [0, 1.7, 0], dist: 3.0, yaw: 34, pitch: 6, fov: 40 }),
      zone: "tower",
      look: "overworld-day",
      note: "The knot that keeps the rope out of anybody's reach, and the stone tied to its end to hold it down: a rule made with rope. The lens climbs the rope to the covered bell.",
      stage: () => (
        <>
          <Covered />
          <Block position={[BELL[0], PLACE.towerIn + 0.62, BELL[2]]} size={[0.24, 0.3, 0.24]} color="#8a6a3c" />
          <Block position={[BELL[0] + 0.1, PLACE.towerIn + 0.42, BELL[2] + 0.06]} size={[0.34, 0.2, 0.26]} rotation={[0.2, 0.4, 0.3]} color="#7a5c34" />
          <Block position={[BELL[0], PLACE.towerIn + 0.14, BELL[2]]} size={[0.46, 0.28, 0.4]} color="#6f6f72" roughness={1} />
        </>
      ),
    },
    {
      cue: "3.why",
      ...cam.push({ on: villagerFace([HER[0], PLACE.towerIn, HER[2] - 0.3]), dist: 1.55, to: 1.18, yaw: 12, pitch: -1, fov: 33 }),
      zone: "tower",
      look: "overworld-day",
      note: "Her face and nothing else: the answer to 'why is the bell wrapped' is one finger, laid on her lips as the word is said. The lens has to stay close enough to see the finger arrive.",
      stage: (t) => {
        const toLips = ease(ramp(t, LIPS - 0.24, LIPS + 0.1));
        return (
          <>
            <Granny position={[HER[0], PLACE.towerIn, HER[2] - 0.3]} rotationY={SOUTH + 0.16} nod={0.06} turn={-0.06} />
            <Block
              position={[HER[0] + 0.02, PLACE.towerIn + 1.12 + toLips * 0.3, HER[2] - 0.3 + 0.34 - toLips * 0.06]}
              size={[0.06, 0.3, 0.06]}
              rotation={[toLips * 0.5, 0, -0.5 * toLips]}
              color="#d8b28e"
            />
            <HungBell at={BELL} blanket={1} />
          </>
        );
      },
    },
  ],
});

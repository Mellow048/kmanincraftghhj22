import { Block, cam, storyScene } from "../../engine";
import { Granny, Hero, HungBell, NORTH, PLACE, Rope, SOUTH, WEST, ease, ramp, timing, wordAt } from "./kit";
import { TOWER, WOOL } from "./marks";

const FOOT = PLACE.towerFoot;
const HER = PLACE.grannyAt;
const PULLS = wordAt("6.ring", "ringing");
const STEPS = wordAt("6.up", "climbed");

/** The door, lying flat in the wool where it was left. Nobody in this town ever locked anything. */
const FallenDoor = ({ at }: { at: [number, number, number] }) => (
  <group position={at} rotation={[0, 0.24, 0]}>
    <Block position={[0, 0.06, 0]} size={[1.5, 0.12, 0.32]} color="#6b4a2c" />
    <Block position={[0.02, 0.13, 0.02]} size={[1.36, 0.04, 0.24]} color="#8a6136" />
    <Block position={[0.52, 0.13, 0.02]} size={[0.14, 0.05, 0.1]} color="#3a3a40" metalness={0.5} />
  </group>
);

/**
 * THE NIGHT HE FINDS OUT. The tower door is open and the door itself is out in the wool; he climbs; and at the top
 * of his own town's most forbidden place is his grandmother, hauling on the rope of the bell nobody may ring.
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The tower door was open",
  shots: [
    {
      cue: "6.door",
      ...cam.push({ on: [FOOT[0], 2.6, FOOT[2] - 2.4], dist: 8.6, to: 6.4, yaw: -6, pitch: 6, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "Night: the tower's doorway is a black square with the door lying in the wool outside it. One small kid stands on the step, deciding. The lens closes the distance slowly.",
      stage: (t) => (
        <>
          <Hero position={[FOOT[0] + 0.3, WOOL, FOOT[2] + 1.2]} rotationY={NORTH} animation="idle" time={t} face="uneasy" headPitch={-0.24} breath={1.4} />
          <FallenDoor at={[FOOT[0] - 1.5, WOOL, FOOT[2] + 0.9]} />
          <Block position={[FOOT[0] + 0.02, 1.3, TOWER.at[2] + TOWER.w / 2 + 0.02]} size={[TOWER.doorW, TOWER.doorH, 0.4]} color="#050507" />
          <Block position={[FOOT[0] + 1.6, WOOL + 0.42, FOOT[2] + 1.9]} size={[0.2, 0.8, 0.2]} color="#5d4428" />
        </>
      ),
    },
    {
      cue: "6.up",
      ...cam.push({ on: [PLACE.tower[0] - 0.7, 1.9, PLACE.tower[2] + 1.2], dist: 3.4, to: 2.6, yaw: -20, pitch: -22, fov: 44 }),
      zone: "tower",
      look: "overworld-night",
      note: "From the bottom of the tower looking up the stairwell: his feet on the steps and the moon-cut square of the upper floor above him. On 'climbed' he takes the last step.",
      stage: (t) => {
        const step = ease(ramp(t, STEPS - 0.5, STEPS + 0.15));
        return (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <Block key={i} position={[PLACE.tower[0] - 1.5 + i * 0.32, 0.22 + i * 0.62, PLACE.tower[2] - 1.1 + i * 0.1]} size={[1.0, 0.24, 1.4]} color="#8b8b8b" />
            ))}
            <Hero position={[PLACE.tower[0] - 1.15 + step * 0.9, 0.4 + step * 2.6, PLACE.tower[2] - 0.9]} rotationY={SOUTH + 3.0} animation="walk" animSpeed={0.8} time={t} face="uneasy" headPitch={-0.3} />
            <Block position={[PLACE.tower[0], TOWER.floorTop + 0.05, PLACE.tower[2] - 1.2]} size={[1.5, 0.06, 1.2]} color="#0b0b0e" />
          </>
        );
      },
    },
    {
      cue: "6.grand",
      ...cam.push({ on: [HER[0] - 0.1, PLACE.towerIn + 2.5, HER[2] + 0.6], dist: 7.6, to: 6.4, yaw: 5, pitch: 1, fov: 42 }),
      zone: "tower",
      look: "overworld-night",
      note: "She is at the rope with her back half to us, the bell above her, and the moon through the open south side. The lens knows who it is before he does.",
      stage: (t) => (
        <>
          <HungBell at={PLACE.bellAt} swing={0.02 * Math.sin(t * 1.2)} />
          <Rope at={PLACE.ropeFoot} from={5.86} to={3.35} />
          <Granny position={[HER[0] + 0.2, PLACE.towerIn, HER[2] + 0.2]} rotationY={NORTH - 0.4} nod={-0.12} strain={0.2} />
        </>
      ),
    },
    {
      cue: "6.ring",
      ...cam.push({ on: [PLACE.bellAt[0], PLACE.bellAt[1] - 1.0, PLACE.bellAt[2]], dist: 4.2, to: 3.4, yaw: -16, pitch: -4, fov: 38 }),
      zone: "tower",
      look: "overworld-night",
      note: "On 'ringing' the rope comes down and the bare bell swings out over the floor — the blanket is in a heap at her feet. That is the picture that breaks the town's rule.",
      stage: (t) => {
        const pull = ease(ramp(t, PULLS - 0.3, PULLS + 0.12));
        return (
          <>
            <HungBell at={PLACE.bellAt} swing={(0.12 + 0.3 * pull) * Math.sin(t * 9)} />
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35 + pull * 0.5} pull={pull * 0.4} />
            <Granny position={[HER[0] + 0.2, PLACE.towerIn, HER[2] + 0.2]} rotationY={NORTH - 0.4} nod={0.2 * pull} lean={0.16 * pull} strain={0.75} />
            <Block position={[HER[0] + 0.9, PLACE.towerIn + 0.1, HER[2] + 0.5]} size={[0.8, 0.22, 0.7]} rotation={[0, 0.5, 0]} color="#15141a" roughness={1} />
            <Block position={[HER[0] + 1.1, PLACE.towerIn + 0.22, HER[2] + 0.1]} size={[0.4, 0.16, 0.36]} rotation={[0.2, 0.9, 0.1]} color="#0f0e13" roughness={1} />
          </>
        );
      },
    },
  ],
});

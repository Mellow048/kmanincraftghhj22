import { Block, cam, storyScene } from "../../engine";
import { Granny, Hero, HungBell, NORTH, PLACE, Rope, SOUTH, Town, ease, ramp, timing, wordAt } from "./kit";
import { TOWER, WOOL } from "./marks";

const HER = PLACE.grannyAt;
const MINE = wordAt("10.mine", "rope");
const BREATH = wordAt("10.breath", "breath");
const TOWN = wordAt("10.breath", "town");

/** The town asleep in rows, as he sees it from the tower's floor: the thing he is about to speak for. */
const Asleep = ({ t }: { t: number }) => (
  <>
    {[
      [-8.4, 5.4],
      [-5.1, 5.9],
      [-1.3, 5.2],
      [2.4, 6.1],
      [6.2, 5.5],
      [-10.6, 3.4],
      [9.4, 4.2],
    ].map(([x, z], i) => (
      <Block key={i} position={[x, WOOL + 0.35 + 0.02 * Math.sin(t * 1.1 + i), z]} size={[1.9, 0.2, 0.7]} color="#f4edda" roughness={1} />
    ))}
    <Town position={[-3.4, WOOL, 1.2]} rotationY={NORTH + 0.2} nod={0.4} />
    <Town position={[5.6, WOOL, 2.4]} rotationY={NORTH - 0.3} nod={0.4} />
  </>
);

/**
 * THE HANDOVER. Nobody tells him to ring it; she lets him hold the rope, and the whole town under him is asleep.
 * Three shots: the hands, the street watching over, and the wool that is the only thing he can hear.
 */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "She let me hold the rope",
  shots: [
    {
      cue: "10.mine",
      ...cam.push({ on: [PLACE.ropeFoot[0] - 0.4, PLACE.towerIn + 1.05, PLACE.ropeFoot[2] + 0.5], dist: 2.1, to: 1.6, yaw: 18, pitch: 6, fov: 34 }),
      zone: "tower",
      look: "overworld-night",
      note: "The rope between them: on 'rope' her sleeve closes his small hand round it and lets go. The whole film turns on the moment her hands leave it.",
      stage: (t) => {
        const hand = ease(ramp(t, MINE - 0.5, MINE + 0.15));
        return (
          <>
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35} pull={0.06 * hand} />
            <Hero position={[PLACE.ropeFoot[0] + 0.1, PLACE.towerIn, PLACE.ropeFoot[2] + 0.55]} rotationY={NORTH + 0.1} animation="hold" arms="reach" time={t} face="brave" headPitch={-0.02} />
            <Granny position={[HER[0] + 0.65, PLACE.towerIn, HER[2] + 0.45]} rotationY={SOUTH - 1.2} nod={0.1} lean={0.14} strain={0.2 + 0.3 * (1 - hand)} />
            <HungBell at={PLACE.bellAt} swing={0.02 * Math.sin(t * 1.3)} />
          </>
        );
      },
    },
    {
      cue: "10.breath",
      ...cam.push({ on: [0, 2.0, 3.0], dist: 12.0, to: 9.6, yaw: 4, pitch: 12, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "Out over the town as he holds his breath: seven rows of wool with people under them, and on 'town' the lens finds that not one of them moves either.",
      stage: (t) => {
        const all = ease(ramp(t, TOWN - 0.4, TOWN + 0.5));
        return (
          <>
            <Asleep t={t} />
            <Hero position={[PLACE.tower[0] - 0.2, 2.9, PLACE.tower[2] + 2.1]} rotationY={SOUTH} animation="hold" time={t} face="uneasy" headPitch={0.06} breath={1 + all * 2} />
          </>
        );
      },
    },
    {
      cue: "10.wool",
      ...cam.push({ on: [0.2, WOOL, 3.4], dist: 1.15, to: 0.78, yaw: -8, pitch: 19, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "The lens goes into the wool: one tuft in the moonlight, filling the frame. On 'wool' this is the only sound left in the town, and it is not a sound at all.",
      stage: () => (
        <>
          <Block position={[0.2, WOOL + 0.08, 3.4]} size={[0.9, 0.16, 0.7]} rotation={[0, 0.4, 0.03]} color="#e8dfc9" roughness={1} />
          <Block position={[0.55, WOOL + 0.14, 3.15]} size={[0.34, 0.12, 0.3]} rotation={[0.1, 0.9, 0.05]} color="#dcd2ba" roughness={1} />
          <Block position={[-0.2, WOOL + 0.13, 3.6]} size={[0.26, 0.1, 0.24]} rotation={[0, 1.4, -0.04]} color="#f0e8d4" roughness={1} />
        </>
      ),
    },
  ],
});

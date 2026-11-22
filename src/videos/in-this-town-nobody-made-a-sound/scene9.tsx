import { Block, cam, storyScene } from "../../engine";
import { EAST, Hero, HungBell, NORTH, PLACE, Rope, Town, ease, ramp, timing, wordAt } from "./kit";
import { TOWER, WOOL } from "./marks";

const NOTHING = wordAt("9.actually", "nothing");
const GONE = wordAt("9.gone", "gone");
const STILL = wordAt("9.bell2", "still");

/**
 * WHAT QUIET MEANS. He thought it was a shelter. Two shots take that apart — a street with nothing in it, then the
 * beds empty — before the bell tells him what the quiet was really saying.
 */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Quiet sounds like nothing",
  shots: [
    {
      cue: "9.think2",
      ...cam.push({ on: [0, WOOL + 0.5, 4.4], dist: 7.6, to: 6.2, yaw: -6, pitch: 20, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "The safe picture: rows of sleeping shapes under wool, lanterns low, nothing out of place. This is what he is afraid of losing, and the lens lets it look warm.",
      stage: (t) => (
        <>
          {[
            [-7.4, 5.4],
            [-3.9, 5.9],
            [-0.2, 5.2],
            [3.4, 6.1],
            [7.1, 5.5],
          ].map(([x, z], i) => (
            <Block key={i} position={[x, WOOL + 0.36 + 0.02 * Math.sin(t * 1.2 + i), z]} size={[2.0, 0.18, 0.68]} color="#f4edda" roughness={1} />
          ))}
          <Town position={[-8.6, WOOL, 2.2]} rotationY={EAST} walk={t * 0.5} nod={0.2} />
          <Town position={[8.2, WOOL, 3.4]} rotationY={NORTH + 0.4} nod={0.3} />
        </>
      ),
    },
    {
      cue: "9.actually",
      ...cam.truck({ on: [0, 1.15, 2.6], by: [4.4, 0, 0], dist: 6.4, yaw: -24, pitch: 6, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "The same street with every person gone: the beds, the wool, the signs, nobody. On 'nothing' the lens slides down an empty street, which is the whole argument.",
      stage: () => (
        <>
          <Block position={[-1.2, WOOL + 0.04, 3.0]} size={[2.0, 0.06, 0.9]} color="#d8cdb4" roughness={1} />
          <Block position={[3.0, WOOL + 0.05, 4.2]} size={[1.6, 0.08, 0.6]} rotation={[0, 0.4, 0]} color="#d8cdb4" roughness={1} />
          <Block position={[7.6, WOOL + 0.06, 1.6]} size={[0.7, 0.12, 0.5]} rotation={[0.1, 0.9, 0]} color="#e2d8c0" roughness={1} />
        </>
      ),
    },
    {
      cue: "9.gone",
      ...cam.push({ on: [-0.4, WOOL + 0.4, 3.4], dist: 5.2, to: 4.2, yaw: 12, pitch: 26, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "Straight down on the trampled wool where five people were asleep a moment ago: the hollows still in it, nothing in them. 'Nothing sounds like gone' — the beds are graves of people who are fine.",
      stage: (t) => (
        <>
          {[
            [-7.4, 5.4],
            [-3.9, 5.9],
            [-0.2, 5.2],
            [3.4, 6.1],
            [7.1, 5.5],
          ].map(([x, z], i) => (
            <Block key={i} position={[x, WOOL + 0.03, z]} size={[2.1, 0.04, 0.86]} color="#d3c8ae" roughness={1} />
          ))}
          <Hero position={[3.2, WOOL, 2.3]} rotationY={NORTH} animation="idle" time={t} face="fear" headPitch={0.32} breath={1.6} />
        </>
      ),
    },
    {
      cue: "9.bell2",
      ...cam.push({ on: [PLACE.bellAt[0], PLACE.bellAt[1] - 1.1, PLACE.bellAt[2]], dist: 4.0, to: 3.1, yaw: 14, pitch: -6, fov: 38 }),
      zone: "tower",
      look: "overworld-night",
      note: "The bare bell with the moon on one side of it, swinging just enough to catch the light: on 'still' it holds. A bell is a town saying it is still here.",
      stage: (t) => {
        const hush = ease(ramp(t, STILL - 0.5, STILL + 0.4));
        return (
          <>
            <HungBell at={PLACE.bellAt} swing={0.05 * Math.sin(t * 2.2) * (1 - hush * 0.8)} />
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35} pull={0.05 * Math.sin(t * 2.2)} />
            <Block position={[TOWER.at[0] - 1.2, TOWER.floorTop + 0.04, TOWER.at[2] - 1.2]} size={[1.5, 0.06, 1.2]} color="#0b0b0e" />
            <Block position={[TOWER.at[0] - 1.2, TOWER.floorTop - 0.04, TOWER.at[2] - 1.2]} size={[1.4, 0.04, 1.1]} color="#7fe8d2" emissive="#4fd8c0" emissiveIntensity={1.2} opacity={0.5} transparent />
          </>
        );
      },
    },
  ],
});

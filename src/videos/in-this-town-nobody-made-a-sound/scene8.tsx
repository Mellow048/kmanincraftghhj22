import { Block, cam, storyScene } from "../../engine";
import { EAST, Granny, Hero, HungBell, NORTH, PLACE, Rope, SOUTH, Town, ease, ramp, timing, wordAt } from "./kit";
import { TOWER, WOOL } from "./marks";

const HER = PLACE.grannyAt;
const NOT = wordAt("8.wrong", "not");
const HEARS = wordAt("8.only", "hears");

/** The town at night from the tower's open side: wool, lanterns, and not one person awake. */
const TownBelow = ({ t }: { t: number }) => (
  <>
    {[
      [-6.5, 0.5],
      [-2.2, 1.4],
      [3.1, 0.9],
      [7.4, 1.6],
      [-9.5, 2.2],
    ].map(([x, z], i) => (
      <Town key={i} position={[x, WOOL, z]} rotationY={NORTH + 0.3 * Math.sin(t + i)} nod={0.3} />
    ))}
    {[-4.5, 4.2].map((x, i) => (
      <Block key={i} position={[x, WOOL + 0.24, 4.4 - i * 0.4]} size={[2.1, 0.24, 0.9]} color="#f2ebd8" roughness={1} />
    ))}
  </>
);

/**
 * THE TURN. Everything he believed about himself is wrong in one sentence, and the picture has to say it twice:
 * her hand on him (he is not the problem), and the whole quiet town behind her (the quiet was never about him).
 */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "You are not the problem",
  shots: [
    {
      cue: "8.wrong",
      ...cam.push({ on: [HER[0] - 0.5, PLACE.towerIn + 1.3, HER[2] + 0.9], dist: 3.0, to: 2.3, yaw: 16, pitch: 1, fov: 38 }),
      zone: "tower",
      look: "overworld-night",
      note: "The two of them at arm's length: on 'not' she puts a hand out and stops his mouth with nothing but its nearness. He does not duck it.",
      stage: (t) => {
        const quiet = ease(ramp(t, NOT - 0.3, NOT + 0.3));
        return (
          <>
            <Granny position={[HER[0] + 0.2, PLACE.towerIn, HER[2] + 0.2]} rotationY={SOUTH - 0.6} nod={0.06} lean={0.1} strain={0.1} />
            <Hero position={[HER[0] - 1.15, PLACE.towerIn, HER[2] + 1.15]} rotationY={NORTH + 0.55} animation="idle" time={t} face={quiet > 0.5 ? "uneasy" : "fear"} headPitch={0.02} />
            <Block position={[HER[0] - 0.55, PLACE.towerIn + 1.24, HER[2] + 0.72]} size={[0.3, 0.1, 0.1]} color="#a9764f" />
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35} />
            <HungBell at={PLACE.bellAt} swing={0.02 * Math.sin(t)} />
          </>
        );
      },
    },
    {
      cue: "8.only",
      ...cam.push({ on: [HER[0] - 0.6, PLACE.towerIn + 1.16, HER[2] + 0.7], dist: 1.9, to: 1.45, yaw: 24, pitch: 4, fov: 34 }),
      zone: "tower",
      look: "overworld-night",
      note: "Her face, and one finger turned to point at the boy: on 'hears' the finger comes round to him. Not an accusation — the first time anybody has told him he matters.",
      stage: (t) => {
        const point = ease(ramp(t, HEARS - 0.35, HEARS + 0.1));
        return (
          <>
            <Granny position={[HER[0] + 0.2, PLACE.towerIn, HER[2] + 0.2]} rotationY={SOUTH - 0.6} nod={0.04} turn={-0.1} />
            <Block position={[HER[0] - 0.5 + point * 0.12, PLACE.towerIn + 1.22, HER[2] + 0.62 + point * 0.1]} size={[0.32, 0.07, 0.07]} rotation={[0, point * 0.9, 0]} color="#d8b28e" />
            <Hero position={[HER[0] - 1.15, PLACE.towerIn, HER[2] + 1.15]} rotationY={NORTH + 0.55} animation="idle" time={t} face="wow" headPitch={-0.04} />
          </>
        );
      },
    },
    {
      cue: "8.purpose",
      ...cam.push({ on: [PLACE.tower[0] + 0.6, 2.4, PLACE.tower[2] + 6], dist: 9.5, to: 7.4, yaw: 2, pitch: 15, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "From the tower's floor, out over the sleeping town: rows of wool, two lanterns, every roof dark. 'Never quiet because of me' — the quiet was a decision, taken long before he was born.",
      stage: (t) => <TownBelow t={t} />,
    },
    {
      cue: "8.quiet",
      ...cam.push({ on: [-1.4, WOOL + 0.1, 3.2], dist: 2.6, to: 1.9, yaw: -14, pitch: 24, fov: 42 }),
      zone: "street",
      look: "overworld-night",
      note: "The wool in the moonlight, empty, with the print of a body still in it. On 'purpose' the lens stops moving: nothing in this frame is going to make a sound.",
      stage: (t) => (
        <>
          <Block position={[-1.4, WOOL + 0.03, 3.2]} size={[1.9, 0.06, 0.9]} color="#dfd5bd" roughness={1} />
          <Block position={[-2.2, WOOL + 0.06, 3.1]} size={[0.5, 0.1, 0.4]} rotation={[0, 0.3, 0]} color="#d3c8ae" roughness={1} />
          <Town position={[-5.2, WOOL, 1.4]} rotationY={EAST} nod={0.34} lean={0.02 * Math.sin(t)} />
        </>
      ),
    },
  ],
});

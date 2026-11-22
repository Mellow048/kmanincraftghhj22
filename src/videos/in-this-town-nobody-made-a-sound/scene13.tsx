import { Block, cam, storyScene } from "../../engine";
import { EAST, Granny, Hero, HungBell, NORTH, PLACE, Poppy, Rope, SOUTH, Town, WEST, jolt, timing, wordAt } from "./kit";
import { TOWER, WOOL } from "./marks";

const HER = PLACE.grannyAt;
const TURN = wordAt("13.now", "turn");
const DIFFERENT = wordAt("13.diff", "different");
const HICCUP = wordAt("13.hiccup", "hiccup");

/**
 * NOW. The same town, the same wool, the same quiet — and everything about it has changed, because the quiet is
 * now a thing the town does together, with one kid hiccupping in the middle of it.
 */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "A different kind of quiet",
  shots: [
    {
      cue: "13.now",
      ...cam.push({ on: [PLACE.ropeFoot[0] + 0.4, PLACE.towerIn + 1.5, PLACE.ropeFoot[2] + 0.9], dist: 5.6, to: 4.4, yaw: 18, pitch: 2, fov: 42 }),
      zone: "tower",
      look: "overworld-night",
      note: "The two of them at the bell, and on 'turn' the boy takes the rope without being given it. She stands back with her folded arms and lets him.",
      stage: (t) => {
        const pull = t > TURN ? 0.4 + 0.1 * Math.sin(t * -6) : 0;
        return (
          <>
            <HungBell at={PLACE.bellAt} swing={0.34 * Math.abs(Math.sin(t * 3.4))} />
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35 + pull * 0.3} pull={pull * 0.3} />
            <Hero position={[PLACE.ropeFoot[0] + 0.2, PLACE.towerIn, PLACE.ropeFoot[2] + 0.45]} rotationY={NORTH + 0.1} animation="hold" arms={t > TURN ? "reachUp" : "reach"} time={t} face="smile" headPitch={-0.08} />
            <Granny position={[HER[0] + 0.9, PLACE.towerIn, HER[2] + 0.5]} rotationY={SOUTH - 1.0} nod={0.1} />
          </>
        );
      },
    },
    {
      cue: "13.town",
      ...cam.push({ on: [0, 1.6, 3.4], dist: 11.0, to: 8.8, yaw: -6, pitch: 10, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "The street is still quiet and still wool — and every window in it is lit, which in this town means people are up, together, in the dark.",
      stage: (t) => (
        <>
          <Town position={[-6.2, WOOL, 1.8]} rotationY={EAST} walk={t * 0.35} nod={0.08} />
          <Town position={[5.4, WOOL, 2.2]} rotationY={WEST} walk={t * 0.3} nod={0.12} />
          <Block position={[0.4, WOOL + 0.3, 5.6]} size={[2.2, 0.3, 0.9]} color="#f4edda" roughness={1} />
        </>
      ),
    },
    {
      cue: "13.diff",
      ...cam.push({ on: [-0.6, 1.35, 2.0], dist: 3.8, to: 2.9, yaw: 24, pitch: 6, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "Three villagers with their heads together and their arms out of their sleeves — the first time in the film anybody's hands are visible — passing a poppy. On 'different' it goes into the middle one's sleeve.",
      stage: (t) => {
        const pass = Math.max(0, Math.min(1, (t - DIFFERENT) * 1.2));
        return (
          <>
            <Town position={[-1.9, WOOL, 2.4]} rotationY={SOUTH + 0.6} nod={0.06} lean={0.04} arms={{ r: -1.1 }} />
            <Town position={[0.1, WOOL, 2.9]} rotationY={SOUTH + 0.1} nod={0.04} arms={{ l: -1.2, r: -0.6 }} />
            <Town position={[1.9, WOOL, 2.3]} rotationY={SOUTH - 0.5} nod={0.08} arms={{ l: -1.0 }} />
            <Poppy position={[-1.9 + pass * 2.0, WOOL + 1.05, 2.55]} scale={0.9} />
            <Hero position={[0.6, WOOL, 0.4]} rotationY={SOUTH} animation="idle" time={t} face="smile" />
          </>
        );
      },
    },
    {
      cue: "13.hiccup",
      ...cam.push({ on: [0.6, WOOL + 1.05, 2.0], dist: 3.2, to: 2.4, yaw: -16, pitch: 2, fov: 38 }),
      zone: "street",
      look: "overworld-night",
      note: "He hiccups in the middle of the town, and on 'hiccup' the heads come round — and stay soft. Somebody laughs. Nobody minds anymore: that is the ending of the fear.",
      stage: (t) => (
        <>
          <Hero position={[0.6, WOOL + jolt(t, HICCUP, 0.03), 2.0]} rotationY={SOUTH} animation="idle" arms={t > HICCUP ? "reachUp" : "idle"} blendTo="idle" blend={0.3} time={t} face={t > HICCUP + 0.3 ? "laugh" : "uneasy"} />
          <Town position={[-1.5, WOOL, 2.9]} rotationY={SOUTH + 0.4} nod={0.1} turn={t > HICCUP + 0.2 ? -0.2 : 0} />
          <Town position={[2.6, WOOL, 2.6]} rotationY={SOUTH - 0.4} nod={0.08} turn={t > HICCUP + 0.2 ? 0.22 : 0} hmm={t > HICCUP + 0.4 ? 0.6 : 0} />
          <Town position={[4.4, WOOL, 1.2]} rotationY={WEST + 0.3} kid nod={0.1} />
        </>
      ),
    },
  ],
});

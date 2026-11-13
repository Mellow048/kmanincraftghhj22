import { cam, storyScene } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, ramp, ease } from "./kit";

const HILL_AT = wordAt("6.plant", "fear");

/** THE DECISION — what does fear have to do with lemonade? He decides anyway. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The decision",
  shots: [
    {
      cue: "6.plant",
      ...cam.push({ on: [6.4, 0.95, -1.6], dist: 2.1, to: 1.75, yaw: -22, pitch: 18, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'What did fear have to do with lemonade?': his hands holding imagined lemons, face puzzled, stall soft behind him out of focus.",
      stage: (t) => (
        <>
          <Hero position={[6.1, 0, -1.1]} rotationY={-0.3} animation="hold" face="frown" headPitch={0.12} />
          <Villager position={[4.8, 0, -0.6]} robe={ROBE.white} lookAt={[6.1, 1.0, -1.1]} phase={1.9} />
        </>
      ),
    },
    {
      cue: "6.decide",
      ...cam.push({ on: [6.2, 1.25, -0.9], dist: 1.85, to: 1.4, yaw: 48, pitch: -4, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'I decided to sell it anyway': close, made up — jaw set, eyes to shop, the decision as a step.",
      stage: () => <Hero position={[6.1, 0, -1.0]} rotationY={0.7} animation="idle" face="brave" gaze={0} headPitch={-0.1} />,
    },
  ],
});

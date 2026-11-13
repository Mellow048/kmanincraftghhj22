import { cam, storyScene } from "../../engine";
import { Hero, Villager, ROBE, timing } from "./kit";
import type { Vec3 } from "../../engine";

const ME: Vec3 = [0, 0, 2.1];

/** THE ITCH — good life but one dream that freezes him. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The itch",
  shots: [
    {
      cue: "4.good",
      ...cam.push({ on: [0.2, 1.35, 2.0], dist: 3.2, to: 3.8, yaw: -18, pitch: 6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'It was a good life, honestly': pull back to reveal why — warm square, kids, golem with light. He smiles but shoulders tight.",
      stage: () => <Hero position={ME} animation="idle" face="smile" gaze={0} />,
    },
    {
      cue: "4.dream",
      ...cam.push({ on: [6.4, 1.25, -1.8], dist: 2.8, to: 2.2, yaw: 32, pitch: -4, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'I dreamed of a lemonade stand and froze every time someone looked': stall in soft focus behind him, his eyes on it, then a head turns his way and he locks.",
      stage: (t) => (
        <>
          <Hero position={[6.0, 0, -1.0]} rotationY={-0.6} animation="idle" face={t < 0.8 ? "smile" : "fear"} gaze={0} headPitch={t < 0.8 ? -0.05 : 0.18} />
          {/* Onlooker */}
          <Villager position={[5.2, 0, -0.2]} robe={ROBE.blue} lookAt={[6.0, 1.2, -1.0]} phase={1.9} />
        </>
      ),
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Hero, Villager, ROBE, timing } from "./kit";

import type { Vec3 } from "../../engine";
const LENS: Vec3 = [0, 1.7, 5.8];

/** TOWN KNEW — they hoped he'd learn before he needed it. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "They knew",
  shots: [
    {
      cue: "13.known",
      ...cam.push({ on: [0, 1.35, 2.0], dist: 5.2, to: 4.2, yaw: 0, pitch: 6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'My town had always known which feeling to keep': wide of square — neighbours looking at us, witch in doorway, golem behind — they knew.",
      stage: () => (
        <>
          <Villager position={[-2.0, 0, 2.2]} robe={ROBE.brown} lookAt={LENS} phase={0.3} />
          <Villager position={[2.0, 0, 2.2]} robe={ROBE.white} lookAt={LENS} phase={1.9} />
          <Villager position={[-10, 0.5, -3.8]} robe={ROBE.elder} lookAt={LENS} phase={2.2} />
          <Villager position={[0.6, 0, 2.28]} robe={ROBE.friend} scale={0.7} kid lookAt={LENS} phase={1.1} />
          <Villager position={[0.0, 0, 1.0]} robe={ROBE.blue} lookAt={LENS} phase={1.7} />
        </>
      ),
    },
    {
      cue: "13.hoped",
      ...cam.push({ on: [0.2, 1.15, 2.1], dist: 2.2, to: 1.8, yaw: 6, pitch: 4, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'They just hoped I would learn before I needed it': him in row looking down, villagers soft, not judging — hope that ran out.",
      stage: (t) => (
        <>
          <Villager position={[-0.7, 0, 2.1]} robe={ROBE.brown} phase={0.3} />
          <Hero position={[0.2, 0, 2.1]} animation="hug" face="uneasy" headYaw={Math.sin(t * 1.8) * 0.15} />
          <Villager position={[1.0, 0, 2.1]} robe={ROBE.white} phase={1.9} />
        </>
      ),
    },
  ],
});

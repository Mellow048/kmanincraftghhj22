import { cam, storyScene } from "../../engine";
import { CHILD, Hero, ROBE, Villager, chestOf, faceOf, timing, Bottle, Coins } from "./kit";

const ME: Vec3 = [0, 0, 2.3];
import type { Vec3 } from "../../engine";

/** HOOK. The whole town selling a feeling, and the one kid too scared. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 1.38, 2.0], dist: 4.8, to: 3.9, yaw: 0, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The rule as one picture: the teller low centre, behind him the town queued at the witch's shop clutching bottles — red, blue, pale — while he has nothing.",
      stage: () => (
        <>
          <Hero position={ME} animation="idle" face="uneasy" gaze={0} />
          {/* Queue to witch's shop — villagers holding bottles */}
          <Villager position={[-0.92, 0, 0.9]} robe={ROBE.brown} lookAt={[0, 1.5, 5]} phase={0.3} />
          <Bottle position={[-0.92, 0.9, 1.0]} color="#ff6b6b" />
          <Villager position={[0.0, 0, 0.7]} robe={ROBE.white} lookAt={[0, 1.5, 5]} phase={1.9} />
          <Bottle position={[0.0, 0.9, 0.78]} color="#6bc8ff" />
          <Villager position={[0.92, 0, 0.9]} robe={ROBE.blue} lookAt={[0, 1.5, 5]} phase={1.1} />
          <Bottle position={[0.92, 0.9, 1.0]} color="#ffe66b" />
          <Villager position={[-0.62, 0, 2.28]} robe={ROBE.friend} lookAt={[0, 1.5, 5]} scale={CHILD} kid phase={0.9} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: faceOf(ME), dist: 1.9, to: 1.45, yaw: 7, pitch: 3, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "Cut to the teller: too scared to try — hands clutching elbows, smile that doesn't reach eyes.",
      stage: () => <Hero position={ME} animation="hug" face="fear" gaze={0} headPitch={0.12} />,
    },
  ],
});

void chestOf;

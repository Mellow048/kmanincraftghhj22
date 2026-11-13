import { cam, storyScene } from "../../engine";
import { Dragon, Golem, MonsterEgg } from "../../../Topics/InThisTown/creatures";
import { CARRIED, EGG_COLORS, Hero, Kid, NestEggs, WEST, carried, timing } from "./kit";

/** HOOK. The promise in one breath: this town, these kids, monster eggs. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.me",
      ...cam.push({ on: [2, 1.0, 1.2], dist: 2.4, to: 1.9, yaw: -90, pitch: -6 }),
      zone: "town",
      look: "overworld-day",
      note: "The teller first, close, waving. A golem looks over his shoulder and a dragon crosses the sky: the town in one frame.",
      stage: (t) => (
        <>
          <Hero position={[2, 0, 1.2]} rotationY={WEST} animation="wave" face="smile" />
          <Golem position={[8.2 - t * 1.1, 0, 2.3]} rotationY={WEST} walk={t * 1.1} />
          <Dragon position={[26 - t * 4, 9.5, -2.2]} rotationY={WEST} scale={1.15} fly />
        </>
      ),
    },
    {
      cue: "1.eggs",
      ...cam.truck({ on: [-32.6, 0.95, 5.2], dist: 2.3, yaw: 0, pitch: 4, by: [3.1, 0, 0] }),
      zone: "town",
      look: "overworld-day",
      note: "The words are 'every kid' and 'monster egg': slide down a row of kids, each one holding an egg of a different colour.",
      stage: (t) => (
        <>
          <NestEggs />
          {[0, 1, 2, 3, 4].map((i) => {
            const at: [number, number, number] = [-33 + i * 0.95, Math.abs(Math.sin(t * 6 + i * 1.3)) * 0.05, 5.2];
            return (
              <group key={i}>
                <Kid who={i} position={at} animation="hold" face={i % 2 ? "grin" : "smile"} />
                <MonsterEgg position={carried(at, 0)} scale={CARRIED} color={EGG_COLORS[i][0]} spots={EGG_COLORS[i][1]} />
              </group>
            );
          })}
        </>
      ),
    },
  ],
});

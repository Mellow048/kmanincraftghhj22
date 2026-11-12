import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Brother, CHAOS, Hero, MUD, NORTH, SOUTH, ZONE, timing, wordAt } from "./kit";
import { NEAR } from "./scene12";

const FLICK = wordAt("16.flick", "flicked");
const FROM: Vec3 = [8.4, 1.0, 1.2];

/** ONE FINGER. And he is gone across the town. */
export const scene16 = storyScene(timing, {
  id: "scene16",
  title: "One finger",
  shots: [
    {
      cue: "16.flick",
      ...cam.push({ on: [8.4, 1.2, 0.7], dist: 3.3, to: 2.9, yaw: 64, pitch: 2, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Side on, close. The brother lifts one hand to the teller's chest, lazily. On 'flicked' there is a white crack and the red shirt is gone out of the frame.",
      stage: (t) => {
        const gone = t > FLICK ? (t - FLICK) * 22 : 0;
        return (
          <>
            <Brother position={NEAR} rotationY={SOUTH} animation="point" face="smug" />
            <Hero position={[8.4, gone * 0.25, 1.2 + gone]} rotationY={NORTH} animation={gone > 0 ? "fall" : "scared"} face="scared" />
            <Bits position={[8.4, 1.2, 0.95]} t={t - FLICK} color="#ffffff" count={12} seed={3} power={1.2} />
          </>
        );
      },
    },
    {
      cue: "16.flew",
      from: [11.9, 4.5, 9.2],
      to: [-6.4, 3.0, 15.7],
      target: [8.4, 1.0, 1.2],
      targetTo: [-9.6, 0.4, 10.2],
      fov: 46,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "We go with him: a red shirt turning over in the air above the burning town, the bell and the well going by underneath, and then the pig pen coming up fast and a wall of mud.",
      stage: (t, { p }) => {
        const k = 0.5 - 0.5 * Math.cos(Math.PI * p);
        const pos: Vec3 = [FROM[0] + (MUD[0] - FROM[0]) * k, FROM[1] * (1 - k) + Math.sin(k * Math.PI) * 2.4, FROM[2] + (MUD[2] - FROM[2]) * k];
        return (
          <>
            <Hero position={pos} rotationY={-1.1 + t * 5} animation="fall" face="scared" />
            <Bits position={[MUD[0], 0.2, MUD[2]]} t={(p - 0.93) * 3.4} color="#5a4030" count={20} seed={5} power={1.8} />
            <Bits position={[MUD[0] + 0.3, 0.2, MUD[2] - 0.2]} t={(p - 0.93) * 3.4 - 0.05} color="#4a3324" count={14} seed={7} power={1.3} />
          </>
        );
      },
    },
  ],
});

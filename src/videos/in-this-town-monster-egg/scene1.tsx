import { clamp01, defineScene, smoothstep, useTime } from "../../engine";
import { MonsterEgg } from "../../../Topics/InThisTown/creatures";
import { MARKS } from "../../../Topics/InThisTown/maps";
import { Hero } from "./actors";

/** 0–3.8s: the bad egg is already in the frame before anyone explains the town. */
export const scene1 = defineScene({
  id: "scene1",
  title: "The Crack",
  duration: 3.8,
  shots: [
    {
      at: 0,
      dur: 3.8,
      from: [0.5, 1.25, -4.1],
      to: [0.95, 1.35, -4.0],
      target: [-0.55, 0.45, -2.7],
      targetTo: [-1.25, 1.32, -3.3],
      fov: 38,
      fovTo: 44,
      ease: "inOutSine",
      note: "Begin on the jagged crack, then ease back and turn to find the one kid whose egg looks wrong. The street and rank post answer what is at stake.",
    },
  ],
  Component: () => {
    const t = useTime();
    const turn = smoothstep(clamp01((t - 2.3) / 1.5));
    return (
      <>
        <MonsterEgg position={MARKS.egg} />
        <Hero
          position={MARKS.heroHome}
          animation="idle"
          face={t < 2.4 ? "worried" : "sad"}
          rotationY={Math.PI * (1 - turn)}
          headPitch={0.4 - turn * 0.23}
          headYaw={turn * -0.2}
          gaze={0}
        />
      </>
    );
  },
});

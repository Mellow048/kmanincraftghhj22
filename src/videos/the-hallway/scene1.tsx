import { clamp01, defineScene, smoothstep, useTime } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 01 — THE ROOM (0:00–0:03)
 * Hook: the ward is asleep, but the boy is not. A slow push makes the empty
 * half of the bed the second character. At 1.8s his head turns to the hall.
 */
export const scene1 = defineScene({
  id: "scene1",
  title: "The Room",
  duration: 3.0,
  shots: [
    {
      at: 0,
      dur: 3.0,
      from: [1.62, 1.98, 2.48],
      to: [0.9, 1.6, 1.82],
      target: [-1.72, 1.24, -0.88],
      targetTo: [-1.8, 1.37, -0.72],
      fov: 52,
      fovTo: 45,
      ease: "inOutSine",
      note: "Push in on the boy so the empty half of the bed becomes the second character. The room closes around him.",
    },
  ],
  Component: () => {
    const t = useTime();
    const turn = smoothstep(clamp01((t - 1.8) / 0.55));
    return (
      <Kid
        face={t > 2.15 ? "scared" : "worried"}
        headYaw={turn * 0.8}
        headPitch={0.22 - turn * 0.16}
      />
    );
  },
});

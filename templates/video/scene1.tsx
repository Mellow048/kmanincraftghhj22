import { clamp01, defineScene, smoothstep, useTime } from "../../engine";
import { Kid } from "./actors";
import { MARKS } from "./world";

/**
 * BEAT 01 — __TITLE__ (0:00–0:03.6)
 * Template scene. Copy this file to scene2.tsx, scene3.tsx… and change:
 *   - id/title/duration
 *   - the shot list (keep the note, keep the motion)
 *   - the performance
 *
 * The camera starts where the previous scene ended. For scene1 that is the
 * door corner. For scene2, copy scene1's last `to`, `targetTo` and `fovTo`.
 */
export const scene1 = defineScene({
  id: "scene1",
  title: "The Hook",
  duration: 3.6,
  shots: [
    {
      at: 0,
      dur: 3.6,
      from: [1.62, 1.98, 2.48],
      to: [0.86, 1.62, 1.78],
      target: [-1.72, 1.24, -0.88],
      targetTo: [-1.8, 1.38, -0.72],
      focalLength: 24,
      focalLengthTo: 30,
      ease: "inOutSine",
      note: "Push in on the boy so the empty half of the bed becomes the second character. The room closes around him.",
    },
  ],
  Component: () => {
    const t = useTime();
    const turn = smoothstep(clamp01((t - 1.15) / 0.55));
    return (
      <Kid
        position={MARKS.bedSeat}
        face={t > 1.9 ? "scared" : "worried"}
        headYaw={-0.08 + turn * 0.5}
        headPitch={0.24 - turn * 0.1}
      />
    );
  },
});

import { clamp01, defineScene, smoothstep, useTime } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 03 — THE SOUND (0:07.6–0:11)
 * Purpose: a sound outside the room pulls his attention and ours.
 * The head turn is the story. The camera follows the turn into the doorway.
 */
export const scene3 = defineScene({
  id: "scene3",
  title: "The Sound",
  duration: 3.4,
  shots: [
    {
      at: 0,
      dur: 2.1,
      from: [-1.0, 1.46, 0.0],
      to: [-1.03, 1.44, -0.1],
      target: [-1.8, 1.37, -0.72],
      fov: 34,
      ease: "inOutSine",
      note: "Hold the close-up while he hears it. Barely move: the performance is the head turn, not the camera.",
    },
    {
      at: 2.1,
      dur: 1.3,
      from: [-1.03, 1.44, -0.1],
      to: [1.15, 1.62, 1.5],
      target: [-1.8, 1.37, -0.72],
      targetPath: [
        [-1.8, 1.37, -0.72],
        [-0.1, 1.5, 1.6],
        [1.65, 1.76, 2.98],
      ],
      fov: 34,
      fovTo: 38,
      ease: "inOutCubic",
      note: "His glance motivates the pan: leave his face, sweep across the room, land on the open doorway. This is the setup for the fly-through.",
    },
  ],
  Component: () => {
    const t = useTime();
    const turn = smoothstep(clamp01((t - 0.5) / 0.55));
    return (
      <Kid
        face={t > 1.15 ? "scared" : "worried"}
        headYaw={turn * 0.95}
        headPitch={0.26 - turn * 0.2}
      />
    );
  },
});

import { defineScene } from "../../engine";
import { Figure, Kid } from "./actors";

/**
 * BEAT 04 — THE LONG HALL (0:11.6–0:15.4)
 * One unbroken flight. The camera leaves the boy at the threshold, slides down
 * the corridor past the wheelchair, the wet floor and the fire exit, and lands
 * on the figure standing at the end of the hall. The reveal is the distance.
 */
export const scene4 = defineScene({
  id: "scene4",
  title: "The Long Hall",
  duration: 3.8,
  shots: [
    {
      at: 0,
      dur: 3.8,
      from: [1.1, 1.48, 4.1],
      path: [
        [1.1, 1.48, 4.1],
        [0.7, 1.47, 4.9],
        [0.1, 1.46, 6.0],
        [-0.5, 1.45, 7.0],
        [-0.6, 1.44, 7.7],
      ],
      target: [1.6, 1.15, 3.5],
      targetPath: [
        [1.6, 1.15, 3.5],
        [1.2, 1.25, 5.2],
        [0.5, 1.3, 7.6],
        [0.3, 1.25, 10.15],
      ],
      fov: 42,
      fovTo: 38,
      ease: "inOutSine",
      handheld: 0.005,
      note: "Leave the boy at the door and fly the corridor. Every prop on the way is a reason to keep looking, and the figure is waiting at the end of it.",
    },
  ],
  Component: () => (
    <>
      <Kid face="scared" position={[1.6, 0, 3.5]} rotationY={0.05} headYaw={0.2} headPitch={0.12} animation="idle" />
      <Figure />
    </>
  ),
});

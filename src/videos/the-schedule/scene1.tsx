import { defineScene } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 01 — THE ROOM (0:00–0:04)
 * Purpose: establish the boy, the bed, the timetable, the blue night, the window.
 * We push in from the door corner, so the room closes around him. No cut.
 */
export const scene1 = defineScene({
  id: "scene1",
  title: "The Room",
  duration: 4.0,
  shots: [
    {
      at: 0,
      dur: 4.0,
      from: [1.62, 1.98, 2.48],
      to: [0.62, 1.58, 1.62],
      target: [-1.72, 1.24, -0.88],
      targetTo: [-1.8, 1.36, -0.72],
      fov: 52,
      fovTo: 44,
      ease: "inOutSine",
      note: "Establish the room and isolate the boy: a slow, physical push-in that never lets the audience look away from him.",
    },
  ],
  Component: () => (
    <>
      <Kid headYaw={-0.1} headPitch={0.22} />
    </>
  ),
});

import { defineScene } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 02 — THE TIMETABLE (0:04–0:07.6)
 * Purpose: the insert explains the hospital, the cut lands on him ignoring it.
 * Two shots, one motivated cut.
 */
export const scene2 = defineScene({
  id: "scene2",
  title: "The Timetable",
  duration: 3.6,
  shots: [
    {
      at: 0,
      dur: 1.9,
      from: [0.5, 1.98, 0.9],
      to: [-0.9, 2.0, -1.3],
      target: [-1.8, 1.95, -2.94],
      fov: 42,
      fovTo: 34,
      ease: "inOutCubic",
      note: "Insert: the only object in the room that pretends tomorrow will be normal. Push until the chart fills the frame.",
    },
    {
      at: 1.9,
      dur: 1.7,
      from: [-0.7, 1.5, 0.4],
      to: [-1.0, 1.46, 0.0],
      target: [-1.8, 1.37, -0.72],
      fov: 34,
      ease: "inOutSine",
      note: "Cut on his breath. He is not looking at the chart. The move keeps closing in so the audience feels the pressure.",
    },
  ],
  Component: () => <Kid headPitch={0.26} />,
});

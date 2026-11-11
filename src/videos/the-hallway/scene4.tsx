import { defineScene } from "../../engine";
import { Figure } from "./actors";

/**
 * BEAT 04 — THE LONG HALL (0:11.6–0:15.4)
 * The cut leaves the boy at the threshold. The camera is already in the hall,
 * moving after him, but the corridor is empty; the eye keeps going because the
 * lamp at the far end has something under it.
 */
export const scene4 = defineScene({
  id: "scene4",
  title: "The Long Hall",
  duration: 3.8,
  shots: [
    {
      at: 0,
      dur: 3.8,
      from: [0.9, 1.5, -1.0],
      path: [
        [0.9, 1.5, -1.0],
        [0.95, 1.5, -0.3],
        [1.1, 1.51, 0.6],
        [1.35, 1.52, 1.6],
        [1.5, 1.53, 2.6],
        [1.4, 1.51, 3.4],
        [1.05, 1.49, 4.4],
        [0.75, 1.48, 5.3],
        [0.4, 1.46, 6.2],
      ],
      target: [1.72, 1.2, 4.35],
      targetPath: [
        [1.72, 1.2, 4.35],
        [1.55, 1.15, 5.3],
        [1.0, 1.1, 6.8],
        [0.45, 1.08, 8.4],
        [0.0, 1.05, 10.15],
      ],
      fov: 42,
      fovTo: 40,
      ease: "inOutSine",
      handheld: 0.005,
      note: "Take the boy's eyeline and walk it: through the doorway, past the wet floor, down the long hall. He is gone; the figure under the lamp is not.",
    },
  ],
  Component: () => <Figure />,
});

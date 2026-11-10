import { clamp01, defineScene, smoothstep, useTime } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 02 — THE DRAWING (0:03.6–0:07.2)
 * The insert the hook promised. We push all the way into the crayon drawing:
 * a house, a sun, and a tall black thing with two white eyes. Then the glance
 * rips off it and lands on the open door. No cut — it is his eyes moving.
 */
export const scene2 = defineScene({
  id: "scene2",
  title: "The Drawing",
  duration: 3.6,
  shots: [
    {
      at: 0,
      dur: 2.2,
      from: [0.95, 1.52, 1.25],
      to: [0.15, 1.66, -1.15],
      target: [-1.9, 1.5, -1.0],
      targetTo: [-2.56, 1.72, -1.35],
      fov: 45,
      fovTo: 40,
      ease: "inOutSine",
      handheld: 0.003,
      note: "Push into the crayon drawing until the black figure fills the frame. The audience should read the eyes before the boy does.",
    },
    {
      at: 2.2,
      dur: 1.4,
      from: [0.15, 1.66, -1.15],
      to: [1.15, 1.55, 2.0],
      target: [-2.56, 1.72, -1.35],
      targetTo: [1.6, 1.5, 3.05],
      fov: 40,
      fovTo: 42,
      ease: "inOutCubic",
      note: "Whip off the drawing and land on the open door. The pan is his glance, and it tells the audience the drawing is not the danger.",
    },
  ],
  Component: () => {
    const t = useTime();
    const away = smoothstep(clamp01((t - 2.2) / 0.9));
    return (
      <Kid
        face={t > 2.4 ? "surprised" : "worried"}
        animation="sit"
        headYaw={-1.22 * (1 - away) + 0.34 * away}
        headPitch={0.12 - 0.08 * (1 - away) + 0.02 * away}
        headRoll={-0.05 * (1 - away)}
      />
    );
  },
});

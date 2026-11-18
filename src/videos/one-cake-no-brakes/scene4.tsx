import { defineScene, useTime } from "../../engine";
import { Ride } from "./actors";
import { FPS } from "./rail";

export const scene4 = defineScene({
  id: "scene4",
  title: "The delivery",
  duration: 6.7,
  shots: [
    {
      at: 0,
      dur: 5,
      from: [1.4300, 3.6320, 14.0787],
      path: [[1.4300, 3.6320, 14.0787], [2.4500, 3.4520, 19.5702], [3.6200, 3.2320, 25.9287], [4.1900, 3.0520, 31.2778], [4.6400, 2.9120, 36.6088]],
      target: [0.6200, 1.5420, 19.3787],
      targetPath: [[0.6200, 1.5420, 19.3787], [0.1700, 1.5320, 23.2102], [0.1400, 1.5020, 28.0687], [0.2300, 1.5020, 31.9978], [0.7800, 1.5620, 35.9988]],
      fov: 48,
      fovTo: 51,
      ease: "linear",
      note: "Lower from the ride into a three-quarter view of the birthday stand. Hold the tray, Finn’s arms and the stand together through the instant of contact.",
    },
    {
      at: 5,
      dur: 1.7,
      from: [-3.1500, 3.2100, 42.2448],
      path: [[-3.1500, 3.2100, 42.2448], [-3.1800, 3.2500, 42.3048], [-3.0800, 3.2700, 42.3748]],
      target: [0.2600, 1.1800, 38.3948],
      targetPath: [[0.2600, 1.1800, 38.3948], [0.5600, 1.2300, 39.1048], [0.6800, 1.3400, 39.1848]],
      fov: 49,
      fovTo: 44,
      ease: "linear",
      note: "Cut ahead along the rail after the tray lands. Keep the tip hand and cart in the same plane; then let the cart outrun us.",
    },
  ],
  Component: () => <Ride f={375 + Math.round(useTime() * FPS)} />,
});

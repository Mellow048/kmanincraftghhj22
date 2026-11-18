import { defineScene, useTime } from "../../engine";
import { Ride } from "./actors";
import { FPS } from "./rail";

export const scene2 = defineScene({
  id: "scene2",
  title: "The bump",
  duration: 3.5,
  shots: [
    {
      at: 0,
      dur: 3.5,
      from: [-2.1356, 4.6613, -4.3440],
      path: [[-2.1356, 4.6613, -4.3440], [-3.3790, 3.9293, -0.8442], [-4.9358, 3.7242, 2.0780], [-4.8109, 2.8700, 4.1288]],
      target: [1.6044, 3.5913, -6.9040],
      targetPath: [[1.6044, 3.5913, -6.9040], [0.4010, 2.9693, -3.2142], [-0.7558, 2.7642, 0.2080], [-0.8409, 1.9400, 3.3287]],
      fov: 46,
      fovTo: 48,
      ease: "linear",
      note: "Move alongside the wheels at the foot of the trestle. A shoulder and both hands press the rising tray level, not more of the same look.",
    },
  ],
  Component: () => <Ride f={120 + Math.round(useTime() * FPS)} />,
});

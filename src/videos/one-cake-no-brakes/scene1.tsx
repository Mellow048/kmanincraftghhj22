import { defineScene, useTime } from "../../engine";
import { Ride } from "./actors";
import { FPS } from "./rail";

export const scene1 = defineScene({
  id: "scene1",
  title: "One cake",
  duration: 4,
  shots: [
    {
      at: 0,
      dur: 4,
      from: [-2.7800, 6.1532, -14.5100],
      path: [[-2.7800, 6.1532, -14.5100], [-2.7385, 5.9052, -11.3728], [-2.3977, 5.4829, -8.3314], [-2.1356, 4.6613, -4.3440]],
      target: [-0.1500, 5.0832, -17.7300],
      targetPath: [[-0.1500, 5.0832, -17.7300], [0.1215, 4.7852, -14.6828], [0.8623, 4.3029, -11.3114], [1.6044, 3.5913, -6.9040]],
      fov: 44,
      fovTo: 46,
      ease: "linear",
      note: "Lead with the slipping tray below Finn’s steady face; drift back far enough to show why the first save needs his whole arm.",
    },
  ],
  Component: () => <Ride f={0 + Math.round(useTime() * FPS)} />,
});

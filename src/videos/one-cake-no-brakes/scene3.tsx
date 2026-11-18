import { defineScene, useTime } from "../../engine";
import { Ride } from "./actors";
import { FPS } from "./rail";

export const scene3 = defineScene({
  id: "scene3",
  title: "The party at the bottom",
  duration: 5,
  shots: [
    {
      at: 0,
      dur: 5,
      from: [-4.8109, 2.8700, 4.1288],
      path: [[-4.8109, 2.8700, 4.1288], [-4.8408, 3.1108, 4.2806], [-3.0892, 3.4690, 4.4862], [-1.3204, 3.7222, 6.8930], [-0.2900, 3.5720, 10.7060], [1.4300, 3.6320, 14.0787]],
      target: [-0.8409, 1.9400, 3.3287],
      targetPath: [[-0.8409, 1.9400, 3.3287], [-0.5708, 1.7908, 5.9506], [0.0408, 1.6490, 9.5662], [0.4196, 1.5722, 13.2630], [0.6500, 1.5520, 16.2560], [0.6200, 1.5420, 19.3787]],
      fov: 48,
      fovTo: 48,
      ease: "linear",
      note: "Climb over the rail from tracking beside Finn to looking down toward the flags and waiting birthday stand. The cart has not slowed.",
    },
  ],
  Component: () => <Ride f={225 + Math.round(useTime() * FPS)} />,
});

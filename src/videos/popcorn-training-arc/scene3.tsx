import { defineScene } from "../../engine";
import { CUT, MISS, time } from "./marks";
import { Performance } from "./performance";

export const scene3 = defineScene({
  id: "scene3",
  title: "Two, then the forehead; train harder",
  duration: 8.9,
  shots: [
    {
      at: 0,
      dur: 5.533333333333333,
      from: [-0.076, 2.53, 3.17],
      to: [1.49, 2.19, 4.26],
      path: [[-0.076, 2.53, 3.17], [0.96, 2.32, 4.45], [1.49, 2.19, 4.26]],
      target: [-0.437, 1.17, 0.406],
      targetPath: [[-0.437, 1.17, 0.406], [0.812, 1.343, 0.26], [1.054, 1.354, 0.29]],
      fov: 43,
      fovTo: 46,
      ease: "outQuint",
      impacts: [{ at: time(MISS - CUT.trial), amp: 0.038, dur: 0.19 }],
      note: "Find the carton and chicken as one corner of the room, then keep the face, arc and catch lamps together. Stay on the miss long enough to see it hurt his pride.",
    },
    {
      at: 5.533333333333333,
      dur: 3.366666666666667,
      from: [0.432, 2.025, 3.43],
      to: [1.52, 2.21, 4.21],
      target: [0.911, 1.602, 0.219],
      targetTo: [1.08, 1.345, 0.34],
      fov: 46,
      fovTo: 46,
      ease: "inCubic",
      note: "One intentional cut: from rubbing the forehead to the same head under a red band and a training sign. Stay close for the drills, then give the rematch the same geography.",
    },
  ],
  Component: () => <Performance offset={CUT.trial} />,
});

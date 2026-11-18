import { defineScene } from "../../engine";
import { CUT } from "./marks";
import { Performance } from "./performance";

export const scene2 = defineScene({
  id: "scene2",
  title: "The sponge gets the same treatment",
  duration: 2.933333333333333,
  shots: [
    {
      at: 0,
      dur: 2.933333333333333,
      from: [-1.51, 2.06, 3.65],
      to: [-0.076, 2.53, 3.17],
      target: [-2.069, 1.278, 0.285],
      targetTo: [-0.437, 1.17, 0.406],
      fov: 46,
      fovTo: 43,
      ease: "outCubic",
      note: "Follow his sidestep and rise just enough to see the three brown spots clear under the sponge. The same rep count now belongs to a dish.",
    },
  ],
  Component: () => <Performance offset={CUT.sink} />,
});

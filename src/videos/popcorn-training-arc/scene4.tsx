import { defineScene } from "../../engine";
import { CUT } from "./marks";
import { Performance } from "./performance";

export const scene4 = defineScene({
  id: "scene4",
  title: "He wins. The chicken wins more.",
  duration: 4.866666666666666,
  shots: [
    {
      at: 0,
      dur: 4.866666666666666,
      from: [1.52, 2.21, 4.21],
      to: [2.129, 2.26, 4.46],
      target: [1.08, 1.345, 0.34],
      targetTo: [1.789, 1.265, 0.63],
      fov: 46,
      fovTo: 47,
      ease: "inCubic",
      note: "The camera backs the boy through three clean catches, then sides with the bird. Leave the empty space under the boy’s hand in frame rather than explaining the theft.",
    },
  ],
  Component: () => <Performance offset={CUT.retry} />,
});

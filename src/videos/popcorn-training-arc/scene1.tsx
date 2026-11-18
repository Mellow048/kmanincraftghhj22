import { defineScene } from "../../engine";
import { Performance } from "./performance";

export const scene1 = defineScene({
  id: "scene1",
  title: "The mouse is a sport",
  duration: 2.9,
  shots: [
    {
      at: 0,
      dur: 2.9,
      from: [-1.67, 1.99, 3.38],
      to: [-1.51, 2.06, 3.65],
      target: [-2.154, 1.29, 0.31],
      targetTo: [-2.069, 1.278, 0.285],
      fov: 48,
      fovTo: 46,
      ease: "inOutSine",
      note: "Start with the boy on the mouse and a skeleton timing him. The pull gives the three lights and Coach’s response room to register without cutting the drill into pieces.",
    },
  ],
  Component: () => <Performance offset={0} />,
});

import { defineScene } from "../../engine";
import { HomeMop, useFrameAt } from "./performance";
import { CUT } from "./marks";

export const scene4 = defineScene({
  id: "scene4",
  title: "Whole-house mop practice",
  duration: 4.0,
  shots: [
    {
      at: 0.0,
      dur: 1.3,
      from: [0.964, 2.16, 3.99],
      to: [0.79, 2.27, 4.22],
      target: [-0.509, 0.829, 1.974],
      targetTo: [-0.406, 0.79, 2.496],
      fov: 49,
      zone: "home",
      look: "warm-room",
      ease: "linear",
      note: "Match cut the mop into his actual hands. Tilt low enough to see the kitchen tiles go from dirty to wet and clean.",
    },
    {
      at: 1.3,
      dur: 1.3,
      from: [-3.03, 2.24, 3.564],
      to: [-2.81, 2.29, 3.941],
      target: [-4.318, 0.829, 1.40],
      targetTo: [-3.661, 0.843, 1.941],
      fov: 54,
      zone: "hall",
      look: "warm-room",
      ease: "linear",
      note: "Follow the head across the next room s threshold; the coatrack and different tiles establish he is covering the whole house.",
    },
    {
      at: 2.6,
      dur: 1.4,
      from: [-6.815, 2.71, 3.73],
      to: [-6.278, 2.68, 3.827],
      target: [-7.952, 0.895, 1.113],
      targetTo: [-7.673, 0.874, 1.728],
      fov: 54,
      fovTo: 56,
      zone: "bedroom",
      look: "warm-room",
      ease: "linear",
      note: "Higher and wider to show the bed, the dirty area, and the last clear pass. The end of the room is the end of the drill.",
    },
  ],
  Component: () => <HomeMop f={useFrameAt(CUT.mopKitchen)} />,
});

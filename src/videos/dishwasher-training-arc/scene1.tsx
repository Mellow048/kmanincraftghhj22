import { defineScene } from "../../engine";
import { Party } from "./actors";
import { Washing, useFrameAt } from "./performance";
import { CUT } from "./marks";

export const scene1 = defineScene({
  id: "scene1",
  title: "The two-second contrast",
  duration: 11.6,
  shots: [
    {
      at: 0.0,
      dur: 2.0,
      from: [0.03, 1.24, 3.52],
      to: [0.075, 1.44, 3.39],
      target: [0.117, 1.112, -0.17],
      targetTo: [0.098, 1.23, -0.25],
      fov: 48,
      fovTo: 51,
      zone: "town",
      look: "prom-night",
      ease: "linear",
      note: "Start on the two friends already dancing; the arc shows the party filling the lantern-lit street.",
    },
    {
      at: 2,
      dur: 1.6666666666666667,
      from: [0.50, 2.19, 2.875],
      to: [0.33, 2.10, 2.74],
      target: [-0.56, 1.204, 0.51],
      targetTo: [-0.59, 1.229, 0.492],
      fov: 43,
      zone: "home",
      look: "warm-room",
      ease: "linear",
      note: "Hard cut on frame sixty: the hand is already scrubbing. Stay close enough that the faucet and brown spots on the ceramic read.",
    },
    {
      at: 3.6666666666666665,
      dur: 3.6,
      from: [-0.88, 1.99, 2.841],
      to: [-1.07, 2.02, 2.93],
      target: [-0.667, 1.333, 0.386],
      targetTo: [-0.811, 1.331, 0.384],
      fov: 45,
      zone: "home",
      look: "warm-room",
      ease: "linear",
      note: "After the sixth wipe, show the person's reason for practicing, with the job flier just over his shoulder.",
    },
    {
      at: 7.266666666666667,
      dur: 4.333333333333333,
      from: [-0.597, 1.93, 2.67],
      to: [-0.331, 2.09, 2.99],
      target: [-0.57, 1.216, 0.392],
      targetTo: [-0.475, 1.287, 0.259],
      fov: 43,
      fovTo: 42,
      zone: "home",
      look: "warm-room",
      ease: "linear",
      note: "Hold his face and working hand together: the first tiny win is enough for him to brag. Leave room for the bell to redirect his attention.",
    },
  ],
  Component: () => {
    const f=useFrameAt(0);
    return f<CUT.sink?<Party f={f}/>:<Washing f={f} take={f<CUT.proud?"sink":"proud"}/>;
  },
});

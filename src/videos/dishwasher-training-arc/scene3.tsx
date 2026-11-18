import { defineScene } from "../../engine";
import { Enter, Interview, Washing, useFrameAt } from "./performance";
import { CUT } from "./marks";

export const scene3 = defineScene({
  id: "scene3",
  title: "From one plate to an interview",
  duration: 10.933333333333334,
  shots: [
    {
      at: 0.0,
      dur: 2.0,
      from: [-0.053, 2.217, 4.19],
      to: [-0.005, 2.35, 4.38],
      target: [-0.077, 1.27, 0.52],
      targetTo: [0.013, 1.333, 0.511],
      fov: 52,
      fovTo: 53,
      zone: "home",
      look: "warm-room",
      ease: "linear",
      note: "Keep Finn on the left and the right end of the board in view. The pile must get absurd in the same frame without a cut.",
    },
    {
      at: 2.0,
      dur: 1.3,
      from: [1.205, 1.924, 1.16],
      to: [1.44, 2.023, 0.53],
      target: [2.068, 1.463, -3.125],
      targetTo: [2.055, 1.574, -3.229],
      fov: 49,
      fovTo: 51,
      zone: "town",
      look: "prom-night",
      ease: "linear",
      note: "A plate in his hand and the actual restaurant sign overhead. Follow his shoulder across the threshold rather than materializing at the counter.",
    },
    {
      at: 3.3,
      dur: 3.7333333333333334,
      from: [2.435, 1.982, 2.94],
      to: [2.274, 1.873, 2.72],
      target: [-0.515, 1.292, 1.497],
      targetTo: [-0.54, 1.321, 1.432],
      fov: 53,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "The clean plate lands between the applicant and the same-level, unimpressed manager; read both silhouettes in the conversation.",
    },
    {
      at: 7.033333333333333,
      dur: 2.466666666666667,
      from: [1.685, 2.079, 3.31],
      to: [1.49, 1.963, 3.13],
      target: [0.016, 1.004, 1.28],
      targetTo: [0.022, 1.021, 1.343],
      fov: 52,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "Push into the manager s side of the pass when the mop changes the terms. The emeralds form a second pile in the open foreground.",
    },
    {
      at: 9.5,
      dur: 1.4333333333333333,
      from: [-0.541, 1.58, 0.537],
      to: [-0.573, 1.523, 0.636],
      target: [-0.961, 1.395, 1.993],
      targetTo: [-0.941, 1.371, 2.020],
      fov: 46,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "Reverse in close to catch the drop of Finn s eyes before the sped-up near miss. Stay on him until both almosts have cleared.",
    },
  ],
  Component: () => {
    const f=useFrameAt(CUT.stack);
    if(f<CUT.street) return <Washing f={f} take="stack"/>;
    if(f<CUT.ask) return <Enter f={f}/>;
    return <Interview f={f}/>;
  },
});

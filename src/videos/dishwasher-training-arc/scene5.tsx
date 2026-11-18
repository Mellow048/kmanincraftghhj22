import { defineScene } from "../../engine";
import { JobMop, Retry, Washing, useFrameAt } from "./performance";
import { CUT } from "./marks";

export const scene5 = defineScene({
  id: "scene5",
  title: "Double pay",
  duration: 3.9,
  shots: [
    {
      at: 0.0,
      dur: 2.033333333333333,
      from: [0.411, 2.42, 0.63],
      to: [0.404, 2.32, 0.82],
      target: [0.551, 1.056, 3.83],
      targetTo: [0.467, 1.051, 3.55],
      fov: 57,
      fovTo: 58,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "Back at the restaurant with the actual mop. The floor test clears in front of the manager, who nods and makes the hire.",
    },
    {
      at: 2.033333333333333,
      dur: 0.9333333333333333,
      from: [-0.454, 1.974, 1.224],
      to: [-0.271, 2.1, 1.123],
      target: [-0.781, 1.22, -0.36],
      targetTo: [-0.752, 1.19, -0.374],
      fov: 46,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "The new apron and steel sink resolve the hire as a job, not an offer. Get close enough to count the fast sponge strokes.",
    },
    {
      at: 2.966666666666667,
      dur: 0.9333333333333333,
      from: [1.731, 1.508, 2.157],
      to: [1.531, 1.48, 2.523],
      target: [1.15, 0.812, 0.291],
      targetTo: [1.121, 0.785, 0.909],
      fov: 51,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "Match the direction of the sponge with the floor mop. The handoff to its real second job is visible in one low track.",
    },
  ],
  Component: () => {
    const f=useFrameAt(CUT.retry);
    if(f<CUT.jobWash) return <Retry f={f}/>;
    return f<CUT.jobMop?<Washing f={f} take="shift"/>:<JobMop f={f}/>;
  },
});

import { defineScene } from "../../engine";
import { Arrivals, Counter, Impressed, JobMop, Washing, Watching, useFrameAt } from "./performance";
import { CUT } from "./marks";

export const scene6 = defineScene({
  id: "scene6",
  title: "The party comes to him",
  duration: 5.866666666666666,
  shots: [
    {
      at: 0.0,
      dur: 1.2,
      from: [0.90, 1.89, 1.75],
      to: [0.973, 1.89, 1.347],
      target: [1.014, 1.061, 4.449],
      targetTo: [1.015, 1.099, 3.877],
      fov: 57,
      fovTo: 55,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "The same friends stream in with the neighborhood behind. Tilt enough to keep the slime and the taller party guests in the same portal.",
    },
    {
      at: 1.2,
      dur: 1.0,
      from: [-0.38, 2.48, 2.956],
      to: [-0.35, 2.38, 2.789],
      target: [-0.622, 1.235, -0.384],
      targetTo: [-0.633, 1.221, -0.363],
      fov: 43,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "Reverse across the pass: a guest at either edge shows whose view this is as they catch sight of Finn scrubbing quickly in back.",
    },
    {
      at: 2.2,
      dur: 0.8666666666666667,
      from: [1.3, 2.08, 2.76],
      to: [1.309, 2.01, 2.694],
      target: [1.035, 0.889, 0.271],
      targetTo: [1.065, 0.889, 0.627],
      fov: 47,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "Follow their attention down to the second job; the mop reaches the floor and the quick motion finishes the second triplet.",
    },
    {
      at: 3.066666666666667,
      dur: 0.5666666666666667,
      from: [0.703,1.72,0.87],
      to: [0.723,1.66,0.965],
      target: [0.876,1.093,3.13],
      targetTo: [0.902,1.108,3.10],
      fov: 59,
      zone: "shop",
      look: "warm-room",
      ease: "outCubic",
      note: "The payoff needs their faces. The crowd stops, the skeleton's jaw falls and the little slime bounces in astonishment.",
    },
    {
      at: 3.6333333333333333,
      dur: 2.2333333333333334,
      from: [-1.847,2.192,3.79],
      to: [-1.82,2.132,3.65],
      target: [-0.543,1.182,1.385],
      targetTo: [-0.56,1.165,1.447],
      fov: 54,
      fovTo: 53,
      zone: "shop",
      look: "warm-room",
      ease: "linear",
      note: "Travel in as Finn reaches the pass. Let the small guest ask, then his serious face, cloth and three disappearing smudges finish the joke.",
    },
  ],
  Component: () => {
    const f=useFrameAt(CUT.crowd);
    if(f<CUT.watchWash) return <Arrivals f={f}/>;
    if(f>=CUT.counter) return <Counter f={f}/>;
    if(f>=CUT.impressed) return <Impressed f={f}/>;
    return <>{f<CUT.watchMop?<Washing f={f} take="watch"/>:<JobMop f={f} watch/>}<Watching f={f}/></>;
  },
});

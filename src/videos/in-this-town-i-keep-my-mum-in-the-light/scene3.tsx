import type { Vec3 } from "../../engine";
import { storyScene, lerp, useTime } from "../../engine";
import { Boy, Dad, Glowstone, HandLantern, Spider } from "./actors";
import { Candles, DOOR, win, timing } from "./shared";

const Actors3: React.FC<{ T: number }> = ({ T }) => {
  const t = T;
    const up = win(t, 16.9, 18.3);
    const boyAt: Vec3 = [-2.85, 0, 16.95];
    return (
      <group>
        <Candles />
        <Spider position={DOOR} rotationY={Math.PI / 2} apron knit={t > 13.0} lantern={t > 5.0 && t < 8.2} />
        {t < 5.5 ? <HandLantern at={[-3.42, 0.98, 17.0]} /> : null}
        {t > 10.6 ? <Glowstone at={[-3.62, 2.28, 18.05]} /> : null}
        <group position={[2.5, 0, 8.6]}>{t > 7.8 && t < 11.2 ? <Glowstone at={[0, 1.0, 0]} /> : null}</group>
        <Boy
          position={[lerp(boyAt[0], -2.78, up), 0, lerp(boyAt[2], 17.05, up)]}
          rotationY={2.3}
          face={t > 15.5 ? "worried" : "blank"}
          animation={t > 16.0 && t < 17.0 ? "walk" : "idle"}
        />
        <Dad position={[5.4, 0, 11.6]} rotationY={-1.4} />
      </group>
    );
};

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The Tries",
  shots: [
    {
      cue: "3.candles",
      stage: (t) => <Actors3 T={0.0 + t} />,
      from: [0.2, 1.8, 10.2],
      to: [0.2, 1.78, 12.0],
      target: [0, 2.2, 19.0],
      fov: 48,
      ease: "linear",
      handheld: 0.006,
      look: "overworld-night",
      note: "First I put a candle in every window. The street from above eye height, five windows lit down both sides: a plan, not a problem.",
    },
    {
      cue: "3.wind",
      stage: (t) => <Actors3 T={2.0 + t} />,
      from: [-2.9, 2.2, 9.6],
      to: [-3.05, 2.15, 9.9],
      target: [-3.6, 2.15, 10.0],
      fov: 40,
      ease: "linear",
      handheld: 0.004,
      look: "overworld-night",
      note: "The wind took them, one by one. One window, one candle, the flame leaning: the failure is weather, so it cannot be argued with.",
    },
    {
      cue: "3.lantern",
      stage: (t) => <Actors3 T={3.5 + t} />,
      from: [-2.45, 1.35, 16.9],
      to: [-2.62, 1.3, 17.05],
      target: [-3.7, 1.35, 18.1],
      fov: 40,
      ease: "inOutSine",
      handheld: 0.005,
      note: "A lantern on a string round her neck. The lamp hanging off her leg, absurdly small on her: the best image of the film's thesis.",
    },
    {
      cue: "3.trade",
      stage: (t) => <Actors3 T={7.167 + t} />,
      from: [-1.1, 1.32, 5.6],
      to: [-1.35, 1.28, 6.2],
      target: [2.5, 1.05, 7.6],
      fov: 45,
      arc: 0.3,
      ease: "inOutCubic",
      handheld: 0.006,
      note: "I traded everything I owned. The well with a villager and the payment on the wall: a transaction, so the glowstone has a price.",
    },
    {
      cue: "3.hung",
      stage: (t) => <Actors3 T={9.8 + t} />,
      from: [-2.15, 1.62, 17.55],
      to: [-2.35, 1.66, 17.7],
      target: [-3.72, 2.28, 18.05],
      fov: 42,
      ease: "inOutSine",
      handheld: 0.005,
      note: "I hung it over her corner. Up into the lintel where the block sits: the ceiling of her whole life, in one shot.",
    },
    {
      cue: "3.mum",
      stage: (t) => <Actors3 T={11.333 + t} />,
      from: [-2.5, 1.18, 16.85],
      to: [-2.68, 1.12, 17.0],
      target: [-3.72, 1.12, 18.1],
      fov: 38,
      ease: "linear",
      handheld: 0.004,
      look: "overworld-night",
      note: "She sat under it and knitted and was my mum all night. The only warm frame in the dark half: it has to look like it has worked.",
    },
    {
      cue: "3.awake",
      stage: (t) => <Actors3 T={13.833 + t} />,
      from: [-1.95, 0.95, 15.9],
      to: [-2.25, 1.25, 16.4],
      target: [-2.9, 0.45, 17.1],
      targetTo: [-3.0, 1.1, 17.3],
      fov: 43,
      ease: "inOutCubic",
      handheld: 0.007,
      note: "Too bright to sleep under, so he stopped sleeping. One move from him lying on the step to him sitting up: three nights in three seconds, no captions.",
    },
    {
      cue: "3.nights",
      stage: (t) => <Actors3 T={16.433 + t} />,
      from: [0.6, 1.7, 14.2],
      to: [0.4, 1.72, 15.0],
      target: [-3.5, 1.8, 18.0],
      fov: 46,
      ease: "linear",
      handheld: 0.005,
      look: "overworld-night",
      note: "One night awake, then two, then three. Her doorway is the only warm thing in the town and it is keeping him up: the cost of the fix, in one frame, with all the lamps still lit behind it.",
    },
  ],
});

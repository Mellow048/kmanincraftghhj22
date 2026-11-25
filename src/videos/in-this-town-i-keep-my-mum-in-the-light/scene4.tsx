import type { Vec3 } from "../../engine";
import { storyScene, lerp, useTime } from "../../engine";
import { Boy, HandLantern, Phantom, Spider } from "./actors";
import { DOOR, TAU, win, timing } from "./shared";

const Actors4: React.FC<{ T: number }> = ({ T }) => {
  const t = T;
    const circ = (i: number, tt: number): Vec3 => {
      const a = (tt / 18.87) * TAU * 1.15 + (i * TAU) / 3;
      const r = 7.4 - (tt / 18.87) * 2.2;
      return [1.5 + r * Math.cos(a), 8.4 - (tt / 18.87) * 3.2, 18.5 + r * Math.sin(a)];
    };
    const swoop = win(t, 11.2, 12.6);
    return (
      <group>
        <Spider position={DOOR} rotationY={Math.PI / 2} apron scale={1.02} />
        <HandLantern at={[-3.42, 0.98, 17.0]} />
        {[0, 1, 2].map((i) => {
          const p = circ(i, t);
          const near = i === 0 ? swoop : 0;
          return (
            <Phantom
              key={i}
              position={[lerp(p[0], 0.2, near), lerp(p[1], 2.3, near), lerp(p[2], 27.0, near)]}
              rotationY={-t * 0.6 + i}
              flap={0.12 * Math.sin(t * 2.4 + i)}
            />
          );
        })}
        <Boy position={[0.2, 0, 26.2]} rotationY={Math.PI * 0.92} face={t > 8.6 ? "surprised" : "blank"} />
        <HandLantern at={[-0.35, 1.15, 27.0]} lit={t < 12.0} />
      </group>
    );
};

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The Sky",
  shots: [
    {
      cue: "4.sky",
      stage: (t) => <Actors4 T={0.0 + t} />,
      from: [0.1, 1.5, 12.2],
      to: [0.1, 1.5, 12.9],
      target: [0, 6.4, 16.0],
      fov: 52,
      ease: "inOutSine",
      handheld: 0.005,
      look: "overworld-night",
      note: "On the third night, the sky started screaming. Tilted up over the roofs with the street lamps still burning: the sky is the new character and it gets the top of the frame.",
    },
    {
      cue: "4.three",
      stage: (t) => <Actors4 T={1.933 + t} />,
      from: [0.15, 1.55, 13.0],
      to: [-0.3, 1.6, 14.2],
      target: [1.6, 7.4, 20.0],
      targetTo: [0.4, 8.0, 20.0],
      fov: 50,
      ease: "inOutCubic",
      handheld: 0.007,
      note: "Three of them, wide as doors, with no faces at all. Wingspan against the roof ridge: no face is drawn on them anywhere.",
    },
    {
      cue: "4.around",
      stage: (t) => <Actors4 T={5.233 + t} />,
      from: [3.0, 2.0, 14.0],
      path: [[3.0, 2.0, 14.0], [1.0, 2.4, 22.0], [-2.0, 2.8, 24.0]],
      target: [0, 7.0, 20.0],
      fov: 50,
      ease: "linear",
      handheld: 0.008,
      look: "overworld-night",
      note: "Round the house, round and round, lower every time. The camera copies their circle so the viewer feels the tightening.",
    },
    {
      cue: "4.gate",
      stage: (t) => <Actors4 T={8.067 + t} />,
      from: [-1.4, 1.4, 24.3],
      to: [-1.5, 1.45, 24.9],
      target: [0, 2.9, 28.4],
      fov: 44,
      ease: "inOutSine",
      handheld: 0.006,
      look: "overworld-night",
      note: "I was outside, lighting the lamp by the gate. The gate lamp three metres up, him at the base of it with a taper: the last lamp in the film he can reach.",
    },
    {
      cue: "4.hand",
      stage: (t) => <Actors4 T={10.3 + t} />,
      from: [-1.15, 1.28, 23.9],
      to: [-1.25, 1.2, 24.4],
      target: [0.1, 2.0, 27.3],
      targetTo: [0.1, 1.6, 27.3],
      fov: 46,
      ease: "inOutCubic",
      handheld: 0.01,
      impacts: [{ at: 1.6, amp: 0.03 }],
      note: "One of them came down and took it out of my hand. The wing fills the top third and the lamp is simply gone from the frame: the impact is the light leaving.",
    },
    {
      cue: "4.dark",
      stage: (t) => <Actors4 T={12.7 + t} />,
      from: [0, 1.62, 19.8],
      to: [0, 1.6, 20.8],
      target: [0, 2.3, 26.0],
      fov: 48,
      ease: "linear",
      handheld: 0.006,
      look: "overworld-night",
      note: "The street went dark. Down the street, every lamp out at once — the whole row in one frame, so the loss is a place, not an object.",
    },
    {
      cue: "4.mum",
      stage: (t) => <Actors4 T={13.667 + t} />,
      from: [-0.9, 1.34, 17.2],
      to: [-0.98, 1.32, 17.5],
      target: [-3.72, 1.32, 18.1],
      fov: 44,
      ease: "inOutSine",
      handheld: 0.005,
      look: "overworld-night",
      note: "And my mum was standing in the doorway, in the dark. She is the reveal, so the frame holds still and lets the brain find her.",
    },
  ],
});

import { storyScene } from "../../engine";
import type React from "react";
import { Boy, HandLantern, Spider } from "./actors";
import { DOOR, win, timing } from "./shared";

const Actors6: React.FC<{ T: number }> = ({ T }) => {
  const t = T;
    const dry = win(t, 10.0, 11.6);
    return (
      <group>
        <Spider position={[0.85, 0, 25.5]} rotationY={Math.PI * 1.06} apron knit={t < 2.8} />
        <Boy position={[1.55, 0, 24.6]} rotationY={Math.PI * 0.94} face={t > 7.6 ? "worried" : "blank"} />
        {dry > 0.01 ? <Spider position={DOOR} rotationY={Math.PI / 2} apron scale={1.02} /> : null}
        <HandLantern at={[-3.42, 0.98, 17.0]} lit={t > 15.8} />
      </group>
    );
};

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Now",
  shots: [
    {
      cue: "6.wash",
      stage: (t) => <Actors6 T={0.0 + t} />,
      from: [0, 1.42, 21.8],
      to: [0.1, 1.42, 22.6],
      target: [0.6, 1.6, 25.4],
      fov: 46,
      ease: "inOutSine",
      handheld: 0.005,
      note: "In the morning she was washing. Day look, her at the line, sheets between her legs: the same animal, ordinary, harmless, in the light.",
    },
    {
      cue: "6.wrung",
      stage: (t) => <Actors6 T={1.633 + t} />,
      from: [-0.95, 1.5, 24.0],
      to: [-0.8, 1.46, 24.3],
      target: [0.55, 1.5, 25.4],
      fov: 41,
      ease: "linear",
      handheld: 0.004,
      note: "She wrung out the sheets. Water on the cobbles, six needles now two hands: the domestic detail that pays off the knitting.",
    },
    {
      cue: "6.remembers",
      stage: (t) => <Actors6 T={2.8 + t} />,
      from: [0.65, 1.36, 23.7],
      to: [0.5, 1.34, 23.9],
      target: [0.45, 1.28, 25.2],
      fov: 40,
      ease: "linear",
      handheld: 0.004,
      note: "She never remembers the night. Her eyes, all eight of them, at lens height and friendly: the film has to forgive her before the boy does.",
    },
    {
      cue: "6.told",
      stage: (t) => <Actors6 T={4.367 + t} />,
      from: [1.5, 1.36, 23.5],
      to: [1.35, 1.32, 23.8],
      target: [1.0, 1.06, 24.9],
      fov: 42,
      ease: "inOutSine",
      handheld: 0.005,
      note: "I have not told her. Him, in the yard, telling the camera: the only line in the film he says to us and not to the street.",
    },
    {
      cue: "6.list",
      stage: (t) => <Actors6 T={5.5 + t} />,
      from: [0, 1.5, 25.6],
      to: [0, 1.52, 24.2],
      target: [0, 2.2, 17.6],
      fov: 48,
      ease: "inOutCubic",
      handheld: 0.006,
      note: "So this is the list. Pulling back down the street past the lamps and her doorway: the map of the film in one frame, for the rewatchers.",
    },
    {
      cue: "6.one",
      stage: (t) => <Actors6 T={6.667 + t} />,
      from: [-2.55, 1.95, 21.6],
      to: [-2.7, 2.0, 22.1],
      target: [-3.7, 3.2, 23.0],
      fov: 40,
      ease: "inOutSine",
      handheld: 0.004,
      note: "One: never be out after the lamps go cold. A lamp head, filling the top of the frame: the rule is an object, and objects are rememberable.",
    },
    {
      cue: "6.two",
      stage: (t) => <Actors6 T={8.933 + t} />,
      from: [0, 1.32, 20.2],
      to: [-0.2, 1.3, 20.9],
      target: [-0.45, 1.1, 22.4],
      fov: 45,
      ease: "inOutSine",
      handheld: 0.005,
      look: "overworld-night",
      note: "Two: if your street goes dark, do not run. Night again for one shot only, him standing in the middle of the road with nothing behind him.",
    },
    {
      cue: "6.still",
      stage: (t) => <Actors6 T={11.033 + t} />,
      from: [-1.15, 1.4, 17.0],
      to: [-1.35, 1.4, 17.3],
      target: [-3.72, 1.35, 18.1],
      fov: 42,
      ease: "inOutSine",
      handheld: 0.003,
      look: "overworld-night",
      note: "Stand still. She will step over you. Locked on the doorway, her eyes the only light, and the frame fades on the thing that has been true the whole time.",
    },
    {
      cue: "6.sub",
      stage: (t) => <Actors6 T={12.933 + t} />,
      from: [0.0, 1.5, 16.2],
      to: [0.0, 1.5, 16.9],
      target: [-2.6, 1.35, 17.6],
      fov: 44,
      ease: "inOutSine",
      handheld: 0.004,
      note: "The ask, over the picture that explains it: him in daylight with the lantern, her legs in the doorway behind him. Nothing new is promised; the rule is the promise.",
    },
  ],
});

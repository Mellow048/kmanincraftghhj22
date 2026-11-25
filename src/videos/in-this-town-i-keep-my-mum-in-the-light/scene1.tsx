import { storyScene } from "../../engine";
import type React from "react";
import { Boy, ExtraSleeves, HandLantern, Spider } from "./actors";
import { BOY, Chairs, DOOR, win, timing } from "./shared";

const Actors1: React.FC<{ T: number }> = ({ T }) => {
  const t = T;
    return (
      <group>
        <Boy position={BOY} rotationY={2.15} face={t > 8.4 ? "worried" : "blank"} headYaw={-0.25 + 0.15 * win(t, 4.0, 5.2)} />
        <ExtraSleeves at={BOY} rotY={2.15} />
        <Spider position={DOOR} rotationY={Math.PI / 2} apron knit lantern={t < 2.3} />
        <HandLantern at={[-3.5, 0.95, 17.1]} />
        <group>
          <Chairs />
          <Spider position={[0, 0, -2.5]} rotationY={0} apron scale={1.05} />
        </group>
      </group>
    );
};

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Street",
  shots: [
    {
      cue: "1.keep",
      stage: (t) => <Actors1 T={0.0 + t} />,
      from: [-0.95, 1.42, 13.2],
      to: [-1.2, 1.4, 14.4],
      target: [-2.95, 1.2, 17.5],
      targetTo: [-3.1, 1.25, 17.8],
      fov: 46,
      ease: "inOutSine",
      handheld: 0.006,
      note: "Frame one: he is in the middle of the road with a lantern, her pink apron filling the doorway behind him. The push hides the cut on the title line.",
    },
    {
      cue: "1.spider",
      stage: (t) => <Actors1 T={1.967 + t} />,
      from: [-1.85, 0.82, 16.3],
      to: [-1.95, 0.9, 17.1],
      target: [-3.7, 1.15, 18.1],
      fov: 44,
      ease: "inOutSine",
      handheld: 0.005,
      note: "She is a spider. Low and close: the eight legs fill the bottom of the frame and the apron sits above them.",
    },
    {
      cue: "1.six",
      stage: (t) => <Actors1 T={3.0 + t} />,
      from: [-2.55, 1.2, 17.2],
      to: [-2.72, 1.16, 17.35],
      target: [-3.74, 1.05, 18.12],
      fov: 38,
      ease: "linear",
      handheld: 0.004,
      note: "Six needles. The piece of evidence the viewer can count, so the voice does not have to insist.",
    },
    {
      cue: "1.jumper",
      stage: (t) => <Actors1 T={4.1 + t} />,
      from: [-1.5, 1.32, 15.3],
      to: [-1.72, 1.26, 15.75],
      target: [-2.6, 1.02, 16.85],
      targetTo: [-2.62, 1.12, 16.9],
      fov: 42,
      arc: 0.3,
      ease: "inOutCubic",
      note: "One of them is always mine. The extra sleeves on his arms — the joke is in the costume, not in the line.",
    },
    {
      cue: "1.evening",
      stage: (t) => <Actors1 T={6.167 + t} />,
      from: [0.3, 1.6, 1.4],
      to: [0.15, 1.55, 2.6],
      target: [0, 1.35, -4.0],
      fov: 48,
      ease: "inOutCubic",
      handheld: 0.008,
      note: "Parents' evening, staged at the bottom of the street: three neighbours up on chairs, her in the road. The push makes him remember it properly.",
    },
    {
      cue: "1.chairs",
      stage: (t) => <Actors1 T={7.233 + t} />,
      from: [-1.95, 1.55, -3.1],
      to: [-2.05, 1.6, -3.5],
      target: [-2.6, 1.9, -5.0],
      fov: 40,
      ease: "inOutSine",
      handheld: 0.006,
      note: "Everybody stood on their chairs. A neighbour's face at head height, looking down at something out of frame — the joke lands without showing her.",
    },
  ],
});

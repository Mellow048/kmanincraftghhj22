import { storyScene } from "../../engine";
import type React from "react";
import { Boy, ExtraSleeves, HandLantern, Spider } from "./actors";
import { BOY, Chairs, DOOR, HoldingIn, win, timing } from "./shared";

const Actors2: React.FC<{ T: number }> = ({ T }) => {
  const t = T;
    const night = t > 2.6 && t < 5.6;
    const holding = win(t, 21.6, 22.2);
    return (
      <group>
        {!night ? <Spider position={DOOR} rotationY={Math.PI / 2} apron knit={t > 5.4 && t < 8.4} /> : null}
        <HandLantern at={[-3.5, 0.95, 17.1]} />
        {(!night && t < 12.5) || t > 14 ? (
          <group>
            <Boy
              position={t > 19 ? [-2.62, 0, 17.15] : BOY}
              rotationY={t > 19 ? 2.5 : 2.15}
              face={t > 18 ? "worried" : "blank"}
              headYaw={t > 19 ? 2.4 : -0.2}
            />
            <ExtraSleeves at={t > 19 ? [-2.62, 0, 17.15] : BOY} rotY={t > 19 ? 2.5 : 2.15} />
          </group>
        ) : null}
        <Chairs />
        <Spider position={[0, 0, -2.5]} rotationY={0} apron scale={1.05} />
        {holding > 0.01 ? <HoldingIn at={[-3.84, 0, 18.1]} /> : null}
      </group>
    );
};

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The Rule",
  shots: [
    {
      cue: "2.light",
      stage: (t) => <Actors2 T={0.0 + t} />,
      from: [-1.1, 1.36, 11.6],
      to: [-1.18, 1.36, 15.2],
      target: [-3.6, 1.35, 18.0],
      fov: 46,
      ease: "linear",
      handheld: 0.007,
      note: "A spider in the light does nothing at all. Ten metres of tracking at a walking pace: nothing happens, for three seconds, on purpose.",
    },
    {
      cue: "2.dark",
      stage: (t) => <Actors2 T={2.367 + t} />,
      from: [-1.0, 1.5, 16.4],
      to: [-1.06, 1.45, 17.5],
      target: [-3.72, 1.25, 18.1],
      fov: 46,
      ease: "inOutSine",
      handheld: 0.006,
      look: "overworld-night",
      note: "In the dark, a spider does what it likes. Same frame, same lens, night: the doorway is empty. The only thing that changed is the thing that matters.",
    },
    {
      cue: "2.knits",
      stage: (t) => <Actors2 T={4.167 + t} />,
      from: [-2.6, 1.24, 17.15],
      to: [-2.78, 1.18, 17.3],
      target: [-3.72, 1.08, 18.1],
      fov: 37,
      ease: "linear",
      handheld: 0.004,
      note: "One jumper a minute. Needles close, the wool tight in the frame: he is proud of this and the pride has to be visible.",
    },
    {
      cue: "2.sleeves",
      stage: (t) => <Actors2 T={5.7 + t} />,
      from: [-1.45, 1.3, 15.25],
      to: [-1.68, 1.24, 15.7],
      target: [-2.58, 1.0, 16.8],
      fov: 43,
      arc: 0.25,
      ease: "inOutCubic",
      handheld: 0.006,
      note: "I wear it anyway. The three spare sleeves swing as he turns — costume joke, no line needed.",
    },
    {
      cue: "2.evening",
      stage: (t) => <Actors2 T={8.1 + t} />,
      from: [0.35, 1.62, 1.2],
      to: [0.1, 1.55, 2.8],
      target: [0, 1.4, -4.2],
      fov: 48,
      ease: "inOutCubic",
      handheld: 0.009,
      note: "Parents' evening again, but held longer: three neighbours on chairs, her shoulders at their knee height in the road. The scale of her is the punchline.",
    },
    {
      cue: "2.back",
      stage: (t) => <Actors2 T={10.7 + t} />,
      from: [-1.15, 1.45, 13.6],
      to: [-1.25, 1.45, 14.4],
      target: [-3.68, 1.3, 18.0],
      fov: 45,
      ease: "inOutSine",
      handheld: 0.006,
      note: "She has not been back. The street at dusk with the doorway empty and the lamps already on: time passing with nothing to say.",
    },
    {
      cue: "2.step",
      stage: (t) => <Actors2 T={13.267 + t} />,
      from: [-2.85, 0.62, 17.5],
      to: [-2.98, 0.6, 17.72],
      target: [-3.72, 0.24, 18.05],
      fov: 40,
      ease: "linear",
      handheld: 0.004,
      note: "She never comes out to the step. The threshold itself, one plank of it: the film's lid, held shut.",
    },
    {
      cue: "2.thought",
      stage: (t) => <Actors2 T={14.667 + t} />,
      from: [-1.85, 1.36, 16.2],
      to: [-2.0, 1.28, 16.55],
      target: [-3.05, 1.0, 17.55],
      targetTo: [-3.3, 1.25, 17.9],
      fov: 44,
      ease: "inOutSine",
      handheld: 0.005,
      note: "I thought she did not like being near me. Him on the kerb, back to the door, telling it to the road instead of to her.",
    },
    {
      cue: "2.legs",
      stage: (t) => <Actors2 T={16.267 + t} />,
      from: [-2.35, 1.5, 18.9],
      to: [-2.6, 1.45, 18.45],
      target: [-3.86, 1.45, 18.12],
      targetTo: [-3.84, 1.3, 18.14],
      fov: 42,
      ease: "inOutCubic",
      handheld: 0.004,
      note: "Then I saw her legs, flat against the frame, holding her in. The reveal: the thing he read as dislike is her arms braced. Two per side, all eight of them, pressed on the wood.",
    },
  ],
});

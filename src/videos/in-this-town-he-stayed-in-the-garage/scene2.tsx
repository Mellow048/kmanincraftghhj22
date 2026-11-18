import { storyScene } from "../../engine";
import { Car, Hero, PLACE, Tire, Wrench, timing } from "./kit";

const CAR: [number, number, number] = [PLACE.yard[0], 0, PLACE.yard[2] + 1.4];

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The hedge and the training",
  shots: [
    {
      cue: "4.jack",
      note: "The car is up on the jack and he is sure. Too sure.",
      zone: "village",
      look: "overworld-day",
      stage: () => (
        <>
          <Car position={CAR} lift={0.7} />
          <Hero position={[CAR[0] - 1.1, 0, CAR[2]]} rotationY={1.4} face="grin" animation="push" />
        </>
      ),
      from: [CAR[0] - 2.6, 1.5, CAR[2] + 2.4],
      to: [CAR[0] - 1.8, 1.3, CAR[2] + 1.6],
      target: [CAR[0], 0.9, CAR[2]],
      fov: 38,
    },
    {
      cue: "4.tire",
      note: "The tire is off and held up. He thinks that is the job done.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} lift={0.7} />
          <Hero position={[CAR[0] - 1.3, 0, CAR[2] + 0.4]} rotationY={0.6} face="happy" animation="reachUp" />
          <Tire position={[CAR[0] - 0.7, 1.5, CAR[2] + 0.2]} />
        </>
      ),
      from: [CAR[0] - 2.4, 1.6, CAR[2] + 2],
      to: [CAR[0] - 1.6, 1.5, CAR[2] + 1.4],
      target: [CAR[0] - 0.6, 1.4, CAR[2]],
      fov: 36,
    },
    {
      cue: "4.roll",
      note: "The car leaves the jack. He is still where he was, scared.",
      zone: "village",
      stage: () => (
        <>
          <Car position={[CAR[0] + 1.6, 0, CAR[2] - 0.4]} rotationY={0.3} />
          <Hero position={[CAR[0] - 1.2, 0, CAR[2] + 0.6]} rotationY={0.5} face="scared" animation="scared" />
        </>
      ),
      from: [CAR[0] - 1, 1.6, CAR[2] + 3.4],
      to: [CAR[0] + 0.6, 1.4, CAR[2] + 2.6],
      target: [CAR[0] + 1.4, 0.8, CAR[2] - 0.2],
      fov: 40,
    },
    {
      cue: "4.hedge",
      note: "The car, in the hedge, slow, like it meant to stop there.",
      zone: "village",
      stage: () => <Car position={[PLACE.hedge[0] - 1.2, 0, PLACE.hedge[2] - 0.6]} rotationY={0.5} />,
      from: [PLACE.hedge[0] - 3, 1.7, PLACE.hedge[2] + 2.4],
      to: [PLACE.hedge[0] - 2, 1.4, PLACE.hedge[2] + 1.6],
      target: [PLACE.hedge[0], 0.8, PLACE.hedge[2]],
      fov: 38,
    },
    {
      cue: "4.hold",
      note: "He is still holding the tire. The car is not in this shot.",
      zone: "village",
      stage: () => (
        <>
          <Hero position={[0, 0, 0]} rotationY={0.1} face="ouch" animation="reachUp" />
          <Tire position={[0.35, 1.45, 0.3]} />
        </>
      ),
      from: [1.1, 1.5, 2.4],
      to: [0.5, 1.4, 2],
      target: [0.2, 1.3, 0.1],
      fov: 32,
    },
    {
      cue: "4.almost",
      note: "He shouts at the hedge. Almost. The face is the shout.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.3} face="angry" animation="talk" />,
      from: [0.6, 1.4, 2.2],
      to: [0.2, 1.35, 1.8],
      target: [0, 1.4, 0],
      fov: 30,
    },
    {
      cue: "4.learn",
      note: "The grin is gone. He still had a lot to learn.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={-0.1} face="uneasy" animation="idle" />,
      from: [-0.3, 1.5, 2.3],
      to: [0, 1.45, 1.9],
      target: [0, 1.4, 0],
      fov: 30,
    },
    {
      cue: "5.bolt",
      note: "One rusty bolt, turned slow. The wrench is barely moving.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] + 0.5, 0, CAR[2] + 1.4]} rotationY={Math.PI} face="calm" animation="leanOver" />
          <Wrench position={[CAR[0], 1.15, CAR[2] + 0.9]} spin={1.2} />
        </>
      ),
      from: [CAR[0] + 1.6, 1.5, CAR[2] + 2.6],
      to: [CAR[0] + 0.8, 1.35, CAR[2] + 2.1],
      target: [CAR[0], 1.1, CAR[2] + 0.6],
      fov: 36,
    },
    {
      cue: "5.fast",
      note: "Then faster. The wheel is off and the wrench is a blur.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] - 0.9, 0, CAR[2] + 0.2]} rotationY={1.2} face="grin" animation="reach" />
          <Tire position={[CAR[0] - 1.5, 0.4, CAR[2] + 0.8]} />
          <Wrench position={[CAR[0] - 0.4, 0.9, CAR[2] + 0.5]} spin={8} />
        </>
      ),
      from: [CAR[0] - 2.4, 1.4, CAR[2] + 2.2],
      to: [CAR[0] - 1.6, 1.2, CAR[2] + 1.5],
      target: [CAR[0] - 0.6, 0.9, CAR[2]],
      fov: 36,
    },
    {
      cue: "5.hus",
      note: "The training chant. The wrench speeds up with the hus.",
      zone: "village",
      stage: () => (
        <>
          <Hero position={[0.3, 0, 0.4]} rotationY={Math.PI * 0.9} face="grin" animation="reach" />
          <Wrench position={[-0.1, 1.2, 0.2]} spin={20} />
        </>
      ),
      from: [0.9, 1.4, 1.8],
      to: [0.4, 1.3, 1.3],
      target: [0, 1.15, 0.1],
      fov: 32,
    },
    {
      cue: "5.back",
      note: "The headlight is in backwards. He is still reaching for it.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={0.4} light={0.2} />
          <Hero position={[CAR[0] - 0.8, 0, CAR[2] + 1.5]} rotationY={Math.PI} face="uneasy" animation="reach" />
        </>
      ),
      from: [CAR[0] + 0.4, 1.3, CAR[2] + 2.8],
      to: [CAR[0] - 0.2, 1.2, CAR[2] + 2.3],
      target: [CAR[0] - 0.3, 1, CAR[2] + 1.2],
      fov: 34,
    },
    {
      cue: "5.face",
      note: "Close. The lamp is in his own face. He flinches.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0} face="ouch" animation="scared" />,
      from: [0.2, 1.45, 2.1],
      to: [0, 1.4, 1.7],
      target: [0, 1.45, 0],
      fov: 28,
    },
    {
      cue: "5.fix",
      note: "He turns it around. He does not quit.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={0.5} />
          <Hero position={[CAR[0] + 0.6, 0, CAR[2] + 1.4]} rotationY={Math.PI} face="brave" animation="reach" />
        </>
      ),
      from: [CAR[0] - 1.2, 1.4, CAR[2] + 2.6],
      to: [CAR[0] - 0.4, 1.3, CAR[2] + 2.1],
      target: [CAR[0] + 0.3, 1.1, CAR[2] + 0.8],
      fov: 36,
    },
    {
      cue: "5.smoke",
      note: "The engine coughs smoke at him. He is in it.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0], 0, CAR[2] + 1.6]} rotationY={Math.PI} face="ouch" animation="cower" />
        </>
      ),
      from: [CAR[0] + 1.4, 1.6, CAR[2] + 3],
      to: [CAR[0] + 0.6, 1.4, CAR[2] + 2.4],
      target: [CAR[0], 1.2, CAR[2] + 0.6],
      fov: 36,
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Car, Hero, PLACE, Tire, Wrench, timing } from "./kit";

const CAR: [number, number, number] = [PLACE.yard[0], 0, PLACE.yard[2] + 1.4];
const WORK = [CAR[0], 1.1, CAR[2] + 0.2] as [number, number, number];

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
          <Car position={CAR} lift={0.55} />
          <Hero position={[CAR[0] - 1.35, 0, CAR[2] + 0.3]} rotationY={1.15} face="grin" animation="push" />
        </>
      ),
      ...cam.push({ on: [CAR[0] - 0.3, 0.9, CAR[2]], dist: 4.6, to: 3.8, yaw: -48, pitch: 16, fov: 40 }),
    },
    {
      cue: "4.tire",
      note: "The tire is off and held up. He thinks that is the job done.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} lift={0.45} />
          <Hero position={[CAR[0] - 1.2, 0, CAR[2] + 0.8]} rotationY={0.45} face="happy" animation="reachUp" />
          <Tire position={[CAR[0] - 0.35, 1.35, CAR[2] + 1.15]} />
        </>
      ),
      ...cam.push({ on: [CAR[0] - 0.6, 1.2, CAR[2] + 0.7], dist: 4.2, to: 3.4, yaw: -28, pitch: 10, fov: 38 }),
    },
    {
      cue: "4.roll",
      note: "The car leaves the jack. He is still where he was, scared.",
      zone: "village",
      stage: () => (
        <>
          <Car position={[CAR[0] + 1.8, 0, CAR[2] - 0.2]} rotationY={0.35} />
          <Hero position={[CAR[0] - 1.3, 0, CAR[2] + 1.1]} rotationY={0.5} face="scared" animation="scared" />
        </>
      ),
      ...cam.push({ on: [CAR[0] + 0.4, 1.0, CAR[2] + 0.2], dist: 5.4, to: 4.4, yaw: 20, pitch: 14, fov: 42 }),
    },
    {
      cue: "4.hedge",
      note: "The car, in the hedge, slow, like it meant to stop there.",
      zone: "village",
      stage: () => <Car position={[PLACE.hedge[0] - 1.4, 0, PLACE.hedge[2] - 0.8]} rotationY={0.4} />,
      ...cam.push({ on: [PLACE.hedge[0] - 0.4, 0.8, PLACE.hedge[2] - 0.2], dist: 4.8, to: 3.9, yaw: -30, pitch: 12, fov: 40 }),
    },
    {
      cue: "4.hold",
      note: "He is still holding the tire. The car is not in this shot.",
      zone: "village",
      stage: () => (
        <>
          <Hero position={[0, 0, 0]} rotationY={0.1} face="ouch" animation="reachUp" />
          <Tire position={[0.85, 1.15, 0.15]} />
        </>
      ),
      ...cam.push({ on: [0.3, 1.3, 0.05], dist: 3.1, to: 2.6, yaw: 18, pitch: 6, fov: 34 }),
    },
    {
      cue: "4.almost",
      note: "He shouts at the hedge. Almost. The face is the shout.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.12} face="angry" animation="talk" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.5, to: 2.2, yaw: 8, pitch: 2, fov: 30 }),
    },
    {
      cue: "4.learn",
      note: "The grin is gone. He still had a lot to learn.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={-0.05} face="uneasy" animation="idle" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.55, to: 2.2, yaw: -8, pitch: 3, fov: 30 }),
    },
    {
      cue: "5.bolt",
      note: "One rusty bolt, turned slow. The wrench is barely moving.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] + 0.85, 0, CAR[2] + 1.05]} rotationY={-0.7} face="calm" animation="leanOver" />
          <Wrench position={[CAR[0] + 0.25, 1.2, CAR[2] + 0.55]} spin={1.2} />
        </>
      ),
      ...cam.push({ on: WORK, dist: 4.0, to: 3.3, yaw: 46, pitch: 14, fov: 38 }),
    },
    {
      cue: "5.fast",
      note: "Then faster. The wheel is off and the wrench is a blur.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] - 1.05, 0, CAR[2] + 0.55]} rotationY={0.9} face="grin" animation="reach" />
          <Tire position={[CAR[0] - 1.7, 0.45, CAR[2] + 1.1]} />
          <Wrench position={[CAR[0] - 0.35, 1.15, CAR[2] + 0.4]} spin={10} />
        </>
      ),
      ...cam.push({ on: [CAR[0] - 0.4, 1.05, CAR[2] + 0.3], dist: 4.2, to: 3.4, yaw: -40, pitch: 12, fov: 38 }),
    },
    {
      cue: "5.hus",
      note: "The training chant. The wrench speeds up with the hus.",
      zone: "village",
      stage: () => (
        <>
          <Hero position={[0.15, 0, 0.15]} rotationY={0.7} face="grin" animation="reach" />
          <Wrench position={[-0.35, 1.25, 0.05]} spin={16} />
        </>
      ),
      ...cam.push({ on: [0, 1.25, 0.05], dist: 2.9, to: 2.45, yaw: 36, pitch: 8, fov: 34 }),
    },
    {
      cue: "5.back",
      note: "The headlight is in backwards. He is still reaching for it.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={0.35} light={0.3} />
          <Hero position={[CAR[0] + 0.7, 0, CAR[2] + 1.2]} rotationY={-0.4} face="uneasy" animation="reach" />
        </>
      ),
      ...cam.push({ on: [CAR[0] + 0.2, 1.1, CAR[2] + 0.5], dist: 4.0, to: 3.3, yaw: 50, pitch: 12, fov: 38 }),
    },
    {
      cue: "5.face",
      note: "Close. The lamp is in his own face. He flinches.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0} face="ouch" animation="scared" />,
      ...cam.push({ on: [0, 1.45, 0], dist: 2.35, to: 2.1, yaw: 4, pitch: 0, fov: 28 }),
    },
    {
      cue: "5.fix",
      note: "He turns it around. He does not quit.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={0.45} />
          <Hero position={[CAR[0] - 0.9, 0, CAR[2] + 1.05]} rotationY={0.55} face="brave" animation="reach" />
        </>
      ),
      ...cam.push({ on: [CAR[0] - 0.2, 1.1, CAR[2] + 0.4], dist: 4.1, to: 3.4, yaw: -32, pitch: 12, fov: 38 }),
    },
    {
      cue: "5.smoke",
      note: "The engine coughs smoke at him. He is in it.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] + 0.2, 0, CAR[2] + 1.35]} rotationY={Math.PI * 0.85} face="ouch" animation="cower" />
        </>
      ),
      ...cam.push({ on: [CAR[0], 1.2, CAR[2] + 0.6], dist: 4.0, to: 3.3, yaw: 24, pitch: 10, fov: 38 }),
    },
  ],
});

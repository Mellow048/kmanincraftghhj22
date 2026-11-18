import { cam, storyScene } from "../../engine";
import { Boss, Car, Hero, Pal, PLACE, Tv, Wrench, timing } from "./kit";

const CAR: [number, number, number] = [PLACE.yard[0], 0, PLACE.yard[2] + 1.4];
/** The work, seen from the front corner. The lens stays outside the head and outside the car. */
const BAY = [CAR[0], 1.15, CAR[2] + 0.35] as [number, number, number];

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The hook and the dream",
  shots: [
    {
      cue: "1.town",
      note: "The hook is already the fix: hood up, wrench a blur, and he is already on the chant.",
      zone: "village",
      look: "overworld-day",
      stage: () => (
        <>
          <Car position={CAR} hood={1} light={0.5} />
          <Hero position={[CAR[0] - 1.25, 0, CAR[2] + 0.85]} rotationY={0.85} face="grin" animation="reach" />
          <Wrench position={[CAR[0] - 0.45, 1.45, CAR[2] + 0.55]} spin={18} />
        </>
      ),
      ...cam.push({ on: [CAR[0] - 0.45, 1.25, CAR[2] + 0.4], dist: 4.2, to: 3.5, yaw: -42, pitch: 12, fov: 40 }),
    },
    {
      cue: "1.catch",
      note: "The engine has caught. He stays on the car, not a face before the result.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={0.85} running={1} light={1} />
          <Hero position={[CAR[0] + 0.9, 0, CAR[2] + 1.15]} rotationY={-0.6} face="happy" animation="idle" />
        </>
      ),
      ...cam.push({ on: [CAR[0] + 0.3, 1.05, CAR[2] + 0.2], dist: 4.4, to: 3.6, yaw: 58, pitch: 14, fov: 40 }),
    },
    {
      cue: "2.love",
      note: "The party, three of them, already moving. He is not in it.",
      zone: "village",
      stage: () => (
        <>
          <Pal shirt="#d23b6e" position={[-1.1, 0, 0.2]} rotationY={0.3} face="laugh" animation="wave" />
          <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0.2, 0, 0]} rotationY={-0.15} face="grin" animation="talk" />
          <Pal shirt="#2f9a62" position={[1.3, 0, 0.35]} rotationY={0.1} face="happy" animation="wave" />
        </>
      ),
      ...cam.push({ on: [0.1, 1.25, 0.15], dist: 4.6, to: 3.7, yaw: 18, pitch: 8, fov: 42 }),
    },
    {
      cue: "2.invite",
      note: "One friend, close, waving him out of the garage.",
      zone: "village",
      stage: () => <Pal shirt="#d23b6e" position={[0, 0, 0]} rotationY={0.05} face="smile" animation="wave" />,
      ...cam.push({ on: [0, 1.4, 0], dist: 2.7, to: 2.3, yaw: 10, pitch: 4, fov: 32 }),
    },
    {
      cue: "2.once",
      note: "The blue shirt, in his face: you only live once.",
      zone: "village",
      stage: () => <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0, 0, 0]} rotationY={0} face="grin" animation="talk" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.55, to: 2.25, yaw: -12, pitch: 3, fov: 30 }),
    },
    {
      cue: "2.hide",
      note: "Green shirt pointing. Stop hiding in that garage.",
      zone: "village",
      stage: () => <Pal shirt="#2f9a62" position={[0, 0, 0]} rotationY={0.1} face="angry" animation="point" />,
      ...cam.push({ on: [0, 1.4, 0], dist: 2.6, to: 2.25, yaw: 14, pitch: 2, fov: 30 }),
    },
    {
      cue: "2.hood",
      note: "He does not move. Still under the hood, hands in the engine.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] - 0.85, 0, CAR[2] + 0.7]} rotationY={0.7} face="calm" animation="leanOver" />
        </>
      ),
      ...cam.push({ on: [CAR[0] - 0.2, 1.15, CAR[2] + 0.3], dist: 4.2, to: 3.5, yaw: -36, pitch: 12, fov: 38 }),
    },
    {
      cue: "2.light",
      note: "Night. Their party is one light in a window. He is still on the car.",
      zone: "village",
      look: "overworld-night",
      stage: () => (
        <>
          <Car position={CAR} hood={1} light={0.6} />
          <Hero position={[CAR[0] + 0.2, 0, CAR[2] + 1.2]} rotationY={Math.PI} face="calm" animation="leanOver" />
        </>
      ),
      ...cam.push({ on: [CAR[0], 1.4, CAR[2]], dist: 7.2, to: 5.8, yaw: 24, pitch: 10, fov: 44 }),
    },
    {
      cue: "2.dream",
      note: "His face, close. The dream is his, not theirs.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.05} face="smile" animation="idle" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.5, to: 2.2, yaw: 6, pitch: 2, fov: 30 }),
    },
    {
      cue: "3.tv",
      note: "The television, and a mechanic small inside the glass, turning a key.",
      zone: "room",
      look: "overworld-night",
      stage: () => (
        <>
          <Tv position={[0, 1.55, -1.4]} on={1} />
          <Boss position={[0, 0.15, -1.15]} rotationY={0} face="calm" animation="reach" scale={0.42} />
        </>
      ),
      ...cam.push({ on: [0, 1.45, -1.2], dist: 3.6, to: 3.05, yaw: 12, pitch: 2, fov: 34 }),
    },
    {
      cue: "3.start",
      note: "He leans all the way in. The dead car on the screen has started.",
      zone: "room",
      stage: () => <Hero position={[0, 0, 0.2]} rotationY={Math.PI * 0.92} face="wow" animation="leanOver" />,
      ...cam.push({ on: [0, 1.3, 0.15], dist: 3.1, to: 2.6, yaw: 40, pitch: 8, fov: 34 }),
    },
    {
      cue: "3.want",
      note: "Close on him. He wants to be the mechanic, not the guest.",
      zone: "room",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.08} face="smile" animation="talk" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.45, to: 2.15, yaw: 8, pitch: 2, fov: 30 }),
    },
    {
      cue: "3.any",
      note: "Same face, a new thought: any car, not just this one.",
      zone: "room",
      stage: () => <Hero position={[0, 0, 0]} rotationY={-0.06} face="grin" animation="idle" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.5, to: 2.2, yaw: -10, pitch: 3, fov: 30 }),
    },
    {
      cue: "3.sleeve",
      note: "Sleeves up. The decision is in the arms, not a speech.",
      zone: "village",
      look: "overworld-day",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.15} face="brave" animation="reach" />,
      ...cam.push({ on: [0, 1.25, 0], dist: 2.8, to: 2.35, yaw: 22, pitch: 6, fov: 32 }),
    },
    {
      cue: "3.walk",
      note: "He walks back under the open hood. The car is the place.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] - 1.6, 0, CAR[2] + 2.1]} rotationY={2.4} face="calm" animation="walk" />
        </>
      ),
      ...cam.push({ on: [CAR[0] - 0.4, 1.15, CAR[2] + 1.1], dist: 5.2, to: 4.2, yaw: 30, pitch: 12, fov: 40 }),
    },
  ],
});

import { storyScene } from "../../engine";
import { Boss, Car, Hero, Pal, PLACE, Tv, Wrench } from "./kit";
import { timing } from "./kit";

const CAR: [number, number, number] = [PLACE.yard[0], 0, PLACE.yard[2] + 1.4];

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
          <Car position={CAR} hood={0.9} light={0.4} />
          <Hero position={[CAR[0] + 0.4, 0, CAR[2] + 1.6]} rotationY={Math.PI} face="grin" animation="reach" />
          <Wrench position={[CAR[0] + 0.1, 1.35, CAR[2] + 1.15]} spin={18} />
        </>
      ),
      from: [CAR[0] + 0.9, 1.45, CAR[2] + 2.7],
      to: [CAR[0] + 0.2, 1.35, CAR[2] + 2.1],
      target: [CAR[0], 1.2, CAR[2] + 0.6],
      fov: 40,
    },
    {
      cue: "1.catch",
      note: "The engine has caught. He stays on the car, not a face before the result.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={0.9} running={1} light={1} />
          <Hero position={[CAR[0] + 0.5, 0, CAR[2] + 1.5]} rotationY={Math.PI} face="happy" animation="idle" />
        </>
      ),
      from: [CAR[0] + 1.6, 1.3, CAR[2] + 2.4],
      to: [CAR[0] + 1.2, 1.2, CAR[2] + 2],
      target: [CAR[0], 1.1, CAR[2] + 0.4],
      fov: 38,
    },
    {
      cue: "2.love",
      note: "The party, three of them, already moving. He is not in it.",
      zone: "village",
      stage: () => (
        <>
          <Pal shirt="#d23b6e" position={[-1.2, 0, 0.4]} rotationY={0.4} face="laugh" animation="wave" />
          <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0.4, 0, 0.1]} rotationY={-0.3} face="grin" animation="talk" />
          <Pal shirt="#2f9a62" position={[1.5, 0, 0.6]} rotationY={0.2} face="happy" animation="wave" />
        </>
      ),
      from: [2.4, 1.6, 3.2],
      to: [-0.6, 1.5, 2.6],
      target: [0.2, 1.2, 0.3],
      fov: 42,
    },
    {
      cue: "2.invite",
      note: "One friend, close, waving him out of the garage.",
      zone: "village",
      stage: () => <Pal shirt="#d23b6e" position={[0, 0, 0]} rotationY={0.1} face="smile" animation="wave" />,
      from: [0.7, 1.5, 2.6],
      to: [0.3, 1.45, 2.2],
      target: [0, 1.35, 0],
      fov: 34,
    },
    {
      cue: "2.once",
      note: "The blue shirt, in his face: you only live once.",
      zone: "village",
      stage: () => <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0, 0, 0]} rotationY={0} face="grin" animation="talk" />,
      from: [-0.6, 1.4, 2.4],
      to: [-0.2, 1.35, 2],
      target: [0, 1.4, 0],
      fov: 32,
    },
    {
      cue: "2.hide",
      note: "Green shirt pointing. Stop hiding in that garage.",
      zone: "village",
      stage: () => <Pal shirt="#2f9a62" position={[0, 0, 0]} rotationY={0.2} face="angry" animation="point" />,
      from: [0.5, 1.35, 2.3],
      to: [0.15, 1.3, 1.9],
      target: [0, 1.4, 0],
      fov: 32,
    },
    {
      cue: "2.hood",
      note: "He does not move. Still under the hood, hands in the engine.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0], 0, CAR[2] + 1.3]} rotationY={Math.PI} face="calm" animation="leanOver" />
        </>
      ),
      from: [CAR[0] - 1.4, 1.5, CAR[2] + 2.6],
      to: [CAR[0] - 0.6, 1.4, CAR[2] + 2.1],
      target: [CAR[0], 1.1, CAR[2] + 0.5],
      fov: 38,
    },
    {
      cue: "2.light",
      note: "Night. Their party is one light in a window. He is still on the car.",
      zone: "village",
      look: "overworld-night",
      stage: () => (
        <>
          <Car position={CAR} hood={1} light={0.3} />
          <Hero position={[CAR[0] + 0.3, 0, CAR[2] + 1.4]} rotationY={Math.PI} face="calm" animation="leanOver" />
        </>
      ),
      from: [4, 2.4, 8],
      to: [2, 2.1, 6],
      target: [1.2, 1.6, -3],
      fov: 40,
    },
    {
      cue: "2.dream",
      note: "His face, close. The dream is his, not theirs.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.1} face="smile" animation="idle" />,
      from: [0.4, 1.5, 2.4],
      to: [0.1, 1.45, 2],
      target: [0, 1.4, 0],
      fov: 32,
    },
    {
      cue: "3.tv",
      note: "The television, and a mechanic small inside the glass, turning a key.",
      zone: "room",
      look: "overworld-night",
      stage: () => (
        <>
          <Tv position={[0, 1.7, -1.6]} on={1} />
          <Boss position={[0, 0, -1.2]} rotationY={0} face="calm" animation="reach" scale={0.55} />
        </>
      ),
      from: [0.8, 1.6, 1.2],
      to: [0.3, 1.55, 0.6],
      target: [0, 1.6, -1.4],
      fov: 34,
    },
    {
      cue: "3.start",
      note: "He leans all the way in. The dead car on the screen has started.",
      zone: "room",
      stage: () => <Hero position={[0, 0, 0.4]} rotationY={Math.PI} face="wow" animation="leanOver" />,
      from: [1.1, 1.4, 2.2],
      to: [0.5, 1.35, 1.7],
      target: [0, 1.3, 0.2],
      fov: 34,
    },
    {
      cue: "3.want",
      note: "Close on him. He wants to be the mechanic, not the guest.",
      zone: "room",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.15} face="smile" animation="talk" />,
      from: [0.3, 1.5, 2.3],
      to: [0.05, 1.45, 1.9],
      target: [0, 1.4, 0],
      fov: 30,
    },
    {
      cue: "3.any",
      note: "Same face, a new thought: any car, not just this one.",
      zone: "room",
      stage: () => <Hero position={[0, 0, 0]} rotationY={-0.1} face="grin" animation="idle" />,
      from: [-0.4, 1.4, 2.2],
      to: [-0.1, 1.35, 1.8],
      target: [0, 1.4, 0],
      fov: 30,
    },
    {
      cue: "3.sleeve",
      note: "Sleeves up. The decision is in the arms, not a speech.",
      zone: "village",
      look: "overworld-day",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.2} face="brave" animation="reach" />,
      from: [1.2, 1.3, 2],
      to: [0.7, 1.25, 1.6],
      target: [0, 1.2, 0],
      fov: 32,
    },
    {
      cue: "3.walk",
      note: "He walks back under the open hood. The car is the place.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] - 1.4, 0, CAR[2] + 2.2]} rotationY={Math.PI} face="calm" animation="walk" />
        </>
      ),
      from: [CAR[0] + 1.6, 1.6, CAR[2] + 4],
      to: [CAR[0] - 0.4, 1.5, CAR[2] + 3.2],
      target: [CAR[0] - 0.4, 1.1, CAR[2] + 1.2],
      fov: 38,
    },
  ],
});

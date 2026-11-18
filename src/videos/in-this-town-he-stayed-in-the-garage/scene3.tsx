import { storyScene } from "../../engine";
import { Boss, Car, Hero, Pages, Pal, PLACE, Tire, Wrench, timing } from "./kit";

const CAR: [number, number, number] = [PLACE.yard[0], 0, PLACE.yard[2] + 1.4];
const SHOP: [number, number, number] = [PLACE.shop[0], 0, PLACE.shop[2] + 1.2];

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The months and the job",
  shots: [
    {
      cue: "5.key",
      note: "Night. He waves the smoke off and turns the key again.",
      zone: "village",
      look: "overworld-night",
      stage: () => (
        <>
          <Car position={CAR} hood={0.6} />
          <Hero position={[CAR[0] + 0.7, 0, CAR[2] + 1.2]} rotationY={-1.2} face="calm" animation="reach" />
        </>
      ),
      from: [CAR[0] + 2.2, 1.5, CAR[2] + 2.2],
      to: [CAR[0] + 1.5, 1.4, CAR[2] + 1.7],
      target: [CAR[0] + 0.4, 1.1, CAR[2] + 0.6],
      fov: 36,
    },
    {
      cue: "5.night",
      note: "Wide. Their light in the window, his light under the hood.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} light={0.5} />
          <Hero position={[CAR[0], 0, CAR[2] + 1.5]} rotationY={Math.PI} face="calm" animation="leanOver" />
        </>
      ),
      from: [2, 2.6, 7],
      to: [5, 2.2, 5],
      target: [11, 1.4, 0],
      fov: 40,
    },
    {
      cue: "5.while",
      note: "Low, under the car. While they were out, he was here.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} lift={0.5} />
          <Hero position={[CAR[0], 0, CAR[2] + 0.2]} rotationY={Math.PI} face="calm" animation="lie" />
        </>
      ),
      from: [CAR[0] - 2.2, 1.1, CAR[2] + 2],
      to: [CAR[0] - 1.4, 0.9, CAR[2] + 1.2],
      target: [CAR[0], 0.5, CAR[2]],
      fov: 36,
    },
    {
      cue: "5.strip",
      note: "Day again. Another bolt, another strip. He is still in it.",
      zone: "village",
      look: "overworld-day",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] + 0.4, 0, CAR[2] + 1.4]} rotationY={Math.PI} face="ouch" animation="reach" />
          <Wrench position={[CAR[0] - 0.3, 1.2, CAR[2] + 0.9]} spin={3} />
        </>
      ),
      from: [CAR[0] + 1.5, 1.5, CAR[2] + 2.7],
      to: [CAR[0] + 0.7, 1.35, CAR[2] + 2.1],
      target: [CAR[0], 1.1, CAR[2] + 0.7],
      fov: 36,
    },
    {
      cue: "5.water",
      note: "He comes in for water and he is already walking back out.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.4} face="calm" animation="walk" />,
      from: [-1.6, 1.5, 2.4],
      to: [0.4, 1.4, 2],
      target: [0.6, 1.2, 0.2],
      fov: 36,
    },
    {
      cue: "5.months",
      note: "The calendar, pages already mid-flip. The months, not a clock.",
      zone: "village",
      stage: () => <Pages position={[0, 1.4, 0]} flip={0.7} />,
      from: [0.5, 1.7, 1.8],
      to: [0.1, 1.55, 1.3],
      target: [0, 1.4, 0],
      fov: 30,
    },
    {
      cue: "5.hired",
      note: "The main-street bay. The boss is there. He walks in.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} hood={0.5} />
          <Hero position={[SHOP[0] + 1.4, 0, SHOP[2] + 1.6]} rotationY={-2.2} face="smile" animation="walk" />
          <Boss position={[SHOP[0] - 1.2, 0, SHOP[2] + 1.4]} rotationY={0.8} face="calm" animation="idle" />
        </>
      ),
      from: [SHOP[0] + 3, 2, SHOP[2] + 4],
      to: [SHOP[0] + 1.4, 1.7, SHOP[2] + 3],
      target: [SHOP[0], 1.2, SHOP[2]],
      fov: 40,
    },
    {
      cue: "6.sat",
      note: "Saturday. Three cars lined up out of the bay.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} color="#3d6ad4" />
          <Car position={[SHOP[0] + 2.4, 0, SHOP[2] + 4]} color="#2f9a62" />
          <Car position={[SHOP[0] - 2.2, 0, SHOP[2] + 3.6]} color="#e8a21c" />
        </>
      ),
      from: [SHOP[0] + 4, 2.4, SHOP[2] + 7],
      to: [SHOP[0] + 1, 2, SHOP[2] + 5.4],
      target: [SHOP[0], 0.8, SHOP[2] + 1],
      fov: 42,
    },
    {
      cue: "6.behind",
      note: "The other mechanics, already behind, and the hood is up.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} hood={1} />
          <Pal shirt="#8a5a3a" position={[SHOP[0] - 1.4, 0, SHOP[2] + 0.4]} rotationY={0.6} face="uneasy" animation="idle" />
          <Pal shirt="#4a4a55" hair="#1d1a18" position={[SHOP[0] + 1.3, 0, SHOP[2] + 0.6]} rotationY={-0.5} face="worried" animation="lookAround" />
        </>
      ),
      from: [SHOP[0] - 2.4, 1.6, SHOP[2] + 2.8],
      to: [SHOP[0] - 0.6, 1.5, SHOP[2] + 2.2],
      target: [SHOP[0], 1.2, SHOP[2]],
      fov: 38,
    },
    {
      cue: "6.board",
      note: "The clipboard, flat, nobody's hands on it.",
      zone: "village",
      stage: () => <Pages position={[0, 1.2, 0]} flip={0} />,
      from: [0.2, 1.7, 1.6],
      to: [0, 1.5, 1.2],
      target: [0, 1.2, 0],
      fov: 28,
    },
    {
      cue: "6.under",
      note: "Low. He is under the first car, calm, not rushing the face.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} lift={0.6} color="#3d6ad4" />
          <Hero position={[SHOP[0], 0, SHOP[2]]} rotationY={0} face="calm" animation="lie" />
        </>
      ),
      from: [SHOP[0] - 1.8, 0.7, SHOP[2] + 1.6],
      to: [SHOP[0] - 0.8, 0.55, SHOP[2] + 0.8],
      target: [SHOP[0], 0.4, SHOP[2]],
      fov: 34,
    },
    {
      cue: "6.wrench",
      note: "The wrench is a blur under the car. The chant is the job now.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} lift={0.5} color="#3d6ad4" />
          <Hero position={[SHOP[0] + 0.7, 0, SHOP[2] + 0.2]} rotationY={1.5} face="grin" animation="reach" />
          <Wrench position={[SHOP[0] + 0.2, 0.9, SHOP[2]]} spin={22} />
        </>
      ),
      from: [SHOP[0] + 1.8, 1.2, SHOP[2] + 1.6],
      to: [SHOP[0] + 1.1, 1, SHOP[2] + 1],
      target: [SHOP[0] + 0.2, 0.8, SHOP[2]],
      fov: 32,
    },
    {
      cue: "6.wheel",
      note: "One push and the tire seats. He does not look impressed.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} color="#2f9a62" />
          <Hero position={[SHOP[0] - 1.1, 0, SHOP[2]]} rotationY={1.3} face="calm" animation="push" />
          <Tire position={[SHOP[0] - 0.7, 0.5, SHOP[2] - 0.2]} />
        </>
      ),
      from: [SHOP[0] - 2.4, 1.3, SHOP[2] + 1.8],
      to: [SHOP[0] - 1.6, 1.15, SHOP[2] + 1.1],
      target: [SHOP[0] - 0.5, 0.7, SHOP[2]],
      fov: 34,
    },
    {
      cue: "6.spark",
      note: "The cables spark. He does not flinch.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} hood={1} color="#e8a21c" />
          <Hero position={[SHOP[0] + 0.5, 0, SHOP[2] + 1.4]} rotationY={Math.PI} face="brave" animation="reach" />
        </>
      ),
      from: [SHOP[0] - 0.8, 1.5, SHOP[2] + 2.6],
      to: [SHOP[0] - 0.2, 1.35, SHOP[2] + 2.1],
      target: [SHOP[0] + 0.3, 1.1, SHOP[2] + 0.8],
      fov: 34,
    },
  ],
});

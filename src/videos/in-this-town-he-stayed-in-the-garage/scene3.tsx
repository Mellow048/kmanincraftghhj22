import { cam, storyScene } from "../../engine";
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
          <Car position={CAR} hood={0.55} />
          <Hero position={[CAR[0] + 0.85, 0, CAR[2] + 1.15]} rotationY={-0.8} face="calm" animation="reach" />
        </>
      ),
      ...cam.push({ on: [CAR[0] + 0.3, 1.15, CAR[2] + 0.4], dist: 4.2, to: 3.5, yaw: 52, pitch: 12, fov: 38 }),
    },
    {
      cue: "5.night",
      note: "Wide. Their light in the window, his light under the hood.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} hood={1} light={0.7} />
          <Hero position={[CAR[0], 0, CAR[2] + 1.3]} rotationY={Math.PI} face="calm" animation="leanOver" />
        </>
      ),
      ...cam.push({ on: [CAR[0], 1.5, CAR[2]], dist: 8, to: 6.4, yaw: 18, pitch: 12, fov: 44 }),
    },
    {
      cue: "5.while",
      note: "Low, under the car. While they were out, he was here.",
      zone: "village",
      stage: () => (
        <>
          <Car position={CAR} lift={0.55} />
          <Hero position={[CAR[0] + 0.15, 0, CAR[2] + 0.15]} rotationY={0.2} face="calm" animation="lie" />
        </>
      ),
      ...cam.push({ on: [CAR[0], 0.55, CAR[2]], dist: 3.6, to: 3.0, yaw: -70, pitch: 8, fov: 36 }),
    },
    {
      cue: "5.strip",
      note: "Day again. Another bolt, another strip. He is still in it.",
      zone: "village",
      look: "overworld-day",
      stage: () => (
        <>
          <Car position={CAR} hood={1} />
          <Hero position={[CAR[0] + 0.75, 0, CAR[2] + 1.1]} rotationY={-0.55} face="ouch" animation="reach" />
          <Wrench position={[CAR[0] + 0.15, 1.2, CAR[2] + 0.55]} spin={4} />
        </>
      ),
      ...cam.push({ on: [CAR[0] + 0.2, 1.1, CAR[2] + 0.4], dist: 4.1, to: 3.4, yaw: 44, pitch: 12, fov: 38 }),
    },
    {
      cue: "5.water",
      note: "He comes in for water and he is already walking back out.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.35} face="calm" animation="walk" />,
      ...cam.push({ on: [0.2, 1.3, 0.1], dist: 3.4, to: 2.7, yaw: -20, pitch: 6, fov: 36 }),
    },
    {
      cue: "5.months",
      note: "The calendar, pages already mid-flip. The months, not a clock.",
      zone: "village",
      stage: () => <Pages position={[0, 1.35, 0]} flip={0.7} />,
      ...cam.push({ on: [0, 1.4, 0], dist: 2.4, to: 2.0, yaw: 16, pitch: 8, fov: 32 }),
    },
    {
      cue: "5.hired",
      note: "The main-street bay. The boss is there. He walks in.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} hood={0.4} />
          <Hero position={[SHOP[0] + 1.6, 0, SHOP[2] + 1.8]} rotationY={-2.2} face="smile" animation="walk" />
          <Boss position={[SHOP[0] - 1.3, 0, SHOP[2] + 1.5]} rotationY={0.7} face="calm" animation="idle" />
        </>
      ),
      ...cam.push({ on: [SHOP[0], 1.2, SHOP[2] + 0.6], dist: 6.2, to: 5.1, yaw: 28, pitch: 12, fov: 42 }),
    },
    {
      cue: "6.sat",
      note: "Saturday. Three cars lined up out of the bay.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} color="#3d6ad4" />
          <Car position={[SHOP[0] + 2.2, 0, SHOP[2] + 3.6]} color="#2f9a62" />
          <Car position={[SHOP[0] - 2.1, 0, SHOP[2] + 3.2]} color="#e8a21c" />
        </>
      ),
      ...cam.push({ on: [SHOP[0], 0.9, SHOP[2] + 1.6], dist: 7.4, to: 6.0, yaw: 22, pitch: 16, fov: 44 }),
    },
    {
      cue: "6.behind",
      note: "The other mechanics, already behind, and the hood is up.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} hood={1} />
          <Pal shirt="#8a5a3a" position={[SHOP[0] - 1.5, 0, SHOP[2] + 0.8]} rotationY={0.4} face="uneasy" animation="idle" />
          <Pal shirt="#4a4a55" hair="#1d1a18" position={[SHOP[0] + 1.4, 0, SHOP[2] + 1.0]} rotationY={-0.35} face="worried" animation="lookAround" />
        </>
      ),
      ...cam.push({ on: [SHOP[0], 1.2, SHOP[2] + 0.5], dist: 5.2, to: 4.3, yaw: -18, pitch: 12, fov: 40 }),
    },
    {
      cue: "6.board",
      note: "The clipboard, flat, nobody's hands on it.",
      zone: "village",
      stage: () => <Pages position={[0, 1.15, 0]} flip={0} />,
      ...cam.push({ on: [0, 1.2, 0], dist: 2.3, to: 1.95, yaw: 8, pitch: 18, fov: 32 }),
    },
    {
      cue: "6.under",
      note: "Low. He is under the first car, calm, not rushing the face.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} lift={0.6} color="#3d6ad4" />
          <Hero position={[SHOP[0] - 1.2, 0, SHOP[2] + 0.85]} rotationY={0.85} face="calm" animation="lie" />
        </>
      ),
      ...cam.push({ on: [SHOP[0] - 0.55, 0.9, SHOP[2] + 0.5], dist: 4.6, to: 3.8, yaw: -42, pitch: 18, fov: 40 }),
    },
    {
      cue: "6.wrench",
      note: "The wrench is a blur under the car. The chant is the job now.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} lift={0.45} color="#3d6ad4" />
          <Hero position={[SHOP[0] - 1.15, 0, SHOP[2] + 0.9]} rotationY={0.9} face="grin" animation="reach" />
          <Wrench position={[SHOP[0] - 0.4, 1.35, SHOP[2] + 0.5]} spin={18} />
        </>
      ),
      ...cam.push({ on: [SHOP[0] - 0.5, 1.2, SHOP[2] + 0.6], dist: 4.2, to: 3.5, yaw: -40, pitch: 12, fov: 40 }),
    },
    {
      cue: "6.wheel",
      note: "One push and the tire seats. He does not look impressed.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} color="#2f9a62" />
          <Hero position={[SHOP[0] - 1.25, 0, SHOP[2] + 0.4]} rotationY={1.1} face="calm" animation="push" />
          <Tire position={[SHOP[0] - 0.55, 0.55, SHOP[2] + 0.15]} />
        </>
      ),
      ...cam.push({ on: [SHOP[0] - 0.5, 0.9, SHOP[2]], dist: 4.0, to: 3.3, yaw: -50, pitch: 12, fov: 38 }),
    },
    {
      cue: "6.spark",
      note: "The cables spark. He does not flinch.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} hood={1} color="#e8a21c" />
          <Hero position={[SHOP[0] + 0.8, 0, SHOP[2] + 1.15]} rotationY={-0.5} face="brave" animation="reach" />
        </>
      ),
      ...cam.push({ on: [SHOP[0] + 0.2, 1.15, SHOP[2] + 0.45], dist: 4.0, to: 3.3, yaw: 40, pitch: 12, fov: 38 }),
    },
  ],
});

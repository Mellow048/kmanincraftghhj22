import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BENCH, Bag, Bits, Brick, BrickArms, Bubble, DAY, HeadAt, Hero, Mate, Pip, TROUBLE, ZONE,
  ease, front, jolt, pop, ramp, timing, wordAt,
} from "./kit";

const ME: Vec3 = [BENCH[0], -0.12, BENCH[2]];
const UP: Vec3 = [BENCH[0], 0, BENCH[2] + 0.1];
/** The head on the lunch table. */
const TABLE: Vec3 = [BENCH[0] + 0.45, 1.1, BENCH[2] + 0.9];
const PIP: Vec3 = TROUBLE;
const BRICK: Vec3 = [TROUBLE[0] + 1.25, 0, TROUBLE[2]];
const W = -Math.PI / 2;
const E = Math.PI / 2;

/** Pip in the air on the end of one finger, by his bag. */
const Lifted: React.FC<{ k: number; t: number }> = ({ k, t }) => {
  const y = 0.85 * k;
  const sw = k > 0.9 ? 0.05 * Math.sin(t * 5) : 0;
  return (
    <>
      <Pip position={[PIP[0] + 0.15 * k + sw, y, PIP[2]]} rotationY={E} animation={k > 0.3 ? "fall" : "scared"} face={k > 0.3 ? "fear" : "worried"} lens={1.6} />
      <group position={[PIP[0] - 0.22 + 0.15 * k + sw, y + 0.72, PIP[2]]} rotation={[0, E, 0]}>
        <Bag position={[0, 0, 0]} color="#8a5a2a" />
      </group>
    </>
  );
};

/** LUNCH: Brick, Pip, and the bravest two seconds of his life. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Put him down",
  shots: [
    {
      cue: "6.lunch",
      ...cam.push({ on: [-0.2, 1.1, 3.0], dist: 7.2, to: 6.2, yaw: 0, pitch: 8, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "Lunch in the square. He sits on a bench on the left with the head on the table. On the right a small kid in green with glowing glasses backs away from a big one in black with two metal arms twice his size.",
      stage: (t, { p }) => (
        <>
          <Hero position={ME} animation="sit" face="neutral" headYaw={0.7 * ease(ramp(t, 0.8, 1.3))} />
          <HeadAt position={TABLE} />
          <Pip position={[PIP[0] - 0.3 * p, 0, PIP[2]]} rotationY={E} animation="scared" face="worried" />
          <Brick position={[BRICK[0] + 1.2 * (1 - p), 0, BRICK[2]]} rotationY={W} animation="walk" animDistance={1.2 * p} face="smug" />
          <BrickArms position={[BRICK[0] + 1.2 * (1 - p), 0, BRICK[2]]} rotationY={W} />
          <Mate n={2} position={[3.6, 0, 0.6]} rotationY={-0.6} animation="scared" face="worried" />
        </>
      ),
    },
    {
      cue: "6.brick",
      ...cam.push({ on: [BRICK[0], 1.5, BRICK[2]], dist: 4.6, to: 3.8, yaw: -20, pitch: -4, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "Brick, from below. On 'arms' he brings both metal arms up and flexes them. They are bigger than he is.",
      impacts: [{ at: 1.9, amp: 0.04, dur: 0.25 }],
      stage: (t) => {
        const a = wordAt("6.brick", "arms");
        const flex = ease(ramp(t, a - 0.35, a));
        return (
          <>
            <Brick position={BRICK} rotationY={-0.35} animation={flex > 0.5 ? "cheer" : "idle"} face="smug" />
            <BrickArms position={BRICK} rotationY={-0.35} flex={flex} />
          </>
        );
      },
    },
    {
      cue: "6.pip",
      ...cam.push({ on: [PIP[0], 1.3, PIP[2]], dist: 2.6, to: 2.1, yaw: 16, pitch: 2, fov: 40 }),
      zone: ZONE.town,
      look: DAY,
      note: "Pip, close: small, green shirt, a pair of black glasses with lenses that glow blue. On 'everything' the lenses flare and little numbers pop off them.",
      stage: (t) => {
        const e = wordAt("6.pip", "everything");
        return (
          <>
            <Pip position={PIP} rotationY={0.2} animation="scared" face="worried" lens={0.7 + 2 * jolt(t, e, 0.6)} />
            <Bits position={[PIP[0], 1.45, PIP[2] + 0.3]} t={t - e} color="#4fe3ff" count={12} power={1.6} />
          </>
        );
      },
    },
    {
      cue: "6.knew",
      ...cam.push({ on: [PIP[0] + 0.5, 1.6, PIP[2]], dist: 4.4, to: 3.8, yaw: 0, pitch: 2, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "The two of them side on. Over Pip, what the glasses worked out, in a bubble: TROUBLE 100%. Brick's shadow is over him.",
      stage: (t) => {
        const ex = wordAt("6.knew", "exactly");
        return (
          <>
            <Pip position={PIP} rotationY={E} animation="cower" face="fear" lens={1.5} />
            <Brick position={BRICK} rotationY={W} animation="idle" face="smug" headPitch={0.3} />
            <BrickArms position={BRICK} rotationY={W} />
            <group scale={pop(t, ex - 0.1)}>
              <Bubble text="TROUBLE 100%" position={[PIP[0] + 0.3, 2.75, PIP[2]]} scale={0.34} />
            </group>
          </>
        );
      },
    },
    {
      cue: "6.lift",
      ...cam.push({ on: [PIP[0] + 0.6, 1.6, PIP[2]], dist: 5.0, to: 4.4, yaw: 0, pitch: 0, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "One metal arm comes out, one finger hooks the strap of Pip's backpack, and he goes up off the ground with his feet running.",
      stage: (t) => {
        const up = wordAt("6.lift", "up");
        const lift = ease(ramp(t, 0.1, up));
        const k = ease(ramp(t, up - 0.1, up + 0.4));
        return (
          <>
            <Lifted k={k} t={t} />
            <Brick position={BRICK} rotationY={W} animation="idle" face="grin" />
            <BrickArms position={BRICK} rotationY={W} lift={lift * (0.75 + 0.25 * k)} />
          </>
        );
      },
    },
    {
      cue: "7.stood",
      ...cam.push({ on: [UP[0], 1.2, UP[2]], dist: 3.8, to: 3.2, yaw: 12, pitch: 4, fov: 42 }),
      zone: ZONE.town,
      look: DAY,
      note: "Back on the bench. He watches, his face sorry. On 'stood' he is on his feet, with the head in his hands.",
      stage: (t) => {
        const s = wordAt("7.stood", "stood");
        const up = t > s - 0.15;
        return (
          <>
            <Hero position={up ? UP : ME} animation={up ? "hold" : "sit"} face={up ? "brave" : "sad"} headYaw={0.6} />
            <HeadAt position={up ? front(UP, 0, 0.5, 1.05) : TABLE} />
          </>
        );
      },
    },
    {
      cue: "7.down",
      ...cam.push({ on: [UP[0], 1.45, UP[2]], dist: 2.6, to: 2.2, yaw: 30, pitch: 0, fov: 40 }),
      zone: ZONE.town,
      look: DAY,
      note: "Him, close, brave: PUT HIM DOWN.",
      stage: (t) => (
        <>
          <Hero position={UP} rotationY={0.6} animation="hold" face="brave" />
          <HeadAt position={front(UP, 0.6, 0.5, 1.05)} rotation={[0, 0.6, 0]} />
          <group scale={pop(t, wordAt("7.down", "put") - 0.1)}>
            <Bubble text="PUT HIM DOWN" position={[UP[0] + 0.5, 2.5, UP[2]]} rotationY={0.4} scale={0.34} />
          </group>
        </>
      ),
    },
    {
      cue: "7.looked",
      ...cam.push({ on: [BRICK[0] - 0.2, 1.75, BRICK[2]], dist: 3.6, to: 2.9, yaw: -55, pitch: -2, fov: 42 }),
      zone: ZONE.town,
      look: DAY,
      note: "Brick turns his head to us, slowly, with Pip still hanging off his finger. Then his eyes go down, to what the teller is holding. He grins.",
      stage: (t) => {
        const what = wordAt("7.looked", "what");
        const d = ease(ramp(t, what - 0.3, what));
        return (
          <>
            <Lifted k={1} t={t} />
            <Brick position={BRICK} rotationY={W} animation="idle" face={d > 0.6 ? "grin" : "angry"} headYaw={-0.9 * ease(ramp(t, 0.1, 0.6))} headPitch={0.35 * d} />
            <BrickArms position={BRICK} rotationY={W} lift={1} />
          </>
        );
      },
    },
    {
      cue: "7.head",
      ...cam.push({ on: [UP[0], 1.25, UP[2] + 0.2], dist: 2.5, to: 2.0, yaw: 0, pitch: 10, fov: 40 }),
      zone: ZONE.town,
      look: DAY,
      note: "He looks down too. In his hands: the head, looking back up at him with its dark eyes. His brave face goes.",
      stage: (t) => {
        const h = wordAt("7.head", "holding");
        return (
          <>
            <Hero position={UP} animation="hold" face={t > h ? "uneasy" : "brave"} headPitch={0.55 * ease(ramp(t, 0.1, 0.5))} />
            <HeadAt position={front(UP, 0, 0.5, 1.05)} rotation={[-0.7 * ease(ramp(t, 0.1, 0.5)), 0, 0]} />
          </>
        );
      },
    },
    {
      cue: "7.sat",
      ...cam.push({ on: [UP[0], 1.15, UP[2]], dist: 3.3, to: 3.2, yaw: 12, pitch: 4, fov: 42 }),
      zone: ZONE.town,
      look: DAY,
      note: "He sits down again. Flat face. The head is back on the table.",
      stage: (t) => {
        const down = t > 0.22;
        return (
          <>
            <Hero position={down ? ME : UP} animation={down ? "sit" : "hold"} face="blank" />
            <HeadAt position={down ? TABLE : front(UP, 0, 0.5, 1.05)} />
            <Bits position={[ME[0], 0.5, ME[2] + 0.2]} t={t - 0.22} color="#c9b48a" count={5} power={1} />
          </>
        );
      },
    },
  ],
});

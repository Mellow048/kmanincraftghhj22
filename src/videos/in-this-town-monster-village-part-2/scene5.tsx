import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, Bits, Bubble, DUSK, Dad, DustRing, EAST, FARM, Glint, Hero, IronHelmet, MudDoor, NORTH, PLACE, Puffs, Raider, Streaks, SubscribeSign, TREE, WEST, ZONES,
  ease, faceOf, hop, jolt, pop, ramp, timing, wordAt,
} from "./kit";

const [FX, , FZ] = FARM;
/** Where Mo stood, and what is left there. */
const SPOT: Vec3 = [-1.6, 0, 2.6];
const BLADE: Vec3 = [SPOT[0] - 0.55, 0.1, SPOT[2] + 0.25];
const HELM: Vec3 = [SPOT[0] + 0.45, 0, SPOT[2] - 0.1];

/** What Mo left in the street. */
const Left: React.FC = () => (
  <>
    <AimSword position={BLADE} yaw={1.1} pitch={0} scale={1.15} />
    <IronHelmet position={HELM} rotation={[0.2, 0.5, 1.35]} />
    <Block position={[SPOT[0], 0.045, SPOT[2]]} size={[2.4, 0.03, 1.5]} color="#3d3a36" castShadow={false} />
  </>
);

/** The hole under the open door, as a black square. */
const Dark: React.FC = () => <Block position={[FX, 0.07, FZ]} size={[1.6, 0.03, 1.6]} color="#070504" castShadow={false} />;

/** Dad's arm, off. `position` is the shoulder end. */
const Arm: React.FC<{ position: Vec3; rotation: Vec3 }> = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <Block position={[0, -0.3, 0]} size={[0.09, 0.6, 0.09]} color="#dcdcd2" />
    <Block position={[0, -0.63, 0]} size={[0.13, 0.1, 0.11]} color="#e8e8de" />
  </group>
);

/** OUT. One thing in his head, house by house, and what is lying in the street. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Where is Mo?",
  shots: [
    {
      cue: "7.ladder",
      ...cam.push({ on: [FX, 0.6, FZ], dist: 5.6, to: 4.6, yaw: 16, pitch: 14, fov: 42 }),
      zone: ZONES.farmDawn,
      look: DUSK,
      note: "Morning, grey. The square of mud lifts, and the boy's head comes up under it like a hat. He looks left. He looks right. An empty farm.",
      stage: (t) => {
        const lifted = wordAt("7.ladder", "lifted");
        const nobody = wordAt("7.ladder", "nobody");
        const k = ease(ramp(t, lifted - 0.1, lifted + 0.4));
        const look = t > nobody - 0.2 ? Math.sin((t - nobody + 0.2) * 5.5) : 0;
        return (
          <>
            <MudDoor k={0.75 * k} glow={8 * k} />
            {k > 0.05 ? <Dark /> : null}
            <Hero position={[FX + 0.2, -1.5 + 0.62 * k, FZ + 0.3]} rotationY={0.3} animation="idle" arms="reachUp" face="uneasy" headYaw={1.0 * look} />
            <Bits position={[FX, 0.2, FZ + 0.6]} t={t - lifted} color="#5b4331" count={8} power={1.3} />
          </>
        );
      },
    },
    {
      cue: "7.grab",
      ...cam.push({ on: [FX - 0.5, 0.8, FZ + 0.3], dist: 5.0, to: 4.4, yaw: 14, pitch: 10, fov: 42 }),
      zone: ZONES.farmDawn,
      look: DUSK,
      note: "He is out and on his feet, going. Behind him dad comes up out of the hole to the ribs, and one long bone arm goes out after the back of the yellow shirt.",
      stage: (t) => {
        const out = ease(ramp(t, 0, 0.6));
        const grab = wordAt("7.grab", "grabbed");
        const go = ramp(t, 0.55, 1.83);
        const up = ease(ramp(t, grab - 0.35, grab));
        return (
          <>
            <MudDoor k={1.3} glow={8} />
            <Dark />
            <Hero position={[FX - 0.9 - 0.9 * go, -0.9 * (1 - out), FZ + 0.5]} rotationY={WEST} animation={out < 1 ? "idle" : "walk"} animDistance={0.9 * go} face="brave" />
            <Dad position={[FX - 0.1, -1.25 + 0.55 * up, FZ + 0.4]} rotationY={WEST} mood="scared" wave={up} lean={0.55 * up} rattle={0.4} />
          </>
        );
      },
    },
    {
      cue: "7.arm",
      ...cam.truck({ on: [FX - 1.6, 0.9, FZ + 0.4], dist: 5.6, yaw: 12, pitch: 9, fov: 42, by: [-3.4, 0, 0] }),
      ease: "inCubic",
      zone: ZONES.farmDawn,
      look: DUSK,
      note: "The bone hand has the shirt. The boy pulls, the shirt stretches, and on 'away' he is running, with a whole arm hanging off the back of him. Dad, in the hole, looks at his shoulder.",
      impacts: [{ at: 1.35, amp: 0.05, dur: 0.3 }],
      stage: (t, { p }) => {
        const away = wordAt("7.arm", "away");
        const arm = wordAt("7.arm", "arm");
        const pull = ramp(t, 0.1, away);
        const run = Math.max(0, t - away);
        const x = FX - 1.5 - 0.35 * pull - 3.9 * p * p * p;
        return (
          <>
            <MudDoor k={1.3} glow={8} />
            <Dark />
            <Hero position={[x, 0, FZ + 0.5]} rotationY={WEST} animation="run" animDistance={pull * 1.5 + run * 4.5} face={run > 0 ? "brave" : "ouch"} />
            <Arm position={[x + 0.22 + (run > 0 ? 0 : 0.62), 1.02 + (run > 0 ? 0 : 0.08), FZ + 0.5]} rotation={run > 0 ? [0, 0, 0.5 * Math.sin(t * 16)] : [0, 0, -1.45]} />
            <Bits position={[FX - 1.0, 1.1, FZ + 0.5]} t={t - away} color="#e8e8de" count={7} power={1.8} />
            <Dad position={[FX - 0.1, -0.7, FZ + 0.4]} rotationY={WEST + (run > 0.3 ? 1.2 : 0)} mood="scared" lean={run > 0 ? 0 : 0.55} turn={t > arm ? -1.0 : 0} tilt={jolt(t, arm, 0.3)} rattle={run > 0 ? 0.8 : 0.3} />
            {run > 0 ? <Puffs position={[x + 0.6, 0.2, FZ + 0.5]} color="#8a7a66" count={5} rise={0.4} spread={0.4} size={0.09} speed={2} opacity={0.6} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.head",
      ...cam.truck({ on: faceOf([44, 0, 2.6]), dist: 2.6, yaw: -52, pitch: 2, fov: 40, by: [-5, 0, 0] }),
      ease: "linear",
      shake: 0.025,
      zone: ZONES.dawn,
      look: DUSK,
      note: "Running with him, on his face. He is not looking at anything. Over his head, the thought, the same three words the creeper said.",
      stage: (t, { p }) => {
        const where = wordAt("7.head", "where");
        const x = 44 - 5 * p;
        return (
          <>
            <Hero position={[x, 0, 2.6]} rotationY={WEST} animation="run" animDistance={5 * p} face="brave" gaze={0} />
            <Arm position={[x + 0.22, 1.02, 2.6]} rotation={[0, 0, 0.5 * Math.sin(t * 16)]} />
            <Bubble text="WHERE IS MO?" position={[x - 0.1, faceOf([x, 0, 2.6])[1] + 0.5, 2.75]} rotationY={-0.9} scale={0.27 * pop(t, where - 0.05)} tail={0} dark />
            <Streaks position={[x, 1.2, 2.0]} yaw={EAST} t={t} n={8} spread={1.6} speed={14} />
          </>
        );
      },
    },
    {
      cue: "7.ran",
      ...cam.truck({ on: [38, 1.2, 2.6], dist: 8.2, yaw: 0, pitch: 7, fov: 44, by: [-8, 0, 0] }),
      ease: "linear",
      shake: 0.02,
      zone: ZONES.dawn,
      look: DUSK,
      note: "Side on and wide: one small yellow shirt going flat out along the empty road, the arm flying behind him, dust off every step.",
      stage: (t, { p }) => {
        const x = 38.6 - 8.6 * p;
        return (
          <>
            <Hero position={[x, 0, 2.6]} rotationY={WEST} animation="run" animDistance={8.6 * p} face="brave" />
            <Arm position={[x + 0.22, 1.02, 2.6]} rotation={[0, 0, 0.9 + 0.3 * Math.sin(t * 16)]} />
            <Streaks position={[x, 1.2, 3.4]} yaw={EAST} t={t} n={10} spread={2} speed={16} />
            {[0.2, 0.55, 0.9, 1.25].map((at, i) => (
              <DustRing key={i} position={[38.6 - 8.6 * (at / 1.67) + 0.2, 0.05, 2.6]} t={t - at} size={0.8} color="#b9a98a" />
            ))}
          </>
        );
      },
    },
    {
      cue: "7.tree",
      ...cam.push({ on: [TREE[0] - 0.9, 1.05, TREE[2] - 0.4], dist: 7.8, to: 6.8, yaw: 10, pitch: 8, fov: 46 }),
      zone: ZONES.dawn,
      look: DUSK,
      note: "Three players with swords, coming along the road. The boy skids, and on 'hid' he is flat against this side of a tree trunk with his eyes shut, while they walk past on the other side of it.",
      stage: (t) => {
        const saw = wordAt("7.tree", "saw");
        const hid = wordAt("7.tree", "hid");
        const k = ease(ramp(t, saw, hid));
        const run = ramp(t, 0, saw);
        const x = TREE[0] + 4.2 - 2.6 * run - 1.6 * k;
        const z = 2.8 + (TREE[2] + 0.75 - 2.8) * k;
        const walk = 4.4 * (t / 2.27);
        return (
          <>
            <Hero position={[x, 0, z]} rotationY={k < 1 ? WEST + 0.5 * k : 0} animation={k < 1 ? "run" : "cower"} animDistance={2.6 * run + 2 * k} face={t > saw ? "fear" : "brave"} />
            <DustRing position={[TREE[0] + 1.6, 0.05, 2.8]} t={t - saw} size={1.1} color="#b9a98a" />
            {[0, 1, 2].map((i) => (
              <Raider key={i} who={i} position={[TREE[0] - 5.4 + walk - i * 1.4, 0, 2.3 + (i % 2) * 0.7]} rotationY={EAST} animation="walk" animDistance={walk} face="angry" headYaw={i === 0 ? -0.5 * Math.sin(t * 2.4) : 0.4 * Math.sin(t * 2 + i)} />
            ))}
          </>
        );
      },
    },
    {
      cue: "7.houses",
      ...cam.truck({ on: [28, 1.3, -4.6], dist: 9.4, yaw: 0, pitch: 7, fov: 46, by: [-16.4, 0, 0] }),
      ease: "inOutSine",
      zone: ZONES.dawn,
      look: DUSK,
      note: "Along the fronts of the houses, and the camera stays on him. He goes in at Mo's door, comes out of Mo's window head first, lands, runs, and goes in through the window of his own house next door. Splinters each time.",
      stage: (t, { p }) => {
        const total = 3.5;
        const camX = (q: number): number => 28 - 16.4 * ((1 - Math.cos(Math.PI * q)) / 2);
        /** When the camera's middle passes `x`. He is always in the middle of it. */
        const when = (x: number): number => (Math.acos(1 - (2 * (28 - x)) / 16.4) / Math.PI) * total;
        const x = camX(p);
        const tIn = when(22.25);
        const tOut = when(19.5);
        const tNext = when(12.1);
        let at: Vec3 | null = null;
        let anim: "run" | "jump" = "run";
        let yaw = WEST;
        if (t < tIn) {
          const k = ramp(t, 0, tIn);
          at = [x, 0, -3.3 - 1.5 * k * k];
          yaw = WEST - 0.7 * k;
        } else if (t < tOut) {
          at = null;
        } else if (t < tOut + 0.36) {
          const k = (t - tOut) / 0.36;
          at = [x, 1.0 + 0.45 * Math.sin(k * Math.PI) - 1.0 * k, -5.0 + 1.3 * k];
          anim = "jump";
          yaw = -0.5;
        } else if (t < tNext) {
          at = [x, 0, -3.7];
        } else if (t < tNext + 0.3) {
          const k = (t - tNext) / 0.3;
          at = [x, 0.5 * Math.sin(k * Math.PI) + 0.9 * k, -3.7 - 1.3 * k];
          anim = "jump";
          yaw = WEST - 0.8;
        }
        return (
          <>
            {at ? <Hero position={at} rotationY={yaw} animation={anim} animDistance={28 - x} face="brave" /> : null}
            <Bits position={[22.2, 1.0, -4.9]} t={t - tIn} color="#d8c49a" count={8} power={1.6} />
            <Bits position={[19.4, 1.4, -4.8]} t={t - tOut} color="#cfe6f2" count={14} power={2.6} toward={[0, 0.3, 1]} />
            <DustRing position={[camX((tOut + 0.36) / total), 0.05, -3.7]} t={t - tOut - 0.36} size={1.1} color="#b9a98a" />
            <Bits position={[11.6, 1.4, -4.8]} t={t - tNext - 0.25} color="#cfe6f2" count={14} power={2.4} seed={3} toward={[0, 0.3, 1]} />
          </>
        );
      },
    },
    {
      cue: "7.street",
      ...cam.push({ on: [7.4, 1.25, -1.2], dist: 7.2, to: 6.2, yaw: 38, pitch: 8, fov: 44 }),
      zone: ZONES.dawn,
      look: DUSK,
      note: "His own front door opens a hand's width. One eye. Then the boy comes out onto his own street, slowly, on his toes. Nobody. Smoke going up from where the torches were dropped.",
      stage: (t) => {
        const k = ease(ramp(t, 0.5, 2.07));
        const peek = ease(ramp(t, 0, 0.4));
        const dx = PLACE.home[0] - 1.3;
        return (
          <>
            <Hero position={[dx - 0.4 * k, 0, -4.7 + 0.5 * peek + 4.6 * k]} rotationY={-0.25} animation={k > 0 ? "creep" : "peek"} animDistance={4.6 * k} face="uneasy" headYaw={0.7 * Math.sin(t * 3.2)} />
            {[[2.5, 3.2], [5.5, 0.8], [-0.5, 1.8]].map(([x, z], i) => (
              <group key={i}>
                <Block position={[x, 0.06, z]} rotation={[0, i * 1.1, 0]} size={[0.07, 0.07, 0.5]} color="#3a2a1c" />
                <Puffs position={[x, 0.2, z]} color="#6a6a70" count={5} rise={1.8} spread={0.25} size={0.11} speed={0.7} opacity={0.5} />
              </group>
            ))}
          </>
        );
      },
    },
    {
      cue: "7.ground",
      ...cam.push({ on: [SPOT[0] + 0.45, 0.6, SPOT[2]], dist: 5.0, to: 4.0, yaw: -16, pitch: 6, fov: 44 }),
      zone: ZONES.dawn,
      look: DUSK,
      note: "Very low, from the ground: something grey lying in the street, close to us, and beyond it the boy walking up to it and stopping, his head going down.",
      stage: (t) => {
        const k = ease(ramp(t, 0, 1.5));
        const ground = wordAt("7.ground", "ground");
        return (
          <>
            <Left />
            <Hero position={[SPOT[0] + 4.0 - 2.9 * k, 0, SPOT[2] - 0.6]} rotationY={WEST + 0.35} animation={k < 1 ? "walk" : "idle"} animDistance={2.9 * k} face={t > ground - 0.2 ? "fear" : "uneasy"} headPitch={0.5 * ease(ramp(t, ground - 0.3, ground + 0.1))} />
          </>
        );
      },
    },
    {
      cue: "7.sword",
      ...cam.push({ on: [SPOT[0] + 0.1, 0.15, SPOT[2] + 0.05], dist: 3.9, to: 3.3, yaw: 0, pitch: 52, fov: 42 }),
      zone: ZONES.dawn,
      look: DUSK,
      note: "Looking down at them: the sword, flat in the dirt, which catches the light on 'sword'; and the iron helmet on its side, which rocks once on 'helmet'. The scorch mark round them.",
      impacts: [{ at: 0.3, amp: 0.04, dur: 0.3 }],
      stage: (t) => {
        const sword = wordAt("7.sword", "sword");
        const helm = wordAt("7.sword", "helmet");
        const rock = t > helm ? Math.sin((t - helm) * 12) * Math.exp(-(t - helm) * 4) * 0.35 : 0;
        return (
          <>
            <AimSword position={BLADE} yaw={1.1} pitch={0} scale={1.15} />
            <IronHelmet position={HELM} rotation={[0.2, 0.5, 1.35 + rock]} />
            <Block position={[SPOT[0], 0.045, SPOT[2]]} size={[2.4, 0.03, 1.5]} color="#3d3a36" castShadow={false} />
            <Glint position={[BLADE[0] + 0.5, 0.25, BLADE[2] + 0.25]} t={t - sword} size={1.3} />
            <Glint position={[HELM[0], 0.45, HELM[2]]} t={t - helm} size={1.2} />
            <pointLight position={[SPOT[0], 1.6, SPOT[2] + 0.8]} color="#fff0dc" intensity={7} distance={5} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.gone",
      ...cam.push({ on: faceOf([SPOT[0] + 1.7, 0, SPOT[2] - 0.3]), dist: 2.4, to: 7.0, yaw: 42, pitch: 10, fov: 44 }),
      ease: "outCubic",
      zone: ZONES.dawn,
      look: DUSK,
      note: "His face coming up from them. The camera goes back from him fast and he is one small boy in a whole empty street, turning on the spot.",
      stage: (t) => (
        <>
          <Left />
          <Hero position={[SPOT[0] + 1.7, 0, SPOT[2] - 0.3]} rotationY={-0.3 + 2.2 * ease(ramp(t, 0.25, 1.0))} animation="lookAround" face="fear" />
        </>
      ),
    },
    {
      cue: "7.sub",
      ...cam.push({ on: [SPOT[0], 0.85, SPOT[2]], dist: 4.9, to: 4.4, yaw: 4, pitch: 9, fov: 44 }),
      zone: ZONES.dawn,
      look: DUSK,
      note: "He kneels by them and picks the helmet up in both hands. A sign comes up out of the street beside him: like, and subscribe. Part three.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 0.6));
        const sub = wordAt("7.sub", "subscribe");
        return (
          <>
            <AimSword position={BLADE} yaw={1.1} pitch={0} scale={1.15} />
            <Block position={[SPOT[0], 0.045, SPOT[2]]} size={[2.4, 0.03, 1.5]} color="#3d3a36" castShadow={false} />
            <Hero position={[SPOT[0] + 0.45, 0, SPOT[2] - 0.3]} rotationY={0.1} animation="crouch" arms="hold" face="frown" headPitch={0.45} />
            <IronHelmet position={[HELM[0], 0.36 * k, HELM[2] + 0.3 * k]} rotation={[0.2 * (1 - k), 0.5 * (1 - k), 1.35 * (1 - k)]} />
            <group position={[SPOT[0] - 0.42, 0, SPOT[2] - 0.5]} scale={pop(t, sub - 0.15)}>
              <SubscribeSign position={[0, 1.15, 0]} rotationY={0} scale={0.5} />
              <Block position={[0, 0.55, -0.03]} size={[0.05, 1.1, 0.05]} color="#5c3f24" />
            </group>
            <Bits position={[SPOT[0] - 0.42, 0.1, SPOT[2] - 0.5]} t={t - sub + 0.15} color="#b9a98a" count={10} power={1.8} />
          </>
        );
      },
    },
  ],
});

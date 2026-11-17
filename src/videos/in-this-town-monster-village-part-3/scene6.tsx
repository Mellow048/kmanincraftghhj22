import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, Arm, Bits, Bubble, Crowd, Dad, DustRing, EAST, Glint, Hiss, MANSION_HALL, MapSheet, Mum, NIGHT, NORTH, Pillager, SubscribeSign, WARM, WEST, Z3, dadSocket, ease,
  Puffs, heldAt, hop, jolt, m, mh, mix, monsterFace, pillagerFace, pillagerHand, pop, ramp, timing, wordAt,
} from "./kit";
import type { Kind } from "./kit";

const TY = MANSION_HALL.tableY;
/** The chief stands behind the table; mum and dad in front of it. */
const CHIEF: Vec3 = mh(0, 0, -2.4);
const CFACE = pillagerFace(CHIEF, 1.1);
const MUM: Vec3 = mh(-0.9, 0, 2.5);
const DAD: Vec3 = mh(0.9, 0, 2.6);
const MFACE = monsterFace("zombie", MUM);
/** Where the two of them shake: the chief has come round the east end of the table. */
const C2: Vec3 = mh(2.45, 0, 2.7);
const D2: Vec3 = mh(1.3, 0, 2.7);
const MAP: Vec3 = mh(0, TY + 0.03, 0.5);

/** The village, forty of them, filling the south half of the hall and facing north. Hall coordinates. */
const KINDS: Kind[] = ["zombie", "skeleton", "creeper", "zombie", "enderman", "skeleton", "zombie", "creeper", "spider"];
const FORTY: Array<[Kind, number, number, number?]> = Array.from({ length: 36 }, (_, i) => {
  const row = Math.floor(i / 9);
  const col = i % 9;
  return [KINDS[(i * 4 + row) % KINDS.length], -6.4 + col * 1.6 + (row % 2) * 0.7, 4.3 + row * 1.35, 0.9 + ((i * 7) % 3) * 0.06] as [Kind, number, number, number?];
});
const Guests: React.FC<{ t: number; look?: Vec3; mood?: "calm" | "happy" | "scared" | "sad" | "angry"; hopAt?: number; family?: boolean; hiss?: boolean }> = ({ t, look = CFACE, mood, hopAt, family = true, hiss = true }) => (
  <>
    <Crowd who={FORTY} dx={mh(0, 0, 0)[0]} dz={mh(0, 0, 0)[2]} face={NORTH} look={look} mood={mood} hopAt={hopAt} t={t} n0={2} />
    {hiss ? <Hiss position={HISS} rotationY={NORTH} lookAt={look} mood={mood} /> : null}
    {family ? (
      <>
        <Mum position={MUM} rotationY={NORTH} lookAt={look} arms={0.2} />
        <Dad position={DAD} rotationY={NORTH} lookAt={look} />
      </>
    ) : null}
  </>
);
/** The pillagers: the chief, two at the table with him, and a row down each wall with crossbows. */
const Band: React.FC<{ t: number; look?: Vec3; aim?: number; cheer?: number; chief?: boolean }> = ({ t, look, aim = 0, cheer = 0, chief = true }) => (
  <>
    {chief ? <Pillager chief position={CHIEF} rotationY={0} lookAt={look} cheer={cheer} /> : null}
    <Pillager n={1} position={mh(-2.4, 0, -2.4)} rotationY={0.2} lookAt={look} cheer={cheer} crossbow armR={-1.3 * aim} />
    <Pillager n={2} position={mh(2.4, 0, -2.4)} rotationY={-0.2} lookAt={look} cheer={cheer} crossbow armR={-1.3 * aim} />
    {[0, 1, 2, 3, 4].map((i) => (
      <Pillager key={`w${i}`} n={3 + i} position={mh(-8.6, 0, -4.6 + i * 1.5)} rotationY={EAST} lookAt={look} cheer={cheer} crossbow armR={-1.3 * ease(ramp(aim, i * 0.12, i * 0.12 + 0.4))} />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <Pillager key={`e${i}`} n={8 + i} position={mh(8.6, 0, -4.6 + i * 1.5)} rotationY={WEST} lookAt={look} cheer={cheer} crossbow armR={-1.3 * ease(ramp(aim, i * 0.12, i * 0.12 + 0.4))} />
    ))}
    <pointLight position={mh(0, 3.2, 1)} color="#ffcf90" intensity={50} distance={16} decay={2} />
  </>
);
const HISS: Vec3 = mh(2.6, 0, 3.4);
/** The cabinet: against the north wall behind the chief's seat, 4.8 wide and 6 high. Its front is at z −5.9. */
const CAB: Vec3 = mh(0, 0, -6.4);
const WOOD = "#3a2414";
const Axe: React.FC<{ position: Vec3; yaw: number; pitch: number; scale?: number }> = ({ position, yaw, pitch, scale = 1 }) => (
  <group position={position} rotation={[0, yaw, 0]} scale={scale}>
    <group rotation={[-pitch, 0, 0]}>
      <Block position={[0, 0, 0.4]} size={[0.06, 0.06, 0.95]} color="#6b4a2a" />
      <Block position={[0, 0.14, 0.76]} size={[0.05, 0.34, 0.26]} color="#c9d2dc" metalness={0.3} roughness={0.4} />
      <Block position={[0, 0.3, 0.76]} size={[0.04, 0.06, 0.36]} color="#eef3f7" />
    </group>
  </group>
);
const Shield: React.FC<{ position: Vec3; yaw?: number; scale?: number }> = ({ position, yaw = 0, scale = 1 }) => (
  <group position={position} rotation={[0, yaw, 0]} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.7, 0.95, 0.07]} color="#6b4a2a" />
    <Block position={[0, 0, 0.04]} size={[0.6, 0.85, 0.02]} color="#8a8f98" castShadow={false} />
    <Block position={[0, 0, 0.06]} size={[0.16, 0.9, 0.02]} color="#2f6f6a" castShadow={false} />
    <Block position={[0, 0.05, 0.08]} size={[0.2, 0.2, 0.04]} color="#c9a44a" castShadow={false} />
  </group>
);
/** The pillagers' banner: a pole and a long cloth with their grey face on it. `position` is the foot of the pole; `up` 0–1 raises it. */
const Banner: React.FC<{ position: Vec3; up?: number; sway?: number }> = ({ position, up = 1, sway = 0 }) => (
  <group position={position} rotation={[0, 0, sway]} scale={[1, Math.max(0.02, up), 1]}>
    <Block position={[0, 2.5, 0]} size={[0.1, 5, 0.1]} color="#5c3f24" />
    <Block position={[0, 4.75, 0.02]} size={[1.6, 0.1, 0.1]} color="#5c3f24" />
    <Block position={[0, 3.45, 0.04]} size={[1.4, 2.5, 0.05]} color="#e8e4d8" castShadow={false} />
    <Block position={[0, 3.75, 0.075]} size={[0.8, 0.8, 0.02]} color="#8f9a9a" castShadow={false} />
    <Block position={[0, 3.98, 0.09]} size={[0.8, 0.12, 0.02]} color="#2b2b2b" castShadow={false} />
    {[-0.2, 0.2].map((x) => (
      <Block key={x} position={[x, 3.82, 0.09]} size={[0.16, 0.1, 0.02]} color="#2f6f6a" castShadow={false} />
    ))}
    <Block position={[0, 3.6, 0.1]} size={[0.14, 0.34, 0.04]} color="#7d8888" castShadow={false} />
    <Block position={[0, 2.6, 0.075]} size={[1.4, 0.2, 0.02]} color="#b0302a" castShadow={false} />
    <Block position={[0, 2.3, 0.075]} size={[1.4, 0.08, 0.02]} color="#2f6f6a" castShadow={false} />
  </group>
);
/**
 * The cabinet. `open` 0–1 slides its two doors apart. `swords`, `bows`, `rest` 0–1 are how much of each shelf has
 * been taken: things go from the middle outwards.
 */
const Cabinet: React.FC<{ open?: number; swords?: number; bows?: number; rest?: number }> = ({ open = 0, swords = 0, bows = 0, rest = 0 }) => {
  const left = (n: number, k: number): number[] => Array.from({ length: n }, (_, i) => i).filter((i) => Math.abs(i - (n - 1) / 2) / (n / 2) >= k - 0.001 && k < 1);
  return (
    <group position={CAB}>
      <Block position={[0, 3, -0.2]} size={[4.8, 6, 0.3]} color="#24160c" />
      {[-2.4, 2.4].map((x) => (
        <Block key={x} position={[x, 3, 0.15]} size={[0.22, 6, 0.9]} color={WOOD} />
      ))}
      {[0.06, 2.0, 3.9, 5.94].map((y) => (
        <Block key={y} position={[0, y, 0.15]} size={[4.8, 0.14, 0.9]} color={WOOD} />
      ))}
      <Block position={[0, 6.15, 0.2]} size={[5.2, 0.3, 1.1]} color="#4a2f1b" />
      {/* Top shelf: swords, points up. */}
      {left(9, swords).map((i) => (
        <AimSword key={`s${i}`} position={[-2.0 + i * 0.5, 4.05, 0.2]} yaw={Math.PI / 2} pitch={Math.PI / 2} scale={1.5} />
      ))}
      {/* Middle shelf: crossbows, hung flat. */}
      {left(6, bows).map((i) => (
        <group key={`b${i}`} position={[-1.9 + i * 0.76, 3.0, 0.2]}>
          <Block position={[0, 0, 0]} size={[0.09, 0.95, 0.09]} color="#5a3d22" />
          <Block position={[0, 0.34, 0.02]} size={[0.62, 0.08, 0.07]} color="#3c3c44" />
          <Block position={[0, 0.05, 0.05]} size={[0.02, 0.6, 0.02]} color="#e8e8e8" castShadow={false} />
        </group>
      ))}
      {/* Bottom shelf: axes on the left, shields on the right. */}
      {left(3, rest).map((i) => (
        <Axe key={`a${i}`} position={[-1.9 + i * 0.62, 0.3, 0.2]} yaw={Math.PI / 2} pitch={Math.PI / 2} scale={1.5} />
      ))}
      {left(3, rest).map((i) => (
        <Shield key={`h${i}`} position={[0.55 + i * 0.68, 1.0, 0.3]} scale={0.9} />
      ))}
      {/* The doors. */}
      {[-1, 1].map((sd) => (
        <group key={sd} position={[sd * (1.2 + 2.35 * open), 3, 0.66]}>
          <Block position={[0, 0, 0]} size={[2.4, 6, 0.12]} color="#4a2f1b" />
          <Block position={[0, 1.4, 0.065]} size={[1.9, 2.5, 0.02]} color={WOOD} castShadow={false} />
          <Block position={[0, -1.5, 0.065]} size={[1.9, 2.5, 0.02]} color={WOOD} castShadow={false} />
          <Block position={[-sd * 1.0, 0, 0.1]} size={[0.1, 0.5, 0.08]} color="#c9a44a" castShadow={false} />
        </group>
      ))}
      <pointLight position={[0, 3.2, 2.2]} color="#ffd9a0" intensity={40 * open} distance={11} decay={2} />
    </group>
  );
};
/** A sword in a pillager's +X hand, following the arm: `angle` is his `armR`. */
const InHand: React.FC<{ p: Vec3; rotY: number; angle: number; scale?: number; axe?: boolean }> = ({ p, rotY, angle, scale = 0.98, axe = false }) => {
  const hand = pillagerHand(p, rotY, angle, scale, 1);
  const pitch = Math.min(Math.PI / 2, Math.max(-0.2, -angle - 1.25));
  return axe ? <Axe position={hand} yaw={rotY} pitch={pitch} scale={1.25} /> : <AimSword position={hand} yaw={rotY} pitch={pitch} scale={1.25} />;
};
/** The three who arm first, in front of the cabinet, and the two at the back who do not understand. */
const TRIO: Vec3[] = [mh(-1.15, 0, -4.5), mh(0, 0, -4.5), mh(1.15, 0, -4.5)];
const AXE_MAN: Vec3 = mh(-1.25, 0, -4.3);
const SHIELD_MAN: Vec3 = mh(1.25, 0, -4.3);
const FLAG: Vec3 = mh(0, 0, -5.0);
const P1: Vec3 = mh(-0.62, 0, -4.9);
const P2: Vec3 = mh(0.62, 0, -4.9);
/** The hall once everybody is armed. */
const Armed: React.FC<{ t: number; look?: Vec3; cheer?: number }> = ({ t, look, cheer = 0 }) => (
  <>
    <Cabinet open={1} swords={1} bows={1} rest={1} />
    <Band t={t} chief={false} aim={1} look={look} cheer={cheer} />
    <Pillager chief position={FLAG} rotationY={0} armR={-1.5} lookAt={look} />
    <Banner position={pillagerHand(FLAG, 0, -1.5, 1.1, 1).map((v, i) => (i === 1 ? 0 : v)) as Vec3} sway={0.04 * Math.sin(t * 3)} />
    <Pillager n={5} position={AXE_MAN} rotationY={0.25} armR={-2.6} lookAt={look} />
    <InHand p={AXE_MAN} rotY={0.25} angle={-2.6} axe />
    <Pillager n={6} position={SHIELD_MAN} rotationY={-0.25} armL={-1.2} lookAt={look} />
    <Shield position={[SHIELD_MAN[0] - 0.1, 1.15, SHIELD_MAN[2] + 0.42]} yaw={-0.25} />
  </>
);
/** The mansion's front door: two leaves, `k` radians open (inwards). */
const Doors: React.FC<{ k: number }> = ({ k }) => (
  <>
    {[-1, 1].map((s) => (
      <group key={s} position={m(s * 1.2, 0, 0.1)} rotation={[0, -s * k, 0]}>
        <Block position={[-s * 0.6, 1.45, 0]} size={[1.2, 2.9, 0.12]} color="#4a2f1b" />
        <Block position={[-s * 0.6, 1.45, 0.065]} size={[0.9, 2.5, 0.02]} color="#3a2414" castShadow={false} />
        <Block position={[-s * 1.02, 1.3, 0.1]} size={[0.1, 0.3, 0.08]} color="#c9a44a" castShadow={false} />
      </group>
    ))}
  </>
);
const OUT: Array<[Kind, number, number, number?]> = Array.from({ length: 28 }, (_, i) => {
  const row = Math.floor(i / 7);
  return [KINDS[(i * 5 + row) % KINDS.length], -3.6 + (i % 7) * 1.2 + (row % 2) * 0.5, 4.6 + row * 1.5, 0.9] as [Kind, number, number, number?];
});

/** ON THE OTHER SIDE OF THE FOREST: the pillagers, a map, and a deal. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The other side of the forest",
  shots: [
    {
      cue: "10.other",
      ...cam.truck({ on: m(0, 6, 0), dist: 44, yaw: -10, pitch: 16, fov: 50, by: [2, -3.5, -17] }),
      zone: Z3.mansion,
      look: NIGHT,
      note: "Night. The lens flies in low over the tops of a dark oak forest, and out of the trees ahead comes a house three floors high with every window lit.",
      stage: () => <Doors k={0} />,
    },
    {
      cue: "10.pillagers",
      ...cam.push({ on: mh(0, 1.7, -2.0), dist: 4.4, to: 3.5, yaw: 0, pitch: -6, fov: 50 }),
      zone: Z3.hall,
      look: WARM,
      note: "Inside, from the end of the map table, low: the chief in the middle of it, grey, gold round his brow, a head taller than the two beside him. He brings a fist down on the map.",
      stage: (t) => {
        const hates = wordAt("10.pillagers", "hates");
        const bang = ease(ramp(t, 0.5, 0.62));
        return (
          <>
            <Band t={t} chief={false} />
            <Pillager chief position={CHIEF} rotationY={0} lean={0.35 * bang} armR={-1.4 + 1.2 * ease(ramp(t, 0.2, 0.5)) - 1.0 * bang} talk={t > hates - 0.5 ? 1 : 0} />
            <DustRing position={mh(0.4, TY + 0.05, -1.2)} t={t - 0.62} size={0.9} color="#e0cf6a" />
          </>
        );
      },
    },
    {
      cue: "10.pillagers",
      cut: wordAt("10.pillagers", "nobody") - 0.15,
      ...cam.truck({ on: mh(-8.6, 1.35, -4.4), dist: 2.6, yaw: 62, pitch: -4, fov: 48, by: [0, 0, 5.4] }),
      zone: Z3.hall,
      look: WARM,
      note: "Down the row along the wall, at the height of their noses, close: grey face after grey face, every one of them scowling, and as the lens passes each one a crossbow comes up.",
      stage: (t) => <Band t={t} aim={ramp(t, 0.1, 1.5)} />,
    },
    {
      cue: "10.knock",
      ...cam.push({ on: m(0, 3.4, 2), dist: 12, to: 10, yaw: 6, pitch: -14, fov: 54 }),
      zone: Z3.mansion,
      look: NIGHT,
      note: "Outside, from the ground behind a crowd of monster backs: the mansion goes up and up over them into the night. One of them, small, with a pink bow, is at the top of the steps with her fist on the door.",
      stage: (t) => {
        const knocked = wordAt("10.knock", "knocked");
        const n = Math.max(0, Math.sin(ramp(t, knocked - 0.1, knocked + 0.5) * Math.PI * 3));
        return (
          <>
            <Doors k={0} />
            <Crowd who={OUT} dx={m(0, 0, 0)[0]} dz={m(0, 0, 0)[2]} face={NORTH} look={m(0, 2, 0)} t={t} />
            <Dad position={m(1.1, 0.3, 1.6)} rotationY={NORTH} />
            <Mum position={m(-0.2, 0.3, 0.95)} rotationY={NORTH} arms={0.6 + 0.4 * n} />
          </>
        );
      },
    },
    {
      cue: "10.knock",
      cut: wordAt("10.knock", "it") - 0.2,
      ...cam.push({ on: m(0, 1.55, 0.5), dist: 3.3, to: 2.8, yaw: 10, pitch: -3, fov: 42 }),
      zone: Z3.mansion,
      look: NIGHT,
      note: "The door, side on, close: it opens the width of a nose, and a grey nose comes out of it, with a crossbow under it. Mum gives it a little wave.",
      stage: (t) => {
        const k = ease(ramp(t, 0.05, 0.4));
        return (
          <>
            <Block position={m(-0.6, 1.75, 0.16)} size={[1.2, 2.9, 0.12]} color="#4a2f1b" />
            <Block position={m(0.6 + 0.6 * k, 1.75, 0.16)} size={[1.2, 2.9, 0.12]} color="#4a2f1b" />
            <Block position={m(0.32, 1.75, 0.12)} size={[0.62 * k, 2.9, 0.02]} color="#000000" emissive="#ffb060" emissiveIntensity={0.7} castShadow={false} />
            <Pillager n={4} position={m(0.3, 0.3, 0.1 + 0.3 * k)} rotationY={-0.3} crossbow armR={-1.2 * k} lookAt={monsterFace("zombie", m(-0.2, 0.3, 1.15))} />
            <Mum position={m(-0.4, 0.3, 1.2)} rotationY={NORTH - 0.3} wave={0.75 * ease(ramp(t, 0.4, 0.65))} arms={0} />
            <Dad position={m(1.3, 0.14, 2.0)} rotationY={NORTH + 0.3} />
            <pointLight position={m(0, 2, -0.8)} color="#ffcf90" intensity={30 * k} distance={6} decay={2} />
            <pointLight position={m(0, 2, 1.6)} color="#ffcf90" intensity={12 * k} distance={6} decay={2} />
          </>
        );
      },
    },
    {
      cue: "10.map",
      ...cam.top({ on: MAP, height: 3.4, to: 2.5, spin: [14, 0], fov: 44 }),
      zone: Z3.hall,
      look: WARM,
      note: "Straight down on the table: a green hand slaps a roll of paper on it and it runs open. A grey square with towers at its corners, and a red X in the middle.",
      stage: (t) => {
        const put = wordAt("10.map", "put");
        const open = ease(ramp(t, put, put + 0.5));
        return (
          <>
            <Band t={t} look={MAP} />
            <Guests t={t} look={MAP} />
            {t > put - 0.1 ? <MapSheet position={MAP} open={open} /> : null}
            <DustRing position={MAP} t={t - put} size={0.9} color="#ead9a8" />
          </>
        );
      },
    },
    {
      cue: "10.map",
      cut: wordAt("10.map", "they") - 0.15,
      ...cam.push({ on: [MFACE[0], MFACE[1], MFACE[2]], dist: 2.2, to: 1.7, yaw: 196, pitch: -8, fov: 38 }),
      zone: Z3.hall,
      look: WARM,
      note: "Mum across the table, from the chief's side and a little below: a small green woman with a pink bow and forty monsters at her back, and she is not asking.",
      stage: (t) => (
        <>
          <Guests t={t} family={false} />
          <Dad position={DAD} rotationY={NORTH} lookAt={MFACE} />
          <Mum position={MUM} rotationY={NORTH} mood="angry" lean={0.12} arms={0.15} />
          <MapSheet position={MAP} />
        </>
      ),
    },
    {
      cue: "10.chief",
      ...cam.pan({ from: mh(0.2, 2.3, -3.6), on: mh(-7, 1.2, 6), onTo: mh(7, 1.2, 6), fov: 56 }),
      zone: Z3.hall,
      look: WARM,
      note: "WHAT THE CHIEF SEES, past his own gold cuff: the lens goes slowly from one wall of his hall to the other, and all of it is monsters. Zombies, skeletons, creepers, a spider. Forty.",
      stage: (t) => (
        <>
          <Guests t={t} look={mh(0, 2, -3.6)} />
          <MapSheet position={MAP} />
          <Band t={t} chief={false} />
        </>
      ),
    },
    {
      cue: "10.chief",
      cut: wordAt("10.chief", "and") - 0.15,
      ...cam.push({ on: [CFACE[0], CFACE[1] - 0.15, CFACE[2]], dist: 2.9, to: 2.4, yaw: -20, pitch: -10, fov: 38 }),
      zone: Z3.hall,
      look: WARM,
      note: "The chief, close, leaning on his knuckles on the map: one eyebrow, and the question.",
      stage: (t) => (
        <>
          <Band t={t} chief={false} look={MFACE} />
          <Pillager chief position={CHIEF} rotationY={0} lean={0.3} talk={1} tilt={0.2} lookAt={MFACE} mad={0.6} />
          <MapSheet position={MAP} />
        </>
      ),
    },
    {
      cue: "10.castle",
      ...cam.push({ on: [MAP[0] - 0.2, MAP[1] + 0.05, MAP[2] - 0.1], dist: 1.3, to: 0.9, yaw: 30, pitch: 34, fov: 36 }),
      zone: Z3.hall,
      look: WARM,
      note: "The map, very close: one green finger comes down on the red X, hard enough to make the paper jump.",
      stage: (t) => {
        const castle = wordAt("10.castle", "castle");
        const k = ease(ramp(t, castle - 0.2, castle));
        return (
          <>
            <MapSheet position={[MAP[0], MAP[1] + Math.abs(jolt(t, castle, 0.03)), MAP[2]]} />
            <group position={[MAP[0] - 0.2, MAP[1] + 0.06 + 0.5 * (1 - k), MAP[2] - 0.1]} rotation={[-0.9, 0, 0]}>
              <Block position={[0, 0.22, 0]} size={[0.11, 0.44, 0.11]} color="#4f8f3a" />
              <Block position={[0, 0.55, 0]} size={[0.2, 0.3, 0.2]} color="#3f7f8f" />
            </group>
            <DustRing position={[MAP[0] - 0.2, MAP[1] + 0.02, MAP[2] - 0.1]} t={t - castle} size={0.35} color="#c23a2e" />
          </>
        );
      },
    },
    {
      cue: "10.shake",
      ...cam.push({ on: [(C2[0] + D2[0]) / 2 + 0.1, 1.25, C2[2]], dist: 3.3, to: 3.0, yaw: 22, pitch: 3, fov: 50 }),
      zone: Z3.hall,
      look: WARM,
      note: "The two of them side on, the chief a head taller: a grey hand and a white one, up, down, up. The grey one pulls back with a whole arm still in it.",
      stage: (t) => {
        const off = wordAt("10.shake", "off");
        const k = ease(ramp(t, off - 0.12, off + 0.1));
        const shake = t < off ? Math.sin(t * 13) * 0.07 * ramp(t, 0.3, 0.6) : 0;
        const s = dadSocket(D2, EAST);
        const reach = ease(ramp(t, 0.1, 0.4));
        return (
          <>
            <MapSheet position={MAP} />
            <Band t={t} chief={false} look={[D2[0] + 0.8, 1.2, D2[2]]} />
            <Mum position={mh(0.1, 0, 2.2)} rotationY={NORTH - 0.9} lookAt={[D2[0] + 0.8, 1.2, D2[2]]} arms={0.2} />
            <Dad position={[D2[0] - 0.25 * k, 0, D2[2]]} rotationY={EAST} noArm mood={k > 0.5 ? "scared" : "happy"} lean={-0.2 * k} />
            <Pillager chief position={[C2[0] + 0.35 * k, 0, C2[2]]} rotationY={WEST} armL={-1.45 * reach + shake} lean={-0.15 * k} lookAt={k > 0.5 ? [C2[0] - 0.4, 1.2, C2[2]] : undefined} />
            <Arm position={heldAt([s[0] + 0.02 + 0.5 * k, s[1] + shake * 0.5 - 0.05, s[2] + 0.02], EAST)} rotationY={EAST} talk={k > 0.5 ? t : 0} scale={reach < 0.3 ? 0.01 : 1} />
            <Bits position={s} t={t - off} color="#e8e8de" count={8} power={1.5} />
            <Glint position={s} t={t - off} size={1.0} />
          </>
        );
      },
    },
    {
      cue: "10.deal",
      ...cam.push({ on: [C2[0] - 0.1, 1.55, C2[2]], dist: 2.3, to: 1.9, yaw: -52, pitch: -12, fov: 40 }),
      zone: Z3.hall,
      look: WARM,
      note: "The chief looks at the arm in his hand. The arm waves at him. He looks at dad. He shrugs, and holds it up over his head like a cup.",
      stage: (t) => {
        const deal = wordAt("10.deal", "deal");
        const up = ease(ramp(t, deal - 0.1, deal + 0.2));
        const a = -1.45 - 1.4 * up;
        const hand = pillagerHand([C2[0] + 0.35, 0, C2[2]], WEST, a, 1.1, -1);
        return (
          <>
            <MapSheet position={MAP} />
            <Band t={t} chief={false} look={hand} cheer={ease(ramp(t, deal + 0.2, deal + 0.45))} />
            <Dad position={[D2[0] - 0.25, hop(t, deal + 0.25, 0.25, 0.3), D2[2]]} rotationY={EAST} noArm mood="happy" lookAt={hand} />
            <Pillager chief position={[C2[0] + 0.35, 0, C2[2]]} rotationY={WEST} armL={a} lookAt={up > 0.3 ? mh(0, 1.5, 6) : hand} mad={1 - 0.7 * up} talk={t > deal - 0.1 && t < deal + 0.4 ? 1 : 0} />
            <Arm position={heldAt([hand[0], hand[1] - 0.1, hand[2]], WEST)} rotationY={WEST} rear={0.3 + 0.7 * up} talk={t} />
            <Bubble text="DEAL" position={[C2[0] - 0.9, 2.75, C2[2] + 0.3]} rotationY={-0.8} scale={0.3 * pop(t, deal - 0.05)} tail={1} dark />
          </>
        );
      },
    },
    {
      cue: "10.cabinet",
      ...cam.push({ on: mh(0, 3.0, -6), dist: 8.6, to: 7.4, yaw: 0, pitch: -4, fov: 60 }),
      zone: Z3.hall,
      look: WARM,
      note: "The north wall, from over the map table, low: a cabinet as tall as the hall. The chief, with dad's arm still in one fist, puts his other hand on it and its two doors run apart: swords, crossbows, axes, shields, floor to roof.",
      stage: (t) => {
        const cab = wordAt("10.cabinet", "cabinet");
        const open = ease(ramp(t, cab - 0.75, cab - 0.1));
        return (
          <>
            <MapSheet position={MAP} />
            <Cabinet open={open} />
            <Band t={t} chief={false} look={mh(0, 3, -6)} />
            <Pillager chief position={mh(0, 0, -4.9)} rotationY={Math.PI} armR={-1.6 - 0.9 * ease(ramp(t, 0.1, 0.4))} />
            <Glint position={mh(0, 3.6, -5.6)} t={t - cab + 0.1} size={3} />
          </>
        );
      },
    },
    {
      cue: "10.swords",
      ...cam.push({ on: mh(0, 1.75, -4.5), dist: 4.3, to: 3.8, yaw: 16, pitch: -8, fov: 50 }),
      zone: Z3.hall,
      look: WARM,
      note: "Three of them in front of the open cabinet, from below: one, two, three, a sword goes up over each grey head, and the top shelf behind them is empty.",
      stage: (t, { dur: len }) => (
        <>
          <Cabinet open={1} swords={ramp(t, 0, len * 0.6)} />
          {TRIO.map((p, i) => {
            const at = 0.1 + i * len * 0.2;
            const a = -0.4 - 2.4 * ease(ramp(t, at, at + 0.25));
            return (
              <group key={i}>
                <Pillager n={2 + i} position={[p[0], hop(t, at + 0.1, 0.2, 0.12), p[2]]} rotationY={0} armR={a} />
                <InHand p={p} rotY={0} angle={a} />
                <Glint position={[p[0] + 0.35, 2.9, p[2]]} t={t - at - 0.25} size={1.1} />
              </group>
            );
          })}
        </>
      ),
    },
    {
      cue: "10.bows",
      ...cam.push({ on: mh(0, 1.45, -4.5), dist: 4.0, to: 3.3, yaw: -12, pitch: -2, fov: 50 }),
      zone: Z3.hall,
      look: WARM,
      note: "The same three, square on, crossbows now: click, the first one comes up loaded; click, the second; click, the third. Three bolts pointing just past the lens.",
      stage: (t) => (
        <>
          <Cabinet open={1} swords={1} bows={ramp(t, 0, wordAt("10.bows", "loaded"))} />
          {TRIO.map((p, i) => {
            const at = wordAt("10.bows", "click", i);
            const a = -0.5 - 0.85 * ease(ramp(t, at - 0.12, at + 0.03));
            return (
              <group key={i}>
                <Pillager n={2 + i} position={[p[0], 0, p[2] + jolt(t, at, 0.05)]} rotationY={0} crossbow armR={a} />
                <Glint position={pillagerHand(p, 0, -1.35)} t={t - at} size={0.9} />
              </group>
            );
          })}
        </>
      ),
    },
    {
      cue: "10.axes",
      ...cam.orbit({ on: mh(0, 1.5, -4.4), onTo: mh(0, 3.0, -4.6), dist: 4.2, distTo: 8.2, yaw: 14, yawTo: -6, pitch: -2, pitchTo: -10, fov: 54 }),
      zone: Z3.hall,
      look: WARM,
      note: "An axe comes in from the left with a pillager on it. A shield comes in from the right. And between them, as the lens drops back, the chief stands a banner up that is taller than the cabinet.",
      stage: (t) => {
        const ax = ease(ramp(t, 0.05, 0.4));
        const sh = wordAt("10.axes", "shields");
        const bn = wordAt("10.axes", "banner");
        const k = ease(ramp(t, sh - 0.25, sh + 0.1));
        const up = ease(ramp(t, bn - 0.45, bn + 0.1));
        const a: Vec3 = [AXE_MAN[0] - 2.6 * (1 - ax), 0, AXE_MAN[2]];
        const b: Vec3 = [SHIELD_MAN[0] + 2.6 * (1 - k), 0, SHIELD_MAN[2]];
        return (
          <>
            <Cabinet open={1} swords={1} bows={1} rest={ramp(t, 0, sh)} />
            <Band t={t} chief={false} aim={1} />
            <Pillager n={5} position={a} rotationY={0.25} armR={-2.6} walk={2.6 * ax} />
            <InHand p={a} rotY={0.25} angle={-2.6} axe />
            <Pillager n={6} position={b} rotationY={-0.25} armL={-1.2} walk={2.6 * k} />
            <Shield position={[b[0] - 0.1, 1.15, b[2] + 0.42]} yaw={-0.25} />
            <Pillager chief position={FLAG} rotationY={0} armR={-1.5} />
            <Banner position={[pillagerHand(FLAG, 0, -1.5, 1.1, 1)[0], 0, pillagerHand(FLAG, 0, -1.5, 1.1, 1)[2]]} up={up} sway={0.05 * Math.sin(t * 3)} />
            <Bits position={mh(0.4, 4.6, -4.4)} t={t - bn - 0.1} color="#e8e4d8" count={10} power={1.6} />
          </>
        );
      },
    },
    {
      cue: "10.ready",
      ...cam.push({ on: mh(0, 2.4, -3.4), dist: 13.5, to: 12, yaw: 0, pitch: 13, fov: 56 }),
      zone: Z3.hall,
      look: WARM,
      note: "The whole hall from the back, over forty monster heads: every pillager in it with something sharp, a row of crossbows up down each wall, the banner in the middle, and the cabinet behind them empty.",
      stage: (t) => (
        <>
          <MapSheet position={MAP} />
          <Armed t={t} look={mh(0, 2, 8)} />
          <Guests t={t} look={mh(0, 3, -5)} />
        </>
      ),
    },
    {
      cue: "10.cheer",
      ...cam.push({ on: mh(0, 1.3, 5.6), dist: 6.4, to: 5.4, yaw: 180, pitch: 9, fov: 56 }),
      zone: Z3.hall,
      look: WARM,
      note: "Turn round: forty monsters, face on, going up and down like a field of springs. Zombies, skeletons, creepers, a spider. They have never been this happy.",
      stage: (t) => (
        <>
          <Guests t={t} look={mh(0, 2.5, -2)} mood="happy" hopAt={Math.floor(t / 0.55) * 0.55} />
          <Dad position={[DAD[0], hop(t % 0.55, 0.05, 0.3, 0.4), DAD[2]]} rotationY={NORTH} noArm mood="happy" />
        </>
      ),
    },
    {
      cue: "10.cheer",
      cut: wordAt("10.cheer", "a") - 0.12,
      ...cam.push({ on: monsterFace("creeper", HISS), dist: 2.9, to: 2.3, yaw: 172, pitch: 2, fov: 44 }),
      zone: Z3.hall,
      look: WARM,
      note: "One creeper in the middle of them has gone white and fat and is hissing. Everybody near it leans away. It lets its breath out, and goes green again, and looks sorry.",
      stage: (t) => {
        const off = wordAt("10.cheer", "off") - wordAt("10.cheer", "a") + 0.12;
        const fuse = ease(ramp(t, 0, off - 0.1)) * (1 - ease(ramp(t, off + 0.15, off + 0.4)));
        return (
          <>
            <Guests t={t} look={[HISS[0], 1.4, HISS[2]]} mood="scared" family={false} hiss={false} />
            <Hiss position={[HISS[0] + 0.03 * fuse * Math.sin(t * 50), 0, HISS[2]]} rotationY={NORTH} mood={fuse > 0.3 ? "scared" : "happy"} fuse={fuse} />
            <pointLight position={[HISS[0], 1.6, HISS[2] - 1.2]} color="#ffffff" intensity={14 * fuse} distance={5} decay={2} />
            {t > off + 0.15 ? <Puffs position={[HISS[0], 1.5, HISS[2] - 0.3]} color="#ffffff" count={6} /> : null}
          </>
        );
      },
    },
    {
      cue: "10.two",
      ...cam.push({ on: mh(0, 1.5, -4.9), dist: 3.9, to: 3.5, yaw: 0, pitch: -2, fov: 50 }),
      zone: Z3.hall,
      look: WARM,
      note: "At the back, by the empty cabinet: two pillagers side by side with their crossbows, watching all that. Slowly, each head turns to the other.",
      stage: (t) => {
        const looked = wordAt("10.two", "looked");
        const k = ease(ramp(t, looked - 0.25, looked + 0.15));
        const out = mh(0, 1.6, 6);
        return (
          <>
            <Cabinet open={1} swords={1} bows={1} rest={1} />
            <Pillager n={3} position={P1} rotationY={0} crossbow lookAt={mix(out, pillagerFace(P2), k)} mad={0.3} />
            <Pillager n={4} position={P2} rotationY={0} crossbow lookAt={mix(out, pillagerFace(P1), k)} mad={0.3} />
          </>
        );
      },
    },
    {
      cue: "10.why",
      ...cam.push({ on: mh(-0.15, 1.55, -4.9), dist: 3.4, to: 3.1, yaw: 10, pitch: -2, fov: 48 }),
      zone: Z3.hall,
      look: WARM,
      note: "The left one asks, out of the side of his mouth, and nods at the monsters. He lifts a hand: we only said yes.",
      stage: (t) => {
        const we = wordAt("10.why", "we");
        const said = wordAt("10.why", "said");
        const sh = ease(ramp(t, we - 0.1, we + 0.15));
        return (
          <>
            <Cabinet open={1} swords={1} bows={1} rest={1} />
            <Pillager n={3} position={P1} rotationY={0} crossbow lookAt={t > 0.5 && t < said - 0.05 ? mh(0, 1.6, 6) : pillagerFace(P2)} talk={t < said - 0.1 || t > we ? 1 : 0} armL={-0.9 * sh} tilt={0.15 * sh} mad={0.2} />
            <Pillager n={4} position={P2} rotationY={0} crossbow lookAt={pillagerFace(P1)} mad={0.2} />
            <Bubble text="WHY?" position={[P1[0] - 0.1, 2.75, P1[2] + 0.2]} scale={0.3 * pop(t, 0.05) * (t < said - 0.1 ? 1 : 0)} tail={0} dark />
          </>
        );
      },
    },
    {
      cue: "10.dunno",
      ...cam.push({ on: mh(0.1, 1.55, -4.9), dist: 3.3, to: 3.6, yaw: -8, pitch: -2, fov: 48 }),
      zone: Z3.hall,
      look: WARM,
      note: "The right one lifts both hands and lets them drop. Then the two of them turn and look out at the monsters again, and stand there. Hold it for a full second with nothing said.",
      stage: (t) => {
        const know = wordAt("10.dunno", "know");
        const sh = Math.sin(ease(ramp(t, 0.1, know + 0.3)) * Math.PI);
        const k = ease(ramp(t, know + 0.45, know + 0.8));
        const out = mh(0, 1.6, 6);
        return (
          <>
            <Cabinet open={1} swords={1} bows={1} rest={1} />
            <Pillager n={3} position={P1} rotationY={0} crossbow lookAt={mix(pillagerFace(P2), out, k)} mad={0.2} />
            <Pillager n={4} position={P2} rotationY={0} crossbow lookAt={mix(pillagerFace(P1), out, k)} armL={-0.9 * sh} tilt={-0.2 * sh} mad={0.2} />
            <Bubble text="?" position={[P2[0] + 0.1, 2.75, P2[2] + 0.2]} scale={0.34 * pop(t, 0.15) * (t < know + 0.4 ? 1 : 0)} tail={0} dark />
          </>
        );
      },
    },
    {
      cue: "11.sub",
      ...cam.push({ on: mh(0, TY + 0.55, 0.6), dist: 3.0, to: 2.5, yaw: 0, pitch: 10, fov: 42 }),
      zone: Z3.hall,
      look: WARM,
      note: "The arm, back on its own, stands up on its elbow in the middle of the map on the table with the sign in its fingers, and everybody in the hall, grey and green, is jumping behind it.",
      stage: (t) => {
        const sub = wordAt("11.sub", "subscribe");
        return (
          <>
            <Cabinet open={1} swords={1} bows={1} rest={1} />
            <Band t={t} cheer={1} look={mh(0, 2, 8)} />
            <MapSheet position={MAP} />
            <Arm position={mh(-0.42, TY + 0.03 + hop(t, 0.1, 0.15, 0.25), 1.3)} rotationY={0} rear={1} talk={t} scale={1.2} />
            <SubscribeSign position={mh(0.12, TY + 0.85, 0.7)} scale={0.36 * pop(t, sub - 0.25)} tilt={0.05 * Math.sin(t * 6)} />
            <Bits position={mh(0.25, TY + 0.75, 0.9)} t={t - sub + 0.25} color="#ffd24a" count={14} power={2.4} />
          </>
        );
      },
    },
  ],
});
void mix;

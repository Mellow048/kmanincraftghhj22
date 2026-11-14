import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Arm, Bits, Bubble, Crowd, Dad, DustRing, EAST, Glint, Hiss, MANSION_HALL, MapSheet, Mum, NIGHT, NORTH, Pillager, SubscribeSign, WARM, WEST, Z3, dadSocket, ease,
  heldAt, hop, jolt, m, mh, mix, monsterFace, pillagerFace, pillagerHand, pop, ramp, timing, wordAt,
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
const C2: Vec3 = mh(2.9, 0, 2.7);
const D2: Vec3 = mh(1.3, 0, 2.7);
const MAP: Vec3 = mh(0, TY + 0.03, 0.5);

/** The village, forty of them, filling the south half of the hall and facing north. Hall coordinates. */
const KINDS: Kind[] = ["zombie", "skeleton", "creeper", "zombie", "enderman", "skeleton", "zombie", "creeper", "spider"];
const FORTY: Array<[Kind, number, number, number?]> = Array.from({ length: 36 }, (_, i) => {
  const row = Math.floor(i / 9);
  const col = i % 9;
  return [KINDS[(i * 4 + row) % KINDS.length], -6.4 + col * 1.6 + (row % 2) * 0.7, 4.3 + row * 1.35, 0.9 + ((i * 7) % 3) * 0.06] as [Kind, number, number, number?];
});
const Guests: React.FC<{ t: number; look?: Vec3; mood?: "calm" | "happy" | "scared" | "sad" | "angry"; hopAt?: number; family?: boolean }> = ({ t, look = CFACE, mood, hopAt, family = true }) => (
  <>
    <Crowd who={FORTY} dx={mh(0, 0, 0)[0]} dz={mh(0, 0, 0)[2]} face={NORTH} look={look} mood={mood} hopAt={hopAt} t={t} n0={2} />
    <Hiss position={mh(2.6, 0, 3.4)} rotationY={NORTH} lookAt={look} mood={mood} />
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
/** The mansion's front door: two leaves, `k` radians open (inwards). */
const Doors: React.FC<{ k: number }> = ({ k }) => (
  <>
    {[-1, 1].map((s) => (
      <group key={s} position={m(s * 1.2, 0, 0.1)} rotation={[0, s * k, 0]}>
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
      ...cam.push({ on: mh(0, 1.5, -1.6), dist: 5.4, to: 4.4, yaw: 0, pitch: -6, fov: 50 }),
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
      ...cam.push({ on: m(-0.15, 1.6, 0.6), dist: 2.4, to: 1.9, yaw: 58, pitch: 0, fov: 40 }),
      zone: Z3.mansion,
      look: NIGHT,
      note: "The door, side on, close: it opens the width of a nose, and a grey nose comes out of it, with a crossbow under it. Mum gives it a little wave.",
      stage: (t) => {
        const k = ease(ramp(t, 0.05, 0.4));
        return (
          <>
            <Doors k={0.55 * k} />
            <Pillager n={4} position={m(0.25, 0.3, -0.75 + 0.3 * k)} rotationY={0} crossbow armR={-1.2 * k} lookAt={monsterFace("zombie", m(-0.2, 0.3, 1.15))} />
            <Mum position={m(-0.2, 0.3, 1.15)} rotationY={NORTH} wave={0.75 * ease(ramp(t, 0.4, 0.65))} arms={0} />
            <Dad position={m(1.2, 0.15, 2.0)} rotationY={NORTH} />
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
      ...cam.push({ on: CFACE, dist: 2.0, to: 1.6, yaw: -20, pitch: -10, fov: 38 }),
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
      ...cam.push({ on: [(C2[0] + D2[0]) / 2, 1.2, C2[2]], dist: 3.3, to: 2.8, yaw: 4, pitch: 2, fov: 40 }),
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
            <Guests t={t} family={false} look={[D2[0] + 0.8, 1.2, D2[2]]} />
            <Band t={t} chief={false} look={[D2[0] + 0.8, 1.2, D2[2]]} />
            <Mum position={mh(0.1, 0, 3.3)} rotationY={NORTH + 0.6} lookAt={[D2[0] + 0.8, 1.2, D2[2]]} arms={0.2} />
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
            <Guests t={t} family={false} look={hand} mood={up > 0.5 ? "happy" : undefined} hopAt={deal + 0.2} />
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
      cue: "11.sub",
      ...cam.push({ on: mh(0, TY + 0.55, 0.6), dist: 3.0, to: 2.5, yaw: 0, pitch: 10, fov: 42 }),
      zone: Z3.hall,
      look: WARM,
      note: "The arm, back on its own, stands up on its elbow in the middle of the map on the table with the sign in its fingers, and everybody in the hall, grey and green, is jumping behind it.",
      stage: (t) => {
        const sub = wordAt("11.sub", "subscribe");
        return (
          <>
            <Band t={t} cheer={1} look={mh(0, 2, 8)} />
            <MapSheet position={MAP} />
            <Arm position={mh(-0.9, TY + 0.03 + hop(t, 0.1, 0.15, 0.25), 0.9)} rotationY={0} rear={1} talk={t} scale={1.4} />
            <SubscribeSign position={mh(0.25, TY + 0.75, 0.9)} scale={0.62 * pop(t, sub - 0.25)} tilt={0.05 * Math.sin(t * 6)} />
            <Bits position={mh(0.25, TY + 0.75, 0.9)} t={t - sub + 0.25} color="#ffd24a" count={14} power={2.4} />
          </>
        );
      },
    },
  ],
});
void mix;

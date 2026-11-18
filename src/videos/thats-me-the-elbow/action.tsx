import { Block, PixelText } from "../../engine";
import type { Pose } from "../../engine";
import { Kid, Pal, Gran, Uncle, Partners, Cake, pose } from "./cast";
import type { V } from "./cast";
import { CameraBox, Stand, DressChair, BOX, MARK } from "./sets";
import { Print, DoorPhotos, BIG } from "./paper";
import { w, go, prog, mix, vMix } from "./kit";
export type Drill = "room" | "test" | "chairs" | "pair";
export const OUT: V = [1.46, 1.04, 2.35];
const L = 0.61875;
const turnAt = (p: V, turn: number): V => [
  p[0] + 0.133 * Math.cos(turn) + 0.015 * Math.sin(turn),
  p[1] + 0.22,
  p[2] - 0.133 * Math.sin(turn) + 0.015 * Math.cos(turn),
];
export const timerTurn = (where: V) => (where === BOX ? 2.15 : -2.48);
export const finger = (where: V) => turnAt(where, timerTurn(where));
/** The right sleeve's tip, the timer button, and the insert lens use the same point. */
export function pressMark(where: V): V {
  const b = finger(where);
  return [b[0] + 0.3375, 0.044, b[2] + 0.606];
}
export function Timer({ where = BOX, push = 0, t = 0, blink = false }: { where?: V; push?: number; t?: number; blink?: boolean }) {
  return (
    <>
      {where !== BOX && <Stand at={where} />}
      <CameraBox position={where} turn={timerTurn(where)} push={push} lamp={blink && Math.floor(t * 7) % 2 === 0} />
    </>
  );
}
export function Press({ where = BOX, down, t = 0 }: { where?: V; down: number; t?: number }) {
  return (
    <Kid
      position={pressMark(where)}
      rotationY={Math.PI}
      pose={pose({ armR: [-1.55 + 0.24 * down, 0, 0], armL: [-0.29, 0, -0.18] })}
      lookAt={finger(where)}
      face="brave"
      time={t}
      breath={0}
      weightShift={0}
    >
      <Block position={[0, -0.065, 0.022]} size={[0.13, 0.117, 0.115]} color="#e2b18a" />
    </Kid>
  );
}
export function Chairs({ left = 1, right = 1, slide = 1 }: { left?: number; right?: number; slide?: number }) {
  return (
    <>
      <DressChair position={[0.13, 0, -1.36]} turn={0.035} hat={left ? "specs" : "none"} />
      <DressChair
        position={[1.23 + 0.38 * (1 - slide), 0, -1.34 + 0.68 * (1 - slide)]}
        turn={-0.05 - 0.6 * (1 - slide)}
        hat={right ? "hat" : "none"}
      />
    </>
  );
}
export function Testers({ t = 0, squeeze = 0 }: { t?: number; squeeze?: number }) {
  return (
    <>
      <Pal n={0} position={[mix(0.08, 0.53, squeeze), 0.008, -1.08]} headRoll={-0.14 * squeeze} time={t + 0.63} />
      <Pal n={1} position={[mix(1.29, 0.86, squeeze), 0.008, -1.44]} time={t + 0.35} headRoll={0.18 * squeeze} />
    </>
  );
}
const bez = (a: number, b: number, c: number, q: number) => a * (1 - q) ** 2 + 2 * b * q * (1 - q) + c * q * q;
/** At a triple: contact on breath one; apex/sideways crossing on breath two; shoes back on the mark on breath three. */
export function Rep({ t, cue, kind = "room" }: { t: number; cue: string; kind?: Drill }) {
  const double = cue === "2.drill" || cue === "5.reps";
  const n = double && t >= w(cue, "hus", 3) - 0.026 ? 3 : 0;
  const [first, mid, end] = [0, 1, 2].map((i) => w(cue, "hus", i + n));
  const yard = kind === "pair",
    chairs = kind === "chairs";
  const booth = yard ? OUT : BOX;
  const from = pressMark(booth);
  const to: V = yard ? [0, 0.015, 0.78] : chairs ? [0.68, 0.015, -1.55] : [MARK[0], 0.054, MARK[2]];
  const q = t < mid ? 0.5 * prog(t, first + 0.088, mid) : 0.5 + 0.5 * prog(t, mid, end + 0.015);
  const arc = Math.sin(Math.PI * q),
    vault = !(yard || chairs);
  const p: V = [
    bez(from[0], yard ? 0.91 : chairs ? 1.74 : -0.39, to[0], q),
    mix(from[1], to[1], q) + arc * (vault ? 0.92 : 0.085),
    bez(from[2], yard ? 0.69 : chairs ? -0.13 : -0.5, to[2], q),
  ];
  const down = go(t, first - 0.11, first + 0.013) * (1 - go(t, first + 0.057, first + 0.12));
  const brace = Math.sin(Math.PI * prog(t, end - 0.01, end + 0.19));
  const swung = t - first;
  const leg = arc * Math.sin(q * Math.PI * 2.8 + 0.3);
  const flight: Partial<Pose> = vault
    ? {
        bodyPitch: 0.11 * arc,
        armR: [-1.14 * arc, 0, 0.34 * arc],
        armL: [0.85 * arc, 0, -0.29 * arc],
        legR: [-0.98 * arc - 0.26 * brace, 0, 0],
        legL: [-0.4 * arc - 0.28 * brace, 0, 0],
        kneeR: [1.52 * arc + 0.56 * brace, 0, 0],
        kneeL: [1.05 * arc + 0.58 * brace, 0, 0],
      }
    : {
        bodyRoll: 0.15 * arc,
        armR: [0.45 * leg, 0, 0.19 * arc],
        armL: [-0.48 * leg, 0, -0.32 * arc],
        legR: [-0.29 * leg, 0, 0.45 * arc],
        legL: [0.48 * leg, 0, -0.39 * arc],
        kneeR: [0.26 * arc, 0, 0],
        kneeL: [0.34 * arc, 0, 0],
      };
  return (
    <>
      <Timer where={booth} push={down} t={t} blink={t > first} />
      {chairs && <Chairs />}
      {kind === "test" && <Testers t={t} squeeze={go(t, mid - 0.14, end)} />}
      {yard && <Partners />}
      {q <= 0 ? (
        <Press where={booth} down={down} t={t} />
      ) : (
        <Kid
          position={p}
          rotationY={mix(Math.PI, yard ? -0.1 : 0.01, go(q, 0, 0.96))}
          pose={pose(flight, swung)}
          plantFeet={q >= 1}
          headRoll={q >= 1 ? -0.085 : 0}
          face={q > 0.94 ? "grin" : "brave"}
          time={t}
          shadow
        />
      )}
    </>
  );
}
export function PartyStart({ t }: { t: number }) {
  const h = go(t, 0.09, 0.65);
  return (
    <>
      <Gran position={[-0.3 + 0.14 * h, 0.072 * Math.abs(Math.sin(t * 7 + 0.5)), -0.22]} animation="wave" time={t + 0.54} />
      <Pal n={0} position={[0.91 - 0.34 * h, 0.1 * Math.abs(Math.sin(t * 7 + 1.7)), -0.46]} animation="cheer" time={t + 0.58} />
      <Pal n={1} position={[-1.3 - 0.28 * h, 0.08 * Math.abs(Math.sin(t * 7)), -0.86]} animation="wave" time={t + 0.22} />
      <Kid position={[-2.3 + 0.36 * h, 0, 0.2]} pose={pose({ armR: [-0.28, 0.06, 1.25] })} time={t} />
    </>
  );
}
export function Trials({ count = 3 }: { count?: number }) {
  const names = ["elbow", "ear", "brow"] as const;
  return (
    <>
      {names.slice(0, count).map((name, i) => (
        <Print
          key={name}
          name={name}
          width={0.54}
          label={i === 0 ? "LAST BIRTHDAY" : "TRY 0" + i}
          position={[-0.19 + 0.57 * i, 1.75, -2.48 + 0.014 * i]}
          roll={[-0.095, 0.056, -0.037][i]}
          magnet
        />
      ))}
    </>
  );
}
/** A simple wind-up indicator. The digits belong to the brass dial, not a HUD. */
export function TimerInsert({ t }: { t: number }) {
  return (
    <group position={[0, 1.23, -0.12]}>
      <Block position={[0, -0.37, 0]} size={[0.98, 0.1, 0.57]} color="#956c4e" />
      <CameraBox position={[0, -0.08, 0.032]} scale={1.55} lamp={Math.floor(t * 5) % 2 === 0} />
      <Block position={[0, -0.18, 0.239]} size={[0.415, 0.107, 0.024]} color="#64594c" />
      <PixelText text="3 SEC" position={[0, -0.179, 0.255]} height={0.094} maxWidth={0.395} color="#ffd58e" />
    </group>
  );
}
/** The row is never re-sorted for the family negative. The only moving space is the notch to the left of the tall hat. */
export function Family({
  t = 0,
  lean = 0,
  cake = 1,
  kid,
  partying = false,
}: {
  t?: number;
  lean?: number;
  cake?: number;
  kid?: React.ReactNode;
  partying?: boolean;
}) {
  return (
    <>
      <Gran position={[-0.53, 0, -0.16]} animation={partying ? "wave" : "idle"} time={t + 0.57} headYaw={0.1} />
      <Uncle
        position={[0.53, 0, -0.4]}
        pose={pose({ bodyRoll: -0.15 * lean, armL: [-0.77 * (1 - cake), 0, -0.23], armR: [-0.61 * (1 - cake), 0, 0.13] }, t)}
        headRoll={-0.07 - 0.13 * lean}
        time={t}
      />
      <Pal n={0} position={[-1.23, 0, -0.82]} animation={partying ? "cheer" : "idle"} time={t + 0.2} />
      <Pal n={1} position={[1.21, 0, -0.78]} animation={partying ? "wave" : "idle"} time={t + 0.68} />
      <group position={vMix([0.65, 1.02, -0.01], [0.14, 0.88, 0.26], cake)}>
        <Cake />
      </group>
      {kid}
    </>
  );
}
/** Lift a print from the fridge BY ITS CORNER. Solve the paper centre from the left hand rather than floating it to the magnet. */
export function Swap({ away, name, t }: { away: number; name: "elbow" | "family"; t: number }) {
  const s = 0.91,
    yaw = mix(2.62, 2.01, away),
    alpha = mix(-2.22, -0.94, away);
  const at: V = [mix(-0.84, -1.06, away), 0.007, mix(-0.57, -0.19, away)];
  const h = L * s;
  const dx = -0.3375 * s,
    forward = -Math.sin(alpha) * h;
  const hand: V = [
    at[0] + Math.cos(yaw) * dx + Math.sin(yaw) * forward,
    at[1] + 1.35 * s - Math.cos(alpha) * h,
    at[2] - Math.sin(yaw) * dx + Math.cos(yaw) * forward,
  ];
  // At the top of the reach the sheet is flush to exactly the magnet's resting place.
  const p: V = [BIG[0] + hand[0] - -0.349, BIG[1] + hand[1] - 1.576, BIG[2] + hand[2] - -0.803];
  const k = go(away, 0, 0.14);
  return (
    <>
      <DoorPhotos main="blank" />
      <Print
        name={name}
        width={0.75}
        position={vMix(BIG, p, k)}
        roll={-0.025 - 0.22 * away}
        label={name === "family" ? "GRAN'S BIRTHDAY" : "LAST BIRTHDAY"}
        magnet={away < 0.12}
      />
      <Gran position={at} rotationY={yaw} pose={pose({ armL: [alpha, 0, 0] }, t)} lookAt={hand} time={t} breath={0} weightShift={0} />
    </>
  );
}

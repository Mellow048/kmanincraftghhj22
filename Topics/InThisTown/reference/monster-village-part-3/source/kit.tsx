import type React from "react";
import { Block, PixelText, Tree } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { MONSTER, Skeleton, wordClock } from "../../../Topics/InThisTown";
import { Bus, Crowd, Folk, Hiss, Mum, Postman, h } from "../in-this-town-monster-village-part-2/kit";
import type { Kind } from "../in-this-town-monster-village-part-2/kit";
import timingJson from "./timing.json";

/**
 * Part three's kit. The people, the village, the farm and the hideout are parts one and two's, passed on from here
 * so a scene imports only from "./kit". What is new: this film's clock, dad's arm on its own, the cages, the castle
 * village's guards, and the pillagers.
 */
export * from "../in-this-town-monster-village-part-2/kit";
export { IronGolem, Villager, ROBE, Pillager, pillagerFace, pillagerHand, MANSION_HALL } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
/** Seconds into its shot at which a word is said. This film's clock. */
export const wordAt = wordClock(timing);
/** Seconds a cue lasts. */
export const dur = (cue: string): number => {
  const c = timing.cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 1;
};

// ----------------------------------------------------------------------------- places

/** Where Mo stood in the street, and what he left there (as part two ended). */
export const SPOT: Vec3 = [-1.6, 0, 2.6];
export const BLADE: Vec3 = [SPOT[0] - 0.55, 0.1, SPOT[2] + 0.25];
export const HELM: Vec3 = [SPOT[0] + 0.45, 0, SPOT[2] - 0.1];
/** Where the boy kneels with the helmet. */
export const KNEEL: Vec3 = [SPOT[0] + 0.45, 0, SPOT[2] - 0.3];
/** The tree the arm hides behind: south-west of him, behind his back. The shots draw it (`ArmTree`). */
/** Clear of the well (x −7.2…−4.8, z 5.8…8.2): the arm is 1.2 m long and must not lie in its wall. */
export const ARMTREE: Vec3 = [-3.2, 0, 4.5];
/** Where the arm sits, at the foot of that tree on the side away from him. */
export const ARM_HIDE: Vec3 = [ARMTREE[0] - 0.55, 0, ARMTREE[2] + 0.35];
/** Where the arm peeks out from. */
export const ARM_PEEK: Vec3 = [ARMTREE[0] + 0.35, 0, ARMTREE[2] + 0.5];

/** The castle village. Its yard is x −17…17, z −14…6 round this point; no south wall. */
export const CASTLE: Vec3 = [0, 0, 200];
export const c = (x: number, y: number, z: number): Vec3 => [CASTLE[0] + x, CASTLE[1] + y, CASTLE[2] + z];
/** The five cages, west to east. His is the first; Mo's is the last. */
export const CAGE_X = [-5, -2.5, 0, 2.5, 5];
export const MY_CAGE: Vec3 = c(CAGE_X[0], 0, 0);
export const MO_CAGE: Vec3 = c(CAGE_X[4], 0, 0);
/** Where the guard who laughs stands. */
export const GUARD: Vec3 = c(-2.2, 0, 3.4);

/** The mansion, from outside: its front door. The forest is south of it. */
export const MANSION: Vec3 = [0, 0, -260];
export const m = (x: number, y: number, z: number): Vec3 => [MANSION[0] + x, MANSION[1] + y, MANSION[2] + z];
/** The mansion's hall (the pack's MansionHall): the floor under the middle of its table. */
export const MHALL: Vec3 = [80, 0, -260];
export const mh = (x: number, y: number, z: number): Vec3 => [MHALL[0] + x, MHALL[1] + y, MHALL[2] + z];

export const Z3 = {
  street: "village+farm+day",
  night: "village+night",
  farm: "village+farm+day",
  hide: "hide",
  castle: "castle",
  mansion: "mansion",
  hall: "mhall",
  black: "nothing",
};

// ----------------------------------------------------------------------------- the arm

const BONE = "#dcdcd2";
/**
 * Dad's arm, on its own. `position` is the ground under its wrist; it points along +Z, hand first, turned by
 * `rotationY`. `crawl` is metres crawled: the fingers walk. `rear` 0–1 stands it up on its elbow, hand in the air,
 * which is how an arm looks at something. `talk` is any number that changes: the fingers wag with it.
 * `finger` 0–1 puts one finger up.
 */
export const Arm: React.FC<{ position: Vec3; rotationY?: number; crawl?: number; rear?: number; talk?: number; finger?: number; turn?: number; scale?: number }> = ({
  position, rotationY = 0, crawl = 0, rear = 0, talk = 0, finger = 0, turn = 0, scale = 1,
}) => {
  const step = crawl * 9;
  const hump = Math.abs(Math.sin(step)) * 0.05 * (1 - rear);
  return (
    <group position={[position[0], position[1] + 0.05 + hump, position[2]]} rotation={[0, rotationY, 0]} scale={scale}>
      {/* The forearm, behind the wrist. Rearing swings it up about its far end, the elbow. */}
      <group position={[0, 0, -0.62]} rotation={[-1.35 * rear, 0, Math.sin(step) * 0.08 * (1 - rear)]}>
        <Block position={[0, 0, 0.31]} size={[0.1, 0.1, 0.62]} color={BONE} />
        <Block position={[0, 0, 0]} size={[0.14, 0.14, 0.1]} color="#e8e8de" />
        {/* The hand. */}
        <group position={[0, 0, 0.64]} rotation={[0.9 * rear, turn, 0]}>
          <Block position={[0, 0, 0.07]} size={[0.2, 0.07, 0.16]} color="#e8e8de" />
          {[-0.075, -0.025, 0.025, 0.075].map((x, i) => {
            const walk = Math.sin(step + i * 1.6) * 0.5 * (1 - rear);
            const wag = Math.sin(talk * 11 + i * 1.3) * 0.5 * (talk ? 1 : 0);
            const up = i === 1 ? -1.3 * finger : 0.5 * finger;
            return (
              <group key={i} position={[x, 0, 0.15]} rotation={[0.35 + walk + wag + up, 0, 0]}>
                <Block position={[0, 0, 0.07]} size={[0.04, 0.04, 0.14]} color={BONE} />
              </group>
            );
          })}
          <group position={[0.12, 0, 0.05]} rotation={[0, 0.7, 0]}>
            <Block position={[0, 0, 0.05]} size={[0.04, 0.04, 0.1]} color={BONE} />
          </group>
        </group>
      </group>
    </group>
  );
};

/** The tree the arm hides behind. */
export const ArmTree: React.FC = () => <Tree position={ARMTREE} height={4.6} leaf="#3f7f2d" />;

/** A sack over a head: goes in an avatar's `head`. */
export const Sack: React.FC = () => (
  <>
    <Block position={[0, 0.02, 0]} size={[0.58, 0.6, 0.58]} color="#a8875a" />
    <Block position={[0, -0.26, 0]} size={[0.6, 0.06, 0.6]} color="#6b4f2c" castShadow={false} />
    <Block position={[0.1, 0.1, 0.292]} size={[0.16, 0.14, 0.01]} color="#8f6f45" castShadow={false} />
  </>
);

// ----------------------------------------------------------------------------- the hideout

/** Where each of them stands in the big room, in a clump. Room coordinates (kit `h`). */
export const AT = {
  mum: h(-1.6, 0, 0.2),
  dad: h(-0.3, 0, 0.5),
  hiss: h(1.0, 0, 0.1),
  post: h(2.1, 0, -0.9),
  bus: h(-3.4, 0, -0.8),
  teacher: h(3.0, 0, -0.2),
};
export const REST: Array<[Kind, number, number, number?]> = [
  ["zombie", -2.6, -1.4],
  ["skeleton", -1.5, -1.9],
  ["creeper", 0.2, -1.7],
  ["zombie", 1.2, -2.2],
  ["skeleton", -3.2, -2.6],
  ["enderman", -0.6, -3.0],
  ["zombie", 2.4, -2.9, 0.76],
  ["creeper", -2.0, -3.2, 0.78],
  ["spider", 3.2, -3.2, 0.8],
];
type Mood = "calm" | "happy" | "scared" | "sad" | "angry";
/**
 * The village in the hideout, without dad: he is the shot's, because he is the one doing things. `look` is where
 * their heads point, `nod` drops every head, `lean` bends them in, `squeeze` 0–1 walks them in towards dad.
 */
export const Village: React.FC<{ look?: Vec3; mood?: Mood; nod?: number; lean?: number; squeeze?: number; teacher?: boolean; mum?: boolean; hiss?: boolean; t?: number; hopAt?: number }> = ({
  look, mood = "calm", nod = 0, lean = 0, squeeze = 0, teacher = true, mum = true, hiss = true, t = 0, hopAt,
}) => {
  const to = (p: Vec3, k = 0.45): Vec3 => [p[0] + (AT.dad[0] - p[0]) * squeeze * k, p[1], p[2] + (AT.dad[2] - p[2]) * squeeze * k];
  const up = (i: number): number => (hopAt === undefined ? 0 : Math.max(0, Math.sin(Math.min(1, Math.max(0, (t - hopAt - i * 0.05) / 0.3)) * Math.PI)) * 0.3);
  const o = h(0, 0, 0);
  return (
    <>
      {mum ? <Mum position={[to(AT.mum)[0], up(1), to(AT.mum)[2]]} rotationY={0.5} mood={mood} lookAt={look} nod={nod} lean={lean} arms={0.3} /> : null}
      {hiss ? <Hiss position={[to(AT.hiss)[0], up(2), to(AT.hiss)[2]]} rotationY={-0.5} mood={mood} lookAt={look} nod={nod} lean={lean} /> : null}
      <Postman position={to(AT.post)} rotationY={-0.6} lookAt={look} nod={nod} lean={lean} />
      <Bus position={[to(AT.bus, 0.3)[0], up(4) * 1.5, to(AT.bus, 0.3)[2]]} rotationY={0.7} mood={mood} size={1.5} />
      {teacher ? <Folk kind="enderman" n={0} position={to(AT.teacher)} rotationY={-0.8} lookAt={look} nod={nod} lean={lean} /> : null}
      <Crowd who={REST.map(([k, x, z, s]) => [k, x + (AT.dad[0] - o[0] - x) * squeeze * 0.35, z + (AT.dad[2] - o[2] - z) * squeeze * 0.35, s] as [Kind, number, number, number?])} dx={o[0]} dz={o[2]} look={look} mood={mood} nod={nod} hopAt={hopAt === undefined ? undefined : hopAt + 0.1} t={t} />
    </>
  );
};

/** Where dad's raised hand is: the +X arm held out in front (`raise` 1). */
export const dadHand = (p: Vec3, rotY: number, raise = 1): Vec3 => {
  const u = 1.8 / 32;
  const b = 1.4 * raise;
  const lx = 5 * u;
  const ly = 23 * u - 12 * u * Math.cos(b);
  const lz = 12 * u * Math.sin(b);
  return [p[0] + lx * Math.cos(rotY) + lz * Math.sin(rotY), p[1] + ly, p[2] - lx * Math.sin(rotY) + lz * Math.cos(rotY)];
};
/** Dad's empty shoulder: where the arm plugs in. */
export const dadSocket = (p: Vec3, rotY: number): Vec3 => {
  const u = 1.8 / 32;
  return [p[0] - 5 * u * Math.cos(rotY), p[1] + 23 * u, p[2] + 5 * u * Math.sin(rotY)];
};
/** Dad: the pack's skeleton in his blue scarf, so a shot can take his arm off (`noArm`), hold a hand up (`raise`) and drop his skull (`headDrop`). */
export const Dad: React.FC<React.ComponentProps<typeof Skeleton>> = (p) => <Skeleton scarf={MONSTER.scarfBlue} phase={1.9} {...p} />;

// ----------------------------------------------------------------------------- the castle village

const IRON = "#3a3d44";
/** A cage: 2.2 wide, 2.4 high, 2.2 deep, iron bars on all four sides, a plank floor and roof. `position` is the middle of its floor. */
export const Cage: React.FC<{ position: Vec3 }> = ({ position }) => {
  const w = 1.1;
  const bars: Array<[number, number]> = [];
  for (let i = 0; i <= 6; i++) {
    const a = -w + (i * 2 * w) / 6;
    bars.push([a, -w], [a, w]);
    if (i > 0 && i < 6) bars.push([-w, a], [w, a]);
  }
  return (
    <group position={position}>
      <Block position={[0, 0.04, 0]} size={[2.3, 0.08, 2.3]} color="#6b4a2a" castShadow={false} />
      <Block position={[0, 2.42, 0]} size={[2.4, 0.12, 2.4]} color="#4a3320" />
      {bars.map(([x, z], i) => (
        <Block key={i} position={[x, 1.22, z]} size={[0.07, 2.3, 0.07]} color={IRON} metalness={0.4} roughness={0.5} />
      ))}
      {[-w, w].map((z) => (
        <Block key={z} position={[0, 1.25, z]} size={[2.2, 0.06, 0.05]} color={IRON} castShadow={false} />
      ))}
      {[-w, w].map((x) => (
        <Block key={x} position={[x, 1.25, 0]} size={[0.05, 0.06, 2.2]} color={IRON} castShadow={false} />
      ))}
    </group>
  );
};

/** The map mum brings: a roll of paper, flat. `position` is its middle. `open` 0–1 unrolls it. */
export const MapSheet: React.FC<{ position: Vec3; open?: number; rotationY?: number }> = ({ position, open = 1, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.01, 0]} size={[0.25 + 0.95 * open, 0.02, 0.8]} color="#ead9a8" castShadow={false} />
    {open > 0.6 ? (
      <>
        <Block position={[-0.2, 0.022, -0.1]} size={[0.5, 0.004, 0.36]} color="#8a8a8a" castShadow={false} />
        <Block position={[-0.2, 0.026, -0.1]} size={[0.3, 0.004, 0.18]} color="#6fae4a" castShadow={false} />
        <Block position={[0.32, 0.022, 0.16]} size={[0.2, 0.004, 0.2]} color="#4a7ac2" castShadow={false} />
        <PixelText text="X" position={[-0.2, 0.03, -0.1]} rotation={[-Math.PI / 2, 0, 0]} height={0.16} maxWidth={0.16} color="#c23a2e" />
      </>
    ) : null}
  </group>
);

// ----------------------------------------------------------------------------- helpers

/** A point `k` of the way from `a` to `b`. */
export const mix = (a: Vec3, b: Vec3, k: number): Vec3 => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
/** The `rotationY` that faces from `a` towards `b`. */
export const toward = (a: Vec3, b: Vec3): number => Math.atan2(b[0] - a[0], b[2] - a[2]);
/** Where to put an `Arm` so its ELBOW is at `at` (a hand that holds it, a shoulder it plugs into), pointing along `yaw`. */
export const heldAt = (at: Vec3, yaw: number): Vec3 => [at[0] + Math.sin(yaw) * 0.62, at[1] - 0.05, at[2] + Math.cos(yaw) * 0.62];
/** Black, whatever the light: for an eyelid, the inside of a sack, a cut through the dark. */
export const Black: React.FC<{ position: Vec3; size: Vec3; color?: string }> = ({ position, size, color = "#000000" }) => (
  <mesh position={position}>
    <boxGeometry args={size} />
    <meshBasicMaterial color={color} />
  </mesh>
);

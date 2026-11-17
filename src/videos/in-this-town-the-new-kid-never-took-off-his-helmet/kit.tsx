import type React from "react";
import { Block, MinecraftAvatar, PixelText, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { CHILD, KID, NORTH, Player, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import { classroom } from "../../../Topics/WhatIf/school";
import timingJson from "./timing.json";

/**
 * This film's own cast and places: the teller in green, the new kid and his helmet, what is under it, the class.
 *
 * Everything another "In This Town" film could use is in the topic's pack, Topics/InThisTown
 * (catalogue with pictures: Topics/InThisTown/PACK.md). It is passed on from here, so a scene
 * imports only from "./kit". The classroom is the What If pack's (Topics/WhatIf/school.tsx).
 */

export {
  ADULT, Bits, Bubble, CHILD, DEG, EAST, KID, NORTH, Player, Puffs, ROBE, SOUTH, SubscribeSign, Villager, WEST, ahead, beside, chestOf, ease, faceOf, jolt,
  pop, ramp, villagerFace,
} from "../../../Topics/InThisTown";
export { Black, DustRing, Glint, hop, mix, toward } from "../in-this-town-monster-village-part-3/kit";

export const timing = timingJson as unknown as Timing;
/** Seconds into its shot at which a word is said: `wordAt("3.wet", "wet")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

export const DAY = "overworld-day";
export const NIGHT = "overworld-night";

// ----------------------------------------------------------------------------- places

export const at = (o: Vec3, x: number, y: number, z: number): Vec3 => [o[0] + x, o[1] + y, o[2] + z];

/** The classroom (zone `class`). Lens inside it: under 3.3 m, between the east and west walls. */
export const CLASS: Vec3 = [0, 0, 0];
export const SPOT = classroom(CLASS);
/** The school yard and the road to the woods (zone `yard`). The school is north, the woods are west. */
export const YARD: Vec3 = [0, 0, 100];
/** The clearing in the woods (zone `woods`). The old lamp is its middle. */
export const WOODS: Vec3 = [0, 0, 200];

export const TABLE: Vec3 = at(YARD, -6, 0, 3.5);
export const POOL: Vec3 = at(YARD, 9, 0, 4.5);
export const HOME: Vec3 = at(YARD, 19, 0, -5);
/** Where the road goes into the trees. */
export const EDGE: Vec3 = at(YARD, -21, 0, 1.5);
/** The school's front wall: the posters hang on it. */
export const WALL: Vec3 = at(YARD, 0, 0, -5);

/** Where the new kid stands under the lamp, and the tree the teller hides behind (he is on its east side). */
export const LAMP: Vec3 = at(WOODS, 0, 0, 0);
export const KIDSPOT: Vec3 = at(WOODS, 0, 0, 1.1);
export const HTREE: Vec3 = at(WOODS, 7, 0, 3);
export const HIDE: Vec3 = at(WOODS, 7.75, 0, 3.05);

// ----------------------------------------------------------------------------- the cast

type A = Partial<MinecraftAvatarProps>;

/** The teller: a kid in GREEN. Nobody else in the film wears it. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#35c24a", arms: "#35c24a", legs: "#2f3f8a" }} blink {...p} />
);

const IRON = "#8f969e";
const IRON_DARK = "#5d646c";
const INK = "#07040b";
const FLESH = "#5a2470";
const FLESH_LIT = "#b25ad0";

/**
 * The helmet: an iron box over the whole head, one dark slit to see through. Its origin is the middle of the head
 * (it goes in the avatar's `head` prop, or stands alone on the ground). `glow` lights the slit from inside.
 */
export const Helmet: React.FC<{ position?: Vec3; rotation?: Vec3; glow?: number; wet?: boolean }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], glow = 0, wet = false }) => (
  <group position={position} rotation={rotation}>
    <Block position={[0, 0.02, 0]} size={[0.56, 0.6, 0.56]} color={wet ? "#7d868f" : IRON} roughness={wet ? 0.25 : 0.6} />
    <Block position={[0, 0.34, 0]} size={[0.1, 0.06, 0.6]} color={IRON_DARK} />
    <Block position={[0, -0.26, 0]} size={[0.6, 0.08, 0.6]} color={IRON_DARK} />
    {/* the slit */}
    <Block position={[0, 0.05, 0.281]} size={[0.4, 0.07, 0.012]} color={glow > 0 ? "#3a1050" : INK} emissive="#b25ad0" emissiveIntensity={glow * 2.4} castShadow={false} />
    {/* breathing holes, rivets */}
    {[-0.09, 0, 0.09].map((x) => (
      <Block key={x} position={[x, -0.1, 0.281]} size={[0.035, 0.035, 0.012]} color={INK} castShadow={false} />
    ))}
    {[-0.24, 0.24].flatMap((x) => [-0.18, 0.24].map((y) => <Block key={`${x}${y}`} position={[x, y, 0.281]} size={[0.035, 0.035, 0.02]} color="#c9cfd6" castShadow={false} />))}
  </group>
);

/** What is where a face should be: a black hole with a rim of something alive. Goes in the avatar's `head` prop. */
const HoleFace: React.FC<{ glow?: number; stir?: number }> = ({ glow = 0.6, stir }) => (
  <group>
    <Block position={[0, 0, 0.228]} size={[0.47, 0.47, 0.02]} color={FLESH} emissive={FLESH} emissiveIntensity={glow} castShadow={false} />
    <mesh position={[0, 0, 0.241]}>
      <boxGeometry args={[0.37, 0.37, 0.01]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
    {/* `stir` (seconds): something dark slides about inside the hole, and the bits of the rim twitch */}
    {stir === undefined
      ? null
      : [0, 1, 2].map((i) => (
          <mesh key={i} position={[0.11 * Math.sin(stir * 1.7 + i * 2.1), 0.1 * Math.cos(stir * 1.3 + i * 1.4), 0.247]}>
            <boxGeometry args={[0.1 + 0.03 * i, 0.08, 0.004]} />
            <meshBasicMaterial color={i === 1 ? "#4a1c66" : "#2f1142"} />
          </mesh>
        ))}
    {[[-0.185, 0.1], [0.185, -0.08], [0.06, 0.185], [-0.1, -0.185]].map(([x0, y0], i) => [x0 + (stir === undefined ? 0 : 0.014 * Math.sin(stir * 9 + i * 3)), y0 + (stir === undefined ? 0 : 0.014 * Math.cos(stir * 7 + i * 2))]).map(([x, y], i) => (
      <Block key={i} position={[x, y, 0.245]} size={[0.05, 0.05, 0.02]} color={FLESH_LIT} emissive={FLESH_LIT} emissiveIntensity={glow} castShadow={false} />
    ))}
  </group>
);

/**
 * The new kid: grey clothes and the helmet. `lift` raises the helmet off his head (metres, in his own size);
 * `bare` takes it away altogether, and then there is the hole. He never has a face.
 */
export const NewKid: React.FC<A & { lift?: number; bare?: boolean; glow?: number; wet?: boolean; holeGlow?: number; stir?: number }> = ({ lift = 0, bare = false, glow = 0, wet = false, holeGlow = 0.6, stir, ...p }) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#cfc3b6"
    hair="#24242a"
    face="blank"
    saccade={false}
    colors={{ torso: "#6f7782", arms: "#6f7782", legs: "#3a3f4a" }}
    head={
      <>
        {bare || lift > 0.02 ? <HoleFace glow={holeGlow} stir={stir} /> : null}
        {bare ? null : <Helmet position={[0, lift, 0]} glow={glow} wet={wet} />}
      </>
    }
    {...p}
  />
);
/** The middle of the new kid's head when he stands at `p`. */
export const kidHead = (p: Vec3): Vec3 => [p[0], p[1] + 1.56 * KID, p[2]];

/**
 * One tentacle, in blocks: from `from` (the hole) along a bent line to `to`. `k` 0–1 is how far out it has come.
 * `thick` is its width at the root in metres; `t` makes it writhe.
 */
export const Tentacle: React.FC<{ from: Vec3; to: Vec3; k: number; t: number; thick?: number; seed?: number; bend?: number; n?: number }> = ({
  from,
  to,
  k,
  t,
  thick = 0.3,
  seed = 1,
  bend = 1,
  n = 30,
}) => {
  if (k <= 0.01) return null;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const len = Math.hypot(dx, dy, dz) || 1;
  // A side direction to bend and writhe along.
  const sx = -dz / len;
  const sz = dx / len;
  const side = Math.sin(seed * 12.9898) * 0.9;
  const cx = from[0] + dx * 0.5 + sx * side * bend * len * 0.3;
  const cy = from[1] + dy * 0.5 + bend * len * 0.28 * (0.5 + 0.5 * Math.cos(seed * 4.1));
  const cz = from[2] + dz * 0.5 + sz * side * bend * len * 0.3;
  const count = Math.max(3, Math.round(n * k));
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const u = (i / (n - 1)) * 1;
        const a = (1 - u) * (1 - u);
        const b = 2 * u * (1 - u);
        const c = u * u;
        const w = Math.sin(u * 8 + t * 3.2 + seed * 2.3) * 0.14 * u * bend;
        const x = a * from[0] + b * cx + c * to[0] + sx * w;
        const y = a * from[1] + b * cy + c * to[1] + Math.cos(u * 7 + t * 2.6 + seed) * 0.08 * u * bend;
        const z = a * from[2] + b * cz + c * to[2] + sz * w;
        const s = thick * (1 - 0.68 * (i / Math.max(1, count - 1)));
        return (
          <group key={i} position={[x, y, z]} rotation={[i * 0.5 + seed, i * 0.8, 0]}>
            <Block size={[s, s, s]} color={i % 2 ? "#4a1d5e" : FLESH} emissive="#3a1050" emissiveIntensity={0.55} />
            {i % 3 === 0 ? <Block position={[0, -s * 0.5, 0]} size={[s * 0.45, s * 0.2, s * 0.45]} color="#e58ad0" emissive="#e58ad0" emissiveIntensity={0.5} castShadow={false} /> : null}
          </group>
        );
      })}
    </group>
  );
};

// ----------------------------------------------------------------------------- the class

/** The four who go missing, in the order they go, and their desks (col, row). All four had been mean to him. */
export const MISSING: Array<{ who: number; seat: [number, number] }> = [
  { who: 8, seat: [2, 0] },
  { who: 10, seat: [2, 1] },
  { who: 6, seat: [1, 0] },
  { who: 7, seat: [1, 1] },
];
const STAY: Array<{ who: number; seat: [number, number] }> = [
  { who: 4, seat: [0, 0] },
  { who: 9, seat: [0, 1] },
];
/** The three big kids. */
export const BULLY = [1, 5, 3];

/**
 * Everybody in the class but the teller and the new kid, at their desks. `gone` is how many have gone missing;
 * The missing go by columns (east column, then the middle one), so two empty desks stack in a tall frame.
 * `hide` leaves out the desks ("col,row") that would stand between the lens and its subject.
 */
export const Classmates: React.FC<{ gone?: number; hide?: string[]; look?: Vec3 }> = ({ gone = 0, hide = [], look }) => (
  <>
    {[...MISSING.slice(gone), ...STAY].map(({ who, seat }, i) =>
      hide.includes(`${seat[0]},${seat[1]}`) ? null : (
        <Player key={who} who={who} scale={KID} position={SPOT.seat(seat[0], seat[1])} rotationY={NORTH} animation="sit" phase={i * 0.7} lookAt={look} blink />
      ),
    )}
    {hide.includes("2,2") ? null : <Villager kid scale={CHILD} robe={ROBE.blue} position={at(SPOT.seat(2, 2), 0, 0.02, 0)} rotationY={NORTH} sit lookAt={look} phase={2} />}
  </>
);

/** A school bag. `position` is the floor under it. */
export const Bag: React.FC<{ position: Vec3; color?: string; rotationY?: number }> = ({ position, color = "#c8402f", rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.17, 0]} size={[0.3, 0.34, 0.18]} color={color} />
    <Block position={[0, 0.12, 0.1]} size={[0.2, 0.14, 0.04]} color="#8a2a20" />
    <Block position={[0, 0.36, 0]} size={[0.12, 0.05, 0.05]} color="#3a3a3a" />
  </group>
);

/** A MISSING poster: a sheet, the word, and a face in blocks. `position` is its middle; it faces +Z. */
export const Poster: React.FC<{ position: Vec3; who?: number; rotationY?: number; scale?: number }> = ({ position, who = 0, rotationY = 0, scale = 1 }) => {
  const look = [
    ["#f0c8a4", "#f2e24a"],
    ["#ecc19a", "#3f6fb8"],
    ["#ecc19a", "#c2452a"],
    ["#e3b48c", "#6a3fa0"],
  ][who % 4];
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block size={[0.62, 0.86, 0.02]} color="#f1e9d2" castShadow={false} />
      <PixelText text="MISSING" position={[0, 0.3, 0.014]} height={0.13} maxWidth={0.54} color="#b3261e" />
      <Block position={[0, -0.02, 0.014]} size={[0.3, 0.3, 0.01]} color={look[0]} castShadow={false} />
      <Block position={[0, 0.1, 0.018]} size={[0.3, 0.08, 0.01]} color={look[1]} castShadow={false} />
      {[-0.07, 0.07].map((x) => (
        <Block key={x} position={[x, -0.02, 0.02]} size={[0.045, 0.045, 0.01]} color="#1c1c22" castShadow={false} />
      ))}
      {[-0.26, -0.33].map((y) => (
        <Block key={y} position={[0, y, 0.014]} size={[0.44, 0.03, 0.01]} color="#8a8272" castShadow={false} />
      ))}
    </group>
  );
};

/** The posters on the school wall (and one on a tree): `n` of them are up. */
export const Posters: React.FC<{ n?: number }> = ({ n = 7 }) => (
  <>
    {[-1.35, 3.9, -3.9, 1.35, 6.6, -6.6, 7.3].slice(0, n).map((x, i) => (
      <Poster key={x} position={at(WALL, x, 1.5 + (i % 2) * 0.22, 0.14)} who={i} />
    ))}
  </>
);

/** A bread roll, a ball: small things kids hold. */
export const Bread: React.FC<{ position: Vec3; rotation?: Vec3 }> = ({ position, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <Block size={[0.24, 0.1, 0.12]} color="#c98a3e" />
    <Block position={[0, 0.055, 0]} size={[0.2, 0.02, 0.09]} color="#e0a955" castShadow={false} />
  </group>
);

/** Drops of water falling off something. */
export const Drips: React.FC<{ position: Vec3; t: number; n?: number }> = ({ position, t, n = 5 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const q = (t * 0.9 + i * 0.37) % 1;
      return <Block key={i} position={[position[0] + Math.sin(i * 2.4) * 0.22, position[1] - q * q * 1.1, position[2] + Math.cos(i * 1.7) * 0.2]} size={[0.035, 0.07, 0.035]} color="#9fd0ff" emissive="#9fd0ff" emissiveIntensity={0.4} castShadow={false} />;
    })}
  </>
);

/** A light for a face: put it on the camera's side. */
export const Fill: React.FC<{ position: Vec3; power?: number; color?: string; reach?: number }> = ({ position, power = 5, color = "#cfd8ff", reach = 6 }) => (
  <pointLight position={position} color={color} intensity={power} distance={reach} decay={2} />
);

void Vox;

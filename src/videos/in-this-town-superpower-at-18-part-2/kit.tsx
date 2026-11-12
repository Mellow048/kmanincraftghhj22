import type React from "react";
import { Block, Glow, PixelText, Tree, Vox } from "../../engine";
import type { FaceName, AnimName, Timing, Vec3 } from "../../engine";
import { wordClock } from "../../../Topics/InThisTown";
import { Bo, Daisy, FireLight, Folk, Hero, Mira, Mom, PLACE, Tip, MUD } from "../in-this-town-superpower-at-18/kit";
import timingJson from "./timing.json";

/**
 * Part two's kit. The cast, the town and part one's powers come from part one's kit, unchanged, so the two
 * films cannot drift apart. What is new here is everything the fight needs:
 *   - life, used on purpose:   Roots, BigLeaf, GrowTree, LeafWing / Glider, Wall kind="grass" with Rose and thorns
 *   - what the brother took:   LavaJet, Spear, Wall kind="lava"
 *   - the camera's eyelids:    Lids
 *   - the title card:          Card
 */
export * from "../in-this-town-superpower-at-18/kit";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

/** Where the brother stands when part two starts: where part one left him, by the pig pen. */
export const B0: Vec3 = [-7.0, 0, 7.1];
/** The way the teller faces to look at him from the mud, and the way he faces back. */
export const AT = Math.atan2(B0[0] - MUD[0], B0[2] - MUD[2]);
export const BACK = Math.atan2(MUD[0] - B0[0], MUD[2] - B0[2]);
/** Where the giant leaf catches Tip: on the road, east of the square. */
export const LEAF: Vec3 = [5, 0, 4.5];
/** The top of the tree he grows under his own feet. */
export const TREETOP: Vec3 = [MUD[0], 6.15, MUD[2]];
/** Where the brother hangs in the air to take his shot. */
export const SNIPE: Vec3 = [-8, 7.5, 5];
/** Where the teller comes down: in the square. */
export const LAND: Vec3 = [-0.5, 0, 3.4];
/** Where he stands to face the wall, the town behind him. */
export const STAND: Vec3 = [1.5, 0, 2.8];
/** Where the brother stands to raise the wall: far down the street. */
export const BFAR: Vec3 = [16, 0, 2.8];
/** Where the wall of thorns leaves him, and where he kneels. */
export const BKNEEL: Vec3 = [17.5, 0, 2.8];
/** Where the teller stops, in front of him. */
export const HSTOP: Vec3 = [16.2, 0, 2.8];
/** The middle of the street, which the wall is centred on. */
export const STREET = 2.8;

export const lerp3 = (a: Vec3, b: Vec3, q: number): Vec3 => [a[0] + (b[0] - a[0]) * q, a[1] + (b[1] - a[1]) * q, a[2] + (b[2] - a[2]) * q];

/** Tip's flight, 0 (flicked) to 1 (in the leaf): up over the rooftops and down onto the road. */
export const tipAt = (q: number): Vec3 => {
  const c = Math.min(1, Math.max(0, q));
  return [B0[0] + (LEAF[0] - B0[0]) * c, 1.3 + Math.sin(Math.PI * c) * 9, B0[2] + (LEAF[2] - B0[2]) * c];
};

/** The teller's glide, 0 (off the tree) to 1 (over the square). */
export const GLIDE_FROM: Vec3 = [-9.6, 6.6, 10.2];
export const GLIDE_TO: Vec3 = [-1.5, 3.2, 3.8];
export const GLIDE_YAW = Math.atan2(GLIDE_TO[0] - GLIDE_FROM[0], GLIDE_TO[2] - GLIDE_FROM[2]);
export const glideAt = (g: number): Vec3 => lerp3(GLIDE_FROM, GLIDE_TO, g);

// ----------------------------------------------------------------------------- life, on purpose

const GREEN = ["#4fae3c", "#46a035", "#5cbd48"];

/** Roots racing along the ground from `from` to `to`. `k` 0–1 is how far the front has got. */
export const Roots: React.FC<{ from: Vec3; to: Vec3; k: number; seed?: number; n?: number }> = ({ from, to, k, seed = 1, n = 52 }) => {
  if (k <= 0) return null;
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const len = Math.hypot(dx, dz) || 1;
  const px = -dz / len;
  const pz = dx / len;
  const at = (q: number): Vec3 => {
    const w = Math.sin(q * 11 + seed) * 0.45 * Math.sin(q * Math.PI);
    return [from[0] + dx * q + px * w, 0.13 + Math.abs(Math.sin(q * 17 + seed)) * 0.34, from[2] + dz * q + pz * w];
  };
  const head = at(Math.min(1, k));
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const q = i / (n - 1);
        if (q > k) return null;
        const s = 0.42 - 0.14 * (i % 3 === 0 ? 1 : 0);
        return <Vox key={i} kind="log" position={at(q)} size={[s, s, s]} rotation={[i * 0.7, i * 1.1, i * 0.4]} />;
      })}
      {Array.from({ length: 10 }, (_, i) => {
        const q = (i + 0.5) / 10;
        if (q > k) return null;
        const p = at(q);
        return <Block key={`l${i}`} position={[p[0], p[1] + 0.3, p[2]]} size={[0.22, 0.06, 0.34]} rotation={[0.4, i, 0.3]} color={GREEN[i % 3]} castShadow={false} />;
      })}
      <Glow position={[head[0], 0.5, head[2]]} size={2.2} color="#9dff8a" opacity={0.5} />
      <pointLight position={[head[0], 0.9, head[2]]} color="#9dff8a" intensity={8} distance={6} decay={2} />
    </>
  );
};

/** One giant leaf on a stalk, cupped like a hand. `position` is the foot of the stalk. `grow` 0–1. */
export const BigLeaf: React.FC<{ position: Vec3; grow?: number; rotationY?: number; dip?: number }> = ({ position, grow = 1, rotationY = 0, dip = 0 }) =>
  grow <= 0 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={0.15 + 0.85 * grow}>
      <Vox kind="log" position={[0, 0.5, 0]} size={[0.34, 1.0, 0.34]} />
      <group position={[0, 1.05 - dip, 0]}>
        {[1.0, 2.0, 2.8, 3.3, 3.3, 2.8, 2.0, 1.0].map((w, i) => {
          const r = i - 3.5;
          return <Block key={i} position={[0, r * r * 0.035, r * 0.5]} size={[w, 0.14, 0.5]} color={GREEN[i % 2]} />;
        })}
        <Block position={[0, 0.1, 0]} size={[0.12, 0.1, 3.9]} color="#8fe070" castShadow={false} />
        {[-1, 1].map((s) => (
          <Block key={s} position={[s * 1.72, 0.2, 0]} size={[0.14, 0.34, 1.8]} color={GREEN[2]} />
        ))}
      </group>
      <Glow position={[0, 1.3, 0]} size={5} color="#9dff8a" opacity={0.22} />
    </group>
  );

/** A tree coming up out of the ground. `position` is its foot. `grow` 0–1; at 1 its top is 6.15 m up. */
export const GrowTree: React.FC<{ position: Vec3; grow: number }> = ({ position, grow }) =>
  grow <= 0.02 ? null : (
    <group position={position} scale={[0.35 + 0.65 * grow, grow, 0.35 + 0.65 * grow]}>
      <Tree position={[0, 0, 0]} height={4} leaf="#4fae3c" />
    </group>
  );

/** A leaf grown across his back as a wing. Local to his body: x is the span. `hole` is where the spear went through. */
export const LeafWing: React.FC<{ grow?: number; hole?: boolean }> = ({ grow = 1, hole = false }) =>
  grow <= 0 ? null : (
    <group scale={[grow, 0.4 + 0.6 * grow, 1]}>
      {[-1, 1].map((s) =>
        [0, 1, 2, 3, 4].map((i) =>
          hole && s > 0 && (i === 1 || i === 2) ? (
            <Block key={`${s}${i}`} position={[s * (0.3 + i * 0.42), i === 1 ? 0.5 : -0.5, 0]} size={[0.42, 0.22, 0.06]} color="#2b2420" castShadow={false} />
          ) : (
            <Block key={`${s}${i}`} position={[s * (0.3 + i * 0.42), -i * 0.05, 0]} size={[0.42, 1.3 - i * 0.22, 0.06]} color={GREEN[(i + (s > 0 ? 1 : 0)) % 3]} />
          ),
        ),
      )}
      <Block position={[0, 0, 0.02]} size={[4.0, 0.07, 0.05]} color="#8fe070" castShadow={false} />
    </group>
  );

/** The teller with the wing on. `pitch` 0 is standing; about 1.15 is flat out, gliding. `position` is his middle when gliding, his feet when standing. */
export const Glider: React.FC<{ position: Vec3; yaw: number; pitch?: number; roll?: number; wing?: number; hole?: boolean; face?: FaceName; animation?: AnimName }> = ({
  position,
  yaw,
  pitch = 1.15,
  roll = 0,
  wing = 1,
  hole = false,
  face = "wow",
  animation = "fall",
}) => {
  const lift = pitch > 0.3 ? -0.95 : 0;
  return (
    <group position={position} rotation={[0, yaw, 0]}>
      <group rotation={[pitch, 0, roll]}>
        <Hero position={[0, lift, 0]} animation={animation} face={face} />
        <group position={[0, lift + 1.2, -0.2]}>
          <LeafWing grow={wing} hole={hole} />
        </group>
      </group>
    </group>
  );
};

/** A rose: for the wall, and for his brother's hair. `position` is the foot of its stem. */
export const Rose: React.FC<{ position: Vec3; grow?: number; scale?: number }> = ({ position, grow = 1, scale = 1 }) =>
  grow <= 0 ? null : (
    <group position={position} scale={scale * grow}>
      <Block position={[0, 0.1, 0]} size={[0.04, 0.2, 0.04]} color="#2f7a2a" castShadow={false} />
      <Block position={[0, 0.25, 0]} size={[0.16, 0.12, 0.16]} color="#d81f3a" castShadow={false} />
      <Block position={[0, 0.31, 0]} size={[0.09, 0.08, 0.09]} color="#ff5a6e" castShadow={false} />
    </group>
  );

// ----------------------------------------------------------------------------- what he took

const HOT = ["#ffd23a", "#ff8a1c", "#f2501a", "#c92a12"];

/** Lava thrown from a fingertip. `k` 0–1 is how far its front has got; over 1 it keeps pouring. */
export const LavaJet: React.FC<{ from: Vec3; to: Vec3; k: number; t: number }> = ({ from, to, k, t }) => {
  if (k <= 0) return null;
  const n = 18;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const q = ((i / n + t * 1.9) % 1) * Math.min(1, k);
        const p = lerp3(from, to, q);
        const s = 0.16 + ((i * 0.37) % 1) * 0.16;
        const c = HOT[(i + Math.floor(t * 9)) % 3];
        return (
          <Block
            key={i}
            position={[p[0] + Math.sin(i * 3.1 + t * 13) * 0.07, p[1] + Math.sin(q * Math.PI) * 0.25 + Math.cos(i * 2.3 + t * 11) * 0.06, p[2] + Math.cos(i * 1.9 + t * 9) * 0.07]}
            rotation={[i + t * 4, i * 0.6, t * 3]}
            size={[s, s, s]}
            color="#000000"
            emissive={c}
            emissiveIntensity={1}
            castShadow={false}
          />
        );
      })}
      <Glow position={lerp3(from, to, Math.min(1, k))} size={1.8} color="#ff6a1a" opacity={0.6} />
      <pointLight position={lerp3(from, to, Math.min(1, k) * 0.9)} color="#ff7a2a" intensity={14} distance={8} decay={2} />
    </>
  );
};

/** A spear of fire, white hot. `k` 0–1 moves it from `from` to `to`; it always points along that line. */
export const Spear: React.FC<{ from: Vec3; to: Vec3; k: number; length?: number }> = ({ from, to, k, length = 2.4 }) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const flat = Math.hypot(dx, dz) || 1;
  return (
    <group position={lerp3(from, to, k)} rotation={[0, Math.atan2(dx, dz), 0]}>
      <group rotation={[-Math.atan2(dy, flat), 0, 0]}>
        <Block size={[0.09, 0.09, length]} color="#000000" emissive="#fff6d8" emissiveIntensity={1.4} castShadow={false} />
        <Block position={[0, 0, -length * 0.15]} size={[0.2, 0.2, length * 0.6]} color="#000000" emissive="#ff8a1c" emissiveIntensity={1} opacity={0.55} castShadow={false} />
        <Block position={[0, 0, length * 0.5]} size={[0.2, 0.2, 0.3]} color="#000000" emissive="#ffffff" emissiveIntensity={1.6} castShadow={false} />
        {[-0.4, 0, 0.4].map((z) => (
          <Glow key={z} position={[0, 0, z * length]} size={1.3} color="#ffd9a0" opacity={0.6} />
        ))}
        <pointLight color="#ffd9a0" intensity={18} distance={7} decay={2} />
      </group>
    </group>
  );
};

/**
 * The wall. `x` is where it is on the street; it is as wide as the street and, at `rise` 1, as high as the bell.
 * kind="lava" is his. kind="grass" is the same wall after the teller has had it: `roses` and `thorns` 0–1 grow on it.
 */
export const Wall: React.FC<{ x: number; kind: "lava" | "grass"; rise?: number; roses?: number; thorns?: number; t?: number; width?: number; height?: number }> = ({
  x,
  kind,
  rise = 1,
  roses = 0,
  thorns = 0,
  t = 0,
  width = 9,
  height = 4.6,
}) => {
  const h = height * rise;
  if (h <= 0.02) return null;
  if (kind === "lava") {
    return (
      <group position={[x, 0, STREET]}>
        <Vox kind="lava" position={[0, h / 2, 0]} size={[0.9, h, width]} tile={1.5} emissive="#ff5410" emissiveIntensity={0.85} castShadow={false} />
        {Array.from({ length: 16 }, (_, i) => {
          const z = ((i + 0.5) / 16 - 0.5) * width;
          const up = (t * (0.5 + (i % 4) * 0.2) + i * 0.37) % 1;
          const s = 0.3 + (i % 3) * 0.12;
          return <Block key={i} position={[(i % 2 ? 1 : -1) * 0.5, h * up, z]} size={[s, s, s]} rotation={[i, t * 2 + i, i]} color="#000000" emissive={HOT[i % 3]} emissiveIntensity={1} castShadow={false} />;
        })}
        <Glow position={[-1.2, h * 0.5, 0]} size={h * 2.6} color="#ff5a1a" opacity={0.4} />
        <Glow position={[1.2, h * 0.5, 0]} size={h * 2.6} color="#ff5a1a" opacity={0.4} />
        <pointLight position={[-2.5, h * 0.6, 0]} color="#ff6a2a" intensity={70 * rise} distance={22} decay={2} />
        <pointLight position={[2.5, h * 0.6, 0]} color="#ff6a2a" intensity={50 * rise} distance={18} decay={2} />
      </group>
    );
  }
  return (
    <group position={[x, 0, STREET]}>
      <Vox kind="leaves" tint="#4fae3c" position={[0, h / 2, 0]} size={[0.9, h, width]} tile={1.2} />
      <Vox kind="grass" position={[0, h + 0.06, 0]} size={[1.0, 0.14, width + 0.1]} />
      {Array.from({ length: 22 }, (_, i) => {
        const z = (((i * 0.618) % 1) - 0.5) * (width - 0.8);
        const y = 0.5 + ((i * 0.377) % 1) * (h - 1);
        const side = i % 2 ? 1 : -1;
        return (
          <group key={i} position={[side * 0.47, y, z]} rotation={[0, 0, side * -1.5708]}>
            <Rose position={[0, 0, 0]} grow={Math.min(1, Math.max(0, roses * 1.6 - (i % 5) * 0.12))} scale={1.9} />
          </group>
        );
      })}
      {Array.from({ length: 30 }, (_, i) => {
        const z = (((i * 0.383 + 0.2) % 1) - 0.5) * (width - 0.5);
        const y = 0.35 + ((i * 0.719) % 1) * (h - 0.6);
        const side = i % 2 ? 1 : -1;
        const len = 0.7 * Math.min(1, Math.max(0, thorns * 1.5 - (i % 4) * 0.12));
        return len <= 0 ? null : <Block key={`t${i}`} position={[side * (0.45 + len / 2), y, z]} size={[len, 0.1, 0.1]} rotation={[i, 0, side * 0.25]} color="#234f1f" />;
      })}
      <Glow position={[-1, h * 0.5, 0]} size={h * 2.2} color="#9dff8a" opacity={0.22} />
      <pointLight position={[-2.5, h * 0.6, 0]} color="#b8ff9a" intensity={30} distance={16} decay={2} />
      <pointLight position={[2.5, h * 0.6, 0]} color="#b8ff9a" intensity={30} distance={16} decay={2} />
    </group>
  );
};

// ----------------------------------------------------------------------------- the camera's eyes, the card, the crowd

/**
 * The camera's eyelids. Stand them between the camera and what it is looking at: `at` is a point on the line of sight,
 * about 0.7 m in front of the lens, and the camera must be looking along x. `k` 0 is open, 1 is shut.
 */
export const Lids: React.FC<{ at: Vec3; k: number }> = ({ at, k }) => {
  const gap = (1 - Math.min(1, Math.max(0, k))) * 0.6;
  return (
    <>
      <Block position={[at[0], at[1] + 0.75 + gap, at[2]]} size={[0.02, 1.5, 5]} color="#000000" castShadow={false} receiveShadow={false} />
      <Block position={[at[0], at[1] - 0.75 - gap, at[2]]} size={[0.02, 1.5, 5]} color="#000000" castShadow={false} receiveShadow={false} />
    </>
  );
};

/** Words on the screen: "1 WEEK LATER". `position` is their middle; they face south unless turned. */
export const Card: React.FC<{ text: string; position: Vec3; height?: number; rotationY?: number }> = ({ text, position, height = 0.8, rotationY = 0 }) => (
  <PixelText text={text} position={position} rotationY={rotationY} height={height} maxWidth={3.6} color="#ffffff" />
);

/** Everyone he has led his brother to: mother, friends and neighbours, bunched up east of the well. They look at `at`. */
export const CROWD: Record<"mom" | "bo" | "mira" | "tip" | "a" | "b", Vec3> = {
  mom: [-2.6, 0, 5.2],
  bo: [-3.4, 0, 4.2],
  mira: [-3.7, 0, 6.1],
  tip: [-2.5, 0, 6.5],
  a: [-4.5, 0, 5.2],
  b: [-4.7, 0, 6.8],
};
export const Crowd: React.FC<{ at: Vec3; shake?: number }> = ({ at, shake = 0 }) => (
  <>
    <Mom position={CROWD.mom} rotationY={Math.PI / 2} lookAt={at} strain={shake} />
    <Bo drained position={CROWD.bo} rotationY={Math.PI / 2} lookAt={at} strain={shake} />
    <Mira position={CROWD.mira} rotationY={Math.PI / 2} lookAt={at} strain={shake} />
    <Tip position={CROWD.tip} rotationY={Math.PI / 2} lookAt={at} strain={shake} />
    <Folk n={1} position={CROWD.a} rotationY={Math.PI / 2} lookAt={at} strain={shake} />
    <Folk n={4} position={CROWD.b} rotationY={Math.PI / 2} lookAt={at} strain={shake} />
  </>
);

/** Firelight on a face in the burning town: stand it by whoever the shot is about. */
export const Lit: React.FC<{ at: Vec3; side?: number; power?: number }> = ({ at, side = 1, power = 12 }) => (
  <FireLight position={[at[0] + 1.3 * side, at[1] + 1.8, at[2] + 1.6]} power={power} reach={7} seed={Math.round(at[0] * 3 + at[2])} />
);

/** Everything he grew in the pen at the end of part one. */
export const Garden: React.FC = () => (
  <>
    <Vox kind="grass" position={[MUD[0], 0.08, MUD[2]]} size={[3.7, 0.05, 3.7]} castShadow={false} />
    {(
      [
        [0.9, 0.4],
        [-0.8, 0.7],
        [0.3, -1.0],
        [-1.1, -0.5],
        [1.3, -0.6],
        [0.1, 1.2],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <Daisy key={i} position={[MUD[0] + x, 0.09, MUD[2] + z]} />
    ))}
    <pointLight position={[MUD[0], 1.2, MUD[2]]} color="#9dff8a" intensity={4} distance={7} decay={2} />
  </>
);

export const U = PLACE.under;

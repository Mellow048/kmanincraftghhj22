import type React from "react";
import { Block, Glow, PixelText, Torch, Vox } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { Villager, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: the town where the mobs that lost the Mob Vote live.
 *
 * ONE STREET, running away from the lens (a tall frame is narrow: at 6 m it shows about 1.4 m each side of its
 * middle, so the town is staged in depth). South (+Z) is the gate; north (-Z) is the stage. A mailbox stands at
 * each side of the street in front of each house. The cow who tells it lives nearest the gate.
 *
 * From the pack: the villager body (the ice thrower is one, grey, in a blue hood), puffs, the subscribe sign, rain.
 * Built here: the flower cow, the glow squid, the grumpy bush, the one who hides, the little stone one, the crab,
 * the penguin, the copper golem (orange or green), mailboxes with flags, the stage, the gate and its button, the
 * copper chest and the votes in it.
 */

export {
  DEG, EAST, NORTH, SOUTH, WEST, ease, ramp, pop, jolt, Bits, Bubble, Puffs, SubscribeSign, Villager, NightFill as Fill, Hut, Rain,
} from "../../../Topics/InThisTown";
export { Block, Glow, PixelText, Torch, Vox } from "../../engine";

export const timing = timingJson as unknown as Timing;
const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
/** One hop: 0 outside, a sine arc of height `h` for `d` seconds from `at`. */
export const hop = (t: number, at: number, h = 0.3, d = 0.3) => {
  const k = (t - at) / d;
  return k <= 0 || k >= 1 ? 0 : Math.sin(k * Math.PI) * h;
};
/** Walk from a to b as k goes 0..1: position, the way it faces, and metres walked. */
export const go = (a: Vec3, b: Vec3, k: number): { position: Vec3; rotationY: number; walk: number } => {
  const q = Math.min(1, Math.max(0, k));
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  return { position: [a[0] + dx * q, a[1] + (b[1] - a[1]) * q, a[2] + dz * q], rotationY: Math.atan2(dx, dz), walk: Math.hypot(dx, dz) * q };
};
const mix = (a: string, b: string, k: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * Math.min(1, Math.max(0, k))).toString(16).padStart(2, "0")).join("")}`;
};

// ----------------------------------------------------------------------------- the street

export const GATE_Z = 9;
export const STAGE_Z = -19;
/** Who lives where: the mailbox is at the edge of the street, the owner stands beside it, a step into the street. */
export const HOME = {
  cow: { box: [-1.9, 0, 3.4] as Vec3, at: [0, 0, 2.5] as Vec3, tint: "#f2c81e" },
  golem: { box: [1.9, 0, 1.4] as Vec3, at: [1.05, 0, 1.2] as Vec3, tint: "#d9824f" },
  ice: { box: [-1.9, 0, -1.2] as Vec3, at: [-1.05, 0, -1.4] as Vec3, tint: "#7fb4e0" },
  bush: { box: [1.9, 0, -3.6] as Vec3, at: [1.05, 0, -3.8] as Vec3, tint: "#4f7a2f" },
  hide: { box: [-1.9, 0, -6.2] as Vec3, at: [-1.0, 0, -6.6] as Vec3, tint: "#7f8fa6" },
  stone: { box: [1.9, 0, -8.6] as Vec3, at: [1.05, 0, -8.8] as Vec3, tint: "#8a8f86" },
  crab: { box: [-1.9, 0, -11.2] as Vec3, at: [-1.0, 0, -11.4] as Vec3, tint: "#4a78d0" },
  penguin: { box: [1.9, 0, -13.6] as Vec3, at: [1.0, 0, -13.8] as Vec3, tint: "#22262e" },
} as const;
export type Who = keyof typeof HOME;
export const WHO = Object.keys(HOME) as Who[];

/** A dark plate with pixel letters on it. */
export const Plate: React.FC<{ position: Vec3; text: string; scale?: number; rotationY?: number; color?: string; back?: string }> = ({
  position, text, scale = 1, rotationY = 0, color = "#ffe27a", back = "#1a1420",
}) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0, -0.03]} size={[0.26 + text.length * 0.3, 0.6, 0.04]} color={back} castShadow={false} />
      <PixelText text={text} position={[0, 0, 0]} height={0.36} color={color} />
    </group>
  );
/** The red plate over everybody's head in the first shot. */
export const Lost: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => <Plate position={position} text="LOST" scale={0.62 * scale} color="#ffffff" back="#b8322a" />;

/** A buttercup: what grows on her, and behind her wherever she walks. `position` is its foot. */
export const Flower: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) =>
  scale <= 0.01 ? null : (
    <group position={position} scale={scale}>
      <Block position={[0, 0.08, 0]} size={[0.04, 0.16, 0.04]} color="#3f8a34" castShadow={false} />
      <Block position={[0, 0.2, 0]} size={[0.18, 0.1, 0.18]} color="#ffe14a" castShadow={false} />
      <Block position={[0, 0.215, 0]} size={[0.08, 0.1, 0.08]} color="#f29a1e" castShadow={false} />
    </group>
  );

/** A mailbox on a post. It faces the street: `side` -1 on the west of it, 1 on the east. `flag` 0 down, 1 up. */
export const Mailbox: React.FC<{ position: Vec3; side?: number; flag?: number; tint?: string; letter?: boolean; stuffed?: boolean; flower?: number }> = ({
  position, side = -1, flag = 0, tint = "#5f7fa8", letter = false, stuffed = false, flower = 0,
}) => (
  <group position={position} rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <Vox kind="log" position={[0, 0.5, 0]} size={[0.14, 1.0, 0.14]} />
    <Block position={[0, 1.16, 0]} size={[0.4, 0.34, 0.66]} color="#6d7f96" />
    <Block position={[0, 1.34, 0]} size={[0.34, 0.06, 0.66]} color="#7d8fa6" castShadow={false} />
    <Block position={[0, 1.16, 0.335]} size={[0.3, 0.24, 0.02]} color="#3a4658" castShadow={false} />
    <Block position={[0, 1.02, 0.1]} size={[0.42, 0.08, 0.3]} color={tint} castShadow={false} />
    {/* the flag: flat along the box when down, straight up when there is something inside */}
    <group position={[side < 0 ? -0.22 : 0.22, 1.2, -0.12]} rotation={[-(Math.PI / 2) * (1 - flag), 0, 0]}>
      <Block position={[0, 0.2, 0]} size={[0.04, 0.4, 0.05]} color="#d8d8d8" castShadow={false} />
      <Block position={[0, 0.34, 0.07]} size={[0.045, 0.16, 0.16]} color="#e8332a" emissive="#e8332a" emissiveIntensity={0.35 * flag} castShadow={false} />
    </group>
    {letter ? <Letter position={[0, 1.18, 0.37]} rotation={[0, 0, 0.12]} scale={0.8} /> : null}
    {stuffed
      ? [0, 1, 2, 3, 4].map((i) => <Letter key={i} position={[-0.1 + i * 0.05, 1.12 + (i % 2) * 0.08, 0.36 + i * 0.03]} rotation={[0, 0, -0.3 + i * 0.18]} scale={0.75} />)
      : null}
    {flower > 0 ? <Flower position={[0, 1.37, 0.1]} scale={flower} /> : null}
  </group>
);
/** A letter: a white envelope with a red seal. */
export const Letter: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; hoof?: boolean; text?: string }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, hoof = false, text }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={rotation} scale={scale}>
      <Block size={[0.36, 0.24, 0.02]} color="#f6f1e2" castShadow={false} />
      {hoof ? (
        <>
          <Block position={[-0.05, 0, 0.012]} size={[0.05, 0.14, 0.01]} color="#6b4a2a" castShadow={false} />
          <Block position={[0.05, 0, 0.012]} size={[0.05, 0.14, 0.01]} color="#6b4a2a" castShadow={false} />
          <Block position={[0, 0.06, 0.012]} size={[0.15, 0.04, 0.01]} color="#6b4a2a" castShadow={false} />
        </>
      ) : text ? (
        <PixelText text={text} position={[0, 0, 0.013]} height={0.09} color="#2a2a30" />
      ) : (
        <Block position={[0, -0.02, 0.012]} size={[0.07, 0.07, 0.01]} color="#c8322a" castShadow={false} />
      )}
    </group>
  );

// ----------------------------------------------------------------------------- the cast

type Mob = { position?: Vec3; rotationY?: number; scale?: number; t?: number };
const blinkAt = (t: number, phase = 0) => ((t * 0.31 + phase) % 1) < 0.035;

/** The flower cow who tells it. Faces +Z. `look`, `nod`, `tilt` turn the head (radians); `walk` is metres walked. */
export const Cow: React.FC<Mob & { walk?: number; look?: number; nod?: number; tilt?: number; flowers?: number; sad?: number; sign?: string; wide?: boolean; children?: React.ReactNode }> = ({
  position = [0, 0, 0], rotationY = 0, scale = 1, t = 0, walk = 0, look = 0, nod = 0, tilt = 0, flowers = 3, sad = 0, sign, wide = false, children,
}) => {
  const Y = "#f2c81e";
  const swing = Math.sin(walk * 4.6) * 0.5;
  const shut = blinkAt(t, 0.2);
  const ear = Math.sin(t * 2.1) * 0.08 - sad * 0.5;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {([[-0.26, 0.42, swing], [0.26, 0.42, -swing], [-0.26, -0.42, -swing], [0.26, -0.42, swing]] as Array<[number, number, number]>).map(([x, z, a], i) => (
        <group key={i} position={[x, 0.56, z]} rotation={[a, 0, 0]}>
          <Block position={[0, -0.28, 0]} size={[0.22, 0.56, 0.22]} color={Y} />
          <Block position={[0, -0.52, 0]} size={[0.23, 0.08, 0.23]} color="#6b4a2a" castShadow={false} />
        </group>
      ))}
      <Block position={[0, 0.92, 0]} size={[0.8, 0.72, 1.3]} color={Y} />
      <Block position={[0.405, 0.98, -0.2]} size={[0.01, 0.34, 0.5]} color="#fff3c4" castShadow={false} />
      <Block position={[-0.405, 0.9, 0.2]} size={[0.01, 0.3, 0.42]} color="#fff3c4" castShadow={false} />
      <Block position={[0, 1.285, -0.3]} size={[0.5, 0.01, 0.4]} color="#fff3c4" castShadow={false} />
      <Block position={[0, 0.95 - sad * 0.1, -0.7]} rotation={[0.25, 0, Math.sin(t * 3) * 0.2 * (1 - sad)]} size={[0.08, 0.5, 0.08]} color={Y} castShadow={false} />
      {flowers > 0 ? <Flower position={[-0.2, 1.28, 0.25]} scale={1.3} /> : null}
      {flowers > 1 ? <Flower position={[0.22, 1.28, -0.1]} scale={1.15} /> : null}
      {flowers > 2 ? <Flower position={[-0.08, 1.28, -0.48]} scale={1.3} /> : null}
      {sign ? (
        <group position={[0, 0.78, 0.78]}>
          <Block position={[0, 0, -0.02]} size={[0.26 + sign.length * 0.2, 0.36, 0.03]} color="#f6f1e2" castShadow={false} />
          <PixelText text={sign} position={[0, 0, 0]} height={0.22} color="#2a2a30" />
        </group>
      ) : null}
      {/* the head */}
      <group position={[0, 1.2, 0.62]} rotation={[nod + sad * 0.35, look, tilt]}>
        <Block position={[0, 0.02, 0.24]} size={[0.62, 0.56, 0.5]} color={Y} />
        <Block position={[0, -0.13, 0.5]} size={[0.44, 0.24, 0.04]} color="#fff3c4" castShadow={false} />
        <Block position={[-0.09, -0.12, 0.525]} size={[0.06, 0.06, 0.01]} color="#6b4a2a" castShadow={false} />
        <Block position={[0.09, -0.12, 0.525]} size={[0.06, 0.06, 0.01]} color="#6b4a2a" castShadow={false} />
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.19, 0.12, 0.495]}>
            {shut ? (
              <Block size={[0.14, 0.03, 0.01]} color="#2a1a12" castShadow={false} />
            ) : (
              <>
                <Block size={[0.14, wide ? 0.17 : 0.13, 0.01]} color="#ffffff" castShadow={false} />
                <Block position={[-s * 0.025, -0.01, 0.006]} size={[0.07, 0.09, 0.01]} color="#15151a" castShadow={false} />
              </>
            )}
            <Block position={[0, 0.1 + (wide ? 0.03 : 0), 0.002]} rotation={[0, 0, -s * (0.5 * sad)]} size={[0.15, 0.035, 0.01]} color="#b8900e" castShadow={false} />
          </group>
        ))}
        <Block position={[-0.33, 0.32, 0.18]} size={[0.08, 0.16, 0.08]} color="#ece4c6" castShadow={false} />
        <Block position={[0.33, 0.32, 0.18]} size={[0.08, 0.16, 0.08]} color="#ece4c6" castShadow={false} />
        <Block position={[-0.39, 0.14, 0.12]} rotation={[0, 0, ear]} size={[0.16, 0.1, 0.06]} color={Y} castShadow={false} />
        <Block position={[0.39, 0.14, 0.12]} rotation={[0, 0, -ear]} size={[0.16, 0.1, 0.06]} color={Y} castShadow={false} />
        <Flower position={[0.12, 0.3, 0.3]} scale={1.25} />
        {children}
      </group>
    </group>
  );
};

/** The glow squid: the one who won. */
export const Squid: React.FC<Mob & { glow?: number }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, t = 0, glow = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.75, 0]} size={[0.56, 0.74, 0.56]} color="#2aa39a" emissive="#3ff0dc" emissiveIntensity={0.35 + 0.5 * glow} />
    {[[-0.15, 0.95], [0.18, 0.7], [-0.05, 0.55], [0.2, 1.0]].map(([x, y], i) => (
      <Block key={i} position={[x, y, 0.285]} size={[0.07, 0.07, 0.01]} color="#bffff4" emissive="#bffff4" emissiveIntensity={1.2 * glow} castShadow={false} />
    ))}
    <Block position={[-0.14, 0.82, 0.285]} size={[0.1, 0.12, 0.012]} color="#0f2a2a" castShadow={false} />
    <Block position={[0.14, 0.82, 0.285]} size={[0.1, 0.12, 0.012]} color="#0f2a2a" castShadow={false} />
    {Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2;
      return <Block key={i} position={[Math.sin(a) * 0.2, 0.16 + Math.sin(t * 4 + i) * 0.03, Math.cos(a) * 0.2]} rotation={[Math.sin(t * 3 + i) * 0.2, 0, Math.cos(t * 3 + i) * 0.2]} size={[0.09, 0.46, 0.09]} color="#22887f" emissive="#3ff0dc" emissiveIntensity={0.3 * glow} castShadow={false} />;
    })}
    <Glow position={[0, 0.7, 0.2]} size={1.9 * glow} color="#5ffff0" opacity={0.3 * glow} />
  </group>
);

/** The ice thrower: an illager, grey, in a blue hood with white fur. `ice` 0..1: the block of ice over his head. */
export const IceThrower: React.FC<VillagerProps & { ice?: number; t?: number }> = ({ ice = 1, t = 0, position = [0, 0, 0], ...p }) => (
  <>
    <Villager
      skin="#9aa3a6"
      robe="#4f6f9a"
      phase={0.9}
      position={position}
      headwear={
        <>
          <Block position={[0, 0.56, -0.02]} size={[0.52, 0.12, 0.52]} color="#8fb8dc" castShadow={false} />
          <Block position={[0, 0.3, -0.25]} size={[0.52, 0.52, 0.06]} color="#8fb8dc" castShadow={false} />
          <Block position={[-0.255, 0.34, -0.04]} size={[0.05, 0.44, 0.38]} color="#8fb8dc" castShadow={false} />
          <Block position={[0.255, 0.34, -0.04]} size={[0.05, 0.44, 0.38]} color="#8fb8dc" castShadow={false} />
          <Block position={[0, 0.535, 0.24]} size={[0.56, 0.1, 0.05]} color="#f4f8fc" castShadow={false} />
        </>
      }
      {...p}
    />
    {ice > 0.01 ? <Ice position={[position[0], 2.75 + Math.sin(t * 2.4) * 0.06, position[2]]} scale={ice} /> : null}
  </>
);
export const Ice: React.FC<{ position: Vec3; scale?: number; rotation?: Vec3 }> = ({ position, scale = 1, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.6, 0.5, 0.6]} color="#bfe6ff" emissive="#8fd0ff" emissiveIntensity={0.35} opacity={0.9} />
    <Block position={[-0.12, 0.08, 0.305]} size={[0.2, 0.06, 0.01]} color="#ffffff" castShadow={false} />
    <Block position={[0.14, -0.1, 0.305]} size={[0.12, 0.05, 0.01]} color="#ffffff" castShadow={false} />
  </group>
);

/** The grumpy bush: a block of moss that floats, with a face that does not approve. `soft` 0..1: for once, it does. */
export const Bush: React.FC<Mob & { look?: number; soft?: number; flower?: number }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, t = 0, look = 0, soft = 0, flower = 0 }) => (
  <group position={[position[0], position[1] + 1.25 + Math.sin(t * 1.7) * 0.07, position[2]]} rotation={[0, rotationY + look, 0]} scale={scale}>
    <Block size={[0.78, 0.72, 0.78]} color="#4f7a2f" />
    <Block position={[0.2, 0.37, -0.1]} size={[0.3, 0.02, 0.3]} color="#6a9a3a" castShadow={false} />
    <Block position={[-0.25, 0.1, 0.392]} size={[0.2, 0.2, 0.01]} color="#5f8f38" castShadow={false} />
    <Block position={[0, -0.02, 0.392]} size={[0.56, 0.42, 0.01]} color="#1f2f18" castShadow={false} />
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.15, 0.02, 0.4]}>
        <Block size={[0.13, 0.09 - 0.03 * soft, 0.01]} color="#d8f08a" emissive="#d8f08a" emissiveIntensity={0.8} castShadow={false} />
        <Block position={[0, 0.09, 0.002]} rotation={[0, 0, -s * 0.45 * (1 - soft)]} size={[0.2, 0.05, 0.01]} color="#4f7a2f" castShadow={false} />
      </group>
    ))}
    <Block position={[0, -0.15 + 0.03 * soft, 0.4]} size={[0.16, 0.035, 0.01]} color="#d8f08a" castShadow={false} />
    {[[-0.25, -0.2], [0.05, 0.22], [0.27, -0.05], [-0.1, 0.0]].map(([x, z], i) => (
      <Block key={i} position={[x, -0.5 - (i % 2) * 0.08 + Math.sin(t * 2 + i) * 0.02, z]} size={[0.1, 0.34 + (i % 2) * 0.14, 0.1]} color="#3f6a28" castShadow={false} />
    ))}
    {flower > 0 ? <Flower position={[-0.15, 0.36, 0.15]} scale={1.3 * flower} /> : null}
  </group>
);

/** The one who plays hide and seek: a barrel, and two eyes that come up over it. `up` 0..1. */
export const Hider: React.FC<Mob & { up?: number; look?: number }> = ({ position = [0, 0, 0], t = 0, up = 0, look = 0 }) => (
  <group position={position}>
    <Vox kind="planks" position={[0, 0.45, 0]} size={[0.8, 0.9, 0.8]} />
    <Block position={[0, 0.25, 0]} size={[0.84, 0.08, 0.84]} color="#4a4a52" castShadow={false} />
    <Block position={[0, 0.7, 0]} size={[0.84, 0.08, 0.84]} color="#4a4a52" castShadow={false} />
    <group position={[0, 0.62 + 0.52 * up, -0.48]} rotation={[0, look, 0]}>
      <Block position={[0, 0, 0]} size={[0.5, 0.44, 0.36]} color="#6f86a8" />
      <Block position={[0, 0.25, 0]} size={[0.54, 0.1, 0.4]} color="#3f4f6a" castShadow={false} />
      <Block position={[-0.12, 0.06, 0.185]} size={[0.1, blinkAt(t, 0.6) ? 0.02 : 0.12, 0.01]} color="#ffffff" castShadow={false} />
      <Block position={[0.12, 0.06, 0.185]} size={[0.1, blinkAt(t, 0.6) ? 0.02 : 0.12, 0.01]} color="#ffffff" castShadow={false} />
      <Block position={[-0.12, 0.05, 0.19]} size={[0.05, 0.06, 0.01]} color="#15151a" castShadow={false} />
      <Block position={[0.12, 0.05, 0.19]} size={[0.05, 0.06, 0.01]} color="#15151a" castShadow={false} />
      <Block position={[0, -0.08, 0.2]} size={[0.1, 0.1, 0.06]} color="#5a7090" castShadow={false} />
    </group>
  </group>
);

/** The little stone one: he holds things. A child is what he holds. `happy` 0..1. */
export const Stone: React.FC<Mob & { happy?: number; look?: number; children?: React.ReactNode }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, t = 0, happy = 0, look = 0, children }) => (
  <group position={position} rotation={[0, rotationY + look, 0]} scale={scale}>
    <Block position={[-0.15, 0.1, 0]} size={[0.2, 0.2, 0.24]} color="#6f746c" />
    <Block position={[0.15, 0.1, 0]} size={[0.2, 0.2, 0.24]} color="#6f746c" />
    <Block position={[0, 0.58, 0]} size={[0.66, 0.78, 0.5]} color="#8a8f86" />
    <Block position={[0.2, 0.8, 0.252]} size={[0.14, 0.1, 0.01]} color="#9da29a" castShadow={false} />
    <Block position={[-0.22, 0.4, 0.252]} size={[0.1, 0.16, 0.01]} color="#7a7f76" castShadow={false} />
    <Block position={[0, 0.5, -0.27]} size={[0.7, 0.6, 0.06]} color="#b8322a" castShadow={false} />
    <Block position={[0, 0.8, -0.02]} size={[0.7, 0.08, 0.56]} color="#b8322a" castShadow={false} />
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.15, 0.68, 0.255]}>
        {happy > 0.5 ? (
          <>
            <Block position={[0, 0.02, 0]} size={[0.13, 0.035, 0.01]} color="#15151a" castShadow={false} />
            <Block position={[-0.06, -0.01, 0]} size={[0.035, 0.05, 0.01]} color="#15151a" castShadow={false} />
            <Block position={[0.06, -0.01, 0]} size={[0.035, 0.05, 0.01]} color="#15151a" castShadow={false} />
          </>
        ) : (
          <>
            <Block size={[0.12, blinkAt(t, 0.4) ? 0.02 : 0.12, 0.01]} color="#ffffff" castShadow={false} />
            <Block position={[0, -0.01, 0.004]} size={[0.06, 0.07, 0.01]} color="#15151a" castShadow={false} />
          </>
        )}
      </group>
    ))}
    <Block position={[-0.24, 0.42, 0.34]} size={[0.14, 0.14, 0.34]} color="#7a7f76" />
    <Block position={[0.24, 0.42, 0.34]} size={[0.14, 0.14, 0.34]} color="#7a7f76" />
    <group position={[0, 0.5, 0.42]}>{children}</group>
  </group>
);

/** The crab: blue, flat, one very big claw. `wave` lifts it. */
export const Crab: React.FC<Mob & { wave?: number; sad?: number; children?: React.ReactNode }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, t = 0, wave = 0, sad = 0, children }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    {[-1, 1].flatMap((s) => [0, 1, 2].map((i) => <Block key={`${s}${i}`} position={[s * 0.4, 0.1, -0.16 + i * 0.16]} rotation={[0, 0, s * (0.5 + Math.sin(t * 6 + i) * 0.1)]} size={[0.26, 0.06, 0.06]} color="#e08a3a" castShadow={false} />))}
    <Block position={[0, 0.28 - 0.05 * sad, 0]} size={[0.74, 0.3, 0.52]} color="#4a78d0" />
    <Block position={[0, 0.2 - 0.05 * sad, 0.262]} size={[0.5, 0.1, 0.01]} color="#dfe8ff" castShadow={false} />
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.16, 0.5 - 0.1 * sad, 0.2]}>
        <Block position={[0, -0.04, 0]} size={[0.05, 0.16, 0.05]} color="#4a78d0" castShadow={false} />
        <Block position={[0, 0.07, 0]} size={[0.11, 0.11, 0.11]} color="#ffffff" castShadow={false} />
        <Block position={[0, 0.07, 0.056]} size={[0.05, 0.06, 0.01]} color="#15151a" castShadow={false} />
      </group>
    ))}
    <group position={[0.5, 0.36 + 0.5 * wave, 0.2]} rotation={[0, 0, -0.4 * wave + Math.sin(t * 7) * 0.2 * wave]}>
      <Block position={[0, 0.06, 0]} size={[0.34, 0.16, 0.2]} color="#6a94e8" />
      <Block position={[0.02, -0.08, 0]} size={[0.26, 0.08, 0.18]} color="#6a94e8" castShadow={false} />
      {children}
    </group>
    <Block position={[-0.46, 0.3, 0.22]} size={[0.16, 0.12, 0.12]} color="#6a94e8" castShadow={false} />
  </group>
);

/** The penguin. `flap` moves the flippers; `sad` hangs the head. */
export const Penguin: React.FC<Mob & { flap?: number; sad?: number; look?: number }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, t = 0, flap = 0, sad = 0, look = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[-0.1, 0.03, 0.06]} size={[0.14, 0.06, 0.22]} color="#f08a2a" castShadow={false} />
    <Block position={[0.1, 0.03, 0.06]} size={[0.14, 0.06, 0.22]} color="#f08a2a" castShadow={false} />
    <Block position={[0, 0.36, 0]} size={[0.44, 0.6, 0.38]} color="#22262e" />
    <Block position={[0, 0.32, 0.192]} size={[0.3, 0.46, 0.01]} color="#f4f4f0" castShadow={false} />
    <group position={[0, 0.78, 0]} rotation={[0.4 * sad, look, 0]}>
      <Block size={[0.4, 0.32, 0.36]} color="#22262e" />
      <Block position={[-0.1, 0.03, 0.182]} size={[0.08, blinkAt(t, 0.8) ? 0.02 : 0.08, 0.01]} color="#ffffff" castShadow={false} />
      <Block position={[0.1, 0.03, 0.182]} size={[0.08, blinkAt(t, 0.8) ? 0.02 : 0.08, 0.01]} color="#ffffff" castShadow={false} />
      <Block position={[-0.1, 0.02, 0.186]} size={[0.04, 0.045, 0.01]} color="#15151a" castShadow={false} />
      <Block position={[0.1, 0.02, 0.186]} size={[0.04, 0.045, 0.01]} color="#15151a" castShadow={false} />
      <Block position={[0, -0.06, 0.22]} size={[0.12, 0.07, 0.1]} color="#f08a2a" castShadow={false} />
    </group>
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.24, 0.56, 0]} rotation={[0, 0, s * (0.15 + flap * (0.6 + Math.sin(t * 14) * 0.5))]}>
        <Block position={[0, -0.18, 0]} size={[0.06, 0.38, 0.22]} color="#22262e" castShadow={false} />
      </group>
    ))}
  </group>
);

/** The copper golem. `green` 0..1: how long he has stood still. `press` 0..1 lifts the right arm to a button; `wave` waves it. A child is carried in front. */
export const Golem: React.FC<Mob & { green?: number; press?: number; wave?: number; walk?: number; look?: number; nod?: number; children?: React.ReactNode }> = ({
  position = [0, 0, 0], rotationY = 0, scale = 1, t = 0, green = 0, press = 0, wave = 0, walk = 0, look = 0, nod = 0, children,
}) => {
  const c = mix("#de8552", "#56a48c", green);
  const d = mix("#b9653a", "#3f8872", green);
  const swing = Math.sin(walk * 6) * 0.45;
  const armR = -press * 1.5 - wave * (2.6 + Math.sin(t * 9) * 0.35);
  const carry = children ? -1.2 : 0;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.17, 0.4, 0]} rotation={[s * swing, 0, 0]}>
          <Block position={[0, -0.2, 0]} size={[0.2, 0.4, 0.2]} color={d} />
        </group>
      ))}
      <Block position={[0, 0.66, 0]} size={[0.62, 0.52, 0.42]} color={c} />
      <Block position={[0, 0.6, 0.212]} size={[0.3, 0.22, 0.01]} color={d} castShadow={false} />
      <group position={[-0.4, 0.86, 0]} rotation={[carry || swing * 0.6, 0, 0]}>
        <Block position={[0, -0.26, 0]} size={[0.16, 0.56, 0.16]} color={d} />
      </group>
      <group position={[0.4, 0.86, 0]} rotation={[carry || armR || -swing * 0.6, 0, wave * 0.3]}>
        <Block position={[0, -0.26, 0]} size={[0.16, 0.56, 0.16]} color={d} />
      </group>
      <group position={[0, 0.94, 0]} rotation={[nod, look, 0]}>
        <Block position={[0, 0.26, 0]} size={[0.74, 0.5, 0.56]} color={c} />
        <Block position={[0, 0.16, 0.34]} size={[0.13, 0.3, 0.14]} color={d} castShadow={false} />
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.2, 0.32, 0.282]}>
            <Block size={[0.13, green > 0.9 || blinkAt(t, 0.1) ? 0.03 : 0.13, 0.01]} color="#2a1a12" castShadow={false} />
            {green > 0.9 ? null : <Block position={[0.03, 0.03, 0.004]} size={[0.04, 0.04, 0.01]} color="#ffffff" castShadow={false} />}
          </group>
        ))}
        <Block position={[0, 0.66, 0]} size={[0.07, 0.32, 0.07]} color={d} castShadow={false} />
        <Block position={[0, 0.86, 0]} size={[0.16, 0.12, 0.16]} color={c} castShadow={false} />
      </group>
      <group position={[0, 0.62, 0.5]}>{children}</group>
    </group>
  );
};

// ----------------------------------------------------------------------------- things

/** The copper chest. `open` 0..1 lifts the lid. `position` is the ground under it; it opens toward +Z. */
export const Chest: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; open?: number; full?: boolean; wood?: boolean }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, open = 0, full = false, wood = false }) => {
  const a = wood ? "#9a6a34" : "#b8623a";
  const b = wood ? "#6b4a22" : "#4fa08a";
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0.2, 0]} size={[0.7, 0.4, 0.5]} color={a} />
      <Block position={[0, 0.2, 0.252]} size={[0.72, 0.06, 0.01]} color={b} castShadow={false} />
      <Block position={[-0.33, 0.2, 0.252]} size={[0.06, 0.4, 0.01]} color={b} castShadow={false} />
      <Block position={[0.33, 0.2, 0.252]} size={[0.06, 0.4, 0.01]} color={b} castShadow={false} />
      {full ? <Block position={[0, 0.395, 0]} size={[0.6, 0.04, 0.4]} color="#f6f1e2" castShadow={false} /> : null}
      <group position={[0, 0.4, -0.25]} rotation={[-1.9 * open, 0, 0]}>
        <Block position={[0, 0.09, 0.25]} size={[0.7, 0.18, 0.5]} color={a} />
        <Block position={[0, 0.17, 0.25]} size={[0.72, 0.03, 0.52]} color={b} castShadow={false} />
        <Block position={[0, 0.03, 0.51]} size={[0.12, 0.14, 0.04]} color="#e8e2d0" castShadow={false} />
      </group>
    </group>
  );
};
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
/** A vote: a slip of paper with a picture of who it is for, and a tick. */
export const Slip: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; of?: Who }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, of = "cow" }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.26, 0.34, 0.012]} color="#f6f1e2" castShadow={false} />
    <Block position={[0, 0.05, 0.008]} size={[0.14, 0.12, 0.006]} color={HOME[of].tint} castShadow={false} />
    {of === "cow" ? <Block position={[0.04, 0.12, 0.009]} size={[0.05, 0.04, 0.006]} color="#f29a1e" castShadow={false} /> : null}
    <Block position={[-0.03, -0.1, 0.008]} rotation={[0, 0, 0.7]} size={[0.03, 0.07, 0.006]} color="#2f9a3a" castShadow={false} />
    <Block position={[0.03, -0.08, 0.008]} rotation={[0, 0, -0.6]} size={[0.03, 0.13, 0.006]} color="#2f9a3a" castShadow={false} />
  </group>
);
/** Votes going up out of the chest and coming down everywhere. `k` 0..1: how far the fountain has got. */
export const Votes: React.FC<{ position: Vec3; t: number; k?: number; count?: number; spread?: number; of?: Who | "all" }> = ({ position, t, k = 1, count = 60, spread = 2.4, of = "all" }) => (
  <group position={position}>
    {Array.from({ length: Math.round(count * Math.min(1, Math.max(0, k))) }, (_, i) => {
      const life = (t * (0.45 + rnd(i, 1) * 0.25) + rnd(i, 2)) % 1;
      const a = rnd(i, 3) * Math.PI * 2;
      const r = spread * rnd(i, 4) * (0.25 + life);
      const y = 0.4 + 4.2 * life * (1 - life) * 4 * (0.5 + 0.5 * rnd(i, 5));
      const who = of === "all" ? WHO[i % WHO.length] : of;
      return <Slip key={i} of={who} position={[Math.sin(a) * r, y, Math.cos(a) * r]} rotation={[t * 3 + i, t * 2 + i * 2, i]} scale={0.6} />;
    })}
  </group>
);
/** A heap of votes on the ground. */
export const Heap: React.FC<{ position: Vec3; n?: number; r?: number; h?: number; of?: Who | "all" }> = ({ position, n = 40, r = 0.8, h = 0.5, of = "all" }) => (
  <group position={position}>
    {Array.from({ length: n }, (_, i) => {
      const a = rnd(i, 7) * Math.PI * 2;
      const d = r * Math.sqrt(rnd(i, 8));
      return <Slip key={i} of={of === "all" ? WHO[i % WHO.length] : of} position={[Math.sin(a) * d, 0.03 + h * (1 - d / r) * rnd(i, 9), Math.cos(a) * d]} rotation={[-1.2 + rnd(i, 10) * 0.6, rnd(i, 11) * 6, 0]} scale={0.7} />;
    })}
  </group>
);

/** The stage at the north end of the street: planks, a red curtain, three stands. `away` 0..1: it is being taken apart, upward. */
export const StageSet: React.FC<{ away?: number; t?: number; lit?: boolean }> = ({ away = 0, t = 0, lit = false }) => {
  const up = (i: number) => away * away * (5 + (i % 4) * 2.5);
  const gone = (i: number) => away > 0.25 + (i % 5) * 0.15;
  return (
    <group position={[0, 0, STAGE_Z]}>
      <Vox kind="dirt" position={[0, 0.03, 0]} size={[6.4, 0.06, 3.4]} />
      {gone(0) ? null : <Vox kind="planks" position={[0, 0.35 + up(0), 0]} size={[6, 0.7, 3]} />}
      {gone(1) ? null : <Vox kind="darkPlanks" position={[0, 2.4 + up(1), -1.6]} size={[6, 3.6, 0.3]} />}
      {gone(2) ? null : <Block position={[-2.7, 2.4 + up(2), -1.3]} size={[0.6, 3.6, 0.3]} color="#b8322a" />}
      {gone(3) ? null : <Block position={[2.7, 2.4 + up(3), -1.3]} size={[0.6, 3.6, 0.3]} color="#b8322a" />}
      {gone(4) ? null : <Block position={[0, 4.0 + up(4), -1.3]} size={[6, 0.5, 0.3]} color="#b8322a" />}
      {gone(2) ? null : <Plate position={[0, 3.3 + up(2), -1.4]} text="VOTE" scale={1.5} />}
      {[-1.15, 0, 1.15].map((x, i) => (gone(i + 1) ? null : <Block key={i} position={[x, 0.85 + up(i + 2), 0.2]} size={[0.9, 0.3, 0.9]} color="#e9e6dc" />))}
      {lit ? <pointLight position={[0, 3.2, 2.5]} color="#fff0c8" intensity={40 * (1 - away)} distance={12} decay={2} /> : null}
      {away > 0.05 && away < 1 ? <Glow position={[0, 2 + 6 * away, 0]} size={5} color="#ffffff" opacity={0.12 * Math.sin(away * Math.PI) + 0 * t} /> : null}
    </group>
  );
};
/** What is left where the stage was: four stumps and a sign. */
export const StageGone: React.FC = () => (
  <group position={[0, 0, STAGE_Z]}>
    <Vox kind="dirt" position={[0, 0.03, 0]} size={[6.4, 0.06, 3.4]} />
    {[[-2.8, -1.3], [2.8, -1.3], [-2.8, 1.3], [2.8, 1.3]].map(([x, z], i) => (
      <Vox key={i} kind="log" position={[x, 0.2, z]} size={[0.3, 0.4, 0.3]} />
    ))}
    <Vox kind="log" position={[0, 0.6, 1.2]} size={[0.14, 1.2, 0.14]} />
    <Vox kind="planks" position={[0, 1.3, 1.22]} size={[1.9, 0.7, 0.08]} />
    <PixelText text="CLOSED" position={[0, 1.3, 1.27]} height={0.4} color="#b8322a" />
  </group>
);

/** The gate at the south end: a wall, two doors that swing outward, and a post with a button on the town side. */
export const Gate: React.FC<{ open?: number; press?: number; glow?: boolean }> = ({ open = 0, press = 0, glow = false }) => (
  <group position={[0, 0, GATE_Z]}>
    {[-1, 1].map((s) => (
      <group key={s}>
        <Vox kind="cobble" position={[s * 8.6, 1.2, 0]} size={[14, 2.4, 0.6]} />
        <Vox kind="log" position={[s * 1.6, 1.6, 0]} size={[0.4, 3.2, 0.7]} />
        <group position={[s * 1.4, 0, 0.1]} rotation={[0, s * 1.35 * open, 0]}>
          <Vox kind="planks" position={[-s * 0.68, 1.15, 0]} size={[1.36, 2.1, 0.12]} />
          <Block position={[-s * 0.68, 1.15, -0.07]} size={[1.36, 0.14, 0.02]} color="#4a4a52" castShadow={false} />
        </group>
      </group>
    ))}
    <Vox kind="log" position={[0, 3.35, 0]} size={[3.6, 0.4, 0.7]} />
    <Vox kind="log" position={[2.5, 0.6, -0.9]} size={[0.24, 1.2, 0.24]} />
    <Block position={[2.5, 1.0, -1.03 + 0.03 * press]} size={[0.16, 0.16, 0.06]} color={press > 0.5 ? "#ffb347" : "#9a9a9a"} emissive={press > 0.5 ? "#ffb347" : "#000000"} emissiveIntensity={press > 0.5 ? 0.8 : 0} />
    {glow ? <Glow position={[0, 1.4, 0.6]} size={4.5} color="#ffd9a0" opacity={0.22 * open} /> : null}
  </group>
);
export const BUTTON: Vec3 = [2.5, 1.0, GATE_Z - 1.03];

/** The street's mailboxes, all of them. `flags`: whose flag is up. `flowers`: 0..1, a flower on each. */
export const Mailboxes: React.FC<{ flags?: Partial<Record<Who, number>>; letters?: Who[]; flowers?: (i: number) => number; skip?: Who[] }> = ({ flags = {}, letters = [], flowers, skip = [] }) => (
  <>
    {WHO.map((who, i) =>
      skip.includes(who) ? null : (
        <Mailbox key={who} position={HOME[who].box} side={HOME[who].box[0] < 0 ? -1 : 1} tint={HOME[who].tint} flag={flags[who] ?? 0} letter={letters.includes(who)} stuffed={who === "hide"} flower={flowers ? flowers(i) : 0} />
      ),
    )}
  </>
);
const faceIn = (who: Who) => (HOME[who].at[0] < 0 ? 0.55 : -0.55);
/**
 * Everybody who lives here, each beside his own mailbox. `skip` leaves some out (the scene draws them). `look`:
 * head yaw for all. `sad` 0..1. `lost`: the red LOST plates, popped in one after another from `lost` seconds.
 */
export const Neighbours: React.FC<{ t: number; skip?: Who[]; sad?: number; flower?: (i: number) => number; mail?: boolean; turn?: number; soft?: number; happy?: number }> = ({
  t, skip = [], sad = 0, flower, mail = false, turn, soft = 0, happy = 0,
}) => {
  const on = (who: Who) => !skip.includes(who);
  const rot = (who: Who) => turn ?? (mail ? (HOME[who].at[0] < 0 ? -1.2 : 1.2) : faceIn(who));
  return (
    <>
      {on("ice") ? <IceThrower position={HOME.ice.at} rotationY={rot("ice")} t={t} ice={sad > 0.5 ? 0 : 1} nod={0.35 * sad} /> : null}
      {on("bush") ? <Bush position={HOME.bush.at} rotationY={rot("bush")} t={t} soft={soft} flower={flower ? flower(1) : 0} /> : null}
      {on("hide") ? <Hider position={HOME.hide.at} t={t} up={happy} /> : null}
      {on("stone") ? <Stone position={HOME.stone.at} rotationY={rot("stone")} t={t} happy={happy}>{flower && flower(3) > 0 ? <Flower position={[0, 0.02, 0]} scale={1.4 * flower(3)} /> : null}</Stone> : null}
      {on("crab") ? <Crab position={HOME.crab.at} rotationY={rot("crab")} t={t} sad={sad} wave={happy} /> : null}
      {on("penguin") ? <Penguin position={HOME.penguin.at} rotationY={rot("penguin")} t={t} sad={sad} flap={happy} /> : null}
    </>
  );
};
/** A lantern on a post, and its light. */
export const Lantern: React.FC<{ position: Vec3; power?: number }> = ({ position, power = 1 }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 0.9, 0]} size={[0.14, 1.8, 0.14]} />
    <Block position={[0, 1.95, 0]} size={[0.26, 0.3, 0.26]} color="#ffcf70" emissive="#ffb347" emissiveIntensity={1.4} castShadow={false} />
    <Block position={[0, 2.13, 0]} size={[0.3, 0.06, 0.3]} color="#3a3a40" castShadow={false} />
    <pointLight position={[0, 2.0, 0.3]} color="#ffd08a" intensity={15 * power} distance={11} decay={2} />
    <Glow position={[0, 1.95, 0]} size={1.5} color="#ffb347" opacity={0.45} />
  </group>
);
void Torch;

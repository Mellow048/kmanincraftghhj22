import type React from "react";
import { Block, Glow, PixelText, Vox, clamp01, glowTex, mulberry32, pixelTex, shade, useFilmTime, wobble } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/**
 * THINGS — what people say, sleep on, dig through and set fire to.
 *
 * Part of the topic's pack (see PACK.md). Everything takes a `position`, so nothing here
 * knows where a film's town is.
 */

/**
 * A speech bubble. The villagers have one word, so it nearly always says HMM;
 * the first one that says anything else is the turn of the film.
 * It faces +Z: give it the camera's yaw as `rotationY`.
 */
export const Bubble: React.FC<{
  text: string;
  position: Vec3;
  rotationY?: number;
  scale?: number;
  dark?: boolean;
  tilt?: number;
  /** Which side the tail hangs on: -1 left, 1 right. */
  tail?: number;
}> = ({ text, position, rotationY = 0, scale = 1, dark = false, tilt = 0, tail = -1 }) => {
  if (scale <= 0.01) return null;
  const w = 0.24 + text.length * 0.23;
  const paper = dark ? "#2b2140" : "#ffffff";
  const edge = dark ? "#0c0912" : "#15151a";
  return (
    <group position={position} rotation={[0, rotationY, tilt]} scale={scale}>
      <Block size={[w + 0.09, 0.53, 0.03]} color={edge} castShadow={false} />
      <Block position={[0, 0, 0.012]} size={[w, 0.44, 0.03]} color={paper} emissive={paper} emissiveIntensity={dark ? 0.15 : 0.45} castShadow={false} />
      <Block position={[tail * w * 0.24, -0.3, 0]} size={[0.15, 0.15, 0.03]} color={edge} castShadow={false} />
      <Block position={[tail * w * 0.24, -0.27, 0.012]} size={[0.09, 0.13, 0.03]} color={paper} emissive={paper} emissiveIntensity={dark ? 0.15 : 0.45} castShadow={false} />
      <PixelText text={text} position={[0, 0, 0.03]} height={0.34} maxWidth={w - 0.1} color={dark ? "#eadcff" : "#16161c"} />
    </group>
  );
};

/** A Minecraft bed, red blanket and all. `position` is the middle of it, on the floor. The pillow is at -Z. */
export const BedBox: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.2, 0]} size={[1.2, 0.4, 2.3]} />
    <Vox kind="darkPlanks" position={[0, 0.55, -1.1]} size={[1.2, 0.9, 0.1]} />
    <Vox kind="wool" tint="#c8362e" position={[0, 0.47, 0.3]} size={[1.14, 0.16, 1.6]} />
    <Vox kind="wool" tint="#f4f1ea" position={[0, 0.47, -0.78]} size={[1.14, 0.16, 0.56]} />
    <Vox kind="wool" tint="#ffffff" position={[0, 0.58, -0.78]} size={[0.8, 0.1, 0.4]} />
  </group>
);

/** A hole in a floor: black, with a broken edge. `position` is its middle, at floor level. */
export const Hole: React.FC<{ position: Vec3; size?: number; rim?: string }> = ({ position, size = 1, rim = "#7a5536" }) => (
  <group position={position}>
    <Block position={[0, 0.012, 0]} size={[size, 0.02, size]} color="#07050a" castShadow={false} receiveShadow={false} />
    {(
      [
        [-0.5, -0.32, 0.22, 0.3],
        [-0.5, 0.3, 0.16, 0.34],
        [0.5, -0.1, 0.2, 0.42],
        [0.1, -0.5, 0.4, 0.18],
        [-0.2, 0.5, 0.36, 0.2],
        [0.42, 0.44, 0.24, 0.22],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, w, d], i) => (
      <Block key={i} position={[x * size, 0.03 + (i % 2) * 0.02, z * size]} size={[w * size, 0.07, d * size]} color={shade(rim, (i % 3) * 0.05 - 0.05)} />
    ))}
  </group>
);

/** Bits of a block that has just been broken: they fly out from `position` and fall. `t` is seconds since the hit. */
export const Bits: React.FC<{ position: Vec3; t: number; color?: string; count?: number; seed?: number; power?: number; toward?: Vec3 }> = ({
  position,
  t,
  color = "#7a5536",
  count = 9,
  seed = 1,
  power = 1,
  toward = [0, 0, 0],
}) => {
  if (t <= 0 || t > 0.9) return null;
  const rand = mulberry32(seed * 733 + 5);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const vx = (rand() * 2 - 1) * 1.6 * power + toward[0];
        const vy = (1.2 + rand() * 1.8) * power + toward[1];
        const vz = (rand() * 2 - 1) * 1.6 * power + toward[2];
        const s = 0.05 + rand() * 0.07;
        return (
          <mesh key={i} position={[vx * t, vy * t - 4.6 * t * t, vz * t]} rotation={[t * 9 + i, t * 7, i]}>
            <boxGeometry args={[s, s, s]} />
            <meshStandardMaterial color={shade(color, (rand() * 2 - 1) * 0.12)} roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
};

/** One soft puff of smoke: a sprite, so it always faces the lens and never shows an edge. */
const Puff: React.FC<{ position: Vec3; size: number; color: string; opacity: number }> = ({ position, size, color, opacity }) =>
  opacity <= 0.004 ? null : (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial map={glowTex()} color={color} transparent opacity={opacity} depthWrite={false} fog={false} />
    </sprite>
  );

/** A column of smoke that rises from `position`, swells and thins. `lean` blows it along X as it climbs. */
export const Smoke: React.FC<{
  position: Vec3;
  rise?: number;
  spread?: number;
  size?: number;
  count?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  lean?: number;
  seed?: number;
}> = ({ position, rise = 14, spread = 1.6, size = 5, count = 12, color = "#3d332e", opacity = 0.75, speed = 0.1, lean = 0, seed = 1 }) => {
  const t = useFilmTime();
  const rand = mulberry32(seed * 271 + 9);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const jx = rand() * 2 - 1;
        const jz = rand() * 2 - 1;
        const k = (t * speed * (0.8 + rand() * 0.4) + i / count) % 1;
        return (
          <Puff
            key={i}
            position={[jx * spread * (0.3 + k) + lean * k * rise, k * rise, jz * spread * (0.3 + k)]}
            size={size * (0.55 + k * 1.3)}
            color={shade(color, (rand() * 2 - 1) * 0.06)}
            opacity={opacity * (1 - k) * clamp01(k * 5)}
          />
        );
      })}
    </group>
  );
};

/**
 * A bank of smoke across the valley at `x`: a wall, seen from the west. `amount` 1 hides everything
 * behind it; 0 is clear air. `part` slides the two halves north and south, like a curtain.
 */
export const SmokeBank: React.FC<{ x: number; amount: number; part?: number; color?: string; t?: number }> = ({
  x,
  amount,
  part = 0,
  color = "#6a5a51",
  t = 0,
}) => {
  if (amount <= 0.01) return null;
  const rand = mulberry32(91);
  const a = clamp01(amount);
  return (
    <group>
      {Array.from({ length: 40 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const z = side * (0.6 + rand() * 22) + side * part * 26;
        const y = -1 + rand() * 15;
        const size = 13 + rand() * 9;
        const drift = Math.sin(t * 0.5 + i * 1.3) * 0.8;
        return <Puff key={i} position={[x + (i % 5) * 0.8, y + drift * 0.4, z + drift]} size={size} color={shade(color, (rand() * 2 - 1) * 0.07)} opacity={a * 0.95} />;
      })}
      {/* Soft puffs have soft middles too. One flat sheet behind them makes sure nothing shows through before it should. */}
      <mesh position={[x + 5, 6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[150, 60]} />
        <meshBasicMaterial color={color} transparent opacity={clamp01(a * 1.6 - part * 1.2)} depthWrite={false} fog={false} />
      </mesh>
    </group>
  );
};

/** Smoke drifting past a face: soft puffs that cross from one side to the other. `dir` is the way they travel. */
export const Wisps: React.FC<{ position: Vec3; t: number; count?: number; reach?: number; color?: string; size?: number; opacity?: number; dir?: Vec3; seed?: number }> = ({
  position,
  t,
  count = 10,
  reach = 2.4,
  color = "#8d8580",
  size = 0.6,
  opacity = 0.5,
  dir = [-1, 0.18, 0],
  seed = 4,
}) => {
  const rand = mulberry32(seed * 311 + 17);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const k = (t * (0.3 + rand() * 0.28) + rand()) % 1;
        const oy = (rand() * 2 - 1) * 0.7;
        const oz = (rand() * 2 - 1) * 0.9;
        const s = size * (0.6 + rand() * 0.9) * (0.7 + k * 0.8);
        return (
          <Puff
            key={i}
            position={[dir[0] * (k - 0.5) * reach + (1 - Math.abs(dir[0])) * oz, oy + dir[1] * k * reach, dir[2] * (k - 0.5) * reach + (1 - Math.abs(dir[2])) * oz]}
            size={s}
            color={color}
            opacity={opacity * Math.sin(k * Math.PI)}
          />
        );
      })}
    </group>
  );
};

/** A roof on fire: big cubes of flame that rise, shrink and go from yellow to red. `position` is the bottom of it. */
export const Blaze: React.FC<{ position: Vec3; size?: number; height?: number; count?: number; seed?: number }> = ({
  position,
  size = 1.2,
  height = 4.5,
  count = 18,
  seed = 1,
}) => {
  const t = useFilmTime();
  const rand = mulberry32(seed * 517 + 11);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const jx = rand() * 2 - 1;
        const jz = rand() * 2 - 1;
        const k = (t * (0.75 + rand() * 0.6) + rand()) % 1;
        const s = size * (1.12 - k) * (0.45 + rand() * 0.6);
        const color = k < 0.28 ? "#fff0a0" : k < 0.6 ? "#ffab2e" : "#ff5a1e";
        return (
          <mesh key={i} position={[jx * size * (1.1 - k * 0.7), k * height, jz * size * 0.7 * (1.1 - k * 0.7)]} rotation={[k * 4 + i, k * 3, i]}>
            <boxGeometry args={[s, s, s]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={clamp01((1 - k) * 1.8)} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
};

/** Warm light from a fire that is out of frame: a glow and a flickering point light. */
export const FireLight: React.FC<{ position: Vec3; power?: number; reach?: number; seed?: number }> = ({ position, power = 1, reach = 14, seed = 1 }) => {
  const t = useFilmTime();
  const flicker = 0.82 + 0.18 * Math.sin(t * 11 + seed) * Math.sin(t * 5.3 + seed * 2);
  return (
    <>
      <pointLight position={position} color="#ff8a3a" intensity={power * flicker} distance={reach} decay={2} />
      <Glow position={position} size={2.2} color="#ff7a2a" opacity={0.25} />
    </>
  );
};

// ----------------------------------------------------------------------------- worn and carried

const STRAW = "#d9b84a";

/**
 * A straw hat with a flat square brim, as wide as you like. `position` is where it sits: the middle of the
 * top of the head. Put it in a head's own group (a villager's `hat="wide"`, the golem's `hat`, an avatar's
 * `headwear`) and it nods with the head. `tilt` tips it about X: negative tips it back, positive pulls it down in front.
 */
export const StrawHat: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  /** Brim, edge to edge, in metres. 1.1 is "as wide as a door" on a grown villager. */
  width?: number;
  /** Width of the crown: a little wider than the head under it. */
  crown?: number;
  tilt?: number;
  band?: string;
  scale?: number;
}> = ({ position = [0, 0, 0], rotation, width = 1.1, crown = 0.52, tilt = 0, band = "#8a3b2a", scale = 1 }) => {
  const weave = pixelTex(STRAW, [4, 4], { size: 8, jitter: 0.1 });
  const half = width / 2 - 0.035;
  return (
    <group position={position} rotation={rotation ?? [tilt, 0, 0]} scale={scale}>
      <Block position={[0, 0.022, 0]} size={[width, 0.045, width]} map={weave} />
      {/* The underside is in its own shade, and the edge is bound: from below it still reads as a hat. */}
      <Block position={[0, -0.004, 0]} size={[width - 0.12, 0.01, width - 0.12]} color="#a8892e" emissive="#7a5f1c" emissiveIntensity={0.24} castShadow={false} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block position={[0, 0.022, s * half]} size={[width + 0.02, 0.062, 0.07]} color="#b08f2c" castShadow={false} />
          <Block position={[s * half, 0.022, 0]} size={[0.07, 0.062, width + 0.02]} color="#b08f2c" castShadow={false} />
        </group>
      ))}
      <Block position={[0, 0.145, 0]} size={[crown, 0.2, crown]} map={pixelTex("#c9a53a", [2, 1], { size: 8, jitter: 0.1 })} />
      <Block position={[0, 0.082, 0]} size={[crown + 0.03, 0.066, crown + 0.03]} color={band} castShadow={false} />
    </group>
  );
};

/**
 * An iron bucket. `position` is the middle of its rim; the body hangs below it. Turn it over
 * (`rotation={[Math.PI, 0, 0]}`) and it fits over a head: 0.5 m across inside, 0.5 m deep.
 */
export const Bucket: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; handle?: boolean; /** Radians the handle has swung from upright, about the rim. */ swing?: number; color?: string }> = ({
  position = [0, 0, 0],
  rotation,
  scale = 1,
  handle = true,
  swing = 0,
  color = "#a4b0c2",
}) => {
  // Cold grey, and hardly any metalness: with no sky to mirror, real metal goes the colour of the nearest lamp.
  const iron = { color, metalness: 0.15, roughness: 0.55 };
  const dark = shade(color, -0.42);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block position={[0, -0.25, s * 0.265]} size={[0.56, 0.5, 0.03]} {...iron} />
          <Block position={[s * 0.265, -0.25, 0]} size={[0.03, 0.5, 0.5]} {...iron} />
          <Block position={[0, -0.03, s * 0.285]} size={[0.64, 0.06, 0.05]} color={dark} />
          <Block position={[s * 0.285, -0.03, 0]} size={[0.05, 0.06, 0.64]} color={dark} />
          <Block position={[0, -0.36, s * 0.283]} size={[0.58, 0.045, 0.012]} color={dark} castShadow={false} />
          <Block position={[s * 0.283, -0.36, 0]} size={[0.012, 0.045, 0.58]} color={dark} castShadow={false} />
          {/* Rivets under the rim, and a worn patch of lighter iron: it is a pail, not a box. */}
          {[-0.2, 0, 0.2].map((x) => (
            <group key={x}>
              <Block position={[x, -0.12, s * 0.284]} size={[0.045, 0.045, 0.012]} color={dark} castShadow={false} />
              <Block position={[s * 0.284, -0.12, x]} size={[0.012, 0.045, 0.045]} color={dark} castShadow={false} />
            </group>
          ))}
          <Block position={[s * 0.1, -0.24, s * 0.284]} size={[0.16, 0.1, 0.01]} color={shade(color, 0.3)} castShadow={false} />
        </group>
      ))}
      <Block position={[0, -0.5, 0]} size={[0.56, 0.03, 0.56]} {...iron} />
      {handle ? (
        <group position={[0, -0.03, 0]} rotation={[swing, 0, 0]}>
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 0.33, 0.17, 0]} size={[0.035, 0.34, 0.035]} color={dark} castShadow={false} />
          ))}
          <Block position={[0, 0.34, 0]} size={[0.695, 0.035, 0.035]} color={dark} castShadow={false} />
        </group>
      ) : null}
    </group>
  );
};

/**
 * A lantern on a chain. `position` is the point it hangs from. The flame is always bright;
 * `light` > 0 makes it a real light as well (use that on a few, not on all). `sway` swings it, in radians.
 */
export const Lantern: React.FC<{ position: Vec3; chain?: number; light?: number; reach?: number; seed?: number; sway?: number; scale?: number; color?: string }> = ({
  position,
  chain = 0.3,
  light = 0,
  reach = 11,
  seed = 1,
  sway = 0,
  scale = 1,
  color = "#ffb347",
}) => {
  const t = useFilmTime();
  const flicker = 1 + wobble(t * 7, seed) * 0.1;
  const frame = "#2c2c33";
  const y = -chain - 0.19;
  return (
    <group position={position} rotation={[0, 0, sway ? Math.sin(t * 1.4 + seed * 2.1) * sway : 0]} scale={scale}>
      <Block position={[0, -chain / 2, 0]} size={[0.035, chain, 0.035]} color={frame} castShadow={false} />
      <Block position={[0, -chain - 0.025, 0]} size={[0.22, 0.05, 0.22]} color={frame} />
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => <Block key={`${sx}${sz}`} position={[sx * 0.1, y, sz * 0.1]} size={[0.035, 0.28, 0.035]} color={frame} castShadow={false} />),
      )}
      <mesh position={[0, y, 0]}>
        <boxGeometry args={[0.17, 0.24, 0.17]} />
        <meshBasicMaterial color="#ffdf8f" toneMapped={false} />
      </mesh>
      <Block position={[0, y - 0.15, 0]} size={[0.24, 0.04, 0.24]} color={frame} />
      <Glow position={[0, y, 0]} size={1.5 * flicker} color={color} opacity={0.55} />
      {light > 0 ? <pointLight position={[0, y, 0]} color="#ffb060" intensity={light * flicker} distance={reach} decay={2} /> : null}
    </group>
  );
};

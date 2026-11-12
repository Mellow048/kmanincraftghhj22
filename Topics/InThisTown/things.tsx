import type React from "react";
import { Block, Glow, PixelText, Vox, clamp01, glowTex, mulberry32, shade, useFilmTime } from "../../src/engine";
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

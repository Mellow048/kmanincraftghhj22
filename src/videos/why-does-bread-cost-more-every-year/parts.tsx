import type React from "react";
import { Block, Glow, Vox, mulberry32 } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bill, BillStack, Bread, Figure, Puffs } from "../../../Topics/Explainer";

/**
 * PARTS BUILT FOR THIS FILM.
 *
 * The Explainer pack was made before its first film (Topics/Explainer/PACK.md), so this film found out what the
 * pack was missing: an oven, a loaf that comes apart, a price that is too long for a tag, a balloon, a wheelbarrow,
 * notes falling off an island. They are built here, the way the pack asks: in the film first. Each takes a
 * `position` and seconds, and knows nothing about this film's islands, so it can move into the pack unchanged once
 * the owner has approved the film (PACK.md, "Adding a part").
 *
 * 1 unit = 1 block = 1 metre. Everything faces +Z.
 */

/**
 * A baker's oven: brick, a mouth with a fire in it, a chimney that smokes. `position` is the floor under its middle.
 * It is 1.6 wide, 1.2 deep, and 3.2 high to the top of the chimney (`chimney` is the stack's own height: 1.3).
 * The flat top beside the chimney is 1.8 up. `fire` 0–1 is how hot it burns: flare it on a word.
 */
export const Oven: React.FC<{ position?: Vec3; rotationY?: number; fire?: number; smoke?: boolean; tint?: string; chimney?: number }> = ({ position = [0, 0, 0], rotationY = 0, fire = 1, smoke = true, tint, chimney = 1.3 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="bricks" tint={tint} position={[0, 0.7, 0]} size={[1.6, 1.4, 1.2]} />
    <Vox kind="bricks" tint={tint} position={[0, 1.6, -0.1]} size={[1.2, 0.4, 0.9]} />
    <Vox kind="bricks" tint={tint} position={[0.34, 1.8 + chimney / 2, -0.2]} size={[0.44, chimney, 0.44]} />
    <Vox kind="cobble" position={[0.34, 1.84 + chimney, -0.2]} size={[0.6, 0.12, 0.6]} />
    {/* the mouth, the fire in it, and the stone ledge the loaves come out onto */}
    <Block position={[0, 0.84, 0.585]} size={[0.9, 0.64, 0.06]} color="#1a0f08" castShadow={false} />
    <Block position={[0, 0.78, 0.6]} size={[0.76, 0.44, 0.05]} color="#ff9a3a" emissive="#ff7a1e" emissiveIntensity={0.5 + 1.3 * fire} castShadow={false} />
    <Block position={[0, 0.63, 0.62]} size={[0.52, 0.14, 0.04]} color="#ffd98a" emissive="#ffc24a" emissiveIntensity={0.6 + 2 * fire} castShadow={false} />
    <Vox kind="stone" position={[0, 0.47, 0.76]} size={[1.04, 0.1, 0.42]} />
    {fire > 0.05 ? <Glow position={[0, 0.82, 0.95]} size={1.3 + fire * 0.6} color="#ff9a3a" opacity={0.3 * fire} /> : null}
    {smoke ? <Puffs position={[0.34, 1.92 + chimney, -0.2]} color="#f0ece4" count={6} rise={1.7} spread={0.24} size={0.3} speed={0.38} opacity={0.5} seed={3} /> : null}
  </group>
);

/**
 * A loaf that can come apart: the pack's `Bread`, in two halves. `split` is the gap between the halves in metres
 * (at scale 1). At 0 it IS the pack's loaf. Each half shows its pale crumb on the cut side.
 * `position` is the middle of the underside, as for `Bread`.
 */
export const Loaf: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; split?: number }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, split = 0 }) => {
  if (split <= 0.0005) return <Bread position={position} rotationY={rotationY} scale={scale} />;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {([-1, 1] as const).map((side) => (
        <group key={side} position={[(side * split) / 2, 0, 0]}>
          <Block position={[side * 0.13, 0.07, 0]} size={[0.26, 0.14, 0.24]} color="#a8641f" />
          <Block position={[side * 0.115, 0.17, 0]} size={[0.23, 0.08, 0.2]} color="#c98a34" />
          <Block position={[side * 0.09, 0.225, 0]} size={[0.18, 0.04, 0.15]} color="#e0a84e" />
          <Block position={[side * 0.12, 0.2, 0]} rotation={[0, 0.5, 0]} size={[0.035, 0.1, 0.19]} color="#7a4a14" castShadow={false} />
          {/* the crumb: what the inside of a loaf looks like */}
          <Block position={[side * 0.004, 0.1, 0]} size={[0.008, 0.17, 0.19]} color="#f6e6bc" emissive="#f6e6bc" emissiveIntensity={0.15} castShadow={false} />
        </group>
      ))}
    </group>
  );
};

/**
 * A PRICE TOO LONG FOR A TAG: a paper roll that hangs from a rod and unrolls downward, one row at a time.
 * `position` is the middle of the rod. `rows` are the groups of the number, top first: ["200", ",000", ",000", ",000"].
 * `shown` is how many rows have unrolled, and may be a fraction: `shown={1 + 3 * ease(k)}`.
 * Each row is `rowHeight` tall; the figures are made of cubes, like every number in the pack.
 */
export const PriceRoll: React.FC<{ position?: Vec3; rotationY?: number; rows: string[]; shown: number; width?: number; rowHeight?: number; scale?: number; ink?: string }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  rows,
  shown,
  width = 1.3,
  rowHeight = 0.5,
  scale = 1,
  ink = "#2a2118",
}) => {
  const open = Math.max(0, Math.min(rows.length, shown));
  const length = 0.1 + open * rowHeight;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0, 0]} size={[width + 0.3, 0.1, 0.1]} color="#5c3f24" />
      {[-1, 1].map((side) => (
        <Block key={side} position={[side * (width / 2 + 0.17), 0, 0]} size={[0.06, 0.16, 0.16]} color="#3b2a16" />
      ))}
      {open > 0.01 ? (
        <>
          <Block position={[0, -length / 2, -0.012]} size={[width + 0.07, length, 0.02]} color="#8a6a3a" />
          <Block position={[0, -length / 2, 0.004]} size={[width, length, 0.02]} color="#f6ecd2" emissive="#f6ecd2" emissiveIntensity={0.22} castShadow={false} />
          {/* the part that is still rolled up, at the bottom */}
          <Block position={[0, -length - 0.04, 0.02]} size={[width + 0.1, 0.13, 0.13]} color="#e6d9b4" />
          <Block position={[0, -length - 0.04, 0.02]} size={[width + 0.16, 0.07, 0.07]} color="#5c3f24" />
        </>
      ) : null}
      {rows.map((row, i) => {
        // A row is written once it has fully unrolled.
        const k = Math.max(0, Math.min(1, (open - i - 0.55) / 0.4));
        if (k <= 0) return null;
        return <Figure key={i} text={row} position={[0, -0.08 - (i + 0.5) * rowHeight, 0.03]} height={rowHeight * 0.66} maxWidth={width - 0.16} depth={0.25} color={ink} shadow={false} castShadow={false} scale={0.6 + 0.4 * k} />;
      })}
    </group>
  );
};

/**
 * A balloon made of blocks. `position` is its knot, at the bottom: tie a string, or a price, to that point.
 * `size` is its width in metres: grow it as a word is said and it INFLATES.
 */
export const Balloon: React.FC<{ position?: Vec3; size?: number; color?: string; shine?: string }> = ({ position = [0, 0, 0], size = 0.6, color = "#e8352b", shine = "#ff9a8a" }) => {
  if (size <= 0.01) return null;
  return (
    <group position={position}>
      <Block position={[0, 0.03, 0]} size={[0.07, 0.06, 0.07]} color={color} />
      <Block position={[0, 0.07 + size * 0.07, 0]} size={[size * 0.34, size * 0.14, size * 0.34]} color={color} />
      <Block position={[0, 0.07 + size * 0.14 + size * 0.5, 0]} size={[size, size, size]} color={color} emissive={color} emissiveIntensity={0.18} roughness={0.5} />
      <Block position={[0, 0.07 + size * 0.14 + size * 0.5, 0]} size={[size * 0.78, size * 1.12, size * 0.78]} color={color} emissive={color} emissiveIntensity={0.18} roughness={0.5} />
      <Block position={[-size * 0.24, 0.07 + size * 0.14 + size * 0.74, size * 0.505]} size={[size * 0.2, size * 0.2, 0.012]} color={shine} emissive={shine} emissiveIntensity={0.5} castShadow={false} />
    </group>
  );
};

/**
 * A wheelbarrow. `position` is the ground under the middle of its tray; the wheel is at +Z and the handles at -Z.
 * Whatever is in it goes in as children: their origin is the middle of the tray's floor.
 */
export const Wheelbarrow: React.FC<{ position?: Vec3; rotationY?: number; tip?: number; children?: React.ReactNode }> = ({ position = [0, 0, 0], rotationY = 0, tip = 0, children }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <group position={[0, 0.24, 0.62]} rotation={[tip, 0, 0]}>
      <group position={[0, -0.24, -0.62]}>
        <Vox kind="planks" position={[0, 0.5, 0]} size={[0.86, 0.08, 1.06]} />
        {[-1, 1].map((side) => (
          <Vox key={side} kind="planks" tint="#9a7340" position={[side * 0.42, 0.68, 0]} size={[0.07, 0.34, 1.06]} />
        ))}
        <Vox kind="planks" tint="#9a7340" position={[0, 0.68, 0.52]} size={[0.86, 0.34, 0.07]} />
        <Vox kind="planks" tint="#9a7340" position={[0, 0.64, -0.52]} size={[0.86, 0.26, 0.07]} />
        {[-1, 1].map((side) => (
          <group key={`h${side}`}>
            <Block position={[side * 0.36, 0.56, -0.92]} rotation={[-0.12, 0, 0]} size={[0.07, 0.07, 0.86]} color="#5c3f24" />
            <Block position={[side * 0.3, 0.22, -0.42]} size={[0.08, 0.46, 0.08]} color="#5c3f24" />
          </group>
        ))}
        <group position={[0, 0.54, 0]}>{children}</group>
      </group>
      {/* the wheel: an octagon would be a circle, so it is a block, like every wheel in this world */}
      <Block position={[0, 0, 0]} size={[0.12, 0.48, 0.48]} color="#2b2f36" />
      <Block position={[0, 0, 0]} size={[0.16, 0.16, 0.16]} color="#8a959c" metalness={0.2} roughness={0.5} />
    </group>
  </group>
);

/** A heap of banded notes, for a wheelbarrow, a floor or a table: `count` stacks thrown together. Origin: the floor under its middle. */
export const NoteHeap: React.FC<{ position?: Vec3; count?: number; spread?: [number, number]; seed?: number; color?: string }> = ({ position = [0, 0, 0], count = 9, spread = [0.5, 0.7], seed = 1, color }) => {
  const rand = mulberry32(seed * 419 + 11);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const layer = Math.floor(i / 4);
        const x = (rand() - 0.5) * spread[0] * (1 - layer * 0.25);
        const z = (rand() - 0.5) * spread[1] * (1 - layer * 0.25);
        return <BillStack key={i} position={[x, layer * 0.15, z]} rotationY={rand() * 3} count={9 + Math.floor(rand() * 4)} color={color} seed={i + seed} />;
      })}
    </group>
  );
};

/**
 * NOTES POURING AWAY: banknotes that leave `from`, are pushed sideways by `push` (metres, over the whole fall)
 * and fall `drop` metres, tumbling, for ever. `t` is seconds: the film's time. More `count` is a thicker stream.
 */
export const NoteFall: React.FC<{ from: Vec3; push?: Vec3; drop?: number; count?: number; t: number; speed?: number; spread?: number; seed?: number; color?: string; scale?: number }> = ({
  from,
  push = [0, 0, 2],
  drop = 14,
  count = 40,
  t,
  speed = 0.34,
  spread = 0.8,
  seed = 1,
  color,
  scale = 1.6,
}) => {
  const rand = mulberry32(seed * 613 + 17);
  return (
    <group position={from}>
      {Array.from({ length: count }, (_, i) => {
        const jx = rand() - 0.5;
        const jz = rand() - 0.5;
        const pace = 0.85 + rand() * 0.3;
        const k = (t * speed * pace + i / count + rand() * 0.2) % 1;
        // It leaves level and then falls faster and faster, as a thing that is dropped does.
        const x = push[0] * k + jx * spread * (0.4 + k);
        const y = push[1] * k - drop * k * k;
        const z = push[2] * k + jz * spread * (0.4 + k);
        return <Bill key={i} position={[x, y, z]} rotation={[k * 11 + i, k * 6 + i * 1.7, Math.sin(k * 14 + i) * 0.9]} color={color} scale={scale} />;
      })}
    </group>
  );
};

/**
 * One banded bundle of notes, as a single block: for a stack that has to grow tall. (`BillStack` draws every
 * note; twenty of those are a thousand boxes.) 0.46 long, 0.22 deep, 0.15 high. `position` is the middle of its underside.
 */
export const NoteBundle: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; color?: string }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, color = "#6fbf73" }) => {
  if (scale <= 0.001) return null;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0.075, 0]} size={[0.46, 0.15, 0.22]} color={color} />
      <Block position={[0, 0.075, 0]} size={[0.09, 0.156, 0.226]} color="#f4efe0" castShadow={false} />
      <Block position={[0, 0.152, 0]} size={[0.4, 0.004, 0.16]} color="#d9f0d0" castShadow={false} />
    </group>
  );
};

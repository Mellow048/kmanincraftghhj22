import type React from "react";
import { Block, Glow, Vox, mulberry32 } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Figure, Icon, Voxels } from "../Shared";

/**
 * MONEY — coins, notes, a bag, a chest, and the machine that prints more.
 *
 * Part of the Explainer pack (PACK.md). A village trades in emeralds, so every coin can be one:
 * `kind="emerald"`. Use ONE kind of money in a film, and keep it.
 */

export type Metal = "gold" | "silver" | "copper" | "emerald";
const METAL: Record<Metal, { face: string; edge: string }> = {
  gold: { face: "#f2c230", edge: "#b8860b" },
  silver: { face: "#d6dde2", edge: "#8a959c" },
  copper: { face: "#d0824a", edge: "#8a4f26" },
  emerald: { face: "#3fd46a", edge: "#1f8a3e" },
};

/**
 * One coin, standing up and facing +Z, big enough to be the subject of a shot. `position` is its middle.
 * `spin` turns it about its upright axis (radians): `spin={t * 3}` is a coin turning in the air.
 * An emerald is drawn as the gem.
 */
export const Coin: React.FC<{ position?: Vec3; size?: number; kind?: Metal; spin?: number; glow?: number; scale?: number }> = ({
  position = [0, 0, 0],
  size = 0.42,
  kind = "gold",
  spin = 0,
  glow = 0.12,
  scale = 1,
}) => {
  if (kind === "emerald") return <Icon kind="gem" position={position} rotationY={spin} height={size} depth={1.6} color={METAL.emerald.face} glow={glow} scale={scale} />;
  // A rim in the darker metal, and a face that stands a little proud of it on both sides.
  return (
    <group position={position} rotation={[0, spin, 0]} scale={scale}>
      <Voxels rows={["..###..", ".#####.", "#######", "#######", "#######", ".#####.", "..###.."]} height={size} depth={1} color={METAL[kind].edge} glow={glow * 0.5} shadow={false} />
      <Voxels rows={[".###.", "#####", "#####", "#####", ".###."]} height={(size * 5) / 7} depth={1.5} color={METAL[kind].face} glow={glow} shadow={false} />
    </group>
  );
};

/** One coin lying flat: eight sides, so it is still made of corners. `position` is the middle of its underside. */
const FlatCoin: React.FC<{ position: Vec3; turn?: number; tilt?: Vec3; radius: number; kind: Metal }> = ({ position, turn = 0, tilt = [0, 0, 0], radius, kind }) => {
  const thick = radius * 0.28;
  return (
    <group position={position} rotation={[tilt[0], turn, tilt[2]]}>
      <mesh position={[0, thick / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, thick, 8]} />
        <meshStandardMaterial color={METAL[kind].face} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, thick / 2, 0]}>
        <cylinderGeometry args={[radius * 0.72, radius * 0.72, thick * 1.12, 8]} />
        <meshStandardMaterial color={METAL[kind].edge} roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
};

/**
 * A stack of `count` coins. `position` is the floor under it. `count` may be a fraction: 3.5 is three coins
 * and a fourth half way down, so a stack can grow as a number is said (`count={12 * k}`).
 */
export const CoinStack: React.FC<{ position?: Vec3; count: number; kind?: Metal; radius?: number; seed?: number }> = ({ position = [0, 0, 0], count, kind = "gold", radius = 0.16, seed = 1 }) => {
  const rand = mulberry32(seed * 131 + 7);
  const thick = radius * 0.28;
  const whole = Math.floor(count);
  const part = count - whole;
  const coins = Array.from({ length: whole + (part > 0.001 ? 1 : 0) }, (_, i) => ({ x: (rand() - 0.5) * radius * 0.16, z: (rand() - 0.5) * radius * 0.16, turn: rand() * 0.8 }));
  return (
    <group position={position}>
      {coins.map((coin, i) => (
        <FlatCoin key={i} position={[coin.x, i * thick + (i === whole ? (1 - part) * 0.6 : 0), coin.z]} turn={coin.turn} radius={radius} kind={kind} />
      ))}
    </group>
  );
};

/** `count` coins spilled on the ground inside `spread` metres: a heap is `spread={0.4}`, a mess is `spread={1.6}`. */
export const CoinPile: React.FC<{ position?: Vec3; count?: number; kind?: Metal; spread?: number; radius?: number; seed?: number }> = ({
  position = [0, 0, 0],
  count = 14,
  kind = "gold",
  spread = 0.7,
  radius = 0.14,
  seed = 1,
}) => {
  const rand = mulberry32(seed * 977 + 3);
  const thick = radius * 0.28;
  const coins = Array.from({ length: count }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const far = Math.sqrt(rand()) * spread;
    // The middle of a heap is higher: coins lie on coins.
    const level = Math.floor(Math.max(0, 1 - far / Math.max(spread, 0.01)) * Math.min(4, count / 5) * rand() * 1.6);
    return { at: [Math.cos(angle) * far, level * thick, Math.sin(angle) * far] as Vec3, turn: rand() * 3, tilt: [(rand() - 0.5) * 0.5, 0, (rand() - 0.5) * 0.5] as Vec3, i };
  });
  return (
    <group position={position}>
      {coins.map((coin) => (
        <FlatCoin key={coin.i} position={coin.at} turn={coin.turn} tilt={coin.tilt} radius={radius} kind={kind} />
      ))}
    </group>
  );
};

/** One banknote, lying flat. `position` is the middle of its underside; the long side runs along x. */
export const Bill: React.FC<{ position?: Vec3; rotation?: Vec3; rotationY?: number; color?: string; scale?: number }> = ({ position = [0, 0, 0], rotation, rotationY = 0, color = "#6fbf73", scale = 1 }) => (
  <group position={position} rotation={rotation ?? [0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.006, 0]} size={[0.46, 0.012, 0.22]} color={color} />
    <Block position={[0, 0.0135, 0]} size={[0.4, 0.004, 0.16]} color="#d9f0d0" castShadow={false} />
    <Block position={[0, 0.0155, 0]} size={[0.11, 0.004, 0.11]} color={color} castShadow={false} />
    {[-1, 1].map((side) => (
      <Block key={side} position={[side * 0.155, 0.0155, 0]} size={[0.035, 0.004, 0.1]} color={color} castShadow={false} />
    ))}
  </group>
);

/** A banded stack of `count` notes. `position` is the floor under it. `count` may be a fraction, to grow it. */
export const BillStack: React.FC<{ position?: Vec3; rotationY?: number; count?: number; color?: string; seed?: number }> = ({ position = [0, 0, 0], rotationY = 0, count = 12, color = "#6fbf73", seed = 1 }) => {
  const rand = mulberry32(seed * 313 + 5);
  const n = Math.max(0, Math.ceil(count));
  const turns = Array.from({ length: n }, () => (rand() - 0.5) * 0.09);
  const top = n * 0.014;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {turns.map((turn, i) => (
        <Bill key={i} position={[0, i * 0.014, 0]} rotationY={turn} color={color} />
      ))}
      {n >= 4 ? <Block position={[0, top / 2, 0]} size={[0.07, top + 0.012, 0.236]} color="#f4efe0" castShadow={false} /> : null}
    </group>
  );
};

/** A sack of money with the sign on it. `position` is the floor under it. `full` 0–1 is how fat it is. */
export const MoneyBag: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; full?: number; sign?: string }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, full = 1, sign = "$" }) => {
  const fat = 0.7 + 0.3 * full;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Vox kind="wool" tint="#c9a66b" position={[0, 0.22 * fat, 0]} size={[0.52 * fat, 0.44 * fat, 0.44 * fat]} />
      <Vox kind="wool" tint="#b8935a" position={[0, 0.5 * fat, 0]} size={[0.34 * fat, 0.14, 0.3 * fat]} />
      <Block position={[0, 0.58 * fat, 0]} size={[0.24 * fat, 0.05, 0.22 * fat]} color="#6a4a2a" />
      <Vox kind="wool" tint="#c9a66b" position={[0, 0.66 * fat, 0]} size={[0.36 * fat, 0.12, 0.3 * fat]} />
      <Figure text={sign} position={[0, 0.23 * fat, 0.225 * fat]} height={0.24 * fat} depth={0.5} color="#3d7a34" shadow={false} />
    </group>
  );
};

/**
 * A chest. `position` is the floor under it; it opens towards +Z. `open` 0–1 lifts the lid, and `gold` 0–1 is how full it is.
 * A chest is a SAVING: something kept. Open it on the word.
 */
export const Chest: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; open?: number; gold?: number; kind?: Metal }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, open = 0, gold = 0, kind = "gold" }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Vox kind="planks" tint="#a8763a" position={[0, 0.28, 0]} size={[0.9, 0.56, 0.9]} />
    {[-0.45, 0.45].map((x) => (
      <Block key={x} position={[x, 0.28, 0]} size={[0.04, 0.58, 0.92]} color="#3b2a16" />
    ))}
    {gold > 0.01 ? (
      <>
        <Block position={[0, 0.5 + 0.08 * gold, 0]} size={[0.78, 0.12 + 0.16 * gold, 0.78]} color={METAL[kind].face} emissive={METAL[kind].face} emissiveIntensity={0.25 * open} metalness={0.2} roughness={0.5} />
        {open > 0.3 ? <Glow position={[0, 0.9, 0]} size={1.6} color={METAL[kind].face} opacity={0.35 * open} /> : null}
      </>
    ) : null}
    {/* The lid is hinged along its back edge. */}
    <group position={[0, 0.56, -0.45]} rotation={[-1.25 * open, 0, 0]}>
      <Vox kind="planks" tint="#a8763a" position={[0, 0.14, 0.45]} size={[0.9, 0.28, 0.9]} />
      {[-0.45, 0.45].map((x) => (
        <Block key={x} position={[x, 0.14, 0.45]} size={[0.04, 0.3, 0.92]} color="#3b2a16" />
      ))}
      <Block position={[0, 0.04, 0.915]} size={[0.14, 0.2, 0.05]} color="#d6dde2" metalness={0.2} roughness={0.5} />
    </group>
  </group>
);

/**
 * THE PRINTER: a machine that makes more money. `position` is the floor under it; notes come out towards +Z.
 * `out` is how many notes have come out so far, and may be a fraction: `out={t * 4}` prints four a second.
 * The newest note is still sliding; the rest lie in the tray, up to `tray` of them. `sign` is the money it
 * prints: "$" unless the film is about another country's.
 */
export const Printer: React.FC<{ position?: Vec3; rotationY?: number; out?: number; tray?: number; color?: string; running?: boolean; sign?: string }> = ({ position = [0, 0, 0], rotationY = 0, out = 0, tray = 24, color = "#6fbf73", running = true, sign = "$" }) => {
  const done = Math.min(tray, Math.floor(out));
  const sliding = out - Math.floor(out);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* the body, on four feet */}
      {[-0.5, 0.5].flatMap((x) => [-0.3, 0.3].map((z) => <Block key={`${x}${z}`} position={[x, 0.08, z]} size={[0.14, 0.16, 0.14]} color="#2b2f36" />))}
      <Block position={[0, 0.62, 0]} size={[1.3, 0.92, 0.84]} color="#8a94a1" roughness={0.7} metalness={0.1} />
      <Block position={[0, 1.12, 0]} size={[1.36, 0.1, 0.9]} color="#59626e" />
      <Block position={[0, 0.72, 0.425]} size={[1.06, 0.5, 0.02]} color="#b4bdc8" castShadow={false} />
      {/* the slot the notes come out of, and the tray under it */}
      <Block position={[0, 0.5, 0.43]} size={[0.6, 0.05, 0.03]} color="#101216" castShadow={false} />
      <Block position={[0, 0.36, 0.72]} size={[0.74, 0.04, 0.56]} color="#59626e" />
      {[-0.37, 0.37].map((x) => (
        <Block key={x} position={[x, 0.4, 0.72]} size={[0.03, 0.1, 0.56]} color="#2b2f36" />
      ))}
      {/* two lamps and a crank */}
      {[-0.36, -0.2].map((x, i) => (
        <group key={x}>
          <Block position={[x, 0.94, 0.43]} size={[0.09, 0.09, 0.03]} color={i === 0 ? "#58d66a" : "#ffd24a"} emissive={i === 0 ? "#58d66a" : "#ffd24a"} emissiveIntensity={running ? 1.6 : 0.1} castShadow={false} />
          {running ? <Glow position={[x, 0.94, 0.5]} size={0.4} color={i === 0 ? "#58d66a" : "#ffd24a"} opacity={0.5} /> : null}
        </group>
      ))}
      <group position={[0.69, 0.7, 0]} rotation={[running ? out * 2.4 : 0, 0, 0]}>
        <Block position={[0.05, 0, 0]} size={[0.1, 0.1, 0.1]} color="#2b2f36" />
        <Block position={[0.1, 0.16, 0]} size={[0.05, 0.36, 0.05]} color="#c8402f" />
        <Block position={[0.16, 0.32, 0]} size={[0.14, 0.07, 0.07]} color="#2b2f36" />
      </group>
      <Figure text={sign} position={[0.28, 0.82, 0.44]} height={0.26} depth={0.4} color="#3d7a34" shadow={false} />
      {/* the notes */}
      {Array.from({ length: done }, (_, i) => (
        <Bill key={i} position={[((i * 37) % 11) * 0.006 - 0.03, 0.38 + i * 0.013, 0.74 + ((i * 53) % 7) * 0.008 - 0.024]} rotationY={Math.PI / 2 + (((i * 29) % 9) - 4) * 0.03} color={color} />
      ))}
      {out < tray && sliding > 0.001 ? <Bill position={[0, 0.5 - 0.11 * sliding + done * 0.013 * sliding, 0.44 + 0.3 * sliding]} rotationY={Math.PI / 2} color={color} /> : null}
    </group>
  );
};

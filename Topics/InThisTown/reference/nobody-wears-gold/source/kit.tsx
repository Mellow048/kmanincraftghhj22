import type React from "react";
import {
  Block,
  ChatToast,
  FloatingNumber,
  Glow,
  MinecraftAvatar,
  Vox,
  cam,
  clamp01,
  lerp,
  moveBetween,
  storyScene,
  useFilmTime,
} from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import {
  Bell,
  Bubble,
  KID,
  LampPost,
  Player,
  Puffs,
  ROBE,
  SubscribeSign,
  VillageStreet,
  Villager,
  ease,
  jolt,
  pop,
  ramp,
  wordClock,
} from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  Block,
  ChatToast,
  FloatingNumber,
  Glow,
  Vox,
  cam,
  clamp01,
  lerp,
  moveBetween,
  storyScene,
  Bell,
  Bubble,
  KID,
  LampPost,
  Player,
  Puffs,
  ROBE,
  SubscribeSign,
  VillageStreet,
  Villager,
  ease,
  jolt,
  pop,
  ramp,
};
export type { Timing, Vec3 };

export {
  DEG,
  EAST,
  NORTH,
  SOUTH,
  WEST,
  ADULT,
  CHILD,
  IronGolem,
  Bits,
  FireLight,
  Hut,
  Smoke,
  Stall,
  Pine,
  ForestEdge,
  NightFill,
  PixelHeart,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

/** Physically separated zones for Main Street, Mayor Vance's Gold Vault, and the Dark Pines. */
export const PLACE = {
  village: [0, 0, 0] as Vec3,
  vault: [0, 0, 84] as Vec3,
  pines: [0, 0, 168] as Vec3,
};

export const on = (base: Vec3, x: number, y: number, z: number): Vec3 => [
  base[0] + x,
  base[1] + y,
  base[2] + z,
];

const hex = (c: string) => [
  parseInt(c.slice(1, 3), 16),
  parseInt(c.slice(3, 5), 16),
  parseInt(c.slice(5, 7), 16),
];
const mix = (a: string, b: string, k: number): string => {
  const x = hex(a);
  const y = hex(b);
  const q = clamp01(k);
  return `#${[0, 1, 2]
    .map((i) => Math.round(lerp(x[i], y[i], q)).toString(16).padStart(2, "0"))
    .join("")}`;
};

// ----------------------------------------------------------------------------- Gold & Story Props

/** Bright gleaming Minecraft Gold Helmet with Toby's signature little dent on the brow. Mount in `head` prop. */
export const GoldHelmet: React.FC<{ position?: Vec3; scale?: number; dented?: boolean }> = ({
  position = [0, 0, 0],
  scale = 1,
  dented = true,
}) => (
  <group position={position} scale={scale}>
    <Block
      position={[0, 0.255, 0]}
      size={[0.57, 0.1, 0.57]}
      color="#ffd23f"
      emissive="#f5b31a"
      emissiveIntensity={0.28}
      metalness={0.38}
      roughness={0.28}
    />
    <Block
      position={[0, 0.17, 0.275]}
      size={[0.56, 0.14, 0.06]}
      color="#f7c42d"
      emissive="#e09f14"
      emissiveIntensity={0.22}
    />
    <Block position={[0, 0.09, 0.285]} size={[0.1, 0.12, 0.05]} color="#ffe57a" />
    <Block position={[-0.275, 0.08, 0.01]} size={[0.06, 0.34, 0.54]} color="#e8b21f" />
    <Block position={[0.275, 0.08, 0.01]} size={[0.06, 0.34, 0.54]} color="#e8b21f" />
    <Block position={[0, 0.08, -0.275]} size={[0.56, 0.34, 0.06]} color="#d9a116" />
    {dented ? <Block position={[0.13, 0.2, 0.305]} size={[0.09, 0.05, 0.03]} color="#7a5710" /> : null}
  </group>
);

/** Plain iron helmet for Mayor Vance / Iron Guards. */
export const IronHelmet: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.255, 0]} size={[0.57, 0.1, 0.57]} color="#c9cfd6" metalness={0.3} roughness={0.35} />
    <Block position={[0, 0.17, 0.275]} size={[0.56, 0.14, 0.06]} color="#b4bcc6" />
    <Block position={[0, 0.09, 0.285]} size={[0.1, 0.12, 0.05]} color="#dce2e8" />
    <Block position={[-0.275, 0.08, 0.01]} size={[0.06, 0.34, 0.54]} color="#a7b0bb" />
    <Block position={[0.275, 0.08, 0.01]} size={[0.06, 0.34, 0.54]} color="#a7b0bb" />
    <Block position={[0, 0.08, -0.275]} size={[0.56, 0.34, 0.06]} color="#99a3af" />
  </group>
);

/** Mayor Vance's signature tall black Top Hat with gold ribbon + crisp white handlebar mustache! */
export const MayorHatAndMustache: React.FC<{ ironSuit?: boolean }> = ({ ironSuit = false }) => (
  <group>
    {/* Crisp sculpted white handlebar mustache sitting right under the nose (+Z face is at z=0.25) */}
    <Block position={[0, -0.055, 0.278]} size={[0.28, 0.068, 0.052]} color="#f4f6fa" />
    <Block position={[-0.145, -0.078, 0.274]} size={[0.09, 0.065, 0.048]} color="#e6ebf2" />
    <Block position={[0.145, -0.078, 0.274]} size={[0.09, 0.065, 0.048]} color="#e6ebf2" />
    {/* White bushy eyebrows */}
    <Block position={[-0.11, 0.095, 0.268]} size={[0.13, 0.036, 0.032]} color="#eef1f6" />
    <Block position={[0.11, 0.095, 0.268]} size={[0.13, 0.036, 0.032]} color="#eef1f6" />
    {ironSuit ? (
      <IronHelmet />
    ) : (
      <group position={[0, 0.255, 0]}>
        {/* Wide formal black top hat brim */}
        <Block position={[0, 0.03, 0]} size={[0.72, 0.06, 0.72]} color="#1d1e24" />
        {/* Silk gold ribbon band */}
        <Block position={[0, 0.1, 0]} size={[0.52, 0.08, 0.52]} color="#f5c838" emissive="#c99310" emissiveIntensity={0.22} />
        {/* Tall black top hat crown */}
        <Block position={[0, 0.28, 0]} size={[0.48, 0.3, 0.48]} color="#23252e" />
        <Block position={[0, 0.44, 0]} size={[0.5, 0.04, 0.5]} color="#181920" />
      </group>
    )}
  </group>
);

/** Gleaming Minecraft Gold Ingot bar. */
export const GoldIngot: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block
      position={[0, 0.06, 0]}
      size={[0.38, 0.12, 0.2]}
      color="#ffd23f"
      emissive="#f5b31a"
      emissiveIntensity={0.32}
      metalness={0.35}
      roughness={0.28}
    />
    <Block position={[0, 0.13, 0]} size={[0.3, 0.04, 0.14]} color="#fff099" />
  </group>
);

/** Glowing teal Ender Pearl traded back by Piglins. */
export const EnderPearlOrb: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.24, 0.24, 0.24]} color="#0d6e6e" emissive="#1de2d4" emissiveIntensity={0.55} />
    <Block position={[0.04, 0.05, 0.06]} size={[0.1, 0.1, 0.15]} color="#88fff5" emissive="#88fff5" emissiveIntensity={0.7} />
  </group>
);

/** Bright yellow Minecraft dandelion flower on a stem. */
export const Dandelion: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.18, 0]} size={[0.07, 0.36, 0.07]} color="#3f8f2d" />
    <Block position={[0.07, 0.14, 0]} size={[0.12, 0.05, 0.06]} color="#4da339" />
    <Block
      position={[0, 0.4, 0]}
      size={[0.24, 0.16, 0.24]}
      color="#ffe033"
      emissive="#ffd000"
      emissiveIntensity={0.25}
    />
    <Block position={[0, 0.49, 0]} size={[0.16, 0.06, 0.16]} color="#fff580" />
  </group>
);

/** Golden carrot on a wooden baker's tray. */
export const GoldenCarrot: React.FC<{ position?: Vec3; rotationY?: number; scale?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.03, 0]} size={[0.64, 0.06, 0.42]} color="#7a5330" />
    <Block
      position={[-0.04, 0.12, 0]}
      size={[0.38, 0.12, 0.12]}
      color="#ffb81c"
      emissive="#ffaa00"
      emissiveIntensity={0.35}
    />
    <Block position={[-0.26, 0.11, 0]} size={[0.12, 0.08, 0.08]} color="#ffe066" />
    <Block position={[0.2, 0.16, 0]} size={[0.12, 0.16, 0.14]} color="#45a832" />
  </group>
);

/** Iron armor stand displaying Mayor Vance's overpriced iron chestplate. */
export const IronArmorStand: React.FC<{ position?: Vec3; rotationY?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.06, 0]} size={[0.7, 0.12, 0.7]} color="#8b8e94" />
    <Block position={[0, 0.72, 0]} size={[0.12, 1.24, 0.12]} color="#7c5632" />
    <Block position={[0, 1.32, 0]} size={[0.85, 0.1, 0.12]} color="#7c5632" />
    <Block position={[0, 1.15, 0]} size={[0.56, 0.64, 0.34]} color="#c4cbd4" metalness={0.32} roughness={0.35} />
    <Block position={[0, 1.24, 0.18]} size={[0.34, 0.22, 0.04]} color="#dde3ea" />
    <IronHelmet position={[0, 1.65, 0]} scale={0.85} />
  </group>
);

/** Pair of detailed 3D Minecraft Gold Armor Boots displayed on the ground. */
export const GoldBootPair: React.FC<{ position?: Vec3; rotationY?: number; scale?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    {[-0.19, 0.19].map((x) => (
      <group key={x} position={[x, 0, 0]}>
        <Block position={[0, 0.03, 0.03]} size={[0.26, 0.06, 0.34]} color="#855204" />
        <Block position={[0, 0.13, 0.04]} size={[0.25, 0.14, 0.32]} color="#ffd23f" emissive="#c48a00" emissiveIntensity={0.26} metalness={0.55} roughness={0.28} />
        <Block position={[0, 0.25, -0.02]} size={[0.24, 0.16, 0.22]} color="#f6c92e" emissive="#b88200" emissiveIntensity={0.22} metalness={0.55} roughness={0.28} />
        <Block position={[0, 0.33, -0.02]} size={[0.26, 0.04, 0.24]} color="#b87c0a" />
      </group>
    ))}
  </group>
);

/** Giant Obsidian Nether Portal at the north end of Main Street. */
export const NetherPortal: React.FC<{ position?: Vec3; lit?: number }> = ({
  position = [0, 0, 0],
  lit = 1,
}) => {
  const t = useFilmTime();
  return (
    <group position={position}>
      <Vox kind="cobble" position={[0, 0.24, 0.6]} size={[6.2, 0.52, 3.6]} />
      <Vox kind="obsidian" position={[0, 0.9, 0]} size={[5, 0.9, 1.1]} />
      <Vox kind="obsidian" position={[0, 5.6, 0]} size={[5, 0.9, 1.1]} />
      <Vox kind="obsidian" position={[-2.0, 3.25, 0]} size={[0.98, 3.8, 1.08]} />
      <Vox kind="obsidian" position={[2.0, 3.25, 0]} size={[0.98, 3.8, 1.08]} />
      {lit > 0.02 ? (
        <>
          <mesh position={[0, 3.25, 0]}>
            <boxGeometry args={[3.04, 3.8, 0.22]} />
            <meshBasicMaterial
              color={mix("#5a1fb8", "#c278ff", 0.35 + 0.28 * Math.sin(t * 4.5))}
              transparent
              opacity={0.9 * clamp01(lit)}
              toneMapped={false}
            />
          </mesh>
          {Array.from({ length: 10 }, (_, i) => {
            const k = (t * (0.4 + (i % 3) * 0.12) + i * 0.1) % 1;
            const ang = k * Math.PI * 4 + i;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(ang) * 1.1 * (1 - k * 0.4),
                  3.25 + Math.sin(ang) * 1.45 * (1 - k * 0.4),
                  0.24,
                ]}
              >
                <boxGeometry args={[0.18, 0.18, 0.05]} />
                <meshBasicMaterial
                  color={i % 2 ? "#e2b8ff" : "#ffffff"}
                  transparent
                  opacity={0.85 * clamp01(lit)}
                  toneMapped={false}
                />
              </mesh>
            );
          })}
          <Glow position={[0, 3.25, 0.8]} size={7 + 4 * lit} color="#a450ff" opacity={0.45 * clamp01(lit)} />
          <pointLight position={[0, 3.2, 2.2]} color="#b46eff" intensity={18 * lit} distance={18} decay={2} />
        </>
      ) : null}
    </group>
  );
};

/** Mayor Vance's Brick Gold Vault with hinged iron door, wall lever, and gleaming gold blocks stacked inside. */
export const BrickVault: React.FC<{ position?: Vec3; open?: number; lever?: number }> = ({
  position = [0, 0, 0],
  open = 0,
  lever = 0,
}) => {
  const doorAngle = clamp01(open) * 1.95;
  return (
    <group position={position}>
      {/* Non-overlapping wide stone steps */}
      <Vox kind="stoneBrick" position={[0, 0.24, 1.4]} size={[7.6, 0.52, 2.8]} />
      <Vox kind="stoneBrick" position={[0, 0.65, 0.55]} size={[6.6, 0.3, 1.3]} />
      {/* Non-overlapping left, right, top brick walls */}
      <Vox kind="bricks" position={[-2.62, 2.8, -1.6]} size={[2.56, 4.6, 3.56]} />
      <Vox kind="bricks" position={[2.62, 2.8, -1.6]} size={[2.56, 4.6, 3.56]} />
      <Vox kind="bricks" position={[0, 4.32, -1.6]} size={[2.64, 1.56, 3.56]} />
      <Vox kind="stoneBrick" position={[0, 5.36, -1.6]} size={[8.2, 0.5, 4.0]} />
      {/* Vault dark back wall */}
      <Vox kind="cobble" position={[0, 2.4, -3.55]} size={[3.0, 4.0, 0.36]} />
      {/* Massive stacks of gleaming Gold Blocks visible inside when opened */}
      {[-0.75, 0, 0.75].flatMap((gx, gi) =>
        [1.15, 1.95].map((gy, gj) => (
          <Block
            key={`${gi}-${gj}`}
            position={[gx, gy, -2.55 + gj * 0.15]}
            size={[0.68, 0.68, 0.68]}
            color="#ffd23f"
            emissive="#f5b31a"
            emissiveIntensity={0.32}
          />
        )),
      )}
      {open > 0.15 ? (
        <>
          <Glow position={[0, 2.1, -0.6]} size={4.2 * clamp01(open)} color="#ffd95c" opacity={0.45 * clamp01(open)} />
          <pointLight position={[0, 2.4, -0.5]} color="#ffda6b" intensity={10 * clamp01(open)} distance={10} decay={2} />
        </>
      ) : null}
      {/* Heavy iron doorway frame */}
      <Block position={[-1.22, 2.2, 0.2]} size={[0.24, 2.96, 0.28]} color="#4e5560" />
      <Block position={[1.22, 2.2, 0.2]} size={[0.24, 2.96, 0.28]} color="#4e5560" />
      <Block position={[0, 3.68, 0.2]} size={[2.72, 0.24, 0.3]} color="#4e5560" />
      {/* Hinged iron vault door */}
      <group position={[-1.08, 0.7, 0.22]} rotation={[0, -doorAngle, 0]}>
        <Block position={[1.08, 1.4, 0]} size={[2.14, 2.76, 0.16]} color="#7e8794" metalness={0.35} roughness={0.4} />
        <Block position={[1.08, 1.4, 0.1]} size={[1.7, 2.2, 0.04]} color="#68717d" />
        <Block position={[1.72, 1.4, 0.14]} size={[0.38, 0.38, 0.06]} color="#ffd23f" />
      </group>
      {/* Wall lever on the right brick pillar */}
      <group position={[1.65, 1.85, 0.26]}>
        <Block position={[0, 0, 0]} size={[0.24, 0.36, 0.12]} color="#5c626b" />
        <group position={[0, 0, 0.06]} rotation={[lerp(-0.65, 0.65, clamp01(lever)), 0, 0]}>
          <Block position={[0, 0.2, 0.12]} size={[0.08, 0.44, 0.08]} color="#7a5330" />
          <Block position={[0, 0.42, 0.12]} size={[0.14, 0.14, 0.14]} color="#d93829" />
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- Cast

type A = Partial<MinecraftAvatarProps>;

/** Toby — loud coral-red tunic, blue trousers, dented Gold Helmet, and REAL 3D Gold Armor Boots when worn! */
export const Hero: React.FC<A & { helmet?: boolean; goldBoots?: boolean }> = ({
  helmet = true,
  goldBoots = false,
  ...p
}) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#e0a980"
    hair="#3b2314"
    colors={{
      torso: "#e03c31",
      arms: "skin",
      legs: "#2e3c66",
    }}
    boots={goldBoots ? "gold" : undefined}
    head={helmet ? <GoldHelmet /> : undefined}
    blink
    {...p}
  />
);

/** Mayor Vance — greedy purple-charcoal formal coat, tall Top Hat + white handlebar mustache (or Iron Suit!). */
export const MayorVance: React.FC<A & { ironSuit?: boolean }> = ({ ironSuit = false, ...p }) => (
  <MinecraftAvatar
    scale={1.04}
    outfit="suit"
    skin="#d9a07a"
    hair="#cfd4dc"
    colors={
      ironSuit
        ? { torso: "#c2cad4", arms: "#b4bcc7", legs: "#9ca5b2" }
        : { torso: "#48265e", arms: "#3a1e4d", legs: "#262836" }
    }
    head={<MayorHatAndMustache ironSuit={ironSuit} />}
    blink
    {...p}
  />
);

/** Grandpa — silver-haired elder in warm forest-green sweater + REAL 3D Gold Armor Boots when worn! */
export const Grandpa: React.FC<A & { goldBoots?: boolean }> = ({ goldBoots = false, ...p }) => (
  <MinecraftAvatar
    scale={0.98}
    outfit="hoodie"
    skin="#d6a07e"
    hair="#cfd4dc"
    colors={{
      torso: "#2f6b47",
      arms: "#26593b",
      legs: "#4a3f35",
    }}
    boots={goldBoots ? "gold" : undefined}
    blink
    {...p}
  />
);

/** Town Iron Guard — uniformed defender in grey iron armor & iron helmet. */
export const IronGuard: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1.0}
    outfit="suit"
    skin="#cfa07c"
    hair="#473325"
    colors={{ torso: "#b5bec9", arms: "#a3adb9", legs: "#6e7785" }}
    boots="iron"
    head={<IronHelmet />}
    blink
    {...p}
  />
);

const PIG = {
  skin: "#f0b494",
  snout: "#e39878",
  cloth: "#5e3322",
  cloth2: "#3b2016",
  gold: "#ffd23f",
  dark: "#26120c",
};

/**
 * Minecraft Piglin — snout, tusks, flap ears with gold ring, golden sword, expressive brow.
 * `calm: 1` relaxes angry eyebrows & lowers sword when Toby wears gold!
 */
export const Piglin: React.FC<{
  position: Vec3;
  rotationY?: number;
  scale?: number;
  walk?: number;
  raise?: number;
  sword?: boolean;
  calm?: number;
  holdGold?: boolean;
  holdPearl?: boolean;
  headPitch?: number;
  headYaw?: number;
  seed?: number;
}> = ({
  position,
  rotationY = 0,
  scale = 1,
  walk = 0,
  raise = 0,
  sword = true,
  calm = 0,
  holdGold = false,
  holdPearl = false,
  headPitch = 0,
  headYaw = 0,
  seed = 0,
}) => {
  const t = useFilmTime();
  const u = 1 / 16;
  const gait = walk * 4.6;
  const swing = Math.sin(gait) * 0.68;
  const bob = Math.abs(Math.sin(gait)) * 0.04;
  const inspectArm = holdGold || holdPearl ? -1.15 : 0;
  const armR = holdGold
    ? inspectArm
    : -2.5 * raise * (1 - calm) + (1 - raise * (1 - calm)) * (-swing * 0.75);
  const armL = holdPearl ? inspectArm : swing * 0.75;
  const browTilt = 0.35 * (1 - calm);
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 2 * u, 12 * u, 0]} rotation={[s * swing, 0, 0]}>
          <Block position={[0, -5 * u, 0]} size={[3.9 * u, 10 * u, 4 * u]} color={PIG.cloth2} />
          <Block position={[0, -11 * u, 0]} size={[3.9 * u, 2 * u, 4 * u]} color={PIG.skin} />
        </group>
      ))}
      <group position={[0, 12 * u + bob, 0]}>
        <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 4 * u]} color={PIG.cloth} />
        <Block position={[0, 1.2 * u, 0]} size={[8.2 * u, 1.6 * u, 4.2 * u]} color={PIG.cloth2} castShadow={false} />
        <Block position={[0, 1.2 * u, 2.1 * u]} size={[2 * u, 2 * u, 0.3 * u]} color={PIG.gold} castShadow={false} />
        <Block position={[0, 9 * u, 2.05 * u]} size={[4 * u, 3 * u, 0.1 * u]} color={PIG.skin} castShadow={false} />
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 6 * u, 10.5 * u, 0]} rotation={[s === 1 ? armR : armL, 0, s * 0.08]}>
            <Block position={[0, -1.5 * u, 0]} size={[4 * u, 4 * u, 4.05 * u]} color={PIG.cloth} />
            <Block position={[0, -7.5 * u, 0]} size={[3.9 * u, 8 * u, 3.9 * u]} color={PIG.skin} />
            {s === 1 && sword && !holdGold ? (
              <group position={[0, -11 * u, 1 * u]} rotation={[-1.45, 0, 0]}>
                <Block position={[0, -1 * u, 0]} size={[1.2 * u, 4 * u, 1.2 * u]} color="#5a3a1c" />
                <Block position={[0, 1.4 * u, 0]} size={[5 * u, 1.2 * u, 1.4 * u]} color="#c99a1e" />
                <Block
                  position={[0, 8.5 * u, 0]}
                  size={[2.4 * u, 13 * u, 0.9 * u]}
                  color={PIG.gold}
                  emissive={PIG.gold}
                  emissiveIntensity={0.28}
                />
                <Block position={[0, 15.6 * u, 0]} size={[1.3 * u, 1.4 * u, 0.9 * u]} color="#fff2a0" />
              </group>
            ) : null}
            {s === 1 && holdGold ? <GoldIngot position={[0, -10.5 * u, 2.2 * u]} scale={0.9} /> : null}
            {s === -1 && holdPearl ? <EnderPearlOrb position={[0, -10.5 * u, 2.2 * u]} scale={0.9} /> : null}
          </group>
        ))}
        <group position={[0, 12 * u, 0]} rotation={[headPitch, headYaw, 0]}>
          <Block position={[0, 4 * u, 0]} size={[10 * u, 8 * u, 8 * u]} color={PIG.skin} />
          <Block position={[0, 7.4 * u, 0]} size={[10.1 * u, 1.3 * u, 8.1 * u]} color={mix(PIG.skin, "#000000", 0.14)} castShadow={false} />
          <Block position={[0, 2.4 * u, 4.4 * u]} size={[4.2 * u, 3.6 * u, 1.2 * u]} color={PIG.snout} />
          {[-1, 1].map((s) => (
            <group key={s}>
              <Block position={[s * 1.05 * u, 2.9 * u, 5.02 * u]} size={[1 * u, 1.3 * u, 0.1 * u]} color={PIG.dark} castShadow={false} />
              <Block position={[s * 2.7 * u, 1.5 * u, 4.4 * u]} size={[1 * u, 2.2 * u, 1 * u]} color="#fff6e0" />
              <Block position={[s * 3.1 * u, 5.4 * u, 4.02 * u]} size={[2.2 * u, 1.5 * u, 0.1 * u]} color="#ffffff" castShadow={false} />
              <Block position={[s * 2.6 * u, 5.4 * u, 4.06 * u]} size={[1.1 * u, 1.5 * u, 0.1 * u]} color="#1a1210" castShadow={false} />
              <Block
                position={[s * 3.1 * u, 6.6 * u, 4.07 * u]}
                rotation={[0, 0, s * browTilt]}
                size={[2.8 * u, 0.8 * u, 0.1 * u]}
                color={PIG.dark}
                castShadow={false}
              />
              <group position={[s * 5 * u, 6 * u, 0]} rotation={[0, 0, s * (0.48 + 0.22 * Math.sin(t * 5 + gait + seed + s))]}>
                <Block position={[s * 0.6 * u, -2.4 * u, 0]} size={[1.1 * u, 5 * u, 4 * u]} color={mix(PIG.skin, "#000000", 0.1)} />
                {s === 1 ? <Block position={[s * 0.7 * u, -4.6 * u, 1 * u]} size={[1.4 * u, 1.2 * u, 1.2 * u]} color={PIG.gold} /> : null}
              </group>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};

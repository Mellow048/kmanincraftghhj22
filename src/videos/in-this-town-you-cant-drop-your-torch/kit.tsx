import React, { useMemo } from "react";
import {
  Block,
  Clouds,
  Dust,
  FloatingNumber,
  Glow,
  GodRay,
  LightPool,
  Sign,
  Torch,
  Tree,
  Vox,
  Zone,
  cam,
  clamp01,
  lerp,
  moveBetween,
  mulberry32,
  storyScene,
  vlerp,
} from "../../engine";
import type { AnimName, FaceName, Timing, Vec3 } from "../../engine";
import {
  ForestEdge,
  Hut,
  LampPost,
  Moon,
  Pine,
  Player,
  Puddle,
  Room,
  SchoolDesk,
  Smoke,
  Stars,
  SubscribeSign,
  VillageStreet,
  Wisps,
} from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  Block,
  Clouds,
  Dust,
  FloatingNumber,
  ForestEdge,
  Glow,
  GodRay,
  Hut,
  LampPost,
  LightPool,
  Moon,
  Pine,
  Player,
  Puddle,
  Room,
  SchoolDesk,
  Sign,
  Smoke,
  Stars,
  SubscribeSign,
  Torch,
  Tree,
  VillageStreet,
  Vox,
  Wisps,
  Zone,
  cam,
  clamp01,
  lerp,
  moveBetween,
  mulberry32,
  storyScene,
  vlerp,
};
export type { AnimName, FaceName, Timing, Vec3 };

export const timing = timingJson as Timing;

export const TOWN_POS: Vec3 = [0, 0, 0];
export const ROOM_POS: Vec3 = [70, 0, 0];

/* ─────────────────────────── DISTINCT CAST (ZERO CLONES) ─────────────────────────── */

type CastProps = {
  position?: Vec3;
  rotationY?: number;
  animation?: AnimName;
  animDistance?: number;
  face?: FaceName;
  time?: number;
  torch?: boolean;
  light?: number;
  scale?: number;
};

export const Kai: React.FC<CastProps> = (props) => (
  <Player who={10} scale={0.86} {...props} />
);

export const Mom: React.FC<CastProps> = (props) => (
  <Player who={7} scale={0.98} {...props} />
);

export const ChiefFlint: React.FC<CastProps> = (props) => (
  <Player who={0} scale={1.06} {...props} />
);

export const Townie: React.FC<CastProps & { who?: number }> = ({ who = 1, ...props }) => (
  <Player who={who} {...props} />
);

/* ─────────────────────────── STORY PROPS ─────────────────────────── */

/** Real wooden baby crib with slatted rails, cozy blanket, pillow, and corner torch. */
export const BabyCrib: React.FC<{ position?: Vec3; rotationY?: number; lit?: boolean }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  lit = true,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Mattress & cozy sky-blue blanket */}
    <Vox kind="planks" position={[0, 0.36, 0]} size={[1.4, 0.14, 0.92]} />
    <Block position={[0.06, 0.48, 0]} size={[1.18, 0.14, 0.8]} color="#6aaae8" />
    <Block position={[-0.46, 0.54, 0]} size={[0.28, 0.12, 0.56]} color="#f5f1e6" />
    {/* 4 corner oak posts */}
    {[
      [-0.68, -0.44],
      [0.68, -0.44],
      [-0.68, 0.44],
      [0.68, 0.44],
    ].map(([x, z], i) => (
      <Vox key={i} kind="darkPlanks" position={[x!, 0.52, z!]} size={[0.1, 1.04, 0.1]} />
    ))}
    {/* Top rails & vertical wooden slats */}
    <Vox kind="planks" position={[0, 0.94, 0.44]} size={[1.42, 0.08, 0.08]} />
    <Vox kind="planks" position={[0, 0.94, -0.44]} size={[1.42, 0.08, 0.08]} />
    <Vox kind="planks" position={[-0.68, 0.94, 0]} size={[0.08, 0.08, 0.92]} />
    <Vox kind="planks" position={[0.68, 0.94, 0]} size={[0.08, 0.08, 0.92]} />
    {[-0.44, -0.22, 0, 0.22, 0.44].map((x) => (
      <React.Fragment key={x}>
        <Vox kind="planks" position={[x, 0.65, 0.44]} size={[0.055, 0.52, 0.055]} />
        <Vox kind="planks" position={[x, 0.65, -0.44]} size={[0.055, 0.52, 0.055]} />
      </React.Fragment>
    ))}
    {/* Lit torch beside the crib */}
    {lit ? <Torch position={[0.88, 0.92, 0.42]} /> : null}
  </group>
);

/** Glass jar containing Pip the firefly. */
export const FireflyJar: React.FC<{
  position?: Vec3;
  scale?: number;
  open?: number;
  hasPip?: boolean;
  t?: number;
}> = ({ position = [0, 0, 0], scale = 1, open = 0, hasPip = true, t = 0 }) => {
  const bob = Math.sin(t * 5.2) * 0.05;
  return (
    <group position={position} scale={scale}>
      {/* Glass body */}
      <Block position={[0, 0.22, 0]} size={[0.26, 0.36, 0.26]} color="#bfe9ff" opacity={0.45} transparent />
      {/* Cork lid lifts when opened */}
      <Block
        position={[0, 0.43 + clamp01(open) * 0.22, -clamp01(open) * 0.1]}
        rotation={[clamp01(open) * 0.7, 0, 0]}
        size={[0.2, 0.08, 0.2]}
        color="#8a5d38"
      />
      {hasPip ? (
        <>
          <Block
            position={[0, 0.22 + bob, 0]}
            size={[0.09, 0.09, 0.09]}
            color="#fff078"
            emissive="#ffd633"
            emissiveIntensity={2.4}
          />
          <Glow position={[0, 0.22 + bob, 0]} size={0.95} color="#ffe36e" opacity={0.65} />
          <pointLight position={[0, 0.22, 0]} color="#ffda55" intensity={2.4} distance={5} decay={2} />
        </>
      ) : null}
    </group>
  );
};

/** Free-flying Pip the golden firefly. */
export const PipFirefly: React.FC<{ position: Vec3; scale?: number; t?: number; pulse?: number }> = ({
  position,
  scale = 1,
  t = 0,
  pulse = 1,
}) => {
  const wing = Math.sin(t * 28) * 0.45;
  return (
    <group position={position} scale={scale}>
      <Block size={[0.11, 0.1, 0.14]} color="#fff275" emissive="#ffd429" emissiveIntensity={2.6 * pulse} />
      <Block position={[-0.09, 0.04, 0]} rotation={[0, 0, wing]} size={[0.12, 0.02, 0.08]} color="#ffffff" opacity={0.7} transparent />
      <Block position={[0.09, 0.04, 0]} rotation={[0, 0, -wing]} size={[0.12, 0.02, 0.08]} color="#ffffff" opacity={0.7} transparent />
      <Glow position={[0, 0, 0]} size={1.1 * pulse} color="#ffe466" opacity={0.72} />
      <pointLight color="#ffda55" intensity={2.6 * pulse} distance={6.5} decay={2} />
    </group>
  );
};

/** Fifty glowing fireflies flooding the cobble square. */
export const FireflySwarm: React.FC<{
  center?: Vec3;
  count?: number;
  spread?: number;
  t: number;
  seed?: number;
}> = ({ center = [0, 2.1, 0], count = 32, spread = 8.5, t, seed = 77 }) => {
  const bugs = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      rx: (rand() - 0.5) * spread,
      ry: (rand() - 0.35) * 2.4,
      rz: (rand() - 0.5) * spread,
      spd: 1.2 + rand() * 1.8,
      ph: rand() * Math.PI * 2,
    }));
  }, [count, spread, seed]);

  return (
    <group position={center}>
      {bugs.map((b, i) => {
        const x = b.rx + Math.sin(t * b.spd + b.ph) * 0.7;
        const y = b.ry + Math.cos(t * b.spd * 1.3 + b.ph) * 0.45;
        const z = b.rz + Math.cos(t * b.spd * 0.9 + b.ph) * 0.7;
        return (
          <group key={i} position={[x, y, z]}>
            <Block size={[0.09, 0.09, 0.09]} color="#fff582" emissive="#ffd22b" emissiveIntensity={2.5} />
            <Glow position={[0, 0, 0]} size={0.72} color="#ffe56e" opacity={0.55} />
          </group>
        );
      })}
      <pointLight color="#ffe066" intensity={6.5} distance={18} decay={1.6} />
    </group>
  );
};

/** Living shadow creature crawling off the trees. */
export const ShadowCreature: React.FC<{
  position: Vec3;
  rotationY?: number;
  scale?: number;
  t?: number;
}> = ({ position, rotationY = 0, scale = 1, t = 0 }) => {
  const sway = Math.sin(t * 3.8 + position[0]) * 0.08;
  const reach = 0.7 + Math.sin(t * 4.5 + position[2]) * 0.22;
  return (
    <group position={position} rotation={[0, rotationY, sway]} scale={scale}>
      <Block position={[0, 1.25, 0]} size={[0.62, 1.55, 0.42]} color="#0d0c14" />
      <Block position={[0, 2.28, 0]} size={[0.56, 0.56, 0.56]} color="#0a0910" />
      {/* Glowing violet-red eyes */}
      <Block position={[-0.12, 2.3, 0.29]} size={[0.1, 0.06, 0.03]} color="#ff3b6b" emissive="#ff2a5c" emissiveIntensity={2.2} />
      <Block position={[0.12, 2.3, 0.29]} size={[0.1, 0.06, 0.03]} color="#ff3b6b" emissive="#ff2a5c" emissiveIntensity={2.2} />
      {/* Long reaching shadow arms */}
      <Block position={[-0.46, 1.62, 0.35]} rotation={[-reach, 0, 0.14]} size={[0.18, 1.15, 0.18]} color="#100e1a" />
      <Block position={[0.46, 1.62, 0.35]} rotation={[-reach, 0, -0.14]} size={[0.18, 1.15, 0.18]} color="#100e1a" />
      <Glow position={[0, 1.4, 0]} size={2.0} color="#28123a" opacity={0.38} />
    </group>
  );
};

/** Giant mountain of black coal behind Chief Flint's shop. */
export const CoalMountain: React.FC<{ position?: Vec3 }> = ({ position = [4.8, 0, -6.5] }) => (
  <group position={position}>
    <Block position={[0, 0.5, 0]} size={[4.2, 1.0, 3.6]} color="#1c1c20" />
    <Block position={[0.1, 1.45, -0.1]} size={[3.1, 0.95, 2.7]} color="#232328" />
    <Block position={[-0.1, 2.35, 0]} size={[2.0, 0.9, 1.8]} color="#1a1a1f" />
    <Block position={[0, 3.1, 0]} size={[1.05, 0.7, 1.0]} color="#26262c" />
  </group>
);

/** Howling windstorm streaks flying across the street. */
export const WindStreaks: React.FC<{ t: number; center?: Vec3 }> = ({ t, center = [0, 2.0, 0] }) => (
  <group position={center}>
    {[-3.2, -1.6, 0, 1.8, 3.4].map((z, i) => {
      const x = ((t * 14 + i * 3.1) % 18) - 9;
      return (
        <Block
          key={i}
          position={[x, (i % 3) * 0.75 - 0.5, z]}
          size={[2.4, 0.05, 0.05]}
          color="#cce6ff"
          opacity={0.48}
          transparent
        />
      );
    })}
  </group>
);

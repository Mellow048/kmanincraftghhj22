import type React from "react";
import { Block, MinecraftAvatar, cam } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import timingJson from "./timing.json";

/**
 * This film's cast, places and props.
 *
 * ONE SET, TWO CLOCKS. The house door is at z = 0. In front of it (z > 0) is the street, and it is night;
 * behind it (z < 0) is the house, and the garden is daylight. That contrast is the whole film: a man facing the
 * dark side for six years, with the sun on his back.
 */

export const timing = timingJson as unknown as Timing;

/** The doorway. Everything else is placed from these numbers. */
export const DOOR = {
  /** Middle of the gap, on the floor. */
  at: [0, 0, 0] as Vec3,
  /** Half-width of the gap. */
  half: 0.65,
  /** Height of the top of the gap. */
  head: 2.25,
};

/** Where the two of them stand. */
export const DAD: Vec3 = [0, 0, -0.42];
export const ME: Vec3 = [0, 0, -1.7];

/** Garden furniture. */
export const GARDEN = {
  table: [1.5, 0, -7.4] as Vec3,
  chairA: [0.55, 0, -7.4] as Vec3,
  chairB: [2.45, 0, -7.4] as Vec3,
  pond: [-3.3, 0, -7.6] as Vec3,
  tree: [4.4, 0, -9.2] as Vec3,
};

type A2 = Partial<MinecraftAvatarProps>;

/** Dad: grown-up, blue work shirt, beard, and a face that has not turned round in six years. */
export const Dad: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={1.06}
    outfit="tee"
    skin="#e0b184"
    hair="#1a1417"
    face="bearded"
    colors={{ torso: "#2c4f96", arms: "#2c4f96", legs: "#565f6e" }}
    blink
    {...p}
  />
);

/** Me: sixteen, orange hoodie, a head taller than he was in year one. */
export const Me: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={1.0}
    outfit="hoodie"
    skin="#dba47c"
    hair="#3a2415"
    face="brave"
    colors={{ torso: "#ff7a1a", arms: "#ff7a1a", legs: "#2b2f6a" }}
    blink
    {...p}
  />
);

/** The first zombie: green, curious, and stopped by a rule it cannot argue with. */
export const Zombie: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={1.04}
    outfit="tee"
    skin="#5c8f4a"
    hair="#2a3a22"
    face="blank"
    colors={{ torso: "#2f8f8a", arms: "#5c8f4a", legs: "#3a3a5c" }}
    {...p}
  />
);

/** The one thing in his inventory. */
export const Sword: React.FC<{ position: Vec3; rotationY?: number; hit?: boolean }> = ({
  position,
  rotationY = 0,
  hit = true,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* A wooden sword is a plank with a guard: it lies flat, so the length reads at a glance. */}
    <Block position={[0, 0.03, 0]} size={[0.09, 0.05, 0.86]} color="#8a5f34" />
    <Block position={[0, 0.03, -0.42]} size={[0.2, 0.06, 0.1]} color="#6a4425" />
    <Block position={[0, 0.03, -0.52]} size={[0.1, 0.05, 0.16]} color="#4a3524" />
    {hit ? <Block position={[0, 0.06, 0.34]} size={[0.07, 0.02, 0.16]} color="#d8c9a0" castShadow={false} /> : null}
  </group>
);

/** A garden chair: low back, warm wood. */
export const Chair: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.42, 0]} size={[0.7, 0.1, 0.7]} color="#8a5f34" />
    <Block position={[0, 0.75, -0.34]} size={[0.7, 0.62, 0.09]} color="#9a6b3c" />
    {[[-0.28, -0.28], [0.28, -0.28], [-0.28, 0.28], [0.28, 0.28]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.2, z]} size={[0.09, 0.4, 0.09]} color="#5e3f22" />
    ))}
  </group>
);

/** A low table, and what is on it. */
export const Table: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 0.52, 0]} size={[0.95, 0.09, 0.95]} color="#9a6b3c" />
    {[[-0.36, -0.36], [0.36, -0.36], [-0.36, 0.36], [0.36, 0.36]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.26, z]} size={[0.08, 0.52, 0.08]} color="#5e3f22" />
    ))}
  </group>
);

/** An open chest, and its inside. `empty` is the point of the beat: there is nothing in it. */
export const Chest: React.FC<{ position: Vec3; rotationY?: number; open?: boolean }> = ({
  position,
  rotationY = 0,
  open = true,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.28, 0]} size={[0.9, 0.56, 0.66]} color="#8a5f34" />
    <Block position={[0, 0.57, 0]} size={[0.94, 0.06, 0.7]} color="#6a4425" />
    {open ? <Block position={[0, 0.72, -0.3]} size={[0.9, 0.5, 0.06]} color="#7a5330" castShadow={false} /> : null}
    {/* Purely black inside, so "empty" reads without a caption. */}
    <Block position={[0, 0.5, 0.02]} size={[0.76, 0.02, 0.5]} color="#20150c" castShadow={false} />
  </group>
);

/** A camera that keeps a standing person whole in a tall frame. */
export const fit = (o: Omit<Parameters<typeof cam.push>[0], "to"> & { to?: number }) => {
  const dist = Math.min(Math.max(o.dist * 1.2, 2.6), 6.2);
  return {
    ...o,
    on: [o.on[0], Math.min(o.on[1], 1.16), o.on[2]] as Vec3,
    dist,
    to: Math.max(o.to ?? dist * 0.9, 2.5),
    fov: Math.max(o.fov ?? 45, 46),
  };
};

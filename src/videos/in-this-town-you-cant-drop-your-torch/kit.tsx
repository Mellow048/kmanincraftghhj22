import type React from "react";
import { Block, ChatToast, FloatingNumber, Glow, MinecraftAvatar, Sign, Torch, Vox, cam, storyScene } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, hill, jolt, pop, ramp,
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  Player, Bits, Bubble, Smoke, SubscribeSign,
} from "../../../Topics/InThisTown";
export { Block, ChatToast, FloatingNumber, Glow, Sign, Torch, Vox, cam, storyScene };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  square: [0, 0, 2] as Vec3,
  room: [0, 0, 80] as Vec3,
};
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

type A = Partial<MinecraftAvatarProps>;

/** Kai — bright amber/teal hoodie so phones spot him instantly even in dark storm scenes. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="hoodie"
    skin="#e6b68c"
    hair="#2e1d12"
    hairLayer
    colors={{ torso: "#f59e0b", arms: "#d97706", legs: "#1e3a5f" }}
    shoes="#f0f0f0"
    blink
    {...p}
  />
);

/** Kai's Mom — warm berry/cream tunic. */
export const Mom: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1}
    outfit="hoodie"
    skin="#e4b38b"
    hair="#382114"
    hairLayer
    colors={{ torso: "#b84366", arms: "#9c3655", legs: "#2c3442" }}
    shoes="#3b2f28"
    blink
    {...p}
  />
);

/** Chief Flint — greedy coal baron in charcoal suit with a yellow mining helmet. */
export const ChiefFlint: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1.06}
    outfit="suit"
    skin="#ecc19e"
    hair="#1a1a1f"
    hairLayer
    colors={{ torso: "#2b2d36", arms: "#21232b", legs: "#181920" }}
    shoes="#141418"
    blink
    head={
      <group position={[0, 0.25, 0]}>
        <Block position={[0, 0.06, 0]} size={[0.62, 0.14, 0.62]} color="#eab308" />
        <Block position={[0, 0.18, 0]} size={[0.5, 0.18, 0.5]} color="#facc15" />
        <Block position={[0, 0.16, 0.26]} size={[0.16, 0.12, 0.06]} color="#fef08a" emissive="#fde047" emissiveIntensity={0.8} />
      </group>
    }
    {...p}
  />
);

/** Handheld wooden torch (lit with warm flame or blown out dead stick). */
export const HandTorch: React.FC<{ position?: Vec3; lit?: boolean; scale?: number }> = ({
  position = [0, 0, 0],
  lit = true,
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.2, 0]} size={[0.08, 0.42, 0.08]} color="#6b4928" />
    {lit ? (
      <>
        <Block position={[0, 0.44, 0]} size={[0.12, 0.14, 0.12]} color="#ff9922" emissive="#ff7700" emissiveIntensity={0.95} />
        <Glow position={[0, 0.48, 0]} size={0.85} color="#ffb84d" opacity={0.45} />
      </>
    ) : (
      <Block position={[0, 0.43, 0]} size={[0.09, 0.08, 0.09]} color="#2b2b30" />
    )}
  </group>
);

/** Glass jar holding Kai's glowing golden firefly Pip. */
export const FireflyJar: React.FC<{ position?: Vec3; scale?: number; empty?: boolean; t?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
  empty = false,
  t = 0,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.14, 0]} size={[0.22, 0.28, 0.22]} color="#cde8ff" opacity={0.45} transparent />
    <Block position={[0, 0.29, 0]} size={[0.18, 0.05, 0.18]} color="#8f673c" />
    {!empty && (
      <>
        <Block position={[Math.sin(t * 6) * 0.03, 0.15 + Math.cos(t * 5) * 0.03, 0]} size={[0.08, 0.08, 0.08]} color="#fff066" emissive="#ffe033" emissiveIntensity={1.2} />
        <Glow position={[0, 0.16, 0]} size={0.9} color="#ffe866" opacity={0.5} />
      </>
    )}
  </group>
);

/** Free-flying golden firefly Pip. */
export const PipFirefly: React.FC<{ position?: Vec3; scale?: number; t?: number }> = ({
  position = [0, 1.5, 0],
  scale = 1,
  t = 0,
}) => (
  <group position={[position[0] + Math.sin(t * 5) * 0.14, position[1] + Math.cos(t * 6) * 0.12, position[2]]} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.14, 0.14, 0.18]} color="#fff580" emissive="#ffe033" emissiveIntensity={1.3} />
    <Glow position={[0, 0, 0]} size={1.4} color="#ffe866" opacity={0.58} />
  </group>
);

/** Swarm of glowing golden fireflies flooding the square! */
export const FireflySwarm: React.FC<{ position?: Vec3; count?: number; t?: number }> = ({
  position = [0, 2.0, 1.0],
  count = 16,
  t = 0,
}) => (
  <group position={position}>
    {Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + t * 1.6;
      const r = 0.8 + (i % 4) * 0.65;
      const y = Math.sin(t * 4 + i * 1.3) * 0.85;
      return (
        <group key={i} position={[Math.cos(a) * r, y, Math.sin(a) * r * 0.6]}>
          <Block position={[0, 0, 0]} size={[0.1, 0.1, 0.1]} color="#fff580" emissive="#ffe033" emissiveIntensity={1.2} castShadow={false} />
          <Glow position={[0, 0, 0]} size={0.75} color="#ffe866" opacity={0.42} />
        </group>
      );
    })}
  </group>
);

/** Tall spooky living shadow creature with glowing purple eyes. */
export const ShadowCreature: React.FC<{ position?: Vec3; rotationY?: number; t?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  t = 0,
}) => (
  <group position={[position[0], position[1] + Math.sin(t * 3.5) * 0.1, position[2]]} rotation={[0, rotationY, 0]}>
    <Block position={[0, 1.2, 0]} size={[0.72, 2.4, 0.56]} color="#0d0b14" />
    <Block position={[-0.48, 1.35, 0.15]} size={[0.22, 1.3, 0.22]} color="#0d0b14" />
    <Block position={[0.48, 1.35, 0.15]} size={[0.22, 1.3, 0.22]} color="#0d0b14" />
    <Block position={[-0.14, 2.05, 0.29]} size={[0.12, 0.08, 0.03]} color="#d946ef" emissive="#d946ef" emissiveIntensity={1.4} castShadow={false} />
    <Block position={[0.14, 2.05, 0.29]} size={[0.12, 0.08, 0.03]} color="#d946ef" emissive="#d946ef" emissiveIntensity={1.4} castShadow={false} />
    <Glow position={[0, 1.8, 0.25]} size={1.8} color="#9333ea" opacity={0.28} />
  </group>
);

/** Giant black coal mountain for Chief Flint's coal empire. */
export const CoalMountain: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Block position={[0, 0.35, 0]} size={[2.4, 0.7, 2.2]} color="#1b1c22" />
    <Block position={[0, 0.95, 0]} size={[1.5, 0.55, 1.4]} color="#252730" />
    <Block position={[0, 1.4, -0.35]} size={[0.9, 0.45, 0.7]} color="#2e303b" />
  </group>
);

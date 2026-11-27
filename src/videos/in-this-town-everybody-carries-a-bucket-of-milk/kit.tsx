import type React from "react";
import { Block, ChatToast, FloatingNumber, Glow, MinecraftAvatar, Sign, cam, storyScene } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, hill, jolt, pop, ramp,
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  Player, Bits, Bubble, Smoke, SubscribeSign,
} from "../../../Topics/InThisTown";
export { Block, ChatToast, FloatingNumber, Glow, Sign, cam, storyScene };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  square: [0, 0, 2] as Vec3,
  stall: [4.5, 0, -2.2] as Vec3,
  home: [-4.5, 0, -2.5] as Vec3,
  room: [0, 0, 80] as Vec3,
};
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

type A = Partial<MinecraftAvatarProps>;

/** Toby — loud bright teal/orange shirt so phones spot him instantly in every crowd. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#e6b68c"
    hair="#472916"
    hairLayer
    colors={{ torso: "#e87e28", arms: "skin", legs: "#2c4c7a" }}
    shoes="#f0f0f0"
    blink
    {...p}
  />
);

/** Toby's Dad — warm forest-green tunic. */
export const Dad: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1}
    outfit="hoodie"
    skin="#dfac82"
    hair="#3b2212"
    hairLayer
    colors={{ torso: "#2e7a48", arms: "#27693d", legs: "#2c3340" }}
    shoes="#40342a"
    blink
    {...p}
  />
);

/** Baron Cream — greedy town Milk Baron in white/emerald suit & tall top hat. */
export const BaronCream: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1.06}
    outfit="suit"
    skin="#f0c8a8"
    hair="#1c1c24"
    hairLayer
    colors={{ torso: "#f2efe6", arms: "#e6e0d2", legs: "#1d5c38" }}
    shoes="#161820"
    blink
    head={
      <group position={[0, 0.25, 0]}>
        <Block position={[0, 0.03, 0]} size={[0.66, 0.05, 0.66]} color="#161820" />
        <Block position={[0, 0.2, 0]} size={[0.46, 0.32, 0.46]} color="#161820" />
        <Block position={[0, 0.09, 0]} size={[0.48, 0.06, 0.48]} color="#2ee06e" />
      </group>
    }
    {...p}
  />
);

/** Crisp Minecraft Iron Bucket brimming with white milk (can be held in hand or placed on ground/desks). */
export const MilkBucket: React.FC<{ position?: Vec3; scale?: number; empty?: boolean }> = ({
  position = [0, 0, 0],
  scale = 1,
  empty = false,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.14, 0]} size={[0.24, 0.26, 0.24]} color="#9ea6b2" metalness={0.35} roughness={0.4} />
    <Block position={[0, 0.26, 0]} size={[0.2, 0.04, 0.2]} color={empty ? "#262b33" : "#ffffff"} emissive={empty ? "#000000" : "#ffffff"} emissiveIntensity={empty ? 0 : 0.2} castShadow={false} />
    <Block position={[0, 0.31, 0]} size={[0.28, 0.03, 0.03]} color="#c4ccd6" />
  </group>
);

/** Moo — Toby's adorable blocky spotted baby cow with Dad's red collar. */
export const BabyCow: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; t?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 0.72,
  t = 0,
}) => {
  const bob = Math.sin(t * 5) * 0.04;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Body + black/white spots */}
      <Block position={[0, 0.56, 0]} size={[0.56, 0.46, 0.88]} color="#f5f3ee" />
      <Block position={[0.18, 0.62, 0.1]} size={[0.24, 0.24, 0.32]} color="#2a2420" />
      <Block position={[-0.18, 0.58, -0.18]} size={[0.24, 0.26, 0.3]} color="#2a2420" />
      {/* Dad's red collar */}
      <Block position={[0, 0.62, 0.43]} size={[0.42, 0.1, 0.08]} color="#d93232" />
      {/* Cute blocky cow head */}
      <group position={[0, 0.74 + bob, 0.54]} rotation={[Math.sin(t * 3) * 0.08, 0, 0]}>
        <Block position={[0, 0, 0]} size={[0.44, 0.42, 0.4]} color="#f5f3ee" />
        <Block position={[0, -0.1, 0.21]} size={[0.32, 0.18, 0.06]} color="#f2b8c0" />
        <Block position={[-0.12, 0.06, 0.21]} size={[0.07, 0.07, 0.03]} color="#16161a" castShadow={false} />
        <Block position={[0.12, 0.06, 0.21]} size={[0.07, 0.07, 0.03]} color="#16161a" castShadow={false} />
        <Block position={[-0.22, 0.2, -0.02]} size={[0.08, 0.14, 0.08]} color="#cfc6b4" />
        <Block position={[0.22, 0.2, -0.02]} size={[0.08, 0.14, 0.08]} color="#cfc6b4" />
      </group>
      {/* 4 little legs */}
      {[[-0.18, 0.28], [0.18, 0.28], [-0.18, -0.28], [0.18, -0.28]].map(([x, z], i) => (
        <Block key={i} position={[x!, 0.18, z!]} size={[0.16, 0.36, 0.16]} color="#2a2420" />
      ))}
    </group>
  );
};

/** Hovering Minecraft Witch with pointed purple hat and glowing purple splash potion. */
export const Witch: React.FC<{ position?: Vec3; rotationY?: number; t?: number }> = ({
  position = [0, 3.4, 0],
  rotationY = 0,
  t = 0,
}) => (
  <group position={[position[0], position[1] + Math.sin(t * 3.2) * 0.22, position[2]]} rotation={[0, rotationY, 0]}>
    <MinecraftAvatar
      outfit="gown"
      skin="#b6c4a4"
      hair="#1c1924"
      colors={{ torso: "#482669", arms: "#3c1f59", legs: "#271738" }}
      animation="reach"
      face="angry"
      time={t}
      head={
        <group position={[0, 0.26, 0]}>
          <Block position={[0, 0.02, 0]} size={[0.72, 0.06, 0.72]} color="#251a33" />
          <Block position={[0, 0.22, 0]} size={[0.42, 0.36, 0.42]} color="#251a33" />
          <Block position={[0, 0.09, 0]} size={[0.44, 0.07, 0.44]} color="#4be06b" />
          <Block position={[0.06, 0.48, -0.06]} size={[0.22, 0.24, 0.22]} color="#251a33" />
        </group>
      }
    >
      <Block position={[0, -0.05, 0.14]} size={[0.18, 0.22, 0.18]} color="#b84cff" emissive="#b84cff" emissiveIntensity={0.75} />
    </MinecraftAvatar>
    <Glow position={[0, 1.2, 0.3]} size={2.2} color="#b84cff" opacity={0.32} />
  </group>
);

/** Glowing emerald pyramid throne for Baron Cream. */
export const EmeraldThrone: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Block position={[0, 0.3, 0]} size={[2.2, 0.6, 2.2]} color="#26b858" emissive="#1c8c42" emissiveIntensity={0.22} />
    <Block position={[0, 0.85, 0]} size={[1.4, 0.5, 1.4]} color="#2ee06e" emissive="#22a852" emissiveIntensity={0.25} />
    <Block position={[0, 1.35, -0.45]} size={[1.1, 0.7, 0.25]} color="#3bf07d" />
  </group>
);

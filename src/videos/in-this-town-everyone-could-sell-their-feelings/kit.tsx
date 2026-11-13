import type React from "react";
import { MinecraftAvatar, Block, Vox, Glow, useFilmTime, wobble } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, hill, jolt, pop, ramp,
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  Player, Pumpkin,
  BedBox, Bits, Blaze, Bubble, FireLight, Hole, Smoke, SmokeBank, SubscribeSign, Wisps,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

export const PLACE = {
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  stall: [6.4, 0, -2.6] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  porch: [-10, 0.5, -4.1] as Vec3,
  porchFoot: [-10, 0, -2.5] as Vec3,
  home: [10, 0, -5] as Vec3,
  room: [0, 0, 80] as Vec3,
  // — this film's —
  shop: [-10, 0, -5] as Vec3, // witch's shop hut
  shopDoor: [-10, 0, -2.2] as Vec3,
  shopInterior: [0, 0, 60] as Vec3, // isolated shop interior zone origin
  greedy: [8.5, 0, -0.8] as Vec3,
  cartStart: [13, 0, 3.8] as Vec3,
  cartPathEnd: [-4, 0, 3.8] as Vec3,
  standFront: [6.4, 0, -1.2] as Vec3,
};
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];
export const shopAt = (x: number, y: number, z: number): Vec3 => [PLACE.shopInterior[0] + x, PLACE.shopInterior[1] + y, PLACE.shopInterior[2] + z];

// ----------------------------------------------------------------------------- the teller

type A = Partial<MinecraftAvatarProps>;

export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#e8a21c", arms: "#e8a21c", legs: "#3b3fa0" }}
    blink
    {...p}
  />
);

// ----------------------------------------------------------------------------- film-specific things

/** The humming helmet: a chair and a copper helmet with a faint glow. Position is centre of chair seat. */
export const HelmetChair: React.FC<{ position: Vec3; hum?: number }> = ({ position, hum = 0 }) => {
  const t = useFilmTime();
  const h = 0.08 + Math.sin(t * 6 + hum) * 0.015;
  return (
    <group position={position}>
      {/* Chair */}
      <Vox kind="darkPlanks" position={[0, 0.25, 0]} size={[1.1, 0.5, 1.0]} />
      <Vox kind="planks" position={[0, 0.65, -0.45]} size={[1.1, 0.9, 0.15]} />
      {/* Armrests */}
      <Vox kind="darkPlanks" position={[-0.45, 0.6, 0.05]} size={[0.14, 0.35, 0.9]} />
      <Vox kind="darkPlanks" position={[0.45, 0.6, 0.05]} size={[0.14, 0.35, 0.9]} />
      {/* Helmet hovering slightly over seat */}
      <group position={[0, 1.05 + h, 0]}>
        <Vox kind="stone" position={[0, 0.15, 0]} size={[0.7, 0.5, 0.72]} tint="#a8b8c8" />
        <Vox kind="cobble" position={[0, -0.12, 0]} size={[0.82, 0.18, 0.84]} tint="#8fa0b8" />
        {/* Visor slit */}
        <Block position={[0, 0.08, 0.38]} size={[0.42, 0.08, 0.02]} color="#1a1a2a" />
        {/* Wires humming */}
        <Block position={[0.4, 0.08, 0]} size={[0.04, 0.3, 0.04]} color="#e8c44a" emissive="#e8c44a" emissiveIntensity={0.5 + Math.sin(t * 9) * 0.3} />
        <Block position={[-0.4, 0.06, 0]} size={[0.04, 0.26, 0.04]} color="#e8c44a" emissive="#e8c44a" emissiveIntensity={0.5 + Math.sin(t * 9 + 1) * 0.3} />
        <Glow position={[0, 0.18, 0]} size={0.55} color="#9ec8ff" opacity={0.25 + Math.sin(t * 4) * 0.08} />
      </group>
      {/* Cable to floor */}
      <Block position={[0.18, 0.35, -0.18]} size={[0.05, 0.7, 0.05]} color="#2a2a3a" />
    </group>
  );
};

/** A glass bottle with colored feeling. Position is bottom of bottle. */
export const Bottle: React.FC<{ position: Vec3; color: string; label?: string; glow?: boolean }> = ({ position, color, glow = true }) => (
  <group position={position}>
    <Block position={[0, 0.18, 0]} size={[0.16, 0.32, 0.16]} color={color} emissive={color} emissiveIntensity={glow ? 0.45 : 0.15} />
    <Block position={[0, 0.36, 0]} size={[0.18, 0.04, 0.18]} color="#e8e8ea" opacity={0.7} transparent />
    <Block position={[0, 0.42, 0]} size={[0.07, 0.08, 0.07]} color="#6b4a2a" /> {/* cork */}
    {glow ? <Glow position={[0, 0.22, 0]} size={0.22} color={color} opacity={0.35} /> : null}
  </group>
);

/** Shelf with many empty and few filled bottles — for shop interior walls */
export const Shelf: React.FC<{ position: Vec3; rotationY?: number; bottles?: Array<{ x: number; color: string }> }> = ({ position, rotationY = 0, bottles = [] }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, 0.9, 0]} size={[2.8, 0.08, 0.6]} />
    <Vox kind="darkPlanks" position={[0, 1.6, 0]} size={[2.8, 0.08, 0.6]} />
    <Vox kind="planks" position={[-1.32, 0.95, 0]} size={[0.08, 1.6, 0.6]} />
    <Vox kind="planks" position={[1.32, 0.95, 0]} size={[0.08, 1.6, 0.6]} />
    {/* empty glass silhouettes */}
    {Array.from({ length: 6 }, (_, i) => (
      <Block key={"e" + i} position={[-1.0 + i * 0.38, 0.45, 0.12]} size={[0.06, 0.12, 0.06]} color="#d8e8f8" opacity={0.35} transparent />
    ))}
    {bottles.map((b, i) => (
      <Bottle key={i} position={[b.x, 0.98, 0.12]} color={b.color} />
    ))}
  </group>
);

/** Lemonade stall: market stall with lemons and pitcher */
export const LemonadeStall: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    {/* Stall base: use planks */}
    <Vox kind="planks" position={[0, 0.5, 0]} size={[2.6, 0.08, 1.4]} />
    <Vox kind="log" position={[-1.15, 0.85, 0]} size={[0.18, 0.8, 0.18]} />
    <Vox kind="log" position={[1.15, 0.85, 0]} size={[0.18, 0.8, 0.18]} />
    <Vox kind="darkPlanks" position={[0, 1.2, 0]} size={[2.9, 0.1, 1.6]} />
    {/* Sign */}
    <Block position={[0, 1.55, 0]} size={[1.2, 0.35, 0.05]} color="#fff8c8" />
    {/* Pitcher */}
    <Block position={[-0.55, 0.72, 0]} size={[0.22, 0.28, 0.22]} color="#ffd44a" emissive="#ffd44a" emissiveIntensity={0.2} />
    <Block position={[-0.6, 0.88, 0]} size={[0.04, 0.08, 0.04]} color="#ffd44a" />
    {/* Lemons */}
    <Block position={[0.2, 0.68, 0.08]} size={[0.14, 0.14, 0.14]} color="#f2d23a" />
    <Block position={[0.45, 0.68, -0.05]} size={[0.14, 0.14, 0.14]} color="#f2d23a" />
    <Block position={[0.7, 0.68, 0.08]} size={[0.14, 0.14, 0.14]} color="#e8c44a" />
    {/* Cups */}
    <Block position={[-0.15, 0.66, 0.05]} size={[0.1, 0.12, 0.1]} color="#ffffff" />
    <Block position={[0.0, 0.66, -0.08]} size={[0.1, 0.12, 0.1]} color="#ffffff" />
  </group>
);

/** Coins pile for greedy man */
export const Coins: React.FC<{ position: Vec3; amount?: number }> = ({ position, amount = 12 }) => (
  <group position={position}>
    {Array.from({ length: amount }, (_, i) => {
      const r = (i * 0.7) % 1;
      return (
        <Block
          key={i}
          position={[(r - 0.5) * 0.55, 0.03 + Math.floor(i / 3) * 0.04, ((i * 1.3) % 1 - 0.5) * 0.35]}
          size={[0.14, 0.02, 0.14]}
          color="#e8c44a"
          metalness={0.6}
          roughness={0.3}
        />
      );
    })}
    <Block position={[0, 0.01, 0]} size={[0.7, 0.02, 0.5]} color="#6b4a2a" />
  </group>
);

/** Wooden cart rolling behind stand */
export const Cart: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, 0.45, 0]} size={[1.4, 0.45, 0.9]} />
    <Vox kind="planks" position={[0, 0.7, 0]} size={[1.2, 0.06, 0.7]} tint="#c8a050" />
    {/* Wheels */}
    <Block position={[-0.45, 0.18, 0.42]} size={[0.22, 0.22, 0.04]} color="#2a2018" />
    <Block position={[0.45, 0.18, 0.42]} size={[0.22, 0.22, 0.04]} color="#2a2018" />
    <Block position={[-0.45, 0.18, -0.42]} size={[0.22, 0.22, 0.04]} color="#2a2018" />
    <Block position={[0.45, 0.18, -0.42]} size={[0.22, 0.22, 0.04]} color="#2a2018" />
    {/* Hay crate */}
    <Vox kind="hay" position={[0, 0.95, 0]} size={[0.7, 0.35, 0.55]} />
  </group>
);

/** Fear ghost: small yellow you — same proportions as Hero but half size, glowing */
export const FearGhost: React.FC<{ position: Vec3; rotationY?: number; shake?: number }> = ({ position, rotationY = 0, shake = 0 }) => {
  const t = useFilmTime();
  const w = shake ? wobble(t, shake) * 0.04 : 0;
  return (
    <group position={position} rotation={[0, rotationY + w, 0]}>
      <MinecraftAvatar
        scale={0.42}
        outfit="tee"
        skin="#f5e6a2"
        hair="#f0c840"
        colors={{ torso: "#f5e06b", arms: "#f5e06b", legs: "#f0c840" }}
        blink
        face="fear"
        animation="idle"
      />
      <Glow position={[0, 0.65, 0]} size={0.45} color="#ffe86b" opacity={0.32} />
      <Glow position={[0, 0.65, 0]} size={0.7} color="#fff2a0" opacity={0.12} />
    </group>
  );
};

/** Soup spill decal */
export const SoupSpill: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 0.012, 0]} size={[0.45, 0.01, 0.35]} color="#c86a2a" />
    <Block position={[0.08, 0.013, 0.05]} size={[0.2, 0.01, 0.15]} color="#d87a3a" />
  </group>
);

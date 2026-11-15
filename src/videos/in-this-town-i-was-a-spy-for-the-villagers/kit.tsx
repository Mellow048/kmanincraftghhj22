import type React from "react";
import { Block, MinecraftAvatar, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import {
  ADULT,
  Bell,
  Bits,
  CHILD,
  DarkOakForest,
  DARK_OAKS,
  DarkOak,
  Hut,
  LampPost,
  Mansion,
  MansionHall,
  PILLAGER,
  Pillager,
  ROBE,
  Stall,
  SubscribeSign,
  Villager,
  EAST,
  NORTH,
  SOUTH,
  WEST,
  KID,
  ease,
  jolt,
  pop,
  ramp,
  wordClock,
  pillagerFace,
} from "../../../Topics/InThisTown";
import type { PillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  ADULT, Bell, Bits, CHILD, DarkOakForest, DARK_OAKS, DarkOak,
  Hut, LampPost, Mansion, MansionHall, PILLAGER, Pillager, ROBE, Stall,
  SubscribeSign, Villager, pillagerFace, EAST, NORTH, SOUTH, WEST, KID, ease, jolt, pop, ramp,
};
export type { PillagerProps };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  bell: [0, 0, -7] as Vec3,
  market: [0, 0, 3] as Vec3,
  camp: [70, 0, 0] as Vec3,
  campDoor: [70, 0, -20] as Vec3,
  target: [70, 0, 3] as Vec3,
  trailMid: [35, 0, 0] as Vec3,
};

/** A charcoal cloth hood and a square, grey pillager mask; the nose keeps the disguise readable in close-up. */
export const PillagerMask: React.FC = () => (
  <group>
    <Block position={[0, 0.19, -0.01]} size={[0.53, 0.16, 0.48]} color="#29262a" />
    <Block position={[0, -0.045, 0.242]} size={[0.39, 0.18, 0.045]} color={PILLAGER.skin} />
    <Block position={[0, 0.055, 0.263]} size={[0.38, 0.045, 0.04]} color="#303038" />
    <Block position={[0, -0.055, 0.285]} size={[0.09, 0.11, 0.09]} color="#737e86" />
    <Block position={[-0.2, -0.035, 0.2]} size={[0.06, 0.12, 0.16]} color="#39343a" />
    <Block position={[0.2, -0.035, 0.2]} size={[0.06, 0.12, 0.16]} color="#39343a" />
    <Block position={[-0.1, 0.075, 0.289]} size={[0.035, 0.025, 0.012]} color="#dfe4e5" castShadow={false} />
    <Block position={[0.1, 0.075, 0.289]} size={[0.035, 0.025, 0.012]} color="#dfe4e5" castShadow={false} />
  </group>
);

type HeroProps = Partial<MinecraftAvatarProps> & { masked?: boolean };

/** The villager spy's stolen pillager colours, with the user's requested mask disguise. */
export const Hero: React.FC<HeroProps> = ({ masked = true, head, ...props }) => (
  <MinecraftAvatar
    scale={0.8}
    outfit="tee"
    skin="#dba47c"
    hair="#33251c"
    colors={{ torso: "#40343a", arms: "#4a3a30", legs: "#2f5350" }}
    face="uneasy"
    blink
    head={masked ? <PillagerMask /> : head}
    {...props}
  />
);

/** A block-built ram with four turning wheels and a heavy iron striking head. It faces +Z. */
export const BatteringRam: React.FC<{
  position: Vec3;
  wheelSpin?: number;
  bob?: number;
  yaw?: number;
  lean?: number;
  tilt?: number;
}> = ({ position, wheelSpin = 0, bob = 0, yaw = 0, lean = 0, tilt = 0 }) => (
  <group position={[position[0], position[1] + bob, position[2]]} rotation={[lean, yaw, tilt]}>
    <Vox kind="planks" position={[0, 0.92, 0]} size={[2.15, 0.28, 3.5]} />
    <Vox kind="log" position={[0, 1.54, 0.62]} size={[0.48, 0.48, 4.6]} />
    <Vox kind="log" position={[0, 1.54, 2.55]} size={[0.78, 0.78, 0.44]} tint="#503821" />
    <Vox kind="stone" position={[0, 1.54, 2.84]} size={[0.58, 0.58, 0.18]} />
    <Vox kind="darkPlanks" position={[0, 1.93, -0.2]} size={[1.85, 0.16, 2.8]} />
    {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => (
      <group key={`${sx}:${sz}`} position={[sx * 1.04, 0.56, sz * 1.15]} rotation={[wheelSpin, 0, 0]}>
        <Block size={[0.18, 0.82, 0.82]} color="#392a20" />
        <Block position={[0, 0.39, 0]} size={[0.21, 0.08, 0.92]} color="#80592f" />
        <Block position={[0, -0.39, 0]} size={[0.21, 0.08, 0.92]} color="#80592f" />
        <Block position={[0, 0, 0.39]} size={[0.21, 0.82, 0.08]} color="#80592f" />
        <Block position={[0, 0, -0.39]} size={[0.21, 0.82, 0.08]} color="#80592f" />
      </group>
    ))) }
    {[-1, 1].map((s) => <Vox key={s} kind="log" position={[s * 1.15, 0.54, -1.8]} size={[0.14, 0.14, 1.15]} />)}
  </group>
);

/** A wooden practice copy of the village bell tower. `fall` tips it on impact. */
export const TargetTower: React.FC<{ position: Vec3; fall?: number; scale?: number }> = ({ position, fall = 0, scale = 1 }) => (
  <group position={position} rotation={[0, 0, -fall * 1.1]} scale={scale}>
    <Vox kind="planks" position={[0, 0.35, 0]} size={[2.3, 0.7, 2.0]} />
    {[-0.78, 0.78].flatMap((x) => [-0.62, 0.62].map((z) => (
      <Vox key={`${x}:${z}`} kind="log" position={[x, 1.8, z]} size={[0.22, 3.0, 0.22]} />
    )))}
    <Vox kind="darkPlanks" position={[0, 3.25, 0]} size={[2.55, 0.28, 2.25]} />
    <Vox kind="planks" position={[0, 3.52, 0]} size={[1.85, 0.28, 1.75]} />
    <Block position={[0, 2.75, 0.82]} size={[0.54, 0.62, 0.18]} color="#e0b83a" metalness={0.2} />
    <Block position={[0, 2.42, 0.85]} size={[0.7, 0.1, 0.2]} color="#c99f32" />
  </group>
);

/** Story-specific market cart: planked bed, handles and chunky square wheels. */
export const MarketCart: React.FC<{ position: Vec3; rotationY?: number; wobble?: number; load?: boolean }> = ({
  position,
  rotationY = 0,
  wobble = 0,
  load = false,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.73, 0]} size={[1.4, 0.18, 1.9]} />
    {[-1, 1].map((s) => <Vox key={`side${s}`} kind="planks" position={[s * 0.64, 1.08, 0]} size={[0.12, 0.56, 1.82]} />)}
    <Vox kind="planks" position={[0, 1.08, -0.84]} size={[1.35, 0.56, 0.12]} />
    {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => (
      <group key={`${sx}:${sz}`} position={[sx * 0.78, 0.44, sz * 0.62]} rotation={[0, 0, wobble]}>
        <Block size={[0.14, 0.74, 0.74]} color="#4b3524" />
        <Block position={[0, 0.34, 0]} size={[0.18, 0.08, 0.82]} color="#886238" />
        <Block position={[0, -0.34, 0]} size={[0.18, 0.08, 0.82]} color="#886238" />
      </group>
    ))) }
    {[-1, 1].map((s) => <Vox key={`handle${s}`} kind="log" position={[s * 0.4, 0.54, 1.44]} size={[0.1, 0.1, 1.1]} />)}
    {load ? <Vox kind="hay" position={[0, 1.32, 0]} size={[0.75, 0.45, 0.75]} /> : null}
  </group>
);

/** A banded block barrel, built for the market zigzag. */
export const Barrel: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.48, 0]} size={[0.72, 0.92, 0.72]} />
    {[-0.23, 0.22].map((y) => <Block key={y} position={[0, y + 0.48, 0.37]} size={[0.76, 0.1, 0.05]} color="#483329" />)}
    <Block position={[0, 0.95, 0]} size={[0.76, 0.08, 0.76]} color="#6a4930" />
  </group>
);

/** Several hay bales that can turn into a soft landing. */
export const HayPile: React.FC<{ position: Vec3; topple?: number }> = ({ position, topple = 0 }) => (
  <group position={position} rotation={[0, 0, topple]}>
    <Vox kind="hay" position={[-0.42, 0.4, 0]} size={[0.82, 0.82, 0.82]} />
    <Vox kind="hay" position={[0.42, 0.4, 0]} size={[0.82, 0.82, 0.82]} />
    <Vox kind="hay" position={[0, 1.18, 0]} size={[0.82, 0.82, 0.82]} />
  </group>
);

/** A timber bell shelter that frames the pack's bell in a tall phone shot. */
export const BellTower: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Bell position={[0, 0, 0]} />
    {[-1, 1].flatMap((x) => [-1, 1].map((z) => (
      <Vox key={`${x}:${z}`} kind="log" position={[x * 1.55, 2.55, z * 0.94]} size={[0.2, 4.6, 0.2]} />
    )))}
    <Vox kind="darkPlanks" position={[0, 4.85, 0]} size={[3.5, 0.3, 2.3]} />
    <Vox kind="darkPlanks" tint="#8a3b2a" position={[0, 5.18, 0]} size={[2.7, 0.34, 2.1]} />
    <Block position={[0, 5.46, 0]} size={[1.55, 0.24, 1.4]} color="#8a3b2a" />
  </group>
);

/** Wooden board with a block-sun icon, used as the pillagers' dawn signal. */
export const SunMarker: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Vox kind="darkPlanks" position={[0, 1.25, 0]} size={[1.65, 1.65, 0.14]} />
    <Block position={[0, 1.34, 0.1]} size={[0.52, 0.52, 0.06]} color="#f3c64e" emissive="#f3a83d" emissiveIntensity={0.18} />
    {[-1, 1].map((s) => <Block key={s} position={[s * 0.43, 1.34, 0.1]} size={[0.16, 0.16, 0.06]} color="#f3c64e" />)}
    <Block position={[0, 1.76, 0.1]} size={[0.16, 0.16, 0.06]} color="#f3c64e" />
    <Block position={[0, 0.91, 0.1]} size={[0.16, 0.16, 0.06]} color="#f3c64e" />
    <Vox kind="log" position={[0, 0.18, 0]} size={[0.14, 1.15, 0.14]} />
  </group>
);

export const CLOSET = [70.5, 1.1, -15] as Vec3;
export const POST = [0, 0, 0] as Vec3;
export const TARGET = PLACE.target;

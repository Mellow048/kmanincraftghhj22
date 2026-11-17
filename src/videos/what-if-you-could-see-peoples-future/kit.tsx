import type React from "react";
import { Block, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import {
  Aura, Beam, Countdown, Echo, Overhead, Streaks, Swirl,
  Classmate, KIDS, Teacher,
  Chalkboard, Classroom, Desk, SchoolHall, classroom,
  Gym, Kitchen, LunchRoom, Reflection, gym, kitchen, lunchRoom,
  Card, Cookie, CookieStack, Cup, Dog, DogBowl, Eraser, Sandwich, Tie, Tray,
  BedBox, Bits, Bubble, Figure, Hut, Icon, LampPost, Player, Puffs, Room, SoundRings, SubscribeSign, Voxels,
  BikeRack, CoinStack, EchoBoots, EchoCoat, FlowerBouquet, GiantTeddyBear, GoldNecklace, RepairShop, ShopSign, ToolBox, Wrench, WorkshopBike,
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
} from "../../../Topics/WhatIf";
import timingJson from "./timing.json";

import { wordClock } from "../../../Topics/WhatIf/index";

export {
  Aura, Beam, Countdown, Echo, Overhead, Streaks, Swirl,
  Classmate, KIDS, Teacher,
  Chalkboard, Classroom, Desk, SchoolHall, classroom,
  Gym, Kitchen, LunchRoom, Reflection, gym, kitchen, lunchRoom,
  Card, Cookie, CookieStack, Cup, Dog, DogBowl, Eraser, Sandwich, Tie, Tray,
  BedBox, Bits, Bubble, Figure, Hut, Icon, LampPost, Player, Puffs, Room, SoundRings, SubscribeSign, Voxels,
  BikeRack, CoinStack, EchoBoots, EchoCoat, FlowerBouquet, GiantTeddyBear, GoldNecklace, RepairShop, ShopSign, ToolBox, Wrench, WorkshopBike,
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
} from "../../../Topics/WhatIf";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

export const PLACE = {
  class: [0, 0, 0] as Vec3,
  hall: [0, 0, 40] as Vec3,
  room: [0, 0, 80] as Vec3,
  kitchen: [40, 0, 0] as Vec3,
  lunch: [40, 0, 40] as Vec3,
  gym: [80, 0, 0] as Vec3,
  shop: [120, 0, 0] as Vec3,
};
export const SPOT = classroom(PLACE.class);
export const ME = SPOT.seat(1, 2);

// Export components as functions that return the component with the given `at` prop.
// We MUST keep them as functions to satisfy `HALL(at)` calls in scenes,
// BUT we must also satisfy `HALL.at` calls.
// In TypeScript, a function can have properties.
// So we define `HALL` as a function AND add an `at` property to it.

export const HALL = Object.assign(
  (at: Vec3) => <SchoolHall at={at} />,
  { at: PLACE.hall, call: (at: Vec3) => <SchoolHall at={at} /> }
) as ((at: Vec3) => React.ReactElement) & { at: Vec3; call: (at: Vec3) => React.ReactElement };

export const HOME = Object.assign(
  (at: Vec3) => <Kitchen at={at} />,
  { at: PLACE.kitchen, call: (at: Vec3) => <Kitchen at={at} /> }
) as ((at: Vec3) => React.ReactElement) & { at: Vec3; call: (at: Vec3) => React.ReactElement };

export const LUNCH = Object.assign(
  (at: Vec3) => <LunchRoom at={at} />,
  { at: PLACE.lunch, call: (at: Vec3) => <LunchRoom at={at} /> }
) as ((at: Vec3) => React.ReactElement) & { at: Vec3; call: (at: Vec3) => React.ReactElement };

export const GYM = Object.assign(
  (at: Vec3) => <Gym at={at} />,
  { at: PLACE.gym, call: (at: Vec3) => <Gym at={at} /> }
) as ((at: Vec3) => React.ReactElement) & { at: Vec3; call: (at: Vec3) => React.ReactElement };


// ----------------------------------------------------------------------------- the teller, Max, Ruby, the see-through grown-ups, ONE function for the man behind Max

type A = Partial<MinecraftAvatarProps>;

export const Hero = (p: A) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#d4a17f"
    hair="#352319"
    colors={{ torso: "#d7a02e", arms: "#d7a02e", legs: "#31516c" }}
    face="calm"
    blink
    {...p}
  />
);

export const Friend = (p: A) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#8b5a3c"
    hair="#211814"
    colors={{ torso: "#448b52", arms: "#448b52", legs: "#354b3b" }}
    face="uneasy"
    blink
    {...p}
  />
);

export const Ruby = (p: A) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#efc29e"
    hair="#39251b"
    colors={{ torso: "#a36d91", arms: "#a36d91", legs: "#464055" }}
    face="calm"
    blink
    {...p}
  />
);

type FutureOutfitProps = { position: Vec3; rotationY?: number; scale?: number; opacity?: number };

/** A film-specific grown-up future in a space suit; the blue Echo stays the same power-look underneath. */
export const AstronautEcho: React.FC<FutureOutfitProps> = ({ position, rotationY = 0, scale = 1.05, opacity = 0.58 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Echo position={[0, 0, 0]} scale={1} color="#8fd0ff" opacity={opacity} />
    <Block position={[0, 1.58, 0]} size={[0.62, 0.62, 0.58]} color="#dbe8eb" opacity={0.66} />
    <Block position={[0, 1.58, 0.31]} size={[0.43, 0.31, 0.055]} color="#58aeca" opacity={0.62} />
    <Block position={[0, 0.99, 0.17]} size={[0.62, 0.62, 0.28]} color="#e4e9df" opacity={0.62} />
    <Block position={[-0.39, 1.27, 0.1]} size={[0.18, 0.34, 0.22]} color="#d4e0dc" opacity={0.6} />
    <Block position={[0.39, 1.27, 0.1]} size={[0.18, 0.34, 0.22]} color="#d4e0dc" opacity={0.6} />
    <Block position={[0, 1.96, -0.05]} size={[0.055, 0.18, 0.055]} color="#dbe8eb" opacity={0.72} />
    <Block position={[0, 2.06, -0.05]} size={[0.12, 0.07, 0.12]} color="#70c4d4" opacity={0.74} />
  </group>
);

/** A future football star: jersey, helmet, and the ball are props, not a second power effect. */
export const FootballEcho: React.FC<FutureOutfitProps> = ({ position, rotationY = NORTH, scale = 1.05, opacity = 0.56 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Echo position={[0, 0, 0]} scale={1} color="#8fd0ff" opacity={opacity} />
    <Block position={[0, 1.0, 0.17]} size={[0.62, 0.63, 0.28]} color="#8c2939" opacity={0.78} />
    <Block position={[-0.39, 1.16, 0.12]} size={[0.17, 0.32, 0.22]} color="#eee2c8" opacity={0.8} />
    <Block position={[0.39, 1.16, 0.12]} size={[0.17, 0.32, 0.22]} color="#eee2c8" opacity={0.8} />
    <Block position={[0, 1.61, 0]} size={[0.59, 0.28, 0.58]} color="#d9b75b" opacity={0.84} />
    <Block position={[0, 1.52, 0.29]} size={[0.45, 0.08, 0.055]} color="#8c2939" opacity={0.86} />
    <Block position={[0.48, 0.84, 0.2]} size={[0.28, 0.2, 0.22]} color="#8b5735" opacity={0.9} />
    <Block position={[0.48, 0.84, 0.32]} size={[0.3, 0.035, 0.025]} color="#f0e4c9" opacity={0.95} />
  </group>
);

/** A painter's grown-up: a palette in one hand and a brush in the other. */
export const PainterEcho: React.FC<FutureOutfitProps> = ({ position, rotationY = NORTH, scale = 1.05, opacity = 0.54 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Echo position={[0, 0, 0]} scale={1} color="#8fd0ff" opacity={opacity} reach={0.55} />
    <Block position={[0, 1.0, 0.17]} size={[0.58, 0.58, 0.24]} color="#6b6856" opacity={0.72} />
    <Block position={[0, 1.8, 0]} size={[0.57, 0.16, 0.5]} color="#875b3d" opacity={0.88} />
    <Block position={[-0.49, 1.0, 0.24]} size={[0.25, 0.23, 0.07]} color="#d5b95d" opacity={0.9} />
    <Block position={[-0.52, 1.06, 0.29]} size={[0.07, 0.07, 0.025]} color="#d84f4c" opacity={0.95} />
    <Block position={[-0.45, 0.97, 0.29]} size={[0.07, 0.07, 0.025]} color="#3f83ac" opacity={0.95} />
    <Block position={[-0.5, 0.9, 0.29]} size={[0.07, 0.07, 0.025]} color="#e2d6b8" opacity={0.95} />
    <Block position={[0.47, 1.14, 0.22]} size={[0.05, 0.48, 0.05]} color="#775335" opacity={0.95} />
    <Block position={[0.47, 1.4, 0.22]} size={[0.09, 0.12, 0.08]} color="#d84f4c" opacity={0.95} />
  </group>
);

/** A pirate's grown-up, marked by a brimmed hat and an eye patch. */
export const PirateEcho: React.FC<FutureOutfitProps> = ({ position, rotationY = NORTH, scale = 1.05, opacity = 0.54 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Echo position={[0, 0, 0]} scale={1} color="#8fd0ff" opacity={opacity} />
    <Block position={[0, 1.83, 0]} size={[0.68, 0.12, 0.58]} color="#26252a" opacity={0.94} />
    <Block position={[0, 1.73, 0]} size={[0.48, 0.18, 0.42]} color="#36323a" opacity={0.94} />
    <Block position={[0, 1.73, 0.26]} size={[0.45, 0.05, 0.035]} color="#a43a39" opacity={0.96} />
    <Block position={[-0.11, 1.59, 0.23]} size={[0.16, 0.12, 0.045]} color="#242329" opacity={0.98} />
  </group>
);

/** A small Minecraft cow to make the feat legible in a phone frame. `position` is the ground under its middle. */
export const FutureCow: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Block position={[0, 0.53, 0]} size={[0.78, 0.52, 0.45]} color="#e8e2d8" />
    <Block position={[0, 0.7, 0.29]} size={[0.35, 0.38, 0.34]} color="#d2b89c" />
    <Block position={[0, 0.61, 0.48]} size={[0.22, 0.12, 0.06]} color="#e5b3a5" />
    <Block position={[-0.18, 0.77, 0.42]} size={[0.07, 0.055, 0.035]} color="#24211e" />
    <Block position={[0.18, 0.77, 0.42]} size={[0.07, 0.055, 0.035]} color="#24211e" />
    <Block position={[-0.12, 0.91, 0.24]} size={[0.06, 0.15, 0.06]} color="#e9e3d8" />
    <Block position={[0.12, 0.91, 0.24]} size={[0.06, 0.15, 0.06]} color="#e9e3d8" />
    <Block position={[-0.25, 0.63, 0.23]} size={[0.19, 0.24, 0.08]} color="#383236" />
    <Block position={[0.16, 0.44, 0.23]} size={[0.08, 0.42, 0.08]} color="#7a5b48" />
    {[-1, 1].map((side) => (
      <Block key={side} position={[side * 0.26, 0.2, -0.1]} size={[0.11, 0.4, 0.11]} color="#e8e2d8" />
    ))}
    {[-1, 1].map((side) => (
      <Block key={`front-${side}`} position={[side * 0.26, 0.2, 0.16]} size={[0.11, 0.4, 0.11]} color="#e8e2d8" />
    ))}
  </group>
);

/** A present that grows from token-sized to impossible, keeping each failed attempt in the same picture. */
export const GiftBox: React.FC<{ position: Vec3; scale?: number; color?: string }> = ({ position, scale = 1, color = "#c44c52" }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.22, 0]} size={[0.46, 0.4, 0.4]} color={color} />
    <Block position={[0, 0.44, 0]} size={[0.52, 0.07, 0.45]} color="#e6d4b2" />
    <Block position={[0, 0.25, 0.21]} size={[0.08, 0.38, 0.025]} color="#e6d4b2" />
    <Block position={[0, 0.25, 0]} size={[0.46, 0.4, 0.07]} color="#e6d4b2" opacity={0.85} />
  </group>
);

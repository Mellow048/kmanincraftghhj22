import type React from "react";
import {
  Block,
  ChatToast,
  Clouds,
  Dust,
  EmberDrift,
  FloatingNumber,
  Glow,
  GodRay,
  LightPool,
  MinecraftAvatar,
  Sign,
  SolidBox,
  Torch,
  Tree,
  Vox,
  Water,
  Zone,
  cam,
  clamp01,
  moveBetween,
  storyScene,
  stride,
  walkSegment,
} from "../../engine";
import type { AnimName, FaceName, MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import {
  Bits,
  Bubble,
  DEG,
  EAST,
  Fence,
  Hut,
  KID,
  LampPost,
  NORTH,
  PlainsVillageMap,
  Player,
  Puffs,
  Room,
  SOUTH,
  SoundRings,
  Stall,
  SubscribeSign,
  VillageStreet,
  Villager,
  WEST,
  ahead,
  beside,
  chestOf,
  ease,
  faceOf,
  jolt,
  pop,
  ramp,
  wordClock,
} from "../../../Topics/InThisTown";
import timingData from "./timing.json";

export const timing = timingData as unknown as Timing;
export const w = wordClock(timing);

/** Separate world origins per zone so v7 <SolidBox> walls never collide across zones. */
export const ROOM_POS: Vec3 = [60, 0, 0];
export const SCHOOL_POS: Vec3 = [-60, 0, 0];
export const on = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

export {
  Bits,
  Block,
  Bubble,
  ChatToast,
  Clouds,
  DEG,
  Dust,
  EAST,
  EmberDrift,
  Fence,
  FloatingNumber,
  Glow,
  GodRay,
  Hut,
  KID,
  LampPost,
  LightPool,
  NORTH,
  PlainsVillageMap,
  Player,
  Puffs,
  Room,
  SOUTH,
  Sign,
  SolidBox,
  SoundRings,
  Stall,
  SubscribeSign,
  Torch,
  Tree,
  VillageStreet,
  Villager,
  Vox,
  WEST,
  Water,
  Zone,
  ahead,
  beside,
  cam,
  chestOf,
  clamp01,
  ease,
  faceOf,
  jolt,
  moveBetween,
  pop,
  ramp,
  storyScene,
  stride,
  walkSegment,
};
export type { AnimName, FaceName, Vec3 };

/** Kid teller: sunny yellow hoodie with optional pulled-up YELLOW hood (`yellowHood`) OR Dad's proud blue hood (`blueHood`, keeping yellow hoodie body so Kid never looks like Dad!). */
export const Hero: React.FC<
  Partial<MinecraftAvatarProps> & { blueHood?: boolean; yellowHood?: boolean; hoodLow?: boolean; tears?: number }
> = ({ blueHood = false, yellowHood = false, hoodLow = false, tears = 0, head, ...rest }) => {
  const showHood = yellowHood || blueHood;
  const hoodMain = yellowHood ? "#f2c12e" : "#1c52a8";
  const hoodBack = yellowHood ? "#d9a71c" : "#16428a";
  const hoodSide = yellowHood ? "#e3b324" : "#194999";
  const hoodTrim = yellowHood ? "#fff2a8" : "#eab93a";
  return (
    <MinecraftAvatar
      scale={KID}
      outfit="hoodie"
      skin="#f3c69f"
      hair="#3b2414"
      hairLayer
      colors={{
        torso: "#f2c12e",
        arms: "#e0af22",
        legs: "#2f4361",
      }}
      shoes="#3a281d"
      rim={0.1}
      rimColor="#1d2b45"
      blink
      head={
        <>
          {showHood ? (
            <group position={[0, hoodLow ? -0.02 : 0.02, 0]}>
              <Block position={[0, 0.25, -0.02]} size={[0.56, 0.1, 0.56]} color={hoodMain} />
              <Block position={[0, 0.04, -0.26]} size={[0.56, 0.44, 0.08]} color={hoodBack} />
              <Block position={[-0.26, 0.04, -0.02]} size={[0.07, 0.44, 0.52]} color={hoodSide} />
              <Block position={[0.26, 0.04, -0.02]} size={[0.07, 0.44, 0.52]} color={hoodSide} />
              <Block position={[0, 0.23, 0.25]} size={[0.56, 0.06, 0.06]} color={hoodTrim} />
            </group>
          ) : null}
          {tears > 0.05 ? (
            <>
              <Block position={[-0.12, -0.04, 0.265]} size={[0.055, 0.12 * tears, 0.02]} color="#7ce3ff" emissive="#4cc9ff" emissiveIntensity={0.45} castShadow={false} />
              <Block position={[0.12, -0.04, 0.265]} size={[0.055, 0.12 * tears, 0.02]} color="#7ce3ff" emissive="#4cc9ff" emissiveIntensity={0.45} castShadow={false} />
            </>
          ) : null}
          {head}
        </>
      }
      {...rest}
    />
  );
};

/** Wandering Trader Dad: royal blue robe, gold trim, blue hood, optional milk drips and visibility fade. */
export const TraderDad: React.FC<
  Partial<MinecraftAvatarProps> & { vanish?: number; milkWet?: boolean; holdingPotion?: boolean; holdingHammer?: boolean }
> = ({ vanish = 0, milkWet = false, holdingPotion = false, holdingHammer = false, position = [0, 0, 0], head, torso, ...rest }) => {
  const hidden = vanish >= 0.92;
  const sc = hidden ? 0.001 : Math.max(0.05, 1 - vanish * 0.9);
  return (
    <group position={position}>
      {!hidden ? (
        <group scale={[sc, sc, sc]}>
          <MinecraftAvatar
            position={[0, 0, 0]}
            outfit="suit"
            skin="#e8b891"
            hair="#5c3e26"
            hairLayer
            colors={{ torso: "#1c52a8", arms: "#174691", legs: "#1b3366" }}
            shoes="#4a2e1b"
            rim={0.08}
            rimColor="#163a75"
            blink
            head={
              <>
                {/* Iconic Wandering Trader blue hood with gold edge */}
                <Block position={[0, 0.26, -0.02]} size={[0.58, 0.1, 0.58]} color="#1c52a8" />
                <Block position={[0, 0.03, -0.27]} size={[0.58, 0.46, 0.08]} color="#163f82" />
                <Block position={[-0.27, 0.04, -0.02]} size={[0.08, 0.46, 0.52]} color="#194896" />
                <Block position={[0.27, 0.04, -0.02]} size={[0.08, 0.46, 0.52]} color="#194896" />
                <Block position={[0, 0.24, 0.26]} size={[0.58, 0.07, 0.07]} color="#eab93a" />
                {milkWet ? (
                  <>
                    <Block position={[-0.14, 0.18, 0.28]} size={[0.1, 0.14, 0.04]} color="#f8fbff" castShadow={false} />
                    <Block position={[0.12, 0.12, 0.28]} size={[0.08, 0.2, 0.04]} color="#f8fbff" castShadow={false} />
                    <Block position={[0.02, -0.02, 0.27]} size={[0.06, 0.12, 0.03]} color="#eef6ff" castShadow={false} />
                  </>
                ) : null}
                {head}
              </>
            }
            torso={
              <>
                <Block position={[0, 0.05, 0.135]} size={[0.42, 0.08, 0.02]} color="#eab93a" castShadow={false} />
                <Block position={[0, -0.14, 0.135]} size={[0.14, 0.3, 0.02]} color="#eab93a" castShadow={false} />
                <Block position={[0, -0.08, 0.142]} size={[0.12, 0.1, 0.02]} color="#2fe37c" castShadow={false} />
                {torso}
              </>
            }
            {...rest}
          />
          {holdingPotion ? <PotionBottle position={[0.38, 1.05, 0.34]} /> : null}
          {holdingHammer ? <OakHammer position={[0.38, 1.12, 0.36]} /> : null}
        </group>
      ) : null}
      {vanish > 0.05 ? <PotionSwirl t={vanish * 3} intensity={1} /> : null}
    </group>
  );
};

/** Pompous rich merchant villager with emerald vest & gold trim. */
export const RichMerchant: React.FC<Partial<MinecraftAvatarProps> & { variant?: number }> = ({ variant = 0, ...rest }) => (
  <MinecraftAvatar
    outfit="suit"
    skin={variant % 2 === 0 ? "#f0c7a4" : "#dfb08b"}
    hair={variant % 2 === 0 ? "#242126" : "#5e4328"}
    hairLayer
    colors={{
      torso: variant % 2 === 0 ? "#1f6b47" : "#6e233b",
      arms: variant % 2 === 0 ? "#195739" : "#591b2f",
      legs: "#1e222e",
    }}
    shoes="#161820"
    rim={0.12}
    rimColor="#f2ca44"
    blink
    torso={
      <>
        <Block position={[0, 0.05, 0.138]} size={[0.12, 0.44, 0.02]} color="#f2ca44" castShadow={false} />
        <Block position={[0, 0.14, 0.144]} size={[0.08, 0.08, 0.02]} color="#32e87e" castShadow={false} />
      </>
    }
    {...rest}
  />
);

/** Adorable blocky Wandering Trader Llama with blue/gold blanket, moving legs, saddlebags, and optional spit! */
export const TraderLlama: React.FC<{
  position?: Vec3;
  rotationY?: number;
  coat?: string;
  walk?: number;
  spit?: number;
  loaded?: boolean;
  scale?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, coat = "#ebd6b3", walk = 0, spit = 0, loaded = false, scale = 1 }) => {
  const swing = Math.sin(walk * 5.2) * 0.32;
  const bob = Math.abs(Math.sin(walk * 5.2)) * 0.04;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group position={[0, bob, 0]}>
        {/* Four legs */}
        {[
          [-0.22, 0.35, 0.36, swing],
          [0.22, 0.35, 0.36, -swing],
          [-0.22, 0.35, -0.36, -swing],
          [0.22, 0.35, -0.36, swing],
        ].map(([x, y, z, rot], i) => (
          <group key={i} position={[x!, y!, z!]} rotation={[rot!, 0, 0]}>
            <Block position={[0, -0.16, 0]} size={[0.18, 0.56, 0.18]} color={coat} />
            <Block position={[0, -0.42, 0]} size={[0.19, 0.08, 0.19]} color="#5c4734" />
          </group>
        ))}
        {/* Torso + iconic Wandering Trader cobalt & gold carpet */}
        <Block position={[0, 0.88, 0]} size={[0.68, 0.54, 1.08]} color={coat} />
        <Block position={[0, 0.91, 0]} size={[0.72, 0.44, 0.72]} color="#1c52a8" />
        <Block position={[0, 0.91, 0]} size={[0.74, 0.12, 0.56]} color="#eab93a" castShadow={false} />
        <Block position={[0, 1.16, 0]} size={[0.46, 0.04, 0.46]} color="#eab93a" castShadow={false} />
        {/* Tail */}
        <Block position={[0, 1.04, -0.58]} size={[0.14, 0.16, 0.16]} color={coat} />
        {/* Long neck + goofy head + tall ears */}
        <Block position={[0, 1.38, 0.44]} size={[0.34, 0.66, 0.34]} color={coat} />
        <Block position={[0, 1.62, 0.56]} size={[0.36, 0.32, 0.48]} color={coat} />
        <Block position={[0, 1.54, 0.82]} size={[0.24, 0.18, 0.16]} color="#d8bfa0" />
        {/* Eyes */}
        <Block position={[-0.185, 1.66, 0.66]} size={[0.02, 0.08, 0.08]} color="#18161a" castShadow={false} />
        <Block position={[0.185, 1.66, 0.66]} size={[0.02, 0.08, 0.08]} color="#18161a" castShadow={false} />
        {/* Tall ears */}
        <Block position={[-0.12, 1.88, 0.44]} size={[0.1, 0.24, 0.1]} color={coat} />
        <Block position={[0.12, 1.88, 0.44]} size={[0.1, 0.24, 0.1]} color={coat} />
        {/* Optional loaded saddlebags with bread & oak planks */}
        {loaded ? (
          <>
            <Vox kind="planks" tint="#9c6d3b" position={[-0.44, 0.9, -0.02]} size={[0.24, 0.42, 0.48]} />
            <Vox kind="planks" tint="#9c6d3b" position={[0.44, 0.9, -0.02]} size={[0.24, 0.42, 0.48]} />
            <Block position={[-0.45, 1.16, 0]} size={[0.18, 0.12, 0.36]} color="#d99a42" />
            <Vox kind="planks" tint="#c49052" position={[0.45, 1.16, 0]} size={[0.18, 0.12, 0.42]} />
          </>
        ) : null}
        {/* Optional cartoon spit puff */}
        {spit > 0.02 && spit < 0.98 ? (
          <group position={[0, 1.54 - spit * 0.18, 0.95 + spit * 2.4]}>
            <Block position={[0, 0, 0]} size={[0.16, 0.14, 0.22]} color="#f0faff" emissive="#c7eaff" emissiveIntensity={0.35} castShadow={false} />
            <Block position={[0.08, 0.06, -0.18]} size={[0.09, 0.09, 0.09]} color="#e6f7ff" castShadow={false} />
          </group>
        ) : null}
      </group>
    </group>
  );
};

/** Glowing Invisibility Potion bottle with cork and shine. */
export const PotionBottle: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.24, 0.26, 0.24]} color="#7ce3ff" emissive="#4cc9ff" emissiveIntensity={0.65} opacity={0.86} />
    <Block position={[0, 0.17, 0]} size={[0.12, 0.1, 0.12]} color="#cceeff" opacity={0.8} />
    <Block position={[0, 0.24, 0]} size={[0.1, 0.06, 0.1]} color="#7c522d" />
    <Glow position={[0, 0.02, 0]} size={0.85} color="#66d9ff" opacity={0.42} />
  </group>
);

/** Swirling blue Minecraft invisibility potion bubbles. */
export const PotionSwirl: React.FC<{ position?: Vec3; t?: number; intensity?: number }> = ({ position = [0, 0.9, 0], t = 0, intensity = 1 }) => {
  if (intensity <= 0.01) return null;
  return (
    <group position={position}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const ang = t * 3.4 + i * 0.92;
        const r = 0.28 + (i % 3) * 0.18;
        const y = ((t * 0.7 + i * 0.24) % 1.4) - 0.5;
        return (
          <Block
            key={i}
            position={[Math.cos(ang) * r, y, Math.sin(ang) * r]}
            size={[0.11, 0.11, 0.11]}
            color={i % 2 === 0 ? "#80e5ff" : "#d9f7ff"}
            emissive="#4dc8ff"
            emissiveIntensity={0.55}
            opacity={0.85 * intensity}
            castShadow={false}
          />
        );
      })}
      <Glow position={[0, 0.1, 0]} size={1.6} color="#6cdbff" opacity={0.28 * intensity} />
    </group>
  );
};

/** Iron Minecraft Milk Bucket with white milk top and optional splash burst. */
export const MilkBucket: React.FC<{ position?: Vec3; rotation?: Vec3; splash?: number; scale?: number }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  splash = 0,
  scale = 1,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.3, 0.32, 0.3]} color="#b4bcc6" metalness={0.35} roughness={0.38} />
    <Block position={[0, 0.15, 0]} size={[0.24, 0.05, 0.24]} color="#ffffff" emissive="#eef6ff" emissiveIntensity={0.25} />
    <Block position={[0, 0.24, 0]} size={[0.34, 0.04, 0.04]} color="#88929e" />
    {splash > 0.02 ? (
      <group position={[0, 0.18, 0.2 + splash * 1.4]}>
        {[-0.28, -0.1, 0.08, 0.24, 0].map((dx, i) => (
          <Block
            key={i}
            position={[dx * (0.6 + splash), Math.sin(splash * Math.PI) * 0.45 + (i % 2) * 0.14, (i - 2) * 0.12]}
            size={[0.16, 0.14, 0.16]}
            color="#ffffff"
            emissive="#e6f5ff"
            emissiveIntensity={0.3}
            castShadow={false}
          />
        ))}
      </group>
    ) : null}
  </group>
);

/** Carpenter oak hammer for invisible roof repair beats. */
export const OakHammer: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Vox kind="planks" tint="#7c5328" position={[0, 0.22, 0]} size={[0.06, 0.48, 0.06]} />
    <Block position={[0, 0.48, 0]} size={[0.32, 0.12, 0.12]} color="#7f8894" metalness={0.4} roughness={0.35} />
  </group>
);

/** Wandering Trader's Dead Bush stall with wooden counter, clay pot + dead bush, sand bucket, and sign. */
export const DeadBushStall: React.FC<{ position?: Vec3; rotationY?: number; showBush?: boolean }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  showBush = true,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" tint="#9a6d3c" position={[0, 0.46, 0]} size={[2.3, 0.92, 0.92]} />
    <Vox kind="planks" tint="#7a5128" position={[0, 0.95, 0]} size={[2.42, 0.08, 1.02]} />
    {/* Striped blue-and-gold awning posts & canopy */}
    <Vox kind="planks" tint="#6e4824" position={[-1.08, 1.65, -0.38]} size={[0.12, 2.3, 0.12]} />
    <Vox kind="planks" tint="#6e4824" position={[1.08, 1.65, -0.38]} size={[0.12, 2.3, 0.12]} />
    <Vox kind="planks" tint="#6e4824" position={[-1.08, 1.52, 0.42]} size={[0.12, 2.05, 0.12]} />
    <Vox kind="planks" tint="#6e4824" position={[1.08, 1.52, 0.42]} size={[0.12, 2.05, 0.12]} />
    {[-0.84, -0.28, 0.28, 0.84].map((x, i) => (
      <Block key={i} position={[x, 2.58, 0.04]} rotation={[0.14, 0, 0]} size={[0.56, 0.12, 1.32]} color={i % 2 === 0 ? "#1c52a8" : "#eab93a"} />
    ))}
    {/* Dead Bush in terracotta pot */}
    {showBush ? (
      <group position={[-0.42, 1.0, 0.1]}>
        <Block position={[0, 0.14, 0]} size={[0.3, 0.28, 0.3]} color="#9c5132" />
        <Block position={[0, 0.42, 0]} size={[0.07, 0.38, 0.07]} color="#6b4423" />
        <Block position={[-0.14, 0.52, 0.02]} rotation={[0, 0, 0.55]} size={[0.06, 0.28, 0.06]} color="#7a512c" />
        <Block position={[0.14, 0.56, -0.02]} rotation={[0, 0, -0.58]} size={[0.06, 0.32, 0.06]} color="#7a512c" />
        <Block position={[0.02, 0.62, 0.12]} rotation={[0.45, 0, 0.1]} size={[0.05, 0.24, 0.05]} color="#6b4423" />
      </group>
    ) : null}
    {/* Sand Bucket on right side */}
    <group position={[0.52, 1.14, 0.1]}>
      <Block position={[0, 0, 0]} size={[0.28, 0.3, 0.28]} color="#9ca5b0" />
      <Block position={[0, 0.15, 0]} size={[0.22, 0.05, 0.22]} color="#e6cf8b" />
    </group>
    <Sign title="DEAD BUSH 5E" position={[0, 0.54, 0.5]} width={1.08} height={0.58} />
  </group>
);

/** Brick Bakery building with raised oak front porch, red-and-cream awning, glowing windows, front door, and waist-high wooden bread stand! */
export const BakeryBuilding: React.FC<{
  position?: Vec3;
  rotationY?: number;
  night?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, night = false }) => {
  const winColor = night ? "#ffd278" : "#9bd6ff";
  const winEmissive = night ? "#ffa63a" : "#000000";
  const winInt = night ? 0.95 : 0;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Main brick bakery facade & warm pitched roof */}
      <Vox kind="bricks" tint="#b55946" position={[0, 2.2, -2.2]} size={[5.2, 4.4, 4.4]} />
      <Vox kind="planks" tint="#5e3620" position={[0, 4.65, -2.2]} size={[5.7, 0.56, 4.9]} />
      <Vox kind="planks" tint="#4d2b18" position={[0, 5.15, -2.2]} size={[4.6, 0.48, 3.8]} />
      {/* Stone bakery oven chimney */}
      <Vox kind="stoneBrick" position={[1.7, 5.8, -3.1]} size={[0.95, 1.8, 0.95]} />
      {/* Front bakery windows on either side of the front door */}
      <Block position={[-1.65, 2.05, 0.04]} size={[1.15, 1.1, 0.08]} color={winColor} emissive={winEmissive} emissiveIntensity={winInt} />
      <Block position={[1.65, 2.05, 0.04]} size={[1.15, 1.1, 0.08]} color={winColor} emissive={winEmissive} emissiveIntensity={winInt} />
      <Vox kind="planks" tint="#5e381d" position={[-1.65, 1.44, 0.08]} size={[1.28, 0.14, 0.18]} />
      <Vox kind="planks" tint="#5e381d" position={[1.65, 1.44, 0.08]} size={[1.28, 0.14, 0.18]} />
      {/* Framed bakery front doorway (warm interior backing so opening the door reveals cozy glow!) */}
      <Block position={[0, 1.45, 0.03]} size={[1.22, 2.38, 0.06]} color={night ? "#ffbf5e" : "#4a2c16"} emissive={night ? "#ff9c2a" : "#000000"} emissiveIntensity={night ? 0.85 : 0} />
      <Vox kind="planks" tint="#6e4422" position={[-0.66, 1.45, 0.08]} size={[0.14, 2.48, 0.14]} />
      <Vox kind="planks" tint="#6e4422" position={[0.66, 1.45, 0.08]} size={[0.14, 2.48, 0.14]} />
      <Vox kind="planks" tint="#6e4422" position={[0, 2.72, 0.08]} size={[1.46, 0.16, 0.16]} />
      {/* Raised wooden front porch deck + steps + porch posts */}
      <Vox kind="planks" tint="#8f6336" position={[0, 0.12, 1.05]} size={[5.1, 0.24, 2.1]} />
      <Vox kind="planks" tint="#7c5329" position={[0, 0.06, 2.25]} size={[2.2, 0.12, 0.36]} />
      <Vox kind="planks" tint="#6b4520" position={[-2.35, 1.52, 1.95]} size={[0.16, 2.7, 0.16]} />
      <Vox kind="planks" tint="#6b4520" position={[2.35, 1.52, 1.95]} size={[0.16, 2.7, 0.16]} />
      {/* Striped red-and-cream bakery awning */}
      {[-1.95, -1.3, -0.65, 0, 0.65, 1.3, 1.95].map((x, i) => (
        <Block key={i} position={[x, 2.86, 1.15]} rotation={[0.18, 0, 0]} size={[0.65, 0.12, 2.15]} color={i % 2 === 0 ? "#c93b2b" : "#f7ebd2"} />
      ))}
      <Sign title="BAKERY" position={[0, 3.45, 0.16]} width={1.85} height={0.58} bg="#f5e6c8" fg="#4a2810" accent="#c93b2b" />
      {/* Waist-high wooden bakery bread stand / display counter tucked cleanly beside the porch steps so the front door stays unobstructed! */}
      <group position={[1.45, 0.24, 1.68]}>
        <Vox kind="planks" tint="#8a5e32" position={[0, 0.36, 0]} size={[1.55, 0.72, 0.68]} />
        <Vox kind="planks" tint="#a87643" position={[0, 0.74, 0]} size={[1.68, 0.08, 0.8]} />
      </group>
      {night ? <Torch position={[-0.92, 2.18, 0.22]} light={4.0} /> : null}
      {night ? <Torch position={[0.92, 2.18, 0.22]} light={4.0} /> : null}
    </group>
  );
};

/** Hinged wooden bakery front door panel (swings open smoothly on `open` 0..1!). */
export const BakeryDoor: React.FC<{ position?: Vec3; rotationY?: number; open?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  open = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <group position={[-0.56, 0, 0]} rotation={[0, -open * 1.45, 0]}>
      <Vox kind="planks" tint="#734721" position={[0.56, 1.16, 0]} size={[1.12, 2.28, 0.1]} />
      <Block position={[0.95, 1.12, 0.08]} size={[0.1, 0.1, 0.08]} color="#eab93a" />
      <Block position={[0.56, 1.72, 0.06]} size={[0.66, 0.56, 0.04]} color="#d6ecff" opacity={0.85} />
    </group>
  </group>
);

/** Muddy llama hoofprint pairs leading down the cobblestone street/alley. */
export const MuddyPrints: React.FC<{ from: Vec3; to: Vec3; count?: number }> = ({ from, to, count = 6 }) => (
  <group>
    {Array.from({ length: count }, (_, i) => {
      const k = count <= 1 ? 0 : i / (count - 1);
      const x = from[0] + (to[0] - from[0]) * k;
      const z = from[2] + (to[2] - from[2]) * k;
      const side = i % 2 === 0 ? -0.22 : 0.22;
      return (
        <group key={i} position={[x + side, 0.075, z]}>
          <Block position={[0, 0, 0]} size={[0.18, 0.02, 0.24]} color="#523822" castShadow={false} />
          <Block position={[0.14, 0, 0.08]} size={[0.12, 0.02, 0.16]} color="#47301d" castShadow={false} />
        </group>
      );
    })}
  </group>
);

/** Golden loaves stacked neatly on the sick baker's porch stand. */
export const LoafPile: React.FC<{ position?: Vec3; rotationY?: number; count?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  count = 10,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" tint="#8c6134" position={[0, 0.08, 0]} size={[1.1, 0.16, 0.72]} />
    {Array.from({ length: Math.min(10, count) }, (_, i) => {
      const row = Math.floor(i / 4);
      const col = i % 4;
      return (
        <group key={i} position={[-0.36 + col * 0.24 + (row % 2) * 0.08, 0.24 + row * 0.16, (row % 2) * 0.08 - 0.06]}>
          <Block position={[0, 0, 0]} size={[0.2, 0.14, 0.34]} color="#c98532" />
          <Block position={[0, 0.06, 0]} size={[0.16, 0.04, 0.28]} color="#f0bc5e" castShadow={false} />
        </group>
      );
    })}
  </group>
);

/** Blocky white fluffy Minecraft sheep for the fenced-sheep beat. */
export const BlockSheep: React.FC<{ position?: Vec3; rotationY?: number; hop?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  hop = 0,
}) => (
  <group position={[position[0], position[1] + hop, position[2]]} rotation={[0, rotationY, 0]}>
    {[
      [-0.2, 0.24, 0.28],
      [0.2, 0.24, 0.28],
      [-0.2, 0.24, -0.28],
      [0.2, 0.24, -0.28],
    ].map(([x, y, z], i) => (
      <Block key={i} position={[x!, y!, z!]} size={[0.14, 0.48, 0.14]} color="#d8bfa3" />
    ))}
    <Block position={[0, 0.72, 0]} size={[0.72, 0.56, 0.94]} color="#f5f4ef" />
    <Block position={[0, 0.86, 0.56]} size={[0.38, 0.34, 0.38]} color="#e6cbb0" />
    <Block position={[0, 0.96, 0.5]} size={[0.42, 0.16, 0.32]} color="#f5f4ef" />
    <Block position={[-0.1, 0.88, 0.76]} size={[0.06, 0.06, 0.02]} color="#18161a" castShadow={false} />
    <Block position={[0.1, 0.88, 0.76]} size={[0.06, 0.06, 0.02]} color="#18161a" castShadow={false} />
  </group>
);

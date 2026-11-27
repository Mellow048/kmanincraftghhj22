import type React from "react";
import { Block, ChatToast, FloatingNumber, Glow, MinecraftAvatar, Sign, Torch, Vox, cam, plankTex, storyScene } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { ClassroomRoom, DeskSetup, ServerPlayer } from "../../../Topics/ServerLore";
import { Hut } from "../../../Topics/InThisTown";
import { ease, pop, ramp, wordClock } from "../../../Topics/Shared";
import timingJson from "./timing.json";

export {
  Block,
  ChatToast,
  ClassroomRoom,
  DeskSetup,
  FloatingNumber,
  Glow,
  Hut,
  ServerPlayer,
  Sign,
  Torch,
  Vox,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
};

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  server: [0, 0, 0] as Vec3,
  irl: [0, 0, 75] as Vec3,
  school: [0, 0, 150] as Vec3,
};
export const on = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

type A = Partial<MinecraftAvatarProps>;

/** Maya — soft sky-blue hoodie so she stands out warmly on the oak spawn bench. */
export const Maya: React.FC<A> = (p) => (
  <MinecraftAvatar
    outfit="hoodie"
    skin="#edc3a2"
    hair="#3b2619"
    hairLayer
    colors={{ torso: "#53a8e6", arms: "#4494cf", legs: "#2e3c54" }}
    shoes="#f0f0f0"
    blink
    {...p}
  />
);

/** Jake — crimson jacket griefer who redeems himself with red flowers. */
export const Jake: React.FC<A> = (p) => (
  <MinecraftAvatar
    outfit="hoodie"
    skin="#e0ae86"
    hair="#1d1c22"
    hairLayer
    colors={{ torso: "#c93838", arms: "#a82d2d", legs: "#262830" }}
    shoes="#1a1a1f"
    blink
    {...p}
  />
);

/** Server Owner — bright gold/emerald tunic with subtle crown accent. */
export const Owner: React.FC<A> = (p) => (
  <MinecraftAvatar
    outfit="suit"
    skin="#e8ba92"
    hair="#4d321c"
    hairLayer
    colors={{ torso: "#298552", arms: "#216e43", legs: "#273342" }}
    shoes="#241c16"
    blink
    head={<Block position={[0, 0.27, 0]} size={[0.54, 0.14, 0.54]} color="#ffd84d" metalness={0.5} roughness={0.25} />}
    {...p}
  />
);

/** Oak spawn bench with 3 story states: plain, blown-up crater, or rebuilt with lanterns + pressure plate. */
export const SpawnBench: React.FC<{ position?: Vec3; state?: "plain" | "crater" | "rebuilt" }> = ({
  position = [0, 0, 0],
  state = "plain",
}) => {
  if (state === "crater") {
    return (
      <group position={position}>
        <Block position={[0, 0.04, 0]} size={[3.0, 0.08, 2.2]} color="#2c2b29" />
        <Block position={[-0.9, 0.14, 0.3]} size={[0.45, 0.14, 0.25]} color="#8f673c" />
        <Block position={[0.8, 0.12, -0.2]} size={[0.5, 0.12, 0.22]} color="#7a5630" />
      </group>
    );
  }
  return (
    <group position={position}>
      {/* Bench seat + backrest + legs */}
      <Block position={[0, 0.44, 0]} size={[2.2, 0.14, 0.72]} map={plankTex("#9c7042")} />
      <Block position={[0, 0.88, -0.3]} size={[2.2, 0.72, 0.12]} map={plankTex("#855d34")} />
      <Block position={[-0.92, 0.22, 0]} size={[0.16, 0.44, 0.66]} color="#6b4928" />
      <Block position={[0.92, 0.22, 0]} size={[0.16, 0.44, 0.66]} color="#6b4928" />
      {state === "rebuilt" && (
        <>
          {/* Warm oak lantern posts flanking the bench */}
          {[-1.45, 1.45].map((x, i) => (
            <group key={i} position={[x, 0, -0.1]}>
              <Block position={[0, 1.05, 0]} size={[0.18, 2.1, 0.18]} color="#6b4928" />
              <Block position={[0, 2.18, 0]} size={[0.34, 0.42, 0.34]} color="#ffd86b" emissive="#ffbe3b" emissiveIntensity={0.85} />
              <Glow position={[0, 2.2, 0.15]} size={1.6} color="#ffe082" opacity={0.35} />
            </group>
          ))}
          {/* Golden auto-greeting pressure plate right in front of the seat */}
          <Block position={[0, 0.05, 0.82]} size={[0.72, 0.06, 0.72]} color="#f5c736" metalness={0.45} roughness={0.28} />
        </>
      )}
    </group>
  );
};

/** Iconic Minecraft TNT block. */
export const TntBlock: React.FC<{ position?: Vec3; flash?: boolean }> = ({ position = [0, 0, 0], flash = false }) => (
  <group position={position}>
    <Block position={[0, 0.35, 0]} size={[0.66, 0.66, 0.66]} color={flash ? "#ffffff" : "#d9342b"} />
    <Block position={[0, 0.35, 0]} size={[0.68, 0.22, 0.68]} color="#f2efe6" />
  </group>
);

/** Bright red Minecraft poppy flower. */
export const RedFlower: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.18, 0]} size={[0.06, 0.36, 0.06]} color="#3a8c3a" />
    <Block position={[0, 0.4, 0]} size={[0.2, 0.18, 0.2]} color="#e62e2e" emissive="#c91e1e" emissiveIntensity={0.18} />
  </group>
);

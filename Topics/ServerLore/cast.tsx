import type React from "react";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Block, Glow, MinecraftAvatar, Torch, clamp01, mulberry32, useFilmTime, wordBitmap, wordTexture } from "../../src/engine";
import type { MinecraftAvatarProps, OutfitName, Vec3 } from "../../src/engine";
import { Icon, pop } from "../Shared";

/**
 * SERVER LORE CAST — Expressive SMP players, recognizable Server Owner (!),
 * mothers/friends/griefers, 3D floating nametags, reaction badges, crying tears,
 * and floating payoff hearts. Zero 2D HTML overlays.
 */

export type ServerRoleName = "hero" | "owner" | "mom" | "bully" | "friendA" | "friendB" | "friendC" | "griefer";

type RoleLook = {
  skin: string;
  hair: string;
  torso: string;
  arms: string;
  legs: string;
  shoes: string;
  outfit: OutfitName;
  accent?: string;
};

export const SERVER_ROLES: Record<ServerRoleName, RoleLook> = {
  hero: {
    skin: "#efd0b2",
    hair: "#5a3820",
    torso: "#3d6e9c",
    arms: "#345e86",
    legs: "#2f3848",
    shoes: "#e8e3d6",
    outfit: "hoodie",
    accent: "#dfe8f2",
  },
  owner: {
    skin: "#e9be96",
    hair: "#242228",
    torso: "#9e2428",
    arms: "#8a1e22",
    legs: "#232530",
    shoes: "#f0c84a",
    outfit: "suit",
    accent: "#ffd54f",
  },
  mom: {
    skin: "#efd0b2",
    hair: "#7a4424",
    torso: "#2f8a88",
    arms: "#2f8a88",
    legs: "#2b4d5a",
    shoes: "#eaedf0",
    outfit: "tee",
    accent: "#ffffff",
  },
  bully: {
    skin: "#dfb186",
    hair: "#1e1a1b",
    torso: "#2c2432",
    arms: "skin",
    legs: "#252632",
    shoes: "#b82d2d",
    outfit: "tee",
    accent: "#e2473b",
  },
  friendA: {
    skin: "#f2cfb0",
    hair: "#e0952a",
    torso: "#4a924a",
    arms: "skin",
    legs: "#3d465a",
    shoes: "#d8d6ce",
    outfit: "hoodie",
    accent: "#f2df74",
  },
  friendB: {
    skin: "#8f5f40",
    hair: "#1d1a1c",
    torso: "#c98b32",
    arms: "#b27824",
    legs: "#2b3240",
    shoes: "#ece8df",
    outfit: "hoodie",
    accent: "#f7e7ba",
  },
  friendC: {
    skin: "#e8bb94",
    hair: "#c44536",
    torso: "#6d4aa8",
    arms: "skin",
    legs: "#34374a",
    shoes: "#f0f0f0",
    outfit: "tee",
    accent: "#c4a3ff",
  },
  griefer: {
    skin: "#d6a57c",
    hair: "#2b282b",
    torso: "#48352a",
    arms: "#3a2920",
    legs: "#252528",
    shoes: "#403c3a",
    outfit: "hoodie",
    accent: "#ff5533",
  },
};

/** 4-pronged gold Server Owner crown worn on `MinecraftAvatar` head `[0, 0.26, 0]`. */
export const OwnerCrown: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0.25, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.05, 0.255]} size={[0.54, 0.1, 0.05]} color="#f0c432" metalness={0.25} roughness={0.35} />
    <Block position={[0, 0.05, -0.255]} size={[0.54, 0.1, 0.05]} color="#f0c432" metalness={0.25} roughness={0.35} />
    <Block position={[-0.255, 0.05, 0]} size={[0.05, 0.1, 0.54]} color="#d8a822" metalness={0.25} roughness={0.35} />
    <Block position={[0.255, 0.05, 0]} size={[0.05, 0.1, 0.54]} color="#d8a822" metalness={0.25} roughness={0.35} />
    {[
      [-0.22, 0.24],
      [0, 0.25],
      [0.22, 0.24],
      [-0.22, -0.24],
      [0, -0.25],
      [0.22, -0.24],
    ].map(([x, z], i) => (
      <Block key={i} position={[x!, 0.15, z!]} size={[0.08, 0.11, 0.08]} color="#ffda54" metalness={0.25} roughness={0.35} />
    ))}
    <Block position={[0, 0.055, 0.285]} size={[0.1, 0.07, 0.025]} color="#e53935" emissive="#e53935" emissiveIntensity={0.35} castShadow={false} />
  </group>
);

/** Crisp dark translucent Minecraft nameplate floating over a player head. */
export const ServerNameTag: React.FC<{
  text: string;
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  color?: string;
}> = ({ text, position = [0, 2.24, 0], rotationY, scale = 1, color = "#ffffff" }) => {
  const ref = useRef<THREE.Group>(null);
  const tex = useMemo(() => wordTexture(text), [text]);
  const { width: gw } = useMemo(() => wordBitmap(text), [text]);
  const textW = Math.max(0.42, ((gw + 4) / 11) * 0.21);
  const bgW = textW + 0.24;
  useFrame(({ camera }) => {
    if (rotationY === undefined && ref.current) {
      const wp = new THREE.Vector3();
      ref.current.getWorldPosition(wp);
      ref.current.rotation.y = Math.atan2(camera.position.x - wp.x, camera.position.z - wp.z);
    }
  });
  return (
    <group ref={ref} position={position} rotation={[0, rotationY ?? 0, 0]} scale={scale}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[bgW, 0.32]} />
        <meshBasicMaterial color="#0b0e16" transparent opacity={0.76} side={THREE.DoubleSide} fog={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[textW, 0.21]} />
        <meshBasicMaterial map={tex} color={color} transparent alphaTest={0.5} side={THREE.DoubleSide} toneMapped={false} fog={false} />
      </mesh>
    </group>
  );
};

export type BadgeKind = "!" | "?" | "heart" | "broken";

/** Floating 3D exclamation (`!`), question (`?`), heart, or broken badge that pops overhead on a cue word. */
export const BadgePop: React.FC<{
  kind?: BadgeKind;
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  popStart?: number;
  t?: number;
}> = ({ kind = "!", position = [0, 2.68, 0], rotationY, scale = 1, popStart, t }) => {
  const ref = useRef<THREE.Group>(null);
  const now = useFilmTime();
  const s = popStart !== undefined ? pop(t ?? now, popStart) : 1;
  useFrame(({ camera }) => {
    if (rotationY === undefined && ref.current) {
      const wp = new THREE.Vector3();
      ref.current.getWorldPosition(wp);
      ref.current.rotation.y = Math.atan2(camera.position.x - wp.x, camera.position.z - wp.z);
    }
  });
  if (s <= 0.01) return null;
  const color = kind === "!" ? "#ffd83b" : kind === "?" ? "#5cc8ff" : kind === "heart" ? "#ff4d6d" : "#ff4d3b";
  return (
    <group ref={ref} position={position} rotation={[0, rotationY ?? 0, 0]} scale={scale * s}>
      <Block position={[0, 0, -0.025]} size={[0.36, 0.42, 0.04]} color="#121622" />
      <Block position={[0, 0, -0.01]} size={[0.31, 0.37, 0.025]} color="#1f2536" castShadow={false} />
      {kind === "heart" ? (
        <Icon kind="heart" position={[0, 0, 0.03]} height={0.26} color={color} glow={0.55} shadow={false} />
      ) : kind === "broken" ? (
        <group position={[0, 0, 0.03]}>
          <Block position={[-0.06, 0.04, 0]} rotation={[0, 0, 0.32]} size={[0.1, 0.14, 0.04]} color={color} emissive={color} emissiveIntensity={0.45} castShadow={false} />
          <Block position={[0.06, 0.04, 0]} rotation={[0, 0, -0.32]} size={[0.1, 0.14, 0.04]} color={color} emissive={color} emissiveIntensity={0.45} castShadow={false} />
          <Block position={[0, -0.08, 0]} size={[0.06, 0.08, 0.04]} color={color} emissive={color} emissiveIntensity={0.45} castShadow={false} />
        </group>
      ) : (
        <Icon kind={kind === "!" ? "bang" : "question"} position={[0, 0, 0.03]} height={0.28} color={color} glow={0.6} shadow={false} />
      )}
      <Glow position={[0, 0, 0.08]} size={0.75} color={color} opacity={0.25} />
    </group>
  );
};

/** Animated falling 3D blue teardrops mounted onto head space (`+Z` face plane at `0.26`). */
export const TearDrops: React.FC<{ intensity?: number; t?: number }> = ({ intensity = 1, t }) => {
  const filmT = useFilmTime();
  if (intensity <= 0.05) return null;
  const clock = t ?? filmT;
  return (
    <group>
      {[-1, 1].map((side) =>
        [0, 1].map((drop) => {
          const cycle = (clock * 1.6 + drop * 0.5 + (side > 0 ? 0.22 : 0)) % 1;
          const y = -0.02 - cycle * 0.24;
          const x = side * 0.13;
          return (
            <Block
              key={`${side}${drop}`}
              position={[x, y, 0.265]}
              size={[0.042, 0.058, 0.02]}
              color="#6cd4ff"
              emissive="#47b8ff"
              emissiveIntensity={0.4 * intensity}
              opacity={0.9 * (1 - cycle * 0.65) * clamp01(intensity)}
              transparent
              castShadow={false}
            />
          );
        }),
      )}
    </group>
  );
};

/** Burst of rising glowing 3D hearts for wholesome community payoff scenes. */
export const FloatingHeart: React.FC<{
  position?: Vec3;
  count?: number;
  spread?: number;
  speed?: number;
  t?: number;
  seed?: number;
}> = ({ position = [0, 1.8, 0], count = 6, spread = 1.4, speed = 0.7, t, seed = 9 }) => {
  const filmT = useFilmTime();
  const clock = t ?? filmT;
  const items = useMemo(() => {
    const rand = mulberry32(seed * 211 + 5);
    return Array.from({ length: count }, () => ({
      x: (rand() - 0.5) * spread,
      z: (rand() - 0.5) * spread,
      phase: rand(),
      rate: 0.75 + rand() * 0.5,
      scale: 0.7 + rand() * 0.45,
    }));
  }, [count, spread, seed]);

  return (
    <group position={position}>
      {items.map((item, i) => {
        const k = (clock * speed * item.rate + item.phase) % 1;
        const fade = clamp01(k * 4) * clamp01((1 - k) * 3);
        if (fade <= 0.02) return null;
        return (
          <group key={i} position={[item.x + Math.sin(clock * 2 + i) * 0.1, k * 1.5, item.z]} scale={item.scale * fade}>
            <Icon kind="heart" height={0.28} color="#ff4a6e" glow={0.75} shadow={false} />
          </group>
        );
      })}
    </group>
  );
};

export type ServerPlayerProps = Partial<MinecraftAvatarProps> & {
  role?: ServerRoleName;
  nameTag?: string;
  nameTagColor?: string;
  nameTagYaw?: number;
  badge?: BadgeKind;
  badgePopStart?: number;
  tears?: number;
  crown?: boolean;
  torch?: boolean;
  light?: number;
  shirtColor?: string;
};

/** Primary character builder for Server Lore shorts — crisp skins, floating nametags, `!`/`?` badges, tears & torches. */
export const ServerPlayer: React.FC<ServerPlayerProps> = ({
  role = "friendA",
  nameTag,
  nameTagColor = "#ffffff",
  nameTagYaw,
  badge,
  badgePopStart,
  tears = 0,
  crown = false,
  torch = false,
  light = 0,
  shirtColor,
  head,
  torso,
  children,
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  ...rest
}) => {
  const spec = SERVER_ROLES[role];
  const shirt = shirtColor ?? spec.torso;
  const tagY = position[1] + (crown ? 2.42 : 2.22) * scale;
  const badgeY = position[1] + (nameTag ? 2.66 : crown ? 2.48 : 2.28) * scale;

  return (
    <group>
      <MinecraftAvatar
        position={position}
        rotationY={rotationY}
        scale={scale}
        outfit={spec.outfit}
        skin={spec.skin}
        hair={spec.hair}
        hairLayer
        colors={{
          torso: shirt,
          arms: spec.arms === "skin" ? "skin" : shirtColor ?? spec.arms,
          legs: spec.legs,
        }}
        shoes={spec.shoes}
        blink
        head={
          <>
            {crown ? <OwnerCrown /> : null}
            {tears > 0.05 ? <TearDrops intensity={tears} t={rest.time} /> : null}
            {head}
          </>
        }
        torso={
          <>
            {spec.accent ? <Block position={[0, 0.26, 0.132]} size={[0.16, 0.1, 0.014]} color={spec.accent} castShadow={false} /> : null}
            {torso}
          </>
        }
        {...rest}
      >
        {torch ? <Torch position={[0, -0.02, 0.06]} lean={[1.15, 0, 0]} light={light} seed={role.length + 5} /> : null}
        {children}
      </MinecraftAvatar>

      {nameTag ? (
        <ServerNameTag
          text={nameTag}
          position={[position[0], tagY, position[2]]}
          rotationY={nameTagYaw}
          scale={scale}
          color={role === "owner" ? "#ffd85a" : nameTagColor}
        />
      ) : null}

      {badge ? (
        <BadgePop
          kind={badge}
          position={[position[0], badgeY, position[2]]}
          rotationY={nameTagYaw}
          scale={scale}
          popStart={badgePopStart}
          t={rest.time}
        />
      ) : null}
    </group>
  );
};

/** Crowd of distinct SMP server members acting together in torches/rally/reaction scenes. */
export const ServerCrowd: React.FC<{
  members: Array<{
    role?: ServerRoleName;
    nameTag?: string;
    position: Vec3;
    rotationY?: number;
    animation?: MinecraftAvatarProps["animation"];
    animDistance?: number;
    face?: MinecraftAvatarProps["face"];
    torch?: boolean;
    badge?: BadgeKind;
  }>;
  nameTagYaw?: number;
  time?: number;
}> = ({ members, nameTagYaw = 0, time }) => (
  <>
    {members.map((m, i) => (
      <ServerPlayer
        key={i}
        role={m.role ?? (["friendA", "friendB", "friendC", "bully"] as ServerRoleName[])[i % 4]}
        nameTag={m.nameTag}
        nameTagYaw={nameTagYaw}
        position={m.position}
        rotationY={m.rotationY ?? 0}
        animation={m.animation ?? "idle"}
        animDistance={m.animDistance}
        face={m.face ?? "smile"}
        torch={m.torch}
        badge={m.badge}
        phase={i * 0.9}
        time={time}
      />
    ))}
  </>
);

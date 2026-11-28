import React from "react";
import { Block, Vox, Water } from "../../engine";
import type { Vec3 } from "../../engine";

/** Iconic Minecraft Totem of Undying (gold, carved oak wood, or peeling paint). */
export const TotemOfUndying: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  mode?: "gold" | "wood" | "peeling";
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, mode = "gold" }) => {
  const bodyColor = mode === "wood" ? "#9e7242" : "#f2c636";
  const wingColor = mode === "gold" ? "#f6d85a" : "#8b6036";
  const eyeColor = mode === "wood" ? "#4e341c" : "#2be362";
  const glow = mode === "gold" ? 0.25 : 0;

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Head & torso */}
      <Block position={[0, 0.26, 0]} size={[0.24, 0.22, 0.1]} color={bodyColor} emissive={bodyColor} emissiveIntensity={glow} />
      <Block position={[0, 0.04, 0]} size={[0.18, 0.22, 0.09]} color={mode === "peeling" ? "#9e7242" : bodyColor} emissive={bodyColor} emissiveIntensity={glow * 0.7} />
      {/* Outstretched wings */}
      <Block position={[-0.18, 0.14, 0]} size={[0.14, 0.1, 0.07]} color={wingColor} emissive={wingColor} emissiveIntensity={glow * 0.6} />
      <Block position={[0.18, 0.14, 0]} size={[0.14, 0.1, 0.07]} color={wingColor} emissive={wingColor} emissiveIntensity={glow * 0.6} />
      {/* Emerald eyes (flush on front z = +0.055) */}
      <Block position={[-0.055, 0.28, 0.055]} size={[0.045, 0.045, 0.01]} color={eyeColor} emissive={eyeColor} emissiveIntensity={mode === "gold" ? 0.55 : 0} />
      <Block position={[0.055, 0.28, 0.055]} size={[0.045, 0.045, 0.01]} color={eyeColor} emissive={eyeColor} emissiveIntensity={mode === "gold" ? 0.55 : 0} />
    </group>
  );
};

/** Green-and-gold Totem of Undying pop particle burst. */
export const TotemBurst: React.FC<{ position: Vec3; progress: number }> = ({ position, progress }) => {
  if (progress <= 0 || progress >= 1) return null;
  const p = progress;
  const spread = 0.4 + p * 2.2;
  const fade = Math.max(0, 1 - p);
  const dirs: Vec3[] = [
    [1, 0.9, 0.4], [-1, 1.1, 0.3], [0.5, 1.4, -0.9], [-0.6, 0.7, -1],
    [0.9, 0.3, -0.7], [-0.9, 1.3, 0.8], [0, 1.7, 0.5], [0.4, 0.5, 1.1],
    [-0.4, 1.5, -0.4], [1.1, 1.1, -0.2],
  ];
  return (
    <group position={position}>
      {dirs.map((d, i) => (
        <Block
          key={i}
          position={[d[0] * spread, d[1] * spread + 0.4, d[2] * spread]}
          size={[0.18 * fade + 0.04, 0.18 * fade + 0.04, 0.18 * fade + 0.04]}
          color={i % 2 === 0 ? "#4be86b" : "#ffdb4d"}
          emissive={i % 2 === 0 ? "#35d455" : "#ffca28"}
          emissiveIntensity={0.45 * fade}
          castShadow={false}
        />
      ))}
    </group>
  );
};

/** Classic 3-iron Minecraft Water Bucket with bright blue water inside. */
export const WaterBucket: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.14, 0]} size={[0.3, 0.28, 0.3]} color="#b4bcc6" metalness={0.35} roughness={0.5} />
    <Block position={[0, 0.285, 0]} size={[0.24, 0.02, 0.24]} color="#2f9bf0" emissive="#1c7ed6" emissiveIntensity={0.22} />
    <Block position={[0, 0.34, 0]} size={[0.32, 0.04, 0.04]} color="#8d96a0" />
  </group>
);

/** Expanding MLG Water Bucket splash pool + spray droplets. */
export const WaterSplashPool: React.FC<{
  position?: Vec3;
  progress: number;
  maxRadius?: number;
}> = ({ position = [0, 0, 0], progress, maxRadius = 6.5 }) => {
  if (progress <= 0) return null;
  const r = Math.min(maxRadius, 0.8 + progress * (maxRadius - 0.8));
  const sprayP = Math.min(1, progress * 1.4);
  const sprayFade = Math.max(0, 1 - sprayP);
  return (
    <group position={position}>
      <Water position={[0, 0.04, 0]} size={[r * 2, 0.06, r * 2]} />
      {sprayFade > 0.05
        ? [-1.6, -0.8, 0.8, 1.6, -1.2, 1.2].map((dx, i) => (
            <Block
              key={i}
              position={[dx * (0.6 + sprayP * 1.6), 0.3 + Math.sin(sprayP * Math.PI) * (1.8 + (i % 3) * 0.5), (i % 2 === 0 ? 1 : -1) * (0.5 + sprayP * 1.5)]}
              size={[0.22, 0.22, 0.22]}
              color={i % 2 === 0 ? "#6ec6ff" : "#e3f4ff"}
              opacity={0.85 * sprayFade}
              transparent
              castShadow={false}
            />
          ))
        : null}
    </group>
  );
};

/** Glass jar on the home shelf holding Dad's cracked gold Totem wing. */
export const GlassJarWing: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {/* Cork base & lid */}
    <Vox kind="darkPlanks" position={[0, 0.03, 0]} size={[0.36, 0.06, 0.36]} />
    <Vox kind="planks" position={[0, 0.45, 0]} size={[0.28, 0.08, 0.28]} />
    {/* Translucent glass cylinder/box */}
    <Block position={[0, 0.24, 0]} size={[0.32, 0.36, 0.32]} color="#d8f0ff" opacity={0.38} transparent castShadow={false} />
    {/* Cracked gold Totem wing inside */}
    <Block position={[0, 0.2, 0]} rotation={[0.1, 0.3, 0.28]} size={[0.2, 0.12, 0.07]} color="#f2c636" emissive="#e0a81e" emissiveIntensity={0.28} />
    <Block position={[0.03, 0.21, 0.038]} rotation={[0.1, 0.3, -0.4]} size={[0.025, 0.11, 0.01]} color="#2b2012" />
  </group>
);

/** Crisp white bandage wrapped around Dad's left hand/forearm. */
export const Bandage: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <Block position={position} size={[0.24, 0.28, 0.24]} color="#f0efe9" />
);

/** Blocky pink Minecraft Pig for Mr. Vex's muddy pig pen karma. */
export const PigProp: React.FC<{ position?: Vec3; rotationY?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Legs (bottom y = 0.0, top y = 0.36) */}
    {[-0.2, 0.2].map((lx) =>
      [-0.32, 0.32].map((lz) => (
        <Block key={`${lx}_${lz}`} position={[lx, 0.18, lz]} size={[0.18, 0.36, 0.18]} color="#e898a8" />
      )),
    )}
    {/* Body */}
    <Block position={[0, 0.56, 0]} size={[0.62, 0.46, 0.96]} color="#f2a8b8" />
    {/* Head & snout */}
    <Block position={[0, 0.68, 0.62]} size={[0.48, 0.46, 0.44]} color="#f4b2c0" />
    <Block position={[0, 0.6, 0.86]} size={[0.24, 0.16, 0.08]} color="#e0889c" />
    <Block position={[-0.14, 0.74, 0.845]} size={[0.08, 0.08, 0.01]} color="#1b1b1b" />
    <Block position={[0.14, 0.74, 0.845]} size={[0.08, 0.08, 0.01]} color="#1b1b1b" />
  </group>
);

/** Grounded 14-block Stone-Brick Clocktower for the bright daylight Hook. */
export const ClockTower: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {/* Stone base (bottom 0.0, top 11.0) */}
    <Vox kind="stoneBrick" position={[0, 5.5, 0]} size={[3.6, 11.0, 3.6]} />
    {/* Timber belfry posts (bottom 11.0, top 13.4) */}
    {[-1.5, 1.5].map((x) =>
      [-1.5, 1.5].map((z) => (
        <Vox key={`${x}_${z}`} kind="darkPlanks" position={[x, 12.2, z]} size={[0.45, 2.4, 0.45]} />
      )),
    )}
    {/* Hanging golden bell */}
    <Block position={[0, 12.2, 0]} size={[0.9, 1.0, 0.9]} color="#f2c438" emissive="#d9a01c" emissiveIntensity={0.18} />
    {/* Stepped dark-oak roof cap */}
    <Vox kind="darkPlanks" position={[0, 13.7, 0]} size={[4.2, 0.6, 4.2]} />
    <Vox kind="darkPlanks" position={[0, 14.3, 0]} size={[2.6, 0.6, 2.6]} />
    {/* Clock face mounted flush on front wall (z = 1.80) */}
    <Block position={[0, 9.0, 1.85]} size={[1.8, 1.8, 0.1]} color="#e8e2d0" />
    <Block position={[0, 9.25, 1.91]} size={[0.12, 0.65, 0.02]} color="#1c1c1e" />
    <Block position={[0.25, 9.0, 1.91]} size={[0.55, 0.12, 0.02]} color="#1c1c1e" />
  </group>
);

/** Stone-brick Lava Fountain for the Mailman shortcut gag. */
export const LavaFountain: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {/* Outer stone rim (4 non-overlapping walls, bottom 0.0, top 0.7) */}
    <Vox kind="stoneBrick" position={[0, 0.35, -1.3]} size={[3.0, 0.7, 0.4]} />
    <Vox kind="stoneBrick" position={[0, 0.35, 1.3]} size={[3.0, 0.7, 0.4]} />
    <Vox kind="stoneBrick" position={[-1.3, 0.35, 0]} size={[0.4, 0.7, 2.2]} />
    <Vox kind="stoneBrick" position={[1.3, 0.35, 0]} size={[0.4, 0.7, 2.2]} />
    {/* Glowing lava pool inside */}
    <Vox kind="lava" position={[0, 0.28, 0]} size={[2.2, 0.54, 2.2]} emissive="#ff5a14" emissiveIntensity={0.65} />
  </group>
);

/** Fenced Muddy Pig Pen at the canyon base for Mr. Vex's instant karma. */
export const MuddyPigPen: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {/* Mud slab (thin slab, auto polygonOffset) */}
    <Block position={[0, 0.04, 0]} size={[5.4, 0.08, 4.6]} color="#543c26" />
    {/* Wooden fence rails */}
    <Vox kind="planks" position={[0, 0.5, -2.35]} size={[5.6, 0.9, 0.2]} />
    <Vox kind="planks" position={[0, 0.5, 2.35]} size={[5.6, 0.9, 0.2]} />
    <Vox kind="planks" position={[-2.75, 0.5, 0]} size={[0.2, 0.9, 4.5]} />
    <Vox kind="planks" position={[2.75, 0.5, 0]} size={[0.2, 0.9, 4.5]} />
    {/* 3 happy pigs */}
    <PigProp position={[-1.2, 0.08, -0.6]} rotationY={0.5} />
    <PigProp position={[1.3, 0.08, 0.4]} rotationY={-0.8} />
    <PigProp position={[-0.2, 0.08, 1.1]} rotationY={2.4} />
  </group>
);

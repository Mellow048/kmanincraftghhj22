import React from "react";
import { Block, Vox } from "../../engine";
import type { Vec3 } from "../../engine";

/** Golden Founder Crest medallion (worn on skeleton & carried back to town). */
export const FounderCrest: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.16, 0]} size={[0.26, 0.3, 0.08]} color="#f2c438" emissive="#d9a01c" emissiveIntensity={0.28} />
    <Block position={[0, 0.18, 0.045]} size={[0.12, 0.14, 0.01]} color="#3b82f6" emissive="#2563eb" emissiveIntensity={0.35} />
  </group>
);

/** Seated dusty Minecraft skeleton of the town founder beside a rusted pickaxe. */
export const FounderSkeleton: React.FC<{ position?: Vec3; rotationY?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Seated bone legs (bottom y = 0.0) */}
    <Block position={[-0.14, 0.14, 0.28]} size={[0.14, 0.14, 0.56]} color="#d6d4cc" />
    <Block position={[0.14, 0.14, 0.28]} size={[0.14, 0.14, 0.56]} color="#d6d4cc" />
    {/* Ribcage torso */}
    <Block position={[0, 0.48, 0]} size={[0.42, 0.56, 0.22]} color="#cccac2" />
    {/* Founder crest pinned to chest */}
    <FounderCrest position={[0, 0.36, 0.13]} scale={0.75} />
    {/* Tilted skull */}
    <group position={[0, 0.94, 0.04]} rotation={[0.22, 0.18, -0.15]}>
      <Block position={[0, 0, 0]} size={[0.42, 0.42, 0.42]} color="#dfddd5" />
      <Block position={[-0.1, 0.02, 0.215]} size={[0.1, 0.08, 0.01]} color="#1c1c1e" />
      <Block position={[0.1, 0.02, 0.215]} size={[0.1, 0.08, 0.01]} color="#1c1c1e" />
      <Block position={[0, -0.1, 0.215]} size={[0.18, 0.06, 0.01]} color="#2b2b2e" />
    </group>
    {/* Rusted iron pickaxe resting on stone beside him */}
    <group position={[0.55, 0.06, 0.25]} rotation={[0, 0.4, 0.2]}>
      <Block position={[0, 0, 0]} size={[0.06, 0.06, 0.65]} color="#6b4a2b" />
      <Block position={[0, 0, 0.32]} size={[0.46, 0.08, 0.08]} color="#7e6656" />
    </group>
  </group>
);

/** Handheld glowing oak torch carried by the narrator into the dark cave. */
export const HandTorch: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Vox kind="darkPlanks" position={[0, 0.2, 0]} size={[0.08, 0.4, 0.08]} />
    <Block position={[0, 0.44, 0]} size={[0.11, 0.11, 0.11]} color="#ffd43b" emissive="#ff922b" emissiveIntensity={0.85} />
  </group>
);

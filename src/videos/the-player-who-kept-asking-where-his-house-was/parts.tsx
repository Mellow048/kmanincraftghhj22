import React from "react";
import { Block, Sign, Vox } from "../../engine";
import type { Vec3 } from "../../engine";

/** Arthur's SMP cottage whose roof transforms: bright blue wool -> grey cobble prank -> glowing blue wool. */
export const BlueRoofCottage: React.FC<{
  position?: Vec3;
  rotationY?: number;
  roofMode?: "blue" | "cobble" | "glowing";
}> = ({ position = [0, 0, 0], rotationY = Math.PI, roofMode = "blue" }) => {
  const roofColor = roofMode === "cobble" ? "#7e828a" : roofMode === "glowing" ? "#339af0" : "#228be6";
  const roofGlow = roofMode === "glowing" ? 0.35 : 0;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Cozy oak & cobble cottage walls (bottom y = 0.0, top y = 3.2) */}
      <Vox kind="cobble" position={[0, 0.45, 0]} size={[5.4, 0.9, 4.6]} />
      <Vox kind="planks" position={[0, 2.05, 0]} size={[5.2, 2.3, 4.4]} />
      {/* Front oak door flush on z = 2.22 */}
      <Vox kind="darkPlanks" position={[0, 1.1, 2.25]} size={[1.1, 2.2, 0.12]} />
      {/* Warm windows */}
      <Block position={[-1.6, 1.8, 2.24]} size={[1.0, 1.0, 0.08]} color="#ffd880" emissive="#ffb84d" emissiveIntensity={0.4} />
      <Block position={[1.6, 1.8, 2.24]} size={[1.0, 1.0, 0.08]} color="#ffd880" emissive="#ffb84d" emissiveIntensity={0.4} />
      {/* Stepped roof (non-overlapping layers, bottom y = 3.2) */}
      <Block position={[0, 3.55, 0]} size={[6.0, 0.7, 5.2]} color={roofColor} emissive={roofMode === "glowing" ? "#228be6" : undefined} emissiveIntensity={roofGlow} />
      <Block position={[0, 4.2, 0]} size={[4.2, 0.6, 4.4]} color={roofColor} emissive={roofMode === "glowing" ? "#228be6" : undefined} emissiveIntensity={roofGlow} />
      <Block position={[0, 4.75, 0]} size={[2.2, 0.5, 3.6]} color={roofColor} emissive={roofMode === "glowing" ? "#228be6" : undefined} emissiveIntensity={roofGlow} />
    </group>
  );
};

/** Vanilla Minecraft Lodestone block with subtle purple compass lock glow. */
export const LodestoneBlock: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Vox kind="stoneBrick" position={[0, 0.5, 0]} size={[1.0, 1.0, 1.0]} />
    <Block position={[0, 0.5, 0.51]} size={[0.56, 0.56, 0.02]} color="#5c5f66" />
    <Block position={[0, 0.5, 0.525]} size={[0.26, 0.26, 0.01]} color="#b197fc" emissive="#9775fa" emissiveIntensity={0.55} />
  </group>
);

/** Glowing purple Enchanted Lodestone Compass with bright red homing needle. */
export const EnchantedCompass: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.14, 0]} size={[0.3, 0.3, 0.08]} color="#9775fa" emissive="#7950f2" emissiveIntensity={0.45} />
    <Block position={[0, 0.14, 0.045]} size={[0.2, 0.2, 0.01]} color="#212529" />
    <Block position={[0, 0.18, 0.055]} size={[0.045, 0.12, 0.01]} color="#ff4f42" emissive="#ff3b30" emissiveIntensity={0.55} />
  </group>
);

/** Glowing blue wool & sea-lantern highway leading from Spawn straight to Arthur's porch. */
export const BlueLanternRoad: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Block position={[0, 0.03, 0]} size={[2.2, 0.06, 12.0]} color="#228be6" />
    {[-4.5, -1.5, 1.5, 4.5].map((z, i) => (
      <group key={i}>
        <Vox kind="darkPlanks" position={[-1.4, 0.75, z]} size={[0.18, 1.5, 0.18]} />
        <Block position={[-1.4, 1.68, z]} size={[0.36, 0.36, 0.36]} color="#74c0fc" emissive="#339af0" emissiveIntensity={0.65} />
        <Vox kind="darkPlanks" position={[1.4, 0.75, z]} size={[0.18, 1.5, 0.18]} />
        <Block position={[1.4, 1.68, z]} size={[0.36, 0.36, 0.36]} color="#74c0fc" emissive="#339af0" emissiveIntensity={0.65} />
      </group>
    ))}
  </group>
);

/** Wooden trail sign placed by Arthur along the road from Spawn. */
export const TrailSign: React.FC<{ position?: Vec3; title?: string }> = ({
  position = [0, 0, 0],
  title = "MY HOUSE ->",
}) => (
  <group position={position}>
    <Vox kind="darkPlanks" position={[0, 0.55, -0.04]} size={[0.16, 1.1, 0.16]} />
    <Sign title={title} position={[0, 1.32, 0]} width={1.8} height={0.48} />
  </group>
);

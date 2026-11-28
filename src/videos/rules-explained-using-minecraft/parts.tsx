import React from "react";
import { Block, Vox } from "../../engine";
import type { Vec3 } from "../../engine";

/** Iconic Minecraft Spawn Chest (intact, broken into planks, or secured with an iron lock). */
export const SpawnChest: React.FC<{
  position?: Vec3;
  broken?: boolean;
  locked?: boolean;
  scale?: number;
}> = ({ position = [0, 0, 0], broken = false, locked = false, scale = 1 }) => (
  <group position={position} scale={scale}>
    {broken ? (
      <>
        {/* Shattered oak planks & dropped cyan diamond gear */}
        <Vox kind="planks" position={[-0.38, 0.12, 0.1]} rotation={[0.2, 0.4, 0.3]} size={[0.5, 0.16, 0.28]} />
        <Vox kind="planks" position={[0.35, 0.14, -0.15]} rotation={[-0.2, -0.5, -0.25]} size={[0.52, 0.16, 0.28]} />
        <Vox kind="darkPlanks" position={[0.05, 0.1, 0.35]} rotation={[0.1, 0.9, 0.15]} size={[0.45, 0.14, 0.22]} />
        <Block position={[-0.12, 0.14, -0.05]} size={[0.2, 0.2, 0.2]} color="#38d9e8" emissive="#22b8cf" emissiveIntensity={0.28} />
        <Block position={[0.22, 0.12, 0.18]} size={[0.18, 0.18, 0.18]} color="#ffd43b" />
      </>
    ) : (
      <>
        <Vox kind="planks" position={[0, 0.44, 0]} size={[0.96, 0.88, 0.96]} />
        <Block position={[0, 0.62, 0.485]} size={[0.98, 0.06, 0.02]} color="#25201b" />
        {/* Latch or gleaming iron padlock */}
        {locked ? (
          <group position={[0, 0.56, 0.52]}>
            <Block position={[0, 0, 0]} size={[0.24, 0.26, 0.08]} color="#adb5bd" metalness={0.4} roughness={0.4} />
            <Block position={[0, 0.18, 0]} size={[0.16, 0.12, 0.06]} color="#dee2e6" />
          </group>
        ) : (
          <Block position={[0, 0.58, 0.5]} size={[0.14, 0.22, 0.06]} color="#cfd6de" />
        )}
      </>
    )}
  </group>
);

/** Grid of spawn chests where iron locks snap shut progressively. */
export const LockedChestGrid: React.FC<{ position?: Vec3; locked?: boolean }> = ({
  position = [0, 0, 0],
  locked = true,
}) => (
  <group position={position}>
    {[-2.4, -1.2, 0, 1.2, 2.4].map((x) =>
      [-1.2, 0.4].map((z) => (
        <SpawnChest key={`${x}_${z}`} position={[x, 0, z]} locked={locked} scale={0.82} />
      )),
    )}
  </group>
);

/** Glowing Red-and-Iron Ban Hammer wielded by Mods. */
export const BanHammer: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Vox kind="darkPlanks" position={[0, 0.28, 0]} size={[0.09, 0.56, 0.09]} />
    <Block position={[0, 0.62, 0]} size={[0.46, 0.24, 0.24]} color="#e03131" emissive="#c92a2a" emissiveIntensity={0.35} />
    <Block position={[-0.25, 0.62, 0]} size={[0.06, 0.26, 0.26]} color="#ced4da" />
    <Block position={[0.25, 0.62, 0]} size={[0.06, 0.26, 0.26]} color="#ced4da" />
  </group>
);

/** Crisp white paper airplane flying across the classroom for the real-world bridge. */
export const PaperAirplane: React.FC<{ position?: Vec3; rotationY?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0, 0]} size={[0.46, 0.04, 0.58]} color="#f8f9fa" />
    <Block position={[0, -0.05, 0]} size={[0.05, 0.1, 0.54]} color="#dee2e6" />
  </group>
);

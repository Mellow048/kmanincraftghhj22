import React from "react";
import { Block, Vox } from "../../engine";
import type { Vec3 } from "../../engine";

/** Iconic swooping blue-grey Minecraft Phantom with glowing green eyes & animated wings. */
export const PhantomMob: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  time?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, time = 0 }) => {
  const flap = Math.sin(time * 9.5) * 0.38;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Sleek dark-blue phantom body & tail */}
      <Block position={[0, 0, 0]} size={[0.52, 0.24, 0.96]} color="#3b4d78" />
      <Block position={[0, 0, -0.78]} size={[0.24, 0.14, 0.65]} color="#2f3f66" />
      {/* Glowing green phantom eyes flush on front z = 0.485 */}
      <Block position={[-0.14, 0.02, 0.485]} size={[0.12, 0.08, 0.01]} color="#55ff55" emissive="#40e040" emissiveIntensity={0.85} />
      <Block position={[0.14, 0.02, 0.485]} size={[0.12, 0.08, 0.01]} color="#55ff55" emissive="#40e040" emissiveIntensity={0.85} />
      {/* Animated wide wings */}
      <group position={[-0.26, 0.04, 0.08]} rotation={[0, 0, flap]}>
        <Block position={[-0.62, 0, 0]} size={[1.2, 0.08, 0.66]} color="#4a6091" />
      </group>
      <group position={[0.26, 0.04, 0.08]} rotation={[0, 0, -flap]}>
        <Block position={[0.62, 0, 0]} size={[1.2, 0.08, 0.66]} color="#4a6091" />
      </group>
    </group>
  );
};

/** Glowing cyan Minecraft Diamond Sword held by the big brother defending his brother's cabin. */
export const DiamondSword: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Vox kind="darkPlanks" position={[0, 0.12, 0]} size={[0.07, 0.24, 0.07]} />
    <Block position={[0, 0.26, 0]} size={[0.3, 0.07, 0.08]} color="#22b8cf" />
    <Block position={[0, 0.62, 0]} size={[0.12, 0.66, 0.05]} color="#38d9e8" emissive="#22b8cf" emissiveIntensity={0.3} />
  </group>
);

/** Classic Minecraft Bed with oak frame, white pillow, and colored blanket. */
export const MinecraftBed: React.FC<{
  position?: Vec3;
  rotationY?: number;
  color?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, color = "#e03131" }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Wooden legs & base (bottom y = 0.0, top y = 0.36) */}
    <Vox kind="planks" position={[0, 0.18, 0]} size={[1.0, 0.36, 1.9]} />
    {/* Blanket mattress (bottom y = 0.36, top y = 0.56) */}
    <Block position={[0, 0.46, 0.25]} size={[0.98, 0.2, 1.38]} color={color} />
    {/* White pillow (bottom y = 0.36, top y = 0.58) */}
    <Block position={[0, 0.47, -0.68]} size={[0.96, 0.22, 0.48]} color="#f8f9fa" />
  </group>
);

/** Screenshot-worthy 50-Bed Server Sleep Hall filled with rows of colorful beds! */
export const FiftyBedsHall: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => {
  const colors = ["#e03131", "#228be6", "#40c057", "#fab005", "#ae3ec9", "#fd7e14", "#15aabf"];
  const xs = [-5.4, -3.6, -1.8, 0, 1.8, 3.6, 5.4];
  const zs = [-3.6, -1.2, 1.2, 3.6];
  let idx = 0;
  return (
    <group position={position}>
      {/* Grand wooden hall floor & non-overlapping walls */}
      <Vox kind="planks" position={[0, -0.15, 0]} size={[15.0, 0.3, 13.0]} />
      <Vox kind="darkPlanks" position={[0, 2.4, -6.35]} size={[15.0, 4.8, 0.3]} />
      <Vox kind="darkPlanks" position={[-7.35, 2.4, 0.15]} size={[0.3, 4.8, 12.7]} />
      <Vox kind="darkPlanks" position={[7.35, 2.4, 0.15]} size={[0.3, 4.8, 12.7]} />
      {/* Rows of bright colorful beds */}
      {zs.map((z) =>
        xs.map((x) => {
          const c = colors[idx++ % colors.length];
          return <MinecraftBed key={`${x}_${z}`} position={[x, 0, z]} color={c} />;
        }),
      )}
    </group>
  );
};

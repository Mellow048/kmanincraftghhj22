import React from "react";
import { Block, Vox } from "../../engine";
import type { Vec3 } from "../../engine";

/** Iconic Minecraft Cake whose width physically shrinks from 7 slices down to 1 slice! */
export const MinecraftCake: React.FC<{
  position?: Vec3;
  slices?: number;
  scale?: number;
}> = ({ position = [0, 0, 0], slices = 7, scale = 1 }) => {
  const s = Math.max(1, Math.min(7, Math.round(slices)));
  const w = (s / 7) * 0.92;
  const cherries = Math.max(1, Math.ceil(s / 2));
  return (
    <group position={position} scale={scale}>
      {/* Sponge cake base (bottom y = 0.0, top y = 0.36) */}
      <Block position={[0, 0.18, 0]} size={[w, 0.36, 0.92]} color="#c9884c" />
      {/* White icing top (bottom y = 0.36, top y = 0.44) */}
      <Block position={[0, 0.4, 0]} size={[w + 0.02, 0.08, 0.94]} color="#f5f3ee" />
      {/* Red cherries on top (bottom y = 0.44, top y = 0.49) */}
      {Array.from({ length: cherries }, (_, i) => {
        const cx = cherries === 1 ? 0 : -w * 0.32 + (i / (cherries - 1)) * w * 0.64;
        return (
          <Block
            key={i}
            position={[cx, 0.465, (i % 2 === 0 ? 1 : -1) * 0.16]}
            size={[0.1, 0.05, 0.1]}
            color="#d92b2b"
          />
        );
      })}
    </group>
  );
};

/** Giant red-and-white bakery box whose lid lifts to expose how tiny the cake inside really is. */
export const ShinyCakeBox: React.FC<{
  position?: Vec3;
  lidOpen?: number;
  tall?: boolean;
  slices?: number;
}> = ({ position = [0, 0, 0], lidOpen = 0, tall = false, slices = 1 }) => {
  const h = tall ? 1.05 : 0.72;
  const open = Math.max(0, Math.min(1, lidOpen));
  return (
    <group position={position}>
      {/* Open-front hollow box walls (bottom y = 0.0, top y = h) */}
      <Block position={[0, 0.03, 0]} size={[1.3, 0.06, 1.3]} color="#f2efe9" />
      <Block position={[0, h / 2, -0.62]} size={[1.3, h, 0.06]} color="#d93829" />
      <Block position={[-0.62, h / 2, 0.03]} size={[0.06, h, 1.24]} color="#f2efe9" />
      <Block position={[0.62, h / 2, 0.03]} size={[0.06, h, 1.24]} color="#f2efe9" />
      {/* Cake sitting cleanly inside on bottom slab y = 0.06 */}
      <MinecraftCake position={[0, 0.06, 0]} slices={slices} />
      {/* Liftable red-and-gold lid */}
      <group position={[0, h + 0.04 + open * 0.58, -open * 0.18]} rotation={[-open * 0.35, 0, 0]}>
        <Block position={[0, 0, 0]} size={[1.38, 0.1, 1.38]} color="#d93829" />
        <Block position={[0, 0.07, 0]} size={[0.3, 0.06, 0.3]} color="#ffd43b" />
      </group>
    </group>
  );
};

/** Real-world grocery aisle shelf with half-empty chip bag, shrunken cereal box & thinner candy bar. */
export const GroceryShelf: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Vox kind="stoneBrick" position={[0, 1.6, -0.45]} size={[6.4, 3.2, 0.25]} />
    {[0.8, 1.75, 2.7].map((sy, i) => (
      <Vox key={i} kind="planks" position={[0, sy, 0.1]} size={[6.2, 0.12, 0.85]} />
    ))}
    {/* Half-empty chip bag (left, upper half translucent air!) */}
    <group position={[-1.9, 1.81, 0.15]}>
      <Block position={[0, 0.2, 0]} size={[0.62, 0.4, 0.34]} color="#f5c63b" />
      <Block position={[0, 0.62, 0]} size={[0.62, 0.44, 0.34]} color="#e6f2ff" opacity={0.35} transparent castShadow={false} />
    </group>
    {/* Smaller cereal box (center) */}
    <group position={[0, 1.81, 0.15]}>
      <Block position={[0, 0.36, 0]} size={[0.56, 0.72, 0.22]} color="#2b8ae0" />
      <Block position={[0, 0.42, 0.115]} size={[0.36, 0.24, 0.01]} color="#ffd43b" />
    </group>
    {/* Thinner candy bar (right) */}
    <group position={[1.9, 1.81, 0.15]}>
      <Block position={[0, 0.1, 0]} size={[0.85, 0.14, 0.34]} color="#7a3e1c" />
      <Block position={[0, 0.1, 0.175]} size={[0.52, 0.1, 0.01]} color="#d93829" />
    </group>
  </group>
);

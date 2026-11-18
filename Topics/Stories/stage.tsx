import type React from "react";
import { Block, Glow, PixelText, Vox, mulberry32 } from "../../src/engine";
import type { BlockKind, Vec3 } from "../../src/engine";

/**
 * THE STAGE — where an explainer happens.
 *
 * An explainer is a row of small places in one sky. Each place holds ONE idea, and the camera flies from
 * one to the next. A floating island is the Minecraft way to say "this is one thing, on its own": it has
 * an edge, so the frame has an edge, and there is sky between it and the next idea.
 *
 * Part of the Explainer pack (PACK.md). 1 unit = 1 block = 1 metre.
 */

/**
 * A floating island. `position` is the middle of its TOP: stand people and things on `position[1]`.
 * Grass on top, earth under it, rock under that, and a few stones hanging. `seed` changes its underside.
 *
 *   <Island position={[16, 0, -3]} size={[9, 7]} seed={2} />
 *   <Island position={[32, 2, 0]} size={[8, 8]} top="sand" under="sand" />      a beach, two blocks higher
 */
export const Island: React.FC<{
  position?: Vec3;
  /** Width (x) and depth (z) of the top, in blocks. */
  size?: [number, number];
  /** Layers of earth and rock under the top. */
  layers?: number;
  top?: BlockKind;
  under?: BlockKind;
  rock?: BlockKind;
  tint?: string;
  seed?: number;
}> = ({ position = [0, 0, 0], size = [9, 7], layers = 3, top = "grass", under = "dirt", rock = "stone", tint, seed = 1 }) => {
  const rand = mulberry32(seed * 7919 + 13);
  const [w, d] = size;
  const below = Array.from({ length: layers }, (_, i) => {
    const shrink = 1 - (i + 1) * (0.62 / layers) - rand() * 0.06;
    return {
      size: [Math.max(1, w * shrink), i === layers - 1 ? 0.8 : 1, Math.max(1, d * shrink)] as Vec3,
      offset: [(rand() - 0.5) * w * 0.12, -1 - i - (i === layers - 1 ? -0.1 : 0), (rand() - 0.5) * d * 0.12] as Vec3,
      kind: i === 0 ? under : rock,
    };
  });
  const last = below[below.length - 1];
  const hanging = Array.from({ length: 3 }, () => ({
    at: [last.offset[0] + (rand() - 0.5) * last.size[0] * 0.7, last.offset[1] - 0.6 - rand() * 0.5, last.offset[2] + (rand() - 0.5) * last.size[2] * 0.7] as Vec3,
    size: [0.5 + rand() * 0.5, 0.6 + rand() * 0.9, 0.5 + rand() * 0.5] as Vec3,
  }));
  return (
    <group position={position}>
      <Vox kind={top} side={top === "grass" ? under : undefined} tint={tint} position={[0, -0.5, 0]} size={[w, 1, d]} />
      {below.map((layer, i) => (
        <Vox key={i} kind={layer.kind} position={[layer.offset[0], layer.offset[1] - 0.5 + (1 - layer.size[1]) / 2, layer.offset[2]]} size={layer.size} />
      ))}
      {hanging.map((stone, i) => (
        <Vox key={`h${i}`} kind={rock} position={stone.at} size={stone.size} />
      ))}
    </group>
  );
};

/** The square sun of a Minecraft sky. Put it far away and high: it is a picture of a sun, not the light. */
export const Sun: React.FC<{ position?: Vec3; size?: number; color?: string }> = ({ position = [-40, 46, -70], size = 9, color = "#fff3b0" }) => (
  <group position={position}>
    <Block size={[size, size, 0.5]} color={color} emissive={color} emissiveIntensity={1.4} castShadow={false} receiveShadow={false} />
    <Glow position={[0, 0, 1]} size={size * 3.2} color="#fff0b8" opacity={0.5} />
  </group>
);

/**
 * A stone pedestal for ONE thing shown on its own: a coin, a loaf, a key. Its top is `height` over `position`.
 *
 *   <Plinth position={[0, 0, 0]} height={1} />
 *   <Coin position={[0, 1.35, 0]} />
 */
export const Plinth: React.FC<{ position?: Vec3; height?: number; width?: number; kind?: BlockKind }> = ({ position = [0, 0, 0], height = 1, width = 0.8, kind = "stoneBrick" }) => (
  <group position={position}>
    <Vox kind={kind} position={[0, 0.1, 0]} size={[width + 0.3, 0.2, width + 0.3]} />
    <Vox kind={kind} position={[0, height / 2, 0]} size={[width, height - 0.3, width]} />
    <Vox kind={kind} position={[0, height - 0.08, 0]} size={[width + 0.2, 0.16, width + 0.2]} />
  </group>
);

/**
 * A wooden signpost: the NAME of a place, in the world. It faces +Z; turn it with `rotationY` to face the camera.
 * Keep it to one or two short words: the captions carry the sentence.
 */
export const Signpost: React.FC<{ text: string; position?: Vec3; rotationY?: number; height?: number; width?: number; color?: string }> = ({
  text,
  position = [0, 0, 0],
  rotationY = 0,
  height = 1.9,
  width,
  color = "#fff4d6",
}) => {
  const w = width ?? Math.max(1.1, 0.34 + text.length * 0.26);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Vox kind="log" position={[0, height / 2, 0]} size={[0.16, height, 0.16]} />
      <Vox kind="planks" position={[0, height - 0.32, 0.1]} size={[w, 0.58, 0.08]} />
      <Block position={[0, height - 0.32, 0.135]} size={[w - 0.12, 0.46, 0.02]} color="#8a6a3a" castShadow={false} />
      <PixelText text={text} position={[0, height - 0.32, 0.15]} height={0.36} maxWidth={w - 0.22} color={color} />
    </group>
  );
};

/**
 * A wooden bridge of planks between two points at the same height: use it when two ideas are joined
 * ("so the baker pays more, so…"). It is 1.4 wide and has a rope rail on each side.
 */
export const Bridge: React.FC<{ from: Vec3; to: Vec3 }> = ({ from, to }) => {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.hypot(dx, dz);
  const posts = Math.max(2, Math.round(length / 2) + 1);
  return (
    <group position={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2]} rotation={[0, Math.atan2(dx, dz), 0]}>
      <Vox kind="planks" position={[0, -0.09, 0]} size={[1.4, 0.18, length]} />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Block position={[side * 0.66, 0.78, 0]} size={[0.05, 0.05, length]} color="#6a4a2a" castShadow={false} />
          {Array.from({ length: posts }, (_, i) => (
            <Vox key={i} kind="log" position={[side * 0.66, 0.4, -length / 2 + (length * i) / (posts - 1)]} size={[0.12, 0.8, 0.12]} />
          ))}
        </group>
      ))}
    </group>
  );
};

import * as THREE from "three";
import type React from "react";
import { useFilmTime } from "./defineFilm";
import { Glow } from "./fx";
import type { Vec3 } from "./math";
import { shade, wobble } from "./math";
import { wordTexture } from "./pixelfont";
import { blockTex } from "./textures";
import type { BlockKind } from "./textures";

/**
 * MINECRAFT BLOCKS.
 *
 * <Vox> is a box of any size whose faces are tiled one block per metre, so a
 * 12 × 5 × 1 wall reads as 60 cobblestone blocks, not one stretched picture.
 * Build towns out of a few big Vox, never out of thousands of unit cubes.
 */

const GEOMETRY = new Map<string, THREE.BoxGeometry>();

function voxGeometry(size: Vec3, tile: number): THREE.BoxGeometry {
  const key = `${size[0]}|${size[1]}|${size[2]}|${tile}`;
  const hit = GEOMETRY.get(key);
  if (hit) return hit;
  const [w, h, d] = size;
  const geometry = new THREE.BoxGeometry(w, h, d);
  const uv = geometry.attributes.uv as THREE.BufferAttribute;
  // BoxGeometry faces, in order: +x, -x, +y, -y, +z, -z. Four vertices each.
  const spans: Array<[number, number]> = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let face = 0; face < 6; face++) {
    for (let v = 0; v < 4; v++) {
      const i = face * 4 + v;
      uv.setXY(i, (uv.getX(i) * spans[face][0]) / tile, (uv.getY(i) * spans[face][1]) / tile);
    }
  }
  uv.needsUpdate = true;
  GEOMETRY.set(key, geometry);
  return geometry;
}

export const Vox: React.FC<{
  kind: BlockKind;
  /** A different block for the four sides and the bottom: `kind="grass" side="dirt"`. */
  side?: BlockKind;
  position?: Vec3;
  size: Vec3;
  /** Replace the block's base colour: dyed wool, autumn leaves, a painted door. */
  tint?: string;
  rotation?: Vec3;
  rotationY?: number;
  /** Metres per texture tile. 1 = Minecraft scale. Use 2–4 on giants so they do not look like wallpaper. */
  tile?: number;
  emissive?: string;
  emissiveIntensity?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  opacity?: number;
}> = ({
  kind,
  side,
  position = [0, 0, 0],
  size,
  tint,
  rotation,
  rotationY,
  tile = 1,
  emissive,
  emissiveIntensity = 0,
  castShadow = true,
  receiveShadow = true,
  opacity = 1,
}) => {
  const map = blockTex(kind, tint);
  const sideMap = side ? blockTex(side) : map;
  return (
    <mesh
      position={position}
      rotation={rotation ?? [0, rotationY ?? 0, 0]}
      geometry={voxGeometry(size, tile)}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      {side ? (
        [0, 1, 2, 3, 4, 5].map((i) => (
          <meshStandardMaterial key={i} attach={`material-${i}`} map={i === 2 ? map : sideMap} roughness={1} />
        ))
      ) : (
        <meshStandardMaterial
          map={map}
          roughness={1}
          emissive={emissive ?? "#000000"}
          emissiveMap={emissive ? map : null}
          emissiveIntensity={emissiveIntensity}
          transparent={opacity < 1}
          opacity={opacity}
        />
      )}
    </mesh>
  );
};

/**
 * Pixel lettering on a 3D surface: shop signs, rank boards, a held-up plaque.
 * White letters with a black edge, from the same font as the captions.
 * It faces +Z; put it a hair in front of the board it is painted on.
 */
export const PixelText: React.FC<{
  text: string;
  position?: Vec3;
  rotationY?: number;
  rotation?: Vec3;
  /** Letter block height in metres, outline included. */
  height?: number;
  /** Shrink to fit this width in metres. */
  maxWidth?: number;
  color?: string;
}> = ({ text, position = [0, 0, 0], rotationY = 0, rotation, height = 0.3, maxWidth, color = "#ffffff" }) => {
  const tex = wordTexture(text.toUpperCase());
  const image = tex.image as { width: number; height: number };
  let h = height;
  let w = (image.width / image.height) * h;
  if (maxWidth !== undefined && w > maxWidth) {
    h *= maxWidth / w;
    w = maxWidth;
  }
  return (
    <mesh position={position} rotation={rotation ?? [0, rotationY, 0]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={tex} color={color} transparent alphaTest={0.5} toneMapped={false} />
    </mesh>
  );
};

/** An oak. `position` is the foot of the trunk. */
export const Tree: React.FC<{ position: Vec3; height?: number; leaf?: string; spread?: number }> = ({
  position,
  height = 4,
  leaf = "#3f7f2d",
  spread = 1,
}) => (
  <group position={position}>
    <Vox kind="log" position={[0, height / 2, 0]} size={[0.7, height, 0.7]} />
    <Vox kind="leaves" tint={leaf} position={[0, height + 0.3, 0]} size={[3.4 * spread, 1.8, 3.4 * spread]} />
    <Vox kind="leaves" tint={shade(leaf, 0.06)} position={[0, height + 1.65, 0]} size={[2 * spread, 1, 2 * spread]} />
    <Vox kind="leaves" tint={shade(leaf, -0.1)} position={[0.95 * spread, height - 0.7, 0.5]} size={[1.7, 1, 1.9]} />
  </group>
);

/** A Minecraft torch. `light` > 0 adds a real point light: use it on a few, not on all. */
export const Torch: React.FC<{ position: Vec3; light?: number; seed?: number; lean?: Vec3 }> = ({
  position,
  light = 0,
  seed = 1,
  lean,
}) => {
  const t = useFilmTime();
  const flicker = 1 + wobble(t * 9, seed) * 0.12;
  return (
    <group position={position} rotation={lean ?? [0, 0, 0]}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#6b4a2a" roughness={1} />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <boxGeometry args={[0.17, 0.17, 0.17]} />
        <meshBasicMaterial color="#ffd978" toneMapped={false} />
      </mesh>
      <Glow position={[0, 0.72, 0]} size={1.5 * flicker} color="#ffb347" opacity={0.6} />
      {light > 0 ? (
        <pointLight position={[0, 0.7, 0]} color="#ffb060" intensity={light * flicker} distance={10} decay={2} />
      ) : null}
    </group>
  );
};

/** Flat Minecraft clouds, drifting. They take no light, so they stay white at any hour unless tinted. */
export const Clouds: React.FC<{ y?: number; color?: string; span?: number; center?: Vec3; opacity?: number }> = ({
  y = 46,
  color = "#ffffff",
  span = 150,
  center = [0, 0, 0],
  opacity = 0.92,
}) => {
  const t = useFilmTime();
  const drift = (t * 0.9) % 24;
  const puffs: Array<[number, number, number, number]> = [
    [-0.42, -0.3, 22, 12],
    [-0.1, -0.44, 16, 9],
    [0.28, -0.22, 26, 11],
    [0.46, 0.1, 14, 10],
    [-0.3, 0.2, 18, 8],
    [0.05, 0.36, 24, 12],
    [-0.48, 0.44, 12, 9],
    [0.34, 0.46, 15, 8],
  ];
  return (
    <group position={[center[0] + drift, y, center[2]]}>
      {puffs.map(([x, z, w, d], i) => (
        <group key={i} position={[x * span, (i % 3) * 1.5, z * span]}>
          {/* Each cloud is three slabs that overlap, so from below it is a shape and not a tile. */}
          {(
            [
              [0, 0, 1, 1],
              [-0.42, 0.3, 0.62, 0.7],
              [0.38, -0.34, 0.7, 0.56],
            ] as Array<[number, number, number, number]>
          ).map(([ox, oz, sw, sd], k) => (
            <mesh key={k} position={[ox * w, k * 0.05, oz * d]}>
              <boxGeometry args={[w * sw, 2.2, d * sd]} />
              <meshBasicMaterial color={color} transparent opacity={opacity} fog={false} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

import { useMemo, useRef } from "react";
import type React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Block, Glow, Vox, mulberry32, pixelTex, shade, useFilmTime, wheatTex } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { StrawHat } from "./things";

/**
 * FIELDS AND NIGHT — what lies round the town, and what hangs over it after dark:
 * wheat, scarecrows, pines and the edge of a forest; a moon and stars.
 *
 * Part of the topic's pack (see PACK.md). Built for "Nobody Looked at the Moon". Everything takes a
 * `position` and knows nothing about any film's town.
 */

// ----------------------------------------------------------------------------- wheat

const ROW_GEOMETRY = new Map<string, THREE.PlaneGeometry>();

/** A plane `length` metres long whose picture repeats once a metre, standing on its bottom edge. */
function rowGeometry(length: number, height: number, shift: number): THREE.PlaneGeometry {
  const key = `${length}|${height}|${shift}`;
  const hit = ROW_GEOMETRY.get(key);
  if (hit) return hit;
  const geometry = new THREE.PlaneGeometry(length, height);
  geometry.translate(0, height / 2, 0);
  const uv = geometry.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * length + shift);
  uv.needsUpdate = true;
  ROW_GEOMETRY.set(key, geometry);
  return geometry;
}

/**
 * A field of standing wheat, in rows that run west–east, on tilled soil. `position` is the middle of the
 * field at ground level; `size` is [west–east, north–south] in metres.
 *
 * The rows are cutout planes (Minecraft's own trick), so you see through them and they cost little.
 * `glow` (0–1) is how much the wheat shines by itself: 1 under a moon, 0 in the dark. `sway` is wind, in radians.
 */
export const Wheat: React.FC<{
  position: Vec3;
  size: [number, number];
  height?: number;
  /** Metres between rows. */
  rows?: number;
  glow?: number;
  sway?: number;
  stalk?: string;
  ear?: string;
  soil?: string;
  seed?: number;
}> = ({ position, size, height = 1, rows = 0.62, glow = 0, sway = 0.035, stalk = "#8f8a40", ear = "#e6d47e", soil = "#3b2f20", seed = 1 }) => {
  const t = useFilmTime();
  const [w, d] = size;

  const materials = useMemo(
    () =>
      [1, 2, 3].map((k) => {
        const map = wheatTex(stalk, ear, k);
        return new THREE.MeshStandardMaterial({
          map,
          alphaTest: 0.5,
          side: THREE.DoubleSide,
          roughness: 1,
          emissive: new THREE.Color("#c9d6ff"),
          emissiveMap: map,
          emissiveIntensity: 0,
        });
      }),
    [stalk, ear],
  );
  for (const m of materials) m.emissiveIntensity = glow * 0.26;

  const strips = useMemo(() => {
    const rand = mulberry32(seed * 613 + 29);
    const out: Array<{ x: number; z: number; len: number; h: number; mat: number; phase: number; shift: number }> = [];
    const count = Math.max(1, Math.floor(d / rows));
    for (let r = 0; r < count; r++) {
      const z = -d / 2 + (r + 0.5) * (d / count) + (rand() - 0.5) * 0.12;
      let x = -w / 2;
      while (x < w / 2 - 0.5) {
        const len = Math.min(w / 2 - x, 5 + Math.floor(rand() * 6));
        out.push({ x: x + len / 2, z, len, h: height * (0.82 + rand() * 0.36), mat: Math.floor(rand() * 3), phase: rand() * 6.28, shift: Math.floor(rand() * 16) / 16 });
        x += len;
      }
    }
    return out;
  }, [w, d, rows, height, seed]);

  return (
    <group position={position}>
      <Block position={[0, 0.012, 0]} size={[w, 0.024, d]} color={soil} castShadow={false} />
      {strips.map((s, i) => (
        <mesh
          key={i}
          position={[s.x, 0.02, s.z]}
          rotation={[sway ? Math.sin(t * 1.15 + s.phase + s.z * 0.35) * sway : 0, 0, 0]}
          geometry={rowGeometry(s.len, Math.round(s.h * 20) / 20, s.shift)}
          material={materials[s.mat]}
          receiveShadow
        />
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------------- scarecrow

const SACK = "#e0cfa0";
const STICK = "#4a3520";
const STRAW = "#d9b84a";

/**
 * A scarecrow: a sack for a head, a stuffed shirt on a crossbar, two stuffed legs, a straw hat.
 * Feet on `position`, facing +Z, 2.3 m tall at scale 1: taller than anyone in the town.
 *
 * Standing, it does not move at all: no breath, no sway. That is the point of it.
 * `walk` (metres) makes it stride, stiff, with its arms still straight out.
 */
export const Scarecrow: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  /** Metres walked. 0 stands. */
  walk?: number;
  /** A pole down its back into the ground, as if somebody had put it there. */
  pole?: boolean;
  /** Body pitch, radians: leaning in. */
  lean?: number;
  headTurn?: number;
  headTilt?: number;
  headNod?: number;
  /** How far the arms have dropped from straight out, radians. */
  droop?: number;
  /** 0–1: a cold glint in the eye holes. For the dark. */
  eyes?: number;
  shirt?: string;
  hat?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, walk = 0, pole = false, lean = 0, headTurn = 0, headTilt = 0, headNod = 0, droop = 0, eyes = 0, shirt = "#5b4a3c", hat = true }) => {
  const gait = walk * 4.2;
  const swing = Math.sin(gait) * 0.5;
  const bob = Math.abs(Math.sin(gait)) * 0.05;
  const roll = Math.sin(gait) * 0.07;
  const cloth = pixelTex(shirt, [2, 2], { size: 8, jitter: 0.13 });
  const sack = pixelTex(SACK, [1, 1], { size: 8, jitter: 0.09 });
  const lit = eyes > 0.02;
  // In the dark it keeps a cold edge of its own, so it is a shape and not a hole in the picture.
  const rim = lit ? { emissive: "#2c3d6e", emissiveIntensity: 0.6 * eyes } : {};
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {pole ? <Block position={[0, 0.5, -0.14]} size={[0.11, 1.0, 0.11]} color={STICK} /> : null}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.13, 0.92, 0]} rotation={[s * swing, 0, 0]}>
          <Block position={[0, -0.4, 0]} size={[0.18, 0.8, 0.18]} color="#3a3742" {...rim} />
          <Block position={[0, -0.8, 0]} size={[0.22, 0.09, 0.22]} color={STRAW} castShadow={false} />
          <Block position={[0, -0.86, 0]} size={[0.07, 0.12, 0.07]} color={STICK} castShadow={false} />
        </group>
      ))}
      <group position={[0, 0.92 + bob, 0]} rotation={[lean, 0, roll]}>
        <Block position={[0, 0.5, -0.1]} size={[0.09, 1.2, 0.09]} color={STICK} castShadow={false} />
        <Block position={[0, 0.36, 0]} size={[0.56, 0.7, 0.3]} map={cloth} {...rim} />
        <Block position={[0.13, 0.28, 0.152]} size={[0.17, 0.17, 0.012]} color={shade(shirt, 0.28)} castShadow={false} />
        <Block position={[-0.15, 0.52, 0.152]} size={[0.13, 0.11, 0.012]} color="#7a3b2a" castShadow={false} />
        <Block position={[0, 0.05, 0]} size={[0.6, 0.06, 0.34]} color="#8a7a4a" castShadow={false} />
        <Block position={[0, -0.03, 0]} size={[0.5, 0.1, 0.26]} color={STRAW} castShadow={false} />
        {/* The crossbar: its arms. They stay straight out, whatever the rest of it is doing. */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.24, 0.6, 0]} rotation={[0, 0, -s * droop]}>
            <Block position={[s * 0.36, 0, -0.02]} size={[0.74, 0.08, 0.08]} color={STICK} castShadow={false} />
            <Block position={[s * 0.3, 0, 0]} size={[0.6, 0.2, 0.22]} map={cloth} {...rim} />
            {[-0.06, 0, 0.06].map((y, i) => (
              <Block key={i} position={[s * (0.68 + (i % 2) * 0.05), y, (i - 1) * 0.04]} size={[0.2, 0.045, 0.045]} color={shade(STRAW, i * 0.06 - 0.06)} castShadow={false} />
            ))}
          </group>
        ))}
        <Block position={[0, 0.74, 0]} size={[0.2, 0.07, 0.2]} color="#8a7a4a" castShadow={false} />
        <group position={[0, 0.78, 0]} rotation={[headNod, headTurn, headTilt]}>
          {/* A little of its own colour, so the face never sinks into the shadow of its hat. */}
          <Block position={[0, 0.22, 0]} size={[0.44, 0.44, 0.42]} map={sack} emissive="#5a5038" emissiveIntensity={0.3} />
          {/* Two buttons that do not match, and a mouth somebody sewed shut. */}
          <Block position={[-0.1, 0.27, 0.213]} size={[0.1, 0.11, 0.012]} color={lit ? "#dfe9ff" : "#15110d"} emissive={lit ? "#cfe0ff" : "#000000"} emissiveIntensity={lit ? eyes * 2.4 : 0} castShadow={false} />
          <Block position={[0.11, 0.255, 0.213]} size={[0.07, 0.07, 0.012]} color={lit ? "#dfe9ff" : "#15110d"} emissive={lit ? "#cfe0ff" : "#000000"} emissiveIntensity={lit ? eyes * 2.4 : 0} castShadow={false} />
          <Block position={[0, 0.115, 0.213]} size={[0.25, 0.028, 0.012]} color="#2a2018" castShadow={false} />
          {[-0.09, -0.03, 0.03, 0.09].map((x) => (
            <Block key={x} position={[x, 0.115, 0.214]} size={[0.024, 0.09, 0.012]} color="#2a2018" castShadow={false} />
          ))}
          {lit ? <Glow position={[0, 0.26, 0.26]} size={0.5} color="#bcd2ff" opacity={0.35 * eyes} /> : null}
          {hat ? <StrawHat position={[0, 0.44, 0]} width={1.1} crown={0.5} tilt={-0.08} band="#3a2a1e" /> : null}
        </group>
      </group>
    </group>
  );
};

/** Where a scarecrow's face is, for a camera to look at. `p` is its feet. */
export const scarecrowFace = (p: Vec3, scale = 1): Vec3 => [p[0], p[1] + 1.95 * scale, p[2]];

// ----------------------------------------------------------------------------- forest

/** A spruce: a dark trunk and stepped needles. `position` is the foot of the trunk. */
export const Pine: React.FC<{ position: Vec3; height?: number; leaf?: string; spread?: number; castShadow?: boolean }> = ({
  position,
  height = 9,
  leaf = "#1f3d2a",
  spread = 1,
  castShadow = true,
}) => {
  const widths = [3.3, 2.1, 2.7, 1.5, 1.9, 0.9];
  const from = height * 0.3;
  const step = (height * 0.76) / widths.length;
  return (
    <group position={position}>
      <Vox kind="log" tint="#33261a" position={[0, height * 0.35, 0]} size={[0.55, height * 0.7, 0.55]} castShadow={castShadow} />
      {widths.map((w, i) => (
        <Vox
          key={i}
          kind="leaves"
          tint={shade(leaf, (i % 2) * 0.05 - 0.02)}
          position={[0, from + (i + 0.5) * step, 0]}
          size={[w * spread, step * 0.92, w * spread]}
          castShadow={castShadow}
        />
      ))}
      <Vox kind="leaves" tint={leaf} position={[0, from + widths.length * step + 0.35, 0]} size={[0.5 * spread, 0.9, 0.5 * spread]} castShadow={false} />
    </group>
  );
};

/**
 * The edge of a forest: pines three deep along a line, and behind them nothing you can see into.
 * `back` is the way into the forest (a unit vector on the ground; default north).
 */
export const ForestEdge: React.FC<{ from: Vec3; to: Vec3; back?: Vec3; depth?: number; count?: number; seed?: number; leaf?: string }> = ({
  from,
  to,
  back = [0, 0, -1],
  depth = 10,
  count = 40,
  seed = 1,
  leaf = "#1f3d2a",
}) => {
  const trees = useMemo(() => {
    const rand = mulberry32(seed * 419 + 7);
    return Array.from({ length: count }, (_, i) => {
      const row = i % 3;
      const k = (Math.floor(i / 3) + rand() * 0.8 + row * 0.33) / Math.ceil(count / 3);
      const into = row * (depth / 3) + rand() * (depth / 3.4);
      return {
        position: [from[0] + (to[0] - from[0]) * k + back[0] * into, from[1], from[2] + (to[2] - from[2]) * k + back[2] * into] as Vec3,
        height: 7.5 + rand() * 4.5 + row * 0.8,
        spread: 0.85 + rand() * 0.4,
        tone: (rand() * 2 - 1) * 0.05,
      };
    });
  }, [from[0], from[2], to[0], to[2], back[0], back[2], depth, count, seed]);
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.hypot(dx, dz);
  const mid: Vec3 = [(from[0] + to[0]) / 2, from[1], (from[2] + to[2]) / 2];
  const yaw = Math.atan2(dx, dz) - Math.PI / 2;
  return (
    <>
      {trees.map((tree, i) => (
        <Pine key={i} position={tree.position} height={tree.height} spread={tree.spread} leaf={shade(leaf, tree.tone)} castShadow={false} />
      ))}
      {/* Needles on the ground, and a black wall at the back, lower than the trees: you never see through a forest. */}
      <group position={[mid[0] + back[0] * (depth / 2), mid[1], mid[2] + back[2] * (depth / 2)]} rotation={[0, -yaw, 0]}>
        <Block position={[0, 0.016, 0]} size={[length + 6, 0.03, depth + 3]} color="#0d1610" castShadow={false} />
      </group>
      <group position={[mid[0] + back[0] * (depth + 1.5), mid[1], mid[2] + back[2] * (depth + 1.5)]} rotation={[0, -yaw, 0]}>
        <Block position={[0, 2.6, 0]} size={[length + 10, 5.2, 0.6]} color="#04080a" castShadow={false} />
      </group>
    </>
  );
};

// ----------------------------------------------------------------------------- sky

/** Half-widths, in pixels, of the rows of a pixel circle `n` pixels across. */
export const discRows = (n: number): number[] =>
  Array.from({ length: n }, (_, j) => {
    const y = j + 0.5 - n / 2;
    return Math.max(1, Math.round(Math.sqrt(Math.max(0, (n / 2) ** 2 - y * y)) - 0.05));
  });

/**
 * A circle made of rows of pixels, self-lit, facing +Z: the way a moon is drawn in a world of blocks.
 * Draw it inside a group that puts it where it goes. `radius` is in that group's units.
 *
 *   `from` / `to`   only rows between these heights are drawn (−1 bottom … 1 top): an eyelid, a slice.
 *   `shift(y)`      slide the row at height `y` sideways (both in the group's units): a reflection that shakes on water.
 */
export const PixelDisc: React.FC<{
  radius: number;
  color: string;
  /** Pixels across. 16 for a moon; fewer for something inside it. */
  n?: number;
  center?: [number, number];
  z?: number;
  from?: number;
  to?: number;
  shift?: (y: number) => number;
  /** Clip rows to a circle of this radius round the origin, so a part never sticks out of the whole. */
  within?: number;
  fog?: boolean;
}> = ({ radius, color, n = 16, center = [0, 0], z = 0, from = -1, to = 1, shift, within, fog = false }) => {
  const px = (radius * 2) / n;
  const rows = discRows(n);
  return (
    <>
      {rows.map((half, j) => {
        const y = center[1] + (j + 0.5 - n / 2) * px;
        if (y < from * (within ?? radius) - 1e-6 || y > to * (within ?? radius) + 1e-6) return null;
        let left = center[0] - half * px;
        let right = center[0] + half * px;
        if (within !== undefined) {
          const reach = Math.sqrt(Math.max(0, within * within - y * y));
          left = Math.max(left, -reach);
          right = Math.min(right, reach);
          if (right - left < px * 0.25) return null;
        }
        const dx = shift ? shift(y) : 0;
        return (
          <mesh key={j} position={[(left + right) / 2 + dx, y, z]}>
            <boxGeometry args={[right - left, px * 1.02, px * 0.2]} />
            <meshBasicMaterial color={color} toneMapped={false} fog={fog} />
          </mesh>
        );
      })}
    </>
  );
};

/** Craters on a 16-pixel moon: [x, y, size] in pixels from the middle. */
const CRATERS: Array<[number, number, number]> = [
  [-3.5, 3, 2],
  [2.5, 4.5, 1],
  [3.5, -1.5, 2],
  [-1.5, -4, 3],
  [-5.5, -1, 1],
  [0.5, 0.5, 1],
];

/**
 * The moon: a pixel disc with craters and a soft halo. `position` is its middle; it faces +Z, so give it a
 * `rotation` that turns it to the town. It takes no fog and no light: it looks the same from anywhere.
 * `from` / `to` cut it off (−1 … 1): a moon that is rising behind something, or shutting.
 */
export const Moon: React.FC<{
  position: Vec3;
  radius?: number;
  rotation?: Vec3;
  color?: string;
  crater?: string;
  /** Strength of the halo, 0–1. */
  glow?: number;
  from?: number;
  to?: number;
  shift?: (y: number) => number;
  children?: React.ReactNode;
}> = ({ position, radius = 8, rotation, color = "#f3f1e2", crater = "#d6d5c8", glow = 1, from = -1, to = 1, shift, children }) => {
  const px = radius / 8;
  return (
    <group position={position} rotation={rotation}>
      <PixelDisc radius={radius} color={color} from={from} to={to} shift={shift} />
      {CRATERS.map(([x, y, size], i) => {
        const cy = y * px;
        if (cy - (size * px) / 2 < from * radius || cy + (size * px) / 2 > to * radius) return null;
        return (
          <mesh key={i} position={[x * px + (shift ? shift(cy) : 0), cy, px * 0.12]}>
            <boxGeometry args={[size * px, size * px, px * 0.1]} />
            <meshBasicMaterial color={crater} toneMapped={false} fog={false} />
          </mesh>
        );
      })}
      {children}
      {glow > 0 ? <Glow position={[0, 0, -px * 0.5]} size={radius * 5.2} color="#8fb0ff" opacity={0.3 * glow} /> : null}
    </group>
  );
};

/**
 * Moonlight that falls on ONE place: a cone of cold light from `from` (where the moon is) onto `on`, with shadows.
 * Everything outside the cone keeps whatever light the look gives it. Move `on` and the light crosses the land.
 *
 *   radius  metres of ground the cone covers
 *   power   0 … 1: fade it, or shut it for a blink
 */
export const Moonlight: React.FC<{ on: Vec3; from: Vec3; radius?: number; power?: number; strength?: number; color?: string; shadows?: boolean }> = ({
  on,
  from,
  radius = 14,
  power = 1,
  strength = 3,
  color = "#d3deff",
  shadows = true,
}) => {
  const ref = useRef<THREE.SpotLight>(null);
  const d: Vec3 = [from[0] - on[0], from[1] - on[1], from[2] - on[2]];
  const len = Math.hypot(d[0], d[1], d[2]) || 1;
  // The lamp itself hangs 46 m up the line to the moon: near enough for a sharp shadow map.
  const far = 46;
  const at: Vec3 = [on[0] + (d[0] / len) * far, on[1] + (d[1] / len) * far, on[2] + (d[2] / len) * far];
  // A spot light aims at its `target`, which is not in the scene graph: refresh it by hand.
  useFrame(() => {
    const light = ref.current;
    if (!light) return;
    light.target.position.set(on[0], on[1], on[2]);
    light.target.updateMatrixWorld();
  });
  if (power <= 0.005) return null;
  return (
    <spotLight
      ref={ref}
      position={at}
      color={color}
      intensity={strength * power}
      angle={Math.atan(radius / far)}
      penumbra={0.55}
      decay={0}
      distance={0}
      castShadow={shadows}
      shadow-mapSize={[2048, 2048]}
      shadow-camera-near={8}
      shadow-camera-far={far + 30}
      shadow-bias={-0.0006}
      shadow-normalBias={0.02}
    />
  );
};

/** Stars: pixels on a dome round `center`. They take no fog. Keep `radius` under the camera's reach (200 m). */
export const Stars: React.FC<{ center?: Vec3; radius?: number; count?: number; seed?: number; size?: number; color?: string; opacity?: number }> = ({
  center = [0, 0, 0],
  radius = 150,
  count = 150,
  seed = 1,
  size = 4.5,
  color = "#dfe8ff",
  opacity = 0.9,
}) => {
  const geometry = useMemo(() => {
    const rand = mulberry32(seed * 353 + 19);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const azimuth = rand() * Math.PI * 2;
      const elevation = (0.1 + rand() * 0.9) * (Math.PI / 2) * 0.96;
      positions[i * 3] = Math.cos(elevation) * Math.sin(azimuth) * radius;
      positions[i * 3 + 1] = Math.sin(elevation) * radius;
      positions[i * 3 + 2] = Math.cos(elevation) * Math.cos(azimuth) * radius;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [radius, count, seed]);
  return (
    <points position={center} geometry={geometry} frustumCulled={false}>
      <pointsMaterial color={color} size={size} sizeAttenuation={false} transparent opacity={opacity} depthWrite={false} fog={false} toneMapped={false} />
    </points>
  );
};

import * as THREE from "three";
import type React from "react";
import { shade } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { wordBitmap } from "../../src/engine/pixelfont";

/**
 * VOXELS — numbers, signs and icons built out of cubes.
 *
 * The engine's `PixelText` is paint on a surface. These are objects: they have a thickness, they
 * catch the light and throw a shadow, they can spin, and a camera can fly round them. Use them for
 * the things a film POINTS AT: a price, a percentage, a countdown, the heart over somebody's head.
 *
 *   <Figure text="+20%" height={0.6} color="#ff5a4a" position={[0, 2.2, 0]} />
 *   <Icon kind="heart" height={0.45} position={[0, 2.1, 0]} />
 *   <Voxels rows={["#.#", ".#.", "#.#"]} height={0.3} color="#e3261c" />
 *
 * Everything faces +Z and is centred on its `position`. One mesh each, however many cubes.
 */

// ----------------------------------------------------------------------------- geometry

const GEOMETRY = new Map<string, THREE.BufferGeometry>();

/** One merged mesh for a grid of cubes. Each cube is 1 × 1 × `depth`; the grid is centred on the origin. */
function gridGeometry(rows: string[], depth: number): THREE.BufferGeometry {
  const key = `${depth}|${rows.join("/")}`;
  const hit = GEOMETRY.get(key);
  if (hit) return hit;

  const cells: Array<[number, number]> = [];
  const width = Math.max(1, ...rows.map((row) => row.length));
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "#") cells.push([x - width / 2 + 0.5, rows.length / 2 - 0.5 - y]);
    }
  });

  const box = new THREE.BoxGeometry(1, 1, depth);
  const p = box.attributes.position.array;
  const n = box.attributes.normal.array;
  const index = box.index ? box.index.array : new Uint16Array(0);
  const positions = new Float32Array(cells.length * p.length);
  const normals = new Float32Array(cells.length * n.length);
  const colors = new Float32Array(cells.length * p.length);
  const indices = new Uint32Array(cells.length * index.length);
  cells.forEach(([x, y], c) => {
    // A little grain from cube to cube, the way a Minecraft block face has: never one flat colour.
    const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    const grain = 0.86 + 0.14 * (hash - Math.floor(hash));
    for (let i = 0; i < p.length; i += 3) {
      positions[c * p.length + i] = p[i] + x;
      positions[c * p.length + i + 1] = p[i + 1] + y;
      positions[c * p.length + i + 2] = p[i + 2];
      colors[c * p.length + i] = grain;
      colors[c * p.length + i + 1] = grain;
      colors[c * p.length + i + 2] = grain;
    }
    normals.set(n, c * n.length);
    for (let i = 0; i < index.length; i++) indices[c * index.length + i] = index[i] + c * (p.length / 3);
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeBoundingSphere();
  GEOMETRY.set(key, geometry);
  return geometry;
}

/** The same picture one cube fatter all the way round: what an outline is cut from. */
function grown(rows: string[]): string[] {
  const width = Math.max(1, ...rows.map((row) => row.length));
  const lit = (x: number, y: number) => y >= 0 && y < rows.length && rows[y][x] === "#";
  return Array.from({ length: rows.length + 2 }, (_, gy) =>
    Array.from({ length: width + 2 }, (_, gx) => {
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (lit(gx - 1 + dx, gy - 1 + dy)) return "#";
      return ".";
    }).join(""),
  );
}

// ----------------------------------------------------------------------------- the part

export type VoxelProps = {
  position?: Vec3;
  rotation?: Vec3;
  rotationY?: number;
  /** Metres from the top row to the bottom row. */
  height?: number;
  /** Shrink to fit this width in metres. */
  maxWidth?: number;
  /** Thickness, in cubes. 1 is a cube; 0.5 is a tile. */
  depth?: number;
  color?: string;
  /** 0–1: how much it glows in its own colour. Use it at night, and for anything magic. */
  glow?: number;
  /** The darker copy behind, down and to the right: Minecraft's own text shadow. It keeps the shape readable on most backgrounds. */
  shadow?: boolean;
  /** A dark edge all the way round, one cube wide, in place of the shadow: for a sign that has to read against ANYTHING (a white wall, the sky). */
  outline?: boolean;
  /** Overall scale: for popping in (`scale={pop(t, 0)}`). 0 draws nothing. */
  scale?: number;
  opacity?: number;
  castShadow?: boolean;
};

/**
 * A picture made of cubes. `rows` are strings, top row first; "#" is a cube and anything else is air:
 *
 *   <Voxels rows={[".#.", "###", ".#."]} height={0.3} color="#ffd24a" />
 */
export const Voxels: React.FC<VoxelProps & { rows: string[] }> = ({
  rows,
  position = [0, 0, 0],
  rotation,
  rotationY = 0,
  height = 0.5,
  maxWidth,
  depth = 1,
  color = "#ffffff",
  glow = 0,
  shadow = true,
  outline = false,
  scale = 1,
  opacity = 1,
  castShadow = true,
}) => {
  if (scale <= 0.001 || rows.length === 0) return null;
  const width = Math.max(1, ...rows.map((row) => row.length));
  let cell = height / rows.length;
  if (maxWidth !== undefined && width * cell > maxWidth) cell = maxWidth / width;
  const geometry = gridGeometry(rows, depth);
  const s = cell * scale;
  return (
    <group position={position} rotation={rotation ?? [0, rotationY, 0]} scale={[s, s, s]}>
      <mesh geometry={geometry} castShadow={castShadow}>
        <meshStandardMaterial color={color} vertexColors roughness={0.82} emissive={color} emissiveIntensity={glow} transparent={opacity < 1} opacity={opacity} />
      </mesh>
      {outline ? (
        <mesh geometry={gridGeometry(grown(rows), depth * 0.5)} position={[0, 0, -depth * 0.3]}>
          <meshStandardMaterial color={shade(color, -0.82)} roughness={1} transparent={opacity < 1} opacity={opacity} />
        </mesh>
      ) : shadow ? (
        <mesh geometry={geometry} position={[0.16, -0.16, -depth * 0.62]}>
          <meshStandardMaterial color={shade(color, -0.74)} roughness={1} transparent={opacity < 1} opacity={opacity} />
        </mesh>
      ) : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- lettering

/**
 * Signs the caption font does not have: money, sums and arrows. Five columns each, bit 0 the top row,
 * the same layout as src/engine/pixelfont.ts.
 */
const EXTRA: Record<string, number[]> = {
  $: [0x24, 0x2a, 0x7f, 0x2a, 0x12],
  "%": [0x23, 0x13, 0x08, 0x64, 0x62],
  "+": [0x08, 0x08, 0x3e, 0x08, 0x08],
  "=": [0x14, 0x14, 0x14, 0x14, 0x14],
  ":": [0x36, 0x36],
  "/": [0x20, 0x10, 0x08, 0x04, 0x02],
  "×": [0x22, 0x14, 0x08, 0x14, 0x22],
  "<": [0x08, 0x14, 0x22, 0x41],
  ">": [0x41, 0x22, 0x14, 0x08],
  "#": [0x14, 0x7f, 0x14, 0x7f, 0x14],
  "*": [0x14, 0x08, 0x3e, 0x08, 0x14],
  "↑": [0x04, 0x02, 0x7f, 0x02, 0x04],
  "↓": [0x10, 0x20, 0x7f, 0x20, 0x10],
  "→": [0x08, 0x08, 0x2a, 0x1c, 0x08],
  "←": [0x08, 0x1c, 0x2a, 0x08, 0x08],
  "♥": [0x0c, 0x1e, 0x3c, 0x1e, 0x0c],
};

function columnsOf(ch: string): number[] {
  const own = EXTRA[ch];
  if (own) return own;
  const { width, rows } = wordBitmap(ch);
  const cols: number[] = [];
  for (let x = 0; x < width; x++) {
    let col = 0;
    for (let y = 0; y < rows.length; y++) if (rows[y][x]) col |= 1 << y;
    cols.push(col);
  }
  return cols;
}

/** A word as rows of "#" and ".", seven rows high: what `Voxels` draws. Letters, digits, and  $ % + - = : / × < > # * ! ? . , ' ↑ ↓ → ← ♥ */
export function textRows(text: string): string[] {
  const cols: number[] = [];
  for (const ch of text) {
    if (cols.length > 0) cols.push(0);
    cols.push(...columnsOf(ch));
  }
  return Array.from({ length: 7 }, (_, y) => cols.map((col) => ((col >> y) & 1 ? "#" : ".")).join(""));
}

/**
 * A number or a short word in cubes: a price, a percentage, a count. Keep it SHORT (six signs or fewer):
 * the captions carry the sentence; this is the one figure the sentence is about.
 * Write "×" for times and "↑" "↓" for arrows. Letters come out as capitals unless you write them small.
 */
export const Figure: React.FC<VoxelProps & { text: string }> = ({ text, ...rest }) => <Voxels rows={textRows(text)} {...rest} />;

// ----------------------------------------------------------------------------- icons

/** Small pictures. Each is drawn on a grid, top row first. */
export const ICONS = {
  heart: [".##...##.", "####.####", "#########", "#########", ".#######.", "..#####..", "...###...", "....#...."],
  star: ["....#....", "....#....", "...###...", "#########", ".#######.", "..#####..", "..#####..", ".##...##.", ".#.....#."],
  bolt: ["...###", "..###.", ".###..", "######", "..###.", ".###..", "###...", "##....", "#....."],
  bang: ["##", "##", "##", "##", "##", "..", "##", "##"],
  question: [".####.", "##..##", "....##", "...##.", "..##..", "..##..", "......", "..##..", "..##.."],
  check: [".......##", "......##.", ".....##..", "##..##...", ".####....", "..##....."],
  cross: ["##...##", ".##.##.", "..###..", ".##.##.", "##...##"],
  up: ["...#...", "..###..", ".#####.", "#######", "..###..", "..###..", "..###..", "..###.."],
  down: ["..###..", "..###..", "..###..", "..###..", "#######", ".#####.", "..###..", "...#..."],
  eye: ["..#####..", ".#######.", "###...###", "##..#..##", "###...###", ".#######.", "..#####.."],
  clock: [".#####.", "#..#..#", "#..#..#", "#..###.", "#.....#", "#.....#", ".#####."],
  skull: [".#####.", "#######", "#.###.#", "#.###.#", "#######", ".##.##.", ".#####.", ".#.#.#."],
  coin: ["..###..", ".#####.", "#######", "#######", "#######", ".#####.", "..###.."],
  gem: ["..###..", ".#####.", "#######", "#######", ".#####.", "..###..", "...#..."],
  drop: ["...#...", "..###..", "..###..", ".#####.", "#######", "#######", ".#####.", "..###.."],
  crown: ["#..#..#", "#.###.#", "#######", "#######", "#######"],
} as const;
export type IconKind = keyof typeof ICONS;

const ICON_COLOR: Record<IconKind, string> = {
  heart: "#ff4f8a",
  star: "#ffd24a",
  bolt: "#ffe14a",
  bang: "#ff5a3a",
  question: "#ffffff",
  check: "#58d66a",
  cross: "#e8352b",
  up: "#58d66a",
  down: "#e8352b",
  eye: "#8fd0ff",
  clock: "#ffffff",
  skull: "#e9e4d8",
  coin: "#f2c230",
  gem: "#3fd46a",
  drop: "#4aa8ff",
  crown: "#f2c230",
};

/** One small picture in cubes: over a head, on a sign, in a hand. Its colour is its own unless you give one. */
export const Icon: React.FC<VoxelProps & { kind: IconKind }> = ({ kind, color, ...rest }) => (
  <Voxels rows={[...ICONS[kind]]} color={color ?? ICON_COLOR[kind]} {...rest} />
);

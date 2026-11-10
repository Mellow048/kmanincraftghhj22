import * as THREE from "three";
import type { Vec3 } from "./math";
import { mulberry32 } from "./math";
import { useFlicker } from "./Look";
import { useFilmTime } from "./defineFilm";
import {
  carpetTex,
  chartTex,
  curtainTex,
  crayonDrawingTex,
  doorPlateTex,
  exitSignTex,
  footprintTex,
  moonWindowTex,
  noticeBoardTex,
  pixelTex,
  plankTex,
  posterTex,
  stripeTex,
  tileCeilingTex,
  wardWallTex,
  wetFloorTex,
  windowTex,
} from "./textures";
import { Glow } from "./fx";

/** A textured box. The atom of the whole framework. */
export const Block: React.FC<{
  position?: Vec3;
  size: Vec3;
  color?: string;
  map?: THREE.Texture;
  rotation?: Vec3;
  rotationY?: number;
  emissive?: string;
  emissiveIntensity?: number;
  metalness?: number;
  roughness?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  opacity?: number;
  transparent?: boolean;
  children?: React.ReactNode;
}> = ({
  position = [0, 0, 0],
  size,
  color = "#ffffff",
  map,
  rotation,
  rotationY,
  emissive,
  emissiveIntensity = 0,
  metalness = 0,
  roughness = 1,
  castShadow = true,
  receiveShadow = true,
  opacity = 1,
  transparent = false,
  children,
}) => (
  <mesh
    position={position}
    rotation={rotation}
    rotation-y={rotationY}
    castShadow={castShadow}
    receiveShadow={receiveShadow}
  >
    <boxGeometry args={size} />
    <meshStandardMaterial
      color={color}
      map={map ?? null}
      emissive={emissive ?? "#000000"}
      emissiveIntensity={emissiveIntensity}
      metalness={metalness}
      roughness={roughness}
      transparent={transparent || opacity < 1}
      opacity={opacity}
    />
    {children}
  </mesh>
);

/** Hospital bed. Mattress top is at y = 0.55, matching the seated avatar pose. */
export const Bed: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  length?: number;
  frame?: string;
  sheet?: string;
  blanket?: string;
  rails?: boolean;
  pillow?: boolean;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  width = 1.15,
  length = 2.15,
  frame = "#2a3448",
  sheet = "#c9dceb",
  blanket = "#2a6aa8",
  rails = false,
  pillow = true,
}) => {
  const w = width;
  const l = length;
  return (
    <group position={position} rotation-y={rotationY}>
      {[
        [-w / 2 + 0.06, 0.14, -l / 2 + 0.06],
        [w / 2 - 0.06, 0.14, -l / 2 + 0.06],
        [-w / 2 + 0.06, 0.14, l / 2 - 0.06],
        [w / 2 - 0.06, 0.14, l / 2 - 0.06],
      ].map((p, i) => (
        <Block key={i} position={p as Vec3} size={[0.08, 0.28, 0.08]} color={frame} />
      ))}
      <Block position={[0, 0.33, 0]} size={[w, 0.1, l]} color={frame} />
      <Block position={[0, 0.465, 0]} size={[w - 0.04, 0.17, l - 0.04]} map={pixelTex(sheet, [2, 3])} color="#ffffff" />
      <Block
        position={[0, 0.567, l * 0.17]}
        size={[w + 0.02, 0.07, l * 0.64]}
        map={pixelTex(blanket, [2, 2])}
        color="#ffffff"
      />
      {pillow && <Block position={[0, 0.585, -l / 2 + 0.29]} size={[w * 0.62, 0.1, 0.34]} map={pixelTex("#e3ecf4", [1, 1])} />}
      <Block position={[0, 0.56, -l / 2 - 0.05]} size={[w + 0.08, 0.78, 0.07]} color={frame} />
      <Block position={[0, 0.88, -l / 2 - 0.055]} size={[w * 0.5, 0.04, 0.1]} color="#3b4a66" />
      {rails && (
        <group>
          <Block position={[w / 2 + 0.02, 0.78, 0]} size={[0.04, 0.05, l * 0.5]} color="#8b97a8" metalness={0.5} roughness={0.4} />
          <Block position={[w / 2 + 0.02, 0.62, 0]} size={[0.04, 0.05, l * 0.5]} color="#8b97a8" metalness={0.5} roughness={0.4} />
          {[-l * 0.22, l * 0.22].map((z, i) => (
            <Block key={i} position={[w / 2 + 0.02, 0.7, z]} size={[0.04, 0.3, 0.04]} color="#6f7b8c" metalness={0.5} roughness={0.4} />
          ))}
        </group>
      )}
    </group>
  );
};

/** Hinged door. `open` is the swing angle in radians. */
export const Door: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  open?: number;
  color?: string;
  handleColor?: string;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  width = 1.0,
  height = 2.15,
  open = 0,
  color = "#24382f",
  handleColor = "#c9b37a",
}) => (
  <group position={position} rotation-y={rotationY}>
    <group rotation-y={open}>
      <Block position={[width / 2, height / 2, 0]} size={[width, height, 0.06]} color={color} />
      <Block position={[width / 2, height * 0.68, 0.045]} size={[width * 0.7, height * 0.28, 0.02]} color="#1d2e26" />
      <Block position={[width / 2, height * 0.3, 0.045]} size={[width * 0.7, height * 0.3, 0.02]} color="#1d2e26" />
      <Block position={[width * 0.86, height * 0.48, 0.07]} size={[0.06, 0.08, 0.06]} color={handleColor} metalness={0.5} roughness={0.4} />
    </group>
  </group>
);

/** Framed wall poster / sign. The texture is generated from text, so it stays pixel-crisp. */
export const Sign: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  title: string;
  subtitle?: string;
  lines?: string[];
  bg?: string;
  fg?: string;
  accent?: string;
  grid?: boolean;
  lit?: number;
  frame?: boolean;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  width = 1.0,
  height = 1.3,
  title,
  subtitle,
  lines,
  bg = "#e6dfcc",
  fg = "#1b2028",
  accent = "#c8402f",
  grid = false,
  lit = 0.22,
  frame = true,
}) => {
  const tex = posterTex({ title, subtitle, lines, bg, fg, accent, grid });
  return (
    <group position={position} rotation-y={rotationY}>
      {frame && <Block position={[0, 0, -0.025]} size={[width + 0.08, height + 0.08, 0.04]} color="#20242c" />}
      <mesh castShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={tex}
          emissiveMap={tex}
          emissive="#ffffff"
          emissiveIntensity={lit}
          roughness={0.95}
        />
      </mesh>
    </group>
  );
};

/** Glowing window with frame, sill and cross bars. Light itself is added by the Look preset. */
export const WindowUnit: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  warm?: boolean;
  dim?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 1.5, height = 1.3, warm = false, dim = 1 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0, 0]} size={[width + 0.16, height + 0.16, 0.1]} color="#2a3548" />
    <mesh position={[0, 0, 0.06]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={windowTex(warm)}
        emissiveMap={windowTex(warm)}
        emissive="#ffffff"
        emissiveIntensity={(warm ? 0.7 : 0.9) * dim}
        roughness={1}
      />
    </mesh>
    <Block position={[0, -height / 2 - 0.11, 0.09]} size={[width + 0.3, 0.08, 0.2]} color="#37445c" />
  </group>
);

/** Trim around a doorway. Place it under the door so the opening reads as cut into the wall. */
export const DoorFrame: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  color?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 1.0, height = 2.15, color = "#223247" }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[-width / 2 - 0.06, height / 2, 0]} size={[0.12, height + 0.12, 0.16]} color={color} />
    <Block position={[width / 2 + 0.06, height / 2, 0]} size={[0.12, height + 0.12, 0.16]} color={color} />
    <Block position={[0, height + 0.06, 0]} size={[width + 0.24, 0.12, 0.16]} color={color} />
  </group>
);

/** Ceiling fluorescent panel with a matching point light. */
export const CeilingLight: React.FC<{
  position?: Vec3;
  size?: [number, number];
  color?: string;
  lightColor?: string;
  intensity?: number;
  distance?: number;
  flicker?: Array<[number, number]>;
  /** Film second at which the lamp dies for good. Omit for a light that stays on. */
  dieAt?: number;
  /** Intensity multiplier once dead. Default 0.03. */
  dieTo?: number;
}> = ({
  position = [0, 0, 0],
  size = [0.85, 0.2],
  color = "#dfeaff",
  lightColor = "#d6e8ff",
  intensity = 7,
  distance = 7,
  flicker = [],
  dieAt,
  dieTo = 0.03,
}) => {
  const level = useFlicker(1, flicker, 7);
  const t = useFilmTime();
  const dead = dieAt !== undefined && t >= dieAt;
  const alive = dead ? dieTo : level;
  return (
    <group position={position}>
      <Block position={[0, 0.03, 0]} size={[size[0], 0.06, size[1]]} color={color} emissive={color} emissiveIntensity={0.95 * alive} castShadow={false} />
      <Block position={[0, 0.13, 0]} size={[size[0] + 0.1, 0.16, size[1] + 0.1]} color="#141a24" castShadow={false} />
      <pointLight color={lightColor} intensity={intensity * alive} distance={distance} decay={2} position={[0, -0.1, 0]} />
      <Glow position={[0, -0.06, 0]} size={Math.max(size[0], size[1]) * 1.9} color={lightColor} opacity={0.14 * alive} />
    </group>
  );
};

/** Hospital cabinet / locker. */
export const Locker: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  doors?: number;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  width = 0.9,
  height = 1.9,
  depth = 0.45,
  color = "#3b4a5f",
  doors = 2,
}) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, height / 2, 0]} size={[width, height, depth]} color={color} />
    {Array.from({ length: doors }).map((_, i) => {
      const dw = width / doors;
      const x = -width / 2 + dw * (i + 0.5);
      return (
        <group key={i}>
          <Block position={[x, height * 0.55, depth / 2 + 0.01]} size={[dw - 0.05, height * 0.82, 0.02]} color="#2c384a" />
          <Block position={[x + dw * 0.3, height * 0.5, depth / 2 + 0.045]} size={[0.04, 0.1, 0.04]} color="#c4cbd8" metalness={0.6} roughness={0.35} />
          {[0, 1, 2].map((v) => (
            <Block
              key={v}
              position={[x, height * 0.86 - v * 0.06, depth / 2 + 0.03]}
              size={[dw * 0.55, 0.015, 0.015]}
              color="#101722"
            />
          ))}
        </group>
      );
    })}
  </group>
);

/** Old bedside heart monitor. Green emissive screen reads beautifully through bloom. */
export const Monitor: React.FC<{ position?: Vec3; rotationY?: number; screen?: string; sweep?: boolean }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  screen = "#54e08a",
  sweep = true,
}) => {
  const t = useFilmTime();
  const lineY = sweep ? 0.58 + Math.sin(t * 1.6) * 0.05 : 0.58;
  return (
    <group position={position} rotation-y={rotationY}>
      <Block position={[0, 0.5, 0]} size={[0.34, 0.24, 0.22]} color="#2b3546" />
      <Block position={[0, 0.52, 0.115]} size={[0.26, 0.16, 0.01]} color="#06110b" emissive={screen} emissiveIntensity={1.1} />
      <Block position={[0, lineY, 0.123]} size={[0.18, 0.012, 0.002]} color={screen} emissive={screen} emissiveIntensity={2} castShadow={false} />
      <Block position={[0, 0.38, 0]} size={[0.06, 0.12, 0.06]} color="#222a37" />
      <Block position={[0, 0.31, 0]} size={[0.3, 0.03, 0.2]} color="#222a37" />
      <Block position={[0, 0.145, 0]} size={[0.04, 0.29, 0.04]} color="#1a212c" />
      <Block position={[0, 0.02, 0]} size={[0.26, 0.03, 0.2]} color="#1a212c" />
    </group>
  );
};

/** Long carpet runner down a hallway. */
export const Carpet: React.FC<{
  position?: Vec3;
  width?: number;
  length?: number;
  /** Base weave colour. Muted burgundy reads as institutional, bright red reads as a circus. */
  tone?: string;
}> = ({ position = [0, 0.012, 0], width = 1.7, length = 8, tone = "#6e1826" }) => (
  <mesh position={position} rotation-x={-Math.PI / 2} receiveShadow>
    <planeGeometry args={[width, length]} />
    <meshStandardMaterial map={carpetTex([2, Math.max(2, Math.round(length / 1.2))], tone)} roughness={1} />
  </mesh>
);

/** Wall-mounted clock. Small detail that makes a room feel real. */
export const WallClock: React.FC<{ position?: Vec3; rotationY?: number; radius?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  radius = 0.18,
}) => (
  <group position={position} rotation-y={rotationY}>
    <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[radius, radius, 0.05, 16]} />
      <meshStandardMaterial color="#e7e2d2" roughness={0.9} />
    </mesh>
    <Block position={[0, 0, 0.035]} size={[0.012, radius * 0.55, 0.01]} color="#20242c" rotation={[0, 0, 0.5]} />
    <Block position={[0, 0, 0.04]} size={[0.01, radius * 0.8, 0.01]} color="#20242c" rotation={[0, 0, -1.9]} />
  </group>
);

export const woodTexture = (color = "#4a3524", repeat: [number, number] = [1, 1]) => plankTex(color, repeat);
export const stripeTexture = stripeTex;

/* ──────────────────────────────────────────────────────────────────────────
   PEDIATRIC WARD SET DRESSING
   Everything below is built from the same blocky atoms as the rest of the
   framework. If a place needs a new object, add it here rather than forking it
   into a video folder.
   ────────────────────────────────────────────────────────────────────────── */

/** Suspended acoustic ceiling tiles. Mount just under the structural ceiling. */
export const CeilingTiles: React.FC<{
  position?: Vec3;
  size?: [number, number];
  rotationY?: number;
}> = ({ position = [0, 0, 0], size = [5.2, 6], rotationY = 0 }) => (
  <mesh position={position} rotation={[Math.PI / 2, 0, rotationY]}>
    <planeGeometry args={size} />
    <meshStandardMaterial map={tileCeilingTex([Math.max(1, Math.round(size[0] / 0.6)), Math.max(1, Math.round(size[1] / 0.6))])} roughness={0.95} />
  </mesh>
);

/** Curtain rail with two folded panels. `gap` is how far the panels are drawn apart. */
export const Curtains: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  color?: string;
  gap?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 1.8, height = 1.7, color = "#2b4a7a", gap = 0.25 }) => {
  const panel = width / 2 - gap / 2;
  const folds = 5;
  return (
    <group position={position} rotation-y={rotationY}>
      {/* rail */}
      <Block position={[0, height / 2 + 0.06, 0.06]} size={[width + 0.24, 0.05, 0.06]} color="#1a2432" />
      {[-1, 1].map((side) => (
        <group key={side} position={[side * (width / 4 + gap / 4), 0, 0]}>
          {Array.from({ length: folds }).map((_, i) => (
            <Block
              key={i}
              position={[-panel / 2 + (panel / (folds - 1)) * i, -height / 2, (i % 2 === 0 ? 1 : -1) * 0.022]}
              size={[panel / folds + 0.02, height, 0.05]}
              map={curtainTex(color, [1, 3])}
            />
          ))}
          {/* tie-back strap */}
          <Block position={[0, -height * 0.28, 0.05]} size={[panel * 0.9, 0.05, 0.05]} color="#5c4a2e" />
        </group>
      ))}
    </group>
  );
};

/** The hero window: moonlit night sky with a rooftop silhouette. */
export const MoonWindow: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  dim?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 1.6, height = 1.4, dim = 1 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0, 0]} size={[width + 0.2, height + 0.2, 0.12]} color="#223148" />
    <mesh position={[0, 0, 0.07]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={moonWindowTex()}
        emissiveMap={moonWindowTex()}
        emissive="#ffffff"
        emissiveIntensity={0.95 * dim}
        roughness={1}
      />
    </mesh>
    {/* mullions */}
    <Block position={[0, 0, 0.09]} size={[0.05, height, 0.02]} color="#1b2740" />
    <Block position={[0, 0, 0.09]} size={[width, 0.05, 0.02]} color="#1b2740" />
    <Block position={[0, -height / 2 - 0.11, 0.1]} size={[width + 0.34, 0.09, 0.22]} color="#37445c" />
  </group>
);

/** A small teddy bear, sat against the pillow. */
export const TeddyBear: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  color?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, color = "#8a6238" }) => {
  const dark = "#6d4a28";
  return (
    <group position={position} rotation-y={rotationY} scale={scale}>
      <Block position={[0, 0.09, 0]} size={[0.16, 0.18, 0.12]} color={color} />
      <Block position={[0, 0.22, 0]} size={[0.15, 0.14, 0.13]} color={color} />
      <Block position={[-0.06, 0.31, 0]} size={[0.05, 0.05, 0.04]} color={dark} />
      <Block position={[0.06, 0.31, 0]} size={[0.05, 0.05, 0.04]} color={dark} />
      <Block position={[0, 0.22, 0.07]} size={[0.07, 0.06, 0.03]} color="#d8c39a" />
      <Block position={[-0.11, 0.14, 0]} size={[0.06, 0.12, 0.06]} color={dark} />
      <Block position={[0.11, 0.14, 0]} size={[0.06, 0.12, 0.06]} color={dark} />
      <Block position={[-0.05, 0.02, 0.02]} size={[0.08, 0.06, 0.08]} color={dark} />
      <Block position={[0.05, 0.02, 0.02]} size={[0.08, 0.06, 0.08]} color={dark} />
    </group>
  );
};

/** Hanging ceiling mobile above the bed. Rotates slowly and never repeats. */
export const CeilingMobile: React.FC<{
  position?: Vec3;
  scale?: number;
  speed?: number;
}> = ({ position = [0, 3, 0], scale = 1, speed = 0.12 }) => {
  const t = useFilmTime() * speed;
  const shapes = [
    { p: [0.42, -0.5, 0], c: "#e8c33c", s: [0.14, 0.14, 0.02] },
    { p: [-0.42, -0.42, 0.1], c: "#dfe8f2", s: [0.16, 0.1, 0.02] },
    { p: [0.16, -0.72, -0.1], c: "#7fa8dd", s: [0.12, 0.12, 0.02] },
    { p: [-0.2, -0.8, 0.05], c: "#d96a3c", s: [0.11, 0.11, 0.02] },
  ];
  return (
    <group position={position} rotation-y={t} scale={scale}>
      <Block position={[0, 0, 0]} size={[0.9, 0.03, 0.03]} color="#8b97a8" />
      <Block position={[0, 0, 0]} size={[0.03, 0.03, 0.9]} color="#8b97a8" />
      <Block position={[0, 0.25, 0]} size={[0.02, 0.5, 0.02]} color="#aab6c4" />
      {shapes.map((shape, i) => (
        <group key={i}>
          <Block position={[shape.p[0], (shape.p[1] + 0) / 2 + 0.02, shape.p[2]]} size={[0.008, Math.abs(shape.p[1]), 0.008]} color="#c3ccd8" />
          <Block position={shape.p as Vec3} size={shape.s as Vec3} color={shape.c} emissive={shape.c} emissiveIntensity={0.18} />
        </group>
      ))}
    </group>
  );
};

/** Visitor chair with a coat dumped over the back. */
export const VisitorChair: React.FC<{
  position?: Vec3;
  rotationY?: number;
  color?: string;
  coat?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, color = "#3c5878", coat = "#5a4a3a" }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.46, 0]} size={[0.52, 0.07, 0.5]} color={color} />
    <Block position={[0, 0.78, -0.22]} size={[0.52, 0.62, 0.07]} color={color} />
    {[
      [-0.21, -0.19],
      [0.21, -0.19],
      [-0.21, 0.19],
      [0.21, 0.19],
    ].map(([x, z], i) => (
      <Block key={i} position={[x, 0.21, z]} size={[0.05, 0.42, 0.05]} color="#2a3548" />
    ))}
    {/* the coat: over the top rail and hanging down the back */}
    <Block position={[0, 1.1, -0.24]} size={[0.5, 0.1, 0.09]} color={coat} />
    <Block position={[0, 0.86, -0.28]} size={[0.48, 0.42, 0.06]} color={coat} />
    <Block position={[-0.3, 0.94, -0.26]} size={[0.08, 0.3, 0.06]} color={coat} />
  </group>
);

/** Wheelchair, parked where someone left it in a hurry. */
export const Wheelchair: React.FC<{
  position?: Vec3;
  rotationY?: number;
}> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.5, 0]} size={[0.46, 0.06, 0.42]} color="#2a3242" />
    <Block position={[0, 0.78, -0.2]} size={[0.46, 0.5, 0.06]} color="#2a3242" />
    {[-0.26, 0.26].map((x) => (
      <group key={x}>
        <mesh position={[x, 0.32, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.3, 0.035, 6, 14]} />
          <meshStandardMaterial color="#1c2330" roughness={0.7} />
        </mesh>
        <Block position={[x, 0.32, 0]} size={[0.03, 0.5, 0.03]} color="#5a6474" rotation={[0, 0, 0.3]} />
      </group>
    ))}
    {[-0.2, 0.2].map((x) => (
      <group key={x}>
        <Block position={[x, 0.22, 0.22]} size={[0.04, 0.42, 0.04]} color="#5a6474" />
        <mesh position={[x, 0.07, 0.26]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <sphereGeometry args={[0.07, 8, 6]} />
          <meshStandardMaterial color="#1c2330" roughness={0.8} />
        </mesh>
      </group>
    ))}
    <Block position={[0, 0.16, 0.26]} size={[0.4, 0.04, 0.16]} color="#3a4456" />
    {[-0.26, 0.26].map((x) => (
      <Block key={x} position={[x, 0.9, -0.24]} size={[0.04, 0.12, 0.04]} color="#5a6474" />
    ))}
  </group>
);

/** Mop bucket with a wringer and a leaning mop. */
export const MopBucket: React.FC<{
  position?: Vec3;
  rotationY?: number;
}> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <mesh position={[0, 0.19, 0]} castShadow>
      <cylinderGeometry args={[0.22, 0.17, 0.38, 12, 1, true]} />
      <meshStandardMaterial color="#c8402f" roughness={0.6} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
      <circleGeometry args={[0.17, 12]} />
      <meshStandardMaterial color="#8a2a20" roughness={0.6} />
    </mesh>
    <mesh position={[0, 0.3, 0]} rotation-x={-Math.PI / 2}>
      <circleGeometry args={[0.19, 12]} />
      <meshStandardMaterial color="#7fa8c8" roughness={0.25} metalness={0.1} />
    </mesh>
    <Block position={[0, 0.42, 0]} size={[0.26, 0.08, 0.16]} color="#d8dde4" />
    {/* mop leaning against it */}
    <Block position={[0.3, 0.62, 0.08]} size={[0.025, 1.24, 0.025]} color="#8a6a44" rotation={[0.22, 0, -0.28]} />
    <Block position={[0.24, 0.06, 0.14]} size={[0.16, 0.1, 0.12]} color="#c9d2dc" rotation={[0.3, 0, -0.2]} />
  </group>
);

/** Yellow A-frame wet floor sign. */
export const WetFloorSign: React.FC<{
  position?: Vec3;
  rotationY?: number;
}> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <mesh position={[0, 0.34, 0.06]} rotation-x={-0.22} castShadow>
      <planeGeometry args={[0.34, 0.46]} />
      <meshStandardMaterial map={wetFloorTex()} emissiveMap={wetFloorTex()} emissive="#ffffff" emissiveIntensity={0.12} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[0, 0.34, -0.06]} rotation-x={0.22}>
      <planeGeometry args={[0.34, 0.46]} />
      <meshStandardMaterial color="#d8ac16" side={THREE.DoubleSide} />
    </mesh>
    <Block position={[0, 0.05, 0]} size={[0.4, 0.1, 0.3]} color="#c8a016" />
  </group>
);

/** Illuminated EXIT sign with a matching glow card. */
export const ExitSign: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  lit?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 0.62, lit = 0.9 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.05, 0]} size={[width + 0.1, 0.28, 0.09]} color="#14202a" castShadow={false} />
    <mesh position={[0, 0.05, 0.05]}>
      <planeGeometry args={[width, width * 0.4]} />
      <meshStandardMaterial
        map={exitSignTex()}
        emissiveMap={exitSignTex()}
        emissive="#ffffff"
        emissiveIntensity={lit}
        roughness={1}
      />
    </mesh>
    <Glow position={[0, 0.05, 0.2]} size={width * 2.2} color="#46e08a" opacity={0.16 * lit} />
  </group>
);

/** A child's crayon drawing taped to the wall. The story hook. */
export const ChildDrawing: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  kind?: "shadow" | "family";
  seed?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 0.62, kind = "shadow", seed = 5 }) => {
  const height = width;
  return (
    <group position={position} rotation-y={rotationY}>
      <mesh castShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={crayonDrawingTex({ kind, seed })} roughness={0.95} />
      </mesh>
      {/* tape */}
      <Block position={[-width * 0.36, height / 2 + 0.03, 0.012]} size={[0.09, 0.05, 0.02]} color="#d8d2bd" rotation={[0, 0, 0.4]} />
      <Block position={[width * 0.36, height / 2 + 0.03, 0.012]} size={[0.09, 0.05, 0.02]} color="#d8d2bd" rotation={[0, 0, -0.4]} />
    </group>
  );
};

/** Laminated patient chart hung by the bed. */
export const WallChart: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 0.42 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.05, -0.01]} size={[width + 0.06, width * 1.35 + 0.06, 0.03]} color="#c9d2dc" castShadow={false} />
    <mesh position={[0, 0, 0.012]}>
      <planeGeometry args={[width, width * 1.35]} />
      <meshStandardMaterial map={chartTex()} roughness={0.55} />
    </mesh>
    <Block position={[0, width * 0.68 + 0.02, 0.02]} size={[0.1, 0.04, 0.03]} color="#8b97a8" metalness={0.6} roughness={0.35} />
  </group>
);

/** Cork notice board with pinned memos. */
export const NoticeBoard: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  seed?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 0.9, seed = 3 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0, -0.02]} size={[width + 0.1, width * 0.75 + 0.1, 0.05]} color="#5a4630" />
    <mesh position={[0, 0, 0.01]}>
      <planeGeometry args={[width, width * 0.75]} />
      <meshStandardMaterial map={noticeBoardTex(seed)} roughness={0.95} />
    </mesh>
  </group>
);

/** IV stand with a bag and a tube that reaches the bed. */
export const IVStand: React.FC<{
  position?: Vec3;
  rotationY?: number;
  bag?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, bag = "#dce9f5" }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.02, 0]} size={[0.34, 0.04, 0.34]} color="#6f7b8c" />
    <Block position={[0, 0.82, 0]} size={[0.035, 1.64, 0.035]} color="#8b97a8" metalness={0.5} roughness={0.4} />
    <Block position={[0.2, 1.6, 0]} size={[0.4, 0.03, 0.03]} color="#8b97a8" metalness={0.5} roughness={0.4} />
    <Block position={[0.32, 1.42, 0]} size={[0.15, 0.26, 0.05]} color={bag} emissive="#9fd8ff" emissiveIntensity={0.16} />
    <Block position={[0.24, 1.3, 0.01]} size={[0.012, 0.5, 0.012]} color="#b8c4d2" />
    <Block position={[0.1, 1.05, 0.01]} size={[0.012, 0.4, 0.012]} color="#b8c4d2" />
  </group>
);

/** Small room-number plate beside a door. */
export const DoorPlate: React.FC<{
  position?: Vec3;
  rotationY?: number;
  label?: string;
  width?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, label = "9", width = 0.22 }) => (
  <group position={position} rotation-y={rotationY}>
    <mesh>
      <planeGeometry args={[width, width * 0.5]} />
      <meshStandardMaterial map={doorPlateTex(label)} emissiveMap={doorPlateTex(label)} emissive="#ffffff" emissiveIntensity={0.2} roughness={0.7} />
    </mesh>
  </group>
);

/** Exposed pipe run along a corridor ceiling. */
export const Pipes: React.FC<{
  position?: Vec3;
  rotationY?: number;
  length?: number;
  count?: number;
  color?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, length = 9, count = 3, color = "#5d6b7a" }) => (
  <group position={position} rotation-y={rotationY}>
    {Array.from({ length: count }).map((_, i) => (
      <group key={i} position={[i * 0.16 - (count - 1) * 0.08, -i * 0.11, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.055 - i * 0.008, 0.055 - i * 0.008, length, 8]} />
          <meshStandardMaterial color={i === 0 ? "#7d8b9a" : color} roughness={0.55} metalness={0.35} />
        </mesh>
        {[-length / 2 + 0.4, 0, length / 2 - 0.4].map((z, j) => (
          <mesh key={j} position={[0, 0, z]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.16, 0.2, 0.05]} />
            <meshStandardMaterial color="#3d4a58" roughness={0.6} metalness={0.4} />
          </mesh>
        ))}
      </group>
    ))}
  </group>
);

/** Ceiling ventilation grille. */
export const CeilingVent: React.FC<{
  position?: Vec3;
  rotationY?: number;
  size?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, size = 0.5 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0, 0]} size={[size, 0.05, size]} color="#8b97a8" />
    {Array.from({ length: 6 }).map((_, i) => (
      <Block key={i} position={[0, -0.03, -size / 2 + 0.05 + i * (size - 0.1) / 5]} size={[size - 0.08, 0.02, 0.03]} color="#3d4a58" />
    ))}
  </group>
);

/** Shallow puddle. Cheap, readable, and it catches the corridor light. */
export const Puddle: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  depth?: number;
  opacity?: number;
}> = ({ position = [0, 0.016, 0], rotationY = 0, width = 1.1, depth = 0.7, opacity = 0.45 }) => (
  <mesh position={position} rotation={[-Math.PI / 2, 0, rotationY]}>
    <planeGeometry args={[width, depth]} />
    <meshStandardMaterial color="#8fb6dd" transparent opacity={opacity} roughness={0.15} metalness={0.4} depthWrite={false} />
  </mesh>
);

/** Wet footprints trailing across the floor. */
export const Footprints: React.FC<{
  position?: Vec3;
  rotationY?: number;
  length?: number;
}> = ({ position = [0, 0.018, 0], rotationY = 0, length = 3 }) => (
  <mesh position={position} rotation={[-Math.PI / 2, 0, rotationY]}>
    <planeGeometry args={[0.5, length]} />
    <meshStandardMaterial map={footprintTex()} transparent opacity={0.55} roughness={0.2} metalness={0.2} depthWrite={false} />
  </mesh>
);

/** Radiator under the window. */
export const Radiator: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 1.3 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.32, 0]} size={[width, 0.5, 0.14]} color="#c9d2dc" />
    {Array.from({ length: 8 }).map((_, i) => (
      <Block key={i} position={[-width / 2 + 0.08 + i * (width - 0.16) / 7, 0.32, 0.08]} size={[0.05, 0.44, 0.03]} color="#9aa6b2" />
    ))}
    <Block position={[width / 2 - 0.06, 0.62, 0]} size={[0.06, 0.1, 0.06]} color="#7d8b9a" metalness={0.5} roughness={0.4} />
  </group>
);

/** Bedside cabinet with a drawer and a cup. */
export const BedsideTable: React.FC<{
  position?: Vec3;
  rotationY?: number;
  color?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, color = "#2b3548" }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.3, 0]} size={[0.55, 0.6, 0.45]} color={color} />
    <Block position={[0, 0.58, 0]} size={[0.6, 0.05, 0.5]} color="#3a4761" />
    <Block position={[0, 0.36, 0.235]} size={[0.44, 0.16, 0.02]} color="#232e40" />
    <Block position={[0, 0.36, 0.25]} size={[0.14, 0.03, 0.03]} color="#c4cbd8" metalness={0.6} roughness={0.35} />
    <Block position={[0.14, 0.64, 0.05]} size={[0.09, 0.1, 0.09]} color="#dfe7ef" />
  </group>
);

/** Scattered toy blocks. A ward for children is never tidy. */
export const ToyBlocks: React.FC<{
  position?: Vec3;
  rotationY?: number;
  count?: number;
  seed?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, count = 7, seed = 4 }) => {
  const rand = mulberry32(seed * 977 + 11);
  const colors = ["#c8402f", "#3b74c4", "#d9a441", "#4a9b5c", "#7a5aa6", "#3f9aa0"];
  return (
    <group position={position} rotation-y={rotationY}>
      {Array.from({ length: count }).map((_, i) => (
        <Block
          key={i}
          position={[(rand() - 0.5) * 0.9, 0.035, (rand() - 0.5) * 0.7]}
          size={[0.07, 0.07, 0.07]}
          color={colors[i % colors.length]}
          rotation={[0, rand() * 0.8, 0]}
        />
      ))}
    </group>
  );
};

/** Hard institutional vinyl wall. Use instead of flat pixelTex for big surfaces. */
export const WardWall: React.FC<{
  position?: Vec3;
  size: Vec3;
  color?: string;
  repeat?: [number, number];
  rotationY?: number;
}> = ({ position = [0, 0, 0], size, color = "#3a5a72", repeat = [4, 2], rotationY = 0 }) => (
  <Block position={position} size={size} map={wardWallTex(color, repeat)} rotationY={rotationY} />
);

import * as THREE from "three";
import type { Vec3 } from "./math";
import { useFlicker } from "./Look";
import { carpetTex, pixelTex, plankTex, posterTex, stripeTex, windowTex } from "./textures";
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
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  width = 1.15,
  length = 2.15,
  frame = "#2a3448",
  sheet = "#c9dceb",
  blanket = "#2a6aa8",
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
      <Block position={[0, 0.585, -l / 2 + 0.29]} size={[w * 0.62, 0.1, 0.34]} map={pixelTex("#e3ecf4", [1, 1])} />
      <Block position={[0, 0.56, -l / 2 - 0.05]} size={[w + 0.08, 0.78, 0.07]} color={frame} />
      <Block position={[0, 0.88, -l / 2 - 0.055]} size={[w * 0.5, 0.04, 0.1]} color="#3b4a66" />
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
}> = ({
  position = [0, 0, 0],
  size = [0.85, 0.2],
  color = "#dfeaff",
  lightColor = "#d6e8ff",
  intensity = 7,
  distance = 7,
  flicker = [],
}) => {
  const level = useFlicker(1, flicker, 7);
  return (
    <group position={position}>
      <Block position={[0, 0.03, 0]} size={[size[0], 0.06, size[1]]} color={color} emissive={color} emissiveIntensity={0.95 * level} castShadow={false} />
      <Block position={[0, 0.13, 0]} size={[size[0] + 0.1, 0.16, size[1] + 0.1]} color="#141a24" castShadow={false} />
      <pointLight color={lightColor} intensity={intensity * level} distance={distance} decay={2} position={[0, -0.1, 0]} />
      <Glow position={[0, -0.06, 0]} size={Math.max(size[0], size[1]) * 1.9} color={lightColor} opacity={0.14 * level} />
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
export const Monitor: React.FC<{ position?: Vec3; rotationY?: number; screen?: string }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  screen = "#54e08a",
}) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.5, 0]} size={[0.34, 0.24, 0.22]} color="#2b3546" />
    <Block position={[0, 0.52, 0.115]} size={[0.26, 0.16, 0.01]} color="#06110b" emissive={screen} emissiveIntensity={1.1} />
    <Block position={[0, 0.58, 0.123]} size={[0.18, 0.012, 0.002]} color={screen} emissive={screen} emissiveIntensity={2} castShadow={false} />
    <Block position={[0, 0.38, 0]} size={[0.06, 0.12, 0.06]} color="#222a37" />
    <Block position={[0, 0.31, 0]} size={[0.3, 0.03, 0.2]} color="#222a37" />
    <Block position={[0, 0.145, 0]} size={[0.04, 0.29, 0.04]} color="#1a212c" />
    <Block position={[0, 0.02, 0]} size={[0.26, 0.03, 0.2]} color="#1a212c" />
  </group>
);

/** Long carpet runner down a hallway. */
export const Carpet: React.FC<{
  position?: Vec3;
  width?: number;
  length?: number;
}> = ({ position = [0, 0.012, 0], width = 1.7, length = 8 }) => (
  <mesh position={position} rotation-x={-Math.PI / 2} receiveShadow>
    <planeGeometry args={[width, length]} />
    <meshStandardMaterial map={carpetTex([2, Math.max(2, Math.round(length / 1.2))])} roughness={1} />
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

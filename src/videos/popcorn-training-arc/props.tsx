import { useMemo } from "react";
import * as THREE from "three";
import { Block, PixelText, Vox, mulberry32, pixelTex } from "../../engine";
import type { Vec3 } from "../../engine";

const RUBY = "#b53b31";
const CREAM = "#f5dcab";
const BOARD = "#213339";
const GOLD = "#ffbd4a";

/** Narrow, capped cable. Endpoints are world marks, not hidden lengths. */
export const Cord = ({ from, to, color = "#293235", width = 0.017 }: { from: Vec3; to: Vec3; color?: string; width?: number }) => {
  const d = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
  return <group quaternion={q} position={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2]}>
    <Block size={[width, d.length(), width]} color={color} castShadow={false} />
  </group>;
};

export const DeskMouse = ({ at, yaw = 0 }: { at: Vec3; yaw?: number }) => (
  <group position={at} rotation-y={yaw}>
    <Block position={[0, 0.021, 0]} size={[0.225, 0.038, 0.298]} color="#214448" />
    <Block position={[0, 0.062, -0.01]} size={[0.211, 0.065, 0.268]} color="#7cbcbb" />
    <Block position={[0, 0.10, 0.05]} size={[0.176, 0.038, 0.124]} color="#e1dfc5" />
    {[-1, 1].map((s) => <Block key={s} position={[s * 0.051, 0.103, -0.076]} size={[0.092, 0.035, 0.112]} color="#f7e4b8" />)}
    <Block position={[0, 0.125, -0.071]} size={[0.028, 0.025, 0.056]} color="#5e7572" />
    <Block position={[0, 0.059, 0.136]} size={[0.095, 0.017, 0.008]} color="#67ded3" emissive="#44d7bd" emissiveIntensity={0.7} />
  </group>
);

export const RepLights = ({ at, n, miss = false, scale = 1 }: { at: Vec3; n: number; miss?: boolean; scale?: number }) => (
  <group position={at} scale={scale}>
    <Block position={[0, 0.065, 0]} size={[0.50, 0.13, 0.14]} color={BOARD} />
    <Block position={[0, 0.139, 0]} size={[0.45, 0.022, 0.128]} color="#6e847d" castShadow={false} />
    {[-0.15, 0, 0.15].map((x, i) => {
      const on = i < n || i === 2 && miss;
      const color = i === 2 && miss ? "#ff574c" : i < n ? "#60ec9c" : "#425d5b";
      return <Block key={i} position={[x, 0.070, 0.077]} size={[0.092, 0.066, 0.019]} color={color} emissive={color} emissiveIntensity={on ? 0.62 : 0.06} castShadow={false} />;
    })}
  </group>
);

export const Stopwatch = ({ at, yaw, n, pulse }: { at: Vec3; yaw: number; n: number; pulse: number }) => (
  <group position={at} rotation-y={yaw}>
    <Block position={[0, 0.01, 0]} size={[0.166, 0.19, 0.079]} color="#4a6768" />
    <Block position={[0, 0.01, 0.042]} size={[0.139, 0.148, 0.017]} color="#1b282e" />
    <Block position={[0, 0.015, 0.052]} size={[0.110, 0.090, 0.008]} color="#294e49" emissive="#255348" emissiveIntensity={0.25 + 0.6 * pulse} castShadow={false} />
    <Block position={[0, 0.112 - pulse * 0.010, 0]} size={[0.058, 0.022, 0.056]} color={GOLD} />
    <PixelText text={`0${n}`} height={0.065} maxWidth={0.10} position={[0, 0.018, 0.060]} color="#acf9c3" />
  </group>
);

export const Dish = ({ at, cleaned }: { at: Vec3; cleaned: number }) => (
  <group position={at}>
    <Block position={[0, 0.014, 0]} size={[0.435, 0.028, 0.353]} color="#a5c6c7" />
    <Block position={[0, 0.036, 0]} size={[0.405, 0.025, 0.327]} color="#f4ebce" />
    <Block position={[0, 0.050, 0]} size={[0.350, 0.010, 0.275]} color="#c9e1d8" />
    {[[-0.104, 0.045], [0.004, -0.045], [0.108, 0.038]].map(([x, z], i) => i < cleaned ? null : (
      <group key={i} position={[x, 0.058, z]}>
        <Block size={[0.084, 0.005, 0.104]} color="#93603c" castShadow={false} />
        <Block position={[0.038, 0.002, -0.031]} size={[0.040, 0.005, 0.067]} color="#ae7645" castShadow={false} />
      </group>
    ))}
  </group>
);

export const Sponge = ({ at, yaw = 0 }: { at: Vec3; yaw?: number }) => (
  <group position={at} rotation-y={yaw}>
    <Block position={[0, 0.012, 0]} size={[0.191, 0.022, 0.174]} map={pixelTex("#64885a", [1, 1], { jitter: 0.18 })} />
    <Block position={[0, 0.045, 0]} size={[0.192, 0.05, 0.173]} map={pixelTex("#e5bc4b", [1, 1], { jitter: 0.24 })} />
    <Block position={[0, 0.074, 0]} size={[0.174, 0.016, 0.157]} color="#f2d658" castShadow={false} />
  </group>
);

export const Foam = ({ x, y, z, progress }: { x: number; y: number; z: number; progress: number }) => {
  if (progress < 0 || progress > 1) return null;
  return <group position={[x, y, z]}>
    {[0, 1, 2, 3, 4].map((i) => {
      const u = (1 - progress) * (0.042 + (i % 3) * 0.013);
      return <Block key={i} position={[(i - 2) * progress * 0.13, Math.sin(progress * Math.PI) * (0.09 + 0.02 * i), (i % 2 - 0.5) * 0.16 * progress]} size={[u, u, u]} rotation={[i, progress * 2, i * 0.5]} color={i % 2 ? "#aee5e9" : "#fff7e7"} castShadow={false} />;
    })}
  </group>;
};

/** Golden, cross-shaped, chunky enough to follow in a phone frame. */
export const Kernel = ({ at, scale = 1, rotation = [0, 0, 0] }: { at: Vec3; scale?: number; rotation?: Vec3 }) => (
  <group position={at} rotation={rotation} scale={scale}>
    <Block size={[0.088, 0.080, 0.083]} color="#f3c260" />
    <Block position={[-0.040, 0.020, 0.019]} size={[0.056, 0.061, 0.064]} color="#fff2c9" />
    <Block position={[0.025, 0.038, -0.018]} size={[0.073, 0.066, 0.060]} color="#fff8d5" />
    <Block position={[0.027, -0.025, 0.033]} size={[0.064, 0.050, 0.057]} color="#ffc46b" castShadow={false} />
  </group>
);

const FILL = new THREE.BoxGeometry(1, 1, 1);
const COLORS = ["#fff0c1", "#eeb556", "#fff8db"].map((color) => new THREE.MeshStandardMaterial({ color, roughness: 1 }));
const PopcornPile = () => {
  const mats = useMemo(() => {
    const rng = mulberry32(1954);
    return COLORS.map((material, c) => {
      const m = new THREE.InstancedMesh(FILL, material, 12);
      for (let i = 0; i < m.count; i++) {
        const o = new THREE.Object3D();
        const r = 0.046 + rng() * 0.060;
        const x = (rng() - 0.5) * 0.318;
        const z = (rng() - 0.5) * 0.318;
        o.position.set(x, 0.375 + 0.10 * (1 - Math.hypot(x, z) * 4) + rng() * 0.049, z);
        o.rotation.set(rng(), rng() * Math.PI, -0.22 + rng() * 0.35);
        o.scale.set(r, r * (0.69 + rng() * 0.4), r);
        o.updateMatrix();
        m.setMatrixAt(i, o.matrix);
      }
      m.computeBoundingSphere();
      m.name = `kernel pile ${c}`;
      return m;
    });
  }, []);
  return <>{mats.map((m) => <primitive key={m.name} object={m} />)}</>;
};

export const Carton = ({ at, tilt = 0, yaw = 0 }: { at: Vec3; tilt?: number; yaw?: number }) => (
  <group position={at} rotation={[0, yaw, tilt]}>
    <Block position={[0, 0.017, 0]} size={[0.395, 0.034, 0.395]} color={RUBY} />
    {[0, 1, 2, 3].map((i) => (
      <group key={i} rotation-y={i * Math.PI / 2}>
        <Block position={[0, 0.224, 0.200]} size={[0.423, 0.427, 0.029]} color={CREAM} />
        {[-0.136, 0, 0.136].map((x) => <Block key={x} position={[x, 0.218, 0.216]} size={[0.073, 0.381, 0.009]} color={RUBY} castShadow={false} />)}
        <Block position={[0, 0.438, 0.207]} size={[0.467, 0.035, 0.048]} color="#e2aa7c" />
      </group>
    ))}
    <Block position={[0, 0.222, 0.226]} size={[0.341, 0.168, 0.018]} color="#922b2c" />
    <PixelText text="POP" height={0.110} maxWidth={0.30} position={[0, 0.228, 0.237]} color="#ffebae" />
    <Block position={[0.255, 0.422, 0]} size={[0.09, 0.055, 0.089]} color="#edad58" />
    <PopcornPile />
  </group>
);

export const DrillBoard = ({ at }: { at: Vec3 }) => (
  <group position={at}>
    <Vox kind="planks" tint="#5a4030" size={[1.57, 0.62, 0.09]} />
    <Block position={[0, 0, 0.054]} size={[1.47, 0.52, 0.033]} color="#203e3a" />
    <Block position={[0, -0.333, 0.045]} size={[1.59, 0.043, 0.17]} color="#9f6e43" />
    <PixelText text="DAY 1" height={0.245} position={[-.047, 0.116, 0.075]} color="#ffdc7d" />
    {/* The shared glyph table has no colon. Two pixel studs on the board. */}
    {[.146, .079].map((y) => <group key={y} position={[.281, y, .074]}>
      <Block size={[.059, .059, .011]} color="#090c0b" castShadow={false} />
      <mesh position={[0, 0, .007]}><planeGeometry args={[.023, .023]} />
        <meshBasicMaterial color="#ffdc7d" toneMapped={false} />
      </mesh>
    </group>)}
    {[-1, 1].map((side) => <Vox key={side} kind="log" tint="#634e32" position={[side * .59, -.444, -.079]} size={[.063, .49, .077]} />)}
    <PixelText text="POPCORN TRAINING" height={0.127} maxWidth={1.43} position={[0, -0.123, 0.075]} />
  </group>
);

import type React from "react";
import * as THREE from "three";
import { Block, Vox } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/** Additive pack props for Freeze Bell. Existing actors, buildings and their defaults are untouched. */
type Placed = { position?: Vec3; rotationY?: number; scale?: number };

/** A scored, square-ended village loaf. Origin is its underside. */
export const Bread: React.FC<Placed & { bun?: boolean; bitten?: boolean }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, bun = false, bitten = false }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Block size={[bun ? 0.34 : 0.58, 0.11, 0.3]} position={[0, 0.055, 0]} color="#a96529" />
    <Block size={[bun ? 0.3 : 0.52, 0.12, 0.27]} position={[0, 0.16, 0]} color="#d99c4a" />
    <Block size={[bun ? 0.23 : 0.43, 0.055, 0.21]} position={[0, 0.245, 0]} color="#edbf70" />
    {(bun ? [0] : [-0.15, 0, 0.15]).map((x) => <Block key={x} position={[x, 0.277, 0]} size={[0.035, 0.012, 0.2]} color="#fff0c0" castShadow={false} />)}
    {bitten ? <Block position={[0.14, 0.19, 0.11]} size={[0.15, 0.13, 0.1]} color="#fff0c0" /> : null}
  </group>
);

/** An open basket, with a square wicker handle and separate slats. Origin is the bottom. */
export const Basket: React.FC<Placed & { filled?: boolean }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, filled = false }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Block position={[0, 0.035, 0]} size={[0.58, 0.07, 0.38]} color="#926132" />
    {[-1, 1].map((s) => <group key={s}>
      <Block position={[0, 0.2, s * 0.2]} size={[0.64, 0.32, 0.055]} color="#ba8746" />
      <Block position={[s * 0.3, 0.2, 0]} size={[0.055, 0.32, 0.4]} color="#b07b3b" />
      <Block position={[s * 0.3, 0.53, 0]} size={[0.045, 0.4, 0.045]} color="#dfbd78" />
      {[-0.22, -0.11, 0, 0.11, 0.22].map((x) => <Block key={x} position={[x, 0.2, s * 0.232]} size={[0.025, 0.32, 0.013]} color="#e3bb70" castShadow={false} />)}
      <Block position={[0, 0.36, s * 0.21]} size={[0.66, 0.055, 0.07]} color="#d2a15c" />
    </group>)}
    <Block position={[0, 0.73, 0]} size={[0.64, 0.045, 0.045]} color="#dfbd78" />
    {filled ? <><Bread position={[-0.12, 0.15, 0]} scale={0.75} /><Bread position={[0.14, 0.24, 0]} scale={0.7} bun /></> : null}
  </group>
);

/** A little canvas backpack: back is -Z, front straps wrap round the wearer. */
export const Backpack: React.FC<Placed & { open?: boolean }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, open = false }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    {open ? <>
      <Vox kind="wool" tint="#9f3938" position={[0, 0.025, 0]} size={[0.46, 0.05, 0.62]} />
      <Block position={[0, 0.056, 0]} size={[0.38, 0.012, 0.54]} color="#482b2d" />
      {[-1, 1].map((s) => <group key={s}>
        <Vox kind="wool" tint="#9f3938" position={[s * 0.21, 0.14, 0]} size={[0.05, 0.24, 0.62]} />
        <Vox kind="wool" tint="#ba5242" position={[0, 0.14, s * 0.29]} size={[0.42, 0.24, 0.05]} />
      </group>)}
    </> : <Vox kind="wool" tint="#9f3938" position={[0, 0.25, -0.19]} size={[0.44, 0.5, 0.2]} />}
    <Vox kind="wool" tint="#ba5242" position={[0, 0.22, -0.315]} size={[0.34, 0.24, 0.065]} />
    <Block position={[0, 0.36, -0.35]} size={[0.34, 0.04, 0.025]} color="#f3d9a4" />
    {[-1, 1].map((s) => <group key={s}>
      <Block position={[s * 0.16, 0.29, 0.075]} size={[0.065, 0.56, 0.035]} color="#d7b16b" />
      <Block position={[s * 0.16, 0.57, -0.05]} size={[0.065, 0.055, 0.3]} color="#d7b16b" />
      <Block position={[s * 0.16, 0.14, 0.1]} size={[0.085, 0.08, 0.018]} color="#e9c65b" metalness={0.5} />
    </group>)}
  </group>
);

export const WaterBottle: React.FC<Placed> = ({ position = [0, 0, 0], rotationY = 0, scale = 1 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Block position={[0, 0.15, 0]} size={[0.16, 0.28, 0.16]} color="#76c7e3" opacity={0.72} roughness={0.15} />
    <Block position={[0, 0.145, 0]} size={[0.166, 0.1, 0.167]} color="#f4eedb" />
    <Block position={[0, 0.31, 0]} size={[0.09, 0.07, 0.09]} color="#258fbc" />
    <Block position={[0, 0.355, 0]} size={[0.115, 0.035, 0.115]} color="#e8f4f4" />
  </group>
);

/** A real 3D rope segment between world points, not a line drawn over the picture. */
export const RopeLine: React.FC<{ from: Vec3; to: Vec3; radius?: number; color?: string }> = ({ from, to, radius = 0.035, color = "#bf955b" }) => {
  const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to);
  const v = b.clone().sub(a);
  if (v.lengthSq() < 1e-8) return null;
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
  return <mesh position={a.add(b).multiplyScalar(0.5)} quaternion={quaternion} castShadow><cylinderGeometry args={[radius, radius, v.length(), 6]} /><meshStandardMaterial color={color} roughness={1} /></mesh>;
};

export const RopeCoil: React.FC<Placed> = ({ position = [0, 0, 0], rotationY = 0, scale = 1 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    {[0.14, 0.2, 0.26].map((r, i) => <mesh key={r} position={[0, 0.045 + i * 0.012, 0]} rotation-x={Math.PI / 2} castShadow><torusGeometry args={[r, 0.035, 4, 14]} /><meshStandardMaterial color={i % 2 ? "#c49b62" : "#ae8146"} roughness={1} /></mesh>)}
  </group>
);

/** A four-legged stool; its seat is half a block high. */
export const Stool: React.FC<Placed> = ({ position = [0, 0, 0], rotationY = 0, scale = 1 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Vox kind="planks" position={[0, 0.49, 0]} size={[0.68, 0.14, 0.64]} />
    {[-1, 1].flatMap((x) => [-1, 1].map((z) => <Vox key={`${x}${z}`} kind="log" position={[x * 0.24, 0.23, z * 0.22]} size={[0.1, 0.46, 0.1]} />))}
    <Block position={[0, 0.19, 0]} size={[0.55, 0.06, 0.07]} color="#806039" />
  </group>
);

/** An inverted, faceted glass jar. Open mouth at the floor; transparent side never writes depth. */
export const GlassJar: React.FC<Placed & { radius?: number; height?: number }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, radius = 1.45, height = 3.2 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <mesh position={[0, height / 2, 0]} renderOrder={4}>
      <cylinderGeometry args={[radius * 0.83, radius, height, 12, 1, true]} />
      <meshStandardMaterial color="#b8e2ee" transparent opacity={0.16} roughness={0.15} metalness={0.1} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
    <mesh position={[0, height, 0]}><cylinderGeometry args={[radius * 0.83, radius * 0.83, 0.07, 12]} /><meshStandardMaterial color="#c9edf3" transparent opacity={0.25} depthWrite={false} roughness={0.12} /></mesh>
    {[0.075, height].map((y, i) => <mesh key={y} position={[0, y, 0]} rotation-x={Math.PI / 2}><torusGeometry args={[radius * (i ? 0.83 : 1), 0.065, 4, 12]} /><meshStandardMaterial color="#c9f1f7" roughness={0.2} metalness={0.25} /></mesh>)}
    <Block position={[radius * 0.72, height * 0.61, radius * 0.63]} rotation={[0, 0.75, 0]} size={[0.085, height * 0.56, 0.012]} color="#e3fbff" opacity={0.48} castShadow={false} />
    {[-1, 1].map((s) => <RopeLine key={s} from={[s * radius * 0.76, 0.16, radius * 0.61]} to={[s * radius * 0.62, height - 0.15, radius * 0.52]} radius={0.025} color="#d8f7f8" />)}
  </group>
);

/** A large slotted screw. Usually small in a set; the scale reveal makes its threads climbable. */
export const Screw: React.FC<Placed & { height?: number }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, height = 2.4 }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <mesh position={[0, height / 2, 0]} castShadow><cylinderGeometry args={[0.22, 0.22, height, 10]} /><meshStandardMaterial color="#687582" metalness={0.65} roughness={0.4} /></mesh>
    {Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[0, 0.16 + i * (height - 0.32) / 8, 0]} rotation={[Math.PI / 2, 0.15, i * 0.5]}><torusGeometry args={[0.25, 0.05, 4, 10]} /><meshStandardMaterial color="#99a5ac" metalness={0.5} roughness={0.4} /></mesh>)}
    <mesh position={[0, height, 0]} castShadow><cylinderGeometry args={[0.5, 0.46, 0.18, 8]} /><meshStandardMaterial color="#b1bac2" metalness={0.6} roughness={0.35} /></mesh>
    <Block position={[0, height + 0.095, 0]} size={[0.7, 0.012, 0.1]} color="#313c48" castShadow={false} />
  </group>
);

import { useMemo } from "react";
import * as THREE from "three";
import { Block, Glow, Sign, clamp01, lerp, vlerp } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/** The broken egg is a physical prop, not a title card. Closed=cracked, open=two shell pieces. */
export const MonsterEgg: React.FC<{
  position: Vec3;
  open?: number;
  shell?: string;
  scale?: number;
}> = ({ position, open = 0, shell = "#f2e7cb", scale = 1 }) => {
  const hatch = clamp01(open);
  const crack = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.19, 0.23, -0.24),
    new THREE.Vector3(-0.06, 0.16, -0.32),
    new THREE.Vector3(-0.12, 0.04, -0.34),
    new THREE.Vector3(0.08, -0.05, -0.33),
    new THREE.Vector3(0.02, -0.18, -0.31),
    new THREE.Vector3(0.2, -0.25, -0.22),
  ], false, "centripetal"), []);
  return (
    <group position={position} scale={scale}>
      {/* Whole egg and jagged front crack persist until it opens. */}
      {hatch < 0.78 && (
        <group position={[0, 0.45, 0]} scale={[1, 1.22, 1]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.37, 12, 10]} />
            <meshStandardMaterial color={shell} flatShading roughness={1} />
          </mesh>
          <mesh>
            <tubeGeometry args={[crack, 24, 0.018, 4, false]} />
            <meshBasicMaterial color="#8d776b" />
          </mesh>
          <Block position={[-0.14, 0.23, -0.23]} size={[0.06, 0.045, 0.02]} color="#ceab8b" />
          <Block position={[0.18, -0.12, -0.26]} size={[0.07, 0.04, 0.02]} color="#ceab8b" />
        </group>
      )}
      {hatch >= 0.78 && (
        <group>
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.37, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
            <meshStandardMaterial color={shell} roughness={1} side={THREE.DoubleSide} flatShading />
          </mesh>
          <mesh position={[-0.38, 0.26, -0.18]} rotation={[0.36, 0, -0.68]} castShadow>
            <sphereGeometry args={[0.35, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={shell} roughness={1} side={THREE.DoubleSide} flatShading />
          </mesh>
          <mesh position={[0.39, 0.25, 0.1]} rotation={[-0.24, 0, 0.65]} castShadow>
            <sphereGeometry args={[0.35, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={shell} roughness={1} side={THREE.DoubleSide} flatShading />
          </mesh>
          <Block position={[-0.43, 0.08, 0.19]} size={[0.13, 0.07, 0.11]} color={shell} rotation={[0.3, 0.2, -0.4]} />
          <Block position={[0.55, 0.05, -0.11]} size={[0.14, 0.08, 0.1]} color={shell} rotation={[0, 0.3, 0.5]} />
        </group>
      )}
    </group>
  );
};

/** The *same* six-segment companion at every rank. Rise lifts its front like a guardian. */
export const Worm: React.FC<{
  position: Vec3;
  scale?: number;
  rise?: number;
  charge?: number;
  time?: number;
  facing?: number;
}> = ({ position, scale = 1, rise = 0, charge = 0, time = 0, facing = 0 }) => {
  const glow = clamp01(charge);
  const lifted = clamp01(rise);
  return (
    <group position={position} rotation-y={facing} scale={scale}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const taper = 1 - i * 0.09;
        const y = 0.22 + lifted * Math.pow(1 - i / 5, 2) * 0.78 + Math.sin(time * 3.2 - i * 0.64) * 0.028;
        return (
          <group key={i} position={[Math.sin(time * 2 - i * 0.5) * 0.038, y, -0.24 + i * 0.23]}>
            <Block size={[0.48 * taper, 0.38 * taper, 0.43]} color={i % 2 ? "#83aa75" : "#96b682"} emissive="#57cab5" emissiveIntensity={glow * 0.32} />
            <Block position={[0, 0.19 * taper, 0.02]} size={[0.36 * taper, 0.05, 0.29]} color="#b7ca8b" emissive="#8de4b8" emissiveIntensity={glow * 0.28} castShadow={false} />
          </group>
        );
      })}
      <group position={[0, 0.32 + lifted * 0.78, -0.46]} rotation-x={lifted * -0.11}>
        <Block size={[0.57, 0.48, 0.55]} color="#a7c58a" emissive="#58d5b5" emissiveIntensity={glow * 0.3} />
        <Block position={[-0.15, 0.058, -0.29]} size={[0.095, 0.1, 0.022]} color="#fff7e5" emissive="#c9fff6" emissiveIntensity={glow * 0.7} castShadow={false} />
        <Block position={[0.15, 0.058, -0.29]} size={[0.095, 0.1, 0.022]} color="#fff7e5" emissive="#c9fff6" emissiveIntensity={glow * 0.7} castShadow={false} />
        <Block position={[-0.134, 0.052, -0.305]} size={[0.035, 0.054, 0.014]} color="#334f52" castShadow={false} />
        <Block position={[0.166, 0.052, -0.305]} size={[0.035, 0.054, 0.014]} color="#334f52" castShadow={false} />
        <Block position={[0, -0.12, -0.294]} size={[0.17, 0.027, 0.02]} color="#5c755a" castShadow={false} />
        <Block position={[-0.2, 0.29, 0.04]} size={[0.06, 0.18, 0.06]} color="#b8d18f" rotation={[0, 0, -0.25]} />
        <Block position={[0.2, 0.29, 0.04]} size={[0.06, 0.18, 0.06]} color="#b8d18f" rotation={[0, 0, 0.25]} />
        {glow > 0.02 && <Glow position={[0, 0.06, -0.38]} size={1.15} color="#80ffe2" opacity={glow * 0.16} />}
      </group>
    </group>
  );
};

const WING_SHAPE = new THREE.Shape();
WING_SHAPE.moveTo(0, 0);
WING_SHAPE.lineTo(0.42, 0.34);
WING_SHAPE.lineTo(1.2, 0.68);
WING_SHAPE.lineTo(1.03, 0.1);
WING_SHAPE.lineTo(0.78, -0.12);
WING_SHAPE.lineTo(0.55, 0.06);
WING_SHAPE.lineTo(0, 0);

/** One classic blocky dragon: horns, muzzle, four legs, tail and thick sculpted wings. */
export const Dragon: React.FC<{
  position: Vec3;
  scale?: number;
  time?: number;
  bow?: number;
  wingsFold?: number;
  color?: string;
}> = ({ position, scale = 1, time = 0, bow = 0, wingsFold = 0, color = "#615b9e" }) => (
  <group position={position} scale={scale} rotation-y={Math.PI + bow * 0.14}>
    <Block position={[0, 0.88, 0]} size={[0.77, 0.82, 1.14]} color={color} />
    <Block position={[0, 1.33 - bow * 0.35, 0.63]} size={[0.68, 0.61, 0.62]} color="#756cb3" />
    <Block position={[0, 1.15 - bow * 0.35, 1.03]} size={[0.56, 0.23, 0.47]} color="#9080bc" />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.24, 1.46 - bow * 0.35, 0.958]} size={[0.13, 0.13, 0.027]} color="#f4e4c2" emissive="#e8d5ab" emissiveIntensity={0.18} />
        <Block position={[s * 0.24, 1.46 - bow * 0.35, 0.985]} size={[0.052, 0.07, 0.013]} color="#233c4a" />
        <Block position={[s * 0.25, 1.79 - bow * 0.35, 0.56]} size={[0.15, 0.34, 0.18]} color="#c3b0cf" rotation={[0.2, 0, s * -0.3]} />
        <Block position={[s * 0.28, 0.37, 0.36]} size={[0.22, 0.66, 0.24]} color="#56578a" />
        <Block position={[s * 0.29, 0.37, -0.39]} size={[0.22, 0.66, 0.24]} color="#56578a" />
        <group position={[s * 0.35, 1.22, -0.1]} rotation-z={s * (0.12 + Math.sin(time * 3.5) * 0.13 + bow * 0.18)} scale-x={s * (1 - 0.48 * clamp01(wingsFold))}>
          <mesh castShadow>
            <extrudeGeometry args={[WING_SHAPE, { depth: 0.1, bevelEnabled: false, steps: 1 }]} />
            <meshStandardMaterial color="#7e78b8" side={THREE.DoubleSide} roughness={0.93} />
          </mesh>
          <Block position={[0.72, 0.2, 0.06]} size={[0.71, 0.07, 0.15]} color="#524b83" rotation={[0, 0, 0.27]} />
        </group>
      </group>
    ))}
    <Block position={[0, 0.75, -0.72]} size={[0.36, 0.33, 0.62]} color="#59588b" />
    <Block position={[0, 0.62, -1.1]} size={[0.26, 0.23, 0.53]} color="#4f5281" />
    <Block position={[0, 0.57, -1.46]} size={[0.18, 0.13, 0.32]} color="#c3b0cf" />
    <Block position={[0, 0.9, 0.56]} size={[0.47, 0.35, 0.05]} color="#b3a1c4" />
  </group>
);

/** A smaller high-status phoenix. All feathers are 3D blocks; it hovers without a timer. */
export const Phoenix: React.FC<{
  position: Vec3;
  scale?: number;
  time?: number;
  bow?: number;
}> = ({ position, scale = 1, time = 0, bow = 0 }) => (
  <group position={[position[0], position[1] + Math.sin(time * 2.5) * 0.075 - bow * 0.18, position[2]]} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.48, 0.65, 0.43]} color="#d88a43" emissive="#b55030" emissiveIntensity={0.2} />
    <Block position={[0, 0.45, -0.11]} size={[0.4, 0.42, 0.38]} color="#edaa50" emissive="#ed9b48" emissiveIntensity={0.25} />
    <Block position={[0, 0.35, -0.37]} size={[0.18, 0.12, 0.24]} color="#e5d17d" />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.12, 0.5, -0.318]} size={[0.072, 0.08, 0.03]} color="#fff4d5" />
        <Block position={[s * 0.12, 0.5, -0.342]} size={[0.03, 0.04, 0.02]} color="#4d3e3d" />
        <group rotation-z={s * (Math.sin(time * 4) * 0.15 + bow * 0.35)}>
          <Block position={[s * 0.53, 0.17, 0]} size={[0.7, 0.16, 0.32]} color="#e48e43" rotation={[0, 0, s * 0.35]} />
          <Block position={[s * 0.92, 0.33, 0]} size={[0.49, 0.14, 0.26]} color="#f4bd55" rotation={[0, 0, s * 0.7]} />
          <Block position={[s * 0.69, 0.02, 0.04]} size={[0.45, 0.1, 0.22]} color="#b7593e" rotation={[0, 0, s * -0.35]} />
        </group>
        <Block position={[s * 0.12, -0.38, 0.08]} size={[0.09, 0.24, 0.1]} color="#c16e41" />
      </group>
    ))}
    <Block position={[0, 0.76, -0.04]} size={[0.16, 0.32, 0.18]} color="#e57a42" rotation={[0.14, 0, -0.25]} />
    <Block position={[-0.15, 0.66, 0.02]} size={[0.14, 0.29, 0.14]} color="#f3bd57" rotation={[0, 0, 0.4]} />
    {[-0.24, 0, 0.24].map((x, i) => (
      <Block key={x} position={[x, -0.53 - i * 0.05, 0.27]} size={[0.15, 0.55, 0.16]} color={i % 2 ? "#f3bd57" : "#ca6842"} rotation={[0.34, 0, x]} />
    ))}
    <Glow position={[0, 0.1, 0.3]} size={0.9} color="#ffad58" opacity={0.24} />
  </group>
);

/** Diegetic, framed score plate; infinity is a real 3D tube, never an HTML overlay. */
export const RankDisplay: React.FC<{
  position: Vec3;
  rank: string;
  rotationY?: number;
  width?: number;
  glow?: number;
}> = ({ position, rank, rotationY = Math.PI, width = 1.1, glow = 0 }) => {
  const infinityCurve = useMemo(() => new THREE.CatmullRomCurve3(
    Array.from({ length: 65 }, (_, i) => {
      const angle = i * Math.PI * 2 / 64;
      return new THREE.Vector3(Math.sin(angle) * 0.63, Math.sin(angle * 2) * 0.28, 0);
    }), true, "centripetal",
  ), []);
  const infinite = rank === "∞";
  return (
    <group position={position} rotation-y={rotationY}>
      <Block position={[0, 0, -0.045]} size={[width + 0.14, width * 0.63 + 0.14, 0.11]} color={infinite ? "#456765" : "#445d63"} />
      {infinite ? (
        <group scale={width / 1.55}>
          <mesh position={[0, 0.08, 0.11]}>
            <tubeGeometry args={[infinityCurve, 96, 0.068, 8, true]} />
            <meshStandardMaterial color="#aaffdd" emissive="#70f6c2" emissiveIntensity={2} roughness={0.35} />
          </mesh>
          <Sign position={[0, -0.39, 0.095]} width={0.76} height={0.18} title="RANK" bg="#4b736e" fg="#f9f0d4" frame={false} lit={0.8} />
          <Glow position={[0, 0.05, 0.22]} size={1.9} color="#83ffd4" opacity={0.22} />
        </group>
      ) : (
        <Sign position={[0, 0, 0.055]} width={width} height={width * 0.61} title={rank} subtitle="RANK" bg="#f4e7be" fg="#273f48" accent="#bc6652" lit={0.18 + glow * 0.15} frame={false} />
      )}
      {glow > 0.01 && !infinite && <Glow position={[0, 0, 0.24]} size={width * 1.4} color="#80e9c4" opacity={glow * 0.1} />}
    </group>
  );
};

/** Blocky fire travels from a real creature to a real target. progress 0..1 is scene-time based. */
export const FireStream: React.FC<{
  origin: Vec3;
  target: Vec3;
  progress: number;
  power?: number;
}> = ({ origin, target, progress, power = 1 }) => {
  const amount = clamp01(progress);
  if (amount <= 0) return null;
  const count = Math.max(1, Math.ceil(12 * amount));
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const u = i / 12;
        const p = vlerp(origin, target, u);
        const size = lerp(0.28, 0.11, u) * power;
        return (
          <group key={i} position={[p[0] + Math.sin(i * 4.7) * 0.09, p[1] + Math.sin(i * 2.4) * 0.08, p[2] + Math.cos(i * 3.9) * 0.07]}>
            <Block size={[size, size * 1.5, size]} color={i % 3 ? "#fa984e" : "#ffd076"} emissive="#ff7737" emissiveIntensity={1.5} rotation={[i * 0.21, i * 0.34, i * 0.3]} castShadow={false} />
          </group>
        );
      })}
      <Glow position={vlerp(origin, target, amount)} size={power * 1.2} color="#ffa35b" opacity={0.28} />
      <pointLight position={vlerp(origin, target, amount)} color="#ff9d55" intensity={power * 2.5} distance={3} decay={2} />
    </group>
  );
};

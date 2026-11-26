import type React from "react";
import { Block, Glow, LightPool, Vox, clamp01, mulberry32, shade } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bucket } from "../../../Topics/InThisTown";

/**
 * Custom Nether & Overworld-threshold props for "In This Town, Nobody Has Ever Slept".
 * Built strictly from textured Vox / blocky primitives, animated via explicit props (no invisible clocks).
 */

/** Glowing pulsing cluster of glowstone hung from the ceiling or beam. */
export const GlowstoneCluster: React.FC<{
  position: Vec3;
  scale?: number;
  light?: number;
  pulse?: number;
}> = ({ position, scale = 1, light = 0, pulse = 0 }) => {
  const glowAmt = 0.55 + 0.15 * Math.sin(pulse);
  return (
    <group position={position} scale={scale}>
      <Block position={[0, 0.55, 0]} size={[0.08, 0.7, 0.08]} color="#252228" />
      <Vox kind="cobble" tint="#f3b644" position={[0, 0, 0]} size={[0.72, 0.68, 0.72]} emissive="#ffa62b" emissiveIntensity={glowAmt} castShadow={false} />
      <Vox kind="cobble" tint="#ffd96b" position={[0.28, -0.22, 0.18]} size={[0.38, 0.42, 0.38]} emissive="#ffbe4a" emissiveIntensity={glowAmt + 0.1} castShadow={false} />
      <Vox kind="cobble" tint="#e89a2c" position={[-0.25, -0.15, -0.18]} size={[0.34, 0.36, 0.34]} emissive="#ff961f" emissiveIntensity={glowAmt} castShadow={false} />
      <Glow position={[0, -0.1, 0]} size={2.2} color="#ffcf6b" opacity={0.45} />
      {light > 0 ? <pointLight position={[0, -0.25, 0]} color="#ffc162" intensity={light} distance={12} decay={2} /> : null}
    </group>
  );
};

/** Bucket filled to the brim with glowing magma/lava. */
export const LavaBucket: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  scale?: number;
  swing?: number;
  fill?: number;
}> = ({ position = [0, 0, 0], rotation, scale = 1, swing = 0, fill = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Bucket swing={swing} />
    {fill > 0.05 ? (
      <>
        <Vox kind="lava" position={[0, -0.06, 0]} size={[0.48, 0.08 * fill, 0.48]} emissive="#ff6814" emissiveIntensity={0.85} castShadow={false} />
        <Glow position={[0, 0.04, 0]} size={0.85} color="#ff7f24" opacity={0.35} />
      </>
    ) : null}
  </group>
);

/** Pulsing lava surface with rising ember blocks driven by `t`. */
export const LavaSurface: React.FC<{
  position: Vec3;
  size?: [number, number];
  t?: number;
  embers?: number;
}> = ({ position, size = [18, 8], t = 0, embers = 8 }) => (
  <group position={position}>
    <Vox kind="lava" size={[size[0], 0.25, size[1]]} tile={2} emissive="#ff540c" emissiveIntensity={0.78 + 0.1 * Math.sin(t * 3.1)} castShadow={false} />
    <LightPool position={[0, 0.18, 0]} width={size[0] * 0.9} depth={size[1] * 0.9} color="#ff7722" opacity={0.28 + 0.06 * Math.sin(t * 2.4)} />
    {Array.from({ length: embers }, (_, i) => {
      const k = (t * (0.45 + (i % 3) * 0.12) + i / embers) % 1;
      const x = (((i * 37) % 100) / 100 - 0.5) * size[0] * 0.72;
      const z = (((i * 53) % 100) / 100 - 0.5) * size[1] * 0.72;
      const s = 0.08 * (1 - k * 0.5);
      return (
        <mesh key={i} position={[x, 0.2 + k * 1.4, z]} rotation={[k * 3, i, 0]}>
          <boxGeometry args={[s, s, s]} />
          <meshBasicMaterial color={i % 2 ? "#ffd55c" : "#ff6b1a"} transparent opacity={1 - k} toneMapped={false} />
        </mesh>
      );
    })}
  </group>
);

/** Planter box with red and brown Nether mushrooms in tidy rows. */
export const MushroomRow: React.FC<{
  position: Vec3;
  length?: number;
  wobble?: number;
  cutIndex?: number;
}> = ({ position, length = 4.2, wobble = 0, cutIndex = -1 }) => {
  const spots = [-0.38, -0.13, 0.13, 0.38];
  return (
    <group position={position}>
      <Vox kind="darkPlanks" tint="#522633" position={[0, 0.22, 0]} size={[length, 0.44, 1.05]} />
      <Vox kind="dirt" tint="#3b2029" position={[0, 0.45, 0]} size={[length - 0.16, 0.08, 0.9]} />
      {spots.map((frac, i) => {
        const red = i % 2 === 0;
        const shrink = i === cutIndex ? 0.55 : 1;
        const sway = Math.sin(wobble * 2.6 + i * 1.3) * 0.06;
        return (
          <group key={i} position={[frac * length * 0.85, 0.48, 0]} rotation={[0, i * 0.6, sway]} scale={shrink}>
            <Block position={[0, 0.14, 0]} size={[0.14, 0.28, 0.14]} color="#e6dfd3" />
            <Vox kind="wool" tint={red ? "#c9382e" : "#8b6344"} position={[0, 0.34, 0]} size={[0.42, 0.2, 0.42]} />
            {red ? (
              <>
                <Block position={[-0.1, 0.45, 0.08]} size={[0.09, 0.03, 0.09]} color="#f8f2e8" castShadow={false} />
                <Block position={[0.11, 0.45, -0.09]} size={[0.08, 0.03, 0.08]} color="#f8f2e8" castShadow={false} />
              </>
            ) : null}
          </group>
        );
      })}
    </group>
  );
};

/** Tallies scrawled on basalt stone blocks showing 4,000 shifts. */
export const ChalkWall: React.FC<{
  position: Vec3;
  rotationY?: number;
  rows?: number;
  cols?: number;
  highlightProgress?: number;
}> = ({ position, rotationY = 0, rows = 4, cols = 6, highlightProgress = 1 }) => {
  const total = rows * cols;
  const shown = Math.max(1, Math.round(clamp01(highlightProgress) * total));
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Vox kind="cobble" tint="#2d2730" position={[0, 1.4, -0.18]} size={[cols * 0.48 + 0.5, rows * 0.42 + 0.8, 0.32]} />
      {Array.from({ length: shown }, (_, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const x = (c - (cols - 1) / 2) * 0.45;
        const y = 0.55 + (rows - 1 - r) * 0.38;
        const bright = idx === shown - 1 && highlightProgress < 0.99 ? "#fff29e" : "#e7e3dc";
        return (
          <group key={idx} position={[x, y, 0]}>
            {[-0.12, -0.04, 0.04, 0.12].map((ox, k) => (
              <Block key={k} position={[ox, 0, 0]} size={[0.025, 0.24, 0.02]} color={bright} castShadow={false} />
            ))}
            <Block position={[0, 0, 0.015]} rotation={[0, 0, 0.95]} size={[0.026, 0.34, 0.02]} color={bright} castShadow={false} />
          </group>
        );
      })}
    </group>
  );
};

/** Minecraft Strider: squat magenta creature with drooping grey hair wisps, grumpy eyes, and stubby legs. */
export const Strider: React.FC<{
  position?: Vec3;
  rotationY?: number;
  walk?: number;
  scale?: number;
  headTilt?: number;
  lick?: number;
  cold?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, walk = 0, scale = 1, headTilt = 0, lick = 0, cold = false }) => {
  const skin = cold ? "#826b8c" : "#ad3852";
  const legSwing = Math.sin(walk * 6) * 0.38;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Two thick legs */}
      <group position={[-0.22, 0.52, 0]} rotation={[legSwing, 0, 0]}>
        <Block position={[0, -0.26, 0]} size={[0.2, 0.52, 0.2]} color={shade(skin, -0.2)} />
      </group>
      <group position={[0.22, 0.52, 0]} rotation={[-legSwing, 0, 0]}>
        <Block position={[0, -0.26, 0]} size={[0.2, 0.52, 0.2]} color={shade(skin, -0.2)} />
      </group>
      {/* Boxy head-body */}
      <group position={[0, 0.88, 0]} rotation={[headTilt, 0, Math.sin(walk * 3) * 0.04]}>
        <Vox kind="wool" tint={skin} size={[0.92, 0.78, 0.92]} />
        {/* Hair bristles */}
        {[-1, 1].map((sx) =>
          [0.24, 0.05, -0.14].map((hy, j) => (
            <Block key={`${sx}${j}`} position={[sx * 0.54, hy, -0.05]} rotation={[0, 0, sx * -0.45]} size={[0.24, 0.05, 0.66]} color="#b4abb8" castShadow={false} />
          )),
        )}
        {/* Sad eyes + brow */}
        {[-0.21, 0.21].map((ex, i) => (
          <group key={i} position={[ex, 0.04, 0.47]}>
            <Block size={[0.15, 0.14, 0.02]} color="#1d1820" castShadow={false} />
            <Block position={[0, 0.11, 0.005]} rotation={[0, 0, i === 0 ? 0.25 : -0.25]} size={[0.2, 0.06, 0.02]} color="#762238" castShadow={false} />
          </group>
        ))}
        {/* Extended lick tongue */}
        {lick > 0.05 ? (
          <Block position={[0, -0.22, 0.46 + 0.18 * lick]} rotation={[0.35 * lick, 0, Math.sin(lick * 10) * 0.08]} size={[0.18, 0.08, 0.36 * lick]} color="#ff85a8" castShadow={false} />
        ) : null}
      </group>
    </group>
  );
};

/** Iron chain-locked cellar door set into a stone bulkhead. */
export const CellarGate: React.FC<{
  position: Vec3;
  rotationY?: number;
  open?: number;
  chainRattle?: number;
}> = ({ position, rotationY = 0, open = 0, chainRattle = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="cobble" tint="#443d48" position={[-0.95, 1.15, 0]} size={[0.35, 2.3, 0.5]} />
    <Vox kind="cobble" tint="#443d48" position={[0.95, 1.15, 0]} size={[0.35, 2.3, 0.5]} />
    <Vox kind="cobble" tint="#443d48" position={[0, 2.25, 0]} size={[2.25, 0.35, 0.5]} />
    <group position={[-0.76, 0, 0.04]} rotation={[0, -open * 1.45, 0]}>
      <Vox kind="darkPlanks" position={[0.76, 1.05, 0]} size={[1.5, 2.1, 0.16]} />
      <Block position={[0.76, 1.05, 0.11]} rotation={[0, 0, chainRattle]} size={[1.45, 0.09, 0.05]} color="#4e545c" />
      <Block position={[1.28, 0.92, 0.14]} rotation={[0, 0, chainRattle * 1.5]} size={[0.22, 0.28, 0.08]} color="#6f7884" />
    </group>
  </group>
);

/** Fake wooden plank + red wool bed built when there were no sheep. */
export const FakeBed: React.FC<{
  position: Vec3;
  rotationY?: number;
  bounce?: number;
}> = ({ position, rotationY = 0, bounce = 0 }) => (
  <group position={[position[0], position[1] + bounce * 0.08, position[2]]} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.2, 0]} size={[1.22, 0.4, 2.28]} />
    <Vox kind="planks" position={[0, 0.44, 0.3]} size={[1.12, 0.08, 1.5]} />
    <Vox kind="wool" tint="#cf362d" position={[0, 0.51, 0.3]} size={[1.1, 0.08, 1.48]} />
    <Vox kind="planks" position={[0, 0.54, -0.78]} size={[0.85, 0.12, 0.42]} />
  </group>
);

/** Scorched half-burnt bed pulled from the cellar: charred planks, cinder patch, soot wool. */
export const BurntBed: React.FC<{
  position: Vec3;
  rotation?: Vec3;
  smoulder?: number;
}> = ({ position, rotation = [0, 0, 0], smoulder = 1 }) => (
  <group position={position} rotation={rotation}>
    <Vox kind="darkPlanks" tint="#231c19" position={[0, 0.19, 0]} size={[1.18, 0.36, 2.22]} />
    <Vox kind="darkPlanks" tint="#171210" position={[0, 0.52, -1.04]} rotation={[0, 0, -0.08]} size={[1.15, 0.78, 0.1]} />
    <Vox kind="wool" tint="#73201b" position={[-0.1, 0.44, 0.25]} size={[0.92, 0.14, 1.48]} />
    <Vox kind="wool" tint="#302b2a" position={[0.25, 0.45, -0.2]} size={[0.42, 0.15, 0.88]} />
    <Vox kind="wool" tint="#cbc4bc" position={[0, 0.52, -0.78]} size={[0.74, 0.1, 0.36]} />
    {smoulder > 0 ? <Glow position={[0.1, 0.55, 0.2]} size={0.9 * smoulder} color="#ff6a18" opacity={0.28 * smoulder} /> : null}
  </group>
);

/** Nether Ruined Portal frame: blackstone + crying obsidian accents + gold inlay; `lit` opens purple veil. */
export const RuinedDoor: React.FC<{
  position: Vec3;
  rotationY?: number;
  lit?: number;
  t?: number;
}> = ({ position, rotationY = 0, lit = 0, t = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Frame posts & top lintel */}
    {[-1.5, 1.5].map((x, idx) => (
      <Vox key={x} kind="cobble" tint={idx === 0 ? "#1f1826" : "#251c2e"} position={[x, 2.2, 0]} size={[0.95, 4.4, 0.95]} />
    ))}
    <Vox kind="cobble" tint="#251c2e" position={[0, 4.2, 0]} size={[3.95, 0.95, 0.95]} />
    <Vox kind="cobble" tint="#2d2336" position={[0, 0.32, 0]} size={[3.95, 0.64, 0.95]} />
    {/* Gold block ruins inlay & crying obsidian glow */}
    <Vox kind="cobble" tint="#e8b828" emissive="#c48a10" emissiveIntensity={0.22} position={[-1.5, 3.6, 0.03]} size={[0.98, 0.75, 0.98]} />
    <Vox kind="cobble" tint="#e8b828" emissive="#c48a10" emissiveIntensity={0.22} position={[1.5, 1.3, 0.03]} size={[0.98, 0.75, 0.98]} />
    <Block position={[1.5, 2.9, 0.48]} size={[0.26, 0.26, 0.04]} color="#8b3dff" emissive="#8b3dff" emissiveIntensity={0.7 + 0.3 * Math.sin(t * 2)} />
    <Block position={[-1.5, 1.7, 0.48]} size={[0.24, 0.24, 0.04]} color="#8b3dff" emissive="#8b3dff" emissiveIntensity={0.7 + 0.3 * Math.cos(t * 2.2)} />
    {lit > 0.02 ? (
      <>
        <mesh position={[0, 2.35, 0]} scale={[lit, lit, 1]}>
          <boxGeometry args={[2.05, 3.15, 0.12]} />
          <meshStandardMaterial color="#8f38ff" emissive="#a855ff" emissiveIntensity={1.2 + 0.3 * Math.sin(t * 6)} transparent opacity={0.78 * lit} />
        </mesh>
        <Glow position={[0, 2.35, 0.35]} size={4.2 * lit} color="#b86bff" opacity={0.48 * lit} />
        <pointLight position={[0, 2.3, 0.8]} color="#b46eff" intensity={3.2 * lit} distance={10} decay={2} />
      </>
    ) : null}
  </group>
);

/** Town soup cauldron & steam plumes (cold when `heat = 0`). */
export const SoupCauldron: React.FC<{
  position: Vec3;
  heat?: number;
  broken?: boolean;
}> = ({ position, heat = 0.6, broken = false }) => (
  <group position={position} rotation={[broken ? 0.5 : 0, 0, broken ? 0.4 : 0]}>
    <Block position={[0, 0.48, 0]} size={[1.1, 0.85, 1.1]} color="#35383f" />
    <Block position={[0, 0.86, 0]} size={[0.88, 0.08, 0.88]} color={heat > 0.2 ? "#b84432" : "#5e332e"} />
    {heat > 0.2 && !broken ? (
      <Glow position={[0, 1.15, 0]} size={1.1} color="#ffb98a" opacity={0.28 * heat} />
    ) : null}
  </group>
);

/** Kinetic blast cubes & splinters driven by `elapsed = max(0, t - start)`. */
export const ExplosionBurst: React.FC<{
  position: Vec3;
  elapsed: number;
  count?: number;
}> = ({ position, elapsed, count = 24 }) => {
  if (elapsed <= 0 || elapsed > 2.2) return null;
  const rand = mulberry32(404);
  const k = clamp01(elapsed / 0.55);
  return (
    <group position={position}>
      {elapsed < 0.65 ? (
        <Glow position={[0, 0.6, 0]} size={2.2 + k * 7.5} color="#ffd07b" opacity={(1 - k) * 0.92} />
      ) : null}
      {Array.from({ length: count }, (_, i) => {
        const a = rand() * Math.PI * 2;
        const spd = 2.4 + rand() * 5.2;
        const vy = 2.6 + rand() * 5.4;
        const s = 0.16 + rand() * 0.24;
        const y = Math.max(0.1, vy * elapsed - 4.9 * elapsed * elapsed);
        return (
          <mesh key={i} position={[Math.cos(a) * spd * elapsed, y, Math.sin(a) * spd * elapsed]} rotation={[elapsed * 7 + i, elapsed * 5, i]}>
            <boxGeometry args={[s, s, s]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#ff8b2e" : i % 3 === 1 ? "#634328" : "#241d1c"} emissive={i % 3 === 0 ? "#ff5500" : "#000000"} emissiveIntensity={0.8} roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
};

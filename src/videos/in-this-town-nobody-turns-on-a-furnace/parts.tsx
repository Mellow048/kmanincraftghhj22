import type React from "react";
import { Block, Glow, Vox, pixelTex } from "../../engine";
import type { Vec3 } from "../../engine";
import { Pumpkin } from "../../../Topics/InThisTown";

/**
 * SNOW GOLEM PARENTS & FURNACE TOWN PARTS
 * 100% vanilla Minecraft Snow Golem anatomy: stacked snow cubes, dark coal chest buttons,
 * stick arms that swing/throw snowballs, and a carved Pumpkin head (or derpy smile underneath).
 */

export const SnowGolem: React.FC<{
  position?: Vec3;
  rotationY?: number;
  pumpkin?: boolean;
  /** 0 = full size, 1 = melted down to a tiny puddle & pumpkin */
  melt?: number;
  armThrow?: number;
  walk?: number;
  scale?: number;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  pumpkin = true,
  melt = 0,
  armThrow = 0,
  walk = 0,
  scale = 1,
}) => {
  const s = Math.max(0.18, 1 - melt * 0.72);
  const bob = Math.abs(Math.sin(walk * 4.5)) * 0.045;
  const swing = walk !== 0 ? Math.sin(walk * 4.5) * 0.42 : 0;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={[scale, scale * s, scale]}>
      {/* Lower snow body */}
      <Block position={[0, 0.36 + bob, 0]} size={[0.74, 0.72, 0.74]} map={pixelTex("#f3f7fa", [1, 1], { jitter: 0.04 })} />
      {/* Upper snow torso */}
      <Block position={[0, 1.04 + bob, 0]} size={[0.6, 0.64, 0.6]} map={pixelTex("#eef4f8", [1, 1], { jitter: 0.04 })} />
      {/* Coal chest buttons */}
      {[0.88, 1.04, 1.2].map((y, i) => (
        <Block key={i} position={[0, y + bob, 0.31]} size={[0.09, 0.09, 0.03]} color="#1d2026" castShadow={false} />
      ))}
      {/* Stick arms */}
      <group position={[0.38, 1.15 + bob, 0]} rotation={[armThrow + swing, 0, -0.35]}>
        <Block position={[0.18, 0, 0]} size={[0.42, 0.08, 0.08]} color="#6b4a2b" />
      </group>
      <group position={[-0.38, 1.15 + bob, 0]} rotation={[-armThrow * 0.4 - swing, 0, 0.35]}>
        <Block position={[-0.18, 0, 0]} size={[0.42, 0.08, 0.08]} color="#6b4a2b" />
      </group>
      {/* Head: carved pumpkin OR derpy snowman face */}
      {pumpkin ? (
        <Pumpkin position={[0, 1.62 + bob, 0]} scale={0.92} />
      ) : (
        <group position={[0, 1.6 + bob, 0]}>
          <Block position={[0, 0, 0]} size={[0.5, 0.5, 0.5]} map={pixelTex("#f5f9fc", [1, 1], { jitter: 0.03 })} />
          <Block position={[-0.1, 0.06, 0.255]} size={[0.07, 0.07, 0.02]} color="#181a20" castShadow={false} />
          <Block position={[0.1, 0.06, 0.255]} size={[0.07, 0.07, 0.02]} color="#181a20" castShadow={false} />
          <Block position={[0, -0.06, 0.255]} size={[0.24, 0.05, 0.02]} color="#181a20" castShadow={false} />
        </group>
      )}
    </group>
  );
};

/** Crisp white snow trail tiles left behind on green grass. */
export const SnowTrail: React.FC<{ points: Vec3[] }> = ({ points }) => (
  <>
    {points.map((p, i) => (
      <Block
        key={i}
        position={[p[0], p[1] + 0.025, p[2]]}
        size={[0.85, 0.05, 0.85]}
        map={pixelTex("#f2f7fb", [1, 1], { jitter: 0.03 })}
        castShadow={false}
      />
    ))}
  </>
);

/** Stone Minecraft furnace (`lit` turns on warm glowing embers & light). */
export const Furnace: React.FC<{
  position?: Vec3;
  rotationY?: number;
  lit?: boolean;
  scale?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, lit = false, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Vox kind="cobble" position={[0, 0.45, 0]} size={[0.9, 0.9, 0.9]} />
    {/* Top oven slit */}
    <Block position={[0, 0.62, 0.455]} size={[0.56, 0.16, 0.03]} color="#22252b" castShadow={false} />
    {/* Fire chamber */}
    <Block
      position={[0, 0.24, 0.455]}
      size={[0.56, 0.26, 0.03]}
      color={lit ? "#ff7a18" : "#181a1f"}
      emissive={lit ? "#ff5c00" : "#000000"}
      emissiveIntensity={lit ? 1.4 : 0}
      castShadow={false}
    />
    {lit ? <Glow position={[0, 0.28, 0.7]} size={1.6} color="#ff8e2b" opacity={0.5} /> : null}
  </group>
);

/** Round pixel snowball projectile. */
export const Snowball: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <Block position={position} size={[0.22 * scale, 0.22 * scale, 0.22 * scale]} color="#f5f9fc" />
);

/** Cold sweet-berry wooden dinner plate. */
export const BerryPlate: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Block position={[0, 0.02, 0]} size={[0.38, 0.04, 0.38]} color="#b08450" />
    <Block position={[-0.06, 0.06, 0.04]} size={[0.09, 0.08, 0.09]} color="#b8242e" />
    <Block position={[0.07, 0.06, -0.04]} size={[0.09, 0.08, 0.09]} color="#c92a35" />
    <Block position={[0.02, 0.06, 0.07]} size={[0.08, 0.07, 0.08]} color="#9c1e26" />
  </group>
);

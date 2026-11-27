import { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useFilmTime } from "./defineFilm";
import { mulberry32 } from "./math";
import type { Vec3 } from "./math";
import { beamTex, glowTex } from "./textures";
import { useGlowScale } from "./Look";

/** Soft volumetric shaft. Two crossed quads read as a volume from most angles. */
export const GodRay: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
  crossed?: boolean;
}> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 1.4,
  height = 4,
  color = "#a9c9ff",
  opacity = 0.16,
  crossed = true,
}) => {
  const tex = beamTex();
  const g = useGlowScale();
  const material = (
    <meshBasicMaterial
      map={tex}
      color={color}
      transparent
      opacity={opacity * g}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      side={THREE.DoubleSide}
      toneMapped={false}
    />
  );
  return (
    <group position={position}>
      <mesh rotation={rotation}>
        <planeGeometry args={[width, height]} />
        {material}
      </mesh>
      {crossed && (
        <mesh rotation={[rotation[0], (rotation[1] ?? 0) + Math.PI / 2, rotation[2]]}>
          <planeGeometry args={[width, height]} />
          {material}
        </mesh>
      )}
    </group>
  );
};

/** Additive pool of light on a surface. */
export const LightPool: React.FC<{
  position?: Vec3;
  width?: number;
  depth?: number;
  color?: string;
  opacity?: number;
  rotation?: Vec3;
}> = ({ position = [0, 0.02, 0], width = 3, depth = 3, color = "#7fb0ff", opacity = 0.35, rotation }) => {
  const g = useGlowScale();
  return (
  <mesh position={position} rotation={rotation ?? [-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[width, depth]} />
    <meshBasicMaterial
      map={glowTex()}
      color={color}
      transparent
      opacity={opacity * g}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      toneMapped={false}
    />
  </mesh>
  );
};

/** Additive glow sprite for lamps and eyes. */
export const Glow: React.FC<{
  position?: Vec3;
  size?: number;
  color?: string;
  opacity?: number;
}> = ({ position = [0, 0, 0], size = 1, color = "#ffb066", opacity = 0.5 }) => {
  const g = useGlowScale();
  const s = Math.min(size, 2.0);
  const op = Math.min(0.32, opacity * 0.42) * g;
  return (
  <sprite position={position} scale={[s, s, 1]}>
    <spriteMaterial
      map={glowTex()}
      color={color}
      transparent
      opacity={op}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      toneMapped={false}
    />
  </sprite>
  );
};

/**
 * Floating dust. Deterministic drift (time-based, never Math.random), so the
 * same frame always looks identical between preview and render.
 */
export const Dust: React.FC<{
  position?: Vec3;
  area?: Vec3;
  count?: number;
  size?: number;
  color?: string;
  opacity?: number;
  seed?: number;
  speed?: number;
}> = ({
  position = [0, 1.5, 0],
  area = [5, 3, 5],
  count = 180,
  size = 0.035,
  color = "#bcd8ff",
  opacity = 0.5,
  seed = 7,
  speed = 1,
}) => {
  const t = useFilmTime() * speed;

  const seeds = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      x: (rand() - 0.5) * area[0],
      y: (rand() - 0.5) * area[1],
      z: (rand() - 0.5) * area[2],
      phase: rand() * Math.PI * 2,
      rate: 0.15 + rand() * 0.35,
      drift: 0.08 + rand() * 0.22,
    }));
  }, [count, area[0], area[1], area[2], seed]);

  const geometry = useMemo(() => new THREE.BufferGeometry(), []);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < seeds.length; i++) {
    const s = seeds[i];
    positions[i * 3] = s.x + Math.sin(t * s.rate + s.phase) * s.drift;
    positions[i * 3 + 1] = s.y + Math.sin(t * s.rate * 0.7 + s.phase * 1.7) * s.drift * 1.6;
    positions[i * 3 + 2] = s.z + Math.cos(t * s.rate * 0.9 + s.phase) * s.drift;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return (
    <points position={position} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={glowTex()}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
};

/** Thin fog card, handy for making a corridor recede into darkness. */
export const FogCard: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
}> = ({ position = [0, 1.4, 0], rotationY = 0, width = 5, height = 3, color = "#0a1722", opacity = 0.6 }) => (
  <mesh position={position} rotation-y={rotationY}>
    <planeGeometry args={[width, height]} />
    <meshBasicMaterial map={glowTex()} color={color} transparent opacity={opacity} depthWrite={false} />
  </mesh>
);

/** Soft dark contact blob so a character never looks like it is floating. */
export const ContactShadow: React.FC<{
  position?: Vec3;
  width?: number;
  depth?: number;
  opacity?: number;
}> = ({ position = [0, 0.014, 0], width = 1.1, depth = 0.6, opacity = 0.6 }) => (
  <mesh position={position} rotation-x={-Math.PI / 2}>
    <planeGeometry args={[width, depth]} />
    <meshBasicMaterial map={glowTex()} color="#000000" transparent opacity={opacity} depthWrite={false} />
  </mesh>
);

/**
 * Rising glowing embers — ideal near torches, campfires, lava, or high-tension
 * nighttime climaxes. Fully deterministic via `useFilmTime()` and `mulberry32`.
 */
export const EmberDrift: React.FC<{
  position?: Vec3;
  area?: Vec3;
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  opacity?: number;
  seed?: number;
}> = ({
  position = [0, 0, 0],
  area = [2.4, 2.8, 2.4],
  count = 24,
  color = "#ff8a2b",
  size = 0.075,
  speed = 0.85,
  opacity = 0.85,
  seed = 77,
}) => {
  const t = useFilmTime();
  const particles = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      x: (rand() - 0.5) * area[0],
      y0: rand(),
      z: (rand() - 0.5) * area[2],
      phase: rand() * Math.PI * 2,
      swirl: 0.08 + rand() * 0.22,
      rate: 0.7 + rand() * 0.7,
    }));
  }, [count, area[0], area[2], seed]);

  const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const progress = (p.y0 + (t * speed * p.rate) / Math.max(0.5, area[1])) % 1;
    positions[i * 3] = p.x + Math.sin(t * 2.2 + p.phase) * p.swirl;
    positions[i * 3 + 1] = progress * area[1];
    positions[i * 3 + 2] = p.z + Math.cos(t * 1.8 + p.phase) * p.swirl;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return (
    <points position={position} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={glowTex()}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
};

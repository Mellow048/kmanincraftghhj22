import React from "react";
import { Block, Vox } from "../../engine";
import type { Vec3 } from "../../engine";

/** Iconic blocky Minecraft Bee with animated flapping wings, optional angry red eyes or still death pose. */
export const BeeMob: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  angry?: boolean;
  still?: boolean;
  time?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, angry = false, still = false, time = 0 }) => {
  const flap = still ? 0.08 : Math.sin(time * (angry ? 44 : 28)) * 0.55;
  const bob = still ? 0 : Math.sin(time * 5.2) * 0.06;
  const eyeColor = angry ? "#e62626" : "#1c1f24";

  return (
    <group position={[position[0], position[1] + bob, position[2]]} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Chubby yellow-and-black striped body */}
      <Block position={[0, 0, 0.14]} size={[0.38, 0.36, 0.24]} color="#f5c63b" />
      <Block position={[0, 0, -0.04]} size={[0.38, 0.36, 0.12]} color="#26201a" />
      <Block position={[0, 0, -0.17]} size={[0.38, 0.36, 0.14]} color="#f5c63b" />
      <Block position={[0, 0, -0.3]} size={[0.38, 0.36, 0.12]} color="#26201a" />
      {/* Eyes flush on front face (z = 0.265) */}
      <Block position={[-0.1, 0.03, 0.265]} size={[0.09, 0.12, 0.01]} color={eyeColor} emissive={angry ? "#ff2222" : undefined} emissiveIntensity={angry ? 0.5 : 0} />
      <Block position={[0.1, 0.03, 0.265]} size={[0.09, 0.12, 0.01]} color={eyeColor} emissive={angry ? "#ff2222" : undefined} emissiveIntensity={angry ? 0.5 : 0} />
      {/* Antennae */}
      <Block position={[-0.08, 0.12, 0.34]} size={[0.03, 0.03, 0.14]} color="#1f1b17" />
      <Block position={[0.08, 0.12, 0.34]} size={[0.03, 0.03, 0.14]} color="#1f1b17" />
      {/* Translucent wings */}
      <group position={[-0.18, 0.19, 0]} rotation={[0, 0, flap]}>
        <Block position={[-0.18, 0, 0]} size={[0.34, 0.02, 0.24]} color="#e6f4ff" opacity={0.72} transparent castShadow={false} />
      </group>
      <group position={[0.18, 0.19, 0]} rotation={[0, 0, -flap]}>
        <Block position={[0.18, 0, 0]} size={[0.34, 0.02, 0.24]} color="#e6f4ff" opacity={0.72} transparent castShadow={false} />
      </group>
    </group>
  );
};

/** Glowing amber Honey Jar with cork lid and name tag (or empty memorial jar). */
export const HoneyJar: React.FC<{
  position?: Vec3;
  scale?: number;
  empty?: boolean;
  glow?: number;
}> = ({ position = [0, 0, 0], scale = 1, empty = false, glow = 0.28 }) => (
  <group position={position} scale={scale}>
    {/* Glass jar outer shell */}
    <Block position={[0, 0.22, 0]} size={[0.32, 0.42, 0.32]} color="#e2f2ff" opacity={0.34} transparent castShadow={false} />
    {/* Golden amber honey fill inside */}
    {!empty ? (
      <Block
        position={[0, 0.18, 0]}
        size={[0.25, 0.3, 0.25]}
        color="#f5a623"
        emissive="#e88f14"
        emissiveIntensity={glow}
      />
    ) : null}
    {/* Cork lid */}
    <Vox kind="darkPlanks" position={[0, 0.46, 0]} size={[0.24, 0.08, 0.24]} />
    {/* Paper name tag on front (z = 0.165) */}
    <Block position={[0, 0.22, 0.165]} size={[0.22, 0.1, 0.01]} color="#f0e8d2" />
  </group>
);

/** Open-front sunlit Town Hall Wall packed with glowing amber honey jars. */
export const HoneyJarWall: React.FC<{ position?: Vec3; lit?: number }> = ({ position = [0, 0, 0], lit = 1 }) => {
  const cols = [-3.0, -2.25, -1.5, -0.75, 0, 0.75, 1.5, 2.25, 3.0];
  const rows = [0.75, 1.5, 2.25, 3.0];
  return (
    <group position={position}>
      {/* Back oak wall (bottom 0.0, top 4.2, z in [-0.3, 0.0]) */}
      <Vox kind="planks" position={[0, 2.1, -0.15]} size={[7.6, 4.2, 0.3]} />
      {/* 4 Wooden shelves protruding cleanly in front of wall (z in [0.0, 0.56]) */}
      {rows.map((ry, ri) => (
        <group key={ri}>
          <Vox kind="darkPlanks" position={[0, ry - 0.05, 0.28]} size={[7.2, 0.1, 0.56]} />
          {cols.map((cx, ci) => (
            <HoneyJar
              key={ci}
              position={[cx, ry, 0.28]}
              scale={0.92}
              empty={ri === 1 && ci === 4 && lit > 1.5}
              glow={lit > 0 ? 0.28 * Math.min(1, lit) : 0.04}
            />
          ))}
        </group>
      ))}
    </group>
  );
};

/** Wooden Minecraft Bee Hive on posts with optional calming campfire smoke beneath. */
export const BeeHiveBox: React.FC<{
  position?: Vec3;
  smoke?: boolean;
  time?: number;
}> = ({ position = [0, 0, 0], smoke = false, time = 0 }) => (
  <group position={position}>
    {/* Support oak post (bottom 0.0, top 1.1) */}
    <Vox kind="darkPlanks" position={[0, 0.55, 0]} size={[0.3, 1.1, 0.3]} />
    {/* Hive box (bottom 1.1, top 2.0) */}
    <Vox kind="planks" position={[0, 1.55, 0]} size={[0.96, 0.9, 0.96]} />
    {/* Dark bee entrance slot flush on front z = 0.485 */}
    <Block position={[0, 1.48, 0.485]} size={[0.56, 0.14, 0.02]} color="#241a10" />
    {/* Optional calming campfire & rising white smoke puffs */}
    {smoke ? (
      <group position={[0, 0, 0.72]}>
        <Vox kind="darkPlanks" position={[0, 0.12, 0]} size={[0.64, 0.24, 0.64]} />
        <Block position={[0, 0.3, 0]} size={[0.28, 0.22, 0.28]} color="#ff8c24" emissive="#ff6a00" emissiveIntensity={0.65} />
        {[0, 1, 2, 3].map((i) => {
          const p = ((time * 0.65 + i * 0.25) % 1);
          return (
            <Block
              key={i}
              position={[Math.sin(p * 4 + i) * 0.14, 0.55 + p * 1.9, -p * 0.5]}
              size={[0.34, 0.28, 0.34]}
              color="#e6eaef"
              opacity={0.7 * (1 - p)}
              transparent
              castShadow={false}
            />
          );
        })}
      </group>
    ) : null}
  </group>
);

/** Wooden spoon held by the kid protagonist. */
export const WoodenSpoon: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.14, 0]} size={[0.06, 0.38, 0.04]} color="#b07c46" />
    <Block position={[0, 0.36, 0.02]} size={[0.14, 0.14, 0.06]} color="#c48e54" />
  </group>
);

/** Bright red Minecraft Poppy flower. */
export const PoppyFlower: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.18, 0]} size={[0.06, 0.36, 0.06]} color="#2f9e44" />
    <Block position={[0, 0.4, 0]} size={[0.2, 0.16, 0.2]} color="#e03131" emissive="#c92a2a" emissiveIntensity={0.14} />
    <Block position={[0, 0.42, 0]} size={[0.08, 0.18, 0.08]} color="#212529" />
  </group>
);

/** Community Flower Rally meadow rows that bloom cleanly from 0 -> 1. */
export const FlowerRallyRows: React.FC<{ position?: Vec3; progress?: number }> = ({
  position = [0, 0, 0],
  progress = 1,
}) => {
  const xs = [-4.2, -3.0, -1.8, -0.6, 0.6, 1.8, 3.0, 4.2];
  const zs = [-2.4, -1.2, 0, 1.2, 2.4];
  const total = xs.length * zs.length;
  const shown = Math.floor(Math.max(0, Math.min(1, progress)) * total);
  let idx = 0;
  return (
    <group position={position}>
      {zs.map((z) =>
        xs.map((x) => {
          idx++;
          if (idx > shown) return null;
          const isYellow = idx % 3 === 0;
          return (
            <group key={`${x}_${z}`} position={[x, 0, z]}>
              <Block position={[0, 0.18, 0]} size={[0.06, 0.36, 0.06]} color="#2f9e44" />
              <Block
                position={[0, 0.4, 0]}
                size={[0.22, 0.16, 0.22]}
                color={isYellow ? "#ffd43b" : "#e03131"}
              />
            </group>
          );
        }),
      )}
    </group>
  );
};

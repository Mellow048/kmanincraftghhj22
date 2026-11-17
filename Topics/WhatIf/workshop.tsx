import type React from "react";
import { Block, TeddyBear } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Figure } from "../Shared";

/**
 * WORKSHOP — the small things that make a repair visible: tools, a bike and the shop Max builds.
 *
 * Part of the What If pack. Positions are feet/ground points in metres; no component knows a film's location.
 */

/** A blocky steel wrench, lying with its handle along +Y in its local frame. */
export const Wrench: React.FC<{ position: Vec3; rotationY?: number; rotationZ?: number; scale?: number }> = ({
  position,
  rotationY = 0,
  rotationZ = 0,
  scale = 1,
}) => (
  <group position={position} rotation={[0, 0, rotationZ]} rotation-y={rotationY} scale={scale}>
    <Block position={[0, 0.23, 0]} size={[0.075, 0.4, 0.075]} color="#89959a" metalness={0.75} roughness={0.35} />
    <Block position={[0, 0.43, 0]} size={[0.16, 0.07, 0.075]} color="#89959a" metalness={0.75} roughness={0.35} />
    <Block position={[-0.055, 0.49, 0]} size={[0.045, 0.11, 0.075]} color="#89959a" metalness={0.75} roughness={0.35} />
    <Block position={[0.055, 0.49, 0]} size={[0.045, 0.11, 0.075]} color="#89959a" metalness={0.75} roughness={0.35} />
  </group>
);

/** A mechanic's closed toolbox. `position` is its bottom centre. */
export const ToolBox: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({
  position,
  rotationY = 0,
  scale = 1,
}) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Block position={[0, 0.19, 0]} size={[0.62, 0.34, 0.38]} color="#526b61" />
    <Block position={[0, 0.38, 0]} size={[0.66, 0.08, 0.42]} color="#354b45" />
    <Block position={[0, 0.47, 0]} size={[0.25, 0.08, 0.055]} color="#354b45" />
    <Block position={[0, 0.25, 0.205]} size={[0.09, 0.12, 0.025]} color="#d4a83d" metalness={0.5} roughness={0.45} />
    {[-1, 1].map((side) => (
      <Block key={side} position={[side * 0.23, 0.07, 0.1]} size={[0.07, 0.04, 0.07]} color="#283a36" />
    ))}
  </group>
);

/** A little bunch of flowers for a kid to carry; `position` is the bottom of the stems. */
export const FlowerBouquet: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    {[-0.16, -0.08, 0, 0.08, 0.16].map((x, i) => (
      <group key={i}>
        <Block position={[x, 0.23 + 0.04 * (i % 2), 0]} rotation={[0, 0, (i - 2) * 0.08]} size={[0.035, 0.46 + 0.05 * (i % 2), 0.035]} color="#4c8050" />
        <Block position={[x, 0.49 + 0.04 * (i % 2), 0]} size={[0.13, 0.12, 0.12]} color={i % 2 ? "#e45d68" : "#f2c84b"} />
        <Block position={[x, 0.49 + 0.04 * (i % 2), 0.07]} size={[0.045, 0.045, 0.025]} color="#fff1d5" castShadow={false} />
      </group>
    ))}
    <Block position={[0, 0.08, 0]} size={[0.5, 0.08, 0.1]} color="#c9a878" />
  </group>
);

/** A poor, patchy coat (or the clean work coat at the end) laid over the Echo's torso. */
export const EchoCoat: React.FC<{ position: Vec3; color?: string; opacity?: number; ragged?: boolean }> = ({
  position,
  color = "#59636b",
  opacity = 0.95,
  ragged = true,
}) => (
  <group position={position}>
    <Block position={[0, 0.98, 0.18]} size={[0.58, 0.59, 0.08]} color={color} opacity={opacity} />
    <Block position={[-0.34, 0.98, 0.12]} size={[0.16, 0.52, 0.11]} color={color} opacity={opacity} />
    <Block position={[0.34, 0.98, 0.12]} size={[0.16, 0.52, 0.11]} color={color} opacity={opacity} />
    {ragged ? (
      <>
        <Block position={[-0.17, 0.64, 0.23]} size={[0.11, 0.1, 0.035]} color="#30383d" opacity={opacity} />
        <Block position={[0.12, 0.67, 0.23]} size={[0.14, 0.07, 0.035]} color="#30383d" opacity={opacity} />
        <Block position={[0.25, 1.06, 0.235]} size={[0.13, 0.12, 0.035]} color="#8b785f" opacity={opacity} />
      </>
    ) : (
      <Block position={[0, 0.68, 0.23]} size={[0.58, 0.07, 0.035]} color={color} opacity={opacity} />
    )}
  </group>
);

/** Two square-toed work boots, placed at an Echo's feet. */
export const EchoBoots: React.FC<{ position: Vec3; color?: string; opacity?: number }> = ({
  position,
  color = "#49372a",
  opacity = 0.95,
}) => (
  <group position={position}>
    {[-1, 1].map((side) => (
      <group key={side} position={[side * 0.13, 0, 0]}>
        <Block position={[0, 0.08, 0.08]} size={[0.18, 0.14, 0.32]} color={color} opacity={opacity} />
        <Block position={[0, 0.025, 0.1]} size={[0.19, 0.05, 0.33]} color="#242a2b" opacity={opacity} />
        <Block position={[0, 0.2, -0.015]} size={[0.16, 0.26, 0.13]} color={color} opacity={opacity} />
      </group>
    ))}
  </group>
);

/** A simple steel rack with two rails; `position` is the ground under its posts. */
export const BikeRack: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[-0.38, 0.38, 0]} size={[0.08, 0.76, 0.08]} color="#455359" metalness={0.45} />
    <Block position={[0.38, 0.38, 0]} size={[0.08, 0.76, 0.08]} color="#455359" metalness={0.45} />
    <Block position={[0, 0.72, 0]} size={[0.84, 0.08, 0.08]} color="#455359" metalness={0.45} />
    <Block position={[0, 0.12, 0]} size={[1.0, 0.08, 0.22]} color="#303b40" />
  </group>
);

/** A gold necklace with a single square pendant. `position` is the bottom of the pendant. */
export const GoldNecklace: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    {[-1, 1].map((side) => (
      <Block key={side} position={[side * 0.12, 0.13, 0]} size={[0.045, 0.18, 0.035]} color="#e8bb45" metalness={0.55} roughness={0.35} />
    ))}
    <Block position={[0, 0.035, 0]} size={[0.17, 0.05, 0.035]} color="#e8bb45" metalness={0.55} roughness={0.35} />
    <Block position={[0, -0.06, 0.02]} size={[0.12, 0.12, 0.055]} color="#f2d26a" metalness={0.45} roughness={0.35} />
  </group>
);

/** A tidy stack of square gold tokens, `count` up to nine. */
export const CoinStack: React.FC<{ position: Vec3; count?: number; scale?: number }> = ({ position, count = 3, scale = 1 }) => (
  <group position={position} scale={scale}>
    {Array.from({ length: Math.max(0, Math.min(9, count)) }, (_, i) => (
      <Block
        key={i}
        position={[(i % 3 - 1) * 0.13, 0.035 + Math.floor(i / 3) * 0.07, Math.floor(i / 3) * 0.08]}
        size={[0.12, 0.05, 0.12]}
        color="#e9b93d"
        metalness={0.4}
        roughness={0.4}
      />
    ))}
  </group>
);

/** A bicycle in simple, low-poly Minecraft geometry. `position` is the ground under the wheel hubs. */
export const WorkshopBike: React.FC<{
  position: Vec3;
  rotationY?: number;
  scale?: number;
  frameColor?: string;
  chainBroken?: boolean;
}> = ({ position, rotationY = 0, scale = 1, frameColor = "#357f75", chainBroken = false }) => {
  const tube = "#30383b";
  const Beam: React.FC<{ a: [number, number]; b: [number, number]; color?: string; thickness?: number }> = ({
    a,
    b,
    color = frameColor,
    thickness = 0.055,
  }) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return (
      <Block
        position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0]}
        rotation={[0, 0, Math.atan2(dy, dx)]}
        size={[Math.hypot(dx, dy), thickness, thickness]}
        color={color}
        metalness={0.35}
        roughness={0.55}
      />
    );
  };
  return (
    <group position={position} rotation-y={rotationY} scale={scale}>
      {[-0.52, 0.52].map((x) => (
        <group key={x} position={[x, 0.31, 0]}>
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.27, 0.045, 4, 8]} />
            <meshStandardMaterial color={tube} roughness={0.88} flatShading />
          </mesh>
          <Block size={[0.08, 0.08, 0.1]} color="#9ca8a9" metalness={0.5} roughness={0.4} />
          {[-1, 1].map((side) => (
            <Block key={side} position={[0, 0, side * 0.02]} size={[0.035, 0.49, 0.025]} color="#66767a" castShadow={false} />
          ))}
        </group>
      ))}
      <Beam a={[-0.52, 0.31]} b={[-0.08, 0.72]} />
      <Beam a={[-0.08, 0.72]} b={[0.52, 0.31]} />
      <Beam a={[0.52, 0.31]} b={[-0.02, 0.31]} />
      <Beam a={[-0.02, 0.31]} b={[-0.52, 0.31]} color="#7d8b8d" thickness={0.035} />
      <Beam a={[-0.08, 0.72]} b={[-0.31, 0.34]} />
      <Beam a={[-0.31, 0.34]} b={[0.52, 0.31]} />
      <Beam a={[-0.08, 0.72]} b={[-0.08, 0.9]} color={tube} />
      <Block position={[-0.2, 0.92, 0]} size={[0.34, 0.055, 0.12]} color="#2d3538" />
      <Beam a={[0.52, 0.31]} b={[0.45, 0.76]} color={tube} />
      <Beam a={[0.45, 0.76]} b={[0.58, 0.84]} color={tube} />
      <Block position={[0.59, 0.84, 0]} size={[0.22, 0.05, 0.12]} color="#899597" />
      <Block position={[-0.52, 0.31, 0.06]} size={[0.06, 0.06, 0.08]} color="#9ca8a9" />
      {chainBroken ? (
        <>
          <Block position={[-0.37, 0.11, 0.09]} rotation={[0, 0, -0.55]} size={[0.26, 0.025, 0.025]} color="#515b5e" metalness={0.5} />
          <Block position={[-0.21, 0.08, 0.09]} rotation={[0, 0, 0.35]} size={[0.16, 0.025, 0.025]} color="#515b5e" metalness={0.5} />
        </>
      ) : (
        <Block position={[-0.28, 0.29, 0.1]} size={[0.36, 0.025, 0.025]} color="#515b5e" metalness={0.5} />
      )}
    </group>
  );
};

/** A door-sized teddy, using the small bedroom bear as its base shape. */
export const GiantTeddyBear: React.FC<{ position: Vec3; scale?: number; color?: string; rotationY?: number }> = ({
  position,
  scale = 4.7,
  color = "#9a6238",
  rotationY = 0,
}) => <TeddyBear position={position} rotationY={rotationY} scale={scale} color={color} />;

/** A plain shop fascia with readable voxel letters. `position` is the bottom centre of the sign. */
export const ShopSign: React.FC<{ position: Vec3; text?: string; width?: number; rotationY?: number }> = ({
  position,
  text = "MAX",
  width = 1.45,
  rotationY = 0,
}) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.29, 0]} size={[width, 0.58, 0.12]} color="#314c46" />
    <Block position={[0, 0.29, 0.07]} size={[width - 0.12, 0.46, 0.025]} color="#e8d09a" castShadow={false} />
    <Figure position={[0, 0.29, 0.09]} text={text} height={0.28} maxWidth={width - 0.24} depth={0.7} color="#26443d" outline castShadow={false} />
  </group>
);

/** A small open-front repair shop. The front faces +Z, toward the camera and work area. */
export const RepairShop: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Block position={[0, 0.02, -0.05]} size={[7.2, 0.04, 5.1]} color="#494d47" />
    <Block position={[0, 1.45, -2.5]} size={[7.2, 2.9, 0.24]} color="#65746d" />
    <Block position={[-3.48, 1.45, -0.2]} size={[0.24, 2.9, 4.4]} color="#4d5d59" />
    <Block position={[3.48, 1.45, -0.2]} size={[0.24, 2.9, 4.4]} color="#4d5d59" />
    <Block position={[-3.48, 1.35, 1.95]} size={[0.24, 2.7, 0.24]} color="#34443f" />
    <Block position={[3.48, 1.35, 1.95]} size={[0.24, 2.7, 0.24]} color="#34443f" />
    <Block position={[0, 2.82, 1.95]} size={[7.2, 0.18, 0.24]} color="#34443f" />
    <ShopSign position={[0, 2.12, 2.1]} width={1.65} />
    {/* the workbench: its top is high enough for a bike wheel and a kid's hands */}
    <Block position={[0.55, 0.53, -0.55]} size={[2.5, 0.16, 0.8]} color="#76553b" />
    {[-0.52, 0.52].map((x) => (
      <Block key={x} position={[0.55 + x, 0.27, -0.55]} size={[0.13, 0.52, 0.66]} color="#59432f" />
    ))}
    <Block position={[-1.8, 1.52, -2.32]} size={[1.25, 1.05, 0.06]} color="#394b48" />
    <Block position={[-1.8, 1.35, -2.25]} size={[0.9, 0.08, 0.08]} color="#a17a42" />
    <Block position={[-1.8, 1.62, -2.25]} size={[0.9, 0.08, 0.08]} color="#a17a42" />
    <Block position={[-1.8, 1.9, -2.25]} size={[0.9, 0.08, 0.08]} color="#a17a42" />
    <Block position={[2.45, 0.76, -1.8]} size={[0.6, 0.46, 0.5]} color="#526b61" />
    <Block position={[2.45, 1.02, -1.8]} size={[0.64, 0.07, 0.54]} color="#354b45" />
    <Block position={[-2.35, 0.09, 1.05]} size={[0.12, 0.18, 0.12]} color="#b8a47b" />
  </group>
);

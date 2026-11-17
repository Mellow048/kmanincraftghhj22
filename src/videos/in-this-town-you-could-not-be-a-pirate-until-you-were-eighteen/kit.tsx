import type React from "react";
import { Block, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import {
  ADULT,
  CHILD,
  KID,
  Lantern,
  Player,
  ROBE,
  StrawHat,
  Villager,
  wordClock,
} from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's cast. Villagers, the player and the lantern come from the pack.
 * The boat, the map, the chain, the buoy and the kraken exist only for this story.
 */

export {
  ADULT,
  CHILD,
  DEG,
  EAST,
  KID,
  NORTH,
  SOUTH,
  WEST,
  ahead,
  beside,
  ease,
  jolt,
  pop,
  ramp,
  Bubble,
  Bits,
  Lantern,
  Player,
  ROBE,
  StrawHat,
  Villager,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const DAY = "overworld-day";
export const SUNSET = "overworld-sunset";
export const NIGHT = "overworld-night";

type A = Partial<MinecraftAvatarProps>;

/** The teller. Yellow, so a phone can find him. A kid even on the day he turns eighteen: that is how this channel draws him. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#f2b705", arms: "#f2b705", legs: "#3b3fa0" }}
    blink
    {...p}
  />
);

export const faceOf = (p: Vec3, s = KID): Vec3 => [p[0], p[1] + 1.55 * s, p[2]];

/** A paper hat, worn on the head so it turns with him. */
export const PaperHat: React.FC = () => (
  <>
    <Block position={[0, 0.28, 0]} size={[0.46, 0.06, 0.46]} color="#f4efe2" />
    <Block position={[0, 0.4, 0]} size={[0.28, 0.2, 0.28]} color="#f4efe2" />
    <Block position={[0, 0.34, 0.16]} size={[0.08, 0.08, 0.04]} color="#c0392b" />
  </>
);

/** The map. A sheet with a red X. `children` of the avatar puts it in his right hand; otherwise place it in the world. */
export const MapSheet: React.FC<{ position?: Vec3; rotation?: Vec3; big?: number }> = ({ position = [0, 0, 0], rotation = [0.4, 0, 0], big = 1 }) => (
  <group position={position} rotation={rotation} scale={big}>
    <Block position={[0, 0, 0]} size={[0.46, 0.02, 0.62]} color="#f3e6c4" />
    <Block position={[0.08, 0.02, 0.08]} size={[0.22, 0.015, 0.04]} color="#c0392b" />
    <Block position={[-0.04, 0.02, -0.06]} size={[0.04, 0.015, 0.22]} color="#c0392b" />
    <Block position={[0.02, 0.025, 0.02]} size={[0.08, 0.02, 0.08]} color="#e74c3c" />
    <Block position={[-0.12, 0.02, 0.16]} size={[0.1, 0.012, 0.012]} color="#3d6ea8" />
  </group>
);

export const RedBall: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.28, 0.28, 0.28]} color="#e23b3b" />
    <Block position={[0.06, 0.08, 0.12]} size={[0.06, 0.06, 0.02]} color="#ffd0d0" />
  </group>
);

export const Key: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Block position={[0, 0, 0]} size={[0.16, 0.04, 0.04]} color="#e0b83a" />
    <Block position={[0.1, 0, 0]} size={[0.06, 0.08, 0.04]} color="#e0b83a" />
  </group>
);

/** A chest. `open` 0–1 lifts the lid. Villagers have no hands: the lid moves, and the ball sits on the folded sleeves. */
export const Chest: React.FC<{ position?: Vec3; open?: number; children?: React.ReactNode }> = ({ position = [0, 0, 0], open = 0, children }) => (
  <group position={position}>
    <Block position={[0, 0.22, 0]} size={[0.7, 0.4, 0.46]} color="#8a5a2a" />
    <Block position={[0, 0.4, 0.22]} size={[0.74, 0.06, 0.06]} color="#e0b83a" />
    <group position={[0, 0.44, -0.2]} rotation={[open * -1.3, 0, 0]}>
      <Block position={[0, 0.06, 0.2]} size={[0.74, 0.1, 0.48]} color="#a56b32" />
    </group>
    {children}
  </group>
);

/** The chain across the dock. `open` 0 is locked, 1 has dropped. */
export const DockChain: React.FC<{ open?: number }> = ({ open = 0 }) => (
  <group position={[0, 0.7 - open * 0.55, 3.2]}>
    {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
      <Block key={i} position={[x, Math.sin(i) * 0.04, 0]} size={[0.28, 0.1, 0.1]} color="#8d96a2" />
    ))}
    <Block position={[-1.15, -0.35, 0]} size={[0.16, 0.8, 0.16]} color="#6b6258" />
    <Block position={[1.15, -0.35, 0]} size={[0.16, 0.8, 0.16]} color="#6b6258" />
  </group>
);

/** A buoy. The line of the town's rule. */
export const Buoy: React.FC<{ position?: Vec3; bob?: number }> = ({ position = [0, 0, 0], bob = 0 }) => (
  <group position={[position[0], position[1] + bob, position[2]]}>
    <Block position={[0, 0.35, 0]} size={[0.46, 0.7, 0.46]} color="#e23b3b" />
    <Block position={[0, 0.78, 0]} size={[0.2, 0.28, 0.2]} color="#f4efe2" />
    <Block position={[0, 0.15, 0]} size={[0.7, 0.12, 0.7]} color="#c0392b" />
  </group>
);

/**
 * The boat. Deck at y = 0.7 when position.y is the water. Hatch opens with `hatch`.
 * Faces +Z. The ladder is at the stern (local -Z).
 */
export const Boat: React.FC<{ position?: Vec3; rotationY?: number; hatch?: number; lantern?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  hatch = 0,
  lantern = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.28, 0.3]} size={[2.4, 0.56, 5.2]} color="#8a5a2a" />
    <Block position={[0, 0.62, 0.3]} size={[2.15, 0.12, 4.8]} color="#c4a574" />
    <Block position={[0, 0.72, 2.55]} size={[2.2, 0.28, 0.16]} color="#6b4423" />
    <Block position={[0, 0.72, -2.05]} size={[2.2, 0.28, 0.16]} color="#6b4423" />
    <Block position={[1.05, 0.78, 0.3]} size={[0.12, 0.22, 4.6]} color="#6b4423" />
    <Block position={[-1.05, 0.78, 0.3]} size={[0.12, 0.22, 4.6]} color="#6b4423" />
    <Block position={[0, 2.3, 0.2]} size={[0.16, 3.2, 0.16]} color="#d8c49a" />
    <Block position={[0.55, 2.6, 0.2]} size={[0.9, 1.5, 0.06]} color="#f4efe2" />
    <group position={[0.35, 0.7, -0.4]} rotation={[hatch * -1.2, 0, 0]}>
      <Block position={[0, 0.04, 0.28]} size={[0.7, 0.08, 0.56]} color="#a56b32" />
    </group>
    <Block position={[0.55, 0.35, -1.7]} size={[0.12, 0.7, 0.4]} color="#6b4423" />
    {lantern > 0 ? <Lantern position={[0.35, 3.7, 0.2]} light={lantern * 2.2} scale={0.7} /> : null}
  </group>
);

/** A door he called a boat. It stands up, then tips and sinks. `sink` 0–1. */
export const DoorBoat: React.FC<{ sink?: number }> = ({ sink = 0 }) => (
  <group position={[-6.2, 0.15 - sink * 0.45, 5.2]}>
    <group position={[0, 0.85, 0]} rotation={[sink * 1.35, 0.15, sink * 0.15]}>
      <Block position={[0, 0, 0]} size={[0.86, 1.7, 0.1]} color="#8a5a2a" />
      <Block position={[0, 0.35, 0.07]} size={[0.62, 0.08, 0.02]} color="#6b4423" />
      <Block position={[0.28, -0.15, 0.08]} size={[0.08, 0.1, 0.04]} color="#e0b83a" />
    </group>
  </group>
);

/**
 * The kraken. `rise` 0–1 brings the head up beside the boat. `arms` 0–1 uncurls the tentacles.
 * Built of blocks so a phone can read an eye and an arm, not a blob on the horizon.
 */
export const Kraken: React.FC<{ position?: Vec3; rise?: number; arms?: number }> = ({ position = [0, 0, 0], rise = 0, arms = 0 }) => {
  const y = -2.4 + rise * 2.6;
  return (
    <group position={[position[0], position[1] + y, position[2]]}>
      <Block position={[0, 0.8, 0]} size={[3.2, 2.2, 2.6]} color="#1e4d3a" />
      <Block position={[0, 1.7, 0]} size={[2.4, 1.1, 2.2]} color="#163d2e" />
      <Block position={[0.55, 1.25, 1.2]} size={[0.78, 0.78, 0.22]} color="#f2e27a" emissive="#f2e27a" emissiveIntensity={0.8} />
      <Block position={[-0.55, 1.15, 1.15]} size={[0.5, 0.5, 0.18]} color="#f2e27a" emissive="#f2e27a" emissiveIntensity={0.55} />
      <Block position={[0.55, 1.25, 1.34]} size={[0.24, 0.24, 0.06]} color="#1a1a1a" />
      {[-1.3, -0.4, 0.5, 1.3].map((x, i) => {
        const k = Math.max(0, Math.min(1, arms * 1.3 - i * 0.12));
        return (
          <group key={i} position={[x, 0.2, 0.4]}>
            {Array.from({ length: 6 }, (_, s) => {
              const u = s / 5;
              const lift = k * (1.6 + i * 0.15) * Math.sin(u * Math.PI);
              return (
                <Block
                  key={s}
                  position={[Math.sin(i + u) * 0.35 * k, lift + u * 0.15, 0.8 + u * (1.4 + k * 1.2)]}
                  size={[0.38 - u * 0.12, 0.32 - u * 0.08, 0.42]}
                  color={s % 2 ? "#1e4d3a" : "#2f6b4f"}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};

/** A dark patch on the water, before the head is up. */
export const SeaShadow: React.FC<{ position?: Vec3; spread?: number }> = ({ position = [0, 0, 0], spread = 1 }) => (
  <Block position={position} size={[3.2 * spread, 0.04, 4.2 * spread]} color="#0c1a22" />
);

export const Fill: React.FC<{ on: Vec3; yaw?: number; power?: number }> = ({ on, yaw = 0, power = 5 }) => {
  const a = (yaw * Math.PI) / 180;
  return <pointLight position={[on[0] + Math.sin(a) * 1.5, on[1] + 0.3, on[2] + Math.cos(a) * 1.5]} intensity={power} distance={7} color="#e7eeff" />;
};

const W = -Math.PI / 2;

/** Mum. A villager. No hands: she holds a sleeve by standing against it. */
export const Mum: React.FC<{ position: Vec3; rotationY?: number; lean?: number }> = ({ position, rotationY = W, lean = 0 }) => (
  <Villager position={position} rotationY={rotationY} robe={ROBE.red} hat="none" lean={lean} phase={0.4} headwear={<Block position={[0, 0.42, 0.02]} size={[0.22, 0.12, 0.22]} color="#e7a0c4" />} />
);

export const Dad: React.FC<{ position: Vec3; rotationY?: number; lean?: number }> = ({ position, rotationY = W, lean = 0 }) => (
  <Villager position={position} rotationY={rotationY} robe={ROBE.farmer} hat="straw" lean={lean} phase={1.2} />
);

export const HatKid: React.FC<{ position: Vec3; rotationY?: number; walk?: number; lean?: number; y?: number }> = ({ position, rotationY = 0, walk = 0, lean = 0, y = 0 }) => (
  <Villager position={[position[0], position[1] + y, position[2]]} rotationY={rotationY} scale={CHILD} kid robe={ROBE.friend} hat="straw" walk={walk} lean={lean} phase={0.8} />
);

export const BowKid: React.FC<{ position: Vec3; rotationY?: number; walk?: number }> = ({ position, rotationY = 0, walk = 0 }) => (
  <Villager
    position={position}
    rotationY={rotationY}
    scale={CHILD}
    kid
    robe={ROBE.white}
    hat="none"
    walk={walk}
    phase={2.1}
    headwear={<Block position={[0, 0.46, 0.04]} size={[0.28, 0.12, 0.16]} color="#e7a0c4" />}
  />
);

export const RopePlayer: React.FC<A> = (p) => <Player who={3} {...p} />;

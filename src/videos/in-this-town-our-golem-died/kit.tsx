import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { CHILD, KID, Poppy, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * Everything another "In This Town" film could use is in the topic's pack, Topics/InThisTown
 * (catalogue with pictures: Topics/InThisTown/PACK.md). It is passed on from here, so a scene
 * imports only from "./kit". Build something new here ONLY if the pack does not have it; if a
 * second film could use it, put it in the pack instead.
 */

export {
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, hill, jolt, pop, ramp,
  // the people of the town, the iron golem and its flower
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  // people who are not from the town: twelve different players
  Player, Pumpkin,
  // things
  BedBox, Bits, Blaze, Bubble, FireLight, Hole, Smoke, SmokeBank, SubscribeSign, Wisps,
  // the monsters that come over the wall
  Creeper, Skeleton, Zombie,
  // the pack's night
  Lantern, Moon, Stars, Wheat, ForestEdge, Pine, Moonlight,
  // the pack's places, and the one prop the tour needs
  Bell, Bucket, Fence, Hut, LampPost, LanternLine, LanternPost, Room, Scarecrow, Stall, Well, WellLid,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.take", "flower")`. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * Where things are. The street runs west–east (x); house fronts on the north side face south, at the
 * camera. The gate is at the east end, the well in the middle of the square, the teller's room in its
 * own zone a long way off.
 */
export const PLACE = {
  /** The middle of the square. The bell is north of it, the well south of it. */
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  /** The well: the middle of the stone ring. Its rim is 0.8 m high, so flowers sit at 0.82. */
  well: [-4.6, 0, 4.2] as Vec3,
  /** The middle of the well's rim, where the flowers stand. */
  rim: -4.6 as number,
  stall: [6.4, 0, -2.6] as Vec3,
  /** The oldest woman's porch: half a block high, so she stands over a kid. */
  porch: [-11, 0.5, -4.1] as Vec3,
  porchFoot: [-11, 0, -2.4] as Vec3,
  /** The teller's house. Middle of its front wall, on the ground. */
  home: [10, 0, -5] as Vec3,
  /** The blacksmith's hut, with the wall of hooks inside it. */
  forge: [-16, 0, -4.6] as Vec3,
  /** The hook wall, seen from the street: a plank wall with five hooks and nothing on them. */
  hooks: [-16.0, 0, -3.4] as Vec3,
  /** The anvil, out in front of the forge. */
  anvil: [-13.4, 0, -3.5] as Vec3,
  /** The gate: the middle of the opening in the wall. */
  gate: [20, 0, 2] as Vec3,
  /** Where the golem dies, just outside the gate. */
  fell: [21.6, 0, 2.2] as Vec3,
  /** The teller's standing place at the gate, inside it. */
  me: [19.4, 0, 2.0] as Vec3,
  /** The teller's room. Its own zone, far from everything. */
  room: [0, 0, 80] as Vec3,
};
/** The teller's room: a point given in room coordinates. */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

// ----------------------------------------------------------------------------- the teller

type A = Partial<MinecraftAvatarProps>;

/**
 * The teller: a kid, first person, in most of the shots. ONE loud colour nobody else in the film
 * wears: rust orange, against a town of greens, browns and grey stone.
 */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#d94f2b", arms: "skin", legs: "#2f3550" }}
    blink
    {...p}
  />
);

/** The people of the town. The elder is the one who will not explain the rule. */
export const Elder: React.FC<Partial<React.ComponentProps<typeof Villager>>> = (p) => (
  <Villager robe={ROBE.white} hat="straw" phase={0.4} {...p} />
);
export const Mother: React.FC<Partial<React.ComponentProps<typeof Villager>>> = (p) => (
  <Villager robe={ROBE.red} phase={1.1} {...p} />
);
export const Father: React.FC<Partial<React.ComponentProps<typeof Villager>>> = (p) => (
  <Villager robe={ROBE.brown} phase={2.2} {...p} />
);
export const Child: React.FC<Partial<React.ComponentProps<typeof Villager>>> = (p) => (
  <Villager robe={ROBE.friend} scale={CHILD} kid phase={2.9} {...p} />
);

// ----------------------------------------------------------------------------- the flowers

/** One poppy on the well's rim, or on the ground. `position` is the bottom of the stem. */
export const Flower: React.FC<{ position: Vec3; scale?: number; turn?: number }> = ({ position, scale = 1, turn = 0 }) => (
  <Poppy position={position} rotation={[0, turn, 0]} scale={scale} />
);

/**
 * THE RIM. The well is always full of flowers: they stand all the way round it, on the stones.
 * `open` leaves a gap where a new one goes (the rose, at 10.rose / 11.put).
 */
export const Rim: React.FC<{ count?: number; scale?: number; gap?: [number, number]; seed?: number }> = ({
  count = 14,
  scale = 1,
  gap = [-1, -1],
  seed = 3,
}) => {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + 0.2;
    // a deterministic wobble, the way children put flowers down
    const r = 1.09 + Math.sin(i * 2.7 + seed) * 0.06;
    if (i >= gap[0] && i <= gap[1]) continue;
    out.push(
      <Flower
        key={i}
        position={[PLACE.well[0] + Math.cos(a) * r, 0.82, PLACE.well[2] + Math.sin(a) * r]}
        scale={scale * (0.85 + 0.3 * Math.abs(Math.cos(i * 1.7)))}
        turn={a + 0.4}
      />,
    );
  }
  return <>{out}</>;
};

/** The rose itself: bigger than the others, because it is the one he carried. */
export const Rose: React.FC<{ position: Vec3; scale?: number; turn?: number }> = ({ position, scale = 1.45, turn = 0.6 }) => (
  <Poppy position={position} rotation={[0, turn, 0]} scale={scale} />
);

// ----------------------------------------------------------------------------- iron

/** An anvil. `position` is the bottom of its foot. A blacksmith's, worn smooth in the middle. */
export const Anvil: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <mesh position={[0, 0.13, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.44, 0.26, 0.34]} />
      <meshStandardMaterial color="#3d4249" roughness={0.85} metalness={0.35} />
    </mesh>
    <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.26, 0.2, 0.26]} />
      <meshStandardMaterial color="#4a5057" roughness={0.8} metalness={0.4} />
    </mesh>
    <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.86, 0.14, 0.32]} />
      <meshStandardMaterial color="#5b626a" roughness={0.55} metalness={0.55} />
    </mesh>
    <mesh position={[-0.52, 0.52, 0]} castShadow>
      <boxGeometry args={[0.2, 0.08, 0.16]} />
      <meshStandardMaterial color="#5b626a" roughness={0.55} metalness={0.55} />
    </mesh>
  </group>
);

/** An iron pot, the kind every kitchen in this town has. `position` is the bottom of it. */
export const Pot: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.15, 0]} castShadow>
      <boxGeometry args={[0.36, 0.3, 0.36]} />
      <meshStandardMaterial color="#2f343a" roughness={0.7} metalness={0.3} />
    </mesh>
    <mesh position={[0, 0.31, 0]} castShadow>
      <boxGeometry args={[0.42, 0.04, 0.42]} />
      <meshStandardMaterial color="#3a4046" roughness={0.7} metalness={0.3} />
    </mesh>
    {[-1, 1].map((s) => (
      <mesh key={s} position={[s * 0.22, 0.22, 0]}>
        <boxGeometry args={[0.06, 0.05, 0.2]} />
        <meshStandardMaterial color="#2f343a" roughness={0.7} metalness={0.3} />
      </mesh>
    ))}
  </group>
);

/**
 * THE HOOK WALL: five iron hooks on planks, at the back of the forge. `filled` hangs the tools on
 * them; empty, the wall is the whole answer to "what did they use".
 */
export const HookWall: React.FC<{ position: Vec3; rotationY?: number; filled?: boolean }> = ({
  position,
  rotationY = 0,
  filled = true,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <mesh position={[0, 1.15, 0]} receiveShadow>
      <boxGeometry args={[2.3, 2.3, 0.14]} />
      <meshStandardMaterial color="#5a3f27" roughness={0.95} />
    </mesh>
    {[-0.86, -0.43, 0, 0.43, 0.86].map((x, i) => (
      <group key={x} position={[x, 1.62, 0.1]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[0.05, 0.16, 0.05]} />
          <meshStandardMaterial color="#3a4046" roughness={0.6} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.02, 0.03]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.13, 0.04, 0.04]} />
          <meshStandardMaterial color="#3a4046" roughness={0.6} metalness={0.5} />
        </mesh>
        {filled ? (
          <mesh position={[0, -0.34, 0.03]} castShadow>
            <boxGeometry args={[0.06, 0.5, 0.06]} />
            <meshStandardMaterial color={i % 2 ? "#8a6a3a" : "#6f757c"} roughness={0.8} metalness={i % 2 ? 0 : 0.3} />
          </mesh>
        ) : null}
      </group>
    ))}
  </group>
);

/** Everything iron in the town, heaped in the square where the well is: what the village gave. */
export const IronHeap: React.FC<{ position: Vec3; t?: number }> = ({ position }) => (
  <group position={position}>
    <Anvil position={[0, 0, 0]} rotationY={0.4} />
    <Pot position={[0.62, 0, 0.28]} scale={1.1} />
    <Pot position={[-0.55, 0, 0.44]} scale={0.85} />
    <mesh position={[0.2, 0.1, -0.5]} rotation={[0.1, 0.5, 0]} castShadow>
      <boxGeometry args={[0.4, 0.22, 0.4]} />
      <meshStandardMaterial color="#3d4249" roughness={0.8} metalness={0.35} />
    </mesh>
    <mesh position={[-0.34, 0.06, -0.44]} rotation={[0, 0.9, 0]} castShadow>
      <boxGeometry args={[0.9, 0.09, 0.14]} />
      <meshStandardMaterial color="#4a5057" roughness={0.7} metalness={0.45} />
    </mesh>
  </group>
);

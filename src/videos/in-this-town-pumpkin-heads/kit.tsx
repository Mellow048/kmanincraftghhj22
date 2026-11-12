import type React from "react";
import { Block, Glow, MinecraftAvatar } from "../../engine";
export { stride } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, PLAYERS, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * Everything another "In This Town" film could use is in the topic's pack, Topics/InThisTown
 * (catalogue with pictures: Topics/InThisTown/PACK.md). It is passed on from here, so a scene
 * imports only from "./kit".
 *
 * What belongs to this story alone, and is built here:
 *   - CARVED    a pumpkin worn on a head, with a carved face that can change on the cut. In this town it IS the face.
 *   - TOWNIE    one of the pack's twelve players, under a pumpkin.
 *   - HERO      the teller: a kid in red. His real face is seen once, when the pumpkin comes off.
 *   - TALL      what the rule was hiding. Never named.
 */

export {
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
  // the iron golem
  IronGolem,
  // things
  BedBox, Bits, SubscribeSign,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.knock", "knocking")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * Where things are. The street runs west–east (x); house fronts on the north side face south, at the camera.
 * world.tsx builds the town from these, and scenes stand people on them: change a number here, never in two places.
 */
export const PLACE = {
  /** The middle of the square. The bell is north of it, the well south-west. */
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  stall: [6.4, 0, -2.6] as Vec3,
  /** The well. Its water is at y = 0.53. It is where he looks for his face, twice. */
  well: [-5, 0, 5.5] as Vec3,
  /** The oldest woman's porch. It is half a block high, so she stands over a kid and the two stack in a tall frame. */
  porch: [-10, 0.5, -4.1] as Vec3,
  /** Where a kid stands to talk to her. */
  porchFoot: [-10, 0, -2.5] as Vec3,
  /** The teller's house. Middle of its front wall. Its window is 1.5 m east of that. */
  home: [10, 0, -5] as Vec3,
  /** His best friend's house. Its window is low, at a kid's height, 1.6 m west of the middle. */
  friend: [20, 0, -5] as Vec3,
  /** The teller's room. Its own zone, far from everything. */
  room: [0, 0, 80] as Vec3,
};
/** The teller's room: a point given in room coordinates. */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];
/** The middle of the well's water. */
export const WATER: Vec3 = [PLACE.well[0], 0.53, PLACE.well[2]];
/** Where he kneels at the well: the south rim, facing north. */
export const KNEEL: Vec3 = [PLACE.well[0], 0, PLACE.well[2] + 1.62];
/** The middle of his friend's window, on the wall. */
export const FRIEND_WINDOW: Vec3 = [PLACE.friend[0] - 1.6, 1.22, PLACE.friend[2]];
/** The middle of his own window, on the wall. */
export const HOME_WINDOW: Vec3 = [PLACE.home[0] + 1.5, 2.15, PLACE.home[2]];

/** His bed, and where he lies in it. */
export const BED = room(-1.0, 0, -1.2);
export const IN_BED = room(-1.0, 0.2, -1.28);
/** Where the closest one stands: behind him, when he kneels at the well. */
export const CLOSE: Vec3 = [PLACE.well[0] + 0.1, 0, PLACE.well[2] + 3.8];
/** Where he puts his pumpkin down, beside the well. */
export const PUT: Vec3 = [PLACE.well[0] + 0.8, 0.3, PLACE.well[2] + 2.0];

// ----------------------------------------------------------------------------- the pumpkin

/** What is cut into a pumpkin. It changes on the cut, the way a face does. */
export type Carve = "grin" | "glad" | "flat" | "frown" | "wow" | "fear" | "sleep";

const HOLE = "#2a1405";
type Rect = [x: number, y: number, w: number, h: number, tilt?: number];
const CARVES: Record<Carve, { eyes: [w: number, h: number, tilt: number]; mouth: Rect[]; teeth?: number[] }> = {
  grin: { eyes: [0.13, 0.11, 0], mouth: [[0, -0.12, 0.36, 0.08]], teeth: [-0.11, 0.02, 0.13] },
  glad: { eyes: [0.13, 0.1, 0.18], mouth: [[0, -0.14, 0.26, 0.07], [-0.16, -0.1, 0.07, 0.07], [0.16, -0.1, 0.07, 0.07]] },
  flat: { eyes: [0.13, 0.07, 0], mouth: [[0, -0.13, 0.26, 0.045]] },
  frown: { eyes: [0.13, 0.09, -0.3], mouth: [[0, -0.11, 0.22, 0.05], [-0.14, -0.15, 0.07, 0.06], [0.14, -0.15, 0.07, 0.06]] },
  wow: { eyes: [0.14, 0.15, 0], mouth: [[0, -0.14, 0.13, 0.14]] },
  fear: { eyes: [0.15, 0.17, -0.12], mouth: [[0, -0.15, 0.3, 0.11]], teeth: [-0.09, 0.09] },
  sleep: { eyes: [0.14, 0.03, 0], mouth: [[0, -0.13, 0.1, 0.04]] },
};

/**
 * A carved pumpkin, worn. Its origin is the middle of the head it is on, and +Z is the face: give it to an
 * avatar as `head={<Carved />}` and it nods, turns and lies down with the head. It hides the head completely.
 * `old` is a pumpkin that has been worn for seventy years. `rope` ties it on under the chin.
 */
export const Carved: React.FC<{ carve?: Carve; old?: boolean; rope?: boolean; raise?: number }> = ({ carve = "grin", old = false, rope = false, raise = 0 }) => {
  const c = CARVES[carve];
  const skin = old ? "#b06a2a" : "#e07f1c";
  const rib = old ? "#8a4f1c" : "#b85f10";
  const Z = 0.303;
  return (
    <group position={[0, 0.03 + raise, 0]}>
      <Block size={[0.6, 0.58, 0.6]} color={skin} />
      {[-0.2, 0, 0.2].map((x) => (
        <Block key={x} position={[x, 0, Z]} size={[0.03, 0.58, 0.01]} color={rib} castShadow={false} />
      ))}
      {[-0.2, 0, 0.2].map((z) => (
        <group key={z}>
          <Block position={[0.303, 0, z]} size={[0.01, 0.58, 0.03]} color={rib} castShadow={false} />
          <Block position={[-0.303, 0, z]} size={[0.01, 0.58, 0.03]} color={rib} castShadow={false} />
          <Block position={[z, 0, -Z]} size={[0.03, 0.58, 0.01]} color={rib} castShadow={false} />
        </group>
      ))}
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * 0.135, 0.09, Z + 0.004]} rotation={[0, 0, s * c.eyes[2]]} size={[c.eyes[0], c.eyes[1], 0.012]} color={HOLE} castShadow={false} />
      ))}
      {c.mouth.map(([x, y, w, h], i) => (
        <Block key={i} position={[x, y, Z + 0.004]} size={[w, h, 0.012]} color={HOLE} castShadow={false} />
      ))}
      {(c.teeth ?? []).map((x) => (
        <Block key={x} position={[x, c.mouth[0][1] + c.mouth[0][3] / 2 - 0.022, Z + 0.007]} size={[0.06, 0.045, 0.012]} color={skin} castShadow={false} />
      ))}
      <Block position={[0, 0.33, 0]} size={[0.1, 0.1, 0.1]} color={old ? "#6a5a2a" : "#5a7a2a"} />
      {old ? <Block position={[0.17, 0.2, Z + 0.004]} size={[0.16, 0.025, 0.012]} rotation={[0, 0, 0.5]} color={rib} castShadow={false} /> : null}
      {rope ? (
        <>
          <Block position={[0, -0.02, 0]} size={[0.64, 0.05, 0.64]} color="#c9b27a" castShadow={false} />
          <Block position={[0, 0, 0]} size={[0.05, 0.62, 0.64]} color="#c9b27a" castShadow={false} />
          <Block position={[0.06, -0.33, 0.22]} size={[0.1, 0.1, 0.08]} color="#a8925e" castShadow={false} />
        </>
      ) : null}
    </group>
  );
};

/** A pumpkin that is not on a head: in two hands, on a porch, on the ground. `position` is its middle. */
export const Loose: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number; carve?: Carve; old?: boolean }> = ({ position, rotation = [0, 0, 0], scale = 1, carve, old }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <group position={[0, -0.03, 0]}>
      <Carved carve={carve} old={old} />
    </group>
  </group>
);

// ----------------------------------------------------------------------------- the people

type A = Partial<MinecraftAvatarProps>;

/**
 * Someone from the town: one of the pack's twelve players, under a pumpkin. Nobody has ever seen the face
 * underneath, so we never show it. `who` picks the clothes; tell them apart by those, and by their shoes.
 */
export const Townie: React.FC<A & { who: number; carve?: Carve; old?: boolean; rope?: boolean }> = ({ who, carve, old, rope, ...p }) => {
  const c = PLAYERS[who % PLAYERS.length];
  return (
    <MinecraftAvatar
      outfit="tee"
      skin={c.skin}
      hair={c.hair}
      colors={{ torso: c.torso, arms: c.arms, legs: c.legs }}
      phase={who * 2.3 + 0.4}
      head={<Carved carve={carve} old={old} rope={rope} />}
      {...p}
    />
  );
};

/**
 * The teller: a kid in red, which nobody else in the film wears. Until he takes it off his face is a pumpkin:
 * change `carve` on the cut. `raise` lifts it off his head, in metres. `bare` is the one time we see what is under it.
 * Faces for a kid, once bare: smile grin laugh frown uneasy brave fear wow ouch calm.
 */
export const Hero: React.FC<A & { carve?: Carve; rope?: boolean; bare?: boolean; raise?: number }> = ({ carve = "grin", rope, bare = false, raise = 0, ...p }) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#d8262e", arms: "#d8262e", legs: "#e9e6dc" }}
    blink
    head={bare ? undefined : <Carved carve={carve} rope={rope} raise={raise} />}
    {...p}
  />
);

/** Shoes: the only way to tell two people apart. `position` is the feet of whoever wears them, `rotationY` their facing. */
export const Shoes: React.FC<{ position: Vec3; rotationY?: number; color: string; scale?: number }> = ({ position, rotationY = 0, color, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.115, 0.07, 0.04]} size={[0.25, 0.14, 0.36]} color={color} />
        <Block position={[s * 0.115, 0.03, 0.05]} size={[0.27, 0.05, 0.4]} color="#f4f1ea" castShadow={false} />
      </group>
    ))}
  </group>
);

// ----------------------------------------------------------------------------- what the rule was hiding

const DARK = "#0b0912";

/**
 * One of them. Three metres tall, thin, darker than the night, and it does not move. `position` is its feet;
 * it faces +Z at `rotationY` 0. `headYaw` turns the head alone. `eyes` 0–1 opens them.
 * It is never named, in the script or here.
 */
export const Tall: React.FC<{ position: Vec3; rotationY?: number; headYaw?: number; headPitch?: number; eyes?: number; scale?: number; lean?: number }> = ({
  position,
  rotationY = 0,
  headYaw = 0,
  headPitch = 0,
  eyes = 0,
  scale = 1,
  lean = 0,
}) => {
  const body = { color: DARK, emissive: "#4a3a8a", emissiveIntensity: 0.3 };
  return (
    <group position={position} rotation={[lean, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block position={[s * 0.11, 0.78, 0]} size={[0.13, 1.56, 0.13]} {...body} />
          <Block position={[s * 0.27, 1.62, 0.02]} size={[0.11, 1.62, 0.11]} {...body} />
        </group>
      ))}
      <Block position={[0, 2.0, 0]} size={[0.42, 0.9, 0.2]} {...body} />
      <group position={[0, 2.47, 0]} rotation={[headPitch, headYaw, 0]}>
        <Block position={[0, 0.22, 0]} size={[0.44, 0.44, 0.44]} {...body} />
        {eyes > 0
          ? [-1, 1].map((s) => (
              <group key={s}>
                <Block position={[s * 0.12, 0.24, 0.223]} size={[0.13, 0.05 * eyes, 0.01]} color="#f1e6ff" emissive="#d9c2ff" emissiveIntensity={2.6 * eyes} castShadow={false} />
                <Glow position={[s * 0.12, 0.24, 0.26]} size={0.3} color="#c9a8ff" opacity={0.5 * eyes} />
              </group>
            ))
          : null}
      </group>
    </group>
  );
};

/**
 * Where they stand: beside every house, each one facing a window. [feet, the way it faces].
 * The film shows what the teller can see, so none of them is drawn until he has looked.
 */
export const STAND: Array<[Vec3, number]> = [
  [[-23, 0, -4.1], Math.PI],
  [[-19, 0, -4.1], Math.PI],
  [[-12, 0, -4.1], Math.PI],
  [[-8, 0, -4.1], Math.PI],
  [[2.9, 0, -6.1], Math.PI],
  [[12.6, 0, -4.2], Math.atan2(-1.1, -0.8)],
  [[17.2, 0, -4.3], Math.PI / 2],
  [[-11.2, 0, 10.1], 0],
  [[0, 0, 11.6], 0],
  [[16.6, 0, 10.1], 0],
];

/** All of them. `turned(i)` 0–1 turns the head of number i to `toward` and opens its eyes. */
export const Watchers: React.FC<{ toward?: Vec3; turned?: (i: number) => number }> = ({ toward, turned }) => (
  <>
    {STAND.map(([p, r], i) => {
      const k = turned && toward ? turned(i) : 0;
      let yaw = toward ? Math.atan2(toward[0] - p[0], toward[2] - p[2]) - r : 0;
      while (yaw > Math.PI) yaw -= 2 * Math.PI;
      while (yaw < -Math.PI) yaw += 2 * Math.PI;
      return <Tall key={i} position={p} rotationY={r} headYaw={yaw * k} headPitch={0.22 * (1 - k)} eyes={k > 0.6 ? (k - 0.6) / 0.4 : 0} />;
    })}
  </>
);

/** A very long spoon, from the bowl to the mouth hole. */
export const Spoon: React.FC<{ from: Vec3; to: Vec3 }> = ({ from, to }) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const flat = Math.hypot(dx, dz);
  const len = Math.hypot(flat, dy);
  return (
    <group position={from} rotation={[0, Math.atan2(dx, dz), 0]}>
      <group rotation={[-Math.atan2(dy, flat), 0, 0]}>
        <Block position={[0, 0, len / 2]} size={[0.035, 0.035, len]} color="#b98a52" castShadow={false} />
        <Block position={[0, 0, len]} size={[0.1, 0.04, 0.12]} color="#c99a62" castShadow={false} />
      </group>
    </group>
  );
};

/** A bowl of soup. `position` is the middle of its base. */
export const Bowl: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 0.06, 0]} size={[0.34, 0.12, 0.34]} color="#7a5536" />
    <Block position={[0, 0.125, 0]} size={[0.26, 0.01, 0.26]} color="#e0752a" castShadow={false} />
  </group>
);

// ----------------------------------------------------------------------------- the well's water

/**
 * What the water shows: flat pictures lying on it, face up, their tops to the north. The well is roofed, so
 * the camera is always under the roof looking down. `position` is the middle of the picture, on the water.
 */
const Lying: React.FC<{ position: Vec3; scale?: number; dim?: number; children: React.ReactNode }> = ({ position, scale = 1, children }) => (
  <group position={[position[0], position[1] + 0.012, position[2]]} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
    {children}
  </group>
);

/** A pumpkin looking back out of the water. */
export const WaterPumpkin: React.FC<{ position: Vec3; carve?: Carve; scale?: number }> = ({ position, carve = "flat", scale = 1 }) => (
  <Lying position={position} scale={scale}>
    <group position={[0, 0, -0.3]}>
      <Carved carve={carve} />
    </group>
  </Lying>
);

/** His own face in the water: the first time anyone in this town has seen one. `smile` 0–1. */
export const WaterFace: React.FC<{ position: Vec3; scale?: number; smile?: number }> = ({ position, scale = 1, smile = 1 }) => (
  <Lying position={position} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.46, 0.46, 0.01]} color="#c99a7a" castShadow={false} />
    <Block position={[0, 0.17, 0.004]} size={[0.46, 0.12, 0.01]} color="#33251c" castShadow={false} />
    <Block position={[-0.2, 0.08, 0.004]} size={[0.06, 0.1, 0.01]} color="#33251c" castShadow={false} />
    <Block position={[0.2, 0.08, 0.004]} size={[0.06, 0.1, 0.01]} color="#33251c" castShadow={false} />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.115, 0.03, 0.006]} size={[0.11, 0.06, 0.01]} color="#f4f1ea" castShadow={false} />
        <Block position={[s * 0.095, 0.03, 0.008]} size={[0.055, 0.06, 0.01]} color="#2b2233" castShadow={false} />
      </group>
    ))}
    <Block position={[0, -0.05, 0.006]} size={[0.06, 0.06, 0.01]} color="#b5846a" castShadow={false} />
    <Block position={[0, -0.14, 0.006]} size={[0.2 + 0.04 * smile, 0.05, 0.01]} color="#7a3a34" castShadow={false} />
    {smile > 0.5
      ? [-1, 1].map((s) => <Block key={s} position={[s * 0.13, -0.105, 0.006]} size={[0.055, 0.055, 0.01]} color="#7a3a34" castShadow={false} />)
      : null}
    <Block position={[0, -0.31, 0]} size={[0.5, 0.16, 0.01]} color="#b81f27" castShadow={false} />
  </Lying>
);

/** What stood behind his reflection: a head too high up, and two pale eyes. `eyes` 0–1. */
export const WaterTall: React.FC<{ position: Vec3; scale?: number; eyes?: number }> = ({ position, scale = 1, eyes = 1 }) => (
  <Lying position={position} scale={scale}>
    <Block position={[0, 0, -0.004]} size={[0.5, 0.5, 0.01]} color="#07060c" castShadow={false} />
    <Block position={[0, -0.45, -0.004]} size={[0.3, 0.5, 0.01]} color="#07060c" castShadow={false} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.13, 0.03, 0.004]} size={[0.15, 0.055 * eyes, 0.01]} color="#f1e6ff" emissive="#d9c2ff" emissiveIntensity={2.4 * eyes} castShadow={false} />
    ))}
  </Lying>
);

/** Moonlight on the well: a pale pool on the water and a soft light over it. `amount` 0–1 is the moon coming out. */
export const MoonOnWater: React.FC<{ amount?: number }> = ({ amount = 1 }) => (
  <>
    <Block position={[WATER[0], WATER[1] + 0.006, WATER[2]]} size={[1.4, 0.004, 1.4]} color="#9fc0ff" emissive="#bcd4ff" emissiveIntensity={0.9 * amount} transparent opacity={0.28 * amount} castShadow={false} />
    <pointLight position={[WATER[0], 1.5, WATER[2] + 0.3]} color="#b9d0ff" intensity={5 * amount} distance={5} decay={2} />
  </>
);

/** A soft cold light on the camera's side of a night shot. Without it a pumpkin turned to the lens at night is a black box. */
export const Fill: React.FC<{ at: Vec3; power?: number; color?: string }> = ({ at, power = 6, color = "#a8bcff" }) => (
  <pointLight position={at} color={color} intensity={power} distance={9} decay={2} />
);

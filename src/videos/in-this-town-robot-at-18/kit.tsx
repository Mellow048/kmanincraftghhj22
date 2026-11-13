import type React from "react";
import { Block, Glow, MinecraftAvatar, PixelText } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { wordClock } from "../../../Topics/InThisTown";
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
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, ease, hill, jolt, pop, ramp,
  // the people of the town, the iron golem and its flower
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  // people who are not from the town: twelve different players
  Player, Pumpkin,
  // things
  BedBox, Bits, Blaze, Bubble, FireLight, Hole, Smoke, SmokeBank, SubscribeSign, Wisps,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.bell", "bell")`. Hang every action on a word. */
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
  well: [-5, 0, 5.5] as Vec3,
  /** The oldest villager's porch. It is half a block high, so she stands over a kid and the two stack in a tall frame. */
  porch: [-10, 0.5, -4.1] as Vec3,
  /** Where a kid stands to talk to her. */
  porchFoot: [-10, 0, -2.5] as Vec3,
  /** The teller's house. Middle of its front wall. */
  home: [10, 0, -5] as Vec3,
  /** The teller's room. Its own zone, far from everything. */
  room: [0, 0, 80] as Vec3,
};
/** The teller's room: a point given in room coordinates. */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

// ----------------------------------------------------------------------------- more places

/** Mum and dad's sitting room. Its own zone. Sofa on the north wall; the camera lives to the south. */
export const LIVING: Vec3 = [40, 0, 80];
export const l = (x: number, y: number, z: number): Vec3 => [LIVING[0] + x, LIVING[1] + y, LIVING[2] + z];
/** The classroom. Zones `class` (floor, desks, side walls), `classN` (board wall), `classS` (window wall). Pupils face north. */
export const CLASS: Vec3 = [0, 0, 140];
export const c = (x: number, y: number, z: number): Vec3 => [CLASS[0] + x, CLASS[1] + y, CLASS[2] + z];
/** Desk columns and rows, in classroom coordinates. The teller sits at column 1, row 0 (the front). */
export const COLS = [-1.8, -0.6, 0.6, 1.8];
export const ROWS = [-1.2, 0.6, 2.4];
export const seat = (col: number, row: number): Vec3 => c(COLS[col], 0, ROWS[row]);
/** The clearing in the forest. Its own zone. Pines all round; open to the south, where the camera lives. */
export const FOREST: Vec3 = [0, 0, -200];
export const f = (x: number, y: number, z: number): Vec3 => [FOREST[0] + x, FOREST[1] + y, FOREST[2] + z];
/** The front door of the teller's house, and the step in front of it where a crate lands. */
export const STEP: Vec3 = [PLACE.home[0] - 1.3, 0, PLACE.home[2] + 1.3];
/** The top of the chest in his room, where the head sits. */
export const DESK: Vec3 = room(2.15, 0.7, -1.7);
/** The lunch bench in the square, and where the trouble is. */
export const BENCH: Vec3 = [-1.6, 0, 3.4];
export const TROUBLE: Vec3 = [1.0, 0, 2.6];

export const ZONE = { town: "village", room: "room", living: "living", classN: "class+classS", classS: "class+classN", forest: "forest" };
export const DAY = "overworld-day";
export const NIGHT = "overworld-night";
export const DUSK = "overworld-storm";

export const lerp = (a: number, b: number, k: number): number => a + (b - a) * k;
export const lerp3 = (a: Vec3, b: Vec3, k: number): Vec3 => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
/** A hop: up and down once, starting at `at`. */
export const hop = (t: number, at: number, height: number, dur = 0.4): number => {
  const k = (t - at) / dur;
  return k <= 0 || k >= 1 ? 0 : height * 4 * k * (1 - k);
};
/** A light on the camera's side of a face. `yaw` is the camera's. */
export const Fill: React.FC<{ on: Vec3; yaw: number; power?: number; d?: number; color?: string }> = ({ on, yaw, power = 6, d = 1.8, color = "#eef2ff" }) => (
  <pointLight position={[on[0] + d * Math.sin((yaw * Math.PI) / 180), on[1] + 0.35, on[2] + d * Math.cos((yaw * Math.PI) / 180)]} color={color} intensity={power} distance={7} decay={2} />
);

// ----------------------------------------------------------------------------- metal

const STEEL = "#b9c4d2";
const STEEL_DARK = "#7f8a9a";
const CYAN = "#4fe3ff";
const OLD_STEEL = "#34343e";
const RED = "#ff3b2e";

/**
 * The head. On its own it is "a useless robot head"; worn (through an avatar's `head`) it is the helmet.
 * Origin: the middle of the head. +Z is the face. `open` lifts the visor off a face; `eyes` lights them (0..1);
 * `neck` shows the stump of a neck; `button` shows the button on the back.
 */
export const RoboHead: React.FC<{ open?: number; eyes?: number; neck?: boolean; button?: number; metal?: string; glow?: string; size?: number }> = ({
  open = 0, eyes = 0, neck = false, button = 0, metal = STEEL, glow = CYAN, size = 0.52,
}) => {
  const s = size;
  const t = 0.05;
  return (
    <group>
      <Block position={[0, s / 2, 0]} size={[s + t, t, s + t]} color={metal} metalness={0.5} roughness={0.35} />
      <Block position={[0, 0, -s / 2]} size={[s + t, s, t]} color={metal} metalness={0.5} roughness={0.35} />
      <Block position={[-s / 2, 0, 0]} size={[t, s, s]} color={metal} metalness={0.5} roughness={0.35} />
      <Block position={[s / 2, 0, 0]} size={[t, s, s]} color={metal} metalness={0.5} roughness={0.35} />
      <Block position={[0, -s / 2 + 0.03, -0.04]} size={[s, 0.06, s - 0.1]} color={STEEL_DARK} castShadow={false} />
      {/* ears */}
      <Block position={[-s / 2 - 0.04, 0.02, 0]} size={[0.06, 0.16, 0.16]} color={STEEL_DARK} />
      <Block position={[s / 2 + 0.04, 0.02, 0]} size={[0.06, 0.16, 0.16]} color={STEEL_DARK} />
      {/* a fin on top */}
      <Block position={[0, s / 2 + 0.07, -0.04]} size={[0.06, 0.12, 0.3]} color={glow === CYAN ? "#e2463a" : RED} />
      {/* the visor: slides up over the forehead as it opens */}
      <group position={[0, open * s * 0.72, s / 2 - open * 0.08]}>
        <Block size={[s + t, s * (1 - 0.35 * open), t]} color={metal} metalness={0.5} roughness={0.35} castShadow={false} />
        <Block position={[0, 0.03, 0.02]} size={[s * 0.8, s * 0.3, 0.03]} color="#10141c" castShadow={false} />
        {[-1, 1].map((x) => (
          <Block key={x} position={[x * s * 0.2, 0.03, 0.035]} size={[s * 0.22, s * 0.1, 0.02]} color={eyes > 0.05 ? "#000000" : "#2a3340"} emissive={glow} emissiveIntensity={eyes} castShadow={false} />
        ))}
        <Block position={[0, -s * 0.28, 0.02]} size={[s * 0.36, 0.04, 0.03]} color={STEEL_DARK} castShadow={false} />
      </group>
      {neck ? (
        <>
          <Block position={[0, -s / 2 - 0.05, 0]} size={[0.2, 0.1, 0.2]} color={STEEL_DARK} />
          <Block position={[0.05, -s / 2 - 0.13, 0.03]} size={[0.03, 0.1, 0.03]} color="#d8a23a" />
          <Block position={[-0.05, -s / 2 - 0.12, -0.02]} size={[0.03, 0.08, 0.03]} color="#c4453a" />
        </>
      ) : null}
      {button > 0 ? <Block position={[0, -0.06, -s / 2 - 0.035]} size={[0.1, 0.1, 0.04]} color="#000000" emissive="#ff4a3a" emissiveIntensity={button} castShadow={false} /> : null}
      {eyes > 0.4 ? <Glow position={[0, 0.03, s / 2 + 0.1]} size={0.5} color={glow} opacity={0.3 * eyes} /> : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- people

type A = Partial<MinecraftAvatarProps>;
const SKIN = "#dba47c";

/**
 * The teller, eighteen, in a RED hoodie nobody else wears. `suit` 0..1 is how far the armor has run down him:
 * helmet at once, chest at 0.3, arms at 0.55, legs at 0.8. `visor` 0 shut, 1 open (so his face can act).
 */
export const Hero: React.FC<A & { suit?: number; visor?: number; eyes?: number; glow?: string }> = ({ suit = 0, visor = 0, eyes = 1, glow, ...p }) => {
  const on = suit > 0;
  return (
    <MinecraftAvatar
      outfit="hoodie"
      skin={SKIN}
      hair="#3a2415"
      colors={{ torso: suit >= 0.3 ? STEEL : "#d5322b", arms: suit >= 0.55 ? STEEL : "#d5322b", legs: suit >= 0.8 ? STEEL_DARK : "#2f3560" }}
      blink
      head={on ? <RoboHead open={visor} eyes={eyes} glow={glow} /> : undefined}
      {...p}
    />
  );
};
export const faceOf = (p: Vec3): Vec3 => [p[0], p[1] + 1.56, p[2]];
export const chestOf = (p: Vec3): Vec3 => [p[0], p[1] + 1.12, p[2]];

export const Mum: React.FC<A> = (p) => <MinecraftAvatar outfit="gown" skin={SKIN} hair="#6b3a1e" colors={{ torso: "#8a5cc2", arms: "#8a5cc2", legs: "#8a5cc2" }} blink phase={0.7} {...p} />;
export const Dad: React.FC<A> = (p) => <MinecraftAvatar outfit="tee" skin={SKIN} hair="#3a2415" face="bearded" colors={{ torso: "#3f8a55", arms: "#3f8a55", legs: "#5a4a3a" }} blink phase={1.6} {...p} />;
/** Nora: teal. Her robot is the shield. */
export const Nora: React.FC<A> = (p) => <MinecraftAvatar outfit="hoodie" skin="#c98e62" hair="#1d1a22" colors={{ torso: "#1fa6a0", arms: "#1fa6a0", legs: "#3a3a48" }} blink phase={2.3} {...p} />;
/** The one with the clever robot: purple. */
export const Ada: React.FC<A> = (p) => <MinecraftAvatar outfit="tee" skin="#e8bf9a" hair="#b5651d" colors={{ torso: "#7b4fd0", arms: "#7b4fd0", legs: "#2f3560" }} blink phase={3.1} {...p} />;
/** The one with the floating hand: orange. */
export const Sam: React.FC<A> = (p) => <MinecraftAvatar outfit="tee" skin="#a8744c" hair="#15120f" colors={{ torso: "#f08a1c", arms: "#f08a1c", legs: "#3a4a3a" }} blink phase={3.9} {...p} />;
/** Pip: small, green, and his robot is the glasses on his face. `lens` lights them. */
export const Pip: React.FC<A & { lens?: number }> = ({ lens = 0.6, ...p }) => (
  <MinecraftAvatar
    scale={0.86}
    outfit="tee"
    skin="#f0c8a0"
    hair="#d9a441"
    colors={{ torso: "#58b04a", arms: "#58b04a", legs: "#6a5a3a" }}
    blink
    phase={4.6}
    head={
      <group position={[0, 0.03, 0.27]}>
        {[-1, 1].map((x) => (
          <group key={x} position={[x * 0.12, 0, 0]}>
            <Block size={[0.2, 0.16, 0.03]} color="#15151a" castShadow={false} />
            <Block position={[0, 0, 0.012]} size={[0.15, 0.11, 0.02]} color="#000000" emissive={CYAN} emissiveIntensity={lens} castShadow={false} />
          </group>
        ))}
        <Block size={[0.06, 0.03, 0.03]} color="#15151a" castShadow={false} />
      </group>
    }
    {...p}
  />
);
/** Brick: big, black. His robot is the two arms (`BrickArms`), drawn beside him. */
export const Brick: React.FC<A> = (p) => <MinecraftAvatar scale={1.14} outfit="tee" skin="#d9a070" hair="#2a1a12" colors={{ torso: "#1c1c22", arms: "#1c1c22", legs: "#3a2f2a" }} blink phase={5.2} {...p} />;
/** A classmate to fill a desk. */
export const Mate: React.FC<A & { n: number }> = ({ n, ...p }) => {
  const look = [
    ["#3d6fd0", "#e8bf9a", "#5a3a1e"],
    ["#d0a23d", "#a8744c", "#15120f"],
    ["#c85a9a", "#f0c8a0", "#8a3a1e"],
    ["#5a8a8a", "#c98e62", "#2a2a2a"],
    ["#8a8a3d", "#dba47c", "#b5651d"],
  ][n % 5];
  return <MinecraftAvatar outfit="tee" skin={look[1]} hair={look[2]} colors={{ torso: look[0], arms: look[0], legs: "#2f3560" }} blink phase={n * 1.3 + 0.2} {...p} />;
};
/**
 * The old man. `suit` 0 is a grey old man in a brown coat; 1 is dark armor with a red visor.
 * Anything given as children is in his right hand (the katana).
 */
export const OldMan: React.FC<A & { suit?: number }> = ({ suit = 0, ...p }) => (
  <MinecraftAvatar
    outfit="gown"
    skin="#d8b79a"
    hair="#e6e6e6"
    face="bearded"
    colors={suit >= 0.5 ? { torso: OLD_STEEL, arms: OLD_STEEL, legs: "#22222a" } : { torso: "#6b5440", arms: "#6b5440", legs: "#4a3a2c" }}
    blink
    phase={6.1}
    head={suit >= 0.5 ? <RoboHead eyes={1.4} metal={OLD_STEEL} glow={RED} /> : undefined}
    {...p}
  />
);
/** The katana, for a right hand: the grip in the fist, the blade out along +Z. `out` 0..1 slides it out. */
export const Katana: React.FC<{ out?: number }> = ({ out = 1 }) => (
  <group>
    <Block position={[0, 0, 0.06]} size={[0.05, 0.05, 0.2]} color="#1a1a20" />
    <Block position={[0, 0, 0.17]} size={[0.14, 0.03, 0.03]} color="#c9a23a" />
    {out > 0.02 ? (
      <>
        <Block position={[0, 0, 0.18 + 0.6 * out]} size={[0.035, 0.07, 1.2 * out]} color="#e8eef6" metalness={0.6} roughness={0.2} emissive="#ff6a5a" emissiveIntensity={0.25} />
        <Block position={[0, 0.03, 0.18 + 0.6 * out]} size={[0.02, 0.02, 1.2 * out]} color="#000000" emissive={RED} emissiveIntensity={1} castShadow={false} />
      </>
    ) : null}
  </group>
);

// ----------------------------------------------------------------------------- robots

const Eye: React.FC<{ position: Vec3; size?: number; color?: string }> = ({ position, size = 0.08, color = CYAN }) => (
  <Block position={position} size={[size, size, 0.02]} color="#000000" emissive={color} emissiveIntensity={1} castShadow={false} />
);

/** A plain robot on two legs. `s` is its height in metres. `cape` makes it a hero; `arms` 0..1 raises them. */
export const Bot: React.FC<{ position: Vec3; rotationY?: number; s?: number; color?: string; eye?: string; cape?: string; arms?: number; bob?: number }> = ({
  position, rotationY = 0, s = 1.6, color = "#c9ced6", eye = CYAN, cape, arms = 0, bob = 0,
}) => (
  <group position={[position[0], position[1] + bob, position[2]]} rotation={[0, rotationY, 0]} scale={s / 1.6}>
    {[-1, 1].map((x) => (
      <Block key={x} position={[x * 0.16, 0.3, 0]} size={[0.18, 0.6, 0.2]} color="#7f8794" />
    ))}
    <Block position={[0, 0.9, 0]} size={[0.62, 0.62, 0.34]} color={color} metalness={0.4} roughness={0.4} />
    <Block position={[0, 0.94, 0.18]} size={[0.24, 0.2, 0.02]} color="#000000" emissive={eye} emissiveIntensity={0.7} castShadow={false} />
    <Block position={[0, 1.4, 0]} size={[0.42, 0.36, 0.36]} color={color} metalness={0.4} roughness={0.4} />
    <Eye position={[-0.1, 1.42, 0.19]} color={eye} />
    <Eye position={[0.1, 1.42, 0.19]} color={eye} />
    <Block position={[0, 1.66, 0]} size={[0.04, 0.16, 0.04]} color="#7f8794" />
    <Block position={[0, 1.76, 0]} size={[0.09, 0.09, 0.09]} color="#000000" emissive="#ff5a4a" emissiveIntensity={1} castShadow={false} />
    {[-1, 1].map((x) => (
      <group key={x} position={[x * 0.42, 1.14, 0]} rotation={[-arms * 2.6, 0, x * (0.1 + arms * 0.3)]}>
        <Block position={[0, -0.3, 0]} size={[0.16, 0.66, 0.18]} color="#9aa2ae" />
      </group>
    ))}
    {cape ? <Block position={[0, 0.82, -0.2]} rotation={[0.18, 0, 0]} size={[0.6, 0.95, 0.04]} color={cape} /> : null}
  </group>
);

/** The butler: black coat, white front, red bow tie, a moustache, one wheel. `pour` 0..1 tips the teapot. */
export const Butler: React.FC<{ position: Vec3; rotationY?: number; pour?: number; bow?: number }> = ({ position, rotationY = 0, pour = 0, bow = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.14, 0]} size={[0.3, 0.28, 0.3]} color="#2a2a30" />
    <Block position={[0, 0.42, 0]} size={[0.12, 0.3, 0.12]} color="#8a919c" />
    <group position={[0, 0.56, 0]} rotation={[bow * 0.5, 0, 0]}>
      <Block position={[0, 0.36, 0]} size={[0.52, 0.72, 0.3]} color="#17171c" />
      <Block position={[0, 0.4, 0.155]} size={[0.2, 0.56, 0.02]} color="#f4f1ea" castShadow={false} />
      <Block position={[0, 0.63, 0.17]} size={[0.16, 0.07, 0.03]} color="#d5322b" castShadow={false} />
      <Block position={[0, 0.92, 0]} size={[0.38, 0.34, 0.34]} color="#eceff3" metalness={0.3} roughness={0.4} />
      <Eye position={[-0.09, 0.96, 0.18]} size={0.06} color="#ffd24a" />
      <Eye position={[0.09, 0.96, 0.18]} size={0.06} color="#ffd24a" />
      <Block position={[0, 0.85, 0.18]} size={[0.2, 0.04, 0.02]} color="#17171c" castShadow={false} />
      <Block position={[0, 1.13, 0]} size={[0.42, 0.06, 0.38]} color="#17171c" />
      <Block position={[0, 1.22, 0]} size={[0.26, 0.14, 0.24]} color="#17171c" />
      {/* the arm with the teapot */}
      <group position={[0.34, 0.6, 0.1]}>
        <Block position={[0, -0.08, 0.14]} size={[0.1, 0.1, 0.4]} color="#17171c" />
        <group position={[0, 0.05, 0.36]} rotation={[0, 0, -pour * 1.0]}>
          <Block size={[0.2, 0.16, 0.16]} color="#f4f1ea" />
          <Block position={[-0.14, 0.02, 0]} size={[0.1, 0.04, 0.04]} color="#f4f1ea" />
          <Block position={[0, 0.1, 0]} size={[0.06, 0.04, 0.06]} color="#c9a23a" />
        </group>
        {pour > 0.5 ? <Block position={[-0.2, -0.12, 0.36]} size={[0.025, 0.28, 0.025]} color="#b5651d" castShadow={false} /> : null}
      </group>
    </group>
  </group>
);

/** Dad's robot: a box for feet. `buzz` shakes it; `t` is the clock. */
export const Massager: React.FC<{ position: Vec3; rotationY?: number; buzz?: number; t?: number }> = ({ position, rotationY = 0, buzz = 0, t = 0 }) => (
  <group position={[position[0] + Math.sin(t * 70) * 0.012 * buzz, position[1], position[2] + Math.cos(t * 61) * 0.012 * buzz]} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.11, 0]} size={[0.74, 0.22, 0.5]} color="#8d96a3" metalness={0.3} roughness={0.5} />
    {[-1, 1].map((x) => (
      <Block key={x} position={[x * 0.18, 0.225, 0.02]} size={[0.24, 0.02, 0.36]} color="#3d6fd0" castShadow={false} />
    ))}
    <Eye position={[-0.1, 0.12, 0.26]} size={0.05} color="#7dff8a" />
    <Eye position={[0.1, 0.12, 0.26]} size={0.05} color="#7dff8a" />
  </group>
);

/** A cleaner: a low box with eyes and a little brush. It is not good at anything. */
export const Cleaner: React.FC<{ position: Vec3; rotationY?: number; tilt?: number }> = ({ position, rotationY = 0, tilt = 0 }) => (
  <group position={position} rotation={[tilt, rotationY, 0]}>
    <Block position={[0, 0.11, 0]} size={[0.5, 0.16, 0.5]} color="#e6e9ee" />
    <Block position={[0, 0.2, 0]} size={[0.3, 0.04, 0.3]} color="#3d6fd0" />
    <Eye position={[-0.1, 0.12, 0.26]} size={0.06} color="#ffd24a" />
    <Eye position={[0.1, 0.12, 0.26]} size={0.06} color="#ffd24a" />
    <Block position={[0.3, 0.05, 0.2]} size={[0.14, 0.06, 0.06]} color="#c9a23a" />
  </group>
);

/** The clever robot: a small floating cube with a screen for a face and a square hat. */
export const SmartBot: React.FC<{ position: Vec3; rotationY?: number; t?: number; text?: string }> = ({ position, rotationY = 0, t = 0, text = "A+" }) => (
  <group position={[position[0], position[1] + Math.sin(t * 3) * 0.05, position[2]]} rotation={[0, rotationY, 0]}>
    <Block size={[0.36, 0.3, 0.3]} color="#f1f1f6" metalness={0.3} roughness={0.4} />
    <Block position={[0, 0, 0.155]} size={[0.28, 0.2, 0.02]} color="#0c1020" emissive="#3a5cff" emissiveIntensity={0.5} castShadow={false} />
    <PixelText text={text} position={[0, 0, 0.17]} height={0.13} maxWidth={0.24} color="#bfe9ff" />
    <Block position={[0, 0.19, 0]} size={[0.42, 0.03, 0.42]} color="#17171c" />
    <Block position={[0, 0.17, 0]} size={[0.2, 0.05, 0.2]} color="#17171c" />
    <Glow position={[0, -0.22, 0]} size={0.3} color="#7b9bff" opacity={0.4} />
  </group>
);

/** The floating hand: a big white glove. `grip` 0..1 curls the fingers; `flat` lays it palm down (for slapping). */
export const FloatHand: React.FC<{ position: Vec3; rotation?: Vec3; grip?: number; children?: React.ReactNode }> = ({ position, rotation = [0, 0, 0], grip = 0, children }) => (
  <group position={position} rotation={rotation}>
    <Block size={[0.34, 0.36, 0.12]} color="#f4f4f8" />
    <Block position={[0, -0.22, 0]} size={[0.3, 0.08, 0.14]} color="#3d6fd0" />
    {[-0.12, -0.04, 0.04, 0.12].map((x, i) => (
      <group key={i} position={[x, 0.18, 0]} rotation={[grip * 1.4, 0, 0]}>
        <Block position={[0, 0.11, 0]} size={[0.07, 0.22, 0.1]} color="#f4f4f8" />
      </group>
    ))}
    <Block position={[0.21, -0.02, 0]} rotation={[0, 0, -0.5]} size={[0.08, 0.2, 0.1]} color="#f4f4f8" />
    <Glow position={[0, -0.32, 0]} size={0.3} color={CYAN} opacity={0.4} />
    {children}
  </group>
);

/** A school bag. */
export const Bag: React.FC<{ position?: Vec3; color?: string }> = ({ position = [0, 0, 0], color = "#c8452e" }) => (
  <group position={position}>
    <Block size={[0.34, 0.4, 0.2]} color={color} />
    <Block position={[0, -0.06, 0.11]} size={[0.22, 0.16, 0.03]} color="#8a2f20" />
    <Block position={[0, 0.24, 0]} size={[0.14, 0.08, 0.04]} color="#3a2a22" />
  </group>
);

/** Nora's robot: a small drone, and the shield it throws. `on` 0..1 opens the shield; `hit` flashes it. `r` is its half-size. */
export const Shield: React.FC<{ position: Vec3; rotationY?: number; on?: number; hit?: number; r?: number }> = ({ position, rotationY = 0, on = 1, hit = 0, r = 1.1 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0, -0.12]} size={[0.26, 0.14, 0.2]} color="#e6e9ee" metalness={0.4} roughness={0.4} />
    <Eye position={[0, 0, -0.01]} size={0.07} color="#7dfff0" />
    {on > 0.02 ? (
      <group scale={on}>
        <Block position={[0, 0, 0.16]} size={[r * 2, r * 2, 0.04]} color="#7dfff0" emissive="#3ff0e0" emissiveIntensity={0.5 + 2 * hit} transparent opacity={0.3 + 0.3 * hit} castShadow={false} />
        {[[0, r, r * 2, 0.06], [0, -r, r * 2, 0.06], [-r, 0, 0.06, r * 2], [r, 0, 0.06, r * 2]].map(([x, y, w, hh], i) => (
          <Block key={i} position={[x, y, 0.16]} size={[w, hh, 0.06]} color="#000000" emissive="#aefff6" emissiveIntensity={1} castShadow={false} />
        ))}
        <Block position={[0, 0, 0.17]} size={[0.06, r * 2, 0.03]} color="#000000" emissive="#aefff6" emissiveIntensity={0.6} castShadow={false} />
        <Block position={[0, 0, 0.17]} size={[r * 2, 0.06, 0.03]} color="#000000" emissive="#aefff6" emissiveIntensity={0.6} castShadow={false} />
      </group>
    ) : null}
  </group>
);

/**
 * Brick's robot: two giant metal arms, worn. `position` and `rotationY` are Brick's. `lift` 0..1 raises the
 * right one straight out in front with one finger up (he lifts Pip with it); `flex` raises both.
 */
export const BrickArms: React.FC<{ position: Vec3; rotationY?: number; lift?: number; flex?: number }> = ({ position, rotationY = 0, lift = 0, flex = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {[-1, 1].map((x) => {
      const up = x === -1 ? Math.max(lift * 1.5, flex * 2.4) : flex * 2.4;
      return (
        <group key={x} position={[x * 0.62, 1.52, 0]} rotation={[-up, 0, x * 0.12]}>
          <Block position={[0, 0.02, 0]} size={[0.5, 0.36, 0.5]} color="#8d96a3" metalness={0.5} roughness={0.4} />
          <Block position={[0, -0.5, 0]} size={[0.34, 0.8, 0.34]} color="#5d6673" metalness={0.5} roughness={0.4} />
          <Block position={[0, -1.02, 0]} size={[0.5, 0.46, 0.5]} color="#8d96a3" metalness={0.5} roughness={0.4} />
          <Block position={[0, -0.5, 0.18]} size={[0.1, 0.5, 0.02]} color="#000000" emissive="#ff8a2a" emissiveIntensity={1} castShadow={false} />
          {x === -1 && lift > 0.3 ? <Block position={[0, -1.36, 0.14]} size={[0.12, 0.3, 0.12]} color="#5d6673" /> : null}
        </group>
      );
    })}
  </group>
);

/** The arm cannon, in the world: `position` is its back end, `to` what it points at. `open` 0..1 unfolds it; `charge` lights the muzzle. */
export const Cannon: React.FC<{ position: Vec3; to: Vec3; open?: number; charge?: number }> = ({ position, to, open = 1, charge = 0 }) => {
  const dx = to[0] - position[0];
  const dy = to[1] - position[1];
  const dz = to[2] - position[2];
  const yaw = Math.atan2(dx, dz);
  const pitch = Math.atan2(dy, Math.hypot(dx, dz));
  return (
    <group position={position} rotation={[0, yaw, 0]}>
      <group rotation={[-pitch, 0, 0]}>
        <Block position={[0, 0, 0.2]} size={[0.26, 0.26, 0.4]} color={OLD_STEEL} metalness={0.5} roughness={0.4} />
        <Block position={[0, 0, 0.4 + 0.3 * open]} size={[0.2, 0.2, 0.6 * open + 0.02]} color="#4a4a58" metalness={0.5} roughness={0.4} />
        {[-1, 1].map((x) => (
          <Block key={x} position={[x * (0.13 + 0.1 * open), 0, 0.3]} rotation={[0, x * 0.5 * open, 0]} size={[0.04, 0.3, 0.44]} color={OLD_STEEL} />
        ))}
        <Block position={[0, 0, 0.72 * open + 0.42]} size={[0.14, 0.14, 0.03]} color="#000000" emissive={RED} emissiveIntensity={0.4 + charge * 1.2} castShadow={false} />
        {charge > 0.05 ? <Glow position={[0, 0, 0.8 * open + 0.45]} size={0.3 + 1.2 * charge} color="#ff5a3a" opacity={0.7} /> : null}
      </group>
    </group>
  );
};

/** A straight beam of light from `from` to `to`. */
export const Beam: React.FC<{ from: Vec3; to: Vec3; width?: number; color?: string; core?: string }> = ({ from, to, width = 0.14, color = CYAN, core = "#eaffff" }) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const len = Math.hypot(dx, dy, dz);
  if (len < 0.02) return null;
  return (
    <group position={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2]} rotation={[0, Math.atan2(dx, dz), 0]}>
      <group rotation={[-Math.atan2(dy, Math.hypot(dx, dz)), 0, 0]}>
        <Block size={[width, width, len]} color="#000000" emissive={color} emissiveIntensity={1} transparent opacity={0.75} castShadow={false} />
        <Block size={[width * 0.45, width * 0.45, len]} color="#000000" emissive={core} emissiveIntensity={1} castShadow={false} />
      </group>
    </group>
  );
};

/** Jets under two feet: `position` is where he stands (his feet), `power` 0..1, `t` the clock. */
export const Jets: React.FC<{ position: Vec3; power?: number; t: number; rotationY?: number }> = ({ position, power = 1, t, rotationY = 0 }) =>
  power > 0.02 ? (
    <group position={position} rotation={[0, rotationY, 0]}>
      {[-0.13, 0.13].map((x, i) => {
        const fl = 0.8 + 0.2 * Math.sin(t * 40 + i * 2);
        return (
          <group key={i} position={[x, 0, 0]}>
            <Block position={[0, -0.22 * power * fl, 0]} size={[0.14, 0.44 * power * fl, 0.14]} color="#000000" emissive={CYAN} emissiveIntensity={1} transparent opacity={0.8} castShadow={false} />
            <Block position={[0, -0.14 * power * fl, 0]} size={[0.07, 0.28 * power * fl, 0.07]} color="#000000" emissive="#ffffff" emissiveIntensity={1} castShadow={false} />
          </group>
        );
      })}
      <Glow position={[0, -0.3, 0]} size={0.9 * power} color={CYAN} opacity={0.5} />
      <pointLight position={[0, -0.3, 0]} color={CYAN} intensity={6 * power} distance={5} decay={2} />
    </group>
  ) : null;

/** The crate a robot comes in. `s` is its size; `lid` 0..1 opens it. */
export const Crate: React.FC<{ position: Vec3; rotationY?: number; s?: number; lid?: number }> = ({ position, rotationY = 0, s = 0.8, lid = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, s * 0.03, 0]} size={[s, s * 0.06, s]} color="#8a6238" />
    {[[0, -1], [0, 1]].map(([, z], i) => (
      <Block key={i} position={[0, s * 0.45, z * s * 0.47]} size={[s, s * 0.9, s * 0.06]} color="#a87a48" />
    ))}
    {[-1, 1].map((x) => (
      <Block key={x} position={[x * s * 0.47, s * 0.45, 0]} size={[s * 0.06, s * 0.9, s * 0.88]} color="#9a6f40" />
    ))}
    <Block position={[0, s * 0.45, s * 0.5]} size={[s * 0.5, s * 0.14, 0.02]} color="#6b4a2a" castShadow={false} />
    <group position={[0, s * 0.92, -s * 0.5]} rotation={[-lid * 1.9, 0, 0]}>
      <Block position={[0, 0, s * 0.5]} size={[s * 1.04, s * 0.07, s * 1.04]} color="#b88a54" />
    </group>
  </group>
);

/** A tree the shots can cut: a trunk and a head of leaves. `cut` 0..1 slides the top off sideways and tips it over. */
export const CutTree: React.FC<{ position: Vec3; height?: number; cut?: number; at?: number; dir?: number }> = ({ position, height = 5, cut = 0, at = 1.3, dir = 1 }) => (
  <group position={position}>
    <Block position={[0, at / 2, 0]} size={[0.6, at, 0.6]} color="#4a3524" />
    {cut > 0 ? <Block position={[0, at + 0.02, 0]} size={[0.62, 0.04, 0.62]} color="#000000" emissive="#ff9a3a" emissiveIntensity={Math.max(0, 1 - cut)} castShadow={false} /> : null}
    <group position={[dir * cut * 0.9, at - cut * cut * (at - 0.35), 0]} rotation={[0, 0, -dir * cut * cut * 1.5]}>
      <Block position={[0, (height - at) * 0.3, 0]} size={[0.6, (height - at) * 0.6, 0.6]} color="#4a3524" />
      <Block position={[0, (height - at) * 0.72, 0]} size={[2.6, (height - at) * 0.5, 2.6]} color="#2f6a2c" />
      <Block position={[0, (height - at) * 1.0, 0]} size={[1.6, (height - at) * 0.3, 1.6]} color="#3a7d34" />
    </group>
  </group>
);

/** A bush. */
export const Bush: React.FC<{ position: Vec3; shake?: number; t?: number }> = ({ position, shake = 0, t = 0 }) => (
  <group position={[position[0] + Math.sin(t * 40) * 0.05 * shake, position[1], position[2]]}>
    <Block position={[0, 0.45, 0]} size={[1.5, 0.9, 1.1]} color="#2f6a2c" />
    <Block position={[0.3, 0.95, 0.1]} size={[0.8, 0.4, 0.7]} color="#3a7d34" />
    <Block position={[-0.5, 0.75, -0.2]} size={[0.6, 0.5, 0.6]} color="#357431" />
  </group>
);

/** A school desk with its stool, facing north. `position` is where the pupil sits. */
export const Desk: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 0.72, -0.5]} size={[0.9, 0.06, 0.55]} color="#b88a54" />
    {[-0.38, 0.38].map((x) => (
      <Block key={x} position={[x, 0.36, -0.5]} size={[0.06, 0.7, 0.45]} color="#7a5632" />
    ))}
    <Block position={[0, 0.42, 0.02]} size={[0.5, 0.06, 0.45]} color="#7a5632" />
    <Block position={[0, 0.2, 0.02]} size={[0.3, 0.4, 0.3]} color="#6b4a2a" />
  </group>
);

/** The way to turn (rotationY) to stand at `a` and face `b`. */
export const toward = (a: Vec3, b: Vec3): number => Math.atan2(b[0] - a[0], b[2] - a[2]);
/** A point `d` metres in front of somebody at `p` turned `yaw`, `y` up. Where held things and hands are. */
export const front = (p: Vec3, yaw: number, d: number, y: number): Vec3 => [p[0] + Math.sin(yaw) * d, p[1] + y, p[2] + Math.cos(yaw) * d];
/** The head, put somewhere in the world. */
export const HeadAt: React.FC<{ position: Vec3; rotation?: Vec3; open?: number; eyes?: number; button?: number; glow?: string }> = ({ position, rotation = [0, 0, 0], ...p }) => (
  <group position={position} rotation={rotation}>
    <RoboHead neck {...p} />
  </group>
);
/** A dodgeball. */
export const Ball: React.FC<{ position: Vec3; color?: string }> = ({ position, color = "#d5322b" }) => <Block position={position} size={[0.3, 0.3, 0.3]} color={color} />;

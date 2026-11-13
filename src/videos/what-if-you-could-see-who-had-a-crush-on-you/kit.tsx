import type React from "react";
import { Block, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { Bits, Classmate, DEG, KID, NORTH, Overhead, Teacher, classroom, gym, kitchen, lunchRoom, wordClock } from "../../../Topics/WhatIf";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * Everything another "What if" film could use is in the topic's pack, Topics/WhatIf (catalogue with pictures:
 * Topics/WhatIf/PACK.md). It is passed on from here, so a scene imports only from "./kit". Build something new
 * here ONLY if the pack does not have it; if a second film could use it, put it in the pack instead.
 */

export {
  // how a power is shown
  Overhead,
  // the people round the teller
  Classmate, KIDS, Teacher,
  // the school, and home
  Classroom, Desk, Gym, Kitchen, LunchRoom, Reflection, SchoolHall,
  // the small things
  Card, Cookie, CookieStack, Cup, Dog, DogBowl, Eraser, Sandwich, Tie, Tray,
  // shared with the other topics: a kid's bedroom, cubes that spell, a speech bubble, the last picture
  BedBox, Bits, Bubble, Figure, Icon, Puffs, Room, SoundRings, SubscribeSign,
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
} from "../../../Topics/WhatIf";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.heart", "heart")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

/** The film second at which a line starts: for ONE action that runs across a cut (`cueStart("7.door") - cueStart("7.walk")`). */
export const cueStart = (id: string): number => {
  const cue = timing.cues.find((c) => c.id === id);
  if (!cue) throw new Error(`cueStart: no cue "${id}"`);
  return cue.start;
};

// ----------------------------------------------------------------------------- places

/**
 * Where things are. Each place is its own zone, far from the others, and a shot names the zone it plays in.
 * world.tsx builds the places from these, and scenes stand people on them: change a number here, never in two.
 */
export const PLACE = {
  /** The classroom. The middle of its floor. */
  class: [0, 0, 0] as Vec3,
  /** The hallway of lockers. */
  hall: [0, 0, 40] as Vec3,
  /** The teller's room. */
  room: [0, 0, 80] as Vec3,
  /** The kitchen at home. */
  kitchen: [40, 0, 0] as Vec3,
  /** The lunch room. */
  lunch: [40, 0, 40] as Vec3,
  /** The gym. The yard and the school gate are south of it, in the same zone. */
  gym: [80, 0, 0] as Vec3,
};
/** The classroom's desks, board and door: `SPOT.seat(col, row)`, `SPOT.teacher`, `SPOT.board`… */
export const SPOT = classroom(PLACE.class);
/** The kitchen: `HOME.stove`, `HOME.chair`, `HOME.door`, `HOME.bowl`, `HOME.mirror`. */
export const HOME = kitchen(PLACE.kitchen);
/** The lunch room: `LUNCH.line(i)`, `LUNCH.seat(table, "n" | "s", k)`, `LUNCH.top(table, k)`. */
export const LUNCH = lunchRoom(PLACE.lunch);
/** The gym and its yard: `GYM.lights`, `GYM.door`, `GYM.drinks`, `GYM.gate`, `GYM.lamp`, `GYM.street`. */
export const GYM = gym(PLACE.gym);
/** A point of the hall, from the middle of its floor. People stand at the lockers at z = −0.9 and walk at z = +0.3. */
export const hall = (x: number, y: number, z: number): Vec3 => [PLACE.hall[0] + x, PLACE.hall[1] + y, PLACE.hall[2] + z];
/** A point of the teller's room, from its origin (2.5 m in front of the north wall). */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

/**
 * WHO SITS WHERE. Column 0 is by the windows, row 0 is the front. The teller is in the MIDDLE of the room, and
 * that is the whole film: Jo is the desk behind him, where he never looks, and Mia is in front of him by the
 * window, where he never looks away.
 *
 *             board                  door
 *   MIA      (empty)   (empty)       row 0
 *   a kid     ME        BEN          row 1
 *   LEO       JO        LILY         row 2
 *   windows
 *
 * A tall frame holds ONE column of desks (Topics/WhatIf/SHOTS.md §2), so the seats are chosen by column:
 *   - the middle column is him and Jo, and the desk in front of him is EMPTY: a lens at the board sees his face
 *     with nothing in the way, and Jo and her heart right behind it;
 *   - the window column is Mia with Leo two desks behind her: one frame from the board holds both;
 *   - the door column is Ben with Lily behind him: the same thing he cannot see about himself, one desk over.
 */
export const ME = SPOT.seat(1, 1);
export const JO = SPOT.seat(1, 2);
export const MIA = SPOT.seat(0, 0);
export const LEO = SPOT.seat(0, 2);
export const BEN = SPOT.seat(2, 1);
export const LILY = SPOT.seat(2, 2);
/** The face of each of them, sitting: what a close-up looks at. */
export const FACE = { me: SPOT.face(1, 1), jo: SPOT.face(1, 2), mia: SPOT.face(0, 0), leo: SPOT.face(0, 2), ben: SPOT.face(2, 1), lily: SPOT.face(2, 2) };

// ----------------------------------------------------------------------------- the power

/**
 * THE POWER HAS ONE LOOK: a pink heart over a head. This is the only way it is ever drawn.
 * `yaw` is the camera's yaw in degrees (the heart turns to face the lens); `tall` is how tall the one under it
 * is (see TALL). `t` pops it in as it passes 0: leave it out for a heart that was already there.
 */
export const Heart: React.FC<{ over: Vec3; size?: number; t?: number; yaw?: number; tall?: number; fade?: number }> = ({ over, size = HEART.mid, t = 9, yaw = 0, tall = TALL.kid, fade = 0 }) => (
  <Overhead over={over} kind="heart" size={size} t={t} tall={tall} rotationY={yaw * DEG} fade={fade} />
);
/** How big a heart is. Jo's, with him at the next desk, is `jo`: nothing else in the school comes near it until the dance. */
export const HEART = { tiny: 0.13, small: 0.2, mid: 0.34, big: 0.62, jo: 0.95 };
/**
 * THE RULE, as a number: how big Jo's heart is when he is `metres` away from her. It is the biggest heart in the
 * school at the next desk and a dot at the far end of a path, and every shot she is in takes its size from here,
 * so that the last line of the film ("It had only ever been near me") is true of every picture before it.
 */
export const joHeart = (metres: number): number => {
  const pts: Array<[number, number]> = [
    [1.7, HEART.jo],
    [2.6, 0.6],
    [4, 0.4],
    [6, 0.27],
    [10, 0.2],
    [20, HEART.tiny],
  ];
  if (metres <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (metres <= pts[i][0]) {
      const k = (metres - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0]);
      return pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k;
    }
  }
  return pts[pts.length - 1][1];
};
/** How far apart two people are, on the ground. */
export const apart = (a: Vec3, b: Vec3): number => Math.hypot(a[0] - b[0], a[2] - b[2]);
/** How tall the one under a heart is, in metres. */
export const TALL = { kid: 1.44, seated: 1.34, leo: 1.64, leoSeated: 1.53, adult: 1.8, dog: 0.82, dogSitting: 0.86 };

// ----------------------------------------------------------------------------- the teller, and the people the story is about

type A = Partial<MinecraftAvatarProps>;

/**
 * The teller: a kid, first person, in most of the shots. ORANGE, and nobody else in the film wears it,
 * so a phone can find him in a full lunch room.
 * Faces for a kid: smile grin laugh frown uneasy brave fear wow ouch calm. Change the face on the cut.
 */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#ff7a1a", arms: "#ff7a1a", legs: "#2b2f6a" }} blink {...p} />
);

/** Two bunches of hair, tied with yellow: Jo can be told from behind, and from the far end of a path at night. */
const Bunches = (
  <>
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.3, 0.02, -0.08]} size={[0.15, 0.3, 0.16]} color="#1f1a18" />
        <Block position={[s * 0.245, 0.1, -0.08]} size={[0.05, 0.1, 0.18]} color="#ffd24a" castShadow={false} />
      </group>
    ))}
  </>
);

/** JO, the best friend: the desk behind him. Teal, bare arms, two bunches. */
export const Jo: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#8a5a3c" hair="#1f1a18" colors={{ torso: "#2fb5a8", arms: "skin", legs: "#3a3344" }} blink phase={0.6} head={Bunches} {...p} />
);

const longHair = (color: string) => (
  <>
    <Block position={[0, -0.14, -0.245]} size={[0.5, 0.62, 0.06]} color={color} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.245, -0.16, -0.1]} size={[0.05, 0.56, 0.26]} color={color} />
    ))}
  </>
);

/** MIA, by the window. Violet, long fair hair. She never says a word. */
export const Mia: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#f0c8a4" hair="#f2d36b" colors={{ torso: "#8d5cf0", arms: "#8d5cf0", legs: "#e9e4f6" }} blink phase={1.3} head={longHair("#f2d36b")} {...p} />
);

/** LEO: the tallest kid in the class, in green. On screen four times before anybody says his name. */
export const LEO_SCALE = 0.91;
export const Leo: React.FC<A> = (p) => (
  <MinecraftAvatar scale={LEO_SCALE} outfit="tee" skin="#c99a74" hair="#2b2b2b" colors={{ torso: "#3fae4a", arms: "#3fae4a", legs: "#2e3c5e" }} blink phase={2.1} {...p} />
);

/** BEN and LILY: the first two he tells. Ben is the pack's kid 0; Lily is kid 2 with a yellow band in her red hair. */
export const Ben: React.FC<A> = (p) => <Classmate who={0} phase={0.3} {...p} />;
export const Lily: React.FC<A> = (p) => <Classmate who={2} head={<Block position={[0, 0.2, 0.03]} size={[0.5, 0.07, 0.12]} color="#ffd24a" castShadow={false} />} {...p} />;

/** The math teacher: the pack's teacher, with her hair up. */
export const MathTeacher: React.FC<A> = (p) => <Teacher head={<Block position={[0, 0.24, -0.16]} size={[0.24, 0.2, 0.24]} color="#4a3524" />} {...p} />;

/** The gym teacher: a blue track suit and a white cap. */
export const GymTeacher: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1.04}
    outfit="tee"
    skin="#b97a56"
    hair="#1f1a18"
    colors={{ torso: "#2a5bd7", arms: "#2a5bd7", legs: "#1f2f66" }}
    face="smile"
    blink
    phase={0.9}
    head={
      <>
        <Block position={[0, 0.24, 0]} size={[0.48, 0.07, 0.48]} color="#f4f7fb" />
        <Block position={[0, 0.215, 0.31]} size={[0.4, 0.03, 0.16]} color="#f4f7fb" />
      </>
    }
    {...p}
  />
);

/** Mom: green, long brown hair. */
export const Mom: React.FC<A> = (p) => (
  <MinecraftAvatar scale={1} outfit="tee" skin="#dba47c" hair="#5a3a1e" colors={{ torso: "#2f8a5a", arms: "#2f8a5a", legs: "#3a3f52" }} face="smile" blink phase={0.4} head={longHair("#5a3a1e")} {...p} />
);

/** The cook behind the lunch counter: white coat, white cap. */
export const Cook: React.FC<A> = (p) => (
  <MinecraftAvatar scale={1} outfit="tee" skin="#c99a74" hair="#6a4a32" colors={{ torso: "#f4f7fb", arms: "#f4f7fb", legs: "#59606b" }} face="smile" blink phase={2.6} head={<Block position={[0, 0.27, 0]} size={[0.44, 0.12, 0.44]} color="#f4f7fb" />} {...p} />
);

/** Dad: a white shirt. His tie is drawn by the scene (`Tie`), because one night it is not on him. */
export const Dad: React.FC<A> = (p) => (
  <MinecraftAvatar scale={1.02} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#f2f2f2", arms: "#f2f2f2", legs: "#4a4a58" }} face="smile" blink phase={1.7} {...p} />
);

// ----------------------------------------------------------------------------- the class

type Who = "me" | "jo" | "mia" | "leo" | "ben" | "lily" | "kid";

/**
 * THE CLASS AT ITS DESKS, everybody in their own seat, looking at their work. A scene leaves out (`without`)
 * whoever it wants to play itself, and whoever is not in the room. `laugh` sets everybody but Jo laughing.
 */
export const Class: React.FC<{ without?: Who[]; laugh?: boolean; lookAt?: Vec3 }> = ({ without = [], laugh = false, lookAt }) => {
  const has = (who: Who) => !without.includes(who);
  const mood: A = laugh ? { animation: "sit", arms: "laugh", face: "laugh", lookAt } : { animation: "sit", face: "calm", headPitch: 0.3 };
  return (
    <>
      {has("kid") ? <Classmate who={5} position={SPOT.seat(0, 1)} rotationY={NORTH} {...mood} /> : null}
      {has("ben") ? <Ben position={BEN} rotationY={NORTH} {...mood} /> : null}
      {has("lily") ? <Lily position={LILY} rotationY={NORTH} {...mood} /> : null}
      {has("leo") ? <Leo position={LEO} rotationY={NORTH} {...mood} /> : null}
      {has("mia") ? <Mia position={MIA} rotationY={NORTH} {...mood} /> : null}
      {has("jo") ? <Jo position={JO} rotationY={NORTH} animation="sit" face="smile" /> : null}
      {has("me") ? <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" /> : null}
    </>
  );
};

/**
 * A thing held in front of somebody: a tray, a cup, a card. `by` is their feet and `facing` their rotationY;
 * the thing is drawn `out` metres in front of them and `up` metres off the floor, turned the way they face.
 */
export const Held: React.FC<{ by: Vec3; facing: number; out?: number; up?: number; side?: number; children: React.ReactNode }> = ({ by, facing, out = 0.36, up = 0.8, side = 0, children }) => (
  <group position={[by[0] + Math.sin(facing) * out + Math.cos(facing) * side, by[1] + up, by[2] + Math.cos(facing) * out - Math.sin(facing) * side]} rotation={[0, facing, 0]}>
    {children}
  </group>
);

/** Straight-line blend between two points. */
export const mix = (a: Vec3, b: Vec3, k: number): Vec3 => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

/**
 * Walk a BENT line: `stride` over more than one leg. `metres` is how far along it he is (hang it on the clock);
 * the feet follow the ground because the distance is real. Past the end he stands on the last point.
 *
 *   <Hero {...route([A, B, C], 1.4 * t)} animation="walk" />
 */
export const route = (points: Vec3[], metres: number): { position: Vec3; rotationY: number; animDistance: number } => {
  let left = Math.max(0, metres);
  let walked = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const len = Math.hypot(b[0] - a[0], b[2] - a[2]);
    const last = i === points.length - 2;
    if (left <= len || last) {
      const k = len > 0 ? Math.min(1, left / len) : 1;
      return { position: [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k], rotationY: Math.atan2(b[0] - a[0], b[2] - a[2]), animDistance: walked + len * k };
    }
    left -= len;
    walked += len;
  }
  return { position: points[0], rotationY: 0, animDistance: 0 };
};

/** A knock on the head: yellow stars that fly from where it landed. `t` is seconds since the knock. */
export const Stars: React.FC<{ position: Vec3; t: number; seed?: number }> = ({ position, t, seed = 2 }) => <Bits position={position} t={t} color="#ffd24a" count={9} seed={seed} power={0.75} />;

/** Something that is growing fast overshoots and settles: 0 before `at`, past 1, then 1. `dur` is the whole wobble. */
export const boing = (t: number, at: number, dur = 0.5): number => {
  const k = (t - at) / dur;
  if (k <= 0) return 0;
  if (k >= 1) return 1;
  return 1 - Math.exp(-6 * k) * Math.cos(k * 15);
};

import type React from "react";
import { Block, Glow, MinecraftAvatar, PixelText, Torch, Vox, clamp, clamp01, glowTex, mulberry32, shade, smoothstep, useFilmTime } from "../../engine";
import type { AnimName, FaceName, MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import timingJson from "./timing.json";

/**
 * The cast, the things they carry, and the small maths every scene of this film uses.
 *
 * Two kinds of people live in this film, and the whole story is the difference:
 *   - VILLAGERS have one face, no hands and one word. They are built here, from boxes.
 *   - PLAYERS (the teller, and the strangers over the hill) are `MinecraftAvatar`s: every face different, and hands.
 */

export const timing = timingJson as unknown as Timing;

// ----------------------------------------------------------------------------- maths

/** Seconds into its shot at which a word is said: `wordAt("3.hmm", "hmm")`. */
export function wordAt(cueId: string, word: string, nth = 0): number {
  const cue = timing.cues.find((c) => c.id === cueId);
  if (!cue) throw new Error(`wordAt: no cue "${cueId}"`);
  let seen = 0;
  for (const w of timing.words) {
    if (w.s < cue.start - 0.05 || w.s >= cue.end) continue;
    if (w.w.toLowerCase().replace(/[^a-z']/g, "") === word.toLowerCase()) {
      if (seen === nth) return Math.max(0, w.s - cue.start);
      seen++;
    }
  }
  throw new Error(`wordAt: cue "${cueId}" has no word "${word}" (#${nth})`);
}

/** 0 before `a`, 1 after `b`, straight in between. */
export const ramp = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
export const ease = (k: number) => smoothstep(clamp01(k));
/** Scale for a thing that pops into being at `at`: 0, a small overshoot, then 1. */
export const pop = (t: number, at: number, dur = 0.24) => {
  const k = clamp01((t - at) / dur);
  return k <= 0 ? 0 : (1 - (1 - k) ** 3) * (1 + 0.3 * Math.sin(k * Math.PI));
};
/** A short decaying rattle that starts at `at`: a tap, a jolt. */
export const jolt = (t: number, at: number, size = 0.2) => {
  const x = t - at;
  return x <= 0 ? 0 : Math.exp(-x * 13) * Math.sin(x * 42) * size;
};

/** A point `dist` metres in front of someone (behind, if negative) and `up` metres above their feet. */
export const ahead = (p: Vec3, rotY: number, dist: number, up = 0): Vec3 => [
  p[0] + Math.sin(rotY) * dist,
  p[1] + up,
  p[2] + Math.cos(rotY) * dist,
];
/** A point given in someone's own axes: `side` to their +X (their right hand), `up`, `front`. */
export const beside = (p: Vec3, rotY: number, side: number, up = 0, front = 0): Vec3 => [
  p[0] + Math.cos(rotY) * side + Math.sin(rotY) * front,
  p[1] + up,
  p[2] - Math.sin(rotY) * side + Math.cos(rotY) * front,
];

/** Facing directions, as `rotationY`. The valley runs west–east; the camera usually stands to the south. */
export const SOUTH = 0;
export const EAST = Math.PI / 2;
export const NORTH = Math.PI;
export const WEST = -Math.PI / 2;
export const DEG = Math.PI / 180;

export const KID = 0.8;
export const faceOf = (p: Vec3, scale = KID): Vec3 => [p[0], p[1] + 1.53 * scale, p[2]];
export const chestOf = (p: Vec3, scale = KID): Vec3 => [p[0], p[1] + 1.12 * scale, p[2]];

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** The middle of the square. The bell is north of it, the well south-west. */
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  /** Where the iron golem stands guard. */
  post: [2.8, 0, 0.8] as Vec3,
  stall: [6.4, 0, -2.6] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  /** The oldest villager's porch. It is half a block high, so she stands over a kid. */
  porch: [-10, 0.5, -4.1] as Vec3,
  /** Where a kid stands to talk to her. */
  porchFoot: [-10, 0, -2.5] as Vec3,
  home: [10, 0, -5] as Vec3,
  /** The oldest house in town, burned black. Middle of its front wall. */
  black: [-21, 0, -5] as Vec3,
  /** The east end of the street, where you stand to look at the hill. */
  streetEnd: [24, 0, 2] as Vec3,
  /** The grass under the hill where the teller was found. */
  found: [29.2, 0, 6.6] as Vec3,
  /** The hero's room. Its own zone, far from everything. */
  room: [0, 0, 80] as Vec3,
  /** The tunnel. Its own zone. It runs along X; the digging face is at +X. */
  tunnel: [0, 0, 120] as Vec3,
  /** The east lip of the hill top: the place the whole film is about. */
  lip: [50.3, 11, 0] as Vec3,
  /** The middle of the village on the other side. */
  other: [84, 0, 0] as Vec3,
};
/** The hero's room: a point given in room coordinates. */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];
/** The hole under the bed. The bed's usual place is right over it. */
export const HOLE = room(-1.2, 0, -1.2);
/** Where the bed stands when it is pushed aside. */
export const ASIDE = room(-0.25, 0, -1.2);

/**
 * THE HILL. Eleven layers of one block each, stepping in 1.2 m a layer, 76 m long north to south:
 * a ridge that closes the valley. Top at y = 11, from x = 45 to x = 51.
 */
export const HILL = { x: 48, layers: 11, top: 11 };
/** The middle of step `i` (0 = the first block off the valley floor) on the west slope, the side the town can see. */
export const stepAt = (i: number, z = 0): Vec3 => [33 + 1.2 * i + 0.6, i + 1, z];
/** The same on the east slope, the side nobody may see. */
export const stepEast = (i: number, z = 0): Vec3 => [63 - 1.2 * i - 0.6, i + 1, z];
/**
 * Hop up `steps` blocks of the west slope, Minecraft style: up first, then forward.
 * `p` runs 0 → 1 over the whole climb. Returns the feet position.
 */
export function climb(from: number, steps: number, p: number, z = 0): Vec3 {
  const f = Math.min(steps - 1e-4, clamp01(p) * steps);
  const i = Math.floor(f);
  const k = f - i;
  const a = stepAt(from + i, z);
  return [a[0] + 1.2 * ease((k - 0.25) / 0.75), a[1] + ease(k / 0.5) + 0.26 * Math.sin(Math.PI * k), z];
}

// ----------------------------------------------------------------------------- players

type A = Partial<MinecraftAvatarProps>;

/** The teller. Bare arms on purpose: in this town, hands are the strangest thing about him. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#16a6b6", arms: "skin", legs: "#3b3fa0" }}
    blink
    {...p}
  />
);

type Skin = { skin: string; hair: string; torso: string; arms: string; legs: string; face?: FaceName; pumpkin?: boolean };
/** The people over the hill. 0 has the beard, 1 the green hair, 2 the pumpkin. No two alike. */
const RAIDERS: Skin[] = [
  { skin: "#e0ac7e", hair: "#5a3a1e", torso: "#8a2f2a", arms: "#8a2f2a", legs: "#3a3a48", face: "bearded" },
  { skin: "#f0c8a4", hair: "#3ed24a", torso: "#23262f", arms: "#23262f", legs: "#4a5a8a" },
  { skin: "#c99a74", hair: "#2b2b2b", torso: "#6a4aa8", arms: "#6a4aa8", legs: "#2a2a3a", pumpkin: true },
  { skin: "#b97a56", hair: "#1f1a18", torso: "#4fd6d0", arms: "#4fd6d0", legs: "#3fb8b2" },
  { skin: "#f0c8a4", hair: "#e08a2a", torso: "#5fa03c", arms: "skin", legs: "#6a4a2e" },
  { skin: "#8a5a3c", hair: "#e9e4d8", torso: "#d9cdb4", arms: "#d9cdb4", legs: "#3b3f52" },
  { skin: "#ecc19a", hair: "#c2452a", torso: "#e8c44a", arms: "skin", legs: "#2f2f38" },
  { skin: "#e3b48c", hair: "#6a3fa0", torso: "#e85a9a", arms: "#e85a9a", legs: "#3a3344" },
  { skin: "#f0c8a4", hair: "#f2e24a", torso: "#c8362e", arms: "#c8362e", legs: "#2e3c6e" },
  { skin: "#6b4a34", hair: "#2b2b2b", torso: "#f2efe6", arms: "skin", legs: "#7a5a3a" },
  { skin: "#ecc19a", hair: "#3f6fb8", torso: "#f07a2a", arms: "#f07a2a", legs: "#3a3344" },
  { skin: "#d9a27a", hair: "#8a8a8a", torso: "#3f8a4f", arms: "#3f8a4f", legs: "#4a3a2a" },
];

/** A carved pumpkin, worn as a head. `position` is its middle. */
export const Pumpkin: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block size={[0.56, 0.54, 0.56]} color="#e07f1c" />
    {[-0.2, 0, 0.2].map((x) => (
      <Block key={x} position={[x, 0, 0.283]} size={[0.03, 0.54, 0.01]} color="#b85f10" castShadow={false} />
    ))}
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.13, 0.08, 0.286]} size={[0.13, 0.11, 0.012]} color="#2a1405" castShadow={false} />
    ))}
    <Block position={[0, -0.12, 0.286]} size={[0.36, 0.07, 0.012]} color="#2a1405" castShadow={false} />
    {[-0.11, 0.02, 0.13].map((x) => (
      <Block key={x} position={[x, -0.075, 0.288]} size={[0.06, 0.05, 0.012]} color="#e07f1c" castShadow={false} />
    ))}
    <Block position={[0, 0.31, 0]} size={[0.1, 0.1, 0.1]} color="#5a7a2a" />
  </group>
);

/** One of the strangers. `who` picks the skin. `torch` puts a lit torch in the right hand. */
export const Raider: React.FC<A & { who: number; torch?: boolean; light?: number }> = ({
  who,
  torch = false,
  light = 0,
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  ...p
}) => {
  const c = RAIDERS[who % RAIDERS.length];
  return (
    <>
      <MinecraftAvatar
        position={position}
        rotationY={rotationY}
        scale={scale}
        outfit="tee"
        skin={c.skin}
        hair={c.hair}
        colors={{ torso: c.torso, arms: c.arms, legs: c.legs }}
        face={c.face ?? "grin"}
        blink
        phase={who * 2.3 + 0.4}
        {...p}
      >
        {torch ? <Torch position={[0, -0.02, 0.06]} lean={[1.2, 0, 0]} light={light} seed={who + 3} /> : null}
      </MinecraftAvatar>
      {c.pumpkin ? <Pumpkin position={[position[0], position[1] + 1.585 * scale, position[2]]} rotationY={rotationY + (p.headYaw ?? 0)} scale={scale} /> : null}
    </>
  );
};

/** Where the three strangers he names are standing. */
export const NAMED = {
  beard: [66.2, 0, 1.0] as Vec3,
  hair: [67.6, 0, -2.4] as Vec3,
  pumpkin: [65.2, 0, 3.4] as Vec3,
};

/** The people at the foot of the hill: [x, z, facing, clip, who, torch]. The first three are the ones he names. */
const CROWD: Array<[number, number, number, AnimName, number, boolean]> = [
  [NAMED.beard[0], NAMED.beard[2], WEST + 0.1, "laugh", 0, true],
  [NAMED.hair[0], NAMED.hair[2], WEST - 0.25, "cheer", 1, false],
  [NAMED.pumpkin[0], NAMED.pumpkin[2], WEST + 0.35, "lookAround", 2, true],
  [64.3, -3.0, WEST + 0.5, "talk", 3, true],
  [66.6, 4.9, NORTH, "talk", 4, true],
  [67.1, 6.1, 0.3, "laugh", 5, false],
  [68.6, 0.4, WEST + 0.4, "point", 6, true],
  [69.2, -4.2, WEST, "cheer", 7, true],
  [68.2, -5.8, EAST, "idle", 8, false],
  [69.6, 3.0, WEST - 0.5, "laugh", 9, true],
  [64.6, 6.2, WEST + 0.2, "cheer", 10, false],
  [65.8, -5.2, WEST - 0.4, "talk", 11, true],
  [70.4, -1.6, EAST + 0.3, "lookAround", 3, false],
  [63.7, 2.7, EAST - 0.2, "point", 9, true],
  [70.8, 5.2, WEST + 0.6, "cheer", 6, false],
  [70.2, -6.8, WEST - 0.2, "talk", 10, true],
  [64.0, -6.4, WEST + 0.3, "laugh", 8, true],
  [66.9, -0.9, EAST + 0.5, "talk", 5, false],
];
const CROWD_FACES: FaceName[] = ["grin", "laugh", "happy", "smug", "grin", "laugh"];

/** Dozens of people, at the foot of the far side of the hill. No two alike, and every one of them has hands. */
export const Strangers: React.FC<{ lit?: boolean }> = ({ lit = false }) => (
  <>
    {CROWD.map(([x, z, rot, clip, who, torch], i) => (
      <Raider
        key={i}
        who={who}
        position={[x, 0, z]}
        rotationY={rot}
        animation={clip}
        torch={torch}
        light={lit && i < 3 ? 5 : 0}
        phase={i * 1.37}
        {...(who === 0 ? {} : { face: CROWD_FACES[i % CROWD_FACES.length] })}
      />
    ))}
  </>
);

// ----------------------------------------------------------------------------- villagers

const U = 1.8 / 32; // one Minecraft pixel, in metres
export const ADULT = 0.94;
export const CHILD = 0.7;
const VILLAGER_SKIN = "#bd8b72";

/** Robe colours. The face never changes, so the robe is how you tell who is who. */
export const ROBE = {
  brown: "#6b4a34",
  elder: "#6a3f8a",
  friend: "#4f9a3a",
  white: "#e2dccb",
  smith: "#3c3c44",
  farmer: "#8a6a3a",
  red: "#9a3f34",
  blue: "#3f5f9a",
};

export type VillagerProps = {
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  robe?: string;
  /** Metres walked. Drives the waddle. */
  walk?: number;
  /** Head angles, radians. `nod` positive looks down. */
  nod?: number;
  turn?: number;
  tilt?: number;
  /** World point for the head to look at. Overrides `nod` and `turn`. */
  lookAt?: Vec3;
  /** 0..1: saying "hmm". The head bobs and the nose wags. */
  hmm?: number;
  /** 0..1: trying to get the arms out of the sleeves. They do not come out. */
  strain?: number;
  /** Body pitch, radians: a bow. */
  lean?: number;
  hat?: "none" | "straw";
  /** A child: the same face on a slightly bigger head. */
  kid?: boolean;
  phase?: number;
};

/**
 * A villager. Feet on `position`, facing +Z. One long nose, one long eyebrow,
 * and two arms folded into one block. There is exactly one face: do not add another.
 */
export const Villager: React.FC<VillagerProps> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = ADULT,
  robe = ROBE.brown,
  walk = 0,
  nod = 0,
  turn = 0,
  tilt = 0,
  lookAt,
  hmm = 0,
  strain = 0,
  lean = 0,
  hat = "none",
  kid = false,
  phase = 0,
}) => {
  const t = useFilmTime();
  const u = U;
  const gait = walk * 5.4;
  const swing = Math.sin(gait) * 0.55;
  const bob = Math.abs(Math.sin(gait)) * 0.03 + Math.sin(t * 1.3 + phase) * 0.005;
  const sway = Math.sin(gait) * 0.035;

  let yaw = turn;
  let pitch = nod;
  if (lookAt) {
    const dx = lookAt[0] - position[0];
    const dz = lookAt[2] - position[2];
    const dy = lookAt[1] - (position[1] + 29 * u * scale);
    let rel = Math.atan2(dx, dz) - rotationY;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    yaw = clamp(rel, -1.2, 1.2);
    pitch = clamp(-Math.atan2(dy, Math.hypot(dx, dz)), -0.6, 0.65);
  }
  const wag = hmm * Math.sin(t * 17 + phase) * 0.24;
  const hmmBob = hmm * (0.07 + Math.sin(t * 8.5 + phase) * 0.05);
  const shake = strain * Math.sin(t * 41 + phase);
  const shut = (t + phase * 1.7) % 3.3 < 0.12;
  const sleeve = shade(robe, 0.07);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 2 * u, 12 * u, 0]} rotation={[s * swing, 0, 0]}>
          <Block position={[0, -6 * u, 0]} size={[3.8 * u, 12 * u, 4 * u]} color={shade(robe, -0.3)} />
        </group>
      ))}
      <group position={[0, 12 * u + bob, 0]} rotation={[lean, 0, sway + shake * 0.02]}>
        <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 6 * u]} color={robe} />
        <Block position={[0, -2.6 * u, 0]} size={[8.7 * u, 7.2 * u, 6.7 * u]} color={shade(robe, -0.09)} />
        {/* The arms: two sleeves and the block that joins them. They are one piece, and they stay one piece. */}
        <group position={[0, (9 + strain * 1.6) * u + shake * 0.007, 1 * u]} rotation={[-0.75 - strain * 0.3 + shake * 0.05, 0, 0]}>
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 6 * u, -2 * u, 0]} size={[4 * u, 8 * u, 4 * u]} color={sleeve} />
          ))}
          <Block position={[0, -4 * u, 0]} size={[8 * u, 4 * u, 4 * u]} color={sleeve} />
        </group>
        <group position={[0, 12 * u, 0]} rotation={[pitch + hmmBob, yaw, tilt]} scale={kid ? 1.16 : 1}>
          <Block position={[0, 5 * u, 0]} size={[8 * u, 10 * u, 8 * u]} color={VILLAGER_SKIN} />
          {/* One long eyebrow. */}
          <Block position={[0, 5.6 * u, 4.04 * u]} size={[6.2 * u, 1.1 * u, 0.12 * u]} color="#35261c" castShadow={false} />
          {shut ? (
            [-1, 1].map((s) => (
              <Block key={s} position={[s * 2 * u, 4.4 * u, 4.04 * u]} size={[2 * u, 0.3 * u, 0.1 * u]} color="#7a5646" castShadow={false} />
            ))
          ) : (
            [-1, 1].map((s) => (
              <group key={s}>
                <Block position={[s * 2.5 * u, 4.5 * u, 4.04 * u]} size={[1 * u, 1 * u, 0.1 * u]} color="#fbfbf5" castShadow={false} />
                <Block position={[s * 1.5 * u, 4.5 * u, 4.04 * u]} size={[1 * u, 1 * u, 0.1 * u]} color="#2f8f3a" castShadow={false} />
              </group>
            ))
          )}
          {/* One long nose. It hangs past the chin, and it wags when they say "hmm". */}
          <group position={[0, 3 * u, 4 * u]} rotation={[0, 0, wag]}>
            <Block position={[0, -2 * u, 1 * u]} size={[2 * u, 4 * u, 2 * u]} color={shade(VILLAGER_SKIN, -0.1)} />
          </group>
          {hat === "straw" ? (
            <>
              <Block position={[0, 10.4 * u, 0]} size={[13 * u, 0.9 * u, 13 * u]} color="#d9b84a" />
              <Block position={[0, 11.6 * u, 0]} size={[7 * u, 1.8 * u, 7 * u]} color="#c9a53a" />
            </>
          ) : null}
        </group>
      </group>
    </group>
  );
};

/** Height of a villager's face above the feet, for a camera to look at. */
export const villagerFace = (p: Vec3, scale = ADULT): Vec3 => [p[0], p[1] + 29 * U * scale, p[2]];
export const villagerChest = (p: Vec3, scale = ADULT): Vec3 => [p[0], p[1] + 19 * U * scale, p[2]];

// ----------------------------------------------------------------------------- the iron golem

const IRON = "#d9d3c5";

/** A poppy. `position` is the bottom of the stem. */
export const Poppy: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.15, 0]} size={[0.04, 0.3, 0.04]} color="#3f8a35" />
    <Block position={[0.055, 0.13, 0]} size={[0.09, 0.035, 0.035]} color="#3f8a35" />
    <Block position={[0, 0.345, 0]} size={[0.17, 0.12, 0.17]} color="#e3261c" emissive="#e3261c" emissiveIntensity={0.25} />
    <Block position={[0, 0.41, 0]} size={[0.08, 0.03, 0.08]} color="#2a1410" />
  </group>
);

/**
 * The iron golem. Feet on `position`, facing +Z, 2.7 m tall at scale 1.
 * `armR` / `armL` are arm angles in radians: 0 hangs, -1.5 points straight ahead.
 * Leave them out and the arms swing with the walk.
 */
export const IronGolem: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  walk?: number;
  armR?: number;
  armL?: number;
  headPitch?: number;
  headYaw?: number;
  bow?: number;
  /** A poppy in the right hand (+X). */
  flower?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, walk = 0, armR, armL, headPitch = 0, headYaw = 0, bow = 0, flower = false }) => {
  const t = useFilmTime();
  const swing = Math.sin(walk * 2.4) * 0.4;
  const bob = Math.abs(Math.sin(walk * 2.4)) * 0.05 + Math.sin(t * 1.1) * 0.008;
  const angle = (s: number) => (s > 0 ? armR : armL) ?? -s * swing * 0.7;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.25, 1.0, 0]} rotation={[s * swing, 0, 0]}>
          <Vox kind="stone" tint={shade(IRON, -0.06)} position={[0, -0.5, 0]} size={[0.375, 1.0, 0.31]} />
        </group>
      ))}
      <group position={[0, 1.0 + bob, 0]} rotation={[bow * 0.6, 0, 0]}>
        <Vox kind="stone" tint={shade(IRON, -0.04)} position={[0, 0.16, 0]} size={[0.56, 0.32, 0.375]} />
        <Vox kind="stone" tint={IRON} position={[0, 0.69, 0]} size={[1.125, 0.75, 0.69]} />
        {/* Vines. It has stood here a long time. */}
        <Block position={[-0.34, 0.62, 0.35]} size={[0.13, 0.52, 0.02]} color="#4f8a3a" castShadow={false} />
        <Block position={[-0.22, 0.78, 0.35]} size={[0.13, 0.2, 0.02]} color="#5fa046" castShadow={false} />
        <Block position={[0.3, 0.42, 0.35]} size={[0.13, 0.18, 0.02]} color="#4f8a3a" castShadow={false} />
        <group position={[0, 1.06, 0.06]} rotation={[headPitch, headYaw, 0]}>
          <Vox kind="stone" tint={IRON} position={[0, 0.31, 0]} size={[0.5, 0.62, 0.5]} />
          <Block position={[0, 0.43, 0.253]} size={[0.44, 0.07, 0.02]} color="#8d877a" castShadow={false} />
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 0.13, 0.345, 0.254]} size={[0.11, 0.075, 0.02]} color="#8a1c16" emissive="#ff3a24" emissiveIntensity={0.55} castShadow={false} />
          ))}
          <Vox kind="stone" tint={shade(IRON, -0.08)} position={[0, 0.15, 0.31]} size={[0.125, 0.27, 0.125]} />
        </group>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.69, 1.0, 0]} rotation={[angle(s), 0, 0]}>
            <Vox kind="stone" tint={shade(IRON, -0.03)} position={[0, -0.94, 0]} size={[0.25, 1.875, 0.375]} />
            {s < 0 ? <Block position={[0.127, -0.5, 0]} size={[0.02, 0.5, 0.2]} color="#4f8a3a" castShadow={false} /> : null}
            {s > 0 && flower ? <Poppy position={[0, -1.86, 0.12]} rotation={[-angle(s), 0, 0]} scale={1.25} /> : null}
          </group>
        ))}
      </group>
    </group>
  );
};

/** Where the golem's right hand is, in the world, for an arm at `angle`. Put the thing it gives there. */
export const golemHand = (p: Vec3, rotY: number, angle: number, scale = 1, side = 1): Vec3 =>
  beside(p, rotY, side * 0.69 * scale, (2.0 - 1.875 * Math.cos(angle)) * scale, -1.875 * Math.sin(angle) * scale);

// ----------------------------------------------------------------------------- things

/**
 * A speech bubble. The villagers have one word, so it nearly always says HMM;
 * the first one that says anything else is the turn of the film.
 * It faces +Z: give it the camera's yaw as `rotationY`.
 */
export const Bubble: React.FC<{
  text: string;
  position: Vec3;
  rotationY?: number;
  scale?: number;
  dark?: boolean;
  tilt?: number;
  /** Which side the tail hangs on: -1 left, 1 right. */
  tail?: number;
}> = ({ text, position, rotationY = 0, scale = 1, dark = false, tilt = 0, tail = -1 }) => {
  if (scale <= 0.01) return null;
  const w = 0.24 + text.length * 0.23;
  const paper = dark ? "#2b2140" : "#ffffff";
  const edge = dark ? "#0c0912" : "#15151a";
  return (
    <group position={position} rotation={[0, rotationY, tilt]} scale={scale}>
      <Block size={[w + 0.09, 0.53, 0.03]} color={edge} castShadow={false} />
      <Block position={[0, 0, 0.012]} size={[w, 0.44, 0.03]} color={paper} emissive={paper} emissiveIntensity={dark ? 0.15 : 0.45} castShadow={false} />
      <Block position={[tail * w * 0.24, -0.3, 0]} size={[0.15, 0.15, 0.03]} color={edge} castShadow={false} />
      <Block position={[tail * w * 0.24, -0.27, 0.012]} size={[0.09, 0.13, 0.03]} color={paper} emissive={paper} emissiveIntensity={dark ? 0.15 : 0.45} castShadow={false} />
      <PixelText text={text} position={[0, 0, 0.03]} height={0.34} maxWidth={w - 0.1} color={dark ? "#eadcff" : "#16161c"} />
    </group>
  );
};

/** The torch he stands on the floor to dig by. It is the warm light in every night shot in his room. */
export const NightLight: React.FC = () => <Torch position={room(-2.2, 0, -0.55)} light={7} seed={11} />;

/** The hero's bed: a Minecraft bed, red blanket and all. `position` is the middle of it, on the floor. The pillow is at -Z. */
export const BedBox: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.2, 0]} size={[1.2, 0.4, 2.3]} />
    <Vox kind="darkPlanks" position={[0, 0.55, -1.1]} size={[1.2, 0.9, 0.1]} />
    <Vox kind="wool" tint="#c8362e" position={[0, 0.47, 0.3]} size={[1.14, 0.16, 1.6]} />
    <Vox kind="wool" tint="#f4f1ea" position={[0, 0.47, -0.78]} size={[1.14, 0.16, 0.56]} />
    <Vox kind="wool" tint="#ffffff" position={[0, 0.58, -0.78]} size={[0.8, 0.1, 0.4]} />
  </group>
);

/** A hole in a floor: black, with a broken edge. `position` is its middle, at floor level. */
export const Hole: React.FC<{ position: Vec3; size?: number; rim?: string }> = ({ position, size = 1, rim = "#7a5536" }) => (
  <group position={position}>
    <Block position={[0, 0.012, 0]} size={[size, 0.02, size]} color="#07050a" castShadow={false} receiveShadow={false} />
    {(
      [
        [-0.5, -0.32, 0.22, 0.3],
        [-0.5, 0.3, 0.16, 0.34],
        [0.5, -0.1, 0.2, 0.42],
        [0.1, -0.5, 0.4, 0.18],
        [-0.2, 0.5, 0.36, 0.2],
        [0.42, 0.44, 0.24, 0.22],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, w, d], i) => (
      <Block key={i} position={[x * size, 0.03 + (i % 2) * 0.02, z * size]} size={[w * size, 0.07, d * size]} color={shade(rim, (i % 3) * 0.05 - 0.05)} />
    ))}
  </group>
);

/** Bits of a block that has just been broken: they fly out from `position` and fall. `t` is seconds since the hit. */
export const Bits: React.FC<{ position: Vec3; t: number; color?: string; count?: number; seed?: number; power?: number; toward?: Vec3 }> = ({
  position,
  t,
  color = "#7a5536",
  count = 9,
  seed = 1,
  power = 1,
  toward = [0, 0, 0],
}) => {
  if (t <= 0 || t > 0.9) return null;
  const rand = mulberry32(seed * 733 + 5);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const vx = (rand() * 2 - 1) * 1.6 * power + toward[0];
        const vy = (1.2 + rand() * 1.8) * power + toward[1];
        const vz = (rand() * 2 - 1) * 1.6 * power + toward[2];
        const s = 0.05 + rand() * 0.07;
        return (
          <mesh key={i} position={[vx * t, vy * t - 4.6 * t * t, vz * t]} rotation={[t * 9 + i, t * 7, i]}>
            <boxGeometry args={[s, s, s]} />
            <meshStandardMaterial color={shade(color, (rand() * 2 - 1) * 0.12)} roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
};

/** One soft puff of smoke: a sprite, so it always faces the lens and never shows an edge. */
const Puff: React.FC<{ position: Vec3; size: number; color: string; opacity: number }> = ({ position, size, color, opacity }) =>
  opacity <= 0.004 ? null : (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial map={glowTex()} color={color} transparent opacity={opacity} depthWrite={false} fog={false} />
    </sprite>
  );

/** A column of smoke that rises from `position`, swells and thins. `lean` blows it along X as it climbs. */
export const Smoke: React.FC<{
  position: Vec3;
  rise?: number;
  spread?: number;
  size?: number;
  count?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  lean?: number;
  seed?: number;
}> = ({ position, rise = 14, spread = 1.6, size = 5, count = 12, color = "#3d332e", opacity = 0.75, speed = 0.1, lean = 0, seed = 1 }) => {
  const t = useFilmTime();
  const rand = mulberry32(seed * 271 + 9);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const jx = rand() * 2 - 1;
        const jz = rand() * 2 - 1;
        const k = (t * speed * (0.8 + rand() * 0.4) + i / count) % 1;
        return (
          <Puff
            key={i}
            position={[jx * spread * (0.3 + k) + lean * k * rise, k * rise, jz * spread * (0.3 + k)]}
            size={size * (0.55 + k * 1.3)}
            color={shade(color, (rand() * 2 - 1) * 0.06)}
            opacity={opacity * (1 - k) * clamp01(k * 5)}
          />
        );
      })}
    </group>
  );
};

/**
 * A bank of smoke between the hill and the other valley. `amount` 1 hides everything
 * behind it; 0 is clear air. `part` slides the two halves north and south, like a curtain.
 */
export const SmokeBank: React.FC<{ x?: number; amount: number; part?: number; color?: string; t?: number }> = ({
  x = 73,
  amount,
  part = 0,
  color = "#6a5a51",
  t = 0,
}) => {
  if (amount <= 0.01) return null;
  const rand = mulberry32(91);
  const a = clamp01(amount);
  return (
    <group>
      {Array.from({ length: 40 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const z = side * (0.6 + rand() * 22) + side * part * 26;
        const y = -1 + rand() * 15;
        const size = 13 + rand() * 9;
        const drift = Math.sin(t * 0.5 + i * 1.3) * 0.8;
        return <Puff key={i} position={[x + (i % 5) * 0.8, y + drift * 0.4, z + drift]} size={size} color={shade(color, (rand() * 2 - 1) * 0.07)} opacity={a * 0.95} />;
      })}
      {/* Soft puffs have soft middles too. One flat sheet behind them makes sure nothing shows through before it should. */}
      <mesh position={[x + 5, 6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[150, 60]} />
        <meshBasicMaterial color={color} transparent opacity={clamp01(a * 1.6 - part * 1.2)} depthWrite={false} fog={false} />
      </mesh>
    </group>
  );
};

/** Smoke drifting past a face: soft puffs that cross from one side to the other. `dir` is the way they travel. */
export const Wisps: React.FC<{ position: Vec3; t: number; count?: number; reach?: number; color?: string; size?: number; opacity?: number; dir?: Vec3; seed?: number }> = ({
  position,
  t,
  count = 10,
  reach = 2.4,
  color = "#8d8580",
  size = 0.6,
  opacity = 0.5,
  dir = [-1, 0.18, 0],
  seed = 4,
}) => {
  const rand = mulberry32(seed * 311 + 17);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const k = (t * (0.3 + rand() * 0.28) + rand()) % 1;
        const oy = (rand() * 2 - 1) * 0.7;
        const oz = (rand() * 2 - 1) * 0.9;
        const s = size * (0.6 + rand() * 0.9) * (0.7 + k * 0.8);
        return (
          <Puff
            key={i}
            position={[dir[0] * (k - 0.5) * reach + (1 - Math.abs(dir[0])) * oz, oy + dir[1] * k * reach, dir[2] * (k - 0.5) * reach + (1 - Math.abs(dir[2])) * oz]}
            size={s}
            color={color}
            opacity={opacity * Math.sin(k * Math.PI)}
          />
        );
      })}
    </group>
  );
};

/** A roof on fire: big cubes of flame that rise, shrink and go from yellow to red. `position` is the bottom of it. */
export const Blaze: React.FC<{ position: Vec3; size?: number; height?: number; count?: number; seed?: number }> = ({
  position,
  size = 1.2,
  height = 4.5,
  count = 18,
  seed = 1,
}) => {
  const t = useFilmTime();
  const rand = mulberry32(seed * 517 + 11);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const jx = rand() * 2 - 1;
        const jz = rand() * 2 - 1;
        const k = (t * (0.75 + rand() * 0.6) + rand()) % 1;
        const s = size * (1.12 - k) * (0.45 + rand() * 0.6);
        const color = k < 0.28 ? "#fff0a0" : k < 0.6 ? "#ffab2e" : "#ff5a1e";
        return (
          <mesh key={i} position={[jx * size * (1.1 - k * 0.7), k * height, jz * size * 0.7 * (1.1 - k * 0.7)]} rotation={[k * 4 + i, k * 3, i]}>
            <boxGeometry args={[s, s, s]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={clamp01((1 - k) * 1.8)} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
};

/** Warm light from a fire that is out of frame: a glow and a flickering point light. */
export const FireLight: React.FC<{ position: Vec3; power?: number; reach?: number; seed?: number }> = ({ position, power = 1, reach = 14, seed = 1 }) => {
  const t = useFilmTime();
  const flicker = 0.82 + 0.18 * Math.sin(t * 11 + seed) * Math.sin(t * 5.3 + seed * 2);
  return (
    <>
      <pointLight position={position} color="#ff8a3a" intensity={power * flicker} distance={reach} decay={2} />
      <Glow position={position} size={2.2} color="#ff7a2a" opacity={0.25} />
    </>
  );
};

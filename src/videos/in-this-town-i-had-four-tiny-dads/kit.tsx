import type React from "react";
import { Block, MinecraftAvatar, Vox, blendPose, clamp01, gaitPose, getPose } from "../../engine";
import type { FaceName, MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import {
  ADULT,
  Bits,
  Bubble,
  CHILD,
  DEG,
  EAST,
  Fish,
  GROUND_SIT,
  IronGolem,
  KID,
  Lantern,
  Mood,
  MonsterProps,
  NORTH,
  PixelHeart,
  Puffs,
  ROBE,
  SOUTH,
  SchoolDesk,
  Slime,
  SoundRings,
  StrawHat,
  SubscribeSign,
  Villager,
  WEST,
  Wisps,
  ahead,
  beside,
  chestOf,
  ease,
  faceOf,
  golemHand,
  groundSitPose,
  jolt,
  monsterFace,
  openArmsPose,
  pop,
  ramp,
  villagerChest,
  villagerFace,
  wordClock,
} from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  ADULT,
  Bits,
  Bubble,
  CHILD,
  DEG,
  EAST,
  Fish,
  GROUND_SIT,
  IronGolem,
  KID,
  Lantern,
  NORTH,
  PixelHeart,
  Puffs,
  ROBE,
  SOUTH,
  SchoolDesk,
  Slime,
  SoundRings,
  StrawHat,
  SubscribeSign,
  Villager,
  WEST,
  Wisps,
  ahead,
  beside,
  chestOf,
  ease,
  faceOf,
  golemHand,
  groundSitPose,
  jolt,
  monsterFace,
  openArmsPose,
  pop,
  ramp,
  villagerChest,
  villagerFace,
  blendPose,
  gaitPose,
  getPose,
};
export type { Mood, MonsterProps, Pose, Vec3 };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into a shot at which `word` is spoken in `cue`. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({
  ...getPose(clip, t),
  ...patch,
});

/**
 * Exact top surface Y of `BridgeZone` (`world.tsx`) at any Z coordinate:
 *   - `|z| <= 4.38` : flat wooden bridge deck (`BRIDGE_Y = 1.15`)
 *   - `4.38 < |z| < 7.52` : sloped cobble approach ramp (`position=[0, 0.48, ∓5.9], rot=[∓0.312,0,0], size=[4.4, 0.34, 3.35]`)
 *   - `|z| >= 7.52` : north/south swamp bank path (`top = 0.15`)
 * Accounts for `footHalfDepth` so the uphill toe of a character's shoe/foot never clips the sloped cobble plane!
 */
function bridgePlaneAtAbsZ(az: number): number {
  if (az <= 4.38) return 1.15;
  if (az >= 7.52) return 0.15;
  return Math.min(1.15, Math.max(0.15, 0.6418 + 0.3226 * (5.9522 - az)));
}

export function bridgeSurfaceY(z: number, footHalfDepth = 0.18): number {
  const az = Math.abs(z);
  const azUphill = Math.max(0, az - footHalfDepth);
  return Math.max(bridgePlaneAtAbsZ(az), bridgePlaneAtAbsZ(azUphill));
}

/** Exact top Y of `<SeesawPlank position={[x, baseY, centerZ]} tilt={tilt} />` at world `z`. */
export function seesawSurfaceY(baseY: number, centerZ: number, tilt: number, z: number, footHalfDepth = 0.18): number {
  const dz = z - centerZ;
  const yCenter = baseY + 0.34 + 0.04 * Math.cos(tilt) - dz * Math.sin(tilt);
  const yToe = yCenter + Math.abs(Math.sin(tilt)) * footHalfDepth;
  return yToe + 0.01;
}

/** Exact top Y of `<SlimeBlockProp position={[x, baseY, z]} scale={scale} squash={squash} />`. */
export function slimeBlockTopY(baseY: number, scale = 1, squash = 0): number {
  return baseY + 1.025 * Math.max(0.28, scale * (1 - squash * 0.42));
}

/** Exact top Y of the Slime Block mounted inside `<Wheelbarrow position={[x, baseY, z]} withSlimeBlock slimeScale={scale} slimeSquash={squash} />`. */
export function cartSlimeTopY(baseY: number, scale = 0.88, squash = 0): number {
  return baseY + 0.42 + 1.025 * Math.max(0.28, scale * (1 - squash * 0.42));
}

/** Exact scene-clock impact burst for `Shot.impacts` (Camera evaluates impacts against scene time). */
export function sceneImpact(firstCueId: string, cueId: string, word?: string, amp = 0.045, dur = 0.34) {
  const first = timing.cues.find((c) => c.id === firstCueId);
  const cue = timing.cues.find((c) => c.id === cueId);
  if (!first || !cue) throw new Error(`sceneImpact: missing cue ${firstCueId} or ${cueId}`);
  const offset = word ? wordAt(cueId, word) : 0;
  return { at: Math.max(0, cue.start - first.start + offset), amp, dur };
}

/**
 * Authentic Minecraft slime hop cycle:
 *   0.00–0.20 : crouch anticipation (`squash > 0`)
 *   0.20–0.76 : crisp parabolic jump (`hop > 0`) with mid-air stretch (`squash < 0`) + forward lean
 *   0.76–1.00 : juicy pancake landing (`squash > 0`) settling back to rest
 */
export function slimeBounce(t: number, rate = 1.65, height = 0.28, phase = 0): { hop: number; squash: number; lean: number } {
  const cyc = (((t * rate + phase) % 1) + 1) % 1;
  if (cyc < 0.2) {
    const k = cyc / 0.2;
    return { hop: 0, squash: Math.sin(k * Math.PI * 0.5) * 0.26, lean: 0.06 * k };
  }
  if (cyc < 0.76) {
    const u = (cyc - 0.2) / 0.56;
    const arc = 4 * u * (1 - u);
    return {
      hop: arc * height,
      squash: -0.22 * arc + 0.14 * (1 - arc),
      lean: (0.5 - u) * 0.22,
    };
  }
  const s = (cyc - 0.76) / 0.24;
  const settle = Math.sin(s * Math.PI) * (1 - s * 0.45);
  return { hop: 0, squash: settle * 0.34, lean: -0.05 * settle };
}

/** Discrete multi-hop locomotion from `from` to `to` so moving slimes HOP across the ground instead of ice-skating! */
export function slimeHopTo(
  from: Vec3,
  to: Vec3,
  p: number,
  hops = 3,
  height = 0.24,
  phase = 0,
): { position: Vec3; hop: number; squash: number; lean: number } {
  const cp = clamp01(p);
  const f = cp * hops;
  const idx = Math.min(hops - 1, Math.floor(f));
  const sub = clamp01(f - idx);
  // Hold briefly on ground for crouch, then travel during airborne window (0.18..0.82)
  const air = clamp01((sub - 0.16) / 0.66);
  const segStart = idx / hops;
  const segEnd = (idx + 1) / hops;
  const travel = segStart + (segEnd - segStart) * ease(air);
  const b = slimeBounce(sub + phase * 0.01, 1, height, 0);
  return {
    position: [
      from[0] + (to[0] - from[0]) * travel,
      from[1] + (to[1] - from[1]) * travel,
      from[2] + (to[2] - from[2]) * travel,
    ],
    hop: b.hop,
    squash: b.squash,
    lean: b.lean,
  };
}

/** Running gait with both arms cradling tiny dads against the chest (`6.scoop`). */
export const carryDadsPose = (dist: number): Pose => ({
  ...gaitPose("run", dist),
  armR: [-1.18, -0.34, -0.14],
  armL: [-1.18, 0.34, 0.14],
});

/** Running gait hoisting the glowing Slime Block triumphantly overhead (`4.boast`). */
export const carryBlockPose = (dist: number): Pose => ({
  ...gaitPose("run", dist),
  armR: [-2.75, 0.12, 0.1],
  armL: [-2.75, -0.12, -0.1],
});

export const TEEN = 0.84;

/** Wind-up -> two-handed shove -> recoil (`4.sunset`, `6.pin`). */
export const shovePose = (t: number, hitAt: number): Pose => {
  const wind = tw(t, Math.max(0, hitAt - 0.32), hitAt);
  const push = tw(t, hitAt, hitAt + 0.22);
  const settle = tw(t, hitAt + 0.22, hitAt + 0.65);
  const armX = -0.55 - wind * 0.45 - push * 0.75 + settle * 0.55;
  return {
    ...getPose("idle", t),
    bodyPitch: -0.14 * wind + 0.26 * push - 0.12 * settle,
    bodyY: -0.05 * wind - 0.04 * push + 0.04 * settle,
    armR: [armX, -0.18, 0.08],
    armL: [armX, 0.18, -0.08],
    legR: [0.28 * push, 0, 0],
    legL: [-0.32 * push, 0, 0],
  };
};

/** Mid-air joy pose for bouncing off the Slime Block (`6.boing`, `7.roof`). */
export const skyJoyPose = (t: number): Pose => ({
  ...getPose("jump", t),
  bodyPitch: -0.1 + Math.sin(t * 5) * 0.06,
  armR: [-2.65 + Math.sin(t * 8) * 0.18, 0, 0.28],
  armL: [-2.65 + Math.cos(t * 8) * 0.18, 0, -0.28],
  legR: [0.42, 0, 0.1],
  legL: [-0.35, 0, -0.1],
  kneeR: [0.45, 0, 0],
  kneeL: [0.45, 0, 0],
});

/** Energetic ankle-snag trip -> head-over-heels ledge tumble (`6.rope`). */
export const tripOverLedgePose = (t: number, trip: number, tumble: number): Pose => {
  const wSpin = Math.sin(t * 16) * (0.35 + 0.55 * trip);
  return {
    ...getPose("idle", t),
    bodyPitch: 0.42 * trip * (1 - tumble * 0.5),
    bodyRoll: -0.25 * trip + Math.cos(t * 14) * 0.22 * tumble,
    bodyY: -0.05 * trip,
    torso: [0.22 * trip, Math.sin(t * 15) * 0.2 * trip, 0],
    head: [-0.45 * trip + 0.25 * tumble, Math.sin(t * 12) * 0.24, 0],
    // Beat 1 (`trip` high, `tumble` low): desperate reach back for the crumbling cliff lip; Beat 2 (`tumble` high): full panicked flail!
    armR: [-2.35 * trip + wSpin * 1.15, -0.34, 0.58 * trip],
    armL: [-2.25 * trip - wSpin * 1.15, 0.34, -0.58 * trip],
    legR: [-1.35 * trip + Math.sin(t * 18) * 0.65 * tumble, 0, 0.16 * trip],
    kneeR: [1.05 * trip, 0, 0],
    legL: [0.85 * trip - Math.sin(t * 18) * 0.65 * tumble, 0, -0.14 * trip],
    kneeL: [0.62 * trip, 0, 0],
  };
};

/** Frantic high-velocity freefall flailing limbs & kicking legs (`6.three`, `6.block`). */
export const windmillFallPose = (t: number): Pose => {
  const s = Math.sin(t * 21);
  const c = Math.cos(t * 21);
  return {
    ...getPose("fall", t),
    bodyPitch: 0.18 + Math.sin(t * 9) * 0.14,
    bodyRoll: Math.cos(t * 10) * 0.18,
    head: [-0.38, Math.sin(t * 12) * 0.24, 0],
    armR: [-2.15 + s * 0.92, -0.28, 0.56 + c * 0.24],
    armL: [-2.15 - s * 0.92, 0.28, -0.56 - c * 0.24],
    legR: [s * 0.85, 0, 0.16],
    legL: [-s * 0.85, 0, -0.16],
    kneeR: [0.46 + Math.max(0, -s) * 0.58, 0, 0],
    kneeL: [0.46 + Math.max(0, s) * 0.58, 0, 0],
  };
};

const STORY_FACE_MAP: Partial<Record<FaceName, FaceName>> = {
  laugh: "grin",
  sad: "frown",
  worried: "uneasy",
  scared: "fear",
};

// ----------------------------------------------------------------------------- Cast
// NOTE: In Topics/InThisTown/monsters.tsx, Slime `size` is its width in METRES:
//   - TinyDad        : 0.38 m (knee-high beside a 1.28 m kid)
//   - BigSlimeDad    : 0.88 m (medium slime after 1st split)
//   - GrandpaSlime   : 0.98 m (elder slime)
//   - OriginalBigDad : 1.42 m (big slime dad — taller than a kid, fits cleanly in 9:16)

export const TINY_M = 0.38;
export const MED_M = 0.78;
export const BIG_M = 1.42;

/** Human kid hero: warm amber-orange hoodie + child story-face palette (`SHOTS.md` §7). */
export const Hero: React.FC<MinecraftAvatarProps> = ({ scale = KID, face = "smile", ...props }) => (
  <MinecraftAvatar
    scale={scale}
    skin="#f1c29b"
    hair="#4a2e1b"
    outfit="hoodie"
    colors={{ torso: "#f07c2e", arms: "#f07c2e", legs: "#314c6e" }}
    shoes="#f4f2ec"
    face={STORY_FACE_MAP[face] ?? face}
    blink
    {...props}
  />
);

/** Baby hero in reed-basket flashbacks. */
export const BabyHero: React.FC<{ position?: Vec3; rotationY?: number; reach?: number; cry?: boolean }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  reach = 0,
  cry = false,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="wool" tint="#e8833a" position={[0, 0.14, 0]} size={[0.32, 0.22, 0.34]} />
    <Vox kind="wool" tint="#3b78bd" position={[0, 0.15, 0.03]} size={[0.34, 0.1, 0.22]} />
    <MinecraftAvatar
      position={[0, 0.02, 0.02]}
      scale={0.4}
      skin="#f1c29b"
      hair="#4a2e1b"
      outfit="gown"
      colors={{ torso: "#3b78bd", arms: "#3b78bd", legs: "#e8833a" }}
      face={cry ? "crying" : "smile"}
      pose={{
        ...getPose("sit", 0),
        armR: [-0.85 - reach * 0.65, 0, 0.2],
        armL: [-0.8 - reach * 0.65, 0, -0.2],
      }}
    />
  </group>
);

export type DadId = 1 | 2 | 3 | 4;

const DAD_COLORS: Record<DadId, { color: string; phase: number }> = {
  1: { color: "#6fd84a", phase: 0.2 },
  2: { color: "#62cc40", phase: 1.4 },
  3: { color: "#78df52", phase: 2.6 },
  4: { color: "#5bc43c", phase: 3.7 },
};

/**
 * One of our 4 distinct knee-high tiny slime dads (`0.38 m` cube):
 *   #1 miniature straw hat · #2 dark spectacles · #3 crooked blue necktie · #4 red-and-gold cap
 */
export const TinyDad: React.FC<
  Omit<MonsterProps, "hat" | "scarf"> & {
    which: DadId;
    squash?: number;
    hop?: number;
  }
> = ({ which, position = [0, 0, 0], rotationY = 0, scale = 1, squash = 0, hop = 0, mood = "happy", ...rest }) => {
  const st = DAD_COLORS[which];
  const sy = 1 - squash * 0.32;
  const sx = 1 + squash * 0.2;
  const topY = TINY_M * sy;
  const frontZ = TINY_M * 0.505 * sx;
  return (
    <group position={[position[0], position[1] + Math.max(0, hop), position[2]]} rotation={[0, rotationY, 0]} scale={scale}>
      <Slime size={TINY_M} color={st.color} phase={st.phase} squash={squash} mood={mood} {...rest} />
      {which === 1 ? (
        <group position={[0, topY, 0]}>
          <Block position={[0, 0.015, 0]} size={[0.44, 0.03, 0.44]} color="#e5c158" />
          <Block position={[0, 0.055, 0]} size={[0.26, 0.07, 0.26]} color="#d8b248" />
          <Block position={[0, 0.032, 0]} size={[0.27, 0.022, 0.27]} color="#c93b2b" />
        </group>
      ) : null}
      {which === 2 ? (
        <group position={[0, topY * 0.62, frontZ]}>
          <Block position={[-0.08, 0, 0]} size={[0.085, 0.06, 0.02]} color="#1f1916" />
          <Block position={[0.08, 0, 0]} size={[0.085, 0.06, 0.02]} color="#1f1916" />
          <Block position={[0, 0.01, 0]} size={[0.07, 0.018, 0.02]} color="#1f1916" />
        </group>
      ) : null}
      {which === 3 ? (
        <group position={[0.015, topY * 0.28, frontZ]} rotation={[0, 0, 0.18]}>
          <Block position={[0, 0.048, 0]} size={[0.075, 0.036, 0.022]} color="#1d4ed8" />
          <Block position={[0, -0.018, 0]} size={[0.055, 0.11, 0.02]} color="#2563eb" />
        </group>
      ) : null}
      {which === 4 ? (
        <group position={[0, topY, 0]}>
          <Block position={[0, 0.032, 0]} size={[0.24, 0.06, 0.24]} color="#e04838" />
          <Block position={[0, 0.015, 0.12]} size={[0.22, 0.022, 0.1]} color="#f2c138" />
        </group>
      ) : null}
    </group>
  );
};

/** All 4 tiny dads stacked into a wobbling ~1.5 m totem (`assemble` 0→1 hops #2, #3, #4 up onto #1!). */
export const DadStack: React.FC<{
  position?: Vec3;
  rotationY?: number;
  sway?: number;
  squash?: number;
  mood?: Mood;
  topLean?: number;
  assemble?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, sway = 0, squash = 0, mood = "happy", topLean = 0, assemble = 1 }) => {
  const k2 = ease(clamp01(assemble / 0.36));
  const k3 = ease(clamp01((assemble - 0.28) / 0.36));
  const k4 = ease(clamp01((assemble - 0.56) / 0.44));
  const landBump =
    (k2 > 0.85 && k2 < 1 ? 0.16 : 0) +
    (k3 > 0.85 && k3 < 1 ? 0.18 : 0) +
    (k4 > 0.85 && k4 < 1 ? 0.2 : 0);
  const sq = squash + landBump;
  const step = 0.37 * (1 - sq * 0.18);
  const arc2 = Math.sin(k2 * Math.PI) * 0.28;
  const arc3 = Math.sin(k3 * Math.PI) * 0.34;
  const arc4 = Math.sin(k4 * Math.PI) * 0.4;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <TinyDad which={1} position={[0, 0, 0]} squash={sq * 1.15} mood={mood} />
      <TinyDad
        which={2}
        position={[(1 - k2) * -0.46 + sway * 0.05 * k2, step * k2 + arc2, (1 - k2) * 0.12]}
        squash={sq + (k2 > 0 && k2 < 0.9 ? -0.14 : 0)}
        mood={mood}
      />
      <TinyDad
        which={3}
        position={[(1 - k3) * 0.48 + sway * 0.1 * k3, step * 2 * k3 + arc3, 0.01 + (1 - k3) * 0.14]}
        squash={sq * 0.9 + (k3 > 0 && k3 < 0.9 ? -0.14 : 0)}
        mood={mood}
      />
      <TinyDad
        which={4}
        position={[(1 - k4) * -0.58 + sway * 0.15 * k4, step * 3 * k4 + arc4, (0.03 + topLean * 0.1) * k4 + (1 - k4) * -0.12]}
        squash={sq * 0.85 + (k4 > 0 && k4 < 0.9 ? -0.16 : 0)}
        mood={mood}
        nod={topLean * 0.35 * k4}
      />
    </group>
  );
};

/**
 * Fused/Medium Big Slime Dad (`0.88 m` cube) wearing Dad #3's crooked blue necktie on his front chest!
 * Supports `scale`, `nod`, and `cracked` for the bridge battle (`6.fuse`..`6.split`).
 */
export const BigSlimeDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  which?: 1 | 2;
  scale?: number;
  squash?: number;
  nod?: number;
  cracked?: number;
  mood?: Mood;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  which = 1,
  scale = 1,
  squash = 0,
  nod = 0,
  cracked = 0,
  mood = "scared",
}) => {
  const s = 0.88;
  const sy = 1 - squash * 0.32;
  const sx = 1 + squash * 0.2;
  const fz = s * 0.508 * sx;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Slime
        size={s}
        color={which === 1 ? "#69d446" : "#5cc63d"}
        squash={squash}
        nod={nod}
        mood={mood}
      />
      {/* Dad #3's crooked blue necktie right on Big Dad's chest */}
      <group position={[0.03, s * 0.28 * sy, fz]} rotation={[0, 0, 0.18]}>
        <Block position={[0, 0.09, 0]} size={[0.14, 0.065, 0.025]} color="#1d4ed8" />
        <Block position={[0, -0.035, 0]} size={[0.1, 0.21, 0.022]} color="#2563eb" />
      </group>
      {cracked > 0.05 ? (
        <group position={[0, s * 0.55 * sy, fz + 0.004]}>
          <Block position={[-0.12, 0.08, 0]} rotation={[0, 0, 0.42]} size={[0.28 * cracked, 0.035, 0.02]} color="#d9ffd0" />
          <Block position={[0.1, -0.06, 0]} rotation={[0, 0, -0.5]} size={[0.26 * cracked, 0.035, 0.02]} color="#d9ffd0" />
        </group>
      ) : null}
    </group>
  );
};

/**
 * Fake Big Slime "Jelly Suit" built out of slimeballs (`4.tie`, `4.melt`):
 * wobbles with Dad #3's crooked blue tie on its chest, then slumps sideways into a puddle!
 */
export const JellySuitDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  melt?: number;
  wobble?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, melt = 0, wobble = 0 }) => {
  const s = 1.18;
  const slumpY = Math.max(0.18, 1 - melt * 0.78);
  const spreadX = 1 + melt * 0.85;
  const tiltZ = melt * 0.38 + Math.sin(wobble * 6) * 0.05 * (1 - melt);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <group scale={[spreadX, slumpY, spreadX]} rotation={[0, 0, -tiltZ]}>
        <Slime size={s} color="#74e44e" squash={melt * 0.3} mood={melt > 0.35 ? "scared" : "happy"} />
        <group position={[0.04, s * 0.3, s * 0.515]} rotation={[0, 0, 0.24 + melt * 0.5]}>
          <Block position={[0, 0.11, 0]} size={[0.16, 0.075, 0.026]} color="#1d4ed8" />
          <Block position={[0, -0.04, 0]} size={[0.11, 0.24, 0.024]} color="#2563eb" />
        </group>
      </group>
    </group>
  );
};

/** Original big two-block slime dad (`1.42 m` cube) before he ever split! */
export const OriginalBigDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  squash?: number;
  mood?: Mood;
  nod?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, squash = 0, mood = "happy", nod = 0 }) => {
  const sy = 1 - squash * 0.32;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Slime size={BIG_M} color="#66d244" scarf="#2f74d0" squash={squash} mood={mood} nod={nod} />
      {/* Proportional straw hat on top so it never umbrellas over the camera */}
      <group position={[0, BIG_M * sy, 0]}>
        <Block position={[0, 0.04, 0]} size={[1.15, 0.07, 1.15]} color="#e5c158" />
        <Block position={[0, 0.15, 0]} size={[0.74, 0.18, 0.74]} color="#d8b248" />
        <Block position={[0, 0.085, 0]} size={[0.76, 0.05, 0.76]} color="#2563eb" />
      </group>
    </group>
  );
};

/** Neighbour kids' big two-block slime dads (`1.36 m` cube). */
export const NeighborBigDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  variant?: 0 | 1 | 2;
  squash?: number;
  mood?: Mood;
}> = ({ position = [0, 0, 0], rotationY = 0, variant = 0, squash = 0, mood = "happy" }) => {
  const colors = ["#54c238", "#6bd94b", "#49b030"];
  const scarves = ["#8b4c2a", "#a33c3c", "#4d648d"];
  return (
    <Slime
      position={position}
      rotationY={rotationY}
      size={1.36}
      color={colors[variant]}
      scarf={scarves[variant]}
      squash={squash}
      mood={mood}
    />
  );
};

/** Wise elderly Grandpa Slime (`0.98 m` cube) with crisp white brows & moustache on the front face (`2.splits`, `2.ball`). */
export const GrandpaSlime: React.FC<{
  position?: Vec3;
  rotationY?: number;
  squash?: number;
  mood?: Mood;
  nod?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, squash = 0, mood = "calm", nod = 0 }) => {
  const s = 0.98;
  const sy = 1 - squash * 0.32;
  const sx = 1 + squash * 0.2;
  const fz = s * 0.51 * sx;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Slime size={s} color="#58b942" scarf="#7a5a38" squash={squash} mood={mood} nod={nod} />
      <Block position={[-0.2, s * 0.72 * sy, fz]} size={[0.2, 0.065, 0.03]} color="#f4f3ed" />
      <Block position={[0.2, s * 0.72 * sy, fz]} size={[0.2, 0.065, 0.03]} color="#f4f3ed" />
      <Block position={[0, s * 0.33 * sy, fz]} size={[0.42, 0.085, 0.035]} color="#f4f3ed" />
    </group>
  );
};

/** Damaged, vine-choked rogue Iron Golem lurking at the swamp bridge (`4.vine`..`6.sink`). */
export const RogueGolem: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  walk?: number;
  armR?: number;
  armL?: number;
  headPitch?: number;
  headYaw?: number;
  bow?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1.0, ...rest }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <IronGolem {...rest} />
    <Block position={[0.24, 1.72, 0.36]} size={[0.34, 0.08, 0.03]} color="#2b2623" />
    <Block position={[-0.42, 1.48, 0.36]} size={[0.18, 0.44, 0.04]} color="#2f6127" />
    <Block position={[0.46, 1.32, 0.36]} size={[0.16, 0.52, 0.04]} color="#295422" />
  </group>
);

// ----------------------------------------------------------------------------- Custom Story Props

/** 3-Wheel Wooden Minecraft Slime Cart / Wheelbarrow with 1 front wheel + 2 rear axle wheels so tiny slimes can roll it smoothly! */
export const Wheelbarrow: React.FC<{
  position?: Vec3;
  rotationY?: number;
  tilt?: number;
  rollZ?: number;
  wheelSpin?: number;
  withDads?: boolean;
  dadBounce?: number;
  dadMood?: Mood;
  covered?: boolean;
  sheetFly?: number;
  withSlimeBlock?: boolean;
  slimeScale?: number;
  slimeSquash?: number;
  slimeGlow?: number;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  tilt = 0,
  rollZ = 0,
  wheelSpin = 0,
  withDads = false,
  dadBounce = 0,
  dadMood = "happy",
  covered = false,
  sheetFly = 0,
  withSlimeBlock = false,
  slimeScale = 0.62,
  slimeSquash = 0,
  slimeGlow = 0.75,
}) => {
  const sheetBaseY = Math.max(0.78, 0.42 + slimeScale * 1.05 + 0.08);
  const sheetW = Math.max(0.88, slimeScale * 1.12);
  const sheetD = Math.max(1.02, slimeScale * 1.18);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <group rotation={[tilt, 0, rollZ]}>
        {/* Front Lead Wheel (`z = +0.58`) */}
        <group position={[0, 0.21, 0.58]} rotation={[wheelSpin, 0, 0]}>
          <Vox kind="darkPlanks" size={[0.13, 0.42, 0.42]} />
          <Block size={[0.16, 0.13, 0.13]} color="#6e7075" />
        </group>
        {/* Twin Rear Cart Wheels + Iron Axle (`z = -0.34`) */}
        <Block position={[0, 0.2, -0.34]} size={[0.88, 0.06, 0.06]} color="#595d63" />
        {[-0.42, 0.42].map((wx) => (
          <group key={`rw${wx}`} position={[wx, 0.2, -0.34]} rotation={[wheelSpin, 0, 0]}>
            <Vox kind="darkPlanks" size={[0.11, 0.4, 0.4]} />
            <Block size={[0.14, 0.12, 0.12]} color="#6e7075" />
          </group>
        ))}
        {[-0.28, 0.28].map((x) => (
          <Vox key={x} kind="log" position={[x, 0.34, -0.1]} rotation={[0.06, 0, 0]} size={[0.08, 0.08, 1.4]} />
        ))}
        <Vox kind="planks" position={[0, 0.38, 0.08]} size={[0.78, 0.07, 0.94]} />
        <Vox kind="planks" position={[-0.37, 0.5, 0.08]} size={[0.07, 0.2, 0.94]} />
        <Vox kind="planks" position={[0.37, 0.5, 0.08]} size={[0.07, 0.2, 0.94]} />
        <Vox kind="planks" position={[0, 0.51, 0.51]} rotation={[-0.2, 0, 0]} size={[0.78, 0.22, 0.07]} />
        <Vox kind="planks" position={[0, 0.5, -0.35]} size={[0.78, 0.2, 0.07]} />
        <Block position={[0.04, 0.42, 0.1]} size={[0.56, 0.016, 0.66]} color="#62cf40" />

        {withSlimeBlock ? (
          <SlimeBlockProp position={[0, 0.42, 0.08]} scale={slimeScale} squash={slimeSquash} glow={slimeGlow} />
        ) : null}

        {covered ? (
          <group
            position={[-sheetFly * 1.95, sheetBaseY + sheetFly * 1.65, 0.08 + sheetFly * 0.65]}
            rotation={[sheetFly * 1.45, sheetFly * 1.15, sheetFly * 1.65]}
          >
            <Vox kind="wool" tint="#ebe4d2" size={[sheetW, 0.12, sheetD]} />
          </group>
        ) : null}

        {withDads ? (
          <group position={[0, 0.42, 0.08]}>
            <TinyDad which={1} position={[-0.17, Math.abs(Math.sin(dadBounce)) * 0.07, 0.19]} scale={0.72} mood={dadMood} />
            <TinyDad which={2} position={[0.17, Math.abs(Math.sin(dadBounce + 1.1)) * 0.07, 0.19]} scale={0.72} mood={dadMood} />
            <TinyDad which={3} position={[-0.17, Math.abs(Math.sin(dadBounce + 2.2)) * 0.07, -0.17]} scale={0.72} mood={dadMood} />
            <TinyDad which={4} position={[0.17, Math.abs(Math.sin(dadBounce + 3.3)) * 0.07, -0.17]} scale={0.72} mood={dadMood} />
          </group>
        ) : null}
      </group>
    </group>
  );
};

/** Woven swamp-reed basket cradle where baby hero was found. */
export const ReedBasket: React.FC<{ position?: Vec3; rotationY?: number; withBaby?: boolean; reach?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  withBaby = true,
  reach = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" tint="#9e874c" position={[0, 0.06, 0]} size={[0.62, 0.12, 0.78]} />
    <Vox kind="planks" tint="#8d7740" position={[-0.29, 0.2, 0]} size={[0.07, 0.24, 0.78]} />
    <Vox kind="planks" tint="#8d7740" position={[0.29, 0.2, 0]} size={[0.07, 0.24, 0.78]} />
    <Vox kind="planks" tint="#8d7740" position={[0, 0.2, 0.36]} size={[0.62, 0.24, 0.07]} />
    <Vox kind="planks" tint="#8d7740" position={[0, 0.2, -0.36]} size={[0.62, 0.24, 0.07]} />
    <Vox kind="wool" tint="#f3ebd3" position={[0, 0.13, 0]} size={[0.48, 0.06, 0.62]} />
    {withBaby ? <BabyHero position={[0, 0.12, 0]} reach={reach} /> : null}
  </group>
);

/** Ankle-high wooden dinner table (`0.34 m` tall) set with steaming bowls of green slime-mushroom soup. */
export const LowSoupTable: React.FC<{ position?: Vec3; rotationY?: number; t?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  t = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.31, 0]} size={[1.55, 0.07, 0.95]} />
    {[
      [-0.64, -0.36],
      [0.64, -0.36],
      [-0.64, 0.36],
      [0.64, 0.36],
    ].map(([x, z], i) => (
      <Vox key={i} kind="darkPlanks" position={[x, 0.15, z]} size={[0.1, 0.3, 0.1]} />
    ))}
    <Vox kind="cobble" tint="#44484d" position={[0, 0.44, 0]} size={[0.34, 0.2, 0.34]} />
    <Block position={[0, 0.53, 0]} size={[0.28, 0.04, 0.28]} color="#6ee048" emissive="#48b82e" emissiveIntensity={0.25} />
    {(
      [
        [0, 0.32],
        [-0.52, -0.22],
        [-0.2, -0.28],
        [0.2, -0.28],
        [0.52, -0.22],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <group key={`b${i}`} position={[x, 0.36, z]}>
        <Vox kind="planks" tint="#8a5a36" position={[0, 0.03, 0]} size={[0.2, 0.07, 0.2]} />
        <Block position={[0, 0.065, 0]} size={[0.15, 0.025, 0.15]} color="#72e44c" emissive="#4cb830" emissiveIntensity={0.2} />
        <Block
          position={[Math.sin(t * 2.4 + i) * 0.02, 0.15 + ((t * 0.22 + i * 0.2) % 0.16), 0]}
          size={[0.045, 0.045, 0.045]}
          color="#e9f7e1"
        />
      </group>
    ))}
  </group>
);

/** Cottage interior wooden door (`1.65 m` high) with brass handle at `y = 0.92 m` so stacked tiny dads reach it! */
export const TinyDoorway: React.FC<{ position?: Vec3; rotationY?: number; open?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  open = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="log" position={[-0.58, 0.9, 0]} size={[0.16, 1.8, 0.18]} />
    <Vox kind="log" position={[0.58, 0.9, 0]} size={[0.16, 1.8, 0.18]} />
    <Vox kind="log" position={[0, 1.74, 0]} size={[1.34, 0.16, 0.22]} />
    <group position={[-0.48, 0, 0.04]} rotation={[0, -open * 1.1, 0]}>
      <Vox kind="darkPlanks" position={[0.48, 0.84, 0]} size={[0.96, 1.66, 0.08]} />
      <Block position={[0.82, 0.98, 0.06]} size={[0.09, 0.09, 0.05]} color="#f0c84b" />
    </group>
  </group>
);

/** Porch terracotta cactus pot for the funny excuse shot (`2.cactus`). */
export const PottedCactus: React.FC<{ position?: Vec3; bitten?: number }> = ({ position = [0, 0, 0], bitten = 0 }) => (
  <group position={position}>
    <Vox kind="cobble" tint="#b35c3e" position={[0, 0.18, 0]} size={[0.46, 0.36, 0.46]} />
    <Vox kind="dirt" position={[0, 0.35, 0]} size={[0.38, 0.06, 0.38]} />
    <Vox kind="leaves" tint="#358c32" position={[0, 0.74, 0]} size={[0.28, 0.78, 0.28]} />
    <Block position={[-0.19, 0.76, 0]} size={[0.12, 0.3, 0.16]} color="#3e9d3a" />
    {bitten > 0.05 ? (
      <>
        <Block position={[0.12, 0.66, 0.06]} size={[0.11 * bitten, 0.14 * bitten, 0.14]} color="#1f4d1c" />
        <Block position={[0.16, 0.56 - bitten * 0.05, 0.08]} size={[0.06, 0.08, 0.06]} color="#7dff56" />
      </>
    ) : (
      <Block position={[0.19, 0.7, 0]} size={[0.12, 0.26, 0.16]} color="#3e9d3a" />
    )}
  </group>
);

/** Folded/carried torn blue baby coat (`4.barrow`). */
export const TornBabyCoat: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Vox kind="wool" tint="#3b78bd" position={[0, 0.04, 0]} size={[0.44, 0.08, 0.5]} />
    <Vox kind="wool" tint="#3b78bd" position={[-0.26, 0.04, -0.05]} rotation={[0, 0.25, 0]} size={[0.16, 0.07, 0.3]} />
    <Vox kind="wool" tint="#3b78bd" position={[0.26, 0.04, -0.07]} rotation={[0, -0.32, 0]} size={[0.15, 0.07, 0.24]} />
    <Block position={[0.04, 0.085, 0.05]} size={[0.24, 0.02, 0.05]} color="#221a16" />
    <Block position={[0.11, 0.086, 0.14]} size={[0.09, 0.02, 0.09]} color="#68d846" />
  </group>
);

/** Glowing bouncy Minecraft slimeball (`0.22 m`). */
export const SlimeballProp: React.FC<{ position?: Vec3; scale?: number; squash?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
  squash = 0,
}) => (
  <group position={position} scale={[scale * (1 + squash * 0.24), scale * (1 - squash * 0.3), scale * (1 + squash * 0.24)]}>
    <Block position={[0, 0.11, 0]} size={[0.22, 0.22, 0.22]} color="#78ef52" emissive="#4ec932" emissiveIntensity={0.35} />
    <Block position={[0, 0.11, 0]} size={[0.13, 0.13, 0.13]} color="#3fa527" />
  </group>
);

/** Warning sign at the Swamp Gate (`NO SWAMP - GOLEM PATROL`). */
export const SwampSign: React.FC<{ position?: Vec3; rotationY?: number }> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="log" position={[0, 0.65, 0]} size={[0.14, 1.3, 0.14]} />
    <Vox kind="planks" tint="#9e7444" position={[0, 1.22, 0.09]} size={[1.05, 0.62, 0.08]} />
    <Block position={[0, 1.22, 0.14]} rotation={[0, 0, 0.55]} size={[0.72, 0.08, 0.02]} color="#c92b24" />
    <Block position={[0, 1.22, 0.14]} rotation={[0, 0, -0.55]} size={[0.72, 0.08, 0.02]} color="#c92b24" />
  </group>
);

/** Deep iron-golem fist craters smashed into stone (`5.craters`) — low-profile rim so characters never clip shards! */
export const FistCraters: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {[
      [0, 0],
      [0.62, -0.34],
    ].map(([x, z], i) => (
      <group key={i} position={[x, 0, z]}>
        <Block position={[0, 0.014, 0]} size={[0.46, 0.028, 0.46]} color="#1d1f21" />
        <Block position={[-0.22, 0.024, 0.12]} size={[0.16, 0.048, 0.16]} color="#d8d8d0" />
        <Block position={[0.21, 0.022, -0.14]} size={[0.16, 0.044, 0.14]} color="#e2e2da" />
      </group>
    ))}
  </group>
);

/** Taut bridge-rigging rope that snaps & whips around Hero's ankle (`6.rope`), visually tripping him off the ledge! */
export const SnappingBridgeRope: React.FC<{
  anchor: Vec3;
  ankleTarget: Vec3;
  snap: number;
}> = ({ anchor, ankleTarget, snap }) => {
  const segs = 8;
  return (
    <group>
      {Array.from({ length: segs }, (_, i) => {
        const u = (i + 0.5) / segs;
        const whip = Math.sin(u * Math.PI) * Math.sin(snap * Math.PI * 2.5) * 0.24;
        const x = anchor[0] + (ankleTarget[0] - anchor[0]) * u + whip * 0.35;
        const y = anchor[1] + (ankleTarget[1] - anchor[1]) * u + Math.sin(u * Math.PI) * (snap > 0.15 ? 0.14 : -0.04);
        const z = anchor[2] + (ankleTarget[2] - anchor[2]) * u + whip;
        return (
          <Block
            key={i}
            position={[x, y, z]}
            size={[0.065, 0.065, 0.18]}
            color={i % 2 === 0 ? "#b88c4a" : "#966d34"}
          />
        );
      })}
    </group>
  );
};

/** Braided swamp-vine rope (`6.rope`). */
export const VineRope: React.FC<{ top: Vec3; length: number; sway?: number }> = ({ top, length, sway = 0 }) => {
  const segs = 7;
  const step = length / segs;
  return (
    <group position={top}>
      {Array.from({ length: segs }, (_, i) => (
        <Vox
          key={i}
          kind="leaves"
          tint={i % 2 === 0 ? "#3f8d34" : "#52a944"}
          position={[Math.sin(i * 0.55 + sway) * 0.05 * (i + 1) * 0.25, -(i + 0.5) * step, 0]}
          size={[0.085, step + 0.03, 0.085]}
        />
      ))}
    </group>
  );
};

/** Authentic 1m x 1m translucent Minecraft Slime Block (`6.block`, `6.boing`, `7.roof`). */
export const SlimeBlockProp: React.FC<{
  position?: Vec3;
  scale?: number;
  squash?: number;
  glow?: number;
}> = ({ position = [0, 0, 0], scale = 1, squash = 0, glow = 0.6 }) => {
  const sx = scale * (1 + squash * 0.34);
  const sy = Math.max(0.28, scale * (1 - squash * 0.42));
  return (
    <group position={position} scale={[sx, sy, sx]}>
      <Block position={[0, 0.5, 0]} size={[0.62, 0.62, 0.62]} color="#4ab930" emissive="#3da826" emissiveIntensity={0.35 * glow} />
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.02, 1.02, 1.02]} />
        <meshStandardMaterial
          color="#7aff54"
          emissive="#58e038"
          emissiveIntensity={0.4 * glow}
          transparent
          opacity={0.65}
          roughness={0.18}
        />
      </mesh>
      <Block position={[0, 1.01, 0]} size={[0.94, 0.025, 0.94]} color="#b4ff96" />
    </group>
  );
};

/** Schoolyard seesaw plank for Roof Jump Day (`3.plank`, `3.inch`). */
export const SeesawPlank: React.FC<{ position?: Vec3; rotationY?: number; tilt?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  tilt = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="log" position={[0, 0.16, 0]} size={[0.76, 0.32, 0.34]} />
    <group position={[0, 0.34, 0]} rotation={[tilt, 0, 0]}>
      <Vox kind="planks" tint="#c2935a" size={[0.58, 0.08, 2.4]} />
    </group>
  </group>
);

/** Twin white-rimmed iron-golem fist craters (`2.porch`, `4.slam`, `5.stare`, `5.craters`). */
export const TwinWhiteCraters: React.FC<{ position?: Vec3; rotationY?: number; fresh?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  fresh = 1,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={Math.max(0.01, fresh)}>
    {[-0.42, 0.42].map((x) => (
      <group key={x} position={[x, 0, 0]}>
        <Block position={[0, 0.016, 0]} size={[0.5, 0.032, 0.5]} color="#e6e6de" />
        <Block position={[0, 0.034, 0]} size={[0.3, 0.024, 0.3]} color="#2c2f33" />
        <Block position={[-0.2, 0.028, 0.16]} size={[0.12, 0.048, 0.12]} color="#f2f2ea" />
        <Block position={[0.18, 0.026, -0.16]} size={[0.11, 0.044, 0.11]} color="#dcdcd4" />
      </group>
    ))}
  </group>
);

/** Wooden bridge crossbar + knock-out locking pin (`2.bridge`, `4.sunset`, `6.pin`). */
export const BridgePinPost: React.FC<{
  position?: Vec3;
  barLift?: number;
  pinOut?: number;
}> = ({ position = [0, 0, 0], barLift = 0, pinOut = 0 }) => (
  <group position={position}>
    <Vox kind="log" position={[-1.95, 0.65, 0]} size={[0.28, 1.3, 0.28]} />
    <Vox kind="log" position={[1.95, 0.65, 0]} size={[0.28, 1.3, 0.28]} />
    <group position={[-1.95, 0.95, 0.16]} rotation={[0, 0, barLift * 1.1]}>
      <Vox kind="darkPlanks" position={[1.95, 0, 0]} size={[4.2, 0.18, 0.13]} />
    </group>
    <Vox
      kind="planks"
      tint="#d4a259"
      position={[1.95 + pinOut * 0.95, 0.95 - pinOut * 0.45, 0.22]}
      rotation={[0, 0, -pinOut * 1.4]}
      size={[0.38, 0.09, 0.09]}
    />
  </group>
);

/** Torn blue baby coat hanging on a wall peg (`2.coat`, `5.list`). */
export const HangingBabyCoat: React.FC<{ position?: Vec3; rotationY?: number; sway?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  sway = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, 0.3, 0.03]} size={[0.1, 0.1, 0.12]} />
    <group position={[0, 0.28, 0.08]} rotation={[0, 0, sway]}>
      {/* Collar, chest, two sleeves, buttons, tear & dried slime fleck */}
      <Vox kind="wool" tint="#f3ebd3" position={[0, -0.02, 0.01]} size={[0.26, 0.08, 0.1]} />
      <Vox kind="wool" tint="#3b78bd" position={[0, -0.26, 0]} size={[0.42, 0.46, 0.09]} />
      <Vox kind="wool" tint="#3b78bd" position={[-0.27, -0.18, 0]} rotation={[0, 0, 0.32]} size={[0.14, 0.34, 0.08]} />
      <Vox kind="wool" tint="#3b78bd" position={[0.27, -0.16, 0]} rotation={[0, 0, -0.38]} size={[0.14, 0.26, 0.08]} />
      <Block position={[0, -0.16, 0.05]} size={[0.04, 0.04, 0.02]} color="#f0c84b" />
      <Block position={[0, -0.27, 0.05]} size={[0.04, 0.04, 0.02]} color="#f0c84b" />
      <Block position={[0.06, -0.4, 0.05]} size={[0.22, 0.045, 0.02]} color="#1f1712" />
      <Block position={[-0.1, -0.32, 0.05]} size={[0.07, 0.07, 0.02]} color="#68d846" />
    </group>
  </group>
);

/** Vertical wind-rush speed streaks racing upward past plummeting Hero (`6.rope`, `6.three`, `6.block`). */
export const FallStreaks: React.FC<{
  position?: Vec3;
  t: number;
  count?: number;
  radius?: number;
  span?: number;
}> = ({ position = [0, 0, 0], t, count = 10, radius = 0.88, span = 1.9 }) => (
  <group position={position}>
    {Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + 0.42;
      const r = radius * (0.78 + (i % 3) * 0.22);
      const cyc = ((t * 4.4 + i * 0.21) % 1) - 0.5;
      return (
        <Block
          key={i}
          position={[Math.cos(a) * r, cyc * span, Math.sin(a) * r]}
          size={[0.022, 0.46 + (i % 2) * 0.2, 0.022]}
          color="#fff6e3"
          emissive="#ffe2b0"
          emissiveIntensity={0.45}
          castShadow={false}
        />
      );
    })}
  </group>
);


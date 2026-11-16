import type React from "react";
import { Block, Glow, MinecraftAvatar, PixelText, Torch, Vox, getPose, useFilmTime } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { BedBox, Bell, Bone, Creeper, Hut, LampPost, ROBE, Villager, Well, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: a dog who was told to sit, and the town that was built round him.
 *
 * The film has ONE spot. The dog sits at the origin and looks south (+Z), down the path his owner took into the
 * forest. Everything his owner left is within three metres of him: the bed to his east, the chest to his west, a ring
 * of torches, a small bad roof. The town is north, east and west of him. The lens lives south of him, looking at his
 * face with the town behind it; turned round, it looks over his back at the forest.
 *
 * From the pack: villagers, the creeper, skeletons, the bed, huts. Built here, because no film had one: a dog on four
 * legs (`Dog`), a parrot (`Parrot`), a loaf, a chest that opens, the sign, the roof.
 *
 * A tall frame is narrow: at 6 m it shows about 1.4 m each side of its middle. Stage in depth, not in width.
 */

export {
  DEG, EAST, NORTH, SOUTH, WEST, ease, ramp, pop, jolt, ahead, beside, Bits, Bubble, Puffs, SoundRings, SubscribeSign, Villager, ROBE, Creeper, Skeleton,
  Zombie, Spider, Chicken, Rain, Bone, PlayerSword as Sword, groundSitPose as sitPose, GROUND_SIT, PixelHeart as Heart, NightFill as Fill, villagerFace,
} from "../../../Topics/InThisTown";
export { Block, Glow, PixelText } from "../../engine";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });
/** One hop: 0 outside, a sine arc of height `h` for `d` seconds from `at`. */
export const hop = (t: number, at: number, h = 0.3, d = 0.3) => {
  const k = (t - at) / d;
  return k <= 0 || k >= 1 ? 0 : Math.sin(k * Math.PI) * h;
};
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** Where he sits. He looks south. */
  dog: [0, 0, 0] as Vec3,
  /** The bed: its middle. The pillow is at the north end. */
  bed: [1.8, 0, -0.25] as Vec3,
  chest: [-1.75, 0, -0.45] as Vec3,
  /** The foot of the sign's post: at his shoulder, between him and the bed. The board faces south. */
  sign: [1.12, 0, -0.5] as Vec3,
  /** Where the creeper stands at night: beside him, on his west. */
  creeper: [-0.9, 0, 0.05] as Vec3,
  /** The shade the creeper waits in by day: under the oak, north-west. */
  shade: [-5.2, 0, -3.4] as Vec3,
  /** Where the path goes into the forest. */
  forest: [0, 0, 17] as Vec3,
  /** The farmer's door. */
  farm: [-4.4, 0, -6.6] as Vec3,
  /** Somewhere he might not come back from. Its own zone. */
  deep: [0, 0, 200] as Vec3,
};
/** The dog's face, for a lens: sitting or standing, his head is at the same height. */
export const DOGFACE: Vec3 = [0, 0.8, 0.55];
/** The lens, for someone to look into, for a camera south of the dog. */
export const LENS: Vec3 = [0, 1.3, 9];

// ----------------------------------------------------------------------------- the dog

export type DogMood = "calm" | "sad" | "angry" | "wide" | "shut" | "happy";
export type DogProps = {
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  /** 1 sitting, 0 standing on four legs. In between he is half way up, which is how he looks when it takes three tries. */
  sit?: number;
  /** Metres walked. Drives the legs. */
  walk?: number;
  headYaw?: number;
  /** Positive looks down. */
  headPitch?: number;
  /** The tilt of a dog who does not understand. */
  headTilt?: number;
  /** World point for the head to look at. Overrides `headYaw` and `headPitch`. */
  lookAt?: Vec3;
  /** 0–1: the lip goes up and the teeth show. */
  teeth?: number;
  /** 0–1: the jaw drops. Over 0.5 the tongue is out. */
  mouth?: number;
  /** 1 up, 0 flat back. */
  ears?: number;
  /** 0–1: how hard the tail wags. */
  wag?: number;
  /** 1 up, 0 level, -1 tucked under. */
  tail?: number;
  mood?: DogMood;
  /** 0–1: he shakes. */
  shiver?: number;
  /** Radians: the whole dog rolls to one side, for a wobble. */
  roll?: number;
  /** Snow on his head, his nose and his back. */
  snow?: boolean;
  blink?: boolean;
  phase?: number;
  /** Anything on his head, in metres: the origin is the top of his head, between the ears. */
  onHead?: React.ReactNode;
};

export const DOG_SCALE = 1.2;
const FUR = "#e9e5df";
const FUR_BACK = "#d2ccc4";
const FUR_MANE = "#dcd6ce";
const SNOUT = "#d8c2a6";
export const COLLAR = "#d8342a";

/**
 * A dog on four legs, as a tamed wolf is in the game: white, a red collar, a tan nose. Feet on `position`, facing +Z.
 * Sitting, his head stays where it was and his back end goes down, so a lens framed on his face holds through a stand.
 */
export const Dog: React.FC<DogProps> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = DOG_SCALE,
  sit = 1,
  walk = 0,
  headYaw = 0,
  headPitch = 0,
  headTilt = 0,
  lookAt,
  teeth = 0,
  mouth = 0,
  ears = 1,
  wag = 0,
  tail = 0,
  mood = "calm",
  shiver = 0,
  roll = 0,
  snow = false,
  blink = true,
  phase = 0,
  onHead,
}) => {
  const t = useFilmTime() + phase;
  const u = scale / 16;
  const s = Math.min(1, Math.max(0, sit));
  let yaw = headYaw;
  let pitch = headPitch;
  if (lookAt) {
    const hx = position[0] + Math.sin(rotationY) * 9 * u;
    const hz = position[2] + Math.cos(rotationY) * 9 * u;
    const dx = lookAt[0] - hx;
    const dz = lookAt[2] - hz;
    const dy = lookAt[1] - (position[1] + 11 * u);
    let a = Math.atan2(dx, dz) - rotationY;
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    yaw = Math.max(-1.25, Math.min(1.25, a));
    pitch = Math.max(-0.9, Math.min(0.8, -Math.atan2(dy, Math.hypot(dx, dz))));
  }
  const breath = Math.sin(t * 2.4) * 0.1;
  const shake = shiver * Math.sin(t * 61) * 0.16;
  const torsoA = -0.8 * s;
  const stride = Math.sin(walk * 7) * 0.6 * (1 - s);
  const tailWorld = -0.55 * (1 - s) - 0.28 * s + tail * 0.95;
  const shut = mood === "shut" || mood === "happy" || (blink && (t * 0.37 + 0.13) % 1 < 0.035);
  const wide = mood === "wide";
  const earA = (1 - ears) * 1.1;
  const jaw = Math.max(mouth, teeth * 0.35);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <group scale={u} position={[shake * u, 0, 0]} rotation={[0, 0, roll]}>
        {/* the back half: it goes down when he sits */}
        <group position={[0, 10 - s * 0.6, 1]} rotation={[torsoA, 0, 0]}>
          <Block position={[0, 0, -4.5]} size={[6, 6 + breath, 9]} color={FUR} />
          <Block position={[0, 3.02, -4.5]} size={[4, 0.1, 8.6]} color={FUR_BACK} castShadow={false} />
          {snow ? <Block position={[0, 3.5, -4.2]} size={[5.4, 1, 8]} color="#ffffff" castShadow={false} /> : null}
          <group position={[0, 1.6, -9]} rotation={[tailWorld - torsoA, Math.sin(t * 15) * 0.6 * wag, 0]}>
            <Block position={[0, 0, -3.6]} size={[2, 2, 7.2]} color={FUR} />
            <Block position={[0, 0, -7]} size={[2.05, 2.05, 1.4]} color={FUR_BACK} castShadow={false} />
          </group>
        </group>
        {/* hind legs: under him standing, flat on the ground and pointing forward sitting */}
        {[-1, 1].map((side) => (
          <group key={`h${side}`} position={[side * (1.6 + s * 1.5), 8 - s * 6.8, -5.4 + s * 2.6]} rotation={[-1.47 * s - side * stride, 0, 0]}>
            <Block position={[0, -4, 0]} size={[2, 8, 2]} color={FUR} />
            <Block position={[0, -7.6, 0]} size={[2.05, 0.9, 2.05]} color={FUR_BACK} castShadow={false} />
          </group>
        ))}
        {/* front legs */}
        {[-1, 1].map((side) => (
          <group key={`f${side}`} position={[side * 1.6, 8 - s * 0.25, 4.6]} rotation={[-0.2 * s + side * stride, 0, 0]}>
            <Block position={[0, -4, 0]} size={[2, 8, 2]} color={FUR} />
            <Block position={[0, -7.6, 0]} size={[2.05, 0.9, 2.05]} color={FUR_BACK} castShadow={false} />
          </group>
        ))}
        {/* the chest and its ruff */}
        <Block position={[0, 10.5, 4]} size={[8, 7 + breath, 6]} color={FUR_MANE} />
        {/* the collar: the one red thing in the film that is not his owner's shirt */}
        <Block position={[0, 10.6, 6.75]} size={[6.9, 6.9, 1.3]} color={COLLAR} />
        <Block position={[0, 7.3, 7.5]} size={[1.3, 1.4, 0.4]} color="#f2c53a" metalness={0.3} roughness={0.5} castShadow={false} />
        {/* the head */}
        <group position={[0, 10.6, 7]} rotation={[pitch, yaw, headTilt, "YXZ"] as unknown as Vec3}>
          <Block position={[0, 0, 2.2]} size={[6, 6, 4.4]} color={FUR} />
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 2, 3, 1.2]} rotation={[-earA, 0, side * earA * 0.5]}>
              <Block position={[0, 1, 0]} size={[2, 2.2, 1]} color={FUR} />
              <Block position={[0, 0.9, 0.52]} size={[1, 1.3, 0.06]} color="#e7a9a2" castShadow={false} />
            </group>
          ))}
          {/* the nose and the upper lip */}
          <Block position={[0, -1.0, 5.8]} size={[3, 2, 3.2]} color={SNOUT} />
          <Block position={[0, -0.25, 7.42]} size={[1.2, 1, 0.1]} color="#1a1614" castShadow={false} />
          {snow ? <Block position={[0, 0.2, 6]} size={[2.6, 0.6, 2.6]} color="#ffffff" castShadow={false} /> : null}
          {snow ? <Block position={[0, 3.3, 2]} size={[5.4, 0.9, 3.8]} color="#ffffff" castShadow={false} /> : null}
          {/* teeth */}
          {teeth > 0.05 ? (
            <>
              <Block position={[0, -2.0 - teeth * 0.3, 5.9]} size={[3.04, 0.7 * teeth + 0.2, 3.1]} color="#ffffff" castShadow={false} />
              {[-1, 1].map((side) => (
                <Block key={side} position={[side * 1.3, -2.5 - teeth * 0.4, 7.2]} size={[0.5, 1.1 * teeth, 0.5]} color="#ffffff" castShadow={false} />
              ))}
            </>
          ) : null}
          {/* the jaw */}
          <group position={[0, -2.2, 4.4]} rotation={[jaw * 0.6, 0, 0]}>
            <Block position={[0, -0.4, 1.4]} size={[2.6, 0.9, 2.8]} color={SNOUT} />
            {mouth > 0.5 ? <Block position={[0, 0.1, 1.9]} size={[1.4, 0.3, 2.4]} color="#e8697a" castShadow={false} /> : null}
          </group>
          {/* eyes */}
          {[-1, 1].map((side) => (
            <group key={`e${side}`} position={[side * 1.75, 0.9, 4.42]}>
              {shut ? (
                <Block position={[0, mood === "happy" ? 0.2 : -0.1, 0]} size={[2, 0.5, 0.1]} color="#2a211c" castShadow={false} />
              ) : (
                <>
                  <Block size={[2, wide ? 2.5 : 1.9, 0.08]} color="#ffffff" castShadow={false} />
                  <Block position={[-side * 0.35, wide ? 0 : -0.1, 0.05]} size={[wide ? 0.9 : 1.2, wide ? 1 : 1.6, 0.08]} color="#1d1512" castShadow={false} />
                  <Block position={[-side * 0.1, 0.4, 0.1]} size={[0.4, 0.4, 0.04]} color="#ffffff" castShadow={false} />
                </>
              )}
              {mood === "sad" ? <Block position={[0, 1.45, 0.06]} rotation={[0, 0, side * 0.42]} size={[2.3, 0.5, 0.1]} color="#b9b1a6" castShadow={false} /> : null}
              {mood === "angry" ? <Block position={[0, 1.2, 0.08]} rotation={[0, 0, -side * 0.5]} size={[2.5, 0.7, 0.14]} color="#8a8078" castShadow={false} /> : null}
            </group>
          ))}
          {onHead ? (
            <group position={[0, 3, 2.2]} scale={1 / u}>
              {onHead}
            </group>
          ) : null}
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- the parrot

/** A red parrot. Feet on `position`, facing +Z. `open` 0–1 opens the beak; `flap` 0–1 lifts the wings. Nobody likes him. */
export const Parrot: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; open?: number; flap?: number; headYaw?: number; tilt?: number; bob?: number; snow?: boolean }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1.3,
  open = 0,
  flap = 0,
  headYaw = 0,
  tilt = 0,
  bob = 0,
  snow = false,
}) => {
  const t = useFilmTime();
  const u = scale / 16;
  const wing = flap * (0.9 + Math.sin(t * 34) * 0.55);
  return (
    <group position={[position[0], position[1] + Math.abs(Math.sin(t * 9)) * bob * 0.06, position[2]]} rotation={[0, rotationY, 0]}>
      <group scale={u}>
        {[-1, 1].map((s) => (
          <Block key={s} position={[s * 0.8, 0.5, 0.3]} size={[0.7, 1, 1.4]} color="#8a8a86" castShadow={false} />
        ))}
        <group position={[0, 1, 0]} rotation={[-0.22, 0, 0]}>
          <Block position={[0, 3, 0]} size={[3, 6, 3]} color="#d8281e" />
          <Block position={[0, 2.2, 1.52]} size={[2, 3, 0.06]} color="#e85a3a" castShadow={false} />
          <Block position={[0, 0.2, -2.6]} rotation={[0.5, 0, 0]} size={[2.6, 1, 4.6]} color="#b81e18" />
          <Block position={[0, -0.6, -4.4]} rotation={[0.5, 0, 0]} size={[2.6, 0.9, 1.6]} color="#2a5fd0" castShadow={false} />
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 1.55, 5.4, 0]} rotation={[0, 0, s * wing]}>
              <Block position={[s * 0.4, -2.4, 0]} size={[0.9, 5, 3]} color="#2a5fd0" />
              <Block position={[s * 0.42, -1.2, 0]} size={[0.92, 1.2, 3.02]} color="#f2c53a" castShadow={false} />
            </group>
          ))}
        </group>
        <group position={[0, 7.3, 0.4]} rotation={[0, headYaw, tilt]}>
          <Block position={[0, 1.4, 0]} size={[2.6, 3, 2.6]} color="#d8281e" />
          <Block position={[0, 3.3, -0.3]} size={[0.7, 1.2, 1.8]} color="#f2c53a" castShadow={false} />
          {snow ? <Block position={[0, 3.1, 0]} size={[2.4, 0.5, 2.4]} color="#ffffff" castShadow={false} /> : null}
          <Block position={[0, 1.5 + open * 0.25, 1.9]} rotation={[-open * 0.35, 0, 0]} size={[1.3, 1.2, 1.6]} color="#2f2f33" />
          <Block position={[0, 0.5 - open * 0.5, 1.6]} rotation={[open * 0.5, 0, 0]} size={[1.0, 0.6, 1.1]} color="#1d1d20" castShadow={false} />
          {[-1, 1].map((s) => (
            <group key={s}>
              <Block position={[s * 1.31, 1.8, 0.5]} size={[0.06, 1.2, 1.2]} color="#ffffff" castShadow={false} />
              <Block position={[s * 1.34, 1.8, 0.6]} size={[0.06, 0.6, 0.6]} color="#141414" castShadow={false} />
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- people

type A = Partial<MinecraftAvatarProps>;

/** A helmet for a head. */
const Helmet: React.FC = () => (
  <>
    <Block position={[0, 0.14, 0]} size={[0.5, 0.24, 0.5]} color="#cfd8e2" metalness={0.35} roughness={0.4} />
    <Block position={[0, -0.02, -0.12]} size={[0.5, 0.2, 0.27]} color="#b9c3cf" metalness={0.35} roughness={0.4} />
    <Block position={[0, 0.02, 0.24]} size={[0.14, 0.2, 0.04]} color="#b9c3cf" metalness={0.35} roughness={0.4} castShadow={false} />
  </>
);

/**
 * His owner: a player in a red shirt, the red of the dog's collar. `armour` is how he left: an iron helmet and
 * chestplate over it. He comes back without it. Anything he holds is a child, in his right hand.
 */
export const Owner: React.FC<A & { armour?: boolean }> = ({ armour = false, ...p }) => (
  <MinecraftAvatar
    outfit="tee"
    skin="#e0ac7e"
    hair="#5a3a1e"
    colors={{ torso: armour ? "#cfd8e2" : COLLAR, arms: COLLAR, legs: "#2e3c6e" }}
    face="smile"
    blink
    phase={0.9}
    head={armour ? <Helmet /> : undefined}
    {...p}
  />
);

const RAIDERS = [
  { skin: "#c99a74", hair: "#2b2b2b", torso: "#7a4fc8", legs: "#2a2a3a" },
  { skin: "#f0c8a4", hair: "#3ed24a", torso: "#23262f", legs: "#4a5a8a" },
];
/** The two players who walk into town. 0 is in purple and opens the chest; 1 has green hair, a black shirt and the axe. */
export const Raider: React.FC<A & { who: 0 | 1; axe?: boolean }> = ({ who, axe = false, ...p }) => {
  const c = RAIDERS[who];
  return (
    <MinecraftAvatar outfit="tee" skin={c.skin} hair={c.hair} colors={{ torso: c.torso, arms: c.torso, legs: c.legs }} face="grin" blink phase={who * 1.7 + 0.3} {...p}>
      {axe ? <Axe /> : null}
    </MinecraftAvatar>
  );
};

// ----------------------------------------------------------------------------- things to hold

/** An iron axe. As a child of an avatar it is in the right hand; the handle runs along +Z, the way a sword's blade does. */
export const Axe: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0.36]} size={[0.07, 0.07, 0.95]} color="#6b4a2a" />
    <Block position={[0, -0.14, 0.72]} size={[0.06, 0.34, 0.3]} color="#dfe6ee" metalness={0.3} roughness={0.35} />
    <Block position={[0, -0.33, 0.72]} size={[0.05, 0.06, 0.38]} color="#f4f8fb" metalness={0.3} roughness={0.3} castShadow={false} />
    <Block position={[0, 0.06, 0.72]} size={[0.06, 0.1, 0.16]} color="#b9c3cf" metalness={0.3} roughness={0.4} castShadow={false} />
  </group>
);

/** An iron pickaxe, the same way round as the axe. */
export const Pickaxe: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0.36]} size={[0.07, 0.07, 0.95]} color="#6b4a2a" />
    <Block position={[0, 0, 0.8]} size={[0.07, 0.5, 0.1]} color="#dfe6ee" metalness={0.3} roughness={0.35} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[0, s * 0.3, 0.72]} size={[0.06, 0.14, 0.1]} color="#dfe6ee" metalness={0.3} roughness={0.35} />
    ))}
  </group>
);

/** One of the twelve green eyes. It faces +Z; `position` is its middle. */
export const GreenEye: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; glow?: number }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, glow = 0.5 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block size={[0.2, 0.26, 0.06]} color="#1f6a52" emissive="#1f6a52" emissiveIntensity={glow} castShadow={false} />
      <Block size={[0.28, 0.16, 0.06]} color="#1f6a52" emissive="#1f6a52" emissiveIntensity={glow} castShadow={false} />
      <Block position={[0, 0, 0.012]} size={[0.16, 0.16, 0.06]} color="#7fe0b0" emissive="#7fe0b0" emissiveIntensity={glow * 1.4} castShadow={false} />
      <Block position={[0, 0, 0.024]} size={[0.05, 0.14, 0.06]} color="#0c2a20" castShadow={false} />
    </group>
  );

/** A loaf of bread, lying along X. `position` is the middle of its underside. */
export const Loaf: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={rotation} scale={scale}>
      <Block position={[0, 0.09, 0]} size={[0.52, 0.18, 0.26]} color="#b8762a" />
      <Block position={[0, 0.185, 0]} size={[0.46, 0.03, 0.2]} color="#dba24c" castShadow={false} />
      {[-0.14, 0, 0.14].map((x) => (
        <Block key={x} position={[x, 0.2, 0]} rotation={[0, 0.5, 0]} size={[0.03, 0.02, 0.2]} color="#8a5418" castShadow={false} />
      ))}
    </group>
  );

/** An iron chestplate as a thing: what he no longer has. It faces +Z. */
export const Chestplate: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) =>
  scale <= 0.01 ? null : (
    <group position={position} scale={scale}>
      <Block size={[0.4, 0.46, 0.08]} color="#cfd8e2" metalness={0.3} roughness={0.4} castShadow={false} />
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * 0.27, 0.13, 0]} size={[0.16, 0.2, 0.08]} color="#b9c3cf" metalness={0.3} roughness={0.4} castShadow={false} />
      ))}
      <Block position={[0, 0.2, 0.01]} size={[0.16, 0.1, 0.08]} color="#8f99a6" castShadow={false} />
    </group>
  );

// ----------------------------------------------------------------------------- what his owner left

/** The sign. From its first second we can read it and he cannot. `position` is the foot of the post; it faces +Z. */
export const SignPost: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; snow?: boolean }> = ({ position = PLACE.sign, rotationY = -0.3, scale = 1, snow = false }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Vox kind="log" position={[0, 0.45, -0.02]} size={[0.13, 0.9, 0.13]} />
      <Block position={[0, 1.3, 0]} size={[1.16, 0.86, 0.07]} color="#5c3d20" />
      <Block position={[0, 1.3, 0.02]} size={[1.06, 0.76, 0.07]} color="#9a6b3a" castShadow={false} />
      {["DO NOT", "MOVE HIM.", "HE IS", "WAITING."].map((line, i) => (
        <PixelText key={line} text={line} position={[0, 1.565 - i * 0.177, 0.06]} height={0.165} maxWidth={0.98} />
      ))}
      {snow ? <Block position={[0, 1.76, 0]} size={[1.2, 0.09, 0.16]} color="#ffffff" castShadow={false} /> : null}
    </group>
  );
/** The top edge of the sign, where the parrot sits. */
export const PERCH: Vec3 = [PLACE.sign[0] + 0.28, 1.73, PLACE.sign[2] + 0.07];

/** The chest of bones. `open` 0–1 lifts the lid. `position` is the middle of its floor; the latch faces +Z. */
export const Chest: React.FC<{ position?: Vec3; rotationY?: number; open?: number }> = ({ position = PLACE.chest, rotationY = 0.3, open = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.3, 0]} size={[0.9, 0.6, 0.9]} color="#a06a2c" />
    <Block position={[0, 0.3, 0]} size={[0.92, 0.08, 0.92]} color="#5c3a18" castShadow={false} />
    <Block position={[0, 0.03, 0]} size={[0.92, 0.06, 0.92]} color="#5c3a18" castShadow={false} />
    {open > 0.05 ? (
      <>
        <Block position={[0, 0.58, 0]} size={[0.8, 0.06, 0.8]} color="#2a1a0c" castShadow={false} />
        {Array.from({ length: 9 }, (_, i) => (
          <Bone key={i} position={[(rnd(i, 1) - 0.5) * 0.4, 0.64 + (i % 3) * 0.05, (rnd(i, 2) - 0.5) * 0.4]} rotation={[0, rnd(i, 3) * 3, (rnd(i, 4) - 0.5) * 0.6]} scale={1.15} />
        ))}
      </>
    ) : null}
    <group position={[0, 0.6, -0.45]} rotation={[-open * 1.75, 0, 0]}>
      <Block position={[0, 0.14, 0.45]} size={[0.9, 0.28, 0.9]} color="#b0782f" />
      <Block position={[0, 0.02, 0.45]} size={[0.92, 0.05, 0.92]} color="#5c3a18" castShadow={false} />
      <Block position={[0, 0.06, 0.92]} size={[0.14, 0.2, 0.06]} color="#cfd8e2" metalness={0.3} roughness={0.4} castShadow={false} />
    </group>
  </group>
);

/**
 * The roof he built, just over the dog. He was not good at building: two posts at the back, one a log and one
 * cobble, and three planks where there should be five, hanging out over him with nothing under their front ends.
 * `drop` is seconds since the loose plank let go (negative: it is still up; over 1: it is lying on the grass,
 * which is where it stays).
 */
export const BadRoof: React.FC<{ drop?: number; snow?: boolean }> = ({ drop = -1, snow = false }) => {
  const k = Math.min(1, Math.max(0, drop / 0.42));
  const fall = k * k;
  const up: Vec3 = [0.0, 2.3, -0.25];
  const down: Vec3 = [-1.45, 0.05, 1.0];
  return (
    <group>
      <Vox kind="log" position={[-0.85, 1.1, -1.3]} size={[0.18, 2.2, 0.18]} />
      <Vox kind="cobble" position={[0.78, 1.2, -1.3]} size={[0.34, 2.4, 0.34]} />
      <Vox kind="log" position={[-0.05, 2.28, -1.3]} rotation={[0, 0, 0.07]} size={[2.0, 0.14, 0.14]} />
      <group position={[0, 2.36, -1.3]} rotation={[0.13, 0, 0.07]}>
        <Vox kind="planks" position={[-0.6, 0, 1.1]} size={[0.44, 0.1, 2.5]} />
        <Vox kind="darkPlanks" position={[0.56, -0.02, 0.9]} rotation={[0, -0.06, 0]} size={[0.42, 0.1, 2.2]} />
        {snow ? <Block position={[-0.6, 0.12, 1.1]} size={[0.5, 0.14, 2.5]} color="#ffffff" castShadow={false} /> : null}
        {snow ? <Block position={[0.56, 0.1, 0.9]} size={[0.46, 0.14, 2.2]} color="#ffffff" castShadow={false} /> : null}
      </group>
      {/* the loose plank, in the middle: the one right over his head */}
      <Vox
        kind="planks"
        position={[up[0] + (down[0] - up[0]) * k, up[1] + (down[1] - up[1]) * fall, up[2] + (down[2] - up[2]) * k]}
        rotation={[0.13 * (1 - k), k * 1.1, 0.07 + Math.sin(k * 9) * (1 - k) * 0.5]}
        size={[0.44, 0.1, 2.1]}
      />
    </group>
  );
};

/** The torches all round him. `lit` > 0 makes three of them real lights. */
export const TORCH_R = 3.1;
export const TorchRing: React.FC<{ lit?: number }> = ({ lit = 0 }) => (
  <>
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2 + 0.39;
      return <Torch key={i} position={[Math.sin(a) * TORCH_R, 0, Math.cos(a) * TORCH_R]} light={lit > 0 && i % 3 === 0 ? lit : 0} seed={i + 2} />;
    })}
  </>
);

/**
 * Everything he left, where he left it. Every shot at the spot draws this.
 * `sign`: the scale of the sign (0: the villagers have not put it up yet). `chest`: how far the lid is open.
 * `drop`: seconds since the loose plank fell. `glow` 0–1: the bed lights up. `lit`: night, the torches are lights.
 */
export const Camp: React.FC<{ sign?: number; chest?: number; drop?: number; glow?: number; lit?: number; snow?: boolean; bed?: boolean }> = ({
  sign = 1,
  chest = 0,
  drop = -1,
  glow = 0,
  lit = 0,
  snow = false,
  bed = true,
}) => (
  <>
    {/* the bare patch where he has sat for four hundred days */}
    <Block position={[0, 0.012, -0.25]} size={[1.0, 0.02, 1.5]} color="#7a5a3a" castShadow={false} />
    <Block position={[0, 0.014, -0.25]} size={[0.7, 0.02, 1.2]} color="#6b4c30" castShadow={false} />
    {bed ? <BedBox position={PLACE.bed} /> : null}
    {glow > 0.01 ? (
      <>
        <Block position={[PLACE.bed[0], 0.58, PLACE.bed[2] + 0.1]} size={[1.16, 0.04, 2.1]} color="#fff6d8" emissive="#fff0b0" emissiveIntensity={2.2 * glow} opacity={0.75 * glow} transparent castShadow={false} />
        <Glow position={[PLACE.bed[0], 1.0, PLACE.bed[2]]} size={5 * glow} color="#fff6d8" opacity={0.9 * glow} />
        <Block position={[PLACE.bed[0], 2.4, PLACE.bed[2] + 0.1]} size={[1.0, 4.2, 1.9]} color="#fff6d8" emissive="#fff0b0" emissiveIntensity={1.6} opacity={0.22 * glow} transparent castShadow={false} />
        <pointLight position={[PLACE.bed[0], 1.3, PLACE.bed[2] + 0.4]} color="#fff0c0" intensity={9 * glow} distance={8} decay={2} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Block key={i} position={[PLACE.bed[0] - 0.45 + i * 0.18, 0.6 + glow * (0.7 + (i % 3) * 0.6), PLACE.bed[2] - 0.5 + ((i * 5) % 6) * 0.25]} size={[0.05, 0.5 + (i % 2) * 0.4, 0.05]} color="#fff6d8" emissive="#fff0b0" emissiveIntensity={2} opacity={0.7 * glow} transparent castShadow={false} />
        ))}
      </>
    ) : null}
    <Chest open={chest} />
    <BadRoof drop={drop} snow={snow} />
    <TorchRing lit={lit} />
    <SignPost scale={sign} snow={snow} />
    {snow ? <Block position={[PLACE.bed[0], 0.6, PLACE.bed[2]]} size={[1.18, 0.08, 2.2]} color="#ffffff" castShadow={false} /> : null}
  </>
);

/** Snow coming down over `center`. */
export const Snowfall: React.FC<{ center?: Vec3; t: number; count?: number; area?: [number, number] }> = ({ center = [0, 0, 0], t, count = 170, area = [12, 16] }) => (
  <group position={center}>
    {Array.from({ length: count }, (_, i) => {
      const y = 7 - ((t * (1.4 + rnd(i, 4) * 0.9) + rnd(i, 3) * 7) % 7);
      return <Block key={i} position={[(rnd(i, 1) - 0.5) * area[0] + Math.sin(t * 1.3 + i) * 0.2, y, (rnd(i, 2) - 0.5) * area[1]]} size={[0.07, 0.07, 0.07]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} castShadow={false} />;
    })}
  </group>
);

/** The day, counted in the air: "DAY 400". It faces +Z. */
export const DayCount: React.FC<{ position: Vec3; n: number; scale?: number; rotationY?: number }> = ({ position, n, scale = 1, rotationY = 0 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0, -0.03]} size={[1.9, 0.62, 0.04]} color="#15151a" castShadow={false} />
      <PixelText text={`DAY ${Math.round(n)}`} position={[0, 0, 0]} height={0.46} maxWidth={1.75} color="#ffe27a" />
    </group>
  );

// ----------------------------------------------------------------------------- the town

/** [x, z, width, height, turn, roof, tint]: the middle of each front wall. In the order they were built. */
export const HOUSES: Array<[number, number, number, number, number, string, string | undefined]> = [
  [-4.4, -7, 5.6, 3.8, 0, "#3f6b3a", "#caa268"],
  [4.4, -7, 5.6, 3.6, 0, "#8a3b2a", undefined],
  [0, -15.5, 8, 5, 0, "#5a4a6a", "#d8c49a"],
  [-10.8, 2.5, 6, 3.8, Math.PI / 2, "#3d5f9a", undefined],
  [10.8, 2.5, 6, 3.8, -Math.PI / 2, "#3f6b3a", "#d8c49a"],
  [-13, -15, 6.5, 4, 0, "#8a3b2a", undefined],
  [13, -15, 6.5, 4, 0, "#3d5f9a", "#caa268"],
  [-11.5, 11.5, 6, 3.6, Math.PI / 2, "#5a4a6a", "#caa268"],
  [11.5, 11.5, 6, 3.6, -Math.PI / 2, "#8a3b2a", undefined],
];

/**
 * The town that was built round him. `grow(i)` is the scale of part i (0: not built yet): the nine houses are 0–8,
 * the bell 9, the well 10, the lamp posts 11–14. Leave it out and the town is whole. `lit`: night, somebody is home.
 */
export const TownParts: React.FC<{ grow?: (i: number) => number; lit?: boolean }> = ({ grow = () => 1, lit = false }) => {
  const g = (i: number) => Math.max(0, grow(i));
  return (
    <>
      {HOUSES.map(([x, z, wd, h, turn, roof, tint], i) =>
        g(i) <= 0.01 ? null : (
          <group key={i} position={[x, 0, z]} scale={[1, g(i), 1]}>
            <Hut at={[0, 0, 0]} w={wd} h={h} turn={turn} roof={roof} tint={tint} wall={i % 3 === 1 ? "cobble" : "planks"} windows={[-wd / 2 + 1.3, wd / 2 - 1.3]} lit={lit} />
          </group>
        ),
      )}
      {g(9) > 0.01 ? (
        <group position={[0, 0, -8.6]} scale={g(9)}>
          <Bell position={[0, 0, 0]} />
        </group>
      ) : null}
      {g(10) > 0.01 ? (
        <group position={[6.2, 0, -2.2]} scale={g(10)}>
          <Well position={[0, 0, 0]} />
        </group>
      ) : null}
      {([[-2.9, -4.6], [2.9, -4.6], [-6.4, 4.2], [6.4, 5.4]] as Array<[number, number]>).map(([x, z], i) =>
        g(11 + i) > 0.01 ? (
          <group key={`l${i}`} position={[x, 0, z]} scale={g(11 + i)}>
            <LampPost position={[0, 0, 0]} seed={i + 2} />
          </group>
        ) : null,
      )}
    </>
  );
};

// ----------------------------------------------------------------------------- the town's people

/** Walking from a to b for someone who is not an avatar (a villager, a monster, the dog): where, which way, how far. */
export const go = (a: Vec3, b: Vec3, k: number): { position: Vec3; rotationY: number; walk: number } => {
  const q = Math.min(1, Math.max(0, k));
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  return { position: [a[0] + dx * q, a[1] + (b[1] - a[1]) * q, a[2] + dz * q], rotationY: Math.atan2(dx, dz), walk: Math.hypot(dx, dz) * q };
};

const FOLK: Array<[number, number, number, string, boolean]> = [
  [-3.4, -4.6, 1, ROBE.brown, false],
  [3.6, -5.0, -1, ROBE.blue, false],
  [-6.2, 0.8, 1, ROBE.white, false],
  [6.4, 2.0, -1, ROBE.red, false],
  [0.6, -8.8, 1, ROBE.friend, true],
  [-1.6, -5.6, -1, ROBE.elder, false],
];
/**
 * The town going about its day behind him: villagers strolling to and fro, and (by day) the creeper waiting in the
 * shade of the oak. `n` is how many villagers; `look` makes them all look at one point.
 */
export const Life: React.FC<{ t: number; n?: number; look?: Vec3; creeper?: boolean }> = ({ t, n = 5, look, creeper = true }) => (
  <>
    {FOLK.slice(0, n).map(([x, z, dir, robe, kid], i) => {
      const swing = Math.sin(t * 0.5 + i * 1.7);
      const vx = Math.cos(t * 0.5 + i * 1.7) * dir;
      return <Villager key={i} position={[x + swing * 1.1 * dir, 0, z]} rotationY={vx > 0 ? Math.PI / 2 : -Math.PI / 2} walk={swing * 1.1 + 3} robe={robe} kid={kid} scale={kid ? 0.7 : 0.94} lookAt={look} phase={i} />;
    })}
    {creeper ? <Creeper position={PLACE.shade} rotationY={2.2} lookAt={[0, 0.8, 0]} phase={1.3} /> : null}
  </>
);

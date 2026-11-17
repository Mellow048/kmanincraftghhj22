import type React from "react";
import { Block, cam, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, classroom, gym, wordClock, pop } from "../../../Topics/WhatIf";
import timingJson from "./timing.json";

/**
 * This film's cast and one set. Reusable school pieces stay in Topics/WhatIf; only the parade cart, lantern and
 * supernatural lie-blocks belong to this story.
 */
export {
  Aura, Beam, Countdown, Echo, Overhead, Streaks, Swirl,
  Classmate, KIDS, Teacher,
  Chalkboard, Classroom, Desk, SchoolHall, classroom,
  Gym, Kitchen, LunchRoom, Reflection, gym, kitchen, lunchRoom,
  Card, Cookie, CookieStack, Cup, Dog, DogBowl, Eraser, Sandwich, Tie, Tray,
  BedBox, Bits, Bubble, Figure, Hut, Icon, LampPost, Player, Puffs, Room, SoundRings, SubscribeSign, Voxels,
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
} from "../../../Topics/WhatIf";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  class: [0, 0, 0] as Vec3,
  hall: [0, 0, 40] as Vec3,
  room: [0, 0, 80] as Vec3,
  parade: [0, 0, 0] as Vec3,
};
export const SPOT = classroom(PLACE.class);
export const GYM = gym(PLACE.parade);
export const HERO: Vec3 = GYM.at(-1.25, 0, 25.4);
export const FRIEND: Vec3 = GYM.at(1.35, 0, 25.35);
export const FLOAT: Vec3 = GYM.at(0, 0, 27.0);
/** Bottom centre of the lantern, aligned with the float deck. */
export const LANTERN: Vec3 = GYM.at(0, 0.74, 27.0);

/** The teller and best friend have distinct, phone-readable colors. */
type Avatar = Partial<MinecraftAvatarProps>;
export const Hero: React.FC<Avatar> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#ff7a1a", arms: "#ff7a1a", legs: "#2b2f6a" }} blink {...p} />
);
export const Friend: React.FC<Avatar> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#8a5a3c" hair="#1f1a18" colors={{ torso: "#2fb5a8", arms: "skin", legs: "#3a3344" }} blink {...p} />
);

/** A parade cart. `at` is the ground under its centre. */
export const ParadeFloat: React.FC<{ at?: Vec3; tilt?: number; sway?: number }> = ({ at = FLOAT, tilt = 0, sway = 0 }) => (
  <group position={at} rotation={[sway, 0, tilt]}>
    <Block position={[0, 0.38, 0]} size={[3.5, 0.42, 2.15]} color="#68452d" />
    <Block position={[0, 0.62, 0]} size={[3.36, 0.08, 2.02]} color="#c69350" />
    <Block position={[0, 0.68, 0]} size={[2.9, 0.04, 1.55]} color="#ead7ac" />
    {[-1.25, 1.25].flatMap((x) => [-0.72, 0.72].map((z) => (
      <group key={`${x}-${z}`} position={[x, 0.02, z]}>
        <Block size={[0.48, 0.48, 0.16]} color="#25252a" metalness={0.25} roughness={0.7} />
        <Block position={[0, 0, 0.09]} size={[0.18, 0.18, 0.025]} color="#b98a4d" />
      </group>
    )))}
    <Block position={[-1.55, 0.9, 0]} size={[0.1, 0.55, 0.1]} color="#805633" />
    <Block position={[1.55, 0.9, 0]} size={[0.1, 0.55, 0.1]} color="#805633" />
    <Block position={[0, 1.16, 0]} size={[3.3, 0.06, 0.08]} color="#f3cc62" />
    <Block position={[-1.1, 0.82, 1.02]} size={[0.46, 0.3, 0.04]} color="#b34542" />
    {/* a blue ribbon fixed to the front rail: the thing the kids hope to win */}
    <Block position={[0, 0.86, 1.045]} size={[0.5, 0.36, 0.055]} color="#326ed0" />
    <Block position={[-0.11, 0.58, 1.05]} size={[0.12, 0.28, 0.045]} color="#326ed0" rotation={[0, 0, -0.16]} />
    <Block position={[0.11, 0.58, 1.05]} size={[0.12, 0.28, 0.045]} color="#72a8ff" rotation={[0, 0, 0.16]} />
    <Block position={[1.1, 0.82, 1.02]} size={[0.46, 0.3, 0.04]} color="#4b8d67" />
  </group>
);

/** One huge, wooden-framed parade lantern. `position` is the bottom centre; glow is 0–1. */
export const ParadeLantern: React.FC<{ position?: Vec3; glow?: number; broken?: boolean; tilt?: number; swing?: number }> = ({
  position = LANTERN,
  glow = 0.75,
  broken = false,
  tilt = 0,
  swing = 0,
}) => {
  const lamp = broken ? Math.min(0.14, glow) : glow;
  return (
    <group position={position} rotation={[swing, 0, tilt]}>
      {[-0.82, 0.82].flatMap((x) => [-0.72, 0.72].map((z) => (
        <Block key={`${x}-${z}`} position={[x, 1.32, z]} size={[0.12, 2.64, 0.12]} color="#593b2a" />
      )))}
      <Block position={[0, 2.62, 0]} size={[1.78, 0.14, 1.56]} color="#754d30" />
      <Block position={[0, 0.05, 0]} size={[1.78, 0.14, 1.56]} color="#754d30" />
      <Block position={[0, 1.32, 0]} size={[1.45, 2.28, 1.25]} color="#d68a3d" emissive="#ffb54f" emissiveIntensity={0.18 + lamp * 1.25} opacity={0.82} transparent castShadow={false} />
      <Block position={[0, 1.32, 0.66]} size={[1.0, 1.52, 0.055]} color="#ffdc86" emissive="#ffc65b" emissiveIntensity={0.2 + lamp * 1.5} opacity={0.84} transparent castShadow={false} />
      {/* The redstone switch: green when sound, a visible red fault after the accident. */}
      <Block position={[0.88, 0.43, 0.08]} size={[0.28, 0.42, 0.16]} color="#39383b" />
      <Block position={[0.88, 0.5, 0.18]} size={[0.16, 0.15, 0.06]} color={broken ? "#cf3d35" : "#65d58c"} emissive={broken ? "#f04438" : "#64ff9c"} emissiveIntensity={broken ? 1.5 : 0.6} />
      <Block position={[0, 2.82, 0]} size={[0.58, 0.18, 0.58]} color="#765337" />
      <Block position={[0, 3.14, 0]} size={[0.11, 0.52, 0.11]} color="#8b6541" />
      <Block position={[0.1, 3.42, 0]} size={[0.34, 0.08, 0.08]} color="#b89c68" />
      {/* The catch-rope reaches toward the friend holding the float. */}
      <Block position={[1.18, 1.05, 0.7]} size={[1.2, 0.035, 0.035]} color="#b99a68" rotation={[0, 0, -0.12 + tilt * 0.3]} castShadow={false} />
      {broken ? <Block position={[0.98, 0.74, 0.2]} size={[0.1, 0.06, 0.06]} color="#ff6a38" emissive="#ff5b34" emissiveIntensity={2.2} castShadow={false} /> : null}
      {!broken && lamp > 0.4 ? <pointLight position={[0, 1.28, 0.2]} color="#ffbd62" intensity={10 + lamp * 20} distance={7} decay={2} /> : null}
    </group>
  );
};

/**
 * A KEY FOR A CLOSE SHOT IN THE DARK.
 *
 * A tight frame at night comes out nearly black on a phone: the coat, the ground and the storm sky are all dark,
 * and the look's own light is metres away. Measured on the delivered film, the close-ups where the blocks land
 * stood at 18-37 luma out of 255 — the viewer could not see the moment the story turns. This puts a cold rim
 * behind the subject and a warm fill on the side the broken lantern stands, so a knee, a face and the cubes read
 * without turning night into day. `at` is the subject's feet.
 */
export const CloseKey: React.FC<{ at: Vec3; cold?: number; warm?: number }> = ({ at, cold = 9, warm = 6 }) => (
  <>
    <pointLight position={[at[0] - 0.75, at[1] + 1.65, at[2] + 0.95]} color="#a9c2ff" intensity={cold} distance={6.5} decay={2} />
    <pointLight position={[at[0] + 1.05, at[1] + 0.85, at[2] - 0.55]} color="#ffb877" intensity={warm} distance={5} decay={2} />
  </>
);

/**
 * A WASH FOR A WIDE SHOT IN THE DARK.
 *
 * A point light cannot lift a whole street: it falls off long before the edges of a six-metre frame, so the middle
 * brightens and the frame stays black where the story is happening. Measured on the delivered film, adding a gate
 * light three times stronger moved a wide storm shot by five luma out of 255. This lifts the air instead — a flat
 * cold wash plus a little warm bounce — which is what a phone needs to read a wide night frame.
 */
export const NightWash: React.FC<{ cold?: number; warm?: number }> = ({ cold = 0.55, warm = 0.26 }) => (
  <>
    <ambientLight color="#9fb0e2" intensity={cold} />
    <hemisphereLight color="#93a8e4" groundColor="#2c2536" intensity={warm} />
  </>
);

/** The light a school gate throws down a parade street: enough for a wide night shot to read, cold or warm. */
export const StreetFill: React.FC<{ at?: Vec3; intensity?: number; color?: string }> = ({
  at = [0, 0, 26.2],
  intensity = 16,
  color = "#9fb8ff",
}) => <pointLight position={[at[0], at[1] + 3.6, at[2]]} color={color} intensity={intensity} distance={16} decay={2} />;

/** Lie-blocks are visible to the viewer and teller, but not to his friend. */
export const NetheritePack: React.FC<{
  at: Vec3;
  facing?: number;
  count: number;
  time?: number;
  arrivalAt?: number;
  removeAfter?: number;
  removeAt?: number;
}> = ({ at, facing = 0, count, time = 0, arrivalAt, removeAfter, removeAt }) => {
  const slots: Array<[number, number, number]> = [
    [0.37, 0.84, -0.25],
    [0.37, 1.16, -0.25],
    [0.37, 1.48, -0.25],
    [0.69, 1.16, -0.25],
    [0.69, 1.48, -0.25],
  ];
  return (
    <group position={at} rotation-y={facing}>
      {slots.slice(0, Math.max(0, Math.min(slots.length, count))).map((p, i) => {
        const arrivalScale = i === count - 1 && arrivalAt !== undefined ? pop(time, arrivalAt, 0.34) : 1;
        const removed = i >= (removeAfter ?? count) && removeAt !== undefined ? pop(time, removeAt, 0.34) : 0;
        const scale = arrivalScale * (1 - removed);
        if (scale <= 0.004) return null;
        return (
          <group key={i} position={p} scale={scale}>
            <Block size={[0.3, 0.3, 0.3]} color="#302d38" metalness={0.86} roughness={0.28} emissive="#251e35" emissiveIntensity={0.22} />
            <Block position={[0, 0.045, 0.153]} size={[0.22, 0.045, 0.012]} color="#967b9e" emissive="#5b4568" emissiveIntensity={0.35} castShadow={false} />
            <Block position={[-0.045, -0.055, 0.153]} size={[0.075, 0.035, 0.012]} color="#c1a588" castShadow={false} />
          </group>
        );
      })}
    </group>
  );
};

/** The emptied, ordinary cloth backpack left beside the lantern at the end. */
export const EmptyPack: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.2, 0]} size={[0.55, 0.42, 0.28]} color="#654a38" />
    <Block position={[0, 0.43, -0.02]} size={[0.49, 0.16, 0.26]} color="#75543b" />
    <Block position={[0, 0.2, 0.15]} size={[0.22, 0.16, 0.035]} color="#bd985a" />
    <Block position={[-0.23, 0.06, -0.05]} size={[0.08, 0.08, 0.12]} color="#4a382d" />
    <Block position={[0.23, 0.06, -0.05]} size={[0.08, 0.08, 0.12]} color="#4a382d" />
  </group>
);

type DynamicPosition = Vec3 | ((t: number) => Vec3);

/** Stage-only options. Cameras, cues, light presets and notes remain explicit in each shot object. */
export type ParadeStage = {
  showHero?: boolean;
  showFriend?: boolean;
  showFloat?: boolean;
  showLantern?: boolean;
  heroAt?: DynamicPosition;
  friendAt?: DynamicPosition;
  heroRotation?: number;
  friendRotation?: number;
  heroFace?: MinecraftAvatarProps["face"];
  friendFace?: MinecraftAvatarProps["face"];
  heroAnimation?: MinecraftAvatarProps["animation"];
  friendAnimation?: MinecraftAvatarProps["animation"];
  heroArms?: MinecraftAvatarProps["arms"];
  friendArms?: MinecraftAvatarProps["arms"];
  heroHeadPitch?: number;
  friendHeadPitch?: number;
  heroGaze?: MinecraftAvatarProps["gaze"];
  friendGaze?: MinecraftAvatarProps["gaze"];
  heroDistance?: number;
  friendDistance?: number;
  packCount?: number;
  packArrivalAt?: number;
  packRemoveAfter?: number;
  packRemoveAt?: number;
  floatAt?: Vec3;
  floatTilt?: number;
  floatSway?: number;
  lanternAt?: Vec3;
  lanternGlow?: number;
  lanternBroken?: boolean;
  lanternBrokenAt?: number;
  lanternRepairAt?: number;
  lanternTilt?: number;
  lanternSwing?: number;
  extra?: (t: number) => React.ReactNode;
};

/** Shared cast and prop staging; shot objects keep their camera and story contract visible to the linter. */
export const paradeStage = (s: ParadeStage) => (t: number) => {
  const heroAt = typeof s.heroAt === "function" ? s.heroAt(t) : (s.heroAt ?? HERO);
  const friendAt = typeof s.friendAt === "function" ? s.friendAt(t) : (s.friendAt ?? FRIEND);
  let lanternBroken = s.lanternBroken ?? false;
  if (s.lanternBrokenAt !== undefined && t >= s.lanternBrokenAt) lanternBroken = true;
  if (s.lanternRepairAt !== undefined && t >= s.lanternRepairAt) lanternBroken = false;
  return (
    <>
      {s.showFloat === false ? null : <ParadeFloat at={s.floatAt ?? FLOAT} tilt={s.floatTilt} sway={s.floatSway} />}
      {s.showLantern === false ? null : <ParadeLantern position={s.lanternAt ?? LANTERN} glow={s.lanternGlow ?? 0.8} broken={lanternBroken} tilt={s.lanternTilt} swing={s.lanternSwing} />}
      {s.showHero === false ? null : (
        <Hero position={heroAt} rotationY={s.heroRotation ?? 0} animation={s.heroAnimation ?? "idle"} animDistance={s.heroDistance} face={s.heroFace ?? "uneasy"} arms={s.heroArms} headPitch={s.heroHeadPitch} gaze={s.heroGaze} />
      )}
      {s.showFriend === false ? null : (
        <Friend position={friendAt} rotationY={s.friendRotation ?? 0} animation={s.friendAnimation ?? "idle"} animDistance={s.friendDistance} face={s.friendFace ?? "calm"} arms={s.friendArms} headPitch={s.friendHeadPitch} gaze={s.friendGaze} />
      )}
      {s.packCount !== undefined ? (
        <NetheritePack at={heroAt} facing={s.heroRotation ?? 0} count={s.packCount} time={t} arrivalAt={s.packArrivalAt} removeAfter={s.packRemoveAfter} removeAt={s.packRemoveAt} />
      ) : null}
      {s.extra?.(t)}
    </>
  );
};

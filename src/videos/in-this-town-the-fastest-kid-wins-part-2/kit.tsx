import type React from "react";
import { Block, MinecraftAvatar, PixelText } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { CHILD, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import { DESERT, Hero, RIVER, SHOE, at } from "../in-this-town-the-fastest-kid-wins/kit";
import timingJson from "./timing.json";

/**
 * PART TWO'S KIT. Everything part one had (the teller, the witch, the shoes, the baby, the field of runners, the
 * places of the race) is passed on from part one's kit. What is new here: the runner in first place and his two
 * friends as named people, the teller in BLUE shoes, a paint brush and a tin of paint, a van you can see into, a
 * camera drone, an ice cream, a cup of water, and the camp at the end of stage two. A scene imports only from "./kit".
 */
export * from "../in-this-town-the-fastest-kid-wins/kit";

export const timing = timingJson as unknown as Timing;
/** Seconds into its shot at which a word is said. */
export const wordAt = wordClock(timing);
export const dur = (cue: string): number => {
  const c = timing.cues.find((x) => x.id === cue);
  if (!c) throw new Error(`no cue ${cue}`);
  return c.end - c.start;
};
/** `wordAt`, with a fallback if the aligner did not hear the word. */
export const w = (cue: string, word: string, fallback: number): number => {
  try {
    const v = wordAt(cue, word);
    return Number.isFinite(v) ? v : fallback;
  } catch {
    return fallback;
  }
};

type A = Partial<MinecraftAvatarProps>;
export const BLUE = "#2f6fe0";
/** The teller. `blue` is his shoes after he has painted them (every shot from 3.brush on); before that they are red. */
export const Me: React.FC<A & { blue?: boolean }> = ({ blue = true, ...p }) => <Hero shoes={blue ? BLUE : SHOE} shoeGlow={0.4} {...p} />;
/** The runner in first place: black and white, nobody else is. Red shoes. */
export const Rival: React.FC<A> = (p) => (
  <MinecraftAvatar outfit="tee" skin="#c98f6a" hair="#ececec" colors={{ torso: "#22222c", arms: "#22222c", legs: "#101014" }} scale={0.86} blink shoes={SHOE} shoeGlow={0.8} {...p} />
);
/** One of his two friends: grey, white hair, the same red shoes. `n` 0 or 1. */
export const Pal: React.FC<A & { n: number }> = ({ n, ...p }) => (
  <MinecraftAvatar
    outfit="tee" skin={n ? "#e0b48c" : "#a8714e"} hair="#ececec" colors={{ torso: n ? "#7a7a86" : "#5c5c68", arms: n ? "#7a7a86" : "#5c5c68", legs: "#1c1c22" }}
    scale={n ? 0.9 : 0.84} blink shoes={SHOE} shoeGlow={0.8} phase={1.3 + n * 2.1} {...p}
  />
);

// ----------------------------------------------------------------------------- places
export const R = (x: number, y: number, z: number): Vec3 => at(RIVER, x, y, z);
export const DS = (x: number, y: number, z: number): Vec3 => at(DESERT, x, y, z);
/** The tree he hides behind, in the rest camp, and where he stands behind it (north of it, out of sight of the log). */
export const TREE: Vec3 = R(-24.5, 0, -4.5);
export const HIDE: Vec3 = R(-24.5, 0, -5.4);
/** Where stage two starts: a line across the track, just before the first bridge. */
export const LINE2 = -0.5;
/** The end of stage two, in the desert: the line, and the water table. */
export const END2 = 56;
export const TABLE2: Vec3 = DS(END2 + 4.5, 0, -1.6);

// ----------------------------------------------------------------------------- things
/** A paint brush: wooden handle, bristles in `color`. Origin: the middle of the handle; the bristles point to +Z. */
export const Brush: React.FC<{ position: Vec3; rotation?: Vec3; color?: string; scale?: number }> = ({ position, rotation = [0, 0, 0], color = BLUE, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, -0.06]} size={[0.035, 0.03, 0.22]} color="#b98a52" />
    <Block position={[0, 0, 0.07]} size={[0.06, 0.035, 0.05]} color="#9aa3ad" />
    <Block position={[0, 0, 0.13]} size={[0.07, 0.03, 0.08]} color={color} />
  </group>
);
/** A tin of paint with the lid off. `position` is the floor under it. */
export const PaintTin: React.FC<{ position: Vec3; color?: string }> = ({ position, color = BLUE }) => (
  <group position={position}>
    <Block position={[0, 0.11, 0]} size={[0.22, 0.22, 0.22]} color="#c9ced6" metalness={0.4} roughness={0.4} />
    <Block position={[0, 0.222, 0]} size={[0.19, 0.01, 0.19]} color={color} castShadow={false} />
    <Block position={[0.112, 0.14, 0]} size={[0.01, 0.1, 0.12]} color={color} castShadow={false} />
    <Block position={[0.05, 0.005, 0.2]} size={[0.12, 0.01, 0.08]} color={color} castShadow={false} />
  </group>
);
/** A paper cup of water. `tip` radians tips it to a mouth. Origin: its bottom. */
export const Cup: React.FC<{ position: Vec3; rotationY?: number; tip?: number }> = ({ position, rotationY = 0, tip = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <group rotation={[-tip, 0, 0]}>
      <Block position={[0, 0.07, 0]} size={[0.1, 0.14, 0.1]} color="#f4f4f4" />
      <Block position={[0, 0.142, 0]} size={[0.08, 0.005, 0.08]} color="#6fb8ff" castShadow={false} />
    </group>
  </group>
);
/** An ice cream: a cone, two scoops, a flake. Origin: the point of the cone. About 0.3 m at scale 1. */
export const IceCream: React.FC<{ position: Vec3; scale?: number; rotation?: Vec3 }> = ({ position, scale = 1, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.03, 0]} size={[0.04, 0.06, 0.04]} color="#c9954a" />
    <Block position={[0, 0.09, 0]} size={[0.07, 0.06, 0.07]} color="#d6a55a" />
    <Block position={[0, 0.15, 0]} size={[0.1, 0.06, 0.1]} color="#e0b46a" />
    <Block position={[0, 0.22, 0]} size={[0.13, 0.1, 0.13]} color="#ff9ec4" />
    <Block position={[0, 0.3, 0]} size={[0.1, 0.08, 0.1]} color="#fff6e0" />
    <Block position={[0.03, 0.36, 0]} size={[0.025, 0.1, 0.025]} color="#5a3a22" />
  </group>
);
/**
 * A CAMERA DRONE: a grey box with four rotors that never stop, a lens, and a red light that blinks. It looks along
 * +Z turned by `yaw`, tipped down by `tilt`. `t` is the shot's clock. Hang it 3 to 5 m up; it bobs by itself.
 */
export const Drone: React.FC<{ position: Vec3; yaw?: number; tilt?: number; t: number; scale?: number }> = ({ position, yaw = 0, tilt = 0.5, t, scale = 1 }) => (
  <group position={[position[0], position[1] + Math.sin(t * 3.1) * 0.08, position[2]]} rotation={[0, yaw, 0]} scale={scale}>
    <group rotation={[tilt, 0, Math.sin(t * 2.3) * 0.06]}>
      <Block position={[0, 0, 0]} size={[0.42, 0.16, 0.5]} color="#4a4f58" />
      <Block position={[0, -0.02, 0.29]} size={[0.2, 0.2, 0.12]} color="#22242a" />
      <Block position={[0, -0.02, 0.36]} size={[0.11, 0.11, 0.03]} color="#000000" emissive="#6fb8ff" emissiveIntensity={0.8} castShadow={false} />
      <Block position={[0.13, 0.1, 0.2]} size={[0.05, 0.05, 0.05]} color="#000000" emissive="#ff2a2a" emissiveIntensity={(t * 2) % 1 < 0.5 ? 3 : 0.2} castShadow={false} />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
        <group key={i} position={[sx * 0.36, 0.06, sz * 0.32]}>
          <Block position={[-sx * 0.12, -0.04, -sz * 0.08]} size={[0.26, 0.04, 0.05]} color="#33363d" />
          <group rotation={[0, t * 40 + i, 0]}>
            <Block position={[0, 0.05, 0]} size={[0.44, 0.012, 0.05]} color="#c9ced6" castShadow={false} />
          </group>
        </group>
      ))}
    </group>
  </group>
);
/**
 * THE VAN THAT PICKS UP QUITTERS, driving along +X. White, a red stripe, QUIT? on the side, four wheels that turn
 * with `d` (metres driven). The cab (front) and the back each have an OPEN window on the south side (+Z, the camera's
 * side) and on the north, so whoever is in it can be seen: give the driver as `driver` and a passenger as `inside`;
 * both are drawn in the van's own space, with the floor at y = 0.45 (driver at x = 1.15, passenger at x = -0.5).
 * `position` is the ground under its middle. 3.6 m long, 1.7 wide, 2.1 high.
 */
export const Van: React.FC<{ position: Vec3; d?: number; driver?: React.ReactNode; inside?: React.ReactNode; bounce?: number }> = ({ position, d = 0, driver, inside, bounce = 0 }) => {
  const white = "#f1f1ee";
  return (
    <group position={[position[0], position[1] + Math.abs(Math.sin(d * 1.3)) * 0.03 + bounce, position[2]]}>
      {/* floor, roof, back, front */}
      <Block position={[0, 0.4, 0]} size={[3.6, 0.12, 1.7]} color="#2a2c32" />
      <Block position={[-0.35, 2.08, 0]} size={[2.9, 0.1, 1.7]} color={white} />
      <Block position={[1.45, 1.9, 0]} size={[0.75, 0.1, 1.7]} color={white} />
      <Block position={[-1.76, 1.25, 0]} size={[0.08, 1.6, 1.7]} color={white} />
      <Block position={[1.76, 0.85, 0]} size={[0.08, 0.8, 1.7]} color={white} />
      <Block position={[1.6, 1.0, 0]} size={[0.3, 0.5, 1.6]} color="#3a3d44" />
      {/* the sides: a low wall, a strip over the windows, and posts */}
      {[-1, 1].map((s) => (
        <group key={s} position={[0, 0, s * 0.82]}>
          <Block position={[0, 0.83, 0]} size={[3.6, 0.76, 0.06]} color={white} />
          <Block position={[0, 0.72, s * 0.035]} size={[3.6, 0.14, 0.012]} color="#d23a2e" castShadow={false} />
          <Block position={[-0.35, 1.94, 0]} size={[2.9, 0.2, 0.06]} color={white} />
          {[-1.76, -1.25, 0.25, 0.72, 1.07].map((x) => (
            <Block key={x} position={[x, 1.55, 0]} size={[0.1, 0.7, 0.06]} color={white} />
          ))}
          <Block position={[1.45, 1.8, 0]} size={[0.75, 0.12, 0.06]} color={white} />
          <Block position={[1.78, 1.5, 0]} size={[0.06, 0.6, 0.06]} color={white} />
          {[-1.15, 1.15].map((x) => (
            <group key={x} position={[x, 0.3, s * 0.02]} rotation={[0, 0, -d / 0.3]}>
              <Block size={[0.6, 0.6, 0.2]} color="#1c1c20" />
              <Block position={[0, 0, s * 0.11]} size={[0.26, 0.26, 0.02]} color="#c9ced6" castShadow={false} />
              <Block position={[0.18, 0, s * 0.11]} size={[0.08, 0.08, 0.02]} color="#8d96a2" castShadow={false} />
            </group>
          ))}
        </group>
      ))}
      <PixelText text="QUIT?" position={[-0.6, 0.98, 0.86]} height={0.26} maxWidth={1.5} color="#d23a2e" />
      {/* lights */}
      <Block position={[1.81, 0.75, 0.55]} size={[0.02, 0.14, 0.24]} color="#000000" emissive="#fff2b0" emissiveIntensity={1.5} castShadow={false} />
      <Block position={[1.81, 0.75, -0.55]} size={[0.02, 0.14, 0.24]} color="#000000" emissive="#fff2b0" emissiveIntensity={1.5} castShadow={false} />
      <Block position={[0.9, 2.2, 0]} size={[0.3, 0.14, 0.5]} color="#000000" emissive="#ffb030" emissiveIntensity={(d * 0.5) % 1 < 0.5 ? 2.5 : 0.3} castShadow={false} />
      {/* the wheel */}
      <Block position={[1.5, 1.2, 0.3]} size={[0.06, 0.3, 0.3]} color="#22242a" />
      {driver}
      {inside}
    </group>
  );
};
/** The baby villager in the back of the van, with an ice cream. Give it to `Van`'s `inside`. `lick` 0–1 brings the ice cream up. */
export const BabyInVan: React.FC<{ t: number; lick?: number; look?: Vec3 }> = ({ t, lick = 0 }) => (
  <>
    <Villager kid scale={CHILD} robe={ROBE.friend} position={[-0.5, 0.46, 0.25]} rotationY={0.25} nod={0.2 * lick + 0.08 * Math.sin(t * 6)} tilt={0.12 * Math.sin(t * 3)} />
    <IceCream position={[-0.42, 1.05 + 0.1 * lick + 0.02 * Math.sin(t * 6), 0.62]} scale={1.25} rotation={[-0.3 * lick, 0, 0.1]} />
  </>
);
/** White words at the top of the frame: a card. It faces `yaw` radians: give it the camera's yaw. */
export const Card: React.FC<{ text: string; position: Vec3; yaw?: number; height?: number; width?: number; color?: string }> = ({ text, position, yaw = 0, height = 0.45, width = 3.2, color = "#ffffff" }) => (
  <PixelText text={text} position={position} rotationY={yaw} height={height} maxWidth={width} color={color} />
);

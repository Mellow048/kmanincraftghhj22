import type React from "react";
import { MinecraftAvatar, PixelText, Torch, Vox, clamp01 } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { ADULT, Bucket, KID, Villager, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * In This Town, We Live at the Bottom — cast, places and the six things the story turns on.
 *
 * The world is three places, and each one is its own zone:
 *
 *   bottom  A fishing town at the foot of a towering Eiffel-scale mountain: a lane of huts, a stall,
 *           a wooden jetty out into the water, one boat with a hole in it, and the mountain staircase
 *           climbing up toward the elevated Quartz & Gold Rich Terrace.
 *   room    The teller's house: one bed, one shelf, one jar marked THE TOP, enclosed with a ceiling.
 *   top     The gate: stone arch with full-span iron bars, a keeper in a clean coat, a toll counter,
 *           exterior stone steps, and behind him an enriched upper-town street corridor.
 *
 * The lens lives at +Z. The lane runs east–west (x), the water is south (+Z), the mountain is north (−Z).
 */

export { Bucket, Lantern, Rain, Stall, SubscribeSign, BedBox, Villager, LampPost, Hut, Bits } from "../../../Topics/InThisTown";
export { ADULT, CHILD, KID, ease, ramp, pop, beside, ahead, DEG, EAST, NORTH, SOUTH, WEST } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said. */
export const wordAt = wordClock(timing);
/** Seconds into a shot that starts at `cut` inside `cue`. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** The middle of the lane, where the town stands to watch. */
  lane: [0, 0, -2] as Vec3,
  /** The jetty: from the shore out into the water. Its middle. */
  jetty: [0, 0.5, 9] as Vec3,
  /** The end of the jetty, where the basket comes down. */
  jettyEnd: [0, 0.5, 15] as Vec3,
  /** The stall, on the lane. */
  stall: [-4.2, 0, -5.4] as Vec3,
  /** The teller's door. */
  door: [6.6, 0, -8.4] as Vec3,
  /** The foot of the mountain gate: the first step. */
  firstStep: [0, 0, -11] as Vec3,
  /** Where the ladder meets the wall, high up. */
  highStep: [1.33, 13.485, -33.6] as Vec3,
  /** The room: its own zone. */
  room: [0, 0, 80] as Vec3,
  /** The gate: its own zone. */
  gate: [0, 0, -300] as Vec3,
  /** The street behind the gate, seen through the bars. */
  street: [0, 0, -307] as Vec3,
};

/** Elevated Quartz & Gold rich terrace high up on the mountain cliff (completely clear of stepPos 0..27). */
export const RICH_TERRACE: Vec3 = [6.4, 62, -46];
export const rich = (dx = 0, dy = 0, dz = 0): Vec3 => [RICH_TERRACE[0] + dx, RICH_TERRACE[1] + dy, RICH_TERRACE[2] + dz];
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];
export const top = (x: number, y: number, z: number): Vec3 => [PLACE.gate[0] + x, PLACE.gate[1] + y, PLACE.gate[2] + z];

// ----------------------------------------------------------------------------- the people

type A = Partial<MinecraftAvatarProps>;

/** Distinct non-orange robe palette for townsfolk/bystanders so Hero's orange shirt stays unique. */
export const TOWN_ROBES = [
  "#3f5f9a", // slate blue
  "#4f9a3a", // moss green
  "#6a3f8a", // plum violet
  "#8a6a3a", // ochre brown
  "#3c3c44", // charcoal smith
  "#9a3f34", // brick red
  "#4d7c78", // sea teal
  "#5a4d78", // indigo
];

/** The teller: a kid in an orange shirt. The one loud colour at the bottom of the mountain. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#e0aa80"
    hair="#2b1a10"
    colors={{ torso: "#e2622f", arms: "skin", legs: "#2f3f6b" }}
    blink
    saccade
    {...p}
  />
);

/** His mum. Green dress, dark hair, always working. */
export const Mum: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={ADULT}
    outfit="gown"
    skin="#e3b28a"
    hair="#231a1a"
    colors={{ torso: "#3f6f5f", arms: "skin", legs: "#2a4a42" }}
    blink
    {...p}
  />
);

/** The keeper: a clean white coat, up at the gate. He is the only person in the film who is never wet. */
export const Keeper: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={ADULT * 1.02}
    outfit="suit"
    skin="#e8bf9c"
    hair="#3a2c1e"
    colors={{ torso: "#f2f2ee", arms: "#f2f2ee", legs: "#2b2b31" }}
    blink
    gaze={0}
    {...p}
  />
);

/** The friend: a kid in blue, on the jetty. */
export const Friend: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#d09a74"
    hair="#1d1410"
    colors={{ torso: "#4a86c8", arms: "skin", legs: "#4a4038" }}
    blink
    {...p}
  />
);

/** A rich kid, up on the ledge above the town: clean shirt, clean shoes. */
export const RichKid: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#f0c8a4"
    hair="#c9a15e"
    colors={{ torso: "#f4f0e6", arms: "#f4e6d4", legs: "#f4f0e6" }}
    {...p}
  />
);

/** The woman who fixes everybody: elder plum-brown robe, herbs. Accepts full Villager arms/nod props. */
export const Healer: React.FC<{
  position?: Vec3;
  rotationY?: number;
  strain?: number;
  nod?: number;
  turn?: number;
  tilt?: number;
  hmm?: number;
  lookAt?: Vec3;
  arms?: VillagerProps["arms"];
  walk?: number;
  gaitWeight?: number;
  phase?: number;
}> = (p) => <Villager robe="#6a3f8a" hat="none" {...p} />;

export type Spot = [number, number];

/** The town, working the jetty. [x, z] */
export const JETTY_CROWD: Spot[] = [
  [-0.85, 6.2], [0.85, 7.4], [-0.82, 8.8], [0.88, 10.2], [-0.85, 11.6], [0.82, 12.8], [-0.88, 14.0],
];
/** The town, standing in the lane, facing inward/center. */
export const LANE_CROWD: Spot[] = [
  [-3.4, -3.0], [-2.2, -3.6], [2.4, -3.2], [3.6, -2.4], [-1.2, -3.9], [1.4, -4.2], [4.6, -3.6], [-4.4, -2.2],
];

// ----------------------------------------------------------------------------- the equipment

/** The boat, with the hole in its side, oars out, and stepped oak prow. `bail` 0–1 rocks it as the bucket scoops. */
export const Boat: React.FC<{ position: Vec3; rotationY?: number; bail?: number; hole?: boolean }> = ({
  position, rotationY = 0, bail = 0, hole = true,
}) => (
  <group position={position} rotation={[Math.sin(bail * Math.PI) * 0.04, rotationY, (bail - 0.5) * 0.08]}>
    {/* Oak hull bottom + stepped bow & stern */}
    <Vox kind="darkPlanks" position={[0, 0.24, 0]} size={[1.55, 0.14, 3.3]} />
    <Vox kind="planks" position={[0, 0.34, 0.2]} size={[1.35, 0.08, 0.32]} />
    <Vox kind="planks" position={[0, 0.34, -0.75]} size={[1.35, 0.08, 0.32]} />
    <Vox kind="darkPlanks" position={[0, 0.52, 1.68]} size={[1.35, 0.52, 0.16]} />
    <Vox kind="darkPlanks" position={[0, 0.56, 1.88]} size={[0.85, 0.44, 0.24]} />
    <Vox kind="darkPlanks" position={[0, 0.52, -1.68]} size={[1.45, 0.52, 0.16]} />
    <Vox kind="darkPlanks" position={[0.74, 0.52, 0]} size={[0.14, 0.52, 3.3]} />
    <Vox kind="darkPlanks" position={[-0.74, 0.52, 0]} size={[0.14, 0.52, 3.3]} />
    {/* Two wooden oars sticking cleanly out of the sides */}
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.78, 0.76, 0.2]} rotation={[0.1 * bail, 0, -s * 0.34]}>
        <Vox kind="planks" position={[s * 0.55, 0, 0]} size={[1.15, 0.07, 0.09]} />
        <Vox kind="darkPlanks" position={[s * 1.12, -0.02, 0]} size={[0.42, 0.04, 0.24]} />
      </group>
    ))}
    {/* Jagged leak hole in the starboard planking + bilge puddle */}
    {hole ? (
      <>
        <Vox kind="wool" tint="#13161c" position={[0.77, 0.44, 0.45]} size={[0.12, 0.32, 0.48]} />
        <Vox kind="water" position={[0, 0.32, 0.35]} size={[1.28, 0.04, 1.4]} opacity={0.85} />
      </>
    ) : null}
    <Bucket position={[0.25 + bail * 0.35, 0.48, -0.35 + bail * 0.6]} swing={bail * 1.6} scale={0.95} />
  </group>
);

/** A jar, and what is written on it. `label` 1->0 peels the entire paper+text label cleanly away as one unit. */
export const Jar: React.FC<{ position: Vec3; fill?: number; label?: number; scale?: number }> = ({
  position, fill = 0.55, label = 1, scale = 1,
}) => {
  const peel = clamp01(1 - label);
  const fade = Math.max(0.001, 1 - Math.max(0, peel - 0.65) / 0.35);
  return (
    <group position={position} scale={scale}>
      <Vox kind="wool" tint="#cfe8e6" position={[0, 0.24, 0]} size={[0.34, 0.48, 0.34]} opacity={0.6} castShadow={false} />
      <Vox kind="cobble" position={[0, 0.06 + fill * 0.16, 0]} size={[0.3, fill * 0.3, 0.3]} tint="#5fb0a8" />
      <Vox kind="darkPlanks" position={[0, 0.5, 0]} size={[0.36, 0.06, 0.36]} />
      {label > 0.01 ? (
        <group
          position={[-0.13 + peel * 0.26, 0.26 + peel * 0.14, 0.176 + peel * 0.24]}
          rotation={[peel * 0.35, -peel * 1.35, 0.04 + peel * 0.22]}
          scale={fade}
        >
          <Vox kind="wool" tint="#efe6d2" position={[0.13, 0, 0]} size={[0.26, 0.2, 0.012]} />
          <Vox kind="wool" tint="#3a3128" position={[0.12, 0.035, 0.009]} size={[0.16, 0.022, 0.006]} castShadow={false} />
          <Vox kind="wool" tint="#3a3128" position={[0.11, -0.025, 0.009]} size={[0.11, 0.022, 0.006]} castShadow={false} />
        </group>
      ) : null}
    </group>
  );
};

/** One golden apple, for eight gold. */
export const GoldenApple: React.FC<{ position: Vec3; scale?: number; rotationY?: number }> = ({
  position, scale = 1, rotationY = 0.4,
}) => (
  <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
    <Vox kind="wool" tint="#f2c231" position={[0, 0.1, 0]} size={[0.22, 0.2, 0.22]} emissive="#f2c231" emissiveIntensity={0.25} />
    <Vox kind="wool" tint="#ffe27a" position={[-0.05, 0.17, 0.06]} size={[0.07, 0.06, 0.05]} emissive="#ffe9a0" emissiveIntensity={0.5} castShadow={false} />
    <Vox kind="darkPlanks" position={[0.02, 0.24, 0]} size={[0.03, 0.07, 0.03]} />
    <Vox kind="leaves" tint="#4f8f3a" position={[0.07, 0.25, 0]} size={[0.07, 0.02, 0.05]} castShadow={false} />
  </group>
);

/** A coin, thrown down at him. */
export const Coin: React.FC<{ position: Vec3; spin?: number }> = ({ position, spin = 0 }) => (
  <group position={position} rotation={[0, spin, 0.35]}>
    <Vox kind="wool" tint="#ffd54a" size={[0.16, 0.02, 0.16]} emissive="#ffd54a" emissiveIntensity={0.35} castShadow={false} />
  </group>
);

/** A faceted pile of glowing green emeralds (`y = 0` is surface floor). */
export const EmeraldPile: React.FC<{ position: Vec3; n?: number; scale?: number; seed?: number }> = ({
  position, n = 7, scale = 1, seed = 1,
}) => (
  <group position={position} scale={scale}>
    {Array.from({ length: n }, (_, i) => {
      const a = i * 2.1 + seed;
      const r = i === 0 ? 0 : 0.1 + (i % 3) * 0.07;
      const y = 0.07 + Math.floor(i / 4) * 0.11;
      return (
        <group key={i} position={[Math.cos(a) * r, y, Math.sin(a) * r]} rotation={[0.12 * (i % 3 - 1), a, 0.1]}>
          <Vox kind="wool" tint={i % 2 === 0 ? "#2fd868" : "#1ea84e"} size={[0.12, 0.15, 0.12]} emissive="#1a8e42" emissiveIntensity={0.28} castShadow={false} />
          <Vox kind="wool" tint="#76f5a0" position={[-0.02, 0.04, 0.04]} size={[0.05, 0.06, 0.04]} emissive="#42e87c" emissiveIntensity={0.35} castShadow={false} />
        </group>
      );
    })}
  </group>
);

/** Voxel thought bubble (3 ascending cloud puffs + thought cloud containing a glowing GoldenApple). */
export const ThoughtBubble: React.FC<{ position: Vec3; scale?: number; rotationY?: number; appleRot?: number }> = ({
  position, scale = 1, rotationY = 0, appleRot = 0.5,
}) => {
  if (scale <= 0.01) return null;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Ascending thought trail dots */}
      <Vox kind="wool" tint="#f4f8ff" position={[-0.12, -0.44, 0]} size={[0.1, 0.1, 0.08]} emissive="#dbe8ff" emissiveIntensity={0.35} castShadow={false} />
      <Vox kind="wool" tint="#f6f9ff" position={[-0.05, -0.28, 0]} size={[0.14, 0.14, 0.1]} emissive="#dbe8ff" emissiveIntensity={0.35} castShadow={false} />
      <Vox kind="wool" tint="#ffffff" position={[0.02, -0.1, 0]} size={[0.18, 0.16, 0.12]} emissive="#e4eeff" emissiveIntensity={0.4} castShadow={false} />
      {/* Main voxel cloud backdrop */}
      <group position={[0.14, 0.24, 0]}>
        <Vox kind="wool" tint="#c8d8ee" position={[0, 0, -0.04]} size={[0.92, 0.62, 0.08]} castShadow={false} />
        <Vox kind="wool" tint="#ffffff" position={[0, 0, 0]} size={[0.84, 0.54, 0.1]} emissive="#eef5ff" emissiveIntensity={0.45} castShadow={false} />
        <Vox kind="wool" tint="#ffffff" position={[-0.24, 0.24, 0]} size={[0.38, 0.22, 0.1]} emissive="#eef5ff" emissiveIntensity={0.45} castShadow={false} />
        <Vox kind="wool" tint="#ffffff" position={[0.2, 0.26, 0]} size={[0.42, 0.24, 0.1]} emissive="#eef5ff" emissiveIntensity={0.45} castShadow={false} />
        <Vox kind="wool" tint="#ffffff" position={[-0.36, -0.02, 0]} size={[0.24, 0.34, 0.1]} emissive="#eef5ff" emissiveIntensity={0.45} castShadow={false} />
        <Vox kind="wool" tint="#ffffff" position={[0.36, -0.02, 0]} size={[0.24, 0.34, 0.1]} emissive="#eef5ff" emissiveIntensity={0.45} castShadow={false} />
        <GoldenApple position={[0, -0.14, 0.16]} scale={1.15} rotationY={appleRot} />
      </group>
    </group>
  );
};

/** Hollow woven basket on its rope (`yFloor = y + 0.10`), so Keeper stands inside without phasing. */
export const Basket: React.FC<{ position: Vec3; rope?: number; swing?: number }> = ({ position, rope = 16, swing = 0 }) => (
  <group position={position} rotation={[0, 0, swing * 0.08]}>
    {/* Hollow floor + 4 perimeter walls */}
    <Vox kind="hay" position={[0, 0.05, 0]} size={[1.16, 0.1, 1.16]} />
    <Vox kind="hay" position={[0, 0.35, 0.53]} size={[1.16, 0.5, 0.1]} />
    <Vox kind="hay" position={[0, 0.35, -0.53]} size={[1.16, 0.5, 0.1]} />
    <Vox kind="hay" position={[0.53, 0.35, 0]} size={[0.1, 0.5, 0.96]} />
    <Vox kind="hay" position={[-0.53, 0.35, 0]} size={[0.1, 0.5, 0.96]} />
    {/* Timber rim + corner rope harness */}
    <Vox kind="log" position={[0, 0.62, 0.54]} size={[1.22, 0.07, 0.08]} />
    <Vox kind="log" position={[0, 0.62, -0.54]} size={[1.22, 0.07, 0.08]} />
    <Vox kind="log" position={[0.54, 0.62, 0]} size={[0.08, 0.07, 1.22]} />
    <Vox kind="log" position={[-0.54, 0.62, 0]} size={[0.08, 0.07, 1.22]} />
    {[
      [-0.52, -0.52],
      [0.52, -0.52],
      [-0.52, 0.52],
      [0.52, 0.52],
    ].map(([rx, rz], i) => (
      <Vox key={i} kind="wool" tint="#c8b894" position={[rx, 1.4, rz]} size={[0.04, 1.55, 0.04]} castShadow={false} />
    ))}
    <Vox kind="log" position={[0, 2.18, 0]} size={[1.12, 0.08, 1.12]} />
    <Vox kind="wool" tint="#c8b894" position={[0, 2.2 + rope / 2, 0]} size={[0.06, rope, 0.06]} castShadow={false} />
  </group>
);

/** A catch: a heap of fish on the planks. */
export const FishPile: React.FC<{ position: Vec3; n?: number; seed?: number }> = ({ position, n = 7, seed = 2 }) => (
  <group position={position}>
    {Array.from({ length: n }, (_, i) => {
      const a = i * 1.7 + seed;
      return (
        <Vox
          key={i}
          kind="wool"
          tint={i % 3 === 0 ? "#b9c6cf" : "#93a5b0"}
          position={[Math.cos(a) * (0.12 + (i % 3) * 0.09), 0.04 + (i % 4) * 0.05, Math.sin(a) * (0.16 + (i % 2) * 0.1)]}
          rotation={[0, a, 0.1]}
          size={[0.1, 0.07, 0.36]}
        />
      );
    })}
  </group>
);

/**
 * The gate: stone arch with keystones, corner torches, hinges, lock plate, and 8 iron bars
 * spanning the entire -2.625 .. +2.625 opening cleanly when `open = 0`.
 */
export const Gate: React.FC<{ position: Vec3; open?: number; torches?: boolean }> = ({ position, open = 0, torches = true }) => (
  <group position={position}>
    {/* Stone piers, plinths, lintel, keystones & crenellations */}
    <Vox kind="stoneBrick" position={[-2.9, 1.8, 0]} size={[0.55, 3.6, 1.05]} />
    <Vox kind="stoneBrick" position={[2.9, 1.8, 0]} size={[0.55, 3.6, 1.05]} />
    <Vox kind="stone" position={[-2.9, 0.22, 0]} size={[0.72, 0.44, 1.2]} />
    <Vox kind="stone" position={[2.9, 0.22, 0]} size={[0.72, 0.44, 1.2]} />
    <Vox kind="stoneBrick" position={[0, 3.65, 0]} size={[6.4, 0.65, 1.15]} />
    <Vox kind="stone" position={[0, 3.68, 0]} size={[0.85, 0.8, 1.25]} />
    {[-2.2, -1.1, 1.1, 2.2].map((kx) => (
      <Vox key={kx} kind="stone" position={[kx, 4.1, 0]} size={[0.5, 0.28, 1.05]} />
    ))}
    <Vox kind="stone" position={[0, 0.03, 0]} size={[5.3, 0.06, 0.78]} />
    {torches ? (
      <>
        <Torch position={[-2.9, 2.5, 0.62]} light={0} seed={11} />
        <Torch position={[2.9, 2.5, 0.62]} light={0} seed={13} />
      </>
    ) : null}
    {/* Single full-span iron gate leaf hinged cleanly at x = -2.625 swinging inward (-Z) */}
    <group position={[-2.625, 0, 0]} rotation={[0, open * 1.15, 0]}>
      {[0.32, 0.96, 1.6, 2.24, 2.88, 3.52, 4.16, 4.8].map((x) => (
        <group key={x}>
          <Vox kind="cobble" tint="#767c85" position={[x, 1.65, 0]} size={[0.08, 3.22, 0.08]} castShadow={false} />
          <Vox kind="cobble" tint="#9aa1ab" position={[x, 3.3, 0]} size={[0.12, 0.14, 0.12]} castShadow={false} />
        </group>
      ))}
      <Vox kind="cobble" tint="#5b6069" position={[2.625, 3.12, 0]} size={[5.25, 0.11, 0.11]} castShadow={false} />
      <Vox kind="cobble" tint="#5b6069" position={[2.625, 1.68, 0]} size={[5.25, 0.11, 0.11]} castShadow={false} />
      <Vox kind="cobble" tint="#5b6069" position={[2.625, 0.54, 0]} size={[5.25, 0.11, 0.11]} castShadow={false} />
      {/* Iron hinges & brass lock plate */}
      <Vox kind="cobble" tint="#35383e" position={[0.08, 0.72, 0]} size={[0.18, 0.18, 0.14]} castShadow={false} />
      <Vox kind="cobble" tint="#35383e" position={[0.08, 2.7, 0]} size={[0.18, 0.18, 0.14]} castShadow={false} />
      <Vox kind="wool" tint="#e8b828" position={[5.05, 1.38, 0]} size={[0.24, 0.34, 0.14]} castShadow={false} />
    </group>
  </group>
);

/** The price board beside the gate: crisp centered digits + emerald badge, post behind board (`z = -0.10`). */
export const PriceBoard: React.FC<{ position: Vec3; digits: number[]; rotationY?: number }> = ({ position, digits, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="log" position={[0, 0.65, -0.1]} size={[0.14, 1.3, 0.14]} />
    <Vox kind="planks" position={[0, 1.32, 0]} size={[1.95, 1.16, 0.12]} />
    <Vox kind="darkPlanks" position={[0, 1.92, 0]} size={[2.06, 0.1, 0.16]} />
    <Vox kind="darkPlanks" position={[0, 0.72, 0]} size={[2.06, 0.1, 0.16]} />
    <Vox kind="darkPlanks" position={[-1.0, 1.32, 0]} size={[0.1, 1.16, 0.16]} />
    <Vox kind="darkPlanks" position={[1.0, 1.32, 0]} size={[0.1, 1.16, 0.16]} />
    <Vox kind="wool" tint="#2fd868" position={[-0.68, 1.32, 0.08]} size={[0.22, 0.28, 0.04]} emissive="#1a8e42" emissiveIntensity={0.3} castShadow={false} />
    <PixelText text={digits.join("")} position={[0.16, 1.32, 0.08]} height={0.44} maxWidth={1.32} color="#241c14" />
  </group>
);

/** A fishing rod held forward along local +Z, angled upward (`-0.42 rad`). `bend` 0–1 flexes tip & line down. */
export const Rod: React.FC<{ position: Vec3; rotationY?: number; bend?: number }> = ({ position, rotationY = 0, bend = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <group rotation={[-0.45 + bend * 0.48, 0, 0]}>
      <Vox kind="log" position={[0, 0, 0.22]} size={[0.07, 0.07, 0.44]} />
      <Vox kind="darkPlanks" position={[0, 0.01, 0.96]} size={[0.055, 0.055, 1.18]} />
      <Vox kind="planks" position={[0, -0.04 * bend, 1.64]} size={[0.04, 0.04, 0.45]} />
      {/* Hanging line & red-and-white float bobber directly off rod tip */}
      <Vox kind="wool" tint="#f7f5f0" position={[0, -0.78 - bend * 0.18, 1.84]} size={[0.025, 1.55, 0.025]} castShadow={false} />
      <Vox kind="wool" tint="#e23a3a" position={[0, -1.52 - bend * 0.2, 1.84]} size={[0.12, 0.1, 0.12]} castShadow={false} />
      <Vox kind="wool" tint="#ffffff" position={[0, -1.44 - bend * 0.2, 1.84]} size={[0.12, 0.05, 0.12]} castShadow={false} />
    </group>
  </group>
);

/** Standalone fishing line & float bobber for wide bay shots. */
export const Line: React.FC<{ position: Vec3; length?: number; bob?: number }> = ({ position, length = 1.6, bob = 0 }) => (
  <group position={position}>
    <Vox kind="wool" tint="#f7f5f0" position={[0, -length / 2, 0]} size={[0.024, length, 0.024]} castShadow={false} />
    <Vox kind="wool" tint="#e23a3a" position={[0, -length + bob, 0]} size={[0.12, 0.11, 0.12]} castShadow={false} />
    <Vox kind="wool" tint="#ffffff" position={[0, -length + 0.08 + bob, 0]} size={[0.12, 0.05, 0.12]} castShadow={false} />
  </group>
);

/** The mountain gate guard: dark iron armor, stern face, blocks entry until the lifetime fee is paid. */
export const Guard: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={ADULT * 1.05}
    outfit="suit"
    skin="#d6a57c"
    hair="#201a16"
    colors={{ torso: "#4c535d", arms: "#5d6570", legs: "#353a42" }}
    blink
    {...p}
  />
);

/** Exact world [x, yTop, z] on stone mountain step `i` (0..27) matching world.tsx staircase so feet never sink into stairs. */
export const stepPos = (i: number, dx = 0): Vec3 => [
  PLACE.firstStep[0] + Math.sin(i * 0.28) * 1.4 + dx,
  0.525 + i * 0.48,
  -12.0 - i * 0.8,
];

/** Hero holding a fishing rod cleanly in his hand (no floating rod or telekinesis arms). */
export const FishingHero: React.FC<A & { bend?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  bend = 0.35,
  ...rest
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Hero position={[0, 0, 0]} rotationY={0} animation="hold" {...rest} />
    <Rod position={[-0.25, 0.92, 0.34]} rotationY={0} bend={bend} />
  </group>
);

/** Villager holding a fishing rod tucked cleanly against his arms with customizable non-orange robe. */
export const FishingVillager: React.FC<{
  position?: Vec3;
  rotationY?: number;
  bend?: number;
  strain?: number;
  robe?: string;
  phase?: number;
  hat?: "none" | "straw" | "wide";
  kid?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, bend = 0.35, strain = 0, robe = "#3f5f9a", phase = 0, hat = "none", kid = false }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Villager position={[0, 0, 0]} rotationY={0} strain={strain} walk={0} robe={robe} phase={phase} hat={hat} kid={kid} />
    <Rod position={[0.24, kid ? 0.78 : 0.96, 0.22]} rotationY={0} bend={bend} />
  </group>
);

/** A lantern on a pole, for the jetty at night. */
export const JettyLantern: React.FC<{ position: Vec3; lit?: number }> = ({ position, lit = 1 }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 0.9, 0]} size={[0.1, 1.8, 0.1]} />
    <Vox kind="wool" tint="#ffe0a0" position={[0, 1.9, 0]} size={[0.26, 0.3, 0.26]} emissive="#ffcf6a" emissiveIntensity={lit} castShadow={false} />
  </group>
);

/**
 * Sleeping pose calibrated for `BedBox` (`y = 0.142` on `yTop = 0.55` mattress, `0.63` pillow):
 * keeps torso/legs flush on mattress while propping shoulders slightly so head rests ON the pillow (`yMin >= 0.61`).
 */
export function sleepingPose(t: number): Pose {
  const tilt = 0.26;
  return {
    bodyY: -0.125 + Math.sin(t * 1.1) * 0.005,
    bodyPitch: -Math.PI / 2 + tilt,
    bodyRoll: 0,
    bodyYaw: 0,
    torso: [0, 0, 0],
    head: [0.08, -0.12 * Math.sin(t * 0.55), 0],
    armR: [-tilt, 0, 0.22],
    armL: [-tilt, 0, -0.22],
    legR: [-tilt, 0, 0.02],
    legL: [-tilt, 0, -0.02],
    kneeR: [0, 0, 0],
    kneeL: [0, 0, 0],
  };
}

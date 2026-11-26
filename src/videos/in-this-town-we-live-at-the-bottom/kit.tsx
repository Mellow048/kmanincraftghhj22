import type React from "react";
import { MinecraftAvatar, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { ADULT, Bucket, KID, Villager, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * In This Town, We Live at the Bottom — cast, places and the six things the story turns on.
 *
 * The world is three places, and each one is its own zone:
 *
 *   bottom  A fishing town at the foot of a mountain: a lane of huts, a stall, a wooden jetty out into the water,
 *           one boat with a hole in it, and the mountain's ladder going up out of frame. The sun hits the top of the
 *           mountain an hour before it reaches the town.
 *   room    The teller's house: one bed, one shelf, one jar marked THE TOP.
 *   top     The gate: iron bars, stone, a keeper in a clean coat, and behind him a street.
 *
 * The lens lives at +Z. The lane runs east–west (x), the water is south (+Z), the mountain is north (−Z).
 */

export { Bucket, Lantern, Rain, Stall, SubscribeSign, BedBox, Villager, LampPost, Hut, Bits } from "../../../Topics/InThisTown";
export { ADULT, CHILD, KID, ease, ramp, DEG, EAST, NORTH, SOUTH, WEST } from "../../../Topics/InThisTown";

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
  highStep: [1.2, 24, -30] as Vec3,
  /** The room: its own zone. */
  room: [0, 0, 80] as Vec3,
  /** The gate: its own zone. */
  gate: [0, 0, -300] as Vec3,
  /** The street behind the gate, seen through the bars. */
  street: [0, 0, -307] as Vec3,
};
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];
export const top = (x: number, y: number, z: number): Vec3 => [PLACE.gate[0] + x, PLACE.gate[1] + y, PLACE.gate[2] + z];

// ----------------------------------------------------------------------------- the people

type A = Partial<MinecraftAvatarProps>;

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

/** The woman who fixes everybody: old, brown robe, a bag of herbs. */
export const Healer: React.FC<{ position?: Vec3; rotationY?: number; strain?: number; nod?: number; hmm?: number; lookAt?: Vec3 }> = (p) => (
  <Villager robe="#6b4c37" hat="none" {...p} />
);

export type Spot = [number, number];

/** The town, working the jetty. [x, z] */
export const JETTY_CROWD: Spot[] = [
  [-0.9, 6.2], [0.8, 7.4], [-0.6, 8.8], [1.0, 10.2], [-0.8, 11.6], [0.7, 12.8], [-1.0, 14.0],
];
/** The town, standing in the lane, facing south at the lens. */
export const LANE_CROWD: Spot[] = [
  [-3.4, -3.0], [-2.2, -3.6], [2.4, -3.2], [3.6, -2.4], [-1.0, -3.9], [1.2, -4.2], [4.6, -3.6], [-4.4, -2.2],
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

/** A jar, and what is written on it. `label` 0–1 peels the label off. */
export const Jar: React.FC<{ position: Vec3; fill?: number; label?: number; scale?: number }> = ({
  position, fill = 0.55, label = 1, scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Vox kind="wool" tint="#cfe8e6" position={[0, 0.24, 0]} size={[0.34, 0.48, 0.34]} opacity={0.6} castShadow={false} />
    <Vox kind="cobble" position={[0, 0.06 + fill * 0.16, 0]} size={[0.3, fill * 0.3, 0.3]} tint="#5fb0a8" />
    <Vox kind="darkPlanks" position={[0, 0.5, 0]} size={[0.36, 0.06, 0.36]} />
    {label > 0 ? (
      <group position={[0, 0.26, 0.175]} rotation={[0, 0, 0.04]}>
        <Vox kind="wool" tint="#efe6d2" position={[0, 0, 0]} size={[0.26 * label, 0.2, 0.01]} />
        <Vox kind="wool" tint="#3a3128" position={[-0.06 * label, 0.03, 0.008]} size={[0.1, 0.02, 0.006]} />
        <Vox kind="wool" tint="#3a3128" position={[-0.06 * label, -0.02, 0.008]} size={[0.07, 0.02, 0.006]} />
      </group>
    ) : null}
  </group>
);

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

/** The basket on its rope, come down from the top once a year. */
export const Basket: React.FC<{ position: Vec3; rope?: number; swing?: number }> = ({ position, rope = 6, swing = 0 }) => (
  <group position={position} rotation={[0, 0, swing * 0.08]}>
    <Vox kind="hay" position={[0, 0.3, 0]} size={[1.1, 0.6, 1.1]} />
    <Vox kind="log" position={[0, 0.62, 0.52]} size={[1.1, 0.06, 0.06]} />
    <Vox kind="log" position={[0, 0.62, -0.52]} size={[1.1, 0.06, 0.06]} />
    <Vox kind="log" position={[0.52, 0.62, 0]} size={[0.06, 0.06, 1.1]} />
    <Vox kind="log" position={[-0.52, 0.62, 0]} size={[0.06, 0.06, 1.1]} />
    <Vox kind="wool" tint="#c8b894" position={[0, 0.62 + rope / 2, 0]} size={[0.05, rope, 0.05]} castShadow={false} />
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

/** The gate: bars in a stone frame. `open` 0 closed, 1 swung wide. */
export const Gate: React.FC<{ position: Vec3; open?: number }> = ({ position, open = 0 }) => (
  <group position={position}>
    <Vox kind="stone" position={[0, 3.2, 0]} size={[6.2, 0.5, 1.0]} />
    <Vox kind="stoneBrick" position={[-2.9, 1.6, 0]} size={[0.45, 3.2, 1.0]} />
    <Vox kind="stoneBrick" position={[2.9, 1.6, 0]} size={[0.45, 3.2, 1.0]} />
    <group position={[-2.3, 0, 0]} rotation={[0, -open * 1.1, 0]}>
      {[-2.1, -1.4, -0.7, 0, 0.7, 1.4, 2.1].map((x) => (
        <Vox key={x} kind="cobble" tint="#8b8f96" position={[x, 1.5, 0]} size={[0.07, 3.0, 0.07]} castShadow={false} />
      ))}
      <Vox kind="cobble" tint="#8b8f96" position={[0, 3.0, 0]} size={[4.5, 0.08, 0.08]} castShadow={false} />
      <Vox kind="cobble" tint="#8b8f96" position={[0, 0.9, 0]} size={[4.5, 0.08, 0.08]} castShadow={false} />
    </group>
  </group>
);

/** The price board beside the gate. `digits` are 0–9, drawn as blocks so no text is needed. */
export const PriceBoard: React.FC<{ position: Vec3; digits: number[]; rotationY?: number }> = ({ position, digits, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 1.3, 0]} size={[1.5, 1.1, 0.1]} />
    <Vox kind="log" position={[0, 0.6, 0]} size={[0.12, 1.2, 0.12]} />
    {digits.map((d, i) => {
      const x = -0.45 + i * 0.45;
      const rows = Math.max(1, d);
      return (
        <group key={i} position={[x, 1.0, 0.07]}>
          {Array.from({ length: Math.min(4, rows) }, (_, r) => (
            <Vox key={r} kind="wool" tint="#2b2620" position={[0, r * 0.13, 0]} size={[0.22, 0.1, 0.02]} castShadow={false} />
          ))}
        </group>
      );
    })}
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

/** A lantern on a pole, for the jetty at night. */
export const JettyLantern: React.FC<{ position: Vec3; lit?: number }> = ({ position, lit = 1 }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 0.9, 0]} size={[0.1, 1.8, 0.1]} />
    <Vox kind="wool" tint="#ffe0a0" position={[0, 1.9, 0]} size={[0.26, 0.3, 0.26]} emissive="#ffcf6a" emissiveIntensity={lit} castShadow={false} />
  </group>
);

import type React from "react";
import { Block, Door, Glow, MinecraftAvatar, PixelText, Sign, Vox, getPose } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { Bits, ease, ramp, wordClock } from "../../../Topics/Recreation";
import { Dog } from "../../../Topics/WhatIf/things";
import timingJson from "./timing.json";

/**
 * This film's own cast and things. A real-life story, in blocks: nothing here is from the game.
 *
 * Four places (zones in world.tsx). In every one the lens stands in the SOUTH (+z) and looks north, and the wall it
 * stands in is not built.
 *   shop     The barbershop. The lens is the mirror: three chairs face it, the barber stands behind the chair, and
 *            the door and the big window to the street are in the back wall.
 *   front    The same shop from the pavement, for the sign in the window and the queue.
 *   room     Our living room: the television on the left, the sofa, Dad's armchair on the right, the table in front.
 *   home     Our side of the street at night. The lens is in our doorway, or at the back of our garage, and the
 *            party house is across the road behind whoever stands there.
 *
 * Built here: people whose hair can be cut (the bush, the cut, Dad's stripe, hats), the scissors, the barber chair
 * and cape, the mop with a face, the mannequin heads, the comb, the television, the calendar, block lettering.
 * From other packs: the staging helpers (Recreation), the dog (What If).
 */

export { DEG, EAST, NORTH, SOUTH, WEST, ease, ramp, pop, jolt, Bits } from "../../../Topics/Recreation";
export { Block, Glow, GodRay, LightPool, PixelText, Vox } from "../../engine";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its LINE at which a word is said. In a shot that starts with `cut:`, subtract the cut. */
export const w = (cue: string, word: string, nth = 0) => wordAt(cue, word, nth);
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
const CUES = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues;
export const cueLen = (cue: string): number => {
  const c = CUES.find((x) => x.id === cue);
  if (!c) throw new Error(`cueLen: no cue "${cue}"`);
  return c.end - c.start;
};
/** Seconds into a line at which its last word has been said: where the action with no words over it starts. */
export const said = (cue: string): number => {
  const c = CUES.find((x) => x.id === cue);
  if (!c) throw new Error(`said: no cue "${cue}"`);
  let end = 0;
  for (const word of timing.words) if (word.s >= c.start - 0.05 && word.s < c.end) end = Math.max(end, word.e - c.start);
  return end;
};
/** One hop: 0 outside, a sine arc of height `h` for `d` seconds from `at`. */
export const hop = (t: number, at: number, h = 0.3, d = 0.3) => {
  const k = (t - at) / d;
  return k <= 0 || k >= 1 ? 0 : Math.sin(k * Math.PI) * h;
};
export const rnd = (i: number, k = 1) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
/** Walking from a to b: where, which way, how far. */
export const go = (a: Vec3, b: Vec3, k: number): { position: Vec3; rotationY: number; animDistance: number } => {
  const q = Math.min(1, Math.max(0, k));
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  return { position: [a[0] + dx * q, a[1] + (b[1] - a[1]) * q, a[2] + dz * q], rotationY: Math.atan2(dx, dz), animDistance: Math.hypot(dx, dz) * q };
};
export const add = (p: Vec3, x = 0, y = 0, z = 0): Vec3 => [p[0] + x, p[1] + y, p[2] + z];

// ----------------------------------------------------------------------------- places

export const SHOP: Vec3 = [0, 0, 0];
export const ROOM: Vec3 = [60, 0, 0];
export const HOME: Vec3 = [0, 0, 60];
export const room = (x: number, y: number, z: number): Vec3 => [ROOM[0] + x, ROOM[1] + y, ROOM[2] + z];
export const home = (x: number, y: number, z: number): Vec3 => [HOME[0] + x, HOME[1] + y, HOME[2] + z];

export const PLACE = {
  /** shop: the three chairs (the middle one is ours), and where the barber stands behind a chair. */
  chair: [0, 0, 0] as Vec3,
  chairL: [-2.1, 0, 0] as Vec3,
  chairR: [2.1, 0, 0] as Vec3,
  behind: [0, 0, -0.62] as Vec3,
  /** shop: the middle of the door in the back wall; the window to the street (its middle, at eye height). */
  door: [-2.3, 0, -4.6] as Vec3,
  window: [1.4, 1.85, -4.6] as Vec3,
  /** room: the sofa (it faces west, at the television), Dad's armchair (faces the lens), the television on the west
   *  wall, the table, the drawer unit in the back left corner, the calendar on the back wall. */
  sofa: room(0.5, 0, 0.5),
  armchair: room(1.9, 0, -1.0),
  tv: room(-3.15, 0, 0.5),
  table: room(0, 0, 0.3),
  drawer: room(-2.3, 0, -2.25),
  calendar: room(2.3, 1.75, -2.585),
  /** home: the step outside our door (its top), the hall inside it. */
  step: home(0, 0.12, -0.05),
  hall: home(0, 0.12, 1.9),
  /** garage: the middle of the floor, where the mop stands; the shelf under the window (its top). */
  garage: home(8, 0, 0),
  shelf: home(8, 1.14, -2.1),
  party: home(4, 0, -15),
};

// ----------------------------------------------------------------------------- hair, and hats

/** The head cube is 0.45 m. Everything worn on a head is in the head's own space: +Z is the face, 0 is its middle. */
const HEAD = 0.45;
const mix = (a: string, b: string, k: number) => {
  const p = (s: string, i: number) => parseInt(s.slice(1 + i * 2, 3 + i * 2), 16);
  const c = (i: number) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * k).toString(16).padStart(2, "0");
  return `#${c(0)}${c(1)}${c(2)}`;
};

/**
 * THE WRECKED HAIR: a bush nearly twice the size of the head, with tufts standing out of it.
 * `amount` 1 is all of it; it comes off in chunks as `amount` goes to 0, tufts first.
 */
const BUSH: Array<[number, number, number, number, number, number]> = [
  // x, y, z, w, h, d — the last ones go first
  [0, 0.3, -0.03, 0.62, 0.2, 0.6],
  [0, 0.05, -0.3, 0.6, 0.5, 0.16],
  [-0.3, 0.08, -0.04, 0.16, 0.42, 0.5],
  [0.3, 0.08, -0.04, 0.16, 0.42, 0.5],
  [0, 0.45, -0.05, 0.8, 0.22, 0.76],
  [0.02, 0.24, 0.27, 0.56, 0.14, 0.12],
  [-0.4, 0.3, 0.0, 0.2, 0.3, 0.34],
  [0.42, 0.26, -0.1, 0.2, 0.34, 0.3],
  [-0.2, 0.66, 0.1, 0.2, 0.26, 0.2],
  [0.24, 0.64, -0.14, 0.22, 0.3, 0.22],
  [0.02, 0.72, -0.02, 0.16, 0.34, 0.16],
  [-0.46, 0.5, -0.2, 0.16, 0.2, 0.16],
  [0.5, 0.52, 0.12, 0.14, 0.2, 0.14],
];
export const Bush: React.FC<{ color: string; amount?: number; snag?: boolean }> = ({ color, amount = 1, snag = false }) => {
  const n = Math.max(0, Math.min(BUSH.length, Math.ceil(amount * BUSH.length)));
  return (
    <group>
      {BUSH.slice(0, n).map(([x, y, z, bw, bh, bd], i) => (
        <Block key={i} position={[x, y, z]} rotation={[rnd(i, 3) * 0.3 - 0.15, rnd(i, 5) * 0.5 - 0.25, rnd(i, 7) * 0.36 - 0.18]} size={[bw, bh, bd]} color={mix(color, i % 2 ? "#000000" : "#ffffff", 0.08 + 0.06 * (i % 3))} />
      ))}
      {/* the safety scissors he lost in it */}
      {snag && amount > 0.9 ? (
        <group position={[0.3, 0.52, 0.3]} rotation={[0.3, 0.4, 0.9]}>
          <Scissors open={0.5} handle="#3f8ae0" scale={0.8} />
        </group>
      ) : null}
    </group>
  );
};

/** THE HAIRCUT: a flat top a hair wider than the head, a quiff, the sides taken down to almost nothing, one razor line. */
export const Cut: React.FC<{ color: string; skin: string }> = ({ color, skin }) => {
  const faded = mix(color, skin, 0.62);
  const low = mix(color, skin, 0.85);
  return (
    <group>
      <Block position={[0, 0.25, -0.01]} size={[0.47, 0.07, 0.47]} color={color} />
      <Block position={[0, 0.3, 0.15]} size={[0.38, 0.1, 0.18]} color={mix(color, "#ffffff", 0.1)} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block position={[s * 0.228, 0.1, -0.03]} size={[0.012, 0.22, 0.4]} color={faded} castShadow={false} />
          <Block position={[s * 0.229, -0.06, -0.06]} size={[0.012, 0.12, 0.3]} color={low} castShadow={false} />
        </group>
      ))}
      <Block position={[0, 0.02, -0.228]} size={[0.44, 0.36, 0.012]} color={faded} castShadow={false} />
      <Block position={[0, -0.14, -0.229]} size={[0.44, 0.1, 0.012]} color={low} castShadow={false} />
      <Block position={[0.236, 0.1, 0.04]} rotation={[0.35, 0, 0]} size={[0.01, 0.022, 0.24]} color={skin} castShadow={false} />
    </group>
  );
};

/** What one snip did to Dad: a strip of scalp from the forehead to the back of the neck. */
export const Stripe: React.FC<{ skin: string }> = ({ skin }) => (
  <group>
    <Block position={[0, 0.228, 0]} size={[0.13, 0.012, 0.462]} color={skin} castShadow={false} />
    <Block position={[0, 0.17, 0.228]} size={[0.13, 0.115, 0.012]} color={skin} castShadow={false} />
    <Block position={[0, 0.1, -0.228]} size={[0.13, 0.26, 0.012]} color={skin} castShadow={false} />
  </group>
);

/** My own fringe, cut too short and not straight. */
export const ShortFringe: React.FC<{ skin: string }> = ({ skin }) => (
  <group>
    <Block position={[-0.06, 0.17, 0.228]} size={[0.3, 0.11, 0.012]} color={skin} castShadow={false} />
    <Block position={[0.16, 0.2, 0.228]} size={[0.12, 0.055, 0.012]} color={skin} castShadow={false} />
  </group>
);

/** Dad's woolly hat. It stayed on until spring. */
export const Beanie: React.FC<{ color?: string }> = ({ color = "#c8362e" }) => (
  <group>
    <Block position={[0, 0.22, 0]} size={[0.5, 0.2, 0.5]} color={color} />
    <Block position={[0, 0.115, 0]} size={[0.53, 0.09, 0.53]} color="#f2efe6" />
    <Block position={[0, 0.38, 0]} size={[0.15, 0.15, 0.15]} color="#f2efe6" />
  </group>
);

export const Cap: React.FC<{ color?: string }> = ({ color = "#2f5fd0" }) => (
  <group>
    <Block position={[0, 0.2, -0.01]} size={[0.49, 0.16, 0.49]} color={color} />
    <Block position={[0, 0.14, 0.33]} size={[0.42, 0.035, 0.22]} color={mix(color, "#000000", 0.25)} />
  </group>
);

export const PartyHat: React.FC<{ color?: string; stripe?: string }> = ({ color = "#ff4fa0", stripe = "#ffe14a" }) => (
  <group position={[0, 0.225, 0]}>
    {[0, 1, 2, 3].map((i) => (
      <Block key={i} position={[0, 0.045 + i * 0.09, 0]} size={[0.3 - i * 0.07, 0.09, 0.3 - i * 0.07]} color={i % 2 ? stripe : color} />
    ))}
    <Block position={[0, 0.41, 0]} size={[0.09, 0.09, 0.09]} color="#ffffff" />
  </group>
);

/** The man who had grown a beard waiting. It reaches his knees. */
export const LongBeard: React.FC<{ color?: string }> = ({ color = "#b8b2a6" }) => (
  <group>
    <Block position={[0, -0.2, 0.235]} size={[0.4, 0.14, 0.03]} color={color} castShadow={false} />
    <Block position={[0, -0.58, 0.25]} size={[0.34, 0.7, 0.06]} color={color} />
    <Block position={[0, -0.98, 0.25]} size={[0.2, 0.14, 0.06]} color={mix(color, "#000000", 0.1)} />
  </group>
);

// ----------------------------------------------------------------------------- the scissors, and what flies

/**
 * A pair of scissors, bigger than life so a phone can see them. The pivot is the origin and the blades point up (+Y).
 * `open` is radians between the blades.
 */
export const Scissors: React.FC<{ open?: number; handle?: string; scale?: number; blade?: string }> = ({ open = 0.2, handle = "#1c1c22", scale = 1, blade = "#dfe6ee" }) => (
  <group scale={scale}>
    {[-1, 1].map((s) => (
      <group key={s} rotation={[0, 0, (s * open) / 2]}>
        <Block position={[0, 0.13, s * 0.008]} size={[0.045, 0.26, 0.014]} color={blade} metalness={0.5} roughness={0.35} castShadow={false} />
        <Block position={[0, 0.27, s * 0.008]} size={[0.026, 0.05, 0.014]} color={blade} metalness={0.5} roughness={0.35} castShadow={false} />
        <Block position={[-s * 0.03, -0.045, s * 0.008]} size={[0.03, 0.09, 0.02]} color={handle} castShadow={false} />
        <Block position={[-s * 0.065, -0.115, s * 0.008]} size={[0.1, 0.03, 0.02]} color={handle} castShadow={false} />
        <Block position={[-s * 0.065, -0.185, s * 0.008]} size={[0.1, 0.03, 0.02]} color={handle} castShadow={false} />
        <Block position={[-s * 0.1, -0.15, s * 0.008]} size={[0.03, 0.1, 0.02]} color={handle} castShadow={false} />
      </group>
    ))}
    <Block position={[0, 0, 0.02]} size={[0.03, 0.03, 0.012]} color="#8a919c" castShadow={false} />
  </group>
);

/** How far open the blades are at `t`, if they snip `rate` times a second. */
export const snipOpen = (t: number, rate = 8) => 0.08 + 0.55 * Math.abs(Math.sin(t * Math.PI * rate));

/** The scissors as he holds them: give this to an avatar as its child. `t` drives the snipping; `rate` 0 holds them shut. */
export const InHand: React.FC<{ t?: number; rate?: number; handle?: string; scale?: number; open?: number }> = ({ t = 0, rate = 0, handle, scale = 1, open }) => (
  <group position={[0, -0.03, 0.05]} rotation={[1.0, 0, 0]}>
    <Scissors open={open ?? (rate > 0 ? snipOpen(t, rate) : 0.1)} handle={handle} scale={scale} />
  </group>
);

/** Hair coming off: chunks that fly out from `position`, one burst for each time in `at`. `toward` throws them at the lens. */
export const HairFly: React.FC<{ position: Vec3; t: number; at: number[]; color: string; count?: number; toward?: Vec3; power?: number }> = ({ position, t, at, color, count = 9, toward = [0, 0.4, 1.6], power = 1 }) => (
  <>
    {at.map((a, i) => (
      <Bits key={i} position={position} t={t - a} color={color} count={count} seed={i * 3 + 2} power={power} toward={toward} />
    ))}
  </>
);

/** White streaks around a pair of hands that move too fast to see. `t` makes them jump every frame. */
export const SpeedLines: React.FC<{ position: Vec3; t: number; size?: number; count?: number; color?: string }> = ({ position, t, size = 0.5, count = 7, color = "#ffffff" }) => {
  const f = Math.floor(t * 30);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const a = rnd(i + f * 13, 2) * Math.PI * 2;
        const r = size * (0.45 + rnd(i + f * 7, 4) * 0.55);
        return (
          <Block key={i} position={[Math.cos(a) * r, Math.sin(a) * r * 0.8, rnd(i + f, 6) * 0.2]} rotation={[0, 0, a + Math.PI / 2 + 0.5]} size={[0.02, size * (0.3 + rnd(i + f * 3, 8) * 0.4), 0.01]} color={color} emissive={color} emissiveIntensity={0.5} castShadow={false} />
        );
      })}
    </group>
  );
};

/** A four-point sparkle on something that has just been done perfectly. `k` 0–1 is its size. */
export const Sparkle: React.FC<{ position: Vec3; k: number; size?: number; rotationY?: number }> = ({ position, k, size = 0.26, rotationY = 0 }) =>
  k <= 0.02 ? null : (
    <group position={position} rotation={[0, rotationY, 0.0]} scale={k}>
      <Block size={[size, size * 0.14, 0.01]} color="#fff8d8" emissive="#fff2b0" emissiveIntensity={0.8} castShadow={false} />
      <Block size={[size * 0.14, size, 0.01]} color="#fff8d8" emissive="#fff2b0" emissiveIntensity={0.8} castShadow={false} />
      <Block rotation={[0, 0, Math.PI / 4]} size={[size * 0.45, size * 0.1, 0.01]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} castShadow={false} />
      <Block rotation={[0, 0, -Math.PI / 4]} size={[size * 0.45, size * 0.1, 0.01]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} castShadow={false} />
      <Glow position={[0, 0, 0.05]} size={size * 2.2} color="#fff2b0" opacity={0.35} />
    </group>
  );

/** "Zzz", a tear, a sweat drop: one small block that rises or falls from `position` and is gone. */
export const Drop: React.FC<{ position: Vec3; t: number; every?: number; fall?: number; color?: string; size?: number; drift?: number; phase?: number }> = ({ position, t, every = 0.7, fall = -0.5, color = "#7fc8ff", size = 0.05, drift = 0, phase = 0 }) => {
  const k = ((t + phase) % every) / every;
  if (t + phase < 0) return null;
  return <Block position={[position[0] + drift * k, position[1] + fall * k * k, position[2]]} size={[size, size * 1.5, size]} color={color} emissive={color} emissiveIntensity={0.25} opacity={1 - k * 0.6} transparent castShadow={false} />;
};

// ----------------------------------------------------------------------------- lettering

/**
 * A line of block lettering on a dark plate, for the two meme lines. It faces +Z (the usual lens). Put it over the
 * heads: the captions own the lower third. `k` 0–1 pops it in.
 */
export const Plate: React.FC<{ lines: string[]; position: Vec3; width?: number; k?: number; rotationY?: number; color?: string; plate?: string; tilt?: number }> = ({ lines, position, width = 1.5, k = 1, rotationY = 0, color = "#ffffff", plate = "#101018", tilt = 0 }) => {
  if (k <= 0.02) return null;
  const lh = width * 0.2;
  const h = lines.length * lh + lh * 0.3;
  return (
    <group position={position} rotation={[0, rotationY, tilt]} scale={k}>
      <Block size={[width + 0.1, h, 0.03]} color={plate} castShadow={false} />
      {lines.map((line, i) => (
        <PixelText key={i} text={line} position={[0, ((lines.length - 1) / 2 - i) * lh, 0.022]} height={lh * 0.92} maxWidth={width} color={color} />
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------------- cast

type A = Partial<MinecraftAvatarProps>;

export const ME_SCALE = 0.88;
export const DAD_SCALE = 1.0;
export const F1_SCALE = 0.86;
export const F2_SCALE = 0.96;
/** Where a face is, for somebody standing at `p`. Sitting in a chair of this film: `seated`. */
export const faceOf = (p: Vec3, scale = ME_SCALE): Vec3 => [p[0], p[1] + 1.575 * scale, p[2]];
export const chestOf = (p: Vec3, scale = ME_SCALE): Vec3 => [p[0], p[1] + 1.1 * scale, p[2]];

export const SKIN = { me: "#e2b08a", dad: "#d9a27a", f1: "#f0c8a4", f2: "#c98f62" };
export const HAIR = { me: "#4a2a14", dad: "#2e1d12", f1: "#3ed24a", f2: "#f2c81e" };
const YELLOW = "#f2b81c";

/**
 * Me. Yellow, and nobody else in the film wears it. `job` puts the black barber's apron over it.
 * `hair`: "own" is as he is, "short" is the fringe he cut himself, "cap" is what he wore after.
 */
export const Hero: React.FC<A & { job?: boolean; look?: "own" | "short" | "cap" }> = ({ job = false, look = "own", ...p }) => (
  <MinecraftAvatar
    scale={ME_SCALE}
    outfit="hoodie"
    skin={SKIN.me}
    hair={HAIR.me}
    colors={{ torso: job ? "#17171c" : YELLOW, arms: YELLOW, legs: "#2f3f8a" }}
    shoes="#f4f4f4"
    blink
    face="calm"
    head={look === "cap" ? <Cap /> : look === "short" ? <ShortFringe skin={SKIN.me} /> : undefined}
    {...p}
  />
);

/** Dad. `top`: "hair" as he was, "stripe" after the snip, "hat" until spring, "cut" once he sat back down. */
export const Dad: React.FC<A & { top?: "hair" | "stripe" | "hat" | "cut" }> = ({ top = "hair", ...p }) => (
  <MinecraftAvatar
    scale={DAD_SCALE}
    outfit="tee"
    skin={SKIN.dad}
    hair={HAIR.dad}
    colors={{ torso: "#3f7a4f", arms: "#3f7a4f", legs: "#4a4a58" }}
    shoes="#3a2a1e"
    blink
    face="neutral"
    phase={1.7}
    head={top === "stripe" ? <Stripe skin={SKIN.dad} /> : top === "hat" ? <Beanie /> : top === "cut" ? <Cut color={HAIR.dad} skin={SKIN.dad} /> : undefined}
    {...p}
  />
);

/** Friend 1: the loud one. Green hair, purple shirt, a party hat. `hat` false in the shop's last shots. */
export const Friend1: React.FC<A & { hat?: boolean; cut?: boolean }> = ({ hat = true, cut = false, ...p }) => (
  <MinecraftAvatar
    scale={F1_SCALE}
    outfit="tee"
    skin={SKIN.f1}
    hair={HAIR.f1}
    colors={{ torso: "#7a3fd0", arms: "skin", legs: "#23262f" }}
    shoes="#ff4fa0"
    blink
    face="grin"
    phase={0.6}
    head={
      <>
        {cut ? <Cut color={HAIR.f1} skin={SKIN.f1} /> : null}
        {hat ? <PartyHat /> : null}
      </>
    }
    {...p}
  />
);

/**
 * Friend 2: the big one, and the head of frame one. `hair`: "own" at the door a year ago, "bush" after he cut it
 * himself (`bush` 0–1 is how much is left), "cut" when I am done.
 */
export const Friend2: React.FC<A & { hair?: "own" | "bush" | "cut"; bush?: number; snag?: boolean; hat?: boolean }> = ({ hair = "own", bush = 1, snag = false, hat = false, ...p }) => (
  <MinecraftAvatar
    scale={F2_SCALE}
    outfit="tee"
    skin={SKIN.f2}
    hair={HAIR.f2}
    colors={{ torso: "#e8433a", arms: "#e8433a", legs: "#2e3c6e" }}
    shoes="#ffe14a"
    blink
    face="grin"
    phase={2.9}
    head={
      <>
        {hair === "bush" ? <Bush color={HAIR.f2} amount={bush} snag={snag} /> : hair === "cut" ? <Cut color={HAIR.f2} skin={SKIN.f2} /> : null}
        {hat ? <PartyHat color="#3fb8ff" stripe="#ffffff" /> : null}
      </>
    }
    {...p}
  />
);

/** Twelve other people: customers, barbers, the party. `who` picks one. `top` gives him a head of hair to lose. */
const PEOPLE: Array<{ skin: string; hair: string; torso: string; legs: string }> = [
  { skin: "#e0ac7e", hair: "#8a3b1e", torso: "#3f6fb8", legs: "#3a3a48" },
  { skin: "#8a5a3c", hair: "#1f1a18", torso: "#4fd6d0", legs: "#2a2a3a" },
  { skin: "#f0c8a4", hair: "#e08a2a", torso: "#5fa03c", legs: "#6a4a2e" },
  { skin: "#b97a56", hair: "#2b2b2b", torso: "#e85a9a", legs: "#3a3344" },
  { skin: "#ecc19a", hair: "#c2452a", torso: "#8a8fa0", legs: "#2f2f38" },
  { skin: "#6b4a34", hair: "#151210", torso: "#f07a2a", legs: "#3a3344" },
  { skin: "#e3b48c", hair: "#6a3fa0", torso: "#23262f", legs: "#4a5a8a" },
  { skin: "#d9a27a", hair: "#7a7a7a", torso: "#a03f4f", legs: "#4a3a2a" },
];
export const personOf = (who: number) => PEOPLE[((who % PEOPLE.length) + PEOPLE.length) % PEOPLE.length];
export const Person: React.FC<A & { who: number; top?: "own" | "bush" | "cut" | "beard" | "party"; bush?: number; coat?: boolean }> = ({ who, top = "own", bush = 1, coat = false, ...p }) => {
  const c = personOf(who);
  return (
    <MinecraftAvatar
      scale={0.92 + (who % 3) * 0.03}
      outfit="tee"
      skin={c.skin}
      hair={c.hair}
      colors={{ torso: coat ? "#f2f2ee" : c.torso, arms: coat ? "#f2f2ee" : c.torso, legs: c.legs }}
      blink
      face="neutral"
      phase={who * 1.37 + 0.2}
      head={top === "bush" ? <Bush color={c.hair} amount={bush} /> : top === "cut" ? <Cut color={c.hair} skin={c.skin} /> : top === "beard" ? <LongBeard /> : top === "party" ? <PartyHat color={c.torso} /> : undefined}
      {...p}
    />
  );
};

/** The dog, with the haircut I gave it: a flat top and a line down each side. */
export const FadeDog: React.FC<{ position: Vec3; rotationY?: number; walked?: number; headYaw?: number; headTilt?: number; scale?: number; cut?: boolean }> = ({ position, rotationY = 0, walked, headYaw = 0, headTilt = 0, scale = 1.25, cut = true }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Dog position={[0, 0, 0]} walked={walked} headYaw={headYaw} headTilt={headTilt} wag={1.4} />
    {cut ? (
      <>
        {/* the flat top, on the head */}
        <group position={[0, 0.5, 0.33]} rotation={[0, headYaw, headTilt]}>
          <Block position={[0, 0.2, 0.06]} size={[0.2, 0.09, 0.2]} color="#3a2414" />
          <Block position={[0, 0.25, 0.13]} size={[0.16, 0.05, 0.08]} color="#523420" />
        </group>
        {/* the trunk, taken down to a stripe: a mohawk along the back, the sides shaved pale */}
        <Block position={[0, 0.52, -0.04]} size={[0.07, 0.06, 0.5]} color="#3a2414" />
        {[-1, 1].map((s) => (
          <Block key={s} position={[s * 0.153, 0.36, -0.02]} size={[0.01, 0.2, 0.52]} color="#e9d2b0" castShadow={false} />
        ))}
      </>
    ) : null}
  </group>
);

// ----------------------------------------------------------------------------- poses

/** Standing behind a chair and cutting: both hands up at the head in front of him, jumping about. `fast` 0–1. */
export const cuttingPose = (t: number, fast = 1, reach = 1): Pose => {
  const p = getPose("idle", t);
  const r = 26 * fast + 3;
  p.bodyPitch = 0.1 * reach;
  p.armR = [-1.2 * reach + Math.sin(t * r) * 0.3 * fast, 0, 0.34 + Math.cos(t * r * 0.7) * 0.16 * fast];
  p.armL = [-1.1 * reach + Math.cos(t * r * 0.9) * 0.3 * fast, 0, -0.34 - Math.sin(t * r * 0.8) * 0.16 * fast];
  p.head = [0.32, Math.sin(t * r * 0.3) * 0.08 * fast, 0];
  p.bodyY = Math.abs(Math.sin(t * r * 0.5)) * 0.03 * fast;
  return p;
};

/** One arm: the right hand held up in front, at `up` (0 at the belt, 1 at the face, 1.5 over the head). */
export const holdUp = (t: number, up = 1, side = 0.1): Pose => {
  const p = getPose("idle", t);
  p.armR = [-0.5 - up * 1.25, 0, side];
  return p;
};

/** Sitting in an armchair or a barber chair. `sleep` lets the head fall back and to one side. */
export const seatedPose = (t: number, sleep = 0): Pose => {
  const p = getPose("sit", t);
  p.head = [-0.28 * sleep, 0, 0.22 * sleep];
  p.bodyPitch = -0.12 * sleep - 0.02;
  return p;
};

// ----------------------------------------------------------------------------- the shop's things

const CHROME = "#c9d0d8";
const LEATHER = "#a82a2a";

/** How high the seat is: somebody sitting in the barber chair has their feet at `position` + this. */
export const SEAT = 0.06;
/** The crate I stand on to reach: I am a kid, and the heads are a long way up. */
export const STOOL = 0.6;
export const Crate: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, STOOL / 2, 0]} size={[0.56, STOOL, 0.5]} color="#b48d52" />
    <Block position={[0, STOOL - 0.03, 0]} size={[0.6, 0.06, 0.54]} color="#8a6a3a" />
    <Block position={[0, 0.06, 0]} size={[0.6, 0.06, 0.54]} color="#8a6a3a" />
  </group>
);

/** A barber chair. It faces +Z. The person in it sits at `position` raised by SEAT. */
export const BarberChair: React.FC<{ position: Vec3; rotationY?: number; color?: string }> = ({ position, rotationY = 0, color = LEATHER }) => (
  <group position={[position[0], position[1] - 0.1, position[2]]} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.14, -0.02]} size={[0.62, 0.08, 0.62]} color="#2a2c33" metalness={0.4} roughness={0.5} />
    <Block position={[0, 0.3, -0.02]} size={[0.14, 0.46, 0.14]} color={CHROME} metalness={0.7} roughness={0.3} />
    <Block position={[0, 0.6, 0.0]} size={[0.64, 0.13, 0.6]} color={color} />
    <Block position={[0, 1.02, -0.3]} size={[0.62, 0.78, 0.12]} color={color} />
    <Block position={[0, 1.44, -0.3]} size={[0.4, 0.1, 0.13]} color={mixColor(color)} />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.36, 0.86, -0.02]} size={[0.08, 0.07, 0.56]} color="#2a2c33" />
        <Block position={[s * 0.36, 0.74, 0.2]} size={[0.05, 0.2, 0.05]} color={CHROME} metalness={0.7} roughness={0.3} />
      </group>
    ))}
    <Block position={[0, 0.3, 0.46]} size={[0.46, 0.05, 0.2]} color={CHROME} metalness={0.7} roughness={0.3} />
    <Block position={[0, 0.42, 0.34]} rotation={[0.7, 0, 0]} size={[0.06, 0.3, 0.05]} color={CHROME} metalness={0.7} roughness={0.3} />
  </group>
);
function mixColor(c: string) {
  return mix(c, "#000000", 0.25);
}

/**
 * The cape, on whoever is in the chair. `position` is the chair's. `off` 0–1 whips it off, up and to the side.
 * `scale` is the sitter's.
 */
export const Cape: React.FC<{ position: Vec3; off?: number; scale?: number; color?: string; side?: number }> = ({ position, off = 0, scale = 1, color = "#2f4fa8", side = 1 }) => {
  if (off >= 1) return null;
  const k = off * off;
  return (
    <group position={[position[0] + side * k * 1.9, position[1] + SEAT + k * 1.5 + Math.sin(off * Math.PI) * 0.5, position[2] + k * 0.6]} rotation={[-off * 1.2, 0, -side * off * 1.6]} scale={scale}>
      <Block position={[0, 1.02, 0.03]} size={[0.98, 0.62, 0.58]} color={color} />
      <Block position={[0, 0.82, 0.36]} size={[0.98, 0.3, 0.5]} color={color} />
      <Block position={[0, 1.335, 0.03]} size={[0.56, 0.04, 0.5]} color="#2a2c33" castShadow={false} />
      {[-0.3, 0, 0.3].map((x) => (
        <Block key={x} position={[x, 1.0, 0.325]} size={[0.05, 0.6, 0.012]} color="#e9e6da" castShadow={false} />
      ))}
    </group>
  );
};

/** The mop that stands in a bucket with a face drawn on it. `hair` 1 → 0 is how many strings it has left. */
export const MopHead: React.FC<{ position: Vec3; hair?: number; rotationY?: number; face?: "dots" | "worried" | "happy"; bucket?: boolean; lean?: number }> = ({ position, hair = 1, rotationY = 0, face = "dots", bucket = true, lean = 0 }) => {
  const strings = 14;
  const n = Math.round(hair * strings);
  return (
    <group position={position} rotation={[0, rotationY, lean]}>
      {bucket ? (
        <>
          <Block position={[0, 0.16, 0]} size={[0.4, 0.32, 0.4]} color="#3f7fd0" />
          <Block position={[0, 0.33, 0]} size={[0.44, 0.04, 0.44]} color="#2f5fa8" />
        </>
      ) : null}
      <Block position={[0, 0.7, 0]} size={[0.05, 1.1, 0.05]} color="#b48d52" />
      {/* the head */}
      <Block position={[0, 1.36, 0]} size={[0.34, 0.34, 0.3]} color="#cfc6ae" />
      <Block position={[-0.08, 1.4, 0.152]} size={[0.05, 0.06, 0.01]} color="#16161c" castShadow={false} />
      <Block position={[0.08, 1.4, 0.152]} size={[0.05, 0.06, 0.01]} color="#16161c" castShadow={false} />
      {face === "worried" ? (
        <>
          <Block position={[0, 1.27, 0.152]} size={[0.1, 0.05, 0.01]} color="#16161c" castShadow={false} />
          <Block position={[-0.08, 1.47, 0.152]} rotation={[0, 0, -0.4]} size={[0.07, 0.02, 0.01]} color="#16161c" castShadow={false} />
          <Block position={[0.08, 1.47, 0.152]} rotation={[0, 0, 0.4]} size={[0.07, 0.02, 0.01]} color="#16161c" castShadow={false} />
        </>
      ) : face === "happy" ? (
        <>
          <Block position={[0, 1.27, 0.152]} size={[0.16, 0.03, 0.01]} color="#16161c" castShadow={false} />
          <Block position={[-0.09, 1.29, 0.152]} size={[0.03, 0.05, 0.01]} color="#16161c" castShadow={false} />
          <Block position={[0.09, 1.29, 0.152]} size={[0.03, 0.05, 0.01]} color="#16161c" castShadow={false} />
        </>
      ) : (
        <Block position={[0, 1.28, 0.152]} size={[0.14, 0.03, 0.01]} color="#16161c" castShadow={false} />
      )}
      {/* the strings: its hair */}
      {Array.from({ length: n }, (_, i) => {
        const a = (i / strings) * Math.PI * 2 + 0.3;
        const side = Math.abs(Math.sin(a)) < 0.5 && Math.cos(a) > 0; // none over the face
        const len = side ? 0.12 : 0.34 + rnd(i, 3) * 0.3;
        return <Block key={i} position={[Math.sin(a) * 0.19, 1.55 - len / 2, Math.cos(a) * 0.17 - 0.02]} rotation={[Math.cos(a) * 0.12, 0, -Math.sin(a) * 0.14]} size={[0.07, len, 0.07]} color={i % 2 ? "#f6f1e2" : "#e2d9bf"} />;
      })}
      <Block position={[0, 1.56, -0.01]} size={[0.38, 0.06, 0.34]} color="#f6f1e2" />
    </group>
  );
};

/** A mannequin head on a stand. `style` 0 is the worst (one tuft) and 4 is a clean cut. */
export const Mannequin: React.FC<{ position: Vec3; style: number; rotationY?: number }> = ({ position, style, rotationY = 0 }) => {
  const skin = "#e8c9a8";
  const hair = ["#7a3b1e", "#2b2b2b", "#c8962a", "#8a3b6a", "#3a2414"][style % 5];
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Block position={[0, 0.03, 0]} size={[0.26, 0.06, 0.26]} color="#2a2c33" />
      <Block position={[0, 0.13, 0]} size={[0.12, 0.16, 0.12]} color={skin} />
      <group position={[0, 0.42, 0]}>
        <Block size={[0.42, 0.42, 0.42]} color={skin} />
        <Block position={[-0.09, 0.02, 0.212]} size={[0.06, 0.04, 0.01]} color="#3a3a44" castShadow={false} />
        <Block position={[0.09, 0.02, 0.212]} size={[0.06, 0.04, 0.01]} color="#3a3a44" castShadow={false} />
        <Block position={[0, -0.1, 0.212]} size={[0.1, 0.025, 0.01]} color="#b0705a" castShadow={false} />
        {style === 0 ? (
          <Block position={[0.08, 0.3, 0.02]} rotation={[0, 0, -0.3]} size={[0.08, 0.2, 0.08]} color={hair} />
        ) : style === 1 ? (
          <>
            <Block position={[-0.11, 0.24, 0]} size={[0.22, 0.08, 0.44]} color={hair} />
            <Block position={[-0.2, 0.36, -0.1]} size={[0.1, 0.2, 0.12]} color={hair} />
          </>
        ) : style === 2 ? (
          <>
            <Block position={[0, 0.24, 0]} size={[0.46, 0.08, 0.46]} color={hair} />
            <Block position={[0, 0.14, 0.2]} size={[0.46, 0.14, 0.08]} color={hair} />
            <Block position={[-0.21, 0.08, 0]} size={[0.05, 0.26, 0.46]} color={hair} />
            <Block position={[0.21, 0.08, 0]} size={[0.05, 0.26, 0.46]} color={hair} />
          </>
        ) : style === 3 ? (
          <>
            <Block position={[0, 0.25, 0]} size={[0.44, 0.08, 0.44]} color={hair} />
            <Block position={[0.1, 0.33, 0.06]} size={[0.2, 0.1, 0.2]} color={hair} />
            <Block position={[-0.16, 0.2, 0.2]} size={[0.1, 0.1, 0.05]} color={hair} />
          </>
        ) : (
          <group scale={0.933}>
            <Cut color={hair} skin={skin} />
          </group>
        )}
      </group>
    </group>
  );
};

/** A comb. `broken` snaps it in two. It lies flat; the teeth point -Z. */
export const Comb: React.FC<{ position: Vec3; rotation?: Vec3; color?: string; broken?: boolean; scale?: number }> = ({ position, rotation = [0, 0, 0], color = "#1c1c22", broken = false, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    {(broken ? [-0.11, 0.12] : [0]).map((x, k) => (
      <group key={k} position={[x, 0, 0]} rotation={[0, broken ? (k ? 0.5 : -0.3) : 0, 0]}>
        <Block size={[broken ? 0.18 : 0.4, 0.02, 0.04]} color={color} />
        {Array.from({ length: broken ? 4 : 9 }, (_, i) => (
          <Block key={i} position={[(i - (broken ? 1.5 : 4)) * 0.043, 0, -0.05]} size={[0.018, 0.018, 0.07]} color={color} castShadow={false} />
        ))}
      </group>
    ))}
  </group>
);

/** Hair on the floor: a drift of small dark blocks. `amount` 0–1. */
export const FloorHair: React.FC<{ position: Vec3; area?: [number, number]; amount?: number; depth?: number; seed?: number }> = ({ position, area = [3, 2], amount = 1, depth = 0.08, seed = 1 }) => {
  const colors = ["#3a2414", "#151210", "#c2452a", "#e08a2a", "#7a7a7a", "#f2c81e", "#6a3fa0"];
  const n = Math.round(60 * amount);
  return (
    <group position={position}>
      {Array.from({ length: n }, (_, i) => (
        <Block key={i} position={[(rnd(i, seed) - 0.5) * area[0], depth * rnd(i, seed + 2), (rnd(i, seed + 4) - 0.5) * area[1]]} rotation={[0, rnd(i, seed + 6) * 3, 0]} size={[0.1 + rnd(i, seed + 8) * 0.16, 0.05 + depth * rnd(i, seed + 9), 0.08 + rnd(i, seed + 10) * 0.1]} color={colors[i % colors.length]} castShadow={false} />
      ))}
    </group>
  );
};

/** A pair of clippers. Flat on the floor they buzz away on their own. */
export const Clippers: React.FC<{ position: Vec3; rotationY?: number; t?: number }> = ({ position, rotationY = 0, t = 0 }) => (
  <group position={[position[0] + Math.sin(t * 90) * 0.012, position[1], position[2] + Math.cos(t * 70) * 0.012]} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.045, 0]} size={[0.12, 0.09, 0.36]} color="#23262f" />
    <Block position={[0, 0.045, 0.2]} size={[0.13, 0.05, 0.06]} color="#c9d0d8" metalness={0.7} roughness={0.3} />
    <Block position={[0, 0.095, -0.05]} size={[0.05, 0.012, 0.1]} color="#e8433a" castShadow={false} />
    <Block position={[0, 0.03, -0.5]} size={[0.025, 0.025, 0.7]} color="#111114" castShadow={false} />
  </group>
);

// ----------------------------------------------------------------------------- the room's things

/**
 * The television, on its stand. It faces +Z. What is on it is its children, drawn in the screen's own space:
 * the screen is 1.5 wide and 0.9 high, its middle is the origin, and +Z comes out of the glass.
 */
export const Television: React.FC<{ position: Vec3; rotationY?: number; on?: boolean; tint?: string; children?: React.ReactNode }> = ({ position, rotationY = 0, on = true, tint = "#9fd0ff", children }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.25, 0]} size={[1.7, 0.5, 0.5]} color="#5c3f24" />
    <Block position={[0, 0.51, 0]} size={[1.76, 0.04, 0.54]} color="#7a5536" />
    <Block position={[0, 1.08, -0.02]} size={[1.66, 1.06, 0.14]} color="#15161b" />
    <Block position={[0, 1.08, 0.05]} size={[1.5, 0.9, 0.02]} color={on ? "#bfe0ff" : "#0a0c10"} emissive={on ? tint : "#000000"} emissiveIntensity={on ? 0.15 : 0} castShadow={false} />
    <Block position={[0, 0.58, 0.02]} size={[0.5, 0.06, 0.2]} color="#15161b" />
    {on ? <group position={[0, 1.08, 0.07]}>{children}</group> : null}
    {on ? <pointLight position={[0, 1.1, 1.2]} color="#cfe0ff" intensity={1.6} distance={5} decay={2} /> : null}
  </group>
);

/** A sofa for two, facing -Z (its back is to the usual lens) unless turned. */
export const Sofa: React.FC<{ position: Vec3; rotationY?: number; color?: string; width?: number }> = ({ position, rotationY = 0, color = "#4a6a9a", width = 1.9 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.26, 0]} size={[width, 0.28, 0.8]} color={color} />
    <Block position={[0, 0.62, -0.36]} size={[width, 0.8, 0.2]} color={mix(color, "#000000", 0.12)} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * (width / 2 + 0.08), 0.42, 0]} size={[0.2, 0.6, 0.84]} color={mix(color, "#000000", 0.2)} />
    ))}
    <Block position={[0, 0.06, 0]} size={[width, 0.12, 0.7]} color="#2a2018" />
  </group>
);

/** How high somebody sits on the sofa or in the armchair. */
export const CUSHION = 0.0;

/** A wall calendar. `page` 0–5 is the month showing (a fraction is a page halfway up). It faces +Z. */
export const MONTHS = ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR"];
export const Calendar: React.FC<{ position: Vec3; page: number; scale?: number }> = ({ position, page, scale = 1 }) => {
  const i = Math.max(0, Math.min(MONTHS.length - 1, Math.floor(page)));
  const k = page - Math.floor(page);
  const sheet = (month: string, lift: number, z: number) => (
    <group position={[0, 0.34, z]} rotation={[-lift * 2.6, 0, 0]}>
      <group position={[0, -0.34, 0]}>
        <Block size={[0.7, 0.68, 0.012]} color="#f6f2e6" castShadow={false} />
        <Block position={[0, 0.24, 0.008]} size={[0.7, 0.2, 0.006]} color="#c8362e" castShadow={false} />
        <PixelText text={month} position={[0, 0.24, 0.014]} height={0.16} />
        {Array.from({ length: 15 }, (_, d) => (
          <Block key={d} position={[((d % 5) - 2) * 0.12, 0.04 - Math.floor(d / 5) * 0.12, 0.008]} size={[0.07, 0.07, 0.006]} color="#b9b3a2" castShadow={false} />
        ))}
      </group>
    </group>
  );
  return (
    <group position={position} scale={scale}>
      <Block position={[0, 0.36, -0.012]} size={[0.76, 0.08, 0.02]} color="#2a2c33" />
      {i + 1 < MONTHS.length ? sheet(MONTHS[i + 1], 0, 0) : null}
      {k < 0.98 ? sheet(MONTHS[i], k, 0.014) : null}
    </group>
  );
};

/** A sheet of paper with a cut that started straight and went off sideways. Flat on a table. */
export const CutPaper: React.FC<{ position: Vec3; cut?: number }> = ({ position, cut = 1 }) => (
  <group position={position}>
    <Block size={[0.5, 0.008, 0.66]} color="#cfcabb" castShadow={false} />
    {/* the cut: three steps, each further off the line */}
    {(
      [
        [0, 0.28, 0, 0.1],
        [0.03, 0.18, 0.3, 0.12],
        [0.1, 0.06, 0.8, 0.16],
        [0.2, -0.02, 1.3, 0.14],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, a, len], i) => (cut * 4 > i ? <Block key={i} position={[x, 0.006, z]} rotation={[0, a, 0]} size={[0.012, 0.004, len]} color="#16161c" castShadow={false} /> : null))}
    {/* the dotted line he was meant to follow */}
    {[-0.2, -0.1, 0, 0.1, 0.2].map((z) => (
      <Block key={z} position={[0, 0.005, z - 0.05]} size={[0.008, 0.003, 0.05]} color="#b9b3a2" castShadow={false} />
    ))}
  </group>
);

/** A dinner plate with something on it. */
export const Plate2: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block size={[0.3, 0.02, 0.3]} color="#c9c6ba" />
    <Block position={[-0.04, 0.03, 0]} size={[0.12, 0.05, 0.1]} color="#8a5a2a" />
    <Block position={[0.07, 0.025, 0.04]} size={[0.08, 0.03, 0.08]} color="#5fa03c" />
  </group>
);

/** A house window that flashes with a party behind it. `t` is film time; `night` false is a dark pane. */
export const PARTY_COLORS = ["#ff3fa0", "#3fb8ff", "#ffe14a", "#6aff6a", "#b06aff", "#ff7a2a"];
export const partyColor = (t: number, phase = 0) => PARTY_COLORS[Math.floor(t * 4 + phase) % PARTY_COLORS.length];
export const PartyWindow: React.FC<{ position: Vec3; t: number; size?: [number, number]; phase?: number; on?: boolean; rotationY?: number }> = ({ position, t, size = [1.3, 1.3], phase = 0, on = true, rotationY = 0 }) => {
  const c = on ? partyColor(t, phase) : "#27324a";
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Block size={[size[0] + 0.2, size[1] + 0.2, 0.1]} color="#f2efe6" />
      <Block position={[0, 0, 0.04]} size={[size[0], size[1], 0.06]} color={c} emissive={c} emissiveIntensity={on ? 0.75 : 0} castShadow={false} />
      <Block position={[0, 0, 0.08]} size={[0.06, size[1], 0.02]} color="#f2efe6" castShadow={false} />
      <Block position={[0, 0, 0.08]} size={[size[0], 0.06, 0.02]} color="#f2efe6" castShadow={false} />
      {/* somebody dancing behind the glass */}
      {on ? <Block position={[size[0] * 0.2 * Math.sin(t * 5 + phase), -size[1] * 0.18 + Math.abs(Math.sin(t * 8 + phase)) * 0.1, 0.075]} size={[0.3, size[1] * 0.6, 0.01]} color="#141018" castShadow={false} /> : null}
    </group>
  );
};

/** A music note that drifts up from the party. */
export const Note: React.FC<{ position: Vec3; t: number; phase?: number; color?: string; size?: number }> = ({ position, t, phase = 0, color = "#ffffff", size = 1 }) => {
  const k = (((t * 0.6 + phase) % 1) + 1) % 1;
  return (
    <group position={[position[0] + Math.sin(k * 7 + phase * 9) * 0.3, position[1] + k * 1.8, position[2]]} scale={size * (0.6 + 0.4 * Math.sin(k * Math.PI))}>
      <Block position={[0.08, 0.14, 0]} size={[0.04, 0.3, 0.02]} color={color} emissive={color} emissiveIntensity={0.5} castShadow={false} />
      <Block position={[0, 0, 0]} size={[0.14, 0.1, 0.02]} color={color} emissive={color} emissiveIntensity={0.5} castShadow={false} />
      <Block position={[0.14, 0.26, 0]} size={[0.12, 0.05, 0.02]} color={color} emissive={color} emissiveIntensity={0.5} castShadow={false} />
    </group>
  );
};

/** The grass block under everything outdoors, and the pavement: re-exported so scenes can lay a mat under a close-up. */
export const Ground: React.FC<{ position: Vec3; size: Vec3; kind?: "grass" | "stone" | "planks" | "path" }> = ({ position, size, kind = "grass" }) => <Vox kind={kind} position={position} size={size} />;

// ----------------------------------------------------------------------------- doors, signs, the hedge

/** The shop's door, from inside or out. `open` 0–1 swings it into the shop. World draws it shut in zone "shop". */
export const ShopDoor: React.FC<{ open?: number }> = ({ open = 0 }) => <Door position={[SHOP[0] - 2.82, 0, SHOP[2] - 4.6]} width={1.04} height={2.28} open={-open * 1.75} color="#2f6f6a" handleColor="#e8c44a" />;

/** Our front door. `open` 0–1 swings it into the hall. */
export const HomeDoor: React.FC<{ open?: number }> = ({ open = 1 }) => <Door position={[HOME[0] - 0.75, 0.12, HOME[2] + 0.75]} width={1.5} height={2.2} open={-open * 1.55} color="#7a2f2a" handleColor="#e8c44a" />;

/** A board in the shop window, read from the street (it faces north). `flip` 0–1 turns it over to its other side. */
export const WindowBoard: React.FC<{ position: Vec3; front: string; back?: string; flip?: number; width?: number; height?: number; bg?: string; fg?: string }> = ({ position, front, back, flip = 0, width = 1.7, height = 0.9, bg = "#fff3b8", fg = "#16161c" }) => {
  const a = Math.PI + flip * Math.PI;
  const showBack = back !== undefined && flip > 0.5;
  return (
    <group position={position} rotation={[0, a + (showBack ? Math.PI : 0), 0]}>
      <Block position={[0, 0, -0.02]} size={[width + 0.1, height + 0.1, 0.03]} color="#20242c" castShadow={false} />
      <Block size={[width, height, 0.02]} color={showBack ? "#c8362e" : bg} castShadow={false} />
      {(showBack ? (back as string) : front).split(" ").map((word, i, all) => (
        <PixelText key={i} text={word} position={[0, ((all.length - 1) / 2 - i) * (height / (all.length + 0.4)), 0.02]} height={(height / (all.length + 0.4)) * 0.8} maxWidth={width * 0.9} color={showBack ? "#ffffff" : fg} />
      ))}
    </group>
  );
};

/** The hedge, after I had been at it: a head of hair in leaves, with a side parting and a quiff. It faces +Z. */
export const Hedge: React.FC<{ position: Vec3; cut?: boolean }> = ({ position, cut = true }) => (
  <group position={position}>
    <Vox kind="leaves" position={[0, 0.5, 0]} size={[2.2, 1.0, 0.8]} />
    {cut ? (
      <>
        {/* the long side, combed over to the right */}
        <Vox kind="leaves" position={[0.25, 1.12, 0]} size={[1.5, 0.26, 0.84]} />
        <Vox kind="leaves" position={[0.75, 1.3, 0.05]} size={[0.7, 0.24, 0.8]} />
        <Vox kind="leaves" position={[1.0, 1.46, 0.1]} size={[0.4, 0.22, 0.7]} />
        {/* the short side */}
        <Vox kind="leaves" position={[-0.9, 1.06, 0]} size={[0.4, 0.12, 0.82]} />
        {/* the parting: a line cut down to the wood */}
        <Block position={[-0.6, 1.02, 0]} size={[0.1, 0.06, 0.84]} color="#5c3f24" castShadow={false} />
      </>
    ) : (
      <>
        <Vox kind="leaves" position={[-0.5, 1.2, 0]} size={[0.9, 0.5, 0.9]} />
        <Vox kind="leaves" position={[0.6, 1.1, -0.05]} size={[0.8, 0.36, 0.86]} />
        <Vox kind="leaves" position={[0.2, 1.5, 0.05]} size={[0.5, 0.3, 0.6]} />
      </>
    )}
  </group>
);

export { Sign };

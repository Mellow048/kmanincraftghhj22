import type React from "react";
import { Block, Glow, blendPose } from "../../engine";
import type { FaceName, Pose, Vec3 } from "../../engine";
import { Hero, Katana, OldMan, ease } from "./kit";

/**
 * FIGHT TOOLS. A fight played from looping clips ("point", "reachUp") is two statues sliding about. Here every
 * body is POSED frame by frame: a pose is a few numbers, `keys` runs from one pose to the next on the clock, and
 * the avatar takes the result through its `pose` prop. Wind-up, hit, follow-through: three keys.
 *
 * Angles are radians. For a LEG, 0 hangs straight down, negative swings it forward, positive back; a knee only
 * folds back (positive). For an ARM, x: 0 hangs, -1.57 is straight out in front, -3.1 is straight up; z opens it
 * away from the body (right arm +, left arm -). `pitch` leans the whole body forward about the hips: 1.4 is flat
 * out, flying. With the body pitched, `yaw` rolls it about its own length (a bank, a barrel roll).
 */

const HIP = 0.675;
const SEG = 0.3375;

type Leg = [number, number, number?];
export type Rough = {
  pitch?: number;
  roll?: number;
  yaw?: number;
  /** Extra height. On the ground the hips are placed so the lower foot is on the grass; this adds to it. */
  y?: number;
  head?: Vec3;
  torso?: Vec3;
  aR?: Vec3;
  aL?: Vec3;
  /** [angle, knee, splay]. On the ground the angle is from the vertical in the WORLD, so a leaning body keeps its feet under it. */
  R?: Leg;
  L?: Leg;
  /** In the air: leg angles are taken from the body, and nothing is put on the ground. */
  air?: boolean;
};

/** Build a pose. */
export const P = (o: Rough): Pose => {
  const pitch = o.pitch ?? 0;
  const R = o.R ?? [0, 0];
  const L = o.L ?? [0, 0];
  const rel = (leg: Leg) => (o.air ? leg[0] : leg[0] - pitch);
  const tall = (leg: Leg) => SEG * (Math.cos(leg[0]) + Math.cos(leg[0] + leg[1]));
  const y = o.air ? o.y ?? 0 : Math.max(tall(R), tall(L)) - HIP + (o.y ?? 0);
  return {
    bodyY: y,
    bodyPitch: pitch,
    bodyRoll: o.roll ?? 0,
    bodyYaw: o.yaw ?? 0,
    torso: o.torso ?? [0, 0, 0],
    head: o.head ?? [0, 0, 0],
    armR: o.aR ?? [0, 0, 0.06],
    armL: o.aL ?? [0, 0, -0.06],
    legR: [rel(R), 0, R[2] ?? 0],
    legL: [rel(L), 0, -(L[2] ?? 0)],
    kneeR: [R[1], 0, 0],
    kneeL: [L[1], 0, 0],
  };
};

/** How a move arrives at a key: `snap` is a blow (slow, then all at once), `out` is a stop (fast, then settling). */
export const snap = (k: number) => k * k * k;
export const out = (k: number) => 1 - (1 - k) * (1 - k);
type Key = [number, Pose, ((k: number) => number)?];

/** Run through poses on the clock. Each key is [time, pose, how it arrives]. */
export const keys = (t: number, ks: Key[]): Pose => {
  if (t <= ks[0][0]) return ks[0][1];
  for (let i = 0; i < ks.length - 1; i++) {
    const [t0, a] = ks[i];
    const [t1, b, how] = ks[i + 1];
    if (t < t1) return blendPose(a, b, (how ?? ease)(Math.min(1, Math.max(0, (t - t0) / (t1 - t0)))));
  }
  return ks[ks.length - 1][1];
};
/** A number run through keys the same way. */
export const track = (t: number, ks: Array<[number, number, ((k: number) => number)?]>): number => {
  if (t <= ks[0][0]) return ks[0][1];
  for (let i = 0; i < ks.length - 1; i++) {
    const [t0, a] = ks[i];
    const [t1, b, how] = ks[i + 1];
    if (t < t1) return a + (b - a) * (how ?? ease)(Math.min(1, Math.max(0, (t - t0) / (t1 - t0))));
  }
  return ks[ks.length - 1][1];
};
/** Freeze the clock for `len` seconds at `at`: the frame a blow lands on is held. Everything after it is late by `len`. */
export const hold = (t: number, at: number, len: number) => (t < at ? t : t < at + len ? at : t - len);
/** Run the clock at `rate` between `a` and `b`. */
export const slow = (t: number, a: number, b: number, rate: number) => (t < a ? t : t < b ? a + (t - a) * rate : a + (b - a) * rate + (t - b));

// ----------------------------------------------------------------------------- the old man's moves

/** Blade low in front, knees bent, weight forward: waiting. */
export const READY = P({ pitch: 0.16, R: [-0.5, 0.55], L: [0.38, 0.5], aR: [-0.55, 0, 0.3], aL: [0.25, 0, -0.4], head: [-0.1, 0, 0] });
/** Blade over his head, body bent back like a bow. */
export const HIGH = P({ pitch: -0.3, R: [-0.25, 0.3], L: [0.45, 0.35], aR: [-3.0, 0, 0.12], aL: [-2.7, 0, -0.3], head: [-0.15, 0, 0] });
/** The end of a chop: blade down in front of him, front knee deep. */
export const CHOPPED = P({ pitch: 0.6, R: [-0.75, 1.0], L: [0.6, 0.35], aR: [-0.5, 0, -0.08], aL: [-0.4, 0, 0.1], head: [-0.4, 0, 0] });
/** A sweep, wound up: twisted away, the blade across his body. Use the katana with `lance`. */
export const SWEEP0 = P({ pitch: 0.1, yaw: -0.85, R: [-0.5, 0.6], L: [0.45, 0.5], aR: [-1.5, 0, -1.15], aL: [0.3, 0, -0.5], head: [0, 0.6, 0] });
/** A sweep, done: twisted the other way, the arm thrown out past his side. */
export const SWEEP1 = P({ pitch: 0.2, yaw: 0.85, R: [-0.65, 0.7], L: [0.55, 0.45], aR: [-1.5, 0, 1.4], aL: [-0.5, 0, -0.7], head: [0, -0.6, 0] });
/** A lunge: one line from the back heel to the point. Use `lance`. */
export const THRUST = P({ pitch: 0.55, R: [-0.95, 0.95], L: [0.75, 0.2], aR: [-2.1, 0, 0], aL: [0.7, 0, -0.35], head: [-0.5, 0, 0] });
/** Drawn back for a lunge. */
export const DRAWN = P({ pitch: -0.05, yaw: 0.5, R: [-0.3, 0.5], L: [0.3, 0.5], aR: [0.5, 0, 0.5], aL: [-1.4, 0, -0.2], head: [-0.05, -0.5, 0] });
/** A rising cut, finished: on his toes, blade high. */
export const RISEN = P({ pitch: -0.22, yaw: 0.5, R: [-0.15, 0.1], L: [0.3, 0.2], aR: [-2.85, 0, 0.5], aL: [0.4, 0, -0.5], head: [-0.3, -0.3, 0], y: 0.05 });
/** Low, the blade dragged behind: the start of a rising cut. */
export const LOW = P({ pitch: 0.7, yaw: -0.5, R: [-0.9, 1.3], L: [0.5, 0.9], aR: [0.7, 0, 0.3], aL: [-0.6, 0, -0.3], head: [-0.6, 0.3, 0] });
/** One knee and one fist on the ground: coming down from a height. */
export const LANDED = P({ pitch: 0.5, R: [-1.3, 1.6], L: [0.2, 1.5], aL: [-0.95, 0, -0.1], aR: [0.5, 0, 0.9], head: [-0.2, 0, 0] });
/** Standing straight, blade down at his side, chin up: he is not in a hurry. */
export const TALL = P({ pitch: -0.04, R: [-0.08, 0], L: [0.08, 0], aR: [0.12, 0, 0.3], aL: [0.05, 0, -0.12], head: [-0.1, 0, 0] });
/** Squatting to jump. */
export const COILED = P({ pitch: 0.55, R: [-0.95, 1.9], L: [-0.85, 1.9], aR: [0.7, 0, 0.35], aL: [0.7, 0, -0.35], head: [-0.5, 0, 0] });

/** Running flat out with the blade trailing behind: `d` is metres run. Use `lance`. */
export const sprint = (d: number): Pose => {
  const s = Math.sin(d * 3.0);
  const p = P({ pitch: 0.55, R: [-0.25 + 0.95 * s, 0.3 + 0.9 * Math.max(0, s)], L: [-0.25 - 0.95 * s, 0.3 + 0.9 * Math.max(0, -s)], aR: [0.85, 0, 0.3], aL: [0.75 + 0.2 * s, 0, -0.3], head: [-0.5, 0, 0] });
  return { ...p, bodyY: p.bodyY + 0.05 * Math.abs(Math.cos(d * 3.0)) };
};

// ----------------------------------------------------------------------------- the teller's moves

/** Flat as he can get: knees up, back bent over them, both arms over his head. */
export const DUCKED = P({ pitch: 0.95, R: [-1.05, 2.0], L: [-0.95, 2.0], aR: [-2.5, 0, -0.45], aL: [-2.5, 0, 0.45], head: [0.45, 0, 0] });
/** Standing, hands up, leaning away. */
export const WARY = P({ pitch: -0.18, R: [0.25, 0.25], L: [-0.2, 0.3], aR: [-1.2, 0, 0.5], aL: [-1.2, 0, -0.5], head: [0.05, 0, 0] });
/** Bent over backwards from the knees, arms thrown wide: something is passing over his face. */
export const BENT = P({ pitch: -0.95, R: [-0.6, 1.25], L: [-0.5, 1.2], aR: [0.5, 0, 1.1], aL: [0.5, 0, -1.1], head: [-0.25, 0, 0] });
/** In the air with everything tucked up: jumping a low cut. */
export const TUCKED = P({ air: true, pitch: 0.25, R: [-1.5, 1.9], L: [-1.35, 1.9], aR: [-2.6, 0, 0.7], aL: [-2.6, 0, -0.7], head: [0.35, 0, 0], y: 0 });
/** Thrown sideways: one leg out, arms after it. */
export const SKIPPED = P({ pitch: -0.1, roll: 0.5, R: [-0.3, 0.3, 0.7], L: [0.1, 0.9, 0], aR: [-0.9, 0, 1.3], aL: [-1.5, 0, -0.3], head: [0, 0, -0.3] });
/** Back flat against something, arms spread on it. */
export const PINNED = P({ pitch: -0.06, R: [0.05, 0.1, 0.12], L: [0.05, 0.1, 0.12], aR: [0.25, 0, 0.95], aL: [0.25, 0, -0.95], head: [-0.2, 0, 0] });
/** Hit: folded round the blow, arms and legs left behind. */
export const STRUCK = P({ air: true, pitch: -1.0, R: [-0.9, 0.5], L: [-0.6, 0.7], aR: [-2.0, 0, 1.2], aL: [-2.1, 0, -1.2], head: [0.5, 0, 0] });
/** One arm straight out with the palm open, the other hand on the wrist. */
export const AIMED = P({ air: true, pitch: 0.05, R: [-0.3, 0.6], L: [0.15, 0.4], aR: [-1.57, 0, 0], aL: [-1.25, 0, 0.75], head: [-0.05, 0, 0] });

/** Going backwards as fast as legs go, arms windmilling: `d` is metres. He faces what he is running from. */
export const backpedal = (d: number): Pose => {
  const s = Math.sin(d * 3.6);
  const p = P({ pitch: -0.36, R: [0.2 + 0.75 * s, 0.3 + 0.7 * Math.max(0, -s)], L: [0.2 - 0.75 * s, 0.3 + 0.7 * Math.max(0, s)], aR: [-2.1 + 1.0 * s, 0, 0.75], aL: [-2.1 - 1.0 * s, 0, -0.75], head: [0.12, 0, 0] });
  return { ...p, bodyY: p.bodyY + 0.06 * Math.abs(Math.cos(d * 3.6)) };
};
/** On hands and heels, going backwards along the grass: `d` is metres. */
export const crab = (d: number): Pose => {
  const s = Math.sin(d * 7);
  return P({ pitch: -0.9, R: [-1.3 + 0.25 * s, 1.5], L: [-1.3 - 0.25 * s, 1.5], aR: [0.9 + 0.3 * s, 0, 0.3], aL: [0.9 - 0.3 * s, 0, -0.3], head: [0.6, 0, 0], y: -0.02 });
};

// ----------------------------------------------------------------------------- flying

/** The old man flying: flat, still, one arm ahead with the blade, like something fired. `bank` rolls him. */
export const soar = (t: number, bank = 0): Pose =>
  P({ air: true, pitch: 1.42, yaw: bank, head: [-1.15, 0, 0], aR: [-2.98, 0, 0.08], aL: [0.2, 0, -0.16], R: [0.07 + 0.02 * Math.sin(t * 9), 0.06], L: [0.1, 0.12] });
/** The teller flying: nearly flat, everything going at once. `bank` rolls him; `back` 0..1 turns his head to look behind. */
export const flail = (t: number, bank = 0, back = 0): Pose =>
  P({
    air: true,
    pitch: 1.05 + 0.16 * Math.sin(t * 9),
    yaw: bank + 0.25 * Math.sin(t * 5.3),
    roll: 0.1 * Math.sin(t * 7),
    head: [-0.8 + 0.3 * back, 1.2 * back, 0],
    aR: [-2.4 + 0.75 * Math.sin(t * 12), 0, 0.7],
    aL: [-2.4 - 0.75 * Math.sin(t * 12 + 1), 0, -0.7],
    R: [0.45 * Math.sin(t * 14), 0.4 + 0.3 * Math.sin(t * 14)],
    L: [-0.45 * Math.sin(t * 14), 0.4 - 0.3 * Math.sin(t * 14)],
  });
/** Standing on his jets, hardly moving. */
export const hover = (t: number): Pose => P({ air: true, pitch: 0.06, y: 0.05 * Math.sin(t * 3), aR: [0.08, 0, 0.3], aL: [0.05, 0, -0.14], R: [-0.3, 0.55], L: [0.1, 0.35], head: [0.05, 0, 0] });
/** Going straight up, arms pinned back by the speed. `wild` 0..1 has the arms and legs all over the place instead. */
export const rocket = (t: number, wild = 0): Pose =>
  P({
    air: true,
    pitch: 0.05 * wild * Math.sin(t * 11),
    yaw: 0.4 * wild * Math.sin(t * 6),
    head: [-0.55, 0, 0],
    aR: [0.2 - 2.6 * wild + 0.5 * wild * Math.sin(t * 13), 0, 0.3 + 0.5 * wild],
    aL: [0.2 - 2.6 * wild - 0.5 * wild * Math.sin(t * 13), 0, -0.3 - 0.5 * wild],
    R: [0.05 + 0.4 * wild * Math.sin(t * 15), 0.1 + 0.3 * wild],
    L: [0.08 - 0.4 * wild * Math.sin(t * 15), 0.15 + 0.3 * wild],
  });
/** Falling out of the sky, turning over. */
export const tumble = (t: number): Pose => ({ ...STRUCK, bodyPitch: -1.0 - t * 9.5, bodyYaw: t * 3.1, armR: [-2.0 + 0.5 * Math.sin(t * 17), 0, 1.2], armL: [-2.1 - 0.5 * Math.sin(t * 15), 0, -1.2] });

const RED = "#ff3b2e";
const CYAN = "#4fe3ff";

/**
 * Somebody in the air. `at` is his MIDDLE (his hips), not his feet, so he can turn over about it. The jets are
 * fixed to his boots and point wherever his feet point; `trail` is the length of the streak they leave.
 */
export const Flyer: React.FC<{
  who: "hero" | "old";
  at: Vec3;
  yaw: number;
  pose: Pose;
  t: number;
  jets?: number;
  trail?: number;
  blade?: number;
  lance?: number;
  eyes?: number;
  visor?: number;
  face?: FaceName;
}> = ({ who, at, yaw, pose, t, jets = 1, trail = 0, blade = 1, lance = 1, eyes = 1, visor = 0, face = "fear" }) => {
  const color = who === "old" ? RED : CYAN;
  const feet: Vec3 = [at[0], at[1] - HIP - pose.bodyY, at[2]];
  const fl = 0.8 + 0.2 * Math.sin(t * 43);
  return (
    <>
      {who === "old" ? (
        <OldMan position={feet} rotationY={yaw} suit={1} pose={pose} breath={0} weightShift={0}>
          {blade > 0.02 ? <Katana out={blade} lance={lance} /> : null}
        </OldMan>
      ) : (
        <Hero position={feet} rotationY={yaw} suit={1} pose={pose} breath={0} weightShift={0} eyes={eyes} visor={visor} face={face} />
      )}
      {jets > 0.02 ? (
        <group position={at} rotation={[0, yaw, 0]}>
          <group rotation={[pose.bodyPitch, pose.bodyYaw, pose.bodyRoll]}>
            {[-0.13, 0.13].map((x, i) => (
              <group key={i} position={[x, -0.7, 0]}>
                <Block position={[0, -0.26 * jets * fl, 0]} size={[0.15, 0.52 * jets * fl, 0.15]} color="#000000" emissive={color} emissiveIntensity={1} transparent opacity={0.85} castShadow={false} />
                <Block position={[0, -0.16 * jets * fl, 0]} size={[0.07, 0.32 * jets * fl, 0.07]} color="#000000" emissive="#ffffff" emissiveIntensity={1} castShadow={false} />
                {trail > 0.05 ? <Block position={[0, -trail / 2, 0]} size={[0.05, trail, 0.05]} color="#000000" emissive={color} emissiveIntensity={1} transparent opacity={0.4} castShadow={false} /> : null}
              </group>
            ))}
            <Glow position={[0, -0.95, 0]} size={1.1 * jets} color={color} opacity={0.55} />
            <pointLight position={[0, -1.0, 0]} color={color} intensity={5 * jets} distance={5} decay={2} />
          </group>
        </group>
      ) : null}
    </>
  );
};

// ----------------------------------------------------------------------------- what a blade leaves behind

/**
 * The line a blade draws through the air. `position` is the shoulder it swings from and `yaw` the way he faces.
 * `flat` true is a sweep, level with the ground, from angle `a0` to `a1` across his front (0 = straight ahead,
 * + = towards his sword arm). `flat` false is a chop, from `a0` up to `a1` down (1.57 = straight up, 0 = straight
 * ahead, negative = into the ground). `t` is seconds since the swing began; it is drawn in `draw` seconds and
 * is gone after `life`.
 */
export const Arc: React.FC<{ position: Vec3; yaw: number; t: number; a0: number; a1: number; r?: number; flat?: boolean; draw?: number; life?: number; color?: string; width?: number; tilt?: number }> = ({
  position, yaw, t, a0, a1, r = 1.7, flat = false, draw = 0.08, life = 0.34, color = "#fff0e8", width = 0.2, tilt = 0,
}) => {
  if (t < 0 || t > life) return null;
  const n = 18;
  const shown = Math.min(1, t / draw);
  const fade = 1 - Math.max(0, (t - draw) / (life - draw));
  const seg = (Math.abs(a1 - a0) * r) / n;
  return (
    <group position={position} rotation={[0, yaw, 0]}>
      <group rotation={[0, 0, tilt]}>
        {Array.from({ length: n }, (_, i) => {
          const k = (i + 0.5) / n;
          if (k > shown) return null;
          const a = a0 + (a1 - a0) * k;
          const w = width * Math.sin(Math.PI * Math.min(1, k * 1.15)) * fade + 0.01;
          const hot = i % 4 === 0 ? RED : color;
          return flat ? (
            <Block key={i} position={[Math.sin(a) * r, 0, Math.cos(a) * r]} rotation={[0, a + Math.PI / 2, 0]} size={[seg * 1.15, 0.03, w]} color="#000000" emissive={hot} emissiveIntensity={1} castShadow={false} />
          ) : (
            <Block key={i} position={[0, Math.sin(a) * r, Math.cos(a) * r]} rotation={[-(a + Math.PI / 2), 0, 0]} size={[0.03, w, seg * 1.15]} color="#000000" emissive={hot} emissiveIntensity={1} castShadow={false} />
          );
        })}
      </group>
    </group>
  );
};

/** One or two frames of white where a blow lands. `t` is seconds since it landed. */
export const Flash: React.FC<{ position: Vec3; t: number; size?: number; color?: string; life?: number }> = ({ position, t, size = 4, color = "#ffffff", life = 0.12 }) =>
  t < 0 || t > life ? null : (
    <>
      <Glow position={position} size={size * (0.6 + 0.6 * (t / life))} color={color} opacity={1.0 * (1 - t / life)} />
      <pointLight position={[position[0], position[1], position[2] + 0.8]} color={color} intensity={40 * (1 - t / life)} distance={7} decay={2} />
    </>
  );

/** Cracks in the ground where a blade came down, with the grass thrown up round them. */
export const Crack: React.FC<{ position: Vec3; yaw?: number; t: number; size?: number }> = ({ position, yaw = 0, t, size = 1 }) => {
  if (t < 0) return null;
  const k = Math.min(1, t / 0.08);
  return (
    <group position={[position[0], position[1] + 0.02, position[2]]} rotation={[0, yaw, 0]}>
      <Block position={[0, 0, 0.5 * size * k]} size={[0.09, 0.03, 1.2 * size * k]} color="#16130f" castShadow={false} />
      {[-0.7, -0.35, 0.4, 0.8].map((a, i) => (
        <group key={i} rotation={[0, a, 0]}>
          <Block position={[0, 0, (0.3 + 0.12 * i) * size * k]} size={[0.05, 0.03, (0.6 + 0.2 * (i % 2)) * size * k]} color="#16130f" castShadow={false} />
        </group>
      ))}
      {[[-0.3, 0.5], [0.34, 0.8], [-0.2, 1.1], [0.25, 0.3]].map(([x, z], i) => (
        <Block key={`c${i}`} position={[x * size, 0.05, z * size * k]} rotation={[0.3 * i, i, 0.4]} size={[0.2, 0.12, 0.18]} color={i % 2 ? "#5a4a36" : "#4a6a3a"} />
      ))}
    </group>
  );
};

/** A fat line of light left by something too fast to see: from `from` to `to`, gone in `life`. */
export const Dash: React.FC<{ from: Vec3; to: Vec3; t: number; life?: number; color?: string; width?: number }> = ({ from, to, t, life = 0.22, color = RED, width = 0.3 }) => {
  if (t < 0 || t > life) return null;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const len = Math.hypot(dx, dy, dz);
  const w = width * (1 - t / life);
  return (
    <group position={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2]} rotation={[0, Math.atan2(dx, dz), 0]}>
      <group rotation={[-Math.atan2(dy, Math.hypot(dx, dz)), 0, 0]}>
        <Block size={[w, w, len]} color="#000000" emissive={color} emissiveIntensity={1} transparent opacity={0.7} castShadow={false} />
        <Block size={[w * 0.4, w * 0.4, len]} color="#000000" emissive="#ffffff" emissiveIntensity={1} castShadow={false} />
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- the sky

const LEAF = ["#2b5a34", "#234a2c", "#32663a"];
/**
 * The forest from above, going past. Nobody really crosses forty metres of trees: the two of them stay near
 * `origin` and the treetops run under them, from west to east, `scroll` metres so far. Level 0 is the ground;
 * the tops are about 8 high. `clouds` adds a floor of cloud at that height instead of trees (above the weather).
 */
export const SkyRun: React.FC<{ origin: Vec3; scroll: number; clouds?: number }> = ({ origin, scroll, clouds }) => {
  const SPAN = 168;
  const cols = 24;
  const rows = 11;
  const wrap = (x: number, span = SPAN) => ((((x % span) + span) % span) - span / 2);
  return (
    <group position={origin}>
      <Block position={[0, 2.2, 0]} size={[420, 1, 420]} color="#27502f" castShadow={false} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const x = wrap(c * (SPAN / cols) + ((i * 37) % 11) * 0.5 + scroll);
        const z = (r - 5) * 5.2 + ((i * 13) % 7) * 0.45 - 1.4;
        const h = 4.4 + ((i * 29) % 9) * 0.32;
        const leaf = LEAF[i % 3];
        return (
          <group key={i} position={[x, 2.6, z]}>
            <Block position={[0, h * 0.2, 0]} size={[3.4, h * 0.4, 3.4]} color={leaf} castShadow={false} />
            <Block position={[0, h * 0.55, 0]} size={[2.3, h * 0.32, 2.3]} color={leaf} castShadow={false} />
            <Block position={[0, h * 0.84, 0]} size={[1.2, h * 0.3, 1.2]} color={LEAF[(i + 1) % 3]} castShadow={false} />
          </group>
        );
      })}
      {Array.from({ length: 14 }, (_, i) => {
        const x = wrap(i * 23 + scroll * 0.3, 240);
        const z = -46 + ((i * 17) % 9) * 5 + (i % 5 === 0 ? 62 : 0);
        const y = 17 + ((i * 7) % 5) * 2.2;
        return (
          <group key={`c${i}`} position={[x, y, z]}>
            <Block position={[0, 0, 0]} size={[9 + (i % 3) * 3, 1.6, 4.5]} color="#fff1e4" emissive="#ff9a6a" emissiveIntensity={0.18} castShadow={false} />
            <Block position={[1.5, 1.2, 0.4]} size={[5, 1.4, 3.2]} color="#ffe6d6" emissive="#ff9a6a" emissiveIntensity={0.18} castShadow={false} />
          </group>
        );
      })}
      {clouds !== undefined
        ? Array.from({ length: 40 }, (_, i) => {
            const x = wrap(i * 9.7 + scroll * 0.5, 120);
            const z = -30 + ((i * 17) % 13) * 4.6;
            return <Block key={`f${i}`} position={[x, clouds + ((i * 5) % 4) * 0.5, z]} size={[8 + (i % 4) * 2.5, 1.5 + (i % 3) * 0.5, 5 + (i % 2) * 2]} color="#fff3ea" emissive="#ff9a6a" emissiveIntensity={0.2} castShadow={false} />;
          })
        : null}
      {/* the sun, low in the west: they are flying at it */}
      <Glow position={[-120, 13, -18]} size={46} color="#ffe2a0" opacity={0.75} />
      <Glow position={[-120, 13, -18]} size={16} color="#ffffff" opacity={0.9} />
    </group>
  );
};

/** Lumps thrown up by something heavy: bigger than `Bits`, and they tumble. `t` is seconds since it happened. */
export const Debris: React.FC<{ position: Vec3; t: number; color?: string; alt?: string; count?: number; power?: number; size?: number; life?: number; seed?: number }> = ({
  position, t, color = "#6b5a40", alt = "#4a6a3a", count = 16, power = 3, size = 0.2, life = 1.2, seed = 1,
}) => {
  if (t <= 0 || t > life) return null;
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const a = i * 2.399 + seed;
        const sp = (0.45 + 0.55 * Math.abs(Math.sin(i * 12.9898 + seed * 3.1))) * power;
        const up = (0.9 + 1.3 * Math.abs(Math.sin(i * 78.233 + seed))) * power;
        const y = Math.max(0.02 - position[1], up * t - 4.9 * t * t);
        const s = size * (0.5 + 0.7 * Math.abs(Math.sin(i * 4.7 + seed)));
        return <Block key={i} position={[Math.cos(a) * sp * t, y, Math.sin(a) * sp * t]} rotation={[t * 7 + i, t * 5, i]} size={[s, s * 0.8, s]} color={i % 3 ? color : alt} castShadow={false} />;
      })}
    </group>
  );
};

/** A column of dust standing up out of a hole, thinning as it climbs. `t` is seconds since the hit. */
export const DustColumn: React.FC<{ position: Vec3; t: number; height?: number; life?: number }> = ({ position, t, height = 5, life = 1.6 }) => {
  if (t <= 0 || t > life) return null;
  const k = t / life;
  const up = 1 - (1 - Math.min(1, t / 0.5)) ** 2;
  return (
    <group position={position}>
      {Array.from({ length: 16 }, (_, i) => {
        const h = (i / 15) * height * up + k * 0.8;
        const w = (1.5 - (i / 15) * 0.7) * (0.7 + 0.5 * k);
        return (
          <Block key={i} position={[Math.sin(i * 2.4) * 0.45 * (1 + k), h, Math.cos(i * 1.7) * 0.4 * (1 + k)]} rotation={[0, i + t, 0]} size={[w, 0.7, w]} color={i % 2 ? "#9a8a68" : "#7c6e52"} transparent opacity={0.85 * (1 - k)} castShadow={false} />
        );
      })}
    </group>
  );
};

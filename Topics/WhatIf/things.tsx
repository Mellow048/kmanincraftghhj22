import type React from "react";
import { Block, clamp01, useFilmTime } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Figure } from "../Shared";

/**
 * THINGS — the small things a school story is told with: a dog, a lunch tray, a card, a tie, an eraser.
 *
 * Part of the What If pack (PACK.md). Everything takes a `position` and faces +Z; nothing here knows
 * where a film's rooms are. 1 unit = 1 metre.
 *
 * NOTHING HERE IS PINK. Pink is the colour of the hearts in the film these were built for, and a power's
 * colour is in nobody's clothes and on no prop (SHOTS.md §1). Keep it so: the next film's power needs a
 * colour that is free, too.
 */

// ----------------------------------------------------------------------------- the dog

const COAT = "#c98e4f";
const COAT_DARK = "#7a4f2a";
const CREAM = "#f2e6d0";

/**
 * A DOG, knee-high to a kid. `position` is the floor under the middle of it; it faces +Z.
 *
 *   <Dog position={BOWL} rotationY={WEST} pose="sit" wag={2} headPitch={-0.4} />
 *
 * `pose`: "stand", "sit" (on its haunches, front legs straight) or "eat" (standing, head in the bowl).
 * `wag` is how fast the tail goes (0 = still). `walked` is metres of ground covered: give it and the legs trot.
 * `headPitch` (negative looks up), `headYaw` and `headTilt` (the head on one side: a dog that is listening) are radians.
 */
export const Dog: React.FC<{
  position: Vec3;
  rotationY?: number;
  scale?: number;
  pose?: "stand" | "sit" | "eat";
  wag?: number;
  walked?: number;
  headPitch?: number;
  headYaw?: number;
  headTilt?: number;
  /** Mouth open: a bark, or a grin. */
  bark?: boolean;
}> = ({ position, rotationY = 0, scale = 1, pose = "stand", wag = 1, walked, headPitch = 0, headYaw = 0, headTilt = 0, bark = false }) => {
  const t = useFilmTime();
  const sit = pose === "sit";
  const eat = pose === "eat";
  const swing = walked === undefined ? 0 : Math.sin(walked * 9) * 0.6;
  const tail = Math.sin(t * 11 * wag) * (wag > 0 ? 0.7 : 0);
  const chew = eat ? Math.abs(Math.sin(t * 13)) * 0.12 : 0;
  // Where the neck is, and how the trunk lies, in each pose.
  const neck: Vec3 = sit ? [0, 0.56, 0.2] : eat ? [0, 0.4, 0.36] : [0, 0.5, 0.33];
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* trunk */}
      <group position={sit ? [0, 0.3, 0] : [0, 0.36, 0]} rotation={[sit ? -0.72 : 0, 0, 0]}>
        <Block size={[0.3, 0.28, 0.62]} color={COAT} />
        <Block position={[0, -0.05, 0.3]} size={[0.2, 0.2, 0.04]} color={CREAM} castShadow={false} />
        <Block position={[0, 0.145, -0.05]} size={[0.16, 0.012, 0.36]} color={COAT_DARK} castShadow={false} />
        {/* tail: it is the dog's whole opinion */}
        <group position={[0, 0.1, -0.31]} rotation={[sit ? 1.0 : -0.5, 0, tail]}>
          <Block position={[0, 0.13, 0]} size={[0.07, 0.26, 0.07]} color={COAT} />
          <Block position={[0, 0.25, 0]} size={[0.072, 0.07, 0.072]} color={CREAM} castShadow={false} />
        </group>
      </group>
      {/* legs */}
      {sit ? (
        <>
          {[-1, 1].map((s) => (
            <Block key={`f${s}`} position={[s * 0.1, 0.18, 0.26]} size={[0.085, 0.36, 0.085]} color={COAT} />
          ))}
          {[-1, 1].map((s) => (
            <Block key={`h${s}`} position={[s * 0.15, 0.06, -0.06]} size={[0.1, 0.12, 0.3]} color={COAT} />
          ))}
          {[-1, 1].map((s) => (
            <Block key={`p${s}`} position={[s * 0.1, 0.02, 0.31]} size={[0.09, 0.04, 0.1]} color={CREAM} castShadow={false} />
          ))}
        </>
      ) : (
        [-1, 1].flatMap((s) =>
          [-1, 1].map((f) => (
            <group key={`${s}${f}`} position={[s * 0.1, 0.24, f * 0.22]} rotation={[swing * s * f, 0, 0]}>
              <Block position={[0, -0.12, 0]} size={[0.085, 0.24, 0.085]} color={COAT} />
              <Block position={[0, -0.22, 0.005]} size={[0.09, 0.04, 0.1]} color={CREAM} castShadow={false} />
            </group>
          )),
        )
      )}
      {/* collar */}
      <Block position={[neck[0], neck[1] - 0.05, neck[2] - 0.05]} size={[0.27, 0.05, 0.2]} color="#2f6fd6" />
      <Block position={[neck[0], neck[1] - 0.1, neck[2] + 0.06]} size={[0.05, 0.06, 0.02]} color="#ffd24a" metalness={0.3} roughness={0.5} castShadow={false} />
      {/* head */}
      <group position={neck} rotation={[(eat ? 0.95 + chew : 0) + headPitch, headYaw, headTilt]}>
        <Block position={[0, 0.08, 0.08]} size={[0.3, 0.27, 0.26]} color={COAT} />
        <Block position={[0, 0.02, 0.27]} size={[0.16, 0.12, 0.14]} color={CREAM} />
        <Block position={[0, 0.07, 0.345]} size={[0.065, 0.05, 0.02]} color="#1b1614" castShadow={false} />
        {bark ? <Block position={[0, -0.045, 0.3]} size={[0.11, 0.035, 0.09]} color="#3a1c14" castShadow={false} /> : null}
        {[-1, 1].map((s) => (
          <group key={s}>
            <Block position={[s * 0.08, 0.12, 0.212]} size={[0.055, 0.065, 0.012]} color="#1b1614" castShadow={false} />
            <Block position={[s * 0.07, 0.14, 0.22]} size={[0.02, 0.022, 0.006]} color="#ffffff" castShadow={false} />
            {/* ears that hang: the one thing that says DOG and not WOLF */}
            <Block position={[s * 0.165, 0.12, 0.03]} rotation={[0, 0, s * -0.16]} size={[0.06, 0.2, 0.15]} color={COAT_DARK} />
          </group>
        ))}
        <Block position={[0, 0.2, 0.12]} size={[0.1, 0.035, 0.14]} color={CREAM} castShadow={false} />
      </group>
    </group>
  );
};

/** A dog's bowl. `full`: there is dinner in it. `position` is the floor under it. */
export const DogBowl: React.FC<{ position: Vec3; full?: boolean }> = ({ position, full = true }) => (
  <group position={position}>
    <Block position={[0, 0.05, 0]} size={[0.36, 0.1, 0.36]} color="#3f6fb8" />
    <Block position={[0, 0.1, 0]} size={[0.3, 0.012, 0.3]} color="#25467a" castShadow={false} />
    {full ? (
      <>
        <Block position={[0, 0.115, 0]} size={[0.27, 0.03, 0.27]} color="#8a5a2c" castShadow={false} />
        {[[-0.06, 0.05], [0.07, -0.04], [0.02, 0.08], [-0.03, -0.07]].map(([x, z], i) => (
          <Block key={i} position={[x, 0.14, z]} size={[0.06, 0.04, 0.06]} color={i % 2 ? "#a06a34" : "#6f4520"} castShadow={false} />
        ))}
      </>
    ) : null}
  </group>
);

// ----------------------------------------------------------------------------- lunch

/** A lunch tray with a plate, a carton and an apple on it. `position` is the middle of the tray; carry it with `arms="hold"`. */
export const Tray: React.FC<{ position: Vec3; rotationY?: number; empty?: boolean }> = ({ position, rotationY = 0, empty = false }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block size={[0.46, 0.025, 0.32]} color="#8fa0ad" />
    <Block position={[0, 0.014, 0]} size={[0.42, 0.006, 0.28]} color="#a9b8c4" castShadow={false} />
    {empty ? null : (
      <>
        <Block position={[-0.08, 0.03, 0.02]} size={[0.2, 0.02, 0.2]} color="#f7f4ea" castShadow={false} />
        <Block position={[-0.1, 0.06, 0.02]} size={[0.1, 0.05, 0.1]} color="#e2b56c" castShadow={false} />
        <Block position={[-0.03, 0.05, 0.06]} size={[0.06, 0.03, 0.06]} color="#6fbf4a" castShadow={false} />
        <Block position={[0.14, 0.085, -0.06]} size={[0.07, 0.14, 0.07]} color="#f4f7fb" />
        <Block position={[0.14, 0.085, -0.024]} size={[0.07, 0.05, 0.004]} color="#3f7fd6" castShadow={false} />
        <Block position={[0.13, 0.055, 0.09]} size={[0.08, 0.08, 0.08]} color="#7fc23a" />
      </>
    )}
  </group>
);

/** A paper cup. `position` is the bottom of it. */
export const Cup: React.FC<{ position: Vec3; drink?: string }> = ({ position, drink = "#ffd24a" }) => (
  <group position={position}>
    <Block position={[0, 0.065, 0]} size={[0.09, 0.13, 0.09]} color="#f4f7fb" />
    <Block position={[0, 0.07, 0]} size={[0.094, 0.04, 0.094]} color="#3f7fd6" castShadow={false} />
    <Block position={[0, 0.132, 0]} size={[0.07, 0.006, 0.07]} color={drink} castShadow={false} />
  </group>
);

/** Half a sandwich. `position` is the middle of it. */
export const Sandwich: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number }> = ({ position, rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.035, 0]} size={[0.15, 0.035, 0.13]} color="#e2b56c" />
    <Block position={[0, 0.008, 0]} size={[0.16, 0.02, 0.14]} color="#6fbf4a" castShadow={false} />
    <Block position={[0, -0.008, 0]} size={[0.15, 0.014, 0.135]} color="#f2c230" castShadow={false} />
    <Block position={[0, -0.035, 0]} size={[0.15, 0.035, 0.13]} color="#e2b56c" />
    <Block position={[0, 0.054, 0]} size={[0.13, 0.004, 0.11]} color="#c9964a" castShadow={false} />
  </group>
);

/** One cookie, lying flat. `position` is the middle of it. */
export const Cookie: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number }> = ({ position, rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.14, 0.035, 0.14]} color="#c88a4a" />
    {[[-0.035, 0.03], [0.04, -0.02], [0.0, -0.045], [0.03, 0.045]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.019, z]} size={[0.03, 0.01, 0.03]} color="#4a2c16" castShadow={false} />
    ))}
  </group>
);

/** A pile of cookies, `count` high (a fraction pops the top one in). `position` is the table under it. */
export const CookieStack: React.FC<{ position: Vec3; count: number }> = ({ position, count }) => {
  const whole = Math.floor(count);
  const part = count - whole;
  return (
    <group position={position}>
      {Array.from({ length: whole + (part > 0.01 ? 1 : 0) }, (_, i) => (
        <Cookie key={i} position={[((i * 7) % 3) * 0.012 - 0.012, 0.018 + i * 0.037, ((i * 5) % 3) * 0.012 - 0.012]} rotation={[0, i * 0.5, 0]} scale={i < whole ? 1 : 0.4 + 0.6 * clamp01(part)} />
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------------- what is thrown, written and worn

/** An eraser: white, with a blue paper sleeve. `position` is the middle of it. */
export const Eraser: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number }> = ({ position, rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.14, 0.055, 0.07]} color="#f4f1e8" />
    <Block size={[0.07, 0.06, 0.075]} color="#3f7fd6" castShadow={false} />
  </group>
);

/**
 * A CARD with a word on it, in letters a phone can read. It faces +Z; `position` is its middle.
 * `written` is how many letters are on it yet (leave it out for all of them): somebody writing it.
 * In a hand (an avatar's child) held out in front: `<Card rotation={[Math.PI / 2, 0, 0]} position={[0, -0.02, 0.1]} … />`.
 */
export const Card: React.FC<{ position?: Vec3; rotation?: Vec3; text: string; written?: number; width?: number; height?: number; scale?: number }> = ({
  position = [0, 0, 0],
  rotation,
  text,
  written,
  width = 0.34,
  height = 0.22,
  scale = 1,
}) => {
  const shown = written === undefined ? text : text.slice(0, Math.max(0, Math.floor(written)));
  // Every letter keeps its place while the word is being written: pad the rest with spaces.
  const padded = shown + " ".repeat(Math.max(0, text.length - shown.length));
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Block size={[width, height, 0.012]} color="#fbf8ee" />
      <Block position={[0, 0, -0.004]} size={[width + 0.02, height + 0.02, 0.008]} color="#1f3a8a" castShadow={false} />
      {shown.trim() ? <Figure text={padded} position={[0, 0, 0.012]} height={height * 0.42} maxWidth={width * 0.86} depth={0.35} color="#1f3a8a" shadow={false} castShadow={false} /> : null}
    </group>
  );
};

/**
 * A TIE on somebody. `position` is the wearer's FEET and `rotationY` their facing; `scale` is the avatar's
 * scale (a kid is KID = 0.8, a grown-up 1). `reach` is where it ends, in the wearer's own height: 0.56 is
 * the belt, where a tie ends on the man it belongs to; 0.25 is the knees of a kid who borrowed it.
 * `swing` (radians) tips it forward from the knot: a walker's tie.
 */
export const Tie: React.FC<{ position: Vec3; rotationY?: number; scale?: number; reach?: number; swing?: number; sway?: number }> = ({ position, rotationY = 0, scale = 1, reach = 0.56, swing = 0, sway = 0 }) => {
  const top = 1.3;
  const end = Math.min(top - 0.1, reach * 1.8);
  const stripes = Math.max(2, Math.round((top - end) / 0.075));
  const step = (top - end) / stripes;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group position={[0, top, 0.128]} rotation={[-swing, 0, sway]}>
        <Block position={[0, 0.01, 0]} size={[0.1, 0.075, 0.035]} color="#1f3a8a" />
        {Array.from({ length: stripes }, (_, i) => {
          const k = i / Math.max(1, stripes - 1);
          const wide = 0.075 + 0.07 * Math.sin(Math.min(1, k * 1.25) * Math.PI * 0.5);
          return <Block key={i} position={[0, -0.04 - (i + 0.5) * step, 0]} size={[wide, step + 0.002, 0.022]} color={i % 2 ? "#ffd24a" : "#1f3a8a"} castShadow={false} />;
        })}
        <Block position={[0, -0.04 - stripes * step - 0.02, 0]} size={[0.07, 0.045, 0.022]} color={stripes % 2 ? "#ffd24a" : "#1f3a8a"} castShadow={false} />
      </group>
    </group>
  );
};

import type React from "react";
import { Block, Glow, LightPool, clamp01, mulberry32 } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Figure, Icon, pop } from "../Shared";
import type { IconKind } from "../Shared";

/**
 * POWERS — how an impossible thing is SHOWN.
 *
 * A "What if" story stands on one power, and the viewer has to see the power the way the teller does:
 * the heart over a head, the ghost of what happens five seconds from now, the glow that says it is on.
 * Give a power ONE look in its first shot and never change it: after ten seconds the look IS the power.
 *
 * Part of the What If pack (PACK.md). Everything here takes seconds (`t`) and is still when `t` is still:
 * pass it the shot's `t`, or the seconds since a word. Nothing uses the wall clock.
 */

/**
 * A SIGN OVER A HEAD: what only the teller can see about somebody. A heart, a number, a skull, a clock.
 * `over` is the person's FEET; the sign floats above their head, bobs, and pops in when `t` passes 0.
 * It faces +Z: give it the camera's yaw as `rotationY` so that it faces the lens.
 *
 *   <Overhead over={HER} kind="heart" t={t - CRUSH} rotationY={yaw} />
 *   <Overhead over={HIM} text="5" color="#ffd24a" t={t} />                 a number instead of a picture
 *
 * `tall` is the person's height in metres (a kid is 1.44, an adult about 1.8).
 */
export const Overhead: React.FC<{
  over: Vec3;
  kind?: IconKind;
  text?: string;
  t?: number;
  tall?: number;
  size?: number;
  color?: string;
  rotationY?: number;
  /** Radians a second it turns about its upright axis. 0 keeps it facing the lens. */
  spin?: number;
  glow?: number;
  /** 0–1: fade it out (a power switching off). */
  fade?: number;
}> = ({ over, kind = "heart", text, t = 1, tall = 1.44, size = 0.34, color, rotationY = 0, spin = 0, glow = 0.55, fade = 0 }) => {
  const scale = pop(t, 0, 0.3) * (1 - clamp01(fade));
  if (scale <= 0.001) return null;
  const at: Vec3 = [over[0], over[1] + tall + 0.34 + size / 2 + Math.sin(t * 2.6) * 0.035, over[2]];
  const turn = rotationY + spin * t;
  return (
    <>
      {text !== undefined ? (
        <Figure text={text} position={at} rotationY={turn} height={size} depth={0.9} color={color ?? "#ffffff"} glow={glow} scale={scale} castShadow={false} outline />
      ) : (
        <Icon kind={kind} position={at} rotationY={turn} height={size} depth={1.2} color={color} glow={glow} scale={scale} castShadow={false} outline />
      )}
      <Glow position={[at[0], at[1], at[2] - 0.05]} size={size * 2.6 * scale} color={color ?? "#ffb0cc"} opacity={0.28} />
    </>
  );
};

/**
 * AN AURA: the power is ON. A ring of small bright cubes going round a body, a glow behind it and a pool of
 * colour at its feet. `position` is the feet. `power` 0–1 fades the whole thing in; `t` turns it.
 */
export const Aura: React.FC<{ position: Vec3; t: number; power?: number; color?: string; tall?: number; count?: number; radius?: number }> = ({
  position,
  t,
  power = 1,
  color = "#7fd0ff",
  tall = 1.44,
  count = 9,
  radius = 0.55,
}) => {
  const k = clamp01(power);
  if (k <= 0.01) return null;
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + t * 2.2;
        const height = tall * (0.25 + 0.6 * (((i * 5) % count) / count)) + Math.sin(t * 3 + i) * 0.06;
        const s = 0.07 * k * (0.7 + 0.3 * Math.sin(t * 5 + i * 1.7));
        return <Block key={i} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]} size={[s, s, s]} color={color} emissive={color} emissiveIntensity={2.2} castShadow={false} />;
      })}
      <Glow position={[0, tall * 0.55, -0.25]} size={tall * 1.6} color={color} opacity={0.2 * k} />
      <LightPool position={[0, 0.02, 0]} width={radius * 4} depth={radius * 4} color={color} opacity={0.12 * k} />
      {/* a little of its colour on whoever stands in it: enough to tint a shirt, not enough to bleach a face */}
      <pointLight position={[0, tall * 0.6, 0.9]} color={color} intensity={1.0 * k} distance={3} decay={2} />
    </group>
  );
};

/**
 * AN ECHO: a see-through copy of a person, in one colour. The future five seconds from now; a memory;
 * somebody who is not really there. `position` is its feet and `rotationY` its facing, as for a person.
 * `walk` (metres walked) swings its arms and legs; `reach` (0–1) lifts its right arm, to point or to grab.
 * It is built from plain blocks, so it never looks like a second actor: it looks like an idea of one.
 */
export const Echo: React.FC<{ position: Vec3; rotationY?: number; scale?: number; color?: string; opacity?: number; walk?: number; reach?: number; lean?: number }> = ({
  position,
  rotationY = 0,
  scale = 0.8,
  color = "#8fd0ff",
  opacity = 0.5,
  walk = 0,
  reach = 0,
  lean = 0,
}) => {
  const swing = Math.sin(walk * 4.4) * 0.6;
  const part = { color, emissive: color, emissiveIntensity: 1.2, opacity, transparent: true, castShadow: false, receiveShadow: false } as const;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group rotation={[lean, 0, 0]}>
        {/* legs, hinged at the hip */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.113, 0.675, 0]} rotation={[side * swing, 0, 0]}>
            <Block position={[0, -0.3375, 0]} size={[0.22, 0.675, 0.22]} {...part} />
          </group>
        ))}
        <Block position={[0, 1.0125, 0]} size={[0.45, 0.675, 0.225]} {...part} />
        {/* arms, hinged at the shoulder */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.3375, 1.29, 0]} rotation={[side > 0 ? -reach * 1.6 - swing : swing, 0, 0]}>
            <Block position={[0, -0.28, 0]} size={[0.22, 0.675, 0.22]} {...part} />
          </group>
        ))}
        <Block position={[0, 1.575, 0]} size={[0.45, 0.45, 0.45]} {...part} />
      </group>
      <Glow position={[0, 1.0, -0.15]} size={2.2} color={color} opacity={0.22} />
    </group>
  );
};

/**
 * STREAKS: speed. Thin bright lines trailing behind something fast. `position` is the middle of the mover,
 * and `heading` (radians, like `rotationY`) is the way it is going: the lines trail the other way.
 * `speed` 0–1 is how fast it looks: it sets their length and how many there are.
 */
export const Streaks: React.FC<{ position: Vec3; heading?: number; t: number; speed?: number; color?: string; count?: number; spread?: number; seed?: number }> = ({
  position,
  heading = 0,
  t,
  speed = 1,
  color = "#ffffff",
  count = 16,
  spread = 0.7,
  seed = 1,
}) => {
  const k = clamp01(speed);
  if (k <= 0.02) return null;
  const rand = mulberry32(seed * 733 + 11);
  return (
    <group position={position} rotation={[0, heading, 0]}>
      {Array.from({ length: Math.round(count * (0.4 + 0.6 * k)) }, (_, i) => {
        const x = (rand() - 0.5) * 2 * spread;
        const y = (rand() - 0.5) * 2 * spread;
        const phase = rand();
        // Each line runs back along the path, again and again.
        const run = (t * (1.6 + rand() * 1.4) + phase) % 1;
        const length = (0.7 + rand() * 1.3) * k;
        return <Block key={i} position={[x, y, -0.15 - run * 1.5 * k - length / 2]} size={[0.08, 0.08, length]} color={color} emissive={color} emissiveIntensity={2.6} opacity={0.95 * (1 - run * 0.6)} transparent castShadow={false} />;
      })}
    </group>
  );
};

/**
 * A SWIRL: the power arriving. Small bright cubes climb round a body in a spiral and fade as they pass its head.
 * `position` is the feet; `t` is the seconds since it began, and it is over after `seconds`.
 */
export const Swirl: React.FC<{ position: Vec3; t: number; seconds?: number; color?: string; count?: number; tall?: number; radius?: number }> = ({
  position,
  t,
  seconds = 1.2,
  color = "#ffe14a",
  count = 18,
  tall = 1.6,
  radius = 0.6,
}) => {
  if (t <= 0 || t >= seconds) return null;
  const p = t / seconds;
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const k = clamp01(p * 1.5 - (i / count) * 0.5);
        if (k <= 0 || k >= 1) return null;
        const angle = (i / count) * Math.PI * 4 + k * Math.PI * 3;
        const s = 0.09 * Math.sin(k * Math.PI);
        return <Block key={i} position={[Math.cos(angle) * radius * (1 - 0.4 * k), k * tall * 1.15, Math.sin(angle) * radius * (1 - 0.4 * k)]} size={[s, s, s]} color={color} emissive={color} emissiveIntensity={2.4} castShadow={false} />;
      })}
      <Glow position={[0, tall * 0.5, -0.2]} size={tall * 1.7} color={color} opacity={0.22 * Math.sin(p * Math.PI)} />
      <pointLight position={[0, tall * 0.6, 1.0]} color={color} intensity={1.8 * Math.sin(p * Math.PI)} distance={4} decay={2} />
    </group>
  );
};

/**
 * A COUNTDOWN in cubes: `from`, then one less each `every` seconds, down to 0. Each number pops as it changes.
 * `t` is the seconds since it began. It faces +Z. After 0 it stays on 0: hide it yourself when the thing happens.
 */
export const Countdown: React.FC<{ position: Vec3; t: number; from?: number; every?: number; height?: number; color?: string; rotationY?: number; glow?: number }> = ({
  position,
  t,
  from = 5,
  every = 1,
  height = 0.6,
  color = "#ffd24a",
  rotationY = 0,
  glow = 0.6,
}) => {
  if (t < 0) return null;
  const step = Math.min(from, Math.floor(t / every));
  const since = t - step * every;
  return <Figure text={String(from - step)} position={position} rotationY={rotationY} height={height} color={from - step <= 1 ? "#ff5a3a" : color} glow={glow} scale={pop(since, 0, 0.22)} castShadow={false} outline />;
};

/**
 * A BEAM of light from one point to another: the power pointing at something, a line between two people.
 * `grow` 0–1 draws it out from `from`.
 */
export const Beam: React.FC<{ from: Vec3; to: Vec3; grow?: number; color?: string; width?: number }> = ({ from, to, grow = 1, color = "#ff8fb8", width = 0.05 }) => {
  const k = clamp01(grow);
  if (k <= 0.01) return null;
  const d: Vec3 = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
  const length = Math.hypot(d[0], d[1], d[2]) * k;
  const yaw = Math.atan2(d[0], d[2]);
  const pitch = -Math.atan2(d[1], Math.hypot(d[0], d[2]));
  return (
    <group position={from} rotation={[0, yaw, 0]}>
      <group rotation={[pitch, 0, 0]}>
        <Block position={[0, 0, length / 2]} size={[width, width, length]} color={color} emissive={color} emissiveIntensity={2.4} opacity={0.85} transparent castShadow={false} />
        <Block position={[0, 0, length / 2]} size={[width * 3, width * 3, length]} color={color} emissive={color} emissiveIntensity={1} opacity={0.18} transparent castShadow={false} />
      </group>
    </group>
  );
};

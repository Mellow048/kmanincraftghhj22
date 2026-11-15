import type React from "react";
import { Block } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  CageDoor, EAST, Flat, Folk, HOLE, Hero, IronGolem, LOOK, LitWindow, Mo, MOCAGE, NORTH, Postman, Raider, Smoke, VGuard, WEST, WINDOWS, WallPlug, f, wordAt,
} from "./kit";
import type { Kind } from "./kit";

/** How big the golem is in this film: 2.7 m × 2.2 = "as tall as a house". */
export const G = 2.2;
/** Seconds into a line at which a word is said; `fallback` if the aligner has no such word. */
export const w = (cue: string, word: string, fallback: number): number => {
  try {
    const v = wordAt(cue, word);
    return Number.isFinite(v) ? v : fallback;
  } catch {
    return fallback;
  }
};
export const clamp = (x: number): number => Math.max(0, Math.min(1, x));
/** 0 → 1 → 0 over `d` seconds from `at`. */
export const bump = (t: number, at: number, d: number): number => Math.sin(Math.PI * clamp((t - at) / d));
export const up = (p: Vec3, y: number): Vec3 => [p[0], p[1] + y, p[2]];

/** Where the teacher stands to work the lock, and later to shout. */
export const T2: Vec3 = f(-4.3, 0, 2.15);
/** Where the teller stands once he is out of the bus. */
export const OUTBUS: Vec3 = f(-3.2, 0, 5.2);
/** Where the golem stands over the bus. */
export const GSTAND: Vec3 = f(1.8, 0, 3.7);

/** Mo, flat on his back. He does not move in this film. Feet at `position`; his head points along `rotationY` + 180°. */
export const MoFlat: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <Flat position={position} rotationY={rotationY}>
    <Mo animation="idle" scarf={0} face="sad" blink={false} breath={0} weightShift={0} />
  </Flat>
);
export const MoInCage: React.FC = () => <MoFlat position={[MOCAGE[0] + 0.85, 0.08, MOCAGE[2] + 0.2]} rotationY={EAST} />;

/** The windows of the castle. `lit` 0–1: they come on one after another. */
export const Lights: React.FC<{ lit: number }> = ({ lit }) => (
  <>
    {WINDOWS.map(([x, y, z, yaw], i) => (
      <LitWindow key={i} position={f(x, y, z)} yaw={yaw} on={clamp(lit * WINDOWS.length - ((i * 5) % WINDOWS.length))} />
    ))}
  </>
);

/** Fights going on in the yard: [monster, x, z, which player, how they fight]. */
type How = "chase" | "duel" | "shoot" | "pounce";
const FIGHTS: Array<[Kind, number, number, number, How]> = [
  ["zombie", -3.6, -4.2, 1, "duel"], ["skeleton", 0.6, -6.4, 2, "shoot"], ["spider", 3.8, -3.6, 3, "pounce"], ["zombie", -1.2, -8.6, 4, "chase"],
  ["creeper", 4.6, -8.2, 5, "chase"], ["zombie", -7.4, -1.6, 2, "duel"], ["skeleton", 2.6, -2.2, 4, "shoot"], ["enderman", -5.4, -7.4, 3, "pounce"],
];
/** A spark where steel meets something harder. */
const Spark: React.FC<{ at: Vec3; k: number }> = ({ at, k }) =>
  k > 0.05 ? (
    <>
      {[0, 1, 2, 3].map((i) => (
        <Block key={i} position={[at[0] + Math.cos(i * 1.7) * 0.3 * k, at[1] + Math.sin(i * 1.7) * 0.3 * k, at[2] + (i % 2 ? 0.1 : -0.1)]} size={[0.07, 0.07, 0.07]} color="#000000" emissive="#ffe070" emissiveIntensity={3} castShadow={false} />
      ))}
    </>
  ) : null;
/**
 * THE BATTLE IN THE YARD: eight fights, every one of them moving, no two the same.
 *   duel    a zombie walks into a sword: the player hacks at it, sparks, and is pushed back step by step, then it starts again
 *   shoot   a skeleton draws and looses, an arrow flies, the player ducks under it and comes up again
 *   pounce  a spider (or the enderman) jumps the gap and lands where the player was; he dives out of the way
 *   chase   round and round: a player running flat out with a monster two steps behind him
 * With `look` everybody stops where they are and turns to look at that point.
 */
export const Battle: React.FC<{ t: number; look?: Vec3; n?: number }> = ({ t, look, n = FIGHTS.length }) => (
  <>
    {FIGHTS.slice(0, n).map(([kind, x, z, who, how], i) => {
      const ph = i * 1.37;
      if (look) {
        return (
          <group key={i}>
            <Folk kind={kind} n={i + 2} position={f(x, 0, z)} rotationY={WEST} lookAt={look} mood="calm" />
            <Raider who={who} sword={i % 2 === 0} position={f(x - 1.5, 0, z + 0.1)} rotationY={EAST} animation="idle" face="worried" lookAt={look} phase={i} />
          </group>
        );
      }
      if (how === "chase") {
        const a = t * 2.2 + ph;
        const rr = 1.5;
        const at = (q: number): Vec3 => f(x - 0.7 + Math.cos(q) * rr, 0, z + Math.sin(q) * rr * 0.75);
        const heading = (q: number): number => Math.atan2(-Math.sin(q) * rr, Math.cos(q) * rr * 0.75);
        return (
          <group key={i}>
            <Raider who={who} sword={false} position={at(a)} rotationY={heading(a)} animation="run" animDistance={t * 3.3 + ph} face="scared" phase={i} />
            <Folk kind={kind} n={i + 2} position={at(a - 0.9)} rotationY={heading(a - 0.9)} walk={t * 1.4 + ph} mood="angry" lean={0.25} arms={kind === "zombie" ? 1 : undefined} fuse={kind === "creeper" ? 0.5 + 0.5 * Math.sin(t * 5) : undefined} />
          </group>
        );
      }
      if (how === "duel") {
        const c = (t * 0.9 + ph) % 2.4;
        const push = Math.min(c, 1.9) * 0.55;
        const swing = Math.max(0, Math.sin(c * 7.5));
        return (
          <group key={i}>
            <Folk kind={kind} n={i + 2} position={f(x - push, 0, z)} rotationY={WEST} walk={c * 0.6 + ph} mood="angry" arms={1} lean={0.12} />
            <Raider who={who} position={f(x - 1.25 - push, 0, z + 0.1)} rotationY={EAST} animation={c > 1.9 ? "stagger" : "guard"} face={c > 1.9 ? "scared" : "worried"} phase={i} headPitch={-0.1} />
            <Spark at={f(x - 0.65 - push, 1.25, z + 0.1)} k={swing > 0.8 && c < 1.9 ? (swing - 0.8) * 5 : 0} />
          </group>
        );
      }
      if (how === "shoot") {
        const c = (t * 1.1 + ph) % 1.3;
        const fly = clamp((c - 0.35) / 0.3);
        const duck = bump(c, 0.4, 0.6);
        return (
          <group key={i}>
            <Folk kind={kind} n={i + 2} position={f(x + 1.4, 0, z)} rotationY={WEST} mood="angry" rattle={c < 0.35 ? 0.6 : 0} lean={c < 0.35 ? -0.1 : 0.08} />
            <group position={f(x + 1.05, 1.05, z + 0.28)} rotation={[0, 0, Math.PI / 2]}>
              <Block position={[0, 0, 0]} size={[0.05, 0.9, 0.05]} color="#6b4a2a" />
              <Block position={[0, 0, -0.1]} size={[0.02, 0.86, 0.02]} color="#e8e8e8" castShadow={false} />
            </group>
            {c > 0.35 && c < 0.9 ? <Block position={f(x + 1.0 - fly * 4.2, 1.45 - fly * 0.2, z + 0.1)} size={[0.6, 0.04, 0.04]} color="#e8e4d8" emissive="#e8e4d8" emissiveIntensity={0.4} castShadow={false} /> : null}
            <group position={f(x - 1.5, -0.5 * duck, z + 0.1)} rotation={[0, 0, 0]}>
              <Raider who={who} sword={i % 2 === 0} rotationY={EAST} animation={duck > 0.2 ? "cower" : "guard"} face={duck > 0.2 ? "scared" : "worried"} phase={i} />
            </group>
          </group>
        );
      }
      const c = (t * 0.8 + ph) % 1.6;
      const j = clamp(c / 0.55);
      const hop = Math.sin(Math.PI * j) * 1.4;
      const dive = ease01(clamp((c - 0.2) / 0.4));
      return (
        <group key={i}>
          <Folk kind={kind} n={i + 2} position={f(x + 1.6 - 2.9 * j, kind === "enderman" ? 0 : hop, z)} rotationY={WEST} mood="angry" walk={c * 2} lean={0.3 * Math.sin(Math.PI * j)} shake={kind === "enderman" ? 1 : undefined} />
          <Raider who={who} sword={false} position={f(x - 1.4 - 0.4 * dive, 0, z + 0.1 + 1.5 * dive)} rotationY={EAST + 1.2 * dive} animation={c < 1.0 ? "panic" : "scared"} face="scared" phase={i} />
        </group>
      );
    })}
  </>
);
const ease01 = (k: number): number => k * k * (3 - 2 * k);

/**
 * What stands in the castle yard, by where the story has got to. Every fort shot draws one of these.
 *   plug     the east wall is still whole (before 5.boom)
 *   lit      0–1, the windows
 *   smoke    smoke hangs in the hole
 *   hero     where the teller is: asleep, sitting up, standing in his cage, or drawn by the shot ("none")
 *   door     0 shut, 1 open
 *   mo       Mo is in his cage
 *   sleeper  the man on the lookout tower is at his post
 *   teacher  the enderman is at the lock
 *   patrol   the night shift is walking about (before the fight)
 *   golem    where the golem is, if it is not the shot's business
 */
export const Yard: React.FC<{
  t: number; plug?: boolean; lit?: number; smoke?: boolean; hero?: "none" | "sleep" | "sit" | "stand"; door?: number; mo?: boolean; sleeper?: boolean; teacher?: boolean;
  patrol?: boolean; golem?: Vec3; heroLook?: Vec3; heroFace?: React.ComponentProps<typeof Hero>["face"];
}> = ({ t, plug = false, lit = 1, smoke = false, hero = "none", door = 0, mo = true, sleeper = false, teacher = false, patrol = false, golem, heroLook, heroFace }) => (
  <>
    {plug ? <WallPlug /> : null}
    <Lights lit={lit} />
    <CageDoor k={door} />
    {mo ? <MoInCage /> : null}
    {smoke ? (
      <>
        <Smoke position={[HOLE[0], 0.5, HOLE[2]]} rise={9} spread={2.2} size={1.7} count={18} opacity={0.4} seed={3} />
        {[[-1.2, -1.6, 0.9], [-2.4, 0.4, 0.6], [1.0, 1.2, 0.8], [-3.6, -0.6, 0.5], [0.6, -2.2, 0.7]].map(([x, z, s], i) => (
          <group key={i} position={[HOLE[0] + x, s / 2, HOLE[2] + z]} rotation={[0, i * 0.7, 0]}>
            <Block size={[s * 1.3, s, s]} color={i % 2 ? "#77777a" : "#66666a"} />
          </group>
        ))}
      </>
    ) : null}
    {hero === "sleep" ? (
      <Flat position={f(-4.25, 0.08, 0.3)} rotationY={EAST}>
        <Hero animation="idle" face="sleepy" blink={false} breath={0.4} />
      </Flat>
    ) : hero === "sit" ? (
      <Hero position={f(-5, 0.08, 0.2)} rotationY={0} animation="sit" face={heroFace ?? "uneasy"} lookAt={heroLook} />
    ) : hero === "stand" ? (
      <Hero position={f(-5, 0.08, 0.45)} rotationY={0} animation="idle" face={heroFace ?? "uneasy"} lookAt={heroLook} />
    ) : null}
    {sleeper ? <Raider who={5} sword={false} position={up(LOOK, 0)} rotationY={0} animation="sit" face="sleepy" headPitch={0.5} blink={false} /> : null}
    {teacher ? <Postman position={T2} rotationY={NORTH} shake={0.4} lookAt={heroLook} /> : null}
    {patrol ? (
      <>
        <VGuard position={f(-8 + ((t * 0.7) % 4), 0, 3.2)} rotationY={EAST} n={0} walk={t * 0.7} />
        <VGuard position={f(8.4, 0, -2.6)} n={1} />
        <VGuard position={f(-1.7, 0, -10.2)} n={2} />
        <VGuard position={f(1.7, 0, -10.2)} n={3} />
        <Raider who={3} torch position={f(13 - ((t * 0.6) % 5), 0, 1.8)} rotationY={WEST} animation="walk" />
        <Raider who={1} position={f(17.5, 6.1, 7 - ((t * 0.5) % 4))} rotationY={NORTH} animation="walk" />
      </>
    ) : null}
    {golem ? <IronGolem position={golem} rotationY={EAST} scale={G} walk={t * 0.8} /> : null}
  </>
);

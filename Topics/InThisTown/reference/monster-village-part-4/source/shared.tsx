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

/** Fights going on in the yard: [monster, x, z, which player, what the player is doing]. */
const FIGHTS: Array<[Kind, number, number, number, "cower" | "panic" | "stagger" | "scared"]> = [
  ["zombie", -3.6, -4.2, 1, "cower"], ["skeleton", 0.6, -6.4, 2, "stagger"], ["spider", 3.8, -3.6, 3, "panic"], ["zombie", -1.2, -8.6, 4, "scared"],
  ["creeper", 4.6, -8.2, 5, "panic"], ["zombie", -7.4, -1.6, 2, "cower"], ["skeleton", 2.6, -2.2, 4, "stagger"], ["enderman", -5.4, -7.4, 3, "cower"],
];
export const Battle: React.FC<{ t: number; look?: Vec3; n?: number }> = ({ t, look, n = FIGHTS.length }) => (
  <>
    {FIGHTS.slice(0, n).map(([kind, x, z, who, anim], i) => (
      <group key={i}>
        <Folk kind={kind} n={i + 2} position={f(x + Math.sin(t * 2 + i) * 0.15, 0, z)} rotationY={WEST} walk={look ? undefined : t * 1.2 + i} lookAt={look} mood="angry" />
        <Raider who={who} sword={i % 2 === 0} position={f(x - 1.5 - Math.abs(Math.sin(t * 2 + i)) * 0.2, 0, z + 0.1)} rotationY={EAST} animation={anim} face={i % 2 ? "scared" : "worried"} lookAt={look} phase={i} />
      </group>
    ))}
  </>
);

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
        <Smoke position={[HOLE[0], 0.5, HOLE[2]]} rise={11} spread={2.6} size={4.5} count={10} opacity={0.5} seed={3} />
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

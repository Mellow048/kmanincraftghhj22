import type React from "react";
import { Block, MinecraftAvatar, PixelText } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import timingJson from "./timing.json";

/**
 * This film's cast, places and props.
 *
 * The camera rule of the topic: the camera goes to the NOUN. When the voice says plate, the shot is the plate; when
 * it says arm, the shot is the arm, close enough to fill the frame. `look()` and `face()` are the two recipes, so a
 * scene reads as a list of things rather than a list of camera settings.
 */

export const timing = timingJson as unknown as Timing;

/** One floor each: the hut he lost, the yard with the bell, the market where his mouth works. */
export const PLACE = {
  hut: [0, 0, 0] as Vec3,
  yard: [0, 0, 30] as Vec3,
  market: [0, 0, 60] as Vec3,
};

export type Zone = keyof typeof PLACE;

export const A = (zone: Zone, x: number, y: number, z: number): Vec3 => [PLACE[zone][0] + x, y, PLACE[zone][2] + z];

type A2 = Partial<MinecraftAvatarProps>;

/** The teller. Blank face by default: he reports all of this as a normal week. */
export const Hero: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={0.98}
    outfit="tee"
    skin="#e0b184"
    hair="#2a1c12"
    face="blank"
    colors={{ torso: "#c9552e", arms: "#c9552e", legs: "#3a3f55" }}
    blink
    {...p}
  />
);

/** The villager who trades. Smug, robed, and never in a hurry. */
export const Trader: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={1.04}
    outfit="gown"
    skin="#9a7a4f"
    hair="#3a2a18"
    face="smug"
    colors={{ torso: "#4f7a4a", arms: "#4f7a4a", legs: "#3b3a2e" }}
    blink
    {...p}
  />
);

/** A prop the camera can be pointed at: a thing, at a point, that the shot is allowed to be about. */
export const Table: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Block position={[0, 0.8, 0]} size={[1.5, 0.12, 1.0]} color="#8a5f34" />
    {[[-0.62, -0.38], [0.62, -0.38], [-0.62, 0.38], [0.62, 0.38]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.4, z]} size={[0.12, 0.8, 0.12]} color="#6f4a2a" />
    ))}
  </group>
);

export const Chair: React.FC<{ at: Vec3; knocked?: boolean }> = ({ at, knocked }) => (
  <group position={at} rotation={knocked ? [0, 0.5, -1.4] : undefined}>
    <Block position={[0, 0.45, 0]} size={[0.5, 0.1, 0.5]} color="#8a5f34" />
    <Block position={[0, 0.75, -0.22]} size={[0.5, 0.6, 0.1]} color="#7a5230" />
    {[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.22, z]} size={[0.08, 0.44, 0.08]} color="#6f4a2a" />
    ))}
  </group>
);

export const Bed: React.FC<{ at: Vec3; sleeper?: boolean }> = ({ at, sleeper }) => (
  <group position={at}>
    <Block position={[0, 0.25, 0]} size={[1.3, 0.3, 2.1]} color="#6f4a2a" />
    <Block position={[0, 0.46, 0]} size={[1.2, 0.16, 2.0]} color="#d8d2c0" />
    <Block position={[0, 0.56, -0.6]} size={[0.9, 0.14, 0.4]} color="#e8e2d2" />
    <Block position={[0, 0.62, 0.5]} size={[1.2, 0.06, 0.9]} color="#7a4a52" />
  </group>
);

/** The plate: white, wide, and the most expensive object in the film. */
export const Plate: React.FC<{ at: Vec3; stew?: boolean; empty?: boolean }> = ({ at, stew, empty }) => (
  <group position={at}>
    <Block position={[0, 0, 0]} size={[0.62, 0.05, 0.62]} color={empty ? "#cfc8b6" : "#e8e4d8"} />
    <Block position={[0, 0.06, 0]} size={[0.4, 0.04, 0.4]} color="#cfc8b6" />
    {stew ? <Block position={[0, 0.1, 0]} size={[0.42, 0.06, 0.42]} color="#4a3220" /> : null}
  </group>
);

export const Stick: React.FC<{ at: Vec3; held?: boolean }> = ({ at, held }) => (
  <group position={at} rotation={[0, 0, held ? 0.15 : 0.28]}>
    <Block position={[0, held ? 0.5 : 1.1, 0]} size={[0.07, held ? 1.0 : 2.2, 0.07]} color="#6b4a2a" />
  </group>
);

/** The receipt: paper with ink you can read when the camera pushes in. */
export const Receipt: React.FC<{ at: Vec3; tilt?: boolean }> = ({ at, tilt }) => (
  <group position={at} rotation={tilt ? [-0.3, 0.2, 0.06] : undefined}>
    <Block position={[0, 0, 0]} size={[0.42, 0.55, 0.02]} color="#f2efe4" />
    <PixelText text="STEW 1" position={[0, 0.13, 0.03]} height={0.055} color="#2a2a2a" maxWidth={0.36} />
    <PixelText text="NO REFUND" position={[0, -0.01, 0.03]} height={0.055} color="#2a2a2a" maxWidth={0.36} />
    <PixelText text="BINDING" position={[0, -0.15, 0.03]} height={0.055} color="#8a1f1f" maxWidth={0.36} />
  </group>
);

/** The bell that decides who owns what. */
export const Bell: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Block position={[0, -0.4, 0]} size={[0.16, 1.6, 0.16]} color="#5c3f22" />
    <Block position={[0, 0.42, 0]} size={[0.5, 0.5, 0.5]} color="#d8a83a" />
    <Block position={[0, 0.68, 0]} size={[0.24, 0.1, 0.24]} color="#8a6a1e" />
    <Block position={[0, 0.12, 0]} size={[0.12, 0.12, 0.12]} color="#8a6a1e" />
  </group>
);

/** A stall: two posts, a counter, and everything he now says for me. */
export const Stall: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Block position={[0, 0.5, 0]} size={[2.4, 0.12, 0.9]} color="#8a5f34" />
    {[-1.1, 1.1].map((x, i) => (
      <Block key={i} position={[x, 1.2, 0]} size={[0.12, 1.4, 0.12]} color="#6f4a2a" />
    ))}
    <Block position={[0, 2.0, 0]} size={[2.6, 0.12, 1.2]} color="#a8623a" />
    <Block position={[0.6, 0.72, 0.1]} size={[0.3, 0.3, 0.3]} color="#c9a13a" />
  </group>
);

/** The camera goes to the thing: a prop, close, looking down at it a little. */
export const look = (on: Vec3, dist = 1.3, yaw = 22, pitch = 14, fov = 32) => ({
  on,
  dist,
  to: dist * 0.86,
  yaw,
  pitch,
  fov,
});

/** A face, at reading distance, dead level. */
export const face = (on: Vec3, dist = 2.3, yaw = 6, pitch = 3, fov = 40) => ({
  on,
  dist,
  to: dist * 0.94,
  yaw,
  pitch,
  fov,
});

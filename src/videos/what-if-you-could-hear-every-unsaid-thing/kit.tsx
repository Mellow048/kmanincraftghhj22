import type React from "react";
import { MinecraftAvatar, PixelText, cam, useFilmTime } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import timingJson from "./timing.json";

/**
 * This film's cast, places and its one visual device.
 *
 * The device: a sentence somebody decided not to say appears in the air beside their head, small, pale, and it
 * fades. It is never a caption — captions are the spoken words, white and outlined. These are grey, they have no
 * outline, and they are always used the same way, so the audience learns the language in one shot.
 */

export const timing = timingJson as unknown as Timing;

/** The middle of each floor. Far apart, so a cut is a cut. */
export const PLACE = {
  class: [0, 0, 0] as Vec3,
  hall: [0, 0, 40] as Vec3,
  kitchen: [0, 0, 80] as Vec3,
  room: [0, 0, 120] as Vec3,
};

export type ZoneName = keyof typeof PLACE;

/** A point inside a place: metres from the middle of its floor. */
export const A = (zone: ZoneName, x: number, y: number, z: number): Vec3 => [
  PLACE[zone][0] + x,
  y,
  PLACE[zone][2] + z,
];

type A2 = Partial<MinecraftAvatarProps>;

export const KIDS_SCALE = 0.92;

/** The teller: one loud colour nobody else wears, so a phone can find him in a class. */
export const Hero: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={KIDS_SCALE}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    face="brave"
    colors={{ torso: "#ff7a1a", arms: "#ff7a1a", legs: "#2b2f6a" }}
    blink
    {...p}
  />
);

/** The friend who moves away: teal, and never says the thing. */
export const Friend: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={KIDS_SCALE}
    outfit="tee"
    skin="#8a5a3c"
    hair="#1f1a18"
    face="uneasy"
    colors={{ torso: "#2fb5a8", arms: "skin", legs: "#3a3344" }}
    blink
    {...p}
  />
);

/** Mum: purple cardigan, and a smile she puts on after the sentence. */
export const Mum: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={1.04}
    outfit="tee"
    skin="#e0b48c"
    hair="#4a3324"
    face="smile"
    colors={{ torso: "#7d5aa8", arms: "#7d5aa8", legs: "#3b3346" }}
    blink
    {...p}
  />
);

/** Dad: blue work shirt, beard, and four words he has never said. */
export const Dad: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={1.06}
    outfit="tee"
    skin="#e0b184"
    hair="#1a1417"
    face="bearded"
    colors={{ torso: "#2c4f96", arms: "#2c4f96", legs: "#565f6e" }}
    blink
    {...p}
  />
);

/**
 * An unsaid sentence, hanging in the air beside the person who did not say it.
 * Pale grey, no outline, small: it must never be confused with a caption.
 */
export const Unsaid: React.FC<{ text: string; at: Vec3; from?: number; height?: number }> = ({
  text,
  at,
  from = 0,
  height = 0.13,
}) => {
  const t = useFilmTime();
  const k = Math.max(0, Math.min(1, (t - from) / 0.25));
  if (k <= 0) return null;
  return (
    <group position={[at[0], at[1], at[2]]} scale={[k, k, k]}>
      <PixelText text={text} position={[0, 0, 0]} height={height} maxWidth={1.6} color="#cfd6e2" />
    </group>
  );
};

/** A camera that keeps a standing person whole in a tall frame. */
export const fit = (o: Omit<Parameters<typeof cam.push>[0], "to"> & { to?: number }) => {
  const dist = Math.min(Math.max(o.dist * 1.2, 2.6), 5.6);
  return {
    ...o,
    on: [o.on[0], Math.min(o.on[1], 1.16), o.on[2]] as Vec3,
    dist,
    to: Math.max(o.to ?? dist * 0.9, 2.5),
    fov: Math.max(o.fov ?? 45, 46),
  };
};

/** Where the class desks sit, if a scene wants a row. */
export const SEAT = (x: number, z: number): Vec3 => A("class", x, 0, z);

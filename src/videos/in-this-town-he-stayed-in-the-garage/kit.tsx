import type React from "react";
import { Block, MinecraftAvatar, Vox, useFilmTime } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, Smoke, SubscribeSign, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export { Smoke, SubscribeSign, ease, pop, ramp } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const DAY = "overworld-day";
export const NIGHT = "overworld-night";

/** Open ground. The shop faces south, so a camera on +Z looks into the bay and not into a wall. */
export const PLACE = {
  party: [0, 0, -3.2] as Vec3,
  window: [1.6, 2.4, -4.6] as Vec3,
  yard: [11, 0, -1.2] as Vec3,
  hedge: [14.2, 0, 0.4] as Vec3,
  shop: [-12, 0, 0.4] as Vec3,
  room: [0, 0, 80] as Vec3,
};

type A = Partial<MinecraftAvatarProps>;

/** The teller. Yellow, so he reads in a crowd of party clothes. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#e8a21c", arms: "#e8a21c", legs: "#3b3fa0" }} blink {...p} />
);

export const Pal: React.FC<A & { shirt: string; hair?: string }> = ({ shirt, hair = "#6a3a18", ...p }) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#e4b08a" hair={hair} colors={{ torso: shirt, arms: "#e4b08a", legs: "#2a3348" }} blink {...p} />
);

export const Boss: React.FC<A> = (p) => (
  <MinecraftAvatar scale={1} outfit="tee" skin="#c4a07a" hair="#2a2118" colors={{ torso: "#6a5038", arms: "#c4a07a", legs: "#3a3028" }} face="bearded" blink {...p} />
);

/** A block car. `hood` 0..1 opens it. `lift` jacks it. `light` is the headlight. `running` means it started. */
export const Car: React.FC<{
  position?: Vec3;
  rotationY?: number;
  color?: string;
  hood?: number;
  lift?: number;
  light?: number;
  running?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, color = "#c4443a", hood = 0, lift = 0, light = 0, running = 0 }) => (
  <group position={[position[0], position[1] + lift, position[2]]} rotation={[0, rotationY, 0]}>
    <Vox kind="wool" tint={color} position={[0, 0.55, 0]} size={[1.7, 0.5, 3.3]} />
    <Vox kind="wool" tint={color} position={[0, 1.12, -0.2]} size={[1.55, 0.65, 1.6]} />
    <Block position={[0, 1.18, 0.62]} size={[1.35, 0.48, 0.06]} color="#b9e4f5" />
    <group position={[0, 0.82, 1.05]} rotation={[-hood * 1.15, 0, 0]}>
      <Vox kind="wool" tint={color} position={[0, 0.02, 0.4]} size={[1.6, 0.1, 0.85]} />
    </group>
    {(
      [
        [-0.78, 1.05],
        [0.78, 1.05],
        [-0.78, -1.05],
        [0.78, -1.05],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <Vox key={i} kind="obsidian" position={[x, 0.28, z]} size={[0.22, 0.5, 0.5]} />
    ))}
    {[-1, 1].map((s) => (
      <Block
        key={s}
        position={[s * 0.46, 0.62, 1.68]}
        size={[0.28, 0.16, 0.06]}
        color="#fff6c8"
        emissive="#ffe08a"
        emissiveIntensity={0.35 + light * 2.4 + running * 1.6}
      />
    ))}
    {running > 0.15 ? <pointLight position={[0, 0.7, 2.1]} intensity={6 * running} distance={9} color="#fff2c0" /> : null}
  </group>
);

/** The chant, made visible. `spin` is turns per second. */
export const Wrench: React.FC<{ position?: Vec3; spin?: number }> = ({ position = [0, 0, 0], spin = 0 }) => {
  const t = useFilmTime();
  return (
    <group position={position} rotation={[0.5, t * spin, 0.3]}>
      <Vox kind="stone" tint="#c5ccd4" position={[0, 0, 0]} size={[0.08, 0.72, 0.08]} />
      <Vox kind="stone" tint="#9aa3ad" position={[0, 0.34, 0]} size={[0.28, 0.08, 0.08]} />
    </group>
  );
};

export const Tire: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Vox kind="obsidian" position={[0, 0, 0]} size={[0.22, 0.72, 0.72]} />
    <Vox kind="wool" tint="#d7dde4" position={[0, 0, 0]} size={[0.26, 0.28, 0.28]} />
  </group>
);

/** A television. The mechanic on it is a real person, small, inside the glass. */
export const Tv: React.FC<{ position?: Vec3; on?: number }> = ({ position = [0, 0, 0], on = 1 }) => (
  <group position={position}>
    <Vox kind="darkPlanks" position={[0, 0, 0]} size={[1.7, 1.15, 0.16]} />
    <Block position={[0, 0.02, 0.09]} size={[1.4, 0.86, 0.04]} color="#16324a" emissive="#7ec8ff" emissiveIntensity={0.35 + on * 1.2} />
    <Vox kind="log" position={[0, -0.72, 0]} size={[0.16, 0.4, 0.16]} />
  </group>
);

/** Pages of a calendar, already mid-flip. */
export const Pages: React.FC<{ position?: Vec3; flip?: number }> = ({ position = [0, 0, 0], flip = 0 }) => (
  <group position={position}>
    <Vox kind="wool" tint="#f4efe4" position={[0, 0, 0]} size={[0.7, 0.9, 0.06]} />
    <Vox kind="wool" tint="#e7d7a8" position={[0.05, 0.05, 0.04 + flip * 0.2]} rotation={[flip * 1.2, 0, flip * 0.4]} size={[0.62, 0.8, 0.03]} />
    <Vox kind="wool" tint="#f7f3ea" position={[-0.08, 0.12, 0.1 + flip * 0.45]} rotation={[0.4 + flip, 0.2, -0.5]} size={[0.55, 0.7, 0.03]} />
  </group>
);

import type React from "react";
import { Block, Vox, clamp, shade, useFilmTime } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { MONSTER, Zombie, wordClock } from "../../../Topics/InThisTown";
import type { Mood } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export { CLIFF, GATE, PATH_TOP, SCHOOL } from "./marks";
export {
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
  Bubble, Bits, FireLight, Lantern, LanternLine, LanternPost, Pine, ForestEdge, Puffs, Smoke, SubscribeSign,
  MonsterEgg, SoundRings,
  Hut, Bell, Fence, LongTable, SchoolDesk,
  Zombie, MONSTER, monsterFace,
} from "../../../Topics/InThisTown";
export { Torch } from "../../engine";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

/** Smooth arc jump starting at `at`, rising `h` metres over `dur` seconds. */
export const hop = (t: number, at: number, h = 0.28, dur = 0.34): number => {
  const u = (t - at) / dur;
  return u > 0 && u < 1 ? Math.sin(u * Math.PI) * h : 0;
};

/** The teller: a baby zombie in a loud red shirt so every frame spots him at once. */
export const Hero: React.FC<{
  position?: Vec3;
  rotationY?: number;
  walk?: number;
  mood?: Mood;
  lookAt?: Vec3;
  nod?: number;
  turn?: number;
  tilt?: number;
  arms?: number;
  wave?: number;
  armPitch?: [number, number];
  lean?: number;
  phase?: number;
  scale?: number;
}> = (p) => (
  <Zombie
    baby
    shirt="#d63b2f"
    legs="#2e3b6e"
    scarf="#f2c14e"
    arms={0.2}
    {...p}
  />
);

/** Other zombie kids at school (distinct muted shirts so the red-shirted Hero stands out). */
export const ZombieKid: React.FC<{
  position?: Vec3;
  rotationY?: number;
  walk?: number;
  mood?: Mood;
  lookAt?: Vec3;
  shirt?: string;
  scarf?: string;
  armPitch?: [number, number];
  tilt?: number;
  nod?: number;
  turn?: number;
  lean?: number;
  wave?: number;
  scale?: number;
  phase?: number;
}> = ({ shirt = "#3a7d8c", ...p }) => (
  <Zombie baby shirt={shirt} legs="#343b5c" arms={0.3} {...p} />
);

/** Big zombie mums (tall adults with pink bows or scarves). */
export const ZombieMum: React.FC<{
  position?: Vec3;
  rotationY?: number;
  walk?: number;
  mood?: Mood;
  lookAt?: Vec3;
  shirt?: string;
  scarf?: string;
  hat?: "none" | "straw" | "bow";
  arms?: number;
  armPitch?: [number, number];
  lean?: number;
  tilt?: number;
  nod?: number;
  turn?: number;
  wave?: number;
  scale?: number;
  phase?: number;
}> = ({ shirt = "#2a8c82", hat = "bow", ...p }) => (
  <Zombie shirt={shirt} hat={hat} {...p} />
);

/**
 * MumChicken: an articulated Minecraft chicken with a pink bow, flapping wings,
 * walking legs, crouch, lookAt, and a saddle socket (`children`) for the rider!
 * Feet rest at y = 0.
 */
export const MumChicken: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  walk?: number;
  flap?: number;
  crouch?: number;
  peck?: number;
  tilt?: number;
  wingsSpread?: number;
  asleep?: boolean;
  bow?: boolean;
  lookAt?: Vec3;
  headYaw?: number;
  headPitch?: number;
  phase?: number;
  children?: React.ReactNode;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1.18,
  walk = 0,
  flap = 0,
  crouch = 0,
  peck = 0,
  tilt = 0,
  wingsSpread = 0,
  asleep = false,
  bow = true,
  lookAt,
  headYaw = 0,
  headPitch = 0,
  phase = 0,
  children,
}) => {
  const t = useFilmTime() + phase;
  const gait = walk * 7.8;
  const legSwing = Math.sin(gait) * 0.68;
  const bodyRoll = (walk > 0.01 ? Math.sin(gait) * 0.055 : 0) + tilt;
  const bob = Math.abs(Math.sin(gait)) * 0.032 + Math.sin(t * 2.8) * 0.008;
  const idleHead = Math.sin(t * 2.2) * 0.04;
  const wingBeat = flap > 0.05 ? Math.sin(t * 24) * 0.82 * flap : Math.sin(t * 3.2) * 0.03;
  const wingLift = Math.max(flap * 0.7 + wingBeat, wingsSpread * 1.25);

  let yaw = headYaw + (lookAt ? 0 : Math.sin(t * 1.9) * 0.06);
  let pitch = headPitch + idleHead;
  if (lookAt) {
    const dx = lookAt[0] - position[0];
    const dz = lookAt[2] - position[2];
    const dy = lookAt[1] - (position[1] + 0.62 * scale);
    let rel = Math.atan2(dx, dz) - rotationY;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    yaw = clamp(rel, -1.25, 1.25);
    pitch = clamp(-Math.atan2(dy, Math.hypot(dx, dz)), -0.75, 0.75) + idleHead;
  }
  const shut = asleep || (t + phase * 1.3) % 3.9 < 0.11;
  const dropY = crouch * 0.14;

  return (
    <group position={position} rotation={[0, rotationY, bodyRoll]} scale={scale}>
      {/* Feet & legs */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.075, 0.22 - dropY * 0.5, 0.02]} rotation={[s * legSwing, 0, 0]}>
          <Block position={[0, -0.1, 0]} size={[0.045, 0.2, 0.045]} color="#f2b21a" />
          <Block position={[0, -0.2, 0.035]} size={[0.08, 0.03, 0.1]} color="#f2b21a" />
        </group>
      ))}

      {/* Body */}
      <group position={[0, 0.36 + bob - dropY, 0]}>
        <Block position={[0, 0, 0]} size={[0.34, 0.3, 0.44]} color="#f7f5f0" />
        <Block position={[0, 0.04, -0.22]} size={[0.24, 0.18, 0.08]} color="#ece8df" />

        {/* Articulated Wings */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.18, 0.1, 0]} rotation={[0, 0, s * wingLift]}>
            <Block position={[s * 0.03, -0.08, 0]} size={[0.06, 0.2, 0.32]} color="#e3ded5" />
          </group>
        ))}

        {/* Rider Socket (Hero rides squarely on the chicken's back!) */}
        <group position={[0, 0.14, -0.03]}>{children}</group>

        {/* Neck & Head */}
        <group position={[0, 0.12, 0.21]} rotation={[pitch + peck * 0.8 + (asleep ? 0.35 : 0), yaw, 0]}>
          <Block position={[0, 0.12, 0]} size={[0.21, 0.3, 0.17]} color="#f7f5f0" />
          {/* Comb */}
          <Block position={[0, 0.29, 0.01]} size={[0.05, 0.06, 0.11]} color="#d82a1a" />
          {/* Beak */}
          <Block position={[0, 0.12, 0.13]} size={[0.19, 0.08, 0.11]} color="#f2b21a" />
          {/* Wattle */}
          <Block position={[0, 0.04, 0.1]} size={[0.08, 0.1, 0.06]} color="#d82a1a" />
          {/* Eyes */}
          {[-1, 1].map((s) => (
            <Block
              key={s}
              position={[s * 0.106, 0.19, 0.03]}
              size={[0.012, shut ? 0.018 : 0.05, 0.05]}
              color={shut ? "#555555" : "#111111"}
              castShadow={false}
            />
          ))}
          {/* Pink Mum Bow */}
          {bow ? (
            <group position={[0, 0.29, -0.02]}>
              {[-1, 1].map((s) => (
                <Block key={s} position={[s * 0.06, 0.02, 0]} rotation={[0, 0, s * 0.35]} size={[0.09, 0.07, 0.04]} color="#e64b84" />
              ))}
              <Block position={[0, 0.01, 0]} size={[0.04, 0.04, 0.05]} color="#b8295f" />
            </group>
          ) : null}
        </group>
      </group>
    </group>
  );
};

/** A round Minecraft-style white egg that can pop, wobble, and crack. */
export const WhiteEgg: React.FC<{
  position?: Vec3;
  scale?: number;
  wobble?: number;
  cracked?: boolean;
}> = ({ position = [0, 0, 0], scale = 1, wobble = 0, cracked = false }) => {
  const t = useFilmTime();
  const tilt = wobble * Math.sin(t * 20) * 0.28;
  const bounce = wobble > 0.2 ? Math.abs(Math.sin(t * 10)) * 0.045 * wobble : 0;
  return (
    <group position={[position[0], position[1] + bounce, position[2]]} rotation={[0, 0, tilt]} scale={scale}>
      <Block position={[0, 0.12, 0]} size={[0.24, 0.22, 0.24]} color="#f7f4eb" />
      <Block position={[0, 0.25, 0]} size={[0.18, 0.09, 0.18]} color="#fbf9f2" />
      <Block position={[0, 0.03, 0]} size={[0.18, 0.06, 0.18]} color="#e6dfd0" />
      {cracked ? (
        <>
          <Block position={[0.04, 0.17, 0.122]} size={[0.08, 0.025, 0.01]} color="#3a332c" castShadow={false} />
          <Block position={[-0.03, 0.13, 0.122]} size={[0.09, 0.025, 0.01]} color="#3a332c" castShadow={false} />
          <Block position={[0.02, 0.15, 0.122]} size={[0.025, 0.06, 0.01]} color="#3a332c" castShadow={false} />
        </>
      ) : null}
    </group>
  );
};

/** A cozy rooftop hay nest ring. */
export const StrawNest: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Vox kind="planks" tint="#c9a548" position={[0, 0.06, 0]} size={[1.4, 0.12, 1.4]} />
    <Vox kind="planks" tint="#dbb85a" position={[0, 0.17, -0.6]} size={[1.5, 0.22, 0.26]} />
    <Vox kind="planks" tint="#dbb85a" position={[0, 0.17, 0.6]} size={[1.5, 0.22, 0.26]} />
    <Vox kind="planks" tint="#d1ad4e" position={[-0.6, 0.17, 0]} size={[0.26, 0.22, 1.2]} />
    <Vox kind="planks" tint="#d1ad4e" position={[0.6, 0.17, 0]} size={[0.26, 0.22, 1.2]} />
  </group>
);

/** Mountain wooden bridge spanning x = -1.4 .. 4.6 at y = 4.5, z = 95. */
export const CliffBridge: React.FC<{ broken?: boolean; dropT?: number }> = ({ broken = false, dropT = 0 }) => (
  <group>
    <Vox kind="log" position={[-0.7, 4.46, 93.8]} size={[1.4, 0.16, 0.16]} />
    <Vox kind="log" position={[-0.7, 4.46, 96.2]} size={[1.4, 0.16, 0.16]} />
    <Vox kind="log" position={[3.9, 4.46, 93.8]} size={[1.4, 0.16, 0.16]} />
    <Vox kind="log" position={[3.9, 4.46, 96.2]} size={[1.4, 0.16, 0.16]} />
    <Vox kind="planks" tint="#7c5432" position={[-0.8, 4.44, 95]} size={[1.2, 0.14, 2.4]} />
    <Vox kind="planks" tint="#7c5432" position={[4.0, 4.44, 95]} size={[1.2, 0.14, 2.4]} />
    {!broken ? (
      <Vox kind="planks" tint="#8a5e39" position={[1.6, 4.44, 95]} size={[3.6, 0.14, 2.4]} />
    ) : (
      <>
        <Vox
          kind="planks"
          tint="#8a5e39"
          position={[0.7, 4.44 - dropT * dropT * 6.5, 95]}
          rotation={[0, 0, -dropT * 1.1]}
          size={[1.7, 0.14, 2.4]}
        />
        <Vox
          kind="planks"
          tint="#734c2b"
          position={[2.5, 4.44 - dropT * dropT * 7.2, 95]}
          rotation={[0, 0, dropT * 1.25]}
          size={[1.7, 0.14, 2.4]}
        />
      </>
    )}
  </group>
);

/** Wooden door that can stand shut or swing open / break into splinters. */
export const WoodenDoor: React.FC<{ position?: Vec3; broken?: boolean; open?: number }> = ({
  position = [0, 0, 0],
  broken = false,
  open = 0,
}) => (
  <group position={position}>
    {/* Door frame */}
    <Vox kind="log" position={[-0.55, 1.05, 0]} size={[0.18, 2.1, 0.24]} />
    <Vox kind="log" position={[0.55, 1.05, 0]} size={[0.18, 2.1, 0.24]} />
    <Vox kind="log" position={[0, 2.15, 0]} size={[1.28, 0.2, 0.24]} />
    {broken ? (
      <>
        <Vox kind="planks" position={[-0.15, 0.12, 0.45]} rotation={[1.35, 0.2, 0.15]} size={[0.88, 0.8, 0.1]} />
        <Vox kind="planks" position={[0.22, 0.18, 0.82]} rotation={[1.45, -0.35, 0.1]} size={[0.75, 0.65, 0.1]} />
      </>
    ) : (
      <group position={[-0.45, 0, 0]} rotation={[0, -open * 1.4, 0]}>
        <Vox kind="planks" position={[0.45, 1.0, 0]} size={[0.9, 2.0, 0.12]} />
        <Block position={[0.78, 1.0, 0.08]} size={[0.12, 0.12, 0.06]} color="#3a3a3a" />
      </group>
    )}
  </group>
);

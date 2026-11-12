import type React from "react";
import { Block, Vox, clamp, shade, useFilmTime } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { beside } from "./staging";
import { StrawHat } from "./things";

/**
 * VILLAGERS — the people of the town in "Everyone Had the Same Face": one face, no hands, one word.
 * And the iron golem that guards them, and the flower it gives.
 *
 * Part of the topic's pack (see PACK.md). They are built from boxes, not from `MinecraftAvatar`,
 * because the whole point of them is what an avatar has and they do not.
 */

const U = 1.8 / 32; // one Minecraft pixel, in metres
export const ADULT = 0.94;
export const CHILD = 0.7;
const VILLAGER_SKIN = "#bd8b72";

/** Robe colours. The face never changes, so the robe is how you tell who is who. */
export const ROBE = {
  brown: "#6b4a34",
  elder: "#6a3f8a",
  friend: "#4f9a3a",
  white: "#e2dccb",
  smith: "#3c3c44",
  farmer: "#8a6a3a",
  red: "#9a3f34",
  blue: "#3f5f9a",
};

export type VillagerProps = {
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  robe?: string;
  /** Metres walked. Drives the waddle. */
  walk?: number;
  /** Head angles, radians. `nod` positive looks down. */
  nod?: number;
  turn?: number;
  tilt?: number;
  /** World point for the head to look at. Overrides `nod` and `turn`. */
  lookAt?: Vec3;
  /** 0..1: saying "hmm". The head bobs and the nose wags. */
  hmm?: number;
  /** 0..1: trying to get the arms out of the sleeves. They do not come out. */
  strain?: number;
  /** Body pitch, radians: a bow. */
  lean?: number;
  /** "straw" is a farmer's small hat. "wide" is a hat as wide as a door (`StrawHat`), for a town that never looks up. */
  hat?: "none" | "straw" | "wide";
  /** A child: the same face on a slightly bigger head. */
  kid?: boolean;
  /** Sitting, the way a doll sits: legs straight out in front. Put `position` 0.56 m × scale under the seat. */
  sit?: boolean;
  phase?: number;
};

/**
 * A villager. Feet on `position`, facing +Z. One long nose, one long eyebrow,
 * and two arms folded into one block. There is exactly one face: do not add another.
 */
export const Villager: React.FC<VillagerProps> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = ADULT,
  robe = ROBE.brown,
  walk = 0,
  nod = 0,
  turn = 0,
  tilt = 0,
  lookAt,
  hmm = 0,
  strain = 0,
  lean = 0,
  hat = "none",
  kid = false,
  sit = false,
  phase = 0,
}) => {
  const t = useFilmTime();
  const u = U;
  const gait = walk * 5.4;
  const swing = Math.sin(gait) * 0.55;
  const bob = Math.abs(Math.sin(gait)) * 0.03 + Math.sin(t * 1.3 + phase) * 0.005;
  const sway = Math.sin(gait) * 0.035;

  let yaw = turn;
  let pitch = nod;
  if (lookAt) {
    const dx = lookAt[0] - position[0];
    const dz = lookAt[2] - position[2];
    const dy = lookAt[1] - (position[1] + 29 * u * scale);
    let rel = Math.atan2(dx, dz) - rotationY;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    yaw = clamp(rel, -1.2, 1.2);
    pitch = clamp(-Math.atan2(dy, Math.hypot(dx, dz)), -0.6, 0.65);
  }
  const wag = hmm * Math.sin(t * 17 + phase) * 0.24;
  const hmmBob = hmm * (0.07 + Math.sin(t * 8.5 + phase) * 0.05);
  const shake = strain * Math.sin(t * 41 + phase);
  const shut = (t + phase * 1.7) % 3.3 < 0.12;
  const sleeve = shade(robe, 0.07);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 2 * u, 12 * u, 0]} rotation={[sit ? -Math.PI / 2 : s * swing, 0, 0]}>
          <Block position={[0, -6 * u, 0]} size={[3.8 * u, 12 * u, 4 * u]} color={shade(robe, -0.3)} />
        </group>
      ))}
      <group position={[0, 12 * u + bob, 0]} rotation={[lean, 0, sway + shake * 0.02]}>
        <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 6 * u]} color={robe} />
        <Block position={[0, -2.6 * u, 0]} size={[8.7 * u, 7.2 * u, 6.7 * u]} color={shade(robe, -0.09)} />
        {/* The arms: two sleeves and the block that joins them. They are one piece, and they stay one piece. */}
        <group position={[0, (9 + strain * 1.6) * u + shake * 0.007, 1 * u]} rotation={[-0.75 - strain * 0.3 + shake * 0.05, 0, 0]}>
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 6 * u, -2 * u, 0]} size={[4 * u, 8 * u, 4 * u]} color={sleeve} />
          ))}
          <Block position={[0, -4 * u, 0]} size={[8 * u, 4 * u, 4 * u]} color={sleeve} />
          {/* The cuffs: a dark seam where each sleeve ends. No hand ever comes out of it. */}
          {[-1, 1].map((s) => (
            <Block key={`cuff${s}`} position={[s * 4 * u, -4 * u, 0]} size={[0.8 * u, 4.3 * u, 4.3 * u]} color={shade(robe, -0.42)} castShadow={false} />
          ))}
        </group>
        <group position={[0, 12 * u, 0]} rotation={[pitch + hmmBob, yaw, tilt]} scale={kid ? 1.16 : 1}>
          <Block position={[0, 5 * u, 0]} size={[8 * u, 10 * u, 8 * u]} color={VILLAGER_SKIN} />
          {/* One long eyebrow. */}
          <Block position={[0, 5.6 * u, 4.04 * u]} size={[6.2 * u, 1.1 * u, 0.12 * u]} color="#35261c" castShadow={false} />
          {shut ? (
            [-1, 1].map((s) => (
              <Block key={s} position={[s * 2 * u, 4.4 * u, 4.04 * u]} size={[2 * u, 0.3 * u, 0.1 * u]} color="#7a5646" castShadow={false} />
            ))
          ) : (
            [-1, 1].map((s) => (
              <group key={s}>
                <Block position={[s * 2.5 * u, 4.5 * u, 4.04 * u]} size={[1 * u, 1 * u, 0.1 * u]} color="#fbfbf5" castShadow={false} />
                <Block position={[s * 1.5 * u, 4.5 * u, 4.04 * u]} size={[1 * u, 1 * u, 0.1 * u]} color="#2f8f3a" castShadow={false} />
              </group>
            ))
          )}
          {/* One long nose. It hangs past the chin, and it wags when they say "hmm". */}
          <group position={[0, 3 * u, 4 * u]} rotation={[0, 0, wag]}>
            <Block position={[0, -2 * u, 1 * u]} size={[2 * u, 4 * u, 2 * u]} color={shade(VILLAGER_SKIN, -0.1)} />
          </group>
          {hat === "straw" ? (
            <>
              <Block position={[0, 10.4 * u, 0]} size={[13 * u, 0.9 * u, 13 * u]} color="#d9b84a" />
              <Block position={[0, 11.6 * u, 0]} size={[7 * u, 1.8 * u, 7 * u]} color="#c9a53a" />
            </>
          ) : null}
          {hat === "wide" ? <StrawHat position={[0, 10 * u, 0]} width={1.1} crown={0.52} /> : null}
        </group>
      </group>
    </group>
  );
};

/** Height of a villager's face above the feet, for a camera to look at. */
export const villagerFace = (p: Vec3, scale = ADULT): Vec3 => [p[0], p[1] + 29 * U * scale, p[2]];
export const villagerChest = (p: Vec3, scale = ADULT): Vec3 => [p[0], p[1] + 19 * U * scale, p[2]];

// ----------------------------------------------------------------------------- the iron golem

const IRON = "#d9d3c5";

/** A poppy. `position` is the bottom of the stem. */
export const Poppy: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.15, 0]} size={[0.04, 0.3, 0.04]} color="#3f8a35" />
    <Block position={[0.055, 0.13, 0]} size={[0.09, 0.035, 0.035]} color="#3f8a35" />
    <Block position={[0, 0.345, 0]} size={[0.17, 0.12, 0.17]} color="#e3261c" emissive="#e3261c" emissiveIntensity={0.25} />
    <Block position={[0, 0.41, 0]} size={[0.08, 0.03, 0.08]} color="#2a1410" />
  </group>
);

/**
 * The iron golem. Feet on `position`, facing +Z, 2.7 m tall at scale 1.
 * `armR` / `armL` are arm angles in radians: 0 hangs, -1.5 points straight ahead.
 * Leave them out and the arms swing with the walk.
 */
export const IronGolem: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  walk?: number;
  armR?: number;
  armL?: number;
  headPitch?: number;
  headYaw?: number;
  bow?: number;
  /** A poppy in the right hand (+X). */
  flower?: boolean;
  /** A straw hat as wide as a barn door. */
  hat?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, walk = 0, armR, armL, headPitch = 0, headYaw = 0, bow = 0, flower = false, hat = false }) => {
  const t = useFilmTime();
  const swing = Math.sin(walk * 2.4) * 0.4;
  const bob = Math.abs(Math.sin(walk * 2.4)) * 0.05 + Math.sin(t * 1.1) * 0.008;
  const angle = (s: number) => (s > 0 ? armR : armL) ?? -s * swing * 0.7;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.25, 1.0, 0]} rotation={[s * swing, 0, 0]}>
          <Vox kind="stone" tint={shade(IRON, -0.06)} position={[0, -0.5, 0]} size={[0.375, 1.0, 0.31]} />
        </group>
      ))}
      <group position={[0, 1.0 + bob, 0]} rotation={[bow * 0.6, 0, 0]}>
        <Vox kind="stone" tint={shade(IRON, -0.04)} position={[0, 0.16, 0]} size={[0.56, 0.32, 0.375]} />
        <Vox kind="stone" tint={IRON} position={[0, 0.69, 0]} size={[1.125, 0.75, 0.69]} />
        {/* Vines. It has stood here a long time. */}
        <Block position={[-0.34, 0.62, 0.35]} size={[0.13, 0.52, 0.02]} color="#4f8a3a" castShadow={false} />
        <Block position={[-0.22, 0.78, 0.35]} size={[0.13, 0.2, 0.02]} color="#5fa046" castShadow={false} />
        <Block position={[0.3, 0.42, 0.35]} size={[0.13, 0.18, 0.02]} color="#4f8a3a" castShadow={false} />
        <group position={[0, 1.06, 0.06]} rotation={[headPitch, headYaw, 0]}>
          <Vox kind="stone" tint={IRON} position={[0, 0.31, 0]} size={[0.5, 0.62, 0.5]} />
          <Block position={[0, 0.43, 0.253]} size={[0.44, 0.07, 0.02]} color="#8d877a" castShadow={false} />
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 0.13, 0.345, 0.254]} size={[0.11, 0.075, 0.02]} color="#8a1c16" emissive="#ff3a24" emissiveIntensity={0.55} castShadow={false} />
          ))}
          <Vox kind="stone" tint={shade(IRON, -0.08)} position={[0, 0.15, 0.31]} size={[0.125, 0.27, 0.125]} />
          {hat ? <StrawHat position={[0, 0.62, 0]} width={1.7} crown={0.6} /> : null}
        </group>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.69, 1.0, 0]} rotation={[angle(s), 0, 0]}>
            <Vox kind="stone" tint={shade(IRON, -0.03)} position={[0, -0.94, 0]} size={[0.25, 1.875, 0.375]} />
            {s < 0 ? <Block position={[0.127, -0.5, 0]} size={[0.02, 0.5, 0.2]} color="#4f8a3a" castShadow={false} /> : null}
            {s > 0 && flower ? <Poppy position={[0, -1.86, 0.12]} rotation={[-angle(s), 0, 0]} scale={1.25} /> : null}
          </group>
        ))}
      </group>
    </group>
  );
};

/** Where the golem's right hand is, in the world, for an arm at `angle`. Put the thing it gives there. */
export const golemHand = (p: Vec3, rotY: number, angle: number, scale = 1, side = 1): Vec3 =>
  beside(p, rotY, side * 0.69 * scale, (2.0 - 1.875 * Math.cos(angle)) * scale, -1.875 * Math.sin(angle) * scale);

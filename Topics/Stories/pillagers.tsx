import type React from "react";
import { Block, clamp, shade, useFilmTime } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/**
 * PILLAGERS — the people of the mansion. The owner's brief: "duplicate the villagers and turn them grey and make
 * them mad". So this is the villager's body on the villager's pixel grid, with three changes: the skin is grey, the
 * brow is pulled down into a scowl, and the arms have come out of the sleeves, because a pillager holds a crossbow,
 * shakes on a deal and cheers.
 *
 * Part of the topic's pack (see PACK.md). Same height as a villager, so the two stand side by side.
 */

const U = 1.8 / 32; // one Minecraft pixel, in metres
export const PILLAGER = {
  skin: "#8c98a2",
  /** Coats, darkest first. Give two pillagers standing together different ones. */
  coats: ["#3a2f2a", "#4a3a30", "#3d3a40", "#52423a"],
  chief: "#26222c",
  legs: "#2f5350",
  gold: "#e0b83a",
};

export type PillagerProps = {
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  /** Which pillager: picks the coat and the beat they sway on. */
  n?: number;
  coat?: string;
  /** Metres walked. Drives the legs, and the arms when `armR` / `armL` are left out. */
  walk?: number;
  /** Head angles, radians. `nod` positive looks down. */
  nod?: number;
  turn?: number;
  tilt?: number;
  /** World point for the head to look at. Overrides `nod` and `turn`. */
  lookAt?: Vec3;
  /** Arm angles in radians: 0 hangs, −1.5 points straight ahead, −3 is straight up. R is the +X arm. */
  armR?: number;
  armL?: number;
  /** 0–1: both arms up and shaking. */
  cheer?: number;
  /** 0–1: talking. The head bobs and the nose wags. */
  talk?: number;
  /** Body pitch, radians: a bow, or leaning over a table. */
  lean?: number;
  /** A crossbow in the +X hand. Lift `armR` to about −1.3 to aim it. */
  crossbow?: boolean;
  /** The chief: a darker coat, a gold band round his brow, gold on his cuffs, and a head taller (scale 1.1). */
  chief?: boolean;
  /** Sitting: legs straight out in front. Put `position` 0.56 m × scale under the seat. */
  sit?: boolean;
  /** How mad: 0 is only a frown, 1 (the default) is the full scowl. */
  mad?: number;
  phase?: number;
  /** Anything put in the +X hand. */
  children?: React.ReactNode;
};

/** A pillager. Feet on `position`, facing +Z. */
export const Pillager: React.FC<PillagerProps> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale,
  n = 0,
  coat,
  walk = 0,
  nod = 0,
  turn = 0,
  tilt = 0,
  lookAt,
  armR,
  armL,
  cheer = 0,
  talk = 0,
  lean = 0,
  crossbow = false,
  chief = false,
  sit = false,
  mad = 1,
  phase,
  children,
}) => {
  const t = useFilmTime();
  const u = U;
  const s0 = scale ?? (chief ? 1.1 : 0.98);
  const ph = phase ?? n * 1.9 + 0.6;
  const robe = coat ?? (chief ? PILLAGER.chief : PILLAGER.coats[n % PILLAGER.coats.length]);
  const skin = PILLAGER.skin;
  const gait = walk * 5.4;
  const swing = Math.sin(gait) * 0.55;
  const bob = Math.abs(Math.sin(gait)) * 0.03 + Math.sin(t * 1.3 + ph) * 0.005;
  const sway = Math.sin(gait) * 0.035;

  let yaw = turn;
  let pitch = nod;
  if (lookAt) {
    const dx = lookAt[0] - position[0];
    const dz = lookAt[2] - position[2];
    const dy = lookAt[1] - (position[1] + 29 * u * s0);
    let rel = Math.atan2(dx, dz) - rotationY;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    yaw = clamp(rel, -1.2, 1.2);
    pitch = clamp(-Math.atan2(dy, Math.hypot(dx, dz)), -0.6, 0.65);
  }
  const wag = talk * Math.sin(t * 17 + ph) * 0.2;
  const talkBob = talk * (0.05 + Math.sin(t * 8.5 + ph) * 0.05);
  const shut = (t + ph * 1.7) % 3.7 < 0.12;
  const sleeve = shade(robe, 0.08);
  const up = (side: number): number => -2.9 * cheer + cheer * Math.sin(t * 13 + ph + side) * 0.25;
  const angle = (side: number): number => {
    const set = side === 1 ? armR : armL;
    const base = set !== undefined ? set : -side * swing * 0.8;
    return base * (1 - cheer) + up(side);
  };

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={s0}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 2 * u, 12 * u, 0]} rotation={[sit ? -Math.PI / 2 : s * swing, 0, 0]}>
          <Block position={[0, -6 * u, 0]} size={[3.8 * u, 12 * u, 4 * u]} color={PILLAGER.legs} />
          <Block position={[0, -11 * u, 0.2 * u]} size={[4 * u, 2 * u, 4.4 * u]} color="#2a2a2e" castShadow={false} />
        </group>
      ))}
      <group position={[0, 12 * u + bob, 0]} rotation={[lean, 0, sway]}>
        <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 6 * u]} color={robe} />
        {/* The coat hangs a little way down over the legs, open at the front. */}
        <Block position={[0, -1.4 * u, -0.2 * u]} size={[8.6 * u, 4.8 * u, 6.4 * u]} color={shade(robe, -0.1)} />
        <Block position={[0, 5 * u, 3.05 * u]} size={[1.4 * u, 10 * u, 0.2 * u]} color={chief ? PILLAGER.gold : shade(robe, 0.28)} castShadow={false} />
        <Block position={[0, 1.2 * u, 3.1 * u]} size={[8.2 * u, 1.4 * u, 0.2 * u]} color="#2a1c14" castShadow={false} />
        {/* The arms: out of the sleeves, one each side. */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 6 * u, 10.5 * u, 0]} rotation={[angle(s), 0, s * 0.04]}>
            <Block position={[0, -4.5 * u, 0]} size={[4 * u, 9 * u, 4 * u]} color={sleeve} />
            <Block position={[0, -9.2 * u, 0]} size={[4.2 * u, 1 * u, 4.2 * u]} color={chief ? PILLAGER.gold : shade(robe, -0.4)} castShadow={false} />
            <Block position={[0, -10.6 * u, 0]} size={[3.4 * u, 2.4 * u, 3.4 * u]} color={skin} />
            {s === 1 ? (
              <group position={[0, -11 * u, 0]}>
                {crossbow ? (
                  <group rotation={[1.5, 0, 0]}>
                    <Block position={[0, 0.5 * u, 3 * u]} size={[1.6 * u, 1.6 * u, 11 * u]} color="#6b4a2a" />
                    <Block position={[0, 0.5 * u, 7.5 * u]} size={[11 * u, 1.2 * u, 1.4 * u]} color="#4a3320" />
                    <Block position={[0, 0.5 * u, 6.2 * u]} size={[10 * u, 0.3 * u, 0.3 * u]} color="#e8e8e8" castShadow={false} />
                    <Block position={[0, 1.4 * u, 5 * u]} size={[0.6 * u, 0.6 * u, 7 * u]} color="#c9ced6" castShadow={false} />
                  </group>
                ) : null}
                {children}
              </group>
            ) : null}
          </group>
        ))}
        <group position={[0, 12 * u, 0]} rotation={[pitch + talkBob, yaw, tilt]}>
          <Block position={[0, 5 * u, 0]} size={[8 * u, 10 * u, 8 * u]} color={skin} />
          {/* The villager's one long eyebrow, pulled down in the middle: two halves, each tipped inwards. */}
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 1.7 * u, (5.9 - 0.2 * mad) * u, 4.05 * u]} rotation={[0, 0, s * (0.1 + 0.36 * mad)]}>
              <Block size={[3.6 * u, 1.3 * u, 0.14 * u]} color="#2a2a2e" castShadow={false} />
            </group>
          ))}
          {shut ? (
            [-1, 1].map((s) => <Block key={s} position={[s * 2 * u, 4.2 * u, 4.04 * u]} size={[2 * u, 0.3 * u, 0.1 * u]} color="#6f7575" castShadow={false} />)
          ) : (
            [-1, 1].map((s) => (
              <group key={s}>
                <Block position={[s * 2.5 * u, 4.2 * u, 4.04 * u]} size={[1 * u, 0.9 * u, 0.1 * u]} color="#f2f2ea" castShadow={false} />
                <Block position={[s * 1.5 * u, 4.2 * u, 4.04 * u]} size={[1 * u, 0.9 * u, 0.1 * u]} color="#1f5f4a" castShadow={false} />
              </group>
            ))
          )}
          {/* The villager's one long nose. */}
          <group position={[0, 3 * u, 4 * u]} rotation={[0, 0, wag]}>
            <Block position={[0, -2 * u, 1 * u]} size={[2 * u, 4 * u, 2 * u]} color={shade(skin, -0.1)} />
          </group>
          {/* A mouth that turns down. */}
          <Block position={[0, 0.9 * u, 4.04 * u]} size={[3 * u, 0.5 * u, 0.1 * u]} color="#5f6565" castShadow={false} />
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 1.8 * u, 0.5 * u, 4.04 * u]} size={[0.6 * u, 0.6 * u, 0.1 * u]} color="#5f6565" castShadow={false} />
          ))}
          {chief ? (
            <>
              <Block position={[0, 8.6 * u, 0]} size={[8.6 * u, 1.4 * u, 8.6 * u]} color={PILLAGER.gold} metalness={0.3} roughness={0.4} />
              <Block position={[0, 9.6 * u, 4.1 * u]} size={[1.6 * u, 1.6 * u, 0.4 * u]} color="#c23a2e" castShadow={false} />
            </>
          ) : null}
        </group>
      </group>
    </group>
  );
};

/** Height of a pillager's face above the feet, for a camera to look at. */
export const pillagerFace = (p: Vec3, scale = 0.98): Vec3 => [p[0], p[1] + 29 * U * scale, p[2]];
/** Where a pillager's hand is with the arm at `angle`. `side` 1 is the +X arm. */
export const pillagerHand = (p: Vec3, rotY: number, angle: number, scale = 0.98, side = 1): Vec3 => {
  const lx = side * 6 * U * scale;
  const ly = (22.5 * U - 10.6 * U * Math.cos(angle)) * scale;
  const lz = -10.6 * U * Math.sin(angle) * scale;
  return [p[0] + lx * Math.cos(rotY) + lz * Math.sin(rotY), p[1] + ly, p[2] - lx * Math.sin(rotY) + lz * Math.cos(rotY)];
};

import type React from "react";
import { Block, clamp, shade, useFilmTime } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/**
 * MONSTERS — the people of a monster village: zombie, skeleton, creeper, spider, enderman, slime.
 *
 * Part of the topic's pack (see PACK.md). Built from boxes like the villagers, on the Minecraft pixel grid, so they
 * stand next to a villager or a player without looking like they came from another game. Feet on `position`,
 * facing +Z, 1 unit = 1 m. Every one of them can act: walk, look at a point, and wear a `mood` on its face.
 *
 * They are characters, not enemies: tell two of the same kind apart with `scarf` (a colour) or `hat`.
 */

const U = 1.8 / 32; // one Minecraft pixel, in metres

export type Mood = "calm" | "happy" | "sad" | "angry" | "scared";

export type MonsterProps = {
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  /** Metres walked. Drives the legs. */
  walk?: number;
  /** Head angles, radians. `nod` positive looks down. */
  nod?: number;
  turn?: number;
  tilt?: number;
  /** World point for the head to look at. Overrides `nod` and `turn`. */
  lookAt?: Vec3;
  mood?: Mood;
  /** A band of colour round the neck: how you tell two zombies apart. */
  scarf?: string;
  hat?: "none" | "straw" | "bow";
  /** Body pitch, radians: a bow, or a lean into a run. */
  lean?: number;
  phase?: number;
};

/** Heights of each monster's face above its feet at scale 1, for a camera's `on`. */
export const MONSTER_FACE = {
  zombie: 28 * U,
  skeleton: 28 * U,
  creeper: 22 * U,
  spider: 0.5,
  enderman: 46 * U,
  slime: 0.55,
};
export const monsterFace = (kind: keyof typeof MONSTER_FACE, p: Vec3, scale = 1): Vec3 => [p[0], p[1] + MONSTER_FACE[kind] * scale, p[2]];

/** Zombie shirt colours, and a few scarves. */
export const MONSTER = {
  zombieSkin: "#5f9a4e",
  zombieShirt: "#2a9c9c",
  zombieLegs: "#3d3a9a",
  bone: "#cfcfc9",
  creeper: "#58b84a",
  spider: "#3a302c",
  ender: "#17141c",
  enderEye: "#d86bff",
  slime: "#6fce5a",
  scarfRed: "#c23a2e",
  scarfYellow: "#e0b83a",
  scarfBlue: "#3f6fc2",
  scarfPink: "#e07ab0",
};

const headAngles = (position: Vec3, rotationY: number, eye: number, lookAt: Vec3 | undefined, nod: number, turn: number): [number, number] => {
  if (!lookAt) return [nod, turn];
  const dx = lookAt[0] - position[0];
  const dz = lookAt[2] - position[2];
  const dy = lookAt[1] - (position[1] + eye);
  let rel = Math.atan2(dx, dz) - rotationY;
  while (rel > Math.PI) rel -= Math.PI * 2;
  while (rel < -Math.PI) rel += Math.PI * 2;
  return [clamp(-Math.atan2(dy, Math.hypot(dx, dz)), -0.6, 0.65), clamp(rel, -1.2, 1.2)];
};

/** Eyebrows and a mouth on the front of an 8-pixel head whose middle is the origin. `z` is the face plane. */
const Mouth: React.FC<{ mood: Mood; y: number; z: number; color: string }> = ({ mood, y, z, color }) => {
  const u = U;
  if (mood === "scared") return <Block position={[0, y - 0.3 * u, z]} size={[2.2 * u, 2.2 * u, 0.1 * u]} color={color} castShadow={false} />;
  const up = mood === "happy" ? 1 : mood === "calm" ? 0 : -1;
  return (
    <>
      <Block position={[0, y, z]} size={[4 * u, 1 * u, 0.1 * u]} color={color} castShadow={false} />
      {up !== 0
        ? [-1, 1].map((s) => <Block key={s} position={[s * 2.5 * u, y + up * 0.9 * u, z]} size={[1 * u, 1 * u, 0.1 * u]} color={color} castShadow={false} />)
        : null}
    </>
  );
};

const Brows: React.FC<{ mood: Mood; y: number; z: number; color: string; gap?: number }> = ({ mood, y, z, color, gap = 2 }) => {
  const u = U;
  const a = mood === "angry" ? 0.42 : mood === "sad" || mood === "scared" ? -0.38 : 0;
  const lift = mood === "scared" ? 0.7 * u : mood === "happy" ? 0.4 * u : 0;
  return (
    <>
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * gap * u, y + lift, z]} rotation={[0, 0, s * a]} size={[2.4 * u, 0.7 * u, 0.1 * u]} color={color} castShadow={false} />
      ))}
    </>
  );
};

const Hat: React.FC<{ hat: "none" | "straw" | "bow"; top: number }> = ({ hat, top }) => {
  const u = U;
  if (hat === "straw")
    return (
      <>
        <Block position={[0, top + 0.4 * u, 0]} size={[13 * u, 0.9 * u, 13 * u]} color="#d9b84a" />
        <Block position={[0, top + 1.6 * u, 0]} size={[7 * u, 1.8 * u, 7 * u]} color="#c9a53a" />
      </>
    );
  if (hat === "bow")
    return (
      <>
        {[-1, 1].map((s) => (
          <Block key={s} position={[s * 1.7 * u, top + 1.1 * u, 1 * u]} rotation={[0, 0, s * 0.35]} size={[2.6 * u, 2.2 * u, 1.2 * u]} color="#e0457a" />
        ))}
        <Block position={[0, top + 0.9 * u, 1 * u]} size={[1.2 * u, 1.4 * u, 1.4 * u]} color="#b82f5e" />
      </>
    );
  return null;
};

const Scarf: React.FC<{ color?: string; y: number; w?: number; d?: number }> = ({ color, y, w = 8.6, d = 4.8 }) =>
  color ? (
    <>
      <Block position={[0, y, 0]} size={[w * U, 1.8 * U, d * U]} color={color} />
      <Block position={[w * 0.28 * U, y - 2.2 * U, d * 0.5 * U]} size={[1.8 * U, 3.6 * U, 0.8 * U]} color={shade(color, -0.12)} />
    </>
  ) : null;

// ----------------------------------------------------------------------------- zombie

/**
 * A zombie, 1.8 m: green, a teal shirt, both arms held straight out in front. `arms` 1 is the classic pose, 0 lets
 * them hang and swing like a person's; `wave` lifts the right one. `baby` is a small one with a big head.
 */
export const Zombie: React.FC<
  MonsterProps & { skin?: string; shirt?: string; legs?: string; arms?: number; wave?: number; baby?: boolean }
> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale,
  walk = 0,
  nod = 0,
  turn = 0,
  tilt = 0,
  lookAt,
  mood = "calm",
  scarf,
  hat = "none",
  lean = 0,
  phase = 0,
  skin = MONSTER.zombieSkin,
  shirt = MONSTER.zombieShirt,
  legs = MONSTER.zombieLegs,
  arms = 1,
  wave = 0,
  baby = false,
}) => {
  const t = useFilmTime();
  const u = U;
  const k = scale ?? (baby ? 0.55 : 1);
  const gait = walk * 4.6;
  const swing = Math.sin(gait) * 0.6;
  const bob = Math.abs(Math.sin(gait)) * 0.03 + Math.sin(t * 1.1 + phase) * 0.006;
  const [pitch, yaw] = headAngles(position, rotationY, MONSTER_FACE.zombie * k, lookAt, nod, turn);
  const shut = (t + phase * 1.7) % 3.7 < 0.12;
  const dark = shade(skin, -0.45);
  const groan = Math.sin(t * 0.9 + phase) * 0.05;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={k}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 2 * u, 12 * u, 0]} rotation={[s * swing, 0, 0]}>
          <Block position={[0, -6 * u, 0]} size={[3.9 * u, 12 * u, 4 * u]} color={legs} />
          <Block position={[0, -11.2 * u, 0]} size={[4 * u, 1.7 * u, 4.1 * u]} color={shade(legs, -0.35)} castShadow={false} />
        </group>
      ))}
      <group position={[0, 12 * u + bob, 0]} rotation={[lean, 0, Math.sin(gait) * 0.03]}>
        <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 4 * u]} color={shirt} />
        <Block position={[1.5 * u, 2 * u, 2.02 * u]} size={[3 * u, 2.4 * u, 0.1 * u]} color={shade(shirt, -0.25)} castShadow={false} />
        <Scarf color={scarf} y={11.4 * u} />
        {[-1, 1].map((s) => {
          const out = -1.5 * arms + (1 - arms) * -s * swing * 0.8 + groan * arms;
          const lift = s === 1 ? -wave * (2.9 - 1.5 * arms) + wave * Math.sin(t * 9 + phase) * 0.0 : 0;
          return (
            <group key={s} position={[s * 6 * u, 10 * u, 0]} rotation={[out + lift, 0, s === 1 ? -wave * 0.25 + wave * Math.sin(t * 9 + phase) * 0.3 : 0]}>
              <Block position={[0, -2 * u, 0]} size={[4 * u, 4.2 * u, 4.05 * u]} color={shirt} />
              <Block position={[0, -8 * u, 0]} size={[3.9 * u, 8 * u, 3.9 * u]} color={skin} />
            </group>
          );
        })}
        <group position={[0, 12 * u, 0]} rotation={[pitch, yaw, tilt]} scale={baby ? 1.5 : 1}>
          <Block position={[0, 4 * u, 0]} size={[8 * u, 8 * u, 8 * u]} color={skin} />
          <Block position={[0, 7.3 * u, 0]} size={[8.15 * u, 1.6 * u, 8.15 * u]} color={shade(skin, -0.18)} castShadow={false} />
          <Brows mood={mood} y={5.6 * u} z={4.05 * u} color={dark} />
          {[-1, 1].map((s) =>
            shut ? (
              <Block key={s} position={[s * 2 * u, 4.2 * u, 4.05 * u]} size={[2 * u, 0.35 * u, 0.1 * u]} color={dark} castShadow={false} />
            ) : (
              <Block key={s} position={[s * 2 * u, 4.2 * u, 4.05 * u]} size={[2 * u, 1.2 * u, 0.1 * u]} color="#14140f" castShadow={false} />
            ),
          )}
          <Block position={[0, 2.9 * u, 4.05 * u]} size={[2 * u, 1 * u, 0.1 * u]} color={shade(skin, -0.2)} castShadow={false} />
          <Mouth mood={mood} y={1.4 * u} z={4.05 * u} color={dark} />
          <Hat hat={hat} top={8 * u} />
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- skeleton

/** A skeleton, 1.8 m: grey bone, thin limbs, ribs. `bow` puts a bow in its right hand; `rattle` 0–1 makes it shake. */
export const Skeleton: React.FC<MonsterProps & { bow?: boolean; rattle?: number; wave?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  walk = 0,
  nod = 0,
  turn = 0,
  tilt = 0,
  lookAt,
  mood = "calm",
  scarf,
  hat = "none",
  lean = 0,
  phase = 0,
  bow = false,
  rattle = 0,
  wave = 0,
}) => {
  const t = useFilmTime();
  const u = U;
  const bone = MONSTER.bone;
  const dark = "#2b2b2b";
  const gait = walk * 5.2;
  const swing = Math.sin(gait) * 0.7;
  const bob = Math.abs(Math.sin(gait)) * 0.03 + Math.sin(t * 1.3 + phase) * 0.005;
  const shake = rattle * Math.sin(t * 43 + phase);
  const [pitch, yaw] = headAngles(position, rotationY, MONSTER_FACE.skeleton * scale, lookAt, nod, turn);
  return (
    <group position={[position[0] + shake * 0.012, position[1], position[2]]} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 2 * u, 12 * u, 0]} rotation={[s * swing, 0, 0]}>
          <Block position={[0, -6 * u, 0]} size={[2 * u, 12 * u, 2 * u]} color={bone} />
        </group>
      ))}
      <group position={[0, 12 * u + bob, 0]} rotation={[lean, 0, Math.sin(gait) * 0.03 + shake * 0.03]}>
        <Block position={[0, 6 * u, 0]} size={[2 * u, 12 * u, 2 * u]} color={shade(bone, -0.12)} />
        <Block position={[0, 0.8 * u, 0]} size={[8 * u, 1.8 * u, 3.6 * u]} color={bone} />
        {[3.6, 6.2, 8.8].map((y) => (
          <Block key={y} position={[0, y * u, 0]} size={[8 * u, 1.3 * u, 4 * u]} color={bone} />
        ))}
        <Block position={[0, 11.2 * u, 0]} size={[8 * u, 1.6 * u, 4 * u]} color={shade(bone, 0.04)} />
        <Scarf color={scarf} y={11.6 * u} />
        {[-1, 1].map((s) => {
          const base = s === 1 && bow ? -1.35 : -s * swing * 0.8;
          const lift = s === -1 ? -wave * 2.8 : 0;
          return (
            <group key={s} position={[s * 5 * u, 11 * u, 0]} rotation={[base + lift + shake * 0.08, 0, s === -1 ? wave * (0.25 + Math.sin(t * 9 + phase) * 0.3) : 0]}>
              <Block position={[0, -6 * u, 0]} size={[2 * u, 12 * u, 2 * u]} color={bone} />
              {s === 1 && bow ? (
                <group position={[0, -11.5 * u, 0]} rotation={[1.35, 0, 0]}>
                  <Block position={[0, 0, 1 * u]} size={[0.9 * u, 15 * u, 0.9 * u]} color="#6b4a2a" />
                  {[-1, 1].map((e) => (
                    <Block key={e} position={[0, e * 7.4 * u, -0.6 * u]} rotation={[e * 0.6, 0, 0]} size={[0.9 * u, 3 * u, 0.9 * u]} color="#6b4a2a" />
                  ))}
                  <Block position={[0, 0, -1.6 * u]} size={[0.25 * u, 16 * u, 0.25 * u]} color="#e8e8e8" castShadow={false} />
                </group>
              ) : null}
            </group>
          );
        })}
        <group position={[0, 12 * u, 0]} rotation={[pitch + shake * 0.04, yaw, tilt]}>
          <Block position={[0, 4 * u, 0]} size={[8 * u, 8 * u, 8 * u]} color={bone} />
          <Brows mood={mood} y={5.9 * u} z={4.05 * u} color="#8a8a86" />
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 2 * u, 4.3 * u, 4.05 * u]} size={[2 * u, 1.6 * u, 0.1 * u]} color={dark} castShadow={false} />
          ))}
          <Block position={[0, 2.9 * u, 4.05 * u]} size={[1 * u, 1 * u, 0.1 * u]} color="#5a5a58" castShadow={false} />
          {mood === "scared" ? (
            <Block position={[0, 1.2 * u, 4.05 * u]} size={[2.4 * u, 2 * u, 0.1 * u]} color={dark} castShadow={false} />
          ) : (
            <>
              <Block position={[0, 1.4 * u, 4.05 * u]} size={[6 * u, 1 * u, 0.1 * u]} color={dark} castShadow={false} />
              {[-2, 0, 2].map((x) => (
                <Block key={x} position={[x * u, 1.4 * u, 4.07 * u]} size={[1 * u, 1 * u, 0.1 * u]} color={bone} castShadow={false} />
              ))}
              {mood === "happy" || mood === "sad"
                ? [-1, 1].map((s) => (
                    <Block key={s} position={[s * 3.2 * u, (1.4 + (mood === "happy" ? 0.9 : -0.9)) * u, 4.05 * u]} size={[1 * u, 1 * u, 0.1 * u]} color={dark} castShadow={false} />
                  ))
                : null}
            </>
          )}
          <Hat hat={hat} top={8 * u} />
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- creeper

/**
 * A creeper, 1.6 m: no arms, four short legs, and that face. `fuse` 0–1 is the hiss: it swells and flashes white,
 * faster as it nears 1. The face is the face; `mood` only moves the eyebrows it does not normally have.
 */
export const Creeper: React.FC<MonsterProps & { color?: string; fuse?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  walk = 0,
  nod = 0,
  turn = 0,
  tilt = 0,
  lookAt,
  mood = "calm",
  scarf,
  hat = "none",
  lean = 0,
  phase = 0,
  color = MONSTER.creeper,
  fuse = 0,
}) => {
  const t = useFilmTime();
  const u = U;
  const gait = walk * 6.5;
  const swing = Math.sin(gait) * 0.55;
  const bob = Math.abs(Math.sin(gait)) * 0.02 + Math.sin(t * 1.2 + phase) * 0.005;
  const [pitch, yaw] = headAngles(position, rotationY, MONSTER_FACE.creeper * scale, lookAt, nod, turn);
  const flash = fuse > 0 ? fuse * (0.5 + 0.5 * Math.sin(t * (10 + fuse * 30))) : 0;
  const swell = 1 + fuse * 0.16 + flash * 0.04;
  const glow = flash > 0.02 ? { emissive: "#ffffff", emissiveIntensity: flash * 0.9 } : {};
  const dark = shade(color, -0.28);
  const black = "#0d140b";
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group scale={[swell, 1 + fuse * 0.05, swell]}>
        {[-1, 1].map((s) =>
          [-1, 1].map((f) => (
            <group key={`${s}${f}`} position={[s * 2 * u, 6 * u, f * 4 * u]} rotation={[s * f * swing, 0, 0]}>
              <Block position={[0, -3 * u, 0]} size={[4 * u, 6 * u, 4 * u]} color={dark} {...glow} />
              <Block position={[0, -5.4 * u, f * 0.1 * u]} size={[4.1 * u, 1.3 * u, 4.1 * u]} color={black} castShadow={false} />
            </group>
          )),
        )}
        <group position={[0, 6 * u + bob, 0]} rotation={[lean, 0, 0]}>
          <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 4 * u]} color={color} {...glow} />
          {/* The mottle: a few darker and lighter patches, front and back. */}
          {(
            [
              [-2, 9, 2.2, 2, 1],
              [2.5, 4, 3, 2.4, -1],
              [-1.5, 2, 3, 1.6, 1],
              [1, 7.5, 2, 1.6, 1],
            ] as Array<[number, number, number, number, number]>
          ).map(([x, y, w, h, tone], i) => (
            <group key={i}>
              <Block position={[x * u, y * u, 2.03 * u]} size={[w * u, h * u, 0.1 * u]} color={shade(color, tone * -0.16)} castShadow={false} />
              <Block position={[-x * u, (12 - y) * u, -2.03 * u]} size={[w * u, h * u, 0.1 * u]} color={shade(color, tone * -0.16)} castShadow={false} />
            </group>
          ))}
          <Scarf color={scarf} y={11.4 * u} />
          <group position={[0, 12 * u, 0]} rotation={[pitch, yaw, tilt]}>
            <Block position={[0, 4 * u, 0]} size={[8 * u, 8 * u, 8 * u]} color={color} {...glow} />
            <Block position={[-2.5 * u, 7 * u, 4.03 * u]} size={[2 * u, 1.4 * u, 0.1 * u]} color={shade(color, 0.14)} castShadow={false} />
            <Block position={[3 * u, 0.8 * u, 4.03 * u]} size={[1.6 * u, 1.4 * u, 0.1 * u]} color={dark} castShadow={false} />
            {mood !== "calm" ? <Brows mood={mood} y={6.9 * u} z={4.06 * u} color={black} /> : null}
            {[-1, 1].map((s) => (
              <Block key={s} position={[s * 2 * u, 5 * u, 4.05 * u]} size={[2 * u, 2 * u, 0.1 * u]} color={black} castShadow={false} />
            ))}
            {/* The mouth: a square in the middle, and two legs going down from it. Upside down, it is a smile. */}
            <group position={[0, 2.4 * u, 0]} rotation={[0, 0, mood === "happy" ? Math.PI : 0]}>
              <Block position={[0, 0.6 * u, 4.05 * u]} size={[2 * u, 2 * u, 0.1 * u]} color={black} castShadow={false} />
              {[-1, 1].map((s) => (
                <Block key={s} position={[s * 1.5 * u, -0.9 * u, 4.05 * u]} size={[1 * u, 3 * u, 0.1 * u]} color={black} castShadow={false} />
              ))}
            </group>
            <Hat hat={hat} top={8 * u} />
          </group>
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- spider

/**
 * A spider, 2 m across and under 1 m tall: eight legs and a row of red eyes that glow. `rear` 0–1 lifts the front
 * of it off the ground. It is wide: in a tall frame, turn it three-quarters on or stand well back.
 */
export const Spider: React.FC<MonsterProps & { color?: string; rear?: number; eyes?: string }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  walk = 0,
  nod = 0,
  turn = 0,
  tilt = 0,
  lookAt,
  mood = "calm",
  scarf,
  hat = "none",
  phase = 0,
  color = MONSTER.spider,
  rear = 0,
  eyes = "#e02a2a",
}) => {
  const t = useFilmTime();
  const u = U;
  const gait = walk * 9;
  const bob = Math.abs(Math.sin(gait * 2)) * 0.015 + Math.sin(t * 1.5 + phase) * 0.008;
  const [pitch, yaw] = headAngles(position, rotationY, MONSTER_FACE.spider * scale, lookAt, nod, turn);
  const leg = shade(color, -0.2);
  const wide = mood === "scared" ? 1.35 : mood === "angry" ? 0.7 : 1;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group position={[0, 8 * u + bob, 0]} rotation={[-rear * 0.55, 0, 0]}>
        {/* Abdomen, waist, head. */}
        <Block position={[0, 1 * u, -9 * u]} size={[10 * u, 8 * u, 12 * u]} color={color} />
        <Block position={[0, 4.4 * u, -9 * u]} size={[6 * u, 1.4 * u, 7 * u]} color={shade(color, 0.1)} castShadow={false} />
        <Block position={[0, 0, 0]} size={[6 * u, 6 * u, 6 * u]} color={shade(color, -0.1)} />
        <Scarf color={scarf} y={0} w={6.6} d={6.6} />
        {[-1, 1].map((s) =>
          [0, 1, 2, 3].map((i) => {
            const step = Math.sin(gait + (i % 2 ? Math.PI : 0) + (s > 0 ? 0 : Math.PI)) * 0.3;
            const fan = (i - 1.5) * 0.42;
            const up = i === 0 ? rear * 0.5 : 0;
            return (
              <group key={`${s}${i}`} position={[s * 3 * u, 0, (1.5 - i) * 1.4 * u]} rotation={[0, s * (-fan + step), s * (-0.42 - up)]}>
                <Block position={[s * 5 * u, 0, 0]} size={[10 * u, 1.9 * u, 1.9 * u]} color={leg} />
                <group position={[s * 10 * u, 0, 0]} rotation={[0, 0, s * (-1.05 + up * 0.6)]}>
                  <Block position={[s * 5 * u, 0, 0]} size={[10 * u, 1.7 * u, 1.7 * u]} color={shade(leg, -0.15)} />
                </group>
              </group>
            );
          }),
        )}
        <group position={[0, 0, 3 * u]} rotation={[pitch + rear * 0.3, yaw, tilt]}>
          <Block position={[0, 0, 4 * u]} size={[8 * u, 8 * u, 8 * u]} color={color} />
          {[-1, 1].map((s) => (
            <group key={s}>
              <Block position={[s * 2 * u, 0.6 * u, 8.05 * u]} size={[2 * u, 2 * u * wide, 0.1 * u]} color="#000000" emissive={eyes} emissiveIntensity={1} castShadow={false} />
              <Block position={[s * 3.4 * u, 2.6 * u, 8.05 * u]} size={[1 * u, 1 * u * wide, 0.1 * u]} color="#000000" emissive={eyes} emissiveIntensity={1} castShadow={false} />
              <Block position={[s * 1 * u, 2.9 * u, 8.05 * u]} size={[1 * u, 1 * u, 0.1 * u]} color="#000000" emissive={eyes} emissiveIntensity={1} castShadow={false} />
              <Block position={[s * 1.6 * u, -2.6 * u, 8.3 * u]} rotation={[0, 0, s * (mood === "happy" ? -0.5 : 0.2)]} size={[1.2 * u, 2.4 * u, 1 * u]} color={shade(color, -0.45)} />
            </group>
          ))}
          {mood !== "calm" ? <Brows mood={mood} y={2.6 * u + 1.6 * u} z={8.08 * u} color={shade(color, 0.35)} /> : null}
          <Hat hat={hat} top={4 * u} />
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- enderman

/**
 * An enderman, 2.9 m: black, very thin, purple eyes that glow. `jaw` 0–1 drops the bottom of its head (the scream);
 * `carry` 0–1 brings both arms forward to hold a block, which you give it as `children`; `shake` 0–1 is the jitter.
 * Three metres is a lot of a tall frame: stand it behind people, or tilt the camera up at it.
 */
export const Enderman: React.FC<MonsterProps & { jaw?: number; carry?: number; shake?: number; children?: React.ReactNode }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  walk = 0,
  nod = 0,
  turn = 0,
  tilt = 0,
  lookAt,
  mood = "calm",
  scarf,
  hat = "none",
  lean = 0,
  phase = 0,
  jaw = 0,
  carry = 0,
  shake = 0,
  children,
}) => {
  const t = useFilmTime();
  const u = U;
  const c = MONSTER.ender;
  const gait = walk * 2.6;
  const swing = Math.sin(gait) * 0.45;
  const bob = Math.abs(Math.sin(gait)) * 0.04 + Math.sin(t * 0.9 + phase) * 0.008;
  const jit = shake * Math.sin(t * 53 + phase);
  const [pitch, yaw] = headAngles(position, rotationY, MONSTER_FACE.enderman * scale, lookAt, nod, turn);
  const eyeH = mood === "angry" ? 0.6 : mood === "scared" ? 1.5 : mood === "happy" ? 0.8 : 1;
  return (
    <group position={[position[0] + jit * 0.02, position[1], position[2] + Math.cos(t * 47 + phase) * shake * 0.02]} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 2 * u, 30 * u, 0]} rotation={[s * swing, 0, 0]}>
          <Block position={[0, -15 * u, 0]} size={[2 * u, 30 * u, 2 * u]} color={c} />
        </group>
      ))}
      <group position={[0, 30 * u + bob, 0]} rotation={[lean, 0, jit * 0.02]}>
        <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 4 * u]} color={c} />
        <Scarf color={scarf} y={11.4 * u} />
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 5 * u, 11 * u, 0]} rotation={[-carry * 0.75 - s * swing * 0.7 * (1 - carry), 0, s * carry * 0.14]}>
            <Block position={[0, -15 * u, 0]} size={[2 * u, 30 * u, 2 * u]} color={c} />
          </group>
        ))}
        {children && carry > 0 ? <group position={[0, -9 * u, 20 * u * carry]}>{children}</group> : null}
        <group position={[0, 12 * u, 0]} rotation={[pitch, yaw, tilt + jit * 0.04]}>
          <Block position={[0, (4 + jaw * 0.5) * u, 0]} size={[8 * u, (8 - jaw * 1) * u, 8 * u]} color={c} />
          {jaw > 0.02 ? (
            <>
              <Block position={[0, -jaw * 2.2 * u, 0]} size={[8 * u, 1.6 * u, 8 * u]} color={c} />
              <Block position={[0, (0.6 - jaw * 0.7) * u, 3.9 * u]} size={[6.6 * u, jaw * 3 * u, 0.2 * u]} color="#000000" emissive="#3a0a55" emissiveIntensity={0.8} castShadow={false} />
            </>
          ) : null}
          {[-1, 1].map((s) => (
            <group key={s} rotation={[0, 0, mood === "angry" ? -s * 0.18 : mood === "sad" ? s * 0.18 : 0]}>
              <Block position={[s * 2.5 * u, 4.2 * u, 4.05 * u]} size={[3 * u, 1 * u * eyeH, 0.1 * u]} color="#000000" emissive="#f2c8ff" emissiveIntensity={1} castShadow={false} />
              <Block position={[s * 2.5 * u, 4.2 * u, 4.08 * u]} size={[1 * u, 1 * u * eyeH, 0.1 * u]} color="#000000" emissive={MONSTER.enderEye} emissiveIntensity={1} castShadow={false} />
            </group>
          ))}
          {mood === "happy" ? <Mouth mood="happy" y={1.6 * u} z={4.05 * u} color="#3a2a48" /> : null}
          <Hat hat={hat} top={8 * u} />
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- slime

/**
 * A slime: a see-through green cube with a darker one inside it, and a face. `size` is its width in metres
 * (0.5 small, 1 medium, 2 big). `squash` −1…1: positive flattens it (landing), negative stretches it (leaving the
 * ground). It has no legs: move it with a hop and squash it on the way down.
 */
export const Slime: React.FC<MonsterProps & { size?: number; squash?: number; color?: string }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  nod = 0,
  turn = 0,
  lookAt,
  mood = "calm",
  hat = "none",
  phase = 0,
  size = 1,
  squash = 0,
  color = MONSTER.slime,
}) => {
  const t = useFilmTime();
  const breathe = Math.sin(t * 2.1 + phase) * 0.025;
  const sy = 1 - squash * 0.35 + breathe;
  const sx = 1 + squash * 0.22 - breathe * 0.5;
  const [, yaw] = headAngles(position, rotationY, MONSTER_FACE.slime * scale * size, lookAt, nod, turn);
  const p = size / 8; // one slime pixel
  const dark = shade(color, -0.55);
  return (
    <group position={position} rotation={[0, rotationY + yaw, 0]} scale={[scale * sx, scale * sy, scale * sx]}>
      <Block position={[0, size * 0.42, 0]} size={[size * 0.62, size * 0.62, size * 0.62]} color={shade(color, -0.12)} castShadow={false} />
      <Block position={[0, size * 0.5, 0]} size={[size, size, size]} color={color} opacity={0.5} transparent />
      {mood !== "calm" ? <group scale={size / (8 * U)}><Brows mood={mood} y={6.3 * U} z={4.03 * U} color={dark} gap={2.2} /></group> : null}
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * 2 * p, 5 * p, size * 0.502]} size={[2 * p, 2 * p * (mood === "scared" ? 1.3 : 1), 0.02]} color={dark} castShadow={false} />
      ))}
      <Block position={[1 * p, 2.5 * p, size * 0.502]} size={[1 * p, 1 * p, 0.02]} color={dark} castShadow={false} />
      {mood === "happy" ? (
        <Block position={[-0.5 * p, 2 * p, size * 0.502]} size={[3 * p, 0.8 * p, 0.02]} color={dark} castShadow={false} />
      ) : null}
      {hat !== "none" ? (
        <group position={[0, size, 0]} scale={size / (8 * U)}>
          <Hat hat={hat} top={0} />
        </group>
      ) : null}
    </group>
  );
};

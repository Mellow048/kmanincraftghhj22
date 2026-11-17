import type React from "react";
import { Block, MinecraftAvatar, Vox, clamp, getPose, shade } from "../../src/engine";
import type { MinecraftAvatarProps, Pose, Vec3 } from "../../src/engine";
import { Creeper, MONSTER } from "./monsters";
import { Hut } from "./places";

/**
 * THE CREEPER TOWN — creepers as people: a family, a crowd that bolts and hisses, their houses, and the players who
 * come for their gunpowder.
 *
 * Part of the topic's pack (see PACK.md, "The creeper town"). Built for "In This Town, Everyone Runs Away From Me",
 * which the owner liked (2026-11-16: "really cute short, i like it. now put it on the main branch as reference + the
 * creeper skins u made so that other agents can use it too as a template or pack"). How each part is staged, shot by
 * shot, is in reference/everyone-runs-away-from-me/source/.
 *
 *   <CreeperMum mood="happy" />   <CreeperDad />   <CreeperKid />      the family: a bow, a straw hat, a small one
 *   <CreeperCrowd spots={SPOTS} t={t} cat={[0, 0, 9]} at={1.2} />       a town of them, and at 1.2 s they all bolt
 *   <CreeperCrowd spots={SPOTS} t={t} fuse={0.6} mood="angry" />        the same town hissing: swollen, flashing
 *   <CreeperHouse position={[9, 0, 4]} rotationY={-Math.PI / 2} n={2} /> a green roof and the face over the door
 *   <GunpowderPlayer who={0} arms="hold" />                             a player with a sword (odd `who`: an empty sack)
 *
 * The creeper itself is `Creeper` in monsters.tsx: `mood`, `fuse` (0–1: it swells and flashes white), `lean` (a run,
 * or leaning on somebody for a hug), `scarf`, `hat`, `lookAt`. Everything here is that creeper, dressed and directed.
 * A creeper has no arms: it shows what it feels with its face, by shaking, by leaning and by running.
 */

type C = React.ComponentProps<typeof Creeper>;
/** His mum: the bow, and a pink scarf. */
export const CreeperMum: React.FC<C> = (p) => <Creeper hat="bow" scarf="#e56a9a" phase={0.7} {...p} />;
/** His dad: the straw hat, a blue scarf, a little bigger and a little darker. */
export const CreeperDad: React.FC<C> = (p) => <Creeper hat="straw" scarf="#3f6fc2" color="#4aa53f" phase={1.9} scale={1.08} {...p} />;
/** The little creeper: small, pale, a yellow scarf. */
export const CreeperKid: React.FC<C> = (p) => <Creeper scale={0.58} scarf="#e0b83a" color="#7ad06a" phase={3.3} {...p} />;

// ----------------------------------------------------------------------------- how a creeper bolts, and a crowd of them

/**
 * A creeper that has seen the cat (or whatever it is scared of). Until `at` (seconds) it stands at `home`; then it
 * jumps, turns, and runs straight away from `cat`, the near ones first. `gone` is true once it has started. Gives what to hand a `Creeper`: `position`, `rotationY`, `walk`, `lean`.
 */
export const creeperBolt = (home: Vec3, cat: Vec3, t: number, at: number, i = 0, speed = 7, face?: number) => {
  const dx = home[0] - cat[0];
  const dz = home[2] - cat[2];
  const d = Math.hypot(dx, dz) || 1;
  const start = at + ((i * 7) % 5) * 0.05 + Math.min(d, 12) * 0.035;
  const since = t - start;
  const run = Math.max(0, since - 0.16);
  const s = run * speed * clamp(run / 0.25, 0.4, 1);
  const hop = since > 0 && since < 0.3 ? Math.sin((since / 0.3) * Math.PI) * 0.34 : 0;
  const away = Math.atan2(dx, dz);
  const toCat = face ?? Math.atan2(-dx, -dz);
  const turn = clamp(since / 0.16, 0, 1);
  let diff = away - toCat;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return {
    position: [home[0] + (dx / d) * s, home[1] + hop, home[2] + (dz / d) * s] as Vec3,
    rotationY: toCat + diff * turn,
    walk: s,
    lean: run > 0 ? 0.3 : 0,
    gone: since > 0,
  };
};

const SCARVES = ["#7a4fb0", "#e07a2e", "#e8e4d8", "#c23a2e", "#3f6fc2", "#e0b83a", "#2f8f8a"];
/** [x, z, facing]. */
export type CreeperSpot = [number, number, number?];
export type CreeperCrowdProps = {
  spots: CreeperSpot[];
  t: number;
  /** Where the cat is, and when (seconds) they see him: they creeperBolt. Leave out and they stay. */
  cat?: Vec3;
  at?: number;
  speed?: number;
  /** Which way those with no facing of their own look. */
  face?: number;
  lookAt?: Vec3;
  /** 0–1: hissing. They swell and flash. */
  fuse?: number;
  mood?: C["mood"];
  /** Metres walked, for the feet; `shift` moves the whole lot. */
  walk?: number;
  shift?: Vec3;
  /** Each creeper shakes this much (metres). */
  shake?: number;
  skip?: number[];
  /** Number the looks from here, so two crowds in one film are not twins. */
  first?: number;
};
/** A crowd of the town: creepers of every green, some in scarves, some in hats, a few small ones. */
export const CreeperCrowd: React.FC<CreeperCrowdProps> = ({ spots, t, cat, at = 0, speed = 7, face = 0, lookAt, fuse = 0, mood = "calm", walk = 0, shift = [0, 0, 0], shake = 0, skip, first = 0 }) => (
  <>
    {spots.map(([x, z, r], k) => {
      if (skip?.includes(k)) return null;
      const i = k + first;
      const home: Vec3 = [x + shift[0] + Math.sin(t * 31 + i * 2.1) * shake, shift[1], z + shift[2] + Math.cos(t * 27 + i) * shake];
      const b = cat ? creeperBolt(home, cat, t, at, i, speed, r ?? face) : null;
      const small = i % 6 === 4;
      return (
        <Creeper
          key={k}
          position={b ? b.position : home}
          rotationY={b ? b.rotationY : (r ?? face)}
          walk={b ? b.walk : walk ? walk + i * 0.3 : 0}
          lean={b ? b.lean : 0}
          scale={small ? 0.62 : 0.92 + ((i * 13) % 5) * 0.035}
          color={shade(MONSTER.creeper, (((i * 37) % 7) - 3) * 0.035)}
          scarf={i % 3 === 0 ? undefined : SCARVES[i % SCARVES.length]}
          hat={i % 5 === 2 ? "straw" : i % 7 === 3 ? "bow" : "none"}
          mood={b?.gone ? "scared" : mood}
          fuse={b?.gone ? 0 : fuse * (0.75 + 0.25 * Math.sin(i * 1.7))}
          lookAt={b?.gone ? undefined : lookAt}
          phase={i * 1.3}
        />
      );
    })}
  </>
);

// ----------------------------------------------------------------------------- the players who come for gunpowder

type A = Partial<MinecraftAvatarProps>;
const GUNPOWDER_PLAYERS = [
  { skin: "#c68e62", hair: "#1c1410", torso: "#5a1f1f", legs: "#22222a" },
  { skin: "#e3b48c", hair: "#c9a13c", torso: "#2f5fb0", legs: "#2c2c44" },
  { skin: "#8d5a3b", hair: "#15110f", torso: "#7a4fb0", legs: "#4a3a2a" },
  { skin: "#f0c8a4", hair: "#7a3d1c", torso: "#c8641e", legs: "#2a2a33" },
  { skin: "#d8a47c", hair: "#2a2a2a", torso: "#b0b6c0", legs: "#3a4252" },
  { skin: "#b97a56", hair: "#4a2c14", torso: "#2f8f8a", legs: "#33302c" },
];
export const PlayerSword: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0.0]} size={[0.06, 0.07, 0.22]} color="#5a3d22" />
    <Block position={[0, 0, 0.13]} size={[0.26, 0.07, 0.06]} color="#3c3c44" />
    <Block position={[0, 0, 0.55]} size={[0.09, 0.035, 0.8]} color="#dfe6ee" metalness={0.2} roughness={0.4} />
    <Block position={[0, 0, 0.98]} size={[0.05, 0.03, 0.08]} color="#f4f8fb" />
  </group>
);
/** An empty sack: it hangs. `position` is where it is held. */
export const EmptySack: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, -0.02, 0.02]} size={[0.16, 0.1, 0.16]} color="#8a6a3c" />
    <Block position={[0, -0.3, 0.02]} size={[0.34, 0.5, 0.2]} color="#a5834c" />
    <Block position={[0, -0.3, 0.125]} size={[0.2, 0.2, 0.01]} color="#6f5630" castShadow={false} />
  </group>
);
export const LostShoe: React.FC<{ position?: Vec3; rotation?: Vec3 }> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <Block position={[0, 0.07, 0]} size={[0.2, 0.14, 0.34]} color="#c23a2e" />
    <Block position={[0, 0.02, 0.01]} size={[0.22, 0.04, 0.38]} color="#f2efe6" castShadow={false} />
  </group>
);
/** A player who has come for gunpowder. Even ones carry a sword, odd ones an empty sack; `hand={false}` and he has dropped it. */
export const GunpowderPlayer: React.FC<A & { who: number; hand?: boolean }> = ({ who, hand = true, ...p }) => {
  const c = GUNPOWDER_PLAYERS[who % GUNPOWDER_PLAYERS.length];
  return (
    <MinecraftAvatar outfit="tee" skin={c.skin} hair={c.hair} colors={{ torso: c.torso, arms: c.torso, legs: c.legs }} blink phase={who * 1.3 + 0.4} {...p}>
      {hand ? who % 2 === 0 ? <PlayerSword /> : <EmptySack /> : null}
    </MinecraftAvatar>
  );
};

// ----------------------------------------------------------------------------- things

/** An open cardboard box, big enough for a kitten (a kid at scale 0.42). `position` is the middle of its bottom. */
export const CardboardBox: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.03, 0]} size={[0.9, 0.06, 0.7]} color="#a47a48" />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[0, 0.25, s * 0.33]} size={[0.9, 0.5, 0.05]} color={s > 0 ? "#b98a54" : "#a47a48"} />
        <Block position={[s * 0.43, 0.25, 0]} size={[0.05, 0.5, 0.7]} color="#ae8250" />
        <Block position={[s * 0.62, 0.42, 0]} rotation={[0, 0, -s * 0.9]} size={[0.42, 0.03, 0.68]} color="#c0935c" />
      </group>
    ))}
    <Block position={[0, 0.25, 0.357]} size={[0.5, 0.07, 0.01]} color="#e9e2d2" castShadow={false} />
  </group>
);

/** The dinner table: planks on legs, `length` metres along Z, with a plate at each end. `position` is the ground under its middle. */
export const LongTable: React.FC<{ position: Vec3; length: number }> = ({ position, length }) => (
  <group position={position}>
    <Vox kind="planks" position={[0, 0.74, 0]} size={[1.3, 0.1, length]} />
    {[-1, 1].map((s) =>
      [-1, 0, 1].map((k) => <Vox key={`${s}${k}`} kind="darkPlanks" position={[s * 0.5, 0.35, k * (length / 2 - 0.25)]} size={[0.14, 0.7, 0.14]} />),
    )}
    {[-1, 1].map((s) => (
      <Block key={s} position={[0, 0.81, s * (length / 2 - 0.45)]} size={[0.5, 0.03, 0.5]} color="#f2efe6" castShadow={false} />
    ))}
  </group>
);

/** A school desk and its stool, facing -Z (the board). `position` is the ground under the desk. */
export const SchoolDesk: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Vox kind="planks" position={[0, 0.62, 0]} size={[0.95, 0.08, 0.55]} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="darkPlanks" position={[s * 0.4, 0.29, 0]} size={[0.08, 0.58, 0.45]} />
    ))}
  </group>
);

/** The face. On houses, on the costume. `size` is its width and height; it faces +Z. */
export const CreeperFace: React.FC<{ position?: Vec3; size?: number; color?: string }> = ({ position = [0, 0, 0], size = 1, color = "#161a14" }) => {
  const u = size / 8;
  return (
    <group position={position}>
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block position={[s * 2 * u, 1 * u, 0]} size={[2 * u, 2 * u, 0.02]} color={color} castShadow={false} />
          <Block position={[s * 1.5 * u, -3.5 * u, 0]} size={[u, u, 0.02]} color={color} castShadow={false} />
        </group>
      ))}
      <Block position={[0, -1 * u, 0]} size={[2 * u, 2 * u, 0.02]} color={color} castShadow={false} />
      <Block position={[0, -2 * u, 0]} size={[4 * u, 2 * u, 0.02]} color={color} castShadow={false} />
    </group>
  );
};

/**
 * The costume: a green box with the face painted on, worn over a kid. His legs come out of the bottom; set it 0.14 m
 * low (`position` y = -0.14) and a cat's ears come out of the top. `position` is his feet; it turns with him.
 */
export const CreeperSuit: React.FC<{ position: Vec3; rotationY?: number; wobble?: number }> = ({ position, rotationY = 0, wobble = 0 }) => (
  <group position={position} rotation={[0, rotationY, wobble]}>
    <Block position={[0, 0.98, 0.0]} size={[0.62, 1.02, 0.5]} color="#5fbf50" />
    <Block position={[0, 0.5, 0.0]} size={[0.66, 0.06, 0.54]} color="#3f8f36" castShadow={false} />
    <CreeperFace position={[0, 1.22, 0.256]} size={0.44} />
    {[[-0.2, 0.75], [0.16, 0.95], [-0.05, 0.62], [0.22, 0.68]].map(([x, y], i) => (
      <Block key={i} position={[x, y, 0.253]} size={[0.12, 0.1, 0.01]} color={i % 2 ? "#4aa53f" : "#7ad06a"} castShadow={false} />
    ))}
  </group>
);

// ----------------------------------------------------------------------------- staging

/** A warm light for faces at night. `at` is where it hangs. */
export const NightFill: React.FC<{ at: Vec3; power?: number; reach?: number; color?: string }> = ({ at, power = 7, reach = 9, color = "#ffd9a8" }) => (
  <pointLight position={at} color={color} intensity={power} distance={reach} decay={2} />
);

/** Sitting on the ground, legs straight out. Put a kid's feet at y = `GROUND_SIT`. */
export const groundSitPose = (t: number, patch: Partial<Pose> = {}): Pose => ({ ...getPose("sit", t), kneeR: [0, 0, 0], kneeL: [0, 0, 0], ...patch });
export const GROUND_SIT = -0.4;
/** Both arms held wide open: he wants a hug. `k` 0–1. */
export const openArmsPose = (t: number, k = 1): Pose => {
  const b = getPose("idle", t);
  return { ...b, armR: [-1.25 * k, 0, 0.95 * k], armL: [-1.25 * k, 0, -0.95 * k], head: [-0.08 * k, 0, 0] };
};

/** A small pixel heart, facing +Z. `position` is its middle. */
export const PixelHeart: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {([[-1, 1], [1, 1], [-2, 0.4], [0, 0.4], [2, 0.4], [-1, -0.3], [1, -0.3], [0, -1]] as Array<[number, number]>).map(([x, y], i) => (
        <Block key={i} position={[x * 0.07, y * 0.1, 0]} size={[0.15, 0.13, 0.04]} color="#f0527a" emissive="#f0527a" emissiveIntensity={0.25} castShadow={false} />
      ))}
    </group>
  );

const ROOFS = ["#3f9a3a", "#58b84a", "#2f7f3a", "#6ac05a", "#4aa53f", "#37883a"];
/**
 * A creeper's house: a `Hut` with a green roof and the face over its door. `position` is the middle of its front wall
 * on the ground; it faces +Z, so turn it at the street with `rotationY`. `n` picks the roof, the wall and the tint:
 * give every house its own. `lit` lights the windows (night).
 */
export const CreeperHouse: React.FC<{ position: Vec3; rotationY?: number; w?: number; h?: number; n?: number; lit?: boolean }> = ({ position, rotationY = 0, w = 6, h = 3.8, n = 0, lit = false }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Hut at={[0, 0, 0]} w={w} h={h} wall={n % 3 === 1 ? "cobble" : "planks"} tint={n % 2 ? "#cfd6b4" : "#b9c79a"} roof={ROOFS[n % 6]} windows={[-1.8, 1.8]} lit={lit} />
    <group position={[0, h - 0.62, 0.34]}>
      <Vox kind="wool" tint="#58b84a" size={[1.15, 1.15, 0.08]} />
      <CreeperFace position={[0, 0, 0.05]} size={0.95} />
    </group>
  </group>
);

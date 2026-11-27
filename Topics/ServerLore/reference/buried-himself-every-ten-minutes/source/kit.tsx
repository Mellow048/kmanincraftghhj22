import type React from "react";
import {
  Block,
  Clouds,
  Dust,
  EmberDrift,
  FloatingNumber,
  Glow,
  GodRay,
  LightPool,
  Sign,
  Tree,
  Vox,
  Zone,
  cam,
  clamp01,
  moveBetween,
  plankTex,
  storyScene,
  useFilmTime,
} from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import {
  BadgePop,
  BedroomSet,
  Bubble,
  Clock3AM,
  DeskSetup,
  FloatingHeart,
  Hut,
  LampPost,
  ObsidianLavaPit,
  OpenBookPage,
  OpeningChest,
  OwnerCrown,
  Puffs,
  RedstoneLamp,
  ServerChatBox,
  ServerCrowd,
  ServerNameTag,
  ServerPlayer,
  SubscribeSign,
  TearDrops,
  WritableBook,
  ease,
  pop,
  ramp,
  wordClock,
} from "../../../Topics/ServerLore";
import { VillageStreet } from "../../../Topics/InThisTown/places";
import rawTiming from "./timing.json";

export {
  BadgePop,
  BedroomSet,
  Block,
  Bubble,
  Clock3AM,
  Clouds,
  DeskSetup,
  Dust,
  EmberDrift,
  FloatingHeart,
  FloatingNumber,
  Glow,
  GodRay,
  Hut,
  LampPost,
  LightPool,
  ObsidianLavaPit,
  OpenBookPage,
  OpeningChest,
  OwnerCrown,
  Puffs,
  RedstoneLamp,
  ServerChatBox,
  ServerCrowd,
  ServerNameTag,
  ServerPlayer,
  Sign,
  SubscribeSign,
  TearDrops,
  Tree,
  VillageStreet,
  Vox,
  WritableBook,
  Zone,
  cam,
  clamp01,
  ease,
  moveBetween,
  plankTex,
  pop,
  ramp,
  storyScene,
};
export type { Timing, Vec3 };

export const timing = rawTiming as unknown as Timing;
export const wordAt = wordClock(timing);
export const on = (base: Vec3, x = 0, y = 0, z = 0): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

/**
 * 6 Distinct Grounded Environments matching EVERY single line of narration:
 *   - forest:  Lush oak meadow elevated at y = 2.0 with a REAL carved 3-block sunken earth shaft (0..2.0) & choppable oak tree!
 *   - dungeon: Dark stonebrick Boss-Fight Dungeon Arena elevated at y = 2.0 with sunken hole & towering Dungeon Boss!
 *   - burrow:  True Underground Cutaway Cross-Section (Milo deep inside dirt cave, grass ceiling overhead, night mobs prowling above!)
 *   - smp:     Minecraft SMP Village Street & Lantern-lit Hills for community scenes, rallies, Safe Booths & Finale
 *   - irl:     Cozy late-night real-world bedroom with PC DeskSetup & baby sister's wooden crib
 *   - cabin:   Milo's oak SMP cabin interior where Owner discovers the signed book in the chest
 */
export const PLACE = {
  forest: [0, 0, 0] as Vec3,
  dungeon: [0, 0, 96] as Vec3,
  burrow: [0, 0, 192] as Vec3,
  smp: [0, 0, 288] as Vec3,
  irl: [0, 0, 384] as Vec3,
  cabin: [0, 0, 480] as Vec3,
};

/** Surface ground height of `forest` and `dungeon` carved-shaft terrains. */
export const SURFACE_Y = 2.0;

/**
 * Flush grass/dirt or stone lid that seals cleanly LEVEL WITH THE TERRAIN (`y = SURFACE_Y`)
 * over the real sunken shaft carved into `forest` or `dungeon` — NEVER a box sitting on top of a street!
 */
export const ShaftCap: React.FC<{
  position: Vec3;
  lid?: number;
  lava?: number;
  stone?: boolean;
}> = ({ position, lid = 1, lava = 0, stone = false }) => {
  const k = clamp01(lid);
  const lk = clamp01(lava);
  const t = useFilmTime();
  return (
    <group position={position}>
      {/* Flush terrain cap dropping smoothly into the 1.32x1.32 shaft opening at y = 1.78..2.00 */}
      {k > 0.02 ? (
        <group position={[0, 1.82 + (1 - k) * 0.9, 0]} scale={[k, 1, k]}>
          <Vox kind={stone ? "stoneBrick" : "dirt"} position={[0, -0.02, 0]} size={[1.32, 0.28, 1.32]} />
          {!stone ? <Block position={[0, 0.145, 0]} size={[1.34, 0.06, 1.34]} color="#53963a" /> : null}
        </group>
      ) : null}
      {/* Cruel molten lava pouring straight DOWN into the sunken earth shaft! */}
      {lk > 0.02 ? (
        <group position={[0, 2.0, 0]}>
          {/* Pouring vertical lava stream */}
          <Block
            position={[0.38 * (1 - lk * 0.4), 0.55, 0]}
            size={[0.34 * lk, 1.15, 0.34 * lk]}
            color="#ff5e12"
            emissive="#ff4d08"
            emissiveIntensity={1.65}
          />
          {/* Glowing lava pool filling the shaft top */}
          <Block
            position={[0, 0.04, 0]}
            size={[1.4 * lk, 0.14, 1.4 * lk]}
            color="#ff580e"
            emissive="#ff4c06"
            emissiveIntensity={1.6}
          />
          <Block
            position={[0, 0.125, 0]}
            size={[0.92 * lk, 0.05, 0.92 * lk]}
            color="#ffc436"
            emissive="#ffaa14"
            emissiveIntensity={1.7 + Math.sin(t * 9) * 0.2}
            castShadow={false}
          />
          <Glow position={[0, 0.55, 0]} size={2.6 * lk} color="#ff6a18" opacity={0.48} />
          <pointLight position={[0, 0.9, 0]} color="#ff6a14" intensity={9 * lk} distance={9} decay={2} />
          <EmberDrift position={[0, 0.2, 0]} area={[1.5, 2.2, 1.5]} count={18} color="#ff9233" speed={0.95} />
        </group>
      ) : null}
    </group>
  );
};

/** Voxel Iron Axe held in Milo's right hand while chopping oak trees in `2.wood`. */
export const IronAxe: React.FC<{ position?: Vec3; rotation?: Vec3 }> = ({
  position = [0, 0, 0.08],
  rotation = [-1.2, 0, 0],
}) => (
  <group position={position} rotation={rotation}>
    <Block position={[0, 0.22, 0]} size={[0.07, 0.62, 0.07]} color="#6e4726" />
    <Block position={[0.12, 0.44, 0]} size={[0.28, 0.22, 0.08]} color="#cfd6df" metalness={0.35} roughness={0.3} />
    <Block position={[0.24, 0.42, 0]} size={[0.08, 0.26, 0.06]} color="#eef3f8" castShadow={false} />
  </group>
);

/** Voxel Diamond Sword held by dungeon teammates during `1.mid` and `2.raid`. */
export const DiamondSwordProp: React.FC<{ position?: Vec3; rotation?: Vec3 }> = ({
  position = [0, 0, 0.08],
  rotation = [-1.25, 0, 0],
}) => (
  <group position={position} rotation={rotation}>
    <Block position={[0, 0.06, 0]} size={[0.07, 0.2, 0.07]} color="#5e3a1f" />
    <Block position={[0, 0.18, 0]} size={[0.28, 0.07, 0.08]} color="#1f808c" />
    <Block position={[0, 0.54, 0]} size={[0.12, 0.66, 0.05]} color="#48e8ef" emissive="#22b5c4" emissiveIntensity={0.35} />
  </group>
);

/** Voxel Lava Bucket held by the Bully during `3.pour`. */
export const LavaBucket: React.FC<{ position?: Vec3; rotation?: Vec3 }> = ({
  position = [0, 0, 0.1],
  rotation = [0.6, 0, 0],
}) => (
  <group position={position} rotation={rotation}>
    <Block position={[0, 0, 0]} size={[0.26, 0.28, 0.26]} color="#9ca4b0" metalness={0.35} roughness={0.35} />
    <Block position={[0, 0.12, 0]} size={[0.2, 0.07, 0.2]} color="#ff6014" emissive="#ff5208" emissiveIntensity={1.6} />
  </group>
);

/**
 * Towering 3.2-metre-tall Obsidian Dungeon Boss swinging a blazing greatsword in `1.mid` & `2.raid`!
 */
export const DungeonBoss: React.FC<{
  position: Vec3;
  rotationY?: number;
}> = ({ position, rotationY = 0 }) => {
  const t = useFilmTime();
  const swing = Math.sin(t * 5.2) * 0.72;
  const stomp = Math.abs(Math.sin(t * 3.1)) * 0.08;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Massive armored legs */}
      <Block position={[-0.42, 0.65, 0]} size={[0.52, 1.3, 0.52]} color="#231c2e" />
      <Block position={[0.42, 0.65, 0]} size={[0.52, 1.3, 0.52]} color="#231c2e" />
      {/* Broad dark-obsidian armored torso with glowing lava runes */}
      <group position={[0, 1.3 + stomp, 0]}>
        <Block position={[0, 0.78, 0]} size={[1.5, 1.48, 0.85]} color="#2b2138" />
        <Block position={[0, 0.85, 0.44]} size={[0.48, 0.48, 0.05]} color="#ff4a1c" emissive="#ff3d0a" emissiveIntensity={1.5} castShadow={false} />
        {/* Spiked pauldrons */}
        <Block position={[-0.95, 1.38, 0]} size={[0.58, 0.42, 0.78]} color="#3a294d" />
        <Block position={[0.95, 1.38, 0]} size={[0.58, 0.42, 0.78]} color="#3a294d" />
        {/* Horned boss head with burning crimson eyes */}
        <group position={[0, 1.85, 0.05]} rotation={[0, Math.sin(t * 2.4) * 0.14, 0]}>
          <Block position={[0, 0, 0]} size={[0.78, 0.78, 0.78]} color="#1f1829" />
          <Block position={[-0.2, 0.08, 0.41]} size={[0.18, 0.12, 0.03]} color="#ff3b24" emissive="#ff2a14" emissiveIntensity={2.0} castShadow={false} />
          <Block position={[0.2, 0.08, 0.41]} size={[0.18, 0.12, 0.03]} color="#ff3b24" emissive="#ff2a14" emissiveIntensity={2.0} castShadow={false} />
          {/* Curved obsidian horns */}
          <Block position={[-0.46, 0.42, 0]} size={[0.18, 0.52, 0.18]} color="#4a385e" />
          <Block position={[0.46, 0.42, 0]} size={[0.18, 0.52, 0.18]} color="#4a385e" />
        </group>
        {/* Left arm */}
        <group position={[-1.02, 1.15, 0]} rotation={[swing * 0.45, 0, 0.12]}>
          <Block position={[0, -0.58, 0]} size={[0.44, 1.32, 0.44]} color="#281f36" />
        </group>
        {/* Right arm swinging a blazing giant lava greatsword! */}
        <group position={[1.02, 1.15, 0]} rotation={[-1.05 + swing, 0, -0.1]}>
          <Block position={[0, -0.58, 0]} size={[0.44, 1.32, 0.44]} color="#281f36" />
          <group position={[0, -1.25, 0.18]} rotation={[-1.35, 0, 0]}>
            <Block position={[0, -0.12, 0]} size={[0.14, 0.45, 0.14]} color="#4d321c" />
            <Block position={[0, 0.16, 0]} size={[0.64, 0.14, 0.16]} color="#f5b82e" />
            <Block position={[0, 1.05, 0]} size={[0.28, 1.65, 0.1]} color="#ff581c" emissive="#ff4208" emissiveIntensity={1.45} />
            <Block position={[0, 1.05, 0]} size={[0.12, 1.55, 0.12]} color="#ffe270" emissive="#ffc433" emissiveIntensity={1.5} castShadow={false} />
          </group>
        </group>
        <Glow position={[0, 1.2, 0.5]} size={3.2} color="#ff4818" opacity={0.28} />
        <pointLight position={[0, 1.5, 1.4]} color="#ff5e24" intensity={8} distance={10} decay={2} />
      </group>
    </group>
  );
};

/**
 * Green Minecraft Night Zombie prowling on the grass ABOVE Milo's underground burrow in `2.still` & `4.safe`!
 */
export const NightZombie: React.FC<{
  position: Vec3;
  rotationY?: number;
  walk?: number;
}> = ({ position, rotationY = 0, walk = 0 }) => {
  const swing = Math.sin(walk * 5.2) * 0.65;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Dark blue zombie trousers */}
      <group position={[-0.14, 0.72, 0]} rotation={[swing, 0, 0]}>
        <Block position={[0, -0.36, 0]} size={[0.24, 0.72, 0.24]} color="#353f7a" />
      </group>
      <group position={[0.14, 0.72, 0]} rotation={[-swing, 0, 0]}>
        <Block position={[0, -0.36, 0]} size={[0.24, 0.72, 0.24]} color="#353f7a" />
      </group>
      {/* Teal shirt torso */}
      <Block position={[0, 1.08, 0]} size={[0.5, 0.72, 0.26]} color="#258080" />
      {/* Outstretched green zombie arms */}
      <group position={[-0.36, 1.32, 0]} rotation={[-1.45, 0, 0]}>
        <Block position={[0, -0.32, 0]} size={[0.22, 0.68, 0.22]} color="#4e8a42" />
      </group>
      <group position={[0.36, 1.32, 0]} rotation={[-1.45, 0, 0]}>
        <Block position={[0, -0.32, 0]} size={[0.22, 0.68, 0.22]} color="#4e8a42" />
      </group>
      {/* Green zombie head with dark hollow eyes */}
      <group position={[0, 1.68, 0]}>
        <Block position={[0, 0, 0]} size={[0.48, 0.48, 0.48]} color="#539145" />
        <Block position={[-0.11, 0.02, 0.245]} size={[0.1, 0.08, 0.02]} color="#162414" castShadow={false} />
        <Block position={[0.11, 0.02, 0.245]} size={[0.1, 0.08, 0.02]} color="#162414" castShadow={false} />
      </group>
    </group>
  );
};

/** Warm lantern-lit oak & glass Minecraft Safe Booth built by the entire server for Milo. */
export const SafeBooth: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  lit?: number;
  signText?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, lit = 1, signText }) => {
  const g = clamp01(lit);
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Vox kind="stoneBrick" position={[0, 0.1, 0]} size={[2.2, 0.2, 2.2]} />
      {[-0.95, 0.95].map((x) =>
        [-0.95, 0.95].map((z) => (
          <Vox key={`${x}_${z}`} kind="darkPlanks" position={[x, 1.35, z]} size={[0.24, 2.3, 0.24]} />
        )),
      )}
      <Vox kind="planks" position={[0, 1.3, -0.95]} size={[1.66, 2.2, 0.18]} />
      <Block position={[-0.95, 1.35, 0]} size={[0.08, 1.6, 1.6]} color="#bfe8ff" transparent opacity={0.42} />
      <Block position={[0.95, 1.35, 0]} size={[0.08, 1.6, 1.6]} color="#bfe8ff" transparent opacity={0.42} />
      <Block position={[0.38, 1.18, 0.92]} size={[0.88, 1.96, 0.1]} color="#d6dde6" metalness={0.35} roughness={0.4} />
      <Block position={[0.38, 1.55, 0.95]} size={[0.52, 0.44, 0.08]} color="#2b3340" castShadow={false} />
      <Block position={[0.05, 1.1, 0.98]} size={[0.1, 0.14, 0.05]} color="#ffd84d" castShadow={false} />
      <Vox kind="darkPlanks" position={[0, 2.6, 0]} size={[2.5, 0.24, 2.5]} />
      <Vox kind="planks" position={[0, 2.84, 0]} size={[1.85, 0.22, 1.85]} />
      <RedstoneLamp position={[0, 2.1, -0.1]} size={0.46} lit={g} />
      {g > 0.2 ? (
        <>
          <Glow position={[0, 1.85, 0.2]} size={2.6} color="#ffcf6e" opacity={0.34 * g} />
          <pointLight position={[0, 2.0, 0.4]} color="#ffd57a" intensity={5.0 * g} distance={9} decay={2} />
        </>
      ) : null}
      {signText ? <Sign position={[0, 2.58, 1.34]} title={signText} /> : null}
    </group>
  );
};

/** Friendly vanilla Minecraft Iron Golem standing guard outside Milo's Safe Booths holding a red poppy. */
export const FriendlyGolem: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  poppy?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, poppy = true }) => {
  const t = useFilmTime();
  const sway = Math.sin(t * 2.2) * 0.05;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[-0.28, 0.48, 0]} size={[0.34, 0.96, 0.34]} color="#d8d4ca" />
      <Block position={[0.28, 0.48, 0]} size={[0.34, 0.96, 0.34]} color="#d8d4ca" />
      <Block position={[0, 1.48, 0]} size={[1.12, 1.08, 0.62]} color="#dfdbd0" />
      <Block position={[-0.36, 1.65, 0.32]} size={[0.24, 0.42, 0.04]} color="#4d8a3b" castShadow={false} />
      <Block position={[0.28, 1.25, 0.32]} size={[0.28, 0.24, 0.04]} color="#4d8a3b" castShadow={false} />
      <group position={[0, 2.24, 0.08]} rotation={[0, sway, 0]}>
        <Block position={[0, 0, 0]} size={[0.52, 0.56, 0.52]} color="#e2ded4" />
        <Block position={[0, -0.1, 0.29]} size={[0.14, 0.24, 0.14]} color="#d0cbc0" />
        <Block position={[-0.14, 0.04, 0.265]} size={[0.1, 0.08, 0.02]} color="#e69f28" emissive="#e69f28" emissiveIntensity={0.45} castShadow={false} />
        <Block position={[0.14, 0.04, 0.265]} size={[0.1, 0.08, 0.02]} color="#e69f28" emissive="#e69f28" emissiveIntensity={0.45} castShadow={false} />
      </group>
      <Block position={[-0.74, 1.28, 0]} size={[0.28, 1.28, 0.32]} color="#d4d0c5" />
      <group position={[0.74, 1.8, 0]} rotation={[poppy ? -0.65 + sway : 0, 0, 0]}>
        <Block position={[0, -0.52, 0]} size={[0.28, 1.24, 0.32]} color="#d4d0c5" />
        {poppy ? (
          <group position={[0, -1.12, 0.18]}>
            <Block position={[0, 0.08, 0]} size={[0.05, 0.24, 0.05]} color="#3a8a32" />
            <Block position={[0, 0.22, 0]} size={[0.16, 0.14, 0.16]} color="#e62e2e" emissive="#b51b1b" emissiveIntensity={0.25} />
          </group>
        ) : null}
      </group>
    </group>
  );
};

/** Grounded real-world wooden baby crib beside Milo's bedroom desk (baby sister rocks softly). */
export const BabyCrib: React.FC<{
  position?: Vec3;
  rotationY?: number;
  crying?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, crying = false }) => {
  const t = useFilmTime();
  const wiggle = crying ? Math.sin(t * 14) * 0.08 : Math.sin(t * 2.5) * 0.02;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Block position={[0, 0.42, 0]} size={[1.15, 0.12, 0.78]} map={plankTex("#d8b888")} />
      <Block position={[0, 0.54, 0]} size={[1.05, 0.14, 0.68]} color="#f7f4eb" />
      <Block position={[0.12, 0.62, 0]} size={[0.7, 0.1, 0.62]} color="#ffd966" />
      {[-0.54, 0.54].map((x) =>
        [-0.36, 0.36].map((z) => (
          <Block key={`${x}_${z}`} position={[x, 0.56, z]} size={[0.08, 1.12, 0.08]} map={plankTex("#cfa974")} />
        )),
      )}
      {[-0.32, -0.1, 0.12, 0.34].map((x, i) => (
        <Block key={i} position={[x, 0.78, 0.36]} size={[0.04, 0.56, 0.04]} map={plankTex("#d8b888")} />
      ))}
      <Block position={[0, 1.06, 0.36]} size={[1.12, 0.07, 0.07]} map={plankTex("#cfa974")} />
      <Block position={[0, 1.06, -0.36]} size={[1.12, 0.07, 0.07]} map={plankTex("#cfa974")} />
      <group position={[-0.28, 0.68, 0]} rotation={[0, 0, wiggle]}>
        <Block position={[0, 0, 0]} size={[0.26, 0.24, 0.26]} color="#f4c7a4" />
        <Block position={[-0.02, 0.12, 0]} size={[0.24, 0.07, 0.24]} color="#6e4425" />
      </group>
      {crying ? (
        <>
          <BadgePop kind="!" position={[0, 1.48, 0]} scale={0.78} />
          <Glow position={[0, 1.05, 0]} size={1.2} color="#62b4ff" opacity={0.28} />
        </>
      ) : null}
    </group>
  );
};

/** Small friendship gift: glowing red Minecraft Poppy flower. */
export const PoppyFlower: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.18, 0]} size={[0.06, 0.36, 0.06]} color="#3a8a32" />
    <Block position={[0, 0.4, 0]} size={[0.22, 0.18, 0.22]} color="#e6322e" emissive="#c41f1b" emissiveIntensity={0.25} />
    <Block position={[0, 0.42, 0]} size={[0.08, 0.08, 0.08]} color="#1f1a18" castShadow={false} />
  </group>
);

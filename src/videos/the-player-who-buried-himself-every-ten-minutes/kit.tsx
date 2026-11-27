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
 * 3 distinct grounded world zones:
 *   - smp:   Minecraft SMP village street & meadow hills (day, night, lantern-lit golden payoff)
 *   - irl:   Grounded late-night real-world bedroom with PC DeskSetup & baby sister's crib
 *   - cabin: Cozy interior of Milo's wooden cabin where Owner finds the signed book in the chest
 */
export const PLACE = {
  smp: [0, 0, 0] as Vec3,
  irl: [0, 0, 88] as Vec3,
  cabin: [0, 0, 176] as Vec3,
};

/** 3-block deep Minecraft dirt hiding shelter (`lid`: 0 open -> 1 dirt cap overhead; `lava`: 0 -> 1 lava pour). */
export const DirtPit: React.FC<{
  position?: Vec3;
  lid?: number;
  lava?: number;
}> = ({ position = [0, 0, 0], lid = 1, lava = 0 }) => {
  const k = clamp01(lid);
  const lk = clamp01(lava);
  return (
    <group position={position}>
      {/* Raised earthen dirt walls around Milo's 1x1 safety pit */}
      <Vox kind="dirt" position={[-0.78, 0.48, 0]} size={[0.48, 0.96, 1.56]} />
      <Vox kind="dirt" position={[0.78, 0.48, 0]} size={[0.48, 0.96, 1.56]} />
      <Vox kind="dirt" position={[0, 0.48, -0.78]} size={[1.56, 0.96, 0.48]} />
      <Vox kind="dirt" position={[0, 0.48, 0.78]} size={[1.56, 0.96, 0.48]} />
      {/* Grass rim */}
      <Block position={[-0.78, 0.98, 0]} size={[0.5, 0.12, 1.58]} color="#4e8c36" />
      <Block position={[0.78, 0.98, 0]} size={[0.5, 0.12, 1.58]} color="#4e8c36" />
      <Block position={[0, 0.98, -0.78]} size={[1.58, 0.12, 0.5]} color="#4e8c36" />
      <Block position={[0, 0.98, 0.78]} size={[1.58, 0.12, 0.5]} color="#4e8c36" />
      {/* Animated top dirt roof cap closing overhead */}
      {k > 0.02 ? (
        <group position={[0, 1.05 + (1 - k) * 0.95, 0]} scale={[k, 1, k]}>
          <Vox kind="dirt" position={[0, 0, 0]} size={[1.18, 0.35, 1.18]} />
          <Block position={[0, 0.2, 0]} size={[1.2, 0.1, 1.2]} color="#53963a" />
        </group>
      ) : null}
      {/* Cruel glowing lava pour across the top */}
      {lk > 0.02 ? (
        <group position={[0, 1.28, 0]}>
          <Block position={[0, 0.04, 0]} size={[1.45 * lk, 0.16, 1.45 * lk]} color="#ff5e12" emissive="#ff520a" emissiveIntensity={1.5} />
          <Block position={[0, 0.13, 0]} size={[0.9 * lk, 0.06, 0.9 * lk]} color="#ffbe33" emissive="#ffa81a" emissiveIntensity={1.6} castShadow={false} />
          <Glow position={[0, 0.65, 0]} size={2.2 * lk} color="#ff6a18" opacity={0.42} />
          <EmberDrift position={[0, 0.2, 0]} area={[1.4, 2.0, 1.4]} count={14} color="#ff8e2b" speed={0.8} />
        </group>
      ) : null}
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
      {/* Stone brick base plinth */}
      <Vox kind="stoneBrick" position={[0, 0.1, 0]} size={[2.2, 0.2, 2.2]} />
      {/* 4 oak corner posts */}
      {[-0.95, 0.95].map((x) =>
        [-0.95, 0.95].map((z) => (
          <Vox key={`${x}_${z}`} kind="darkPlanks" position={[x, 1.35, z]} size={[0.24, 2.3, 0.24]} />
        )),
      )}
      {/* Back plank wall + side warm glass windows */}
      <Vox kind="planks" position={[0, 1.3, -0.95]} size={[1.8, 2.2, 0.18]} />
      <Block position={[-0.95, 1.35, 0]} size={[0.08, 1.6, 1.6]} color="#bfe8ff" transparent opacity={0.42} />
      <Block position={[0.95, 1.35, 0]} size={[0.08, 1.6, 1.6]} color="#bfe8ff" transparent opacity={0.42} />
      {/* Iron security door on right front half */}
      <Block position={[0.38, 1.18, 0.92]} size={[0.88, 1.96, 0.1]} color="#d6dde6" metalness={0.35} roughness={0.4} />
      <Block position={[0.38, 1.55, 0.94]} size={[0.52, 0.44, 0.12]} color="#2b3340" castShadow={false} />
      <Block position={[0.05, 1.1, 0.98]} size={[0.1, 0.14, 0.06]} color="#ffd84d" castShadow={false} />
      {/* Pitched warm oak overhang roof */}
      <Vox kind="darkPlanks" position={[0, 2.6, 0]} size={[2.5, 0.24, 2.5]} />
      <Vox kind="planks" position={[0, 2.82, 0]} size={[1.85, 0.22, 1.85]} />
      {/* Hanging warm golden lantern inside booth */}
      <RedstoneLamp position={[0, 2.1, -0.1]} size={0.46} lit={g} />
      {g > 0.2 ? (
        <>
          <Glow position={[0, 1.85, 0.2]} size={2.6} color="#ffcf6e" opacity={0.34 * g} />
          <pointLight position={[0, 2.0, 0.4]} color="#ffd57a" intensity={5.0 * g} distance={9} decay={2} />
        </>
      ) : null}
      {signText ? <Sign position={[0, 2.55, 1.32]} title={signText} /> : null}
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
      {/* Thick iron legs */}
      <Block position={[-0.28, 0.48, 0]} size={[0.34, 0.96, 0.34]} color="#d8d4ca" />
      <Block position={[0.28, 0.48, 0]} size={[0.34, 0.96, 0.34]} color="#d8d4ca" />
      {/* Broad torso with mossy vine patch */}
      <Block position={[0, 1.48, 0]} size={[1.12, 1.08, 0.62]} color="#dfdbd0" />
      <Block position={[-0.36, 1.65, 0.32]} size={[0.24, 0.42, 0.04]} color="#4d8a3b" castShadow={false} />
      <Block position={[0.28, 1.25, 0.32]} size={[0.28, 0.24, 0.04]} color="#4d8a3b" castShadow={false} />
      {/* Golem head + long nose + warm amber eyes */}
      <group position={[0, 2.24, 0.08]} rotation={[0, sway, 0]}>
        <Block position={[0, 0, 0]} size={[0.52, 0.56, 0.52]} color="#e2ded4" />
        <Block position={[0, -0.1, 0.29]} size={[0.14, 0.24, 0.14]} color="#d0cbc0" />
        <Block position={[-0.14, 0.04, 0.265]} size={[0.1, 0.08, 0.02]} color="#e69f28" emissive="#e69f28" emissiveIntensity={0.45} castShadow={false} />
        <Block position={[0.14, 0.04, 0.265]} size={[0.1, 0.08, 0.02]} color="#e69f28" emissive="#e69f28" emissiveIntensity={0.45} castShadow={false} />
      </group>
      {/* Left arm down, right arm gently extended offering a red poppy */}
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
      {/* Birch crib frame + mattress + pastel yellow blanket */}
      <Block position={[0, 0.42, 0]} size={[1.15, 0.12, 0.78]} map={plankTex("#d8b888")} />
      <Block position={[0, 0.54, 0]} size={[1.05, 0.14, 0.68]} color="#f7f4eb" />
      <Block position={[0.12, 0.62, 0]} size={[0.7, 0.1, 0.62]} color="#ffd966" />
      {/* Corner posts & wooden crib rails */}
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
      {/* Cute voxel baby sister head resting on pillow */}
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

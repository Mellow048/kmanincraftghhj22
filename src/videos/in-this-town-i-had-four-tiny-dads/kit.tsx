import type React from "react";
import { Block, MinecraftAvatar, Vox, getPose } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import {
  ADULT,
  Bits,
  Bubble,
  CHILD,
  DEG,
  EAST,
  Fish,
  GROUND_SIT,
  IronGolem,
  KID,
  Lantern,
  Mood,
  MonsterProps,
  NORTH,
  PixelHeart,
  Puffs,
  ROBE,
  SOUTH,
  SchoolDesk,
  Slime,
  SoundRings,
  StrawHat,
  SubscribeSign,
  Villager,
  WEST,
  Wisps,
  ahead,
  beside,
  chestOf,
  ease,
  faceOf,
  golemHand,
  groundSitPose,
  jolt,
  monsterFace,
  openArmsPose,
  pop,
  ramp,
  villagerChest,
  villagerFace,
  wordClock,
} from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  ADULT,
  Bits,
  Bubble,
  CHILD,
  DEG,
  EAST,
  Fish,
  GROUND_SIT,
  IronGolem,
  KID,
  Lantern,
  NORTH,
  PixelHeart,
  Puffs,
  ROBE,
  SOUTH,
  SchoolDesk,
  Slime,
  SoundRings,
  StrawHat,
  SubscribeSign,
  Villager,
  WEST,
  Wisps,
  ahead,
  beside,
  chestOf,
  ease,
  faceOf,
  golemHand,
  groundSitPose,
  jolt,
  monsterFace,
  openArmsPose,
  pop,
  ramp,
  villagerChest,
  villagerFace,
};
export type { Mood, MonsterProps, Pose, Vec3 };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into a shot at which `word` is spoken in `cue`. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({
  ...getPose(clip, t),
  ...patch,
});

// ----------------------------------------------------------------------------- Cast
// NOTE: In Topics/InThisTown/monsters.tsx, Slime `size` is its width in METRES:
//   - TinyDad        : 0.38 m (knee-high beside a 1.28 m kid)
//   - BigSlimeDad    : 0.78 m (medium slime after 1st split)
//   - GrandpaSlime   : 0.98 m (elder slime)
//   - OriginalBigDad : 1.42 m (big slime dad — taller than a kid, fits cleanly in 9:16)

export const TINY_M = 0.38;
export const MED_M = 0.78;
export const BIG_M = 1.42;

/** Human kid hero: warm amber-orange hoodie so he pops against green slimes, stone, night & water. */
export const Hero: React.FC<MinecraftAvatarProps> = ({ scale = KID, face = "smile", ...props }) => (
  <MinecraftAvatar
    scale={scale}
    skin="#f1c29b"
    hair="#4a2e1b"
    outfit="hoodie"
    colors={{ torso: "#f07c2e", arms: "#f07c2e", legs: "#314c6e" }}
    shoes="#f4f2ec"
    face={face === "laugh" ? "grin" : face}
    blink
    {...props}
  />
);

/** Baby hero in reed-basket flashbacks. */
export const BabyHero: React.FC<{ position?: Vec3; rotationY?: number; reach?: number; cry?: boolean }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  reach = 0,
  cry = false,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="wool" tint="#e8833a" position={[0, 0.14, 0]} size={[0.32, 0.22, 0.34]} />
    <Vox kind="wool" tint="#3b78bd" position={[0, 0.15, 0.03]} size={[0.34, 0.1, 0.22]} />
    <MinecraftAvatar
      position={[0, 0.02, 0.02]}
      scale={0.4}
      skin="#f1c29b"
      hair="#4a2e1b"
      outfit="gown"
      colors={{ torso: "#3b78bd", arms: "#3b78bd", legs: "#e8833a" }}
      face={cry ? "crying" : "smile"}
      pose={{
        ...getPose("sit", 0),
        armR: [-0.85 - reach * 0.65, 0, 0.2],
        armL: [-0.8 - reach * 0.65, 0, -0.2],
      }}
    />
  </group>
);

export type DadId = 1 | 2 | 3 | 4;

const DAD_COLORS: Record<DadId, { color: string; phase: number }> = {
  1: { color: "#6fd84a", phase: 0.2 },
  2: { color: "#62cc40", phase: 1.4 },
  3: { color: "#78df52", phase: 2.6 },
  4: { color: "#5bc43c", phase: 3.7 },
};

/**
 * One of our 4 distinct knee-high tiny slime dads (`0.38 m` cube):
 *   #1 miniature straw hat · #2 dark spectacles · #3 crooked blue necktie · #4 red-and-gold cap
 */
export const TinyDad: React.FC<
  Omit<MonsterProps, "hat" | "scarf"> & {
    which: DadId;
    squash?: number;
    hop?: number;
  }
> = ({ which, position = [0, 0, 0], rotationY = 0, scale = 1, squash = 0, hop = 0, mood = "happy", ...rest }) => {
  const st = DAD_COLORS[which];
  const sy = 1 - squash * 0.32;
  const sx = 1 + squash * 0.2;
  const topY = TINY_M * sy;
  const frontZ = TINY_M * 0.505 * sx;
  return (
    <group position={[position[0], position[1] + Math.max(0, hop), position[2]]} rotation={[0, rotationY, 0]} scale={scale}>
      <Slime size={TINY_M} color={st.color} phase={st.phase} squash={squash} mood={mood} {...rest} />
      {which === 1 ? (
        <group position={[0, topY, 0]}>
          <Block position={[0, 0.015, 0]} size={[0.44, 0.03, 0.44]} color="#e5c158" />
          <Block position={[0, 0.055, 0]} size={[0.26, 0.07, 0.26]} color="#d8b248" />
          <Block position={[0, 0.032, 0]} size={[0.27, 0.022, 0.27]} color="#c93b2b" />
        </group>
      ) : null}
      {which === 2 ? (
        <group position={[0, topY * 0.62, frontZ]}>
          <Block position={[-0.08, 0, 0]} size={[0.085, 0.06, 0.02]} color="#1f1916" />
          <Block position={[0.08, 0, 0]} size={[0.085, 0.06, 0.02]} color="#1f1916" />
          <Block position={[0, 0.01, 0]} size={[0.07, 0.018, 0.02]} color="#1f1916" />
        </group>
      ) : null}
      {which === 3 ? (
        <group position={[0.015, topY * 0.28, frontZ]} rotation={[0, 0, 0.18]}>
          <Block position={[0, 0.048, 0]} size={[0.075, 0.036, 0.022]} color="#1d4ed8" />
          <Block position={[0, -0.018, 0]} size={[0.055, 0.11, 0.02]} color="#2563eb" />
        </group>
      ) : null}
      {which === 4 ? (
        <group position={[0, topY, 0]}>
          <Block position={[0, 0.032, 0]} size={[0.24, 0.06, 0.24]} color="#e04838" />
          <Block position={[0, 0.015, 0.12]} size={[0.22, 0.022, 0.1]} color="#f2c138" />
        </group>
      ) : null}
    </group>
  );
};

/** All 4 tiny dads stacked into a wobbling ~1.5 m totem (every face & accessory clearly separated!). */
export const DadStack: React.FC<{
  position?: Vec3;
  rotationY?: number;
  sway?: number;
  squash?: number;
  mood?: Mood;
  topLean?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, sway = 0, squash = 0, mood = "happy", topLean = 0 }) => {
  const step = 0.37 * (1 - squash * 0.2);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <TinyDad which={1} position={[0, 0, 0]} squash={squash * 1.1} mood={mood} />
      <TinyDad which={2} position={[sway * 0.05, step, 0]} squash={squash} mood={mood} />
      <TinyDad which={3} position={[sway * 0.1, step * 2, 0.01]} squash={squash * 0.9} mood={mood} />
      <TinyDad
        which={4}
        position={[sway * 0.15, step * 3, 0.03 + topLean * 0.1]}
        squash={squash * 0.85}
        mood={mood}
        nod={topLean * 0.35}
      />
    </group>
  );
};

/**
 * Fused/Medium Big Slime Dad (`0.88 m` cube) wearing Dad #3's crooked blue necktie on his front chest!
 * Supports `scale`, `nod`, and `cracked` for the bridge battle (`6.fuse`..`6.split`).
 */
export const BigSlimeDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  which?: 1 | 2;
  scale?: number;
  squash?: number;
  nod?: number;
  cracked?: number;
  mood?: Mood;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  which = 1,
  scale = 1,
  squash = 0,
  nod = 0,
  cracked = 0,
  mood = "scared",
}) => {
  const s = 0.88;
  const sy = 1 - squash * 0.32;
  const sx = 1 + squash * 0.2;
  const fz = s * 0.508 * sx;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Slime
        size={s}
        color={which === 1 ? "#69d446" : "#5cc63d"}
        squash={squash}
        nod={nod}
        mood={mood}
      />
      {/* Dad #3's crooked blue necktie right on Big Dad's chest */}
      <group position={[0.03, s * 0.28 * sy, fz]} rotation={[0, 0, 0.18]}>
        <Block position={[0, 0.09, 0]} size={[0.14, 0.065, 0.025]} color="#1d4ed8" />
        <Block position={[0, -0.035, 0]} size={[0.1, 0.21, 0.022]} color="#2563eb" />
      </group>
      {cracked > 0.05 ? (
        <group position={[0, s * 0.55 * sy, fz + 0.004]}>
          <Block position={[-0.12, 0.08, 0]} rotation={[0, 0, 0.42]} size={[0.28 * cracked, 0.035, 0.02]} color="#d9ffd0" />
          <Block position={[0.1, -0.06, 0]} rotation={[0, 0, -0.5]} size={[0.26 * cracked, 0.035, 0.02]} color="#d9ffd0" />
        </group>
      ) : null}
    </group>
  );
};

/**
 * Fake Big Slime "Jelly Suit" built out of slimeballs (`4.tie`, `4.melt`):
 * wobbles with Dad #3's crooked blue tie on its chest, then slumps sideways into a puddle!
 */
export const JellySuitDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  melt?: number;
  wobble?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, melt = 0, wobble = 0 }) => {
  const s = 1.18;
  const slumpY = Math.max(0.18, 1 - melt * 0.78);
  const spreadX = 1 + melt * 0.85;
  const tiltZ = melt * 0.38 + Math.sin(wobble * 6) * 0.05 * (1 - melt);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <group scale={[spreadX, slumpY, spreadX]} rotation={[0, 0, -tiltZ]}>
        <Slime size={s} color="#74e44e" squash={melt * 0.3} mood={melt > 0.35 ? "scared" : "happy"} />
        <group position={[0.04, s * 0.3, s * 0.515]} rotation={[0, 0, 0.24 + melt * 0.5]}>
          <Block position={[0, 0.11, 0]} size={[0.16, 0.075, 0.026]} color="#1d4ed8" />
          <Block position={[0, -0.04, 0]} size={[0.11, 0.24, 0.024]} color="#2563eb" />
        </group>
      </group>
    </group>
  );
};

/** Original big two-block slime dad (`1.42 m` cube) before he ever split! */
export const OriginalBigDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  squash?: number;
  mood?: Mood;
  nod?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, squash = 0, mood = "happy", nod = 0 }) => {
  const sy = 1 - squash * 0.32;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Slime size={BIG_M} color="#66d244" scarf="#2f74d0" squash={squash} mood={mood} nod={nod} />
      {/* Proportional straw hat on top so it never umbrellas over the camera */}
      <group position={[0, BIG_M * sy, 0]}>
        <Block position={[0, 0.04, 0]} size={[1.15, 0.07, 1.15]} color="#e5c158" />
        <Block position={[0, 0.15, 0]} size={[0.74, 0.18, 0.74]} color="#d8b248" />
        <Block position={[0, 0.085, 0]} size={[0.76, 0.05, 0.76]} color="#2563eb" />
      </group>
    </group>
  );
};

/** Neighbour kids' big two-block slime dads (`1.36 m` cube). */
export const NeighborBigDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  variant?: 0 | 1 | 2;
  squash?: number;
  mood?: Mood;
}> = ({ position = [0, 0, 0], rotationY = 0, variant = 0, squash = 0, mood = "happy" }) => {
  const colors = ["#54c238", "#6bd94b", "#49b030"];
  const scarves = ["#8b4c2a", "#a33c3c", "#4d648d"];
  return (
    <Slime
      position={position}
      rotationY={rotationY}
      size={1.36}
      color={colors[variant]}
      scarf={scarves[variant]}
      squash={squash}
      mood={mood}
    />
  );
};

/** Wise elderly Grandpa Slime (`0.98 m` cube) with crisp white brows & moustache on the front face (`2.splits`, `2.ball`). */
export const GrandpaSlime: React.FC<{
  position?: Vec3;
  rotationY?: number;
  squash?: number;
  mood?: Mood;
  nod?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, squash = 0, mood = "calm", nod = 0 }) => {
  const s = 0.98;
  const sy = 1 - squash * 0.32;
  const sx = 1 + squash * 0.2;
  const fz = s * 0.51 * sx;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Slime size={s} color="#58b942" scarf="#7a5a38" squash={squash} mood={mood} nod={nod} />
      <Block position={[-0.2, s * 0.72 * sy, fz]} size={[0.2, 0.065, 0.03]} color="#f4f3ed" />
      <Block position={[0.2, s * 0.72 * sy, fz]} size={[0.2, 0.065, 0.03]} color="#f4f3ed" />
      <Block position={[0, s * 0.33 * sy, fz]} size={[0.42, 0.085, 0.035]} color="#f4f3ed" />
    </group>
  );
};

/** Damaged, vine-choked rogue Iron Golem lurking at the swamp bridge (`4.vine`..`6.sink`). */
export const RogueGolem: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  walk?: number;
  armR?: number;
  armL?: number;
  headPitch?: number;
  headYaw?: number;
  bow?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1.0, ...rest }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <IronGolem {...rest} />
    <Block position={[0.24, 1.72, 0.36]} size={[0.34, 0.08, 0.03]} color="#2b2623" />
    <Block position={[-0.42, 1.48, 0.36]} size={[0.18, 0.44, 0.04]} color="#2f6127" />
    <Block position={[0.46, 1.32, 0.36]} size={[0.16, 0.52, 0.04]} color="#295422" />
  </group>
);

// ----------------------------------------------------------------------------- Custom Story Props

/** Wooden Minecraft wheelbarrow with stained slime-green tray and all 4 tiny dads peeking over the rim! */
export const Wheelbarrow: React.FC<{
  position?: Vec3;
  rotationY?: number;
  tilt?: number;
  wheelSpin?: number;
  withDads?: boolean;
  dadBounce?: number;
  dadMood?: Mood;
  covered?: boolean;
  sheetFly?: number;
  withSlimeBlock?: boolean;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  tilt = 0,
  wheelSpin = 0,
  withDads = false,
  dadBounce = 0,
  dadMood = "happy",
  covered = false,
  sheetFly = 0,
  withSlimeBlock = false,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <group rotation={[tilt, 0, 0]}>
      <group position={[0, 0.22, 0.6]} rotation={[wheelSpin, 0, 0]}>
        <Vox kind="darkPlanks" size={[0.13, 0.42, 0.42]} />
        <Block size={[0.15, 0.13, 0.13]} color="#6e7075" />
      </group>
      {[-0.28, 0.28].map((x) => (
        <Vox key={x} kind="log" position={[x, 0.34, -0.1]} rotation={[0.1, 0, 0]} size={[0.08, 0.08, 1.4]} />
      ))}
      {[-0.26, 0.26].map((x) => (
        <Vox key={`l${x}`} kind="darkPlanks" position={[x, 0.15, -0.4]} size={[0.08, 0.3, 0.08]} />
      ))}
      <Vox kind="planks" position={[0, 0.38, 0.08]} size={[0.78, 0.07, 0.94]} />
      <Vox kind="planks" position={[-0.37, 0.5, 0.08]} size={[0.07, 0.2, 0.94]} />
      <Vox kind="planks" position={[0.37, 0.5, 0.08]} size={[0.07, 0.2, 0.94]} />
      <Vox kind="planks" position={[0, 0.51, 0.51]} rotation={[-0.2, 0, 0]} size={[0.78, 0.22, 0.07]} />
      <Vox kind="planks" position={[0, 0.5, -0.35]} size={[0.78, 0.2, 0.07]} />
      <Block position={[0.04, 0.42, 0.1]} size={[0.56, 0.016, 0.66]} color="#62cf40" />

      {withSlimeBlock ? <SlimeBlockProp position={[0, 0.42, 0.08]} scale={0.62} /> : null}

      {covered ? (
        <group
          position={[sheetFly * 1.25, 0.78 + sheetFly * 1.45, 0.08 - sheetFly * 0.8]}
          rotation={[sheetFly * 0.8, sheetFly * 0.5, sheetFly * 1.1]}
        >
          <Vox kind="wool" tint="#ebe4d2" size={[0.88, 0.14, 1.02]} />
        </group>
      ) : null}

      {withDads ? (
        <group position={[0, 0.42, 0.08]}>
          <TinyDad which={1} position={[-0.17, Math.abs(Math.sin(dadBounce)) * 0.07, 0.19]} scale={0.72} mood={dadMood} />
          <TinyDad which={2} position={[0.17, Math.abs(Math.sin(dadBounce + 1.1)) * 0.07, 0.19]} scale={0.72} mood={dadMood} />
          <TinyDad which={3} position={[-0.17, Math.abs(Math.sin(dadBounce + 2.2)) * 0.07, -0.17]} scale={0.72} mood={dadMood} />
          <TinyDad which={4} position={[0.17, Math.abs(Math.sin(dadBounce + 3.3)) * 0.07, -0.17]} scale={0.72} mood={dadMood} />
        </group>
      ) : null}
    </group>
  </group>
);

/** Woven swamp-reed basket cradle where baby hero was found. */
export const ReedBasket: React.FC<{ position?: Vec3; rotationY?: number; withBaby?: boolean; reach?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  withBaby = true,
  reach = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" tint="#9e874c" position={[0, 0.06, 0]} size={[0.62, 0.12, 0.78]} />
    <Vox kind="planks" tint="#8d7740" position={[-0.29, 0.2, 0]} size={[0.07, 0.24, 0.78]} />
    <Vox kind="planks" tint="#8d7740" position={[0.29, 0.2, 0]} size={[0.07, 0.24, 0.78]} />
    <Vox kind="planks" tint="#8d7740" position={[0, 0.2, 0.36]} size={[0.62, 0.24, 0.07]} />
    <Vox kind="planks" tint="#8d7740" position={[0, 0.2, -0.36]} size={[0.62, 0.24, 0.07]} />
    <Vox kind="wool" tint="#f3ebd3" position={[0, 0.13, 0]} size={[0.48, 0.06, 0.62]} />
    {withBaby ? <BabyHero position={[0, 0.12, 0]} reach={reach} /> : null}
  </group>
);

/** Ankle-high wooden dinner table (`0.34 m` tall) set with steaming bowls of green slime-mushroom soup. */
export const LowSoupTable: React.FC<{ position?: Vec3; rotationY?: number; t?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  t = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.31, 0]} size={[1.55, 0.07, 0.95]} />
    {[
      [-0.64, -0.36],
      [0.64, -0.36],
      [-0.64, 0.36],
      [0.64, 0.36],
    ].map(([x, z], i) => (
      <Vox key={i} kind="darkPlanks" position={[x, 0.15, z]} size={[0.1, 0.3, 0.1]} />
    ))}
    <Vox kind="cobble" tint="#44484d" position={[0, 0.44, 0]} size={[0.34, 0.2, 0.34]} />
    <Block position={[0, 0.53, 0]} size={[0.28, 0.04, 0.28]} color="#6ee048" emissive="#48b82e" emissiveIntensity={0.25} />
    {(
      [
        [0, 0.32],
        [-0.52, -0.22],
        [-0.2, -0.28],
        [0.2, -0.28],
        [0.52, -0.22],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <group key={`b${i}`} position={[x, 0.36, z]}>
        <Vox kind="planks" tint="#8a5a36" position={[0, 0.03, 0]} size={[0.2, 0.07, 0.2]} />
        <Block position={[0, 0.065, 0]} size={[0.15, 0.025, 0.15]} color="#72e44c" emissive="#4cb830" emissiveIntensity={0.2} />
        <Block
          position={[Math.sin(t * 2.4 + i) * 0.02, 0.15 + ((t * 0.22 + i * 0.2) % 0.16), 0]}
          size={[0.045, 0.045, 0.045]}
          color="#e9f7e1"
        />
      </group>
    ))}
  </group>
);

/** Cottage interior wooden door (`1.65 m` high) with brass handle at `y = 0.92 m` so stacked tiny dads reach it! */
export const TinyDoorway: React.FC<{ position?: Vec3; rotationY?: number; open?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  open = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="log" position={[-0.58, 0.9, 0]} size={[0.16, 1.8, 0.18]} />
    <Vox kind="log" position={[0.58, 0.9, 0]} size={[0.16, 1.8, 0.18]} />
    <Vox kind="log" position={[0, 1.74, 0]} size={[1.34, 0.16, 0.22]} />
    <group position={[-0.48, 0, 0.04]} rotation={[0, -open * 1.1, 0]}>
      <Vox kind="darkPlanks" position={[0.48, 0.84, 0]} size={[0.96, 1.66, 0.08]} />
      <Block position={[0.82, 0.98, 0.06]} size={[0.09, 0.09, 0.05]} color="#f0c84b" />
    </group>
  </group>
);

/** Porch terracotta cactus pot for the funny excuse shot (`2.cactus`). */
export const PottedCactus: React.FC<{ position?: Vec3; bitten?: number }> = ({ position = [0, 0, 0], bitten = 0 }) => (
  <group position={position}>
    <Vox kind="cobble" tint="#b35c3e" position={[0, 0.18, 0]} size={[0.46, 0.36, 0.46]} />
    <Vox kind="dirt" position={[0, 0.35, 0]} size={[0.38, 0.06, 0.38]} />
    <Vox kind="leaves" tint="#358c32" position={[0, 0.74, 0]} size={[0.28, 0.78, 0.28]} />
    <Block position={[-0.19, 0.76, 0]} size={[0.12, 0.3, 0.16]} color="#3e9d3a" />
    {bitten > 0.05 ? (
      <>
        <Block position={[0.12, 0.66, 0.06]} size={[0.11 * bitten, 0.14 * bitten, 0.14]} color="#1f4d1c" />
        <Block position={[0.16, 0.56 - bitten * 0.05, 0.08]} size={[0.06, 0.08, 0.06]} color="#7dff56" />
      </>
    ) : (
      <Block position={[0.19, 0.7, 0]} size={[0.12, 0.26, 0.16]} color="#3e9d3a" />
    )}
  </group>
);

/** Folded/carried torn blue baby coat (`4.barrow`). */
export const TornBabyCoat: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Vox kind="wool" tint="#3b78bd" position={[0, 0.04, 0]} size={[0.44, 0.08, 0.5]} />
    <Vox kind="wool" tint="#3b78bd" position={[-0.26, 0.04, -0.05]} rotation={[0, 0.25, 0]} size={[0.16, 0.07, 0.3]} />
    <Vox kind="wool" tint="#3b78bd" position={[0.26, 0.04, -0.07]} rotation={[0, -0.32, 0]} size={[0.15, 0.07, 0.24]} />
    <Block position={[0.04, 0.085, 0.05]} size={[0.24, 0.02, 0.05]} color="#221a16" />
    <Block position={[0.11, 0.086, 0.14]} size={[0.09, 0.02, 0.09]} color="#68d846" />
  </group>
);

/** Glowing bouncy Minecraft slimeball (`0.22 m`). */
export const SlimeballProp: React.FC<{ position?: Vec3; scale?: number; squash?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
  squash = 0,
}) => (
  <group position={position} scale={[scale * (1 + squash * 0.24), scale * (1 - squash * 0.3), scale * (1 + squash * 0.24)]}>
    <Block position={[0, 0.11, 0]} size={[0.22, 0.22, 0.22]} color="#78ef52" emissive="#4ec932" emissiveIntensity={0.35} />
    <Block position={[0, 0.11, 0]} size={[0.13, 0.13, 0.13]} color="#3fa527" />
  </group>
);

/** Warning sign at the Swamp Gate (`NO SWAMP - GOLEM PATROL`). */
export const SwampSign: React.FC<{ position?: Vec3; rotationY?: number }> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="log" position={[0, 0.65, 0]} size={[0.14, 1.3, 0.14]} />
    <Vox kind="planks" tint="#9e7444" position={[0, 1.22, 0.09]} size={[1.05, 0.62, 0.08]} />
    <Block position={[0, 1.22, 0.14]} rotation={[0, 0, 0.55]} size={[0.72, 0.08, 0.02]} color="#c92b24" />
    <Block position={[0, 1.22, 0.14]} rotation={[0, 0, -0.55]} size={[0.72, 0.08, 0.02]} color="#c92b24" />
  </group>
);

/** Deep iron-golem fist craters smashed into stone (`5.craters`). */
export const FistCraters: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {[
      [0, 0],
      [0.62, -0.34],
    ].map(([x, z], i) => (
      <group key={i} position={[x, 0, z]}>
        <Block position={[0, 0.015, 0]} size={[0.46, 0.03, 0.46]} color="#1d1f21" />
        <Vox kind="cobble" tint="#d8d8d0" position={[-0.24, 0.05, 0.12]} rotation={[0.2, 0.4, 0]} size={[0.16, 0.09, 0.16]} />
        <Vox kind="cobble" tint="#e2e2da" position={[0.22, 0.05, -0.14]} rotation={[-0.25, 0.2, 0]} size={[0.16, 0.08, 0.14]} />
      </group>
    ))}
  </group>
);

/** Braided swamp-vine rope (`6.rope`). */
export const VineRope: React.FC<{ top: Vec3; length: number; sway?: number }> = ({ top, length, sway = 0 }) => {
  const segs = 7;
  const step = length / segs;
  return (
    <group position={top}>
      {Array.from({ length: segs }, (_, i) => (
        <Vox
          key={i}
          kind="leaves"
          tint={i % 2 === 0 ? "#3f8d34" : "#52a944"}
          position={[Math.sin(i * 0.55 + sway) * 0.05 * (i + 1) * 0.25, -(i + 0.5) * step, 0]}
          size={[0.085, step + 0.03, 0.085]}
        />
      ))}
    </group>
  );
};

/** Authentic 1m x 1m translucent Minecraft Slime Block (`6.block`, `6.boing`, `7.roof`). */
export const SlimeBlockProp: React.FC<{
  position?: Vec3;
  scale?: number;
  squash?: number;
  glow?: number;
}> = ({ position = [0, 0, 0], scale = 1, squash = 0, glow = 0.6 }) => {
  const sx = scale * (1 + squash * 0.34);
  const sy = Math.max(0.28, scale * (1 - squash * 0.42));
  return (
    <group position={position} scale={[sx, sy, sx]}>
      <Block position={[0, 0.5, 0]} size={[0.62, 0.62, 0.62]} color="#4ab930" emissive="#3da826" emissiveIntensity={0.35 * glow} />
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.02, 1.02, 1.02]} />
        <meshStandardMaterial
          color="#7aff54"
          emissive="#58e038"
          emissiveIntensity={0.4 * glow}
          transparent
          opacity={0.65}
          roughness={0.18}
        />
      </mesh>
      <Block position={[0, 1.01, 0]} size={[0.94, 0.025, 0.94]} color="#b4ff96" />
    </group>
  );
};

/** Schoolyard seesaw plank for Roof Jump Day (`3.plank`, `3.inch`). */
export const SeesawPlank: React.FC<{ position?: Vec3; rotationY?: number; tilt?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  tilt = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="log" position={[0, 0.16, 0]} size={[0.76, 0.32, 0.34]} />
    <group position={[0, 0.34, 0]} rotation={[tilt, 0, 0]}>
      <Vox kind="planks" tint="#c2935a" size={[0.58, 0.08, 2.4]} />
    </group>
  </group>
);

/** Twin white-rimmed iron-golem fist craters (`2.porch`, `4.slam`, `5.stare`, `5.craters`). */
export const TwinWhiteCraters: React.FC<{ position?: Vec3; rotationY?: number; fresh?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  fresh = 1,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={Math.max(0.01, fresh)}>
    {[-0.42, 0.42].map((x) => (
      <group key={x} position={[x, 0, 0]}>
        <Block position={[0, 0.02, 0]} size={[0.5, 0.04, 0.5]} color="#e6e6de" />
        <Block position={[0, 0.044, 0]} size={[0.3, 0.028, 0.3]} color="#2c2f33" />
        <Block position={[-0.2, 0.065, 0.16]} size={[0.12, 0.075, 0.12]} color="#f2f2ea" />
        <Block position={[0.18, 0.06, -0.16]} size={[0.11, 0.065, 0.11]} color="#dcdcd4" />
      </group>
    ))}
  </group>
);

/** Wooden bridge crossbar + knock-out locking pin (`2.bridge`, `4.sunset`, `6.pin`). */
export const BridgePinPost: React.FC<{
  position?: Vec3;
  barLift?: number;
  pinOut?: number;
}> = ({ position = [0, 0, 0], barLift = 0, pinOut = 0 }) => (
  <group position={position}>
    <Vox kind="log" position={[-1.95, 0.65, 0]} size={[0.28, 1.3, 0.28]} />
    <Vox kind="log" position={[1.95, 0.65, 0]} size={[0.28, 1.3, 0.28]} />
    <group position={[-1.95, 0.95, 0.16]} rotation={[0, 0, barLift * 1.1]}>
      <Vox kind="darkPlanks" position={[1.95, 0, 0]} size={[4.2, 0.18, 0.13]} />
    </group>
    <Vox
      kind="planks"
      tint="#d4a259"
      position={[1.95 + pinOut * 0.95, 0.95 - pinOut * 0.45, 0.22]}
      rotation={[0, 0, -pinOut * 1.4]}
      size={[0.38, 0.09, 0.09]}
    />
  </group>
);

/** Torn blue baby coat hanging on a wall peg (`2.coat`, `5.list`). */
export const HangingBabyCoat: React.FC<{ position?: Vec3; rotationY?: number; sway?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  sway = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, 0.3, 0.03]} size={[0.1, 0.1, 0.12]} />
    <group position={[0, 0.28, 0.08]} rotation={[0, 0, sway]}>
      {/* Collar, chest, two sleeves, buttons, tear & dried slime fleck */}
      <Vox kind="wool" tint="#f3ebd3" position={[0, -0.02, 0.01]} size={[0.26, 0.08, 0.1]} />
      <Vox kind="wool" tint="#3b78bd" position={[0, -0.26, 0]} size={[0.42, 0.46, 0.09]} />
      <Vox kind="wool" tint="#3b78bd" position={[-0.27, -0.18, 0]} rotation={[0, 0, 0.32]} size={[0.14, 0.34, 0.08]} />
      <Vox kind="wool" tint="#3b78bd" position={[0.27, -0.16, 0]} rotation={[0, 0, -0.38]} size={[0.14, 0.26, 0.08]} />
      <Block position={[0, -0.16, 0.05]} size={[0.04, 0.04, 0.02]} color="#f0c84b" />
      <Block position={[0, -0.27, 0.05]} size={[0.04, 0.04, 0.02]} color="#f0c84b" />
      <Block position={[0.06, -0.4, 0.05]} size={[0.22, 0.045, 0.02]} color="#1f1712" />
      <Block position={[-0.1, -0.32, 0.05]} size={[0.07, 0.07, 0.02]} color="#68d846" />
    </group>
  </group>
);

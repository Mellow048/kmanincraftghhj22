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

/** Our human kid hero: warm amber-orange hoodie so he pops against lime slimes, cobble, night fog & deep water. */
export const Hero: React.FC<MinecraftAvatarProps> = ({ scale = KID, ...props }) => (
  <MinecraftAvatar
    scale={scale}
    skin="#f1c29b"
    hair="#4a2e1b"
    outfit="hoodie"
    colors={{ torso: "#f07c2e", arms: "#f07c2e", legs: "#314c6e" }}
    shoes="#f4f2ec"
    face="smile"
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
    {/* Warm patched blanket swaddle */}
    <Vox kind="wool" tint="#e8833a" position={[0, 0.14, 0]} size={[0.32, 0.24, 0.36]} />
    <Vox kind="wool" tint="#5da844" position={[0, 0.15, 0.04]} size={[0.34, 0.1, 0.22]} />
    <MinecraftAvatar
      position={[0, 0.02, 0.02]}
      scale={0.42}
      skin="#f1c29b"
      hair="#4a2e1b"
      outfit="gown"
      colors={{ torso: "#f07c2e", arms: "#f07c2e", legs: "#e8833a" }}
      face={cry ? "crying" : "wow"}
      pose={{
        ...getPose("sit", 0),
        armR: [-0.9 - reach * 0.7, 0, 0.2],
        armL: [-0.85 - reach * 0.7, 0, -0.2],
      }}
    />
  </group>
);

export type DadId = 1 | 2 | 3 | 4;

const DAD_STYLE: Record<
  DadId,
  { color: string; hat?: "straw" | "bow"; scarf?: string; tie?: boolean; specs?: boolean; phase: number }
> = {
  1: { color: "#6fd84a", hat: "straw", phase: 0.2 },
  2: { color: "#63cc42", specs: true, phase: 1.4 },
  3: { color: "#79df54", scarf: "#2f74d0", tie: true, phase: 2.6 },
  4: { color: "#5bc43c", hat: "bow", scarf: "#f2c138", phase: 3.7 },
};

/** One of our 4 distinct tiny slime dads (`size = 1` -> 0.5m cube). */
export const TinyDad: React.FC<
  Omit<MonsterProps, "hat" | "scarf"> & {
    which: DadId;
    squash?: number;
    hop?: number;
  }
> = ({ which, position = [0, 0, 0], rotationY = 0, scale = 1, squash = 0, hop = 0, mood = "happy", ...rest }) => {
  const st = DAD_STYLE[which];
  const sy = 1 - squash * 0.32;
  const topY = 0.5 * sy;
  return (
    <group position={[position[0], position[1] + Math.max(0, hop), position[2]]} rotation={[0, rotationY, 0]} scale={scale}>
      <Slime
        size={1}
        color={st.color}
        hat={st.hat}
        scarf={st.scarf}
        phase={st.phase}
        squash={squash}
        mood={mood}
        {...rest}
      />
      {st.specs ? (
        <group position={[0, topY * 0.62, 0.255 * (1 + squash * 0.22)]}>
          <Block position={[-0.085, 0, 0]} size={[0.09, 0.065, 0.02]} color="#2b2118" />
          <Block position={[0.085, 0, 0]} size={[0.09, 0.065, 0.02]} color="#2b2118" />
          <Block position={[0, 0.01, 0]} size={[0.08, 0.02, 0.02]} color="#2b2118" />
        </group>
      ) : null}
      {st.tie ? (
        <group position={[0.02, topY * 0.24, 0.26 * (1 + squash * 0.22)]} rotation={[0, 0, 0.16]}>
          <Block position={[0, 0, 0]} size={[0.065, 0.14, 0.025]} color="#2563eb" />
          <Block position={[0, 0.06, 0.005]} size={[0.085, 0.045, 0.025]} color="#1d4ed8" />
        </group>
      ) : null}
    </group>
  );
};

/** All 4 tiny dads stacked in a wobbly vertical tower (~2.0m tall) to reach counters or pat the kid's head! */
export const DadStack: React.FC<{
  position?: Vec3;
  rotationY?: number;
  sway?: number;
  squash?: number;
  mood?: Mood;
  topLean?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, sway = 0, squash = 0, mood = "happy", topLean = 0 }) => {
  const step = 0.48 * (1 - squash * 0.22);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <TinyDad which={1} position={[0, 0, 0]} squash={squash * 1.15} mood={mood} />
      <TinyDad which={2} position={[sway * 0.06, step, 0]} squash={squash} mood={mood} />
      <TinyDad which={3} position={[sway * 0.13, step * 2, 0.02]} squash={squash * 0.9} mood={mood} />
      <TinyDad
        which={4}
        position={[sway * 0.2, step * 3, 0.05 + topLean * 0.14]}
        squash={squash * 0.85}
        mood={mood}
        nod={topLean * 0.45}
      />
    </group>
  );
};

/** Medium 2-block slime dad (two of these split into our 4 tiny dads during the golem attack). */
export const BigSlimeDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  which?: 1 | 2;
  squash?: number;
  mood?: Mood;
}> = ({ position = [0, 0, 0], rotationY = 0, which = 1, squash = 0, mood = "scared" }) => (
  <Slime
    position={position}
    rotationY={rotationY}
    size={2}
    color={which === 1 ? "#69d446" : "#5cc63d"}
    hat={which === 1 ? "straw" : undefined}
    scarf={which === 1 ? "#3b7dd8" : "#d94e4e"}
    squash={squash}
    mood={mood}
  />
);

/** Original 2-block big slime dad (`size = 3.8` -> 1.9m cube) before he ever split! */
export const OriginalBigDad: React.FC<{
  position?: Vec3;
  rotationY?: number;
  squash?: number;
  mood?: Mood;
  nod?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, squash = 0, mood = "happy", nod = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Slime size={3.8} color="#66d244" hat="straw" scarf="#2f74d0" squash={squash} mood={mood} nod={nod} />
  </group>
);

/** Neighbour kids' huge 2-block slime dads (`size = 3.6`). */
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
      size={3.6}
      color={colors[variant]}
      hat={variant === 1 ? "straw" : undefined}
      scarf={scarves[variant]}
      squash={squash}
      mood={mood}
    />
  );
};

/** Wise elderly Grandpa Slime (`size = 2.6`) with white bushy brows/moustache (`2.splits`, `2.ball`). */
export const GrandpaSlime: React.FC<{
  position?: Vec3;
  rotationY?: number;
  squash?: number;
  mood?: Mood;
  nod?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, squash = 0, mood = "calm", nod = 0 }) => {
  const sy = 1 - squash * 0.3;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Slime size={2.6} color="#58b942" scarf="#7a5a38" squash={squash} mood={mood} nod={nod} />
      {/* White grandfather brows & moustache */}
      <Block position={[-0.24, 0.92 * sy, 0.66]} size={[0.24, 0.08, 0.04]} color="#f0efe9" />
      <Block position={[0.24, 0.92 * sy, 0.66]} size={[0.24, 0.08, 0.04]} color="#f0efe9" />
      <Block position={[0, 0.44 * sy, 0.67]} size={[0.48, 0.1, 0.05]} color="#f0efe9" />
    </group>
  );
};

/** Damaged, vine-choked rogue Iron Golem lurking at the swamp bridge (`4.golem`..`6.pin`). */
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
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1.06, ...rest }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <IronGolem {...rest} />
    {/* Dark swamp moss, cracked iron scar across chest, and glowing red angry eye flare */}
    <Block position={[0.24, 1.72, 0.36]} size={[0.34, 0.08, 0.03]} color="#2b2623" />
    <Block position={[-0.42, 1.48, 0.36]} size={[0.18, 0.44, 0.04]} color="#2f6127" />
    <Block position={[0.46, 1.32, 0.36]} size={[0.16, 0.52, 0.04]} color="#295422" />
  </group>
);

// ----------------------------------------------------------------------------- Custom Story Props

/** Wooden Minecraft wheelbarrow with stained slime-green tray and optional 4 tiny dads riding inside! */
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
      {/* Front wooden wheel */}
      <group position={[0, 0.24, 0.62]} rotation={[wheelSpin, 0, 0]}>
        <Vox kind="darkPlanks" size={[0.14, 0.46, 0.46]} />
        <Block size={[0.16, 0.14, 0.14]} color="#6e7075" />
      </group>
      {/* Two long oak handles */}
      {[-0.28, 0.28].map((x) => (
        <Vox key={x} kind="log" position={[x, 0.36, -0.1]} rotation={[0.12, 0, 0]} size={[0.09, 0.09, 1.45]} />
      ))}
      {/* Rear resting legs */}
      {[-0.26, 0.26].map((x) => (
        <Vox key={`l${x}`} kind="darkPlanks" position={[x, 0.16, -0.42]} size={[0.08, 0.32, 0.08]} />
      ))}
      {/* Wooden tray */}
      <Vox kind="planks" position={[0, 0.42, 0.08]} size={[0.76, 0.08, 0.96]} />
      <Vox kind="planks" position={[-0.36, 0.58, 0.08]} size={[0.08, 0.28, 0.96]} />
      <Vox kind="planks" position={[0.36, 0.58, 0.08]} size={[0.08, 0.28, 0.96]} />
      <Vox kind="planks" position={[0, 0.6, 0.52]} rotation={[-0.22, 0, 0]} size={[0.76, 0.32, 0.08]} />
      <Vox kind="planks" position={[0, 0.58, -0.36]} size={[0.76, 0.28, 0.08]} />
      {/* Dried green slime stains inside & along the rim! */}
      <Block position={[0.06, 0.465, 0.1]} size={[0.54, 0.018, 0.68]} color="#62cf40" />
      <Block position={[-0.39, 0.62, 0.18]} size={[0.03, 0.14, 0.32]} color="#68d846" />
      <Block position={[0.39, 0.59, -0.05]} size={[0.03, 0.12, 0.26]} color="#5ac23a" />

      {withSlimeBlock ? <SlimeBlockProp position={[0, 0.46, 0.08]} scale={0.72} /> : null}

      {covered ? (
        <group
          position={[sheetFly * 1.1, 0.86 + sheetFly * 1.35, 0.08 - sheetFly * 0.9]}
          rotation={[sheetFly * 0.8, sheetFly * 0.5, sheetFly * 1.1]}
        >
          <Vox kind="wool" tint="#e9e2cf" size={[0.88, 0.18, 1.04]} />
        </group>
      ) : null}

      {withDads ? (
        <group position={[0, 0.46, 0.08]}>
          <TinyDad which={1} position={[-0.16, Math.abs(Math.sin(dadBounce)) * 0.08, 0.18]} scale={0.62} mood={dadMood} />
          <TinyDad which={2} position={[0.16, Math.abs(Math.sin(dadBounce + 1.1)) * 0.08, 0.18]} scale={0.62} mood={dadMood} />
          <TinyDad which={3} position={[-0.16, Math.abs(Math.sin(dadBounce + 2.2)) * 0.08, -0.16]} scale={0.62} mood={dadMood} />
          <TinyDad which={4} position={[0.16, Math.abs(Math.sin(dadBounce + 3.3)) * 0.08, -0.16]} scale={0.62} mood={dadMood} />
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

/** Ankle-high wooden dinner table (`0.34m` tall!) set with 5 steaming bowls of green slime-mushroom soup. */
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
    {/* Big steaming central pot + 5 soup bowls */}
    <Vox kind="cobble" tint="#44484d" position={[0, 0.44, 0]} size={[0.34, 0.2, 0.34]} />
    <Block position={[0, 0.53, 0]} size={[0.28, 0.04, 0.28]} color="#6ee048" emissive="#48b82e" emissiveIntensity={0.35} />
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
        <Block
          position={[0, 0.065, 0]}
          size={[0.15, 0.025, 0.15]}
          color="#72e44c"
          emissive="#4cb830"
          emissiveIntensity={0.25}
        />
        <Block
          position={[Math.sin(t * 2.4 + i) * 0.02, 0.16 + ((t * 0.25 + i * 0.2) % 0.18), 0]}
          size={[0.05, 0.05, 0.05]}
          color="#e9f7e1"
        />
      </group>
    ))}
  </group>
);

/** Knee-high mini slime door (`0.72m` high!) next to a low lintel where our growing human kid bumps his head! */
export const TinyDoorway: React.FC<{ position?: Vec3; rotationY?: number; open?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  open = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Low wooden doorframe */}
    <Vox kind="log" position={[-0.62, 0.85, 0]} size={[0.16, 1.7, 0.2]} />
    <Vox kind="log" position={[0.62, 0.85, 0]} size={[0.16, 1.7, 0.2]} />
    <Vox kind="log" position={[0, 1.62, 0]} size={[1.42, 0.18, 0.24]} />
    {/* Knee-high slime-flap mini door */}
    <group position={[-0.5, 0, 0.04]} rotation={[0, -open * 1.35, 0]}>
      <Vox kind="darkPlanks" position={[0.26, 0.36, 0]} size={[0.52, 0.72, 0.09]} />
      <Block position={[0.42, 0.38, 0.06]} size={[0.06, 0.06, 0.04]} color="#72e04e" />
    </group>
    {/* Slime family emblem above the low lintel */}
    <Block position={[0, 1.92, 0.06]} size={[0.34, 0.34, 0.06]} color="#68d644" />
    <Block position={[-0.08, 1.96, 0.1]} size={[0.06, 0.06, 0.02]} color="#1b3016" />
    <Block position={[0.08, 1.96, 0.1]} size={[0.06, 0.06, 0.02]} color="#1b3016" />
  </group>
);

/** Porch terracotta cactus pot — with optional fresh bite mark & glistening green slime drop! */
export const PottedCactus: React.FC<{ position?: Vec3; bitten?: number }> = ({ position = [0, 0, 0], bitten = 0 }) => (
  <group position={position}>
    <Vox kind="cobble" tint="#b35c3e" position={[0, 0.18, 0]} size={[0.46, 0.36, 0.46]} />
    <Vox kind="dirt" position={[0, 0.35, 0]} size={[0.38, 0.06, 0.38]} />
    <Vox kind="leaves" tint="#358c32" position={[0, 0.76, 0]} size={[0.3, 0.82, 0.3]} />
    <Block position={[-0.2, 0.78, 0]} size={[0.12, 0.32, 0.18]} color="#3e9d3a" />
    {bitten > 0.05 ? (
      <>
        {/* Bite notch missing out of side + bright slime drop */}
        <Block position={[0.13, 0.66, 0.06]} size={[0.12 * bitten, 0.16 * bitten, 0.16]} color="#1f4d1c" />
        <Block
          position={[0.17, 0.56 - bitten * 0.05, 0.08]}
          size={[0.07, 0.09, 0.07]}
          color="#7dff56"
          emissive="#58d638"
          emissiveIntensity={0.45}
        />
      </>
    ) : (
      <Block position={[0.2, 0.72, 0]} size={[0.12, 0.28, 0.18]} color="#3e9d3a" />
    )}
  </group>
);

/** Tiny torn orange-and-wool baby coat with iron claw tears & swamp moss from the chest. */
export const TornBabyCoat: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Vox kind="wool" tint="#e8792e" position={[0, 0.04, 0]} size={[0.46, 0.08, 0.54]} />
    <Vox kind="wool" tint="#e8792e" position={[-0.28, 0.04, -0.06]} rotation={[0, 0.25, 0]} size={[0.18, 0.07, 0.34]} />
    <Vox kind="wool" tint="#e8792e" position={[0.28, 0.04, -0.08]} rotation={[0, -0.32, 0]} size={[0.16, 0.07, 0.26]} />
    {/* Jagged dark tear marks & dried green slime spot */}
    <Block position={[0.04, 0.085, 0.05]} size={[0.26, 0.02, 0.05]} color="#2a1b14" />
    <Block position={[-0.02, 0.085, -0.06]} size={[0.22, 0.02, 0.04]} color="#2a1b14" />
    <Block position={[0.12, 0.086, 0.16]} size={[0.11, 0.02, 0.11]} color="#68d846" />
  </group>
);

/** Glowing bouncy Minecraft slimeball. */
export const SlimeballProp: React.FC<{ position?: Vec3; scale?: number; squash?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
  squash = 0,
}) => (
  <group position={position} scale={[scale * (1 + squash * 0.24), scale * (1 - squash * 0.3), scale * (1 + squash * 0.24)]}>
    <Block position={[0, 0.11, 0]} size={[0.22, 0.22, 0.22]} color="#7dff58" emissive="#4ec932" emissiveIntensity={0.45} />
    <Block position={[0, 0.11, 0]} size={[0.13, 0.13, 0.13]} color="#3fa527" />
  </group>
);

/** Upright schoolyard height-measuring plank with tick notches and sliding wooden bar! */
export const MeasuringPlank: React.FC<{ position?: Vec3; rotationY?: number; markerY?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  markerY = 1.24,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" tint="#b98b56" position={[0, 0.95, 0]} size={[0.32, 1.9, 0.08]} />
    {[0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6].map((y, i) => (
      <Block
        key={y}
        position={[0.05, y, 0.046]}
        size={[i % 2 === 0 ? 0.16 : 0.1, 0.022, 0.015]}
        color={y === 0.6 ? "#5ec93d" : "#3a2616"}
      />
    ))}
    {/* Sliding horizontal measuring paddle */}
    <Vox kind="darkPlanks" position={[0.16, markerY, 0.08]} size={[0.42, 0.055, 0.14]} />
  </group>
);

/** Warning sign at the Swamp Gate (`NO SWAMP - GOLEM PATROL`). */
export const SwampSign: React.FC<{ position?: Vec3; rotationY?: number }> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="log" position={[0, 0.65, 0]} size={[0.14, 1.3, 0.14]} />
    <Vox kind="planks" tint="#9e7444" position={[0, 1.22, 0.09]} size={[1.05, 0.62, 0.08]} />
    {/* Red forbidden slash */}
    <Block position={[0, 1.22, 0.14]} rotation={[0, 0, 0.55]} size={[0.72, 0.08, 0.02]} color="#c92b24" />
    <Block position={[0, 1.22, 0.14]} rotation={[0, 0, -0.55]} size={[0.72, 0.08, 0.02]} color="#c92b24" />
  </group>
);

/** Deep iron-golem fist craters smashed into the stone bridge deck (`5.craters`). */
export const FistCraters: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {[
      [0, 0],
      [0.62, -0.34],
      [-0.48, 0.38],
    ].map(([x, z], i) => (
      <group key={i} position={[x, 0, z]}>
        <Block position={[0, 0.015, 0]} size={[0.48, 0.03, 0.48]} color="#1d1f21" />
        <Vox kind="cobble" tint="#5e6266" position={[-0.26, 0.06, 0.14]} rotation={[0.2, 0.4, 0]} size={[0.16, 0.1, 0.18]} />
        <Vox kind="cobble" tint="#6a6e73" position={[0.24, 0.05, -0.16]} rotation={[-0.25, 0.2, 0]} size={[0.18, 0.09, 0.15]} />
        <Block position={[0.04, 0.032, 0.02]} size={[0.18, 0.015, 0.18]} color="#5ac83c" />
      </group>
    ))}
  </group>
);

/** Braided swamp-vine rope tossed over the broken bridge parapet (`6.rope`, `6.three`). */
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

/** Authentic 1m x 1m translucent Minecraft Slime Block formed when all 4 tiny dads fuse underwater! */
export const SlimeBlockProp: React.FC<{
  position?: Vec3;
  scale?: number;
  squash?: number;
  glow?: number;
}> = ({ position = [0, 0, 0], scale = 1, squash = 0, glow = 0.7 }) => {
  const sx = scale * (1 + squash * 0.34);
  const sy = Math.max(0.28, scale * (1 - squash * 0.42));
  return (
    <group position={position} scale={[sx, sy, sx]}>
      {/* Dense inner slime core */}
      <Block
        position={[0, 0.5, 0]}
        size={[0.62, 0.62, 0.62]}
        color="#4ab930"
        emissive="#3da826"
        emissiveIntensity={0.45 * glow}
      />
      {/* Translucent outer jelly shell */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.04, 1.04, 1.04]} />
        <meshStandardMaterial
          color="#7aff54"
          emissive="#58e038"
          emissiveIntensity={0.55 * glow}
          transparent
          opacity={0.68}
          roughness={0.18}
        />
      </mesh>
      {/* Crisp bright voxel rim highlights */}
      <Block position={[0, 1.02, 0]} size={[0.96, 0.03, 0.96]} color="#b4ff96" emissive="#8cff68" emissiveIntensity={0.5 * glow} />
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
    {[-0.36, 0.36].map((x) => (
      <group key={x} position={[x, 0, 0]}>
        <Block position={[0, 0.02, 0]} size={[0.42, 0.04, 0.42]} color="#dadad4" />
        <Block position={[0, 0.042, 0]} size={[0.26, 0.025, 0.26]} color="#3a3d40" />
        <Block position={[-0.18, 0.06, 0.14]} size={[0.11, 0.07, 0.11]} color="#e8e8e2" />
        <Block position={[0.16, 0.055, -0.15]} size={[0.1, 0.06, 0.1]} color="#d6d7d0" />
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
    <Vox kind="log" position={[-1.95, 0.65, 0]} size={[0.3, 1.3, 0.3]} />
    <Vox kind="log" position={[1.95, 0.65, 0]} size={[0.3, 1.3, 0.3]} />
    {/* Heavy wooden crossbar */}
    <group position={[-1.95, 0.95, 0.16]} rotation={[0, 0, barLift * 1.1]}>
      <Vox kind="darkPlanks" position={[1.95, 0, 0]} size={[4.2, 0.2, 0.14]} />
    </group>
    {/* Knock-out oak locking pin */}
    <Vox
      kind="planks"
      tint="#d4a259"
      position={[1.95 + pinOut * 0.95, 0.95 - pinOut * 0.45, 0.22]}
      rotation={[0, 0, -pinOut * 1.4]}
      size={[0.38, 0.09, 0.09]}
    />
  </group>
);

/** Torn baby coat hanging on a wall peg beside the front door (`2.coat`, `5.list`). */
export const HangingBabyCoat: React.FC<{ position?: Vec3; rotationY?: number; sway?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  sway = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, 0.28, 0.03]} size={[0.1, 0.1, 0.12]} />
    <group position={[0, 0.26, 0.08]} rotation={[0, 0, sway]}>
      <Vox kind="wool" tint="#3b78bd" position={[0, -0.22, 0]} size={[0.42, 0.48, 0.09]} />
      <Vox kind="wool" tint="#3b78bd" position={[-0.25, -0.16, 0]} rotation={[0, 0, 0.28]} size={[0.14, 0.34, 0.08]} />
      <Vox kind="wool" tint="#3b78bd" position={[0.25, -0.14, 0]} rotation={[0, 0, -0.35]} size={[0.14, 0.26, 0.08]} />
      {/* Jagged tear across hem & green slime stain */}
      <Block position={[0.05, -0.36, 0.05]} size={[0.24, 0.05, 0.02]} color="#221a16" />
      <Block position={[-0.08, -0.26, 0.05]} size={[0.1, 0.1, 0.02]} color="#68d846" />
    </group>
  </group>
);

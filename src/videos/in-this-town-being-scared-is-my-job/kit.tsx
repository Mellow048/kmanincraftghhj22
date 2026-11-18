import type React from "react";
import { Block, Glow, MinecraftAvatar, PixelText, Vox, getPose, useFilmTime } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { Villager, Zombie, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: three villagers who work in an iron farm in the sky, the zombie they are paid to be
 * scared of, and the player who owns the machine.
 *
 * ONE PLACE, a stone platform two hundred blocks up. Floor top is y = 0. Three glass rooms in a row along X: Gary's
 * (x −2.3), the teller's (x 0) and Barb's (x 2.3), each 1.9 m square. One block south of the middle room, on the south
 * ledge, a boat lies sideways with a zombie in it: Kevin, facing the glass. North of the rooms is the pad where the
 * iron men appear (SPAWN), and north of that a water channel that runs east to a hole with fire under it (END).
 * The south edge of the platform is z = 4.2, and there is nothing beyond it.
 *
 * `Under` is the room under the floor: a chest, and a pipe that things fall out of. Scenes draw it in the `under` zone.
 *
 * From the pack: the villager, the zombie, the iron golem, the poppy. Built here: the glass rooms, the water, the boat,
 * the name tag, the chest, iron, the boss and his bucket.
 *
 * A tall frame is narrow: at 6 m it shows about 1.4 m each side of its middle. Stage in depth, not in width.
 */

export {
  DEG, EAST, NORTH, SOUTH, WEST, ease, ramp, pop, jolt, Bits, Bubble, Puffs, SoundRings, SubscribeSign, Villager, ROBE, IronGolem, Poppy, Zombie,
  NightFill as Fill, BedBox,
} from "../../../Topics/InThisTown";
export { Block, Glow, PixelText, Torch, Vox } from "../../engine";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });
/** One hop: 0 outside, a sine arc of height `h` for `d` seconds from `at`. */
export const hop = (t: number, at: number, h = 0.3, d = 0.3) => {
  const k = (t - at) / d;
  return k <= 0 || k >= 1 ? 0 : Math.sin(k * Math.PI) * h;
};
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
/** Walking from a to b for someone who is not an avatar: where, which way, how far. */
export const go = (a: Vec3, b: Vec3, k: number): { position: Vec3; rotationY: number; walk: number } => {
  const q = Math.min(1, Math.max(0, k));
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  return { position: [a[0] + dx * q, a[1] + (b[1] - a[1]) * q, a[2] + dz * q], rotationY: Math.atan2(dx, dz), walk: Math.hypot(dx, dz) * q };
};

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** Where each of the three stands in his glass room. */
  me: [0, 0, 0.25] as Vec3,
  gary: [-2.3, 0, 0.25] as Vec3,
  barb: [2.3, 0, 0.25] as Vec3,
  /** Kevin, sitting in his boat, one block south of the teller's glass. */
  kevin: [0, 0, 2.0] as Vec3,
  /** Where the boss stands when he comes up: on the south ledge, beside the boat. Behind him is the edge. */
  boss: [1.25, 0, 3.0] as Vec3,
  /** Where an iron man pops out of the air, and the middle of the water north of it. */
  spawn: [0, 0, -3.3] as Vec3,
  water: [0, 0, -5.2] as Vec3,
  /** Where the water ends: a hole, and fire under it. */
  end: [6.6, 0, -5.2] as Vec3,
};
/** The platform: x from −5 to 8, z from −6.2 to EDGE. */
export const EDGE = 4.2;
export const CELL = { w: 1.9, h: 2.5, x: [-2.3, 0, 2.3] };

// ----------------------------------------------------------------------------- the cast

/** The teller: an orange work robe and a yellow hard hat. Nothing has ever fallen on him. */
export const Me: React.FC<VillagerProps> = (p) => (
  <Villager
    robe="#c9772b"
    phase={0.4}
    headwear={
      <>
        <Block position={[0, 0.6, 0]} size={[0.5, 0.1, 0.5]} color="#f2c230" />
        <Block position={[0, 0.69, 0]} size={[0.36, 0.1, 0.36]} color="#f7d24a" />
        <Block position={[0, 0.57, 0.3]} size={[0.5, 0.04, 0.14]} color="#e0b020" castShadow={false} />
      </>
    }
    {...p}
  />
);
/** Gary: a blue robe and a nightcap. He is asleep most of the time, and he screams in it. */
export const Gary: React.FC<VillagerProps> = (p) => (
  <Villager
    robe="#3f5f9a"
    phase={1.7}
    headwear={
      <>
        <Block position={[0, 0.6, 0]} size={[0.48, 0.1, 0.48]} color="#e9e6dc" />
        <Block position={[0.06, 0.7, -0.04]} size={[0.34, 0.12, 0.34]} color="#e9e6dc" />
        <Block position={[0.2, 0.74, -0.12]} size={[0.2, 0.1, 0.2]} color="#e9e6dc" />
        <Block position={[0.34, 0.66, -0.16]} size={[0.13, 0.13, 0.13]} color="#d9443a" />
      </>
    }
    {...p}
  />
);
/** Barb: a purple robe, grey hair in a bun, small glasses. She counts. */
export const Barb: React.FC<VillagerProps> = (p) => (
  <Villager
    robe="#7a4a8c"
    phase={2.6}
    headwear={
      <>
        <Block position={[0, 0.585, -0.02]} size={[0.48, 0.07, 0.46]} color="#c9c6c0" />
        <Block position={[0, 0.66, -0.12]} size={[0.24, 0.16, 0.24]} color="#bdb9b2" />
        <Block position={[-0.11, 0.33, 0.235]} size={[0.13, 0.1, 0.02]} color="#1a1a22" castShadow={false} />
        <Block position={[0.11, 0.33, 0.235]} size={[0.13, 0.1, 0.02]} color="#1a1a22" castShadow={false} />
        <Block position={[-0.11, 0.33, 0.24]} size={[0.09, 0.06, 0.02]} color="#cfeeff" castShadow={false} />
        <Block position={[0.11, 0.33, 0.24]} size={[0.09, 0.06, 0.02]} color="#cfeeff" castShadow={false} />
      </>
    }
    {...p}
  />
);

/** A name tag over a head. `position` is its middle. */
export const Tag: React.FC<{ position: Vec3; text?: string; scale?: number; rotationY?: number }> = ({ position, text = "KEVIN", scale = 1, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0, -0.02]} size={[0.2 + text.length * 0.2, 0.36, 0.03]} color="#2a2636" castShadow={false} />
    <PixelText text={text} position={[0, 0, 0]} height={0.22} color="#ffffff" />
  </group>
);
type Z = React.ComponentProps<typeof Zombie>;
/**
 * Kevin, in his boat. `position` is the boat; the boat lies along X and he faces `face` (default north, at the glass).
 * `out` 0–1 lifts him out of it. Everything a zombie takes (`wave`, `arms`, `nod`, `turn`, `lookAt`, `mood`) is passed on.
 */
export const Kevin: React.FC<Z & { tag?: boolean; boat?: boolean; face?: number; tagTurn?: number; tagScale?: number }> = ({ position = PLACE.kevin, tag = true, boat = true, face = Math.PI, tagTurn = 0, tagScale = 0.55, arms = 0, ...p }) => (
  <>
    {boat ? <Boat position={position} rotationY={Math.PI / 2} /> : null}
    <Zombie position={[position[0], position[1] + (boat ? -0.42 : 0), position[2]]} rotationY={face} arms={arms} scarf="#d9443a" {...p} />
    {tag ? <Tag position={[position[0], position[1] + (boat ? 1.74 : 2.16), position[2]]} rotationY={tagTurn} scale={tagScale} /> : null}
  </>
);
/** The new one: no tag, no name, a darker shirt. He does not wave. */
export const NewOne: React.FC<Z> = (p) => <Zombie shirt="#4a3f6e" legs="#2c2c3a" mood="angry" arms={1} {...p} />;

type A = Partial<MinecraftAvatarProps>;
/** The boss: a player in a red shirt. He owns the machine. What he holds is a child, in his right hand. */
export const Boss: React.FC<A> = (p) => (
  <MinecraftAvatar outfit="tee" skin="#e0b090" hair="#d9b34a" colors={{ torso: "#b8322a", arms: "#b8322a", legs: "#2c2c34" }} shoes="#3a3a3a" face="neutral" blink phase={0.9} {...p} />
);

// ----------------------------------------------------------------------------- things

/** Somebody flat on their back, head to the north. */
export const Lying: React.FC<{ position: Vec3; turn?: number; children: React.ReactNode }> = ({ position, turn = 0, children }) => (
  <group position={position} rotation={[0, turn, 0]}>
    <group rotation={[-Math.PI / 2, 0, 0]}>{children}</group>
  </group>
);
/** Shaking with fright: wrap whoever is scared. `k` 0–1. */
export const Shake: React.FC<{ t: number; k: number; children: React.ReactNode }> = ({ t, k, children }) => (
  <group position={[Math.sin(t * 41) * 0.03 * k, Math.abs(Math.sin(t * 11)) * 0.1 * k, 0]}>{children}</group>
);

/** A loaf of bread, lying along X. `position` is the middle of its underside. */
export const Loaf: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={rotation} scale={scale}>
      <Block position={[0, 0.09, 0]} size={[0.52, 0.18, 0.26]} color="#b8762a" />
      <Block position={[0, 0.185, 0]} size={[0.46, 0.03, 0.2]} color="#dba24c" castShadow={false} />
      {[-0.14, 0, 0.14].map((x) => (
        <Block key={x} position={[x, 0.2, 0]} rotation={[0, 0.5, 0]} size={[0.03, 0.02, 0.2]} color="#8a5418" castShadow={false} />
      ))}
    </group>
  );

/**
 * A boat. It points along +Z; its floor is 0.2 up. Whoever sits in it: put them at [0, 0.2 − 0.56·scale, ±0.45] of
 * the boat with `sit`. Players row boats over dry land, and so does this one.
 */
export const Boat: React.FC<{ position?: Vec3; rotationY?: number; row?: number; rock?: number; children?: React.ReactNode }> = ({ position = [0, 0, 0], rotationY = 0, row = 0, rock = 0, children }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <group rotation={[0, 0, rock]}>
      <Block position={[0, 0.14, 0]} size={[1.1, 0.12, 2.3]} color="#a37a44" />
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * 0.58, 0.36, 0]} size={[0.12, 0.44, 2.3]} color="#b48d52" />
      ))}
      <Block position={[0, 0.36, 1.2]} size={[1.28, 0.44, 0.12]} color="#b48d52" />
      <Block position={[0, 0.36, -1.2]} size={[1.28, 0.44, 0.12]} color="#b48d52" />
      {[-1, 1].map((s) => (
        <group key={`o${s}`} position={[s * 0.66, 0.56, 0.2]} rotation={[Math.sin(row * 6) * 0.7, 0, s * -0.9]}>
          <Block position={[0, -0.45, 0]} size={[0.07, 1.3, 0.07]} color="#8a6234" />
          <Block position={[0, -1.05, 0]} size={[0.07, 0.36, 0.26]} color="#8a6234" />
        </group>
      ))}
      {children}
    </group>
  </group>
);

/** A number over somebody's head: the count of a thing. */
export const Count: React.FC<{ position: Vec3; text: string; scale?: number; rotationY?: number; color?: string }> = ({ position, text, scale = 1, rotationY = 0, color = "#ffe27a" }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0, -0.03]} size={[0.26 + text.length * 0.3, 0.6, 0.04]} color="#1a1420" castShadow={false} />
    <PixelText text={text} position={[0, 0, 0]} height={0.36} color={color} />
  </group>
);

/** One iron ingot. */
export const Ingot: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.05, 0]} size={[0.3, 0.1, 0.16]} color="#d8dde2" metalness={0.4} roughness={0.4} />
    <Block position={[0, 0.105, 0]} size={[0.22, 0.02, 0.1]} color="#f4f6f8" castShadow={false} />
  </group>
);
/** A bucket. `lava`: there is no water in it. `position` is the middle of its bottom. */
export const Bucket: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; lava?: boolean }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, lava = true }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.15, 0]} size={[0.3, 0.3, 0.3]} color="#aeb6be" metalness={0.4} roughness={0.5} />
    <Block position={[0, 0.3, 0]} size={[0.34, 0.04, 0.34]} color="#8a929a" castShadow={false} />
    <Block position={[0, 0.315, 0]} size={[0.26, 0.03, 0.26]} color={lava ? "#ff7a14" : "#3f76e4"} emissive={lava ? "#ff7a14" : "#000000"} emissiveIntensity={lava ? 1.6 : 0} castShadow={false} />
    {lava ? <Glow position={[0, 0.42, 0]} size={0.9} color="#ff9a30" opacity={0.5} /> : null}
  </group>
);
/** A chest. `open` 0–1 lifts the lid; `iron` is how many ingots are in it; `flower` puts one poppy on top of them. */
export const Chest: React.FC<{ position?: Vec3; rotationY?: number; open?: number; iron?: number; flower?: boolean; scale?: number }> = ({ position = [0, 0, 0], rotationY = 0, open = 0, iron = 0, flower = false, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.3, 0]} size={[0.9, 0.6, 0.9]} color="#a06a2c" />
    <Block position={[0, 0.3, 0]} size={[0.92, 0.08, 0.92]} color="#5c3a18" castShadow={false} />
    <Block position={[0, 0.03, 0]} size={[0.92, 0.06, 0.92]} color="#5c3a18" castShadow={false} />
    {open > 0.05 ? <Block position={[0, 0.58, 0]} size={[0.8, 0.06, 0.8]} color="#2a1a0c" castShadow={false} /> : null}
    {open > 0.05 ? Array.from({ length: iron }, (_, i) => <Ingot key={i} position={[(i % 2 ? 0.17 : -0.17), 0.62 + (i >> 2) * 0.1, -0.2 + ((i >> 1) % 2) * 0.36]} rotation={[0, i * 0.5, 0]} />) : null}
    {open > 0.05 && flower ? (
      <group position={[0.05, 0.68, 0.05]} rotation={[0, 0.4, 1.3]}>
        <Block position={[0, 0.15, 0]} size={[0.04, 0.3, 0.04]} color="#3f8a35" castShadow={false} />
        <Block position={[0, 0.33, 0]} size={[0.16, 0.12, 0.16]} color="#d9443a" castShadow={false} />
      </group>
    ) : null}
    <group position={[0, 0.6, -0.45]} rotation={[-open * 1.75, 0, 0]}>
      <Block position={[0, 0.14, 0.45]} size={[0.9, 0.28, 0.9]} color="#b0782f" />
      <Block position={[0, 0.02, 0.45]} size={[0.92, 0.05, 0.92]} color="#5c3a18" castShadow={false} />
      <Block position={[0, 0.06, 0.92]} size={[0.14, 0.2, 0.06]} color="#cfd8e2" metalness={0.3} roughness={0.4} castShadow={false} />
    </group>
  </group>
);

const GLASS = "#bfe8ff";
/**
 * One glass room, 1.9 m square and 2.5 m high, on a stone floor, with a stone lid. `position` is the middle of its
 * floor. `north={false}` takes the north pane out (the iron man broke it). `crack` 0–1 draws cracks on the south pane.
 * `game` draws the noughts and crosses on the south pane: a string of nine, "x", "o" or " ".
 */
export const Cell: React.FC<{ position: Vec3; north?: boolean; crack?: number; game?: string; lit?: boolean }> = ({ position, north = true, crack = 0, game, lit = false }) => {
  const h = CELL.h;
  const r = CELL.w / 2;
  return (
    <group position={position}>
      <Vox kind="stoneBrick" position={[0, 0.03, 0]} size={[CELL.w + 0.1, 0.06, CELL.w + 0.1]} />
      <Vox kind="stone" position={[0, h + 0.1, 0]} size={[CELL.w + 0.2, 0.2, CELL.w + 0.2]} />
      {([[-r, -r], [r, -r], [-r, r], [r, r]] as Array<[number, number]>).map(([x, z], i) => (
        <Block key={i} position={[x, h / 2, z]} size={[0.09, h, 0.09]} color="#e9f4fb" castShadow={false} />
      ))}
      {/* the panes: south, the two sides, north */}
      <Block position={[0, h / 2, r]} size={[CELL.w, h, 0.03]} color={GLASS} opacity={0.16} transparent castShadow={false} />
      <Block position={[-r, h / 2, 0]} size={[0.03, h, CELL.w]} color={GLASS} opacity={0.13} transparent castShadow={false} />
      <Block position={[r, h / 2, 0]} size={[0.03, h, CELL.w]} color={GLASS} opacity={0.13} transparent castShadow={false} />
      {north ? <Block position={[0, h / 2, -r]} size={[CELL.w, h, 0.03]} color={GLASS} opacity={0.16} transparent castShadow={false} /> : null}
      {/* a glint, so the glass reads as glass */}
      <Block position={[-0.5, 1.9, r + 0.02]} rotation={[0, 0, 0.78]} size={[0.5, 0.04, 0.01]} color="#ffffff" opacity={0.7} transparent castShadow={false} />
      <Block position={[-0.36, 1.78, r + 0.02]} rotation={[0, 0, 0.78]} size={[0.26, 0.03, 0.01]} color="#ffffff" opacity={0.6} transparent castShadow={false} />
      {crack > 0.01
        ? ([[0, 1.5, 0.9, 0.5], [0.2, 1.75, 0.6, -0.9], [-0.2, 1.3, 0.7, 2.2], [0.1, 1.2, 0.5, 1.4], [-0.3, 1.8, 0.5, -0.3], [0.35, 1.4, 0.4, 0.1]] as Array<[number, number, number, number]>).map(([x, y, len, a], i) => (
            <Block key={`c${i}`} position={[x, y, r + 0.03]} rotation={[0, 0, a]} size={[len * crack, 0.035, 0.01]} color="#ffffff" castShadow={false} />
          ))
        : null}
      {game ? (
        <group position={[0.42, 1.2, r + 0.03]} scale={0.8}>
          {[-0.14, 0.14].map((d) => (
            <group key={d}>
              <Block position={[d, 0, 0]} size={[0.025, 0.84, 0.01]} color="#ffffff" castShadow={false} />
              <Block position={[0, d, 0]} size={[0.84, 0.025, 0.01]} color="#ffffff" castShadow={false} />
            </group>
          ))}
          {game.split("").map((c, i) =>
            c === " " ? null : <PixelText key={i} text={c.toUpperCase()} position={[((i % 3) - 1) * 0.28, (1 - Math.floor(i / 3)) * 0.28, 0.01]} height={0.17} color={c === "x" ? "#ffe27a" : "#8cf08c"} />,
          )}
        </group>
      ) : null}
      {lit ? <pointLight position={[0, 1.8, 0]} color="#ffe6b0" intensity={3} distance={5} decay={2} /> : null}
    </group>
  );
};

/** Water in a channel, running toward +X. `from`/`to` are its ends in X; `position` gives y and z. */
export const Water: React.FC<{ from?: number; to?: number; z?: number; width?: number }> = ({ from = -5, to = PLACE.end[0] - 0.7, z = PLACE.water[2], width = 1.3 }) => {
  const t = useFilmTime();
  const len = to - from;
  return (
    <group>
      <Block position={[(from + to) / 2, -0.12, z]} size={[len, 0.1, width]} color="#3f76e4" opacity={0.82} transparent castShadow={false} />
      {Array.from({ length: 9 }, (_, i) => {
        const x = from + ((i * 1.37 + t * 1.6) % len);
        return <Block key={i} position={[x, -0.06, z - width / 2 + 0.15 + ((i * 5) % 7) * (width - 0.3) / 7]} size={[0.5, 0.02, 0.05]} color="#bcd8ff" opacity={0.8} transparent castShadow={false} />;
      })}
    </group>
  );
};

/**
 * The whole farm: the platform, the three glass rooms, the channel and its water, and the hole at the end with the
 * fire under it. `open` takes the north panes out. `crack` and `game` go to the teller's room.
 */
export const Farm: React.FC<{ open?: boolean; crack?: number; game?: string; lit?: boolean }> = ({ open = false, crack = 0, game, lit = false }) => (
  <group>
    {/* the floor: everything south of the channel, and a strip north of it */}
    <Vox kind="stone" position={[1.5, -0.5, (EDGE + PLACE.water[2] + 0.75) / 2]} size={[13, 1, EDGE - PLACE.water[2] - 0.75]} />
    <Vox kind="stone" position={[1.5, -0.5, PLACE.water[2] - 1.1]} size={[13, 1, 0.9]} />
    <Vox kind="stone" position={[1.5, -0.75, PLACE.water[2]]} size={[13, 0.5, 1.5]} />
    {/* past the hole */}
    <Vox kind="stone" position={[PLACE.end[0] + 1.05, -0.25, PLACE.water[2]]} size={[0.7, 0.5, 1.5]} />
    {CELL.x.map((x, i) => (
      <Cell key={i} position={[x, 0, 0]} north={!open} crack={i === 1 ? crack : 0} game={i === 1 ? game : undefined} lit={lit} />
    ))}
    <Water />
    {/* the hole, and what is under it */}
    <Block position={[PLACE.end[0], -0.2, PLACE.water[2]]} size={[1.3, 0.2, 1.3]} color="#1a0c08" castShadow={false} />
    <Block position={[PLACE.end[0], -0.12, PLACE.water[2]]} size={[1.1, 0.1, 1.1]} color="#ff7a14" emissive="#ff7a14" emissiveIntensity={1.8} castShadow={false} />
    <Glow position={[PLACE.end[0], 0.3, PLACE.water[2]]} size={2.4} color="#ff8a20" opacity={0.45} />
    <pointLight position={[PLACE.end[0], 0.6, PLACE.water[2]]} color="#ff8a30" intensity={5} distance={5} decay={2} />
  </group>
);

/**
 * Under the floor: a stone ledge with a chest on it, and a pipe overhead that things fall out of. It is drawn at the
 * origin of the `under` zone. `drop` is a clock for the iron falling (seconds; under 0 for none).
 */
export const Under: React.FC<{ open?: number; iron?: number; flower?: boolean; drop?: number; drops?: number; pipe?: boolean }> = ({ open = 0, iron = 0, flower = false, drop = -1, drops = 3, pipe = true }) => (
  <group>
    <Vox kind="stone" position={[0, -0.5, 0.4]} size={[5, 1, 4.2]} />
    <Vox kind="stone" position={[0, 4.3, 0]} size={[7, 1, 6]} />
    <Vox kind="stoneBrick" position={[0, 1.9, -1.9]} size={[5, 3.8, 0.4]} />
    {/* the pipe: a hopper. `pipe={false}` takes it out for a shot from above, where it would hang in the lens */}
    {pipe ? (
      <>
        <Block position={[0, 3.45, -0.6]} size={[0.9, 0.7, 0.9]} color="#3c3c44" />
        <Block position={[0, 2.95, -0.6]} size={[0.5, 0.4, 0.5]} color="#33333a" />
        <Block position={[0, 2.65, -0.6]} size={[0.26, 0.3, 0.26]} color="#2a2a30" />
      </>
    ) : null}
    <Chest position={[0, 0, -0.6]} open={open} iron={iron} flower={flower} scale={1.15} />
    {drop >= 0
      ? Array.from({ length: drops }, (_, i) => {
          const k = (drop - i * 0.22) / 0.42;
          return k > 0 && k < 1 ? <Ingot key={i} position={[(i % 2 ? 0.08 : -0.08), 2.5 - k * k * 1.75, -0.6]} rotation={[k * 5, i, 0]} /> : null;
        })
      : null}
    <pointLight position={[0, 2.4, 1.6]} color="#ffe6c0" intensity={7} distance={8} decay={2} />
  </group>
);

import type React from "react";
import { Block, Glow, Vox, shade, useFilmTime } from "../../engine";
import type { BlockKind, Vec3 } from "../../engine";
import { ADULT, Bits, Figure, Villager, Voxels } from "../../../Topics/Explainer";
import type { VillagerProps } from "../../../Topics/Explainer";

/**
 * PARTS BUILT FOR THIS FILM. The pack (Topics/Explainer) is about money and bread; this film is about who may say
 * no to a leader, and needed things the pack does not have: something to wear on a villager's head, a vote, a
 * judge's bench, a cage, a statue, a Roman temple's furniture.
 *
 * They are built here first, the way the pack asks (PACK.md, "Adding a part"): a part moves to the pack when a
 * SECOND film needs it. The ones most likely to: `Folk` (a villager who wears and holds things), `No`, `VoteBox`.
 *
 * 1 unit = 1 block = 1 metre. A villager is drawn on a grid of Minecraft pixels: `U` is one of them.
 */
export const U = 1.8 / 32;

/** The colour of power in this film: the leader's hat, the banners, the Roman cloak. Nothing else is purple. */
export const PURPLE = "#7d2fc4";
export const GOLD = "#f2c230";
/** The colour of NO. Nothing else in the film is this red. */
export const RED = "#e3261c";

// ----------------------------------------------------------------------------- a villager who wears and holds things

export type FolkProps = VillagerProps & {
  /** Worn on the head: it nods and turns with it. Drawn from the NECK: the head is 10 `U` tall and 8 wide, its face at +Z. */
  head?: React.ReactNode;
  /** Held in the folded arms. Drawn from the point in front of the chest where a thing rests on the sleeves. */
  hands?: React.ReactNode;
  /** Worn on the body: it bows with it. Drawn from the HIPS: the shoulders are 12 `U` up, the chest is at +3 `U`. */
  body?: React.ReactNode;
};

/**
 * A villager of the pack, with three places to hang things on him. The pack's villager is not changed: this draws
 * him, and then draws what he wears with the same joints, so that a hat nods when he nods.
 */
export const Folk: React.FC<FolkProps> = ({ head, hands, body, ...v }) => {
  const t = useFilmTime();
  const { position = [0, 0, 0], rotationY = 0, scale = ADULT, walk = 0, nod = 0, turn = 0, tilt = 0, lookAt, hmm = 0, lean = 0, kid = false, phase = 0 } = v;
  if (!head && !hands && !body) return <Villager {...v} />;
  // The same numbers as the villager's own joints (Topics/InThisTown/villagers.tsx).
  const gait = walk * 5.4;
  const bob = Math.abs(Math.sin(gait)) * 0.03 + Math.sin(t * 1.3 + phase) * 0.005;
  const sway = Math.sin(gait) * 0.035;
  let yaw = turn;
  let pitch = nod;
  if (lookAt) {
    const dx = lookAt[0] - position[0];
    const dz = lookAt[2] - position[2];
    const dy = lookAt[1] - (position[1] + 29 * U * scale);
    let rel = Math.atan2(dx, dz) - rotationY;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    yaw = Math.min(1.2, Math.max(-1.2, rel));
    pitch = Math.min(0.65, Math.max(-0.6, -Math.atan2(dy, Math.hypot(dx, dz))));
  }
  const hmmBob = hmm * (0.07 + Math.sin(t * 8.5 + phase) * 0.05);
  return (
    <>
      <Villager {...v} />
      <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
        <group position={[0, 12 * U + bob, 0]} rotation={[lean, 0, sway]}>
          {body}
          {hands ? <group position={[0, 8 * U, 6.2 * U]}>{hands}</group> : null}
          {head ? (
            <group position={[0, 12 * U, 0]} rotation={[pitch + hmmBob, yaw, tilt]} scale={kid ? 1.16 : 1}>
              {head}
            </group>
          ) : null}
        </group>
      </group>
    </>
  );
};

/** Where a thing held in a villager's folded arms is, in the world. */
export const heldBy = (p: Vec3, rotationY = 0, scale = ADULT): Vec3 => [p[0] + Math.sin(rotationY) * 6.2 * U * scale, p[1] + 20 * U * scale, p[2] + Math.cos(rotationY) * 6.2 * U * scale];
/** The top of a villager's head, in the world: where a hat lands. */
export const headTop = (p: Vec3, scale = ADULT): Vec3 => [p[0], p[1] + 34 * U * scale, p[2]];

// ----------------------------------------------------------------------------- things worn

/**
 * THE LEADER'S HAT: tall, purple, with a gold band. Whoever wears it is the leader, and that is all it means: in
 * one village it moves from head to head, in the other it never moves again. Drawn from the neck (see `Folk`).
 */
export const LeaderHat: React.FC<{ stone?: boolean }> = ({ stone = false }) => (
  <>
    <Block position={[0, 10.6 * U, 0]} size={[12 * U, 1.2 * U, 12 * U]} color={stone ? "#8f8f8a" : shade(PURPLE, -0.12)} />
    <Block position={[0, 14.7 * U, 0]} size={[7.8 * U, 7 * U, 7.8 * U]} color={stone ? "#a9a9a3" : PURPLE} />
    <Block position={[0, 12.1 * U, 0]} size={[8.15 * U, 1.7 * U, 8.15 * U]} color={stone ? "#8f8f8a" : GOLD} emissive={stone ? "#000000" : GOLD} emissiveIntensity={stone ? 0 : 0.18} />
  </>
);

/** The hat on its own, in the air: `at` is where the top of a head would be. */
export const FlyingHat: React.FC<{ at: Vec3; scale?: number; spin?: number; tilt?: number }> = ({ at, scale = ADULT, spin = 0, tilt = 0 }) => (
  <group position={at} rotation={[tilt, spin, 0]} scale={scale}>
    <group position={[0, -10 * U, 0]}>
      <LeaderHat />
    </group>
  </group>
);

/** A soldier's iron helmet, with a purple crest: he is somebody's soldier. */
export const Helmet: React.FC = () => (
  <>
    <Block position={[0, 9.3 * U, 0]} size={[9 * U, 3.6 * U, 9 * U]} color="#c4cad4" metalness={0.35} roughness={0.55} />
    <Block position={[0, 7.6 * U, 0]} size={[9.7 * U, 1 * U, 9.7 * U]} color="#9aa1ad" metalness={0.35} roughness={0.55} />
    <Block position={[0, 12 * U, -0.4 * U]} size={[1.3 * U, 2.2 * U, 6.4 * U]} color={PURPLE} />
  </>
);

/** A judge's white wig. */
export const Wig: React.FC = () => (
  <>
    <Block position={[0, 10.3 * U, -0.2 * U]} size={[9 * U, 2.2 * U, 8.8 * U]} color="#f3f0e8" />
    {[-1, 1].map((side) => (
      <group key={side}>
        <Block position={[side * 4.9 * U, 6.3 * U, -0.6 * U]} size={[1.7 * U, 8.6 * U, 7 * U]} color="#f3f0e8" />
        <Block position={[side * 5.2 * U, 3.2 * U, 0.4 * U]} size={[1.9 * U, 2 * U, 4.6 * U]} color="#dedacf" />
      </group>
    ))}
    <Block position={[0, 6.3 * U, -4.7 * U]} size={[9 * U, 8.6 * U, 1.7 * U]} color="#e9e5da" />
  </>
);

/** A wreath of gold leaves, open at the brow. */
export const Wreath: React.FC = () => (
  <>
    {[-1, 1].map((side) => (
      <group key={side}>
        <Block position={[side * 4.55 * U, 8.6 * U, -0.3 * U]} size={[1.3 * U, 1.7 * U, 9 * U]} color={GOLD} emissive={GOLD} emissiveIntensity={0.25} />
        <Block position={[side * 3.2 * U, 8.6 * U, 4.5 * U]} size={[2.7 * U, 1.7 * U, 1.3 * U]} color={GOLD} emissive={GOLD} emissiveIntensity={0.25} />
        {[-3, -1, 1, 3].map((z) => (
          <Block key={z} position={[side * 4.9 * U, 9.9 * U, z * U]} size={[1 * U, 1.3 * U, 1.3 * U]} color="#ffd95a" emissive={GOLD} emissiveIntensity={0.25} />
        ))}
      </group>
    ))}
    <Block position={[0, 8.6 * U, -4.6 * U]} size={[9 * U, 1.7 * U, 1.3 * U]} color={GOLD} emissive={GOLD} emissiveIntensity={0.25} />
  </>
);

/**
 * THE CLOAK: purple, clasped with gold. In Rome it is the job; the man who has it on is the dictator. Drawn from
 * the hips, like anything worn on a body: it hangs from 12 `U` up. It is wider than the man, so that from the
 * front he has a purple edge all the way down.
 */
export const Cloak: React.FC = () => (
  <>
    {/* the back of it, to the ankles, and a wing down each side that shows past the sleeves */}
    <Block position={[0, 1.9 * U, -4 * U]} size={[19 * U, 21 * U, 1.3 * U]} color={PURPLE} />
    {[-1, 1].map((side) => (
      <group key={side}>
        <Block position={[side * 9.2 * U, 1.9 * U, -2.4 * U]} size={[1.3 * U, 21 * U, 3.6 * U]} color={shade(PURPLE, -0.1)} />
        {/* a cape over each shoulder, down to the fold of the arm */}
        <Block position={[side * 6.2 * U, 10.4 * U, 0.9 * U]} size={[5.2 * U, 4.2 * U, 6.6 * U]} color={shade(PURPLE, 0.05)} />
        <Block position={[side * 6.2 * U, 8.1 * U, 0.9 * U]} size={[5.4 * U, 0.7 * U, 6.8 * U]} color={GOLD} emissive={GOLD} emissiveIntensity={0.2} castShadow={false} />
      </group>
    ))}
    <Block position={[0, 11.7 * U, -0.6 * U]} size={[17.4 * U, 1.6 * U, 7.4 * U]} color={shade(PURPLE, 0.05)} />
    <Block position={[0, 11.1 * U, 3.5 * U]} size={[2.2 * U, 2.2 * U, 0.9 * U]} color={GOLD} emissive={GOLD} emissiveIntensity={0.3} />
  </>
);

/** The cloak on its own: on its stand, or in the air between two men. `at` is where the wearer's feet would be. */
export const LooseCloak: React.FC<{ at: Vec3; rotationY?: number; scale?: number; flutter?: number }> = ({ at, rotationY = 0, scale = ADULT, flutter = 0 }) => (
  <group position={at} rotation={[flutter * 0.5, rotationY, flutter * 0.25]} scale={scale}>
    <group position={[0, 12 * U, 0]}>
      <Cloak />
    </group>
  </group>
);

/** A row of medals: a man who has given them to himself. Worn on the body. */
export const Medals: React.FC = () => (
  <>
    {[0, 1, 2].map((i) => (
      <Block key={i} position={[(-3 + i * 1.5) * U, 10.4 * U, 3.2 * U]} size={[1.1 * U, 1.3 * U, 0.5 * U]} color={i === 1 ? "#e9edf2" : GOLD} emissive={GOLD} emissiveIntensity={0.2} castShadow={false} />
    ))}
    <Block position={[-1.5 * U, 11.4 * U, 3.2 * U]} size={[4.6 * U, 0.6 * U, 0.4 * U]} color={PURPLE} castShadow={false} />
  </>
);

/** A judge's two white tabs, at the throat. Worn on the body. */
export const Tabs: React.FC = () => (
  <>
    {[-1, 1].map((side) => (
      <Block key={side} position={[side * 1.05 * U, 10.5 * U, 3.2 * U]} size={[1.5 * U, 3 * U, 0.5 * U]} color="#f3f0e8" castShadow={false} />
    ))}
  </>
);

/** A senator's stripe, down the front of a white robe. Worn on the body. */
export const Stripe: React.FC<{ color?: string }> = ({ color = "#a8322a" }) => (
  <Block position={[2.6 * U, 6 * U, 3.1 * U]} size={[1.2 * U, 12 * U, 0.4 * U]} color={color} castShadow={false} />
);

// ----------------------------------------------------------------------------- things held

/**
 * A spear, held upright at the right side. `jab` (radians) tips its point forward and down about the grip:
 * 0 stands guard, 2.6 stabs at something below the rail he stands behind. `side` -1 holds it on the left.
 */
export const Spear: React.FC<{ jab?: number; side?: number }> = ({ jab = 0, side = 1 }) => (
  <group position={[side * 0.31, 0.02, -0.1]} rotation={[jab, 0, 0]}>
    <Block position={[0, 0.3, 0]} size={[0.055, 2.5, 0.055]} color="#6a4a2a" />
    <Block position={[0, 1.64, 0]} size={[0.11, 0.22, 0.11]} color="#d5dae2" metalness={0.4} roughness={0.5} />
    <Block position={[0, 1.8, 0]} size={[0.06, 0.12, 0.06]} color="#d5dae2" metalness={0.4} roughness={0.5} />
    <Block position={[0.11, 1.36, 0]} size={[0.2, 0.16, 0.02]} color={PURPLE} castShadow={false} />
  </group>
);

/**
 * A judge's hammer, held by its handle. `swing` (radians) is how far it has come over: -0.15 is drawn back over
 * the shoulder, 0.95 hangs over the block, 1.32 is the blow.
 */
export const Gavel: React.FC<{ swing?: number; carried?: number }> = ({ swing = 0.95, carried = 0 }) => (
  // `carried` (0–1) moves it out to his side and lays it back on the shoulder: a thing he owns, not one he is using.
  <group position={[0.02 + 0.3 * carried, -0.04 * carried, -0.06]} rotation={[swing * (1 - carried) - 0.3 * carried, 0, -0.5 * carried]}>
    <Block position={[0, 0.24, 0]} size={[0.065, 0.5, 0.065]} color="#7a5230" />
    <Block position={[0, 0.5, 0]} size={[0.36, 0.2, 0.2]} color="#4a2f1a" />
    {[-1, 1].map((side) => (
      <Block key={side} position={[side * 0.19, 0.5, 0]} size={[0.03, 0.23, 0.23]} color="#d9b46a" />
    ))}
  </group>
);

/** The angle of a hammer that strikes at `at` (seconds on the same clock as `t`): back, down, and back to rest. */
export const strike = (t: number, at: number, rest = 0.95): number => {
  const d = t - at;
  if (d < -0.26 || d > 0.34) return rest;
  if (d < -0.08) return rest + (-0.15 - rest) * ((d + 0.26) / 0.18);
  if (d < 0) return -0.15 + (1.32 + 0.15) * ((d + 0.08) / 0.08);
  return 1.32 + (rest - 1.32) * (d / 0.34);
};

// ----------------------------------------------------------------------------- the word NO

/**
 * NO: a red speech bubble with the word in white. The film's unit: who may say it to the leader, and what happens
 * to it. `position` is the middle of the bubble; it faces +Z. Give it `scale={pop(t, 0)}` to say it on a word.
 */
export const No: React.FC<{ position: Vec3; rotationY?: number; scale?: number; tilt?: number; tail?: number }> = ({ position, rotationY = 0, scale = 1, tilt = 0, tail = -1 }) => {
  if (scale <= 0.01) return null;
  return (
    <group position={position} rotation={[0, rotationY, tilt]} scale={scale}>
      <Block size={[1.04, 0.64, 0.06]} color="#7d120c" castShadow={false} />
      <Block position={[0, 0, 0.012]} size={[0.95, 0.55, 0.06]} color={RED} emissive={RED} emissiveIntensity={0.42} castShadow={false} />
      <Block position={[tail * 0.24, -0.37, 0]} size={[0.19, 0.19, 0.06]} color="#7d120c" castShadow={false} />
      <Block position={[tail * 0.24, -0.33, 0.012]} size={[0.11, 0.16, 0.06]} color={RED} emissive={RED} emissiveIntensity={0.42} castShadow={false} />
      <Figure text="NO" position={[0, 0, 0.055]} height={0.36} depth={0.35} color="#ffffff" glow={0.35} shadow={false} castShadow={false} />
    </group>
  );
};

/** What is left of a NO, `t` seconds after it was broken at `position`: red and white bits. Nothing before, nothing after 0.9 s. */
export const NoBits: React.FC<{ position: Vec3; t: number; seed?: number; toward?: Vec3; power?: number }> = ({ position, t, seed = 1, toward = [0, 0, 0.6], power = 1.1 }) => (
  <>
    <Bits position={position} t={t} color={RED} count={12} seed={seed} power={power} toward={toward} />
    <Bits position={position} t={t} color="#ffffff" count={5} seed={seed + 40} power={power * 0.8} toward={toward} />
  </>
);

// ----------------------------------------------------------------------------- a vote

/** One vote: a stone. `position` is its middle. */
export const VoteStone: React.FC<{ position: Vec3; spin?: number; scale?: number }> = ({ position, spin = 0, scale = 1 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[spin * 0.7, spin, 0]} scale={scale}>
      {/* A pale pebble, so that a pile of them reads against planks and against grey stone alike. */}
      <Block size={[0.3, 0.3, 0.3]} color="#f2efe6" />
      <Block position={[0, -0.11, 0]} size={[0.31, 0.08, 0.31]} color="#c9c4b6" castShadow={false} />
      <Block position={[0.06, 0.06, 0.151]} size={[0.08, 0.08, 0.01]} color="#d8d3c6" castShadow={false} />
    </group>
  );

/** How far apart the stones of a pile are, bottom to bottom. */
export const STONE = 0.32;

/**
 * THE VOTE BOX: a wooden box with a slot, on a stone slab. `position` is the ground under its middle; the slot is
 * 0.98 above it. `lock` is the height a chain and padlock hang over it (0 is locked shut; leave it out for none).
 */
export const VoteBox: React.FC<{ position: Vec3; lock?: number; shake?: number }> = ({ position, lock, shake = 0 }) => (
  <group position={position}>
    <Vox kind="stoneBrick" position={[0, 0.1, 0]} size={[1.4, 0.2, 1.1]} />
    <group rotation={[0, 0, shake]}>
      <Vox kind="planks" position={[0, 0.55, 0]} size={[0.9, 0.7, 0.7]} />
      <Vox kind="darkPlanks" position={[0, 0.94, 0]} size={[1.0, 0.08, 0.8]} />
      {[-1, 1].map((side) => (
        <Vox key={side} kind="darkPlanks" position={[side * 0.42, 0.55, 0.33]} size={[0.08, 0.7, 0.06]} />
      ))}
      <Block position={[0, 0.985, 0]} size={[0.5, 0.02, 0.13]} color="#0d0b0a" castShadow={false} />
      <Figure text="VOTE" position={[0, 0.56, 0.36]} height={0.21} maxWidth={0.66} depth={0.3} color="#fff8e6" shadow={false} castShadow={false} />
    </group>
    {lock !== undefined ? (
      <group position={[0, lock, 0]}>
        <Block position={[0, 1.0, 0]} size={[1.06, 0.07, 0.11]} color="#2a2c33" />
        <Block position={[0, 1.0, 0]} size={[0.11, 0.07, 0.86]} color="#2a2c33" />
        {[-1, 1].map((side) => (
          <Block key={side} position={[side * 0.515, 0.6, 0]} size={[0.06, 0.82, 0.11]} color="#2a2c33" />
        ))}
        <Block position={[0, 0.72, 0.4]} size={[1.0, 0.07, 0.06]} color="#2a2c33" />
        <Block position={[0, 0.6, 0.45]} size={[0.3, 0.28, 0.1]} color="#d9a514" emissive="#d9a514" emissiveIntensity={0.2} />
        <Block position={[0, 0.8, 0.45]} size={[0.2, 0.14, 0.05]} color="#8d929c" />
        <Block position={[0, 0.58, 0.505]} size={[0.06, 0.1, 0.02]} color="#2a2c33" castShadow={false} />
      </group>
    ) : null}
  </group>
);

/**
 * A PILE of counted votes: stones stacked in one column, so that two piles are two bars of a chart. `position` is
 * the ground under it. `landed` lists the moment each stone was counted (the same clock as `t`); a stone is drawn
 * from that moment on, and drops the last hand's width. From `gone` on the pile is swept away.
 */
export const VotePile: React.FC<{ position: Vec3; landed: number[]; t: number; gone?: number }> = ({ position, landed, t, gone }) => {
  const away = gone === undefined ? 0 : Math.min(1, Math.max(0, (t - gone) / 0.18));
  return (
    <group position={position}>
      <Vox kind="stone" tint="#5f5f66" position={[0, 0.04, 0]} size={[0.52, 0.08, 0.52]} />
      {away >= 1
        ? null
        : landed.map((at, i) => {
            const since = t - at;
            if (since < 0) return null;
            const drop = since < 0.12 ? 0.28 * (1 - since / 0.12) : since < 0.22 ? 0.03 * Math.sin(((since - 0.12) / 0.1) * Math.PI) : 0;
            return <VoteStone key={i} position={[(i % 2 ? 0.012 : -0.012), 0.08 + STONE / 2 + i * STONE + drop, 0]} spin={(i % 3) * 0.09 - 0.09} scale={1 - away} />;
          })}
    </group>
  );
};

// ----------------------------------------------------------------------------- a judge's bench

/** How high the platform is, and the top of the desk on it. */
export const BENCH_FLOOR = 1.0;
export const DESK_TOP = 1.85;

/**
 * THE BENCH: a platform behind the vote box, a tall desk on it, a block to strike, and a high-backed chair. Whoever
 * stands behind the desk is over everybody else in the square, the leader included. That is the point of it, and
 * it is why the same bench stands in both villages. `position` is the ground under the vote box (see `tableau`).
 */
export const Bench: React.FC<{ position: Vec3; floor?: BlockKind; tint?: string }> = ({ position, floor = "planks", tint }) => (
  <group position={position}>
    <Vox kind={floor} tint={tint} position={[0, BENCH_FLOOR / 2, -2.5]} size={[3.6, BENCH_FLOOR, 1.8]} />
    {/* three steps up, at the front on the left */}
    {[0, 1, 2].map((j) => (
      <Vox key={j} kind={floor} tint={tint} position={[-1.45, (j + 1) / 6, -0.725 - j * 0.35]} size={[0.7, (j + 1) / 3, 0.35]} />
    ))}
    {/* the desk */}
    <Vox kind="darkPlanks" position={[0, BENCH_FLOOR + 0.42, -1.95]} size={[1.8, 0.84, 0.7]} />
    <Vox kind="darkPlanks" tint="#3a2716" position={[0, DESK_TOP - 0.03, -1.95]} size={[1.94, 0.07, 0.82]} />
    {[-1, 1].map((side) => (
      <Block key={side} position={[side * 0.86, BENCH_FLOOR + 0.42, -1.59]} size={[0.08, 0.84, 0.03]} color="#3a2716" castShadow={false} />
    ))}
    {/* the scales of a court, on its front */}
    <Voxels rows={["....#....", ".#######.", ".#..#..#.", "###.#.###", "....#....", "..#####.."]} position={[0, BENCH_FLOOR + 0.43, -1.585]} height={0.44} depth={0.3} color="#e3c06a" shadow={false} castShadow={false} />
    {/* the block the hammer strikes */}
    <Block position={[0, DESK_TOP + 0.1, -1.92]} size={[0.34, 0.2, 0.3]} color="#7a5230" />
    {/* the chair */}
    <Vox kind="darkPlanks" position={[0, BENCH_FLOOR + 1.15, -3.2]} size={[0.96, 2.3, 0.16]} />
    <Block position={[0, BENCH_FLOOR + 1.6, -3.11]} size={[0.7, 1.1, 0.03]} color="#8f2f2a" castShadow={false} />
    {[-1, 1].map((side) => (
      <Block key={side} position={[side * 0.44, BENCH_FLOOR + 2.38, -3.2]} size={[0.14, 0.2, 0.2]} color="#d9b46a" />
    ))}
  </group>
);

// ----------------------------------------------------------------------------- what a ruler hangs up, and what he locks

/** The hat, as a picture: what is on every banner. Top row first. */
const HAT_ROWS = ["..####..", "..####..", "..####..", "..####..", "########"];

/**
 * A BANNER: purple, with the hat on it in gold. `position` is the middle of its rod; it hangs `length` down and
 * faces +Z. `shown` (0–1) unrolls it. With `face` it carries his face under the hat as well.
 */
export const Banner: React.FC<{ position: Vec3; rotationY?: number; width?: number; length?: number; shown?: number; face?: boolean; sway?: number }> = ({
  position,
  rotationY = 0,
  width = 0.8,
  length = 2.4,
  shown = 1,
  face = false,
  sway = 0,
}) => {
  const hang = length * Math.min(1, Math.max(0, shown));
  const emblem = width * 0.62;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Vox kind="darkPlanks" position={[0, 0, 0]} size={[width + 0.24, 0.09, 0.09]} />
      {hang > 0.05 ? (
        <group rotation={[sway, 0, 0]}>
          <Vox kind="wool" tint={PURPLE} position={[0, -hang / 2, 0.02]} size={[width, hang, 0.04]} />
          <Block position={[0, -hang + 0.07, 0.045]} size={[width, 0.09, 0.02]} color={GOLD} emissive={GOLD} emissiveIntensity={0.2} castShadow={false} />
          {hang > length * 0.72 ? (
            <>
              <Voxels rows={HAT_ROWS} position={[0, -length * (face ? 0.24 : 0.42), 0.05]} height={emblem * 0.62} depth={0.25} color={GOLD} glow={0.2} shadow={false} castShadow={false} />
              {face ? (
                <group position={[0, -length * 0.24 - emblem * 0.62, 0.05]}>
                  <Block size={[emblem * 0.62, emblem * 0.62, 0.03]} color="#bd8b72" castShadow={false} />
                  <Block position={[0, emblem * 0.12, 0.02]} size={[emblem * 0.5, emblem * 0.09, 0.02]} color="#35261c" castShadow={false} />
                  {[-1, 1].map((side) => (
                    <Block key={side} position={[side * emblem * 0.15, emblem * 0.02, 0.02]} size={[emblem * 0.1, emblem * 0.08, 0.02]} color="#2f8f3a" castShadow={false} />
                  ))}
                  <Block position={[0, -emblem * 0.2, 0.035]} size={[emblem * 0.16, emblem * 0.34, 0.05]} color="#a57661" castShadow={false} />
                </group>
              ) : null}
            </>
          ) : null}
        </group>
      ) : null}
    </group>
  );
};

/** A CAGE of iron bars, big enough for one villager. `position` is the ground under its middle. */
export const Cage: React.FC<{ position: Vec3; rattle?: number }> = ({ position, rattle = 0 }) => {
  const w = 1.24;
  const h = 2.34;
  const iron = "#2b2e36";
  const bars = [-0.62, -0.413, -0.207, 0, 0.207, 0.413, 0.62];
  return (
    <group position={position} rotation={[0, 0, rattle]}>
      {bars.map((x) => (
        <group key={x}>
          <Block position={[x, h / 2, w / 2]} size={[0.055, h, 0.055]} color={iron} metalness={0.3} roughness={0.6} />
          <Block position={[x, h / 2, -w / 2]} size={[0.055, h, 0.055]} color={iron} metalness={0.3} roughness={0.6} />
          {Math.abs(x) < 0.6 ? (
            <>
              <Block position={[w / 2, h / 2, x]} size={[0.055, h, 0.055]} color={iron} metalness={0.3} roughness={0.6} />
              <Block position={[-w / 2, h / 2, x]} size={[0.055, h, 0.055]} color={iron} metalness={0.3} roughness={0.6} />
            </>
          ) : null}
        </group>
      ))}
      {[0.05, h - 0.05].map((y) => (
        <group key={y}>
          {[-1, 1].map((side) => (
            <group key={side}>
              <Block position={[0, y, (side * w) / 2]} size={[w + 0.1, 0.1, 0.1]} color={iron} metalness={0.3} roughness={0.6} />
              <Block position={[(side * w) / 2, y, 0]} size={[0.1, 0.1, w + 0.1]} color={iron} metalness={0.3} roughness={0.6} />
            </group>
          ))}
        </group>
      ))}
      {[-0.31, 0, 0.31].map((x) => (
        <Block key={x} position={[x, h - 0.05, 0]} size={[0.055, 0.055, w]} color={iron} metalness={0.3} roughness={0.6} />
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------------- stone

/**
 * A STATUE of a villager in the leader's hat, cut from one pale stone. `position` is the ground under its feet;
 * `scale` 1 is a villager's size. It is the pack's villager, measure for measure, so that the man it shows is
 * recognised when he turns up alive.
 */
export const StoneMan: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => {
  const a = "#b9b9b2";
  const b = "#a3a39c";
  const c = "#8a8a84";
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((side) => (
        <Block key={side} position={[side * 2 * U, 6 * U, 0]} size={[3.8 * U, 12 * U, 4 * U]} color={c} />
      ))}
      <Block position={[0, 18 * U, 0]} size={[8 * U, 12 * U, 6 * U]} color={a} />
      <Block position={[0, 9.4 * U, 0]} size={[8.7 * U, 7.2 * U, 6.7 * U]} color={b} />
      <group position={[0, 21 * U, 1 * U]} rotation={[-0.75, 0, 0]}>
        {[-1, 1].map((side) => (
          <Block key={side} position={[side * 6 * U, -2 * U, 0]} size={[4 * U, 8 * U, 4 * U]} color={b} />
        ))}
        <Block position={[0, -4 * U, 0]} size={[8 * U, 4 * U, 4 * U]} color={b} />
      </group>
      <group position={[0, 24 * U, 0]}>
        <Block position={[0, 5 * U, 0]} size={[8 * U, 10 * U, 8 * U]} color={a} />
        <Block position={[0, 5.6 * U, 4.06 * U]} size={[6.2 * U, 1.1 * U, 0.3 * U]} color={c} castShadow={false} />
        {[-1, 1].map((side) => (
          <Block key={side} position={[side * 2 * U, 4.4 * U, 4.04 * U]} size={[2 * U, 1 * U, 0.2 * U]} color={c} castShadow={false} />
        ))}
        <Block position={[0, 1 * U, 5 * U]} size={[2 * U, 4 * U, 2 * U]} color={b} />
        <LeaderHat stone />
      </group>
    </group>
  );
};

/** One marble column: a base, a shaft with three flutes down its front, a capital. `position` is the floor under it. */
export const Column: React.FC<{ position: Vec3; height?: number; width?: number }> = ({ position, height = 3, width = 0.56 }) => (
  <group position={position}>
    <Vox kind="stone" tint="#e6e0d2" position={[0, 0.1, 0]} size={[width + 0.26, 0.2, width + 0.26]} />
    <Vox kind="stone" tint="#f3eee2" tile={2} position={[0, height / 2, 0]} size={[width, height - 0.4, width]} />
    {[-1, 0, 1].map((k) => (
      <Block key={k} position={[k * width * 0.27, height / 2, width / 2 + 0.001]} size={[0.035, height - 0.5, 0.01]} color="#cfc8b8" castShadow={false} />
    ))}
    <Vox kind="stone" tint="#e6e0d2" position={[0, height - 0.1, 0]} size={[width + 0.3, 0.2, width + 0.3]} />
  </group>
);

/**
 * A MOON: one month. It hangs on a short chain from `position` (the hook). Dark, it is a slate tile; lit, it is
 * the moon of a Minecraft night. `lit` is 0–1.
 */
export const Moon: React.FC<{ position: Vec3; lit?: number; scale?: number }> = ({ position, lit = 0, scale = 1 }) => {
  if (scale <= 0.01) return null;
  const on = Math.min(1, Math.max(0, lit));
  const face = on > 0.5 ? "#fff3c4" : "#55607a";
  return (
    <group position={position} scale={scale}>
      <Block position={[0, -0.12, 0]} size={[0.03, 0.24, 0.03]} color="#3a3d45" castShadow={false} />
      <Block position={[0, -0.45, 0]} size={[0.44, 0.44, 0.07]} color={face} emissive="#ffe9a0" emissiveIntensity={on * 0.5} castShadow={false} />
      <Block position={[0, -0.45, -0.02]} size={[0.5, 0.5, 0.05]} color="#2d3345" castShadow={false} />
      {(
        [
          [-0.1, -0.36, 0.12],
          [0.09, -0.5, 0.15],
          [-0.06, -0.56, 0.08],
        ] as Array<[number, number, number]>
      ).map(([x, y, s], i) => (
        <Block key={i} position={[x, y, 0.036]} size={[s, s, 0.01]} color={on > 0.5 ? "#cdb878" : "#434c63"} castShadow={false} />
      ))}
      {on > 0.05 ? <Glow position={[0, -0.45, 0.2]} size={1.0} color="#ffe9a0" opacity={0.3 * on} /> : null}
    </group>
  );
};

/** A stone bowl on a pedestal, and the fire in it. `fire` is 0–1: 0 is a cold bowl. `position` is the floor under it. */
export const Brazier: React.FC<{ position: Vec3; fire?: number; seed?: number }> = ({ position, fire = 0, seed = 1 }) => {
  const t = useFilmTime();
  const f = Math.min(1, Math.max(0, fire));
  const lick = (k: number) => 0.82 + 0.18 * Math.sin(t * (11 + k * 3.1) + seed * 2.3 + k);
  return (
    <group position={position}>
      <Vox kind="stone" tint="#d9d2c2" position={[0, 0.35, 0]} size={[0.3, 0.7, 0.3]} />
      <Block position={[0, 0.78, 0]} size={[0.62, 0.16, 0.62]} color="#3a3531" />
      <Block position={[0, 0.9, 0]} size={[0.5, 0.08, 0.5]} color="#1f1b19" />
      {f > 0.03 ? (
        <>
          <Block position={[0, 0.94 + 0.2 * f * lick(0), 0]} size={[0.4 * f, 0.4 * f * lick(0), 0.4 * f]} color="#ff7a14" emissive="#ff5a0a" emissiveIntensity={2} castShadow={false} />
          <Block position={[0.03, 0.94 + 0.48 * f * lick(1), -0.02]} size={[0.26 * f, 0.4 * f * lick(1), 0.26 * f]} color="#ffb21e" emissive="#ff8a14" emissiveIntensity={2.2} castShadow={false} />
          <Block position={[-0.02, 0.94 + 0.78 * f * lick(2), 0.02]} size={[0.13 * f, 0.3 * f * lick(2), 0.13 * f]} color="#ffe27a" emissive="#ffc84a" emissiveIntensity={2.4} castShadow={false} />
          <Glow position={[0, 1.3, 0.3]} size={2.4 * f} color="#ff8a2a" opacity={0.5 * f * lick(1)} />
        </>
      ) : null}
    </group>
  );
};

/** A wooden stand for a cloak, as tall as a man's shoulders. `position` is the floor under it. */
export const CloakStand: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 0.72, -0.12]} size={[0.1, 1.44, 0.1]} />
    <Vox kind="log" position={[0, 1.4, -0.12]} size={[0.74, 0.09, 0.09]} />
    <Vox kind="darkPlanks" position={[0, 0.04, -0.12]} size={[0.5, 0.08, 0.5]} />
  </group>
);

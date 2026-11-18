import type React from "react";
import { Block, Glow, LightPool, MinecraftAvatar, PixelText, Sign, Torch, Vox, defineScene, useActiveShot } from "../../engine";
import type { AnimName, FaceName, SceneDef, Shot, Vec3 } from "../../engine";
import { ease, pop, ramp } from "../../../Topics/InThisTown/staging";
import layoutJson from "./lines.json";
import timingJson from "./timing.json";

/**
 * THE GUY WHO NEVER GOT INVITED — cast and things.
 *
 * A meme recreation, not a story film: the reel's skeleton (hush, rewind, party, dream, egg,
 * montage, job, the friends, one word, button) with the sigma-grindset tone under it.
 *
 * The cut lives in `lines.json`, not in the scene files: shot lengths and where each line starts.
 * `stagedScene` below reads it back, `scripts/dialogue-timing.py` writes timing.json and the voice
 * from it, and `sound.json` names the same shot ids as cues. One clock, three consumers.
 *
 * A tall frame is a slit. At 4 m the lens sees about 1 m each side of what it points at, so people
 * are staged in depth (one behind the other) and never in a row.
 */

// --------------------------------------------------------------------------- the cut

export const timing = timingJson as unknown as { words: Array<{ w: string; s: number; e: number }> };

type Row = { id: string; at: number; dur: number };
const LAYOUT: Record<string, { title: string; shots: Row[]; duration: number }> = (() => {
  const out: Record<string, { title: string; shots: Row[]; duration: number }> = {};
  for (const scene of (layoutJson as any).scenes as Array<{ id: string; title: string; shots: Array<{ id: string; dur: number }> }>) {
    let t = 0;
    const shots = scene.shots.map((shot) => {
      const row = { id: shot.id, at: t, dur: shot.dur };
      t += shot.dur;
      return row;
    });
    out[scene.id] = { title: scene.title, shots, duration: t };
  }
  return out;
})();

export type StagedShot = Omit<Shot, "at" | "dur"> & {
  /** The shot's id in lines.json: its cue for the sound sheet. */
  id: string;
  /** What is on screen, `t` seconds after this cut, `p` 0→1 across it. */
  stage?: (t: number, p: number) => React.ReactNode;
};

/** A scene cut to lines.json: durations come from the sheet, so nothing can drift. */
export function stagedScene(id: string, shots: StagedShot[]): SceneDef {
  const layout = LAYOUT[id];
  if (!layout) throw new Error(`stagedScene("${id}"): no such scene in lines.json`);
  if (layout.shots.length !== shots.length) {
    throw new Error(`stagedScene("${id}"): lines.json has ${layout.shots.length} shots, the scene has ${shots.length}`);
  }
  const plain: Shot[] = shots.map((shot, i) => {
    const row = layout.shots[i];
    if (row.id !== shot.id) throw new Error(`stagedScene("${id}"): shot ${i + 1} is "${shot.id}", lines.json says "${row.id}"`);
    const { id: _id, stage: _stage, ...rest } = shot;
    return { ...rest, cue: row.id, at: row.at, dur: row.dur };
  });
  const Component: React.FC = () => {
    const active = useActiveShot();
    const cue = active?.shot.cue ?? plain[0].cue;
    const i = Math.max(0, plain.findIndex((s) => s.cue === cue));
    const row = layout.shots[i];
    const t = active?.t ?? 0;
    return <>{shots[i].stage?.(t, row.dur > 0 ? t / row.dur : 0) ?? null}</>;
  };
  return defineScene({ id, title: layout.title, duration: layout.duration, shots: plain, Component });
}

/** Every shot of the film with its absolute second. For a still or a sound at a shot's middle. */
export const at = (shotId: string): { start: number; dur: number } => {
  let t = 0;
  for (const scene of Object.values(LAYOUT)) {
    for (const shot of scene.shots) {
      if (shot.id === shotId) return { start: t + shot.at, dur: shot.dur };
    }
    t += scene.duration;
  }
  throw new Error(`no shot "${shotId}"`);
};

export { ease, pop, ramp };
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));

// --------------------------------------------------------------------------- the cast

const HIM = { skin: "#c8916a", hair: "#171310" };
export const CLUB_SHIRT = { torso: "#15171c", arms: "#15171c", legs: "#20242c" };

/** Him. Twenty-two, in the same black shirt for four years, headphones always round his neck. */
export const Him: React.FC<{
  position?: Vec3;
  rotationY?: number;
  animation?: AnimName;
  face?: FaceName;
  lookAt?: Vec3;
  scale?: number;
  headPitch?: number;
  headYaw?: number;
  arms?: AnimName;
  /** Round his neck, or on his ears. */
  headphones?: "neck" | "ears" | false;
  night?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, animation = "idle", face = "calm", lookAt, scale = 1, headPitch = 0, headYaw = 0, arms, headphones = "neck", night }) => (
  <MinecraftAvatar
    position={position}
    rotationY={rotationY}
    animation={animation}
    arms={arms}
    face={face}
    lookAt={lookAt}
    scale={scale}
    headPitch={headPitch}
    headYaw={headYaw}
    skin={HIM.skin}
    hair={HIM.hair}
    outfit="tee"
    colors={night ? { torso: "#1b1f26", arms: "#2b2f36", legs: "#2a2f38" } : CLUB_SHIRT}
    shoes={night ? "#d8d3c6" : "#0d0f13"}
    blink
    shadow
    head={headphones ? <Headphones ears={headphones === "ears"} /> : null}
  />
);

/** The one prop that says the whole film: headphones, round the neck or over the ears. */
const Headphones: React.FC<{ ears?: boolean }> = ({ ears }) => (
  <group position={[0, ears ? 0.12 : -0.18, 0]}>
    <Block size={[0.38, 0.05, 0.09]} color="#14161a" position={[0, 0, 0]} />
    <Block size={[0.09, 0.05, 0.05]} color="#c0402f" position={[0, 0, 0.16]} emissive="#c0402f" emissiveIntensity={0.4} />
    <Block size={[0.07, 0.15, 0.13]} color="#14161a" position={[-0.17, 0.02, 0]} />
    <Block size={[0.07, 0.15, 0.13]} color="#14161a" position={[0.17, 0.02, 0]} />
  </group>
);

const FRIEND_LOOKS = [
  { skin: "#b87a52", hair: "#2a1b12", torso: "#3d4450", arms: "#3d4450", legs: "#2b3038", shoes: "#e8e4dc" },
  { skin: "#d9a878", hair: "#7a4a20", torso: "#8a3b2a", arms: "#8a3b2a", legs: "#2d3240", shoes: "#f0ece2" },
  { skin: "#8f5c3a", hair: "#120e0b", torso: "#4a5f3a", arms: "#4a5f3a", legs: "#33384a", shoes: "#d9d4c8" },
];

/** One of the three at the door. Same three for the whole film, same jackets, four years later. */
export const Friend: React.FC<{
  v?: 0 | 1 | 2;
  position: Vec3;
  rotationY?: number;
  animation?: AnimName;
  face?: FaceName;
  lookAt?: Vec3;
  scale?: number;
  headPitch?: number;
}> = ({ v = 0, position, rotationY = 0, animation = "idle", face = "grin", lookAt, scale = 1, headPitch = 0 }) => {
  const look = FRIEND_LOOKS[v];
  return (
    <MinecraftAvatar
      position={position}
      rotationY={rotationY}
      animation={animation}
      face={face}
      lookAt={lookAt}
      scale={scale}
      headPitch={headPitch}
      skin={look.skin}
      hair={look.hair}
      outfit="hoodie"
      colors={{ torso: look.torso, arms: look.arms, legs: look.legs }}
      shoes={look.shoes}
      blink
      shadow
    />
  );
};

/** The kid at the birthday party, with the phone that beats him. */
export const Kid: React.FC<{ position: Vec3; rotationY?: number; animation?: AnimName; face?: FaceName; lookAt?: Vec3 }> = ({
  position,
  rotationY = 0,
  animation = "idle",
  face = "blank",
  lookAt,
}) => (
  <MinecraftAvatar
    position={position}
    rotationY={rotationY}
    animation={animation}
    face={face}
    lookAt={lookAt}
    scale={0.74}
    skin="#d8a882"
    hair="#3a2418"
    outfit="tee"
    colors={{ torso: "#2f6f9a", arms: "#2f6f9a", legs: "#3a3f4a" }}
    blink
    shadow
  />
);

/** The club owner, in a suit that costs more than the club. */
export const Owner: React.FC<{ position: Vec3; rotationY?: number; face?: FaceName; lookAt?: Vec3; animation?: AnimName }> = ({
  position,
  rotationY = 0,
  face = "blank",
  lookAt,
  animation = "idle",
}) => (
  <MinecraftAvatar
    position={position}
    rotationY={rotationY}
    animation={animation}
    face={face}
    lookAt={lookAt}
    skin="#e0b48c"
    hair="#241a12"
    outfit="suit"
    shoes="#0b0b0d"
    blink
    shadow
  />
);

// --------------------------------------------------------------------------- things

/** A speaker cabinet. `pulse` is 0–1 and drives the cone and its little green light. */
export const Speaker: React.FC<{ position: Vec3; rotationY?: number; pulse?: number; wide?: number; tall?: number }> = ({
  position,
  rotationY = 0,
  pulse = 0,
  wide = 0.62,
  tall = 0.9,
}) => (
  <group position={position} rotation-y={rotationY}>
    <Block size={[wide, tall, 0.5]} color="#12141a" />
    <Block position={[0, -0.1, 0.26]} size={[wide * 0.72, tall * 0.5, 0.03]} color="#20242c" />
    <Block
      position={[0, -0.1, 0.285]}
      size={[wide * (0.5 + 0.08 * Math.sin(pulse * 9)), tall * (0.34 + 0.05 * Math.sin(pulse * 9)), 0.02]}
      color="#2c323c"
    />
    <Block position={[0, tall * 0.3, 0.26]} size={[wide * 0.3, tall * 0.18, 0.03]} color="#3a414c" />
    <Block
      position={[wide * 0.32, -tall * 0.4, 0.265]}
      size={[0.05, 0.05, 0.02]}
      color="#6adf7a"
      emissive="#4be05f"
      emissiveIntensity={0.8}
    />
  </group>
);

/** A wooden crate: the speaker stands on one, and the records live in another. */
export const Crate: React.FC<{ position: Vec3; rotationY?: number; size?: number }> = ({ position, rotationY = 0, size = 0.6 }) => (
  <group position={position} rotation-y={rotationY}>
    <Vox kind="planks" position={[0, size / 2, 0]} size={[size, size, size]} tint="#a37a45" />
    <Block position={[0, size * 0.5, size / 2 + 0.005]} size={[size * 0.72, size * 0.72, 0.02]} color="#8a6435" />
  </group>
);

/** A turntable: plinth, platter, record, and the arm that never quite lands. */
export const Turntable: React.FC<{
  position: Vec3;
  rotationY?: number;
  /** Radians per second the record turns at. 0 = stopped. */
  spin?: number;
  /** 0–1: the arm is down. */
  arm?: number;
  label?: string;
  lit?: number;
}> = ({ position, rotationY = 0, spin = 3.5, arm = 0, label, lit = 0.6 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block size={[0.62, 0.09, 0.5]} color="#2a2d33" />
    <Block position={[0, 0.055, 0]} size={[0.5, 0.02, 0.44]} color="#1a1c21" />
    <group position={[0, 0.075, 0]}>
      <Block size={[0.42, 0.012, 0.42]} color="#0c0c0e" rotation={[0, spin, 0]} />
      <Block position={[0, 0.008, 0]} size={[0.13, 0.012, 0.13]} color={label ?? "#d8a33a"} rotation={[0, spin, 0]} />
    </group>
    <Block position={[0.24, 0.11 + (1 - arm) * 0.05, -0.1]} size={[0.03, 0.16, 0.03]} color="#c9ccd2" rotation={[0, 0, arm * 0.5]} />
    <Block position={[0.15, 0.14, -0.04]} size={[0.1, 0.015, 0.02]} color="#c9ccd2" rotation={[0, 0.6, 0]} />
    <Block position={[-0.24, 0.06, 0.2]} size={[0.05, 0.02, 0.05]} color="#6adf7a" emissive="#4be05f" emissiveIntensity={lit} />
  </group>
);

/** One record, in its sleeve, for a crate or a hand. */
export const Record: React.FC<{ position: Vec3; rotationY?: number; sleeve?: boolean; tilt?: number }> = ({
  position,
  rotationY = 0,
  sleeve = true,
  tilt = 0,
}) => (
  <group position={position} rotation={[tilt, rotationY, 0]}>
    <Block size={[0.33, 0.34, 0.012]} color={sleeve ? "#e7e2d4" : "#0c0c0e"} />
    <Block position={[0, 0, 0.008]} size={[0.11, 0.11, 0.004]} color="#c0402f" />
  </group>
);

/** The cake on the table, and the slice of it that ends up on the floor. */
export const Cake: React.FC<{ position: Vec3; candles?: number; squashed?: boolean }> = ({ position, candles = 5, squashed = false }) => (
  <group position={position}>
    <Block size={[0.42, squashed ? 0.09 : 0.24, 0.42]} color="#f2e6cf" />
    <Block position={[0, (squashed ? 0.09 : 0.24) / 2, 0]} size={[0.43, 0.05, 0.43]} color="#e39aa8" />
    {Array.from({ length: squashed ? 0 : candles }, (_, i) => (
      <group key={i} position={[-0.12 + (i % 3) * 0.12, 0.16, -0.1 + Math.floor(i / 3) * 0.14]}>
        <Block size={[0.025, 0.12, 0.025]} color="#f7f1e4" />
        <Block position={[0, 0.075, 0]} size={[0.03, 0.03, 0.03]} color="#ffcf6a" emissive="#ffb347" emissiveIntensity={1.6} />
      </group>
    ))}
  </group>
);

/** A plastic garden chair, the kind every birthday in this town has. */
export const Chair: React.FC<{ position: Vec3; rotationY?: number; colour?: string }> = ({ position, rotationY = 0, colour = "#e8e4d8" }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.42, 0]} size={[0.44, 0.05, 0.44]} color={colour} />
    <Block position={[0, 0.62, -0.19]} size={[0.44, 0.4, 0.05]} color={colour} />
    {[
      [-0.18, -0.18],
      [0.18, -0.18],
      [-0.18, 0.18],
      [0.18, 0.18],
    ].map(([x, z], i) => (
      <Block key={i} position={[x, 0.2, z]} size={[0.05, 0.4, 0.05]} color={colour} />
    ))}
  </group>
);

/** A phone with the party already on it. */
export const Phone: React.FC<{ position: Vec3; rotationY?: number; glow?: number }> = ({ position, rotationY = 0, glow = 1 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block size={[0.13, 0.24, 0.02]} color="#141519" />
    <Block position={[0, 0, 0.012]} size={[0.11, 0.21, 0.005]} color="#9fd8ff" emissive="#7ec8ff" emissiveIntensity={glow} />
  </group>
);

/** A string of fairy lights: one emissive bulb every `every` metres between two points. */
export const FairyLights: React.FC<{ from: Vec3; to: Vec3; bulbs?: number; sag?: number; colour?: string }> = ({
  from,
  to,
  bulbs = 11,
  sag = 0.35,
  colour = "#ffd88a",
}) => (
  <>
    {Array.from({ length: bulbs }, (_, i) => {
      const k = i / (bulbs - 1);
      const x = from[0] + (to[0] - from[0]) * k;
      const z = from[2] + (to[2] - from[2]) * k;
      const y = from[1] + (to[1] - from[1]) * k - Math.sin(k * Math.PI) * sag;
      return (
        <group key={i} position={[x, y, z]}>
          <Block size={[0.05, 0.05, 0.05]} color={colour} emissive={colour} emissiveIntensity={2.2} castShadow={false} />
          <Glow position={[0, 0, 0]} size={0.5} color={colour} opacity={0.3} />
        </group>
      );
    })}
  </>
);

/** The neon over the club door: the only light in this town that is not warm. */
export const ClubSign: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <Sign position={[0, 0, 0]} width={2.5} height={0.9} title="THE DOOR" subtitle="CLUB · 11 TILL LATE" bg="#12060f" fg="#f4e9ff" accent="#d94bff" frame />
    <Glow position={[0, 0, 0.2]} size={2.4} color="#c14bff" opacity={0.35} />
  </group>
);

/** The booth: two turntables, a mixer between them, and the one lamp he works by. */
export const Booth: React.FC<{ position: Vec3; rotationY?: number; spin?: number; arm?: number; lit?: number }> = ({
  position,
  rotationY = 0,
  spin = 4,
  arm = 1,
  lit = 1,
}) => (
  <group position={position} rotation-y={rotationY}>
    <Vox kind="darkPlanks" position={[0, 0.52, 0]} size={[2.6, 1.04, 0.72]} tint="#2b2118" />
    <Block position={[0, 1.06, 0]} size={[2.66, 0.04, 0.78]} color="#15171c" />
    <Turntable position={[-0.78, 1.09, 0.02]} spin={spin} arm={arm} />
    <Turntable position={[0.78, 1.09, 0.02]} spin={spin * 0.92} arm={arm} label="#3ac1c9" />
    <group position={[0, 1.1, 0]}>
      <Block size={[0.5, 0.06, 0.42]} color="#23262d" />
      {[-0.16, -0.05, 0.06, 0.17].map((x, i) => (
        <Block
          key={i}
          position={[x, 0.06, 0.05]}
          size={[0.035, 0.05, 0.035]}
          color="#8fe0ff"
          emissive="#5ec8ff"
          emissiveIntensity={lit * (0.6 + 0.4 * Math.sin(i + spin))}
        />
      ))}
      <Block position={[0.18, 0.06, -0.1]} size={[0.08, 0.02, 0.02]} color="#ff7a5a" emissive="#ff5a3a" emissiveIntensity={lit} />
    </group>
    <Glow position={[0, 1.2, 0.1]} size={1.5} color="#7fd8ff" opacity={0.18 * lit} />
  </group>
);

/** Bottles behind the bar: proof there is money in this room. */
export const Bottles: React.FC<{ position: Vec3; rotationY?: number; count?: number }> = ({ position, rotationY = 0, count = 9 }) => (
  <group position={position} rotation-y={rotationY}>
    {Array.from({ length: count }, (_, i) => (
      <group key={i} position={[-0.9 + (i % 6) * 0.34, 0, 0.1 * Math.floor(i / 6)]}>
        <Block position={[0, 0.16, 0]} size={[0.1, 0.32, 0.1]} color={["#3fa06a", "#c08a35", "#8b4a2a", "#c9ced8"][i % 4]} opacity={i % 3 === 0 ? 0.85 : 1} transparent />
        <Block position={[0, 0.36, 0]} size={[0.04, 0.1, 0.04]} color="#2b2f36" />
      </group>
    ))}
  </group>
);

/** Four thin bars in the air: the only lighting rig this club ever bought. */
export const Rig: React.FC<{ position: Vec3; colour?: string; swing?: number }> = ({ position, colour = "#d94bff", swing = 0 }) => (
  <group position={position} rotation={[swing * 0.4, 0, swing * 0.6]}>
    <Block size={[0.06, 0.06, 0.5]} color="#1a1c21" />
    <Block position={[0, 0, 0.26]} size={[0.16, 0.16, 0.08]} color={colour} emissive={colour} emissiveIntensity={2.6} castShadow={false} />
    <Glow position={[0, 0, 0.3]} size={1.4} color={colour} opacity={0.3} />
    <LightPool position={[0, -1.9, 1.6]} width={3.4} depth={3.4} color={colour} opacity={0.1} />
  </group>
);

/** The one lamp in the bedroom, and the one in the kitchen. */
export const WarmLamp: React.FC<{ position: Vec3; size?: number; colour?: string }> = ({ position, size = 0.28, colour = "#ffcf8a" }) => (
  <group position={position}>
    <Block size={[size, size, size]} color={colour} emissive={colour} emissiveIntensity={2.4} castShadow={false} />
    <Glow position={[0, 0, 0]} size={1.9} color={colour} opacity={0.34} />
    <LightPool position={[0, -1.7, 0]} width={3.6} depth={3.6} color={colour} opacity={0.13} />
  </group>
);

/** A poster on a wall: blocky art, no text, so it reads at phone size as a shape. */
export const Poster: React.FC<{ position: Vec3; rotationY?: number; colour?: string; shape?: "pulse" | "sun" | "bars" }> = ({
  position,
  rotationY = 0,
  colour = "#d94bff",
  shape = "pulse",
}) => (
  <group position={position} rotation-y={rotationY}>
    <Block size={[0.62, 0.86, 0.02]} color="#14161a" />
    {shape === "pulse" ? (
      <>
        <Block position={[0, 0, 0.015]} size={[0.5, 0.74, 0.01]} color={colour} opacity={0.28} transparent />
        <Block position={[0, -0.02, 0.03]} size={[0.5, 0.03, 0.01]} color={colour} emissive={colour} emissiveIntensity={1.1} />
        <Block position={[0, 0.12, 0.03]} size={[0.5, 0.03, 0.01]} color={colour} emissive={colour} emissiveIntensity={1.1} />
      </>
    ) : shape === "sun" ? (
      <>
        <Block position={[0, 0.05, 0.02]} size={[0.34, 0.34, 0.01]} color={colour} emissive={colour} emissiveIntensity={0.8} />
        <Block position={[0, -0.28, 0.02]} size={[0.5, 0.06, 0.01]} color="#2b2f36" />
      </>
    ) : (
      <>
        {[-0.16, 0, 0.16].map((y, i) => (
          <Block key={i} position={[0, y, 0.02]} size={[0.4, 0.07, 0.01]} color={i === 1 ? "#ffd88a" : colour} emissive={i === 1 ? "#ffd88a" : colour} emissiveIntensity={0.9} />
        ))}
      </>
    )}
  </group>
);

/** A mug, a tea towel, a table: the kitchen where the cake is wiped off the floor. */
export const Mug: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block size={[0.12, 0.14, 0.12]} color="#e9e3d6" />
    <Block position={[0.08, 0, 0]} size={[0.03, 0.08, 0.03]} color="#e9e3d6" />
  </group>
);

/** A crate of records, carried. */
export const RecordCrate: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <Vox kind="planks" position={[0, 0.14, 0]} size={[0.5, 0.28, 0.36]} tint="#9a7440" />
    {Array.from({ length: 7 }, (_, i) => (
      <Record key={i} position={[-0.16 + i * 0.05, 0.2, 0]} rotationY={1.57} tilt={0} />
    ))}
  </group>
);

void PixelText;
void Torch;

import type React from "react";
import { MinecraftAvatar, Vox, useFilmTime } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { ADULT, CHILD, IronGolem, KID, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  Bell, Bubble, SubscribeSign, Well,
  ease, pop, ramp,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const DAY = "overworld-day";
export const NIGHT = "overworld-night";

export const PLACE = {
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  home: [10, 0, -5] as Vec3,
};

type A = Partial<MinecraftAvatarProps>;
type Folk = {
  position?: Vec3;
  rotationY?: number;
  lean?: number;
  nod?: number;
  walk?: number;
  hmm?: number;
  turn?: number;
  lookAt?: Vec3;
  /** 0..1. His hands go over his eyes. He is a player, because a villager has no hands. */
  cover?: number;
  /** 0..1. Her hands come down. She is a player, for the same reason. */
  press?: number;
};

/** The teller. Orange, so a phone finds him in a town of brown robes. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#e8a21c", arms: "#e8a21c", legs: "#3b3fa0" }} blink {...p} />
);

const poseOf = (p: Folk, cover = false) => {
  if (cover && (p.cover ?? 0) > 0.35) return (p.hmm ?? 0) > 0.15 ? "talk" : "idle";
  if ((p.press ?? 0) > 0.4) return "leanOver";
  if ((p.walk ?? 0) > 0.2) return "walk";
  if ((p.lean ?? 0) > 0.65) return "crouch";
  if ((p.nod ?? 0) < -0.2) return "reachUp";
  if ((p.hmm ?? 0) > 0.15) return "talk";
  return "idle";
};

/**
 * His friend. A player kid, blue shirt, so the hands in the voice are real hands.
 * A villager cannot cover his eyes.
 */
export const Friend: React.FC<Folk> = (p) => (
  <MinecraftAvatar
    position={p.position}
    rotationY={(p.rotationY ?? 0) + (p.turn ?? 0)}
    scale={KID}
    outfit="tee"
    skin="#e4b08a"
    hair="#6a3a18"
    colors={{ torso: "#3d7ea6", arms: "#e4b08a", legs: "#2a3348" }}
    animation={poseOf(p, true)}
    arms={(p.cover ?? 0) > 0.35 ? "cover" : undefined}
    animDistance={p.walk}
    face={(p.cover ?? 0) > 0.35 ? "scared" : "uneasy"}
    blink
  />
);

/** His mum. A player, red shirt, so the hand on his head is a hand. */
export const Mum: React.FC<Folk> = (p) => (
  <MinecraftAvatar
    position={p.position}
    rotationY={(p.rotationY ?? 0) + (p.turn ?? 0)}
    scale={0.92}
    outfit="tee"
    skin="#c9846a"
    hair="#3a2418"
    colors={{ torso: "#9a3f34", arms: "#c9846a", legs: "#3a3350" }}
    animation={poseOf(p)}
    animDistance={p.walk}
    face={(p.press ?? 0) > 0.4 ? "worried" : (p.nod ?? 0) < -0.2 ? "surprised" : "neutral"}
    blink
  />
);

export const Dad: React.FC<Folk> = ({ cover: _cover, press: _press, ...p }) => <Villager scale={ADULT} robe={ROBE.farmer} hat="straw" {...p} />;
export const Baker: React.FC<Folk> = ({ cover: _cover, press: _press, ...p }) => <Villager scale={ADULT} robe={ROBE.white} hat="straw" {...p} />;

/** A kid with both hands up, for a rope that the line says has hands on it. */
export const Puller: React.FC<{ position?: Vec3; rotationY?: number; tint?: string }> = ({ position = [0, 0, 0], rotationY = 0, tint = "#6a8f4a" }) => (
  <MinecraftAvatar position={position} rotationY={rotationY} scale={0.76} outfit="tee" skin="#d7a57e" hair="#3a2415" colors={{ torso: tint, arms: "#d7a57e", legs: "#334155" }} animation="reachUp" face="fear" />
);

const CROWD_ROBE = [ROBE.brown, ROBE.blue, ROBE.farmer, ROBE.elder, ROBE.smith, ROBE.friend, ROBE.white, ROBE.red];

/** The rest of the square. `up` 0 is every nose in the dirt. `up` 1 is every chin raised. */
export const Crowd: React.FC<{ n?: number; up?: number; at?: Vec3; walk?: number }> = ({ n = 8, up = 0, at = [0, 0, 0.4], walk = 0 }) => (
  <>
    {Array.from({ length: n }).map((_, i) => {
      const a = (i / Math.max(n, 1)) * Math.PI * 2 + 0.4;
      const r = 2.4 + (i % 3) * 0.55;
      const x = at[0] + Math.cos(a) * r;
      const z = at[2] + Math.sin(a) * r;
      const bow = 1.15 * (1 - up);
      return (
        <Villager
          key={i}
          position={[x, 0, z]}
          rotationY={Math.atan2(at[0] - x, at[2] - z)}
          scale={i % 4 === 0 ? CHILD : ADULT}
          kid={i % 4 === 0}
          robe={CROWD_ROBE[i % CROWD_ROBE.length]}
          hat={i % 3 === 0 ? "straw" : "none"}
          lean={bow}
          nod={bow * 0.5 - up * 0.45}
          walk={walk}
        />
      );
    })}
  </>
);

export const Golem: React.FC<{ position?: Vec3; rotationY?: number; bow?: number; walk?: number }> = ({ position = [0, 0, 0], rotationY = 0, bow = 0, walk = 0 }) => (
  <IronGolem position={position} rotationY={rotationY} bow={bow} walk={walk} />
);

/** A fill from the camera side, so a face at night is not a hole. */
export const Fill: React.FC<{ on: Vec3; yaw?: number; power?: number }> = ({ on, yaw = 0, power = 5 }) => {
  const a = (yaw * Math.PI) / 180;
  return <pointLight position={[on[0] + Math.sin(a) * 1.6, on[1] + 0.4, on[2] + Math.cos(a) * 1.6]} intensity={power} distance={8} color="#e7eeff" />;
};

/** The rope under the bell. `pull` 0..1 drops it. */
export const BellRope: React.FC<{ pull?: number }> = ({ pull = 0 }) => (
  <group position={[PLACE.bell[0], 2.15 - pull * 0.45, PLACE.bell[2] + 0.15]}>
    <Vox kind="wool" tint="#6a3a28" position={[0, -0.85, 0]} size={[0.08, 1.7, 0.08]} />
    <Vox kind="wool" tint="#8a4a30" position={[0, -1.7, 0]} size={[0.16, 0.12, 0.16]} />
  </group>
);

/**
 * The thing the law was written for. One eye, too many legs, and it comes out of a hole.
 * The eye sits on the front of the body, not on a stack that leaves the frame.
 * `reach` 0..1 drops the front leg. `turn` points the eye (0 faces +Z, toward a camera on that side).
 */
export const SkyThing: React.FC<{ position?: Vec3; scale?: number; legs?: number; reach?: number; turn?: number }> = ({
  position = [0, 16, -6],
  scale = 1,
  legs = 8,
  reach = 0,
  turn = 0,
}) => {
  const t = useFilmTime();
  const n = Math.max(6, legs);
  return (
    <group position={position} scale={scale} rotation={[Math.sin(t * 0.8) * 0.04, turn, Math.sin(t * 0.45) * 0.03]}>
      <Vox kind="obsidian" position={[0, 0, 0]} size={[3.3, 1.9, 2.3]} />
      <Vox kind="wool" tint="#2c313a" position={[0, -0.15, 0.72]} size={[2.3, 1.15, 0.7]} />
      <Vox kind="obsidian" position={[0.05, 0.82, 1.05]} size={[1.7, 0.28, 0.36]} />
      <Vox kind="wool" tint="#f4d35e" position={[0.06, 0.22, 1.22]} size={[1.22, 1.02, 0.16]} />
      <Vox kind="wool" tint="#140e08" position={[0.2, 0.14, 1.32]} size={[0.4, 0.46, 0.08]} />
      {Array.from({ length: n }).map((_, i) => {
        const side = i - (n - 1) / 2;
        const len = 2.05 + (i % 3) * 0.5;
        return (
          <group key={i} position={[side * 0.46, -0.72, i % 2 === 0 ? 0.4 : -0.5]} rotation={[0.5, 0, side * 0.16]}>
            <Vox kind="obsidian" position={[0, -len / 2, 0]} size={[0.4, len, 0.4]} />
            <Vox kind="obsidian" position={[0, -len + 0.05, 0.16]} size={[0.52, 0.24, 0.62]} />
          </group>
        );
      })}
      <group position={[0.15, -0.4, 0.85]} rotation={[0.85 + reach * 0.65, 0, 0.08]}>
        <Vox kind="obsidian" position={[0, -1.35 - reach * 0.7, 0]} size={[0.5, 2.7 + reach * 1.5, 0.5]} />
      </group>
    </group>
  );
};

/** A ring with nothing in the middle. Sky shows through it, so it is a hole and not a platform. */
export const SkyHole: React.FC<{ position?: Vec3; open?: number }> = ({ position = [0, 8, -6], open = 1 }) => (
  <group position={position} rotation={[1.05, 0.12, 0]} scale={Math.max(0.06, open)}>
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * Math.PI * 2;
      return <Vox key={i} kind="obsidian" position={[Math.cos(a) * 2.15, Math.sin(a) * 0.22, Math.sin(a) * 1.55]} size={[0.78, 0.42, 0.78]} />;
    })}
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * Math.PI * 2 + 0.2;
      return <Vox key={`r${i}`} kind="stone" tint="#d0d4da" position={[Math.cos(a) * 2.7, 0.15, Math.sin(a) * 1.95]} size={[0.48, 0.26, 0.48]} />;
    })}
  </group>
);

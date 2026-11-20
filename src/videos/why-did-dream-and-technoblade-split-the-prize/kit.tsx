import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, MinecraftAvatar, PixelText } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { Coin, Chest, filmClock, flightScene, near, stop } from "../../../Topics/Explainer";
import timingJson from "./timing.json";

export { Block, Clouds, Dust, Glow, GodRay, LightPool, PixelText } from "../../engine";
export { Coin, Chest, Bridge, Island, Sun, flightScene, near, stop, unbroken } from "../../../Topics/Explainer";

export const timing = timingJson as unknown as Timing;
export const clock = filmClock(timing);

/** Four linked islands; one continuous sky and no off-screen resets. */
export const PLACE = {
  arena: [0, 0, 0] as Vec3,
  versions: [17, 1.5, -1] as Vec3,
  score: [34, 3, -2] as Vec3,
  prize: [51, 4.5, -1] as Vec3,
};
export const on = (origin: Vec3, x: number, y: number, z: number): Vec3 => [origin[0] + x, origin[1] + y, origin[2] + z];

/**
 * The familiar silhouettes rebuilt as voxel-style accessories, not claimed as exact match-era skin textures.
 * The source video credits Shokunin and Lovenymph but does not assign the two skins to creators.
 */
const DreamHead: React.FC = () => (
  <>
    {/* A white smile mask inside a bright lime hood. */}
    <Block position={[0, 0.0, 0.266]} size={[0.43, 0.42, 0.035]} color="#f4f3ed" castShadow={false} />
    <Block position={[-0.105, 0.07, 0.292]} size={[0.052, 0.055, 0.018]} color="#171a18" castShadow={false} />
    <Block position={[0.105, 0.07, 0.292]} size={[0.052, 0.055, 0.018]} color="#171a18" castShadow={false} />
    <Block position={[0, -0.095, 0.293]} size={[0.19, 0.035, 0.018]} color="#171a18" castShadow={false} />
    <Block position={[-0.105, -0.072, 0.293]} size={[0.04, 0.045, 0.018]} color="#171a18" castShadow={false} />
    <Block position={[0.105, -0.072, 0.293]} size={[0.04, 0.045, 0.018]} color="#171a18" castShadow={false} />
    <Block position={[0, 0.25, 0]} size={[0.58, 0.11, 0.58]} color="#1bc43b" />
    <Block position={[-0.255, 0.02, 0]} size={[0.08, 0.36, 0.57]} color="#18b935" />
    <Block position={[0.255, 0.02, 0]} size={[0.08, 0.36, 0.57]} color="#18b935" />
    <Block position={[0, -0.22, -0.015]} size={[0.54, 0.07, 0.53]} color="#16b332" />
  </>
);

const TechnoHead: React.FC = () => (
  <>
    <Block position={[0, 0.005, 0.018]} size={[0.53, 0.5, 0.53]} color="#e49a9c" />
    <Block position={[0, -0.08, 0.31]} size={[0.21, 0.14, 0.105]} color="#f2b5b3" />
    <Block position={[-0.05, -0.08, 0.37]} size={[0.033, 0.04, 0.018]} color="#71333a" />
    <Block position={[0.05, -0.08, 0.37]} size={[0.033, 0.04, 0.018]} color="#71333a" />
    <Block position={[-0.14, 0.1, 0.29]} size={[0.065, 0.05, 0.02]} color="#262328" />
    <Block position={[0.14, 0.1, 0.29]} size={[0.065, 0.05, 0.02]} color="#262328" />
    <Block position={[-0.19, 0.28, 0]} size={[0.15, 0.18, 0.15]} color="#d88489" />
    <Block position={[0.19, 0.28, 0]} size={[0.15, 0.18, 0.15]} color="#d88489" />
    <Block position={[0, 0.3, 0]} size={[0.57, 0.09, 0.48]} color="#e5b83e" />
    {[-0.19, -0.06, 0.07, 0.2].map((x, i) => (
      <Block key={i} position={[x, i === 1 || i === 2 ? 0.43 : 0.4, 0]} size={[0.105, i === 1 || i === 2 ? 0.17 : 0.12, 0.11]} color="#f2ca55" />
    ))}
    <Block position={[0, 0.32, 0.25]} size={[0.07, 0.07, 0.025]} color="#3196c2" />
  </>
);

type Avatar = Partial<MinecraftAvatarProps>;

export const Dream: React.FC<Avatar> = ({ position = [0, 0, 0], rotationY = 0.42, ...props }) => (
  <MinecraftAvatar
    position={position}
    rotationY={rotationY}
    scale={0.94}
    outfit="hoodie"
    skin="#d6a17b"
    hair="#3b2a20"
    colors={{ torso: "#18bf39", arms: "#18bf39", legs: "#282a31" }}
    head={<DreamHead />}
    blink
    shadow
    {...props}
  />
);

export const Technoblade: React.FC<Avatar> = ({ position = [0, 0, 0], rotationY = -0.42, scale = 1, ...props }) => (
  <group position={position} rotation-y={rotationY} scale={scale}>
    <Block position={[0, 0.94, -0.22]} size={[0.67, 0.98, 0.055]} color="#941f2f" />
    <Block position={[0, 1.38, 0.018]} size={[0.45, 0.06, 0.085]} color="#edbd48" />
    <MinecraftAvatar
      position={[0, 0, 0]}
      scale={1}
      outfit="hoodie"
      skin="#e49a9c"
      hair="#e49a9c"
      colors={{ torso: "#a32636", arms: "#a32636", legs: "#332832" }}
      head={<TechnoHead />}
      blink
      shadow
      {...props}
    />
  </group>
);

/** Readable diegetic board: text and score are geometry in the arena, not a screen overlay. */
export const Board: React.FC<{ at: Vec3; title: string; score: string; width?: number; glow?: number }> = ({ at, title, score, width = 4.2, glow = 0 }) => (
  <group position={at}>
    <Block position={[0, 0, -0.1]} size={[width, 1.85, 0.2]} color="#202a37" />
    <Block position={[0, 0.88, 0.02]} size={[width - 0.16, 0.14, 0.04]} color="#c69639" emissive="#eab64a" emissiveIntensity={0.12 + glow} />
    <PixelText text={title} position={[0, 0.48, 0.03]} height={0.3} maxWidth={width - 0.3} color="#ffe7a3" />
    {score ? <PixelText text={score} position={[0, -0.2, 0.03]} height={0.62} maxWidth={width - 0.26} color="#f9fff5" /> : null}
  </group>
);

export const ScoreText: React.FC<{ at: Vec3; text: string; color?: string; height?: number }> = ({ at, text, color = "#fff2bc", height = 0.4 }) => (
  <PixelText text={text} position={at} height={height} maxWidth={5.6} color={color} />
);

/** A simple block-built duel sword, parented to an avatar's right hand. */
export const VoxelSword: React.FC<{ blade?: string; grip?: string }> = ({ blade = "#d7e5ed", grip = "#72513a" }) => (
  <group rotation={[-Math.PI / 2 + 0.08, 0, 0.22]}>
    <Block position={[0, -0.35, 0.12]} size={[0.13, 0.72, 0.13]} color={blade} metalness={0.35} />
    <Block position={[0, 0.02, 0.12]} size={[0.46, 0.1, 0.15]} color="#d0a646" />
    <Block position={[0, 0.21, 0.12]} size={[0.14, 0.34, 0.14]} color={grip} />
    <Block position={[0, 0.39, 0.12]} size={[0.2, 0.12, 0.18]} color="#d0a646" />
  </group>
);

export const STOPS = {
  open: stop(on(PLACE.arena, 0, 1.4, 0), 11.2, 12, 22, 44),
  question: stop(on(PLACE.arena, 0, 3.7, -3.7), 7.6, 4, 20, 40),
  event: stop(on(PLACE.arena, 0, 1.4, 0.2), 9.3, -8, 22, 44),
  styles: stop(on(PLACE.versions, 0, 1.7, 0.35), 14.2, 0, 19, 52),
  home: stop(on(PLACE.versions, 0, 1.3, 1.5), 10.2, 34, 18, 46),
  versions: stop(on(PLACE.versions, 0, 1.6, 0.9), 10.1, -28, 20, 46),
  advantage: near(stop(on(PLACE.versions, 0.2, 1.45, 1.3), 9.5, 0, 21, 44), { closer: 0.2, turn: 18, raise: 2 }),
  lead: stop(on(PLACE.versions, 0, 1.5, 1.4), 9.4, -24, 20, 46),
  rule: stop(on(PLACE.score, 0, 1.6, 0.2), 10.4, -16, 18, 48),
  first: stop(on(PLACE.arena, 0.2, 1.5, 1.2), 8.8, 24, 20, 46),
  answer: near(stop(on(PLACE.arena, 0.3, 1.6, 1.3), 9.1, -18, 19, 46), { closer: 0.2, turn: 24 }),
  tie: near(stop(on(PLACE.score, 0, 1.55, 0.4), 10.6, -8, 15, 48), { closer: 0.2, turn: 18 }),
  four: near(stop(on(PLACE.score, 0, 1.5, 0.4), 10.4, 34, 18, 48), { closer: 0.2, turn: -12 }),
  next: near(stop(on(PLACE.score, 0.2, 1.6, 0.35), 10.2, 0, 17, 48), { closer: 0.2, turn: -35, raise: 3, fov: 46 }),
  final: near(stop(on(PLACE.score, 0, 1.6, 0.4), 10.0, -8, 18, 48), { closer: 0.2, turn: 24 }),
  finish: near(stop(on(PLACE.score, 0, 1.55, 0.4), 9.8, 18, 17, 48), { closer: 0.2, turn: -22 }),
  whole: stop(on(PLACE.prize, 0, 1.55, 1.45), 10.8, 2, 17, 48),
  agreement: near(stop(on(PLACE.prize, 0, 1.4, 1.5), 11.2, -4, 15, 50), { closer: 0.2, turn: 28, raise: 2 }),
  pressure: stop(on(PLACE.prize, 0, 1.4, 1.6), 12.0, 0, 14, 52),
  winner: stop(on(PLACE.prize, 0, 1.5, 1.35), 11.0, 8, 16, 50),
  callback: stop(on(PLACE.arena, 0, 1.5, 0.2), 10, 12, 22, 44),
  recap: near(stop(on(PLACE.arena, 0, 1.6, 1.5), 11.2, 0, 18, 48), { closer: 0.2, turn: 8, raise: 2 }),
  reframe: near(stop(on(PLACE.arena, 0, 1.5, 1.0), 11, 12, 18, 48), { closer: 0.2, turn: -8, raise: 1 }),
  subscribe: near(stop(on(PLACE.arena, 0.6, 1.6, 0.8), 10.5, 0, 20, 48), { closer: 0.2, turn: 8 }),
};

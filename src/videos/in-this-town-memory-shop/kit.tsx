import type React from "react";
import { Block, Glow, MinecraftAvatar, Sign, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/** Story-specific cast and props. The houses, iron golem, village and animation system come from the topic pack. */
export { Bits, BedBox, Bubble, IronGolem, Lantern, ROBE, SubscribeSign, Villager, ease, jolt, pop, ramp } from "../../../Topics/InThisTown";
export { stride } from "../../engine";
export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
export const Z = { village: 0, river: 80, room: 160, shop: 240, factory: 320 } as const;
export type Place = keyof typeof Z;
export const at = (place: Place, x: number, y: number, z: number): Vec3 => [x, y, Z[place] + z];
export const mix = (a: number, b: number, p: number) => a + (b - a) * Math.max(0, Math.min(1, p));
export const smooth = (p: number) => { const k = Math.max(0, Math.min(1, p)); return k * k * (3 - 2 * k); };
export const jump = (p: number, height = 1) => 4 * height * Math.max(0, Math.min(1, p)) * (1 - Math.max(0, Math.min(1, p)));

type Actor = Partial<MinecraftAvatarProps>;
export const Hero: React.FC<Actor> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dca17f" hair="#392619" colors={{ torso: "#1b9eac", arms: "skin", legs: "#354d83" }} blink {...p} />
);
/** Her yellow scarf is attached to the head so it turns with her, not a floating sticker. */
export const Sister: React.FC<Actor> = (p) => (
  <MinecraftAvatar scale={0.72} outfit="tee" skin="#dca17f" hair="#533222" colors={{ torso: "#ad4b71", arms: "#ad4b71", legs: "#53467b" }} blink
    head={<><Block position={[0, -0.28, 0]} size={[0.54, 0.13, 0.51]} color="#f3c934" /><Block position={[0.14, -0.42, 0.26]} size={[0.12, 0.28, 0.055]} color="#f3c934" /><Block position={[0.14, -0.55, 0.26]} size={[0.12, 0.03, 0.06]} color="#bd8b19" /></>}
    {...p} />
);
export const Mom: React.FC<Actor> = (p) => (
  <MinecraftAvatar scale={0.94} outfit="tee" skin="#cb987a" hair="#51403a" colors={{ torso: "#7b6cab", arms: "#7b6cab", legs: "#485470" }} blink {...p} />
);
export const Owner: React.FC<Partial<VillagerProps>> = (p) => <Villager robe={ROBE.elder} phase={0.6} {...p} />;

/** A blue voxel of remembered experience, the visual currency of this film. */
export const Memory: React.FC<{ position: Vec3; scale?: number; turn?: number; glow?: boolean }> = ({ position, scale = 1, turn = 0, glow = true }) => (
  <group position={position} scale={scale} rotation={[turn * 0.6, turn, turn * 0.15]}>
    <Block size={[0.3, 0.3, 0.3]} color="#6ee3ff" emissive="#30d5ff" emissiveIntensity={0.7} castShadow={false} />
    <Block position={[-0.07, 0.08, 0.157]} size={[0.09, 0.08, 0.01]} color="#f2ffff" emissive="#d6ffff" emissiveIntensity={0.6} castShadow={false} />
    {glow ? <Glow position={[0, 0, 0]} size={0.75} color="#55dfff" opacity={0.3} /> : null}
  </group>
);
/** Glass sides, lid and an unmistakable blue cube, rather than an opaque box. */
export const Jar: React.FC<{ position: Vec3; scale?: number; filled?: boolean; label?: boolean; tilt?: number }> = ({ position, scale = 1, filled = true, label = false, tilt = 0 }) => (
  <group position={position} scale={scale} rotation={[0, 0, tilt]}>
    <Block position={[0, 0.055, 0]} size={[0.67, 0.11, 0.55]} color="#90abb2" />
    <Block position={[0, 0.86, 0]} size={[0.68, 0.11, 0.56]} color="#795a3b" />
    <Block position={[0, 0.96, 0]} size={[0.48, 0.09, 0.42]} color="#b18a5a" />
    {[-1, 1].map((s) => <Block key={s} position={[s * 0.32, 0.46, 0]} size={[0.045, 0.76, 0.55]} color="#a4e8ef" transparent opacity={0.4} castShadow={false} />)}
    <Block position={[0, 0.46, -0.27]} size={[0.63, 0.76, 0.04]} color="#b4f3ff" transparent opacity={0.17} castShadow={false} />
    <Block position={[0, 0.46, 0.28]} size={[0.63, 0.76, 0.025]} color="#d6faff" transparent opacity={0.2} castShadow={false} />
    {filled ? <Memory position={[0, 0.47, 0]} scale={1.05} glow={false} /> : null}
    {label ? <Sign position={[0, 0.27, 0.3]} width={0.43} height={0.19} title="ELI" bg="#f8e5b1" fg="#493b2b" frame={false} lit={0.05} /> : null}
  </group>
);
/** A real folded, blocky little boat. It can float, sink, be held or sit in a doorway. */
export const Boat: React.FC<{ position: Vec3; scale?: number; turn?: number; tilt?: number }> = ({ position, scale = 1, turn = 0, tilt = 0 }) => (
  <group position={position} scale={scale} rotation={[tilt, turn, 0]}>
    <Block position={[0, 0.07, 0]} size={[0.7, 0.12, 0.32]} color="#f5f0dc" />
    <Block position={[0, 0.16, 0.17]} size={[0.7, 0.16, 0.06]} color="#fffbee" rotation={[0.22, 0, 0]} />
    <Block position={[0, 0.16, -0.17]} size={[0.7, 0.16, 0.06]} color="#e5e2d1" rotation={[-0.22, 0, 0]} />
    <Block position={[-0.34, 0.15, 0]} size={[0.07, 0.17, 0.32]} color="#fffbee" />
    <Block position={[0.34, 0.15, 0]} size={[0.07, 0.17, 0.32]} color="#fffbee" />
    <Block position={[0, 0.25, 0]} size={[0.08, 0.24, 0.21]} color="#dcd9c9" rotation={[0, 0, 0.65]} />
  </group>
);
export const Emerald: React.FC<{ position: Vec3; scale?: number; turn?: number }> = ({ position, scale = 1, turn = 0 }) => (
  <group position={position} scale={scale} rotation={[0.25, turn + 0.45, 0.35]}>
    <Block size={[0.34, 0.34, 0.34]} color="#20d47c" emissive="#02b954" emissiveIntensity={0.45} />
    <Block position={[-0.08, 0.08, 0.175]} size={[0.1, 0.1, 0.01]} color="#b3ffd6" castShadow={false} />
  </group>
);
/** A visible trail of small memories following a curved path between a head and a jar. */
export const MemoryStream: React.FC<{ from: Vec3; to: Vec3; p: number; count?: number }> = ({ from, to, p, count = 7 }) => (
  <>{Array.from({ length: count }, (_, i) => {
    const u = Math.max(0, Math.min(1, p * 1.55 - i * 0.09));
    return <Memory key={i} position={[mix(from[0], to[0], u), mix(from[1], to[1], u) + Math.sin(u * Math.PI) * 0.55, mix(from[2], to[2], u)]} scale={0.42 + (i % 3) * 0.08} turn={p * 3 + i} glow={false} />;
  })}</>
);
export const Bread: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => <group position={position} scale={scale}><Block position={[0, 0.12, 0]} size={[0.52, 0.24, 0.3]} color="#c8893e" /><Block position={[0, 0.25, 0]} size={[0.44, 0.09, 0.27]} color="#eab85e" />{[-0.12, 0.08].map((x) => <Block key={x} position={[x, 0.3, 0]} size={[0.04, 0.015, 0.22]} color="#f4d68e" />)}</group>;
export const Basket: React.FC<{ position: Vec3; full?: boolean; scale?: number }> = ({ position, full = true, scale = 1 }) => (
  <group position={position} scale={scale}>
    <Vox kind="planks" tint="#a36c3f" position={[0, 0.22, 0]} size={[0.95, 0.42, 0.64]} />
    <Block position={[0, 0.45, 0]} size={[1, 0.07, 0.7]} color="#d7a15e" />
    {[-0.35, 0.35].map((x) => <Block key={x} position={[x, 0.64, 0]} size={[0.08, 0.43, 0.08]} color="#7b4c2c" />)}
    <Block position={[0, 0.84, 0]} size={[0.76, 0.08, 0.08]} color="#7b4c2c" />
    {full ? <><Bread position={[-0.18, 0.47, 0]} scale={0.8} /><Block position={[0.24, 0.58, 0]} size={[0.25, 0.25, 0.25]} color="#d86f39" /></> : null}
  </group>
);
export const Boots: React.FC<{ position: Vec3 }> = ({ position }) => <group position={position}>{[-0.18, 0.18].map((x) => <group key={x}><Block position={[x, 0.17, 0]} size={[0.26, 0.34, 0.25]} color="#76503b" /><Block position={[x, 0.09, 0.12]} size={[0.27, 0.18, 0.38]} color="#875b3d" /></group>)}</group>;
export const Ladder: React.FC<{ position: Vec3; tilt?: number }> = ({ position, tilt = 0 }) => <group position={position} rotation={[tilt, 0, 0]}>{[-0.35, 0.35].map((x) => <Vox key={x} kind="log" position={[x, 1.25, 0]} size={[0.1, 2.5, 0.1]} />)}{Array.from({ length: 7 }, (_, i) => <Block key={i} position={[0, 0.25 + i * 0.32, 0.03]} size={[0.65, 0.09, 0.09]} color="#b5804b" />)}</group>;
export const DeadCrops: React.FC<{ position: Vec3 }> = ({ position }) => <group position={position}><Vox kind="dirt" position={[0, 0, 0]} size={[3.2, 0.12, 2.4]} />{Array.from({ length: 12 }, (_, i) => <group key={i} position={[(i % 4 - 1.5) * 0.7, 0.05, (Math.floor(i / 4) - 1) * 0.65]} rotation={[0, 0, i % 2 ? 0.5 : -0.35]}><Block position={[0, 0.32, 0]} size={[0.055, 0.64, 0.055]} color="#756b39" /><Block position={[0.12, 0.45, 0]} size={[0.29, 0.06, 0.05]} color="#8c804a" /></group>)}</group>;
export const Note: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => <group position={position} scale={scale}><Block position={[0, 0, 0]} size={[0.72, 0.04, 0.55]} color="#fff6d9" />{[-0.15, -0.04, 0.07].map((z) => <Block key={z} position={[-0.04, 0.025, z]} size={[0.43, 0.008, 0.02]} color="#705f4d" castShadow={false} />)}</group>;
export const Portrait: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => <group position={position} scale={scale}><Block size={[0.62, 0.8, 0.08]} color="#f5ebcf" /><Block position={[0, 0.11, 0.05]} size={[0.32, 0.35, 0.025]} color="#bd8668" /><Block position={[0, 0.29, 0.07]} size={[0.38, 0.1, 0.035]} color="#533222" /><Block position={[0, -0.21, 0.06]} size={[0.4, 0.24, 0.03]} color="#ad4b71" /><Block position={[0, -0.09, 0.09]} size={[0.39, 0.07, 0.03]} color="#f3c934" /></group>;
export const Pipe: React.FC<{ position: Vec3 }> = ({ position }) => <group position={position}><Block position={[0, 1.7, 0]} size={[0.17, 3.4, 0.17]} color="#7d8e91" metalness={0.4} />{[0.7, 2.0, 3.2].map((y) => <Block key={y} position={[0, y, 0]} size={[0.29, 0.1, 0.22]} color="#4d6166" />)}</group>;
export const Cart: React.FC<{ position: Vec3; potatoes?: boolean }> = ({ position, potatoes = true }) => <group position={position}><Vox kind="planks" position={[0, 0.58, 0]} size={[1.65, 0.65, 1.1]} /><Block position={[0, 0.93, 0]} size={[1.75, 0.09, 1.2]} color="#745138" />{[-0.58, 0.58].flatMap((x) => [-0.62, 0.62].map((z) => <group key={`${x}-${z}`} position={[x, 0.24, z]}><Block size={[0.43, 0.43, 0.11]} color="#3b3531" /><Block position={[0, 0, 0.065]} size={[0.16, 0.16, 0.03]} color="#a99a75" /></group>))}{potatoes ? <><Block position={[-0.28, 1.06, 0]} size={[0.55, 0.28, 0.5]} color="#b79566" /><Block position={[0.32, 1.07, 0]} size={[0.6, 0.3, 0.52]} color="#c0a57e" />{[-0.3, 0, 0.3].map((x) => <Block key={x} position={[x, 1.25, 0.05]} size={[0.18, 0.13, 0.17]} color="#b78a4a" />)}</> : null}</group>;
/** Gear and press are jointed and moved on the same shot clock as the actors. */
export const Gear: React.FC<{ position: Vec3; t: number; size?: number }> = ({ position, t, size = 1 }) => <group position={position} rotation={[0, 0, t]} scale={size}><Block size={[0.55, 0.55, 0.16]} color="#6b7775" metalness={0.5} />{Array.from({ length: 8 }, (_, i) => <group key={i} rotation={[0, 0, i * Math.PI / 4]}><Block position={[0, 0.37, 0]} size={[0.17, 0.26, 0.16]} color="#8c9790" metalness={0.4} /></group>)}<Block position={[0, 0, 0.09]} size={[0.18, 0.18, 0.07]} color="#dcad4d" /></group>;
export const Machine: React.FC<{ t: number; down?: number; jarX?: number; jar?: boolean; label?: boolean; emerald?: boolean; stopped?: boolean }> = ({ t, down = 0, jarX = -1.1, jar = true, label = false, emerald = false, stopped = false }) => (
  <group position={[0, 0, Z.factory]}>
    <Vox kind="darkPlanks" tint="#343c3e" position={[0, 0.78, 0]} size={[7, 0.26, 1.45]} />
    {[-3, -2, -1, 0, 1, 2, 3].map((x) => <Block key={x} position={[x, 0.94, 0]} size={[0.08, 0.04, 1.35]} color="#697374" />)}
    {[-3.1, 3.1].map((x) => <Vox key={x} kind="cobble" position={[x, 0.35, 0]} size={[0.35, 0.7, 1.5]} />)}
    <Vox kind="stoneBrick" tint="#6a6c69" position={[0.9, 2.5, -0.58]} size={[2.3, 2.8, 0.3]} />
    <Block position={[0.9, 3.52, 0]} size={[1.75, 0.22, 1.28]} color="#9b9e91" metalness={0.5} />
    <Block position={[0.9, 2.9 - down * 1.05, 0]} size={[0.38, 1.1, 0.38]} color="#989d9a" metalness={0.6} />
    <Block position={[0.9, 2.27 - down * 1.05, 0]} size={[1.25, 0.25, 1.1]} color="#b9b7a6" metalness={0.5} />
    <Gear position={[-1.75, 1.4, 0.72]} t={stopped ? 0.3 : -t * 2.2} size={1.05} />
    <Gear position={[-2.58, 1.15, 0.72]} t={stopped ? 0.2 : t * 2.2} size={0.65} />
    {jar ? <Jar position={[jarX, 0.95, 0]} scale={0.82} label={label} /> : null}
    {emerald ? <Emerald position={[1.03, 1.08, 0]} scale={0.9} turn={t} /> : null}
  </group>
);
export const Lever: React.FC<{ position: Vec3; pulled?: number }> = ({ position, pulled = 0 }) => <group position={position}><Block position={[0, 0.15, 0]} size={[0.5, 0.3, 0.35]} color="#6e7674" /><group position={[0, 0.3, 0]} rotation={[0, 0, mix(-0.65, 0.7, pulled)]}><Block position={[0, 0.35, 0]} size={[0.12, 0.7, 0.12]} color="#adada1" /><Block position={[0, 0.7, 0]} size={[0.24, 0.22, 0.22]} color="#e32a28" emissive="#af100e" emissiveIntensity={0.3} /></group></group>;
/** A taut strip of yellow cloth joining her neck to the moving gear. */
export const ScarfTether: React.FC<{ from: Vec3; to: Vec3 }> = ({ from, to }) => { const dx = to[0] - from[0], dy = to[1] - from[1], dz = to[2] - from[2]; const len = Math.hypot(dx, dy, dz); return <group position={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2]} rotation={[0, 0, -Math.atan2(dx, dy)]}><Block size={[0.13, len, 0.075]} color="#f3c934" /></group>; };

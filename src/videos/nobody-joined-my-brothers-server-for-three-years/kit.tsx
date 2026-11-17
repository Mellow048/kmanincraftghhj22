import type React from "react";
import { Bed, Block, Glow, LightPool, MinecraftAvatar, Monitor, PixelText, Sign, Torch, Tree, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, SubscribeSign, ease, pop, ramp, wordClock } from "../../../Topics/Stories";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * Two brothers and one castle. The younger one has kept a server alive for three years on his own,
 * one block a night, for an older brother who has not logged on once — and the film is about the
 * night that stops being true.
 *
 * Three places, far apart so every beat arrives with a new picture: the boy's room where the
 * player list lives, the hill with the half-built castle, and the spawn point where he leaves
 * things for his brother to find.
 *
 * 1 unit = 1 block = 1 metre. `PLACE` is where each set sits; everything inside a set is written
 * relative to it with `at()`.
 */
export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

/** The sets. */
export const PLACE = {
  room: [0, 0, 0] as Vec3,
  hill: [16, 0, 0] as Vec3,
  spawn: [-16, 0, 0] as Vec3,
};

/** A point inside a set, written relative to the set's own origin. */
export const at = (p: Vec3, x: number, y: number, z: number): Vec3 => [p[0] + x, p[1] + y, p[2] + z];

/**
 * The narrator: the younger brother. Twelve when his brother left, fifteen now, and every night of
 * the three years is on him. Green hoodie, because he is the one who stays.
 */
export const Kid: React.FC<Partial<MinecraftAvatarProps>> = (p) => (
  <MinecraftAvatar
    scale={KID}
    skin="#e6b184"
    hair="#241a12"
    outfit="tee"
    colors={{ torso: "#2f7d4f", arms: "#2f7d4f", legs: "#33384a" }}
    blink
    {...p}
  />
);

/**
 * The brother: nineteen, gone three years, in the jacket he left in. He is the only other person in
 * the film, and he does not appear until the last fifteen seconds.
 */
export const Brother: React.FC<Partial<MinecraftAvatarProps>> = (p) => (
  <MinecraftAvatar
    scale={1.04}
    skin="#d8a97a"
    hair="#171310"
    outfit="hoodie"
    colors={{ torso: "#8a3f2f", arms: "#8a3f2f", legs: "#2a2f3d" }}
    blink
    {...p}
  />
);

/**
 * The castle on the hill, half finished.
 *
 * `filled` is how much of the broken wall has been filled in, block by block, one a night (0 to 1).
 * `roof` is the roof he never started, finished three years later by his little brother.
 * `last` is the final block, lit, the one the brother puts down himself.
 */
export const Castle: React.FC<{ position: Vec3; filled?: number; roof?: number; last?: number }> = ({
  position,
  filled = 0,
  roof = 0,
  last = 0,
}) => {
  const cells = 72; // twelve wide, six high: the wall he has been filling in
  const placed = Math.round(filled * cells);
  return (
    <group position={position}>
      {/* the hill it stands on */}
      <Vox kind="grass" position={[0, -0.3, 0]} size={[15, 0.6, 15]} />
      <Vox kind="dirt" position={[0, -0.9, 0]} size={[13, 0.7, 13]} />
      <Vox kind="grass" position={[6.4, 0.15, 5.6]} size={[3, 0.5, 3]} />
      <Tree position={[-6.2, 0, 5.4]} height={3.4} leaf="#3f7a3a" spread={1.9} />
      <Tree position={[-7.4, 0, 2.2]} height={2.6} leaf="#376d36" spread={1.6} />

      {/* the keep: three walls that were finished, and one that was not */}
      <Vox kind="stoneBrick" position={[0, 2.2, -4.2]} size={[9, 4.4, 0.7]} />
      <Vox kind="stoneBrick" position={[-4.2, 2.2, 0]} size={[0.7, 4.4, 9]} />
      <Vox kind="stoneBrick" position={[4.2, 2.2, 0]} size={[0.7, 4.4, 9]} />
      {/* the broken front wall: filled in one block a night, bottom row first */}
      {Array.from({ length: cells }, (_, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        if (i >= placed) return null;
        const newest = i === placed - 1 && filled < 1;
        return (
          <Vox
            key={i}
            kind={newest ? "mossy" : "stoneBrick"}
            position={[-3.85 + col * 0.7, 0.35 + row * 0.7, 4.2]}
            size={[0.7, 0.7, 0.7]}
          />
        );
      })}
      <Vox kind="stoneBrick" position={[0, 0.2, 4.2]} size={[9, 0.4, 0.7]} />

      {/* two towers, and the torches he keeps lit */}
      <Vox kind="cobble" position={[-4.2, 5.6, -4.2]} size={[1.8, 2.6, 1.8]} />
      <Vox kind="cobble" position={[4.2, 5.6, -4.2]} size={[1.8, 2.6, 1.8]} />
      <Torch position={[-4.2, 7.1, -4.2]} light={7} seed={11} />
      <Torch position={[4.2, 7.1, -4.2]} light={7} seed={12} />
      <Torch position={[-3.6, 3.9, 3.6]} light={5} seed={13} />
      <Torch position={[3.6, 3.9, 3.6]} light={5} seed={14} />

      {/* the doorway he never put a door in */}
      <Vox kind="darkPlanks" position={[0, 3.5, 4.2]} size={[1.6, 2.6, 0.8]} tint="#2a1d12" />

      {/* the roof he never started, finished last month */}
      {roof > 0 ? (
        <group scale={[1, roof, 1]}>
          <Vox kind="planks" position={[0, 5.0, -2.1]} size={[9.4, 0.3, 4.9]} tint="#7a5330" />
          <Vox kind="planks" position={[0, 5.5, -0.4]} size={[9.4, 0.3, 3.2]} tint="#8a5f36" />
          <Vox kind="planks" position={[0, 6.0, 1.1]} size={[9.4, 0.3, 1.6]} tint="#96683c" />
        </group>
      ) : null}

      {/* the last block: the one his brother puts down */}
      {last > 0 ? (
        <group position={[0, 6.3, 1.5]}>
          <Vox kind="stoneBrick" position={[0, 0, 0]} size={[0.7, 0.7, 0.7]} />
          <Glow position={[0, 0, 0.6]} size={1.8 * last} color="#ffd27a" opacity={0.5 * last} />
          <LightPool position={[0, -0.6, 0]} width={4} depth={4} color="#ffcf70" opacity={0.2 * last} />
        </group>
      ) : null}
    </group>
  );
};

/** A chest with a name on it. Everything he left is labelled with his name. */
export const NamedChest: React.FC<{ position: Vec3; rotationY?: number; name?: string }> = ({
  position,
  rotationY = 0,
  name = "SAM",
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.42, 0]} size={[1.1, 0.84, 0.7]} tint="#8a5f36" />
    <Vox kind="log" position={[0, 0.72, 0.37]} size={[1.1, 0.24, 0.06]} />
    <Block position={[0, 0.62, 0.41]} size={[0.2, 0.16, 0.06]} color="#c8b072" castShadow={false} />
    <PixelText text={name} position={[0, 1.18, 0.02]} height={0.22} maxWidth={1.2} color="#e8dcc0" />
  </group>
);

/** The screen the whole film hangs on: the player list. One name on it for three years. */
export const ServerScreen: React.FC<{
  position: Vec3;
  rotationY?: number;
  players?: number;
  name?: string;
  highlight?: number;
}> = ({ position, rotationY = 0, players = 1, name = "", highlight = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.74, 0]} size={[2.2, 0.12, 1.0]} />
    <Vox kind="log" position={[-0.95, 0.37, -0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[0.95, 0.37, -0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[-0.95, 0.37, 0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[0.95, 0.37, 0.4]} size={[0.14, 0.74, 0.14]} />
    <Block position={[0, 1.12, -0.28]} size={[1.5, 0.9, 0.07]} color="#1b1f26" />
    <Block position={[0, 1.12, -0.23]} size={[1.34, 0.76, 0.02]} color="#101a24" emissive="#0a1420" emissiveIntensity={0.6} castShadow={false} />
    <PixelText text={`${players} PLAYER${players === 1 ? "" : "S"} ONLINE`} position={[0, 1.44, -0.21]} height={0.15} maxWidth={1.25} color="#7fd6a0" />
    {name ? (
      <PixelText text={name} position={[0, 1.14, -0.21]} height={0.15} maxWidth={1.25} color={highlight > 0 ? "#ffd27a" : "#8fb4d8"} />
    ) : null}
    <Glow position={[0, 1.12, 0.05]} size={2.8} color="#7fd6a0" opacity={0.14 + highlight * 0.16} />
    <LightPool position={[0, 0.81, 0.2]} width={2.4} depth={1.3} color="#8fe0b0" opacity={0.12} />
  </group>
);

/** A creeper at the edge of the torchlight: the reason the torches matter. */
export const Creeper: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="wool" position={[0, 1.0, 0]} size={[0.7, 1.0, 0.45]} tint="#4f9e46" />
    <Vox kind="wool" position={[0, 1.72, 0]} size={[0.8, 0.66, 0.55]} tint="#58aa4d" />
    <Vox kind="wool" position={[-0.2, 0.28, 0]} size={[0.24, 0.6, 0.24]} tint="#43853c" />
    <Vox kind="wool" position={[0.2, 0.28, 0]} size={[0.24, 0.6, 0.24]} tint="#43853c" />
    <Block position={[-0.19, 1.78, 0.29]} size={[0.16, 0.16, 0.02]} color="#101010" castShadow={false} />
    <Block position={[0.19, 1.78, 0.29]} size={[0.16, 0.16, 0.02]} color="#101010" castShadow={false} />
    <Block position={[-0.09, 1.5, 0.29]} size={[0.34, 0.2, 0.02]} color="#101010" castShadow={false} />
  </group>
);

/** Lunch money, counted out on the desk: what a server costs when you are fifteen. */
export const Coins: React.FC<{ position: Vec3; count?: number }> = ({ position, count = 9 }) => (
  <group position={position}>
    {Array.from({ length: count }, (_, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      return (
        <Block
          key={i}
          position={[col * 0.14 - 0.2, 0.03 + row * 0.05, row * 0.12 - 0.1]}
          size={[0.13, 0.05, 0.13]}
          color={i % 3 === 0 ? "#d9b34a" : "#c0a24a"}
          castShadow={false}
        />
      );
    })}
  </group>
);

/** The sign at the spawn point, left just in case. */
export const SpawnSign: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Sign position={[0, 0, 0]} rotationY={0} title="STILL HERE." subtitle="— YOUR BROTHER" lines={["SERVER CLOSES FRIDAY"]} />
  </group>
);

/** The boy's desk, where he logs on every night. */
export const Desk: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.74, 0]} size={[2.2, 0.12, 1.0]} />
    <Vox kind="log" position={[-0.95, 0.37, -0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[0.95, 0.37, -0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[-0.95, 0.37, 0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[0.95, 0.37, 0.4]} size={[0.14, 0.74, 0.14]} />
  </group>
);

export { Bed, Monitor, SubscribeSign, ease, pop, ramp };
export type { Vec3 };

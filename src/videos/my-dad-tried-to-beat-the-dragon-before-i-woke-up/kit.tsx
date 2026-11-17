import type React from "react";
import { Block, Glow, LightPool, MinecraftAvatar, PixelText, Torch, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, SubscribeSign, ease, pop, ramp, wordClock } from "../../../Topics/Stories";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * It is a STORY, not an explainer: a camera that cuts on the line, and two people — a dad who has
 * never played, and the son who is telling it. Places are far apart on purpose (a bedroom, a shaft,
 * a field, a portal room, the End) so that every beat arrives with a new picture.
 *
 * 1 unit = 1 block = 1 metre. `PLACE` is where each set sits; everything inside a set is written
 * relative to it with `at()`.
 */
export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

const A = {} as Partial<MinecraftAvatarProps>;

/** The sets, far enough apart that no lens sees two of them at once. */
export const PLACE = {
  room: [0, 0, 0] as Vec3,
  shaft: [11, 0, 0] as Vec3,
  field: [-11, 0, 0] as Vec3,
  stronghold: [0, 0, 13] as Vec3,
  end: [0, 0, 27] as Vec3,
};

/** A point inside a set, written relative to the set's own origin. */
export const at = (p: Vec3, x: number, y: number, z: number): Vec3 => [p[0] + x, p[1] + y, p[2] + z];

/**
 * The dad: forty-one, a brown beard, the blue shirt he wears to work, and armour he has put on
 * back to front. He is the only adult in the film, so he is the only one at scale 1.
 */
export const Dad: React.FC<Partial<MinecraftAvatarProps>> = (p) => (
  <MinecraftAvatar
    skin="#d9a273"
    hair="#2b1d12"
    outfit="tee"
    colors={{ torso: "#2f5fa8", arms: "#2f5fa8", legs: "#3a3a48" }}
    face="bearded"
    blink
    {...p}
  />
);

/** The son: twelve, orange hoodie, the only other person on screen. */
export const Boy: React.FC<Partial<MinecraftAvatarProps>> = (p) => (
  <MinecraftAvatar
    scale={KID}
    skin="#e8b98f"
    hair="#3a2415"
    outfit="tee"
    colors={{ torso: "#f07a1c", arms: "#f07a1c", legs: "#2b3a6a" }}
    blink
    {...p}
  />
);

/**
 * An enderman, built from boxes: three blocks tall, arms that hang past its knees, and two violet
 * eyes that are the only bright thing about it. Looking at it is the whole plot, so the eyes are
 * what the lens has to find.
 */
export const Enderman: React.FC<{ position: Vec3; rotationY?: number; awake?: number }> = ({
  position,
  rotationY = 0,
  awake = 1,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="obsidian" position={[0, 1.18, 0]} size={[0.62, 0.62, 0.34]} />
    <Vox kind="obsidian" position={[0, 1.86, 0]} size={[0.66, 0.62, 0.36]} />
    <Vox kind="obsidian" position={[0, 2.34, 0]} size={[0.74, 0.38, 0.4]} />
    {/* the long arms, hanging */}
    <Vox kind="obsidian" position={[-0.48, 1.02, 0]} size={[0.2, 1.5, 0.2]} />
    <Vox kind="obsidian" position={[0.48, 1.02, 0]} size={[0.2, 1.5, 0.2]} />
    <Vox kind="obsidian" position={[-0.19, 0.42, 0]} size={[0.22, 0.9, 0.22]} />
    <Vox kind="obsidian" position={[0.19, 0.42, 0]} size={[0.22, 0.9, 0.22]} />
    {/* the eyes: the only light it gives */}
    <Block position={[-0.15, 2.36, 0.21]} size={[0.14, 0.07, 0.02]} color="#d16bff" emissive="#a13cff" emissiveIntensity={1.4} castShadow={false} />
    <Block position={[0.15, 2.36, 0.21]} size={[0.14, 0.07, 0.02]} color="#d16bff" emissive="#a13cff" emissiveIntensity={1.4} castShadow={false} />
    <Glow position={[-0.15, 2.36, 0.3]} size={0.5 * awake} color="#c86bff" opacity={0.55 * awake} />
    <Glow position={[0.15, 2.36, 0.3]} size={0.5 * awake} color="#c86bff" opacity={0.55 * awake} />
  </group>
);

/**
 * The Ender Dragon, built the same way the rest of the film is: boxes. Seen mostly as a shape
 * against the End's violet sky with two lit eyes, which is how a player actually sees one.
 */
export const Dragon: React.FC<{ position: Vec3; rotationY?: number; beat?: number }> = ({
  position,
  rotationY = 0,
  beat = 0,
}) => {
  const flap = Math.sin(beat * 3.1) * 0.5;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Vox kind="obsidian" position={[0, 0, 0]} size={[2.4, 1.6, 4.2]} />
      <Vox kind="obsidian" position={[0, 0.2, -3.0]} size={[1.2, 1.0, 2.4]} />
      <Vox kind="obsidian" position={[0, 0.7, -4.2]} size={[1.5, 1.0, 1.5]} />
      <Vox kind="obsidian" position={[0, 0.4, 2.6]} size={[0.9, 0.8, 2.6]} />
      <group rotation={[0, 0, flap]}>
        <Vox kind="obsidian" position={[-3.4, 0.5, 0]} size={[5.2, 0.22, 2.6]} />
      </group>
      <group rotation={[0, 0, -flap]}>
        <Vox kind="obsidian" position={[3.4, 0.5, 0]} size={[5.2, 0.22, 2.6]} />
      </group>
      <Block position={[-0.32, 0.95, -4.85]} size={[0.2, 0.12, 0.03]} color="#ff5ea8" emissive="#ff2f8e" emissiveIntensity={1.6} castShadow={false} />
      <Block position={[0.32, 0.95, -4.85]} size={[0.2, 0.12, 0.03]} color="#ff5ea8" emissive="#ff2f8e" emissiveIntensity={1.6} castShadow={false} />
      <Glow position={[0, 0.9, -4.9]} size={1.6} color="#ff5ea8" opacity={0.4} />
    </group>
  );
};

/** A crafting table with a grid: the twelve eyes of ender, lit one after another as they are thrown. */
export const EyeGrid: React.FC<{ position: Vec3; rotationY?: number; filled: number }> = ({
  position,
  rotationY = 0,
  filled,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.4, 0]} size={[1.5, 0.16, 1.5]} />
    <Vox kind="log" position={[-0.6, 0.16, -0.6]} size={[0.18, 0.32, 0.18]} />
    <Vox kind="log" position={[0.6, 0.16, -0.6]} size={[0.18, 0.32, 0.18]} />
    <Vox kind="log" position={[-0.6, 0.16, 0.6]} size={[0.18, 0.32, 0.18]} />
    <Vox kind="log" position={[0.6, 0.16, 0.6]} size={[0.18, 0.32, 0.18]} />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const lit = i < filled ? 1 : 0;
      return (
        <group key={i}>
          <Block
            position={[-0.36 + col * 0.36, 0.52, -0.3 + row * 0.3]}
            size={[0.2, 0.06, 0.2]}
            color={lit ? "#8ce07a" : "#5a4a33"}
            emissive={lit ? "#6ad24f" : "#000000"}
            emissiveIntensity={lit ? 1.1 : 0}
            castShadow={false}
          />
          {lit ? (
            <Glow position={[-0.36 + col * 0.36, 0.56, -0.3 + row * 0.3]} size={0.42} color="#9dff7a" opacity={0.5} />
          ) : null}
        </group>
      );
    })}
  </group>
);

/** One ender pearl on the ground, with the small violet pool it sits in. */
export const Pearl: React.FC<{ position: Vec3; t: number }> = ({ position, t }) => {
  const drop = pop(t, 0, 0.35);
  const y = (1 - drop) * 1.4;
  return (
    <group position={[position[0], position[1] + y, position[2]]}>
      <Block position={[0, 0.14, 0]} size={[0.24, 0.24, 0.24]} color="#1d6e63" emissive="#0f4a44" emissiveIntensity={0.5} />
      <Glow position={[0, 0.14, 0.2]} size={0.7} color="#3fd6c0" opacity={0.4 * drop} />
      <LightPool position={[0, 0.02, 0]} width={1.2} depth={1.2} color="#2fbfae" opacity={0.22 * drop} />
    </group>
  );
};

/** The dad's desk: a monitor, a keyboard, a chair, and the only light in the room. */
export const Desk: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.74, 0]} size={[2.2, 0.12, 1.0]} />
    <Vox kind="log" position={[-0.95, 0.37, -0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[0.95, 0.37, -0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[-0.95, 0.37, 0.4]} size={[0.14, 0.74, 0.14]} />
    <Vox kind="log" position={[0.95, 0.37, 0.4]} size={[0.14, 0.74, 0.14]} />
    {/* the monitor, and its light on the desk and the wall */}
    <Block position={[0, 1.06, -0.28]} size={[1.15, 0.66, 0.06]} color="#1b1f26" />
    <Block position={[0, 1.06, -0.24]} size={[1.03, 0.55, 0.02]} color="#3f7f52" emissive="#2f6a3f" emissiveIntensity={0.85} castShadow={false} />
    <Block position={[0, 0.84, -0.1]} size={[0.7, 0.04, 0.24]} color="#2b2f36" castShadow={false} />
    <Glow position={[0, 1.06, 0.05]} size={2.6} color="#7fd6a0" opacity={0.16} />
    <LightPool position={[0, 0.81, 0.2]} width={2.2} depth={1.2} color="#8fe0b0" opacity={0.14} />
  </group>
);

/** A one-block shaft going down, with a torch every ten blocks and the count written on the wall. */
export const Shaft: React.FC<{ position: Vec3; depth?: number }> = ({ position, depth = 6 }) => (
  <group position={position}>
    {/* the four walls of the shaft, and the lip of grass it was cut through */}
    <Vox kind="stone" position={[-1.0, -depth / 2, 0]} size={[0.6, depth, 2.6]} />
    <Vox kind="stone" position={[1.0, -depth / 2, 0]} size={[0.6, depth, 2.6]} />
    <Vox kind="stone" position={[0, -depth / 2, -1.0]} size={[2.6, depth, 0.6]} />
    <Vox kind="dirt" position={[0, -depth - 0.2, 0]} size={[1.4, 0.4, 1.4]} />
    {[0, 1, 2, 3].map((i) => (
      <group key={i}>
        <Torch position={[-0.62, -0.9 - i * 1.4, -0.5]} light={i === 3 ? 6 : 4} seed={i + 1} />
        <PixelText
          text={`${(i + 1) * 100}`}
          position={[0.6, -1.1 - i * 1.4, -0.66]}
          rotationY={-Math.PI / 2}
          height={0.34}
          color="#e8dcc0"
        />
      </group>
    ))}
  </group>
);

/** The sign he leaves at the top of the shaft: the low point of the film, in two words. */
export const SorrySign: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.9, 0]} size={[0.12, 0.5, 0.12]} color="#5c3f24" />
    <Vox kind="planks" position={[0, 1.28, 0]} size={[1.5, 0.5, 0.1]} />
    <PixelText text="SORRY." position={[0, 1.4, 0.06]} height={0.19} maxWidth={1.3} />
    <PixelText text="I TRIED." position={[0, 1.16, 0.06]} height={0.19} maxWidth={1.3} />
  </group>
);

/** The End portal: a frame of twelve eyes, and the violet surface they open. */
export const Portal: React.FC<{ position: Vec3; open: number }> = ({ position, open }) => (
  <group position={position}>
    {[0, 1, 2, 3].map((i) => (
      <group key={i}>
        <Vox kind="stoneBrick" position={[-1.2, 0.3, 0]} size={[0.5, 0.6, 0.5]} />
        <Vox kind="stoneBrick" position={[1.2, 0.3, 0]} size={[0.5, 0.6, 0.5]} />
      </group>
    ))}
    <Vox kind="stoneBrick" position={[-1.2, 0.3, 0]} size={[0.5, 0.6, 3.2]} />
    <Vox kind="stoneBrick" position={[1.2, 0.3, 0]} size={[0.5, 0.6, 3.2]} />
    <Vox kind="stoneBrick" position={[0, 0.3, -1.55]} size={[2.9, 0.6, 0.5]} />
    <Vox kind="stoneBrick" position={[0, 0.3, 1.55]} size={[2.9, 0.6, 0.5]} />
    <Block position={[0, 0.28, 0]} size={[2.4, 0.06, 2.6]} color="#120a1e" emissive="#5a2ea8" emissiveIntensity={0.5 + open} castShadow={false} />
    <Glow position={[0, 0.4, 0]} size={4 + open * 3} color="#8a4fe0" opacity={0.22 + open * 0.3} />
    <LightPool position={[0, 0.05, 0]} width={5} depth={5} color="#7a3fd0" opacity={0.18 + open * 0.2} />
  </group>
);

export { SubscribeSign, ease, pop, ramp };
export type { Vec3 };

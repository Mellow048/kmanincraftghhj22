import type React from "react";
import { Block, MinecraftAvatar, Torch } from "../../src/engine";
import type { FaceName, MinecraftAvatarProps, Vec3 } from "../../src/engine";

/**
 * PLAYERS — people who are `MinecraftAvatar`s: every face different, and hands.
 * In this topic they are the teller, and whoever is NOT from the town.
 *
 * Part of the topic's pack (see PACK.md). The teller himself is not here: every film
 * dresses its own (`Hero` in the film's kit.tsx), in one loud colour nobody else wears.
 */

type A = Partial<MinecraftAvatarProps>;

type Skin = { skin: string; hair: string; torso: string; arms: string; legs: string; face?: FaceName; pumpkin?: boolean };
/** Twelve people, no two alike. 0 has a beard, 1 green hair, 2 wears a pumpkin. `who` picks one. */
export const PLAYERS: Skin[] = [
  { skin: "#e0ac7e", hair: "#5a3a1e", torso: "#8a2f2a", arms: "#8a2f2a", legs: "#3a3a48", face: "bearded" },
  { skin: "#f0c8a4", hair: "#3ed24a", torso: "#23262f", arms: "#23262f", legs: "#4a5a8a" },
  { skin: "#c99a74", hair: "#2b2b2b", torso: "#6a4aa8", arms: "#6a4aa8", legs: "#2a2a3a", pumpkin: true },
  { skin: "#b97a56", hair: "#1f1a18", torso: "#4fd6d0", arms: "#4fd6d0", legs: "#3fb8b2" },
  { skin: "#f0c8a4", hair: "#e08a2a", torso: "#5fa03c", arms: "skin", legs: "#6a4a2e" },
  { skin: "#8a5a3c", hair: "#e9e4d8", torso: "#d9cdb4", arms: "#d9cdb4", legs: "#3b3f52" },
  { skin: "#ecc19a", hair: "#c2452a", torso: "#e8c44a", arms: "skin", legs: "#2f2f38" },
  { skin: "#e3b48c", hair: "#6a3fa0", torso: "#e85a9a", arms: "#e85a9a", legs: "#3a3344" },
  { skin: "#f0c8a4", hair: "#f2e24a", torso: "#c8362e", arms: "#c8362e", legs: "#2e3c6e" },
  { skin: "#6b4a34", hair: "#2b2b2b", torso: "#f2efe6", arms: "skin", legs: "#7a5a3a" },
  { skin: "#ecc19a", hair: "#3f6fb8", torso: "#f07a2a", arms: "#f07a2a", legs: "#3a3344" },
  { skin: "#d9a27a", hair: "#8a8a8a", torso: "#3f8a4f", arms: "#3f8a4f", legs: "#4a3a2a" },
];

/** A carved pumpkin, worn as a head. `position` is its middle. */
export const Pumpkin: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block size={[0.56, 0.54, 0.56]} color="#e07f1c" />
    {[-0.2, 0, 0.2].map((x) => (
      <Block key={x} position={[x, 0, 0.283]} size={[0.03, 0.54, 0.01]} color="#b85f10" castShadow={false} />
    ))}
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.13, 0.08, 0.286]} size={[0.13, 0.11, 0.012]} color="#2a1405" castShadow={false} />
    ))}
    <Block position={[0, -0.12, 0.286]} size={[0.36, 0.07, 0.012]} color="#2a1405" castShadow={false} />
    {[-0.11, 0.02, 0.13].map((x) => (
      <Block key={x} position={[x, -0.075, 0.288]} size={[0.06, 0.05, 0.012]} color="#e07f1c" castShadow={false} />
    ))}
    <Block position={[0, 0.31, 0]} size={[0.1, 0.1, 0.1]} color="#5a7a2a" />
  </group>
);

/**
 * One of the twelve. `who` picks the look. `torch` puts a lit torch in the right hand, and `light` makes it a real light.
 * Takes every `MinecraftAvatar` prop: `animation`, `face`, `position`, `rotationY`…
 */
export const Player: React.FC<A & { who: number; torch?: boolean; light?: number }> = ({
  who,
  torch = false,
  light = 0,
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  ...p
}) => {
  const c = PLAYERS[who % PLAYERS.length];
  return (
    <>
      <MinecraftAvatar
        position={position}
        rotationY={rotationY}
        scale={scale}
        outfit="tee"
        skin={c.skin}
        hair={c.hair}
        colors={{ torso: c.torso, arms: c.arms, legs: c.legs }}
        face={c.face ?? "grin"}
        blink
        phase={who * 2.3 + 0.4}
        {...p}
      >
        {torch ? <Torch position={[0, -0.02, 0.06]} lean={[1.2, 0, 0]} light={light} seed={who + 3} /> : null}
      </MinecraftAvatar>
      {c.pumpkin ? <Pumpkin position={[position[0], position[1] + 1.585 * scale, position[2]]} rotationY={rotationY + (p.headYaw ?? 0)} scale={scale} /> : null}
    </>
  );
};

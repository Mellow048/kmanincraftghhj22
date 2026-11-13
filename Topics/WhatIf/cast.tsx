import type React from "react";
import { MinecraftAvatar } from "../../src/engine";
import type { MinecraftAvatarProps } from "../../src/engine";
import { KID } from "../Shared";

/**
 * THE CAST — the people round a kid with a power: a class of kids, and a teacher.
 *
 * Part of the What If pack (PACK.md). The teller is not here, and neither are the two or three people
 * the story is about (the best friend, the crush, the rival): every film dresses its own in its kit.tsx,
 * the teller in one loud colour nobody else wears.
 */

type A = Partial<MinecraftAvatarProps>;
type Look = { skin: string; hair: string; torso: string; arms: string; legs: string };

/** Twelve classmates, no two alike, and none of them in a colour loud enough to be mistaken for a lead. */
export const KIDS: Look[] = [
  { skin: "#e3b48c", hair: "#5a3a1e", torso: "#7d93b8", arms: "#7d93b8", legs: "#3a3f52" },
  { skin: "#8a5a3c", hair: "#1f1a18", torso: "#b9a36a", arms: "skin", legs: "#4a3a2a" },
  { skin: "#f0c8a4", hair: "#c2452a", torso: "#6f9a78", arms: "#6f9a78", legs: "#2f2f38" },
  { skin: "#d9a27a", hair: "#2b2b2b", torso: "#a87a9a", arms: "skin", legs: "#3a3344" },
  { skin: "#ecc19a", hair: "#e9d27a", torso: "#8a8fa8", arms: "#8a8fa8", legs: "#4a5a6a" },
  { skin: "#6b4a34", hair: "#2b2b2b", torso: "#c9c2ae", arms: "#c9c2ae", legs: "#3b3f52" },
  { skin: "#f0c8a4", hair: "#3a2415", torso: "#9a7a5a", arms: "skin", legs: "#2e3c5e" },
  { skin: "#c99a74", hair: "#6a3fa0", torso: "#7aa0a8", arms: "#7aa0a8", legs: "#3a3344" },
  { skin: "#e0ac7e", hair: "#a8743a", torso: "#b88a7a", arms: "#b88a7a", legs: "#4a4a58" },
  { skin: "#b97a56", hair: "#1f1a18", torso: "#8fa878", arms: "skin", legs: "#5a4a3a" },
  { skin: "#ecc19a", hair: "#3f6fb8", torso: "#a8a08a", arms: "#a8a08a", legs: "#2f2f38" },
  { skin: "#e3b48c", hair: "#d86a2a", torso: "#8a9ab8", arms: "skin", legs: "#3a3f52" },
];

/**
 * One of the class. `who` picks the look. Takes every `MinecraftAvatar` prop: `position`, `rotationY`,
 * `animation` ("sit" at a desk), `face`, `lookAt`… Kid faces: smile grin laugh frown uneasy brave fear wow ouch calm.
 */
export const Classmate: React.FC<A & { who: number }> = ({ who, ...p }) => {
  const c = KIDS[((who % KIDS.length) + KIDS.length) % KIDS.length];
  return <MinecraftAvatar scale={KID} outfit="tee" skin={c.skin} hair={c.hair} colors={{ torso: c.torso, arms: c.arms, legs: c.legs }} face="smile" blink phase={who * 0.37} {...p} />;
};

/** The teacher: a grown-up, a head taller than the class, in a shirt and a dark skirt or trousers. */
export const Teacher: React.FC<A> = (p) => (
  <MinecraftAvatar scale={1} outfit="tee" skin="#e0ac7e" hair="#4a3524" colors={{ torso: "#e9e4d8", arms: "#e9e4d8", legs: "#3a3f52" }} face="calm" blink {...p} />
);

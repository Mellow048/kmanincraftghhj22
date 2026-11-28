import {
  Balance,
  CitizenLead,
  CommandBoard,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  Official,
  RuleBoard,
  SchoolCampusMap,
  StoneBillboard,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  wordClock,
} from "../../../Topics/Explainer";
import { Block, MinecraftAvatar, Sign, Vox, moveBetween } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import timingJson from "./timing.json";

export {
  Balance,
  Block,
  CitizenLead,
  CommandBoard,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  Official,
  RuleBoard,
  SchoolCampusMap,
  Sign,
  StoneBillboard,
  Vox,
  cam,
  ease,
  moveBetween,
  pop,
  ramp,
  storyScene,
};

export { SpawnChest, LockedChestGrid, BanHammer, PaperAirplane } from "./parts";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  /** Stone-brick SMP Spawn Plaza with central RuleBoard & Spawn Chest (Frame-0 & Loop zone). */
  spawn: [0, 0, 0] as Vec3,
  /** Open-roof SchoolCampusMap classroom for the real-world teacher/rules bridge. */
  campus: [72, 0, 0] as Vec3,
};

export const at = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

/** Griefer — black-and-crimson hoodie troublemaker with smug grin. */
export const Griefer: React.FC<Partial<MinecraftAvatarProps>> = (p) => (
  <MinecraftAvatar
    scale={1.0}
    outfit="hoodie"
    skin="#deb08a"
    hair="#18181b"
    colors={{ torso: "#212529", arms: "#c92a2a", legs: "#1a1b1e" }}
    blink
    shadow
    {...p}
  />
);

/** Exact Frame-0 & Final-Frame camera over the Spawn RuleBoard for seamless infinite loop. */
export const LOOP_CAM = cam.sweep({
  on: at(PLACE.spawn, 0, 1.8, -2.4),
  dist: 5.4,
  fromYaw: -15,
  toYaw: 15,
  pitch: 8,
  fov: 42,
});

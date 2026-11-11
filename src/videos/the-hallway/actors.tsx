import type { AnimName, FaceName, Vec3 } from "../../engine";
import { MinecraftAvatar } from "../../engine";

/**
 * Shared cast for THE HALLWAY. Keeping the actor defaults in one file is what
 * stops the kid's clothes, height or bed position from drifting between scenes.
 *
 * Both actors take the locomotion props (`animDistance`, `blendTo`, `blend`,
 * `blendTime`) straight through, so a scene can drive real travel without
 * re-implementing the avatar.
 */
export const KID_SEAT: Vec3 = [-1.25, 0, -1.35];
export const KID_END: Vec3 = [1.72, 0, 4.35];
export const FIGURE_SPOT: Vec3 = [-0.3, 0, 10.15];

export const Kid: React.FC<{
  face?: FaceName;
  animation?: AnimName;
  animSpeed?: number;
  phase?: number;
  animDistance?: number;
  blendTo?: AnimName;
  blend?: number;
  blendTime?: number;
  time?: number;
  position?: Vec3;
  rotationY?: number;
  headYaw?: number;
  headPitch?: number;
  headRoll?: number;
  lookAt?: Vec3;
  blink?: boolean;
  shadow?: boolean;
}> = ({
  face = "worried",
  animation = "sit",
  animSpeed = 1,
  phase = 0,
  animDistance,
  blendTo,
  blend = 1,
  blendTime,
  time,
  position = KID_SEAT,
  rotationY = 0.3,
  headYaw = 0,
  headPitch = 0.08,
  headRoll = 0,
  lookAt,
  blink = true,
  shadow = true,
}) => (
  <MinecraftAvatar
    position={position}
    rotationY={rotationY}
    animation={animation}
    animSpeed={animSpeed}
    phase={phase}
    animDistance={animDistance}
    blendTo={blendTo}
    blend={blend}
    blendTime={blendTime}
    time={time}
    face={face}
    skin="#e8b78d"
    hair="#4a2e1c"
    outfit="gown"
    headYaw={headYaw}
    headPitch={headPitch}
    headRoll={headRoll}
    lookAt={lookAt}
    blink={blink}
    shadow={shadow}
  />
);

export const Figure: React.FC<{
  position?: Vec3;
  rotationY?: number;
  headPitch?: number;
  headYaw?: number;
  headRoll?: number;
  faceGlow?: number;
  animation?: AnimName;
  animSpeed?: number;
  phase?: number;
  animDistance?: number;
  blendTo?: AnimName;
  blend?: number;
  blendTime?: number;
  time?: number;
}> = ({
  position = FIGURE_SPOT,
  rotationY = Math.PI - 0.32,
  headPitch = 0.1,
  headYaw = 0,
  headRoll = 0,
  faceGlow = 0.85,
  animation = "idle",
  animSpeed = 0.35,
  phase = 0,
  animDistance,
  blendTo,
  blend = 1,
  blendTime,
  time,
}) => (
  <MinecraftAvatar
    position={position}
    rotationY={rotationY}
    scale={1.1}
    animation={animation}
    animSpeed={animSpeed}
    phase={phase}
    animDistance={animDistance}
    blendTo={blendTo}
    blend={blend}
    blendTime={blendTime}
    time={time}
    face="hollow"
    skin="#171d2a"
    hair="#0a0e16"
    outfit="shadow"
    faceGlow={faceGlow}
    rim={0.6}
    headPitch={headPitch}
    headYaw={headYaw}
    headRoll={headRoll}
    shadow
  />
);

import type { AnimName, FaceName, Vec3 } from "../../engine";
import { MinecraftAvatar } from "../../engine";

/**
 * Shared cast for __TITLE__. Change the defaults here, not in every scene. Keeping the actor defaults in one file is what
 * stops the kid's clothes, height or bed position from drifting between scenes.
 */
export const KID_SEAT: Vec3 = [-1.8, 0, -0.72];
export const FIGURE_SPOT: Vec3 = [0.1, 0, 9.4];

export const Kid: React.FC<{
  face?: FaceName;
  animation?: AnimName;
  position?: Vec3;
  rotationY?: number;
  headYaw?: number;
  headPitch?: number;
  lookAt?: Vec3;
}> = ({
  face = "worried",
  animation = "sit",
  position = KID_SEAT,
  rotationY = 0.06,
  headYaw = 0,
  headPitch = 0.08,
  lookAt,
}) => (
  <MinecraftAvatar
    position={position}
    rotationY={rotationY}
    animation={animation}
    face={face}
    skin="#e8b78d"
    hair="#4a2e1c"
    outfit="gown"
    headYaw={headYaw}
    headPitch={headPitch}
    lookAt={lookAt}
  />
);

export const Figure: React.FC<{
  position?: Vec3;
  rotationY?: number;
  headPitch?: number;
  headYaw?: number;
  faceGlow?: number;
  animation?: AnimName;
  animSpeed?: number;
  phase?: number;
}> = ({
  position = FIGURE_SPOT,
  rotationY = Math.PI,
  headPitch = 0.12,
  headYaw = 0,
  faceGlow = 0.85,
  animation = "idle",
  animSpeed = 0.35,
  phase = 0,
}) => (
  <MinecraftAvatar
    position={position}
    rotationY={rotationY}
    scale={1.12}
    animation={animation}
    animSpeed={animSpeed}
    phase={phase}
    face="hollow"
    skin="#171d2a"
    hair="#0a0e16"
    outfit="shadow"
    faceGlow={faceGlow}
    rim={0.5}
    headPitch={headPitch}
    headYaw={headYaw}
  />
);

import type { AnimName, FaceName, Vec3 } from "../../engine";
import { MinecraftAvatar } from "../../engine";

/**
 * THE BOY — one actor, one silhouette, one set of clothes for the whole film.
 *
 * Warm flannel pyjamas, because the entire room and the entire street are cold
 * blue: the only warm thing on screen is the person we are afraid for. Nothing
 * else in the film is allowed to be that colour.
 *
 * Feet are the ground point. rotationY = 0 faces the camera side of the room
 * (+Z); the window is at -Z, so standing at the glass is rotationY = PI.
 */
export const KID_AT_WINDOW: Vec3 = [0.9, 0, -1.45];
/** Where he ends up on the floor, once he has backed away from the glass. */
export const KID_ON_FLOOR: Vec3 = [0.7, 0, 0.15];

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
  saccade?: boolean;
  gaze?: -1 | 0 | 1;
  breath?: number;
}> = ({
  face = "worried",
  animation = "idle",
  animSpeed = 1,
  phase = 0,
  animDistance,
  blendTo,
  blend = 1,
  blendTime,
  time,
  position = KID_AT_WINDOW,
  rotationY = Math.PI,
  headYaw = 0,
  headPitch = 0.06,
  headRoll = 0,
  lookAt,
  blink = true,
  saccade = true,
  gaze,
  breath = 1.15,
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
    hair="#3a2a1e"
    outfit="pajamasWarm"
    headYaw={headYaw}
    headPitch={headPitch}
    headRoll={headRoll}
    lookAt={lookAt}
    blink={blink}
    saccade={saccade}
    gaze={gaze}
    breath={breath}
    shadow
    shadowOpacity={0.45}
  />
);

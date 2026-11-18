import type React from "react";
import type { Vec3 } from "../../engine";
import { Block, Crate, Hero, InHand, SEAT, STOOL, SpeedLines, cuttingPose, holdUp, rnd } from "./kit";

/**
 * The picture this film is built on: somebody in the middle chair, and me on my crate right behind it. A tall frame
 * is a slit, so the two heads stack: theirs below, mine above. While the bush is on, it hides me; as it comes off,
 * my face comes out from behind it.
 */
export const SIT: Vec3 = [0, SEAT, 0];
export const CRATE: Vec3 = [0, 0, -0.66];
export const MY: Vec3 = [CRATE[0], STOOL, CRATE[2]];
export const MY_TURN = 0;
/** The middle of the head of whoever is in the chair (scale 0.96), and the top of it. */
export const SIT_FACE: Vec3 = [0, 1.45, 0.02];
export const SIT_TOP: Vec3 = [0, 1.8, 0.05];
/** My own face, up on the crate. */
export const MY_FACE: Vec3 = [MY[0], MY[1] + 1.575 * 0.88, MY[2]];

/**
 * Me at the chair. `fast` 0 is standing with the scissors held up, 1 is the blur. `rate` is snips a second.
 */
export const Me: React.FC<{ t: number; fast?: number; face?: string; up?: number; lookAt?: Vec3; headYaw?: number; at?: Vec3; turn?: number; lines?: boolean; job?: boolean; kitchen?: boolean; look?: "own" | "short" | "cap" }> = ({ t, fast = 1, face = "calm", up = 0.9, lookAt, headYaw, at = CRATE, turn = MY_TURN, lines = true, job = true, kitchen = false, look = "own" }) => (
  <>
    <Crate position={at} />
    <Hero job={job} look={look} position={[at[0], at[1] + STOOL, at[2]]} rotationY={turn} pose={fast > 0 ? cuttingPose(t, fast) : holdUp(t, up, 0.42)} face={face as never} lookAt={lookAt} headYaw={headYaw} gaze={0}>
      <InHand t={t} rate={fast > 0 ? 6 + fast * 8 : 0} scale={kitchen ? 1.5 : 1.15} handle={kitchen ? "#e8842a" : undefined} />
    </Hero>
    {fast > 0.6 && lines ? <SpeedLines position={[at[0], at[1] + STOOL + 1.2, at[2] + 0.62]} t={t} size={0.5} /> : null}
  </>
);

/**
 * The tape running backwards: white bars across the picture that jump every frame. `lens` is where the camera
 * stands and `on` what it looks at; the bars hang between the two, `depth` metres from the lens.
 */
export const Rewind: React.FC<{ t: number; lens: Vec3; on: Vec3; depth?: number; k?: number }> = ({ t, lens, on, depth = 1.2, k = 1 }) => {
  const d: Vec3 = [on[0] - lens[0], on[1] - lens[1], on[2] - lens[2]];
  const len = Math.hypot(d[0], d[1], d[2]);
  const p: Vec3 = [lens[0] + (d[0] / len) * depth, lens[1] + (d[1] / len) * depth, lens[2] + (d[2] / len) * depth];
  const yaw = Math.atan2(-d[0], -d[2]);
  const f = Math.floor(t * 30);
  if (k <= 0) return null;
  return (
    <group position={p} rotation={[0, yaw, 0]}>
      {Array.from({ length: 7 }, (_, i) => {
        const y = (rnd(i + f * 5, 3) - 0.5) * depth * 0.72;
        const h = 0.006 + rnd(i + f * 3, 5) * 0.03 * depth;
        return <Block key={i} position={[(rnd(i + f, 9) - 0.5) * 0.08, y, 0]} size={[depth * 0.6, h * 0.6, 0.002]} color="#cfd6de" opacity={0.3 + rnd(i + f, 7) * 0.35} transparent castShadow={false} receiveShadow={false} />;
      })}
    </group>
  );
};

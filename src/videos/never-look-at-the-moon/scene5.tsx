import { clamp01, defineScene, lerp, smoothstep, usePerformance, useTime, useWalkPath } from "../../engine";
import type { Vec3 } from "../../engine";
import { Kid, KID_ON_FLOOR, KID_AT_WINDOW } from "./actors";

/**
 * BEAT 05 — IT KNOWS (16.0–19.6)
 *
 * The camera comes back through the window it left by, and the room is no longer
 * the safe side of the glass. He is already backing away, so we arrive in the
 * middle of his panic instead of watching it begin. He drops on the floor facing
 * us, and the moonlight settles on the empty half of the bed behind him.
 *
 * The camera's path is the reveal of scene 4 played backwards, so the film ends
 * in the same room it started in and the audience knows every metre of it.
 */
const KID_PATH: Vec3[] = [
  [0.9, 0, -1.45],
  [0.8, 0, -0.95],
  [0.66, 0, -0.4],
  [0.7, 0, 0.15],
];

export const scene5 = defineScene({
  id: "scene5",
  title: "It Knows",
  duration: 3.6,
  shots: [
    {
      at: 0,
      dur: 3.6,
      from: [0.5, 3.2, -5.0],
      path: [
        [0.5, 3.2, -5.0],
        [0.45, 2.7, -3.2],
        [0.4, 2.3, -1.9],
        [0.45, 2.1, -0.5],
        [0.35, 1.62, 1.2],
        [0.3, 1.25, 2.28],
      ],
      target: [-0.95, 4.6, -30],
      targetPath: [
        [-0.95, 4.6, -30],
        [-0.2, 2.6, -8.0],
        [0.35, 1.75, -1.3],
        [0.12, 1.18, -1.6],
      ],
      fov: 48,
      fovTo: 52,
      ease: "inOutCubic",
      handheld: 0.005,
      impacts: [{ at: 2.25, amp: 0.014, dur: 0.4 }],
      note: "Fly back in through the window to catch him mid-panic on the floor, then let the room settle as the moonlight moves onto the bed behind him.",
    },
  ],
  Component: () => {
    const t = useTime();
    const walk = useWalkPath({ points: KID_PATH, duration: 2.5, delay: 0.3, ease: "outCubic", yaw: 0 });
    const turn = smoothstep(clamp01(t / 0.75));
    const perf = usePerformance([
      { at: 0, clip: "idle", blend: 0 },
      { at: 0.35, clip: "stagger", blend: 0.28 },
      { at: 2.2, clip: "crouch", blend: 0.45 },
    ]);
    const arrival = smoothstep(clamp01((t - 2.1) / 0.7));
    return (
      <Kid
        position={walk.position}
        rotationY={lerp(Math.PI - 0.04, 0.16, turn)}
        animation={perf.clip}
        blendTo={perf.blendTo ?? undefined}
        blend={perf.blendK}
        blendTime={perf.prevLocal ?? undefined}
        animDistance={walk.distance}
        face="scared"
        headYaw={lerp(0.25, -0.1, arrival)}
        headPitch={lerp(-0.05, -0.17, arrival)}
        headRoll={lerp(0, 0.05, arrival)}
        breath={1.05}
      />
    );
  },
});

/** Where the boy ends up, exported so the director can re-block the last frame. */
export const LAST_POSITION = KID_ON_FLOOR;

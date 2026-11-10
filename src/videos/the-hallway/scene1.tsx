import { clamp01, defineScene, smoothstep, useTime } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 01 — THE ROOM (0:00–0:03.6)
 * Hook: the ward is asleep, but the boy is awake and staring at something on
 * the wall. A slow push makes the empty half of the bed the second character.
 * At 1.7s he tears his eyes off the drawing and looks at the door.
 */
export const scene1 = defineScene({
  id: "scene1",
  title: "The Room",
  duration: 3.6,
  shots: [
    {
      at: 0,
      dur: 3.6,
      from: [1.5, 1.62, 1.9],
      to: [0.95, 1.52, 1.25],
      target: [-1.8, 1.25, -0.75],
      targetTo: [-1.9, 1.5, -1.0],
      fov: 52,
      fovTo: 45,
      ease: "inOutSine",
      handheld: 0.004,
      note: "Push in on the boy so the empty half of the bed becomes the second character. His eyes leave the drawing and land on the door.",
    },
  ],
  Component: () => {
    const t = useTime();
    const atDrawing = smoothstep(clamp01((t - 0.35) / 0.7)) * (1 - smoothstep(clamp01((t - 1.7) / 0.6)));
    const atDoor = smoothstep(clamp01((t - 1.7) / 0.6));
    return (
      <Kid
        face={t > 2.2 ? "surprised" : "worried"}
        animation="sit"
        headYaw={-1.22 * atDrawing + 0.32 * atDoor}
        headPitch={0.12 - 0.08 * atDrawing + 0.02 * atDoor}
        headRoll={-0.05 * atDrawing}
      />
    );
  },
});

import { clamp01, defineScene, smoothstep, useTime } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 01 — THE ROOM (0:00–0:03.4)
 * Hook: the ward is asleep, but the boy is awake and staring at something on
 * the wall behind him. A slow push off the doorway makes the empty half of the
 * bed the second character and keeps the moon window in frame. At 1.7s he
 * tears his eyes off the drawing and looks at the door.
 */
export const scene1 = defineScene({
  id: "scene1",
  title: "The Room",
  duration: 3.4,
  shots: [
    {
      at: 0,
      dur: 3.4,
      from: [2.05, 1.95, 2.55],
      to: [1.35, 1.68, 1.95],
      target: [-1.8, 1.35, -0.85],
      targetTo: [-1.85, 1.6, -1.3],
      fov: 50,
      fovTo: 46,
      ease: "inOutSine",
      handheld: 0.004,
      note: "Push in off the doorway so the moon window and the empty half of the bed both read. His eyes leave the drawing and land on the door.",
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
        headYaw={-1.25 * atDrawing + 0.32 * atDoor}
        headPitch={0.02 + 0.1 * atDrawing}
        headRoll={-0.05 * atDrawing}
      />
    );
  },
});

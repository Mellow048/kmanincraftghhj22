import { defineScene, usePerformance, useTime } from "../../engine";
import { Kid, KID_AT_WINDOW } from "./actors";
import { SCENE_AT } from "./cues";

/**
 * BEAT 01 — LIGHTS OUT (0.0–3.2)
 *
 * The hook is the street, not the boy: every window across the road is going
 * dark at once, one house at a time, and the person doing it is standing at this
 * window. He reaches up and draws the curtain shut, which tells the audience the
 * rule before the voice does. One slow pull back, because the room has to be
 * bigger than the boy by the end of the shot.
 */
export const scene1 = defineScene({
  id: "scene1",
  title: "Lights Out",
  duration: 3.2,
  shots: [
    {
      at: 0,
      dur: 3.2,
      from: [0.12, 1.52, 1.98],
      to: [0.18, 1.5, 1.62],
      target: [0.25, 1.66, -2.4],
      targetTo: [0.22, 1.68, -2.4],
      fov: 62,
      fovTo: 60,
      ease: "inOutSine",
      handheld: 0.004,
      note: "Push slowly towards the glass while the last house across the street goes dark, so the only lit thing left in the town is the moon the boy is not allowed to look at.",
    },
  ],
  Component: () => {
    const t = useTime();
    const perf = usePerformance([
      { at: 0, clip: "idle", blend: 0 },
      { at: 0.4, clip: "reach", blend: 0.4 },
      { at: 1.75, clip: "idle", blend: 0.5 },
    ]);
    return (
      <Kid
        position={KID_AT_WINDOW}
        rotationY={Math.PI + 0.06}
        animation={perf.clip}
        blendTo={perf.blendTo ?? undefined}
        blend={perf.blendK}
        blendTime={perf.prevLocal ?? undefined}
        face="worried"
        headPitch={t < 1.1 ? -0.3 : 0.02}
        headYaw={0.05}
        breath={0.7}
      />
    );
  },
});

/** Scene start on the film clock — used by scenes that read the cue sheet. */
export const SCENE_START = SCENE_AT.scene1;

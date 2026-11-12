import { cam, storyScene } from "../../engine";
import { Hero, PLACE, PassingShadow, ramp, timing, wordAt } from "./kit";
/** Beat 6: The rope moves. The recorded words, not hand-set seconds, own every cut. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The rope moves",
  shots: [
    {
      cue: "6.twitch",
      ...cam.push({ on: [0, 6.05, -12.2], dist: 2.6, to: 2.1, yaw: 90, pitch: 8, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "The rope rises a fraction on twitch. An intimate side-on insert makes a tiny movement the next piece of evidence.",
      stage: (t, { p, dur }) => (<>

      </>),
    },
    {
      cue: "6.wall",
      ...cam.push({ on: [0, 6.05, -16.7], dist: 2.6, to: 2.1, yaw: 10, pitch: 8, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "Follow the same rope to the real slot through the wall. The blue scenery and old stone give no view of what is behind them.",
      stage: (t, { p, dur }) => (<>

      </>),
    },
    {
      cue: "6.scrape",
      ...cam.push({ on: [4, 1.2, -14.75], dist: 2.7, to: 2.25, yaw: 12, pitch: 5, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Return to the teller listening at the wall. The scrape is still beyond sight; his tilted head tells us where it comes from.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.gapFoot} animation="idle" face="uneasy" headPitch={-0.24} headYaw={-0.2} time={t + 0.8} />
      </>),
    },
    {
      cue: "6.shadow",
      ...cam.push({ on: [4, 0.5, -14.75], dist: 3.5, to: 3.0, yaw: 12, pitch: 58, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Look down with him. The unknown shadow reaches his shoes on the bell, and the feet stop while the shadow keeps traveling.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.gapFoot} animation="idle" face="calm" time={0.8 + Math.min(t, wordAt("6.shadow", "bell"))} headPitch={0.4} /><PassingShadow position={[4, 0.08, -14.75]} progress={ramp(t, wordAt("6.shadow", "bell"), wordAt("6.shadow", "bell") + 0.8)} width={3.5} />
      </>),
    },
    {
      cue: "6.still",
      ...cam.push({ on: [4, 1.15, -14.75], dist: 2.15, to: 1.8, yaw: 6, pitch: 18, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "A held downward gaze. He chooses the rule this time, and the moving lens makes his stillness conspicuous.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.gapFoot} animation="idle" face="calm" headPitch={0.4} blink={false} breath={0} weightShift={0} time={0.8} />
      </>),
    },
  ],
});

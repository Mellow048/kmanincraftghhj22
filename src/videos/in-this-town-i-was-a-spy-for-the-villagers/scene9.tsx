import { cam, storyScene } from "../../engine";
import { BatteringRam, Hero, Pillager, timing, wordAt, ramp } from "./kit";

const LURCH = wordAt("9.heave", "lurched");
const TURN = wordAt("9.weakness", "turn");

/** The ram lurches; the spy reads the flaw from its wheels. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The weakness",
  shots: [
    {
      cue: "9.heave",
      ...cam.truck({ on: [70.2, 1.35, 2.5], dist: 11.0, yaw: 0, pitch: 8, by: [-0.4, 0, 0], fov: 56 }),
      zone: "camp",
      look: "overworld-day",
      note: "A sideways track follows three pillagers heaving together as the ram lurches around the marker.",
      stage: (t) => {
        const k = ramp(t, LURCH, LURCH + 0.4);
        return (
          <>
            <BatteringRam position={[70 - k * 0.8, 0, 1.1 + k * 0.45]} wheelSpin={t * 6} yaw={-k * 0.16} lean={k * 0.06} />
            <Pillager position={[68.8, 0, 4.7]} n={1} lean={-0.2} armR={-1.5} />
            <Pillager position={[71.6, 0, 4.7]} n={2} lean={-0.2} armL={-1.5} />
            <Hero position={[70.2, 0, 4.7]} masked animation="push" face="brave" />
          </>
        );
      },
    },
    {
      cue: "9.weakness",
      ...cam.push({ on: [71.35, 1.05, 2.2], dist: 8.0, to: 6.7, yaw: 90, pitch: 4, fov: 50 }),
      zone: "camp",
      look: "overworld-day",
      note: "The near wheel sticks while the long front beam swings wide; the weakness is clear without explanation.",
      stage: (t) => <BatteringRam position={[70.4, 0, 1.3 + Math.sin(t * 4) * 0.05]} wheelSpin={t * 2} bob={0.04} yaw={0.22} tilt={Math.sin(t * 5) * 0.03} />,
    },
    {
      cue: "9.weakness",
      cut: Math.max(0.45, TURN + 0.28),
      ...cam.orbit({ on: [68.1, 1.36, -0.4], dist: 2.6, yaw: -15, yawTo: 34, pitch: 3, fov: 35 }),
      zone: "camp",
      look: "overworld-day",
      note: "The camera lands on the spy's focused eyes as the slow-turning wheel gives them an escape plan.",
      stage: (t) => <Hero position={[68.1, 0, -0.4]} masked face="brave" animation="idle" headYaw={0.18 + Math.sin(t * 2) * 0.04} />,
    },
  ],
});

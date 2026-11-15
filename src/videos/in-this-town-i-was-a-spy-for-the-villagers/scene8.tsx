import { cam, storyScene, Vox } from "../../engine";
import { BatteringRam, Hero, Pillager, timing, wordAt, jolt, ramp } from "./kit";

const TILT = wordAt("8.turn", "tipped");

/** The spy joins the ram crew and notices its poor turning circle. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Pushing with the crew",
  shots: [
    {
      cue: "8.join",
      ...cam.push({ on: [69.5, 1.3, 0.9], dist: 7.5, to: 6.4, yaw: 0, pitch: 6, fov: 48 }),
      zone: "camp",
      look: "overworld-day",
      note: "The spy steps into the ram crew, finding a place between two real pillagers without breaking formation.",
      stage: (t) => (
        <>
          <BatteringRam position={[70, 0, -3.0]} wheelSpin={t * 4} />
          <Hero position={[69.5, 0, 1.3]} masked animation="push" face="brave" animDistance={t * 0.4} />
          <Pillager position={[68.5, 0, 1.8]} n={1} lean={-0.14} armR={-1.5} />
          <Pillager position={[70.7, 0, 1.8]} n={2} lean={-0.12} armL={-1.4} />
        </>
      ),
    },
    {
      cue: "8.push",
      ...cam.truck({ on: [70, 1.25, 0.1], dist: 9.2, yaw: 0, pitch: 8, by: [0, 0, 0.8], fov: 56 }),
      zone: "camp",
      look: "overworld-day",
      note: "Tracking beside the wheel, the frame rides over stones with the bouncing ram and its straining crew.",
      stage: (t, { p }) => (
        <>
          <BatteringRam position={[70, 0, -1.8 + p * 0.8]} wheelSpin={t * 7} bob={Math.abs(Math.sin(t * 12)) * 0.06} />
          <Hero position={[68.5, 0, 2.4 + p * 0.55]} masked animation="push" animDistance={t * 0.55} />
          <Pillager position={[71.4, 0, 2.4 + p * 0.55]} n={3} lean={-0.16} armR={-1.55} />
          <Vox kind="cobble" position={[70.4, 0.17, 3.0]} size={[0.8, 0.3, 0.75]} />
        </>
      ),
    },
    {
      cue: "8.turn",
      ...cam.orbit({ on: [70, 1.4, 2.4], dist: 11.0, yaw: 0, yawTo: 48, pitch: 8, fov: 56 }),
      zone: "camp",
      look: "overworld-day",
      note: "A low side angle catches the heavy cart rocking nearly onto one wheel at the tight turn.",
      stage: (t) => {
        const tip = ramp(t, TILT, TILT + 0.4);
        return (
          <>
            <BatteringRam position={[70 + tip * 0.3, 0, 1.2]} wheelSpin={t * 6} bob={tip * 0.08} yaw={-tip * 0.12} tilt={tip * 0.08} lean={-tip * 0.1 + jolt(t, TILT, 0.03)} />
            <Pillager position={[69.3, 0, 4.6]} n={0} lean={-0.24 - tip * 0.2} armR={-1.45} />
            <Hero position={[70.9, 0, 4.6]} masked animation="push" blendTo="leanOver" blend={1 - tip * 0.65} face="brave" />
          </>
        );
      },
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Hero, Jar, NORTH, SOUTH, ease, ramp, timing } from "./kit";

export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "Nine thousand steps",
  shots: [
    {
      cue: "13.steps",
      ...cam.crane({ on: [0, 1.8, -12.6], onTo: [0, 6.2, -18.8], dist: 5.4, toDist: 3.8, yaw: 14, fromPitch: -18, toPitch: -6, fov: 44, screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-night",
      note: "Hero climbs steadily up the winding stone mountain steps in the dark carrying the jar.",
      stage: (t) => {
        const climb = ease(ramp(t, 0, 1.8));
        const z = -12.6 - climb * 5.2;
        const y = 0.8 + climb * 3.1;
        return (
          <>
            <Hero position={[0.2, y, z]} rotationY={NORTH} animation={climb < 0.96 ? "walk" : "idle"} animDistance={climb * 4.2} face="brave" headPitch={-0.2} time={t * 1.5} />
            <Jar position={[0.55, y + 0.5, z - 0.2]} fill={1} scale={0.85} />
          </>
        );
      },
    },
    {
      cue: "13.night",
      ...cam.orbit({ on: [0, 7.6, -24], dist: 6.4, distTo: 4.5, yaw: -22, yawTo: 18, pitch: 8, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "High stone mountain steps in night wind as lone Hero climbs steadily toward the summit.",
      stage: (t) => {
        const haul = ease(ramp(t, 0, 1.8));
        const z = -22.5 - haul * 3.2;
        const y = 6.6 + haul * 2.0;
        return (
          <>
            <Hero position={[0, y, z]} rotationY={NORTH} animation="walk" animDistance={haul * 3.0} face="brave" headPitch={-0.1} time={t * 1.6} />
            <Jar position={[0.35, y + 0.5, z - 0.2]} fill={1} scale={0.85} />
          </>
        );
      },
    },
    {
      cue: "13.small",
      ...cam.crane({ on: [0, 10.6, -28.6], onTo: [0, 11.4, -28.0], dist: 5.8, toDist: 4.2, yaw: 14, fromPitch: -6, toPitch: 18, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Exhausted Hero turns on high stone mountain ledge looking straight down past tiny warm town lights.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Hero position={[0, 10.5, -28.6]} rotationY={SOUTH * turn} animation={turn < 0.6 ? "cower" : "leanOver"} face="uneasy" headPitch={0.35} time={t} />
            <Jar position={[0.4, 10.65, -28.7]} fill={1} scale={0.85} />
          </>
        );
      },
    },
  ],
});

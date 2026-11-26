import { cam, storyScene } from "../../engine";
import { Hero, Jar, NORTH, SOUTH, ease, ramp, timing } from "./kit";

export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "Nine thousand steps",
  shots: [
    {
      cue: "13.steps",
      ...cam.crane({ on: [1.2, 1.8, -12.6], onTo: [1.2, 6.2, -16.8], dist: 5.4, toDist: 3.8, yaw: 10, fromPitch: -18, toPitch: -6, fov: 44, screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-night",
      note: "Low ladder camera climbs beside straining boots as Hero pulls steadily upward carrying jar.",
      stage: (t) => {
        const climb = ease(ramp(t, 0, 1.8));
        return (
          <>
            <Hero position={[1.2, 1.2 + climb * 3.8, -12.2 - climb * 3.2]} rotationY={NORTH} animation="reachUp" animDistance={climb * 2.8} face="blank" headPitch={-0.2} time={t * 1.6} />
            <Jar position={[1.55, 1.7 + climb * 3.8, -12.4 - climb * 3.2]} fill={1} scale={0.85} />
          </>
        );
      },
    },
    {
      cue: "13.night",
      ...cam.orbit({ on: [1.2, 7.6, -24], dist: 6.4, distTo: 4.5, yaw: -22, yawTo: 18, pitch: 8, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "High cliff wall in night wind as lone Hero hauls himself hand over hand up dark rungs.",
      stage: (t) => {
        const haul = ease(ramp(t, 0, 1.8));
        return (
          <>
            <Hero position={[1.2, 6.8 + haul * 2.1, -24 - haul * 1.4]} rotationY={NORTH} animation="reachUp" animDistance={haul * 2.0} face="blank" headPitch={-0.1} time={t * 1.8} />
            <Jar position={[1.55, 7.3 + haul * 2.1, -24.2 - haul * 1.4]} fill={1} scale={0.85} />
          </>
        );
      },
    },
    {
      cue: "13.small",
      ...cam.crane({ on: [1.2, 10.6, -28.6], onTo: [1.2, 11.4, -28.0], dist: 5.8, toDist: 4.2, yaw: 14, fromPitch: -6, toPitch: 18, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Exhausted Hero turns on high stone ledge looking straight down past tiny warm town pinpricks.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Hero position={[1.2, 10.8, -28.6]} rotationY={SOUTH * turn} animation={turn < 0.6 ? "stagger" : "leanOver"} face="uneasy" headPitch={0.35} time={t} />
            <Jar position={[1.6, 10.95, -28.7]} fill={1} scale={0.85} />
          </>
        );
      },
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Hero, Jar, NORTH, SOUTH, ease, ramp, stepPos, timing } from "./kit";

export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "Nine thousand steps",
  shots: [
    {
      cue: "13.steps",
      ...cam.crane({ on: stepPos(2), onTo: stepPos(8), dist: 5.4, toDist: 4.0, yaw: -48, fromPitch: 12, toPitch: 18, fov: 46, screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-night",
      note: "Side-profile view: Hero climbs steadily up winding stone mountain steps with feet flush atop stairs carrying jar.",
      stage: (t) => {
        const climb = ease(ramp(t, 0, 1.8));
        const p = stepPos(1.5 + climb * 6.5);
        return (
          <>
            <Hero position={p} rotationY={NORTH} animation={climb < 0.96 ? "walk" : "idle"} animDistance={climb * 4.2} face="brave" headPitch={-0.18} time={t * 1.5} />
            <Jar position={[p[0] + 0.35, p[1] + 0.5, p[2] - 0.15]} fill={1} scale={0.85} />
          </>
        );
      },
    },
    {
      cue: "13.night",
      ...cam.orbit({ on: stepPos(16), dist: 6.4, distTo: 4.6, yaw: 58, yawTo: 86, pitch: 8, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Side-profile high on mountain staircase in night wind as lone Hero climbs with feet flush on stone steps.",
      stage: (t) => {
        const haul = ease(ramp(t, 0, 1.8));
        const p = stepPos(14.5 + haul * 4.0);
        return (
          <>
            <Hero position={p} rotationY={NORTH} animation={haul < 0.96 ? "walk" : "idle"} animDistance={haul * 3.0} face="brave" headPitch={-0.1} time={t * 1.6} />
            <Jar position={[p[0] + 0.35, p[1] + 0.5, p[2] - 0.15]} fill={1} scale={0.85} />
          </>
        );
      },
    },
    {
      cue: "13.small",
      ...cam.crane({ on: stepPos(23), onTo: stepPos(23, 0.2), dist: 5.8, toDist: 4.4, yaw: 64, fromPitch: 4, toPitch: 18, fov: 46, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Exhausted Hero turns on top stone mountain step looking back down past tiny warm town lights.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.2));
        const p = stepPos(23);
        return (
          <>
            <Hero position={p} rotationY={SOUTH * turn} animation={turn < 0.6 ? "cower" : "leanOver"} face="uneasy" headPitch={0.35} time={t} />
            <Jar position={[p[0] + 0.4, p[1] + 0.15, p[2] - 0.1]} fill={1} scale={0.85} />
          </>
        );
      },
    },
  ],
});

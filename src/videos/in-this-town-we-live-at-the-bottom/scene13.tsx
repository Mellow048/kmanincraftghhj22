import { cam, storyScene } from "../../engine";
import { Hero, Jar, NORTH, beside, ease, ramp, stepPos, timing } from "./kit";

export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "Nine thousand steps",
  shots: [
    {
      cue: "13.steps",
      ...cam.crane({
        on: [stepPos(1.5)[0], stepPos(1.5)[1] + 0.9, stepPos(1.5)[2]],
        onTo: [stepPos(8.0)[0], stepPos(8.0)[1] + 0.9, stepPos(8.0)[2]],
        dist: 6.4,
        toDist: 6.0,
        yaw: -34,
        fromPitch: 12,
        toPitch: 18,
        fov: 50,
        screenOffset: [0, 0.08],
      }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-night",
      note: "Side-front view: Hero climbs steadily up winding stone mountain steps clutching jar cleanly in hugged arms.",
      stage: (t) => {
        const climb = ramp(t, 0, 1.8);
        const idx = 1.5 + climb * 6.5;
        const p = stepPos(idx);
        const pNext = stepPos(idx + 0.25);
        const yaw = Math.atan2(pNext[0] - p[0], pNext[2] - p[2]);
        return (
          <>
            <Hero position={p} rotationY={yaw} animation={climb < 0.96 ? "walk" : "idle"} arms="hug" animDistance={climb * 4.2} face="brave" headPitch={-0.18} time={t * 1.5} />
            <Jar position={beside(p, yaw, 0, 0.68, 0.26)} fill={1} scale={0.82} />
          </>
        );
      },
    },
    {
      cue: "13.night",
      ...cam.orbit({
        on: [stepPos(14.5)[0], stepPos(14.5)[1] + 0.9, stepPos(14.5)[2]],
        onTo: [stepPos(18.5)[0], stepPos(18.5)[1] + 0.9, stepPos(18.5)[2]],
        dist: 6.8,
        distTo: 6.0,
        yaw: 86,
        yawTo: 102,
        pitch: 12,
        fov: 50,
        screenOffset: [0, 0.08],
      }),
      zone: "bottom",
      look: "overworld-night",
      note: "Side-front 3/4 high on mountain staircase in night wind as Hero climbs toward camera clutching jar.",
      stage: (t) => {
        const haul = ease(ramp(t, 0, 1.8));
        const idx = 14.5 + haul * 4.0;
        const p = stepPos(idx);
        const pNext = stepPos(idx + 0.25);
        const yaw = Math.atan2(pNext[0] - p[0], pNext[2] - p[2]);
        return (
          <>
            <Hero position={p} rotationY={yaw} animation={haul < 0.96 ? "walk" : "idle"} arms="hug" animDistance={haul * 3.0} face="brave" headPitch={-0.1} time={t * 1.6} />
            <Jar position={beside(p, yaw, 0, 0.68, 0.26)} fill={1} scale={0.82} />
          </>
        );
      },
    },
    {
      cue: "13.small",
      ...cam.crane({ on: stepPos(23), onTo: stepPos(23), dist: 5.6, toDist: 4.8, yaw: 48, fromPitch: 4, toPitch: 18, fov: 46, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "High on step 23 completely clear of elevated RichMansion (y=62m): Hero smoothly turns toward SOUTH looking down at tiny town lights.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.2));
        const p = stepPos(23);
        return (
          <>
            <Hero position={p} rotationY={(NORTH - 0.7) * (1 - turn)} animation={turn < 0.6 ? "idle" : "leanOver"} face="uneasy" headPitch={0.32} time={t} />
            <Jar position={[p[0] + 0.44, p[1], p[2] - 0.12]} fill={1} scale={0.85} />
          </>
        );
      },
    },
  ],
});

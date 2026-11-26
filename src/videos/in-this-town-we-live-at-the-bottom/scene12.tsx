import { cam, storyScene } from "../../engine";
import { Friend, Hero, Jar, NORTH, SOUTH, ease, ramp, tw, timing } from "./kit";

export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "What if there is nothing",
  shots: [
    {
      cue: "12.walk",
      ...cam.truck({ on: [1.1, 1.1, -6.4], dist: 4.6, yaw: 62, pitch: 4, fov: 44, by: [0.4, 0, -2.2], screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "Two kids walk quietly side by side down village lane toward ladder carrying packed jar.",
      stage: (t) => (
        <>
          <Hero position={[1.1, 0, -6.4 - t * 1.1]} rotationY={NORTH} animation="walk" animDistance={t * 1.1} face="uneasy" time={t} />
          <Friend position={[0.2, 0, -6.2 - t * 1.1]} rotationY={NORTH} animation="walk" animDistance={t * 1.1 + 0.4} face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "12.q",
      ...cam.push({ on: [0.4, 1.38, -8.4], dist: 3.9, to: 2.45, yaw: 26, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Friend steps around facing Hero earnestly pointing upward at tall cliffside steps.",
      stage: (t) => {
        const turn = ease(ramp(t, 0.4, 1.4));
        return (
          <>
            <Friend position={[0.1 + turn * 0.15, 0, -8.2]} rotationY={SOUTH} animation={t > 0.5 ? "talk" : "point"} face="worried" headPitch={t > 1.2 ? 0.1 : -0.35} lookAt={[0.9, 1.4, -8.8]} time={t} />
            <Hero position={[0.9, 0, -8.8]} rotationY={SOUTH} animation="idle" face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "12.a",
      ...cam.push({ on: [0.9, 1.4, -8.8], dist: 3.8, to: 2.35, yaw: -20, pitch: -2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Hero lifts jaw firmly clutching packed jar onto shoulder stepping toward first rung.",
      stage: (t) => {
        const step = tw(t, 0.5, 1.5);
        return (
          <>
            <Hero position={[0.9, 0, -8.8 - step * 0.35]} rotationY={SOUTH} animation={t < 1.0 ? "talk" : "reach"} animDistance={step * 0.4} face={step > 0.5 ? "brave" : "sad"} time={t} />
            <Jar position={[1.35, 0.85 + step * 0.15, -9.0 - step * 0.35]} fill={1} scale={0.9} />
          </>
        );
      },
    },
  ],
});

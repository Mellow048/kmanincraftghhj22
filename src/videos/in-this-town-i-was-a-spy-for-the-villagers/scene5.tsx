import { cam, storyScene } from "../../engine";
import { BatteringRam, Hero, Pillager, TargetTower, timing, wordAt, jolt, ramp } from "./kit";

const WHISTLE = wordAt("5.whistle", "whistle");
const CHARGE = wordAt("5.whistle", "charged");
const HIT = wordAt("5.crash", "crashed");

/** The drill starts: whistle, ram crew, wooden bell tower. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The ram drill",
  shots: [
    {
      cue: "5.whistle",
      ...cam.truck({ on: [71.7, 1.4, -5.5], dist: 7.2, yaw: 0, pitch: 5, by: [0, 0, 0.9], fov: 42 }),
      zone: "camp",
      look: "overworld-day",
      note: "The mansion and practice yard establish the place as the chief raises a whistle and sends the crew forward.",
      stage: (t) => {
        const charge = ramp(t, CHARGE, CHARGE + 0.55);
        return (
          <>
            <Pillager position={[71.7, 0, -5.5]} n={0} chief talk={ramp(t, WHISTLE, WHISTLE + 0.25)} armR={-1.15} />
            <BatteringRam position={[70, 0, -5 + charge * 3.4]} wheelSpin={charge * 8} bob={Math.abs(Math.sin(t * 12)) * charge * 0.05} />
            <Pillager position={[68.5, 0, -6.8 + charge * 3.4]} n={1} walk={charge * 3.4} lean={-0.14} />
            <Pillager position={[71.5, 0, -6.8 + charge * 3.4]} n={2} walk={charge * 3.4} lean={-0.14} />
            <Hero position={[69.4, 0, -6.8 + charge * 3.4]} masked animation="run" animDistance={charge * 3.4} />
          </>
        );
      },
    },
    {
      cue: "5.ram",
      ...cam.truck({ on: [70, 1.5, -1.6], dist: 7.5, yaw: 90, pitch: 5, by: [0, 0, 1.2], fov: 42 }),
      zone: "camp",
      look: "overworld-day",
      note: "A low travelling side view keeps the spinning square wheels and the wooden target in the same frame.",
      stage: (t, { p }) => (
        <>
          <BatteringRam position={[70, 0, -1.6 + p * 1.2]} wheelSpin={t * 7} bob={Math.abs(Math.sin(t * 12)) * 0.05} />
          <Pillager position={[68.5, 0, -2.2 + p * 1.05]} n={1} walk={t * 1.6} lean={-0.12} />
          <Pillager position={[71.5, 0, -2.3 + p * 1.05]} n={2} walk={t * 1.6} lean={-0.12} />
          <Hero position={[69.1, 0, -3.4 + p * 1.1]} masked animation="push" animDistance={t * 1.5} />
        </>
      ),
    },
    {
      cue: "5.crash",
      ...cam.push({ on: [70, 2.1, 3.3], dist: 6.0, to: 4.3, yaw: -16, pitch: 7, fov: 42 }),
      zone: "camp",
      look: "overworld-day",
      note: "The ram's iron nose lands on the word crashed and folds the little wooden tower sideways.",
      stage: (t) => {
        const hit = ramp(t, HIT, HIT + 0.18);
        return (
          <>
            <BatteringRam position={[70, 0, 0.7 + hit * 0.72 + jolt(t, HIT, 0.12)]} wheelSpin={t * 8} bob={hit * 0.18} lean={-0.08} />
            <TargetTower position={[70, 0, 3.6]} fall={hit} scale={0.94} />
            <Pillager position={[68.1, 0, -0.3 + hit * 0.25]} n={0} walk={t * 1.5} cheer={hit * 0.7} />
            <Pillager position={[72, 0, -0.5 + hit * 0.2]} n={2} walk={t * 1.5} cheer={hit * 0.7} />
          </>
        );
      },
    },
  ],
});

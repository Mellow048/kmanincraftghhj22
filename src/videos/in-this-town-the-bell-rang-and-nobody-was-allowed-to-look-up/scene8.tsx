import { cam, storyScene } from "../../engine";
import { Hero, SkyHole, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "It leaves",
  shots: [
    {
      cue: "8.back",
      ...cam.push({ on: [0, 14, -5], dist: 8, to: 5.6, yaw: 12, pitch: 24, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "One leg goes back into the hole, then another. It is losing.",
      stage: (t) => {
        const back = ease(ramp(t, wordAt("8.back", "back"), wordAt("8.back", "another") + 0.4));
        return (
          <>
            <SkyHole position={[0, 18, -6]} />
            <SkyThing position={[0.3, 12 + back * 2.5, -5]} scale={1.6} legs={7} />
          </>
        );
      },
    },
    {
      cue: "8.slow",
      ...cam.push({ on: [0.35, 1.45, 2.6], dist: 2.8, to: 2, yaw: -8, pitch: -14, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "It looks at him the whole way up. He does not drop his eyes.",
      stage: () => (
        <>
          <Hero position={[0.35, 0, 2.6]} animation="reachUp" face="brave" />
          <SkyThing position={[0.1, 11, -4]} scale={1.15} />
        </>
      ),
    },
    {
      cue: "8.gone",
      ...cam.push({ on: [0, 16, -6], dist: 8, to: 10, yaw: 4, pitch: 20, fov: 48 }),
      zone: "village",
      look: DAY,
      note: "The hole closes. What is left is sky, and the pull-back holds it.",
      stage: (t) => {
        const shut = 1 - ease(ramp(t, wordAt("8.gone", "closed"), wordAt("8.gone", "closed") + 0.55));
        return <SkyHole position={[0, 18, -6]} open={Math.max(0.05, shut)} />;
      },
    },
    {
      cue: "8.quiet",
      ...cam.pan({ from: [-3.2, 1.5, 4.2], on: [-2, 1.1, 1.2], onTo: [2.4, 1.1, 1.1], fov: 40 }),
      zone: "village",
      look: DAY,
      note: "A pan across a town that has nothing left to say.",
      stage: () => <Hero position={[0.35, 0, 1.8]} animation="idle" face="calm" />,
    },
  ],
});

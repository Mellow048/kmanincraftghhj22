import { cam, storyScene } from "../../engine";
import { Baker, BellRope, Crowd, Hero, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The rope",
  shots: [
    {
      cue: "6.reach",
      ...cam.push({ on: [0.2, 2.5, -1.6], dist: 7.4, to: 5.6, yaw: -6, pitch: 8, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "A leg reaches for the rope, and one orange kid is still on his feet.",
      stage: (t) => {
        const reach = ease(ramp(t, wordAt("6.reach", "rope"), wordAt("6.reach", "rope") + 0.45));
        return (
          <>
            <SkyThing position={[0.35, 3.9, -3.1]} scale={1.15} reach={0.35 + reach * 0.6} turn={-0.05} />
            <BellRope />
            <Hero position={[0.25, 0, 0.7]} animation="reachUp" face="brave" />
            <Crowd n={5} at={[0.2, 0, 0.7]} />
          </>
        );
      },
    },
    {
      cue: "6.run",
      ...cam.truck({ on: [-0.6, 1.05, 1.4], dist: 3.8, yaw: 82, pitch: 8, fov: 44, by: [3.4, 0, -1.6] }),
      zone: "village",
      look: DAY,
      note: "Running with him, under a leg, past the baker who will not look up.",
      stage: (t) => {
        const run = ease(ramp(t, 0.1, 1));
        return (
          <>
            <Hero position={[-0.4 + run * 2.2, 0, 1.3 - run * 1.4]} animation="run" face="fear" />
            <Baker position={[1.8, 0, 0.3]} lean={1.15} nod={0.7} />
            <SkyThing position={[0.5, 3.4, -1.6]} scale={1.2} reach={0.8} turn={-0.2} />
          </>
        );
      },
    },
    {
      cue: "6.pull",
      ...cam.push({ on: [0.15, 1.55, -1.85], dist: 2.5, to: 1.85, yaw: 36, pitch: 12, fov: 32 }),
      zone: "village",
      look: DAY,
      note: "Close: his raised hand meets the hanging rope, and the bell is in the same frame.",
      stage: (t) => {
        const pull = ease(ramp(t, wordAt("6.pull", "pulled"), wordAt("6.pull", "pulled") + 0.35));
        return (
          <>
            <Hero position={[0.28, 0, -1.55]} rotationY={3.1} animation="reachUp" face="brave" />
            <BellRope pull={pull} />
          </>
        );
      },
    },
    {
      cue: "6.twice",
      ...cam.top({ on: [0.15, 0.2, -0.6], height: 16, to: 12, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "From above: on looked, every chin comes off the dirt at once.",
      stage: (t) => {
        const up = ease(ramp(t, wordAt("6.twice", "looked"), wordAt("6.twice", "looked") + 0.35));
        const bow = 1.15 * (1 - up);
        return (
          <>
            <Hero position={[0.2, 0, 1.1]} animation="reachUp" />
            <Baker position={[1.8, 0, 0.8]} lean={bow} nod={bow * 0.5} />
            <Crowd n={8} up={up} at={[0.2, 0, 0.5]} />
            <SkyThing position={[2.4, 6.5, -4.2]} scale={0.45} turn={0.2} />
          </>
        );
      },
    },
  ],
});

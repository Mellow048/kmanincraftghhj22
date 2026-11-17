import { cam, storyScene } from "../../engine";
import { Baker, Bell, Hero, PLACE, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "What I saw",
  shots: [
    {
      cue: "2.big",
      ...cam.push({ on: [0.4, 8, -3], dist: 11, to: 8, yaw: 18, pitch: 12, fov: 50 }),
      zone: "village",
      look: DAY,
      note: "The thing and the bell tower in one frame, so bigger is a measurement.",
      stage: () => (
        <>
          <Bell position={PLACE.bell} />
          <SkyThing position={[1.2, 9, -4]} scale={2.4} legs={9} />
        </>
      ),
    },
    {
      cue: "2.slow",
      ...cam.orbit({ on: [1, 8, -4], dist: 8, yaw: -36, yawTo: 28, pitch: 14, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "A slow orbit. It is not chasing him. That is worse.",
      stage: () => (
        <>
          <SkyThing position={[1, 7.5, -4]} scale={2} />
          <Hero position={[0.3, 0, 2.4]} animation="reachUp" face="fear" />
        </>
      ),
    },
    {
      cue: "2.down",
      ...cam.push({ on: [0.35, 0.7, 2.4], dist: 2.8, to: 1.8, yaw: 10, pitch: 28, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "On dirt his chin drops and he is one more face in the square.",
      stage: (t) => {
        const drop = ease(ramp(t, wordAt("2.down", "dirt"), wordAt("2.down", "dirt") + 0.35));
        return <Hero position={[0.35, 0, 2.4]} animation={drop > 0.5 ? "crouch" : "reachUp"} face="uneasy" />;
      },
    },
    {
      cue: "2.fine",
      ...cam.truck({ on: [-2.4, 1.15, 1.6], dist: 4.6, yaw: 72, pitch: 8, fov: 40, by: [5, 0, 0] }),
      zone: "village",
      look: DAY,
      note: "The street stands up and walks on. Nobody turns to ask him.",
      stage: (t) => (
        <>
          <Baker position={[-1.6 + t * 0.4, 0, 1.1]} walk={t * 1.4} lean={0.05} />
          <Hero position={[1.6, 0, 2.2]} animation="idle" face="frown" />
        </>
      ),
    },
  ],
});

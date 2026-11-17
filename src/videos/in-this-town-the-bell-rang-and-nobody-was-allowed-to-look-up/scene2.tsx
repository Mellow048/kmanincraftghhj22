import { cam, storyScene } from "../../engine";
import { Baker, Hero, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "What I saw",
  shots: [
    {
      cue: "2.big",
      ...cam.push({ on: [0.6, 3.6, -2.4], dist: 11.5, to: 9, yaw: 74, pitch: 12, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "Side on: the thing and the bell in one frame, so bigger is a measurement.",
      stage: () => <SkyThing position={[1.6, 4.4, -2.5]} scale={1.85} legs={9} turn={1.35} />,
    },
    {
      cue: "2.slow",
      ...cam.orbit({ on: [0.6, 3.4, -1.2], dist: 7.2, yaw: -40, yawTo: 30, pitch: 10, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "A slow orbit. He is small under it. It is not chasing him.",
      stage: () => (
        <>
          <SkyThing position={[0.8, 3.8, -1.6]} scale={1.55} turn={0.4} />
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

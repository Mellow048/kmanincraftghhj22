import { cam, storyScene } from "../../engine";
import { Baker, BellRope, Crowd, Friend, Golem, Hero, Mum, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "He stays up",
  shots: [
    {
      cue: "5.wait",
      ...cam.push({ on: [0.3, 0.7, 1.35], dist: 2.6, to: 1.8, yaw: 10, pitch: -32, fov: 40 }),
      zone: "village",
      look: DAY,
      note: "From the dirt, between the bowed legs. He is the only chin still up.",
      stage: () => (
        <>
          <Hero position={[0.3, 0, 1.85]} animation="idle" face="brave" />
          <Mum position={[-1.15, 0, 0.85]} lean={1.1} />
          <Friend position={[1.15, 0, 0.9]} lean={1.05} />
          <Baker position={[-0.2, 0, 0.35]} lean={1.2} nod={0.7} />
          <Golem position={[2.4, 0, 1.8]} bow={1.2} />
        </>
      ),
    },
    {
      cue: "5.count",
      ...cam.pan({ from: [-3.4, 2.2, 1.6], on: [-2.2, 1.6, -1.4], onTo: [2.6, 1.5, -1.6], fov: 42 }),
      zone: "village",
      look: DAY,
      note: "A pan along the legs, low, so each one is a thing you can count.",
      stage: (t) => {
        const more = 8 + Math.floor(ease(ramp(t, wordAt("5.count", "nine"), wordAt("5.count", "nine") + 0.2)) * 3);
        return <SkyThing position={[0.2, 3.6, -1.8]} scale={1.35} legs={more} reach={0.2} />;
      },
    },
    {
      cue: "5.eye",
      ...cam.push({ on: [0.35, 3.5, -1.6], dist: 4.6, to: 3.2, yaw: 12, pitch: 6, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "The one eye and the bell in the same frame, so we see what it wants.",
      stage: () => <SkyThing position={[0.7, 3.35, -2.2]} scale={1.25} turn={0.15} />,
    },
    {
      cue: "5.want",
      ...cam.truck({ on: [-0.8, 2.4, -0.6], dist: 5.4, yaw: 32, pitch: 12, fov: 42, by: [1.6, 0.8, -0.4] }),
      zone: "village",
      look: DAY,
      note: "Travelling up with the reach. The rope is the only thing it cannot stand.",
      stage: () => (
        <>
          <SkyThing position={[0.8, 3.6, -2.2]} scale={1.35} reach={0.7} turn={0.2} />
          <BellRope />
          <Hero position={[0.25, 0, 1.4]} animation="reachUp" face="fear" />
          <Baker position={[2.1, 0, 1]} lean={1.1} nod={0.6} />
          <Crowd n={4} at={[0.2, 0, 0.8]} />
        </>
      ),
    },
  ],
});

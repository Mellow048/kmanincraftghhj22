import { cam, storyScene } from "../../engine";
import { Baker, Bell, BellRope, Friend, Golem, Hero, Mum, PLACE, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "He stays up",
  shots: [
    {
      cue: "5.wait",
      ...cam.push({ on: [0.3, 1.3, 1.6], dist: 4.2, to: 2.8, yaw: 6, pitch: -6, fov: 40 }),
      zone: "village",
      look: DAY,
      note: "The square is a field of bowed noses, and he is the post in the middle.",
      stage: () => (
        <>
          <Hero position={[0.3, 0, 1.8]} animation="idle" face="brave" />
          <Mum position={[-1.4, 0, 1.1]} lean={1.15} nod={0.7} />
          <Friend position={[1.3, 0, 1.15]} lean={1.05} nod={0.75} />
          <Golem position={[2.8, 0, 2.3]} bow={1.2} />
        </>
      ),
    },
    {
      cue: "5.count",
      ...cam.pan({ from: [-3.2, 5.5, 3.5], on: [-2.4, 6, -2], onTo: [3.2, 5, -3], fov: 48 }),
      zone: "village",
      look: DAY,
      note: "A pan along the legs. The count runs out before the legs do.",
      stage: (t) => {
        const more = 8 + Math.floor(ease(ramp(t, wordAt("5.count", "nine"), wordAt("5.count", "nine") + 0.2)) * 3);
        return <SkyThing position={[0.2, 6.4, -2.6]} scale={2} legs={more} />;
      },
    },
    {
      cue: "5.eye",
      ...cam.push({ on: [0.3, 7.2, -2.2], dist: 4.2, to: 2.7, yaw: 6, pitch: 8, fov: 34 }),
      zone: "village",
      look: DAY,
      note: "The one eye and the bell in the same frame, so we see what it wants.",
      stage: () => (
        <>
          <SkyThing position={[0.5, 6.6, -2.8]} scale={1.55} />
          <Bell position={PLACE.bell} />
        </>
      ),
    },
    {
      cue: "5.want",
      ...cam.truck({ on: [-1.2, 3.2, -1.2], dist: 4.8, yaw: 36, pitch: 16, fov: 42, by: [2.2, 1.1, 0] }),
      zone: "village",
      look: DAY,
      note: "Travelling up with the reach. The rope is the only thing it cannot stand.",
      stage: () => (
        <>
          <SkyThing position={[1.1, 5.4, -2.6]} scale={1.5} />
          <Bell position={PLACE.bell} />
          <BellRope />
          <Hero position={[0.25, 0, 1.2]} animation="reachUp" face="fear" />
          <Baker position={[2.1, 0, 1]} lean={1.1} nod={0.6} />
        </>
      ),
    },
  ],
});

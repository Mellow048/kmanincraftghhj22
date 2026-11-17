import { cam, storyScene } from "../../engine";
import { Baker, BellRope, Crowd, Friend, Golem, Hero, Mum, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "He stays up",
  shots: [
    {
      cue: "5.wait",
      ...cam.push({ on: [0.3, 1.35, 1.05], dist: 5.8, to: 4.6, yaw: 8, pitch: 6, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "Above the ground: his chin stays up, the others are bowed, and a leg is in the frame.",
      stage: () => (
        <>
          <Hero position={[0.3, 0, 1.35]} animation="idle" face="brave" />
          <Mum position={[-1.05, 0, 0.7]} lean={1.2} nod={0.75} />
          <Friend position={[1.15, 0, 0.65]} lean={1.2} nod={0.7} />
          <Baker position={[-0.2, 0, 0.15]} lean={1.25} nod={0.85} />
          <Golem position={[2.1, 0, 1.45]} bow={1.1} />
          <SkyThing position={[0.15, 4.1, -0.35]} scale={0.95} legs={8} />
        </>
      ),
    },
    {
      cue: "5.count",
      ...cam.push({ on: [0.2, 1.4, -1.4], dist: 6.4, to: 5, yaw: 8, pitch: 6, fov: 46 }),
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
      ...cam.push({ on: [0.4, 3.3, -2.2], dist: 7.6, to: 6.2, yaw: 6, pitch: 4, fov: 40 }),
      zone: "village",
      look: DAY,
      note: "The whole eye, and the bell under it. Neither is cropped.",
      stage: () => <SkyThing position={[0.55, 3.5, -2.8]} scale={1.05} turn={0.05} />,
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

import { Vox, cam, storyScene } from "../../engine";
import { Baker, Friend, Hero, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The next day",
  shots: [
    {
      cue: "3.again",
      ...cam.push({ on: [0.3, 2.2, 0.4], dist: 8.6, to: 6.8, yaw: 8, pitch: 10, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "He looks up. The thing is lower and nearer than the hole. Closer is a measurement.",
      stage: () => (
        <>
          <Hero position={[0.25, 0, 1.55]} animation="reachUp" face="fear" />
          <SkyThing position={[0.5, 3.8, -2.4]} scale={1.55} legs={8} turn={0.1} reach={0.4} />
        </>
      ),
    },
    {
      cue: "3.roof",
      ...cam.push({ on: [1.2, 3.2, -5.4], dist: 11, to: 9, yaw: 16, pitch: 12, fov: 48 }),
      zone: "village",
      look: DAY,
      note: "From the street: the roof, one black leg on it, and the baker under it with his nose in the bread.",
      stage: () => (
        <>
          <SkyThing position={[0.4, 6.4, -7.2]} scale={0.5} legs={6} reach={1} />
          <Baker position={[1.1, 0, -3.6]} lean={1.2} nod={0.85} />
          <Vox kind="hay" position={[1.15, 0.55, -3.05]} size={[0.42, 0.16, 0.28]} />
        </>
      ),
    },
    {
      cue: "3.tell",
      ...cam.push({ on: [0.42, 1.25, 1.35], dist: 2.7, to: 2.15, yaw: 6, pitch: 8, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "His arm is on his friend. Both of them are in the frame.",
      stage: () => (
        <>
          <Hero position={[0.15, 0, 1.35]} animation="reach" face="fear" />
          <Friend position={[0.72, 0, 1.2]} rotationY={-0.5} lean={0.15} nod={0.3} />
        </>
      ),
    },
    {
      cue: "3.wont",
      ...cam.push({ on: [1.05, 1.2, 1.95], dist: 3.6, to: 2.8, yaw: 34, pitch: 4, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "Three-quarter: both hands are already over his eyes, and he sings.",
      stage: (t) => {
        const sing = ease(ramp(t, wordAt("3.wont", "sang"), wordAt("3.wont", "sang") + 0.2));
        return <Friend position={[1.05, 0, 1.95]} cover={1} hmm={sing} />;
      },
    },
  ],
});

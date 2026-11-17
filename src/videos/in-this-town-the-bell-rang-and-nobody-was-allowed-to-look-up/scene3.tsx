import { Vox, cam, storyScene } from "../../engine";
import { Baker, Friend, Hero, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The next day",
  shots: [
    {
      cue: "3.again",
      ...cam.push({ on: [1.1, 3.2, -5.2], dist: 8.2, to: 6.2, yaw: -28, pitch: 14, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "The square and a roof, and the thing lower than yesterday. Closer is the picture.",
      stage: () => <SkyThing position={[1.5, 4.1, -5.4]} scale={1.7} legs={9} turn={-0.4} reach={0.35} />,
    },
    {
      cue: "3.roof",
      ...cam.push({ on: [0.6, 3.6, -6.4], dist: 7.2, to: 5.6, yaw: 24, pitch: 16, fov: 40 }),
      zone: "village",
      look: DAY,
      note: "The roof, one black leg on it, and the baker under it with his nose in the bread.",
      stage: () => (
        <>
          <SkyThing position={[0.2, 6.4, -7.6]} scale={0.7} legs={6} reach={1} />
          <Baker position={[1.4, 0, -5.1]} lean={1.2} nod={0.85} />
          <Vox kind="hay" position={[1.45, 0.55, -4.55]} size={[0.42, 0.16, 0.28]} />
        </>
      ),
    },
    {
      cue: "3.tell",
      ...cam.truck({ on: [-0.2, 1.2, 2.15], dist: 2.8, yaw: 58, pitch: 10, fov: 36, by: [1.5, 0, -0.2] }),
      zone: "village",
      look: DAY,
      note: "He points up. His friend has already turned his nose away.",
      stage: (t) => {
        const away = ease(ramp(t, wordAt("3.tell", "friend"), wordAt("3.tell", "friend") + 0.3));
        return (
          <>
            <Hero position={[0, 0, 1.85]} animation="point" face="fear" />
            <Friend position={[1.05, 0, 1.95]} rotationY={away * 2.4} lean={0.35} nod={0.4} />
          </>
        );
      },
    },
    {
      cue: "3.wont",
      ...cam.push({ on: [1.05, 1.4, 1.95], dist: 1.9, to: 1.4, yaw: 24, pitch: 14, fov: 32 }),
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

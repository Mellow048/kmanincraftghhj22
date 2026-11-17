import { Vox, cam, storyScene } from "../../engine";
import { Baker, Friend, Hero, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The next day",
  shots: [
    {
      cue: "3.again",
      ...cam.push({ on: [0.6, 6.5, -2], dist: 7.5, to: 5.2, yaw: -10, pitch: 16, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "Closer than yesterday: a roof is in the frame, so closer is not a claim.",
      stage: () => <SkyThing position={[1.4, 6.2, -2.4]} scale={1.9} legs={9} />,
    },
    {
      cue: "3.roof",
      ...cam.top({ on: [0.4, 3.2, -7.2], height: 8.5, to: 5.4, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "Straight down: one black leg on the baker's roof, his nose in the bread.",
      stage: () => (
        <>
          <SkyThing position={[0.2, 4.6, -6.6]} scale={1.15} legs={6} />
          <Baker position={[1.3, 0, -4.2]} lean={1.15} nod={0.8} />
          <Vox kind="hay" position={[1.35, 0.12, -3.7]} size={[0.36, 0.16, 0.22]} />
        </>
      ),
    },
    {
      cue: "3.tell",
      ...cam.push({ on: [0.5, 1.15, 1.9], dist: 2.7, to: 1.9, yaw: 22, pitch: 6, fov: 36 }),
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
      ...cam.push({ on: [1.05, 1.05, 1.95], dist: 1.7, to: 1.2, yaw: -8, pitch: 10, fov: 34 }),
      zone: "village",
      look: DAY,
      note: "He shuts his eyes by putting his nose in his chest, and he sings.",
      stage: (t) => {
        const sing = ease(ramp(t, wordAt("3.wont", "sang"), wordAt("3.wont", "sang") + 0.2));
        return <Friend position={[1.05, 0, 1.95]} lean={0.7} nod={0.9} hmm={sing} />;
      },
    },
  ],
});

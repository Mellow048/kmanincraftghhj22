import { cam, storyScene } from "../../engine";
import { Hero, JarNeighbor, EAST, ReachingHand, ShadowKey, SubscribeSign, pop, timing } from "./kit";
/** Beat 18: Outside when it closed. The recorded words, not hand-set seconds, own every cut. */
export const scene18 = storyScene(timing, {
  id: "scene18",
  title: "Outside when it closed",
  shots: [
    {
      cue: "18.sub",
      ...cam.push({ on: [8.36,1.3,-22.045], dist: 4.3, to: 3.8, yaw: 80, pitch: 6, fov: 42 }),
      zone: "shelf",
      look: "void",
      note: "The kid is outside the closed case, so the second bell cannot protect him. The familiar red sign is a real held prop. Cut before the giant hand reaches him.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[8.36,0,-22.045]} rotationY={EAST} animation="hold" face="fear" time={0.8} pack /><SubscribeSign position={[8.64,0.87,-22.045]} rotationY={EAST} scale={0.58 * pop(t,0)} /><JarNeighbor alive t={t} /><ReachingHand progress={0.65 + p * 0.25} /><ShadowKey />
      </>),
    },
  ],
});

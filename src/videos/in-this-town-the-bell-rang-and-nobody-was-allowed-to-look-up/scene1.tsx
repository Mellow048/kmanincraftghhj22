import { cam, storyScene } from "../../engine";
import { Baker, BellRope, Crowd, Friend, Golem, Hero, Mum, SkyHole, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

/** The law, already broken, in the first second. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The law",
  shots: [
    {
      cue: "1.bell",
      ...cam.push({ on: [0.15, 2.15, -0.35], dist: 8.4, to: 6.8, yaw: 2, pitch: 2, fov: 44 }),
      zone: "village",
      look: DAY,
      note: "Frame one: the eye, the bell between the legs, noses in the dirt, one orange kid looking up.",
      stage: (t) => {
        const leg = 0.35 + ease(ramp(t, 0.05, 0.7)) * 0.4;
        return (
          <>
            <BellRope />
            <Hero position={[0.25, 0, 1.15]} animation="reachUp" face="wow" />
            <Mum position={[-1.45, 0, 0.55]} lean={1.1} />
            <Baker position={[1.55, 0, 0.4]} lean={1.2} nod={0.75} />
            <Golem position={[2.55, 0, 1.35]} bow={1.15} />
            <Crowd n={6} at={[0.1, 0, 0.15]} />
            <SkyThing position={[0.05, 4.15, -3.05]} scale={1.15} legs={8} reach={leg} />
          </>
        );
      },
    },
    {
      cue: "1.dirt",
      ...cam.truck({ on: [-2.2, 0.7, 1.3], dist: 3.6, yaw: 78, pitch: 22, fov: 40, by: [5.2, 0, 0] }),
      zone: "village",
      look: DAY,
      note: "Travelling the dirt: a shopkeeper, a kid, then the iron golem, all bowed.",
      stage: () => (
        <>
          <Baker position={[-2.2, 0, 1.1]} lean={1.2} nod={0.7} />
          <Friend position={[0.3, 0, 1.35]} lean={1.05} />
          <Golem position={[2.8, 0, 2.1]} bow={1.25} />
          <Crowd n={5} at={[0.4, 0, 0.6]} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: [0.35, 1.15, 1.7], dist: 2.2, to: 1.45, yaw: -6, pitch: -18, fov: 34 }),
      zone: "village",
      look: DAY,
      note: "From the dirt, looking up at the only chin that is not in it.",
      stage: () => <Hero position={[0.35, 0, 1.7]} animation="reachUp" face="brave" />,
    },
    {
      cue: "1.saw",
      ...cam.push({ on: [0, 9.2, -0.4], dist: 8.2, to: 6.4, yaw: 8, pitch: -18, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "Looking up into open sky: a dark mouth, and the thing already climbing out of it.",
      stage: (t) => {
        const climb = ease(ramp(t, wordAt("1.saw", "climbing"), wordAt("1.saw", "climbing") + 0.8));
        return (
          <>
            <SkyHole position={[0, 11.4, -0.6]} />
            <SkyThing position={[0.1, 8.6 - climb * 1.4, -0.15]} scale={1.2} legs={9} reach={0.15 + climb * 0.45} />
          </>
        );
      },
    },
  ],
});

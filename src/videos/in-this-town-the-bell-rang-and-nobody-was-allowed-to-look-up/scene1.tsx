import { cam, storyScene } from "../../engine";
import { Baker, BellRope, Crowd, Friend, Golem, Hero, Mum, SkyHole, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

/** The law, already broken, in the first second. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The law",
  shots: [
    {
      cue: "1.bell",
      ...cam.push({ on: [0.2, 2.05, 0.15], dist: 6.6, to: 5.1, yaw: 4, pitch: -8, fov: 48 }),
      zone: "village",
      look: DAY,
      note: "Frame one: the hole, the eye, the bell, noses in the dirt, and one orange kid already looking up.",
      stage: (t) => {
        const leg = 0.35 + ease(ramp(t, 0.05, 0.7)) * 0.4;
        return (
          <>
            <BellRope />
            <Hero position={[0.35, 0, 2.05]} animation="reachUp" face="wow" />
            <Mum position={[-1.35, 0, 1.25]} lean={1.1} />
            <Baker position={[1.55, 0, 1.05]} lean={1.2} nod={0.7} />
            <Golem position={[2.7, 0, 2.15]} bow={1.15} />
            <Crowd n={6} at={[0.1, 0, 0.2]} />
            <SkyHole position={[0.15, 4.85, -3.1]} open={1} />
            <SkyThing position={[0.15, 3.35, -2.15]} scale={1.05} legs={8} reach={leg} />
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
      ...cam.push({ on: [0.1, 4.2, -0.6], dist: 6.4, to: 4.6, yaw: 16, pitch: 8, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "The hole, and on climbing the thing is already halfway out of it.",
      stage: (t) => {
        const climb = ease(ramp(t, wordAt("1.saw", "climbing"), wordAt("1.saw", "climbing") + 0.8));
        return (
          <>
            <SkyHole position={[0, 5.4, -1.2]} />
            <SkyThing position={[0.15, 3.6 - climb * 1.1, -0.2]} scale={1.45} legs={9} reach={0.2 + climb * 0.5} />
          </>
        );
      },
    },
  ],
});

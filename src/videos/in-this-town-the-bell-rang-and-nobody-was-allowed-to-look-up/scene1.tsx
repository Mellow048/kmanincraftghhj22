import { cam, storyScene } from "../../engine";
import { ROBE, Villager } from "../../../Topics/InThisTown";
import { Baker, BellRope, Crowd, Friend, Golem, Hero, SkyHole, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

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
            <Hero position={[0.2, 0, 1.05]} animation="reachUp" face="wow" />
            <Villager position={[-1.25, 0, 0.72]} robe={ROBE.red} lean={1.25} nod={0.85} />
            <Baker position={[1.2, 0, 0.62]} lean={1.25} nod={0.85} />
            <Golem position={[2.55, 0, 1.35]} bow={1.15} />
            <Crowd n={6} at={[0.1, 0, 0.15]} />
            <SkyThing position={[0.05, 4.15, -3.05]} scale={1.15} legs={8} reach={leg} />
          </>
        );
      },
    },
    {
      cue: "1.dirt",
      ...cam.push({ on: [0.15, 0.95, 1.05], dist: 4.6, to: 3.7, yaw: 8, pitch: 32, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "One frame: the baker, the kids and the iron golem, every face in the dirt.",
      stage: () => (
        <>
          <Baker position={[-1.6, 0, 0.7]} lean={1.3} nod={0.9} />
          <Friend position={[0.15, 0, 1.15]} lean={1.2} nod={0.8} />
          <Hero position={[1.15, 0, 0.85]} animation="crouch" face="uneasy" />
          <Golem position={[2.3, 0, 1.5]} bow={1.2} />
          <Crowd n={4} at={[0.1, 0, 0.2]} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: [0.35, 1.4, 1.45], dist: 3.4, to: 2.5, yaw: -10, pitch: -6, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "From the dirt, looking up at the only chin that is not in it.",
      stage: () => <Hero position={[0.35, 0, 1.7]} animation="reachUp" face="brave" />,
    },
    {
      cue: "1.saw",
      ...cam.push({ on: [0, 8.4, 1.2], dist: 9.5, to: 7.6, yaw: 4, pitch: -14, fov: 48 }),
      zone: "village",
      look: DAY,
      note: "Open sky through the ring, and the thing climbing out of that ring.",
      stage: (t) => {
        const climb = ease(ramp(t, wordAt("1.saw", "climbing"), wordAt("1.saw", "climbing") + 0.8));
        return (
          <>
            <SkyHole position={[0, 10.2, -0.2]} open={1} />
            <SkyThing position={[0.05, 7.4 - climb * 1.1, 0.15]} scale={0.95} legs={8} reach={0.2 + climb * 0.4} />
          </>
        );
      },
    },
  ],
});

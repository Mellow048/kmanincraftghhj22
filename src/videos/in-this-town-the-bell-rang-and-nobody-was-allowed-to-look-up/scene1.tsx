import { cam, storyScene } from "../../engine";
import { Baker, Bell, BellRope, Friend, Golem, Hero, Mum, PLACE, SkyHole, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

/** The law, already broken, in the first second. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The law",
  shots: [
    {
      cue: "1.bell",
      ...cam.push({ on: [0.2, 1.6, 0.2], dist: 6.2, to: 4.4, yaw: 8, pitch: -8, fov: 48 }),
      zone: "village",
      look: DAY,
      note: "Frame one: the bell, every nose in the dirt, and one orange kid already looking up.",
      stage: (t) => {
        const up = wordAt("1.bell", "up");
        const leg = ease(ramp(t, up - 0.15, up + 0.35));
        return (
          <>
            <group position={PLACE.bell} rotation={[0, 0, Math.sin(t * 10) * 0.05]}>
              <Bell position={[0, 0, 0]} />
            </group>
            <BellRope />
            <Hero position={[0.35, 0, 1.7]} animation="reachUp" face="wow" />
            <Mum position={[-1.5, 0, 1.15]} lean={1.15} nod={0.7} />
            <Baker position={[1.7, 0, 0.95]} lean={1.2} nod={0.65} />
            <Golem position={[3.1, 0, 2.2]} bow={1.15} />
            <SkyHole />
            <SkyThing position={[0.4, 11 - leg * 2.2, -5]} scale={1.3} legs={8} />
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
          <Friend position={[0.3, 0, 1.35]} lean={1.05} nod={0.8} />
          <Golem position={[2.8, 0, 2.1]} bow={1.25} />
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
      ...cam.push({ on: [0, 14, -6], dist: 9, to: 6.2, yaw: 14, pitch: 18, fov: 50 }),
      zone: "village",
      look: DAY,
      note: "The hole, and on climbing the thing is already halfway out of it.",
      stage: (t) => {
        const climb = ease(ramp(t, wordAt("1.saw", "climbing"), wordAt("1.saw", "climbing") + 0.8));
        return (
          <>
            <SkyHole position={[0, 20, -7]} />
            <SkyThing position={[0.2, 16 - climb * 3, -6.5]} scale={1.6} legs={9} />
          </>
        );
      },
    },
  ],
});

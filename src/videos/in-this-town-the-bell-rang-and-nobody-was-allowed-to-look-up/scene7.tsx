import { cam, storyScene } from "../../engine";
import { Baker, Bell, BellRope, Dad, Friend, Golem, Hero, Mum, PLACE, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "They saw it",
  shots: [
    {
      cue: "7.scream",
      ...cam.push({ on: [-0.6, 1.3, 1.5], dist: 2.8, to: 1.9, yaw: 12, pitch: 4, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "Mum snaps upright. The friend stops singing and his nose comes up.",
      stage: (t) => {
        const stop = ease(ramp(t, wordAt("7.scream", "stopped"), wordAt("7.scream", "stopped") + 0.25));
        return (
          <>
            <Mum position={[-1.4, 0, 1.15]} lean={-0.25} nod={-0.35} />
            <Friend position={[0.55, 0, 1.55]} lean={0.5 * (1 - stop)} nod={0.7 * (1 - stop) - 0.3 * stop} hmm={1 - stop} />
          </>
        );
      },
    },
    {
      cue: "7.run",
      ...cam.truck({ on: [-3.2, 1.05, 1.8], dist: 4.6, yaw: 76, pitch: 8, fov: 42, by: [5.5, 0, -1.2] }),
      zone: "village",
      look: DAY,
      note: "They run toward the tower, not away from it. That is the turn.",
      stage: (t) => {
        const go = ease(ramp(t, wordAt("7.run", "Toward"), wordAt("7.run", "Toward") + 0.7));
        return (
          <>
            <Mum position={[-2.6 + go * 1.4, 0, 1.5 - go * 0.8]} walk={go * 3} />
            <Dad position={[-0.8 + go * 1.2, 0, 1.7 - go * 0.7]} walk={go * 3} />
            <Baker position={[0.8 + go * 1.1, 0, 1.2 - go * 0.6]} walk={go * 2.6} />
            <Golem position={[2.6 + go * 0.6, 0, 2.2]} bow={0.15} walk={go * 1.4} />
          </>
        );
      },
    },
    {
      cue: "7.rope",
      ...cam.push({ on: [0.2, 1.55, -0.8], dist: 3.6, to: 2.5, yaw: 8, pitch: 12, fov: 40 }),
      zone: "village",
      look: DAY,
      note: "The rope, and the square arriving on it. Ten, then twenty, is the picture.",
      stage: (t) => {
        const more = ease(ramp(t, wordAt("7.rope", "twenty"), wordAt("7.rope", "twenty") + 0.3));
        return (
          <>
            <Bell position={PLACE.bell} />
            <BellRope pull={0.4} />
            <Hero position={[-0.35, 0, -0.55]} animation="reachUp" />
            <Mum position={[0.55, 0, -0.35]} lean={0.15} nod={-0.2} />
            <Dad position={[1.15, 0, -0.7]} lean={0.1} nod={-0.15} />
            <Friend position={[-1.05, 0, -0.25]} lean={0.05} nod={-0.25} />
            <Baker position={[1.7, 0, 0.15]} lean={0.1} nod={-0.2} />
            {more > 0.4 ? <Golem position={[2.5, 0, 0.8]} bow={-0.1} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.ring",
      ...cam.orbit({ on: [0.3, 4.2, -1.8], dist: 7, yaw: -40, yawTo: 24, pitch: 14, fov: 44 }),
      zone: "village",
      look: DAY,
      note: "The bell will not stop, and the thing has turned toward all of them.",
      stage: (t) => (
        <>
          <group position={PLACE.bell} rotation={[0, 0, Math.sin(t * 16) * 0.1]}>
            <Bell position={[0, 0, 0]} />
          </group>
          <SkyThing position={[1.6, 5.2, -2.8]} scale={1.8} />
          <Hero position={[0.1, 0, 0.8]} animation="reachUp" face="brave" />
        </>
      ),
    },
  ],
});

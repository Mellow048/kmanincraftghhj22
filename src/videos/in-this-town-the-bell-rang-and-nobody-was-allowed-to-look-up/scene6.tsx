import { cam, storyScene } from "../../engine";
import { Baker, Bell, BellRope, Hero, PLACE, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The rope",
  shots: [
    {
      cue: "6.reach",
      ...cam.push({ on: [0.2, 4.2, -1.6], dist: 5.8, to: 4, yaw: -14, pitch: 18, fov: 44 }),
      zone: "village",
      look: DAY,
      note: "A leg reaches for the rope, and one orange kid is still on his feet.",
      stage: (t) => {
        const reach = ease(ramp(t, wordAt("6.reach", "rope"), wordAt("6.reach", "rope") + 0.45));
        return (
          <>
            <SkyThing position={[1.4, 4.8 - reach * 0.6, -2.4]} scale={1.7} />
            <Bell position={PLACE.bell} />
            <BellRope />
            <Hero position={[0.2, 0, 1.5]} animation="reachUp" face="brave" />
          </>
        );
      },
    },
    {
      cue: "6.run",
      ...cam.truck({ on: [-0.6, 1.05, 1.4], dist: 3.8, yaw: 82, pitch: 8, fov: 44, by: [3.4, 0, -1.6] }),
      zone: "village",
      look: DAY,
      note: "Running with him, under a leg, past the baker who will not look up.",
      stage: (t) => {
        const run = ease(ramp(t, 0.1, 1));
        return (
          <>
            <Hero position={[-0.4 + run * 2.2, 0, 1.3 - run * 1.4]} animation="run" face="fear" />
            <Baker position={[1.8, 0, 0.3]} lean={1.15} nod={0.7} />
            <SkyThing position={[0.8, 4.2, -1.8]} scale={1.35} />
          </>
        );
      },
    },
    {
      cue: "6.pull",
      ...cam.push({ on: [0.15, 1.5, -1.15], dist: 2.4, to: 1.6, yaw: 16, pitch: 8, fov: 34 }),
      zone: "village",
      look: DAY,
      note: "His hands are on the rope before the leg gets there, and he pulls.",
      stage: (t) => {
        const pull = ease(ramp(t, wordAt("6.pull", "pulled"), wordAt("6.pull", "pulled") + 0.35));
        return (
          <>
            <Hero position={[0.2, 0, -0.85]} animation="reachUp" face="brave" />
            <BellRope pull={pull} />
            <group position={PLACE.bell} rotation={[0, 0, Math.sin(pull * 12) * 0.08]}>
              <Bell position={[0, 0, 0]} />
            </group>
          </>
        );
      },
    },
    {
      cue: "6.twice",
      ...cam.top({ on: [0.2, 0.4, 0.4], height: 12, to: 7.5, fov: 50 }),
      zone: "village",
      look: DAY,
      note: "From above: on looked, every chin comes off the dirt at once.",
      stage: (t) => {
        const up = ease(ramp(t, wordAt("6.twice", "looked"), wordAt("6.twice", "looked") + 0.35));
        const bow = 1.15 * (1 - up);
        return (
          <>
            <Bell position={PLACE.bell} />
            <Hero position={[0.2, 0, 1.1]} animation="reachUp" />
            <Baker position={[1.8, 0, 0.8]} lean={bow} nod={bow * 0.5} />
            <SkyThing position={[1.5, 8, -3]} scale={1.2} />
          </>
        );
      },
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Baker, Friend, Hero, SkyThing, DAY, ease, ramp, timing } from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "What I saw",
  shots: [
    {
      cue: "2.big",
      ...cam.push({ on: [4, 5.2, -2.5], dist: 18, to: 15, yaw: 0, pitch: 6, fov: 50 }),
      zone: "village",
      look: DAY,
      note: "The thing stands in the open gap, beside the bell, so bigger is a measurement.",
      stage: () => <SkyThing position={[5.2, 3.2, -1.2]} scale={1.3} legs={9} turn={0} />,
    },
    {
      cue: "2.slow",
      ...cam.orbit({ on: [0.6, 3.4, -1.2], dist: 7.2, yaw: -40, yawTo: 30, pitch: 10, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "A slow orbit. He is small under it. It is not chasing him.",
      stage: () => (
        <>
          <SkyThing position={[0.8, 3.8, -1.6]} scale={1.55} turn={0.4} />
          <Hero position={[0.35, 0, 1.15]} animation="idle" face="fear" />
        </>
      ),
    },
    {
      cue: "2.down",
      ...cam.push({ on: [0.35, 0.7, 2.85], dist: 3.2, to: 2.5, yaw: 176, pitch: 16, fov: 38 }),
      zone: "village",
      look: DAY,
      note: "The bell is done. His face goes into the dirt with everybody else's.",
      stage: (t) => {
        const drop = ease(ramp(t, 0.2, 0.7));
        return (
          <>
            <Hero position={[0.35, 0, 1.45]} animation={drop > 0.35 ? "crouch" : "idle"} face="uneasy" />
            <Baker position={[-1.2, 0, 0.7]} lean={1.25} nod={0.85} />
            <Friend position={[1.3, 0, 0.85]} lean={1.2} nod={0.8} />
          </>
        );
      },
    },
    {
      cue: "2.fine",
      ...cam.push({ on: [0.2, 1.35, 1.4], dist: 5.4, to: 4.3, yaw: 22, pitch: 8, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "The baker walks past. He does not turn. The kid is not asked.",
      stage: () => (
        <>
          <Baker position={[-0.9, 0, 0.85]} rotationY={1.4} walk={1.6} />
          <Hero position={[1.15, 0, 1.7]} animation="idle" face="frown" />
        </>
      ),
    },
  ],
});

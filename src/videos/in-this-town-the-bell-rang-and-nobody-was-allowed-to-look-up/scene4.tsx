import { cam, storyScene } from "../../engine";
import { Dad, Fill, Hero, Mum, SkyThing, Well, PLACE, DAY, NIGHT, ease, ramp, timing, wordAt } from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "They will not hear it",
  shots: [
    {
      cue: "4.mum",
      ...cam.push({ on: [10.1, 1.25, -2.9], dist: 3.1, to: 2.2, yaw: 16, pitch: 8, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "She loves him, so she leans her whole weight onto his head and puts it down.",
      stage: (t) => {
        const push = ease(ramp(t, wordAt("4.mum", "pushed"), wordAt("4.mum", "down") + 0.25));
        return (
          <>
            <Mum position={[9.7, 0, -3.5]} lean={0.35 + push * 0.7} nod={push * 0.4} />
            <Hero position={[10.25, 0, -2.35]} animation={push > 0.45 ? "crouch" : "talk"} face="frown" />
          </>
        );
      },
    },
    {
      cue: "4.dad",
      ...cam.push({ on: [8.9, 1.4, -3.3], dist: 2.5, to: 1.8, yaw: -18, pitch: 4, fov: 34 }),
      zone: "village",
      look: DAY,
      note: "Dad, calm, which is worse than angry. The smile is in the voice.",
      stage: () => <Dad position={[8.8, 0, -3.45]} lean={0.04} hmm={0.3} />,
    },
    {
      cue: "4.why",
      ...cam.orbit({ on: [9.5, 1.2, -2.9], dist: 3.1, yaw: 8, yawTo: 64, pitch: 10, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "The question is asked. He does not move, and he does not answer.",
      stage: () => (
        <>
          <Dad position={[8.8, 0, -3.45]} lean={0.02} />
          <Hero position={[10.2, 0, -2.3]} animation="talk" face="uneasy" />
        </>
      ),
    },
    {
      cue: "4.night",
      ...cam.push({ on: [-4.2, 2.4, 6.2], dist: 6.4, to: 4.4, yaw: 22, pitch: 14, fov: 42 }),
      zone: "village",
      look: NIGHT,
      note: "Night. The thing is on the well, and he is the only one awake to hear it.",
      stage: (t) => {
        const hear = ease(ramp(t, wordAt("4.night", "heard"), wordAt("4.night", "heard") + 0.3));
        return (
          <>
            <Fill on={[-2.2, 1.4, 7.2]} yaw={20} power={6} />
            <Well position={PLACE.well} />
            <SkyThing position={[-5, 3.4, 5.1]} scale={0.72} legs={8} />
            <Hero position={[-2.1, 0, 7.3]} animation={hear > 0.4 ? "peek" : "idle"} face="fear" />
          </>
        );
      },
    },
  ],
});

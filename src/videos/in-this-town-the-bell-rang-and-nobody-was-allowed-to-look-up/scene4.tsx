import { cam, storyScene } from "../../engine";
import { Dad, Fill, Hero, Mum, SkyThing, DAY, NIGHT, ease, ramp, timing, wordAt } from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "They will not hear it",
  shots: [
    {
      cue: "4.mum",
      ...cam.push({ on: [9.85, 1.25, -2.95], dist: 3.2, to: 2.3, yaw: 78, pitch: 14, fov: 34 }),
      zone: "village",
      look: DAY,
      note: "Side on, so her hands land on his head and his chin goes down.",
      stage: (t) => {
        const push = ease(ramp(t, wordAt("4.mum", "hand"), wordAt("4.mum", "down") + 0.2));
        return (
          <>
            <Mum position={[9.5, 0, -3.2]} rotationY={0.75} press={push} />
            <Hero position={[10.02, 0, -2.72]} animation={push > 0.35 ? "crouch" : "talk"} face="frown" />
          </>
        );
      },
    },
    {
      cue: "4.dad",
      ...cam.push({ on: [8.8, 1.35, -3.45], dist: 2.3, to: 1.65, yaw: -20, pitch: -18, fov: 32 }),
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
      ...cam.push({ on: [-4.4, 2.6, 6.1], dist: 6.6, to: 4.8, yaw: 26, pitch: 10, fov: 42 }),
      zone: "village",
      look: NIGHT,
      note: "Night. The thing sits on the well, and he is the only one awake to hear it.",
      stage: (t) => {
        const hear = ease(ramp(t, wordAt("4.night", "heard"), wordAt("4.night", "heard") + 0.3));
        return (
          <>
            <Fill on={[-4.6, 3.2, 6.4]} yaw={40} power={8} />
            <SkyThing position={[-5, 4.55, 5.5]} scale={0.72} legs={8} turn={0.5} reach={0.15} />
            <Hero position={[-2.2, 0, 7.4]} animation={hear > 0.4 ? "peek" : "idle"} face="fear" />
          </>
        );
      },
    },
  ],
});

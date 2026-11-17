import { cam, storyScene } from "../../engine";
import { Dad, Fill, Hero, Mum, SkyThing, DAY, NIGHT, ease, ramp, timing, wordAt } from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "They will not hear it",
  shots: [
    {
      cue: "4.mum",
      ...cam.push({ on: [9.8, 1.3, -2.75], dist: 3.5, to: 2.6, yaw: 52, pitch: 16, fov: 34 }),
      zone: "village",
      look: DAY,
      note: "Side-front: her hands come down onto his head, and his chin drops.",
      stage: (t) => {
        const push = ease(ramp(t, 0.15, wordAt("4.mum", "down") + 0.15));
        return (
          <>
            <Mum position={[9.5, 0, -3.05]} rotationY={0.85} press={Math.max(push, 0.45)} />
            <Hero position={[10.0, 0, -2.62]} animation="crouch" face="frown" />
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
      ...cam.push({ on: [-3.6, 2.8, 7.2], dist: 8.4, to: 6.6, yaw: 12, pitch: 8, fov: 42 }),
      zone: "village",
      look: NIGHT,
      note: "Night. The thing sits on the well roof, the eye is in frame, and he is awake.",
      stage: (t) => {
        const hear = ease(ramp(t, wordAt("4.night", "heard"), wordAt("4.night", "heard") + 0.3));
        return (
          <>
            <Fill on={[-4.8, 3.4, 6.6]} yaw={30} power={9} />
            <SkyThing position={[-5, 3.55, 5.5]} scale={0.58} legs={8} turn={0.35} reach={0.1} />
            <Hero position={[-2.3, 0, 7.8]} animation={hear > 0.3 ? "peek" : "idle"} face="fear" />
          </>
        );
      },
    },
  ],
});

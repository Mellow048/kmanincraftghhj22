import { cam, storyScene } from "../../engine";
import { Hero, Line, NORTH, Rod, SOUTH, Villager, ease, ramp, timing } from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Nine thousand",
  shots: [
    {
      cue: "2.fish",
      ...cam.truck({ on: [-0.4, 1.05, 8.8], by: [0.85, 0, -0.6], dist: 5.8, yaw: -16, pitch: 10, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Hero squats tugging bobbing fishing line while neighbor works oar/rod down dawn jetty.",
      stage: (t) => {
        const pull = Math.sin(t * 4);
        return (
          <>
            <Hero position={[0, 0.5, 9.4]} rotationY={NORTH} animation="crouch" blendTo="reach" blend={0.5 + 0.5 * pull} face="neutral" headPitch={0.35} time={t} />
            <Rod position={[0.4, 0.8 + pull * 0.05, 9.3]} rotationY={0.1} bend={0.25 + pull * 0.12} />
            <Line position={[0.5, 0.7, 8.4]} length={1.1} bob={pull * 0.06} />
            <Villager position={[-1.3, 0.5, 8.2 - t * 0.25]} rotationY={NORTH} hmm={0.2 + 0.3 * Math.abs(pull)} walk={t * 0.4} />
            <Rod position={[-1.0, 0.85, 8.1]} bend={0.22 + pull * 0.08} />
          </>
        );
      },
    },
    {
      cue: "2.steps",
      ...cam.crane({ on: [1.2, 2.5, -31.4], onTo: [1.2, 9.5, -31.4], dist: 6.2, toDist: 4.8, yaw: 8, fromPitch: -6, toPitch: 14, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Camera cranes rapidly up wooden cliffside ladder right beside climber straining rung over rung.",
      stage: (t) => {
        const climb = ease(ramp(t, 0, 1.8));
        return (
          <>
            <Hero position={[1.2, 2.1 + climb * 5.2, -31.45]} rotationY={NORTH} animation="reachUp" animDistance={climb * 3.5} face="brave" time={t * 1.8} />
            <Villager position={[1.2, 0.8 + climb * 3.8, -31.45]} rotationY={NORTH} strain={0.5 + 0.3 * Math.sin(t * 7)} walk={t * 2.2} />
          </>
        );
      },
    },
    {
      cue: "2.dad",
      ...cam.push({ on: [1.4, 1.2, -9.5], dist: 4.7, to: 2.95, yaw: 18, pitch: 6, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Dad steps forward gesturing step count with fingers while Hero leans eagerly up beside first stone steps.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Villager position={[1.0, 0, -10.2 + step * 0.3]} rotationY={SOUTH} strain={0.3 + 0.25 * Math.sin(t * 4)} walk={step * 0.5} hat="straw" lookAt={[1.0, 1.4, -9]} />
            <Hero position={[2.1 - step * 0.2, 0, -9.2 - step * 0.25]} rotationY={-0.5} animation={step < 0.6 ? "walk" : "point"} animDistance={step * 0.5} face="uneasy" headPitch={-0.3} lookAt={[1.0, 1.4, -10.2]} time={t} />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.push({ on: [2.1, 1.42, -9.2], dist: 3.9, to: 2.35, yaw: -12, pitch: 2, fov: 36, screenOffset: [0, 0.1] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Punch in as Hero throws both hands outward shrugging squarely at lens with ladder towering behind.",
      stage: (t) => {
        const ask = ease(ramp(t, 0, 1.1));
        return (
          <Hero position={[2.1, 0, -9.2 - ask * 0.15]} rotationY={SOUTH} animation={t < 0.8 ? "shrug" : "talk"} face={t > 1.1 ? "frown" : "uneasy"} headPitch={-0.05} time={t * 1.2} />
        );
      },
    },
  ],
});

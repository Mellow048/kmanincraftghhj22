import { cam, storyScene } from "../../engine";
import { EAST, FishPile, Hero, NORTH, Rod, SOUTH, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Nine thousand",
  shots: [
    {
      cue: "2.fish",
      ...cam.truck({ on: [-0.2, 1.1, 9.2], by: [0.85, 0, -1.2], dist: 5.2, yaw: -22, pitch: 8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Dawn jetty bustle: Hero leans back hauling bent flexing Rod with leaping fish out of shimmering water while neighbors yank rods beside him.",
      stage: (t) => {
        const pull = ease(ramp(t, 0, 1.6));
        const wave = Math.sin(t * 5);
        const hz = 8.9 + pull * 1.15;
        return (
          <>
            <Hero
              position={[-0.2, 0.5, hz]}
              rotationY={EAST - 0.25}
              animation={pull < 0.6 ? "push" : "reach"}
              animDistance={pull * 1.2}
              face="brave"
              headPitch={0.25 - pull * 0.15}
              time={t * 1.3}
            />
            <Rod position={[0.1, 1.0 + wave * 0.06, hz]} rotationY={EAST - 0.25} bend={0.45 + wave * 0.25} />
            <FishPile position={[1.7, 0.25 + pull * 0.85, hz - 0.2]} n={5} seed={2} />
            <Villager position={[-1.1, 0.5, 8.2 - pull * 0.9]} rotationY={WEST} strain={0.4 + 0.3 * Math.abs(wave)} walk={pull * 0.9} />
            <Rod position={[-1.3, 0.98, 8.2 - pull * 0.9]} rotationY={WEST} bend={0.35 + wave * 0.14} />
          </>
        );
      },
    },
    {
      cue: "2.steps",
      ...cam.crane({ on: [1.2, 2.2, -31.4], onTo: [1.2, 9.2, -31.4], dist: 5.8, toDist: 4.1, yaw: 14, fromPitch: -8, toPitch: 16, fov: 44 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Camera cranes rapidly skyward up cliffside wooden ladder beside climbers ascending toward golden Mansion peak.",
      stage: (t) => {
        const climb = ease(ramp(t, 0, 1.8));
        return (
          <>
            <Hero position={[1.2, 1.9 + climb * 5.2, -31.45]} rotationY={NORTH} animation="reachUp" animDistance={climb * 4.0} face="brave" time={t * 1.8} />
            <Villager position={[1.2, 0.6 + climb * 4.0, -31.45]} rotationY={NORTH} strain={0.5 + 0.3 * Math.sin(t * 7)} walk={climb * 4.0} />
          </>
        );
      },
    },
    {
      cue: "2.dad",
      ...cam.truck({ on: [1.2, 1.1, -11.4], by: [0, 0.85, -1.55], dist: 4.4, yaw: 34, pitch: 8, fov: 42, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Tracking climb: Dad strides boldly up stone steps pointing toward endless stairs while Hero scrambles energetically after him.",
      stage: (t) => {
        const climb = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Villager position={[1.2, 0.75 + climb * 0.95, -12.3 - climb * 1.65]} rotationY={SOUTH} strain={0.4 + 0.3 * Math.sin(t * 5)} walk={climb * 1.8} hat="straw" lookAt={[1.2, 1.2 + climb * 0.7, -11.0 - climb * 1.3]} />
            <Hero position={[1.2, 0.25 + climb * 0.75, -11.2 - climb * 1.45]} rotationY={NORTH} animation="walk" animDistance={climb * 1.6} face="uneasy" headPitch={-0.35} lookAt={[1.2, 1.8 + climb * 0.9, -13]} time={t * 1.4} />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.orbit({ on: [1.2, 1.7, -12.8], dist: 4.2, distTo: 2.6, yaw: -28, yawTo: 22, pitch: 4, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Hero scrambles upward shrugging helplessly as Dad keeps marching higher away up stone steps without turning.",
      stage: (t) => {
        const ask = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={[1.2, 0.95 + ask * 0.45, -12.4 - ask * 0.9]} rotationY={SOUTH + 0.25} animation={ask < 0.45 ? "walk" : "shrug"} animDistance={ask * 1.0} face={t > 1.0 ? "frown" : "uneasy"} headPitch={-0.1} time={t * 1.3} />
            <Villager position={[1.2, 1.9 + ask * 0.9, -14.2 - ask * 1.5]} rotationY={NORTH} walk={ask * 1.7} hat="straw" />
          </>
        );
      },
    },
  ],
});

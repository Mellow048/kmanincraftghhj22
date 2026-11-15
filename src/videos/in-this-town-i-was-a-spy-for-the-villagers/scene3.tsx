import { cam, storyScene, stride } from "../../engine";
import { Hero, Pillager, timing } from "./kit";

/** The spy copies the pillager march and joins the line. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Into the marching line",
  shots: [
    {
      cue: "3.hood",
      ...cam.truck({ on: [69, 1.2, 7], dist: 4, yaw: 70, pitch: 4, by: [2.8, 0, 0], fov: 40 }),
      zone: "camp",
      look: "overworld-day",
      note: "A side-tracking medium shot follows the spy lowering the hood while matching the troop's pace.",
      stage: (t, { p }) => (
        <>
          <Hero {...stride([66.5, 0, 7], [69, 0, 7], p)} masked face="uneasy" animation="walk" />
          <Pillager position={[67.5, 0, 5.4]} n={0} walk={t * 1.4} />
          <Pillager position={[70.2, 0, 5.8]} n={1} walk={t * 1.4} />
          <Pillager position={[72.4, 0, 5.2]} n={2} walk={t * 1.4} />
        </>
      ),
    },
    {
      cue: "3.line",
      ...cam.push({ on: [70, 1.25, 5.5], dist: 5.8, to: 4.7, yaw: 0, pitch: 2, fov: 42 }),
      zone: "camp",
      look: "overworld-day",
      note: "The spy copies every step exactly as the line marches toward the drill yard.",
      stage: (t) => (
        <>
          <Hero position={[70, 0, 6]} masked face="neutral" animation="walk" animDistance={t * 1.4} />
          <Pillager position={[68, 0, 5]} n={3} walk={t * 1.4} />
          <Pillager position={[72, 0, 5]} n={0} walk={t * 1.4} />
          <Pillager position={[74, 0, 4.5]} n={1} walk={t * 1.4} />
        </>
      ),
    },
    {
      cue: "3.line",
      cut: 1.0,
      ...cam.push({ on: [70, 0.9, 5.7], dist: 3.0, to: 2.3, yaw: 90, pitch: -4, fov: 36 }),
      zone: "camp",
      look: "overworld-day",
      note: "An odd low angle turns the marching boots into a rhythm and shows the spy's feet finally in step.",
      stage: (t) => (
        <>
          <Hero position={[70, 0, 6 - t * 0.45]} masked animation="walk" animDistance={t * 1.4} />
          <Pillager position={[68, 0, 5.2 - t * 0.45]} n={2} walk={t * 1.4} />
          <Pillager position={[72, 0, 5.0 - t * 0.45]} n={3} walk={t * 1.4} />
        </>
      ),
    },
  ],
});

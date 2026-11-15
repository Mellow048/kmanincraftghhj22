import { cam, storyScene } from "../../engine";
import { Hero, Pillager, TargetTower, timing, wordAt, ramp } from "./kit";

const RESET = wordAt("6.rebuild", "rebuilt");
const RECOGNIZE = wordAt("6.tower", "recognized");

/** They rebuild the target; the spy recognizes the village bell tower. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The target is ours",
  shots: [
    {
      cue: "6.rebuild",
      ...cam.orbit({ on: [70, 1.9, 3.8], dist: 6.2, yaw: -32, yawTo: 30, pitch: 4, fov: 42 }),
      zone: "camp",
      look: "overworld-day",
      note: "The camera swings around the crew as they haul the fallen practice tower upright for another run.",
      stage: (t) => {
        const stand = ramp(t, RESET, RESET + 0.65);
        return (
          <>
            <TargetTower position={[70, 0, 3.6]} fall={1 - stand} scale={0.94} />
            <Pillager position={[68.5, 0, 4.2]} n={1} lean={0.28 - stand * 0.4} armL={-1.25} />
            <Pillager position={[71.6, 0, 4.5]} n={2} lean={0.25 - stand * 0.38} armR={-1.3} />
          </>
        );
      },
    },
    {
      cue: "6.rebuild",
      cut: 1.0,
      ...cam.top({ on: [70, 0.35, 3.7], height: 7.0, to: 4.2, spin: [-4, 8], fov: 44 }),
      zone: "camp",
      look: "overworld-day",
      note: "From directly overhead, the pillagers reset the tower and line the ram up for the same exact hit.",
      stage: (t) => (
        <>
          <TargetTower position={[70, 0, 3.6]} fall={1 - ramp(t, 0, 0.55)} scale={0.94} />
          <Pillager position={[68.4, 0, 5]} n={0} walk={t * 0.5} />
          <Pillager position={[71.5, 0, 5]} n={2} walk={t * 0.5} />
        </>
      ),
    },
    {
      cue: "6.tower",
      ...cam.push({ on: [70.3, 1.7, 6.4], dist: 4.0, to: 2.4, yaw: 19, pitch: 2, fov: 36 }),
      zone: "camp",
      look: "overworld-day",
      note: "The wooden bell is sharp in the foreground while the masked spy recognizes the shape of home behind it.",
      stage: (t) => (
        <>
          <TargetTower position={[70, 0, 3.6]} scale={0.94} />
          <Hero position={[70.4, 0, 7]} masked face="worried" animation="idle" headYaw={-0.28 + Math.sin(t * 2) * 0.04} />
          <Pillager position={[73.5, 0, 4]} n={1} walk={t * 0.2} />
        </>
      ),
    },
  ],
});

void RECOGNIZE;

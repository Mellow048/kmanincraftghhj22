import { cam, storyScene } from "../../engine";
import { Hero, Pillager, PLACE, timing, wordAt } from "./kit";

const BELL = wordAt("1.town", "town");
const HOOK = wordAt("1.hook", "spy");

/** Hook: the village bell, then the masked villager among the pillagers. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The spy in town",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0.4, 1.38, 3.4], dist: 5.4, to: 4.2, yaw: 0, pitch: 5, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "A tall establishing view puts the village bell above the market; the masked spy is already hiding in the square.",
      stage: (t) => (
        <>
          <Hero position={[0.4, 0, 3.7]} masked face="uneasy" animation="idle" gaze={0} />
          <Pillager position={[-2.4, 0, 4.2]} n={0} walk={t * 0.2} />
          <Pillager position={[2.4, 0, 4.4]} n={1} walk={t * 0.22} />
        </>
      ),
    },
    {
      cue: "1.hook",
      ...cam.push({ on: [0.4, 1.28, 3.7], dist: 3.5, to: 2.35, yaw: 8, pitch: 4, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "The teller's masked face fills the frame while pillagers march past on both sides.",
      stage: (t) => (
        <>
          <Hero position={[0.4, 0, 3.7]} masked face="brave" animation="idle" gaze={0} />
          <Pillager position={[-1.25 + t * 0.12, 0, 3.0]} n={2} walk={t * 1.3} />
          <Pillager position={[1.45 - t * 0.1, 0, 4.2]} n={3} walk={t * 1.2} />
        </>
      ),
    },
    {
      cue: "1.hook",
      cut: Math.max(0.35, HOOK + 0.42),
      ...cam.orbit({ on: [0.4, 1.52, 3.7], dist: 2.5, yaw: -28, yawTo: 24, pitch: 2, fov: 35 }),
      zone: "village",
      look: "overworld-day",
      note: "A short orbit lands on the disguise mask: a villager's face hidden behind the pillager's grey scowl.",
      stage: (t) => <Hero position={[0.4, 0, 3.7]} masked face="uneasy" animation="idle" headYaw={Math.sin(t * 4) * 0.1} />,
    },
  ],
});

void BELL;
void PLACE;

import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { MoonOnWater, WATER, WaterFace, WaterTall, ease, pop, ramp, timing, wordAt } from "./kit";

const SAW = wordAt("12.behind", "saw");
const BEHIND = wordAt("12.behind", "behind");

/** THE TURN. One shot. The water shows him one thing too many. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "Behind my reflection",
  shots: [
    {
      cue: "12.behind",
      ...cam.top({ on: [WATER[0], WATER[1], WATER[2] - 0.1], height: 1.55, to: 1.95, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "Down into the water again, his face grinning up. We pull back, and on 'saw' the grin goes, because above his head in the reflection there is a second head, black, much too high, with two pale slits for eyes.",
      stage: (t) => (
        <>
          <MoonOnWater />
          <WaterFace position={[WATER[0], WATER[1], WATER[2] + 0.32]} smile={t < SAW ? 1 : 0} />
          {t >= SAW ? <WaterTall position={[WATER[0], WATER[1] - 0.006, WATER[2] - 0.46]} scale={0.6 + 0.4 * pop(t, SAW, 0.3)} eyes={ease(ramp(t, BEHIND, BEHIND + 0.4))} /> : null}
        </>
      ),
    },
  ],
});

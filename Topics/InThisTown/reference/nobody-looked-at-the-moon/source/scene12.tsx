import { cam, storyScene } from "../../engine";
import { Hero, PLACE, ease, ramp, timing, wordAt } from "./kit";

const ME = PLACE.atWell;
const BEHIND = wordAt("12.dark", "behind");

/** THE WAIT. He is seen, and it is wonderful. Then the thing the stare was holding lets go. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "The wait",
  shots: [
    {
      cue: "12.stay",
      ...cam.push({ on: [0, 1.15, ME[2]], dist: 2.9, to: 2.5, yaw: 5, pitch: 6, fov: 40 }),
      zone: "village",
      note: "'I could have stood in that light all night': him, in the cold white, face up, as happy as he has ever been. The square behind him is empty and every door is shut. Up the lane, the wheat has gone dark.",
      stage: () => <Hero position={ME} animation="idle" face="smile" gaze={0} hat="off" headPitch={-0.5} />,
    },
    {
      cue: "12.dark",
      ...cam.push({ on: [0, 1.75, -16], dist: 19.2, to: 11, yaw: 0, pitch: 2, fov: 44 }),
      zone: "village",
      note: "'If the dark wheat behind me had not begun to move': over his head and up the lane, at the thing he has his back to. The wheat is black now. There are eyes in it. On 'begun' the eyes start to come.",
      stage: (t) => <Hero position={ME} animation="idle" face={t < BEHIND + 0.25 ? "smile" : "uneasy"} gaze={0} hat="off" headPitch={-0.5 * (1 - ease(ramp(t, BEHIND, BEHIND + 0.4)))} headYaw={0.7 * ease(ramp(t, BEHIND + 0.3, BEHIND + 0.9))} />,
    },
    {
      cue: "12.walk",
      ...cam.push({ on: [-5.6, 1.6, -22.6], dist: 3.9, to: 3.2, yaw: 32, pitch: -11, fov: 44 }),
      zone: "fields",
      note: "'The scarecrows were walking': out in the dark wheat, low, in the path of one. It comes straight at the lens on its stuffed legs, arms still out the way it has held them for years.",
      stage: () => null,
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { PLACE, timing } from "./kit";

/**
 * Scene 1 — the hook: what the family is, and the one thing the teller never got.
 *
 * Blocking only for now: the owner approves the script and the voice before shots are built. Every cue below is a
 * line of narration.md, so `npm run check` holds the scene to the script while it is being worked on.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "My family stole things",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: PLACE.square, dist: 6.2, to: 5.4, yaw: 18, pitch: 8, fov: 44 }),
      zone: "village",
      note: "PLACEHOLDER. Three foxes on a roof at night; the small one at the end holds a flower upside down.",
      stage: () => null,
    },
  ],
});

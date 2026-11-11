import { cam, storyScene } from "../../engine";
import { HeroEgg, Hero, WEST, carried, faceOf, timing } from "./kit";

const AT: [number, number, number] = [6.2, 0, 1.2];
const EGG = carried(AT, WEST);

/** THE ITCH. Everything is fine, except one thing. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The itch",
  shots: [
    {
      cue: "4.but",
      ...cam.orbit({ on: faceOf(AT), dist: 1.95, yaw: -114, yawTo: -78, pitch: 3, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "He stops where the last shot left him, and the smile is gone. The camera swings round to ask why.",
      stage: () => <Hero position={AT} rotationY={WEST} animation="idle" face="uneasy" headPitch={0.3} gaze={0} />,
    },
    {
      cue: "4.broken",
      ...cam.push({ on: [EGG[0], EGG[1] + 0.2, EGG[2]], dist: 1.6, to: 1.15, yaw: -90, pitch: 34, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "'My egg was broken': cut to what he is looking down at. First sight of the grey egg and its crack.",
      stage: () => <HeroEgg position={AT} rotationY={WEST} face="uneasy" headPitch={0.3} />,
    },
    {
      cue: "4.crack",
      ...cam.orbit({ on: [EGG[0], EGG[1] + 0.28, EGG[2]], dist: 1.75, yaw: -126, yawTo: -62, pitch: 6, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "'A big crack down the middle': a slow arc across the front of the egg, with his sad face above it.",
      stage: () => <HeroEgg position={AT} rotationY={WEST} face="frown" headPitch={0.3} />,
    },
  ],
});

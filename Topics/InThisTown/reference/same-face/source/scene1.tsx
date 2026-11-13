import { Vox, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CHILD, Hero, ROBE, Villager, timing } from "./kit";

const ME: Vec3 = [0, 0, 2.3];
const LENS: Vec3 = [0, 1.7, 5.8];

/**
 * The wall of one face behind him: [x, y, z, robe, phase, child].
 * Children beside him, grown-ups behind, and a back row up on a bench, so every face has its own place in a tall frame.
 */
const WALL: Array<[number, number, number, string, number, boolean]> = [
  [-0.57, 0, 2.28, ROBE.friend, 1.1, true],
  [0.57, 0, 2.28, ROBE.red, 2.9, true],
  [-0.33, 0, 1.6, ROBE.brown, 0.3, false],
  [0.33, 0, 1.6, ROBE.white, 1.9, false],
  [-0.98, 0, 1.55, ROBE.blue, 3.4, false],
  [0.98, 0, 1.55, ROBE.smith, 1.3, false],
  [-0.64, 0.55, 0.85, ROBE.farmer, 2.7, false],
  [0, 0.55, 0.85, ROBE.elder, 2.2, false],
  [0.64, 0.55, 0.85, ROBE.red, 0.9, false],
];

const Wall = () => (
  <>
    <Vox kind="planks" position={[0, 0.275, 0.85]} size={[2.6, 0.55, 0.6]} />
    {WALL.map(([x, y, z, robe, phase, child], i) => (
      <Villager key={i} position={[x, y, z]} robe={robe} lookAt={LENS} phase={phase} scale={child ? CHILD : undefined} kid={child} />
    ))}
  </>
);

/** HOOK. The whole premise in one picture: nine of one face, and him. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.face",
      ...cam.push({ on: [0, 1.38, 2.0], dist: 4.0, to: 3.3, yaw: 0, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The teller first, low in the frame, and stacked up behind him a wall of villagers who all have the same face. The title, as a picture.",
      stage: () => (
        <>
          <Hero position={ME} animation="idle" face="smile" gaze={0} />
          <Wall />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: [0, 1.2, 2.3], dist: 1.8, to: 1.5, yaw: 7, pitch: 3, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'Except me': cut in to the one face that is different. He shrugs, and the noses stay in the corners of the frame.",
      stage: () => (
        <>
          <Hero position={ME} animation="shrug" face="grin" gaze={0} />
          <Wall />
        </>
      ),
    },
  ],
});

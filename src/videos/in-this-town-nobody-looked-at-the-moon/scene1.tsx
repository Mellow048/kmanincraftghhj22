import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CHILD, Hero, ROBE, Villager, chestOf, faceOf, timing } from "./kit";

const ME: Vec3 = [0, 0, 2.3];
const LENS: Vec3 = [0, 1.7, 5.8];

/**
 * HOOK. The whole premise in one picture, then the teller.
 *
 * NOT BUILT YET. The script is a draft (narration.md); these two shots are the starter's staging with this
 * film's cue ids, so that the film compiles. Nothing is built until the owner approves the script.
 *
 * One scene file per BEAT of the script (Topics/InThisTown/SCRIPT.md); one shot per LINE of narration.md.
 * Copy this file to scene2.tsx, scene3.tsx… and add each to film.tsx. `npm run check` tells you the next
 * line that has no shot.
 *
 * Every shot needs: a `cue` (the id of its line), a camera that MOVES (a `cam.*` recipe), a `zone`,
 * a `note` that says why this picture for these words, and a `stage`.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.wake",
      ...cam.push({ on: [0, 1.38, 2.0], dist: 4.0, to: 3.3, yaw: 0, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "TODO (starter staging). To be: moonrise behind the roofs, the bell rings, and a town of wide straw hats comes out of its doors with every head down.",
      stage: () => (
        <>
          <Hero position={ME} animation="idle" face="smile" gaze={0} />
          {/* A tall frame is a slit: stack people by depth and height, never in a row. */}
          <Villager position={[-0.57, 0, 1.6]} robe={ROBE.brown} lookAt={LENS} phase={0.3} />
          <Villager position={[0.57, 0, 1.6]} robe={ROBE.white} lookAt={LENS} phase={1.9} />
          <Villager position={[0.62, 0, 2.28]} robe={ROBE.friend} lookAt={LENS} phase={1.1} scale={CHILD} kid />
        </>
      ),
    },
    {
      cue: "1.look",
      ...cam.push({ on: faceOf(ME), dist: 1.9, to: 1.5, yaw: 7, pitch: 3, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "TODO (starter staging). To be: the teller under his brim. His eyes go up as far as the straw, and come down again.",
      stage: () => <Hero position={ME} animation="shrug" face="grin" gaze={0} />,
    },
  ],
});

// Distances that work (measured on the finished films, Topics/InThisTown/SHOTS.md §6):
//   a kid's face        on faceOf(p),  dist 1.9 → 1.4, fov 36
//   a kid, waist up     on chestOf(p), dist 2.1 → 1.6, fov 38–40
//   a kid, whole body   on [x, 1.0, z], dist 2.4 → 1.9, fov 40
void chestOf;

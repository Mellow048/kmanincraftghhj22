import { cam, storyScene } from "../../engine";
import { Classmate, Friend, Hero, ME, NORTH, Overhead, SPOT, Teacher, chestOf, faceOf, timing, wordAt } from "./kit";

const SEE = wordAt("1.what", "see");

/**
 * HOOK. The question is the title, said over ONE picture of the power at work. Then the teller.
 *
 * One scene file per BEAT of the script (Topics/WhatIf/SCRIPT.md); one shot per LINE of narration.md.
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
      cue: "1.what",
      ...cam.push({ on: SPOT.at(0, 1.35, -0.4), dist: 6.4, to: 5.6, yaw: 0, pitch: 13, fov: 46 }),
      zone: "class",
      note: "TODO. The power as ONE picture, stacked for a tall frame: the teller's back at the bottom, the class in front of him, the board at the top; and over ONE head the thing only he can see. It pops on the word.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" />
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          {/* The one the sign is over sits straight ahead of him: in a tall frame, things stack by depth, never in a row. */}
          <Classmate who={3} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          {[0, 2].flatMap((col) => [0, 1, 2].map((row) => <Classmate key={`${col}${row}`} who={col * 3 + row + 4} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />))}
          <Friend position={SPOT.seat(2, 2)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
          {/* What only the teller can see. The lens is behind the class, on the +z side: the sign faces it with rotationY 0. A seated kid is 1.34 tall. */}
          <Overhead over={SPOT.seat(1, 0)} tall={1.34} kind="heart" size={0.4} t={t - SEE} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: SPOT.face(1, 2), dist: 2.0, to: 1.6, yaw: 172, pitch: 2, fov: 36 }),
      zone: "class",
      note: "TODO. Cut round to the teller, from the front: the one who can see it. A new face on the cut. Behind him the back wall of the room: the lens is inside it now.",
      stage: () => <Hero position={ME} rotationY={NORTH} animation="sit" face="grin" gaze={0} />,
    },
  ],
});

// Distances that work for a kid (measured on the finished "In This Town" films, Topics/InThisTown/SHOTS.md §6):
//   a kid's face        on faceOf(p),  dist 1.9 → 1.4, fov 36
//   a kid, waist up     on chestOf(p), dist 2.1 → 1.6, fov 38–40
//   a kid, whole body   on [x, 1.0, z], dist 2.4 → 1.9, fov 40
// A SEATED kid's face is 0.1 m lower: SPOT.face(col, row) is where it is.
void chestOf;
void faceOf;

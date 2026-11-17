import { cam, storyScene } from "../../engine";
<<<<<<< HEAD
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
=======
import { A, Classmate, Friend, Hero, NORTH, SPOT, Teacher, Toast, timing, fit } from "./kit";

/**
 * HOOK + THE RULE. Eight shots, eighteen seconds.
 *
 * The question is the title. Then the first lie he ever smelled, and the rule, shown three times fast and
 * then once as a limit: it never works on him.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook and the rule",
  shots: [
    {
      cue: "1.what",
      ...cam.push(fit({ on: [SPOT.teacher[0], 1.1, SPOT.teacher[2] + 0.2], dist: 2.9, to: 2.6, yaw: -12, pitch: 4, fov: 50 })),
      zone: "class",
      note: "The whole class in one tall frame, him at a desk in the front of it, and the first grey wisp of a lie on the right of the board. The power is a smell: the picture has to show a face reading one.",
      stage: (t) => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={0} animation="sit" face="uneasy" />
          <Teacher position={SPOT.teacher} animation="talk" face="calm" />
          {[[0, 0], [0, 1], [2, 0], [2, 1]].map(([c, r], i) => (
            <Classmate key={i} who={i + 2} position={SPOT.seat(c, r)} rotationY={0} animation="sit" face="calm" headPitch={0.2} />
          ))}
          <Friend position={SPOT.seat(2, 2)} rotationY={0} animation="sit" face="calm" />
          <Toast at={[SPOT.teacher[0], 0, SPOT.teacher[2] + 0.2]} n={16} seed={4} />
>>>>>>> 8510bb0b99d0dbaa89384979ebff0f03bdd1b7c2
        </>
      ),
    },
    {
<<<<<<< HEAD
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
=======
      cue: "2.maths",
      ...cam.push(fit({ on: [SPOT.teacher[0], 1.45, SPOT.teacher[2]], dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "class",
      note: "Her, half turned, mid-sentence. He is out of frame: this is the lie arriving, not the boy yet.",
      stage: () => (
        <>
          <Teacher position={SPOT.teacher} animation="talk" face="smile" />
          <Classmate who={3} position={SPOT.seat(0, 0)} rotationY={0} animation="sit" face="calm" headPitch={0.25} />
        </>
      ),
    },
    {
      cue: "2.teach",
      ...cam.push(fit({ on: [SPOT.seat(1, 2)[0], 1.05, SPOT.seat(1, 2)[2]], dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      note: "Him at his desk, chin up, reading her, and not liking what he reads.",
      stage: () => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={0} animation="sit" face="uneasy" />
          <Classmate who={5} position={SPOT.seat(0, 2)} rotationY={0} animation="sit" face="calm" />
        </>
      ),
    },
    {
      cue: "2.smell",
      ...cam.push(fit({ on: [SPOT.seat(1, 2)[0] + 0.1, 1.3, SPOT.seat(1, 2)[2]], dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      note: "The first toast. Smoke off her mouth, filling the frame above him, and his face changing on it.",
      stage: () => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={0} animation="sit" face="wow" />
          <Toast at={[SPOT.teacher[0], 0, SPOT.teacher[2] + 0.4]} n={16} seed={2} />
        </>
      ),
    },
    {
      cue: "3.hair",
      ...cam.push(fit({ on: A("hall", 0.1, 1.25, 0.2), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "hall",
      note: "The friend, sincere, by the lockers. A wisp he can see and the friend cannot.",
      stage: () => (
        <>
          <Friend position={A("hall", 0.5, 0, 0.1)} rotationY={0} animation="idle" face="smile" />
          <Hero position={A("hall", -0.7, 0, 0.6)} rotationY={0.5} animation="idle" face="frown" />
          <Toast at={A("hall", 0.5, 0, 0.1)} n={10} seed={8} />
        </>
      ),
    },
    {
      cue: "3.dad",
      ...cam.push(fit({ on: A("kitchen", 0.5, 0.95, -0.6), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "kitchen",
      note: "The kitchen, an empty chair at the table, and smoke standing over it. Nobody says the line: the smoke is the line.",
      stage: () => (
        <>
          <Hero position={A("kitchen", -0.9, 0, 0.5)} rotationY={Math.PI * 0.85} animation="idle" face="sad" />
          <Toast at={A("kitchen", 0.9, 0, -0.9)} n={18} seed={3} />
        </>
      ),
    },
    {
      cue: "3.rule",
      ...cam.push(fit({ on: A("class", 0, 1.1, 0.2), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "class",
      note: "The rule stated flat, over the whole room: nine desks and smoke over four of them at once.",
      stage: () => (
        <>
          <Teacher position={SPOT.teacher} animation="talk" face="calm" />
          {[[0, 0], [1, 0], [2, 1]].map(([c, r], i) => (
            <Classmate key={i} who={i + 1} position={SPOT.seat(c, r)} rotationY={0} animation="sit" face="calm" />
          ))}
          <Toast at={SPOT.seat(0, 0)} n={8} seed={1} />
          <Toast at={SPOT.seat(1, 0)} n={8} seed={5} />
          <Hero position={SPOT.seat(1, 2)} rotationY={0} animation="sit" face="uneasy" />
        </>
      ),
    },
    {
      cue: "3.limit",
      ...cam.push(fit({ on: A("kitchen", -0.9, 1.0, 0.3), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "kitchen",
      note: "Him, in the tall mirror, saying something out loud. Nothing comes off his mouth. The limit, shown as an absence.",
      stage: () => (
        <>
          <Hero position={A("kitchen", -0.9, 0, 0.3)} rotationY={0} animation="talk" face="calm" />
        </>
      ),
    },
  ],
});
>>>>>>> 8510bb0b99d0dbaa89384979ebff0f03bdd1b7c2

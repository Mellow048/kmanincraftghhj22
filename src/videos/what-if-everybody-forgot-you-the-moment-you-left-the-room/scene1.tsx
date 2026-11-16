import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, Cup, EAST, Friend, HALL, Hero, ME, NORTH, R, SPOT, SOUTH, Teacher, WEST, ease, ramp, timing, wordAt,
} from "./kit";

/**
 * The rule and the jokes
 *
 * Cues 1.if -> 3.roomsa. Five jokes before 0:20, and the one look for the power: a DOOR.
 */

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The rule and the jokes",
  shots: [
    {
      // The question over the one picture that is the whole film: a classroom, and the teller standing in the doorway 
      cue: "1.if",
      ...cam.push({ on: SPOT.at(0, 1.35, 0.4), dist: 7.4, to: 6.6, yaw: 178, pitch: 6, fov: 50 }),
      zone: "class",
      note: "The question over the one picture that is the whole film: a classroom, and the teller standing in the doorway with his back to us. Everybody at the desks is looking at the empty chair he has just got up from.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // Hard on him in the doorway, and he is not sad, he is used to it. Six years of it.
      cue: "1.me",
      ...cam.push({ on: SPOT.at(0, 1.4, 1.5), dist: 2.6, to: 2.1, yaw: 176, pitch: 2, fov: 40 }),
      zone: "class",
      note: "Hard on him in the doorway, and he is not sad, he is used to it. Six years of it.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // A small kid version of him at the same doorway, first day, bag too big.
      cue: "1.day",
      ...cam.push({ on: SPOT.at(0.6, 1.0, 1.6), dist: 3.4, to: 2.8, yaw: 172, pitch: 4, fov: 44 }),
      zone: "class",
      note: "A small kid version of him at the same doorway, first day, bag too big.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      // The same room at lunch: every desk full, nobody looking at the door.
      cue: "1.daya",
      ...cam.push({ on: SPOT.at(0, 1.3, 0.2), dist: 5.6, to: 5.0, yaw: 176, pitch: 8, fov: 50 }),
      zone: "class",
      note: "The same room at lunch: every desk full, nobody looking at the door.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" />
        </>
      ),
    },
    {
      // Wide on the staffroom, teachers drinking tea, nobody asking about a missing kid.
      cue: "1.why",
      ...cam.push({ on: SPOT.at(0, 1.4, 0.6), dist: 4.4, to: 3.8, yaw: 180, pitch: 4, fov: 46 }),
      zone: "class",
      note: "Wide on the staffroom, teachers drinking tea, nobody asking about a missing kid.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" />
        </>
      ),
    },
    {
      // Close on a register on a desk with his name on it, already rubbed out.
      cue: "1.whya",
      ...cam.push({ on: [SPOT.board[0], SPOT.board[1] - 0.4, SPOT.board[2]], dist: 1.8, to: 1.5, yaw: 0, pitch: -6, fov: 34 }),
      zone: "class",
      note: "Close on a register on a desk with his name on it, already rubbed out.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // The rule, said over a door closing: THE look of the power for the whole film is a door.
      cue: "2.rule",
      ...cam.push({ on: SPOT.at(3.3, 1.2, -2.5), dist: 3.6, to: 3.0, yaw: -18, pitch: 2, fov: 42 }),
      zone: "class",
      note: "The rule, said over a door closing: THE look of the power for the whole film is a door.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // The canteen: him with a tray, halfway out, the dinner lady already turning to the next kid.
      cue: "2.food",
      ...cam.push({ on: SPOT.at(0, 1.3, 0.0), dist: 6.2, to: 5.4, yaw: 174, pitch: 6, fov: 50 }),
      zone: "class",
      note: "The canteen: him with a tray, halfway out, the dinner lady already turning to the next kid.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0.4, 0, 0.2)} rotationY={EAST} animation="walk" animDistance={1.2 * ease(ramp(t, 0, 1.2))} face="grin" />
          <Classmate who={4} position={SPOT.at(-1.2, 0, 0.8)} rotationY={SOUTH} animation="idle" face="smile" />
          <Cup position={SPOT.at(0.9, 0.72, 0.1)} />
        </>
      ),
    },
    {
      // Her face, delighted, asking the next kid what he wants. Not a trace of him.
      cue: "2.fooda",
      ...cam.push({ on: SPOT.at(-1.2, 1.35, 0.8), dist: 2.4, to: 2.0, yaw: 158, pitch: 1, fov: 36 }),
      zone: "class",
      note: "Her face, delighted, asking the next kid what he wants. Not a trace of him.",
      stage: (_t) => (
        <>
          <Classmate who={4} position={SPOT.at(-1.2, 0, 0.8)} rotationY={SOUTH + 0.4} animation="idle" face="grin" />
          <Cup position={SPOT.at(-0.9, 0.72, 0.9)} />
        </>
      ),
    },
    {
      // The teacher at the board, finger up, mid-shout, and the teller in the doorway.
      cue: "2.tell",
      ...cam.push({ on: SPOT.at(-0.8, 1.45, -2.6), dist: 3.2, to: 2.7, yaw: 22, pitch: 3, fov: 42 }),
      zone: "class",
      note: "The teacher at the board, finger up, mid-shout, and the teller in the doorway.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(0.4, 0, -2.2)} rotationY={NORTH} animation="idle" face="uneasy" />
          <Teacher position={SPOT.at(-0.8, 0, -2.9)} animation="idle" face="frown" />
        </>
      ),
    },
    {
      // The same teacher, starting the same shout again, angrier, from scratch.
      cue: "2.tella",
      ...cam.push({ on: SPOT.at(-0.8, 1.45, -2.6), dist: 2.5, to: 2.1, yaw: 16, pitch: 1, fov: 36 }),
      zone: "class",
      note: "The same teacher, starting the same shout again, angrier, from scratch.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(0.4, 0, -2.2)} rotationY={NORTH} animation="idle" face="calm" />
          <Teacher position={SPOT.at(-0.8, 0, -2.9)} animation="idle" face="frown" />
        </>
      ),
    },
    {
      // A whole class turned round in their seats, staring at an empty chair in the front row.
      cue: "2.chair",
      ...cam.push({ on: [ME[0], 1.35, ME[2]], dist: 4.6, to: 4.0, yaw: 174, pitch: 5, fov: 46 }),
      zone: "class",
      note: "A whole class turned round in their seats, staring at an empty chair in the front row.",
      stage: () => (
        <>
          {[0, 2].flatMap((col) => [0, 1, 2].map((row) => (
            <Classmate key={`${col}${row}`} who={col * 3 + row + 2} position={SPOT.seat(col, row)} rotationY={SOUTH} animation="sit" face="fear" headPitch={-0.1} />
          )))}
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={SOUTH} animation="sit" face="fear" headPitch={-0.1} />
        </>
      ),
    },
    {
      // The chair, close: a bag on it, and a class behind it not breathing.
      cue: "2.chaira",
      ...cam.push({ on: [ME[0], 1.1, ME[2]], dist: 1.9, to: 1.6, yaw: 178, pitch: 0, fov: 34 }),
      zone: "class",
      note: "The chair, close: a bag on it, and a class behind it not breathing.",
      stage: () => (
        <>
          <Classmate who={3} position={SPOT.seat(0, 1)} rotationY={SOUTH} animation="sit" face="fear" headPitch={-0.1} />
          <Classmate who={5} position={SPOT.seat(2, 1)} rotationY={SOUTH} animation="sit" face="fear" headPitch={-0.1} />
        </>
      ),
    },
    {
      // The kitchen table from above: five place settings, four chairs pulled out.
      cue: "3.five",
      ...cam.top({ on: SPOT.at(0, 0.3, 0.6), height: 4.2, to: 3.2 }),
      zone: "room",
      note: "The kitchen table from above: five place settings, four chairs pulled out.",
      stage: (_t) => (
        <>
          <Hero position={R(-0.9, 0, 0.4)} rotationY={NORTH} animation="sit" face="calm" />
          <Classmate who={7} position={R(0.5, 0, 0.4)} rotationY={NORTH} animation="sit" face="calm" />
          {[-1.2, -0.2, 0.8, 1.8].map((x) => <Cup key={x} position={R(x, 0.8, -0.6)} />)}
          <Cup position={R(2.5, 0.8, -0.6)} />
        </>
      ),
    },
    {
      // His mum's hands, putting the fifth plate down at an empty space.
      cue: "3.fivea",
      ...cam.push({ on: R(0, 1.0, -0.4), dist: 1.9, to: 1.6, yaw: 178, pitch: -10, fov: 36 }),
      zone: "room",
      note: "His mum's hands, putting the fifth plate down at an empty space.",
      stage: (_t) => (
        <>
          <Cup position={R(2.5, 0.8, -0.6)} />
          <Cup position={R(1.8, 0.8, -0.6)} />
        </>
      ),
    },
    {
      // A shop door, and him walking a bike out of it.
      cue: "3.shop",
      ...cam.push({ on: HALL.at(-1.0, 1.3, 1.4), dist: 4.8, to: 4.0, yaw: -44, pitch: 4, fov: 48 }),
      zone: "hall",
      note: "A shop door, and him walking a bike out of it.",
      stage: (t) => (
        <>
          <Hero position={HALL.at(-1.0 + 1.6 * ease(ramp(t, 0, 1.4)), 0, 1.4)} rotationY={WEST} animation="walk" animDistance={1.6} face="grin" />
        </>
      ),
    },
    {
      // The shopkeeper holding the door open for him and wishing him a good day.
      cue: "3.shopa",
      ...cam.push({ on: HALL.at(0.6, 1.35, 1.2), dist: 2.6, to: 2.2, yaw: -62, pitch: 1, fov: 38 }),
      zone: "hall",
      note: "The shopkeeper holding the door open for him and wishing him a good day.",
      stage: (_t) => <Classmate who={6} position={HALL.at(0.4, 0, 0.6)} rotationY={EAST} animation="idle" face="smile" />,
    },
    {
      // The school yard at break: him outside, and kids who do know him.
      cue: "3.rooms",
      ...cam.push({ on: SPOT.at(0, 1.3, 0.4), dist: 6.8, to: 6.0, yaw: 176, pitch: 7, fov: 52 }),
      zone: "class",
      note: "The school yard at break: him outside, and kids who do know him.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // Him in the middle of the yard, and it is the only place he is a person.
      cue: "3.roomsa",
      ...cam.push({ on: SPOT.at(0, 1.35, 0.2), dist: 4.2, to: 3.6, yaw: 168, pitch: 4, fov: 46 }),
      zone: "class",
      note: "Him in the middle of the yard, and it is the only place he is a person.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
  ],
});

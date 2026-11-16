import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, Cup, EAST, Friend, HALL, Hero, ME, NORTH, R, SPOT, SOUTH, Teacher, WEST, ease, ramp, timing, wordAt,
} from "./kit";

/**
 * The price and the bill
 *
 * Cues 4.best -> 10.mum. The film turns from a comedy into a bill.
 */

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The price and the bill",
  shots: [
    {
      // Him on a wall in the sun, pleased with himself, the way you are at thirteen.
      cue: "4.best",
      ...cam.push({ on: SPOT.at(0, 1.3, -1.0), dist: 3.4, to: 2.8, yaw: 12, pitch: 3, fov: 42 }),
      zone: "class",
      note: "Him on a wall in the sun, pleased with himself, the way you are at thirteen.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="grin" />
        </>
      ),
    },
    {
      // The same wall, and he is not doing anything at all.
      cue: "4.nobody",
      ...cam.push({ on: SPOT.at(0, 1.3, -1.0), dist: 4.4, to: 3.7, yaw: 8, pitch: 4, fov: 46 }),
      zone: "class",
      note: "The same wall, and he is not doing anything at all.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // Closer: doing nothing is his whole day.
      cue: "4.nobodya",
      ...cam.push({ on: SPOT.at(0, 1.35, -1.0), dist: 2.4, to: 2.0, yaw: 6, pitch: 1, fov: 36 }),
      zone: "class",
      note: "Closer: doing nothing is his whole day.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // Out on the field under an enormous sky, alone, and the sky is the point.
      cue: "5.sky",
      ...cam.top({ on: SPOT.at(0, 0.3, 0.4), height: 5.0, to: 4.0 }),
      zone: "class",
      note: "Out on the field under an enormous sky, alone, and the sky is the point.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // Him sitting on the kerb at the edge of the yard, looking at the door he has to go back through.
      cue: "5.alone",
      ...cam.push({ on: SPOT.at(2.9, 1.25, 2.6), dist: 3.8, to: 3.2, yaw: 96, pitch: 4, fov: 46 }),
      zone: "class",
      note: "Him sitting on the kerb at the edge of the yard, looking at the door he has to go back through.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // The door, from his eye level, and the light inside it.
      cue: "5.alonea",
      ...cam.push({ on: SPOT.at(3.3, 1.35, -2.5), dist: 3.0, to: 2.5, yaw: -20, pitch: 2, fov: 40 }),
      zone: "class",
      note: "The door, from his eye level, and the light inside it.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // The corridor at lunch: him mid-joke, mouth open, and the two kids walking past him.
      cue: "6.week",
      ...cam.push({ on: HALL.at(-1.0, 1.3, 1.4), dist: 5.2, to: 4.4, yaw: -44, pitch: 5, fov: 50 }),
      zone: "hall",
      note: "The corridor at lunch: him mid-joke, mouth open, and the two kids walking past him.",
      stage: (t) => (
        <>
          <Hero position={HALL.at(-1.0, 0, 1.4)} rotationY={WEST} animation="idle" face="grin" />
          <Classmate who={3} position={HALL.at(0.2 + 1.4 * ease(ramp(t, 0, 1.2)), 0, 0.4)} rotationY={EAST} animation="walk" animDistance={1.4} face="calm" />
        </>
      ),
    },
    {
      // The same corridor: him holding a dropped book out to somebody who does not take it.
      cue: "6.better",
      ...cam.push({ on: HALL.at(0.4, 1.3, 1.3), dist: 3.4, to: 2.8, yaw: -40, pitch: 4, fov: 44 }),
      zone: "hall",
      note: "The same corridor: him holding a dropped book out to somebody who does not take it.",
      stage: (t) => (
        <>
          <Hero position={HALL.at(-0.4, 0, 1.3)} rotationY={WEST} animation="idle" face="calm" />
          <Classmate who={5} position={HALL.at(1.4 + 1.2 * ease(ramp(t, 0, 1.2)), 0, 0.5)} rotationY={EAST} animation="walk" animDistance={1.2} face="calm" />
        </>
      ),
    },
    {
      // His hand, still out, and the book on the floor.
      cue: "6.bettera",
      ...cam.push({ on: HALL.at(0.4, 0.6, 1.0), dist: 1.8, to: 1.5, yaw: -30, pitch: 12, fov: 34 }),
      zone: "hall",
      note: "His hand, still out, and the book on the floor.",
      stage: (_t) => <Hero position={HALL.at(-0.4, 0, 1.3)} rotationY={WEST} animation="idle" face="calm" />,
    },
    {
      // Jo, by the lockers, looking straight at him.
      cue: "7.jo",
      ...cam.push({ on: HALL.at(1.2, 1.35, 1.0), dist: 3.2, to: 2.6, yaw: -56, pitch: 2, fov: 42 }),
      zone: "hall",
      note: "Jo, by the lockers, looking straight at him.",
      stage: (_t) => <Friend position={HALL.at(1.2, 0, 1.0)} rotationY={WEST} animation="idle" face="smile" />,
    },
    {
      // Her, closer, and she has said his name and it has landed.
      cue: "7.joa",
      ...cam.push({ on: HALL.at(1.2, 1.4, 1.0), dist: 2.0, to: 1.7, yaw: -56, pitch: 0, fov: 34 }),
      zone: "hall",
      note: "Her, closer, and she has said his name and it has landed.",
      stage: (_t) => <Friend position={HALL.at(1.2, 0, 1.0)} rotationY={WEST} animation="idle" face="grin" />,
    },
    {
      // Him in a corridor with his name still in the air, stopped dead.
      cue: "7.saw",
      ...cam.push({ on: HALL.at(-0.6, 1.3, 1.2), dist: 3.8, to: 3.1, yaw: -38, pitch: 3, fov: 46 }),
      zone: "hall",
      note: "Him in a corridor with his name still in the air, stopped dead.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // His face, close, at the exact moment somebody knows him.
      cue: "7.sawa",
      ...cam.push({ on: HALL.at(-0.6, 1.4, 1.2), dist: 2.0, to: 1.7, yaw: -30, pitch: 1, fov: 34 }),
      zone: "hall",
      note: "His face, close, at the exact moment somebody knows him.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // The classroom door, half open, and through the gap something on the teacher's desk.
      cue: "8.bill",
      ...cam.push({ on: SPOT.at(3.3, 1.3, -2.5), dist: 3.4, to: 2.8, yaw: -22, pitch: 3, fov: 44 }),
      zone: "class",
      note: "The classroom door, half open, and through the gap something on the teacher's desk.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      // The paper on the desk, his name on it, and a number.
      cue: "8.billa",
      ...cam.push({ on: SPOT.at(3.3, 1.3, -2.5), dist: 2.2, to: 1.8, yaw: -18, pitch: 2, fov: 36 }),
      zone: "class",
      note: "The paper on the desk, his name on it, and a number.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      // Over his shoulder: the paper, close, his name and the number.
      cue: "8.ledger",
      ...cam.push({ on: SPOT.at(-1.2, 1.2, -2.9), dist: 1.7, to: 1.4, yaw: 24, pitch: -8, fov: 34 }),
      zone: "class",
      note: "Over his shoulder: the paper, close, his name and the number.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="fear" />
        </>
      ),
    },
    {
      // The number, filling the frame, and it is a price.
      cue: "8.ledgera",
      ...cam.push({ on: SPOT.at(-1.2, 1.2, -2.9), dist: 1.3, to: 1.05, yaw: 20, pitch: -10, fov: 30 }),
      zone: "class",
      note: "The number, filling the frame, and it is a price.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // A timetable on the wall with rooms circled on it, and it is his timetable.
      cue: "9.arranged",
      ...cam.push({ on: [SPOT.board[0], 1.7, SPOT.board[2]], dist: 3.2, to: 2.6, yaw: 0, pitch: 0, fov: 42 }),
      zone: "class",
      note: "A timetable on the wall with rooms circled on it, and it is his timetable.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // The same timetable, and every circled room is one he has been in.
      cue: "9.arrangeda",
      ...cam.push({ on: [SPOT.board[0], 1.7, SPOT.board[2]], dist: 2.0, to: 1.6, yaw: 0, pitch: 0, fov: 34 }),
      zone: "class",
      note: "The same timetable, and every circled room is one he has been in.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // The teacher at the desk with the paper, counting something into an envelope.
      cue: "9.he",
      ...cam.push({ on: SPOT.at(-1.4, 1.25, -2.4), dist: 2.6, to: 2.1, yaw: 28, pitch: 2, fov: 40 }),
      zone: "class",
      note: "The teacher at the desk with the paper, counting something into an envelope.",
      stage: (_t) => (
        <>
          <Teacher position={SPOT.at(-1.4, 0, -2.9)} animation="idle" face="calm" />
          <Block position={SPOT.at(-1.4, 0.78, -2.4)} size={[0.9, 0.06, 0.6]} color="#e8e2d2" castShadow={false} />
        </>
      ),
    },
    {
      // His face, and he is not angry at all; he is tired, and he is being paid.
      cue: "9.hea",
      ...cam.push({ on: SPOT.at(-1.4, 1.45, -2.4), dist: 1.9, to: 1.6, yaw: 24, pitch: 0, fov: 34 }),
      zone: "class",
      note: "His face, and he is not angry at all; he is tired, and he is being paid.",
      stage: (_t) => <Teacher position={SPOT.at(-1.4, 0, -2.9)} animation="idle" face="calm" />,
    },
    {
      // A row of doors down a corridor, each with a little ticket on it.
      cue: "10.wall",
      ...cam.push({ on: HALL.at(-2.0, 1.3, 1.4), dist: 5.4, to: 6.6, yaw: -46, pitch: 3, fov: 50 }),
      zone: "hall",
      note: "A row of doors down a corridor, each with a little ticket on it.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // The tickets, close: a classroom, a canteen, a lunch, each with a price.
      cue: "10.walla",
      ...cam.push({ on: HALL.at(0, 1.25, 1.2), dist: 2.4, to: 4.2, yaw: -60, pitch: 2, fov: 44 }),
      zone: "hall",
      note: "The tickets, close: a classroom, a canteen, a lunch, each with a price.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // The paper in his hand, and he is walking out of the school gates with it.
      cue: "10.mum",
      ...cam.push({ on: SPOT.at(0.6, 1.2, 1.6), dist: 3.6, to: 3.0, yaw: 168, pitch: 4, fov: 46 }),
      zone: "class",
      note: "The paper in his hand, and he is walking out of the school gates with it.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="brave" />
        </>
      ),
    },
  ],
});

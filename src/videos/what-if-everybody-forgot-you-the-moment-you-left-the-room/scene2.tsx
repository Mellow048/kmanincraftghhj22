import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, Cup, Hero, Player, SPOT, SOUTH, EAST, NORTH, WEST, Teacher, Tray, SubscribeSign, Friend,
  HALL, R, LUNCH, SHOP, YARD, DRIVE, ease, ramp, timing, wordAt,
} from "./kit";

/**
 * "Outside is the only place he is real" — Cues 4.best to 9.hea. He is somebody in the yard, and then he finds the paper.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Outside is the only place he is real",
  shots: [
    {
      // Him on a wall in the sun, pleased with himself, the way you are at thirteen.
      cue: "4.best",
      ...cam.push({ on: [-19.40, 1.35, -1.40], dist: 6.52, to: 5.97, yaw: -43, pitch: -3, fov: 46 }),
      zone: "yard",
      note: "Him on a wall in the sun, pleased with himself, the way you are at thirteen.",
      stage: (_t) => (
        <>
          <Hero position={YARD.at(4.6, 0.95, -1.4)} rotationY={SOUTH} animation="sit" face="grin" />
        </>
      ),
    },
    {
      // The same wall, and he is not doing anything at all.
      cue: "4.nobody",
      ...cam.push({ on: [-19.40, 1.30, -1.40], dist: 7.52, to: 6.97, yaw: -25, pitch: -1, fov: 46 }),
      zone: "yard",
      note: "The same wall, and he is not doing anything at all.",
      stage: (_t) => (
        <>
          <Hero position={YARD.at(4.6, 0.95, -1.4)} rotationY={SOUTH} animation="sit" face="calm" />
        </>
      ),
    },
    {
      // Closer: doing nothing is his whole day.
      cue: "4.nobodya",
      ...cam.push({ on: [-19.40, 1.30, -1.40], dist: 3.72, to: 3.17, yaw: -24, pitch: -2, fov: 38 }),
      zone: "yard",
      note: "Closer: doing nothing is his whole day.",
      stage: (_t) => (
        <>
          <Hero position={YARD.at(4.6, 0.95, -1.4)} rotationY={SOUTH + 0.3} animation="sit" face="uneasy" />
        </>
      ),
    },
    {
      // Out on the field under an enormous sky, alone, and the sky is the point.
      cue: "5.sky",
      ...cam.push({ on: [-19.00, 2.10, -2.60], dist: 9.47, to: 8.92, yaw: -17, pitch: -6, fov: 56 }),
      zone: "yard",
      note: "Out on the field under an enormous sky, alone, and the sky is the point.",
      stage: (_t) => (
        <>
          <Hero position={YARD.at(5.0, 0, -2.6)} rotationY={SOUTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // Him sitting on the kerb at the edge of the yard, looking at the door he has to go back through.
      cue: "5.alone",
      ...cam.push({ on: [-19.00, 1.10, -1.40], dist: 7.00, to: 6.45, yaw: -31, pitch: 1, fov: 48 }),
      zone: "yard",
      note: "Him sitting on the kerb at the edge of the yard, looking at the door he has to go back through.",
      stage: (_t) => (
        <>
          <Hero position={YARD.at(5.0, 0.95, -1.4)} rotationY={SOUTH} animation="sit" face="uneasy" />
        </>
      ),
    },
    {
      // The door, from his eye level, and the light inside it.
      cue: "5.alonea",
      ...cam.push({ on: [23.80, 1.10, 57.50], dist: 2.81, to: 2.26, yaw: 35, pitch: 4, fov: 44 }),
      zone: "drive",
      note: "The door, from his eye level, and the light inside it.",
      stage: (_t) => (
        <>
          <Hero position={DRIVE.at(1.2, 0, 2.0)} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // The corridor at lunch: him mid-joke, mouth open, and the two kids walking past him.
      cue: "6.week",
      ...cam.push({ on: [0.60, 1.25, 40.20], dist: 4.69, to: 4.14, yaw: -79, pitch: 1, fov: 52 }),
      zone: "hall",
      note: "The corridor at lunch: him mid-joke, mouth open, and the two kids walking past him.",
      stage: (_t) => (
        <>
          <Hero position={HALL.at(0.4, 0, 0.4)} rotationY={WEST} animation="idle" face="laugh" />
          <Classmate who={2} position={HALL.at(1.6, 0, 0.2)} rotationY={WEST} animation="walk" animDistance={2.4} face="calm" />
          <Classmate who={6} position={HALL.at(2.0, 0, 0.9)} rotationY={WEST} animation="walk" animDistance={2.6} face="calm" />
        </>
      ),
    },
    {
      // The same corridor: him holding a dropped book out to somebody who does not take it.
      cue: "6.better",
      ...cam.push({ on: [1.60, 1.05, 40.40], dist: 4.07, to: 3.52, yaw: -80, pitch: 4, fov: 46 }),
      zone: "hall",
      note: "The same corridor: him holding a dropped book out to somebody who does not take it.",
      stage: (_t) => (
        <>
          <Hero position={HALL.at(1.4, 0, 0.5)} rotationY={WEST} animation="idle" face="brave" />
          <Block position={HALL.at(2.0, 0.62, 0.5)} size={[0.3, 0.06, 0.22]} color="#c8402f" castShadow={false} />
          <Classmate who={8} position={HALL.at(3.4, 0, 0.6)} rotationY={WEST} animation="walk" animDistance={2.0} face="calm" />
        </>
      ),
    },
    {
      // His hand, still out, and the book on the floor.
      cue: "6.bettera",
      ...cam.push({ on: [1.90, 0.62, 40.50], dist: 3.60, to: 3.05, yaw: -77, pitch: 4, fov: 34 }),
      zone: "hall",
      note: "His hand, still out, and the book on the floor.",
      stage: (_t) => (
        <>
          <Block position={HALL.at(2.0, 0.62, 0.5)} size={[0.3, 0.06, 0.22]} color="#c8402f" castShadow={false} />
        </>
      ),
    },
    {
      // Jo, by the lockers, looking straight at him.
      cue: "7.jo",
      ...cam.push({ on: [1.60, 1.20, 40.20], dist: 3.30, to: 2.75, yaw: -76, pitch: 2, fov: 44 }),
      zone: "hall",
      note: "Jo, by the lockers, looking straight at him.",
      stage: (_t) => (
        <>
          <Friend position={HALL.at(1.6, 0, 0.2)} rotationY={EAST} animation="idle" face="smile" />
        </>
      ),
    },
    {
      // Her, closer, and she has said his name and it has landed.
      cue: "7.joa",
      ...cam.push({ on: [1.60, 1.30, 40.10], dist: 1.61, to: 1.06, yaw: -60, pitch: -1, fov: 36 }),
      zone: "hall",
      note: "Her, closer, and she has said his name and it has landed.",
      stage: (_t) => (
        <>
          <Friend position={HALL.at(1.5, 0, 0.0)} rotationY={EAST} animation="idle" face="grin" />
        </>
      ),
    },
    {
      // Him in a corridor with his name still in the air, stopped dead.
      cue: "7.saw",
      ...cam.push({ on: [1.00, 1.15, 40.40], dist: 5.65, to: 5.10, yaw: -83, pitch: 2, fov: 48 }),
      zone: "hall",
      note: "Him in a corridor with his name still in the air, stopped dead.",
      stage: (_t) => (
        <>
          <Hero position={HALL.at(0.6, 0, 0.5)} rotationY={WEST} animation="idle" face="wow" />
          <Friend position={HALL.at(2.0, 0, 0.2)} rotationY={EAST} animation="idle" face="smile" />
        </>
      ),
    },
    {
      // His face, close, at the exact moment somebody knows him.
      cue: "7.sawa",
      ...cam.push({ on: [0.60, 1.32, 40.50], dist: 2.15, to: 1.60, yaw: -68, pitch: -1, fov: 36 }),
      zone: "hall",
      note: "His face, close, at the exact moment somebody knows him.",
      stage: (_t) => (
        <>
          <Hero position={HALL.at(0.6, 0, 0.5)} rotationY={WEST} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // The classroom door, half open, and through the gap something on the teacher's desk.
      cue: "8.bill",
      ...cam.push({ on: [3.20, 1.10, -2.60], dist: 4.45, to: 3.90, yaw: -36, pitch: 3, fov: 46 }),
      zone: "class",
      note: "The classroom door, half open, and through the gap something on the teacher's desk.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(2.6, 0, -2.4)} rotationY={EAST} animation="idle" face="uneasy" />
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
          <Block position={SPOT.at(-0.2, 0.78, -2.9)} size={[0.9, 0.06, 0.6]} color="#e8e2d2" castShadow={false} />
        </>
      ),
    },
    {
      // The paper on the desk, his name on it, and a number.
      cue: "8.billa",
      ...cam.push({ on: [-0.20, 0.80, -2.90], dist: 2.67, to: 2.12, yaw: 37, pitch: 9, fov: 40 }),
      zone: "class",
      note: "The paper on the desk, his name on it, and a number.",
      stage: (_t) => (
        <>
          <Block position={SPOT.at(-0.2, 0.78, -2.9)} size={[0.9, 0.06, 0.6]} color="#e8e2d2" castShadow={false} />
          <Block position={SPOT.at(-0.2, 0.82, -2.85)} size={[0.5, 0.02, 0.32]} color="#c8c2b0" castShadow={false} />
          <Block position={SPOT.at(-0.1, 0.86, -2.88)} size={[0.12, 0.12, 0.02]} color="#3a3344" castShadow={false} />
        </>
      ),
    },
    {
      // Over his shoulder: the paper, close, his name and the number.
      cue: "8.ledger",
      ...cam.push({ on: [-0.20, 0.78, -2.90], dist: 2.34, to: 1.79, yaw: 49, pitch: 14, fov: 38 }),
      zone: "class",
      note: "Over his shoulder: the paper, close, his name and the number.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(1.4, 0, -1.9)} rotationY={EAST} animation="idle" face="fear" />
          <Block position={SPOT.at(-0.2, 0.78, -2.9)} size={[0.9, 0.06, 0.6]} color="#e8e2d2" castShadow={false} />
          <Block position={SPOT.at(-0.2, 0.82, -2.85)} size={[0.5, 0.02, 0.32]} color="#c8c2b0" castShadow={false} />
          <Block position={SPOT.at(-0.1, 0.86, -2.88)} size={[0.12, 0.12, 0.02]} color="#3a3344" castShadow={false} />
        </>
      ),
    },
    {
      // The number, filling the frame, and it is a price.
      cue: "8.ledgera",
      ...cam.push({ on: [-0.20, 0.78, -2.90], dist: 1.40, to: 0.85, yaw: 42, pitch: 17, fov: 32 }),
      zone: "class",
      note: "The number, filling the frame, and it is a price.",
      stage: (_t) => (
        <>
          <Block position={SPOT.at(-0.2, 0.78, -2.9)} size={[0.9, 0.06, 0.6]} color="#e8e2d2" castShadow={false} />
          <Block position={SPOT.at(-0.2, 0.82, -2.85)} size={[0.5, 0.02, 0.32]} color="#c8c2b0" castShadow={false} />
          <Block position={SPOT.at(-0.1, 0.86, -2.88)} size={[0.12, 0.12, 0.02]} color="#3a3344" castShadow={false} />
        </>
      ),
    },
    {
      // A timetable on the wall with rooms circled on it, and it is his timetable.
      cue: "9.arranged",
      ...cam.push({ on: [-1.00, 1.50, -3.50], dist: 2.44, to: 1.89, yaw: 19, pitch: 1, fov: 46 }),
      zone: "class",
      note: "A timetable on the wall with rooms circled on it, and it is his timetable.",
      stage: (_t) => (
        <>
          <Block position={SPOT.at(-1.0, 1.5, -3.84)} size={[1.6, 1.1, 0.04]} color="#f4f1e8" castShadow={false} />
          {[0, 1, 2, 3].flatMap((i) => [0, 1, 2].map((j) => (
            <Block key={`${i}${j}`} position={SPOT.at(-1.65 + j * 0.42, 1.75 - i * 0.26, -3.8)} size={[0.3, 0.16, 0.02]} color={(i + j) % 3 === 0 ? "#e3261c" : "#b8c4d0"} castShadow={false} />
          )))}
        </>
      ),
    },
    {
      // The same timetable, and every circled room is one he has been in.
      cue: "9.arrangeda",
      ...cam.push({ on: [-1.00, 1.45, -3.50], dist: 1.97, to: 1.42, yaw: 24, pitch: 0, fov: 36 }),
      zone: "class",
      note: "The same timetable, and every circled room is one he has been in.",
      stage: (_t) => (
        <>
          <Block position={SPOT.at(-1.0, 1.5, -3.84)} size={[1.6, 1.1, 0.04]} color="#f4f1e8" castShadow={false} />
          {[0, 1].flatMap((i) => [0, 1, 2].map((j) => (
            <Block key={`${i}${j}`} position={SPOT.at(-1.4 + j * 0.42, 1.72 - i * 0.26, -3.8)} size={[0.3, 0.16, 0.02]} color="#e3261c" castShadow={false} />
          )))}
        </>
      ),
    },
    {
      // The teacher at the desk with the paper, counting something into an envelope.
      cue: "9.he",
      ...cam.push({ on: [-0.70, 1.15, -2.90], dist: 2.55, to: 2.00, yaw: 26, pitch: 3, fov: 42 }),
      zone: "class",
      note: "The teacher at the desk with the paper, counting something into an envelope.",
      stage: (_t) => (
        <>
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
          <Block position={SPOT.at(-0.6, 0.78, -2.9)} size={[0.9, 0.06, 0.6]} color="#e8e2d2" castShadow={false} />
          <Block position={SPOT.at(-0.6, 0.86, -2.85)} size={[0.3, 0.14, 0.22]} color="#d8cfae" castShadow={false} />
        </>
      ),
    },
    {
      // His face, and he is not angry at all; he is tired, and he is being paid.
      cue: "9.hea",
      ...cam.push({ on: [-0.60, 1.30, -2.90], dist: 2.02, to: 1.47, yaw: 20, pitch: -1, fov: 34 }),
      zone: "class",
      note: "His face, and he is not angry at all; he is tired, and he is being paid.",
      stage: (_t) => (
        <>
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // A row of doors down a corridor, each with a little ticket on it.
      cue: "10.wall",
      ...cam.push({ on: [2.40, 1.20, 38.20], dist: 5.27, to: 4.72, yaw: -57, pitch: 1, fov: 52 }),
      zone: "hall",
      note: "A row of doors down a corridor, each with a little ticket on it.",
      stage: (_t) => (
        <>
          <Hero position={HALL.at(1.2, 0, 0.6)} rotationY={WEST} animation="walk" animDistance={1.2} face="calm" />
          {[0, 1, 2, 3, 4].map((i) => (
            <Block key={i} position={HALL.at(-4.0 + i * 1.6, 1.35, -1.93)} size={[1.0, 1.9, 0.03]} color={["#8a6a44", "#3f6fb8", "#3f8a4f", "#8a6a44", "#c8402f"][i]} castShadow={false} />
          ))}
        </>
      ),
    },
    {
      // The tickets, close: a classroom, a canteen, a lunch, each with a price.
      cue: "10.walla",
      ...cam.push({ on: [-1.20, 1.45, 38.10], dist: 3.77, to: 3.22, yaw: 29, pitch: -4, fov: 44 }),
      zone: "hall",
      note: "The tickets, close: a classroom, a canteen, a lunch, each with a price.",
      stage: (_t) => (
        <>
          {[0, 1, 2].map((i) => (
            <Block key={i} position={HALL.at(-1.2 + i * 1.2, 1.5, -1.9)} size={[0.3, 0.2, 0.02]} color="#f4f1e8" castShadow={false} />
          ))}
        </>
      ),
    },
  ],
});

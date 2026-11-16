import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, Cup, Hero, Player, SPOT, SOUTH, EAST, NORTH, WEST, Teacher, Tray, SubscribeSign, Friend,
  HALL, R, LUNCH, SHOP, YARD, DRIVE, ease, ramp, timing, wordAt,
} from "./kit";

/**
 * "The rule and the jokes" — Cues 1.if to 3.roomsa. Five jokes by 0:20 and the rule over a door.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The rule and the jokes",
  shots: [
    {
      // The question over the one picture that is the whole film: a classroom, and the teller standing in the doorway with his b
      cue: "1.if",
      ...cam.push({ on: [0.40, 1.30, 2.60], dist: 5.66, to: 6.46, yaw: 148, pitch: -1, fov: 48 }),
      zone: "class",
      note: "The question over the one picture that is the whole film: a classroom, and the teller standing in the doorway with his back to us. Everybody at the desks is looking at the empty chair he has just got up from.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(2.9, 0, -2.2)} rotationY={EAST} animation="idle" face="calm" />
          {[0, 1, 2].flatMap((row) => (
            <Classmate key={row} who={row + 2} position={SPOT.seat(0, row)} rotationY={SOUTH} animation="sit" />
          ))}
        </>
      ),
    },
    {
      // Hard on him in the doorway, and he is not sad, he is used to it. Six years of it.
      cue: "1.me",
      ...cam.push({ on: [2.50, 1.30, 0.40], dist: 2.88, to: 2.48, yaw: 160, pitch: -1, fov: 40 }),
      zone: "class",
      note: "Hard on him in the doorway, and he is not sad, he is used to it. Six years of it.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(3.15, 0, -2.2)} rotationY={EAST} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // A small kid version of him at the same doorway, first day, bag too big.
      cue: "1.day",
      ...cam.push({ on: [1.90, 1.05, 0.90], dist: 3.58, to: 3.18, yaw: 153, pitch: -2, fov: 44 }),
      zone: "class",
      note: "A small kid version of him at the same doorway, first day, bag too big.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(3.15, 0, -2.2)} scale={0.72} rotationY={EAST} animation="idle" face="uneasy" />
          <Block position={SPOT.at(3.15, -0.9, -2.0)} size={[0.5, 0.5, 0.24]} color="#3f6fb8" />
        </>
      ),
    },
    {
      // The same room at lunch: every desk full, nobody looking at the door.
      cue: "1.daya",
      ...cam.push({ on: [0.00, 1.45, 3.20], dist: 4.22, to: 5.12, yaw: 177, pitch: -5, fov: 50 }),
      zone: "class",
      note: "The same room at lunch: every desk full, nobody looking at the door.",
      stage: (_t) => (
        <>
          {[0, 1, 2].flatMap((col) => [0, 1].map((row) => (
            <Classmate key={`${col}${row}`} who={col * 2 + row + 2} position={SPOT.seat(col, row)} rotationY={SOUTH} animation="sit" face="calm" />
          )))}
          <Cup position={SPOT.desk(1, 1)} />
        </>
      ),
    },
    {
      // Wide on the staffroom, teachers drinking tea, nobody asking about a missing kid.
      cue: "1.why",
      ...cam.push({ on: [0.40, 1.30, 2.90], dist: 5.89, to: 6.49, yaw: -170, pitch: -1, fov: 46 }),
      zone: "class",
      note: "Wide on the staffroom, teachers drinking tea, nobody asking about a missing kid.",
      stage: (_t) => (
        <>
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
          <Classmate who={4} position={SPOT.at(-2.4, 0, -1.2)} rotationY={NORTH} animation="idle" face="calm" />
          <Cup position={SPOT.desk(-0.6, 0)} />
        </>
      ),
    },
    {
      // Close on a register on a desk with his name on it, already rubbed out.
      cue: "1.whya",
      ...cam.push({ on: [-0.40, 1.15, -1.40], dist: 1.52, to: 1.22, yaw: 172, pitch: -4, fov: 34 }),
      zone: "class",
      note: "Close on a register on a desk with his name on it, already rubbed out.",
      stage: (_t) => (
        <>
          <Block position={SPOT.at(-0.2, 0.78, -2.9)} size={[0.9, 0.06, 0.6]} color="#e8e2d2" castShadow={false} />
          <Block position={SPOT.at(-0.2, 0.82, -2.85)} size={[0.44, 0.02, 0.3]} color="#c8c2b0" castShadow={false} />
        </>
      ),
    },
    {
      // The rule, said over a door closing: THE look of the power for the whole film is a door.
      cue: "2.rule",
      ...cam.push({ on: [1.60, 1.20, -0.60], dist: 2.76, to: 2.56, yaw: 136, pitch: -2, fov: 42 }),
      zone: "class",
      note: "The rule, said over a door closing: THE look of the power for the whole film is a door.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(2.2, 0, -2.0)} rotationY={EAST} animation="walk" animDistance={1.5} face="calm" />
        </>
      ),
    },
    {
      // The canteen: him with a tray, halfway out, the dinner lady already turning to the next kid.
      cue: "2.food",
      ...cam.push({ on: [14.80, 1.35, 1.60], dist: 5.32, to: 6.22, yaw: 160, pitch: -3, fov: 48 }),
      zone: "lunch",
      note: "The canteen: him with a tray, halfway out, the dinner lady already turning to the next kid.",
      stage: (_t) => (
        <>
          <Hero position={LUNCH.line(1)} rotationY={WEST} animation="walk" animDistance={1.2} face="grin" />
          <Classmate who={4} position={LUNCH.cook} rotationY={SOUTH} animation="idle" face="smile" />
          <Tray position={LUNCH.line(1)} />
        </>
      ),
    },
    {
      // Her face, delighted, asking the next kid what he wants. Not a trace of him.
      cue: "2.fooda",
      ...cam.push({ on: [14.40, 1.35, -1.60], dist: 3.65, to: 3.15, yaw: -171, pitch: -1, fov: 38 }),
      zone: "lunch",
      note: "Her face, delighted, asking the next kid what he wants. Not a trace of him.",
      stage: (_t) => (
        <>
          <Classmate who={4} position={LUNCH.cook} rotationY={SOUTH} animation="idle" face="grin" />
          <Classmate who={5} position={LUNCH.line(0)} rotationY={WEST} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // The teacher at the board, finger up, mid-shout, and the teller in the doorway.
      cue: "2.tell",
      ...cam.push({ on: [1.90, 1.30, 1.00], dist: 4.63, to: 5.33, yaw: -147, pitch: -1, fov: 44 }),
      zone: "class",
      note: "The teacher at the board, finger up, mid-shout, and the teller in the doorway.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(2.2, 0, -2.0)} rotationY={EAST} animation="idle" face="uneasy" />
          <Teacher position={SPOT.teacher} animation="idle" face="frown" />
        </>
      ),
    },
    {
      // The same teacher, starting the same shout again, angrier, from scratch.
      cue: "2.tella",
      ...cam.push({ on: [0.90, 1.20, -0.80], dist: 2.58, to: 2.18, yaw: -144, pitch: 1, fov: 36 }),
      zone: "class",
      note: "The same teacher, starting the same shout again, angrier, from scratch.",
      stage: (_t) => (
        <>
          <Teacher position={SPOT.teacher} animation="idle" face="fear" />
        </>
      ),
    },
    {
      // A whole class turned round in their seats, staring at an empty chair in the front row.
      cue: "2.chair",
      ...cam.push({ on: [1.60, 1.45, 3.30], dist: 3.22, to: 4.12, yaw: -148, pitch: -8, fov: 46 }),
      zone: "class",
      note: "A whole class turned round in their seats, staring at an empty chair in the front row.",
      stage: (_t) => (
        <>
          {[0, 1, 2].flatMap((col) => [0, 1, 2].map((row) => (
            <Classmate key={`${col}${row}`} who={col * 3 + row + 2} position={SPOT.seat(col, row)} rotationY={SOUTH} animation="sit" face="fear" headPitch={-0.1} />
          )))}
          <Block position={SPOT.at(0, 0.42, 1.0)} size={[0.44, 0.04, 0.42]} color="#8a6a44" castShadow={false} />
          <Block position={SPOT.at(0, 0.72, 1.2)} size={[0.44, 0.3, 0.05]} color="#8a6a44" castShadow={false} />
          <Block position={SPOT.at(0, 0.86, 1.58)} size={[0.42, 0.44, 0.12]} color="#3f6fb8" />
        </>
      ),
    },
    {
      // The chair, close: a bag on it, and a class behind it not breathing.
      cue: "2.chaira",
      ...cam.push({ on: [1.70, 1.05, 2.50], dist: 2.81, to: 2.51, yaw: -125, pitch: -5, fov: 34 }),
      zone: "class",
      note: "The chair, close: a bag on it, and a class behind it not breathing.",
      stage: (_t) => (
        <>
          <Block position={SPOT.at(0, 0.42, 1.0)} size={[0.44, 0.04, 0.42]} color="#8a6a44" castShadow={false} />
          <Block position={SPOT.at(0, 0.86, 1.58)} size={[0.42, 0.44, 0.12]} color="#3f6fb8" />
        </>
      ),
    },
    {
      // The kitchen table from above: five place settings, four chairs pulled out.
      cue: "3.five",
      ...cam.push({ on: [0.20, 2.45, 82.40], dist: 3.23, to: 3.93, yaw: -176, pitch: -36, fov: 46 }),
      zone: "room",
      note: "The kitchen table from above: five place settings, four chairs pulled out.",
      stage: (_t) => (
        <>
          <Block position={R(0, 0.72, -0.2)} size={[2.4, 0.08, 1.3]} color="#b08a5a" />
          {[[-0.8, -0.6], [-0.2, -0.6], [0.4, -0.6], [1.0, -0.6], [0.1, 0.5]].map(([x, z], i) => (
            <Block key={i} position={R(x, 0.78, z)} size={[0.34, 0.02, 0.26]} color="#f4f1e8" castShadow={false} />
          ))}
          {[-0.8, -0.2, 0.4, 1.0].map((x) => (
            <Block key={`c${x}`} position={R(x, 0.42, 0.5)} size={[0.36, 0.04, 0.34]} color="#8a6a44" castShadow={false} />
          ))}
        </>
      ),
    },
    {
      // His mum's hands, putting the fifth plate down at an empty space.
      cue: "3.fivea",
      ...cam.push({ on: [0.50, 1.15, 81.20], dist: 2.17, to: 1.77, yaw: -169, pitch: -10, fov: 36 }),
      zone: "room",
      note: "His mum's hands, putting the fifth plate down at an empty space.",
      stage: (_t) => (
        <>
          <Block position={R(0, 0.72, -0.2)} size={[2.4, 0.08, 1.3]} color="#b08a5a" />
          <Block position={R(0.1, 0.78, 0.5)} size={[0.34, 0.02, 0.26]} color="#f4f1e8" castShadow={false} />
          <Player who={9} position={R(-0.9, 0, 0.5)} rotationY={NORTH} animation="idle" />
        </>
      ),
    },
    {
      // A shop door, and him walking a bike out of it.
      cue: "3.shop",
      ...cam.push({ on: [-1.00, 1.35, 122.60], dist: 4.96, to: 5.96, yaw: 148, pitch: -5, fov: 48 }),
      zone: "shop",
      note: "A shop door, and him walking a bike out of it.",
      stage: (_t) => (
        <>
          <Hero position={SHOP.at(0, 0, 2.2)} rotationY={SOUTH} animation="walk" animDistance={1.8} face="grin" />
          <Block position={SHOP.at(-0.55, 0, 2.0)} size={[0.1, 0.7, 0.9]} color="#2b2b33" />
        </>
      ),
    },
    {
      // The shopkeeper holding the door open for him and wishing him a good day.
      cue: "3.shopa",
      ...cam.push({ on: [0.40, 1.20, 122.00], dist: 3.94, to: 3.54, yaw: -165, pitch: -4, fov: 38 }),
      zone: "shop",
      note: "The shopkeeper holding the door open for him and wishing him a good day.",
      stage: (_t) => (
        <>
          <Player who={7} position={SHOP.at(-0.7, 0, 3.9)} rotationY={NORTH} animation="idle" />
        </>
      ),
    },
    {
      // The school yard at break: him outside, and kids who do know him.
      cue: "3.rooms",
      ...cam.push({ on: [-24.00, 1.35, 4.60], dist: 9.21, to: 10.41, yaw: 146, pitch: -2, fov: 52 }),
      zone: "yard",
      note: "The school yard at break: him outside, and kids who do know him.",
      stage: (_t) => (
        <>
          <Hero position={YARD.at(-2.4, 0, 1.0)} rotationY={SOUTH} animation="idle" face="calm" />
          {[0, 1, 2].map((i) => (
            <Classmate key={i} who={i + 3} position={YARD.at(3.2 + i * 1.4, 0, -0.4)} rotationY={WEST} animation="idle" face="smile" />
          ))}
        </>
      ),
    },
    {
      // Him in the middle of the yard, and it is the only place he is a person.
      cue: "3.roomsa",
      ...cam.push({ on: [-25.80, 1.30, 3.40], dist: 6.08, to: 6.88, yaw: 134, pitch: -1, fov: 46 }),
      zone: "yard",
      note: "Him in the middle of the yard, and it is the only place he is a person.",
      stage: (_t) => (
        <>
          <Hero position={YARD.at(-0.4, 0, 0.6)} rotationY={SOUTH} animation="idle" face="calm" />
        </>
      ),
    },
  ],
});

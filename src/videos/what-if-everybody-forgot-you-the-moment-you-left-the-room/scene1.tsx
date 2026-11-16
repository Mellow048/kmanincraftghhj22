import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, Cup, Hero, Player, SPOT, SOUTH, EAST, NORTH, WEST, Teacher, Tray, SubscribeSign, Friend,
  HALL, R, HOME, LUNCH, SHOP, YARD, DRIVE, ease, ramp, timing, wordAt,
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
      ...cam.push({ on: [2.20, 1.05, -2.30], dist: 6.79, to: 6.24, yaw: -37, pitch: 3, fov: 50 }),
      zone: "class",
      note: "The question over the one picture that is the whole film: a classroom, and the teller standing in the doorway with his back to us. Everybody at the desks is looking at the empty chair he has just got up from.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.door} rotationY={EAST} animation="idle" face="calm" />
          {[0, 1].flatMap((row) => (
            <Classmate key={row} who={row + 2} position={SPOT.seat(1, row)} rotationY={SOUTH} animation="sit" face="calm" />
          ))}
        </>
      ),
    },
    {
      // Hard on him in the doorway, and he is not sad, he is used to it. Six years of it.
      cue: "1.me",
      ...cam.push({ on: [3.40, 1.28, -2.30], dist: 3.04, to: 2.49, yaw: -27, pitch: 0, fov: 42 }),
      zone: "class",
      note: "Hard on him in the doorway, and he is not sad, he is used to it. Six years of it.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.door} rotationY={EAST} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // A small kid version of him at the same doorway, first day, bag too big.
      cue: "1.day",
      ...cam.push({ on: [3.30, 0.80, -2.30], dist: 2.83, to: 2.28, yaw: -27, pitch: 6, fov: 44 }),
      zone: "class",
      note: "A small kid version of him at the same doorway, first day, bag too big.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.door} rotationY={EAST} animation="idle" face="uneasy" />
          <Block position={SPOT.at(3.6, 0.62, -2.75)} size={[0.44, 0.5, 0.22]} color="#3f6fb8" />
        </>
      ),
    },
    {
      // The same room at lunch: every desk full, nobody looking at the door.
      cue: "1.daya",
      ...cam.push({ on: [0.60, 1.05, -0.60], dist: 4.24, to: 3.69, yaw: -31, pitch: 5, fov: 50 }),
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
      ...cam.push({ on: [-0.40, 1.20, -2.90], dist: 5.11, to: 4.56, yaw: -23, pitch: 2, fov: 46 }),
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
      ...cam.push({ on: [-0.20, 0.82, -2.90], dist: 2.04, to: 1.49, yaw: 33, pitch: 8, fov: 36 }),
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
      ...cam.push({ on: [3.40, 1.10, -2.50], dist: 3.69, to: 3.14, yaw: -33, pitch: 2, fov: 44 }),
      zone: "class",
      note: "The rule, said over a door closing: THE look of the power for the whole film is a door.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.door} rotationY={EAST} animation="walk" animDistance={0.9} face="calm" />
        </>
      ),
    },
    {
      // The canteen: him with a tray, halfway out, the dinner lady already turning to the next kid.
      cue: "2.food",
      ...cam.push({ on: [13.60, 1.05, -3.30], dist: 4.91, to: 4.36, yaw: 17, pitch: 4, fov: 48 }),
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
      ...cam.push({ on: [13.80, 1.30, -5.20], dist: 3.93, to: 3.38, yaw: 15, pitch: 1, fov: 38 }),
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
      ...cam.push({ on: [-0.60, 1.20, -2.90], dist: 4.41, to: 3.86, yaw: 33, pitch: 1, fov: 44 }),
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
      ...cam.push({ on: [-0.60, 1.28, -2.90], dist: 2.69, to: 2.14, yaw: 22, pitch: -1, fov: 36 }),
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
      ...cam.push({ on: [0.00, 1.00, 1.20], dist: 2.48, to: 1.93, yaw: 24, pitch: 13, fov: 48 }),
      zone: "class",
      note: "A whole class turned round in their seats, staring at an empty chair in the front row.",
      stage: (_t) => (
        <>
          {[0, 1, 2].flatMap((col) => [0, 1, 2].map((row) => (
            <Classmate key={`${col}${row}`} who={col * 3 + row + 2} position={SPOT.seat(col, row)} rotationY={SOUTH} animation="sit" face="fear" headPitch={-0.1} />
          )))}
          <Block position={SPOT.seat(1, 1)} size={[0.44, 0.06, 0.42]} color="#8a6a44" castShadow={false} />
          <Block position={SPOT.at(0, 0.42, 1.0)} size={[0.44, 0.04, 0.42]} color="#8a6a44" castShadow={false} />
          <Block position={SPOT.at(0, 0.72, 1.2)} size={[0.44, 0.3, 0.05]} color="#8a6a44" castShadow={false} />
          <Block position={SPOT.at(0, 0.86, 1.58)} size={[0.42, 0.44, 0.12]} color="#3f6fb8" />
        </>
      ),
    },
    {
      // The chair, close: a bag on it, and a class behind it not breathing.
      cue: "2.chaira",
      ...cam.push({ on: [0.00, 0.86, 1.20], dist: 2.17, to: 1.62, yaw: 34, pitch: 5, fov: 34 }),
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
      ...cam.push({ on: [0.30, 0.70, 160.50], dist: 3.74, to: 3.19, yaw: -39, pitch: 21, fov: 50 }),
      zone: "kitchen",
      note: "The kitchen table from above: five place settings, four chairs pulled out.",
      stage: (_t) => (
        <>
          <Player who={9} position={HOME.chair} rotationY={NORTH} animation="sit" />
          {[[-0.3, 0.55], [0.3, 0.55], [-0.3, 0.95], [0.3, 0.95], [0.3, 1.15]].map(([x, z], i) => (
            <Block key={i} position={[0.3 + x, 0.775, z]} size={[0.3, 0.016, 0.3]} color="#f7f4ea" castShadow={false} />
          ))}
          <Block position={[0.3, 0.42, 1.35]} size={[0.4, 0.04, 0.36]} color="#8a6a44" castShadow={false} />
        </>
      ),
    },
    {
      // His mum's hands, putting the fifth plate down at an empty space.
      cue: "3.fivea",
      ...cam.push({ on: [0.30, 0.80, 160.60], dist: 2.41, to: 1.86, yaw: -33, pitch: 8, fov: 40 }),
      zone: "kitchen",
      note: "His mum's hands, putting the fifth plate down at an empty space.",
      stage: (_t) => (
        <>
          <Block position={[0.3, 0.775, 1.15]} size={[0.3, 0.016, 0.3]} color="#f7f4ea" castShadow={false} />
          <Block position={[0.42, 0.86, 1.12]} size={[0.14, 0.04, 0.14]} color="#c8c2b0" castShadow={false} />
        </>
      ),
    },
    {
      // A shop door, and him walking a bike out of it.
      cue: "3.shop",
      ...cam.push({ on: [0.20, 1.00, 123.60], dist: 4.42, to: 3.87, yaw: -141, pitch: 5, fov: 50 }),
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
      ...cam.push({ on: [-0.70, 1.30, 123.90], dist: 2.08, to: 1.53, yaw: -145, pitch: -3, fov: 38 }),
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
      ...cam.push({ on: [-21.00, 1.10, -0.60], dist: 7.81, to: 7.26, yaw: -50, pitch: 2, fov: 52 }),
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
      ...cam.push({ on: [-23.80, 1.15, -1.20], dist: 4.84, to: 4.29, yaw: -24, pitch: 2, fov: 46 }),
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

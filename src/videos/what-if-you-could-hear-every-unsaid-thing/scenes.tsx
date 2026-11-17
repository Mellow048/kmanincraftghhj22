import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Classmate, Teacher } from "../../../Topics/WhatIf";
import { A, Dad, Friend, Hero, Mum, PLACE, Unsaid, fit, timing } from "./kit";

/**
 * THE FILM, 36 shots, 78.6 s.
 *
 * One place per act, and the camera never repeats a distance twice in a row: wide to open a place, medium for the
 * person deciding, close for the sentence they did not say.
 */

const DAY = "overworld-day" as const;
const WARM = "warm-room" as const;

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ramp = (t: number, a: number, b: number) => Math.max(0, Math.min(1, (t - a) / Math.max(0.01, b - a)));

export const scenes = storyScene(timing, {
  id: "scene1",
  title: "Every unsaid thing",
  shots: [
    // ---------------------------------------------------------------- 01 hook
    {
      cue: "1.hook",
      ...cam.push({ on: A("room", 0, 1.3, 2.1), dist: 4.93, to: 4.5, yaw: 186, pitch: 10.0, fov: 54 }),
      look: WARM,
      note: "His father in the doorway, from inside the room: the man who has said the same nothing every night.",
      stage: () => <Dad position={A("room", 0, 0, 2.15)} rotationY={Math.PI} animation="idle" face="bearded" />,
    },
    {
      cue: "1.mouth",
      ...cam.push({ on: A("room", -0.02, 1.55, 2.12), dist: 2.9, to: 2.75, yaw: 178, pitch: 9.0, fov: 46 }),
      look: WARM,
      note: "Close on a mouth that stays shut. The title is a contradiction and this is the proof of it.",
      stage: () => <Dad position={A("room", 0, 0, 2.15)} rotationY={Math.PI} animation="idle" face="bearded" />,
    },
    {
      cue: "1.rule",
      ...cam.push({ on: A("room", 0, 1.2, 0.6), dist: 5.51, to: 5.08, yaw: 160, pitch: 11.0, fov: 54 }),
      look: WARM,
      note: "The boy on his bed and the grey sentence in the air: the rule of the film, shown before it is used.",
      stage: () => (
        <>
          <Hero position={A("room", -1.4, 0, -0.6)} rotationY={0.6} animation="sit" face="calm" />
          <Dad position={A("room", 0.6, 0, 2.1)} rotationY={0} animation="idle" face="bearded" />
          <Unsaid text="DO YOU STILL NEED ME" at={A("room", 0.6, 1.95, 2.0)} from={0.6} />
        </>
      ),
    },
    {
      cue: "1.only",
      ...cam.push({ on: A("room", 0.2, 1.6, 1.9), dist: 3.48, to: 3.26, yaw: 20, pitch: 9.0, fov: 48 }),
      look: WARM,
      note: "The grey words between them, and the boy's face reading them. Only he can see this.",
      stage: () => (
        <>
          <Hero position={A("room", 0.5, 0, 0.4)} rotationY={2.6} animation="idle" face="uneasy" headPitch={-0.05} />
          <Unsaid text="DO YOU STILL NEED ME" at={A("room", 0.3, 1.85, 1.9)} from={0} />
        </>
      ),
    },

    // ---------------------------------------------------------------- 02 the teacher
    {
      cue: "2.first",
      ...cam.push({ on: A("class", 0, 1.15, 0.4), dist: 4.6, to: 4.2, yaw: 176, pitch: 6, fov: 54 }),
      look: DAY,
      note: "The classroom wide, the teacher at the front, the boy at his desk with a test in front of him.",
      stage: () => (
        <>
          <Teacher position={A("class", 0.2, 0, -2.4)} rotationY={0} animation="talk" face="calm" />
          <Hero position={A("class", -0.6, 0, 1.4)} rotationY={Math.PI} animation="sit" face="calm" />
          <Classmate who={2} position={A("class", 1.2, 0, 1.4)} rotationY={0} animation="sit" face="calm" />
        </>
      ),
    },
    {
      cue: "2.maths",
      ...cam.push({ on: A("class", 0.2, 1.45, -2.4), dist: 2.9, to: 2.75, yaw: 12, pitch: 2, fov: 42 }),
      look: DAY,
      note: "Her, looking down at the paper, already deciding. The whole film turns on a teacher's silence.",
      stage: () => <Teacher position={A("class", 0.2, 0, -2.4)} rotationY={0} animation="idle" face="calm" headPitch={0.3} />,
    },
    {
      cue: "2.heard",
      ...cam.push({ on: A("class", 0.2, 1.75, -2.2), dist: 2.6, to: 2.45, yaw: 10, pitch: 3, fov: 42 }),
      look: DAY,
      note: "The sentence she did not say, grey in the air over her head, and nobody else in the room reacts to it.",
      stage: () => (
        <>
          <Teacher position={A("class", 0.2, 0, -2.4)} rotationY={0} animation="idle" face="calm" />
          <Unsaid text="THIS KID IS GOING TO FAIL" at={A("class", 0.2, 2.2, -2.3)} from={0.2} />
        </>
      ),
    },
    {
      cue: "2.said",
      ...cam.push({ on: A("class", -0.6, 1.35, 1.4), dist: 2.5, to: 2.4, yaw: 178, pitch: 3, fov: 40 }),
      look: DAY,
      note: "The boy, nine years old, taking it without a word. He has already learned the only safe answer.",
      stage: () => <Hero position={A("class", -0.6, 0, 1.4)} rotationY={Math.PI} animation="sit" face="sad" />,
    },

    // ---------------------------------------------------------------- 03 the friend
    {
      cue: "3.friend",
      ...cam.push({ on: A("hall", 0, 1.2, 0.6), dist: 4.4, to: 4.1, yaw: 176, pitch: 5, fov: 54 }),
      look: DAY,
      note: "The corridor wide, two boys at the lockers, and the space between them that is about to get bigger.",
      stage: () => (
        <>
          <Hero position={A("hall", -0.7, 0, 0.6)} rotationY={0.35} animation="idle" face="smile" />
          <Friend position={A("hall", 0.6, 0, 0.4)} rotationY={-0.35} animation="idle" face="uneasy" />
          <Classmate who={4} position={A("hall", 0, 0, -3.2)} rotationY={0} animation="walk" face="calm" />
        </>
      ),
    },
    {
      cue: "3.almost",
      ...cam.push({ on: A("hall", 0.6, 1.5, 0.4), dist: 2.4, to: 2.3, yaw: 356, pitch: 2, fov: 40 }),
      look: DAY,
      note: "His friend's face, mid-decision: mouth open, then closed. The sentence lands in the air instead.",
      stage: () => (
        <>
          <Friend position={A("hall", 0.6, 0, 0.4)} rotationY={-0.35} animation="idle" face="uneasy" />
          <Unsaid text="DONT SIT WITH ME TODAY" at={A("hall", 0.6, 1.95, 0.4)} from={0.3} />
        </>
      ),
    },
    {
      cue: "3.heard",
      ...cam.push({ on: A("hall", -0.5, 1.55, 0.6), dist: 2.3, to: 2.2, yaw: 40, pitch: 2, fov: 38 }),
      look: DAY,
      note: "The boy's face as he hears it, and the friend's shoulder out of focus: he knows before it is decided.",
      stage: () => (
        <>
          <Hero position={A("hall", -0.7, 0, 0.6)} rotationY={0.35} animation="idle" face="surprised" />
          <Unsaid text="DONT SIT WITH ME TODAY" at={A("hall", 0.35, 1.9, 0.45)} from={0} />
        </>
      ),
    },
    {
      cue: "3.why",
      ...cam.push({ on: A("hall", 0.2, 1.2, 0.5), dist: 3.6, to: 3.4, yaw: 120, pitch: 5, fov: 50 }),
      look: DAY,
      note: "Both of them, one step apart, not speaking. He thinks the boy already knows, so he says nothing.",
      stage: () => (
        <>
          <Hero position={A("hall", -0.7, 0, 0.6)} rotationY={0.35} animation="idle" face="sad" />
          <Friend position={A("hall", 0.6, 0, 0.4)} rotationY={-0.35} animation="idle" face="sad" headPitch={0.2} />
        </>
      ),
    },

    // ---------------------------------------------------------------- 04 the kitchen
    {
      cue: "4.mum",
      ...cam.push({ on: A("kitchen", 0, 1.15, 0.6), dist: 6.09, to: 5.65, yaw: 14, pitch: 13.0, fov: 54 }),
      look: WARM,
      note: "The kitchen: one lamp, one table, a mother standing at the counter with a bill in her hand.",
      stage: () => (
        <>
          <Mum position={A("kitchen", -0.9, 0, -1.6)} rotationY={0} animation="idle" face="smile" />
          <Hero position={A("kitchen", 1.1, 0, 0.8)} rotationY={-0.5} animation="sit" face="calm" />
        </>
      ),
    },
    {
      cue: "4.money",
      ...cam.push({ on: A("kitchen", -0.9, 1.5, -1.6), dist: 3.62, to: 3.48, yaw: 10, pitch: 9.0, fov: 48 }),
      look: WARM,
      note: "Her face doing arithmetic, and the sentence she does not say about it, every month, in this room.",
      stage: () => (
        <>
          <Mum position={A("kitchen", -0.9, 0, -1.6)} rotationY={0} animation="idle" face="sad" />
          <Unsaid text="WE CANT AFFORD IT" at={A("kitchen", -0.9, 1.95, -1.6)} from={0.4} />
        </>
      ),
    },
    {
      cue: "4.smile",
      ...cam.push({ on: A("kitchen", -0.9, 1.45, -1.5), dist: 3.19, to: 3.04, yaw: 8, pitch: 8.0, fov: 46 }),
      look: WARM,
      note: "The smile arriving a half second later, on top of the sentence. This is the whole trick of parents.",
      stage: () => <Mum position={A("kitchen", -0.9, 0, -1.6)} rotationY={0} animation="talk" face="smile" />,
    },
    {
      cue: "4.keep",
      ...cam.push({ on: A("kitchen", 1.1, 1.3, 0.8), dist: 3.77, to: 3.62, yaw: 8, pitch: 11.0, fov: 50 }),
      look: WARM,
      note: "The boy at the table, nodding, keeping it. He has been keeping other people's sentences since he was nine.",
      stage: () => (
        <>
          <Hero position={A("kitchen", 1.1, 0, 0.8)} rotationY={-0.5} animation="sit" face="calm" />
          <Unsaid text="WE CANT AFFORD IT" at={A("kitchen", -0.4, 1.8, -1.2)} from={0} />
        </>
      ),
    },

    // ---------------------------------------------------------------- 05 the father
    {
      cue: "5.dad",
      ...cam.push({ on: A("room", 0, 1.35, 1.9), dist: 4.64, to: 4.35, yaw: 182, pitch: 10.0, fov: 54 }),
      look: WARM,
      note: "Back to the doorway, and this time the night behind him is calm: the same man, the same silence.",
      stage: () => <Dad position={A("room", 0, 0, 2.15)} rotationY={Math.PI} animation="idle" face="bearded" />,
    },
    {
      cue: "5.door",
      ...cam.push({ on: A("room", 0, 1.3, 1.6), dist: 4.21, to: 4.06, yaw: 196, pitch: 11.0, fov: 54 }),
      look: WARM,
      note: "His shoulder in the door frame, from the side: six years of standing exactly there, deciding.",
      stage: () => <Dad position={A("room", 0, 0, 2.15)} rotationY={Math.PI} animation="idle" face="bearded" />,
    },
    {
      cue: "5.words",
      ...cam.push({ on: A("room", 0, 1.55, 2.1), dist: 3.04, to: 2.9, yaw: 172, pitch: 9.0, fov: 46 }),
      look: WARM,
      note: "Four grey words in the air, unreadable from this side: the film refuses to let the audience have them.",
      stage: () => (
        <>
          <Dad position={A("room", 0, 0, 2.15)} rotationY={Math.PI} animation="idle" face="bearded" />
          <Unsaid text="• • • •" at={A("room", 0.1, 1.95, 2.05)} from={0.2} height={0.16} />
        </>
      ),
    },
    {
      cue: "5.assume",
      ...cam.push({ on: A("room", -1.3, 1.35, -0.5), dist: 3.92, to: 3.77, yaw: 16, pitch: 10.0, fov: 50 }),
      look: WARM,
      note: "The boy in bed, sure he knows what the four words are. He is wrong and the film has told us so.",
      stage: () => <Hero position={A("room", -1.4, 0, -0.6)} rotationY={0.7} animation="sit" face="smug" />,
    },

    // ---------------------------------------------------------------- 06 misuse
    {
      cue: "6.use",
      ...cam.push({ on: A("hall", 0, 1.25, 0.4), dist: 4.2, to: 4.0, yaw: 178, pitch: 5, fov: 54 }),
      look: DAY,
      note: "The corridor again, busier now: he has learned to stand still and let people decide at him.",
      stage: () => (
        <>
          <Hero position={A("hall", -0.2, 0, 0.8)} rotationY={0.2} animation="idle" face="smug" />
          <Classmate who={1} position={A("hall", -2.0, 0, -1.4)} rotationY={0.6} animation="idle" face="calm" />
          <Classmate who={5} position={A("hall", 1.9, 0, -2.0)} rotationY={-0.6} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "6.quiet",
      ...cam.push({ on: A("hall", -0.2, 1.5, 0.8), dist: 2.4, to: 2.3, yaw: 8, pitch: 2, fov: 40 }),
      look: DAY,
      note: "His face, deliberately blank. Silence is the switch that makes other people's sentences arrive.",
      stage: () => <Hero position={A("hall", -0.2, 0, 0.8)} rotationY={0.2} animation="idle" face="smug" />,
    },
    {
      cue: "6.hunt",
      ...cam.push({ on: A("hall", 0.2, 1.6, -0.6), dist: 3.4, to: 3.2, yaw: 128, pitch: 4, fov: 48 }),
      look: DAY,
      note: "Two grey sentences from two people at once, and him in the middle, collecting them like coins.",
      stage: () => (
        <>
          <Hero position={A("hall", -0.2, 0, 0.8)} rotationY={0.2} animation="idle" face="smile" />
          <Unsaid text="NICE SHOES" at={A("hall", -2.0, 1.95, -1.3)} from={0.2} />
          <Unsaid text="IS HE OK" at={A("hall", 1.9, 1.95, -1.9)} from={0.6} />
        </>
      ),
    },
    {
      cue: "6.cheap",
      ...cam.push({ on: A("hall", -0.2, 1.45, 1.0), dist: 2.2, to: 2.1, yaw: 352, pitch: 1, fov: 38 }),
      look: DAY,
      note: "Close on him enjoying it. The film lets him be unlikeable here on purpose, so the cost lands later.",
      stage: () => <Hero position={A("hall", -0.2, 0, 0.8)} rotationY={0.2} animation="idle" face="grin" />,
    },

    // ---------------------------------------------------------------- 07 the cost
    {
      cue: "7.cost",
      ...cam.push({ on: A("hall", 0.4, 1.3, -1.2), dist: 3.6, to: 3.4, yaw: 140, pitch: 5, fov: 50 }),
      look: DAY,
      note: "Three students at the lockers, all of them thinking something they will not say, and him reading it.",
      stage: () => (
        <>
          <Hero position={A("hall", -0.4, 0, 0.9)} rotationY={0.2} animation="idle" face="uneasy" />
          <Classmate who={2} position={A("hall", 1.6, 0, -1.6)} rotationY={-0.8} animation="idle" face="calm" />
          <Unsaid text="HES WEIRD" at={A("hall", 1.6, 1.95, -1.6)} from={0.3} />
        </>
      ),
    },
    {
      cue: "7.weird",
      ...cam.push({ on: A("hall", -0.4, 1.5, 0.9), dist: 2.3, to: 2.2, yaw: 6, pitch: 2, fov: 38 }),
      look: DAY,
      note: "The boy hearing what people almost think of him, and the sentence hanging there with nowhere to go.",
      stage: () => (
        <>
          <Hero position={A("hall", -0.4, 0, 0.9)} rotationY={0.2} animation="idle" face="hurt" />
          <Unsaid text="HES WEIRD" at={A("hall", -0.2, 1.95, 0.7)} from={0} />
        </>
      ),
    },
    {
      cue: "7.move",
      ...cam.push({ on: A("hall", 0.1, 1.25, 0.5), dist: 3.2, to: 3.0, yaw: 2, pitch: 4, fov: 48 }),
      look: DAY,
      note: "An empty locker with its door open, and one boy in a corridor that is suddenly much too big.",
      stage: () => (
        <>
          <Hero position={A("hall", 0.1, 0, 0.6)} rotationY={0} animation="idle" face="sad" />
          <Classmate who={1} position={A("hall", 0.1, 0, -3.4)} rotationY={0} animation="walk" face="calm" />
          <Unsaid text="I SHOULD HAVE SAT WITH HIM" at={A("hall", 0.1, 2.0, -3.3)} from={0.5} />
        </>
      ),
    },
    {
      cue: "7.late",
      ...cam.push({ on: A("hall", 0.1, 1.55, 0.6), dist: 2.2, to: 2.1, yaw: 356, pitch: 1, fov: 38 }),
      look: DAY,
      note: "His face, and the sentence he can hear from four hundred miles away and cannot answer.",
      stage: () => (
        <>
          <Hero position={A("hall", 0.1, 0, 0.6)} rotationY={0} animation="idle" face="crying" />
          <Unsaid text="I SHOULD HAVE SAT WITH HIM" at={A("hall", 0.1, 2.0, -0.4)} from={0} />
        </>
      ),
    },

    // ---------------------------------------------------------------- 08 the turn
    {
      cue: "8.turn",
      ...cam.push({ on: A("room", 0, 1.3, 1.8), dist: 5.8, to: 5.37, yaw: 180, pitch: 11.0, fov: 54 }),
      look: WARM,
      note: "The bedroom again, the door full of his father, and the boy walking closer than he ever has.",
      stage: (t) => (
        <>
          <Dad position={A("room", 0, 0, 2.15)} rotationY={Math.PI} animation="idle" face="bearded" />
          <Hero position={A("room", 0, 0, lerp(1.2, 1.7, ramp(t, 0, 1.6)))} rotationY={0} animation="walk" face="uneasy" />
        </>
      ),
    },
    {
      cue: "8.close",
      ...cam.push({ on: A("room", 0, 1.6, 1.95), dist: 2.75, to: 2.68, yaw: 184, pitch: 9.0, fov: 44 }),
      look: WARM,
      note: "The back of his father's head at arm's length. Close enough, this time, to hear the whole sentence.",
      stage: () => (
        <>
          <Dad position={A("room", 0, 0, 2.15)} rotationY={Math.PI} animation="idle" face="bearded" />
          <Hero position={A("room", 0.15, 0, 1.55)} rotationY={0} animation="idle" face="uneasy" headPitch={-0.1} />
        </>
      ),
    },
    {
      cue: "8.four",
      ...cam.push({ on: A("room", 0.05, 1.9, 1.9), dist: 3.04, to: 2.9, yaw: 170, pitch: 9.0, fov: 46 }),
      look: WARM,
      note: "The sentence in full, grey above him: four words, and not one of them thanks.",
      stage: () => (
        <>
          <Dad position={A("room", 0, 0, 2.15)} rotationY={Math.PI} animation="idle" face="bearded" />
          <Unsaid text="DO YOU STILL NEED ME" at={A("room", 0, 2.05, 2.02)} from={0.5} height={0.14} />
        </>
      ),
    },
    {
      cue: "8.real",
      ...cam.push({ on: A("room", 0.9, 1.5, 1.2), dist: 3.33, to: 3.19, yaw: 40, pitch: 9.0, fov: 46 }),
      look: WARM,
      note: "His father's face, still turned away, and the boy behind him reading the words properly for the first time.",
      stage: () => (
        <>
          <Dad position={A("room", 0, 0, 2.15)} rotationY={0.15} animation="idle" face="sad" />
          <Hero position={A("room", 0.15, 0, 1.55)} rotationY={0} animation="idle" face="wow" />
          <Unsaid text="DO YOU STILL NEED ME" at={A("room", -0.5, 2.05, 1.95)} from={0} height={0.13} />
        </>
      ),
    },

    // ---------------------------------------------------------------- 09 the answer
    {
      cue: "9.night",
      ...cam.push({ on: A("room", 0, 1.2, 1.0), dist: 3.6, to: 3.35, yaw: 24, pitch: 8, fov: 50 }),
      look: WARM,
      note: "The last night of it, from the corner of the room: the boy on the left, the man filling the doorway.",
      stage: () => (
        <>
          <Dad position={A("room", 0.15, 0, 2.15)} rotationY={0.1} animation="idle" face="bearded" />
          <Hero position={A("room", -0.55, 0, 0.9)} rotationY={0.5} animation="idle" face="uneasy" />
          <Unsaid text="DO YOU STILL NEED ME" at={A("room", 0.15, 2.02, 2.02)} from={0.2} />
        </>
      ),
    },
    {
      cue: "9.say",
      ...cam.push({ on: A("room", -0.35, 1.3, 1.15), dist: 2.9, to: 2.75, yaw: 336, pitch: 6, fov: 44 }),
      look: WARM,
      note: "The boy saying it out loud, over his shoulder at the man behind him: the only voice anybody can hear.",
      stage: () => (
        <>
          <Hero position={A("room", -0.55, 0, 0.9)} rotationY={2.5} animation="talk" face="brave" />
          <Dad position={A("room", 0.15, 0, 2.15)} rotationY={0.1} animation="idle" face="bearded" />
        </>
      ),
    },
    {
      cue: "9.after",
      ...cam.push({ on: A("room", -0.1, 1.3, 1.4), dist: 3.3, to: 3.15, yaw: 8, pitch: 7, fov: 48 }),
      look: WARM,
      note: "His father turned all the way round, and the grey words gone out of the air between them.",
      stage: (t) => (
        <>
          <Dad position={A("room", 0.15, 0, 2.15)} rotationY={lerp(0.1, Math.PI, ramp(t, 0.2, 1.2))} animation="idle" face="smile" />
          <Hero position={A("room", -0.55, 0, 0.9)} rotationY={2.5} animation="idle" face="smile" />
        </>
      ),
    },
    {
      cue: "9.sub",
      ...cam.push({ on: A("room", -0.2, 1.15, 1.5), dist: 4.4, to: 4.15, yaw: 14, pitch: 9, fov: 52 }),
      look: WARM,
      note: "Both of them in the lit doorway, and a room that is finally quiet: the ask lands on the silence.",
      stage: () => (
        <>
          <Dad position={A("room", 0.15, 0, 2.1)} rotationY={Math.PI} animation="idle" face="smile" />
          <Hero position={A("room", -0.5, 0, 1.35)} rotationY={2.2} animation="idle" face="grin" />
        </>
      ),
    },
  ],
});

export type Vec3ish = Vec3;
export const ZONES = PLACE;

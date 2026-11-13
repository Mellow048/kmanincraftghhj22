import type React from "react";
import { Vox, cam, storyScene } from "../../engine";
import { Chicken, MonsterEgg } from "../../../Topics/InThisTown/creatures";
import { CARRIED, Crowd, DayWheel, Hero, WEST, faceOf, pop, timing, wordAt } from "./kit";

const HAY: [number, number, number] = [9, 0, 1.2];
const STANDS: [number, number, number] = [9.95, 0, 1.25];
const CRACK = wordAt("9.back", "cracked");
const WRAPS: Array<[string, number, number, number]> = [
  ["#d8433a", 0.5, 0.14, 0.37],
  ["#f2c53a", 0.46, 0.13, 0.5],
  ["#55b848", 0.36, 0.12, 0.62],
];

/** The egg on a bed of hay in the middle of the street. `wraps(i)` is the scale of each blanket. */
const HayNest: React.FC<{ wraps: (i: number) => number }> = ({ wraps }) => (
  <>
    <Vox kind="hay" position={[HAY[0], 0.15, HAY[2]]} size={[1.1, 0.3, 1.1]} />
    <MonsterEgg position={[HAY[0], 0.3, HAY[2]]} rotationY={WEST} scale={CARRIED} cracked />
    {WRAPS.map(([tint, w, h, y], i) => {
      const s = wraps(i);
      return s <= 0.001 ? null : (
        <Vox key={i} kind="wool" tint={tint} position={[HAY[0], y, HAY[2]]} size={[w * s, h, w * s]} />
      );
    })}
  </>
);

/** ATTEMPT ONE. The sensible idea. It fails, in public. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Attempt one",
  shots: [
    {
      cue: "9.warm",
      ...cam.push({ on: [9.15, 0.6, 1.2], dist: 3.1, to: 2.4, yaw: -90, pitch: 20 }),
      zone: "town",
      look: "overworld-day",
      note: "'Keeping it warm': egg on hay in the middle of the street, him crouched behind it with both hands out. Egg low, face above.",
      stage: () => (
        <>
          <HayNest wraps={() => 0} />
          <Hero position={[9.8, 0, 1.2]} rotationY={WEST} animation="crouch" arms="hold" face="smile" />
        </>
      ),
    },
    {
      cue: "9.wrap",
      ...cam.push({ on: [9, 0.6, 1.2], dist: 1.8, to: 1.4, yaw: -72, pitch: 16 }),
      zone: "town",
      look: "overworld-day",
      note: "'Wrapped it in blankets': three blankets land on the egg one after another, in under a second.",
      stage: (t) => (
        <>
          <HayNest wraps={(i) => pop(t, 0.06 + i * 0.22)} />
          <Hero position={[9.8, 0, 1.2]} rotationY={WEST} animation="crouch" arms="hold" face="grin" />
        </>
      ),
    },
    {
      cue: "9.sit",
      ...cam.push({ on: [9, 1.05, 1.2], dist: 3.4, to: 2.7, yaw: -90, pitch: -7 }),
      zone: "town",
      look: "overworld-day",
      note: "'Like a chicken for three whole days': he sits on it, elbows out, two real chickens watching, while the sun and moon go round three times.",
      stage: (t, { p }) => (
        <>
          <HayNest wraps={() => 1} />
          <Hero position={[9.02, 0.34, 1.2]} rotationY={WEST} animation="sit" arms="shrug" face="brave" />
          <Chicken position={[8.15, 0, 0.82]} rotationY={1.9} />
          <Chicken position={[8.25, 0, 1.62]} rotationY={-2.4} phase={1.1} />
          <DayWheel center={[31.5, 6.4, 1.2]} radius={4} turns={3} p={p} />
        </>
      ),
    },
    {
      cue: "9.back",
      ...cam.pan({ from: [7.3, 0.95, 2.0], on: [9, 0.5, 1.2], onTo: [9.9, 0.95, 1.25] }),
      impacts: [{ at: CRACK, amp: 0.06, dur: 0.35 }],
      zone: "town",
      look: "overworld-day",
      note: "'Nothing hatched': start on the bundle, which has not changed, and tilt up to him bent double. The frame jolts on 'cracked'.",
      stage: () => (
        <>
          <HayNest wraps={() => 1} />
          <Hero position={STANDS} rotationY={WEST} animation="ache" face="ouch" />
          <Chicken position={[8.4, 0, 0.5]} rotationY={1.9} />
        </>
      ),
    },
    {
      cue: "9.laugh",
      ...cam.truck({ on: [11.5, 1.25, 0.8], dist: 3.5, yaw: -90, pitch: -6, by: [0, 0, 0.8], fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "'The whole town laughed': what he sees from down there. Kids in front, adults over them, every one pointing at the lens.",
      stage: () => (
        <>
          <Crowd at={[11.4, 0, 1.2]} rotationY={WEST} count={3} spacing={0.72} animation="laugh" face="laugh" kidsOnly />
          <Crowd at={[12.15, 0, 1.2]} rotationY={WEST} count={4} spacing={0.8} animation="laugh" face="laugh" first={4} />
        </>
      ),
    },
    {
      cue: "9.not",
      ...cam.push({ on: faceOf(STANDS), dist: 2.0, to: 1.4, yaw: -78, pitch: -3, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "'But I was not done': under a second, straight in on his face. The laughing did not work.",
      stage: () => <Hero position={STANDS} rotationY={WEST} animation="idle" face="brave" gaze={0} />,
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Bread, Friend, Hero, PLACE, TownPeople, ramp, timing, Baker } from "./kit";
/** Beat 14: The last look home. The recorded words, not hand-set seconds, own every cut. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "The last look home",
  shots: [
    {
      cue: "14.morning",
      ...cam.push({ on: [3.6,1.05,-16.15], dist: 3.2, to: 2.7, yaw: 52, pitch: 10, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The same boards now press against his bare hands in daylight. The packed red bag makes the plan a departure rather than another test.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[2.9,0,-16.15]} rotationY={1.9} animation="reach" face="uneasy" time={0.8} pack />
      </>),
    },
    {
      cue: "14.rope",
      ...cam.push({ on: [0,5.95,-16.7], dist: 3.3, to: 2.8, yaw: 24, pitch: -8, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Tilt along the rope into the dark slot. Its destination has not changed, but this time he is about to follow it.",
      stage: (t, { p, dur }) => (<>

      </>),
    },
    {
      cue: "14.back",
      from: [4,2.4,-16],
      to: [4,2.5,-15],
      target: [5.5,1.2,1.2],
      fov: 44,
      ease: "inOutSine",
      zone: "village",
      look: "overworld-day",
      note: "Look back from the gap, past a small near shoulder, into the town he likes. This is the last shared geography before the shelf changes its meaning.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[3.8,0,-13]} animation="idle" face="uneasy" time={0.8} pack /><TownPeople t={t} /><Baker position={PLACE.baker} animation="reach" face="smile" time={t + 0.8} /><Friend position={PLACE.lessonFriend} animation="hug" face="grin" time={t + 0.8} />
      </>),
    },
    {
      cue: "14.baker",
      ...cam.push({ on: [6,1.4,-1.7], dist: 4.5, to: 3.9, yaw: 25, pitch: 12, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Repeat the tour composition and the same low piles. The bakery has carried on while the kid prepared to leave.",
      stage: (t, { p, dur }) => (<>
        <Baker position={PLACE.baker} animation="reach" face="smile" time={t + 0.8} /><Bread position={[6,1.03 + 0.22 * (1-p),-1.6]} scale={0.85} />
      </>),
    },
    {
      cue: "14.friend",
      ...cam.push({ on: [11.65,1.15,5.8], dist: 2.25, to: 1.9, yaw: 10, pitch: 4, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "Repeat the eaten lesson exactly enough to remember it. The small joke becomes something he might not get to see again.",
      stage: (t, { p, dur }) => (<>
        <Friend position={PLACE.lessonFriend} animation="hug" face="grin" headPitch={0.28} time={t + 0.8} /><Bread position={[11.65,0.8,6.05]} bun bitten />
      </>),
    },
    {
      cue: "14.empty",
      ...cam.push({ on: [3.2,0.48,-0.9], dist: 2.7, to: 2.25, yaw: 18, pitch: 32, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "The third thing in the look-back is the empty stool. Its scale and grain now stand in for the neighbor who used to sit here.",
      stage: (t, { p, dur }) => (<>

      </>),
    },
    {
      cue: "14.strap",
      ...cam.push({ on: [4,1.05,-14.75], dist: 2.8, to: 2.3, yaw: 8, pitch: 8, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Stay with three small bodily actions instead of announcing bravery: tighten the straps, bend the knees, take a steady breath.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.gapFoot} animation="hug" blendTo="crouch" blend={1 - ramp(p,0.45,0.75)} face="brave" time={0.8} pack />
      </>),
    },
    {
      cue: "14.scrape",
      ...cam.push({ on: [4,1.0,-14.75], dist: 2.05, to: 1.65, yaw: 12, pitch: 2, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "The scrape has arrived directly overhead. Cut tighter and change the face; the body remains crouched at the same opening.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.gapFoot} animation="crouch" face="fear" headPitch={-0.28} time={0.8} pack />
      </>),
    },
  ],
});

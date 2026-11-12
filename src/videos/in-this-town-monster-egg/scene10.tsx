import type React from "react";
import { cam, lerp, storyScene, stride } from "../../engine";
import { Dragon, Fire, MonsterEgg } from "../../../Topics/InThisTown/creatures";
import {
  Adult,
  Backpack,
  CARRIED,
  EAST,
  Friend,
  Hero,
  HeroEgg,
  OpenBag,
  ahead,
  dragonMouth,
  ease,
  ramp,
  timing,
  wordAt,
} from "./kit";
import { OvenDragon } from "./scene3";

/** The best friend's dragon, lying down on the grass south of the bakery. */
const DRAGON: [number, number, number] = [-3, 0, 1.2];
const BAG: [number, number, number] = [-3, 0, 3.9];
const EGG: [number, number, number] = [BAG[0], 0.1, BAG[2]];
const EGG_FACING = 2.4;
/** The crack: where the fire goes in. */
const CRACK: [number, number, number] = [-2.885, 0.32, 3.775];
const SITS: [number, number, number] = [-3.75, -0.35, 3.8];
const MOUTH = dragonMouth(DRAGON, 0, 0.95, 0.85);
const SNEEZE = wordAt("10.sneeze", "sneezed");

const FriendsDragon: React.FC<{ bow?: number; rear?: number; mouth?: number; headYaw?: number }> = ({
  bow = 0.85,
  rear = 0,
  mouth = 0,
  headYaw = 0,
}) => (
  <Dragon position={DRAGON} rotationY={0} scale={0.95} bow={bow} rear={rear} mouth={mouth} headYaw={headYaw} fold={0.6} rank="1,000,000" gold />
);

const BagAndEgg: React.FC<{ glow?: number; tilt?: number }> = ({ glow = 0, tilt = 0 }) => (
  <>
    <OpenBag position={BAG} rotationY={EGG_FACING} />
    <MonsterEgg position={EGG} rotationY={EGG_FACING} scale={CARRIED} cracked glow={glow} tilt={tilt} />
  </>
);

/** ATTEMPT TWO. The dangerous idea. It works, and that is the problem. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Attempt two",
  shots: [
    {
      cue: "10.hotter",
      ...cam.push({ on: [3.1, 1.0, -1.2], dist: 5.7, to: 4.4, yaw: 40, pitch: 9 }),
      zone: "town",
      look: "overworld-day",
      note: "'Something hotter': over his shoulder to what he is looking at, the dragon filling the bakery oven with fire.",
      stage: () => (
        <>
          <OvenDragon />
          <Adult who={0} position={[3.95, 0, -1.2]} rotationY={-0.5} animation="idle" face="smile" />
          <HeroEgg position={[5.25, 0, 1.75]} rotationY={-2.51} carry="hug" face="brave" />
        </>
      ),
    },
    {
      cue: "10.bag",
      ...cam.truck({ on: [4.4, 0.85, 1.4], dist: 2.0, yaw: 68, pitch: 14, by: [-2.2, 0, 0] }),
      zone: "town",
      look: "overworld-day",
      note: "'Hid the egg in my backpack': follow close behind him. The top of the egg sticks out of the bag and he keeps checking who can see.",
      stage: (t, { p }) => {
        const walk = stride([4.4, 0, 1.4], [2.2, 0, 1.4], p);
        return (
          <>
            <Hero {...walk} animation="walk" face="uneasy" headYaw={Math.sin(t * 5) * 0.7} />
            <Backpack position={ahead(walk.position, walk.rotationY, -0.22, 0.62)} rotationY={walk.rotationY} />
            <MonsterEgg position={ahead(walk.position, walk.rotationY, -0.22, 0.8)} rotationY={walk.rotationY + Math.PI} scale={0.4} cracked />
          </>
        );
      },
    },
    {
      cue: "10.close",
      ...cam.push({ on: [-3.3, 0.7, 3.4], dist: 3.8, to: 3.1, yaw: 8, pitch: 15 }),
      zone: "town",
      look: "overworld-day",
      note: "'As close as I could': the dragon's head, the open bag under its nose, and him sitting beside it looking at nothing in particular.",
      stage: () => (
        <>
          <FriendsDragon headYaw={0.3} />
          <Friend position={[-2.0, 0, 1.7]} rotationY={-0.4} animation="idle" face="smile" />
          <Hero position={SITS} rotationY={0} animation="sit" face="calm" />
          <BagAndEgg />
        </>
      ),
    },
    {
      cue: "10.sneeze",
      ...cam.push({ on: [-3, 1.2, 2.7], dist: 3.0, to: 2.5, yaw: 32, pitch: -6 }),
      impacts: [{ at: SNEEZE, amp: 0.09, dur: 0.4 }],
      zone: "town",
      look: "overworld-day",
      note: "'Finally sneezed': the head rears back for the whole line and snaps forward on the last word, fire first.",
      stage: (t) => {
        const fire = ramp(t, SNEEZE, SNEEZE + 0.1);
        const rear = ease(ramp(t, 0.15, SNEEZE)) * (1 - fire);
        return (
          <>
            <FriendsDragon bow={lerp(0.3, 0.85, fire)} rear={rear} mouth={fire} />
            <Fire from={MOUTH} to={[EGG[0], 0.4, EGG[2]]} power={fire} width={0.22} />
            <BagAndEgg />
          </>
        );
      },
    },
    {
      cue: "10.hit",
      ...cam.push({ on: [-3, 0.5, 3.9], dist: 2.0, to: 1.55, yaw: 118, pitch: 12 }),
      zone: "town",
      look: "overworld-day",
      note: "'The fire hit my egg': the egg in the open bag, fire pouring onto it from the side, him flinching behind it.",
      stage: (t) => (
        <>
          <FriendsDragon mouth={1} />
          <Fire from={MOUTH} to={[EGG[0], 0.36, EGG[2]]} power={1} width={0.22} />
          <BagAndEgg tilt={Math.sin(t * 40) * 0.04} />
          <Hero position={SITS} rotationY={EAST} animation="sit" arms="scared" face="fear" />
        </>
      ),
    },
    {
      cue: "10.drank",
      ...cam.push({ on: [-3, 0.5, 3.9], dist: 1.5, to: 1.05, yaw: 122, pitch: 9, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "'The egg drank it': the stream narrows to a point at the crack and is pulled in from the far end until none is left.",
      stage: (t) => (
        <>
          <Fire from={MOUTH} to={CRACK} power={1} tail={ease(ramp(t, 0.15, 1.8))} funnel width={0.2} count={26} />
          <BagAndEgg tilt={Math.sin(t * 34) * 0.03 * (1 - ramp(t, 1.6, 2.0))} glow={ramp(t, 0.2, 1.8) * 0.25} />
          <Hero position={SITS} rotationY={EAST} animation="sit" face="wow" />
        </>
      ),
    },
    {
      cue: "10.glow",
      ...cam.orbit({ on: [-3, 0.5, 3.9], dist: 1.3, yaw: 134, yawTo: 100, pitch: 8, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "'The crack started to glow': the first time the egg does anything good. Light comes up in the crack as we swing across it.",
      stage: (t) => (
        <>
          <BagAndEgg glow={0.25 + ease(ramp(t, 0.05, 0.9)) * 0.75} />
          <Hero position={SITS} rotationY={EAST} animation="sit" face="wow" />
        </>
      ),
    },
  ],
});

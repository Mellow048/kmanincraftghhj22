import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Brother, CHAOS, Daisy, FireLight, Hero, Lawn, MUD, PIGGY, Pig, WEST, EAST, ZONE, ease, flat, ramp, stride, timing, wordAt } from "./kit";
import { Glow } from "../../engine";

const HAND_R: Vec3 = [MUD[0] + 0.42, 0.06, MUD[2] - 0.05];
const HAND_L: Vec3 = [MUD[0] - 0.42, 0.06, MUD[2] - 0.05];
const LIFTED = wordAt("17.mud", "lifted");
const GRASS = wordAt("17.mud", "grass");
const TOUCHED = wordAt("17.pig", "touched");
const GREW = wordAt("17.pig", "grew");
const FACE: Vec3 = [MUD[0], 0.3, MUD[2] - 0.85];

/** IN THE MUD. He should be broken. He is not. And then he sees his hands. */
export const scene17 = storyScene(timing, {
  id: "scene17",
  title: "Did I do this?",
  shots: [
    {
      cue: "17.nothing",
      ...cam.top({ on: [MUD[0], 0.2, MUD[2] - 0.3], height: 3.5, to: 2.9, spin: [-10, 6], fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Straight down: flat on his back in the brown mud of the pig pen, arms out, a pig staring at him. His eyes are open. He is waiting for it to hurt, and it does not.",
      stage: (t) => (
        <>
          <Hero position={flat(MUD)} animation="lie" face="blank" gaze={0} />
          <Pig position={PIGGY} rotationY={EAST} burnt t={t} shake={1} />
          <Bits position={[MUD[0], 0.2, MUD[2]]} t={t + 0.25} color="#5a4030" count={12} seed={3} power={0.7} />
          <FireLight position={[MUD[0] + 2, 2.4, MUD[2] - 1]} power={14} reach={9} seed={2} />
        </>
      ),
    },
    {
      cue: "17.wait",
      from: [-9.4, 1.1, 10.5],
      to: [-9.3, 1.2, 10.3],
      target: [-6.5, 1.3, 9.0],
      fov: 42,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From the mud, looking up over the fence rail: his brother strolling across the square towards the pen with the fire in his hand, in no hurry at all.",
      stage: (t, { p }) => (
        <>
          <Brother {...stride([-5.2, 0, 8.5], [-6.9, 0, 9.2], p)} animation="walk" face="smug" flame={t} />
          <FireLight position={[-7, 2, 8]} power={10} reach={8} seed={3} />
        </>
      ),
    },
    {
      cue: "17.hands",
      ...cam.top({ on: [HAND_R[0] + 0.05, 0.1, HAND_R[2]], height: 1.5, to: 1.15, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Straight down on one hand, lying open in the mud. Round its edges, where a second ago there was only brown, there is a thin line of green, and it is glowing.",
      stage: (t, { p }) => (
        <>
          <Hero position={flat(MUD)} animation="lie" face="blank" />
          <Lawn position={HAND_R} size={0.62} grow={0.7 + 0.3 * ease(p)} seed={2} glow />
        </>
      ),
    },
    {
      cue: "17.mud",
      ...cam.top({ on: [MUD[0], 0.2, MUD[2] - 0.2], height: 2.6, to: 3.2, spin: [6, -4], fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "All of him from above. On 'lifted' both arms come up off the ground, and where each hand lay there is a square of bright grass in the mud. On 'grass' they spread.",
      stage: (t) => {
        const k = 0.75 + 0.6 * ease(ramp(t, GRASS, GRASS + 0.6));
        return (
          <>
            <Hero position={flat(MUD)} animation="lie" arms={t > LIFTED ? "lift" : undefined} face={t > LIFTED ? "wow" : "blank"} gaze={0} />
            <Lawn position={HAND_R} size={0.62} grow={k} seed={2} glow />
            <Lawn position={HAND_L} size={0.62} grow={k} seed={5} glow />
            <FireLight position={[MUD[0] + 2, 2.4, MUD[2] - 1]} power={12} reach={9} seed={2} />
          </>
        );
      },
    },
    {
      cue: "17.daisy",
      ...cam.push({ on: [HAND_R[0] + 0.1, 0.18, HAND_R[2]], dist: 1.35, to: 1.05, yaw: 40, pitch: 18, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Close on the grass by his side. One small white daisy pushes up out of it and opens: the same daisy as the day of the bell.",
      stage: (t, { p }) => (
        <>
          <Hero position={flat(MUD)} animation="lie" arms="lift" />
          <Lawn position={HAND_R} size={0.84} seed={2} glow />
          <Daisy position={[HAND_R[0] + 0.1, 0.05, HAND_R[2]]} grow={ease(ramp(p, 0, 0.7))} />
        </>
      ),
    },
    {
      cue: "17.did",
      ...cam.top({ on: FACE, height: 2.1, to: 1.8, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second: his face from above, eyes wide, green light on it from below.",
      stage: () => (
        <>
          <Hero position={flat(MUD)} animation="lie" arms="lift" face="wow" gaze={0} />
          <Glow position={[FACE[0], 0.5, FACE[2] + 0.5]} size={1.6} color="#9dff8a" opacity={0.25} />
        </>
      ),
    },
    {
      cue: "17.pig",
      ...cam.push({ on: [PIGGY[0] + 0.6, 0.7, PIGGY[2]], dist: 4.0, to: 3.4, yaw: -4, pitch: 16, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He is sitting up beside the pig. One of its ears is burned black. On 'touched' he puts a hand to it, and on 'grew' the ear is whole and pink again in a puff of green sparks. The pig is as surprised as he is.",
      stage: (t) => (
        <>
          <Pig position={PIGGY} rotationY={EAST} burnt={t < GREW} t={t} shake={t < TOUCHED ? 1 : 0} />
          <Hero position={[MUD[0] - 0.1, 0, MUD[2] - 0.2]} rotationY={WEST} animation="sit" arms={t > TOUCHED - 0.3 ? "press" : undefined} time={0.3} face={t < GREW ? "uneasy" : "wow"} />
          <Bits position={[PIGGY[0] + 0.55, 0.9, PIGGY[2] + 0.2]} t={t - GREW} color="#8dff7a" count={14} seed={4} power={0.7} />
          {t > TOUCHED ? <Glow position={[PIGGY[0] + 0.55, 0.85, PIGGY[2] + 0.2]} size={1.1} color="#9dff8a" opacity={0.45} /> : null}
          <Lawn position={[MUD[0] + 0.42, 0.06, MUD[2] - 0.05]} size={0.84} seed={2} />
        </>
      ),
    },
  ],
});

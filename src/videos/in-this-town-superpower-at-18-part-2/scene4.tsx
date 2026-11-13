import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
  DustRing, HANDS, Plunger, ROOTWAY, Streaks, Veins, jolt, pathAt, pop, tossed,
} from "./kit";
import { PLANT } from "./scene3";

/** IT COSTS HIM. And then it dawns on him that he could always do it. */
const DROP = 0.55;
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The whole time?",
  shots: [
    {
      cue: "4.tired",
      ...cam.push({ on: [PLANT[0] + 0.4, 0.7, PLANT[2]], dist: 4.2, to: 3.4, yaw: 40, pitch: 10, fov: 42 }),
      impacts: [{ at: DROP + 0.25, amp: 0.05, dur: 0.3 }],
      handheld: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Back in the pen. He drags his arms out of the mud, gets halfway up, sways, and his legs go: down on his face in his own daisies, dust puffing out from under him.",
      stage: (t) => (
        <>
          {t < DROP ? (
            <Plunger position={PLANT} yaw={ROOTWAY} k={1 - 0.75 * ease(t / DROP)} face="ouch" t={t} shake={1} />
          ) : (
            <Hero position={PLANT} rotationY={ROOTWAY} animation="collapse" time={t - DROP + 0.15} face="ouch" />
          )}
          <Garden />
          <Bits position={HANDS} t={t} color="#5a4030" count={10} seed={3} power={0.9} />
          <DustRing position={ahead(PLANT, ROOTWAY, 0.6)} t={t - DROP - 0.25} size={1.3} color="#6a5040" />
          <Lit at={PLANT} />
        </>
      ),
    },
    {
      cue: "4.big",
      ...cam.orbit({ on: [PLANT[0], 0.75, PLANT[2]], dist: 2.6, yaw: 150, pitch: 4, yawTo: 110, fov: 38 }),
      handheld: 0.025,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Close, low, drifting round him: on his hands and knees, grey, his whole body heaving with each breath, eyes going round. Far behind him, over his shoulder, the roots lie across the town.",
      stage: (t) => (
        <>
          <Hero position={[PLANT[0], Math.sin(t * 9) * 0.04, PLANT[2]]} rotationY={ROOTWAY} animation="crouch" time={t * 2.2} face="dizzy" headPitch={0.25 + Math.sin(t * 9) * 0.14} />
          <Garden />
          <Roots from={HANDS} to={LEAF} k={1} />
          <FireLight position={ahead(PLANT, ROOTWAY, 2.2, 1.8)} power={14} reach={7} seed={4} />
        </>
      ),
    },
    {
      cue: "4.along",
      ...cam.push({ on: [PLANT[0], 1.0, PLANT[2]], dist: 3.2, to: 2.3, yaw: 104, pitch: 2, fov: 38 }),
      handheld: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He rocks back on his heels, holds both hands up in front of his face and stares at them, turning them over. Then, on 'nobody', throws them wide at us. Outraged.",
      stage: (t) => {
        const w = wordAt("4.along", "Nobody");
        const told = t > w;
        return (
          <>
            <Hero position={[PLANT[0], jolt(t, w, 0.12), PLANT[2]]} rotationY={ROOTWAY} animation="sit" arms={told ? "shrug" : "lift"} face={told ? "frown" : "wow"} headPitch={told ? -0.1 : 0.3} headYaw={told ? jolt(t, w, 0.5) : Math.sin(t * 5) * 0.15} gaze={0} />
            <Garden />
            <FireLight position={ahead(PLANT, ROOTWAY, 2.2, 1.8)} power={14} reach={7} seed={4} />
          </>
        );
      },
    },
  ],
});

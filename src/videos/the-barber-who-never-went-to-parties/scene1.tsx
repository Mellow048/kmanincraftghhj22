import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Cape, Friend2, HAIR, HairFly, PLACE, Plate, Sparkle, pop, seatedPose, timing, tw, w } from "./kit";
import { MY_FACE, Me, Rewind, SIT, SIT_TOP } from "./acts";

/**
 * 1. THE HOOK. The owner: "no one is going to stay and listen, throw the main thing at the start". So frame one is
 * the main thing: the worst hair in town in a barber chair, a kid on a crate whose scissors are a blur, and the
 * line of the meme in blocks over them. Six HUS, and the hair is gone. "BRO. HOW?!" He opens his mouth to say how,
 * and the tape runs backwards: the answer is the film.
 */

const HUS = [0, 1, 2, 3, 4, 5].map((i) => w("1.hus", "HUS", i));
const WIDE: Vec3 = [0, 1.72, 0];
/** Where the lens of the wide shot stands, for the bars of the rewind. */
const lensOf = (on: Vec3, dist: number, yawDeg: number, pitchDeg: number): Vec3 => {
  const y = (yawDeg * Math.PI) / 180;
  const p = (pitchDeg * Math.PI) / 180;
  return [on[0] + Math.sin(y) * Math.cos(p) * dist, on[1] + Math.sin(p) * dist, on[2] + Math.cos(y) * Math.cos(p) * dist];
};

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The hook",
  shots: [
    {
      cue: "1.hus",
      ...cam.push({ on: WIDE, dist: 3.45, to: 3.05, yaw: 14, pitch: 3, fov: 40 }),
      zone: "shop",
      look: "overworld-day",
      note: "Frame one is the payoff: the worst hair in town, the blur behind it, the meme's line over both.",
      stage: (t) => {
        const bush = 1 - tw(t, 0.02, HUS[5] + 0.12);
        return (
          <>
            <Friend2 position={SIT} hair="bush" bush={bush} snag={t < HUS[1]} pose={seatedPose(t)} face="scared" gaze={0} />
            <Cape position={PLACE.chair} scale={0.96} />
            <Me t={t} fast={1} face="calm" />
            <HairFly position={SIT_TOP} t={t} at={[-0.25, ...HUS]} color={HAIR.f2} count={10} power={1.25} />
            <Plate lines={["HE NEVER WENT", "TO A SINGLE PARTY"]} position={[0.14, 2.4, 0.3]} width={0.9} />
          </>
        );
      },
    },
    {
      cue: "1.hus",
      cut: HUS[5] + 0.16,
      ...cam.push({ on: [0, 1.8, 0], dist: 3.25, to: 2.95, yaw: -9, pitch: 2, fov: 40 }),
      zone: "shop",
      look: "overworld-day",
      note: "The chant ends and the cape comes off on a perfect head: the skill, proved in two seconds.",
      stage: (t) => (
        <>
          <Friend2 position={SIT} hair="cut" pose={seatedPose(t)} face={t < 0.25 ? "scared" : "wow"} gaze={0} />
          <Cape position={PLACE.chair} scale={0.96} off={tw(t, 0.02, 0.32)} side={1} />
          <Me t={t} fast={0} up={1.15} face="smug" />
          <Sparkle position={[0.3, 1.56, 0.35]} k={pop(t, 0.26, 0.2)} size={0.3} />
          <Plate lines={["HE NEVER WENT", "TO A SINGLE PARTY"]} position={[-0.03, 2.44, 0.3]} width={0.84} />
        </>
      ),
    },
    {
      cue: "1.how",
      ...cam.push({ on: [0, 1.66, 0], dist: 2.2, to: 1.9, yaw: 13, pitch: 0, fov: 38 }),
      zone: "shop",
      look: "overworld-day",
      note: "The friend sees himself and asks what the viewer is asking; my face is stacked over his.",
      stage: (t) => {
        const p = seatedPose(t);
        return (
          <>
            <Friend2 position={SIT} hair="cut" pose={p} face={t < w("1.how", "HOW") ? "surprised" : "wow"} gaze={0} headYaw={Math.sin(t * 9) * 0.14} />
            <Me t={t} fast={0} up={0.3} face="smug" />
          </>
        );
      },
    },
    {
      cue: "1.how",
      cut: 1.05,
      ...cam.push({ on: MY_FACE, dist: 1.7, to: 1.35, yaw: 4, pitch: -2, fov: 36 }),
      zone: "shop",
      look: "overworld-day",
      note: "I breathe in to answer, so the viewer waits for the answer, and does not get it yet.",
      stage: (t) => (
        <>
          <Friend2 position={SIT} hair="cut" pose={seatedPose(t)} face="wow" />
          <Me t={t} fast={0} up={tw(t, 0.05, 0.3) * 1.2} face={t < 0.3 ? "smug" : "happy"} />
        </>
      ),
    },
    {
      cue: "1.how",
      cut: 1.42,
      ...cam.push({ on: WIDE, dist: 3.05, to: 3.5, yaw: 14, pitch: 3, fov: 40 }),
      zone: "shop",
      look: "overworld-day",
      note: "The same picture run backwards, hair flying back on: the answer is the year we now go to.",
      stage: (t, { dur }) => {
        const back = tw(t, 0, dur - 0.1);
        return (
          <>
            <Friend2 position={SIT} hair="bush" bush={back} pose={seatedPose(-t * 3)} face="scared" gaze={0} />
            <Cape position={PLACE.chair} scale={0.96} off={Math.max(0, 0.9 - t * 4)} />
            <Me t={-t * 2.5} fast={1} face="calm" />
            <HairFly position={SIT_TOP} t={dur - t} at={[0.08, 0.24, 0.4, 0.56]} color={HAIR.f2} count={10} power={1.25} />
            <Rewind t={t} lens={lensOf(WIDE, 3.28, 14, 3)} on={WIDE} depth={1.0} />
            <Plate lines={["REWIND"]} position={[0.1, 2.4, 0.3]} width={0.8} color="#ffe14a" k={Math.floor(t * 8) % 2 ? 1 : 0.92} />
          </>
        );
      },
    },
  ],
});

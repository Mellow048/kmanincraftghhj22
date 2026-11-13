import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, EAST, FireLight, Hero, NAMED, PLACE, Smoke, SmokeBank, Strangers, WEST, Wisps, pop, ramp, timing, wordAt } from "./kit";

const LIP = PLACE.lip;
/** Where he stands when we look down over his head: a little to one side, so the valley is in the middle of the frame. */
const SHOULDER: Vec3 = [LIP[0], LIP[1], 1.08];
const WORDS = wordAt("11.words", "words");
const SOMEBODY = wordAt("11.words", "somebody");
const LAUGHING = wordAt("11.words", "laughing");

/** THE ACT. Smoke, then a sound he has never heard from anyone else, then people. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The other side",
  shots: [
    {
      cue: "11.smoke",
      ...cam.push({ on: [LIP[0], 12.18, 0], dist: 2.4, to: 1.9, yaw: 90, pitch: -2, fov: 38 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'Nothing but smoke': the colour of the film changes on this cut. His face, squinting, with smoke crossing between him and us.",
      stage: (t) => (
        <>
          <Hero position={LIP} rotationY={EAST} animation="peek" face="ouch" />
          <Smoke position={[LIP[0] - 2.2, 10.6, -1.6]} rise={5} spread={1.6} size={4.2} count={9} color="#5a4d45" opacity={0.8} speed={0.22} seed={5} />
          <Smoke position={[LIP[0] - 1.6, 10.4, 1.8]} rise={5} spread={1.6} size={4} count={9} color="#665850" opacity={0.8} speed={0.2} seed={6} />
          <Wisps position={[LIP[0] + 1.0, 12.15, 0]} t={t + 1} count={16} reach={3.4} size={1.0} opacity={0.62} color="#7a6c63" dir={[0.05, 0.06, 1]} seed={8} />
          <FireLight position={[LIP[0] + 2.1, 11.8, 0.8]} power={16} reach={7} />
        </>
      ),
    },
    {
      cue: "11.words",
      from: [49.0, 13.7, 1.3],
      to: [49.4, 13.45, 1.3],
      target: [62, 5.6, 0],
      fov: 46,
      ease: "inOutSine",
      zone: "valley2",
      look: "lava-shore",
      note: "'I heard words': down over his head, into the smoke. For the whole film the only bubble has said HMM. These say HA.",
      stage: (t) => (
        <>
          <Hero position={SHOULDER} rotationY={EAST} animation="lookAround" face="wow" />
          <SmokeBank x={63.5} amount={1} t={t} />
          <Bubble text="HA" position={[61.6, 7.0, -1.5]} rotationY={WEST} scale={pop(t, WORDS) * 1.8} />
          <Bubble text="HA HA" position={[60.7, 4.7, 1.3]} rotationY={WEST} scale={pop(t, SOMEBODY) * 1.8} tail={1} />
          <Bubble text="HA!" position={[62.2, 8.8, 0.5]} rotationY={WEST} scale={pop(t, LAUGHING) * 1.7} />
          <FireLight position={[LIP[0] + 1.6, 12.2, 0.9]} power={10} reach={6} />
        </>
      ),
    },
    {
      cue: "11.them",
      from: [48.6, 14.3, 1.3],
      to: [49.1, 14.0, 1.3],
      target: [66.8, 0.8, 0],
      fov: 34,
      ease: "inOutSine",
      zone: "valley2",
      look: "lava-shore",
      note: "'I saw people. Dozens': the near smoke opens and the foot of the hill is full of them, with torches. The smoke behind them still hides what they have done.",
      stage: (t) => (
        <>
          <Hero position={SHOULDER} rotationY={EAST} animation="idle" face="wow" />
          <SmokeBank x={63.5} amount={1 - ramp(t, 0.05, 0.8)} part={ramp(t, 0.05, 0.8) * 0.7} t={t} />
          <SmokeBank x={74} amount={1} t={t} />
          <Strangers />
          <FireLight position={[LIP[0] + 1.6, 12.2, 0.9]} power={10} reach={6} />
        </>
      ),
    },
    {
      cue: "11.beard",
      ...cam.push({ on: [NAMED.beard[0], 1.62, NAMED.beard[2]], dist: 2.35, to: 2.0, yaw: -78, pitch: -4, fov: 36 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'One had a beard': a flash, close. A grown-up face with a beard on it, laughing, torch in hand.",
      stage: (t) => (
        <>
          <Strangers lit />
          <SmokeBank x={74} amount={1} t={t} />
        </>
      ),
    },
    {
      cue: "11.hair",
      ...cam.push({ on: [NAMED.hair[0], 1.72, NAMED.hair[2]], dist: 2.4, to: 2.05, yaw: -112, pitch: -4, fov: 36 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'One had green hair': a second flash, another angle. Bright green, cheering, both arms up.",
      stage: (t) => (
        <>
          <Strangers lit />
          <SmokeBank x={74} amount={1} t={t} />
        </>
      ),
    },
    {
      cue: "11.pumpkin",
      ...cam.push({ on: [NAMED.pumpkin[0], 1.6, NAMED.pumpkin[2]], dist: 2.4, to: 2.05, yaw: -66, pitch: -3, fov: 36 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'One wore a pumpkin': the third flash. A carved pumpkin where a head should be, turning to look at us.",
      stage: (t) => (
        <>
          <Strangers lit />
          <SmokeBank x={74} amount={1} t={t} />
        </>
      ),
    },
  ],
});

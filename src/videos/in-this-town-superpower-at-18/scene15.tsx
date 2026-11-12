import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Bo, Brother, Burst, CHAOS, Drain, FireLight, Flame, Hero, NORTH, Orbs, SOUTH, WEST, EAST, ZONE, ease, faceOf, hop, ramp, timing, wordAt } from "./kit";
import { NEAR, STOOD } from "./scene12";

const HELD: Vec3 = [7.72, 0.72, 0.25];
const JUMPED = wordAt("15.jumped", "jumped");
const FIRE = wordAt("15.not", "fire");
const EXPL = wordAt("15.not", "explosions");
const STR = wordAt("15.not", "strength");
const TAKING = wordAt("15.took", "taking");

/** WHAT HIS POWER IS. Bo shows us, by losing his. */
export const scene15 = storyScene(timing, {
  id: "scene15",
  title: "His power was taking powers",
  shots: [
    {
      cue: "15.bo",
      ...cam.push({ on: [7.2, 2.0, 0.5], dist: 6.4, to: 5.6, yaw: 18, pitch: -4, fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Wide. From the left a green robe comes sailing in through the smoke, two blocks up, nose first, straight at the brother's head: Bo, using the only thing he has.",
      stage: (t, { p }) => {
        const k = Math.min(1, p * 1.15);
        return (
          <>
            <Bo position={[4.4 + (HELD[0] - 4.4) * k, HELD[1] * k + Math.sin(k * Math.PI) * 2.6, 0.6 + (HELD[2] - 0.6) * k]} rotationY={EAST} lean={0.5} />
            <Brother position={NEAR} rotationY={SOUTH} animation="idle" face="smug" flame={t} headYaw={0.5 * k} />
            <Hero position={[8.4, 0, 1.3]} rotationY={NORTH} animation="stagger" animDistance={0.2} face="wow" />
          </>
        );
      },
    },
    {
      cue: "15.caught",
      ...cam.push({ on: [8.05, 1.45, 0.25], dist: 2.6, to: 2.2, yaw: 20, pitch: 0, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He has him: one arm out, without even turning his body, and Bo hanging from the end of it with his feet off the ground.",
      stage: (t) => (
        <>
          <Bo position={[HELD[0], HELD[1] + Math.sin(t * 9) * 0.03, HELD[2]]} rotationY={EAST} turn={Math.sin(t * 11) * 0.3} />
          <Brother position={NEAR} rotationY={-1.1} animation="reach" face="smug" />
          <FireLight position={[8.6, 1.6, 1.8]} power={9} reach={6} seed={2} />
        </>
      ),
    },
    {
      cue: "15.light",
      ...cam.push({ on: [8.0, 1.3, 0.25], dist: 2.4, to: 2.0, yaw: -16, pitch: 4, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Green lights come out of Bo's chest, cross the arm, and go into the black shirt. As the last one leaves, Bo's robe goes from green to grey and he sags.",
      stage: (t, { p }) => (
        <>
          <Bo drained={p > 0.7} position={[HELD[0], HELD[1] - 0.35 * ease(ramp(p, 0.6, 1)), HELD[2]]} rotationY={EAST} nod={0.5 * ease(ramp(p, 0.6, 1))} />
          <Brother position={NEAR} rotationY={-1.1} animation="reach" face="grin" />
          <Drain from={[HELD[0], HELD[1] + 1.0, HELD[2]]} to={[NEAR[0], 1.15, NEAR[2]]} k={p * 0.98} />
          <FireLight position={[7.6, 1.6, 1.8]} power={9} reach={6} seed={3} />
        </>
      ),
    },
    {
      cue: "15.jumped",
      ...cam.push({ on: [8.3, 2.0, 0.2], dist: 5.8, to: 5.4, yaw: 10, pitch: -5, fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Wide and low. On 'jumped' the brother goes straight up, two blocks, exactly as Bo did at the bell, and lands laughing. Bo is a grey heap at his feet.",
      stage: (t) => (
        <>
          <Bo drained position={[7.5, 0, 0.5]} rotationY={0.6} lean={0.7} nod={0.5} />
          <Brother position={[NEAR[0], hop(t, JUMPED - 0.1, 2.0, 0.95), NEAR[2]]} rotationY={SOUTH} animation={t > JUMPED + 0.85 ? "laugh" : "idle"} face="grin" />
          <Bits position={[NEAR[0], 0.1, NEAR[2]]} t={t - JUMPED - 0.85} color="#8dff7a" count={10} seed={4} power={0.7} />
          <Hero position={[8.5, 0, 1.9]} rotationY={NORTH} animation="idle" headPitch={-0.4} />
        </>
      ),
    },
    {
      cue: "15.saw",
      ...cam.push({ on: faceOf(STOOD), dist: 1.7, to: 1.4, yaw: 152, pitch: 0, fov: 34 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The teller's face, close. He has just worked it out.",
      stage: () => (
        <>
          <Hero position={STOOD} rotationY={NORTH} animation="idle" face="wow" gaze={0} />
          <FireLight position={[STOOD[0] + 1.2, 1.6, STOOD[2] - 1.2]} power={10} reach={6} seed={5} />
        </>
      ),
    },
    {
      cue: "15.not",
      ...cam.push({ on: [8.4, 1.25, 0.2], dist: 4.4, to: 3.7, yaw: 12, pitch: 2, fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The brother, showing them off one after another, on the words: 'fire', and both hands blaze; 'explosions', and the ruin behind him blows again; 'strength', and he stamps and the road cracks.",
      stage: (t) => (
        <>
          <Brother position={[NEAR[0], t > STR ? -0.04 : 0, NEAR[2]]} rotationY={SOUTH} animation="idle" blendTo="cheer" blend={ease(ramp(t, FIRE - 0.2, FIRE + 0.1)) * (t < STR ? 1 : 0.2)} face="grin" flame={t >= FIRE - 0.1 ? t : undefined} />
          {t >= FIRE - 0.1 ? <Flame t={t + 0.4} position={[NEAR[0] - 0.42, 1.95, NEAR[2] + 0.1]} size={1.2} /> : null}
          <Burst position={[9.6, 2, -5.5]} t={t - EXPL} size={4.2} seed={3} />
          <Bits position={[NEAR[0], 0.1, NEAR[2] + 0.3]} t={t - STR} color="#8a7a66" count={16} seed={6} power={1.4} />
          <Bits position={[NEAR[0] + 0.5, 0.1, NEAR[2]]} t={t - STR - 0.05} color="#5a5048" count={12} seed={8} power={1.1} />
        </>
      ),
    },
    {
      cue: "15.took",
      ...cam.orbit({ on: [8.4, 1.2, 0.2], dist: 3.6, yaw: -22, pitch: 4, yawTo: 18 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "On 'taking' they all come out at once: dozens of small coloured lights wheeling round him, one for every person he has emptied. A whole village of them.",
      stage: (t) => (
        <>
          <Brother position={NEAR} rotationY={SOUTH} animation="idle" blendTo="cheer" blend={0.6} face="grin" flame={t} />
          <Orbs position={NEAR} t={t} amount={ease(ramp(t, TAKING - 0.2, TAKING + 0.5))} count={18} />
        </>
      ),
    },
    {
      cue: "15.scared",
      ...cam.push({ on: faceOf([8.4, 0, 1.8]), dist: 1.9, to: 1.6, yaw: 152, pitch: 0, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The teller again. The anger has gone out of his face. He takes one step back.",
      stage: (t, { p }) => (
        <>
          <Hero position={[8.4, 0, 1.6 + 0.4 * ease(ramp(p, 0.3, 0.9))]} rotationY={NORTH} animation="scared" face="scared" gaze={0} />
          <FireLight position={[9.6, 1.6, 0.6]} power={10} reach={6} seed={7} />
        </>
      ),
    },
  ],
});

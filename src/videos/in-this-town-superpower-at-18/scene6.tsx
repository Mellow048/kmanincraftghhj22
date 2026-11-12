import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Bo, Bucket, DAY, Folk, Hero, Mira, Mom, PLACE, SOUTH, Tip, ZONE, ahead, chestOf, hop, stride, timing, waddle, wordAt } from "./kit";

const ROOF: Vec3 = [PLACE.baker[0], 6.25, PLACE.baker[2] - 3];
const BO = wordAt("6.friends", "Bo");
const MIRA = wordAt("6.friends", "Mira");
const TIP = wordAt("6.friends", "Tip");
const PUNCH = 0.55;

/** GROWING UP HELPING. And three friends. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "A pretty good life",
  shots: [
    {
      cue: "6.help",
      ...cam.truck({ on: chestOf([-1.6, 0, 2.4]), dist: 3.1, yaw: 24, pitch: 3, by: [1.4, 0, 0] }),
      zone: ZONE.day,
      look: DAY,
      note: "The young man in red walking down the street smiling, and villagers turning their long noses to watch him pass.",
      stage: (t, { p }) => (
        <>
          <Hero {...stride([-1.6, 0, 2.4], [-0.2, 0, 2.4], p)} animation="walk" face="smile" />
          <Folk n={0} position={[-0.6, 0, 0.6]} rotationY={0.2} lookAt={[-0.9, 1.5, 2.4]} />
          <Folk n={3} position={[1.4, 0, 0.9]} rotationY={-0.4} lookAt={[-0.9, 1.5, 2.4]} />
        </>
      ),
    },
    {
      cue: "6.water",
      ...cam.truck({ on: [-3.6, 1.0, 6.9], dist: 3.2, yaw: 30, pitch: 5, by: [1.2, 0, 0.3] }),
      zone: ZONE.day,
      look: DAY,
      note: "By the well: he carries a full bucket in both hands, and his mother waddles along beside him.",
      stage: (t, { p }) => {
        const s = stride([-3.6, 0, 7.0], [-2.4, 0, 7.3], p);
        return (
          <>
            <Hero {...s} animation="walk" arms="hold" face="smile" />
            <Bucket position={ahead(s.position, s.rotationY, 0.42, 0.72)} />
            <Mom {...waddle([-3.5, 0, 6.1], [-2.3, 0, 6.4], p)} />
          </>
        );
      },
    },
    {
      cue: "6.roof",
      ...cam.push({ on: [ROOF[0], ROOF[1] + 0.5, ROOF[2]], dist: 5.6, to: 4.9, yaw: 22, pitch: -12, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "Up on the baker's roof against the sky, on one knee, hammering a board down. Chips fly with each blow. Remember this roof.",
      stage: (t) => {
        const n = Math.floor(t / PUNCH);
        return (
          <>
            <Hero position={ROOF} rotationY={SOUTH} animation="crouch" arms="press" time={t - n * PUNCH} face="brave" headPitch={0.3} />
            <Bits position={[ROOF[0], ROOF[1] + 0.15, ROOF[2] + 0.5]} t={t - n * PUNCH - 0.22} color="#8a6a40" count={7} seed={n + 1} power={0.6} />
          </>
        );
      },
    },
    {
      cue: "6.friends",
      ...cam.push({ on: [0, 1.15, 3.1], dist: 4.6, to: 3.9, yaw: 4, pitch: 3, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "Four in a row facing us: green, blue, yellow, and him in red at the end. Each friend gives a little hop as he is named: Bo, Mira, Tip.",
      stage: (t) => (
        <>
          <Bo position={[-1.5, hop(t, BO, 0.3, 0.35), 3]} rotationY={0.15} />
          <Mira position={[-0.5, hop(t, MIRA, 0.3, 0.35), 3.15]} rotationY={0.05} />
          <Tip position={[0.5, hop(t, TIP, 0.3, 0.35), 3]} rotationY={-0.05} />
          <Hero position={[1.5, 0, 3.1]} rotationY={-0.25} animation="idle" face="grin" />
        </>
      ),
    },
    {
      cue: "6.good",
      ...cam.orbit({ on: [0, 1.1, 3.1], dist: 5.4, yaw: -24, pitch: 12, yawTo: -4 }),
      zone: ZONE.day,
      look: DAY,
      note: "Wider, swinging round the four of them in the sun, the bell behind. He is laughing. It is a good town.",
      stage: (t) => (
        <>
          <Bo position={[-1.5, 0, 3]} rotationY={0.6} hmm={1} />
          <Mira position={[-0.5, 0, 3.15]} rotationY={0.3} tilt={Math.sin(t * 6) * 0.1} />
          <Tip position={[0.5, 0, 3]} rotationY={-0.3} hmm={1} />
          <Hero position={[1.5, 0, 3.1]} rotationY={-0.6} animation="laugh" face="laugh" />
        </>
      ),
    },
  ],
});

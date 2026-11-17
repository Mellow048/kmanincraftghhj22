import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Folk, Bits, Bubble, DAY, Fill, Dad, DustRing, Hero, Hiss, Mo, Mum, NIGHT, NORTH, PLACE, Puffs, Stew, ZONE, ease, faceOf, hop, jolt, manFace, pop, ramp, timing, tossed, wordAt } from "./kit";

const MO_DOOR: Vec3 = [22.2, 0, -4.3];

/** HOW HE DIFFERS (sun, stew, dark), and then Mo: the one who stares. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The only one of me",
  shots: [
    {
      cue: "3.sun",
      ...cam.push({ on: [-3.2, 1.0, -0.3], dist: 5.2, to: 4.6, yaw: -58, pitch: 6, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "Along the edge of the roof's shadow. Hiss puts one foot out into the sun; on 'burned' he smokes and leaps back in. The others watch from the dark.",
      impacts: [{ at: 1.9, amp: 0.04, dur: 0.3 }],
      stage: (t) => {
        const burn = wordAt("3.sun", "burned");
        const out = ease(ramp(t, 0.3, burn - 0.1));
        const back = ease(ramp(t, burn + 0.1, burn + 0.35));
        const z = -1.0 + 1.3 * out - 1.7 * back;
        return (
          <>
            <Hiss position={[-3.2, hop(t, burn + 0.1, 0.5, 0.3), z]} walk={1.3 * out} mood={t > burn ? "scared" : "calm"} fuse={t > burn ? 0.3 * (1 - ramp(t, burn, burn + 0.6)) : 0} />
            {t > burn - 0.15 && t < burn + 0.7 ? <Puffs position={[-3.2, 1.3, z]} color="#e8e8e8" count={9} rise={1.4} spread={0.35} size={0.16} speed={1.2} opacity={0.8} /> : null}
            <Mum position={[-4.6, 0, -2.2]} rotationY={0.5} mood="scared" lookAt={[-3.2, 1, 0]} />
            <Dad position={[-1.9, 0, -2.4]} rotationY={-0.5} mood="scared" rattle={t > burn ? 0.8 : 0} lookAt={[-3.2, 1, 0]} />
            <Folk kind="zombie" n={0} position={[-5.7, 0, -3.3]} rotationY={0.5} mood="scared" lookAt={[-3.2, 1, 0]} />
            <Folk kind="skeleton" n={1} position={[-0.8, 0, -3.5]} rotationY={-0.5} mood="scared" lookAt={[-3.2, 1, 0]} />
            <Folk kind="creeper" n={2} position={[-3.9, 0, -3.4]} mood="scared" lookAt={[-3.2, 1, 0]} />
            <Folk kind="enderman" n={1} position={[-2.7, 0, -4.1]} lookAt={[-3.2, 1, 0]} />
          </>
        );
      },
    },
    {
      cue: "3.me",
      ...cam.push({ on: [-2, 0.9, 2.6], dist: 3.2, to: 6.0, yaw: 8, pitch: 12, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "He is out in the square in full sun, bouncing a ball. The camera pulls away and he gets small: there is nobody else out here.",
      stage: (t) => {
        const play = wordAt("3.me", "played");
        const ballY = 0.18 + Math.abs(Math.sin(t * 5.2)) * (t < play ? 0.5 : 0.9 * Math.exp(-(t - play) * 0.9));
        const roll = t > play ? (t - play) * 0.7 : 0;
        return (
          <>
            <Hero position={[-2, 0, 2.6]} rotationY={0.3} animation={t < play ? "press" : "idle"} face={t < play ? "smile" : "frown"} headYaw={t > play ? 0.5 * ease(ramp(t, play, play + 0.6)) : 0} />
            <Block position={[-1.5 + roll, ballY, 2.9]} size={[0.3, 0.3, 0.3]} color="#e2463a" rotation={[t * 3, 0, t * 2]} />
            <Mum position={[-2.6, 0, -1.6]} mood="sad" lookAt={[-2, 1, 2.6]} />
            <Dad position={[-1.4, 0, -1.9]} mood="sad" lookAt={[-2, 1, 2.6]} />
          </>
        );
      },
    },
    {
      cue: "4.mo",
      ...cam.push({ on: manFace(MO_DOOR), dist: 7.5, to: 3.2, yaw: -38, pitch: 2, fov: 40 }),
      ease: "outExpo",
      zone: ZONE.day,
      look: DAY,
      note: "A rush down the street to the last house, and the figure standing in its doorway.",
      stage: (t) => <Mo position={MO_DOOR} rotationY={-0.5} animation="idle" face="neutral" headYaw={-0.2 + jolt(t, 0.5, 0.2)} gaze={0} />,
    },
    {
      cue: "4.hat",
      ...cam.push({ on: [22.2, 1.95, -4.3], onTo: [22.2, 1.42, -4.3], dist: 1.9, to: 1.6, yaw: -24, pitch: 3, fov: 36 }),
      zone: ZONE.day,
      look: DAY,
      note: "Down him from the top: the straw hat on 'hat', then the red scarf, which he tugs up over his nose on 'scarf'.",
      stage: (t) => {
        const up = ease(ramp(t, wordAt("4.hat", "scarf") - 0.2, wordAt("4.hat", "scarf") + 0.15));
        return <Mo position={MO_DOOR} rotationY={-0.5} animation="idle" arms={up > 0 && up < 1 ? "reachUp" : undefined} scarf={0.45 + 0.55 * up} face="neutral" headPitch={-0.1 * up} gaze={0} />;
      },
    },
    {
      cue: "4.stare",
      ...cam.push({ on: [22.2, 1.5, -4.2], dist: 3.9, to: 2.5, yaw: -6, pitch: 0, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "The boy walks past the bottom of the frame. Mo's head turns with him the whole way, and the camera keeps going in on those eyes.",
      stage: (t, { p }) => {
        const x = 20.3 + 3.9 * p;
        return (
          <>
            <Mo position={MO_DOOR} animation="idle" face="neutral" lookAt={[x, 1.2, -2.2]} saccade={false} gaze={0} />
            <Hero position={[x, 0, -2.9]} rotationY={Math.PI / 2} animation="walk" animDistance={3.9 * p} face="uneasy" headYaw={0.9} />
          </>
        );
      },
    },
    {
      cue: "4.think",
      ...cam.push({ on: faceOf([20.2, 0, -1.8]), onTo: faceOf([19.2, 0, -0.9]), dist: 2.6, to: 2.2, yaw: -40, pitch: 2, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "He hurries away, looking back over his shoulder. Behind him, small and out of focus, Mo is still watching.",
      stage: (t, { p }) => (
        <>
          <Hero position={[20.2 - p, 0, -1.8 + 0.9 * p]} rotationY={-0.84} animation="walk" animDistance={1.6 * p} face="uneasy" headYaw={-1.2 + 0.4 * Math.sin(t * 3)} />
          <Mo position={MO_DOOR} animation="idle" face="neutral" lookAt={[20, 1.2, -1.5]} saccade={false} gaze={0} />
        </>
      ),
    },
  ],
});

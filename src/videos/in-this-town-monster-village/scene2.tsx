import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Bubble, DAY, Dad, DustRing, Hero, Hiss, Mo, Mum, NIGHT, NORTH, PLACE, Puffs, Stew, ZONE, ease, faceOf, hop, jolt, manFace, pop, ramp, timing, tossed, wordAt } from "./kit";

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
          </>
        );
      },
    },
    {
      cue: "3.me",
      ...cam.push({ on: [0, 0.9, 3.2], dist: 3.2, to: 6.2, yaw: 10, pitch: 12, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "He is out in the square in full sun, bouncing a ball. The camera pulls away and he gets small: there is nobody else out here.",
      stage: (t) => {
        const play = wordAt("3.me", "played");
        const ballY = 0.18 + Math.abs(Math.sin(t * 5.2)) * (t < play ? 0.5 : 0.9 * Math.exp(-(t - play) * 0.9));
        const roll = t > play ? (t - play) * 0.7 : 0;
        return (
          <>
            <Hero position={[0, 0, 3.2]} rotationY={0.3} animation={t < play ? "press" : "idle"} face={t < play ? "smile" : "frown"} headYaw={t > play ? 0.5 * ease(ramp(t, play, play + 0.6)) : 0} />
            <Block position={[0.5 + roll, ballY, 3.5]} size={[0.3, 0.3, 0.3]} color="#e2463a" rotation={[t * 3, 0, t * 2]} />
            <Mum position={[-4.2, 0, -1.6]} mood="sad" lookAt={[0, 1, 3.2]} />
            <Dad position={[-2.9, 0, -1.9]} mood="sad" lookAt={[0, 1, 3.2]} />
          </>
        );
      },
    },
    {
      cue: "3.stew",
      ...cam.push({ on: [-3.6, 1.0, -1.9], dist: 3.9, to: 3.3, yaw: 14, pitch: 8, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "Dinner under the hall. Mum and Dad have their faces in their bowls. He holds his at arm's length, green steam coming off it, head turned right away.",
      stage: (t) => {
        const chew = Math.abs(Math.sin(t * 7));
        const away = ease(ramp(t, wordAt("3.stew", "could") - 0.1, wordAt("3.stew", "smell")));
        return (
          <>
            <Block position={[-3.6, 0.4, -2.3]} size={[2.6, 0.12, 0.9]} color="#6b4a2a" />
            {[-1.1, 1.1].map((x) => (
              <Block key={x} position={[-3.6 + x, 0.2, -2.3]} size={[0.14, 0.4, 0.7]} color="#5a3d22" />
            ))}
            <Stew position={[-4.4, 0.46, -2.2]} />
            <Stew position={[-2.8, 0.46, -2.2]} />
            <Mum position={[-4.4, -0.5, -2.9]} lean={0.35 + 0.15 * chew} nod={0.4} mood="happy" />
            <Dad position={[-2.8, -0.5, -2.9]} lean={0.35 + 0.15 * (1 - chew)} nod={0.4} mood="happy" rattle={0.3} />
            <Hero position={[-3.6, 0, -1.2]} rotationY={0.1} animation="reach" face={away > 0.3 ? "ouch" : "uneasy"} headYaw={-1.0 * away} headPitch={-0.2 * away}>
              <Stew position={[0, 0.02, 0.12]} scale={1.2} />
            </Hero>
            <Puffs position={[-3.25, 1.05, -0.6]} color="#9bc46a" count={7} rise={1.0} spread={0.2} size={0.1} speed={0.9} opacity={0.8} />
          </>
        );
      },
    },
    {
      cue: "3.dark",
      ...cam.push({ on: [8.7, 1.0, -4.2], dist: 4.6, to: 4.0, yaw: 38, pitch: 8, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Night. Mum and Dad walk straight in through the door. He follows, arms out in front of him, and on 'doors' walks flat into the wall beside it and bounces off.",
      impacts: [{ at: 1.55, amp: 0.08, dur: 0.35 }],
      stage: (t) => {
        const hit = wordAt("3.dark", "doors") - 0.1;
        const go = ramp(t, 0.2, hit);
        const back = t > hit ? Math.min(0.5, (t - hit) * 1.6) : 0;
        const z = -2.3 - 2.25 * go + back;
        return (
          <>
            <Mum position={[8.7, 0, -3.6 - 1.6 * ease(ramp(t, 0, 0.8))]} rotationY={NORTH} walk={t * 1.6} scale={t > 0.8 ? 0 : 1} />
            <Hero position={[9.9, 0, z]} rotationY={NORTH} animation={t < hit ? "walk" : "stagger"} arms={t < hit ? "reach" : undefined} animDistance={2.25 * go + back} face={t < hit ? "uneasy" : "dizzy"} />
            <Bits position={[9.9, 1.2, -4.75]} t={t - hit} color="#ffe27a" count={8} power={2.2} toward={[0, 0.6, 1]} />
            <DustRing position={[9.9, 0.05, -4.6]} t={t - hit} size={0.9} />
          </>
        );
      },
    },
    {
      cue: "3.one",
      ...cam.push({ on: faceOf([9.9, 0, -4.0]), dist: 2.2, to: 1.6, yaw: 20, pitch: 2, fov: 36 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "His face, rubbing his nose, alone in the dark outside his own door.",
      stage: (t) => <Hero position={[9.9, 0, -4.0]} rotationY={0.4} animation="idle" arms="reachUp" face="frown" headPitch={0.15 + jolt(t, 0.2, 0.3)} />,
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
      cue: "4.alone",
      ...cam.push({ on: [21.6, 1.3, -4.0], dist: 4.5, to: 9.5, yaw: -62, pitch: 7, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "Back down the street, fast: his house is the last one and there is nobody near it. The boy waves from far off. On 'word' a bubble with three dots pops over Mo and that is all.",
      stage: (t) => {
        const word = wordAt("4.alone", "never");
        return (
          <>
            <Mo position={MO_DOOR} rotationY={-1.1} animation="idle" face="neutral" gaze={0} />
            <Hero position={[16.8, hop(t, 0.9, 0.2, 0.3), -0.6]} rotationY={1.3} animation="wave" face="smile" />
            <Bubble text="..." position={[21.9, 2.75, -4.2]} rotationY={-1.08} scale={0.8 * pop(t, word)} tail={1} />
          </>
        );
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

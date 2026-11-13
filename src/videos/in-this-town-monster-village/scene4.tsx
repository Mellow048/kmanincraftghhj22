import { Block, Glow, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT_WINDOW, Basket, Fill, Bits, Bus, DUSK, Dad, DustRing, Gran, Hero, Hiss, Mo, Mum, NIGHT, NORTH, OpenWindow, Postman, Puffs, Raider, Ring, SPY, UNDER_WINDOW, ZONE,
  ease, faceOf, hop, jolt, manFace, monsterFace, pop, ramp, ringAt, timing, wordAt,
} from "./kit";

const DOOR: Vec3 = [8.7, 0, -4.7];
const HILL: Vec3 = [-28, 4.2, 2];

/** THE RULE. They lock him in at sunset. He gets out, and finds out what they do all night. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The door, and the ring",
  shots: [
    {
      cue: "7.sunset",
      ...cam.truck({ on: [3.2, 1.2, 1.6], dist: 4.6, yaw: 78, pitch: 6, fov: 42, by: [3.6, 0, 0] }),
      ease: "linear",
      zone: ZONE.day,
      look: DUSK,
      note: "Sunset. He walks at us down the street, cross, and the whole village is in a line behind him: mum, dad, Hiss, the postman, and the bus bouncing at the back.",
      stage: (t, { p }) => {
        const x = 2.4 + 3.6 * p;
        const d = 3.6 * p;
        return (
          <>
            <Glow position={[-40, 5, 2]} size={16} color="#ff9a4a" opacity={0.5} />
            <Hero position={[x, 0, 1.6]} rotationY={Math.PI / 2} animation="walk" animDistance={d} face="frown" arms="hug" />
            <Mum position={[x - 1.3, 0, 1.1]} rotationY={Math.PI / 2} walk={d} mood="calm" />
            <Dad position={[x - 2.3, 0, 2.1]} rotationY={Math.PI / 2} walk={d} />
            <Hiss position={[x - 3.4, 0, 1.3]} rotationY={Math.PI / 2} walk={d} />
            <Postman position={[x - 4.6, 0, 1.9]} rotationY={Math.PI / 2} walk={d} />
            <Bus position={[x - 6.6, Math.abs(Math.sin(t * 5)) * 0.5, 1.6]} rotationY={Math.PI / 2} squash={Math.sin(t * 10) * 0.15} />
          </>
        );
      },
    },
    {
      cue: "7.lock",
      ...cam.push({ on: [8.7, 1.25, -4.8], dist: 4.4, to: 2.6, yaw: 14, pitch: 6, fov: 40 }),
      zone: ZONE.day,
      look: DUSK,
      note: "Mum nudges him in through his door. On 'locked' a wooden bar drops across it from outside and bounces in its brackets. The camera goes in on the bar.",
      impacts: [{ at: 0.75, amp: 0.07, dur: 0.3 }],
      stage: (t) => {
        const lock = wordAt("7.lock", "locked");
        const inn = ease(ramp(t, 0, lock - 0.15));
        const drop = ramp(t, lock - 0.15, lock + 0.05);
        const barY = 1.25 + 1.5 * (1 - drop * drop) + (drop >= 1 ? Math.abs(Math.sin((t - lock) * 16)) * 0.12 * Math.exp(-(t - lock) * 7) : 0);
        return (
          <>
            <Hero position={[8.7, 0, -4.0 - 1.0 * inn]} rotationY={NORTH} animation="walk" animDistance={inn} face="frown" scale={inn > 0.92 ? 0 : 0.8} />
            <Mum position={[9.5, 0, -3.5]} rotationY={NORTH - 0.5} arms={1 - drop} mood="calm" />
            <Dad position={[7.7, 0, -3.4]} rotationY={NORTH + 0.5} wave={drop} />
            <Block position={[8.7, 1.2, -4.93]} size={[1.1, 2.3, 0.1]} color="#5a3d22" />
            {[-0.72, 0.72].map((x) => (
              <Block key={x} position={[8.7 + x, 1.2, -4.86]} size={[0.14, 0.3, 0.2]} color="#3c3c44" />
            ))}
            <Block position={[8.7, barY, -4.84]} size={[1.7, 0.18, 0.14]} color="#8a6238" />
            <DustRing position={[8.7, 0.05, -4.6]} t={t - lock - 0.05} size={1.0} />
          </>
        );
      },
    },
    {
      cue: "7.weak",
      ...cam.push({ on: [11.5, 2.15, -4.8], dist: 3.0, to: 2.1, yaw: -12, pitch: -8, fov: 38 }),
      zone: ZONE.day,
      look: DUSK,
      note: "He appears at his window, chin on the sill, and slumps. He thinks it is about him.",
      stage: (t) => (
        <>
          <OpenWindow k={ease(ramp(t, 0, 0.3))} />
          <Hero position={[AT_WINDOW[0], AT_WINDOW[1] - 0.5 * (1 - ease(ramp(t, 0.1, 0.45))) - 0.08 * ease(ramp(t, 0.9, 1.3)), AT_WINDOW[2]]} animation="idle" face="frown" headPitch={0.25 * ease(ramp(t, 0.9, 1.3))} headRoll={0.15 * ease(ramp(t, 0.9, 1.3))} />
        </>
      ),
    },
    {
      cue: "7.mo",
      ...cam.push({ on: manFace([10.4, 0, -1.0]), dist: 4.2, to: 2.6, yaw: 163, pitch: 4, fov: 40 }),
      zone: ZONE.day,
      look: DUSK,
      note: "What he sees from the window: mum and dad walk away to either side, and Mo is left standing in the street, looking straight up at him, not moving.",
      stage: (t, { p }) => (
        <>
          <Mo position={[10.4, 0, -1.0]} rotationY={NORTH} animation="idle" face="neutral" lookAt={[11.5, 2.2, -4.9]} saccade={false} gaze={0} />
          <Mum position={[10.0 - 2.6 * p, 0, -2.6]} rotationY={-Math.PI / 2} walk={2.6 * p} />
          <Dad position={[11.2 + 2.6 * p, 0, -2.2]} rotationY={Math.PI / 2} walk={2.6 * p} />
        </>
      ),
    },
    {
      cue: "8.night",
      ...cam.push({ on: [11.5, 2.15, -4.8], dist: 2.6, to: 2.0, yaw: 10, pitch: -6, fov: 38 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Night. The shutters are closed. On 'enough' they bang open and he is there, jaw set.",
      impacts: [{ at: 1.2, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const bang = wordAt("8.night", "enough") - 0.1;
        const k = t < bang ? 0 : 1 + jolt(t, bang, 0.3);
        return (
          <>
            <OpenWindow k={k} />
            <Hero position={[AT_WINDOW[0], AT_WINDOW[1] + (t < bang ? -0.6 : 0), AT_WINDOW[2] - (t < bang ? 0.3 : 0)]} animation="idle" arms={t >= bang && t < bang + 0.3 ? "push" : undefined} face="brave" />
            <Bits position={[11.5, 2.15, -4.7]} t={t - bang} color="#8a6238" count={7} power={2} toward={[0, 0.2, 1]} />
          </>
        );
      },
    },
    {
      cue: "8.window",
      ...cam.push({ on: [11.5, 1.3, -4.3], dist: 4.6, to: 4.2, yaw: 48, pitch: 6, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "He swings out over the sill, drops, and lands in a crouch in the dust under it.",
      impacts: [{ at: 0.7, amp: 0.06, dur: 0.25 }],
      stage: (t) => {
        const k = ramp(t, 0.1, 0.7);
        const y = AT_WINDOW[1] * (1 - k * k) + 0.5 * 4 * k * (1 - k) * (k < 0.5 ? 1 : 0.3);
        const z = AT_WINDOW[2] + (UNDER_WINDOW[2] - AT_WINDOW[2]) * ease(k);
        return (
          <>
            <OpenWindow />
            <Hero position={[11.5, y, z]} animation={k < 1 ? "jump" : "crouch"} face={k < 1 ? "brave" : "uneasy"} />
            <DustRing position={[11.5, 0.05, UNDER_WINDOW[2]]} t={t - 0.7} size={1.1} />
          </>
        );
      },
    },
    {
      cue: "8.see",
      ...cam.push({ on: faceOf([11.2, 0, -3.6]), onTo: faceOf(SPY), dist: 3.0, to: 2.6, yaw: -20, pitch: 3, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "He creeps along under his own wall, low, looking for whatever they get up to without him.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <OpenWindow />
            <Hero position={[UNDER_WINDOW[0] + (SPY[0] - UNDER_WINDOW[0]) * k, 0, UNDER_WINDOW[2] + (SPY[2] - UNDER_WINDOW[2]) * k]} rotationY={-0.9} animation="creep" animDistance={1.6 * k} face="uneasy" headYaw={Math.sin(t * 5) * 0.6} />
          </>
        );
      },
    },
    {
      cue: "8.nothing",
      ...cam.push({ on: faceOf(SPY), dist: 3.0, to: 1.6, yaw: -14, pitch: 2, fov: 38 }),
      ease: "outExpo",
      zone: ZONE.night,
      look: NIGHT,
      note: "He stops dead. His face: he has seen something, and it is not what he expected.",
      stage: (t) => (
        <>
          <Hero position={[SPY[0], hop(t, 0.05, 0.1, 0.2), SPY[2]]} rotationY={-0.2} animation="idle" face="wow" headPitch={jolt(t, 0.05, 0.2)} />
          <Fill on={faceOf(SPY)} yaw={-14} />
        </>
      ),
    },
    {
      cue: "9.ring",
      ...cam.pan({ from: [10, 2.6, 6.6], on: [5.6, 1.3, -3.6], onTo: [14.6, 1.3, -3.6], fov: 44 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "A slow sweep along them: the bus, Hiss, dad, mum, Mo, the postman, gran. Every one of them stands still in a curve round his house, like a fence.",
      stage: () => (
        <>
          <OpenWindow />
          <Ring />
          <Hero position={SPY} animation="idle" face="wow" />
        </>
      ),
    },
    {
      cue: "9.out",
      ...cam.push({ on: [10.2, 1.3, -0.9], dist: 4.2, to: 3.8, yaw: 178, pitch: 20, fov: 46 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "From behind him: his head, and past it their backs. They are all looking out at the dark, away from the house.",
      stage: (t) => (
        <>
          <Ring />
          <Hero position={SPY} rotationY={0} animation="idle" face="wow" headYaw={Math.sin(t * 4) * 0.5} />
        </>
      ),
    },
    {
      cue: "9.every",
      ...cam.push({ on: [10.3, 0.6, -2.8], dist: 6.4, to: 4.2, yaw: 4, pitch: 30, fov: 44 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "From over their heads, looking in at where he stands. On 'basket' he is gone and the basket is there where he stood, a baby in it: this is the first night, and they were already standing guard.",
      stage: (t) => {
        const b = wordAt("9.every", "basket") - 0.25;
        return (
          <>
            <Ring mo={false} />
            {t < b ? <Hero position={SPY} animation="idle" face="wow" /> : <Basket position={SPY} rotationY={0.3} baby scale={1.2 * pop(t, b)} />}
            {t > b && t < b + 0.6 ? <Puffs position={[SPY[0], 0.5, SPY[2]]} color="#ffffff" count={8} rise={1.0} spread={0.5} size={0.16} speed={1.6} opacity={0.7} /> : null}
          </>
        );
      },
    },
    {
      cue: "9.hill",
      ...cam.push({ on: [-28.6, 4.3, 2], dist: 16, to: 7.5, yaw: 88, pitch: -4, fov: 42 }),
      ease: "outExpo",
      zone: ZONE.night,
      look: NIGHT,
      note: "A rush down the dark street to the hill in the west. On 'torches' six lights come up over the top of it, one after another.",
      stage: (t) => {
        const at = wordAt("9.hill", "torches") - 0.2;
        return (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <group key={i} position={[-28.4 - (i % 2) * 1.1, 3, 0.4 + i * 0.62]} scale={pop(t, at + i * 0.09)}>
                <Raider who={i} position={[0, 0, 0]} rotationY={Math.PI / 2} animation="idle" arms="reachUp" torch face="angry" />
                <Glow position={[0.3, 2.2, 0]} size={2.2} color="#ffa040" opacity={0.6} />
              </group>
            ))}
          </>
        );
      },
    },
  ],
});

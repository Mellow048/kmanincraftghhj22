import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, BIG, BIG_SCALE, Bits, Bubble, Bus, Dad, DustRing, Fallen, Fill, Hero, Hiss, MUM_DOWN, Mum, NIGHT, Raider, SPY, STAND, Streaks, ZONE,
  dur, ease, faceOf, handOf, hop, jolt, manFace, pop, ramp, timing, wordAt,
} from "./kit";

const E = Math.PI / 2;
const W = -Math.PI / 2;

/** Mum on the ground, the way she lies for the rest of the film. */
export const MumDown: React.FC<{ k?: number; reach?: number }> = ({ k = 1, reach = 0 }) => (
  <Fallen position={MUM_DOWN} rotationY={W} k={k}>
    <Mum mood="scared" arms={reach} />
  </Fallen>
);

/** The run. One straight line, east to west, at one speed, so the camera can stay with him. */
const RUN_FROM = 12.0;
const RUN_LEN = 12.5;

/** HE RUNS. The thought, then one unbroken dash through the fight, and he puts himself in the way. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "In the way",
  shots: [
    {
      cue: "12.mum",
      ...cam.push({ on: [-3.3, 0.95, 2.4], dist: 5.4, to: 4.6, yaw: 8, pitch: 8, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "A player puts both hands on mum and shoves. On 'knocked' she goes over backwards, flat, and bounces once in the dirt.",
      impacts: [{ at: 0.95, amp: 0.1, dur: 0.4 }],
      stage: (t) => {
        const at = wordAt("12.mum", "knocked");
        const fall = ramp(t, at, at + 0.3);
        const k = fall * fall + (fall >= 1 ? -Math.abs(Math.sin((t - at - 0.3) * 13)) * 0.12 * Math.exp(-(t - at - 0.3) * 6) : 0);
        const shove = ease(ramp(t, at - 0.3, at));
        return (
          <>
            <MumDown k={k} reach={fall} />
            <Raider who={2} position={[-5.0 + 0.7 * shove, 0, 2.4]} rotationY={E} animation={t < at + 0.2 ? "push" : "idle"} animDistance={0.7 * shove} sword={false} face="angry" />
            <Raider who={0} position={[-6.6, 0, 3.2]} rotationY={E} animation="idle" face="angry" />
            <DustRing position={[-2.3, 0.05, 2.4]} t={t - at - 0.3} size={1.8} />
          </>
        );
      },
    },
    {
      cue: "12.think",
      ...cam.push({ on: faceOf(SPY), dist: 2.8, to: 1.7, yaw: -22, pitch: 2, fov: 38 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "His face, seeing it. A player runs right past him without a glance, as if he were one of them. He looks down at his own hands.",
      stage: (t) => {
        const look = wordAt("12.think", "look");
        const pass = ramp(t, look - 0.9, look + 0.1);
        const down = ease(ramp(t, look, look + 0.3));
        return (
          <>
            <Fill on={faceOf(SPY)} yaw={-22} />
            <Hero position={SPY} rotationY={-0.5} animation="idle" arms={down > 0 ? "hold" : undefined} face={down > 0 ? "wow" : "fear"} headYaw={down > 0 ? 0 : -0.6 + 1.6 * pass} headPitch={0.45 * down} />
            <Raider who={4} position={[6.6 + 7.5 * pass, 0, -4.1]} rotationY={E} animation="run" arms="reachUp" animDistance={7.5 * pass} face="angry" />
          </>
        );
      },
    },
    {
      cue: "12.only",
      ...cam.push({ on: [SPY[0] - 0.3, 0.8, SPY[2]], onTo: [SPY[0] - 2.4, 0.8, SPY[2]], dist: 4.2, to: 4.4, yaw: 0, pitch: 6, fov: 42 }),
      ease: "inCubic",
      zone: ZONE.night,
      look: NIGHT,
      note: "He turns west, drops into a start, and on 'touch' he is gone out of the left of the frame, dust where his feet were.",
      stage: (t) => {
        const go = wordAt("12.only", "touch") - 0.25;
        const k = ramp(t, go, go + 0.75);
        const x = SPY[0] - 7 * k * k;
        const set = ease(ramp(t, 0.2, 0.7));
        return (
          <>
            <Hero position={[x, 0, SPY[2]]} rotationY={-0.5 + (W + 0.5) * set} animation={t < go ? "crouch" : "run"} blendTo="idle" blend={t < go ? set : 1} animDistance={7 * k * k} face="brave" />
            <DustRing position={[SPY[0], 0.05, SPY[2]]} t={t - go} size={1.4} />
            {t > go ? <Streaks position={[x + 0.8, 0.8, SPY[2]]} yaw={E} t={t - go} n={8} spread={0.9} speed={14} /> : null}
          </>
        );
      },
    },
    {
      cue: "13.ran",
      ...cam.truck({ on: [RUN_FROM - 0.3, 1.45, 2.0], dist: 6.6, yaw: -12, pitch: 6, fov: 46, by: [-RUN_LEN, 0, 0] }),
      ease: "linear",
      shake: 0.025,
      zone: ZONE.night,
      look: NIGHT,
      note: "One take, flat out, the camera running beside him. On 'sword' a blade goes over his head as he ducks. On 'bus' he goes up and over the slime. On 'legs' dad jumps and he slides under him.",
      stage: (t, { p }) => {
        const d = dur("13.ran");
        const xAt = (s: number) => RUN_FROM - (RUN_LEN * s) / d;
        const tS = wordAt("13.ran", "sword") + 0.1;
        const tB = wordAt("13.ran", "bus") + 0.1;
        const tL = wordAt("13.ran", "legs") + 0.1;
        const x = xAt(t);
        const duck = Math.max(0, 1 - Math.abs(t - tS) / 0.28);
        const slide = Math.max(0, 1 - Math.abs(t - tL) / 0.3);
        const jump = hop(t, tB - 0.36, 2.15, 0.72);
        const low = Math.max(duck, slide);
        const swing = ramp(t, tS - 0.22, tS + 0.12);
        const RS: Vec3 = [xAt(tS) - 0.25, 0, 0.95];
        const yaw = 1.5 - 2.6 * swing;
        return (
          <>
            <Hero position={[x, jump - 0.3 * slide, 2.0]} rotationY={W} animation={jump > 0.05 ? "jump" : "crouch"} blendTo="run" blend={jump > 0.05 ? 1 : low} animDistance={RUN_LEN * p} face={jump > 0.05 ? "wow" : "brave"} />
            <Streaks position={[x + 1.0, 0.9 + jump, 2.0]} yaw={E} t={t} n={9} spread={1.0} speed={16} />

            <Raider who={3} position={RS} rotationY={yaw} animation="point" sword={false} face="angry" />
            <AimSword position={handOf(RS, yaw, -1.7)} yaw={yaw} pitch={0.05} />

            <Bus position={[xAt(tB), 0, 2.0]} rotationY={E} squash={-0.2 * ease(ramp(t, tB - 0.3, tB)) + jolt(t, tB + 0.2, 0.4)} mood="scared" />

            <Dad position={[xAt(tL), hop(t, tL - 0.3, 0.9, 0.6), 2.0]} rotationY={0} rattle={hop(t, tL - 0.3, 1, 0.6)} mood="scared" nod={0.5} />
            <DustRing position={[xAt(tL) + 0.5, 0.05, 2.0]} t={t - tL + 0.25} size={1.2} />
          </>
        );
      },
    },
    {
      cue: "13.front",
      ...cam.push({ on: [-3.9, 1.0, 2.5], dist: 5.8, to: 5.0, yaw: 14, pitch: 7, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "He comes round mum at a run, skids to a stop between her and the swords in a cloud of dust, and throws his arms out.",
      impacts: [{ at: 0.75, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const stop = wordAt("13.front", "front");
        const k = ramp(t, 0, stop);
        const e = 1 - (1 - k) * (1 - k);
        const x = -0.6 + (STAND[0] + 0.6) * e;
        const z = 2.0 + 1.5 * Math.sin(e * Math.PI) + (STAND[2] - 2.0) * e;
        const arms = t > wordAt("13.front", "arms") - 0.35;
        return (
          <>
            <MumDown reach={0.5} />
            <Hero position={[x, 0, z]} rotationY={W} animation={k < 0.8 ? "run" : arms ? "guard" : "crouch"} animDistance={4 * e} face="brave" />
            <DustRing position={[STAND[0] + 0.3, 0.05, STAND[2]]} t={t - stop * 0.8} size={1.5} />
            <Bits position={[STAND[0] - 0.2, 0.1, STAND[2]]} t={t - stop * 0.8} color="#b8a890" count={8} power={2.2} toward={[-1, 0.4, 0]} />
            <Raider who={0} position={[BIG[0] - 0.5, 0, BIG[2]]} rotationY={E} animation="idle" face="angry" />
          </>
        );
      },
    },
    {
      cue: "13.stop",
      ...cam.push({ on: faceOf(STAND), dist: 2.6, to: 2.0, yaw: -52, pitch: 0, fov: 38 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "His face, shouting, arms wide. Mum is on the ground behind him, reaching for him. On 'family' he does not move back an inch.",
      impacts: [{ at: 0.1, amp: 0.05, dur: 0.3 }],
      stage: (t) => (
        <>
          <MumDown reach={1} />
          <Fill on={faceOf(STAND)} yaw={-52} />
          <Hero position={[STAND[0], hop(t, 0.05, 0.08, 0.2), STAND[2]]} rotationY={W} animation="guard" face="brave" headPitch={-0.12 + jolt(t, wordAt("13.stop", "family"), 0.15)} />
          <Bubble text="STOP!" position={[STAND[0] - 0.75, 1.95, STAND[2] + 0.5]} rotationY={-0.9} scale={0.7 * pop(t, 0.05) * (t < wordAt("13.stop", "i") + 0.4 ? 1 : 0)} tail={1} />
        </>
      ),
    },
    {
      cue: "14.quiet",
      ...cam.push({ on: [-4.9, 1.15, 2.4], dist: 5.8, to: 6.3, yaw: 28, pitch: 8, fov: 44 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Nothing moves. Then the big one in dark red walks up, one slow step at a time, until he is standing over him, twice his height.",
      stage: (t) => {
        const big = wordAt("14.quiet", "big");
        const k = ease(ramp(t, big - 0.3, big + 0.9));
        return (
          <>
            <MumDown reach={0.6} />
            <Hero position={STAND} rotationY={W} animation="guard" face="brave" headPitch={-0.35 * k} />
            <Raider who={0} position={[BIG[0] - 1.3 * (1 - k), 0, BIG[2]]} rotationY={E} animation="walk" blendTo="idle" blend={1 - Math.abs(Math.sin(k * Math.PI))} animDistance={1.3 * k} face="angry" headPitch={0.4 * k} />
            <Raider who={1} position={[-7.6, 0, 1.0]} rotationY={E + 0.3} animation="idle" face="angry" />
            <Raider who={2} position={[-7.4, 0, 3.9]} rotationY={E - 0.3} animation="idle" face="angry" />
          </>
        );
      },
    },
    {
      cue: "14.trick",
      ...cam.push({ on: manFace([BIG[0], 0.12 * 1.56, BIG[2]]), dist: 3.0, to: 2.3, yaw: 68, pitch: -20, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "From the boy's height, looking up at him. He does not believe it. On 'one of them' the point of the sword comes down at the lens.",
      stage: (t) => {
        const one = wordAt("14.trick", "one");
        return (
          <>
            <Raider who={0} position={BIG} rotationY={E} animation="idle" arms={t > one - 0.15 ? "point" : undefined} face="angry" headPitch={0.4} />
            <Fill on={manFace(BIG)} yaw={68} power={7} />
            <Bubble text="It is a trick." position={[BIG[0] + 0.1, 2.55, BIG[2]]} rotationY={1.2} scale={0.4 * pop(t, wordAt("14.trick", "it")) * (t < one ? 1 : 0)} dark tail={-1} />
            <Bubble text="One of THEM." position={[BIG[0] + 0.1, 2.55, BIG[2]]} rotationY={1.2} scale={0.4 * pop(t, one)} dark tail={-1} />
          </>
        );
      },
    },
    {
      cue: "14.sword",
      ...cam.push({ on: [BIG[0] + 0.2, 2.0, BIG[2] - 0.2], dist: 4.4, to: 3.6, yaw: 50, pitch: -20, fov: 44 }),
      ease: "outExpo",
      zone: ZONE.night,
      look: NIGHT,
      note: "The sword goes up over his head, all the way, and hangs there against the stars.",
      stage: (t) => {
        const k = ease(ramp(t, 0.05, 0.55));
        return (
          <>
            <Raider who={0} position={BIG} rotationY={E} animation="reachUp" blendTo="point" blend={k} face="angry" headPitch={0.4} />
            <Fill on={[BIG[0], 2.0, BIG[2]]} yaw={50} power={9} d={2.2} />
          </>
        );
      },
    },
    {
      cue: "14.eyes",
      ...cam.push({ on: faceOf(STAND), dist: 1.9, to: 1.4, yaw: -70, pitch: 0, fov: 36 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "His face. He does not run. He screws his eyes shut.",
      stage: (t) => (
        <>
          <Hero position={STAND} rotationY={W} animation="guard" face={t > 0.25 ? "calm" : "fear"} headPitch={0.2 * ease(ramp(t, 0.2, 0.45))} />
          <Fill on={faceOf(STAND)} yaw={-70} />
        </>
      ),
    },
  ],
});

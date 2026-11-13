import { Block, Glow, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, BIG, BIG_SCALE, Basket, Bread, Bubble, DAY, DustRing, Fill, Hero, Lantern, MO_CATCH, Mo, NIGHT, NORTH, Puffs, Raider, STAND, SubscribeSign, ZONE,
  ease, faceOf, hop, jolt, manFace, pop, ramp, timing, wordAt,
} from "./kit";
import { MumDown } from "./scene6";

const E = Math.PI / 2;
const W = -Math.PI / 2;
const F = faceOf(STAND);
const MO_DOOR: Vec3 = [22.2, 0, -4.3];

/** IT ALL FITS, and then the last turn: they did not come for the monsters. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "We are here for you",
  shots: [
    {
      cue: "17.list",
      ...cam.push({ on: [F[0], F[1] + 0.2, F[2]], dist: 3.4, to: 3.0, yaw: 0, pitch: 0, fov: 38 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "His face, and round it, one on each word, the four things he never added up: the bread, the lantern, the sneeze, the sun on a straw hat.",
      stage: (t) => {
        const at = [wordAt("17.list", "bread"), wordAt("17.list", "lantern"), wordAt("17.list", "sneeze"), wordAt("17.list", "sun")];
        const kick = at.reduce((a, s) => a + jolt(t, s, 0.12), 0);
        return (
          <>
            <Hero position={STAND} rotationY={0.1} animation="idle" face="wow" headYaw={kick * 2} headPitch={-0.1 + kick} />
            <Fill on={F} yaw={0} power={7} d={2} />
            <group position={[F[0] - 0.42, F[1] + 0.62, F[2] + 0.1]} scale={1.6 * pop(t, at[0])} rotation={[0.3, 0.3, 0.2]}>
              <Bread />
            </group>
            <group position={[F[0] + 0.42, F[1] + 0.82, F[2] + 0.1]} scale={0.9 * pop(t, at[1])}>
              <Lantern position={[0, 0, 0]} chain={0.08} light={3} reach={3} seed={2} />
            </group>
            <group position={[F[0] - 0.5, F[1] - 0.02, F[2] + 0.1]} scale={pop(t, at[2])}>
              {[[0, 0], [0.14, 0.08], [-0.13, 0.07], [0.04, 0.17], [0.2, -0.06], [-0.2, -0.05]].map(([x, y], i) => (
                <Block key={i} position={[x, y, 0]} size={[0.09, 0.09, 0.09]} color="#e8f2ff" castShadow={false} />
              ))}
            </group>
            <group position={[F[0] + 0.5, F[1] - 0.0, F[2] + 0.1]} scale={pop(t, at[3])} rotation={[0, 0, t * 0.8]}>
              <Block size={[0.26, 0.26, 0.06]} color="#000000" emissive="#ffd23a" emissiveIntensity={1} castShadow={false} />
              <Block size={[0.4, 0.07, 0.05]} color="#000000" emissive="#ffb21a" emissiveIntensity={1} castShadow={false} />
              <Block size={[0.07, 0.4, 0.05]} color="#000000" emissive="#ffb21a" emissiveIntensity={1} castShadow={false} />
            </group>
          </>
        );
      },
    },
    {
      cue: "17.why",
      ...cam.push({ on: manFace(MO_DOOR), dist: 3.4, to: 1.7, yaw: -6, pitch: 0, fov: 36 }),
      zone: ZONE.day,
      look: DAY,
      note: "The doorway again, in daylight, the same stare as before, and the boy walking away from it. This time the camera goes all the way in, and the hand at his side lifts in a small wave nobody saw.",
      stage: (t, { p }) => (
        <>
          <Mo position={MO_DOOR} animation="idle" arms={p > 0.45 ? "wave" : undefined} face="neutral" lookAt={[20.3 - 2 * p, 1.2, -2.2]} saccade={false} gaze={0} />
          <Hero position={[21.2 - 2.4 * p, 0, -2.6 + 0.6 * p]} rotationY={-1.3} animation="walk" animDistance={2.4 * p} face="uneasy" />
        </>
      ),
    },
    {
      cue: "17.basket",
      ...cam.push({ on: [8.7, 1.1, -0.9], onTo: [8.7, 0.8, -1.9], dist: 3.4, to: 2.6, yaw: 172, pitch: 8, fov: 44 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Years ago, at night. A man in a straw hat and a scarf comes up the path to the monsters' door with a basket in his arms, looks behind him, and sets it down.",
      stage: (t) => {
        const set = wordAt("17.basket", "basket") + 0.25;
        const k = ease(ramp(t, 0, set - 0.2));
        const down = ease(ramp(t, set - 0.2, set + 0.15));
        const z = 1.2 - 3.0 * k;
        return (
          <>
            <Mo position={[8.7, 0, z]} rotationY={NORTH} animation={down > 0 ? "leanOver" : "walk"} blendTo={down > 0 ? "idle" : undefined} blend={down > 0 ? down : undefined} arms={down > 0 ? undefined : "hold"} animDistance={3.0 * k} face="neutral" headYaw={k > 0.5 && k < 0.95 ? 1.4 : 0} gaze={0} />
            <Basket position={[8.7, 0.86 * (1 - down), z - 0.45 - 0.15 * down]} rotationY={0.1} baby />
            <DustRing position={[8.7, 0.05, z - 0.6]} t={t - set - 0.15} size={0.8} />
          </>
        );
      },
    },
    {
      cue: "18.player",
      ...cam.push({ on: manFace([BIG[0] - 0.4, 0.15, BIG[2]]), dist: 3.6, to: 2.2, yaw: 62, pitch: -8, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "The big man lets go of his own sword. On 'step' he takes one backwards. His face has changed: he has seen this man before.",
      impacts: [{ at: 1.0, amp: 0.04, dur: 0.3 }],
      stage: (t) => {
        const step = wordAt("18.player", "step") - 0.1;
        const k = ease(ramp(t, step, step + 0.4));
        const drop = ramp(t, 0.15, 0.6);
        return (
          <>
            <Fill on={manFace(BIG)} yaw={62} power={7} />
            <Raider who={0} position={[BIG[0] - 0.8 * k, 0, BIG[2]]} rotationY={E} animation={k > 0 && k < 1 ? "walk" : "idle"} animDistance={-0.8 * k} sword={false} face={t > 0.2 ? "fear" : "angry"} headPitch={0.2} />
            <AimSword position={[-5.4, Math.max(0.06, 1.74 - 1.7 * drop * drop) + (drop >= 1 ? Math.abs(Math.sin((t - 0.6) * 15)) * 0.12 * Math.exp(-(t - 0.6) * 6) : 0), 2.05]} yaw={E + drop * 1.2} pitch={0.32 * (1 - drop)} scale={BIG_SCALE} />
            <Mo position={MO_CATCH} rotationY={W} animation="idle" scarf={0} wiped={1} face="neutral" />
          </>
        );
      },
    },
    {
      cue: "18.you",
      ...cam.orbit({ on: [-4.7, 1.25, 2.2], dist: 3.4, yaw: 10, pitch: 6, yawTo: 58, pitchTo: 30, distTo: 7.0, fov: 44 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "He points. And as the camera lifts, every sword in the street swings away from the monsters and round to Mo. Mo puts his arm across the boy.",
      impacts: [{ at: 0.2, amp: 0.05, dur: 0.3 }],
      stage: (t) => {
        const here = wordAt("18.you", "we", 1) - 0.1;
        const turn = ease(ramp(t, here, here + 0.5));
        const close = ease(ramp(t, here + 0.2, here + 1.4));
        const C: Vec3 = [-4.5, 0, 2.1];
        return (
          <>
            <MumDown reach={0.3} />
            <Raider who={0} position={[BIG[0] - 0.8, 0, BIG[2]]} rotationY={E} animation="idle" arms={t > 0.1 ? "point" : undefined} sword={false} face="angry" />
            <Mo position={[MO_CATCH[0] + 0.1 * close, 0, MO_CATCH[2] + 0.3 * close]} rotationY={W + 0.3} animation={close > 0.2 ? "guard" : "idle"} scarf={0} wiped={1} face="angry" />
            <Hero position={[STAND[0] + 0.2, 0, STAND[2] + 0.1]} rotationY={W + 0.6} animation="idle" face="fear" headYaw={Math.sin(t * 3) * 0.7} />
            {[150, 205, 255, 20, 70].map((deg, i) => {
              const a = (deg * Math.PI) / 180;
              const r = 4.2 - 1.2 * close;
              const pos: Vec3 = [C[0] + r * Math.sin(a), 0, C[2] + r * Math.cos(a)];
              const inward = a + Math.PI;
              const away = inward + (i % 2 ? 2.4 : -2.4);
              return <Raider key={i} who={i + 1} position={pos} rotationY={away + (inward - away) * turn} animation={close > 0 && close < 1 ? "walk" : "idle"} arms={turn > 0.5 ? "point" : undefined} animDistance={1.2 * close} face="angry" />;
            })}
          </>
        );
      },
    },
    {
      cue: "18.sub",
      ...cam.push({ on: [-4.4, 1.05, 2.9], dist: 5.4, to: 4.8, yaw: 16, pitch: 5, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "The two humans of the monster village, side by side, and the sign.",
      stage: (t) => (
        <>
          <Fill on={[-4.4, 1.3, 2.9]} yaw={16} power={10} d={2.6} />
          <Hero position={[-4.98, hop(t, 0.2, 0.15, 0.3), 2.7]} rotationY={0.15} animation="wave" face="grin" />
          <Mo position={[-3.82, 0, 2.7]} rotationY={-0.15} animation="idle" scarf={0} wiped={1} face="smile" />
          <group position={[-4.4, 0, 3.4]} scale={pop(t, 0.1)}>
            <SubscribeSign position={[0, 0.95, 0]} rotationY={0} scale={0.42} />
            <Block position={[0, 0.45, -0.03]} size={[0.05, 0.9, 0.05]} color="#5c3f24" />
          </group>
        </>
      ),
    },
  ],
});

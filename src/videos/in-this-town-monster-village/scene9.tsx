import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, Bits, Bread, Bubble, Bus, Crowd, Dad, DustRing, Fill, Folk, Hero, Hiss, Mo, Mum, NIGHT, Postman, Raider, StrawHat, ZONE,
  dur, ease, hillY, hop, jolt, lerp3, manFace, monsterFace, pop, ramp, timing, wordAt,
} from "./kit";
import type { Kind } from "./kit";

const E = Math.PI / 2;
const W = -Math.PI / 2;
/** The middle of the square, where Mo ends up standing. */
export const MID: Vec3 = [-4.4, 0, 2.4];
const MUM_AT: Vec3 = [-3.42, 0, 2.4];

/** The half ring of villagers behind Mo, seen from the south. Nobody stands straight behind his head but the tall one. */
const AROUND: Array<[Kind, number, number, number?]> = [
  ["zombie", -6.05, 0.9],
  ["skeleton", -5.35, 0.25],
  ["enderman", -4.4, -0.5],
  ["creeper", -3.45, 0.25],
  ["zombie", -2.75, 0.9],
  ["skeleton", -6.6, -0.3],
  ["zombie", -2.2, -0.3],
  ["creeper", -5.9, -1.0, 0.8],
  ["zombie", -3.0, -1.1, 0.78],
];
const MO_FACE = manFace(MID);

/**
 * THE AMBUSH, and then the village and Mo. Every player is looking at Mo, so nobody is looking at the monsters:
 * they take the players from behind, the players run, and Mo is left standing in the middle of the people he lied to.
 */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Behind you",
  shots: [
    {
      cue: "19.look",
      ...cam.push({ on: [-4.4, 1.8, -0.6], dist: 4.5, to: 3.7, yaw: 0, pitch: -3, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "What Mo sees: two players, swords pointed at us. On 'not one', behind them in the dark of the hall, an enderman walks in over their heads, a skeleton leans in at one side, a zombie at the other, and a creeper comes up in the gap.",
      stage: (t) => {
        const a = wordAt("19.look", "not") - 0.1;
        const k1 = ease(ramp(t, a, a + 0.45));
        const k2 = ease(ramp(t, a + 0.3, a + 0.7));
        const k3 = ease(ramp(t, a + 0.55, a + 0.95));
        const up = wordAt("19.look", "behind");
        return (
          <>
            <Fill on={[-4.4, 1.6, -0.5]} yaw={0} power={10} d={2.6} />
            <pointLight position={[-4.4, 2.6, -1.0]} color="#b4c2ff" intensity={14} distance={6} decay={2} />
            <Raider who={2} position={[-5.1, 0, -0.5]} rotationY={0.15} animation="idle" arms="point" face="angry" />
            <Raider who={3} position={[-3.7, 0, -0.5]} rotationY={-0.15} animation="idle" arms="point" face="angry" />
            <Postman position={[-4.4 + 2.6 * (1 - k1), 0, -2.0]} rotationY={-0.6 * (1 - k1)} walk={2.6 * k1} nod={0.35} />
            <Dad position={[-2.95 + 1.6 * (1 - k2), 0, -1.35]} rotationY={-0.3} walk={1.6 * k2} mood="angry" lean={0.12 * k2} tilt={-0.25 * k2} />
            <Folk kind="zombie" n={0} position={[-5.85 - 1.6 * (1 - k3), 0, -1.35]} rotationY={0.3} walk={1.6 * k3} mood="angry" tilt={0.25 * k3} />
            <Hiss position={[-4.4, 0, -1.25]} scale={pop(t, up - 0.05)} mood="happy" />
          </>
        );
      },
    },
    {
      cue: "19.hiss",
      ...cam.push({ on: [-5.5, 1.3, 3.5], dist: 5.5, to: 4.9, yaw: 38, pitch: 5, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Hiss, and two players with swords up. He says one word in a bubble, and takes one happy hop at them. Both swords are in the air and both players are gone before he lands.",
      stage: (t) => {
        const hug = wordAt("19.hiss", "hug");
        const go = ease(ramp(t, hug + 0.1, hug + 0.7));
        const fuse = t > hug ? 0.35 + 0.25 * Math.sin((t - hug) * 26) : 0;
        return (
          <>
            <Fill on={[-5.5, 1.5, 3.5]} yaw={38} power={10} d={2.8} />
            <Hiss position={[-4.75 - 0.5 * ease(ramp(t, hug, hug + 0.3)), hop(t, hug, 0.35, 0.3), 3.5]} rotationY={W + 0.95} fuse={fuse} mood="happy" scale={1 + 0.06 * fuse} />
            <Bubble text="HUG?" position={[-4.9, 2.3, 3.7]} rotationY={0.66} scale={0.5 * pop(t, hug - 0.08)} tail={1} dark />
            {[0, 1].map((i) => {
              const z = 3.0 + i * 1.0;
              const x = -6.25 + i * 0.15;
              return (
                <group key={i}>
                  <Raider who={4 + i} position={[x - 4.5 * go, hop(t, hug + 0.05, 0.3, 0.25), z]} rotationY={go > 0.05 ? W : E} animation={go > 0.05 ? "run" : "idle"} arms={go > 0.05 ? undefined : "point"} animDistance={4.5 * go} sword={t < hug + 0.05} face={t > hug ? "fear" : "angry"} />
                  {t >= hug + 0.05 ? <AimSword position={[x + 0.4, Math.max(0.06, 1.3 + 2.4 * (t - hug) - 6 * (t - hug) ** 2), z + 0.2]} yaw={(t - hug) * 8 + i} pitch={Math.max(0, 1 - (t - hug) * 2)} /> : null}
                </group>
              );
            })}
          </>
        );
      },
    },
    {
      cue: "19.run",
      ...cam.push({ on: [-20.5, 1.7, 2], dist: 7.0, to: 8.0, yaw: 90, pitch: 7, fov: 44 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "From the street, looking west: six players running away from us up the steps of the hill, empty-handed. Their swords and one torch are lying on the path where they dropped them.",
      stage: (t, { p }) => (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = -19.6 - i * 0.75 - 6.5 * p;
            return <Raider key={i} who={i} position={[x, hillY(x) + hop(t, 0.1 + i * 0.17, 0.2, 0.25), 0.6 + ((i * 3) % 6) * 0.55]} rotationY={W} animation="run" animDistance={6.5 * p} sword={false} face="fear" />;
          })}
          <AimSword position={[-18.6, 0.07, 1.3]} yaw={0.5} pitch={0} />
          <AimSword position={[-19.3, 0.07, 2.9]} yaw={2.2} pitch={0} />
          <AimSword position={[-20.3, 0.07, 1.9]} yaw={-1.1} pitch={0} />
          <AimSword position={[-21.0, 0.07, 3.3]} yaw={1.4} pitch={0} />
          <Block position={[-19.0, 0.08, 2.1]} size={[0.5, 0.07, 0.07]} color="#6b4a2a" />
          <Block position={[-18.72, 0.1, 2.1]} size={[0.13, 0.11, 0.11]} color="#000000" emissive="#ffb030" emissiveIntensity={1} castShadow={false} />
          <pointLight position={[-18.7, 0.6, 2.1]} color="#ffa040" intensity={10} distance={6} decay={2} />
        </>
      ),
    },
    {
      cue: "20.gather",
      ...cam.truck({ on: [-3.5, 1.4, 2.2], dist: 6.6, yaw: 0, pitch: 7, fov: 44, by: [16, 0, 0] }),
      ease: "linear",
      zone: ZONE.night,
      look: NIGHT,
      note: "One fast move along the street, east. The first of the village is already out; then the camera passes three lots coming the other way, each as it is named: the zombies, the skeletons, and the kids from school, two small creepers among them. An enderman at the back of each lot.",
      stage: (t, { p }) => {
        const D = dur("20.gather");
        const at = (word: string) => -3.5 + (16 * (wordAt("20.gather", word) + 0.3)) / D;
        const zx = at("zombie");
        const sx = at("skeleton");
        const kx = at("kid");
        const step = 0.9 * p;
        return (
          <>
            <pointLight position={[-3.5 + 16 * p, 3.2, 6]} color="#cdd6ff" intensity={46} distance={13} decay={2} />
            {/* "The whole village came out": the first of them, already in the street. */}
            <Crowd who={[["skeleton", -0.9, 1.7], ["creeper", -0.1, 3.2], ["zombie", 0.6, 1.9], ["slime", 1.3, 3.5, 1], ["enderman", 0.2, 0.4], ["spider", 1.5, 0.9, 0.8]]} dx={-2.1 - step} face={W} walk={step} n0={3} />
            <Crowd who={[["zombie", -0.95, 1.4], ["zombie", -0.25, 3.1], ["zombie", 0.45, 1.8], ["zombie", 1.0, 3.4], ["enderman", 0.1, 0.3]]} dx={zx - step} face={W} walk={step} n0={0} />
            <Crowd who={[["skeleton", -0.8, 1.6], ["skeleton", 0.0, 3.2], ["skeleton", 0.8, 2.1], ["skeleton", -0.2, 0.5], ["spider", 0.9, 0.2, 0.8]]} dx={sx - step} face={W} walk={step} n0={1} />
            <Crowd
              who={[["zombie", -0.9, 1.5, 0.76], ["creeper", -0.2, 3.0, 0.78], ["zombie", 0.4, 1.9, 0.76], ["creeper", 1.0, 3.3, 0.78], ["slime", 0.3, 3.9, 1], ["enderman", 0.1, 0.4]]}
              dx={kx - step}
              face={W}
              walk={step}
              n0={2}
              hopAt={wordAt("20.gather", "kid")}
              t={t}
            />
          </>
        );
      },
    },
    {
      cue: "20.mo",
      ...cam.push({ on: [-4.4, 1.3, 2.4], dist: 5.8, to: 4.8, yaw: 0, pitch: 5, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Mo in the middle of them all, no hat, no scarf, a patch of his own skin on his cheek. He holds the straw hat in both hands in front of him and looks at it. Every monster behind him is looking at him.",
      stage: (t) => (
        <>
          <Fill on={MO_FACE} yaw={0} power={9} d={2.2} />
          <pointLight position={[-4.4, 3.4, 0.6]} color="#b4c2ff" intensity={22} distance={9} decay={2} />
          <Mo position={MID} animation="idle" arms="hold" hat={false} scarf={0} wiped={1} face="sad" headPitch={0.42 + 0.05 * Math.sin(t * 1.8)} saccade={false} gaze={0} />
          <StrawHat position={[MID[0], 1.0, MID[2] + 0.44]} width={0.92} tilt={0.55} />
          <Crowd who={AROUND} look={MO_FACE} />
          <Hero position={[-3.4, 0, 3.0]} rotationY={W + 0.5} animation="idle" face="uneasy" lookAt={MO_FACE} />
        </>
      ),
    },
    {
      cue: "20.mum",
      ...cam.push({ on: [-3.92, 1.45, 2.4], dist: 5.1, to: 4.4, yaw: 0, pitch: 3, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Side on. Mum walks up to him with her arms out, the way zombies do. She takes the hat out of his hands, lifts it, and on 'head' sets it back on him. He looks up.",
      impacts: [{ at: 2.47, amp: 0.03, dur: 0.25 }],
      stage: (t) => {
        const put = wordAt("20.mum", "put");
        const on = wordAt("20.mum", "head");
        const walk = ease(ramp(t, 0.1, put - 0.3));
        const take = ease(ramp(t, put - 0.3, put + 0.05));
        const lift = ease(ramp(t, put + 0.05, on));
        const held: Vec3 = [MID[0] + 0.44, 1.0, MID[2]];
        const hands: Vec3 = [MUM_AT[0] - 0.62, 1.38, MID[2]];
        const top: Vec3 = [MID[0], 1.8, MID[2]];
        const hat = lift > 0 ? lerp3(hands, top, lift) : lerp3(held, hands, take);
        const up = ease(ramp(t, on + 0.05, on + 0.4));
        return (
          <>
            <Fill on={[-3.9, 1.6, 2.4]} yaw={0} power={10} d={2.6} />
            <pointLight position={[-4.0, 3.4, 0.6]} color="#b4c2ff" intensity={22} distance={9} decay={2} />
            <Mo position={MID} rotationY={E} animation="idle" arms={take < 0.5 ? "hold" : undefined} hat={t >= on} scarf={0} wiped={1} face={up > 0.5 ? "wow" : "sad"} headPitch={0.42 * (1 - up) - 0.08 * up + jolt(t, on, 0.25)} saccade={false} gaze={0} />
            {t < on ? <StrawHat position={[hat[0], hat[1] + 0.3 * Math.sin(lift * Math.PI), hat[2]]} width={0.92} rotation={[0, 0, -0.55 * (1 - take)]} /> : null}
            <Mum position={[MUM_AT[0] + 1.7 * (1 - walk), 0, MUM_AT[2]]} rotationY={W} walk={1.7 * walk} mood="happy" arms={1} nod={-0.1 * lift} />
            <Crowd who={AROUND} look={MO_FACE} />
            <DustRing position={[MID[0], 1.8, MID[2]]} t={t - on} size={0.6} color="#e8d9a0" />
          </>
        );
      },
    },
    {
      cue: "20.knew",
      ...cam.push({ on: monsterFace("zombie", MUM_AT), dist: 3.0, to: 2.4, yaw: -40, pitch: 0, fov: 38 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Mum, close, smiling. On 'bread' a loaf pops up next to her head. Behind her the village nods: they all knew.",
      stage: (t) => {
        const bread = wordAt("20.knew", "bread");
        const F = monsterFace("zombie", MUM_AT);
        return (
          <>
            <Fill on={F} yaw={-40} power={9} d={2} />
            <Mum position={MUM_AT} rotationY={W + 0.25} mood="happy" arms={0.25} tilt={0.12 + jolt(t, wordAt("20.knew", "knew"), 0.4)} lean={0.08} lookAt={[-5.6, 1.6, 4.3]} />
            <group position={[F[0] - 0.42, F[1] + 0.4, F[2] + 0.3]} scale={1.3 * pop(t, bread - 0.05)} rotation={[0.3, -0.5, 0.2 + jolt(t, bread, 0.6)]}>
              <Bread />
            </group>
            <Crowd who={[["skeleton", -2.1, 1.5], ["zombie", -1.5, 0.5], ["creeper", -2.6, 0.4, 0.9], ["enderman", -0.9, 1.2]]} look={[-5.6, 1.4 + 0.5 * Math.sin(t * 7), 4.3]} mood="happy" n0={1} />
          </>
        );
      },
    },
  ],
});

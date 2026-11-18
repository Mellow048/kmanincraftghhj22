import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Bubble, Camp, Chestplate, Creeper, Dog, Glow, Life, Loaf, NORTH, Owner, PERCH, PLACE, Parrot, Pickaxe, Puffs, ROBE, SOUTH, SubscribeSign, Sword, Villager, hop, pop, sitPose, timing, tw, w } from "./kit";
import { NOW } from "./scene6";
import { BESIDE } from "./scene8";
import { GROUND_SIT } from "./kit";

/** 10 — It is still down there, and it has all his things. He says the word. */
const SAT: Vec3 = [BESIDE[0], GROUND_SIT * 1.25, BESIDE[2]];
const DEEP = PLACE.deep;
const deep = (x: number, y: number, z: number): Vec3 => [DEEP[0] + x, DEEP[1] + y, DEEP[2] + z];
const CALL: Vec3 = [0.55, 0, 3.2];

export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Come",
  shots: [
    {
      cue: "10.still",
      ...cam.push({ on: [0.7, 0.86, 0.35], dist: 3.0, to: 2.6, yaw: 16, pitch: 0, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "His owner, close, sitting, looking at the forest. He is not smiling now. At the edge of the frame the dog watches his face.",
      stage: (t) => (
        <>
          <Camp {...NOW} />
          <Dog onHead={<Loaf scale={0.8} />} headYaw={0.8} headPitch={-0.25} wag={0.2} />
          <Owner position={SAT} rotationY={SOUTH} pose={sitPose(t)} face="frown" headPitch={0.05} />
        </>
      ),
    },
    {
      cue: "10.things",
      ...cam.push({ on: deep(0, 1.5, -3), dist: 7.4, to: 6.0, yaw: 0, pitch: 6, fov: 46 }),
      zone: "deep",
      look: "overworld-night",
      note: "Under the ground, in the dark past the black square: a sword, a pickaxe and a chestplate lying in a heap. On 'all my things' two enormous purple eyes open in the dark above them.",
      stage: (t) => {
        const open = tw(t, w("10.things", "all") - 0.1, w("10.things", "all") + 0.2);
        return (
          <>
            <group position={deep(0, 0.62, -4.9)}>
              <Sword position={[-0.5, 0, 0]} rotation={[0, 0.9, 0]} scale={1.2} />
              <Pickaxe position={[0.2, 0.02, -0.1]} rotation={[0, -0.7, Math.PI / 2]} scale={1.1} />
              <group rotation={[-1.2, 0, 0.3]} position={[0.05, 0.1, 0.35]}>
                <Chestplate scale={1.2} />
              </group>
              <Glow position={[0, 0.3, 0.2]} size={1.6} color="#ffe9b0" opacity={0.25} />
            </group>
            {[-1, 1].map((s) => (
              <group key={s} position={deep(s * 1.25, 3.5, -6.4)} rotation={[0, 0, -s * 0.22]} scale={[1, Math.max(0.02, open), 1]}>
                <Block size={[1.5, 0.62, 0.05]} color="#1a0626" emissive="#c040ff" emissiveIntensity={2.4 * open} castShadow={false} />
                <Block position={[-s * 0.15, 0, 0.03]} size={[0.3, 0.62, 0.05]} color="#0a0210" castShadow={false} />
              </group>
            ))}
            {open > 0 ? <Glow position={deep(0, 3.5, -6.2)} size={6 * open} color="#c040ff" opacity={0.35 * open} /> : null}
            {open > 0 ? <pointLight position={deep(0, 3.2, -5)} color="#c040ff" intensity={18 * open} distance={12} decay={2} /> : null}
          </>
        );
      },
    },
    {
      cue: "10.look",
      ...cam.push({ on: [0.42, 0.76, 0.3], dist: 3.6, to: 3.2, yaw: 4, pitch: 2, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The two of them, straight on, both looking at the forest. Then his head turns to the dog. Then the dog's head turns to him. They look at each other, the way the dog and the creeper did.",
      stage: (t) => {
        const a = w("10.look", "Then") - 0.1;
        const own = tw(t, a, a + 0.2);
        const dog = tw(t, a + 0.35, a + 0.55);
        return (
          <>
            <Camp {...NOW} />
            <Dog onHead={<Loaf scale={0.8} />} headYaw={0.8 * dog} headPitch={-0.3 * dog} ears={1} blink={false} />
            <Owner position={SAT} rotationY={SOUTH} pose={sitPose(t)} face={own > 0.5 ? "smile" : "frown"} headYaw={-0.75 * own} headPitch={0.3 * own} />
            <Parrot position={PERCH} headYaw={-0.9} />
          </>
        );
      },
    },
    {
      cue: "10.word",
      ...cam.push({ on: [0.3, 0.95, 1.5], dist: 6.2, to: 5.4, yaw: -62, pitch: 6, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side. His owner gets up, walks three steps down the path toward the forest, and turns round. The dog stays exactly where he is, and every part of him is shaking: the tail, the legs, the loaf. Behind them the whole town has stopped to watch.",
      stage: (t) => {
        const up = tw(t, 0.0, 0.4);
        const k = tw(t, 0.4, 1.5);
        const turn = tw(t, 1.5, 1.85);
        const s = stride(BESIDE, CALL, k);
        return (
          <>
            <Camp {...NOW} />
            <Life t={t} n={6} look={[0.3, 1, 1.5]} />
            <Dog onHead={<Loaf scale={0.8} rotation={[0, 0, Math.sin(t * 30) * 0.12]} />} shiver={1} wag={1} mood="wide" lookAt={[s.position[0], 1.5, s.position[2]]} sit={0.95 + Math.sin(t * 16) * 0.04} blink={false} />
            <Parrot position={PERCH} headYaw={-0.4} bob={1} />
            <Owner
              position={[s.position[0], GROUND_SIT * 1.25 * (1 - up), s.position[2]]}
              rotationY={k > 0 ? s.rotationY + Math.PI * turn : SOUTH}
              animDistance={s.animDistance}
              animation={k > 0 && k < 1 ? "walk" : "idle"}
              pose={up < 0.6 ? sitPose(t) : undefined}
              face={turn > 0.5 ? "smile" : "calm"}
            />
          </>
        );
      },
    },
    {
      cue: "10.come",
      ...cam.pan({ from: [0.1, 0.8, 0.9], on: [CALL[0], 1.45, CALL[2]], onTo: [CALL[0], 1.5, CALL[2]], fov: 46, fovTo: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "From where the dog sits: his owner, on the path, the forest behind him, smiling at last, and one hand held out low. COME.",
      stage: (t) => {
        const say = w("10.come", "Come") - 0.08;
        return (
          <>
            <Owner position={CALL} rotationY={NORTH + 0.1} animation="reach" face="grin" headPitch={0.25} />
            <Bubble text="COME" position={[CALL[0] + 0.1, 2.16, CALL[2] - 0.2]} rotationY={NORTH + 0.25} scale={0.6 * pop(t, say, 0.14)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "10.come",
      cut: 0.8,
      ...cam.push({ on: [0, 0.72, 0.8], dist: 5.0, to: 4.4, yaw: -6, pitch: 4, fov: 42 }),
      impacts: [{ at: 0.08, amp: 0.35, dur: 0.25 }],
      zone: "town",
      look: "overworld-day",
      note: "The dog. He is up in one go, no tries at all, and coming straight at the lens with his tongue out, and the loaf is in the air behind him.",
      stage: (t) => {
        const k = tw(t, 0.05, 0.6);
        return (
          <>
            <Camp {...NOW} />
            <Dog position={[0.1 * k, hop(t % 0.3, 0, 0.14, 0.3) * (t > 0.08 ? 1 : 0), k * 1.9]} sit={1 - tw(t, 0.0, 0.1)} walk={k * 5} mouth={0.9} mood="wide" wag={1} tail={0.9} ears={1} />
            <Loaf position={[0, 1.05 + hop(t, 0.05, 1.1, 0.6), 0.3 - k * 0.6]} rotation={[t * 12, 0, t * 6]} scale={0.8} />
            <Parrot position={[PERCH[0], PERCH[1] + tw(t, 0.1, 0.5) * 0.8, PERCH[2] + tw(t, 0.1, 0.6) * 1.2]} flap={t > 0.1 ? 1 : 0} headYaw={-0.4} />
            {t > 0.05 ? <Puffs position={[0, 0.1, -0.2]} count={7} spread={0.7} size={0.26} rise={0.7} speed={2} color="#c9b08a" /> : null}
          </>
        );
      },
    },
    {
      cue: "10.sub",
      ...cam.push({ on: [0, 1.15, 7.5], dist: 6.6, to: 5.8, yaw: 0, pitch: 7, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The last picture, from down the path looking back at the town: the two of them running at us side by side, the dog bounding with his tongue out, the whole town waving behind them, the bare patch empty under the little roof, and the parrot flying over them with a red SUBSCRIBE sign in its feet.",
      stage: (t) => {
        const k = t / 1.77;
        const o = stride([0.6, 0, 4.2], [0.6, 0, 8.6], k);
        const dz = 4.0 + k * 4.9;
        return (
          <>
            <Camp {...NOW} />
            <Life t={t} n={6} look={[0, 1, 8]} />
            <Villager position={[-1.4, hop(t % 0.5, 0, 0.25, 0.4), 0.2]} rotationY={0.2} robe={ROBE.farmer} hat="straw" lookAt={[0, 1, 8]} />
            <Owner {...o} animation="run" face="grin" />
            <Dog position={[-0.5, hop(t % 0.32, 0, 0.2, 0.32), dz]} rotationY={SOUTH} sit={0} walk={k * 9} mouth={0.9} mood="happy" tail={0.9} wag={1} />
            <Parrot position={[0.1, 2.75 + Math.sin(t * 8) * 0.08, dz - 0.6]} flap={1} scale={1.5} />
            <SubscribeSign position={[0.1, 2.28 + Math.sin(t * 8) * 0.08, dz - 0.55]} scale={0.9 * pop(t, 0.25, 0.2)} tilt={Math.sin(t * 5) * 0.06} />
          </>
        );
      },
    },
  ],
});
void Creeper;
void Loaf;

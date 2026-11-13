import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, CHILD, EAST, Hero, IronGolem, NORTH, PLACE, ROBE, SOUTH, Villager, WEST, golemHand, pop, ramp, timing, wordAt } from "./kit";

const NOSE = wordAt("3.nose", "nose");
const HMM = wordAt("3.hmm", "hmm");

const FACE_OF: Vec3 = [-1.6, 0, 3.2];
const POST = PLACE.post;
const GIVE = -0.92;

/** A loaf on the stall. `position` is the bottom of it. */
const Loaf = ({ position }: { position: Vec3 }) => (
  <group position={position}>
    <mesh position={[0, 0.08, 0]} castShadow>
      <boxGeometry args={[0.44, 0.16, 0.2]} />
      <meshStandardMaterial color="#c98a3a" roughness={1} />
    </mesh>
    {[-0.12, 0, 0.12].map((x) => (
      <mesh key={x} position={[x, 0.165, 0]}>
        <boxGeometry args={[0.05, 0.02, 0.16]} />
        <meshStandardMaterial color="#e8c07a" roughness={1} />
      </mesh>
    ))}
  </group>
);

/** THE TOUR. How the town lives: noses, sleeves, one word, a golem with flowers. Only things a camera can see. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The tour",
  shots: [
    {
      cue: "3.nose",
      ...cam.orbit({ on: [-1.6, 1.5, 3.25], dist: 1.55, yaw: 98, yawTo: 22, pitch: 2, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "'One long nose' in profile, then swing round to the front for 'one long eyebrow'. The nose wags when it is named.",
      stage: (t) => (
        <>
          <Villager position={FACE_OF} rotationY={0.24} robe={ROBE.brown} hmm={ramp(t, NOSE - 0.1, NOSE + 0.1) * (1 - ramp(t, NOSE + 0.5, NOSE + 0.8))} phase={0.3} />
          <Villager {...stride([-6, 0, 0.6], [-3.5, 0, 0.2], t / 2.7)} walk={t * 0.95} robe={ROBE.white} phase={1.9} />
          <Villager position={[-4.6, 0, 6.4]} rotationY={0.9} robe={ROBE.red} phase={2.6} />
        </>
      ),
    },
    {
      cue: "3.arms",
      ...cam.truck({ on: [-4.2, 0.9, 3.5], dist: 2.75, yaw: 64, pitch: 4, by: [2.3, 0, 0], fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "The word is 'arms': travel with a villager at chest height. The folded sleeves stay in the middle of the frame, and they never unfold.",
      stage: (t) => (
        <>
          <Villager position={[-4.2 + t * 1.08, 0, 3.5]} rotationY={EAST} walk={t * 1.08} robe={ROBE.farmer} hat="straw" phase={2.7} />
          <Villager position={[0.6 - t * 1.0, 0, 2.2]} rotationY={WEST} walk={t * 1.0} robe={ROBE.blue} phase={3.4} />
          <Villager position={[-1.2 + t * 0.9, 0, 0.9]} rotationY={EAST} walk={t * 0.9} robe={ROBE.red} phase={0.9} />
        </>
      ),
    },
    {
      cue: "3.hands",
      ...cam.push({ on: [6.4, 1.22, -2.95], dist: 2.3, to: 1.85, yaw: 30, pitch: -4, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'I never saw one of them use a hand': the baker serves a loaf by pushing it across the stall with her nose.",
      stage: (t, { p }) => (
        <>
          <Villager position={[6.4, 0, -3.6 + p * 0.16]} rotationY={SOUTH} robe={ROBE.white} lean={0.5 + p * 0.12} hmm={0.25} phase={1.9} />
          <Loaf position={[6.4, 1.0, -2.86 + p * 0.34]} />
          <Loaf position={[5.6, 1.0, -2.6]} />
          <Loaf position={[7.25, 1.0, -2.7]} />
        </>
      ),
    },
    {
      cue: "3.hmm",
      ...cam.push({ on: [0, 1.5, 3], dist: 4.3, to: 3.8, yaw: 0, pitch: 2, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Two villagers nose to nose, saying nothing, both half turned to us so the one face is there twice. On 'hmm' the one word they have pops up between them, and the other one nods: understood.",
      stage: (t) => (
        <>
          <Villager position={[-0.42, 0, 3]} rotationY={EAST - 0.7} turn={0.2} robe={ROBE.brown} hmm={ramp(t, HMM - 0.05, HMM + 0.1)} phase={0.3} />
          <Villager position={[0.42, 0, 3]} rotationY={WEST + 0.7} turn={-0.2} robe={ROBE.blue} nod={ramp(t, HMM + 0.2, HMM + 0.35) * (0.16 + Math.sin((t - HMM) * 14) * 0.14)} phase={3.4} />
          <Bubble text="HMM" position={[-0.08, 2.36, 3]} scale={pop(t, HMM)} tail={-1} />
        </>
      ),
    },
    {
      cue: "3.golem",
      ...cam.push({ on: [POST[0], 1.75, POST[2]], dist: 5.7, to: 4.8, yaw: -14, pitch: -9, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'An iron golem guarded the square': from below, so it is as big as a house. Its head turns slowly. Two children stand under it and are not afraid.",
      stage: (t) => (
        <>
          <IronGolem position={POST} rotationY={SOUTH} headYaw={Math.sin(t * 1.3) * 0.5} />
          <Villager position={[2.3, 0, 2.2]} rotationY={NORTH - 0.2} scale={CHILD} kid robe={ROBE.friend} lookAt={[POST[0], 2.4, POST[2]]} phase={1.1} />
          <Villager position={[3.5, 0, 2.5]} rotationY={NORTH + 0.3} scale={CHILD} kid robe={ROBE.red} lookAt={[POST[0], 2.4, POST[2]]} phase={2.9} />
        </>
      ),
    },
    {
      cue: "3.flowers",
      ...cam.push({ on: [POST[0] + 0.5, 1.05, 1.85], dist: 6.0, to: 5.4, yaw: 70, pitch: 4, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Flowers to the children': the golem bows and holds a poppy down to two children. The giant on one side, the children on the other, the red flower between them.",
      stage: (t, { p }) => {
        const arm = -0.35 + (GIVE + 0.35) * ramp(p, 0, 0.45);
        return (
          <>
            <IronGolem position={POST} rotationY={SOUTH} bow={0.42 * ramp(p, 0, 0.45)} armR={arm} headPitch={0.35} flower />
            <Villager position={[3.1, 0, 2.65]} rotationY={2.42} scale={CHILD} kid robe={ROBE.friend} lookAt={golemHand(POST, SOUTH, GIVE)} phase={1.1} />
            <Villager position={[2.75, 0, 2.2]} rotationY={EAST} scale={CHILD} kid robe={ROBE.red} lookAt={golemHand(POST, SOUTH, GIVE)} phase={2.9} />
          </>
        );
      },
    },
    {
      cue: "3.wave",
      ...cam.push({ on: [1.34, 1.08, 4.2], dist: 2.6, to: 2.1, yaw: -6, pitch: 3, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'I was the only one who could wave': him, waist up, waving at us with a whole arm. The first hand in the film that does anything.",
      stage: () => (
        <>
          <Hero position={[1.2, 0, 4.2]} animation="wave" face="grin" gaze={0} />
          <IronGolem position={POST} rotationY={SOUTH} />
        </>
      ),
    },
    {
      cue: "3.back",
      ...cam.push({ on: [0.1, 1.42, 3.1], dist: 3.8, to: 3.3, yaw: 4, pitch: 9, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Nobody ever waved back': the reverse. Three villagers look straight at us, arms folded. One tilts its head. Nothing else moves.",
      stage: (t) => (
        <>
          <Villager position={[0.1, 0, 3.7]} robe={ROBE.brown} lookAt={[0.2, 1.7, 7]} tilt={ramp(t, 0.45, 0.75) * 0.2} phase={0.3} />
          <Villager position={[-0.46, 0, 2.75]} robe={ROBE.blue} lookAt={[0.2, 1.7, 7]} phase={3.4} />
          <Villager position={[0.68, 0, 2.75]} robe={ROBE.white} lookAt={[0.2, 1.7, 7]} phase={1.9} />
        </>
      ),
    },
  ],
});

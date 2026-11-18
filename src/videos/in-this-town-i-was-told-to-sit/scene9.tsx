import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Camp, Creeper, Dog, Fill, GROUND_SIT, Life, Loaf, NORTH, Owner, PERCH, PLACE, Parrot, ROBE, SOUTH, Skeleton, Sword, TORCH_R, Villager, Zombie, go, hop, pop, posed, sitPose, timing, tw, w } from "./kit";
import { NOW } from "./scene6";
import { BESIDE } from "./scene8";

/** 09 — The bed. The bones. The torches. The roof. He had not forgotten anything. And the farmer reads him the sign. */
const SAT: Vec3 = [BESIDE[0], GROUND_SIT * 1.25, BESIDE[2]];
const DEEP = PLACE.deep;
const deep = (x: number, y: number, z: number): Vec3 => [DEEP[0] + x, DEEP[1] + y, DEEP[2] + z];
/** The two of them, sitting, as scene 8 left them. */
const Pair = ({ t, loaf = false, dog = {}, owner = {} }: { t: number; loaf?: boolean; dog?: Partial<React.ComponentProps<typeof Dog>>; owner?: Partial<React.ComponentProps<typeof Owner>> }) => (
  <>
    <Dog wag={0.5} onHead={loaf ? <Loaf scale={0.8} /> : undefined} {...dog} />
    <Owner position={SAT} rotationY={SOUTH} pose={sitPose(t)} face="smile" {...owner} />
  </>
);

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "He left me safe",
  shots: [
    {
      cue: "9.bed",
      ...cam.push({ on: [PLACE.bed[0], 0.45, 0], dist: 3.9, to: 3.5, yaw: 24, pitch: 22, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The bed. Only the bed, in the sun.",
      stage: () => <Camp {...NOW} />,
    },
    {
      cue: "9.bones",
      ...cam.push({ on: [PLACE.chest[0], 0.5, PLACE.chest[2]], dist: 3.0, to: 2.6, yaw: -10, pitch: 30, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The chest, open, full of bones.",
      stage: () => <Camp {...NOW} chest={1} />,
    },
    {
      cue: "9.torch",
      ...cam.push({ on: [0, 0.8, -0.6], dist: 8.8, to: 8.2, yaw: -10, pitch: 19, fov: 52 }),
      zone: "town",
      look: "overworld-night",
      note: "The torches, at night, and every monster in the dark standing outside them.",
      stage: (t) => {
        const r = TORCH_R + 1.3;
        const at = (deg: number, extra = 0): Vec3 => [Math.sin((deg * Math.PI) / 180) * (r + extra), 0, Math.cos((deg * Math.PI) / 180) * (r + extra)];
        const face = (deg: number) => ((deg + 180) * Math.PI) / 180;
        return (
          <>
            <Camp {...NOW} lit={3} />
            <Fill at={[0, 7, -2]} power={60} reach={20} color="#a9b8ff" />
            <Fill at={[0, 5, 6]} power={40} reach={14} color="#a9b8ff" />
            <Dog wag={0.4} />
            <Creeper position={PLACE.creeper} />
            {[-158, 172, 146, 24, -28].map((deg, i) => (
              <Zombie key={deg} position={at(deg, (i % 2) * 0.5)} rotationY={face(deg)} lookAt={[0, 0.8, 0]} arms={1} walk={Math.sin(t * 2 + i) * 0.15} phase={i} />
            ))}
            <Skeleton position={at(-134, 0.3)} rotationY={face(-134)} lookAt={[0, 0.8, 0]} bow phase={2} />
            <Skeleton position={at(122, 0.4)} rotationY={face(122)} lookAt={[0, 0.8, 0]} phase={4} />
          </>
        );
      },
    },
    {
      cue: "9.roof",
      ...cam.push({ on: [0, 1.5, -0.2], dist: 4.4, to: 4.0, yaw: 16, pitch: -8, fov: 46 }),
      zone: "town",
      look: "overworld-storm",
      note: "The roof, in the rain, and the dog dry under the two planks that are left.",
      stage: (t) => (
        <>
          <Camp {...NOW} />
          <Dog ears={0.6} />
          <Fill at={[0.6, 2.4, 3.2]} power={34} reach={10} color="#dfe8ff" />
          <Fill at={[0, 6, -2]} power={40} reach={16} color="#a9b8ff" />
          {Array.from({ length: 150 }, (_, i) => {
            const x = ((i * 37) % 100) / 100;
            const z = ((i * 53) % 100) / 100;
            const px = (x - 0.5) * 8;
            const pz = (z - 0.5) * 9 + 1;
            if (Math.abs(px) < 0.85 && pz > -1.3 && pz < 1.1 && Math.abs(px) > 0.25) return null;
            return <group key={i} position={[px, 7 - ((t * 12 + i * 0.37) % 7), pz]}><mesh><boxGeometry args={[0.05, 0.62, 0.05]} /><meshBasicMaterial color="#eef6ff" /></mesh></group>;
          })}
        </>
      ),
    },
    {
      cue: "9.not",
      ...cam.push({ on: [0.42, 0.74, 0.3], dist: 3.5, to: 3.1, yaw: -8, pitch: 3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The two of them sitting side by side. The dog looks up at him, eyes wide. He is working it out.",
      stage: (t) => (
        <>
          <Camp {...NOW} />
          <Pair t={t} dog={{ headYaw: 0.75 * tw(t, 0.2, 0.5), headPitch: -0.3 * tw(t, 0.2, 0.5), mood: "wide", wag: 0.2, blink: false }} owner={{ headYaw: -0.3 * tw(t, 0.6, 0.9), headPitch: 0.25 * tw(t, 0.6, 0.9) }} />
          <Parrot position={PERCH} headYaw={-0.9} />
        </>
      ),
    },
    {
      cue: "9.follow",
      ...cam.truck({ on: [0, 1.0, 4.85], dist: 6.2, yaw: 72, pitch: 6, fov: 44, by: [0, 0, 4.0] }),
      zone: "meadow",
      look: "overworld-sunset",
      note: "What would have happened, at sunset four hundred days ago: his owner in armour walking down the path to the forest, sword in hand, and the dog trotting right behind his heels with his tail up. The dog who was not told to sit.",
      stage: (t) => {
        const k = t / 2.2;
        const a = stride([0.25, 0, 5.4], [0.25, 0, 9.4], k);
        return (
          <>
            <Camp sign={0} />
            <Owner armour {...a} animation="walk" face="frown">
              <Sword />
            </Owner>
            <Dog position={[-0.2, hop(t % 0.4, 0, 0.08, 0.4), a.position[2] - 1.15]} rotationY={SOUTH} sit={0} walk={k * 4} tail={0.9} wag={0.7} mouth={0.7} lookAt={[0.25, 1.5, a.position[2]]} />
          </>
        );
      },
    },
    {
      cue: "9.even",
      ...cam.push({ on: deep(0, 0.9, -0.6), dist: 7.2, to: 6.2, yaw: 12, pitch: 24, fov: 46 }),
      zone: "deep",
      look: "overworld-night",
      note: "Somewhere under the ground: a stone room, and a black square in the floor with stars in it, lit green. His owner stands at the edge of it looking down. The dog is beside him, looking down too. Then the owner steps in and the dog goes after him.",
      stage: (t) => {
        const jump = w("9.even", "come") - 0.25;
        const k = tw(t, jump, jump + 0.35);
        const k2 = tw(t, jump + 0.18, jump + 0.5);
        return (
          <>
            <Owner armour position={deep(0.45, 0.6 + hop(t, jump, 0.4, 0.35) - k * 1.6, 0 - k * 1.5)} rotationY={NORTH} animation={k > 0 ? "fall" : "idle"} headPitch={0.5} face="frown" scale={k < 1 ? 1 : 0} />
            <Dog position={deep(-0.5, 0.6 + hop(t, jump + 0.18, 0.35, 0.32) - k2 * 1.6, 0.1 - k2 * 1.5)} rotationY={NORTH} sit={k2 > 0 ? 0 : 1} headPitch={0.5} tail={0.4} wag={k2 > 0 ? 0 : 0.4} scale={k2 < 1 ? 1.2 : 0} />
          </>
        );
      },
    },
    {
      cue: "9.safe",
      ...cam.push({ on: [0, 0.85, 0.85], dist: 4.6, to: 4.0, yaw: 66, pitch: 5, fov: 42 }),
      zone: "meadow",
      look: "overworld-sunset",
      note: "What did happen, that sunset: his owner down on one knee in front of him under the roof he had just built, a hand on the dog's head, the torches lit, the bed made. Then he stands up to go.",
      stage: (t) => {
        const up = tw(t, w("9.safe", "safe") + 0.1, w("9.safe", "safe") + 0.5);
        return (
          <>
            <Camp sign={0} lit={1.5} />
            <Dog wag={1} mood="happy" headPitch={-0.2} />
            <Owner armour position={[0, 0, 1.75]} rotationY={NORTH} pose={posed(up > 0.5 ? "idle" : "crouch", t, { armR: [-1.3 * (1 - up), 0, 0], head: [0.2, 0, 0] as Vec3 })} face="calm" />
          </>
        );
      },
    },
    {
      cue: "9.farmer",
      ...cam.push({ on: [0.2, 0.95, 0], dist: 5.6, to: 5.0, yaw: -8, pitch: 7, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "The farmer comes out of his door with a loaf on his sleeves and waddles over, the way he has every morning. He stops, looks at the player sitting next to his statue, and puts the loaf on the dog's head anyway.",
      stage: (t) => {
        const k = tw(t, 0, 1.55);
        const g = go([-3.8, 0, -4.6], [-0.95, 0, -0.35], k);
        const put = 1.8;
        return (
          <>
            <Camp {...NOW} />
            <Life t={t} n={3} />
            <Dog wag={0.5} lookAt={t < put ? [g.position[0], 1.4, g.position[2]] : undefined} mood={t > put ? "happy" : "calm"} headPitch={hop(t, put, 0.12, 0.2)} onHead={<Loaf scale={0.8 * pop(t, put, 0.14)} />} />
            <Owner position={SAT} rotationY={SOUTH} pose={sitPose(t)} face="smile" headYaw={-0.9 * tw(t, 0.8, 1.2)} />
            <Parrot position={PERCH} headYaw={-1.2} />
            <Villager position={g.position} rotationY={k < 1 ? g.rotationY : 0.9} walk={g.walk} robe={ROBE.farmer} hat="straw" carry={t < put ? <Loaf scale={0.8} /> : undefined} lean={0.2 * (tw(t, put - 0.2, put) - tw(t, put + 0.1, put + 0.3))} lookAt={k === 1 && t < put - 0.15 ? [SAT[0], 1.0, SAT[2]] : undefined} />
          </>
        );
      },
    },
    {
      cue: "9.sign",
      ...cam.push({ on: [0.1, 1.05, -0.3], dist: 5.4, to: 5.0, yaw: -8, pitch: 5, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "The farmer turns to the sign, clears his throat, and nods along it line by line. The dog and his owner both turn to look.",
      stage: (t) => (
        <>
          <Camp {...NOW} />
          <Pair t={t} loaf dog={{ headYaw: 0.9, headPitch: -0.12, wag: 0.3 }} owner={{ headYaw: 0.7 }} />
          <Parrot position={PERCH} headYaw={-1.2} />
          <Villager position={[-0.95, 0, -0.35]} rotationY={0.9} robe={ROBE.farmer} hat="straw" hmm={1} lookAt={[PLACE.sign[0], 1.4 - 0.25 * tw(t, 0.3, 1.2), PLACE.sign[2]]} />
        </>
      ),
    },
    {
      cue: "9.read",
      ...cam.push({ on: [PLACE.sign[0], 1.22, PLACE.sign[2]], dist: 3.3, to: 2.9, yaw: 10, pitch: 18, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "The sign, square on and filling the frame: DO NOT MOVE HIM. HE IS WAITING. Below it, one white ear, and it lifts.",
      stage: (t) => (
        <>
          <Camp {...NOW} />
          <Pair t={t} loaf dog={{ headYaw: 0.9, headPitch: -0.12, wag: 1, ears: 0.4 + 0.6 * tw(t, 0.9, 1.2) }} owner={{ headYaw: 0.7 }} />
        </>
      ),
    },
  ],
});
void Life;

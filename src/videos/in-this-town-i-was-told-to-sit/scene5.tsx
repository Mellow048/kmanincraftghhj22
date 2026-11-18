import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Camp, Creeper, Dog, Fill, GreenEye, Glow, Life, Loaf, NORTH, Owner, PERCH, PLACE, Parrot, Pickaxe, ROBE, SOUTH, Skeleton, Spider, Sword, TORCH_R, Villager, Zombie, go, hop, pop, timing, tw, w } from "./kit";

/** 05 — What his owner left behind: a bed, a chest of bones, torches, a roof. And then, he thinks, him. */
const HAND: Vec3 = [1.25, 1.9, 2.75];

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "He was always forgetting things",
  shots: [
    {
      cue: "5.forgot",
      ...cam.orbit({ on: [0.1, 0.75, -0.2], dist: 7.4, distTo: 6.6, yaw: -34, yawTo: 26, pitch: 17, pitchTo: 13, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The lens swings round the spot and shows all of it: the chest, the dog, the sign with the parrot on it, the bed, the ring of torches, the little roof. The dog's head goes from the chest to the bed and back to the forest.",
      stage: (t) => {
        const a = tw(t, 0.4, 0.8) - tw(t, 1.3, 1.8);
        const b = tw(t, 1.3, 1.8) - tw(t, 2.5, 2.9);
        return (
          <>
            <Camp />
            <Life t={t} />
            <Dog onHead={<Loaf scale={0.8} />} headYaw={-0.8 * a + 0.8 * b} />
            <Parrot position={PERCH} headYaw={-0.2} bob={0.5} />
          </>
        );
      },
    },
    {
      cue: "5.bed",
      ...cam.push({ on: [0.95, 0.5, 0.3], dist: 6.3, to: 5.7, yaw: 8, pitch: 22, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "The bed, with the dog beside it. On 'nobody' a small villager walks up to it and leans in to climb on. The dog's head turns to him, slowly, and one lip goes up. The small villager stops, and goes back the way he came, backwards.",
      stage: (t) => {
        const come = w("5.bed", "Nobody") - 0.5;
        const stare = come + 0.75;
        const k = tw(t, come, come + 0.7) - tw(t, stare + 0.45, stare + 1.3);
        const p: Vec3 = [2.5 - k * 0.6, 0, 3.6 - k * 1.7];
        return (
          <>
            <Camp />
            <Life t={t} n={3} />
            <Dog onHead={<Loaf scale={0.8} />} headYaw={0.85 * tw(t, stare - 0.1, stare + 0.25)} teeth={0.6 * tw(t, stare + 0.1, stare + 0.3)} mood={t > stare ? "angry" : "calm"} ears={t > stare ? 0.5 : 1} />
            <Parrot position={PERCH} headYaw={0.6} />
            <Villager position={p} rotationY={Math.PI - 0.3} kid scale={0.7} robe={ROBE.friend} walk={k * 1.2} lean={0.25 * tw(t, come + 0.6, come + 0.8) * (t < stare + 0.3 ? 1 : 0)} lookAt={t > stare ? [0, 0.8, 0.6] : undefined} />
          </>
        );
      },
    },
    {
      cue: "5.bones",
      ...cam.push({ on: [-0.85, 0.5, 0], dist: 5.8, to: 5.2, yaw: -8, pitch: 22, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "The chest. The lid lifts by itself and it is full to the top with bones. The dog looks at them with his tongue out. On 'his lunch' his head snaps back to the front and his eyes shut tight: they are not his.",
      stage: (t) => {
        const open = w("5.bones", "chest") - 0.15;
        const no = w("5.bones", "I") - 0.05;
        const look = tw(t, open + 0.1, open + 0.35) - tw(t, no, no + 0.12);
        return (
          <>
            <Camp chest={tw(t, open, open + 0.3)} />
            <Life t={t} n={2} />
            <Dog onHead={<Loaf scale={0.8} />} headYaw={-1.05 * look} headPitch={0.3 * look} mouth={look > 0.5 ? 0.8 : 0} wag={look > 0.5 ? 0.8 : 0} mood={t > no ? "shut" : look > 0.5 ? "wide" : "calm"} shiver={t > no ? 0.5 : 0} />
          </>
        );
      },
    },
    {
      cue: "5.torch",
      ...cam.push({ on: [0, 0.8, -0.6], dist: 10.5, to: 9.2, yaw: 6, pitch: 19, fov: 52 }),
      zone: "town",
      look: "overworld-night",
      note: "Night, from above: the ring of torches is a pool of warm light with the dog in the middle of it, wagging. All round the edge of the light, just outside it, stand zombies, a skeleton and a spider. None of them puts a foot in. The dog thinks the torches are for the dark.",
      stage: (t) => {
        const r = TORCH_R + 1.3;
        const at = (deg: number, extra = 0): Vec3 => [Math.sin((deg * Math.PI) / 180) * (r + extra), 0, Math.cos((deg * Math.PI) / 180) * (r + extra)];
        const face = (deg: number) => ((deg + 180) * Math.PI) / 180;
        return (
          <>
            <Camp lit={3} />
            <Fill at={[0, 7, -2]} power={60} reach={20} color="#a9b8ff" />
            <Fill at={[0, 5, 6]} power={40} reach={14} color="#a9b8ff" />
            <Dog wag={1} mood="happy" mouth={0.7} />
            <Creeper position={PLACE.creeper} />
            <Parrot position={PERCH} headYaw={-0.2} />
            {[-158, 172, 146, 24, -28].map((deg, i) => (
              <Zombie key={deg} position={at(deg, (i % 2) * 0.5)} rotationY={face(deg)} lookAt={[0, 0.8, 0]} arms={1} walk={Math.sin(t * 2 + i) * 0.15} phase={i} />
            ))}
            <Skeleton position={at(-134, 0.3)} rotationY={face(-134)} lookAt={[0, 0.8, 0]} bow phase={2} />
            <Skeleton position={at(122, 0.4)} rotationY={face(122)} lookAt={[0, 0.8, 0]} phase={4} />
            <Spider position={at(-176, 1.4)} rotationY={face(-176)} />
          </>
        );
      },
    },
    {
      cue: "5.roof",
      ...cam.push({ on: [0, 1.38, -0.1], dist: 4.9, to: 4.4, yaw: -14, pitch: -5, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From low down, the roof over him against the sky: two posts that do not match and three planks with daylight between them. On 'not good' the middle plank lets go, swings and drops past his ear onto the grass. He looks up through the hole.",
      stage: (t) => {
        const go2 = w("5.roof", "not") - 0.1;
        return (
          <>
            <Camp drop={t - go2} />
            <Life t={t} n={2} creeper={false} />
            <Dog onHead={<Loaf scale={0.8} />} mood={t > go2 + 0.3 && t < go2 + 0.6 ? "shut" : t > go2 ? "wide" : "calm"} headPitch={-0.6 * tw(t, go2 + 0.6, go2 + 0.9) + hop(t, go2 + 0.35, 0.2, 0.25)} ears={t > go2 && t < go2 + 0.7 ? 0.3 : 1} />
            <Parrot position={[PERCH[0], PERCH[1] + hop(t, go2 + 0.38, 0.35, 0.3), PERCH[2]]} flap={t > go2 + 0.38 && t < go2 + 0.7 ? 1 : 0} headYaw={-0.6} />
          </>
        );
      },
    },
    {
      cue: "5.took",
      ...cam.push({ on: [0.55, 1.62, 1.7], dist: 5.8, to: 5.2, yaw: 5, pitch: 3, fov: 46 }),
      zone: "meadow",
      look: "overworld-sunset",
      note: "Four hundred days ago, at sunset, no town. His owner, in armour, counts what he is taking, and each thing pops into the air over his head as it is named: a sword, a pickaxe, and twelve green eyes, one after another, in two rows. The dog watches from under his roof.",
      stage: (t) => {
        const sw = w("5.took", "sword") - 0.08;
        const pk = w("5.took", "pickaxe") - 0.08;
        const ey = w("5.took", "twelve") - 0.1;
        return (
          <>
            <Camp sign={0} />
            <Dog lookAt={[0.95, 2.3, 2.4]} wag={0.4} />
            <Owner armour position={[0.95, 0, 2.4]} rotationY={SOUTH - 0.15} animation="hold" headPitch={-0.3} face="calm" />
            <group position={[0.38, 2.3 + hop(t, sw, 0.12, 0.2), 2.5]} scale={1.25 * pop(t, sw, 0.16)}>
              <Sword position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            </group>
            <group position={[1.45, 1.95 + hop(t, pk, 0.12, 0.2), 2.5]} rotation={[0, Math.PI / 2, 0]} scale={1.1 * pop(t, pk, 0.16)}>
              <Pickaxe rotation={[-Math.PI / 2, 0, 0]} />
            </group>
            {Array.from({ length: 12 }, (_, i) => (
              <GreenEye key={i} position={[0.1 + (i % 6) * 0.34, 2.95 + Math.floor(i / 6) * 0.36 + Math.sin(t * 3 + i) * 0.02, 2.5]} scale={0.95 * pop(t, ey + i * 0.055, 0.12)} glow={1} />
            ))}
            {t > ey ? <Glow position={[0.95, 3.1, 2.4]} size={2.4} color="#7fe0b0" opacity={0.25 * tw(t, ey, ey + 0.6)} /> : null}
          </>
        );
      },
    },
    {
      cue: "5.eyes",
      ...cam.push({ on: [0.55, 1.45, 1.8], onTo: [0.6, 2.3, 2.4], dist: 5.8, to: 6.2, yaw: 20, pitch: 2, fov: 46 }),
      zone: "meadow",
      look: "overworld-sunset",
      note: "His owner throws one green eye up: it climbs, hangs, and drifts away south over the trees, leaving a green trail. The owner watches where it goes. The dog's head tips to one side.",
      stage: (t) => {
        const k = tw(t, 0.15, 1.5);
        const eye: Vec3 = [HAND[0] - k * 0.5, HAND[1] + Math.sin(k * 1.9) * 2.2, HAND[2] + k * k * 2.6];
        return (
          <>
            <Camp sign={0} />
            <Dog lookAt={eye} headTilt={0.4 * tw(t, 0.5, 0.75)} />
            <Owner armour position={[0.95, 0, 2.6]} rotationY={SOUTH} animation="reachUp" lookAt={eye} />
            <GreenEye position={eye} rotationY={0.6} scale={1.3} glow={1.2} />
            <Glow position={eye} size={0.9} color="#7fe0b0" opacity={0.6} />
            {[1, 2, 3, 4, 5].map((i) => {
              const q = Math.max(0, k - i * 0.05);
              return <GreenEye key={i} position={[HAND[0] - q * 0.5, HAND[1] + Math.sin(q * 1.9) * 2.2, HAND[2] + q * q * 2.6]} rotationY={0.6} scale={k > i * 0.05 ? 0.55 - i * 0.08 : 0} glow={0.8} />;
            })}
          </>
        );
      },
    },
    {
      cue: "5.forgotme",
      ...cam.push({ on: [0, 0.62, 0.4], dist: 3.0, to: 7.5, yaw: 0, pitch: 5, fov: 42 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Sunset. Close on his face, ears down, eyes sad, and the lens pulls back and back until he is small in the middle of the square: one dog, facing the forest, with a loaf on his head, and the villagers going indoors behind him.",
      stage: (t) => (
        <>
          <Camp />
          {[0, 1, 2].map((i) => {
            const g = go([[-2.6, 0, -2.6], [2.8, 0, -3], [0.4, 0, -4]][i] as Vec3, [[-4.4, 0, -6.6], [4.4, 0, -6.6], [0, 0, -14]][i] as Vec3, tw(t, 0.3 + i * 0.3, 2.6 + i * 0.3));
            return <Villager key={i} {...g} robe={[ROBE.brown, ROBE.blue, ROBE.elder][i]} phase={i} />;
          })}
          <Dog mood="sad" ears={0.25} headPitch={0.18} tail={-0.5} onHead={<Loaf scale={0.8} />} />
          <Parrot position={PERCH} headYaw={-0.9} tilt={0.2} />
        </>
      ),
    },
  ],
});
void Life;

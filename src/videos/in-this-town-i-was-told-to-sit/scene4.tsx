import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Bone, Camp, Chicken, Creeper, Dog, EAST, Life, Loaf, PERCH, PLACE, Parrot, Puffs, Rain, Skeleton, Snowfall, hop, timing, tw, w } from "./kit";

/** 04 — The whole job: he sits. Skeletons, rain, snow. */
const ROW: Array<[number, number]> = [
  [0, 2.5],
  [-1.3, 3.0],
  [-2.5, 2.4],
];

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The whole job",
  shots: [
    {
      cue: "4.job",
      ...cam.push({ on: [0, 0.62, 0.5], dist: 3.9, to: 3.1, yaw: 12, pitch: -3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "From low down, looking up at him: chest out, a loaf on his head, proud. A chicken walks slowly past right under his nose. His eyes follow it all the way across; nothing else of him moves, and it costs him. On 'the whole job' his eyes come back to the forest.",
      stage: (t) => {
        const len = 3.17;
        const k = t / len;
        const x = -1.7 + k * 3.4;
        const back = tw(t, w("4.job", "whole") - 0.1, w("4.job", "whole") + 0.15);
        return (
          <>
            <Camp />
            <Life t={t} n={3} />
            <Dog blink={false} onHead={<Loaf scale={0.8} />} lookAt={back > 0.5 ? undefined : [x, 0.4, 1.5]} shiver={back > 0.5 ? 0 : 0.5} wag={back > 0.5 ? 0 : 0.6} mood={back > 0.5 ? "calm" : "wide"} />
            <Parrot position={PERCH} headYaw={-0.2} />
            <Chicken position={[x, 0, 1.5]} rotationY={EAST} scale={1.25} />
          </>
        );
      },
    },
    {
      cue: "4.skel",
      ...cam.push({ on: [-0.3, 0.9, 1.3], dist: 7.2, to: 6.6, yaw: -6, pitch: 22, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "Night, from above. Three skeletons walk past in a row, right in front of him, bows in their hands, rattling. Behind them the dog sits in his ring of torches with the creeper beside him.",
      stage: (t) => (
        <>
          <Camp lit={2} />
          <Dog lookAt={[ROW[0][0] - 2.6 + t * 2.1, 1.4, 2.6]} shiver={0.4} ears={1} />
          <Creeper position={PLACE.creeper} />
          <Parrot position={PERCH} headYaw={0.3} />
          {ROW.map(([x, z], i) => (
            <Skeleton key={i} position={[x - 2.6 + t * 2.1, 0, z]} rotationY={EAST} walk={t * 2.1 + i} bow={i !== 1} phase={i} />
          ))}
        </>
      ),
    },
    {
      cue: "4.dog",
      ...cam.push({ on: [0, 0.6, 0.5], dist: 3.3, to: 2.7, yaw: 8, pitch: 1, fov: 38 }),
      zone: "town",
      look: "overworld-night",
      note: "Close on him and he is in pieces: shaking, eyes wide, tongue out, tail going, his front paws lifting off the ground and going down again. A skeleton's legs go past the lens. He stays sitting.",
      stage: (t) => (
        <>
          <Camp lit={2} />
          <Dog blink={false} mood="wide" shiver={1} wag={1} mouth={0.8} sit={0.93 + Math.sin(t * 9) * 0.06} headYaw={-0.35 + 0.3 * Math.sin(t * 2.4)} roll={Math.sin(t * 11) * 0.03} />
          <Creeper position={PLACE.creeper} turn={0.7} nod={0.25} />
          <Skeleton position={[-2.3 + t * 1.5, 0, -1.7]} rotationY={EAST} walk={t * 1.5} bow />
        </>
      ),
    },
    {
      cue: "4.ran",
      ...cam.push({ on: [0.4, 0.9, 1.4], dist: 6.4, to: 7.0, yaw: 10, pitch: 20, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "The same row from above. The three skeletons stop, and all three skulls turn to the dog. He has not moved. On 'they ran' they jump and run for it anyway, rattling, and one of them leaves a bone spinning in the air behind it.",
      stage: (t) => {
        const run = w("4.ran", "They") - 0.05;
        const k = tw(t, run + 0.2, run + 1.1);
        return (
          <>
            <Camp lit={2} />
            <Dog blink={false} mood="wide" shiver={0.6} lookAt={[2.4 + k * 6, 1.2, 2.6]} />
            <Creeper position={PLACE.creeper} />
            {ROW.map(([x, z], i) => (
              <Skeleton
                key={i}
                position={[x + 1.9 + k * (9 + i), hop(t, run + i * 0.04, 0.6, 0.28), z]}
                rotationY={EAST}
                walk={k * 9}
                lookAt={t < run + 0.2 ? [0, 0.8, 0.5] : undefined}
                rattle={t > run ? 1 : 0.2}
                lean={k > 0 && k < 1 ? 0.35 : 0}
                bow={i !== 1}
                jaw={t > run ? 1 : 0}
                phase={i}
              />
            ))}
            {t > run + 0.25 ? <Bone position={[1.9, 0.08 + hop(t, run + 0.25, 1.3, 0.7), 2.5]} rotation={[0, t * 4, t > run + 0.95 ? 0 : t * 13]} scale={1.6} /> : null}
            {t > run + 0.2 && t < run + 0.9 ? <Puffs position={[3, 0.2, 2.6]} count={7} spread={1.3} size={0.3} rise={0.8} speed={1.7} color="#b9b4a8" /> : null}
          </>
        );
      },
    },
    {
      cue: "4.rain",
      ...cam.push({ on: [0.25, 0.72, 0.3], dist: 4.6, to: 4.0, yaw: -10, pitch: 6, fov: 42 }),
      zone: "town",
      look: "overworld-storm",
      note: "Rain, hard. It comes straight through the hole in his roof and onto his head. His ears are flat and his eyes are shut. The loaf is soggy. The parrot on the sign holds a wing over its own head.",
      stage: (t) => (
        <>
          <Camp />
          <Dog ears={0.1} mood={t > 0.9 ? "calm" : "shut"} headPitch={0.12} onHead={<Loaf scale={0.8} rotation={[0, 0, 0.12]} />} />
          <Parrot position={PERCH} flap={0.35} tilt={-0.3} headYaw={-0.2} />
          <Rain center={[0, 0, 1.5]} t={t} count={240} area={[9, 12]} />
          {[0, 1, 2, 3].map((i) => (
            <Block key={i} position={[(i % 2 ? 0.1 : -0.12), 2.2 - ((t * 5 + i * 0.3) % 1) * 1.1, 0.4 + (i % 3) * 0.1]} size={[0.035, 0.3, 0.035]} color="#cfe4ff" emissive="#9cc4ff" emissiveIntensity={0.5} castShadow={false} />
          ))}
          <Block position={[0, 0.03, 1.3]} size={[1.5, 0.02, 0.9]} color="#6f93c0" opacity={0.6} transparent castShadow={false} />
        </>
      ),
    },
    {
      cue: "4.snow",
      ...cam.push({ on: [0.2, 0.72, 0.3], dist: 4.4, to: 3.7, yaw: 14, pitch: 7, fov: 42 }),
      zone: "town",
      look: "overworld-storm",
      note: "Snow. The ground is white, the bed is white, the sign has a white cap and so does the parrot. The dog is a heap of snow with two ears. On 'I sat' two eyes open in the heap.",
      stage: (t) => {
        const open = w("4.snow", "sat") - 0.12;
        return (
          <>
            <Block position={[0, 0.03, 0]} size={[70, 0.05, 70]} color="#f4f7fb" castShadow={false} />
            <Camp snow />
            <Block position={[0, 0.2, -0.3]} size={[1.05, 0.4, 1.5]} color="#ffffff" />
            <Block position={[0, 0.12, 0.65]} size={[0.8, 0.24, 0.5]} color="#ffffff" />
            <Dog snow blink={false} mood={t > open ? "wide" : "shut"} ears={0.6} shiver={t > open ? 0.5 : 0.15} />
            <Parrot position={PERCH} snow headYaw={-0.2} />
            <Snowfall t={t} center={[0, 0, 1.5]} />
          </>
        );
      },
    },
  ],
});
void ({} as Vec3);

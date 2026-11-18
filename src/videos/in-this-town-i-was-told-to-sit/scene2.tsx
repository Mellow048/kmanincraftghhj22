import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, Camp, Creeper, Dog, Life, Loaf, PERCH, PLACE, Parrot, ROBE, SOUTH, SoundRings, Villager, go, hop, pop, timing, tw, w } from "./kit";

/** 02 — Two neighbours: a creeper who stands next to him at night and says nothing, and a parrot who can hiss like one. */
const CREEPER_FACE: Vec3 = [PLACE.creeper[0], 1.4, PLACE.creeper[2] + 0.3];

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "A creeper and a parrot",
  shots: [
    {
      cue: "2.creeper",
      ...cam.push({ on: [-0.45, 0.95, 0], dist: 5.4, to: 4.6, yaw: -10, pitch: 6, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "Night. The torches are lit all round him and the windows are warm. A creeper walks in out of the dark, stops beside him, and turns to face the same way he does. The dog's eyes follow it in, then go back to the forest.",
      stage: (t) => {
        const k = tw(t, 0, 1.15);
        const walk = go([-4.6, 0, 1.1], PLACE.creeper, k);
        const turn = tw(t, 1.15, 1.4);
        return (
          <>
            <Camp lit={2} />
            <Dog lookAt={t < 1.3 ? [walk.position[0], 1.3, walk.position[2] + 0.5] : undefined} ears={t < 1.3 ? 1 : 0.85} />
            <Parrot position={PERCH} headYaw={-0.2} tilt={0.5} />
            <Creeper position={walk.position} rotationY={walk.rotationY * (1 - turn)} walk={walk.walk} />
          </>
        );
      },
    },
    {
      cue: "2.talk",
      ...cam.push({ on: [-0.45, 1.0, 0.2], dist: 3.7, to: 3.4, yaw: 5, pitch: 1, fov: 40 }),
      zone: "town",
      look: "overworld-night",
      note: "The two of them side by side, straight on, both staring ahead. Nothing. On 'listener' the dog turns his head to the creeper; a beat later the creeper turns his head to the dog. They look at each other. Both snap back to the front.",
      stage: (t) => {
        const a = w("2.talk", "good") - 0.05;
        const dogTurn = tw(t, a, a + 0.15) - tw(t, a + 0.75, a + 0.85);
        const creepTurn = tw(t, a + 0.3, a + 0.45) - tw(t, a + 0.75, a + 0.85);
        return (
          <>
            <Camp lit={2} />
            <Dog headYaw={-0.95 * dogTurn} headPitch={-0.25 * dogTurn} blink={false} />
            <Creeper position={PLACE.creeper} rotationY={SOUTH} turn={0.9 * creepTurn} nod={0.3 * creepTurn} />
          </>
        );
      },
    },
    {
      cue: "2.parrot",
      ...cam.push({ on: [PERCH[0] - 0.08, PERCH[1] + 0.52, PERCH[2]], dist: 3.2, to: 2.8, yaw: -14, pitch: 2, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "Day. A red parrot drops out of the sky onto the top of the sign, folds its wings, and tips its head at us. Below it, the dog's ears.",
      stage: (t) => {
        const land = 0.3;
        return (
          <>
            <Camp />
            <Life t={t} n={3} />
            <Dog onHead={<Loaf scale={0.8} />} lookAt={t > land ? [PERCH[0], PERCH[1] + 0.3, PERCH[2] + 0.6] : undefined} />
            <Parrot position={[PERCH[0], PERCH[1] + 1.5 * (1 - tw(t, 0, land)) + hop(t, land, 0.06, 0.18), PERCH[2]]} flap={t < land + 0.08 ? 1 : 0} tilt={0.45 * tw(t, land + 0.2, land + 0.35)} headYaw={-0.2} />
          </>
        );
      },
    },
    {
      cue: "2.hiss",
      ...cam.push({ on: [0.35, 1.45, -0.8], dist: 6.4, to: 5.8, yaw: -6, pitch: 7, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The parrot opens its beak: SSSSS. Three villagers behind the dog jump and run for their doors. The dog's ears go flat. On 'nobody liked' a loaf flies in from the left and knocks the parrot off the sign.",
      stage: (t) => {
        const hiss = w("2.hiss", "hiss") - 0.1;
        const stop = w("2.hiss", "Nobody") - 0.1;
        const hit = w("2.hiss", "liked");
        const on = t > hiss && t < stop;
        const run = tw(t, hiss + 0.35, hiss + 1.5);
        const folk: Array<[Vec3, Vec3, string]> = [
          [[-1.9, 0, -2.6], [-6.5, 0, -5.5], ROBE.brown],
          [[1.4, 0, -3.6], [6.5, 0, -6], ROBE.blue],
          [[-0.5, 0, -4.4], [-1.5, 0, -11], ROBE.elder],
        ];
        const fly = tw(t, hit - 0.22, hit);
        const off = tw(t, hit, hit + 0.5);
        return (
          <>
            <Camp />
            <Dog onHead={<Loaf scale={0.8} />} ears={on ? 0.15 : 1} mood={on ? "shut" : "calm"} />
            {folk.map(([a, b, robe], i) => {
              const g = go(a, b, run);
              return <Villager key={i} position={[g.position[0], hop(t, hiss + 0.08 + i * 0.05, 0.5, 0.3), g.position[2]]} rotationY={run > 0 ? g.rotationY : SOUTH} walk={g.walk} robe={robe} lookAt={run > 0 ? undefined : [PERCH[0], PERCH[1], PERCH[2]]} phase={i} />;
            })}
            <Parrot
              position={[PERCH[0] + off * 1.6, PERCH[1] + hop(t, hit, 0.7, 0.5) - off * off * 0.4, PERCH[2] - off * 0.6]}
              open={on ? 1 : 0}
              flap={off > 0 ? 1 : 0}
              tilt={off * 1.2}
              bob={t > stop && off === 0 ? 1 : 0}
              headYaw={-0.2}
            />
            <Bubble text="SSSSS" position={[PERCH[0] - 0.55, PERCH[1] + 0.95, PERCH[2] + 0.15]} scale={0.8 * pop(t, hiss, 0.14) * (t > stop ? 0 : 1)} tail={1} />
            <SoundRings position={[PERCH[0], PERCH[1] + 0.5, PERCH[2] + 0.3]} t={on ? t - hiss : -1} color="#ffffff" reach={1.1} />
            {fly > 0 && off < 0.9 ? <Loaf position={[PERCH[0] - 3 * (1 - fly) + off * 1.2, PERCH[1] + 0.3 + off * 0.9 - off * off * 1.6, PERCH[2] + 0.1]} rotation={[t * 11, 0, t * 7]} scale={0.8} /> : null}
          </>
        );
      },
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Barb, Boss, Bubble, Count, Farm, Fill, Gary, IronGolem, Kevin, Lying, Me, NORTH, PLACE, Poppy, Puffs, SOUTH, Under, EAST, pop, posed, timing, tw, w } from "./kit";
import { Others } from "./scene1";

/** 02 — The job: three glass rooms, an iron man out of the air, and the water that takes him. */
const ME = PLACE.me;
const SPAWN = PLACE.spawn;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Where the iron men go",
  shots: [
    {
      cue: "2.town",
      ...cam.push({ on: [0.8, 0.2, -0.6], dist: 18, to: 15, yaw: 28, pitch: 17, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The whole town: a slab of stone hanging in the sky with clouds under it, three glass rooms in a row on top, one villager in each, and a boat.",
      stage: (t) => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH} />
          <Others t={t} />
          <Kevin />
        </>
      ),
    },
    {
      cue: "2.gary",
      ...cam.push({ on: [-2.3, 0.85, 0.3], dist: 5.0, to: 4.4, yaw: -8, pitch: 14, fov: 44 }),
      zone: "farm",
      look: "overworld-night",
      note: "Night. Gary's room: a villager in a nightcap flat on his back on the floor, fast asleep. He screams without waking up, and goes on sleeping.",
      stage: (t) => {
        const go = w("2.gary", "screamed") - 0.1;
        const k = t > go && t < go + 0.7 ? 1 : 0;
        return (
          <>
            <Farm lit />
            <Fill at={[-2.3, 3, 3.4]} power={30} reach={9} color="#c9d0ff" />
            <Lying position={[-2.3 + Math.sin(t * 40) * 0.02 * k, 0.2, 0.75]}>
              <Gary position={[0, 0, 0]} hmm={k} />
            </Lying>
            <Bubble text="AAAH!" position={[-1.95, 1.7, 1.15]} scale={0.5 * k} tail={-1} tilt={Math.sin(t * 36) * 0.04} />
            <Bubble text="Z" position={[-2.6, 1.0 + ((t * 0.35) % 0.6), 1.15]} scale={k ? 0 : 0.5} tail={-1} tilt={0.15} />
            <Me position={ME} rotationY={SOUTH} />
            <Kevin />
          </>
        );
      },
    },
    {
      cue: "2.barb",
      ...cam.push({ on: [2.3, 1.8, 0.3], dist: 4.8, to: 4.3, yaw: 8, pitch: 5, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "Barb's room: purple robe, grey bun, small glasses. Over her head a number, and while we look it goes up by one: 911.",
      stage: (t) => {
        const tick = w("2.barb", "counted") - 0.05;
        return (
          <>
            <Farm />
            <Barb position={PLACE.barb} rotationY={SOUTH} nod={Math.sin(tw(t, tick, tick + 0.4) * Math.PI) * 0.3} />
            <Count position={[2.3, 3.0, 1.1]} text={t > tick ? "911" : "910"} scale={0.75 + 0.2 * Math.sin(tw(t, tick, tick + 0.25) * Math.PI)} />
          </>
        );
      },
    },
    {
      cue: "2.pop",
      ...cam.push({ on: [0, 1.6, -2.6], dist: 9.4, to: 8.4, yaw: 180, pitch: 9, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "From the north side: the backs of three villagers shaking in their rooms, and on the stone in front of us, out of nothing, an iron man.",
      stage: (t) => {
        const at = w("2.pop", "popped") - 0.1;
        return (
          <>
            <Farm />
            <Me position={ME} rotationY={SOUTH} hmm={t < at ? 1 : 0} />
            <Others t={t} k={t < at ? 1 : 0} />
            <Kevin />
            <IronGolem position={SPAWN} rotationY={NORTH} scale={pop(t, at, 0.16)} />
            {t > at && t < at + 0.5 ? <Puffs position={[0, 1.4, SPAWN[2]]} count={9} spread={1.2} size={0.34} rise={0.8} speed={2} color="#f4f6f8" /> : null}
          </>
        );
      },
    },
    {
      cue: "2.step",
      ...cam.push({ on: [0, 1.5, -3.7], dist: 6.2, to: 5.6, yaw: 196, pitch: 6, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "He looks about him. He takes one step, toward us: off the stone and into the water.",
      stage: (t, { dur }) => {
        const k = tw(t, dur * 0.35, dur);
        return (
          <>
            <Farm />
            <Me position={ME} rotationY={SOUTH} />
            <Others t={t} />
            <IronGolem position={[0, -0.3 * tw(k, 0.7, 1), SPAWN[2] - 1.5 * k]} rotationY={NORTH} walk={k * 1.3} headYaw={k > 0 ? 0 : Math.sin(t * 5) * 0.6} />
          </>
        );
      },
    },
    {
      cue: "2.water",
      ...cam.truck({ on: [1.2, 1.3, PLACE.water[2]], dist: 7.4, yaw: 170, pitch: 9, fov: 46, by: [3, 0, 0] }),
      zone: "farm",
      look: "overworld-day",
      note: "The water takes him: an iron man up to his knees, sliding sideways down the channel with his arms out, looking back at us over his shoulder as he goes.",
      stage: (t, { p }) => (
        <>
          <Farm />
          <IronGolem position={[0.2 + p * 4.6, -0.35, PLACE.water[2]]} rotationY={NORTH + 0.5} armR={-1.2 + Math.sin(t * 9) * 0.3} armL={-1.2 - Math.sin(t * 9) * 0.3} headYaw={-0.9} />
          <Puffs position={[0.2 + p * 4.6, 0, PLACE.water[2]]} count={5} spread={0.7} size={0.16} rise={0.4} speed={2.2} color="#bcd8ff" />
        </>
      ),
    },
    {
      cue: "2.talk",
      ...cam.push({ on: [0, 1.4, 0.4], dist: 11.5, to: 10.5, yaw: 0, pitch: 7, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The three of them in their three rooms, from the front. All three look away to the left at the same moment, and whistle at the sky.",
      stage: (t) => {
        const k = tw(t, 0.25, 0.6);
        return (
          <>
            <Farm />
            <Me position={ME} rotationY={SOUTH} turn={0.8 * k} nod={-0.25 * k} />
            <Gary position={PLACE.gary} rotationY={SOUTH} turn={0.8 * k} nod={-0.25 * k} />
            <Barb position={PLACE.barb} rotationY={SOUTH} turn={0.8 * k} nod={-0.25 * k} />
            <Kevin turn={-0.8 * k} />
          </>
        );
      },
    },
    {
      cue: "2.nice",
      ...cam.push({ on: [0, 1.45, 0.3], dist: 3.4, to: 3.0, yaw: -18, pitch: 3, fov: 42 }),
      zone: "farm",
      look: "overworld-day",
      note: "The teller, close, sure of it. He nods.",
      stage: (t) => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH - 0.25} nod={Math.sin(tw(t, 0.5, 1.1) * Math.PI) * 0.3} />
          <Kevin tag={false} />
        </>
      ),
    },
    {
      cue: "2.chest",
      ...cam.push({ on: [0, 1.35, -0.6], dist: 5.6, to: 4.8, yaw: 10, pitch: 9, fov: 44 }),
      zone: "under",
      look: "overworld-day",
      note: "Under the floor: a chest with its lid up, and a pipe over it. Iron drops out of the pipe: one, two, three. Then, slowly, one red flower.",
      stage: (t) => {
        const iron = w("2.chest", "Iron") - 0.1;
        const fl = w("2.chest", "flowers") - 0.25;
        const k = tw(t, fl, fl + 0.5);
        return (
          <>
            <Under open={1} iron={t > iron + 0.9 ? 6 : t > iron + 0.6 ? 4 : t > iron + 0.4 ? 2 : 0} flower={k >= 1} drop={t - iron} />
            {k > 0 && k < 1 ? <Poppy position={[0, 2.5 - k * 1.7, -0.6]} rotation={[0, t * 5, 0.4]} scale={1.3} /> : null}
          </>
        );
      },
    },
    {
      cue: "2.pay",
      ...cam.push({ on: [0, 1.15, 0.3], dist: 4.0, to: 3.5, yaw: 16, pitch: 9, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "His room again. He has a red flower on his sleeves and a small heap of them at his feet, and he is proud of every one.",
      stage: (t) => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH + 0.2} carry={<Poppy position={[-0.14, 0.07, 0.1]} rotation={[0, 0, 1.3]} scale={1.15} />} nod={Math.sin(tw(t, 0.6, 1.2) * Math.PI) * 0.3} />
          {Array.from({ length: 7 }, (_, i) => (
            <Poppy key={i} position={[-0.6 + (i % 4) * 0.16, 0.08, 0.45 + (i % 3) * 0.14]} rotation={[0, i * 1.1, 1.35]} scale={1.1} />
          ))}
          <Kevin />
        </>
      ),
    },
    {
      cue: "2.boss",
      ...cam.push({ on: [0.1, 1.2, -0.3], dist: 6.0, to: 5.2, yaw: 12, pitch: 26, fov: 44 }),
      zone: "under",
      look: "overworld-day",
      note: "From above. A player in a red shirt stands at the chest and takes the iron out of it by the armful, looking down the whole time. He leaves the flower. He does not look up.",
      stage: (t) => {
        const take = w("2.boss", "took") - 0.1;
        return (
          <>
            <Under open={1} iron={t > take + 0.5 ? 0 : t > take + 0.25 ? 3 : 6} flower />
            <Boss position={[0.15, 0, 0.55]} rotationY={NORTH} face="neutral" headPitch={0.45} pose={posed("idle", t, { armR: [-1.3 + Math.sin(tw(t, take, take + 0.6) * Math.PI * 2) * 0.5, 0, 0], armL: [-1.3 - Math.sin(tw(t, take, take + 0.6) * Math.PI * 2) * 0.5, 0, 0] })} />
          </>
        );
      },
    },
  ],
});
void EAST;

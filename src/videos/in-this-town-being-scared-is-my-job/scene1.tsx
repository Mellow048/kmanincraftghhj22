import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Barb, Bubble, Count, DEG, Farm, Gary, Kevin, Loaf, Me, PLACE, SOUTH, Shake, SoundRings, pop, timing, tw, w } from "./kit";

/** 01 — The hook: a villager in a glass room in the sky, screaming at a zombie in a boat. His name is Kevin. */
const ME = PLACE.me;
const KEV = PLACE.kevin;
const eyes: Vec3 = [KEV[0], 1.3, KEV[2]];
/** The other two, at work in their rooms. `k` is how scared they are. */
export const Others: React.FC<{ t: number; k?: number; gary?: boolean; barb?: boolean }> = ({ t, k = 0, gary = true, barb = true }) => (
  <>
    {gary ? (
      <Shake t={t + 0.3} k={k}>
        <Gary position={PLACE.gary} rotationY={SOUTH} nod={-0.3 * k} hmm={k} />
      </Shake>
    ) : null}
    {barb ? (
      <Shake t={t + 0.7} k={k}>
        <Barb position={PLACE.barb} rotationY={SOUTH} nod={-0.3 * k} hmm={k} />
      </Shake>
    ) : null}
  </>
);

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "His name is Kevin",
  shots: [
    {
      cue: "1.job",
      ...cam.push({ on: [0.1, 1.55, 1.0], dist: 5.9, to: 5.2, yaw: 44, pitch: 7, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The hook. A glass room in the sky. A villager in a yellow hard hat is screaming at a zombie who sits one block away in a boat, with a name tag over his head. The zombie does not move. The scream stops; the villager looks at us.",
      stage: (t) => {
        const stop = w("1.job", "my") - 0.1;
        const k = t < stop ? 1 : 0;
        return (
          <>
            <Farm />
            <Shake t={t} k={k}>
              <Me position={ME} rotationY={SOUTH} nod={k ? -0.4 : 0} hmm={k} lookAt={k ? undefined : [5, 2, 6]} />
            </Shake>
            <Bubble text="AAAH!" position={[0.3, 3.2, 1.15]} rotationY={0.77} scale={k ? 0.8 + Math.sin(t * 30) * 0.04 : 0} tail={-1} tilt={Math.sin(t * 36) * 0.04} />
            <SoundRings position={[0, 1.7, 1.0]} t={k ? t : -1} color="#ffffff" reach={1.4} />
            <Kevin tagTurn={0.77} tagScale={0.8} />
            <Others t={t} />
          </>
        );
      },
    },
    {
      cue: "1.zombie",
      ...cam.push({ on: [0.25, 1.15, 1.9], dist: 3.9, to: 3.4, yaw: 200, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "From inside the room, over the hard hat: the glass, and the zombie on the other side of it, green, looking straight in.",
      stage: () => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH} />
          <Kevin tagTurn={Math.PI} lookAt={[0, 1.6, 0.25]} />
        </>
      ),
    },
    {
      cue: "1.years",
      ...cam.push({ on: [0, 1.3, KEV[2]], dist: 2.9, to: 2.5, yaw: 152, pitch: 4, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The zombie, close. He has been here so long that the days are counted over the boat: DAY 730.",
      stage: (t, { p }) => (
        <>
          <Farm />
          <Kevin tagTurn={152 * DEG} lookAt={[0.9, 1.5, 0.3]} />
          <Count position={[0.05, 2.12, KEV[2]]} rotationY={152 * DEG} text={`DAY ${Math.min(730, Math.round(700 + 30 * tw(p, 0, 0.6)))}`} scale={0.42} />
        </>
      ),
    },
    {
      cue: "1.kevin",
      ...cam.push({ on: [0, 1.3, KEV[2]], dist: 2.4, to: 2.0, yaw: 156, pitch: 2, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "Closer: his face, and the tag over it. KEVIN.",
      stage: () => (
        <>
          <Farm />
          <Kevin tagTurn={156 * DEG} lookAt={[0.8, 1.6, 0.3]} />
        </>
      ),
    },
    {
      cue: "1.tag",
      ...cam.push({ on: [0, 1.7, KEV[2]], dist: 1.9, to: 1.7, yaw: 156, pitch: 2, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "He rolls his eyes up at his own tag, and back down at us.",
      stage: (t) => (
        <>
          <Farm />
          <Kevin tagTurn={156 * DEG} lookAt={t < 0.75 ? [0, 3.4, KEV[2] - 0.6] : [0.8, 1.6, 0.3]} />
        </>
      ),
    },
    {
      cue: "1.scream",
      ...cam.push({ on: [0, 1.45, 0.4], dist: 4.6, to: 4.1, yaw: 22, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "Over the zombie's shoulder: the villager behind his glass. He looks at Kevin. He takes a breath. He screams, and jumps with it.",
      stage: (t) => {
        const go = w("1.scream", "scream") - 0.12;
        const k = t > go ? 1 : 0;
        return (
          <>
            <Farm />
            <Shake t={t} k={k}>
              <Me position={ME} rotationY={SOUTH} lookAt={k ? undefined : eyes} nod={k ? -0.4 : 0} hmm={k} lean={k ? 0 : -0.08 * tw(t, go - 0.5, go)} />
            </Shake>
            <Bubble text="AAAH!" position={[0.55, 2.3, 1.15]} rotationY={0.35} scale={0.5 * pop(t, go, 0.12)} tail={-1} tilt={Math.sin(t * 36) * 0.04} />
            <SoundRings position={[0, 1.7, 1.0]} t={k ? t - go : -1} color="#ffffff" reach={1.2} />
            <Kevin tagTurn={0.35} />
          </>
        );
      },
    },
    {
      cue: "1.lunch",
      ...cam.push({ on: [0, 1.4, 0.3], dist: 3.6, to: 3.2, yaw: -20, pitch: 4, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "The same villager, a second later, perfectly calm, with a loaf on his sleeves. He nods at us.",
      stage: (t) => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH - 0.3} carry={<Loaf position={[0, 0.07, 0.1]} scale={1.05} />} nod={Math.sin(tw(t, 0.25, 0.8) * Math.PI) * 0.3} />
          <Kevin tag={false} />
        </>
      ),
    },
  ],
});

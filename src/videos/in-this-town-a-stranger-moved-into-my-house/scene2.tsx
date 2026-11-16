import { cam, storyScene } from "../../engine";
import { Bubble, Chicken, IronGolem, Life, Me, MyRoom, OldMan, ROBE, SOUTH, SoundRings, Stranger, Town, Villager, hop, pop, timing, tw, w } from "./kit";

/** 02 — The town: nobody complains, the old man rings the bell, the iron man gives flowers. */
export const THEN = { bell: true, hole: false, wheat: 1, torches: false, wall: false };
const ROW: Array<[number, number, string]> = [[-0.72, 2.7, ROBE.brown], [0, 3.0, ROBE.red], [0.72, 2.7, ROBE.blue]];

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "We say hmm",
  shots: [
    {
      cue: "2.hrmm",
      ...cam.push({ on: [0, 1.2, 2.8], dist: 6.4, to: 5.8, yaw: 0, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Three villagers stand in a row. The stranger runs straight through the middle of them without slowing down, and the one in the middle is spun right round. Nobody says anything.",
      stage: (t) => {
        const z = -4.5 + t * 4.4;
        const spin = tw(t, 1.55, 1.9) * Math.PI * 2;
        return (
          <>
            <Town {...THEN} />
            {ROW.map(([x, vz, robe], i) => (
              <Villager key={i} position={[x, 0, vz]} rotationY={SOUTH + (i === 1 ? spin : 0)} robe={robe} lookAt={i !== 1 && z > 2 ? [0.4, 1.4, z] : undefined} phase={i + 1} />
            ))}
            <Stranger position={[0.38, Math.abs(Math.sin(t * 7.5)) * 0.4, z]} rotationY={SOUTH} animation="run" face="grin" />
          </>
        );
      },
    },
    {
      cue: "2.say",
      ...cam.push({ on: [0, 1.5, 2.8], dist: 4.7, to: 4.4, yaw: 0, pitch: 4, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "The same three, closer, looking after him. One after another: HMM. HMM. HMM.",
      stage: (t) => (
        <>
          <Town {...THEN} />
          {ROW.map(([x, vz, robe], i) => (
            <Villager key={i} position={[x, 0, vz]} rotationY={SOUTH} robe={robe} hmm={t > 0.2 + i * 0.16 ? 1 : 0} phase={i + 1} />
          ))}
          {ROW.map(([x, vz], i) => (
            <Bubble key={`b${i}`} text="HMM" position={[x * 0.92, 2.22 + (i === 1 ? 0.3 : 0), vz + 0.1]} scale={0.4 * pop(t, 0.2 + i * 0.16, 0.14)} tail={i === 2 ? 1 : -1} />
          ))}
        </>
      ),
    },
    {
      cue: "2.oldman",
      ...cam.push({ on: [0.1, 1.5, -5.0], dist: 6.4, to: 5.6, yaw: 8, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The old man, white beard, purple robe, beside the bell. A chicken walks past. That is trouble enough: he bangs the bell with his head, it swings and rings, and two villagers behind him leave the ground.",
      stage: (t) => {
        const ring = w("2.oldman", "rings") - 0.05;
        const on = t > ring;
        return (
          <>
            <Town {...THEN} swing={on ? Math.sin((t - ring) * 14) * 0.5 * Math.exp(-(t - ring) * 0.8) : 0} />
            <OldMan position={[-0.95, 0, -4.4]} rotationY={0.5} lean={on ? 0.1 : Math.sin(tw(t, ring - 0.25, ring) * Math.PI) * 0.5} lookAt={on ? undefined : [1.4 - t * 0.5, 0.3, -3.6]} />
            <Chicken position={[1.9 - t * 0.6, 0, -3.5]} rotationY={-1.57} />
            <SoundRings position={[0, 1.6, -5.3]} t={on ? t - ring : -1} color="#ffe27a" reach={1.6} />
            {([[-2.6, -7.2, ROBE.brown], [2.4, -7.6, ROBE.farmer]] as Array<[number, number, string]>).map(([x, z, robe], i) => (
              <Villager key={i} position={[x, hop(t, ring + 0.08 + i * 0.06, 0.6, 0.34), z]} rotationY={SOUTH} robe={robe} phase={i + 2} />
            ))}
          </>
        );
      },
    },
    {
      cue: "2.golem",
      ...cam.push({ on: [0.15, 1.45, -0.6], dist: 6.8, to: 6.0, yaw: -10, pitch: 6, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The iron man: huge, grey, bending down to hold out a poppy to a child who comes up to his knee. The child hops.",
      stage: (t) => {
        const give = w("2.golem", "flowers") - 0.1;
        return (
          <>
            <Town {...THEN} />
            <Life t={t} n={2} />
            <IronGolem position={[0.75, 0, -1.3]} rotationY={-0.75} flower bow={0.32 * tw(t, 0.3, give)} armR={-1.1 * tw(t, 0.3, give)} headPitch={0.3} />
            <Villager position={[-0.55, hop(t, give + 0.1, 0.35, 0.3) + hop(t, give + 0.5, 0.35, 0.3), -0.1]} rotationY={2.3} robe={ROBE.friend} kid scale={0.7} lookAt={[0.6, 1.8, -1.2]} />
          </>
        );
      },
    },
    {
      cue: "2.me",
      ...cam.push({ on: [0, 1.38, 4.6], dist: 3.4, to: 3.0, yaw: 0, pitch: 4, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "And the teller, close, looking at us: white robe, red cap.",
      stage: (t) => (
        <>
          <Town {...THEN} />
          <Life t={t} n={3} />
          <Me position={[0, 0, 4.6]} rotationY={SOUTH} nod={Math.sin(tw(t, 0.2, 0.6) * Math.PI) * 0.2} />
        </>
      ),
    },
    {
      cue: "2.books",
      ...cam.push({ on: [-1.1, 1.15, -0.1], dist: 4.6, to: 4.1, yaw: 8, pitch: 9, fov: 42 }),
      zone: "room",
      look: "overworld-day",
      note: "He stands behind a desk with a book on it, in his room. He looks down at the book as if somebody else put it there. He looks at us. He does not know.",
      stage: (t) => {
        const why = w("2.books", "remember") - 0.1;
        return (
          <>
            <MyRoom door="flat" desk={1} />
            <Me position={[-1.25, 0, -0.55]} rotationY={SOUTH} nod={t < why ? 0.5 : 0} tilt={t > why ? 0.22 : 0} />
            <Bubble text="?" position={[-0.72, 2.2, -0.45]} scale={0.5 * pop(t, why + 0.15, 0.14)} tail={-1} />
          </>
        );
      },
    },
  ],
});
void Stranger;

import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Camp, Dog, Life, Loaf, NORTH, PLACE, Puffs, ROBE, SOUTH, SignPost, TownParts, Villager, go, hop, pop, timing, tw, w } from "./kit";

/** 03 — There was no town. Villagers built one round him, left a loaf on his head, and put up a sign he cannot read. */
const BUILT = [0.15, 0.36, 0.57, 0.78, 0.99, 1.2, 1.38, 1.56, 1.74];

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "They built a town round me",
  shots: [
    {
      cue: "3.first",
      ...cam.push({ on: [0.3, 0.4, 0.5], dist: 15, to: 13.5, yaw: 16, pitch: 27, fov: 46 }),
      zone: "meadow",
      look: "overworld-day",
      note: "From high up: an empty meadow in the woods, a path going south into the trees, and in the middle of it one small white dog under a bad little roof, with a bed, a chest and a ring of torches. Nothing else for a long way.",
      stage: () => (
        <>
          <Camp sign={0} />
          <Dog />
        </>
      ),
    },
    {
      cue: "3.built",
      ...cam.orbit({ on: [0.3, 0.4, 0.5], onTo: [0, 0.4, -1.5], dist: 13.5, distTo: 18, yaw: 16, yawTo: 4, pitch: 27, pitchTo: 29, fov: 46 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The same view, and the town arrives: nine houses pop up round him one after another, then a bell, a well and lamps, with villagers hopping out of each as it lands. The dog is the only thing that does not move.",
      stage: (t) => {
        const grow = (i: number) => (i < 9 ? pop(t, BUILT[i], 0.2) : pop(t, 1.5 + (i - 9) * 0.1, 0.2));
        const folk: Array<[Vec3, string, number]> = [
          [[-4.4, 0, -5.4], ROBE.brown, 0],
          [[4.4, 0, -5.2], ROBE.blue, 1],
          [[0, 0, -11.5], ROBE.elder, 2],
          [[-8.6, 0, 2.5], ROBE.white, 3],
          [[8.6, 0, 2.5], ROBE.red, 4],
          [[-9, 0, -9], ROBE.friend, 5],
          [[9, 0, -9], ROBE.farmer, 6],
          [[-9.3, 0, 11.5], ROBE.brown, 7],
          [[9.3, 0, 11.5], ROBE.blue, 8],
        ];
        return (
          <>
            <Camp sign={0} />
            <TownParts grow={grow} />
            <Dog />
            {folk.map(([p, robe, i]) => {
              const at = BUILT[i] + 0.12;
              const toward = go(p, [p[0] * 0.45, 0, p[2] * 0.45], tw(t, at + 0.2, at + 1.6));
              return <Villager key={i} position={[toward.position[0], hop(t, at, 0.6, 0.3), toward.position[2]]} rotationY={toward.rotationY} walk={toward.walk} scale={0.94 * pop(t, at, 0.18)} robe={robe} phase={i} />;
            })}
            {BUILT.map((at, i) => (t > at && t < at + 0.5 ? <Puffs key={i} position={[[-4.4, 4.4, 0, -10.8, 10.8, -13, 13, -11.5, 11.5][i], 0.4, [-9, -9, -17.5, 2.5, 2.5, -17, -17, 11.5, 11.5][i]]} count={6} spread={2.4} size={0.7} rise={2} speed={1.6} seed={i + 2} /> : null))}
          </>
        );
      },
    },
    {
      cue: "3.farmer",
      ...cam.push({ on: [0, 1.05, 1.2], dist: 4.6, to: 4.2, yaw: 68, pitch: 3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side: a farmer in a straw hat leans right down into the dog's face, nose to nose, and peers at him. The dog looks straight through him at the forest and does not blink.",
      stage: (t) => {
        const lean = tw(t, 0.1, 0.55) - 0.4 * tw(t, 1.15, 1.45);
        return (
          <>
            <Camp sign={0} />
            <Life t={t} n={3} creeper={false} />
            <Dog blink={false} />
            <Villager position={[0, 0, 2.05]} rotationY={NORTH} robe={ROBE.farmer} hat="straw" lean={0.3 * lean} nod={0.3 * lean} hmm={t > 0.6 ? 1 : 0} tilt={0.2 * Math.sin(t * 5) * lean} />
          </>
        );
      },
    },
    {
      cue: "3.loaf",
      ...cam.push({ on: [0, 0.92, 0.5], dist: 3.5, to: 3.2, yaw: -8, pitch: 4, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "Straight on. A loaf lands on his head. Then another on top of it. Then another, then another: a leaning tower of four loaves. His eyes go up to look at it. The farmer, at the edge of the frame, nods and waddles off.",
      stage: (t) => {
        const drops = [0.12, 0.42, 0.72, 1.02];
        const lean = Math.sin(t * 6) * 0.05;
        const away = go([-1.25, 0, 0.6], [-4.4, 0, -4], tw(t, 0.9, 3));
        return (
          <>
            <Camp sign={0} />
            <Life t={t} n={2} creeper={false} />
            <Dog
              blink={false}
              mood={t > drops[2] ? "wide" : "calm"}
              headPitch={0.03 * drops.filter((d) => t > d).length + hop(t, drops[0], 0.08, 0.2) + hop(t, drops[1], 0.08, 0.2) + hop(t, drops[2], 0.08, 0.2) + hop(t, drops[3], 0.08, 0.2)}
              onHead={
                <>
                  {drops.map((d, i) => (
                    <Loaf key={i} position={[lean * i * 0.5, i * 0.145 + 0.7 * (1 - tw(t, d - 0.12, d)), 0]} rotation={[0, (i % 2 ? 0.35 : -0.25), lean * i * 0.4]} scale={t > d - 0.12 ? 0.8 : 0} />
                  ))}
                </>
              }
            />
            <Villager position={away.position} rotationY={t > 0.9 ? away.rotationY : 0.95} walk={away.walk} robe={ROBE.farmer} hat="straw" hmm={t < 0.9 ? 1 : 0} />
          </>
        );
      },
    },
    {
      cue: "3.sign",
      ...cam.push({ on: [0.55, 0.9, -0.2], dist: 4.4, to: 4.0, yaw: -4, pitch: 5, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "A sign drops out of the air and thuds into the ground at his shoulder, between two villagers who nod at it. We can read it at once: DO NOT MOVE HIM. HE IS WAITING.",
      stage: (t) => {
        const land = w("3.sign", "sign") - 0.18;
        const y = 2.4 * (1 - tw(t, land - 0.2, land));
        return (
          <>
            <Camp sign={0} />
            {t > land - 0.2 ? <SignPost position={[PLACE.sign[0], y, PLACE.sign[2]]} /> : null}
            <Life t={t} n={2} creeper={false} />
            <Dog onHead={<Loaf scale={0.8} />} headPitch={hop(t, land, 0.12, 0.2)} mood={t > land && t < land + 0.25 ? "shut" : "calm"} />
            <Villager position={[2.1, 0, -1.5]} rotationY={-0.5} robe={ROBE.elder} lookAt={[PLACE.sign[0], 1.3, PLACE.sign[2]]} hmm={t > land ? 1 : 0} />
            <Villager position={[-1.2, 0, -1.7]} rotationY={0.6} robe={ROBE.white} lookAt={[PLACE.sign[0], 1.3, PLACE.sign[2]]} hmm={t > land + 0.15 ? 1 : 0} phase={2} />
            {t > land && t < land + 0.5 ? <Puffs position={[PLACE.sign[0], 0.1, PLACE.sign[2]]} count={6} spread={0.5} size={0.22} rise={0.6} speed={1.8} color="#c9b08a" /> : null}
          </>
        );
      },
    },
    {
      cue: "3.sign",
      cut: w("3.sign", "I"),
      ...cam.push({ on: [0.7, 1.02, 0], dist: 4.0, to: 3.5, yaw: 9, pitch: 3, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "Close: the sign fills the top of the frame, every word of it clear, and under it the dog looks up at it. On 'cannot read' his head tips to one side. On 'my name' his tail goes and his eyes shut: he is pleased.",
      stage: (t) => {
        const c = w("3.sign", "I");
        const tip = w("3.sign", "cannot", c);
        const name = w("3.sign", "name", c) - 0.25;
        return (
          <>
            <Camp />
            <Dog onHead={<Loaf scale={0.8} />} headYaw={0.95} headPitch={-0.15} headTilt={0.38 * tw(t, tip, tip + 0.2)} wag={t > name ? 1 : 0} mood={t > name ? "happy" : "calm"} mouth={t > name ? 0.7 : 0} />
          </>
        );
      },
    },
  ],
});
void SOUTH;

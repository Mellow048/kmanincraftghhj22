import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Boat, Book, Bottle, Bubble, Count, EAST, Emerald, Fill, GoldenApple, Glow, Green, HOUSES, Houses, Lectern, Life, Me, MyRoom, NORTH, PLACE, Puffs, ROBE, SOUTH, Stranger, Town, Villager, WEST, Zombie, hop, pop, posed, timing, tw, w } from "./kit";
import { NOW } from "./scene1";
import { Crew } from "./scene5";

/** 08 — He thinks about it: the wall, the torches, the desk, the boat. It was never his house. */
const RAIDED = { ...NOW, arrows: true };
const DESK = PLACE.desk;
const BEHIND: Vec3 = [DESK[0], 0, DESK[2] - 0.8];
const HIM: Vec3 = [-0.2, 0, 0.75];
const MYDOOR: Vec3 = [HOUSES[0][0], 0, HOUSES[0][1]];

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "I moved into his",
  shots: [
    {
      cue: "8.hero",
      ...cam.push({ on: [0.05, 1.45, 4.3], dist: 6.2, to: 5.6, yaw: 0, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The square. The stranger with both arms up and green sparks coming off him, villagers hopping round him. The teller holds out a book with a price over it: one green stone. The price turns over. It is still one green stone.",
      stage: (t) => {
        const had = w("8.hero", "He") - 0.1;
        return (
          <>
            <Town {...RAIDED} />
            <Stranger position={[0.75, 0, 3.9]} rotationY={SOUTH - 0.3} animation="cheer" face="laugh" />
            <Puffs position={[0.75, 2.2, 3.9]} count={7} spread={0.9} size={0.16} rise={1.2} speed={1.6} color="#39e07a" />
            <Me position={[-0.6, 0, 4.5]} rotationY={SOUTH + 0.5} carry={<Book position={[0, 0.06, 0.02]} />} tilt={t > had ? 0.2 : 0} />
            <group position={[-0.55, 2.3, 4.6]} rotation={[0, tw(t, had, had + 0.3) * Math.PI * 2, 0]}>
              <Count position={[-0.12, 0, 0]} text="1" scale={0.9} />
              <Emerald position={[0.3, 0, 0.02]} scale={1.3} />
            </group>
            {([[-2.0, 2.4], [2.2, 2.6], [-0.4, 1.9]] as Array<[number, number]>).map(([x, z], i) => (
              <Villager key={i} position={[x, hop((t + i * 0.2) % 0.6, 0, 0.35, 0.4), z]} rotationY={SOUTH} robe={[ROBE.brown, ROBE.blue, ROBE.farmer][i]} phase={i} lookAt={[0.75, 1.6, 3.9]} />
            ))}
          </>
        );
      },
    },
    {
      cue: "8.one",
      ...cam.push({ on: [-0.75, 1.2, 0.1], dist: 5.6, to: 5.1, yaw: 6, pitch: 9, fov: 46 }),
      zone: "room",
      look: "overworld-day",
      note: "His desk. The stranger puts down one green stone. Books come off the desk in a stream and into the stranger's arms: one, two, three, four, five.",
      stage: (t) => {
        const give = w("8.one", "everything") - 0.1;
        return (
          <>
            <MyRoom door="flat" desk={1} />
            <Me position={BEHIND} rotationY={SOUTH} carry={<Emerald position={[0, 0.07, 0.02]} scale={0.7} />} />
            <Stranger position={HIM} rotationY={WEST - 0.5} face="grin" pose={posed("idle", t, { armR: [-1.4, 0, 0], armL: [-1.4, 0, 0] })} />
            {Array.from({ length: 5 }, (_, i) => {
              const k = tw(t, give + i * 0.14, give + 0.3 + i * 0.14);
              if (k <= 0) return null;
              const done = k >= 1;
              return (
                <Book
                  key={i}
                  glow={i === 4}
                  position={done ? [HIM[0] - 0.25, 1.05 + i * 0.09, HIM[2] - 0.3] : [BEHIND[0] + (HIM[0] - 0.25 - BEHIND[0]) * k, 1.2 + Math.sin(k * Math.PI) * 0.6, BEHIND[2] + 0.4 + (HIM[2] - 0.3 - BEHIND[2] - 0.4) * k]}
                  rotation={[0, done ? i * 0.3 : t * 9, 0]}
                />
              );
            })}
          </>
        );
      },
    },
    {
      cue: "8.why",
      ...cam.push({ on: [DESK[0] + 0.1, 1.3, DESK[2] - 0.4], dist: 3.9, to: 3.5, yaw: 6, pitch: 5, fov: 42 }),
      zone: "room",
      look: "overworld-day",
      note: "The teller, close, looking down at the one green stone on his sleeves, and then up at us with his head on one side.",
      stage: (t) => (
        <>
          <MyRoom door="flat" desk={1} />
          <Me position={BEHIND} rotationY={SOUTH} carry={<Emerald position={[0, 0.07, 0.02]} scale={0.7} />} nod={t < 0.5 ? 0.5 : 0} tilt={t > 0.5 ? 0.22 : 0} />
        </>
      ),
    },
    {
      cue: "8.list",
      ...cam.push({ on: [DESK[0] + 0.1, 1.35, DESK[2] - 0.5], dist: 3.5, to: 3.0, yaw: -8, pitch: 3, fov: 42 }),
      zone: "room",
      look: "overworld-day",
      note: "Closer. He has stopped looking at us. He is looking at nothing, and thinking, which nobody in this town has had to do before.",
      stage: (t) => (
        <>
          <MyRoom door="flat" desk={1} />
          <Me position={BEHIND} rotationY={SOUTH} turn={0.5 * tw(t, 0.1, 0.6)} nod={-0.2 * tw(t, 0.1, 0.6)} hmm={0.4} />
          <Bubble text="..." position={[BEHIND[0] + 0.5, 2.25, BEHIND[2] + 0.1]} scale={0.5 * pop(t, 0.3, 0.14)} tail={-1} />
        </>
      ),
    },
    {
      cue: "8.wall",
      ...cam.push({ on: [4.6, 1.3, 13.2], dist: 7.6, to: 6.8, yaw: 28, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The wall, from outside, with the arrows still in it.",
      stage: () => <Town {...RAIDED} />,
    },
    {
      cue: "8.torch",
      ...cam.push({ on: [0, 1.5, 14.6], dist: 8.2, to: 7.4, yaw: 180, pitch: 7, fov: 48 }),
      zone: "town",
      look: "overworld-night",
      note: "The torches, at night, from inside the gate: the town bright behind us, and out in the dark beyond the last torch three zombies, standing, not coming any closer.",
      stage: (t) => (
        <>
          <Town {...RAIDED} light />
          <Fill at={[0, 4, 9]} power={40} reach={14} color="#ffd9a0" />
          <Fill at={[0, 4, 19]} power={26} reach={12} color="#a9b8ff" />
          {[-1.6, 0.2, 1.7].map((x, i) => (
            <Zombie key={i} position={[x, 0, 17.4 + (i % 2) * 0.9]} rotationY={NORTH} phase={i} arms={0.6 + Math.sin(t * 2 + i) * 0.1} />
          ))}
        </>
      ),
    },
    {
      cue: "8.desk",
      ...cam.push({ on: [DESK[0], 0.85, DESK[2]], dist: 3.6, to: 3.1, yaw: 12, pitch: 18, fov: 42 }),
      zone: "room",
      look: "overworld-day",
      note: "The desk, and the book on it.",
      stage: () => <MyRoom door="flat" desk={1} />,
    },
    {
      cue: "8.boat",
      ...cam.push({ on: [3.2, 0.5, 10.6], dist: 5.6, to: 5.0, yaw: 204, pitch: 22, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "A boat. It is on dry grass, against the inside of the wall, where it has been all along.",
      stage: () => (
        <>
          <Town {...RAIDED} />
          <Boat position={[3.2, 0, 10.8]} rotationY={1.2} />
        </>
      ),
    },
    {
      cue: "8.house",
      ...cam.pan({ from: [0.6, 2.0, 2.2], on: [HOUSES[0][0], 1.9, HOUSES[0][1]], onTo: [HOUSES[2][0], 1.9, HOUSES[2][1]], fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Over his red cap: he looks at his house. The lens swings with his head along the row to the next one, and the next. The same roof. The same windows. The same house.",
      stage: (t, { p }) => (
        <>
          <Town {...RAIDED} />
          <Me position={[0.6, 0, -1.6]} rotationY={NORTH} turn={0.55 - 1.1 * p} />
        </>
      ),
    },
    {
      cue: "8.same",
      ...cam.truck({ on: [-5, 1.15, -0.5], dist: 7.2, yaw: 0, pitch: 9, fov: 46, by: [10, 0, 0] }),
      zone: "room",
      look: "overworld-day",
      note: "Three rooms in three houses, side by side, and the lens slides along them: in each one the same door, the same bed against the same wall, the same desk, and a villager in a different robe standing in the same place.",
      stage: () => (
        <>
          {[-5, 0, 5].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <MyRoom door="up" bed desk={1} />
              <Villager position={[BEHIND[0], 0, BEHIND[2]]} rotationY={SOUTH} robe={[ROBE.brown, ROBE.blue, ROBE.farmer][i]} phase={i} />
            </group>
          ))}
        </>
      ),
    },
    {
      cue: "8.built",
      ...cam.push({ on: [MYDOOR[0] + 0.4, 2.0, MYDOOR[2] + 1], dist: 12.5, to: 11.5, yaw: 8, pitch: 8, fov: 48 }),
      zone: "field",
      look: "overworld-sunset",
      note: "The same ground with nothing on it, at sunset, long ago. The stranger, alone, jumping and swinging, and a house coming up out of the grass in front of him: that house.",
      stage: (t) => (
        <>
          <Houses n={1} grow={() => tw(t, 0.1, 1.3)} />
          <Stranger position={[MYDOOR[0] + 1.6, Math.abs(Math.sin(t * 8)) * 0.5, MYDOOR[2] + 2.6]} rotationY={NORTH + 0.4} face="grin" pose={posed("idle", t, { armR: [-1.6 + Math.sin(t * 16) * 0.8, 0, 0] })} />
          <Puffs position={[MYDOOR[0], 0.5, MYDOOR[2] + 0.5]} count={8} spread={2.6} size={0.5} rise={1.6} speed={1.8} color="#e9d9c0" />
        </>
      ),
    },
    {
      cue: "8.boats",
      ...cam.push({ on: [0.2, 1.0, 5.6], dist: 8.8, to: 8.0, yaw: 0, pitch: 12, fov: 48 }),
      zone: "town",
      look: "overworld-sunset",
      note: "The town when it was new: no wall, no torches, wheat standing. Two empty boats lie in the square. A third comes sliding in over the grass with the stranger rowing and the old man sitting in the front of it, bolt upright.",
      stage: (t, { dur }) => (
        <>
          <Town bell hole={false} wheat={1} torches={false} wall={false} />
          <Boat position={[-1.9, 0, 3.4]} rotationY={0.5} />
          <Boat position={[1.7, 0, 2.6]} rotationY={-0.8} />
          <Villager position={[-1.9, 0, 1.6]} rotationY={SOUTH} robe={ROBE.brown} lookAt={[0.4, 1.2, 6.4]} />
          <Villager position={[1.9, 0, 0.8]} rotationY={SOUTH} robe={ROBE.blue} lookAt={[0.4, 1.2, 6.4]} phase={2} />
          <Crew t={t} position={[3.4 - (t / dur) * 3.2, 0, 6.4]} rotationY={WEST} old />
        </>
      ),
    },
    {
      cue: "8.apple",
      ...cam.push({ on: [0.7, 1.3, -2.2], dist: 7.4, to: 6.6, yaw: -10, pitch: 7, fov: 46 }),
      zone: "wild",
      look: "overworld-night",
      note: "The burnt hut, at night. The green one stands in front of it. The stranger throws a bottle: it turns over in the air and breaks on him in a grey cloud.",
      stage: (t) => {
        const hit = w("8.apple", "bottle") + 0.15;
        const k = tw(t, hit - 0.45, hit);
        return (
          <>
            <Fill at={[0, 3, 0.5]} power={34} reach={12} color="#c9d0ff" />
            <Green position={[-0.2, 0, -3.4]} rotationY={SOUTH + 0.5} hmm={0.6} lean={0.1} />
            <Stranger position={[1.5, 0, -0.9]} rotationY={NORTH + 0.6} face="brave" pose={posed("idle", t, { armR: [-2.6 + k * 1.6, 0, 0] })} />
            {k > 0 && k < 1 ? <Bottle position={[1.3 - 1.5 * k, 1.9 + Math.sin(k * Math.PI) * 0.9 - 0.6 * k, -1.1 - 2.2 * k]} rotation={[t * 14, 0, 0]} /> : null}
            {t > hit ? <Puffs position={[-0.2, 1.2, -3.3]} count={9} spread={0.8} size={0.3} rise={0.9} speed={1.8} color="#7f8a96" /> : null}
          </>
        );
      },
    },
    {
      cue: "8.gold",
      ...cam.push({ on: [0.12, 1.42, -3.0], dist: 5.0, to: 4.5, yaw: 0, pitch: 3, fov: 42 }),
      zone: "wild",
      look: "overworld-night",
      note: "Close, from the side: a hand holding out an apple made of gold, shining, and the green face looking at it.",
      stage: (t) => (
        <>
          <Fill at={[0, 3, 0.5]} power={34} reach={12} color="#c9d0ff" />
          <Green position={[-0.42, 0, -3.0]} rotationY={EAST - 0.55} nod={0.15} lean={0.12 * tw(t, 0.4, 1)} />
          <Stranger position={[0.72, 0, -3.0]} rotationY={WEST + 0.45} face="smile" gaze={0} pose={posed("idle", t, { armR: [-1.5, 0, 0] })}>
            <GoldenApple position={[0, 0, 0.18]} scale={1.1} />
          </Stranger>
          <Glow position={[0.2, 1.38, -2.8]} size={1.3} color="#ffd95a" opacity={0.45} />
        </>
      ),
    },
    {
      cue: "8.lunch",
      ...cam.push({ on: [-0.4, 1.42, -3.0], dist: 3.6, to: 3.1, yaw: 10, pitch: 3, fov: 42 }),
      zone: "wild",
      look: "overworld-night",
      note: "The green face, chewing, and going less green while it chews, with red sparks coming off it.",
      stage: (t) => (
        <>
          <Fill at={[0, 3, 0.5]} power={34} reach={12} color="#c9d0ff" />
          <Fill at={[0.5, 2.0, -1.2]} power={16} reach={6} color="#ffd9a0" />
          <Green position={[-0.42, 0, -3.0]} rotationY={SOUTH} hmm={1} k={tw(t, 0.1, 0.95)} />
          <Puffs position={[-0.42, 1.2, -2.9]} count={7} spread={0.7} size={0.14} rise={1.1} speed={1.6} color="#d9443a" />
        </>
      ),
    },
    {
      cue: "8.truth",
      ...cam.push({ on: [MYDOOR[0] + 0.3, 1.6, MYDOOR[2] + 3.6], dist: 6.6, to: 5.8, yaw: 0, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The teller in front of the house he has called his for thirty days. He looks back at it over his shoulder. The stranger is on the roof, putting a torch on the chimney.",
      stage: (t) => (
        <>
          <Town {...RAIDED} />
          <Me position={[MYDOOR[0] - 0.3, 0, MYDOOR[2] + 3.6]} rotationY={SOUTH} turn={t < 0.9 ? 1.2 : 0} nod={t < 0.9 ? -0.2 : 0} />
          <Stranger position={[MYDOOR[0] + 1.4, 0, MYDOOR[2] + 1.4]} rotationY={SOUTH - 0.3} animation="wave" face="smile" />
        </>
      ),
    },
    {
      cue: "8.his",
      ...cam.push({ on: [MYDOOR[0] - 0.3, 1.42, MYDOOR[2] + 3.6], dist: 3.4, to: 3.0, yaw: 0, pitch: 3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The teller, close, to us. One small nod.",
      stage: (t) => (
        <>
          <Town {...RAIDED} />
          <Me position={[MYDOOR[0] - 0.3, 0, MYDOOR[2] + 3.6]} rotationY={SOUTH} nod={Math.sin(tw(t, 0.3, 0.9) * Math.PI) * 0.3} />
        </>
      ),
    },
  ],
});
void Life; void Lectern;

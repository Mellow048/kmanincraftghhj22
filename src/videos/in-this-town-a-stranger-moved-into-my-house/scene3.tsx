import { cam, storyScene } from "../../engine";
import { BellOnly, Bits, Bubble, Chest, Chicken, EAST, GlowPick, IronGolem, Life, Loaf, Me, MyRoom, NORTH, OldMan, PLACE, Pickaxe, Puffs, ROBE, SOUTH, Stranger, Sword, Town, Villager, WEST, hop, pop, posed, timing, tw, w } from "./kit";
import { THEN } from "./scene2";

/** 03 — What the stranger did: the bread, the wheat, the bell, the iron man, the hole. */
const HOLE = PLACE.hole;
const RIM: Array<[number, number, string]> = [[-1.15, 0.2, ROBE.brown], [1.15, 0.1, ROBE.blue], [0.2, -1.2, ROBE.farmer]];

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "What he did",
  shots: [
    {
      cue: "3.bread",
      ...cam.push({ on: [-1.3, 1.0, -1.6], dist: 5.6, to: 5.1, yaw: 0, pitch: 12, fov: 44 }),
      zone: "room",
      look: "overworld-day",
      note: "The chest in his room, open, with his loaves in it. The stranger lifts one out. The villager is standing right beside him.",
      stage: (t) => {
        const take = tw(t, 0.35, 0.8);
        return (
          <>
            <MyRoom door="flat" chest={1} bread={take > 0.5 ? 3 : 4} />
            <Stranger position={[-0.6, 0, -1.75]} rotationY={WEST} face="smile" pose={posed("idle", t, { armR: [-1.1 - 0.5 * take, 0, 0] })} headYaw={-0.3 * take}>
              {take > 0.5 ? <Loaf position={[0, 0, 0.2]} scale={0.7} /> : null}
            </Stranger>
            <Me position={[-2.02, 0, -1.2]} rotationY={EAST - 0.3} lookAt={[-0.6, 1.6, -1.75]} />
          </>
        );
      },
    },
    {
      cue: "3.eye",
      ...cam.push({ on: [-1.0, 1.5, -1.1], dist: 4.0, to: 3.6, yaw: 0, pitch: 2, fov: 40 }),
      zone: "room",
      look: "overworld-day",
      note: "The two of them, nose to nose, from the side. He eats the loaf. He does not look away, and neither does the villager.",
      stage: (t) => (
        <>
          <MyRoom door="flat" chest={1} bread={3} />
          <Stranger position={[-0.48, 0, -1.1]} rotationY={WEST} face="smug" gaze={0} pose={posed("idle", t, { armL: [-1.9 + Math.sin(t * 13) * 0.08, 0, 0] })} />
          <Loaf position={[-0.86, 1.47 + Math.sin(t * 13) * 0.02, -1.12]} rotation={[0, 0, 0.2]} scale={0.6} />
          <Me position={[-1.52, 0, -1.1]} rotationY={EAST} />
          {t > 0.3 ? <Bits position={[-0.85, 1.5, -1.05]} t={(t - 0.3) % 0.5} color="#d9a55a" count={4} power={0.5} /> : null}
        </>
      ),
    },
    {
      cue: "3.wheat",
      ...cam.push({ on: [PLACE.field[0] + 0.5, 0.9, PLACE.field[2] + 0.2], dist: 7.2, to: 6.5, yaw: 8, pitch: 14, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The wheat field, tall and gold. The stranger jumps up and down in the middle of it and with every landing more of it is flat. The farmer stands at the edge in his straw hat and watches.",
      stage: (t) => {
        const y = Math.abs(Math.sin(t * 8)) * 0.55;
        const x = PLACE.field[0] - 1.2 + t * 1.5;
        return (
          <>
            <Town {...THEN} wheat={1 - tw(t, 0.15, 1.2)} />
            <Stranger position={[x, y, PLACE.field[2] + 0.4]} rotationY={EAST * 0.6} animation="cheer" face="grin" />
            <Villager position={[PLACE.field[0] + 1.75, 0, PLACE.field[2] + 2.1]} rotationY={WEST - 0.6} robe={ROBE.farmer} hat="straw" lookAt={[x, 1.2 + y, PLACE.field[2] + 0.4]} />
            <Bits position={[x, 0.3, PLACE.field[2] + 0.4]} t={(t * 8) % Math.PI / 8} color="#d9b84a" count={6} power={1.4} />
          </>
        );
      },
    },
    {
      cue: "3.bell",
      ...cam.push({ on: [-0.1, 1.55, -5.0], dist: 6.2, to: 5.7, yaw: 4, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "He hits the bell once. It shrinks and flies into his pocket, and the stand is empty. The old man is standing next to it.",
      stage: (t) => {
        const hit = 0.25;
        const fly = tw(t, hit, hit + 0.45);
        return (
          <>
            <Town {...THEN} bell={t < hit} />
            <Stranger position={[0.35, 0, -4.2]} rotationY={NORTH + 0.2} face="smile" pose={posed("idle", t, { armR: [-2.2 + Math.sin(tw(t, 0.05, hit + 0.15) * Math.PI) * 1.0, 0, 0] })} />
            {t >= hit && fly < 1 ? <BellOnly position={[0.35 * fly, 2.0 - 0.9 * fly + Math.sin(fly * Math.PI) * 0.4, -5.5 + 1.2 * fly]} scale={1.5 - 1.2 * fly} swing={t * 9} /> : null}
            <OldMan position={[-0.85, 0, -4.0]} rotationY={0.7} lookAt={t < hit + 0.3 ? [0, 1.7, -5.5] : [0.35, 1.6, -4.2]} />
          </>
        );
      },
    },
    {
      cue: "3.ding",
      ...cam.push({ on: [-0.1, 1.55, -4.5], dist: 4.9, to: 4.5, yaw: -6, pitch: 4, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "The old man under the empty hook. He opens his mouth: DING. Two villagers walk past behind him and do not look round.",
      stage: (t) => {
        const say = w("3.ding", "ding") - 0.1;
        return (
          <>
            <Town {...THEN} bell={false} />
            <OldMan position={[-0.15, 0, -4.4]} rotationY={SOUTH} hmm={t > say ? 1 : 0} nod={t > say ? -0.2 : 0} />
            <Bubble text="DING" position={[0.45, 2.3, -4.3]} scale={0.55 * pop(t, say, 0.14)} tail={-1} />
            <Villager position={[3.5 - t * 1.3, 0, -7.4]} rotationY={WEST} walk={t * 1.3} robe={ROBE.brown} phase={3} />
            <Villager position={[-3.6 + t * 1.2, 0, -8.2]} rotationY={EAST} walk={t * 1.2} robe={ROBE.blue} phase={4} />
          </>
        );
      },
    },
    {
      cue: "3.hit",
      ...cam.push({ on: [0.55, 1.5, -0.8], dist: 7.0, to: 6.2, yaw: -8, pitch: 6, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "He is chasing a chicken with a sword. The chicken runs between the iron man's feet; the sword does not. It lands on an iron leg with a spark. The iron man's head comes slowly down and round to look at him. He lets go of the sword and shows both hands.",
      stage: (t) => {
        const hit = w("3.hit", "hit") + 0.05;
        const once = w("3.hit", "Once") - 0.1;
        const acc = w("3.hit", "By") - 0.1;
        const back = tw(t, acc, acc + 0.5);
        const swing = Math.sin(tw(t, hit - 0.2, hit + 0.1) * Math.PI);
        return (
          <>
            <Town {...THEN} bell={false} />
            <IronGolem position={[1.0, 0, -1.2]} rotationY={SOUTH} headPitch={0.5 * tw(t, once, once + 0.5)} headYaw={-0.6 * tw(t, once, once + 0.5)} />
            <Chicken position={[-1.6 + t * 3.2, 0, -0.5 - t * 0.4]} rotationY={1.7} />
            <Stranger
              position={[0.05 - back * 0.7, 0, -0.1 + back * 0.6]}
              rotationY={EAST + 0.9}
              face={t > hit ? (t > acc ? "uneasy" : "surprised") : "grin"}
              pose={t > acc ? posed("idle", t, { armR: [-2.6, 0, -0.4], armL: [-2.6, 0, 0.4] }) : posed("idle", t, { armR: [-2.4 + swing * 1.5, 0, 0] })}
            >
              {t < acc ? <Sword /> : null}
            </Stranger>
            {t > hit && t < hit + 0.4 ? <Puffs position={[0.8, 0.8, -0.85]} count={6} spread={0.4} size={0.16} rise={0.5} speed={2.4} color="#fff3b0" /> : null}
          </>
        );
      },
    },
    {
      cue: "3.remember",
      ...cam.push({ on: [0.9, 2.3, -1.2], dist: 3.9, to: 3.4, yaw: 12, pitch: -6, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The iron man's face from below, close. It does not blink. Its head turns, very slowly, following something that is walking away.",
      stage: (t) => (
        <>
          <Town {...THEN} bell={false} />
          <IronGolem position={[1.0, 0, -1.2]} rotationY={SOUTH} headPitch={0.35} headYaw={-0.6 + t * 0.55} />
        </>
      ),
    },
    {
      cue: "3.hole",
      ...cam.push({ on: [HOLE[0], 0.2, HOLE[2]], dist: 7.4, to: 6.2, yaw: 0, pitch: 50, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The middle of the square, from above. He swings a pickaxe at the ground under his own feet and goes down into it, a block at a time, until only the black square is left. Three villagers come and stand round it and look down.",
      stage: (t) => {
        const down = tw(t, 0.3, w("3.hole", "Straight") + 0.3);
        const come = tw(t, w("3.hole", "middle"), w("3.hole", "Straight"));
        return (
          <>
            <Town {...THEN} bell={false} hole={t > 0.3} />
            <Stranger position={[HOLE[0], -2.3 * down, HOLE[2]]} rotationY={SOUTH} face="grin" pose={posed("idle", t, { armR: [-1.2 + Math.sin(t * 16) * 0.8, 0, 0] })} headPitch={0.5}>
              <Pickaxe />
            </Stranger>
            {down < 0.95 ? <Bits position={[HOLE[0], 0.2, HOLE[2]]} t={(t * 2.2) % 0.45} color="#7a5536" count={6} power={1.5} /> : null}
            {RIM.map(([x, z, robe], i) => {
              const from: [number, number] = [x * 3.4, z * 3.4];
              return (
                <Villager key={i} position={[HOLE[0] + from[0] + (x - from[0]) * come, 0, HOLE[2] + from[1] + (z - from[1]) * come]} rotationY={Math.atan2(-x, -z)} walk={come * 2.6} robe={robe} nod={0.55 * come} phase={i + 2} />
              );
            })}
          </>
        );
      },
    },
    {
      cue: "3.pick",
      ...cam.push({ on: [0.35, 1.35, HOLE[2] + 0.1], dist: 6.0, to: 5.3, yaw: 5, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Three days later, at sunset. He comes up out of the hole like a cork and lands beside it, holding a pickaxe over his head that glows purple. The villagers round the hole lean back from it.",
      stage: (t) => {
        const up = tw(t, 0.25, 0.7);
        const y = up < 1 ? -2.2 + 2.2 * up + Math.sin(up * Math.PI) * 1.5 : 0;
        return (
          <>
            <Town {...THEN} bell={false} hole />
            <Stranger position={[HOLE[0] + 0.85 * up, y, HOLE[2] + 0.5 * up]} rotationY={SOUTH} face="grin" pose={posed("idle", t, { armR: [-2.9, 0, -0.15] })}>
              <GlowPick />
            </Stranger>
            {RIM.map(([x, z, robe], i) => (
              <Villager key={i} position={[HOLE[0] + x * 1.25 - (i === 1 ? -0.9 : 0), 0, HOLE[2] + z * 1.2 - (i === 1 ? 0.9 : 0)]} rotationY={Math.atan2(-x, -z)} robe={robe} lean={-0.22 * up} lookAt={[HOLE[0] + 0.85, 2.3, HOLE[2] + 0.5]} phase={i + 2} />
            ))}
          </>
        );
      },
    },
    {
      cue: "3.hiding",
      ...cam.push({ on: [-0.25, 1.4, 4.3], dist: 3.7, to: 3.3, yaw: 4, pitch: 3, fov: 42 }),
      zone: "town",
      look: "overworld-sunset",
      note: "The teller, close, sure of himself: he nods. Behind him the stranger is holding the glowing pickaxe up to the light and turning it over.",
      stage: (t) => (
        <>
          <Town {...THEN} bell={false} hole />
          <Me position={[-0.55, 0, 4.4]} rotationY={SOUTH} nod={Math.sin(tw(t, 0.5, 1.1) * Math.PI) * 0.3} />
          <Stranger position={[0.45, 0, 1.9]} rotationY={SOUTH - 0.4} face="wow" pose={posed("idle", t, { armR: [-2.2 + Math.sin(t * 3) * 0.15, 0, -0.3] })} headPitch={-0.3}>
            <GlowPick />
          </Stranger>
        </>
      ),
    },
  ],
});
void Life; void hop; void Chest;

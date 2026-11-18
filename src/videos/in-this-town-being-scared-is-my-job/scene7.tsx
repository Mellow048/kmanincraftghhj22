import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Barb, Bits, Boat, Bucket, Count, EAST, Farm, Gary, IronGolem, Kevin, Me, NORTH, NewOne, PLACE, Puffs, SOUTH, Under, timing, tw, w } from "./kit";
import { NEW } from "./scene4";
import { STOOD } from "./scene6";

/** 07 — Just us. He follows the water to see the nice place. */
const ME = PLACE.me;
const KEV = PLACE.kevin;
const END = PLACE.end;
const WZ = PLACE.water[2];
/** Where he stands at the end of the water, looking down into it. */
export const BRINK: Vec3 = [END[0] - 0.2, 0, WZ + 1.35];
/** The bucket where it landed on the ledge. */
export const Dropped: React.FC = () => <Bucket position={[1.15, 0, 3.75]} rotation={[0, 0.4, 1.57]} lava={false} />;

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The nice place",
  shots: [
    {
      cue: "7.quiet",
      ...cam.push({ on: [0.3, 1.2, 0.6], dist: 13.5, to: 12.5, yaw: 24, pitch: 14, fov: 46 }),
      zone: "farm",
      look: "overworld-sunset",
      note: "The platform, wide. Three villagers in three rooms, a zombie in a boat, a zombie on a rope with nobody holding the rope, an iron man, and an empty bucket on its side at the edge. Nobody moves.",
      stage: (t) => (
        <>
          <Farm crack={1} />
          <Me position={[0, 0, -0.4]} rotationY={SOUTH} lookAt={[1.2, 0, 4.2]} />
          <Gary position={PLACE.gary} rotationY={SOUTH} lookAt={[1.2, 0, 4.2]} />
          <Barb position={PLACE.barb} rotationY={SOUTH} lookAt={[1.2, 0, 4.2]} />
          <Kevin tagTurn={0.4} turn={-0.9} />
          <NewOne position={NEW} rotationY={NORTH + 0.2} />
          <IronGolem position={STOOD} rotationY={SOUTH} scale={1.12} headPitch={0.1} headYaw={Math.sin(t * 1.5) * 0.3} />
          <Dropped />
        </>
      ),
    },
    {
      cue: "7.broke",
      ...cam.push({ on: [0.5, 1.5, -0.9], dist: 6.6, to: 5.8, yaw: 198, pitch: 8, fov: 46 }),
      zone: "farm",
      look: "overworld-sunset",
      note: "From the north. One iron fist goes through the back of the glass room and the whole pane comes down in bits. The iron man steps aside. The villager walks out over the glass.",
      stage: (t) => {
        const hit = w("7.broke", "broke") - 0.05;
        const out = w("7.broke", "let") - 0.1;
        const k = tw(t, out, out + 0.9);
        return (
          <>
            <Farm crack={1} open={t > hit} />
            <Bits position={[0, 1.3, -0.95]} t={t - hit} color="#dff4ff" count={16} power={2.6} toward={[0, 0.4, -1]} />
            <IronGolem position={[1.25 * tw(t, hit + 0.2, out), 0, STOOD[2]]} rotationY={SOUTH} scale={1.12} armR={t < hit + 0.25 ? -1.5 : undefined} headPitch={0.3} />
            <Me position={[0, 0, -0.4 - 1.5 * k]} rotationY={NORTH} walk={k * 1.5} />
            <Gary position={PLACE.gary} rotationY={NORTH} />
            <Barb position={PLACE.barb} rotationY={NORTH} />
            <Kevin />
          </>
        );
      },
    },
    {
      cue: "7.legs",
      ...cam.push({ on: [0.2, 1.1, 2.4], onTo: [0.95, 0.85, 2.6], dist: 5.6, to: 4.2, yaw: 30, pitch: 7, fov: 46 }),
      zone: "farm",
      look: "overworld-sunset",
      note: "Kevin stands up in his boat, steps out of it, and his legs go in two different directions. He ends up sitting on the stone beside it, pleased with himself.",
      stage: (t) => {
        const fall = w("7.legs", "legs") - 0.05;
        const k = tw(t, 0.15, fall);
        const down = tw(t, fall + 0.25, fall + 0.6);
        return (
          <>
            <Farm crack={1} open />
            <Kevin boat={false} position={[0.2 + 0.9 * k, -0.42 * (1 - k) - 0.5 * down, KEV[2] + 0.75 * k]} face={Math.PI - 2.4 * k} walk={k < 1 ? k * 1.6 : 0} tilt={Math.sin(t * 13) * 0.25 * (1 - down)} tagTurn={0.5} tag={false} mood="happy" wave={down} />
            <Boat position={KEV} rotationY={Math.PI / 2} />
            <NewOne position={NEW} rotationY={EAST} turn={0.3} />
            <Me position={[0.5, 0, 0.2]} rotationY={SOUTH} lookAt={[1.1, 1.2, 2.7]} />
          </>
        );
      },
    },
    {
      cue: "7.follow",
      ...cam.truck({ on: [1.3, 1.1, WZ + 1.3], dist: 3.1, yaw: 20, pitch: 8, fov: 46, by: [4.0, 0, 0] }),
      zone: "farm",
      look: "overworld-sunset",
      note: "The villager walks along the edge of the channel, the way the water runs, and the lens goes with him. He is looking ahead, and he is hopeful.",
      stage: (t, { p }) => (
        <>
          <Farm crack={1} open />
          <Me position={[1.0 + p * 4.2, 0, WZ + 1.3]} rotationY={EAST} walk={p * 4.2} />
        </>
      ),
    },
    {
      cue: "7.end",
      ...cam.push({ on: [END[0] - 0.1, 0.7, WZ + 0.5], dist: 6.0, to: 5.0, yaw: 14, pitch: 34, fov: 44 }),
      zone: "farm",
      look: "overworld-sunset",
      note: "The end of the channel, from above. The water runs over a lip and into a square hole, and the hole is orange and bright. He stands at the brink of it with the light coming up on his face.",
      stage: (t) => (
        <>
          <Farm crack={1} open />
          <Me position={BRINK} rotationY={NORTH + 0.1} nod={0.55 * tw(t, 0.2, 0.7)} />
          <Puffs position={[END[0], 0.2, WZ]} count={5} spread={0.5} size={0.18} rise={1.0} speed={1.2} color="#ffb040" />
        </>
      ),
    },
    {
      cue: "7.list",
      ...cam.push({ on: [0, 0.95, -0.6], dist: 3.8, to: 3.2, yaw: 10, pitch: 22, fov: 44 }),
      zone: "under",
      look: "overworld-day",
      note: "The chest, open, from above, as each thing is named: the chest; iron in it; one red flower on the iron.",
      stage: (t) => {
        const iron = w("7.list", "iron") - 0.08;
        const fl = w("7.list", "flowers") - 0.08;
        return <Under open={1} iron={t > iron ? 6 : 0} flower={t > fl} />;
      },
    },
    {
      cue: "7.count",
      ...cam.push({ on: [2.3, 1.9, 0.3], dist: 4.6, to: 3.8, yaw: 8, pitch: 5, fov: 44 }),
      zone: "farm",
      look: "overworld-sunset",
      note: "Barb, and the number over her head. It turns back by one: 911. She takes her eyes off it.",
      stage: (t) => (
        <>
          <Farm crack={1} open />
          <Barb position={PLACE.barb} rotationY={SOUTH} nod={t < 0.7 ? -0.45 : 0.4} />
          <Count position={[2.3, 3.0, 1.1]} text={t > 0.35 ? "911" : "912"} scale={0.8} />
        </>
      ),
    },
    {
      cue: "7.job",
      ...cam.push({ on: [BRINK[0], 1.5, BRINK[2]], dist: 3.4, to: 2.9, yaw: 196, pitch: 4, fov: 42 }),
      zone: "farm",
      look: "overworld-sunset",
      note: "His face at the brink, lit orange from underneath. He looks up from the fire, at us.",
      stage: (t) => (
        <>
          <Farm crack={1} open />
          <Me position={BRINK} rotationY={NORTH + 0.1} nod={0.5 - 0.5 * tw(t, 0.25, 0.7)} />
        </>
      ),
    },
    {
      cue: "7.parts",
      ...cam.push({ on: [1.4, 0, -1.2], dist: 19, to: 16.5, yaw: 20, pitch: 46, fov: 44 }),
      zone: "farm",
      look: "overworld-sunset",
      note: "The whole platform from high above, and from here it is plain what it is: three boxes with a villager in each, a zombie for them to look at, a pad, a channel, a fire, a pipe. Not a town. A machine.",
      stage: () => (
        <>
          <Farm crack={1} open />
          <Me position={BRINK} rotationY={NORTH + 0.1} nod={0.3} />
          <Gary position={PLACE.gary} rotationY={SOUTH} />
          <Barb position={PLACE.barb} rotationY={SOUTH} />
          <Kevin boat={false} tag={false} position={[1.1, -0.5, 2.75]} face={Math.PI} />
          <Boat position={KEV} rotationY={Math.PI / 2} />
          <NewOne position={NEW} rotationY={NORTH + 0.2} />
          <IronGolem position={[0.9, 0, STOOD[2]]} rotationY={EAST} scale={1.12} />
          <Dropped />
        </>
      ),
    },
  ],
});
void ME;

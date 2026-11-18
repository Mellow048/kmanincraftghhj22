import type React from "react";
import { cam, storyScene } from "../../engine";
import { Carrot, Clock, DEG, Fish, FishBucket, Him, Llamas, Loaf, SOUTH, SPOT, Shop, SlimeBall, Square, Vendor, front, go, hop, left, sideYaw, stallOf, timing, tw, w } from "./kit";
import type { Who } from "./kit";

/** 03 — A town of salesmen. He shows each of them something. Each of them shows him something back. */

/** The same picture three times: him in front of a shop with a thing held out, the owner behind it holding out his own. */
const pitchCam = (who: Who, flip: number) => {
  const f = front(who, 1.0);
  const [sx, , sz] = stallOf(who);
  const on: [number, number, number] = [sx + (f.position[0] - sx) * 0.125, 1.3, sz + (f.position[2] - sz) * 0.125];
  return { on, dist: 7.6, to: 7.0, yaw: sideYaw(who, flip), pitch: 4, fov: 46 };
};
const pitchStage = (t: number, cue: string, who: Who, said: string, mine: React.ReactNode, his: React.ReactNode, flip: number) => {
  const f = front(who, 1.0);
  const up = tw(t, w(cue, said) - 0.15, w(cue, said) + 0.1);
  return (
    <>
      <Square t={t} folk={0} away={[who]} />
      <Vendor who={who} goods lookAt={[f.position[0], 1.6, f.position[2]]} carry={<group position={[0, 0.05 + 0.3 * up + hop(t, w(cue, said) - 0.1, 0.12, 0.25), 0.02]}>{his}</group>} strain={up} />
      <Him cue={cue} t={t} position={f.position} rotationY={f.rotationY} face={sideYaw(who, flip) * DEG} carry={<group position={[0, 0.3, 0.02]}>{mine}</group>} strain={1 - 0.6 * up} nod={0.3 * up} clockScale={0.5} />
    </>
  );
};

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "A town of salesmen",
  shots: [
    {
      cue: "3.town",
      ...cam.push({ on: [0, 1.0, 1.0], dist: 13.5, to: 12, yaw: -24, pitch: 24, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The square from above: three shops with striped roofs, a villager behind each, bread, fish and carrots laid out. He sets off across it with his bucket.",
      stage: (t, { dur }) => (
        <>
          <Square t={t} folk={5} />
          <Llamas t={t} />
          <Shop fish={false} />
          <Him cue="3.town" t={t} {...go(SPOT.me, [-1.6, 0, 0.6], t / dur)} face={-24 * DEG} carry={<FishBucket position={[0, 0.05, 0.02]} />} clockScale={0.9} />
        </>
      ),
    },
    {
      cue: "3.baker",
      ...cam.push(pitchCam("baker", 1)),
      zone: "town",
      look: "overworld-day",
      note: "At the baker's shop, from the side. He holds his fish bucket up. The baker looks at it, and lifts a loaf up level with it.",
      stage: (t) => pitchStage(t, "3.baker", "baker", "bread", <FishBucket />, <Loaf />, 1),
    },
    {
      cue: "3.fisher",
      ...cam.push(pitchCam("fisher", -1)),
      zone: "town",
      look: "overworld-day",
      note: "The same picture, mirrored, at the fisherman's. He holds up the bucket. The fisherman lifts a fish as long as his arm.",
      stage: (t) => pitchStage(t, "3.fisher", "fisher", "his", <FishBucket />, <Fish scale={1.5} />, -1),
    },
    {
      cue: "3.same",
      ...cam.push({ on: [stallOf("fisher")[0] - 0.05, 1.3, stallOf("fisher")[2] + 0.1], dist: 4.6, to: 4.2, yaw: sideYaw("fisher", -1), pitch: 10, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The two fish, close, side by side over the table: his small orange one in its bucket, and the fisherman's, three times the size. He looks from one to the other.",
      stage: (t) => {
        const f = front("fisher", 1.0);
        return (
          <>
            <Square t={t} folk={0} away={["fisher"]} />
            <Vendor who="fisher" lookAt={[f.position[0], 1.6, f.position[2]]} carry={<Fish position={[0, 0.35, 0.02]} scale={1.5} />} strain={1} />
            <Him cue="3.same" t={t} position={f.position} rotationY={f.rotationY} carry={<FishBucket position={[0, 0.3, 0.02]} />} strain={0.5} nod={0.45} clock={false} />
          </>
        );
      },
    },
    {
      cue: "3.farmer",
      ...cam.push(pitchCam("farmer", 1)),
      zone: "town",
      look: "overworld-day",
      note: "At the farmer's, the slime ball this time. The farmer in his straw hat looks at it for a long second, then holds up a carrot.",
      stage: (t) => pitchStage(t, "3.farmer", "farmer", "carrot", <SlimeBall />, <Carrot scale={1.3} />, 1),
    },
    {
      cue: "3.salesmen",
      ...cam.push({ on: [0, 0.9, 1.8], dist: 12, to: 10.5, yaw: 0, pitch: 34, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From above. He is back in the middle. All three of them hold their goods out toward him from behind their shops, and he turns from one to the next. Nobody has an emerald in his hands.",
      stage: (t) => (
        <>
          <Square t={t} folk={4} away={["baker", "fisher", "farmer"]} />
          <Vendor who="baker" lookAt={[0, 1.6, 3]} carry={<Loaf position={[0, 0.3 + 0.08 * Math.sin(t * 7), 0.02]} />} strain={1} />
          <Vendor who="fisher" lookAt={[0, 1.6, 3]} carry={<Fish position={[0, 0.3 + 0.08 * Math.sin(t * 7 + 2), 0.02]} scale={1.3} />} strain={1} />
          <Vendor who="farmer" lookAt={[0, 1.6, 3]} carry={<Carrot position={[0, 0.3 + 0.08 * Math.sin(t * 7 + 4), 0.02]} scale={1.3} />} strain={1} />
          <Llamas t={t} />
          <Shop />
          <Him cue="3.salesmen" t={t} rotationY={SOUTH + Math.sin(t * 2.6) * 1.4} clockScale={1.0} />
        </>
      ),
    },
    {
      cue: "3.clock",
      ...cam.push({ on: [0, 1.75, 3.0], dist: 3.9, to: 3.4, yaw: 6, pitch: -8, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The clock, close, from under his chin: 31:01, 31:00. His eyes go up to it.",
      stage: (t) => (
        <>
          <Square t={t} folk={0} />
          <Him cue="3.clock" t={t} rotationY={SOUTH} face={6 * DEG} nod={-0.5} clock={false} />
          <Clock position={[0, 2.55, 3]} sec={left("3.clock", t)} scale={0.72} rotationY={6 * DEG} />
        </>
      ),
    },
  ],
});

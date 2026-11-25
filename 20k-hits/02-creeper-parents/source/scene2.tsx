import { cam, storyScene } from "../../engine";
import { Chicken, Creeper, Creeps, Dad, Desk, EAST, Fish, GROUND_SIT, Hero, Mum, NORTH, PLACE, SOUTH, TABLE_LONG, Table, WEST, bolt, cueLen, openArms, sitPose, timing, tw, w } from "./kit";

/** 02 — What it is like: the table, the school, the street, and the one thing he wants. */
const T = PLACE.table;
const S = PLACE.school;
const WALK = 2.4;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "From over there",
  shots: [
    {
      cue: "2.why",
      ...cam.push({ on: [1.3, 1.1, 3.6], dist: 3.6, to: 3.1, yaw: -8, pitch: -3, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "One creeper, close, minding its own business. Behind its shoulder the cat kid walks up with a paw in the air. On 'cats' the creeper's mouth falls open, it jumps a foot in the air and it is gone past the lens.",
      stage: (t) => {
        const at = w("2.why", "cats") - 0.1;
        const k = tw(t, 0, at);
        const cat: [number, number, number] = [1.95, 0, 1.2 + k * 1.5];
        const b = bolt([0.95, 0, 3.9], [1.9, 0, 2.6], t, at, 0, 8, SOUTH - 0.15);
        return (
          <>
            <Creeper position={b.position} rotationY={b.rotationY} walk={b.walk} lean={b.lean} scarf="#7a4fb0" mood={t > at - 0.35 ? "scared" : "calm"} turn={t > at - 0.35 && !b.gone ? -1.0 : 0} />
            <Hero position={cat} rotationY={SOUTH} animation={k < 1 ? "walk" : "wave"} animDistance={k * 1.5} arms={k < 1 ? "wave" : undefined} tailUp={1} face="grin" />
          </>
        );
      },
    },
    {
      cue: "2.knows",
      ...cam.orbit({ on: [3.6, 1.1, 2.2], dist: 4.0, yaw: 22, yawTo: 4, pitch: 3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "Two creepers, face to face. One tips its head at the other: why? The other tips its head back. On 'not even' both turn and look at us. They have no idea.",
      stage: (t) => {
        const us = tw(t, w("2.knows", "not"), w("2.knows", "not") + 0.25);
        return (
          <>
            <Creeper position={[3.12, 0, 2.2]} rotationY={EAST - us * 1.2} tilt={0.3 * (1 - us) * Math.sin(t * 4)} scarf="#e07a2e" hat="straw" phase={1} />
            <Creeper position={[4.08, 0, 2.2]} rotationY={WEST + us * 1.2} tilt={-0.3 * (1 - us) * Math.sin(t * 4 + 1.5)} scarf="#3f6fc2" color="#4aa53f" phase={2.4} />
          </>
        );
      },
    },
    {
      cue: "2.table",
      ...cam.push({ on: [T[0], 1.0, T[2] - TABLE_LONG / 2 - 0.5], dist: 2.6, to: 13, yaw: 0, pitch: 8, fov: 54 }),
      zone: "town",
      look: "overworld-day",
      note: "Dinner in the yard. The camera starts close on mum and dad at the head of the table and pulls back along it, plank after plank after plank, until the back of his head comes into the frame at the other end, with one fish.",
      stage: (t) => (
        <>
          <Table position={T} length={TABLE_LONG} />
          <Mum position={[T[0] - 0.42, 0, T[2] - TABLE_LONG / 2 - 0.55]} rotationY={SOUTH} mood="happy" lookAt={[T[0], 1.0, T[2] + TABLE_LONG / 2]} />
          <Dad position={[T[0] + 0.42, 0, T[2] - TABLE_LONG / 2 - 0.6]} rotationY={SOUTH} nod={Math.max(0, Math.sin(t * 6)) * 0.3} />
          <Hero position={[T[0], -0.05, T[2] + TABLE_LONG / 2 + 0.5]} rotationY={NORTH} animation="sit" face="frown" tailUp={0.2} />
          <Fish position={[T[0], 0.86, T[2] + TABLE_LONG / 2 - 0.45]} rotation={[-Math.PI / 2, 0, 0.5]} scale={1.2} />
        </>
      ),
    },
    {
      cue: "2.school",
      ...cam.pan({ from: [0.1, 2.7, -8.0], on: [0, 0.7, -15.2], onTo: [4.6, 1.0, S[2] + 0.2], fov: 48, fovTo: 26 }),
      zone: "town",
      look: "overworld-day",
      note: "School, outside. Six little creepers are packed into the two front rows by the board. Then three empty rows. Then him. On 'door' the camera swings to the wall: a small door of his own, with a paw over it.",
      stage: (t) => (
        <>
          {[-18.4, -17.4, -16.4, -15.4, -14.4].map((z) => [-1.25, 0, 1.25].map((x) => <Desk key={`${z}${x}`} position={[x, 0, z]} />))}
          <Desk position={[0, 0, -12.5]} />
          <Creeps spots={[-18.4, -17.4].flatMap((z) => [-1.25, 0, 1.25].map((x) => [x + 0.05, z + 0.55, NORTH] as [number, number, number]))} t={t} lookAt={[0, 1, -8]} mood="scared" shake={0.01} first={4} />
          <Creeper position={[-1.7, 0, S[2] + 1.1]} rotationY={SOUTH} hat="straw" scarf="#c23a2e" lookAt={[0, 1, -11.7]} mood="scared" />
          <Hero position={[0, 0, -11.95]} rotationY={NORTH} animation="idle" face="frown" tailUp={0.3} />
        </>
      ),
    },
    {
      cue: "2.street",
      ...cam.push({ on: [0, 1, 5], dist: 10.5, to: 12, yaw: 0, pitch: 26, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From above and behind: he walks up the middle of the street, and it empties ahead of him. Each creeper jumps and dives off to the side as he gets near, like a zip opening.",
      stage: (t) => {
        const z = 13.5 - t * WALK;
        return (
          <>
            <Hero position={[0, 0, z]} rotationY={NORTH} animation="walk" animDistance={t * WALK} tailUp={0.7} />
            {Array.from({ length: 16 }, (_, i) => {
              const cz = 9.5 - i * 1.25;
              const cx = (i % 2 ? 1 : -1) * (0.55 + (i % 3) * 0.35);
              const b = bolt([cx, 0, cz], [0, 0, cz], t, (13.5 - 4.2 - cz) / WALK, 0, 7.5, i % 3 ? SOUTH : NORTH);
              return <Creeper key={i} position={b.position} rotationY={b.rotationY} walk={b.walk} lean={b.lean} mood={b.gone ? "scared" : "calm"} scarf={i % 3 ? ["#7a4fb0", "#e07a2e", "#e0b83a", "#3f6fc2"][i % 4] : undefined} hat={i % 5 === 2 ? "straw" : "none"} scale={i % 6 === 4 ? 0.62 : 0.95} phase={i} />;
            })}
          </>
        );
      },
    },
    {
      cue: "2.never",
      ...cam.orbit({ on: [-4.0, 0.62, 5.1], dist: 3.6, yaw: -24, yawTo: 14, pitch: 9, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "He sits on the grass and shows us his paws: on 'scratch' he turns them over, on 'bite' he shows his teeth in a smile. On 'chicken' a chicken walks right up to him and pecks at his foot, and he does nothing at all. Behind him a creeper watches the whole thing with its mouth open.",
      stage: (t) => {
        const hen = w("2.never", "never");
        const k = tw(t, hen, hen + cueLen("2.never") - hen - 0.5);
        const show = tw(t, 0.15, 0.4) - tw(t, w("2.never", "bite") + 0.5, w("2.never", "bite") + 0.8);
        return (
          <>
            <Hero
              position={[-4.0, GROUND_SIT, 5.0]}
              rotationY={SOUTH - 0.1}
              pose={sitPose(t, { armR: [-1.1 * show - 0.3, 0, 0.35 * show], armL: [-1.1 * show - 0.3, 0, -0.35 * show] })}
              face={t > w("2.never", "bite") - 0.1 && t < hen ? "grin" : "calm"}
              headYaw={-0.5 * k}
              headPitch={0.3 * k}
             
            />
            <Chicken position={[-5.7 + k * 1.42, 0, 5.8]} rotationY={EAST} scale={1.1} />
            <Creeper position={[-4.55, 0, 2.4]} rotationY={SOUTH} mood="scared" lookAt={[-4, 0.8, 5.0]} scarf="#e0b83a" />
          </>
        );
      },
    },
    {
      cue: "2.hug",
      ...cam.push({ on: [0, 1.0, 9], dist: 3.9, to: 2.9, yaw: 0, pitch: -3, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "He stands in the empty street with his arms held wide open, looking hopeful. Far behind him three creepers tiptoe away backwards.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 9]} rotationY={SOUTH} pose={openArms(t, tw(t, 0.1, 0.6))} face="smile" tailUp={0.5 + 0.2 * Math.sin(t * 3)} />
          <Creeps spots={[[-1.6, 2.5], [1.4, 1.2], [0.2, -0.6]]} t={t} face={SOUTH} walk={t * 0.9} shift={[0, 0, -t * 0.9]} mood="scared" lookAt={[0, 1.2, 9]} first={2} />
        </>
      ),
    },
  ],
});

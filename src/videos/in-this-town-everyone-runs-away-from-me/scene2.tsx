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
      ...cam.push({ on: [1.2, 1.15, 4], dist: 3.2, to: 2.6, yaw: -24, pitch: -3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "Close on one creeper from below. An orange ear and a tail go by at the bottom of the frame; on 'cats' the creeper jumps a foot in the air and is gone.",
      stage: (t) => {
        const at = w("2.why", "cats") - 0.1;
        const cat: [number, number, number] = [-1.6 + t * 1.6, 0, 5.4];
        const b = bolt([1.2, 0, 4], [0.2, 0, 5.4], t, at, 0, 8, SOUTH - 0.3);
        return (
          <>
            <Creeper position={b.position} rotationY={b.rotationY} walk={b.walk} lean={b.lean} scarf="#7a4fb0" mood={t > at - 0.4 ? "scared" : "calm"} lookAt={b.gone ? undefined : [cat[0], 1.1, cat[2]]} />
            <Hero position={cat} rotationY={EAST} animation="walk" animDistance={t * 1.6} tailUp={1} face="smile" />
          </>
        );
      },
    },
    {
      cue: "2.knows",
      ...cam.orbit({ on: [3.6, 1.1, 2.2], dist: 3.6, yaw: 22, yawTo: 4, pitch: 3, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "Two creepers, face to face. One tips its head at the other: why? The other tips its head back. On 'not even' both turn and look at us. They have no idea.",
      stage: (t) => {
        const us = tw(t, w("2.knows", "not"), w("2.knows", "not") + 0.25);
        return (
          <>
            <Creeper position={[2.95, 0, 2.2]} rotationY={EAST - us * 1.2} tilt={0.3 * (1 - us) * Math.sin(t * 4)} scarf="#e07a2e" hat="straw" phase={1} />
            <Creeper position={[4.25, 0, 2.2]} rotationY={WEST + us * 1.2} tilt={-0.3 * (1 - us) * Math.sin(t * 4 + 1.5)} scarf="#3f6fc2" color="#4aa53f" phase={2.4} />
          </>
        );
      },
    },
    {
      cue: "2.table",
      ...cam.truck({ on: [T[0], 0.95, T[2] - TABLE_LONG / 2 - 0.3], dist: 4.3, yaw: 78, pitch: 6, fov: 42, by: [0, 0, TABLE_LONG + 0.9] }),
      zone: "town",
      look: "overworld-day",
      note: "Dinner in the yard. The camera starts on mum and dad at one end of the table and slides along it, plank after plank after plank, to the other end, where he sits alone with one fish.",
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
      ...cam.pan({ from: [3.6, 2.7, -8.6], on: [0, 0.8, -14.2], onTo: [4.6, 1.0, S[2] + 0.2], fov: 46, fovTo: 26 }),
      zone: "town",
      look: "overworld-day",
      note: "School, outside. Eight little creepers are packed into the two front rows by the board. Then three empty rows. Then him. On 'door' the camera swings to the wall: a small door of his own, with a paw over it.",
      stage: (t) => (
        <>
          {[-18.3, -17.2, -16.1, -15.0, -13.9].map((z) => [-2.7, -0.9, 0.9, 2.7].map((x) => <Desk key={`${z}${x}`} position={[x, 0, z]} />))}
          <Desk position={[0, 0, -12.3]} />
          <Creeps spots={[-18.3, -17.2].flatMap((z) => [-2.7, -0.9, 0.9, 2.7].map((x) => [x + 0.05, z + 0.55, NORTH] as [number, number, number]))} t={t} lookAt={[0, 1, -8]} mood="scared" shake={0.01} first={4} />
          <Creeper position={[-2.3, 0, S[2] + 1.1]} rotationY={SOUTH} hat="straw" scarf="#c23a2e" lookAt={[0, 1, -11.7]} mood="scared" />
          <Hero position={[0, 0, -11.75]} rotationY={NORTH} animation="idle" face="frown" tailUp={0.3} />
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
      ...cam.orbit({ on: [-3.0, 0.62, 13.2], dist: 3.3, yaw: -34, yawTo: 16, pitch: 9, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "He sits on the grass and shows us his paws: on 'scratch' he turns them over, on 'bite' he shows his teeth in a smile. On 'chicken' a chicken walks right up to him and pecks at his foot, and he does nothing at all. A creeper watches from behind a cactus.",
      stage: (t) => {
        const hen = w("2.never", "never");
        const k = tw(t, hen, hen + cueLen("2.never") - hen - 0.5);
        const show = tw(t, 0.15, 0.4) - tw(t, w("2.never", "bite") + 0.5, w("2.never", "bite") + 0.8);
        return (
          <>
            <Hero
              position={[-3.0, GROUND_SIT, 13.2]}
              rotationY={SOUTH - 0.1}
              pose={sitPose(t, { armR: [-1.1 * show - 0.3, 0, 0.35 * show], armL: [-1.1 * show - 0.3, 0, -0.35 * show] })}
              face={t > w("2.never", "bite") - 0.1 && t < hen ? "grin" : "calm"}
              headYaw={-0.5 * k}
              headPitch={0.3 * k}
             
            />
            <Chicken position={[-5.2 + k * 1.75, 0, 13.9 + k * 0.1]} rotationY={EAST} scale={1.1} />
            <Creeper position={[-3.75, 0, 15.9]} rotationY={NORTH + 0.3} mood="scared" lookAt={[-3, 0.8, 13.2]} scarf="#e0b83a" lean={0.2} />
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

import { Block, cam, storyScene } from "../../engine";
import { Creeper, Creeps, Dad, Fish, GROUND_SIT, Heart, Hero, Little, Mum, NORTH, PLACE, SOUTH, SQUARE, SoundRings, SubscribeSign, TABLE_SHORT, Table, bolt, cueLen, openArms, posed, sitPose, timing, tw, w } from "./kit";

/** 06 — One whole second. And now: turns, a shorter table, and the little one. */
const ME: [number, number, number] = [0, 0, -4];
/** Nine blocks south of him. */
const LINE = 5;
/** Where mum stands to lean on him. */
const HUG: [number, number, number] = [0, 0, -3.15];
const T = PLACE.table;
const BACK = SQUARE.map(([x, z]) => [x * 0.85, LINE + 0.6 - z] as [number, number]);
const SITS: [number, number, number] = [-1.2, 0, -3.2];

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "One whole second",
  shots: [
    {
      cue: "6.morning",
      ...cam.push({ on: [0, 1.0, 1.5], dist: 9.5, to: 8.5, yaw: 180, pitch: 10, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Morning light. From behind him: he stands alone in the square, and at the far end of the street the whole town comes walking back, slowly, in a bunch, mum and dad in front.",
      stage: (t) => {
        const k = 1 - tw(t, 0, cueLen("6.morning"));
        return (
          <>
            <Hero position={ME} rotationY={SOUTH} animation="idle" tailUp={0.6} />
            <Creeps spots={BACK} t={t} face={NORTH} walk={(1 - k) * 4.5} shift={[0, 0, k * 4.5]} lookAt={[0, 1, -4]} />
            <Mum position={[-0.8, 0, LINE + k * 4.5]} rotationY={NORTH} walk={(1 - k) * 4.5} />
            <Dad position={[0.9, 0, LINE + 0.2 + k * 4.5]} rotationY={NORTH} walk={(1 - k) * 4.5} />
          </>
        );
      },
    },
    {
      cue: "6.nine",
      ...cam.push({ on: [0, 0, 0.1], dist: 11.5, to: 12.5, yaw: 180, pitch: 52, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "From high above: him at the bottom of the frame, the town at the top, and nine empty blocks of street between them, counted off in white lines. Nobody moves.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={SOUTH} animation="idle" tailUp={0.6} />
          <Creeps spots={BACK} t={t} face={NORTH} lookAt={[0, 1, -4]} shake={0.006} />
          <Mum position={[-0.8, 0, LINE]} rotationY={NORTH} />
          <Dad position={[0.9, 0, LINE + 0.2]} rotationY={NORTH} />
          {Array.from({ length: 9 }, (_, i) =>
            t < w("6.nine", "Nine") - 0.15 + i * 0.07 ? null : (
              <Block key={i} position={[0, 0.06, -3.2 + i * 0.94]} size={[2.6, 0.05, 0.14]} color="#fff6d8" emissive="#fff6d8" emissiveIntensity={0.5} castShadow={false} />
            ),
          )}
        </>
      ),
    },
    {
      cue: "6.step",
      ...cam.push({ on: [-0.5, 1.1, LINE - 0.3], onTo: [-0.2, 1.1, LINE - 1.6], dist: 4.6, to: 4.2, yaw: 162, pitch: 4, fov: 42 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Mum, out in front of the town. On 'one step' she takes one. She stops. On 'one more' she takes another. Dad and the whole town lean after her and stay where they are.",
      stage: (t) => {
        const a = w("6.step", "one");
        const b = w("6.step", "one", 0, 1);
        const k = tw(t, a - 0.15, a + 0.25) + tw(t, b - 0.15, b + 0.25);
        return (
          <>
            <Mum position={[-0.8 + k * 0.2, 0, LINE - k * 0.9]} rotationY={NORTH} walk={k * 0.9} mood="scared" lookAt={[0, 1, -4]} />
            <Dad position={[0.9, 0, LINE + 0.2]} rotationY={NORTH} mood="scared" lean={0.12} lookAt={[-0.6, 1.3, LINE - 1.5]} />
            <Creeps spots={BACK} t={t} face={NORTH} lookAt={[-0.6, 1.3, LINE - 1.5]} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.shake",
      ...cam.push({ on: [0.1, 1.2, -1.6], dist: 2.9, to: 2.4, yaw: 205, pitch: 0, fov: 38 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Close on her face as she comes: her bow is shaking, her scarf is shaking, all of her is shaking. She keeps coming.",
      stage: (t) => (
        <>
          <Mum position={[0.1 + Math.sin(t * 48) * 0.022, 0, -1.2 - t * 0.5]} rotationY={NORTH} walk={t * 0.5} mood="scared" tilt={Math.sin(t * 37) * 0.05} />
        </>
      ),
    },
    {
      cue: "6.arms",
      ...cam.push({ on: [0, 0.95, -3.6], dist: 3.6, to: 3.0, yaw: 76, pitch: 3, fov: 40 }),
      zone: "town",
      look: "overworld-sunset",
      note: "From the side: he holds both arms open and does not move. She stands in front of him, with no arms at all. On 'leaned' she tips forward, slowly, until her head is on his shoulder.",
      stage: (t) => {
        const k = tw(t, w("6.arms", "So") + 0.1, w("6.arms", "leaned") + 0.25);
        return (
          <>
            <Hero position={ME} rotationY={SOUTH} pose={openArms(t, 1 - k * 0.35)} face={k > 0.9 ? "wow" : "smile"} tailUp={0.5} blink={false} />
            <Mum position={[HUG[0] + Math.sin(t * 48) * 0.012 * (1 - k), 0, HUG[2]]} rotationY={NORTH} mood="scared" lean={k * 0.34} />
          </>
        );
      },
    },
    {
      cue: "6.second",
      ...cam.push({ on: [0, 1.05, -3.6], dist: 3.0, to: 2.7, yaw: -68, pitch: 2, fov: 40 }),
      zone: "town",
      look: "overworld-sunset",
      note: "The hug, close: his arms round her, his eyes shut, a heart over them. One whole second. On 'ran' she jumps straight up and is gone, and his arms are round nothing.",
      stage: (t) => {
        const at = w("6.second", "Then") + 0.1;
        const b = bolt(HUG, ME, t, at, 0, 9, NORTH);
        const gone = t > at + 0.05;
        return (
          <>
            <Hero position={ME} rotationY={SOUTH} pose={posed("hug", t, { head: [0.1, 0, 0.12] })} face={gone ? "wow" : "calm"} tailUp={gone ? 0.3 : 1} />
            <Mum position={b.position} rotationY={b.rotationY} walk={b.walk} lean={gone ? b.lean : 0.34} mood={gone ? "scared" : "happy"} />
            <Heart position={[0, 2.0, -3.55]} rotationY={-1.2} scale={gone ? 0 : tw(t, 0.1, 0.35)} />
          </>
        );
      },
    },
    {
      cue: "6.came",
      ...cam.push({ on: [0, 1.05, -3.45], dist: 4.4, to: 3.3, yaw: -76, pitch: 4, fov: 42 }),
      zone: "town",
      look: "overworld-sunset",
      note: "She walks back in from the edge of the frame, still shaking, and leans on him again. Dad comes up behind her and leans on both of them. He shuts his eyes.",
      stage: (t) => {
        const k = tw(t, 0, 0.75);
        const d = tw(t, 0.45, 1.15);
        return (
          <>
            <Hero position={ME} rotationY={SOUTH} pose={k < 1 ? openArms(t, 0.7) : posed("hug", t, { head: [0.1, 0, 0.12] })} face={k < 1 ? "wow" : "calm"} tailUp={1} />
            <Mum position={[HUG[0] + Math.sin(t * 48) * 0.01, 0, HUG[2] + (1 - k) * 3.2]} rotationY={NORTH} walk={k * 3.2} mood={k < 1 ? "scared" : "happy"} lean={tw(t, 0.7, 1.0) * 0.34} />
            <Dad position={[0.62, 0, HUG[2] - 0.25 + (1 - d) * 4]} rotationY={NORTH + 0.9} walk={d * 4} mood="happy" lean={tw(t, 1.1, 1.4) * 0.3} />
            <Heart position={[0, 2.2, -3.5]} rotationY={-1.3} scale={tw(t, 1.0, 1.3)} />
          </>
        );
      },
    },
    {
      cue: "7.turns",
      ...cam.push({ on: [0, 1.0, -3.0], dist: 5.2, to: 4.6, yaw: 158, pitch: 14, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Daylight, from over his shoulder: a queue of seven creepers down the middle of the street, all shaking. The one at the front leans on him, counts to one, jumps and runs; the next one shuffles up and leans.",
      stage: (t) => {
        const swap = w("7.turns", "They") - 0.2;
        const k = tw(t, swap, swap + 0.5);
        const first = bolt(HUG, [-0.6, 0, -4.4], t, swap - 0.15, 0, 8, NORTH);
        return (
          <>
            <Hero position={ME} rotationY={SOUTH} pose={posed("hug", t, { head: [0.1, 0, 0.12] })} face="grin" tailUp={1} />
            <Creeper position={first.position} rotationY={first.rotationY} walk={first.walk} lean={first.gone ? first.lean : 0.34} mood={first.gone ? "scared" : "happy"} scarf="#3f6fc2" hat="straw" />
            {Array.from({ length: 6 }, (_, i) => {
              const z = HUG[2] + 1.15 * (i + 1) - k * 1.15;
              return <Creeper key={i} position={[Math.sin(i * 2.1) * 0.12 + Math.sin(t * 44 + i) * 0.008, 0, z]} rotationY={NORTH} walk={k * 1.15} mood={i === 0 ? "happy" : "scared"} lean={i === 0 ? tw(t, swap + 0.5, swap + 0.8) * 0.34 : 0} scarf={["#7a4fb0", "#e07a2e", "#e0b83a", undefined, "#c23a2e", "#3f6fc2"][i]} scale={i === 3 ? 0.62 : 0.94 + (i % 3) * 0.04} phase={i + 2} />;
            })}
            <Heart position={[0, 2.1, -3.55]} rotationY={Math.PI} scale={t < swap - 0.15 || t > swap + 0.8 ? 1 : 0} />
          </>
        );
      },
    },
    {
      cue: "7.table",
      ...cam.push({ on: [T[0], 0.95, T[2] - 0.6], dist: 8.8, to: 8.0, yaw: 0, pitch: 13, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "The dinner table again, and this time the whole of it fits in one frame: mum and dad at one end, him at the other with his fish, six planks between them. Mum is only shaking a little.",
      stage: (t) => (
        <>
          <Table position={T} length={TABLE_SHORT} />
          <Mum position={[T[0] - 0.42 + Math.sin(t * 40) * 0.006, 0, T[2] - TABLE_SHORT / 2 - 0.55]} rotationY={SOUTH} mood="happy" lookAt={[T[0], 1.0, T[2] + TABLE_SHORT / 2]} />
          <Dad position={[T[0] + 0.42, 0, T[2] - TABLE_SHORT / 2 - 0.6]} rotationY={SOUTH} mood="happy" nod={Math.max(0, Math.sin(t * 6)) * 0.3} />
          <Hero position={[T[0], -0.05, T[2] + TABLE_SHORT / 2 + 0.5]} rotationY={NORTH} animation="sit" face="grin" tailUp={0.9} />
          <Fish position={[T[0], 0.86, T[2] + TABLE_SHORT / 2 - 0.45]} rotation={[-Math.PI / 2, 0, 0.5]} scale={1.2} />
        </>
      ),
    },
    {
      cue: "7.little",
      ...cam.push({ on: [-0.85, 0.66, -3.15], dist: 3.8, to: 3.1, yaw: 8, pitch: 6, fov: 40 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Evening, the same spot in the square: he sits, and the little creeper in the yellow scarf sits right up against him. On 'purr' the rings come off his chest. The little one shakes like a leaf, and stays, and leans in.",
      stage: (t) => {
        const on = w("7.little", "He") - 0.1;
        const purr = t > on ? 1 : 0;
        return (
          <>
            <Hero position={[SITS[0] + Math.sin(t * 60) * 0.007 * purr, GROUND_SIT, SITS[2]]} rotationY={SOUTH} pose={sitPose(t, { head: [0.05, -0.3, 0] })} face={purr ? "calm" : "smile"} tailUp={0.9} />
            {purr ? <SoundRings position={[SITS[0], 0.55, SITS[2] + 0.3]} t={((t - on) * 1.4) % 1} color="#ffd9a0" reach={0.45} /> : null}
            <Little position={[-0.5 + Math.sin(t * 46) * 0.012 * purr, 0, -3.15]} rotationY={SOUTH + 0.15} mood="happy" turn={0.5} tilt={purr * tw(t, on + 0.3, on + 0.8) * 0.3} />
            <Heart position={[-0.8, 1.55, -3.1]} scale={tw(t, on + 0.6, on + 0.9) * 0.9} />
          </>
        );
      },
    },
    {
      cue: "8.sub",
      ...cam.push({ on: [0, 1.5, 6], dist: 7.2, to: 6.0, yaw: 0, pitch: 0, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "Everybody, facing us: mum and dad hold the subscribe sign up on their heads, the town is packed in behind, and he stands in front. On 'hello' he lifts a paw, and the whole town, sign and all, jumps and runs.",
      stage: (t) => {
        const at = w("8.sub", "hello") - 0.2;
        const cat: [number, number, number] = [0, 0, 8.4];
        const m = bolt([-1.1, 0, 5.6], cat, t, at, 1, 8, SOUTH);
        const d = bolt([1.1, 0, 5.6], cat, t, at, 1, 8, SOUTH);
        return (
          <>
            <Hero position={cat} rotationY={SOUTH} animation={t > at - 0.25 ? "wave" : "idle"} face="grin" tailUp={1} />
            <Mum position={m.position} rotationY={m.rotationY} walk={m.walk} lean={m.lean} mood={m.gone ? "scared" : "happy"} />
            <Dad position={d.position} rotationY={d.rotationY} walk={d.walk} lean={d.lean} mood={d.gone ? "scared" : "happy"} />
            <SubscribeSign position={[(m.position[0] + d.position[0]) / 2, 2.75 + m.position[1], (m.position[2] + d.position[2]) / 2]} scale={1.05} tilt={Math.sin(t * 3) * 0.04 + (m.gone ? Math.sin(t * 30) * 0.12 : 0)} />
            <Creeps spots={[[-2.8, 5.0], [2.8, 4.8], [-3.6, 6.4], [3.6, 6.2], [-2.0, 3.6], [2.1, 3.4], [0, 3.8], [-4.2, 4.2], [4.3, 4.0], [-0.9, 2.4], [1.0, 2.2]]} t={t} face={SOUTH} cat={cat} at={at} mood="happy" lookAt={[0, 1.4, 16]} />
            <Little position={[0.95, 0, 8.3]} rotationY={SOUTH} mood="happy" nod={-0.1} />
          </>
        );
      },
    },
  ],
});

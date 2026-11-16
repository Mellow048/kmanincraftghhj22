import { cam, storyScene } from "../../engine";
import { Box, Bubble, Creeps, DEG, Dad, EAST, Heart, Hero, Mum, NORTH, PLACE, SOUTH, STREET, timing, tw, w } from "./kit";

/** 01 — The only cat. Everyone else is a creeper, and every one of them runs. */
const ME: [number, number, number] = [0, 0, 10.5];
const DOOR: [number, number, number] = [-6.6, 0, 8];
const R = PLACE.room;

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The only cat",
  shots: [
    {
      cue: "1.cat",
      ...cam.push({ on: [0, 1.0, 9.6], dist: 5.0, to: 3.9, yaw: 10, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The premise in the first second: a cat kid in a red shirt grins and waves at us, and behind him a whole street of creepers has stopped dead and is staring at him, leaning away.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={10 * DEG} animation="wave" face="grin" tailUp={0.9} />
          <Creeps spots={STREET} t={t} face={SOUTH} lookAt={[0, 1.2, 10.5]} mood="scared" shake={0.012} shift={[0, 0, -tw(t, 0.3, 1.6) * 0.7]} skip={[13]} />
          <Creeps spots={[[-1.75, 8.5], [1.8, 8.1]]} t={t} face={SOUTH} lookAt={[0, 1.2, 10.5]} mood="scared" shake={0.012} shift={[0, 0, -tw(t, 0.3, 1.6) * 0.7]} first={5} />
        </>
      ),
    },
    {
      cue: "1.all",
      ...cam.push({ on: [0, 1.0, 1], dist: 15, to: 12.5, yaw: -16, pitch: 30, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "From over the roofs: the street, full of creepers going both ways, under green roofs with the face over every door.",
      stage: (t) => (
        <>
          <Creeps spots={STREET.filter((_, i) => i % 2 === 0)} t={t} face={SOUTH} walk={0.6 + t * 1.3} shift={[0.5, 0, t * 1.3]} />
          <Creeps spots={STREET.filter((_, i) => i % 2 === 1)} t={t} face={NORTH} walk={0.6 + t * 1.3} shift={[-0.5, 0, 2 - t * 1.3]} first={9} />
          <Creeps spots={[[-5.6, 9.5, EAST], [5.4, 3.5, -EAST], [-5.2, -4, EAST], [5.6, 13, -EAST]]} t={t} first={20} />
        </>
      ),
    },
    {
      cue: "1.hello",
      ...cam.push({ on: [0, 1.2, 7.4], dist: 6.2, to: 7.4, yaw: 0, pitch: 10, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From behind him, looking up the street: he lifts a paw, HELLO pops over his head, and on 'runs' every creeper in the street jumps and bolts away from him.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="wave" tailUp={1} />
          <Bubble text="HELLO!" position={[0.2, 2.05, 10.5]} scale={tw(t, 0.2, 0.4) * 0.72} tail={-1} />
          <Creeps spots={STREET} t={t} face={SOUTH} lookAt={[0, 1.2, 10.5]} cat={ME} at={w("1.hello", "runs") - 0.25} skip={[13]} />
        </>
      ),
    },
    {
      cue: "1.mum",
      ...cam.truck({ on: [-7.4, 1.05, 7.45], dist: 3.5, yaw: 84, pitch: 2, fov: 40, by: [0, 0, 1.1] }),
      zone: "town",
      look: "overworld-day",
      note: "In front of their door: mum, a creeper with a pink bow and a pink scarf, tips her head at us. The camera slides to dad, in a straw hat, who nods.",
      stage: (t) => (
        <>
          <Mum position={[-7.4, 0, 7.45]} rotationY={EAST} mood="happy" tilt={Math.sin(t * 5) * 0.14} />
          <Dad position={[-7.4, 0, 8.55]} rotationY={EAST} mood="happy" nod={Math.max(0, Math.sin((t - w("1.mum", "dad")) * 9)) * 0.25} />
        </>
      ),
    },
    {
      cue: "1.box",
      ...cam.push({ on: [DOOR[0], 0.5, DOOR[2]], dist: 4.4, to: 3.5, yaw: 62, pitch: 34, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "Years ago, on the doorstep: a cardboard box, and a kitten in it looking up. Mum and dad bend over it; on 'kitten' it lifts a paw and both of them jump back.",
      stage: (t) => {
        const hi = w("1.box", "kitten");
        const back = tw(t, hi, hi + 0.2);
        const hop = Math.sin(Math.min(1, Math.max(0, (t - hi) / 0.3)) * Math.PI) * 0.3;
        return (
          <>
            <Box position={DOOR} rotationY={0.3} />
            <Hero position={[DOOR[0], 0.05, DOOR[2]]} rotationY={EAST - 0.2} scale={0.42} animation={t > hi - 0.15 ? "wave" : "idle"} face="smile" headPitch={-0.5} tailUp={1} />
            <Mum position={[DOOR[0] - 1.25 - back * 0.55, hop, DOOR[2] - 0.75 - back * 0.25]} rotationY={EAST + 0.5} lean={0.35 * (1 - back)} mood={back > 0.3 ? "scared" : "happy"} lookAt={[DOOR[0], 0.5, DOOR[2]]} />
            <Dad position={[DOOR[0] - 1.25 - back * 0.55, hop, DOOR[2] + 0.75 + back * 0.25]} rotationY={EAST - 0.5} lean={0.35 * (1 - back)} mood={back > 0.3 ? "scared" : "calm"} lookAt={[DOOR[0], 0.5, DOOR[2]]} />
          </>
        );
      },
    },
    {
      cue: "1.love",
      ...cam.push({ on: [R[0], 1.1, R[2] + 0.4], dist: 5.2, to: 6.6, yaw: 0, pitch: 7, fov: 50 }),
      zone: "room",
      look: "overworld-day",
      note: "Their front room, from behind him: he waves from this end, and mum and dad are flat against the far wall, as far away as the room lets them be, smiling and shaking. The camera pulls back on 'other side': it is a long room.",
      stage: (t) => (
        <>
          <Hero position={[R[0] - 0.35, 0, R[2] + 3.3]} rotationY={NORTH} animation="wave" tailUp={0.9} />
          <Mum position={[R[0] - 0.55, 0, R[2] - 2.05]} rotationY={SOUTH} mood="happy" tilt={Math.sin(t * 6) * 0.1} />
          <Dad position={[R[0] + 0.75, 0, R[2] - 2.05]} rotationY={SOUTH} mood="happy" nod={Math.sin(t * 5) * 0.08} />
          <Heart position={[R[0] - 0.55, 2.2, R[2] - 1.95]} scale={tw(t, 0.4, 0.7)} />
          <Heart position={[R[0] + 0.75, 2.35, R[2] - 1.95]} scale={tw(t, 0.7, 1.0)} />
        </>
      ),
    },
  ],
});

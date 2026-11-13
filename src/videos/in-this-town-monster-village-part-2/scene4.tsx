import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bits, Bubble, Bus, DIARY, Dad, Diary, EAST, Folk, Glint, Hero, Hiss, Mum, NORTH, Postman, Puffs, READ, WARM, WEST, ZONES,
  ease, faceOf, h, hall, hop, jolt, monsterFace, mr, pop, ramp, timing, wordAt,
} from "./kit";

/** The book in his hands, when he stands at the bed reading it. */
const BOOK: Vec3 = [READ[0], 0.86, READ[2] - 0.34];
/** Where the teacher stands in Mo's room, at the front of the village. */
const TEACH: Vec3 = mr(0.9, 0, 0.9);

/** The village packed into Mo's room behind the boy. They face north, at the bed. */
const Packed: React.FC<{ t: number; away?: number; teacher?: boolean }> = ({ t, away = 0, teacher = true }) => {
  const look: Vec3 | undefined = away > 0.5 ? mr(0, 6, -2) : BOOK;
  const lean = 0.32 * (1 - away);
  return (
    <>
      <Mum position={mr(-2.3, 0, 0.1)} rotationY={NORTH} lookAt={look} lean={lean} mood="happy" arms={0.2} />
      <Dad position={mr(-0.75, 0, 0.3)} rotationY={NORTH} lookAt={look} lean={lean} mood="happy" />
      <Hiss position={mr(-0.05, 0, 0.8)} rotationY={NORTH} lookAt={look} lean={lean} mood="happy" />
      {teacher ? <Folk kind="enderman" n={0} position={TEACH} rotationY={NORTH} lookAt={look} lean={lean * 1.3} /> : null}
      <Postman position={mr(2.2, 0, 1.3)} rotationY={NORTH} lookAt={look} lean={lean * 1.3} />
      <Folk kind="zombie" n={0} position={mr(-1.55, 0, 1.3)} rotationY={NORTH} lookAt={look} lean={lean} mood="happy" arms={0.2} />
      <Folk kind="skeleton" n={1} position={mr(-0.8, 0, 1.9)} rotationY={NORTH} lookAt={look} lean={lean} mood="happy" />
      <Folk kind="creeper" n={3} position={mr(0.5, 0, 2.2)} rotationY={NORTH} lookAt={look} lean={lean} mood="happy" />
      <Folk kind="zombie" n={4} position={mr(1.5, 0, 2.2)} rotationY={NORTH} lookAt={look} lean={lean} mood="happy" arms={0.2} />
      <Bus position={mr(-2.4, Math.abs(Math.sin(t * 5)) * 0.5 * (1 - away), 1.9)} rotationY={NORTH} mood="happy" size={1.2} />
    </>
  );
};

/** THE HIDEOUT IS A HOME, and the diary says what Mo never did. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "I love my monsters",
  shots: [
    {
      cue: "6.explore",
      ...cam.truck({ on: h(-4.6, 1.3, -3.4), dist: 6.2, yaw: 0, pitch: 7, fov: 44, by: [7.4, 0, 0] }),
      ease: "inOutSine",
      zone: ZONES.hide,
      look: WARM,
      note: "The boy walks the length of the back wall and the camera goes with him. Clean: the bus slides along the floor like a mop. Warm: mum and dad at the fire with their hands out. Cosy: Hiss drops face down onto the bed.",
      stage: (t, { p }) => {
        const clean = wordAt("6.explore", "clean");
        const warm = wordAt("6.explore", "warm");
        const cosy = wordAt("6.explore", "cosy");
        const x = -5.2 + 7.4 * ease(p);
        const mop = ramp(t, clean - 0.3, clean + 0.9);
        const flop = ease(ramp(t, cosy - 0.1, cosy + 0.25));
        return (
          <>
            <Hero position={h(x, 0, -1.6)} rotationY={EAST} animation="walk" animDistance={7.4 * ease(p)} face="grin" headYaw={1.0} />
            <Bus position={h(-6.2 + 3.4 * ease(mop), 0, -3.3)} rotationY={EAST} squash={0.3} mood="happy" size={1.3} />
            {mop > 0 && mop < 1 ? <Bits position={h(-6.2 + 3.4 * ease(mop), 0.1, -3.3)} t={0.15} color="#d8f0ff" count={6} power={1} /> : null}
            <Glint position={h(-4.4, 0.15, -3.3)} t={t - clean} size={1.4} />
            <Mum position={h(0.1, 0, -4.2)} rotationY={NORTH + 0.3} mood="happy" arms={0.9 * ease(ramp(t, warm - 0.3, warm))} />
            <Dad position={h(1.7, 0, -4.1)} rotationY={NORTH - 0.3} mood="happy" wave={0.5 * ease(ramp(t, warm - 0.3, warm))} />
            <Hiss position={h(3.0, 0.55 * flop, -4.3 - 0.9 * flop)} rotationY={NORTH} lean={1.45 * flop} mood="happy" />
            <Bits position={h(3.0, 0.7, -5.2)} t={t - cosy - 0.2} color="#f1ece0" count={10} power={1.6} />
          </>
        );
      },
    },
    {
      cue: "6.rooms",
      ...cam.truck({ on: hall(0.4, 1.5, -1.0), dist: 4.6, yaw: 12, pitch: 2, fov: 44, by: [6.6, 0, 0] }),
      ease: "linear",
      zone: ZONES.hall,
      look: WARM,
      note: "A corridor of doors with a board over each one: ZOMBIES, BONES, HISS, POST. Each family is standing at its own door, and gives a little jump as the boy runs past reading them.",
      stage: (t, { p }) => {
        const pass = (x: number): number => hop(t, (x / 8.2) * dur62, 0.25, 0.3);
        const dur62 = 2.2;
        return (
          <>
            <Hero position={hall(-0.6 + 8.2 * p, 0, 0.6)} rotationY={EAST} animation="run" animDistance={8.2 * p} face="grin" headYaw={1.1} />
            <Mum position={hall(-0.75, pass(0), -0.8)} rotationY={0.3} mood="happy" arms={0.3} />
            <Folk kind="zombie" n={2} position={hall(0.75, pass(0.4), -0.7)} scale={0.76} mood="happy" arms={0.3} />
            <Dad position={hall(1.75, pass(2.5), -0.8)} rotationY={0.3} mood="happy" wave={1} />
            <Folk kind="skeleton" n={3} position={hall(3.25, pass(2.9), -0.7)} mood="happy" />
            <Hiss position={hall(5.0, pass(5), -0.75)} mood="happy" />
            <Postman position={hall(7.5, pass(7.5), -0.8)} />
          </>
        );
      },
    },
    {
      cue: "6.last",
      ...cam.push({ on: hall(10, 1.5, -1.3), dist: 5.0, to: 3.7, yaw: 10, pitch: 3, fov: 42 }),
      zone: ZONES.hall,
      look: WARM,
      note: "The end of the corridor: one more door, and the board over it is blank. The boy stops in front of it. On 'Mo's' he pushes, and it swings in on a room with a lamp lit.",
      stage: (t) => {
        const mo = wordAt("6.last", "mo's");
        const k = ease(ramp(t, mo - 0.1, mo + 0.5));
        const walk = ease(ramp(t, 0, 0.8));
        return (
          <>
            <Hero position={hall(8.6 + 1.4 * walk, 0, 0.5 - 0.9 * walk)} rotationY={walk < 1 ? EAST + 0.4 : NORTH} animation={walk < 1 ? "walk" : "idle"} animDistance={1.7 * walk} arms={t > mo - 0.2 && k < 1 ? "push" : undefined} face="wow" headPitch={-0.25 * (1 - k)} />
            <group position={hall(9.5, 0, -1.56)} rotation={[0, 1.35 * k, 0]}>
              <Block position={[0.5, 1.0, 0]} size={[1.0, 2.0, 0.08]} color="#6b4a2a" castShadow={false} />
              <Block position={[0.84, 1.0, 0.05]} size={[0.08, 0.08, 0.06]} color="#e0b83a" castShadow={false} />
            </group>
            <pointLight position={hall(10, 1.4, -1.0)} color="#ffc078" intensity={16 * k} distance={6} decay={2} />
            <Glint position={hall(10, 2.42, -1.5)} t={t - wordAt("6.last", "name")} size={1.3} />
          </>
        );
      },
    },
    {
      cue: "6.bed",
      ...cam.push({ on: mr(0.15, 1.15, -2.2), onTo: [DIARY[0], DIARY[1] + 0.05, DIARY[2]], dist: 5.6, to: 2.1, yaw: 4, pitch: 10, fov: 46 }),
      ease: "inCubic",
      zone: ZONES.room,
      look: WARM,
      note: "A small room and three things in it, each lit up as it is named: a bed with a straw-yellow blanket, a second straw hat on a peg, and on the pillow, where the camera ends up, a little red book.",
      stage: (t) => (
        <>
          <Glint position={mr(-0.6, 0.7, -1.7)} t={t - wordAt("6.bed", "bed")} size={1.8} />
          <Glint position={mr(0.9, 1.8, -2.2)} t={t - wordAt("6.bed", "hat")} size={1.5} />
          <Glint position={[DIARY[0], DIARY[1] + 0.1, DIARY[2] + 0.1]} t={t - wordAt("6.bed", "diary")} size={1.1} />
          <Diary position={DIARY} />
        </>
      ),
    },
    {
      cue: "6.open",
      ...cam.push({ on: [READ[0], 1.0, READ[2] - 0.1], dist: 2.9, to: 2.4, yaw: 180, pitch: 16, fov: 42 }),
      zone: ZONES.roomFromBed,
      look: WARM,
      note: "From the bed: the boy with the book open in his two hands, and the pages going over one after another, and his eyes going down each one. His face changes.",
      stage: (t) => {
        const every = wordAt("6.open", "every");
        const open = ease(ramp(t, 0.15, 0.6));
        const n = Math.max(0, (t - every + 0.1) / 0.3);
        return (
          <>
            <pointLight position={[READ[0], 1.6, READ[2] - 1.3]} color="#ffe2b0" intensity={10} distance={5} decay={2} />
            <Hero position={READ} rotationY={NORTH} animation="idle" arms="hold" face={t > every + 0.5 ? "smile" : "wow"} headPitch={0.5} gaze={0} />
            <group position={BOOK} rotation={[0.5, 0, 0]}>
              <Diary position={[0, 0, 0]} open={open} flip={t > every - 0.1 ? n % 1 : 0} />
            </group>
          </>
        );
      },
    },
    {
      cue: "6.love",
      ...cam.push({ on: [BOOK[0] + 0.08, BOOK[1], BOOK[2]], dist: 1.25, to: 1.02, yaw: 0, pitch: 62, fov: 36 }),
      zone: ZONES.room,
      look: WARM,
      note: "The page, filling the screen, in Mo's square handwriting: I LOVE MY MONSTERS. And a small red heart under it.",
      stage: (t) => (
        <>
          <pointLight position={[BOOK[0], BOOK[1] + 0.9, BOOK[2] + 0.5]} color="#fff0d0" intensity={5} distance={3} decay={2} />
          <group position={BOOK} rotation={[0.35, 0, 0]} scale={1 + 0.05 * jolt(t, 0.25, 0.4)}>
            <Diary position={[0, 0, 0]} open={1} big />
          </group>
        </>
      ),
    },
    {
      cue: "6.smile",
      ...cam.push({ on: faceOf(READ), dist: 2.1, to: 1.8, yaw: 180, pitch: 2, fov: 38 }),
      zone: ZONES.roomFromBed,
      look: WARM,
      note: "His face, close, over the top of the book: the smile comes. Then on 'turned' he stops, and his head goes round over his shoulder.",
      stage: (t) => {
        const turned = wordAt("6.smile", "turned");
        const k = ease(ramp(t, turned - 0.1, turned + 0.2));
        return (
          <>
            <pointLight position={[READ[0], 1.6, READ[2] - 1.3]} color="#ffe2b0" intensity={10} distance={5} decay={2} />
            <Hero position={READ} rotationY={NORTH + 0.35 * k} animation="idle" arms="hold" face={k > 0.5 ? "wow" : "grin"} headPitch={0.25 * (1 - k)} headYaw={0.85 * k} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "6.behind",
      ...cam.push({ on: mr(-1.15, 1.35, 0.2), dist: 6.0, to: 5.3, yaw: 180, pitch: 7, fov: 46 }),
      zone: ZONES.roomFromBed,
      look: WARM,
      note: "From the bed again, wider: the boy in front, small, and the whole village crammed into the room behind him, bent forward to read. On 'shoulder' every one of them straightens and looks at the ceiling.",
      stage: (t) => {
        const caught = wordAt("6.behind", "shoulder");
        const away = ease(ramp(t, caught - 0.05, caught + 0.2));
        return (
          <>
            <pointLight position={mr(0, 1.9, -1.2)} color="#ffe2b0" intensity={22} distance={7} decay={2} />
            <Hero position={READ} rotationY={NORTH + 0.35} animation="idle" arms="hold" face="wow" headYaw={0.85} gaze={0} />
            <Packed t={t} away={away} />
          </>
        );
      },
    },
    {
      cue: "6.wrong",
      ...cam.push({ on: monsterFace("enderman", TEACH), dist: 3.4, to: 2.7, yaw: 170, pitch: -6, fov: 40 }),
      zone: ZONES.roomFromBed,
      look: WARM,
      note: "The teacher, the tall one. His head goes down until he is looking at his own feet. Then the three words.",
      stage: (t) => {
        const said = wordAt("6.wrong", "i");
        const down = ease(ramp(t, 0.15, 0.8));
        return (
          <>
            <pointLight position={[TEACH[0], 2.2, TEACH[2] - 1.6]} color="#ffe2b0" intensity={14} distance={6} decay={2} />
            <Folk kind="enderman" n={0} position={TEACH} rotationY={NORTH} nod={0.6 * down} jaw={t > said ? 0.4 : 0} />
            <Bubble text="I WAS WRONG." position={[TEACH[0], monsterFace("enderman", TEACH)[1] + 0.5, TEACH[2] - 0.4]} rotationY={Math.PI - 0.17} scale={0.3 * pop(t, said - 0.05)} tail={0} dark />
            <Postman position={mr(2.2, 0, 1.3)} rotationY={NORTH} lookAt={monsterFace("enderman", TEACH)} />
            <Hiss position={mr(-0.1, 0, 1.2)} rotationY={NORTH} mood="happy" lookAt={monsterFace("enderman", TEACH)} />
          </>
        );
      },
    },
    {
      cue: "6.liked",
      ...cam.push({ on: mr(-0.85, 1.5, 0.2), dist: 5.4, to: 5.0, yaw: 180, pitch: 5, fov: 46 }),
      zone: ZONES.roomFromBed,
      look: WARM,
      note: "The teacher and the boy, with the village round them. The boy holds the book up to him, and on 'like' the whole room jumps.",
      stage: (t) => {
        const like = wordAt("6.liked", "like");
        const up = (i: number): number => hop(t, like + i * 0.04, 0.3, 0.3);
        const tall: Vec3 = mr(-0.3, 0, 0.5);
        return (
          <>
            <pointLight position={mr(-0.8, 1.9, -1.4)} color="#ffe2b0" intensity={22} distance={7} decay={2} />
            <Hero position={[READ[0] + 0.25, up(0), READ[2] + 0.1]} rotationY={NORTH + 0.9} animation="idle" arms="lift" face="grin" headYaw={0.6} />
            <Folk kind="enderman" n={0} position={tall} rotationY={NORTH - 0.35} nod={0.3} mood="happy" />
            <Mum position={mr(-2.0, up(1), 0.9)} rotationY={NORTH} mood="happy" wave={t > like ? 1 : 0} />
            <Dad position={mr(-1.15, up(2), 1.5)} rotationY={NORTH} mood="happy" wave={t > like ? 1 : 0} rattle={0.5} />
            <Hiss position={mr(0.35, up(3), 1.4)} rotationY={NORTH} mood="happy" />
            <Bubble text="MAYBE HE DID LIKE US." position={[tall[0] - 0.5, 3.15, tall[2] - 0.4]} rotationY={Math.PI} scale={0.36 * pop(t, 0.05)} tail={0} dark />
          </>
        );
      },
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Bell, Butterfly, EAST, Hero, Horde, LineUp, NORTH, O, Pillager, ROBE, Ravager, SOUTH, T, Villager, WEST, cueLen, timing, tw, w } from "./kit";

/** 01 — What the film is (the boy in their line), and why the town needed a spy at all. */
const EMER = w("2.took", "emeralds") - 0.12;
const ONCE = w("2.took", "once") - 0.1;
const STEP = w("3.asked", "everyone") + 0.2;
const ROW = [-3.3, -2.0, -0.7, 1.9, 3.2];

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "A spy",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: O(0.1, 1.3, 5), dist: 4.8, to: 3.5, yaw: 50, pitch: 6, fov: 40 }),
      zone: "outpost",
      look: "overworld-day",
      note: "The film in one frame: a line of tall grey pillagers, and in the middle of it one short one whose eyes keep moving.",
      stage: (t) => (
        <>
          <LineUp stare={tw(t, 0.9, 1.4)} />
          <Hero coat ash={1} position={O(0, 0, 5)} animation="idle" face="uneasy" headYaw={Math.sin(t * 5) * 0.35 * (1 - tw(t, 0.9, 1.3))} />
        </>
      ),
    },
    {
      cue: "1.goal",
      ...cam.orbit({ on: O(0, 2.5, 0), dist: 29, distTo: 24, yaw: 24, yawTo: 42, pitch: 31, fov: 46 }),
      zone: "outpost",
      look: "overworld-day",
      note: "The whole outpost from over the trees: the tower, the log wall, the fire, the beast in its pen, and the line with him in it.",
      stage: (t) => (
        <>
          <LineUp />
          <Hero coat ash={1} position={O(0, 0, 5)} animation="idle" face="uneasy" />
          <Pillager chief position={O(-4 + t * 1.3, 0, 7.6)} rotationY={EAST} walk={t * 1.3} />
          <Ravager position={O(9, 0, -8)} rotationY={WEST} rider={false} jaw={0.4 + 0.4 * Math.sin(t * 3)} />
          <Pillager position={O(-5.6, -0.55, 2.6)} rotationY={WEST} sit n={2} />
        </>
      ),
    },
    {
      cue: "2.raid",
      ...cam.push({ on: T(-2, 1.3, 2), dist: 10.5, to: 8.5, yaw: 90, pitch: 7, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Down the road through the square, low: the villagers run straight at the lens, and behind them the road fills up with pillagers.",
      stage: (t) => (
        <>
          <group position={T(-13 + t * 3.2, 0, 2)} rotation={[0, Math.PI / 2, 0]}>
            <Horde position={[0, 0, 0]} t={t} rows={3} cols={4} width={5} gap={1.7} seed={2} />
          </group>
          {[0, 1, 2, 3, 4].map((i) => (
            <Villager key={i} position={T(-6 + i * 1.6 + t * 3.6, 0, 1.2 + (i % 3) * 0.8)} rotationY={EAST} robe={[ROBE.brown, ROBE.farmer, ROBE.blue, ROBE.white, ROBE.red][i]} walk={t * 3.8 + i} phase={i} kid={i === 2} />
          ))}
        </>
      ),
    },
    {
      cue: "2.took",
      ...cam.truck({ on: T(-1.4, 1.2, 3), dist: 4.2, yaw: 12, pitch: 5, fov: 40, by: [1.7 * EMER, 0, 0] }),
      zone: "town",
      look: "overworld-day",
      note: "'They took our bread': a pillager strolls past with a loaf under his arm; the baker watches it go.",
      stage: (t) => (
        <>
          <Pillager position={T(-1.6 + t * 1.7, 0, 3)} rotationY={EAST} walk={t * 1.7} armR={-1.2} n={1}>
            <mesh position={[0, 0, 0.1]}>
              <boxGeometry args={[0.24, 0.2, 0.55]} />
              <meshStandardMaterial color="#c8924a" />
            </mesh>
          </Pillager>
          <Villager position={T(0.2, 0, 1.5)} rotationY={SOUTH - 0.2} robe={ROBE.white} lookAt={T(-1.6 + t * 1.7, 1.4, 3)} hmm={1} />
        </>
      ),
    },
    {
      cue: "2.took",
      cut: EMER,
      ...cam.push({ on: T(11, 1.1, -3.6), dist: 4.6, to: 3.8, yaw: 28, pitch: 6, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "'They took our emeralds': another comes out of a house door with a whole chest of green in his arms.",
      stage: (t) => {
        const z = -5.4 + t * 1.5;
        return (
          <>
            <Pillager position={T(11, 0, z)} rotationY={SOUTH} walk={t * 1.5} armR={-1.35} armL={-1.35} n={3} />
            <group position={T(11, 1.05, z + 0.5)}>
              <mesh>
                <boxGeometry args={[0.7, 0.45, 0.5]} />
                <meshStandardMaterial color="#8a5a2e" />
              </mesh>
              {[-0.2, 0, 0.2].map((x) => (
                <mesh key={x} position={[x, 0.27, 0]}>
                  <boxGeometry args={[0.14, 0.14, 0.14]} />
                  <meshStandardMaterial color="#2fd06a" emissive="#1a8a40" emissiveIntensity={0.8} />
                </mesh>
              ))}
            </group>
          </>
        );
      },
    },
    {
      cue: "2.took",
      cut: ONCE,
      ...cam.truck({ on: T(-4.4, 1.7, 1.5), dist: 5.0, yaw: 24, pitch: 4, fov: 42, by: [-1.5 * (cueLen("2.took") - ONCE), 0, 0] }),
      zone: "town",
      look: "overworld-day",
      note: "'Once, they took our bell': one of them walks off down the road with the gold bell held over his head, and a villager runs after him with both arms out.",
      stage: (t) => {
        const x = -4.4 - t * 1.5;
        return (
          <>
            <Pillager position={T(x, 0, 1.5)} rotationY={WEST} walk={t * 1.5} armR={-3.0} armL={-3.0} n={0} />
            <group position={T(x, 2.55 + Math.abs(Math.sin(t * 7)) * 0.05, 1.5)} rotation={[0, 0, Math.sin(t * 7) * 0.1]}>
              <mesh castShadow>
                <boxGeometry args={[0.8, 0.62, 0.8]} />
                <meshStandardMaterial color="#e2b23a" metalness={0.5} roughness={0.35} emissive="#7a5a10" emissiveIntensity={0.4} />
              </mesh>
              <mesh position={[0, 0.42, 0]}>
                <boxGeometry args={[0.52, 0.24, 0.52]} />
                <meshStandardMaterial color="#e2b23a" metalness={0.5} roughness={0.35} emissive="#7a5a10" emissiveIntensity={0.4} />
              </mesh>
              <mesh position={[0, -0.36, 0]}>
                <boxGeometry args={[0.94, 0.12, 0.94]} />
                <meshStandardMaterial color="#c9992c" metalness={0.5} roughness={0.35} />
              </mesh>
            </group>
            <Villager position={T(x + 1.5, 0, 1.2)} rotationY={WEST} robe={ROBE.brown} walk={t * 2.4} />
          </>
        );
      },
    },
    {
      cue: "2.when",
      ...cam.orbit({ on: T(0.1, 1.2, 1.4), dist: 5.2, distTo: 4.5, yaw: -22, yawTo: 8, pitch: 7, fov: 40 }),
      zone: "town",
      look: "overworld-night",
      note: "Night in the square: three villagers back to back, each watching a different piece of dark.",
      stage: (t) => (
        <>
          {[-1, 0, 1].map((i) => (
            <Villager key={i} position={T(i * 0.95, 0, 1.4 + Math.abs(i) * 0.35)} rotationY={i * 1.1} robe={[ROBE.farmer, ROBE.brown, ROBE.blue][i + 1]} turn={Math.sin(t * 4 + i * 2) * 0.6} phase={i} />
          ))}
          <pointLight position={T(0, 2.6, 4)} color="#ffd9a0" intensity={7} distance={8} decay={1.6} />
        </>
      ),
    },
    {
      cue: "2.need",
      ...cam.push({ on: T(0, 1.5, 0.8), dist: 6.6, to: 5.6, yaw: 0, pitch: 6, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "The elder in front of the bell, talking; the backs of the whole town listening; one red shirt at the end of the row.",
      stage: (t) => (
        <>
          <Villager position={T(0, 0, 0.8)} rotationY={SOUTH} robe={ROBE.elder} hmm={1} />
          {ROW.map((x, i) => (
            <Villager key={i} position={T(x, 0, 3.4)} rotationY={NORTH} robe={[ROBE.brown, ROBE.farmer, ROBE.blue, ROBE.white, ROBE.red][i]} phase={i} />
          ))}
          <Hero position={T(0.6, 0, 3.4)} rotationY={NORTH} animation="idle" headYaw={-0.7} headPitch={-0.3} />
          <Butterfly position={T(1.2, 2.0, 2.8)} t={t} />
        </>
      ),
    },
    {
      cue: "3.asked",
      ...cam.push({ on: T(0.3, 1.0, 3.6), dist: 7.4, to: 6.4, yaw: 180, pitch: 29, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "From over the elder's head: the row of villagers all take one step back together. The boy does not: he is looking at something in the air.",
      stage: (t) => {
        const back = tw(t, STEP, STEP + 0.3);
        return (
          <>
            <Villager position={T(0, 0, 0.8)} rotationY={SOUTH} robe={ROBE.elder} hmm={t < STEP ? 1 : 0} />
            {ROW.map((x, i) => (
              <Villager key={i} position={T(x, Math.sin(back * Math.PI) * 0.12, 3.4 + back * 1.1)} rotationY={NORTH} robe={[ROBE.brown, ROBE.farmer, ROBE.blue, ROBE.white, ROBE.red][i]} phase={i} lookAt={back > 0.5 ? T(0.6, 1.2, 3.4) : undefined} />
            ))}
            <Hero position={T(0.6, 0, 3.4)} rotationY={NORTH} animation="idle" face="grin" headYaw={-0.7 + Math.sin(t * 2) * 0.2} headPitch={-0.4} />
            <Butterfly position={T(1.2, 2.0, 2.8)} t={t + 2} />
          </>
        );
      },
    },
    {
      cue: "3.me",
      ...cam.orbit({ on: T(0.7, 1.3, 3.3), dist: 2.3, distTo: 1.8, yaw: 196, yawTo: 172, pitch: -4, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "His face, close, grinning up at a butterfly. Then it lands on his nose and he sees where everybody went.",
      stage: (t) => (
        <>
          <Hero position={T(0.6, 0, 3.4)} rotationY={NORTH} animation="idle" face={t < 0.85 ? "grin" : "surprised"} headYaw={t < 0.85 ? -0.5 : 0} headPitch={t < 0.85 ? -0.4 : 0} />
          <Butterfly position={T(0.6 + 0.5 * (1 - tw(t, 0.2, 0.8)), 1.36 + 0.5 * (1 - tw(t, 0.2, 0.8)), 3.1)} t={t + 4} />
          {ROW.map((x, i) => (
            <Villager key={i} position={T(x, 0, 4.5)} rotationY={NORTH} robe={[ROBE.brown, ROBE.farmer, ROBE.blue, ROBE.white, ROBE.red][i]} phase={i} lookAt={T(0.6, 1.2, 3.4)} />
          ))}
        </>
      ),
    },
  ],
});

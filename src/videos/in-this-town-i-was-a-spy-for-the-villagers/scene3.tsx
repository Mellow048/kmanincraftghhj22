import { cam, storyScene } from "../../engine";
import { Banner, Bits, EAST, Hero, LineUp, NORTH, O, Pillager, Ravager, SOUTH, WEST, Word, cueLen, posed, timing, tw, w } from "./kit";

/** 03 — The morning line, a grunt, a wall, and the banner he knocks off the captain. */
const G1 = w("6.new", "grunted");
const G2 = w("6.new", "back");
const FRIENDS = w("6.new", "friends");
const NOT = w("6.smart", "not");
const TRIP = w("7.hat", "tripped");
const KNOCK = w("7.hat", "knocked");
const TURNED = w("7.point", "turned");
const POINTED = w("7.point", "pointed");
const MARCH = 1.4;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The line",
  shots: [
    {
      cue: "6.line",
      ...cam.truck({ on: O(-2.6, 1.2, 5), dist: 5.4, yaw: 12, pitch: 5, fov: 42, by: [3.6, 0, 0] }),
      zone: "outpost",
      look: "overworld-day",
      note: "Morning. Sliding along the line: grey face, grey face, grey face, a much lower grey face, grey face. The captain walks along it.",
      stage: (t) => (
        <>
          <LineUp />
          <Hero coat ash={1} position={O(0, 0, 5)} animation="idle" face="uneasy" />
          <Pillager chief position={O(-4.5 + t * 1.6, 0, 6.9)} rotationY={EAST} walk={t * 1.6} lookAt={O(0, 1.3, 5)} />
        </>
      ),
    },
    {
      cue: "6.stare",
      ...cam.push({ on: O(0.35, 1.35, 5.1), dist: 2.9, to: 2.3, yaw: -24, pitch: -8, fov: 40 }),
      zone: "outpost",
      look: "overworld-day",
      note: "From down by his shoulder, looking up: the pillager next to him bends over and stares into his face from a hand away. He looks straight ahead.",
      stage: (t) => (
        <>
          <LineUp stare={tw(t, 0, 0.5)} />
          <Hero coat ash={1} position={O(0, 0, 5)} animation="idle" face="fear" headYaw={0} />
        </>
      ),
    },
    {
      cue: "6.new",
      ...cam.push({ on: O(0.3, 1.4, 5), dist: 3.5, to: 3.0, yaw: 18, pitch: 2, fov: 40 }),
      zone: "outpost",
      look: "overworld-day",
      note: "The two of them from the front. 'HRM', says the pillager. 'Hrm?' says the boy. The pillager nods and faces front. That is all it takes.",
      stage: (t) => (
        <>
          <LineUp stare={1 - tw(t, FRIENDS - 0.1, FRIENDS + 0.3)} />
          <Hero coat ash={1} position={O(0, 0, 5)} animation={t > G2 - 0.1 && t < G2 + 0.6 ? "talk" : "idle"} face={t < G2 ? "fear" : t < FRIENDS ? "grin" : "smug"} headYaw={t < FRIENDS ? -0.5 : 0} />
          <Word at={O(0.55, 2.0, 5.5)} t={t} from={G1 - 0.05} text="HRM." yaw={18} height={0.2} />
          <Word at={O(0.3, 1.78, 5.6)} t={t} from={G2 - 0.05} text="hrm?" yaw={18} height={0.15} color="#ffe9a8" />
        </>
      ),
    },
    {
      cue: "6.smart",
      ...cam.push({ on: O(3, 1.7, 1), dist: 4.8, to: 4.0, yaw: -14, pitch: -8, fov: 42 }),
      zone: "outpost",
      look: "overworld-day",
      note: "Strong: one of them holds a rock the size of a stove over his head. Not smart: he lets go of it to scratch.",
      stage: (t) => {
        const drop = tw(t, NOT + 0.05, NOT + 0.3);
        return (
          <>
            <Pillager position={O(3, -0.14 * drop, 1)} rotationY={SOUTH} armR={-3.0 + drop * 2.2} armL={-3.0 + drop * 0.2} nod={-0.2 + drop * 0.5} n={1} />
            <mesh position={O(3, 2.85 - drop * 0.72 + Math.sin(t * 9) * 0.02 * (1 - drop), 1)} castShadow>
              <boxGeometry args={[1.25, 1.0, 1.1]} />
              <meshStandardMaterial color="#7d7d80" roughness={1} />
            </mesh>
            <Bits position={O(3, 2.0, 1.3)} t={t - NOT - 0.3} color="#9a9a9c" count={10} seed={3} />
            <Pillager position={O(5.2, 0, 0.2)} rotationY={WEST} cheer={1 - drop} lookAt={O(3, 2.4, 1)} n={3} />
            <Hero coat ash={1} position={O(1, 0, 1.6)} rotationY={EAST} animation="idle" face={drop > 0.5 ? "surprised" : "uneasy"} lookAt={O(3, 2.4, 1)} />
          </>
        );
      },
    },
    {
      cue: "6.wall",
      ...cam.push({ on: O(-9.3, 1.3, -5), dist: 5.2, to: 4.4, yaw: 52, pitch: 6, fov: 42 }),
      zone: "outpost",
      look: "overworld-day",
      note: "A piece of wall with nothing behind it, and a pillager walking into it, and into it, and into it. Another goes past and does not look.",
      stage: (t) => (
        <>
          <Pillager position={O(-9.2 + Math.abs(Math.sin(t * 4.4)) * 0.32, 0, -5)} rotationY={WEST} walk={t * 1.6} n={2} nod={0.1} />
          <Bits position={O(-9.7, 1.5, -5)} t={(t * 0.7) % 0.72} color="#9a9a9c" count={5} seed={4} power={0.5} />
          <Pillager position={O(-8.4, 0, -10 + t * 1.3)} rotationY={SOUTH} walk={t * 1.3} n={0} crossbow armR={-0.3} />
                    <Hero coat ash={1} position={O(-8.3, 0, -6.6)} rotationY={WEST + 0.6} animation="idle" face="worried" />
        </>
      ),
    },
    {
      cue: "7.bow",
      ...cam.truck({ on: O(-1.2, 1.2, 8), dist: 7.2, yaw: 62, pitch: 9, fov: 42, by: [MARCH * cueLen("7.bow"), 0, 0] }),
      zone: "outpost",
      look: "overworld-day",
      note: "Marching practice: the captain in front with the banner on his back, four behind him in step, and one small one at the end who is not.",
      stage: (t) => {
        const x = -1 + t * MARCH;
        return (
          <>
            <Pillager chief position={O(x + 3, 0, 8)} rotationY={EAST} walk={t * MARCH} />
            <Banner position={O(x + 2.7, 0.75, 8)} t={t} rotation={[0, 0, 0.12]} />
            {[0, 1, 2, 3].map((i) => (
              <Pillager key={i} position={O(x + 1.7 - i * 1.1, 0, 8)} rotationY={EAST} walk={t * MARCH} n={i} armR={-0.6 + Math.sin(t * 7) * 0.6} armL={-0.6 - Math.sin(t * 7) * 0.6} />
            ))}
            <Hero coat ash={1} position={O(x - 2.5, Math.abs(Math.sin(t * 6.3)) * 0.14, 8.75)} rotationY={EAST} animation="walk" animDistance={t * 2.4} face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "7.hat",
      ...cam.push({ on: O(1.9, 1.4, 8.1), dist: 5.2, to: 4.4, yaw: 66, pitch: 7, fov: 42 }),
      zone: "outpost",
      look: "overworld-day",
      note: "He trips over his own boots and goes into the captain's back head first. The banner leaves the captain and turns over in the air.",
      stage: (t) => {
        const fall = tw(t, TRIP, TRIP + 0.25);
        const fly = Math.max(0, Math.min(1, (t - KNOCK + 0.1) / 0.7));
        return (
          <>
            <Pillager chief position={O(2 + fly * 0.25, 0, 8)} rotationY={EAST} lean={fly > 0 ? 0.35 * (1 - fly) : 0} turn={0} />
            <Banner position={O(1.7 + fly * 0.9, 0.75 + Math.sin(fly * Math.PI) * 1.4 - fly * 0.7, 8 + fly * 1.1)} t={t} rotation={[fly * 4.4, 0, 0.12]} />
            <Hero coat ash={1} position={O(Math.min(1.45, 0.2 + t * 1.9), 0, 8.15)} rotationY={EAST} pose={fall > 0.5 ? posed("fall", t, {}) : posed("run", t * 3, {})} face={fall > 0.5 ? "surprised" : "uneasy"} />
            <Bits position={O(1.6, 1.3, 8)} t={t - KNOCK + 0.1} color="#d8cfb8" count={8} seed={5} />
            <Pillager position={O(-0.4, 0, 7.6)} rotationY={EAST} n={1} lookAt={O(1.5, 1.2, 8)} />
          </>
        );
      },
    },
    {
      cue: "7.point",
      ...cam.push({ on: O(-0.2, 1.2, 8), dist: 4.4, to: 3.7, yaw: 90, pitch: 6, fov: 42 }),
      zone: "outpost",
      look: "overworld-day",
      note: "Over the captain's shoulder as he turns: four faces looking at him, and the boy, already on his feet, pointing at the one beside him.",
      stage: (t) => {
        const turn = tw(t, TURNED - 0.25, TURNED + 0.1);
        const point = t > POINTED - 0.15;
        return (
          <>
            <Pillager chief position={O(3.0, 0, 8.7)} rotationY={EAST + turn * Math.PI} />
            <Banner position={O(2.0, 0.12, 7.2)} t={0} rotation={[0, 0.5, -1.5]} />
            <Hero coat ash={1} position={O(0.5, 0, 8.4)} rotationY={EAST + (point ? 1.25 : 0)} animation={point ? "point" : "idle"} face={point ? "smug" : "fear"} headYaw={point ? -1.0 : 0} />
            <Pillager position={O(0.5, 0, 7.2)} rotationY={EAST} n={2} lookAt={point ? O(0.5, 1.3, 8.4) : O(3, 1.6, 8.7)} armR={point ? -0.9 : undefined} armL={point ? -0.9 : undefined} />
            <Pillager position={O(-0.9, 0, 8.9)} rotationY={EAST} n={0} lookAt={point ? O(0.5, 1.5, 7.2) : O(3, 1.6, 8.7)} />
            <Pillager position={O(-1.1, 0, 7.5)} rotationY={EAST} n={3} lookAt={point ? O(0.5, 1.5, 7.2) : O(3, 1.6, 8.7)} />
          </>
        );
      },
    },
    {
      cue: "7.pond",
      ...cam.push({ on: O(8.7, 1.5, -7.0), dist: 10, to: 8.6, yaw: 38, pitch: 14, fov: 42 }),
      zone: "outpost",
      look: "overworld-day",
      note: "The pen: the ravager, enormous, with suds on its back, and the one he pointed at scrubbing its neck with a brush. The boy watches over the rail.",
      stage: (t) => (
        <>
          <Ravager position={O(9, 0, -8)} rotationY={SOUTH + 0.66} rider={false} jaw={0.2 + 0.2 * Math.sin(t * 2)} head={Math.sin(t * 1.5) * 0.2} />
          <Pillager position={O(11.1, 0, -6.0)} rotationY={-2.16} n={2} armR={-1.5 + Math.sin(t * 9) * 0.5} lean={0.2}>
            <mesh position={[0, 0, 0.12]}>
              <boxGeometry args={[0.3, 0.12, 0.16]} />
              <meshStandardMaterial color="#c8a15a" />
            </mesh>
          </Pillager>
          <mesh position={O(11.5, 0.22, -5.6)}>
            <boxGeometry args={[0.42, 0.44, 0.42]} />
            <meshStandardMaterial color="#8a8f96" metalness={0.5} />
          </mesh>
          {Array.from({ length: 12 }, (_, i) => (
            <mesh key={i} position={O(8.1 + ((i * 0.37) % 1.8), 2.25 + ((i * 0.23) % 0.5) + Math.sin(t * 3 + i) * 0.06, -9.2 + ((i * 0.61) % 2.2))}>
              <boxGeometry args={[0.34, 0.34, 0.34]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.85} />
            </mesh>
          ))}
          <Hero coat ash={1} position={O(9.0, 0, -5.0)} rotationY={SOUTH + 0.66} animation="idle" face="smug" />
        </>
      ),
    },
  ],
});

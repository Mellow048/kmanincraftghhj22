import { cam, storyScene } from "../../engine";
import { Hero, Lantern, MapTable, NORTH, O, Pillager, Ravager, SOUTH, EAST, Word, cueLen, posed, timing, tw, w } from "./kit";

/** 04 — The plan, in the room up the tower. Floor of the room: y 3.5. */
const TABLE = O(0, 3.5, -7.4);
const AT_TABLE = O(-1.15, 3.5, -7.3);
const BELLCUT = w("8.dawn", "and") - 0.1;
const OUT = w("8.window", "climbed");
const Room = ({ t }: { t: number }) => (
  <>
    <MapTable position={TABLE} />
    <Lantern position={O(0.9, 6.3, -8.2)} light={1.4} reach={6} sway={Math.sin(t) * 0.02} />
    <pointLight position={O(0, 5.6, -7)} color="#ffd9a0" intensity={5} distance={5} decay={1.6} />
  </>
);
const L = cueLen("8.night");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The plan",
  shots: [
    {
      cue: "8.night",
      ...cam.truck({ on: O(4, 0.9, 4), dist: 4.8, yaw: 62, pitch: 10, fov: 42, by: [-1.6 * L, 0, -2.6 * L] }),
      zone: "outpost",
      look: "overworld-night",
      note: "Night again. Behind him across the yard on his toes, between sleepers, toward the lit doorway of the tower.",
      stage: (t) => (
        <>
          <Hero coat ash={1} position={O(4 - t * 1.6, 0, 4 - t * 2.6)} rotationY={-2.59} animation="creep" animDistance={t * 3} face="uneasy" headYaw={Math.sin(t * 4) * 0.5} />
          <Pillager position={O(-0.8, -0.55, 2.8)} rotationY={SOUTH + 0.8} sit nod={0.5} n={1} mad={0} />
          <Pillager position={O(-2.4, -0.55, -0.4)} rotationY={EAST} sit nod={0.5} n={3} mad={0} />
          <pointLight position={O(0, 2.2, -4)} color="#ffc890" intensity={12} distance={9} decay={1.5} />
          <pointLight position={O(3, 3, 5)} color="#9db8ff" intensity={8} distance={9} decay={1.5} />
        </>
      ),
    },
    {
      cue: "8.table",
      ...cam.push({ on: O(-0.2, 4.6, -7.2), dist: 7.2, to: 5.2, yaw: 0, pitch: 16, fov: 40 }),
      zone: "outpost",
      look: "overworld-night",
      note: "From outside, in through the tower's window: a lantern, a table, a big paper on it, and his head coming up into the room.",
      stage: (t) => (
        <>
          <Room t={t} />
          <Hero coat ash={1} position={[AT_TABLE[0], 3.5 - 1.2 * (1 - tw(t, 0, 0.7)), AT_TABLE[2]]} rotationY={EAST} animation="idle" face="surprised" headPitch={0.3} />
        </>
      ),
    },
    {
      cue: "8.map",
      ...cam.top({ on: O(0, 4.4, -7.4), height: 2.05, to: 1.55, spin: [0, 10], fov: 46 }),
      zone: "outpost",
      look: "overworld-night",
      note: "Straight down on the paper: little houses, a road, the woods — his town — and on the gold square in the middle of it, a red X.",
      stage: (t) => (
        <>
          <Room t={t} />
          <Hero coat ash={1} position={AT_TABLE} rotationY={EAST} pose={posed("leanOver", t, {})} face="surprised" />
          <pointLight position={O(0, 5.2, -7.4)} color="#fff0d0" intensity={4} distance={3} decay={1.5} />
        </>
      ),
    },
    {
      cue: "8.dawn",
      ...cam.orbit({ on: O(0.1, 4.34, -7.36), dist: 1.6, distTo: 1.25, yaw: 64, yawTo: 36, pitch: 30, fov: 40 }),
      zone: "outpost",
      look: "overworld-night",
      note: "Low over the map: a row of red marks goes from the woods to the town, past a little painted sun. His face behind it, reading.",
      stage: (t) => (
        <>
          <Room t={t} />
          <Hero coat ash={1} position={AT_TABLE} rotationY={EAST} pose={posed("leanOver", t, { armR: [-1.2, 0, -0.2] })} face="worried" />
          <pointLight position={O(0.6, 5.0, -6.6)} color="#fff0d0" intensity={4} distance={3} decay={1.5} />
        </>
      ),
    },
    {
      cue: "8.dawn",
      cut: BELLCUT,
      ...cam.push({ on: O(0.02, 4.36, -7.34), dist: 0.9, to: 0.62, yaw: 20, pitch: 42, fov: 38 }),
      zone: "outpost",
      look: "overworld-night",
      note: "'They would take the bell first': closer still, the gold bell on the paper and the red X across it.",
      stage: (t) => (
        <>
          <Room t={t} />
          <pointLight position={O(0.3, 4.9, -6.9)} color="#fff0d0" intensity={3} distance={2.5} decay={1.5} />
        </>
      ),
    },
    {
      cue: "8.warn",
      ...cam.push({ on: [AT_TABLE[0], 4.72, AT_TABLE[2]], dist: 2.0, to: 1.6, yaw: 62, pitch: 12, fov: 38 }),
      zone: "outpost",
      look: "overworld-night",
      note: "His grey face in the lantern light, eyes wide: nobody could ring it, so nobody could run.",
      stage: (t) => (
        <>
          <Room t={t} />
          <Hero coat ash={1} position={AT_TABLE} rotationY={EAST} animation="idle" face="fear" headPitch={0.1} />
          <pointLight position={O(0.4, 4.6, -7.3)} color="#ffd9a0" intensity={3} distance={3} decay={1.5} />
        </>
      ),
    },
    {
      cue: "8.ravager",
      ...cam.push({ on: O(9, 1.2, -8), dist: 10.5, to: 9, yaw: -60, pitch: 40, fov: 44 }),
      zone: "outpost",
      look: "overworld-night",
      note: "Out over the rail of the tower, down into the pen: the ravager asleep, as big as the pen, its sides going up and down.",
      stage: (t) => (
        <>
          <Ravager position={O(9, 0, -8)} rotationY={SOUTH} rider={false} jaw={0.15 + 0.15 * Math.sin(t * 2)} head={-0.35} scale={1.25 + Math.sin(t * 2) * 0.02} />
          <Word at={O(9.6, 2.6, -6.2)} t={t % 1.1} text="Z" yaw={-60} height={0.5} life={1.0} />
          <pointLight position={O(8, 5, -6)} color="#9db8ff" intensity={40} distance={14} decay={1.5} />
        </>
      ),
    },
    {
      cue: "8.window",
      ...cam.push({ on: O(0, 4.0, -4.8), dist: 5.2, to: 4.3, yaw: 14, pitch: -22, fov: 42 }),
      zone: "outpost",
      look: "overworld-night",
      note: "From the ground, up at the window: his face in it, looking down. Then a leg over the sill, and he hangs from it by his hands.",
      stage: (t) => {
        const out = t > OUT;
        return (
          <>
            <Lantern position={O(0.9, 6.3, -8.2)} light={1.4} reach={6} />
            {out ? (
              <Hero coat ash={1} position={O(0, 2.62 + Math.sin(t * 5) * 0.02, -4.66)} rotationY={NORTH} pose={posed("reachUp", t, { legR: [Math.sin(t * 6) * 0.4, 0, 0], legL: [-Math.sin(t * 6) * 0.4, 0, 0] })} shadow={false} />
            ) : (
              <Hero coat ash={1} position={O(0, 3.5, -5.5)} rotationY={SOUTH} animation="idle" face="fear" headPitch={0.5} />
            )}
            <pointLight position={O(1.5, 3.5, -2.5)} color="#9db8ff" intensity={14} distance={8} decay={1.5} />
          </>
        );
      },
    },
  ],
});

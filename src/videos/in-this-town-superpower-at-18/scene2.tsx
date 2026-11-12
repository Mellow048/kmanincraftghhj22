import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, DAY, Folk, Mom, Old, PLACE, SOUTH, Sock, ZONE, pop, timing, villagerFace, wordAt } from "./kit";

const MUM: Vec3 = [3, 0, 3];
const SOCK = wordAt("2.mother", "sock");
const P = PLACE.pond;
const TWO = wordAt("2.two", "two");

/** NOBODY GOT A GOOD ONE. Two powers, to set the scale. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Nobody got a good one",
  shots: [
    {
      cue: "2.who",
      ...cam.orbit({ on: [0, 1.7, -1.6], dist: 6.6, yaw: 22, pitch: 5, yawTo: -8 }),
      zone: ZONE.day,
      look: DAY,
      note: "Round the bell, low. Three villagers stand under it with their heads tipped back, staring up at it. It tells them nothing.",
      stage: () => (
        <>
          <Folk n={0} position={[1.3, 0, -0.9]} rotationY={-0.8} lookAt={[0, 3, -2.5]} />
          <Folk n={3} position={[-1.3, 0, -0.9]} rotationY={0.8} lookAt={[0, 3, -2.5]} />
          <Folk n={5} position={[0, 0, -0.3]} rotationY={Math.PI} lookAt={[0, 3, -2.5]} />
        </>
      ),
    },
    {
      cue: "2.good",
      ...cam.truck({ on: [-0.6, 1.45, 2.4], dist: 3.2, yaw: -20, pitch: 2, by: [0.9, 0, -0.5] }),
      zone: ZONE.day,
      look: DAY,
      note: "Three villagers in a row, nearest to farthest, each shaking a long nose: no, not a good one.",
      stage: (t) => (
        <>
          <Folk n={1} position={[-1.3, 0, 3.2]} rotationY={-0.4} turn={Math.sin(t * 7) * 0.4} />
          <Folk n={2} position={[-0.3, 0, 2.2]} rotationY={-0.3} turn={Math.sin(t * 7 + 1) * 0.4} />
          <Folk n={4} position={[0.7, 0, 1.2]} rotationY={-0.2} turn={Math.sin(t * 7 + 2) * 0.4} />
        </>
      ),
    },
    {
      cue: "2.mother",
      ...cam.push({ on: [MUM[0], 1.35, MUM[2]], dist: 2.7, to: 2.2, yaw: 10, pitch: 2, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "His mother, in the white robe. On 'sock' one sock rises in front of her with a little glow, as if it had always been there. She is very proud.",
      stage: (t) => (
        <>
          <Mom position={MUM} rotationY={SOUTH} nod={0.1} hmm={t > SOCK ? 1 : 0} />
          {t >= SOCK ? <Sock position={[MUM[0] + 0.05, 0.7 + 0.45 * pop(t, SOCK, 0.3), MUM[2] + 0.5]} rotation={[0, 0.3, 0.2]} /> : null}
          <Bits position={[MUM[0], 1.15, MUM[2] + 0.5]} t={t - SOCK} color="#ffffff" count={8} seed={5} power={0.5} />
        </>
      ),
    },
    {
      cue: "2.socks",
      ...cam.push({ on: [MUM[0], 0.15, MUM[2] + 0.9], dist: 1.6, to: 1.25, yaw: 16, pitch: 26, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Under a second: a small heap of odd socks at her feet. That is the whole power.",
      stage: () => (
        <>
          <Mom position={MUM} rotationY={SOUTH} />
          {(
            [
              [-0.25, 0.9, "#f4f1ea", 0.2],
              [0.05, 1.0, "#7ac8ff", 1.4],
              [0.3, 0.85, "#ffd24a", 2.5],
              [-0.05, 0.75, "#c58aff", 3.3],
              [0.15, 0.7, "#8dff7a", 4.6],
            ] as Array<[number, number, string, number]>
          ).map(([x, z, c, r], i) => (
            <Sock key={i} position={[MUM[0] + x, 0.07, MUM[2] + z]} rotation={[Math.PI / 2, r, 0]} color={c} />
          ))}
        </>
      ),
    },
    {
      cue: "2.old",
      ...cam.push({ on: [P[0] + 0.3, 0.35, P[2]], dist: 3.9, to: 3.2, yaw: 18, pitch: 16, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "The pond. The oldest man, in purple, walks in until only the very top of his head shows. Bubbles.",
      stage: (t, { p }) => (
        <>
          <Old position={[P[0] + 0.3, -0.5 - 1.05 * Math.min(1, p * 1.6), P[2]]} rotationY={SOUTH} />
          <Bits position={[P[0] + 0.3, 0.1, P[2] + 0.2]} t={(t % 0.7) + 0.05} color="#dff0ff" count={5} seed={Math.floor(t / 0.7) + 2} power={0.3} />
        </>
      ),
    },
    {
      cue: "2.two",
      ...cam.push({ on: [P[0] + 0.3, 0.9, P[2]], dist: 2.6, to: 2.2, yaw: -14, pitch: 8, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "On 'two' he comes straight back up out of the water, gasping, in a burst of spray.",
      stage: (t) => {
        const up = pop(t, TWO - 0.25, 0.25);
        return (
          <>
            <Old position={[P[0] + 0.3, -1.55 + 1.0 * up, P[2]]} rotationY={SOUTH} hmm={up} nod={-0.2 * up} />
            <Bits position={[P[0] + 0.3, 0.15, P[2] + 0.1]} t={t - TWO + 0.25} color="#dff0ff" count={16} seed={9} power={1.1} />
          </>
        );
      },
    },
  ],
});

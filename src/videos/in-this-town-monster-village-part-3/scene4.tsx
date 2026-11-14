import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { AT, Black, Bubble, Dad, Folk, Mum, NIGHT, Village, WARM, Z3, ease, h, monsterFace, pop, ramp, timing, wordAt } from "./kit";

const D = AT.dad;
const M = AT.mum;
const MFACE = monsterFace("zombie", M);
/** Where the teacher ends up in the huddle: the near side of it, with his back to the lens. */
const TB: Vec3 = [D[0] + 0.5, 0, D[2] + 1.5];
/** Inside the sack. */
const S: Vec3 = [340, 0, 0];

const moved = wordAt("7.plan", "moved");
const closer = wordAt("7.plan", "closer");

/** The huddle. `t` is seconds since they started to move in. */
const Huddle: React.FC<{ t: number; back?: boolean }> = ({ t, back = true }) => {
  const k = ease(ramp(t, 0, 0.9));
  const talk = t > 1.0;
  const beat = (i: number): number => (talk ? Math.sin(t * 5 + i * 1.7) : 0);
  const mid: Vec3 = [D[0] - 0.4, 1.0, D[2] - 0.2];
  return (
    <>
      <Village t={t} look={mid} squeeze={k} lean={0.3 * k} mum={false} teacher={false} nod={talk ? 0.2 + 0.2 * beat(1) : 0} />
      <Mum position={[M[0] + 0.6 * k, 0, M[2]]} rotationY={0.9} lean={0.25 * k} arms={talk ? 0.5 + 0.4 * beat(0) : 0.3} wave={talk ? Math.max(0, beat(2)) * 0.6 : 0} lookAt={[mid[0] + beat(3), 1.4, mid[2]]} />
      <Dad position={[D[0], 0, D[2] - 0.5 * k]} rotationY={-0.3} lean={0.25 * k} wave={talk ? 0.4 + 0.3 * beat(4) : 0} nod={talk ? 0.2 * beat(5) : 0} />
      {back ? <Folk kind="enderman" n={0} position={[AT.teacher[0] + (TB[0] - AT.teacher[0]) * k, 0, AT.teacher[2] + (TB[2] - AT.teacher[2]) * k]} rotationY={Math.PI - 0.6 * (1 - k)} walk={2 * k} lean={0.4 * k} nod={talk ? 0.3 + 0.15 * beat(6) : 0} /> : null}
    </>
  );
};

/** MUM HAS A PLAN, and we are not told it. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "I have a plan",
  shots: [
    {
      cue: "7.mum",
      ...cam.push({ on: [M[0] + 0.3, MFACE[1] + 0.45, M[2]], dist: 3.4, to: 2.9, yaw: 10, pitch: -14, fov: 44 }),
      zone: Z3.hide,
      look: WARM,
      note: "Mum from below, pink bow and all: one green hand goes straight up, like a kid in class who knows the answer.",
      stage: (t) => (
        <>
          <Village t={t} look={[M[0], 2.4, M[2]]} mum={false} />
          <Dad position={D} rotationY={0.25} lookAt={MFACE} wave={0.3} />
          <Mum position={M} rotationY={0.3} wave={ease(ramp(t, 0.1, 0.45))} arms={0} />
        </>
      ),
    },
    {
      cue: "7.plan",
      ...cam.push({ on: [M[0] + 0.1, MFACE[1], M[2]], dist: 2.2, to: 1.6, yaw: 14, pitch: 2, fov: 36 }),
      zone: Z3.hide,
      look: WARM,
      note: "Her face, square on, close, the lamps behind her: she says it and she means it.",
      stage: (t) => {
        const plan = wordAt("7.plan", "plan");
        return (
          <>
            <Village t={t} look={MFACE} mum={false} />
            <Dad position={D} rotationY={0.25} lookAt={MFACE} />
            <Mum position={M} rotationY={0.2} wave={1 - ease(ramp(t, plan, plan + 0.4))} arms={0.2} mood="angry" />
            <Bubble text="A PLAN" position={[M[0] + 0.75, MFACE[1] + 0.55, M[2] + 0.3]} rotationY={0.1} scale={0.22 * pop(t, plan - 0.05)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "7.plan",
      cut: moved - 0.15,
      ...cam.top({ on: [D[0] - 0.2, 0, D[2] - 0.6], height: 4.9, to: 4.3, spin: [-12, 10], fov: 74 }),
      zone: Z3.hide,
      look: WARM,
      note: "Straight down: forty monsters close like a fist round mum and dad. The voice stops here. From now on it is only feet on planks.",
      stage: (t) => <Huddle t={t} />,
    },
    {
      cue: "7.plan",
      cut: closer + 0.75,
      ...cam.orbit({ on: [D[0] - 0.3, 1.25, D[2] - 0.3], dist: 4.6, distTo: 3.8, yaw: -70, yawTo: -20, pitch: 6, fov: 42 }),
      zone: Z3.hide,
      look: WARM,
      note: "No words. The lens goes round the outside of the huddle at shoulder height, between backs: mum's hands going, dad nodding, a creeper nodding, heads together. They are talking and we are not let in.",
      stage: (t) => <Huddle t={t + closer + 0.75 - moved + 0.15} />,
    },
    {
      cue: "7.plan",
      cut: closer + 2.4,
      ...cam.push({ on: [TB[0], 1.7, TB[2]], dist: 3.2, to: 0.5, yaw: 4, pitch: 2, fov: 40 }),
      zone: Z3.hide,
      look: WARM,
      note: "Still no words. The teacher's back is the nearest thing, tall and black. The lens goes straight at it and into it until the whole frame is black.",
      stage: (t) => {
        const k = ease(ramp(t, 0.5, 1.45));
        return (
          <>
            <Huddle t={t + closer + 2.4 - moved + 0.15} />
            <Black position={[TB[0], 1.7, TB[2] + 0.2]} size={[0.6 + 5 * k, 1.6 + 4 * k, 0.05]} />
          </>
        );
      },
    },
    {
      cue: "8.dark",
      ...cam.push({ on: [S[0], 1.5, S[2]], dist: 1.2, to: 1.0, yaw: 0, pitch: 0, fov: 60 }),
      zone: Z3.black,
      look: NIGHT,
      note: "Out of the black, into the dark: the inside of a sack, from inside it. Brown weave an inch from the eye, pinpricks of daylight coming through it, all of it swinging as somebody walks.",
      stage: (t) => {
        const sway = Math.sin(t * 5.2) * 0.12;
        const bob = Math.abs(Math.sin(t * 5.2)) * 0.06;
        return (
          <>
            <Black position={[S[0], 1.5, S[2] - 0.6]} size={[8, 8, 0.05]} color="#120c06" />
            <group position={[S[0] + sway, 1.5 + bob, S[2] - 0.5]}>
              {Array.from({ length: 170 }, (_, i) => {
                const x = (Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) * 2.4 - 1.2;
                const y = (Math.abs(Math.sin(i * 78.233) * 12345.678) % 1) * 3.4 - 1.7;
                const on = 0.5 + 0.5 * Math.sin(t * 3 + i);
                return <Black key={i} position={[x, y, 0]} size={[0.018, 0.018, 0.01]} color={on > 0.4 ? "#c9a56a" : "#5a4424"} />;
              })}
              {[-0.9, -0.3, 0.3, 0.9].map((x) => (
                <Black key={x} position={[x, 0, -0.02]} size={[0.012, 3.6, 0.01]} color="#2a1c0e" />
              ))}
            </group>
          </>
        );
      },
    },
  ],
});
void h;

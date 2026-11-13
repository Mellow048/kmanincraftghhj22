import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Class, Classmate, GymTeacher, HEART, Heart, Hero, MathTeacher, NORTH, SOUTH, SPOT, TALL, WEST, ease, hall, ramp, timing, wordAt } from "./kit";

const HEARTS = wordAt("3.school", "hearts");
const CLOSE = wordAt("3.grew", "close");
const FILLED = wordAt("3.teacher", "filled");
const PAST = wordAt("3.teacher", "past");
const WHO = wordAt("3.never", "who");
const GROW = wordAt("3.guess", "grow");

/** The kids in the hall: [x along it, which side (−1 lockers, 1 windows), who, the size of the heart (0 = none)]. */
export const HALL_KIDS: Array<[number, number, number, number]> = [
  [3.5, -1, 6, 0.36],
  [3.9, 1, 9, 0.3],
  [4.5, -1, 1, 0.5],
  [5.0, 1, 4, 0.24],
  [5.6, -1, 7, 0.34],
  [6.2, 1, 10, 0.44],
  [6.8, -1, 11, 0.3],
  [7.3, 1, 2, 0.38],
];
export const hallKid = (x: number, side: number): Vec3 => hall(x, 0, side < 0 ? -0.95 : 1.35);

/** 3.grew: she is at her locker, he comes along the hall and stops by her. */
const SHE = hall(-5.3, 0, -0.9);
const HE_FROM = hall(-2.5, 0, 0.1);
const HE_TO = hall(-4.6, 0, -0.72);

/** 3.never: one heart and two boys it could be for. */
const TRIO: Vec3[] = [hall(5.25, 0, -0.9), hall(6.05, 0, -0.9), hall(6.85, 0, -0.9)];
const WATCHER = hall(6.0, 0, 0.9);

/** 3.teacher: she is at the board, he strolls through behind her. */
const SHE_TEACHES = SPOT.at(-0.45, 0, -2.7);

/**
 * THE RULE. How the power works, and the one thing it will not tell him: who a heart is for. Every picture here is a
 * heart changing size because of somebody. The mistake of the film is made of these four lines.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The rule",
  shots: [
    {
      cue: "3.school",
      ...cam.push({ on: hall(1.9, 1.42, 0.2), dist: 4.9, to: 4.1, yaw: -90, pitch: 6, fov: 44 }),
      zone: "hall",
      note: "Along the hall: he walks at the lens with his mouth open, and behind him a heart pops over one head after another, all the way to the far doors. 'Everywhere' is a row of them running into the distance.",
      stage: (t) => {
        const walk = stride(hall(2.9, 0, 0.2), hall(1.4, 0, 0.2), ramp(t, -0.2, 2.1));
        return (
          <>
            <Hero {...walk} animation="walk" face={t > HEARTS + 0.3 ? "grin" : "wow"} headYaw={Math.sin(t * 3.4) * 0.5} headPitch={-0.12} />
            {HALL_KIDS.map(([x, side, who, size], i) => {
              const at = hallKid(x, side);
              return (
                <group key={i}>
                  <Classmate who={who} position={at} rotationY={side < 0 ? SOUTH + (i % 2 ? 0.5 : -0.4) : NORTH + (i % 2 ? 0.4 : -0.5)} animation={i % 3 === 0 ? "talk" : "idle"} face={i % 2 ? "smile" : "grin"} phase={i * 0.7} />
                  {size > 0 ? <Heart over={at} size={size} t={t - (HEARTS - 0.45 + i * 0.11)} yaw={-90} /> : null}
                </group>
              );
            })}
          </>
        );
      },
    },
    {
      cue: "3.grew",
      ...cam.push({ on: hall(-4.92, 1.42, -0.8), dist: 4.6, to: 4.0, yaw: 0, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "The rule, in one picture: a girl at her locker with a small heart, a boy comes along the hall, and it swells as he comes. The lockers behind it are dark, so the heart reads.",
      stage: (t) => {
        const p = ease(ramp(t, 0.1, CLOSE + 0.1));
        const walk = stride(HE_FROM, HE_TO, p);
        return (
          <>
            <Classmate who={7} position={SHE} rotationY={SOUTH + 0.35 * p} animation="idle" face={p > 0.6 ? "grin" : "smile"} lookAt={p > 0.3 ? [walk.position[0], 1.2, walk.position[2]] : undefined} />
            <Heart over={SHE} size={HEART.small + (HEART.big - HEART.small) * p} yaw={0} />
            {p < 1 ? <Classmate who={11} {...walk} animation="walk" face="smile" /> : <Classmate who={11} position={HE_TO} rotationY={WEST + 0.55} animation="idle" arms="wave" face="grin" />}
          </>
        );
      },
    },
    {
      cue: "3.teacher",
      ...cam.push({ on: SPOT.at(-0.3, 1.5, -3.0), dist: 5.3, to: 5.05, yaw: 5, pitch: 0, fov: 46 }),
      zone: "class",
      note: "From his desk: the math teacher at the board, the gym teacher strolls through behind her, and her heart blows up behind her head until the board is gone and the frame is pink. The first joke of the power, and the classroom, in one shot.",
      stage: (t) => {
        const p = ramp(t, FILLED - 0.5, PAST + 0.5);
        const walk = stride(SPOT.at(1.7, 0, -3.2), SPOT.at(-1.35, 0, -3.2), p);
        const big = ease(ramp(t, FILLED - 0.2, PAST + 0.1));
        const size = HEART.mid + big * big * 2.0;
        return (
          <>
            <Class />
            <MathTeacher position={SHE_TEACHES} rotationY={SOUTH} animation={big > 0.15 ? "idle" : "talk"} face={big > 0.15 ? "wow" : "smile"} lookAt={big > 0.15 ? [walk.position[0], 1.7, walk.position[2] + 1.2] : undefined} />
            <Heart over={[SHE_TEACHES[0], 0, SHE_TEACHES[2] - 0.85]} tall={TALL.adult - 0.7 * big} size={size} yaw={5} />
            <GymTeacher {...walk} animation="walk" arms="wave" face="grin" lookAt={[SHE_TEACHES[0], 1.6, SHE_TEACHES[2]]} />
          </>
        );
      },
    },
    {
      cue: "3.never",
      ...cam.push({ on: hall(6.05, 1.42, -0.6), dist: 5.3, to: 4.8, yaw: 0, pitch: 11, fov: 44 }),
      zone: "hall",
      note: "One heart, over the girl in the middle, and a boy on each side of her. He stands in front of them with his back to us and looks from one to the other: the heart points at nobody.",
      stage: (t) => (
        <>
          <Classmate who={10} position={TRIO[0]} rotationY={SOUTH + 0.5} animation="talk" face="smile" />
          <Classmate who={4} position={TRIO[1]} rotationY={SOUTH} animation="idle" face="smile" headYaw={Math.sin(t * 2.2) * 0.3} />
          <Classmate who={9} position={TRIO[2]} rotationY={SOUTH - 0.5} animation="idle" arms="wave" face="grin" />
          <Heart over={TRIO[1]} size={HEART.mid} yaw={0} />
          {/* He stands a good way back from them, so that he is the bottom of the picture and not the middle of it. */}
          <Hero position={[WATCHER[0], 0, WATCHER[2] + 1.1]} rotationY={NORTH} animation={t > WHO ? "shrug" : "idle"} face="uneasy" headYaw={t > WHO ? 0 : Math.sin(t * 5.2) * 0.75} />
        </>
      ),
    },
    {
      cue: "3.guess",
      ...cam.push({ on: hall(6.25, 1.5, -0.85), dist: 3.7, to: 3.3, yaw: -22, pitch: 5, fov: 42 }),
      zone: "hall",
      note: "So he watches. The boy on the right takes one step closer to her and the heart jumps: that is how he reads a heart, and it is the method that fails him at the dance.",
      stage: (t) => {
        const step = ease(ramp(t, GROW - 0.5, GROW - 0.1));
        const near: Vec3 = [TRIO[2][0] - 0.34 * step, 0, TRIO[2][2] + 0.05 * step];
        return (
          <>
            <Classmate who={4} position={TRIO[1]} rotationY={SOUTH - 0.3 * step} animation="idle" face={step > 0.5 ? "grin" : "smile"} />
            <Classmate who={9} position={near} rotationY={WEST + 0.5} animation={step > 0 && step < 1 ? "walk" : "talk"} animDistance={step * 0.34} face="grin" />
            <Heart over={TRIO[1]} size={HEART.mid + (HEART.big - HEART.mid) * 1.2 * step} yaw={-22} />
            <Hero position={[WATCHER[0] + 0.62, 0, WATCHER[2] + 0.1]} rotationY={NORTH + 0.25} animation="idle" arms={step > 0.6 ? "point" : "idle"} face={step > 0.6 ? "grin" : "calm"} />
          </>
        );
      },
    },
  ],
});

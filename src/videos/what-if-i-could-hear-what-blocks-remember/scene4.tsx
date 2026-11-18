import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Classmate, EchoTrace, Hero, LUNCH, NORTH, PLACE, Puffs, Sandwich, SOUTH, SPOT, Teacher, Tray, pop, ramp, timing, wordAt } from "./kit";

const DESK = SPOT.desk(1, 1);
const DESK_ECHO: Vec3 = [DESK[0], DESK[1] + 0.33, DESK[2] - 0.08];
const LOCKER: Vec3 = [PLACE.hall[0] - 5.25, 1.15, PLACE.hall[2] - 1.68];
const BOOK: Vec3 = [LOCKER[0] - 0.12, 1.22, LOCKER[2] + 0.36];
const KEY: Vec3 = [LOCKER[0] + 0.19, 1.22, LOCKER[2] + 0.38];
const TRAY_TOP = LUNCH.top(0, 0, 0);
const TEACHER = SPOT.teacher;
const TEACHER_ECHO: Vec3 = [TEACHER[0] + 1.05, 1.48, TEACHER[2] - 0.58];

/** A student finds the answer, not a floating label: a key slides out from behind a book. */
const LostKey: React.FC<{ at: Vec3; t: number }> = ({ at, t }) => (
  <group position={at} rotation={[0, t * 1.5, 0]}>
    <Block position={[-0.12, 0, 0]} size={[0.16, 0.16, 0.08]} color="#f2c230" metalness={0.35} roughness={0.45} />
    <Block position={[0.03, 0, 0]} size={[0.3, 0.07, 0.07]} color="#f2c230" metalness={0.35} roughness={0.45} />
    <Block position={[0.16, -0.05, 0]} size={[0.055, 0.15, 0.07]} color="#c99028" metalness={0.3} roughness={0.5} />
    <Block position={[0.25, -0.05, 0]} size={[0.055, 0.12, 0.07]} color="#f2c230" metalness={0.3} roughness={0.5} />
  </group>
);

/** A school day in six quick wins. The blocks give useful information, but none of them gives a speaker or a date. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Little wins",
  shots: [
    {
      cue: "4.desk",
      ...cam.push({ on: [DESK_ECHO[0], 1.08, DESK_ECHO[2]], dist: 3.4, to: 2.8, yaw: 184, pitch: 8, fov: 40 }),
      zone: "class",
      note: "His hand reaches the desk on 'check'. The blue square ripple comes from the ordinary wood-and-metal desk; it points to the lunch room, so he looks up and goes.",
      stage: (t) => (
        <>
          <Hero position={SPOT.seat(1, 1)} rotationY={NORTH} animation="reach" arms="reach" face="wow" gaze={0} />
          <EchoTrace at={DESK_ECHO} t={t - wordAt("4.desk", "check")} />
        </>
      ),
    },
    {
      cue: "4.lunch",
      ...cam.push({ on: [TRAY_TOP[0], 1.0, TRAY_TOP[2] + 0.05], dist: 4.0, to: 3.35, yaw: 7, pitch: 13, fov: 42 }),
      zone: "lunch",
      note: "A small, legible payoff: the missing sandwich is directly underneath the empty tray. On 'sandwich' the tray lifts in his hand and the green-and-gold filling appears; his face changes from doubt to delighted disbelief.",
      stage: (t) => {
        const reveal = ramp(t, wordAt("4.lunch", "sandwich"), wordAt("4.lunch", "sat"));
        const trayY = TRAY_TOP[1] + 0.135 + 0.34 * reveal;
        return (
          <>
            <Hero position={LUNCH.seat(0, "n", 0)} rotationY={SOUTH} animation="reach" arms="reach" face={reveal > 0.72 ? "grin" : "wow"} gaze={0} />
            <Sandwich position={[TRAY_TOP[0], TRAY_TOP[1] + 0.065, TRAY_TOP[2]]} scale={1.15} />
            <Tray position={[TRAY_TOP[0], trayY, TRAY_TOP[2]]} empty />
            <Block position={[TRAY_TOP[0] - 0.58, 0.71, TRAY_TOP[2] + 0.16]} size={[0.24, 0.025, 0.18]} color="#d9d2bf" castShadow={false} />
          </>
        );
      },
    },
    {
      cue: "4.locker",
      ...cam.push({ on: [LOCKER[0], 1.48, LOCKER[2] + 0.2], dist: 3.8, to: 3.1, yaw: -6, pitch: 5, fov: 40 }),
      zone: "hall",
      note: "Back in the locker corridor, another remembered phrase throws the same blue squares across a locker door. The camera follows the ring to the top shelf; no voice-shaped ghost appears.",
      stage: (t) => (
        <>
          <Hero position={[LOCKER[0] + 1.05, 0, PLACE.hall[2] + 0.35]} rotationY={NORTH + 0.55} animation="reach" arms="reach" face="wow" />
          <EchoTrace at={LOCKER} t={t - wordAt("4.locker", "locker")} />
          <Block position={[LOCKER[0] - 0.18, 1.88, LOCKER[2] + 0.3]} size={[0.42, 0.04, 0.28]} color="#6d4831" />
          <Block position={[LOCKER[0] - 0.18, 1.91, LOCKER[2] + 0.3]} size={[0.35, 0.012, 0.22]} color="#d9c9a3" castShadow={false} />
        </>
      ),
    },
    {
      cue: "4.key",
      ...cam.push({ on: [LOCKER[0] + 0.08, 1.36, LOCKER[2] + 0.45], dist: 2.1, to: 1.65, yaw: 8, pitch: 12, fov: 34 }),
      zone: "hall",
      note: "He leans in, nudges the little book aside and finds his key behind it. A clean gold glint is the reward; the locker stays ordinary and the power's ring fades away.",
      stage: (t) => {
        const find = pop(t, wordAt("4.key", "found"), 0.22);
        return (
          <>
            <Hero position={[LOCKER[0] + 0.75, 0, PLACE.hall[2] + 0.42]} rotationY={NORTH + 0.36} animation="crouch" arms="reach" face={find > 0.72 ? "grin" : "wow"} />
            <Block position={BOOK} size={[0.32, 0.05, 0.22]} color="#6d4831" />
            <Block position={[BOOK[0], BOOK[1] + 0.03, BOOK[2]]} size={[0.26, 0.01, 0.18]} color="#d9c9a3" castShadow={false} />
            <LostKey at={[KEY[0] + 0.12 * (1 - find), KEY[1] + 0.025 + 0.08 * find, KEY[2]]} t={t} />
          </>
        );
      },
    },
    {
      cue: "4.class",
      ...cam.push({ on: [TEACHER[0] + 0.2, 1.65, TEACHER[2] - 0.4], dist: 4.6, to: 3.95, yaw: 2, pitch: 5, fov: 44 }),
      zone: "class",
      note: "The wall replays a sneeze in its blue rings beside the teacher, who has already turned back to the lesson and rubs his nose. The afterimage is on the wall, not coming out of the teacher's mouth now.",
      stage: (t) => {
        const sneeze = pop(t, wordAt("4.class", "sneeze"), 0.22);
        return (
          <>
            <Teacher position={TEACHER} rotationY={SOUTH} animation="idle" face="calm" arms="reach" headPitch={0.14} />
            <EchoTrace at={TEACHER_ECHO} t={t - wordAt("4.class", "replayed")} />
            <Puffs position={[TEACHER[0], 1.48, TEACHER[2] + 0.34]} color="#d9e7ec" count={4} rise={0.42} spread={0.12} size={0.07} speed={1.1} opacity={0.38 * sneeze} seed={6} />
          </>
        );
      },
    },
    {
      cue: "4.laugh",
      ...cam.push({ on: SPOT.at(0, 1.0, 1.45), dist: 5.0, to: 4.1, yaw: 180, pitch: 13, fov: 44 }),
      zone: "class",
      note: "Three kids hop at once; the camera cuts low enough to see their faces as the whole class laughs. The boy laughs too, still holding the useless key, before the next beat turns quiet.",
      stage: (t) => {
        const at = wordAt("4.laugh", "jumped");
        const hop = (delay: number) => {
          const k = Math.max(0, Math.min(1, (t - at - delay) / 0.18));
          return 0.34 * Math.sin(Math.PI * k);
        };
        return (
          <>
            <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="laugh" face="laugh" headRoll={0.08 * Math.sin(t * 8)} />
            {[0, 1, 2].map((i) => (
              <Classmate key={i} who={i + 2} position={[SPOT.seat(i, 1)[0], hop(i * 0.045), SPOT.seat(i, 1)[2]]} rotationY={NORTH} animation="laugh" arms="cheer" face="laugh" phase={i * 0.35} />
            ))}
          </>
        );
      },
    },
  ],
});

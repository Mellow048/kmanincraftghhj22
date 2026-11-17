import { Block, cam, storyScene, stride } from "../../engine";
import { Classmate, EchoTrace, Friend, Hero, NORTH, PLACE, SPOT, timing, ramp, wordAt } from "./kit";

const FOLLOW_ECHO: [number, number, number] = [PLACE.hall[0] + 2.8, 1.22, PLACE.hall[2] - 1.62];
const SCRIPT_DESK = SPOT.desk(2, 2);

/** The ordinary school morning: Eli's silence feels like a message about the narrator. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Eli went quiet",
  shots: [
    {
      cue: "2.friend",
      ...cam.push({ on: SPOT.seat(2, 2), dist: 4.6, to: 3.8, yaw: 10, pitch: 7, fov: 43 }),
      zone: "class",
      note: "Eli is the only kid not joining the morning noise. Keep his teal shirt distinct from the orange narrator, and let the camera find him across the desks.",
      stage: () => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="sit" face="uneasy" gaze={0} />
          <Friend position={SPOT.seat(2, 2)} rotationY={NORTH} animation="sit" face="uneasy" headPitch={0.22} gaze={-1} />
          {[0, 1, 2].map((i) => <Classmate key={i} who={i + 2} position={SPOT.seat(i, 0)} rotationY={NORTH} animation="sit" face="smile" />)}
        </>
      ),
    },
    {
      cue: "2.script",
      ...cam.push({ on: SPOT.at(1.25, 0.95, 2.9), dist: 2.7, to: 2.0, yaw: 180, pitch: 10, fov: 36 }),
      zone: "class",
      note: "The script is the clue, but Eli never performs it for the camera. His eyes stay down; one folded cream page rests between his hands on the desk.",
      stage: () => (
        <>
          <Friend position={SPOT.seat(2, 2)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.32} arms="hold" />
          <Block position={[SCRIPT_DESK[0], SCRIPT_DESK[1] + 0.035, SCRIPT_DESK[2]]} size={[0.38, 0.025, 0.3]} color="#eee6d2" rotationY={-0.12} />
          <Block position={[SCRIPT_DESK[0] - 0.04, SCRIPT_DESK[1] + 0.052, SCRIPT_DESK[2] - 0.05]} size={[0.24, 0.008, 0.012]} color="#858e98" castShadow={false} />
        </>
      ),
    },
    {
      cue: "2.question",
      ...cam.push({ on: SPOT.face(1, 2), dist: 2.2, to: 1.75, yaw: 175, pitch: 2, fov: 36 }),
      zone: "class",
      note: "A close reaction: he watches Eli move away without asking. The empty desk between them becomes the question the next beats chase.",
      stage: (t) => {
        const leaving = stride(SPOT.seat(2, 1), SPOT.door, ramp(t, wordAt("2.question", "leaving") - 0.35, 1.55));
        return (
          <>
            <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="sit" face="fear" gaze={0} />
            <Friend {...leaving} animation="walk" face="uneasy" headPitch={0.16} />
          </>
        );
      },
    },
    {
      cue: "2.follow",
      ...cam.truck({ on: [PLACE.hall[0] - 1.1, 1.45, PLACE.hall[2] + 0.8], dist: 5.7, yaw: 0, pitch: 8, fov: 44, by: [2.5, 0, 0] }),
      zone: "hall",
      note: "The lens tracks the boy into the locker corridor and toward another blue ripple. The same memory-sign from the hook appears on an ordinary locker; he follows the rings rather than asking Eli.",
      stage: (t) => {
        const run = stride([PLACE.hall[0] - 4.0, 0, PLACE.hall[2] + 0.72], [PLACE.hall[0] + 2.4, 0, PLACE.hall[2] + 0.72], ramp(t, 0.05, 1.5));
        return (
          <>
            <Hero {...run} animation="run" face="uneasy" />
            <EchoTrace at={FOLLOW_ECHO} t={t - wordAt("2.follow", "whispers")} />
          </>
        );
      },
    },
  ],
});

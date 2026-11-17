import { Block, cam, storyScene, stride } from "../../engine";
import { EchoTrace, Hero, NORTH, PLACE, SPOT, timing, ramp, wordAt } from "./kit";

const HALL_ECHO: [number, number, number] = [PLACE.hall[0] + 1.2, 1.45, PLACE.hall[2] - 1.62];
const EMPTY_DESK = SPOT.desk(1, 1);

/** He takes an old phrase as a present warning and follows it away from the person who could explain it. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The wrong meaning",
  shots: [
    {
      cue: "7.hall",
      ...cam.push({ on: [HALL_ECHO[0], HALL_ECHO[1] + 0.15, HALL_ECHO[2]], dist: 3.0, to: 2.45, yaw: 0, pitch: 7, fov: 38 }),
      zone: "hall",
      note: "A locker repeats the other sentence in the same blue square rings. There is still no face beside it, which is why the boy supplies Eli's face himself.",
      stage: (t) => <EchoTrace at={HALL_ECHO} t={t - wordAt("7.hall", "away")} />,
    },
    {
      cue: "7.assume",
      ...cam.push({ on: [PLACE.hall[0] + 1.0, 1.2, PLACE.hall[2] + 0.7], dist: 2.0, to: 1.65, yaw: 180, pitch: 4, fov: 36 }),
      zone: "hall",
      note: "A close reaction, not another clue: he looks toward the empty lockers and decides Eli meant him. The wrong meaning lands on his face before he moves.",
      stage: () => <Hero position={[PLACE.hall[0] + 1.0, 0, PLACE.hall[2] + 0.7]} rotationY={NORTH} animation="idle" face="fear" gaze={0} headPitch={0.16} />,
    },
    {
      cue: "7.walk",
      ...cam.truck({ on: [PLACE.hall[0], 1.15, PLACE.hall[2] + 1.15], dist: 5.6, yaw: 0, pitch: 7, fov: 44, by: [3.2, 0, 0] }),
      zone: "hall",
      note: "The camera travels with him as he crosses past the room sign and open corridor. He does not look through the doorway or call Eli's name; he follows the echo instead.",
      stage: (t) => {
        const walk = stride([PLACE.hall[0] - 2.2, 0, PLACE.hall[2] + 0.72], [PLACE.hall[0] + 4.1, 0, PLACE.hall[2] + 0.72], ramp(t, 0.05, 1.45));
        return <Hero {...walk} animation="walk" face="uneasy" headPitch={0.14} />;
      },
    },
    {
      cue: "7.empty",
      ...cam.push({ on: [SPOT.door[0] - 0.35, 1.35, SPOT.door[2] + 0.15], dist: 4.1, to: 3.35, yaw: -90, pitch: 9, fov: 42 }),
      zone: "class",
      note: "The east-side classroom door swings open on the word 'open'. The lens sees Eli's desk empty, his script gone, and the narrator halted at the threshold. A real conversation could have answered him in ten seconds.",
      stage: (t) => (
        <>
          <Hero position={[SPOT.door[0] - 0.72, 0, SPOT.door[2] + 0.2]} rotationY={-Math.PI / 2} animation="idle" face="fear" headYaw={-0.2} gaze={0} />
          <Block position={[EMPTY_DESK[0], EMPTY_DESK[1] + 0.04, EMPTY_DESK[2]]} size={[0.34, 0.035, 0.24]} color="#d9c9a3" />
        </>
      ),
    },
  ],
});

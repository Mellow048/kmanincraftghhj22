import { cam, storyScene } from "../../engine";
import { Echo, EchoCoat, Friend, Hero, ME, NORTH, Ruby, SPOT, WorkshopBike, timing } from "./kit";

const MAX = SPOT.seat(2, 2);
const FUTURE: [number, number, number] = [MAX[0], 0, MAX[2] - 0.62];

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The Best Friend",
  shots: [
    {
      cue: "5.max",
      ...cam.push({ on: SPOT.at(0.15, 1.2, 1.1), dist: 4.5, to: 4.0, yaw: 168, pitch: 5, fov: 42 }),
      zone: "class",
      note: "The teller turns toward Max; the see-through grown-up is directly behind his friend, not behind the narrator.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" gaze={0} />
          <Friend position={MAX} rotationY={NORTH} animation="sit" face="calm" headPitch={0.2} />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.52} />
        </>
      ),
    },
    {
      cue: "5.rags",
      ...cam.push({ on: [FUTURE[0], 0.78, FUTURE[2]], dist: 3.6, to: 3.15, yaw: 170, pitch: 13, fov: 38 }),
      zone: "class",
      note: "A closer, lower look makes the holes in the coat and the bare feet unmistakable; Max stays in frame above him.",
      stage: () => (
        <>
          <Friend position={MAX} rotationY={NORTH} animation="sit" face="uneasy" />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.56} lean={0.12} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.9} ragged />
          <Hero position={[ME[0] + 0.12, 0, ME[2]]} rotationY={NORTH} animation="sit" face="uneasy" />
        </>
      ),
    },
    {
      cue: "5.sense",
      ...cam.push({ on: SPOT.face(1, 2), dist: 2.1, to: 1.65, yaw: 172, pitch: 2, fov: 36 }),
      zone: "class",
      note: "The teller's baffled face carries the thought; the future is only a blue shape over his shoulder.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="uneasy" gaze={0} />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.38} />
        </>
      ),
    },
    {
      cue: "5.bike",
      ...cam.push({ on: [SPOT.seat(2, 2)[0] - 0.15, 0.86, SPOT.seat(2, 2)[2]], dist: 4.9, to: 4.35, yaw: 162, pitch: 11, fov: 44 }),
      zone: "class",
      note: "Max works on three salvaged frames at once; the finished bike is the thing he is proud of, and the future stays behind him.",
      stage: (t) => (
        <>
          <Friend position={[MAX[0], 0, MAX[2] + 0.28]} rotationY={NORTH} animation="crouch" arms="reach" face="smile" />
          <WorkshopBike position={[MAX[0] - 0.78, 0, MAX[2] - 0.18]} rotationY={0.15} frameColor="#4e84ad" chainBroken />
          <WorkshopBike position={[MAX[0] + 0.03, 0, MAX[2] - 0.52]} rotationY={-0.2} frameColor="#7a596f" chainBroken />
          <WorkshopBike position={[MAX[0] + 0.82, 0, MAX[2] - 0.12]} rotationY={0.08} frameColor="#357f75" />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.5} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.86} ragged />
        </>
      ),
    },
    {
      cue: "5.ruby",
      ...cam.push({ on: SPOT.at(0.45, 1.18, 1.0), dist: 4.6, to: 4.1, yaw: 157, pitch: 5, fov: 42 }),
      zone: "class",
      note: "The teller's eyes move from Max to Ruby; Max remains between them, and his shabby future stays planted behind him.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="uneasy" lookAt={[SPOT.seat(2, 1)[0], 1.1, SPOT.seat(2, 1)[2]]} />
          <Friend position={MAX} rotationY={NORTH} animation="sit" face="calm" />
          <Ruby position={SPOT.seat(2, 1)} rotationY={NORTH} animation="sit" face="calm" />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.5} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.84} ragged />
        </>
      ),
    },
  ],
});

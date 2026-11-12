import { cam, storyScene } from "../../engine";
import { Elder, Hero, NORTH, timing } from "./kit";
/** Beat 5: The adults keep him away. The recorded words, not hand-set seconds, own every cut. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The adults keep him away",
  shots: [
    {
      cue: "5.ask",
      ...cam.push({ on: [-0.7, 1.25, -5.0], dist: 4.6, to: 4, yaw: -20, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "From the foot of the tower, the kid is low and near; the adult stands a step higher and blocks the way to the bell.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[-1.25, 0, -4.5]} rotationY={2.5} animation="talk" face="frown" time={t + 0.8} /><Elder position={[0, 0.25, -5.7]} animation="point" face="uneasy" time={t + 0.8} />
      </>),
    },
    {
      cue: "5.tug",
      ...cam.push({ on: [0, 5.45, -8.5], dist: 5.6, to: 5.0, yaw: 12, pitch: -9, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The tempting rope is high above the child. The adult hand enters below it: a wrong tug would make the whole square obey.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[-0.7, 0, -5.8]} animation="reachUp" face="brave" time={t + 0.8} /><Elder position={[1, 0, -5.7]} animation="press" face="frown" time={0.8} />
      </>),
    },
    {
      cue: "5.no",
      ...cam.push({ on: [0, 1.73, -5.7], dist: 2.7, to: 2.25, yaw: -5, pitch: 5, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "A reverse on the adult, palm between the teller and the tower. Keep the near boy off the lens axis so the refusal has a face.",
      stage: (t, { p, dur }) => (<>
        <Elder position={[0, 0.25, -5.7]} animation="press" face="frown" time={0.7} /><Hero position={[-0.75, 0, -4.6]} rotationY={NORTH} animation="idle" face="uneasy" time={0.8} />
      </>),
    },
    {
      cue: "5.watch",
      ...cam.pan({ from: [-4, 2.7, 7.8], on: [-4.8, 1.2, 3.5], onTo: [0, 5.7, -8.8], fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Leave the boy and follow his glance to the distant rope. Curiosity has found a way around the adults without touching anything yet.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[-4.8, 0, 3.5]} animation="idle" face="frown" headYaw={-0.7} time={t + 0.8} />
      </>),
    },
  ],
});

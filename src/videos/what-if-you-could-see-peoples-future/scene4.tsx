import { cam, storyScene } from "../../engine";
import { Classmate, Cookie, Echo, FutureCow, FootballEcho, Hero, ME, NORTH, SPOT, Teacher, timing } from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Three Quick Wins",
  shots: [
    {
      cue: "4.star",
      ...cam.push({ on: SPOT.at(-0.1, 1.2, -1.4), dist: 5.0, to: 4.5, yaw: 8, pitch: 8, fov: 44 }),
      zone: "class",
      note: "The teller holds up his shirt for the football-star future to sign; the helmet, jersey and ball make the grown-up's future legible.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="reach" arms="hold" face="grin" />
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
          <FootballEcho position={SPOT.seat(0, 1)} rotationY={NORTH} />
        </>
      ),
    },
    {
      cue: "4.small",
      ...cam.push({ on: SPOT.at(0, 1.15, -0.25), dist: 5.1, to: 4.55, yaw: 0, pitch: 15, fov: 44 }),
      zone: "class",
      note: "The teller stoops to the smallest child and offers a cookie; the child's future stands quietly behind the desk.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="crouch" arms="reach" face="smile" />
          <Classmate who={5} position={SPOT.seat(1, 0)} rotationY={NORTH} scale={0.58} animation="sit" face="calm" headPitch={0.2} />
          <Cookie position={[SPOT.seat(1, 0)[0] + 0.32, 0.78, SPOT.seat(1, 0)[2] + 0.32]} scale={1.25} />
          <Echo position={SPOT.seat(1, 0)} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.5} walk={0.1} />
        </>
      ),
    },
    {
      cue: "4.cow",
      ...cam.push({ on: SPOT.at(0.1, 1.35, -0.35), dist: 5.3, to: 4.75, yaw: 0, pitch: 14, fov: 44 }),
      zone: "class",
      note: "The smallest child's grown-up hoists a cow above the desks; keep the cow stacked over the Echo, not lost behind the board.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" />
          <Classmate who={5} position={SPOT.seat(1, 0)} rotationY={NORTH} scale={0.58} animation="sit" face="calm" headPitch={0.2} />
          <Echo position={SPOT.seat(1, 0)} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.54} reach={0.8} />
          <FutureCow position={[SPOT.seat(1, 0)[0], 1.42, SPOT.seat(1, 0)[2] + 0.15]} scale={0.74} />
        </>
      ),
    },
  ],
});

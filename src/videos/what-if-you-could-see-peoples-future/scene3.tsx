import { cam, storyScene } from "../../engine";
import { Classmate, Echo, Hero, ME, NORTH, PainterEcho, PirateEcho, SPOT, Teacher, timing } from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The Painter, the Sleeper, the Pirate",
  shots: [
    {
      cue: "3.painter",
      ...cam.push({ on: SPOT.at(-0.1, 1.15, -1.65), dist: 4.8, to: 4.3, yaw: 12, pitch: 8, fov: 44 }),
      zone: "class",
      note: "A future painter stands over the desk that the boy keeps marking; the palette and raised brush make the grown-up's work readable.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" />
          <Classmate who={0} position={SPOT.seat(0, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.25} />
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
          <PainterEcho position={SPOT.seat(0, 1)} rotationY={NORTH} />
        </>
      ),
    },
    {
      cue: "3.sleep",
      ...cam.push({ on: SPOT.at(0, 1.05, -0.5), dist: 5.2, to: 4.65, yaw: 0, pitch: 12, fov: 44 }),
      zone: "class",
      note: "The child sleeps through math, and his future leans over the desk asleep too; keep both heads above the caption line.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="uneasy" />
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sleep" face="calm" headPitch={0.45} />
          <Echo position={SPOT.seat(1, 1)} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.54} lean={0.88} />
        </>
      ),
    },
    {
      cue: "3.pirate",
      ...cam.push({ on: SPOT.at(0, 1.15, -0.35), dist: 5.0, to: 4.45, yaw: 0, pitch: 12, fov: 44 }),
      zone: "class",
      note: "The quiet girl is small in front; her grown-up pirate has a black brim and patch, not another plain blue silhouette.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" />
          <Classmate who={3} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <PirateEcho position={SPOT.seat(1, 0)} rotationY={NORTH} />
        </>
      ),
    },
    {
      cue: "3.why",
      ...cam.push({ on: SPOT.face(1, 2), dist: 2.0, to: 1.6, yaw: 172, pitch: 2, fov: 36 }),
      zone: "class",
      note: "The teller turns back to the lens: he has seen who, but the close face cannot tell him why.",
      stage: () => <Hero position={ME} rotationY={NORTH} animation="sit" face="uneasy" gaze={0} />,
    },
  ],
});

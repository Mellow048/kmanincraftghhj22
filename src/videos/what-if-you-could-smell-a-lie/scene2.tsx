import { cam, storyScene } from "../../engine";
import { A, Classmate, Friend, Hero, Mum, NORTH, SPOT, Teacher, Toast, timing, fit } from "./kit";

/**
 * THE FUN, AND THE PLANT. Six shots.
 *
 * He is good at being right. Then the one person he checks never smells of anything — and a friend says
 * nothing, which also smells of nothing. That silence is the answer, a minute early.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The fun and the plant",
  shots: [
    {
      cue: "4.class",
      ...cam.push(fit({ on: SPOT.at(0, 1.1, 0.4), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "class",
      note: "The boy who cannot be lied to, sitting in a room of smoke, enjoying it. Three heads with smoke and one without.",
      stage: () => (
        <>
          <Hero position={SPOT.seat(1, 1)} rotationY={0} animation="sit" face="grin" />
          <Classmate who={2} position={SPOT.seat(0, 1)} rotationY={0} animation="sit" face="uneasy" />
          <Classmate who={6} position={SPOT.seat(2, 1)} rotationY={0} animation="sit" face="uneasy" />
          <Teacher position={SPOT.teacher} animation="talk" face="calm" />
          <Toast at={SPOT.seat(0, 1)} n={9} seed={2} />
          <Toast at={SPOT.seat(2, 1)} n={9} seed={5} />
        </>
      ),
    },
    {
      cue: "5.mum",
      ...cam.push(fit({ on: A("kitchen", 0.3, 1.45, -2.0), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "kitchen",
      note: "His mum at the counter, back half turned. The one person he wants to check.",
      stage: () => (
        <>
          <Mum position={A("kitchen", 0.3, 0, -2.0)} rotationY={0} animation="idle" face="calm" />
          <Hero position={A("kitchen", -1.0, 0, 0.3)} rotationY={Math.PI * 0.8} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "6.never",
      ...cam.push(fit({ on: A("kitchen", 0.1, 1.35, -0.9), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "kitchen",
      note: "The two of them, and the empty air between their mouths. Nothing rising. The absence is the picture.",
      stage: () => (
        <>
          <Mum position={A("kitchen", 0.5, 0, -1.8)} rotationY={0.3} animation="idle" face="calm" />
          <Hero position={A("kitchen", -0.7, 0, 0.1)} rotationY={Math.PI * 0.9} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "6.fine",
      ...cam.push(fit({ on: A("kitchen", 0.5, 1.5, -1.75), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "kitchen",
      note: "Her face, unbothered, mid-lie that is not a lie. Not one crumb in the air.",
      stage: () => <Mum position={A("kitchen", 0.5, 0, -1.8)} rotationY={0} animation="talk" face="calm" />,
    },
    {
      cue: "6.honest",
      ...cam.push(fit({ on: A("hall", 0, 1.25, 0.1), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "hall",
      note: "The friend, told the good news about his mum, and not saying anything back.",
      stage: () => (
        <>
          <Hero position={A("hall", -0.6, 0, 0.4)} rotationY={0.4} animation="idle" face="smile" />
          <Friend position={A("hall", 0.6, 0, 0.1)} rotationY={0} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "6.silent",
      ...cam.push(fit({ on: A("hall", 0.6, 1.3, 0.1), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "hall",
      note: "The friend's face alone, saying nothing. The camera holds on the silence, because the silence is the clue.",
      stage: () => (
        <>
          <Friend position={A("hall", 0.6, 0, 0.1)} rotationY={0} animation="idle" face="sad" />
          <Hero position={A("hall", -0.9, 0, 0.7)} rotationY={0.5} animation="idle" face="calm" />
        </>
      ),
    },
  ],
});

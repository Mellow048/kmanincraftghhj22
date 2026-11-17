import { cam, storyScene } from "../../engine";
import { A, Classmate, Friend, Hero, NORTH, SPOT, Teacher, Toast, timing, fit } from "./kit";

/**
 * HOOK + THE RULE. Eight shots, eighteen seconds.
 *
 * The question is the title. Then the first lie he ever smelled, and the rule, shown three times fast and
 * then once as a limit: it never works on him.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook and the rule",
  shots: [
    {
      cue: "1.what",
      ...cam.push(fit({ on: [SPOT.teacher[0], 1.1, SPOT.teacher[2] + 0.2], dist: 2.9, to: 2.6, yaw: -12, pitch: 4, fov: 50 })),
      zone: "class",
      note: "The whole class in one tall frame, him at a desk in the front of it, and the first grey wisp of a lie on the right of the board. The power is a smell: the picture has to show a face reading one.",
      stage: (t) => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={0} animation="sit" face="uneasy" />
          <Teacher position={SPOT.teacher} animation="talk" face="calm" />
          {[[0, 0], [0, 1], [2, 0], [2, 1]].map(([c, r], i) => (
            <Classmate key={i} who={i + 2} position={SPOT.seat(c, r)} rotationY={0} animation="sit" face="calm" headPitch={0.2} />
          ))}
          <Friend position={SPOT.seat(2, 2)} rotationY={0} animation="sit" face="calm" />
          <Toast at={[SPOT.teacher[0], 0, SPOT.teacher[2] + 0.2]} n={16} seed={4} />
        </>
      ),
    },
    {
      cue: "2.maths",
      ...cam.push(fit({ on: [SPOT.teacher[0], 1.45, SPOT.teacher[2]], dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "class",
      note: "Her, half turned, mid-sentence. He is out of frame: this is the lie arriving, not the boy yet.",
      stage: () => (
        <>
          <Teacher position={SPOT.teacher} animation="talk" face="smile" />
          <Classmate who={3} position={SPOT.seat(0, 0)} rotationY={0} animation="sit" face="calm" headPitch={0.25} />
        </>
      ),
    },
    {
      cue: "2.teach",
      ...cam.push(fit({ on: [SPOT.seat(1, 2)[0], 1.05, SPOT.seat(1, 2)[2]], dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      note: "Him at his desk, chin up, reading her, and not liking what he reads.",
      stage: () => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={0} animation="sit" face="uneasy" />
          <Classmate who={5} position={SPOT.seat(0, 2)} rotationY={0} animation="sit" face="calm" />
        </>
      ),
    },
    {
      cue: "2.smell",
      ...cam.push(fit({ on: [SPOT.seat(1, 2)[0] + 0.1, 1.3, SPOT.seat(1, 2)[2]], dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      note: "The first toast. Smoke off her mouth, filling the frame above him, and his face changing on it.",
      stage: () => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={0} animation="sit" face="wow" />
          <Toast at={[SPOT.teacher[0], 0, SPOT.teacher[2] + 0.4]} n={16} seed={2} />
        </>
      ),
    },
    {
      cue: "3.hair",
      ...cam.push(fit({ on: A("hall", 0.1, 1.25, 0.2), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "hall",
      note: "The friend, sincere, by the lockers. A wisp he can see and the friend cannot.",
      stage: () => (
        <>
          <Friend position={A("hall", 0.5, 0, 0.1)} rotationY={0} animation="idle" face="smile" />
          <Hero position={A("hall", -0.7, 0, 0.6)} rotationY={0.5} animation="idle" face="frown" />
          <Toast at={A("hall", 0.5, 0, 0.1)} n={10} seed={8} />
        </>
      ),
    },
    {
      cue: "3.dad",
      ...cam.push(fit({ on: A("kitchen", 0.5, 0.95, -0.6), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "kitchen",
      note: "The kitchen, an empty chair at the table, and smoke standing over it. Nobody says the line: the smoke is the line.",
      stage: () => (
        <>
          <Hero position={A("kitchen", -0.9, 0, 0.5)} rotationY={Math.PI * 0.85} animation="idle" face="sad" />
          <Toast at={A("kitchen", 0.9, 0, -0.9)} n={18} seed={3} />
        </>
      ),
    },
    {
      cue: "3.rule",
      ...cam.push(fit({ on: A("class", 0, 1.1, 0.2), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "class",
      note: "The rule stated flat, over the whole room: nine desks and smoke over four of them at once.",
      stage: () => (
        <>
          <Teacher position={SPOT.teacher} animation="talk" face="calm" />
          {[[0, 0], [1, 0], [2, 1]].map(([c, r], i) => (
            <Classmate key={i} who={i + 1} position={SPOT.seat(c, r)} rotationY={0} animation="sit" face="calm" />
          ))}
          <Toast at={SPOT.seat(0, 0)} n={8} seed={1} />
          <Toast at={SPOT.seat(1, 0)} n={8} seed={5} />
          <Hero position={SPOT.seat(1, 2)} rotationY={0} animation="sit" face="uneasy" />
        </>
      ),
    },
    {
      cue: "3.limit",
      ...cam.push(fit({ on: A("kitchen", -0.9, 1.0, 0.3), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "kitchen",
      note: "Him, in the tall mirror, saying something out loud. Nothing comes off his mouth. The limit, shown as an absence.",
      stage: () => (
        <>
          <Hero position={A("kitchen", -0.9, 0, 0.3)} rotationY={0} animation="talk" face="calm" />
        </>
      ),
    },
  ],
});

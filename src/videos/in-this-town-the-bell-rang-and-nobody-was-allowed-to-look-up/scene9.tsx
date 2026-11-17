import { cam, storyScene } from "../../engine";
import { Baker, Crowd, Friend, Golem, Hero, Mum, SubscribeSign, DAY, ease, pop, ramp, timing, wordAt } from "./kit";

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The new rule",
  shots: [
    {
      cue: "9.mum",
      ...cam.push({ on: [9.9, 1.6, -2.7], dist: 4.6, to: 3.6, yaw: 18, pitch: 8, fov: 40 }),
      zone: "village",
      look: DAY,
      note: "She looks at the sky first, and only then at him. The order is the scene.",
      stage: (t) => {
        const him = ease(ramp(t, wordAt("9.mum", "me"), wordAt("9.mum", "me") + 0.3));
        return (
          <>
            <Mum position={[9.5, 0, -3.4]} nod={-0.45 * (1 - him) + 0.15 * him} turn={him * 0.4} />
            <Hero position={[10.35, 0, -2.15]} animation="idle" face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "9.new",
      ...cam.push({ on: [9.6, 1.35, -3.1], dist: 2.1, to: 1.5, yaw: -10, pitch: 4, fov: 34 }),
      zone: "village",
      look: DAY,
      note: "The new rule, said to his face, not shouted at the square.",
      stage: () => <Mum position={[9.5, 0, -3.35]} nod={0.1} hmm={0.4} />,
    },
    {
      cue: "9.bell",
      ...cam.push({ on: [0.3, 2.3, -2.2], dist: 6.6, to: 5.2, yaw: 34, pitch: 8, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "The bell is the subject. He is beside it, chin up. Nobody drops.",
      stage: () => <Hero position={[1.45, 0, -0.7]} animation="reachUp" face="brave" />,
    },
    {
      cue: "9.up",
      ...cam.push({ on: [0.55, 1.8, 1.25], dist: 7.6, to: 6.1, yaw: 8, pitch: 8, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "Travelling the square: the baker, the kids, the iron golem, every chin up.",
      stage: () => (
        <>
          <Baker position={[-1.5, 0, 1.15]} nod={-0.5} />
          <Friend position={[0.15, 0, 1.35]} nod={-0.5} />
          <Hero position={[1.55, 0, 1.2]} animation="reachUp" face="grin" />
          <Golem position={[2.7, 0, 1.7]} bow={-0.3} />
        </>
      ),
    },
    {
      cue: "9.end",
      ...cam.push({ on: [0.2, 1.9, 0.4], dist: 6.8, to: 5.4, yaw: 4, pitch: 6, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "The bell, the town looking up, and the sign. The picture stays the story.",
      stage: (t) => (
        <>
          <Hero position={[0.3, 0, 1.35]} animation="reachUp" face="brave" />
          <Mum position={[-1.35, 0, 0.85]} nod={-0.4} />
          <Crowd n={5} up={1} at={[0.15, 0, 0.2]} />
          <SubscribeSign position={[1.7, 1.15, 0.55]} scale={0.32 * pop(t, 0.35)} />
        </>
      ),
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Baker, Bell, Friend, Golem, Hero, Mum, PLACE, SubscribeSign, DAY, ease, pop, ramp, timing, wordAt } from "./kit";

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The new rule",
  shots: [
    {
      cue: "9.mum",
      ...cam.push({ on: [9.9, 1.45, -2.8], dist: 3, to: 2.1, yaw: 16, pitch: 6, fov: 36 }),
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
      ...cam.push({ on: [0, 2.4, -2.2], dist: 4.6, to: 3.2, yaw: 10, pitch: 8, fov: 38 }),
      zone: "village",
      look: DAY,
      note: "The bell, once, the way it always rang. Nobody drops.",
      stage: (t) => (
        <group position={PLACE.bell} rotation={[0, 0, Math.sin(t * 9) * 0.07]}>
          <Bell position={[0, 0, 0]} />
        </group>
      ),
    },
    {
      cue: "9.up",
      ...cam.truck({ on: [-2.6, 1.35, 2.2], dist: 4.8, yaw: 70, pitch: 4, fov: 42, by: [6.2, 0, 0] }),
      zone: "village",
      look: DAY,
      note: "Travelling the square: the baker, the kids, the iron golem, every chin up.",
      stage: () => (
        <>
          <Baker position={[-1.8, 0, 1.15]} nod={-0.45} lean={-0.1} />
          <Friend position={[0.4, 0, 1.55]} nod={-0.5} />
          <Hero position={[1.8, 0, 1.3]} animation="reachUp" face="grin" />
          <Golem position={[3.6, 0, 2.1]} bow={-0.35} />
        </>
      ),
    },
    {
      cue: "9.end",
      ...cam.push({ on: [0.2, 2.2, -0.6], dist: 5.4, to: 4.2, yaw: 6, pitch: 6, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "The bell, the town looking up, and the sign. The picture stays the story.",
      stage: (t) => (
        <>
          <Bell position={PLACE.bell} />
          <Hero position={[0.35, 0, 1.6]} animation="reachUp" face="brave" />
          <Mum position={[-1.2, 0, 1.3]} nod={-0.4} />
          <SubscribeSign position={[0.3, 2.55, 0.2]} scale={0.42 * pop(t, 0.2)} />
        </>
      ),
    },
  ],
});

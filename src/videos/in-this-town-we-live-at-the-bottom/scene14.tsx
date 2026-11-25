import { cam, storyScene } from "../../engine";
import { Gate, GoldenApple, Hero, Jar, Keeper, PriceBoard, SOUTH, top, w, timing } from "./kit";

/**
 * 14 — The gate. Seven lines, and every one of them closes a door.
 *
 * The money is not enough, the price has gone up, and the apple is not for sale in the only currency he has. He does
 * not argue, because he has been at the bottom of this mountain his whole life and he knows how this goes.
 */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "We do not sell apples for emeralds",
  shots: [
    {
      cue: "14.gate",
      from: top(0, 0.6, -291),
      to: top(0, 2.6, -294),
      target: top(0, 1.4, -299.4),
      targetTo: top(0, 2.6, -300),
      fov: 46,
      ease: "linear" as const,
      zone: "top",
      look: "overworld-day",
      note: "Up from the last step: the gate, in a wall, with clean stone either side. It is bigger than the door of his house and it looks like a bank.",
      stage: () => (
        <>
          <Gate position={top(0, 0, -300)} />
          <Keeper position={top(0, 0, -301.2)} rotationY={SOUTH} animation="idle" face="blank" />
          <Hero position={top(0, 0, -298.4)} rotationY={0} animation="idle" face="uneasy" headPitch={-0.25} />
        </>
      ),
    },
    {
      cue: "14.count",
      ...cam.push({ on: top(0, 1.2, -299.6), dist: 3.2, to: 2.8, yaw: -18, pitch: 6, fov: 38 }),
      zone: "top",
      look: "overworld-day",
      note: "The keeper counts the money with two fingers, the way you count something you already know the total of. The jar sits on the sill between them.",
      stage: () => (
        <>
          <Keeper position={top(0.5, 0, -300.6)} rotationY={SOUTH} animation="reach" face="blank" headPitch={0.3} />
          <Hero position={top(-0.6, 0, -299.2)} rotationY={0} animation="idle" face="worried" />
          <Jar position={top(0, 1.05, -299.6)} fill={1} />
        </>
      ),
    },
    {
      cue: "14.raise",
      ...cam.push({ on: top(2.3, 1.4, -298.9), dist: 2.6, to: 2.3, yaw: -6, pitch: 2, fov: 36 }),
      zone: "top",
      look: "overworld-day",
      note: "The price board on the wall, with one more mark on it than last year. Nobody at the bottom has ever seen this board; that is the entire scam.",
      stage: () => (
        <>
          <PriceBoard position={top(2.3, 0, -298.9)} digits={[1, 0, 0, 0, 1]} rotationY={-0.4} />
          <Keeper position={top(1.6, 0, -300.2)} rotationY={SOUTH} animation="idle" face="blank" />
        </>
      ),
    },
    {
      cue: "14.ask",
      ...cam.push({ on: top(-0.3, 1.42, -299.1), dist: 2.4, to: 2.1, yaw: 12, pitch: 0, fov: 36 }),
      zone: "top",
      look: "overworld-day",
      note: "He asks anyway. Chin up, both hands on the sill: a kid doing the bravest thing available to him, which is asking an adult a question.",
      stage: (t) => (
        <Hero position={top(-0.3, 0, -299.1)} rotationY={0} animation={t < 0.8 ? "talk" : "idle"} face="brave" headPitch={-0.12} />
      ),
    },
    {
      cue: "14.no",
      ...cam.push({ on: top(0.4, 1.5, -300.6), dist: 2.5, to: 2.2, yaw: -10, pitch: 0, fov: 36, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-day",
      note: "The keeper's face saying no. He is not enjoying it and he is not sorry; it is a policy, and he is the policy's mouth.",
      stage: (t) => (
        <Keeper position={top(0.4, 0, -300.6)} rotationY={SOUTH} animation={t < 0.9 ? "talk" : "idle"} face="blank" headPitch={0.05} />
      ),
    },
    {
      cue: "14.eight",
      ...cam.push({ on: top(0, 1.55, -300.9), dist: 2.8, to: 2.4, yaw: 4, pitch: -2, fov: 38 }),
      zone: "top",
      look: "overworld-day",
      note: "Behind the bars, on a stone shelf, one golden apple. Eight gold, and the boy in front of it has forty-one emeralds and a jar of a year's fish.",
      stage: () => (
        <>
          <Gate position={top(0, 0, -300)} />
          <GoldenApple position={top(0, 1.5, -301.2)} scale={1.4} />
          <Hero position={top(0, 0, -298.8)} rotationY={0} animation="idle" face="sad" headPitch={-0.1} />
        </>
      ),
    },
    {
      cue: "14.shut",
      ...cam.push({ on: top(0, 1.4, -298.8), dist: 4.4, to: 3.8, yaw: 16, pitch: 4, fov: 42 }),
      zone: "top",
      look: "overworld-day",
      note: "The gate closes, and it is the only quick thing that happens on the whole top of the mountain. On 'quick' it is already shut.",
      stage: (t) => {
        const shut = w("14.shut", "quick") - 0.3;
        return (
          <>
            <Gate position={top(0, 0, -300)} open={t < shut ? 1 : 0} />
            <Keeper position={top(1.4, 0, -301)} rotationY={SOUTH} animation="idle" face="blank" />
            <Hero position={top(-1.6, 0, -298.6)} rotationY={0} animation="idle" face="hurt" />
          </>
        );
      },
    },
  ],
});

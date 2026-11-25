import { cam, storyScene } from "../../engine";
import { BedBox, GoldenApple, Hero, Jar, Mum, SOUTH, SubscribeSign, tw, room, timing } from "./kit";

/**
 * 18 — Button.
 *
 * Midnight, morning, and a jar nobody wants any more. The last picture is not a speech: it is a full jar with a bare
 * patch of glass where the label used to be.
 */
export const scene18 = storyScene(timing, {
  id: "scene18",
  title: "The label came off",
  shots: [
    {
      cue: "18.ate",
      ...cam.push({ on: room(0, 1.1, -2.2), dist: 3.2, to: 2.8, yaw: -8, pitch: 4, fov: 40 }),
      zone: "room",
      look: "warm-room",
      note: "Midnight, one candle, her hands around a golden apple. On 'midnight' she takes the first bite and the room is the brightest it has been since she got ill.",
      stage: (t) => (
        <>
          <BedBox position={room(0, 0, -2.2)} />
          <Mum position={room(0, 0.62, -2.3)} rotationY={SOUTH} animation={t < 0.5 ? "sit" : "sit"} face={t > 1.2 ? "smile" : "sleepy"} />
          <GoldenApple position={room(0.12, 1.0, -1.9)} scale={t < 0.6 ? 1 : 0.4} />
          <Hero position={room(-1.3, 0, -1.6)} rotationY={SOUTH} animation="idle" face="smile" />
        </>
      ),
    },
    {
      cue: "18.ate",
      cut: 1.5,
      ...cam.push({ on: room(0, 1.32, -2.3), dist: 2.2, to: 1.9, yaw: 10, pitch: 2, fov: 34, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Morning light through the window on her face, and she is sitting up, breathing, annoyed about being fussed over. Alive people are allowed to be annoyed.",
      stage: (t) => (
        <>
          <Mum position={room(0, 0.62, -2.3)} rotationY={SOUTH} animation="sit" face={t > 0.8 ? "smile" : "neutral"} headPitch={0.1} />
          <Hero position={room(-0.9, 0, -1.4)} rotationY={SOUTH} animation="idle" face="laugh" />
        </>
      ),
    },
    {
      cue: "18.jar",
      ...cam.push({ on: room(-0.6, 1.3, -2.5), dist: 2.0, to: 1.7, yaw: 6, pitch: 6, fov: 32 }),
      zone: "room",
      look: "warm-room",
      note: "The jar on the shelf, still full: eleven years of a whole town, and nobody in this house is going to spend it. It has stopped being money and become furniture.",
      stage: () => <Jar position={room(-0.6, 1.28, -2.6)} fill={1} label={1} />,
    },
    {
      cue: "18.label",
      ...cam.push({ on: room(-0.6, 1.32, -2.55), dist: 1.5, to: 1.3, yaw: -4, pitch: 4, fov: 30 }),
      zone: "room",
      look: "warm-room",
      note: "A bare patch of glass where the label was, and four scratches of glue. Somebody peeled THE TOP off. That is the whole ending, and it is a picture.",
      stage: (t) => <Jar position={room(-0.6, 1.28, -2.6)} fill={1} label={1 - tw(t, 0.6, 1.6)} />,
    },
    {
      cue: "18.sub",
      from: [0, 2.0, 21],
      to: [0, 9.5, 28],
      target: [0, 1.2, 11],
      targetTo: [0, 1.0, 8],
      fov: 50,
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-golden",
      note: "The last picture: the jetty in the morning, the whole town on it, and the mountain above with the sun on the top of it, which nobody in the frame is looking at.",
      stage: () => (
        <>
          <Hero position={[0, 0.5, 11.6]} rotationY={SOUTH} animation="idle" face="smile" />
          <Mum position={[0.9, 0.5, 11.9]} rotationY={SOUTH} animation="idle" face="smile" />
          <SubscribeSign position={[0, 0.5, 9.6]} />
        </>
      ),
    },
  ],
});

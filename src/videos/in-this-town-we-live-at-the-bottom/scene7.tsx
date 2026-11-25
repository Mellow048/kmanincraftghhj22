import { cam, storyScene } from "../../engine";
import { BedBox, Coin, GoldenApple, Healer, Hero, Mum, EAST, SOUTH, WEST, room, timing } from "./kit";

/**
 * 07 — Sick.
 *
 * The problem arrives in one line: eight gold. Everything after this is a kid trying to get hold of money that does
 * not exist at the bottom of a mountain.
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Eight gold",
  shots: [
    {
      cue: "7.sick",
      ...cam.push({ on: room(0, 0.9, -1.6), dist: 3.4, to: 3.0, yaw: -10, pitch: 6, fov: 40 }),
      zone: "room",
      look: "warm-room",
      note: "The bed, and her in it, and the kid standing where his hands have nothing to do. Where the film has been wet and outdoor until now, it is suddenly dry and small.",
      stage: () => (
        <>
          <BedBox position={room(0, 0, -2.2)} rotationY={0} />
          <Mum position={room(0, 0.62, -2.4)} rotationY={SOUTH} animation="lie" face="sleepy" />
          <Hero position={room(-1.0, 0, -1.4)} rotationY={EAST} animation="idle" face="worried" headPitch={0.2} />
        </>
      ),
    },
    {
      cue: "7.woman",
      ...cam.push({ on: room(0.5, 1.4, -1.5), dist: 3.2, to: 2.8, yaw: 12, pitch: 2, fov: 38 }),
      zone: "room",
      look: "warm-room",
      note: "The woman who fixes everybody shakes her head at a bed she cannot fix. On 'shook her head' her head goes, once, slowly, and the kid watches it happen.",
      stage: (t) => (
        <>
          <Healer position={room(0.9, 0, -1.2)} rotationY={WEST} hmm={t > 0.7 ? 1 : 0.2} strain={0.3} lookAt={room(0, 0.8, -2.3)} />
          <Hero position={room(-0.3, 0, -1.2)} rotationY={EAST} animation="idle" face={t > 0.7 ? "scared" : "worried"} headPitch={0.15} />
          <BedBox position={room(0, 0, -2.2)} />
          <Mum position={room(0, 0.62, -2.4)} rotationY={SOUTH} animation="lie" face="sleepy" />
        </>
      ),
    },
    {
      cue: "7.cure",
      ...cam.push({ on: room(-2.4, 1.15, -2.2), dist: 2.2, to: 1.9, yaw: 4, pitch: 8, fov: 34 }),
      zone: "room",
      look: "warm-room",
      note: "On the shelf, an old book open at a drawing of a golden apple. One picture is all the medicine the bottom of the mountain has ever had.",
      stage: () => (
        <>
          <Hero position={room(-2.0, 0, -1.7)} rotationY={WEST} animation="reach" face="surprised" headPitch={0.35} />
          <GoldenApple position={room(-2.4, 1.32, -2.3)} scale={0.9} rotationY={0.8} />
          <Coin position={room(-2.1, 1.3, -2.2)} />
        </>
      ),
    },
    {
      cue: "7.gold",
      from: [0, 1.2, 11.0],
      to: [0, 4.4, 15.6],
      target: [0, 0.6, 7],
      targetTo: [4, 14, -31],
      fov: 46,
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-rain",
      note: "Out of the house and onto the water: grey, flat, full of fish and empty of gold. On 'no gold' the lens lifts to the mountain, which is where the gold is.",
      stage: () => (
        <>
          <Hero position={[0, 0.5, 10]} rotationY={SOUTH} animation="idle" face="frown" headPitch={-0.5} lookAt={[2, 30, -31]} />
          <Mum position={[-3.1, 0, 12.4]} rotationY={0} animation="idle" face="blank" />
        </>
      ),
    },
  ],
});

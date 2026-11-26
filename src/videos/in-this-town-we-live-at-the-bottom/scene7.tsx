import { cam, storyScene } from "../../engine";
import { BedBox, Coin, GoldenApple, Healer, Hero, Mum, Villager, EAST, SOUTH, WEST, ease, ramp, room, timing } from "./kit";

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Eight gold",
  shots: [
    {
      cue: "7.sick",
      ...cam.push({ on: room(-0.2, 0.9, -1.7), dist: 3.7, to: 2.3, yaw: -16, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Hero hurries to bedside gripping mattress edge tenderly as weak Mum shivers underneath blanket.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.1));
        return (
          <>
            <BedBox position={room(0, 0, -2.2)} rotationY={0} />
            <Mum position={room(0, 0.62 + Math.sin(t * 4) * 0.015, -2.4)} rotationY={SOUTH} animation="sleep" face="sleepy" time={t} />
            <Hero position={room(-1.3 + step * 0.4, 0, -1.4 - step * 0.2)} rotationY={EAST} animation={step < 0.7 ? "walk" : "leanOver"} animDistance={step * 0.5} face="worried" headPitch={0.2} time={t} />
          </>
        );
      },
    },
    {
      cue: "7.woman",
      ...cam.orbit({ on: room(0.4, 1.35, -1.5), dist: 3.9, distTo: 2.75, yaw: -10, yawTo: 26, pitch: 4, fov: 38, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Village Healer turns slowly shaking her head NO as Hero recoils in panic beside Mum's bed.",
      stage: (t) => {
        const shake = ease(ramp(t, 0.35, 1.0));
        return (
          <>
            <Healer position={room(0.9, 0, -1.2)} rotationY={WEST + Math.sin(t * 7) * 0.25 * shake} hmm={0.2 + 0.8 * shake} strain={0.3} lookAt={room(0, 0.8, -2.3)} />
            <Hero position={room(-0.3 - shake * 0.18, 0, -1.2)} rotationY={EAST} animation={shake > 0.4 ? "scared" : "idle"} face={t > 0.7 ? "scared" : "worried"} headPitch={0.15} time={t} />
            <BedBox position={room(0, 0, -2.2)} />
            <Mum position={room(0, 0.62, -2.4)} rotationY={SOUTH} animation="sleep" face="sleepy" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.cure",
      ...cam.push({ on: room(-2.3, 1.15, -2.2), dist: 3.8, to: 2.25, yaw: 12, pitch: 8, fov: 36, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Dark cramped shelf corner where Hero stands reaching toward single glowing GoldenApple beside wooden counter.",
      stage: (t) => (
        <>
          <Hero position={room(-2.0, 0, -1.7)} rotationY={WEST} animation="reach" face="surprised" headPitch={0.25} time={t} />
          <GoldenApple position={room(-2.4, 1.32, -2.3)} scale={0.9 + Math.sin(t * 3) * 0.06} rotationY={0.8 + t * 0.8} />
          <Coin position={room(-2.05, 1.32, -2.2)} spin={t * 4} />
        </>
      ),
    },
    {
      cue: "7.gold",
      ...cam.crane({ on: [0, 1.1, 10.2], onTo: [1.5, 4.8, 4.0], dist: 4.5, toDist: 10.5, yaw: 8, fromPitch: 12, toPitch: -18, fov: 46, screenOffset: [0, 0.06] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-rain",
      note: "Rainy jetty: Hero drops hopelessly to knees slamming empty hands down before crane rises to sunlit mountain.",
      stage: (t) => {
        const drop = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Hero position={[0, 0.5, 10.2]} rotationY={SOUTH} animation={drop > 0.5 ? "cower" : "shrug"} face="frown" headPitch={-0.45} lookAt={[2, 30, -31]} time={t} />
            <Villager position={[-0.9, 0.5, 7.8 + drop * 0.35]} rotationY={SOUTH} hmm={0.4} walk={drop * 0.4} />
          </>
        );
      },
    },
  ],
});

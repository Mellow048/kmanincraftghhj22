import { cam, storyScene } from "../../engine";
import { BedBox, GoldenApple, Hero, Jar, Mum, SOUTH, SubscribeSign, ease, ramp, room, tw, timing } from "./kit";

export const scene18 = storyScene(timing, {
  id: "scene18",
  title: "The label came off",
  shots: [
    {
      cue: "18.ate",
      ...cam.push({ on: room(0, 1.1, -2.2), dist: 3.9, to: 2.45, yaw: -14, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Mum sits up weakly taking golden apple bite while Hero rushes happily forward to bedside.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.1));
        return (
          <>
            <BedBox position={room(0, 0, -2.2)} />
            <Mum position={room(0, 0.62, -2.3)} rotationY={SOUTH} animation="sit" face={t > 1.0 ? "smile" : "sleepy"} time={t} />
            <GoldenApple position={room(0.12, 1.0, -1.9)} scale={t < 0.6 ? 1 : 0.4} rotationY={t * 1.5} />
            <Hero position={room(-1.5 + step * 0.4, 0, -1.6)} rotationY={SOUTH} animation={step < 0.6 ? "walk" : "cheer"} animDistance={step * 0.5} face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "18.ate",
      cut: 1.5,
      ...cam.push({ on: room(0, 1.32, -2.3), dist: 3.7, to: 2.25, yaw: 14, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Morning sun spills in as Mum sits upright laughing and waving Hero playfully back.",
      stage: (t) => (
        <>
          <Mum position={room(0, 0.62, -2.3)} rotationY={SOUTH} animation="wave" face={t > 0.6 ? "smile" : "neutral"} headPitch={0.1} time={t * 1.3} />
          <Hero position={room(-0.9, 0, -1.4 - Math.min(0.25, t * 0.25))} rotationY={SOUTH} animation="laugh" face="laugh" time={t} />
        </>
      ),
    },
    {
      cue: "18.jar",
      ...cam.orbit({ on: room(-0.6, 1.3, -2.5), dist: 3.4, distTo: 2.2, yaw: -14, yawTo: 18, pitch: 6, fov: 34, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Orbit around shelf showing full untouched emerald jar gathering morning light.",
      stage: (t) => (
        <>
          <Jar position={room(-0.6, 1.28, -2.6)} fill={1} label={1} />
          <Hero position={room(-1.3 + ease(ramp(t, 0, 1.2)) * 0.25, 0, -2.0)} rotationY={-0.3} animation="lookAround" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "18.label",
      ...cam.push({ on: room(-0.6, 1.32, -2.55), dist: 3.3, to: 1.85, yaw: -6, pitch: 4, fov: 32, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Hand reaches up peeling THE TOP label steadily clear of glass jar leaving clean glue patch.",
      stage: (t) => (
        <>
          <Jar position={room(-0.6, 1.28, -2.6)} fill={1} label={1 - tw(t, 0.45, 1.4)} />
          <Hero position={room(-1.25, 0, -1.95)} rotationY={-0.4} animation="reach" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "18.sub",
      ...cam.crane({ on: [0, 1.2, 11.2], onTo: [0, 2.2, 8.5], dist: 8.5, toDist: 14.5, yaw: 6, fromPitch: 8, toPitch: 18, fov: 48, screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-golden",
      note: "Hero and healthy Mum wave joyfully together beside SubscribeSign on sunlit morning jetty beneath mountain.",
      stage: (t) => (
        <>
          <Hero position={[-0.25, 0.5, 11.6 - t * 0.25]} rotationY={SOUTH} animation="wave" face="grin" time={t * 1.3} />
          <Mum position={[0.85, 0.5, 11.9 - t * 0.2]} rotationY={SOUTH} animation="cheer" face="smile" time={t * 1.2} />
          <SubscribeSign position={[0, 0.5 + Math.sin(t * 3) * 0.06, 9.6]} />
        </>
      ),
    },
  ],
});

import { cam, storyScene, walkSegment } from "../../engine";
import { Gate, GoldenApple, Hero, Jar, Keeper, PriceBoard, SOUTH, ease, ramp, top, w, timing } from "./kit";

export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "We do not sell apples for emeralds",
  shots: [
    {
      cue: "14.gate",
      ...cam.crane({ on: top(0, 1.4, -299.4), onTo: top(0, 2.5, -300), dist: 8.5, toDist: 5.5, yaw: 0, fromPitch: 16, toPitch: -6, fov: 44, screenOffset: [0, 0.06] }),
      ease: "linear" as const,
      zone: "top",
      look: "overworld-day",
      note: "Hero marches up onto top stone terrace beside imposing barred Gate as Keeper steps forward inside.",
      stage: (t) => {
        const march = ease(ramp(t, 0, 1.4));
        const keeperWalk = walkSegment(top(0, 0, -301.8), top(0, 0, -301.1), t, 0, 1.4, { yaw: SOUTH });
        return (
          <>
            <Gate position={top(0, 0, -300)} />
            <Keeper {...keeperWalk} face="blank" time={t} />
            <Hero position={top(0, 0, -297.2 - march * 1.4)} rotationY={0} animation={march < 0.8 ? "walk" : "lookAround"} animDistance={march * 1.4} face="uneasy" headPitch={-0.2} time={t} />
          </>
        );
      },
    },
    {
      cue: "14.count",
      ...cam.push({ on: top(0, 1.2, -299.6), dist: 4.1, to: 2.6, yaw: -20, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "Keeper taps coins coldly inside jar on stone sill while breathless Hero holds breath.",
      stage: (t) => (
        <>
          <Keeper position={top(0.5, 0, -300.6 + Math.min(0.25, t * 0.2))} rotationY={SOUTH} animation="reach" face="blank" headPitch={0.3 + 0.14 * Math.sin(t * 4.5)} time={t * 1.4} />
          <Hero position={top(-0.6, 0, -299.2)} rotationY={0} animation="shrug" face="worried" time={t} />
          <Jar position={top(0, 1.05, -299.6)} fill={1} />
        </>
      ),
    },
    {
      cue: "14.raise",
      ...cam.push({ on: top(2.2, 1.4, -298.9), dist: 4.0, to: 2.5, yaw: -12, pitch: 4, fov: 36, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "Keeper turns coldly pointing directly to raised fifth digit notched freshly onto PriceBoard.",
      stage: (t) => {
        const point = ease(ramp(t, 0, 1.1));
        return (
          <>
            <PriceBoard position={top(2.3, 0, -298.9)} digits={[1, 0, 0, 0, 1]} rotationY={-0.4} />
            <Keeper position={top(1.4 + point * 0.25, 0, -300.2)} rotationY={SOUTH} animation="point" animDistance={point * 0.3} face="blank" time={t} />
          </>
        );
      },
    },
    {
      cue: "14.ask",
      ...cam.push({ on: top(-0.3, 1.4, -299.1), dist: 3.9, to: 2.35, yaw: 16, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "Hero pushes closer against iron sill pleading earnestly upward with both hands.",
      stage: (t) => {
        const lean = ease(ramp(t, 0, 1.1));
        return (
          <Hero position={top(-0.3, 0, -298.9 - lean * 0.3)} rotationY={0} animation={t < 0.8 ? "talk" : "reach"} animDistance={lean * 0.3} face="brave" headPitch={-0.12} time={t * 1.3} />
        );
      },
    },
    {
      cue: "14.no",
      ...cam.push({ on: top(0.4, 1.5, -300.6), dist: 3.9, to: 2.35, yaw: -14, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "Keeper shakes expressionless head stiffly NO gesturing Hero back from gate.",
      stage: (t) => (
        <Keeper position={top(0.4, 0, -300.6)} rotationY={SOUTH + Math.sin(t * 6) * 0.22} animation="shrug" face="blank" headPitch={0.05} time={t * 1.3} />
      ),
    },
    {
      cue: "14.eight",
      ...cam.orbit({ on: top(0, 1.55, -300.9), dist: 4.1, distTo: 2.8, yaw: -16, yawTo: 22, pitch: 2, fov: 38, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "Orbit past iron bars framing gleaming GoldenApple while Hero grips bars trembling.",
      stage: (t) => {
        const grip = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Gate position={top(0, 0, -300)} />
            <GoldenApple position={top(0, 1.5, -301.2)} scale={1.4} rotationY={t * 1.2} />
            <Hero position={top(0, 0, -298.6 - grip * 0.25)} rotationY={0} animation="cower" face="sad" headPitch={-0.1} time={t} />
          </>
        );
      },
    },
    {
      cue: "14.shut",
      ...cam.push({ on: top(0, 1.4, -299.2), dist: 4.6, to: 3.1, yaw: 20, pitch: 6, fov: 42, screenOffset: [0, 0.08] }),
      impacts: [{ at: Math.max(0.25, w("14.shut", "quick") - 0.15), amp: 0.03, dur: 0.25 }],
      zone: "top",
      look: "overworld-day",
      note: "Iron gate slams shut crisply on quick knocking Hero back step onto cold stone.",
      stage: (t) => {
        const shutStart = Math.max(0.15, w("14.shut", "quick") - 0.35);
        const shutEnd = w("14.shut", "quick");
        const shut = ease(ramp(t, shutStart, shutEnd));
        const keeperWalk = walkSegment(top(1.4, 0, -301), top(1.75, 0, -301.4), t, shutStart, shutEnd, { yaw: SOUTH });
        return (
          <>
            <Gate position={top(0, 0, -300)} open={1 - shut} />
            <Keeper {...keeperWalk} face="blank" time={t} />
            <Hero position={top(-1.6, 0, -298.6 + shut * 0.3)} rotationY={0} animation="scared" face="hurt" time={t} />
          </>
        );
      },
    },
  ],
});

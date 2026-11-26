import { cam, storyScene, walkSegment } from "../../engine";
import { EAST, EmeraldPile, Gate, GoldenApple, Hero, Jar, Keeper, PriceBoard, SOUTH, ease, ramp, top, w, timing } from "./kit";

export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "We do not sell apples for emeralds",
  shots: [
    {
      cue: "14.gate",
      ...cam.crane({ on: top(-0.15, 1.25, -0.1), onTo: top(-0.1, 1.45, -0.1), dist: 7.2, toDist: 6.0, yaw: 34, fromPitch: 8, toPitch: 2, fov: 50, screenOffset: [0, 0.06] }),
      ease: "linear" as const,
      zone: "top",
      look: "overworld-day",
      note: "Side-front 3/4 view: Hero approaches ornate barred Gate clear of stoop step as Keeper steps toward toll counter in front of upper-town street.",
      stage: (t) => {
        const heroWalk = walkSegment(top(-0.8, 0, 1.35), top(-0.4, 0, 0.8), t, 0, 1.35, { endYaw: EAST - 0.35 });
        const keeperWalk = walkSegment(top(0.1, 0, -2.0), top(0.1, 0, -1.18), t, 0, 1.35, { endYaw: SOUTH + 0.15 });
        return (
          <>
            <Gate position={top(0, 0, 0)} open={0} />
            <Keeper {...keeperWalk} face="blank" time={t} />
            <Hero {...heroWalk} face="uneasy" headPitch={-0.12} time={t} />
          </>
        );
      },
    },
    {
      cue: "14.count",
      ...cam.push({ on: top(0.45, 1.2, -0.35), dist: 6.8, to: 6.1, yaw: 36, pitch: 8, fov: 50, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-day",
      note: "Gate swung inward (-Z) clear of lens: Keeper counts gleaming EmeraldPile continuously on stone toll counter while Hero watches the money from side-front 3/4.",
      stage: (t) => {
        const countPose = {
          bodyY: Math.sin(t * 3.8) * 0.01,
          bodyPitch: 0.02,
          bodyRoll: 0,
          bodyYaw: 0,
          torso: [0.02, Math.sin(t * 3.8) * 0.05, 0] as [number, number, number],
          head: [0.24 + Math.sin(t * 5) * 0.05, -0.1, 0] as [number, number, number],
          armR: [-1.45 + Math.sin(t * 7.5) * 0.06, 0, -0.16 + Math.cos(t * 3.8) * 0.1] as [number, number, number],
          armL: [-1.42 - Math.sin(t * 7.5) * 0.05, 0, 0.14] as [number, number, number],
          legR: [0, 0, 0] as [number, number, number],
          legL: [0, 0, 0] as [number, number, number],
          kneeR: [0, 0, 0] as [number, number, number],
          kneeL: [0, 0, 0] as [number, number, number],
        };
        return (
          <>
            <Gate position={top(0, 0, 0)} open={0.95} />
            <Keeper
              position={top(1.18, 0, -1.48)}
              rotationY={SOUTH}
              pose={countPose}
              face="blank"
              lookAt={top(1.38, 0.96, -0.62)}
              time={t}
            />
            <Hero
              position={top(-0.25, 0, 0.65)}
              rotationY={EAST - 0.15}
              animation="idle"
              face="worried"
              lookAt={top(1.35, 0.98, -0.62)}
              time={t}
            />
            <Jar position={top(0.92, 0.94, -0.65)} fill={1} scale={0.9} />
            <EmeraldPile position={top(1.38, 0.955, -0.62)} n={Math.max(2, Math.round(ease(ramp(t, 0, 1.4)) * 7))} scale={0.85} seed={3} />
          </>
        );
      },
    },
    {
      cue: "14.raise",
      ...cam.push({ on: top(0.2, 1.3, 0.1), dist: 7.4, to: 6.8, yaw: 20, pitch: 6, fov: 50, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-day",
      note: "Uncropped 9:16 side-front framing of Gate, PriceBoard, gesturing Keeper clear of toll counter, and reacting Hero.",
      stage: (t) => (
        <>
          <Gate position={top(0, 0, 0)} open={0.95} />
          <PriceBoard position={top(1.0, 0, 0.65)} digits={[1, 0, 0, 0, 1]} rotationY={-0.55} />
          <Keeper position={top(-0.05, 0, -0.95)} rotationY={SOUTH + 0.25} animation="point" face="blank" lookAt={top(1.0, 1.35, 0.65)} time={t} />
          <Hero position={top(-0.55, 0, 0.68)} rotationY={EAST - 0.3} animation="scared" face="surprised" lookAt={top(1.0, 1.35, 0.65)} time={t} />
        </>
      ),
    },
    {
      cue: "14.ask",
      ...cam.push({ on: top(-0.05, 1.25, -0.15), dist: 5.8, to: 4.9, yaw: 36, pitch: 4, fov: 48, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-day",
      note: "3/4 front-side framing: Hero pleads toward Keeper inside gate (never staring at camera).",
      stage: (t) => (
        <>
          <Gate position={top(0, 0, 0)} open={0.95} />
          <Keeper position={top(0.05, 0, -1.12)} rotationY={SOUTH + 0.2} animation="idle" face="blank" time={t} />
          <Hero position={top(-0.35, 0, 0.68)} rotationY={EAST - 0.4} animation={t < 0.8 ? "talk" : "reach"} face="brave" lookAt={top(0.05, 1.5, -1.12)} time={t * 1.3} />
        </>
      ),
    },
    {
      cue: "14.no",
      ...cam.orbit({ on: top(-0.05, 1.25, -0.1), dist: 5.5, distTo: 4.8, yaw: 16, yawTo: 32, pitch: 8, fov: 48, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-day",
      note: "Gate and Hero stay in 3/4 context as Keeper shakes head firmly NO clear of counter.",
      stage: (t) => (
        <>
          <Gate position={top(0, 0, 0)} open={0.95} />
          <Keeper position={top(0.15, 0, -0.95)} rotationY={SOUTH + 0.15} animation="guard" headYaw={Math.sin(t * 9) * 0.36} face="blank" time={t * 1.2} />
          <Hero position={top(-0.35, 0, 0.7)} rotationY={EAST - 0.4} animation="idle" face="worried" lookAt={top(0.15, 1.5, -0.95)} time={t} />
        </>
      ),
    },
    {
      cue: "14.eight",
      ...cam.orbit({ on: top(-0.05, 1.25, -0.1), dist: 5.4, distTo: 4.6, yaw: 38, yawTo: 18, pitch: -2, fov: 46, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-day",
      note: "Keeper holds glowing GoldenApple cleanly in his right hand as upright Hero looks up in disbelief.",
      stage: (t) => (
        <>
          <Gate position={top(0, 0, 0)} open={0.95} />
          <Keeper position={top(0.18, 0, -1.0)} rotationY={SOUTH + 0.2} animation="reach" face="blank" time={t}>
            <GoldenApple position={[0, -0.04, 0.08]} scale={1.15} rotationY={t * 1.2} />
          </Keeper>
          <Hero position={top(-0.38, 0, 0.7)} rotationY={EAST - 0.4} animation="scared" face="crying" lookAt={top(0.18, 1.35, -0.8)} time={t} />
        </>
      ),
    },
    {
      cue: "14.shut",
      ...cam.push({ on: top(-1.4, 1.35, 0.0), dist: 6.8, to: 5.8, yaw: 34, pitch: 6, fov: 48, screenOffset: [0, 0.06] }),
      impacts: [{ at: Math.max(0.25, w("14.shut", "quick") - 0.15), amp: 0.03, dur: 0.25 }],
      zone: "top",
      look: "overworld-day",
      note: "Both Keeper and Hero cleanly inside 9:16 frame and clear of piers and inward-closing (-Z) Gate arc.",
      stage: (t) => {
        const shutStart = Math.max(0.15, w("14.shut", "quick") - 0.35);
        const shutEnd = w("14.shut", "quick");
        const shut = ease(ramp(t, shutStart, shutEnd));
        return (
          <>
            <Gate position={top(0, 0, 0)} open={0.95 * (1 - shut)} />
            <Keeper position={top(-2.95, 0, -1.55)} rotationY={SOUTH + 0.55} animation="push" face="blank" time={t} />
            <Hero position={top(-0.55, 0, 0.85 + shut * 0.35)} rotationY={EAST - 0.45} animation="scared" face="hurt" lookAt={top(-1.2, 1.5, 0)} time={t} />
          </>
        );
      },
    },
  ],
});

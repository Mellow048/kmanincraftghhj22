import { cam, storyScene } from "../../engine";
import { FishPile, GoldenApple, Hero, Keeper, SOUTH, ease, ramp, timing } from "./kit";

export const scene17 = storyScene(timing, {
  id: "scene17",
  title: "He did the sums",
  shots: [
    {
      cue: "17.cold",
      ...cam.push({ on: [0, 1.5, 14.9], dist: 3.9, to: 2.35, yaw: -14, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Cold Keeper steps stiffly forward checking pocket watch with zero emotion.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.1));
        return (
          <Keeper position={[0, 0.5, 15.2 - step * 0.35]} rotationY={SOUTH} animation={step < 0.6 ? "walk" : "idle"} animDistance={step * 0.4} face="blank" headPitch={0.1} time={t} />
        );
      },
    },
    {
      cue: "17.sums",
      ...cam.orbit({ on: [0.4, 1.0, 14.4], dist: 4.1, distTo: 2.75, yaw: 28, yawTo: -16, pitch: 18, fov: 40, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Keeper extends gloved hand dangling GoldenApple right over massive towering catch of fish.",
      stage: (t) => {
        const weigh = ease(ramp(t, 0, 1.2));
        return (
          <>
            <FishPile position={[0.2, 0.5, 14.2]} n={20} seed={19} />
            <GoldenApple position={[0.9 - weigh * 0.25, 1.15 - weigh * 0.15, 14.6]} scale={1.2} rotationY={t * 1.4} />
            <Keeper position={[1.3 - weigh * 0.2, 0.5, 15]} rotationY={SOUTH} animation="reach" face="blank" time={t} />
          </>
        );
      },
    },
    {
      cue: "17.save",
      ...cam.push({ on: [0.3, 1.4, 12.9], dist: 3.9, to: 2.4, yaw: 18, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Hero turns gesturing gratefully backward toward working drenched townsfolk behind him.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.1));
        return (
          <Hero position={[0.3, 0.5, 12.9 - turn * 0.2]} rotationY={SOUTH - turn * 0.35} animation={t < 1.0 ? "talk" : "point"} face={t < 1.0 ? "hurt" : "calm"} time={t} />
        );
      },
    },
  ],
});

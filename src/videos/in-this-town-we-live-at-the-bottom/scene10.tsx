import { cam, storyScene } from "../../engine";
import { Boat, Coin, EAST, FishPile, FishingHero, Hero, JettyLantern, Rod, SOUTH, Villager, ease, ramp, timing } from "./kit";

export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Nine days",
  shots: [
    {
      cue: "10.night",
      ...cam.orbit({ on: [0, 1.2, 10], dist: 7.4, distTo: 4.8, yaw: 145, yawTo: 175, pitch: 8, fov: 46, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Front-3/4 shot: Hero holds fishing rod cleanly beneath warm jetty lantern over dark water.",
      stage: (t) => {
        const pull = Math.sin(t * 3.8);
        return (
          <>
            <JettyLantern position={[-1.15, 0.5, 10.6]} lit={1.2 + Math.sin(t * 7) * 0.12} />
            <FishingHero position={[0, 0.5, 10 - ease(ramp(t, 0, 1.5)) * 0.25]} rotationY={EAST - 0.25} bend={0.3 + pull * 0.14} face="uneasy" headPitch={0.1} time={t} />
          </>
        );
      },
    },
    {
      cue: "10.storm",
      ...cam.push({ on: [0.6, 1.2, 10.5], dist: 6.0, to: 4.0, yaw: -135, pitch: 2, fov: 46, screenOffset: [0, 0.08] }),
      impacts: [{ at: 0.4, amp: 0.025, dur: 0.35 }, { at: 1.0, amp: 0.025, dur: 0.35 }],
      zone: "bottom",
      look: "overworld-storm",
      note: "Front-3/4 view from open water side: storm winds rock tied boat violently as braced Hero holds bucking rod.",
      stage: (t) => (
        <>
          <FishingHero position={[0, 0.5, 10]} rotationY={SOUTH - 0.3} bend={0.75 + Math.sin(t * 10) * 0.15} face="scared" headPitch={0.1} time={t * 1.6} />
          <Boat position={[3.1, 0.15 + Math.sin(t * 4.2) * 0.08, 12.4]} rotationY={0.3 + Math.sin(t * 2.2) * 0.18} bail={0.65} />
        </>
      ),
    },
    {
      cue: "10.rod",
      ...cam.push({ on: [-2.4, 1.1, -4.5], dist: 5.4, to: 4.2, yaw: -16, pitch: 8, fov: 46, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Wide 9:16 shot: Hero slides fishing rod across counter to merchant then watches empty boat.",
      stage: (t) => {
        const give = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Hero position={[-1.6, 0, -4.6]} rotationY={SOUTH} animation={give < 0.7 ? "reach" : "shrug"} face="frown" time={t} />
            <Rod position={[-1.2 - give * 0.9, 1.0, -4.7]} bend={0.1} rotationY={1.2} />
            <Villager position={[-3.2, 0, -4.4]} rotationY={SOUTH} strain={0.3 + give * 0.3} />
            <Boat position={[3.1, 0, 12.4 - give * 1.4]} rotationY={0.6} hole bail={0.1} />
          </>
        );
      },
    },
    {
      cue: "10.count",
      ...cam.orbit({ on: [0, 0.85, 8.6], dist: 4.2, distTo: 2.8, yaw: 148, yawTo: 175, pitch: 28, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Front view: Hero counts sparse spinning coins dropping onto planks beside empty gap.",
      stage: (t) => {
        const count = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={[-0.65, 0.5, 9.1]} rotationY={SOUTH - 0.3} animation="crouch" face="frown" lookAt={[0, 0.55, 8.6]} time={t} />
            {Array.from({ length: Math.max(2, Math.round(count * 9)) }, (_, i) => (
              <Coin key={i} position={[0.05 * (i % 3) - 0.05, 0.56 + Math.floor(i / 3) * 0.03, 8.6 + 0.05 * (i % 3)]} spin={i + t * 5} />
            ))}
            <FishPile position={[0.4, 0.52, 8.5]} n={3} seed={8} />
          </>
        );
      },
    },
  ],
});

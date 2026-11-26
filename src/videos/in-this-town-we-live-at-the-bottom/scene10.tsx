import { cam, storyScene } from "../../engine";
import { Boat, Coin, FishPile, Hero, JettyLantern, Line, NORTH, Rod, SOUTH, Villager, ease, ramp, timing } from "./kit";

export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Nine days",
  shots: [
    {
      cue: "10.night",
      ...cam.orbit({ on: [0, 1.2, 10], dist: 8.6, distTo: 5.2, yaw: -24, yawTo: 16, pitch: 8, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Hero paces and yanks rod beneath single warm jetty lantern over black water.",
      stage: (t) => {
        const pull = Math.sin(t * 3.8);
        return (
          <>
            <JettyLantern position={[-1.15, 0.5, 10.6]} lit={1.2 + Math.sin(t * 7) * 0.12} />
            <Hero position={[0, 0.5, 10 - ease(ramp(t, 0, 1.5)) * 0.25]} rotationY={NORTH} animation={pull > 0 ? "reach" : "cower"} face="blank" headPitch={0.2} time={t} />
            <Rod position={[0.35, 0.95, 9.9]} bend={0.3 + pull * 0.14} />
            <Line position={[0.5, 0.9, 8.6]} length={1.2} bob={pull * 0.06} />
          </>
        );
      },
    },
    {
      cue: "10.storm",
      ...cam.push({ on: [1.4, 1.2, 10.5], dist: 6.4, to: 3.9, yaw: 28, pitch: -4, fov: 46, screenOffset: [0, 0.08] }),
      impacts: [{ at: 0.4, amp: 0.025, dur: 0.35 }, { at: 1.0, amp: 0.025, dur: 0.35 }],
      zone: "bottom",
      look: "overworld-storm",
      note: "Storm winds rock tied boat violently as braced Hero fights bucking rod.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 10]} rotationY={NORTH} animation="cower" face="scared" headPitch={0.1} time={t * 1.6} />
          <Rod position={[0.35, 0.95, 9.9]} bend={0.8 + Math.sin(t * 10) * 0.15} />
          <Line position={[0.6, 0.6, 8.2]} length={1.5} bob={Math.sin(t * 11) * 0.15} />
          <Boat position={[3.1, 0.15 + Math.sin(t * 4.2) * 0.08, 12.4]} rotationY={0.3 + Math.sin(t * 2.2) * 0.18} bail={0.65} />
        </>
      ),
    },
    {
      cue: "10.rod",
      ...cam.push({ on: [-0.8, 1.0, -4.5], dist: 3.9, to: 2.5, yaw: -22, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Hero slides fishing rod across counter to merchant then watches empty boat pulled up slipway.",
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
      ...cam.orbit({ on: [0, 0.85, 8.6], dist: 3.6, distTo: 2.2, yaw: -24, yawTo: 20, pitch: 38, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Hero counts sparse spinning coins dropping into bucket beside wide empty gap on planks.",
      stage: (t) => {
        const count = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={[-0.65, 0.5, 9.1]} rotationY={NORTH} animation="crouch" face="frown" lookAt={[0, 0.55, 8.6]} time={t} />
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

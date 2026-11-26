import { cam, storyScene, LightPool } from "../../engine";
import { Jar, JETTY_CROWD, Hero, NORTH, SOUTH, Villager, ease, ramp, timing } from "./kit";

export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "They voted for my mum",
  shots: [
    {
      cue: "11.meet",
      ...cam.crane({ on: [0, 1.2, 10.6], dist: 9.2, toDist: 6.2, yaw: 12, fromPitch: 24, toPitch: 6, fov: 46, screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-night",
      note: "Whole town gathers along torchlit narrow jetty squeezing inward around confused Hero.",
      stage: (t) => {
        const crowd = ease(ramp(t, 0, 1.5));
        return (
          <>
            {JETTY_CROWD.map(([x, z], i) => (
              <Villager key={i} position={[x, 0.5, z - crowd * 0.45]} rotationY={NORTH} walk={crowd * 0.6 + i} kid={i % 4 === 0} />
            ))}
            <Hero position={[0, 0.5, 12.6 - crowd * 0.4]} rotationY={NORTH} animation="lookAround" face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "11.vote",
      ...cam.orbit({ on: [0, 1.3, 11.2], dist: 4.5, distTo: 3.1, yaw: -26, yawTo: 18, pitch: 4, fov: 40, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Hands shoot skyward one by one across jetty crowd as Hero steps back stunned.",
      stage: (t) => (
        <>
          {JETTY_CROWD.slice(0, 5).map(([x, z], i) => (
            <Villager key={i} position={[x, 0.5, z]} rotationY={NORTH} strain={ease(ramp(t, 0.15 + i * 0.1, 0.9 + i * 0.1)) * 0.65} kid={i % 2 === 0} />
          ))}
          <Hero position={[0.6, 0.5, 11.6 + ease(ramp(t, 0.4, 1.2)) * 0.25]} rotationY={NORTH} animation="lookAround" face="surprised" headPitch={-0.1} time={t} />
          <LightPool position={[0, 0.52, 10.6]} width={8} depth={7} color="#ffb46b" opacity={0.26} />
        </>
      ),
    },
    {
      cue: "11.mum",
      ...cam.push({ on: [-0.4, 1.35, 9.4], dist: 3.9, to: 2.5, yaw: 18, pitch: 2, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Neighbours step quietly pastHero nodding warmly as tears well on Hero's lowered face.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Villager position={[-1.1 + step * 0.2, 0.5, 9.4]} rotationY={SOUTH} hmm={0.4 + 0.3 * step} walk={step * 0.3} />
            <Villager position={[0.1, 0.5, 9.7 + step * 0.18]} rotationY={SOUTH} hat="straw" walk={step * 0.3} kid />
            <Hero position={[0.9, 0.5, 10.4]} rotationY={NORTH} animation="cower" face="crying" headPitch={0.1} time={t} />
          </>
        );
      },
    },
    {
      cue: "11.jar",
      ...cam.orbit({ on: [0, 1.15, 10.6], dist: 3.9, distTo: 2.5, yaw: -22, yawTo: 18, pitch: 10, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Glowing jar marked THE TOP passes from hand to hand across planks straight into Hero's arms.",
      stage: (t) => {
        const k = Math.min(1, t / 1.5);
        return (
          <>
            <Villager position={[-0.9, 0.5, 10.8]} rotationY={SOUTH} strain={0.5} />
            <Villager position={[0.3, 0.5, 11.2]} rotationY={SOUTH} strain={0.3 * k} kid />
            <group position={[-0.9 + k * 1.35, 1.05, 10.5 - k * 0.15]}>
              <Jar position={[0, 0, 0]} fill={1} />
            </group>
            <Hero position={[1.15 - k * 0.25, 0.5, 10.6]} rotationY={SOUTH} animation={k > 0.6 ? "hold" : "reach"} face="crying" time={t} />
          </>
        );
      },
    },
    {
      cue: "11.eleven",
      ...cam.dollyZoom({ on: [0, 1.25, 11], dist: 5.0, to: 3.2, yaw: 10, pitch: -4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Dolly-zoom weight as Hero cradles entire town's eleven-year jar while silent crowd watches behind.",
      stage: (t) => {
        const brace = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Hero position={[0, 0.5 - brace * 0.04, 11]} rotationY={SOUTH} animation="hug" face="crying" headPitch={0.2} time={t} />
            <Jar position={[0, 0.95 - brace * 0.04, 11.25]} fill={1} scale={1.05} />
            {JETTY_CROWD.map(([x, z], i) => (
              <Villager key={i} position={[x, 0.5, z]} rotationY={NORTH} hmm={0.2 * brace} kid={i % 5 === 0} />
            ))}
          </>
        );
      },
    },
  ],
});

import { LightPool, cam, storyScene } from "../../engine";
import { EAST, Hero, JETTY_CROWD, Jar, NORTH, SOUTH, TOWN_ROBES, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "They voted for my mum",
  shots: [
    {
      cue: "11.meet",
      ...cam.crane({ on: [0, 1.25, 10.6], dist: 10.8, toDist: 8.6, yaw: -18, fromPitch: 16, toPitch: 8, fov: 54, screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-night",
      note: "Front-3/4 view: varied-robe townsfolk gather on torchlit jetty facing inward toward Hero.",
      stage: (t) => {
        const sway = Math.sin(t * 2.5);
        return (
          <>
            {JETTY_CROWD.map(([x, z], i) => (
              <Villager
                key={i}
                position={[x, 0.5, z]}
                rotationY={x < 0 ? SOUTH + 0.35 : SOUTH - 0.35}
                robe={TOWN_ROBES[i % TOWN_ROBES.length]}
                walk={0}
                hmm={0.25 + 0.15 * Math.sin(t * 3 + i)}
                kid={i % 4 === 0}
                phase={i * 0.5}
              />
            ))}
            <Hero position={[0, 0.5, 11.4]} rotationY={SOUTH - 0.25} animation="lookAround" face="uneasy" headPitch={0.05 * sway} time={t} />
          </>
        );
      },
    },
    {
      cue: "11.vote",
      ...cam.orbit({ on: [0, 1.3, 10.2], dist: 8.6, distTo: 7.2, yaw: -22, yawTo: 16, pitch: 8, fov: 54, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Varied-robe townsfolk raise hands cleanly skyward one by one as stunned Hero watches.",
      stage: (t) => (
        <>
          {JETTY_CROWD.slice(0, 5).map(([x, z], i) => {
            const voteK = ease(ramp(t, 0.15 + i * 0.1, 0.9 + i * 0.1));
            return (
              <Villager
                key={i}
                position={[x, 0.5, z]}
                rotationY={x < 0 ? SOUTH + 0.35 : SOUTH - 0.35}
                robe={TOWN_ROBES[i % TOWN_ROBES.length]}
                arms={{ r: -2.95 * voteK, l: -0.15 }}
                kid={i % 2 === 0}
              />
            );
          })}
          <Hero position={[0.4, 0.5, 11.4]} rotationY={WEST + 0.55} animation="lookAround" face="surprised" headPitch={-0.1} time={t} />
          <LightPool position={[0, 0.52, 10.6]} width={8} depth={7} color="#ffb46b" opacity={0.26} />
        </>
      ),
    },
    {
      cue: "11.mum",
      ...cam.push({ on: [-0.05, 1.35, 9.8], dist: 5.0, to: 4.1, yaw: 18, pitch: 4, fov: 46, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Front-3/4 view: neighbors nod warmly beside weeping Hero.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Villager position={[-0.85, 0.5, 9.15]} rotationY={SOUTH + 0.3} robe={TOWN_ROBES[0]} hmm={0.4 + 0.3 * step} walk={0} />
            <Villager position={[0.12, 0.5, 9.6]} rotationY={SOUTH - 0.15} robe={TOWN_ROBES[1]} hat="straw" walk={0} hmm={0.25 * step} kid />
            <Hero position={[0.65, 0.5, 10.4]} rotationY={SOUTH - 0.35} animation="cower" plantFeet face="crying" headPitch={0.1} time={t} />
          </>
        );
      },
    },
    {
      cue: "11.jar",
      ...cam.orbit({ on: [0, 1.15, 10.6], dist: 5.4, distTo: 4.8, yaw: -18, yawTo: 18, pitch: 10, fov: 48, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Villager hands glowing jar THE TOP directly into Hero's reaching arms.",
      stage: (t) => {
        const k = Math.min(1, t / 1.5);
        return (
          <>
            <Villager
              position={[-0.75, 0.5, 10.6]}
              rotationY={EAST - 0.2}
              robe={TOWN_ROBES[2]}
              arms={{
                r: -1.35,
                l: -1.35,
                hold: k <= 0.65 ? <Jar position={[0, -0.02, 0.14]} fill={1} scale={0.85} /> : undefined,
              }}
            />
            <Villager position={[-0.05, 0.5, 11.35]} rotationY={SOUTH} robe={TOWN_ROBES[1]} kid />
            <Hero position={[0.8, 0.5, 10.6]} rotationY={WEST + 0.2} animation={k > 0.65 ? "hold" : "reach"} face="crying" time={t}>
              {k > 0.65 ? <Jar position={[-0.12, 0.0, 0.16]} fill={1} scale={0.85} /> : null}
            </Hero>
          </>
        );
      },
    },
    {
      cue: "11.eleven",
      ...cam.dollyZoom({ on: [0, 1.25, 11], dist: 5.0, to: 3.2, yaw: 10, pitch: -4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Dolly-zoom weight as Hero stands flush on jetty cradling eleven-year jar while silent crowd watches.",
      stage: (t) => {
        const brace = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Hero position={[0, 0.5, 11]} rotationY={SOUTH} animation="hug" face="crying" headPitch={0.2} time={t} />
            <Jar position={[0, 1.0, 11.24]} fill={1} scale={1.0} />
            {JETTY_CROWD.map(([x, z], i) => (
              <Villager
                key={i}
                position={[x, 0.5, z]}
                rotationY={SOUTH}
                robe={TOWN_ROBES[i % TOWN_ROBES.length]}
                hmm={0.2 * brace}
                kid={i % 5 === 0}
              />
            ))}
          </>
        );
      },
    },
  ],
});

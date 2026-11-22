import { cam, storyScene } from "../../engine";
import { Bubble, GATE, Hero, MumChicken, PATH_TOP, SOUTH, WhiteEgg, ZombieKid, ease, pop, ramp, timing, wordAt } from "./kit";

const eggShake = wordAt("7.egg", "shaking");

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Waiting to Catch Me",
  shots: [
    {
      cue: "7.knew",
      ...cam.push({ on: [8.8, 5.9, -5.0], dist: 4.6, to: 3.4, yaw: 20, pitch: 22, fov: 40 }),
      look: "overworld-day",
      zone: "village",
      note: "Morning daylight reveals the rooftop nest from the same high vantage—now understood as a safe launching perch.",
      stage: (t, { p }) => (
        <>
          <MumChicken position={[GATE.nest[0] - 0.2, GATE.roofTopY + 0.12, GATE.nest[2]]} rotationY={-0.3} crouch={0.4 * (1 - p * 0.5)} flap={Math.max(0, Math.sin(t * 6)) * 0.25} />
          <Hero position={[GATE.nest[0] + 0.35, GATE.roofTopY + 0.12, GATE.nest[2] + 0.1]} rotationY={-0.5} mood="happy" nod={Math.sin(t * 3) * 0.12} />
          <WhiteEgg position={[GATE.nest[0], GATE.roofTopY + 0.13, GATE.nest[2] - 0.22]} />
        </>
      ),
    },
    {
      cue: "7.under",
      ...cam.orbit({ on: [-9.2, 0.65, -2.4], dist: 2.2, distTo: 1.75, yaw: -24, yawTo: 12, pitch: -8, fov: 36 }),
      look: "overworld-day",
      zone: "village",
      note: "Low reverse under the oak tree looking up with mum—she was always standing ready to catch him.",
      stage: (t, { p }) => (
        <>
          <Hero position={[-9.2, 3.15, -2.6]} rotationY={SOUTH} mood="happy" wave={0.4 + p * 0.3} lookAt={[-9.2, 0.4, -2.4]} />
          <MumChicken position={[-9.2, PATH_TOP, -2.4]} rotationY={0} headPitch={-0.12 - Math.sin(t * 2.4) * 0.08} lookAt={[-9.2, 3.3, -2.6]} />
        </>
      ),
    },
    {
      cue: "7.wait",
      ...cam.push({ on: [8.85, 5.8, -5.0], dist: 1.9, to: 1.45, yaw: 18, pitch: 8, fov: 36 }),
      look: "overworld-day",
      zone: "village",
      note: "Close warm payoff in the rooftop nest: Hero hugs his tiny chicken mum round the neck.",
      stage: (t, { p }) => (
        <>
          <MumChicken position={[8.65 + p * 0.08, GATE.roofTopY + 0.12, -5.0]} rotationY={0.8} crouch={0.35} headPitch={Math.sin(t * 3.5) * 0.1} lookAt={[9.05, 5.9, -4.95]} />
          <Hero position={[9.0 - p * 0.1, GATE.roofTopY + 0.12, -4.95]} rotationY={-1.1} mood="happy" armPitch={[-1.45, -1.45]} lean={0.18 + p * 0.14} lookAt={[8.65, 5.8, -5.0]} />
          <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} />
        </>
      ),
    },
    {
      cue: "7.next",
      ...cam.truck({ on: [-1.4, 0.9, 0.0], by: [2.0, 0, 0], dist: 4.1, yaw: 16, pitch: 12, fov: 40 }),
      look: "overworld-night",
      zone: "village",
      note: "Next night at the school gate: a whole eager line of zombie kids crowd around begging mum for a ride.",
      stage: (t) => (
        <>
          {[-1.5, -0.7, 0.1, 0.9].map((x, i) => (
            <ZombieKid
              key={i}
              position={[x, PATH_TOP, -0.3 + (i % 2) * 0.45]}
              rotationY={0.4}
              shirt={["#3a7d8c", "#548256", "#6e5482", "#826546"][i]}
              mood="happy"
              armPitch={[-2.2, -0.4]}
              lookAt={[1.8, 0.7, 0.2]}
            />
          ))}
          <Bubble dark text="RIDE!" position={[-0.7, 1.35, -0.3]} rotationY={0.25} scale={0.44 * pop(t, 0.35)} />
          <MumChicken position={[1.75, PATH_TOP, 0.2]} rotationY={-0.6}>
            <Hero position={[0, 0, 0]} mood="happy" />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "7.own",
      ...cam.push({ on: [1.75, 0.85, 0.2], dist: 2.0, to: 1.55, yaw: -24, pitch: -4, fov: 36 }),
      look: "overworld-night",
      zone: "village",
      note: "Proud low angle on Hero sitting tall on his chicken mum's back, grinning at the camera.",
      stage: () => (
        <MumChicken position={[1.75, PATH_TOP, 0.2]} rotationY={-0.4} lookAt={[1.4, 0.8, 2.0]}>
          <Hero position={[0, 0, 0]} mood="happy" armPitch={[-0.3, -1.7]} />
        </MumChicken>
      ),
    },
    {
      cue: "7.egg",
      ...cam.push({ on: [8.75, 5.72, -5.28], dist: 1.85, to: 1.32, yaw: 14, pitch: 18, fov: 36 }),
      look: "overworld-night",
      zone: "village",
      note: "Return to the rooftop nest: the planted white egg suddenly wobbles violently and shows a dark crack.",
      stage: (t) => {
        const wobble = t >= eggShake - 0.3 ? 1 : ease(ramp(t, 0.2, eggShake));
        return (
          <>
            <MumChicken position={[8.5, GATE.roofTopY + 0.12, -5.0]} rotationY={0.7} lookAt={[8.75, 5.55, -5.32]} />
            <Hero position={[9.1, GATE.roofTopY + 0.12, -5.0]} rotationY={-0.7} mood="scared" lookAt={[8.75, 5.55, -5.32]} />
            <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} wobble={wobble} cracked={t >= eggShake - 0.1} />
          </>
        );
      },
    },
  ],
});

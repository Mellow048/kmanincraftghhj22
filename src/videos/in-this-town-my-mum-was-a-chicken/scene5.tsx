import { cam, storyScene } from "../../engine";
import { CLIFF, CliffBridge, Hero, MumChicken, Puffs, ZombieKid, ZombieMum, ease, hop, ramp, timing, wordAt } from "./kit";

const stepOffAt = wordAt("5.step", "stepped");

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "She Stepped Off the Cliff",
  shots: [
    {
      cue: "5.edge",
      ...cam.push({ on: [-2.0, 5.1, 95], dist: 3.1, to: 2.1, yaw: 20, pitch: 8, fov: 38 }),
      handheld: 0.016,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Heroic entrance: MumChicken trots boldly past the stunned zombie mums and kids right up to the broken cliff edge.",
      stage: (t, { p }) => {
        const walkUp = ease(p);
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum position={[-2.9, CLIFF.ledgeY, 94.3]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" lookAt={[-1.3, 4.9, 95]} />
            <ZombieKid position={[-3.3, CLIFF.ledgeY, 95.6]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" lookAt={[-1.3, 4.9, 95]} />
            <MumChicken position={[-3.1 + walkUp * 1.85, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={t * 2.6} flap={0.35} />
            <Hero position={[-3.5 + walkUp * 1.4, CLIFF.ledgeY, 95.25]} rotationY={Math.PI / 2} walk={t * 2.4} mood="scared" lookAt={[-1.2, 4.9, 95]} />
          </>
        );
      },
    },
    {
      cue: "5.mind",
      ...cam.orbit({ on: [-1.45, 5.15, 95], dist: 2.35, distTo: 1.75, yaw: 26, yawTo: -12, pitch: 10, fov: 36 }),
      handheld: 0.018,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Hero throws his hands up wide-eyed staring at MumChicken peering straight down over the sheer ravine.",
      stage: (t) => (
        <>
          <CliffBridge broken dropT={1.5} />
          <Hero position={[-2.1, CLIFF.ledgeY + hop(t, 0.35, 0.14, 0.25), 95]} rotationY={Math.PI / 2} mood="scared" armPitch={[-2.2, -2.2]} lean={-0.12} lookAt={[-1.2, 4.9, 95]} />
          <MumChicken position={[-1.2, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} peck={0.45 + Math.sin(t * 7) * 0.12} flap={0.25} lookAt={[-0.2, 1.5, 95]} />
        </>
      ),
    },
    {
      cue: "5.climb",
      ...cam.orbit({ on: [-1.4, 5.05, 95], dist: 2.4, distTo: 1.85, yaw: 24, yawTo: -14, pitch: 12, fov: 36 }),
      handheld: 0.016,
      impacts: [{ at: 0.72, amp: 0.045, dur: 0.25 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "MumChicken crouches low in the dirt; Hero sprints forward, leaps onto her back, and grips tightly.",
      stage: (t, { p }) => {
        const crouch = ease(ramp(p, 0, 0.35)) * 0.75;
        const hopUp = ease(ramp(p, 0.35, 0.78));
        const arc = hopUp > 0 && hopUp < 1 ? Math.sin(hopUp * Math.PI) * 0.42 : 0;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            {p < 0.78 ? (
              <>
                <MumChicken position={[-1.25, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} crouch={crouch} />
                <Hero position={[-2.1 + hopUp * 0.85, CLIFF.ledgeY + arc, 95]} rotationY={Math.PI / 2} walk={p < 0.35 ? t * 2.5 : 0} mood="scared" lean={0.18} />
              </>
            ) : (
              <MumChicken position={[-1.25, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} crouch={0.45} flap={0.4}>
                <Hero position={[0, 0, 0]} mood="scared" lean={0.22} />
              </MumChicken>
            )}
          </>
        );
      },
    },
    {
      cue: "5.step",
      ...cam.orbit({ on: [-0.3, 4.9, 95], dist: 3.1, distTo: 2.5, yaw: 26, yawTo: -16, pitch: 16, fov: 42 }),
      handheld: 0.024,
      impacts: [{ at: stepOffAt, amp: 0.065, dur: 0.3 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Heart-stopping step off the cliff: MumChicken walks off into open sky with Hero clutching on and feather puffs drifting.",
      stage: (t) => {
        const drop = t >= stepOffAt ? ease(ramp(t, stepOffAt, stepOffAt + 0.7)) : 0;
        const x = -1.25 + drop * 1.45;
        const y = CLIFF.ledgeY - drop * 0.85;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum position={[-2.3, CLIFF.ledgeY, 94.7]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.5, -2.5]} />
            <MumChicken position={[x, y, 95]} rotationY={Math.PI / 2} walk={drop < 0.25 ? t * 2.4 : 0} flap={drop > 0.1 ? 0.9 : 0.25} tilt={drop * 0.15}>
              <Hero position={[0, 0, 0]} mood="scared" armPitch={[-2.2, -2.2]} />
            </MumChicken>
            {drop > 0.15 && <Puffs position={[x - 0.3, y + 0.2, 95]} color="#f7f5f0" count={5} spread={0.4} size={0.07} speed={1.4} opacity={0.7} />}
          </>
        );
      },
    },
  ],
});

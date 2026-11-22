import { cam, storyScene } from "../../engine";
import { CLIFF, CliffBridge, Hero, MumChicken, Puffs, ZombieKid, ZombieMum, ease, hop, ramp, timing, wordAt } from "./kit";

const stepOffAt = wordAt("5.step", "stepped");

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "She Stepped Off the Cliff",
  shots: [
    {
      cue: "5.edge",
      ...cam.push({ on: [-2.4, 5.1, 95], onTo: [-1.4, 5.1, 95], dist: 3.6, to: 2.8, yaw: 18, pitch: 8, fov: 42 }),
      handheld: 0.016,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Tracked walk to the edge: MumChicken trots boldly past the stunned class up to the sheer drop.",
      stage: (t, { p }) => {
        const walkUp = ease(p);
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum position={[-2.7, CLIFF.ledgeY, 94.3]} rotationY={Math.PI / 2 - 0.3} shirt="#2d7a78" hat="bow" mood="scared" lookAt={[-1.3, 4.9, 95]} />
            <ZombieKid position={[-2.9, CLIFF.ledgeY, 95.5]} rotationY={Math.PI / 2 - 0.3} shirt="#3a7d8c" mood="scared" lookAt={[-1.3, 4.9, 95]} />
            <MumChicken position={[-2.9 + walkUp * 1.65, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2 - 0.25} walk={t * 2.8} flap={0.35} />
            <Hero position={[-3.3 + walkUp * 1.25, CLIFF.ledgeY, 95.2]} rotationY={Math.PI / 2 - 0.25} walk={t * 2.5} mood="scared" lookAt={[-1.2, 4.9, 95]} />
          </>
        );
      },
    },
    {
      cue: "5.mind",
      ...cam.orbit({ on: [-1.65, 5.1, 95], dist: 3.0, distTo: 2.35, yaw: 22, yawTo: -10, pitch: 10, fov: 40 }),
      handheld: 0.018,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Front-side 2-shot: Hero throws hands up wide-eyed staring at MumChicken peering straight down over the cliff drop.",
      stage: (t) => (
        <>
          <CliffBridge broken dropT={1.5} />
          <Hero position={[-2.05, CLIFF.ledgeY + hop(t, 0.35, 0.14, 0.25), 95]} rotationY={Math.PI / 2 - 0.35} mood="scared" armPitch={[-2.2, -2.2]} lean={-0.12} lookAt={[-1.2, 4.9, 95]} />
          <MumChicken position={[-1.25, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2 - 0.25} peck={0.45 + Math.sin(t * 7) * 0.12} flap={0.25} lookAt={[-0.2, 1.5, 95]} />
        </>
      ),
    },
    {
      cue: "5.climb",
      ...cam.orbit({ on: [-1.55, 5.05, 95], dist: 2.9, distTo: 2.3, yaw: 14, yawTo: -18, pitch: 12, fov: 40 }),
      handheld: 0.016,
      impacts: [{ at: 0.72, amp: 0.045, dur: 0.25 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Clean side-front mount: MumChicken crouches in the dirt; Hero sprints forward and leaps cleanly onto her back.",
      stage: (t, { p }) => {
        const crouch = ease(ramp(p, 0, 0.35)) * 0.75;
        const hopUp = ease(ramp(p, 0.35, 0.78));
        const arc = hopUp > 0 && hopUp < 1 ? Math.sin(hopUp * Math.PI) * 0.42 : 0;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            {p < 0.78 ? (
              <>
                <MumChicken position={[-1.25, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2 - 0.35} crouch={crouch} />
                <Hero position={[-2.05 + hopUp * 0.8, CLIFF.ledgeY + arc, 95]} rotationY={Math.PI / 2 - 0.35} walk={p < 0.35 ? t * 2.5 : 0} mood="scared" lean={0.18} />
              </>
            ) : (
              <MumChicken position={[-1.25, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2 - 0.35} crouch={0.45} flap={0.45}>
                <Hero position={[0, 0, 0]} mood="scared" lean={0.22} />
              </MumChicken>
            )}
          </>
        );
      },
    },
    {
      cue: "5.step",
      ...cam.orbit({ on: [-1.2, 4.95, 95], onTo: [0.1, 4.2, 95], dist: 3.4, distTo: 2.8, yaw: 18, yawTo: -14, pitch: 14, fov: 42 }),
      handheld: 0.024,
      impacts: [{ at: stepOffAt, amp: 0.065, dur: 0.3 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Tracked step into open air: camera drops smoothly alongside MumChicken & Hero as they step off the cliff rim.",
      stage: (t) => {
        const drop = t >= stepOffAt ? ease(ramp(t, stepOffAt, stepOffAt + 0.7)) : 0;
        const x = -1.25 + drop * 1.45;
        const y = CLIFF.ledgeY - drop * 0.85;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum position={[-2.2, CLIFF.ledgeY, 94.6]} rotationY={Math.PI / 2 - 0.3} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.5, -2.5]} />
            <MumChicken position={[x, y, 95]} rotationY={Math.PI / 2 - 0.45} walk={drop < 0.25 ? t * 2.4 : 0} flap={drop > 0.1 ? 0.95 : 0.25} tilt={drop * 0.15}>
              <Hero position={[0, 0, 0]} mood="scared" armPitch={[-2.2, -2.2]} />
            </MumChicken>
            {drop > 0.15 && <Puffs position={[x - 0.3, y + 0.2, 95]} color="#f7f5f0" count={5} spread={0.4} size={0.07} speed={1.4} opacity={0.7} />}
          </>
        );
      },
    },
  ],
});

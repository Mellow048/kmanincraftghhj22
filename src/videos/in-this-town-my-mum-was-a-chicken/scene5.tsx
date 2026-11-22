import { cam, storyScene } from "../../engine";
import { CLIFF, CliffBridge, Hero, MumChicken, ZombieKid, ZombieMum, ease, hop, ramp, timing, wordAt } from "./kit";

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
      stage: (t, { p }) => (
        <>
          <CliffBridge broken dropT={1.5} />
          <ZombieMum position={[-2.7, CLIFF.ledgeY, 94.3]} rotationY={Math.PI / 2 - 0.3} shirt="#2d7a78" hat="bow" mood="scared" lookAt={[-1.3, 4.9, 95]} />
          <ZombieKid position={[-2.9, CLIFF.ledgeY, 95.5]} rotationY={Math.PI / 2 - 0.3} shirt="#3a7d8c" mood="scared" lookAt={[-1.3, 4.9, 95]} />
          <MumChicken position={[-2.9 + p * 1.65, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2 - 0.25} walk={p * 2.8} flap={0.35} />
          <Hero position={[-3.3 + p * 1.25, CLIFF.ledgeY, 95.2]} rotationY={Math.PI / 2 - 0.25} walk={p * 2.4} mood="scared" lookAt={[-1.2, 4.9, 95]} />
        </>
      ),
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
      ...cam.orbit({ on: [-1.5, 5.35, 95], onTo: [-1.3, 5.55, 95], dist: 3.8, distTo: 3.45, yaw: 14, yawTo: -16, pitch: 10, fov: 44 }),
      handheld: 0.016,
      impacts: [{ at: 0.78, amp: 0.045, dur: 0.25 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Real climb-onto-back animation: Hero steps in, grabs MumChicken's shoulders, scrambles hand-and-knee up onto her back, and settles.",
      stage: (t, { p }) => {
        const crouch = ease(ramp(p, 0, 0.3)) * 0.78;
        const walkPre = ramp(p, 0, 0.28);
        const climb = ramp(p, 0.28, 0.8);
        const climbing = p >= 0.28 && p < 0.8;
        const hx = p < 0.28 ? -2.05 + walkPre * 0.5 : -1.55 + ease(climb) * 0.3;
        const hy = p < 0.28 ? CLIFF.ledgeY : CLIFF.ledgeY + ease(climb) * 0.58 + Math.sin(climb * Math.PI) * 0.18;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            {p < 0.8 ? (
              <>
                <MumChicken position={[-1.25, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2 - 0.35} crouch={crouch} />
                <Hero
                  position={[hx, hy, 95]}
                  rotationY={Math.PI / 2 - 0.35}
                  walk={p < 0.28 ? walkPre * 1.4 : climbing ? climb * 3.6 : 0}
                  mood="scared"
                  lean={climbing ? 0.42 : 0.15}
                  armPitch={climbing ? [-1.75 + Math.sin(t * 20) * 0.55, -1.75 - Math.sin(t * 20) * 0.55] : undefined}
                />
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
      ...cam.orbit({ on: [-1.3, 5.3, 95], onTo: [0.05, 4.9, 95], dist: 4.5, distTo: 4.2, yaw: 14, yawTo: -8, pitch: 12, fov: 46 }),
      handheld: 0.024,
      impacts: [{ at: stepOffAt, amp: 0.065, dur: 0.3 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Tracked step into open air: camera drops smoothly alongside MumChicken & Hero as they step cleanly off the cliff rim.",
      stage: (t) => {
        const preWalk = ramp(t, 0, stepOffAt);
        const drop = t >= stepOffAt ? ease(ramp(t, stepOffAt, stepOffAt + 0.7)) : 0;
        const x = -1.5 + preWalk * 0.35 + drop * 1.35;
        const y = CLIFF.ledgeY - drop * 0.85;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum position={[-2.2, CLIFF.ledgeY, 94.6]} rotationY={Math.PI / 2 - 0.3} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.5, -2.5]} />
            <MumChicken position={[x, y, 95]} rotationY={Math.PI / 2 - 0.45} walk={t < stepOffAt ? preWalk * 1.4 : 0} flap={drop > 0.1 ? 0.95 : 0.25} tilt={drop * 0.15}>
              <Hero position={[0, 0, 0]} mood="scared" armPitch={[-2.2, -2.2]} />
            </MumChicken>
          </>
        );
      },
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { CLIFF, CliffBridge, Hero, MumChicken, ZombieKid, ZombieMum, ease, ramp, timing, wordAt } from "./kit";

const climbAt = wordAt("5.climb", "climbed");
const stepAt = wordAt("5.step", "stepped");

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "To the Broken Edge",
  shots: [
    {
      cue: "5.edge",
      ...cam.truck({ on: [-2.8, 5.0, 95], by: [1.5, 0, 0], dist: 3.1, yaw: 18, pitch: 12, fov: 38 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Low travelling shot beside tiny MumChicken walking right past the big legs to the broken plank edge.",
      stage: (t, { p }) => (
        <>
          <CliffBridge broken dropT={1.5} />
          <ZombieMum position={[-2.4, CLIFF.ledgeY, 94.3]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" />
          <ZombieKid position={[-2.1, CLIFF.ledgeY, 95.6]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" />
          <MumChicken position={[-2.9 + p * 1.9, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={t * 1.8} />
          <Hero position={[-3.3, CLIFF.ledgeY, 95.1]} rotationY={Math.PI / 2} mood="scared" lookAt={[-1.0, 4.9, 95]} />
        </>
      ),
    },
    {
      cue: "5.mind",
      ...cam.push({ on: [-3.3, 5.1, 95.1], dist: 1.65, to: 1.3, yaw: 34, pitch: -4, fov: 34 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Tight reaction close-up on Hero staring wide-eyed as his mum walks to the drop.",
      stage: () => (
        <>
          <CliffBridge broken dropT={1.5} />
          <Hero position={[-3.3, CLIFF.ledgeY, 95.1]} rotationY={Math.PI / 2} mood="scared" lookAt={[-0.9, 4.8, 95]} />
        </>
      ),
    },
    {
      cue: "5.climb",
      ...cam.orbit({ on: [-1.2, 5.0, 95], dist: 2.6, distTo: 2.2, yaw: 24, yawTo: 8, pitch: 8, fov: 38 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Medium side shot at the broken plank: mum crouches low, Hero walks up and climbs onto her back.",
      stage: (t) => {
        const crouched = ease(ramp(t, 0.1, 0.8)) * (1 - ease(ramp(t, climbAt + 0.3, climbAt + 0.7)));
        const mounted = t >= climbAt;
        const approach = mounted ? 1 : ease(ramp(t, 0.4, climbAt));
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieKid position={[-2.5, CLIFF.ledgeY, 94.5]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" />
            <MumChicken position={[-0.95, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} crouch={crouched}>
              {mounted && <Hero position={[0, 0, 0]} mood="scared" armPitch={[-1.1, -1.1]} />}
            </MumChicken>
            {!mounted && (
              <Hero position={[-2.2 + approach * 1.15, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={approach * 1.4} mood="scared" />
            )}
          </>
        );
      },
    },
    {
      cue: "5.step",
      ...cam.push({ on: [-0.2, 4.8, 95], dist: 2.5, to: 2.1, yaw: 55, pitch: -8, fov: 40 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Odd angle out over the empty abyss looking back up at the edge: she steps right off the broken plank into thin air.",
      stage: (t) => {
        const off = ease(ramp(t, Math.max(0.2, stepAt - 0.15), stepAt + 0.5));
        const x = -0.7 + off * 0.95;
        const y = CLIFF.ledgeY - off * 0.25;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum position={[-1.6, CLIFF.ledgeY, 94.6]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.2, -2.2]} />
            <MumChicken position={[x, y, 95]} rotationY={Math.PI / 2} walk={off * 0.7} flap={off * 0.45}>
              <Hero position={[0, 0, 0]} mood="scared" armPitch={[-1.2, -1.2]} />
            </MumChicken>
          </>
        );
      },
    },
  ],
});

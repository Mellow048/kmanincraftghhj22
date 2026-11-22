import { cam, storyScene } from "../../engine";
import { GATE, Hero, MumChicken, PATH_TOP, SOUTH, WhiteEgg, ZombieKid, hop, ramp, timing, wordAt } from "./kit";

const ownAt = wordAt("7.own", "own");
const shakeAt = wordAt("7.egg", "shaking");

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Waiting to Catch Me",
  shots: [
    {
      cue: "7.knew",
      ...cam.orbit({ on: [8.85, 5.95, -5.0], dist: 3.1, distTo: 2.4, yaw: 12, yawTo: -12, pitch: 14, fov: 40 }),
      handheld: 0.014,
      look: "overworld-night",
      zone: "village",
      note: "Callback to the rooftop nest: Hero stands proudly beside MumChicken smiling and nodding warmly, egg front-low.",
      stage: (t) => (
        <>
          <Hero position={[9.18, GATE.roofTopY + 0.12, -5.0]} rotationY={-0.55} mood="happy" turn={-0.25} nod={Math.sin(t * 4) * 0.08} />
          <MumChicken position={[8.45, GATE.roofTopY + 0.12, -5.05]} rotationY={0.95} crouch={0.25} flap={0.3} lookAt={[9.18, 6.0, -5.0]} />
          <WhiteEgg position={[8.82, GATE.roofTopY + 0.13, -4.68]} />
        </>
      ),
    },
    {
      cue: "7.under",
      ...cam.push({ on: [-8.65, 2.15, -2.5], dist: 5.8, to: 5.3, yaw: 18, pitch: 8, fov: 46 }),
      handheld: 0.015,
      look: "overworld-night",
      zone: "village",
      note: "Unobstructed branch callback: Hero waves smiling down from the south-east oak branch while MumChicken looks proudly up.",
      stage: (t) => (
        <>
          <Hero position={[-8.6, 2.65, -2.5]} rotationY={SOUTH} mood="happy" wave={0.8 + Math.sin(t * 7) * 0.2} tilt={Math.sin(t * 5) * 0.1} lookAt={[-8.6, 0.4, -2.3]} />
          <MumChicken position={[-8.6, PATH_TOP + hop(t, 0.4, 0.14, 0.25), -2.3]} rotationY={0.2} flap={0.55} lookAt={[-8.6, 3.0, -2.5]} />
        </>
      ),
    },
    {
      cue: "7.wait",
      ...cam.orbit({ on: [0, 0.9, 1.8], dist: 3.1, distTo: 2.45, yaw: -18, yawTo: 16, pitch: 6, fov: 42 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "village",
      note: "Full-body Chicken Jockey callback: MumChicken struts forward proudly flaring white wings while Hero rides grinning.",
      stage: (t, { p }) => (
        <MumChicken position={[0, PATH_TOP, 2.1 - p * 0.7]} rotationY={0.15} walk={p * 2.2} flap={0.8}>
          <Hero position={[0, 0, 0]} mood="happy" wave={1} />
        </MumChicken>
      ),
    },
    {
      cue: "7.next",
      ...cam.orbit({ on: [0.0, 0.85, 1.7], dist: 3.8, distTo: 2.95, yaw: 14, yawTo: -12, pitch: 10, fov: 42 }),
      handheld: 0.018,
      look: "overworld-night",
      zone: "village",
      note: "Unblocked school gate payoff: Hero & MumChicken stand front-center while eager kids run in, stop cleanly, and wave.",
      stage: (t, { p }) => {
        const crowd = ramp(p, 0, 0.72);
        const moving = crowd < 0.99;
        return (
          <>
            <MumChicken position={[0, PATH_TOP, 1.85]} rotationY={0.15} flap={0.4}>
              <Hero position={[0, 0, 0]} mood="happy" />
            </MumChicken>
            <ZombieKid position={[-1.2 + crowd * 0.45, PATH_TOP + hop(t, 0.2, 0.22, 0.3), 1.65]} rotationY={1.1} walk={moving ? crowd * 2.6 : 0} shirt="#3a7d8c" mood="happy" wave={1} />
            <ZombieKid position={[1.2 - crowd * 0.45, PATH_TOP + hop(t, 0.45, 0.22, 0.3), 1.6]} rotationY={-1.1} walk={moving ? crowd * 2.6 : 0} shirt="#548256" mood="happy" wave={1} />
            <ZombieKid position={[0.35, PATH_TOP + hop(t, 0.7, 0.22, 0.3), 0.7 + crowd * 0.45]} rotationY={SOUTH} walk={moving ? crowd * 2.6 : 0} shirt="#6e5482" mood="happy" wave={1} />
          </>
        );
      },
    },
    {
      cue: "7.own",
      ...cam.push({ on: [0.0, 0.9, 1.8], dist: 2.8, to: 2.25, yaw: 12, pitch: 8, fov: 40 }),
      handheld: 0.016,
      impacts: [{ at: ownAt, amp: 0.04, dur: 0.25 }],
      look: "overworld-night",
      zone: "village",
      note: "Cheeky punchline: Hero grins atop MumChicken and shoos the crowding kids away left and right.",
      stage: (t) => (
        <>
          <MumChicken position={[0, PATH_TOP, 1.85]} rotationY={0.15} flap={t >= ownAt ? 0.55 : 0.15}>
            <Hero position={[0, 0, 0]} mood="happy" armPitch={t >= ownAt ? [-1.5, -1.5] : [-0.4, -0.4]} nod={Math.sin(t * 7) * 0.18} />
          </MumChicken>
          <ZombieKid position={[-0.78, PATH_TOP + hop(t, ownAt, 0.2, 0.28), 1.65]} rotationY={1.1} shirt="#3a7d8c" mood="sad" />
          <ZombieKid position={[0.78, PATH_TOP + hop(t, ownAt + 0.08, 0.2, 0.28), 1.6]} rotationY={-1.1} shirt="#548256" mood="sad" />
        </>
      ),
    },
    {
      cue: "7.egg",
      ...cam.orbit({ on: [8.82, 5.82, -4.8], dist: 2.4, distTo: 1.95, yaw: 16, yawTo: -12, pitch: 16, fov: 38 }),
      handheld: 0.022,
      impacts: [{ at: shakeAt, amp: 0.045, dur: 0.3 }],
      look: "overworld-night",
      zone: "village",
      note: "Unobstructed egg close-up: white egg rocks violently front-center while MumChicken and Hero stare startled from behind.",
      stage: (t) => {
        const shaking = t >= shakeAt - 0.15;
        return (
          <>
            <Hero position={[9.22, GATE.roofTopY + 0.12 + hop(t, shakeAt, 0.15, 0.25), -5.15]} rotationY={-0.65} mood="scared" lookAt={[8.82, 5.55, -4.68]} />
            <MumChicken position={[8.42, GATE.roofTopY + 0.12, -5.15]} rotationY={0.7} crouch={0.25} flap={shaking ? 0.65 : 0.15} lookAt={[8.82, 5.55, -4.68]} />
            <WhiteEgg position={[8.82, GATE.roofTopY + 0.13, -4.68]} wobble={shaking ? 1.85 : 0.45} cracked={t >= shakeAt + 0.35} />
          </>
        );
      },
    },
  ],
});

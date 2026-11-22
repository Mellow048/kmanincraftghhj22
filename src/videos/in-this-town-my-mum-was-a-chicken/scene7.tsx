import { cam, storyScene } from "../../engine";
import { GATE, Hero, MumChicken, NORTH, PATH_TOP, Puffs, SOUTH, WhiteEgg, ZombieKid, ease, hop, pop, ramp, timing, wordAt } from "./kit";

const ownAt = wordAt("7.own", "own");
const shakeAt = wordAt("7.egg", "shaking");

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Waiting to Catch Me",
  shots: [
    {
      cue: "7.knew",
      ...cam.orbit({ on: [8.85, 6.0, -5.0], dist: 2.55, distTo: 1.85, yaw: 20, yawTo: -16, pitch: 12, fov: 38 }),
      handheld: 0.014,
      look: "overworld-night",
      zone: "village",
      note: "Callback to the rooftop nest: Hero walks warmly beside MumChicken in the straw nest smiling with pride.",
      stage: (t, { p }) => (
        <>
          <Hero position={[9.25 - p * 0.15, GATE.roofTopY + 0.12, -4.95]} rotationY={-1.0} walk={t * 1.2} mood="happy" lookAt={[8.55, 5.9, -5.05]} />
          <MumChicken position={[8.55, GATE.roofTopY + 0.12, -5.05]} rotationY={1.1} crouch={0.25} flap={0.25} lookAt={[9.15, 6.0, -4.95]} />
          <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} />
        </>
      ),
    },
    {
      cue: "7.under",
      ...cam.push({ on: [-9.2, 2.0, -1.85], dist: 4.9, to: 3.4, yaw: 24, pitch: 26, fov: 44 }),
      handheld: 0.015,
      look: "overworld-night",
      zone: "village",
      note: "Callback to the climbing tree: Hero leans down grinning from the high branch while MumChicken looks proudly up with gentle wing beats.",
      stage: (t) => (
        <>
          <Hero position={[-9.2, 3.0, -1.9]} rotationY={SOUTH} mood="happy" wave={0.8} lookAt={[-9.2, 0.4, -1.75]} />
          <MumChicken position={[-9.2, PATH_TOP + hop(t, 0.4, 0.14, 0.25), -1.75]} rotationY={0} flap={0.45} lookAt={[-9.2, 3.3, -1.9]} />
        </>
      ),
    },
    {
      cue: "7.wait",
      ...cam.orbit({ on: [0, 0.68, 0.7], dist: 2.35, distTo: 1.75, yaw: -20, yawTo: 18, pitch: 6, fov: 36 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "village",
      note: "Callback to riding her back: MumChicken struts forward proudly flaring her white wings while Hero rides grinning ear to ear.",
      stage: (t, { p }) => (
        <>
          <MumChicken position={[0, PATH_TOP, 1.15 - ease(p) * 0.65]} rotationY={0.15} walk={t * 2.4} flap={0.75}>
            <Hero position={[0, 0, 0]} mood="happy" wave={1} />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "7.next",
      ...cam.orbit({ on: [0.0, 0.78, 0.3], dist: 3.8, distTo: 2.8, yaw: 20, yawTo: -16, pitch: 10, fov: 42 }),
      handheld: 0.018,
      look: "overworld-night",
      zone: "village",
      note: "Payoff at the school gate: eager zombie kids swarm around MumChicken waving both arms begging for a ride.",
      stage: (t, { p }) => {
        const crowd = ease(p);
        return (
          <>
            <MumChicken position={[0, PATH_TOP, 0.2]} rotationY={0.2} flap={0.35}>
              <Hero position={[0, 0, 0]} mood="happy" />
            </MumChicken>
            <ZombieKid position={[-1.4 + crowd * 0.55, PATH_TOP + hop(t, 0.2, 0.22, 0.3), 0.3]} rotationY={1.3} walk={crowd < 0.8 ? t * 2.5 : 0} shirt="#3a7d8c" mood="happy" wave={1} />
            <ZombieKid position={[1.4 - crowd * 0.55, PATH_TOP + hop(t, 0.45, 0.22, 0.3), 0.25]} rotationY={-1.3} walk={crowd < 0.8 ? t * 2.5 : 0} shirt="#548256" mood="happy" wave={1} />
            <ZombieKid position={[0.45, PATH_TOP + hop(t, 0.7, 0.22, 0.3), 1.4 - crowd * 0.45]} rotationY={NORTH} walk={crowd < 0.8 ? t * 2.5 : 0} shirt="#6e5482" mood="happy" wave={1} />
          </>
        );
      },
    },
    {
      cue: "7.own",
      ...cam.push({ on: [0.0, 0.75, 0.25], dist: 2.35, to: 1.7, yaw: 14, pitch: 8, fov: 36 }),
      handheld: 0.016,
      impacts: [{ at: ownAt, amp: 0.04, dur: 0.25 }],
      look: "overworld-night",
      zone: "village",
      note: "Cheeky punchline: Hero crosses his arms proudly atop MumChicken and shoos the crowding kids away.",
      stage: (t) => (
        <>
          <MumChicken position={[0, PATH_TOP, 0.2]} rotationY={0.15} flap={t >= ownAt ? 0.55 : 0.15}>
            <Hero position={[0, 0, 0]} mood="happy" armPitch={t >= ownAt ? [-1.5, -1.5] : [-0.4, -0.4]} nod={Math.sin(t * 7) * 0.18} />
          </MumChicken>
          <ZombieKid position={[-0.9, PATH_TOP + hop(t, ownAt, 0.2, 0.28), 0.4]} rotationY={1.2} shirt="#3a7d8c" mood="sad" />
          <ZombieKid position={[0.9, PATH_TOP + hop(t, ownAt + 0.08, 0.2, 0.28), 0.35]} rotationY={-1.2} shirt="#548256" mood="sad" />
        </>
      ),
    },
    {
      cue: "7.egg",
      ...cam.orbit({ on: [8.75, 5.68, -5.25], dist: 1.65, distTo: 1.15, yaw: 20, yawTo: -12, pitch: 12, fov: 32 }),
      handheld: 0.022,
      impacts: [{ at: shakeAt, amp: 0.045, dur: 0.3 }],
      look: "overworld-night",
      zone: "village",
      note: "Surprise cliffhanger: tight on the straw nest as the white egg violently wobbles, bounces, and cracks open with light puffs.",
      stage: (t) => {
        const shaking = t >= shakeAt - 0.15;
        return (
          <>
            <Hero position={[9.25, GATE.roofTopY + 0.12 + hop(t, shakeAt, 0.15, 0.25), -4.95]} rotationY={-1.1} mood="scared" lookAt={[8.75, 5.55, -5.32]} />
            <MumChicken position={[8.42, GATE.roofTopY + 0.12, -5.0]} rotationY={1.1} crouch={0.25} flap={shaking ? 0.65 : 0.15} lookAt={[8.75, 5.55, -5.32]} />
            <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} wobble={shaking ? 1.85 : 0.45} cracked={t >= shakeAt + 0.35} />
            {shaking && <Puffs position={[8.75, 5.68, -5.32]} color="#fff5cc" count={5} spread={0.32} size={0.055} speed={1.2} opacity={0.75} />}
          </>
        );
      },
    },
  ],
});

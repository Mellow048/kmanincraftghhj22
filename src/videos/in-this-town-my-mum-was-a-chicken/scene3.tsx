import { Vox, cam, storyScene } from "../../engine";
import { Bits, Hero, MumChicken, PATH_TOP, Puffs, SOUTH, ZombieKid, ease, hop, jolt, pop, ramp, timing, wordAt } from "./kit";

const sneezeAt = wordAt("3.normal", "sneezed");
const brokeAt = wordAt("3.broke", "broke");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Tried to Walk Alone",
  shots: [
    {
      cue: "3.normal",
      ...cam.orbit({ on: [0.05, 0.72, 1.9], dist: 2.9, distTo: 2.25, yaw: -16, yawTo: 14, pitch: 8, fov: 40 }),
      handheld: 0.018,
      impacts: [{ at: sneezeAt, amp: 0.055, dur: 0.3 }],
      look: "overworld-night",
      zone: "village",
      note: "Open-street sneeze gag: MumChicken hops bursting white feathers while Hero flinches beside her.",
      stage: (t) => {
        const sneezed = t >= sneezeAt - 0.1;
        return (
          <>
            <Hero position={[0.38, PATH_TOP + hop(t, sneezeAt, 0.14, 0.25), 1.9]} rotationY={-0.65} mood="scared" lean={sneezed ? -0.15 : 0.1} armPitch={sneezed ? [-2.1, -2.1] : [-0.4, -0.4]} />
            <MumChicken
              position={[-0.28, PATH_TOP + hop(t, sneezeAt, 0.36, 0.35), 1.9]}
              rotationY={0.55}
              flap={sneezed ? 1 : 0.15}
              peck={sneezed ? jolt(t, sneezeAt, 0.9) : -0.25 * ease(ramp(t, 0.2, sneezeAt))}
            />
            <Bits position={[-0.2, 0.75, 2.0]} t={t - sneezeAt} color="#f7f5f0" count={10} power={2.6} />
          </>
        );
      },
    },
    {
      cue: "3.walk",
      ...cam.truck({ on: [-3.1, 0.85, 1.85], by: [2.8, 0, 0], dist: 4.2, yaw: 10, pitch: 8, fov: 44 }),
      handheld: 0.015,
      look: "overworld-night",
      zone: "village",
      note: "Side-tracking march: Hero pumps arms & short legs marching right while taller zombie kids stride smoothly past behind him.",
      stage: (t, { p }) => (
        <>
          <Hero position={[-3.6 + p * 2.8, PATH_TOP, 2.1]} rotationY={Math.PI / 2 - 0.25} walk={p * 3.6} mood="calm" lean={0.14} />
          <ZombieKid position={[-3.8 + p * 4.0, PATH_TOP, 1.35]} rotationY={Math.PI / 2 - 0.2} walk={p * 3.8} shirt="#3a7d8c" mood="happy" scale={1.15} />
          <ZombieKid position={[-2.9 + p * 4.2, PATH_TOP, 1.55]} rotationY={Math.PI / 2 - 0.2} walk={p * 4.0} shirt="#548256" mood="happy" scale={1.15} />
        </>
      ),
    },
    {
      cue: "3.short",
      ...cam.push({ on: [-1.4, 0.72, 1.85], onTo: [0.3, 0.72, 1.85], dist: 3.1, to: 2.4, yaw: 72, pitch: 8, fov: 40 }),
      handheld: 0.02,
      look: "overworld-night",
      zone: "village",
      note: "Head-on tracking chase: Hero sprints straight down the road toward camera pumping tiny legs behind taller kids.",
      stage: (t, { p }) => (
        <>
          <Hero position={[-1.4 + p * 1.9, PATH_TOP + Math.abs(Math.sin(t * 14)) * 0.04, 1.85]} rotationY={Math.PI / 2 - 0.15} walk={p * 4.2} mood="sad" lean={0.2} />
          <ZombieKid position={[0.2 + p * 1.6, PATH_TOP, 1.45]} rotationY={Math.PI / 2 - 0.1} walk={p * 2.6} shirt="#6e5482" />
        </>
      ),
    },
    {
      cue: "3.crates",
      ...cam.orbit({ on: [0, 1.4, 1.8], dist: 4.4, distTo: 3.7, yaw: -22, yawTo: 14, pitch: 10, fov: 44 }),
      handheld: 0.018,
      look: "overworld-night",
      zone: "village",
      note: "Full-height steady crate tower: crates sit solid while Hero climbs on top windmilling both arms to balance.",
      stage: (t) => {
        const sway = Math.sin(t * 10) * 0.2;
        const hopUp = ease(ramp(t, 0.1, 0.45));
        return (
          <>
            <group position={[0, PATH_TOP + 0.35, 1.8]} scale={pop(t, 0.05)}>
              <Vox kind="planks" tint="#9e6d3f" size={[0.72, 0.7, 0.72]} />
            </group>
            <group position={[0.02, PATH_TOP + 1.05, 1.8]} rotation={[0, 0.08, sway * 0.06]} scale={pop(t, 0.18)}>
              <Vox kind="planks" tint="#b5804c" size={[0.68, 0.7, 0.68]} />
            </group>
            <Hero
              position={[0.02 + sway * 0.1, PATH_TOP + 0.7 + hopUp * 0.7 + hop(t, 0.15, 0.3, 0.3), 1.8]}
              rotationY={SOUTH}
              mood="happy"
              tilt={sway}
              armPitch={[-0.7 + sway * 2.2, -0.7 - sway * 2.2]}
            />
          </>
        );
      },
    },
    {
      cue: "3.broke",
      ...cam.push({ on: [0, 1.05, 1.8], dist: 3.2, to: 3.8, yaw: 18, pitch: 14, fov: 44 }),
      handheld: 0.024,
      impacts: [{ at: brokeAt, amp: 0.075, dur: 0.35 }],
      look: "overworld-night",
      zone: "village",
      note: "Crates shatter cleanly into flying planks and dust puffs as Hero plummets flailing.",
      stage: (t) => {
        const fall = t < brokeAt ? 0 : ease(ramp(t, brokeAt, brokeAt + 0.45));
        const y = PATH_TOP + 1.4 - fall * 0.92;
        return (
          <>
            {t < brokeAt ? (
              <>
                <Vox kind="planks" tint="#9e6d3f" position={[0, PATH_TOP + 0.35, 1.8]} size={[0.72, 0.7, 0.72]} />
                <Vox kind="planks" tint="#b5804c" position={[0, PATH_TOP + 1.05, 1.8]} size={[0.68, 0.7, 0.68]} />
              </>
            ) : (
              <>
                <Bits position={[0, PATH_TOP + 0.75, 1.8]} t={t - brokeAt} color="#a87542" count={18} power={4.2} />
                <Puffs position={[0, PATH_TOP + 0.7, 1.8]} color="#d8c3a5" count={7} spread={0.55} size={0.09} speed={1.6} opacity={0.75} />
              </>
            )}
            <Hero position={[0, y, 1.8]} rotationY={SOUTH} mood="scared" armPitch={[-2.6 + Math.sin(t * 22) * 0.4, -2.6 - Math.sin(t * 22) * 0.4]} />
          </>
        );
      },
    },
    {
      cue: "3.caught",
      ...cam.orbit({ on: [0, 0.95, 1.8], dist: 3.55, distTo: 2.95, yaw: 20, yawTo: -14, pitch: 6, fov: 42 }),
      handheld: 0.015,
      impacts: [{ at: 0.14, amp: 0.06, dur: 0.32 }],
      look: "overworld-night",
      zone: "village",
      note: "Soft feather rescue: MumChicken darts in from left under falling Hero and cushions the impact cleanly.",
      stage: (t, { p }) => {
        const drop = p < 0.22 ? (1 - p / 0.22) * 0.65 : 0;
        const squash = jolt(t, 0.22, 0.4);
        const zip = ramp(t, 0, 0.22);
        return (
          <MumChicken position={[-1.1 + ease(zip) * 1.1, PATH_TOP, 1.8]} rotationY={0.25} walk={zip < 0.99 ? zip * 2.2 : 0} flap={p < 0.45 ? 0.95 : 0.2} crouch={Math.abs(squash)}>
            <Hero position={[0, drop, 0]} mood={p > 0.4 ? "calm" : "scared"} turn={p > 0.45 ? Math.sin(t * 6) * 0.25 : 0} />
          </MumChicken>
        );
      },
    },
  ],
});

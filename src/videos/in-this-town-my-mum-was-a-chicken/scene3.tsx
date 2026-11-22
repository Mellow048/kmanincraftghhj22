import { cam, storyScene } from "../../engine";
import { Bits, Hero, MumChicken, NORTH, PATH_TOP, Puffs, SOUTH, ZombieKid, ease, hop, jolt, pop, ramp, timing, wordAt } from "./kit";

const sneezeAt = wordAt("3.normal", "sneezed");
const brokeAt = wordAt("3.broke", "broke");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Tried to Walk Alone",
  shots: [
    {
      cue: "3.normal",
      ...cam.orbit({ on: [0, 0.72, 0.8], dist: 2.3, distTo: 1.8, yaw: -20, yawTo: 18, pitch: 6, fov: 38 }),
      handheld: 0.018,
      impacts: [{ at: sneezeAt, amp: 0.055, dur: 0.3 }],
      look: "overworld-night",
      zone: "village",
      note: "Close-up gag: MumChicken inhales, sneezes violently launching into a hop with bursting feathers while Hero flinches.",
      stage: (t) => {
        const sneezed = t >= sneezeAt - 0.1;
        return (
          <>
            <Hero position={[-0.55, PATH_TOP + hop(t, sneezeAt, 0.12, 0.25), 0.9]} rotationY={1.1} mood="scared" lean={sneezed ? -0.15 : 0.1} armPitch={sneezed ? [-2.1, -2.1] : [-0.4, -0.4]} />
            <MumChicken
              position={[0.25, PATH_TOP + hop(t, sneezeAt, 0.34, 0.35), 0.7]}
              rotationY={-0.6}
              flap={sneezed ? 1 : 0.1}
              peck={sneezed ? jolt(t, sneezeAt, 0.9) : -0.25 * ease(ramp(t, 0.2, sneezeAt))}
            />
            <Bits position={[0.15, 0.75, 0.8]} t={t - sneezeAt} color="#f7f5f0" count={12} power={2.8} />
            {sneezed && <Puffs position={[0.15, 0.72, 0.8]} color="#ffffff" count={6} spread={0.4} size={0.07} speed={1.5} opacity={0.75} />}
          </>
        );
      },
    },
    {
      cue: "3.walk",
      ...cam.truck({ on: [-3.0, 0.68, 1.4], by: [2.5, 0, 0], dist: 3.1, yaw: 14, pitch: 6, fov: 40 }),
      handheld: 0.015,
      look: "overworld-night",
      zone: "village",
      note: "Travelling side-walk: Hero marches determinedly down the road on short legs while taller zombie kids breeze right past him.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <Hero position={[-4.2 + k * 2.5, PATH_TOP, 1.5]} rotationY={Math.PI / 2} walk={t * 2.8} mood="calm" lean={0.14} />
            <ZombieKid position={[-3.2 + k * 4.4, PATH_TOP, 0.95]} rotationY={Math.PI / 2} walk={t * 2.2} shirt="#3a7d8c" mood="happy" scale={1.15} />
            <ZombieKid position={[-2.2 + k * 4.6, PATH_TOP, 1.9]} rotationY={Math.PI / 2} walk={t * 2.3} shirt="#548256" mood="happy" scale={1.15} />
          </>
        );
      },
    },
    {
      cue: "3.short",
      ...cam.push({ on: [-1.2, 0.6, 0.4], onTo: [-0.2, 0.65, -0.3], dist: 2.7, to: 2.0, yaw: 18, pitch: 8, fov: 38 }),
      handheld: 0.02,
      look: "overworld-night",
      zone: "village",
      note: "Low chase shot from ahead: Hero pumps his tiny legs desperately trying to catch up before the bell stops.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <Hero position={[-1.8 + k * 1.7, PATH_TOP + Math.abs(Math.sin(t * 14)) * 0.06, 0.7 - k * 0.8]} rotationY={NORTH + 0.5} walk={t * 3.8} mood="sad" lean={0.22} />
            <ZombieKid position={[0.4 + k * 0.8, PATH_TOP, -1.6 - k * 1.4]} rotationY={NORTH} walk={t * 2.4} shirt="#6e5482" />
          </>
        );
      },
    },
    {
      cue: "3.crates",
      ...cam.orbit({ on: [0.0, 1.55, 0.8], dist: 3.5, distTo: 2.7, yaw: -28, yawTo: 16, pitch: 10, fov: 40 }),
      handheld: 0.018,
      look: "overworld-night",
      zone: "village",
      note: "Balancing act: wooden crates pop up and Hero hops onto the wobbling stack windmilling both arms to look tall.",
      stage: (t) => {
        const sway = Math.sin(t * 10) * 0.2;
        const hopUp = ease(ramp(t, 0.1, 0.45));
        return (
          <>
            <group position={[0, PATH_TOP + 0.35, 0.8]} scale={pop(t, 0.05)}>
              <Vox kind="planks" tint="#9e6d3f" size={[0.72, 0.7, 0.72]} />
            </group>
            <group position={[0.02, PATH_TOP + 1.05, 0.8]} rotation={[0, 0.1, sway * 0.5]} scale={pop(t, 0.18)}>
              <Vox kind="planks" tint="#b5804c" size={[0.68, 0.7, 0.68]} />
            </group>
            <Hero
              position={[0.02 + sway * 0.18, PATH_TOP + 0.7 + hopUp * 0.7 + hop(t, 0.15, 0.32, 0.32), 0.8]}
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
      ...cam.push({ on: [0.0, 1.05, 0.8], dist: 2.5, to: 3.1, yaw: 24, pitch: 18, fov: 42 }),
      handheld: 0.024,
      impacts: [{ at: brokeAt, amp: 0.075, dur: 0.35 }],
      look: "overworld-night",
      zone: "village",
      note: "Action fall: the crates shatter into flying wood chunks and dust puffs as Hero plummets arms flailing.",
      stage: (t) => {
        const fall = t < brokeAt ? 0 : ease(ramp(t, brokeAt, brokeAt + 0.45));
        const y = PATH_TOP + 1.4 - fall * 0.92;
        return (
          <>
            {t < brokeAt ? (
              <>
                <Vox kind="planks" tint="#9e6d3f" position={[0, PATH_TOP + 0.35, 0.8]} size={[0.72, 0.7, 0.72]} />
                <Vox kind="planks" tint="#b5804c" position={[0, PATH_TOP + 1.05, 0.8]} rotation={[0, 0, Math.sin(t * 16) * 0.12]} size={[0.68, 0.7, 0.68]} />
              </>
            ) : (
              <>
                <Bits position={[0, PATH_TOP + 0.75, 0.8]} t={t - brokeAt} color="#a87542" count={18} power={4.2} />
                <Puffs position={[0, PATH_TOP + 0.7, 0.8]} color="#d8c3a5" count={7} spread={0.55} size={0.09} speed={1.6} opacity={0.75} />
              </>
            )}
            <Hero position={[0, y, 0.8]} rotationY={SOUTH} mood="scared" armPitch={[-2.6 + Math.sin(t * 22) * 0.4, -2.6 - Math.sin(t * 22) * 0.4]} />
          </>
        );
      },
    },
    {
      cue: "3.caught",
      ...cam.orbit({ on: [0.0, 0.62, 0.8], dist: 2.55, distTo: 1.85, yaw: 24, yawTo: -16, pitch: -4, fov: 36 }),
      handheld: 0.015,
      impacts: [{ at: 0.14, amp: 0.06, dur: 0.32 }],
      look: "overworld-night",
      zone: "village",
      note: "Soft feather catch: MumChicken zips straight under him, cushions the landing with a squash, and Hero blinks in disbelief.",
      stage: (t, { p }) => {
        const drop = p < 0.22 ? (1 - p / 0.22) * 0.65 : 0;
        const squash = jolt(t, 0.22, 0.4);
        const zip = ease(ramp(t, 0, 0.18));
        return (
          <>
            <MumChicken position={[-0.9 + zip * 0.9, PATH_TOP, 0.8]} rotationY={0.3} flap={p < 0.45 ? 0.9 : 0.15} crouch={Math.abs(squash)}>
              <Hero position={[0, drop, 0]} mood={p > 0.4 ? "calm" : "scared"} turn={p > 0.45 ? Math.sin(t * 6) * 0.25 : 0} />
            </MumChicken>
            {p > 0.18 && <Puffs position={[0, PATH_TOP + 0.12, 0.8]} color="#f7f5f0" count={6} spread={0.45} size={0.075} speed={1.4} opacity={0.7} />}
          </>
        );
      },
    },
  ],
});

import { Vox } from "../../engine";

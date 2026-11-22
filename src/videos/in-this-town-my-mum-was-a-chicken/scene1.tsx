import { Block, cam, storyScene } from "../../engine";
import { Bits, Bubble, GATE, Hero, MumChicken, NORTH, PATH_TOP, SOUTH, WhiteEgg, WoodenDoor, ZombieKid, ZombieMum, ease, jolt, pop, ramp, timing, wordAt } from "./kit";

const egg1 = wordAt("1.chicken", "chicken");
const smash = wordAt("1.doors", "break");
const egg2 = wordAt("1.egg", "egg");
const cornerAt = wordAt("1.corner", "corner");
const horseAt = wordAt("1.horse", "horse");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "My Mum Was a Chicken",
  shots: [
    {
      cue: "1.mums",
      ...cam.truck({ on: [-1.4, 0.9, -0.4], by: [1.8, 0, 0], dist: 4.1, yaw: 14, pitch: 10, fov: 40 }),
      look: "overworld-night",
      zone: "village",
      note: "Frame 1 hook: tall zombie mums holding kids' hands pop in along the school gate; at the end sits our red-shirted baby zombie on a chicken.",
      stage: (t) => (
        <>
          {t > 0.05 && <ZombieMum position={[-1.5, PATH_TOP, -0.6]} rotationY={SOUTH} shirt="#2d7a78" scarf="#c23a2e" mood="happy" scale={pop(t, 0.05, 0.22) ? 1 : 1} />}
          {t > 0.15 && <ZombieKid position={[-0.95, PATH_TOP, -0.2]} rotationY={SOUTH} shirt="#3a7d8c" mood="happy" />}
          {t > 0.35 && <ZombieMum position={[0.1, PATH_TOP, -0.7]} rotationY={SOUTH} shirt="#486a94" hat="bow" mood="calm" />}
          {t > 0.5 && <ZombieKid position={[0.65, PATH_TOP, -0.25]} rotationY={SOUTH} shirt="#548256" mood="happy" />}
          {/* The Chicken Jockey hero at the end of the row */}
          <MumChicken position={[1.55, PATH_TOP, 0.25]} rotationY={-0.35} flap={t > 0.85 && t < 1.35 ? 0.5 : 0} lookAt={[1.6, 0.7, 3.0]}>
            <Hero position={[0, 0, 0]} mood="calm" wave={t > 0.2 ? 0.7 : 0} />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "1.chicken",
      ...cam.push({ on: [1.55, 0.7, 0.25], dist: 2.1, to: 1.55, yaw: -22, pitch: -8, fov: 36 }),
      look: "overworld-night",
      zone: "village",
      note: "Low tight push onto the baby zombie riding his chicken mum as she lays a white egg on the word chicken.",
      stage: (t) => (
        <>
          <MumChicken position={[1.55, PATH_TOP, 0.25]} rotationY={-0.35} crouch={t > egg1 && t < egg1 + 0.35 ? 0.6 : 0} lookAt={[1.0, 0.7, 2.2]}>
            <Hero position={[0, 0, 0]} mood={t < egg1 ? "calm" : "sad"} tilt={t > egg1 ? -0.15 : 0} />
          </MumChicken>
          {t >= egg1 && <WhiteEgg position={[1.62, PATH_TOP, -0.15]} scale={pop(t, egg1, 0.2)} />}
        </>
      ),
    },
    {
      cue: "1.doors",
      ...cam.push({ on: [-6.5, 1.15, -3.5], dist: 3.4, to: 2.8, yaw: 28, pitch: 8, fov: 40 }),
      look: "overworld-night",
      zone: "village",
      note: "Show what normal zombie mums do: smash a wooden oak door to splinters in front of the house.",
      stage: (t) => {
        const hit = t >= smash;
        const swing = !hit ? -1.5 - 1.2 * ease(ramp(t, smash - 0.28, smash)) : -1.5;
        return (
          <>
            <WoodenDoor position={[-6.5, 0, -4.0]} broken={hit} />
            <ZombieMum
              position={[-6.5, PATH_TOP, -3.1]}
              rotationY={NORTH}
              shirt="#2a8c82"
              hat="bow"
              mood="angry"
              armPitch={[swing, swing]}
              lean={hit ? 0.15 : 0}
            />
            {hit && <Bits position={[-6.5, 1.0, -3.9]} t={t - smash} color="#8c5e34" count={14} power={3.4} />}
          </>
        );
      },
    },
    {
      cue: "1.egg",
      ...cam.orbit({ on: [0.4, 0.5, 1.4], dist: 2.0, distTo: 1.75, yaw: 35, yawTo: 18, pitch: -4, fov: 38 }),
      look: "overworld-night",
      zone: "village",
      note: "Worm's-eye view by a mud patch: mum sits down and lays an egg while the kid hides his face.",
      stage: (t) => (
        <>
          <Block position={[0.4, PATH_TOP + 0.01, 1.4]} size={[1.5, 0.04, 1.3]} color="#4a3423" />
          <MumChicken position={[0.45, PATH_TOP + 0.02, 1.45]} rotationY={0.4} crouch={0.75} lookAt={[0.9, 0.5, 2.4]}>
            <Hero position={[0, 0, 0]} mood="sad" armPitch={[-2.1, -2.1]} />
          </MumChicken>
          {t >= egg2 && <WhiteEgg position={[0.25, PATH_TOP + 0.03, 1.15]} scale={pop(t, egg2, 0.18)} />}
        </>
      ),
    },
    {
      cue: "1.corner",
      ...cam.truck({ on: [-4.4, 0.85, 1.6], by: [1.0, 0, 0], dist: 3.3, yaw: -25, pitch: 12, fov: 40 }),
      look: "overworld-night",
      zone: "village",
      note: "Travelling shot at the corner hedge: kid hops off before the school gate and waves her away.",
      stage: (t, { p }) => {
        const hopped = t >= cornerAt;
        const walkX = hopped ? ease(ramp(t, cornerAt, cornerAt + 0.9)) * 1.1 : 0;
        return (
          <>
            <MumChicken position={[-4.8 + p * 0.4, PATH_TOP, 1.8]} rotationY={-0.6} walk={p * 0.5} lookAt={[-3.2, 0.6, 1.8]}>
              {!hopped && <Hero position={[0, 0, 0]} mood="sad" />}
            </MumChicken>
            {hopped && (
              <Hero
                position={[-4.2 + walkX, PATH_TOP, 1.8]}
                rotationY={Math.PI / 2}
                walk={walkX}
                mood="sad"
                armPitch={[-0.4, -2.1]}
              />
            )}
          </>
        );
      },
    },
    {
      cue: "1.horse",
      ...cam.push({ on: [-2.2, 0.85, 1.6], dist: 3.1, to: 2.5, yaw: -38, pitch: 8, fov: 38 }),
      look: "overworld-night",
      zone: "village",
      note: "Reverse past the skeptical zombie kids as Hero points back at his chicken mum and calls her a tiny horse.",
      stage: (t) => (
        <>
          <MumChicken position={[-3.6, PATH_TOP, 1.5]} rotationY={0.7} peck={t > 1.2 ? Math.sin((t - 1.2) * 8) * 0.5 : 0} />
          <Hero
            position={[-2.5, PATH_TOP, 1.7]}
            rotationY={0.35}
            mood="happy"
            armPitch={[-0.3, -1.6]}
            lookAt={[-1.4, 0.7, 1.8]}
          />
          <ZombieKid position={[-1.4, PATH_TOP, 1.9]} rotationY={-1.3} shirt="#3a7d8c" mood="calm" tilt={0.22} />
          <ZombieKid position={[-1.2, PATH_TOP, 1.25]} rotationY={-1.45} shirt="#548256" mood="calm" tilt={-0.18} />
          {t >= horseAt - 0.15 && (
            <Bubble dark text="TINY HORSE" position={[-2.4, 1.65, 1.7]} rotationY={-0.55} scale={0.46 * pop(t, horseAt - 0.15)} />
          )}
        </>
      ),
    },
  ],
});

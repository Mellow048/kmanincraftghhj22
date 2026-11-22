import { cam, storyScene } from "../../engine";
import { Bits, Bubble, Hero, MumChicken, NORTH, PATH_TOP, Puffs, SOUTH, WhiteEgg, WoodenDoor, ZombieKid, ZombieMum, ease, hop, jolt, pop, ramp, timing, wordAt } from "./kit";

const smashAt = wordAt("1.doors", "break");
const layAt = wordAt("1.egg", "egg");
const stopAt = wordAt("1.corner", "stop");
const horseAt = wordAt("1.horse", "horse");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Every Kid Had a Mum",
  shots: [
    {
      cue: "1.mums",
      ...cam.push({ on: [-0.2, 0.9, 0.2], dist: 5.2, to: 3.4, yaw: 14, pitch: 8, fov: 44 }),
      handheld: 0.015,
      look: "overworld-night",
      zone: "village",
      note: "Kinetic hook: tall zombie mums & waving kids march toward the school gate as Hero enters fast riding tiny MumChicken.",
      stage: (t, { p }) => {
        const k = ease(p);
        const rideX = -2.2 + k * 2.15;
        const rideZ = 1.9 - k * 1.1;
        return (
          <>
            <ZombieMum position={[-1.4, PATH_TOP, -0.5 - k * 0.7]} rotationY={SOUTH} walk={t * 1.5} shirt="#2a8c82" hat="bow" mood="happy" wave={0.8} />
            <ZombieKid position={[-0.75, PATH_TOP + hop(t, 0.4, 0.2, 0.3), -0.35 - k * 0.7]} rotationY={SOUTH} walk={t * 1.8} shirt="#3a7d8c" mood="happy" />
            <ZombieMum position={[1.45, PATH_TOP, -0.8 - k * 0.6]} rotationY={SOUTH} walk={t * 1.4} shirt="#486a94" hat="straw" mood="happy" />
            <ZombieKid position={[0.85, PATH_TOP + hop(t, 0.8, 0.2, 0.3), -0.6 - k * 0.6]} rotationY={SOUTH} walk={t * 1.6} shirt="#548256" mood="happy" />
            <MumChicken position={[rideX, PATH_TOP + hop(t, 0.55, 0.16, 0.28), rideZ]} rotationY={0.35} walk={t * 2.4} flap={t > 0.45 && t < 0.95 ? 0.6 : 0}>
              <Hero position={[0, 0, 0]} mood="happy" wave={1} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "1.chicken",
      ...cam.orbit({ on: [0, 0.68, 0.7], dist: 2.35, distTo: 1.75, yaw: -16, yawTo: 20, pitch: 4, fov: 36 }),
      handheld: 0.018,
      impacts: [{ at: 0.25, amp: 0.035, dur: 0.25 }],
      look: "overworld-night",
      zone: "village",
      note: "Dynamic chicken jockey reveal: MumChicken trots forward flapping wildly while Hero bounces and waves on her back.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <MumChicken position={[0, PATH_TOP + hop(t, 0.2, 0.2, 0.3), 1.15 - k * 0.5]} rotationY={0.15} walk={t * 2.6} flap={0.9}>
              <Hero position={[0, 0, 0]} mood="happy" wave={1} tilt={Math.sin(t * 10) * 0.12} />
            </MumChicken>
            <Puffs position={[0, PATH_TOP + 0.35, 0.85]} color="#f7f5f0" count={5} spread={0.35} size={0.07} speed={1.2} opacity={0.7} />
          </>
        );
      },
    },
    {
      cue: "1.doors",
      ...cam.push({ on: [-6.5, 1.25, -2.0], dist: 3.8, to: 2.7, yaw: 20, pitch: 8, fov: 42 }),
      handheld: 0.022,
      impacts: [{ at: smashAt, amp: 0.09, dur: 0.42 }],
      look: "overworld-night",
      zone: "village",
      note: "Power contrast: big zombie mum sprints forward and smashes right through the wooden door, sending splinters flying.",
      stage: (t) => {
        const broken = t >= smashAt;
        const charge = broken ? 1 : ease(ramp(t, 0.05, smashAt));
        const z = -0.3 - charge * 1.45;
        return (
          <>
            <WoodenDoor position={[-6.5, PATH_TOP, -1.9]} broken={broken} />
            <ZombieMum
              position={[-6.5, PATH_TOP + hop(t, smashAt - 0.15, 0.18, 0.25), z]}
              rotationY={NORTH}
              walk={t * 2.8}
              lean={broken ? 0.15 : 0.36}
              armPitch={[-1.65, -1.65]}
              mood="angry"
              shirt="#2d7a78"
              hat="bow"
            />
            <ZombieKid position={[-7.5, PATH_TOP + hop(t, smashAt + 0.1, 0.3, 0.32), -0.5]} rotationY={NORTH} mood="happy" armPitch={[-2.6, -2.6]} />
            <Bits position={[-6.5, 1.0, -1.9]} t={t - smashAt} color="#a87542" count={18} power={4.5} toward={[0, 0.4, -1]} />
            {broken && <Puffs position={[-6.5, 0.9, -1.9]} color="#e6d2b5" count={8} spread={0.6} size={0.1} speed={1.6} opacity={0.75} />}
          </>
        );
      },
    },
    {
      cue: "1.egg",
      ...cam.orbit({ on: [-0.25, 0.55, 0.8], dist: 2.7, distTo: 2.05, yaw: -20, yawTo: 18, pitch: 12, fov: 40 }),
      handheld: 0.018,
      impacts: [{ at: layAt, amp: 0.045, dur: 0.3 }],
      look: "overworld-night",
      zone: "village",
      note: "Comic contrast: MumChicken squats, pops out a white egg into the mud while Hero leaps off groaning and kids laugh.",
      stage: (t) => {
        const laid = t >= layAt;
        const squat = laid ? 0.15 : ease(ramp(t, 0.08, layAt)) * 0.72;
        const hopOff = ease(ramp(t, layAt, layAt + 0.35));
        const eggY = laid ? PATH_TOP + hop(t, layAt, 0.28, 0.3) : PATH_TOP;
        return (
          <>
            <MumChicken position={[-0.2, PATH_TOP, 0.7]} rotationY={0.25} crouch={squat} flap={laid ? 0.55 : 0} />
            {laid && <WhiteEgg position={[-0.24, eggY, 0.35]} scale={pop(t, layAt)} wobble={0.8} />}
            {laid && <Puffs position={[-0.24, PATH_TOP + 0.15, 0.35]} color="#f7f4eb" count={5} spread={0.35} size={0.07} speed={1.4} opacity={0.75} />}
            <Hero
              position={[-0.2 - hopOff * 0.75, PATH_TOP + hop(t, layAt, 0.35, 0.35), 0.7 + hopOff * 0.2]}
              rotationY={SOUTH}
              mood="sad"
              armPitch={[-2.1, -2.1]}
              lean={0.2}
              tilt={Math.sin(t * 9) * 0.12}
            />
            <ZombieKid position={[0.75, PATH_TOP + hop(t, layAt + 0.15, 0.25, 0.3), 0.25]} rotationY={-0.6} shirt="#548256" mood="happy" armPitch={[-1.4, -0.3]} lookAt={[-0.2, 0.4, 0.6]} />
          </>
        );
      },
    },
    {
      cue: "1.corner",
      ...cam.truck({ on: [-2.0, 0.7, 1.3], by: [-2.2, 0, 0.2], dist: 3.1, yaw: 12, pitch: 8, fov: 40 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "village",
      note: "Travelling action shot: Hero and MumChicken trot briskly to the bush corner; Hero halts her nervously with both hands.",
      stage: (t) => {
        const reach = ease(ramp(t, 0, Math.max(0.4, stopAt + 0.2)));
        const mx = -1.1 - reach * 2.7;
        const hx = -1.6 - reach * 2.9;
        const stopped = t >= stopAt;
        return (
          <>
            <Hero
              position={[hx, PATH_TOP + hop(t, stopAt, 0.15, 0.25), 1.4]}
              rotationY={stopped ? Math.PI / 2 : -Math.PI / 2}
              walk={stopped ? 0 : t * 2.5}
              mood="scared"
              armPitch={stopped ? [-1.5, -1.5] : [-0.4, -0.4]}
              lookAt={stopped ? [mx, 0.4, 1.3] : [-5, 0.5, 1.4]}
            />
            <MumChicken
              position={[mx, PATH_TOP, 1.3]}
              rotationY={-Math.PI / 2}
              walk={stopped ? 0 : t * 2.5}
              flap={stopped ? 0.5 : 0}
              headYaw={stopped ? Math.sin(t * 7) * 0.3 : 0}
              lookAt={[hx, 0.55, 1.4]}
            />
          </>
        );
      },
    },
    {
      cue: "1.horse",
      ...cam.orbit({ on: [-1.8, 0.75, 0.9], dist: 2.9, distTo: 2.3, yaw: 18, yawTo: -22, pitch: 10, fov: 38 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "village",
      note: "Punchline acting: Hero dashes to two kids pointing back, HORSE? pops up, then MumChicken pops out flapping and kids jump back.",
      stage: (t) => {
        const dash = ease(ramp(t, 0, 0.55));
        const jump = t >= horseAt;
        return (
          <>
            <Hero
              position={[-2.9 + dash * 0.95, PATH_TOP, 1.0]}
              rotationY={1.2}
              walk={dash < 0.95 ? t * 2.6 : 0}
              mood="happy"
              armPitch={[-1.4, -0.2]}
              nod={Math.sin(t * 8) * 0.15}
              lookAt={[-1.1, 0.65, 0.85]}
            />
            <ZombieKid position={[-1.15 + hop(t, horseAt, 0.25, 0.3) * 0.6, PATH_TOP + hop(t, horseAt, 0.25, 0.3), 0.7]} rotationY={-1.3} shirt="#3a7d8c" mood={jump ? "scared" : "calm"} tilt={-0.18} />
            <ZombieKid position={[-0.95 + hop(t, horseAt + 0.08, 0.25, 0.3) * 0.6, PATH_TOP + hop(t, horseAt + 0.08, 0.25, 0.3), 1.3]} rotationY={-1.7} shirt="#6e5482" mood={jump ? "scared" : "calm"} tilt={0.18} />
            <MumChicken position={[-3.35 + (jump ? 0.45 : 0), PATH_TOP, 1.15]} rotationY={1.3} flap={jump ? 0.9 : 0.15} peck={Math.sin(t * 10) * 0.25} />
            <Bubble dark text="HORSE?" position={[-1.1, 1.38 + hop(t, horseAt, 0.1, 0.25), 0.95]} rotationY={0.3} scale={0.45 * pop(t, Math.max(0.25, horseAt - 0.15))} />
          </>
        );
      },
    },
  ],
});

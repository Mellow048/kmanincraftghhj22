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
      ...cam.push({ on: [0, 1.0, 1.0], dist: 5.8, to: 4.6, yaw: 6, pitch: 8, fov: 46 }),
      handheld: 0.015,
      look: "overworld-night",
      zone: "village",
      note: "Tight 9:16 hook: two zombie mums & waving kids walk forward in the narrow street slit while Hero rides MumChicken fast up the middle.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <ZombieMum position={[-0.78, PATH_TOP, 0.2 + k * 0.6]} rotationY={SOUTH} walk={t * 1.8} shirt="#2a8c82" hat="bow" mood="happy" wave={0.9} />
            <ZombieKid position={[-0.38, PATH_TOP + hop(t, 0.3, 0.22, 0.3), 0.4 + k * 0.7]} rotationY={SOUTH} walk={t * 2.1} shirt="#3a7d8c" mood="happy" wave={0.8} />
            <ZombieMum position={[0.78, PATH_TOP, 0.0 + k * 0.6]} rotationY={SOUTH} walk={t * 1.7} shirt="#486a94" hat="straw" mood="happy" />
            <ZombieKid position={[0.42, PATH_TOP + hop(t, 0.7, 0.22, 0.3), 0.2 + k * 0.7]} rotationY={SOUTH} walk={t * 2.0} shirt="#548256" mood="happy" wave={0.8} />
            <MumChicken position={[0, PATH_TOP + hop(t, 0.45, 0.16, 0.26), 2.1 - k * 0.7]} rotationY={0.2} walk={t * 2.6} flap={0.65}>
              <Hero position={[0, 0, 0]} mood="happy" wave={1} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "1.chicken",
      ...cam.orbit({ on: [0, 0.95, 1.15], dist: 3.35, distTo: 2.8, yaw: -20, yawTo: 18, pitch: 6, fov: 42 }),
      handheld: 0.018,
      impacts: [{ at: 0.25, amp: 0.035, dur: 0.25 }],
      look: "overworld-night",
      zone: "village",
      note: "Full-body chicken jockey reveal: MumChicken struts forward flapping hard while Hero bounces and waves on her back.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <MumChicken position={[0, PATH_TOP + hop(t, 0.2, 0.18, 0.28), 1.4 - k * 0.5]} rotationY={0.15} walk={t * 2.8} flap={0.95}>
              <Hero position={[0, 0, 0]} mood="happy" wave={1} tilt={Math.sin(t * 10) * 0.12} />
            </MumChicken>
            <Puffs position={[0, PATH_TOP + 0.35, 1.1]} color="#f7f5f0" count={5} spread={0.35} size={0.07} speed={1.2} opacity={0.7} />
          </>
        );
      },
    },
    {
      cue: "1.doors",
      ...cam.push({ on: [-6.5, 1.1, -1.3], dist: 3.9, to: 3.0, yaw: 52, pitch: 8, fov: 42 }),
      handheld: 0.022,
      impacts: [{ at: smashAt, amp: 0.09, dur: 0.42 }],
      look: "overworld-night",
      zone: "village",
      note: "Unobstructed 3/4 side-front angle: big zombie mum sprints up the open porch and smashes straight through the wooden door.",
      stage: (t) => {
        const broken = t >= smashAt;
        const charge = broken ? 1 : ease(ramp(t, 0.05, smashAt));
        const z = -0.15 - charge * 1.55;
        return (
          <>
            <WoodenDoor position={[-6.5, PATH_TOP, -1.9]} broken={broken} />
            <ZombieMum
              position={[-6.5, PATH_TOP + hop(t, smashAt - 0.15, 0.18, 0.25), z]}
              rotationY={NORTH}
              walk={t * 3.0}
              lean={broken ? 0.15 : 0.34}
              armPitch={[-1.65, -1.65]}
              mood="angry"
              shirt="#2d7a78"
              hat="bow"
            />
            <ZombieKid position={[-7.35, PATH_TOP + hop(t, smashAt + 0.1, 0.28, 0.32), -0.6]} rotationY={NORTH + 0.4} mood="happy" armPitch={[-2.6, -2.6]} />
            <Bits position={[-6.5, 1.0, -1.9]} t={t - smashAt} color="#a87542" count={18} power={4.5} toward={[0, 0.4, -1]} />
            {broken && <Puffs position={[-6.5, 0.9, -1.9]} color="#e6d2b5" count={8} spread={0.6} size={0.1} speed={1.6} opacity={0.75} />}
          </>
        );
      },
    },
    {
      cue: "1.egg",
      ...cam.push({ on: [0.05, 0.65, 1.7], dist: 3.2, to: 2.55, yaw: 12, pitch: 18, fov: 42 }),
      handheld: 0.018,
      impacts: [{ at: layAt, amp: 0.045, dur: 0.3 }],
      look: "overworld-night",
      zone: "village",
      note: "Stacked clearly in depth: MumChicken squats left, white egg pops low center, Hero leaps back right groaning.",
      stage: (t) => {
        const laid = t >= layAt;
        const squat = laid ? 0.15 : ease(ramp(t, 0.08, layAt)) * 0.72;
        const hopOff = ease(ramp(t, layAt, layAt + 0.35));
        const eggY = laid ? PATH_TOP + hop(t, layAt, 0.28, 0.3) : PATH_TOP;
        return (
          <>
            <MumChicken position={[-0.36, PATH_TOP, 1.55]} rotationY={0.45} crouch={squat} flap={laid ? 0.65 : 0} />
            {laid && <WhiteEgg position={[0.05, eggY, 1.95]} scale={pop(t, layAt)} wobble={0.8} />}
            {laid && <Puffs position={[0.05, PATH_TOP + 0.15, 1.95]} color="#f7f4eb" count={5} spread={0.35} size={0.07} speed={1.4} opacity={0.75} />}
            <Hero
              position={[0.35 + hopOff * 0.25, PATH_TOP + hop(t, layAt, 0.32, 0.35), 1.65]}
              rotationY={-0.35}
              mood="sad"
              armPitch={[-2.1, -2.1]}
              lean={0.2}
              tilt={Math.sin(t * 9) * 0.12}
            />
            <ZombieKid position={[0.0, PATH_TOP + hop(t, layAt + 0.15, 0.25, 0.3), 0.75]} rotationY={SOUTH} shirt="#548256" mood="happy" armPitch={[-1.4, -0.3]} lookAt={[0.05, 0.3, 1.85]} />
          </>
        );
      },
    },
    {
      cue: "1.corner",
      ...cam.truck({ on: [-2.2, 0.78, 2.0], by: [-1.8, 0, 0], dist: 3.8, yaw: 10, pitch: 10, fov: 42 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "village",
      note: "Unobstructed street tracking shot: Hero and MumChicken run west down the open lane; Hero halts her at the bush.",
      stage: (t) => {
        const reach = ease(ramp(t, 0, Math.max(0.4, stopAt + 0.2)));
        const mx = -1.4 - reach * 1.8;
        const hx = -2.0 - reach * 1.9;
        const stopped = t >= stopAt;
        return (
          <>
            <Hero
              position={[hx, PATH_TOP + hop(t, stopAt, 0.16, 0.25), 2.05]}
              rotationY={stopped ? Math.PI / 2 - 0.3 : -Math.PI / 2 + 0.25}
              walk={stopped ? 0 : t * 2.8}
              mood="scared"
              armPitch={stopped ? [-1.5, -1.5] : undefined}
              lookAt={stopped ? [mx, 0.4, 1.95] : [-5, 0.5, 2.0]}
            />
            <MumChicken
              position={[mx, PATH_TOP, 1.9]}
              rotationY={-Math.PI / 2 + 0.25}
              walk={stopped ? 0 : t * 2.8}
              flap={stopped ? 0.55 : 0}
              headYaw={stopped ? Math.sin(t * 7) * 0.3 : 0}
              lookAt={[hx, 0.55, 2.05]}
            />
          </>
        );
      },
    },
    {
      cue: "1.horse",
      ...cam.orbit({ on: [-1.85, 0.85, 2.0], dist: 3.45, distTo: 2.95, yaw: 20, yawTo: -10, pitch: 8, fov: 42 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "village",
      note: "Clean 3/4 front-angle gag: Hero runs to two kids on the right, HORSE? pops up, MumChicken pops out behind Hero flapping.",
      stage: (t) => {
        const dash = ease(ramp(t, 0, 0.55));
        const jump = t >= horseAt;
        return (
          <>
            <Hero
              position={[-2.55 + dash * 0.5, PATH_TOP, 2.05]}
              rotationY={0.85}
              walk={dash < 0.95 ? t * 2.6 : 0}
              mood="happy"
              armPitch={[-1.4, -0.2]}
              nod={Math.sin(t * 8) * 0.15}
              lookAt={[-1.3, 0.65, 1.95]}
            />
            <ZombieKid position={[-1.35 + hop(t, horseAt, 0.22, 0.3) * 0.4, PATH_TOP + hop(t, horseAt, 0.22, 0.3), 1.85]} rotationY={-0.9} shirt="#3a7d8c" mood={jump ? "scared" : "calm"} tilt={-0.15} />
            <ZombieKid position={[-1.15 + hop(t, horseAt + 0.08, 0.22, 0.3) * 0.4, PATH_TOP + hop(t, horseAt + 0.08, 0.22, 0.3), 2.25]} rotationY={-1.1} shirt="#6e5482" mood={jump ? "scared" : "calm"} tilt={0.15} />
            <MumChicken position={[-2.85 + (jump ? 0.35 : 0), PATH_TOP, 1.75]} rotationY={0.95} flap={jump ? 0.95 : 0.2} peck={Math.sin(t * 10) * 0.25} />
            <Bubble dark text="HORSE?" position={[-1.28, 1.42 + hop(t, horseAt, 0.1, 0.25), 2.0]} rotationY={0.2} scale={0.45 * pop(t, Math.max(0.25, horseAt - 0.15))} />
          </>
        );
      },
    },
  ],
});

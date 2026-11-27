import {
  Bubble,
  DEG,
  EAST,
  EmberDrift,
  Hero,
  MilkBucket,
  MuddyPrints,
  NORTH,
  OakHammer,
  Player,
  PotionSwirl,
  Puffs,
  ROOM_POS,
  SOUTH,
  Torch,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  w,
  walkSegment,
} from "./kit";

/** Scene 3 — Llama hoofprint clue -> Midnight Milk Bucket stealth hunt -> Floating torch & invisible hammer! */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The muddy prints and the floating torch",
  shots: [
    {
      cue: "3.guard",
      ...cam.twoShot({ a: [-1.2, 0, -12.0], b: [1.3, 0, -12.0], facing: NORTH, dist: 6.8, to: 5.5, side: 16, pitch: 8 }),
      zone: "town",
      look: "overworld-day",
      note: "North-facing two-shot: two town guards shrug helplessly on the cobbles as nobody saw who fixed anything.",
      stage: (t) => {
        const guardAt = w("3.guard", "guards");
        return (
          <>
            <Player who={9} position={[-1.2, 0, -12.0]} rotationY={NORTH} animation={t > guardAt ? "shrug" : "idle"} face="uneasy" />
            <Player who={10} position={[1.3, 0, -12.0]} rotationY={NORTH} animation="shrug" face="uneasy" />
            <Hero position={[0.1, 0, -10.2]} rotationY={NORTH} animation="idle" face="calm" />
          </>
        );
      },
    },
    {
      cue: "3.prints",
      ...cam.crane({ on: [0, 0.25, -8.5], onTo: [0, 0.25, -11.5], dist: 5.6, toDist: 4.5, yaw: 18, fromPitch: 34, toPitch: 20, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "High crane pitching down onto fresh muddy llama hoofprints as the kid walks south inspecting the trail toward camera.",
      stage: (t, { dur }) => {
        const printAt = w("3.prints", "prints");
        const step = walkSegment([-1.4, 0, -10.8], [-1.1, 0, -8.8], t, 0, dur, { gait: "walk", endYaw: 25 * DEG });
        return (
          <>
            <MuddyPrints from={[0, 0, -7.2]} to={[0, 0, -12.8]} count={7} />
            <Hero {...step} animDistance={step.animDistance} face={t > printAt ? "surprised" : "wow"} headPitch={0.42} />
          </>
        );
      },
    },
    {
      cue: "3.wait",
      ...cam.front({ actor: [-1.1, 0, -9.0], facing: SOUTH, dist: 5.8, to: 4.5, side: -18, pitch: 5 }),
      zone: "town",
      look: "overworld-day",
      note: "Front push-in on the kid as the realization hits on 'llamas' with a pop bubble overhead.",
      stage: (t) => {
        const llamasAt = w("3.wait", "llamas");
        return (
          <>
            <Hero position={[-1.1, 0, -9.0]} rotationY={SOUTH} animation={t > llamasAt ? "point" : "idle"} face={t > llamasAt ? "surprised" : "wow"} />
            <Bubble text="LLAMAS?!" position={[-1.1, 2.05, -9.0]} scale={pop(t, llamasAt) * 0.72} />
            <MuddyPrints from={[0.5, 0, -7.8]} to={[0.5, 0, -11.0]} count={5} />
          </>
        );
      },
    },
    {
      cue: "4.night",
      ...cam.sweep({ on: on(ROOM_POS, -0.2, 1.0, 0.2), dist: 5.8, distTo: 4.7, fromYaw: 18, toYaw: -18, pitch: 9, fov: 45 }),
      zone: "room",
      look: "lantern-night",
      hud: { clock: "12:00 AM" },
      note: "Cut to midnight inside the room: kid creeps awake toward the door instead of sleeping.",
      stage: (t, { dur }) => {
        const step = walkSegment([-1.1, 0, 0.2], [0.4, 0, 1.4], t, 0.1, dur, { gait: "creep" });
        return (
          <group position={ROOM_POS}>
            <Hero {...step} animDistance={step.animDistance} face="brave" />
          </group>
        );
      },
    },
    {
      cue: "4.milk",
      ...cam.front({ actor: on(ROOM_POS, 0.3, 0, 1.2), facing: SOUTH, dist: 5.4, to: 4.2, side: 16, pitch: 6 }),
      zone: "room",
      look: "lantern-night",
      hud: { clock: "12:02 AM", banner: { text: "MILK BUCKET", color: "#ffffff", sub: "CANCELS INVISIBILITY" } },
      note: "Hero raises a gleaming iron Milk Bucket right in front of camera on 'milk'.",
      stage: (t) => {
        const milkAt = w("4.milk", "milk");
        const lift = ease(ramp(t, milkAt - 0.1, milkAt + 0.35));
        return (
          <group position={ROOM_POS}>
            <Hero position={[0.3, 0, 1.2]} rotationY={SOUTH} animation={t > milkAt ? "reachUp" : "idle"} face="grin" />
            <MilkBucket position={[0.72, 0.85 + lift * 0.45, 1.55]} scale={1.25} />
          </group>
        );
      },
    },
    {
      cue: "4.fact",
      ...cam.frameDuo({ a: on(ROOM_POS, -1.0, 0, 1.2), b: on(ROOM_POS, 1.0, 0, 1.2), fromYaw: -18, toYaw: 16, pitch: 8 }),
      zone: "room",
      look: "lantern-night",
      note: "Visual proof of the vanilla Minecraft mechanic: Milk Bucket splashes onto blue potion swirls and clears them on 'cancels'.",
      stage: (t) => {
        const cancelAt = w("4.fact", "cancels");
        const splash = ramp(t, cancelAt, cancelAt + 0.5);
        return (
          <group position={ROOM_POS}>
            <Hero position={[-1.0, 0, 1.2]} rotationY={EAST} animation={t > cancelAt ? "reach" : "idle"} face="grin" />
            <MilkBucket position={[-0.45, 0.95, 1.2]} rotation={[0, Math.PI / 2, -splash * 0.6]} splash={splash} scale={1.15} />
            <PotionSwirl position={[1.0, 0.95, 1.2]} t={t} intensity={1 - ramp(t, cancelAt + 0.2, cancelAt + 0.55)} />
            {t >= cancelAt + 0.15 ? <Puffs position={[1.0, 1.0, 1.2]} color="#ffffff" /> : null}
          </group>
        );
      },
    },
    {
      cue: "4.sneak",
      ...cam.track({ from: [-1.4, 0, 12.0], to: [-0.2, 0, 8.2], sideDist: 5.8, side: 1, height: 1.5, lead: 1.5, fov: 44 }),
      zone: "night",
      look: "lantern-night",
      hud: { clock: "12:15 AM" },
      note: "Lantern-lit night street: tracking kid creeping stealthily down the blue-lit cobbles carrying his Milk Bucket.",
      stage: (t, { dur }) => {
        const sneak = walkSegment([-1.4, 0, 12.0], [-0.2, 0, 8.2], t, 0, dur, { gait: "creep" });
        return (
          <>
            <Hero {...sneak} animDistance={sneak.animDistance} face="uneasy" />
            <MilkBucket position={[sneak.position[0] + 0.32, 0.72, sneak.position[2] - 0.18]} />
          </>
        );
      },
    },
    {
      cue: "4.track",
      ...cam.track({ from: [0, 0, 6.0], to: [0, 0, 1.2], sideDist: 5.6, side: -1, height: 1.6, lead: 1.8, fov: 45 }),
      zone: "night",
      look: "lantern-night",
      hud: { clock: "12:18 AM" },
      note: "Opposite-side track following the kid along fresh muddy llama tracks straight down the lantern-warm alley.",
      stage: (t, { dur }) => {
        const follow = walkSegment([0.2, 0, 6.0], [0.2, 0, 1.6], t, 0, dur, { gait: "creep" });
        return (
          <>
            <MuddyPrints from={[0, 0, 7.2]} to={[0, 0, -2.2]} count={8} />
            <Hero {...follow} animDistance={follow.animDistance} face="wow" headPitch={0.3} />
            <MilkBucket position={[follow.position[0] + 0.34, 0.72, follow.position[2] - 0.12]} />
          </>
        );
      },
    },
    {
      cue: "4.torch",
      ...cam.heroLow({ on: [0, 0.6, -4.2], dist: 6.2, yaw: 16, fov: 44 }),
      zone: "night",
      look: "lantern-night",
      hud: { clock: "12:20 AM" },
      note: "Hero-low angle on a glowing wooden torch inexplicably hovering in midair surrounded by faint blue potion bubbles.",
      stage: (t) => {
        const floatY = 1.42 + Math.sin(t * 4.5) * 0.1;
        return (
          <>
            <Torch position={[0, floatY, -4.2]} light={4.5} />
            <PotionSwirl position={[0, 1.1, -4.2]} t={t} intensity={0.65} />
            <EmberDrift position={[0, 1.8, -4.2]} count={22} />
            <Hero position={[-1.4, 0, -1.8]} rotationY={152 * DEG} animation="scared" face="surprised" />
          </>
        );
      },
    },
    {
      cue: "4.hammer",
      ...cam.sweep({ on: [-0.8, 1.6, -4.6], dist: 6.4, distTo: 5.1, fromYaw: -22, toYaw: 20, pitch: 4, fov: 44 }),
      zone: "night",
      look: "lantern-night",
      note: "Sweeping past the alley porch as an invisible oak hammer swings on its own, banging sparks off fresh roof planks!",
      stage: (t) => {
        const swing = Math.sin(t * 12) * 0.65;
        return (
          <>
            <Torch position={[0.45, 1.45, -4.3]} light={3.8} />
            <OakHammer position={[-0.4, 1.65, -4.6]} rotation={[swing, 0, 0.35]} scale={1.35} />
            <PotionSwirl position={[-0.2, 1.1, -4.6]} t={t} intensity={0.75} />
            <Puffs position={[-0.6, 1.85, -4.6]} color="#ffe099" />
            <Hero position={[1.4, 0, -2.4]} rotationY={-145 * DEG} animation="idle" face="surprised" />
          </>
        );
      },
    },
  ],
});

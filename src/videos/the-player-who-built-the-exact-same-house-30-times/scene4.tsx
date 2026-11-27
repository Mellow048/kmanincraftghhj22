import {
  DEG,
  EAST,
  FloatingHeart,
  Grandpa,
  LodestoneCompass,
  NORTH,
  OpeningChest,
  Puffs,
  SOUTH,
  SPAWN_POS,
  ServerPlayer,
  SubscribeSign,
  YellowFlower,
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

/** Scene 4 — Tear-jerking payoff: Grandpa logs back in -> Grabs HOME compass -> Follows yellow flowers -> Sees Sam -> 'Found it.' -> Subscribe CTA! */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Found it.",
  shots: [
    {
      cue: "7.join",
      ...cam.front({ actor: on(SPAWN_POS, 0, 0, 6.2), facing: SOUTH, dist: 6.2, to: 4.9, side: -18, pitch: 7 }),
      zone: "spawn",
      look: "overworld-golden",
      hud: {
        clock: "NEXT EVENING",
        chat: [{ text: "Grandpa joined the game", color: "#5ce075" }],
      },
      note: "Warm golden dusk at Spawn: Grandpa spawns back onto the yellow-flower road with a crisp HUD 'Grandpa joined the game' toast!",
      stage: (t) => {
        const joinAt = w("7.join", "logged");
        return (
          <group position={SPAWN_POS}>
            <Grandpa nameTag="Grandpa" position={[0, 0, 6.2]} rotationY={SOUTH} animation={t > joinAt ? "lookAround" : "idle"} face="wow" />
            {t >= joinAt ? <Puffs position={[0, 1.0, 6.2]} color="#fff0b0" /> : null}
          </group>
        );
      },
    },
    {
      cue: "7.open",
      ...cam.sweep({ on: on(SPAWN_POS, 0, 1.25, 5.2), dist: 6.0, distTo: 4.7, fromYaw: 20, toYaw: -18, pitch: 9, fov: 44 }),
      zone: "spawn",
      look: "overworld-golden",
      note: "Grandpa opens the gleaming chest on Spawn road and lifts out the glowing enchanted HOME compass!",
      stage: (t) => {
        const grabAt = w("7.open", "compass");
        const lift = ease(ramp(t, grabAt - 0.15, grabAt + 0.4));
        return (
          <group position={SPAWN_POS}>
            <Grandpa nameTag="Grandpa" position={[-0.9, 0, 5.4]} rotationY={EAST} animation={t > grabAt ? "reachUp" : "reach"} face="grin" />
            <OpeningChest position={[0.45, 0.08, 5.4]} open={ease(ramp(t, 0.05, 0.5))} contents="gold" />
            <LodestoneCompass position={[0.45, 0.85 + lift * 0.75, 5.4]} needleAngle={0} scale={1.15} />
          </group>
        );
      },
    },
    {
      cue: "7.walk",
      ...cam.track({ from: on(SPAWN_POS, 0, 0, 5.6), to: on(SPAWN_POS, 0, 0, 0.4), sideDist: 5.8, side: 1, height: 1.55, lead: 1.6, fov: 44 }),
      zone: "spawn",
      look: "overworld-golden",
      note: "Emotional tracking shot: Grandpa walks forward beaming along the glowing yellow flower path following his spinning compass needle!",
      stage: (t, { dur }) => {
        const walk = walkSegment([0, 0, 5.6], [0, 0, 0.4], t, 0, dur, { gait: "walk", endYaw: NORTH });
        return (
          <group position={SPAWN_POS}>
            <Grandpa nameTag="Grandpa" {...walk} animDistance={walk.animDistance} face="grin" />
            <LodestoneCompass position={[walk.position[0] + 0.38, 1.12, walk.position[2] - 0.35]} needleAngle={0} scale={0.78} />
          </group>
        );
      },
    },
    {
      cue: "7.porch",
      ...cam.front({ actor: on(SPAWN_POS, 0, 0, -1.6), facing: SOUTH, dist: 6.2, to: 4.8, side: 16, pitch: 7 }),
      zone: "spawn",
      look: "overworld-golden",
      note: "Part 1: Right in front of the porch of Grandpa's rebuilt cottage stands Sam, waving wildly with the biggest grin!",
      stage: (t) => (
        <group position={SPAWN_POS}>
          <ServerPlayer role="hero" nameTag="Sam" position={[0, 0, -1.85]} rotationY={SOUTH} animation={t > 0.4 ? "wave" : "cheer"} face="grin" />
          <YellowFlower position={[1.2, 0.06, -1.5]} scale={1.25} glow={0.6} />
        </group>
      ),
    },
    {
      cue: "7.porch",
      cut: 1.25,
      ...cam.frameDuo({ a: on(SPAWN_POS, -0.9, 0, -1.0), b: on(SPAWN_POS, 0.9, 0, -1.85), fromYaw: -20, toYaw: 16, pitch: 8 }),
      zone: "spawn",
      look: "overworld-golden",
      note: "Part 2 (cut): Grandpa hurries the last steps up to Sam in front of the porch as golden hearts start rising!",
      stage: (t, { dur }) => {
        const step = walkSegment([-1.1, 0, 0.4], [-0.8, 0, -1.4], t, 0, dur, { gait: "walk", endYaw: 28 * DEG });
        return (
          <group position={SPAWN_POS}>
            <Grandpa nameTag="Grandpa" {...step} animDistance={step.animDistance} face="grin" />
            <ServerPlayer role="hero" nameTag="Sam" position={[0.9, 0, -1.85]} rotationY={-24 * DEG} animation="wave" face="grin" />
            <FloatingHeart position={[0, 1.5, -1.6]} count={6} />
          </group>
        );
      },
    },
    {
      cue: "7.found",
      ...cam.sweep({ on: on(SPAWN_POS, 0, 1.45, -1.4), dist: 6.4, distTo: 5.0, fromYaw: -20, toYaw: 20, pitch: 8, fov: 44 }),
      zone: "spawn",
      look: "overworld-golden",
      hud: {
        chat: [{ sender: "Grandpa", text: "Found it.", color: "#5ce075" }],
        typing: true,
      },
      note: "TEAR-JERKING CLIMAX: Grandpa & Sam cheer joyfully in front of their porch under floating red hearts as HUD chat types 'Found it.'!",
      stage: () => (
        <group position={SPAWN_POS}>
          <Grandpa nameTag="Grandpa" position={[-0.75, 0, -1.85]} rotationY={24 * DEG} animation="cheer" face="grin" />
          <ServerPlayer role="hero" nameTag="Sam" position={[0.75, 0, -1.85]} rotationY={-24 * DEG} animation="cheer" face="grin" />
          <FloatingHeart position={[0, 1.4, -1.85]} count={12} />
        </group>
      ),
    },
    {
      cue: "7.sub",
      ...cam.sweep({ on: on(SPAWN_POS, 0, 1.4, -1.0), dist: 7.2, distTo: 5.8, fromYaw: 18, toYaw: -18, pitch: 9, fov: 45 }),
      zone: "spawn",
      look: "overworld-day",
      hud: { subscribe: true },
      note: "Warm community Subscribe CTA: Grandpa, Sam, Owner, and the whole SMP cheer beside the yellow flowers with the crisp v7 Subscribed pill!",
      stage: (t) => (
        <group position={SPAWN_POS}>
          <Grandpa nameTag="Grandpa" position={[-0.75, 0, -1.8]} rotationY={10 * DEG} animation="wave" face="grin" />
          <ServerPlayer role="hero" nameTag="Sam" position={[0.75, 0, -1.8]} rotationY={-10 * DEG} animation="wave" face="grin" />
          <ServerPlayer role="owner" crown nameTag="Owner" position={[-2.2, 0, -0.5]} rotationY={22 * DEG} animation="cheer" face="grin" />
          <ServerPlayer role="friendA" position={[2.2, 0, -0.5]} rotationY={-22 * DEG} animation="cheer" face="grin" />
          <LodestoneCompass position={[0, 1.55, -1.65]} needleAngle={Math.sin(t * 4) * 0.2} scale={0.72} />
          <SubscribeSign position={[0, 3.25, -1.8]} scale={pop(t, w("7.sub", "subscribe")) * 0.85} />
          <FloatingHeart position={[0, 1.8, -1.6]} count={8} />
        </group>
      ),
    },
  ],
});

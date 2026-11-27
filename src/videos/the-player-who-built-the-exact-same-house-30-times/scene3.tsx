import {
  ChestGridUI,
  DEG,
  EAST,
  FloatingNumber,
  LodestoneBlock,
  LodestoneCompass,
  NORTH,
  OpeningChest,
  Puffs,
  SOUTH,
  SPAWN_POS,
  ServerPlayer,
  WEST,
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

/** Scene 3 — Dead silent chat -> Owner (!) messages Sam -> Up Happy swells! Server rebuilds at Spawn + Lodestone + HOME Compass! */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The owner's plan and the server rally",
  shots: [
    {
      cue: "5.quiet",
      ...cam.frameDuo({ a: [-1.5, 0, 1.4], b: [1.5, 0, 1.4], fromYaw: -18, toYaw: 18, pitch: 8 }),
      zone: "smp",
      look: "overworld-night",
      hud: {
        clock: "2:48 AM",
        chat: [{ sender: "Grandpa", text: "Sam, I cannot find home.", color: "#ffdd57" }],
      },
      note: "Dead silent SMP plaza under stars: stunned players freeze staring at Grandpa's last chat message.",
      stage: (t) => (
        <>
          <ServerPlayer role="friendA" position={[-1.5, 0, 1.4]} rotationY={15 * DEG} animation={t > 0.6 ? "ache" : "idle"} face="sad" />
          <ServerPlayer role="friendB" position={[1.5, 0, 1.4]} rotationY={-15 * DEG} animation="idle" face="worried" />
        </>
      ),
    },
    {
      cue: "5.owner",
      ...cam.front({ actor: [0, 0, 1.4], facing: SOUTH, dist: 5.8, to: 4.5, side: 16, pitch: 6 }),
      zone: "smp",
      look: "overworld-night",
      hud: {
        chat: [{ sender: "Owner", text: "Sam, tell me what happened.", color: "#7ce8ff", whisper: true }],
        typing: true,
      },
      note: "Server Owner in gold crown steps forward with a clean unobstructed '!' badge whispering directly to Sam in HUD chat.",
      stage: (t) => {
        const msgAt = w("5.owner", "messaged");
        return (
          <ServerPlayer role="owner" crown nameTag="Owner" badge="!" badgePopStart={0.1} position={[0, 0, 1.4]} rotationY={SOUTH} animation={t > msgAt ? "talk" : "idle"} face="calm" />
        );
      },
    },
    {
      cue: "5.told",
      ...cam.frameDuo({ a: [-1.1, 0, 1.4], b: [1.1, 0, 1.4], fromYaw: -18, toYaw: 16, pitch: 7 }),
      zone: "smp",
      look: "overworld-night",
      note: "9:16-safe heartfelt two-shot: Sam wipes his tears telling the Owner everything about Grandpa.",
      stage: (t) => {
        const storyAt = w("5.told", "story");
        return (
          <>
            <ServerPlayer role="hero" nameTag="Sam" position={[-1.1, 0, 1.4]} rotationY={EAST} animation="talk" face="sad" tears={0.7} />
            <ServerPlayer role="owner" crown nameTag="Owner" position={[1.1, 0, 1.4]} rotationY={WEST} animation={t > storyAt ? "reach" : "idle"} face="worried" />
          </>
        );
      },
    },
    {
      cue: "5.idea",
      ...cam.heroLow({ on: [0, 0.5, 1.2], dist: 6.0, yaw: 16, fov: 44 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Golden sunrise breaks: Owner raises a glowing carved Lodestone Block with a giant lightbulb spark!",
      stage: (t) => {
        const blockAt = w("5.idea", "block");
        const lift = ease(ramp(t, blockAt - 0.1, blockAt + 0.4));
        return (
          <>
            <ServerPlayer role="owner" crown nameTag="Owner" position={[0, 0, 1.4]} rotationY={SOUTH} animation={t > blockAt ? "reachUp" : "talk"} face="grin" />
            <LodestoneBlock position={[0.95, 0.7 + lift * 0.55, 1.65]} scale={0.85} />
          </>
        );
      },
    },
    {
      cue: "6.rally",
      ...cam.streetOverview({ from: on(SPAWN_POS, 0, 0, 12.0), to: on(SPAWN_POS, 0, 0, 5.5), on: on(SPAWN_POS, 0, 1.2, 4.0), onTo: on(SPAWN_POS, 0, 1.2, 1.0), height: 6.4, fov: 48 }),
      zone: "spawn",
      look: "overworld-day",
      hud: { clock: "6:00 AM · SPAWN", banner: { text: "THE WHOLE SERVER LOGGED ON", color: "#5ce075" } },
      note: "UP HAPPY SWELLS! Bright sunrise overhead sweep locked onto Spawn Plaza as the ENTIRE server logs on and sprints in!",
      stage: (t, { dur }) => {
        const r1 = walkSegment([-2.2, 0, 9.0], [-1.4, 0, 4.5], t, 0, dur, { gait: "run", endYaw: NORTH });
        const r2 = walkSegment([2.2, 0, 9.2], [1.4, 0, 4.6], t, 0.05, dur, { gait: "run", endYaw: NORTH });
        const r3 = walkSegment([0.2, 0, 10.0], [0.2, 0, 5.5], t, 0.1, dur, { gait: "run", endYaw: NORTH });
        return (
          <group position={SPAWN_POS}>
            <ServerPlayer role="owner" crown nameTag="Owner" position={[0, 0, 1.0]} rotationY={SOUTH} animation="cheer" face="grin" />
            <ServerPlayer role="friendA" {...r1} animDistance={r1.animDistance} face="grin" />
            <ServerPlayer role="friendB" {...r2} animDistance={r2.animDistance} face="grin" />
            <ServerPlayer role="friendC" {...r3} animDistance={r3.animDistance} face="grin" />
          </group>
        );
      },
    },
    {
      cue: "6.build",
      ...cam.sweep({ on: on(SPAWN_POS, 0, 1.8, -4.0), dist: 7.4, distTo: 5.9, fromYaw: -22, toYaw: 20, pitch: 8, fov: 45 }),
      zone: "spawn",
      look: "overworld-day",
      note: "Joyful teamwork at Spawn: players cheer and hammer as Grandpa's iconic Oak Cottage rises right at the center of Spawn!",
      stage: (t) => {
        const spawnAt = w("6.build", "spawn");
        return (
          <group position={SPAWN_POS}>
            <ServerPlayer role="hero" nameTag="Sam" position={[-2.4, 0, -1.2]} rotationY={28 * DEG} animation="cheer" face="grin" />
            <ServerPlayer role="friendA" position={[2.4, 0, -1.2]} rotationY={-28 * DEG} animation="reachUp" face="grin" />
            <ServerPlayer role="friendB" position={[-3.2, 0, -3.5]} rotationY={EAST} animation="cheer" face="grin" />
            {t >= spawnAt ? <Puffs position={[0, 2.4, -3.2]} color="#fff1b8" /> : null}
          </group>
        );
      },
    },
    {
      cue: "6.path",
      ...cam.track({ from: on(SPAWN_POS, -1.4, 0, 7.5), to: on(SPAWN_POS, -1.4, 0, 2.2), sideDist: 5.8, side: -1, height: 1.5, lead: 1.5, fov: 44 }),
      zone: "spawn",
      look: "overworld-day",
      note: "Vibrant lateral track down Spawn road as friends plant glowing yellow Dandelions lining every single step!",
      stage: (t, { dur }) => {
        const w1 = walkSegment([-1.4, 0, 7.5], [-1.4, 0, 2.2], t, 0, dur, { gait: "walk", endYaw: NORTH });
        const w2 = walkSegment([1.4, 0, 6.8], [1.4, 0, 1.5], t, 0.08, dur, { gait: "walk", endYaw: NORTH });
        return (
          <group position={SPAWN_POS}>
            <ServerPlayer role="friendC" {...w1} animDistance={w1.animDistance} face="grin" />
            <ServerPlayer role="friendB" {...w2} animDistance={w2.animDistance} face="grin" />
            <YellowFlower position={[-1.9, 0.06, 4.0]} scale={1.3} glow={0.6} />
          </group>
        );
      },
    },
    {
      cue: "6.lode",
      ...cam.front({ actor: on(SPAWN_POS, -0.3, 0.55, -1.9), facing: SOUTH, dist: 6.2, to: 4.9, side: 12, pitch: 9 }),
      zone: "spawn",
      look: "overworld-day",
      note: "Owner framed cleanly in 9:16 kneeling beside the porch setting the glowing purple-enchanted Lodestone into place!",
      stage: (t) => {
        const lodeAt = w("6.lode", "lodestone");
        const k = pop(t, lodeAt);
        return (
          <group position={SPAWN_POS}>
            <ServerPlayer role="owner" crown nameTag="Owner" position={[-0.95, 0, -1.6]} rotationY={52 * DEG} animation={t > lodeAt ? "cheer" : "crouch"} face="grin" />
            <LodestoneBlock position={[0.5, 0.14, -2.0]} scale={0.7 + k * 0.35} />
            {t >= lodeAt ? <Puffs position={[0.5, 0.8, -2.0]} color="#d49bff" /> : null}
          </group>
        );
      },
    },
    {
      cue: "6.fact",
      ...cam.sweep({ on: on(SPAWN_POS, 0, 1.15, -0.4), dist: 6.4, distTo: 5.2, fromYaw: -14, toYaw: 14, pitch: 8, fov: 45 }),
      zone: "spawn",
      look: "overworld-day",
      note: "Part 1: Crystal-clear Minecraft mechanic showcase — enchanted Lodestone Compass and Lodestone both framed cleanly inside 9:16!",
      stage: (t) => (
        <group position={SPAWN_POS}>
          <LodestoneBlock position={[0.85, 0.14, -0.4]} scale={0.92} />
          <LodestoneCompass position={[-0.78, 1.4, -0.4]} needleAngle={-Math.PI / 2 + Math.sin(t * 9) * 0.08} scale={1.45} />
        </group>
      ),
    },
    {
      cue: "6.fact",
      cut: 1.4,
      ...cam.front({ actor: on(SPAWN_POS, 0, 0.7, -1.0), facing: SOUTH, dist: 5.4, to: 4.2, side: -16, pitch: 6 }),
      zone: "spawn",
      look: "overworld-day",
      hud: { banner: { text: "COMPASS → HOME", color: "#d49bff" } },
      note: "Part 2 (cut): Close-up on the crimson compass needle locking straight toward HOME!",
      stage: (t) => (
        <group position={SPAWN_POS}>
          <LodestoneCompass position={[0, 1.45, -1.0]} needleAngle={Math.sin(t * 5) * 0.06} scale={1.85} />
          <FloatingNumber text="HOME" position={[0, 2.55, -1.0]} color="#ffd84d" height={0.5} />
        </group>
      ),
    },
    {
      cue: "6.chest",
      ...cam.frameDuo({ a: on(SPAWN_POS, -1.6, 0, 1.1), b: on(SPAWN_POS, 1.6, 0, 1.1), fromYaw: -16, toYaw: 18, pitch: 9 }),
      zone: "spawn",
      look: "overworld-day",
      note: "9:16-safe two-shot: OpeningChest lid lifts smoothly revealing glowing ChestGridUI slots filling with HOME compasses from every player!",
      stage: (t) => {
        const chestAt = w("6.chest", "chest");
        const openK = ease(ramp(t, 0.05, 0.55));
        const fill = Math.min(27, Math.floor(6 + ramp(t, 0.1, chestAt + 0.5) * 21));
        return (
          <group position={SPAWN_POS}>
            <OpeningChest position={[0, 0.08, 1.0]} open={openK} contents="gold" scale={1.15} />
            <ChestGridUI title="HOME COMPASSES" filled={fill} itemColor="#c47eff" position={[0, 2.35, 0.6]} scale={0.85} />
            <ServerPlayer role="friendA" position={[-1.6, 0, 1.1]} rotationY={EAST} animation="reach" face="grin" />
            <ServerPlayer role="friendC" position={[1.6, 0, 1.1]} rotationY={WEST} animation="reach" face="grin" />
          </group>
        );
      },
    },
  ],
});

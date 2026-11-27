import {
  Bubble,
  DEG,
  EAST,
  FloatingNumber,
  LodestoneCompass,
  NORTH,
  OakCottage,
  SOUTH,
  SPAWN_POS,
  ServerPlayer,
  WEST,
  YellowFlower,
  cam,
  on,
  pop,
  storyScene,
  timing,
  w,
  walkSegment,
} from "./kit";

/** Scene 1 — Hook (30 identical oak huts) -> Public mislabeling as griefer -> Open-loop compass promise -> Rex's threat! */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Thirty identical oak houses",
  shots: [
    {
      cue: "1.hook",
      ...cam.sweep({ on: [0, 1.4, -0.5], dist: 8.0, distTo: 6.6, fromYaw: -18, toYaw: 16, pitch: 9, fov: 45 }),
      zone: "smp",
      look: "overworld-day",
      hud: { clock: "HOUSE #30", banner: { text: "30 IDENTICAL HUTS", color: "#ffdd57" } },
      note: "Bright daylight Frame-1 hook: Sam placing his 30th identical tiny OakCottage with a bright yellow flower while '30 IDENTICAL HUTS' pops!",
      stage: (t) => {
        const thirtyAt = w("1.hook", "thirty");
        return (
          <>
            <OakCottage position={[0.15, 0, -2.0]} flower />
            <ServerPlayer role="hero" nameTag="Sam" position={[-1.05, 0, 1.25]} rotationY={28 * DEG} animation={t > thirtyAt ? "reach" : "talk"} face="calm" />
            {t >= thirtyAt ? <FloatingNumber text="30 HUTS" position={[0.15, 4.1, -2.0]} color="#ffd84d" height={0.54} /> : null}
          </>
        );
      },
    },
    {
      cue: "1.label",
      ...cam.frameDuo({ a: [-1.4, 0, 2.0], b: [1.5, 0, 2.0], fromYaw: -18, toYaw: 20, pitch: 8 }),
      zone: "smp",
      look: "overworld-day",
      note: "9:16-safe two-shot: players point and jeer at Sam calling him a griefer in bright SMP daylight.",
      stage: (t) => {
        const griefAt = w("1.label", "griefer");
        return (
          <>
            <ServerPlayer role="hero" nameTag="Sam" position={[-1.4, 0, 2.0]} rotationY={EAST} animation="idle" face="sad" />
            <ServerPlayer role="griefer" nameTag="Rex" position={[0.9, 0, 2.0]} rotationY={WEST} animation={t > griefAt ? "point" : "laugh"} face="angry" />
            <ServerPlayer role="friendA" position={[2.0, 0, 1.1]} rotationY={WEST} animation="laugh" face="smug" />
            <Bubble text="GRIEFER!" position={[0.9, 2.55, 2.0]} scale={pop(t, griefAt) * 0.76} />
          </>
        );
      },
    },
    {
      cue: "1.loop",
      ...cam.front({ actor: [0, 0, 2.2], facing: SOUTH, dist: 6.0, to: 4.7, side: -16, pitch: 6 }),
      zone: "smp",
      look: "overworld-day",
      note: "Open-loop Part 1: Server Owner with gold crown reacts with a glowing '!' badge on 'owner'.",
      stage: (t) => (
        <ServerPlayer role="owner" crown nameTag="Owner" badge="!" badgePopStart={0.15} position={[0, 0, 2.2]} rotationY={SOUTH} animation={t > 0.5 ? "point" : "idle"} face="surprised" />
      ),
    },
    {
      cue: "1.loop",
      cut: 1.2,
      ...cam.sweep({ on: on(SPAWN_POS, 0, 1.45, 2.0), dist: 5.6, distTo: 4.4, fromYaw: 18, toYaw: -18, pitch: 7, fov: 44 }),
      zone: "spawn",
      look: "overworld-day",
      note: "Open-loop Part 2 (cut): quick flash-forward of the glowing enchanted Lodestone Compass spinning cleanly!",
      stage: (t) => (
        <group position={SPAWN_POS}>
          <LodestoneCompass position={[0, 1.5, 2.0]} needleAngle={Math.sin(t * 6) * 0.45} scale={1.75} />
          <YellowFlower position={[-1.2, 0.05, 2.2]} scale={1.2} />
          <YellowFlower position={[1.2, 0.05, 2.2]} scale={1.2} />
        </group>
      ),
    },
    {
      cue: "2.rich",
      ...cam.streetOverview({ from: [0, 0, 4.0], to: [0, 0, -4.0], on: [0, 2.0, -10.0], onTo: [0, 2.0, -13.0], height: 7.2, fov: 50 }),
      zone: "smp",
      look: "overworld-day",
      note: "High sweeping overview locked onto the server's towering stone castles and brick mansions on the back hill.",
      stage: (t, { dur }) => {
        const w1 = walkSegment([-1.2, 0, 3.5], [-1.2, 0, -0.5], t, 0, dur, { gait: "walk", endYaw: NORTH });
        return (
          <>
            <ServerPlayer role="friendB" {...w1} animDistance={w1.animDistance} face="grin" />
            <ServerPlayer role="friendC" position={[1.5, 0, -1.5]} rotationY={SOUTH} animation="wave" face="grin" />
          </>
        );
      },
    },
    {
      cue: "2.tiny",
      ...cam.track({ from: [-1.5, 0, 7.2], to: [-1.5, 0, 2.8], sideDist: 6.0, side: 1, height: 1.6, lead: 1.6, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      note: "Tracking down the cobble lane lined with Sam's tiny identical oak huts right beside the grand builds.",
      stage: (t, { dur }) => {
        const walk = walkSegment([-1.5, 0, 7.2], [-1.5, 0, 2.8], t, 0, dur, { gait: "walk", endYaw: NORTH });
        return (
          <>
            <ServerPlayer role="hero" nameTag="Sam" {...walk} animDistance={walk.animDistance} face="calm" />
            <OakCottage position={[2.2, 0, 3.0]} rotationY={WEST} flower />
          </>
        );
      },
    },
    {
      cue: "2.same",
      ...cam.sweep({ on: [0, 1.5, -1.5], dist: 7.4, distTo: 6.0, fromYaw: -20, toYaw: 20, pitch: 10, fov: 46 }),
      zone: "smp",
      look: "overworld-day",
      note: "Part 1: Sweeping past two carbon-copy OakCottages sitting side by side.",
      stage: (t) => (
        <>
          <OakCottage position={[-2.2, 0, -1.8]} flower />
          <OakCottage position={[2.2, 0, -1.8]} flower />
          <ServerPlayer role="friendA" position={[0, 0, 1.5]} rotationY={SOUTH} animation={t > 0.6 ? "shrug" : "idle"} face="uneasy" />
        </>
      ),
    },
    {
      cue: "2.same",
      cut: 1.4,
      ...cam.front({ actor: [0, 0.5, -1.0], facing: SOUTH, dist: 6.2, to: 4.9, side: 16, pitch: 8 }),
      zone: "smp",
      look: "overworld-day",
      note: "Part 2 (cut): Tight front angle on a third identical OakCottage proving every single plank matches!",
      stage: (t) => (
        <>
          <OakCottage position={[0, 0, -2.0]} flower />
          <FloatingNumber text="IDENTICAL" position={[0, 4.0, -2.0]} color="#ffd84d" height={0.44 + (t > 0.4 ? 0.06 : 0)} />
        </>
      ),
    },
    {
      cue: "2.flower",
      ...cam.front({ actor: [0.9, 0.3, 0.4], facing: SOUTH, dist: 5.4, to: 4.0, side: -18, pitch: 12 }),
      zone: "smp",
      look: "overworld-day",
      note: "Tender close push on the bright yellow Dandelion planted neatly outside the cottage door while Sam steps gently beside it.",
      stage: (t) => {
        const flowAt = w("2.flower", "flower");
        return (
          <>
            <OakCottage position={[0, 0, -2.0]} flower />
            <YellowFlower position={[0.9, 0.04, 0.4]} scale={1.35 + pop(t, flowAt) * 0.25} glow={0.65} />
            <ServerPlayer role="hero" nameTag="Sam" position={[-1.4, 0, 0.5]} rotationY={55 * DEG} animation={t > flowAt ? "point" : "crouch"} face="smile" />
          </>
        );
      },
    },
    {
      cue: "2.chat",
      ...cam.frameDuo({ a: [-1.3, 0, 1.4], b: [1.3, 0, 1.4], fromYaw: 18, toYaw: -18, pitch: 8 }),
      zone: "smp",
      look: "overworld-day",
      hud: {
        chat: [
          { sender: "Kai", text: "bro why 30 ugly oak boxes lol", color: "#f2f5fa" },
          { sender: "Milo", text: "ruining the whole server", color: "#ffcf75" },
        ],
        typing: true,
      },
      note: "Crisp 2D Minecraft HUD chat pops mocking messages across the bottom-left while players laugh at Sam.",
      stage: (t) => (
        <>
          <ServerPlayer role="friendA" position={[-1.3, 0, 1.4]} rotationY={20 * DEG} animation={t > 0.55 ? "point" : "laugh"} face="grin" />
          <ServerPlayer role="friendB" position={[1.3, 0, 1.4]} rotationY={-20 * DEG} animation={t > 0.7 ? "laugh" : "talk"} face="grin" />
        </>
      ),
    },
    {
      cue: "2.rex",
      ...cam.front({ actor: [0, 0, 1.6], facing: SOUTH, dist: 5.8, to: 4.5, side: 18, pitch: 6 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Part 1: Rex glares furiously toward camera pointing his fist in threat.",
      stage: (t) => (
        <ServerPlayer role="griefer" nameTag="Rex" position={[0, 0, 1.6]} rotationY={SOUTH} animation={t > 0.5 ? "point" : "talk"} face="angry" />
      ),
    },
    {
      cue: "2.rex",
      cut: 1.45,
      ...cam.sweep({ on: [0, 1.6, 0.4], dist: 6.2, distTo: 4.9, fromYaw: -16, toYaw: 18, pitch: 7, fov: 44 }),
      zone: "smp",
      look: "overworld-golden",
      hud: {
        chat: [{ sender: "Rex", text: "Break them or get banned.", color: "#ff5c52" }],
        typing: true,
      },
      note: "Part 2 (cut): Bold crimson Minecraft HUD chat warning 'Break them or get banned.' slams in while Sam hangs his head!",
      stage: (t) => (
        <ServerPlayer role="hero" nameTag="Sam" position={[0, 0, 1.4]} rotationY={SOUTH} animation={t > 0.5 ? "ache" : "idle"} face="sad" />
      ),
    },
  ],
});

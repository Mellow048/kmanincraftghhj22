import {
  Bubble,
  DEG,
  EAST,
  Hero,
  MilkBucket,
  NORTH,
  OakHammer,
  Player,
  PotionSwirl,
  Puffs,
  RichMerchant,
  SOUTH,
  Torch,
  TraderDad,
  TraderLlama,
  WEST,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  w,
  walkSegment,
} from "./kit";

/** Scene 4 — Milk Bucket splash reveal -> Dad appears soaked with loaded llamas -> Explains the rich merchants. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The milk splash reveal",
  shots: [
    {
      cue: "5.thief",
      ...cam.front({ actor: [1.1, 0, -2.0], facing: NORTH, dist: 5.8, to: 4.5, side: -22, pitch: 6 }),
      zone: "night",
      look: "lantern-night",
      note: "Front reaction push on the kid glaring fiercely at the floating torch and raising his bucket, certain a thief is robbing the carpenter.",
      stage: (t) => {
        const thiefAt = w("5.thief", "thief");
        const lift = ease(ramp(t, thiefAt - 0.1, thiefAt + 0.35));
        return (
          <>
            <Hero position={[1.1, 0, -2.0]} rotationY={NORTH} animation={t > thiefAt ? "point" : "crouch"} face="angry" />
            <MilkBucket position={[1.48, 0.8 + lift * 0.25, -2.2]} scale={1.1} />
            <Torch position={[-0.2, 1.48, -4.6]} light={3.5} />
          </>
        );
      },
    },
    {
      cue: "5.run",
      ...cam.track({ from: [0.9, 0, -1.6], to: [0.3, 0, -3.7], sideDist: 5.8, side: 1, height: 1.5, lead: 1.4, fov: 44 }),
      zone: "night",
      look: "lantern-night",
      note: "Fast tracking sprint: kid charges forward across the lantern-lit alley swinging his Milk Bucket up.",
      stage: (t, { dur }) => {
        const run = walkSegment([0.9, 0, -1.6], [0.3, 0, -3.7], t, 0, dur, { gait: "run" });
        return (
          <>
            <Hero {...run} animDistance={run.animDistance} face="angry" />
            <MilkBucket position={[run.position[0] + 0.25, 0.98, run.position[2] - 0.35]} rotation={[-0.4, 0, 0]} scale={1.15} />
            <Torch position={[-0.2, 1.45, -4.8]} light={3.5} />
          </>
        );
      },
    },
    {
      cue: "5.splash",
      ...cam.sweep({ on: [-0.1, 1.25, -4.5], dist: 6.2, distTo: 4.8, fromYaw: 68, toYaw: 112, pitch: 8, fov: 44 }),
      zone: "night",
      look: "lantern-night",
      note: "Side-axis action sweep: white milk arcs out of the bucket straight onto the floating torch on 'splash'!",
      stage: (t) => {
        const spAt = w("5.splash", "splash");
        const sp = ramp(t, spAt, spAt + 0.55);
        return (
          <>
            <Hero position={[0.25, 0, -3.5]} rotationY={NORTH} animation="reach" face="angry" />
            <MilkBucket position={[0.15, 1.05, -3.85]} rotation={[-0.9 * sp, Math.PI, 0]} splash={sp} scale={1.2} />
            <Torch position={[-0.15, 1.45, -4.75]} light={3.8} />
            {t >= spAt + 0.12 ? <Puffs position={[-0.15, 1.3, -4.75]} color="#ffffff" /> : null}
          </>
        );
      },
    },
    {
      cue: "5.poof",
      ...cam.heroLow({ on: [-0.2, 0.1, -4.8], dist: 6.2, yaw: 14, fov: 44 }),
      zone: "night",
      look: "lantern-night",
      hud: { banner: { text: "IT WAS DAD?!", color: "#7ce8ff" } },
      note: "Dramatic low-angle reveal: blue sparkles explode and Dad pops cleanly back into view, soaking wet with milk, while the kid gasps off-axis!",
      stage: (t) => {
        const popAt = w("5.poof", "dad");
        const vanish = 1 - ease(ramp(t, popAt - 0.15, popAt + 0.3));
        return (
          <>
            <TraderDad position={[-0.2, 0, -4.8]} rotationY={SOUTH} animation="scared" face="surprised" vanish={vanish} milkWet holdingHammer />
            <PotionSwirl position={[-0.2, 1.0, -4.8]} t={t} intensity={1 - ramp(t, popAt, popAt + 0.45)} />
            {t >= popAt - 0.15 ? <Puffs position={[-0.2, 1.1, -4.8]} color="#9beeff" /> : null}
            <Hero position={[-1.95, 0, -3.8]} rotationY={118 * DEG} animation="scared" face="surprised" />
          </>
        );
      },
    },
    {
      cue: "5.llamas",
      ...cam.frameDuo({ a: [-1.7, 0, -5.8], b: [1.5, 0, -5.8], fromYaw: -20, toYaw: 16, pitch: 9 }),
      zone: "night",
      look: "lantern-night",
      note: "9:16-safe wider reveal behind Dad: both loyal llamas stand in the warm lantern glow loaded up with oak planks and warm loaves.",
      stage: (t) => {
        const breadAt = w("5.llamas", "bread");
        return (
          <>
            <TraderLlama position={[-1.7, 0, -5.8]} rotationY={20 * DEG} loaded />
            <TraderLlama position={[1.5, 0, -5.8]} rotationY={-20 * DEG} coat="#c99f72" loaded />
            <TraderDad position={[-0.1, 0, -4.6]} rotationY={SOUTH} animation={t > breadAt ? "shrug" : "idle"} face="uneasy" milkWet />
          </>
        );
      },
    },
    {
      cue: "5.drop",
      ...cam.front({ actor: [-0.2, 0, -4.8], facing: SOUTH, dist: 5.8, to: 4.5, side: 20, pitch: 4 }),
      zone: "night",
      look: "lantern-night",
      note: "Close front push on Dad dripping white milk off his blue hood as his oak hammer drops to the cobbles on 'dropped'.",
      stage: (t) => {
        const dropAt = w("5.drop", "dropped");
        const fall = ease(ramp(t, dropAt, dropAt + 0.32));
        return (
          <>
            <TraderDad position={[-0.2, 0, -4.8]} rotationY={SOUTH} animation="idle" face="uneasy" milkWet />
            <OakHammer position={[0.35, 1.05 * (1 - fall) + 0.08, -4.5]} rotation={[fall * 1.4, 0, fall * 0.6]} />
            <Hero position={[-1.4, 0, -3.5]} rotationY={135 * DEG} animation="idle" face="wow" />
          </>
        );
      },
    },
    {
      cue: "5.shh",
      ...cam.frameDuo({ a: [-0.7, 0, -4.6], b: [0.8, 0, -3.8], fromYaw: 14, toYaw: 30, pitch: 7 }),
      zone: "night",
      look: "lantern-night",
      hud: {
        clock: "8:08 PM",
        chat: [{ sender: "Dad", text: "Shh... I'll tell you everything.", color: "#ffdd57" }],
        typing: true,
      },
      note: "9:16-safe intimate two-shot: Dad leans toward his kid gesturing softly to keep his voice down with crisp HUD dialogue.",
      stage: (t) => {
        const shhAt = w("5.shh", "whispered");
        return (
          <>
            <TraderDad position={[-0.7, 0, -4.6]} rotationY={55 * DEG} animation={t > shhAt ? "point" : "talk"} face="uneasy" milkWet />
            <Hero position={[0.8, 0, -3.8]} rotationY={-125 * DEG} animation="idle" face="wow" />
          </>
        );
      },
    },
    {
      cue: "6.why",
      ...cam.front({ actor: [-0.6, 0, -4.6], facing: EAST, dist: 6.0, to: 4.7, side: 24, pitch: 7 }),
      zone: "night",
      look: "lantern-night",
      note: "Angle turns onto Dad's kind face as he quietly explains why he sells dead bushes all day.",
      stage: (t) => {
        const whyAt = w("6.why", "explained");
        return (
          <>
            <TraderDad position={[-0.6, 0, -4.6]} rotationY={EAST} animation={t > whyAt ? "talk" : "idle"} face={t > whyAt ? "sad" : "calm"} milkWet />
            <Hero position={[1.1, 0, -4.6]} rotationY={WEST} animation={t > whyAt ? "shrug" : "idle"} face="wow" />
          </>
        );
      },
    },
    {
      cue: "6.merch",
      ...cam.sweep({ on: [0, 1.3, 1.0], dist: 6.8, distTo: 5.5, fromYaw: -20, toYaw: 20, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      note: "Quick daylight flashback: two rich merchants shove an honest stall keeper out of the plaza on 'crush'.",
      stage: (t, { dur }) => {
        const shoveAt = w("6.merch", "crush");
        const pushBack = walkSegment([-0.4, 0, 1.0], [-2.2, 0, 1.0], t, shoveAt, dur, { gait: "walk", endYaw: EAST });
        return (
          <>
            <RichMerchant variant={0} position={[0.7, 0, 0.8]} rotationY={WEST} animation="point" face="angry" />
            <RichMerchant variant={1} position={[1.7, 0, 1.4]} rotationY={WEST} animation="point" face="angry" />
            <Player who={11} {...pushBack} animDistance={pushBack.animDistance} face="scared" />
          </>
        );
      },
    },
    {
      cue: "6.act",
      ...cam.front({ actor: [0.8, 0, 5.2], facing: WEST, dist: 6.4, to: 5.1, side: -22, pitch: 8 }),
      zone: "town",
      look: "overworld-day",
      note: "Flashback to Dad's Dead Bush stall: Dad puts on a goofy wave on 'stupid' while a rich merchant laughs off-axis.",
      stage: (t) => {
        const sillyAt = w("6.act", "terrible");
        return (
          <>
            <TraderDad position={[0.8, 0, 5.2]} rotationY={WEST} animation={t > sillyAt ? "wave" : "reach"} face="grin" />
            <RichMerchant variant={0} position={[-1.4, 0, 3.1]} rotationY={52 * DEG} animation={t > sillyAt ? "laugh" : "point"} face="grin" />
          </>
        );
      },
    },
  ],
});

import {
  BakeryDoor,
  DEG,
  EAST,
  Hero,
  LoafPile,
  NORTH,
  Player,
  PotionSwirl,
  RichMerchant,
  SCHOOL_POS,
  SOUTH,
  SubscribeSign,
  TraderDad,
  TraderLlama,
  WEST,
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

/** Scene 5 — Baker overhears -> Whole town lines up to pay 5 emeralds for a dead bush -> Kid wears Dad's blue hood proudly! */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Five emeralds for a dead bush",
  shots: [
    {
      cue: "6.nobody",
      ...cam.track({ from: [-1.4, 0, 4.0], to: [-2.4, 0, -0.5], sideDist: 5.8, side: 1, height: 1.6, lead: 1.6, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "Tracking rich merchants striding straight past Dad's stall without bothering him once.",
      stage: (t, { dur }) => {
        const walk = walkSegment([-1.4, 0, 4.0], [-2.4, 0, -0.5], t, 0, dur, { gait: "walk" });
        return (
          <>
            <RichMerchant variant={0} {...walk} animDistance={walk.animDistance} face="grin" />
            <TraderDad position={[1.0, 0, 5.2]} rotationY={WEST} animation="idle" face="smile" />
          </>
        );
      },
    },
    {
      cue: "6.night",
      ...cam.track({ from: [0.4, 0, 2.0], to: [0.4, 0, -2.5], sideDist: 6.0, side: -1, height: 1.65, lead: 1.6, fov: 44 }),
      zone: "night",
      look: "lantern-night",
      note: "Night montage tracking blue potion sparkles and loaded llamas carrying loaves to doorsteps down the lantern-lit road.",
      stage: (t, { dur }) => {
        const trek = walkSegment([0.4, 0, 2.0], [0.4, 0, -2.5], t, 0, dur, { gait: "walk" });
        return (
          <>
            <PotionSwirl position={[trek.position[0], 1.1, trek.position[2]]} t={t} intensity={0.9} />
            <TraderLlama position={[-1.1, 0, trek.position[2] + 1.1]} rotationY={NORTH} loaded walk={trek.animDistance * 1.1} />
            <TraderLlama position={[1.5, 0, trek.position[2] + 1.4]} rotationY={NORTH} coat="#c99f72" loaded walk={trek.animDistance * 1.1} />
            <LoafPile position={[-2.2, 0, -1.8]} count={10} />
          </>
        );
      },
    },
    {
      cue: "6.door",
      ...cam.sweep({ on: [2.6, 1.35, -10.4], dist: 6.2, distTo: 5.0, fromYaw: -56, toYaw: -36, pitch: 8, fov: 46 }),
      zone: "night",
      look: "lantern-night",
      note: "Lit night Brick Bakery & porch: the actual wooden Bakery front door swings open as the baker steps onto his front porch and freezes seeing Dad!",
      stage: (t, { dur }) => {
        const doorAt = w("6.door", "opened");
        const doorOpen = ease(ramp(t, Math.max(0, doorAt - 0.15), doorAt + 0.4));
        const stepOut = walkSegment([4.75, 0.24, -10.5], [3.65, 0.24, -10.5], t, Math.max(0, doorAt - 0.05), Math.min(dur, doorAt + 0.75), { gait: "walk", endYaw: WEST });
        return (
          <>
            <BakeryDoor position={[5.02, 0.24, -10.5]} rotationY={-Math.PI / 2} open={doorOpen} />
            <Player who={8} {...stepOut} animDistance={stepOut.animDistance} face="wow" />
            <TraderDad position={[0.6, 0, -11.4]} rotationY={110 * DEG} animation="scared" face="surprised" milkWet />
            <Hero position={[-0.35, 0, -10.1]} rotationY={85 * DEG} animation="idle" face="surprised" />
            <TraderLlama position={[-0.8, 0, -12.6]} rotationY={EAST} loaded />
          </>
        );
      },
    },
    {
      cue: "6.saw",
      ...cam.frameDuo({ a: [0.6, 0, -11.4], b: [3.65, 0.24, -10.5], fromYaw: -22, toYaw: 14, pitch: 8 }),
      zone: "night",
      look: "lantern-night",
      note: "9:16-safe reverse two-shot on the lit night Bakery porch (EXACT locked coordinates from 6.door — zero teleport!).",
      stage: (t) => {
        const milkAt = w("6.saw", "milk");
        return (
          <>
            <BakeryDoor position={[5.02, 0.24, -10.5]} rotationY={-Math.PI / 2} open={1} />
            <Player who={8} position={[3.65, 0.24, -10.5]} rotationY={WEST} animation={t > milkAt ? "point" : "idle"} face="wow" />
            <TraderDad position={[0.6, 0, -11.4]} rotationY={110 * DEG} animation={t > milkAt ? "shrug" : "idle"} face="uneasy" milkWet />
            <Hero position={[-0.35, 0, -10.1]} rotationY={85 * DEG} animation="idle" face="uneasy" />
            <TraderLlama position={[-0.8, 0, -12.6]} rotationY={EAST} loaded />
          </>
        );
      },
    },
    {
      cue: "6.quiet",
      ...cam.sweep({ on: [2.1, 1.3, -10.7], dist: 6.2, distTo: 5.0, fromYaw: -58, toYaw: -34, pitch: 8, fov: 45 }),
      zone: "night",
      look: "lantern-night",
      note: "Hushed sweeping beat at the night Bakery porch (EXACT locked coordinates — zero teleport!) as the baker's stunned face softens into a huge grin.",
      stage: (t) => {
        const quietAt = w("6.quiet", "quiet");
        return (
          <>
            <BakeryDoor position={[5.02, 0.24, -10.5]} rotationY={-Math.PI / 2} open={1} />
            <Player who={8} position={[3.65, 0.24, -10.5]} rotationY={WEST} animation={t > quietAt ? "cheer" : "idle"} face={t > quietAt ? "grin" : "wow"} />
            <TraderDad position={[0.6, 0, -11.4]} rotationY={110 * DEG} animation="idle" face={t > quietAt ? "smile" : "uneasy"} milkWet />
            <Hero position={[-0.35, 0, -10.1]} rotationY={85 * DEG} animation="idle" face="grin" />
            <TraderLlama position={[-0.8, 0, -12.6]} rotationY={EAST} loaded />
          </>
        );
      },
    },
    {
      cue: "6.stall",
      ...cam.front({ actor: [0.9, 0, 5.2], facing: WEST, dist: 7.2, to: 5.9, side: 18, pitch: 8, fov: 45 }),
      zone: "town",
      look: "overworld-day",
      hud: { clock: "NEXT MORNING" },
      note: "Bright joyful morning: Dad steps behind his wooden Dead Bush stall expecting another empty day while Kid stands beside him in his yellow hoodie.",
      stage: (t, { dur }) => {
        const step = walkSegment([1.8, 0, 6.6], [0.9, 0, 5.2], t, 0, Math.min(1.0, dur), { gait: "walk", endYaw: WEST });
        return (
          <>
            <TraderDad {...step} animDistance={step.animDistance} face="calm" />
            <Hero position={[0.9, 0, 6.6]} rotationY={WEST} animation="wave" face="grin" />
          </>
        );
      },
    },
    {
      cue: "6.line",
      ...cam.streetOverview({ from: [0, 0, 15.5], to: [0, 0, 7.0], on: [0, 1.2, 5.2], onTo: [0, 1.2, 3.0], height: 6.4, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Grand overhead sweep locked onto the sunlit village street (EXACT locked Dad [0.9, 0, 5.2] & Hero [0.9, 0, 6.6]!): the ENTIRE town lines up!",
      stage: (t, { dur }) => {
        const front = walkSegment([-1.0, 0, 7.0], [-0.95, 0, 5.2], t, 0, dur, { gait: "walk", endYaw: EAST });
        return (
          <>
            <TraderDad position={[0.9, 0, 5.2]} rotationY={WEST} animation="wave" face="wow" />
            <Hero position={[0.9, 0, 6.6]} rotationY={WEST} animation="cheer" face="grin" />
            <Player who={8} {...front} animDistance={front.animDistance} face="grin" />
            <Player who={1} position={[-1.2, 0, 3.6]} rotationY={SOUTH} animation="wave" face="grin" />
            <Player who={2} position={[-1.1, 0, 1.8]} rotationY={SOUTH} animation="cheer" face="grin" />
            <Player who={3} position={[-1.3, 0, -0.2]} rotationY={SOUTH} animation="wave" face="smile" />
            <Player who={4} position={[-1.0, 0, -2.4]} rotationY={SOUTH} animation="cheer" face="grin" />
            <Player who={5} position={[-1.2, 0, -4.6]} rotationY={SOUTH} animation="wave" face="grin" />
          </>
        );
      },
    },
    {
      cue: "6.buy",
      ...cam.frameDuo({ a: [-0.95, 0, 5.2], b: [0.9, 0, 5.2], fromYaw: -20, toYaw: 16, pitch: 8 }),
      zone: "town",
      look: "overworld-day",
      hud: { banner: { text: "+5 EMERALDS!", color: "#5ce075", sub: "WORTH EVERY ONE" } },
      note: "9:16-safe warm front two-shot (EXACT locked Baker [-0.95, 0, 5.2], Dad [0.9, 0, 5.2], Hero [0.9, 0, 6.6] — zero duplicate 3D +5 EM!).",
      stage: (t) => {
        const fiveAt = w("6.buy", "five");
        return (
          <>
            <Player who={8} position={[-0.95, 0, 5.2]} rotationY={EAST} animation={t > fiveAt ? "cheer" : "reach"} face="grin" />
            <TraderDad position={[0.9, 0, 5.2]} rotationY={WEST} animation={t > fiveAt ? "cheer" : "wave"} face="grin" />
            <Hero position={[0.9, 0, 6.6]} rotationY={-30 * DEG} animation="cheer" face="grin" />
          </>
        );
      },
    },
    {
      cue: "6.hood",
      ...cam.track({ from: on(SCHOOL_POS, -1.4, 0, 2.2), to: on(SCHOOL_POS, 1.4, 0, 0.2), sideDist: 6.0, side: 1, height: 1.5, lead: 1.5, fov: 44 }),
      zone: "school",
      look: "overworld-day",
      note: "Triumphant sunlit schoolyard track: kid struts proudly in Dad's royal blue hood as classmates cheer and wave!",
      stage: (t, { dur }) => {
        const strut = walkSegment([-1.4, 0, 2.2], [1.4, 0, 0.2], t, 0, dur, { gait: "walk", endYaw: SOUTH });
        return (
          <group position={SCHOOL_POS}>
            <Hero {...strut} animDistance={strut.animDistance} blueHood face="grin" />
            <Player who={4} position={[-1.8, 0, -0.8]} scale={0.78} rotationY={SOUTH} animation="cheer" face="grin" />
            <Player who={5} position={[1.9, 0, -0.8]} scale={0.78} rotationY={SOUTH} animation="wave" face="grin" />
          </group>
        );
      },
    },
    {
      cue: "6.sub",
      ...cam.sweep({ on: [0, 1.3, 6.2], dist: 6.6, distTo: 5.3, fromYaw: -18, toYaw: 18, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      hud: { subscribe: true },
      note: "Joyful closing button: Kid in Dad's blue hood and Dad wave beside both llamas with the crisp v7 Subscribed pill!",
      stage: (t) => (
        <>
          <Hero position={[-0.95, 0, 6.3]} rotationY={10 * DEG} blueHood animation="wave" face="grin" />
          <TraderDad position={[0.85, 0, 6.0]} rotationY={-10 * DEG} animation="wave" face="grin" />
          <TraderLlama position={[-2.3, 0, 4.8]} rotationY={22 * DEG} />
          <TraderLlama position={[2.3, 0, 4.6]} rotationY={-22 * DEG} coat="#c99f72" />
          <SubscribeSign position={[0, 2.75, 6.0]} scale={pop(t, w("6.sub", "subscribe")) * 0.85} />
        </>
      ),
    },
  ],
});

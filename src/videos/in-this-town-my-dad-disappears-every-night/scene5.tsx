import {
  DEG,
  EAST,
  FloatingNumber,
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
  on,
  pop,
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
      ...cam.front({ actor: [-2.1, 0, -4.6], facing: EAST, dist: 6.2, to: 4.9, side: 20, pitch: 8 }),
      zone: "night",
      look: "lantern-night",
      note: "Cut to the alley doorway: the sick baker steps out onto the cobbles and freezes in shock seeing Dad.",
      stage: (t, { dur }) => {
        const stepOut = walkSegment([-2.5, 0, -4.6], [-1.7, 0, -4.6], t, 0, Math.min(0.9, dur), { gait: "walk", endYaw: EAST });
        return (
          <>
            <Player who={8} {...stepOut} animDistance={stepOut.animDistance} face="wow" />
            <TraderDad position={[0.4, 0, -4.6]} rotationY={WEST} animation="scared" face="surprised" milkWet />
            <Hero position={[0.9, 0, -3.5]} rotationY={WEST} animation="idle" face="surprised" />
          </>
        );
      },
    },
    {
      cue: "6.saw",
      ...cam.frameDuo({ a: [-1.5, 0, -4.6], b: [0.6, 0, -4.6], fromYaw: -20, toYaw: 16, pitch: 8 }),
      zone: "night",
      look: "lantern-night",
      note: "9:16-safe reverse two-shot: baker stares at milk-soaked Dad, the kid, and both bread-loaded llamas behind them.",
      stage: (t) => {
        const breadAt = w("6.saw", "milk");
        return (
          <>
            <Player who={8} position={[-1.5, 0, -4.6]} rotationY={EAST} animation={t > breadAt ? "point" : "idle"} face="wow" />
            <TraderDad position={[0.5, 0, -4.6]} rotationY={WEST} animation={t > breadAt ? "shrug" : "idle"} face="uneasy" milkWet />
            <Hero position={[1.4, 0, -3.9]} rotationY={WEST} animation="idle" face="uneasy" />
            <TraderLlama position={[1.6, 0, -5.9]} rotationY={WEST} loaded />
          </>
        );
      },
    },
    {
      cue: "6.quiet",
      ...cam.sweep({ on: [-0.3, 1.25, -4.6], dist: 6.4, distTo: 5.1, fromYaw: 16, toYaw: -22, pitch: 9, fov: 44 }),
      zone: "night",
      look: "lantern-night",
      note: "Hushed sweeping beat in the quiet alley — then the baker's stunned face softens into a huge warm grin.",
      stage: (t) => {
        const quietAt = w("6.quiet", "quiet");
        return (
          <>
            <Player who={8} position={[-1.4, 0, -4.6]} rotationY={EAST} animation={t > quietAt ? "cheer" : "idle"} face={t > quietAt ? "grin" : "wow"} />
            <TraderDad position={[0.6, 0, -4.6]} rotationY={WEST} animation="idle" face={t > quietAt ? "smile" : "uneasy"} milkWet />
            <Hero position={[1.3, 0, -3.7]} rotationY={WEST} animation="idle" face="grin" />
          </>
        );
      },
    },
    {
      cue: "6.stall",
      ...cam.front({ actor: [0.9, 0, 5.2], facing: WEST, dist: 6.2, to: 4.9, side: 18, pitch: 8 }),
      zone: "town",
      look: "overworld-day",
      hud: { clock: "NEXT MORNING" },
      note: "Bright joyful morning: Dad steps behind his wooden Dead Bush stall expecting another empty day.",
      stage: (t, { dur }) => {
        const step = walkSegment([1.8, 0, 6.6], [0.9, 0, 5.2], t, 0, Math.min(1.0, dur), { gait: "walk", endYaw: WEST });
        return (
          <>
            <TraderDad {...step} animDistance={step.animDistance} face="calm" />
            <Hero position={[0.9, 0, 6.7]} rotationY={WEST} blueHood animation="wave" face="grin" />
          </>
        );
      },
    },
    {
      cue: "6.line",
      ...cam.streetOverview({ from: [0, 0, 15.5], to: [0, 0, 7.0], on: [0, 1.2, 5.2], onTo: [0, 1.2, 3.0], height: 6.4, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Grand overhead sweep locked onto the sunlit village street: the ENTIRE town is lined up eagerly toward Dad's stall!",
      stage: (t, { dur }) => {
        const front = walkSegment([-1.0, 0, 7.0], [-0.9, 0, 5.4], t, 0, dur, { gait: "walk", endYaw: EAST });
        return (
          <>
            <TraderDad position={[0.9, 0, 5.2]} rotationY={WEST} animation="wave" face="wow" />
            <Hero position={[0.9, 0, 6.6]} rotationY={WEST} blueHood animation="cheer" face="grin" />
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
      ...cam.frameDuo({ a: [-0.95, 0, 5.2], b: [0.9, 0, 5.2], fromYaw: -16, toYaw: 18, pitch: 8 }),
      zone: "town",
      look: "overworld-day",
      hud: { banner: { text: "+5 EMERALDS!", color: "#5ce075", sub: "WORTH EVERY ONE" } },
      note: "9:16-safe warm two-shot: the baker happily holds out 5 gleaming emeralds for Dad's dead bush while '+5 EMERALDS!' pops!",
      stage: (t) => {
        const fiveAt = w("6.buy", "five");
        return (
          <>
            <Player who={8} position={[-0.95, 0, 5.2]} rotationY={EAST} animation="reach" face="grin" />
            <TraderDad position={[0.9, 0, 5.2]} rotationY={WEST} animation="wave" face="grin" />
            <Hero position={[0.2, 0, 6.5]} rotationY={NORTH} blueHood animation="cheer" face="grin" />
            {t >= fiveAt ? <FloatingNumber text="+5 EM" position={[0.0, 2.55, 5.2]} color="#5ce075" height={0.48} /> : null}
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

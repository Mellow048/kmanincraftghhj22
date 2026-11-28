import {
  Arrow,
  Balance,
  BarChart,
  Bubble,
  CitizenLead,
  CoinPile,
  DEG,
  EAST,
  EXCHANGE_POS,
  EliteLead,
  EmberDrift,
  FloatingNumber,
  ForgeFurnace,
  SOUTH,
  ShareTicket,
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

/** Scene 4 — Ticket rockets past 30 -> Real life Hope vs Fear balance -> Calm buyers vs Scared sellers -> Seamless Frame-0 Loop! */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Hope, fear, and the seamless loop",
  shots: [
    {
      cue: "6.back",
      ...cam.heroLow({ on: on(EXCHANGE_POS, 0.15, 0.9, -0.8), dist: 7.4, yaw: -12, fov: 45 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "30+ EMERALDS!", color: "#52f081", sub: "BACK ABOVE PEAK" } },
      note: "Triumphant low angle framed cleanly inside 9:16 as the BarChart rockets past 30 emeralds with a giant emerald Arrow shooting skyward!",
      stage: (t) => {
        const thirtyAt = w("6.back", "thirty");
        const k = ease(ramp(t, 0.05, Math.max(0.5, thirtyAt + 0.3)));
        return (
          <group position={EXCHANGE_POS}>
            <BarChart position={[-0.15, 0.14, -1.0]} values={[1.0, 2.2, 0.65, 3.0]} grow={0.35 + k * 0.65} labels={["10", "25", "6", "30+"]} colors={["#37c967", "#37c967", "#ff3b30", "#4ef27c"]} />
            <Arrow position={[2.0, 1.1, -0.8]} dir="up" length={2.1} grow={k} color="#4ef27c" />
          </group>
        );
      },
    },
    {
      cue: "7.real",
      ...cam.sweep({ on: on(EXCHANGE_POS, 0, 1.4, -0.5), dist: 7.0, distTo: 5.6, fromYaw: 22, toYaw: -20, pitch: 9, fov: 44 }),
      zone: "exchange",
      look: "overworld-day",
      note: "Wide sweeping Exchange view: giant golden Balance scale tipping cleanly between Hope and Fear.",
      stage: (t) => {
        const tilt = Math.sin(t * 2.6) * 0.25;
        return (
          <group position={EXCHANGE_POS}>
            <Balance
              position={[0, 0.14, -0.5]}
              tilt={tilt}
              left={<ShareTicket position={[0, 0.28, 0]} scale={0.95} color="#37c967" />}
              right={<CoinPile position={[0, 0.02, 0]} count={10} kind="emerald" />}
            />
            <CitizenLead variant="sam" nameTag="Sam" position={[-2.2, 0, 1.0]} rotationY={32 * DEG} animation="talk" face="calm" />
            <EliteLead variant="tycoon" nameTag="Sterling" position={[2.2, 0, 1.0]} rotationY={-32 * DEG} animation="idle" face="smug" />
          </group>
        );
      },
    },
    {
      cue: "7.hope",
      ...cam.front({ actor: on(EXCHANGE_POS, 0, 0.4, 0.2), facing: SOUTH, dist: 7.2, to: 5.9, side: -16, pitch: 7, fov: 45 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "HOPE = PRICE UP", color: "#5ce075" } },
      note: "Bright green surge: Felint cheers beside a soaring green Arrow as 'HOPE' pops overhead.",
      stage: (t) => {
        const hopeAt = w("7.hope", "hope");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Felint" position={[-0.75, 0, 0.8]} rotationY={SOUTH} animation="cheer" face="grin" />
            <Arrow position={[0.95, 0.8, 0.4]} dir="up" length={1.9} grow={ease(ramp(t, 0.05, 0.55))} color="#4ef27c" />
            {t >= hopeAt ? <FloatingNumber text="HOPE" position={[0.95, 3.0, 0.4]} color="#5ce075" height={0.54} /> : null}
          </group>
        );
      },
    },
    {
      cue: "7.fear",
      ...cam.front({ actor: on(EXCHANGE_POS, 0, 0.4, 0.2), facing: SOUTH, dist: 7.2, to: 5.9, side: 14, pitch: 7, fov: 45 }),
      zone: "exchange",
      look: "overworld-golden",
      hud: { banner: { text: "FEAR = PRICE DOWN", color: "#ff4f42" } },
      note: "Opposite angle crimson drop (clean 9:16 framing): Alex panics beside a plunging red Arrow as 'FEAR' slams in.",
      stage: (t) => {
        const fearAt = w("7.fear", "fear");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="alex" position={[-0.55, 0, 0.8]} rotationY={SOUTH} animation="panic" face="scared" />
            <Arrow position={[0.85, 2.3, 0.4]} dir="down" length={1.9} grow={ease(ramp(t, 0.05, 0.55))} color="#ff3b30" />
            {t >= fearAt ? <FloatingNumber text="FEAR" position={[0.85, 2.9, 0.4]} color="#ff4f42" height={0.54} /> : null}
          </group>
        );
      },
    },
    {
      cue: "7.same",
      ...cam.sweep({ on: [1.5, 1.3, 2.2], dist: 6.6, distTo: 5.3, fromYaw: -68, toYaw: -112, pitch: 8, fov: 44 }),
      zone: "forge",
      look: "overworld-day",
      note: "Back to Sam's forge — steady, warm, unchanged, both furnaces humming smoothly while Sam waves.",
      stage: (t) => {
        const sameAt = w("7.same", "never");
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.4, 0, 2.2]} rotationY={WEST} animation={t > sameAt ? "wave" : "idle"} face="grin" />
            <ForgeFurnace position={[3.25, 0.12, 3.15]} rotationY={WEST} lit />
            <EmberDrift position={[3.0, 1.5, 2.0]} count={18} />
          </>
        );
      },
    },
    {
      cue: "7.calm",
      ...cam.track({ from: on(EXCHANGE_POS, 2.2, 0, 2.2), to: on(EXCHANGE_POS, 0.4, 0, 0.6), sideDist: 5.8, side: -1, height: 1.55, lead: 1.4, fov: 44 }),
      zone: "exchange",
      look: "overworld-day",
      note: "Cool collected track on Sterling strolling casually up to a green discount share ticket.",
      stage: (t, { dur }) => {
        const walk = walkSegment([2.2, 0, 2.2], [0.4, 0, 0.6], t, 0, dur, { gait: "walk", endYaw: SOUTH });
        return (
          <group position={EXCHANGE_POS}>
            <EliteLead variant="tycoon" nameTag="Sterling" {...walk} animDistance={walk.animDistance} face="smug" />
            <ShareTicket position={[-1.1, 1.35, 0.5]} rotationY={20 * DEG} scale={1.15} color="#37c967" />
          </group>
        );
      },
    },
    {
      cue: "7.lose",
      ...cam.frameDuo({ a: on(EXCHANGE_POS, -1.2, 0, 0.8), b: on(EXCHANGE_POS, 1.2, 0, 0.8), fromYaw: -18, toYaw: 18, pitch: 8 }),
      zone: "exchange",
      look: "overworld-golden",
      note: "9:16-safe visual contrast: scared Felint hands his green share ticket straight over to laughing Sterling.",
      stage: (t) => {
        const handAt = w("7.lose", "hand");
        const k = ease(ramp(t, handAt, handAt + 0.45));
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Felint" position={[-1.2, 0, 0.8]} rotationY={EAST} animation="reach" face="frown" />
            <EliteLead variant="tycoon" nameTag="Sterling" position={[1.2, 0, 0.8]} rotationY={WEST} animation="laugh" face="laugh" />
            <ShareTicket position={[-0.45 + k * 0.9, 1.35, 0.85]} scale={0.95} />
          </group>
        );
      },
    },
    {
      cue: "8.ask",
      ...cam.front({ actor: [0.4, 0, 2.2], facing: SOUTH, dist: 7.2, to: 5.9, side: -18, pitch: 8, fov: 45 }),
      zone: "forge",
      look: "overworld-day",
      hud: { banner: { text: "REAL VALUE?", color: "#5ce075" } },
      note: "Debate beat A: Sam standing proudly by his real roaring iron forge with crisp HUD 'REAL VALUE?' prompt.",
      stage: (t) => {
        const makeAt = w("8.ask", "makes");
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.4, 0, 2.2]} rotationY={SOUTH} animation={t > makeAt ? "point" : "talk"} face="grin" />
            <ForgeFurnace position={[3.25, 0.12, 3.15]} rotationY={WEST} lit />
          </>
        );
      },
    },
    {
      cue: "8.or",
      ...cam.sweep({ on: on(EXCHANGE_POS, 0, 1.35, 0.8), dist: 6.8, distTo: 5.5, fromYaw: 20, toYaw: -20, pitch: 9, fov: 44 }),
      zone: "exchange",
      look: "overworld-golden",
      hud: { banner: { text: "OR CROWD MOOD?", color: "#ff9933" } },
      note: "Debate beat B: panicked crowd waving wildly under a crisp 'OR CROWD MOOD?' HUD banner!",
      stage: (t) => {
        const crowdAt = w("8.or", "crowd");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Felint" position={[-1.5, 0, 0.8]} rotationY={15 * DEG} animation={t > crowdAt ? "panic" : "scared"} face="surprised" />
            <CitizenLead variant="maya" nameTag="Maya" position={[0, 0, 0.5]} rotationY={SOUTH} animation={t > crowdAt ? "panic" : "shrug"} face="uneasy" />
            <CitizenLead variant="alex" position={[1.5, 0, 0.9]} rotationY={-15 * DEG} animation="panic" face="scared" />
          </group>
        );
      },
    },
    {
      cue: "8.loop",
      ...cam.sweep({ on: [0, 1.35, 2.0], dist: 7.6, distTo: 8.0, fromYaw: -21, toYaw: -15, pitch: 8, fov: 45 }),
      zone: "forge",
      look: "overworld-day",
      note: "SEAMLESS FRAME-0 LOOP: swings directly into Frame 0's exact Ironworkers' forge square, cast, and ascending chart so 'And that is... The stock market, explained using Minecraft!' loops infinitely!",
      stage: (t) => {
        const k = ease(ramp(t, 0, 0.7));
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.45, 0, 2.1]} rotationY={-12 * DEG} animation="wave" face="grin" />
            <CitizenLead variant="leo" nameTag="Felint" position={[-1.05, 0, 2.6]} rotationY={18 * DEG} animation="cheer" face="grin" />
            <EliteLead variant="tycoon" nameTag="Sterling" position={[1.15, 0, 3.15]} rotationY={-25 * DEG} animation="idle" face="smug" />
            <BarChart position={[-0.45, 0, -0.4]} values={[1.1, 1.6, 2.3, 0.7, 2.8]} grow={0.5 + k * 0.5} colors={["#37c967", "#37c967", "#37c967", "#e84848", "#37c967"]} />
            <ShareTicket position={[-0.48, 1.18, 2.95]} rotationY={15 * DEG} scale={0.82} />
            <EmberDrift position={[2.8, 1.4, 1.0]} count={16} />
          </>
        );
      },
    },
  ],
});

import {
  Arrow,
  BarChart,
  Bubble,
  CitizenLead,
  CoinPile,
  CommandBoard,
  CompareChestPair,
  DEG,
  EAST,
  EXCHANGE_POS,
  EliteLead,
  EmberDrift,
  FloatingNumber,
  ForgeFurnace,
  IronOverflow,
  NORTH,
  OFFICE_POS,
  Pickaxe,
  Puffs,
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

/** Scene 2 — Furnace 2 built -> Iron overflows -> Ticket jumps 10 -> 25 -> Sterling arrives & drops chat rumor -> Panic! */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The boom and Sterling's rumor",
  shots: [
    {
      cue: "2.build",
      ...cam.sweep({ on: [2.2, 1.35, 2.5], dist: 6.6, distTo: 5.3, fromYaw: -76, toYaw: -110, pitch: 8, fov: 45 }),
      zone: "forge",
      look: "overworld-day",
      note: "East-facing sweep on Sam's forge: Sam stands right beside Furnace #2 cheering as it pops cleanly into place on 'builds'!",
      stage: (t) => {
        const buildAt = w("2.build", "builds");
        const k = ease(ramp(t, buildAt, buildAt + 0.4));
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[1.25, 0, 1.65]} rotationY={-55 * DEG} animation={t > buildAt ? "cheer" : "reach"} face="grin" />
            {k > 0.02 ? <ForgeFurnace position={[3.25, 0.12 + (1 - k) * 0.8, 3.15]} rotationY={WEST} lit scale={k} /> : null}
            {t >= buildAt ? <Puffs position={[3.0, 1.2, 3.15]} color="#ffe59e" /> : null}
            <EmberDrift position={[3.1, 1.5, 2.0]} count={20} />
          </>
        );
      },
    },
    {
      cue: "2.iron",
      ...cam.front({ actor: on(EXCHANGE_POS, 0, 0.3, 0.2), facing: SOUTH, dist: 6.4, to: 5.0, side: 16, pitch: 11 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "2X IRON OUTPUT!", color: "#dcefff" } },
      note: "Actual animated overflowing-iron cascade: gleaming silver iron ingots erupt, spill, and tumble continuously out of open chests onto growing piles!",
      stage: (t) => {
        const ironAt = w("2.iron", "iron");
        const burst = 0.55 + ease(ramp(t, ironAt - 0.15, ironAt + 0.4)) * 0.65;
        return (
          <group position={EXCHANGE_POS}>
            <IronOverflow position={[-0.7, 0.14, 0.0]} t={t} burst={burst} scale={1.12} />
            <IronOverflow position={[0.95, 0.14, -0.15]} t={t + 0.42} burst={burst} scale={1.12} />
            <CitizenLead variant="sam" nameTag="Sam" position={[-2.1, 0, 0.9]} rotationY={35 * DEG} animation={t > ironAt ? "cheer" : "point"} face="grin" />
          </group>
        );
      },
    },
    {
      cue: "3.crowd",
      ...cam.track({ from: on(EXCHANGE_POS, -2.6, 0, 4.0), to: on(EXCHANGE_POS, -0.8, 0, 1.2), sideDist: 6.0, side: 1, height: 1.65, lead: 1.6, fov: 45 }),
      zone: "exchange",
      look: "overworld-day",
      note: "Tracking eager townsfolk rushing in from across the square waving emeralds for a share ticket!",
      stage: (t, { dur }) => {
        const w1 = walkSegment([-2.6, 0, 4.0], [-0.8, 0, 1.2], t, 0, dur, { gait: "run", endYaw: NORTH });
        const w2 = walkSegment([2.2, 0, 4.4], [1.1, 0, 1.5], t, 0.1, dur, { gait: "walk", endYaw: NORTH });
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="alex" {...w1} animDistance={w1.animDistance} face="grin" />
            <CitizenLead variant="builder" {...w2} animDistance={w2.animDistance} face="grin" />
            <CitizenLead variant="maya" nameTag="Maya" position={[0.1, 0, -0.5]} rotationY={SOUTH} animation="cheer" face="grin" />
          </group>
        );
      },
    },
    {
      cue: "3.jump",
      ...cam.heroLow({ on: on(EXCHANGE_POS, 0, 0.7, -0.6), dist: 6.6, yaw: -16, fov: 44 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "10 → 25 EMERALDS!", color: "#52f081", sub: "+150% JUMP" } },
      note: "Low dramatic angle on a soaring emerald BarChart shooting from 10 to 25 with a glowing green Arrow!",
      stage: (t) => {
        const jumpAt = w("3.jump", "shoots");
        const k = ease(ramp(t, jumpAt - 0.1, jumpAt + 0.6));
        return (
          <group position={EXCHANGE_POS}>
            <BarChart position={[0, 0.14, -1.0]} values={[1.0, 1.4, 1.9, 2.5]} grow={0.35 + k * 0.65} labels={["10", "15", "20", "25"]} colors={["#37c967", "#37c967", "#37c967", "#52f081"]} />
            <Arrow position={[2.2, 1.1, -0.8]} dir="up" length={1.8} grow={k} color="#4ef27c" />
            {t >= jumpAt ? <FloatingNumber text="25 EM" position={[0.6, 3.3, -1.0]} color="#5ce075" height={0.55} /> : null}
          </group>
        );
      },
    },
    {
      cue: "3.smile",
      ...cam.front({ actor: on(EXCHANGE_POS, 0, 0, 1.0), facing: SOUTH, dist: 5.8, to: 4.5, side: 18, pitch: 7 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "2.5x VALUE!", color: "#ffdd57" } },
      note: "Felint grins beaming beside an untouched iron Pickaxe and a double stack of emeralds (clean top margin under HUD banner).",
      stage: (t) => {
        const dblAt = w("3.smile", "doubled");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Felint" position={[-0.6, 0, 1.0]} rotationY={SOUTH} animation={t > dblAt ? "cheer" : "wave"} face="grin" />
            <Pickaxe position={[1.05, 0.65, 1.1]} rotation={[0, 0, -0.35]} scale={1.15} />
            <CoinPile position={[1.05, 0.14, 0.5]} count={16} kind="emerald" />
          </group>
        );
      },
    },
    {
      cue: "4.rich",
      ...cam.track({ from: [2.8, 0, 4.2], to: [0.4, 0, 1.0], sideDist: 5.8, side: -1, height: 1.6, lead: 1.5, fov: 44 }),
      zone: "forge",
      look: "overworld-golden",
      note: "Dramatic golden-hour track as Sterling strides down the Ironworkers' boulevard in his midnight-navy coat and shiny Top Hat.",
      stage: (t, { dur }) => {
        const walk = walkSegment([2.8, 0, 4.2], [0.4, 0, 1.0], t, 0, dur, { gait: "walk", endYaw: SOUTH });
        return (
          <>
            <EliteLead variant="tycoon" nameTag="Sterling" {...walk} animDistance={walk.animDistance} face="smug" />
            <CitizenLead variant="leo" nameTag="Felint" position={[-1.8, 0, 1.6]} rotationY={EAST} animation="idle" face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "4.cheap",
      ...cam.front({ actor: on(OFFICE_POS, 0, 0, 0.6), facing: SOUTH, dist: 5.6, to: 4.3, side: -16, pitch: 6 }),
      zone: "office",
      look: "overworld-golden",
      note: "Cut inside Sterling's oak-and-gold parlor: Sterling smirks shaking his head at the '25 EM' price tag.",
      stage: (t) => {
        const notAt = w("4.cheap", "not");
        return (
          <group position={OFFICE_POS}>
            <EliteLead variant="tycoon" nameTag="Sterling" position={[-0.6, 0, 0.6]} rotationY={SOUTH} animation={t > notAt ? "shrug" : "talk"} face="smug" />
            <ShareTicket position={[1.0, 1.35, 0.6]} rotationY={-18 * DEG} scale={1.15} color="#ffd84d" />
            {t >= notAt ? <FloatingNumber text="NOPE" position={[1.0, 2.15, 0.6]} color="#ff4f42" height={0.44} /> : null}
          </group>
        );
      },
    },
    {
      cue: "4.type",
      ...cam.sweep({ on: on(OFFICE_POS, 0, 1.4, -0.4), dist: 6.4, distTo: 5.1, fromYaw: -16, toYaw: 16, pitch: 8, fov: 45 }),
      zone: "office",
      look: "overworld-golden",
      note: "Sterling framed cleanly inside 9:16 leaning toward his floating CommandBoard typing a sneaky rumor into global server chat.",
      stage: (t) => {
        const typeAt = w("4.type", "types");
        const prog = ramp(t, typeAt, typeAt + 0.85);
        return (
          <group position={OFFICE_POS}>
            <EliteLead variant="tycoon" nameTag="Sterling" position={[-0.85, 0, 0.5]} rotationY={48 * DEG} animation="press" face="smug" />
            <CommandBoard lines={["/say Rumor...", "Sam's mine..."]} progress={prog} position={[0.6, 1.55, -0.75]} width={2.6} />
          </group>
        );
      },
    },
    {
      cue: "4.rumor",
      ...cam.front({ actor: on(OFFICE_POS, 0, 0, 0.4), facing: SOUTH, dist: 5.8, to: 4.6, side: 8, pitch: 6 }),
      zone: "office",
      look: "overworld-golden",
      hud: { chat: [{ sender: "Sterling", text: "Heard Sam's mine ran dry!", color: "#ff6b63" }], typing: true },
      note: "Crisp horizontal Minecraft HUD chat pops Sterling's fake rumor across the screen while Sterling bursts out laughing (`face='laugh'`)!",
      stage: (t) => {
        const dryAt = w("4.rumor", "dry");
        return (
          <group position={OFFICE_POS}>
            <EliteLead variant="tycoon" nameTag="Sterling" position={[0.0, 0, 0.5]} rotationY={10 * DEG} animation={t > dryAt ? "laugh" : "point"} face={t > dryAt ? "laugh" : "grin"} />
          </group>
        );
      },
    },
    {
      cue: "4.check",
      ...cam.frameDuo({ a: [-1.0, 0, 2.2], b: [2.2, 0, 2.2], fromYaw: -20, toYaw: 16, pitch: 8 }),
      zone: "forge",
      look: "overworld-day",
      note: "9:16-safe angle outside Sam's roaring forge: Sam waves cheerfully beside hot glowing furnaces, yet nobody even walks over to look!",
      stage: (t) => {
        const checkAt = w("4.check", "check");
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.5, 0, 2.2]} rotationY={SOUTH} animation={t > checkAt ? "shrug" : "wave"} face="wow" />
            <ForgeFurnace position={[3.25, 0.12, 3.15]} rotationY={WEST} lit />
            <EmberDrift position={[3.0, 1.5, 2.0]} count={18} />
            <Bubble text="IM FINE!" position={[0.5, 2.55, 2.2]} scale={pop(t, checkAt) * 0.72} />
          </>
        );
      },
    },
    {
      cue: "4.panic",
      ...cam.sweep({ on: on(EXCHANGE_POS, 0, 1.3, 0.8), dist: 6.8, distTo: 5.5, fromYaw: 20, toYaw: -22, pitch: 9, fov: 45 }),
      zone: "exchange",
      look: "overworld-golden",
      hud: { banner: { text: "SELL!! SELL!!", color: "#ff4f42", sub: "TOWN-WIDE PANIC" } },
      note: "Instant panic erupts across Exchange Plaza with crisp red HUD alert: Felint, Maya, and Alex throw their hands up in terror!",
      stage: (t) => {
        const panAt = w("4.panic", "panics");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Felint" position={[-1.6, 0, 0.8]} rotationY={15 * DEG} animation={t > panAt ? "panic" : "scared"} face="scared" />
            <CitizenLead variant="maya" nameTag="Maya" position={[0.0, 0, 0.5]} rotationY={SOUTH} animation="panic" face="surprised" />
            <CitizenLead variant="alex" position={[1.6, 0, 1.0]} rotationY={-18 * DEG} animation="panic" face="scared" />
          </group>
        );
      },
    },
  ],
});

import {
  Arrow,
  CitizenLead,
  CoinPile,
  CrashChart,
  DEG,
  EAST,
  EXCHANGE_POS,
  EliteLead,
  EmberDrift,
  FloatingNumber,
  ForgeFurnace,
  IronOverflow,
  OFFICE_POS,
  SOUTH,
  ShareTicket,
  WEST,
  cam,
  ease,
  on,
  ramp,
  storyScene,
  timing,
  w,
  walkSegment,
} from "./kit";

/** Scene 3 — Panic dump -> Chart crashes to 6 -> Sterling scoops up every cheap ticket -> Next dawn: Forge never broke! */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The crash and the morning truth",
  shots: [
    {
      cue: "5.dump",
      ...cam.track({ from: on(EXCHANGE_POS, -2.4, 0, 0.8), to: on(EXCHANGE_POS, 1.8, 0, 0.8), sideDist: 7.2, side: 1, height: 1.75, lead: 1.5, fov: 47 }),
      zone: "exchange",
      look: "overworld-day",
      note: "Fast lateral track as panicking traders sprint across the plaza flinging their green share tickets away!",
      stage: (t, { dur }) => {
        const r1 = walkSegment([-2.4, 0, 0.6], [1.6, 0, 0.6], t, 0, dur, { gait: "run", endYaw: EAST });
        const r2 = walkSegment([-1.6, 0, 1.9], [2.4, 0, 1.9], t, 0.08, dur, { gait: "run", endYaw: EAST });
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="alex" {...r1} animDistance={r1.animDistance} face="scared" />
            <CitizenLead variant="maya" nameTag="Maya" {...r2} animDistance={r2.animDistance} face="surprised" />
            <ShareTicket position={[0.2, 1.6 - t * 0.4, 1.2]} rotation={[0.4, t * 3, 0.5]} color="#e84848" />
          </group>
        );
      },
    },
    {
      cue: "5.crash",
      ...cam.heroLow({ on: on(EXCHANGE_POS, 0.15, 0.9, -0.8), dist: 8.2, yaw: 10, fov: 48 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "CRASH: 25 → 6 EMERALDS!", color: "#ff4f42", sub: "PANIC SELLING" } },
      note: "REAL CRASHING CHART: the tall green 25 bar VIOLENTLY PLUMMETS DOWNWARD to 6 while turning crimson red and ticking 25 -> 19 -> 12 -> 6!",
      stage: (t) => {
        const crAt = w("5.crash", "crashes");
        const k = ease(ramp(t, crAt - 0.12, crAt + 0.65));
        return (
          <group position={EXCHANGE_POS}>
            <CrashChart position={[-0.2, 0.14, -1.0]} crash={k} />
            <Arrow position={[2.25, 2.5 - k * 0.45, -0.9]} dir="down" length={1.85} grow={0.15 + k * 0.85} color="#ff3b30" />
          </group>
        );
      },
    },
    {
      cue: "5.leo",
      ...cam.front({ actor: on(EXCHANGE_POS, 0, 0, 0.9), facing: SOUTH, dist: 6.8, to: 5.5, side: -18, pitch: 7, fov: 46 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "-4 EMERALDS LOST", color: "#ff5c52" } },
      note: "Front push on Felint wincing in panic as he sells his ticket at a painful -4 EM loss.",
      stage: (t) => {
        const lossAt = w("5.leo", "loss");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Felint" position={[-0.6, 0, 0.9]} rotationY={SOUTH} animation={t > lossAt ? "ache" : "panic"} face="frown" />
            <ShareTicket position={[0.9, 1.25 - ramp(t, lossAt, lossAt + 0.4) * 0.4, 0.9]} rotation={[0.2, -0.3, -0.3]} color="#ff4f42" />
            {t >= lossAt ? <FloatingNumber text="-4 EM" position={[-0.6, 2.55, 0.9]} color="#ff4f42" height={0.48} /> : null}
          </group>
        );
      },
    },
    {
      cue: "5.floor",
      ...cam.track({ from: on(EXCHANGE_POS, 2.4, 0, 2.4), to: on(EXCHANGE_POS, 0.0, 0, 0.4), sideDist: 5.8, side: -1, height: 1.5, lead: 1.5, fov: 44 }),
      zone: "exchange",
      look: "overworld-golden",
      note: "Smooth sneaky track following Sterling calmly walking in across the scattered tickets scooping them right off the cobbles.",
      stage: (t, { dur }) => {
        const walk = walkSegment([2.4, 0, 2.4], [0.0, 0, 0.4], t, 0, dur, { gait: "walk", endYaw: SOUTH });
        return (
          <group position={EXCHANGE_POS}>
            <EliteLead variant="tycoon" nameTag="Sterling" {...walk} animDistance={walk.animDistance} face="grin" />
            <ShareTicket position={[-1.0, 0.35, 0.4]} rotation={[1.3, 0.4, 0]} scale={0.85} />
            <ShareTicket position={[0.8, 0.35, -0.4]} rotation={[1.3, -0.5, 0]} scale={0.85} />
            <ShareTicket position={[-0.3, 0.35, -0.9]} rotation={[1.3, 0.9, 0]} scale={0.85} />
          </group>
        );
      },
    },
    {
      cue: "5.grin",
      ...cam.front({ actor: on(OFFICE_POS, 0, 0, 0.6), facing: SOUTH, dist: 6.4, to: 5.2, side: 14, pitch: 5, fov: 45 }),
      zone: "office",
      look: "overworld-golden",
      note: "Close villain reveal on Sterling visibly LAUGHING & GRINNING WIDE (`face='laugh'`) under his shiny Top Hat holding green share tickets!",
      stage: (t) => {
        const grinAt = w("5.grin", "grinning");
        return (
          <group position={OFFICE_POS}>
            <EliteLead variant="tycoon" nameTag="Sterling" position={[0, 0, 0.6]} rotationY={SOUTH} animation={t > grinAt ? "laugh" : "cheer"} face="laugh" />
            <ShareTicket position={[-0.75, 1.35, 1.0]} rotation={[0, 0.2, 0.25]} scale={0.85} />
            <ShareTicket position={[0.75, 1.35, 1.0]} rotation={[0, -0.2, -0.25]} scale={0.85} />
            <CoinPile position={[0, 0.1, 1.35]} count={16} kind="emerald" />
          </group>
        );
      },
    },
    {
      cue: "6.dawn",
      ...cam.track({ from: [-1.4, 0, 6.2], to: [-0.8, 0, 2.4], sideDist: 5.6, side: -1, height: 1.6, lead: 1.6, fov: 44 }),
      zone: "forge",
      look: "overworld-day",
      hud: { clock: "NEXT MORNING" },
      note: "Bright crisp morning return: Felint and Maya walk past Sam's forge along the stone boulevard and stop short in total disbelief!",
      stage: (t, { dur }) => {
        const lWalk = walkSegment([-1.4, 0, 6.2], [-0.8, 0, 2.4], t, 0, dur, { gait: "walk", endYaw: EAST });
        const mWalk = walkSegment([-2.4, 0, 7.0], [-1.9, 0, 3.3], t, 0.08, dur, { gait: "walk", endYaw: EAST });
        return (
          <>
            <CitizenLead variant="leo" nameTag="Felint" {...lWalk} animDistance={lWalk.animDistance} face="surprised" />
            <CitizenLead variant="maya" nameTag="Maya" {...mWalk} animDistance={mWalk.animDistance} face="wow" />
            <ForgeFurnace position={[3.25, 0.12, 3.15]} rotationY={WEST} lit />
            <EmberDrift position={[3.0, 1.6, 2.0]} count={20} />
          </>
        );
      },
    },
    {
      cue: "6.hot",
      ...cam.sweep({ on: [2.6, 1.3, 2.2], dist: 6.4, distTo: 5.0, fromYaw: -68, toYaw: -112, pitch: 8, fov: 44 }),
      zone: "forge",
      look: "overworld-day",
      note: "Sweep across BOTH blazing-orange furnaces roaring at full blast while Sam waves off-axis beside them!",
      stage: (t) => {
        const hotAt = w("6.hot", "roaring");
        return (
          <>
            <ForgeFurnace position={[3.25, 0.12, 3.15]} rotationY={WEST} lit />
            <CitizenLead variant="sam" nameTag="Sam" position={[0.4, 0, 0.1]} rotationY={WEST} animation={t > hotAt ? "wave" : "idle"} face="grin" />
            <EmberDrift position={[3.0, 1.5, 1.0]} count={18} />
            <EmberDrift position={[3.0, 1.5, 3.1]} count={18} />
          </>
        );
      },
    },
    {
      cue: "6.full",
      ...cam.frameDuo({ a: on(EXCHANGE_POS, -1.3, 0, 0.4), b: on(EXCHANGE_POS, 1.3, 0, 0.4), fromYaw: -18, toYaw: 18, pitch: 12 }),
      zone: "exchange",
      look: "overworld-day",
      note: "9:16-safe view: twin overflowing chests still bursting with bright silver iron ingots while Felint drops his jaw.",
      stage: (t) => {
        const fullAt = w("6.full", "packed");
        return (
          <group position={EXCHANGE_POS}>
            <IronOverflow position={[-1.05, 0.14, -0.35]} t={t} burst={0.85} scale={1.05} />
            <IronOverflow position={[1.05, 0.14, -0.35]} t={t + 0.5} burst={0.85} scale={1.05} />
            <CitizenLead variant="leo" nameTag="Felint" position={[0, 0, 1.15]} rotationY={SOUTH} animation={t > fullAt ? "scared" : "idle"} face="surprised" />
          </group>
        );
      },
    },
    {
      cue: "6.truth",
      ...cam.front({ actor: [0.4, 0, 2.2], facing: WEST, dist: 7.2, to: 5.9, side: -20, pitch: 7, fov: 45 }),
      zone: "forge",
      look: "overworld-day",
      hud: { banner: { text: "FORGE: 100% FINE!", color: "#5ce075" } },
      note: "Clear visual proof at Sam's forge: Sam pats his roaring workshop cleanly under the FORGE: 100% FINE! HUD banner (no duplicate 3D overlap).",
      stage: (t) => {
        const neverAt = w("6.truth", "never");
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.4, 0, 2.2]} rotationY={WEST} animation={t > neverAt ? "cheer" : "point"} face="grin" />
            <ForgeFurnace position={[3.25, 0.12, 3.15]} rotationY={WEST} lit />
            <EmberDrift position={[3.0, 1.5, 2.2]} count={18} />
          </>
        );
      },
    },
    {
      cue: "6.feel",
      ...cam.frameDuo({ a: on(EXCHANGE_POS, -1.1, 0, 0.8), b: on(EXCHANGE_POS, 1.1, 0, 0.8), fromYaw: -20, toYaw: 16, pitch: 8 }),
      zone: "exchange",
      look: "overworld-day",
      note: "9:16-safe emotional contrast: Felint and Maya wince in regret as a glowing 'PANIC!' badge pops over their heads.",
      stage: (t) => {
        const feelAt = w("6.feel", "feelings");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Felint" position={[-1.1, 0, 0.8]} rotationY={15 * DEG} animation={t > feelAt ? "ache" : "shrug"} face="frown" />
            <CitizenLead variant="maya" nameTag="Maya" position={[1.1, 0, 0.8]} rotationY={-15 * DEG} animation="shrug" face="uneasy" />
            {t >= feelAt ? <FloatingNumber text="PANIC!" position={[0, 2.45, 0.8]} color="#ff4f42" height={0.48} /> : null}
          </group>
        );
      },
    },
  ],
});

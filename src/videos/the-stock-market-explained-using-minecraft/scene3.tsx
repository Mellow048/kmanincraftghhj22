import {
  Arrow,
  BarChart,
  CitizenLead,
  CoinPile,
  CompareChestPair,
  DEG,
  EAST,
  EXCHANGE_POS,
  EliteLead,
  EmberDrift,
  FloatingNumber,
  ForgeFurnace,
  IngotStack,
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
      ...cam.track({ from: on(EXCHANGE_POS, -2.4, 0, 0.8), to: on(EXCHANGE_POS, 1.8, 0, 0.8), sideDist: 6.2, side: 1, height: 1.6, lead: 1.5, fov: 44 }),
      zone: "exchange",
      look: "overworld-golden",
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
      ...cam.heroLow({ on: on(EXCHANGE_POS, 0, 0.7, -0.8), dist: 6.8, yaw: 14, fov: 44 }),
      zone: "exchange",
      look: "overworld-golden",
      hud: { banner: { text: "CRASH: 6 EMERALDS!", color: "#ff4f42", sub: "PANIC SELLING" } },
      note: "Dramatic crash shot: tall green bars plunge into a bright red '6' bar with a slamming red downward Arrow!",
      stage: (t) => {
        const crAt = w("5.crash", "crashes");
        const k = ease(ramp(t, crAt - 0.1, crAt + 0.55));
        return (
          <group position={EXCHANGE_POS}>
            <BarChart position={[0, 0.14, -1.0]} values={[2.5, 2.0, 1.2, 0.65]} grow={0.4 + k * 0.6} labels={["25", "19", "12", "6"]} colors={["#37c967", "#e8a838", "#e85d38", "#ff3b30"]} />
            <Arrow position={[2.2, 2.3, -0.8]} dir="down" length={1.8} grow={k} color="#ff3b30" />
          </group>
        );
      },
    },
    {
      cue: "5.leo",
      ...cam.front({ actor: on(EXCHANGE_POS, 0, 0, 0.9), facing: SOUTH, dist: 5.8, to: 4.5, side: -18, pitch: 7 }),
      zone: "exchange",
      look: "overworld-golden",
      hud: { banner: { text: "-4 EMERALDS LOST", color: "#ff5c52" } },
      note: "Front push on Leo wincing in panic as he hands away his ticket for a tiny '-4 EM' loss.",
      stage: (t) => {
        const lossAt = w("5.leo", "loss");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Leo" position={[-0.6, 0, 0.9]} rotationY={SOUTH} animation={t > lossAt ? "ache" : "panic"} face="sad" />
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
            <EliteLead variant="tycoon" nameTag="Sterling" {...walk} animDistance={walk.animDistance} face="smug" />
            <ShareTicket position={[-1.0, 0.35, 0.4]} rotation={[1.3, 0.4, 0]} scale={0.85} />
            <ShareTicket position={[0.8, 0.35, -0.4]} rotation={[1.3, -0.5, 0]} scale={0.85} />
            <ShareTicket position={[-0.3, 0.35, -0.9]} rotation={[1.3, 0.9, 0]} scale={0.85} />
          </group>
        );
      },
    },
    {
      cue: "5.grin",
      ...cam.front({ actor: on(OFFICE_POS, 0, 0, 0.6), facing: SOUTH, dist: 5.4, to: 4.2, side: 16, pitch: 5 }),
      zone: "office",
      look: "overworld-golden",
      note: "Close villain reveal on Sterling holding a huge fan of green share tickets grinning right under his shiny Top Hat!",
      stage: (t) => {
        const grinAt = w("5.grin", "grinning");
        return (
          <group position={OFFICE_POS}>
            <EliteLead variant="tycoon" nameTag="Sterling" position={[0, 0, 0.6]} rotationY={SOUTH} animation={t > grinAt ? "laugh" : "cheer"} face="smug" />
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
      note: "Bright crisp morning return: Leo and Maya walk past Sam's forge along the open street side and stop short in total disbelief!",
      stage: (t, { dur }) => {
        const lWalk = walkSegment([-1.4, 0, 6.2], [-0.8, 0, 2.4], t, 0, dur, { gait: "walk", endYaw: EAST });
        const mWalk = walkSegment([-2.4, 0, 7.0], [-1.9, 0, 3.3], t, 0.08, dur, { gait: "walk", endYaw: EAST });
        return (
          <>
            <CitizenLead variant="leo" nameTag="Leo" {...lWalk} animDistance={lWalk.animDistance} face="surprised" />
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
      ...cam.frameDuo({ a: on(EXCHANGE_POS, -1.4, 0, 0.4), b: on(EXCHANGE_POS, 1.4, 0, 0.4), fromYaw: -18, toYaw: 18, pitch: 12 }),
      zone: "exchange",
      look: "overworld-day",
      note: "9:16-safe view: twin gleaming chests packed wall-to-wall with bright iron ingots while Leo drops his jaw.",
      stage: (t) => {
        const fullAt = w("6.full", "packed");
        return (
          <group position={EXCHANGE_POS}>
            <CompareChestPair position={[0, 0.14, -0.4]} leftLabel="CHEST 1" rightLabel="CHEST 2" leftCount={16} rightCount={16} />
            <IngotStack position={[-1.4, 0.16, 0.9]} count={10} />
            <IngotStack position={[1.4, 0.16, 0.9]} count={10} />
            <CitizenLead variant="leo" nameTag="Leo" position={[0, 0, 1.2]} rotationY={SOUTH} animation={t > fullAt ? "scared" : "idle"} face="surprised" />
          </group>
        );
      },
    },
    {
      cue: "6.truth",
      ...cam.front({ actor: [0.4, 0, 2.2], facing: WEST, dist: 6.2, to: 4.9, side: -20, pitch: 7 }),
      zone: "forge",
      look: "overworld-day",
      hud: { banner: { text: "FORGE: 100% FINE!", color: "#5ce075" } },
      note: "Clear visual proof at Sam's forge: Sam pats his roaring workshop — '100% OK' pops brightly overhead!",
      stage: (t) => {
        const neverAt = w("6.truth", "never");
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.4, 0, 2.2]} rotationY={WEST} animation={t > neverAt ? "cheer" : "point"} face="grin" />
            <ForgeFurnace position={[3.25, 0.12, 3.15]} rotationY={WEST} lit />
            {t >= neverAt ? <FloatingNumber text="100% OK" position={[1.6, 2.8, 2.2]} color="#5ce075" height={0.48} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.feel",
      ...cam.frameDuo({ a: on(EXCHANGE_POS, -1.1, 0, 0.8), b: on(EXCHANGE_POS, 1.1, 0, 0.8), fromYaw: -20, toYaw: 16, pitch: 8 }),
      zone: "exchange",
      look: "overworld-day",
      note: "9:16-safe emotional contrast: Leo and Maya facepalm in regret as a glowing 'PANIC!' badge pops over their heads.",
      stage: (t) => {
        const feelAt = w("6.feel", "feelings");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Leo" position={[-1.1, 0, 0.8]} rotationY={15 * DEG} animation={t > feelAt ? "ache" : "shrug"} face="sad" />
            <CitizenLead variant="maya" nameTag="Maya" position={[1.1, 0, 0.8]} rotationY={-15 * DEG} animation="shrug" face="uneasy" />
            {t >= feelAt ? <FloatingNumber text="PANIC!" position={[0, 2.45, 0.8]} color="#ff4f42" height={0.48} /> : null}
          </group>
        );
      },
    },
  ],
});

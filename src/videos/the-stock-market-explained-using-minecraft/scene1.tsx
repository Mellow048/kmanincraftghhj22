import {
  Arrow,
  BarChart,
  Bubble,
  Chest,
  CitizenLead,
  CoinPile,
  DEG,
  EAST,
  EXCHANGE_POS,
  EliteLead,
  EmberDrift,
  FloatingNumber,
  ForgeFurnace,
  IngotStack,
  PriceBillboard,
  PriceTag,
  SOUTH,
  ShareFan,
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

/** Scene 1 — Hook -> Meet Sam at his forge -> Needs 100 emeralds -> Splits into 10 share tickets -> Leo & Maya buy! */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Sam splits his forge into ten share tickets",
  shots: [
    {
      cue: "1.hook",
      ...cam.sweep({ on: [0, 1.35, 2.0], dist: 7.8, distTo: 6.5, fromYaw: -16, toYaw: 14, pitch: 8, fov: 44 }),
      zone: "forge",
      look: "overworld-day",
      note: "Bright daylight Frame-1 hook (and exact loop match for 8.loop): Sam beside his roaring forge, rising green stock chart, Leo holding a share ticket, Sterling smirking.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 1.4));
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.55, 0, 2.2]} rotationY={-12 * DEG} animation="wave" face="grin" />
            <CitizenLead variant="leo" nameTag="Leo" position={[-1.05, 0, 2.6]} rotationY={18 * DEG} animation="cheer" face="grin" />
            <EliteLead variant="tycoon" nameTag="Sterling" position={[1.35, 0, 3.65]} rotationY={-25 * DEG} animation="idle" face="smug" />
            <BarChart position={[-0.45, 0, -0.4]} values={[1.1, 1.6, 2.3, 0.7, 2.8]} grow={k} colors={["#37c967", "#37c967", "#37c967", "#e84848", "#37c967"]} />
            <ShareTicket position={[-0.48, 1.18, 2.95]} rotationY={15 * DEG} scale={0.82} />
            <EmberDrift position={[2.8, 1.4, 1.0]} count={16} />
          </>
        );
      },
    },
    {
      cue: "1.sam",
      ...cam.track({ from: [-0.8, 0, 5.2], to: [0.5, 0, 2.2], sideDist: 5.8, side: -1, height: 1.55, lead: 1.5, fov: 44 }),
      zone: "forge",
      look: "overworld-day",
      note: "Tracking Sam striding energetically along the sunlit street right up to his busy forge workshop.",
      stage: (t, { dur }) => {
        const walk = walkSegment([-0.8, 0, 5.2], [0.5, 0, 2.2], t, 0, dur, { gait: "walk", endYaw: SOUTH });
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" {...walk} animDistance={walk.animDistance} face="grin" />
            <IngotStack position={[1.5, 0.15, 3.0]} count={8} />
            <EmberDrift position={[2.8, 1.5, 1.0]} count={16} />
          </>
        );
      },
    },
    {
      cue: "1.want",
      ...cam.front({ actor: [0.6, 0, 2.0], facing: WEST, dist: 6.4, to: 5.1, side: 18, pitch: 8 }),
      zone: "forge",
      look: "overworld-day",
      note: "Sam gestures excitedly toward a glowing holographic second furnace popping in beside Furnace 1 on 'second'.",
      stage: (t) => {
        const secAt = w("1.want", "second");
        const popK = pop(t, secAt);
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.4, 0, 2.2]} rotationY={WEST} animation={t > secAt ? "point" : "talk"} face="grin" />
            {popK > 0.02 ? <ForgeFurnace position={[3.2, 0.12, 3.1]} rotationY={WEST} lit scale={popK} /> : null}
            <Arrow position={[1.5, 1.9, 2.6]} dir="up" length={1.1} grow={ramp(t, secAt, secAt + 0.5)} color="#ffd84d" />
          </>
        );
      },
    },
    {
      cue: "1.cost",
      ...cam.sweep({ on: on(EXCHANGE_POS, 0, 1.35, -1.2), dist: 6.4, distTo: 5.1, fromYaw: -22, toYaw: 18, pitch: 9, fov: 44 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "100 EMERALDS", color: "#5ce075", sub: "NEEDED FOR FURNACE #2" } },
      note: "Cut to Exchange stage: giant emerald PriceBillboard '100' and glittering pile of emeralds pop in on 'hundred'.",
      stage: (t) => {
        const hunAt = w("1.cost", "hundred");
        return (
          <group position={EXCHANGE_POS}>
            <PriceBillboard price="100 EM" position={[0, 0, -2.0]} scale={0.7 + pop(t, hunAt) * 0.3} />
            <CoinPile position={[0, 0.14, 0.2]} count={24} kind="emerald" />
            <CitizenLead variant="sam" nameTag="Sam" position={[-2.0, 0, 0.5]} rotationY={42 * DEG} animation={t > hunAt ? "scared" : "idle"} face="surprised" />
          </group>
        );
      },
    },
    {
      cue: "1.broke",
      ...cam.front({ actor: on(EXCHANGE_POS, 0, 0, 0.8), facing: SOUTH, dist: 5.8, to: 4.5, side: -18, pitch: 6 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "0 EMERALDS", color: "#ff5c52" } },
      note: "Close front push on Sam flipping open a totally empty wooden chest and shrugging hopelessly on 'broke'.",
      stage: (t) => {
        const brokeAt = w("1.broke", "broke");
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="sam" nameTag="Sam" position={[-0.7, 0, 0.8]} rotationY={SOUTH} animation={t > brokeAt ? "shrug" : "reach"} face="sad" />
            <Chest position={[0.75, 0.14, 0.8]} open={ease(ramp(t, 0.05, 0.45))} gold={0} kind="emerald" />
            {t >= brokeAt ? <FloatingNumber text="0 EM" position={[0.75, 1.55, 0.8]} color="#ff4f42" height={0.46} /> : null}
          </group>
        );
      },
    },
    {
      cue: "2.split",
      ...cam.heroLow({ on: on(EXCHANGE_POS, 0, 0.6, -0.5), dist: 6.4, yaw: 16, fov: 44 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "10 SHARES", color: "#ffdd57", sub: "10% OF THE FORGE EACH" } },
      note: "Low-angle visual metaphor: Sam fans out 10 crisp green Share Tickets across the air on 'ten'.",
      stage: (t) => {
        const tenAt = w("2.split", "ten");
        const spread = ease(ramp(t, tenAt - 0.1, tenAt + 0.5));
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="sam" nameTag="Sam" position={[0, 0, 0.6]} rotationY={SOUTH} animation={t > tenAt ? "reachUp" : "talk"} face="grin" />
            <ShareFan position={[0, 2.2, -0.3]} spread={0.2 + spread * 0.95} count={10} />
          </group>
        );
      },
    },
    {
      cue: "2.price",
      ...cam.sweep({ on: on(EXCHANGE_POS, 0, 1.35, 0), dist: 6.2, distTo: 4.9, fromYaw: 22, toYaw: -18, pitch: 8, fov: 44 }),
      zone: "exchange",
      look: "overworld-day",
      hud: { banner: { text: "10 EMERALDS EACH", color: "#5ce075" } },
      note: "Reverse sweep onto a gleaming Share Ticket paired with a swinging '10 EM' PriceTag.",
      stage: (t) => {
        const tenAt = w("2.price", "ten");
        return (
          <group position={EXCHANGE_POS}>
            <ShareTicket position={[-0.85, 1.45, 0]} rotationY={t * 0.9} scale={1.65} />
            <PriceTag text="10 EM" position={[0.95, 1.75, 0]} swing={Math.sin(t * 5) * 0.18} scale={0.7 + pop(t, tenAt) * 0.35} />
            <CoinPile position={[0.95, 0.14, 0.6]} count={10} kind="emerald" />
          </group>
        );
      },
    },
    {
      cue: "2.share",
      ...cam.twoShot({ a: [-1.2, 0, 0.4], b: [1.3, 0, 0.4], facing: SOUTH, dist: 6.8, to: 5.5, side: -16, pitch: 8 }),
      zone: "forge",
      look: "overworld-day",
      note: "Back at Sam's forge: giant '10%' gold badge links the glowing Share Ticket straight to Sam's furnace.",
      stage: (t) => {
        const pctAt = w("2.share", "ten");
        return (
          <>
            <CitizenLead variant="sam" nameTag="Sam" position={[0.5, 0, 2.0]} rotationY={SOUTH} animation="point" face="grin" />
            <ShareTicket position={[-1.2, 1.35, 2.0]} rotationY={20 * DEG + t * 0.7} scale={1.5} />
            {t >= pctAt ? <FloatingNumber text="10% OWN" position={[-1.2, 2.4, 2.0]} color="#ffd84d" height={0.44} /> : null}
          </>
        );
      },
    },
    {
      cue: "2.leo",
      ...cam.track({ from: on(EXCHANGE_POS, -2.6, 0, 2.6), to: on(EXCHANGE_POS, -0.9, 0, 0.8), sideDist: 5.8, side: 1, height: 1.5, lead: 1.4, fov: 44 }),
      zone: "exchange",
      look: "overworld-day",
      note: "Tracking Leo walking eagerly across the plaza to buy his very first Share Ticket from Sam.",
      stage: (t, { dur }) => {
        const walk = walkSegment([-2.6, 0, 2.6], [-0.9, 0, 0.8], t, 0, dur, { gait: "walk", endYaw: EAST });
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="leo" nameTag="Leo" {...walk} animDistance={walk.animDistance} face="grin" />
            <CitizenLead variant="sam" nameTag="Sam" position={[1.1, 0, 0.8]} rotationY={WEST} animation="reach" face="grin" />
            <ShareTicket position={[0.2, 1.25, 0.8]} rotationY={t * 1.4} scale={1.0} />
          </group>
        );
      },
    },
    {
      cue: "2.maya",
      ...cam.frameDuo({ a: on(EXCHANGE_POS, -1.5, 0, 1.0), b: on(EXCHANGE_POS, 1.3, 0, 1.0), fromYaw: -18, toYaw: 20, pitch: 8 }),
      zone: "exchange",
      look: "overworld-day",
      note: "9:16-safe two-shot: Maya steps in beside Alex buying out every last ticket until 'SOLD OUT!' pops overhead!",
      stage: (t, { dur }) => {
        const outAt = w("2.maya", "sell");
        const step = walkSegment([-2.4, 0, 1.2], [-1.1, 0, 1.0], t, 0, Math.min(1.1, dur), { gait: "walk", endYaw: EAST });
        return (
          <group position={EXCHANGE_POS}>
            <CitizenLead variant="maya" nameTag="Maya" {...step} animDistance={step.animDistance} face="grin" />
            <CitizenLead variant="alex" position={[-2.2, 0, -0.4]} rotationY={EAST} animation="cheer" face="grin" />
            <CitizenLead variant="sam" nameTag="Sam" position={[1.2, 0, 0.8]} rotationY={WEST} animation={t > outAt ? "cheer" : "reach"} face="grin" />
            <Bubble text="SOLD OUT!" position={[0.2, 2.45, 0.6]} scale={pop(t, outAt) * 0.78} />
          </group>
        );
      },
    },
  ],
});

import {
  ChatToast,
  CitizenLead,
  CommandBoard,
  EliteLead,
  EmeraldFountain,
  Official,
  PLACE,
  ShopStall,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";
import { LOOP_CAM, LoopMarketStage } from "./scene1";

/** Scene 3 (Beats 6–7): Real-World Bridge, Predatory Trap, Debate Question & Seamless Frame-0 Loop. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Real World & The Debate Loop",
  shots: [
    {
      cue: "6.real",
      ...cam.front({ actor: on(PLACE.history, 0, 0, 0.8), facing: 0, dist: 5.6, to: 4.7, side: -14, pitch: 9, fov: 46 }),
      zone: "history",
      note: "Real-world bridge: Sterling stands in front of the REAL WORLD stone monument.",
      stage: (t) => (
        <EliteLead variant="tycoon" nameTag="MEGA CORP" crown position={on(PLACE.history, 0, 0, 0.8)} rotationY={0} animation="point" face="smug" time={t} />
      ),
    },
    {
      cue: "6.rivals",
      ...cam.push({ on: on(PLACE.history, 0, 1.4, 0.6), dist: 5.4, to: 4.5, yaw: 12, pitch: 8, fov: 46 }),
      zone: "history",
      note: "CommandBoard reads 'RIVALS LEFT: 0' while Sterling laughs.",
      stage: (t) => (
        <>
          <CommandBoard lines={["MARKET SHARE: 100%", "RIVALS LEFT: 0"]} progress={ramp(t, 0.05, 0.7)} position={on(PLACE.history, 0, 0, -0.6)} />
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.history, -1.2, 0, 1.2)} rotationY={0.25} animation="laugh" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "6.power",
      ...cam.front({ actor: on(PLACE.history, 0, 0, 1.0), facing: 0, dist: 5.0, to: 4.2, side: 14, pitch: 8, fov: 44 }),
      zone: "history",
      note: "Miles stares at a popping POWER BILL chat toast.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Miles" position={on(PLACE.history, 0, 0, 1.0)} rotationY={0} animation="scared" face="wow" time={t} />
          <ChatToast text="POWER BILL: 999$" position={on(PLACE.history, 0, 2.65, 1.0)} height={0.28 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "6.ticket",
      ...cam.front({ actor: on(PLACE.history, 0, 0, 1.0), facing: 0, dist: 5.0, to: 4.2, side: -14, pitch: 8, fov: 44 }),
      zone: "history",
      note: "Miles shrugs as TICKET FEE + APP STORE FEE toast pops overhead.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Miles" position={on(PLACE.history, 0, 0, 1.0)} rotationY={0} animation="shrug" face="frown" time={t} />
          <ChatToast text="SERVICE FEE: +50%" position={on(PLACE.history, 0, 2.65, 1.0)} height={0.28 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "6.stuck",
      ...cam.twoShot({ a: on(PLACE.history, -1.0, 0, 1.0), b: on(PLACE.history, 1.0, 0, 1.0), facing: 0, dist: 5.4, to: 4.6, side: 10, pitch: 8, fov: 46 }),
      zone: "history",
      note: "Miles reluctantly pays while Sterling catches raining emeralds.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Miles" position={on(PLACE.history, -1.0, 0, 1.0)} rotationY={0.35} animation="cower" face="ouch" time={t} />
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.history, 1.0, 0, 1.0)} rotationY={-0.35} animation="cheer" face="smug" time={t} />
          <EmeraldFountain position={on(PLACE.history, 1.0, 1.4, 1.0)} t={t} count={14} />
        </>
      ),
    },
    {
      cue: "6.new",
      ...cam.twoShot({ a: on(PLACE.square, -1.8, 0, 0.4), b: on(PLACE.square, 1.4, 0, 0.4), facing: 0, dist: 6.0, to: 5.1, side: -10, pitch: 8, fov: 46 }),
      zone: "square",
      note: "A new baker opens a 2-emerald stall next to Sterling's shop.",
      stage: (t) => (
        <>
          <ShopStall price={2} position={on(PLACE.square, -1.8, 0, -1.6)} t={t} showPickaxe={false} />
          <ShopStall price={15} position={on(PLACE.square, 1.4, 0, -1.6)} t={t} showPickaxe={false} />
          <Official role="mod" position={on(PLACE.square, -1.8, 0, 0.4)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.square, 1.4, 0, 0.4)} rotationY={-0.3} animation="point" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "6.trap",
      ...cam.twoShot({ a: on(PLACE.square, -1.8, 0, 0.4), b: on(PLACE.square, 1.4, 0, 0.4), facing: 0, dist: 6.0, to: 5.1, side: 10, pitch: 8, fov: 46 }),
      zone: "square",
      note: "Sterling temporarily drops his price to 1 emerald until the new baker quits!",
      stage: (t) => {
        const w = ease(ramp(t, 0.25, 0.95));
        return (
          <>
            <ShopStall price={1} position={on(PLACE.square, 1.4, 0, -1.6)} t={t} showPickaxe={false} />
            <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.square, 1.4, 0, 0.4)} rotationY={-0.2} animation="laugh" face="smug" time={t} />
            <Official role="mod" position={on(PLACE.square, -1.8 - w * 1.4, 0, 0.4)} rotationY={-Math.PI / 2} animation={w > 0.02 && w < 0.98 ? "walk" : "cower"} animDistance={w * 1.4} face="sad" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.fault",
      ...cam.truck({ on: on(PLACE.square, -1.5, 1.4, 0.6), dist: 5.4, yaw: 10, pitch: 8, by: [2.2, 0, 0], fov: 46 }),
      zone: "square",
      note: "Lateral pan across the Mods holding a debate sign: BREAK IT UP?",
      stage: (t) => (
        <>
          <CommandBoard lines={["MODS STEP IN?", "BREAK UP SHOP"]} progress={1} position={on(PLACE.square, -0.5, 0, -1.2)} />
          <Official role="judge" position={on(PLACE.square, -1.6, 0, 0.8)} rotationY={0.2} animation="point" face="calm" time={t} />
          <CitizenLead nameTag="Miles" position={on(PLACE.square, 0.8, 0, 0.8)} rotationY={-0.2} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "7.or",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 5.2, to: 4.3, side: -14, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Debate counter-angle: Sterling cheers under an EmeraldFountain asking if he won fair and square.",
      stage: (t) => (
        <>
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.square, 0, 0, 0.8)} rotationY={0} animation="cheer" face="smug" time={t} />
          <EmeraldFountain position={on(PLACE.square, 0, 1.6, 0.8)} t={t} count={18} />
        </>
      ),
    },
    {
      cue: "7.loop",
      ...LOOP_CAM,
      zone: "square",
      note: "Seamless loop payoff: exact Frame-0 3-stall market composition on 'And that's...'",
      stage: (t) => <LoopMarketStage t={t} />,
    },
  ],
});

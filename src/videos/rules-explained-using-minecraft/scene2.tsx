import {
  CitizenLead,
  EliteLead,
  Griefer,
  LockedChestGrid,
  Official,
  PLACE,
  RuleBoard,
  SpawnChest,
  Vox,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const S = PLACE.spawn;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "RuleBoard 1 -> 100 & The 3-Part Clarity Punch",
  shots: [
    {
      cue: "3.watch",
      ...cam.twoShot({ a: at(S, -1.2, 0, 0.4), b: at(S, 1.2, 0, 0.4), dist: 5.0, height: 1.5, fov: 42 }),
      zone: "spawn",
      note: "Two Mods look around overwhelmed—they cannot babysit 100 players every second.",
      stage: (t) => (
        <>
          <EliteLead variant="pres" nameTag="Mod" position={at(S, -1.2, 0, 0.4)} rotationY={0.4} animation="lookAround" face="worried" time={t} />
          <Official position={at(S, 1.2, 0, 0.4)} rotationY={-0.4} animation="lookAround" face="worried" time={t + 0.3} />
        </>
      ),
    },
    {
      cue: "3.r1",
      ...cam.sweep({ on: at(S, 0, 1.8, -2.6), dist: 4.6, fromYaw: 35, toYaw: 65, pitch: 8, fov: 42 }),
      zone: "spawn",
      hud: { banner: { text: "RULE #1: NO STEALING", color: "#ffdd57" } },
      note: "Mod nails up Rule #1 onto the Spawn RuleBoard.",
      stage: (t) => (
        <>
          <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="order" width={2.8} height={1.4} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 1.5, 0, -1.4)} rotationY={-0.6} animation="point" face="neutral" time={t} />
        </>
      ),
    },
    {
      cue: "3.again",
      ...cam.sweep({ on: at(S, 0, 0.9, -0.4), dist: 4.4, fromYaw: 20, toYaw: -20, pitch: 12, fov: 42 }),
      zone: "spawn",
      note: "Five minutes later, Griefer walks right back and smashes another chest anyway!",
      stage: (t) => {
        const w = moveBetween(at(S, -2.8, 0, -0.2), at(S, -1.1, 0, -0.2), t, 0, 0.9);
        return (
          <>
            <SpawnChest position={at(S, 0, 0.04, -0.4)} broken={t > 0.9} />
            <Griefer position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "push"} animDistance={w.animDistance} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.r2",
      ...cam.front({ actor: at(S, 0, 0, -1.8), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "spawn",
      hud: { banner: { text: "RULE #2: LOCK CHESTS", color: "#ffdd57" } },
      note: "Mod hammers up Rule #2 onto the growing Spawn board.",
      stage: (t) => (
        <>
          <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="chaos" width={3.0} height={1.5} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, -1.5, 0, -1.4)} rotationY={0.5} animation="press" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "3.r3",
      ...cam.sweep({ on: at(S, 0, 1.2, -0.6), dist: 5.0, fromYaw: -60, toYaw: -30, pitch: 14, fov: 44 }),
      zone: "spawn",
      hud: { banner: { text: "RULE #3: NO LAVA", color: "#ff922b" } },
      note: "Griefer pours glowing lava on the spawn cobbles—so Rule #3 slams onto the board!",
      stage: (t) => (
        <>
          <Vox kind="lava" position={at(S, 0, 0.06, -0.4)} size={[2.2, 0.08, 2.2]} emissive="#ff5a14" emissiveIntensity={0.6} />
          <Griefer position={at(S, -1.8, 0, -0.2)} rotationY={1.2} animation="laugh" face="grin" time={t} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 1.9, 0, -0.2)} rotationY={-1.2} animation="panic" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "3.r100",
      ...cam.heroLow({ on: at(S, 0, 2.2, -2.6), dist: 5.6, yaw: 14, fov: 44 }),
      zone: "spawn",
      hud: { counter: { label: "SERVER RULES", from: 1, to: 100, startAt: 0.05, dur: 1.2, color: "#ff4f42" } },
      note: "Counter rolls rapidly 1 -> 100 as the RuleBoard towers over Spawn.",
      stage: (t) => (
        <>
          <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="chaos" width={3.4} height={1.7} />
          <RuleBoard position={at(S, 0, 3.6, -2.6)} mode="chaos" width={3.4} height={1.5} />
          <CitizenLead variant="leo" nameTag="Felint" position={at(S, 0, 0, 0.4)} rotationY={Math.PI} animation="idle" face="surprised" time={t} />
        </>
      ),
    },
    {
      cue: "3.locks",
      ...cam.streetOverview({ from: at(S, 0, 0, 9.0), to: at(S, 0, 0, 4.6), on: at(S, 0, 0.7, 0), height: 4.5, fov: 44 }),
      zone: "spawn",
      hud: { banner: { text: "99 CHESTS LOCKED", color: "#55ff55" } },
      note: "Crane over the row of spawn chests as gleaming iron locks snap shut across every one.",
      stage: (t) => <LockedChestGrid position={at(S, 0, 0.04, 0.2)} locked={t > 0.2} />,
    },
    {
      cue: "4.mean",
      ...cam.front({ actor: at(S, 0, 0, 0.2), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "spawn",
      note: "Clarity punch #1: Mods aren't just trying to be mean.",
      stage: (t) => <EliteLead variant="pres" nameTag="Mod" position={at(S, 0, 0, 0.2)} rotationY={0} animation="shrug" face="calm" time={t} />,
    },
    {
      cue: "4.about",
      ...cam.twoShot({ a: at(S, -1.2, 0, 0.4), b: at(S, 1.2, 0, 0.4), facing: 0.65, dist: 5.0, height: 1.5, fov: 42 }),
      zone: "spawn",
      note: "Clarity punch #2: the 100 rules were never really about the 99 honest players.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(S, -1.2, 0, 0.4)} rotationY={0.3} animation="idle" face="calm" time={t} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 1.2, 0, 0.4)} rotationY={-0.3} animation="talk" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "4.one",
      ...cam.front({ actor: at(S, 0, 0, 0.4), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "spawn",
      hud: { banner: { text: "1 BROKE IT FOR 99", color: "#ff4f42" } },
      note: "Clarity punch #3: one single player broke trust for 99 others.",
      stage: (t) => <Griefer position={at(S, 0, 0, 0.4)} rotationY={0} animation="shrug" face="smug" time={t} />,
    },
    {
      cue: "4.why",
      ...cam.sweep({ on: at(S, 0, 1.8, -2.6), dist: 5.0, fromYaw: 35, toYaw: 65, pitch: 8, fov: 42 }),
      zone: "spawn",
      note: "Sweep across the spawn RuleBoard showing why every server ends up with written rules.",
      stage: () => <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="order" width={3.0} height={1.5} />,
    },
    {
      cue: "4.write",
      ...cam.track({ from: at(S, -2.0, 0, -1.2), to: at(S, 1.6, 0, -1.2), sideDist: 4.8, lead: 0.9, height: 1.6, fov: 42 }),
      zone: "spawn",
      note: "Mod walks along the board writing down rules so nobody can repeat the chaos.",
      stage: (t) => {
        const w = moveBetween(at(S, -2.0, 0, -1.2), at(S, 1.6, 0, -1.2), t, 0, 1.35);
        return (
          <>
            <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="order" width={3.0} height={1.5} />
            <EliteLead variant="pres" nameTag="Mod" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="calm" time={t} />
          </>
        );
      },
    },
  ],
});

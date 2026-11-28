import {
  CitizenLead,
  EliteLead,
  ExplainerCrowd,
  Griefer,
  LOOP_CAM,
  PLACE,
  RuleBoard,
  SpawnChest,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const S = PLACE.spawn;

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "RuleBoard Hook, 100 Players & Spawn Chest Smash",
  shots: [
    {
      cue: "1.hook",
      ...LOOP_CAM,
      zone: "spawn",
      hud: { banner: { text: "RULE #1: PLAY NICE", color: "#55ff55" } },
      note: "Exact Frame-0 LOOP_CAM sweeping across the clean wooden RuleBoard at Server Spawn.",
      stage: (t) => (
        <>
          <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="order" width={2.8} height={1.4} />
          <CitizenLead variant="leo" nameTag="Felint" position={at(S, -1.8, 0, -1.2)} rotationY={0.4} animation="wave" face="grin" time={t} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 1.8, 0, -1.2)} rotationY={-0.4} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "1.board",
      ...cam.front({ actor: at(S, 0, 0, -2.0), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "spawn",
      note: "Clean front look at the single-rule board standing beside the shared wooden spawn chest.",
      stage: () => (
        <>
          <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="order" width={2.8} height={1.4} />
          <SpawnChest position={at(S, 0, 0.04, -0.4)} />
        </>
      ),
    },
    {
      cue: "1.server",
      ...cam.streetOverview({ from: at(S, 0, 0, 10.5), to: at(S, 0, 0, 5.2), on: at(S, 0, 1.2, 0), height: 4.5, fov: 46 }),
      zone: "spawn",
      hud: { counter: { label: "ONLINE NOW", from: 1, to: 100, startAt: 0.05, dur: 1.1, color: "#55ff55" } },
      note: "Wide crane over the bright Server Spawn filled with friendly players waving.",
      stage: (t) => {
        const w = moveBetween(at(S, -3.0, 0, 1.2), at(S, -1.4, 0, 1.2), t, 0, 1.2);
        return (
          <>
            <SpawnChest position={at(S, 0, 0.04, -0.4)} />
            <CitizenLead variant="leo" nameTag="Felint" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
            <ExplainerCrowd
              positions={[at(S, -3.2, 0, 2.2), at(S, 1.6, 0, 1.4), at(S, 3.2, 0, 2.0), at(S, 0, 0, 2.8)]}
              rotationY={0}
              animation="cheer"
              face="grin"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "1.griefer",
      ...cam.track({ from: at(S, -4.5, 0, 2.0), to: at(S, -1.2, 0, 0.2), sideDist: 4.8, lead: 0.9, height: 1.6, fov: 42 }),
      zone: "spawn",
      hud: { chat: [{ text: "Griefer joined the game", color: "#ffdd57" }] },
      note: "Griefer struts into Server Spawn with a sly grin staring straight at the shared chest.",
      stage: (t) => {
        const w = moveBetween(at(S, -4.5, 0, 2.0), at(S, -1.2, 0, 0.2), t, 0, 1.35);
        return (
          <>
            <SpawnChest position={at(S, 0, 0.04, -0.4)} />
            <Griefer position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="smug" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.break",
      ...cam.front({ actor: at(S, -1.1, 0, 0.2), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "spawn",
      note: "Close front shot on Griefer cracking his knuckles with mischievous intent.",
      stage: (t) => (
        <>
          <SpawnChest position={at(S, 0, 0.04, -0.4)} />
          <Griefer position={at(S, -1.1, 0, 0.2)} rotationY={0.4} animation="press" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "2.chest",
      ...cam.sweep({ on: at(S, 0, 0.9, -0.4), dist: 4.4, fromYaw: -22, toYaw: 20, pitch: 12, fov: 42 }),
      zone: "spawn",
      look: "overworld-night",
      hud: { stamp: { text: "SMASHED!", color: "#ff3b30", at: 0.3, angle: -10 } },
      note: "Night one: Griefer smashes the shared spawn chest wide open into scattered planks and diamond gear.",
      stage: (t) => (
        <>
          <SpawnChest position={at(S, 0, 0.04, -0.4)} broken={t > 0.35} />
          <Griefer position={at(S, -1.1, 0, -0.2)} rotationY={1.3} animation="push" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "2.lose",
      ...cam.twoShot({ a: at(S, -1.4, 0, 0.6), b: at(S, 1.4, 0, 0.6), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "spawn",
      look: "overworld-day",
      note: "Ninety-nine players log back on and gasp over the shattered empty spawn chest.",
      stage: (t) => {
        const w = moveBetween(at(S, -3.2, 0, 0.6), at(S, -1.4, 0, 0.6), t, 0, 1.1);
        return (
          <>
            <SpawnChest position={at(S, 0, 0.04, -0.4)} broken />
            <CitizenLead variant="leo" nameTag="Felint" position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "panic"} animDistance={w.animDistance} face="surprised" time={t} />
          <ExplainerCrowd positions={[at(S, 1.4, 0, 0.6), at(S, 2.5, 0, 1.4)]} rotationY={-0.8} animation="panic" face="sad" time={t} />
        </>
        );
      },
    },
    {
      cue: "2.same",
      ...cam.front({ actor: at(S, -1.4, 0, 0.6), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "spawn",
      note: "Felint shrugs at the lens: same server, same chest—so what just happened?",
      stage: (t) => (
        <>
          <SpawnChest position={at(S, 0, 0.04, -0.4)} broken />
          <CitizenLead variant="leo" nameTag="Felint" position={at(S, -1.4, 0, 0.6)} rotationY={0} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
  ],
});

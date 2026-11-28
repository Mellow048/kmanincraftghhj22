import {
  Balance,
  BanHammer,
  CitizenLead,
  CommandBoard,
  EliteLead,
  ExplainerCrowd,
  Griefer,
  LOOP_CAM,
  LockedChestGrid,
  PLACE,
  PaperAirplane,
  RuleBoard,
  SpawnChest,
  at,
  cam,
  ease,
  ramp,
  storyScene,
  timing,
} from "./kit";

const S = PLACE.spawn;
const C = PLACE.campus;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Winners vs Losers, School Bridge & Seamless Loop",
  shots: [
    {
      cue: "5.keep",
      ...cam.twoShot({ a: at(S, -1.5, 0, 0.6), b: at(S, 1.5, 0, 0.6), dist: 5.4, height: 1.5, fov: 44 }),
      zone: "spawn",
      note: "Who wins vs loses: Felint on the left vs Griefer on the right.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(S, -1.5, 0, 0.6)} rotationY={0.4} animation="idle" face="smile" time={t} />
          <Griefer position={at(S, 1.5, 0, 0.6)} rotationY={-0.4} animation="idle" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "5.ninety",
      ...cam.sweep({ on: at(S, 0, 1.0, 0.2), dist: 5.8, fromYaw: 20, toYaw: 55, pitch: 12, fov: 44 }),
      zone: "spawn",
      hud: { banner: { text: "99 KEEP THEIR GEAR", color: "#55ff55" } },
      note: "The 99 players cheer happily beside their row of locked spawn chests.",
      stage: (t) => (
        <>
          <LockedChestGrid position={at(S, 0, 0.04, 0.2)} locked />
          <CitizenLead variant="leo" nameTag="Felint" position={at(S, -1.8, 0, 2.0)} rotationY={0.2} animation="cheer" face="grin" time={t} />
          <ExplainerCrowd positions={[at(S, 0, 0, 2.2), at(S, 1.8, 0, 2.0)]} rotationY={0} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "5.ban",
      ...cam.front({ actor: at(S, 0, 0, 0.4), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "spawn",
      hud: { stamp: { text: "BANNED!", color: "#ff3b30", at: 0.25, angle: -10 } },
      note: "Mod swings the glowing red Ban Hammer and Griefer gets slammed with a BANNED! stamp.",
      stage: (t) => (
        <>
          <Griefer position={at(S, -0.7, 0, 0.4)} rotationY={0.3} animation={t > 0.35 ? "fall" : "scared"} face="surprised" time={t} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 0.9, 0, 0.4)} rotationY={-0.8} animation="push" face="angry" time={t}>
            <BanHammer position={[0, 0.02, 0.24]} scale={1.1} />
          </EliteLead>
        </>
      ),
    },
    {
      cue: "5.mods",
      ...cam.sweep({ on: at(S, 0, 1.6, -1.2), dist: 5.0, fromYaw: 18, toYaw: -18, pitch: 10, fov: 42 }),
      zone: "spawn",
      look: "overworld-night",
      note: "OTS: Meanwhile, Mods spend all night typing rules on the CommandBoard instead of actually playing.",
      stage: (t) => (
        <>
          <CommandBoard
            lines={["/rule add no-grief", "/lock all chests", "/ban Griefer"]}
            progress={ramp(t, 0.1, 1.3)}
            position={at(S, 0, 2.0, -2.4)}
          />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 0, 0, -0.8)} rotationY={Math.PI} animation="press" face="sleepy" time={t} />
        </>
      ),
    },
    {
      cue: "5.scale",
      ...cam.sweep({ on: at(S, 0, 1.5, 0.4), dist: 5.4, fromYaw: -20, toYaw: 20, pitch: 10, fov: 44 }),
      zone: "spawn",
      note: "Balance scale tips decisively: 1 Griefer vs 99 protected spawn chests.",
      stage: (t) => {
        const tilt = ease(ramp(t, 0.1, 1.2)) * -0.4;
        return (
          <Balance
            position={at(S, 0, 0.04, 0.4)}
            tilt={tilt}
            left={<SpawnChest scale={0.6} locked />}
            right={<SpawnChest scale={0.45} broken />}
          />
        );
      },
    },
    {
      cue: "6.real",
      ...cam.streetOverview({ from: at(C, 0, 0, 9.5), to: at(C, 0, 0, 4.6), on: at(C, 0, 1.5, -1.5), height: 5.2, fov: 46 }),
      zone: "campus",
      note: "Real-world bridge into the open-roof SchoolCampusMap classroom with the teacher at the chalkboard.",
      stage: (t) => (
        <>
          <EliteLead variant="pres" nameTag="Teacher" position={at(C, 0, 0.06, -2.0)} rotationY={0} animation="talk" face="calm" time={t} />
          <CitizenLead variant="leo" position={at(C, -3.0, 0.06, 0.72)} rotationY={Math.PI} animation="sit" face="calm" time={t} />
          <CitizenLead variant="sam" position={at(C, 0, 0.06, 0.72)} rotationY={Math.PI} animation="sit" face="calm" time={t} />
          <CitizenLead variant="alex" position={at(C, 3.0, 0.06, 0.72)} rotationY={Math.PI} animation="sit" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "6.class",
      ...cam.truck({ on: at(C, -2.5, 1.3, 0.4), by: [5.0, 0, 0], dist: 4.8, yaw: 0, pitch: 14, fov: 44 }),
      zone: "campus",
      note: "OTS lateral truck across the seated class—99% of students just want a normal day.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" position={at(C, -3.0, 0.06, 0.72)} rotationY={Math.PI} animation="sit" face="smile" time={t} />
          <CitizenLead variant="sam" position={at(C, 0, 0.06, 0.72)} rotationY={Math.PI} animation="sit" face="smile" time={t} />
          <CitizenLead variant="alex" position={at(C, 3.0, 0.06, 0.72)} rotationY={Math.PI} animation="sit" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.kid",
      ...cam.sweep({ on: at(C, 0, 1.8, -1.2), dist: 5.2, fromYaw: -20, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "campus",
      note: "One troublemaker kid launches a white paper airplane straight across the green chalkboard!",
      stage: (t) => {
        const f = ease(ramp(t, 0.1, 1.3));
        return (
          <>
            <Griefer position={at(C, 3.6, 0.06, 2.7)} rotationY={Math.PI - 0.3} animation="push" face="grin" time={t} />
            <PaperAirplane position={at(C, 2.5 - f * 5.2, 2.0 + Math.sin(f * Math.PI) * 0.6, 1.4 - f * 4.5)} rotationY={Math.PI + 0.5} />
            <EliteLead variant="pres" nameTag="Teacher" position={at(C, 0, 0.06, -2.0)} rotationY={0} animation="panic" face="surprised" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.rule",
      ...cam.front({ actor: at(C, 0, 0.06, -2.0), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "campus",
      hud: { banner: { text: "NEW CLASS RULE!", color: "#ffdd57" } },
      note: "The teacher writes another strict rule straight onto the green chalkboard.",
      stage: (t) => (
        <EliteLead variant="pres" nameTag="Teacher" position={at(C, 0, 0.06, -2.0)} rotationY={0.65} animation="point" face="frown" time={t} />
      ),
    },
    {
      cue: "6.same2",
      ...cam.sweep({ on: at(S, 0, 1.8, -2.6), dist: 5.0, fromYaw: 18, toYaw: -18, pitch: 8, fov: 42 }),
      zone: "spawn",
      note: "Back at Server Spawn: same exact chain reaction, same exact RuleBoard.",
      stage: () => <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="chaos" width={3.0} height={1.5} />,
    },
    {
      cue: "7.fault",
      ...cam.twoShot({ a: at(S, -1.4, 0, 0.4), b: at(S, 1.4, 0, 0.4), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "spawn",
      note: "Debate-bait split framing Griefer vs Mod to fuel comments.",
      stage: (t) => (
        <>
          <Griefer position={at(S, -1.4, 0, 0.4)} rotationY={0.4} animation="shrug" face="smug" time={t} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 1.4, 0, 0.4)} rotationY={-0.4} animation="shrug" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "7.grief",
      ...cam.front({ actor: at(S, -1.4, 0, 0.4), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "spawn",
      note: "Close front shot on Griefer grinning beside the broken chest.",
      stage: (t) => (
        <>
          <SpawnChest position={at(S, 0, 0.04, -0.4)} broken />
          <Griefer position={at(S, -1.4, 0, 0.4)} rotationY={0} animation="laugh" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "7.mod",
      ...cam.front({ actor: at(S, 1.4, 0, 0.4), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "spawn",
      note: "Close front shot on Mod standing under the towering 100-rule board.",
      stage: (t) => (
        <>
          <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="chaos" width={3.0} height={1.5} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 1.4, 0, 0.4)} rotationY={0} animation="point" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "7.when",
      ...cam.sweep({ on: at(S, 0, 1.8, -2.6), dist: 5.4, fromYaw: 16, toYaw: -15, pitch: 8, fov: 42 }),
      zone: "spawn",
      note: "Smooth glide back to the RuleBoard preparing for seamless Frame-0 handoff.",
      stage: (t) => (
        <>
          <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="order" width={2.8} height={1.4} />
          <CitizenLead variant="leo" nameTag="Felint" position={at(S, -1.8, 0, -1.2)} rotationY={0.4} animation="idle" face="smile" time={t} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 1.8, 0, -1.2)} rotationY={-0.4} animation="idle" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "7.loop",
      ...LOOP_CAM,
      zone: "spawn",
      note: "Exact LOOP_CAM handoff matching Frame 0 over the RuleBoard.",
      stage: (t) => (
        <>
          <RuleBoard position={at(S, 0, 1.8, -2.6)} mode="order" width={2.8} height={1.4} />
          <CitizenLead variant="leo" nameTag="Felint" position={at(S, -1.8, 0, -1.2)} rotationY={0.4} animation="wave" face="grin" time={t} />
          <EliteLead variant="pres" nameTag="Mod" position={at(S, 1.8, 0, -1.2)} rotationY={-0.4} animation="wave" face="smile" time={t} />
        </>
      ),
    },
  ],
});

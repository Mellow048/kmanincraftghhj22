import type React from "react";
import {
  Balance,
  Bubble,
  CitizenLead,
  DiamondSword,
  EliteLead,
  EmeraldFountain,
  FloatingNumber,
  LOOP_CAM,
  PLACE,
  SwordShop,
  TariffGate,
  cam,
  ease,
  loopClimaxStage,
  moveBetween,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 4 (Beat 5): 3-Part Breakdown, Balanced Trade-Off Dilemma & Seamless Frame-0 Loop. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "3 Effects & Seamless Loop",
  shots: [
    {
      cue: "5.three",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.3, 1.2), dist: 9.2, distTo: 7.6, fromYaw: -20, toYaw: 20, pitch: 8, fov: 48 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "3 REAL TARIFF EFFECTS", color: "#ffd84d" } },
      note: "Wide daylight reset on the bridge introducing all three actors (Sam, Felint, Cobalt) cleanly inside 9:16.",
      stage: (t) => (
        <>
          <CitizenLead variant="sam" position={on(PLACE.bridge, -2.0, 0, 1.2)} rotationY={0.2} animation="cheer" face="smile" time={t} />
          <CitizenLead variant="leo" position={on(PLACE.bridge, 0, 0, 1.6)} rotationY={0} animation="shrug" face="uneasy" time={t} />
          <EliteLead variant="tycoon" position={on(PLACE.bridge, 2.0, 0, 1.2)} rotationY={-0.2} animation="point" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "5.one",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.35, -1.6), dist: 7.2, distTo: 5.8, fromYaw: -24, toYaw: 18, pitch: 8, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "1. PROTECTS LOCAL JOBS", color: "#4ce87a" } },
      note: "Effect #1: Local smith Sam cheers safely inside his Red Island sword stall beneath a crisp unclipped HUD banner.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -3.4)} t={t} bannerColor="#b5332a" />
          <CitizenLead variant="sam" position={on(PLACE.red, 0, 0, -1.2)} rotationY={0} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "5.two",
      ...cam.front({ actor: on(PLACE.red, 0, 0, 3.0), facing: 0, dist: 6.4, to: 5.2, side: 22, pitch: 7, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "2. HIGHER PRICES", color: "#ff5548" } },
      note: "Effect #2: Shopper Felint looks stressed beneath crisp unclipped HUD banner '2. HIGHER PRICES'.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.red, -1.2, 0, 3.0), on(PLACE.red, 0.8, 0, 3.0), t, 0, 1.3);
        return (
          <CitizenLead variant="leo" nameTag="FELINT" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "cower"} animDistance={w.animDistance} face="worried" time={t} />
        );
      },
    },
    {
      cue: "5.three2",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.4, 0), dist: 14.5, distTo: 11.8, fromYaw: 64, toYaw: 108, pitch: 20, fov: 50 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "3. RIVAL ISLANDS HIT BACK", color: "#ff5548" } },
      note: "Effect #3 staged across BOTH islands: Mayor Sterling on Red Island and Mayor Cobalt on Blue Island point angrily across the water channel!",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, 5.2)} drop={1} accent="#d63228" label="RED TAX" />
          <TariffGate position={on(PLACE.bridge, 0, 0, -5.2)} drop={1} accent="#1d4ed8" label="BLUE TAX" />
          <EliteLead variant="pres" position={on(PLACE.bridge, 0, 0, 8.8)} rotationY={Math.PI} animation="point" face="angry" time={t} />
          <EliteLead variant="tycoon" position={on(PLACE.bridge, 0, 0, -8.8)} rotationY={0} animation="point" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "5.gov",
      ...cam.heroLow({ on: on(PLACE.red, 0.6, 1.5, 3.8), dist: 7.6, yaw: -22, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "TAX EMERALD TREASURY", color: "#4ce87a" } },
      note: "Wide low angle on Mayor Sterling smiling beside a sparkling EmeraldFountain pouring tax revenue.",
      stage: (t) => (
        <>
          <EmeraldFountain position={on(PLACE.red, -0.3, 0, 3.2)} t={t} />
          <EliteLead variant="pres" position={on(PLACE.red, 1.6, 0, 4.2)} rotationY={-0.35} animation="laugh" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "5.choice",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.4, 0), dist: 7.8, distTo: 6.4, fromYaw: 24, toYaw: -20, pitch: 8, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "NEVER FREE MONEY", color: "#ffd84d" } },
      note: "Clean wide visual metaphor: giant brass Balance scale swings across the bridge holding a diamond sword vs emerald coins.",
      stage: (t) => (
        <>
          <Balance
            position={on(PLACE.bridge, 0, 0, 0)}
            tilt={Math.sin(t * 2.8) * 0.25}
            scale={1.15}
            left={<DiamondSword position={[0, 0.45, 0]} scale={0.55} />}
            right={<FloatingNumber text="$$" color="#4ce87a" position={[0, 0.35, 0]} height={0.42} />}
          />
          <Bubble text="NOT FREE!" dark position={on(PLACE.bridge, 0, 2.85, 0)} rotationY={0.15} scale={0.42 * pop(t, wordAt("5.choice", "free"))} />
        </>
      ),
    },
    {
      cue: "5.trade",
      ...cam.frameDuo({ a: on(PLACE.bridge, -1.6, 0, 1.2), b: on(PLACE.bridge, 1.6, 0, 1.2), fromYaw: -18, toYaw: 18, pitch: 8, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "CHEAP GOODS vs LOCAL JOBS", color: "#ffd84d" } },
      note: "Balanced two-shot: Felint (cheap goods) vs Sam (local jobs) facing the camera cleanly inside 9:16.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="FELINT" position={on(PLACE.bridge, -1.6, 0, 1.2)} rotationY={0.2} animation="wave" face="smile" time={t} />
          <CitizenLead variant="sam" nameTag="SAM" position={on(PLACE.bridge, 1.6, 0, 1.2)} rotationY={-0.2} animation="wave" face="brave" time={t} />
        </>
      ),
    },
    {
      cue: "5.ask",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.4, -1.8), dist: 7.2, distTo: 5.8, fromYaw: -22, toYaw: 16, pitch: 7, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "PAY 12 TO SAVE SAM?", color: "#ffd84d" } },
      note: "Direct audience question cut A: Sam waves earnestly outside his 12-emerald Red Island smithy.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -3.6)} t={t} bannerColor="#b5332a" />
          <CitizenLead variant="sam" position={on(PLACE.red, 0, 0, -1.4)} rotationY={0} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "5.or",
      ...cam.track({ from: on(PLACE.bridge, 0, 0, 6.5), to: on(PLACE.bridge, 0, 0, -3.5), sideDist: 7.4, side: 1, lead: 1.5, height: 2.0 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "OR CROSS FOR 5 EMERALDS?", color: "#4ce87a" } },
      note: "Direct audience question cut B: Felint sprints happily across the bridge toward Blue Island's glowing 5-emerald sword.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.bridge, 0, 0, 6.5), on(PLACE.bridge, 0, 0, -3.5), t, 0, 1.5);
        return (
          <CitizenLead variant="leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
        );
      },
    },
    {
      cue: "5.tell",
      ...cam.frameDuo({ a: on(PLACE.bridge, -1.2, 0, 1.0), b: on(PLACE.bridge, 1.2, 0, 1.0), fromYaw: -20, toYaw: 18, pitch: 7, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "PICK YOUR SIDE BELOW!", color: "#ffd84d" } },
      note: "Energetic comment-bait sweep: Felint and Sam wave together beneath crisp HUD CTA.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" position={on(PLACE.bridge, -1.2, 0, 1.0)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <CitizenLead variant="sam" position={on(PLACE.bridge, 1.2, 0, 1.0)} rotationY={-0.1} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "5.loop",
      ...LOOP_CAM,
      zone: "bridge",
      look: "overworld-day",
      note: "Seamless loop handoff matching Frame 0 LOOP_CAM & climax gate stage identically so the Short loops forever.",
      stage: (t) => loopClimaxStage(t, 0.2),
    },
  ],
});

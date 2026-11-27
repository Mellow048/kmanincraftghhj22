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
      ...cam.front({ actor: on(PLACE.bridge, 0, 0.8, 0), facing: 0, dist: 7.4, to: 6.0, side: 18, pitch: 8, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "3 REAL EFFECTS", color: "#ffd84d" } },
      note: "Crisp daylight reset on the bridge introducing the three huge Minecraft tariff effects.",
      stage: (t) => (
        <>
          <CitizenLead variant="sam" position={on(PLACE.bridge, -2.1, 0, 1.2)} rotationY={0.2} animation="cheer" face="smile" time={t} />
          <CitizenLead variant="leo" position={on(PLACE.bridge, 0, 0, 1.4)} rotationY={0} animation="shrug" face="uneasy" time={t} />
          <EliteLead variant="tycoon" position={on(PLACE.bridge, 2.1, 0, 1.2)} rotationY={-0.2} animation="point" face="angry" time={t} />
          <FloatingNumber text="3 EFFECTS" color="#ffd84d" position={on(PLACE.bridge, 0, 2.95, 1.2)} height={0.68 * pop(t, wordAt("5.three", "three"))} />
        </>
      ),
    },
    {
      cue: "5.one",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.3, -1.5), dist: 5.8, distTo: 4.6, fromYaw: -28, toYaw: 20, pitch: 7, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      note: "Effect #1: Local smith Sam cheers safely inside his Red Village sword stall under '#1 PROTECT LOCAL'.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -3.2)} t={t} bannerColor="#b5332a" />
          <CitizenLead variant="sam" position={on(PLACE.red, 0, 0, -1.2)} rotationY={0} animation="cheer" face="grin" time={t} />
          <FloatingNumber text="1. LOCAL JOBS" color="#4ce87a" position={on(PLACE.red, 0, 2.75, -1.2)} height={0.56 * pop(t, wordAt("5.one", "One"))} />
        </>
      ),
    },
    {
      cue: "5.two",
      ...cam.front({ actor: on(PLACE.red, 0, 0, 3.0), facing: 0, dist: 5.6, to: 4.4, side: 24, pitch: 6, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      note: "Effect #2: Shopper Leo looks stressed beneath rising crimson '2. HIGHER PRICES'.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.red, -1.2, 0, 3.0), on(PLACE.red, 0.8, 0, 3.0), t, 0, 1.3);
        return (
          <>
            <CitizenLead variant="leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "cower"} animDistance={w.animDistance} face="worried" time={t} />
            <FloatingNumber text="2. HIGHER PRICES" color="#ff4f42" position={on(PLACE.red, 0, 2.7, 3.0)} height={0.52 * pop(t, wordAt("5.two", "Two"))} />
          </>
        );
      },
    },
    {
      cue: "5.three2",
      ...cam.frameDuo({ a: on(PLACE.bridge, -1.6, 0, 0.6), b: on(PLACE.bridge, 1.6, 0, 0.6), fromYaw: -20, toYaw: 18, pitch: 8, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Effect #3: Mayor Sterling and Mayor Cobalt point angrily across twin tariff gates beneath '3. HIT BACK'.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -2.2)} drop={1} accent="#1d4ed8" label="REVENGE" />
          <EliteLead variant="pres" position={on(PLACE.bridge, -1.6, 0, 0.6)} rotationY={0.6} animation="point" face="angry" time={t} />
          <EliteLead variant="tycoon" position={on(PLACE.bridge, 1.6, 0, 0.6)} rotationY={-0.6} animation="point" face="angry" time={t} />
          <FloatingNumber text="3. HIT BACK" color="#ff4f42" position={on(PLACE.bridge, 0, 2.85, 0.6)} height={0.58 * pop(t, wordAt("5.three2", "Three"))} />
        </>
      ),
    },
    {
      cue: "5.gov",
      ...cam.heroLow({ on: on(PLACE.red, 0, 1.5, 4.0), dist: 6.4, yaw: -22, fov: 45 }),
      zone: "red",
      look: "overworld-day",
      note: "Low glamorous angle on Mayor Sterling smiling beside a sparkling EmeraldFountain pouring tax revenue.",
      stage: (t) => (
        <>
          <EmeraldFountain position={on(PLACE.red, 0, 0, 3.2)} t={t} />
          <EliteLead variant="pres" position={on(PLACE.red, 1.8, 0, 4.2)} rotationY={-0.35} animation="laugh" face="grin" time={t} />
          <FloatingNumber text="TAX REVENUE" color="#4ce87a" position={on(PLACE.red, 0, 3.2, 3.2)} height={0.54 * pop(t, wordAt("5.gov", "piles"))} />
        </>
      ),
    },
    {
      cue: "5.choice",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.4, 0), dist: 6.4, distTo: 5.2, fromYaw: 28, toYaw: -22, pitch: 8, fov: 44 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Clean visual metaphor: giant brass Balance scale swings across the bridge holding a sword vs emerald coins.",
      stage: (t) => (
        <>
          <Balance
            position={on(PLACE.bridge, 0, 0, 0)}
            tilt={Math.sin(t * 2.8) * 0.25}
            scale={1.15}
            left={<DiamondSword position={[0, 0.45, 0]} scale={0.55} />}
            right={<FloatingNumber text="$$" color="#4ce87a" position={[0, 0.35, 0]} height={0.42} />}
          />
          <Bubble text="NOT FREE!" dark position={on(PLACE.bridge, 0, 2.85, 0)} rotationY={0.15} scale={0.48 * pop(t, wordAt("5.choice", "free"))} />
        </>
      ),
    },
    {
      cue: "5.trade",
      ...cam.twoShot({ a: on(PLACE.bridge, -1.6, 0, 1.2), b: on(PLACE.bridge, 1.6, 0, 1.2), facing: 0, dist: 6.6, to: 5.4, side: 18, pitch: 7, fov: 44 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Balanced two-shot: Leo (cheap goods) vs Sam (local jobs) facing the camera with clear labels overhead.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" position={on(PLACE.bridge, -1.6, 0, 1.2)} rotationY={0.2} animation="wave" face="smile" time={t} />
          <CitizenLead variant="sam" position={on(PLACE.bridge, 1.6, 0, 1.2)} rotationY={-0.2} animation="wave" face="brave" time={t} />
          <FloatingNumber text="CHEAP" color="#52a8ff" position={on(PLACE.bridge, -1.6, 2.45, 1.2)} height={0.48 * pop(t, wordAt("5.trade", "cheap"))} />
          <FloatingNumber text="LOCAL" color="#ff5548" position={on(PLACE.bridge, 1.6, 2.45, 1.2)} height={0.48 * pop(t, wordAt("5.trade", "local"))} />
        </>
      ),
    },
    {
      cue: "5.ask",
      ...cam.front({ actor: on(PLACE.red, 0, 0, -1.5), facing: 0, dist: 5.4, to: 4.2, side: -22, pitch: 5, fov: 42 }),
      zone: "red",
      look: "overworld-day",
      note: "Direct audience question cut A: Sam waves earnestly outside his 12-emerald Red Village smithy.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -3.5)} t={t} bannerColor="#b5332a" />
          <CitizenLead variant="sam" position={on(PLACE.red, 0, 0, -1.5)} rotationY={0} animation="wave" face="smile" time={t} />
          <FloatingNumber text="SAVE SAM?" color="#ffd84d" position={on(PLACE.red, 0, 2.55, -1.5)} height={0.54 * pop(t, wordAt("5.ask", "Sam"))} />
        </>
      ),
    },
    {
      cue: "5.or",
      ...cam.track({ from: on(PLACE.bridge, 0, 0, 5.5), to: on(PLACE.bridge, 0, 0, -1.5), sideDist: 5.8, side: 1, lead: 1.5, height: 1.6 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Direct audience question cut B: Leo sprints happily toward Blue Village's glowing 5-emerald sword.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.bridge, 0, 0, 5.5), on(PLACE.bridge, 0, 0, -1.5), t, 0, 1.5);
        return (
          <>
            <CitizenLead variant="leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
            <FloatingNumber text="OR 5 EMERALDS?" color="#4ce87a" position={on(PLACE.bridge, 0, 2.65, 1.8)} height={0.52 * pop(t, wordAt("5.or", "five"))} />
          </>
        );
      },
    },
    {
      cue: "5.tell",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.3, 1.0), dist: 6.2, distTo: 4.9, fromYaw: 24, toYaw: -18, pitch: 7, fov: 44 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Energetic comment-bait sweep: Leo and Sam wave together beneath bright golden 'COMMENT!'.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" position={on(PLACE.bridge, -1.0, 0, 1.0)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <CitizenLead variant="sam" position={on(PLACE.bridge, 1.0, 0, 1.0)} rotationY={-0.1} animation="cheer" face="grin" time={t} />
          <FloatingNumber text="COMMENT!" color="#ffd84d" position={on(PLACE.bridge, 0, 2.65, 1.0)} height={0.62 * pop(t, wordAt("5.tell", "comments"))} />
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

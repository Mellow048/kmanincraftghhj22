import type React from "react";
import {
  Bread,
  BreadShelf,
  Chest,
  CitizenLead,
  CoinPile,
  DiamondSword,
  FloatingNumber,
  IngotStack,
  LOOP_CAM,
  PLACE,
  SwordShop,
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

/** Scene 1 (Beats 1–2): Seamless Climax Loop Hook + Two Rival Villages & Cheap Bridge Trade. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Two Villages & Cheap Trade",
  shots: [
    {
      cue: "1.hook",
      ...LOOP_CAM,
      zone: "bridge",
      look: "overworld-day",
      note: "Seamless Frame-0 loop hook: peak climax frame where red +10 TARIFF gate slams down as sword jumps 5 -> 15.",
      stage: (t) => loopClimaxStage(t, 0.2),
    },
    {
      cue: "1.jump",
      ...cam.front({ actor: on(PLACE.blue, 0, 0, 2.0), facing: 0, dist: 5.8, to: 4.5, side: -22, pitch: 7, fov: 44 }),
      zone: "blue",
      look: "overworld-day",
      note: "Crisp push-in on Blue Village's glowing diamond sword stall showing a bright green '5' emerald price billboard.",
      stage: (t) => (
        <>
          <SwordShop price={5} position={on(PLACE.blue, 0, 0, 1.4)} t={t} bannerColor="#27549c" />
          <CitizenLead variant="leo" position={on(PLACE.blue, -1.8, 0, 3.4)} rotationY={0.45} animation="wave" face="grin" time={t} />
          <FloatingNumber text="5 EMERALDS" color="#4ce87a" position={on(PLACE.blue, 0, 3.0, 1.4)} height={0.56 * pop(t, wordAt("1.jump", "five"))} />
        </>
      ),
    },
    {
      cue: "1.fifteen",
      ...cam.sweep({ on: on(PLACE.blue, 0, 1.5, 1.6), dist: 6.2, distTo: 4.9, fromYaw: 28, toYaw: -20, pitch: 8, fov: 44 }),
      zone: "blue",
      look: "overworld-day",
      hud: { banner: { text: "5 → 15 EMERALDS", color: "#ff5548", sub: "OVERNIGHT!" } },
      note: "Dramatic parallax sweep as the sword billboard violently snaps to '15' and red '15 EMERALDS' pops overhead.",
      stage: (t) => {
        const jump = t >= wordAt("1.fifteen", "jumps");
        return (
          <>
            <SwordShop price={jump ? 15 : 5} position={on(PLACE.blue, 0, 0, 1.4)} t={t} bannerColor="#d63228" />
            <CitizenLead variant="leo" position={on(PLACE.blue, -1.8, 0, 3.4)} rotationY={0.45} animation={jump ? "panic" : "shrug"} face={jump ? "wow" : "uneasy"} time={t} />
            <FloatingNumber text="15 EMERALDS!" color="#ff4f42" position={on(PLACE.blue, 0, 3.05, 1.4)} height={0.62 * pop(t, wordAt("1.fifteen", "fifteen"))} />
          </>
        );
      },
    },
    {
      cue: "1.two",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 0.5, 0), dist: 11.8, distTo: 9.2, fromYaw: -28, toYaw: 24, pitch: 36, fov: 50 }),
      zone: "bridge",
      look: "overworld-day",
      note: "High sweeping crane overview revealing Red Village on the south bank and Blue Village on the north bank linked by one wooden bridge.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.bridge, 0, 0, -4.5), on(PLACE.bridge, 0, 0, 4.5), t, 0, 1.7);
        return (
          <>
            <CitizenLead variant="leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="smile" time={t} />
            <FloatingNumber text="RED" color="#ff5548" position={on(PLACE.bridge, 0, 2.2, 6.8)} height={0.65 * pop(t, 0.15)} />
            <FloatingNumber text="BLUE" color="#52a8ff" position={on(PLACE.bridge, 0, 2.2, -6.8)} height={0.65 * pop(t, 0.35)} />
          </>
        );
      },
    },
    {
      cue: "1.special",
      ...cam.frameDuo({ a: on(PLACE.bridge, -1.9, 0, 1.4), b: on(PLACE.bridge, 1.9, 0, 1.4), fromYaw: -18, toYaw: 18, pitch: 8, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Split showcase on the bridge: Red baker Maya holds warm bread beside a bakery shelf while Blue smith Alex holds a diamond sword.",
      stage: (t) => (
        <>
          <CitizenLead variant="maya" position={on(PLACE.bridge, -1.9, 0, 1.4)} rotationY={0.2} animation="wave" face="grin" time={t} />
          <BreadShelf position={on(PLACE.bridge, -2.1, 0, -0.4)} count={6} width={2.0} />
          <Bread position={on(PLACE.bridge, -1.3, 1.15 + Math.sin(t * 4) * 0.06, 1.8)} scale={1.3} />
          <CitizenLead variant="alex" position={on(PLACE.bridge, 1.9, 0, 1.4)} rotationY={-0.2} animation="cheer" face="grin" time={t} />
          <DiamondSword position={on(PLACE.bridge, 1.3, 1.3 + Math.sin(t * 4) * 0.06, 1.8)} rotation={[0, t * 2, 0.15]} scale={0.95} />
        </>
      ),
    },
    {
      cue: "2.leo",
      ...cam.streetOverview({ from: on(PLACE.red, 0, 0, 10.5), to: on(PLACE.red, 0, 0, 8.8), on: on(PLACE.red, -0.3, 1.1, 2.2), onTo: on(PLACE.red, -0.3, 1.1, 3.6), height: 4.4, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { clock: "RED VILLAGE" },
      note: "Bright crane down Red Village Main Street as Leo walks forward waving cheerfully.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.red, -1.1, 0, 0.5), on(PLACE.red, -1.1, 0, 4.2), t, 0, 1.4);
        return (
          <>
            <CitizenLead variant="leo" nameTag="LEO" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="grin" time={t} />
            <CitizenLead variant="maya" position={on(PLACE.red, 1.8, 0, 2.2)} rotationY={-0.45} animation="talk" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.sam",
      ...cam.front({ actor: on(PLACE.red, 0, 0, -2.5), facing: 0, dist: 6.2, to: 4.9, side: 22, pitch: 7, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      note: "Front angle on local Red blacksmith Sam standing proudly behind his 12-emerald sword shop.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -3.5)} t={t} bannerColor="#b5332a" />
          <CitizenLead variant="sam" nameTag="SAM" position={on(PLACE.red, 1.6, 0, -1.8)} rotationY={-0.3} animation="talk" face="smile" time={t} />
          <CitizenLead variant="leo" position={on(PLACE.red, -1.5, 0, -0.6)} rotationY={0.5} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "2.cost",
      ...cam.sweep({ on: on(PLACE.red, 0.5, 1.2, -2.2), dist: 5.8, distTo: 4.6, fromYaw: -34, toYaw: 16, pitch: 8, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      note: "Sweeping close view of Sam beside tall costly iron ingot stacks and coin piles explaining local expenses.",
      stage: (t) => (
        <>
          <CitizenLead variant="sam" position={on(PLACE.red, -0.9, 0, -2.2)} rotationY={0.35} animation="shrug" face="worried" time={t} />
          <IngotStack position={on(PLACE.red, 0.9, 0, -2.2)} count={8} />
          <CoinPile position={on(PLACE.red, 1.9, 0, -1.8)} count={14} kind="emerald" seed={3} />
          <FloatingNumber text="HIGH COSTS" color="#ffd84d" position={on(PLACE.red, 0.8, 2.25, -2.2)} height={0.48 * pop(t, wordAt("2.cost", "high"))} />
        </>
      ),
    },
    {
      cue: "2.cross",
      ...cam.track({ from: on(PLACE.bridge, 0, 0, 6.5), to: on(PLACE.bridge, 0, 0, -4.5), sideDist: 6.0, side: 1, lead: 1.5, height: 1.7 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Energetic side tracking shot following Leo briskly walking across the wooden bridge toward Blue Village.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.bridge, 0, 0, 6.5), on(PLACE.bridge, 0, 0, -4.5), t, 0, 1.8);
        return (
          <CitizenLead variant="leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="grin" time={t} />
        );
      },
    },
    {
      cue: "2.five",
      ...cam.frameDuo({ a: on(PLACE.blue, -1.5, 0, 3.0), b: on(PLACE.blue, 1.6, 0, 2.2), fromYaw: -22, toYaw: 18, pitch: 7, fov: 44 }),
      zone: "blue",
      look: "overworld-day",
      hud: { banner: { text: "BLUE: 5 vs RED: 12", color: "#52a8ff" } },
      note: "Blue Village smith Alex beams beside his 5-emerald sword stall as Leo stares in delight.",
      stage: (t) => (
        <>
          <SwordShop price={5} position={on(PLACE.blue, 0, 0, 0.5)} t={t} bannerColor="#27549c" />
          <CitizenLead variant="alex" nameTag="ALEX" position={on(PLACE.blue, 1.6, 0, 2.2)} rotationY={-0.45} animation="wave" face="grin" time={t} />
          <CitizenLead variant="leo" position={on(PLACE.blue, -1.5, 0, 3.0)} rotationY={0.45} animation="cheer" face="wow" time={t} />
          <FloatingNumber text="ONLY 5!" color="#4ce87a" position={on(PLACE.blue, 0, 3.05, 0.8)} height={0.6 * pop(t, wordAt("2.five", "five"))} />
        </>
      ),
    },
    {
      cue: "2.deal",
      ...cam.sweep({ on: on(PLACE.blue, 0, 1.2, 3.0), dist: 5.4, distTo: 4.3, fromYaw: 28, toYaw: -22, pitch: 6, fov: 42 }),
      zone: "blue",
      look: "overworld-day",
      note: "Happy celebration sweep around Leo holding a shiny diamond sword while '+7 SAVED' emerald coins pop.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" position={on(PLACE.blue, -0.4, 0, 3.0)} rotationY={0.15} animation="cheer" face="laugh" time={t} />
          <DiamondSword position={on(PLACE.blue, 0.55, 1.25 + Math.sin(t * 5) * 0.08, 3.1)} rotation={[0, t * 2.5, 0.2]} scale={0.85} />
          <CoinPile position={on(PLACE.blue, -1.5, 0, 3.2)} count={12} kind="emerald" seed={7} />
          <FloatingNumber text="+7 SAVED" color="#4ce87a" position={on(PLACE.blue, 0, 2.45, 3.0)} height={0.55 * pop(t, wordAt("2.deal", "seven"))} />
        </>
      ),
    },
    {
      cue: "2.rush",
      ...cam.track({ from: on(PLACE.bridge, 0, 0, 7.0), to: on(PLACE.bridge, 0, 0, -5.0), sideDist: 6.2, side: -1, lead: 1.5, height: 1.9 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Left-side tracking rush: four Red Village shoppers sprint across the wooden bridge toward Blue Village bargains.",
      stage: (t) => {
        const w1 = moveBetween(on(PLACE.bridge, -1.0, 0, 7.0), on(PLACE.bridge, -1.0, 0, -5.0), t, 0, 1.8);
        const w2 = moveBetween(on(PLACE.bridge, 0.8, 0, 7.6), on(PLACE.bridge, 0.8, 0, -4.4), t, 0, 1.8);
        const w3 = moveBetween(on(PLACE.bridge, -0.1, 0, 5.4), on(PLACE.bridge, -0.1, 0, -6.2), t, 0, 1.8);
        return (
          <>
            <CitizenLead variant="leo" position={w3.position} rotationY={w3.rotationY} animation={w3.moving ? "run" : "cheer"} animDistance={w3.animDistance} face="grin" time={t} />
            <CitizenLead variant="builder" position={w1.position} rotationY={w1.rotationY} animation={w1.moving ? "run" : "wave"} animDistance={w1.animDistance} face="smile" time={t} />
            <CitizenLead variant="maya" position={w2.position} rotationY={w2.rotationY} animation={w2.moving ? "run" : "wave"} animDistance={w2.animDistance} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.empty",
      ...cam.front({ actor: on(PLACE.red, 0, 0, -2.2), facing: 0, dist: 5.8, to: 4.6, side: -24, pitch: 8, fov: 44 }),
      zone: "red",
      look: "overworld-golden",
      note: "Lonely golden-hour push on Sam standing glumly beside two wide-open empty chests outside his quiet sword stall.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -4.0)} t={t} bannerColor="#b5332a" />
          <CitizenLead variant="sam" position={on(PLACE.red, 0, 0, -1.8)} rotationY={0.1} animation="cower" face="sad" time={t} />
          <Chest position={on(PLACE.red, -1.5, 0, -1.8)} open={0.85} gold={0} />
          <Chest position={on(PLACE.red, 1.5, 0, -1.8)} open={0.85} gold={0} />
        </>
      ),
    },
    {
      cue: "2.close",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.3, -2.0), dist: 6.0, distTo: 4.8, fromYaw: 24, toYaw: -22, pitch: 6, fov: 44 }),
      zone: "red",
      look: "overworld-sunset",
      note: "Sunset sweep past Sam as giant crimson '0 BUYERS' flashes overhead.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -4.0)} t={t} bannerColor="#6e2824" />
          <CitizenLead variant="sam" position={on(PLACE.red, 0, 0, -1.8)} rotationY={0} animation="shrug" face="worried" time={t} />
          <FloatingNumber text="0 BUYERS" color="#ff4f42" position={on(PLACE.red, 0, 2.7, -2.0)} height={0.58 * pop(t, wordAt("2.close", "zero"))} />
        </>
      ),
    },
  ],
});

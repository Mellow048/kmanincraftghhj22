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

/** Scene 1 (Beats 1–2): Seamless Climax Loop Hook + Twin Islands & Felint's Bargain Hunt. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Two Islands & Cheap Trade",
  shots: [
    {
      cue: "1.hook",
      ...LOOP_CAM,
      zone: "bridge",
      look: "overworld-day",
      note: "Seamless Frame-0 loop hook: peak climax frame where red +10 TARIFF gate slams down as sword jumps 5 -> 15 with Felint & Sterling fully in frame.",
      stage: (t) => loopClimaxStage(t, 0.2),
    },
    {
      cue: "1.jump",
      ...cam.sweep({ on: on(PLACE.blue, -0.4, 1.4, 2.0), dist: 7.4, distTo: 6.0, fromYaw: -22, toYaw: 16, pitch: 8, fov: 46 }),
      zone: "blue",
      look: "overworld-day",
      hud: { banner: { text: "ONLY 5 EMERALDS", color: "#4ce87a" } },
      note: "Wide crisp push-in on Blue Island's glowing diamond sword stall with Felint fully in frame.",
      stage: (t) => (
        <>
          <SwordShop price={5} position={on(PLACE.blue, 0.3, 0, 1.2)} t={t} bannerColor="#27549c" />
          <CitizenLead variant="leo" position={on(PLACE.blue, -1.6, 0, 3.0)} rotationY={0.45} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "1.fifteen",
      ...cam.sweep({ on: on(PLACE.blue, -0.3, 1.5, 1.8), dist: 7.6, distTo: 6.2, fromYaw: 24, toYaw: -18, pitch: 8, fov: 46 }),
      zone: "blue",
      look: "overworld-day",
      hud: { banner: { text: "5 → 15 EMERALDS!", color: "#ff5548", sub: "OVERNIGHT!" } },
      note: "Dramatic parallax sweep as the sword billboard violently snaps to '15' while Felint panics cleanly inside frame.",
      stage: (t) => {
        const jump = t >= wordAt("1.fifteen", "jumps");
        return (
          <>
            <SwordShop price={jump ? 15 : 5} position={on(PLACE.blue, 0.3, 0, 1.2)} t={t} bannerColor="#d63228" />
            <CitizenLead variant="leo" position={on(PLACE.blue, -1.6, 0, 3.0)} rotationY={0.45} animation={jump ? "panic" : "shrug"} face={jump ? "wow" : "uneasy"} time={t} />
          </>
        );
      },
    },
    {
      cue: "1.two",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 0.6, 0), dist: 16.5, distTo: 13.5, fromYaw: -26, toYaw: 24, pitch: 38, fov: 50 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "RED ISLAND vs BLUE ISLAND", color: "#ffd84d" } },
      note: "High aerial twin-island reveal showing Red Island (south landmass) and Blue Island (north landmass) surrounded by ocean water linked by one oak bridge as Felint walks south facing camera.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.bridge, 0, 0, -4.0), on(PLACE.bridge, 0, 0, 8.2), t, 0, 1.9);
        return (
          <>
            <CitizenLead variant="leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="smile" time={t} />
            <FloatingNumber text="RED" color="#ff5548" position={on(PLACE.bridge, 0, 2.8, 10.5)} height={0.75 * pop(t, 0.15)} />
            <FloatingNumber text="BLUE" color="#52a8ff" position={on(PLACE.bridge, 0, 2.8, -10.5)} height={0.75 * pop(t, 0.35)} />
          </>
        );
      },
    },
    {
      cue: "1.special",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.4, 0), dist: 15.8, distTo: 12.6, fromYaw: 64, toYaw: 112, pitch: 24, fov: 50 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "RED: BREAD · BLUE: SWORDS", color: "#ffd84d" } },
      note: "Side-by-side ocean strait showcase: Maya stands ON RED ISLAND baking bread while Alex stands ON BLUE ISLAND across the water crafting swords!",
      stage: (t) => (
        <>
          {/* Maya on RED ISLAND (south bank z = +9.5) */}
          <CitizenLead variant="maya" position={on(PLACE.bridge, 0, 0, 10.2)} rotationY={Math.PI} animation="wave" face="grin" time={t} />
          <BreadShelf position={on(PLACE.bridge, -2.2, 0, 10.2)} rotationY={Math.PI / 2} count={6} width={2.0} />
          <Bread position={on(PLACE.bridge, 0, 2.3 + Math.sin(t * 4) * 0.08, 10.2)} scale={1.8} />
          {/* Alex on BLUE ISLAND (north bank z = -9.5 across open water!) */}
          <CitizenLead variant="alex" position={on(PLACE.bridge, 0, 0, -10.2)} rotationY={0} animation="cheer" face="grin" time={t} />
          <DiamondSword position={on(PLACE.bridge, 0, 2.5 + Math.sin(t * 4) * 0.08, -10.2)} rotation={[0, t * 2, 0.15]} scale={1.35} />
        </>
      ),
    },
    {
      cue: "2.felint",
      ...cam.streetOverview({ from: on(PLACE.red, 0, 0, 11.2), to: on(PLACE.red, 0, 0, 9.2), on: on(PLACE.red, -0.2, 1.1, 2.2), onTo: on(PLACE.red, -0.2, 1.1, 3.6), height: 4.4, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { clock: "RED ISLAND" },
      note: "Bright crane down Red Island Main Street as Felint walks forward waving cheerfully.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.red, -1.1, 0, 0.5), on(PLACE.red, -1.1, 0, 4.2), t, 0, 1.4);
        return (
          <>
            <CitizenLead variant="leo" nameTag="FELINT" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="grin" time={t} />
            <CitizenLead variant="maya" position={on(PLACE.red, 1.8, 0, 2.2)} rotationY={-0.45} animation="talk" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.sam",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.4, -2.0), dist: 7.8, distTo: 6.4, fromYaw: 24, toYaw: -18, pitch: 8, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "SAM'S PRICE: 12 EMERALDS", color: "#ffd84d" } },
      note: "Wide front sweep on local Red blacksmith Sam standing proudly behind his 12-emerald sword shop while Felint looks on.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -3.5)} t={t} bannerColor="#b5332a" />
          <CitizenLead variant="sam" nameTag="SAM" position={on(PLACE.red, 1.6, 0, -1.6)} rotationY={-0.3} animation="talk" face="smile" time={t} />
          <CitizenLead variant="leo" position={on(PLACE.red, -1.6, 0, -0.8)} rotationY={0.5} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "2.cost",
      ...cam.sweep({ on: on(PLACE.red, 0.4, 1.2, -2.2), dist: 7.0, distTo: 5.6, fromYaw: -30, toYaw: 16, pitch: 8, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "HIGH LOCAL IRON COSTS", color: "#ffd84d" } },
      note: "Wide sweeping view of Sam beside tall costly iron ingot stacks and emerald piles explaining local expenses.",
      stage: (t) => (
        <>
          <CitizenLead variant="sam" position={on(PLACE.red, -1.0, 0, -2.2)} rotationY={0.35} animation="shrug" face="worried" time={t} />
          <IngotStack position={on(PLACE.red, 0.9, 0, -2.2)} count={8} />
          <CoinPile position={on(PLACE.red, 2.0, 0, -1.8)} count={14} kind="emerald" seed={3} />
        </>
      ),
    },
    {
      cue: "2.cross",
      ...cam.track({ from: on(PLACE.bridge, 0, 0, 8.8), to: on(PLACE.bridge, 0, 0, -9.0), sideDist: 8.2, side: 1, lead: 1.5, height: 2.2 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { clock: "TO BLUE ISLAND →" },
      note: "Wide tracking shot over the open blue ocean strait as Felint crosses from Red Island all the way onto Blue Island on the other side!",
      stage: (t) => {
        const w = moveBetween(on(PLACE.bridge, 0, 0, 8.8), on(PLACE.bridge, 0, 0, -9.0), t, 0, 2.1);
        return (
          <>
            <CitizenLead variant="leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="grin" time={t} />
            <CitizenLead variant="alex" position={on(PLACE.bridge, 1.6, 0, -10.4)} rotationY={-0.3} animation="wave" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.five",
      ...cam.frameDuo({ a: on(PLACE.blue, -1.5, 0, 3.0), b: on(PLACE.blue, 1.6, 0, 2.2), fromYaw: -20, toYaw: 18, pitch: 8, fov: 46 }),
      zone: "blue",
      look: "overworld-day",
      hud: { banner: { text: "BLUE: 5 vs RED: 12", color: "#52a8ff" } },
      note: "Blue Island smith Alex beams beside his 5-emerald sword stall as Felint cheers in delight.",
      stage: (t) => (
        <>
          <SwordShop price={5} position={on(PLACE.blue, 0, 0, 0.3)} t={t} bannerColor="#27549c" />
          <CitizenLead variant="alex" nameTag="ALEX" position={on(PLACE.blue, 1.6, 0, 2.2)} rotationY={-0.45} animation="wave" face="grin" time={t} />
          <CitizenLead variant="leo" position={on(PLACE.blue, -1.5, 0, 3.0)} rotationY={0.45} animation="cheer" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "2.deal",
      ...cam.sweep({ on: on(PLACE.blue, 0, 1.2, 3.0), dist: 6.4, distTo: 5.2, fromYaw: 24, toYaw: -20, pitch: 7, fov: 44 }),
      zone: "blue",
      look: "overworld-day",
      hud: { banner: { text: "+7 EMERALDS SAVED!", color: "#4ce87a" } },
      note: "Happy celebration sweep around Felint holding his shiny diamond sword beside emerald savings.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" position={on(PLACE.blue, -0.4, 0, 3.0)} rotationY={0.15} animation="cheer" face="laugh" time={t} />
          <DiamondSword position={on(PLACE.blue, 0.75, 1.25 + Math.sin(t * 5) * 0.08, 3.1)} rotation={[0, t * 2.5, 0.2]} scale={0.85} />
          <CoinPile position={on(PLACE.blue, -1.6, 0, 3.2)} count={12} kind="emerald" seed={7} />
        </>
      ),
    },
    {
      cue: "2.rush",
      ...cam.track({ from: on(PLACE.bridge, 0, 0, 8.5), to: on(PLACE.bridge, 0, 0, -6.5), sideDist: 7.8, side: -1, lead: 1.5, height: 2.2 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Wider left-side tracking rush across the sea bridge: Red Island shoppers sprint over to Blue Island for cheap swords.",
      stage: (t) => {
        const w1 = moveBetween(on(PLACE.bridge, -1.2, 0, 8.5), on(PLACE.bridge, -1.2, 0, -6.0), t, 0, 1.8);
        const w2 = moveBetween(on(PLACE.bridge, 1.1, 0, 9.0), on(PLACE.bridge, 1.1, 0, -5.5), t, 0, 1.8);
        const w3 = moveBetween(on(PLACE.bridge, 0, 0, 6.4), on(PLACE.bridge, 0, 0, -7.8), t, 0, 1.8);
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
      ...cam.sweep({ on: on(PLACE.red, 0, 1.3, -2.0), dist: 7.4, distTo: 6.0, fromYaw: -22, toYaw: 18, pitch: 8, fov: 46 }),
      zone: "red",
      look: "overworld-golden",
      note: "Wide golden-hour sweep on Sam standing glumly beside two wide-open empty chests outside his quiet sword stall.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -4.0)} t={t} bannerColor="#b5332a" />
          <CitizenLead variant="sam" position={on(PLACE.red, 0, 0, -1.8)} rotationY={0.1} animation="cower" face="sad" time={t} />
          <Chest position={on(PLACE.red, -1.7, 0, -1.8)} open={0.85} gold={0} />
          <Chest position={on(PLACE.red, 1.7, 0, -1.8)} open={0.85} gold={0} />
        </>
      ),
    },
    {
      cue: "2.close",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.3, -2.0), dist: 7.4, distTo: 6.0, fromYaw: 22, toYaw: -20, pitch: 8, fov: 46 }),
      zone: "red",
      look: "overworld-golden",
      hud: { banner: { text: "0 BUYERS — SHUTTING DOWN?", color: "#ff5548" } },
      note: "Warm dusk sweep past Sam beneath a crisp '0 BUYERS' banner (no sun blow-out).",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, 0, 0, -4.0)} t={t} bannerColor="#6e2824" />
          <CitizenLead variant="sam" position={on(PLACE.red, 0, 0, -1.8)} rotationY={0} animation="shrug" face="worried" time={t} />
        </>
      ),
    },
  ],
});

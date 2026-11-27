import type React from "react";
import {
  BarChart,
  BreadShelf,
  Bubble,
  Chest,
  CitizenLead,
  CoinPile,
  CompareChestPair,
  EliteLead,
  PLACE,
  TariffGate,
  cam,
  ease,
  moveBetween,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 3 (Beat 4): The Checkout Twist (Felint Pays!) + Blue Island Revenge Tariff Trade War. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Who Really Pays & Trade War",
  shots: [
    {
      cue: "4.wait",
      ...cam.front({ actor: on(PLACE.red, 0, 0, 2.0), facing: 0, dist: 6.2, to: 4.9, side: -22, pitch: 6, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "WHO ACTUALLY PAID?", color: "#ffd84d" } },
      note: "Record-scratch push on puzzled Felint beneath crisp unclipped HUD banner 'WHO ACTUALLY PAID?'",
      stage: (t) => (
        <CitizenLead variant="leo" nameTag="FELINT" position={on(PLACE.red, 0, 0, 2.0)} rotationY={0} animation="shrug" face="wow" time={t} />
      ),
    },
    {
      cue: "4.notblue",
      ...cam.sweep({ on: on(PLACE.blue, 0.2, 1.2, 2.2), dist: 6.8, distTo: 5.5, fromYaw: 24, toYaw: -18, pitch: 8, fov: 44 }),
      zone: "blue",
      look: "overworld-day",
      hud: { banner: { text: "ALEX STILL KEEPS 5", color: "#52a8ff" } },
      note: "Blue Island smith Alex calmly counts his usual 5 emerald coins with a relaxed smile.",
      stage: (t) => (
        <>
          <CitizenLead variant="alex" position={on(PLACE.blue, -0.6, 0, 2.2)} rotationY={0.2} animation="wave" face="grin" time={t} />
          <CoinPile position={on(PLACE.blue, 1.1, 0, 2.4)} count={8} kind="emerald" seed={21} />
          <Bubble text="STILL 5!" dark position={on(PLACE.blue, -0.6, 2.35, 2.2)} rotationY={0.2} scale={0.44 * pop(t, wordAt("4.notblue", "five"))} />
        </>
      ),
    },
    {
      cue: "4.felintpays",
      ...cam.frameDuo({ a: on(PLACE.red, -1.2, 0, 2.0), b: on(PLACE.red, 1.3, 0, 2.0), fromYaw: -18, toYaw: 20, pitch: 7, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "FELINT PAYS MORE!", color: "#ff5548", sub: "THE BUYER PAYS IT" } },
      note: "Felint hands a tall 12-emerald stack over to Sam looking shocked at how much extra he paid.",
      stage: (t) => {
        const pay = moveBetween(on(PLACE.red, -2.5, 0, 2.2), on(PLACE.red, -1.2, 0, 2.0), t, 0, 1.2);
        return (
          <>
            <CitizenLead variant="leo" position={pay.position} rotationY={pay.rotationY} animation={pay.moving ? "walk" : "cower"} animDistance={pay.animDistance} face="sad" time={t} />
            <CitizenLead variant="sam" position={on(PLACE.red, 1.3, 0, 2.0)} rotationY={-0.6} animation="reach" face="smile" time={t} />
            <CoinPile position={on(PLACE.red, 0.05, 0, 2.2)} count={16} kind="emerald" seed={22} />
          </>
        );
      },
    },
    {
      cue: "4.before",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.1, -1.2), dist: 8.2, distTo: 7.0, fromYaw: -22, toYaw: 12, pitch: 11, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "BEFORE: 5 EMERALDS", color: "#4ce87a" } },
      note: "Wide comparison chest view so BOTH left ('BEFORE: 5') and right ('AFTER: 12') chests stay 100% unclipped inside 9:16 as Felint points at the modest 5-emerald pile!",
      stage: (t) => {
        const k = Math.min(3, 1 + Math.floor(ease(ramp(t, 0, 1.0)) * 2.9));
        return (
          <>
            <CompareChestPair position={on(PLACE.red, 0, 0, -1.2)} leftLabel="BEFORE: 5" rightLabel="AFTER: 12" leftCount={k} rightCount={8} />
            <CitizenLead variant="leo" position={on(PLACE.red, -2.5, 0, -0.6)} rotationY={0.45} animation="point" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.after",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.1, -1.2), dist: 8.2, distTo: 7.0, fromYaw: 12, toYaw: 24, pitch: 11, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "NOW: 12 MINIMUM!", color: "#ff5548" } },
      note: "Wide sweep across to the overflowing right 'AFTER: 12' chest climbing higher while Felint panics.",
      stage: (t) => {
        const rightK = Math.min(10, 4 + Math.floor(ease(ramp(t, 0, 1.2)) * 6.5));
        return (
          <>
            <CompareChestPair position={on(PLACE.red, 0, 0, -1.2)} leftLabel="BEFORE: 5" rightLabel="AFTER: 12" leftCount={3} rightCount={rightK} />
            <CitizenLead variant="leo" position={on(PLACE.red, 2.5, 0, -0.6)} rotationY={-0.45} animation="panic" face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.mad",
      ...cam.heroLow({ on: on(PLACE.blue, 0, 1.3, 2.0), dist: 6.8, yaw: 20, fov: 46 }),
      zone: "blue",
      look: "overworld-golden",
      note: "Low dramatic golden-hour angle on Blue Island Mayor Cobalt fuming furiously over Sterling's red border gate.",
      stage: (t) => (
        <>
          <EliteLead variant="tycoon" nameTag="COBALT" position={on(PLACE.blue, 0, 0, 2.0)} rotationY={0.2} animation="point" face="angry" time={t} />
          <Bubble text="OH YEAH?!" dark position={on(PLACE.blue, 0, 2.45, 2.0)} rotationY={0.25} scale={0.44 * pop(t, wordAt("4.mad", "Cobalt"))} />
        </>
      ),
    },
    {
      cue: "4.revenge",
      ...cam.heroLow({ on: on(PLACE.bridge, 0, 1.7, -5.6), dist: 8.6, yaw: -20, fov: 48 }),
      zone: "bridge",
      look: "overworld-golden",
      hud: { banner: { text: "REVENGE TAX ON BREAD!", color: "#52a8ff" } },
      note: "Mayor Cobalt stands on Blue Island slamming down a blue 'BREAD TAX' border gate on the north entrance of the bridge.",
      stage: (t) => {
        const drop = ease(ramp(t, wordAt("4.revenge", "slams") - 0.1, wordAt("4.revenge", "slams") + 0.35));
        return (
          <>
            <TariffGate position={on(PLACE.bridge, 0, 0, -6.2)} drop={drop} accent="#1d4ed8" label="BREAD TAX" />
            <EliteLead variant="tycoon" position={on(PLACE.bridge, -1.8, 0, -3.6)} rotationY={0.4} animation="point" face="angry" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.baker",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.3, 2.4), dist: 6.8, distTo: 5.5, fromYaw: -26, toYaw: 18, pitch: 8, fov: 44 }),
      zone: "red",
      look: "overworld-golden",
      hud: { banner: { text: "0 FOREIGN SALES", color: "#ff5548" } },
      note: "FIXED SUN GLARE: Warm balanced golden-hour sweep on Red baker Maya beside unsold bread shelves — zero white sun washout!",
      stage: (t) => (
        <>
          <BreadShelf position={on(PLACE.red, 0, 0, 1.1)} count={8} width={2.4} />
          <CitizenLead variant="maya" nameTag="MAYA" position={on(PLACE.red, 0, 0, 3.0)} rotationY={0.1} animation="cower" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "4.war",
      ...cam.top({ on: on(PLACE.bridge, 0, 0.8, 0), height: 15.8, to: 12.6, spin: [14, -14], fov: 50 }),
      zone: "bridge",
      look: "overworld-golden",
      hud: { clock: "TRADE WAR", banner: { text: "BOTH ISLANDS LOCKED DOWN!", color: "#ff5548" } },
      note: "Wide spinning overhead view of BOTH Red Island's red gate (south) and Blue Island's blue gate (north) slamming shut across the ocean bridge!",
      stage: (t) => {
        const k = ease(ramp(t, 0, 0.7));
        return (
          <>
            <TariffGate position={on(PLACE.bridge, 0, 0, 5.4)} drop={0.35 + 0.65 * k} accent="#d63228" label="RED TARIFF" />
            <TariffGate position={on(PLACE.bridge, 0, 0, -5.4)} drop={0.35 + 0.65 * k} accent="#1d4ed8" label="BLUE TARIFF" />
            <EliteLead variant="pres" position={on(PLACE.bridge, -1.6, 0, 7.6)} rotationY={Math.PI} animation="point" face="angry" time={t} />
            <EliteLead variant="tycoon" position={on(PLACE.bridge, 1.6, 0, -7.6)} rotationY={0} animation="point" face="angry" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.stacks",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.6, 0), dist: 8.8, distTo: 7.4, fromYaw: -26, toYaw: 20, pitch: 10, fov: 48 }),
      zone: "bridge",
      look: "overworld-golden",
      hud: { banner: { text: "PRICES SPIKE EVERYWHERE", color: "#ff5548" } },
      note: "Wide view of rising crimson price bars towering between half-empty chests across the blocked ocean bridge.",
      stage: (t) => {
        const k = ease(ramp(t, 0, 1.6));
        return (
          <>
            <BarChart
              position={on(PLACE.bridge, 0, 0, -0.5)}
              values={[2.9, 2.6, 2.4]}
              grow={k}
              colors={["#ff5548", "#ffd84d", "#52a8ff"]}
              labels={["SWORD", "BREAD", "TOOLS"]}
            />
            <Chest position={on(PLACE.bridge, -2.5, 0, 1.5)} open={0.8} gold={0.15} />
            <Chest position={on(PLACE.bridge, 2.5, 0, 1.5)} open={0.8} gold={0.15} />
          </>
        );
      },
    },
  ],
});

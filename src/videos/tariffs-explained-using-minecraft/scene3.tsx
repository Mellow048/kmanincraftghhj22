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
  FloatingNumber,
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

/** Scene 3 (Beat 4): The Checkout Twist (Who Pays?) + Blue Village Revenge Tariff Trade War. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Who Really Pays & Trade War",
  shots: [
    {
      cue: "4.wait",
      ...cam.front({ actor: on(PLACE.red, 0, 0, 2.0), facing: 0, dist: 5.2, to: 3.9, side: -24, pitch: 5, fov: 42 }),
      zone: "red",
      look: "overworld-day",
      note: "Record-scratch push on puzzled Leo holding his wallet while giant yellow 'WHO PAID?' pops overhead.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" position={on(PLACE.red, 0, 0, 2.0)} rotationY={0} animation="shrug" face="wow" time={t} />
          <FloatingNumber text="WHO PAID?" color="#ffd84d" position={on(PLACE.red, 0, 2.55, 2.0)} height={0.58 * pop(t, wordAt("4.wait", "who"))} />
        </>
      ),
    },
    {
      cue: "4.notblue",
      ...cam.sweep({ on: on(PLACE.blue, 0, 1.2, 2.2), dist: 5.8, distTo: 4.6, fromYaw: 28, toYaw: -18, pitch: 7, fov: 44 }),
      zone: "blue",
      look: "overworld-day",
      note: "Blue Village smith Alex calmly counts his usual 5 emerald coins with a relaxed smile.",
      stage: (t) => (
        <>
          <CitizenLead variant="alex" position={on(PLACE.blue, -0.5, 0, 2.2)} rotationY={0.2} animation="wave" face="grin" time={t} />
          <CoinPile position={on(PLACE.blue, 1.1, 0, 2.4)} count={8} kind="emerald" seed={21} />
          <Bubble text="STILL 5!" dark position={on(PLACE.blue, -0.5, 2.35, 2.2)} rotationY={0.2} scale={0.46 * pop(t, wordAt("4.notblue", "five"))} />
        </>
      ),
    },
    {
      cue: "4.leopays",
      ...cam.twoShot({ a: on(PLACE.red, -1.2, 0, 2.0), b: on(PLACE.red, 1.2, 0, 2.0), facing: 0, dist: 6.0, to: 4.8, side: 20, pitch: 6, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      note: "Leo hands a tall 12-emerald stack over to Sam looking shocked at how much extra he paid.",
      stage: (t) => {
        const pay = moveBetween(on(PLACE.red, -2.4, 0, 2.2), on(PLACE.red, -1.0, 0, 2.0), t, 0, 1.2);
        return (
          <>
            <CitizenLead variant="leo" position={pay.position} rotationY={pay.rotationY} animation={pay.moving ? "walk" : "cower"} animDistance={pay.animDistance} face="sad" time={t} />
            <CitizenLead variant="sam" position={on(PLACE.red, 1.3, 0, 2.0)} rotationY={-0.6} animation="reach" face="smile" time={t} />
            <CoinPile position={on(PLACE.red, 0.1, 0, 2.2)} count={16} kind="emerald" seed={22} />
            <FloatingNumber text="LEO PAYS!" color="#ff4f42" position={on(PLACE.red, 0, 2.65, 2.0)} height={0.56 * pop(t, wordAt("4.leopays", "Leo"))} />
          </>
        );
      },
    },
    {
      cue: "4.before",
      ...cam.front({ actor: on(PLACE.red, -1.0, 0.5, -1.0), facing: 0, dist: 5.8, to: 4.6, side: -18, pitch: 10, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      note: "Clean twin comparison chest setup highlighting the left 'BEFORE' chest at just 5 emeralds.",
      stage: (t) => (
        <>
          <CompareChestPair position={on(PLACE.red, 0, 0, -1.2)} leftLabel="BEFORE: 5" rightLabel="AFTER: 12" leftCount={3} rightCount={8} />
          <FloatingNumber text="5" color="#4ce87a" position={on(PLACE.red, -1.0, 2.65, -1.2)} height={0.72 * pop(t, wordAt("4.before", "five"))} />
        </>
      ),
    },
    {
      cue: "4.after",
      ...cam.sweep({ on: on(PLACE.red, 0.5, 1.0, -1.2), dist: 6.2, distTo: 5.0, fromYaw: -22, toYaw: 24, pitch: 10, fov: 44 }),
      zone: "red",
      look: "overworld-day",
      note: "Sweep across to the overflowing right 'AFTER: 12' chest showing Leo's minimum price more than doubled.",
      stage: (t) => (
        <>
          <CompareChestPair position={on(PLACE.red, 0, 0, -1.2)} leftLabel="BEFORE: 5" rightLabel="AFTER: 12" leftCount={3} rightCount={8} />
          <FloatingNumber text="12 MIN!" color="#ff4f42" position={on(PLACE.red, 1.0, 2.65, -1.2)} height={0.68 * pop(t, wordAt("4.after", "twelve"))} />
        </>
      ),
    },
    {
      cue: "4.mad",
      ...cam.heroLow({ on: on(PLACE.blue, 0, 1.3, 2.0), dist: 5.8, yaw: 22, fov: 44 }),
      zone: "blue",
      look: "overworld-sunset",
      note: "Low dramatic sunset angle on Blue Village Mayor Cobalt fuming furiously over Sterling's red border gate.",
      stage: (t) => (
        <>
          <EliteLead variant="tycoon" nameTag="COBALT" position={on(PLACE.blue, 0, 0, 2.0)} rotationY={0.2} animation="point" face="angry" time={t} />
          <Bubble text="OH YEAH?!" dark position={on(PLACE.blue, 0, 2.45, 2.0)} rotationY={0.3} scale={0.48 * pop(t, wordAt("4.mad", "Cobalt"))} />
        </>
      ),
    },
    {
      cue: "4.revenge",
      ...cam.heroLow({ on: on(PLACE.bridge, 0, 1.7, -3.5), dist: 7.4, yaw: -22, fov: 46 }),
      zone: "bridge",
      look: "overworld-sunset",
      note: "Mayor Cobalt slams down a matching blue '+10 BREAD TAX' border gate on the north side of the bridge.",
      stage: (t) => {
        const drop = ease(ramp(t, wordAt("4.revenge", "slams") - 0.1, wordAt("4.revenge", "slams") + 0.35));
        return (
          <>
            <TariffGate position={on(PLACE.bridge, 0, 0, -4.0)} drop={drop} accent="#1d4ed8" label="BREAD TAX" />
            <EliteLead variant="tycoon" position={on(PLACE.bridge, -1.9, 0, -1.6)} rotationY={0.4} animation="point" face="angry" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.baker",
      ...cam.front({ actor: on(PLACE.red, 0, 0, 3.0), facing: 0, dist: 5.8, to: 4.6, side: 20, pitch: 7, fov: 44 }),
      zone: "red",
      look: "overworld-sunset",
      note: "Red baker Maya slumps beside full shelves of unsold bread as her foreign buyers vanish.",
      stage: (t) => (
        <>
          <BreadShelf position={on(PLACE.red, 0, 0, 1.4)} count={8} width={2.4} />
          <CitizenLead variant="maya" nameTag="MAYA" position={on(PLACE.red, 0, 0, 3.0)} rotationY={0.1} animation="cower" face="sad" time={t} />
          <FloatingNumber text="0 SALES" color="#ff4f42" position={on(PLACE.red, 0, 2.6, 2.6)} height={0.56 * pop(t, wordAt("4.baker", "vanish"))} />
        </>
      ),
    },
    {
      cue: "4.war",
      ...cam.top({ on: on(PLACE.bridge, 0, 0.8, 0), height: 10.6, to: 8.2, spin: [16, -16], fov: 50 }),
      zone: "bridge",
      look: "overworld-sunset",
      note: "Spinning overhead reveal of BOTH red and blue border gates slammed shut across the bridge in a full trade war.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, 3.2)} drop={1} accent="#d63228" label="RED TARIFF" />
          <TariffGate position={on(PLACE.bridge, 0, 0, -3.2)} drop={1} accent="#1d4ed8" label="BLUE TARIFF" />
          <FloatingNumber text="TRADE WAR" color="#ff4f42" position={on(PLACE.bridge, 0, 4.4, 0)} height={0.8 * pop(t, wordAt("4.war", "war"))} />
        </>
      ),
    },
    {
      cue: "4.stacks",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.6, 0), dist: 7.4, distTo: 6.0, fromYaw: -30, toYaw: 20, pitch: 9, fov: 46 }),
      zone: "bridge",
      look: "overworld-sunset",
      note: "Rising crimson price bars tower between half-empty chests on both sides of the blocked bridge.",
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

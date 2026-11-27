import type React from "react";
import {
  Bubble,
  CitizenLead,
  CoinPile,
  EliteLead,
  FloatingNumber,
  Official,
  PLACE,
  RuleBoard,
  SwordShop,
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

/** Scene 2 (Beat 3): Mayor Sterling Slams Down the +10 Border Tariff Gate & Math Breakdown. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The +10 Border Tariff",
  shots: [
    {
      cue: "3.beg",
      ...cam.track({ from: on(PLACE.red, 0, 0, 7.5), to: on(PLACE.red, 0, 0, 1.5), sideDist: 5.8, side: 1, lead: 1.5, height: 1.6 }),
      zone: "red",
      look: "overworld-day",
      note: "Fast side tracking shot as Sam sprints up Red Village Street toward Mayor Sterling standing in crisp navy coat.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.red, 0, 0, 7.5), on(PLACE.red, 0, 0, 2.2), t, 0, 1.5);
        return (
          <>
            <CitizenLead variant="sam" position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "reach"} animDistance={w.animDistance} face="worried" time={t} />
            <EliteLead variant="pres" nameTag="STERLING" position={on(PLACE.red, 0.2, 0, 0.3)} rotationY={0} animation="talk" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.idea",
      ...cam.heroLow({ on: on(PLACE.bridge, 0, 1.6, 0), dist: 7.4, yaw: -18, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Low heroic power angle on the bridge: Mayor Sterling grins as the red striped border gate slams down hard.",
      stage: (t) => {
        const drop = ease(ramp(t, wordAt("3.idea", "slams") - 0.1, wordAt("3.idea", "slams") + 0.35));
        return (
          <>
            <TariffGate position={on(PLACE.bridge, 0, 0, -1.0)} drop={drop} accent="#d63228" label="+10 TARIFF" />
            <EliteLead variant="pres" position={on(PLACE.bridge, 1.9, 0, 1.4)} rotationY={-0.35} animation="point" face="grin" time={t} />
            <CitizenLead variant="sam" position={on(PLACE.bridge, -1.9, 0, 1.6)} rotationY={0.4} animation="cheer" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.rule",
      ...cam.front({ actor: on(PLACE.bridge, 0, 0, 1.0), facing: 0, dist: 6.2, to: 5.0, side: 24, pitch: 8, fov: 44 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Mayor Sterling stamps an official border decree onto a RuleBoard beside a customs guard.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -1.8)} drop={1} accent="#d63228" label="+10 TARIFF" />
          <RuleBoard mode="order" position={on(PLACE.bridge, -1.3, 0, 0.6)} rotationY={0.25} />
          <EliteLead variant="pres" position={on(PLACE.bridge, 1.0, 0, 1.0)} rotationY={-0.3} animation="point" face="grin" time={t} />
          <Official role="mod" position={on(PLACE.bridge, 2.4, 0, -0.5)} rotationY={-0.2} animation="talk" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "3.tax",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.4, -0.5), dist: 6.6, distTo: 5.2, fromYaw: 30, toYaw: -18, pitch: 6, fov: 44 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Sweeping close look at the closed red customs arm blocking Leo as '+10 EMERALDS' pops overhead.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -1.0)} drop={1} accent="#d63228" label="+10 TARIFF" />
          <CitizenLead variant="leo" position={on(PLACE.bridge, -0.6, 0, 1.2)} rotationY={0.2} animation="panic" face="wow" time={t} />
          <Official role="mod" position={on(PLACE.bridge, 1.5, 0, 0.8)} rotationY={-0.45} animation="point" face="angry" time={t} />
          <FloatingNumber text="+10 EMERALDS" color="#ff4f42" position={on(PLACE.bridge, 0, 2.75, 0.4)} height={0.56 * pop(t, wordAt("3.tax", "Ten"))} />
        </>
      ),
    },
    {
      cue: "3.name",
      ...cam.heroLow({ on: on(PLACE.bridge, 0, 2.0, -1.0), dist: 6.8, yaw: 20, fov: 45 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Bold signature title beat: giant golden 'TARIFF' pops crisp above the striped red border gate.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -1.0)} drop={1} accent="#d63228" label="TARIFF" />
          <FloatingNumber text="TARIFF" color="#ffd84d" position={on(PLACE.bridge, 0, 4.45, -0.8)} height={0.78 * pop(t, wordAt("3.name", "tariff"))} />
          <EliteLead variant="pres" position={on(PLACE.bridge, 2.1, 0, 1.2)} rotationY={-0.3} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "3.math",
      ...cam.twoShot({ a: on(PLACE.bridge, -1.4, 0, 1.6), b: on(PLACE.bridge, 1.4, 0, 1.6), facing: 0, dist: 6.4, to: 5.2, side: -20, pitch: 8, fov: 44 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Visual arithmetic on the bridge: 5 emerald stack on the left plus 10 red customs tax emeralds on the right.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -1.8)} drop={1} accent="#d63228" label="+10 TARIFF" />
          <CoinPile position={on(PLACE.bridge, -1.4, 0, 1.6)} count={8} kind="emerald" seed={11} />
          <CoinPile position={on(PLACE.bridge, 1.4, 0, 1.6)} count={16} kind="gold" seed={12} />
          <FloatingNumber text="5" color="#4ce87a" position={on(PLACE.bridge, -1.4, 1.9, 1.6)} height={0.72 * pop(t, wordAt("3.math", "five"))} />
          <FloatingNumber text="+ 10" color="#ff4f42" position={on(PLACE.bridge, 1.4, 1.9, 1.6)} height={0.72 * pop(t, wordAt("3.math", "ten"))} />
        </>
      ),
    },
    {
      cue: "3.total",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.5, 1.8), dist: 6.2, distTo: 4.9, fromYaw: -26, toYaw: 22, pitch: 8, fov: 44 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Shop counter reveal: Blue sword price snaps violently to 15 emeralds as Leo recoils in shock.",
      stage: (t) => (
        <>
          <SwordShop price={15} position={on(PLACE.bridge, 0, 0, 1.0)} t={t} bannerColor="#27549c" />
          <CitizenLead variant="leo" position={on(PLACE.bridge, -1.8, 0, 2.8)} rotationY={0.5} animation="panic" face="fear" time={t} />
          <FloatingNumber text="= 15!" color="#ff4f42" position={on(PLACE.bridge, 0, 3.1, 1.2)} height={0.68 * pop(t, wordAt("3.total", "fifteen"))} />
        </>
      ),
    },
    {
      cue: "3.switch",
      ...cam.twoShot({ a: on(PLACE.red, -1.7, 0, -1.0), b: on(PLACE.red, 1.7, 0, -1.0), facing: 0, dist: 7.4, to: 6.2, side: 16, pitch: 8, fov: 46 }),
      zone: "red",
      look: "overworld-day",
      note: "Side-by-side comparison on Red Street: Sam's 12-emerald sword beats the taxed 15-emerald Blue sword.",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, -1.7, 0, -2.5)} t={t} bannerColor="#b5332a" />
          <SwordShop price={15} position={on(PLACE.red, 1.7, 0, -2.5)} t={t} bannerColor="#27549c" />
          <CitizenLead variant="sam" position={on(PLACE.red, -1.7, 0, 0.2)} rotationY={0.15} animation="cheer" face="grin" time={t} />
          <Bubble text="CHEAPER!" dark position={on(PLACE.red, -1.7, 2.35, 0.2)} rotationY={0.25} scale={0.46 * pop(t, wordAt("3.switch", "cheap"))} />
        </>
      ),
    },
    {
      cue: "3.cheer",
      ...cam.track({ from: on(PLACE.red, 0, 0, 6.0), to: on(PLACE.red, 0, 0, 0.0), sideDist: 5.8, side: -1, lead: 1.5, height: 1.6 }),
      zone: "red",
      look: "overworld-day",
      note: "Joyful tracking shot down Red Street as local shoppers walk back into Sam's stall while Sam cheers.",
      stage: (t) => {
        const w1 = moveBetween(on(PLACE.red, -0.8, 0, 6.2), on(PLACE.red, -0.8, 0, 0.6), t, 0, 1.6);
        const w2 = moveBetween(on(PLACE.red, 0.9, 0, 6.8), on(PLACE.red, 0.9, 0, 1.4), t, 0, 1.6);
        return (
          <>
            <SwordShop price={12} position={on(PLACE.red, 0, 0, -2.5)} t={t} bannerColor="#b5332a" />
            <CitizenLead variant="sam" position={on(PLACE.red, 1.8, 0, -1.4)} rotationY={-0.3} animation="cheer" face="laugh" time={t} />
            <CitizenLead variant="leo" position={w1.position} rotationY={w1.rotationY} animation={w1.moving ? "walk" : "shrug"} animDistance={w1.animDistance} face="uneasy" time={t} />
            <CitizenLead variant="builder" position={w2.position} rotationY={w2.rotationY} animation={w2.moving ? "walk" : "talk"} animDistance={w2.animDistance} face="smile" time={t} />
          </>
        );
      },
    },
  ],
});

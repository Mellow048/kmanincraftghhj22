import type React from "react";
import {
  Bubble,
  CitizenLead,
  CoinPile,
  EliteLead,
  FloatingNumber,
  Official,
  PLACE,
  StandingRuleSign,
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
      ...cam.track({ from: on(PLACE.red, 0, 0, 7.5), to: on(PLACE.red, 0, 0, 1.8), sideDist: 6.8, side: 1, lead: 1.5, height: 1.8 }),
      zone: "red",
      look: "overworld-day",
      note: "Wider side tracking shot as Sam sprints up Red Street toward Mayor Sterling standing in crisp navy coat.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.red, 0, 0, 7.5), on(PLACE.red, 0, 0, 2.4), t, 0, 1.5);
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
      ...cam.heroLow({ on: on(PLACE.bridge, 0, 1.6, 0.5), dist: 8.8, yaw: -16, fov: 48 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Wide low power angle on the bridge: Mayor Sterling grins as the red striped border gate slams down hard.",
      stage: (t) => {
        const drop = ease(ramp(t, wordAt("3.idea", "slams") - 0.1, wordAt("3.idea", "slams") + 0.35));
        return (
          <>
            <TariffGate position={on(PLACE.bridge, 0, 0, -1.0)} drop={drop} accent="#d63228" label="+10 TARIFF" />
            <EliteLead variant="pres" position={on(PLACE.bridge, 1.8, 0, 1.6)} rotationY={-0.35} animation="point" face="grin" time={t} />
            <CitizenLead variant="sam" position={on(PLACE.bridge, -1.8, 0, 1.8)} rotationY={0.4} animation="cheer" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.rule",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.45, 0.8), dist: 7.8, distTo: 6.4, fromYaw: 20, toYaw: -16, pitch: 8, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "NEW BORDER RULE", color: "#ffd84d" } },
      note: "FIXED SIGN: StandingRuleSign mounts RuleBoard cleanly ABOVE ground on twin dark-oak posts & stone plinth beside Sterling and the customs guard!",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -2.4)} drop={1} accent="#d63228" label="+10 TARIFF" />
          <StandingRuleSign mode="order" position={on(PLACE.bridge, -1.5, 0, 0.8)} rotationY={0.22} />
          <EliteLead variant="pres" position={on(PLACE.bridge, 0.9, 0, 1.1)} rotationY={-0.3} animation="point" face="grin" time={t} />
          <Official role="mod" position={on(PLACE.bridge, 2.3, 0, -0.2)} rotationY={-0.2} animation="talk" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "3.tax",
      ...cam.sweep({ on: on(PLACE.bridge, 0, 1.4, -0.2), dist: 7.8, distTo: 6.4, fromYaw: 24, toYaw: -18, pitch: 7, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "+10 EMERALDS TO CROSS!", color: "#ff5548" } },
      note: "Wide sweeping look at the closed red customs arm blocking Felint while the guard demands ten extra emeralds.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -1.0)} drop={1} accent="#d63228" label="+10 TARIFF" />
          <CitizenLead variant="leo" position={on(PLACE.bridge, -0.8, 0, 1.2)} rotationY={0.2} animation="panic" face="wow" time={t} />
          <Official role="mod" position={on(PLACE.bridge, 1.5, 0, 0.9)} rotationY={-0.45} animation="point" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "3.name",
      ...cam.heroLow({ on: on(PLACE.bridge, 0, 2.0, -0.6), dist: 8.2, yaw: 18, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "THAT'S A TARIFF", color: "#ffd84d", sub: "BORDER TAX ON IMPORTS" } },
      note: "Bold signature title beat: crisp red border gate and smiling Sterling cleanly framed beneath the single golden HUD banner.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -1.0)} drop={1} accent="#d63228" label="TARIFF" />
          <EliteLead variant="pres" position={on(PLACE.bridge, 1.9, 0, 1.4)} rotationY={-0.3} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "3.math",
      ...cam.frameDuo({ a: on(PLACE.bridge, -1.5, 0, 1.6), b: on(PLACE.bridge, 1.5, 0, 1.6), fromYaw: -18, toYaw: 18, pitch: 10, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "5 BASE + 10 CUSTOMS", color: "#ffd84d" } },
      note: "Clean visual arithmetic on the bridge: 5 emerald stack on the left plus 10 customs tax coins on the right.",
      stage: (t) => (
        <>
          <TariffGate position={on(PLACE.bridge, 0, 0, -2.0)} drop={1} accent="#d63228" label="+10 TARIFF" />
          <CoinPile position={on(PLACE.bridge, -1.4, 0, 1.6)} count={8} kind="emerald" seed={11} />
          <CoinPile position={on(PLACE.bridge, 1.4, 0, 1.6)} count={16} kind="gold" seed={12} />
          <FloatingNumber text="5" color="#4ce87a" position={on(PLACE.bridge, -1.4, 1.65, 1.6)} height={0.58 * pop(t, wordAt("3.math", "five"))} />
          <FloatingNumber text="+10" color="#ff4f42" position={on(PLACE.bridge, 1.4, 1.65, 1.6)} height={0.58 * pop(t, wordAt("3.math", "ten"))} />
        </>
      ),
    },
    {
      cue: "3.total",
      ...cam.sweep({ on: on(PLACE.bridge, -0.3, 1.5, 1.8), dist: 7.8, distTo: 6.4, fromYaw: -22, toYaw: 18, pitch: 8, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      hud: { banner: { text: "5 + 10 = 15 EMERALDS", color: "#ff5548" } },
      note: "Shop counter reveal: Blue sword price snaps to 15 emeralds as Felint recoils in shock cleanly inside frame.",
      stage: (t) => (
        <>
          <SwordShop price={15} position={on(PLACE.bridge, 0.3, 0, 1.0)} t={t} bannerColor="#27549c" />
          <CitizenLead variant="leo" position={on(PLACE.bridge, -1.6, 0, 2.8)} rotationY={0.5} animation="panic" face="fear" time={t} />
        </>
      ),
    },
    {
      cue: "3.switch",
      ...cam.sweep({ on: on(PLACE.red, 0, 1.5, -1.4), dist: 9.2, distTo: 7.6, fromYaw: -16, toYaw: 18, pitch: 8, fov: 48 }),
      zone: "red",
      look: "overworld-day",
      hud: { banner: { text: "SAM (12) BEATS BLUE (15)", color: "#4ce87a" } },
      note: "Wide side-by-side comparison on Red Street: BOTH sword shops fit 100% inside 9:16 as Sam cheers!",
      stage: (t) => (
        <>
          <SwordShop price={12} position={on(PLACE.red, -1.8, 0, -2.6)} t={t} bannerColor="#b5332a" />
          <SwordShop price={15} position={on(PLACE.red, 1.8, 0, -2.6)} t={t} bannerColor="#27549c" />
          <CitizenLead variant="sam" position={on(PLACE.red, -1.7, 0, 0.4)} rotationY={0.15} animation="cheer" face="grin" time={t} />
          <Bubble text="CHEAPER!" dark position={on(PLACE.red, -1.7, 2.35, 0.4)} rotationY={0.2} scale={0.42 * pop(t, wordAt("3.switch", "cheap"))} />
        </>
      ),
    },
    {
      cue: "3.cheer",
      ...cam.track({ from: on(PLACE.red, 0, 0, 6.2), to: on(PLACE.red, 0, 0, 0.2), sideDist: 6.8, side: -1, lead: 1.5, height: 1.8 }),
      zone: "red",
      look: "overworld-day",
      note: "Wider joyful tracking shot down Red Street as local shoppers walk back into Sam's stall while Sam cheers.",
      stage: (t) => {
        const w1 = moveBetween(on(PLACE.red, -1.0, 0, 6.2), on(PLACE.red, -1.0, 0, 0.8), t, 0, 1.6);
        const w2 = moveBetween(on(PLACE.red, 1.0, 0, 6.8), on(PLACE.red, 1.0, 0, 1.6), t, 0, 1.6);
        return (
          <>
            <SwordShop price={12} position={on(PLACE.red, 0, 0, -2.6)} t={t} bannerColor="#b5332a" />
            <CitizenLead variant="sam" position={on(PLACE.red, 1.9, 0, -1.4)} rotationY={-0.3} animation="cheer" face="laugh" time={t} />
            <CitizenLead variant="leo" position={w1.position} rotationY={w1.rotationY} animation={w1.moving ? "walk" : "shrug"} animDistance={w1.animDistance} face="uneasy" time={t} />
            <CitizenLead variant="builder" position={w2.position} rotationY={w2.rotationY} animation={w2.moving ? "walk" : "talk"} animDistance={w2.animDistance} face="smile" time={t} />
          </>
        );
      },
    },
  ],
});

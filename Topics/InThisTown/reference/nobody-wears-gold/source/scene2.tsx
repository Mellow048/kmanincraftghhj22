import type React from "react";
import {
  BrickVault,
  Bubble,
  Glow,
  GoldHelmet,
  Grandpa,
  Hero,
  IronArmorStand,
  MayorVance,
  PLACE,
  Piglin,
  Player,
  Vox,
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

/** Scene 2 (Beats 3–4): Toby Finds His Gold Helmet + Mayor Vance's Iron Monopoly Motive + Toby Discovers Piglin Peace Himself! */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Toby's Helmet, Vance's Scam & The Discovery",
  shots: [
    {
      cue: "3.toby",
      ...cam.sweep({ on: on(PLACE.pines, 0, 1.2, 5.2), dist: 6.4, distTo: 5.2, fromYaw: 30, toYaw: -18, pitch: 8, fov: 44 }),
      zone: "pines",
      look: "overworld-day",
      note: "Heroic sweep by the rocky mine entrance at the forest edge: Toby puts on the gleaming dented gold helmet he found.",
      stage: (t) => (
        <>
          {/* Stone mine arch behind Toby */}
          <Vox kind="cobble" position={on(PLACE.pines, -2.0, 1.4, 2.0)} size={[1.1, 2.8, 1.4]} />
          <Vox kind="cobble" position={on(PLACE.pines, 2.0, 1.4, 2.0)} size={[1.1, 2.8, 1.4]} />
          <Vox kind="cobble" position={on(PLACE.pines, 0, 2.75, 2.0)} size={[5.1, 0.9, 1.5]} />
          <Hero position={on(PLACE.pines, 0, 0, 5.2)} rotationY={0} animation="wave" face="brave" time={t} />
          <Glow position={on(PLACE.pines, 0, 1.65, 5.2)} size={1.7} color="#ffe066" opacity={0.34} />
        </>
      ),
    },
    {
      cue: "3.grandpa",
      ...cam.frameDuo({ a: on(PLACE.village, -1.2, 0, 3.0), b: on(PLACE.village, 1.2, 0, 3.0), fromYaw: -22, toYaw: 20, pitch: 8, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "Wide warning two-shot on Main Street: worried villagers point at Toby's gold helmet warning Piglins will hunt him down.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, -1.2, 0, 3.0)} rotationY={0.45} animation="shrug" face="brave" time={t} />
          <Player who={3} position={on(PLACE.village, 1.1, 0, 3.0)} rotationY={-0.45} animation="point" face="fear" time={t} />
          <Player who={7} position={on(PLACE.village, 2.2, 0, 1.5)} rotationY={-0.6} animation="cower" face="worried" time={t} />
          <Bubble text="DANGER!" dark position={on(PLACE.village, 1.1, 2.35, 3.0)} rotationY={-0.35} scale={0.44 * pop(t, wordAt("3.grandpa", "warned"))} />
        </>
      ),
    },
    {
      cue: "3.never",
      ...cam.sweep({ on: on(PLACE.pines, 0, 1.2, 4.8), dist: 7.0, distTo: 5.6, fromYaw: -24, toYaw: 20, pitch: 8, fov: 46 }),
      zone: "pines",
      look: "overworld-golden",
      note: "Emotional golden-dusk memory: Grandpa hurries down the pine trail as Piglin silhouettes loom behind him.",
      stage: (t) => {
        const flee = moveBetween(on(PLACE.pines, 0, 0, 7.6), on(PLACE.pines, 0, 0, 2.6), t, 0, 1.8);
        return (
          <>
            <Grandpa position={flee.position} rotationY={flee.rotationY} animation={flee.moving ? "run" : "cower"} animDistance={flee.animDistance} face="worried" time={t} />
            <Piglin position={on(PLACE.pines, -1.8, 0, 8.8)} rotationY={Math.PI} walk={0.5} raise={0.75} sword seed={8} />
            <Piglin position={on(PLACE.pines, 1.8, 0, 9.0)} rotationY={Math.PI} walk={0.5} raise={0.75} sword seed={9} />
          </>
        );
      },
    },
    {
      cue: "3.laugh",
      ...cam.track({ from: on(PLACE.village, 0, 0, 10.5), to: on(PLACE.village, 0, 0, 6.0), sideDist: 6.8, side: -1, lead: 1.5, height: 1.7 }),
      zone: "village",
      look: "overworld-day",
      note: "Wider left-side tracking shot down Main Street as Toby walks past laughing kids yelling 'BUTTER HEAD!'",
      stage: (t) => {
        const w = moveBetween(on(PLACE.village, -0.4, 0, 10.5), on(PLACE.village, -0.4, 0, 6.0), t, 0, 1.8);
        return (
          <>
            <Hero position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "shrug"} animDistance={w.animDistance} face="frown" time={t} />
            <Player who={6} scale={0.8} position={on(PLACE.village, 2.0, 0, 8.4)} rotationY={-1.1} animation="laugh" face="grin" time={t} />
            <Player who={9} scale={0.8} position={on(PLACE.village, 2.1, 0, 6.4)} rotationY={-1.3} animation="point" face="laugh" time={t} />
            <Bubble text="BUTTER HEAD!" dark position={on(PLACE.village, 2.0, 2.05, 7.4)} rotationY={-Math.PI / 2} scale={0.44 * pop(t, wordAt("3.laugh", "butter"))} />
          </>
        );
      },
    },
    {
      cue: "3.vance",
      ...cam.heroLow({ on: on(PLACE.vault, 0, 1.5, 2.4), dist: 8.6, yaw: 18, fov: 46 }),
      zone: "vault",
      look: "overworld-day",
      note: "Low villain angle looking up at Mayor Vance (top hat & white mustache) grinning smugly on the stone steps of his brick vault.",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
          <MayorVance position={on(PLACE.vault, 0, 0.5, 2.1)} rotationY={0.2} animation="laugh" face="grin" time={t} />
          <Hero position={on(PLACE.vault, -1.9, 0, 5.4)} rotationY={0.45} animation="shrug" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "3.cursed",
      ...cam.frameDuo({ a: on(PLACE.vault, -1.4, 0, 4.6), b: on(PLACE.vault, 0.8, 0.5, 2.1), fromYaw: 42, toYaw: 72, pitch: 8, fov: 46 }),
      zone: "vault",
      look: "overworld-day",
      note: "East three-quarter two-shot at the vault steps: Mayor Vance wags a finger mocking Toby's shiny gold helmet as 'CURSED!'",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
          <MayorVance position={on(PLACE.vault, 0.4, 0.5, 2.1)} rotationY={0.45} animation="point" face="angry" time={t} />
          <Hero position={on(PLACE.vault, -1.6, 0, 4.8)} rotationY={1.1} animation="cower" face="uneasy" time={t} />
          <Bubble text="CURSED!" dark position={on(PLACE.vault, 0.4, 2.95, 2.1)} rotationY={0.45} scale={0.46 * pop(t, wordAt("3.cursed", "cursed"))} />
        </>
      ),
    },
    {
      cue: "4.locked",
      ...cam.sweep({ on: on(PLACE.vault, 0, 1.8, 0.8), dist: 8.6, distTo: 7.0, fromYaw: -28, toYaw: 16, pitch: 8, fov: 46 }),
      zone: "vault",
      look: "overworld-day",
      hud: { banner: { text: "ALL GOLD LOCKED AWAY", color: "#ffd84d" } },
      note: "Wide sweeping vault shot showing Mayor Vance sealing all the town's gleaming gold bars inside so nobody can wear it.",
      stage: (t) => {
        const closeK = 1 - ease(ramp(t, 0.1, wordAt("4.locked", "locked") + 0.5));
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={closeK * 0.85} lever={0} />
            <MayorVance position={on(PLACE.vault, 1.7, 0.5, 1.6)} rotationY={-0.45} animation="push" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.iron",
      ...cam.sweep({ on: on(PLACE.vault, 4.0, 1.3, 6.2), dist: 7.6, distTo: 6.2, fromYaw: -42, toYaw: -10, pitch: 8, fov: 46 }),
      zone: "vault",
      look: "overworld-day",
      hud: { banner: { text: "VANCE'S IRON SCAM", color: "#ff5548", sub: "FEAR = PROFIT" } },
      note: "Wide diagonal reveal of Mayor Vance's overpriced iron armor stall — full top-hatted Mayor and both armor stands cleanly framed.",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
          <IronArmorStand position={on(PLACE.vault, 2.8, 0, 5.8)} rotationY={-0.4} />
          <IronArmorStand position={on(PLACE.vault, 5.4, 0, 6.4)} rotationY={-0.5} />
          <MayorVance position={on(PLACE.vault, 4.1, 0, 6.6)} rotationY={-0.45} animation="laugh" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "4.fifty",
      ...cam.frameDuo({ a: on(PLACE.vault, 2.0, 0, 7.6), b: on(PLACE.vault, 4.3, 0, 6.8), fromYaw: 28, toYaw: 56, pitch: 9, fov: 46 }),
      zone: "vault",
      look: "overworld-day",
      hud: { banner: { text: "50 EMERALDS", color: "#ffd84d", sub: "CLEAR DAY PRICE" } },
      note: "Opposing east two-shot at Vance's armor stall: worried villager pays 50 emeralds for a plain grey iron chestplate.",
      stage: (t) => {
        const walkUp = moveBetween(on(PLACE.vault, 0.4, 0, 8.4), on(PLACE.vault, 2.1, 0, 7.5), t, 0, 1.3);
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
            <IronArmorStand position={on(PLACE.vault, 3.2, 0, 5.6)} rotationY={0.4} />
            <Player who={2} position={walkUp.position} rotationY={walkUp.rotationY} animation={walkUp.moving ? "walk" : "reach"} animDistance={walkUp.animDistance} face="uneasy" time={t} />
            <MayorVance position={on(PLACE.vault, 4.3, 0, 6.8)} rotationY={0.4} animation="talk" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.hundred",
      ...cam.frameDuo({ a: on(PLACE.vault, 2.0, 0, 7.4), b: on(PLACE.vault, 4.3, 0, 6.8), fromYaw: -38, toYaw: -8, pitch: 8, fov: 46 }),
      zone: "vault",
      look: "overworld-sunset",
      hud: { banner: { text: "100 EMERALDS!", color: "#ff5548", sub: "SUNSET GOUGE" } },
      note: "Sunset sweeps over the greedy stall as Vance doubles his iron armor price to 100 emeralds while poor villagers recoil.",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
          <IronArmorStand position={on(PLACE.vault, 3.2, 0, 5.6)} rotationY={-0.4} />
          <MayorVance position={on(PLACE.vault, 4.3, 0, 6.8)} rotationY={-0.6} animation="laugh" face="grin" time={t} />
          <Player who={8} position={on(PLACE.vault, 2.0, 0, 7.4)} rotationY={0.7} animation="cower" face="fear" time={t} />
        </>
      ),
    },
    {
      cue: "4.twenty",
      ...cam.track({ from: on(PLACE.pines, 0, 0, 10.0), to: on(PLACE.pines, 0, 0, 3.5), sideDist: 7.4, side: 1, lead: 1.5, height: 2.0 }),
      zone: "pines",
      look: "overworld-night",
      hud: { banner: { text: "20 NEIGHBORS FLED", color: "#ff5548" } },
      note: "Wide night tracking shot into the dark pines: frightened neighbors flee down the forest trail because they couldn't pay Vance.",
      stage: (t) => {
        const g1 = moveBetween(on(PLACE.pines, -1.4, 0, 9.6), on(PLACE.pines, -1.4, 0, 3.8), t, 0, 2.0);
        const g2 = moveBetween(on(PLACE.pines, 1.4, 0, 10.2), on(PLACE.pines, 1.4, 0, 4.4), t, 0, 2.0);
        const gr = moveBetween(on(PLACE.pines, 0, 0, 8.2), on(PLACE.pines, 0, 0, 2.2), t, 0, 2.1);
        return (
          <>
            <Grandpa position={gr.position} rotationY={gr.rotationY} animation={gr.moving ? "run" : "cower"} animDistance={gr.animDistance} face="worried" time={t} />
            <Player who={1} position={g1.position} rotationY={g1.rotationY} animation={g1.moving ? "run" : "cower"} animDistance={g1.animDistance} face="fear" time={t} />
            <Player who={4} position={g2.position} rotationY={g2.rotationY} animation={g2.moving ? "run" : "cower"} animDistance={g2.animDistance} face="scared" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.clue",
      ...cam.track({ from: on(PLACE.village, -0.8, 0, -10.5), to: on(PLACE.village, -0.8, 0, -15.5), sideDist: 6.8, side: -1, lead: 1.6, height: 1.8 }),
      zone: "village",
      look: "overworld-night",
      hud: { clock: "FRIDAY NIGHT TEST" },
      note: "Self-discovery setup: brave Toby walks right up toward the glowing Nether Portal at night to test his gold helmet himself.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.village, -0.9, 0, -10.5), on(PLACE.village, -0.9, 0, -15.5), t, 0, 2.0);
        return (
          <>
            <Hero position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "point"} animDistance={w.animDistance} face="brave" time={t} />
            <Piglin position={on(PLACE.village, 1.4, 0, -17.5)} rotationY={0} walk={0} calm={0.85} sword seed={4} />
          </>
        );
      },
    },
    {
      cue: "4.sniff",
      ...cam.frameDuo({ a: on(PLACE.village, -1.2, 0, -15.2), b: on(PLACE.village, 1.2, 0, -15.2), fromYaw: -26, toYaw: 24, pitch: 6, fov: 46 }),
      zone: "village",
      look: "overworld-night",
      hud: { banner: { text: "PIGLIN IGNORED GOLD!", color: "#4ce87a" } },
      note: "Toby's own eureka test: towering Piglin walks up, sniffs Toby's gold helmet, lowers its golden sword peacefully, and walks away!",
      stage: (t) => {
        const step = ease(ramp(t, 0, 2.3)) * 3.8;
        const sniff = ramp(t, wordAt("4.sniff", "sniffed") - 0.15, wordAt("4.sniff", "sniffed") + 0.35);
        const calmK = ease(ramp(t, wordAt("4.sniff", "lowered") - 0.2, wordAt("4.sniff", "lowered") + 0.3));
        return (
          <>
            <Hero position={on(PLACE.village, -1.2, 0, -15.2)} rotationY={0.45} animation="wave" face={calmK > 0.5 ? "wow" : "brave"} time={t} />
            <Piglin
              position={on(PLACE.village, 1.2, 0, -17.2 + step)}
              rotationY={0}
              walk={step}
              raise={0.6 * (1 - calmK)}
              calm={0.4 + 0.6 * calmK}
              sword
              headYaw={-0.65 * Math.sin(sniff * Math.PI)}
              headPitch={0.2 * Math.sin(sniff * Math.PI)}
              seed={5}
            />
            <GoldHelmet position={on(PLACE.village, -1.2, 2.1, -15.2)} scale={0} />
          </>
        );
      },
    },
  ],
});

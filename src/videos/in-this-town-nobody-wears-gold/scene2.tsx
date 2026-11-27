import type React from "react";
import {
  BrickVault,
  Bubble,
  FloatingNumber,
  GoldHelmet,
  Grandpa,
  Hero,
  IronArmorStand,
  MayorVance,
  PLACE,
  Piglin,
  Player,
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

/** Scene 2 (Beats 3–4): Toby & Grandpa's Helmet + Mayor Vance's Monopoly + Planted Piglin Clue. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Grandpa's Helmet & The Vault",
  shots: [
    {
      cue: "3.toby",
      ...cam.sweep({ on: on(PLACE.village, 0, 1.2, -2.0), dist: 5.4, distTo: 4.2, fromYaw: 34, toYaw: -16, pitch: 6, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Warm heroic sweep onto Toby tapping his dented gold helmet proudly in the sunlit town square.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, 0, 0, -2.0)} rotationY={0} animation="wave" face="brave" time={t} />
          <Player who={3} position={on(PLACE.village, -2.6, 0, -5.0)} rotationY={0.4} animation="point" face="uneasy" time={t} />
          <Player who={7} position={on(PLACE.village, 2.5, 0, -5.5)} rotationY={-0.3} animation="talk" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "3.grandpa",
      ...cam.twoShot({ a: on(PLACE.pines, -0.75, 0, 6.2), b: on(PLACE.pines, 0.75, 0, 6.2), facing: 0, dist: 5.8, to: 4.7, side: -26, pitch: 6, fov: 44 }),
      zone: "pines",
      look: "overworld-golden",
      note: "Golden sunset flashback at the pine trail: Grandpa hands Toby the shining gold helmet right before heading into the pines.",
      stage: (t) => (
        <>
          <Grandpa position={on(PLACE.pines, -0.75, 0, 6.2)} rotationY={0.45} animation="reach" face="smile" time={t} />
          <Hero helmet={false} position={on(PLACE.pines, 0.75, 0, 6.2)} rotationY={-0.45} animation="reach" face="uneasy" time={t} />
          <GoldHelmet position={on(PLACE.pines, 0, 1.15 + Math.sin(t * 3) * 0.05, 6.2)} scale={1.15} />
        </>
      ),
    },
    {
      cue: "3.never",
      ...cam.front({ actor: on(PLACE.pines, -0.3, 0, 6.0), facing: 0.35, dist: 5.2, to: 4.1, side: 24, pitch: 4, fov: 42 }),
      zone: "pines",
      look: "overworld-golden",
      note: "Tender close push on Grandpa leaning warmly beside Toby with a dark bubble whispering 'NEVER OFF'.",
      stage: (t) => (
        <>
          <Grandpa position={on(PLACE.pines, -0.55, 0, 6.0)} rotationY={0.35} animation="talk" face="brave" time={t} />
          <Hero position={on(PLACE.pines, 0.85, 0, 6.2)} rotationY={-0.25} animation="talk" face="brave" time={t} />
          <Bubble text="NEVER OFF" dark position={on(PLACE.pines, -0.55, 2.2, 6.0)} rotationY={0.5} scale={0.46 * pop(t, wordAt("3.never", "never"))} />
        </>
      ),
    },
    {
      cue: "3.laugh",
      ...cam.track({ from: on(PLACE.village, 0, 0, 10.5), to: on(PLACE.village, 0, 0, 6.0), sideDist: 5.8, side: -1, lead: 1.5, height: 1.5 }),
      zone: "village",
      look: "overworld-day",
      note: "Left-side tracking shot down Main Street as Toby walks past laughing kids yelling 'BUTTER HEAD!'",
      stage: (t) => {
        const w = moveBetween(on(PLACE.village, 0, 0, 10.5), on(PLACE.village, 0, 0, 6.0), t, 0, 1.8);
        return (
          <>
            <Hero position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "shrug"} animDistance={w.animDistance} face="frown" time={t} />
            <Player who={6} scale={0.8} position={on(PLACE.village, 2.1, 0, 8.2)} rotationY={-1.1} animation="laugh" face="grin" time={t} />
            <Player who={9} scale={0.8} position={on(PLACE.village, 2.2, 0, 6.6)} rotationY={-1.3} animation="point" face="laugh" time={t} />
            <Bubble text="BUTTER HEAD!" dark position={on(PLACE.village, 2.1, 1.95, 7.4)} rotationY={-Math.PI / 2} scale={0.45 * pop(t, wordAt("3.laugh", "butter"))} />
          </>
        );
      },
    },
    {
      cue: "3.vance",
      ...cam.heroLow({ on: on(PLACE.vault, 0, 1.3, 2.6), dist: 7.4, yaw: 20, fov: 46 }),
      zone: "vault",
      look: "overworld-day",
      note: "Low heroic villain angle looking up at Mayor Vance laughing smugly on the stone steps of his huge brick vault.",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
          <MayorVance position={on(PLACE.vault, 0, 0.5, 2.2)} rotationY={0.2} animation="laugh" face="grin" time={t} />
          <Hero position={on(PLACE.vault, -1.9, 0, 5.2)} rotationY={0.45} animation="shrug" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "3.cursed",
      ...cam.ots({ speaker: on(PLACE.vault, -1.8, 1.2, 5.0), listener: on(PLACE.vault, 0, 1.75, 2.2), side: 1, back: 2.6, push: 1.0, height: 0.3, fov: 44 }),
      zone: "vault",
      look: "overworld-day",
      note: "Over-the-shoulder angle past Toby onto Mayor Vance wagging a finger and mocking Toby's shiny gold helmet.",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
          <MayorVance position={on(PLACE.vault, 0, 0.5, 2.2)} rotationY={-0.3} animation="point" face="angry" time={t} />
          <Hero position={on(PLACE.vault, -1.8, 0, 5.0)} rotationY={2.55} animation="cower" face="uneasy" time={t} />
          <Bubble text="CURSED!" dark position={on(PLACE.vault, 0, 2.75, 2.2)} rotationY={-0.3} scale={0.48 * pop(t, wordAt("3.cursed", "cursed"))} />
        </>
      ),
    },
    {
      cue: "4.locked",
      ...cam.sweep({ on: on(PLACE.vault, 0, 1.8, 0.8), dist: 7.4, distTo: 5.9, fromYaw: -32, toYaw: 14, pitch: 8, fov: 45 }),
      zone: "vault",
      look: "overworld-day",
      note: "Sweeping vault shot: Mayor Vance pulls the iron vault door shut over gleaming stacked gold blocks inside.",
      stage: (t) => {
        const closeK = 1 - ease(ramp(t, 0.1, wordAt("4.locked", "locked") + 0.5));
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={closeK * 0.85} lever={0} />
            <MayorVance position={on(PLACE.vault, 1.5, 0.5, 1.6)} rotationY={-0.45} animation="push" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.iron",
      ...cam.front({ actor: on(PLACE.vault, 3.6, 0, 6.2), facing: -0.45, dist: 6.2, to: 5.0, side: -18, pitch: 8, fov: 44 }),
      zone: "vault",
      look: "overworld-day",
      note: "Diagonal push onto Mayor Vance's iron armor stall where plain grey iron chestplates gleam on stands.",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
          <IronArmorStand position={on(PLACE.vault, 3.2, 0, 5.8)} rotationY={-0.4} />
          <IronArmorStand position={on(PLACE.vault, 5.8, 0, 6.6)} rotationY={-0.5} />
          <MayorVance position={on(PLACE.vault, 4.4, 0, 6.8)} rotationY={-0.45} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "4.fifty",
      ...cam.twoShot({ a: on(PLACE.vault, 2.2, 0, 7.6), b: on(PLACE.vault, 4.4, 0, 7.0), facing: -0.4, dist: 6.6, to: 5.4, side: 22, pitch: 9, fov: 45 }),
      zone: "vault",
      look: "overworld-day",
      note: "Villager hands over a heavy stack of emeralds as '50 EMERALDS' pops bright gold over the armor stall.",
      stage: (t) => {
        const walkUp = moveBetween(on(PLACE.vault, 0.6, 0, 8.6), on(PLACE.vault, 2.4, 0, 7.5), t, 0, 1.3);
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
            <IronArmorStand position={on(PLACE.vault, 3.3, 0, 5.8)} rotationY={-0.4} />
            <Player who={2} position={walkUp.position} rotationY={walkUp.rotationY} animation={walkUp.moving ? "walk" : "reach"} animDistance={walkUp.animDistance} face="uneasy" time={t} />
            <MayorVance position={on(PLACE.vault, 4.4, 0, 6.9)} rotationY={-0.7} animation="talk" face="grin" time={t} />
            <FloatingNumber text="50 EMERALDS" color="#ffd84d" position={on(PLACE.vault, 3.5, 2.75, 6.6)} height={0.54 * pop(t, wordAt("4.fifty", "fifty"))} />
          </>
        );
      },
    },
    {
      cue: "4.hundred",
      ...cam.sweep({ on: on(PLACE.vault, 3.5, 1.4, 6.6), dist: 6.6, distTo: 5.5, fromYaw: -42, toYaw: -10, pitch: 6, fov: 45 }),
      zone: "vault",
      look: "overworld-sunset",
      note: "Sunset glow sweeps in as the price explodes into coral-red '100 EMERALDS' while poor villagers recoil.",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
          <IronArmorStand position={on(PLACE.vault, 3.3, 0, 5.8)} rotationY={-0.4} />
          <MayorVance position={on(PLACE.vault, 4.4, 0, 6.9)} rotationY={-0.6} animation="laugh" face="grin" time={t} />
          <Player who={8} position={on(PLACE.vault, 2.1, 0, 7.4)} rotationY={0.7} animation="cower" face="fear" time={t} />
          <FloatingNumber text="100 EMERALDS" color="#ff4f42" position={on(PLACE.vault, 3.4, 2.8, 6.6)} height={0.56 * pop(t, wordAt("4.hundred", "hundred"))} />
        </>
      ),
    },
    {
      cue: "4.twenty",
      ...cam.track({ from: on(PLACE.pines, 0, 0, 10.0), to: on(PLACE.pines, 0, 0, 3.5), sideDist: 6.2, side: 1, lead: 1.5, height: 1.8 }),
      zone: "pines",
      look: "overworld-night",
      note: "Night tracking shot into the dark pines: frightened neighbors flee from Piglins as crimson '20 MISSING' pops overhead.",
      stage: (t) => {
        const g1 = moveBetween(on(PLACE.pines, -0.9, 0, 9.5), on(PLACE.pines, -0.9, 0, 3.8), t, 0, 2.0);
        const g2 = moveBetween(on(PLACE.pines, 1.0, 0, 10.2), on(PLACE.pines, 1.0, 0, 4.5), t, 0, 2.0);
        const gr = moveBetween(on(PLACE.pines, 0, 0, 8.6), on(PLACE.pines, 0, 0, 2.6), t, 0, 2.1);
        return (
          <>
            <Grandpa position={gr.position} rotationY={gr.rotationY} animation={gr.moving ? "run" : "cower"} animDistance={gr.animDistance} face="worried" time={t} />
            <Player who={1} position={g1.position} rotationY={g1.rotationY} animation={g1.moving ? "run" : "cower"} animDistance={g1.animDistance} face="fear" time={t} />
            <Player who={4} position={g2.position} rotationY={g2.rotationY} animation={g2.moving ? "run" : "cower"} animDistance={g2.animDistance} face="scared" time={t} />
            <FloatingNumber text="20 MISSING" color="#ff4f42" position={on(PLACE.pines, 0, 2.8, 6.0)} height={0.58 * pop(t, wordAt("4.twenty", "twenty"))} />
          </>
        );
      },
    },
    {
      cue: "4.clue",
      ...cam.track({ from: on(PLACE.village, -0.8, 0, -5.0), to: on(PLACE.village, -0.8, 0, -9.0), sideDist: 5.6, side: -1, lead: 1.6, height: 1.5 }),
      zone: "village",
      look: "overworld-night",
      note: "Moonlit flashback on Main Street: Toby hurries home past curfew wearing his gleaming gold helmet.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.village, -0.8, 0, -5.0), on(PLACE.village, -0.8, 0, -9.0), t, 0, 2.0);
        return (
          <>
            <Hero position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "shrug"} animDistance={w.animDistance} face="uneasy" time={t} />
            <Piglin position={on(PLACE.village, 1.3, 0, -11.5)} rotationY={0} walk={0} calm={0.9} sword seed={4} />
          </>
        );
      },
    },
    {
      cue: "4.sniff",
      ...cam.sweep({ on: on(PLACE.village, 0.2, 1.35, -9.5), dist: 6.0, distTo: 4.8, fromYaw: -34, toYaw: 22, pitch: 4, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "Planted clue reveal: towering Piglin walks right past frozen Toby, lowers its sword calmly, sniffs the gold helmet, and keeps walking.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 2.2)) * 4.4;
        const sniff = ramp(t, wordAt("4.sniff", "sniffed") - 0.15, wordAt("4.sniff", "sniffed") + 0.35);
        return (
          <>
            <Hero position={on(PLACE.village, -1.0, 0, -9.5)} rotationY={0.4} animation="cower" face="wow" time={t} />
            <Piglin
              position={on(PLACE.village, 1.0, 0, -11.6 + step)}
              rotationY={0}
              walk={step}
              calm={1}
              sword
              headYaw={-0.65 * Math.sin(sniff * Math.PI)}
              headPitch={0.2 * Math.sin(sniff * Math.PI)}
              seed={5}
            />
          </>
        );
      },
    },
  ],
});

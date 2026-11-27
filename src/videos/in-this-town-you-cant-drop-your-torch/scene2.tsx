import type React from "react";
import {
  ChiefFlint,
  FireflyJar,
  FloatingNumber,
  Kai,
  Mom,
  ShadowCreature,
  Townie,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

/**
 * Scene 2 (12 shots): Hero Kai & Pip the firefly, Chief Flint's coal monopoly,
 * 10 vs 100 emerald gouging, Coal Mountain, and Mom's disappearance.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Scene 2",
  shots: [
    {
      cue: "3.kai",
      look: "lantern-night",
      note: "Side tracking camera glides beside Kai walking down the avenue with zero wooden torches.",
      ...cam.track({ from: [-3.8, 0, 6.4], to: [0, 0, 1.8], sideDist: 4.6, side: 1, height: 1.5, fov: 42 }),
      stage: (t) => {
        const k = moveBetween([-3.8, 0, 6.4], [0, 0, 1.8], t, 0, 1.9);
        return (
          <>
            <Kai position={k.position} rotationY={k.rotationY} animation={k.moving ? "walk" : "idle"} animDistance={k.animDistance} face="smile" time={t} />
            <FireflyJar position={[k.position[0] + 0.42, 1.15, k.position[2] + 0.25]} hasPip t={t} />
          </>
        );
      },
    },
    {
      cue: "3.pip",
      look: "lantern-night",
      note: "Intimate glowing sweep around Kai holding up his glass jar with golden firefly Pip inside.",
      ...cam.sweep({ on: [0.3, 1.25, 1.8], dist: 4.2, fromYaw: 28, toYaw: -26, pitch: 6, fov: 38 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.8]} animation="reachUp" face="happy" time={t} />
          <FireflyJar position={[0.38, 1.32, 1.95]} hasPip t={t} />
        </>
      ),
    },
    {
      cue: "3.laugh",
      look: "lantern-night",
      note: "Cross-street sweep showing two kids pointing and yelling bug boy at Kai's glowing jar.",
      ...cam.sweep({ on: [0, 1.3, 2.0], dist: 5.4, fromYaw: -36, toYaw: 26, pitch: 9, fov: 42 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.8]} animation="idle" face="uneasy" time={t} />
          <FireflyJar position={[0.42, 1.15, 2.0]} hasPip t={t} />
          <Townie who={1} position={[-2.2, 0, 2.6]} rotationY={1.1} animation="laugh" face="laugh" scale={0.82} torch time={t} />
          <Townie who={3} position={[2.2, 0, 2.5]} rotationY={-1.1} animation="point" face="smug" scale={0.82} torch time={t} />
        </>
      ),
    },
    {
      cue: "3.flint",
      look: "lantern-night",
      note: "Low hero angle looking up at Chief Flint laughing outside his brick Flint Coal shop.",
      ...cam.heroLow({ on: [3.6, 0, -2.5], dist: 5.0, yaw: -22, fov: 44 }),
      stage: (t) => (
        <ChiefFlint position={[3.6, 0, -2.5]} rotationY={-1.2} animation="laugh" face="smug" torch light={3.2} time={t} />
      ),
    },
    {
      cue: "3.quote",
      look: "lantern-night",
      note: "Sharp arc around smug Chief Flint pointing down the road and mocking Kai's tiny bug.",
      ...cam.sweep({ on: [3.6, 1.5, -2.5], dist: 4.8, fromYaw: -48, toYaw: -115, pitch: 8, fov: 40 }),
      stage: (t) => (
        <ChiefFlint position={[3.6, 0, -2.5]} rotationY={-1.2} animation="point" face="smug" torch light={3.2} time={t} />
      ),
    },
    {
      cue: "3.gone",
      look: "lantern-night",
      note: "Reverse-angle sweep back onto Kai holding Pip's jar tight while a shadow looms behind.",
      ...cam.sweep({ on: [0, 1.3, 1.8], dist: 5.2, fromYaw: 34, toYaw: -30, pitch: 10, fov: 42 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.8]} animation="idle" face="worried" time={t} />
          <FireflyJar position={[0.42, 1.15, 2.0]} hasPip t={t} />
          <ShadowCreature position={[-2.0, 0, -4.5]} rotationY={0.3} t={t} />
        </>
      ),
    },
    {
      cue: "4.mine",
      look: "lantern-night",
      note: "High crane sweeps across Chief Flint's brick Coal Shop and towering black Coal Mountain.",
      ...cam.streetOverview({ from: [1.5, 0, 4.4], to: [3.5, 0, -1.2], height: 5.4, fov: 46 }),
      stage: (t) => (
        <ChiefFlint position={[3.6, 0, -2.5]} rotationY={-1.2 + Math.sin(t * 2) * 0.08} animation="idle" face="smug" torch light={3.2} time={t} />
      ),
    },
    {
      cue: "4.ten",
      look: "lantern-night",
      note: "Sweep across the shop counter as a villager pays ten emeralds for a single wooden torch.",
      ...cam.sweep({ on: [2.8, 1.45, -2.4], dist: 5.0, fromYaw: -28, toYaw: 24, pitch: 8, fov: 42 }),
      stage: (t) => (
        <>
          <ChiefFlint position={[3.6, 0, -2.5]} rotationY={-1.3} animation="idle" face="smug" torch light={3.2} time={t} />
          <Townie who={1} position={[1.9, 0, -2.3]} rotationY={1.4 + Math.sin(t * 2.5) * 0.08} animation="idle" face="worried" torch time={t} />
          <FloatingNumber text="10 EMERALDS" position={[2.8, 2.1, -2.4]} color="#5ce68a" height={0.34} />
        </>
      ),
    },
    {
      cue: "4.hundred",
      look: "overworld-storm",
      note: "Stormy low angle as Chief Flint hikes the price to one hundred emeralds while a villager cowers.",
      ...cam.heroLow({ on: [3.0, 0, -2.4], dist: 5.0, yaw: -26, fov: 44 }),
      stage: (t) => (
        <>
          <ChiefFlint position={[3.6, 0, -2.5]} rotationY={-1.3} animation="laugh" face="smug" torch light={3.2} time={t} />
          <Townie who={3} position={[1.9, 0, -2.3]} rotationY={1.4} animation="cower" face="scared" time={t} />
          <FloatingNumber text="100 EMERALDS!" position={[2.8, 2.15, -2.4]} color="#ff5252" height={0.38} />
        </>
      ),
    },
    {
      cue: "4.pile",
      look: "lantern-night",
      note: "Dramatic low-angle upward tilt on Chief Flint laughing atop his giant mountain of black coal.",
      ...cam.sweep({ on: [5.6, 4.2, -8.5], dist: 6.2, fromYaw: -38, toYaw: 16, pitch: 8, fov: 46 }),
      stage: (t) => (
        <ChiefFlint position={[5.6, 3.45, -8.5]} animation="laugh" face="smug" torch light={3.5} time={t} />
      ),
    },
    {
      cue: "4.thirty",
      look: "lantern-night",
      note: "Tracking camera follows frightened townsfolk who could not pay vanishing into the pine woods.",
      ...cam.track({ from: [0, 0, -5.2], to: [0, 0, -14.2], sideDist: 6.2, side: -1, height: 2.6, fov: 44 }),
      stage: (t) => {
        const a = moveBetween([-0.9, 0, -5.2], [-1.4, 0, -14.2], t, 0, 2.2);
        const b = moveBetween([1.4, 0, -6.0], [1.8, 0, -14.6], t, 0, 2.2);
        return (
          <>
            <Townie who={1} position={a.position} rotationY={a.rotationY} animation="walk" animDistance={a.animDistance} face="scared" time={t} />
            <Townie who={3} position={b.position} rotationY={b.rotationY} animation="walk" animDistance={b.animDistance} face="scared" time={t} />
            <ShadowCreature position={[-3.2, 0, -13.5]} rotationY={0.4} t={t} />
            <ShadowCreature position={[3.0, 0, -13.8]} rotationY={-0.4} t={t} />
          </>
        );
      },
    },
    {
      cue: "4.mom",
      look: "lantern-night",
      note: "Tender sweep as Mom hands Pip's glowing jar to young Kai before walking off into the dark.",
      ...cam.sweep({ on: [0, 1.35, 1.1], dist: 4.8, fromYaw: -30, toYaw: 28, pitch: 8, fov: 40 }),
      stage: (t) => {
        const leave = moveBetween([0.6, 0, 1.0], [0.8, 0, -3.5], t, 1.1, 2.4);
        return (
          <>
            <Kai position={[-0.7, 0, 1.2]} rotationY={0.8} animation="idle" face="crying" time={t} />
            <FireflyJar position={[-0.2, 1.15, 1.2]} hasPip t={t} />
            <Mom position={leave.position} rotationY={leave.moving ? leave.rotationY : -1.1} animation={leave.moving ? "walk" : "wave"} animDistance={leave.animDistance} face="sad" time={t} />
          </>
        );
      },
    },
  ],
});

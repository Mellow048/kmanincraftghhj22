import type React from "react";
import {
  Block,
  Bubble,
  Dandelion,
  FloatingNumber,
  Glow,
  GoldHelmet,
  GoldenCarrot,
  Hero,
  MayorVance,
  PLACE,
  Piglin,
  Player,
  Puffs,
  ROBE,
  Villager,
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

/** Scene 1 (Beats 1–2): Bright Daylight Hook + Rapid-Fire Anti-Gold Sight-Gags. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Nobody Wears Gold",
  shots: [
    {
      cue: "1.gold",
      ...cam.streetOverview({ from: on(PLACE.village, 0, 0, 12.5), to: on(PLACE.village, 0, 0, 5.5), height: 5.2, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "Bright daylight Frame-1 hook: crane sweeps down Main Street as Toby walks proudly in his gleaming gold helmet while crowds scatter.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.village, 0, 0, 1.5), on(PLACE.village, 0, 0, 4.5), t, 0, 1.45);
        const fleeL = moveBetween(on(PLACE.village, -1.8, 0, 2.2), on(PLACE.village, -4.6, 0, 2.2), t, 0.15, 1.4);
        const fleeR = moveBetween(on(PLACE.village, 1.8, 0, 1.2), on(PLACE.village, 4.6, 0, 1.2), t, 0.15, 1.4);
        return (
          <>
            <Hero position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="grin" time={t} />
            <Player who={1} position={fleeL.position} rotationY={fleeL.rotationY} animation={fleeL.moving ? "run" : "cower"} animDistance={fleeL.animDistance} face="fear" time={t} />
            <Player who={4} position={fleeR.position} rotationY={fleeR.rotationY} animation={fleeR.moving ? "run" : "cower"} animDistance={fleeR.animDistance} face="scared" time={t} />
            <Villager robe={ROBE.brown} position={on(PLACE.village, -2.5, 0, -4.5)} rotationY={0.4} lean={0.25} />
            <Villager robe={ROBE.blue} position={on(PLACE.village, 2.3, 0, -6.5)} rotationY={-0.35} lean={0.2} />
          </>
        );
      },
    },
    {
      cue: "1.dive",
      ...cam.track({ from: on(PLACE.village, 0, 0, 7.2), to: on(PLACE.village, 0, 0, 3.2), sideDist: 5.6, side: 1, lead: 1.4, height: 1.6 }),
      zone: "village",
      look: "overworld-day",
      note: "Side-tracking shot along the street: Toby strolls forward while two neighbors dive behind the brick market stall in panic.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.village, 0.2, 0, 7.2), on(PLACE.village, 0.2, 0, 3.2), t, 0, 1.9);
        const diveA = moveBetween(on(PLACE.village, -1.6, 0, 5.4), on(PLACE.village, -4.2, 0, 6.2), t, 0.1, 1.5);
        const diveB = moveBetween(on(PLACE.village, -1.3, 0, 3.8), on(PLACE.village, -4.1, 0, 4.4), t, 0.25, 1.7);
        return (
          <>
            <Hero position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="smile" time={t} />
            <Player who={3} position={diveA.position} rotationY={diveA.rotationY} animation={diveA.moving ? "run" : "cower"} animDistance={diveA.animDistance} face="fear" time={t} />
            <Player who={6} position={diveB.position} rotationY={diveB.rotationY} animation={diveB.moving ? "run" : "cower"} animDistance={diveB.animDistance} face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.helmet",
      ...cam.sweep({ on: on(PLACE.village, 0, 1.15, 2.0), dist: 5.2, distTo: 4.1, fromYaw: -28, toYaw: 24, pitch: 8, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Parallax 52-degree sweep around Toby smiling proudly under his gleaming gold helmet with a warm glint.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, 0, 0, 2.0)} rotationY={0} animation="wave" face="grin" time={t} />
          <Glow position={on(PLACE.village, 0, 1.55, 2.0)} size={1.6} color="#ffe066" opacity={0.32 + 0.12 * Math.sin(t * 7)} />
          <Player who={5} position={on(PLACE.village, -2.6, 0, -2.2)} rotationY={0.4} animation="cower" face="fear" time={t} />
          <Player who={8} position={on(PLACE.village, 2.4, 0, -3.5)} rotationY={-0.3} animation="point" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "1.portal",
      ...cam.heroLow({ on: on(PLACE.village, 0, 1.6, -23.5), dist: 8.6, yaw: -16, fov: 48 }),
      zone: "village",
      look: "overworld-golden",
      note: "Dramatic low-angle upward tilt onto the giant glowing purple obsidian Nether Portal towering at the north edge of town.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, -2.0, 0, -18.5)} rotationY={0.35} animation="point" face="uneasy" time={t} />
          <Player who={2} position={on(PLACE.village, 2.1, 0, -18.2)} rotationY={-0.35} animation="cower" face="fear" time={t} />
        </>
      ),
    },
    {
      cue: "1.piglins",
      ...cam.sweep({ on: on(PLACE.village, 0, 1.4, -18.5), dist: 6.8, distTo: 5.4, fromYaw: 26, toYaw: -18, pitch: -4, fov: 44 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Low sweeping push on three furious Piglins marching out of the sunset portal swinging gleaming golden swords.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 2.0)) * 2.4;
        return (
          <>
            <Piglin position={on(PLACE.village, 0, 0, -21.2 + step)} rotationY={0} walk={step} raise={0.75} sword seed={1} />
            <Piglin position={on(PLACE.village, -1.9, 0, -21.8 + step * 0.9)} rotationY={0.12} walk={step * 0.9} raise={0.6} sword seed={2} />
            <Piglin position={on(PLACE.village, 1.9, 0, -21.6 + step * 0.95)} rotationY={-0.12} walk={step * 0.95} raise={0.65} sword seed={3} />
          </>
        );
      },
    },
    {
      cue: "2.rule",
      ...cam.twoShot({ a: on(PLACE.vault, -0.8, 0, 5.2), b: on(PLACE.vault, 1.6, 0, 5.2), facing: 0.45, dist: 6.4, to: 5.2, side: 18, pitch: 7, fov: 44 }),
      zone: "vault",
      look: "overworld-day",
      note: "Mayor Vance lectures sternly in front of his vault plaza pointing at a crossed-out gold helmet sign while villagers listen.",
      stage: (t) => (
        <>
          <MayorVance position={on(PLACE.vault, -0.6, 0, 5.2)} rotationY={0.28} animation="point" face="angry" time={t} />
          <Bubble text="NO GOLD!" dark position={on(PLACE.vault, -0.6, 2.35, 5.2)} rotationY={0.4} scale={0.48 * pop(t, wordAt("2.rule", "gold"))} />
          <Player who={1} position={on(PLACE.vault, 1.6, 0, 5.4)} rotationY={-0.35} animation="cower" face="uneasy" time={t} />
          <Player who={4} position={on(PLACE.vault, 2.4, 0, 4.1)} rotationY={-0.5} animation="shrug" face="fear" time={t} />
        </>
      ),
    },
    {
      cue: "2.flower",
      ...cam.top({ on: on(PLACE.village, 0, 0.4, 8.2), height: 5.8, to: 4.5, spin: [-12, 16], fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Spinning top-down comedy cutaway from behind and above: three villagers bolt outward in terror from one tiny harmless yellow dandelion.",
      stage: (t) => {
        const a = moveBetween(on(PLACE.village, -0.8, 0, 8.0), on(PLACE.village, -2.8, 0, 8.2), t, 0.2, 1.8);
        const b = moveBetween(on(PLACE.village, 0.9, 0, 8.0), on(PLACE.village, 2.8, 0, 8.2), t, 0.25, 1.85);
        const c = moveBetween(on(PLACE.village, 0, 0, 8.9), on(PLACE.village, 0.2, 0, 11.2), t, 0.3, 1.9);
        return (
          <>
            <Dandelion position={on(PLACE.village, 0, 0.05, 8.2)} scale={1.35} />
            <Player who={7} position={a.position} rotationY={a.rotationY} animation={a.moving ? "run" : "panic"} animDistance={a.animDistance} face="fear" time={t} />
            <Player who={9} position={b.position} rotationY={b.rotationY} animation={b.moving ? "run" : "panic"} animDistance={b.animDistance} face="scared" time={t} />
            <Player who={10} position={c.position} rotationY={c.rotationY} animation={c.moving ? "run" : "panic"} animDistance={c.animDistance} face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.baker",
      ...cam.front({ actor: on(PLACE.village, -1.2, 0, 5.4), facing: Math.PI / 2, dist: 5.8, to: 4.6, side: 20, pitch: 8, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Cross-street angle looking west at the stall: baker holds a glowing golden carrot as Mayor Vance storms up firing him.",
      stage: (t) => {
        const storm = moveBetween(on(PLACE.village, 1.2, 0, 5.4), on(PLACE.village, -0.1, 0, 5.4), t, 0, 1.3);
        return (
          <>
            <Player who={5} position={on(PLACE.village, -1.6, 0, 5.4)} rotationY={Math.PI / 2} animation="shrug" face="wow" time={t} />
            <GoldenCarrot position={on(PLACE.village, -1.1, 1.05, 5.4)} rotationY={0.4} scale={1.2} />
            <MayorVance position={storm.position} rotationY={storm.rotationY} animation={storm.moving ? "walk" : "point"} animDistance={storm.animDistance} face="angry" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.fourth",
      ...cam.sweep({ on: on(PLACE.village, 0, 1.2, 5.2), dist: 6.4, distTo: 5.3, fromYaw: -38, toYaw: -8, pitch: 10, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Deadpan comedy cutaway: dejected fired baker trudges away down Main Street as a giant red '4TH BAKER' pops overhead.",
      stage: (t) => {
        const trudge = moveBetween(on(PLACE.village, -0.6, 0, 4.6), on(PLACE.village, 1.8, 0, 8.8), t, 0, 1.7);
        return (
          <>
            <Player who={5} position={trudge.position} rotationY={trudge.rotationY} animation={trudge.moving ? "walk" : "cower"} animDistance={trudge.animDistance} face="sad" time={t} />
            <Hero position={on(PLACE.village, -1.6, 0, 5.8)} rotationY={0.35} animation="shrug" face="uneasy" time={t} />
            <FloatingNumber text="4TH BAKER" color="#ff4f42" position={on(PLACE.village, 0.2, 2.65, 5.8)} height={0.55 * pop(t, wordAt("2.fourth", "fourth"))} />
          </>
        );
      },
    },
    {
      cue: "2.paint",
      ...cam.front({ actor: on(PLACE.village, 1.8, 0, -6.0), facing: -Math.PI / 2, dist: 5.6, to: 4.4, side: -22, pitch: 6, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Reverse cross-street angle looking east: worried blacksmith furiously paints his bright yellow wooden sign flat grey.",
      stage: (t) => {
        const painted = ease(ramp(t, wordAt("2.paint", "painted"), wordAt("2.paint", "grey") + 0.35));
        const signCol = painted > 0.5 ? "#7a808a" : "#f5cf38";
        return (
          <>
            <Player who={0} position={on(PLACE.village, 1.6, 0, -6.0)} rotationY={-Math.PI / 2} animation="reach" face="uneasy" time={t} />
            <Block position={on(PLACE.village, 2.35, 1.45, -6.0)} size={[0.14, 0.85, 1.45]} color={signCol} />
            <Block position={on(PLACE.village, 2.35, 0.5, -6.0)} size={[0.16, 1.1, 0.16]} color="#6b4a2b" />
            {painted > 0.2 ? <Puffs position={on(PLACE.village, 2.2, 1.45, -6.0)} color="#8c929c" count={5} size={0.14} /> : null}
          </>
        );
      },
    },
  ],
});

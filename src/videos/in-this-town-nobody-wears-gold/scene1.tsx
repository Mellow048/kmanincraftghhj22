import type React from "react";
import {
  Block,
  Bubble,
  Dandelion,
  Glow,
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
      ...cam.streetOverview({ from: on(PLACE.village, 0, 0, 10.2), to: on(PLACE.village, 0, 0, 9.2), on: on(PLACE.village, 0, 1.1, 2.2), onTo: on(PLACE.village, 0, 1.1, 3.8), height: 4.1, fov: 48 }),
      zone: "village",
      look: "overworld-day",
      hud: { clock: "NO GOLD TOWN" },
      note: "Bright daylight Frame-1 hook: crane sweeps down Main Street as Toby walks proudly in his gleaming gold helmet while crowds scatter.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.village, 0, 0, 1.5), on(PLACE.village, 0, 0, 4.4), t, 0, 1.45);
        const fleeL = moveBetween(on(PLACE.village, -1.9, 0, 2.2), on(PLACE.village, -4.4, 0, 2.2), t, 0.15, 1.4);
        const fleeR = moveBetween(on(PLACE.village, 1.9, 0, 1.2), on(PLACE.village, 4.4, 0, 1.2), t, 0.15, 1.4);
        return (
          <>
            <Hero position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="grin" time={t} />
            <Player who={1} position={fleeL.position} rotationY={fleeL.rotationY} animation={fleeL.moving ? "run" : "cower"} animDistance={fleeL.animDistance} face="fear" time={t} />
            <Player who={4} position={fleeR.position} rotationY={fleeR.rotationY} animation={fleeR.moving ? "run" : "cower"} animDistance={fleeR.animDistance} face="scared" time={t} />
            <Villager robe={ROBE.brown} position={on(PLACE.village, -2.6, 0, -4.5)} rotationY={0.4} lean={0.25} />
            <Villager robe={ROBE.blue} position={on(PLACE.village, 2.4, 0, -6.5)} rotationY={-0.35} lean={0.2} />
          </>
        );
      },
    },
    {
      cue: "1.dive",
      ...cam.track({ from: on(PLACE.village, 0, 0, 7.2), to: on(PLACE.village, 0, 0, 3.2), sideDist: 6.8, side: 1, lead: 1.4, height: 1.8 }),
      zone: "village",
      look: "overworld-day",
      note: "Wider side-tracking shot along the street: Toby strolls forward while two neighbors dive behind the brick market stall in panic.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.village, 0.3, 0, 7.2), on(PLACE.village, 0.3, 0, 3.2), t, 0, 1.9);
        const diveA = moveBetween(on(PLACE.village, -1.7, 0, 5.6), on(PLACE.village, -4.1, 0, 6.2), t, 0.1, 1.5);
        const diveB = moveBetween(on(PLACE.village, -1.5, 0, 3.6), on(PLACE.village, -4.0, 0, 4.1), t, 0.25, 1.7);
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
      ...cam.sweep({ on: on(PLACE.village, 0, 1.15, 2.0), dist: 6.2, distTo: 5.0, fromYaw: -26, toYaw: 24, pitch: 8, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Parallax 50-degree sweep around Toby smiling proudly under his gleaming gold helmet with a warm glint.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, 0, 0, 2.0)} rotationY={0} animation="wave" face="grin" time={t} />
          <Glow position={on(PLACE.village, 0, 1.55, 2.0)} size={1.6} color="#ffe066" opacity={0.32 + 0.12 * Math.sin(t * 7)} />
          <Player who={5} position={on(PLACE.village, -2.4, 0, -2.4)} rotationY={0.4} animation="cower" face="fear" time={t} />
          <Player who={8} position={on(PLACE.village, 2.4, 0, -3.5)} rotationY={-0.3} animation="point" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "1.portal",
      ...cam.heroLow({ on: on(PLACE.village, 0, 1.8, -23.5), dist: 9.8, yaw: -16, fov: 48 }),
      zone: "village",
      look: "overworld-golden",
      note: "Dramatic low-angle upward tilt onto the giant glowing purple obsidian Nether Portal towering at the north edge of town.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, -1.8, 0, -18.5)} rotationY={0.35} animation="point" face="uneasy" time={t} />
          <Player who={2} position={on(PLACE.village, 1.9, 0, -18.2)} rotationY={-0.35} animation="cower" face="fear" time={t} />
        </>
      ),
    },
    {
      cue: "1.piglins",
      ...cam.sweep({ on: on(PLACE.village, 0, 1.35, -18.5), dist: 8.6, distTo: 7.0, fromYaw: 24, toYaw: -18, pitch: -2, fov: 46 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Wide low sweeping push on three furious Piglins marching out of the sunset portal swinging gleaming golden swords — all three fully framed.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 2.0)) * 2.4;
        return (
          <>
            <Piglin position={on(PLACE.village, 0, 0, -21.2 + step)} rotationY={0} walk={step} raise={0.75} sword seed={1} />
            <Piglin position={on(PLACE.village, -1.8, 0, -21.8 + step * 0.9)} rotationY={0.12} walk={step * 0.9} raise={0.6} sword seed={2} />
            <Piglin position={on(PLACE.village, 1.8, 0, -21.6 + step * 0.95)} rotationY={-0.12} walk={step * 0.95} raise={0.65} sword seed={3} />
          </>
        );
      },
    },
    {
      cue: "2.rule",
      ...cam.frameDuo({ a: on(PLACE.vault, -1.0, 0, 5.2), b: on(PLACE.vault, 1.4, 0, 5.2), fromYaw: -18, toYaw: 20, pitch: 8, fov: 46 }),
      zone: "vault",
      look: "overworld-day",
      hud: { banner: { text: "NO GOLD RULE", color: "#ffd84d", sub: "MAYOR VANCE'S LAW" } },
      note: "Mayor Vance (in top hat & white mustache) lectures sternly in front of his vault plaza while villagers listen nervously.",
      stage: (t) => (
        <>
          <MayorVance position={on(PLACE.vault, -1.0, 0, 5.2)} rotationY={0.35} animation="point" face="angry" time={t} />
          <Bubble text="NO GOLD!" dark position={on(PLACE.vault, -1.0, 2.55, 5.2)} rotationY={0.35} scale={0.44 * pop(t, wordAt("2.rule", "gold"))} />
          <Player who={1} position={on(PLACE.vault, 1.3, 0, 5.4)} rotationY={-0.35} animation="cower" face="uneasy" time={t} />
          <Player who={4} position={on(PLACE.vault, 2.3, 0, 3.8)} rotationY={-0.5} animation="shrug" face="fear" time={t} />
        </>
      ),
    },
    {
      cue: "2.flower",
      ...cam.sweep({ on: on(PLACE.village, 0, 0.9, 8.6), dist: 7.4, distTo: 5.8, fromYaw: 46, toYaw: 16, pitch: 24, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "High angled comedy sweep: three villagers bolt forward toward camera in terror away from one tiny harmless yellow dandelion.",
      stage: (t) => {
        const a = moveBetween(on(PLACE.village, -1.0, 0, 7.6), on(PLACE.village, -2.1, 0, 9.8), t, 0.2, 1.8);
        const b = moveBetween(on(PLACE.village, 1.0, 0, 7.6), on(PLACE.village, 2.2, 0, 9.6), t, 0.25, 1.85);
        const c = moveBetween(on(PLACE.village, 0.1, 0, 8.8), on(PLACE.village, 0.4, 0, 11.2), t, 0.3, 1.9);
        return (
          <>
            <Dandelion position={on(PLACE.village, 0, 0.02, 7.2)} scale={1.45} />
            <Player who={7} position={a.position} rotationY={a.rotationY} animation={a.moving ? "run" : "panic"} animDistance={a.animDistance} face="fear" time={t} />
            <Player who={9} position={b.position} rotationY={b.rotationY} animation={b.moving ? "run" : "panic"} animDistance={b.animDistance} face="scared" time={t} />
            <Player who={10} position={c.position} rotationY={c.rotationY} animation={c.moving ? "run" : "panic"} animDistance={c.animDistance} face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.baker",
      ...cam.frameDuo({ a: on(PLACE.village, -1.4, 0, 5.4), b: on(PLACE.village, 1.0, 0, 5.4), fromYaw: -22, toYaw: 14, pitch: 8, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "Clean two-shot at the market stall: baker holds a glowing golden carrot as Mayor Vance storms up firing him.",
      stage: (t) => {
        const storm = moveBetween(on(PLACE.village, 1.8, 0, 5.4), on(PLACE.village, 0.5, 0, 5.4), t, 0, 1.3);
        return (
          <>
            <Player who={5} position={on(PLACE.village, -1.4, 0, 5.4)} rotationY={Math.PI / 2} animation="shrug" face="wow" time={t} />
            <GoldenCarrot position={on(PLACE.village, -0.75, 1.08, 5.4)} rotationY={0.4} scale={1.25} />
            <MayorVance position={storm.position} rotationY={storm.rotationY} animation={storm.moving ? "walk" : "point"} animDistance={storm.animDistance} face="angry" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.fourth",
      ...cam.frameDuo({ a: on(PLACE.village, -1.2, 0, 5.4), b: on(PLACE.village, 1.2, 0, 6.2), fromYaw: 32, toYaw: 58, pitch: 10, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      hud: { banner: { text: "4TH BAKER THIS MONTH", color: "#ff5548" } },
      note: "Deadpan comedy two-shot from east angle: Toby shrugs at the camera while the fired baker trudges sadly down Main Street under a crisp HUD banner.",
      stage: (t) => {
        const trudge = moveBetween(on(PLACE.village, 0.3, 0, 4.8), on(PLACE.village, 1.5, 0, 7.6), t, 0, 1.7);
        return (
          <>
            <Player who={5} position={trudge.position} rotationY={trudge.rotationY} animation={trudge.moving ? "walk" : "cower"} animDistance={trudge.animDistance} face="sad" time={t} />
            <Hero position={on(PLACE.village, -1.2, 0, 5.6)} rotationY={0.55} animation="shrug" face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.paint",
      ...cam.sweep({ on: on(PLACE.village, 1.8, 1.3, -6.0), dist: 6.4, distTo: 5.2, fromYaw: 18, toYaw: 48, pitch: 8, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "Front three-quarter angle on the worried blacksmith furiously painting his bright yellow wooden sign flat grey.",
      stage: (t) => {
        const painted = ease(ramp(t, wordAt("2.paint", "painted"), wordAt("2.paint", "grey") + 0.35));
        const signCol = painted > 0.5 ? "#7a808a" : "#f5cf38";
        return (
          <>
            <Player who={0} position={on(PLACE.village, 1.2, 0, -6.0)} rotationY={0.85} animation="reach" face="uneasy" time={t} />
            <Block position={on(PLACE.village, 2.35, 1.45, -6.0)} size={[0.14, 0.85, 1.45]} color={signCol} />
            <Block position={on(PLACE.village, 2.35, 0.5, -6.0)} size={[0.16, 1.1, 0.16]} color="#6b4a2b" />
            {painted > 0.2 ? <Puffs position={on(PLACE.village, 2.15, 1.45, -6.0)} color="#8c929c" count={5} size={0.14} /> : null}
          </>
        );
      },
    },
  ],
});

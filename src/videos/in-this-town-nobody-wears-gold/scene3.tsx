import type React from "react";
import {
  BrickVault,
  Bubble,
  FloatingNumber,
  Glow,
  GoldIngot,
  Hero,
  IronGuard,
  MayorVance,
  PLACE,
  Piglin,
  Player,
  Puffs,
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

/** Scene 3 (Beats 5–6): Sunset Bell Raid + Loophole Insight + Opening the Gold Vault. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Sunset Raid & The Vault Breakthrough",
  shots: [
    {
      cue: "5.bell",
      ...cam.heroLow({ on: on(PLACE.village, 2.7, 1.3, -2.6), dist: 5.4, yaw: -24, fov: 44 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Low dramatic tilt up at the village bell ringing against the orange sunset sky as panic ripples through town.",
      stage: (t) => {
        const ring = Math.sin(t * 24) * 0.25;
        return (
          <>
            <Glow position={on(PLACE.village, 2.7, 2.1, -2.6)} size={2.2 + Math.abs(ring) * 2} color="#ffbe55" opacity={0.42} />
            <Player who={2} position={on(PLACE.village, 0.8, 0, -1.8)} rotationY={0.5} animation="panic" face="fear" time={t} />
            <Player who={7} position={on(PLACE.village, -1.2, 0, -2.2)} rotationY={0.3} animation="cower" face="scared" time={t} />
          </>
        );
      },
    },
    {
      cue: "5.roar",
      ...cam.heroLow({ on: on(PLACE.village, 0, 2.4, -23.5), dist: 8.8, yaw: 18, fov: 48 }),
      zone: "village",
      look: "overworld-night",
      note: "Massive purple glow bursts from the Nether Portal on the north hill as twilight drops into night.",
      stage: (t) => (
        <>
          <Glow position={on(PLACE.village, 0, 3.2, -22.5)} size={6.5 + Math.sin(t * 14) * 1.4} color="#c36eff" opacity={0.55} />
          <Piglin position={on(PLACE.village, 0, 0, -20.4)} rotationY={0} walk={0} raise={0.95} sword seed={10} />
          <Piglin position={on(PLACE.village, -1.6, 0, -20.8)} rotationY={0.1} walk={0} raise={0.85} sword seed={11} />
          <Piglin position={on(PLACE.village, 1.6, 0, -20.8)} rotationY={-0.1} walk={0} raise={0.85} sword seed={12} />
        </>
      ),
    },
    {
      cue: "5.twelve",
      ...cam.streetOverview({ from: on(PLACE.village, 0, 0, -3.5), to: on(PLACE.village, 0, 0, -10.5), height: 5.8, fov: 48 }),
      zone: "village",
      look: "overworld-night",
      note: "High sweeping crane down Main Street: a charging army of twelve Piglins storms down the cobble road swinging golden swords.",
      stage: (t) => {
        const charge = ease(ramp(t, 0, 2.2)) * 5.0;
        const rows = [
          [-2.0, -18.5], [-0.7, -18.0], [0.7, -18.0], [2.0, -18.5],
          [-2.2, -20.5], [-0.8, -20.2], [0.8, -20.2], [2.2, -20.5],
          [-1.8, -22.2], [-0.5, -22.0], [0.6, -22.0], [1.9, -22.2],
        ];
        return (
          <>
            {rows.map(([x, z], i) => (
              <Piglin
                key={i}
                position={on(PLACE.village, x, 0, z + charge)}
                rotationY={0}
                walk={charge}
                raise={0.8 + (i % 3) * 0.08}
                sword
                seed={20 + i}
              />
            ))}
            <FloatingNumber text="12 PIGLINS" color="#ff4f42" position={on(PLACE.village, 0, 3.4, -14.5)} height={0.7 * pop(t, wordAt("5.twelve", "twelve"))} />
          </>
        );
      },
    },
    {
      cue: "5.slam",
      ...cam.front({ actor: on(PLACE.vault, 0, 0.6, 2.0), facing: 0, dist: 6.4, to: 5.1, side: -26, pitch: 6, fov: 44 }),
      zone: "vault",
      look: "overworld-night",
      note: "Mayor Vance slams his iron vault shut in panic yelling '200 EMERALDS!' while refusing to help the townsfolk.",
      stage: (t) => {
        const slam = 1 - ease(ramp(t, 0, wordAt("5.slam", "slammed") + 0.25));
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={slam * 0.5} lever={0} />
            <MayorVance position={on(PLACE.vault, 0.8, 0.5, 2.0)} rotationY={-0.25} animation="point" face="angry" time={t} />
            <FloatingNumber text="200!" color="#ff4f42" position={on(PLACE.vault, 0.8, 3.0, 2.0)} height={0.72 * pop(t, wordAt("5.slam", "two"))} />
          </>
        );
      },
    },
    {
      cue: "5.back",
      ...cam.track({ from: on(PLACE.village, 0, 0, -4.5), to: on(PLACE.village, 0, 0, 0.5), sideDist: 6.0, side: 1, lead: -1.4, height: 1.7 }),
      zone: "village",
      look: "overworld-night",
      note: "Lateral action tracking shot: iron guards retreat down the cobble street as Piglins push them back from ten blocks to two.",
      stage: (t) => {
        const g1 = moveBetween(on(PLACE.village, -1.1, 0, -5.0), on(PLACE.village, -1.1, 0, 0.4), t, 0, 2.6);
        const g2 = moveBetween(on(PLACE.village, 1.1, 0, -4.8), on(PLACE.village, 1.1, 0, 0.6), t, 0, 2.6);
        const step = ease(ramp(t, 0, 2.6)) * 5.2;
        const tenAt = wordAt("5.back", "ten");
        const fiveAt = wordAt("5.back", "five");
        const twoAt = wordAt("5.back", "two");
        const label = t >= twoAt ? "2 BLOCKS" : t >= fiveAt ? "5 BLOCKS" : "10 BLOCKS";
        const popAt = t >= twoAt ? twoAt : t >= fiveAt ? fiveAt : tenAt;
        return (
          <>
            <IronGuard position={g1.position} rotationY={g1.rotationY} animation={g1.moving ? "run" : "cower"} animDistance={g1.animDistance} face="fear" time={t} />
            <IronGuard position={g2.position} rotationY={g2.rotationY} animation={g2.moving ? "run" : "cower"} animDistance={g2.animDistance} face="scared" time={t} />
            <Piglin position={on(PLACE.village, -0.9, 0, -9.2 + step)} rotationY={0} walk={step} raise={0.9} sword seed={31} />
            <Piglin position={on(PLACE.village, 1.0, 0, -9.0 + step)} rotationY={0} walk={step} raise={0.9} sword seed={32} />
            <FloatingNumber text={label} color="#ff4f42" position={on(PLACE.village, 0, 2.9, -2.5)} height={0.62 * pop(t, popAt)} />
          </>
        );
      },
    },
    {
      cue: "5.corner",
      ...cam.sweep({ on: on(PLACE.village, 0, 1.2, 6.2), dist: 6.8, distTo: 5.4, fromYaw: 156, toYaw: 204, pitch: 10, fov: 46 }),
      zone: "village",
      look: "overworld-night",
      note: "Reverse sweep from the Piglins' side looking south onto terrified townsfolk cornered in the south square.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, 0, 0, 5.8)} rotationY={Math.PI} animation="cower" face="fear" time={t} />
          <Player who={1} position={on(PLACE.village, -1.7, 0, 6.2)} rotationY={Math.PI - 0.2} animation="cower" face="scared" time={t} />
          <Player who={4} position={on(PLACE.village, 1.7, 0, 6.0)} rotationY={Math.PI + 0.2} animation="panic" face="fear" time={t} />
          <Player who={6} position={on(PLACE.village, -1.0, 0, 7.6)} rotationY={Math.PI} animation="cower" face="worried" time={t} />
          <Player who={8} position={on(PLACE.village, 1.2, 0, 7.4)} rotationY={Math.PI} animation="cower" face="fear" time={t} />
          <Piglin position={on(PLACE.village, -2.5, 0, 2.2)} rotationY={0.25} walk={0} raise={0.85} sword seed={33} />
          <Piglin position={on(PLACE.village, 2.5, 0, 2.2)} rotationY={-0.25} walk={0} raise={0.85} sword seed={34} />
        </>
      ),
    },
    {
      cue: "6.wait",
      ...cam.front({ actor: on(PLACE.village, 0, 0, 5.8), facing: 0, dist: 5.2, to: 3.9, side: -22, pitch: 4, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "Heroic realization push-in: Toby's eyes light up with a golden glow as he remembers the real Minecraft Piglin rules.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, 0, 0, 5.8)} rotationY={0} animation="point" face="wow" time={t} />
          <Glow position={on(PLACE.village, 0, 1.65, 5.8)} size={2.0 * pop(t, wordAt("6.wait", "rules"))} color="#ffe066" opacity={0.42} />
        </>
      ),
    },
    {
      cue: "6.calm",
      ...cam.twoShot({ a: on(PLACE.village, -1.0, 0, 2.2), b: on(PLACE.village, 1.1, 0, 2.2), facing: 0, dist: 6.0, to: 4.8, side: 26, pitch: 6, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "Clear visual rule proof: Toby stands smiling in his gold helmet while a Piglin lowers its sword calmly right beside him.",
      stage: (t) => (
        <>
          <Hero position={on(PLACE.village, -1.0, 0, 2.2)} rotationY={0.25} animation="wave" face="brave" time={t} />
          <Piglin position={on(PLACE.village, 1.1, 0, 2.2)} rotationY={-0.35} walk={0} calm={1} sword headYaw={-0.3} seed={35} />
          <Bubble text="1 GOLD = SAFE" dark position={on(PLACE.village, 0, 2.4, 2.2)} rotationY={0.35} scale={0.46 * pop(t, wordAt("6.calm", "gold"))} />
        </>
      ),
    },
    {
      cue: "6.trade",
      ...cam.sweep({ on: on(PLACE.village, 0, 1.1, 2.2), dist: 5.8, distTo: 4.6, fromYaw: -28, toYaw: 24, pitch: 8, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "Visual trade demonstration: a gleaming Gold Ingot arcs to a Piglin, who drops his sword and holds out a glowing Ender Pearl.",
      stage: (t) => {
        const toss = ease(ramp(t, 0.15, wordAt("6.trade", "trade")));
        return (
          <>
            <Hero position={on(PLACE.village, -1.3, 0, 2.2)} rotationY={Math.PI / 2} animation="reach" face="grin" time={t} />
            <GoldIngot position={on(PLACE.village, -0.7 + toss * 1.4, 1.1 + Math.sin(toss * Math.PI) * 0.75, 2.2)} rotation={[0, t * 5, 0]} scale={1.25} />
            <Piglin position={on(PLACE.village, 1.3, 0, 2.2)} rotationY={-Math.PI / 2} walk={0} calm={1} sword={false} holdGold={toss > 0.7} holdPearl={toss > 0.85} seed={36} />
          </>
        );
      },
    },
    {
      cue: "6.sprint",
      ...cam.track({ from: on(PLACE.vault, 0, 0, 10.5), to: on(PLACE.vault, 0, 0, 3.0), sideDist: 5.8, side: -1, lead: 1.6, height: 1.6 }),
      zone: "vault",
      look: "overworld-night",
      note: "Fast action tracking shot: Toby sprints straight up the plaza stairs toward the brick vault in his bright gold helmet.",
      stage: (t) => {
        const run = moveBetween(on(PLACE.vault, 0, 0, 10.5), on(PLACE.vault, 0, 0.5, 3.0), t, 0, 1.8);
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
            <Hero position={run.position} rotationY={run.rotationY} animation={run.moving ? "run" : "reach"} animDistance={run.animDistance} face="brave" time={t} />
            <Piglin position={on(PLACE.vault, 2.4, 0, 7.4)} rotationY={-0.7} walk={0} calm={1} sword seed={37} />
            <Piglin position={on(PLACE.vault, 2.2, 0, 4.4)} rotationY={-0.7} walk={0} calm={1} sword seed={38} />
          </>
        );
      },
    },
    {
      cue: "6.walk",
      ...cam.front({ actor: on(PLACE.vault, 0, 0.3, 4.0), facing: Math.PI, dist: 6.4, to: 5.0, side: 20, pitch: 8, fov: 44 }),
      zone: "vault",
      look: "overworld-night",
      note: "Reverse front angle looking from the vault steps: three Piglins stare at Toby's gleaming gold helmet and step politely aside.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.vault, 0, 0, 7.2), on(PLACE.vault, 0, 0.5, 2.4), t, 0, 1.8);
        const stepOut = ease(ramp(t, 0.25, 1.3)) * 1.1;
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={0} lever={0} />
            <Hero position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "wave"} animDistance={w.animDistance} face="grin" time={t} />
            <Piglin position={on(PLACE.vault, -1.5 - stepOut, 0, 4.8)} rotationY={-Math.PI / 2} walk={stepOut} calm={1} sword seed={39} />
            <Piglin position={on(PLACE.vault, 1.5 + stepOut, 0, 4.4)} rotationY={Math.PI / 2} walk={stepOut} calm={1} sword seed={40} />
            <Piglin position={on(PLACE.vault, -1.6 - stepOut * 0.8, 0, 2.8)} rotationY={-Math.PI / 2} walk={stepOut * 0.8} calm={1} sword seed={41} />
          </>
        );
      },
    },
    {
      cue: "6.lever",
      ...cam.sweep({ on: on(PLACE.vault, 0.4, 1.7, 0.8), dist: 6.0, distTo: 4.8, fromYaw: -22, toYaw: 28, pitch: 5, fov: 44 }),
      zone: "vault",
      look: "overworld-night",
      note: "Climax breakthrough sweep: Toby turns three-quarter profile yanking the red wall lever down as the heavy iron vault door swings wide open.",
      stage: (t) => {
        const pullAt = wordAt("6.lever", "pulled");
        const pull = ease(ramp(t, pullAt - 0.1, pullAt + 0.35));
        const openK = ease(ramp(t, pullAt + 0.1, pullAt + 0.95));
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={openK} lever={pull} />
            <Hero position={on(PLACE.vault, 1.45, 0.55, 1.35)} rotationY={0.75} animation="reachUp" face="grin" time={t} />
            {openK > 0.2 ? <Puffs position={on(PLACE.vault, 0, 1.5, 0.6)} color="#ffe899" count={8} size={0.2} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.rain",
      ...cam.top({ on: on(PLACE.vault, 0, 0.6, 4.2), height: 7.4, to: 5.6, spin: [14, -14], fov: 48 }),
      zone: "vault",
      look: "overworld-night",
      note: "High spinning overhead cascade: one hundred shining gold ingots pour out of the open vault and scatter across the cobbles.",
      stage: (t) => {
        const k = ease(ramp(t, 0, 1.9));
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={1} lever={1} />
            <Hero position={on(PLACE.vault, 1.9, 0.55, 1.6)} rotationY={0} animation="cheer" face="laugh" time={t} />
            {Array.from({ length: 24 }, (_, i) => {
              const gx = ((i % 6) - 2.5) * 0.95 + Math.sin(i * 3.1) * 0.2;
              const gz = 0.8 + k * (2.2 + (i % 4) * 1.45);
              const gy = 0.25 + Math.max(0, Math.sin(k * Math.PI + i * 0.4)) * (1.2 - k * 0.8);
              return (
                <GoldIngot
                  key={i}
                  position={on(PLACE.vault, gx, gy, gz)}
                  rotation={[i * 0.3, t * 4 + i, i * 0.2]}
                  scale={1.15}
                />
              );
            })}
            <FloatingNumber text="100 GOLD!" color="#ffd84d" position={on(PLACE.vault, 0, 2.8, 3.6)} height={0.68 * pop(t, wordAt("6.rain", "hundred"))} />
          </>
        );
      },
    },
  ],
});

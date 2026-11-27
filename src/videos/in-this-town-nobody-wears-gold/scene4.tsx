import type React from "react";
import {
  BrickVault,
  Bubble,
  EnderPearlOrb,
  FloatingNumber,
  GoldBootPair,
  GoldIngot,
  Grandpa,
  Hero,
  MayorVance,
  PLACE,
  Piglin,
  PixelHeart,
  Player,
  ROBE,
  SubscribeSign,
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

/** Scene 4 (Beat 7): 4-Layer Stacked Payoff — Barter Miracle, Mayor Karma, Grandpa's Return, Story CTA. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Barter Miracle & Grandpa's Return",
  shots: [
    {
      cue: "7.freeze",
      ...cam.sweep({ on: on(PLACE.vault, 0, 1.3, 5.2), dist: 6.6, distTo: 5.3, fromYaw: 32, toYaw: -18, pitch: 8, fov: 44 }),
      zone: "vault",
      look: "overworld-night",
      note: "Comedic freeze beat: three charging Piglins halt mid-swing, drop their swords, and stare wide-eyed at gleaming gold bars.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, wordAt("7.freeze", "dropped") + 0.3));
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={1} lever={1} />
            <Piglin position={on(PLACE.vault, -1.6, 0, 5.2)} rotationY={0.2} walk={0} raise={(1 - k) * 0.85} calm={k} sword={k < 0.5} headPitch={k * 0.42} seed={51} />
            <Piglin position={on(PLACE.vault, 0, 0, 5.6)} rotationY={0} walk={0} raise={(1 - k) * 0.9} calm={k} sword={k < 0.5} headPitch={k * 0.42} seed={52} />
            <Piglin position={on(PLACE.vault, 1.6, 0, 5.2)} rotationY={-0.2} walk={0} raise={(1 - k) * 0.85} calm={k} sword={k < 0.5} headPitch={k * 0.42} seed={53} />
            {[-1.5, -0.5, 0.5, 1.5, 0].map((gx, i) => (
              <GoldIngot key={i} position={on(PLACE.vault, gx, 0.08, 4.4 + (i % 2) * 0.5)} rotation={[0, i * 0.7 + t * 0.4, 0]} scale={1.15} />
            ))}
          </>
        );
      },
    },
    {
      cue: "7.pearls",
      ...cam.twoShot({ a: on(PLACE.vault, -1.3, 0, 5.5), b: on(PLACE.vault, 1.3, 0, 5.5), facing: 0, dist: 6.4, to: 5.2, side: -24, pitch: 7, fov: 44 }),
      zone: "vault",
      look: "overworld-night",
      note: "Joyful vanilla barter payoff: Piglins admire gold ingots and toss glowing cyan Ender Pearls cleanly to cheering villagers.",
      stage: (t) => {
        const arcK = ease(ramp(t, wordAt("7.pearls", "tossed") - 0.1, wordAt("7.pearls", "back") + 0.3));
        return (
          <>
            <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={1} lever={1} />
            <Piglin position={on(PLACE.vault, -1.3, 0, 5.4)} rotationY={0.5} walk={0} calm={1} sword={false} holdGold holdPearl seed={54} />
            <Piglin position={on(PLACE.vault, 1.3, 0, 5.4)} rotationY={-0.5} walk={0} calm={1} sword={false} holdGold holdPearl seed={55} />
            <EnderPearlOrb position={on(PLACE.vault, -0.6 + arcK * 0.8, 1.3 + Math.sin(arcK * Math.PI) * 0.9, 6.2 + arcK * 1.1)} scale={1.2} />
            <EnderPearlOrb position={on(PLACE.vault, 0.7 - arcK * 0.5, 1.2 + Math.sin(arcK * Math.PI) * 0.85, 6.4 + arcK * 1.0)} scale={1.2} />
            <Hero position={on(PLACE.vault, 0, 0, 7.6)} rotationY={Math.PI} animation="cheer" face="laugh" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.mayor",
      ...cam.front({ actor: on(PLACE.village, 0, 0, 4.0), facing: 0, dist: 5.8, to: 4.6, side: 26, pitch: 5, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "Villain hubris beat: Mayor Vance marches onto Main Street in a full shiny iron suit yelling 'GOLD IS CURSED!'",
      stage: (t) => {
        const stomp = moveBetween(on(PLACE.village, 0, 0, 1.2), on(PLACE.village, 0, 0, 4.2), t, 0, 1.4);
        return (
          <>
            <MayorVance ironSuit position={stomp.position} rotationY={stomp.rotationY} animation={stomp.moving ? "walk" : "point"} animDistance={stomp.animDistance} face="angry" time={t} />
            <Bubble text="CURSED!" dark position={on(PLACE.village, 0, 2.4, 4.0)} rotationY={0.35} scale={0.48 * pop(t, wordAt("7.mayor", "cursed"))} />
          </>
        );
      },
    },
    {
      cue: "7.six",
      ...cam.track({ from: on(PLACE.village, 0, 0, 4.0), to: on(PLACE.village, 0, 0, 11.0), sideDist: 6.2, side: -1, lead: 1.5, height: 1.7 }),
      zone: "village",
      look: "overworld-night",
      note: "Poetic villain karma tracking shot: Mayor Vance bolts down Main Street in iron armor chased by three angry Piglins — '6 BLOCKS!'",
      stage: (t) => {
        const run = moveBetween(on(PLACE.village, 0, 0, 4.2), on(PLACE.village, 0, 0, 11.2), t, 0, 2.0);
        const chase = ease(ramp(t, 0, 2.0)) * 6.4;
        return (
          <>
            <MayorVance ironSuit position={run.position} rotationY={run.rotationY} animation={run.moving ? "run" : "panic"} animDistance={run.animDistance} face="fear" time={t} />
            <Piglin position={on(PLACE.village, -1.1, 0, 1.2 + chase)} rotationY={0} walk={chase} raise={0.95} sword seed={56} />
            <Piglin position={on(PLACE.village, 0, 0, 0.8 + chase)} rotationY={0} walk={chase} raise={0.95} sword seed={57} />
            <Piglin position={on(PLACE.village, 1.1, 0, 1.3 + chase)} rotationY={0} walk={chase} raise={0.95} sword seed={58} />
            <FloatingNumber text="6 BLOCKS" color="#ff4f42" position={on(PLACE.village, 0, 2.9, 7.6)} height={0.62 * pop(t, wordAt("7.six", "six"))} />
          </>
        );
      },
    },
    {
      cue: "7.boots",
      ...cam.streetOverview({ from: on(PLACE.village, 0, 0, 11.5), to: on(PLACE.village, 0, 0, 4.5), height: 4.8, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "Bright golden morning crane down Main Street: the whole town cheers while putting on shiny matching gold boots.",
      stage: (t) => (
        <>
          <Hero goldBoots position={on(PLACE.village, -0.95, 0, 4.2)} rotationY={0.15} animation="cheer" face="grin" time={t} />
          <Player who={1} colors={{ torso: "#3b82b6", arms: "skin", legs: "#f2c12e" }} position={on(PLACE.village, -2.1, 0, 2.2)} rotationY={0.2} animation="cheer" face="smile" time={t} />
          <Player who={4} colors={{ torso: "#4fa85a", arms: "skin", legs: "#f2c12e" }} position={on(PLACE.village, 1.05, 0, 4.0)} rotationY={-0.15} animation="cheer" face="grin" time={t} />
          <Player who={7} colors={{ torso: "#c96240", arms: "skin", legs: "#f2c12e" }} position={on(PLACE.village, -1.6, 0, -0.5)} rotationY={0.15} animation="wave" face="smile" time={t} />
          <Player who={9} colors={{ torso: "#7857a8", arms: "skin", legs: "#f2c12e" }} position={on(PLACE.village, 1.8, 0, 0.6)} rotationY={-0.15} animation="wave" face="grin" time={t} />
          <GoldBootPair position={on(PLACE.village, -0.9, 0.06, 5.8)} scale={1.25} />
          <GoldBootPair position={on(PLACE.village, 0.9, 0.06, 5.8)} scale={1.25} />
        </>
      ),
    },
    {
      cue: "7.pines",
      ...cam.track({ from: on(PLACE.pines, 0, 0, 10.5), to: on(PLACE.pines, 0, 0, 3.5), sideDist: 6.0, side: 1, lead: 1.6, height: 1.6 }),
      zone: "pines",
      look: "overworld-day",
      note: "Triumphant morning tracking shot into the pine forest: Toby leads townsfolk in shiny gold boots straight past calm Piglins.",
      stage: (t) => {
        const w0 = moveBetween(on(PLACE.pines, 0, 0, 10.5), on(PLACE.pines, 0, 0, 3.5), t, 0, 2.0);
        const w1 = moveBetween(on(PLACE.pines, -1.3, 0, 11.4), on(PLACE.pines, -1.3, 0, 4.4), t, 0, 2.0);
        const w2 = moveBetween(on(PLACE.pines, 1.3, 0, 11.2), on(PLACE.pines, 1.3, 0, 4.2), t, 0, 2.0);
        return (
          <>
            <Hero goldBoots position={w0.position} rotationY={w0.rotationY} animation={w0.moving ? "walk" : "wave"} animDistance={w0.animDistance} face="brave" time={t} />
            <Player who={3} colors={{ torso: "#4888b8", arms: "skin", legs: "#f2c12e" }} position={w1.position} rotationY={w1.rotationY} animation={w1.moving ? "walk" : "wave"} animDistance={w1.animDistance} face="smile" time={t} />
            <Player who={6} colors={{ torso: "#b86842", arms: "skin", legs: "#f2c12e" }} position={w2.position} rotationY={w2.rotationY} animation={w2.moving ? "walk" : "wave"} animDistance={w2.animDistance} face="grin" time={t} />
            <Piglin position={on(PLACE.pines, 2.6, 0, 6.8)} rotationY={-1.2} walk={0} calm={1} sword={false} holdGold seed={60} />
          </>
        );
      },
    },
    {
      cue: "7.back2",
      ...cam.sweep({ on: on(PLACE.pines, 0, 1.2, 4.5), dist: 7.0, distTo: 5.6, fromYaw: -28, toYaw: 24, pitch: 8, fov: 45 }),
      zone: "pines",
      look: "overworld-golden",
      note: "Emotional reunion sweep: missing neighbors walk out of the sunlit pines waving, with Grandpa walking calmly out last.",
      stage: (t) => {
        const gr = moveBetween(on(PLACE.pines, 0, 0, 0.5), on(PLACE.pines, 0, 0, 4.8), t, 0, 1.9);
        const n1 = moveBetween(on(PLACE.pines, -1.8, 0, 1.5), on(PLACE.pines, -1.8, 0, 5.4), t, 0, 1.7);
        const n2 = moveBetween(on(PLACE.pines, 1.8, 0, 1.8), on(PLACE.pines, 1.8, 0, 5.6), t, 0, 1.7);
        return (
          <>
            <Grandpa goldBoots position={gr.position} rotationY={gr.rotationY} animation={gr.moving ? "walk" : "wave"} animDistance={gr.animDistance} face="grin" time={t} />
            <Player who={1} position={n1.position} rotationY={n1.rotationY} animation={n1.moving ? "walk" : "cheer"} animDistance={n1.animDistance} face="grin" time={t} />
            <Player who={8} position={n2.position} rotationY={n2.rotationY} animation={n2.moving ? "walk" : "cheer"} animDistance={n2.animDistance} face="laugh" time={t} />
            <FloatingNumber text="20 SAFE!" color="#ffd84d" position={on(PLACE.pines, 0, 2.9, 4.5)} height={0.58 * pop(t, wordAt("7.back2", "twenty"))} />
          </>
        );
      },
    },
    {
      cue: "7.tap",
      ...cam.twoShot({ a: on(PLACE.pines, -0.65, 0, 5.8), b: on(PLACE.pines, 0.65, 0, 5.8), facing: 0, dist: 5.2, to: 4.1, side: 20, pitch: 5, fov: 42 }),
      zone: "pines",
      look: "overworld-golden",
      note: "Heartwarming reunion two-shot: Grandpa taps Toby's dented gold helmet grinning 'TOLD YOU SO' as a voxel heart pops.",
      stage: (t) => (
        <>
          <Grandpa goldBoots position={on(PLACE.pines, -0.65, 0, 5.8)} rotationY={0.45} animation="reach" face="grin" time={t} />
          <Hero goldBoots position={on(PLACE.pines, 0.65, 0, 5.8)} rotationY={-0.45} animation="laugh" face="laugh" time={t} />
          <PixelHeart position={on(PLACE.pines, 0, 2.25, 5.8)} rotationY={0.3} scale={1.15 * pop(t, wordAt("7.tap", "grinned"))} />
        </>
      ),
    },
    {
      cue: "7.shop",
      ...cam.front({ actor: on(PLACE.vault, 4.2, 0, 5.6), facing: -0.45, dist: 6.4, to: 5.2, side: -22, pitch: 8, fov: 44 }),
      zone: "vault",
      look: "overworld-day",
      note: "Clean payoff beat at the vault plaza: Mayor Vance's empty iron stall gets stamped 'CLOSED' while Piglins trade peacefully nearby.",
      stage: (t) => (
        <>
          <BrickVault position={on(PLACE.vault, 0, 0, 0)} open={1} lever={1} />
          <FloatingNumber text="CLOSED" color="#ff4f42" position={on(PLACE.vault, 4.8, 2.55, 5.8)} height={0.62 * pop(t, wordAt("7.shop", "shut"))} />
          <Piglin position={on(PLACE.vault, 2.0, 0, 6.6)} rotationY={0.6} walk={0} calm={1} sword={false} holdGold holdPearl seed={61} />
          <Villager robe={ROBE.brown} position={on(PLACE.vault, 3.2, 0, 7.2)} rotationY={-0.8} nod={Math.sin(t * 6) * 0.25} />
        </>
      ),
    },
    {
      cue: "7.cta",
      ...cam.sweep({ on: on(PLACE.village, 0, 1.35, 3.0), dist: 5.8, distTo: 4.5, fromYaw: -18, toYaw: 16, pitch: 6, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Final joyful button on Main Street: Toby and Grandpa wave under the red Subscribe sign flanked by cheering neighbors and friendly Piglins.",
      stage: (t) => (
        <>
          <Hero goldBoots position={on(PLACE.village, -0.55, 0, 3.0)} rotationY={0} animation="wave" face="grin" time={t} />
          <Grandpa goldBoots position={on(PLACE.village, 0.75, 0, 2.8)} rotationY={-0.1} animation="cheer" face="grin" time={t} />
          <Piglin position={on(PLACE.village, -2.0, 0, 1.8)} rotationY={0.2} walk={0} calm={1} sword={false} holdGold seed={62} />
          <Piglin position={on(PLACE.village, 2.1, 0, 1.8)} rotationY={-0.2} walk={0} calm={1} sword={false} holdPearl seed={63} />
          <SubscribeSign position={on(PLACE.village, 0, 2.65, 2.9)} scale={1.0 * pop(t, 0.15)} />
        </>
      ),
    },
  ],
});

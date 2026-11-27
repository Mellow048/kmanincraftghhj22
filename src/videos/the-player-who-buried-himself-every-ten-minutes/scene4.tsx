import type React from "react";
import {
  FloatingHeart,
  FriendlyGolem,
  PLACE,
  PoppyFlower,
  Puffs,
  SafeBooth,
  ServerPlayer,
  SubscribeSign,
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

/** Scene 4 (Beats 6–7): Widened 9:16 Safe-Booth Build, Friendly Iron Golems, Heart Payoff & Subscribe CTA! */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Safe Spots For Milo",
  shots: [
    {
      cue: "6.build",
      ...cam.sweep({ on: on(PLACE.smp, 0, 1.4, 2.0), dist: 8.6, distTo: 7.0, fromYaw: -26, toYaw: 20, pitch: 10, fov: 48 }),
      zone: "smp",
      look: "overworld-night",
      note: "Wide energetic overnight build montage: Owner and friends build a glowing oak Safe Booth — everyone 100% framed.",
      stage: (t) => {
        const buildK = ease(ramp(t, 0.1, 1.3));
        return (
          <>
            <SafeBooth position={on(PLACE.smp, 0, 0, 0.8)} scale={0.4 + 0.6 * buildK} lit={buildK} />
            <ServerPlayer role="owner" crown position={on(PLACE.smp, -2.0, 0, 2.6)} rotationY={0.5} animation="reach" face="grin" time={t} />
            <ServerPlayer role="friendA" position={on(PLACE.smp, 2.0, 0, 2.6)} rotationY={-0.5} animation="reachUp" face="grin" time={t} />
            <Puffs position={on(PLACE.smp, 0, 1.4, 1.2)} color="#ffdf94" count={8} size={0.18} />
          </>
        );
      },
    },
    {
      cue: "6.wood2",
      ...cam.track({ from: on(PLACE.smp, 0, 0, -2.0), to: on(PLACE.smp, 0, 0, -10.5), sideDist: 7.4, side: 1, lead: 1.5, height: 2.0 }),
      zone: "smp",
      look: "overworld-night",
      hud: { banner: { text: "SAFE BOOTH EVERY 50 BLOCKS", color: "#ffd84d" } },
      note: "Wider tracking shot showcasing warm oak Safe Booths spaced neatly down the village path — zero cropped roofs.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.smp, 1.5, 0, -2.0), on(PLACE.smp, 1.5, 0, -10.5), t, 0, 1.7);
        return (
          <>
            <SafeBooth position={on(PLACE.smp, -1.6, 0, -3.5)} rotationY={0.4} lit={1} />
            <SafeBooth position={on(PLACE.smp, -1.6, 0, -9.8)} rotationY={0.4} lit={1} />
            <ServerPlayer role="friendB" torch position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.lamp",
      ...cam.sweep({ on: on(PLACE.smp, 0.4, 1.4, 1.2), dist: 7.4, distTo: 6.0, fromYaw: -22, toYaw: 16, pitch: 8, fov: 46 }),
      zone: "smp",
      look: "overworld-night",
      note: "Cozy golden sweep as warm redstone lanterns click bright inside the glass booth behind a protective iron door.",
      stage: (t) => {
        const lit = ease(ramp(t, 0.1, wordAt("6.lamp", "lanterns") + 0.3));
        return (
          <>
            <SafeBooth position={on(PLACE.smp, -0.3, 0, 0.8)} lit={lit} />
            <ServerPlayer role="friendC" position={on(PLACE.smp, 1.8, 0, 2.2)} rotationY={-0.5} animation="cheer" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.golem",
      ...cam.sweep({ on: on(PLACE.smp, 0.1, 1.4, 1.6), dist: 7.8, distTo: 6.4, fromYaw: 20, toYaw: -16, pitch: 6, fov: 46 }),
      zone: "smp",
      look: "overworld-night",
      hud: { banner: { text: "IRON GOLEM GUARD", color: "#4ce87a" } },
      note: "FIXED GOLEM FRAMING: Both the Safe Booth AND the full towering friendly Iron Golem (head, arms & red poppy) stay 100% inside 9:16!",
      stage: (t) => (
        <>
          <SafeBooth position={on(PLACE.smp, -1.3, 0, 0.6)} lit={1} />
          <FriendlyGolem position={on(PLACE.smp, 1.25, 0, 1.9)} rotationY={-0.25} poppy />
        </>
      ),
    },
    {
      cue: "6.sign",
      ...cam.sweep({ on: on(PLACE.smp, -0.4, 1.65, 1.2), dist: 7.2, distTo: 5.8, fromYaw: 16, toYaw: -14, pitch: 6, fov: 46 }),
      zone: "smp",
      look: "overworld-golden",
      hud: { banner: { text: "SAFE FOR MILO", color: "#ffd84d", sub: "NEVER DIG ALONE" } },
      note: "Warm golden dawn: Server Owner hangs the wooden sign reading 'SAFE FOR MILO' above the glowing booth — both fully framed.",
      stage: (t) => (
        <>
          <SafeBooth position={on(PLACE.smp, 0.2, 0, 0.5)} lit={1} signText="SAFE FOR MILO" />
          <ServerPlayer role="owner" nameTag="Owner" crown position={on(PLACE.smp, -1.75, 0, 2.0)} rotationY={0.4} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "6.join",
      ...cam.track({ from: on(PLACE.smp, 0, 0, 8.5), to: on(PLACE.smp, 0, 0, 4.5), sideDist: 6.4, side: -1, lead: 1.4, height: 1.7 }),
      zone: "smp",
      look: "overworld-golden",
      hud: {
        clock: "NEXT EVENING",
        chat: [{ text: "Milo joined the game", color: "#ffeb5c" }],
      },
      note: "Golden evening tracking shot as Milo logs back in with empty pockets walking hesitantly down Main Street.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.smp, 0, 0, 8.5), on(PLACE.smp, 0, 0, 4.5), t, 0, 1.6);
        return (
          <ServerPlayer role="hero" nameTag="Milo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "shrug"} animDistance={w.animDistance} face="uneasy" time={t} />
        );
      },
    },
    {
      cue: "6.glow",
      ...cam.streetOverview({ from: on(PLACE.smp, 0, 0, 12.8), to: on(PLACE.smp, 0, 0, 9.0), on: on(PLACE.smp, 0, 1.2, 1.8), onTo: on(PLACE.smp, 0, 1.2, 0.8), height: 5.2, fov: 48 }),
      zone: "smp",
      look: "overworld-golden",
      note: "FIXED WIDE LANTERN REVEAL: Warm glowing Safe Booths, Iron Golem, and awe-struck Milo all 100% cleanly framed with zero cut-off limbs!",
      stage: (t) => (
        <>
          <SafeBooth position={on(PLACE.smp, -2.0, 0, 1.4)} rotationY={0.35} lit={1} signText="SAFE FOR MILO" />
          <SafeBooth position={on(PLACE.smp, 2.0, 0, -4.2)} rotationY={-0.35} lit={1} />
          <FriendlyGolem position={on(PLACE.smp, 1.9, 0, 2.0)} rotationY={-0.3} poppy />
          <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -0.6, 0, 4.4)} rotationY={0.15} animation="wave" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "6.drop",
      ...cam.frameDuo({ a: on(PLACE.smp, -1.3, 0, 4.0), b: on(PLACE.smp, 1.6, 0, 4.0), fromYaw: 24, toYaw: -16, pitch: 8, fov: 46 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Joyful friendship payoff: Owner and friends step forward tossing gleaming flowers and fresh gear to Milo.",
      stage: (t) => {
        const arc = ease(ramp(t, 0.15, wordAt("6.drop", "flowers") + 0.25));
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -1.3, 0, 4.0)} rotationY={0.5} animation="cheer" face="grin" time={t} />
            <ServerPlayer role="owner" crown position={on(PLACE.smp, 1.2, 0, 4.0)} rotationY={-0.5} animation="reach" face="grin" time={t} />
            <ServerPlayer role="friendA" position={on(PLACE.smp, 2.2, 0, 2.8)} rotationY={-0.6} animation="cheer" face="laugh" time={t} />
            <PoppyFlower position={on(PLACE.smp, 0.8 - arc * 1.5, 0.9 + Math.sin(arc * Math.PI) * 0.7, 4.0)} scale={1.3} />
          </>
        );
      },
    },
    {
      cue: "6.cry2",
      ...cam.sweep({ on: on(PLACE.smp, 0, 1.3, 4.0), dist: 6.0, distTo: 4.8, fromYaw: -22, toYaw: 20, pitch: 6, fov: 44 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Emotional tear-to-heart payoff: happy pink Minecraft hearts float upward all around smiling Milo.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Milo" badge="heart" tears={0.65} position={on(PLACE.smp, 0, 0, 4.0)} rotationY={0} animation="wave" face="grin" time={t} />
          <FloatingHeart position={on(PLACE.smp, 0, 1.85, 4.0)} count={8} spread={1.35} t={t} seed={9} />
        </>
      ),
    },
    {
      cue: "6.hug",
      ...cam.frameDuo({ a: on(PLACE.smp, -1.2, 0, 4.2), b: on(PLACE.smp, 1.2, 0, 4.2), fromYaw: -20, toYaw: 18, pitch: 6, fov: 46 }),
      zone: "smp",
      look: "overworld-golden",
      hud: {
        typing: true,
        chat: [{ sender: "Bully", text: "sorry Milo, welcome home!", color: "#9bf5a6" }],
      },
      note: "Redemption beat: the bully walks over holding a flower as '<Bully> sorry, welcome home' types into chat.",
      stage: (t) => {
        const step = moveBetween(on(PLACE.smp, 2.4, 0, 4.2), on(PLACE.smp, 1.1, 0, 4.2), t, 0, 1.1);
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -1.2, 0, 4.2)} rotationY={0.5} animation="wave" face="grin" time={t} />
            <ServerPlayer role="bully" nameTag="Bully" position={step.position} rotationY={step.rotationY} animation={step.moving ? "walk" : "reach"} animDistance={step.animDistance} face="smile" time={t} />
            <PoppyFlower position={on(PLACE.smp, 0.1, 0.9, 4.2)} scale={1.15} />
          </>
        );
      },
    },
    {
      cue: "6.cta",
      ...cam.sweep({ on: on(PLACE.smp, 0.2, 1.45, 3.0), dist: 8.2, distTo: 6.8, fromYaw: -16, toYaw: 16, pitch: 6, fov: 48 }),
      zone: "smp",
      look: "overworld-day",
      hud: { subscribe: true },
      note: "Wholesome wide final button: Milo, Owner, AND the friendly Iron Golem all fit 100% cleanly beside Milo's glowing Safe Booth beneath the Subscribe sign!",
      stage: (t) => (
        <>
          <SafeBooth position={on(PLACE.smp, -0.3, 0, 0.0)} lit={1} signText="SAFE FOR MILO" />
          <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -1.1, 0, 3.2)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <ServerPlayer role="owner" crown position={on(PLACE.smp, 0.6, 0, 3.2)} rotationY={-0.1} animation="cheer" face="grin" time={t} />
          <FriendlyGolem position={on(PLACE.smp, 2.15, 0, 2.2)} rotationY={-0.3} poppy />
          <SubscribeSign position={on(PLACE.smp, 0, 3.05, 3.0)} scale={0.96 * pop(t, 0.15)} />
        </>
      ),
    },
  ],
});

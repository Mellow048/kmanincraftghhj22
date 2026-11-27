import type React from "react";
import {
  FloatingHeart,
  FloatingNumber,
  FriendlyGolem,
  PLACE,
  PoppyFlower,
  Puffs,
  SafeBooth,
  ServerChatBox,
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

/** Scene 4 (Beats 6–7): Overnight Safe-Booth Build, Friendly Iron Golems, Tear-to-Heart Payoff & Subscribe CTA. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Safe Spots For Milo",
  shots: [
    {
      cue: "6.build",
      ...cam.sweep({ on: on(PLACE.smp, 0, 1.4, 2.0), dist: 7.4, distTo: 5.9, fromYaw: -32, toYaw: 22, pitch: 10, fov: 46 }),
      zone: "smp",
      look: "overworld-night",
      note: "Energetic overnight build montage: friends hammer and place oak walls as a glowing Safe Booth pops up.",
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
      ...cam.track({ from: on(PLACE.smp, 0, 0, -2.0), to: on(PLACE.smp, 0, 0, -11.0), sideDist: 3.8, side: 1, lead: 1.5, height: 1.8 }),
      zone: "smp",
      look: "overworld-night",
      note: "Tracking shot along the road showcasing warm oak Safe Booths spaced neatly down the village path.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.smp, 1.4, 0, -2.0), on(PLACE.smp, 1.4, 0, -11.0), t, 0, 1.7);
        return (
          <>
            <SafeBooth position={on(PLACE.smp, -1.6, 0, -3.5)} rotationY={0.4} lit={1} />
            <SafeBooth position={on(PLACE.smp, -1.6, 0, -10.0)} rotationY={0.4} lit={1} />
            <ServerPlayer role="friendB" torch position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
            <FloatingNumber text="EVERY 50 BLOCKS" color="#ffd84d" position={on(PLACE.smp, 0, 3.2, -6.5)} height={0.54 * pop(t, wordAt("6.wood2", "fifty"))} />
          </>
        );
      },
    },
    {
      cue: "6.lamp",
      ...cam.front({ actor: on(PLACE.smp, 0, 1.2, 1.0), facing: 0, dist: 5.8, to: 4.5, side: -22, pitch: 6, fov: 44 }),
      zone: "smp",
      look: "overworld-night",
      note: "Cozy golden close-up as warm redstone lanterns click bright inside the glass booth behind a protective iron door.",
      stage: (t) => {
        const lit = ease(ramp(t, 0.1, wordAt("6.lamp", "lanterns") + 0.3));
        return (
          <>
            <SafeBooth position={on(PLACE.smp, 0, 0, 0.8)} lit={lit} />
            <ServerPlayer role="friendC" position={on(PLACE.smp, 2.0, 0, 2.2)} rotationY={-0.5} animation="cheer" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.golem",
      ...cam.heroLow({ on: on(PLACE.smp, 0.8, 1.3, 2.2), dist: 5.8, yaw: 22, fov: 44 }),
      zone: "smp",
      look: "overworld-night",
      note: "Heroic low tilt up at a towering friendly Iron Golem standing proudly beside the booth holding a red poppy.",
      stage: (t) => (
        <>
          <SafeBooth position={on(PLACE.smp, -1.2, 0, 0.5)} lit={1} />
          <FriendlyGolem position={on(PLACE.smp, 1.2, 0, 2.0)} rotationY={-0.25} poppy />
          <FloatingNumber text="GUARDED!" color="#4ce87a" position={on(PLACE.smp, 1.2, 3.05, 2.0)} height={0.54 * pop(t, wordAt("6.golem", "golem"))} />
        </>
      ),
    },
    {
      cue: "6.sign",
      ...cam.front({ actor: on(PLACE.smp, 0, 1.7, 1.2), facing: 0, dist: 5.4, to: 4.1, side: 18, pitch: 4, fov: 42 }),
      zone: "smp",
      look: "overworld-golden",
      hud: { banner: { text: "SAFE FOR MILO", color: "#ffd84d", sub: "NEVER DIG ALONE" } },
      note: "Warm golden dawn: Server Owner hangs the wooden sign reading 'SAFE FOR MILO' above the glowing booth.",
      stage: (t) => (
        <>
          <SafeBooth position={on(PLACE.smp, 0, 0, 0.5)} lit={1} signText="SAFE FOR MILO" />
          <ServerPlayer role="owner" nameTag="Owner" crown position={on(PLACE.smp, -1.8, 0, 2.0)} rotationY={0.4} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "6.join",
      ...cam.track({ from: on(PLACE.smp, 0, 0, 8.5), to: on(PLACE.smp, 0, 0, 4.5), sideDist: 3.8, side: -1, lead: 1.4, height: 1.5 }),
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
      ...cam.streetOverview({ from: on(PLACE.smp, 0, 0, 11.2), to: on(PLACE.smp, 0, 0, 7.2), on: on(PLACE.smp, 0, 1.2, 2.0), onTo: on(PLACE.smp, 0, 1.2, 0.8), height: 5.0, fov: 46 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Breathtaking golden reveal crane: warm glowing Safe Booths and friendly Iron Golems line both sides of the sunlit road.",
      stage: (t) => (
        <>
          <SafeBooth position={on(PLACE.smp, -2.0, 0, 1.5)} rotationY={0.35} lit={1} signText="SAFE FOR MILO" />
          <SafeBooth position={on(PLACE.smp, 2.0, 0, -4.0)} rotationY={-0.35} lit={1} />
          <FriendlyGolem position={on(PLACE.smp, 1.9, 0, 2.0)} rotationY={-0.3} poppy />
          <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -1.0, 0, 4.8)} rotationY={0.2} animation="wave" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "6.drop",
      ...cam.frameDuo({ a: on(PLACE.smp, -1.2, 0, 4.0), b: on(PLACE.smp, 1.5, 0, 4.0), fromYaw: 34, toYaw: -10, pitch: 6, fov: 44 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Joyful friendship payoff: Owner and friends step forward tossing gleaming flowers and fresh gear to Milo.",
      stage: (t) => {
        const arc = ease(ramp(t, 0.15, wordAt("6.drop", "flowers") + 0.25));
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -1.2, 0, 4.0)} rotationY={0.5} animation="cheer" face="grin" time={t} />
            <ServerPlayer role="owner" crown position={on(PLACE.smp, 1.2, 0, 4.0)} rotationY={-0.5} animation="reach" face="grin" time={t} />
            <ServerPlayer role="friendA" position={on(PLACE.smp, 2.2, 0, 3.0)} rotationY={-0.6} animation="cheer" face="laugh" time={t} />
            <PoppyFlower position={on(PLACE.smp, 0.8 - arc * 1.5, 0.9 + Math.sin(arc * Math.PI) * 0.7, 4.0)} scale={1.3} />
          </>
        );
      },
    },
    {
      cue: "6.cry2",
      ...cam.sweep({ on: on(PLACE.smp, 0, 1.3, 4.0), dist: 5.2, distTo: 4.0, fromYaw: -24, toYaw: 22, pitch: 6, fov: 42 }),
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
      ...cam.frameDuo({ a: on(PLACE.smp, -1.1, 0, 4.2), b: on(PLACE.smp, 1.2, 0, 4.2), fromYaw: -20, toYaw: 18, pitch: 6, fov: 44 }),
      zone: "smp",
      look: "overworld-golden",
      hud: {
        typing: true,
        chat: [{ sender: "Bully", text: "sorry Milo, welcome home!", color: "#9bf5a6" }],
      },
      note: "Redemption beat: the bully walks over holding a flower as '<Bully> sorry, welcome home' types into chat.",
      stage: (t) => {
        const step = moveBetween(on(PLACE.smp, 2.4, 0, 4.2), on(PLACE.smp, 1.0, 0, 4.2), t, 0, 1.1);
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -1.1, 0, 4.2)} rotationY={0.5} animation="wave" face="grin" time={t} />
            <ServerPlayer role="bully" nameTag="Bully" position={step.position} rotationY={step.rotationY} animation={step.moving ? "walk" : "reach"} animDistance={step.animDistance} face="smile" time={t} />
            <PoppyFlower position={on(PLACE.smp, 0.2, 0.9, 4.2)} scale={1.15} />
          </>
        );
      },
    },
    {
      cue: "6.cta",
      ...cam.sweep({ on: on(PLACE.smp, 0, 1.4, 3.2), dist: 6.2, distTo: 4.8, fromYaw: -18, toYaw: 18, pitch: 6, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      hud: { subscribe: true },
      note: "Wholesome final button: Milo, Owner, and the friendly Iron Golem wave beside Milo's glowing Safe Booth beneath the Subscribe sign.",
      stage: (t) => (
        <>
          <SafeBooth position={on(PLACE.smp, 0, 0, 0.2)} lit={1} signText="SAFE FOR MILO" />
          <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -0.7, 0, 3.2)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <ServerPlayer role="owner" crown position={on(PLACE.smp, 0.85, 0, 3.2)} rotationY={-0.1} animation="cheer" face="grin" time={t} />
          <FriendlyGolem position={on(PLACE.smp, 2.3, 0, 2.2)} rotationY={-0.3} poppy />
          <SubscribeSign position={on(PLACE.smp, 0, 2.95, 3.1)} scale={1.0 * pop(t, 0.15)} />
        </>
      ),
    },
  ],
});

import type React from "react";
import {
  Bubble,
  Clock3AM,
  DirtPit,
  FloatingNumber,
  PLACE,
  Puffs,
  ServerChatBox,
  ServerPlayer,
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

/** Scene 1 (Beats 1–2): Bright SMP Mystery Hook + Weird Every-10-Minutes Habit & Bullying. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Dirt Boy Mystery",
  shots: [
    {
      cue: "1.hook",
      ...cam.sweep({ on: on(PLACE.smp, 0, 1.0, 2.0), dist: 6.2, distTo: 4.9, fromYaw: -26, toYaw: 20, pitch: 10, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      hud: { clock: "EVERY 10 MIN" },
      note: "Bright daylight Frame-1 visual contradiction: Milo drops straight down into a fresh dirt pit and seals a grass lid overhead.",
      stage: (t) => {
        const drop = ease(ramp(t, 0.15, wordAt("1.hook", "buried") + 0.35));
        return (
          <>
            <DirtPit position={on(PLACE.smp, 0, 0, 2.0)} lid={drop} />
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, 0, -drop * 0.95, 2.0)} rotationY={0} animation="cower" face="uneasy" time={t} />
            <ServerPlayer role="friendA" badge="?" position={on(PLACE.smp, -2.0, 0, 2.8)} rotationY={0.5} animation="shrug" face="wow" time={t} />
            <ServerPlayer role="friendB" badge="?" position={on(PLACE.smp, 2.0, 0, 2.8)} rotationY={-0.5} animation="point" face="wow" time={t} />
            <FloatingNumber text="10:00" color="#ffd84d" position={on(PLACE.smp, 0, 2.75, 2.0)} height={0.58 * pop(t, wordAt("1.hook", "ten"))} />
          </>
        );
      },
    },
    {
      cue: "1.mid",
      ...cam.front({ actor: on(PLACE.smp, 0, 0, -4.5), facing: 0, dist: 6.0, to: 4.7, side: 24, pitch: 8, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      note: "Mid-fight comedic shock: two teammates swing bravely while Milo dives under a dirt block right in the middle.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 0.85));
        return (
          <>
            <DirtPit position={on(PLACE.smp, 0, 0, -4.5)} lid={k} />
            <ServerPlayer role="friendA" position={on(PLACE.smp, -1.8, 0, -3.5)} rotationY={0.25} animation="point" face="angry" time={t} />
            <ServerPlayer role="friendC" position={on(PLACE.smp, 1.8, 0, -3.5)} rotationY={-0.25} animation="panic" face="wow" time={t} />
            <FloatingNumber text="MID FIGHT?!" color="#ff4f42" position={on(PLACE.smp, 0, 2.65, -4.5)} height={0.54 * pop(t, wordAt("1.mid", "boss"))} />
          </>
        );
      },
    },
    {
      cue: "1.lid",
      ...cam.heroLow({ on: on(PLACE.smp, 0, 1.1, 2.0), dist: 5.4, yaw: -22, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      note: "Low close push on the dirt shelter lid slamming cleanly down with crisp earthy dust puffs.",
      stage: (t) => {
        const lid = ease(ramp(t, 0.1, wordAt("1.lid", "top") + 0.2));
        return (
          <>
            <DirtPit position={on(PLACE.smp, 0, 0, 2.0)} lid={lid} />
            <Puffs position={on(PLACE.smp, 0, 1.1, 2.0)} color="#8c6742" count={6} size={0.18} />
            <FloatingNumber text="3 BLOCKS" color="#ffd84d" position={on(PLACE.smp, 0, 2.5, 2.0)} height={0.56 * pop(t, wordAt("1.lid", "Three"))} />
          </>
        );
      },
    },
    {
      cue: "1.chat",
      ...cam.frameDuo({ a: on(PLACE.smp, -1.6, 0, 5.4), b: on(PLACE.smp, 1.6, 0, 5.4), fromYaw: -18, toYaw: 20, pitch: 8, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      hud: {
        typing: true,
        chat: [
          { sender: "Bully", text: "bro why did Milo bury himself??", color: "#ff7a7a" },
          { sender: "Sam", text: "LOL again?? ???", color: "#ffeb5c" },
        ],
      },
      note: "Server chat box pops cleanly in screen HUD filled with laughing players and question marks over Milo's dirt pit.",
      stage: (t) => (
        <>
          <DirtPit position={on(PLACE.smp, 0, 0, 3.6)} lid={1} />
          <ServerPlayer role="bully" badge="?" position={on(PLACE.smp, -1.6, 0, 5.4)} rotationY={0.35} animation="laugh" face="grin" time={t} />
          <ServerPlayer role="friendB" badge="?" position={on(PLACE.smp, 1.6, 0, 5.4)} rotationY={-0.35} animation="laugh" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "1.loop",
      ...cam.front({ actor: on(PLACE.smp, 0, 0, 6.2), facing: 0, dist: 5.4, to: 4.1, side: -22, pitch: 5, fov: 42 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Open-loop emotional hook: Milo stands quietly under golden sunlight with a glowing question mark overhead.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, 0, 0, 6.2)} rotationY={0} animation="shrug" face="sad" time={t} />
          <FloatingNumber text="WHY?" color="#ffd84d" position={on(PLACE.smp, 0, 2.75, 6.2)} height={0.68 * pop(t, wordAt("1.loop", "why"))} />
        </>
      ),
    },
    {
      cue: "2.wood",
      ...cam.track({ from: on(PLACE.smp, -1.2, 0, -10.0), to: on(PLACE.smp, -1.2, 0, -14.0), sideDist: 5.8, side: 1, lead: 1.5, height: 1.6 }),
      zone: "smp",
      look: "overworld-day",
      hud: { clock: "12:10 PM" },
      note: "Side tracking shot toward the pine edge: Milo walks up to chop oak wood then stops dead on the noon clock.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.smp, -1.2, 0, -10.0), on(PLACE.smp, -1.2, 0, -13.5), t, 0, 1.2);
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "reach"} animDistance={w.animDistance} face="smile" time={t} />
            <Clock3AM text="12:10" position={on(PLACE.smp, 1.1, 1.85, -13.0)} scale={1.1 * pop(t, wordAt("2.wood", "noon"))} />
          </>
        );
      },
    },
    {
      cue: "2.dig",
      ...cam.sweep({ on: on(PLACE.smp, -1.0, 0.9, -13.5), dist: 5.4, distTo: 4.2, fromYaw: 28, toYaw: -22, pitch: 12, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      note: "Fast comedic sweep: three quick clicks and Milo sinks cleanly below the dirt lid with flying dirt puffs.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 0.95));
        return (
          <>
            <DirtPit position={on(PLACE.smp, -1.0, 0, -13.5)} lid={k} />
            <ServerPlayer role="hero" position={on(PLACE.smp, -1.0, -k * 1.1, -13.5)} rotationY={0} animation="cower" face="uneasy" time={t} />
            <Puffs position={on(PLACE.smp, -1.0, 1.0, -13.5)} color="#8c6742" count={7} size={0.16} />
          </>
        );
      },
    },
    {
      cue: "2.raid",
      ...cam.front({ actor: on(PLACE.smp, 0, 0, -6.5), facing: 0, dist: 6.2, to: 4.9, side: -24, pitch: 8, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      note: "Dungeon raid cutaway: teammate charges left while Milo vanishes under grass mid-swing.",
      stage: (t) => {
        const k = ease(ramp(t, 0.2, 1.1));
        const ally = moveBetween(on(PLACE.smp, -2.4, 0, -5.5), on(PLACE.smp, -1.4, 0, -6.8), t, 0, 1.2);
        return (
          <>
            <DirtPit position={on(PLACE.smp, 0.6, 0, -6.5)} lid={k} />
            <ServerPlayer role="friendA" position={ally.position} rotationY={ally.rotationY} animation={ally.moving ? "run" : "point"} animDistance={ally.animDistance} face="angry" time={t} />
            <ServerPlayer role="friendC" badge="?" position={on(PLACE.smp, 2.2, 0, -5.8)} rotationY={-0.5} animation="shrug" face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.still",
      ...cam.sweep({ on: on(PLACE.smp, 0, 0.9, 1.5), dist: 5.2, distTo: 4.1, fromYaw: -24, toYaw: 24, pitch: 10, fov: 42 }),
      zone: "smp",
      look: "overworld-day",
      note: "Quiet cutaway showing Milo standing perfectly still underground as '3 MINUTES' ticks overhead.",
      stage: (t) => (
        <>
          <DirtPit position={on(PLACE.smp, 0, 0, 1.5)} lid={1} />
          <Clock3AM text="03:00" position={on(PLACE.smp, 0, 2.25, 1.5)} scale={1.05 * pop(t, wordAt("2.still", "three"))} />
        </>
      ),
    },
    {
      cue: "2.back",
      ...cam.front({ actor: on(PLACE.smp, 0, 0, 1.5), facing: 0, dist: 5.6, to: 4.4, side: 20, pitch: 6, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      hud: {
        typing: true,
        chat: [{ sender: "Milo", text: "sorry everyone, im back!", color: "#a8f5c2" }],
      },
      note: "Milo climbs politely back out of the dirt pit waving apologetically as '<Milo> sorry!' types into server chat.",
      stage: (t) => {
        const rise = ease(ramp(t, 0.1, 0.9));
        return (
          <>
            <DirtPit position={on(PLACE.smp, 0, 0, 1.5)} lid={1 - rise} />
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, 0, -0.8 + rise * 0.8, 1.5)} rotationY={0} animation="wave" face="worried" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.mock",
      ...cam.frameDuo({ a: on(PLACE.smp, -1.6, 0, 7.0), b: on(PLACE.smp, 1.5, 0, 7.0), fromYaw: -20, toYaw: 18, pitch: 7, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      hud: {
        chat: [{ sender: "Bully", text: "lol DIRT BOY is back!!", color: "#ff7a7a" }],
      },
      note: "Bully squad crowds down Main Street pointing and laughing while 'DIRT BOY!' pops above.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -1.6, 0, 7.0)} rotationY={0.4} animation="cower" face="sad" time={t} />
          <ServerPlayer role="bully" nameTag="Bully" position={on(PLACE.smp, 0.9, 0, 7.0)} rotationY={-0.5} animation="point" face="grin" time={t} />
          <ServerPlayer role="griefer" position={on(PLACE.smp, 2.2, 0, 6.4)} rotationY={-0.6} animation="laugh" face="grin" time={t} />
          <Bubble text="DIRT BOY!" dark position={on(PLACE.smp, 1.2, 2.55, 7.0)} rotationY={-0.3} scale={0.5 * pop(t, wordAt("2.mock", "Dirt"))} />
        </>
      ),
    },
    {
      cue: "2.laugh",
      ...cam.streetOverview({ from: on(PLACE.smp, 0, 0, 11.8), to: on(PLACE.smp, 0, 0, 10.4), on: on(PLACE.smp, 0, 1.1, 2.5), onTo: on(PLACE.smp, -0.5, 1.1, 5.0), height: 4.8, fov: 46 }),
      zone: "smp",
      look: "overworld-sunset",
      note: "Sunset crane down Main Street as Milo walks away quietly while bullies keep mocking behind him.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.smp, -1.1, 0, 2.0), on(PLACE.smp, -1.1, 0, 6.2), t, 0, 1.6);
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "cower"} animDistance={w.animDistance} face="sad" time={t} />
            <ServerPlayer role="bully" position={on(PLACE.smp, 1.7, 0, 2.8)} rotationY={-0.3} animation="laugh" face="grin" time={t} />
            <ServerPlayer role="griefer" position={on(PLACE.smp, 2.4, 0, 1.4)} rotationY={-0.4} animation="point" face="grin" time={t} />
          </>
        );
      },
    },
  ],
});

import type React from "react";
import {
  Block,
  Bubble,
  Clock3AM,
  DiamondSwordProp,
  DungeonBoss,
  IronAxe,
  NightZombie,
  PLACE,
  Puffs,
  SURFACE_Y,
  ServerPlayer,
  ShaftCap,
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

/**
 * Scene 1 (Beats 1–2): OVERHAULED!
 * - Real sunken forest earth shaft (NEVER a box sitting on a village street!)
 * - Real torch-lit Boss-Fight Dungeon Arena with towering DungeonBoss (`1.mid` & `2.raid`)!
 * - Real forest Oak Tree chopping with Iron Axe & flying wood chips (`2.wood`)!
 * - Real Underground Cutaway Cross-Section showing Milo frozen under the grass while Zombies prowl above (`2.still`)!
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Dirt Boy Mystery",
  shots: [
    {
      cue: "1.hook",
      ...cam.sweep({ on: on(PLACE.forest, 0, SURFACE_Y + 0.9, 0), dist: 7.4, distTo: 6.0, fromYaw: -24, toYaw: 20, pitch: 20, fov: 46 }),
      zone: "forest",
      look: "overworld-day",
      hud: { clock: "10:00 · EVERY 10 MIN" },
      note: "Daylight forest meadow hook: Milo drops straight DOWN into a real carved 3-block sunken dirt hole and seals a flush grass lid level with the meadow — zero overlapping UI!",
      stage: (t) => {
        const drop = ease(ramp(t, 0.15, wordAt("1.hook", "buried") + 0.35));
        return (
          <>
            <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={drop} />
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.forest, 0, SURFACE_Y - drop * 1.85, 0)} rotationY={0} animation="cower" face="uneasy" time={t} />
            <ServerPlayer role="friendA" badge="?" position={on(PLACE.forest, -2.2, SURFACE_Y, 0.8)} rotationY={0.65} animation="shrug" face="wow" time={t} />
            <ServerPlayer role="friendB" badge="?" position={on(PLACE.forest, 2.2, SURFACE_Y, 0.8)} rotationY={-0.65} animation="point" face="wow" time={t} />
            <Puffs position={on(PLACE.forest, 0, SURFACE_Y + 0.2, 0)} color="#8c6742" count={6} size={0.18} />
          </>
        );
      },
    },
    {
      cue: "1.mid",
      ...cam.sweep({ on: on(PLACE.dungeon, 0, SURFACE_Y + 1.4, -1.6), dist: 8.6, distTo: 7.0, fromYaw: 22, toYaw: -18, pitch: 12, fov: 48 }),
      zone: "dungeon",
      look: "overworld-night",
      hud: { banner: { text: "MID BOSS FIGHT?!", color: "#ff5548" } },
      note: "TRUE BOSS FIGHT ARENA: towering blazing DungeonBoss swings his lava greatsword at diamond-sword teammates while Milo drops straight down into a carved dungeon pit!",
      stage: (t) => {
        const drop = ease(ramp(t, 0.1, 0.95));
        return (
          <>
            <DungeonBoss position={on(PLACE.dungeon, 0, SURFACE_Y, -4.4)} rotationY={0} />
            <ShaftCap position={on(PLACE.dungeon, 0, 0, 0)} lid={drop} stone />
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.dungeon, 0, SURFACE_Y - drop * 1.85, 0)} rotationY={0} animation="cower" face="uneasy" time={t} />
            <ServerPlayer role="friendA" position={on(PLACE.dungeon, -2.2, SURFACE_Y, -1.4)} rotationY={2.45} animation="reach" face="angry" time={t}>
              <DiamondSwordProp />
            </ServerPlayer>
            <ServerPlayer role="friendC" position={on(PLACE.dungeon, 2.2, SURFACE_Y, -1.4)} rotationY={-2.45} animation="panic" face="wow" time={t}>
              <DiamondSwordProp />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "1.lid",
      ...cam.sweep({ on: on(PLACE.forest, 0, SURFACE_Y + 0.35, 0), dist: 6.2, distTo: 4.8, fromYaw: -26, toYaw: 16, pitch: 28, fov: 44 }),
      zone: "forest",
      look: "overworld-day",
      hud: { banner: { text: "3 BLOCKS DOWN · DIRT ROOF", color: "#ffd84d" } },
      note: "Angled close view straight into the deep carved earth hole as the flush grass roof seals cleanly over Milo.",
      stage: (t) => {
        const lid = ease(ramp(t, 0.12, wordAt("1.lid", "top") + 0.25));
        return (
          <>
            <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={lid} />
            <ServerPlayer role="hero" position={on(PLACE.forest, 0, 0.18, 0)} rotationY={0} animation="cower" face="uneasy" time={t} />
            <Puffs position={on(PLACE.forest, 0, SURFACE_Y + 0.15, 0)} color="#8c6742" count={8} size={0.18} />
          </>
        );
      },
    },
    {
      cue: "1.chat",
      ...cam.frameDuo({ a: on(PLACE.forest, -1.8, SURFACE_Y, 1.8), b: on(PLACE.forest, 1.8, SURFACE_Y, 1.8), fromYaw: -18, toYaw: 20, pitch: 12, fov: 46 }),
      zone: "forest",
      look: "overworld-day",
      hud: {
        typing: true,
        chat: [
          { sender: "Bully", text: "bro why did Milo bury himself??", color: "#ff7a7a" },
          { sender: "Sam", text: "LOL again?? ???", color: "#ffeb5c" },
        ],
      },
      note: "Laughing players gather around Milo's sealed grass patch in the forest as server chat explodes with question marks.",
      stage: (t) => (
        <>
          <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={1} />
          <ServerPlayer role="bully" badge="?" position={on(PLACE.forest, -1.8, SURFACE_Y, 1.8)} rotationY={0.45} animation="laugh" face="grin" time={t} />
          <ServerPlayer role="friendB" badge="?" position={on(PLACE.forest, 1.8, SURFACE_Y, 1.8)} rotationY={-0.45} animation="laugh" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "1.loop",
      ...cam.front({ actor: on(PLACE.smp, 0, 0, 6.2), facing: 0, dist: 6.2, to: 5.0, side: -22, pitch: 6, fov: 44 }),
      zone: "smp",
      look: "overworld-golden",
      hud: { banner: { text: "UNTIL THEY LEARNED WHY...", color: "#ffd84d" } },
      note: "Open-loop emotional hook: Milo stands quietly in golden sunlight as viewers wonder why he keeps vanishing.",
      stage: (t) => (
        <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, 0, 0, 6.2)} rotationY={0} animation="shrug" face="sad" time={t} />
      ),
    },
    {
      cue: "2.wood",
      ...cam.sweep({ on: on(PLACE.forest, 1.6, SURFACE_Y + 1.3, 1.6), dist: 6.8, distTo: 5.5, fromYaw: -26, toYaw: 20, pitch: 10, fov: 46 }),
      zone: "forest",
      look: "overworld-day",
      hud: { clock: "12:10 PM" },
      note: "TRUE WOOD CHOPPING SCENE: Milo swings an Iron Axe into a real oak tree trunk in the forest clearing with flying wood splinters before stopping dead at 12:10!",
      stage: (t) => {
        const stopAt = wordAt("2.wood", "stopped");
        const chopping = t < stopAt;
        return (
          <>
            {/* Choppable Oak Tree right beside Milo (trunk notch appears as he chops!) */}
            <Vox kind="log" position={on(PLACE.forest, 2.75, SURFACE_Y + 0.5, 1.5)} size={[0.88, 1.0, 0.88]} />
            <Vox kind="log" position={on(PLACE.forest, 2.75, SURFACE_Y + 1.3, 1.5)} size={[0.62, 0.65, 0.62]} />
            <Vox kind="log" position={on(PLACE.forest, 2.75, SURFACE_Y + 2.6, 1.5)} size={[0.88, 2.0, 0.88]} />
            <Block position={on(PLACE.forest, 2.75, SURFACE_Y + 4.0, 1.5)} size={[3.2, 1.8, 3.2]} color="#3a7d2c" />
            <Block position={on(PLACE.forest, 2.75, SURFACE_Y + 5.1, 1.5)} size={[1.8, 0.9, 1.8]} color="#468f36" />
            {/* Milo holding Iron Axe swinging cleanly at the oak trunk */}
            <ServerPlayer
              role="hero"
              nameTag="Milo"
              position={on(PLACE.forest, 1.45, SURFACE_Y, 1.5)}
              rotationY={Math.PI / 2}
              animation={chopping ? "reach" : "shrug"}
              face={chopping ? "smile" : "wow"}
              time={t}
            >
              <IronAxe />
            </ServerPlayer>
            {chopping ? <Puffs position={on(PLACE.forest, 2.25, SURFACE_Y + 1.3, 1.5)} color="#b8844c" count={6} size={0.14} /> : null}
            <Clock3AM text="12:10" position={on(PLACE.forest, 0.6, SURFACE_Y + 2.3, 1.5)} scale={0.95 * pop(t, wordAt("2.wood", "noon"))} />
          </>
        );
      },
    },
    {
      cue: "2.dig",
      ...cam.sweep({ on: on(PLACE.forest, 0, SURFACE_Y + 0.7, 0), dist: 6.8, distTo: 5.4, fromYaw: 24, toYaw: -20, pitch: 24, fov: 46 }),
      zone: "forest",
      look: "overworld-day",
      hud: { banner: { text: "3 CLICKS → UNDERGROUND", color: "#ffd84d" } },
      note: "Fast forest sweep: Milo drops straight down into the carved forest earth shaft and seals the flush grass block overhead.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 0.95));
        return (
          <>
            <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={k} />
            <ServerPlayer role="hero" position={on(PLACE.forest, 0, SURFACE_Y - k * 1.85, 0)} rotationY={0} animation="cower" face="uneasy" time={t} />
            <Puffs position={on(PLACE.forest, 0, SURFACE_Y + 0.25, 0)} color="#8c6742" count={8} size={0.18} />
          </>
        );
      },
    },
    {
      cue: "2.raid",
      ...cam.sweep({ on: on(PLACE.dungeon, 0, SURFACE_Y + 1.4, -1.6), dist: 8.8, distTo: 7.2, fromYaw: -22, toYaw: 18, pitch: 12, fov: 48 }),
      zone: "dungeon",
      look: "overworld-night",
      note: "TRUE DUNGEON RAID: teammates clash with the giant flaming DungeonBoss while Milo dives into the sunken floor mid-raid!",
      stage: (t) => {
        const k = ease(ramp(t, 0.15, 1.05));
        const ally = moveBetween(on(PLACE.dungeon, -2.5, SURFACE_Y, 0.6), on(PLACE.dungeon, -1.8, SURFACE_Y, -2.0), t, 0, 1.3);
        return (
          <>
            <DungeonBoss position={on(PLACE.dungeon, 0.2, SURFACE_Y, -4.6)} rotationY={0} />
            <ShaftCap position={on(PLACE.dungeon, 0, 0, 0)} lid={k} stone />
            <ServerPlayer role="hero" position={on(PLACE.dungeon, 0, SURFACE_Y - k * 1.85, 0)} rotationY={0} animation="cower" face="uneasy" time={t} />
            <ServerPlayer role="friendA" position={ally.position} rotationY={ally.rotationY} animation={ally.moving ? "run" : "reach"} animDistance={ally.animDistance} face="angry" time={t}>
              <DiamondSwordProp />
            </ServerPlayer>
            <ServerPlayer role="friendC" badge="?" position={on(PLACE.dungeon, 2.2, SURFACE_Y, -0.6)} rotationY={-0.6} animation="shrug" face="wow" time={t}>
              <DiamondSwordProp />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "2.still",
      ...cam.sweep({ on: on(PLACE.burrow, 0, 1.85, 0), dist: 7.2, distTo: 5.8, fromYaw: -16, toYaw: 16, pitch: 6, fov: 46 }),
      zone: "burrow",
      look: "overworld-night",
      hud: { clock: "03:00 UNDERGROUND" },
      note: "JAW-DROPPING UNDERGROUND CUTAWAY: Milo stands completely frozen inside his torch-lit 3-block dirt hole BELOW the grass while a green Zombie wanders harmlessly right over his head!",
      stage: (t) => {
        const patrol = Math.sin(t * 1.4) * 2.2;
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.burrow, 0, 0.05, 0)} rotationY={0} animation="idle" face="uneasy" time={t} />
            <NightZombie position={on(PLACE.burrow, patrol, 3.22, -0.3)} rotationY={Math.cos(t * 1.4) >= 0 ? Math.PI / 2 : -Math.PI / 2} walk={t * 1.2} />
          </>
        );
      },
    },
    {
      cue: "2.back",
      ...cam.sweep({ on: on(PLACE.forest, 0, SURFACE_Y + 1.1, 0), dist: 6.8, distTo: 5.5, fromYaw: 20, toYaw: -16, pitch: 14, fov: 46 }),
      zone: "forest",
      look: "overworld-day",
      hud: {
        typing: true,
        chat: [{ sender: "Milo", text: "sorry everyone, im back!", color: "#a8f5c2" }],
      },
      note: "Milo digs cleanly back UP out of the sunken forest earth hole waving apologetically as '<Milo> sorry!' types into chat.",
      stage: (t) => {
        const rise = ease(ramp(t, 0.1, 0.95));
        return (
          <>
            <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={1 - rise} />
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.forest, 0, 0.2 + rise * 1.8, 0)} rotationY={0} animation="wave" face="worried" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.mock",
      ...cam.frameDuo({ a: on(PLACE.smp, -1.6, 0, 7.0), b: on(PLACE.smp, 1.6, 0, 7.0), fromYaw: -18, toYaw: 18, pitch: 8, fov: 46 }),
      zone: "smp",
      look: "overworld-day",
      hud: {
        chat: [{ sender: "Bully", text: "lol DIRT BOY is back!!", color: "#ff7a7a" }],
      },
      note: "Wide two-shot on Main Street: Bully squad crowds down Main Street pointing and laughing while 'DIRT BOY!' pops above.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.smp, -1.6, 0, 7.0)} rotationY={0.4} animation="cower" face="sad" time={t} />
          <ServerPlayer role="bully" nameTag="Bully" position={on(PLACE.smp, 0.85, 0, 7.0)} rotationY={-0.5} animation="point" face="grin" time={t} />
          <ServerPlayer role="griefer" position={on(PLACE.smp, 2.2, 0, 6.2)} rotationY={-0.6} animation="laugh" face="grin" time={t} />
          <Bubble text="DIRT BOY!" dark position={on(PLACE.smp, 1.0, 2.55, 7.0)} rotationY={-0.25} scale={0.44 * pop(t, wordAt("2.mock", "Dirt"))} />
        </>
      ),
    },
    {
      cue: "2.laugh",
      ...cam.streetOverview({ from: on(PLACE.smp, 0, 0, 12.2), to: on(PLACE.smp, 0, 0, 10.6), on: on(PLACE.smp, 0, 1.1, 2.8), onTo: on(PLACE.smp, -0.3, 1.1, 5.2), height: 4.8, fov: 48 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Warm golden-dusk crane down Main Street as Milo walks away quietly while bullies keep laughing behind him.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.smp, -1.2, 0, 2.0), on(PLACE.smp, -1.2, 0, 6.2), t, 0, 1.6);
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "cower"} animDistance={w.animDistance} face="sad" time={t} />
            <ServerPlayer role="bully" position={on(PLACE.smp, 1.5, 0, 3.0)} rotationY={-0.3} animation="laugh" face="grin" time={t} />
            <ServerPlayer role="griefer" position={on(PLACE.smp, 2.3, 0, 1.4)} rotationY={-0.4} animation="point" face="grin" time={t} />
          </>
        );
      },
    },
  ],
});

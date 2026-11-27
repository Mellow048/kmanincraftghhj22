import type React from "react";
import {
  Bubble,
  LavaBucket,
  PLACE,
  Puffs,
  SURFACE_Y,
  ServerPlayer,
  ShaftCap,
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
 * Scene 2 (Beat 3): Cruel Breaking Point — Moonlit Forest Stalking & Lava Poured STRAIGHT DOWN Into Milo's Sunken Hole!
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Lava Over The Dirt Pit",
  shots: [
    {
      cue: "3.lava",
      ...cam.track({ from: on(PLACE.forest, 0, SURFACE_Y, 6.5), to: on(PLACE.forest, 0, SURFACE_Y, 1.5), sideDist: 7.2, side: 1, lead: 1.4, height: 1.9 }),
      zone: "forest",
      look: "overworld-night",
      note: "Moonlit forest tracking shot: Milo walks quietly toward his forest clearing while the bully creeps behind him with a glowing lava bucket.",
      stage: (t) => {
        const milo = moveBetween(on(PLACE.forest, -0.5, SURFACE_Y, 6.2), on(PLACE.forest, -0.5, SURFACE_Y, 1.2), t, 0, 1.7);
        const bully = moveBetween(on(PLACE.forest, 0.9, SURFACE_Y, 8.6), on(PLACE.forest, 0.9, SURFACE_Y, 3.6), t, 0, 1.7);
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={milo.position} rotationY={milo.rotationY} animation={milo.moving ? "walk" : "cower"} animDistance={milo.animDistance} face="uneasy" time={t} />
            <ServerPlayer role="bully" nameTag="Bully" position={bully.position} rotationY={bully.rotationY} animation={bully.moving ? "walk" : "point"} animDistance={bully.animDistance} face="grin" time={t}>
              <LavaBucket />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "3.hole",
      ...cam.sweep({ on: on(PLACE.forest, 0.4, SURFACE_Y + 0.9, 0), dist: 7.2, distTo: 5.8, fromYaw: -22, toYaw: 18, pitch: 20, fov: 46 }),
      zone: "forest",
      look: "overworld-night",
      note: "Right on the 10-minute mark, Milo drops straight down into his sunken dirt shaft in the moonlit forest while the bully watches.",
      stage: (t) => {
        const drop = ease(ramp(t, 0.1, 0.95));
        return (
          <>
            <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={drop} />
            <ServerPlayer role="hero" position={on(PLACE.forest, 0, SURFACE_Y - drop * 1.85, 0)} rotationY={0} animation="cower" face="worried" time={t} />
            <ServerPlayer role="bully" position={on(PLACE.forest, 2.0, SURFACE_Y, 0.8)} rotationY={-0.8} animation="talk" face="grin" time={t}>
              <LavaBucket />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "3.pour",
      ...cam.sweep({ on: on(PLACE.forest, 0.4, SURFACE_Y + 1.0, 0), dist: 6.8, distTo: 5.4, fromYaw: 24, toYaw: -18, pitch: 20, fov: 46 }),
      zone: "forest",
      look: "overworld-night",
      note: "Cruel griefing climax: the bully leans over the sunken forest hole tipping his glowing LavaBucket straight onto the dirt lid!",
      stage: (t) => {
        const lk = ease(ramp(t, wordAt("3.pour", "poured") - 0.1, wordAt("3.pour", "top") + 0.25));
        return (
          <>
            <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={1} lava={lk} />
            <ServerPlayer role="bully" position={on(PLACE.forest, 1.5, SURFACE_Y, 0.2)} rotationY={-1.35} animation="reach" face="grin" time={t}>
              <LavaBucket />
            </ServerPlayer>
            <Bubble text="HAHAHA!" dark position={on(PLACE.forest, 1.5, SURFACE_Y + 2.35, 0.2)} rotationY={-0.3} scale={0.44 * pop(t, wordAt("3.pour", "grinned"))} />
          </>
        );
      },
    },
    {
      cue: "3.burn",
      ...cam.sweep({ on: on(PLACE.forest, 0, SURFACE_Y + 1.1, 1.4), dist: 7.0, distTo: 5.6, fromYaw: -22, toYaw: 18, pitch: 12, fov: 46 }),
      zone: "forest",
      look: "overworld-night",
      hud: { banner: { text: "DIAMOND GEAR LOST!", color: "#ff5548" } },
      note: "Heartbreaking grief aftermath: Milo stumbles back up out of the glowing lava-filled shaft losing all his diamond gear.",
      stage: (t) => (
        <>
          <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={1} lava={1} />
          <ServerPlayer role="hero" nameTag="Milo" badge="broken" tears={1} position={on(PLACE.forest, 0, SURFACE_Y, 2.1)} rotationY={0} animation="cower" face="sad" time={t} />
          <Puffs position={on(PLACE.forest, 0, SURFACE_Y + 0.8, 1.2)} color="#ff7a29" count={8} size={0.22} />
        </>
      ),
    },
    {
      cue: "3.chat2",
      ...cam.front({ actor: on(PLACE.forest, 0, SURFACE_Y, 2.2), facing: 0, dist: 5.8, to: 4.6, side: 20, pitch: 6, fov: 44 }),
      zone: "forest",
      look: "overworld-night",
      hud: {
        typing: true,
        chat: [{ sender: "Milo", text: "sorry guys", color: "#c9d4e8" }],
      },
      note: "Quiet heartbreak close-up: tears fall down Milo's face in the moonlit woods as '<Milo> sorry guys' types softly into server chat.",
      stage: (t) => (
        <ServerPlayer role="hero" nameTag="Milo" tears={1} position={on(PLACE.forest, 0, SURFACE_Y, 2.2)} rotationY={0} animation="cower" face="sad" time={t} />
      ),
    },
    {
      cue: "3.quit",
      ...cam.sweep({ on: on(PLACE.forest, 0, SURFACE_Y + 1.2, 2.0), dist: 6.8, distTo: 5.4, fromYaw: -20, toYaw: 22, pitch: 10, fov: 46 }),
      zone: "forest",
      look: "overworld-night",
      hud: {
        chat: [{ text: "Milo left the game", color: "#ffeb5c" }],
      },
      note: "Empty moonlit forest clearing beside the cooling lava pit as 'Milo left the game' fades into the silent server chat.",
      stage: (t) => (
        <>
          <ShaftCap position={on(PLACE.forest, 0, 0, 0)} lid={1} lava={0.65} />
          <Puffs position={on(PLACE.forest, 0, SURFACE_Y + 0.9, 2.0)} color="#99b0cc" count={6} size={0.18} />
        </>
      ),
    },
  ],
});

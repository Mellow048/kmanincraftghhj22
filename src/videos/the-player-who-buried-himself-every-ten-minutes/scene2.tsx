import type React from "react";
import {
  Bubble,
  DirtPit,
  FloatingNumber,
  ObsidianLavaPit,
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

/** Scene 2 (Beat 3): Cruel Breaking Point — Nighttime Lava Griefing & Milo Logs Off. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Lava Over The Dirt Pit",
  shots: [
    {
      cue: "3.lava",
      ...cam.track({ from: on(PLACE.smp, 0, 0, -5.0), to: on(PLACE.smp, 0, 0, -11.5), sideDist: 6.0, side: 1, lead: 1.4, height: 1.7 }),
      zone: "smp",
      look: "overworld-night",
      note: "Moonlit night tracking shot: Milo walks quietly toward the pine edge while the bully sneaks right behind him.",
      stage: (t) => {
        const milo = moveBetween(on(PLACE.smp, -0.5, 0, -5.5), on(PLACE.smp, -0.5, 0, -11.5), t, 0, 1.7);
        const bully = moveBetween(on(PLACE.smp, 0.8, 0, -3.2), on(PLACE.smp, 0.8, 0, -9.0), t, 0, 1.7);
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={milo.position} rotationY={milo.rotationY} animation={milo.moving ? "walk" : "cower"} animDistance={milo.animDistance} face="uneasy" time={t} />
            <ServerPlayer role="bully" nameTag="Bully" position={bully.position} rotationY={bully.rotationY} animation={bully.moving ? "walk" : "point"} animDistance={bully.animDistance} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.hole",
      ...cam.front({ actor: on(PLACE.smp, -0.4, 0, -11.5), facing: 0, dist: 5.8, to: 4.5, side: -24, pitch: 8, fov: 44 }),
      zone: "smp",
      look: "overworld-night",
      note: "Right on the 10-minute mark, Milo drops straight down into his safe dirt pit in the dark clearing.",
      stage: (t) => {
        const drop = ease(ramp(t, 0.1, 0.95));
        return (
          <>
            <DirtPit position={on(PLACE.smp, -0.4, 0, -11.5)} lid={drop} />
            <ServerPlayer role="hero" position={on(PLACE.smp, -0.4, -drop * 1.0, -11.5)} rotationY={0} animation="cower" face="worried" time={t} />
            <ServerPlayer role="bully" position={on(PLACE.smp, 1.8, 0, -10.6)} rotationY={-0.7} animation="talk" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.pour",
      ...cam.sweep({ on: on(PLACE.smp, -0.2, 1.0, -11.5), dist: 5.8, distTo: 4.5, fromYaw: 28, toYaw: -22, pitch: 10, fov: 44 }),
      zone: "smp",
      look: "overworld-night",
      note: "Cruel griefing climax: the bully grins leaning over the pit and pours glowing molten lava straight onto the top.",
      stage: (t) => {
        const lk = ease(ramp(t, wordAt("3.pour", "poured") - 0.1, wordAt("3.pour", "top") + 0.25));
        return (
          <>
            <DirtPit position={on(PLACE.smp, -0.4, 0, -11.5)} lid={1} lava={lk} />
            <ServerPlayer role="bully" position={on(PLACE.smp, 1.3, 0, -11.2)} rotationY={-1.1} animation="reach" face="grin" time={t} />
            <Bubble text="HAHAHA!" dark position={on(PLACE.smp, 1.3, 2.35, -11.2)} rotationY={-0.3} scale={0.46 * pop(t, wordAt("3.pour", "grinned"))} />
          </>
        );
      },
    },
    {
      cue: "3.burn",
      ...cam.heroLow({ on: on(PLACE.smp, -0.4, 1.2, -11.5), dist: 6.2, yaw: -18, fov: 46 }),
      zone: "smp",
      look: "overworld-night",
      note: "Heartbreaking grief aftermath: Milo pops up surrounded by embers losing all his hard-earned diamond gear.",
      stage: (t) => (
        <>
          <ObsidianLavaPit position={on(PLACE.smp, -0.4, 0, -12.6)} size={2.2} />
          <ServerPlayer role="hero" nameTag="Milo" badge="broken" tears={1} position={on(PLACE.smp, -0.4, 0, -9.8)} rotationY={0} animation="cower" face="sad" time={t} />
          <Puffs position={on(PLACE.smp, -0.4, 1.0, -10.5)} color="#ff7a29" count={7} size={0.2} />
          <FloatingNumber text="GEAR LOST" color="#ff4f42" position={on(PLACE.smp, -0.4, 2.85, -9.8)} height={0.56 * pop(t, wordAt("3.burn", "lost"))} />
        </>
      ),
    },
    {
      cue: "3.chat2",
      ...cam.front({ actor: on(PLACE.smp, 0, 0, -9.8), facing: 0, dist: 5.4, to: 4.2, side: 20, pitch: 5, fov: 42 }),
      zone: "smp",
      look: "overworld-night",
      note: "Quiet heartbreak close-up: tears fall down Milo's face as '<Milo> sorry guys' types softly into server chat.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Milo" tears={1} position={on(PLACE.smp, 0, 0, -9.8)} rotationY={0} animation="cower" face="sad" time={t} />
          <ServerChatBox
            position={on(PLACE.smp, 0, 2.75, -9.8)}
            typing={ease(ramp(t, 0.1, 1.2))}
            lines={[{ sender: "Milo", text: "sorry guys", color: "#c9d4e8" }]}
          />
        </>
      ),
    },
    {
      cue: "3.quit",
      ...cam.sweep({ on: on(PLACE.smp, 0, 1.3, -9.8), dist: 6.0, distTo: 4.8, fromYaw: -22, toYaw: 24, pitch: 8, fov: 44 }),
      zone: "smp",
      look: "overworld-night",
      note: "Empty moonlit clearing where Milo stood as yellow 'Milo left the game' fades into the silent server chat.",
      stage: (t) => (
        <>
          <Puffs position={on(PLACE.smp, 0, 0.9, -9.8)} color="#99b0cc" count={6} size={0.18} />
          <ServerChatBox
            position={on(PLACE.smp, 0, 2.2, -9.8)}
            typing={ease(ramp(t, 0.1, 1.3))}
            lines={[{ text: "Milo left the game", color: "#ffeb5c" }]}
          />
        </>
      ),
    },
  ],
});

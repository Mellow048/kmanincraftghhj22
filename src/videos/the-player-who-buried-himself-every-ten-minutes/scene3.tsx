import type React from "react";
import {
  BabyCrib,
  Clock3AM,
  NightZombie,
  OpenBookPage,
  OpeningChest,
  PLACE,
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

/**
 * Scene 3 (Beats 4–5):
 * - FIXED IRL Bedroom framing (Milo, Desk, Mom, & Baby Crib 100% cleanly framed — ZERO cut-off arms/heads!)
 * - TRUE Underground Cutaway (`burrow`) showing night Zombies stomping harmlessly on the grass OVER Milo's head (`4.safe`)!
 * - FIXED Centered `OpenBookPage` in `5.read` & `5.note` so EVERY word is 100% legible!
 * - ZERO overlapping `20 ONLINE!` + `20 PLAYERS ONLINE!` HUD text (`5.rally`)!
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Behind The Screen & The Owner's Discovery",
  shots: [
    {
      cue: "4.desk",
      ...cam.sweep({ on: on(PLACE.irl, 0, 1.2, -0.8), dist: 7.4, distTo: 6.2, fromYaw: -14, toYaw: 16, pitch: 10, fov: 46 }),
      zone: "irl",
      look: "overworld-night",
      hud: { clock: "11:10 PM" },
      note: "Wide cozy late-night bedroom reveal: Milo seated cleanly beside his glowing PC desk on the left and baby sister's crib on the right — zero cropped limbs!",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" position={on(PLACE.irl, -1.5, 0, -0.25)} rotationY={0.25} animation="idle" face="worried" time={t} />
          <BabyCrib position={on(PLACE.irl, 1.65, 0, -1.1)} crying={false} />
        </>
      ),
    },
    {
      cue: "4.mom",
      ...cam.sweep({ on: on(PLACE.irl, 0.2, 1.2, -0.4), dist: 7.6, distTo: 6.4, fromYaw: -18, toYaw: 16, pitch: 9, fov: 46 }),
      zone: "irl",
      look: "overworld-night",
      note: "Spacious bedroom sweep: Mom in her night-shift coat waves warmly goodbye while Milo waves back beside the crib — everyone 100% inside 9:16!",
      stage: (t) => {
        const leave = moveBetween(on(PLACE.irl, 0.1, 0, 0.7), on(PLACE.irl, 1.5, 0, 1.2), t, 0.1, 1.5);
        return (
          <>
            <ServerPlayer role="mom" nameTag="Mom" position={leave.position} rotationY={leave.rotationY} animation={leave.moving ? "walk" : "wave"} animDistance={leave.animDistance} face="smile" time={t} />
            <ServerPlayer role="hero" position={on(PLACE.irl, -1.5, 0, -0.1)} rotationY={0.55} animation="wave" face="smile" time={t} />
            <BabyCrib position={on(PLACE.irl, 1.75, 0, -1.2)} crying={false} />
          </>
        );
      },
    },
    {
      cue: "4.crib",
      ...cam.sweep({ on: on(PLACE.irl, 1.4, 0.9, -1.0), dist: 6.0, distTo: 4.8, fromYaw: -18, toYaw: 14, pitch: 12, fov: 44 }),
      zone: "irl",
      look: "overworld-night",
      note: "Gentle push onto the wooden baby crib resting right beside Milo's desk under soft moonlit blue glow.",
      stage: (t) => (
        <>
          <BabyCrib position={on(PLACE.irl, 1.65, 0, -1.1)} crying={false} />
          <ServerPlayer role="hero" position={on(PLACE.irl, -1.2, 0, -0.1)} rotationY={0.65} animation="idle" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.cry",
      ...cam.sweep({ on: on(PLACE.irl, 0.4, 1.0, -0.7), dist: 6.8, distTo: 5.5, fromYaw: 18, toYaw: -16, pitch: 11, fov: 46 }),
      zone: "irl",
      look: "overworld-night",
      hud: { clock: "11:20 PM" },
      note: "Ten-minute mark strikes: baby sister wakes up crying in the crib while Milo jumps in alarm beside his desk.",
      stage: (t) => (
        <>
          <BabyCrib position={on(PLACE.irl, 1.65, 0, -1.1)} crying />
          <Clock3AM text="11:20" alarm={1} position={on(PLACE.irl, 0.2, 2.25, -1.6)} scale={0.9 * pop(t, wordAt("4.cry", "ten"))} />
          <ServerPlayer role="hero" badge="!" position={on(PLACE.irl, -1.2, 0, -0.1)} rotationY={0.85} animation="panic" face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "4.run",
      ...cam.sweep({ on: on(PLACE.irl, 0.4, 1.05, -0.4), dist: 7.2, distTo: 6.0, fromYaw: -18, toYaw: 18, pitch: 10, fov: 46 }),
      zone: "irl",
      look: "overworld-night",
      note: "Tender wide bedroom sweep as Milo hurries across the hardwood floor to comfort his crying baby sister in her crib.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.irl, -1.3, 0, 0.1), on(PLACE.irl, 0.65, 0, -0.2), t, 0, 1.25);
        return (
          <>
            <ServerPlayer role="hero" position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "reach"} animDistance={w.animDistance} face="smile" time={t} />
            <BabyCrib position={on(PLACE.irl, 1.75, 0, -0.9)} crying={w.moving} />
          </>
        );
      },
    },
    {
      cue: "4.safe",
      ...cam.sweep({ on: on(PLACE.burrow, 0, 1.9, 0), dist: 7.6, distTo: 6.2, fromYaw: 16, toYaw: -16, pitch: 8, fov: 46 }),
      zone: "burrow",
      look: "overworld-night",
      hud: { banner: { text: "SAFE FROM NIGHT MOBS", color: "#8ad8ff" } },
      note: "EMOTIONAL REALIZATION CUTAWAY: Milo stands safely deep inside his underground dirt pocket while TWO green Zombies prowl harmlessly across the grass directly above his roof!",
      stage: (t) => {
        const p1 = -1.6 + ease(ramp(t, 0, 2.2)) * 3.2;
        const p2 = 1.9 - ease(ramp(t, 0, 2.2)) * 3.0;
        return (
          <>
            <ServerPlayer role="hero" nameTag="Milo" position={on(PLACE.burrow, 0, 0.05, 0)} rotationY={0} animation="idle" face="smile" time={t} />
            <NightZombie position={on(PLACE.burrow, p1, 3.22, -0.4)} rotationY={Math.PI / 2} walk={t * 1.4} />
            <NightZombie position={on(PLACE.burrow, p2, 3.22, 0.4)} rotationY={-Math.PI / 2} walk={t * 1.3} />
          </>
        );
      },
    },
    {
      cue: "4.sad",
      ...cam.sweep({ on: on(PLACE.irl, 0.85, 1.05, -0.4), dist: 5.8, distTo: 4.6, fromYaw: -18, toYaw: 14, pitch: 8, fov: 44 }),
      zone: "irl",
      look: "overworld-night",
      note: "Gentle close push on Milo smiling softly with glistening tears beside his peaceful sleeping baby sister.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" tears={0.55} position={on(PLACE.irl, 0.45, 0, 0.0)} rotationY={0.35} animation="idle" face="sad" time={t} />
          <BabyCrib position={on(PLACE.irl, 1.75, 0, -0.85)} crying={false} />
        </>
      ),
    },
    {
      cue: "5.check",
      ...cam.sweep({ on: on(PLACE.cabin, 0, 1.15, 0), dist: 6.4, distTo: 5.2, fromYaw: -20, toYaw: 16, pitch: 10, fov: 46 }),
      zone: "cabin",
      look: "overworld-night",
      note: "Server Owner wearing golden crown walks quietly inside Milo's warm wooden cabin inspecting the oak chest.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.cabin, -1.7, 0, 1.4), on(PLACE.cabin, -0.5, 0, 0.4), t, 0, 1.35);
        return (
          <>
            <ServerPlayer role="owner" nameTag="Owner" crown position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "talk"} animDistance={w.animDistance} face="uneasy" time={t} />
            <OpeningChest position={on(PLACE.cabin, 0.9, 0, -0.85)} open={0} contents="book" />
          </>
        );
      },
    },
    {
      cue: "5.chest",
      ...cam.sweep({ on: on(PLACE.cabin, 0.1, 0.9, -0.4), dist: 5.8, distTo: 4.6, fromYaw: -18, toYaw: 14, pitch: 12, fov: 44 }),
      zone: "cabin",
      look: "overworld-night",
      note: "The oak chest creaks wide open revealing a single glowing leather signed book inside.",
      stage: (t) => {
        const open = ease(ramp(t, 0.1, wordAt("5.chest", "book") + 0.25));
        return (
          <>
            <ServerPlayer role="owner" nameTag="Owner" crown position={on(PLACE.cabin, -1.0, 0, 0.3)} rotationY={0.6} animation="reach" face="wow" time={t} />
            <OpeningChest position={on(PLACE.cabin, 0.75, 0, -0.8)} open={open} contents="book" />
          </>
        );
      },
    },
    {
      cue: "5.read",
      ...cam.sweep({ on: on(PLACE.cabin, 0, 1.55, -0.2), dist: 5.8, distTo: 4.9, fromYaw: 10, toYaw: -10, pitch: 4, fov: 44 }),
      zone: "cabin",
      look: "overworld-night",
      note: "FIXED BOOK PAGE FRAMING: Centered OpenBookPage so EVERY word ('From: Milo / Sorry I hide...') is 100% readable inside 9:16!",
      stage: (t) => (
        <>
          <ServerPlayer role="owner" nameTag="Owner" crown badge="!" position={on(PLACE.cabin, -1.65, 0, 0.4)} rotationY={0.7} animation="cower" face="wow" time={t} />
          <OpenBookPage
            position={on(PLACE.cabin, 0.1, 1.55, -0.2)}
            scale={0.9}
            progress={ease(ramp(t, 0.05, 1.3))}
            header="From: Milo"
            lines={["Sorry I hide", "every 10 min.", "My baby sister", "needs me."]}
          />
        </>
      ),
    },
    {
      cue: "5.note",
      ...cam.front({ actor: on(PLACE.cabin, 0, 1.55, -0.2), facing: 0, dist: 5.2, to: 4.4, side: 8, pitch: 3, fov: 44 }),
      zone: "cabin",
      look: "overworld-night",
      hud: { banner: { text: "FOR HIS BABY SISTER", color: "#ffe082" } },
      note: "Crystal-clear emotional read on Milo's complete handwritten book note — 100% centered and unclipped.",
      stage: (t) => (
        <>
          <ServerPlayer role="owner" crown tears={0.75} position={on(PLACE.cabin, -1.75, 0, 0.4)} rotationY={0.7} animation="talk" face="sad" time={t} />
          <OpenBookPage
            position={on(PLACE.cabin, 0.05, 1.55, -0.2)}
            scale={0.92}
            progress={1}
            header="From: Milo"
            lines={["Sorry I hide.", "My baby sister", "needs me", "at night."]}
          />
        </>
      ),
    },
    {
      cue: "5.ping",
      ...cam.heroLow({ on: on(PLACE.smp, 0, 1.5, 2.0), dist: 6.8, yaw: -18, fov: 46 }),
      zone: "smp",
      look: "overworld-night",
      hud: {
        clock: "MIDNIGHT",
        typing: true,
        chat: [{ sender: "OWNER", text: "EVERYONE LOG ON NOW! HELP MILO!", color: "#ffd84d" }],
      },
      note: "Heroic turning point: Owner raises hand sending a glowing golden '!' server-wide alert broadcast.",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown badge="!" position={on(PLACE.smp, 0, 0, 2.0)} rotationY={0} animation="cheer" face="brave" time={t} />
      ),
    },
    {
      cue: "5.rally",
      ...cam.streetOverview({ from: on(PLACE.smp, 0, 0, 12.2), to: on(PLACE.smp, 0, 0, 9.8), on: on(PLACE.smp, 0, 1.1, 2.2), onTo: on(PLACE.smp, 0, 1.1, 3.6), height: 4.8, fov: 48 }),
      zone: "smp",
      look: "overworld-night",
      hud: { banner: { text: "20 PLAYERS LOGGED ON!", color: "#4ce87a" } },
      note: "Wide server rally crane (single crisp HUD banner — zero colliding 3D text! All players fully inside 9:16!).",
      stage: (t) => {
        const w1 = moveBetween(on(PLACE.smp, -1.6, 0, -2.5), on(PLACE.smp, -1.6, 0, 3.5), t, 0, 1.5);
        const w2 = moveBetween(on(PLACE.smp, 1.6, 0, -2.0), on(PLACE.smp, 1.6, 0, 3.8), t, 0, 1.5);
        const w3 = moveBetween(on(PLACE.smp, -0.7, 0, -4.5), on(PLACE.smp, -0.7, 0, 1.8), t, 0, 1.5);
        return (
          <>
            <ServerPlayer role="owner" crown position={on(PLACE.smp, 0.85, 0, 4.8)} rotationY={-0.2} animation="cheer" face="grin" time={t} />
            <ServerPlayer role="friendA" torch position={w1.position} rotationY={w1.rotationY} animation={w1.moving ? "run" : "cheer"} animDistance={w1.animDistance} face="grin" time={t} />
            <ServerPlayer role="friendB" torch position={w2.position} rotationY={w2.rotationY} animation={w2.moving ? "run" : "cheer"} animDistance={w2.animDistance} face="grin" time={t} />
            <ServerPlayer role="friendC" torch position={w3.position} rotationY={w3.rotationY} animation={w3.moving ? "run" : "wave"} animDistance={w3.animDistance} face="smile" time={t} />
          </>
        );
      },
    },
  ],
});

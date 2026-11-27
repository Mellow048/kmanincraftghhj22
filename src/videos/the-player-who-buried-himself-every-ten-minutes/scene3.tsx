import type React from "react";
import {
  BabyCrib,
  Clock3AM,
  DirtPit,
  FloatingNumber,
  OpenBookPage,
  OpeningChest,
  PLACE,
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

/** Scene 3 (Beats 4–5): Late-Night IRL Bedroom Truth + Server Owner Finds Signed Book & Pings Rally. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Behind The Screen & The Owner's Discovery",
  shots: [
    {
      cue: "4.desk",
      ...cam.front({ actor: on(PLACE.irl, -0.8, 0.3, -0.4), facing: 0, dist: 5.0, to: 3.9, side: 18, pitch: 8, fov: 44 }),
      zone: "irl",
      look: "overworld-night",
      hud: { clock: "11:10 PM" },
      note: "Real-world cutaway shooting the front of Milo's glowing bedroom PC monitor and tired face in warm desk lamp light.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" position={on(PLACE.irl, -1.0, 0, 0.25)} rotationY={0.2} animation="talk" face="worried" time={t} />
          <BabyCrib position={on(PLACE.irl, 1.55, 0, -0.9)} crying={false} />
        </>
      ),
    },
    {
      cue: "4.mom",
      ...cam.sweep({ on: on(PLACE.irl, 0.2, 1.1, -0.5), dist: 5.4, distTo: 4.3, fromYaw: -22, toYaw: 20, pitch: 6, fov: 44 }),
      zone: "irl",
      look: "overworld-night",
      note: "Warm bedroom sweep as Milo's mom waves goodbye in her work coat before heading out to her night shift.",
      stage: (t) => {
        const leave = moveBetween(on(PLACE.irl, 0.4, 0, 0.8), on(PLACE.irl, 2.2, 0, 1.6), t, 0.1, 1.5);
        return (
          <>
            <ServerPlayer role="mom" nameTag="Mom" position={leave.position} rotationY={leave.rotationY} animation={leave.moving ? "walk" : "wave"} animDistance={leave.animDistance} face="smile" time={t} />
            <ServerPlayer role="hero" position={on(PLACE.irl, -1.0, 0, 0.25)} rotationY={0.45} animation="wave" face="smile" time={t} />
            <BabyCrib position={on(PLACE.irl, 1.55, 0, -0.9)} crying={false} />
          </>
        );
      },
    },
    {
      cue: "4.crib",
      ...cam.front({ actor: on(PLACE.irl, 1.55, 0.3, -0.9), facing: 0, dist: 4.6, to: 3.5, side: -20, pitch: 10, fov: 42 }),
      zone: "irl",
      look: "overworld-night",
      note: "Gentle push onto the wooden baby crib resting right beside Milo's desk under soft moonlit blue glow.",
      stage: (t) => (
        <>
          <BabyCrib position={on(PLACE.irl, 1.55, 0, -0.9)} crying={false} />
          <ServerPlayer role="hero" position={on(PLACE.irl, -0.8, 0, 0.3)} rotationY={0.5} animation="talk" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.cry",
      ...cam.sweep({ on: on(PLACE.irl, 1.55, 0.8, -0.9), dist: 4.8, distTo: 3.7, fromYaw: 24, toYaw: -18, pitch: 10, fov: 42 }),
      zone: "irl",
      look: "overworld-night",
      hud: { clock: "11:20 PM" },
      note: "Ten-minute clock strikes and the baby sister wakes up crying in the crib with a bright alert badge.",
      stage: (t) => (
        <>
          <BabyCrib position={on(PLACE.irl, 1.55, 0, -0.9)} crying />
          <Clock3AM text="11:20" alarm={1} position={on(PLACE.irl, 0.3, 1.9, -1.2)} scale={0.95 * pop(t, wordAt("4.cry", "ten"))} />
          <ServerPlayer role="hero" badge="!" position={on(PLACE.irl, -0.8, 0, 0.3)} rotationY={0.85} animation="panic" face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "4.run",
      ...cam.track({ from: on(PLACE.irl, -0.9, 0, 0.6), to: on(PLACE.irl, 1.2, 0, 0.4), sideDist: 4.4, side: 1, lead: 0.6, height: 1.5 }),
      zone: "irl",
      look: "overworld-night",
      note: "Tender side tracking shot as Milo jumps away from his desk and hurries across the bedroom floor to rock his baby sister.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.irl, -0.9, 0, 0.6), on(PLACE.irl, 1.0, 0, 0.35), t, 0, 1.25);
        return (
          <>
            <ServerPlayer role="hero" position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "reach"} animDistance={w.animDistance} face="smile" time={t} />
            <BabyCrib position={on(PLACE.irl, 1.75, 0, -0.65)} crying={w.moving} />
          </>
        );
      },
    },
    {
      cue: "4.safe",
      ...cam.sweep({ on: on(PLACE.smp, 0, 1.0, 2.0), dist: 5.8, distTo: 4.6, fromYaw: -26, toYaw: 22, pitch: 10, fov: 44 }),
      zone: "smp",
      look: "overworld-night",
      note: "Emotional realization cross-cut back to the dark SMP clearing: Milo's little dirt pit was simply to stay safe from night mobs.",
      stage: (t) => (
        <>
          <DirtPit position={on(PLACE.smp, 0, 0, 2.0)} lid={1} />
          <FloatingNumber text="SAFE FROM MOBS" color="#8ad8ff" position={on(PLACE.smp, 0, 2.55, 2.0)} height={0.5 * pop(t, wordAt("4.safe", "mobs"))} />
        </>
      ),
    },
    {
      cue: "4.sad",
      ...cam.front({ actor: on(PLACE.irl, 1.0, 0.1, 0.3), facing: 0, dist: 4.6, to: 3.5, side: -18, pitch: 5, fov: 42 }),
      zone: "irl",
      look: "overworld-night",
      note: "Gentle close push on Milo smiling softly beside the peaceful sleeping baby crib.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" tears={0.55} position={on(PLACE.irl, 0.75, 0, 0.35)} rotationY={0.2} animation="talk" face="sad" time={t} />
          <BabyCrib position={on(PLACE.irl, 1.75, 0, -0.65)} crying={false} />
        </>
      ),
    },
    {
      cue: "5.check",
      ...cam.track({ from: on(PLACE.cabin, -1.6, 0, 1.8), to: on(PLACE.cabin, -0.2, 0, 0.4), sideDist: 4.5, side: 1, lead: 0.6, height: 1.5 }),
      zone: "cabin",
      look: "overworld-night",
      note: "Server Owner wearing golden crown walks quietly inside Milo's warm wooden cabin inspecting the room.",
      stage: (t) => {
        const w = moveBetween(on(PLACE.cabin, -1.6, 0, 1.6), on(PLACE.cabin, -0.35, 0, 0.4), t, 0, 1.35);
        return (
          <>
            <ServerPlayer role="owner" nameTag="Owner" crown position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "talk"} animDistance={w.animDistance} face="uneasy" time={t} />
            <OpeningChest position={on(PLACE.cabin, 0.85, 0, -0.9)} open={0} contents="book" />
          </>
        );
      },
    },
    {
      cue: "5.chest",
      ...cam.front({ actor: on(PLACE.cabin, 0.4, 0.4, -0.8), facing: 0, dist: 4.6, to: 3.5, side: -18, pitch: 12, fov: 42 }),
      zone: "cabin",
      look: "overworld-night",
      note: "The oak chest creaks wide open revealing a single glowing leather signed book inside.",
      stage: (t) => {
        const open = ease(ramp(t, 0.1, wordAt("5.chest", "book") + 0.25));
        return (
          <>
            <ServerPlayer role="owner" nameTag="Owner" crown position={on(PLACE.cabin, -0.85, 0, 0.3)} rotationY={0.55} animation="reach" face="wow" time={t} />
            <OpeningChest position={on(PLACE.cabin, 0.65, 0, -0.85)} open={open} contents="book" />
          </>
        );
      },
    },
    {
      cue: "5.read",
      ...cam.sweep({ on: on(PLACE.cabin, 0, 1.45, -0.2), dist: 4.8, distTo: 3.8, fromYaw: 18, toYaw: -16, pitch: 4, fov: 42 }),
      zone: "cabin",
      look: "overworld-night",
      note: "Dead-silence freeze beat: Owner stares wide-eyed at the glowing opened Minecraft book page.",
      stage: (t) => (
        <>
          <ServerPlayer role="owner" nameTag="Owner" crown badge="!" position={on(PLACE.cabin, -1.45, 0, 0.5)} rotationY={0.65} animation="cower" face="wow" time={t} />
          <OpenBookPage
            position={on(PLACE.cabin, 0.4, 1.55, -0.3)}
            progress={ease(ramp(t, 0.05, 1.4))}
            header="From: Milo"
            lines={["Sorry I hide", "every 10 min.", "My baby sister", "needs me."]}
          />
        </>
      ),
    },
    {
      cue: "5.note",
      ...cam.front({ actor: on(PLACE.cabin, 0.35, 1.5, -0.3), facing: 0, dist: 4.0, to: 3.1, side: 14, pitch: 3, fov: 40 }),
      zone: "cabin",
      look: "overworld-night",
      hud: { banner: { text: "FOR HIS BABY SISTER", color: "#ffe082" } },
      note: "Close emotional read on Milo's handwritten Minecraft book note as Owner tears up.",
      stage: (t) => (
        <>
          <ServerPlayer role="owner" crown tears={0.75} position={on(PLACE.cabin, -1.5, 0, 0.6)} rotationY={0.7} animation="talk" face="sad" time={t} />
          <OpenBookPage
            position={on(PLACE.cabin, 0.35, 1.55, -0.3)}
            progress={1}
            header="Page 1 of 1"
            lines={["Sorry I hide.", "My baby sister", "needs me", "at night."]}
          />
        </>
      ),
    },
    {
      cue: "5.ping",
      ...cam.heroLow({ on: on(PLACE.smp, 0, 1.5, 2.0), dist: 6.0, yaw: -20, fov: 45 }),
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
      ...cam.streetOverview({ from: on(PLACE.smp, 0, 0, 11.2), to: on(PLACE.smp, 0, 0, 9.4), on: on(PLACE.smp, 0, 1.1, 1.5), onTo: on(PLACE.smp, 0, 1.1, 3.5), height: 4.8, fov: 46 }),
      zone: "smp",
      look: "overworld-night",
      hud: { banner: { text: "20 PLAYERS ONLINE!", color: "#4ce87a" } },
      note: "Wholesome server rally crane: players stream onto Main Street holding lanterns and oak planks under '+20 ONLINE!'.",
      stage: (t) => {
        const w1 = moveBetween(on(PLACE.smp, -1.7, 0, -2.5), on(PLACE.smp, -1.7, 0, 3.5), t, 0, 1.5);
        const w2 = moveBetween(on(PLACE.smp, 1.7, 0, -2.0), on(PLACE.smp, 1.7, 0, 3.8), t, 0, 1.5);
        const w3 = moveBetween(on(PLACE.smp, -0.9, 0, -4.5), on(PLACE.smp, -0.9, 0, 1.8), t, 0, 1.5);
        return (
          <>
            <ServerPlayer role="owner" crown position={on(PLACE.smp, 0.9, 0, 4.8)} rotationY={-0.2} animation="cheer" face="grin" time={t} />
            <ServerPlayer role="friendA" torch position={w1.position} rotationY={w1.rotationY} animation={w1.moving ? "run" : "cheer"} animDistance={w1.animDistance} face="grin" time={t} />
            <ServerPlayer role="friendB" torch position={w2.position} rotationY={w2.rotationY} animation={w2.moving ? "run" : "cheer"} animDistance={w2.animDistance} face="grin" time={t} />
            <ServerPlayer role="friendC" torch position={w3.position} rotationY={w3.rotationY} animation={w3.moving ? "run" : "wave"} animDistance={w3.animDistance} face="smile" time={t} />
            <FloatingNumber text="20 ONLINE!" color="#4ce87a" position={on(PLACE.smp, 0, 3.0, 2.5)} height={0.62 * pop(t, wordAt("5.rally", "twenty"))} />
          </>
        );
      },
    },
  ],
});

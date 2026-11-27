import type React from "react";
import {
  BadgePop,
  Maya,
  ServerChatBox,
  ServerPlayer,
  SpawnBench,
  cam,
  clamp01,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

/**
 * Scene 1 (10 shots): Hook & mystery at the spawn bench on the 56m VillageStreet.
 * Multi-axis framing (high crane, side tracking, low hero, cross-street sweeps)
 * + continuous A->B locomotion via moveBetween().
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Scene 1",
  shots: [
    {
      cue: "1.bench",
      note: "High crane glides down the 56m SMP spawn avenue toward Maya seated on her oak bench.",
      ...cam.streetOverview({ from: [0, 0, 12.2], to: [0, 0, 5.6], height: 5.4, fov: 46 }),
      stage: (t) => {
        const f = moveBetween([-3.4, 0, -3.5], [-2.2, 0, 0.2], t, 0, 1.8);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} />
            <Maya position={[0, 0.2, 1.38]} animation="sit" face="smile" time={t} />
            <ServerPlayer role="friendA" position={f.position} rotationY={f.rotationY} animation={f.moving ? "walk" : "idle"} animDistance={f.animDistance} time={t} />
            <ServerPlayer role="friendB" position={[3.6, 0, 4.8]} rotationY={-0.6} animation="idle" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.four",
      note: "Side tracking camera glides beside Maya as she walks down the spawn road to her oak bench.",
      ...cam.track({ from: [-4.4, 0, 6.2], to: [0, 0, 1.6], sideDist: 4.8, side: 1, height: 1.7, fov: 44 }),
      stage: (t) => {
        const w = moveBetween([-4.4, 0, 6.2], [0, 0, 1.55], t, 0, 1.8);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} />
            <Maya
              position={w.moving ? w.position : [0, 0.2, 1.38]}
              rotationY={w.moving ? w.rotationY : 0}
              animation={w.moving ? "walk" : "sit"}
              animDistance={w.animDistance}
              face="smile"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "1.hi",
      note: "Cross-street parallax sweep around Maya peacefully sitting while other players roam behind.",
      ...cam.sweep({ on: [0, 1.35, 1.2], dist: 5.6, fromYaw: -38, toYaw: 18, pitch: 8, fov: 42 }),
      stage: (t) => {
        const passer = moveBetween([4.5, 0, -4.0], [-4.2, 0, -4.0], t, 0, 2.4);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} />
            <Maya position={[0, 0.2, 1.38]} animation="sit" face="calm" time={t} />
            <ServerPlayer role="friendA" position={passer.position} rotationY={passer.rotationY} animation="walk" animDistance={passer.animDistance} time={t} />
          </>
        );
      },
    },
    {
      cue: "1.chat",
      note: "Warm 3/4 sweep highlighting Maya waving as her floating Minecraft chat types hi.",
      ...cam.sweep({ on: [0, 1.65, 1.2], dist: 4.9, fromYaw: 28, toYaw: -16, pitch: 6, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} />
          <Maya position={[0, 0.2, 1.38]} animation="wave" face="happy" time={t} />
          <ServerChatBox
            position={[0, 2.38, 1.1]}
            lines={[{ sender: "Maya", text: "hi", color: "#9bf2b0" }]}
            typing={clamp01(t / 1.3)}
          />
        </>
      ),
    },
    {
      cue: "1.back",
      note: "Tracking camera follows a returning player jogging up the street while Maya types welcome back.",
      ...cam.track({ from: [3.2, 0, 9.2], to: [1.8, 0, 2.6], sideDist: 5.0, side: -1, height: 1.75, fov: 44 }),
      stage: (t) => {
        const runner = moveBetween([3.2, 0, 9.2], [1.8, 0, 2.6], t, 0, 2.1);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} />
            <Maya position={[0, 0.2, 1.38]} animation="wave" face="happy" time={t} />
            <ServerPlayer
              role="friendB"
              nameTag="Sam"
              position={runner.position}
              rotationY={runner.rotationY}
              animation={runner.moving ? "run" : "wave"}
              animDistance={runner.animDistance}
              face="happy"
              time={t}
            />
            <ServerChatBox
              position={[0.35, 2.45, 1.1]}
              lines={[
                { text: "Sam joined the game", color: "#ffe97d" },
                { sender: "Maya", text: "welcome back", color: "#9bf2b0" },
              ]}
              typing={clamp01(t / 1.5)}
            />
          </>
        );
      },
    },
    {
      cue: "2.hut",
      note: "Reverse-angle sweep from behind the bench looking across the empty stone spawn square.",
      ...cam.sweep({ on: [0, 1.2, 1.2], dist: 6.4, fromYaw: 135, toYaw: 175, pitch: 14, fov: 44 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} />
          <Maya position={[0, 0.2, 1.38]} animation="sit" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "2.walk",
      note: "Low-angle street shot as two diamond-armored players sprint past Maya in opposite directions.",
      ...cam.heroLow({ on: [0, 0, 2.4], dist: 5.8, yaw: -22, fov: 44 }),
      stage: (t) => {
        const a = moveBetween([-6.2, 0, 3.6], [6.2, 0, 3.6], t, 0, 2.2);
        const b = moveBetween([6.2, 0, 5.0], [-6.2, 0, 5.0], t, 0, 2.2);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} />
            <Maya position={[0, 0.2, 1.38]} animation="sit" face="smile" time={t} />
            <ServerPlayer role="friendA" shirtColor="#4be3e8" nameTag="Kai" position={a.position} rotationY={a.rotationY} animation="run" animDistance={a.animDistance} face="grin" time={t} />
            <ServerPlayer role="friendC" shirtColor="#39c9d4" nameTag="Leo" position={b.position} rotationY={b.rotationY} animation="run" animDistance={b.animDistance} face="happy" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.wave",
      note: "Gentle arc across the oak bench as Maya stays seated and waves warmly to passersby.",
      ...cam.sweep({ on: [0, 1.35, 1.2], dist: 5.0, fromYaw: -26, toYaw: 26, pitch: 7, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} />
          <Maya position={[0, 0.2, 1.38]} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "2.bot",
      note: "Tracking shot following two mocking players walking past and joking Maya is an AFK bot.",
      ...cam.track({ from: [-4.6, 0, 4.8], to: [2.6, 0, 4.4], sideDist: 4.8, side: 1, height: 1.7, fov: 44 }),
      stage: (t) => {
        const m1 = moveBetween([-4.6, 0, 4.8], [2.6, 0, 4.4], t, 0, 2.2);
        const m2 = moveBetween([-5.8, 0, 5.4], [1.4, 0, 5.0], t, 0, 2.2);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} />
            <Maya position={[0, 0.2, 1.38]} animation="sit" face="uneasy" time={t} />
            <ServerPlayer role="bully" nameTag="Zed" position={m1.position} rotationY={m1.rotationY} animation={m1.moving ? "walk" : "laugh"} animDistance={m1.animDistance} face="smug" badge="?" badgePopStart={0.35} time={t} />
            <ServerPlayer role="friendC" position={m2.position} rotationY={m2.rotationY} animation={m2.moving ? "walk" : "point"} animDistance={m2.animDistance} face="laugh" time={t} />
            <ServerChatBox position={[0.4, 2.55, 3.8]} lines={[{ sender: "Zed", text: "lol afk bot", color: "#ffcf7d" }]} />
          </>
        );
      },
    },
    {
      cue: "2.why",
      note: "High crane pulls back over the spawn square as a question mark pops above Maya's head.",
      ...cam.streetOverview({ from: [2.2, 0, 6.0], to: [-2.4, 0, 10.6], height: 4.6, fov: 46 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} />
          <Maya position={[0, 0.2, 1.38]} animation="sit" face="uneasy" time={t} />
          <BadgePop kind="?" position={[0, 2.38, 1.38]} popStart={0.25} t={t} />
        </>
      ),
    },
  ],
});

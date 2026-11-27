import type React from "react";
import {
  Crater,
  FloatingHeart,
  Jake,
  Maya,
  Owner,
  RedFlower,
  ServerChatBox,
  ServerCrowd,
  ServerPlayer,
  SpawnBench,
  SubPlaque,
  cam,
  clamp01,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

/**
 * Scene 3 (14 shots): Silent server guilt, the 40-player midnight rebuild,
 * pressure-plate auto-greeter, and the tearjerker golden-hour payoff ("I'm home").
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Scene 3",
  shots: [
    {
      cue: "5.quiet",
      look: "overworld-night",
      note: "Still night crane gliding down the hushed spawn avenue toward the empty blast crater.",
      ...cam.streetOverview({ from: [-2.6, 0, 11.2], to: [1.0, 0, 6.2], height: 5.0, fov: 46 }),
      stage: () => (
        <>
          <Crater position={[0, 0, 1.2]} debris={1} />
          <ServerChatBox position={[0, 2.35, 1.2]} lines={[{ text: "...", color: "#a5b5c9" }]} />
        </>
      ),
    },
    {
      cue: "5.jake2",
      look: "overworld-night",
      note: "Side tracking camera follows remorseful Jake walking slowly up to the crater he blew up.",
      ...cam.track({ from: [3.8, 0, 4.6], to: [1.5, 0, 2.1], sideDist: 4.4, side: -1, height: 1.65, fov: 42 }),
      stage: (t) => {
        const w = moveBetween([3.8, 0, 4.6], [1.5, 0, 2.1], t, 0, 1.9);
        return (
          <>
            <Crater position={[0, 0, 1.2]} debris={1} />
            <Jake position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="crying" tears={0.95} time={t} />
          </>
        );
      },
    },
    {
      cue: "5.owner",
      look: "overworld-night",
      note: "Hero low-angle shot on the crowned server owner calling everyone to grab oak planks.",
      ...cam.heroLow({ on: [-1.6, 0, 2.0], dist: 4.8, yaw: -20, fov: 42 }),
      stage: (t) => (
        <>
          <Crater position={[0, 0, 1.2]} debris={1} />
          <Jake position={[1.5, 0, 2.1]} rotationY={-0.8} animation="idle" face="crying" tears={0.8} time={t} />
          <Owner position={[-1.8, 0, 2.0]} rotationY={0.65} animation="point" face="brave" badge="!" badgePopStart={0.3} time={t} />
          <ServerChatBox position={[-1.2, 2.65, 1.8]} lines={[{ sender: "Owner", text: "grab your oak planks", color: "#ffe47a" }]} />
        </>
      ),
    },
    {
      cue: "6.forty",
      look: "lantern-night",
      note: "Sweeping crane over the lantern-lit street as players jog in from both ends of the village.",
      ...cam.streetOverview({ from: [3.4, 0, 12.6], to: [-2.0, 0, 7.6], height: 5.4, fov: 48 }),
      stage: (t) => {
        const a = moveBetween([-5.2, 0, 11.2], [-2.8, 0, 3.8], t, 0, 2.2);
        const b = moveBetween([5.4, 0, 10.4], [2.9, 0, 3.6], t, 0, 2.2);
        const c = moveBetween([-3.8, 0, -8.4], [-2.4, 0, -1.8], t, 0, 2.2);
        const d = moveBetween([4.2, 0, -7.8], [2.6, 0, -1.6], t, 0, 2.2);
        return (
          <>
            <Crater position={[0, 0, 1.2]} debris={1} />
            <Owner position={[0, 0, 2.8]} rotationY={0} animation="cheer" face="brave" time={t} />
            <ServerPlayer role="friendA" position={a.position} rotationY={a.rotationY} animation="run" animDistance={a.animDistance} torch time={t} />
            <ServerPlayer role="friendB" position={b.position} rotationY={b.rotationY} animation="run" animDistance={b.animDistance} torch time={t} />
            <ServerPlayer role="friendC" position={c.position} rotationY={c.rotationY} animation="run" animDistance={c.animDistance} torch time={t} />
            <ServerPlayer role="mom" position={d.position} rotationY={d.rotationY} animation="run" animDistance={d.animDistance} torch time={t} />
            <ServerCrowd
              members={[
                { role: "friendA", position: [-4.4, 0, 6.4], rotationY: 0.5, animation: "cheer", torch: true },
                { role: "friendB", position: [4.6, 0, 6.2], rotationY: -0.5, animation: "cheer", torch: true },
                { role: "friendC", position: [-3.8, 0, 1.2], rotationY: 1.2, animation: "wave", torch: true },
                { role: "bully", position: [3.9, 0, 1.4], rotationY: -1.2, animation: "wave", torch: true },
              ]}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "6.build",
      look: "lantern-night",
      note: "Dynamic arc around the rebuilt oak bench as players place glowing warm lanterns.",
      ...cam.sweep({ on: [0, 1.2, 1.2], dist: 5.8, fromYaw: -38, toYaw: 34, pitch: 10, fov: 44 }),
      stage: (t) => {
        const b1 = moveBetween([-3.4, 0, 2.4], [-1.8, 0, 1.6], t, 0, 1.9);
        const b2 = moveBetween([3.6, 0, 2.2], [1.8, 0, 1.4], t, 0, 1.9);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} upgraded />
            <ServerPlayer role="friendA" position={b1.position} rotationY={b1.rotationY} animation={b1.moving ? "walk" : "press"} animDistance={b1.animDistance} torch time={t} />
            <ServerPlayer role="friendB" position={b2.position} rotationY={b2.rotationY} animation={b2.moving ? "walk" : "press"} animDistance={b2.animDistance} torch time={t} />
            <Owner position={[0, 0, -0.4]} rotationY={0} animation="cheer" face="happy" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.plate",
      look: "lantern-night",
      note: "Low close-up angle showcasing the golden pressure plate wired to a redstone lamp.",
      ...cam.heroLow({ on: [0.8, 0, 1.8], dist: 4.4, yaw: 24, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} upgraded platePressed={0.2} />
          <Owner position={[0.55, 0, 1.92]} rotationY={0} animation="press" face="happy" time={t} />
        </>
      ),
    },
    {
      cue: "6.auto",
      look: "lantern-night",
      note: "Sweep across the lit redstone lamp as one tap auto-types welcome back in chat.",
      ...cam.sweep({ on: [0.4, 1.5, 1.4], dist: 5.0, fromYaw: -28, toYaw: 28, pitch: 8, fov: 42 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} upgraded platePressed={1} />
          <Owner position={[0.55, 0, 1.92]} rotationY={0} animation="cheer" face="happy" time={t} />
          <ServerChatBox position={[0.4, 2.55, 1.6]} lines={[{ sender: "Maya", text: "welcome back!", color: "#9bf2b0" }]} typing={clamp01(t / 1.2)} />
        </>
      ),
    },
    {
      cue: "6.town",
      look: "lantern-night",
      note: "High lantern-lit crane down the cozy village built around Maya's glowing bench.",
      ...cam.streetOverview({ from: [-2.8, 0, 11.4], to: [2.2, 0, 6.2], height: 5.6, fov: 48 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} upgraded />
          <ServerCrowd
            members={[
              { role: "owner", position: [-2.2, 0, 3.6], rotationY: 0.4, animation: "cheer", torch: true },
              { role: "friendA", position: [2.6, 0, 3.8], rotationY: -0.4, animation: "wave", torch: true },
              { role: "friendB", position: [-4.2, 0, -2.5], rotationY: 0.7, animation: "wave", torch: true },
              { role: "friendC", position: [4.2, 0, -2.2], rotationY: -0.7, animation: "cheer", torch: true },
              { role: "mom", position: [-3.6, 0, 7.2], rotationY: 0.3, animation: "wave", torch: true },
              { role: "bully", position: [3.6, 0, 7.4], rotationY: -0.3, animation: "cheer", torch: true },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "7.back2",
      look: "overworld-golden",
      note: "Golden-hour tracking camera glides beside Maya walking back toward her rebuilt bench.",
      ...cam.track({ from: [0, 0, 7.6], to: [0, 0, 2.0], sideDist: 4.8, side: 1, height: 1.65, fov: 42 }),
      stage: (t) => {
        const m = moveBetween([0, 0, 7.6], [0, 0, 2.0], t, 0, 2.1);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} upgraded />
            <Maya position={m.position} rotationY={m.rotationY} animation={m.moving ? "walk" : "idle"} animDistance={m.animDistance} face="surprised" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.line",
      look: "overworld-golden",
      note: "Wide sweeping pan across forty players lined up along the street waving and cheering.",
      ...cam.sweep({ on: [0, 1.3, 1.4], dist: 7.4, fromYaw: -46, toYaw: 46, pitch: 12, fov: 46 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} upgraded />
          <Maya position={[-0.35, 0.2, 1.38]} animation="sit" face="happy" time={t} />
          <ServerCrowd
            members={[
              { role: "owner", position: [-3.4, 0, 3.6], rotationY: 0.8, animation: "cheer", face: "happy" },
              { role: "friendA", position: [-3.8, 0, 1.4], rotationY: 1.3, animation: "wave", face: "grin" },
              { role: "friendB", position: [3.8, 0, 3.6], rotationY: -0.8, animation: "cheer", face: "happy" },
              { role: "friendC", position: [4.0, 0, 1.2], rotationY: -1.3, animation: "wave", face: "grin" },
              { role: "mom", position: [-3.2, 0, -1.2], rotationY: 0.6, animation: "cheer", face: "happy" },
              { role: "bully", position: [3.2, 0, -1.2], rotationY: -0.6, animation: "wave", face: "happy" },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "7.flowers",
      look: "overworld-golden",
      note: "Tracking shot follows Jake walking up to Maya and placing bright red flowers at her feet.",
      ...cam.track({ from: [4.2, 0, 2.4], to: [1.15, 0, 1.55], sideDist: 4.4, side: -1, height: 1.5, fov: 42 }),
      stage: (t) => {
        const j = moveBetween([4.2, 0, 2.4], [1.15, 0, 1.55], t, 0, 1.6);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} upgraded />
            <Maya position={[-0.35, 0.2, 1.38]} animation="sit" face="happy" time={t} />
            <Jake position={j.position} rotationY={j.rotationY} animation={j.moving ? "walk" : "press"} animDistance={j.animDistance} face="smile" time={t} />
            {t > 1.1 ? (
              <>
                <RedFlower position={[0.1, 0, 2.25]} />
                <RedFlower position={[0.55, 0, 2.35]} scale={0.92} />
                <RedFlower position={[-0.32, 0, 2.32]} scale={0.88} />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "7.glad",
      look: "overworld-golden",
      note: "Warm close sweep as Jake sits beside Maya on the oak bench and types glad you're back.",
      ...cam.sweep({ on: [0.15, 1.45, 1.35], dist: 4.8, fromYaw: -26, toYaw: 24, pitch: 7, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} upgraded />
          <Maya position={[-0.35, 0.2, 1.38]} animation="sit" face="happy" time={t} />
          <Jake position={[0.55, 0.2, 1.38]} rotationY={-0.15} animation="sit" face="smile" time={t} />
          <RedFlower position={[0.1, 0, 2.25]} />
          <RedFlower position={[0.55, 0, 2.35]} scale={0.92} />
          <ServerChatBox position={[0.5, 2.55, 1.3]} lines={[{ sender: "Jake", text: "glad you're back", color: "#ffd8c2" }]} />
        </>
      ),
    },
    {
      cue: "7.home",
      look: "overworld-golden",
      note: "Emotional golden arc pulling back as floating hearts rise and Maya types I'm home.",
      ...cam.sweep({ on: [0.1, 1.55, 1.35], dist: 4.6, distTo: 6.2, fromYaw: 24, toYaw: -22, pitch: 9, fov: 42 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} upgraded platePressed={1} />
          <Maya position={[-0.35, 0.2, 1.38]} animation="wave" face="happy" time={t} />
          <Jake position={[0.55, 0.2, 1.38]} rotationY={-0.15} animation="sit" face="smile" time={t} />
          <RedFlower position={[0.1, 0, 2.25]} />
          <RedFlower position={[0.55, 0, 2.35]} scale={0.92} />
          <ServerChatBox position={[0.1, 2.6, 1.3]} lines={[{ sender: "Maya", text: "I'm home", color: "#9bf2b0" }]} typing={clamp01(t / 1.4)} />
          <FloatingHeart position={[0.1, 1.9, 1.4]} count={8} spread={2.2} t={t} />
        </>
      ),
    },
    {
      cue: "7.cta",
      look: "overworld-golden",
      note: "Joyful crane rising over Maya, Jake, and the cheering crowd with a floating Subscribe plaque.",
      ...cam.streetOverview({ from: [-1.8, 0, 6.4], to: [1.8, 0, 9.6], height: 3.6, fov: 46 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} upgraded platePressed={1} />
          <Maya position={[-0.35, 0.2, 1.38]} animation="wave" face="happy" time={t} />
          <Jake position={[0.55, 0.2, 1.38]} rotationY={-0.15} animation="wave" face="happy" time={t} />
          <RedFlower position={[0.1, 0, 2.25]} />
          <RedFlower position={[0.55, 0, 2.35]} scale={0.92} />
          <ServerCrowd
            members={[
              { role: "owner", position: [-3.4, 0, 3.6], rotationY: 0.8, animation: "cheer", face: "happy" },
              { role: "friendA", position: [3.8, 0, 3.6], rotationY: -0.8, animation: "cheer", face: "grin" },
              { role: "friendB", position: [-3.8, 0, 1.4], rotationY: 1.2, animation: "wave", face: "happy" },
              { role: "friendC", position: [4.0, 0, 1.2], rotationY: -1.2, animation: "wave", face: "grin" },
            ]}
            time={t}
          />
          <FloatingHeart position={[0.1, 2.0, 1.4]} count={10} spread={2.8} t={t} />
          <SubPlaque position={[0, 2.85, 0.8]} />
        </>
      ),
    },
  ],
});

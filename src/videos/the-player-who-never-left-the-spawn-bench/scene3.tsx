import type React from "react";
import {
  BENCH_POS,
  BENCH_ROT,
  BENCH_SEAT,
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
 * Scene 3 (14 shots): Silent server guilt, the 40-player midnight rebuild at the roadside bench,
 * pressure-plate auto-greeter, and the tearjerker golden-hour payoff ("I'm home").
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Scene 3",
  shots: [
    {
      cue: "5.quiet",
      look: "overworld-night",
      note: "Still night crane gliding down the hushed spawn avenue toward the empty roadside crater.",
      ...cam.streetOverview({ from: [-3.4, 0, 11.2], to: [-1.4, 0, 6.2], height: 5.0, fov: 46 }),
      stage: () => (
        <>
          <Crater />
          <ServerChatBox position={[-2.4, 2.45, 1.2]} lines={[{ text: "...", color: "#a5b5c9" }]} />
        </>
      ),
    },
    {
      cue: "5.jake2",
      look: "overworld-night",
      note: "Side tracking camera follows remorseful Jake walking up to the roadside crater he blew up.",
      ...cam.track({ from: [1.8, 0, 4.8], to: [-0.6, 0, 2.1], sideDist: 4.4, side: -1, height: 1.65, fov: 42 }),
      stage: (t) => {
        const w = moveBetween([1.8, 0, 4.8], [-0.6, 0, 2.1], t, 0, 1.9);
        return (
          <>
            <Crater />
            <Jake position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="crying" tears={0.95} time={t} />
          </>
        );
      },
    },
    {
      cue: "5.owner",
      look: "overworld-night",
      note: "Hero low-angle shot on the crowned server owner calling everyone to grab oak planks.",
      ...cam.heroLow({ on: [0.4, 0, 2.0], dist: 4.8, yaw: -20, fov: 42 }),
      stage: (t) => (
        <>
          <Crater />
          <Jake position={[-0.6, 0, 2.1]} rotationY={0.8} animation="idle" face="crying" tears={0.8} time={t} />
          <Owner position={[0.8, 0, 2.0]} rotationY={-0.65} animation="point" face="brave" badge="!" badgePopStart={0.3} time={t} />
          <ServerChatBox position={[0.4, 2.98, 1.8]} lines={[{ sender: "Owner", text: "grab your oak planks", color: "#ffe47a" }]} />
        </>
      ),
    },
    {
      cue: "6.forty",
      look: "lantern-night",
      note: "Sweeping crane over the lantern-lit street as players jog down the open road toward Maya's roadside spot.",
      ...cam.streetOverview({ from: [2.4, 0, 12.6], to: [-2.0, 0, 7.6], height: 5.4, fov: 48 }),
      stage: (t) => {
        const a = moveBetween([-3.2, 0, 11.2], [-0.8, 0, 3.8], t, 0, 2.2);
        const b = moveBetween([3.4, 0, 10.4], [1.4, 0, 3.6], t, 0, 2.2);
        const c = moveBetween([-1.8, 0, -8.4], [-0.8, 0, -1.8], t, 0, 2.2);
        const d = moveBetween([2.2, 0, -7.8], [1.4, 0, -1.6], t, 0, 2.2);
        return (
          <>
            <Crater />
            <Owner position={[0.2, 0, 2.8]} rotationY={0} animation="cheer" face="brave" time={t} />
            <ServerPlayer role="friendA" position={a.position} rotationY={a.rotationY} animation="run" animDistance={a.animDistance} torch time={t} />
            <ServerPlayer role="friendB" position={b.position} rotationY={b.rotationY} animation="run" animDistance={b.animDistance} torch time={t} />
            <ServerPlayer role="friendC" position={c.position} rotationY={c.rotationY} animation="run" animDistance={c.animDistance} torch time={t} />
            <ServerPlayer role="mom" position={d.position} rotationY={d.rotationY} animation="run" animDistance={d.animDistance} torch time={t} />
            <ServerCrowd
              members={[
                { role: "friendA", position: [-3.4, 0, 6.4], rotationY: 0.5, animation: "cheer", torch: true },
                { role: "friendB", position: [3.2, 0, 6.2], rotationY: -0.5, animation: "cheer", torch: true },
                { role: "friendC", position: [2.8, 0, 1.2], rotationY: -1.2, animation: "wave", torch: true },
                { role: "bully", position: [3.4, 0, -1.4], rotationY: -0.9, animation: "wave", torch: true },
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
      note: "Dynamic arc around the rebuilt roadside oak bench as players place glowing warm lanterns.",
      ...cam.sweep({ on: [-2.2, 1.2, 1.2], dist: 5.8, fromYaw: -28, toYaw: 34, pitch: 10, fov: 44 }),
      stage: (t) => {
        const b1 = moveBetween([-3.8, 0, 2.8], [-3.2, 0, 1.8], t, 0, 1.9);
        const b2 = moveBetween([0.6, 0, 2.4], [-0.8, 0, 1.6], t, 0, 1.9);
        return (
          <>
            <SpawnBench upgraded />
            <ServerPlayer role="friendA" position={b1.position} rotationY={b1.rotationY} animation={b1.moving ? "walk" : "press"} animDistance={b1.animDistance} torch time={t} />
            <ServerPlayer role="friendB" position={b2.position} rotationY={b2.rotationY} animation={b2.moving ? "walk" : "press"} animDistance={b2.animDistance} torch time={t} />
            <Owner position={[-2.4, 0, -0.4]} rotationY={BENCH_ROT} animation="cheer" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.plate",
      look: "lantern-night",
      note: "Low close-up angle showcasing the golden pressure plate wired to a redstone lamp.",
      ...cam.heroLow({ on: [-1.4, 0, 1.8], dist: 4.4, yaw: 24, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench upgraded platePressed={0.2} />
          <Owner position={[-1.4, 0, 1.92]} rotationY={0} animation="press" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "6.auto",
      look: "lantern-night",
      note: "Sweep across the lit redstone lamp as one tap auto-types welcome back above Owner's nametag.",
      ...cam.sweep({ on: [-1.8, 1.5, 1.4], dist: 5.0, fromYaw: -24, toYaw: 28, pitch: 8, fov: 42 }),
      stage: (t) => (
        <>
          <SpawnBench upgraded platePressed={1} />
          <Owner position={[-1.4, 0, 1.92]} rotationY={0} animation="cheer" face="grin" time={t} />
          <ServerChatBox position={[-1.4, 2.98, 1.6]} lines={[{ sender: "Maya", text: "welcome back!", color: "#9bf2b0" }]} typing={clamp01(t / 1.2)} />
        </>
      ),
    },
    {
      cue: "6.town",
      look: "lantern-night",
      note: "High lantern-lit crane down the cozy village around Maya's glowing roadside bench.",
      ...cam.streetOverview({ from: [-2.8, 0, 11.4], to: [1.8, 0, 6.2], height: 5.6, fov: 48 }),
      stage: (t) => (
        <>
          <SpawnBench upgraded />
          <ServerCrowd
            members={[
              { role: "owner", position: [-1.2, 0, 3.6], rotationY: 0.4, animation: "cheer", torch: true },
              { role: "friendA", position: [2.2, 0, 3.8], rotationY: -0.4, animation: "wave", torch: true },
              { role: "friendB", position: [-3.4, 0, -2.5], rotationY: 0.7, animation: "wave", torch: true },
              { role: "friendC", position: [3.2, 0, -2.2], rotationY: -0.7, animation: "cheer", torch: true },
              { role: "mom", position: [-3.2, 0, 7.2], rotationY: 0.3, animation: "wave", torch: true },
              { role: "bully", position: [3.0, 0, 7.4], rotationY: -0.3, animation: "cheer", torch: true },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "7.back2",
      look: "overworld-golden",
      note: "Golden-hour tracking camera glides beside Maya walking along the street toward her rebuilt roadside bench.",
      ...cam.track({ from: [-0.8, 0, 7.6], to: [-1.8, 0, 2.2], sideDist: 4.8, side: 1, height: 1.65, fov: 42 }),
      stage: (t) => {
        const m = moveBetween([-0.8, 0, 7.6], [-1.8, 0, 2.2], t, 0, 2.1);
        return (
          <>
            <SpawnBench upgraded />
            <Maya position={m.position} rotationY={m.rotationY} animation={m.moving ? "walk" : "idle"} animDistance={m.animDistance} face="surprised" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.line",
      look: "overworld-golden",
      note: "Wide sweeping pan across players lined up along both sides of the open street waving and cheering.",
      ...cam.sweep({ on: [-0.6, 1.3, 1.4], dist: 7.4, fromYaw: -42, toYaw: 42, pitch: 12, fov: 46 }),
      stage: (t) => (
        <>
          <SpawnBench upgraded />
          <Maya position={[-2.65, 0.2, 1.25]} rotationY={BENCH_ROT} animation="sit" face="grin" time={t} />
          <ServerCrowd
            members={[
              { role: "owner", position: [1.8, 0, 3.6], rotationY: -0.8, animation: "cheer", face: "happy" },
              { role: "friendA", position: [2.2, 0, 1.4], rotationY: -1.3, animation: "wave", face: "grin" },
              { role: "friendB", position: [2.0, 0, -1.2], rotationY: -0.6, animation: "cheer", face: "happy" },
              { role: "friendC", position: [-3.4, 0, 3.8], rotationY: 0.7, animation: "wave", face: "grin" },
              { role: "mom", position: [-3.4, 0, -1.2], rotationY: 0.6, animation: "cheer", face: "happy" },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "7.flowers",
      look: "overworld-golden",
      note: "Tracking shot follows Jake walking across the road to place bright red flowers by Maya's roadside bench.",
      ...cam.track({ from: [2.0, 0, 2.8], to: [-0.9, 0, 1.8], sideDist: 4.4, side: -1, height: 1.5, fov: 42 }),
      stage: (t) => {
        const j = moveBetween([2.0, 0, 2.8], [-0.9, 0, 1.8], t, 0, 1.6);
        return (
          <>
            <SpawnBench upgraded />
            <Maya position={[-2.65, 0.2, 1.25]} rotationY={BENCH_ROT} animation="sit" face="grin" time={t} />
            <Jake position={j.position} rotationY={j.rotationY} animation={j.moving ? "walk" : "press"} animDistance={j.animDistance} face="smile" time={t} />
            {t > 1.1 ? (
              <>
                <RedFlower position={[-2.1, 0, 2.25]} />
                <RedFlower position={[-1.7, 0, 2.35]} scale={0.92} />
                <RedFlower position={[-2.5, 0, 2.32]} scale={0.88} />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "7.glad",
      look: "overworld-golden",
      note: "Warm close sweep as Jake sits beside Maya on the roadside bench and types glad you're back.",
      ...cam.sweep({ on: [-2.25, 1.45, 1.35], dist: 4.8, fromYaw: -22, toYaw: 28, pitch: 7, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench upgraded />
          <Maya position={[-2.65, 0.2, 1.25]} rotationY={BENCH_ROT} animation="sit" face="grin" time={t} />
          <Jake position={[-1.85, 0.2, 1.55]} rotationY={BENCH_ROT - 0.15} animation="sit" face="smile" time={t} />
          <RedFlower position={[-2.1, 0, 2.25]} />
          <RedFlower position={[-1.7, 0, 2.35]} scale={0.92} />
          <ServerChatBox position={[-2.1, 3.05, 1.35]} lines={[{ sender: "Jake", text: "glad you're back", color: "#ffd8c2" }]} />
        </>
      ),
    },
    {
      cue: "7.home",
      look: "overworld-golden",
      note: "Emotional golden arc pulling back as floating hearts rise and Maya types I'm home clearly above nametags.",
      ...cam.sweep({ on: [-2.25, 1.55, 1.35], dist: 4.8, distTo: 6.4, fromYaw: 24, toYaw: -18, pitch: 9, fov: 42 }),
      stage: (t) => (
        <>
          <SpawnBench upgraded platePressed={1} />
          <Maya position={[-2.65, 0.2, 1.25]} rotationY={BENCH_ROT} animation="wave" face="grin" time={t} />
          <Jake position={[-1.85, 0.2, 1.55]} rotationY={BENCH_ROT - 0.15} animation="sit" face="smile" time={t} />
          <RedFlower position={[-2.1, 0, 2.25]} />
          <RedFlower position={[-1.7, 0, 2.35]} scale={0.92} />
          <ServerChatBox position={[-2.2, 3.05, 1.35]} lines={[{ sender: "Maya", text: "I'm home", color: "#9bf2b0" }]} typing={clamp01(t / 1.4)} />
          <FloatingHeart position={[-2.2, 1.9, 1.4]} count={8} spread={2.2} t={t} />
        </>
      ),
    },
    {
      cue: "7.cta",
      look: "overworld-golden",
      note: "Joyful crane rising over Maya, Jake, and the cheering crowd with a floating Subscribe plaque.",
      ...cam.streetOverview({ from: [-2.6, 0, 6.4], to: [0.8, 0, 9.6], height: 3.6, fov: 46 }),
      stage: (t) => (
        <>
          <SpawnBench upgraded platePressed={1} />
          <Maya position={[-2.65, 0.2, 1.25]} rotationY={BENCH_ROT} animation="wave" face="grin" time={t} />
          <Jake position={[-1.85, 0.2, 1.55]} rotationY={BENCH_ROT - 0.15} animation="wave" face="grin" time={t} />
          <RedFlower position={[-2.1, 0, 2.25]} />
          <RedFlower position={[-1.7, 0, 2.35]} scale={0.92} />
          <ServerCrowd
            members={[
              { role: "owner", position: [1.8, 0, 3.6], rotationY: -0.8, animation: "cheer", face: "happy" },
              { role: "friendA", position: [2.2, 0, 1.4], rotationY: -1.2, animation: "cheer", face: "grin" },
              { role: "friendB", position: [-3.4, 0, 3.8], rotationY: 0.7, animation: "wave", face: "happy" },
              { role: "friendC", position: [2.0, 0, -1.2], rotationY: -0.6, animation: "wave", face: "grin" },
            ]}
            time={t}
          />
          <FloatingHeart position={[-2.2, 2.0, 1.4]} count={10} spread={2.8} t={t} />
          <SubPlaque position={[BENCH_POS[0], 3.0, 0.8]} />
        </>
      ),
    },
  ],
});

import type React from "react";
import {
  BENCH_POS,
  BENCH_ROT,
  BENCH_SEAT,
  BadgePop,
  Block,
  Crater,
  Glow,
  IRL_POS,
  Jake,
  Maya,
  PencilProp,
  SCHOOL_POS,
  ServerChatBox,
  ServerPlayer,
  Sister,
  SpawnBench,
  TntBlock,
  cam,
  clamp01,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

/**
 * Scene 2 (14 shots): Jake's TNT grief at the roadside bench, Maya's quiet "sorry",
 * and the emotional IRL bedroom (Maya alone at mouse/keyboard) + full classroom reveal.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Scene 2",
  shots: [
    {
      cue: "3.jake",
      note: "Tracking shot follows angry griefer Jake marching down the street toward Maya's roadside bench.",
      ...cam.track({ from: [2.8, 0, 7.0], to: [-0.8, 0, 1.9], sideDist: 4.8, side: -1, height: 1.6, fov: 44 }),
      stage: (t) => {
        const j = moveBetween([2.8, 0, 7.0], [-0.8, 0, 1.9], t, 0, 2.0);
        return (
          <>
            <SpawnBench />
            <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="sit" face="worried" time={t} />
            <Jake position={j.position} rotationY={j.rotationY} animation={j.moving ? "walk" : "point"} animDistance={j.animDistance} face="angry" badge="!" badgePopStart={0.35} time={t} />
          </>
        );
      },
    },
    {
      cue: "3.tnt",
      note: "Low dramatic angle as Jake plants flashing red TNT beneath the roadside bench and backs away.",
      ...cam.heroLow({ on: [-2.0, 0, 1.2], dist: 5.0, yaw: 24, fov: 44 }),
      stage: (t) => {
        const back = moveBetween([-1.2, 0, 1.8], [0.4, 0, 3.2], t, 0.6, 2.0);
        return (
          <>
            <SpawnBench />
            <TntBlock position={[-2.2, 0.45, 1.2]} fuse={clamp01(t / 1.8)} />
            <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="cower" face="scared" time={t} />
            <Jake position={back.position} rotationY={back.moving ? back.rotationY : -0.7} animation={back.moving ? "walk" : "press"} animDistance={back.animDistance} face="smug" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.boom",
      note: "Sweeping blast pull-back as the TNT explodes and oak splinters fly across the spawn square.",
      ...cam.sweep({ on: [-2.0, 1.2, 1.2], dist: 4.8, distTo: 7.4, fromYaw: 18, toYaw: -28, pitch: 12, fov: 46 }),
      stage: (t) => {
        const flash = clamp01(1 - t / 0.85);
        return (
          <>
            <Crater />
            {flash > 0.05 ? (
              <group position={[-2.4, 1.2, 1.2]}>
                <Glow size={5.2 * flash + 1.2} color="#ffaa3b" opacity={0.85 * flash} />
                <Block size={[2.2 * flash, 2.2 * flash, 2.2 * flash]} color="#fff2c4" emissive="#ff7b24" emissiveIntensity={2.0} />
              </group>
            ) : null}
            <Maya position={BENCH_POS} rotationY={BENCH_ROT} animation="cower" face="scared" time={t} />
            <Jake position={[0.2, 0, 2.8]} rotationY={-0.6} animation="laugh" face="laugh" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.type",
      note: "Cross-angle sweep onto Jake laughing and typing go actually play the game in server chat.",
      ...cam.sweep({ on: [0.0, 1.6, 2.4], dist: 4.8, fromYaw: 34, toYaw: -12, pitch: 6, fov: 40 }),
      stage: (t) => (
        <>
          <Crater />
          <Maya position={BENCH_POS} rotationY={BENCH_ROT} animation="idle" face="sad" time={t} />
          <Jake position={[0.2, 0, 2.8]} rotationY={-0.6} animation="laugh" face="laugh" time={t} />
          <ServerChatBox position={[0.1, 2.98, 2.6]} lines={[{ sender: "Jake", text: "go actually play the game", color: "#ff9e8a" }]} />
        </>
      ),
    },
    {
      cue: "3.stand",
      look: "overworld-rain",
      note: "Rainy crane sweeps down onto Maya standing alone and crying inside the roadside blast crater.",
      ...cam.streetOverview({ from: [-4.0, 0, 7.2], to: [-2.4, 0, 4.6], height: 4.2, fov: 44 }),
      stage: (t) => (
        <>
          <Crater />
          <Maya position={BENCH_POS} rotationY={BENCH_ROT} animation="idle" face="crying" tears={1} time={t} />
        </>
      ),
    },
    {
      cue: "3.sorry",
      look: "overworld-rain",
      note: "Intimate rainy arc around Maya as tears fall and she slowly types sorry in chat.",
      ...cam.sweep({ on: [-2.4, 1.5, 1.2], dist: 4.6, fromYaw: 24, toYaw: -22, pitch: 5, fov: 38 }),
      stage: (t) => (
        <>
          <Crater />
          <Maya position={BENCH_POS} rotationY={BENCH_ROT} animation="idle" face="crying" tears={1} time={t} />
          <ServerChatBox position={[-2.4, 2.95, 1.2]} lines={[{ sender: "Maya", text: "sorry", color: "#d8e6ff" }]} typing={clamp01(t / 1.4)} />
        </>
      ),
    },
    {
      cue: "3.left",
      look: "overworld-rain",
      note: "Crane pulls high and away from the empty crater as Maya left the game appears in chat.",
      ...cam.streetOverview({ from: [-2.4, 0, 4.6], to: [1.0, 0, 9.2], height: 3.4, fov: 46 }),
      stage: () => (
        <>
          <Crater />
          <ServerChatBox position={[-2.4, 2.55, 1.2]} lines={[{ text: "Maya left the game", color: "#ffe97d" }]} />
        </>
      ),
    },
    {
      cue: "4.days",
      look: "overworld-sunset",
      note: "Long golden-sunset sweep across the quiet spawn avenue showing the empty roadside crater as players pass by.",
      ...cam.sweep({ on: [-2.4, 0.9, 1.2], dist: 6.6, fromYaw: -42, toYaw: 42, pitch: 14, fov: 44 }),
      stage: (t) => {
        const p = moveBetween([0.8, 0, -5.5], [0.8, 0, 5.5], t, 0, 2.4);
        return (
          <>
            <Crater />
            <ServerPlayer role="friendA" position={p.position} rotationY={p.rotationY} animation="walk" animDistance={p.animDistance} time={t} />
          </>
        );
      },
    },
    {
      cue: "4.join",
      zone: "irl",
      look: "overworld-day",
      note: "Bedroom cutaway sweep onto Maya's older sister seated at the desk typing on the SMP computer.",
      ...cam.sweep({ on: [IRL_POS[0], 1.2, IRL_POS[2] - 1.4], dist: 3.9, fromYaw: 112, toYaw: 82, pitch: 12, fov: 42 }),
      stage: (t) => (
        <group position={IRL_POS}>
          <Sister position={[0, 0.16, -1.12]} rotationY={Math.PI} animation="press" face="sad" time={t} />
          <ServerChatBox
            position={[0.1, 2.15, -1.72]}
            rotationY={Math.PI / 2 - 0.32}
            scale={0.44}
            lines={[
              { text: "Maya joined the game", color: "#ffe97d" },
              { sender: "Maya", text: "hi this is her sister...", color: "#9bf2b0" },
            ]}
            typing={clamp01(t / 1.6)}
          />
        </group>
      ),
    },
    {
      cue: "4.hands",
      zone: "irl",
      look: "overworld-day",
      note: "Close front-side angle on Maya seated at the desk, her hand shaking visibly over the mouse.",
      ...cam.sweep({ on: [IRL_POS[0] + 0.18, 1.05, IRL_POS[2] - 1.45], dist: 3.3, fromYaw: 94, toYaw: 66, pitch: 12, fov: 42 }),
      stage: (t) => (
        <group position={IRL_POS}>
          <Maya
            position={[0.32, 0.16, -1.14]}
            rotationY={Math.PI + Math.sin(t * 28) * 0.055}
            animation="press"
            face="sad"
            nameTag=""
            time={t}
          />
          <BadgePop kind="!" position={[0.32, 2.0, -1.14]} popStart={0.2} t={t} />
        </group>
      ),
    },
    {
      cue: "4.keys",
      zone: "irl",
      look: "overworld-day",
      note: "Side-front desk sweep showing Maya seated alone, pressing two keyboard keys at once.",
      ...cam.sweep({ on: [IRL_POS[0] - 0.05, 1.05, IRL_POS[2] - 1.48], dist: 3.3, fromYaw: 118, toYaw: 82, pitch: 14, fov: 40 }),
      stage: (t) => (
        <group position={IRL_POS}>
          <Maya
            position={[-0.1, 0.16, -1.14]}
            rotationY={Math.PI + Math.sin(t * 5) * 0.05}
            animation="press"
            face="calm"
            nameTag=""
            time={t}
          />
        </group>
      ),
    },
    {
      cue: "4.desk",
      zone: "school",
      look: "overworld-day",
      note: "Front classroom sweep as Maya drops her yellow pencil and the teacher and classmates turn to stare.",
      ...cam.sweep({ on: [SCHOOL_POS[0], 1.15, SCHOOL_POS[2] - 0.85], dist: 5.0, fromYaw: 145, toYaw: 112, pitch: 12, fov: 44 }),
      stage: (t) => {
        const drop = clamp01((t - 0.35) / 0.7);
        return (
          <group position={SCHOOL_POS}>
            <Maya position={[0, 0.14, -0.68]} rotationY={Math.PI} animation="sit" face="crying" tears={0.9} nameTag="" time={t} />
            <PencilProp position={[0.42, 0.78 - drop * 0.74, -1.15 + drop * 0.25]} rotation={[0, 0.5 + drop * 0.9, 0]} />
            <ServerPlayer role="owner" nameTag="Teacher" position={[-1.4, 0, -3.1]} rotationY={0.42} animation="point" face="surprised" time={t} />
            <ServerPlayer role="bully" position={[-2.2, 0.14, -0.68]} rotationY={1.55} animation="sit" face="smug" badge="?" badgePopStart={0.45} time={t} />
            <ServerPlayer role="friendC" position={[2.2, 0.14, -0.68]} rotationY={-1.55} animation="sit" face="surprised" time={t} />
            <ServerPlayer role="friendA" position={[-2.2, 0.14, 1.82]} rotationY={2.45} animation="sit" face="laugh" time={t} />
            <ServerPlayer role="friendB" position={[2.2, 0.14, 1.82]} rotationY={-2.45} animation="sit" face="smug" time={t} />
          </group>
        );
      },
    },
    {
      cue: "4.only",
      look: "overworld-sunset",
      note: "Warm sunset flashback sweep over the quiet roadside spawn bench where nobody stared.",
      ...cam.sweep({ on: [-2.3, 1.25, 1.2], dist: 5.4, fromYaw: -34, toYaw: 28, pitch: 12, fov: 44 }),
      stage: (t) => (
        <>
          <SpawnBench />
          <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="sit" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.loved",
      look: "overworld-golden",
      note: "Golden-hour sweep around Maya waving happily on her roadside bench.",
      ...cam.sweep({ on: [-2.3, 1.45, 1.2], dist: 5.0, fromYaw: 32, toYaw: -22, pitch: 8, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench />
          <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="wave" face="grin" time={t} />
          <ServerChatBox position={[-2.3, 2.98, 1.2]} lines={[{ sender: "Maya", text: "hi everyone!", color: "#9bf2b0" }]} />
        </>
      ),
    },
  ],
});

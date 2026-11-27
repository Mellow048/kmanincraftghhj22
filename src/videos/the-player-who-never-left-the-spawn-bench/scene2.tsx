import type React from "react";
import {
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
 * Scene 2 (14 shots): Jake's TNT grief, Maya's quiet "sorry" & disconnect,
 * and the emotional IRL bedroom + school classroom reveal.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Scene 2",
  shots: [
    {
      cue: "3.jake",
      note: "Tracking shot follows angry griefer Jake marching down the street straight toward Maya's bench.",
      ...cam.track({ from: [5.8, 0, 7.0], to: [1.5, 0, 1.9], sideDist: 4.6, side: -1, height: 1.6, fov: 44 }),
      stage: (t) => {
        const j = moveBetween([5.8, 0, 7.0], [1.5, 0, 1.9], t, 0, 2.0);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} />
            <Maya position={[0, 0.2, 1.38]} animation="sit" face="worried" time={t} />
            <Jake position={j.position} rotationY={j.rotationY} animation={j.moving ? "walk" : "point"} animDistance={j.animDistance} face="angry" badge="!" badgePopStart={0.35} time={t} />
          </>
        );
      },
    },
    {
      cue: "3.tnt",
      note: "Low dramatic angle as Jake plants flashing red TNT beneath the wooden oak bench and backs away.",
      ...cam.heroLow({ on: [0.3, 0, 1.2], dist: 5.0, yaw: -24, fov: 44 }),
      stage: (t) => {
        const back = moveBetween([1.2, 0, 1.8], [2.4, 0, 3.2], t, 0.6, 2.0);
        return (
          <>
            <SpawnBench position={[0, 0, 1.2]} />
            <TntBlock position={[0.2, 0.45, 1.2]} fuse={clamp01(t / 1.8)} />
            <Maya position={[0, 0.2, 1.38]} animation="cower" face="scared" time={t} />
            <Jake position={back.position} rotationY={back.moving ? back.rotationY : -0.7} animation={back.moving ? "walk" : "press"} animDistance={back.animDistance} face="smug" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.boom",
      note: "Sweeping blast pull-back as the TNT explodes and oak splinters fly across the spawn square.",
      ...cam.sweep({ on: [0, 1.2, 1.2], dist: 4.6, distTo: 7.4, fromYaw: 12, toYaw: -34, pitch: 12, fov: 46 }),
      stage: (t) => {
        const flash = clamp01(1 - t / 0.85);
        return (
          <>
            <Crater position={[0, 0, 1.2]} debris={1} />
            {flash > 0.05 ? (
              <group position={[0, 1.2, 1.2]}>
                <Glow size={5.2 * flash + 1.2} color="#ffaa3b" opacity={0.85 * flash} />
                <Block size={[2.2 * flash, 2.2 * flash, 2.2 * flash]} color="#fff2c4" emissive="#ff7b24" emissiveIntensity={2.0} />
              </group>
            ) : null}
            <Maya position={[0, 0, 1.2]} animation="cower" face="scared" time={t} />
            <Jake position={[2.2, 0, 2.8]} rotationY={-0.6} animation="laugh" face="laugh" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.type",
      note: "Cross-angle sweep onto Jake laughing and typing go actually play the game in server chat.",
      ...cam.sweep({ on: [2.0, 1.5, 2.4], dist: 4.8, fromYaw: 34, toYaw: -12, pitch: 6, fov: 40 }),
      stage: (t) => (
        <>
          <Crater position={[0, 0, 1.2]} debris={1} />
          <Maya position={[0, 0, 1.2]} animation="idle" face="sad" time={t} />
          <Jake position={[2.2, 0, 2.8]} rotationY={-0.6} animation="laugh" face="laugh" time={t} />
          <ServerChatBox position={[1.8, 2.55, 2.6]} lines={[{ sender: "Jake", text: "go actually play the game", color: "#ff9e8a" }]} />
        </>
      ),
    },
    {
      cue: "3.stand",
      look: "overworld-rain",
      note: "Rainy crane sweeps down onto Maya standing alone and crying inside the blast crater.",
      ...cam.streetOverview({ from: [-2.8, 0, 7.2], to: [-0.8, 0, 4.6], height: 4.2, fov: 44 }),
      stage: (t) => (
        <>
          <Crater position={[0, 0, 1.2]} debris={1} />
          <Maya position={[0, 0, 1.2]} animation="idle" face="crying" tears={1} time={t} />
        </>
      ),
    },
    {
      cue: "3.sorry",
      look: "overworld-rain",
      note: "Intimate rainy arc around Maya as tears fall and she slowly types sorry in chat.",
      ...cam.sweep({ on: [0, 1.5, 1.2], dist: 4.4, fromYaw: 24, toYaw: -22, pitch: 5, fov: 38 }),
      stage: (t) => (
        <>
          <Crater position={[0, 0, 1.2]} debris={1} />
          <Maya position={[0, 0, 1.2]} animation="idle" face="crying" tears={1} time={t} />
          <ServerChatBox position={[0, 2.45, 1.2]} lines={[{ sender: "Maya", text: "sorry", color: "#d8e6ff" }]} typing={clamp01(t / 1.4)} />
        </>
      ),
    },
    {
      cue: "3.left",
      look: "overworld-rain",
      note: "Crane pulls high and away from the empty crater as Maya left the game appears in chat.",
      ...cam.streetOverview({ from: [0, 0, 4.6], to: [3.4, 0, 9.2], height: 3.4, fov: 46 }),
      stage: (t) => (
        <>
          <Crater position={[0, 0, 1.2]} debris={1} />
          <ServerChatBox position={[0, 2.2, 1.2]} lines={[{ text: "Maya left the game", color: "#ffe97d" }]} />
        </>
      ),
    },
    {
      cue: "4.days",
      look: "overworld-sunset",
      note: "Long golden-sunset sweep across the quiet spawn avenue showing the empty bench crater.",
      ...cam.sweep({ on: [0, 0.9, 1.2], dist: 6.6, fromYaw: -42, toYaw: 42, pitch: 14, fov: 44 }),
      stage: () => <Crater position={[0, 0, 1.2]} debris={1} />,
    },
    {
      cue: "4.join",
      zone: "irl",
      look: "overworld-day",
      note: "Bedroom cutaway sweep onto Maya's older sister typing on the glowing SMP computer desk.",
      ...cam.sweep({ on: [IRL_POS[0], 1.35, IRL_POS[2] - 1.2], dist: 4.6, fromYaw: 108, toYaw: 74, pitch: 10, fov: 42 }),
      stage: (t) => (
        <group position={IRL_POS}>
          <Sister position={[0.35, 0, -0.75]} rotationY={Math.PI} animation="press" face="sad" time={t} />
          <Maya position={[-0.75, 0, -0.45]} rotationY={Math.PI - 0.35} animation="idle" face="uneasy" nameTag="" time={t} />
          <ServerChatBox
            position={[0.1, 2.25, -1.35]}
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
      note: "Low empathetic angle on Maya beside her sister showing why she cannot hold a mouse.",
      ...cam.heroLow({ on: [IRL_POS[0] - 0.3, 0, IRL_POS[2] - 0.8], dist: 4.2, yaw: 102, fov: 40 }),
      stage: (t) => (
        <group position={IRL_POS}>
          <Sister position={[0.35, 0, -0.75]} rotationY={Math.PI} animation="idle" face="sad" time={t} />
          <Maya position={[-0.75, 0, -0.45]} rotationY={Math.PI - 0.35} animation="press" face="uneasy" nameTag="" time={t} />
        </group>
      ),
    },
    {
      cue: "4.keys",
      zone: "irl",
      look: "overworld-day",
      note: "Side-to-side desk sweep focusing on Maya carefully pressing two keyboard keys at once.",
      ...cam.sweep({ on: [IRL_POS[0] - 0.2, 1.15, IRL_POS[2] - 1.2], dist: 4.0, fromYaw: 110, toYaw: 78, pitch: 12, fov: 40 }),
      stage: (t) => (
        <group position={IRL_POS}>
          <Sister position={[0.35, 0, -0.75]} rotationY={Math.PI} animation="idle" face="calm" time={t} />
          <Maya position={[-0.75, 0, -0.45]} rotationY={Math.PI - 0.35 + Math.sin(t * 2.5) * 0.06} animation="press" face="calm" nameTag="" time={t} />
        </group>
      ),
    },
    {
      cue: "4.desk",
      zone: "school",
      look: "overworld-day",
      note: "Classroom sweep across student desks as Maya's yellow pencil drops and classmates stare.",
      ...cam.sweep({ on: [SCHOOL_POS[0], 1.1, SCHOOL_POS[2]], dist: 5.2, fromYaw: -34, toYaw: 24, pitch: 12, fov: 42 }),
      stage: (t) => {
        const drop = clamp01((t - 0.35) / 0.7);
        return (
          <group position={SCHOOL_POS}>
            <Maya position={[0, 0, 0.35]} rotationY={Math.PI} animation="sit" face="crying" tears={0.85} nameTag="" time={t} />
            <PencilProp position={[0.35, 0.78 - drop * 0.74, -0.15 + drop * 0.32]} rotation={[0, 0.5 + drop * 0.9, 0]} />
            <ServerPlayer role="bully" position={[-2.2, 0, 0.35]} rotationY={1.2} animation="sit" face="smug" badge="?" badgePopStart={0.5} time={t} />
            <ServerPlayer role="friendC" position={[2.2, 0, 0.35]} rotationY={-1.2} animation="sit" face="surprised" time={t} />
          </group>
        );
      },
    },
    {
      cue: "4.only",
      look: "overworld-sunset",
      note: "Warm sunset flashback crane over the spawn bench where nobody ever stared at Maya.",
      ...cam.streetOverview({ from: [-3.2, 0, 8.2], to: [1.6, 0, 4.8], height: 4.6, fov: 44 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} />
          <Maya position={[0, 0.2, 1.38]} animation="sit" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.loved",
      look: "overworld-golden",
      note: "Golden-hour sweep around Maya waving happily as her favorite part of the day plays out.",
      ...cam.sweep({ on: [0, 1.4, 1.2], dist: 5.0, fromYaw: 32, toYaw: -28, pitch: 8, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench position={[0, 0, 1.2]} />
          <Maya position={[0, 0.2, 1.38]} animation="wave" face="happy" time={t} />
          <ServerChatBox position={[0, 2.45, 1.2]} lines={[{ sender: "Maya", text: "hi everyone!", color: "#9bf2b0" }]} />
        </>
      ),
    },
  ],
});

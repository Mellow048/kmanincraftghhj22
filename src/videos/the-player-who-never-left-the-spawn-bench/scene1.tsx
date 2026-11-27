import type React from "react";
import {
  BENCH_POS,
  BENCH_ROT,
  BENCH_SEAT,
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
 * Scene 1 (10 shots): Hook & mystery at the roadside spawn bench on the 56m VillageStreet.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Scene 1",
  shots: [
    {
      cue: "1.bench",
      note: "High crane glides down the 56m SMP spawn avenue toward Maya seated on her roadside oak bench.",
      ...cam.streetOverview({ from: [-0.8, 0, 12.2], to: [-1.8, 0, 5.6], height: 5.4, fov: 46 }),
      stage: (t) => {
        const f = moveBetween([0.6, 0, -3.5], [1.0, 0, 0.2], t, 0, 1.8);
        return (
          <>
            <SpawnBench />
            <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="sit" face="smile" time={t} />
            <ServerPlayer role="friendA" position={f.position} rotationY={f.rotationY} animation={f.moving ? "walk" : "idle"} animDistance={f.animDistance} time={t} />
            <ServerPlayer role="friendB" position={[2.2, 0, 4.8]} rotationY={-0.6} animation="idle" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.four",
      note: "Side tracking camera glides beside Maya as she walks to her roadside oak bench and sits down.",
      ...cam.track({ from: [-4.0, 0, 6.2], to: [-2.2, 0, 1.6], sideDist: 4.8, side: 1, height: 1.7, fov: 44 }),
      stage: (t) => {
        const w = moveBetween([-4.0, 0, 6.2], [-2.2, 0, 1.6], t, 0, 1.8);
        return (
          <>
            <SpawnBench />
            <Maya
              position={w.moving ? w.position : BENCH_SEAT}
              rotationY={w.moving ? w.rotationY : BENCH_ROT}
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
      note: "Cross-street parallax sweep around Maya peacefully sitting on the sidewalk while players jog past on the road.",
      ...cam.sweep({ on: [-2.0, 1.35, 1.2], dist: 5.4, fromYaw: -18, toYaw: 34, pitch: 8, fov: 42 }),
      stage: (t) => {
        const passer = moveBetween([1.2, 0, -4.5], [0.8, 0, 4.5], t, 0, 2.4);
        return (
          <>
            <SpawnBench />
            <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="sit" face="calm" time={t} />
            <ServerPlayer role="friendA" position={passer.position} rotationY={passer.rotationY} animation="walk" animDistance={passer.animDistance} time={t} />
          </>
        );
      },
    },
    {
      cue: "1.chat",
      note: "Warm 3/4 sweep highlighting Maya waving as her compact floating chat box types hi above her nametag.",
      ...cam.sweep({ on: [-2.3, 1.65, 1.2], dist: 4.8, fromYaw: 34, toYaw: -10, pitch: 6, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench />
          <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="wave" face="grin" time={t} />
          <ServerChatBox
            position={[-2.3, 2.95, 1.2]}
            lines={[{ sender: "Maya", text: "hi", color: "#9bf2b0" }]}
            typing={clamp01(t / 1.3)}
          />
        </>
      ),
    },
    {
      cue: "1.back",
      note: "Tracking camera follows a returning player jogging up the road while Maya types welcome back.",
      ...cam.track({ from: [1.4, 0, 9.2], to: [0.4, 0, 2.6], sideDist: 5.2, side: -1, height: 1.75, fov: 44 }),
      stage: (t) => {
        const runner = moveBetween([1.4, 0, 9.2], [0.4, 0, 2.6], t, 0, 2.1);
        return (
          <>
            <SpawnBench />
            <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="wave" face="grin" time={t} />
            <ServerPlayer
              role="friendB"
              nameTag="Sam"
              position={runner.position}
              rotationY={runner.rotationY}
              animation={runner.moving ? "run" : "wave"}
              animDistance={runner.animDistance}
              face="grin"
              time={t}
            />
            <ServerChatBox
              position={[-1.0, 3.05, 1.6]}
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
      note: "Front-side sweep across the roadside bench showing the open spawn square beside her.",
      ...cam.sweep({ on: [-2.2, 1.2, 1.2], dist: 5.8, fromYaw: 95, toYaw: 55, pitch: 12, fov: 44 }),
      stage: (t) => (
        <>
          <SpawnBench />
          <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="sit" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "2.walk",
      note: "Low-angle street shot as two diamond-armored players sprint down the open road past Maya's roadside bench.",
      ...cam.heroLow({ on: [-0.6, 0, 2.4], dist: 6.2, yaw: -18, fov: 44 }),
      stage: (t) => {
        const a = moveBetween([0.2, 0, -4.8], [0.2, 0, 6.8], t, 0, 2.2);
        const b = moveBetween([1.6, 0, 6.8], [1.6, 0, -4.8], t, 0, 2.2);
        return (
          <>
            <SpawnBench />
            <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="sit" face="smile" time={t} />
            <ServerPlayer role="friendA" shirtColor="#4be3e8" nameTag="Kai" position={a.position} rotationY={a.rotationY} animation="run" animDistance={a.animDistance} face="grin" time={t} />
            <ServerPlayer role="friendC" shirtColor="#39c9d4" nameTag="Leo" position={b.position} rotationY={b.rotationY} animation="run" animDistance={b.animDistance} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.wave",
      note: "Gentle arc across the roadside oak bench as Maya stays seated and waves warmly to passersby.",
      ...cam.sweep({ on: [-2.3, 1.35, 1.2], dist: 4.8, fromYaw: -14, toYaw: 34, pitch: 7, fov: 40 }),
      stage: (t) => (
        <>
          <SpawnBench />
          <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "2.bot",
      note: "Tracking shot following two mocking players walking down the road past Maya's bench.",
      ...cam.track({ from: [-0.4, 0, 5.4], to: [1.6, 0, 4.0], sideDist: 5.0, side: 1, height: 1.7, fov: 44 }),
      stage: (t) => {
        const m1 = moveBetween([-0.4, 0, 5.4], [1.6, 0, 4.0], t, 0, 2.2);
        const m2 = moveBetween([-1.2, 0, 6.2], [0.8, 0, 4.8], t, 0, 2.2);
        return (
          <>
            <SpawnBench />
            <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="sit" face="uneasy" time={t} />
            <ServerPlayer role="bully" nameTag="Zed" position={m1.position} rotationY={m1.rotationY} animation={m1.moving ? "walk" : "laugh"} animDistance={m1.animDistance} face="smug" badge="?" badgePopStart={0.35} time={t} />
            <ServerPlayer role="friendC" position={m2.position} rotationY={m2.rotationY} animation={m2.moving ? "walk" : "point"} animDistance={m2.animDistance} face="laugh" time={t} />
            <ServerChatBox position={[0.4, 2.98, 4.2]} lines={[{ sender: "Zed", text: "lol afk bot", color: "#ffcf7d" }]} />
          </>
        );
      },
    },
    {
      cue: "2.why",
      note: "High crane pulls back over the spawn avenue as a question mark pops above Maya's head.",
      ...cam.streetOverview({ from: [-0.8, 0, 6.2], to: [-3.2, 0, 10.6], height: 4.6, fov: 46 }),
      stage: (t) => (
        <>
          <SpawnBench />
          <Maya position={BENCH_SEAT} rotationY={BENCH_ROT} animation="sit" face="uneasy" time={t} />
          <BadgePop kind="?" position={[BENCH_POS[0], 2.55, BENCH_POS[2]]} popStart={0.25} t={t} />
        </>
      ),
    },
  ],
});

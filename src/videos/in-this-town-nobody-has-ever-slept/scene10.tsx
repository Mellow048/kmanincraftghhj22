import { cam, storyScene } from "../../engine";
import {
  Baker,
  EAST,
  Hero,
  LavaBucket,
  Mum,
  NORTH,
  OldWick,
  ROBE,
  SOUTH,
  Villager,
  WEST,
  ease,
  pop,
  ramp,
  timing,
  wordAt,
} from "./kit";

export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Back In Town",
  shots: [
    {
      cue: "10.night",
      ...cam.crane({ on: [0, 0.5, 2.0], dist: 3.8, yaw: -22, fromPitch: 12, toPitch: 28, fov: 40 }),
      zone: "nether",
      look: "lava-shore",
      note: "Hero marches back into crimson Nether street and boldly lies right down onto warm cobbles.",
      stage: (t) => {
        const LAY = wordAt("10.night", "lay");
        const k = ease(ramp(t, 0, LAY + 0.45));
        return (
          <>
            <group position={[0, 0.25, 2.0]} rotation={[-k * (Math.PI / 2), 0, 0]}>
              <Hero position={[0, 0, 0]} animation="idle" face={k > 0.6 ? "calm" : "brave"} time={t} />
            </group>
          </>
        );
      },
    },
    {
      cue: "10.wick",
      ...cam.truck({ on: [0.3, 0.55, 2.0], by: [0.8, 0, 0], dist: 3.6, yaw: 18, pitch: 22, fov: 40 }),
      zone: "nether",
      look: "lava-shore",
      note: "Old Wick hobbles up and lowers his purple robes gently down beside Hero on stone street.",
      stage: (t) => {
        const NEXT = wordAt("10.wick", "next");
        const k = ease(ramp(t, 0, NEXT + 0.4));
        return (
          <>
            <group position={[-0.2, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Hero position={[0, 0, 0]} animation="idle" face="smile" time={t} />
            </group>
            <group position={[1.15, 0.25 + (1 - k) * 0.4, 2.0]} rotation={[-k * (Math.PI / 2), 0, 0]}>
              <OldWick position={[0, 0, 0]} walk={k < 0.4 ? t * 1.2 : 0} />
            </group>
          </>
        );
      },
    },
    {
      cue: "10.mum",
      ...cam.push({ on: [-1.4, 0.6, 2.0], dist: 3.7, to: 2.1, yaw: -18, pitch: 18, fov: 38 }),
      zone: "nether",
      look: "lava-shore",
      note: "Mum stops dead, lowers shoulder, and lies right down next to Hero still clutching heavy magma bucket.",
      stage: (t) => {
        const BUK = wordAt("10.mum", "bucket");
        const k = ease(ramp(t, 0, BUK + 0.45));
        return (
          <>
            <group position={[0.1, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Hero position={[0, 0, 0]} animation="idle" face="smile" time={t} />
            </group>
            <group position={[1.35, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <OldWick position={[0, 0, 0]} />
            </group>
            <group position={[-1.4, 0.25 + (1 - k) * 0.4, 2.0]} rotation={[-k * (Math.PI / 2), 0, 0]}>
              <Mum position={[0, 0, 0]} carry={<LavaBucket position={[0, 0.42, 0]} scale={0.62} />} />
            </group>
          </>
        );
      },
    },
    {
      cue: "10.bex",
      ...cam.crane({ on: [0, 0.5, 2.0], dist: 6.5, yaw: 24, fromPitch: 16, toPitch: 42, fov: 50 }),
      zone: "nether",
      look: "lava-shore",
      note: "Boom rises swiftly overhead as Baker and wave after wave of hundreds drop onto warm street together.",
      stage: (t) => {
        const PEO = wordAt("10.bex", "people");
        const dropAll = ease(ramp(t, PEO - 0.3, PEO + 0.65));
        return (
          <>
            <group position={[0, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Hero position={[0, 0, 0]} animation="idle" face="smile" time={t} />
            </group>
            <group position={[-1.4, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Mum position={[0, 0, 0]} carry={<LavaBucket position={[0, 0.42, 0]} scale={0.6} />} />
            </group>
            <group position={[1.4, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <OldWick position={[0, 0, 0]} />
            </group>
            {[
              [-2.8, 0.8, ROBE.white],
              [2.8, 0.9, ROBE.brown],
              [-2.4, 3.3, ROBE.farmer],
              [2.6, 3.4, ROBE.blue],
              [-0.4, 3.6, ROBE.smith],
              [1.2, 3.7, ROBE.red],
            ].map(([vx, vz, r], i) => {
              const lk = ease(ramp(t, i * 0.14, i * 0.14 + 0.5)) * dropAll;
              return (
                <group key={i} position={[vx as number, 0.25 + (1 - lk) * 0.45, vz as number]} rotation={[-lk * (Math.PI / 2), 0, (i % 2 ? 0.15 : -0.15)]}>
                  <Villager robe={r as string} position={[0, 0, 0]} />
                </group>
              );
            })}
          </>
        );
      },
    },
    {
      cue: "10.stopped",
      ...cam.top({ on: [0, 0.4, 2.0], height: 7.2, to: 1.2, spin: [0, 0.2], fov: 50 }),
      zone: "nether",
      look: "lava-shore",
      note: "Sacred overhead glide across hundreds lying quiet shoulder-to-shoulder wide-awake—zero movement, just rest.",
      stage: (t) => {
        const STOP = wordAt("10.stopped", "stopped");
        return (
          <>
            <group position={[0, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Hero position={[0, 0, 0]} animation="idle" face={t < STOP ? "calm" : "smile"} time={t} />
            </group>
            <group position={[-1.4, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Mum position={[0, 0, 0]} carry={<LavaBucket position={[0, 0.42, 0]} scale={0.6} />} />
            </group>
            <group position={[1.4, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <OldWick position={[0, 0, 0]} />
            </group>
            {[
              [-2.8, 0.8, ROBE.white],
              [2.8, 0.9, ROBE.brown],
              [-2.4, 3.3, ROBE.farmer],
              [2.6, 3.4, ROBE.blue],
              [-0.4, 3.6, ROBE.smith],
              [1.2, 3.7, ROBE.red],
            ].map(([vx, vz, r], i) => (
              <group key={i} position={[vx as number, 0.25, vz as number]} rotation={[-Math.PI / 2, 0, (i % 2 ? 0.15 : -0.15) + Math.sin(t + i) * 0.02]}>
                <Villager robe={r as string} position={[0, 0, 0]} />
              </group>
            ))}
          </>
        );
      },
    },
  ],
});

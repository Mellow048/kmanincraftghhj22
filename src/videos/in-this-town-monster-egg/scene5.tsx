import { clamp01, defineScene, Glow, LightPool, smoothstep, useTime } from "../../engine";
import { Dragon, Phoenix, RankDisplay, Worm } from "../../../Topics/InThisTown/creatures";
import { MARKS, TOWN } from "../../../Topics/InThisTown/maps";
import { Friend, Hero, Sister } from "./actors";

/** 16–20s: infinity is earned by a rescue; the old high ranks now stand beside rank 1. */
export const scene5 = defineScene({
  id: "scene5",
  title: "Stand With Us",
  duration: 4.0,
  shots: [
    {
      at: 0,
      dur: 4.0,
      from: [-0.3, 1.8, 8.0],
      to: [-0.22, 1.8, 7.7],
      target: [0.1, 1.45, 13.0],
      targetTo: [-0.2, 1.78, 13.6],
      fov: 76,
      fovTo: 80,
      ease: "inOutSine",
      note: "Retreat a fraction so the friend and sister can cross toward the hero IN FRONT of their guardian; hold the worm behind them and the physical infinity board to its left.",
    },
  ],
  Component: () => {
    const t = useTime();
    const rise = smoothstep(clamp01(t / 2.3));
    const join = smoothstep(clamp01((t - 0.8) / 2.4));
    const wormPos: [number, number, number] = [1.08 - 0.88 * rise, 0, 12.11 + 0.99 * rise];
    const heroPos: [number, number, number] = [-1.1 + 0.25 * join, 0, 11.3 - 0.4 * join];
    const friendPos: [number, number, number] = [1.25 - 1.3 * join, 0, 11.25 - 0.35 * join];
    const sisterPos: [number, number, number] = [2.35 - 0.9 * join, 0, 13.3 - 1.85 * join];
    return (
      <>
        {/* The children finish AHEAD of the guardian, so they are not hidden by it. */}
        <Hero position={heroPos} rotationY={Math.PI} animation={join > 0.6 ? "wave" : "idle"} face={t > 1.5 ? "happy" : "surprised"} headYaw={0.18} />
        <Friend position={friendPos} rotationY={Math.PI - join * 0.38} animation={join > 0.2 && join < 0.96 ? "walk" : "idle"} animDistance={Math.hypot(1.3, 0.35) * join} face={t > 2.1 ? "happy" : "surprised"} headYaw={-0.2} />
        <Sister position={sisterPos} rotationY={Math.PI} animation={join > 0.05 && join < 0.98 ? "walk" : "idle"} animDistance={Math.hypot(0.9, 1.85) * join} face={t > 1.7 ? "happy" : "surprised"} />
        <Dragon position={MARKS.dragonClass} scale={0.82} time={t + 16} bow={join} />
        <Phoenix position={MARKS.phoenixClass} scale={0.83} time={t + 16} bow={join} />
        <Worm position={wormPos} scale={1.66 + 0.82 * rise} rise={0.68 + 0.32 * rise} charge={1} time={t + 16} />
        <RankDisplay position={TOWN.rankBoard} rank={t > 1.56 ? "∞" : "10000"} width={2.2} glow={1} />
        <Glow position={[wormPos[0], 1.65 + rise, wormPos[2] - 0.6]} size={2.9 + rise * 1.8} color="#87ffe0" opacity={0.08 + rise * 0.08} />
        <LightPool position={[wormPos[0], 0.02, wormPos[2]]} width={3.6 + rise} depth={3.3 + rise} color="#7ef3c7" opacity={0.11} />
      </>
    );
  },
});

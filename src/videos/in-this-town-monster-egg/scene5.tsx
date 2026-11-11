import { clamp01, defineScene, Glow, LightPool, smoothstep, useTime } from "../../engine";
import { Dragon, Phoenix, RankDisplay, Worm } from "../../../Topics/InThisTown/creatures";
import { MARKS } from "../../../Topics/InThisTown/maps";
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
      from: [-0.65, 1.5, 10.45],
      to: [0.22, 1.63, 8.95],
      target: [0.5, 1.28, 12.45],
      targetTo: [0.1, 1.66, 13.35],
      fov: 38,
      fovTo: 56,
      ease: "inOutSine",
      note: "Pull back just enough to reveal the two kids stepping beside the underdog. The same gentle worm rises over them and the physical rank board finally lights up as infinity.",
    },
  ],
  Component: () => {
    const t = useTime();
    const rise = smoothstep(clamp01(t / 2.3));
    const join = smoothstep(clamp01((t - 0.8) / 2.4));
    const wormPos: [number, number, number] = [1.08 - 0.88 * rise, 0, 12.11 + 0.99 * rise];
    const friendPos: [number, number, number] = [1.95 - 1.25 * join, 0, 11.25 + 0.85 * join];
    const sisterPos: [number, number, number] = [2.9 - 1.35 * join, 0, 13.25 - 0.45 * join];
    return (
      <>
        <Hero position={[-1.8 + 0.85 * join, 0, 11.3 + 0.68 * join]} rotationY={Math.PI} animation={join > 0.6 ? "wave" : "idle"} face={t > 1.5 ? "happy" : "surprised"} headYaw={0.18} />
        <Friend position={friendPos} rotationY={Math.PI - join * 0.38} animation={join > 0.2 && join < 0.96 ? "walk" : "idle"} face={t > 2.1 ? "happy" : "surprised"} headYaw={-0.2} />
        <Sister position={sisterPos} rotationY={Math.PI} animation="idle" face={t > 1.7 ? "happy" : "surprised"} />
        <Dragon position={[1.8, 0, 13.48]} scale={0.82} time={t + 16} bow={join} />
        <Phoenix position={[2.45, 1.78, 13.75]} scale={0.83} time={t + 16} bow={join} />
        <Worm position={wormPos} scale={1.66 + 0.82 * rise} rise={0.68 + 0.32 * rise} charge={1} time={t + 16} />
        <RankDisplay position={[0, 2.05, 16.0]} rank={t > 1.56 ? "∞" : "10000"} width={2.2} glow={1} />
        <Glow position={[wormPos[0], 1.65 + rise, wormPos[2] - 0.6]} size={2.9 + rise * 1.8} color="#87ffe0" opacity={0.28 + rise * 0.2} />
        <LightPool position={[wormPos[0], 0.02, wormPos[2]]} width={3.6 + rise} depth={3.3 + rise} color="#7ef3c7" opacity={0.25} />
      </>
    );
  },
});

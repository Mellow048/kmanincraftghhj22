import { clamp01, defineScene, Glow, LightPool, smoothstep, useTime } from "../../engine";
import { Dragon, FireStream, Phoenix, RankDisplay, Worm } from "../../../Topics/InThisTown/creatures";
import { MARKS } from "../../../Topics/InThisTown/maps";
import { Friend, Hero, Sister } from "./actors";

/** 11.4–16.0s: first fire → rank 100; second, harder rescue → 10,000. */
export const scene4 = defineScene({
  id: "scene4",
  title: "The Fire Eater",
  duration: 4.6,
  shots: [
    {
      at: 0,
      dur: 4.6,
      from: [0.2, 1.5, 8.92],
      to: [-0.65, 1.5, 10.45],
      target: [0.2, 0.85, 11.65],
      targetTo: [0.5, 1.28, 12.45],
      fov: 40,
      fovTo: 38,
      ease: "inOutSine",
      note: "Push sideways as the tiny worm swallows fire, then let its larger body hide the friend from a second blast. The number changes after the protection, not before.",
    },
  ],
  Component: () => {
    const t = useTime();
    const first = smoothstep(clamp01((t - 0.48) / 1.15));
    const rescue = smoothstep(clamp01((t - 2.2) / 1.58));
    const position: [number, number, number] = [0.25 + 0.83 * rescue, 0, 12.45 - 0.34 * rescue];
    const size = 0.34 + 0.54 * first + 0.78 * rescue;
    const firstFlame = clamp01((t + 0.66) / 1.37) * (1 - clamp01((t - 1.22) / 0.38));
    const secondFlame = clamp01((t - 1.91) / 1.37) * (1 - clamp01((t - 3.58) / 0.55));
    return (
      <>
        <Hero position={MARKS.heroClass} rotationY={Math.PI} animation="scared" face={t > 3.2 ? "surprised" : "scared"} lookAt={position} />
        <Friend position={MARKS.friendClass} rotationY={Math.PI} animation={t > 2.15 ? "cower" : "idle"} face={t > 2.15 ? "scared" : "surprised"} headYaw={-0.35} />
        <Sister position={MARKS.sisterClass} rotationY={Math.PI} animation="idle" face="scared" lookAt={position} />
        <Dragon position={MARKS.dragonClass} scale={0.82} time={t + 11.4} />
        <Phoenix position={MARKS.phoenixClass} scale={0.83} time={t + 11.4} />
        <Worm position={position} scale={size} rise={0.12 * first + 0.56 * rescue} charge={0.15 + 0.68 * first + 0.17 * rescue} time={t + 11.4} />
        <RankDisplay position={[0, 2.05, 16.0]} rank={rescue > 0.73 ? "10000" : first > 0.68 ? "100" : "1"} width={1.65} glow={first} />
        <FireStream origin={[1.85, 1.18, 12.02]} target={[0.25, 0.38, 12.45]} progress={firstFlame} />
        <FireStream origin={[1.85, 1.2, 12.02]} target={[1.5, 0.8, 11.25]} progress={secondFlame} power={1.45} />
        <Glow position={[position[0], 0.62 + rescue * 0.6, position[2] - 0.45]} size={1.1 + first * 1.0 + rescue * 1.0} color="#6ee8c8" opacity={(first + rescue) * 0.2} />
        <LightPool position={[position[0], 0.018, position[2]]} width={1.0 + size} depth={0.9 + size} color="#78d6ad" opacity={(first + rescue) * 0.17} />
      </>
    );
  },
});

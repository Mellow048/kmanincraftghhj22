import { clamp01, defineScene, Glow, LightPool, smoothstep, useTime } from "../../engine";
import { Dragon, FireStream, Phoenix, RankDisplay, Worm } from "../../../Topics/InThisTown/creatures";
import { MARKS, TOWN } from "../../../Topics/InThisTown/maps";
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
      from: [0.15, 1.58, 8.9],
      to: [-0.3, 1.8, 8.0],
      target: [0.25, 1.45, 12.8],
      targetTo: [0.1, 1.45, 13.0],
      fov: 88,
      fovTo: 76,
      ease: "inOutSine",
      note: "Ease back as the tiny worm swallows fire; give its growth room in frame, then see it hide the friend from a harder blast. The number changes after protection.",
    },
  ],
  Component: () => {
    const t = useTime();
    const first = smoothstep(clamp01((t - 0.48) / 1.15));
    const rescue = smoothstep(clamp01((t - 2.2) / 1.58));
    const position: [number, number, number] = [0.25 + 0.5 * rescue, 0, 12.45 - 0.34 * rescue];
    const size = 0.34 + 0.54 * first + 0.78 * rescue;
    const firstFlame = clamp01((t + 0.66) / 1.37) * (1 - clamp01((t - 1.22) / 0.38));
    // The second jet visibly stops at the worm instead of passing through to its friend.
    const secondFlame = 0.72 * clamp01((t - 1.91) / 1.37) * (1 - clamp01((t - 3.58) / 0.55));
    return (
      <>
        <Hero position={MARKS.heroClass} rotationY={Math.PI} animation="scared" face={t > 3.2 ? "surprised" : "scared"} lookAt={position} />
        <Friend position={MARKS.friendClass} rotationY={Math.PI} animation={t > 2.15 ? "cower" : "idle"} face={t > 2.15 ? "scared" : "surprised"} headYaw={-0.35} />
        <Sister position={MARKS.sisterClass} rotationY={Math.PI} animation="idle" face="scared" lookAt={position} />
        <Dragon position={MARKS.dragonClass} scale={0.82} time={t + 11.4} />
        <Phoenix position={MARKS.phoenixClass} scale={0.83} time={t + 11.4} />
        <Worm position={position} scale={size} rise={0.12 * first + 0.56 * rescue} charge={0.15 + 0.68 * first + 0.17 * rescue} time={t + 11.4} />
        <RankDisplay position={TOWN.rankBoard} rank={rescue > 0.73 ? "10000" : first > 0.68 ? "100" : "1"} width={1.65} glow={first} />
        <FireStream origin={[-0.4, 1.18, 13.68]} target={[0.25, 0.38, 12.45]} progress={firstFlame} />
        <FireStream origin={[-0.4, 1.2, 13.68]} target={[1.17, 0.8, 11.25]} progress={secondFlame} power={1.45} />
        <Glow position={[position[0], 0.62 + rescue * 0.6, position[2] - 0.45]} size={1.1 + first * 1.0 + rescue * 1.0} color="#6ee8c8" opacity={(first + rescue) * 0.055} />
        <LightPool position={[position[0], 0.018, position[2]]} width={1.0 + size} depth={0.9 + size} color="#78d6ad" opacity={(first + rescue) * 0.07} />
      </>
    );
  },
});

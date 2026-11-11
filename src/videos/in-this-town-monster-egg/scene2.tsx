import { clamp01, defineScene, smoothstep, useTime, useWalkPath } from "../../engine";
import type { Vec3 } from "../../engine";
import { Dragon, MonsterEgg, Phoenix, RankDisplay, Worm } from "../../../Topics/InThisTown/creatures";
import { MARKS } from "../../../Topics/InThisTown/maps";
import { Friend, Hero, Sister } from "./actors";

const HERO_PATH: Vec3[] = [MARKS.heroHome, [-1.14, 0, -1.0], MARKS.heroGate];
const WORM_PATH: Vec3[] = [MARKS.egg, [-0.48, 0, -0.7], [-0.5, 0, 1.7]];

/** 3.8–7.3s: broken shell → tiny worm → two large, ranked companions in the same street. */
export const scene2 = defineScene({
  id: "scene2",
  title: "The Others",
  duration: 3.5,
  shots: [
    {
      at: 0,
      dur: 3.5,
      from: [-2.65, 1.8, -8.25],
      to: [0.05, 1.78, -3.05],
      target: [-1.35, 1.0, -2.65],
      targetTo: [0.0, 1.4, 2.05],
      fov: 78,
      fovTo: 74,
      ease: "inOutSine",
      note: "Track beside the little worm toward the school, letting house parallax and the friend’s dragon and sister’s phoenix make its small size embarrassing.",
    },
  ],
  Component: () => {
    const t = useTime();
    const hero = useWalkPath({ points: HERO_PATH, duration: 3.5, delay: 0.5, ease: "inOutSine" });
    const worm = useWalkPath({ points: WORM_PATH, duration: 3.5, delay: 0.25, ease: "inOutSine" });
    const towardSchool = smoothstep(clamp01((t - 2.65) / 0.85));
    return (
      <>
        <MonsterEgg position={MARKS.egg} open={1} />
        <Hero position={hero.position} rotationY={hero.yaw} animation="walk" animDistance={hero.distance} headYaw={hero.headYaw} face="sad" />
        <Worm position={worm.position} scale={0.34} time={t + 3.8} />
        {/* He points at the worm instead of offering the hero a place beside him. */}
        <Friend position={MARKS.friendGate} rotationY={Math.PI * (1 - towardSchool)} animation={t > 1.35 && t < 2.7 ? "point" : "idle"} headYaw={-0.2} face="smug" />
        <Sister position={MARKS.sisterGate} rotationY={Math.PI * (1 - towardSchool)} face="surprised" headYaw={0.2} />
        <Dragon position={MARKS.dragonGate} scale={0.82} time={t + 3.8} />
        <Phoenix position={MARKS.phoenixGate} scale={0.83} time={t + 3.8} />
        <RankDisplay position={[0.55, 2.62, 1.05]} rank="1M" width={0.85} />
        <RankDisplay position={[-1.75, 3.5, 1.2]} rank="10K" width={0.85} />
      </>
    );
  },
});

import { clamp01, defineScene, smoothstep, useTime, useWalkPath } from "../../engine";
import type { Vec3 } from "../../engine";
import { Dragon, FireStream, Phoenix, RankDisplay, Worm } from "../../../Topics/InThisTown/creatures";
import { MARKS, TOWN } from "../../../Topics/InThisTown/maps";
import { Friend, Hero, Sister } from "./actors";

/** Every route goes through x -1.15..1.15 at BOTH school doors. */
const HERO_PATH: Vec3[] = [MARKS.heroGate, [-0.72, 0, 3.2], [-0.55, 0, 4.2], [-0.95, 0, 6.6], [-0.52, 0, 8.55], MARKS.heroClass];
const FRIEND_PATH: Vec3[] = [MARKS.friendGate, [0.72, 0, 3.3], [1.3, 0, 5.7], [0.55, 0, 8.53], MARKS.friendClass];
const SISTER_PATH: Vec3[] = [MARKS.sisterGate, [-0.7, 0, 3.3], [-1.55, 0, 6.5], [0.45, 0, 8.55], MARKS.sisterClass];
const DRAGON_PATH: Vec3[] = [MARKS.dragonGate, [0.62, 0, 3.34], [1.5, 0, 6.2], [0.5, 0, 8.52], MARKS.dragonClass];
const PHOENIX_PATH: Vec3[] = [MARKS.phoenixGate, [-0.4, 1.65, 3.32], [-1.7, 1.65, 6.5], [0.4, 1.7, 8.55], MARKS.phoenixClass];
const WORM_PATH: Vec3[] = [[-0.5, 0, 1.7], [-0.3, 0, 3.3], [0.15, 0, 6.3], [0.18, 0, 8.52], MARKS.wormClass];

/** 7.3–11.4s: one unbroken move from street, through the school hall, into class. */
export const scene3 = defineScene({
  id: "scene3",
  title: "Nobody Picks Us",
  duration: 4.1,
  shots: [
    {
      at: 0,
      dur: 4.1,
      from: [0.05, 1.78, -3.05],
      path: [
        [0.05, 1.78, -3.05],
        [-0.15, 1.78, -0.3],
        [0.05, 1.7, 2.4],
        [0.2, 1.65, 4.25],
        [0.15, 1.6, 6.5],
        [0.15, 1.58, 8.9],
      ],
      target: [0.0, 1.4, 2.05],
      targetPath: [
        [0.0, 1.4, 2.05],
        [0.05, 1.4, 4.7],
        [0.15, 1.45, 7.4],
        [0.2, 1.45, 10.1],
        [0.25, 1.45, 12.8],
      ],
      fov: 74,
      fovTo: 88,
      ease: "inOutSine",
      note: "Follow the kid past the laughing friend, cross the real school threshold, then pass the classroom door as the dragon's first flame reaches for someone vulnerable.",
    },
  ],
  Component: () => {
    const t = useTime();
    const hero = useWalkPath({ points: HERO_PATH, duration: 4.1, ease: "inOutSine", tail: 0.42 });
    const friend = useWalkPath({ points: FRIEND_PATH, duration: 4.1, delay: 0.12, ease: "inOutSine", tail: 0.42 });
    const sister = useWalkPath({ points: SISTER_PATH, duration: 4.1, delay: 0.22, ease: "inOutSine", tail: 0.34 });
    const dragon = useWalkPath({ points: DRAGON_PATH, duration: 4.1, delay: 0.18, ease: "inOutSine", tail: 0.32 });
    const phoenix = useWalkPath({ points: PHOENIX_PATH, duration: 4.1, delay: 0.1, ease: "inOutSine", tail: 0.33 });
    const worm = useWalkPath({ points: WORM_PATH, duration: 4.1, ease: "inOutSine", tail: 0.18 });
    const turn = smoothstep(clamp01((t - 3.45) / 0.65));
    const dragonEnter = smoothstep(clamp01(t / 0.55));
    return (
      <>
        <Hero position={hero.position} rotationY={hero.yaw * (1 - turn) + Math.PI * turn} animation={hero.moving ? "run" : "idle"} animDistance={hero.distance} headYaw={hero.headYaw} face={t > 2.5 ? "scared" : "sad"} />
        <Friend position={friend.position} rotationY={friend.yaw * (1 - turn) + Math.PI * turn} animation={friend.moving ? "walk" : "idle"} animDistance={friend.distance} headYaw={friend.headYaw} face={t > 3.5 ? "surprised" : "smug"} />
        <Sister position={sister.position} rotationY={sister.yaw * (1 - turn) + Math.PI * turn} animation={sister.moving ? "walk" : "idle"} animDistance={sister.distance} face={t > 3.3 ? "scared" : "happy"} />
        <Worm position={worm.position} scale={0.34} time={t + 7.3} />
        {/* Wings fold at each REAL doorway, then unfold in the hall/class. */}
        <Dragon position={dragon.position} scale={0.82} time={t + 7.3} facing={(Math.PI * (1 - dragonEnter) + dragon.yaw * dragonEnter) * (1 - turn) + Math.PI * turn} wingsFold={clamp01(Math.max(1 - Math.abs(dragon.position[2] - 3.55) / 1.1, 1 - Math.abs(dragon.position[2] - 8.65) / 1.1))} />
        <Phoenix position={phoenix.position} scale={0.83} time={t + 7.3} />
        {t > 3.44 && <FireStream origin={[-0.4, 1.18, 13.68]} target={[0.25, 0.38, 12.45]} progress={clamp01((t - 3.44) / 1.4)} />}
        {t > 3.75 && <RankDisplay position={TOWN.rankBoard} rank="1" width={1.65} />}
      </>
    );
  },
});

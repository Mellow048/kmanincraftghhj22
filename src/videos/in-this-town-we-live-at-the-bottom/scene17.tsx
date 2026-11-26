import { cam, storyScene, walkSegment } from "../../engine";
import { Basket, Bucket, Coin, EAST, FishPile, Friend, GoldenApple, Healer, Hero, JETTY_CROWD, Keeper, SOUTH, TOWN_ROBES, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene17 = storyScene(timing, {
  id: "scene17",
  title: "He did the sums",
  shots: [
    {
      cue: "17.cold",
      ...cam.push({ on: [-0.15, 1.2, 14.0], dist: 6.6, to: 5.6, yaw: -36, pitch: 4, fov: 48, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "3/4 angle: cold Keeper steps cleanly clear of Basket, bollard, and FishPile weighing a coin in hand as Hero watches.",
      stage: (t) => {
        const keeperWalk = walkSegment([0.3, 0.5, 13.85], [0.15, 0.5, 13.65], t, 0, 0.9, { endYaw: SOUTH - 0.45 });
        return (
          <>
            <Basket position={[0.3, 0.5, 14.95]} rope={16} />
            <Keeper {...keeperWalk} animation={t < 0.9 ? keeperWalk.animation : "idle"} face="blank" headYaw={-0.3 * ease(ramp(t, 0.4, 1.2))} headPitch={0.14} time={t}>
              <Coin position={[0, -0.02, 0.06]} spin={t * 3} />
            </Keeper>
            <FishPile position={[-0.65, 0.52, 14.0]} n={18} seed={19} />
            <Hero position={[-0.75, 0.5, 13.0]} rotationY={EAST - 0.35} animation="idle" face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "17.sums",
      ...cam.orbit({ on: [-0.05, 1.15, 14.0], dist: 6.2, distTo: 5.0, yaw: -22, yawTo: 16, pitch: 14, fov: 46, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Uncropped 9:16 frame: Keeper clear of Basket and bollard reaches GoldenApple cleanly in his right hand over huge year-of-fish hoard & buckets.",
      stage: (t) => (
        <>
          <Basket position={[0.35, 0.5, 14.95]} rope={16} />
          <Keeper position={[0.45, 0.5, 13.85]} rotationY={WEST + 0.45} animation="reach" face="blank" time={t}>
            <GoldenApple position={[0, -0.04, 0.08]} scale={1.15} rotationY={t * 1.4} />
          </Keeper>
          <FishPile position={[-0.45, 0.52, 14.1]} n={22} seed={19} />
          <FishPile position={[-0.1, 0.52, 13.3]} n={16} seed={23} />
          <Bucket position={[-0.95, 1.0, 13.9]} />
          <Bucket position={[-0.85, 1.0, 14.8]} />
        </>
      ),
    },
    {
      cue: "17.save",
      ...cam.push({ on: [0.0, 1.3, 10.8], dist: 7.4, to: 6.2, yaw: 22, pitch: 6, fov: 52, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "3/4 front-side framing: Hero turns gratefully toward drenched varied-robe townsfolk and separated Healer on jetty.",
      stage: (t) => (
        <>
          <Hero position={[0.25, 0.5, 12.5]} rotationY={EAST - 0.35} animation={t < 0.9 ? "talk" : "cheer"} lookAt={[-0.4, 1.3, 9.8]} face={t < 0.9 ? "hurt" : "calm"} time={t} />
          <Friend position={[-0.6, 0.5, 10.6]} rotationY={SOUTH + 0.25} animation="cheer" face="smile" time={t} />
          <Healer position={[0.15, 0.5, 9.6]} rotationY={SOUTH - 0.15} hmm={0.3} />
          {JETTY_CROWD.slice(0, 5).map(([x, z], i) => (
            <Villager key={i} position={[x, 0.5, z]} rotationY={SOUTH} robe={TOWN_ROBES[i % TOWN_ROBES.length]} kid={i % 3 === 0} />
          ))}
        </>
      ),
    },
  ],
});

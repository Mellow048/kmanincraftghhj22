import { cam, storyScene, walkSegment } from "../../engine";
import { Coin, EAST, FishPile, FishingVillager, Hero, RichKid, SOUTH, Villager, WEST, ease, ramp, tw, timing } from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A good life, wet",
  shots: [
    {
      cue: "4.good",
      ...cam.orbit({ on: [0, 1.25, 9.6], dist: 6.4, distTo: 4.6, yaw: -22, yawTo: 22, pitch: 8, fov: 46, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Golden afternoon jetty buzzing with movement: Hero walks forward laughing toward camera past kid fisherman and neighbor.",
      stage: (t) => {
        const sway = Math.sin(t * 3.5);
        return (
          <>
            <Hero position={[0, 0.5, 8.8 + t * 0.9]} rotationY={SOUTH - 0.15} animation="walk" animDistance={t * 1.0} face="laugh" time={t * 1.4} />
            <FishPile position={[0.7, 0.52, 9.0]} n={11} seed={3} />
            <Villager position={[-1.0, 0.5, 8.0 + t * 0.8]} rotationY={SOUTH} hmm={0.4 + 0.2 * sway} walk={t * 0.8} />
            <FishingVillager position={[0.9, 0.5, 10.6]} rotationY={EAST} strain={0.3 + 0.2 * sway} bend={0.32 + sway * 0.14} kid />
          </>
        );
      },
    },
    {
      cue: "4.care",
      ...cam.crane({ on: [0, 1.4, 9.6], onTo: [2.8, 2.8, 7.6], dist: 5.2, toDist: 4.6, yaw: 24, fromPitch: 4, toPitch: 12, fov: 46 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Camera cranes up from townsfolk on jetty onto the nearby stone harbor overlook where two rich kids strut right above the dock.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.3));
        const kidWalk = walkSegment([2.2, 2.0, 7.2], [3.5, 2.0, 7.2], t, 0, 1.3, { endYaw: SOUTH - 0.4 });
        return (
          <>
            <Hero position={[0, 0.5, 9.8]} rotationY={SOUTH - 0.25} animation="lookAround" headPitch={-0.3} face="neutral" lookAt={[2.8, 3.0, 7.6]} time={t} />
            <Villager position={[-1.1, 0.5, 9.2]} rotationY={SOUTH + 0.2} hmm={0.3 + turn * 0.2} />
            <RichKid {...kidWalk} face="blank" time={t} />
            <RichKid position={[2.4, 2.0, 8.2]} rotationY={SOUTH - 0.4} animation="shrug" face="blank" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.coin",
      ...cam.push({ on: [1.0, 1.6, 8.8], dist: 5.6, to: 4.2, yaw: -16, pitch: 8, fov: 46, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Standing right above on the stone harbor overlook, the RichKid tosses a spinning gold coin 2.5m down onto the jetty planks in front of startled Hero.",
      stage: (t) => {
        const fall = Math.min(1, t / 1.25);
        const y = 3.0 - fall * fall * 2.4;
        const x = 2.1 - fall * 1.9;
        const z = 8.2 + fall * 1.2;
        return (
          <>
            <Coin position={[x, Math.max(0.56, y), z]} spin={t * 10} />
            <Hero position={[-0.2, 0.5, 9.8]} rotationY={EAST - 0.3} animation={t > 1.0 ? "cower" : "lookAround"} face={t > 1.0 ? "surprised" : "neutral"} headPitch={t > 1.0 ? 0.35 : -0.25} lookAt={[x, Math.max(0.55, y), z]} time={t} />
            <RichKid position={[2.3, 2.0, 8.1]} rotationY={WEST + 0.4} animation={t < 0.7 ? "reach" : "laugh"} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.want",
      ...cam.push({ on: [0, 1.45, 9.8], dist: 4.0, to: 2.6, yaw: 152, pitch: -2, fov: 40, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Front-3/4 push onto Hero standing solidly on jetty clenching fists with serious determination.",
      stage: (t) => {
        const resolve = tw(t, 0.35, 1.0);
        return (
          <Hero position={[0, 0.5, 9.8]} rotationY={SOUTH - 0.25} animation={resolve > 0.5 ? "point" : "idle"} headPitch={-0.15} face={resolve > 0.5 ? "brave" : "uneasy"} time={t} />
        );
      },
    },
  ],
});

import { cam, storyScene, walkSegment } from "../../engine";
import { Coin, EAST, FishPile, FishingVillager, Hero, RichKid, SOUTH, TOWN_ROBES, Villager, WEST, ease, ramp, tw, timing } from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A good life, wet",
  shots: [
    {
      cue: "4.good",
      ...cam.orbit({ on: [0, 1.25, 9.6], dist: 7.0, distTo: 5.6, yaw: -18, yawTo: 18, pitch: 8, fov: 50, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Golden afternoon jetty: Hero walks forward laughing toward camera past varied-robe kid fisherman and neighbor.",
      stage: (t) => {
        const sway = Math.sin(t * 3.5);
        const heroWalk = walkSegment([0, 0.5, 8.8], [0, 0.5, 10.1], t, 0, 1.4, { endYaw: SOUTH - 0.15 });
        const vWalk = walkSegment([-0.9, 0.5, 8.0], [-0.9, 0.5, 9.2], t, 0, 1.4, { endYaw: SOUTH });
        return (
          <>
            <Hero {...heroWalk} face="laugh" time={t * 1.4} />
            <FishPile position={[0.7, 0.52, 9.0]} n={11} seed={3} />
            <Villager position={vWalk.position} rotationY={vWalk.rotationY} robe={TOWN_ROBES[0]} walk={vWalk.animDistance} />
            <FishingVillager position={[0.85, 0.5, 10.6]} rotationY={EAST} robe={TOWN_ROBES[1]} bend={0.32 + sway * 0.14} kid />
          </>
        );
      },
    },
    {
      cue: "4.care",
      ...cam.crane({ on: [0, 1.4, 9.6], onTo: [5.0, 2.8, 5.0], dist: 5.2, toDist: 4.8, yaw: 24, fromPitch: 4, toPitch: 12, fov: 48 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Camera cranes up from townsfolk on jetty onto the stone harbor overlook where two rich kids strut above the dock.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.3));
        const kidWalk = walkSegment([4.4, 2.0, 4.6], [5.7, 2.0, 4.6], t, 0, 1.3, { endYaw: SOUTH - 0.4 });
        return (
          <>
            <Hero position={[0, 0.5, 9.8]} rotationY={SOUTH - 0.25} animation="lookAround" face="neutral" lookAt={[5.0, 3.0, 5.0]} time={t} />
            <Villager position={[-0.95, 0.5, 9.2]} rotationY={SOUTH + 0.2} robe={TOWN_ROBES[2]} hmm={0.3 + turn * 0.2} />
            <RichKid {...kidWalk} face="blank" time={t} />
            <RichKid position={[4.6, 2.0, 5.6]} rotationY={SOUTH - 0.4} animation="shrug" face="blank" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.coin",
      ...cam.push({ on: [1.8, 1.6, 7.8], dist: 10.6, to: 9.4, yaw: -4, pitch: 8, fov: 56, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "From the harbor overlook, RichKid tosses a spinning gold coin down onto the jetty planks in front of startled Hero.",
      stage: (t) => {
        const fall = Math.min(1, t / 1.25);
        const y = 3.0 - fall * fall * 2.4;
        const x = 4.3 - fall * 4.0;
        const z = 5.6 + fall * 3.8;
        return (
          <>
            <Coin position={[x, Math.max(0.56, y), z]} spin={t * 10} />
            <Hero position={[-0.2, 0.5, 9.8]} rotationY={EAST - 0.3} animation={t > 1.0 ? "cower" : "lookAround"} plantFeet face={t > 1.0 ? "surprised" : "neutral"} lookAt={[x, Math.max(0.55, y), z]} time={t} />
            <RichKid position={[4.5, 2.0, 5.5]} rotationY={WEST + 0.4} animation={t < 0.7 ? "reach" : "laugh"} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.want",
      ...cam.push({ on: [0, 1.45, 9.8], dist: 4.0, to: 2.6, yaw: -22, pitch: 2, fov: 40, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Frontal 3/4 push onto Hero standing solidly on jetty with determined look upward.",
      stage: (t) => {
        const resolve = tw(t, 0.35, 1.0);
        return (
          <Hero position={[0, 0.5, 9.8]} rotationY={SOUTH - 0.25} animation={resolve > 0.5 ? "idle" : "talk"} headPitch={-0.18} face={resolve > 0.5 ? "brave" : "uneasy"} time={t} />
        );
      },
    },
  ],
});

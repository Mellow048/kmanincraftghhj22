import { cam, storyScene, walkSegment } from "../../engine";
import { Bucket, EAST, FishPile, FishingHero, FishingVillager, Gate, Guard, Hero, NORTH, RichKid, SOUTH, TOWN_ROBES, Villager, WEST, ease, ramp, rich, stepPos, timing } from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Nine thousand",
  shots: [
    {
      cue: "2.fish",
      ...cam.truck({ on: [-0.15, 1.15, 9.0], by: [0.4, 0, -0.5], dist: 7.4, yaw: -20, pitch: 8, fov: 54, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Dawn jetty bustle: Hero hauls leaping fish out of open water into bucket resting cleanly on planks while neighbor fishes in distinct blue robe.",
      stage: (t) => {
        const pull = ease(ramp(t, 0, 1.6));
        const wave = Math.sin(t * 5);
        return (
          <>
            <FishingHero
              position={[-0.2, 0.5, 9.4]}
              rotationY={EAST - 0.25}
              bend={0.4 + wave * 0.22}
              face="brave"
              headPitch={0.18 - pull * 0.12}
              time={t * 1.2}
            />
            <Bucket position={[0.65, 1.0, 9.5]} swing={wave * 0.22} />
            <FishPile position={[1.55 - pull * 0.85, 0.25 + Math.sin(pull * Math.PI) * 1.15, 9.45]} n={5} seed={2} />
            <FishingVillager position={[-0.95, 0.5, 7.9]} rotationY={WEST} robe={TOWN_ROBES[0]} bend={0.35 + wave * 0.14} />
          </>
        );
      },
    },
    {
      cue: "2.steps",
      ...cam.crane({ on: [0, 1.8, -10.2], onTo: rich(-0.8, 3.0, 0.8), dist: 5.4, toDist: 10.5, yaw: -16, fromPitch: 4, toPitch: -8, fov: 48 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Armored Guard blocks the unified Mountain Entrance Gate at the foot, then camera cranes up past the winding staircase to the towering RichMansion at y=62m.",
      stage: (t) => {
        const kidWalk = walkSegment(rich(0.95, 0, 3.6), rich(0.05, 0, 3.6), t, 0, 1.8);
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={0} />
            <Guard position={[0, 0, -9.8]} rotationY={SOUTH} animation="guard" face="blank" time={t} />
            <RichKid position={rich(-1.1, 0, 3.6)} rotationY={SOUTH} animation="cheer" face="laugh" time={t * 1.3} />
            <RichKid {...kidWalk} face="grin" time={t * 1.2} />
          </>
        );
      },
    },
    {
      cue: "2.dad",
      ...cam.truck({ on: [stepPos(2.2)[0], stepPos(2.2)[1] + 0.9, stepPos(2.2)[2]], by: [0, 0.9, -1.5], dist: 6.8, yaw: 68, pitch: 18, fov: 52, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Side-front 3/4 tracking climb: Dad and Hero climb with feet flush atop the stone mountain staircase.",
      stage: (t) => {
        const climb = ease(ramp(t, 0, 1.2));
        const dadPos = stepPos(2.6 + climb * 2.0);
        const heroPos = stepPos(0.8 + climb * 1.8);
        return (
          <>
            <Villager position={dadPos} rotationY={NORTH} robe={TOWN_ROBES[3]} hmm={0.22 + 0.12 * Math.sin(t * 4)} walk={climb * 1.8} hat="straw" />
            <Hero position={heroPos} rotationY={NORTH} animation={climb < 0.96 ? "walk" : "idle"} animDistance={climb * 1.6} face="uneasy" headPitch={-0.18} time={t * 1.4} />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.orbit({ on: [stepPos(3.2)[0], stepPos(3.2)[1] + 0.85, stepPos(3.2)[2]], dist: 7.4, distTo: 6.8, yaw: 44, yawTo: 58, pitch: 10, fov: 54, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Hero stops with feet squarely on stone step facing side-front toward camera and shrugs as Dad climbs higher behind.",
      stage: (t) => {
        const ask = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={stepPos(2.2)} rotationY={EAST - 0.35} animation="shrug" face={t > 1.0 ? "frown" : "uneasy"} headPitch={-0.12} time={t * 1.3} />
            <Villager position={stepPos(3.8 + ask * 1.4)} rotationY={NORTH} robe={TOWN_ROBES[3]} walk={ask * 1.2} hat="straw" />
          </>
        );
      },
    },
  ],
});

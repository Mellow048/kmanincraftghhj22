import { cam, storyScene, walkSegment } from "../../engine";
import { EAST, FishPile, FishingHero, FishingVillager, Gate, Guard, Hero, NORTH, RichKid, SOUTH, Villager, WEST, ease, ramp, stepPos, timing } from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Nine thousand",
  shots: [
    {
      cue: "2.fish",
      ...cam.truck({ on: [-0.2, 1.15, 9.2], by: [0.85, 0, -1.2], dist: 5.0, yaw: -24, pitch: 8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Dawn jetty bustle: Hero holds fishing rod cleanly in hand hauling leaping fish out of shimmering water while neighbor fishes beside him.",
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
            <FishPile position={[1.7, 0.25 + pull * 0.85, 9.2]} n={5} seed={2} />
            <FishingVillager position={[-1.1, 0.5, 7.9]} rotationY={WEST} strain={0.4 + 0.3 * Math.abs(wave)} bend={0.35 + wave * 0.14} />
          </>
        );
      },
    },
    {
      cue: "2.steps",
      ...cam.crane({ on: [0, 1.8, -10.2], onTo: [4.8, 9.2, -29.5], dist: 5.4, toDist: 8.6, yaw: -16, fromPitch: 4, toPitch: -6, fov: 48 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Armored Guard blocks the Mountain Entrance Gate (lifetime fee) at the foot, then camera rockets up the long winding mountain staircase revealing the rich living in the sunlit Quartz & Gold Mansion at the summit.",
      stage: (t) => {
        const kidWalk = walkSegment([7.0, 5.85, -28.8], [5.8, 5.85, -28.8], t, 0, 1.8);
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={0} />
            <Guard position={[0, 0, -9.8]} rotationY={SOUTH} animation="guard" face="blank" time={t} />
            <RichKid position={[5.4, 5.85, -28.8]} rotationY={SOUTH} animation="cheer" face="laugh" time={t * 1.3} />
            <RichKid {...kidWalk} face="grin" time={t * 1.2} />
          </>
        );
      },
    },
    {
      cue: "2.dad",
      ...cam.truck({ on: stepPos(2.0), by: [0, 0.8, -1.6], dist: 4.8, yaw: 68, pitch: 8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Open side-profile tracking climb: Dad and Hero climb with feet flush atop the stone mountain staircase.",
      stage: (t) => {
        const climb = ease(ramp(t, 0, 1.2));
        const dadPos = stepPos(2.6 + climb * 2.0);
        const heroPos = stepPos(0.8 + climb * 1.8);
        return (
          <>
            <Villager position={dadPos} rotationY={NORTH} strain={0.35 + 0.25 * Math.sin(t * 5)} walk={climb * 1.8} hat="straw" />
            <Hero position={heroPos} rotationY={NORTH} animation={climb < 0.96 ? "walk" : "idle"} animDistance={climb * 1.6} face="uneasy" headPitch={-0.18} time={t * 1.4} />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.orbit({ on: stepPos(2.2), dist: 4.6, distTo: 3.4, yaw: 58, yawTo: 84, pitch: 6, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Hero stops with feet squarely on stone step facing side-front toward camera and shrugs as Dad climbs higher behind.",
      stage: (t) => {
        const ask = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={stepPos(2.2)} rotationY={EAST - 0.35} animation="shrug" face={t > 1.0 ? "frown" : "uneasy"} headPitch={-0.12} time={t * 1.3} />
            <Villager position={stepPos(4.5 + ask * 2.0)} rotationY={NORTH} walk={ask * 1.7} hat="straw" />
          </>
        );
      },
    },
  ],
});

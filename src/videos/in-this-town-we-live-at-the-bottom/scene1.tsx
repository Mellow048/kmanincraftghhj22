import { around, cam, storyScene, walkSegment } from "../../engine";
import type { Vec3 } from "../../engine";
import { Boat, EAST, FishingHero, FishingVillager, Gate, Hero, RichKid, SOUTH, TOWN_ROBES, Villager, WEST, ease, ramp, rich, timing } from "./kit";

const TOWN_START_TARGET: Vec3 = [-0.1, 1.35, 9.6];
const TOWN_END_TARGET: Vec3 = [0.2, 23.8, -24.0];
const TOWN_END_POS: Vec3 = around(TOWN_END_TARGET, 44, 8, -18);

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "We live at the bottom",
  shots: [
    {
      cue: "1.town",
      ...cam.crane({
        on: TOWN_START_TARGET,
        onTo: TOWN_END_TARGET,
        dist: 3.8,
        toDist: 44,
        yaw: 8,
        fromPitch: 6,
        toPitch: -18,
        fov: 46,
        screenOffset: [0, 0.02],
        ease: "inOutSine",
      }),
      fovTo: 62,
      zone: "bottom",
      look: "overworld-day",
      note: "North-facing hook: opens tight on smiling Hero casting into water on jetty, pulling wide and tilting up to frame town huts, mountain gate, and colossal Eiffel-scale mountain + snow peak + RichMansion rising above the clouds.",
      stage: (t) => {
        const tug = Math.sin(t * 4.5);
        const heroWalk = walkSegment([-0.5, 0.5, 9.45], [0.15, 0.5, 9.65], t, 0, 0.9, { endYaw: EAST - 0.3 });
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={0} />
            <FishingHero
              {...heroWalk}
              bend={0.32 + tug * 0.2}
              headPitch={0.04 - tug * 0.08}
              face="smile"
              time={t * 1.2}
            />
            <FishingVillager position={[-0.9, 0.5, 8.1]} rotationY={WEST + 0.15} robe={TOWN_ROBES[0]} bend={0.3 + Math.sin(t * 4) * 0.15} phase={0.7} />
            <FishingVillager position={[0.9, 0.5, 7.2]} rotationY={EAST - 0.1} robe={TOWN_ROBES[1]} bend={0.35 + Math.cos(t * 3.5) * 0.15} phase={1.4} />
            <Boat position={[3.7, Math.sin(t * 2.8) * 0.05, 11.8]} rotationY={0.22 + Math.sin(t * 2.2) * 0.05} bail={0.35 + 0.3 * Math.sin(t * 5)} />
          </>
        );
      },
    },
    {
      cue: "1.above",
      from: TOWN_END_POS,
      path: [TOWN_END_POS, [3.8, 28, -12], rich(-1.2, 4.4, 10.5), rich(1.6, 3.6, 8.4)],
      target: TOWN_END_TARGET,
      targetPath: [TOWN_END_TARGET, [3.5, 36, -34], rich(0, 2.8, 0.5), rich(0, 2.4, 0.2)],
      fov: 62,
      fovTo: 48,
      screenOffset: [0, 0.02],
      ease: "inOutCubic",
      zone: "bottom",
      look: "overworld-day",
      note: "Continuous ascent from 1.town's exact end transform, soaring up the sheer mountain cliff above the lower cloud deck onto the sunlit Quartz & Gold palace terrace at y=62m.",
      stage: (t) => {
        const stroll = ease(ramp(t, 0, 1.35));
        const kidWalk = walkSegment(rich(-1.4, 0, 3.6), rich(-0.55, 0, 3.6), t, 0, 1.35, { endYaw: 0.4 });
        return (
          <>
            <RichKid {...kidWalk} face="grin" time={t * 1.2} />
            <RichKid position={rich(1.05, 0, 3.6)} rotationY={-0.35} animation="cheer" face="laugh" time={t * 1.4} />
            <Villager position={rich(0.25, 0, 2.0 + stroll * 0.8)} rotationY={0.1} walk={stroll * 0.8} robe="#f4f2ea" hat="wide" />
          </>
        );
      },
    },
    {
      cue: "1.going",
      ...cam.orbit({ on: [0, 1.4, 9.8], dist: 3.4, distTo: 2.35, yaw: -22, yawTo: 18, pitch: 2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Frontal 3/4 view: Hero strides forward along the jetty toward the lens with determined expression looking up at the towering peak.",
      stage: (t) => {
        const walk = walkSegment([0, 0.5, 8.8], [0, 0.5, 10.1], t, 0, 1.25, { endYaw: SOUTH + 0.15 });
        return (
          <Hero
            {...walk}
            headPitch={-0.16}
            face="brave"
            time={t * 1.2}
          />
        );
      },
    },
  ],
});

import { cam, storyScene, walkSegment } from "../../engine";
import { Boat, EAST, FishingHero, Hero, NORTH, RichKid, Rod, SOUTH, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "We live at the bottom",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 1.45, 9.2], onTo: [0.1, 2.2, 6.2], dist: 2.35, to: 6.1, yaw: 162, pitch: -4, fov: 46, screenOffset: [0, 0.05] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front-facing hook zooming OUT: opens tight on Hero's smiling face holding fishing rod on the jetty, pulling wide to reveal villagers, oak Boat, and the towering sunlit Quartz & Gold Mansion crowning the mountain behind.",
      stage: (t) => {
        const tug = Math.sin(t * 4.5);
        const heroWalk = walkSegment([-0.15, 0.5, 10.6], [-0.15, 0.5, 9.2], t, 0, 1.35, { endYaw: 0.25 });
        return (
          <>
            <FishingHero
              {...heroWalk}
              bend={0.32 + tug * 0.2}
              headPitch={0.05 - tug * 0.08}
              face="smile"
              time={t * 1.2}
            />
            <Villager position={[-1.0, 0.5, 8.1]} rotationY={WEST + 0.3} walk={0} strain={0.35 + 0.25 * Math.sin(t * 4)} />
            <Rod position={[-1.2, 0.98, 8.1]} rotationY={WEST + 0.3} bend={0.3 + Math.sin(t * 4) * 0.15} />
            <Villager position={[0.9, 0.5, 7.2]} rotationY={EAST} walk={0} strain={0.4 + 0.25 * Math.cos(t * 3.5)} />
            <Rod position={[1.15, 0.98, 7.2]} rotationY={EAST} bend={0.35 + Math.cos(t * 3.5) * 0.15} />
            <Boat position={[2.75, Math.sin(t * 2.8) * 0.05, 10.8]} rotationY={0.22 + Math.sin(t * 2.2) * 0.05} bail={0.35 + 0.3 * Math.sin(t * 5)} />
          </>
        );
      },
    },
    {
      cue: "1.above",
      ...cam.orbit({ on: [6.4, 8.8, -32.7], dist: 10.8, distTo: 9.8, yaw: -13, yawTo: 13, pitch: -6, pitchTo: -3, fov: 52 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Wealth proof: low upward orbit (26 deg, 1.0m push) across the sunlit Quartz & Gold palace — a projecting gold-trimmed entrance bay, two floors of lit arched windows, cornices and a knee-high gold balustrade — as a RichKid struts across the carpet beside his cheering friend and robed servant.",
      stage: (t) => {
        const stroll = ease(ramp(t, 0, 1.35));
        const kidWalk = walkSegment([5.0, 5.85, -28.8], [6.05, 5.85, -28.8], t, 0, 1.35, { yaw: 0.4 });
        return (
          <>
            <RichKid {...kidWalk} face="grin" time={t * 1.2} />
            <RichKid position={[7.25, 5.85, -28.85]} rotationY={-0.35} animation="cheer" face="laugh" time={t * 1.4} />
            <Villager position={[6.55, 5.85, -30.5 + stroll * 1.0]} rotationY={0.1} walk={stroll * 1.0} robe="#f4f2ea" hat="wide" />
          </>
        );
      },
    },
    {
      cue: "1.going",
      ...cam.orbit({ on: [0, 1.45, 9.8], dist: 3.4, distTo: 2.35, yaw: 168, yawTo: 146, pitch: 2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Front view: Hero strides forward along the jetty with a serious, determined expression, clenching his fist as camera orbits tightly across his face.",
      stage: (t) => {
        const walk = walkSegment([0, 0.5, 8.8], [0, 0.5, 10.1], t, 0, 1.35, { endYaw: SOUTH + 0.15 });
        return (
          <Hero
            {...walk}
            animation={t > 1.05 ? "point" : "walk"}
            headPitch={-0.06}
            face="brave"
            time={t * 1.2}
          />
        );
      },
    },
  ],
});

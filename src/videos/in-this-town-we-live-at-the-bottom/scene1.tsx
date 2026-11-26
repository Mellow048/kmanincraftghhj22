import { cam, storyScene, walkSegment } from "../../engine";
import { Boat, EAST, Hero, NORTH, RichKid, Rod, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "We live at the bottom",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 1.9, 9.4], onTo: [0.2, 2.3, 6.8], dist: 6.4, to: 3.9, yaw: -16, pitch: -8, fov: 46 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Bright foreground hook: Hero steps briskly along wet plank jetty hauling a flexing fishing rod over shimmering water beside oak Boat while sunlit Quartz & Gold Mansion crowns the towering mountain behind.",
      stage: (t) => {
        const tug = Math.sin(t * 4.5);
        const heroWalk = walkSegment([-0.25, 0.5, 11.0], [-0.25, 0.5, 9.4], t, 0, 1.35, { endYaw: EAST - 0.3 });
        return (
          <>
            <Hero
              {...heroWalk}
              headPitch={0.12 - tug * 0.14}
              face="smile"
              time={t * 1.2}
            />
            <Rod position={[heroWalk.position[0] + 0.3 * Math.sin(heroWalk.rotationY), 1.02, heroWalk.position[2] + 0.3 * Math.cos(heroWalk.rotationY)]} rotationY={heroWalk.rotationY} bend={0.32 + tug * 0.22} />
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
      ...cam.crane({ on: [0, 1.5, 10.2], onTo: [0, 2.2, 8.6], dist: 4.5, toDist: 2.85, yaw: -32, fromPitch: 6, toPitch: -18, fov: 44 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Hero lowers rod, strides determinedly down planks toward mountain foot, and points straight skyward at glowing sunlit Mansion as camera swoops up behind him.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.4));
        const z = 10.8 - step * 1.55;
        return (
          <>
            <Hero
              position={[0, 0.5, z]}
              rotationY={NORTH + 0.18}
              animation={step < 0.55 ? "walk" : "point"}
              animDistance={step * 1.6}
              headPitch={-0.48}
              face={t > 0.9 ? "brave" : "smile"}
              lookAt={[6.4, 11.4, -33]}
              time={t}
            />
            <Rod position={[0.35, 0.95 - step * 0.25, z - 0.1]} rotationY={EAST - 0.2} bend={0.55 - step * 0.3} />
          </>
        );
      },
    },
  ],
});

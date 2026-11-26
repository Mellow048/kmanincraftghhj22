import { cam, storyScene } from "../../engine";
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
        const pull = ease(ramp(t, 0, 1.6));
        const tug = Math.sin(t * 4.5);
        return (
          <>
            <Hero
              position={[-0.25, 0.5, 10.6 - pull * 1.15]}
              rotationY={EAST - 0.3}
              animation={pull < 0.55 ? "walk" : "push"}
              animDistance={pull * 1.3}
              headPitch={0.12 - tug * 0.14}
              face="smile"
              time={t * 1.2}
            />
            <Rod position={[0.05, 1.02, 10.6 - pull * 1.15]} rotationY={EAST - 0.3} bend={0.32 + tug * 0.22} />
            <Villager position={[-1.0, 0.5, 8.1 + Math.sin(t * 2.5) * 0.25]} rotationY={WEST + 0.3} walk={t * 1.1} strain={0.35 + 0.25 * Math.sin(t * 4)} />
            <Rod position={[-1.2, 0.98, 8.1 + Math.sin(t * 2.5) * 0.25]} rotationY={WEST + 0.3} bend={0.3 + Math.sin(t * 4) * 0.15} />
            <Villager position={[0.9, 0.5, 7.6 - t * 0.35]} rotationY={EAST} walk={t * 1.2} strain={0.4} />
            <Rod position={[1.15, 0.98, 7.6 - t * 0.35]} rotationY={EAST} bend={0.35 + Math.cos(t * 3.5) * 0.15} />
            <Boat position={[2.75, Math.sin(t * 2.8) * 0.05, 10.8]} rotationY={0.22 + Math.sin(t * 2.2) * 0.05} bail={0.35 + 0.3 * Math.sin(t * 5)} />
          </>
        );
      },
    },
    {
      cue: "1.above",
      ...cam.orbit({ on: [6.4, 7.4, -31.8], dist: 8.8, distTo: 6.1, yaw: -28, yawTo: 24, pitch: -4, fov: 44 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Grand Quartz & Gold Cliffside Mansion gleams in sunlight behind marble balustrade terrace as smug RichKids strut boldly and wave down toward the shadowed town.",
      stage: (t) => {
        const stroll = ease(ramp(t, 0, 1.35));
        return (
          <>
            <RichKid position={[4.5 + stroll * 1.5, 5.85, -30.2]} rotationY={0.35} animation="walk" animDistance={stroll * 1.5} face="grin" time={t * 1.2} />
            <RichKid position={[8.2 - stroll * 1.1, 5.85, -30.1]} rotationY={-0.35} animation="cheer" face="laugh" time={t * 1.4} />
            <Villager position={[6.4, 5.85, -31.2 + stroll * 0.85]} rotationY={0.12} walk={stroll * 1.1} robe="#f4f2ea" hat="wide" />
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
              lookAt={[6.4, 10, -32]}
              time={t}
            />
            <Rod position={[0.35, 0.95 - step * 0.25, z - 0.1]} rotationY={EAST - 0.2} bend={0.55 - step * 0.3} />
          </>
        );
      },
    },
  ],
});

import { cam, storyScene } from "../../engine";
import { Boat, Hero, Line, NORTH, RichKid, Rod, Villager, ease, ramp, timing } from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "We live at the bottom",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 2.2, 9.2], onTo: [0, 2.8, 7.6], dist: 22, to: 13.5, yaw: 6, pitch: 8, fov: 48, screenOffset: [0, 0.06] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "Hero shifts weight tugging his rod along wet jetty while three neighbours cast and haul beside the mountain shadow.",
      stage: (t) => {
        const tug = Math.sin(t * 2.8);
        return (
          <>
            <Hero position={[0, 0.5, 10 - ease(ramp(t, 0, 1.8)) * 0.35]} rotationY={NORTH} animation="reach" headPitch={0.15 - tug * 0.1} face="smile" time={t} />
            <Rod position={[0.35, 0.95, 9.8]} rotationY={0.1} bend={0.3 + tug * 0.14} />
            <Line position={[0.5, 0.9, 8.6]} length={1.2} bob={tug * 0.06} />
            {[[-1.4, 7.6], [1.5, 8.4], [-1.2, 11.2]].map(([x, z], i) => (
              <group key={i}>
                <Villager position={[x, 0.5, z + Math.sin(t * 1.8 + i) * 0.15]} rotationY={NORTH} walk={t * 0.7 + i} strain={0.3 + 0.2 * Math.sin(t * 3 + i)} lookAt={[0, 0.6, z + 3]} />
                <Rod position={[x + 0.3, 0.95, z - 0.1]} rotationY={0.2 * (i - 1)} bend={0.25 + Math.sin(t * 3 + i) * 0.08} />
              </group>
            ))}
            <Boat position={[3.1, Math.sin(t * 2.1) * 0.04, 12.4]} rotationY={0.15} bail={0.3 + 0.2 * Math.sin(t * 4)} />
          </>
        );
      },
    },
    {
      cue: "1.above",
      ...cam.orbit({ on: [6.4, 6.4, -31.5], dist: 8.5, distTo: 6.2, yaw: -22, yawTo: 18, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Rich kids strut and wave carelessly across sunlit stone ledge high above the shadowed fishing town.",
      stage: (t) => {
        const stroll = ease(ramp(t, 0, 1.3));
        return (
          <>
            <RichKid position={[5.3 + stroll * 0.45, 5.85, -31.2]} rotationY={0.25} animation="walk" animDistance={stroll * 0.6} face="blank" time={t} />
            <RichKid position={[7.4, 5.85, -31.4]} rotationY={-0.3} animation="cheer" face="smug" time={t} />
            <Villager position={[6.5 - stroll * 0.2, 5.85, -32.0]} rotationY={0.1} walk={stroll * 0.5} robe="#f2f2ee" hat="none" />
          </>
        );
      },
    },
    {
      cue: "1.going",
      ...cam.orbit({ on: [0, 1.15, 9.6], dist: 4.5, distTo: 2.9, yaw: -38, yawTo: 14, pitch: 4, fov: 40, screenOffset: [0, 0.08] }),
      ease: "outSine" as const,
      zone: "bottom",
      look: "overworld-golden",
      note: "Hero lowers rod and steps determinedly onto plank edge looking straight up toward sunlit summit.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={[0, 0.5, 10.1 - step * 0.45]} rotationY={NORTH} animation={step < 0.5 ? "walk" : "point"} animDistance={step * 0.6} headPitch={-0.45} face={t > 1.0 ? "smile" : "neutral"} lookAt={[6, 12, -31]} time={t} />
            <Rod position={[0.35, 0.95 - step * 0.15, 9.9]} rotationY={0.1} bend={0.55 - step * 0.2} />
          </>
        );
      },
    },
  ],
});

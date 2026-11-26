import { cam, storyScene } from "../../engine";
import { Basket, Bucket, EAST, FishPile, Hero, Keeper, LANE_CROWD, NORTH, PLACE, SOUTH, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Once a year",
  shots: [
    {
      cue: "6.basket",
      ...cam.crane({ on: [0, 3.8, 15], onTo: [0, 1.0, 14.6], dist: 6.4, toDist: 4.8, yaw: 62, fromPitch: -6, toPitch: 12, fov: 46, screenOffset: [0, 0.06] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "Side-front crane beside descending wooden basket landing on wet jetty planks as Hero and villager look up amazed.",
      stage: (t) => {
        const drop = Math.min(1, t / 1.9);
        const y = 6.2 - drop * 5.7;
        return (
          <>
            <Basket position={[0, 0.5 + y, 15]} rope={y + 6} swing={Math.sin(t * 2.2) * 0.45} />
            <Hero position={[-0.6, 0.5, 13.0]} rotationY={EAST - 0.3} animation="lookAround" face="wow" headPitch={-0.35 + drop * 0.25} time={t} />
            <Villager position={[-1.3, 0.5, 12.3]} rotationY={EAST} walk={0} />
          </>
        );
      },
    },
    {
      cue: "6.coat",
      ...cam.push({ on: [0, 1.42, 14.4], dist: 4.8, to: 3.4, yaw: 158, pitch: 4, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front view: spotless white-coated Keeper steps out of basket marching toward camera.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.2));
        return (
          <Keeper position={[0, 0.5, 15.2 - step * 1.1]} rotationY={NORTH} animation={step < 0.7 ? "walk" : "point"} animDistance={step * 1.1} face="blank" headPitch={0.1} time={t} />
        );
      },
    },
    {
      cue: "6.touch",
      ...cam.orbit({ on: [0.1, 1.15, 13.6], dist: 4.1, distTo: 2.8, yaw: -32, yawTo: 16, pitch: 6, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Keeper recoils fast waving hands clear while villagers slide heavy fish bucket cleanly forward onto basket ledge.",
      stage: (t) => {
        const pass = ease(ramp(t, 0.1, 1.3));
        return (
          <>
            <Keeper position={[0.45 + pass * 0.3, 0.5, 14.8 + pass * 0.4]} rotationY={SOUTH} animation={pass > 0.35 ? "shrug" : "walk"} animDistance={pass * 0.45} face="blank" time={t} />
            <Villager position={[-0.9, 0.5, 13.4]} rotationY={NORTH} strain={0.4 + pass * 0.3} />
            <Villager position={[0.2, 0.5, 12.8]} rotationY={NORTH} kid />
            <Bucket position={[-0.35 + pass * 0.75, 1.0, 13.2 + pass * 0.8]} scale={0.9} />
            <FishPile position={[1.1, 0.55, 14.2]} n={6} seed={9} />
          </>
        );
      },
    },
    {
      cue: "6.straight",
      ...cam.truck({ on: [0.2, 1.25, 1.2], by: [0, 0, -2.6], dist: 5.8, yaw: 158, pitch: 8, fov: 46, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front view: camera trucks down wet village lane facing Keeper as lined townsfolk snap upright.",
      stage: (t) => (
        <>
          {LANE_CROWD.map(([x, z], i) => (
            <Villager key={i} position={[x, 0, z]} rotationY={i % 2 ? NORTH : SOUTH} strain={Math.max(0, 0.3 - t * 0.2)} kid={i % 3 === 0} />
          ))}
          <Keeper position={[0.4, 0, 1.9 - t * 1.4]} rotationY={NORTH} animation="walk" animDistance={t * 1.8} face="blank" />
          <Hero position={[2.2, 0, -1.4]} rotationY={WEST} animation="cower" face="uneasy" time={t} />
        </>
      ),
    },
  ],
});

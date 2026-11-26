import { cam, storyScene } from "../../engine";
import { Basket, Bucket, FishPile, Hero, Keeper, LANE_CROWD, NORTH, PLACE, SOUTH, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Once a year",
  shots: [
    {
      cue: "6.basket",
      ...cam.crane({ on: [0, 3.8, 15], onTo: [0, 1.0, 14.6], dist: 6.2, toDist: 4.4, yaw: 12, fromPitch: -6, toPitch: 12, fov: 44, screenOffset: [0, 0.06] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "Camera cranes smoothly down beside descending wooden basket landing on wet jetty planks as villagers step back.",
      stage: (t) => {
        const drop = Math.min(1, t / 1.9);
        const y = 6.2 - drop * 5.7;
        return (
          <>
            <Basket position={[0, 0.5 + y, 15]} rope={y + 6} swing={Math.sin(t * 2.2) * 0.45} />
            <Hero position={[0, 0.5, 12.4 + drop * 0.3]} rotationY={NORTH} animation="lookAround" face="wow" headPitch={-0.4 + drop * 0.3} lookAt={[0, y + 0.5, 15]} time={t} />
            <Villager position={[-1.1, 0.5, 12.0 + drop * 0.2]} rotationY={NORTH} walk={drop * 0.4} lookAt={[0, y + 0.5, 15]} />
          </>
        );
      },
    },
    {
      cue: "6.coat",
      ...cam.push({ on: [0, 1.42, 14.6], dist: 4.1, to: 2.45, yaw: 14, pitch: 4, fov: 36, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Spotless white-coated Keeper steps smoothly forward out of basket brushing wet sleeve away.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.2));
        return (
          <Keeper position={[0, 0.5, 15.2 - step * 0.65]} rotationY={SOUTH} animation={step < 0.7 ? "walk" : "point"} animDistance={step * 0.75} face="blank" headPitch={0.1} time={t} />
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
            <Villager position={[-0.9, 0.5, 13.4]} rotationY={NORTH} strain={0.4 + pass * 0.3} walk={pass * 0.3} />
            <Villager position={[0.2, 0.5, 12.8]} rotationY={NORTH} kid />
            <Bucket position={[-0.35 + pass * 0.75, 1.0, 13.2 + pass * 0.8]} scale={0.9} />
            <FishPile position={[1.1, 0.55, 14.2]} n={6} seed={9} />
          </>
        );
      },
    },
    {
      cue: "6.straight",
      ...cam.truck({ on: [0.2, 1.25, 1.2], by: [0, 0, -2.6], dist: 5.5, yaw: 16, pitch: 8, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Camera trucks down wet village lane ahead of white-coated Keeper while lined crowds snap upright.",
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

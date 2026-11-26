import { cam, storyScene, walkSegment } from "../../engine";
import { Basket, Bucket, EAST, FishPile, Hero, Keeper, LANE_CROWD, NORTH, SOUTH, TOWN_ROBES, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Once a year",
  shots: [
    {
      cue: "6.basket",
      ...cam.crane({ on: [-0.25, 3.6, 14.3], onTo: [-0.25, 1.2, 14.1], dist: 7.4, toDist: 6.2, yaw: 46, fromPitch: -4, toPitch: 12, fov: 50, screenOffset: [0, 0.06] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "Side-front crane beside descending hollow wooden basket landing on jetty planks as Hero and villager look up.",
      stage: (t) => {
        const drop = Math.min(1, t / 1.9);
        const y = 6.2 - drop * 5.7;
        return (
          <>
            <Basket position={[0, 0.5 + y, 15]} rope={16} swing={Math.sin(t * 2.2) * 0.45} />
            <Hero position={[-0.5, 0.5, 13.6]} rotationY={EAST - 0.3} animation="lookAround" face="wow" headPitch={-0.35 + drop * 0.25} time={t} />
            <Villager position={[-0.85, 0.5, 13.4]} rotationY={EAST - 0.2} robe={TOWN_ROBES[1]} walk={0} />
          </>
        );
      },
    },
    {
      cue: "6.coat",
      ...cam.push({ on: [0, 1.42, 13.8], dist: 5.6, to: 4.6, yaw: 158, pitch: 4, fov: 48, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front view: spotless white-coated Keeper marches clear in front of Basket on jetty toward camera.",
      stage: (t) => {
        const keeperWalk = walkSegment([0, 0.5, 14.3], [0, 0.5, 13.2], t, 0, 1.15, { endYaw: NORTH });
        return (
          <>
            <Basket position={[0, 0.5, 15.2]} rope={16} />
            <FishPile position={[0.55, 0.52, 14.3]} n={6} seed={5} />
            <Keeper {...keeperWalk} animation={t < 1.15 ? keeperWalk.animation : "idle"} face="blank" headPitch={0.1} time={t} />
          </>
        );
      },
    },
    {
      cue: "6.touch",
      ...cam.orbit({ on: [0.1, 1.25, 13.9], dist: 6.6, distTo: 5.4, yaw: -24, yawTo: 16, pitch: 6, fov: 48, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Keeper recoils cleanly clear of Basket walls while villagers face front-3/4 sliding grounded fish bucket forward toward basket.",
      stage: (t) => {
        const pass = ease(ramp(t, 0.1, 1.3));
        const keeperWalk = walkSegment([0.45, 0.5, 13.9], [0.75, 0.5, 14.25], t, 0.15, 0.9, { endYaw: SOUTH });
        return (
          <>
            <Basket position={[0, 0.5, 15.2]} rope={16} />
            <Keeper {...keeperWalk} animation={t > 0.9 ? "shrug" : keeperWalk.animation} face="blank" time={t} />
            <Villager position={[-0.75, 0.5, 13.2]} rotationY={EAST - 0.45} robe={TOWN_ROBES[0]} arms={{ r: -1.35, l: -1.35 }} />
            <Villager position={[0.2, 0.5, 12.5]} rotationY={SOUTH - 0.25} robe={TOWN_ROBES[1]} kid />
            <Bucket position={[-0.35 + pass * 0.45, 1.0, 13.6 + pass * 0.65]} scale={0.9} />
            <FishPile position={[-0.65, 0.52, 14.3]} n={6} seed={9} />
          </>
        );
      },
    },
    {
      cue: "6.straight",
      ...cam.truck({ on: [0.55, 1.25, 0.0], by: [0, 0, -2.0], dist: 7.4, yaw: 158, pitch: 8, fov: 50, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front view: camera trucks down wet village lane facing Keeper clear of jetty as varied-robe townsfolk watch.",
      stage: (t) => {
        const keeperWalk = walkSegment([0.4, 0, 0.7], [0.4, 0, -1.2], t, 0, 1.8, { endYaw: NORTH });
        return (
          <>
            {LANE_CROWD.map(([x, z], i) => (
              <Villager
                key={i}
                position={[x, 0, z]}
                rotationY={x < 0 ? EAST - 0.35 : WEST + 0.35}
                robe={TOWN_ROBES[i % TOWN_ROBES.length]}
                kid={i % 3 === 0}
                phase={i * 0.6}
              />
            ))}
            <Keeper {...keeperWalk} face="blank" time={t} />
            <Hero position={[1.65, 0, -1.4]} rotationY={WEST} animation="cower" plantFeet face="uneasy" time={t} />
          </>
        );
      },
    },
  ],
});

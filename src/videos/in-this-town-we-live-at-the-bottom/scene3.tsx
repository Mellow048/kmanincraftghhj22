import { cam, storyScene } from "../../engine";
import {
  Boat, Bucket, Coin, EAST, FishPile, Gate, Hero, Jar, Keeper, Line, Mum, NORTH, PLACE, PriceBoard, Rod, SOUTH,
  Stall, Villager, WEST, ease, ramp, top, timing,
} from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "One emerald a bucket",
  shots: [
    {
      cue: "3.rods",
      ...cam.crane({ on: [0, 1.0, 8.5], onTo: [0, 1.2, 5.5], dist: 16.5, toDist: 10.5, yaw: 14, fromPitch: 24, toPitch: 12, fov: 46, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Sweeping crane over wet town: Hero hauls fish bucket past boat while villagers hurry back toward market stall.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 11.0 - t * 1.1]} rotationY={NORTH} animation="walk" animDistance={t * 1.4} face="neutral" />
          <Boat position={[3.1, Math.sin(t * 2.5) * 0.05, 12.4]} rotationY={0.15} bail={0.3 + 0.3 * Math.sin(t * 4)} />
          <FishPile position={[-0.9, 0.5, 8.4]} n={9} />
          <Villager position={[-3.8, 0, -5.0 + t * 0.4]} rotationY={SOUTH} walk={t * 0.8} />
          <Villager position={[1.3, 0.5, 7.4 - t * 0.9]} rotationY={NORTH} walk={t * 1.1} />
        </>
      ),
    },
    {
      cue: "3.hole",
      ...cam.orbit({ on: [3.1, 0.55, 12.4], dist: 3.9, distTo: 2.5, yaw: -42, yawTo: 8, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Boat rocks steadily while sloshing water bail bucket swings overboard and Villager scoops desperately.",
      stage: (t) => (
        <>
          <Boat position={[3.1, Math.sin(t * 3.5) * 0.04, 12.4]} rotationY={0.15 + Math.sin(t * 2) * 0.06} bail={0.5 + 0.5 * Math.sin(t * 6)} />
          <Bucket position={[3.6, 0.55 + Math.abs(Math.sin(t * 5)) * 0.15, 13.2]} swing={1.5} scale={0.95} />
        </>
      ),
    },
    {
      cue: "3.rain",
      ...cam.orbit({ on: [0, 1.0, 8.2], dist: 10.8, distTo: 7.5, yaw: -14, yawTo: 24, pitch: 12, fov: 46, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Driving rain across jetty as Hero and crew haul heavily together along wet planks.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 9.6 - t * 0.25]} rotationY={NORTH} animation="push" face="grin" time={t * 1.5} />
          <Rod position={[0.4, 0.9, 9.5]} bend={0.45 + Math.sin(t * 8) * 0.12} />
          <Line position={[0.6, 0.8, 8.2]} length={1.3} bob={Math.sin(t * 9) * 0.09} />
          {[[-1.4, 8.2], [1.5, 8.6], [-1.1, 11.0]].map(([x, z], i) => (
            <group key={i}>
              <Villager position={[x, 0.5, z]} rotationY={NORTH} strain={0.5 + 0.25 * Math.sin(t * 5 + i)} walk={t * 0.6} lookAt={[x, 0, z - 2]} />
              <Rod position={[x + 0.3, 0.9, z - 0.1]} bend={0.4 + Math.sin(t * 7 + i) * 0.09} />
              <Line position={[x + 0.45, 0.8, z - 1.8]} length={1.1} bob={Math.sin(t * 7 + i) * 0.07} />
            </group>
          ))}
        </>
      ),
    },
    {
      cue: "3.stall",
      ...cam.push({ on: [-3.6, 1.1, -4.8], dist: 4.8, to: 3.1, yaw: 20, pitch: 6, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Hero walks to wooden stall counter sliding heavy fish bucket across while merchant hands back one coin.",
      stage: (t) => {
        const slide = ease(ramp(t, 0.15, 1.3));
        return (
          <>
            <Stall position={PLACE.stall} />
            <Villager position={[-4.2, 0, -4.2]} rotationY={EAST} strain={0.2 + slide * 0.3} />
            <Hero position={[-2.1 - slide * 0.65, 0, -4.6]} rotationY={WEST} animation={slide < 0.65 ? "walk" : "reach"} animDistance={slide * 0.8} face="neutral" time={t} />
            <Bucket position={[-2.6 - slide * 0.85, 1.05, -4.7]} scale={0.9} />
            <FishPile position={[-2.7 - slide * 0.85, 1.05, -4.8]} n={5} seed={4} />
            <Coin position={[-3.7 + slide * 0.7, 1.15, -4.65]} spin={t * 6} />
          </>
        );
      },
    },
    {
      cue: "3.up",
      ...cam.orbit({ on: [6.4, 6.2, -31.4], dist: 5.9, distTo: 3.9, yaw: -16, yawTo: 22, pitch: 6, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Up on stone ledge: white-coated Keeper steps over fish bucket dropping gleaming ten coins.",
      stage: (t) => {
        const reach = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Keeper position={[6.7 - reach * 0.45, 5.85, -31.7]} rotationY={SOUTH} animation={reach < 0.5 ? "walk" : "reach"} animDistance={reach * 0.5} face="blank" time={t} />
            <Bucket position={[5.6, 5.88, -31.2]} scale={0.9} />
            <FishPile position={[5.55, 6.25, -31.2]} n={4} seed={7} />
            <Coin position={[6.2, 6.45 + Math.sin(t * 5) * 0.08, -31.3]} spin={t * 7} />
          </>
        );
      },
    },
    {
      cue: "3.jar",
      ...cam.push({ on: [-0.6, 1.45, -2.2], dist: 3.9, to: 2.35, yaw: 12, pitch: 6, fov: 36, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Mum steps up reaching tenderly to press paper label THE TOP onto filled emerald glass jar.",
      stage: (t) => {
        const press = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Mum position={[-1.3 + press * 0.25, 0, -1.9 - press * 0.15]} rotationY={EAST} animation={press < 0.75 ? "reach" : "hold"} face="smile" headPitch={0.25} lookAt={[-0.6, 1.3, -2.6]} time={t} />
            <Jar position={[-0.6, 1.28, -2.6]} label={t > 0.45 ? 1 : 0.15} fill={0.5 + press * 0.15} />
          </>
        );
      },
    },
    {
      cue: "3.price",
      ...cam.push({ on: [1.6, 1.4, -298.8], dist: 4.1, to: 2.55, yaw: -14, pitch: 4, fov: 38, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "White-coated Keeper steps over reaching up to slap an extra black notch onto gate PriceBoard.",
      stage: (t) => {
        const slap = ease(ramp(t, 0.15, 1.55));
        return (
          <>
            <Gate position={top(0, 0, -300)} />
            <PriceBoard position={top(2.3, 0, -298.6)} digits={slap > 0.6 ? [1, 0, 0, 0, 1] : [1, 0, 0, 0]} rotationY={-0.3} />
            <Keeper position={top(1.5 + slap * 0.35, 0, -299.4)} rotationY={SOUTH} animation={slap > 0.45 ? "reachUp" : "walk"} animDistance={slap * 0.4} face="blank" time={t} />
          </>
        );
      },
    },
  ],
});

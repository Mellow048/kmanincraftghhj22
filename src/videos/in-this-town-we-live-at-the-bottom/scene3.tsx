import { cam, storyScene } from "../../engine";
import {
  Boat, Bucket, EAST, FishPile, Gate, Hero, Jar, Keeper, Line, Mum, NORTH, PLACE, PriceBoard, Rod, SOUTH,
  Stall, Villager, WEST, top, timing,
} from "./kit";

/**
 * 03 — The tour, and the arithmetic.
 *
 * One emerald a bucket at the bottom, ten at the top; a jar marked THE TOP; and a price that goes up every year. The
 * numbers are the villain of this film, so every shot here has a number in it or hands that are counting.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "One emerald a bucket",
  shots: [
    {
      cue: "3.rods",
      from: [0, 9.0, 19],
      to: [0, 6.0, 16.5],
      target: [0, 0.8, 6],
      fov: 48,
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "The whole operation in one move: jetty, boat, stall, and the ladder leaving the top of frame. Small town, big mountain, in the same shot.",
      stage: () => (
        <>
          <Hero position={[0, 0.5, 10.5]} rotationY={NORTH} animation="idle" face="neutral" />
          <Boat position={[3.1, 0, 12.4]} rotationY={0.15} bail={0.2} />
          <FishPile position={[-0.9, 0.5, 8.4]} n={9} />
          <Villager position={[-3.8, 0, -5.0]} rotationY={SOUTH} />
          <Villager position={[1.3, 0.5, 7.4]} rotationY={NORTH} />
        </>
      ),
    },
    {
      cue: "3.hole",
      ...cam.push({ on: [3.1, 0.55, 12.4], dist: 3.4, to: 2.9, yaw: -34, pitch: 4, fov: 38 }),
      zone: "bottom",
      look: "overworld-day",
      note: "The hole in the boat, and the bucket that answers it. It is funny for exactly one second and then it is just work.",
      stage: (t) => (
        <>
          <Boat position={[3.1, 0, 12.4]} rotationY={0.15} bail={0.5 + 0.5 * Math.sin(t * 5)} />
          <Bucket position={[3.6, 0.5, 13.2]} swing={1.2} scale={0.9} />
        </>
      ),
    },
    {
      cue: "3.rain",
      ...cam.push({ on: [0, 1.0, 8], dist: 11.0, to: 9.4, yaw: 16, pitch: 11, fov: 46 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Rain on the water, and four floats going down at once. On 'so we fish in the rain' the whole jetty pulls together.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 9.6]} rotationY={NORTH} animation="reach" face="grin" />
          <Rod position={[0.4, 0.9, 9.5]} bend={0.45} />
          <Line position={[0.6, 0.8, 8.2]} length={1.3} bob={Math.sin(t * 8) * 0.08} />
          {[[-1.4, 8.2], [1.5, 8.6], [-1.1, 11.0]].map(([x, z], i) => (
            <group key={i}>
              <Villager position={[x, 0.5, z]} rotationY={NORTH} strain={0.5} lookAt={[x, 0, z - 2]} />
              <Rod position={[x + 0.3, 0.9, z - 0.1]} bend={0.4} />
              <Line position={[x + 0.45, 0.8, z - 1.8]} length={1.1} bob={Math.sin(t * 7 + i) * 0.07} />
            </group>
          ))}
        </>
      ),
    },
    {
      cue: "3.stall",
      ...cam.push({ on: [-4.2, 1.1, -5.0], dist: 4.6, to: 4.0, yaw: 16, pitch: 3, fov: 42 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "At the stall: a bucket of fish goes over the counter and one emerald comes back. The board behind says what a bucket is worth, and it says one.",
      stage: () => (
        <>
          <Stall position={PLACE.stall} />
          <Villager position={[-4.2, 0, -4.2]} rotationY={SOUTH} strain={0.2} />
          <Hero position={[-2.4, 0, -4.6]} rotationY={WEST} animation="idle" face="neutral" />
          <Bucket position={[-3.4, 1.05, -4.7]} scale={0.9} />
          <FishPile position={[-3.5, 1.05, -4.8]} n={5} seed={4} />
        </>
      ),
    },
    {
      cue: "3.up",
      ...cam.push({ on: [6.4, 6.2, -31.4], dist: 6.2, to: 5.4, yaw: 6, pitch: 2, fov: 38 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Up on the ledge, the same bucket, the same fish, and a clean white cuff taking it. Ten emeralds, and nobody down there will ever see this board.",
      stage: () => (
        <>
          <Keeper position={[6.4, 5.85, -31.8]} rotationY={SOUTH} animation="idle" face="blank" />
          <Bucket position={[5.5, 9.5, -31.2]} scale={0.9} />
          <FishPile position={[5.4, 9.5, -31.2]} n={4} seed={7} />
        </>
      ),
    },
    {
      cue: "3.jar",
      ...cam.push({ on: [-0.6, 1.55, -2.4], dist: 3.9, to: 3.4, yaw: 8, pitch: 6, fov: 34 }),
      zone: "room",
      look: "warm-room",
      note: "In the room, at the shelf: her hand writing THE TOP on a scrap of cloth and pressing it to the glass. It is the whole plan of this family, and it is four letters long.",
      stage: (t) => (
        <>
          <Mum position={[-1.1, 0, -1.9]} rotationY={EAST} animation={t < 0.6 ? "reach" : "idle"} face="smile" headPitch={0.3} lookAt={[-0.6, 1.3, -2.6]} />
          <Jar position={[-0.6, 1.28, -2.6]} label={t > 0.5 ? 1 : 0.15} fill={0.5} />
        </>
      ),
    },
    {
      cue: "3.price",
      ...cam.push({ on: [0, 1.5, -297.5], dist: 3.6, to: 3.1, yaw: -10, pitch: 2, fov: 38 }),
      zone: "top",
      look: "overworld-day",
      note: "The gate's price board, with the number on it. On 'goes up' a hand adds one more mark, all the way up here, where nobody at the bottom can see it happen.",
      stage: (t) => (
        <>
          <Gate position={top(0, 0, -300)} />
          <PriceBoard position={top(2.3, 0, -298.6)} digits={t > 1.6 ? [1, 0, 0, 0, 1] : [1, 0, 0, 0]} rotationY={-0.3} />
          <Keeper position={top(1.7, 0, -299.4)} rotationY={SOUTH} animation={t > 1.6 ? "reachUp" : "idle"} face="blank" />
        </>
      ),
    },
  ],
});

import { cam, storyScene, walkSegment } from "../../engine";
import {
  Basket, Bucket, EAST, FishPile, FishingVillager, Friend, Hero, JETTY_CROWD, Jar, Keeper, Rain, SOUTH, TOWN_ROBES,
  Villager, WEST, beside, cueLen, stepPos, timing,
} from "./kit";
import { JettyLantern } from "./kit";

const DAWN_DUR = cueLen("16.dawn");
const DAWN_START = stepPos(18);
const DAWN_END = stepPos(Math.max(4, 18 - DAWN_DUR * 2.5));

export const scene16 = storyScene(timing, {
  id: "scene16",
  title: "A year of fish",
  shots: [
    {
      cue: "16.dawn",
      ...cam.truck({
        on: [DAWN_START[0], DAWN_START[1] + 0.7, DAWN_START[2]],
        dist: 6.2,
        yaw: 44,
        pitch: 10,
        fov: 46,
        by: [DAWN_END[0] - DAWN_START[0], DAWN_END[1] - DAWN_START[1], DAWN_END[2] - DAWN_START[2]],
        screenOffset: [0, 0.06],
      }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-golden",
      note: "First dawn light: Hero descends stone mountain steps following step curve clutching jar cleanly in hugged arms.",
      stage: (t) => {
        const idx = Math.max(4, 18 - t * 2.5);
        const p = stepPos(idx);
        const pNext = stepPos(Math.max(3.8, idx - 0.25));
        const yaw = Math.atan2(pNext[0] - p[0], pNext[2] - p[2]);
        return (
          <>
            <Hero position={p} rotationY={yaw} animation="walk" arms="hug" animDistance={t * 1.4} face="uneasy" time={t} />
            <Jar position={beside(p, yaw, 0, 0.68, 0.26)} fill={1} scale={0.82} />
          </>
        );
      },
    },
    {
      cue: "16.jetty",
      ...cam.crane({ on: [0, 1.1, 10.2], onTo: [0, 1.4, 10.2], dist: 12.6, toDist: 9.8, yaw: 44, fromPitch: 6, toPitch: 16, fov: 48, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Dynamic bay crane: entire town in varied non-orange robes casts rods cleanly out over water (never onto planks).",
      stage: (t) => (
        <>
          {JETTY_CROWD.map(([x, z], i) => renderWaterFisher(x, z, i, t))}
          <Friend position={[0.0, 0.5, 9.4]} rotationY={EAST - 0.2} animation="talk" face="brave" time={t} />
          <FishPile position={[0.35, 0.52, 11.4]} n={14} seed={11} />
          <Bucket position={[-0.4, 1.0, 12.2]} swing={Math.sin(t * 4) * 0.15} />
        </>
      ),
    },
    {
      cue: "16.allnight",
      ...cam.push({ on: [0, 1.25, 10.4], dist: 6.8, to: 5.8, yaw: -16, pitch: 6, fov: 50, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Lantern-lit night rain: Hero walks non-skating up clear center aisle past tired fishermen casting over water & growing FishPile.",
      stage: (t) => {
        const heroWalk = walkSegment([0, 0.5, 9.2], [0, 0.5, 10.5], t, 0, 1.25, { endYaw: SOUTH });
        return (
          <>
            <Rain center={[0, 0, 10]} t={t} area={[22, 20]} count={110} />
            <JettyLantern position={[-1.05, 0.5, 9.2]} lit={1.2} />
            <JettyLantern position={[1.05, 0.5, 11.4]} lit={1.2} />
            <JettyLantern position={[-1.05, 0.5, 13.4]} lit={1.2} />
            {renderWaterFisher(-0.88, 10.0, 0, t * 1.4)}
            {renderWaterFisher(0.88, 10.2, 1, t * 1.4 + 0.5)}
            <FishPile position={[-0.65, 0.52, 11.4]} n={8 + Math.round(Math.min(1, t) * 4)} seed={13} />
            <Hero {...heroWalk} face="crying" time={t} />
          </>
        );
      },
    },
    {
      cue: "16.basket",
      ...cam.push({ on: [-0.2, 1.25, 14.1], dist: 6.6, to: 5.9, yaw: -30, pitch: 8, fov: 50, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Hollow Basket with Keeper standing cleanly inside floor slab; off-axis Hero & villagers unoccluded in 3/4 view.",
      stage: (t) => {
        const bob = 0.06 * Math.sin(t * 3.2);
        const heroWalk = walkSegment([-0.75, 0.5, 12.1], [-0.7, 0.5, 13.1], t, 0, 1.1, { endYaw: EAST - 0.4 });
        return (
          <>
            <Basket position={[0.15, 0.5 + bob, 15.0]} rope={16} swing={Math.sin(t * 3) * 0.35} />
            <Keeper position={[0.15, 0.6 + bob, 15.0]} rotationY={SOUTH - 0.3} animation="talk" face="blank" time={t} />
            <Hero {...heroWalk} face="surprised" headPitch={-0.18} time={t} />
            <FishPile position={[0.8, 0.52, 13.7]} n={10} seed={15} />
            <Villager position={[-0.85, 0.5, 14.3]} rotationY={EAST} robe={TOWN_ROBES[0]} />
          </>
        );
      },
    },
    {
      cue: "16.year",
      ...cam.push({ on: [-0.05, 1.2, 14.1], dist: 7.0, to: 6.2, yaw: -18, pitch: 6, fov: 50, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Keeper faces WEST across frame toward huge wet silver FishPile hoard and watching Hero uncropped in 9:16.",
      stage: (t) => (
        <>
          <Basket position={[0.65, 0.5, 15.0]} rope={16} />
          <Keeper position={[0.65, 0.6, 15.0]} rotationY={WEST + 0.15} animation="idle" headPitch={0.14} headYaw={-0.15} face="blank" time={t} />
          <Hero position={[-0.65, 0.5, 13.1]} rotationY={EAST - 0.4} animation="idle" face="uneasy" time={t} />
          <FishPile position={[-0.65, 0.52, 14.3]} n={18 + Math.round(Math.min(1, t) * 4)} seed={17} />
          <FishPile position={[-0.15, 0.52, 13.8]} n={12} seed={21} />
          <Bucket position={[-0.9, 1.0, 13.6]} />
        </>
      ),
    },
  ],
});

const HATS: Array<"none" | "straw" | "wide"> = ["none", "straw", "none", "wide", "none", "straw", "none"];

/** Villager casting rod cleanly out over east/west water with planted feet and varied robe. */
function renderWaterFisher(x: number, z: number, i: number, t: number) {
  return (
    <FishingVillager
      key={i}
      position={[x, 0.5, z]}
      rotationY={x < 0 ? WEST + (i % 2 === 0 ? 0.15 : -0.1) : EAST + (i % 2 === 0 ? -0.15 : 0.1)}
      robe={TOWN_ROBES[i % TOWN_ROBES.length]}
      hat={HATS[i % HATS.length]}
      kid={i % 4 === 0}
      phase={i * 0.7}
      bend={0.32 + Math.sin(t * 4 + i) * 0.12}
    />
  );
}

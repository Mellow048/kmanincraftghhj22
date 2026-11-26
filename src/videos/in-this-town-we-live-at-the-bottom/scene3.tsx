import { cam, storyScene, walkSegment } from "../../engine";
import {
  Boat, Bucket, Coin, EAST, FishPile, FishingHero, FishingVillager, Gate, Hero, Jar, Keeper, Mum, NORTH, PriceBoard, SOUTH,
  TOWN_ROBES, Villager, WEST, ease, ramp, rich, room, top, timing, wordAt,
} from "./kit";

const CUT_JETTY = wordAt("3.rods", "a");
const CUT_BOAT = wordAt("3.rods", "one");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "One emerald a bucket",
  shots: [
    {
      cue: "3.rods",
      ...cam.push({ on: [-0.15, 1.15, 9.0], onTo: [0.0, 1.15, 8.9], dist: 6.2, to: 5.2, yaw: 24, pitch: 12, fov: 50 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Visual-verbal lockstep shot 1 ('Down here: rods'): planted Hero & varied-robe neighbors flexing Rods over open water.",
      stage: (t) => {
        const yank = Math.sin(t * 5.2);
        return (
          <>
            <FishingHero position={[-0.25, 0.5, 9.4]} rotationY={EAST - 0.15} bend={0.45 + yank * 0.28} face="brave" time={t * 1.3} />
            <FishingVillager position={[-0.95, 0.5, 8.1]} rotationY={WEST + 0.1} robe={TOWN_ROBES[0]} bend={0.4 + Math.cos(t * 5) * 0.22} phase={0.4} />
            <FishingVillager position={[0.85, 0.5, 9.4]} rotationY={EAST} robe={TOWN_ROBES[1]} bend={0.5 + yank * 0.2} phase={1.2} />
          </>
        );
      },
    },
    {
      cue: "3.rods",
      cut: CUT_JETTY,
      ...cam.truck({ on: [0, 1.25, 7.6], by: [0, 0, 1.8], dist: 7.6, yaw: 0, pitch: 12, fov: 52, screenOffset: [0, 0.04] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Visual-verbal lockstep shot 2 ('a jetty'): camera flies low down wooden plank jetty past walking Hero, silver fish piles, grounded bucket, and townsfolk.",
      stage: (t) => {
        const heroWalk = walkSegment([-0.35, 0.5, 6.5], [-0.35, 0.5, 9.1], t, 0, 1.0);
        const v1Walk = walkSegment([0.85, 0.5, 7.6], [0.85, 0.5, 9.1], t, 0, 1.0);
        const v2Walk = walkSegment([-0.85, 0.5, 9.4], [-0.85, 0.5, 8.0], t, 0, 1.0);
        return (
          <>
            <Hero {...heroWalk} face="neutral" time={t * 1.4} />
            <FishPile position={[0.25, 0.52, 8.2]} n={10} seed={4} />
            <Bucket position={[0.7, 1.0, 9.5]} swing={Math.sin(t * 8) * 0.4} />
            <Villager position={v1Walk.position} rotationY={v1Walk.rotationY} walk={v1Walk.animDistance} robe={TOWN_ROBES[2]} />
            <Villager position={v2Walk.position} rotationY={v2Walk.rotationY} walk={v2Walk.animDistance} robe={TOWN_ROBES[4]} />
          </>
        );
      },
    },
    {
      cue: "3.rods",
      cut: CUT_BOAT,
      ...cam.orbit({ on: [3.4, 0.95, 11.5], dist: 8.8, distTo: 8.2, yaw: 18, yawTo: -8, pitch: 14, fov: 56 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Visual-verbal lockstep shot 3 ('one boat'): Hero jumps cleanly onto oak Boat floor inside hull.",
      stage: (t) => {
        const leap = ease(ramp(t, 0, 0.55));
        return (
          <>
            <Boat position={[3.7, Math.sin(t * 4) * 0.05, 11.6]} rotationY={0.28 + Math.sin(t * 2.5) * 0.06} bail={0.4 + 0.3 * Math.sin(t * 6)} />
            <Hero position={[1.35 + leap * 2.1, 0.36 + Math.sin(leap * Math.PI) * 0.52, 11.4 + leap * 0.85]} rotationY={EAST} animation={leap < 0.7 ? "jump" : "crouch"} face="brave" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.hole",
      ...cam.orbit({ on: [3.65, 1.15, 11.5], dist: 8.2, distTo: 7.4, yaw: 42, yawTo: 18, pitch: 14, fov: 56 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Close-up on leaky starboard hole as Hero leans over bailing bilge water with Bucket parented cleanly to his hand.",
      stage: (t) => {
        const scoop = 0.5 + 0.5 * Math.sin(t * 8);
        return (
          <>
            <Boat position={[3.7, Math.sin(t * 4.5) * 0.05, 11.6]} rotationY={0.2 + Math.sin(t * 3) * 0.07} bail={scoop} hole />
            <Hero position={[3.55, 0.36, 11.45]} rotationY={EAST} animation="leanOver" face="ouch" time={t * 1.5}>
              <Bucket position={[0, 0.05, 0.14]} swing={1.6 * scoop} scale={0.9} />
            </Hero>
          </>
        );
      },
    },
    {
      cue: "3.rain",
      ...cam.orbit({ on: [0, 1.0, 8.8], dist: 9.0, distTo: 7.4, yaw: -16, yawTo: 18, pitch: 14, fov: 52, screenOffset: [0, 0.05] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Driving rain across jetty as Hero & 3 varied-robe villagers cast bent Rods cleanly over water.",
      stage: (t) => (
        <>
          <FishingHero position={[-0.1, 0.5, 9.4]} rotationY={EAST - 0.2} bend={0.55 + Math.sin(t * 8) * 0.16} face="grin" time={t * 1.4} />
          {[[-0.95, 7.6], [0.9, 8.2], [-0.95, 10.2]].map(([x, z], i) => {
            const ry = x < 0 ? WEST + 0.1 : EAST - 0.1;
            return (
              <FishingVillager key={i} position={[x, 0.5, z]} rotationY={ry} robe={TOWN_ROBES[i]} bend={0.48 + Math.sin(t * 7 + i) * 0.14} phase={i} />
            );
          })}
        </>
      ),
    },
    {
      cue: "3.stall",
      ...cam.push({ on: [-3.85, 1.15, -5.2], dist: 7.0, to: 6.0, yaw: -38, pitch: 8, fov: 50, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Clear of stall hay bale & counter: Hero walks up to stall counter sliding fish bucket across while merchant hands back spinning Coin.",
      stage: (t) => {
        const slide = ease(ramp(t, 0.05, 1.35));
        const heroWalk = walkSegment([-2.95, 0, -4.15], [-3.35, 0, -4.35], t, 0, 0.85, { endYaw: WEST + 0.35 });
        return (
          <>
            <Villager position={[-4.2, 0, -6.22]} rotationY={SOUTH} robe={TOWN_ROBES[3]} hmm={0.25 + slide * 0.2} />
            <Hero {...heroWalk} animation={t < 0.85 ? heroWalk.animation : "reach"} face="neutral" time={t} />
            <Bucket position={[-3.45 - slide * 0.65, 1.5, -5.3]} scale={0.92} />
            <FishPile position={[-3.5 - slide * 0.65, 1.1, -5.32]} n={5} seed={4} />
            <Coin position={[-4.0 + slide * 0.7, 1.15, -5.1]} spin={t * 6} />
          </>
        );
      },
    },
    {
      cue: "3.up",
      ...cam.orbit({ on: rich(0, 0.6, 2.0), dist: 6.6, distTo: 5.4, yaw: -16, yawTo: 18, pitch: 4, fov: 48 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "High atop the sunlit Quartz Mansion terrace (y=62m): Keeper struts cleanly atop 0.06m carpet to fish bucket dropping gleaming payoff coin.",
      stage: (t) => {
        const keeperWalk = walkSegment(rich(0.9, 0.06, 2.0), rich(-0.15, 0.06, 2.0), t, 0, 0.85, { endYaw: WEST + 0.3 });
        return (
          <>
            <Keeper {...keeperWalk} animation={t < 0.85 ? keeperWalk.animation : "reach"} face="blank" time={t} />
            <Bucket position={rich(-0.8, 0.5, 2.2)} scale={0.95} />
            <FishPile position={rich(-0.8, 0.12, 2.2)} n={4} seed={7} />
            <Coin position={rich(-0.3, 0.7 + Math.sin(t * 5) * 0.1, 2.1)} spin={t * 7} />
          </>
        );
      },
    },
    {
      cue: "3.jar",
      ...cam.push({ on: room(-1.95, 1.35, -2.25), dist: 4.3, to: 3.6, yaw: 42, pitch: 6, fov: 50, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Inside enclosed bedroom: Mum steps to shelf from side-front 3/4 pressing paper label THE TOP onto filled emerald glass jar.",
      stage: (t) => {
        const press = ease(ramp(t, 0, 1.1));
        const mumWalk = walkSegment(room(-2.45, 0, -1.95), room(-2.05, 0, -1.95), t, 0, 0.75, { endYaw: EAST - 0.35 });
        return (
          <>
            <Mum {...mumWalk} animation={t < 0.75 ? mumWalk.animation : "hold"} face="smile" lookAt={room(-1.8, 1.75, -2.65)} time={t} />
            <Jar position={room(-1.8, 1.57, -2.65)} label={t > 0.45 ? 1 : 0.15} fill={0.5 + press * 0.18} />
          </>
        );
      },
    },
    {
      cue: "3.price",
      ...cam.push({ on: top(0.55, 1.35, 0.75), dist: 7.6, to: 6.8, yaw: 12, pitch: 4, fov: 52, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "White-coated Keeper stands clear of Gate and PriceBoard slapping a fifth digit onto the crisp board.",
      stage: (t) => {
        const slap = ease(ramp(t, 0.1, 1.55));
        const keeperWalk = walkSegment(top(-0.8, 0, 0.75), top(-0.2, 0, 0.75), t, 0.1, 0.9, { endYaw: EAST - 0.35 });
        return (
          <>
            <Gate position={top(0, 0, 0)} />
            <PriceBoard position={top(1.15, 0, 0.75)} digits={slap > 0.6 ? [1, 0, 0, 0, 1] : [1, 0, 0, 0]} rotationY={-0.25} />
            <Keeper {...keeperWalk} animation={t > 0.9 ? "reachUp" : keeperWalk.animation} face="blank" time={t} />
          </>
        );
      },
    },
  ],
});

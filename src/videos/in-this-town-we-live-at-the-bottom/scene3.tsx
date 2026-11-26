import { cam, storyScene } from "../../engine";
import {
  Boat, Bucket, Coin, EAST, FishPile, FishingHero, FishingVillager, Gate, Hero, Jar, Keeper, Mum, NORTH, PLACE, PriceBoard, Rod, SOUTH,
  Stall, Villager, WEST, ease, ramp, room, top, timing, wordAt,
} from "./kit";

const CUT_JETTY = wordAt("3.rods", "a");
const CUT_BOAT = wordAt("3.rods", "one");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "One emerald a bucket",
  shots: [
    {
      cue: "3.rods",
      ...cam.push({ on: [0.3, 1.15, 9.4], onTo: [0.5, 1.1, 8.8], dist: 4.4, to: 2.75, yaw: 32, pitch: 12, fov: 42 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Visual-verbal lockstep shot 1 ('Down here: rods'): tight active frame on Hero & neighbors flexing angled fishing Rods with crisp red bobbing floats over water.",
      stage: (t) => {
        const yank = Math.sin(t * 5.2);
        return (
          <>
            <FishingHero position={[-0.25, 0.5, 9.6 - t * 0.55]} rotationY={EAST - 0.15} bend={0.45 + yank * 0.28} face="brave" time={t * 1.3} />
            <Villager position={[-0.95, 0.5, 8.1]} rotationY={WEST + 0.1} strain={0.45 + 0.25 * yank} walk={0} />
            <Rod position={[-1.2, 0.98, 8.1]} rotationY={WEST + 0.1} bend={0.4 + Math.cos(t * 5) * 0.22} />
            <Villager position={[0.85, 0.5, 10.9]} rotationY={EAST} strain={0.5} walk={0} />
            <Rod position={[1.1, 0.98, 10.9]} rotationY={EAST} bend={0.5 + yank * 0.2} />
          </>
        );
      },
    },
    {
      cue: "3.rods",
      cut: CUT_JETTY,
      ...cam.truck({ on: [0, 0.95, 6.2], by: [0, 0.15, 4.6], dist: 5.0, yaw: -16, pitch: 22, fov: 46 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Visual-verbal lockstep shot 2 ('a jetty'): camera flies low straight down wooden plank jetty pilings past hauling fishermen & silver fish piles.",
      stage: (t) => (
        <>
          <Hero position={[-0.3, 0.5, 6.5 + t * 2.8]} rotationY={SOUTH} animation="walk" animDistance={t * 2.8} face="neutral" time={t * 1.4} />
          <FishPile position={[0.7, 0.52, 8.2]} n={10} seed={4} />
          <Bucket position={[0.7, 0.52, 9.4]} swing={Math.sin(t * 8) * 0.4} />
          <Villager position={[0.8, 0.5, 7.6 + t * 1.6]} rotationY={SOUTH} walk={t * 1.8} />
          <Rod position={[1.05, 0.98, 7.6 + t * 1.6]} rotationY={EAST} bend={0.3} />
          <Villager position={[-0.9, 0.5, 11.4 - t * 1.4]} rotationY={NORTH} walk={t * 1.6} />
        </>
      ),
    },
    {
      cue: "3.rods",
      cut: CUT_BOAT,
      ...cam.orbit({ on: [2.8, 0.55, 11.6], dist: 4.1, distTo: 2.65, yaw: 38, yawTo: -16, pitch: 18, fov: 42 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Visual-verbal lockstep shot 3 ('one boat'): tight orbit straight onto oak Minecraft Boat with oars, benches, leak hole & Hero jumping aboard on animated water.",
      stage: (t) => {
        const leap = ease(ramp(t, 0, 0.55));
        return (
          <>
            <Boat position={[2.8, Math.sin(t * 4) * 0.06, 11.6]} rotationY={0.28 + Math.sin(t * 2.5) * 0.06} bail={0.4 + 0.3 * Math.sin(t * 6)} />
            <Hero position={[1.35 + leap * 1.15, 0.55 + Math.sin(leap * Math.PI) * 0.45, 11.4]} rotationY={EAST} animation={leap < 0.7 ? "jump" : "crouch"} face="brave" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.hole",
      ...cam.orbit({ on: [2.9, 0.52, 11.7], dist: 3.4, distTo: 2.0, yaw: 62, yawTo: 18, pitch: 16, fov: 38 }),
      zone: "bottom",
      look: "overworld-day",
      note: "Close-up on leaky starboard hole as Boat rocks violently and Hero furiously scoops bilge water overboard with swinging Bucket.",
      stage: (t) => {
        const scoop = 0.5 + 0.5 * Math.sin(t * 8);
        return (
          <>
            <Boat position={[2.8, Math.sin(t * 4.5) * 0.05, 11.6]} rotationY={0.2 + Math.sin(t * 3) * 0.07} bail={scoop} hole />
            <Hero position={[2.7, 0.42, 11.45]} rotationY={EAST} animation="leanOver" face="ouch" time={t * 1.5} />
            <Bucket position={[3.35, 0.58 + scoop * 0.22, 12.05]} swing={1.8 * scoop} scale={1.05} />
          </>
        );
      },
    },
    {
      cue: "3.rain",
      ...cam.orbit({ on: [0, 1.0, 8.8], dist: 8.6, distTo: 5.5, yaw: -22, yawTo: 28, pitch: 14, fov: 46, screenOffset: [0, 0.05] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Driving rain across jetty as Hero & 3 villagers brace firmly yanking heavily bent Rods with bobbing lines together.",
      stage: (t) => (
        <>
          <FishingHero position={[-0.1, 0.5, 9.4]} rotationY={EAST - 0.2} bend={0.55 + Math.sin(t * 8) * 0.16} face="grin" time={t * 1.4} />
          {[[-1.1, 7.6], [0.9, 8.2], [-1.0, 11.0]].map(([x, z], i) => {
            const ry = x < 0 ? WEST + 0.1 : EAST - 0.1;
            return (
              <FishingVillager key={i} position={[x, 0.5, z]} rotationY={ry} strain={0.55 + 0.25 * Math.sin(t * 6 + i)} bend={0.48 + Math.sin(t * 7 + i) * 0.14} />
            );
          })}
        </>
      ),
    },
    {
      cue: "3.stall",
      ...cam.push({ on: [-2.8, 1.15, -4.5], dist: 6.0, to: 4.8, yaw: 14, pitch: 8, fov: 46, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Wide 9:16 frame showing Hero sliding heavy fish bucket across the stall counter while merchant hands back a spinning Coin without edge cropping.",
      stage: (t) => {
        const slide = ease(ramp(t, 0.05, 1.35));
        return (
          <>
            <Villager position={[-3.9, 0, -4.2]} rotationY={EAST} strain={0.25 + slide * 0.35} />
            <Hero position={[-1.4 - slide * 1.15, 0, -4.6]} rotationY={WEST} animation={slide < 0.65 ? "walk" : "reach"} animDistance={slide * 1.2} face="neutral" time={t} />
            <Bucket position={[-2.1 - slide * 1.15, 1.05, -4.7]} scale={0.95} />
            <FishPile position={[-2.2 - slide * 1.15, 1.05, -4.8]} n={5} seed={4} />
            <Coin position={[-3.5 + slide * 0.85, 1.15, -4.65]} spin={t * 6} />
          </>
        );
      },
    },
    {
      cue: "3.up",
      ...cam.orbit({ on: [6.4, 6.4, -31.2], dist: 6.8, distTo: 4.6, yaw: -20, yawTo: 24, pitch: 4, fov: 44 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "On sunlit Quartz Mansion terrace above town: Keeper struts briskly over to fish bucket dropping gleaming ten-coin payoff.",
      stage: (t) => {
        const reach = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Keeper position={[7.2 - reach * 1.0, 5.85, -31.2]} rotationY={WEST + 0.4} animation={reach < 0.55 ? "walk" : "reach"} animDistance={reach * 1.1} face="blank" time={t} />
            <Bucket position={[5.6, 5.88, -31.0]} scale={0.95} />
            <FishPile position={[5.55, 6.25, -31.0]} n={4} seed={7} />
            <Coin position={[6.1, 6.45 + Math.sin(t * 5) * 0.1, -31.1]} spin={t * 7} />
          </>
        );
      },
    },
    {
      cue: "3.jar",
      ...cam.push({ on: room(-0.9, 1.4, -2.0), dist: 4.6, to: 3.4, yaw: 12, pitch: 6, fov: 42, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Inside sunlit bedroom: Mum steps cleanly across the floor pressing paper label THE TOP onto filled emerald glass jar.",
      stage: (t) => {
        const press = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Mum position={room(-1.6 + press * 0.55, 0, -1.8 - press * 0.25)} rotationY={EAST} animation={press < 0.5 ? "walk" : "hold"} animDistance={press * 0.6} face="smile" headPitch={0.25} lookAt={room(-0.6, 1.3, -2.6)} time={t} />
            <Jar position={room(-0.6, 1.28, -2.6)} label={t > 0.45 ? 1 : 0.15} fill={0.5 + press * 0.18} />
          </>
        );
      },
    },
    {
      cue: "3.price",
      ...cam.push({ on: top(0.3, 1.35, 0.5), dist: 5.0, to: 3.8, yaw: 12, pitch: 4, fov: 44, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "White-coated Keeper stands clearly beside the unobstructed PriceBoard slapping a fifth black tally notch on.",
      stage: (t) => {
        const slap = ease(ramp(t, 0.1, 1.55));
        return (
          <>
            <Gate position={top(0, 0, 0)} />
            <PriceBoard position={top(1.4, 0, 0.4)} digits={slap > 0.6 ? [1, 0, 0, 0, 1] : [1, 0, 0, 0]} rotationY={-0.3} />
            <Keeper position={top(-1.0 + slap * 1.1, 0, 0.4)} rotationY={slap > 0.55 ? SOUTH : EAST} animation={slap > 0.55 ? "reachUp" : "walk"} animDistance={slap * 1.1} face="blank" time={t} />
          </>
        );
      },
    },
  ],
});

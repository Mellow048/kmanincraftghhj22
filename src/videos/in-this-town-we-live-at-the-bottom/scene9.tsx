import { cam, storyScene } from "../../engine";
import { EAST, FishPile, FishingHero, Hero, Line, Mum, SOUTH, TOWN_ROBES, Villager, ease, ramp, timing, w } from "./kit";

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Two boots",
  shots: [
    {
      cue: "9.try",
      ...cam.orbit({ on: [-0.25, 1.15, 8.4], dist: 4.3, distTo: 3.1, yaw: 48, yawTo: 18, pitch: 10, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front-3/4 shot on wooden jetty: Hero stands cleanly at y=0.5 casting rod EAST over open water.",
      stage: (t) => {
        const yank = Math.sin(t * 4.5);
        return (
          <FishingHero position={[-0.5, 0.5, 8.4]} rotationY={EAST - 0.25} bend={0.3 + yank * 0.16} face="frown" time={t * 1.3} />
        );
      },
    },
    {
      cue: "9.boot",
      ...cam.push({ on: [1.3, 1.35, 8.5], dist: 4.6, to: 3.5, yaw: 36, pitch: 10, fov: 46, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front-3/4 view on jetty: Hero stands cleanly on east edge hoisting soggy leather boot over open water (x > 1.3) clear of pilings.",
      stage: (t) => {
        const lift = ease(ramp(t, 0, 0.9));
        return (
          <>
            <Hero position={[0.92, 0.5, 8.5]} rotationY={EAST} animation="lift" face={t > 0.6 ? "surprised" : "neutral"} headPitch={0.12} time={t} />
            <Line position={[1.95, 1.85, 8.55]} length={0.75 - lift * 0.2} />
            <group position={[1.95, 1.05 + lift * 0.45, 8.55]} rotation={[0.2, 0.6 + lift * 0.4, 0.1]}>
              <Block3 pos={[0, 0, 0]} />
            </group>
          </>
        );
      },
    },
    {
      cue: "9.other",
      ...cam.orbit({ on: [-0.2, 1.25, 8.4], dist: 4.0, distTo: 2.75, yaw: 52, yawTo: 24, pitch: 12, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front-3/4 view on jetty: Hero holds and shakes matching soaked boot in disbelief.",
      stage: (t) => {
        const shake = Math.sin(t * 7);
        return (
          <>
            <Hero position={[-0.5, 0.5, 8.4]} rotationY={EAST - 0.2} animation="hold" face="ouch" headPitch={0.25} time={t} />
            <group position={[0.05, 1.08 + shake * 0.04, 8.52]} rotation={[0.15 + shake * 0.15, -0.4, 0.1]}>
              <Block3 pos={[0, 0, 0]} />
            </group>
          </>
        );
      },
    },
    {
      cue: "9.laugh",
      ...cam.orbit({ on: [0, 1.25, 9.3], dist: 8.2, distTo: 6.8, yaw: -14, yawTo: 14, pitch: 8, fov: 50, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "All bystanders stand cleanly ON the wooden jetty in distinct non-orange robes laughing without shiver before Mum doubles over coughing.",
      stage: (t) => {
        const cough = Math.max(0.4, w("9.laugh", "coughed") - 0.1);
        const bob = Math.abs(Math.sin(t * 6)) * 0.25;
        return (
          <>
            <Hero position={[-0.3, 0.5, 9.6]} rotationY={SOUTH} animation={t < cough ? "laugh" : "scared"} plantFeet face={t < cough ? "laugh" : "worried"} time={t} />
            <Mum position={[0.65, 0.5, 9.9]} rotationY={SOUTH} animation={t < cough ? "laugh" : "ache"} plantFeet face={t < cough ? "happy" : "ouch"} time={t * 1.4} />
            <Villager position={[-0.95, 0.5, 8.3]} rotationY={SOUTH + 0.25} robe={TOWN_ROBES[0]} hmm={0.5 + bob} />
            <Villager position={[0.92, 0.5, 8.5]} rotationY={SOUTH - 0.25} robe={TOWN_ROBES[1]} hmm={0.4 + bob} kid />
            <Villager position={[-0.92, 0.5, 10.4]} rotationY={SOUTH + 0.2} robe={TOWN_ROBES[2]} hmm={0.45} hat="straw" />
            <FishPile position={[0.15, 0.52, 8.9]} n={4} seed={6} />
          </>
        );
      },
    },
  ],
});

/** A Minecraft boot: three boxes that read cleanly in hand. */
const Block3: React.FC<{ pos: [number, number, number] }> = ({ pos }) => {
  const [x, y, z] = pos;
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0.18, -0.1]}>
        <boxGeometry args={[0.22, 0.3, 0.16]} />
        <meshStandardMaterial color="#6b4a2e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.06, 0.14]}>
        <boxGeometry args={[0.22, 0.12, 0.34]} />
        <meshStandardMaterial color="#5a3d26" roughness={0.9} />
      </mesh>
      <mesh position={[0.11, 0.12, 0.02]}>
        <boxGeometry args={[0.02, 0.02, 0.16]} />
        <meshStandardMaterial color="#3a2718" roughness={0.9} />
      </mesh>
    </group>
  );
};

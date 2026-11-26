import { cam, storyScene } from "../../engine";
import { FishPile, FishingHero, Hero, Line, Mum, SOUTH, Villager, ease, ramp, timing, w } from "./kit";

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Two boots",
  shots: [
    {
      cue: "9.try",
      ...cam.orbit({ on: [0, 0.45, 5.2], dist: 4.5, distTo: 3.2, yaw: 145, yawTo: 175, pitch: 10, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front-3/4 shot: Hero splashes in stream holding fishing rod cleanly in hand across three futile days.",
      stage: (t) => {
        const yank = Math.sin(t * 4.5);
        return (
          <FishingHero position={[0, 0.05, 5.0]} rotationY={SOUTH - 0.2} bend={0.3 + yank * 0.16} face="frown" time={t * 1.3} />
        );
      },
    },
    {
      cue: "9.boot",
      ...cam.push({ on: [0.3, 0.75, 4.4], dist: 4.3, to: 2.9, yaw: 152, pitch: 12, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front view: Hero hoists dripping soggy leather boot up in wide-eyed disbelief.",
      stage: (t) => {
        const lift = ease(ramp(t, 0, 0.9));
        return (
          <>
            <Hero position={[0, 0.05, 4.6]} rotationY={SOUTH} animation="lift" face={t > 0.6 ? "surprised" : "neutral"} headPitch={0.15} time={t} />
            <Line position={[0.4, 1.3, 5.1]} length={0.9} />
            <group position={[0.4, 0.35 + lift * 0.65, 5.1]} rotation={[0.2, 0.6 + lift * 0.4, 0.1]}>
              <Block3 pos={[0, 0, 0]} />
            </group>
          </>
        );
      },
    },
    {
      cue: "9.other",
      ...cam.orbit({ on: [0.2, 0.65, 4.4], dist: 4.1, distTo: 2.8, yaw: -156, yawTo: -130, pitch: 14, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Front view: Hero shakes matching soaked boot upside down as deadpan silence lands on hole.",
      stage: (t) => {
        const shake = Math.sin(t * 7);
        return (
          <>
            <Hero position={[0, 0.05, 4.6]} rotationY={SOUTH} animation="hold" face="ouch" headPitch={0.3} time={t} />
            <group position={[0.2, 0.35 + shake * 0.04, 5.1]} rotation={[0.15 + shake * 0.15, -0.4, 0.1]}>
              <Block3 pos={[0, 0, 0]} />
            </group>
          </>
        );
      },
    },
    {
      cue: "9.laugh",
      ...cam.orbit({ on: [0, 1.2, 9.4], dist: 8.6, distTo: 5.5, yaw: -18, yawTo: 18, pitch: 6, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Town laughs as Hero displays twin soggy boots before Mum violently doubles over coughing.",
      stage: (t) => {
        const cough = Math.max(0.4, w("9.laugh", "coughed") - 0.1);
        return (
          <>
            <Hero position={[-0.4, 0.5, 9.6]} rotationY={SOUTH} animation={t < cough ? "laugh" : "scared"} face={t < cough ? "laugh" : "worried"} time={t} />
            <Mum position={[1.0, 0.5, 9.9]} rotationY={SOUTH} animation={t < cough ? "laugh" : "ache"} face={t < cough ? "laugh" : "ouch"} time={t * 1.4} />
            <Villager position={[-1.7, 0.5, 8.8]} rotationY={SOUTH} hmm={0.6} />
            <Villager position={[2.0, 0.5, 9.2]} rotationY={SOUTH} strain={0.4} kid />
            <FishPile position={[-0.4, 0.5, 8.7]} n={4} seed={6} />
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

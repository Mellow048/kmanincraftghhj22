import { cam, storyScene } from "../../engine";
import { FishPile, Hero, Line, Mum, NORTH, Rod, SOUTH, Villager, ease, ramp, timing, w } from "./kit";

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Two boots",
  shots: [
    {
      cue: "9.try",
      ...cam.orbit({ on: [0, 0.45, 5.2], dist: 3.9, distTo: 2.6, yaw: -22, yawTo: 18, pitch: 14, fov: 42, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Hero splashes knee-deep casting and yanking rod impatiently across three futile days.",
      stage: (t) => {
        const yank = Math.sin(t * 4.5);
        return (
          <>
            <Hero position={[0, 0.05, 5.2 - ease(ramp(t, 0, 1.4)) * 0.3]} rotationY={NORTH} animation={yank > 0 ? "reach" : "shrug"} face="frown" time={t * 1.3} />
            <Rod position={[0.3, 0.85, 5.0]} bend={0.3 + yank * 0.16} />
            <Line position={[0.5, 0.75, 3.9]} length={1.3} bob={yank * 0.08} />
          </>
        );
      },
    },
    {
      cue: "9.boot",
      ...cam.push({ on: [0.5, 0.65, 4.2], dist: 3.9, to: 2.5, yaw: -26, pitch: 20, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Hero hoists dripping soggy leather boot skyward out of murky shallows in wide-eyed disbelief.",
      stage: (t) => {
        const lift = ease(ramp(t, 0, 0.9));
        return (
          <>
            <Hero position={[0, 0.05, 4.6]} rotationY={NORTH} animation="lift" face={t > 0.6 ? "surprised" : "neutral"} headPitch={0.2} time={t} />
            <Line position={[0.4, 1.3, 4.0]} length={0.9} />
            <group position={[0.4, 0.35 + lift * 0.65, 3.9]} rotation={[0.2, 0.6 + lift * 0.4, 0.1]}>
              <Block3 pos={[0, 0, 0]} />
            </group>
          </>
        );
      },
    },
    {
      cue: "9.other",
      ...cam.orbit({ on: [0.3, 0.55, 4.2], dist: 3.6, distTo: 2.35, yaw: 28, yawTo: -16, pitch: 28, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Hero shakes matching soaked boot upside down as deadpan silence lands on hole.",
      stage: (t) => {
        const shake = Math.sin(t * 7);
        return (
          <>
            <Hero position={[0, 0.05, 4.6]} rotationY={NORTH} animation="hold" face="ouch" headPitch={0.45} time={t} />
            <group position={[0.2, 0.35 + shake * 0.04, 4.0]} rotation={[0.15 + shake * 0.15, -0.4, 0.1]}>
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
            <Villager position={[-1.7, 0.5, 8.8]} rotationY={SOUTH} hmm={0.6} walk={t * 0.3} />
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

import { cam, storyScene } from "../../engine";
import { FishPile, Hero, Line, Mum, NORTH, Rod, SOUTH, Villager, w, timing } from "./kit";

/**
 * 09 — The first try, and the joke.
 *
 * The fail has to be cheap: three days, one boot, then the other boot, also with a hole. The town laughs, his mum
 * laughs, and then she coughs, and the joke is over.
 */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Two boots",
  shots: [
    {
      cue: "9.try",
      ...cam.push({ on: [0, 0.3, 5.2], dist: 3.6, to: 3.0, yaw: -12, pitch: 16, fov: 42 }),
      zone: "bottom",
      look: "overworld-day",
      note: "On 'three days' a montage in one frame: him standing in the shallows with the rod, the water flat, the light changing. One shot covers three days because nothing happens in any of them.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.05, 5.2]} rotationY={NORTH} animation={t < 1.0 ? "reach" : "idle"} face="neutral" />
          <Rod position={[0.3, 0.85, 5.0]} bend={0.3 + Math.sin(t * 1.6) * 0.05} />
          <Line position={[0.5, 0.75, 3.9]} length={1.3} bob={Math.sin(t * 3) * 0.03} />
        </>
      ),
    },
    {
      cue: "9.boot",
      ...cam.push({ on: [0.6, 0.5, 4.2], dist: 3.9, to: 3.3, yaw: -30, pitch: 26, fov: 36 }),
      zone: "bottom",
      look: "overworld-day",
      note: "On 'a boot' a boot comes up on the line. Then a stick, then a lily pad, all in the same shot: the joke is the pile, not any one thing.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.05, 4.6]} rotationY={NORTH} animation="lift" face={t > 0.7 ? "surprised" : "neutral"} headPitch={0.3} />
          <Line position={[0.4, 1.3, 4.0]} length={0.9} />
          <group position={[0.4, 0.55, 3.9]} rotation={[0.2, 0.6, 0.1]}>
            <Block3 pos={[0, 0, 0]} />
          </group>
        </>
      ),
    },
    {
      cue: "9.other",
      ...cam.push({ on: [0.5, 0.45, 4.0], dist: 3.9, to: 3.5, yaw: 24, pitch: 34, fov: 34 }),
      zone: "bottom",
      look: "overworld-day",
      note: "The second boot, which matches the first one, and also has a hole in it. The camera holds on the hole: the joke needs one beat of silence.",
      stage: () => (
        <>
          <Hero position={[0, 0.05, 4.6]} rotationY={NORTH} animation="hold" face="blank" headPitch={0.5} />
          <group position={[0.2, 0.2, 4.0]} rotation={[0.15, -0.4, 0.1]}>
            <Block3 pos={[0, 0, 0]} />
          </group>
        </>
      ),
    },
    {
      cue: "9.laugh",
      ...cam.push({ on: [0, 1.2, 9.0], dist: 12.0, to: 10.2, yaw: 5, pitch: 4, fov: 46 }),
      zone: "bottom",
      look: "overworld-day",
      note: "The jetty, laughing: the town, his mum with her hand over her mouth, and him holding two boots up like a prize. On 'coughed' her face changes and so does the sound of the film.",
      stage: (t) => {
        const cough = w("9.laugh", "coughed") - 0.1;
        return (
          <>
            <Hero position={[-0.4, 0.5, 9.6]} rotationY={SOUTH} animation="laugh" face={t < cough ? "laugh" : "worried"} />
            <Mum position={[1.0, 0.5, 9.9]} rotationY={SOUTH} animation={t < cough ? "laugh" : "cower"} face={t < cough ? "laugh" : "hurt"} />
            <Villager position={[-1.7, 0.5, 8.8]} rotationY={SOUTH} hmm={0.6} />
            <Villager position={[2.0, 0.5, 9.2]} rotationY={SOUTH} kid />
            <FishPile position={[-0.4, 0.5, 8.7]} n={4} seed={6} />
          </>
        );
      },
    },
  ],
});

/** A Minecraft boot: four boxes that read as one at arm's length. */
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

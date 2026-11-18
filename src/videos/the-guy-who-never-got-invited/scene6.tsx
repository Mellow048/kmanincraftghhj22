import { Block, cam } from "../../engine";
import { Cake, Him, Mug, Record, stagedScene } from "./kit";

/**
 * BEAT 6 — THE CLEAN-UP. The kitchen, later.
 *
 * Ten seconds of nobody helping: cake on the floor, the table wiped, and the record he blew on and
 * put back in its sleeve very carefully. This is the beat that makes the last twenty seconds land.
 */
export const scene6 = stagedScene("scene6", [
  {
    id: "6.table",
    ...cam.push({ on: [0.05, 1.0, 0.3], dist: 3.6, to: 2.9, fov: 44, yaw: 24, pitch: 12 }),
    zone: "kitchen",
    look: "warm-room",
    note: "He wipes a table in an empty kitchen with the cake on the floor behind him: nobody came in to help.",
    stage: () => (
      <>
        <Him position={[-0.1, 0, 0.95]} rotationY={Math.PI} animation="reach" face="sad" headphones="neck" />
        <Cake position={[0.85, 0.03, 1.15]} squashed />
        <Block position={[-0.05, 0.79, 0.3]} size={[0.42, 0.02, 0.36]} color="#d8cdb8" rotation={[0, 0.3, 0]} />
        <Mug position={[0.4, 0.8, -0.1]} />
      </>
    ),
  },
  {
    id: "6.sleeve",
    ...cam.push({ on: [0.05, 0.85, 0.2], dist: 2.5, to: 2.0, fov: 38, pitch: 26, yaw: 4 }),
    zone: "kitchen",
    look: "warm-room",
    note: "The record back in its sleeve, both hands, very carefully: the only thing in the film he is gentle with.",
    stage: (t) => (
      <>
        <Him position={[0.05, 0, -0.45]} rotationY={0} animation="reach" face="calm" headphones="neck" />
        <group position={[0.05, 0.8, 0.28]} rotation={[0, 0.2, 0]}>
          <Record position={[0, 0, 0]} sleeve tilt={0} />
          <Block position={[0.02, 0.02 + Math.min(0.1, t * 0.08), 0.03]} size={[0.3, 0.3, 0.01]} color="#c8c2b4" rotation={[0, 0.12, 0]} />
        </group>
      </>
    ),
  },
]);

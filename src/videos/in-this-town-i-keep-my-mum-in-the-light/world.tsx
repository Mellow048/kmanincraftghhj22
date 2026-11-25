import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, useFilmTime } from "../../engine";

/**
 * IN THIS TOWN, I KEEP MY MUM IN THE LIGHT — world.
 *
 * One street, one house, one shed, one yard. Nothing else. The study of the three 20k films found they use the
 * fewest sets in the catalogue: 74 of Monster Village's 74 shots are the same street. This keeps to that.
 *
 *   STREET     x -4 .. 4, z -6 .. 30, ground at y 0
 *   HOUSES     left  x -6.5 .. -4.2, right x 4.2 .. 6.5, at z 2, 10, 18, 26
 *   HIS HOUSE  left at z 18, doorway at (-4.3, 0 .. 2.2, 18)
 *   WELL       (2.6, 0, 8)
 *   SHED       (6.2, 0, 12), dad's, dark inside
 *   YARD       z 23 .. 29, gate posts at z 28, washing line between them
 *
 * Every lamp in the film is the same lamp part, so the viewer learns one object and then counts it: seven lamps,
 * one block of glowstone, a candle in every window.
 */

type P = { at: [number, number, number]; rotY?: number };

/** A house: four walls with a gap for a door, a pitched roof and a dark window. */
const House: React.FC<P & { door?: boolean; window?: boolean }> = ({ at, rotY = 0, door, window }) => (
  <group position={at} rotation={[0, rotY, 0]}>
    {/* side walls */}
    <Block position={[-2.1, 1.8, 0]} size={[0.3, 3.6, 5.4]} color="#8f8371" />
    <Block position={[2.1, 1.8, 0]} size={[0.3, 3.6, 5.4]} color="#8f8371" />
    {/* back wall and the street face, split around the door */}
    <Block position={[0, 1.8, -2.7]} size={[4.5, 3.6, 0.3]} color="#9a8d7a" />
    <Block position={[0, 2.85, 2.7]} size={[4.5, 1.5, 0.3]} color="#9a8d7a" />
    {door ? (
      <>
        <Block position={[-1.5, 1.05, 2.7]} size={[1.5, 2.1, 0.3]} color="#9a8d7a" />
        <Block position={[1.5, 1.05, 2.7]} size={[1.5, 2.1, 0.3]} color="#9a8d7a" />
        <Block position={[0, 1.05, 2.72]} size={[1.1, 2.1, 0.06]} color="#2a1c14" />
      </>
    ) : (
      <Block position={[0, 1.05, 2.7]} size={[4.5, 2.1, 0.3]} color="#9a8d7a" />
    )}
    {/* roof: two slabs and a ridge */}
    <Block position={[-1.2, 4.35, 0]} size={[2.9, 0.42, 5.9]} color="#5d4a3a" rotation={[0, 0, 0.32]} />
    <Block position={[1.2, 4.35, 0]} size={[2.9, 0.42, 5.9]} color="#5d4a3a" rotation={[0, 0, -0.32]} />
    <Block position={[0, 4.85, 0]} size={[0.5, 0.3, 5.9]} color="#4a3a2c" />
    {window ? (
      <>
        <Block position={[1.9, 2.15, 2.72]} size={[1.1, 0.9, 0.06]} color="#c9a35a" />
        <Block position={[1.9, 2.15, 2.7]} size={[1.3, 1.1, 0.04]} color="#3a2c1e" />
      </>
    ) : null}
  </group>
);

/** A street lamp: post, cross bar, glass box. The film's clock, and the thing that keeps her. */
export const Lamp: React.FC<{ at: [number, number, number]; lit?: boolean; light?: boolean }> = ({ at, lit = true, light = false }) => (
  <group position={at}>
    <Block position={[0, 0.15, 0]} size={[0.34, 0.3, 0.34]} color="#4a4038" />
    <Block position={[0, 1.5, 0]} size={[0.16, 2.7, 0.16]} color="#3f3730" />
    <Block position={[0, 3.0, 0]} size={[0.62, 0.1, 0.62]} color="#4a4038" />
    <Block position={[0, 3.28, 0]} size={[0.4, 0.44, 0.4]} color={lit ? "#ffd479" : "#5a5248"} />
    {lit && light ? <pointLight position={[0, 3.28, 0]} color="#ffcf7a" intensity={11} distance={14} decay={2} /> : null}
  </group>
);

/** The well, where the town gathers and she is not allowed to stand. */
const Well: React.FC<{ at: [number, number, number] }> = ({ at }) => (
  <group position={at}>
    <Block position={[0, 0.45, 0]} size={[1.9, 0.9, 1.9]} color="#8a8378" />
    <Block position={[0, 0.92, 0]} size={[1.5, 0.1, 1.5]} color="#1b1b20" />
    <Block position={[-0.85, 1.4, 0]} size={[0.18, 1.9, 0.18]} color="#5b4a38" />
    <Block position={[0.85, 1.4, 0]} size={[0.18, 1.9, 0.18]} color="#5b4a38" />
    <Block position={[0, 2.35, 0]} size={[2.0, 0.18, 0.26]} color="#5b4a38" />
  </group>
);

/** The washing line in the yard: three sheets, and the place the film ends. */
export const WashingLine: React.FC<{ at: [number, number, number]; count?: number }> = ({ at, count = 3 }) => (
  <group position={at}>
    <Block position={[-1.9, 1.15, 0]} size={[0.16, 2.3, 0.16]} color="#6b5a44" />
    <Block position={[1.9, 1.15, 0]} size={[0.16, 2.3, 0.16]} color="#6b5a44" />
    <Block position={[0, 2.28, 0]} size={[3.9, 0.04, 0.04]} color="#d8d2c0" />
    {Array.from({ length: count }).map((_, i) => (
      <group key={i} position={[-1.2 + i * 1.2, 1.62, 0]}>
        <Block position={[0, 0.02, 0]} size={[0.9, 1.3, 0.03]} color={i === 1 ? "#d7d0e2" : "#e6e2d6"} />
      </group>
    ))}
  </group>
);

/** The coal shed: dad's, because the sun gets in his eyes. */
const Shed: React.FC<{ at: [number, number, number] }> = ({ at }) => (
  <group position={at}>
    <Block position={[0, 0.9, 0]} size={[2.4, 1.8, 2.0]} color="#4a443c" />
    <Block position={[0, 1.9, 0]} size={[2.7, 0.22, 2.3]} color="#332e28" />
    <Block position={[-1.22, 0.85, 0]} size={[0.06, 1.7, 0.9]} color="#141210" />
    <Block position={[0.4, 0.5, 1.02]} size={[0.7, 0.5, 0.3]} color="#191512" />
  </group>
);

/** A hedge, so the street has edges without a fence. */
const Hedge: React.FC<{ at: [number, number, number]; len: number }> = ({ at, len }) => (
  <Block position={at} size={[0.7, 0.8, len]} color="#4f6b3a" />
);

/** The street's lamps die at 1:10, when the phantom takes the last one. The world owns that, because it happens once. */
const LIGHTS_OUT = 70.0;

export const World: React.FC = () => {
  const t = useFilmTime();
  const lit = t < LIGHTS_OUT;
  return (
  <group>
    {/* ground: street, then grass either side */}
    <Block position={[0, -0.06, 12]} size={[8.4, 0.12, 40]} color="#8c8578" />
    <Block position={[-8, -0.08, 12]} size={[9, 0.1, 40]} color="#5f7a44" />
    <Block position={[8, -0.08, 12]} size={[9, 0.1, 40]} color="#5f7a44" />
    {/* kerbs */}
    <Block position={[-4.3, 0.02, 12]} size={[0.3, 0.14, 40]} color="#6f6a60" />
    <Block position={[4.3, 0.02, 12]} size={[0.3, 0.14, 40]} color="#6f6a60" />

    {/* left: his house at z 18 with the doorway, then neighbours */}
    <House at={[-6.5, 0, 2]} rotY={Math.PI / 2} window />
    <House at={[-6.5, 0, 10]} rotY={Math.PI / 2} door />
    <House at={[-6.5, 0, 18]} rotY={Math.PI / 2} door window />
    <House at={[-6.5, 0, 26]} rotY={Math.PI / 2} />
    {/* right: the neighbours who put their chairs on the chairs */}
    <House at={[6.5, 0, 2]} rotY={-Math.PI / 2} window />
    <House at={[6.5, 0, 18]} rotY={-Math.PI / 2} door />
    <House at={[6.5, 0, 26]} rotY={-Math.PI / 2} window />

    <Well at={[2.6, 0, 8]} />
    <Shed at={[6.2, 0, 12]} />
    <Hedge at={[-4.0, 0.4, -1]} len={7} />
    <Hedge at={[4.0, 0.4, -1]} len={7} />

    {/* the seven lamps: street, yard, gate */}
    <Lamp at={[-3.7, 0, 4]} lit={lit} />
    <Lamp at={[3.7, 0, 4]} lit={lit} />
    <Lamp at={[-3.7, 0, 14]} lit={lit} light />
    <Lamp at={[3.7, 0, 14]} lit={lit} />
    <Lamp at={[-3.7, 0, 23]} lit={lit} />
    <Lamp at={[3.7, 0, 23]} lit={lit} />
    <Lamp at={[0, 0, 28.4]} lit={lit} light />

    <WashingLine at={[0.6, 0, 25.4]} />

    {/* gate posts at the yard, and the road out */}
    <Block position={[-2.2, 0.9, 28]} size={[0.26, 1.8, 0.26]} color="#6b5a44" />
    <Block position={[2.2, 0.9, 28]} size={[0.26, 1.8, 0.26]} color="#6b5a44" />

    {/* the ground beyond the gate, so the frame is never empty at the end of the street */}
    <Block position={[0, -0.06, 34]} size={[26, 0.1, 14]} color="#6f8a4e" />
    <Block position={[-9.5, 6.5, 40]} size={[16, 12, 2]} color="#7f9a5c" />
    <Block position={[9.5, 6.0, 40]} size={[16, 12, 2]} color="#7f9a5c" />

    {/* ── light: a sun, a rim off the far roofs, and the practicals in the lamps ── */}
    <directionalLight color="#fff2d6" intensity={2.3} position={[7, 12, -3]} />
    <directionalLight color="#b9cdf0" intensity={0.85} position={[-8, 7, 34]} />
    <pointLight position={[2.6, 2.2, 8]} color="#cfe0ff" intensity={3} distance={9} decay={2} />

    {/* ── atmosphere: warm shafts off the lamp heads, pools on the cobbles, dust in every beam ── */}
    <GodRay position={[-3.4, 1.9, 4]} rotation={[0, 0, 0.24]} width={1.5} height={3.6} color="#ffd9a0" opacity={0.1} />
    <GodRay position={[3.4, 1.9, 14]} rotation={[0, 0, -0.26]} width={1.6} height={3.6} color="#ffd9a0" opacity={0.09} />
    <GodRay position={[-3.4, 1.9, 23]} rotation={[0, 0, 0.22]} width={1.4} height={3.4} color="#ffd9a0" opacity={0.08} />
    {[-3.7, 3.7].map((x) => [4, 14, 23].map((z) => (
      <LightPool key={`${x}-${z}`} position={[x, 0.02, z]} width={4.4} depth={4.4} color="#ffcf8a" opacity={lit ? 0.16 : 0.0} />
    )))}
    <LightPool position={[0, 0.02, 28.4]} width={5} depth={5} color="#ffcf8a" opacity={lit ? 0.14 : 0} />
    {[-3.7, 3.7].map((x) => [4, 14, 23].map((z) => (
      <Glow key={`g${x}-${z}`} position={[x, 3.28, z]} size={lit ? 2.1 : 0.6} color="#ffd479" opacity={lit ? 0.42 : 0.06} />
    )))}
    <Glow position={[0, 3.28, 28.4]} size={lit ? 2.4 : 0.7} color="#ffd479" opacity={lit ? 0.42 : 0.06} />
    <Dust position={[0, 2.0, 16]} area={[9, 4, 26]} count={110} size={0.03} color="#ffe9c4" opacity={0.5} seed={7} speed={0.5} />
  </group>
  );
};

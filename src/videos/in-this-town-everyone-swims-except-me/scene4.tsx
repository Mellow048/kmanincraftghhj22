import { cam, storyScene } from "../../engine";
import {
  Bubbles, Cast, Dive, Drops, EAST, Friend, Hero, Kid, NORTH, P, PoolLife, Puffs, ROBE, Splash, Swim, Towel, Under, Villager, WEST, WL, flatOut, posed,
  timing, tw,
} from "./kit";

/**
 * 04 THE BOTTOM — the second time the pool nearly keeps him, and the second time his friend does not let it.
 * The deep end: x = +7, lane 4 (z = +3). The floor is 2.4 m down.
 */
const LZ = 3;
/** Where he ends up lying on the south deck: hips here, head to the west. */
const LAY = P(6.4, 0.06, 5.3);
const sitFloor = (t: number, look: number) =>
  posed("sit", t, { legR: [-Math.PI / 2, 0, 0.22], legL: [-Math.PI / 2, 0, -0.22], kneeR: [0, 0, 0], kneeL: [0, 0, 0], armR: [0.25, 0, 0.3], armL: [0.25, 0, -0.3], head: [look, 0, 0] });

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The bottom",
  shots: [
    {
      cue: "4.bottom",
      ...cam.push({ on: P(7.0, -1.95, LZ), dist: 2.9, to: 2.3, yaw: -100, pitch: 26, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "He lands sitting on the pool floor in a little cloud, on the dark lane line. Then his head tips back, and back, until he is looking straight up at us.",
      stage: (t) => (
        <>
          <Under on={P(7, 0, LZ)} yaw={-100} dist={2.9} />
          <Hero position={P(7.1, -2.74 + Math.max(0, 0.25 - t) * 1.6, LZ)} rotationY={WEST} pose={sitFloor(t, 0.2 - tw(t, 0.4, 1.0) * 0.95)} face="uneasy" shadow={false} />
          <Puffs position={P(7.1, -2.3, LZ)} color="#cfeaf6" count={6} rise={0.3 + t * 0.2} spread={0.5 + t * 0.5} size={0.22} />
          <Bubbles at={P(7.0, -1.7, LZ)} t={t} n={7} rise={1.4} spread={0.12} />
        </>
      ),
    },
    {
      cue: "4.bubble",
      ...cam.push({ on: P(7, 0, LZ + 0.5), dist: 4.3, to: 3.6, yaw: 196, pitch: 38, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "What he sees: his own hand going up, his bubbles going up past it, and a long way above them a bright window with lane ropes across it and a small dark head looking over the edge.",
      stage: (t) => (
        <>
          <Hero position={P(7.25, -2.74, LZ + 0.1)} rotationY={WEST} pose={{ ...sitFloor(t, -0.9), armR: [-2.9 + Math.sin(t * 3) * 0.1, 0, 0.1] }} shadow={false} />
          <Bubbles at={P(6.95, -1.3, LZ)} t={t} n={22} rise={1.2} spread={0.4} />
          {[0, 1, 2].map((i) => (
            <Splash key={i} at={P(6.8 + i * 0.22, WL, LZ - 0.15 + (i % 2) * 0.3)} k={(t * 1.7 + i * 0.37) % 1} size={0.5} n={7} seed={i + 5} />
          ))}
          <Friend position={P(6.9, 0.04, 4.5)} rotationY={NORTH} animation="leanOver" face="worried" />
          <Kid n={5} scale={0.6} position={P(8.4, 0.04, LZ)} rotationY={WEST} animation="leanOver" face="worried" />
          <Kid n={2} scale={0.6} position={P(5.6, 0.04, 4.5)} rotationY={NORTH + 0.3} animation="leanOver" face="surprised" />
        </>
      ),
    },
    {
      cue: "4.shoes",
      ...cam.push({ on: P(6.2, 0.5, 4.2), dist: 4.6, to: 3.8, yaw: 74, pitch: 6, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Low on the deck: the friend comes down it flat out, straight at the lens, plants one shoe on the white edge and goes in over the top in all his clothes.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          {t < 0.62 ? (
            <Friend position={P(2.4 + t * 6.3, 0.04, 4.75 - t * 0.6)} rotationY={EAST} animation="run" animDistance={t * 6.3} face="brave" />
          ) : (
            <Dive who="friend" from={P(6.3, 0.04, 4.35)} heading={NORTH - 0.3} t={t} at={0.66} reach={1.8} then="sink" face="brave" seed={7} />
          )}
          <Towel position={P(3.2, 0.06, 5.2)} color="#3fb8a8" rotation={[0, 0.4, 0]} />
          <Kid n={2} scale={0.56} position={P(8.6, 0.04, 5.3)} rotationY={WEST} animation="scared" face="fear" />
        </>
      ),
    },
    {
      cue: "4.pull",
      ...cam.push({ on: P(7.0, -1.3, LZ), onTo: P(7.0, -0.55, LZ), dist: 3.4, to: 3.0, yaw: -92, pitch: -5, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "Under: a green arm has a fistful of red shirt at the back of the neck, and the two of them go up together, the friend kicking for both, him hanging like washing.",
      stage: (t) => {
        const up = tw(t, 0.05, 1.1);
        return (
          <>
            <Under on={P(7, 0, LZ)} yaw={-92} dist={3.4} />
            <Swim who="friend" at={P(7.0, WL, LZ - 0.25)} heading={EAST} mode="tread" t={t} rate={1.7} depth={0.75 - up * 0.85} foam={0} pose={undefined} />
            <Swim
              at={P(7.0, WL, LZ + 0.3)}
              heading={EAST}
              mode="sink"
              t={t}
              depth={1.2 - up * 0.95}
              pose={posed("idle", t, { bodyPitch: 0.5, armR: [0.3, 0, 0.3], armL: [0.3, 0, -0.3], legR: [0.3, 0, 0.1], legL: [0.1, 0, -0.1], head: [0.5, 0, 0] })}
              face="dizzy"
              foam={0}
            />
            <Bubbles at={P(7.0, -1.8 + up * 0.8, LZ)} t={t} n={16} rise={1.2} spread={0.5} />
          </>
        );
      },
    },
    {
      cue: "4.taste",
      ...cam.push({ on: P(5.72, 0.28, 5.3), dist: 2.0, to: 1.4, yaw: 16, pitch: 52, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "Down on his face on the tiles, eyes going round in different directions. A small fountain of pool comes up out of his mouth, and then another.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          <Hero position={LAY} rotationY={EAST} pose={flatOut(t)} face="dizzy" />
          <Splash at={P(5.72, 0.36, 5.3)} k={(t * 1.9) % 1} size={0.22} n={7} seed={3} />
          <Towel position={P(6.2, 0.045, 5.3)} color="#b9aa8c" size={[2.2, 0.02, 1.7]} />
        </>
      ),
    },
    {
      cue: "4.tiles",
      ...cam.top({ on: P(6.3, 0.1, 5.2), height: 3.3, to: 5.4, spin: [8, 34], fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Straight down, rising and turning: a red star on the tiles in its own puddle. His friend sits beside him wringing out a sleeve. The pool goes on without them.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1, 2]} />
          <Hero position={LAY} rotationY={EAST} pose={flatOut(t)} face="sleepy" />
          <Towel position={P(6.2, 0.045, 5.3)} color="#b9aa8c" size={[2.5, 0.02, 2.0]} />
          <Friend position={P(7.0, -0.3, 6.25)} rotationY={NORTH + 0.4} pose={posed("sit", t, { legR: [-Math.PI / 2, 0, 0.2], legL: [-Math.PI / 2, 0, -0.2], kneeR: [0, 0, 0], kneeL: [0, 0, 0], armR: [-0.9, 0, -0.6], armL: [-0.9 + Math.sin(t * 5) * 0.2, 0, 0.6] })} face="worried" />
          <Drops top={P(7.0, 0.5, 5.9)} t={t} height={0.45} spread={0.1} n={6} />
          <Villager position={P(4.4, 0.04, 6.3)} rotationY={EAST} robe={ROBE.white} lookAt={P(6.3, 0.1, 5.3)} phase={0.5} />
        </>
      ),
    },
    {
      cue: "4.tired",
      ...cam.push({ on: P(6.5, 0.3, 5.3), dist: 3.5, to: 2.9, yaw: 6, pitch: 17, fov: 40 }),
      zone: "pool",
      look: "overworld-sunset",
      note: "Later, low along the tiles: the sun has gone orange, the pool is empty, and he has not moved. His eyes close. The friend is still sitting there.",
      stage: (t) => (
        <>
          <PoolLife quiet />
          <Hero position={LAY} rotationY={EAST} pose={flatOut(t * 0.5)} face="sleepy" />
          <Friend position={P(7.7, -0.3, 4.75)} rotationY={WEST + 0.5} pose={posed("sit", t, { legR: [-Math.PI / 2, 0, 0.2], legL: [-Math.PI / 2, 0, -0.2], kneeR: [0.3, 0, 0], kneeL: [0.3, 0, 0], armR: [-0.7, 0, -0.3], armL: [-0.7, 0, 0.3] })} face="worried" headPitch={0.2} />
          <Cast who={2} scale={0.56} position={P(9.6, 0.04, 4.2 + t * 0.5)} rotationY={0} animation="walk" animDistance={t * 0.5} face="neutral" />
        </>
      ),
    },
  ],
});

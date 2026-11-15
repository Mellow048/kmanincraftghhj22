import { cam, storyScene } from "../../engine";
import {
  Bubbles, Cast, Chicken, Dive, Drops, EAST, Floatie, Foam, Friend, Hang, Hero, Kid, NORTH, P, POOL, PoolLife, ROBE, SOUTH, SignBoard, Splash, Swim,
  Towel, Under, Villager, WEST, WL, allFours, laneZ, posed, timing, tw,
} from "./kit";

/**
 * 02 THE POOL — he goes anyway, and the pool wins.
 *
 * Shallow end: the wall, the kick, the legs going down, the little kids. Deep end: over his head, a hand, the tiles.
 * The friend (green shirt) is in the water doing lengths from the first shot, so the hand has somebody to belong to.
 */
const SHALLOW = -3;
const DEEP = 6.4;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The pool",
  shots: [
    {
      cue: "2.smell",
      ...cam.push({ on: P(1, 0, 0), dist: 21, to: 17.5, yaw: -90, pitch: 21, fov: 46 }),
      zone: "pool",
      look: "overworld-day",
      note: "The whole town pool down its length from over the gate: lanes, kids going in off the blocks, the lifeguard, parasols, roofs. He comes in at the bottom of the frame with a towel, and stops.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1, 2, 3]} />
          <Dive who={6} from={P(-8.6, 0.5, laneZ(4, POOL))} heading={EAST} t={t} at={0.5} speed={2.0} rate={1.3} seed={2} />
          <Kid n={7} position={P(-9.6, 0, laneZ(3, POOL))} rotationY={EAST} animation="cheer" face="laugh" />
          <Hero position={P(-13.4 + Math.min(t, 1.0) * 1.5, 0, 0.3)} rotationY={EAST} animation={t < 1.0 ? "walk" : "idle"} animDistance={Math.min(t, 1.0) * 1.5} face="uneasy">
            <Towel position={[0.02, 0.05, 0.0]} color="#f6f2e6" size={[0.16, 0.5, 0.3]} />
          </Hero>
          <Kid n={1} scale={0.6} position={P(-12.5 + t * 3, 0, -1.1)} rotationY={EAST} animation="run" animDistance={t * 3} face="laugh" />
        </>
      ),
    },
    {
      cue: "2.everyday",
      ...cam.truck({ on: P(-6.5, 0.85, 5.1), dist: 4.3, yaw: 28, pitch: 7, fov: 40, by: [2.2, 0, 0] }),
      zone: "pool",
      look: "overworld-day",
      note: "Beside him down the deck, jaw set, a float under one arm, while two kids overtake him at a run and jump in without slowing.",
      stage: (t) => (
        <>
          <PoolLife />
          <Hero position={P(-7.4 + t * 1.5, 0, 5.1)} rotationY={EAST} animation="walk" animDistance={t * 1.5} face="brave">
            <Floatie position={[0, -0.1, 0.12]} color="#f0c030" scale={0.75} />
          </Hero>
          <Dive who={4} from={P(-6.0 + Math.min(t, 0.7) * 2, 0.02, 4.3)} heading={NORTH} t={t} at={0.75} reach={2.0} speed={1.6} seed={3} />
          <Dive who={9} from={P(-3.2, 0.02, 4.3)} heading={NORTH} t={t} at={1.15} reach={2.0} speed={1.6} seed={5} />
        </>
      ),
    },
    {
      cue: "2.hold",
      ...cam.push({ on: P(SHALLOW, 0.0, 3.5), dist: 3.9, to: 3.1, yaw: 32, pitch: 30, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Down on him from the deck: both hands flat on the white edge, knuckles tight, the rest of him laid out behind on the water. His friend goes by in the next lane without a splash.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          <Hang wall={P(SHALLOW, 0, 4.0)} heading={SOUTH} k={0.1} t={t} kick={0.18} face="uneasy" />
          <Swim who="friend" at={P(-7 + t * 2.2, WL, 1)} heading={EAST} mode="crawl" t={t} rate={1.2} seed={8} />
        </>
      ),
    },
    {
      cue: "2.kick",
      ...cam.orbit({ on: P(SHALLOW, 0.1, 3.0), dist: 5.2, distTo: 4.6, yaw: 60, yawTo: 96, pitch: 20, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Round to his side: the legs go like an egg whisk and throw water three metres, and he does not move a finger's width. A chicken on the deck watches, head on one side.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          <Hang wall={P(SHALLOW, 0, 4.0)} heading={SOUTH} k={0} t={t} kick={1.5} face="brave" />
          {[0, 1, 2, 3].map((i) => (
            <Splash key={i} at={P(SHALLOW + Math.sin(i * 2.4) * 0.3, WL, 2.2 + Math.cos(i * 1.7) * 0.25)} k={(t * 2.1 + i * 0.25) % 1} size={1.0} seed={i + 3} />
          ))}
          <Chicken position={P(SHALLOW - 0.5, 0.04, 4.55)} rotationY={2.6} scale={1.3} phase={0.6} />
        </>
      ),
    },
    {
      cue: "2.sink",
      ...cam.push({ on: P(SHALLOW, -0.6, 3.55), dist: 3.6, to: 2.8, yaw: 90, pitch: -4, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Under the water, side on: his hands stay on the edge and everything below them swings down like a gate closing, feet first, bubbles going the other way.",
      stage: (t) => {
        const k = tw(t, 0.15, 1.1);
        return (
          <>
            <Under on={P(SHALLOW, 0, 3.3)} yaw={90} dist={3.8} />
            <Hang wall={P(SHALLOW, 0, 4.0)} heading={SOUTH} k={k} t={t} kick={1.2 * (1 - k)} face="fear" />
            <Bubbles at={P(SHALLOW, -1.5 + k * 0.4, 3.0 + k * 0.6)} t={t} n={12} rise={1.4} spread={0.3} />
            <Swim who={4} at={P(SHALLOW - 2.2, WL, 2.4)} heading={0.4} mode="tread" t={t} seed={3} foam={0} />
            <Swim who={7} at={P(SHALLOW - 3.6, WL, 3.3)} heading={-0.4} mode="tread" t={t} seed={6} foam={0} />
          </>
        );
      },
    },
    {
      cue: "2.laugh",
      ...cam.push({ on: P(SHALLOW, 0.2, 4.6), dist: 3.9, to: 3.2, yaw: 192, pitch: 14, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "From the water, over his wet head: three kids half his size on the edge, in armbands, bent double. One points. He hangs off the wall and looks at the tiles.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} kids={false} />
          <Hang wall={P(SHALLOW, 0, 4.0)} heading={SOUTH} k={0.7} t={t} kick={0.1} face="frown" headPitch={0.3} />
          <Kid n={2} scale={0.56} position={P(SHALLOW - 0.6, 0.04, 4.75)} rotationY={NORTH + 0.3} animation="laugh" face="laugh" phase={0.2} />
          <Kid n={5} scale={0.6} position={P(SHALLOW + 0.0, 0.04, 5.0)} rotationY={NORTH} animation="point" face="laugh" phase={0.9} />
          <Kid n={8} scale={0.54} position={P(SHALLOW + 0.6, 0.04, 4.75)} rotationY={NORTH - 0.3} animation="laugh" face="laugh" phase={1.7} />
          <Floatie position={P(SHALLOW + 1.9, 0.14, 5.2)} color="#e86aa8" scale={0.9} />
        </>
      ),
    },
    {
      cue: "2.deep",
      ...cam.push({ on: P(DEEP, 0.7, 1.5), dist: 6.2, to: 4.8, yaw: 4, pitch: 13, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Behind him at the far end of the pool: his heels on the edge, dark blue water in front of his toes, and the board on the far side that says DEEP END.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          <Hero position={P(DEEP, 0.04, 4.9 - tw(t, 0, 0.6) * 0.55)} rotationY={NORTH} animation={t < 0.6 ? "creep" : "scared"} animDistance={t * 0.9} face="uneasy" headPitch={0.4} />
          <Swim who="friend" at={P(-2 + t * 2.0, WL, -1)} heading={EAST} mode="crawl" t={t} rate={1.2} seed={8} />
        </>
      ),
    },
    {
      cue: "2.down",
      ...cam.push({ on: P(DEEP, -0.1, 3.3), dist: 4.2, to: 3.4, yaw: 55, pitch: 16, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "He steps off. A column of white water, his two hands above it for a moment, and then only the rings going out.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          {t < 0.3 ? (
            <Hero position={P(DEEP, 0.04 - tw(t, 0.12, 0.3) * 0.9, 4.3 - tw(t, 0, 0.3) * 1.0)} rotationY={NORTH} pose={posed("fall", t, {})} face="fear" />
          ) : (
            <Swim at={P(DEEP, WL, 3.3)} heading={NORTH} mode="sink" t={t} depth={-0.25 + (t - 0.3) * 1.5} face="fear" foam={0} />
          )}
          <Splash at={P(DEEP, WL, 3.3)} k={(t - 0.28) / 0.75} size={1.5} n={20} />
          <Foam at={P(DEEP, WL, 3.3)} t={t} size={t < 0.3 ? 0 : 1.2 + t * 0.5} n={12} />
        </>
      ),
    },
    {
      cue: "2.arms",
      ...cam.orbit({ on: P(DEEP, -1.3, 2.6), dist: 3.4, distTo: 2.8, yaw: -60, yawTo: -110, pitch: -6, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "Under: he turns right round in blue water with his arms out, looking for up and finding wall, floor, wall. The bubbles know where the top is. He does not.",
      stage: (t) => (
        <>
          <Under on={P(DEEP, 0, 2.6)} yaw={-85} dist={3.4} />
          <Swim at={P(DEEP, WL, 2.6)} heading={t * 3.4} mode="flail" t={t} rate={0.7} depth={0.55 + t * 0.2} face="fear" foam={0} />
          <Bubbles at={P(DEEP, -1.3, 2.6)} t={t} n={14} rise={1.2} spread={0.4} />
        </>
      ),
    },
    {
      cue: "2.hand",
      ...cam.push({ on: P(DEEP, -0.7, 3.4), dist: 2.9, to: 2.3, yaw: -90, pitch: -20, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "Looking up from under him: a green sleeve comes down through the bright surface in a burst of bubbles and shuts on his wrist.",
      stage: (t) => {
        const k = tw(t, 0.1, 0.5);
        return (
          <>
            <Under on={P(DEEP, 0, 3.3)} yaw={-90} dist={2.9} opacity={0.08} />
            <Swim at={P(DEEP, WL, 3.2)} heading={SOUTH} mode="sink" t={t} depth={0.75 - tw(t, 0.55, 1.1) * 0.4} face="fear" foam={0} />
            <Swim who="friend" at={P(DEEP, WL, 3.9)} heading={NORTH} mode="glide" t={t} depth={-0.9 + k * 1.15} foam={0} />
            <Bubbles at={P(DEEP, -0.9, 3.5)} t={t} n={16} rise={0.9} spread={0.45} seed={4} />
          </>
        );
      },
    },
    {
      cue: "2.friend",
      ...cam.orbit({ on: P(DEEP, 0.35, 4.7), dist: 4.9, distTo: 4.2, yaw: 96, yawTo: 78, pitch: 9, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "On the deck: the friend goes backwards on his heels with both hands on a red arm, and the rest of the red shirt comes over the edge after it like a sack and lands on its front.",
      stage: (t) => {
        const k = tw(t, 0.05, 0.95);
        return (
          <>
            <PoolLife lanes={[1]} />
            <Hero
              position={P(DEEP, -1.0 + k * 0.55, 3.75 + k * 1.0)}
              rotationY={SOUTH}
              pose={posed("idle", t, { bodyPitch: 0.3 + k * 1.15, bodyY: 0, armR: [-2.9, 0, 0.1], armL: [-2.9, 0, -0.1], legR: [0.2 + Math.sin(t * 12) * 0.3, 0, 0], legL: [0.2 - Math.sin(t * 12) * 0.3, 0, 0], head: [-0.4, 0, 0] })}
              face="hurt"
              shadow={false}
            />
            <Friend position={P(DEEP, 0.04, 5.0 + k * 1.0)} rotationY={NORTH} pose={posed("idle", t, { bodyPitch: -0.3 + k * 0.1, armR: [-1.2, 0, -0.15], armL: [-1.2, 0, 0.15], legR: [0.4, 0, 0], legL: [-0.3, 0, 0], kneeR: [0.3, 0, 0], kneeL: [0.5, 0, 0] })} face="worried" />
            <Splash at={P(DEEP, WL, 3.8)} k={t / 0.7} size={1.1} />
            <Drops top={P(DEEP, 0.5, 4.3 + k * 0.6)} t={t} height={0.6} spread={0.4} n={14} />
          </>
        );
      },
    },
    {
      cue: "2.breath",
      ...cam.push({ on: P(DEEP + 0.1, 0.38, 5.0), dist: 2.7, to: 2.1, yaw: 68, pitch: 4, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Low, at his level: on hands and knees on the wet tiles, back heaving, pool water coming out of him in coughs.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          <Hero position={P(DEEP, 0.04, 4.6)} rotationY={SOUTH + 0.2} pose={allFours(t, 1)} face="hurt" />
          <Drops top={P(DEEP + 0.12, 0.42, 5.15)} t={t} height={0.4} spread={0.07} n={Math.sin(t * 13) > 0 ? 9 : 0} speed={3} />
          <Friend position={P(DEEP - 1.0, 0.04, 4.2)} rotationY={EAST + 0.3} pose={posed("leanOver", t, { armR: [-1.3 + Math.sin(t * 8) * 0.25, 0, -0.2] })} face="worried" />
        </>
      ),
    },
    {
      cue: "2.breath",
      cut: 1.05,
      ...cam.push({ on: P(DEEP, 0.3, 4.8), dist: 4.6, to: 5.6, yaw: 150, pitch: 34, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Up and back: a wet red shape on the tiles in a spreading dark patch, his friend's hand on his back, and the three little kids standing in a row, not laughing now.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} kids={false} />
          <Hero position={P(DEEP, 0.04, 4.6)} rotationY={SOUTH + 0.2} pose={allFours(t, 0.5)} face="hurt" />
          <Friend position={P(DEEP - 1.0, 0.04, 4.2)} rotationY={EAST + 0.3} pose={posed("leanOver", t, { armR: [-1.3, 0, -0.2] })} face="worried" />
          <Towel position={P(DEEP + 0.1, 0.045, 4.7)} color="#b8a888" size={[1.9, 0.02, 1.6]} />
          {[0, 1, 2].map((i) => (
            <Kid key={i} n={[2, 5, 8][i]} scale={0.56} position={P(DEEP + 0.9 + i * 0.55, 0.04, 6.0 - i * 0.45)} rotationY={WEST - 0.5} animation="idle" face="worried" phase={i} />
          ))}
          <Villager position={P(DEEP - 2.6 + tw(t, 0, 1) * 0.8, 0.04, 5.4)} rotationY={EAST} robe={ROBE.white} walk={t * 0.9} lookAt={P(DEEP, 0.3, 4.6)} />
        </>
      ),
    },
    {
      cue: "2.days",
      ...cam.push({ on: P(-13.1, 1.3, 4.6), dist: 5.0, to: 3.9, yaw: 82, pitch: 3, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "The board by the gate: SUMMER RACE, 3 DAYS. He stands under it with a towel round his neck, dripping, reading it for the tenth time.",
      stage: (t) => (
        <>
          <PoolLife />
          <SignBoard at={P(-13.2, 0, 4.6)} rotationY={Math.PI / 2} width={1.9} height={2.5} lines={[{ text: "SUMMER", height: 0.3, color: "#a83c2a" }, { text: "RACE", height: 0.3, color: "#a83c2a" }, { text: "3 DAYS", height: 0.36 }]} />
          <Hero position={P(-11.7, 0.04, 5.3)} rotationY={WEST + 0.5} animation="idle" face="frown" headPitch={-0.3}>
            <Drops top={[0, 0.05, 0]} t={t} height={0.5} spread={0.05} n={3} speed={1.5} />
          </Hero>
          <Towel position={P(-11.7, 1.02, 5.3)} color="#f6f2e6" size={[0.52, 0.06, 0.3]} />
          <Kid n={6} position={P(-9.5 - t * 2.4, 0.04, 2.2)} rotationY={WEST} animation="run" animDistance={t * 2.4} face="laugh" />
        </>
      ),
    },
  ],
});

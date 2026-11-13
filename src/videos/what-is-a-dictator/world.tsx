import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox } from "../../engine";
import {
  BALCONY_FLOOR, BRIDGE_Z, Banner, Bench, Bridge, CloakStand, Column, EDGE_X, FASCIA, FLOOR, Figure, GATE_X, GREY, HOLE, HOME, Hut, Island, LampPost, PLACE, ROME, SIZE, STAND, STATUE,
  STATUE_BASE, STATUE_SCALE, StoneMan, Sun, VoteBox, on, rome,
} from "./kit";
import { Exhibit1 } from "./scene1";
import { Exhibit2 } from "./scene2";
import { Exhibit3 } from "./scene3";
import { Exhibit4 } from "./scene4";
import { Exhibit5 } from "./scene5";
import { Exhibit6 } from "./scene6";
import { Exhibit7 } from "./scene7";

/**
 * THE WORLD: three islands in one sky, and everything that happens on them (PLACE, in kit.tsx, says which is which).
 *
 * Two kinds of thing are mounted here, and both are here for the WHOLE film, because the camera flies:
 * it still sees what it has left, and it sees what it is coming to.
 *   1. The sets: the islands and what is fixed on them. This file.
 *   2. The exhibits: the people and things that DO something. One `ExhibitN` in each sceneN.tsx, driven by
 *      the film's clock.
 *
 * The two villages are the SAME square on purpose: the same vote box, the same two places for the piles, the same
 * bench behind them. One is planks under a red roof; the other is stone under one man's banners.
 *
 * 1 unit = 1 block = 1 metre.
 */

/** A few flowers: the cheapest way to say that somebody lives here. */
const Flowers: React.FC<{ at: [number, number, number]; colors?: string[] }> = ({ at, colors = ["#f2d23a", "#f4f1ea", "#ff9a3a"] }) => (
  <>
    {colors.map((color, i) => (
      <group key={i} position={[at[0] + (i - 1) * 0.42 + (i % 2) * 0.1, at[1], at[2] + ((i * 37) % 5) * 0.12]}>
        <Vox kind="leaves" position={[0, 0.12, 0]} size={[0.07, 0.24, 0.07]} />
        <Vox kind="wool" tint={color} position={[0, 0.3, 0]} size={[0.16, 0.14, 0.16]} />
      </group>
    ))}
  </>
);

const STONE_WALL = "#7d7d84";
const MARBLE = "#f1ece0";

/** YOUR VILLAGE. */
const Home: React.FC = () => (
  <>
    <Island position={PLACE.home} size={SIZE.home} seed={1} />
    {/* the village hall, behind the bench */}
    <Hut at={HOME.p(0.5, 0, -3.4)} w={8.4} d={1.5} h={4.4} wall="planks" roof="#8a3b2a" door={3.05} windows={[-3.15]} />
    <Bench position={HOME.box} floor="planks" />
    <VoteBox position={HOME.box} />
    {/* the new bridge, off the west edge, with a hole where two planks were never nailed down (Exhibit2 has those) */}
    <Bridge from={HOME.p(EDGE_X + 0.3, 0, BRIDGE_Z)} to={HOME.p(HOLE[0], 0, BRIDGE_Z)} />
    <Bridge from={HOME.p(HOLE[1], 0, BRIDGE_Z)} to={HOME.p(-9.4, 0, BRIDGE_Z)} />
    {/* the rope rails run on over the hole: it is a hole IN a bridge, not the end of one */}
    {[-1, 1].map((side) => (
      <Block key={side} position={HOME.p((HOLE[0] + HOLE[1]) / 2, 0.78, BRIDGE_Z + side * 0.66)} size={[HOLE[0] - HOLE[1], 0.05, 0.05]} color="#6a4a2a" castShadow={false} />
    ))}
    <Island position={HOME.p(-10.8, 0, BRIDGE_Z)} size={[3, 3]} seed={7} layers={2} />
    <Tree position={HOME.p(-11.0, 0, BRIDGE_Z - 0.3)} height={2.8} spread={0.7} />
    {/* the rest of the village */}
    <Hut at={HOME.p(6.0, 0, -1.9)} w={3} d={2.4} h={2.8} roof="#3f6fa8" door={-0.5} windows={[0.75]} turn={-0.2} />
    <Hut at={HOME.p(7.3, 0, 1.6)} w={2.2} d={1.8} h={2.3} wall="cobble" roof="#4a6a3a" turn={-1.25} />
    <Tree position={HOME.p(8.4, 0, -3.5)} height={3.8} />
    <Tree position={HOME.p(9.1, 0, 1.4)} height={3.0} spread={0.75} leaf="#4a8c33" />
    <LampPost position={HOME.p(4.5, 0, -2.9)} seed={2} />
    <Flowers at={HOME.p(1.9, 0, 3.0)} />
    <Flowers at={HOME.p(-1.9, 0, 3.3)} colors={["#f4f1ea", "#f2d23a"]} />
    <Flowers at={HOME.p(5.2, 0, 0.4)} colors={["#ff9a3a", "#f4f1ea", "#f2d23a"]} />
  </>
);

/** A wall of the stone hall: from `x0` to `x1` along the front, `y0` to `y1` high. */
const Wall: React.FC<{ x0: number; x1: number; y0?: number; y1?: number }> = ({ x0, x1, y0 = 0, y1 = 4.2 }) => (
  <Vox kind="stoneBrick" tint={STONE_WALL} tile={1} position={GREY.p((x0 + x1) / 2, (y0 + y1) / 2, -4.3)} size={[x1 - x0, y1 - y0, 1.8]} />
);

/** THE OTHER VILLAGE: one long hall with a gate through it, a tower over the gate, and a balcony on the tower. */
const Grey: React.FC = () => {
  const dark = "#08080a";
  return (
    <>
      <Island position={PLACE.grey} size={SIZE.grey} seed={4} top="cobble" under="stone" layers={4} />
      {/* the hall, round the gate and round the door behind the bench */}
      <Wall x0={-8} x1={GATE_X - 1.2} />
      <Wall x0={GATE_X - 1.2} x1={GATE_X + 1.2} y0={3.0} />
      <Wall x0={GATE_X + 1.2} x1={-1.7} />
      <Wall x0={-1.7} x1={-0.8} y1={1.0} />
      <Wall x0={-1.7} x1={-0.8} y0={3.0} />
      <Wall x0={-0.8} x1={3.8} />
      <Vox kind="stone" tint="#66666d" position={GREY.p(-7.2, 4.32, -4.3)} size={[1.8, 0.24, 2.0]} />
      <Vox kind="stone" tint="#66666d" position={GREY.p(0.6, 4.32, -4.3)} size={[6.6, 0.24, 2.0]} />
      {/* the door behind the bench: dark, and whoever goes in is gone */}
      <Block position={GREY.p(-1.25, 2.0, -3.52)} size={[0.9, 2.0, 0.05]} color={dark} castShadow={false} />
      {/* the gate: a passage with no light in it, long enough to hold three ranks */}
      {[-1, 1].map((side) => (
        <Block key={side} position={GREY.p(GATE_X + side * 1.25, 1.5, -6.9)} size={[0.1, 3.0, 7.0]} color={dark} castShadow={false} />
      ))}
      <Block position={GREY.p(GATE_X, 3.05, -6.9)} size={[2.6, 0.1, 7.0]} color={dark} />
      <Block position={GREY.p(GATE_X, 1.5, -10.4)} size={[2.6, 3.1, 0.1]} color={dark} castShadow={false} />
      <Vox kind="cobble" tint="#4a4a50" position={GREY.p(GATE_X, -0.06, -7.8)} size={[2.5, 0.1, 5.2]} />
      {/* the tower over it */}
      <Vox kind="stoneBrick" tint={STONE_WALL} position={GREY.p(GATE_X, 6.1, -4.3)} size={[3.6, 3.8, 1.8]} />
      {[-1.5, -0.5, 0.5, 1.5].map((x) => (
        <Vox key={x} kind="stoneBrick" tint="#6f6f76" position={GREY.p(GATE_X + x, 8.3, -3.7)} size={[0.6, 0.6, 0.6]} />
      ))}
      <Block position={GREY.p(GATE_X, BALCONY_FLOOR + 1.05, -3.385)} size={[1.05, 2.1, 0.05]} color={dark} castShadow={false} />
      {/* the balcony: a floor, a rail on three sides, and a stone front for a word */}
      <Vox kind="stone" tint="#66666d" position={GREY.p(GATE_X, BALCONY_FLOOR - 0.125, -2.8)} size={[3.4, 0.25, 1.2]} />
      <Vox kind="stone" tint="#4c4c55" position={[FASCIA[0], FASCIA[1], FASCIA[2] - 0.04]} size={[3.5, 0.95, 0.1]} />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Vox kind="stone" tint="#4c4c55" position={GREY.p(GATE_X + side * 1.7, BALCONY_FLOOR + 0.275, -2.8)} size={[0.1, 0.55, 1.2]} />
          <Vox kind="stone" tint="#5a5a62" position={GREY.p(GATE_X + side * 1.35, 3.72, -2.9)} size={[0.3, 0.42, 0.95]} />
        </group>
      ))}
      {/* his banners */}
      <Banner position={GREY.p(GATE_X - 1.35, 7.75, -3.35)} width={0.72} length={2.5} />
      <Banner position={GREY.p(GATE_X + 1.35, 7.75, -3.35)} width={0.72} length={2.5} />
      <Banner position={GREY.p(-7.05, 3.95, -3.35)} width={0.8} length={2.6} />
      <Banner position={GREY.p(2.75, 3.95, -3.35)} width={0.8} length={2.4} />
      {/* the same bench as at home, in stone (the vote box is Exhibit4's: something happens to it) */}
      <Bench position={GREY.box} floor="stoneBrick" tint="#8a8a90" />
      {/* the statue, at the west end: two steps, a block, and the stone man on it */}
      <Vox kind="stoneBrick" position={[STATUE[0], STATUE[1] + 0.25, STATUE[2]]} size={[3.6, 0.5, 3.6]} />
      <Vox kind="stoneBrick" position={[STATUE[0], STATUE[1] + 0.75, STATUE[2]]} size={[2.8, 0.5, 2.8]} />
      <Vox kind="stone" tint="#9a9a9f" tile={2} position={[STATUE[0], STATUE[1] + 1.6, STATUE[2]]} size={[1.8, STATUE_BASE - 1.0, 1.8]} />
      <StoneMan position={[STATUE[0], STATUE[1] + STATUE_BASE, STATUE[2]]} scale={STATUE_SCALE} />
      <Banner position={[STATUE[0], STATUE[1] + 2.08, STATUE[2] + 0.93]} width={0.86} length={0.96} />
      {/* the rest of it */}
      <Hut at={GREY.p(5.6, 0, -2.6)} w={2.8} d={2.2} h={3} wall="stone" roof="#4a4648" door={0.4} windows={[-0.7]} />
      <Hut at={GREY.p(6.5, 0, 1.7)} w={2.2} d={1.7} h={2.4} wall="cobble" roof="#3d3a40" turn={-1.25} />
      <LampPost position={GREY.p(4.3, 0, 3.0)} seed={5} />
    </>
  );
};

/** ROME: six steps, a floor, four columns in front of a red wall, and a beam with the word on it. */
const Rome: React.FC = () => (
  <>
    <Island position={PLACE.rome} size={SIZE.rome} seed={6} top="sand" under="sand" layers={4} />
    {/* the floor, and the steps down to the south */}
    <Vox kind="stoneBrick" tint={MARBLE} position={rome(0, FLOOR / 2, -1.3)} size={[7.0, FLOOR, 3.4]} />
    {[1, 2, 3, 4, 5].map((k) => (
      <Vox key={k} kind="stoneBrick" tint={k % 2 ? "#e6e0d2" : MARBLE} position={rome(0, (FLOOR - 0.3 * k) / 2, 0.4 + 0.45 * k - 0.225)} size={[7.0, FLOOR - 0.3 * k, 0.45]} />
    ))}
    {/* the wall behind, in the red the Romans painted theirs */}
    <Vox kind="wool" tint="#b4533c" position={rome(0, FLOOR + 1.5, -2.85)} size={[7.0, 3.0, 0.3]} />
    <Vox kind="stone" tint="#e6e0d2" position={rome(0, FLOOR + 0.25, -2.66)} size={[7.0, 0.5, 0.1]} />
    {[-3.05, -1.75, 1.75, 3.05].map((x) => (
      <Column key={x} position={rome(x, FLOOR, -1.9)} height={3.0} />
    ))}
    {/* the beam, and the word: the same eight letters, two thousand years older */}
    <Vox kind="stone" tint={MARBLE} tile={2} position={rome(0, FLOOR + 3.45, -1.9)} size={[7.4, 0.9, 0.9]} />
    <Figure text="DICTATOR" position={rome(0, FLOOR + 3.45, -1.42)} height={0.5} maxWidth={4.5} depth={0.45} color="#4f463c" shadow={false} castShadow={false} />
    {[7.8, 6.2, 4.6, 3.0, 1.4].map((w, i) => (
      <Vox key={w} kind="stone" tint={i % 2 ? "#e6e0d2" : MARBLE} tile={2} position={rome(0, FLOOR + 4.07 + i * 0.34, -1.9)} size={[w, 0.34, 1.0]} />
    ))}
    <CloakStand position={STAND} />
    <Tree position={rome(-5.6, 0, -1.6)} height={3.2} spread={0.6} leaf="#4d6b3a" />
    <Tree position={rome(5.7, 0, 0.6)} height={2.7} spread={0.55} leaf="#56733f" />
  </>
);

/** Rocks with a tree on them, a long way off: nothing happens there. They are what makes the sky deep. */
const FAR: Array<{ at: [number, number, number]; size: [number, number]; tree?: number; seed: number }> = [
  { at: [-14, 8, -34], size: [4, 3], tree: 2.6, seed: 21 },
  { at: [6, 10, -40], size: [3, 3], seed: 22 },
  { at: [30, 9, -36], size: [5, 4], tree: 3.2, seed: 23 },
  { at: [44, 5, -26], size: [4, 4], tree: 2.8, seed: 24 },
  { at: [12, -9, -24], size: [4, 3], seed: 25 },
  { at: [36, -22, -14], size: [4, 4], tree: 3, seed: 26 },
  { at: [10, -26, -8], size: [3, 3], seed: 27 },
  { at: [-22, -4, -22], size: [4, 3], tree: 2.6, seed: 28 },
];

/** Cloud to fall through: two banks, either side of the way down from the balcony to Rome. */
const BANKS: Array<{ at: [number, number, number]; size: [number, number, number] }> = [
  { at: [16.6, -7, 15], size: [9, 1.5, 7] },
  { at: [14.5, -8.2, 12], size: [5, 1.2, 4] },
  { at: [30.2, -6.4, 19], size: [10, 1.6, 8] },
  { at: [33, -7.8, 15], size: [6, 1.3, 5] },
  { at: [23, -5.2, 2], size: [8, 1.4, 5] },
];

export const World: React.FC = () => (
  <>
    <Sun />
    <Clouds y={-30} center={[12, 0, -6]} span={180} opacity={0.9} />
    <Clouds y={36} center={[12, 0, -34]} span={210} />
    {BANKS.map((b, i) => (
      <group key={i} position={b.at}>
        <Block size={b.size} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.25} opacity={0.93} transparent castShadow={false} receiveShadow={false} />
        <Block position={[b.size[0] * 0.18, b.size[1] * 0.7, -b.size[2] * 0.1]} size={[b.size[0] * 0.5, b.size[1], b.size[2] * 0.55]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.25} opacity={0.93} transparent castShadow={false} receiveShadow={false} />
      </group>
    ))}
    <Home />
    <Grey />
    <Rome />
    {FAR.map((rock) => (
      <group key={rock.seed}>
        <Island position={rock.at} size={rock.size} seed={rock.seed} layers={2} />
        {rock.tree ? <Tree position={[rock.at[0] - 0.4, rock.at[1], rock.at[2] + 0.2]} height={rock.tree} spread={0.75} /> : null}
      </group>
    ))}

    {/* Every exhibit of the film, mounted for the whole film. */}
    <Exhibit1 />
    <Exhibit2 />
    <Exhibit3 />
    <Exhibit4 />
    <Exhibit5 />
    <Exhibit6 />
    <Exhibit7 />

    {/* Atmosphere is not optional: a ray, a pool of light, a glow and dust on every island the lens rests on. */}
    <GodRay position={HOME.p(2.6, 6, -1)} rotation={[0, 0, -0.45]} width={4.5} height={12} color="#fff0c8" opacity={0.07} />
    <LightPool position={HOME.p(0, 0.03, 1.4)} width={7} depth={4.6} color="#fff2c8" opacity={0.16} />
    <LightPool position={HOME.p(-3.6, 0.03, 0)} width={3.4} depth={3.6} color="#fff2c8" opacity={0.14} />
    <Glow position={[HOME.slot[0], HOME.slot[1] + 0.2, HOME.slot[2] + 0.3]} size={1.9} color="#ffe08a" opacity={0.2} />
    <Dust position={on(PLACE.home, 0, 2.4, 0)} area={[14, 5, 9]} count={54} size={0.04} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
    <LightPool position={GREY.p(0, 0.03, 1.4)} width={7} depth={4.6} color="#dfe6f2" opacity={0.12} />
    <LightPool position={GREY.p(GATE_X, 0.03, 0.8)} width={5} depth={4.4} color="#dfe6f2" opacity={0.12} />
    <GodRay position={GREY.p(GATE_X - 2.2, 8, -1.5)} rotation={[0, 0, 0.42]} width={4} height={13} color="#e9eefa" opacity={0.055} />
    <Glow position={GREY.p(GATE_X, BALCONY_FLOOR + 1.4, -2.2)} size={3.2} color="#b98aff" opacity={0.13} />
    <Dust position={on(PLACE.grey, 0, 3, 0)} area={[19, 7, 9]} count={60} size={0.045} color="#e6ecf5" opacity={0.5} seed={11} speed={0.25} />
    <LightPool position={rome(0, FLOOR + 0.03, -0.6)} width={6.6} depth={3} color="#ffe9b0" opacity={0.2} />
    <GodRay position={rome(-2.6, 8.5, 0.5)} rotation={[0, 0, 0.45]} width={4.5} height={12} color="#ffe6b0" opacity={0.075} />
    <Glow position={rome(0, FLOOR + 3.4, -1.2)} size={5} color="#ffe2a8" opacity={0.12} />
    <Dust position={[ROME[0], ROME[1] + 3.4, ROME[2]]} area={[12, 6, 8]} count={50} size={0.045} color="#ffeec0" opacity={0.6} seed={7} speed={0.2} />
  </>
);

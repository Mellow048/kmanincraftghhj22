import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, PixelText, Tree, Vox } from "../../engine";
import { CREEP, Hut, Island, LampPost, NOW, NoteHeap, PLACE, PRESS, Plinth, RACK, Rack, SIZE, STAGE, STAGE_TOP, ShopSet, Sun, THEN, TOTEM, TOTEM_HIGH, on } from "./kit";
import { Exhibit1 } from "./scene1";
import { Exhibit2 } from "./scene2";
import { Exhibit3 } from "./scene3";
import { Exhibit4 } from "./scene4";
import { Exhibit5 } from "./scene5";
import { Exhibit6 } from "./scene6";
import { Exhibit7 } from "./scene7";

/**
 * THE WORLD: five islands in one sky, and everything that happens on them (PLACE, in kit.tsx, says which is which).
 *
 * Two kinds of thing are mounted here, and both are here for the WHOLE film, because the camera flies:
 * it still sees what it has left, and it sees what it is coming to.
 *   1. The sets: the islands and what is fixed on them. This file.
 *   2. The exhibits: the people and things that DO something. One `ExhibitN` in each sceneN.tsx, driven by
 *      the film's clock.
 *
 * 1 unit = 1 block = 1 metre.
 */

/** A few flowers: the cheapest way to say that somebody lives here. */
const Flowers: React.FC<{ at: [number, number, number]; colors?: string[] }> = ({ at, colors = ["#e8433a", "#f2d23a", "#f4f1ea"] }) => (
  <>
    {colors.map((color, i) => (
      <group key={i} position={[at[0] + (i - 1) * 0.42 + (i % 2) * 0.1, at[1], at[2] + ((i * 37) % 5) * 0.12]}>
        <Vox kind="leaves" position={[0, 0.12, 0]} size={[0.07, 0.24, 0.07]} />
        <Vox kind="wool" tint={color} position={[0, 0.3, 0]} size={[0.16, 0.14, 0.16]} />
      </group>
    ))}
  </>
);

/** A name over a door. */
const Board: React.FC<{ text: string; at: [number, number, number] }> = ({ text, at }) => {
  const w = 0.3 + text.length * 0.27;
  return (
    <group position={at}>
      <Block size={[w + 0.1, 0.5, 0.08]} color="#5c3f24" />
      <Block position={[0, 0, 0.03]} size={[w, 0.4, 0.05]} color="#f6ecd2" emissive="#f6ecd2" emissiveIntensity={0.2} castShadow={false} />
      <PixelText text={text} position={[0, 0, 0.062]} height={0.34} maxWidth={w - 0.1} color="#3b2a16" />
    </group>
  );
};

const Sets: React.FC = () => (
  <>
    {/* ---- now: the baker's stall, and home ---- */}
    <Island position={PLACE.now} size={SIZE.now} seed={1} />
    <ShopSet at={NOW} name="TODAY" />
    <Tree position={on(PLACE.now, -3.75, 0, -2.5)} height={3.4} />
    <Hut at={on(PLACE.now, 3.85, 0, -1.3)} w={2.6} d={2} h={2.7} wall="planks" roof="#3f6fa8" door={0} />
    <LampPost position={on(PLACE.now, 5.1, 0, -3.0)} seed={2} />
    <Flowers at={on(PLACE.now, -3.4, 0, 2.5)} />
    <Flowers at={on(PLACE.now, 1.6, 0, 3.0)} colors={["#f2d23a", "#e8433a"]} />

    {/* ---- then: the same stall, when your mom was your age. Drier grass, an older tree: the same place, earlier ---- */}
    <Island position={PLACE.then} size={SIZE.then} seed={4} tint="#93a653" />
    <ShopSet at={THEN} name="THEN" />
    <LampPost position={on(PLACE.then, 3.4, 0, 2.2)} seed={4} />
    <Flowers at={on(PLACE.then, -3.2, 0, 2.2)} colors={["#f4f1ea", "#f2d23a", "#f4f1ea"]} />

    {/* ---- village: three huts round a square, and the rack in the middle of it ---- */}
    <Island position={PLACE.village} size={SIZE.village} seed={2} />
    <Rack />
    <Hut at={on(PLACE.village, -2.9, 0, -1.9)} w={2.6} d={2} h={2.6} roof="#8a3b2a" turn={0.25} windows={[]} />
    <Hut at={on(PLACE.village, 3.2, 0, -2.0)} w={2.4} d={1.9} h={2.4} wall="cobble" roof="#4a6a3a" turn={-0.25} />
    <Hut at={on(PLACE.village, -4.2, 0, 1.6)} w={2.2} d={1.6} h={2.2} roof="#3f6fa8" turn={1.2} />
    <Tree position={on(PLACE.village, 4.3, 0, -3.3)} height={3.4} leaf="#4a8c33" />
    <LampPost position={on(PLACE.village, 4.3, 0, 3.2)} seed={6} />
    <Flowers at={on(PLACE.village, -2.6, 0, 3.3)} />
    {/* ---- real: a stage with the two machines on it, the mint behind on the left, the bakery on the right ---- */}
    <Island position={PLACE.real} size={SIZE.real} seed={3} layers={4} />
    <Vox kind="stoneBrick" position={[STAGE[0], STAGE[1] + STAGE_TOP / 2, STAGE[2]]} size={[4.2, STAGE_TOP, 2.2]} />
    <Vox kind="stone" position={[STAGE[0], STAGE[1] + STAGE_TOP + 0.02, STAGE[2]]} size={[4.4, 0.08, 2.4]} />
    <Vox kind="stone" position={[STAGE[0] - 0.95, STAGE[1] + STAGE_TOP + 0.315, STAGE[2] - 0.1]} size={[1.5, 0.63, 1.1]} />
    <Hut at={on(PLACE.real, -3.5, 0, -0.6)} w={3.6} d={2.8} h={3.3} wall="stoneBrick" roof="#3a4a5a" door={0.6} windows={[-0.95]} />
    <Hut at={on(PLACE.real, 3.5, 0, -0.6)} w={3.6} d={2.8} h={3.3} wall="bricks" roof="#8a3b2a" door={-0.6} windows={[0.95]} />
    <Board text="MINT" at={on(PLACE.real, -2.9, 2.75, -0.3)} />
    <Board text="BAKERY" at={on(PLACE.real, 2.9, 2.75, -0.3)} />
    <Plinth position={[CREEP[0], CREEP[1] - 1.0, CREEP[2]]} height={1} width={0.95} />
    <Tree position={on(PLACE.real, -5.7, 0, 3.1)} height={3.8} />
    <Tree position={on(PLACE.real, 5.9, 0, -3.6)} height={4.2} leaf="#4a8c33" />
    <LampPost position={on(PLACE.real, -2.9, 0, 4.4)} seed={8} />
    <LampPost position={on(PLACE.real, 2.9, 0, 4.4)} seed={9} />
    <Flowers at={on(PLACE.real, 4.6, 0, 3.6)} />

    {/* ---- old: Germany, 1923. Stone, no grass: grey houses, and heaps of notes nobody picks up ---- */}
    <Island position={PLACE.old} size={SIZE.old} seed={5} top="cobble" under="stone" />
    <Hut at={on(PLACE.old, -3.6, 0, -1.2)} w={3} d={2.4} h={3} wall="stone" roof="#4a4648" door={0.4} windows={[-0.75]} />
    <Hut at={on(PLACE.old, 3.6, 0, -1.6)} w={2.8} d={2.2} h={2.8} wall="cobble" roof="#3d3a40" door={-0.5} />
    <Plinth position={TOTEM} height={TOTEM_HIGH} width={0.92} />
    <NoteHeap position={[PRESS[0] - 3.3, PRESS[1], PRESS[2] + 1.2]} count={9} spread={[0.9, 0.9]} seed={4} />
    <NoteHeap position={[PRESS[0] + 2.3, PRESS[1], PRESS[2] + 2.0]} count={6} spread={[0.7, 0.7]} seed={6} />
    <NoteHeap position={[TOTEM[0] - 1.2, TOTEM[1], TOTEM[2] + 1.6]} count={5} spread={[0.6, 0.6]} seed={8} />
    <LampPost position={on(PLACE.old, 4.9, 0, 3.7)} seed={11} />
  </>
);

/** Rocks with a tree on them, a long way off: nothing happens there. They are what makes the sky deep. */
const FAR: Array<{ at: [number, number, number]; size: [number, number]; tree?: number; seed: number }> = [
  { at: [-8, 5, -24], size: [4, 3], tree: 2.6, seed: 21 },
  { at: [12, 9, -30], size: [3, 3], seed: 22 },
  { at: [-22, 1, -26], size: [5, 4], tree: 3.2, seed: 23 },
  { at: [-40, 9, -24], size: [4, 4], tree: 2.8, seed: 24 },
  { at: [-26, -9, 24], size: [4, 3], seed: 25 },
  { at: [16, -8, -18], size: [4, 4], tree: 3, seed: 26 },
  { at: [-12, -12, -16], size: [3, 3], seed: 27 },
];

export const World: React.FC = () => (
  <>
    <Sun />
    <Clouds y={-20} center={[-6, 0, -8]} span={170} opacity={0.9} />
    <Clouds y={36} center={[-6, 0, -34]} span={210} />
    <Sets />
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
    <GodRay position={on(PLACE.now, -2.4, 5.5, -1)} rotation={[0, 0, 0.5]} width={4} height={11} color="#fff0c8" opacity={0.07} />
    <LightPool position={on(PLACE.now, -0.2, 0.03, 1.2)} width={6.5} depth={4.6} color="#fff2c8" opacity={0.16} />
    <Glow position={[NOW.loaf[0], NOW.loaf[1] + 0.3, NOW.loaf[2] + 0.2]} size={1.7} color="#ffe08a" opacity={0.22} />
    <Dust position={on(PLACE.now, 0, 2, 0)} area={[9, 4, 7]} count={40} size={0.04} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
    <LightPool position={on(PLACE.then, -0.2, 0.03, 1.0)} width={6} depth={4.2} color="#ffe9b0" opacity={0.18} />
    <Glow position={[THEN.loaf[0], THEN.loaf[1] + 0.3, THEN.loaf[2] + 0.2]} size={1.7} color="#ffe08a" opacity={0.22} />
    <Dust position={on(PLACE.then, 0, 2, 0)} area={[8, 4, 6]} count={36} size={0.04} color="#ffeec0" opacity={0.6} seed={5} speed={0.2} />
    <LightPool position={[RACK[0], RACK[1] + 0.03, RACK[2] + 1.4]} width={6} depth={4.4} color="#fff2c8" opacity={0.17} />
    <Dust position={on(PLACE.village, 0, 2.4, 0)} area={[10, 5, 8]} count={44} size={0.04} color="#fff7d8" opacity={0.6} seed={7} speed={0.2} />
    <LightPool position={[STAGE[0], PLACE.real[1] + 0.03, STAGE[2] + 2.4]} width={8} depth={5} color="#fff2c8" opacity={0.17} />
    <GodRay position={on(PLACE.real, 2.4, 7, 0.5)} rotation={[0, 0, -0.45]} width={4.5} height={12} color="#fff0c8" opacity={0.06} />
    <Dust position={on(PLACE.real, 0, 3, 1)} area={[12, 6, 9]} count={50} size={0.045} color="#fff7d8" opacity={0.6} seed={9} speed={0.2} />
    <LightPool position={[TOTEM[0] - 1.5, PLACE.old[1] + 0.03, TOTEM[2] + 0.4]} width={8} depth={5} color="#dfe6f2" opacity={0.14} />
    <Dust position={on(PLACE.old, 0, 3, 2)} area={[11, 6, 9]} count={46} size={0.045} color="#e6ecf5" opacity={0.55} seed={11} speed={0.25} />
  </>
);

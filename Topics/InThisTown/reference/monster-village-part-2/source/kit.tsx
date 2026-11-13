import type React from "react";
import { Block, Glow, PixelText } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { wordClock } from "../../../Topics/InThisTown";
import { Bus, Dad, Folk, Hero, Hiss, Mum, Postman, hillY } from "../in-this-town-monster-village/kit";
import timingJson from "./timing.json";

/**
 * Part two's kit. The people, the village and every helper are part one's (../in-this-town-monster-village/kit),
 * passed on from here so a scene imports only from "./kit". What is new is below: this film's clock, the pig farm,
 * the hideout under it, and the things in them.
 */
export * from "../in-this-town-monster-village/kit";
export { Chicken } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
/** Seconds into its shot at which a word is said. This film's clock, not part one's. */
export const wordAt = wordClock(timing);
/** Seconds a cue lasts. */
export const dur = (cue: string): number => {
  const c = timing.cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 1;
};

export const WARM = "warm-room";

// ----------------------------------------------------------------------------- places

/** The wrecked pig farm, east of the village past the pond. Its middle, which is also where the door in the mud is. */
export const FARM: Vec3 = [52, 0, 8];
/** The tree he hides behind, on the south side of the road. */
export const TREE: Vec3 = [24.5, 0, 4.6];
/** The hideout's big room: its own zone, far north of everything. x −12…14, z −7…14. No south wall. */
export const HIDE: Vec3 = [0, 0, -140];
export const h = (x: number, y: number, z: number): Vec3 => [HIDE[0] + x, HIDE[1] + y, HIDE[2] + z];
/** The corridor of rooms. Doors on its north wall at x = 0, 2.5, 5, 7.5; the last door, with no name, at x = 10. */
export const HALL: Vec3 = [40, 0, -140];
export const hall = (x: number, y: number, z: number): Vec3 => [HALL[0] + x, HALL[1] + y, HALL[2] + z];
/** Mo's room. The bed is along the north wall, its pillow at x = −1.7. */
export const MOROOM: Vec3 = [80, 0, -140];
export const mr = (x: number, y: number, z: number): Vec3 => [MOROOM[0] + x, MOROOM[1] + y, MOROOM[2] + z];
/** In the big room: the foot of the ladder, the well, the three pens (chickens, cows, pigs), the shelves. */
export const LADDER: Vec3 = h(3, 0, 2);
export const WELL: Vec3 = h(-7, 0, -2.4);
export const PEN_X = [7.6, 9.8, 12.1];
export const SHELF_X = -2;
/** Where the diary lies, on the pillow, and where he stands to read it. */
export const DIARY: Vec3 = mr(-1.7, 0.7, -1.9);
export const READ: Vec3 = mr(-1.7, 0, -0.95);

export const ZONES = {
  farmNight: "village+farm+night",
  farmDawn: "village+farm+day",
  night: "village+farm+night",
  dawn: "village+farm+day",
  hide: "hide",
  hall: "hall",
  room: "moroom+moroomN",
  roomFromBed: "moroom+moroomS",
  pit: "pit",
};

// ----------------------------------------------------------------------------- things

const MUD = "#5b4331";
const MUD_DARK = "#463225";

/**
 * The door in the mud. Shut (`k` 0) it is one more patch of mud. `k` is radians open: it is hinged on its north
 * edge, so it lifts towards a camera in the south, and its underside is clean planks.
 */
export const MudDoor: React.FC<{ k?: number; glow?: number }> = ({ k = 0, glow = 0 }) => (
  <group position={FARM}>
    {k > 0.02 ? <Block position={[0, 0.045, 0]} size={[1.6, 0.03, 1.6]} color="#070504" castShadow={false} /> : null}
    {glow > 0 ? <pointLight position={[0, 0.5, 0.2]} color="#ffb060" intensity={glow} distance={5} decay={2} /> : null}
    <group position={[0, 0.06, -0.85]} rotation={[-k, 0, 0]}>
      <Block position={[0, 0.03, 0.85]} size={[1.7, 0.06, 1.7]} color={MUD} />
      <Block position={[-0.35, 0.065, 0.6]} size={[0.6, 0.02, 0.45]} color={MUD_DARK} castShadow={false} />
      <Block position={[0.4, 0.065, 1.2]} size={[0.5, 0.02, 0.4]} color={MUD_DARK} castShadow={false} />
      <Block position={[0, -0.01, 0.85]} size={[1.6, 0.03, 1.6]} color="#b8894e" castShadow={false} />
      <Block position={[0, -0.03, 0.3]} size={[1.6, 0.03, 0.12]} color="#7a5632" castShadow={false} />
      <Block position={[0, -0.03, 1.4]} size={[1.6, 0.03, 0.12]} color="#7a5632" castShadow={false} />
    </group>
  </group>
);

/** A pig. */
export const Pig: React.FC<{ position: Vec3; rotationY?: number; scale?: number; hop?: number }> = ({ position, rotationY = 0, scale = 1, hop = 0 }) => (
  <group position={[position[0], position[1] + hop, position[2]]} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.46, 0]} size={[0.5, 0.44, 0.86]} color="#f0a6a2" />
    <Block position={[0, 0.56, 0.56]} size={[0.44, 0.42, 0.4]} color="#f2b0ac" />
    <Block position={[0, 0.5, 0.78]} size={[0.22, 0.16, 0.08]} color="#d98782" />
    <Block position={[-0.12, 0.64, 0.765]} size={[0.07, 0.07, 0.01]} color="#111111" castShadow={false} />
    <Block position={[0.12, 0.64, 0.765]} size={[0.07, 0.07, 0.01]} color="#111111" castShadow={false} />
    {[[-0.16, 0.3], [0.16, 0.3], [-0.16, -0.3], [0.16, -0.3]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.13, z]} size={[0.16, 0.26, 0.16]} color="#e59a96" />
    ))}
  </group>
);

/** A cow. */
export const Cow: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.84, 0]} size={[0.62, 0.62, 1.1]} color="#f4f1ea" />
    <Block position={[0.2, 0.95, 0.15]} size={[0.24, 0.42, 0.5]} color="#4a3324" castShadow={false} />
    <Block position={[-0.22, 0.8, -0.3]} size={[0.2, 0.4, 0.36]} color="#4a3324" castShadow={false} />
    <Block position={[0, 1.02, 0.72]} size={[0.46, 0.46, 0.38]} color="#4a3324" />
    <Block position={[0, 0.92, 0.93]} size={[0.3, 0.2, 0.06]} color="#f0c8c0" />
    <Block position={[-0.12, 1.1, 0.915]} size={[0.07, 0.07, 0.01]} color="#111111" castShadow={false} />
    <Block position={[0.12, 1.1, 0.915]} size={[0.07, 0.07, 0.01]} color="#111111" castShadow={false} />
    <Block position={[-0.27, 1.27, 0.7]} size={[0.08, 0.14, 0.08]} color="#e8e0d0" />
    <Block position={[0.27, 1.27, 0.7]} size={[0.08, 0.14, 0.08]} color="#e8e0d0" />
    {[[-0.2, 0.4], [0.2, 0.4], [-0.2, -0.4], [0.2, -0.4]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.27, z]} size={[0.18, 0.54, 0.18]} color="#f4f1ea" />
    ))}
  </group>
);

/** Mo's iron helmet, off his head. `position` is its middle. */
export const IronHelmet: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number }> = ({ position, rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.09, 0]} size={[0.57, 0.2, 0.57]} color="#a9b3c0" metalness={0.3} roughness={0.45} />
    <Block position={[0, -0.1, -0.2]} size={[0.57, 0.2, 0.17]} color="#a9b3c0" metalness={0.3} roughness={0.45} />
    <Block position={[0.27, -0.1, -0.03]} size={[0.03, 0.2, 0.2]} color="#a9b3c0" />
    <Block position={[-0.27, -0.1, -0.03]} size={[0.03, 0.2, 0.2]} color="#a9b3c0" />
    <Block position={[0, 0.0, 0.288]} size={[0.57, 0.035, 0.015]} color="#8d96a2" />
    <Block position={[0, -0.05, 0]} size={[0.5, 0.1, 0.4]} color="#1c1c22" castShadow={false} />
  </group>
);

/**
 * Mo's diary. `open` 0 is shut, 1 is open flat. `flip` is a page turning, 0–1. `big` writes the one line large on
 * the right-hand page, for the shot that reads it. `position` is the middle of the book; its top is to the north.
 */
export const Diary: React.FC<{ position: Vec3; open?: number; flip?: number; big?: boolean }> = ({ position, open = 0, flip = 0, big = false }) => {
  const flat: Vec3 = [-Math.PI / 2, 0, 0];
  if (open < 0.05)
    return (
      <group position={position}>
        <Block position={[0, 0.035, 0]} size={[0.3, 0.07, 0.4]} color="#6b3a22" />
        <Block position={[0, 0.036, 0]} size={[0.305, 0.072, 0.07]} color="#c23a2e" castShadow={false} />
      </group>
    );
  const lines = ["I LOVE MY", "MONSTERS."];
  return (
    <group position={position}>
      <Block position={[0, 0.012, 0]} size={[0.62 * open + 0.3 * (1 - open), 0.024, 0.42]} color="#6b3a22" />
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.15 * open, 0.03, 0]}>
          <Block size={[0.28, 0.016, 0.38]} color="#f3ecd8" castShadow={false} />
          {big && s === 1 ? (
            <>
              <PixelText text="I LOVE" position={[0, 0.012, -0.09]} rotation={flat} height={0.062} maxWidth={0.24} color="#2a2a33" />
              <PixelText text="MY" position={[0, 0.012, -0.015]} rotation={flat} height={0.062} maxWidth={0.24} color="#2a2a33" />
              <PixelText text="MONSTERS." position={[0, 0.012, 0.06]} rotation={flat} height={0.062} maxWidth={0.25} color="#2a2a33" />
              {[[-0.03, 0], [0.03, 0], [-0.045, -0.03], [-0.015, -0.03], [0.015, -0.03], [0.045, -0.03], [0, 0.03], [-0.03, 0], [0, 0]].map(([x, z], i) => (
                <Block key={i} position={[x, 0.012, 0.135 + z * 0.9]} size={[0.03, 0.006, 0.028]} color="#c23a2e" castShadow={false} />
              ))}
            </>
          ) : (
            [0, 1, 2, 3].map((row) => (
              <PixelText key={row} text={lines[row % 2]} position={[0, 0.012, -0.12 + row * 0.075]} rotation={flat} height={0.04} maxWidth={0.23} color="#3a3a44" />
            ))
          )}
        </group>
      ))}
      {flip > 0 && flip < 1 ? (
        <group position={[0, 0.04, 0]} rotation={[0, 0, Math.PI * flip]}>
          <Block position={[0.14, 0, 0]} size={[0.28, 0.008, 0.38]} color="#fbf6e6" castShadow={false} />
        </group>
      ) : null}
    </group>
  );
};

/** A small sparkle on a thing as it is named. */
export const Glint: React.FC<{ position: Vec3; t: number; size?: number }> = ({ position, t, size = 0.9 }) =>
  t > 0 && t < 0.5 ? <Glow position={position} size={size * (0.4 + 1.2 * t)} color="#fff4c8" opacity={0.75 * (1 - t / 0.5)} /> : null;

/** The glow of the army's torches behind the hill, as part one left it. */
export const FarFire: React.FC<{ k?: number }> = ({ k = 1 }) => (
  <>
    <Glow position={[-40, 7, 2]} size={22} color="#ff7a2a" opacity={0.3 * k} />
    <pointLight position={[-30, 7.5, 2]} color="#ffa050" intensity={90 * k} distance={24} decay={2} />
  </>
);

/** The village at a run, heading `dir`: the family, the bus, the small ones. `x` is the middle of them, `d` metres run. */
export const Runners: React.FC<{ x: number; d: number; t: number; dir: number; hero?: boolean }> = ({ x, d, t, dir, hero = true }) => {
  const s = dir > 0 ? 1 : -1;
  const at = (dx: number): number => x + s * dx;
  return (
    <>
      {hero ? <Hero position={[at(1.15), 0, 3.3]} rotationY={dir} animation="run" animDistance={d} face="fear" /> : null}
      <Mum position={[at(0.35), 0, 2.3]} rotationY={dir} walk={d} mood="scared" lean={0.2} />
      <Dad position={[at(-0.45), 0, 3.5]} rotationY={dir} walk={d} mood="scared" rattle={0.6} lean={0.2} />
      <Hiss position={[at(-0.95), 0, 1.7]} rotationY={dir} walk={d} mood="scared" lean={0.15} />
      <Postman position={[at(0.75), 0, 0.9]} rotationY={dir} walk={d} lean={0.15} />
      <Bus position={[at(-1.2), Math.abs(Math.sin(t * 9)) * 0.5, 0.2]} rotationY={dir} squash={Math.sin(t * 18) * 0.15} mood="scared" size={1.5} />
      <Folk kind="zombie" n={2} position={[at(1.25), 0, 2.5]} rotationY={dir} walk={d} scale={0.76} mood="scared" />
      <Folk kind="creeper" n={3} position={[at(-0.1), 0, 1.2]} rotationY={dir} walk={d} scale={0.78} mood="scared" />
      <Folk kind="skeleton" n={3} position={[at(-0.2), 0, 4.2]} rotationY={dir} walk={d} mood="scared" rattle={0.5} />
      <Folk kind="zombie" n={4} position={[at(-1.1), 0, 2.9]} rotationY={dir} walk={d} mood="scared" lean={0.2} />
    </>
  );
};

/** hillY, passed on under the name the army wants. */
export const ground = hillY;

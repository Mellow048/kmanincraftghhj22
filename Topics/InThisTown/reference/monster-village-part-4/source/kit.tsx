import type React from "react";
import { Block, PixelText, Vox } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { Pillager, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import { AimSword, Fallen } from "../in-this-town-monster-village-part-3/kit";
import timingJson from "./timing.json";

/**
 * PART FOUR'S KIT. Everything parts one to three had (the family, Mo, the players, the cage, dad) is passed on from
 * part three's kit; what is new here is the castle at NIGHT with a hole in its wall, a ravager, a vex, TNT, a
 * spyglass, a bush, and a skinny hallway. A scene imports only from "./kit".
 */
export * from "../in-this-town-monster-village-part-3/kit";
export { Bubble, IronGolem, Pillager, Puffs, ROBE, Smoke, SubscribeSign, Villager } from "../../../Topics/InThisTown";
export { PixelText } from "../../engine";

export const timing = timingJson as unknown as Timing;
/** Seconds into its shot at which a word is said. */
export const wordAt = wordClock(timing);
export const dur = (cue: string): number => {
  const c = timing.cues.find((x) => x.id === cue);
  if (!c) throw new Error(`no cue ${cue}`);
  return c.end - c.start;
};

export const NIGHT4 = "overworld-night";
export const Z = { fort: "fort", room: "room", out: "out", horde: "horde", hall: "hallway" };

// ----------------------------------------------------------------------------- places
/** The castle yard at night. North wall at z = -14, the gate tower in the middle of it, the HOLE in the east wall. */
export const FORT: Vec3 = [0, 0, 600];
export const f = (x: number, y: number, z: number): Vec3 => [FORT[0] + x, FORT[1] + y, FORT[2] + z];
/** The guard's room. */
export const ROOM4: Vec3 = [60, 0, 600];
export const r = (x: number, y: number, z: number): Vec3 => [ROOM4[0] + x, ROOM4[1] + y, ROOM4[2] + z];
/** Outside the castle wall: a door, a path, a bush. */
export const OUT: Vec3 = [120, 0, 600];
export const o = (x: number, y: number, z: number): Vec3 => [OUT[0] + x, OUT[1] + y, OUT[2] + z];
/** The edge of the forest, as the spyglass sees it. */
export const HORDE: Vec3 = [200, 0, 600];
export const hd = (x: number, y: number, z: number): Vec3 => [HORDE[0] + x, HORDE[1] + y, HORDE[2] + z];
/** The skinny hallway. It runs north (-z) from its door at z = 0. NOT SEEN BEFORE 10.hall. */
export const HALL4: Vec3 = [280, 0, 600];
export const hw = (x: number, y: number, z: number): Vec3 => [HALL4[0] + x, HALL4[1] + y, HALL4[2] + z];
export const HALL_W = 1.7;
export const HALL_LEN = 24;

export const CAGES = [-5, -2.5, 0, 2.5, 5];
export const MYCAGE: Vec3 = f(-5, 0, 0);
export const MOCAGE: Vec3 = f(5, 0, 0);
/** Where the teller is inside his cage. */
export const ME: Vec3 = f(-5, 0.08, 0.3);
/** Where the teacher stands at the cage door. */
export const TEACH: Vec3 = f(-5, 0, 2.0);
/** The hole the TNT makes: 5 wide, in the east wall. */
export const HOLE: Vec3 = f(17.5, 0, -1.5);
/** In front of the big gate in the north wall: where the golem comes out. */
export const GATE: Vec3 = f(0, 0, -11.2);
/** The floor on top of the lookout tower. */
export const LOOK: Vec3 = f(-9, 10.12, -14.2);
/** The door of the keep (west side of the yard). What is behind it is the hallway. */
export const KEEPDOOR: Vec3 = f(-11.9, 0, 6);
/** Where the bus lands. */
export const BUSSPOT: Vec3 = f(-1.8, 0, 3.4);
/** The house the golem and the ravager go through. */
export const HOUSE: Vec3 = f(9.5, 0, -6.5);
/** Where the two meet. */
export const CLASH: Vec3 = f(6, 0, -2.5);
export const BUSH: Vec3 = o(3.2, 0, 3.4);
export const OUTDOOR: Vec3 = o(0, 0, -0.2);

// ----------------------------------------------------------------------------- people
/** A villager guard: a sword in his belt (his hands do not come out of his sleeves), or a torch stuck in it. */
export const VGuard: React.FC<{ position: Vec3; rotationY?: number; n?: number; lookAt?: Vec3; walk?: number; sword?: boolean; lean?: number; nod?: number }> = ({
  position, rotationY = 0, n = 0, lookAt, walk, sword = true, lean, nod,
}) => (
  <>
    <Villager position={position} rotationY={rotationY} robe={[ROBE.brown, ROBE.smith, ROBE.farmer, ROBE.white][n % 4]} lookAt={lookAt} walk={walk} phase={n} lean={lean} nod={nod} />
    {sword ? <AimSword position={[position[0] + Math.cos(rotationY) * 0.42, position[1] + 1.0, position[2] - Math.sin(rotationY) * 0.42]} yaw={rotationY} pitch={-1.45} scale={0.9} /> : null}
  </>
);
/** Somebody flat on his back, feet at `position`, head pointing along `rotationY` + 180°. */
export const Flat: React.FC<{ position: Vec3; rotationY?: number; k?: number; children: React.ReactNode }> = ({ position, rotationY = 0, k = 1, children }) => (
  <Fallen position={position} rotationY={rotationY} k={k}>
    {children}
  </Fallen>
);

// ----------------------------------------------------------------------------- the cage with a door
const IRON = "#3a3d44";
/** A cage like part three's. `front` false leaves the front (+z) bars out: the door is drawn by the shot. */
export const CageBody: React.FC<{ position: Vec3; front?: boolean }> = ({ position, front = true }) => {
  const w = 1.1;
  const bars: Array<[number, number]> = [];
  for (let i = 0; i <= 6; i++) {
    const a = -w + (i * 2 * w) / 6;
    bars.push([a, -w]);
    if (front || i === 0 || i === 6) bars.push([a, w]);
    if (i > 0 && i < 6) bars.push([-w, a], [w, a]);
  }
  return (
    <group position={position}>
      <Block position={[0, 0.04, 0]} size={[2.3, 0.08, 2.3]} color="#6b4a2a" castShadow={false} />
      <Block position={[0, 2.42, 0]} size={[2.4, 0.12, 2.4]} color="#4a3320" />
      {bars.map(([x, z], i) => (
        <Block key={i} position={[x, 1.22, z]} size={[0.07, 2.3, 0.07]} color={IRON} metalness={0.4} roughness={0.5} />
      ))}
      <Block position={[0, 1.25, -w]} size={[2.2, 0.06, 0.05]} color={IRON} castShadow={false} />
      {front ? <Block position={[0, 1.25, w]} size={[2.2, 0.06, 0.05]} color={IRON} castShadow={false} /> : null}
      {[-w, w].map((x) => (
        <Block key={x} position={[x, 1.25, 0]} size={[0.05, 0.06, 2.2]} color={IRON} castShadow={false} />
      ))}
    </group>
  );
};
/** The front of the teller's cage: a door of bars, hinged on its west post. `k` 0 is shut, 1 is wide open. */
export const CageDoor: React.FC<{ k?: number }> = ({ k = 0 }) => (
  <group position={[MYCAGE[0] - 1.1, 0, MYCAGE[2] + 1.1]} rotation={[0, -1.9 * k, 0]}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Block key={i} position={[(i * 2.2) / 6, 1.22, 0]} size={[0.07, 2.3, 0.07]} color={IRON} metalness={0.4} roughness={0.5} />
    ))}
    <Block position={[1.1, 1.25, 0]} size={[2.1, 0.06, 0.05]} color={IRON} castShadow={false} />
    <Block position={[1.95, 1.05, 0.05]} size={[0.16, 0.2, 0.08]} color="#22242a" />
  </group>
);
/** Where the lock is. */
export const LOCK: Vec3 = [MYCAGE[0] + 0.85, 1.05, MYCAGE[2] + 1.2];
/** A gold key. `position` is its middle; it points along +z. */
export const Key: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number }> = ({ position, rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0.08]} size={[0.04, 0.04, 0.24]} color="#f0c23a" emissive="#f0c23a" emissiveIntensity={0.35} />
    <Block position={[0, 0, -0.1]} size={[0.14, 0.14, 0.05]} color="#f0c23a" emissive="#f0c23a" emissiveIntensity={0.35} />
    <Block position={[0, -0.04, 0.17]} size={[0.04, 0.07, 0.04]} color="#d8a820" />
  </group>
);

// ----------------------------------------------------------------------------- beasts
/**
 * A ravager: a grey beast the size of a cart, horns, a jaw that opens. Feet on `position`, facing +Z, about 2.5 m
 * tall. `jaw` 0–1 opens the mouth, `head` pitches the head (radians, + is down), `rider` puts a pillager on it.
 */
export const Ravager: React.FC<{ position: Vec3; rotationY?: number; scale?: number; walk?: number; jaw?: number; head?: number; rider?: boolean; roll?: number }> = ({
  position, rotationY = 0, scale = 1, walk = 0, jaw = 0, head = 0, rider = true, roll = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <group rotation={[0, 0, roll]}>
      {[-0.62, 0.62].map((x) =>
        [-0.95, 0.95].map((z) => (
          <group key={`${x}${z}`} position={[x, 0.95, z]} rotation={[Math.sin(walk * 2.2 + (x * z > 0 ? 0 : Math.PI)) * 0.55, 0, 0]}>
            <Block position={[0, -0.47, 0]} size={[0.52, 0.95, 0.52]} color="#4f5156" />
          </group>
        )),
      )}
      <group position={[0, Math.abs(Math.sin(walk * 2.2)) * 0.07, 0]}>
        <Block position={[0, 1.55, 0]} size={[1.7, 1.25, 2.8]} color="#6a6c72" />
        <Block position={[0, 2.3, 0.55]} size={[1.3, 0.35, 1.2]} color="#5d5f65" />
        <Block position={[0, 2.22, -0.45]} size={[0.95, 0.12, 0.9]} color="#6b4a2a" />
        <group position={[0, 1.6, 1.5]} rotation={[head, 0, 0]}>
          <Block position={[0, 0, 0.4]} size={[1.25, 1.3, 0.95]} color="#74767c" />
          {[-0.5, 0.5].map((x) => (
            <Block key={x} position={[x, 0.82, 0.3]} size={[0.22, 0.55, 0.22]} color="#35363b" />
          ))}
          {[-0.32, 0.32].map((x) => (
            <group key={x}>
              <Block position={[x, 0.22, 0.88]} size={[0.2, 0.13, 0.02]} color="#101014" castShadow={false} />
              <Block position={[x, 0.33, 0.885]} size={[0.3, 0.07, 0.03]} color="#3c3d42" castShadow={false} />
            </group>
          ))}
          <Block position={[0, -0.05, 1.0]} size={[0.32, 0.55, 0.3]} color="#5a5c62" />
          <group position={[0, -0.5, 0.05]} rotation={[jaw * 0.75, 0, 0]}>
            <Block position={[0, -0.13, 0.42]} size={[1.05, 0.26, 0.95]} color="#4a4b50" />
            {[-0.38, -0.13, 0.13, 0.38].map((x) => (
              <Block key={x} position={[x, 0.06, 0.82]} size={[0.12, 0.16, 0.08]} color="#f1efe6" castShadow={false} />
            ))}
          </group>
          {jaw > 0.1 ? <Block position={[0, -0.52, 0.5]} size={[0.9, 0.12, 0.8]} color="#3a1014" castShadow={false} /> : null}
        </group>
        {rider ? <Pillager position={[0, 2.28 - 0.56, -0.45]} sit crossbow armR={-1.2} phase={2} /> : null}
      </group>
    </group>
  </group>
);

/** A vex: small, pale blue, wings, a little sword, and it is angry. `position` is its middle. It faces +Z. */
export const Vex: React.FC<{ position: Vec3; rotationY?: number; scale?: number; t?: number }> = ({ position, rotationY = 0, scale = 1, t = 0 }) => {
  const flap = Math.sin(t * 30) * 0.6;
  return (
    <group position={[position[0], position[1] + Math.sin(t * 7) * 0.04 * scale, position[2]]} rotation={[0.25, rotationY, 0]} scale={scale}>
      <Block position={[0, 0.22, 0]} size={[0.3, 0.3, 0.3]} color="#a9c3d6" emissive="#6f93b0" emissiveIntensity={0.5} />
      <Block position={[0, -0.1, 0]} size={[0.24, 0.36, 0.14]} color="#8fb0c8" emissive="#5f86a6" emissiveIntensity={0.45} />
      {[-0.07, 0.07].map((x) => (
        <Block key={x} position={[x, 0.24, 0.155]} size={[0.07, 0.05, 0.01]} color="#ffffff" emissive="#ff5a5a" emissiveIntensity={1.2} castShadow={false} />
      ))}
      <Block position={[0, 0.14, 0.155]} size={[0.12, 0.03, 0.01]} color="#20303c" castShadow={false} />
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.12, 0.02, -0.08]} rotation={[0, s * (0.5 + flap), 0]}>
          <Block position={[s * 0.2, 0.05, 0]} size={[0.4, 0.3, 0.02]} color="#d9e6ee" emissive="#9fb8c8" emissiveIntensity={0.5} castShadow={false} />
        </group>
      ))}
      <group position={[0.2, -0.08, 0.12]} rotation={[-0.4, 0, 0]}>
        <Block position={[0, 0, 0.18]} size={[0.035, 0.03, 0.36]} color="#e8eef4" emissive="#aab8c4" emissiveIntensity={0.4} />
        <Block position={[0, 0, 0.0]} size={[0.12, 0.03, 0.03]} color="#3c3c44" />
      </group>
    </group>
  );
};

/** A witch at a distance: a villager in purple with a pointed black hat. */
export const Witch: React.FC<{ position: Vec3; rotationY?: number; walk?: number }> = ({ position, rotationY = 0, walk }) => (
  <>
    <Villager position={position} rotationY={rotationY} robe={ROBE.elder} walk={walk} phase={5} />
    <group position={[position[0], position[1] + 2.0, position[2]]}>
      <Block position={[0, 0, 0]} size={[0.8, 0.06, 0.8]} color="#17131c" />
      <Block position={[0, 0.2, 0]} size={[0.46, 0.36, 0.46]} color="#17131c" />
      <Block position={[0, 0.5, 0]} size={[0.26, 0.3, 0.26]} color="#17131c" />
      <Block position={[0.04, 0.72, 0]} size={[0.14, 0.2, 0.14]} color="#17131c" />
    </group>
  </>
);
/** An axe for a vindicator's hand (a Pillager child). */
export const Axe: React.FC = () => (
  <>
    <Block position={[0, 0.15, 0.1]} size={[0.06, 0.8, 0.06]} color="#6b4a2a" />
    <Block position={[0, 0.48, 0.24]} size={[0.05, 0.3, 0.3]} color="#c9d2dc" metalness={0.3} roughness={0.4} />
  </>
);
/**
 * A great many pillagers a long way off, in blocks: grey coats, grey-green faces, a few banners and torches.
 * They stand in rows going back (-z) from `position`, `cols` across, and bob as they come. `adv` is metres advanced (+z).
 */
export const HordeBlocks: React.FC<{ position: Vec3; t: number; rows?: number; cols?: number; adv?: number; width?: number }> = ({ position, t, rows = 12, cols = 12, adv = 0, width = 16 }) => (
  <>
    {Array.from({ length: rows * cols }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const r1 = ((i * 0.618) % 1) - 0.5;
      const r2 = ((i * 0.377 + 0.2) % 1) - 0.5;
      const x = position[0] + ((col + 0.5) / cols - 0.5) * width + r1 * 0.6;
      const z = position[2] - row * 1.25 + r2 * 0.5 + adv;
      const bob = Math.abs(Math.sin(t * 8 + i * 1.9)) * 0.12;
      const kind = i % 9;
      return (
        <group key={i} position={[x, position[1] + bob, z]}>
          <Block position={[0, 0.36, 0]} size={[0.44, 0.72, 0.24]} color="#3a4a4a" castShadow={false} />
          <Block position={[0, 1.06, 0]} size={[0.6, 0.68, 0.3]} color={kind === 4 ? "#5a3a6a" : "#4a3a34"} castShadow={false} />
          <Block position={[0, 1.66, 0]} size={[0.46, 0.52, 0.44]} color="#93a39a" castShadow={false} />
          <Block position={[0, 1.6, 0.24]} size={[0.12, 0.2, 0.1]} color="#84948b" castShadow={false} />
          {kind === 2 ? (
            <>
              <Block position={[0.36, 1.5, 0.1]} size={[0.07, 0.6, 0.07]} color="#6b4a2a" castShadow={false} />
              <Block position={[0.36, 1.86, 0.1]} size={[0.15, 0.17, 0.15]} color="#000000" emissive="#ffb030" emissiveIntensity={1.1} castShadow={false} />
            </>
          ) : kind === 6 ? (
            <>
              <Block position={[0.36, 1.9, 0]} size={[0.07, 1.8, 0.07]} color="#5c3f24" castShadow={false} />
              <Block position={[0.36, 2.45, 0.05]} size={[0.5, 0.7, 0.04]} color="#e2dccb" emissive="#e2dccb" emissiveIntensity={0.15} castShadow={false} />
              <Block position={[0.36, 2.5, 0.08]} size={[0.2, 0.26, 0.02]} color="#3a3d44" castShadow={false} />
            </>
          ) : (
            <Block position={[0.34, 1.2, 0.2]} size={[0.5, 0.07, 0.07]} color="#5a3d22" castShadow={false} />
          )}
        </group>
      );
    })}
  </>
);

// ----------------------------------------------------------------------------- things
/** A block of TNT. `fuse` > 0 lights a spark on top. */
export const TNT: React.FC<{ position: Vec3; fuse?: number; scale?: number }> = ({ position, fuse = 0, scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.4, 0]} size={[0.8, 0.8, 0.8]} color="#c8322a" />
    <Block position={[0, 0.4, 0]} size={[0.82, 0.26, 0.82]} color="#f1efe6" />
    <Block position={[0, 0.4, 0.412]} size={[0.5, 0.14, 0.01]} color="#17131c" castShadow={false} />
    {fuse > 0 ? <Block position={[0, 0.9 + Math.sin(fuse * 40) * 0.03, 0]} size={[0.12, 0.18, 0.12]} color="#000000" emissive="#ffd060" emissiveIntensity={2} castShadow={false} /> : null}
  </group>
);
const rnd = (i: number): number => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
/**
 * An explosion at `position`, `t` seconds old: a flash, fire that swells and dies, stones thrown out (towards
 * `dir`, a unit vector on the ground), and smoke that hangs. Draw it for as long as the smoke should hang.
 */
export const Boom: React.FC<{ position: Vec3; t: number; size?: number; dir?: [number, number]; seed?: number; stones?: number }> = ({ position, t, size = 4, dir = [0, 1], seed = 1, stones = 18 }) => {
  if (t <= 0) return null;
  const k = Math.min(1, t / 0.25);
  const fire = Math.max(0, 1 - t / 0.9);
  return (
    <group position={position}>
      {t < 0.5 ? <pointLight position={[0, 1.5, 0]} color="#ffb040" intensity={500 * (1 - t / 0.5)} distance={40} decay={2} /> : null}
      {fire > 0
        ? Array.from({ length: 12 }, (_, i) => {
            const a = rnd(i + seed) * Math.PI * 2;
            const rr = size * 0.5 * k * (0.4 + rnd(i + seed * 3));
            const s = size * 0.4 * fire * (0.6 + rnd(i + 7));
            return (
              <Block key={`f${i}`} position={[Math.cos(a) * rr, 1 + rnd(i + 11) * size * 0.5 * k, Math.sin(a) * rr]} size={[s, s, s]} color="#000000" emissive={i % 3 ? "#ff9020" : "#ffe070"} emissiveIntensity={2} castShadow={false} />
            );
          })
        : null}
      {t < 2.6
        ? Array.from({ length: stones }, (_, i) => {
            const a = (rnd(i + 20 + seed) - 0.5) * 2.2;
            const sp = 5 + rnd(i + 30) * 9;
            const vx = (dir[0] * Math.cos(a) - dir[1] * Math.sin(a)) * sp;
            const vz = (dir[0] * Math.sin(a) + dir[1] * Math.cos(a)) * sp;
            const vy = 4 + rnd(i + 40) * 7;
            const y = Math.max(0.2, 1.5 + vy * t - 9 * t * t);
            const land = y <= 0.21;
            const tt = land ? (vy + Math.sqrt(vy * vy + 4 * 9 * 1.3)) / 18 : t;
            const s = 0.35 + rnd(i + 50) * 0.5;
            return (
              <group key={`s${i}`} position={[vx * tt, y, vz * tt]} rotation={[land ? 0 : t * 5 * rnd(i), land ? i : t * 3, 0]}>
                <Vox kind="stoneBrick" position={[0, 0, 0]} size={[s, s, s]} />
              </group>
            );
          })
        : null}
      {Array.from({ length: 14 }, (_, i) => {
        const a = rnd(i + 60 + seed) * Math.PI * 2;
        const rr = size * 0.55 * Math.min(1, t / 0.6) * (0.3 + rnd(i + 70));
        const s = size * 0.5 * Math.min(1, t / 0.5) * (0.6 + rnd(i + 80) * 0.6) * Math.max(0, 1 - Math.max(0, t - 3) / 5);
        return <Block key={`m${i}`} position={[Math.cos(a) * rr, 0.8 + rnd(i + 90) * size * 0.7 + t * 0.35, Math.sin(a) * rr]} size={[s, s, s]} color={i % 2 ? "#5a5a60" : "#77777c"} castShadow={false} />;
      })}
    </group>
  );
};
/** The piece of the east wall that the TNT takes out. Draw it in every shot before 5.boom that can see the wall. */
export const WallPlug: React.FC = () => <Vox kind="stoneBrick" position={[HOLE[0], 3, HOLE[2]]} size={[1.6, 6, 5.1]} />;

/** A bush big enough to hide a skeleton. `shake` is any number that changes: it shivers with it. */
export const Bush: React.FC<{ position: Vec3; shake?: number }> = ({ position, shake = 0 }) => (
  <group position={[position[0] + Math.sin(shake * 37) * 0.04, position[1], position[2]]}>
    <Vox kind="leaves" tint="#2f6a2a" position={[0, 0.62, 0]} size={[2.3, 1.24, 1.5]} />
    <Vox kind="leaves" tint="#3a7a31" position={[0.45, 1.36, 0.05]} size={[1.25, 0.6, 1.05]} />
    <Vox kind="leaves" tint="#2a5f26" position={[-0.75, 1.3, -0.1]} size={[0.8, 0.5, 0.8]} />
  </group>
);
/** A spyglass in the world: `position` is the eye end, it points along `yaw` (radians, 0 = +z). */
export const Spyglass: React.FC<{ position: Vec3; yaw?: number; pitch?: number }> = ({ position, yaw = 0, pitch = 0 }) => (
  <group position={position} rotation={[0, yaw, 0]}>
    <group rotation={[-pitch, 0, 0]}>
      <Block position={[0, 0, 0.18]} size={[0.1, 0.1, 0.36]} color="#8a5a2a" />
      <Block position={[0, 0, 0.47]} size={[0.13, 0.13, 0.26]} color="#c8922e" metalness={0.4} roughness={0.4} />
      <Block position={[0, 0, 0.61]} size={[0.15, 0.15, 0.04]} color="#f0c23a" />
    </group>
  </group>
);
/**
 * What a spyglass sees: black all round a circle. For a camera at `eye` looking straight north (yaw 0, pitch 0)
 * with fov 30. Keep that camera still.
 */
export const SpyMask: React.FC<{ eye: Vec3 }> = ({ eye }) => (
  <mesh position={[eye[0], eye[1], eye[2] - 0.5]}>
    <ringGeometry args={[0.07, 3, 48]} />
    <meshBasicMaterial color="#000000" side={2} />
  </mesh>
);
/** A sheep small enough to jump over a bed in somebody's head. */
export const Sheep: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.3, 0]} size={[0.5, 0.36, 0.34]} color="#f4f1ea" emissive="#f4f1ea" emissiveIntensity={0.5} castShadow={false} />
    <Block position={[0.3, 0.38, 0]} size={[0.2, 0.2, 0.22]} color="#3a3330" castShadow={false} />
    {[-0.16, 0.16].map((x) => (
      <Block key={x} position={[x, 0.07, 0]} size={[0.08, 0.14, 0.2]} color="#3a3330" castShadow={false} />
    ))}
  </group>
);
/** A window with a light on in it: a warm square a hair in front of a wall. `on` 0–1. `yaw` is the way the wall faces. */
export const LitWindow: React.FC<{ position: Vec3; yaw?: number; on?: number; size?: [number, number] }> = ({ position, yaw = 0, on = 1, size = [0.8, 0.9] }) => (
  <group position={position} rotation={[0, yaw, 0]}>
    <Block position={[0, 0, 0]} size={[size[0], size[1], 0.04]} color={on > 0.5 ? "#000000" : "#15151a"} emissive="#ffc860" emissiveIntensity={on * 2.2} castShadow={false} />
    {on > 0.5 ? <pointLight position={[0, 0, 0.8]} color="#ffc060" intensity={6 * on} distance={7} decay={2} /> : null}
  </group>
);
/** Every window in the castle that can light up: [x, y, z, yaw] in the fort's own numbers. */
export const WINDOWS: Array<[number, number, number, number]> = [
  [-17.5, 6.2, -11.78, 0], [17.5, 6.2, -11.78, 0], [0, 7.1, -11.68, 0], [-9, 6.2, -11.98, 0],
  [-11.97, 6.4, 3.6, Math.PI / 2], [-11.97, 6.4, 8.4, Math.PI / 2], [-11.97, 3.2, 8.6, Math.PI / 2],
  [-17.5, 5.6, 14.22, 0], [17.5, 5.6, 14.22, 0], [9.5, 1.9, -3.22, 0], [-9.5, 1.9, -2.97, 0], [5, 3.4, -13.18, 0], [-4.6, 3.4, -13.18, 0],
];
/** White web round three people who stand close together. `position` is the middle of them, on the ground. */
export const Web: React.FC<{ position: Vec3; k?: number }> = ({ position, k = 1 }) => (
  <group position={position}>
    {Array.from({ length: Math.round(7 * k) }, (_, i) => (
      <group key={i} rotation={[0, i * 0.5, (i % 2 ? 0.12 : -0.12)]}>
        <Block position={[0, 0.5 + i * 0.16, 0]} size={[1.5, 0.07, 1.1]} color="#f4f4f0" emissive="#f4f4f0" emissiveIntensity={0.3} castShadow={false} />
      </group>
    ))}
  </group>
);
/** Words at the top of the frame. It faces `yaw` (radians): give it the camera's yaw. */
export const TopCard: React.FC<{ text: string; position: Vec3; yaw?: number; height?: number; width?: number }> = ({ text, position, yaw = 0, height = 0.5, width = 3.2 }) => (
  <PixelText text={text} position={position} rotationY={yaw} height={height} maxWidth={width} color="#ffffff" />
);

import type React from "react";
import { Block, Vox, getPose } from "../../src/engine";
import type { Pose, Vec3 } from "../../src/engine";
import { Pillager } from "./pillagers";
import { ROBE, Villager } from "./villagers";

/**
 * THE SIEGE — everything Monster Village part four had to build to attack a castle at night, kept here so the next
 * film does not build it again: a ravager, a vex, a witch, a whole army of pillagers (`Horde`), TNT and an explosion,
 * a lookout tower with floors in it, a spyglass (the thing, the way to hold it, and what it sees), a bush, a key,
 * a lit window, a spider's web.
 *
 * Part of the topic's pack (see PACK.md). None of it knows where it is: every piece takes a `position`.
 * How each was used, shot by shot: reference/monster-village-part-4/.
 *
 * THE OWNER'S RULES these were rebuilt to (his review of part four, 2026-11-15):
 *   - a crowd is detailed all the way back. `Horde` is real `Pillager`s, every one, not grey boxes behind two actors;
 *   - somebody who uses a thing uses his ARMS: `spyglassPose` + a `Spyglass` at `spyglassAt`;
 *   - a building has an inside: `WatchTower` has floors, ladders and a lamp on each;
 *   - smoke must not hide the shot: `Boom`'s smoke blocks are small.
 */

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

/**
 * A witch: a villager in purple with a pointed black hat with a buckle, a wart on her nose, and (`potion`) a bottle
 * held out in front of her that glows and bubbles.
 */
export const Witch: React.FC<{ position: Vec3; rotationY?: number; walk?: number; potion?: boolean; scale?: number }> = ({ position, rotationY = 0, walk, potion = false, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Villager position={[0, 0, 0]} robe={ROBE.elder} walk={walk} phase={5} />
    <group position={[0, 2.0 + (walk === undefined ? 0 : Math.abs(Math.sin(walk * 5.2)) * 0.03), 0]}>
      <Block position={[0, 0, 0]} size={[0.86, 0.06, 0.86]} color="#17131c" />
      <Block position={[0, 0.2, 0]} size={[0.48, 0.36, 0.48]} color="#17131c" />
      <Block position={[0, 0.1, 0]} size={[0.5, 0.1, 0.5]} color="#3f7a3a" />
      <Block position={[0, 0.1, 0.26]} size={[0.14, 0.14, 0.02]} color="#e0b83a" castShadow={false} />
      <Block position={[0, 0.5, 0]} size={[0.28, 0.3, 0.28]} color="#17131c" />
      <Block position={[0.05, 0.72, -0.03]} size={[0.15, 0.2, 0.15]} color="#17131c" />
    </group>
    <Block position={[0.06, 1.52, 0.42]} size={[0.05, 0.05, 0.05]} color="#5a7a3a" castShadow={false} />
    {potion ? (
      <group position={[0.2, 1.05, 0.42]}>
        <Block position={[0, 0, 0]} size={[0.2, 0.22, 0.2]} color="#000000" emissive="#b040e0" emissiveIntensity={1.6} castShadow={false} />
        <Block position={[0, 0.16, 0]} size={[0.08, 0.12, 0.08]} color="#d8e6ee" castShadow={false} />
        <Block position={[0, 0.24, 0]} size={[0.1, 0.05, 0.1]} color="#6b4a2a" castShadow={false} />
      </group>
    ) : null}
  </group>
);
/** An axe for a vindicator's hand (a Pillager child). */
export const Axe: React.FC = () => (
  <>
    <Block position={[0, 0.15, 0.1]} size={[0.06, 0.8, 0.06]} color="#6b4a2a" />
    <Block position={[0, 0.48, 0.24]} size={[0.05, 0.3, 0.3]} color="#c9d2dc" metalness={0.3} roughness={0.4} />
  </>
);

// ----------------------------------------------------------------------------- an army
const hash = (i: number, k: number): number => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
/** A torch for a pillager's hand (a Pillager child). No real light: there are too many of them. */
export const HandTorch: React.FC = () => (
  <>
    <Block position={[0, 0.12, 0.08]} size={[0.07, 0.56, 0.07]} color="#6b4a2a" />
    <Block position={[0, 0.46, 0.08]} size={[0.13, 0.16, 0.13]} color="#000000" emissive="#ffb030" emissiveIntensity={2.2} castShadow={false} />
    <Block position={[0, 0.58, 0.08]} size={[0.07, 0.1, 0.07]} color="#000000" emissive="#ffe070" emissiveIntensity={2.6} castShadow={false} />
  </>
);
/** A raid banner on a pole, for a pillager's hand (a Pillager child). */
export const HandBanner: React.FC<{ t?: number }> = ({ t = 0 }) => (
  <>
    <Block position={[0, 0.9, 0.08]} size={[0.07, 2.6, 0.07]} color="#5c3f24" />
    <group position={[0, 1.55, 0.02]} rotation={[0, 0, Math.sin(t * 3) * 0.05]}>
      <Block position={[0, 0, 0]} size={[0.62, 1.0, 0.04]} color="#e2dccb" emissive="#e2dccb" emissiveIntensity={0.18} castShadow={false} />
      <Block position={[0, 0.12, 0.03]} size={[0.3, 0.34, 0.02]} color="#8c98a2" castShadow={false} />
      <Block position={[0, 0.2, 0.045]} size={[0.3, 0.07, 0.02]} color="#26222c" castShadow={false} />
      <Block position={[0, -0.22, 0.03]} size={[0.44, 0.08, 0.02]} color="#b0302a" castShadow={false} />
    </group>
  </>
);
/**
 * AN ARMY OF PILLAGERS, every one of them a real `Pillager`: scowl, nose, coat, legs that walk. One in three aims a
 * crossbow, and among them there are torches, banners, vindicators with axes up, evokers with their arms in the air,
 * witches, and (with `beasts`) ravagers with riders. No two neighbours are the same.
 *
 * They stand in rows going back (-z) from `position`, `cols` across over `width` metres, `gap` metres between rows,
 * facing +z, and march: `adv` is metres advanced. `t` is the shot clock.
 * Cost: about 30 blocks each. 150 is fine for a three second shot; do not draw 500.
 */
export const Horde: React.FC<{ position: Vec3; t: number; rows?: number; cols?: number; adv?: number; width?: number; gap?: number; beasts?: number; seed?: number; fan?: number }> = ({
  position, t, rows = 12, cols = 9, adv = 0, width = 12, gap = 1.5, beasts = 0, seed = 0, fan = 0,
}) => (
  <>
    {Array.from({ length: rows * cols }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const j = i + seed * 97;
      const wide = width * (1 + fan * row);
      const x = position[0] + ((col + 0.5) / cols - 0.5) * wide + (hash(j, 1) - 0.5) * 0.5 + (row % 2 ? 0.35 : 0);
      const z = position[2] - row * gap + (hash(j, 2) - 0.5) * 0.6 + adv;
      const p: Vec3 = [x, position[1], z];
      const walk = adv * 1.1 + t * 0.9 + hash(j, 3) * 6;
      const pick = hash(j, 4);
      const n = Math.floor(hash(j, 5) * 4);
      const key = `h${i}`;
      if (beasts > 0 && row > 1 && row % 4 === 2 && col % Math.max(2, Math.round(cols / beasts)) === 1) {
        return <Ravager key={key} position={p} walk={walk} scale={1.15} jaw={0.5 + 0.5 * Math.sin(t * 3 + j)} />;
      }
      if (pick < 0.07) return <Witch key={key} position={p} walk={walk} potion />;
      if (pick < 0.15) {
        return (
          <Pillager key={key} position={p} walk={walk} n={n} chief armR={-2.7 + Math.sin(t * 6 + j) * 0.15} armL={-2.7 - Math.sin(t * 6 + j) * 0.15} phase={j} />
        );
      }
      if (pick < 0.3) {
        return (
          <Pillager key={key} position={p} walk={walk} n={n} armR={-2.1 + Math.sin(t * 7 + j) * 0.5} mad={1} phase={j}>
            <Axe />
          </Pillager>
        );
      }
      if (pick < 0.45) {
        return (
          <Pillager key={key} position={p} walk={walk} n={n} armR={-2.3} mad={1} phase={j}>
            <HandTorch />
          </Pillager>
        );
      }
      if (pick < 0.55) {
        return (
          <Pillager key={key} position={p} walk={walk} n={n} armR={-1.5} mad={1} phase={j}>
            <HandBanner t={t + j} />
          </Pillager>
        );
      }
      if (pick < 0.85) return <Pillager key={key} position={p} walk={walk} n={n} crossbow armR={-1.3 + Math.sin(t * 2 + j) * 0.06} mad={1} phase={j} />;
      return <Pillager key={key} position={p} walk={walk} n={n} cheer={0.5 + 0.5 * Math.sin(t * 5 + j)} mad={1} phase={j} />;
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
 * `dir`, a unit vector on the ground), and smoke that hangs. `smoke` is the size of a smoke block as a part of
 * `size`: keep it small (0.2), or the smoke is a wall of flat grey that hides the shot. Draw it for as long as the smoke should hang.
 */
export const Boom: React.FC<{ position: Vec3; t: number; size?: number; dir?: [number, number]; seed?: number; stones?: number; smoke?: number; puffs?: number }> = ({ position, t, size = 4, dir = [0, 1], seed = 1, stones = 18, smoke = 0.2, puffs = 22 }) => {
  if (t <= 0) return null;
  const k = Math.min(1, t / 0.25);
  const fire = Math.max(0, 1 - t / 0.9);
  return (
    <group position={position}>
      {t < 0.5 ? <pointLight position={[0, 1.5, 0]} color="#ffb040" intensity={500 * (1 - t / 0.5)} distance={40} decay={2} /> : null}
      {fire > 0
        ? Array.from({ length: 20 }, (_, i) => {
            const a = rnd(i + seed) * Math.PI * 2;
            const rr = size * 0.5 * k * (0.4 + rnd(i + seed * 3));
            const s = size * 0.2 * fire * (0.6 + rnd(i + 7));
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
      {Array.from({ length: puffs }, (_, i) => {
        const a = rnd(i + 60 + seed) * Math.PI * 2;
        const rr = size * 0.55 * Math.min(1, t / 0.6) * (0.3 + rnd(i + 70));
        const s = size * smoke * Math.min(1, t / 0.5) * (0.6 + rnd(i + 80) * 0.6) * Math.max(0, 1 - Math.max(0, t - 3) / 5);
        return <Block key={`m${i}`} position={[Math.cos(a) * rr, 0.8 + rnd(i + 90) * size * 0.7 + t * 0.35, Math.sin(a) * rr]} size={[s, s, s]} color={i % 2 ? "#5a5a60" : "#77777c"} castShadow={false} />;
      })}
    </group>
  );
};

/** A bush big enough to hide a skeleton. `shake` is any number that changes: it shivers with it. */
export const Bush: React.FC<{ position: Vec3; shake?: number }> = ({ position, shake = 0 }) => (
  <group position={[position[0] + Math.sin(shake * 37) * 0.04, position[1], position[2]]}>
    <Vox kind="leaves" tint="#2f6a2a" position={[0, 0.62, 0]} size={[2.3, 1.24, 1.5]} />
    <Vox kind="leaves" tint="#3a7a31" position={[0.45, 1.36, 0.05]} size={[1.25, 0.6, 1.05]} />
    <Vox kind="leaves" tint="#2a5f26" position={[-0.75, 1.3, -0.1]} size={[0.8, 0.5, 0.8]} />
  </group>
);
/** A spyglass in the world: `position` is the eye end, it points along `yaw` (radians, 0 = +z). */
export const Spyglass: React.FC<{ position: Vec3; yaw?: number; pitch?: number; scale?: number }> = ({ position, yaw = 0, pitch = 0, scale = 1 }) => (
  <group position={position} rotation={[0, yaw, 0]} scale={scale}>
    <group rotation={[-pitch, 0, 0]}>
      <Block position={[0, 0, 0.18]} size={[0.1, 0.1, 0.36]} color="#8a5a2a" />
      <Block position={[0, 0, 0.47]} size={[0.13, 0.13, 0.26]} color="#c8922e" metalness={0.4} roughness={0.4} />
      <Block position={[0, 0, 0.61]} size={[0.15, 0.15, 0.04]} color="#f0c23a" />
    </group>
  </group>
);
/**
 * What a spyglass sees: black all round a circle. For a camera at `eye` looking straight north (yaw 0, pitch 0)
 * with fov 30, tipped `down` radians (aim it with `spyLook`). Keep that camera still.
 */
export const SpyMask: React.FC<{ eye: Vec3; down?: number; hole?: number }> = ({ eye, down = 0, hole = 0.07 }) => (
  <group position={eye} rotation={[-down, 0, 0]}>
    <mesh position={[0, 0, -0.5]}>
      <ringGeometry args={[hole, 3, 48]} />
      <meshBasicMaterial color="#000000" side={2} />
    </mesh>
    {/* the brass rim of the glass. NO cross hair: it is a spyglass, not a rifle. */}
    <mesh position={[0, 0, -0.501]}>
      <ringGeometry args={[hole, hole * 1.06, 48]} />
      <meshBasicMaterial color="#c8922e" side={2} />
    </mesh>
  </group>
);
/** Where a `SpyMask` camera looks: straight north from `eye`, tipped `down` radians. Give it to `on` and `onTo`. */
export const spyLook = (eye: Vec3, down = 0): Vec3 => [eye[0], eye[1] - 40 * Math.sin(down), eye[2] - 40 * Math.cos(down)];
/**
 * HOLDING A SPYGLASS TO THE EYE, with both arms. Give the pose to an avatar, and draw the glass at his eye:
 *
 *   <Player who={5} position={p} rotationY={ry} pose={spyglassPose(t, k)} />
 *   {k > 0.3 ? <Spyglass position={spyglassAt(p, ry, k)} yaw={ry} scale={1.3} /> : null}
 *
 * `k` 0 is arms down, 1 is the glass at his eye: both hands come up in front of his face, one each side of the tube.
 */
export const spyglassPose = (t: number, k = 1, base: Parameters<typeof getPose>[0] = "idle"): Pose => {
  const p = getPose(base, t);
  const e = Math.max(0, Math.min(1, k));
  return {
    ...p,
    armR: [p.armR[0] + (-1.72 - p.armR[0]) * e, 0, p.armR[2] + (-0.2 - p.armR[2]) * e],
    armL: [p.armL[0] + (-1.6 - p.armL[0]) * e, 0, p.armL[2] + (0.2 - p.armL[2]) * e],
  };
};
/** Where the eye end of the spyglass is, for somebody standing at `p` facing `ry`. `k` < 1 is on its way up from his belt. */
export const spyglassAt = (p: Vec3, ry: number, k = 1): Vec3 => {
  const e = Math.max(0, Math.min(1, k));
  const lz = 0.3;
  return [p[0] + lz * Math.sin(ry), p[1] + 1.0 + 0.6 * e, p[2] + lz * Math.cos(ry)];
};

/** A window with a light on in it: a warm square a hair in front of a wall. `on` 0–1. `yaw` is the way the wall faces. */
export const LitWindow: React.FC<{ position: Vec3; yaw?: number; on?: number; size?: [number, number] }> = ({ position, yaw = 0, on = 1, size = [0.8, 0.9] }) => (
  <group position={position} rotation={[0, yaw, 0]}>
    <Block position={[0, 0, 0]} size={[size[0], size[1], 0.04]} color={on > 0.5 ? "#000000" : "#15151a"} emissive="#ffc860" emissiveIntensity={on * 2.2} castShadow={false} />
    {on > 0.5 ? <pointLight position={[0, 0, 0.8]} color="#ffc060" intensity={6 * on} distance={7} decay={2} /> : null}
  </group>
);
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

// ----------------------------------------------------------------------------- a tower with floors
/**
 * A LOOKOUT TOWER YOU CAN SEE INTO. Four stone legs, and between them a floor of planks every `storey` metres, each
 * with a ladder up to the next, a lamp, and something a guard would leave there (a barrel, a bed, a chest, a rack of
 * arrows). The bottom storeys have stone walls with a doorway and windows; the top storeys are open on every side.
 * The deck on top is at `height` + 0.12, with teeth at the corners and a flag on a pole in the middle.
 *
 * `position` is the middle of its foot. `open` is how many storeys from the top are open-sided (default: all above
 * `wallTo` metres). `lamps` false leaves the lights out (a camera a long way off does not need them).
 */
export const WatchTower: React.FC<{ position: Vec3; height?: number; size?: number; storey?: number; wallTo?: number; lamps?: boolean; flag?: string }> = ({
  position, height = 10, size = 4.2, storey = 3.3, wallTo = 6.7, lamps = true, flag = "#b0302a",
}) => {
  const h2 = size / 2;
  const leg = 0.7;
  const floors: number[] = [];
  for (let y = 0; y < height - 1; y += storey) floors.push(y);
  return (
    <group position={position}>
      {[-1, 1].map((sx) => [-1, 1].map((sz) => <Vox key={`l${sx}${sz}`} kind="stoneBrick" position={[sx * (h2 - leg / 2), height / 2, sz * (h2 - leg / 2)]} size={[leg, height, leg]} />))}
      {floors.map((y, i) => {
        const top = Math.min(height, y + storey);
        const walled = top <= wallTo + 0.01;
        const mid = (y + top) / 2;
        const tall = top - y;
        return (
          <group key={`f${i}`}>
            {/* the floor, and the beam that carries it: the beam shows on the outside as a band */}
            <Vox kind="planks" position={[0, y + 0.1, 0]} size={[size - 0.1, 0.2, size - 0.1]} />
            <Block position={[0, y + 0.02, 0]} size={[size + 0.25, 0.24, size + 0.25]} color="#5c3f24" />
            {walled ? (
              <>
                <Vox kind="stoneBrick" position={[0, mid, -h2 + 0.2]} size={[size - leg * 2, tall, 0.4]} />
                {[-1, 1].map((s) => (
                  <Vox key={s} kind="stoneBrick" position={[s * (h2 - 0.2), mid, 0]} size={[0.4, tall, size - leg * 2]} />
                ))}
                {/* the front: a wall with a doorway (ground) or a wide window in it, so the room shows */}
                <Vox kind="stoneBrick" position={[0, top - 0.45, h2 - 0.2]} size={[size - leg * 2, 0.9, 0.4]} />
                {i === 0 ? null : <Vox kind="stoneBrick" position={[0, y + 0.55, h2 - 0.2]} size={[size - leg * 2, 0.9, 0.4]} />}
                <Block position={[0, mid, -h2 + 0.42]} size={[size - leg * 2, tall, 0.02]} color="#8a7a66" castShadow={false} />
              </>
            ) : (
              /* open storey: a rail round it at waist height */
              [0, 1, 2, 3].map((q) => (
                <group key={q} rotation={[0, (q * Math.PI) / 2, 0]}>
                  <Block position={[0, y + 1.0, h2 - 0.12]} size={[size - leg * 2, 0.1, 0.1]} color="#6b4a2a" />
                  <Block position={[0, y + 0.55, h2 - 0.12]} size={[size - leg * 2, 0.07, 0.07]} color="#6b4a2a" />
                </group>
              ))
            )}
            {/* the ladder to the next floor, against the back, a different side each storey */}
            <group position={[i % 2 ? -h2 + 1.0 : h2 - 1.0, y, -h2 + 0.62]}>
              {[-0.22, 0.22].map((x) => (
                <Block key={x} position={[x, tall / 2 + 0.1, 0]} size={[0.07, tall, 0.07]} color="#7a5632" />
              ))}
              {Array.from({ length: Math.floor(tall / 0.4) }, (_, r) => (
                <Block key={r} position={[0, 0.35 + r * 0.4, 0]} size={[0.5, 0.06, 0.06]} color="#8a6238" />
              ))}
            </group>
            {/* what is kept on this floor */}
            {i % 3 === 0 ? (
              <>
                <Vox kind="planks" position={[i % 2 ? h2 - 1.1 : -h2 + 1.1, y + 0.55, 0.2]} size={[0.7, 0.7, 0.7]} />
                <Vox kind="hay" position={[i % 2 ? h2 - 1.1 : -h2 + 1.1, y + 0.4, -0.7]} size={[0.8, 0.4, 0.8]} />
              </>
            ) : i % 3 === 1 ? (
              <>
                <Vox kind="planks" position={[i % 2 ? h2 - 1.05 : -h2 + 1.05, y + 0.38, 0]} size={[0.9, 0.36, 1.9]} />
                <Block position={[i % 2 ? h2 - 1.05 : -h2 + 1.05, y + 0.62, 0.2]} size={[0.86, 0.12, 1.3]} color="#9a3f34" />
                <Block position={[i % 2 ? h2 - 1.05 : -h2 + 1.05, y + 0.64, -0.7]} size={[0.7, 0.14, 0.4]} color="#f1efe6" />
              </>
            ) : (
              <>
                <Vox kind="planks" position={[i % 2 ? h2 - 1.1 : -h2 + 1.1, y + 0.5, 0.3]} size={[0.8, 0.6, 0.6]} />
                <Block position={[i % 2 ? h2 - 1.1 : -h2 + 1.1, y + 0.82, 0.3]} size={[0.84, 0.06, 0.64]} color="#3a2414" />
                {[0, 1, 2].map((a) => (
                  <Block key={a} position={[(i % 2 ? h2 - 1.1 : -h2 + 1.1) - 0.2 + a * 0.2, y + 0.75, -0.6]} rotation={[0.2, 0, 0]} size={[0.04, 1.1, 0.04]} color="#d8d2c0" />
                ))}
              </>
            )}
            {/* a lamp hung from the floor above */}
            <Block position={[0, top - 0.35, 0.4]} size={[0.05, 0.5, 0.05]} color="#2a2a2e" castShadow={false} />
            <Block position={[0, top - 0.7, 0.4]} size={[0.24, 0.3, 0.24]} color="#000000" emissive="#ffc060" emissiveIntensity={2.4} castShadow={false} />
            {lamps ? <pointLight position={[0, top - 0.9, 0.5]} color="#ffb860" intensity={9} distance={6} decay={2} /> : null}
          </group>
        );
      })}
      {/* the deck */}
      <Block position={[0, height + 0.06, 0]} size={[size + 0.6, 0.12, size + 0.6]} color="#77777a" />
      <Vox kind="planks" position={[0, height - 0.06, 0]} size={[size + 0.5, 0.12, size + 0.5]} />
      {[-1, 1].map((sx) => [-1, 1].map((sz) => <Vox key={`t${sx}${sz}`} kind="stoneBrick" position={[sx * (h2 + 0.05), height + 0.55, sz * (h2 + 0.05)]} size={[1, 1, 1]} />))}
      <Block position={[0, height + 2.1, 0]} size={[0.1, 3, 0.1]} color="#5c3f24" />
      <Block position={[0.55, height + 3.1, 0]} size={[1, 0.7, 0.05]} color={flag} castShadow={false} />
    </group>
  );
};

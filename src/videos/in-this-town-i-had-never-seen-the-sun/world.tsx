import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { DarkOak, Hut, Moon, Stars } from "../../../Topics/InThisTown";
import { PLACE, SoulLamp, Sunflower } from "./kit";

/**
 * Where it happens.
 *
 *   under    The zombie town under the big trees: the ground, the street, the trunks, the roof of leaves, the blue
 *            lamps. The houses change (doors), so the scenes draw them (kit.tsx: `Homes`).
 *   room     My room, drawn by the scenes (`MyRoom`): this zone is only the dark round it.
 *   rim      The edge of the trees: the wood in the south, a path north to a hill, the log.
 *   meadow   The day side: flowers, sunflowers, the pond, the day town far off.
 *   daytown  The villagers' street: the ground and the trees. The houses change, so the scenes draw them (`DayTown`).
 *
 * Night, sunrise, day and rain are the shot's `look`. The sky, the sun and the clouds are the look's own
 * (src/engine/Look.tsx and shaders.tsx): the sun is in the north.
 */

const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const FLOWER = ["#f2d24a", "#ffffff", "#e8566a", "#6a9be8", "#f08a2a", "#c86ae0"];
const Flowers: React.FC<{ n: number; area: [number, number]; seed: number; skip?: (x: number, z: number) => boolean }> = ({ n, area, seed, skip }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const x = (rnd(i, seed) - 0.5) * area[0];
      const z = (rnd(i, seed + 1) - 0.5) * area[1];
      if (skip?.(x, z)) return null;
      const h = 0.16 + rnd(i, seed + 2) * 0.14;
      return (
        <group key={i} position={[x, 0, z]}>
          <Block position={[0, h / 2, 0]} size={[0.04, h, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, h + 0.05, 0]} size={[0.15, 0.1, 0.15]} color={FLOWER[i % FLOWER.length]} castShadow={false} />
        </group>
      );
    })}
  </>
);

const Night: React.FC = () => (
  <>
    <Moon position={[7, 24, -90]} radius={6} />
    <Stars center={[0, 0, 0]} />
  </>
);

const TRUNKS: Array<[number, number]> = [[-11.5, -9.5], [-3.8, -10.5], [3.8, -11], [11.5, -9.5], [-14, 1], [14, 0.5], [-9.5, 8], [9.5, 8.5], [-20, -5], [20, -6], [0, -17], [-9, -18], [9, -18]];

/** The zombie town. No sky overhead: a roof of leaves 11 m up. The light is the blue lamps and whatever comes in sideways. */
const Under: React.FC<{ dawn?: boolean }> = ({ dawn = false }) => (
  <group>
    {/* the light of the place: blue, from nowhere in particular */}
    <pointLight position={[0, 7, 4]} color="#9fc4ff" intensity={130} distance={44} decay={2} />
    <pointLight position={[-11, 6, 1]} color="#8fd8ff" intensity={60} distance={30} decay={2} />
    <pointLight position={[11, 6, 1]} color="#8fd8ff" intensity={60} distance={30} decay={2} />
    <Vox kind="grass" tint="#44644a" position={[0, -0.5, 0]} size={[300, 1, 300]} />
    <Vox kind="path" tint="#77705f" position={[0, 0.02, -2.6]} size={[46, 0.06, 3.2]} />
    <Vox kind="path" tint="#77705f" position={[0, 0.021, -4.9]} size={[1.6, 0.06, 1.6]} />
    {TRUNKS.map(([x, z], i) => (
      <Vox key={i} kind="log" tint="#3a2c1c" position={[x, 6, z]} size={[1.5, 12, 1.5]} />
    ))}
    <Vox kind="leaves" tint="#1d3a27" position={[0, 12.6, -3]} size={[70, 2, 52]} />
    {/* leaves that hang lower, so the roof has an edge to it */}
    {TRUNKS.map(([x, z], i) => (
      <Vox key={`l${i}`} kind="leaves" tint={i % 2 ? "#21412b" : "#1a3423"} position={[x, 10.6, z]} size={[6.5, 2.2, 6.5]} />
    ))}
    <Hut at={[-15.5, 0, -6.4]} w={4.6} h={3.2} wall="cobble" tint="#667078" roof="#3a2f4a" windows={[-1.2]} door={1} />
    <Hut at={[15, 0, -6.4]} w={4.6} h={3.2} wall="darkPlanks" roof="#33465c" windows={[1.2]} door={-1} />
    <SoulLamp position={[-3.3, 0, -4.3]} light={dawn ? 0 : 9} />
    <SoulLamp position={[3.5, 0, -4.3]} light={dawn ? 0 : 9} />
    <SoulLamp position={[-10.5, 0, -1.2]} />
    <SoulLamp position={[10.8, 0, -1.2]} />
    {/* glowing mushrooms: the only flowers down here */}
    {Array.from({ length: 26 }, (_, i) => {
      const x = (rnd(i, 4) - 0.5) * 30;
      const z = 0.4 + rnd(i, 5) * 6;
      return (
        <group key={i} position={[x, 0, z]}>
          <Block position={[0, 0.08, 0]} size={[0.05, 0.16, 0.05]} color="#d8d2c0" castShadow={false} />
          <Block position={[0, 0.19, 0]} size={[0.2, 0.08, 0.2]} color={i % 3 ? "#57d6c8" : "#8f7ae8"} emissive={i % 3 ? "#57d6c8" : "#8f7ae8"} emissiveIntensity={dawn ? 0.2 : 1.2} castShadow={false} />
        </group>
      );
    })}
    <LightPool position={[0, 0.05, -2.6]} width={12} depth={7} color={dawn ? "#ffb0a0" : "#7fd8ff"} opacity={0.14} />
    <Dust position={[0, 2.4, 0]} area={[22, 5, 16]} count={60} size={0.045} color={dawn ? "#ffd9c0" : "#bfeaff"} opacity={0.5} seed={4} speed={0.2} />
  </group>
);

/** The edge of the trees. The wood is in the south; the lens that looks north has its back to it. */
const Rim: React.FC<{ night: boolean; rays: number }> = ({ night, rays }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    <Vox kind="path" position={[0, 0.02, -8]} size={[2, 0.06, 52]} />
    {/* the hill the sun comes up behind */}
    <Vox kind="grass" position={[0, 1.0, -27]} size={[80, 2.0, 14]} />
    <Vox kind="grass" position={[0, 2.8, -28]} size={[56, 1.6, 11]} />
    <Vox kind="grass" position={[0, 4.3, -29]} size={[36, 1.4, 8]} />
    <Vox kind="grass" position={[0, 5.5, -30]} size={[20, 1.0, 6]} />
    {/* the wood: dark oaks, a roof of leaves, and black behind */}
    {Array.from({ length: 34 }, (_, i) => {
      const row = i % 4;
      const x = (Math.floor(i / 4) - 4) * 4.3 + (row % 2 ? 2.1 : 0) + (rnd(i, 2) - 0.5) * 1.2;
      const z = 2.6 + row * 3.4 + rnd(i, 3) * 1.2;
      if (Math.abs(x) < 1.9) return null;
      return <DarkOak key={i} position={[x, 0, z]} height={5.4 + rnd(i, 1) * 2.2} n={i} />;
    })}
    <Vox kind="leaves" tint="#1a3423" position={[0, 9.4, 12]} size={[80, 3, 18]} />
    <Block position={[0, 6, 19]} size={[90, 14, 1]} color="#05080a" castShadow={false} />
    <Vox kind="grass" tint="#3c5a40" position={[0, 0.01, 11]} size={[80, 0.04, 17]} />
    <Flowers n={46} area={[26, 16]} seed={6} skip={(x, z) => Math.abs(x) < 1.5 || z > 1.5} />
    <group position={[0, 0, -11]}>
      <Flowers n={40} area={[30, 10]} seed={9} skip={(x) => Math.abs(x) < 1.5} />
    </group>
    {[-5.5, -3.6, 3.4, 5.2].map((x, i) => (
      <Sunflower key={x} position={[x, 0, -9 - (i % 2) * 1.4]} rotationY={Math.PI} height={1.6 + (i % 2) * 0.2} />
    ))}
    <Dust position={[0, 2, -2]} area={[18, 4, 14]} count={40} size={0.045} color={night ? "#cfe0ff" : "#fff3c8"} opacity={0.5} seed={7} speed={0.2} />
    {/* the low sun coming in among the first trunks */}
    {rays > 0 ? (
      <>
        <GodRay position={[-5.5, 5.5, 3.6]} rotation={[0, 0, 0.55]} width={4.5} height={13} color="#ffd9a0" opacity={rays} />
        <GodRay position={[5.2, 5.5, 4.4]} rotation={[0, 0, 0.5]} width={3.5} height={13} color="#ffd9a0" opacity={rays * 0.8} />
      </>
    ) : null}
    {night ? <Night /> : null}
  </group>
);

/** The day side. */
const Meadow: React.FC = () => {
  const [px, , pz] = PLACE.pond;
  const inPond = (x: number, z: number) => Math.abs(x - px) < 3.1 && Math.abs(z - pz) < 2.6;
  return (
    <group>
      <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
      <Flowers n={230} area={[34, 26]} seed={2} skip={inPond} />
      {/* the row of sunflowers, and the tall one */}
      {Array.from({ length: 11 }, (_, i) => (
        <Sunflower key={i} position={[-7 + i * 1.5 + rnd(i, 1) * 0.4, 0, -4.4 - rnd(i, 2) * 1.6]} rotationY={Math.PI} height={1.5 + rnd(i, 3) * 0.4} />
      ))}
      {/* the pond: water lying on the ground. Whoever stands "in" it stands below the ground, which hides him to the neck. */}
      <Vox kind="sand" position={[px, 0.012, pz]} size={[5.4, 0.03, 4.4]} />
      <Block position={[px, 0.035, pz]} size={[4.8, 0.03, 3.8]} color="#3f8fe0" castShadow={false} />
      <Block position={[px + 0.5, 0.045, pz - 0.4]} size={[2.6, 0.02, 1.7]} color="#62aef0" castShadow={false} />
      <Block position={[px - 1.1, 0.05, pz + 0.9]} size={[1.0, 0.02, 0.3]} color="#cfeaff" castShadow={false} />
      <Block position={[px + 1.3, 0.05, pz - 1.1]} size={[0.7, 0.02, 0.22]} color="#cfeaff" castShadow={false} />
      {[[-2.2, -1.5], [2.1, 1.6], [-1.8, 1.7]].map(([x, z], i) => (
        <group key={i} position={[px + x, 0, pz + z]}>
          <Block position={[0, 0.5, 0]} size={[0.06, 1.0, 0.06]} color="#4a8a3a" castShadow={false} />
          <Block position={[0.1, 0.4, 0.05]} size={[0.06, 0.8, 0.06]} color="#4a8a3a" castShadow={false} />
          <Block position={[0, 1.05, 0]} size={[0.1, 0.24, 0.1]} color="#6a4a2a" castShadow={false} />
        </group>
      ))}
      {/* the day town, far off under the sun */}
      {[-13, -6.5, 0, 6.5, 13].map((x, i) => (
        <Hut key={x} at={[x, 0, -30 - (i % 2) * 2]} w={5} h={3.4} tint={i % 2 ? "#d8c49a" : "#c8a878"} roof={["#8a3b2a", "#3d5f9a", "#3f6b3a"][i % 3]} windows={[-1.5]} door={1} open />
      ))}
      {Array.from({ length: 30 }, (_, i) => {
        const a = (i / 30) * Math.PI * 2;
        const r = 30 + rnd(i, 7) * 22;
        const x = Math.sin(a) * r;
        const z = Math.cos(a) * r;
        if (z < -18 && Math.abs(x) < 20) return null;
        return <Tree key={i} position={[x, 0, z]} height={4.6 + rnd(i, 8) * 2.6} leaf={i % 2 ? "#3f7f2d" : "#4a8f35"} />;
      })}
      {/* home: the dark line of the wood, a long way west */}
      <Block position={[-58, 5, 0]} size={[2, 10, 160]} color="#16301f" castShadow={false} />
      <Dust position={[0, 2.2, 0]} area={[22, 4, 18]} count={60} size={0.045} color="#fff7d8" opacity={0.5} seed={3} speed={0.25} />
    </group>
  );
};

/** The villagers' street: the ground, the trees and the hay to hide behind. */
const DayTownGround: React.FC<{ night: boolean }> = ({ night }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    <Vox kind="path" position={[0, 0.02, -2.2]} size={[40, 0.06, 4.4]} />
    <Vox kind="hay" position={[-0.9, 0.5, 4.2]} size={[1.5, 1.0, 1.0]} />
    <Vox kind="hay" position={[0.75, 0.5, 4.3]} size={[1.5, 1.0, 1.0]} />
    <Flowers n={50} area={[30, 6]} seed={5} skip={(_x, z) => z < 0.2} />
    {Array.from({ length: 22 }, (_, i) => {
      const x = (i - 11) * 5 + rnd(i, 1) * 2;
      return <Tree key={i} position={[x, 0, -16 - rnd(i, 2) * 10]} height={5 + rnd(i, 3) * 2} leaf={i % 2 ? "#3f7f2d" : "#4a8f35"} />;
    })}
    <Glow position={[0, 3, -3]} size={10} color={night ? "#ffcf8a" : "#fff2c0"} opacity={night ? 0.12 : 0} />
    {night ? <Night /> : null}
  </group>
);

/** Under a roof there is no sky: a dark box far outside the set. */
const Dark: React.FC<{ color?: string }> = ({ color = "#07080f" }) => (
  <mesh>
    <boxGeometry args={[70, 50, 70]} />
    <meshBasicMaterial color={color} side={1} fog={false} />
  </mesh>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night" || look === "lantern-night";
  return (
    <>
      <Zone name="under">
        <Under />
      </Zone>
      <Zone name="room">
        <Dark />
      </Zone>
      <Zone name="rim">
        <Rim night={night} rays={look === "overworld-sunset" ? 0.09 : look === "overworld-day" ? 0.04 : 0} />
      </Zone>
      <Zone name="meadow">
        <Meadow />
      </Zone>
      <Zone name="daytown">
        <DayTownGround night={night} />
      </Zone>
    </>
  );
};

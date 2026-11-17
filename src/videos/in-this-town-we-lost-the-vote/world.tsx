import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Hut, Moon, Stars } from "../../../Topics/InThisTown";
import { GATE_Z, HOME, STAGE_Z, WHO } from "./kit";

/**
 * Where it happens.
 *
 *   town    One street, running north from the gate to the stage: a house and a mailbox for each of them. The gate,
 *           the stage, the mailboxes and everybody who lives here are drawn by the scenes (kit.tsx), because they
 *           change: flags go up, the stage is taken away, the gate opens.
 *   stage   The night of a vote, as she remembers it: the same stage in the dark, lit from the front, and the players
 *           as a crowd of heads. Only the floor is here.
 *   out     Out there, where the real ones live: a player's storage room. Planks, a wall, and chests the scene draws.
 *
 * Day, sunset, storm and night are the shot's `look`.
 */

const ROOF = ["#8a3b2a", "#3f5f9a", "#5f8a3a", "#7a4a8a", "#9a7a2a", "#3f8a8a", "#8a3b2a", "#4a4a52"];

const Street: React.FC<{ night: boolean; warm: boolean }> = ({ night, warm }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    <Vox kind="path" position={[0, 0.02, (GATE_Z + STAGE_Z) / 2 + 14]} size={[3.2, 0.06, GATE_Z - STAGE_Z + 30]} />
    {WHO.map((who, i) => {
      const west = HOME[who].box[0] < 0;
      return <Hut key={who} at={[west ? -4.4 : 4.4, 0, HOME[who].box[2] - 0.6]} w={4.2} d={4.4} h={3.3} turn={west ? Math.PI / 2 : -Math.PI / 2} roof={ROOF[i]} wall="planks" windows={[-1.2, 1.2]} lit={night} />;
    })}
    {Array.from({ length: 70 }, (_, i) => {
      const x = ((i * 53) % 100) / 100;
      const z = ((i * 31 + 17) % 100) / 100;
      const px = (x - 0.5) * 44;
      const pz = STAGE_Z - 6 + z * 50;
      if (Math.abs(px) < 2.2 || (Math.abs(px) > 2.4 && Math.abs(px) < 9 && pz < 6 && pz > -17)) return null;
      const c = ["#ffe14a", "#ffffff", "#e8566a", "#ffe14a"][i % 4];
      return (
        <group key={i} position={[px, 0, pz]}>
          <Block position={[0, 0.1, 0]} size={[0.04, 0.2, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.23, 0]} size={[0.14, 0.1, 0.14]} color={c} castShadow={false} />
        </group>
      );
    })}
    {Array.from({ length: 54 }, (_, i) => {
      const a = (i / 54) * Math.PI * 2;
      const r = 24 + ((i * 37) % 100) / 5;
      const x = Math.sin(a) * r;
      const z = Math.cos(a) * r - 4;
      if (Math.abs(x) < 4 && z > 0) return null;
      return <Tree key={i} position={[x, 0, z]} height={5 + (i % 4)} leaf={i % 2 ? "#3f7f2d" : "#356430"} />;
    })}
    {night ? null : <GodRay position={[-3, 7, 0]} rotation={[0, 0, 0.5]} width={6} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.1 : 0.05} />}
    <LightPool position={[0, 0.05, 2]} width={8} depth={10} color={night ? "#ffcf8a" : "#fff2c0"} opacity={night ? 0.16 : 0.12} />
    <Glow position={[0, 1.6, -6]} size={3} color={night ? "#ffcf8a" : "#fff0c0"} opacity={night ? 0.1 : 0.08} />
    <Dust position={[0, 2.2, 0]} area={[14, 4, 26]} count={60} size={0.045} color={night ? "#ffe6c0" : "#fff7d8"} opacity={0.5} seed={3} speed={0.2} />
    {night ? <Moon position={[-16, 58, -90]} radius={7} /> : <Clouds y={48} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  return (
    <>
      {night ? <directionalLight color="#b9c4ff" intensity={0.4} position={[-5, 9, 12]} /> : null}
      {night ? <ambientLight color="#8088e0" intensity={0.22} /> : null}
      <Zone name="town">
        <Street night={night} warm={look === "overworld-sunset"} />
      </Zone>
      <Zone name="stage">
        <Vox kind="darkPlanks" position={[0, -0.5, STAGE_Z + 10]} size={[60, 1, 60]} />
        <Block position={[0, 9, STAGE_Z - 6]} size={[60, 20, 0.5]} color="#0c0a14" castShadow={false} />
        <Stars center={[0, 0, STAGE_Z]} />
      </Zone>
      <Zone name="out">
        <Vox kind="planks" position={[0, -0.5, 0]} size={[30, 1, 30]} />
        <Vox kind="darkPlanks" position={[0, 2.5, -3]} size={[30, 5, 0.5]} />
        <Vox kind="log" position={[-3.2, 2.5, -2.7]} size={[0.5, 5, 0.5]} />
        <Vox kind="log" position={[3.2, 2.5, -2.7]} size={[0.5, 5, 0.5]} />
        <Glow position={[0, 2, -2]} size={5} color="#ffe6b0" opacity={0.1} />
      </Zone>
    </>
  );
};

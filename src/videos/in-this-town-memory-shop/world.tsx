import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Sign, Tree, Vox, Zone, useActiveShot, useFilmTime } from "../../engine";
import { Fence, Hut, LampPost, Lantern, Room, Stall, Well } from "../../../Topics/InThisTown";
import { Jar, Pipe, Z, at } from "./kit";

/** Five sets in one world. The camera always sees the story in its own distinct place. */
const Village: React.FC = () => {
  const shot = useActiveShot();
  const time = useFilmTime();
  const shake = shot?.shot.cue === "1.shook" ? Math.sin(time * 33) * 0.035 : 0;
  const night = shot?.shot.look === "overworld-night";
  return <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[80, 1, 65]} />
    <Vox kind="path" position={[0, 0.02, 1.2]} size={[50, 0.06, 4.8]} />
    <group position={[shake, 0, 0]}>
      <Hut at={[0, 0, -5]} w={7} d={6} h={4.4} tint="#bd9a70" roof="#705080" windows={[-2, 2]} lit={night} />
      <Sign position={[0, 3.62, -4.76]} width={2.7} height={0.48} title="MEMORY SHOP" bg="#5e3e62" fg="#fff0c9" frame lit={0.3} />
      <Pipe position={[-3.2, 0, -4.68]} />
      <Jar position={[-1.95, 1.5, -4.7]} scale={0.55} />
      <Jar position={[1.95, 1.5, -4.7]} scale={0.55} />
    </group>
    <Hut at={[-10, 0, -5]} w={6} h={3.6} roof="#8a4934" windows={[-1.7, 1.7]} />
    <Hut at={[9, 0, -5]} w={6} h={3.8} tint="#d2b08a" roof="#537448" windows={[-1.7, 1.7]} />
    <Hut at={[18, 0, -5]} w={6} roof="#70546e" windows={[-1.6, 1.6]} />
    <Hut at={[-13, 0, 11]} w={7} turn={Math.PI} roof="#8a4934" />
    <Hut at={[12, 0, 12]} w={7} turn={Math.PI} roof="#537448" />
    <Well position={[-6, 0, 5.8]} /><Stall position={[5, 0, -2]} />
    <LampPost position={[-5, 0, -2.8]} /><LampPost position={[6.5, 0, 5]} />
    {night ? <><pointLight position={[0, 3.2, 0]} color="#b5dcff" intensity={30} distance={15} /><pointLight position={[-2, 2, -3.2]} color="#ffd99c" intensity={15} distance={8} /></> : null}
    {([-18, -12, 12, 20] as number[]).map((x, i) => <Tree key={x} position={[x, 0, -13]} height={4 + (i % 2)} />)}
    <Clouds y={48} center={[0, 0, 0]} />
    <GodRay position={[-3, 7, -2]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff1cf" opacity={0.07} />
    <LightPool position={[0, 0.06, 1]} width={10} depth={8} color="#ffe7b0" opacity={0.14} />
    <Glow position={[0, 3, -4.4]} size={1.6} color="#b8eaff" opacity={0.18} />
    <Dust position={[0, 2, 0]} area={[24, 4, 10]} count={50} size={0.04} color="#fff1d7" opacity={0.5} seed={3} speed={0.16} />
  </>;
};
const River: React.FC = () => <group position={[0, 0, Z.river]}>
  <Vox kind="grass" position={[0, -0.55, 0]} size={[50, 1, 35]} />
  <Block position={[0, -0.02, 0]} size={[26, 0.08, 5.1]} color="#5aaed0" emissive="#1b658e" emissiveIntensity={0.18} />
  {[-5, -2.5, 0, 2.5, 5].map((x, i) => <Block key={x} position={[x, 0.03, i % 2 ? 0.6 : -0.7]} size={[1.3, 0.015, 0.07]} color="#bde5ed" transparent opacity={0.48} castShadow={false} />)}
  <Vox kind="sand" position={[0, 0.01, 2.9]} size={[26, 0.08, 0.7]} /><Vox kind="sand" position={[0, 0.01, -2.9]} size={[26, 0.08, 0.7]} />
  {[-9, -6, 7, 10].map((x, i) => <Tree key={x} position={[x, 0, i % 2 ? -5 : 6]} height={4.1 + (i % 2)} />)}
  {[-4, -2, 3, 5].map((x) => <group key={x} position={[x, 0, 3.1]}><Block position={[0, 0.25, 0]} size={[0.07, 0.5, 0.07]} color="#66863c" /><Block position={[0.1, 0.35, 0]} size={[0.24, 0.07, 0.07]} color="#89a347" /></group>)}
  <Fence from={[-10, 0, -6]} to={[-3, 0, -6]} /><Clouds y={45} center={[0, 0, 0]} />
  <GodRay position={[-3, 6, -4]} rotation={[0, 0, 0.5]} width={4} height={11} color="#fff7cf" opacity={0.07} />
  <LightPool position={[0, 0.03, 0]} width={8} depth={4} color="#c9efff" opacity={0.1} />
  <Glow position={[-4, 3, -9]} size={3} color="#fff2be" opacity={0.12} />
  <Dust position={[0, 1.5, 0]} area={[13, 3, 6]} count={30} size={0.035} color="#fff6c8" opacity={0.4} seed={9} />
</group>;
const Shop: React.FC = () => <group position={[0, 0, Z.shop]}>
  <Vox kind="planks" position={[0, -0.18, 0]} size={[12, 0.36, 9]} />
  <Vox kind="darkPlanks" tint="#5c4339" position={[0, 2.5, -3.5]} size={[12, 5, 0.3]} />
  {[-5.5, 5.5].map((x) => <Vox key={x} kind="log" position={[x, 2.6, -1.7]} size={[0.35, 5.2, 3.8]} />)}
  {[-3, 0, 3].map((x) => <group key={x} position={[x, 0, -3.1]}><Vox kind="darkPlanks" position={[0, 1.2, 0]} size={[2.5, 0.15, 0.55]} /><Vox kind="darkPlanks" position={[0, 2.2, 0]} size={[2.5, 0.15, 0.55]} /><Jar position={[-0.8, 1.3, 0]} scale={0.65} /><Jar position={[0, 1.3, 0]} scale={0.65} /><Jar position={[0.8, 1.3, 0]} scale={0.65} /><Jar position={[-0.5, 2.3, 0]} scale={0.65} /><Jar position={[0.5, 2.3, 0]} scale={0.65} /></group>)}
  <Vox kind="darkPlanks" tint="#8a5a3e" position={[0, 0.56, -0.8]} size={[4.3, 1.12, 0.85]} />
  <Vox kind="planks" tint="#c6925d" position={[0, 1.14, -0.8]} size={[4.5, 0.12, 1.02]} />
  <Lantern position={[-3, 3.8, -1]} light={6} /><Lantern position={[3, 3.8, -1]} light={6} />
  <pointLight position={[0, 2.1, 3]} color="#ffd7aa" intensity={12} distance={12} />
  <GodRay position={[-2, 3, -0.2]} rotation={[0, 0, 0.4]} width={2} height={6} color="#ffe2a2" opacity={0.08} />
  <LightPool position={[0, 0.02, 0]} width={5} depth={4} color="#ffd39a" opacity={0.2} />
  <Glow position={[0, 2.3, -2.8]} size={2} color="#5adfff" opacity={0.13} />
  <Dust position={[0, 2, -0.5]} area={[7, 3, 5]} count={45} size={0.035} color="#c7efff" opacity={0.5} seed={4} />
</group>;
const Factory: React.FC = () => <group position={[0, 0, Z.factory]}>
  <Vox kind="stoneBrick" tint="#555b60" position={[0, -0.25, 0]} size={[14, 0.5, 12]} />
  <Vox kind="stoneBrick" tint="#4b525a" position={[0, 3, -4]} size={[14, 6, 0.4]} />
  {[-6.4, 6.4].map((x) => <Vox key={x} kind="stoneBrick" tint="#3f474d" position={[x, 3, -1.7]} size={[0.45, 6, 5]} />)}
  {[-4, 0, 4].map((x) => <group key={x}><Vox kind="log" tint="#4a3632" position={[x, 2.8, -3.7]} size={[0.32, 5.6, 0.35]} /><Block position={[x, 4.2, -3.45]} size={[1.6, 0.12, 0.35]} color="#736b56" /><Jar position={[x - 0.5, 4.28, -3.3]} scale={0.58} /><Jar position={[x + 0.3, 4.28, -3.3]} scale={0.58} /></group>)}
  {Array.from({ length: 5 }, (_, i) => <Vox key={i} kind="cobble" position={[-4.8, 0.2 + i * 0.27, 1.6 - i * 0.5]} size={[1.5, 0.4 + i * 0.54, 0.55]} />)}
  <Lantern position={[-4.7, 4.7, -1.2]} light={7} /><Lantern position={[4.8, 4.7, -1.2]} light={7} />
  <pointLight position={[0, 2.6, 3.1]} color="#a1dce5" intensity={12} distance={11} />
  <pointLight position={[2.8, 1.3, 0.8]} color="#efae59" intensity={5} distance={6} />
  <GodRay position={[-3, 4.4, -1]} rotation={[0, 0, 0.5]} width={2} height={7} color="#91dcff" opacity={0.09} />
  <LightPool position={[0, 0.03, 0]} width={7} depth={4} color="#76c9dd" opacity={0.13} />
  <Glow position={[0.9, 2.1, -0.5]} size={2.2} color="#58dafa" opacity={0.16} />
  <Dust position={[0, 2.3, 0]} area={[10, 4, 6]} count={55} size={0.045} color="#b3e8ec" opacity={0.5} seed={8} />
</group>;

export const World: React.FC = () => <>
  <Zone name="village"><Village /></Zone>
  <Zone name="river"><River /></Zone>
  <Zone name="room"><Room at={at("room", 0, 0, 0)} night={false} /></Zone>
  <Zone name="shop"><Shop /></Zone>
  <Zone name="factory"><Factory /></Zone>
</>;

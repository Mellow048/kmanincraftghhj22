import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox } from "../../engine";
import { Hut } from "../../../Topics/InThisTown";

export const World: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[80, 1, 60]} />
    <Vox kind="path" position={[0, 0.02, 1]} size={[40, 0.06, 5]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Tree position={[-8, 0, -6]} height={4.4} />
    <Tree position={[8, 0, -5]} height={4} />
    <Clouds y={48} center={[0, 0, 0]} />
    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.2} />
    <pointLight position={[3, 3, 5]} color="#fff0d0" intensity={6} distance={12} decay={2} />
    <pointLight position={[-3, 2.5, 4]} color="#ffe0b0" intensity={4} distance={12} decay={2} />
    <pointLight position={[0, 3, -2]} color="#d0e0ff" intensity={5} distance={12} decay={2} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={40} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);


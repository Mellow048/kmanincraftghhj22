import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Vox, Zone } from "../../engine";
import { Car } from "./kit";

const Driveway: React.FC = () => <>
  <Vox kind="stone" tint="#c2c0b9" position={[0,-.5,0]} size={[28,1,24]} />
  <Vox kind="path" position={[0,.035,1.1]} size={[13,.07,7]} />
  <Vox kind="stone" tint="#434447" position={[0,-.015,9]} size={[28,.04,7]} />
  <Block position={[0,2.2,-6.3]} size={[15,4.4,.45]} color="#c7b999"/>
  <Block position={[-4,1.3,-6.02]} size={[3.6,2.6,.08]} color="#667485"/>
  <Block position={[4,1.4,-6.02]} size={[3.2,2.4,.08]} color="#78929c"/>
  <Car/>
  <GodRay position={[-3,6,-1]} rotation={[.1,0,.15]} width={7} height={11} color="#fff0c8" opacity={.08}/>
  <LightPool position={[0,.04,1]} width={10} depth={9} color="#ffe3aa" opacity={.1}/>
  <Glow position={[0,3.7,-2]} size={1.2} color="#fff0cf" opacity={.12}/>
  <Dust position={[0,2.5,1]} area={[12,5,10]} size={.025} count={28} opacity={.18} seed={12} speed={.08}/>
</>;

const Kitchen: React.FC = () => <>
  <Vox kind="planks" position={[0,-.13,0]} size={[12,.26,12]}/>
  <Block position={[0,2,-5.9]} size={[12,4,.25]} color="#d7c7a4" castShadow={false}/>
  <Block position={[-5.85,2,0]} size={[.25,4,12]} color="#c9b68e" castShadow={false}/>
  <Block position={[5.85,2,0]} size={[.25,4,12]} color="#d9c6a0" castShadow={false}/>
  <Vox kind="planks" position={[0,.48,-4.7]} size={[7.5,.96,.8]}/>
  <Block position={[0,1.03,-4.25]} size={[7.7,.12,1.05]} color="#d6c3a0"/>
  {[-4,-2,0,2,4].map((x)=><Block key={x} position={[x,1.85,-5.7]} size={[1.5,1.55,.42]} color={x===0?"#7f9c90":"#c0ae88"}/>)}
  <Block position={[3.7,1.4,-2.4]} size={[1.05,2.8,.8]} color="#aec7c7"/>
  <Block position={[3.7,.52,-1.95]} size={[.08,.07,.06]} color="#667979"/>
  <Block position={[-2.2,.48,.5]} size={[3.2,.13,1.5]} color="#8c5a35"/>
  {[-1.0,1.0].map(x=>[-.45,.45].map(z=><Block key={`${x}-${z}`} position={[-2.2+x,.22,.5+z]} size={[.09,.45,.09]} color="#5a3b29"/>))}
  <Block position={[0,2.9,-5.68]} size={[3.3,.06,.05]} color="#5d5548"/>
  <GodRay position={[0,2.8,-1]} rotation={[.4,0,0]} width={3.2} height={2.3} color="#fff1cf" opacity={.07}/>
  <LightPool position={[0,.03,0]} width={7} depth={6} color="#ffe8bf" opacity={.1}/>
  <Glow position={[3.7,2.9,-2.4]} size={.5} color="#ffe7ba" opacity={.08}/>
  <Dust position={[0,1.8,0]} area={[8,3,8]} size={.018} count={24} opacity={.12} seed={4} speed={.05}/>
</>;

const Hall: React.FC = () => <>
  <Vox kind="stone" position={[0,-.15,0]} size={[11,.3,13]}/>
  <Block position={[0,2.3,-5.9]} size={[11,4.6,.25]} color="#9d9585" castShadow={false}/>
  <Block position={[-5.4,2.2,0]} size={[.22,4.4,12]} color="#b0a590" castShadow={false}/>
  <Block position={[5.4,2.2,0]} size={[.22,4.4,12]} color="#a79c87" castShadow={false}/>
  <Block position={[0,1.2,-5.68]} size={[2.05,2.4,.08]} color="#46362d"/>
  <Block position={[0,1.2,-5.59]} size={[1.76,2.12,.05]} color="#955b3e"/>
  <Block position={[.63,1.2,-5.54]} size={[.08,.08,.08]} color="#d9b15d"/>
  <Block position={[1.45,1.34,-5.51]} size={[.22,.55,.1]} color="#343a3c"/>
  <Block position={[1.45,1.36,-5.44]} size={[.09,.09,.03]} color="#e2d9bf"/>
  <Block position={[-3.9,1.2,-5.51]} size={[.85,2.5,.12]} color="#526b83"/>
  <Block position={[-3.9,2.25,-5.42]} size={[.68,.75,.03]} color="#8bb6ca"/>
  <Block position={[0,.02,0]} size={[8,.04,7]} color="#526b83" opacity={.28} transparent/>
  <GodRay position={[0,4,-2]} rotation={[.15,0,0]} width={3} height={7} color="#c7dce8" opacity={.06}/>
  <LightPool position={[0,.04,0]} width={5} depth={7} color="#e9d8b3" opacity={.09}/>
  <Glow position={[1.45,1.7,-5.1]} size={.28} color="#e8cf87" opacity={.13}/>
  <Dust position={[0,1.2,0]} area={[7,2,6]} size={.018} count={20} opacity={.1} seed={9} speed={.04}/>
</>;

export const World: React.FC = () => <>
  <Zone name="driveway"><Driveway/></Zone>
  <Zone name="kitchen"><Kitchen/></Zone>
  <Zone name="hall"><Hall/></Zone>
</>;

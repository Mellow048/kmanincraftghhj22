import React from 'react';
import { Block,Vox,Tree,Torch,PixelText,Dust,LightPool,Glow,GodRay,Zone } from '../../engine';

const House:React.FC<{x:number;z:number;stone?:boolean}> = ({x,z,stone=false}) => <group position={[x,0,z]}>
 <Vox kind={stone?'cobble':'planks'} position={[0,1.8,0]} size={[5,3.6,4]}/>
 <Vox kind="cobble" position={[0,.25,0]} size={[5.2,.5,4.2]}/>
 {[0,1,2].map(i=><Vox key={i} kind="planks" position={[0,3.7+i*.42,0]} size={[5.7-i*1.2,.45,4.7]} tint="#5f3824"/>)}
 {[-1.5,1.5].map(a=><group key={a}><Block position={[a,2,2.03]} size={[.9,1.2,.05]} color="#9bcee1" opacity={.65}/><Vox kind="log" position={[a-.5,2,2.07]} size={[.12,1.4,.12]}/><Vox kind="log" position={[a+.5,2,2.07]} size={[.12,1.4,.12]}/><Block position={[a,2,2.09]} size={[1,.08,.04]} color="#483726"/></group>)}
 <Vox kind="planks" position={[0,1.1,2.05]} size={[.85,2.1,.1]} tint="#654025"/>
 <Torch position={[.75,1.8,2.16]} light={3}/>
</group>;
const Floor:React.FC = () => <><Vox kind="grass" position={[0,-.2,-4]} size={[70,.4,70]}/><Vox kind="cobble" position={[0,-.04,0]} size={[8,.16,16]}/>{[-4.2,4.2].map(x=><Vox key={x} kind="stone" position={[x,.04,0]} size={[.3,.2,17]}/>)}{Array.from({length:7},(_,i)=><Block key={i} position={[0,.055,i*2.5-8]} size={[.12,.02,.85]} color="#e7d799"/>)}</>;
export const World:React.FC = () => <>
 <Zone name="drive"><Floor/><House x={-5.8} z={-3}/><House x={5.8} z={-6} stone/>
 <Vox kind="stone" position={[.4,.02,-.8]} size={[5,.12,7]} tint="#738087"/>
 {[-10,10,-15,15].map((x,i)=><Tree key={x} position={[x,0,-11+(i%2)*5]} height={5+i%3}/>)}
 <Vox kind="planks" position={[-4,1,-9]} size={[18,2,.2]} tint="#786042"/>
 <Torch position={[-2.8,1.5,-2.4]} light={5}/><Torch position={[3,1.5,-3]} light={5}/>
 <LightPool position={[0,.12,.5]} width={8} depth={7} color="#a0dce4" opacity={.12}/>
 <Glow position={[-2.8,2,-2.4]} color="#ffbd66" size={1.1}/>
 <GodRay position={[1,6,-3]} height={12} width={4} color="#b1d7f6" opacity={.08}/>
 <Dust position={[0,1.4,0]} area={[9,3,9]} count={38} seed={41} opacity={.25}/>
 </Zone>
 <Zone name="road"><group position={[40,0,0]}><Floor/><House x={-6} z={-4}/><House x={6} z={-7} stone/><House x={-6} z={-12} stone/><Tree position={[8,0,-12]} height={6}/><Torch position={[-3.3,2,-3]} light={5}/><Torch position={[3.3,2,-8]} light={4}/></group></Zone>
 <Zone name="shop"><group position={[-40,0,0]}>
 <Vox kind="stone" position={[0,-.12,-1]} size={[24,.25,24]}/>
 <Vox kind="cobble" position={[0,2,-7]} size={[16,4,.4]}/>
 <Vox kind="stone" position={[-8,2,-3]} size={[.4,4,8]}/>
 <Vox kind="stone" position={[8,2,-3]} size={[.4,4,8]}/>
 {[-5,0,5].map(x=><group key={x}><Block position={[x,3.2,-6.7]} size={[3.5,1.2,.06]} color="#a5e7ee" emissive="#9dcde3" emissiveIntensity={.35}/><Block position={[x,4,-2]} size={[.18,.12,5]} color="#ebf9ff" emissive="#c7efff" emissiveIntensity={2}/></group>)}
 <PixelText text="DIAMOND AUTO" position={[0,3.4,-4.8]} height={.55} maxWidth={7}/>
 <PixelText text="DETAILING BAY 01" position={[0,2.65,-4.8]} height={.23} color="#78d9e6"/>
 <Block position={[-4.4,.6,-2.5]} size={[1.5,1.2,.7]} color="#a53428"/>
 {[0,1,2,3].map(i=><Block key={i} position={[-4.4,.25+i*.26,-2.12]} size={[1.3,.04,.06]} color="#c6cfd2"/>)}
 <LightPool position={[0,.03,0]} width={14} depth={13} color="#c4efff" opacity={.14}/>
 <GodRay position={[1,6,-3]} height={12} width={6} color="#daeaff" opacity={.08}/>
 <Glow position={[0,4,-2]} color="#cdefff" size={2}/>
 <Dust position={[0,2,-1]} area={[14,4,10]} count={32} seed={12} opacity={.16}/>
 </group></Zone>
</>;

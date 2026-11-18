import React from 'react';
import { Block, Vox, MinecraftAvatar, PixelText, getPose } from '../../engine';
import type { Vec3 } from '../../engine';

export const Sponge: React.FC = () => <Vox kind="wool" size={[.27,.13,.20]} tint="#eac22c" position={[0,-.1,.03]}/>;
export const Bucket: React.FC<{position?:Vec3}> = ({position=[0,0,0]}) => <group position={position}>
  <Block position={[0,.17,0]} size={[.38,.34,.38]} color="#747e89"/>
  <Block position={[0,.35,0]} size={[.33,.025,.33]} color="#60bcdf"/>
  <Block position={[-.22,.38,0]} size={[.04,.3,.04]} color="#cbd6db"/>
  <Block position={[.22,.38,0]} size={[.04,.3,.04]} color="#cbd6db"/>
  <Block position={[0,.53,0]} size={[.47,.04,.04]} color="#cbd6db"/>
</group>;

/** A built car, not a sprite: wheels, interior, window panes, lamps and layered bodywork. */
export const Car: React.FC<{position?:Vec3;color?:string;dirty?:number;foam?:boolean;wreck?:boolean;spin?:number}> = ({position=[0,0,0],color='#23699b',dirty=0,foam=false,wreck=false,spin=0}) => <group position={position}>
  <Block position={[0,.54,0]} size={[1.83,.40,4.05]} color={color}/>
  <Block position={[0,.8,-.13]} size={[1.76,.25,3.78]} color={color}/>
  <Block position={[0,1.02,1.18]} size={[1.75,.18,1.30]} color={color}/>
  <Block position={[0,1.02,-1.47]} size={[1.75,.18,.8]} color={color}/>
  <Block position={[0,1.51,-.24]} size={[1.65,.14,1.72]} color={color}/>
  {[-.79,.79].map(x=><group key={x}>
    {[-1.03,.53].map(z=><Block key={z} position={[x,1.26,z]} size={[.09,.48,.10]} color={color}/>)}
    <Block position={[x,1.24,-.24]} size={[.025,.38,1.4]} color="#89c1d9" opacity={.26}/>
    <Block position={[x,.80,-.1]} size={[.08,.03,1.6]} color="#a8c1c9"/>
    <Block position={[x,.91,-.5]} size={[.08,.04,.25]} color="#d5e0df"/>
    <Block position={[x*1.2,1.13,.48]} size={[.22,.14,.22]} color={color}/>
  </group>)}
  <Block position={[0,1.25,.56]} size={[1.48,.39,.025]} color="#a5d2df" opacity={.29}/>
  <Block position={[0,1.25,-1.04]} size={[1.48,.39,.025]} color="#91b7d1" opacity={.32}/>
  {[-.43,.43].map(x=><group key={x}>
    <Block position={[x,.96,-.4]} size={[.60,.18,.58]} color="#252c35"/>
    <Block position={[x,1.12,-.66]} size={[.60,.4,.13]} color="#252c35"/>
  </group>)}
  <Block position={[0,1.07,.35]} size={[1.5,.15,.26]} color="#202730"/>
  {[-1,1].map(s=><group key={s}>
    <Block position={[0,.49,s*2.06]} size={[1.86,.14,.12]} color="#bfc8c9"/>
    {[-.61,.61].map(x=><Block key={x} position={[x,.78,s*2.055]} size={[.42,.20,.035]} color={s===1?'#fff0ad':'#df3423'} emissive={s===1?'#ffe7a5':'#ed291f'} emissiveIntensity={1.7}/>)}
  </group>)}
  <Block position={[0,.74,2.08]} size={[.60,.22,.025]} color="#17222b"/>
  {[0,1,2].map(i=><Block key={i} position={[0,.66+i*.06,2.10]} size={[.58,.018,.02]} color="#8f9ca3"/>)}
  <Block position={[0,.49,2.14]} size={[.55,.13,.02]} color="#ece3b7"/>
  {[-.91,.91].flatMap(x=>[-1.25,1.25].map(z=><group key={`${x}-${z}`} position={[x,.40,z]} rotation={[spin,0,Math.PI/2]}>
    <mesh castShadow><cylinderGeometry args={[.39,.39,.23,12]}/><meshStandardMaterial color="#14171c" roughness={1}/></mesh>
    <mesh position={[0,x>0?-.13:.13,0]}><cylinderGeometry args={[.23,.23,.025,8]}/><meshStandardMaterial color="#acb7bf" metalness={.7} roughness={.25}/></mesh>
    <Block position={[0,x>0?-.15:.15,0]} size={[.08,.03,.4]} color="#485765"/>
  </group>))}
  {Array.from({length:48},(_,i)=>{
    const x=((i*37%101)/101-.5)*1.7,z=((i*29%97)/97-.5)*3.7;
    return dirty>(i%12)/12?<Vox key={i} kind="dirt" position={[x,1.13,z]} size={[.26,.035,.28]} tint="#72512e"/>:null;
  })}
  {dirty>0 && [-.935,.935].flatMap(x=>Array.from({length:18},(_,i)=><Vox key={`${x}-${i}`} kind="dirt" position={[x,.66+(i%3)*.12,-1.7+(i%9)*.42]} size={[.025,.11,.31]} tint="#73522d"/>))}
  {foam && Array.from({length:30},(_,i)=><Block key={i} position={[(i*31%89)/89*1.6-.8,1.16+(i%3)*.03,(i*23%91)/91*3.4-1.7]} size={[.23,.13,.27]} color="#eefaff"/>)}
  {wreck && <group position={[.3,1.59,-.2]}><Block position={[0,.04,0]} size={[.48,.08,.48]} color="#171b1e"/><mesh position={[0,.29,0]}><coneGeometry args={[.2,.5,4]}/><meshStandardMaterial color="#f17820"/></mesh><Block position={[0,.28,0]} size={[.2,.08,.2]} color="white"/></group>}
</group>;

export const Worker: React.FC<{position?:Vec3;time:number;wash?:boolean;fast?:boolean;rotationY?:number;walk?:boolean;gloves?:boolean}> = ({position=[1.35,0,1],time,wash=false,fast=false,rotationY=-Math.PI/2,walk=false,gloves=true}) => {
 const p=getPose(walk?'walk':'idle',time);
 if(wash){p.armR=[-1.3+Math.sin(time*(fast?24:6))*.35,0,-.2];p.armL=[-.55,0,.12];p.bodyPitch=.16;p.head=[.2,0,0];}
 return <MinecraftAvatar position={position} rotationY={rotationY} outfit="hoodie" colors={{torso:'#247f7b',arms:'#247f7b',legs:'#293e64'}} face="calm" pose={p} blink={!fast} gaze={0} saccade={false} shoes="#252832" hair="#251b17" skin="#d9aa82">
 {gloves&&<Block position={[0,-.035,0]} size={[.245,.17,.25]} color="#ecbd29"/>}{wash&&<Sponge/>}
 </MinecraftAvatar>;
};
export const Friend: React.FC<{position:Vec3;time:number;blue?:boolean;surprise?:boolean}> = ({position,time,blue=false,surprise=false}) => <MinecraftAvatar position={position} rotationY={-.25} outfit="tee" colors={{torso:blue?'#355fb5':'#b24938',arms:'skin',legs:'#2e313c'}} face={surprise?'wow':'smug'} animation={surprise?'scared':'wave'} time={time} hair={blue?'#a77032':'#241815'}/>;
export const Card: React.FC<{text:string;position?:Vec3}> = ({text,position=[0,3.05,0]}) => <group position={position}>{text.split('|').map((s,i)=><PixelText key={i} text={s} position={[0,-i*.29,0]} height={.24} maxWidth={3.5}/>)}</group>;

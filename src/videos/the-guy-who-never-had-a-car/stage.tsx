import React, {useMemo} from 'react';
import * as THREE from 'three';
import {Reflector} from 'three/examples/jsm/objects/Reflector.js';
import {Block,Vox,PixelText,MinecraftAvatar} from '../../engine';
import {Bucket,Car,Worker,Friend,Card} from './kit';

const Mirror:React.FC = () => {
 const mirror=useMemo(()=>new Reflector(new THREE.PlaneGeometry(1.52,.78),{textureWidth:512,textureHeight:512,color:0xd5e4ed}),[]);
 return <primitive object={mirror} position={[0,1.05,2.145]}/>;
};
const Water:React.FC<{time:number;fast:boolean}> = ({time,fast}) => <>{Array.from({length:24},(_,i)=>{
 const t=(time*(fast?5:1)+i*.063)%1;
 return <Block key={i} position={[1.05-t*.8,.8+Math.sin(t*Math.PI)*.7,1+(i%5)*.05+t*.8]} size={[.035,.035,.07]} color="#b9edff" opacity={.7}/>;
})}</>;
export const Stage:React.FC<{mode:string;time:number;absolute:number;offset:number;card:string}> = ({mode,time,absolute,offset,card}) => {
 const remastered=absolute>=6.8;
 const fast=mode==='fast'||absolute<6.8||(remastered&&['wash','dry','toothbrush','wipe','fail'].includes(mode));
 const washing=['wash','dry','fast','fail','wipe','toothbrush'].includes(mode);
 const late=['wreck','reunion','answer','pigeon','fast','wipe'].includes(mode)||(mode==='toothbrush'&&offset===-40);
 const clean=mode==='mirror'||mode==='leave'||mode==='end'||(mode==='wipe'&&time>.35);
 const dirty=late&&!clean?Math.max(0,mode==='wipe'?1-time/.35:1):0;
 const isRoad=mode==='cruise'||mode==='friends';
 const heroOff=['dream','mirror','cruise','friends','sponges','calendar','pigeon','end','sponge','lonely'].includes(mode);
 const departing=mode==='leave';
 const arriving=mode==='arrive';
 const heroPos:[number,number,number]=departing?[1.35,0,1-time*1.7]:arriving?[1.35,0,2-time*1.5]:[1.35,0,1];
 return <group position={[offset,0,0]}>
  <pointLight position={[2.7,3.5,4]} intensity={34} distance={14} decay={2} color={offset===-40?'#e2f4ff':'#c3e6ff'}/>
  <pointLight position={[-2,2.8,2]} intensity={18} distance={10} decay={2} color="#ffcd93"/>
  <Car position={isRoad?[0,0,-time*1.65]:[0,0,-.35]} color={isRoad?'#b63728':clean?'#b7d6e3':'#286989'} dirty={dirty} foam={washing&&mode!=='dry'&&mode!=='toothbrush'} wreck={mode==='wreck'||mode==='reunion'} spin={isRoad?time*8:0}/>
  {offset===-40&&<><Car position={[-4.5,0,-2]} color="#f0e6c8"/><Car position={[4.5,0,-3]} color="#803831"/></>}
  {!heroOff&&<Worker position={heroPos} time={time} wash={washing} fast={fast} rotationY={['answer','react','gloves'].includes(mode)?0:departing?Math.PI:-.6} walk={departing||arriving} action={remastered?mode:''}/>}
  {(mode==='dream'||mode==='lonely'||mode==='sponge')&&<Worker position={mode==='sponge'?[1.35,0,1]:[1.9,0,2.5]} time={time} rotationY={mode==='sponge'?0:-.6} gloves={mode!=='lonely'} holdSponge={mode==='sponge'} action={remastered?mode:''}/>}
  {isRoad&&<><Friend position={[-.43,.16,-.5-time*1.65]} time={time} seated/><Friend position={[.43,.16,-.5-time*1.65]} time={time+.4} blue seated/></>}
  {(mode==='invite'||mode==='reunion'||mode==='wreck')&&<><Friend position={[-1.5,0,1.7]} time={time} surprise={late}/><Friend position={[2.8,0,1.6]} time={time+.3} blue surprise={late}/></>}
  {washing&&<Water time={time} fast={fast}/>}
  {mode==='fail'&&<Vox kind="wool" position={[.95,.87,.15]} size={[.03,.22,1.3]} tint="#b63829"/>}
  <Bucket position={[1.9,0,2.1]}/>
  {mode==='dry'&&<Vox kind="wool" position={[.8+Math.sin(time*23)*.4,1.15,1.05]} rotation={[0,Math.sin(time*23)*.5,0]} size={[.6,.04,.42]} tint="#e2e2cc"/>}
  {mode==='meal'&&<group position={[.8,.48,2.1]}><Block size={[.9,.1,.7]} color="#e2e0cd"/>{[0,1,2,3,4,5].map(i=><Block key={i} position={[-.3+(i%3)*.16,.09,Math.floor(i/3)*.14-.1]} size={[.13,.09,.12]} color="#f3f1dc"/>)}<Block position={[.22,.1,0]} size={[.3,.12,.4]} color="#c6945c"/></group>}
  {mode==='sponges'&&Array.from({length:46},(_,i)=><Vox key={i} kind="wool" position={[-1.4+(i*17%19)*.14,.1+Math.floor(i/13)*.12+Math.max(0,1-time*5-(i%7)*.1)*1.7,1+(i*13%17)*.09]} size={[.24,.12,.19]} tint={i%3?'#978047':'#b5a458'}/>)}
  {mode==='calendar'&&<group position={[.2,1.4,2]} rotation={[Math.sin(time*26)*.13,0,0]}><Block size={[1.2,1.5,.05]} color="#e9e3c8"/><Block position={[0,.6,.04]} size={[1.2,.28,.04]} color="#ad3027"/><PixelText text="MONDAY" position={[0,.6,.07]} height={.16} maxWidth={1.05}/><PixelText text={String(1+Math.floor(time*20)%28)} position={[0,.05,.07]} height={.5} color="#252e38"/><PixelText text="SHOW UP" position={[0,-.5,.07]} height={.12} color="#252e38"/></group>}
  {mode==='pigeon'&&<group position={[0,1.76+Math.max(0,1-time)*1.5,0]}><Block size={[.25,.2,.33]} color="#929ca2"/><Block position={[0,.13,.13]} size={[.16,.18,.16]} color="#687879"/><Block position={[0,.13,.24]} size={[.07,.04,.1]} color="#d7b666"/></group>}
  {clean&&<><Mirror/><Worker position={[0,0,6.2]} time={time} rotationY={Math.PI}/><Friend position={[-1.2,0,6.3]} time={time} rotationY={Math.PI} surprise/><Friend position={[1.2,0,6.3]} time={time} rotationY={Math.PI} blue surprise/></>}
  {card&&<Card text={card} offset={offset}/>}
 </group>;
};

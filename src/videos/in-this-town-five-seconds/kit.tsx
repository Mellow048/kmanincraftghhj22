import type React from "react";
import { Freeze, Internals } from "remotion";
import { Block, MinecraftAvatar, Vox } from "../../engine";
import type { MinecraftAvatarProps, Vec3, Pose } from "../../engine";
import { Villager, ROBE, wordClock } from "../../../Topics/InThisTown";
import { timing, worldFrame, activeStop } from "./timeline";
export * from "../../../Topics/InThisTown";
export { Classmate, Teacher } from "../../../Topics/WhatIf/cast";
export { timing, cue, at, STOP, STOPS, activeStop, worldFrame, worldTime, paused, BLACK_AT } from "./timeline";
export * from "./motion";
export const wordAt=wordClock(timing);
export const TEEN=.95;
export const F=(p:Vec3):Vec3=>[p[0],p[1]+1.46,p[2]];
export const CHEST=(p:Vec3):Vec3=>[p[0],p[1]+1.06,p[2]];
export const HOME:Vec3=[-5,0,-2];
export const HOME_WINDOW:Vec3=[-3.6,1.72,-2];
export const HOME_BED:Vec3=[-5.5,.62,-4.45];
export const CLASS_HERO:Vec3=[0,-.055,1.25];
export const CLASS_FRIEND:Vec3=[-2.4,-.08,1.25];
export const TABLE_HERO:Vec3=[-.65,0,.64];
export const TABLE_FRIEND:Vec3=[.65,0,-.65];

/** SAME Freeze Bell identity, grown to a teen; only the requested shirt/scale change. */
export const Hero:React.FC<Partial<MinecraftAvatarProps>>=p=><MinecraftAvatar scale={TEEN} outfit="tee" skin="#dba47c" hair="#3b2319" colors={{torso:"#d83832",arms:"skin",legs:"#314b79"}} face="calm" blink phase={.31} {...p}/>;
export const Stranger:React.FC<Partial<MinecraftAvatarProps>>=p=><MinecraftAvatar scale={1} outfit="tee" skin="#cf9e7c" hair="#645247" colors={{torso:"#f3efe4",arms:"#e9e6de",legs:"#d6d2c8"}} face="bearded" blink phase={1.12} leftHand={<Block position={[0,-.012,0]} size={[.228,.12,.228]} color="#cf9e7c"/>} {...p}><Block position={[0,-.012,0]} size={[.228,.12,.228]} color="#cf9e7c"/></MinecraftAvatar>;
export const Friend:React.FC<React.ComponentProps<typeof Villager>>=p=><Villager scale={.88} robe={ROBE.friend} phase={1.2} {...p}/>;
export const Mother:React.FC<React.ComponentProps<typeof Villager>>=p=><Villager scale={.96} robe={ROBE.white} phase={2.1} {...p}/>;
export const Elder:React.FC<React.ComponentProps<typeof Villager>>=p=><Villager scale={.92} robe={ROBE.elder} phase={.6} {...p}/>;
/** Freeze even the pack's hidden clocks: blink, breath, robe bob, rabbit nose, torch flicker and dust.
 * This is a GLOBAL world clock. Remotion 4.0.542's Freeze adds the current Sequence's relativeFrom before
 * clamping to composition length. Clearing that offset here prevents late scenes from clipping the clock
 * (observed at frame 2982 in the all-frame runtime audit). Only this film's non-hero descendants use it.
 */
export const WorldClock:React.FC<{t:number;children:React.ReactNode}>=({t,children})=><Internals.SequenceContext.Provider value={null}><Freeze frame={worldFrame(t*30)}>{children}</Freeze></Internals.SequenceContext.Provider>;
/** A frozen-world cue, not a screen overlay. It does not rotate/expand during the stop. */
export const StopHalo:React.FC<{t:number;position:Vec3;radius?:number}>=({t,position,radius=1.6})=>activeStop(t)?<group position={position}>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,.035,0]}><ringGeometry args={[radius-.025,radius,48]}/><meshBasicMaterial color="#9bdce7" transparent opacity={.5}/></mesh>

</group>:null;
export const Carrot:React.FC<{position?:Vec3;rotationY?:number;scale?:number}>=({position=[0,0,0],rotationY=0,scale=1})=><group position={position} rotation={[0,rotationY,-.6]} scale={scale}>
  <Block position={[0,.13,0]} size={[.11,.25,.1]} color="#ed8427"/><Block position={[0,-.03,0]} size={[.06,.12,.06]} color="#d86b21"/>
  {[-1,1].map(s=><Block key={s} position={[s*.03,.31,0]} size={[.035,.15,.035]} rotation={[0,0,s*.4]} color="#4c9d43"/>)}
</group>;
export const Chalk:React.FC<{position:Vec3;angle?:number}>=({position,angle=0})=><Block position={position} rotation={[0,0,angle]} size={[.15,.045,.045]} color="#f0eee0"/>;
export const Table:React.FC<{position?:Vec3;size?:[number,number]}> = ({position=[0,0,0],size=[2.5,.85]})=><group position={position}>
  <Vox kind="planks" tint="#c7a16d" position={[0,.76,0]} size={[size[0],.1,size[1]]}/>
  {[-1,1].flatMap(x=>[-1,1].map(z=><Vox key={`${x}${z}`} kind="log" position={[x*(size[0]/2-.12),.37,z*(size[1]/2-.1)]} size={[.13,.74,.13]}/>))}
</group>;
/** Linear pose interpolation for authored contacts; never an animation-name jump. */
export function poseMix(a:Partial<Pose>,b:Partial<Pose>,k:number):Partial<Pose>{
 const out:Partial<Pose>={}; for(const key of new Set([...Object.keys(a),...Object.keys(b)])){
   const x=a[key as keyof Pose], y=b[key as keyof Pose];
   if(Array.isArray(x)||Array.isArray(y)){const av=(x??[0,0,0]) as Vec3,bv=(y??[0,0,0]) as Vec3;(out as Record<string,unknown>)[key]=av.map((n,i)=>n+(bv[i]-n)*Math.max(0,Math.min(1,k)));}
   else (out as Record<string,unknown>)[key]=(x??0)+((y??0)-(x??0))*Math.max(0,Math.min(1,k));
 }return out;
}

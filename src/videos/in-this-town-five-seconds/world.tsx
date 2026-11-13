import type React from "react";
import { Block, Clouds, Curtains, Door, DoorFrame, Dust, Glow, GodRay, LightPool, PixelText, Tree, Vox, WallClock, useActiveShot, useFilmTime } from "../../engine";
import type { Vec3 } from "../../engine";
import { BedBox, Bread, Fence, Hut, LanternPost, Bowl, GlassCup, Book, HingedLocker, Rock } from "../../../Topics/InThisTown";
import { Classroom, SchoolHall } from "../../../Topics/WhatIf/school";
import { WorldClock, HOME, HOME_BED, STOP, cue, at, phase, smooth, mix, lockerMotion, rescueMotion, MAN_FREEZE, ROCK_START, Table, v, worldTime, FIRST_WALL, FIRST_IMPACT } from "./kit";

/** A shared continuous street, not a new set at every cut.
 * x east. z north is negative. The hero's real doorway is (-5,-2), elder's (0,-2).
 * A real opening in each facade lets the rescue and exit cross the threshold on camera.
 * Foreground sets are laid out here; ordinary background buildings remain the approved Hut.
 */
export const TickClock:React.FC<{position:Vec3}> = ({position})=>{
 const t=useFilmTime();return <group position={position}><WallClock radius={.25}/><group rotation={[0,0,-t*Math.PI/3]}><Block position={[0,.085,.06]} size={[.013,.17,.01]} color="#bc3e33"/></group></group>;
};
const Facade:React.FC<{at:Vec3;door:number;home?:boolean;night:boolean;curtain?:number}>=({at:p,door,home=false,night,curtain=1.2})=><group position={p}>
  <Vox kind="planks" position={[0,-.07,-2]} size={[4.8,.14,4.4]}/>
  <Vox kind="planks" tint={home?"#d0ac74":"#b7aa8c"} position={[-1.5,1.6,0]} size={[1.8,3.2,.18]} castShadow={false}/>
  <Vox kind="planks" position={[.1,2.78,0]} size={[1.4,.84,.18]} castShadow={false}/>
  <Vox kind="planks" position={[1.5,.52,0]} size={[1.6,1.04,.18]} castShadow={false}/>
  <Vox kind="planks" position={[1.5,2.72,0]} size={[1.6,.96,.18]} castShadow={false}/>
  <Vox kind="log" position={[2.35,1.6,0]} size={[.2,3.2,.24]}/>
  <Vox kind="log" position={[.78,1.62,0]} size={[.14,1.18,.21]}/>
  {[-1,1].map(s=><Vox key={s} kind="planks" position={[s*2.4,1.6,-2]} size={[.18,3.2,4.2]} castShadow={false}/>)}
  <Vox kind="planks" position={[0,1.6,-4.1]} size={[4.8,3.2,.16]} castShadow={false}/>
  <Vox kind="log" position={[0,3.15,.04]} size={[5,.22,.28]}/>
  {[0,1,2].map(i=><Vox key={i} kind="darkPlanks" tint={home?"#49734b":"#655479"} position={[0,3.4+i*.45,-2]} size={[5.3-i*1.35,.45,4.8]}/>)}
  <DoorFrame position={[0,0,.06]} width={1.4} height={2.35} color="#685039"/>
  <Door position={[-.65,0,.08]} width={1.3} height={2.3} color="#82613c" open={door}/>
  <Vox kind="stone" position={[0,.025,.45]} size={[1.55,.05,.92]}/>
  <Block position={[1.5,1.65,.04]} size={[1.38,1.2,.025]} color={night?"#8fb7da":"#b9e0eb"} opacity={.10} castShadow={false}/>
  <Block position={[1.5,1.65,.075]} size={[1.4,.055,.04]} color="#63452e"/>
  <Block position={[1.5,1.65,.075]} size={[.06,1.26,.04]} color="#63452e"/>
  <Vox kind="planks" position={[1.5,1.04,.14]} size={[1.7,.1,.35]}/>
  <Curtains position={[1.5,1.68,-.16]} width={1.65} height={1.32} gap={curtain} color={home?"#537e85":"#866387"}/>
  <LanternPost position={[-1.04,0,.2]} height={2.25} light={night?3:0} seed={home?23:29}/>
  {night?<><pointLight position={[0,1.6,-1.8]} color="#ffcc8b" intensity={9} distance={6}/><LightPool position={[0,.075,.72]} width={2.7} depth={2.8} color="#e7b879" opacity={.22}/></>:null}
  {home?<>
    <BedBox position={[-.5,0,-2.6]}/>
    <Table position={[1.4,0,-2.7]} size={[1.2,.7]}/><Bowl position={[1.45,.82,-2.7]}/>
    <TickClock position={[-1.15,2,-3.99]}/>
  </>:<><Table position={[1.5,0,-2.7]} size={[1.3,.8]}/><Bowl position={[1.4,.82,-2.7]}/><Block position={[-1.4,.3,-2.9]} size={[1.2,.6,.6]} color="#694c39"/></>}
</group>;
const Kitchen:React.FC<{t:number;night:boolean}>=({t,night})=>{
 const curtain=t<cue('2.curtains').start?1.25:t<cue('3.school').start?mix(1.25,.03,smooth(phase(t,at('2.curtains','closed'),cue('2.curtains').end-.12))):t>=cue('6.told').start?.08:1.25;
 return <>
 <Vox kind="planks" position={[0,-.08,.3]} size={[6.4,.16,16]}/>
 <Vox kind="planks" tint="#c7ab7c" position={[0,1.7,-2.55]} size={[6.4,3.4,.18]} castShadow={false}/>
 {[-1,1].map(s=><Vox key={s} kind="planks" position={[s*3.15,1.7,.4]} size={[.18,3.4,6]} castShadow={false}/>)}
 <Vox kind="planks" tint="#ab9877" position={[0,3.45,2]} size={[6.4,.12,12]} castShadow={false}/>
 <Vox kind="log" position={[0,3.1,-2.4]} size={[6.4,.24,.28]}/>
 <Block position={[1.48,1.82,-2.42]} size={[1.6,1.4,.1]} color="#695139"/>
 <Block position={[1.48,1.82,-2.35]} size={[1.42,1.24,.035]} color={night?"#577397":"#bbe0eb"} emissive="#c0d4df" emissiveIntensity={night?.15:.35}/>
 <Block position={[1.48,1.82,-2.31]} size={[.06,1.24,.035]} color="#695139"/>
 <Curtains position={[1.48,1.82,-2.22]} width={1.9} height={1.65} gap={curtain} color="#537e85"/>
 <DoorFrame position={[-1.75,0,-2.4]} width={1.1} height={2.2}/><Door position={[-2.25,0,-2.36]} width={1} color="#82613c"/>
 <TickClock position={[-.25,2.3,-2.35]}/>
 <Table position={[.1,0,.18]} size={[2.15,.8]}/>
 <Vox kind="cobble" position={[-2.1,.45,-1.3]} size={[1.4,.9,.72]}/><Block position={[-2.1,.92,-1.3]} size={[1.48,.06,.8]} color="#728d93"/>
 {t<cue('6.told').start||t>=cue('6.rule').start?<Bowl position={[-2.1,.96,-1.3]}/>:null}
 <Vox kind="planks" position={[-2.7,1.85,-2.35]} size={[.78,.08,.35]}/>
 <GlassCup position={[-2.75,1.9,-2.27]}/><Book position={[-2.5,1.94,-2.27]} scale={.65}/>
 <Block position={[2.45,.02,.55]} size={[.8,.04,2]} color="#6c877e"/>
 <LanternPost position={[2.7,0,-1.5]} height={2.4} light={4}/>
 <pointLight position={[-.5,2.5,2.5]} color="#d7e8ee" intensity={5} distance={7}/>
 <GodRay position={[1.4,1.5,-.5]} rotation={[.45,0,.3]} width={1.3} height={4} color="#c5e6f3" opacity={.06}/>
 <LightPool position={[1.2,.03,.65]} width={2.4} depth={3} color="#a7c9df" opacity={.13}/>
 <Glow position={[2.7,2.35,-1.5]} size={1.3} color="#ffd49c" opacity={.2}/>
 <Dust position={[0,1.7,0]} area={[5,2.7,4]} count={30} size={.022} opacity={.3} speed={.15}/>
 </>;
};
const Street:React.FC<{t:number;night:boolean;rescue:boolean}>=({t,night,rescue})=>{
 const elderDoor=rescue?rescueMotion(t).door:t>=cue('12.thanks').start?-1.7:0;
 const homeDoor=t>=cue('14.out').start?mix(0,-1.7,smooth(phase(t,cue('14.out').start,cue('14.out').start+.24))):t>=cue('10.night').start&&t<cue('12.window').start?-1.7:0;
 return <>
 <Vox kind="grass" position={[18,-.5,-3]} size={[115,1,75]}/>
 <Vox kind="path" position={[20,.022,1.2]} size={[102,.044,3.5]}/>
 <Vox kind="path" position={[0,.025,-.3]} size={[2.4,.05,8]}/>
 <group position={[FIRST_WALL[0],0,FIRST_WALL[2]]}>
  <Vox kind="cobble" position={[0,.23,0]} size={[3.1,.46,.35]}/>
  {[-1,1].map(side=><Vox key={side} kind="cobble" position={[side*1.15,1.05,0]} size={[.8,1.2,.35]}/>)}
  <Vox kind="cobble" position={[0,1.9,0]} size={[3.1,.5,.35]}/>
  {t<FIRST_IMPACT?<Vox kind="cobble" position={[0,1.05,0]} size={[1.5,1.2,.35]}/>:null}
 </group>
 <Facade at={HOME} door={homeDoor} home night={night} curtain={t>=cue('12.window').start&&t<cue('13.sound').start?mix(1.28,.04,smooth(phase(t,at('12.window','shut'),cue('12.window').end-.1))):1.28}/>
 <Facade at={[0,0,-2]} door={elderDoor} night={night}/>
 {[11,21,31,41,52,-15].map((x,i)=><Hut key={x} at={[x,0,-3.7]} w={5.8} d={5} h={3.5} roof={["#49765a","#8e5141","#496b91"][i%3]} windows={[-1.6,1.6]} lit={night}/>)}
 {[15,30,48,-16].map((x,i)=><Hut key={x} at={[x,0,8.3]} w={6.5} h={3.5} turn={Math.PI} windows={[-1.8,1.8]} roof={i%2?"#5a7745":"#8c5e44"} lit={night}/>)}
 <Fence from={[-2.55,0,3.7]} to={[-1.3,0,3.7]}/><Fence from={[1.3,0,3.7]} to={[2.7,0,3.7]}/><Fence from={[2.7,0,-2]} to={[2.7,0,.3]}/><Fence from={[2.7,0,2.15]} to={[2.7,0,4]}/>
 {[.3,2.15].map(z=><Vox key={z} kind="log" position={[2.7,.78,z]} size={[.22,1.56,.22]}/>)}
 <Vox kind="planks" position={[1.7,.2,-.8]} size={[1.2,.4,.7]}/><Vox kind="darkPlanks" position={[1.7,.85,-.8]} size={[1.3,.12,.9]}/><Block position={[1.7,.48,-.38]} size={[.32,.34,.04]} color="#273329"/>
 {[-8,3.6,14,25,36,47].map((x,i)=><LanternPost key={x} position={[x,0,-.82]} height={2.7} light={night&&i<2?3:0} seed={i+8}/>)}
 {[-23,-11,6,18,28,40,54,64].map((x,i)=><Tree key={x} position={[x,0,-10.4-i%2*3]} height={4+i%3} leaf={i%2?"#376348":"#487a48"}/>)}
 {[0,1,2,3,4].map(i=><Vox key={i} kind="grass" position={[-26+i*23,2+i%2,-23]} size={[24,4+i%2*2,14]}/>)}
 {night?<><Block position={[25,20,-48]} size={[3.5,3.5,.25]} color="#e1e8ed" emissive="#dce7ff" emissiveIntensity={.6}/><Clouds y={30} center={[18,0,0]} color="#253650" opacity={.22}/></>:<Clouds y={32} center={[15,0,0]}/>}
 <GodRay position={[5,4,-1]} rotation={[0,0,.45]} width={3} height={10} color={night?"#8faed5":"#fff1c5"} opacity={.05}/>
 <LightPool position={[0,.07,.9]} width={7} depth={6} color={night?"#8ab1cf":"#f4e8ba"} opacity={.13}/>
 <Glow position={[3.6,2.6,-.82]} size={2} color="#e9c088" opacity={.2}/>
 <Dust position={[22,2,1.2]} area={[80,3,12]} count={65} size={.027} speed={.15} opacity={.4} color={night?"#afc8da":"#f8edc6"}/>
 {night?<><pointLight position={[MAN_FREEZE[0]+.5,3.5,4]} color="#c0d7ed" intensity={30} distance={12}/><pointLight position={[-1,3,2.4]} color="#9fbbdf" intensity={12} distance={10}/><pointLight position={[MAN_FREEZE[0]-2,2,-1.2]} color="#ffc98b" intensity={6} distance={8}/></>:null}
 </>;
};
const LunchSet:React.FC=()=> <>
 <Vox kind="stone" position={[0,-.07,0]} size={[12,.14,9]}/><Vox kind="planks" tint="#c4ad7f" position={[0,1.5,-2.2]} size={[12,3,.2]} castShadow={false}/>
 <Block position={[0,2.1,-2.05]} size={[2.4,.55,.04]} color="#3e7582"/><PixelText text="LUNCH" position={[0,2.1,-2.02]} height={.3} color="#f4e9ca"/>
 <Table position={[0,0,0]} size={[2.9,1.05]}/><Vox kind="planks" position={[0,.38,.92]} size={[2.9,.12,.35]}/><Vox kind="planks" position={[0,.38,-.95]} size={[2.9,.12,.35]}/>
 {[-4,4].map(x=><group key={x}><Table position={[x,0,-.5]}/><Vox kind="planks" position={[x,.38,.45]} size={[2.7,.12,.35]}/><Book position={[x,.85,-.4]}/></group>)}
 <LightPool position={[1,.03,.5]} width={5} depth={4} color="#f5e9bb" opacity={.12}/><Dust position={[0,1.8,0]} area={[9,3,6]} count={25} size={.025} speed={.1} opacity={.25}/>
</>;
export const World:React.FC=()=>{
 const active=useActiveShot(), t=useFilmTime(), zone=active?.shot.zone??'street', night=active?.shot.look==='overworld-night';
 const focus=active?v(active.shot.target,active.shot.targetTo??active.shot.target,phase(active.t,0,active.shot.dur)):[0,1,0] as Vec3;
 return <WorldClock t={t}>
  {night?<pointLight position={[focus[0]+1.1,focus[1]+1.2,focus[2]+3.1]} intensity={26} distance={8} color="#e3e0d1"/>:null}
  {zone==='class'?<><Vox kind="planks" position={[0,-.08,7]} size={[9,.16,12]}/><Vox kind="wool" tint="#e1e0ce" position={[0,3.5,7]} size={[9,.16,12]} castShadow={false}/><Classroom at={[0,0,0]} board="8 X 7" boardSub={t>=cue("9.help").start?"56":"HOW MANY"} books/><pointLight position={[0,2.8,2]} intensity={4} color="#cbdde5" distance={8}/></>:null}
  {zone==='hall'?<><Vox kind="stone" tint="#c2baa4" position={[0,-.06,7]} size={[17,.12,12]}/><Vox kind="wool" tint="#f4efe0" position={[0,3.5,7]} size={[17,.2,12]} castShadow={false}/><SchoolHall at={[0,0,0]} length={16} sign="MATH"/><HingedLocker position={[0,0,-.72]} open={lockerMotion(t).door}/></>:null}
  {zone==='kitchen'?<Kitchen t={t} night={night}/>:null}
  {zone==='lunch'?<LunchSet/>:null}
  {zone==='street'||zone==='rescue'||zone==='bedroom'?<Street t={t} night={night} rescue={zone==='rescue'}/>:null}
 </WorldClock>;
};

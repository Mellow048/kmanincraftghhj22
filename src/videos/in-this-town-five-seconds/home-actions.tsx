import type React from "react";
import { Block, gaitPose } from "../../engine";
import type { Pose, Vec3 } from "../../engine";
import { Hero, Mother, Elder, Friend, WorldClock, StopHalo, GlassCup, Book, Bowl, Carrot, Rabbit, Bread, TEEN, STOP, at, cue, worldTime, phase, smooth, mix, v, add, route, aimHand, handWorld, stoop, poseMix, punch, recoil, sleevePoint, HOME, HOME_WINDOW, HOME_BED, RABBIT_START, BlockBurst } from "./kit";

import { glassState, GLASS_ROOT, GLASS_YAW, GLASS_DROP, GLASS_RELEASE, GLASS_HIT, touchState, feeding, FEED_ROOT, motherCheck } from './home-motion';
import { curtainsMother, curtainState, washingMother, CURTAIN_PULL, CURTAIN_MEET } from "./domestic-motion";

export const MotherStory:React.FC<{t:number;id:string}>=({t,id})=>{
 const rule=id.startsWith('6.'), breakfast=id==='3.school', adopted=id==='2.adopted';
 const window=curtainsMother(t), wash=washingMother(t);
 const atWindow=(t>=cue('2.answer').start&&t<cue('3.school').end);
 const babySway=adopted?Math.sin((t-cue(id).start)*3.7)*.07:0;
 const p=rule?wash.position:atWindow?window.position:[-.9,0,-.4] as [number,number,number];
 const yaw=rule?wash.rotationY:atWindow?window.rotationY:.35;
 const arm=rule?wash.arm:atWindow?window.arm:[-.75,0,babySway*.5] as [number,number,number];
 const offset=rule?wash.offset:atWindow?window.offset:[0,0,0] as [number,number,number];
 const lean=rule?wash.lean:atWindow?window.lean:0;
 const bob=rule?wash.bob:atWindow?window.bob:Math.abs(babySway)*.12;
 const hp=breakfast?route(t,[[cue(id).start,[.8,0,.75]],[cue(id).start+.5,[.8,0,.75]],[cue(id).end,[-1.45,0,-1.5]]],true):null;
 const ask=punch(t,at('2.where','tell')-.25,.25)*(1-punch(t,at('2.where','me',1)+.05,.28));
 const tell=rule?punch(t,at('6.told','told'),.22)*(1-punch(t,at('6.told','glass')+.1,.22)):0;
 const warning=rule?punch(t,at('6.rule','see')-.22,.22)*(1-punch(t,at('6.rule','that')+.1,.2)):0;
 const baby=sleevePoint(p,yaw,.96,arm,offset,lean,bob,[.26,-.18,.15]);
 const heroPose:Partial<Pose>=breakfast?gaitPose('walk',hp!.distance):{bodyPitch:.07*ask-.045*warning,bodyRoll:.03*ask,armR:[-.12-1.05*ask-.85*tell,0,.12+.3*ask+.15*tell],armL:[-.1-.45*ask-.52*tell,0,-.14-.2*ask-.16*tell],head:[.08*ask,0,.12*ask]};
 return <>
  <WorldClock t={t}>
   <Mother position={p} rotationY={yaw} walk={rule?wash.walk:window.distance} walkAmount={rule?wash.step:atWindow?window.step:0} foldedArms={{rotation:arm,offset}} bodyBob={bob} bodyRoll={adopted?babySway:0} lean={lean}
    turn={atWindow?-Math.sin(phase(t,at('2.answer','I'),CURTAIN_PULL)*Math.PI)*.6:id==='2.where'?-.55:0}
    hmm={rule?wash.warning*.25:0} nod={rule?.06:adopted?.17:0} lookAt={rule&&t>at('6.told','glass')?[.8,1.46,.75]:undefined}/>
   {adopted?<group position={baby} rotation={[0,yaw,Math.PI/2]}><Hero scale={.42} position={[-.05,0,0]} colors={{torso:'#d9a137',arms:'skin',legs:'#314b79'}} poseOverride={{armR:[-.4,0,.6],armL:[-.7,0,-.5],kneeR:[.5,0,0],kneeL:[.35,0,0]}} face="calm"/></group>:null}
   {rule?<Bowl position={wash.bowl}/>:null}
   <Bread position={[.05,.82,.14]} scale={.6}/>
  </WorldClock>
  {!adopted?<Hero position={hp?.position??[.8,0,.75]} rotationY={hp?.yaw??(rule?-1.65:-.85)} animation={breakfast?'walk':'idle'} animDistance={hp?.distance} time={t} poseOverride={heroPose} breath={.45} weightShift={0} face={id==='6.question'?'uneasy':id==='2.where'?'uneasy':'calm'} lookAt={rule||atWindow?add(p,[0,1.46,0]):undefined}/>:null}
  {id==='6.lock'?<Block position={[-1.35+punch(t,at(id,'lock'),.14)*.08,1.13,-2.28]} size={[.2,.045,.06]} color="#a7b0ae"/>:null}
 </>;
};
export const GlassDiscovery:React.FC<{t:number}>=({t})=>{
 const q=glassState(t);
 return <>
 <WorldClock t={t}><Mother position={[-.9,0,-.55]} rotationY={.5} nod={.12}/></WorldClock>
 <Hero position={GLASS_ROOT} rotationY={GLASS_YAW} time={t} poseOverride={q.pose} breath={0} weightShift={0} face={q.broken?'fear':'wow'} lookAt={q.cup} gaze={0} saccade={false}/>
 {!q.broken?<group position={q.cup} rotation={[q.elapsed*1.2,0,.3*q.elapsed]}><GlassCup water={t<GLASS_DROP}/></group>:null}
 {t>=GLASS_DROP?Array.from({length:9},(_,i)=>{const a=i*2.4,dt=q.elapsed;return <Block key={i} position={[GLASS_RELEASE[0]+Math.cos(a)*dt*.32,Math.max(.028,GLASS_RELEASE[1]+.18-dt*dt*(4.5+i*.14)),GLASS_RELEASE[2]+Math.sin(a)*dt*.36]} size={[.045,.05,.045]} color="#89cbe8" opacity={.85}/>;}):null}
 <BlockBurst position={[GLASS_RELEASE[0],.025,GLASS_RELEASE[2]]} age={t-GLASS_HIT} color="#c7e7ef" power={2} life={.8}/>
 <StopHalo t={t} position={[.2,0,.75]} radius={1.45}/>
 </>;
};
export const TouchDemo:React.FC<{t:number}>=({t})=>{
 const q=touchState(t);
 return <>
  <WorldClock t={t}><Mother position={[-1.8,0,-.9]} rotationY={.5} nod={.15}/></WorldClock>
  <Hero position={q.position} rotationY={0} time={t} poseOverride={q.pose} breath={0} weightShift={0} face={t<STOP.touch.b?'grin':'wow'} lookAt={q.book}/>
  <group position={q.book} rotation={[0,0,q.angle]}><Book color="#4c7596"/></group>
  <StopHalo t={t} position={[0,0,.4]} radius={1.35}/>
 </>;
};
export const FeedRabbit:React.FC<{t:number;id:string}>=({t})=>{
 const q=feeding(t);
 return <>
 <WorldClock t={t}>
  <Rabbit position={q.rabbit} rotationY={Math.PI} hop={q.hop} scale={.82}/>
  <Friend position={[.2,0,.95]} rotationY={1.2} nod={.35+.1*q.bite} lean={.12*q.bite} bodyRoll={.035*Math.sin(t*6)*q.bite}/><Elder position={[0,0,-1.8]} nod={.2}/>
 </WorldClock>
 <Hero position={FEED_ROOT} time={t} poseOverride={q.pose} breath={0} weightShift={0} face={q.bite>.1?'wow':'smile'} lookAt={q.rabbit}/>
 <Carrot position={q.carrot} rotationY={.5} scale={.8}/>
 <group position={add(q.foot,[0,.035,0])} rotation={[.30*q.bite,0,0]}><Block size={[.14,.022,.03]} color="#eee8d8"/><Block size={[.026,.026,.09]} color="#eee8d8"/></group>
 </>;
};
export const MotherChecks:React.FC<{t:number;id:string}>=({t,id})=>{
 const q=motherCheck(t);
 return <>
 <WorldClock t={t}><Mother position={q.position} rotationY={q.yaw} walk={q.distance} walkAmount={q.step} bodyBob={.02*q.step*Math.abs(Math.sin(q.distance*5.4))} bodyRoll={0} lean={q.lean}
  foldedArms={{rotation:q.arm,offset:q.offset}} nod={t<cue('12.lie').start?.25:0} lookAt={t<cue('12.lie').start?[-4.85,1.1,-3.35]:undefined}/></WorldClock>
 <Hero position={[-4.55,0,-3.35]} time={t} face={id==='12.lie'?'uneasy':'calm'} poseOverride={q.hero} breath={0} weightShift={0}/>
 </>;
};
